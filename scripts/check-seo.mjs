#!/usr/bin/env node
/**
 * scripts/check-seo.mjs
 *
 * Writes timestamped reports to reports/seo/<ISO-timestamp>/
 */

import fs from "fs/promises";
import path from "path";

function parseArgs() {
  const args = Object.fromEntries(
    process.argv.slice(2).map((a) => {
      const [k, v] = a.split("=");
      return [k.replace(/^--/, ""), v ?? true];
    }),
  );
  const cwd = process.cwd();
  return {
    sitemap: args.sitemap || "https://mach2.cloud/sitemap.xml",
    urls: args.urls ? args.urls.split(",") : null,
    max: args.max ? Number(args.max) : 50,
    baseline:
      args.baseline ||
      path.join(cwd, "reports", "seo", "baseline", "seo-baseline.json"),
    snapshot: args.snapshot || null,
    keywordsFile: args["keywords-file"] || null,
    timeoutMs: args.timeout ? Number(args.timeout) : 15000,
  };
}

async function fetchText(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text };
  } finally {
    clearTimeout(id);
  }
}

const extractOnce = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};
function extractAll(html, re) {
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[1].trim());
  return out;
}

function parseMeta(html) {
  const title = extractOnce(html, /<title[^>]*>([^<]+)<\/title>/i);
  const description =
    extractOnce(
      html,
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
    ) ||
    extractOnce(
      html,
      /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
    );
  const keywords =
    extractOnce(
      html,
      /<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["'][^>]*>/i,
    ) || null;
  const canonical =
    extractOnce(
      html,
      /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i,
    ) ||
    extractOnce(
      html,
      /<link[^>]*href=["']([^"']*)["']rel=["']canonical["'][^>]*>/i,
    ) ||
    null;
  const ogTitle = extractOnce(
    html,
    /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i,
  );
  const ogImage = extractOnce(
    html,
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i,
  );
  const twitterCard = extractOnce(
    html,
    /<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']*)["'][^>]*>/i,
  );
  const alternates = [];
  Array.from(
    html.matchAll(
      /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']*)["'][^>]*href=["']([^"']*)["'][^>]*>/gi,
    ),
  ).forEach((m) => alternates.push({ hreflang: m[1], href: m[2] }));
  const jsonLdBlocks = extractAll(
    html,
    /<script[^>]*type=["']application\/ld\\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );
  let jsonLd = null;
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block);
      if (
        parsed &&
        (parsed["@type"] === "Article" ||
          parsed["@type"] === "NewsArticle" ||
          parsed["headline"])
      ) {
        jsonLd = parsed;
        break;
      } else if (!jsonLd) jsonLd = parsed;
    } catch (e) {}
  }
  return {
    title,
    description,
    keywords,
    canonical,
    ogTitle,
    ogImage,
    twitterCard,
    alternates,
    jsonLd,
  };
}

function summarizeIssues(meta) {
  const issues = [];
  if (!meta.title) issues.push("Missing <title>");
  if (!meta.description) issues.push("Missing meta description");
  if (!meta.canonical) issues.push("Missing canonical link");
  if (!meta.ogTitle) issues.push("Missing og:title");
  if (!meta.twitterCard) issues.push("Missing twitter:card");
  if (!meta.jsonLd) issues.push("Missing JSON-LD structured data (Article)");
  if (meta.keywords && meta.keywords.split(",").length < 2)
    issues.push("Meta keywords present but limited (few terms)");
  return issues;
}

function diffObjects(prev, current) {
  const diffs = {};
  const keys = new Set([
    ...(prev ? Object.keys(prev) : []),
    ...(current ? Object.keys(current) : []),
  ]);
  for (const k of keys) {
    const pv = prev ? prev[k] : undefined;
    const cv = current ? current[k] : undefined;
    if (JSON.stringify(pv) !== JSON.stringify(cv))
      diffs[k] = {
        before: pv === undefined ? null : pv,
        after: cv === undefined ? null : cv,
      };
  }
  return diffs;
}

async function getUrlsFromSitemap(sitemapUrl, max = 50, timeoutMs = 15000) {
  try {
    const { ok, text } = await fetchText(sitemapUrl, timeoutMs);
    if (!ok) throw new Error("Failed to fetch sitemap");
    const locs = Array.from(text.matchAll(/<loc>([^<]+)<\/loc>/gi)).map(
      (m) => m[1],
    );
    return locs.slice(0, max);
  } catch (err) {
    console.warn("Could not fetch sitemap:", err.message);
    return [];
  }
}

async function maybeLoadKeywords(filePath) {
  if (!filePath) return null;
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const matches = [
      ...raw.matchAll(/export const \w+_?KEYWORDS\s*=\s*\[([\s\S]*?)\]/gi),
    ];
    const all = [];
    for (const m of matches) {
      const inside = m[1];
      const items = [...inside.matchAll(/'([^']+)'/g)].map((x) => x[1]);
      all.push(...items);
    }
    return [...new Set(all)];
  } catch (e) {
    return null;
  }
}

function humanReportEntry(urlResult, diffsForUrl, globalKeywords) {
  const lines = [];
  const issues = urlResult.issues;
  const status =
    issues.length === 0 && urlResult.httpOk
      ? "OK"
      : urlResult.httpOk
        ? "WARN"
        : "ERROR";
  lines.push(`${status} — ${urlResult.url}`);
  lines.push(`  HTTP: ${urlResult.httpStatus}`);
  if (issues.length) {
    lines.push(`  Issues:`);
    issues.forEach((i) => lines.push(`    - ${i}`));
  } else {
    lines.push(`  All core metadata present.`);
  }
  lines.push(`  Title: ${urlResult.meta.title ?? "<missing>"}`);
  lines.push(
    `  Description: ${urlResult.meta.description ? (urlResult.meta.description.length > 140 ? urlResult.meta.description.slice(0, 140) + "…" : urlResult.meta.description) : "<missing>"}`,
  );
  lines.push(`  Canonical: ${urlResult.meta.canonical ?? "<missing>"}`);
  if (urlResult.meta.keywords) {
    lines.push(`  Keywords: ${urlResult.meta.keywords}`);
    if (globalKeywords && globalKeywords.length) {
      const found = globalKeywords.filter((k) =>
        urlResult.meta.keywords.toLowerCase().includes(k.toLowerCase()),
      );
      if (found.length)
        lines.push(`  - Contains global keywords: ${found.join(", ")}`);
    }
  } else {
    lines.push(`  Keywords: <missing>`);
  }
  if (diffsForUrl && Object.keys(diffsForUrl).length) {
    lines.push(`  Applied changes since baseline:`);
    for (const [k, v] of Object.entries(diffsForUrl)) {
      lines.push(`    - ${k}:`);
      lines.push(
        `      before: ${typeof v.before === "string" ? v.before.slice(0, 180) : JSON.stringify(v.before)}`,
      );
      lines.push(
        `      after : ${typeof v.after === "string" ? v.after.slice(0, 180) : JSON.stringify(v.after)}`,
      );
    }
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  const cfg = parseArgs();
  const urls = new Set();
  if (cfg.urls) cfg.urls.forEach((u) => urls.add(u));
  if (!cfg.urls) {
    const sitemapUrls = await getUrlsFromSitemap(
      cfg.sitemap,
      cfg.max,
      cfg.timeoutMs,
    );
    if (sitemapUrls.length) sitemapUrls.forEach((u) => urls.add(u));
    urls.add(new URL("/", cfg.sitemap).origin + "/");
  }
  const urlList = Array.from(urls).slice(0, cfg.max);

  // safe baseline load
  let baseline = null;
  try {
    const baselineText = await fs
      .readFile(cfg.baseline, "utf8")
      .catch(() => null);
    if (baselineText) baseline = JSON.parse(baselineText);
  } catch (e) {
    console.warn(
      "Warning: baseline exists but could not be parsed; ignoring baseline.",
    );
    baseline = null;
  }

  const globalKeywords = await maybeLoadKeywords(cfg.keywordsFile);
  const results = [];
  for (const url of urlList) {
    try {
      const res = await fetchText(url, cfg.timeoutMs);
      const meta = parseMeta(res.text || "");
      const issues = summarizeIssues(meta);
      results.push({
        url,
        httpOk: res.ok,
        httpStatus: res.status,
        meta,
        issues,
      });
    } catch (e) {
      results.push({
        url,
        httpOk: false,
        httpStatus: 0,
        meta: {},
        issues: [`Fetch error: ${e.message}`],
      });
    }
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const reportDir = path.join(process.cwd(), "reports", "seo", timestamp);
  await fs.mkdir(reportDir, { recursive: true });

  const snapshot = { generatedAt: new Date().toISOString(), results };
  const snapshotPath =
    cfg.snapshot || path.join(reportDir, "seo-snapshot.json");
  await fs.writeFile(snapshotPath, JSON.stringify(snapshot, null, 2), "utf8");

  const diffs = {};
  if (baseline && baseline.results) {
    const prevByUrl = Object.fromEntries(
      baseline.results.map((r) => [r.url, r]),
    );
    for (const r of results) {
      const prev = prevByUrl[r.url];
      if (!prev)
        diffs[r.url] = { note: "NEW_URL", diff: diffObjects({}, r.meta) };
      else {
        const d = diffObjects(prev.meta, r.meta);
        if (Object.keys(d).length) diffs[r.url] = { note: "CHANGED", diff: d };
      }
    }
    const curUrls = new Set(results.map((r) => r.url));
    for (const prev of baseline.results)
      if (!curUrls.has(prev.url))
        diffs[prev.url] = { note: "REMOVED", diff: prev.meta };
  }

  const okCount = results.filter(
    (r) => r.httpOk && r.issues.length === 0,
  ).length;
  const warnCount = results.filter(
    (r) => r.httpOk && r.issues.length > 0,
  ).length;
  const errCount = results.filter((r) => !r.httpOk).length;

  console.log("\nSEO CHECK REPORT");
  console.log(`Generated: ${snapshot.generatedAt}`);
  console.log(`URLs checked: ${results.length}`);
  console.log(`  OK: ${okCount}  WARN: ${warnCount}  ERR: ${errCount}\n`);
  for (const r of results)
    console.log(
      humanReportEntry(
        r,
        diffs[r.url] ? diffs[r.url].diff : null,
        globalKeywords,
      ),
    );
  if (Object.keys(diffs).length) {
    console.log("Changes vs baseline:");
    for (const [u, info] of Object.entries(diffs))
      console.log(`- ${u} (${info.note})`);
  } else {
    console.log("No changes detected vs baseline.");
  }

  const machineReportPath = path.join(reportDir, "seo-report.json");
  await fs.writeFile(
    machineReportPath,
    JSON.stringify(
      {
        generatedAt: snapshot.generatedAt,
        summary: { okCount, warnCount, errCount },
        diffs,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`\nSnapshot saved to: ${snapshotPath}`);
  console.log(`Machine report saved to: ${machineReportPath}`);
  console.log(`Report folder: ${reportDir}`);
  if (baseline) console.log(`Compared against baseline: ${cfg.baseline}`);
  else
    console.log(
      "No baseline found; to accept this snapshot as baseline, copy it to the baseline path:",
    );
  console.log(
    `  cp "${snapshotPath}" "${path.join(process.cwd(), "reports", "seo", "baseline", "seo-baseline.json")}"`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(2);
});
