import { Router } from 'express'
import { exportAppointments, exportContacts } from '../controllers/exportController.js'
import { requireAuth } from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import { filterQuerySchema } from '../validators/queryValidators.js'

const router = Router()

router.use(requireAuth)
router.get('/contacts', validate(filterQuerySchema, 'query'), exportContacts)
router.get('/appointments', validate(filterQuerySchema, 'query'), exportAppointments)

export default router
