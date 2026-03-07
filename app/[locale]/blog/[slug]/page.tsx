import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getBlogPost, getBlogSlugs } from '@/lib/notion'
import { Badge } from '@/components/ui/badge'

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
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
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  setRequestLocale(locale)

  const [post, t] = await Promise.all([
    getBlogPost(slug),
    getTranslations('blog'),
  ])

  if (!post) notFound()

  return (
    <main className="pt-16">
      <article className="py-20 min-h-[80vh]">
        {/* brand: constrain article prose to 760px — narrower than max-w-text for readability */}
        <div className="wrap" style={{ maxWidth: '760px' }}>
          {/* brand: back-link as mono label */}
          <Link
            href={`/${locale}/blog`}
            className="font-mono text-[11px] tracking-[0.08em] text-electric-cyan no-underline block mb-8"
          >
            {t('backToBlog')}
          </Link>

          {/* brand: date in mono label style */}
          <span className="font-mono text-[11px] text-electric-cyan tracking-[0.08em] block mb-3">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>

          <h1 className="mb-5">{post.title}</h1>

          {post.tags.length > 0 && (
            <div className="tags mb-10">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          )}

          {/* brand: .blog-post-content uses Tailwind tokens via @apply in globals.css */}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.blocks }}
          />
        </div>
      </article>
    </main>
  )
}
