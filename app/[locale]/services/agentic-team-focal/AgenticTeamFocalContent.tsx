"use client";

export default function AgenticTeamFocalContent() {
  return (
    <main className="w-full">
      {/* Cover Section */}
      <section className="min-h-screen bg-[#0B1F3A] text-white flex items-center justify-center p-8 relative overflow-hidden">
        <div className="max-w-4xl relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#00E5FF]" />
            <p className="font-mono text-sm tracking-widest uppercase text-[#00E5FF]">
              focal · Head of Technology &amp; Applied AI
            </p>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Agentic <span className="text-[#00E5FF]">Dream Team</span> Blueprint
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
            The complete AI-native operating system for a 5-person firm that
            sees sooner, decides faster, and compounds structural edge across
            every founder, deal, and outcome.
          </p>

          {/* Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-gray-500 mb-2">
                Document Type
              </p>
              <p className="font-medium">Founding Operational Strategy</p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-gray-500 mb-2">
                Classification
              </p>
              <p className="font-medium">GP Internal · Confidential</p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-gray-500 mb-2">
                Vintage
              </p>
              <p className="font-medium">Fund II · 2025</p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-gray-500 mb-2">
                Version
              </p>
              <p className="font-medium">v1.0 · Master Blueprint</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-700">
            {[
              { num: "8", desc: "Board Agents" },
              { num: "32", desc: "Sub-Agents" },
              { num: "12", desc: "Compounding Loops" },
              { num: "50×", desc: "Team Leverage Target" },
            ].map((metric, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 text-center ${idx === 0 ? "border-l-2 border-[#00E5FF]" : ""}`}
              >
                <p className="text-3xl font-bold text-[#00E5FF] leading-none mb-2">
                  {metric.num}
                </p>
                <p className="font-mono text-xs tracking-widest uppercase text-gray-600">
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0B1F3A] border-t border-[#00E5FF]/20 text-white py-5 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[
              { num: "8", label: "Board Agents" },
              { num: "32", label: "Sub-Agents" },
              { num: "4", label: "Dev Functions" },
              { num: "12", label: "Compounding Loops" },
              { num: "50×", label: "Leverage Target" },
              { num: "<48h", label: "Signal → Conviction" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl font-bold text-[#00E5FF]">{stat.num}</p>
                <p className="font-mono text-xs tracking-widest uppercase text-gray-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-white border-t border-gray-200 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#00E5FF]" />
            <p className="font-mono text-xs tracking-widest uppercase text-gray-500">
              Navigation
            </p>
          </div>
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-2">
            Table of Contents
          </h2>
          <p className="font-mono text-sm text-gray-500 mb-8">
            10 sections · Master founding document
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "Executive Summary" },
              { num: "02", title: "The Structural Problem" },
              { num: "03", title: "Benchmark Methodology" },
              { num: "04", title: "Advisory Findings" },
              { num: "05", title: "Comparator Pattern Analysis" },
              { num: "06", title: "The Blueprint Archive" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-4 border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-lg font-bold text-[#00E5FF]">
                    {item.num}
                  </span>
                  <span className="text-lg text-[#1A1A1A]">{item.title}</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started CTA */}
      <section className="bg-[#0B1F3A] text-white py-16 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Build Your Agentic Dream Team?
          </h2>
          <p className="text-gray-300 mb-8">
            Explore the complete blueprint and operational strategy for
            AI-native firms.
          </p>
          <button className="bg-[#00E5FF] hover:bg-[#00ccdf] text-[#0B1F3A] font-semibold py-3 px-8 transition">
            Download Blueprint
          </button>
        </div>
      </section>
    </main>
  );
}
