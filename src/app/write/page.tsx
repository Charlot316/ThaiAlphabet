"use client";
import { useMemo, useState } from "react";
import { CONSONANTS } from "@/data/consonants";
import PronounceButton from "@/components/PronounceButton";
import TraceSvg from "@/components/TraceSvg";
import { consonantPhonetic, consonantSpeak } from "@/lib/study";
import { addMastery } from "@/lib/mastery";

export default function WritePage() {
  const items = useMemo(() => CONSONANTS.filter((c) => !c.obsolete), []);
  const [idx, setIdx] = useState(0);
  const c = items[idx];

  function next() {
    setIdx((i) => (i + 1) % items.length);
  }
  function prev() {
    setIdx((i) => (i - 1 + items.length) % items.length);
  }

  return (
    <div className="space-y-3">
      <div className="card-soft flex flex-col items-center p-4">
        <div className="text-xs opacity-60">描红：拖小球沿轮廓走</div>
        <div className="thai-big mt-1 text-2xl">
          {c.letter} <span className="opacity-60">· {c.name}</span>
          <span className="opacity-50"> ({c.meaning})</span>
        </div>
        <div className="mt-1 font-mono text-[11px]" style={{ color: "var(--duo-blue)" }}>
          🔊 应念: {consonantPhonetic(c)}
        </div>
        <div className="mt-2">
          <PronounceButton text={consonantSpeak(c)} label="🔊 听" />
        </div>
      </div>

      <TraceSvg
        key={c.id}
        letter={c.letter}
        onComplete={() => addMastery(`c:${c.id}`, 1)}
      />

      <div className="flex justify-between gap-2">
        <button onClick={prev} className="btn-ghost flex-1">
          ‹ 上一个
        </button>
        <button onClick={next} className="btn-primary flex-1">
          下一个 ›
        </button>
      </div>
    </div>
  );
}
