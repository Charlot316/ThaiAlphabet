#!/usr/bin/env node
// 把 exports/ 下的 SVG 转成 src/data/strokes.ts 用的归一化 d 字符串。
//   node scripts/svg-to-stroke.mjs <key|svg-path>             # 仅打印转换后的 d
//   node scripts/svg-to-stroke.mjs <key|svg-path> --apply     # 单笔字母直接写回 strokes.ts
//   node scripts/svg-to-stroke.mjs <svg-path> --apply <key>   # 显式指定要替换的条目 key
//
// 转换公式：scale = 88 / max(svg.width, svg.height)，居中到 100×100 viewBox。
// 多笔字母（拆分过的元音）会拒绝自动写入，只能手动改。

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(__filename), "..");
const STROKES_PATH = path.join(REPO_ROOT, "src/data/strokes.ts");
const EXPORTS_DIR = path.join(REPO_ROOT, "exports");

function fmtNum(n) {
  return Number(n).toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

function parseSvgFile(filepath) {
  const content = fs.readFileSync(filepath, "utf8");
  const widthMatch = content.match(/\bwidth="([\d.]+)"/);
  const heightMatch = content.match(/\bheight="([\d.]+)"/);
  const dMatch = content.match(/\bd="([^"]+)"/);
  if (!widthMatch || !heightMatch || !dMatch) {
    throw new Error(`Could not parse SVG file ${filepath}`);
  }
  return {
    width: Number(widthMatch[1]),
    height: Number(heightMatch[1]),
    d: dMatch[1],
  };
}

function transformPath(d, scale, tx, ty) {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
  const result = [];
  let i = 0;
  while (i < tokens.length) {
    const tok = tokens[i++];
    if (!/^[a-zA-Z]$/.test(tok)) {
      throw new Error(`Unexpected token "${tok}" near position ${i}`);
    }
    if (tok !== tok.toUpperCase()) {
      throw new Error(`Lowercase (relative) command "${tok}" not supported. Re-export SVG with absolute coordinates.`);
    }
    const cmd = tok;
    result.push(cmd);
    if (cmd === "Z") continue;
    if (cmd === "H") {
      const x = Number(tokens[i++]);
      result.push(fmtNum(x * scale + tx));
      continue;
    }
    if (cmd === "V") {
      const y = Number(tokens[i++]);
      result.push(fmtNum(y * scale + ty));
      continue;
    }
    if (cmd === "A") throw new Error("Arc (A) commands not supported");
    const pointCount = cmd === "C" ? 3 : cmd === "Q" || cmd === "S" ? 2 : 1;
    for (let p = 0; p < pointCount; p++) {
      const x = Number(tokens[i++]);
      const y = Number(tokens[i++]);
      result.push(fmtNum(x * scale + tx));
      result.push(fmtNum(y * scale + ty));
    }
  }
  return result.join(" ");
}

function convertSvg(svg) {
  const max = Math.max(svg.width, svg.height);
  const scale = 88 / max;
  const tx = (100 - svg.width * scale) / 2;
  const ty = (100 - svg.height * scale) / 2;
  return transformPath(svg.d, scale, tx, ty);
}

function findSvgFile(input) {
  if (fs.existsSync(input) && fs.statSync(input).isFile()) return input;
  const candidates = [
    path.join(EXPORTS_DIR, "consonents", `${input}.svg`),
    path.join(EXPORTS_DIR, `${input}.svg`),
    path.join(EXPORTS_DIR, ` ${input}.svg`),
    path.join(EXPORTS_DIR, `◌${input}.svg`),
    path.join(EXPORTS_DIR, `◌ ${input}.svg`),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function inferKeyFromPath(filepath) {
  return path.basename(filepath, ".svg").trim().replace(/^◌/, "");
}

function entryRange(content, key) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const opener = new RegExp(`"${escapedKey}":\\s*\\{`);
  const startMatch = content.match(opener);
  if (!startMatch) return null;
  const start = startMatch.index;
  const tail = content.slice(start);
  // 条目之间用 `\n  },` 分隔，最后一个用 `\n  }`。两种都匹配。
  const endRel = tail.search(/\n  \}(?:,|\s*\};)/);
  if (endRel < 0) return null;
  return { start, end: start + endRel + "\n  }".length };
}

function applyToStrokesFile(key, newD) {
  const content = fs.readFileSync(STROKES_PATH, "utf8");
  const range = entryRange(content, key);
  if (!range) throw new Error(`Could not find entry for "${key}" in strokes.ts`);
  const entry = content.slice(range.start, range.end);
  const dCount = (entry.match(/"d":/g) || []).length;
  if (dCount === 0) throw new Error(`Entry "${key}" has no "d" field`);
  if (dCount > 1) {
    throw new Error(
      `Entry "${key}" has ${dCount} strokes — refusing to overwrite. Edit src/data/strokes.ts manually.`
    );
  }
  const updatedEntry = entry.replace(/("d":\s*)"[^"]+"/, `$1"${newD}"`);
  if (updatedEntry === entry) return false;
  const next = content.slice(0, range.start) + updatedEntry + content.slice(range.end);
  fs.writeFileSync(STROKES_PATH, next);
  return true;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
    console.error(
      [
        "Usage:",
        "  node scripts/svg-to-stroke.mjs <key|svg-path>",
        "  node scripts/svg-to-stroke.mjs <key|svg-path> --apply",
        "  node scripts/svg-to-stroke.mjs <svg-path> --apply <key>",
      ].join("\n")
    );
    process.exit(args.length === 0 ? 1 : 0);
  }

  const input = args[0];
  const applyIdx = args.indexOf("--apply");
  const apply = applyIdx >= 0;
  const explicitKey =
    apply && args[applyIdx + 1] && !args[applyIdx + 1].startsWith("--") ? args[applyIdx + 1] : null;

  const filepath = findSvgFile(input);
  if (!filepath) {
    console.error(`SVG not found for "${input}"`);
    process.exit(1);
  }

  const svg = parseSvgFile(filepath);
  const d = convertSvg(svg);
  console.log(d);

  if (!apply) return;
  const key = explicitKey ?? inferKeyFromPath(filepath);
  try {
    const changed = applyToStrokesFile(key, d);
    const rel = path.relative(REPO_ROOT, filepath);
    console.error(
      changed
        ? `✓ Updated "${key}" in src/data/strokes.ts (from ${rel})`
        : `· "${key}" already up to date (no change)`
    );
  } catch (err) {
    console.error(`✗ ${err.message}`);
    process.exit(1);
  }
}

main();
