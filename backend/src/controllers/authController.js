import bcrypt from 'bcrypt'
import Admin from '../models/Admin.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/apiError.js'
import env from '../config/env.js'
import { cookieOptions, signToken } from '../utils/jwt.js'
import { comparePassword, isBcryptHash } from '../utils/passwords.js'

export const login = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email })
  if (!admin) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const matches = await comparePassword(req.body.password, admin.password)
  if (!matches) {
    throw new ApiError(401, 'Invalid email or password')
  }

  if (!isBcryptHash(admin.password)) {
    admin.password = await bcrypt.hash(req.body.password, 12)
    await admin.save()
  }

  const token = signToken({ adminId: admin._id })
  res.cookie(env.cookieName, token, cookieOptions)
  res.json({
    message: 'Login successful',
    admin: { id: admin._id, email: admin.email },
  })
})

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie(env.cookieName, {
    ...cookieOptions,
    maxAge: undefined,
  })
  res.json({ message: 'Logged out successfully' })
})

export const me = asyncHandler(async (req, res) => {
  res.json({ admin: req.admin })
})

export const updatePassword = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id)
  const matches = await comparePassword(req.body.currentPassword, admin.password)
  if (!matches) {
    throw new ApiError(400, 'Current password is incorrect')
  }

  admin.password = await bcrypt.hash(req.body.newPassword, 12)
  await admin.save()

  res.json({ message: 'Password updated successfully' })
})
