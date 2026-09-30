import { useState, type ReactNode } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Before / after comparison. Driven by a native range input, so it works with
 * mouse, touch and keyboard (arrow keys) out of the box.
 */
export function ComparisonSlider({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className,
  label = 'Before and after comparison',
}: {
  before: ReactNode
  after: ReactNode
  beforeLabel?: string
  afterLabel?: string
  className?: string
  label?: string
}) {
  const [pos, setPos] = useState(50)
  return (
    <div className={cn('relative aspect-[16/10] w-full select-none overflow-hidden rounded-card border border-border bg-surface', className)}>
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
      </div>

      <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted backdrop-blur">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
        {afterLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-accent shadow-glow" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-background text-accent shadow-glow">
          <MoveHorizontal className="size-5" />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label={label}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}
