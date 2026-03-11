import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getBlogPost, getBlogSlugs } from '@/lib/notion'
import { Badge } from '@/components/ui/badge'
import BlogImageLightbox from '@/components/blog/BlogImageLightbox'
import { buildCanonical, buildCanonicalAndAlternates } from '@/lib/seo'
import { getGlobalSettings } from '@/lib/settings'

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await getBlogPost(slug)
  const settings = getGlobalSettings(locale)

  if (!post) {
    return {
      title: `Post not found — ${settings.siteName}`,
      ...buildCanonicalAndAlternates('/blog', locale),
    }
  }

  const canonicalPath = `/${locale}/blog/${post.slug}`
  const canonicalUrl = buildCanonical(canonicalPath)
  const imageUrl = post.coverImage ?? settings.defaultSeo?.shareImage?.url
  const publishedTime = new Date(post.date).toISOString()
  const i18n = buildCanonicalAndAlternates(`/blog/${post.slug}`, locale)

  return {
    title: `${post.title} — ${settings.siteName}`,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: post.title,
      description: post.excerpt,
      publishedTime,
      tags: post.tags,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: settings.defaultSeo?.shareImage?.width,
              height: settings.defaultSeo?.shareImage?.height,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : undefined,
    },
    ...i18n,
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

  const settings = getGlobalSettings(locale)
  const canonicalUrl = buildCanonical(`/${locale}/blog/${post.slug}`)
  const imageUrl = post.coverImage
    ? buildCanonical(post.coverImage)
    : settings.defaultSeo?.shareImage
      ? buildCanonical(settings.defaultSeo.shareImage.url)
      : undefined

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    description: post.excerpt,
    mainEntityOfPage: canonicalUrl,
    image: imageUrl ? [imageUrl] : undefined,
    author: {
      '@type': 'Person',
      name: 'Christian Weber',
    },
    publisher: {
      '@type': 'Organization',
      name: settings.siteName,
      logo: {
        '@type': 'ImageObject',
        url: buildCanonical('/img/mach2-logo-light.svg'),
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: buildCanonical(`/${locale}`),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: buildCanonical(`/${locale}/blog`),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  }

  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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

          <BlogImageLightbox
            contentHtml={post.blocks}
            coverImage={post.coverImage}
            coverAlt={post.title}
          />
        </div>
      </article>
    </main>
  )
}
