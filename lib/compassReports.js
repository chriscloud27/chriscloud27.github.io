/**
 * compassReports.js
 * Builds table-based, inline-style email HTML for Platform Compass results.
 * No external CSS, no web fonts — Gmail / Outlook / Apple Mail safe.
 *
 * Exports:
 *   buildSimpleReport(answers, result)   → HTML string (customer copy)
 *   buildAdvancedReport(answers, result) → HTML string (internal copy for Chris)
 */

// ─────────────────────────────────────────────────────────────────────────────
// BRAND TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  bg: "#0B1F3A",
  surf: "#0f2847",
  cyan: "#00E5FF",
  cyanDim: "#00b8cc",
  white: "#FFFFFF",
  body: "#a8c0d8",
  dim: "#4a6fa5",
  border: "rgba(0,229,255,0.12)",
  borderSt: "#1e3a55",
  warn: "#FEBC2E",
  warnBg: "#1a1200",
  ok: "#28C840",
  err: "#FF5F57",
  amber: "#F59E0B",
  amberBg: "#1c1300",
  mono: "Courier New, Courier, monospace",
  sans: "Arial, Helvetica, sans-serif",
};

// ─────────────────────────────────────────────────────────────────────────────
// BLOCK CONTENT MAPS
// ─────────────────────────────────────────────────────────────────────────────

/** @type {Record<string, { label: string, questions: string[], finding: Record<string,string>, quickWin: Record<string,string> }>} */
const BLOCKS = {
  b1: {
    label: "B1 · Platform Foundations",
    questions: ["q1", "q2", "q3", "q4", "q5"],
    finding: {
      fragile:
        "Your platform is showing significant foundation strain. Engineers are spending more time firefighting than shipping, architectural standards are absent or unenforced, and infrastructure was designed to move fast—not to scale. Cloud cost visibility is low and AI features behave inconsistently between staging and production.",
      scaling:
        "Foundations are holding, but under visible stress. Some architectural practices exist but are inconsistently applied. Cloud costs are partially understood. AI features mostly behave the same in staging and production, but edge cases in production are surfacing gaps.",
      accelerating:
        "Platform foundations are mature. Engineering time is invested in features, not firefighting. Architectural standards are in place and followed. Cloud cost drivers are understood. AI delivers consistent production behavior.",
    },
    quickWin: {
      fragile:
        "Run a 90-minute incident retrospective with your top 3 recurring incidents from the past 60 days. Map each to an infrastructure root cause—not a team failure. This surfaces the highest-priority debt and builds the business case for a structured audit.",
      scaling:
        "Run a cloud cost allocation exercise. Tag every resource to a team and product line. You will find 30–40% of spend with no clear owner within a week. That clarity alone accelerates the next prioritisation decision.",
      accelerating:
        "Establish a quarterly architecture review cadence with a named owner. As you scale past Series B, structural discipline is what separates continued acceleration from a stall.",
    },
  },
  b2: {
    label: "B2 · Reliability & Ownership",
    questions: ["q6", "q7", "q8"],
    finding: {
      fragile:
        "Production incidents are routinely surprising your team. Infrastructure decisions are made locally with little cross-team visibility. Architectural ownership is unclear—everyone is nominally responsible, which in practice means no one is. System-level thinking is not yet part of how your team operates.",
      scaling:
        "Root causes are sometimes anticipated, sometimes not. Ownership exists on paper but is not consistently respected under pressure. System-level thinking is developing—present in some decisions but not yet instilled as a team habit.",
      accelerating:
        "Reliability is strong and architectural ownership is clear. Root causes are usually known risks, not surprises. Your team makes infrastructure decisions with visible awareness of cross-system impact.",
    },
    quickWin: {
      fragile:
        "Name one person who owns architectural decisions this quarter. Not a committee, not shared responsibility—one named owner with decision authority. This single change reduces incident mean-time-to-resolution by 40% on average, because escalation paths become unambiguous.",
      scaling:
        "Introduce architectural decision records (ADRs) for every infrastructure decision made this month. The forcing function—writing it down—drives whole-system thinking and builds the ownership habit before it becomes a cultural expectation.",
      accelerating:
        "Document your architectural decision process and ownership model explicitly. As you hire senior engineers, this becomes the foundation for scaling engineering culture without adding coordination overhead.",
    },
  },
  b3: {
    label: "B3 · AI Maturity",
    questions: ["q9", "q10"],
    finding: {
      fragile:
        "Your AI ambition and AI infrastructure are significantly misaligned. You are operating at a higher AI capability level than your infrastructure can reliably support—a leading indicator of production failures, cost overruns, and reliability incidents. The gap will widen as usage scales.",
      scaling:
        "AI is integrated into production but the infrastructure layer is still catching up to your AI ambition. Some models are live. Fallbacks exist in some places. Scaling traffic or adding new AI capabilities will expose the gaps in the current setup.",
      accelerating:
        "AI maturity is high. Infrastructure matches AI ambition level. Multiple models or providers are integrated with clear ownership, fallback paths, and production-tested reliability.",
    },
    quickWin: {
      fragile:
        "Map every AI model or provider in production to its failure mode and fallback path today. If a fallback is missing, you have a single point of failure. Fix the most critical one this sprint—it is the fastest risk reduction available without a full infrastructure overhaul.",
      scaling:
        "Run a load test on your primary AI inference path at 10× current traffic. Measure latency, cost per call, and error rate. This is the fastest way to find where the ceiling is before your users find it for you.",
      accelerating:
        "Implement a model performance dashboard tracking latency, cost, and error rate per model. As AI models evolve rapidly, this is how you maintain operational visibility without adding engineering overhead.",
    },
  },
  b4: {
    label: "B4 · Cloud Sovereignty",
    questions: ["q11", "q12"],
    finding: {
      fragile:
        "High vendor lock-in detected. Your platform is deeply tied to one cloud provider or AI API. A 3× price increase from your primary provider would create serious business risk. Open standards and cloud-agnostic patterns are not consistently applied across the platform.",
      scaling:
        "Partial flexibility exists, but key dependencies remain. Some open-source patterns are in use, but vendor-specific services are still deeply embedded in critical paths. Migration would be measured in months, not days.",
      accelerating:
        "Strong cloud sovereignty. Provider independence is high. Open standards are consistently applied. A price increase or provider outage would be a manageable operational event, not a business crisis.",
    },
    quickWin: {
      fragile:
        "Identify your top 3 vendor-specific dependencies this week. For each, estimate the engineering cost to extract or abstract. You will usually find one dependency that represents 80% of the lock-in risk—that is the abstraction to prioritise, not a full migration.",
      scaling:
        "Add a cloud-agnostic abstraction layer for your most critical AI API call. Even a thin interface wrapper reduces lock-in risk and makes provider switching a days-long exercise rather than a months-long rewrite.",
      accelerating:
        "Document your provider independence architecture. As you approach later funding rounds or enterprise sales, this becomes a competitive advantage and a due diligence asset that reduces deal friction.",
    },
  },
  b5: {
    label: "B5 · Team & AI Usage",
    questions: ["q13", "q14"],
    finding: {
      fragile:
        "AI tool adoption is low and AI architecture ownership is unclear or absent. Your team is not yet leveraging AI for velocity gains. There is no clear owner for AI architectural decisions, which means they are being made inconsistently or deferred entirely.",
      scaling:
        "AI tool adoption is growing but uneven. Some engineers are using AI tools daily; others are not. AI architectural ownership sits at the CTO or senior engineer level—functional now, but unlikely to scale without a more structured ownership model.",
      accelerating:
        "High AI tool adoption and clear AI architectural ownership. Your team is leveraging AI for velocity and there is a named owner or dedicated lead for AI architecture decisions.",
    },
    quickWin: {
      fragile:
        "Run a 60-minute team session: every engineer demos one AI tool they have tried, even briefly. The goal is not immediate adoption—it is discovery and normalisation. Teams that share tools informally adopt them organically and faster than top-down mandates.",
      scaling:
        "Assign one engineer as the AI tooling lead for the next quarter—20% time, not a full-time role. Their scope: one AI tool evaluated per sprint that reduces toil for the team. This creates momentum without creating overhead.",
      accelerating:
        "Run a quarterly AI tooling review. As models improve rapidly, the tools that maximise engineering velocity change. A structured review prevents adoption lag and keeps your team at the frontier.",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL BLOCK CONTENT (advanced report only)
// ─────────────────────────────────────────────────────────────────────────────

/** @type {Record<string, { diagnosisQ: string[], signals: string, getEngagementNote: function }>} */
const INTERNAL = {
  b1: {
    diagnosisQ: [
      "Walk me through the last time a production incident delayed a scheduled release. What was the root cause?",
      "If I asked your engineers today to estimate the ratio of platform maintenance to feature work this sprint, what would they say?",
      "Do you have a single document that describes your current architectural standards and who enforces them?",
    ],
    signals:
      "Listen for: vague answers about incident causes (indicates no systematic root cause analysis), frustration directed at 'the platform' rather than specific components (indicates architectural debt is invisible), and hesitation when asked about cloud cost drivers (indicates no tagging or ownership model).",
    getEngagementNote: (answers, result) => {
      const q1 = parseInt(String(answers.q1 ?? 3), 10);
      const q4 = String(answers.q4 ?? "P").toUpperCase();
      if (q1 <= 2 && q4 === "N")
        return "CRITICAL: Both engineering velocity (Q1) and cloud cost visibility (Q4) are at floor. This is a strong Audit signal — propose Architecture Audit as first engagement within the call.";
      if (q1 <= 2)
        return "Engineering velocity is severely impacted (Q1). Lead with the firefighting cost conversation — quantify lost sprint capacity as a monthly dollar figure with them.";
      if (result.b1 < 40)
        return "B1 overall is fragile. Focus the call on the gap between current infrastructure state and Series A/B expectations. The cost of not fixing is compounding weekly.";
      return "B1 is under pressure but manageable. Position audit as risk prevention before growth accelerates the debt — not as a crisis response.";
    },
  },
  b2: {
    diagnosisQ: [
      "When something breaks in production, how long does it typically take to identify the root cause — and who makes that call?",
      "Can you name the person who owns architectural decisions for your platform right now?",
      "When a team makes an infrastructure decision, who — if anyone — reviews it for cross-system impact?",
    ],
    signals:
      "Listen for: 'we all own it' or 'the CTO decides everything' (both indicate ownership gaps), descriptions of incidents that required multiple teams to diagnose (indicates missing system-level visibility), and long pauses when asked about architectural ownership (indicates the question has not been explicitly resolved internally).",
    getEngagementNote: (answers, result) => {
      const q8 = String(answers.q8 ?? "P").toUpperCase();
      const q6 = String(answers.q6 ?? "S").toUpperCase();
      if (q8 === "N" && q6 === "U")
        return "CRITICAL: No architectural ownership (Q8=N) and incidents are consistently surprising (Q6=U). This combination produces the highest incident frequency in the dataset. Recommend Enablement engagement to establish ownership model immediately.";
      if (q8 === "N")
        return "Architectural ownership is absent (Q8=N). The diagnosis call should surface the cost: how many incidents this quarter had unclear ownership in the response? Use that number to anchor the Blueprint conversation.";
      if (result.b2 < 50)
        return "Reliability and ownership are both under stress. Frame the engagement as building the operating model they need at Series B — not patching the one they have from seed.";
      return "B2 is functional. Focus on durability as they scale — the current model works with a 15-person team but may not survive a 40-person org.";
    },
  },
  b3: {
    diagnosisQ: [
      "At what level of the OpenAI five-level framework does your product actually operate today versus where your roadmap plans to be in 12 months?",
      "If your primary AI provider went down for 4 hours tomorrow morning, what would your users experience?",
      "How many distinct AI models or providers are in your production platform right now, and who owns the reliability of each one?",
    ],
    signals:
      "Listen for: roadmap AI ambitions that are 2+ levels above their current infrastructure (highGap validated), 'we use OpenAI' with no mention of fallbacks or alternatives (sovereignty risk), and confidence about AI performance in staging that hasn't been explicitly validated in production at scale.",
    getEngagementNote: (answers, result) => {
      if (result.highGap)
        return `HIGH RISK: AI gap flag active. Level ${result.aiLevel} AI roadmap on Level ${result.aiInfra + 1} infrastructure. This is the highest-priority risk in the submission. Lead the call with the AI gap — quantify what a production failure at their current AI level costs per hour of downtime.`;
      const q9 = parseInt(String(answers.q9 ?? 1), 10);
      if (q9 >= 3 && result.b3 < 60)
        return `Agentic or higher AI ambition (Q9=${q9}) but infrastructure is not keeping pace. Frame Blueprint as the AI infrastructure layer they need to operate safely at that level.`;
      return "AI maturity is reasonable. Probe the roadmap direction — where they plan to be in 12 months will likely surface a gap worth designing for now.";
    },
  },
  b4: {
    diagnosisQ: [
      "If your primary cloud provider raised prices 3× tomorrow, what would your options be — and what would the migration cost?",
      "Walk me through how many of your critical platform components are tied to vendor-specific managed services with no abstraction layer.",
      "Does your team use Kubernetes, open APIs, or CNCF-native tooling in your critical paths — or are you primarily on managed proprietary services?",
    ],
    signals:
      "Listen for: 'we're all-in on [single provider]' with no mention of portability (sovereignty risk), descriptions of deep proprietary service dependencies in the critical path (lock-in risk), and no mention of vendor contracts or pricing reviews (indicates no governance).",
    getEngagementNote: (answers, result) => {
      if (result.lowSov)
        return "SOVEREIGNTY FLAG ACTIVE: Both Q11 and Q12 indicate high lock-in. This surfaces in due diligence for Series B and enterprise sales. Frame the abstraction work as a balance sheet asset — reducing technical liability before the funding round.";
      const q11 = parseInt(String(answers.q11 ?? 3), 10);
      if (q11 <= 2)
        return "Provider independence is critically low (Q11). Ask directly: has this been flagged with the board or investors? If not, this is a conversation to have before it surfaces in due diligence at the wrong moment.";
      return "Sovereignty is not the primary risk here. Keep it on the radar but focus call time on higher-scoring risk areas for this client.";
    },
  },
  b5: {
    diagnosisQ: [
      "What percentage of your engineering team uses AI tools in their daily workflow today — and how do you know?",
      "Who is responsible for evaluating and standardising AI tools for engineering productivity in your team right now?",
      "In the last quarter, did any AI tooling decision create a dependency or security consideration you weren't expecting?",
    ],
    signals:
      "Listen for: 'people use whatever they want' (indicates no governance), inability to estimate adoption percentage (indicates no measurement), and CTO personally evaluating every AI tool (indicates the ownership model doesn't scale).",
    getEngagementNote: (answers, result) => {
      const q14 = parseInt(String(answers.q14 ?? 2), 10);
      const q13 = parseInt(String(answers.q13 ?? 2), 10);
      if (q14 === 1 && q13 <= 2)
        return "No AI ownership and low adoption (Q14=1, Q13 low). This is an engineering velocity risk — competitors with higher AI adoption are compounding an output advantage week over week. Frame Enablement as the ownership model to close that gap.";
      if (q14 <= 2)
        return "AI ownership is distributed or absent (Q14 low). At Series A/B scale, this creates governance risk as AI tools proliferate across the team. Propose a lightweight AI architecture review as part of Blueprint scope.";
      return "AI ownership is adequate. Probe whether the current owner has the bandwidth as the team grows — this is a scaling question, not a current problem.";
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render a 0-100 score bar using table cells (email-safe).
 * @param {number} score 0-100
 * @param {string} [fillColor]
 * @returns {string} HTML string
 */
function scoreBar(score, fillColor = C.cyan) {
  const pct = Math.min(100, Math.max(0, score));
  const empty = 100 - pct;
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 2px;">
      <tr>
        <td width="${pct}%" height="4" bgcolor="${fillColor}" style="background:${fillColor};font-size:0;line-height:0;"></td>
        <td width="${empty}%" height="4" bgcolor="${C.borderSt}" style="background:${C.borderSt};font-size:0;line-height:0;"></td>
      </tr>
    </table>`;
}

/**
 * Return a tier colour.
 * @param {string} tier
 * @returns {string}
 */
function tierColor(tier) {
  if (tier === "fragile") return C.err;
  if (tier === "scaling") return C.warn;
  return C.ok;
}

/**
 * Stage display label.
 * @param {string} stage
 * @returns {string}
 */
function stageLabel(stage) {
  const s = String(stage).toLowerCase();
  if (s === "b") return "Series B";
  if (s === "a") return "Series A";
  return "Seed";
}

/**
 * Wrapper for a full-width email table.
 * @param {string} bodyHtml
 * @param {string} [headerBg]
 * @returns {string}
 */
function emailWrapper(bodyHtml, headerBg = C.bg) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Platform Compass · MaCh2.Cloud</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:${C.sans};">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:${headerBg};border-radius:8px;overflow:hidden;border:1px solid ${C.borderSt};">
        ${bodyHtml}
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOCK ROW (shared by both reports)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {string} blockKey  e.g. "b1"
 * @param {number} score     0-100
 * @param {string} tier      fragile|scaling|accelerating
 * @param {boolean} [internal]
 * @param {Object} [answers]
 * @param {Object} [result]
 * @returns {string}
 */
function blockRow(
  blockKey,
  score,
  tier,
  internal = false,
  answers = {},
  result = {},
) {
  const block = BLOCKS[blockKey];
  const finding = block.finding[tier];
  const quickWin = block.quickWin[tier];
  const color = tierColor(tier);
  const scoreDisplay = String(score);

  let internalSection = "";
  if (internal) {
    const int = INTERNAL[blockKey];
    const engNote = int.getEngagementNote(answers, result);
    internalSection = `
      <tr>
        <td style="padding:14px 24px 0;">
          <p style="margin:0 0 8px;font-family:${C.mono};font-size:11px;letter-spacing:0.1em;color:${C.amber};text-transform:uppercase;">Your action brief</p>
          <p style="margin:0 0 10px;font-family:${C.sans};font-size:12px;color:${C.body};line-height:1.6;">
            <strong style="color:${C.white};font-size:11px;font-family:${C.mono};text-transform:uppercase;letter-spacing:0.08em;">Diagnosis call questions</strong>
          </p>
          ${int.diagnosisQ
            .map(
              (q, i) => `
          <p style="margin:0 0 6px;font-family:${C.sans};font-size:12px;color:${C.body};line-height:1.6;padding-left:12px;">
            ${i + 1}. ${q}
          </p>`,
            )
            .join("")}
          <p style="margin:14px 0 6px;font-family:${C.sans};font-size:12px;color:${C.body};line-height:1.6;">
            <strong style="color:${C.white};font-size:11px;font-family:${C.mono};text-transform:uppercase;letter-spacing:0.08em;">Signals to listen for</strong>
          </p>
          <p style="margin:0 0 10px;font-family:${C.sans};font-size:12px;color:${C.body};line-height:1.7;font-style:italic;">
            ${int.signals}
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="background:${C.amberBg};border:1px solid ${C.amber};border-left:3px solid ${C.amber};border-radius:4px;padding:12px 14px;">
                <p style="margin:0 0 4px;font-family:${C.mono};font-size:10px;letter-spacing:0.1em;color:${C.amber};text-transform:uppercase;">Engagement note</p>
                <p style="margin:0;font-family:${C.sans};font-size:12px;color:#fde68a;line-height:1.6;">${engNote}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td style="padding:0 24px;"><div style="height:1px;background:${C.borderSt};margin:16px 0 0;"></div></td></tr>`;
  }

  return `
    <tr>
      <td style="padding:20px 24px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <p style="margin:0;font-family:${C.mono};font-size:11px;letter-spacing:0.1em;color:${C.dim};text-transform:uppercase;">${block.label}</p>
            </td>
            <td align="right">
              <p style="margin:0;font-family:${C.mono};font-size:14px;color:${color};font-weight:600;">${scoreDisplay}</p>
            </td>
          </tr>
        </table>
        ${scoreBar(score, color)}
        <p style="margin:10px 0 0;font-family:${C.sans};font-size:13px;color:${C.body};line-height:1.7;">${finding}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 24px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:rgba(0,229,255,0.04);border:1px solid rgba(0,229,255,0.15);border-left:3px solid ${C.cyan};border-radius:4px;padding:12px 14px;">
              <p style="margin:0 0 4px;font-family:${C.mono};font-size:10px;letter-spacing:0.1em;color:${C.cyanDim};text-transform:uppercase;">Quick win</p>
              <p style="margin:0;font-family:${C.sans};font-size:12px;color:${C.body};line-height:1.7;">${quickWin}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    ${internalSection}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC: buildSimpleReport
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build the customer-facing HTML email report.
 *
 * @param {Object} answers - Raw terminal answers (name_first, name_family, stage, website, email, q1-q14)
 * @param {{ tier:string, label:string, overall:number, b1:number, b2:number, b3:number, b4:number, b5:number, message:string, recommendation:string, highGap:boolean, lowSov:boolean, aiLevel:number, aiInfra:number }} result
 * @returns {string} Full HTML string
 */
export function buildSimpleReport(answers, result) {
  const firstName = String(answers.name_first ?? answers.name ?? "").trim();
  const familyName = String(answers.name_family ?? "").trim();
  const fullName = [firstName, familyName].filter(Boolean).join(" ") || "there";
  const website = String(answers.website ?? "").trim();
  const stage = stageLabel(String(answers.stage ?? "a"));
  const tc = tierColor(result.tier);
  const blockKeys = ["b1", "b2", "b3", "b4", "b5"];
  const blockScores = {
    b1: result.b1,
    b2: result.b2,
    b3: result.b3,
    b4: result.b4,
    b5: result.b5,
  };

  // AI gap banner
  const gapBanner = result.highGap
    ? `
    <tr>
      <td style="padding:0 24px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:${C.warnBg};border:1px solid ${C.warn};border-left:3px solid ${C.warn};border-radius:4px;padding:14px 16px;">
              <p style="margin:0 0 4px;font-family:${C.mono};font-size:10px;letter-spacing:0.1em;color:${C.warn};text-transform:uppercase;">AI Ambition Gap · Critical Flag</p>
              <p style="margin:0;font-family:${C.sans};font-size:13px;color:#fde68a;line-height:1.7;">
                Your AI roadmap is operating at <strong>Level ${result.aiLevel}</strong> but your infrastructure is ready for <strong>Level ${result.aiInfra + 1}</strong>.
                A gap of ${result.aiLevel - (result.aiInfra + 1)} levels is a high-risk signal — production failures, cost overruns, and reliability incidents are likely as usage scales.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
    : "";

  // Sovereignty banner
  const sovBanner = result.lowSov
    ? `
    <tr>
      <td style="padding:0 24px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:${C.warnBg};border:1px solid ${C.warn};border-left:3px solid ${C.warn};border-radius:4px;padding:14px 16px;">
              <p style="margin:0 0 4px;font-family:${C.mono};font-size:10px;letter-spacing:0.1em;color:${C.warn};text-transform:uppercase;">Cloud Sovereignty · Risk Flag</p>
              <p style="margin:0;font-family:${C.sans};font-size:13px;color:#fde68a;line-height:1.7;">
                High vendor lock-in detected across provider independence and open standards.
                A price change or outage from your primary provider would create serious business risk at your current scale.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
    : "";

  const body = `
    <!-- HEADER -->
    <tr>
      <td style="background:${C.surf};padding:28px 24px 20px;border-bottom:1px solid ${C.borderSt};">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <p style="margin:0;font-family:${C.mono};font-size:14px;font-weight:700;letter-spacing:0.06em;color:${C.cyan};">MaCh2.Cloud</p>
              <p style="margin:4px 0 0;font-family:${C.mono};font-size:10px;letter-spacing:0.12em;color:${C.dim};text-transform:uppercase;">Platform Compass · AI-Native Platform Readiness</p>
            </td>
            <td align="right">
              <p style="margin:0;font-family:${C.mono};font-size:11px;color:${C.dim};">${stage}</p>
              ${website ? `<p style="margin:4px 0 0;font-family:${C.mono};font-size:11px;color:${C.cyanDim};">${website}</p>` : ""}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- HERO -->
    <tr>
      <td style="padding:32px 24px 20px;">
        <p style="margin:0 0 6px;font-family:${C.mono};font-size:11px;letter-spacing:0.12em;color:${C.dim};text-transform:uppercase;">Platform Compass Result</p>
        <p style="margin:0 0 4px;font-family:${C.sans};font-size:26px;font-weight:700;color:${C.white};">${fullName}</p>
        <p style="margin:0 0 16px;font-family:${C.mono};font-size:18px;font-weight:700;color:${tc};">${result.label}</p>
        <p style="margin:0 0 20px;font-family:${C.sans};font-size:14px;color:${C.body};line-height:1.7;">${result.message}</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:rgba(0,229,255,0.04);border:1px solid ${C.borderSt};border-radius:6px;padding:16px 20px;">
              <p style="margin:0 0 6px;font-family:${C.mono};font-size:10px;letter-spacing:0.12em;color:${C.dim};text-transform:uppercase;">Overall Readiness Score</p>
              <p style="margin:0;font-family:${C.mono};font-size:36px;font-weight:700;color:${tc};">${result.overall}<span style="font-size:16px;color:${C.dim};"> / 100</span></p>
              ${scoreBar(result.overall, tc)}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FLAGS -->
    ${gapBanner}
    ${sovBanner}

    <!-- DIVIDER -->
    <tr>
      <td style="padding:0 24px;">
        <div style="height:1px;background:${C.borderSt};"></div>
      </td>
    </tr>

    <!-- BLOCK SCORES -->
    <tr>
      <td style="padding:20px 24px 8px;">
        <p style="margin:0;font-family:${C.mono};font-size:11px;letter-spacing:0.12em;color:${C.dim};text-transform:uppercase;">Assessment Blocks</p>
      </td>
    </tr>
    ${blockKeys.map((key) => blockRow(key, blockScores[key], result.tier)).join("")}

    <!-- RECOMMENDATION -->
    <tr>
      <td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:rgba(0,229,255,0.04);border:1px solid ${C.borderSt};border-radius:6px;padding:18px 20px;">
              <p style="margin:0 0 6px;font-family:${C.mono};font-size:10px;letter-spacing:0.12em;color:${C.dim};text-transform:uppercase;">Recommended next step</p>
              <p style="margin:0;font-family:${C.sans};font-size:15px;font-weight:600;color:${C.white};">${result.recommendation}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- CTA -->
    <tr>
      <td style="padding:0 24px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="background:${C.cyan};border-radius:6px;padding:14px 20px;">
              <a href="https://cal.com/mach2cloud/diagnosis-call" style="font-family:${C.mono};font-size:13px;font-weight:700;letter-spacing:0.08em;color:${C.bg};text-decoration:none;display:block;">
                Book the Diagnosis Call →
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:12px 0 0;font-family:${C.sans};font-size:12px;color:${C.dim};text-align:center;line-height:1.6;">
          30 minutes · No pitch · Architecture-only conversation<br>
          <a href="https://cal.com/mach2cloud/diagnosis-call" style="color:${C.cyanDim};text-decoration:none;">cal.com/mach2cloud/diagnosis-call</a>
        </p>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="background:${C.surf};padding:20px 24px;border-top:1px solid ${C.borderSt};">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <p style="margin:0;font-family:${C.mono};font-size:11px;color:${C.dim};">
                MaCh2.Cloud · AI‑Native Cloud & Platform Architecture
              </p>
              <p style="margin:4px 0 0;font-family:${C.mono};font-size:11px;">
                <a href="mailto:chris@mach2.cloud" style="color:${C.cyanDim};text-decoration:none;">chris@mach2.cloud</a>
              </p>
            </td>
            <td align="right">
              <p style="margin:0;font-family:${C.mono};font-size:10px;color:${C.borderSt};">Platform Compass v1</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  return emailWrapper(body);
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC: buildAdvancedReport
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build the internal HTML email report for Chris.
 *
 * @param {Object} answers
 * @param {{ tier:string, label:string, overall:number, b1:number, b2:number, b3:number, b4:number, b5:number, message:string, recommendation:string, highGap:boolean, lowSov:boolean, aiLevel:number, aiInfra:number }} result
 * @returns {string} Full HTML string
 */
export function buildAdvancedReport(answers, result) {
  const firstName = String(answers.name_first ?? answers.name ?? "").trim();
  const familyName = String(answers.name_family ?? "").trim();
  const fullName =
    [firstName, familyName].filter(Boolean).join(" ") || "Unknown";
  const website = String(answers.website ?? "").trim();
  const github = String(answers.github ?? "").trim();
  const email = String(answers.email ?? "").trim();
  const stage = stageLabel(String(answers.stage ?? "a"));
  const tc = tierColor(result.tier);
  const blockKeys = ["b1", "b2", "b3", "b4", "b5"];
  const blockScores = {
    b1: result.b1,
    b2: result.b2,
    b3: result.b3,
    b4: result.b4,
    b5: result.b5,
  };
  const now =
    new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC";

  // Raw answers table
  const rawAnswerRows = [
    ["q1", "Engineering velocity"],
    ["q2", "Architecture framework"],
    ["q3", "AI production readiness"],
    ["q4", "Cloud cost visibility"],
    ["q5", "Architectural debt"],
    ["q6", "System reliability"],
    ["q7", "System thinking"],
    ["q8", "Architectural ownership"],
    ["q9", "AI implementation level"],
    ["q10", "AI infrastructure footprint"],
    ["q11", "Provider independence"],
    ["q12", "Open standards"],
    ["q13", "Team AI adoption"],
    ["q14", "AI ownership"],
  ]
    .map(
      ([id, label]) => `
    <tr>
      <td style="padding:6px 10px;font-family:${C.mono};font-size:11px;color:${C.dim};border-bottom:1px solid ${C.borderSt};">${id}</td>
      <td style="padding:6px 10px;font-family:${C.sans};font-size:12px;color:${C.body};border-bottom:1px solid ${C.borderSt};">${label}</td>
      <td style="padding:6px 10px;font-family:${C.mono};font-size:12px;color:${C.white};border-bottom:1px solid ${C.borderSt};text-align:right;">${answers[id] ?? "—"}</td>
    </tr>`,
    )
    .join("");

  // Call prep questions (tailored to submission)
  const callPrepQuestions = buildCallPrepQuestions(
    answers,
    result,
    fullName,
    stage,
  );

  const body = `
    <!-- INTERNAL HEADER BANNER -->
    <tr>
      <td style="background:${C.amberBg};padding:14px 24px;border-bottom:2px solid ${C.amber};">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <p style="margin:0;font-family:${C.mono};font-size:10px;letter-spacing:0.15em;color:${C.amber};text-transform:uppercase;">[INTERNAL] · MaCh2.Cloud Platform Compass</p>
              <p style="margin:4px 0 0;font-family:${C.mono};font-size:11px;color:#fde68a;">Do not forward to client · Call prep document</p>
            </td>
            <td align="right">
              <p style="margin:0;font-family:${C.mono};font-size:10px;color:${C.amber};">${now}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- SUBJECT LINE ROW -->
    <tr>
      <td style="background:${C.surf};padding:16px 24px;border-bottom:1px solid ${C.borderSt};">
        <p style="margin:0 0 4px;font-family:${C.mono};font-size:10px;letter-spacing:0.1em;color:${C.dim};text-transform:uppercase;">Submission</p>
        <p style="margin:0;font-family:${C.mono};font-size:13px;color:${C.white};">
          ${fullName} · ${website} · <span style="color:${tc};">${result.label}</span> · ${result.overall}/100
        </p>
      </td>
    </tr>

    <!-- CLIENT OVERVIEW -->
    <tr>
      <td style="padding:24px 24px 16px;">
        <p style="margin:0 0 12px;font-family:${C.mono};font-size:11px;letter-spacing:0.12em;color:${C.dim};text-transform:uppercase;">Client Overview</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.borderSt};border-radius:6px;">
          ${[
            ["Name", fullName],
            ["Stage", stage],
            ["Website", website || "—"],
            ["GitHub", github || "—"],
            ["Email", email || "—"],
            ["Tier", result.label],
            ["Score", String(result.overall) + " / 100"],
            [
              "Flags",
              [
                result.highGap ? "AI Gap" : null,
                result.lowSov ? "Low Sovereignty" : null,
              ]
                .filter(Boolean)
                .join(", ") || "None",
            ],
          ]
            .map(
              ([k, v]) => `
          <tr>
            <td style="padding:8px 12px;font-family:${C.mono};font-size:11px;color:${C.dim};border-bottom:1px solid ${C.borderSt};width:120px;">${k}</td>
            <td style="padding:8px 12px;font-family:${C.sans};font-size:12px;color:${C.white};border-bottom:1px solid ${C.borderSt};">${v}</td>
          </tr>`,
            )
            .join("")}
        </table>
      </td>
    </tr>

    <!-- SCORE SUMMARY -->
    <tr>
      <td style="padding:0 24px 20px;">
        <p style="margin:0 0 12px;font-family:${C.mono};font-size:11px;letter-spacing:0.12em;color:${C.dim};text-transform:uppercase;">Score Summary</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${[
            ["Overall", result.overall, tc],
            ["B1 · Platform Foundations", result.b1, tierColor(result.tier)],
            ["B2 · Reliability & Ownership", result.b2, tierColor(result.tier)],
            ["B3 · AI Maturity", result.b3, tierColor(result.tier)],
            ["B4 · Cloud Sovereignty", result.b4, tierColor(result.tier)],
            ["B5 · Team & AI Usage", result.b5, tierColor(result.tier)],
          ]
            .map(
              ([label, score, color]) => `
          <tr>
            <td style="padding:4px 0;font-family:${C.mono};font-size:11px;color:${C.body};width:220px;">${label}</td>
            <td style="padding:4px 8px;font-family:${C.mono};font-size:12px;color:${color};text-align:right;width:40px;">${score}</td>
            <td style="padding:4px 0 4px 8px;">${scoreBar(score, color)}</td>
          </tr>`,
            )
            .join("")}
        </table>
      </td>
    </tr>

    <!-- DIVIDER -->
    <tr><td style="padding:0 24px;"><div style="height:1px;background:${C.borderSt};"></div></td></tr>

    <!-- BLOCK DETAIL WITH ACTION BRIEFS -->
    <tr>
      <td style="padding:20px 24px 8px;">
        <p style="margin:0;font-family:${C.mono};font-size:11px;letter-spacing:0.12em;color:${C.amber};text-transform:uppercase;">Block Detail · Action Briefs</p>
      </td>
    </tr>
    ${blockKeys.map((key) => blockRow(key, blockScores[key], result.tier, true, answers, result)).join("")}

    <!-- CALL PREP -->
    <tr>
      <td style="padding:20px 24px 0;">
        <p style="margin:0 0 12px;font-family:${C.mono};font-size:11px;letter-spacing:0.12em;color:${C.amber};text-transform:uppercase;">Call Prep · 5 Tailored Questions</p>
        <p style="margin:0 0 12px;font-family:${C.sans};font-size:12px;color:${C.body};line-height:1.6;font-style:italic;">
          These questions are specific to this submission's answer pattern.
          Open with Q1, then let the conversation guide depth.
        </p>
        ${callPrepQuestions
          .map(
            (q, i) => `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
          <tr>
            <td style="background:rgba(0,229,255,0.03);border:1px solid ${C.borderSt};border-radius:4px;padding:12px 14px;">
              <p style="margin:0 0 2px;font-family:${C.mono};font-size:10px;color:${C.dim};letter-spacing:0.08em;">Q${i + 1}</p>
              <p style="margin:0;font-family:${C.sans};font-size:13px;color:${C.white};line-height:1.6;">${q}</p>
            </td>
          </tr>
        </table>`,
          )
          .join("")}
      </td>
    </tr>

    <!-- RAW ANSWERS -->
    <tr>
      <td style="padding:20px 24px 0;">
        <p style="margin:0 0 12px;font-family:${C.mono};font-size:11px;letter-spacing:0.12em;color:${C.amber};text-transform:uppercase;">Raw Answers</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.borderSt};border-radius:6px;">
          <tr>
            <td style="padding:8px 10px;font-family:${C.mono};font-size:10px;color:${C.dim};border-bottom:1px solid ${C.borderSt};text-transform:uppercase;letter-spacing:0.08em;">ID</td>
            <td style="padding:8px 10px;font-family:${C.mono};font-size:10px;color:${C.dim};border-bottom:1px solid ${C.borderSt};text-transform:uppercase;letter-spacing:0.08em;">Question</td>
            <td style="padding:8px 10px;font-family:${C.mono};font-size:10px;color:${C.dim};border-bottom:1px solid ${C.borderSt};text-transform:uppercase;letter-spacing:0.08em;text-align:right;">Answer</td>
          </tr>
          ${rawAnswerRows}
        </table>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="background:${C.amberBg};padding:16px 24px;margin-top:24px;border-top:1px solid ${C.amber};">
        <p style="margin:0;font-family:${C.mono};font-size:10px;color:${C.amber};">[INTERNAL] MaCh2.Cloud · Platform Compass · chris@mach2.cloud</p>
      </td>
    </tr>`;

  return emailWrapper(body, C.bg);
}

// ─────────────────────────────────────────────────────────────────────────────
// CALL PREP QUESTION BUILDER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate 5 tailored call prep questions based on the specific answer pattern.
 * @param {Object} answers
 * @param {Object} result
 * @param {string} fullName
 * @param {string} stage
 * @returns {string[]}
 */
function buildCallPrepQuestions(answers, result, fullName, stage) {
  const qs = [];
  const first = fullName.split(" ")[0] || "you";

  // Q1: Opening — calibrate the gap between self-assessment and reality
  const q1Score = parseInt(String(answers.q1 ?? 3), 10);
  if (q1Score <= 2) {
    qs.push(
      `${first}, you mentioned your team spends most of its time firefighting the platform rather than shipping features. If you had to put a number on it — what percentage of sprint capacity is going to platform maintenance right now?`,
    );
  } else if (q1Score === 3) {
    qs.push(
      `You described the split between platform firefighting and feature work as roughly equal. Has that ratio improved, stayed the same, or got worse over the past two quarters?`,
    );
  } else {
    qs.push(
      `You're shipping mostly features right now — what's the one architectural decision from the build-fast phase that you know will become a problem as you scale past your current load?`,
    );
  }

  // Q2: AI gap or AI maturity angle
  if (result.highGap) {
    qs.push(
      `Your roadmap operates at AI Level ${result.aiLevel} but your infrastructure is set up for Level ${result.aiInfra + 1}. Walk me through what would happen to your platform if your primary AI provider had a 4-hour outage tomorrow morning.`,
    );
  } else {
    const q9 = parseInt(String(answers.q9 ?? 1), 10);
    qs.push(
      `You're at AI Level ${q9} today. Where do you expect to be in 12 months — and what infrastructure work is already planned to support that move?`,
    );
  }

  // Q3: Ownership and governance
  const q8 = String(answers.q8 ?? "P").toUpperCase();
  if (q8 === "N") {
    qs.push(
      `You indicated there is no clear owner for architectural decisions right now. When a decision gets made — who actually makes the call, and what happens when two teams disagree?`,
    );
  } else {
    qs.push(
      `You have some architectural ownership in place. How does that work under pressure — when a production incident needs an infrastructure decision in under an hour, what's the escalation path?`,
    );
  }

  // Q4: Sovereignty / lock-in
  if (result.lowSov) {
    qs.push(
      `Both your provider independence and open standards scores came back low — you're deeply tied to your current vendor stack. Has this come up in any board or investor conversations yet? And what's your current thinking on how to address it before ${stage === "Series B" ? "your next raise" : "Series B"}?`,
    );
  } else {
    const q11 = parseInt(String(answers.q11 ?? 3), 10);
    if (q11 <= 3) {
      qs.push(
        `If your primary cloud provider raised prices 3× tomorrow, how long would a migration realistically take — and have you ever modelled that cost?`,
      );
    } else {
      qs.push(
        `Your cloud sovereignty scores are solid. Tell me about the abstraction or architecture decision that gave you that flexibility — that's often the most replicable thing across teams.`,
      );
    }
  }

  // Q5: Recommendation anchoring
  qs.push(
    `Based on everything you've shared — if we had 90 days and a clear mandate, what's the one architectural problem that, if fixed, would unlock the most velocity for your team right now?`,
  );

  return qs;
}
