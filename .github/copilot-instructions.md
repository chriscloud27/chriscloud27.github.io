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

## Next.js Async Params (App Router)

For layouts and pages under `app/[locale]/`, always use async function signatures and treat `params` as a Promise:

```ts
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // ...
}
```

## ADR Conventions

- Canonical ADR documentation lives in `docs/adr/`.
- Use `docs/adr/0000-template.md` for new ADRs.
- Broader architecture context lives in `docs/MULTI-PROJECT-SETUP.md`.
- ADRs are decision-level only: one file per architecture decision.
- Write an ADR when a decision changes overall architecture, selects a major technology or platform, establishes a repo-wide pattern, or rejects a plausible alternative that should remain documented.
- Do not write ADRs for implementation details, bug fixes, or obvious code-level decisions.
- Use the next available four-digit number, for example `0001-title.md`.
- Allowed status values are `proposed`, `accepted`, `deprecated`, and `superseded by ADR-XXXX`.
