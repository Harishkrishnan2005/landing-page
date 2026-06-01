import { Router } from 'express'
import { submitAppointment } from '../controllers/appointmentController.js'
import { submitContact } from '../controllers/contactController.js'
import { formLimiter } from '../middleware/rateLimiter.js'
import validate from '../middleware/validate.js'
import { appointmentSchema } from '../validators/appointmentValidators.js'
import { contactSchema } from '../validators/contactValidators.js'

const router = Router()

router.post('/contacts', formLimiter, validate(contactSchema), submitContact)
router.post('/appointments', formLimiter, validate(appointmentSchema), submitAppointment)

export default router
