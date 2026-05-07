"use client";

// 用 opentype.js 加载 Noto Sans Thai 字体，得到每个字母的 SVG path 数据
// 用于书写描红「沿轮廓拖小球」交互。
//
// 注意：opentype.js 的 .load() 在 Next.js 浏览器构建里偶尔解析不到正确的导出
// （Node fs 路径和浏览器 fetch 路径混淆），改成手动 fetch ArrayBuffer + parse 最稳。

import type { Font } from "opentype.js";

const FONT_URL = "/fonts/NotoSansThaiLooped.ttf";

let cachedFont: Font | null = null;
let pending: Promise<Font> | null = null;

interface OpentypeNS {
  parse: (buffer: ArrayBuffer) => Font;
  load?: (url: string) => Promise<Font>;
}

export async function loadThaiFont(): Promise<Font> {
  if (cachedFont) return cachedFont;
  if (pending) return pending;
  pending = (async () => {
    const res = await fetch(FONT_URL);
    if (!res.ok) {
      throw new Error(`字体下载失败 HTTP ${res.status}`);
    }
    const buf = await res.arrayBuffer();
    const mod = await import("opentype.js");
    const ot = ((mod as unknown as { default?: OpentypeNS }).default ?? (mod as unknown as OpentypeNS));
    if (typeof ot.parse !== "function") {
      throw new Error("opentype.js 模块格式异常（缺少 parse）");
    }
    const font = ot.parse(buf);
    cachedFont = font;
    return font;
  })();
  return pending;
}

export interface LetterPath {
  d: string;
  bbox: { x1: number; y1: number; x2: number; y2: number };
}

export async function letterPath(letter: string, fontSize = 240): Promise<LetterPath> {
  const font = await loadThaiFont();
  const path = font.getPath(letter, 0, 0, fontSize);
  const bbox = path.getBoundingBox();
  return {
    d: path.toPathData(2),
    bbox: { x1: bbox.x1, y1: bbox.y1, x2: bbox.x2, y2: bbox.y2 },
  };
}

import { Skeleton, buildSkeleton } from "./skeleton";

const skeletonCache = new Map<string, Skeleton>();

/** 提取字母中线骨架（缓存）。返回的 paths 是字体坐标系下的多段中线 SVG path data */
export async function letterSkeleton(letter: string, fontSize = 240): Promise<Skeleton & {
  outline: string;
}> {
  const cacheKey = `${letter}@${fontSize}`;
  const fontPath = await letterPath(letter, fontSize);
  let skel = skeletonCache.get(cacheKey);
  if (!skel) {
    skel = buildSkeleton({ pathDataD: fontPath.d, bbox: fontPath.bbox });
    skeletonCache.set(cacheKey, skel);
  }
  return { ...skel, outline: fontPath.d };
}
