import { z } from 'zod'

const safeString = (label, min = 1) =>
  z
    .string()
    .trim()
    .min(min, `${label} is required`)
    .max(500, `${label} is too long`)

export const emailField = z
  .string()
  .trim()
  .email('Invalid email address')
  .transform((value) => value.toLowerCase())
export const phoneField = safeString('Phone number', 8).max(25, 'Phone number is too long')
export const messageField = safeString('Message', 10)
export { safeString }
