Title: ADR-0018: llms.txt for AI Engine Indexing and Citation Permission

Status: accepted

Date: 2026-04-22

## Context

AI-powered search engines (ChatGPT, Perplexity, Claude, Gemini) crawl and index web content, but unlike traditional search engines they have no standardized machine-readable way to know whether a site explicitly permits indexing, training data inclusion, and citation. The `robots.txt` standard addresses crawler access; it does not address training consent or citation encouragement.

The emerging `llms.txt` standard (llmstxt.org) fills this gap: a plain-text file at the root of the domain declaring identity, services, content structure, and explicit permissions for AI consumption. Two approaches were considered:

**Option A — Rely solely on `robots.txt`:** AI crawler allow rules already exist in `app/robots.ts` (see ADR-0014). This signals "crawling allowed" but not "citation encouraged" and provides no identity or service structure for AI context building.

**Option B — Add `public/llms.txt`:** Provides AI engines with a structured summary of the site's identity, services, content URLs, and explicit permissions (indexing allowed, training allowed, citation encouraged). Low effort, high signal value for a site positioning itself in AI-native search.

Because the site's positioning is explicitly AI-native and the target audience (Series A–B SaaS CTOs, engineering leaders) increasingly discovers services through AI search, `llms.txt` is a first-class GEO asset.

## Decision

We maintain a `public/llms.txt` file at the root of the domain that declares the site's identity, service URLs, content structure, and explicit AI permissions (indexing allowed, training data inclusion allowed, citation encouraged) following the llmstxt.org format.

## Consequences

- `llms.txt` must stay in sync with `SITE_CONFIG.seo` — if service URLs or identity data change, both files require updating.
- The file is static (not generated at build time) — changes require a manual commit and deploy.
- Citation encouragement in `llms.txt` does not guarantee AI citation. It is a permission signal, not a ranking mechanism. GEO effectiveness is measured via the baseline protocol documented in `GEO_BASELINE_TEST_RESULTS_WEEK0.md`.
- If the llmstxt.org standard evolves, the format should be revisited against the current version of the spec.
