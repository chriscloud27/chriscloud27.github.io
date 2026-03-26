"use client";

import {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { MDXProvider } from "@mdx-js/react";
import SlideTransition from "./SlideTransition";
import SlideProgress from "./SlideProgress";
import { mdxComponents } from "./MDXComponents";

interface DeckProps {
  children: ReactNode;
  title?: string;
}

export default function Deck({ children, title }: DeckProps) {
  const slides = Children.toArray(children);
  const total = slides.length;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= total) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current, total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[#0B1F3A] select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slide content */}
      <MDXProvider components={mdxComponents}>
        <SlideTransition slideKey={current} direction={direction}>
          {slides[current]}
        </SlideTransition>
      </MDXProvider>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 px-8 py-4 md:px-16 flex items-center justify-between z-10">
        <span className="font-mono text-xs text-white/30 tracking-widest uppercase">
          {title ?? "FairUp"}
        </span>

        <SlideProgress total={total} current={current} onGoTo={goTo} />

        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous slide"
            className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            ←
          </button>
          <button
            onClick={next}
            disabled={current === total - 1}
            aria-label="Next slide"
            className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
