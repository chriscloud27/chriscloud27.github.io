#!/usr/bin/env node
/**
 * test-compass-webhook.mjs
 *
 * Sends a sample Platform Compass payload to the n8n webhook.
 * Mirrors exactly what CompassTerminal.tsx sends after assessment completion.
 *
 * Usage:
 *   node scripts/test-compass-webhook.mjs
 *   node scripts/test-compass-webhook.mjs --tier fragile
 *   node scripts/test-compass-webhook.mjs --tier scaling
 *   node scripts/test-compass-webhook.mjs --tier accelerating
 *   node scripts/test-compass-webhook.mjs --dry-run
 */

import { scoreAnswers } from "../lib/compassEngine.js";
import {
  buildSimpleReport,
  buildAdvancedReport,
} from "../lib/compassReports.js";

const WEBHOOK_URL = "https://flow.mach2.cloud/webhook/compass";

// ── Sample answer sets (one per tier) ────────────────────────────────────────

const SAMPLE_ANSWERS = {
  /** Fragile: firefighting, no framework, AI chaos, locked in */
  fragile: {
    name_first: "Alex",
    name_family: "Test",
    stage: "b",
    website: "acme.io",
    github: "github.com/acme",
    email: "alex@acme.io",
    q1: 1, // mostly firefighting
    q2: "N", // no architecture framework
    q3: 1, // staging ≠ production
    q4: "N", // no cloud cost visibility
    q5: 1, // legacy MVP infra
    q6: "U", // surprises always
    q7: 1, // local decisions only
    q8: "N", // no architectural owner
    q9: 4, // Level 4 AI (innovators) — high AI ambition
    q10: 0, // but zero AI infra footprint → big gap
    q11: 1, // fully locked in
    q12: "N", // vendor-specific throughout
    q13: 1, // <25% team uses AI tools
    q14: 1, // no one owns AI decisions
  },

  /** Scaling: mixed signals, pressure building */
  scaling: {
    name_first: "Jordan",
    name_family: "Demo",
    stage: "a",
    website: "scaleme.dev",
    github: "github.com/scaleme",
    email: "jordan@scaleme.dev",
    q1: 3, // roughly equal
    q2: "P", // partial framework
    q3: 3, // mostly consistent
    q4: "P", // partial cost visibility
    q5: 3, // partially revisited
    q6: "S", // sometimes surprised
    q7: 3, // some system awareness
    q8: "P", // partial ownership
    q9: 3, // Level 3 AI (agents)
    q10: 2, // multi-model
    q11: 3, // partial flexibility
    q12: "P", // partial open standards
    q13: 2, // 25-50% AI tool usage
    q14: 3, // CTO directly
  },

  /** Accelerating: mature, well-run platform */
  accelerating: {
    name_first: "Sam",
    name_family: "Leader",
    stage: "a",
    website: "platform.io",
    github: "",
    email: "sam@platform.io",
    q1: 5, // mostly feature work
    q2: "Y", // yes, structured framework
    q3: 5, // fully consistent
    q4: "Y", // full cost visibility
    q5: 5, // designed to scale
    q6: "K", // always known
    q7: 5, // whole-system thinking
    q8: "Y", // clear architectural owner
    q9: 3, // Level 3 AI (agents) — realistic
    q10: 3, // multi-provider
    q11: 5, // cloud-agnostic
    q12: "Y", // open standards
    q13: 4, // >75% team uses AI tools
    q14: 5, // dedicated AI/ML lead
  },
};

// ── CLI args ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const tierArg = (() => {
  const i = args.indexOf("--tier");
  return i !== -1 ? args[i + 1] : null;
})();

const tiers = tierArg ? [tierArg] : Object.keys(SAMPLE_ANSWERS);

// ── Send ──────────────────────────────────────────────────────────────────────

for (const tier of tiers) {
  const answers = SAMPLE_ANSWERS[tier];
  if (!answers) {
    console.error(
      `Unknown tier "${tier}". Choose: fragile | scaling | accelerating`,
    );
    process.exit(1);
  }

  const result = scoreAnswers(answers);
  const simple_report_html = buildSimpleReport(answers, result);
  const advanced_report_html = buildAdvancedReport(answers, result);

  const payload = {
    answers,
    result,
    simple_report_html,
    advanced_report_html,
  };

  console.log(`\n${"─".repeat(60)}`);
  console.log(`Tier      : ${result.tier} — ${result.label}`);
  console.log(`Score     : ${result.overall} / 100`);
  console.log(
    `B1-B5     : ${result.b1} · ${result.b2} · ${result.b3} · ${result.b4} · ${result.b5}`,
  );
  console.log(`High gap  : ${result.highGap}`);
  console.log(`Low sov   : ${result.lowSov}`);
  console.log(`Recommend : ${result.recommendation}`);
  console.log(`Recipient : ${answers.email}`);

  if (dryRun) {
    console.log(`\n[dry-run] Payload preview (answers + result):`);
    console.log(JSON.stringify({ answers, result }, null, 2));
    console.log(
      `[dry-run] simple_report_html length  : ${simple_report_html.length} chars`,
    );
    console.log(
      `[dry-run] advanced_report_html length: ${advanced_report_html.length} chars`,
    );
    console.log(`[dry-run] ✓ Skipped HTTP call to ${WEBHOOK_URL}`);
  } else {
    process.stdout.write(`\nPOST → ${WEBHOOK_URL} ... `);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = await res.text().catch(() => "");
      if (res.ok) {
        console.log(`✓ ${res.status} ${res.statusText}`);
        if (text) console.log(`Response: ${text.slice(0, 200)}`);
      } else {
        console.error(`✗ ${res.status} ${res.statusText}`);
        if (text) console.error(`Response: ${text.slice(0, 400)}`);
      }
    } catch (err) {
      console.error(`✗ Network error: ${err.message}`);
    }
  }
}

console.log(`\n${"─".repeat(60)}`);
