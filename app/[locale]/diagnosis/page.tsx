import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { CalEmbed } from "./CalEmbed";
import { buildCanonical, buildCanonicalAndAlternates } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Architecture Diagnosis Call — MaCh2.Cloud",
    description:
      "30 minutes to find your highest-leverage Cloud & AI constraint. Free for pre-seed, seed and Series A CTOs. Book a working session — no slides, no pitch.",
    openGraph: {
      title: "Architecture Diagnosis Call — MaCh2.Cloud",
      description:
        "30 minutes. One concrete constraint identified. Book a free Architecture Diagnosis Call with Christian Weber.",
      url: buildCanonical(`/${locale}/diagnosis`),
    },
    ...buildCanonicalAndAlternates("/diagnosis", locale),
  };
}

function getJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Architecture Diagnosis Call",
    provider: { "@type": "Person", name: "Christian Weber" },
    description:
      "30-minute architecture diagnosis for B2B SaaS CTOs — identify the highest-leverage Cloud & AI constraint and decide whether a 30-Day Sprint makes sense.",
    url: buildCanonical(`/${locale}/diagnosis`),
  };
}

const WHO_FOR = [
  "CTOs and VP Engineering of B2B SaaS companies",
  "5–40 engineers, cloud‑native stack",
  "Series A/B feeling real pressure from cloud costs, platform stability or AI delivery",
];

const WHAT_WE_DO = [
  "Map your product, team and cloud/AI footprint.",
  "Pinpoint the most expensive constraint (cost, stability or AI‑delivery).",
  "Give you a recommendation: run a 30‑day sprint, or not.",
];

const stats = [
  { value: "30'", label: "Working session", sub: "no extensions" },
  { value: "one", label: "Concrete finding", sub: "not a slide deck" },
  { value: "zero", label: "Commitment required", sub: "to book" },
];

const faqs = [
  {
    question: "Who is this not for?",
    answer:
      "This is not for pre-product teams, companies without an active engineering team, or leaders looking for someone to simply build infrastructure for them. It is for CTOs and technical founders who want to think clearly about structural constraints before they compound.",
  },
  {
    question: "What should I prepare before the call?",
    answer:
      "Bring the current reality, not a polished narrative. A short architecture diagram or stack overview, your top one to three bottlenecks, and recent examples where delivery, reliability, or cloud spend created business friction are enough. If useful, share those in advance. If not, we can map it live in the first phase.",
  },
  {
    question: "How do you prepare for the call?",
    answer:
      "I do prep work before we meet. I review what you send, research your product and company context, and arrive with an initial diagnostic hypothesis to pressure-test together. The call starts informed, not generic.",
  },
  {
    question: "Is this confidential?",
    answer:
      "Yes. You can request an NDA before the call. Nothing from the session is shared or reused without your explicit permission.",
  },
  {
    question: "What happens after the call?",
    answer:
      "Within 24 hours, you receive the core finding in writing so you can use it internally. If there is a clear fit for deeper work, I outline what that can look like. No pressure and no automated follow-up sequence.",
  },
];

export default async function DiagnosisPage({
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
        eyebrow="Architecture Diagnosis Call"
        headline="Architecture Diagnosis Call"
        sub="30 minutes to find your highest‑leverage Cloud & AI constraint."
        body="Most B2B SaaS teams I work with see the same patterns: cloud costs grow faster than revenue, AI features work in PoC but break in production, and engineers spend more time firefighting than shipping. In this 30‑minute call we map your current platform, identify the single most expensive constraint, and decide whether a 30‑Day Cloud & AI Constraint Sprint would move the needle."
        ctaPrimary={{
          label: "Book a Diagnosis Call",
          href: "#book-diagnosis-call",
        }}
        ctaSecondary={{
          label: "See the 30-Day Sprint →",
          href: `/${locale}/sprint`,
        }}
      />

      {/* ── Who + What (2-col on desktop) ────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-14">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            {/* Left — Who this is for */}
            <div className="pb-10 lg:pb-0 lg:pr-14">
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-electric-cyan mb-5">
                Who this is for
              </p>
              <ul className="list-none m-0 p-0 space-y-3">
                {WHO_FOR.map((item) => (
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

            {/* Right — What we do in 30 minutes */}
            <div className="pt-10 lg:pt-0 lg:pl-14">
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-electric-cyan mb-5">
                What we do in 30 minutes
              </p>
              <ul className="list-none m-0 p-0 space-y-3">
                {WHAT_WE_DO.map((item) => (
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

      {/* ── Format & Pricing ─────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-14">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            {/* Left — Format details */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-electric-cyan mb-5">
                Format &amp; pricing
              </p>
              <p className="font-body text-[14px] font-light leading-[1.75] text-grey-mid mb-3">
                <span className="text-white font-medium">Format:</span> 30
                minutes on Google Meet with your CTO/VP Engineering and
                optionally one tech lead
              </p>
              <p className="font-body text-[14px] font-light leading-[1.75] text-grey-mid italic mt-6 pt-6 border-t border-white/[0.06]">
                "If I cannot help, I will tell you and you still walk away with
                a clearer picture of your platform. If there is a fit, we can
                discuss a 30‑Day Cloud &amp; AI Constraint Sprint. No slides, no
                fluff."
              </p>
            </div>

            {/* Right — Price callout */}
            <div className="flex flex-col gap-4">
              {/* Regular price */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[13px] text-grey-mid">
                  Regular price:
                </span>
                <span className="font-mono text-[18px] text-grey-mid line-through decoration-grey-mid/60">
                  250 €
                </span>
              </div>

              {/* Founder offer badge */}
              <div className="inline-flex items-start gap-4 rounded-lg border border-green-400/40 bg-green-500/10 px-5 py-4 w-full max-w-sm">
                <div className="flex-1">
                  <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-green-400 mb-1">
                    Founder offer
                  </p>
                  <p className="font-mono text-[48px] font-bold leading-none text-green-400 mb-1">
                    0 €
                  </p>
                  <p className="font-body text-[12px] font-light leading-[1.5] text-green-300/80">
                    Limited free sessions per month for pre‑seed, seed and
                    Series A CTOs while I refine this format.
                  </p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/[0.06] mt-2">
                {stats.map((s) => (
                  <div key={s.value}>
                    <div className="font-mono text-[24px] font-bold text-electric-cyan leading-none mb-1.5">
                      {s.value}
                    </div>
                    <div className="font-mono text-[10px] text-grey-mid leading-[1.5]">
                      {s.label}
                      <br />
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cal.com Booking ───────────────────────────────────────────────── */}
      <section
        id="book-diagnosis-call"
        className="border-t border-white/[0.06] py-20"
      >
        <div className="wrap">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white mb-3 max-w-lg leading-[1.2]">
            Book the call
          </h2>
          <p className="font-mono text-[12px] tracking-[0.08em] text-grey-mid mb-10">
            30 minutes. The only requirement is that you come with a real
            problem.
          </p>
          <div
            className="overflow-hidden bg-deep-blue"
            style={{ minHeight: "600px" }}
          >
            <CalEmbed />
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-20">
        <div className="wrap max-w-[860px]">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white mb-3 leading-[1.2]">
            FAQs before booking
          </h2>
          <p className="font-body text-[14px] font-light leading-[1.75] text-grey-mid mb-10 max-w-[640px]">
            Direct answers to the questions most CTOs ask when they are almost
            ready to book.
          </p>

          <div className="space-y-3">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-electric-cyan/20 bg-electric-cyan/[0.03] open:border-electric-cyan/40"
              >
                <summary className="list-none cursor-pointer px-5 py-4 flex items-start justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-white/90">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-electric-cyan text-[18px] leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-0 border-t border-white/[0.08]">
                  <p className="pt-4 font-body text-[14px] font-light leading-[1.75] text-grey-mid">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sprint link ──────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-12">
        <div className="wrap text-center">
          <p className="font-body text-[14px] font-light text-grey-mid mb-4">
            After the call — if there is a fit — we can discuss a structured
            30‑day engagement.
          </p>
          <Link href={`/${locale}/sprint`} className="btn btn-g">
            Learn about the 30‑Day Cloud &amp; AI Constraint Sprint →
          </Link>
        </div>
      </section>
    </main>
  );
}
