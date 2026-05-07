"use client";
import { useEffect, useMemo, useState } from "react";
import { CONSONANTS } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import PronounceButton from "@/components/PronounceButton";
import { Grade, SrsCard, dueCards, loadDeck, newCard, review, saveDeck } from "@/lib/srs";
import { addMastery } from "@/lib/mastery";
import { displayRoman } from "@/lib/study";

const DECK_KEY = "thai-alphabet:srs:v1";

type Pool = "consonant" | "vowel" | "both";

function buildAllItems() {
  const cons = CONSONANTS.filter((c) => !c.obsolete).map((c) => ({
    id: `c:${c.id}`,
    front: c.letter,
    back: `${displayRoman(c.romanInitial)} · ${c.name} (${c.meaning})`,
    speak: `${c.letter} ${c.name}`,
    pool: "consonant" as const,
  }));
  const vows = VOWELS.map((v) => ({
    id: `v:${v.id}`,
    front: v.display,
    back: `${v.roman} · ${v.length === "long" ? "长" : "短"}${v.notes ? " · " + v.notes : ""}`,
    speak: v.display.replace(/◌/g, "อ"),
    pool: "vowel" as const,
  }));
  return [...cons, ...vows];
}

export default function SrsPage() {
  const items = useMemo(buildAllItems, []);
  const itemById = useMemo(() => Object.fromEntries(items.map((i) => [i.id, i])), [items]);
  const [pool, setPool] = useState<Pool>("consonant");
  const [deck, setDeck] = useState<SrsCard[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = loadDeck(DECK_KEY);
    const filtered = stored.filter((c) => itemById[c.id]);
    // 自动加入新卡
    const present = new Set(filtered.map((c) => c.id));
    const candidates = items
      .filter((i) => pool === "both" || i.pool === pool)
      .filter((i) => !present.has(i.id))
      .map((i) => newCard(i.id));
    setDeck([...filtered, ...candidates]);
  }, [pool, items, itemById]);

  useEffect(() => {
    if (deck.length) saveDeck(DECK_KEY, deck);
  }, [deck]);

  const filtered = deck.filter((c) => {
    const it = itemById[c.id];
    return it && (pool === "both" || it.pool === pool);
  });
  const due = dueCards(filtered);
  const current = due[0];
  const item = current ? itemById[current.id] : null;

  function grade(g: Grade) {
    if (!current) return;
    const updated = review(current, g);
    if (g === "good") addMastery(current.id, 1);
    if (g === "again") addMastery(current.id, -1);
    setDeck((d) => d.map((c) => (c.id === current.id ? updated : c)));
    setShow(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["consonant", "vowel", "both"] as Pool[]).map((p) => (
          <button
            key={p}
            onClick={() => setPool(p)}
            className={pool === p ? "btn-primary text-sm py-2 px-3" : "btn-ghost text-sm py-2 px-3"}
          >
            {p === "consonant" ? "辅音" : p === "vowel" ? "元音" : "全部"}
          </button>
        ))}
      </div>
      <div className="text-xs opacity-70">
        到期 {due.length} · 总卡 {filtered.length}
      </div>

      {!item ? (
        <div className="card p-6 text-center">
          <div className="text-2xl mb-2">🎉</div>
          <div>暂时没有到期卡片</div>
          <div className="text-xs opacity-70 mt-1">稍后再来，或切换其他卡组</div>
        </div>
      ) : (
        <>
          <div className="card p-8 flex flex-col items-center">
            <div className="thai-big text-7xl leading-none">{item.front}</div>
            <div className="mt-3"><PronounceButton text={item.speak} label="🔊 听" /></div>
            <button
              className="mt-4 btn-ghost text-sm py-2 px-4"
              onClick={() => setShow((s) => !s)}
            >
              {show ? "隐藏答案" : "显示答案"}
            </button>
            {show && (
              <div className="mt-4 text-center">
                <div className="text-sm">{item.back}</div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => grade("again")} className="btn-ghost ring-1 ring-rose-300">不知道</button>
            <button onClick={() => grade("hard")} className="btn-ghost ring-1 ring-amber-300">模糊</button>
            <button onClick={() => grade("good")} className="btn-primary">知道</button>
          </div>
        </>
      )}
    </div>
  );
}
