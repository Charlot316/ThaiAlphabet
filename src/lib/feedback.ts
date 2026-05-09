"use client";

// 触感（震动）+ 音效。
// 注意：iOS Safari 不支持 navigator.vibrate（Apple 至今未实现 Web Vibration API）。
// 因此 iOS 上只会播放音效；Android Chrome / Firefox 等会震动。
// 不依赖音频文件 — 用 Web Audio API 即时合成。

const PREFS_KEY = "thai-alphabet:feedback-prefs:v1";

interface Prefs {
  sound: boolean;
  haptic: boolean;
}

function loadPrefs(): Prefs {
  if (typeof window === "undefined") return { sound: true, haptic: true };
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return { sound: true, haptic: true };
    return { sound: true, haptic: true, ...(JSON.parse(raw) as Partial<Prefs>) };
  } catch {
    return { sound: true, haptic: true };
  }
}
function savePrefs(p: Prefs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREFS_KEY, JSON.stringify(p));
}

export function getFeedbackPrefs(): Prefs {
  return loadPrefs();
}
export function setFeedbackPrefs(p: Partial<Prefs>) {
  savePrefs({ ...loadPrefs(), ...p });
}

// 单例 AudioContext —— 必须在用户手势中创建（点击答案算手势）
let audioCtx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (audioCtx) {
    if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
    return audioCtx;
  }
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  try {
    audioCtx = new Ctor();
  } catch {
    return null;
  }
  return audioCtx;
}

interface Tone {
  freq: number;     // Hz
  duration: number; // ms
  startAt?: number; // s 偏移
  type?: OscillatorType;
  gain?: number;
}

function playSequence(tones: Tone[]) {
  const prefs = loadPrefs();
  if (!prefs.sound) return;
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  for (const t of tones) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = t.type ?? "sine";
    osc.frequency.value = t.freq;
    const start = now + (t.startAt ?? 0);
    const dur = t.duration / 1000;
    const peak = t.gain ?? 0.18;
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(peak, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }
}

function vibrate(pattern: number | number[]) {
  const prefs = loadPrefs();
  if (!prefs.haptic) return;
  if (typeof navigator === "undefined") return;
  if (typeof navigator.vibrate !== "function") return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* no-op */
  }
}

// === 公共反馈 ===

/** 答对：上扬两音 + 一次轻震 */
export function feedbackCorrect() {
  playSequence([
    { freq: 660, duration: 90, startAt: 0, type: "triangle", gain: 0.16 },
    { freq: 988, duration: 160, startAt: 0.08, type: "triangle", gain: 0.18 },
  ]);
  vibrate(20);
}

/** 答错：低音 + 短抖动震动 */
export function feedbackWrong() {
  playSequence([
    { freq: 220, duration: 140, startAt: 0, type: "square", gain: 0.12 },
    { freq: 165, duration: 220, startAt: 0.06, type: "square", gain: 0.12 },
  ]);
  vibrate([30, 40, 30]);
}

/** 完成一轮：连续上扬三音 + 中等震 */
export function feedbackComplete() {
  playSequence([
    { freq: 523, duration: 90, startAt: 0, type: "triangle", gain: 0.18 },
    { freq: 659, duration: 90, startAt: 0.1, type: "triangle", gain: 0.18 },
    { freq: 880, duration: 200, startAt: 0.2, type: "triangle", gain: 0.2 },
  ]);
  vibrate([15, 30, 15, 30, 30]);
}

/** 轻点击/翻页 */
export function feedbackTap() {
  playSequence([
    { freq: 1200, duration: 35, startAt: 0, type: "sine", gain: 0.07 },
  ]);
  vibrate(8);
}

/** 配对成功：明亮的双音叮咚 */
export function feedbackMatch() {
  playSequence([
    { freq: 880, duration: 80, startAt: 0, type: "triangle", gain: 0.16 },
    { freq: 1318, duration: 140, startAt: 0.06, type: "triangle", gain: 0.18 },
  ]);
  vibrate([10, 10, 10]);
}

/** 配对失败：低沉短促 */
export function feedbackMismatch() {
  playSequence([
    { freq: 196, duration: 90, startAt: 0, type: "square", gain: 0.13 },
    { freq: 147, duration: 140, startAt: 0.05, type: "square", gain: 0.12 },
  ]);
  vibrate([25, 25]);
}

/** 连击：随等级越高音越亮，可叠出 fanfare 感 */
export function feedbackCombo(level: number) {
  const base = 523; // C5
  const step = Math.min(level, 12);
  const tones: Tone[] = [];
  for (let i = 0; i <= Math.min(step, 4); i++) {
    tones.push({
      freq: base * Math.pow(2, (step + i) / 12),
      duration: 80 + i * 20,
      startAt: i * 0.05,
      type: "triangle",
      gain: 0.14 + Math.min(0.06, level * 0.005),
    });
  }
  playSequence(tones);
  vibrate(12 + Math.min(28, level * 2));
}

/** 翻面/选择 — 中性的悬念音 */
export function feedbackReveal() {
  playSequence([
    { freq: 392, duration: 70, startAt: 0, type: "sine", gain: 0.12 },
    { freq: 523, duration: 110, startAt: 0.05, type: "sine", gain: 0.13 },
  ]);
  vibrate(10);
}
