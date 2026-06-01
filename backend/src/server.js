import dns from 'node:dns'
import app from './app.js'
import env from './config/env.js'
import connectDb from './config/db.js'
import seedAdminIfNeeded from './services/adminSeeder.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])

async function bootstrap() {
  if (!env.mongoUri || !env.jwtSecret) {
    throw new Error('Missing required environment variables')
  }

  await connectDb()
  await seedAdminIfNeeded()

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`)
  })
}

bootstrap().catch((error) => {
  console.error('Failed to start server', error)
  process.exit(1)
})
