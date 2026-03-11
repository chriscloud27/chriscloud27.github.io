/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand palette ──────────────────────────────────────────────
        'deep-blue':     '#0B1F3A', // primary surface
        'deep-blue-mid': '#0D2447', // alternate dark surface
        'electric-cyan': '#00E5FF', // accent — use sparingly
        'graphite':      '#1A1A1A', // body text on light bg
        'grey-subtle':   '#F4F6F9', // alternate section bg
        'grey-mid':      '#8A9BB0', // muted text, labels
        'grey-text':     '#374151', // secondary body text
        'grey-300':      '#C8D4E3', // light text on dark bg
        'grey-700':      '#4A5A72', // dimmer text on dark bg

        // ── shadcn/ui semantic tokens ──────────────────────────────────
        border:      'hsl(var(--border))',
        input:       'hsl(var(--input))',
        ring:        'hsl(var(--ring))',
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },

      fontFamily: {
        // ── Brand type scale ───────────────────────────────────────────
        display: ['Syne', 'sans-serif'],           // headings, display
        body:    ['Space Grotesk', 'sans-serif'],  // body, UI
        mono:    ['JetBrains Mono', 'monospace'],  // labels, code, tags
      },

      maxWidth: {
        content: '1440px', // full-width section cap
        text:    '680px',  // prose / body copy
        lead:    '720px',  // lead paragraphs
        site:    '1100px', // legacy container width
      },

      borderRadius: {
        tag:     '4px',  // tags, chips
        btn:     '8px',  // buttons
        card:    '12px', // standard cards
        feature: '16px', // feature/highlight cards
      },

      boxShadow: {
        cyan: '0 0 24px rgba(0,229,255,0.15)',
      },
    },
  },
  plugins: [],
}
