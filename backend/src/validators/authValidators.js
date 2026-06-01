import { z } from 'zod'
import { emailField, safeString } from './common.js'

export const loginSchema = z.object({
  email: emailField,
  password: safeString('Password', 8).max(128),
})

export const updatePasswordSchema = z
  .object({
    currentPassword: safeString('Current password', 8).max(128),
    newPassword: safeString('New password', 8).max(128),
    confirmPassword: safeString('Confirm password', 8).max(128),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
