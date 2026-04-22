Title: ADR-0016: Rich Text Translation Tags via defaultTranslationValues in next-intl

Status: accepted

Date: 2026-04-22

## Context

Marketing copy frequently requires inline styled phrases — words or phrases in Electric Cyan for emphasis (`<highlight>`), or bold white text for semantic weight (`<strong>`). Without a pattern for this, two bad alternatives emerge:

**Option A — Hardcode styled spans in message JSON values:** Message values contain raw HTML like `<span class="text-electric-cyan">chaos</span>`. Fragile — Tailwind class names are encoded inside translation strings; a class rename breaks all translations; non-technical translators must not touch the markup.

**Option B — Split messages at styled words:** Each styled phrase becomes its own translation key; components assemble the fragments. Verbose — a three-word phrase with one styled word requires three keys and manual assembly in the component.

**Option C — next-intl rich text tags via `defaultTranslationValues`:** Define `<highlight>` and `<strong>` as global rich text tag renderers in `i18n/request.ts`. Message JSON uses clean XML-style tags: `"headline": "Now your architecture <highlight>is the chaos</highlight>."`. Components call `t.rich('headline')` and receive rendered React elements. Non-technical translators write natural prose with semantic tags, not class names.

Option C provides the cleanest separation: styling is in code (`i18n/request.ts`), content is in JSON (`messages/*.json`), and translators only deal with human-readable tags.

## Decision

We define two global rich text tags in `i18n/request.ts` via `defaultTranslationValues`: `<highlight>` renders as `<span className="text-electric-cyan">` and `<strong>` renders as `<strong className="font-semibold text-white">`. All message keys that include styled phrases use these tags. Components use `t.rich('key')` to render them.

## Consequences

- Using plain `t('key')` for a message that contains rich text tags will render the raw tag strings, not styled elements. Always use `t.rich('key')` for any message key that contains `<highlight>` or `<strong>` tags.
- New rich text tags must be added to `defaultTranslationValues` in `i18n/request.ts` and documented before use in message files.
- When adding a new locale, the rich text tags (`<highlight>`, `<strong>`) must wrap the same semantic content as in `en.json` — the translation should move the tags, not omit them.
- Changing the Tailwind class inside a tag renderer (e.g. `text-electric-cyan` → `text-cyan-400`) propagates to all messages globally — test visually across multiple pages before deploying.
