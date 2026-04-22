Title: ADR-0020: SOVP Audit Framework as the SEO Health Evaluation Standard

Status: accepted

Date: 2026-04-22

## Context

SEO health can be measured by many tools (Lighthouse, Ahrefs, Semrush, manual checklist). Each produces different scores, focuses on different dimensions, and uses different grading scales. Without a consistent standard, it is impossible to compare site health over time or know whether a change improved things.

The SOVP (Sovereign Validation Protocol) was adopted as the canonical SEO audit standard. SOVP provides deterministic scoring across 7 dimensions:

1. META — title tags, meta descriptions, Open Graph, canonical tags
2. LINKS — internal linking structure, rel attributes
3. SCHEMA — schema.org structured data coverage and accuracy
4. SECURITY-HEADERS — HTTP security header coverage
5. PERFORMANCE — Core Web Vitals, image optimisation, font loading
6. MOBILE — responsive layout, touch target sizes
7. AI Signal Discovery (D1–D4 layers) — AI engine indexing signals, `llms.txt`, citation authority

The baseline SOVP score was measured at 79% prior to the GEO/SEO implementation work. The target is 90%.

Two measurement approaches were compared:

**Option A — Lighthouse-only:** Free, automated, well-known. Covers performance and accessibility well but does not cover schema accuracy, AI signals, or security headers meaningfully. Cannot track GEO health.

**Option B — SOVP:** Deterministic, multi-dimensional, covers AI signals as a first-class audit layer. Requires manual execution for some layers but provides a comparable score across audit runs.

SOVP was chosen because it aligns with the AI-native positioning of the site — no purely technical SEO tool covers GEO health as a peer dimension.

## Decision

We use the SOVP framework as the canonical SEO and GEO health evaluation standard. Audit results are recorded in `docs/SOVP-AUDIT-FIXES.md`. The current baseline score is 79%; the target is ≥90%.

## Consequences

- New features and content changes should be evaluated against SOVP criteria, particularly the SCHEMA and AI Signal dimensions.
- `scripts/check-seo.mjs` automates a subset of SOVP checks — it does not replace a full SOVP audit.
- The SOVP score gap (79% → 90%) has a documented fix plan in `docs/SOVP-AUDIT-FIXES.md` — prioritise P0 fixes before P1/P2 items.
- Security header failures (SECURITY-HEADERS dimension at 14%) are a known platform constraint blocked on Cloudflare proxy adoption (see ADR-0008).
- If the SOVP specification changes, re-calibrate the baseline score before drawing trend comparisons.
