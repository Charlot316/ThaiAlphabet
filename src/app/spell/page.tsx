"use client";
import { useMemo, useState } from "react";
import { generateSyllable, normalizeAnswer, BuiltSyllable } from "@/lib/syllable";
import { TONE_NAMES } from "@/data/tones";
import { TONE_MARKS } from "@/data/tones";
import PronounceButton from "@/components/PronounceButton";

export default function SpellPage() {
  const [withFinal, setWithFinal] = useState(false);
  const [allowMark, setAllowMark] = useState(true);
  const [syl, setSyl] = useState<BuiltSyllable>(() => generateSyllable({ withFinal: false, allowMark: true }));
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState({ ok: 0, total: 0 });

  function reload() {
    setSyl(generateSyllable({ withFinal, allowMark }));
    setInput("");
    setSubmitted(false);
  }

  const isOk = useMemo(() => {
    if (!submitted) return false;
    return normalizeAnswer(input) === normalizeAnswer(syl.roman);
  }, [submitted, input, syl.roman]);

  function submit() {
    if (!input.trim()) return;
    setSubmitted(true);
    setStats((s) => ({
      ok: s.ok + (normalizeAnswer(input) === normalizeAnswer(syl.roman) ? 1 : 0),
      total: s.total + 1,
    }));
  }

  const markName = TONE_MARKS.find((m) => m.id === syl.toneMark)?.name ?? "—";

  return (
    <div className="space-y-4">
      <div className="card p-3 flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={withFinal} onChange={(e) => setWithFinal(e.target.checked)} />
          含尾辅音
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={allowMark} onChange={(e) => setAllowMark(e.target.checked)} />
          含声调符号
        </label>
        <span className="opacity-70">{stats.ok}/{stats.total}</span>
      </div>

      <div className="card p-6 flex flex-col items-center">
        <div className="text-xs opacity-60 mb-1">读出该音节的罗马音</div>
        <div className="thai-big text-7xl leading-none">{syl.thai}</div>
        <div className="mt-3"><PronounceButton text={syl.thai} label="🔊 听一下" /></div>
      </div>

      <div className="card p-3 space-y-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="输入罗马音 (例如 kàa, mii, lôm)"
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-3 text-base font-mono"
        />
        <div className="flex gap-2">
          {!submitted ? (
            <button onClick={submit} className="btn-primary flex-1">提交</button>
          ) : (
            <button onClick={reload} className="btn-primary flex-1">下一个</button>
          )}
          <button onClick={reload} className="btn-ghost">跳过</button>
        </div>
      </div>

      {submitted && (
        <div className={`card p-4 ${isOk ? "ring-2 ring-emerald-500" : "ring-2 ring-rose-500"}`}>
          <div className="text-sm">
            {isOk ? "✓ 正确" : "✗ 答案"}：<b className="font-mono">{syl.roman}</b>
          </div>
          <ul className="mt-2 text-sm space-y-1">
            <li>初辅音：<span className="thai-big">{syl.initial.letter}</span> <span className="opacity-70">({syl.initial.romanInitial}, {syl.initial.class === "mid" ? "中" : syl.initial.class === "high" ? "高" : "低"})</span></li>
            <li>元音：<span className="thai-big">{syl.vowel.display}</span> <span className="opacity-70">({syl.vowel.roman}, {syl.vowel.length === "long" ? "长" : "短"})</span></li>
            <li>尾辅音：{syl.finalConsonant ? <><span className="thai-big">{syl.finalConsonant.letter}</span> <span className="opacity-70">→ {syl.finalConsonant.finalSound} 音</span></> : <span className="opacity-70">无</span>}</li>
            <li>声调符号：<span className="thai-big">{markName}</span></li>
            <li>音节性质：{syl.life === "live" ? "活音节 (เป็น)" : "死音节 (ตาย)"}</li>
            <li>声调：<b>{syl.tone}</b> <span className="opacity-70 thai-big">{TONE_NAMES[syl.tone].th}</span></li>
          </ul>
        </div>
      )}
    </div>
  );
}
