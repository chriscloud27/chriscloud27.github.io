'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

const COOKIE_NAME = 'fairup_consent'
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60 // 1 year in seconds

type ConsentValue = 'granted' | 'denied'

interface ConsentState {
  analytics_storage: ConsentValue
  ad_storage: ConsentValue
  ad_user_data: ConsentValue
  ad_personalization: ConsentValue
  functionality_storage: ConsentValue
  personalization_storage: ConsentValue
}

const VALID_VALUES = new Set<string>(['granted', 'denied'])
const CONSENT_KEYS: (keyof ConsentState)[] = [
  'analytics_storage',
  'ad_storage',
  'ad_user_data',
  'ad_personalization',
  'functionality_storage',
  'personalization_storage',
]

function isValidConsentState(value: unknown): value is ConsentState {
  if (!value || typeof value !== 'object') return false
  return CONSENT_KEYS.every(
    (key) => key in (value as Record<string, unknown>) && VALID_VALUES.has((value as Record<string, unknown>)[key] as string)
  )
}

function readConsentCookie(): ConsentState | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${COOKIE_NAME}=`))
  if (!match) return null
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(match.split('=').slice(1).join('=')))
    return isValidConsentState(parsed) ? parsed : null
  } catch {
    return null
  }
}

function writeConsentCookie(state: ConsentState) {
  const value = encodeURIComponent(JSON.stringify(state))
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax${secure}`
}

function dispatchConsentUpdate(state: ConsentState) {
  document.dispatchEvent(new CustomEvent('fairup_consent_update', { detail: state }))
}

export default function CookieConsent() {
  const t = useTranslations('cookieConsent')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const existing = readConsentCookie()
    if (existing) {
      // Re-apply stored consent so GTM picks it up on page load
      dispatchConsentUpdate(existing)
    } else {
      setVisible(true)
    }
  }, [])

  function handleAccept() {
    const state: ConsentState = {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
    }
    writeConsentCookie(state)
    dispatchConsentUpdate(state)
    setVisible(false)
  }

  function handleDecline() {
    const state: ConsentState = {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
    }
    writeConsentCookie(state)
    dispatchConsentUpdate(state)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('label')}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B1F3A] border-t border-white/10 px-4 py-4 sm:py-5"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-white/80 leading-relaxed">
          {t('message')}
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="text-sm px-4 py-2 rounded border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            {t('decline')}
          </button>
          <button
            onClick={handleAccept}
            className="text-sm px-4 py-2 rounded bg-[#00E5FF] text-[#0B1F3A] font-medium hover:bg-[#00ccee] transition-colors"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
