# Analytics & Consent Implementation

GTM + Google Consent Mode V2 integration for mach2.cloud.

## Overview

- **Google Tag Manager** (`GTM-M7VZPNZG`) loads all analytics tags — no native `gtag` code in components
- **Consent Mode V2** defaults all storage to `denied` until the user accepts via the cookie banner
- **Cookie name**: `mach2_consent` — stores the user's consent decision for 1 year
- **GTM container ID** is the only analytics identifier in the repo; GA4 measurement IDs live inside GTM

## Key files

| File                           | Role                                                                              |
| ------------------------------ | --------------------------------------------------------------------------------- |
| `app/[locale]/layout.tsx`      | GTM snippet injection, Consent Mode V2 defaults, security meta tags               |
| `components/CookieConsent.tsx` | Cookie banner UI, reads/writes `mach2_consent`, dispatches `mach2_consent_update` |
| `lib/site-config.ts`           | `SITE_CONFIG.seo.consent` — canonical source for cookie name and event name       |

## How it works

1. `layout.tsx` injects an inline script before GTM that sets all consent signals to `denied` (except `security_storage`)
2. On page load, `CookieConsent.tsx` reads the `mach2_consent` cookie:
   - If present → re-dispatches the stored consent state so GTM picks it up without showing the banner
   - If absent → renders the banner
3. When the user accepts or declines, the component writes `mach2_consent`, dispatches `mach2_consent_update`, and GTM fires `update_consent` via a dataLayer listener in `layout.tsx`
4. GTM loads asynchronously after the consent defaults are established — GA4 and other tags only fire after consent is granted

## Adding or changing analytics tags

Edit inside the GTM container at `https://tagmanager.google.com` using container ID `GTM-M7VZPNZG`. Publish when done. Do not hardcode any measurement IDs in the repo.

## Custom events from React components

```tsx
useEffect(() => {
  window.dataLayer?.push({ event: "myEvent", category: "foo" });
}, []);
```

## Testing

1. `npm run dev` — start local server
2. Open site in incognito (simulates first visit, no existing cookie)
3. Use GTM Preview mode to verify dataLayer events
4. Accept/decline in the banner — confirm `mach2_consent_update` fires in the console

## Security headers

Security headers (`X-Frame-Options`, `Content-Security-Policy`, etc.) are partially set via `<meta http-equiv>` tags in `layout.tsx`. Full header coverage requires a CDN proxy — GitHub Pages does not support HTTP response headers. See `docs/SOVP-AUDIT-FIXES.md` for the complete picture and Cloudflare setup instructions.
