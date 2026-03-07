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
    <main className="pt-16">
      <section className="py-20 min-h-[80vh]">
        <div className="wrap">
          <div className="eyebrow">{t('eyebrow')}</div>
          <h1>
            Architectural
            <br />
            <em>Thinking</em>
          </h1>
          <p className="hero-sub mt-6">{t('sub')}</p>

          <div className="flex flex-col gap-[3px] mt-[52px]">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="case reveal"
              >
                <div className="p-7">
                  {/* brand: mono date label — electric-cyan on dark card */}
                  <span className="font-mono text-[11px] text-electric-cyan tracking-[0.08em]">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <h3 className="mt-[10px] mb-3">{post.title}</h3>
                  <p className="font-body text-[14px] font-light leading-[1.72] text-grey-mid mb-4">
                    {post.excerpt}
                  </p>
                  <div className="tags">
                    {post.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <div className="mt-4">
                    <span className="btn-more">{t('readMore')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="reveal on mt-[52px] bg-electric-cyan/[0.02] border border-white/[0.08] border-t-[3px] border-t-electric-cyan rounded-card p-9 text-center max-w-[760px] mx-auto">
              <h3 className="mb-3">{t('emptyTitle')}</h3>
              <p className="font-body text-[14px] font-light leading-[1.72] text-grey-mid mb-5">
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
