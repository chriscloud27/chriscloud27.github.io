import { notFound } from "next/navigation";
import { GO_LINKS } from "@/lib/go-links";

export async function generateStaticParams() {
  return Object.keys(GO_LINKS).map((slug) => ({ slug }));
}

export default async function GoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = GO_LINKS[slug];

  if (!destination) notFound();

  // Inline script runs synchronously — injects utm_source=mach2.cloud by rule,
  // then merges any additional query params forwarded from the share URL.
  // e.g. mach2.cloud/go/waf2p?utm_medium=social correctly adds both utm_source and utm_medium.
  const redirectScript = `
(function() {
  var dest = ${JSON.stringify(destination)};
  var url = new URL(dest);
  // Always set utm_source — the canonical referral rule for all go-links.
  if (!url.searchParams.has('utm_source')) {
    url.searchParams.set('utm_source', 'mach2.cloud');
  }
  // Forward any additional params from the share URL (e.g. utm_medium, utm_campaign).
  var incoming = new URLSearchParams(window.location.search);
  incoming.forEach(function(v, k) { url.searchParams.set(k, v); });
  window.location.replace(url.toString());
})();
`.trim();

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        {/* Fallback for no-JS: meta refresh in body is widely supported as a last resort */}
        {/* UTM params are not forwarded in no-JS environments — acceptable trade-off */}
        <meta httpEquiv="refresh" content={`0; url=${destination}`} />
      </noscript>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: "1rem",
          color: "#1A1A1A",
        }}
      >
        <p style={{ fontSize: "1.1rem", margin: 0 }}>Redirecting…</p>
        <a href={destination} style={{ color: "#00E5FF", fontSize: "0.9rem" }}>
          Click here if not redirected automatically
        </a>
      </div>
    </>
  );
}
