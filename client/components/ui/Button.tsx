import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'link'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary select-none'

const variants: Record<Variant, string> = {
  primary:
    'rounded-full bg-primary text-primary-foreground shadow-glow hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'rounded-full border border-border-strong bg-surface/60 text-foreground backdrop-blur hover:border-primary/60 hover:bg-surface-2',
  ghost: 'rounded-full text-muted hover:text-foreground hover:bg-surface-2',
  link: 'text-accent underline-offset-4 hover:underline px-0',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-7 text-base',
}

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode }

type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

export function Button(props: AsLink | AsButton) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props
  const cls = cn(base, variants[variant], variant !== 'link' && sizes[size], className)
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
