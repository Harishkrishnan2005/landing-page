import morgan from 'morgan'
import env from '../config/env.js'

const requestLogger = morgan(env.nodeEnv === 'production' ? 'combined' : 'dev')

export default requestLogger
