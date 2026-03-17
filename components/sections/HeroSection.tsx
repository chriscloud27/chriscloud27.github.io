import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="bg-deep-blue min-h-screen pt-16 flex items-center relative overflow-hidden"
    >
      {/* Subtle grid overlay — complex repeating gradient, see .grid-overlay in globals.css */}
      <div aria-hidden="true" className="grid-overlay" />

      {/* Cyan top accent line — positioned flush to nav bottom */}
      <div
        aria-hidden="true"
        className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-cyan via-electric-cyan/60 to-transparent"
      />

      <div className="wrap relative z-10 w-full">
        <div className="hgrid">
          {/* Left: copy */}
          <div>
            <p className="eyebrow">AI Native Cloud Architect</p>

            <h1>
              Build architecture that <em>compounds velocity.</em>
            </h1>

            <p className="hero-sub">
              My mission is to help growth-stage SaaS teams replace fragile cloud foundations
              with AI-native systems that scale cleanly, stay cost-predictable, and let
              engineers ship confidently instead of firefighting production friction.
            </p>

            {/* brand: proof line — mono label style per spec */}
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-grey-mid mb-10">
              System-first architecture for teams that want momentum, not rework.
            </p>

            <div className="hero-btns">
              <Link
                href="/en/diagnosis"
                className="btn btn-p"
              >
                Free Architecture Diagnosis
              </Link>
              <a href="#how-it-works" className="btn btn-g">
                See How It Works
              </a>
            </div>
          </div>

          {/* Right: profile photo */}
            <div className="hphoto">
            <Image
              src="/img/Chris.png"
              alt="Christian Weber — AI-Native Cloud Architect"
              width={272}
              height={340}
              priority
              className="w-full h-auto object-cover rounded-card [filter:grayscale(15%)]"
            />
            <div className="pbadge">
              <span className="pb-l">Available</span>
              <span className="pb-v">Remote · US / EU</span>
            </div>
            </div>
        </div>
      </div>
    </section>
  )
}
