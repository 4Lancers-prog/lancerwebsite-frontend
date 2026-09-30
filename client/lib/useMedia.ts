import { useEffect, useState } from 'react'

/** SSR-safe media query hook. Returns `false` on the server and first paint. */
export function useMedia(query: string) {
  const [match, setMatch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatch(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return match
}

/** True only on devices with a precise pointer and no reduced-motion preference. */
export const useFinePointer = () => useMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
