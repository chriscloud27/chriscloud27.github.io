import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { CalEmbed } from './CalEmbed'

export const metadata: Metadata = {
  title: 'Architecture Diagnosis Call — MaCh2.Cloud',
  description:
    'A structured 60-minute session to surface the one architectural constraint compounding your platform\'s problems. You leave with a clearer picture either way.',
  openGraph: {
    title: 'Architecture Diagnosis Call — MaCh2.Cloud',
    description:
      '30 minutes. One clear finding. Book a structured architecture diagnosis with Christian Weber.',
    url: 'https://mach2.cloud/en/diagnose',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Architecture Diagnosis Call',
  provider: {
    '@type': 'Person',
    name: 'Christian Weber',
  },
  description:
    'Structured 60-minute architecture diagnosis for Series A–B SaaS CTOs and technical founders.',
  url: 'https://mach2.cloud/en/diagnose',
}

export default async function DiagnosePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-deep-blue py-24 lg:py-32 relative overflow-hidden">
        <div aria-hidden="true" className="grid-overlay" />
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-cyan via-electric-cyan/60 to-transparent"
        />
        <div className="wrap relative z-10">
          <div className="max-w-[720px]">
            <p className="eyebrow">Architecture Diagnosis</p>
            <h1 className="mt-7 mb-8">
              The platform that got you here
              <br />
              is becoming the thing that{' '}
              <em>slows you down.</em>
            </h1>
            <p className="hero-sub max-w-xl">
              A structured 60-minute session to surface what&apos;s actually happening — and
              what&apos;s worth fixing first.
            </p>
          </div>
        </div>
      </section>

      {/* ── Recognition Block ────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="wrap">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-display font-bold mb-12 max-w-lg leading-[1.2]">
            This call is for you if:
          </h2>

          <div className="flex flex-col gap-[2px] max-w-[720px]">
            {[
              'The platform was built to ship fast. Now it\'s costing engineering velocity.',
              'AI is on the roadmap — but the architecture wasn\'t designed for it.',
              'Cloud costs are climbing without a clear explanation.',
            ].map((statement) => (
              <div
                key={statement}
                className="border border-white/[0.08] rounded-card p-7 bg-electric-cyan/[0.02]"
              >
                <p className="font-body text-[16px] font-light leading-[1.7] text-white">
                  {statement}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 font-mono text-[12px] tracking-[0.08em] text-grey-mid max-w-[720px]">
            If none of these describe your situation, this probably isn&apos;t the right
            conversation.
          </p>
        </div>
      </section>

      {/* ── What Happens in the Call ─────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="wrap">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-display font-bold mb-12 max-w-lg leading-[1.2]">
            What the 60 minutes looks like
          </h2>

          <div className="flex flex-col gap-[2px] max-w-[720px]">
            {[
              {
                num: '01',
                title: 'Situation',
                body: 'Where your platform is today, how the team works, what\'s been built under pressure.',
              },
              {
                num: '02',
                title: 'Pressure points',
                body: 'Where architecture is creating friction, cost, or delivery risk right now.',
              },
              {
                num: '03',
                title: 'Root cause',
                body: 'What\'s actually driving the symptoms, not just the symptoms themselves.',
              },
              {
                num: '04',
                title: 'One finding',
                body: 'A single, concrete thing worth knowing. You leave with a clearer picture either way.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="grid grid-cols-[48px_1fr] gap-6 border border-white/[0.08] rounded-card p-7 bg-electric-cyan/[0.02]"
              >
                <span className="font-mono text-[13px] font-medium text-electric-cyan mt-0.5">
                  {step.num}
                </span>
                <div>
                  <p className="font-display text-[15px] font-bold text-white mb-1.5">
                    {step.title}
                  </p>
                  <p className="font-body text-[14px] font-light leading-[1.7] text-grey-mid">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cal.com Embed ─────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="wrap">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-display font-bold mb-3 max-w-lg leading-[1.2]">
            Book the call
          </h2>
          <p className="font-mono text-[12px] tracking-[0.08em] text-grey-mid mb-10">
            60 minutes. The only requirement is that you come with a real problem.
          </p>

          <div
            className="rounded-card overflow-hidden bg-deep-blue border border-white/[0.08]"
            style={{ minHeight: '600px' }}
          >
            <CalEmbed />
          </div>
        </div>
      </section>

      {/* ── Objection Handling ────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="wrap">
          <div className="max-w-[640px] flex flex-col divide-y divide-white/[0.08]">
            {[
              {
                q: 'Is this free?',
                a: 'Yes. If there\'s a clear fit for deeper work after the call, we\'ll talk about what that looks like. If not, you still leave with something useful.',
              },
              {
                q: 'How is this different from a discovery call?',
                a: 'It\'s structured, not exploratory. I come prepared to diagnose — not to present. You leave with a specific finding, not a follow-up deck.',
              },
              {
                q: 'What if we\'re not ready for architecture work?',
                a: 'That\'s exactly what the call determines. Some teams find out they\'re in better shape than they thought. Either outcome is useful.',
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group py-8"
              >
                <summary className="list-none cursor-pointer flex items-center justify-between gap-6">
                  <span className="font-display text-[15px] font-bold text-white">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[14px] leading-none text-electric-cyan transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pt-4 font-body text-[15px] font-light leading-[1.75] text-grey-mid">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
