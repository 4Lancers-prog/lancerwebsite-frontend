import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { pinoHttp } from 'pino-http'
import mongoose from 'mongoose'
import { env } from './config/env.js'
import { logger } from './config/logger.js'
import leadsRouter from './routes/leads.routes.js'
import { notFound, errorHandler } from './middleware/index.js'

export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', env.TRUST_PROXY)

  app.use(pinoHttp({ logger, autoLogging: { ignore: (req) => req.url === '/api/health' } }))
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'img-src': ["'self'", 'data:'],
          'script-src': ["'self'", "'unsafe-inline'"], // Vike inlines a small hydration script
          'style-src': ["'self'", "'unsafe-inline'"],
          'connect-src': ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  )
  app.use(compression())

  const api = express.Router()
  api.use(
    cors({
      origin: (origin, cb) => (!origin || env.corsOrigins.includes(origin) ? cb(null, true) : cb(null, false)),
      methods: ['GET', 'POST', 'PATCH'],
      allowedHeaders: ['Content-Type', 'x-admin-key'],
      maxAge: 600,
    }),
  )
  api.use(express.json({ limit: '20kb' }))
  api.use(rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: 'draft-7', legacyHeaders: false }))

  api.get('/health', (_req, res) => res.json({ ok: true, db: mongoose.connection.readyState === 1 ? 'up' : 'down', uptime: Math.round(process.uptime()) }))
  api.use('/leads', leadsRouter)
  api.use(notFound)
  app.use('/api', api)

  // Optional: serve the pre-rendered Vike site from the same server
  if (env.SERVE_CLIENT) {
    const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', env.CLIENT_DIST)
    app.use(
      '/assets',
      express.static(path.join(dir, 'assets'), { immutable: true, maxAge: '1y' }),
    )
    app.use(express.static(dir, { extensions: ['html'], maxAge: '1h' }))
    app.use((req, res, next) => (req.method === 'GET' ? res.status(404).sendFile(path.join(dir, '404.html')) : next()))
  }

  app.use(notFound)
  app.use(errorHandler)
  return app
}
