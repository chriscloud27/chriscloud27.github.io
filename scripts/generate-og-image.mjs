#!/usr/bin/env node

import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svgPath = join(__dirname, "../public/og/default.svg");
const pngPath = join(__dirname, "../public/og/default.png");

try {
  await sharp(svgPath).png().toFile(pngPath);

  console.log(`✓ Successfully converted ${svgPath} to ${pngPath}`);
} catch (err) {
  console.error("✗ Error converting SVG to PNG:", err);
  process.exit(1);
}
