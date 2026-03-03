import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

export default async function LocaleNotFound() {
  const t = await getTranslations('notFound')
  const locale = await getLocale()

  return (
    <>
      <Nav />
      <main
        style={{
          paddingTop: 'var(--nav)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="wrap" style={{ textAlign: 'center', padding: '80px var(--pad)' }}>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--cyan)',
              display: 'block',
              marginBottom: '24px',
            }}
          >
            {t('label')}
          </span>
          <h1 style={{ marginBottom: '20px' }}>
            {t('h1Part1')}
            <br />
            <em>{t('h1Emphasis')}</em>
          </h1>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 300,
              color: 'var(--g500)',
              marginBottom: '36px',
            }}
          >
            {t('sub')}
          </p>
          <Link href={`/${locale}`} className="btn btn-p">
            {t('backHome')}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
