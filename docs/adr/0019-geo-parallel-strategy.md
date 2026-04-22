Title: ADR-0019: Generative Engine Optimization (GEO) as a Parallel Strategy to SEO

Status: accepted

Date: 2026-04-22

## Context

Traditional SEO targets Google and Bing via crawlability, keyword ranking, and backlinks. As of 2025–2026, a growing share of B2B service discovery happens through AI-powered answer engines: ChatGPT, Perplexity, Claude, and Gemini. These engines synthesize answers from indexed content rather than returning a ranked list of links.

GEO (Generative Engine Optimization) is a distinct discipline: the goal is not to rank for a keyword but to be cited as a source in an AI-generated answer. The mechanics differ from SEO in several ways:

- AI citation depends on authority signals (structured data, clear E-E-A-T, consistent identity) rather than backlink volume alone.
- AI indexing pipelines have 2–6 week latency from content publication to citation — unlike Google which can surface new content within hours.
- There is no "GEO Search Console" — citation visibility must be measured manually via prompt-based testing.
- Some AI crawlers were historically blocked by default `robots.txt` rules; explicit allowlisting is required (see ADR-0014).

Two approaches were considered:

**Option A — SEO only:** Invest exclusively in Google/Bing ranking. Simpler, measurable via GSC. Misses the AI answer engine channel that the ICP (engineering leaders, CTOs) increasingly uses for vendor discovery.

**Option B — GEO as parallel track:** Implement GEO-specific assets (`llms.txt`, AI crawler allowlist, structured data, topical authority content) alongside traditional SEO. Requires a separate monitoring protocol since GEO metrics are not available in GSC.

Given the site's positioning as an AI-native architecture practice, operating without a GEO strategy would be inconsistent with the brand and would forfeit a high-value discovery channel for the ICP.

## Decision

We treat GEO as a parallel, peer strategy to SEO — neither subordinate nor a replacement. GEO-specific implementations include `llms.txt` (ADR-0018), explicit AI crawler allowlisting (ADR-0014), structured data authority signals (ADR-0012), and a monthly citation measurement protocol documented in `GEO_BASELINE_TEST_RESULTS_WEEK0.md`.

## Consequences

- Content quality and authority signals (clear authorship, consistent structured data, E-E-A-T) serve both SEO and GEO — they are not in conflict.
- GEO metrics (citation count, quote accuracy, brand mention position) require a separate tracking method. They do not appear in Google Search Console or Analytics.
- Blog content strategy must consider "AI citability" as a success criterion alongside keyword ranking — clear factual statements, named frameworks (WAF++), and specific ICP pain descriptions are more citable than generic advisory prose.
- GEO timelines are slower to measure than SEO. Expect 4–8 weeks between publishing content and first citation appearance in AI engines.
