import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { buildCanonical, buildCanonicalAndAlternates } from "@/lib/seo";
import CompassTerminal from "@/components/compass/CompassTerminal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Platform Diagnosis · MaCh2.Cloud";
  const description =
    "AI-Native Platform Readiness Assessment. Find your architectural heading in ~5 minutes.";

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: buildCanonical(`/${locale}/compass`),
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...buildCanonicalAndAlternates("/compass", locale),
  };
}

const FAQ = [
  {
    q: "How long does it take?",
    a: "~5 minutes if you're a CTO, VP Eng, or Head of Platform who understands your current stack and incidents.",
  },
  {
    q: "Who should fill it out?",
    a: "Ideally the person who gets board questions about reliability or cloud cost and engineers\u2019 complaints about \u201Cplatform drag\u201D. Usually the CTO, VP Eng, or Head of Platform.",
  },
  {
    q: "What happens after I complete it?",
    a: "You get your results immediately on screen — scored by dimension, with context on what to fix first. At the end, you can optionally book a 30-minute Architecture Audit call or close the tab. No forced calendar booking. A summary is also sent to your email.",
  },
  {
    q: "Will you see my answers?",
    a: "Yes, but there is no code or customer data. Only high‑level signals about incidents, deployment patterns, and costs. It's enough to spot structural patterns, not enough to expose sensitive information.",
  },
  {
    q: "Is this only for AI-native teams?",
    a: "No, but Compass is designed for teams that either already run AI workloads or plan to in the next 12–18 months. That's where architectural debt hurts the most.",
  },
];

const META_PILLS = ["~5 minutes", "WAF++ aligned", "instant results"];

export default async function CompassPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-deep-blue min-h-screen pt-16">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="py-20 text-center">
        <div className="wrap max-w-[720px]">
          <h1 className="font-display text-[clamp(1.75rem,4.5vw,3rem)] font-light leading-[1.15] tracking-[-0.02em] text-white mb-5">
            Find out which gaps are most likely blocking your growth phase
          </h1>

          <p className="font-body text-[15px] font-light leading-[1.7] text-grey-mid max-w-[540px] mx-auto mb-8">
            Answer 10 questions about your platform. Get an instant readout of
            your top architectural risk areas — mapped to the WAF2p framework.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {META_PILLS.map((pill) => (
            <span
              key={pill}
              className="flex items-center gap-2 font-mono text-[11px] text-grey-mid tracking-[0.06em]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan/50 flex-shrink-0" />
              {pill === "WAF++ aligned" ? (
                <a
                  href={`/${locale}/waf2p`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WAF2p is an open-source extension of the AWS Well-Architected Framework for AI-native SaaS platforms."
                  className="hover:text-electric-cyan transition-colors"
                >
                  {pill}
                </a>
              ) : (
                pill
              )}
            </span>
          ))}
        </div>
        <br></br>
        {/* Founder note */}
        <div className="border-l-2 border-electric-cyan/40 pl-5 text-left max-w-[480px] mx-auto mb-10 px-4">
          <p className="font-body text-[14px] font-light leading-[1.7] text-white/70 italic mb-4">
            &ldquo;Architectural debt is visibly burning 30–40% of engineering
            capacity and it&rsquo;s starting to show up in cloud costs and board
            conversations.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <a
              href={`/${locale}/about`}
              rel="noopener noreferrer"
              className="p-[2px] rounded-full bg-gradient-to-br from-electric-cyan/60 to-electric-cyan/10 shrink-0 hover:from-electric-cyan hover:to-electric-cyan/40 transition-all duration-200"
            >
              <Image
                src="/img/Chris.png"
                alt="Christian Weber"
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover"
              />
            </a>
            <p className="font-mono text-[11px] tracking-[0.08em] text-grey-mid">
              Christian · Founder &amp; AI‑Native Cloud & Platform Architect
            </p>
          </div>
        </div>

        <p className="font-body text-[13px] font-light leading-[1.7] text-grey-mid max-w-[480px] mx-auto mb-4">
          Used by CTOs at Series A–B SaaS teams to identify the one
          architectural gap most likely to create friction at scale.
        </p>

        <a
          href="#terminal"
          className="inline-block bg-electric-cyan text-deep-blue font-mono text-[13px] tracking-[0.06em] px-6 py-3 hover:bg-white transition-colors"
        >
          Start Platform Diagnosis →
        </a>
      </section>

      {/* ── Terminal ─────────────────────────────────────────────────── */}
      <section id="terminal" className="pb-20">
        <div className="wrap max-w-[820px] pt-8">
          <CompassTerminal />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/10">
        <div className="wrap max-w-[720px]">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-electric-cyan mb-10">
            FAQ
          </p>
          <dl className="flex flex-col gap-8">
            {FAQ.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-display text-[15px] font-medium text-white mb-2">
                  {q}
                </dt>
                <dd className="font-body text-[14px] font-light leading-[1.7] text-grey-mid">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
