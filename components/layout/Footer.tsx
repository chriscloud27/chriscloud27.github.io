import Link from 'next/link'
import { getLocale } from 'next-intl/server'
import Mach2Logo from '@/components/Mach2Logo'

export default async function Footer() {
  const locale = await getLocale()

  function localeHref(path: string) {
    return `/${locale}${path === '/' ? '' : path}`
  }

  return (
    <footer className="bg-deep-blue border-t border-electric-cyan/[0.08]">
      <div className="wrap">
        <div className="foot-inner">
          <Link href={localeHref('/')} className="foot-logo">
            <Mach2Logo size={24} />
            <span>MaCh2<span className="text-white">.Cloud</span></span>
          </Link>

          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-grey-700">
            AI-Native Cloud Architecture
          </span>

          <ul className="foot-links">
            <li><a href={localeHref('/#services')}>Services</a></li>
            <li><a href={localeHref('/#how-it-works')}>How It Works</a></li>
            <li><Link href={localeHref('/about')}>About</Link></li>
            <li><Link href={localeHref('/blog')}>Blog</Link></li>
            <li><a href={localeHref('/#connect')}>Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
