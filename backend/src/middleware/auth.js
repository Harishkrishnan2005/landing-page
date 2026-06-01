import Admin from '../models/Admin.js'
import env from '../config/env.js'
import { verifyToken } from '../utils/jwt.js'
import ApiError from '../utils/apiError.js'
import asyncHandler from '../utils/asyncHandler.js'

export const requireAuth = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.[env.cookieName]
  if (!token) {
    throw new ApiError(401, 'Authentication required')
  }

  let payload
  try {
    payload = verifyToken(token)
  } catch {
    throw new ApiError(401, 'Invalid session')
  }

  const admin = await Admin.findById(payload.adminId).select('-password')

  if (!admin) {
    throw new ApiError(401, 'Invalid session')
  }

  req.admin = admin
  next()
})
