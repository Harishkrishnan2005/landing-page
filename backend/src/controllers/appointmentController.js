import Appointment from '../models/Appointment.js'
import asyncHandler from '../utils/asyncHandler.js'

const buildFilters = ({ search = '', date = '', status = '' }) => {
  const filters = {}

  if (search) {
    filters.$or = [
      { name: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { phone: new RegExp(search, 'i') },
    ]
  }

  if (date) {
    filters.appointmentDate = date
  }

  if (status) {
    filters.status = status
  }

  return filters
}

export const submitAppointment = asyncHandler(async (req, res) => {
  await Appointment.create(req.body)
  res.status(201).json({ message: 'Appointment request submitted successfully' })
})

export const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find(buildFilters(req.query)).sort({ createdAt: -1 })
  res.json({ appointments })
})

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status })
  res.json({ message: 'Appointment status updated successfully' })
})

export const deleteAppointment = asyncHandler(async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id)
  res.json({ message: 'Appointment deleted successfully' })
})

export { buildFilters as buildAppointmentFilters }
