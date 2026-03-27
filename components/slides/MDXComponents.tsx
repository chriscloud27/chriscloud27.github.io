import Image from "next/image";
import { ReactNode } from "react";

// ---- Primitive wrappers used in MDX slide files ----

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#00E5FF] mb-4">
      {children}
    </p>
  );
}

export function Headline({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white mb-6">
      {children}
    </h1>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return (
    <div className="font-body text-lg md:text-xl text-white/70 leading-relaxed mb-8">
      {children}
    </div>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-[#00E5FF]">{children}</span>;
}

export function TwoCol({
  left,
  right,
  gap = "gap-8 md:gap-12",
}: {
  left: ReactNode;
  right: ReactNode;
  gap?: string;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${gap} mt-4 flex-1`}>
      <div className="flex flex-col justify-center">{left}</div>
      <div className="flex flex-col justify-center">{right}</div>
    </div>
  );
}

export function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-white/10 rounded-xl p-6 bg-white/5">
      <h3 className="font-display text-base font-semibold text-[#00E5FF] mb-2">
        {title}
      </h3>
      <div className="font-body text-sm text-white/70 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function CardGrid({
  children,
  cols = 3,
}: {
  children: ReactNode;
  cols?: 2 | 3;
}) {
  const colClass =
    cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 ${colClass} gap-4 mt-4`}>{children}</div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-5xl md:text-6xl font-bold text-[#00E5FF]">
        {value}
      </div>
      <div className="font-body text-sm text-white/60 mt-1 max-w-[10rem] mx-auto">
        {label}
      </div>
    </div>
  );
}

export function StatRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap justify-center gap-10 md:gap-20 mt-8">
      {children}
    </div>
  );
}

// ---- Image primitives ----

export function SlideImage({
  src,
  alt,
  width = 600,
  height = 400,
  className = "",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        unoptimized
      />
    </div>
  );
}

export function ProfilePhoto({
  src,
  alt,
  badge,
}: {
  src: string;
  alt: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          unoptimized
        />
      </div>
      {badge && (
        <span className="font-mono text-xs text-[#00E5FF] border border-[#00E5FF]/30 rounded-full px-4 py-1">
          {badge}
        </span>
      )}
    </div>
  );
}

export function LogoRow({
  logos,
}: {
  logos: { src: string; alt: string; width?: number }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-8 mt-8">
      {logos.map((logo) => (
        <Image
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          width={logo.width ?? 80}
          height={32}
          className="h-7 w-auto object-contain opacity-50 brightness-0 invert"
          unoptimized
        />
      ))}
    </div>
  );
}

export function InfoBox({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 border-l-2 border-[#00E5FF] pl-5 py-2">
      <div className="font-body text-sm text-white/60 leading-relaxed italic">
        {children}
      </div>
    </div>
  );
}

export function CompareTable({
  rows,
}: {
  rows: { label: string; them: string; us: string }[];
}) {
  return (
    <div className="mt-6 w-full overflow-x-auto">
      <table className="w-full text-sm font-body">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 pr-6 text-white/40 font-normal w-1/3"></th>
            <th className="text-left py-3 pr-6 text-white/40 font-normal">
              Big 4 / Agency
            </th>
            <th className="text-left py-3 text-[#00E5FF] font-semibold">
              MaCh2.Cloud
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-white/5">
              <td className="py-3 pr-6 text-white/50 font-mono text-xs uppercase tracking-wider">
                {row.label}
              </td>
              <td className="py-3 pr-6 text-white/50">{row.them}</td>
              <td className="py-3 text-white font-medium">{row.us}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StepList({
  steps,
}: {
  steps: { num: string; title: string; desc: string }[];
}) {
  return (
    <div className="flex flex-col gap-5 mt-4">
      {steps.map((s) => (
        <div key={s.num} className="flex gap-5 items-start">
          <div className="shrink-0 w-10 h-10 rounded-full border border-[#00E5FF]/40 flex items-center justify-center font-mono text-xs text-[#00E5FF]">
            {s.num}
          </div>
          <div>
            <div className="font-display text-base font-semibold text-white">
              {s.title}
            </div>
            <div className="font-body text-sm text-white/60 mt-0.5">
              {s.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Logo({
  src,
  alt,
  width = 120,
}: {
  src: string;
  alt: string;
  width?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={40}
      className="h-8 w-auto object-contain opacity-80"
      unoptimized
    />
  );
}

export function CompassFlow() {
  const survey = [
    { name: "Basic", desc: "5 min · terminal CLI\nlead + basic report" },
    {
      name: "Intense",
      desc: "WAF2p pillars · days–weeks\nassessment + findings",
    },
  ];
  const engine = [
    { name: "AI only", desc: "basic scoring logic\nbasic report" },
    { name: "AI + human", desc: "advanced logic\nGitHub · website · stage" },
  ];
  const outcomes = [
    { name: "Fragile foundation", desc: "Architecture Audit" },
    { name: "Scaling under pressure", desc: "Blueprint + Enablement" },
    { name: "Ready to accelerate", desc: "Fractional Architect" },
  ];

  const NodeBox = ({
    name,
    desc,
    highlight = false,
  }: {
    name: string;
    desc: string;
    highlight?: boolean;
  }) => (
    <div
      className={`rounded-lg p-3 text-center ${
        highlight
          ? "border border-[#00E5FF]/60 bg-[#00E5FF]/5"
          : "border border-white/10 bg-white/5"
      }`}
    >
      <div
        className={`font-mono text-xs font-semibold ${
          highlight ? "text-[#00E5FF]" : "text-white"
        }`}
      >
        {name}
      </div>
      <div className="font-body text-[10px] text-white/50 mt-1 leading-tight whitespace-pre-line">
        {desc}
      </div>
    </div>
  );

  const Arrow = () => (
    <div className="flex items-center justify-center px-1 shrink-0 self-center">
      <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
        <path
          d="M0 5H16M16 5L11 1M16 5L11 9"
          stroke="#378ADD"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  return (
    <div className="mt-6 w-full overflow-x-auto">
      <div className="flex items-stretch gap-1 min-w-[560px]">
        {/* Survey */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#00E5FF]/50 mb-2 text-center">
            1 · Survey
          </div>
          <div className="flex flex-col gap-2 h-full justify-center">
            {survey.map((n) => (
              <NodeBox key={n.name} name={n.name} desc={n.desc} />
            ))}
          </div>
        </div>

        <Arrow />

        {/* Engine */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#00E5FF]/50 mb-2 text-center">
            2 · Engine
          </div>
          <div className="flex flex-col gap-2 h-full justify-center">
            {engine.map((n) => (
              <NodeBox key={n.name} name={n.name} desc={n.desc} />
            ))}
          </div>
        </div>

        <Arrow />

        {/* Outcome */}
        <div className="flex flex-col flex-[1.4] min-w-0">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#00E5FF]/50 mb-2 text-center">
            3 · Outcome
          </div>
          <div className="flex flex-col gap-2 h-full justify-center">
            {outcomes.map((n) => (
              <NodeBox key={n.name} name={n.name} desc={n.desc} />
            ))}
          </div>
        </div>

        <Arrow />

        {/* CTA */}
        <div className="flex flex-col justify-center min-w-0 shrink-0">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-transparent mb-2 text-center select-none">
            &nbsp;
          </div>
          <div className="border border-[#00E5FF] rounded-lg px-3 py-4 text-center bg-[#00E5FF]/5">
            <div className="font-mono text-xs font-bold text-[#00E5FF] leading-tight">
              Diagnosis
              <br />
              Call
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// MDX default element overrides
export const mdxComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="font-display text-lg md:text-xl font-semibold text-[#00E5FF] mb-2">
      {children}
    </h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="font-body text-base md:text-lg text-white/70 leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="space-y-2 mb-4">{children}</ul>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="flex gap-3 font-body text-base text-white/70">
      <span className="text-[#00E5FF] mt-1 shrink-0">—</span>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }: { children: ReactNode }) => (
    <em className="not-italic text-[#00E5FF]">{children}</em>
  ),
  // Named exports available in MDX files
  Eyebrow,
  Headline,
  Sub,
  Highlight,
  TwoCol,
  Card,
  CardGrid,
  Stat,
  StatRow,
  SlideImage,
  ProfilePhoto,
  LogoRow,
  InfoBox,
  CompareTable,
  StepList,
  Logo,
  CompassFlow,
};
