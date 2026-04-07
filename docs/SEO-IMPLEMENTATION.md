# Google Analytics / Tag Manager Implementation

This document explains how Google Analytics is integrated into the FairUp
landing site and how to make changes or extend the setup.

## Overview

- The project uses **Google Tag Manager (GTM)** to load all analytics tags
  (GA4, conversion pixels, etc.).
- No native `gtag` or `analytics.js` code exists in the React components.
- The GTM container ID is `GTM-M7VZPNZG` and it is injected in the
  per-locale root layout (`src/app/[locale]/layout.tsx`).
- Consent mode is enabled and wired to the custom cookie consent component.

## Key files

- `src/app/[locale]/layout.tsx` – central location where the GTM snippet and
  consent helpers are written to the page head/body. Edits here affect all
  localized pages.
- `src/app/components/cookie-consent.tsx` – component responsible for asking
  users and updating the `fairup_consent` cookie. Consent changes push
  events to `dataLayer`.

## How it works

1. Layout script creates `window.dataLayer` and pushes `default_consent` and
   other configuration settings.
2. When consent is stored/updated (via the cookie-consent component), a
   `fairup_consent_update` event is dispatched and the layout helper picks it
   up to notify GTM (`dataLayer.push({ event: 'update_consent', ... })`).
3. GTM container loads asynchronously and listens to the dataLayer events. It
   contains all GA4 tags, remarketing, etc. The actual analytics IDs (such as
   `G-XXXXXXXXXX`) are configured inside the GTM web interface.
4. A `<noscript>` iframe is included for browsers with JavaScript disabled.

## Adding or changing analytics tags

1. Open the GTM container at
   `https://tagmanager.google.com/#/container/accounts/.../containers/GTM-M7VZPNZG`.
2. Add/update tags, triggers, and variables as needed.
3. Publish the container when finished.

### Consent mode considerations

- The layout script uses Google Consent Mode V2, setting defaults to
  `denied` for all storage categories except `security_storage`.
- The GTM container should respect consent signals coming from the
  `update_consent` event; this is usually handled by the built-in
  Consent Overview in GTM.

## Testing locally

1. Run `npm run dev` to start the Next.js frontend.
2. Open the site in the browser and use the `Preview` mode in GTM to verify
   that dataLayer events are firing correctly.
3. Clear cookies or use incognito to simulate first-time visitors.
4. Use browser devtools network/console to ensure the GTM script loads and the
   `dataLayer` contains expected events.

## Notes

- Do **not** hard-code any analytics measurement IDs in the repo; those belong
  in GTM.
- Any modifications to `layout.tsx` should preserve the consent helper
  functions and GTM initialization snippet.
- When adding new pages or components, simply rely on `dataLayer.push` from
  within React code if custom events are needed. For example:
  ```tsx
  useEffect(() => {
    window.dataLayer?.push({ event: "myCustomEvent", category: "foo" });
  }, []);
  ```

That’s all you need to know to implement or update Google Analytics in this
project.
