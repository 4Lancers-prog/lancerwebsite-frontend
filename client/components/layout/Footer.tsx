import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { footerNav } from '@/data/navigation'
import { site } from '@/data/site'
import { Container } from '@/components/ui/primitives'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()
  const socials = Object.entries(site.social).filter(([, v]) => v)
  return (
    <footer className="relative border-t border-border bg-surface/40">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr] lg:py-20">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-6 leading-relaxed text-muted">{site.coreMessage}</p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>
              <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-3 text-foreground hover:text-accent">
                <Mail className="size-4 text-primary" aria-hidden /> {site.contact.email}
              </a>
            </li>
            {site.contact.phone && (
              <li>
                <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-3 text-foreground hover:text-accent">
                  <Phone className="size-4 text-primary" aria-hidden /> {site.contact.phone}
                </a>
              </li>
            )}
            {site.contact.address && (
              <li className="inline-flex items-center gap-3 text-muted">
                <MapPin className="size-4 text-primary" aria-hidden /> {site.contact.address}
              </li>
            )}
            <li className="flex items-center gap-3 text-muted">
              <Clock className="size-4 text-primary" aria-hidden /> {site.contact.hours}
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-2">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.items.map((i) => (
                  <li key={i.href}>
                    <a href={i.href} className="text-sm text-muted transition-colors hover:text-foreground">
                      {i.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted-2 sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          {socials.length > 0 && (
            <ul className="flex gap-5">
              {socials.map(([k, v]) => (
                <li key={k}>
                  <a href={v} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-foreground">
                    {k}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p>Built around your business.</p>
        </Container>
      </div>
    </footer>
  )
}
