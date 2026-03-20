"use client";

import { useEffect, useRef, useState } from "react";
import type { TocHeading } from "@/lib/notion";

interface BlogToCProps {
  headings: TocHeading[];
}

export default function BlogToC({ headings }: BlogToCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [hovered, setHovered] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const headingIds = headings.map((h) => h.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    headingIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-row-reverse items-center gap-3 z-40"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Collapsed indicator — always visible */}
      <div className="flex flex-col gap-[6px] items-center">
        {headings.map((h) => (
          <button
            key={h.id}
            onClick={() => handleClick(h.id)}
            aria-label={h.text}
            className={[
              "rounded-full transition-all duration-200 cursor-pointer",
              h.level === 1
                ? "w-[6px] h-[6px]"
                : h.level === 2
                  ? "w-[5px] h-[5px]"
                  : "w-[3px] h-[3px]",
              activeId === h.id
                ? "bg-electric-cyan"
                : "bg-grey-mid/50 hover:bg-grey-300/70",
            ].join(" ")}
          />
        ))}
      </div>

      {/* Expanded panel — shown on hover, in the same flex row so no gap */}
      <div
        className={[
          "transition-all duration-200 origin-right",
          hovered
            ? "opacity-100 scale-x-100 pointer-events-auto"
            : "opacity-0 scale-x-95 pointer-events-none",
        ].join(" ")}
      >
        <div className="bg-[#0B1F3A]/90 backdrop-blur-sm border border-white/8 rounded-md px-4 py-3 max-h-[60vh] overflow-y-auto min-w-[180px] max-w-[240px]">
          <p className="font-mono text-[10px] tracking-[0.12em] text-grey-mid/60 uppercase mb-3">
            On this page
          </p>
          <nav className="flex flex-col gap-[6px]">
            {headings.map((h) => (
              <button
                key={h.id}
                onClick={() => handleClick(h.id)}
                className={[
                  "text-left font-mono text-[11px] leading-[1.4] tracking-[0.02em] transition-colors duration-150 cursor-pointer",
                  h.level === 3 ? "pl-3" : "pl-0",
                  activeId === h.id
                    ? "text-electric-cyan"
                    : "text-grey-mid hover:text-grey-300",
                ].join(" ")}
              >
                {h.text}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
