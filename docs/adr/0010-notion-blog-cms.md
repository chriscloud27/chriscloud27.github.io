Title: ADR-0010: Notion as Sole Blog Content Source with Build-Time Asset Sync

Status: accepted

Date: 2026-04-22

## Context

Blog content needs a authoring interface that is non-technical, supports rich text, and does not require a separate CMS deployment. Three options were considered:

**Option A — MDX files in Git:** Content lives in the repo. Requires a developer workflow to publish. No rich editor. Good for code-heavy technical writing but poor for frequent non-technical updates.

**Option B — Headless CMS (Contentful, Sanity):** Dedicated CMS with APIs and rich editors. Adds a paid vendor, a separate account to manage, and additional deployment surface.

**Option C — Notion Database:** Notion is already in use for personal knowledge management. The Notion API supports querying database pages and their blocks. No additional vendor account needed. Rich editing environment with inline images and metadata properties.

Notion was chosen because it eliminates tool-switching overhead and reuses an existing workflow. The trade-off is that the site build depends on Notion API availability and a valid `NOTION_TOKEN` secret.

A SHA1-based asset sync script (`scripts/sync-notion-assets.mjs`) downloads Notion-hosted images to `/public/notion-assets/blog/` during CI, avoiding runtime Notion dependency for images and reducing Notion API rate-limit exposure in production.

When `NOTION_TOKEN` or `NOTION_BLOG_DATABASE_ID` is absent (local dev without secrets), `lib/notion.ts` falls back to a set of hardcoded stub posts so the build does not fail.

## Decision

We use the Notion API as the sole source of blog posts. Posts are fetched at build time via `lib/notion.ts`. Blog images are cached locally via `scripts/sync-notion-assets.mjs` before `next build`. A hardcoded fallback prevents build failures when Notion credentials are unavailable.

## Consequences

- Blog publishing requires updating the Notion database, not the Git repository.
- The GitHub Actions build workflow must inject `NOTION_TOKEN` and `NOTION_BLOG_DATABASE_ID` as secrets.
- Build failures will occur if Notion is down or the token is revoked during CI — there is no runtime fallback for live content.
- Post metadata (metaDescription, dateModified, tags, relatedArticles) must be maintained as Notion database properties — not in frontmatter.
- Adding a new metadata field requires updating `lib/notion.ts` response mapping and all locale `messages/*.json` files if the field is user-facing.
- The asset sync script is idempotent (SHA1-keyed cache) — re-running it will not re-download unchanged images.
