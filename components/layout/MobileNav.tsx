'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import * as Dialog from '@radix-ui/react-dialog'
import Mach2Logo from '@/components/Mach2Logo'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const locale = useLocale()

  function localeHref(path: string) {
    return `/${locale}${path === '/' ? '' : path}`
  }

  const handleNavClick = () => setOpen(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="mobile-menu-trigger" aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content className="mobile-menu-content" aria-label="Navigation menu">
          {/* Header */}
          <div className="mobile-menu-header">
            <Link href={localeHref('/')} onClick={handleNavClick} className="mobile-menu-logo">
              <Mach2Logo size={36} />
              <span>MaCh2<span className="text-white">.Cloud</span></span>
            </Link>
            <Dialog.Close asChild>
              <button className="mobile-menu-close" aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          {/* Nav links */}
          <nav className="mobile-menu-nav">
            <Link href={localeHref('/services')} onClick={handleNavClick} className="mobile-menu-link">
              Services
            </Link>
            <Link href={localeHref('/waf2p')} onClick={handleNavClick} className="mobile-menu-link">
              WAF++
            </Link>
            <Link href={localeHref('/about')} onClick={handleNavClick} className="mobile-menu-link">
              About
            </Link>
            <Link href={localeHref('/blog')} onClick={handleNavClick} className="mobile-menu-link">
              Blog
            </Link>
            <a href={localeHref('/#connect')} onClick={handleNavClick} className="mobile-menu-link">
              Contact
            </a>
          </nav>

          {/* Footer CTAs */}
          <div className="mobile-menu-footer">
            <Link href={localeHref('/#connect')} onClick={handleNavClick} className="mobile-menu-btn-secondary">
              Get in touch
            </Link>
            <Link href="/en/diagnosis" onClick={handleNavClick} className="mobile-menu-btn-primary">
              diagnosis your architecture
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
