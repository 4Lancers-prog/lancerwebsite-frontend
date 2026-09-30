import { site } from '@/data/site'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <a href="/" aria-label="4lancers — home" className={cn('group flex items-center gap-2.5', className)}>
      <img
        src={site.logo.mark}
        alt=""
        width={34}
        height={34}
        className="h-8 w-auto transition-transform duration-500 group-hover:rotate-90"
      />
      <img src={site.logo.word} alt="4lancers" width={120} height={18} className="h-[18px] w-auto" />
    </a>
  )
}
