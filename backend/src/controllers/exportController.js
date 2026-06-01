import Appointment from '../models/Appointment.js'
import Contact from '../models/Contact.js'
import { buildAppointmentFilters } from './appointmentController.js'
import { buildContactFilters } from './contactController.js'
import asyncHandler from '../utils/asyncHandler.js'
import { sendWorkbook } from '../utils/excel.js'

export const exportContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find(buildContactFilters(req.query)).sort({ createdAt: -1 })
  sendWorkbook(
    res,
    'contact-requests',
    'Contacts',
    contacts.map((item) => ({
      Name: item.name,
      'Phone Number': item.phone,
      Email: item.email,
      Message: item.message,
      'Submission Date': item.createdAt.toISOString(),
    })),
  )
})

export const exportAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find(buildAppointmentFilters(req.query)).sort({ createdAt: -1 })
  sendWorkbook(
    res,
    'appointment-requests',
    'Appointments',
    appointments.map((item) => ({
      Name: item.name,
      'Phone Number': item.phone,
      Email: item.email,
      'Appointment Date': item.appointmentDate,
      'Appointment Time': item.appointmentTime,
      Status: item.status,
      Message: item.message,
      'Submission Date': item.createdAt.toISOString(),
    })),
  )
})
