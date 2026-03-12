'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'

const STEPS = [
  { num: '00', label: 'Diagnosis', sub: '30-min call. One clear finding.' },
  { num: '01', label: 'Audit', sub: 'Full platform assessment. Prioritized roadmap.' },
  { num: '02', label: 'Blueprint', sub: 'Target architecture. Production-ready design.' },
  { num: '03', label: 'Enablement', sub: 'Guided implementation. Team ownership.' },
  { num: '04', label: 'Fractional', sub: 'Ongoing architecture leadership. Monthly cadence.' },
]

type ServicesSectionProps = {
  sectionId?: string
}

export default function ServicesSection({ sectionId = 'services' }: ServicesSectionProps) {
  const locale = useLocale()
  const servicesHref = `/${locale}/services`

  return (
    <section id={sectionId} className="bg-deep-blue py-[120px] relative">
      {/* brand: cyan top divider line */}
      <div aria-hidden="true" className="s-top" />

      <div className="wrap">
        {/* Section header */}
        <div className="max-w-[640px] mb-[72px]">
          <p className="eyebrow">Solution Path</p>
          <h2>
            From first conversation to{' '}
            <em>full platform ownership</em>
          </h2>
        </div>

        {/* Journey track */}
        <div className="relative">
          {/* Horizontal connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-electric-cyan/35 to-transparent"
          />

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0">
            {STEPS.map((step) => (
              <Link
                key={step.num}
                href={servicesHref}
                className="group flex flex-col items-center text-center px-2 no-underline"
              >
                {/* Number dot */}
                <div className="relative z-10 w-14 h-14 rounded-full border border-electric-cyan/10 bg-electric-cyan/[0.03] flex items-center justify-center mb-5 transition-all duration-300 group-hover:border-electric-cyan group-hover:bg-electric-cyan/[0.12] group-hover:shadow-[0_0_24px_rgba(0,229,255,0.2)]">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-electric-cyan">
                    {step.num}
                  </span>
                </div>

                <p className="text-[13px] font-semibold text-white mb-1.5 group-hover:text-electric-cyan transition-colors duration-200 m-0">
                  {step.label}
                </p>
                <p className="font-mono text-[11px] text-grey-mid leading-[1.5] m-0">
                  {step.sub}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
