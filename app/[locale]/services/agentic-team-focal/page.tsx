import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildCanonicalAndAlternates } from "@/lib/seo";
import AgenticTeamFocalContent from "./AgenticTeamFocalContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Agentic Dream Team Blueprint — MaCh2.Cloud",
    description:
      "The complete AI-native operating system for a 5-person firm. 8 board agents, 32 sub-agents, 12 compounding loops. Built for speed and structural edge.",
    openGraph: {
      title: "Agentic Dream Team Blueprint — MaCh2.Cloud",
      description:
        "The complete AI-native operating system for a 5-person firm that sees sooner, decides faster, and compounds structural edge.",
    },
    ...buildCanonicalAndAlternates("/services/agentic-team-focal", locale),
  };
}

export default async function AgenticTeamFocalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AgenticTeamFocalContent />;
}
