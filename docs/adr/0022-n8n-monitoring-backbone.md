Title: ADR-0022: n8n as the SEO/GEO Monitoring Automation Backbone

Status: accepted

Date: 2026-04-22

## Context

Ongoing SEO and GEO health monitoring requires scheduled checks, data aggregation, alerting, and report delivery. Three implementation options were considered:

**Option A — Custom monitoring backend:** Build a dedicated Node.js or Python service, host it, and maintain it. Full control but significant operational overhead and infrastructure cost for a solo practice.

**Option B — Third-party SEO monitoring SaaS (Ahrefs, Semrush alerts):** Ready-made dashboards and alerts. High cost relative to the site's traffic tier; data is opaque (vendor-defined metrics); does not cover GEO monitoring at all.

**Option C — n8n workflow automation:** n8n provides schedule-triggered workflows, HTTP request nodes, Google Sheets integration for data storage, and email/webhook notifications. Workflows are self-documenting (JSON-exportable), reusable, and can be self-hosted or run on n8n.cloud. Zero custom backend code required.

n8n was chosen because it fits the existing automation stack (the Compass webhook also runs through n8n at `flow.mach2.cloud`), requires no additional infrastructure, and produces structured output designed for AI agent consumption.

Four workflows are documented in `N8N_AUTOMATION.md`:

1. Daily SEO coverage check (GSC data → Sheets → alert if impressions drop)
2. Weekly performance report (Core Web Vitals, Lighthouse via PageSpeed API)
3. Schema validation (fetch live pages, validate JSON-LD against schema.org)
4. Monthly GEO baseline prompt test trigger

## Decision

We use n8n (hosted at `flow.mach2.cloud`) as the primary automation backbone for SEO and GEO monitoring. Workflows are documented as copy-paste JSON in `N8N_AUTOMATION.md`. Google Sheets acts as the data store for trend tracking.

## Consequences

- n8n at `flow.mach2.cloud` is a shared infrastructure dependency — it also handles the Compass scoring webhook. Downtime affects both monitoring and the Compass lead feature simultaneously.
- Workflow changes must be exported as JSON and reflected in `N8N_AUTOMATION.md` to stay documented.
- Google Sheets is not a time-series database — for longer-term trend analysis (>12 months), consider migrating data to a structured store.
- The GSC data workflow requires a Google Service Account with Search Console access — this is a manual setup step not captured in CI.
- Monthly GEO baseline testing is a manual step; n8n can trigger a reminder but cannot execute the AI engine queries automatically.
