import { z } from 'zod'
import { emailField, messageField, phoneField, safeString } from './common.js'

export const appointmentSchema = z.object({
  name: safeString('Name', 2).max(120),
  phone: phoneField,
  email: emailField,
  appointmentDate: safeString('Appointment date'),
  appointmentTime: safeString('Appointment time'),
  message: messageField,
})

export const appointmentStatusSchema = z.object({
  status: z.enum(['Pending', 'Contacted', 'Completed']),
})
