import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bot, Cloud, DollarSign, Workflow } from "lucide-react";
import { buildCanonical, buildCanonicalAndAlternates } from "@/lib/seo";
import { getGlobalSettings } from "@/lib/settings";
import { SERVICES_KEYWORDS } from "@/lib/keywords";
import StatsGrid from "@/components/sections/StatsGrid";
import ServicesSection from "@/components/sections/ServicesSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const settings = getGlobalSettings(locale);
  const title = t("metaTitle");
  const description = t("metaDescription");
  const i18n = buildCanonicalAndAlternates("/services", locale);
  const ogImage = settings.defaultSeo?.shareImage;

  return {
    title,
    description,
    keywords: SERVICES_KEYWORDS,
    openGraph: {
      type: "website",
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
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage.url] : undefined,
    },
    ...i18n,
  };
}

const OFFERS = [
  {
    num: "00",
    slug: "diagnosis",
    label: "DIAGNOSIS",
    title: "Architecture\nDiagnosis Call",
    subtitle: "Free — 30 minutes",
    description:
      "30‑minute working session to identify your highest‑leverage cloud/AI constraint and decide whether a 30‑Day Sprint makes sense. No slides, no pitch.",
    trigger: '"We need a clear starting point — fast."',
    cta: "Book a Diagnosis Call",
    outcomesLabel: "What You Walk Away With",
    outcomes: [
      "One concrete architectural finding you can act on immediately",
      "Concise written summary to share with your team",
      "A recommended next step — sprint or not",
    ],
    deliverablesLabel: "Deliverables",
    deliverables: [
      "One finding",
      "Written summary",
      "Next-step recommendation",
    ],
  },
  {
    num: "01",
    slug: "sprint",
    label: "SPRINT",
    title: "30‑Day Cloud & AI\nConstraint Sprint",
    subtitle: "Fixed-fee. One constraint. 90-day roadmap.",
    description:
      "A one‑month engagement to name your most expensive platform constraint and design a 90‑day roadmap to fix it. Fixed fee. Remote only. Risk‑reversal guarantee.",
    trigger:
      '"We know something needs to change. We just need to name it and make a plan."',
    cta: "Talk about a 30‑Day Sprint",
    outcomesLabel: "What You Get After 30 Days",
    outcomes: [
      "A clearly named primary platform constraint and its business impact",
      "2–3 concrete architecture decisions with pros/cons and recommendations",
      "A pragmatic 90-day implementation plan your team can execute without me",
      "A closing session with your leadership team (CTO/VP Eng, founders)",
    ],
    deliverablesLabel: "Format",
    deliverables: ["Fixed Fee", "Remote Only", "4 Weeks", "Risk‑Reversal"],
  },
  {
    num: "02",
    slug: "audit",
    label: "AUDIT",
    title: "Architecture\nAudit & Blueprint",
    subtitle: "Deeper review. Full target architecture.",
    description:
      "Deeper review and target architecture for teams that already validated the sprint and want a full blueprint for the next growth stage.",
    trigger:
      '"We know something is wrong. We just don\'t know where to start — or how expensive it already is."',
    cta: "Start with a Diagnosis Call",
    outcomesLabel: "What You Walk Away With",
    outcomes: [
      "Full picture of your current platform architecture and hidden technical debt",
      "Identified scalability, reliability and cloud cost risks — ranked by severity",
      "Prioritized architectural improvement plan with clear next steps",
      "An answer to the Series B question before your investors ask it",
    ],
    deliverablesLabel: "Deliverables",
    deliverables: [
      "Assessment Report",
      "Risk Evaluation",
      "Improvement Roadmap",
      "Executive Summary",
    ],
  },
  {
    num: "03",
    slug: "enablement",
    label: "ENABLEMENT",
    title: "Enablement &\nGuidance",
    subtitle: "Build It Right. Own It Independently.",
    description:
      "Hands‑on architectural support during implementation so your team can make the right decisions under pressure and own the platform when I am not in the room.",
    trigger:
      "\"We're in the build. But every architectural decision feels like a bet we're not sure we should take alone.\"",
    cta: "Start with a Diagnosis Call",
    outcomesLabel: "What You Walk Away With",
    outcomes: [
      "Faster and safer infrastructure implementation with reduced architectural risk",
      "Engineering team enabled to make sound architectural decisions independently",
      "Architectural bottlenecks resolved before they become production incidents",
      "A team that owns the platform — not just operates it",
    ],
    deliverablesLabel: "Deliverables",
    deliverables: [
      "Architecture Reviews",
      "Hands-on Support",
      "Decision Frameworks",
      "Enablement Sessions",
    ],
  },
  {
    num: "04",
    slug: "fractional",
    label: "FRACTIONAL",
    title: "Fractional AI‑Native\nCloud Architect",
    subtitle: "Ongoing strategic ownership. Monthly retainer.",
    description:
      "Ongoing strategic ownership of your cloud & AI architecture on a monthly retainer, once the foundations are in place.",
    trigger:
      '"We\'re scaling fast. We need architectural leadership at every board cycle, every product decision, every infrastructure evolution — not just when things break."',
    cta: "Start with a Diagnosis Call",
    outcomesLabel: "Ongoing Cadence",
    outcomes: [
      "Monthly architecture review aligned to your product and business roadmap",
      "Continuous platform evolution planning — architecture grows with the business",
      "On-demand architectural guidance for engineering decisions and strategic trade-offs",
      "Investor and board-level architectural narrative — always ready",
      "Cloud cost oversight and optimization as an ongoing architectural practice",
    ],
    deliverablesLabel: "Engagement Format",
    deliverables: [
      "Monthly Retainer",
      "Architecture Reviews",
      "Async Guidance",
      "Strategic Direction",
    ],
    featured: true,
  },
];

const PHILOSOPHY = [
  {
    icon: Bot,
    title: "AI-Native by Design",
    text: "AI workloads, inference patterns and cost dynamics built into the architecture from day one, not retrofitted.",
  },
  {
    icon: Cloud,
    title: "Cloud-Agnostic by Principle",
    text: "Vendor lock-in is a risk, not a feature. Open standards and portability by design.",
  },
  {
    icon: DollarSign,
    title: "Cost as Architecture",
    text: "Cloud cost is not an afterthought. It is a design variable with direct business impact.",
  },
  {
    icon: Workflow,
    title: "Automation as Default",
    text: "Manual processes do not scale. Automation is the only viable operating model at growth stage.",
  },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tPage = await getTranslations({ locale, namespace: "servicesPage" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildCanonical(`/${locale}`),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: buildCanonical(`/${locale}/services`),
      },
    ],
  };

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
          <p className="eyebrow">{tPage("eyebrow")}</p>
          <h1 className="max-w-3xl">
            {tPage("h1Part1")} <em>{tPage("h1Emphasis")}</em>
          </h1>
          <p className="hero-sub">{tPage("sub")}</p>
          <div className="hero-btns">
            <Link href={`/${locale}/diagnosis`} className="btn btn-p">
              {tPage("cta")}
            </Link>
            <Link href={`/${locale}/sprint`} className="btn btn-g">
              {tPage("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Engagement Path ──────────────────────────────────────────────── */}
      <ServicesSection sectionId="journey" />

      {/* ── Services (Offer Cards) ───────────────────────────────────────── */}
      <section id="services" className="py-16 border-t border-white/[0.06]">
        <div className="wrap">
          <p className="eyebrow mb-6">Your Way to Ship Faster</p>

          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-display font-bold mb-14 max-w-lg leading-[1.2]">
            Five engagements. <em>One architectural trajectory</em>
          </h2>

          <div className="flex flex-col gap-[2px]">
            {OFFERS.map((offer, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={offer.slug}
                  id={offer.slug}
                  tabIndex={-1}
                  className={`grid grid-cols-1 lg:grid-cols-2 border rounded-lg overflow-hidden ${
                    offer.featured
                      ? "border-electric-cyan/15 bg-electric-cyan/[0.02]"
                      : "border-white/[0.07] bg-electric-cyan/[0.02]"
                  }`}
                >
                  {/* Left — info */}
                  <div
                    className={`p-10 lg:p-14 flex flex-col justify-between gap-10 border-b lg:border-b-0 border-white/[0.07] ${
                      isEven
                        ? "lg:order-2 lg:border-l lg:border-l-white/[0.07]"
                        : "lg:border-r lg:border-r-white/[0.07]"
                    }`}
                  >
                    <div>
                      <p
                        className={`font-mono text-[11px] font-medium tracking-[0.15em] mb-8 flex items-center gap-2 ${offer.featured ? "text-electric-cyan" : "text-electric-cyan"}`}
                      >
                        {offer.num} — {offer.label}
                        <span className="flex-1 max-w-[40px] h-px bg-electric-cyan/10 inline-block" />
                      </p>
                      <h3 className="font-display text-[2rem] lg:text-[2.25rem] font-bold leading-[1.15] text-white mb-5 whitespace-pre-line">
                        {offer.title}
                      </h3>
                      <p
                        className={`font-mono text-[11px] font-medium tracking-[0.12em] uppercase mb-5 ${offer.featured ? "text-electric-cyan" : "text-electric-cyan"}`}
                      >
                        {offer.subtitle}
                      </p>
                      <p className="font-body text-[15px] font-light leading-[1.75] text-grey-mid mb-10 max-w-lg">
                        {offer.description}
                      </p>

                      {/* Trigger moment */}
                      <div
                        className={`rounded-md p-4 mb-9 ${offer.featured ? "bg-electric-cyan/[0.08] border border-electric-cyan/20" : "bg-electric-cyan/[0.05] border border-electric-cyan/10"}`}
                      >
                        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-electric-cyan mb-2">
                          Trigger Moment
                        </p>
                        <p className="text-[14px] italic font-light text-grey-mid leading-[1.6]">
                          {offer.trigger}
                        </p>
                      </div>
                    </div>

                    <Link href={`/${locale}/diagnosis`} className="btn btn-p">
                      {offer.cta}
                    </Link>
                  </div>

                  {/* Right — outcomes */}
                  <div
                    className={`p-10 lg:p-14 flex flex-col ${offer.featured ? "bg-electric-cyan/[0.03]" : "bg-black/[0.15]"} ${isEven ? "lg:order-1" : ""}`}
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
                            {"//"}
                          </span>
                          {outcome}
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`pt-8 border-t ${offer.featured ? "border-electric-cyan/12" : "border-white/[0.06]"}`}
                    >
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
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="wrap">
          <StatsGrid showHeader={true} portfolioButton={true} />
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
                Architecture is not a one-time <em>delivery</em>
              </h2>
              <p className="font-body text-[15px] font-light text-grey-mid leading-[1.8] mb-4">
                It is a continuously evolving system aligned with product and
                business growth. My role is not to replace your engineering
                team. It is to give them the clarity, direction and frameworks
                to build at a level they couldn&apos;t reach alone.
              </p>
              <p className="font-body text-[15px] font-light text-grey-mid leading-[1.8]">
                The result is a platform that accelerates execution, supports
                product scalability and enables sustainable business growth
                independent of my continued involvement.
              </p>
            </div>

            {/* 2×2 grid */}
            <div className="grid grid-cols-2 gap-[2px] bg-white/[0.06] border border-white/[0.06] rounded-lg overflow-hidden">
              {PHILOSOPHY.map((cell) => (
                <div
                  key={cell.title}
                  className="bg-electric-cyan/[0.02] p-6 lg:p-7 hover:bg-electric-cyan/[0.04] transition-colors duration-200"
                >
                  <cell.icon
                    className="w-6 h-6 text-electric-cyan mb-3"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <p className="text-[13px] font-semibold text-white mb-1.5">
                    {cell.title}
                  </p>
                  <p className="font-body text-[12px] font-light text-grey-mid leading-[1.6]">
                    {cell.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="bg-deep-blue py-20 border-t border-white/[0.06] relative overflow-hidden">
        <div aria-hidden="true" className="grid-overlay-dim" />
        <div className="wrap relative z-10 text-center max-w-[640px] mx-auto">
          <p className="font-body text-[15px] font-light leading-[1.75] text-grey-mid mb-8">
            Not sure where you are on this ladder? Start with a 30‑minute
            Architecture Diagnosis Call and we will decide together.
          </p>
          <Link href={`/${locale}/diagnosis`} className="btn btn-p">
            Start with a Diagnosis Call
          </Link>
        </div>
      </section>
    </main>
  );
}
