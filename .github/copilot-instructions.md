# Copilot Instructions

## SEO Conventions

- Canonical SEO documentation lives in `reports/seo/SEO-SUMMARY.md`.
- Use `scripts/check-seo.mjs` for SEO checks.
- Generated SEO outputs must be written under `reports/seo/<ISO-timestamp>/`.
- Baseline file must live at `reports/seo/baseline/seo-baseline.json` unless explicitly overridden.
- Do not introduce new root-level SEO artifact files such as `seo-snapshot.json`, `seo-report.json`, or `seo-baseline.json`.
- Keep compatibility notes in root `SEO-SUMMARY.md` (pointer file) if canonical SEO docs move.

## Documentation Sync Rules

- If SEO paths or workflow change, update both:
- `reports/seo/SEO-SUMMARY.md`
- `README.md` (SEO reference section)
- Keep examples copy-pasteable and aligned with current paths.
