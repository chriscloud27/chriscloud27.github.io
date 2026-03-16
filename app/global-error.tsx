'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body
        style={{
          background: '#0B1F3A',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'Inter, sans-serif',
          gap: '24px',
        }}
      >
        <h2 style={{ margin: 0 }}>Something went wrong.</h2>
        <button
          onClick={() => reset()}
          style={{
            background: '#00E5FF',
            color: '#0B1F3A',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
