Title: ADR-0017: Keyword Strategy Centralized in lib/keywords.ts

Status: accepted

Date: 2026-04-22

## Context

SEO keyword targeting requires keyword sets to be applied consistently to `generateMetadata()` calls across all page routes. Two implementation approaches were considered:

**Option A — Per-page keyword declarations:** Each page file defines its own `keywords` array inline in `generateMetadata()`. Simple for a single page; produces divergent and untracked keyword strategy as the site grows. A competitor keyword change requires hunting through every page file.

**Option B — Centralized keyword module (`lib/keywords.ts`):** All keyword sets live in one file, organized by page and tier. Page files import the relevant set and pass it to `generateMetadata()`. A keyword strategy change (adding a new Tier 1 target, renaming a phrase) is a single-file edit that propagates to all relevant pages.

`lib/keywords.ts` also serves as documentation: keywords are organized into tiers (Tier 1 = low competition/high intent, target 60–90 days; Tier 2 = medium competition, 3–6 months; Tier 3 = long-term authority) so the strategic intent is visible without reading external SEO docs.

## Decision

All SEO keyword collections are defined in `lib/keywords.ts` grouped by page (GLOBAL_KEYWORDS, HOME_KEYWORDS, BLOG_KEYWORDS, etc.) and annotated by tier. Page files import the relevant export and pass it to `generateMetadata()`. No page file defines its own inline keyword array.

## Consequences

- Adding a new page requires adding a corresponding keyword set to `lib/keywords.ts` before writing the page's `generateMetadata()`.
- `GLOBAL_KEYWORDS` is spread into every page-specific array — changes to GLOBAL_KEYWORDS propagate to all pages automatically. Review the full keyword surface before adding a global keyword.
- Keyword tiers (1/2/3) are documentation only — they are not enforced by code. The tier comments should be updated when strategy decisions change.
- `lib/keywords.ts` is not auto-generated — it is a human-maintained strategy document. Treat it as such: changes should be intentional, not incidental.
