import { NextResponse } from "next/server";

// Question type definitions — needed server-side to score correctly
const QUESTION_TYPES: Record<string, string> = {
  q1: "scale",
  q2: "ypn",
  q3: "scale",
  q4: "ypn",
  q5: "scale",
  q6: "ksu",
  q7: "scale",
  q8: "ypn",
  q9: "scale5",
  q10: "scale04",
  q11: "scale",
  q12: "ypn",
  q13: "scale4",
  q14: "scale5",
};

const SCORED_IDS = [
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q9",
  "q10",
  "q11",
  "q12",
  "q13",
  "q14",
] as const;

type ScoredId = (typeof SCORED_IDS)[number];
type Answers = Partial<Record<ScoredId | "stage", string | number>>;

function toNum(type: string, value: string | number): number {
  const v = String(value).toUpperCase();
  if (["scale", "scale5", "scale04", "scale4"].includes(type)) {
    return parseInt(String(value), 10);
  }
  if (type === "ypn") return v === "Y" ? 5 : v === "P" ? 3 : 1;
  if (type === "ksu") return v === "K" ? 5 : v === "S" ? 3 : 1;
  return 3;
}

function stageWeight(stage: string, raw: number): number {
  if (stage === "b") return raw <= 2 ? raw - 0.4 : raw;
  if (stage === "seed") return raw <= 2 ? raw + 0.4 : raw;
  return raw;
}

function calcResults(answers: Answers) {
  const stage = String(answers["stage"] ?? "a");
  let total = 0;

  for (const id of SCORED_IDS) {
    const type = QUESTION_TYPES[id];
    const raw = answers[id] != null ? toNum(type, answers[id]!) : 3;
    total += stageWeight(stage, raw);
  }

  const avg = total / SCORED_IDS.length;
  const tier = avg <= 2.2 ? "fragile" : avg <= 3.5 ? "scaling" : "accelerating";

  const aiLevel = parseInt(String(answers["q9"] ?? "1"), 10);
  const aiInfra = parseInt(String(answers["q10"] ?? "0"), 10);
  const aiGap = aiLevel - (aiInfra + 1);

  const sovA = toNum("scale", answers["q11"] ?? "3");
  const sovB = toNum("ypn", answers["q12"] ?? "P");
  const sovScore = (sovA + sovB) / 2;

  const TIERS = {
    fragile: {
      label: "Fragile Foundation",
      message:
        "Significant architectural debt is actively blocking velocity and growth.",
      recommendation:
        stage === "b"
          ? "Architecture Audit → Blueprint  (Series B urgency)"
          : "Architecture Audit",
    },
    scaling: {
      label: "Scaling Under Pressure",
      message:
        "Cracks are forming as you grow. The window to fix this cleanly is narrowing.",
      recommendation:
        stage === "b"
          ? "Blueprint + Enablement"
          : "Architecture Audit + Blueprint",
    },
    accelerating: {
      label: "Ready to Accelerate",
      message:
        "Strong foundation. Risk compounds without continued architectural oversight.",
      recommendation: "Fractional Architect engagement",
    },
  };

  const tierData = TIERS[tier];

  return {
    tier,
    label: tierData.label,
    message: tierData.message,
    recommendation: tierData.recommendation,
    highGap: aiGap >= 2,
    lowSov: sovScore < 3,
    aiLevel,
    aiInfra,
  };
}

function isValidAnswers(raw: unknown): raw is Answers {
  if (typeof raw !== "object" || raw === null) return false;
  const obj = raw as Record<string, unknown>;

  // stage must be present and valid
  const stage = obj["stage"];
  if (!["seed", "a", "b"].includes(String(stage))) return false;

  // At minimum q1 through q14 must be present and non-empty
  for (const id of SCORED_IDS) {
    if (obj[id] == null) return false;
  }

  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidAnswers(body)) {
    return NextResponse.json(
      { error: "Missing or invalid answers" },
      { status: 400 },
    );
  }

  const result = calcResults(body);
  return NextResponse.json(result);
}
