import Appointment from '../models/Appointment.js'
import Contact from '../models/Contact.js'
import asyncHandler from '../utils/asyncHandler.js'

export const getDashboardAnalytics = asyncHandler(async (_req, res) => {
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const monthStart = new Date()
  monthStart.setDate(1)
  monthStart.setHours(0, 0, 0, 0)

  const [contacts, appointments, todayContacts, todayAppointments, monthContacts, monthAppointments, recentContacts, recentAppointments] =
    await Promise.all([
      Contact.countDocuments(),
      Appointment.countDocuments(),
      Contact.countDocuments({ createdAt: { $gte: todayStart } }),
      Appointment.countDocuments({ createdAt: { $gte: todayStart } }),
      Contact.countDocuments({ createdAt: { $gte: monthStart } }),
      Appointment.countDocuments({ createdAt: { $gte: monthStart } }),
      Contact.find().sort({ createdAt: -1 }).limit(3),
      Appointment.find().sort({ createdAt: -1 }).limit(3),
    ])

  const recentActivity = [
    ...recentContacts.map((item) => ({
      id: `contact-${item._id}`,
      title: `New contact from ${item.name}`,
      subtitle: `${item.email} | ${new Date(item.createdAt).toLocaleString()}`,
    })),
    ...recentAppointments.map((item) => ({
      id: `appointment-${item._id}`,
      title: `Appointment request from ${item.name}`,
      subtitle: `${item.appointmentDate} at ${item.appointmentTime} | ${item.status}`,
    })),
  ]
    .sort((a, b) => (a.subtitle < b.subtitle ? 1 : -1))
    .slice(0, 6)

  res.json({
    totals: {
      contacts,
      appointments,
      today: todayContacts + todayAppointments,
      month: monthContacts + monthAppointments,
    },
    recentActivity,
  })
})
