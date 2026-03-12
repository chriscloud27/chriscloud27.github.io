export default function CtaSection() {
  return (
    <section id="cta" className="bg-deep-blue py-[120px] relative overflow-hidden">
      {/* brand: dim grid overlay — see .grid-overlay-dim in globals.css */}
      <div aria-hidden="true" className="grid-overlay-dim" />
      <div aria-hidden="true" className="s-top" />

      <div className="wrap relative z-10">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="mb-5">
            Your platform should{' '}
            <em>accelerate growth.</em>
          </h2>

          <p className="font-body text-base font-light leading-[1.75] text-grey-mid mb-10">
            Start with an architecture audit. Clarity before commitment.
          </p>

          <a
            href="https://calendly.com/chriscloud-weber/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-p"
          >
            Diagnose Your Architecture
          </a>
        </div>
      </div>
    </section>
  )
}
