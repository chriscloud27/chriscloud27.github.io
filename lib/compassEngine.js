/**
 * compassEngine.js
 * Pure JS scoring engine for Platform Compass — no React, no Next.js.
 * Can be imported in both client components and server modules.
 */

/** @type {Record<string, string>} */
const QUESTION_TYPES = {
  q1: "scale", // 1-5
  q2: "ypn",
  q3: "scale", // 1-5
  q4: "ypn",
  q5: "scale", // 1-5
  q6: "ksu",
  q7: "scale", // 1-5
  q8: "ypn",
  q9: "scale5", // 1-5 (OpenAI AI level)
  q10: "scale04", // 0-4 (AI infra footprint)
  q11: "scale", // 1-5
  q12: "ypn",
  q13: "scale4", // 1-4 (team AI adoption)
  q14: "scale5", // 1-5
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
];

/**
 * Convert a raw answer value to a 0-100 score.
 * @param {string} id  - Question ID (q1-q14)
 * @param {string|number} value - Raw answer
 * @returns {number} 0-100
 */
function toScore(id, value) {
  const type = QUESTION_TYPES[id];
  const v = String(value).toUpperCase().trim();

  if (type === "scale" || type === "scale5") {
    // 1-5 scale → /5 * 100
    return (parseInt(v, 10) / 5) * 100;
  }
  if (type === "scale04") {
    // 0-4 → /4 * 100
    return (parseInt(v, 10) / 4) * 100;
  }
  if (type === "scale4") {
    // 1-4 → /4 * 100
    return (parseInt(v, 10) / 4) * 100;
  }
  if (type === "ypn") {
    return v === "Y" ? 100 : v === "P" ? 60 : 20;
  }
  if (type === "ksu") {
    return v === "K" ? 100 : v === "S" ? 60 : 20;
  }
  return 50;
}

/**
 * Apply stage multiplier. If score < 40:
 *   Series B  → subtract 8 (higher expectations at B)
 *   Seed      → add 8 (lower expectations at seed)
 * @param {string} stage
 * @param {number} score 0-100
 * @returns {number}
 */
function applyStageMultiplier(stage, score) {
  if (score < 40) {
    if (stage === "b") return score - 8;
    if (stage === "seed") return score + 8;
  }
  return score;
}

/**
 * Average an array of numbers.
 * @param {number[]} arr
 * @returns {number}
 */
function avg(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

/**
 * Score all answers and return a full result object.
 *
 * @param {Object} answers - Raw answers object from the terminal.
 *   Expected fields: name_first, name_family, stage, website, github, email,
 *   q1-q14 (see QUESTION_TYPES for formats)
 *
 * @returns {{
 *   tier: string,
 *   label: string,
 *   overall: number,
 *   b1: number, b2: number, b3: number, b4: number, b5: number,
 *   message: string,
 *   recommendation: string,
 *   highGap: boolean,
 *   lowSov: boolean,
 *   aiLevel: number,
 *   aiInfra: number
 * }}
 */
export function scoreAnswers(answers) {
  const stage = String(answers.stage ?? answers["stage"] ?? "a").toLowerCase();

  // Score each pillar (0-100, stage-adjusted)
  /** @type {Record<string, number>} */
  const pillar = {};
  for (const id of SCORED_IDS) {
    const raw = answers[id] != null ? toScore(id, answers[id]) : 50;
    pillar[id] = applyStageMultiplier(stage, raw);
  }

  // Block averages
  const b1 = avg([pillar.q1, pillar.q2, pillar.q3, pillar.q4, pillar.q5]);
  const b2 = avg([pillar.q6, pillar.q7, pillar.q8]);
  const b3 = avg([pillar.q9, pillar.q10]);
  const b4 = avg([pillar.q11, pillar.q12]);
  const b5 = avg([pillar.q13, pillar.q14]);

  // Overall = average of all 14 pillar scores
  const overall = avg(SCORED_IDS.map((id) => pillar[id]));

  // Tier thresholds
  const tier =
    overall < 40 ? "fragile" : overall < 65 ? "scaling" : "accelerating";

  // AI gap flag: aiLevel (raw 1-5) minus (aiInfra_raw + 1) ≥ 2
  const aiLevel = parseInt(String(answers.q9 ?? answers["q9"] ?? 1), 10);
  const aiInfra = parseInt(String(answers.q10 ?? answers["q10"] ?? 0), 10);
  const highGap = aiLevel - (aiInfra + 1) >= 2;

  // Sovereignty risk: avg of q11 and q12 scores < 50
  const lowSov = avg([pillar.q11, pillar.q12]) < 50;

  const TIER_DATA = {
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

  const td = TIER_DATA[tier];

  return {
    tier,
    label: td.label,
    overall: Math.round(overall),
    b1: Math.round(b1),
    b2: Math.round(b2),
    b3: Math.round(b3),
    b4: Math.round(b4),
    b5: Math.round(b5),
    message: td.message,
    recommendation: td.recommendation,
    highGap,
    lowSov,
    aiLevel,
    aiInfra,
  };
}
