import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID;
const OUTPUT_DIR = path.join(process.cwd(), "public", "notion-assets", "blog");

function slugifySegment(value) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "post"
  );
}

function getUrlHash(value) {
  return createHash("sha1").update(value).digest("hex").slice(0, 12);
}

function getAssetExtension(url) {
  try {
    const pathname = new URL(url).pathname;
    const extension = path.extname(pathname).toLowerCase();
    return extension && extension.length <= 5 ? extension : ".img";
  } catch {
    return ".img";
  }
}

function getAssetFileName(slug, kind, sourceUrl) {
  const safeSlug = slugifySegment(slug);
  const hash = getUrlHash(sourceUrl);
  const extension = getAssetExtension(sourceUrl);
  return path.join(safeSlug, `${kind}-${hash}${extension}`);
}

function getNotionFileUrl(asset) {
  if (!asset?.type) return undefined;
  if (asset.type === "external") return asset.external?.url;
  if (asset.type === "file") return asset.file?.url;
  return undefined;
}

function richTextToPlain(rich = []) {
  return rich.map((item) => item.plain_text).join("");
}

async function notionRequest(endpoint, body) {
  const response = await fetch(`https://api.notion.com/v1/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Notion API ${response.status}: ${text}`);
  }

  return response.json();
}

async function listBlockChildren(blockId) {
  const response = await fetch(
    `https://api.notion.com/v1/blocks/${blockId}/children?page_size=100`,
    {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
      },
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Notion block fetch ${response.status}: ${text}`);
  }

  const data = await response.json();
  return data.results ?? [];
}

function getPostSlug(page) {
  const props = page.properties ?? {};
  const slugProp = props.Slug;

  if (slugProp?.type === "rich_text") {
    const slug = richTextToPlain(slugProp.rich_text);
    if (slug) return slug;
  }

  return page.id;
}

async function downloadAsset(slug, kind, sourceUrl) {
  const relativeFilePath = getAssetFileName(slug, kind, sourceUrl);
  const absoluteFilePath = path.join(OUTPUT_DIR, relativeFilePath);

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(
      `Asset download failed ${response.status} for ${sourceUrl}`,
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  await mkdir(path.dirname(absoluteFilePath), { recursive: true });
  await writeFile(absoluteFilePath, Buffer.from(arrayBuffer));

  return relativeFilePath;
}

async function syncAssets() {
  if (!NOTION_TOKEN || !DATABASE_ID) {
    console.log(
      "[sync-notion-assets] Missing Notion env vars, skipping asset sync.",
    );
    return;
  }

  await rm(OUTPUT_DIR, { recursive: true, force: true });

  const response = await notionRequest(`databases/${DATABASE_ID}/query`, {
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Date", direction: "descending" }],
    page_size: 100,
  });

  const pages = response.results ?? [];
  let downloadCount = 0;

  for (const page of pages) {
    const slug = getPostSlug(page);
    const coverUrl = getNotionFileUrl(page.cover);
    if (coverUrl) {
      await downloadAsset(slug, "cover", coverUrl);
      downloadCount += 1;
    }

    const blocks = await listBlockChildren(page.id);
    let imageIndex = 0;
    for (const block of blocks) {
      if (block.type !== "image") continue;
      const imageUrl = getNotionFileUrl(block.image);
      if (!imageUrl) continue;

      await downloadAsset(
        slug,
        `inline-${String(imageIndex).padStart(2, "0")}`,
        imageUrl,
      );
      downloadCount += 1;
      imageIndex += 1;
    }
  }

  const markerPath = path.join(OUTPUT_DIR, ".sync-marker.json");
  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(
    markerPath,
    JSON.stringify(
      { syncedAt: new Date().toISOString(), downloads: downloadCount },
      null,
      2,
    ),
  );

  console.log(
    `[sync-notion-assets] Downloaded ${downloadCount} asset(s) into ${OUTPUT_DIR}`,
  );
}

syncAssets().catch((error) => {
  console.error("[sync-notion-assets] Failed:", error);
  process.exitCode = 1;
});
