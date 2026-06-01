import { Router } from 'express'
import { login, logout, me, updatePassword } from '../controllers/authController.js'
import { requireAuth } from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import { authLimiter } from '../middleware/rateLimiter.js'
import { loginSchema, updatePasswordSchema } from '../validators/authValidators.js'

const router = Router()

router.post('/login', authLimiter, validate(loginSchema), login)
router.post('/logout', requireAuth, logout)
router.get('/me', requireAuth, me)
router.put('/password', requireAuth, validate(updatePasswordSchema), updatePassword)

export default router
