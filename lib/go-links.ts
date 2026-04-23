/**
 * Go-Link Registry — single source of truth for all /go/* relay links.
 *
 * Keys   : slug used in mach2.cloud/go/<slug>
 * Values : bare destination URL (no UTM params — append those at share time)
 *
 * UTM usage:
 *   mach2.cloud/go/geo-validator?utm_source=linkedin&utm_medium=social&utm_campaign=geo-series&utm_content=p1
 *   All query params are forwarded transparently to the destination.
 */
export const GO_LINKS: Record<string, string> = {
  "geo-validator":
    "https://engine.litzki-systems.org/#https://litzki-systems.com/sovp-full-validator",
  "sovp-audit": "https://litzki-systems.com/sovp-full-validator",
  waf2p: "https://waf2p.dev/",
  wafpass: "https://waf2p.dev/wafpass/",
  "wafpass-tool": "https://waf2p.dev/pass/",
  "wedding-invitation": "https://maria-chris.vercel.app/#rsvp",
};

export type GoSlug = keyof typeof GO_LINKS;
