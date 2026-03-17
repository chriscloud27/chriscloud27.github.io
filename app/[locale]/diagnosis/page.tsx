import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { CalEmbed } from './CalEmbed'

export const metadata: Metadata = {
  title: 'Architecture Diagnosis Call — MaCh2.Cloud',
  description:
    'A structured 60-minute session to surface the one architectural constraint compounding your platform\'s problems. You leave with a clearer picture either way.',
  openGraph: {
    title: 'Architecture Diagnosis Call — MaCh2.Cloud',
    description:
      '60 minutes. One clear finding. Book a structured architecture diagnosis with Christian Weber.',
    url: 'https://mach2.cloud/en/diagnosis',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Architecture Diagnosis Call',
  provider: { '@type': 'Person', name: 'Christian Weber' },
  description:
    'Structured 60-minute architecture diagnosis for Series A–B SaaS CTOs and technical founders.',
  url: 'https://mach2.cloud/en/diagnosis',
}

const steps = [
  {
    num: '01',
    name: 'Status Quo',
    tag: ['context'],
    subtitle: 'Review where your platform currently is',
    body: 'You describe the system as it actually exists. I listen for the gap between the architecture you intended and the one that got shipped.',
    instructions: 'We may indentify structural problems reveal themselves here. Not in the symptoms, but in the decisions that made sense at the time.',
  },
  {
    num: '02',
    name: 'Pain Points Identification',
    tag: ['locate'],
    subtitle: 'Identify where business is fighting tech',
    body: 'Every company makes decisions that impact their platform. They may directly or indirectly be costing velocity, margin, or reliability.',
    instructions: 'We name them specifically — slowing deploy cycles, unexplained cloud spend, AI features degrading under load, infrastructure only two engineers understand. Not a category. A location.',
  },
  {
    num: '03',
    name: 'Root Cause Isolation',
    tag: 'architectural decisions',
    subtitle: 'We will focus to identify one main problem',
    body: 'We will identify quick wins for your team and name what they need to resolve from what will compound until it is addressed at the architectural level. The type of problem determines the type of intervention. ',
    instructions: 'Implementation problem or structural problem. Treating a structural constraint as an implementation issue is the most common reason platform work fails to hold.',
  },
]

const stats = [
  { value: "60'", label: 'Structured session', sub: 'no extensions' },
  { value: 'one', label: 'Concrete finding', sub: 'not a slide deck' },
  { value: 'zero', label: 'Commitment required', sub: 'to book' },
]

export default async function DiagnosisPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="bg-deep-blue min-h-screen pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Diagnostic Framework ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="grid-overlay" />

        <div className="wrap relative z-10 py-20 lg:py-28">

          {/* Eyebrow */}
              <p className="eyebrow mb-6">Architecture Diagnosis</p>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold italic leading-[1.15] text-white mb-5 max-w-[760px]">
            A <em> structured</em> 60-minute 
            <em> diagnosis</em>
          </h1>

          {/* Sub */}
          <p className="font-body text-[15px] font-light leading-[1.7] text-grey-mid max-w-[560px] mb-12">
            Four sequential phases. One concrete output. Prepared methodology applied to your specific system.
          </p>

          <Link href="#book-diagnosis-call" className="btn btn-p mb-12 inline-flex">
            Book diagnosis call
          </Link>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-electric-cyan/60 via-electric-cyan/20 to-transparent mb-16" />

          {/* ── Timeline ──────────────────────────────────────────────────── */}
          <div className="relative max-w-[720px]">

            {/* Vertical connecting line */}
            <div
              aria-hidden="true"
              className="absolute left-[26px] top-6 bottom-[340px] w-px bg-electric-cyan/15"
            />

            {/* Steps 01–03 */}
            {steps.map((step) => (
              <div key={step.num} className="group relative flex gap-8 pb-14">
                {/* Number */}
                <div className="flex-shrink-0 w-14 pt-0.5">
                  <div
                    className={[
                      'w-12 h-12 rounded-full flex items-center justify-center',
                      'font-mono text-[13px] font-medium flex-shrink-0',
                      'bg-transparent text-electric-cyan border border-electric-cyan',
                      'transition-colors duration-200',
                      'group-hover:bg-electric-cyan group-hover:text-deep-blue',
                    ].join(' ')}
                  >
                    {step.num}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Title row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-electric-cyan font-medium">
                      {step.name}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.08em] border border-electric-cyan/30 text-electric-cyan/60 px-2 py-0.5 rounded-sm">
                      {step.tag}
                    </span>
                  </div>
                  {/* Subtitle */}
                  <h2 className="font-display text-[19px] font-bold text-white leading-[1.3] mb-3">
                    {step.subtitle}
                  </h2>
                  {/* Body */}
                  <p className="font-body text-[14px] font-light leading-[1.75] text-grey-mid">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}

            {/* Step 04 — boxed */}
            <div className="group relative flex gap-8">
              {/* Number */}
              <div className="flex-shrink-0 w-14 pt-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-[13px] font-medium flex-shrink-0 bg-transparent text-electric-cyan border border-electric-cyan transition-colors duration-200 group-hover:bg-electric-cyan group-hover:text-deep-blue">
                  04
                </div>
              </div>

              {/* Bordered card */}
              <div className="flex-1 min-w-0 border border-electric-cyan/25 rounded-lg p-7 bg-electric-cyan/[0.03]">
                {/* Title row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-electric-cyan font-medium">
                    One Concrete Finding
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.08em] border border-electric-cyan/30 text-electric-cyan/60 px-2 py-0.5 rounded-sm">
                    output
                  </span>
                </div>
                {/* Subtitle — cyan */}
                <h2 className="font-display text-[19px] font-bold text-electric-cyan leading-[1.3] mb-3">
                  A quick win to be implemented immediately
                </h2>
                {/* Body */}
                <p className="font-body text-[14px] font-light leading-[1.75] text-grey-mid mb-8">
                  The most architectural constraint worth understanding right now. Framed clearly
                  enough to take into your next engineering planning session. Yours,
                  regardless of what comes next.
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
                  {stats.map((s) => (
                    <div key={s.value}>
                      <div className="font-mono text-[28px] font-bold text-electric-cyan leading-none mb-2">
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
        </div>
      </section>

      {/* ── Cal.com Booking ───────────────────────────────────────────────── */}
      <section id="book-diagnosis-call" className="border-t border-white/[0.06] py-20">
        <div className="wrap">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white mb-3 max-w-lg leading-[1.2]">
            Book the call
          </h2>
          <p className="font-mono text-[12px] tracking-[0.08em] text-grey-mid mb-10">
            60 minutes. The only requirement is that you come with a real problem.
          </p>
          <div className="overflow-hidden bg-deep-blue" style={{ minHeight: '600px' }}>
            <CalEmbed />
          </div>
        </div>
      </section>
    </main>
  )
}
