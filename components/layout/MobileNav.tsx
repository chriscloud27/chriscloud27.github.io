'use client'

import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import * as Dialog from '@radix-ui/react-dialog'
import { routing } from '@/i18n/routing'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

  function localeHref(path: string) {
    return `/${locale}${path === '/' ? '' : path}`
  }

  const handleOpenChange = useCallback((v: boolean) => {
    setOpen(v)
    if (!v) {
      requestAnimationFrame(() => triggerRef.current?.focus())
    }
  }, [])

  const handleNavClick = () => setOpen(false)

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      {/* Toggle button — shows hamburger when closed, X when open */}
      <button
        ref={triggerRef}
        className="mobile-menu-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="mobile-menu-overlay" />
        <Dialog.Content className="mobile-menu-content" aria-label="Menu menu">
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <nav className="mobile-menu-nav">
            <Link href={localeHref('/')} onClick={handleNavClick} className="mobile-menu-link">
              {t('home')}
            </Link>
            <a href={localeHref('/#experience')} onClick={handleNavClick} className="mobile-menu-link">
              {t('experience')}
            </a>
            <div className="mobile-menu-section">
              <div className="mobile-menu-label">{t('cases')}</div>
              <Link href={localeHref('/cases/case-01-capgemini-kubernetes')} onClick={handleNavClick} className="mobile-menu-link mobile-menu-sublink">
                {t('case01')}
              </Link>
              <Link href={localeHref('/cases/case-02-aws-autonomous-driving')} onClick={handleNavClick} className="mobile-menu-link mobile-menu-sublink">
                {t('case02')}
              </Link>
              <Link href={localeHref('/cases/case-03-enterprise-saas-optimization')} onClick={handleNavClick} className="mobile-menu-link mobile-menu-sublink">
                {t('case03')}
              </Link>
              <Link href={localeHref('/cases/case-04-baas-seed-startup')} onClick={handleNavClick} className="mobile-menu-link mobile-menu-sublink">
                {t('case04')}
              </Link>
            </div>
            <a href={localeHref('/#portfolio')} onClick={handleNavClick} className="mobile-menu-link">
              {t('portfolio')}
            </a>
            <Link href={localeHref('/waf2p')} onClick={handleNavClick} className="mobile-menu-link">
              {t('waf2p')}
            </Link>
            <Link href={localeHref('/about')} onClick={handleNavClick} className="mobile-menu-link">
              {t('about')}
            </Link>
            <Link href={localeHref('/blog')} onClick={handleNavClick} className="mobile-menu-link">
              {t('blog')}
            </Link>
            <a href={localeHref('/#connect')} onClick={handleNavClick} className="mobile-menu-link">
              {t('connect')}
            </a>
          </nav>

          <div className="mobile-menu-footer">
            <div className="mobile-menu-locales">
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${pathnameWithoutLocale}`}
                  onClick={handleNavClick}
                  className={[
                    'mobile-menu-locale',
                    loc === locale ? 'text-electric-cyan' : 'text-grey-mid',
                  ].join(' ')}
                >
                  {loc.toUpperCase()}
                </Link>
              ))}
            </div>
            <a
              href="https://calendly.com/chriscloud-weber/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-p w-full justify-center"
            >
              {t('getInTouch')}
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
