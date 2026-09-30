import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props} />
}

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn('relative py-20 sm:py-24 lg:py-32', className)} {...props} />
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent', className)}>
      <span aria-hidden className="size-1.5 rotate-45 bg-primary" />
      {children}
    </p>
  )
}

type HeadingProps = {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

export function Heading({ eyebrow, title, lead, align = 'left', as: Tag = 'h2', className }: HeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          'font-semibold text-foreground',
          Tag === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl leading-[1.05]' : 'text-3xl sm:text-4xl lg:text-5xl leading-[1.1]',
        )}
      >
        {title}
      </Tag>
      {lead && <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  )
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative rounded-card border border-border bg-surface/70 shadow-card backdrop-blur-sm transition-colors duration-300',
        className,
      )}
      {...props}
    />
  )
}

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-xs font-medium text-muted', className)}
      {...props}
    />
  )
}

export function IconBox({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary-soft text-accent',
        className,
      )}
    >
      {children}
    </span>
  )
}
