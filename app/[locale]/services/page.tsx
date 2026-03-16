import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Bot, Cloud, DollarSign, Workflow } from 'lucide-react'
import { buildCanonical, buildCanonicalAndAlternates } from '@/lib/seo'
import { getGlobalSettings } from '@/lib/settings'
import { SERVICES_KEYWORDS } from '@/lib/keywords'
import StatsGrid from '@/components/sections/StatsGrid'
import ServicesSection from '@/components/sections/ServicesSection'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  const settings = getGlobalSettings(locale)
  const title = t('metaTitle')
  const description = t('metaDescription')
  const i18n = buildCanonicalAndAlternates('/services', locale)
  const ogImage = settings.defaultSeo?.shareImage

  return {
    title,
    description,
    keywords: SERVICES_KEYWORDS,
    openGraph: {
      type: 'website',
      url: buildCanonical(`/${locale}/services`),
      title,
      description,
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
      title,
      description,
      images: ogImage ? [ogImage.url] : undefined,
    },
    ...i18n,
  }
}

const OFFERS = [
  {
    num: '01',
    slug: 'audit',
    label: 'AUDIT',
    title: 'Architecture\nAudit',
    subtitle: 'Clarity Before Commitment',
    description:
      'A structured diagnostic of your current platform. We surface every structural risk, cost inefficiency, and scalability constraint — before they surface in production. The result is a prioritized roadmap your CTO can act on immediately.',
    trigger:
      '"We know something is wrong. We just don\'t know where to start — or how expensive it already is."',
    cta: 'Start with an Audit',
    outcomesLabel: 'What You Walk Away With',
    outcomes: [
      'Full picture of your current platform architecture and hidden technical debt',
      'Identified scalability, reliability, and cloud cost risks — ranked by severity',
      'Prioritized architectural improvement plan with clear next steps',
      'An answer to the Series B question before your investors ask it',
    ],
    deliverablesLabel: 'Deliverables',
    deliverables: ['Assessment Report', 'Risk Evaluation', 'Improvement Roadmap', 'Executive Summary'],
  },
  {
    num: '02',
    slug: 'blueprint',
    label: 'BLUEPRINT',
    title: 'Architecture\nBlueprint',
    subtitle: 'Design the Platform That Carries the Next Stage',
    description:
      'We design the target architecture — AI-native from the foundation, cost-efficient by design, production-grade by standard. Built to carry your growth stage and the one after it, without a rewrite in between.',
    trigger:
      '"We know what we need to build. We need someone who has built it before to tell us how to build it right."',
    cta: 'Design Your Blueprint',
    outcomesLabel: 'What You Walk Away With',
    outcomes: [
      'Target architecture designed for your specific growth trajectory and AI ambitions',
      'Cloud infrastructure design optimized for reliability, scalability, and cost efficiency',
      'Scalability and cost optimization strategy your team can execute against',
      'Implementation roadmap your engineers can build from with confidence',
    ],
    deliverablesLabel: 'Deliverables',
    deliverables: ['Architecture Diagrams', 'Platform Spec', 'Cost Strategy', 'Implementation Roadmap'],
  },
  {
    num: '03',
    slug: 'enablement',
    label: 'ENABLEMENT',
    title: 'Enablement &\nGuidance',
    subtitle: 'Build It Right. Own It Independently.',
    description:
      'Hands-on architectural support during implementation. Architecture reviews, real-time decision guidance, and engineering enablement sessions — so your team builds the right thing and owns it fully when I\'m no longer in the room.',
    trigger:
      '"We\'re in the build. But every architectural decision feels like a bet we\'re not sure we should take alone."',
    cta: 'Accelerate Your Build',
    outcomesLabel: 'What You Walk Away With',
    outcomes: [
      'Faster and safer infrastructure implementation with reduced architectural risk',
      'Engineering team enabled to make sound architectural decisions independently',
      'Architectural bottlenecks resolved before they become production incidents',
      'A team that owns the platform — not just operates it',
    ],
    deliverablesLabel: 'Deliverables',
    deliverables: ['Architecture Reviews', 'Hands-on Support', 'Decision Frameworks', 'Enablement Sessions'],
  },
  {
    num: '04',
    slug: 'fractional',
    label: 'FRACTIONAL',
    title: 'Fractional\nArchitect',
    subtitle: 'Principal-Level Leadership. Without the Full-Time Cost.',
    description:
      'Continuous architectural leadership aligned with your business and product strategy. Monthly cadence — architecture reviews, platform evolution planning, engineering direction, and strategic alignment. The Principal Architect your platform needs, embedded without the hiring timeline.',
    trigger:
      '"We\'re scaling fast. We need architectural leadership at every board cycle, every product decision, every infrastructure evolution — not just when things break."',
    cta: 'Explore the Retainer',
    outcomesLabel: 'Ongoing Cadence',
    outcomes: [
      'Monthly architecture review aligned to your product and business roadmap',
      'Continuous platform evolution planning — architecture grows with the business',
      'On-demand architectural guidance for engineering decisions and strategic trade-offs',
      'Investor and board-level architectural narrative — always ready',
      'Cloud cost oversight and optimization as an ongoing architectural practice',
    ],
    deliverablesLabel: 'Engagement Format',
    deliverables: ['Monthly Retainer', 'Architecture Reviews', 'Async Guidance', 'Strategic Direction'],
    featured: true,
  },
]

const PHILOSOPHY = [
  {
    icon: Bot,
    title: 'AI-Native by Design',
    text: 'AI workloads, inference patterns, and cost dynamics built into the architecture from day one — not retrofitted.',
  },
  {
    icon: Cloud,
    title: 'Cloud-Agnostic by Principle',
    text: 'Vendor lock-in is a risk, not a feature. Open standards and portability by design.',
  },
  {
    icon: DollarSign,
    title: 'Cost as Architecture',
    text: 'Cloud cost is not an afterthought. It is a design variable with direct business impact.',
  },
  {
    icon: Workflow,
    title: 'Automation as Default',
    text: 'Manual processes do not scale. Automation is the only viable operating model at growth stage.',
  },
]

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

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
        name: 'Services',
        item: buildCanonical(`/${locale}/services`),
      },
    ],
  }

  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-deep-blue py-24 lg:py-32 relative overflow-hidden">
        <div aria-hidden="true" className="grid-overlay" />

        <div className="wrap relative z-10">
          <p className="eyebrow">Offers to your needs</p>
          <h1 className="mt-7 mb-8 max-w-3xl">
            Architecture that compounds{' '}
            <em>velocity.</em>
          </h1>
          <p className="hero-sub max-w-xl mb-14">
            Four precision engagements — from architectural clarity to continuous platform leadership.
            Designed for Series A–B SaaS companies that are done firefighting and ready to build.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/en/diagnose"
              className="btn btn-p"
            >
              Start with a Diagnosis →
            </Link>
            <a href="#journey" className="btn btn-g">
              See how it works →
            </a>
          </div>
        </div>
      </section>

      {/* ── Engagement Path ──────────────────────────────────────────────── */}
      <ServicesSection sectionId="journey" />

      {/* ── Services (Offer Cards) ───────────────────────────────────────── */}
      <section id="services" className="py-16 border-t border-white/[0.06]">
        <div className="wrap">
          <p className="eyebrow mb-6">Services</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-display font-bold mb-14 max-w-lg leading-[1.2]">
            Four engagements.{' '}
            <em>One architectural trajectory.</em>
          </h2>

          <div className="flex flex-col gap-[2px]">
            {OFFERS.map((offer, idx) => {
              const isEven = idx % 2 === 1
              return (
                <div
                  key={offer.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 border rounded-lg overflow-hidden ${
                    offer.featured
                      ? 'border-electric-cyan/15 bg-electric-cyan/[0.02]'
                      : 'border-white/[0.07] bg-electric-cyan/[0.02]'
                  }`}
                >
                  {/* Left — info */}
                  <div
                    className={`p-10 lg:p-14 flex flex-col justify-between gap-10 border-b lg:border-b-0 border-white/[0.07] ${
                      isEven ? 'lg:order-2 lg:border-l lg:border-l-white/[0.07]' : 'lg:border-r lg:border-r-white/[0.07]'
                    }`}
                  >
                    <div>
                      <p className={`font-mono text-[11px] font-medium tracking-[0.15em] mb-8 flex items-center gap-2 ${offer.featured ? 'text-electric-cyan' : 'text-electric-cyan'}`}>
                        {offer.num} — {offer.label}
                        <span className="flex-1 max-w-[40px] h-px bg-electric-cyan/10 inline-block" />
                      </p>
                      <h3 className="font-display text-[2rem] lg:text-[2.25rem] font-bold leading-[1.15] text-white mb-5 whitespace-pre-line">
                        {offer.title}
                      </h3>
                      <p className={`font-mono text-[11px] font-medium tracking-[0.12em] uppercase mb-5 ${offer.featured ? 'text-electric-cyan' : 'text-electric-cyan'}`}>
                        {offer.subtitle}
                      </p>
                      <p className="font-body text-[15px] font-light leading-[1.75] text-grey-mid mb-10 max-w-lg">
                        {offer.description}
                      </p>

                      {/* Trigger moment */}
                      <div className={`rounded-md p-4 mb-9 ${offer.featured ? 'bg-electric-cyan/[0.08] border border-electric-cyan/20' : 'bg-electric-cyan/[0.05] border border-electric-cyan/10'}`}>
                        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-electric-cyan mb-2">
                          Trigger Moment
                        </p>
                        <p className="text-[14px] italic font-light text-grey-mid leading-[1.6]">
                          {offer.trigger}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/en/diagnose"
                      className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-electric-cyan no-underline transition-[gap] duration-200 hover:gap-4"
                    >
                      {offer.cta} <span className="text-base">→</span>
                    </Link>
                  </div>

                  {/* Right — outcomes */}
                  <div
                    className={`p-10 lg:p-14 flex flex-col ${offer.featured ? 'bg-electric-cyan/[0.03]' : 'bg-black/[0.15]'} ${isEven ? 'lg:order-1' : ''}`}
                  >
                    <p className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-6">
                      {offer.outcomesLabel}
                    </p>
                    <ul className="list-none m-0 p-0 flex-1 mb-10">
                      {offer.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex gap-3.5 py-3.5 border-b border-white/[0.06] last:border-0 text-[14px] font-light text-grey-100 leading-[1.5]"
                        >
                          <span className="font-mono text-[12px] text-electric-cyan mt-[3px] flex-shrink-0">
                            {'//'}
                          </span>
                          {outcome}
                        </li>
                      ))}
                    </ul>

                    <div className={`pt-8 border-t ${offer.featured ? 'border-electric-cyan/12' : 'border-white/[0.06]'}`}>
                      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/30 mb-3.5">
                        {offer.deliverablesLabel}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {offer.deliverables.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[11px] px-3 py-1 bg-electric-cyan/[0.08] border border-electric-cyan/10 rounded-sm text-electric-cyan tracking-[0.05em]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="wrap">
          <StatsGrid showHeader={true} />
        </div>
      </section>

      {/* ── Philosophy ───────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <p className="eyebrow mb-6">Engagement Philosophy</p>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-display font-bold leading-[1.15] mb-6">
                Architecture is not a one-time <em>delivery.</em>
              </h2>
              <p className="font-body text-[15px] font-light text-grey-mid leading-[1.8] mb-4">
                It is a continuously evolving system aligned with product and business growth. My role is not
                to replace your engineering team. It is to give them the clarity, direction, and frameworks
                to build at a level they couldn&apos;t reach alone.
              </p>
              <p className="font-body text-[15px] font-light text-grey-mid leading-[1.8]">
                The result is a platform that accelerates execution, supports product scalability, and enables
                sustainable business growth independent of my continued involvement.
              </p>
            </div>

            {/* 2×2 grid */}
            <div className="grid grid-cols-2 gap-[2px] bg-white/[0.06] border border-white/[0.06] rounded-lg overflow-hidden">
              {PHILOSOPHY.map((cell) => (
                <div
                  key={cell.title}
                  className="bg-electric-cyan/[0.02] p-6 lg:p-7 hover:bg-electric-cyan/[0.04] transition-colors duration-200"
                >
                  <cell.icon className="w-6 h-6 text-electric-cyan mb-3" strokeWidth={1.8} aria-hidden="true" />
                  <p className="text-[13px] font-semibold text-white mb-1.5">{cell.title}</p>
                  <p className="font-body text-[12px] font-light text-grey-mid leading-[1.6]">{cell.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-t border-white/[0.06] text-center">
        <div className="wrap">
          {/* <p className="eyebrow mb-7">Start Here</p> */}
          <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-display font-bold leading-[1.1] mb-6 tracking-tight max-w-3xl mx-auto">
            Diagnose your architecture before{' '}
            <em>growth exposes it.</em>
          </h2>
          <p className="font-body text-[16px] font-light text-grey-mid max-w-md mx-auto mb-12 leading-[1.7]">
            Start with an Architecture Diagnosis Call — 30 minutes to surface the highest-leverage thing
            worth fixing first. No commitment. No pitch. Just clarity.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/en/diagnose"
              className="btn btn-p"
            >
              Book a 30-minute Diagnosis →
            </Link>
            <p className="font-mono text-[11px] tracking-[0.08em] text-white/20">
              No pitch. One high-leverage finding you can act on.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
