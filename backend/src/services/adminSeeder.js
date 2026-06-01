import bcrypt from 'bcrypt'
import Admin from '../models/Admin.js'
import env from '../config/env.js'

async function seedAdminIfNeeded() {
  if (!env.adminEmail || !env.adminPassword) {
    return
  }

  const existing = await Admin.findOne({ email: env.adminEmail.toLowerCase() })
  if (existing) {
    return
  }

  const password = await bcrypt.hash(env.adminPassword, 12)
  await Admin.create({ email: env.adminEmail.toLowerCase(), password })
}

export default seedAdminIfNeeded
