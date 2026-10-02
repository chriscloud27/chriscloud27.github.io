Title: ADR-0025: Keep Existing Logo Assets Despite BrandBook Rule Conflicts

Status: accepted

Date: 2026-09-29

## Context

A brand audit (triggered while building the `mach2cloud-brand-assistant` Claude skill) compared the shipped logo assets — `public/img/mach2-logo-dark.svg`, `public/img/mach2-logo-light.svg`, `public/img/mach2-favicon.svg` — against the rules stated in `content/output files/MaCh2_BrandBook.html` (v1.0, March 2026), Chapter 03 ("Logo System").

Two concrete conflicts were found:

1. **Effects rule violation.** The BrandBook's hard rule states: "Never add drop shadows, glow effects, or 3D treatments" and "Never recolor (no gradients, tints...)" to the logo. The shipped SVGs use a `linearGradient` on the flame/nose-window elements and `feGaussianBlur`-based glow filters (`flameglow`, `softglow`) on the rocket flame and the AI "window" accent.
2. **Typography mismatch.** The wordmark text inside both SVGs is hardcoded to `IBM Plex Sans` (name) and `IBM Plex Mono` (tagline). The project's typography system was standardized on Syne (display) + Space Grotesk (body) + JetBrains Mono (technical) — see `CLAUDE.md` and the BrandBook Chapter 05 — but the logo was never migrated and still reflects an earlier typeface choice.

Two options were considered:

**Option A — Rebuild the logo assets** to strictly match the current rules (flat fills, no gradients/glow, wordmark re-set in Syne).
**Option B — Keep the existing logo assets as-is**, and instead treat the "no gradient/glow" rule as inapplicable to the logo's internal icon rendering, while documenting the mismatch.

## Decision

Keep the logo assets (`mach2-logo-dark.svg`, `mach2-logo-light.svg`, `mach2-favicon.svg`) unchanged. The gradient/glow treatment on the rocket flame and AI-window is accepted as an intentional visual effect specific to the icon mark — not a violation to fix reactively. No logo rebuild is scheduled as part of this brand audit.

## Consequences

- **The BrandBook's "no gradients, no glow" rule is not strictly true for the shipped logo.** Anyone applying that rule literally (including AI assistants using the `mach2cloud-brand-assistant` skill) must be told this is a known, accepted exception — not a bug to silently "fix" by either rewriting the rule or the asset without checking here first.
- **Typography mismatch remains unresolved.** The logo wordmark still renders in IBM Plex Sans/Mono while the rest of the brand system uses Syne/Space Grotesk/JetBrains Mono. If the logo is ever rebuilt for another reason, re-setting the wordmark in Syne should be included at that time — this ADR does not schedule that work, it only records that the gap exists and is currently accepted.
- If brand consistency audits (manual or AI-assisted) flag the logo for gradients/glow/font mismatch, this ADR is the answer — no further escalation needed unless the decision itself is revisited.
- `docs/adr/README.md` should list this ADR under the same section as other brand/design-system related decisions, if such grouping exists.
