import { seoPages } from '@/data/seo'
import { termsSections, LEGAL_UPDATED } from '@/data/legal'
import { Seo } from '@/components/seo/Seo'
import { LegalPage } from '@/components/sections/LegalPage'

export default function Page() {
  return (
    <>
      <Seo page={seoPages.terms} breadcrumbs={[{ name: 'Terms & Conditions', path: '/terms' }]} />
      <LegalPage title="Terms & Conditions" path="/terms" updated={LEGAL_UPDATED} intro="The ground rules for using this website." sections={termsSections} />
    </>
  )
}
