// Root-level not-found: rendered outside any locale layout.
// Keep this simple and locale-free; locale-specific 404s are handled
// by app/[locale]/not-found.tsx through the middleware redirect.
import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          background: "#0B1F3A",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          textAlign: "center",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#00E5FF",
              marginBottom: "24px",
            }}
          >
            404 — Not Found
          </p>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 400,
              marginBottom: "20px",
            }}
          >
            This page{" "}
            <em style={{ fontStyle: "italic", color: "#00E5FF" }}>
              doesn&apos;t exist.
            </em>
          </h1>
          <p style={{ color: "#8a9bb0", marginBottom: "32px" }}>
            The page you&apos;re looking for has moved or never existed.
          </p>
          <Link
            href="/en"
            style={{
              display: "inline-block",
              fontFamily: "monospace",
              fontSize: "11.5px",
              letterSpacing: ".07em",
              textTransform: "uppercase",
              background: "#00E5FF",
              color: "#0B1F3A",
              padding: "13px 26px",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
