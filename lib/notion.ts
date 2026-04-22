import { Client } from "@notionhq/client";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// ---------------------------------------------------------------------------
// Client singleton
// ---------------------------------------------------------------------------
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID ?? "";
const LOCAL_ASSET_BASE_PATH = "/notion-assets/blog";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface NotionBlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  metaDescription?: string;
  dateModified?: string;
}

export interface TocHeading {
  id: string;
  text: string;
  level: 1 | 2 | 3;
}

export interface NotionBlogPostDetail extends NotionBlogPost {
  coverImage?: string;
  blocks: string; // rendered HTML string
  headings: TocHeading[];
  internalLinks?: string[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function richTextToPlain(rich: RichTextItemResponse[]): string {
  return rich.map((r) => r.plain_text).join("");
}

function richTextToHtml(rich: RichTextItemResponse[]): string {
  return rich
    .map((r) => {
      let text = r.plain_text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      if (r.annotations?.bold) text = `<strong>${text}</strong>`;
      if (r.annotations?.italic) text = `<em>${text}</em>`;
      if (r.annotations?.code) text = `<code>${text}</code>`;
      if ("href" in r && r.href) text = `<a href="${r.href}">${text}</a>`;
      return text;
    })
    .join("");
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function slugifySegment(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "post"
  );
}

function getUrlHash(value: string): string {
  return createHash("sha1").update(value).digest("hex").slice(0, 12);
}

function getAssetExtension(url: string): string {
  try {
    const cleanedUrl = url.split("?")[0] ?? "";
    const pathname = cleanedUrl.split("#")[0] ?? "";
    const extension = path.extname(pathname).toLowerCase();
    return extension && extension.length <= 5 ? extension : ".img";
  } catch {
    return ".img";
  }
}

function getAssetFileName(
  slug: string,
  kind: string,
  sourceUrl: string,
): string {
  const safeSlug = slugifySegment(slug);
  const hash = getUrlHash(sourceUrl);
  const extension = getAssetExtension(sourceUrl);
  return `${safeSlug}/${kind}-${hash}${extension}`;
}

function getLocalAssetUrl(
  slug: string,
  kind: string,
  sourceUrl: string,
): string | undefined {
  const relativeFileName = getAssetFileName(slug, kind, sourceUrl);
  const absolutePath = path.join(
    process.cwd(),
    "public",
    "notion-assets",
    "blog",
    relativeFileName,
  );

  if (!existsSync(absolutePath)) return undefined;
  return `${LOCAL_ASSET_BASE_PATH}/${relativeFileName}`;
}

function getNotionFileUrl(
  asset:
    | { type?: "external"; external?: { url: string } }
    | { type?: "file"; file?: { url: string } }
    | null
    | undefined,
): string | undefined {
  if (!asset?.type) return undefined;
  if (asset.type === "external") return asset.external?.url;
  if (asset.type === "file") return asset.file?.url;
  return undefined;
}

async function fetchAllChildren(
  blockId: string,
): Promise<BlockObjectResponse[]> {
  const results: BlockObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    results.push(...(response.results as BlockObjectResponse[]));
    cursor = response.has_more
      ? (response.next_cursor ?? undefined)
      : undefined;
  } while (cursor);
  return results;
}

async function blocksToHtml(
  blocks: BlockObjectResponse[],
  slug: string,
  imageCounter = { value: 0 },
): Promise<string> {
  const lines: string[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "paragraph": {
        const text = richTextToHtml(block.paragraph.rich_text);
        if (text) lines.push(`<p>${text}</p>`);
        break;
      }
      case "heading_1": {
        const text = richTextToHtml(block.heading_1.rich_text);
        const id = slugifyHeading(richTextToPlain(block.heading_1.rich_text));
        lines.push(`<h1 id="${id}">${text}</h1>`);
        break;
      }
      case "heading_2": {
        const text = richTextToHtml(block.heading_2.rich_text);
        const id = slugifyHeading(richTextToPlain(block.heading_2.rich_text));
        lines.push(`<h2 id="${id}">${text}</h2>`);
        break;
      }
      case "heading_3": {
        const text = richTextToHtml(block.heading_3.rich_text);
        const id = slugifyHeading(richTextToPlain(block.heading_3.rich_text));
        lines.push(`<h3 id="${id}">${text}</h3>`);
        break;
      }
      case "bulleted_list_item": {
        const text = richTextToHtml(block.bulleted_list_item.rich_text);
        lines.push(`<li>${text}</li>`);
        break;
      }
      case "numbered_list_item": {
        const text = richTextToHtml(block.numbered_list_item.rich_text);
        lines.push(`<li>${text}</li>`);
        break;
      }
      case "quote": {
        const text = richTextToHtml(block.quote.rich_text);
        let inner = text;
        if (block.has_children) {
          const children = await fetchAllChildren(block.id);
          inner += await blocksToHtml(children, slug, imageCounter);
        }
        lines.push(`<blockquote>${inner}</blockquote>`);
        break;
      }
      case "code": {
        const text = block.code.rich_text.map((r) => r.plain_text).join("");
        const lang = block.code.language ?? "";
        lines.push(
          `<pre><code class="language-${lang}">${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`,
        );
        break;
      }
      case "divider": {
        lines.push("<hr />");
        break;
      }
      case "image": {
        const sourceUrl = getNotionFileUrl(block.image);
        if (!sourceUrl) break;

        const caption = richTextToHtml(block.image.caption);
        const altText = richTextToPlain(block.image.caption) || "Blog image";
        const imageUrl =
          getLocalAssetUrl(
            slug,
            `inline-${String(imageCounter.value).padStart(2, "0")}`,
            sourceUrl,
          ) ?? sourceUrl;
        lines.push(
          `<figure><img src="${escapeHtmlAttribute(imageUrl)}" alt="${escapeHtmlAttribute(altText)}" loading="lazy" />${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`,
        );
        imageCounter.value += 1;
        break;
      }
      default:
        break;
    }
  }

  return lines.join("\n");
}

function pageToPost(page: PageObjectResponse): NotionBlogPost {
  const props = page.properties as Record<string, unknown>;

  const titleProp = props["Title"] ?? props["Name"];
  const title =
    titleProp &&
    typeof titleProp === "object" &&
    "title" in (titleProp as object)
      ? richTextToPlain((titleProp as { title: RichTextItemResponse[] }).title)
      : "Untitled";

  const slugProp = props["Slug"];
  const slug =
    slugProp &&
    typeof slugProp === "object" &&
    "rich_text" in (slugProp as object)
      ? richTextToPlain(
          (slugProp as { rich_text: RichTextItemResponse[] }).rich_text,
        )
      : page.id;

  const dateProp = props["Date"] ?? props["Published"];
  const date =
    dateProp && typeof dateProp === "object" && "date" in (dateProp as object)
      ? ((dateProp as { date: { start: string } | null }).date?.start ??
        page.last_edited_time)
      : page.last_edited_time;

  const excerptProp = props["Excerpt"] ?? props["Summary"];
  const excerpt =
    excerptProp &&
    typeof excerptProp === "object" &&
    "rich_text" in (excerptProp as object)
      ? richTextToPlain(
          (excerptProp as { rich_text: RichTextItemResponse[] }).rich_text,
        )
      : "";

  const tagsProp = props["Tags"];
  const tags =
    tagsProp &&
    typeof tagsProp === "object" &&
    "multi_select" in (tagsProp as object)
      ? (tagsProp as { multi_select: { name: string }[] }).multi_select.map(
          (t) => t.name,
        )
      : [];

  const publishedProp = props["Published"];
  const published =
    publishedProp &&
    typeof publishedProp === "object" &&
    "checkbox" in (publishedProp as object)
      ? (publishedProp as { checkbox: boolean }).checkbox
      : true;

  // Extract MetaDescription (NEW property)
  const metaDescriptionProp = props["MetaDescription"];
  const metaDescription =
    metaDescriptionProp &&
    typeof metaDescriptionProp === "object" &&
    "rich_text" in (metaDescriptionProp as object)
      ? richTextToPlain(
          (
            metaDescriptionProp as {
              rich_text: RichTextItemResponse[];
            }
          ).rich_text,
        )
      : undefined;

  // Extract DateModified (NEW property)
  const dateModifiedProp = props["DateModified"];
  const dateModified =
    dateModifiedProp &&
    typeof dateModifiedProp === "object" &&
    "date" in (dateModifiedProp as object)
      ? (dateModifiedProp as { date: { start: string } | null }).date?.start
      : undefined;

  return {
    id: page.id,
    slug,
    title,
    date,
    excerpt,
    tags,
    published,
    metaDescription,
    dateModified,
  };
}

function extractHeadings(blocks: BlockObjectResponse[]): TocHeading[] {
  const headings: TocHeading[] = [];
  for (const block of blocks) {
    if (block.type === "heading_1") {
      const text = richTextToPlain(block.heading_1.rich_text);
      headings.push({ id: slugifyHeading(text), text, level: 1 });
    } else if (block.type === "heading_2") {
      const text = richTextToPlain(block.heading_2.rich_text);
      headings.push({ id: slugifyHeading(text), text, level: 2 });
    } else if (block.type === "heading_3") {
      const text = richTextToPlain(block.heading_3.rich_text);
      headings.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }
  return headings;
}

function extractInternalLinks(page: PageObjectResponse): string[] {
  const props = page.properties as Record<string, unknown>;
  const relatedProp = props["RelatedArticles"];

  if (
    !relatedProp ||
    typeof relatedProp !== "object" ||
    !("relation" in (relatedProp as object))
  ) {
    return [];
  }

  const relations = (relatedProp as { relation: { id: string }[] }).relation;
  return relations.map((r) => r.id).slice(0, 3); // Limit to 3 related articles (return page IDs)
}

async function resolvePageIdsToSlugs(pageIds: string[]): Promise<string[]> {
  if (!pageIds.length) return [];

  try {
    const slugs: string[] = [];
    for (const id of pageIds) {
      const page = await notion.pages.retrieve({ page_id: id });
      const props = (page as PageObjectResponse).properties as Record<
        string,
        unknown
      >;
      const slugProp = props["Slug"];
      const slug =
        slugProp &&
        typeof slugProp === "object" &&
        "rich_text" in (slugProp as object)
          ? richTextToPlain(
              (slugProp as { rich_text: RichTextItemResponse[] }).rich_text,
            )
          : id; // Fallback to page ID if slug not found
      slugs.push(slug);
    }
    return slugs;
  } catch (err) {
    console.error("[Notion] Failed to resolve page IDs to slugs:", err);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Fetch all published blog posts from Notion. Revalidate every hour. */
export async function getBlogPosts(): Promise<NotionBlogPost[]> {
  if (!DATABASE_ID) return FALLBACK_POSTS;

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          { property: "Published", checkbox: { equals: true } },
          { property: "post_on", multi_select: { contains: "blog" } },
        ],
      },
      sorts: [{ property: "Date", direction: "descending" }],
    });

    const posts = (response.results as PageObjectResponse[]).map(pageToPost);
    return posts.length > 0 ? posts : FALLBACK_POSTS;
  } catch (err) {
    console.error("[Notion] Failed to fetch posts:", err);
    return FALLBACK_POSTS;
  }
}

/** Fetch a single blog post with rendered HTML content. */
export async function getBlogPost(
  slug: string,
): Promise<NotionBlogPostDetail | null> {
  if (!DATABASE_ID) {
    const fallback = FALLBACK_POSTS.find((p) => p.slug === slug);
    if (!fallback) return null;

    // Return fallback content for demonstration
    const fallbackContent: Record<string, string> = {
      "ai-native-platform-design": `
        <p>Most teams add AI features on top of existing platforms. But this approach creates compounding complexity:</p>
        <ul style="margin: 16px 0; padding-left: 24px;">
          <li>Existing data pipelines aren't optimized for ML workloads</li>
          <li>Compute patterns differ fundamentally (batch vs. real-time inference)</li>
          <li>Cost models break when you layer AI on legacy infrastructure</li>
        </ul>
        <p><strong>AI-native architecture</strong> designs the entire system around AI from day one:</p>
        <h3 style="margin-top: 24px; margin-bottom: 12px;">Data Flow</h3>
        <p>Stream-first design. Your core pipeline assumes continuous feature computation, not batch imports. This means Kafka, Flink, or managed streaming services from the start—not a retrofit.</p>
        <h3 style="margin-top: 24px; margin-bottom: 12px;">Compute Patterns</h3>
        <p>GPU-native workloads. Training and inference infrastructure is tightly coupled—not separate concerns. Inference happens at the edge when possible, training happens asynchronously against a live feature store.</p>
        <h3 style="margin-top: 24px; margin-bottom: 12px;">Cost Model</h3>
        <p>Infrastructure costs scale with inference volume, not request count. You pay for compute utilization, not API calls. This changes how you think about caching, batching, and request patterns.</p>
        <p style="margin-top: 24px;"><em>When is this worth it? When your product is fundamentally built on predictions—search ranking, personalization, fraud detection, recommendation systems. Not for teams adding a chatbot to an e-commerce platform.</em></p>
      `,
      "baas-vs-custom-infra": `
        <p>The most overrated infrastructure decision is choosing between BaaS and custom infrastructure as if it's permanent.</p>
        <h3 style="margin-top: 24px; margin-bottom: 12px;">Why BaaS Wins Early</h3>
        <p>In your first 18 months, you need to validate product-market fit, not manage Kubernetes. BaaS gives you:</p>
        <ul style="margin: 16px 0; padding-left: 24px;">
          <li>Faster iteration (no ops)</li>
          <li>Predictable scaling (up to a limit)</li>
          <li>Audit logs and compliance baked in</li>
        </ul>
        <h3 style="margin-top: 24px; margin-bottom: 12px;">Where Custom Infra Becomes Cheaper</h3>
        <p>Around Series A scale, your bill hits ~$50-100K/month. At that point, moving to Kubernetes or ECS saves 30-40% compared to BaaS pricing. But only if:</p>
        <ul style="margin: 16px 0; padding-left: 24px;">
          <li>You have infrastructure expertise on staff</li>
          <li>Your scaling patterns are predictable</li>
          <li>You've actually hit the limits of the BaaS platform</li>
        </ul>
        <h3 style="margin-top: 24px; margin-bottom: 12px;">The Architecture That Actually Works</h3>
        <p>Hybrid approach: Core API on BaaS (Amplify, Firebase). Async jobs and batch workloads on managed Kubernetes. Feature flags to swap implementations. This lets you grow without a rip-and-replace migration.</p>
      `,
    };

    return {
      ...fallback,
      blocks: fallbackContent[slug] || "<p>Content coming soon.</p>",
      headings: [],
      internalLinks: [],
    };
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Slug",
        rich_text: { equals: slug },
      },
    });

    const page = response.results[0] as PageObjectResponse | undefined;
    if (!page) return null;

    const post = pageToPost(page);
    const coverSourceUrl = getNotionFileUrl(page.cover);
    const coverImage = coverSourceUrl
      ? (getLocalAssetUrl(post.slug, "cover", coverSourceUrl) ?? coverSourceUrl)
      : undefined;
    const blocksResponse = await notion.blocks.children.list({
      block_id: page.id,
    });
    const rawBlocks = blocksResponse.results as BlockObjectResponse[];
    const blocks = await blocksToHtml(rawBlocks, post.slug);
    const headings = extractHeadings(rawBlocks);

    // Extract and resolve internal links (related articles)
    const relatedPageIds = extractInternalLinks(page);
    const internalLinks = await resolvePageIdsToSlugs(relatedPageIds);

    return { ...post, coverImage, blocks, headings, internalLinks };
  } catch (err) {
    console.error("[Notion] Failed to fetch post:", err);
    return null;
  }
}

/** Return slugs for generateStaticParams. */
export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((p) => p.slug);
}

// ---------------------------------------------------------------------------
// Fallback data (shown when Notion env vars are not configured)
// ---------------------------------------------------------------------------
const FALLBACK_POSTS: NotionBlogPost[] = [
  {
    id: "1",
    slug: "ai-native-platform-design",
    title: 'What "AI-Native" Actually Means for Your Platform Architecture',
    date: "2026-03-01",
    excerpt:
      "Most teams add AI features on top of existing platforms. AI-native means designing the platform around AI workloads from the start — different data flows, different compute patterns, different cost models.",
    tags: ["AI-Native", "Architecture", "Platform Design"],
    published: true,
  },
  {
    id: "2",
    slug: "baas-vs-custom-infra",
    title: "BaaS vs Custom Infrastructure: When to Choose Each",
    date: "2026-02-15",
    excerpt:
      "Backend-as-a-Service accelerates early-stage velocity. Custom infrastructure gives you control at scale. The key is knowing when to switch — and how to architect for that transition from day one.",
    tags: ["BaaS", "AWS Amplify", "Startup Architecture"],
    published: true,
  },
];
