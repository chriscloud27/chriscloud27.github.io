import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import Link from 'next/link'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about')
  return { title: `${t('eyebrow')} — MaCh2.cloud` }
}

export default async function AboutPage() {
  const t = await getTranslations('about')
  const locale = await getLocale()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav)' }}>
        <section style={{ padding: '80px 0 120px', minHeight: '80vh' }}>
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
      </main>
      <Footer />
    </>
  )
}
