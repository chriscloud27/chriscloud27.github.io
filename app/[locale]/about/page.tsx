import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Experience from '@/components/sections/Experience'
import CoreValues from '@/components/sections/CoreValues'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return { title: `${t('eyebrow')} — MaCh2.cloud` }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  const values = [
    {
      title: 'Intelligent',
      description: 'We think systematically about tradeoffs. Every architecture decision is reasoned, documented, and optimized for your specific constraints — not generic best practices.'
    },
    {
      title: 'Sovereign',
      description: 'Your infrastructure serves your business, not vice versa. We design cloud-agnostic architectures that give you optionality and prevent lock-in to single vendors.'
    },
    {
      title: 'Trustworthy',
      description: 'Security and compliance are non-negotiable. We architect with defense-in-depth, audit trails, and zero-trust principles built in from day one.'
    },
    {
      title: 'Platform',
      description: 'Great infrastructure enables product velocity. We build platforms that scale with your team, not against it — enabling engineers to move faster and ship with confidence.'
    },
    {
      title: 'Speed',
      description: 'Slow infrastructure kills startups. We deliver rapid time-to-market without cutting corners on reliability, security, or long-term scalability.'
    }
  ]

  return (
    <main style={{ paddingTop: 'var(--nav)' }}>
        {/* Hero Section */}
        <section style={{ padding: '80px 0 60px' }}>
          <div className="wrap">
            <div className="eyebrow">{t('eyebrow')}</div>
            <h1>
              Christian Weber
              <br />
              <em>AI-Native Cloud Architect</em>
            </h1>
            <p className="hero-sub" style={{ marginTop: '24px' }}>
              {t('sub')}
            </p>
            <p
              style={{
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'var(--g500)',
                maxWidth: '680px',
                marginBottom: '32px',
              }}
            >
              {t('description')}
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://calendly.com/chriscloud-weber/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-p"
              >
                {t('cta')}
              </a>
              <Link href={`/${locale}/#portfolio`} className="btn btn-g">
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>
        </section>

                    <Experience />
              

        <CoreValues />
      </main>
  )
}
