import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { setRequestLocale } from 'next-intl/server'
import { buildCanonical, buildCanonicalAndAlternates } from '@/lib/seo'
import { getGlobalSettings } from '@/lib/settings'
import { CASE_KEYWORDS } from '@/lib/keywords'

const CASE_SLUGS = [
  'case-01-capgemini-kubernetes',
  'case-02-aws-autonomous-driving',
  'case-03-enterprise-saas-optimization',
  'case-04-baas-seed-startup',
] as const

const CASE_METADATA: Record<(typeof CASE_SLUGS)[number], { title: string; description: string }> = {
  'case-01-capgemini-kubernetes': {
    title: 'Enterprise Kubernetes Platform at Scale — MaCh2.cloud',
    description: 'Multi-tenant Azure Kubernetes platform design for 2,500+ developers with governance, self-service provisioning, and IaC.',
  },
  'case-02-aws-autonomous-driving': {
    title: 'Autonomous Driving Platform — MaCh2.cloud',
    description: 'Cloud infrastructure powering autonomous vehicle development.',
  },
  'case-03-enterprise-saas-optimization': {
    title: 'SaaS Optimization — MaCh2.cloud',
    description: 'Enterprise SaaS platform optimization and scaling.',
  },
  'case-04-baas-seed-startup': {
    title: 'BaaS Startup to Production — MaCh2.cloud',
    description: 'Backend-as-a-Service platform scaling from seed to production.',
  },
}

export async function generateStaticParams() {
  return CASE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const meta = CASE_METADATA[slug as (typeof CASE_SLUGS)[number]]
  const settings = getGlobalSettings(locale)

  if (!meta) {
    return {
      title: `Case not found — ${settings.siteName}`,
      ...buildCanonicalAndAlternates('/cases', locale),
    }
  }

  const canonicalPath = `/${locale}/cases/${slug}`
  const i18n = buildCanonicalAndAlternates(`/cases/${slug}`, locale)
  const ogImage = settings.defaultSeo?.shareImage

  return {
    title: meta.title,
    description: meta.description,
    keywords: CASE_KEYWORDS[slug] ?? [],
    openGraph: {
      type: 'article',
      url: buildCanonical(canonicalPath),
      title: meta.title,
      description: meta.description,
      images: ogImage
        ? [
            {
              url: ogImage.url,
              width: ogImage.width,
              height: ogImage.height,
              alt: ogImage.alternativeText ?? settings.siteName,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ogImage ? [ogImage.url] : undefined,
    },
    ...i18n,
  }
}

async function getCaseContent(slug: string, locale: string) {
  const slugTyped = slug as (typeof CASE_SLUGS)[number]
  if (!CASE_SLUGS.includes(slugTyped)) {
    return null
  }

  try {
    const filePath = join(process.cwd(), 'cases', `${slug}.html`)
    const fileContent = await readFile(filePath, 'utf-8')

    // Extract content between the nav closing tag and the footer opening tag
    // Find the case-header start and footer end
    const caseHeaderStart = fileContent.indexOf('<div class="case-header">')
    const footerStart = fileContent.indexOf('<footer')

    if (caseHeaderStart === -1 || footerStart === -1) {
      return null
    }

    // Extract from case-header to just before footer
    let content = fileContent.substring(caseHeaderStart, footerStart)

    // Transform relative links to work with localized routes
    // ../# becomes /{locale}/#
    content = content.replace(/href="\.\.\/\#/g, `href="/${locale}/#`)
    // ../ becomes /{locale}/
    content = content.replace(/href="\.\.\/"/g, `href="/${locale}/"`)
    // case-XX-*.html becomes /{locale}/cases/case-XX-*
    content = content.replace(/href="case-([a-z0-9-]+)\.html"/g, `href="/${locale}/cases/case-$1"`)

    // Also extract the styles from the head
    const styleStart = fileContent.indexOf('<style>')
    const styleEnd = fileContent.indexOf('</style>') + 8
    const styles = fileContent.substring(styleStart, styleEnd)

    return { content, styles }
  } catch {
    return null
  }
}

export default async function LocalizedCasePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  setRequestLocale(locale)

  const caseData = await getCaseContent(slug, locale)
  if (!caseData) {
    notFound()
  }

  return (
    <main style={{ paddingTop: 'var(--nav)' }}>
      <style>{caseData.styles}</style>
      <section>
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: caseData.content }} />
        </div>
      </section>
    </main>
  )
}
