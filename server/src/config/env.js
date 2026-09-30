import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
  ADMIN_API_KEY: z.string().min(24, 'ADMIN_API_KEY must be at least 24 characters'),
  TRUST_PROXY: z.coerce.number().default(1),
  SERVE_CLIENT: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  CLIENT_DIST: z.string().default('../client/dist/client'),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_SECURE: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM: z.string().optional(),
  LEAD_NOTIFY_TO: z.string().optional(),
})

const parsed = schema.safeParse(process.env)
if (!parsed.success) {
  console.error('❌ Invalid environment configuration:')
  for (const i of parsed.error.issues) console.error(`   • ${i.path.join('.')}: ${i.message}`)
  process.exit(1)
}

export const env = {
  ...parsed.data,
  corsOrigins: parsed.data.CORS_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean),
  isProd: parsed.data.NODE_ENV === 'production',
}
