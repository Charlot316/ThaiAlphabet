#!/usr/bin/env node
// 扫描 src/data/strokes.ts，找出"两个不同 id 的点出现在几乎重合坐标"的字母。
//
// 正常情况：同一个点被笔顺多次经过 → useCount > 1 但只是 1 个 node。
// Bug 情况：两段断开的子路径端点几乎重合（如 ฒ 旧版的 11.68/11.52）→ 被识别成 2 个 node，
//           视觉上重叠、数据上不连通，编辑器里那个点就"看不见"。
//
// 用法：node scripts/check-overlapping-points.mjs [threshold]
//   threshold 默认 1.0（100×100 viewBox 单位下 1% 距离内视为可疑）。

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(__filename), "..");
const STROKES_PATH = path.join(REPO_ROOT, "src/data/strokes.ts");

const threshold = Number(process.argv[2] ?? "1.0");

function parsePathSegments(d) {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
  const segments = [];
  let current = null;
  let subpathStart = null;
  let i = 0;
  const take = () => Number(tokens[i++]);
  const point = () => ({ x: take(), y: take() });
  while (i < tokens.length) {
    const tok = tokens[i++];
    if (!/[a-zA-Z]/.test(tok)) return null;
    const cmd = tok.toUpperCase();
    if (cmd !== tok) return null;
    if (cmd === "M") {
      current = point();
      subpathStart = current;
    } else if (cmd === "L" && current) {
      const to = point();
      segments.push({ from: current, to });
      current = to;
    } else if (cmd === "H" && current) {
      const to = { x: take(), y: current.y };
      segments.push({ from: current, to });
      current = to;
    } else if (cmd === "V" && current) {
      const to = { x: current.x, y: take() };
      segments.push({ from: current, to });
      current = to;
    } else if (cmd === "C" && current) {
      point();
      point();
      const to = point();
      segments.push({ from: current, to });
      current = to;
    } else if (cmd === "Z" && current && subpathStart) {
      segments.push({ from: current, to: subpathStart });
      current = subpathStart;
    } else {
      return null;
    }
  }
  return segments;
}

function pointKey(p) {
  return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
}

function buildNodes(d) {
  const segments = parsePathSegments(d) || [];
  const nodes = [];
  const seen = new Map();
  const ensure = (p) => {
    const k = pointKey(p);
    if (seen.has(k)) return;
    seen.set(k, nodes.length + 1);
    nodes.push({ id: nodes.length + 1, x: p.x, y: p.y });
  };
  for (const seg of segments) {
    ensure(seg.from);
    ensure(seg.to);
  }
  return nodes;
}

function findOverlaps(nodes, t) {
  const out = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0 && dist <= t) {
        out.push({ a: nodes[i], b: nodes[j], dist });
      }
    }
  }
  return out;
}

function extractEntries(content) {
  const entries = [];
  const re = /^  "([^"]+)":\s*\{([\s\S]*?)\n  \}/gm;
  let match;
  while ((match = re.exec(content)) !== null) {
    entries.push({ key: match[1], body: match[2] });
  }
  return entries;
}

function extractDStrings(body) {
  const out = [];
  const re = /"d":\s*"([^"]+)"/g;
  let match;
  while ((match = re.exec(body)) !== null) {
    out.push(match[1]);
  }
  return out;
}

const content = fs.readFileSync(STROKES_PATH, "utf8");
const entries = extractEntries(content);

const findings = [];
for (const { key, body } of entries) {
  const ds = extractDStrings(body);
  ds.forEach((d, idx) => {
    const nodes = buildNodes(d);
    const overlaps = findOverlaps(nodes, threshold);
    if (overlaps.length > 0) {
      findings.push({ key, strokeIdx: idx + 1, nodeCount: nodes.length, overlaps });
    }
  });
}

if (findings.length === 0) {
  console.log(`✓ No overlapping distinct points found in ${entries.length} entries (threshold ${threshold}).`);
  process.exit(0);
}

console.log(
  `Found suspect overlaps in ${findings.length} stroke(s) (threshold ${threshold}, ${entries.length} entries scanned):\n`
);
for (const f of findings) {
  console.log(`  ${f.key} (stroke #${f.strokeIdx}, ${f.nodeCount} nodes)`);
  for (const o of f.overlaps) {
    console.log(
      `    id=${o.a.id} (${o.a.x.toFixed(2)}, ${o.a.y.toFixed(2)}) ↔ id=${o.b.id} (${o.b.x.toFixed(2)}, ${o.b.y.toFixed(2)})   Δ=${o.dist.toFixed(3)}`
    );
  }
}
process.exit(findings.length > 0 ? 1 : 0);
