Title: ADR-0005: MDX for Slide Deck Content Authoring

Status: accepted

Date: 2026-04-22

## Context

The site hosts presentation slide decks (pitch decks, client presentations) as web pages under `app/slides/`. Each deck has 7–9 slides with rich content: headlines, bullet lists, diagrams, code snippets, and brand-styled callouts. The content needs to be maintainable by a non-developer author.

Two authoring approaches were considered:

**Option A — Hardcoded React components:** Each slide is a `.tsx` file with JSX. Full TypeScript type safety, full Tailwind class access, and co-location with layout logic. Drawback: changing copy (a headline, a bullet point) requires editing JSX, understanding component structure, and running a build. Non-technical authors cannot update content without a developer.

**Option B — MDX files imported as React components:** Slide content is written in `.mdx` files (`content/slides/<deck>/<number>-<name>.mdx`) and imported into the deck's `page.tsx`. MDX is Markdown with JSX support — authors write natural prose with headers and lists, and can drop in custom components for branded callouts. The slide shell (layout, animations, brand chrome) lives in the `.tsx` page; content lives in MDX.

MDX was chosen because it cleanly separates slide content from slide chrome: the deck's `page.tsx` owns the layout and styling; the `.mdx` files own the words and structure. This makes copy iterations fast — changing a bullet point is a markdown edit, not a JSX edit.

`@next/mdx` is already integrated in `next.config.ts` alongside `next-intl`, enabling `.mdx` files as page extensions and as importable React components.

## Decision

Slide deck content is authored as MDX files under `content/slides/<deck-name>/`, imported as React components by the deck's `app/slides/<deck-name>/page.tsx`. The slide layout and brand styling live in the page component; the text content lives in MDX.

## Consequences

- `pageExtensions` in `next.config.ts` includes `"mdx"` — MDX files can be used as both pages and importable components across the app.
- `mdx-components.tsx` at the root defines the global MDX component mapping (e.g. `h1` → branded heading component). Changes here affect all MDX content globally.
- Slide MDX files do not have frontmatter — metadata (title, description) is defined in the deck's `page.tsx` via `generateMetadata()`.
- Adding a new slide to a deck requires creating a new `.mdx` file and adding an import in the deck's `page.tsx`. There is no auto-discovery.
- MDX slides are outside the `app/[locale]/` locale routing tree — slide content is not translated. If localized slides are needed, a new routing strategy is required.
- The slides route (`app/slides/`) is intentionally separate from the localized content routes (`app/[locale]/`) — slides are presentation artifacts, not marketing pages.
