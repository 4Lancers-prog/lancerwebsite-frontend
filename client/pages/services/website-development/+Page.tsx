import { getService } from '@/data/services'
import { seoPages } from '@/data/seo'
import { Seo } from '@/components/seo/Seo'
import { ServicePage } from '@/components/sections/ServicePage'

const service = getService('website-development')

export default function Page() {
  return (
    <>
      <Seo page={seoPages.website} service={service} faqs={service.faqs} breadcrumbs={[{ name: service.name, path: service.href }]} />
      <ServicePage service={service} />
    </>
  )
}
