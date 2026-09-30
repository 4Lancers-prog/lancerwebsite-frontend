import { usePageContext } from 'vike-react/usePageContext'
import { Config } from 'vike-react/Config'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/primitives'
import { Spotlight } from '@/components/animations/Spotlight'
import { site } from '@/data/site'

export default function Page() {
  const { is404 } = usePageContext()
  return (
    <>
      <Config title={is404 ? 'Page not found | 4lancers' : 'Something went wrong | 4lancers'} />
      <section className="relative flex min-h-[80dvh] items-center overflow-hidden pt-24">
        <Spotlight />
        <Container className="relative text-center">
          <img src={site.logo.mark} alt="" width={256} height={254} className="mx-auto w-24 opacity-80" />
          <p className="mt-8 font-display text-7xl font-semibold text-gradient sm:text-9xl">{is404 ? '404' : '500'}</p>
          <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">{is404 ? 'This page took a different direction.' : 'Something went wrong on our side.'}</h1>
          <p className="mx-auto mt-4 max-w-md text-muted">
            {is404 ? 'The page you are looking for does not exist or has moved.' : 'Please try again in a moment.'}
          </p>
          <Button href="/" className="mt-8">
            <ArrowLeft className="size-4" aria-hidden /> Back to home
          </Button>
        </Container>
      </section>
    </>
  )
}
