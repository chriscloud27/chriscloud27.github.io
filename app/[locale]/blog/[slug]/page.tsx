import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { getBlogPost, getBlogSlugs } from '@/lib/notion'
import { Badge } from '@/components/ui/badge'

export const revalidate = 3600 // ISR: revalidate every hour

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return { title: 'Post not found — MaCh2.cloud' }
  return {
    title: `${post.title} — MaCh2.cloud`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, t, locale] = await Promise.all([
    getBlogPost(slug),
    getTranslations('blog'),
    getLocale(),
  ])

  if (!post) notFound()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav)' }}>
        <article style={{ padding: '80px 0 120px', minHeight: '80vh' }}>
          <div className="wrap" style={{ maxWidth: '760px' }}>
            <Link
              href={`/${locale}/blog`}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                letterSpacing: '.08em',
                color: 'var(--cyan)',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '32px',
              }}
            >
              {t('backToBlog')}
            </Link>

            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                color: 'var(--cyan)',
                letterSpacing: '.08em',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>

            <h1 style={{ marginBottom: '20px' }}>{post.title}</h1>

            {post.tags.length > 0 && (
              <div className="tags" style={{ marginBottom: '40px' }}>
                {post.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            )}

            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: post.blocks }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
