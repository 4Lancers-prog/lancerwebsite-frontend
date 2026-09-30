import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { Faq } from '@/data/types'
import { cn } from '@/lib/utils'

/** Accessible accordion (button + region, aria-expanded/controls, keyboard native). */
export function Accordion({ items, className }: { items: Faq[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()
  return (
    <div className={cn('divide-y divide-border rounded-card border border-border bg-surface/60', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${baseId}-b${i}`
        const panelId = `${baseId}-p${i}`
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left font-display text-base font-medium text-foreground transition-colors hover:text-accent sm:px-7 sm:text-lg"
              >
                {item.q}
                <span
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full border border-border-strong transition-transform duration-300',
                    isOpen && 'rotate-45 border-primary bg-primary text-primary-foreground',
                  )}
                >
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 leading-relaxed text-muted sm:px-7">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
