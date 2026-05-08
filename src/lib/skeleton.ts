"use client";

// 字符 → 中线骨架。算法：
// 1. 把字体 fill outline 渲染到位图（offscreen canvas）
// 2. 二值化
// 3. 计算黑色区域内每个像素到边界的距离场
// 4. 保留距离场 ridge：这些点可理解为“尽可能大的内接圆”的圆心
// 5. 轻量细化 + 沿 ridge 追踪生成 polyline 列表
// 6. Douglas-Peucker 简化 + 转为 SVG path

const RES = 384;

export interface Skeleton {
  /** 一段或多段 SVG path（按笔画连通分量分开） */
  paths: string[];
  /** 渲染时使用的 viewBox */
  viewBox: { x: number; y: number; w: number; h: number };
}

interface Bbox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function neighbors8(mask: Uint8Array, x: number, y: number, w: number, h: number): Array<[number, number]> {
  const res: Array<[number, number]> = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      if (mask[ny * w + nx]) res.push([nx, ny]);
    }
  }
  return res;
}

function hasBackgroundNeighbor(mask: Uint8Array, x: number, y: number, w: number, h: number): boolean {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) return true;
      if (!mask[ny * w + nx]) return true;
    }
  }
  return false;
}

function distanceTransform(mask: Uint8Array, w: number, h: number): Float32Array {
  const inf = 1_000_000;
  const dist = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      dist[idx] = mask[idx] ? inf : 0;
    }
  }

  // 3-4 chamfer distance，速度稳定，足够定位等线字体的中轴 ridge。
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (!mask[idx]) continue;
      let best = dist[idx];
      if (x > 0) best = Math.min(best, dist[idx - 1] + 1);
      if (y > 0) best = Math.min(best, dist[idx - w] + 1);
      if (x > 0 && y > 0) best = Math.min(best, dist[idx - w - 1] + Math.SQRT2);
      if (x < w - 1 && y > 0) best = Math.min(best, dist[idx - w + 1] + Math.SQRT2);
      dist[idx] = best;
    }
  }
  for (let y = h - 1; y >= 0; y--) {
    for (let x = w - 1; x >= 0; x--) {
      const idx = y * w + x;
      if (!mask[idx]) continue;
      let best = dist[idx];
      if (x < w - 1) best = Math.min(best, dist[idx + 1] + 1);
      if (y < h - 1) best = Math.min(best, dist[idx + w] + 1);
      if (x < w - 1 && y < h - 1) best = Math.min(best, dist[idx + w + 1] + Math.SQRT2);
      if (x > 0 && y < h - 1) best = Math.min(best, dist[idx + w - 1] + Math.SQRT2);
      dist[idx] = best;
    }
  }
  return dist;
}

function buildRidgeMask(mask: Uint8Array, dist: Float32Array, w: number, h: number): Uint8Array {
  const ridge = new Uint8Array(w * h);
  const axes = [
    [[1, 0], [-1, 0]],
    [[0, 1], [0, -1]],
    [[1, 1], [-1, -1]],
    [[1, -1], [-1, 1]],
  ] as const;

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      if (!mask[idx]) continue;
      const d = dist[idx];
      if (d < 1.6) continue;

      let ridgeAxes = 0;
      let maxAround = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          maxAround = Math.max(maxAround, dist[(y + dy) * w + x + dx]);
        }
      }
      for (const [[ax, ay], [bx, by]] of axes) {
        const da = dist[(y + ay) * w + x + ax];
        const db = dist[(y + by) * w + x + bx];
        if (d >= da - 0.25 && d >= db - 0.25 && (d > da + 0.01 || d > db + 0.01 || d >= maxAround - 0.1)) {
          ridgeAxes++;
        }
      }

      // 边界附近一律不要；内部的局部高线才是最大圆圆心候选。
      if (ridgeAxes >= 1 && !hasBackgroundNeighbor(mask, x, y, w, h)) ridge[idx] = 1;
    }
  }

  zhangSuen(ridge, w, h);
  pruneSpurs(ridge, w, h, 5);
  return ridge;
}

function pruneSpurs(mask: Uint8Array, w: number, h: number, iterations: number) {
  for (let pass = 0; pass < iterations; pass++) {
    const remove: number[] = [];
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        if (!mask[idx]) continue;
        if (neighbors8(mask, x, y, w, h).length <= 1) remove.push(idx);
      }
    }
    if (remove.length === 0) break;
    for (const idx of remove) mask[idx] = 0;
  }
}

/** Zhang-Suen 二值图细化算法 */
function zhangSuen(mask: Uint8Array, w: number, h: number) {
  let changed = true;
  while (changed) {
    changed = false;
    for (let pass = 0; pass < 2; pass++) {
      const toRemove: number[] = [];
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = y * w + x;
          if (mask[idx] !== 1) continue;
          const p2 = mask[(y - 1) * w + x];
          const p3 = mask[(y - 1) * w + x + 1];
          const p4 = mask[y * w + x + 1];
          const p5 = mask[(y + 1) * w + x + 1];
          const p6 = mask[(y + 1) * w + x];
          const p7 = mask[(y + 1) * w + x - 1];
          const p8 = mask[y * w + x - 1];
          const p9 = mask[(y - 1) * w + x - 1];
          const B = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
          if (B < 2 || B > 6) continue;
          // A = 数环绕 0->1 转换数
          let A = 0;
          if (p2 === 0 && p3 === 1) A++;
          if (p3 === 0 && p4 === 1) A++;
          if (p4 === 0 && p5 === 1) A++;
          if (p5 === 0 && p6 === 1) A++;
          if (p6 === 0 && p7 === 1) A++;
          if (p7 === 0 && p8 === 1) A++;
          if (p8 === 0 && p9 === 1) A++;
          if (p9 === 0 && p2 === 1) A++;
          if (A !== 1) continue;
          if (pass === 0) {
            if (p2 * p4 * p6 !== 0) continue;
            if (p4 * p6 * p8 !== 0) continue;
          } else {
            if (p2 * p4 * p8 !== 0) continue;
            if (p2 * p6 * p8 !== 0) continue;
          }
          toRemove.push(idx);
        }
      }
      for (const i of toRemove) mask[i] = 0;
      if (toRemove.length > 0) changed = true;
    }
  }
}

/** 把 1px 骨架追踪成多段 polyline */
function traceSkeleton(mask: Uint8Array, w: number, h: number): Array<Array<[number, number]>> {
  const visited = new Uint8Array(w * h);
  const polylines: Array<Array<[number, number]>> = [];

  // 检查像素是否还有未访问的邻居
  function unvisitedNeighbors(x: number, y: number): Array<[number, number]> {
    return neighbors8(mask, x, y, w, h).filter(([nx, ny]) => !visited[ny * w + nx]);
  }

  // 计算骨架像素的邻居数（不计 visited 状态）
  function deg(x: number, y: number): number {
    return neighbors8(mask, x, y, w, h).length;
  }

  // 收集所有"端点"（度=1）作为起始种子
  const seeds: Array<[number, number]> = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (mask[y * w + x] === 1 && deg(x, y) === 1) {
        seeds.push([x, y]);
      }
    }
  }
  // 没有端点（纯环）时，取任意一点
  if (seeds.length === 0) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (mask[y * w + x] === 1) {
          seeds.push([x, y]);
          break;
        }
      }
      if (seeds.length > 0) break;
    }
  }

  for (const [sx, sy] of seeds) {
    if (visited[sy * w + sx]) continue;
    const line: Array<[number, number]> = [];
    let x = sx;
    let y = sy;
    while (true) {
      line.push([x, y]);
      visited[y * w + x] = 1;
      const nbrs = unvisitedNeighbors(x, y);
      if (nbrs.length === 0) break;
      // 取第一个未访问邻居（粗略沿当前方向延伸）
      [x, y] = nbrs[0];
    }
    if (line.length > 6) polylines.push(line);
  }

  // 处理剩余孤立段（中间分支）
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (mask[y * w + x] === 1 && !visited[y * w + x]) {
        const line: Array<[number, number]> = [];
        let cx = x;
        let cy = y;
        while (true) {
          line.push([cx, cy]);
          visited[cy * w + cx] = 1;
          const nbrs = unvisitedNeighbors(cx, cy);
          if (nbrs.length === 0) break;
          [cx, cy] = nbrs[0];
        }
        if (line.length > 6) polylines.push(line);
      }
    }
  }

  return polylines;
}

/** Douglas-Peucker 简化折线 */
function simplify(line: Array<[number, number]>, tol: number): Array<[number, number]> {
  if (line.length < 3) return line.slice();
  const sqTol = tol * tol;

  function distSq(p: [number, number], a: [number, number], b: [number, number]): number {
    const x = a[0];
    const y = a[1];
    let dx = b[0] - x;
    let dy = b[1] - y;
    if (dx === 0 && dy === 0) {
      const dx2 = p[0] - x;
      const dy2 = p[1] - y;
      return dx2 * dx2 + dy2 * dy2;
    }
    const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
    let ax: number;
    let ay: number;
    if (t < 0) { ax = x; ay = y; }
    else if (t > 1) { ax = b[0]; ay = b[1]; }
    else { ax = x + dx * t; ay = y + dy * t; }
    dx = p[0] - ax;
    dy = p[1] - ay;
    return dx * dx + dy * dy;
  }

  function dp(start: number, end: number, keep: boolean[]) {
    let maxSq = 0;
    let idx = -1;
    for (let i = start + 1; i < end; i++) {
      const d = distSq(line[i], line[start], line[end]);
      if (d > maxSq) {
        maxSq = d;
        idx = i;
      }
    }
    if (maxSq > sqTol && idx > 0) {
      keep[idx] = true;
      dp(start, idx, keep);
      dp(idx, end, keep);
    }
  }

  const keep = new Array<boolean>(line.length).fill(false);
  keep[0] = true;
  keep[line.length - 1] = true;
  dp(0, line.length - 1, keep);
  const out: Array<[number, number]> = [];
  for (let i = 0; i < line.length; i++) if (keep[i]) out.push(line[i]);
  return out;
}

interface BuildOptions {
  pathDataD: string;
  bbox: Bbox;
}

/**
 * 用字体 path 渲染、提取骨架。
 * pathDataD 是 opentype 的字体 SVG path data，bbox 是它的边界
 */
export function buildSkeleton(opts: BuildOptions): Skeleton {
  const { pathDataD, bbox } = opts;
  const w0 = bbox.x2 - bbox.x1;
  const h0 = bbox.y2 - bbox.y1;
  if (w0 <= 0 || h0 <= 0) return { paths: [], viewBox: { x: 0, y: 0, w: 100, h: 100 } };
  const pad = Math.max(w0, h0) * 0.08;

  const cw = RES;
  const ch = Math.max(32, Math.round((RES * h0) / w0));
  const canvas = typeof document !== "undefined" ? document.createElement("canvas") : null;
  if (!canvas) return { paths: [], viewBox: { x: bbox.x1 - pad, y: bbox.y1 - pad, w: w0 + pad * 2, h: h0 + pad * 2 } };
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { paths: [], viewBox: { x: bbox.x1 - pad, y: bbox.y1 - pad, w: w0 + pad * 2, h: h0 + pad * 2 } };

  // 像素坐标 ↔ 字体坐标 的转换
  const scale = (cw * 0.92) / w0;
  const offsetX = (cw - w0 * scale) / 2 - bbox.x1 * scale;
  const offsetY = (ch - h0 * scale) / 2 - bbox.y1 * scale;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, cw, ch);
  ctx.fillStyle = "#000";
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);
  const path2d = new Path2D(pathDataD);
  ctx.fill(path2d);
  ctx.restore();

  const img = ctx.getImageData(0, 0, cw, ch);
  const mask = new Uint8Array(cw * ch);
  for (let i = 0; i < cw * ch; i++) {
    // alpha 应该是 255，但用 R 通道判断（背景白 = 255，笔画黑 = 0）
    mask[i] = img.data[i * 4] < 128 ? 1 : 0;
  }

  const dist = distanceTransform(mask, cw, ch);
  const ridgeMask = buildRidgeMask(mask, dist, cw, ch);
  const polylines = traceSkeleton(ridgeMask, cw, ch);

  // 简化 + 映射回字体坐标
  const paths = polylines
    .map((line) => simplify(line, 1.4))
    .filter((line) => line.length >= 2)
    .map((line) => {
      const pts = line.map(([px, py]) => {
        const x = (px - offsetX) / scale;
        const y = (py - offsetY) / scale;
        return [x, y] as [number, number];
      });
      let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
      for (let i = 1; i < pts.length; i++) {
        d += ` L ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)}`;
      }
      return d;
    });

  return {
    paths,
    viewBox: { x: bbox.x1 - pad, y: bbox.y1 - pad, w: w0 + pad * 2, h: h0 + pad * 2 },
  };
}
