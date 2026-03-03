import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { getBlogPosts } from '@/lib/notion'
import { Badge } from '@/components/ui/badge'

export const revalidate = 3600 // ISR: revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('blog')
  return { title: `${t('eyebrow')} — MaCh2.cloud` }
}

export default async function BlogPage() {
  const t = await getTranslations('blog')
  const locale = await getLocale()
  const posts = await getBlogPosts()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav)' }}>
        <section style={{ padding: '80px 0 120px', minHeight: '80vh' }}>
          <div className="wrap">
            <div className="eyebrow">{t('eyebrow')}</div>
            <h1>
              Architecture
              <br />
              <em>Thinking</em>
            </h1>
            <p className="hero-sub" style={{ marginTop: '24px' }}>
              {t('sub')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '52px' }}>
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="case reveal"
                >
                  <div style={{ padding: '28px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '11px',
                        color: 'var(--cyan)',
                        letterSpacing: '.08em',
                      }}
                    >
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <h3 style={{ marginTop: '10px', marginBottom: '12px' }}>{post.title}</h3>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 300,
                        lineHeight: 1.72,
                        color: 'var(--g500)',
                        marginBottom: '16px',
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <div className="tags">
                      {post.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                    <div style={{ marginTop: '16px' }}>
                      <span className="btn-more">{t('readMore')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {posts.length === 0 && (
              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '12px',
                  color: 'var(--g700)',
                  textAlign: 'center',
                  marginTop: '52px',
                }}
              >
                {t('comingSoon')}
              </p>
            )}

            <p
              style={{
                marginTop: '52px',
                fontFamily: 'var(--mono)',
                fontSize: '12px',
                color: 'var(--g700)',
                textAlign: 'center',
              }}
            >
              {t('comingSoon')}{' '}
              <Link
                href={`/${locale}/#connect`}
                style={{ color: 'var(--cyan)', textDecoration: 'none' }}
              >
                {t('subscribe')}
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
