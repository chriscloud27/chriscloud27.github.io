'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import Mach2Logo from '@/components/Mach2Logo'
import MobileNav from '@/components/layout/MobileNav'
import { routing } from '@/i18n/routing'

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  /** Strip the current locale prefix to get the path segment */
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

  /** Build a locale-aware href */
  function localeHref(path: string) {
    return `/${locale}${path === '/' ? '' : path}`
  }

  return (
    <nav>
      <Link href={localeHref('/')} className="nav-logo">
        <Mach2Logo size={40} />
        <span style={{ color: 'var(--cyan)' }}>
          MaCh2<span style={{ color: 'var(--g500)' }}>.cloud</span>
        </span>
      </Link>

      <ul className="nav-links">
        <li>
          <Link href={localeHref('/')}>{t('home')}</Link>
        </li>
        <li>
          <a href={localeHref('/#experience')}>{t('experience')}</a>
        </li>
        <li className="nav-item has-dropdown">
          <span>{t('cases')}</span>
          <ul className="nav-dropdown">
            <li>
              <Link href={localeHref('/cases/case-01-capgemini-kubernetes')}>
                {t('case01')}
              </Link>
            </li>
            <li>
              <Link href={localeHref('/cases/case-02-aws-autonomous-driving')}>
                {t('case02')}
              </Link>
            </li>
            <li>
              <Link href={localeHref('/cases/case-03-enterprise-saas-optimization')}>
                {t('case03')}
              </Link>
            </li>
            <li>
              <Link href={localeHref('/cases/case-04-baas-seed-startup')}>
                {t('case04')}
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <a href={localeHref('/#portfolio')}>{t('portfolio')}</a>
        </li>
        <li>
          <Link href={localeHref('/about')}>{t('about')}</Link>
        </li>
        <li>
          <Link href={localeHref('/blog')}>{t('blog')}</Link>
        </li>
        <li>
          <a href={localeHref('/#connect')}>{t('connect')}</a>
        </li>
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Language switcher */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {routing.locales.map((loc) => (
            <Link
              key={loc}
              href={`/${loc}${pathnameWithoutLocale}`}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: loc === locale ? 'var(--cyan)' : 'var(--g700)',
                textDecoration: 'none',
                transition: 'color .2s',
              }}
            >
              {loc}
            </Link>
          ))}
        </div>

        <a
          href="https://calendly.com/chriscloud-weber/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-p"
        >
          {t('getInTouch')}
        </a>

        <div className="nav-mobile-trigger">
          <MobileNav />
        </div>
      </div>
    </nav>
  )
}
