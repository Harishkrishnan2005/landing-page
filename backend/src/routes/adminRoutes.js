import { Router } from 'express'
import {
  deleteAppointment,
  getAppointments,
  updateAppointmentStatus,
} from '../controllers/appointmentController.js'
import { getDashboardAnalytics } from '../controllers/adminController.js'
import { deleteContact, getContacts } from '../controllers/contactController.js'
import { requireAuth } from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import { appointmentStatusSchema } from '../validators/appointmentValidators.js'
import { filterQuerySchema } from '../validators/queryValidators.js'

const router = Router()

router.use(requireAuth)
router.get('/dashboard', getDashboardAnalytics)
router.get('/contacts', validate(filterQuerySchema, 'query'), getContacts)
router.delete('/contacts/:id', deleteContact)
router.get('/appointments', validate(filterQuerySchema, 'query'), getAppointments)
router.put('/appointments/:id/status', validate(appointmentStatusSchema), updateAppointmentStatus)
router.delete('/appointments/:id', deleteAppointment)

export default router
