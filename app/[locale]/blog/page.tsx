import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getBlogPosts } from '@/lib/notion'
import { Badge } from '@/components/ui/badge'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return { title: `${t('eyebrow')} — MaCh2.cloud` }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog')
  const posts = await getBlogPosts()

  return (
    <main style={{ paddingTop: 'var(--nav)' }}>
        <section style={{ padding: '80px 0 120px', minHeight: '80vh' }}>
          <div className="wrap">
            <div className="eyebrow">{t('eyebrow')}</div>
            <h1>
              Architectural
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
              <div
                className="reveal on"
                style={{
                  marginTop: '52px',
                  background: 'rgba(255,255,255,.02)',
                  border: '1px solid rgba(255,255,255,.08)',
                  borderTop: '3px solid var(--cyan)',
                  borderRadius: '8px',
                  padding: '36px 28px',
                  textAlign: 'center',
                  maxWidth: '760px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <h3 style={{ marginBottom: '12px' }}>{t('emptyTitle')}</h3>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    lineHeight: 1.72,
                    color: 'var(--g500)',
                    marginBottom: '20px',
                  }}
                >
                  {t('emptyDescription')}
                </p>
                <Link href={`/${locale}/#connect`} className="btn btn-p">
                  {t('contactCta')}
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
  )
}
