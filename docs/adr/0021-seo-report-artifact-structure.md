Title: ADR-0021: Timestamped SEO Report Artifacts with Stable Baseline

Status: accepted

Date: 2026-04-22

## Context

The `scripts/check-seo.mjs` script generates SEO audit output that must be stored for historical comparison. Without a consistent storage convention, reports accumulate in unpredictable locations, baselines drift, and trend analysis is impossible.

Two storage patterns were considered:

**Option A — Overwrite a single file:** Store the latest report as `seo-report.json` at the repo root or a fixed path. Simple but destroys history — no way to compare current vs. previous audit.

**Option B — Timestamped directories with a stable baseline:** Each audit run writes output to `reports/seo/<ISO-timestamp>/`. A canonical baseline file lives at `reports/seo/baseline/seo-baseline.json` and is updated deliberately (not automatically overwritten). New runs are compared against this baseline to detect regressions.

Option B was chosen because it enables progress tracking over time, identifies regressions immediately (new score < baseline), and keeps the baseline as a deliberate human artifact rather than an accidental overwrite.

The rule against root-level SEO artifact files (`seo-snapshot.json`, `seo-report.json`, `seo-baseline.json` at root) was established to prevent tooling from creating clutter that is difficult to track via `.gitignore`.

## Decision

SEO audit output from `scripts/check-seo.mjs` is written to `reports/seo/<ISO-timestamp>/`. The canonical baseline lives at `reports/seo/baseline/seo-baseline.json`. Root-level SEO artifact files are forbidden. Updating the baseline is a deliberate manual step.

## Consequences

- `reports/seo/` should be committed to the repo (not `.gitignore`'d) so baseline and history are version-controlled.
- Automated CI should not overwrite the baseline file — only a human-reviewed audit can promote a new baseline.
- New SEO tooling must follow this path convention; do not hardcode alternate output paths.
- The canonical SEO workflow documentation lives in `reports/seo/SEO-SUMMARY.md` — if the paths change, that file and `README.md` must both be updated simultaneously.
