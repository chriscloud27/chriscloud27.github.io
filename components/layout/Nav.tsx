'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import Mach2Logo from '@/components/Mach2Logo'
import MobileNav from '@/components/layout/MobileNav'

export default function Nav() {
  const locale = useLocale()

  function localeHref(path: string) {
    return `/${locale}${path === '/' ? '' : path}`
  }

  return (
    <nav>
      <Link href={localeHref('/')} className="nav-logo">
        <Mach2Logo size={36} />
        <span>MaCh2<span className="text-white">.Cloud</span></span>
      </Link>

      <ul className="nav-links">
        <li><Link href={localeHref('/services')}>Services</Link></li>
        <li><Link href={localeHref('/waf2p')}>WAF++</Link></li>
        <li><Link href={localeHref('/about')}>About</Link></li>
        <li><Link href={localeHref('/blog')}>Blog</Link></li>
        <li><a href={localeHref('/#connect')}>Contact</a></li>
      </ul>

      <div className="flex items-center gap-3">
        <a
          href="https://calendly.com/chriscloud-weber/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-p nav-cta-desktop"
        >
          Get in Touch
        </a>
        <div className="nav-mobile-trigger">
          <MobileNav />
        </div>
      </div>
    </nav>
  )
}
