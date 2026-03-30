"use client";

import { useEffect, useRef } from "react";
import { SendHorizontal } from "lucide-react";
import { scoreAnswers } from "@/lib/compassEngine";
import { buildSimpleReport, buildAdvancedReport } from "@/lib/compassReports";

const TERMINAL_CSS = `
.compass-terminal {
  --cyan:   #00E5FF;
  --cyan-dim:#00b8cc;
  --white:  #FFFFFF;
  --t-bg:   #091828;
  --t-surf: #0B1F3A;
  --t-cyan: #00E5FF;
  --t-body: #a8c0d8;
  --t-dim:  #2d4a65;
  --t-ans:  #e8f4fc;
  --t-warn: #FEBC2E;
  --t-ok:   #28C840;
  --t-err:  #FF5F57;
  --t-blk:  #1e3a55;
  --mono: 'JetBrains Mono', monospace;
  --sans: 'Space Grotesk', sans-serif;
  width: 100%;
}

.compass-terminal .term {
  background: var(--t-surf);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0,229,255,.1);
  font-family: var(--mono);
}

.compass-terminal .tbar {
  background: var(--t-bg);
  padding: 11px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(0,229,255,.06);
}

.compass-terminal .dot { width: 11px; height: 11px; border-radius: 50%; }
.compass-terminal .dr  { background: #FF5F57; }
.compass-terminal .dy  { background: #FEBC2E; }
.compass-terminal .dg  { background: #28C840; }

.compass-terminal .ttitle {
  color: #4a6fa5;
  font-size: 11px;
  letter-spacing: .05em;
  margin: 0 auto;
}

.compass-terminal .tbody {
  padding: 22px 26px 56px;
  min-height: 480px;
}

.compass-terminal .ln {
  font-size: 13px;
  line-height: 1.9;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--t-body);
}
.compass-terminal .ln.cyan { color: var(--t-cyan); }
.compass-terminal .ln.dim  { color: var(--t-dim);  }
.compass-terminal .ln.ans  { color: var(--t-ans);  }
.compass-terminal .ln.warn { color: var(--t-warn); }
.compass-terminal .ln.ok   { color: var(--t-ok);   }
.compass-terminal .ln.err  { color: var(--t-err);  }
.compass-terminal .ln.blk  { font-size: 11px; color: var(--t-blk); letter-spacing: .06em; }

.compass-terminal .inp-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.compass-terminal .caret { color: var(--t-cyan); font-size: 13px; }

.compass-terminal .send-btn {
  display: none;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--t-cyan);
  flex-shrink: 0;
  transition: opacity .15s;
}
.compass-terminal .send-btn:hover { opacity: .7; }

@media (max-width: 900px) {
  .compass-terminal .send-btn { display: flex; }
}

.compass-terminal #ct-ti {
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--t-ans);
  flex: 1;
  caret-color: var(--t-cyan);
}

@keyframes ct-blink { 0%,100%{opacity:1} 50%{opacity:0} }
.compass-terminal .cursor {
  display: inline-block;
  width: 7px; height: 13px;
  background: var(--t-cyan);
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: ct-blink 1s step-end infinite;
}

.compass-terminal .cta-link {
  display: block;
  margin-top: 20px;
  padding: 16px 20px;
  border: 1px solid rgba(0,229,255,.35);
  border-left: 3px solid var(--t-cyan);
  border-radius: 6px;
  background: rgba(0,229,255,.03);
  text-decoration: none;
  cursor: pointer;
  transition: background .15s, border-color .15s;
}
.compass-terminal .cta-link:hover {
  background: rgba(0,229,255,.07);
  border-color: var(--t-cyan);
  border-left-color: var(--t-cyan);
}
.compass-terminal .cta-label {
  display: block;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--t-dim);
  text-transform: uppercase;
  margin-bottom: 6px;
}
.compass-terminal .cta-action {
  display: block;
  font-family: var(--mono);
  font-size: 14px;
  color: var(--t-cyan);
  letter-spacing: 0.04em;
}

.compass-terminal .begin-btn {
  display: inline-block;
  margin-top: 14px;
  padding: 8px 28px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--t-cyan);
  background: transparent;
  border: 1px solid rgba(0,229,255,.35);
  border-radius: 6px;
  cursor: pointer;
  transition: background .15s, border-color .15s;
}
.compass-terminal .begin-btn:hover {
  background: rgba(0,229,255,.08);
  border-color: var(--t-cyan);
}

@media (max-width: 600px) {
  .compass-terminal .tbody  { padding: 16px 18px 40px; }
  .compass-terminal .ttitle { display: none; }
}
`;

const QUESTIONS = [
  {
    id: "name_first",
    block: "setup",
    prompt: "Setup 1/5",
    text: "What's your first name?",
    hint: "Type your first name",
    type: "text",
    labels: [],
  },

  {
    id: "name_family",
    block: "setup",
    prompt: "Setup 2/5",
    text: "And your last name?",
    hint: "Type your last name",
    type: "text",
    labels: [],
  },

  {
    id: "stage",
    block: "setup",
    prompt: "Setup 3/5",
    text: "What funding stage is your company at?",
    hint: "seed · a · b",
    type: "stage",
    labels: ["seed – pre-Series A", "a    – Series A", "b    – Series B"],
  },

  {
    id: "website",
    block: "setup",
    prompt: "Setup 4/5",
    text: "What's your company website?",
    hint: "e.g. acme.com",
    type: "url",
    labels: [],
  },

  {
    id: "github",
    block: "setup",
    prompt: "Setup 5/5",
    text: "GitHub org or repo URL? (optional)",
    hint: "e.g. github.com/acme  or  press Enter to skip",
    type: "opt",
    labels: [],
  },

  {
    id: "q1",
    block: "b1",
    prompt: "Q1 · Engineering velocity",
    text: "When your team ships a feature, what % goes into the feature\nitself vs. firefighting the platform?",
    hint: "1 = mostly firefighting   5 = mostly feature work",
    type: "scale",
    labels: [
      "1 – mostly firefighting",
      "3 – roughly equal",
      "5 – mostly feature work",
    ],
  },

  {
    id: "q2",
    block: "b1",
    prompt: "Q2 · Architecture framework",
    text: "Does your team follow a structured architecture framework –\nlike AWS Well-Architected, Azure WAF, or your own internal standards?",
    hint: "Y · P · N",
    type: "ypn",
    labels: [],
  },

  {
    id: "q3",
    block: "b1",
    prompt: "Q3 · AI production readiness",
    text: "Do your AI features perform under real production load\nthe same way they do in staging or demos?",
    hint: "1 = staging ≠ production   5 = fully consistent",
    type: "scale",
    labels: [
      "1 – staging ≠ production",
      "3 – mostly consistent",
      "5 – fully consistent",
    ],
  },

  {
    id: "q4",
    block: "b1",
    prompt: "Q4 · Cloud cost visibility",
    text: 'If an investor asked "why did cloud costs increase 40% last quarter?"\n– could you answer right now?',
    hint: "Y · P · N",
    type: "ypn",
    labels: [],
  },

  {
    id: "q5",
    block: "b1",
    prompt: "Q5 · Architectural debt",
    text: "How much of your infrastructure was designed for your current\nscale vs. carried from the build-fast phase?",
    hint: "1 = mostly legacy MVP   5 = designed for now",
    type: "scale",
    labels: [
      "1 – built to ship fast",
      "3 – partially revisited",
      "5 – designed to scale",
    ],
  },

  {
    id: "q6",
    block: "b2",
    prompt: "Q6 · System reliability",
    text: "When something breaks in production, is the root cause\na known risk – or does it surprise you?",
    hint: "K = always known   S = sometimes   U = usually a surprise",
    type: "ksu",
    labels: [],
  },

  {
    id: "q7",
    block: "b2",
    prompt: "Q7 · System thinking",
    text: "When your team makes an infrastructure decision, do you think\nabout how it affects the whole product – or does each team\nmostly solve for their own part?",
    hint: "1 = each team for itself   5 = whole-system thinking",
    type: "scale",
    labels: [
      "1 – local decisions only",
      "3 – some system awareness",
      "5 – whole-system thinking",
    ],
  },

  {
    id: "q8",
    block: "b2",
    prompt: "Q8 · Architectural ownership",
    text: "Does your team have a clear owner for architectural decisions –\nor does everyone (and no one) own it?",
    hint: "Y · P · N",
    type: "ypn",
    labels: [],
  },

  {
    id: "q9",
    block: "b3",
    prompt: "Q9 · AI implementation level",
    text: "Which level best describes where your product operates with AI?\n\n  1 · Chatbots      – language tasks\n  2 · Reasoners     – complex multi-step\n  3 · Agents        – autonomous actions\n  4 · Innovators    – novel creative output\n  5 · Organizations – full autonomous ops",
    hint: "Enter 1–5  (OpenAI Five Levels framework · Altman 2024)",
    type: "scale5",
    labels: [],
  },

  {
    id: "q10",
    block: "b3",
    prompt: "Q10 · AI infrastructure footprint",
    text: "How many distinct AI models or providers are integrated\ninto your production platform?",
    hint: "0 = none  1 = one provider  2 = multi-model  3 = multi-provider  4 = custom/fine-tuned",
    type: "scale04",
    labels: [],
  },

  {
    id: "q11",
    block: "b4",
    prompt: "Q11 · Provider independence",
    text: "If your primary cloud provider or AI API raised prices 3×\ntomorrow – how easily could you switch or absorb it?",
    hint: "1 = we would be in serious trouble   5 = we could switch in days",
    type: "scale",
    labels: [
      "1 – fully locked in",
      "3 – partial flexibility",
      "5 – cloud-agnostic",
    ],
  },

  {
    id: "q12",
    block: "b4",
    prompt: "Q12 · Open standards",
    text: "Does your platform use open-source or cloud-agnostic patterns –\nlike Kubernetes, open APIs, or CNCF tools – or does it depend\non vendor-specific services throughout?",
    hint: "Y · P · N",
    type: "ypn",
    labels: [],
  },

  {
    id: "q13",
    block: "b5",
    prompt: "Q13 · Team AI adoption",
    text: "What share of your engineering team actively uses AI tools\nin their daily workflow?",
    hint: "1 = <25%   2 = 25–50%   3 = 50–75%   4 = >75%",
    type: "scale4",
    labels: [
      "1 – less than 25%",
      "2 – 25 to 50%",
      "3 – 50 to 75%",
      "4 – more than 75%",
    ],
  },

  {
    id: "q14",
    block: "b5",
    prompt: "Q14 · AI ownership",
    text: "Who is primarily responsible for AI architecture decisions\nin your team right now?",
    hint: "1 = no one  2 = distributed  3 = CTO  4 = senior eng  5 = dedicated AI/ML lead",
    type: "scale5",
    labels: [
      "1 – no one owns it",
      "2 – distributed / everyone",
      "3 – CTO directly",
      "4 – senior eng alongside product",
      "5 – dedicated AI/ML lead",
    ],
  },

  {
    id: "email",
    block: "submit",
    prompt: "Last step",
    text: "Where should we send your Platform Compass report?",
    hint: "Enter your work email address",
    type: "email",
    labels: [],
  },
];

const BLOCK_LABELS: Record<string, string> = {
  b1: "BLOCK 1 · PLATFORM FOUNDATIONS",
  b2: "BLOCK 2 · RELIABILITY & OWNERSHIP",
  b3: "BLOCK 3 · AI MATURITY",
  b4: "BLOCK 4 · CLOUD SOVEREIGNTY",
  b5: "BLOCK 5 · TEAM & AI USAGE",
};

export default function CompassTerminal() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const out = document.getElementById("ct-out");
    const ir = document.getElementById("ct-ir");
    const ti = document.getElementById("ct-ti") as HTMLInputElement | null;
    const sendBtn = document.getElementById("ct-send-btn");
    const sentinel = document.getElementById("ct-sentinel");
    const termEl = document.getElementById("ct-term");
    if (!out || !ir || !ti || !sentinel || !termEl) return;

    const answers: Record<string, string | number> = {};
    let step = 0;
    let phase = "intro";

    // ── scroll to bottom (real terminal behavior) ─────────────────────
    function scrollBottom() {
      sentinel!.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    // ── output helpers ────────────────────────────────────────────────
    function addLine(
      text: string,
      cls = "",
      delay = 0,
    ): Promise<HTMLDivElement> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const d = document.createElement("div");
          d.className = "ln" + (cls ? " " + cls : "");
          d.textContent = text;
          out!.appendChild(d);
          scrollBottom();
          resolve(d);
        }, delay);
      });
    }
    function blank(delay = 0) {
      return addLine("", "dim", delay);
    }

    // ── block transition ──────────────────────────────────────────────
    function blockTransition(blockId: string) {
      const label = BLOCK_LABELS[blockId];
      if (!label) return;
      addLine("─".repeat(46), "dim");
      addLine("  " + label, "cyan");
      blank();
    }

    // ── show question ─────────────────────────────────────────────────
    function showQuestion(q: (typeof QUESTIONS)[number]) {
      const prevBlock = step > 0 ? QUESTIONS[step - 1].block : null;
      if (q.block !== prevBlock && q.block !== "setup" && q.id !== "email") {
        blockTransition(q.block);
      }
      addLine(q.prompt, "blk");
      addLine(q.text, "cyan");
      if (q.labels && q.labels.length) {
        blank();
        q.labels.forEach((l) => addLine("  " + l, "dim"));
      }
      blank();
      addLine(q.hint, "dim");
      ir!.style.display = "flex";
      scrollBottom();
      ti!.focus();
    }

    // ── validate ──────────────────────────────────────────────────────
    function validate(
      q: (typeof QUESTIONS)[number],
      v: string,
    ): string | number | null {
      v = v.trim();
      const t = q.type;
      if (t === "text") return v.length > 0 ? v : null;
      if (t === "stage")
        return ["seed", "a", "b"].includes(v.toLowerCase())
          ? v.toLowerCase()
          : null;
      if (t === "url") return v.length > 3 && v.includes(".") ? v : null;
      if (t === "opt") return v;
      if (t === "scale") {
        const n = parseInt(v, 10);
        return n >= 1 && n <= 5 ? n : null;
      }
      if (t === "scale5") {
        const n = parseInt(v, 10);
        return n >= 1 && n <= 5 ? n : null;
      }
      if (t === "scale04") {
        const n = parseInt(v, 10);
        return n >= 0 && n <= 4 ? n : null;
      }
      if (t === "scale4") {
        const n = parseInt(v, 10);
        return n >= 1 && n <= 4 ? n : null;
      }
      if (t === "ypn")
        return ["Y", "P", "N"].includes(v.toUpperCase())
          ? v.toUpperCase()
          : null;
      if (t === "ksu")
        return ["K", "S", "U"].includes(v.toUpperCase())
          ? v.toUpperCase()
          : null;
      if (t === "email")
        return v.includes("@") && v.includes(".") ? v.toLowerCase() : null;
      return null;
    }

    // ── done screen (client-side scoring + full webhook payload) ─────────
    async function showDone() {
      const name = String(answers["name_first"] ?? "there");
      const stages: Record<string, string> = {
        seed: "Seed",
        a: "Series A",
        b: "Series B",
      };
      const sl = stages[String(answers["stage"])] ?? "Series A";

      addLine("─".repeat(46), "dim");
      await addLine("Assessment complete.", "ok");
      await blank();
      await addLine(
        "Processing " +
          name +
          " · " +
          sl +
          " · " +
          String(answers["website"] ?? ""),
        "dim",
        200,
      );
      if (answers["github"] && String(answers["github"]).length > 2)
        await addLine("GitHub context: " + answers["github"], "dim", 300);
      await blank(500);
      await addLine("Running MaCh2 scoring engine...", "dim", 280);
      await blank(420);

      // ── Step 2.5: score client-side (instant, no server round-trip) ──
      const result = scoreAnswers(answers);

      await addLine("  Tier  ·  " + result.label, "cyan", 440);
      await addLine("  Score · " + result.overall + " / 100", "cyan", 500);
      await addLine("  " + result.message, "", 560);
      await blank(620);

      if (result.highGap) {
        await addLine(
          "  Warning · AI ambition outpaces infrastructure maturity",
          "warn",
          660,
        );
        await addLine(
          "  Level " +
            result.aiLevel +
            " AI roadmap on Level " +
            (result.aiInfra + 1) +
            " infrastructure – high risk",
          "warn",
          700,
        );
        await blank(740);
      }
      if (result.lowSov) {
        await addLine(
          "  Sovereignty · High vendor lock-in detected",
          "warn",
          780,
        );
        await addLine(
          "  Provider independence and open standards both flagged",
          "warn",
          820,
        );
        await blank(860);
      }

      await addLine("  Recommended  ·  " + result.recommendation, "warn", 900);
      await blank(960);
      await addLine("Sending your report...", "dim", 1000);

      // ── Fire-and-forget: full payload including both HTML reports ────
      const simpleHtml = buildSimpleReport(answers, result);
      const advancedHtml = buildAdvancedReport(answers, result);

      fetch("https://flow.mach2.cloud/webhook/compass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: { ...answers },
          result,
          simple_report_html: simpleHtml,
          advanced_report_html: advancedHtml,
        }),
      }).catch(() => {
        /* non-blocking */
      });

      await addLine(
        "Report sent to " + String(answers["email"] ?? ""),
        "dim",
        1040,
      );
      await new Promise<void>((r) => setTimeout(r, 1080));

      // Cal.com CTA — label + button
      const label = document.createElement("div");
      label.className = "ln dim";
      label.textContent = "Recommended action";
      out!.appendChild(label);

      const calA = document.createElement("a");
      calA.className = "cta-link";
      calA.href = `/${new URL(window.location.href).pathname.split("/")[1] || "en"}/diagnosis`;
      calA.target = "_blank";
      calA.rel = "noopener noreferrer";
      calA.innerHTML =
        '<span class="cta-label">next step</span>' +
        '<span class="cta-action">→ Book a diagnosis call</span>';
      out!.appendChild(calA);
      scrollBottom();
      phase = "done";
    }

    // ── submit handler ────────────────────────────────────────────────
    async function handleSubmit() {
      const v = ti!.value.trim();
      ti!.value = "";
      ir!.style.display = "none";

      if (phase === "intro") {
        await blank();
        phase = "question";
        step = 0;
        showQuestion(QUESTIONS[step]);
        return;
      }

      if (phase === "question") {
        const q = QUESTIONS[step];
        const parsed = validate(q, v);
        if (parsed === null) {
          addLine("  Invalid input – " + q.hint, "err");
          ir!.style.display = "flex";
          scrollBottom();
          ti!.focus();
          return;
        }
        answers[q.id] = parsed;
        const display = q.type === "opt" && !v ? "(skipped)" : String(parsed);
        addLine("  › " + display, "ans");
        await blank();
        step++;
        if (step < QUESTIONS.length) {
          showQuestion(QUESTIONS[step]);
        } else {
          showDone();
        }
      }
    }

    // ── init ──────────────────────────────────────────────────────────
    async function init() {
      await addLine("Initializing MaCh2 scoring engine...", "dim");
      await blank(100);
      await addLine("Platform Compass", "cyan", 150);
      await addLine(
        "AI-Native Platform Readiness Assessment · MaCh2.Cloud",
        "dim",
        220,
      );
      await blank(300);
      await addLine(
        "4 setup fields · 14 scored questions · 5 assessment blocks",
        "",
        370,
      );
      await addLine("Estimated time: 5 minutes.", "dim", 420);
      await blank(500);
      await addLine(
        "Your personalized report arrives within 24 hours.",
        "dim",
        560,
      );
      await blank(640);
      await new Promise((r) => setTimeout(r, 680));
      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      if (isMobile) {
        // Mobile: show a tappable START button (no physical Enter key)
        const btn = document.createElement("button");
        btn.className = "begin-btn";
        btn.type = "button";
        btn.textContent = "START";
        btn.addEventListener("click", () => {
          btn.remove();
          handleSubmit();
        });
        out!.appendChild(btn);
        scrollBottom();
      } else {
        // Desktop: show keyboard hint
        addLine("press ENTER to start", "dim");
      }
      phase = "intro";
      ir!.style.display = "flex";
      scrollBottom();
      ti!.focus();
    }

    // ── event listeners ───────────────────────────────────────────────
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    }
    function onTermClick() {
      ti!.focus();
    }
    function onSendClick() {
      handleSubmit();
    }

    ti.addEventListener("keydown", onKeydown);
    termEl.addEventListener("click", onTermClick);
    sendBtn?.addEventListener("click", onSendClick);

    init();

    return () => {
      ti.removeEventListener("keydown", onKeydown);
      termEl.removeEventListener("click", onTermClick);
      sendBtn?.removeEventListener("click", onSendClick);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: TERMINAL_CSS }} />
      <div className="compass-terminal">
        <div className="term" id="ct-term">
          <div className="tbar">
            <div className="dot dr" />
            <div className="dot dy" />
            <div className="dot dg" />
            <span className="ttitle">
              platform diagnosis · mach2.cloud · ai-native platform readiness
              assessment
            </span>
          </div>
          <div className="tbody" id="ct-tb">
            <div id="ct-out" />
            <div className="inp-row" id="ct-ir" style={{ display: "none" }}>
              <span className="caret">›</span>
              <input
                id="ct-ti"
                autoComplete="off"
                spellCheck={false}
                aria-label="Assessment input"
              />
              <button
                id="ct-send-btn"
                className="send-btn"
                aria-label="Submit answer"
                type="button"
              >
                <SendHorizontal size={16} strokeWidth={1.5} />
              </button>
            </div>
            <div id="ct-sentinel" />
          </div>
        </div>
      </div>
    </>
  );
}
