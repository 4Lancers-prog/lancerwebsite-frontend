import { Config } from 'vike-react/Config'
import { Head } from 'vike-react/Head'
import type { SeoPage, Faq, Service } from '@/data/types'
import { site } from '@/data/site'
import { absoluteUrl } from '@/lib/utils'

type Crumb = { name: string; path: string }

type SeoProps = {
  page: SeoPage
  breadcrumbs?: Crumb[]
  faqs?: Faq[]
  service?: Service
  jsonLd?: Record<string, unknown>[]
}

const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: absoluteUrl(site.url, site.logo.full),
  email: site.contact.email,
  ...(site.contact.phone && { telephone: site.contact.phone }),
  sameAs: Object.values(site.social).filter(Boolean),
})

const website = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
})

/** Per-page title, description, canonical, Open Graph and structured data. */
export function Seo({ page, breadcrumbs, faqs, service, jsonLd = [] }: SeoProps) {
  const url = absoluteUrl(site.url, page.path)
  const image = absoluteUrl(site.url, site.logo.og)
  const data: Record<string, unknown>[] = [...jsonLd]

  if (page.path === '/') data.push(organization(), website())

  if (breadcrumbs?.length) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '/' }, ...breadcrumbs].map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: absoluteUrl(site.url, c.path),
      })),
    })
  }

  if (service) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      serviceType: service.name,
      description: service.summary,
      url,
      provider: { '@type': 'Organization', name: site.name, url: site.url },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: service.offeringsTitle,
        itemListElement: service.offerings.map((o) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: o.title, description: o.description },
        })),
      },
    })
  }

  if (faqs?.length) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }

  return (
    <>
      <Config title={page.title} description={page.description} image={image} />
      <Head>
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={site.name} />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.description} />
        {data.map((d, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
        ))}
      </Head>
    </>
  )
}
