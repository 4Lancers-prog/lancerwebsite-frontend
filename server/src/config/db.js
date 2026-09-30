import mongoose from 'mongoose'
import { env } from './env.js'
import { logger } from './logger.js'

export async function connectDB() {
  mongoose.set('strictQuery', true)
  mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'))
  mongoose.connection.on('reconnected', () => logger.info('MongoDB reconnected'))
  await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
  logger.info('MongoDB connected')
}
