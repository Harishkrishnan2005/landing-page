import mongoose from 'mongoose'
import env from './env.js'

async function connectDb() {
  await mongoose.connect(env.mongoUri)
}

export default connectDb
