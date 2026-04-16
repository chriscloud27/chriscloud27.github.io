import Link from "next/link";

export default function CtaSection() {
  return (
    <section
      id="cta"
      className="bg-deep-blue py-[120px] relative overflow-hidden"
    >
      {/* brand: dim grid overlay — see .grid-overlay-dim in globals.css */}
      <div aria-hidden="true" className="grid-overlay-dim" />
      <div aria-hidden="true" className="s-top" />

      <div className="wrap relative z-10">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="mb-5">
            Start with a diagnosis. Commitment comes later.
          </h2>

          <p className="font-body text-base font-light leading-[1.75] text-grey-mid mb-10">
            A 30-minute call costs nothing. It usually surfaces the one thing
            worth fixing first.
          </p>

          <Link href="/en/diagnosis" className="btn btn-p">
            Architecture Diagnosis
          </Link>
        </div>
      </div>
    </section>
  );
}
