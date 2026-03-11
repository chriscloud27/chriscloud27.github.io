'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import * as Dialog from '@radix-ui/react-dialog'

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
        <button
          className={`mobile-menu-trigger${open ? ' is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="mobile-menu-overlay" />
        <Dialog.Content className="mobile-menu-content" aria-label="Navigation menu">
          <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
          <Dialog.Description className="sr-only">Site navigation links</Dialog.Description>

          <Dialog.Close asChild>
            <button className="mobile-menu-close" aria-label="Close menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </Dialog.Close>

          <nav className="mobile-menu-nav">
            <a href={localeHref('/#services')} onClick={handleNavClick} className="mobile-menu-link">
              Services
            </a>
            <a href={localeHref('/#how-it-works')} onClick={handleNavClick} className="mobile-menu-link">
              How It Works
            </a>
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

          <div className="mobile-menu-footer">
            <a
              href="https://calendly.com/chriscloud-weber/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-p w-full justify-center"
              onClick={handleNavClick}
            >
              Get in Touch
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
