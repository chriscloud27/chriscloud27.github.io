"use client";

export function WafpassLink() {
  return (
    <a
      href="https://waf2p.dev/pass/"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        const w = window as unknown as Record<string, unknown>;
        if (typeof w.gtag === "function") {
          (w.gtag as Function)("event", "click", {
            event_category: "external_link",
            event_label: "wafpass_cta",
            transport_type: "beacon",
          });
        }
      }}
      className="group inline-flex items-center gap-2 font-mono text-[13px] text-electric-cyan border border-electric-cyan/30 rounded-card px-5 py-2.5 hover:bg-electric-cyan/[0.06] hover:border-electric-cyan/60 transition-all duration-200"
    >
      Explore WAFPass
      <svg
        className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 17L17 7M17 7H7M17 7v10"
        />
      </svg>
    </a>
  );
}
