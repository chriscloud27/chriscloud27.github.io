'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

export function CalEmbed() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: 'diagnosis-call' })
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#0B1F3A' },
          dark: { 'cal-brand': '#00E5FF' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [])

  return (
    <Cal
      namespace="diagnosis-call"
      calLink="mach2cloud/diagnosis-call"
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{
        layout: 'month_view',
        useSlotsViewOnSmallScreen: 'true',
      }}
    />
  )
}
