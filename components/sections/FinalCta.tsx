import Link from 'next/link'

type Props = {
  locale: string
}

export default function FinalCta({ locale }: Props) {
  return (
    <section className="py-24 lg:py-32 border-t border-white/[0.06] text-center">
      <div className="wrap">
        <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-display font-bold leading-[1.1] mb-6 tracking-tight max-w-3xl mx-auto">
          Free Architecture Diagnosis before{' '}
          <em>growth exposes it</em>
        </h2>
        <p className="font-body text-[16px] font-light text-grey-mid max-w-md mx-auto mb-12 leading-[1.7]">
          Start with an Architecture Diagnosis Call — 30 minutes to surface the highest-leverage thing
          worth fixing first. No commitment. No pitch. Just clarity.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link href={`/${locale}/diagnosis`} className="btn btn-p btn-p-lg">
            Book a 30-minute Diagnosis →
          </Link>
          <p className="font-mono text-[11px] tracking-[0.08em] text-white/20">
            No pitch. One high-leverage finding you can act on.
          </p>
        </div>
      </div>
    </section>
  )
}
