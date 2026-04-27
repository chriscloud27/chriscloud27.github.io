/**
 * Go-Link Registry — single source of truth for all /go/* relay links.
 *
 * Keys   : slug used in mach2.cloud/go/<slug>
 * Values : bare destination URL — no UTM params here.
 *
 * utm_source=mach2.cloud is injected automatically at redirect time.
 * Additional params can still be appended at share time and are forwarded transparently:
 *   mach2.cloud/go/geo-validator?utm_medium=social&utm_campaign=sovp-series&utm_content=p1
 */
export const GO_LINKS: Record<string, string> = {
  "sovp-audit-quick": "https://validator.litzki-systems.com",
  "sovp-audit-full": "https://litzki-systems.com/sovp-full-validator",
  waf2p: "https://waf2p.dev",
  wafpass: "https://waf2p.dev/wafpass/",
  "wafpass-tool": "https://waf2p.dev/pass/",
  "wedding-invitation": "https://maria-chris.vercel.app/#rsvp",
  "cv-us-rr": "https://mach2.cloud/CV-US_CW-2026-04-RR.pdf",
};

export type GoSlug = keyof typeof GO_LINKS;

// Campain SOVP / Thorsten Litki
// mach2.cloud/go/sovp-audit-quick?utm_medium=social&utm_campaign=sovp-series&utm_content=p1
