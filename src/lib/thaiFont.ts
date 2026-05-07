"use client";

// 用 opentype.js 加载 Noto Sans Thai 字体，得到每个字母的 SVG path 数据
// 用于书写描红「沿轮廓拖小球」交互。

import type { Font } from "opentype.js";

const FONT_URL = "/fonts/NotoSansThai.ttf";

let cachedFont: Font | null = null;
let pending: Promise<Font> | null = null;

export async function loadThaiFont(): Promise<Font> {
  if (cachedFont) return cachedFont;
  if (pending) return pending;
  pending = (async () => {
    const opentype = await import("opentype.js");
    const loader = (opentype as unknown as { default?: typeof opentype }).default || opentype;
    const font: Font = await loader.load(FONT_URL);
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
