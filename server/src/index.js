import { env } from './config/env.js'
import { logger } from './config/logger.js'
import { connectDB } from './config/db.js'
import { createApp } from './app.js'
import mongoose from 'mongoose'

async function main() {
  await connectDB()
  const app = createApp()
  const server = app.listen(env.PORT, () => logger.info(`4lancers API listening on :${env.PORT} (${env.NODE_ENV})`))

  const shutdown = (signal) => {
    logger.info(`${signal} received — shutting down`)
    server.close(async () => {
      await mongoose.connection.close()
      process.exit(0)
    })
    setTimeout(() => process.exit(1), 10000).unref()
  }
  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}

process.on('unhandledRejection', (err) => logger.error({ err }, 'Unhandled rejection'))

main().catch((err) => {
  logger.fatal({ err }, 'Failed to start server')
  process.exit(1)
})
