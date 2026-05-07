// 手工确认后的泰语字母 / 元音笔画数据
// 录入工具：/strokes-editor
//
// Key 规则：
//   - 辅音：单字符，如 "ก"、"ข"、"ฮ"
//   - 元音：以 "v:" 开头，后接 vowel.id，如 "v:a-long"、"v:e-short"
//
// 每个字母由若干笔画组成，按书写顺序排列。
// 笔画的 d 是 SVG path data，坐标在统一的 viewBox 0 0 100 100 中。

export type Stroke = { d: string };

export interface LetterStrokes {
  /** 录入版本，每次大改递增 */
  v: number;
  /** 笔画列表，按书写顺序 */
  strokes: Stroke[];
}

export const LETTER_STROKES: Record<string, LetterStrokes> = {};

export function consonantStrokeKey(letter: string): string {
  return letter;
}

export function vowelStrokeKey(vowelId: string): string {
  return `v:${vowelId}`;
}

export function getLetterStrokes(key: string): LetterStrokes | null {
  return LETTER_STROKES[key] ?? null;
}
