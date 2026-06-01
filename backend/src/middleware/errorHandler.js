import env from '../config/env.js'

const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500
  res.status(statusCode).json({
    message: error.message || 'Internal server error',
    ...(env.nodeEnv !== 'production' ? { stack: error.stack } : {}),
  })
}

export default errorHandler
