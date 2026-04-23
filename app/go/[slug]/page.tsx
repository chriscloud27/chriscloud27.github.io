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

  // Inline script runs synchronously — reads window.location.search (UTM params
  // and any other query string) and appends it to the destination before redirecting.
  // This means mach2.cloud/go/geo-validator?utm_content=p1 correctly forwards the
  // utm_content param to the destination URL.
  const redirectScript = `
(function() {
  var dest = ${JSON.stringify(destination)};
  var qs = window.location.search;
  window.location.replace(dest + qs);
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
