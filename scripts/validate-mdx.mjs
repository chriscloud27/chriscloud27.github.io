#!/usr/bin/env node
/**
 * validate-mdx.mjs
 * Compiles every .mdx file with @mdx-js/mdx and exits 1 on any parse error.
 * Catches issues like stray characters inside JSX tags before the full build runs.
 */

import { compile } from "@mdx-js/mdx";
import { readFile } from "fs/promises";
import { glob } from "fs/promises";
import path from "path";

// Collect all .mdx files under content/ and any other top-level MDX dirs
async function findMdxFiles(root) {
  const files = [];
  for await (const entry of glob("**/*.mdx", {
    cwd: root,
    exclude: (name) => name === "node_modules" || name === ".next",
  })) {
    files.push(path.join(root, entry));
  }
  return files.sort();
}

const root = process.cwd();
const files = await findMdxFiles(root);

if (files.length === 0) {
  console.log("No .mdx files found.");
  process.exit(0);
}

let errors = 0;

for (const file of files) {
  const rel = path.relative(root, file);
  try {
    const source = await readFile(file, "utf8");
    await compile(source, {
      jsx: true,
      format: "mdx",
    });
  } catch (err) {
    const msg = err.message ?? String(err);
    // Include position if available
    const pos = err.position?.start
      ? ` (line ${err.position.start.line}, col ${err.position.start.column})`
      : "";
    console.error(`\x1b[31m✖ MDX error:\x1b[0m ${rel}${pos}\n  ${msg}\n`);
    errors++;
  }
}

if (errors > 0) {
  console.error(
    `\x1b[31m${errors} MDX file${errors > 1 ? "s" : ""} failed validation.\x1b[0m`,
  );
  process.exit(1);
} else {
  console.log(`\x1b[32m✔ All ${files.length} MDX files valid.\x1b[0m`);
}
