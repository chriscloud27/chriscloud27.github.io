import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import StatsGrid from "@/components/sections/StatsGrid";
import ProblemSection from "@/components/sections/ProblemSection";
import ServicesSection from "@/components/sections/ServicesSection";
import DiagnosisOutcomes from "@/components/onepager/DiagnosisOutcomes";
import ComparisonTable from "@/components/onepager/ComparisonTable";
import CredibilityBlock from "@/components/onepager/CredibilityBlock";
import { buildCanonical, buildCanonicalAndAlternates } from "@/lib/seo";
import HeroSection from "@/components/sections/HeroSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "MaCh2.Cloud — AI-Native Cloud Architecture for Series A–B SaaS",
    description:
      "One hour. One concrete architectural finding. Book an Architecture Diagnosis Call — 60 minutes, no commitment, immediate clarity on your highest-leverage platform risk.",
    openGraph: {
      title: "MaCh2.Cloud — AI-Native Cloud Architecture for Series A–B SaaS",
      description:
        "One hour. One concrete architectural finding. Book an Architecture Diagnosis Call — 60 minutes, no commitment, immediate clarity on your highest-leverage platform risk.",
      url: buildCanonical(`/${locale}/onepager`),
    },
    ...buildCanonicalAndAlternates("/onepager", locale),
  };
}

const DIAGNOSIS_OUTCOMES = [
  {
    title: "Structural read of your platform",
    description:
      "Where it's solid, where risk is accumulating, named and prioritized. Not documented generically.",
  },
  {
    title: "Specific gaps connected to business consequence",
    description:
      "Not a checklist. Each gap tied to cost, velocity, or reliability impact on your actual growth trajectory.",
  },
  {
    title: "Documented path forward",
    description:
      "Actionable, not filed. A written summary you can share internally, use with investors, or execute against immediately.",
  },
  {
    title: "Value regardless of next steps",
    description:
      "The call delivers insight before any paid engagement follows. That is by design — not a pitch session.",
  },
];

const CREDIBILITY_CARDS = [
  {
    title: "Platform Architecture",
    description:
      "Production-ready foundations for Series A SaaS — Well-Architected Framework, architectural decision records, DevOps culture, and engineering execution aligned to product growth.",
  },
  {
    title: "Kubernetes & AI Workloads",
    description:
      "Cost-efficient GPU VM scheduling for AI/ML workloads on Kubernetes, data privacy architecture, and C++ inference container orchestration at production scale.",
  },
  {
    title: "Global Platform Engineering",
    description:
      "Kubernetes platform engineering supporting thousands of engineers across enterprise-scale cloud transformations. Up to 90% operational automation achieved.",
  },
  {
    title: "WAF2p Framework",
    description:
      "Open-source Well-Architected Framework extension for AI-native SaaS systems. Seven pillars connecting infrastructure decisions directly to business outcomes.",
  },
];

export default async function OnepagerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      {/* Section 01 — Hero */}
      <HeroSection />

      {/* Section 02 — Stats Band */}
      <section className="bg-deep-blue py-20 lg:py-[120px] relative">
        <div aria-hidden="true" className="s-top" />
        <div className="wrap">
          <StatsGrid showHeader={false} portfolioButton={true} />
        </div>
      </section>

      {/* Section 03 — Pain (reused as-is; content reflects existing homepage pain points) */}
      <ProblemSection />

      {/* Section 04 — Diagnosis Call Outcomes */}
      <DiagnosisOutcomes
        locale={locale}
        eyebrow="THE DIAGNOSIS CALL"
        heading="One hour. One concrete finding."
        headingEmphasis="Architectural clarity you can act on"
        subline="Most CTOs carry an unanswered question: is our architecture going to hold or is it quietly becoming the constraint? After one Diagnosis Call that question has a concrete answer."
        outcomes={DIAGNOSIS_OUTCOMES}
        infoBox="Identifying one structural issue in 60 minutes can prevent a €20k–50k rewrite 18 months later."
        infoBoxEmphasis="Architectural debt is not a future expense. It is being paid right now: in engineering cycles, cloud cost, and AI features that don't hold under production load."
        ctaText="Book a Diagnosis Call →"
      />

      {/* Section 05 — Journey Path (reused as-is; links to /[locale]/services#slug) */}
      <ServicesSection sectionId="journey" />

      {/* Section 06 — Differentiation Table */}
      <ComparisonTable
        eyebrow="WHY THIS IS STRUCTURALLY DIFFERENT"
        heading="Principal Architect judgment."
        headingEmphasis="Without the Big-4 price tag"
      />

      {/* Section 07 — Credibility & Portfolio */}
      <CredibilityBlock
        eyebrow="TRACK RECORD"
        heading="Real systems."
        headingEmphasis="Real scale. Real responsibility"
        subline="Selected engagements below. Full project history on LinkedIn."
        cards={CREDIBILITY_CARDS}
        // portfolioCopy="Every project, credential, and case is documented."
        portfolioCopy=""
        portfolioCta="View Full Project Portfolio →"
        portfolioHref="https://www.linkedin.com/in/christian-weber-0591/details/projects/"
      />

      {/* Section 08 — CTA (inline; single-use) */}
      <section className="bg-deep-blue py-20 lg:py-[120px] relative overflow-hidden">
        <div aria-hidden="true" className="grid-overlay-dim" />
        <div aria-hidden="true" className="s-top" />
        <div className="wrap relative z-10">
          <div className="max-w-[600px] mx-auto text-center">
            <p className="eyebrow justify-center">START HERE</p>
            <h2>
              One hour. <em>Architectural clarity you can act on</em>
            </h2>
            <p className="font-body text-base font-light leading-[1.75] text-grey-mid mt-6 mb-10">
              A structured 60-minute Architecture Diagnosis Call. One concrete
              finding. A documented path forward. No retainer. No commitment. No
              junior team doing the analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href={`/${locale}/diagnosis`} className="btn btn-p">
                BOOK ARCHITECTURE DIAGNOSIS →
              </Link>
              <Link href={`/${locale}/services`} className="btn btn-g">
                View full engagement model →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
