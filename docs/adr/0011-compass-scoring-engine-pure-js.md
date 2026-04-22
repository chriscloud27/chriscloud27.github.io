Title: ADR-0011: Platform Compass as a Framework-Agnostic Pure-JS Scoring Engine

Status: accepted

Date: 2026-04-22

## Context

Platform Compass is a 14-question diagnostic survey that scores a company's platform maturity across five pillars and produces a tiered result (fragile → scaling → efficient → advanced → AI-native). The scoring logic and report generation needed to run in two places: inside a Next.js React component (client-side preview) and inside an n8n webhook handler (server-side email generation).

Two implementation approaches were considered:

**Option A — React-coupled scoring:** Scoring logic lives inside React components or hooks. Clean DX within Next.js but impossible to reuse in n8n or other server environments without bundling React.

**Option B — Framework-agnostic pure JS modules:** Scoring and report generation live in plain `.js` files (`lib/compassEngine.js`, `lib/compassReports.js`) with no imports from React, Next.js, or any UI framework. Importable anywhere: React Client Components, Next.js API routes, and non-JS runtimes via the same webhook endpoint.

Because the canonical report delivery is email (HTML sent by n8n), and email clients strip external CSS, the report generator must produce self-contained inline-style HTML. This further reinforced the pure-JS approach — no React Server Components, no Tailwind classes.

## Decision

We implement the Compass scoring engine and report builder as pure JavaScript modules (`lib/compassEngine.js`, `lib/compassReports.js`) with no framework dependencies. They are imported by both the React client component (`components/compass/CompassTerminal.tsx`) and the server-side webhook handler.

## Consequences

- Scoring logic must remain in `.js` (not `.tsx`) to prevent accidental React imports.
- The scoring algorithm (question types, pillar mapping, tier thresholds) is the single source of truth — do not duplicate logic in the React component or in n8n workflow nodes.
- Report HTML uses only inline `style` attributes and `<style>` blocks — no Tailwind, no external CSS, no web fonts. This is required for email client compatibility (Gmail, Outlook, Apple Mail).
- Changes to scoring thresholds or tier definitions must be validated end-to-end by running `scripts/test-compass-webhook.mjs` against the live webhook before deploying.
- Stage-adjusted scoring (seed / Series A / Series B) is baked into `compassEngine.js` — question weights vary by company stage, which must be documented if the stage options change.
