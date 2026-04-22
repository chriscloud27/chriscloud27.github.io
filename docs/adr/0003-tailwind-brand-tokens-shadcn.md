Title: ADR-0003: Tailwind CSS Brand Token System with shadcn/ui Component Layer

Status: accepted

Date: 2026-04-22

## Context

The site requires a design system that enforces a strict brand palette (Deep Tech Blue, Electric Cyan, Graphite, White) and typography (Inter/IBM Plex Sans for body, JetBrains Mono for technical accents) without depending on a visual design tool like Figma as the source of truth.

Two approaches were considered:

**Option A — CSS custom properties in `globals.css`:** Brand tokens defined as CSS variables, referenced in component styles. Decoupled from Tailwind — components can use raw CSS variables. Verbose and requires manual class name management.

**Option B — Tailwind theme extension with shadcn/ui semantic layer:** Brand colors defined in `tailwind.config.js` as named tokens (`deep-blue`, `electric-cyan`, `graphite`). shadcn/ui semantic tokens (`primary`, `background`, `foreground`, etc.) defined as `hsl(var(--...))` CSS variables that map to the brand palette. Components generated via the shadcn/ui CLI inherit the token system automatically and can be customised without breaking brand consistency.

Option B was chosen because it makes the brand palette a first-class part of the Tailwind utility class system (`bg-deep-blue`, `text-electric-cyan`) while also providing the shadcn/ui semantic layer for UI component composition. The two layers coexist: brand tokens for bespoke sections, semantic tokens for UI primitives.

## Decision

Brand colors and typography are defined as named tokens in `tailwind.config.js` and are the sole source of truth for design values in component code. shadcn/ui is integrated via `components.json` with the `@/components/ui` alias and RSC enabled. New UI primitives should be added via the shadcn/ui CLI rather than built from scratch.

## Consequences

- Do not hardcode hex values in component files — always use Tailwind token classes (`text-electric-cyan`, not `style={{ color: '#00E5FF' }}`). Exception: email reports in `compassReports.js` require inline hex values for email client compatibility (see ADR-0015).
- shadcn/ui components live in `components/ui/` — do not modify them directly; customise via CSS variable overrides in `globals.css` or by extending the Tailwind theme.
- Adding a new brand colour requires updating `tailwind.config.js` and documenting it in `brand/selling-personal-brand-colors.md`.
- The custom font stack (Syne, Space Grotesk, JetBrains Mono) is loaded via Next.js `next/font` — do not import fonts via `<link>` tags or `@import` in CSS.
- `darkMode: ["class"]` enables opt-in dark mode via a class on the root element — the site currently uses deep-blue as its dark surface and does not toggle themes, but the infrastructure is in place.
