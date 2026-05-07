// 手工录入的泰语字母笔画数据
// 每个字母由若干笔画组成，按书写顺序排列。
// 笔画的 d 是 SVG path data，坐标在统一的 viewBox 0 0 100 100 中
// （以字符 bbox 为基准缩放到 0-100，左右各预留 ~5% 边距由编辑器自动处理）。
//
// 录入工具：/strokes-editor —— 打开后按教材笔顺点关键点即可。

export interface LetterStrokes {
  /** 笔画列表，按书写顺序 */
  strokes: { d: string }[];
  /** 录入版本，每次大改递增 */
  v: number;
}

/**
 * 录入数据。空的字母会自动 fallback 到 skeleton 算法。
 * 你可以分多次录入，每次完成一个字母后从编辑器导出粘贴到这里。
 */
export const LETTER_STROKES: Record<string, LetterStrokes> = {
  // 例子（可删）
  // "ก": { v: 1, strokes: [{ d: "M 30 30 Q 25 25 28 22 ..." }, { d: "..." }] },
};

export function getLetterStrokes(letter: string): LetterStrokes | null {
  return LETTER_STROKES[letter] ?? null;
}
