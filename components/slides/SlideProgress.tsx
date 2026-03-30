"use client";

interface SlideProgressProps {
  total: number;
  current: number;
  onGoTo: (index: number) => void;
}

export default function SlideProgress({
  total,
  current,
  onGoTo,
}: SlideProgressProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-white/40 tabular-nums">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(total).padStart(2, "0")}
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-[#00E5FF]"
                : "w-1.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
