import { Sparkle } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Skewed, infinitely scrolling capability ribbons.
 * Purely visual: the same capabilities are listed as real content on the service pages.
 */
export function SkewedCarousel({ items, className }: { items: string[]; className?: string }) {
  const half = Math.ceil(items.length / 2)
  const rows = [items.slice(0, half), items.slice(half)]
  return (
    <div className={cn('relative overflow-hidden py-10', className)} aria-hidden>
      <div className="-mx-10 flex -skew-y-3 flex-col gap-4">
        {rows.map((row, r) => (
          <div
            key={r}
            className={cn(
              'flex w-max gap-4 mask-fade-x hover:[animation-play-state:paused]',
              r === 0 ? 'animate-marquee' : 'animate-marquee-reverse',
            )}
          >
            {[...row, ...row, ...row, ...row].map((label, i) => (
              <span
                key={i}
                className={cn(
                  'flex items-center gap-3 rounded-full border px-6 py-3 font-display text-lg whitespace-nowrap sm:text-xl',
                  r === 0 ? 'border-border-strong bg-surface text-foreground' : 'border-primary/40 bg-primary-soft text-accent',
                )}
              >
                <Sparkle className="size-4 text-primary" />
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
