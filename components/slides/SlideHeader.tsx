import Link from "next/link";
import Mach2Logo from "@/components/Mach2Logo";

export default function SlideHeader() {
  return (
    <header className="shrink-0 flex items-center px-8 md:px-16 h-14 border-b border-white/10 bg-[#0B1F3A]">
      <Link
        href="/"
        className="flex items-center gap-2 font-mono text-sm text-white/70 hover:text-white transition-colors"
      >
        <Mach2Logo size={24} />
        <span>
          MaCh2<span className="text-white">.Cloud</span>
        </span>
      </Link>
    </header>
  );
}
