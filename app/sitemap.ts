import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getBlogSlugs } from '@/lib/notion'
import { buildCanonical } from '@/lib/seo'

export const dynamic = 'force-static'

const STATIC_ROUTE_KEYS = ['/', '/about', '/blog'] as const

const CASE_SLUGS = [
  'case-01-capgemini-kubernetes',
  'case-02-aws-autonomous-driving',
  'case-03-enterprise-saas-optimization',
  'case-04-baas-seed-startup',
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    for (const routeKey of STATIC_ROUTE_KEYS) {
      const localizedPath = routeKey === '/' ? `/${locale}` : `/${locale}${routeKey}`
      entries.push({
        url: buildCanonical(localizedPath),
        lastModified: now,
        changeFrequency: routeKey === '/' ? 'weekly' : 'monthly',
        priority: routeKey === '/' ? 1 : routeKey === '/blog' ? 0.8 : 0.7,
      })
    }

    for (const slug of CASE_SLUGS) {
      entries.push({
        url: buildCanonical(`/${locale}/cases/${slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  const blogSlugs = await getBlogSlugs()

  for (const locale of routing.locales) {
    for (const slug of blogSlugs) {
      entries.push({
        url: buildCanonical(`/${locale}/blog/${slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
