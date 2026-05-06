// 浏览器 Web Speech API 发音（lang=th-TH），无需音频文件
"use client";

let cachedThaiVoice: SpeechSynthesisVoice | null = null;

function pickThaiVoice(): SpeechSynthesisVoice | null {
  if (cachedThaiVoice) return cachedThaiVoice;
  if (typeof window === "undefined") return null;
  const voices = window.speechSynthesis.getVoices();
  const thai = voices.find((v) => v.lang?.toLowerCase().startsWith("th"));
  if (thai) cachedThaiVoice = thai;
  return thai ?? null;
}

export function speak(text: string, opts: { rate?: number } = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "th-TH";
  u.rate = opts.rate ?? 0.9;
  const v = pickThaiVoice();
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

// 部分浏览器需要触发一次事件后语音才加载
export function warmupVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedThaiVoice = null;
    pickThaiVoice();
  };
}
