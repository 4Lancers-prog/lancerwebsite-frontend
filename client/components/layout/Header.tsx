import { useEffect, useRef, useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, ChevronDown, Menu } from 'lucide-react'
import { mainNav } from '@/data/navigation'
import { services } from '@/data/services'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/primitives'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'

export function Header() {
  const { urlPathname } = usePageContext()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(false)
  }, [urlPathname])

  const isActive = (href: string) => (href === '/' ? urlPathname === '/' : urlPathname.startsWith(href.split('/').slice(0, 2).join('/')))

  const openMega = () => {
    clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120)
  }

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'border-b border-border bg-background/75 backdrop-blur-xl' : 'border-b border-transparent',
        )}
      >
        <Container className="flex h-18 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.children ? (
                  <li key={item.label} className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
                    <button
                      type="button"
                      aria-expanded={megaOpen}
                      aria-haspopup="true"
                      onClick={() => setMegaOpen((v) => !v)}
                      onKeyDown={(e) => e.key === 'Escape' && setMegaOpen(false)}
                      className={cn(
                        'flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors hover:text-foreground',
                        urlPathname.startsWith('/services') ? 'text-foreground' : 'text-muted',
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn('size-4 transition-transform', megaOpen && 'rotate-180')} aria-hidden />
                    </button>
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full w-[40rem] -translate-x-1/2 pt-3"
                          onKeyDown={(e) => e.key === 'Escape' && setMegaOpen(false)}
                        >
                          <div className="grid grid-cols-2 gap-2 rounded-card border border-border bg-surface/95 p-3 shadow-card backdrop-blur-xl">
                            {services.map((s) => (
                              <a
                                key={s.slug}
                                href={s.href}
                                className="group flex gap-4 rounded-xl p-4 transition-colors hover:bg-surface-2"
                              >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary-soft text-accent">
                                  <s.icon className="size-5" aria-hidden />
                                </span>
                                <span>
                                  <span className="flex items-center gap-1 font-display font-medium text-foreground">
                                    {s.name}
                                    <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                                  </span>
                                  <span className="mt-1 block text-xs leading-relaxed text-muted">{s.tagline}</span>
                                </span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm transition-colors hover:text-foreground',
                        isActive(item.href) ? 'text-foreground' : 'text-muted',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/contact" size="sm" className="hidden sm:inline-flex">
              Start a Project
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(true)}
              className="flex size-11 items-center justify-center rounded-full border border-border-strong text-foreground lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </Container>
      </header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
