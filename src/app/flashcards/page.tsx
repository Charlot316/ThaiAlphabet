"use client";
import { useEffect, useMemo, useState } from "react";
import PronounceButton from "@/components/PronounceButton";
import { speak, warmupVoices } from "@/lib/tts";
import { StudyPool, buildStudyItems, displayRoman, filterStudyItems, shuffleStrong } from "@/lib/study";

const LAST_ORDER_KEY = "thai-alphabet:flashcards-last-order:v1";

function poolLabel(pool: StudyPool) {
  if (pool === "consonant") return "辅音";
  if (pool === "vowel") return "元音";
  return "全部";
}

export default function FlashcardsPage() {
  const allItems = useMemo(buildStudyItems, []);
  const [pool, setPool] = useState<StudyPool>("consonant");
  const [order, setOrder] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  const items = useMemo(() => filterStudyItems(allItems, pool), [allItems, pool]);
  const itemById = useMemo(() => Object.fromEntries(items.map((item) => [item.id, item])), [items]);
  const current = order.length ? itemById[order[index]] : null;

  function reshuffle(startAt = 0) {
    const stamp = `${Date.now()}:${performance.now()}:${Math.random()}`;
    const salted = shuffleStrong(items.map((item) => ({ item, salt: `${stamp}:${item.id}` })));
    let next = shuffleStrong(salted).map(({ item }) => item.id);
    const last = window.localStorage.getItem(`${LAST_ORDER_KEY}:${pool}`);
    if (last === JSON.stringify(next) && next.length > 1) {
      next = [next[1], next[0], ...next.slice(2)];
    }
    window.localStorage.setItem(`${LAST_ORDER_KEY}:${pool}`, JSON.stringify(next));
    setOrder(next);
    setIndex(Math.min(startAt, Math.max(0, next.length - 1)));
  }

  useEffect(() => {
    reshuffle(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, items.length]);

  useEffect(() => {
    warmupVoices();
  }, []);

  useEffect(() => {
    if (current) speak(current.speak);
  }, [current]);

  function next() {
    if (index >= order.length - 1) {
      reshuffle(0);
      return;
    }
    setIndex((value) => value + 1);
  }

  function previous() {
    setIndex((value) => Math.max(0, value - 1));
  }

  return (
    <div className="space-y-4">
      <section className="card-soft p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-extrabold">⚡ Flashcard 速看</h1>
            <p className="mt-0.5 text-xs opacity-70">打开页面会重新洗牌，答案直接显示</p>
          </div>
          <button onClick={() => reshuffle(0)} className="btn-ghost px-3 py-2 text-xs">
            🔀 重新洗牌
          </button>
        </div>
      </section>

      <div className="flex gap-2">
        {(["consonant", "vowel", "both"] as StudyPool[]).map((nextPool) => (
          <button
            key={nextPool}
            onClick={() => setPool(nextPool)}
            className={pool === nextPool ? "btn-primary px-4" : "btn-ghost px-4"}
          >
            {poolLabel(nextPool)}
          </button>
        ))}
      </div>

      {current && (
        <div
          key={current.id}
          className="card-soft animate-pop flex min-h-[360px] flex-col items-center justify-center p-8 text-center"
        >
          <div className="chip chip-blue mb-3">
            {index + 1} / {order.length || items.length}
          </div>
          <div className="thai-big mt-2 text-8xl leading-none">{current.front}</div>
          <div className="mt-5 text-2xl font-extrabold" style={{ color: "var(--duo-blue)" }}>
            {displayRoman(current.roman)}
          </div>
          {current.name && <div className="thai-big mt-2 text-xl">{current.name}</div>}
          {current.meaning && <div className="mt-1 text-sm opacity-70">{current.meaning}</div>}
          <div className="mt-5">
            <PronounceButton text={current.speak} label="🔊 听一下" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button onClick={previous} className="btn-ghost">‹ 上一张</button>
        <button onClick={next} className="btn-primary">下一张 ›</button>
      </div>
    </div>
  );
}
