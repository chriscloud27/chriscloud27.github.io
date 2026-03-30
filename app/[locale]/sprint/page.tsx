import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { buildCanonical, buildCanonicalAndAlternates } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "30-Day Cloud & AI Constraint Sprint — MaCh2.Cloud",
    description:
      "One month to identify and unlock the most expensive constraint in your platform. Fixed fee, remote, risk-reversal guarantee. For B2B SaaS teams with 5–40 engineers.",
    openGraph: {
      title: "30-Day Cloud & AI Constraint Sprint — MaCh2.Cloud",
      description:
        "Fixed-fee 30-day sprint to name your primary platform constraint and deliver a 90-day roadmap. Risk-reversal guarantee.",
      url: buildCanonical(`/${locale}/sprint`),
    },
    ...buildCanonicalAndAlternates("/sprint", locale),
  };
}

function getJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "30-Day Cloud & AI Constraint Sprint",
    provider: { "@type": "Person", name: "Christian Weber" },
    description:
      "One month to identify and unlock the most expensive constraint in your B2B SaaS platform. Fixed fee, remote, risk-reversal guarantee.",
    url: buildCanonical(`/${locale}/sprint`),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      priceRange: "3500-5000",
      description: "Fixed fee, risk-reversal guarantee",
    },
  };
}

const OUTCOMES = [
  "A clearly named primary platform constraint and its business impact.",
  "2–3 concrete architecture decisions with pros/cons and recommendations.",
  "A pragmatic 90-day implementation plan your team can execute without me.",
  "A closing session with your leadership team (CTO/VP Eng, founders).",
];

const HOW_IT_WORKS = [
  {
    week: "Week 1",
    label: "Kickoff & Discovery",
    body: "60‑minute deep‑dive call, access to your code/infra (read‑only) and relevant docs, first hypotheses.",
  },
  {
    week: "Weeks 2–3",
    label: "Analysis & Validation",
    body: "Architecture and workload review (cloud, data, AI), 1–2 short check‑ins with tech leads.",
  },
  {
    week: "Week 4",
    label: "Decisions & Roadmap",
    body: "60–90‑minute workshop to present findings, make key decisions and agree on the 90‑day roadmap.",
  },
];

export default async function SprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-deep-blue min-h-screen pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(locale)) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="30-Day Engagement"
        headline="30‑Day Cloud & AI Constraint Sprint"
        sub="One month to identify and unlock the most expensive constraint in your platform."
        ctaPrimary={{
          label: "Talk about a 30‑Day Sprint",
          href: `/${locale}/diagnosis`,
        }}
      />

      {/* ── Who + Outcomes (2-col) ───────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-14">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            {/* Left — Who this is for */}
            <div className="pb-10 lg:pb-0 lg:pr-14">
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-electric-cyan mb-5">
                Who this is for
              </p>
              <p className="font-body text-[14px] font-light leading-[1.75] text-grey-mid">
                B2B SaaS teams (pre‑seed to Series A), 5–40 engineers,
                cloud‑native, with real pain around cloud costs, platform
                stability or AI features that do not make it reliably to
                production.
              </p>
            </div>

            {/* Right — What you get */}
            <div className="pt-10 lg:pt-0 lg:pl-14">
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-electric-cyan mb-5">
                What you get after 30 days
              </p>
              <ul className="list-none m-0 p-0 space-y-3">
                {OUTCOMES.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[14px] font-light text-grey-mid leading-[1.6]"
                  >
                    <span className="font-mono text-[12px] text-electric-cyan mt-[2px] flex-shrink-0">
                      {"//"}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works (3-col horizontal) ─────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-14">
        <div className="wrap">
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-electric-cyan mb-8">
            How it works
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px]">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.week}
                className="border border-white/[0.08] rounded-lg p-7 bg-electric-cyan/[0.02] hover:border-electric-cyan/25 transition-colors duration-200"
              >
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-electric-cyan/60 mb-2">
                  {step.week}
                </p>
                <h3 className="font-display text-[16px] font-bold text-white leading-[1.3] mb-3">
                  {step.label}
                </h3>
                <p className="font-body text-[13px] font-light leading-[1.7] text-grey-mid">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Investment & Risk ────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-14">
        <div className="wrap">
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-electric-cyan mb-8">
            Investment &amp; risk
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Investment */}
            <div className="border border-white/[0.08] rounded-lg p-7 bg-electric-cyan/[0.02]">
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/40 mb-3">
                Investment
              </p>
              <p className="font-mono text-[42px] font-bold text-white leading-none mb-2">
                3,500–5,000 €
              </p>
              <p className="font-mono text-[11px] text-grey-mid tracking-[0.05em]">
                Fixed fee · Remote only
              </p>
            </div>

            {/* Risk reversal */}
            <div className="border border-electric-cyan/25 rounded-lg p-7 bg-electric-cyan/[0.03]">
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-electric-cyan mb-3">
                Risk‑reversal guarantee
              </p>
              <p className="font-body text-[13px] font-light leading-[1.75] text-grey-mid mb-4">
                If by the end of 30 days you do not feel that (1) your primary
                constraint is clearly named and (2) you have a concrete 90‑day
                roadmap in your hands, I set my invoice to{" "}
                <span className="text-white font-medium">0 €</span> or you can
                use 100% of the fee as a credit for further collaboration.
              </p>
              <p className="font-mono text-[11px] text-electric-cyan/70">
                Your risk: a few focused hours with your key people.
                <br />
                My risk: I do not get paid if I do not deliver.
              </p>
            </div>
          </div>

          {/* Single CTA */}
          <div className="text-center">
            <Link href={`/${locale}/diagnosis`} className="btn btn-p">
              Talk about a 30‑Day Sprint
            </Link>
            <p className="font-mono text-[11px] text-grey-mid mt-4">
              Starts with a free 30‑minute Architecture Diagnosis Call.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
