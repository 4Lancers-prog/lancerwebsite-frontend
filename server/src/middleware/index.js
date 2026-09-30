import crypto from 'node:crypto'
import { ZodError } from 'zod'
import { env } from '../config/env.js'
import { logger } from '../config/logger.js'

/** Structured application error. */
export class AppError extends Error {
  constructor(status, code, message, details) {
    super(message)
    this.status = status
    this.code = code
    this.details = details
  }
}

/** Validate req[source] with a zod schema and replace it with the parsed value. */
export const validate =
  (schema, source = 'body') =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source])
    if (!result.success) return next(result.error)
    if (source === 'query') req.validatedQuery = result.data
    else req[source] = result.data
    next()
  }

/** Constant-time admin key check for lead management endpoints. */
export function requireAdmin(req, _res, next) {
  const key = req.get('x-admin-key') || ''
  const a = Buffer.from(key)
  const b = Buffer.from(env.ADMIN_API_KEY)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return next(new AppError(401, 'UNAUTHORIZED', 'Invalid or missing admin key'))
  }
  next()
}

export const notFound = (req, _res, next) => next(new AppError(404, 'NOT_FOUND', `Route ${req.method} ${req.originalUrl} not found`))

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  if (err instanceof ZodError) {
    const fields = err.issues.map((i) => ({ field: i.path.join('.'), message: i.message }))
    return res.status(422).json({ error: { code: 'VALIDATION_ERROR', message: 'Please check the highlighted fields and try again.', fields } })
  }
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({ error: { code: 'PAYLOAD_TOO_LARGE', message: 'Request is too large.' } })
  }
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: { code: 'BAD_JSON', message: 'Malformed JSON body.' } })
  }
  if (err?.name === 'CastError') {
    return res.status(400).json({ error: { code: 'BAD_ID', message: 'Invalid id.' } })
  }
  const status = err instanceof AppError ? err.status : 500
  if (status >= 500) (req.log || logger).error({ err }, 'Unhandled error')
  res.status(status).json({
    error: {
      code: err instanceof AppError ? err.code : 'INTERNAL_ERROR',
      message: status >= 500 && env.isProd ? 'Something went wrong. Please try again later.' : err.message,
      ...(err.details && { details: err.details }),
    },
  })
}
