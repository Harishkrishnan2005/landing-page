import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import authRoutes from './routes/authRoutes.js'
import publicRoutes from './routes/publicRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import exportRoutes from './routes/exportRoutes.js'
import requestLogger from './middleware/requestLogger.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'
import sanitizeRequest from './middleware/sanitizeRequest.js'
import env from './config/env.js'
import ApiError from './utils/apiError.js'

const app = express()

app.use(
  cors({
    origin(origin, callback) {
      const whitelist = [env.frontendUrl]
      if (!origin || whitelist.includes(origin)) {
        return callback(null, true)
      }
      return callback(new ApiError(403, 'Origin not allowed by CORS'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
)

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
        frameSrc: ["'self'", 'https://www.google.com'],
      },
    },
    frameguard: { action: 'sameorigin' },
    referrerPolicy: { policy: 'no-referrer' },
    hsts: env.nodeEnv === 'production' ? undefined : false,
  }),
)

app.use((_req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})

app.use(requestLogger)
app.use(express.json({ limit: '200kb' }))
app.use(express.urlencoded({ extended: true, limit: '200kb' }))
app.use(cookieParser())
app.use(sanitizeRequest)
app.use(apiLimiter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api', publicRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/exports', exportRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
