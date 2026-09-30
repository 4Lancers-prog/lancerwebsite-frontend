import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, ChevronDown, X } from 'lucide-react'
import { mainNav } from '@/data/navigation'
import { site } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>('Services')
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-background/98 backdrop-blur-xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex h-18 items-center justify-between px-4 sm:px-6">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-full border border-border-strong"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6">
            <ul className="divide-y divide-border">
              {mainNav.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded === item.label}
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="flex w-full items-center justify-between py-5 font-display text-2xl"
                      >
                        {item.label}
                        <ChevronDown className={cn('size-5 transition-transform', expanded === item.label && 'rotate-180')} aria-hidden />
                      </button>
                      {expanded === item.label && (
                        <ul className="grid gap-1 pb-4">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <a href={c.href} onClick={onClose} className="flex items-center justify-between rounded-xl bg-surface px-4 py-3.5 text-foreground">
                                <span>
                                  <span className="block font-medium">{c.label}</span>
                                  <span className="block text-xs text-muted">{c.description}</span>
                                </span>
                                <ArrowUpRight className="size-4 text-primary" aria-hidden />
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a href={item.href} onClick={onClose} className="block py-5 font-display text-2xl">
                      {item.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
            <Button href="/contact" size="lg" className="mt-8 w-full" onClick={onClose}>
              Start a Project <ArrowUpRight className="size-5" aria-hidden />
            </Button>
            <a href={`mailto:${site.contact.email}`} className="mt-6 block text-center text-sm text-muted">
              {site.contact.email}
            </a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
