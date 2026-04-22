Title: ADR-0013: Google Consent Mode V2 with Default-Deny and Custom Event Opt-In

Status: accepted

Date: 2026-04-22

## Context

The site targets EU visitors and must comply with GDPR and ePrivacy requirements. Google Tag Manager (GTM) and Google Analytics (GA4) are used for analytics. Two consent architectures were considered:

**Option A — Consent after page load:** GTM fires immediately; consent banner appears; analytics fires retroactively on consent. Simpler to implement but legally non-compliant in stricter EU jurisdictions — data is collected before consent is granted.

**Option B — Consent Mode V2 with default-deny:** GTM is loaded but all tracking categories are denied by default via `gtag('consent', 'default', {...})`. No analytics data is sent until the user explicitly opts in. Consent is signalled by dispatching a custom DOM event (`mach2_consent_update`) that the GTM consent initialization script listens for and then calls `gtag('consent', 'update', {...})`.

Option B was chosen because it is compliant with GDPR's requirement for prior consent, compatible with Google's Consent Mode V2 modelling, and keeps the consent logic decoupled from the GTM container configuration — GTM tags check consent state natively without custom triggers per tag.

Vercel preview deployments have a separate protection: `isProductionHost()` in `app/robots.ts` returns false for non-`mach2.cloud` origins, blocking indexing entirely. This prevents preview analytics noise from polluting production GA4 data.

## Decision

We implement Google Consent Mode V2 with all categories denied by default in `app/[locale]/layout.tsx`. Analytics fires only after the user opts in, signalled via the `mach2_consent_update` custom event dispatched by `components/CookieConsent.tsx`. The event name and cookie name are defined in `SITE_CONFIG.seo.consent` (see ADR-0012).

## Consequences

- GTM must be configured to use Consent Mode V2 triggers — do not add GA4 tags that fire unconditionally.
- `components/CookieConsent.tsx` must dispatch `mach2_consent_update` with the correct payload shape that the layout script expects. Changing the event name requires updating both files simultaneously.
- Users who reject consent will have modelled conversion data only — not measured. This is expected and compliant.
- The consent cookie (`mach2_consent`) is checked on page load to restore prior consent without re-showing the banner.
- Vercel preview environments never send analytics regardless of consent — `VERCEL_ENV !== "preview"` guards are in `app/robots.ts` and should be extended to any future environment-specific tracking logic.
