import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SlideVariant = "dark" | "light" | "accent";

interface SlideProps {
  children: ReactNode;
  variant?: SlideVariant;
  centered?: boolean;
  className?: string;
}

const variantClasses: Record<SlideVariant, string> = {
  dark: "bg-[#0B1F3A] text-white",
  light: "bg-white text-[#1A1A1A]",
  accent: "bg-[#0B1F3A] text-white border-t-4 border-[#00E5FF]",
};

export default function Slide({
  children,
  variant = "dark",
  centered = false,
  className,
}: SlideProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col px-8 py-10 md:px-16 md:py-14 lg:px-24 lg:py-16 overflow-y-auto",
        variantClasses[variant],
        centered && "items-center justify-center text-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
