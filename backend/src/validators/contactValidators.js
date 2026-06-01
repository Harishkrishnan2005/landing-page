import { z } from 'zod'
import { emailField, messageField, phoneField, safeString } from './common.js'

export const contactSchema = z.object({
  name: safeString('Name', 2).max(120),
  phone: phoneField,
  email: emailField,
  message: messageField,
})
