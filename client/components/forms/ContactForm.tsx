import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react'
import { requirements, budgets, timelines, followUps, type RequirementValue } from '@/data/contact'
import { site } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { FormField, Input, Select, Textarea } from '@/components/ui/Field'
import { cn } from '@/lib/utils'

const reqValues = requirements.map((r) => r.value) as [RequirementValue, ...RequirementValue[]]

/** Client-side schema. The server re-validates everything with its own schema. */
const schema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name').max(80),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  email: z.string().trim().email('Please enter a valid email address').max(160),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[+\d\s()-]*$/, 'Only digits, spaces and + ( ) - please')
    .optional()
    .or(z.literal('')),
  website: z.string().trim().max(200).optional().or(z.literal('')),
  solutionType: z.enum(reqValues, { message: 'Pick the closest option — “Not sure yet” is fine' }),
  message: z.string().trim().min(20, 'A couple of sentences helps us prepare (20+ characters)').max(4000),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  details: z.record(z.string(), z.string().max(500)).optional(),
  consent: z.literal(true, { message: 'Please agree so we can reply to you' }),
  /** Honeypot — must stay empty. */
  company_url: z.string().max(0).optional(),
})

type FormValues = z.infer<typeof schema>

export function ContactForm({ defaultRequirement }: { defaultRequirement?: RequirementValue }) {
  const [done, setDone] = useState<string | null>(null)
  const successRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (done) successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [done])
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { solutionType: defaultRequirement, details: {} },
  })

  const selected = watch('solutionType')
  const questions = selected ? followUps[selected] ?? [] : []

  useEffect(() => {
    if (defaultRequirement) setValue('solutionType', defaultRequirement)
  }, [defaultRequirement, setValue])

  const onSubmit = async (values: FormValues) => {
    const req = requirements.find((r) => r.value === values.solutionType)
    const details = Object.fromEntries(Object.entries(values.details ?? {}).filter(([, v]) => v && v.trim()))
    try {
      const res = await fetch(`${site.apiBase}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, details, service: req?.service }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg = json?.error?.message || 'Something went wrong. Please try again.'
        toast.error(msg)
        return
      }
      setDone(values.name.split(' ')[0])
      toast.success('Thank you — your enquiry has reached us.')
      reset({ details: {} })
    } catch {
      toast.error(`We could not reach the server. Please email us at ${site.contact.email}.`)
    }
  }

  if (done) {
    return (
      <motion.div
        ref={successRef}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        className="flex flex-col items-center rounded-card border border-primary/40 bg-surface p-10 text-center sm:p-14"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-primary-soft text-accent">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <h2 className="mt-6 text-3xl font-semibold">Thanks, {done}. We have got it.</h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          We will read through your requirement and reply with clear next steps — usually within one business day.
        </p>
        <Button variant="secondary" className="mt-8" onClick={() => setDone(null)}>
          Send another enquiry
        </Button>
      </motion.div>
    )
  }

  const err = (k: keyof FormValues) => (errors[k] ? { 'aria-invalid': true as const, 'aria-describedby': `${k}-error` } : {})

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-card border border-border bg-surface/70 p-6 shadow-card backdrop-blur sm:p-10">
      {/* Honeypot (hidden from people and assistive tech) */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company URL <input tabIndex={-1} autoComplete="off" {...register('company_url')} />
        </label>
      </div>

      <fieldset>
        <legend className="font-display text-lg font-medium">1. About you</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FormField id="name" label="Your name" error={errors.name?.message}>
            <Input id="name" autoComplete="name" placeholder="Full name" {...register('name')} {...err('name')} />
          </FormField>
          <FormField id="company" label="Company" optional error={errors.company?.message}>
            <Input id="company" autoComplete="organization" placeholder="Company name" {...register('company')} />
          </FormField>
          <FormField id="email" label="Business email" error={errors.email?.message}>
            <Input id="email" type="email" autoComplete="email" placeholder="you@company.com" {...register('email')} {...err('email')} />
          </FormField>
          <FormField id="phone" label="Phone / WhatsApp" optional error={errors.phone?.message}>
            <Input id="phone" type="tel" autoComplete="tel" placeholder="+91" {...register('phone')} {...err('phone')} />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="font-display text-lg font-medium">2. What do you need?</legend>
        <div role="radiogroup" aria-label="Requirement" className="mt-5 flex flex-wrap gap-2">
          {requirements.map((r) => (
            <label
              key={r.value}
              className={cn(
                'cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-all has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary',
                selected === r.value ? 'border-primary bg-primary text-primary-foreground' : 'border-border-strong text-muted hover:border-primary/60 hover:text-foreground',
              )}
            >
              <input type="radio" value={r.value} className="sr-only" {...register('solutionType')} />
              {r.label}
            </label>
          ))}
        </div>
        {errors.solutionType && (
          <p id="solutionType-error" role="alert" className="mt-2 text-xs text-danger">
            {errors.solutionType.message}
          </p>
        )}

        <AnimatePresence mode="popLayout">
          {questions.length > 0 && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 grid gap-5 rounded-2xl border border-primary/25 bg-primary-soft p-5 sm:grid-cols-2"
            >
              {questions.map((q) => (
                <FormField key={q.id} id={`d-${q.id}`} label={q.label} optional>
                  {q.options ? (
                    <Select id={`d-${q.id}`} defaultValue="" {...register(`details.${q.id}` as const)}>
                      <option value="">Select…</option>
                      {q.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </Select>
                  ) : (
                    <Input id={`d-${q.id}`} placeholder={q.placeholder} {...register(`details.${q.id}` as const)} />
                  )}
                </FormField>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="font-display text-lg font-medium">3. The challenge</legend>
        <div className="mt-5 grid gap-5">
          <FormField id="message" label="What problem are you trying to solve?" error={errors.message?.message} hint="A little business context helps — what happens today, and what you would like to happen instead.">
            <Textarea
              id="message"
              placeholder="e.g. We get 100+ enquiries a week on WhatsApp and our team can't reply fast enough…"
              {...register('message')}
              {...err('message')}
            />
          </FormField>
          <div className="grid gap-5 sm:grid-cols-3">
            <FormField id="budget" label="Budget" optional>
              <Select id="budget" defaultValue="" {...register('budget')}>
                <option value="">Select…</option>
                {budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </Select>
            </FormField>
            <FormField id="timeline" label="Timeline" optional>
              <Select id="timeline" defaultValue="" {...register('timeline')}>
                <option value="">Select…</option>
                {timelines.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </Select>
            </FormField>
            <FormField id="website" label="Website" optional>
              <Input id="website" placeholder="yourcompany.com" {...register('website')} />
            </FormField>
          </div>
        </div>
      </fieldset>

      <div className="mt-8">
        <label className="flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" className="mt-0.5 size-4 accent-primary" {...register('consent')} {...err('consent')} />
          <span>
            I agree that 4lancers may contact me about this enquiry, as described in the{' '}
            <a href="/privacy-policy" className="text-accent underline-offset-4 hover:underline">
              privacy policy
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-2 text-xs text-danger">
            {errors.consent.message}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-muted-2">We reply within one business day. No spam, ever.</p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send enquiry <ArrowUpRight className="size-5" aria-hidden />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
