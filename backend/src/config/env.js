import dotenv from 'dotenv'

dotenv.config()

const frontendUrls = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean)

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cookieName: process.env.COOKIE_NAME || 'vertex_admin_token',
  cookieMaxAge: Number(process.env.COOKIE_MAX_AGE || 604800000),
  frontendUrl: frontendUrls[0] || 'http://localhost:5173',
  frontendUrls,
  backendUrl: process.env.BACKEND_URL || 'http://localhost:5000',
  adminEmail: process.env.ADMIN_EMAIL || '',
  adminPassword: process.env.ADMIN_PASSWORD || '',
}

export default env
