import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { Providers } from '@/lib/providers'
import RevealObserver from '@/components/RevealObserver'
import Header from '@/components/layout/Header'
import Connect from '@/components/sections/Connect'
import Footer from '@/components/layout/Footer'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Christian Weber — AI-Native Cloud Architect',
  description:
    'I help Seed–Series C SaaS CTOs design AI-native cloud architectures that scale reliably — cloud-agnostic, security-first, production-ready.',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            {children}
            <Connect />
            <Footer />
            <RevealObserver />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
