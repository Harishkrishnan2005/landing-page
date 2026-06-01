import Contact from '../models/Contact.js'
import asyncHandler from '../utils/asyncHandler.js'

const buildFilters = ({ search = '', date = '' }) => {
  const filters = {}

  if (search) {
    filters.$or = [
      { name: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { phone: new RegExp(search, 'i') },
    ]
  }

  if (date) {
    const start = new Date(date)
    const end = new Date(date)
    end.setDate(end.getDate() + 1)
    filters.createdAt = { $gte: start, $lt: end }
  }

  return filters
}

export const submitContact = asyncHandler(async (req, res) => {
  await Contact.create(req.body)
  res.status(201).json({ message: 'Contact request submitted successfully' })
})

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find(buildFilters(req.query)).sort({ createdAt: -1 })
  res.json({ contacts })
})

export const deleteContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id)
  res.json({ message: 'Contact request deleted successfully' })
})

export { buildFilters as buildContactFilters }
