import Image from "next/image";

const testimonials: Array<{
  quote: string;
  name: string;
  role: string;
  company: string;
  companyUrl: string;
  linkedIn: string;
  photo: string;
  photoAlt: string;
  avatarSize: "sm" | "md" | "lg";
  align: "left" | "right";
  glyphSize: string;
}> = [
  {
    quote:
      "Christian helped us move from a fragile, no-code setup to a scalable, production-ready AWS architecture.\n He quickly identified structural limitations, introduced clear decision-making frameworks and aligned our platform with long-term business goals.\n The biggest impact: we stopped reacting to problems and started building with confidence. Our platform is now ready to scale from early-stage to enterprise without major rework.\n\n Highly valuable for any SaaS company navigating growth and architectural complexity.",
    name: "Fredrik Bendel",
    role: "CEO · SaaS Seed Series",
    company: "Fairup.Dev",
    companyUrl: "https://fairup.dev/",
    linkedIn: "https://de.linkedin.com/in/frederik-bendel-547664145",
    photo: "/img/fairup-frederik-bendel.jpg",
    photoAlt: "Fredrik Bendel",
    avatarSize: "lg" as const,
    align: "left" as const,
    glyphSize: "text-[140px]",
  },
  // {
  //   quote:
  //     "Christian quickly brought clarity into a complex architecture decision around containerization and Kubernetes scaling. He helped us build on an already strong foundation and move even faster and more confidently in how we scale and operate our platform. His ability to structure decisions around cost, scalability, and long-term flexibility helped us move forward with confidence and avoid costly missteps. Highly recommended for fast, high-impact architectural guidance.",
  //   name: "Philipp Ladwig",
  //   role: "CEO · SaaS Series A",
  //   company: "Avaluma.AI",
  //   companyUrl: "https://avaluma.ai/",
  //   linkedIn: "https://www.linkedin.com/in/dr-philipp-ladwig-a80a18108/",
  //   photo: "/img/avaluma-philipp-ladwig.webp",
  //   photoAlt: "Philipp Ladwig",
  //   avatarSize: "lg" as const,
  //   align: "left" as const,
  //   glyphSize: "text-[140px]",
  // },
  // {
  //   quote:
  //     "Christian gave us a direct and honest assessment of where our architecture wasn't ready yet and why it mattered before we scaled further. We're building a clinical platform for LATAM doctors from appointments to AI-assisted diagnosis. Stability and cost-efficiency aren't optional at this stage. His ability to connect architectural decisions to real business consequences helped us understand how to find what to build next and in which priority. That clarity was more valuable than any validation could have been.",
  //   name: "Ivan Peñaloza",
  //   role: "CEO & Founder · Pre-Series A",
  //   company: "Asclepius AI",
  //   companyUrl: "https://asclepius.ai/",
  //   linkedIn:
  //     "https://www.linkedin.com/in/ivan-dario-pe%C3%B1aloza-rojas-phd-aaa259186/",
  //   photo: "/img/Ivan-Dario-Penaloza-Rojas.jpg",
  //   photoAlt: "Ivan Dario Peñaloza Rojas",
  //   avatarSize: "md" as const,
  //   align: "right" as const,
  //   glyphSize: "text-[110px]",
  // },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-t border-white/[0.06] py-20">
      <div className="wrap max-w-[860px]">
        <p className="eyebrow mb-10">Testimonials</p>

        <div className="flex flex-col gap-6 mb-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className={[
                "relative overflow-hidden bg-electric-cyan/[0.03] border border-white/[0.06] rounded-card p-10 md:w-[80%]",
                t.align === "right" ? "md:ml-auto" : "",
              ].join(" ")}
            >
              {/* Decorative quote glyph */}
              <span
                aria-hidden="true"
                className={`absolute top-0 left-4 font-display ${t.glyphSize} leading-none text-electric-cyan/[0.07] select-none pointer-events-none`}
              >
                &ldquo;
              </span>

              {/* Quote */}
              <p className="font-body text-[17px] font-light leading-[1.75] text-white/90 mb-8 relative z-10 max-w-prose">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-4 relative z-10">
                <a
                  href={t.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-[2px] rounded-full bg-gradient-to-br from-electric-cyan/60 to-electric-cyan/10 shrink-0 hover:from-electric-cyan hover:to-electric-cyan/40 transition-all duration-200"
                >
                  <Image
                    src={t.photo}
                    alt={t.photoAlt}
                    width={t.avatarSize === "lg" ? 56 : 44}
                    height={t.avatarSize === "lg" ? 56 : 44}
                    className={`${t.avatarSize === "lg" ? "w-14 h-14" : "w-11 h-11"} rounded-full object-cover`}
                  />
                </a>
                <div>
                  <p className="font-mono text-[12px] font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="font-mono text-[10px] text-grey-mid">
                    {t.role} ·{" "}
                    <a
                      href={t.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-electric-cyan hover:text-white transition-colors"
                    >
                      {t.company}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
