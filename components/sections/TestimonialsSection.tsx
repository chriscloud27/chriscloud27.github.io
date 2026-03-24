const testimonials = [
  {
    quote:
      "Working with Christian as our fractional CTO gave us the architectural clarity we were missing. He identified the compounding problems in our platform before they became emergencies — and gave our team a clear path forward.",
    name: "— Placeholder Name",
    role: "CTO, Series B SaaS",
    tag: "Fractional CTO",
  },
  {
    quote:
      "The Architecture Diagnosis call was the most useful 60 minutes we've spent on our infrastructure. No pitch, just signal. We left with a prioritized list of real risks we hadn't connected before.",
    name: "— Placeholder Name",
    role: "VP Engineering, Series A SaaS",
    tag: "Architecture Diagnosis",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-20">
      <div className="wrap">
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-grey-mid mb-10">
          What customers say
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-card p-8 flex flex-col gap-6"
            >
              <p className="text-graphite text-base leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-sm font-semibold text-graphite">
                    {t.name}
                  </p>
                  <p className="text-xs text-grey-mid">{t.role}</p>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-electric-cyan border border-electric-cyan/30 rounded px-2 py-1">
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
