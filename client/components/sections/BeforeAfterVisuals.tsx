import { FileSpreadsheet, MessageCircle, PhoneMissed, Phone, Clock, CheckCircle2, Bot, Globe, Gauge, Smartphone, Search, UserCheck } from 'lucide-react'
import type { Project } from '@/data/types'
import { ComparisonSlider } from '@/components/animations/ComparisonSlider'

/**
 * Illustrative before/after panels (UI illustrations, not screenshots and not metrics).
 * Swap for real project screenshots when available.
 */
function Panel({ tone, children }: { tone: 'before' | 'after'; children: React.ReactNode }) {
  return (
    <div
      className={
        tone === 'before'
          ? 'flex h-full w-full flex-col justify-center gap-3 bg-legacy p-6 pt-14 sm:p-10 sm:pt-16'
          : 'flex h-full w-full flex-col justify-center gap-3 bg-surface-2 p-6 pt-14 bg-grid sm:p-10 sm:pt-16'
      }
    >
      {children}
    </div>
  )
}

const Row = ({ icon: Icon, text, tone }: { icon: typeof Clock; text: string; tone: 'before' | 'after' }) => (
  <div
    className={
      tone === 'before'
        ? 'flex items-center gap-3 rounded-lg border border-dashed border-legacy-border bg-legacy-surface px-4 py-2.5 text-xs text-legacy-fg sm:text-sm'
        : 'flex items-center gap-3 rounded-lg border border-primary/40 bg-background/80 px-4 py-2.5 text-xs text-foreground sm:text-sm'
    }
  >
    <Icon className={tone === 'before' ? 'size-4 text-legacy-accent' : 'size-4 text-accent'} aria-hidden />
    {text}
  </div>
)

const content = {
  workflow: {
    before: [
      [MessageCircle, 'Enquiries scattered across WhatsApp chats'],
      [FileSpreadsheet, 'Leads copied into a spreadsheet by hand'],
      [Clock, 'Follow-ups depend on someone remembering'],
    ],
    after: [
      [Bot, 'Instant WhatsApp reply & qualification'],
      [UserCheck, 'Lead auto-created and assigned in CRM'],
      [CheckCircle2, 'Scheduled follow-ups, visible pipeline'],
    ],
  },
  support: {
    before: [
      [PhoneMissed, 'Calls missed at peak hours'],
      [Clock, 'Staff repeat the same answers all day'],
      [FileSpreadsheet, 'No record of what customers asked'],
    ],
    after: [
      [Phone, 'Voice agent answers in the caller’s language'],
      [UserCheck, 'Complex calls transferred with context'],
      [CheckCircle2, 'Every call summarised and logged'],
    ],
  },
  website: {
    before: [
      [Smartphone, 'Hard to use on mobile'],
      [Search, 'Services unclear, poor search visibility'],
      [Clock, 'Every text change needs a developer'],
    ],
    after: [
      [Gauge, 'Fast, server-rendered, mobile-first'],
      [Globe, 'Clear service pages with SEO foundations'],
      [CheckCircle2, 'Enquiries routed to the right person'],
    ],
  },
} as const

export function ProjectComparison({ kind }: { kind: NonNullable<Project['comparison']> }) {
  const c = content[kind]
  return (
    <ComparisonSlider
      label="Drag to compare the process before and after"
      beforeLabel="Before"
      afterLabel="After"
      before={
        <Panel tone="before">
          {c.before.map(([I, t]) => (
            <Row key={t} icon={I} text={t} tone="before" />
          ))}
        </Panel>
      }
      after={
        <Panel tone="after">
          {c.after.map(([I, t]) => (
            <Row key={t} icon={I} text={t} tone="after" />
          ))}
        </Panel>
      }
    />
  )
}
