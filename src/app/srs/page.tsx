"use client";
import { useMemo, useState } from "react";
import { CONSONANTS } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import PronounceButton from "@/components/PronounceButton";
import {
  Outcome,
  deriveScore,
  dueIds,
  getRecord,
  recordOutcome,
  useMasteryStore,
} from "@/lib/mastery";
import {
  consonantPhonetic,
  consonantSpeak,
  displayRoman,
  vowelPhonetic,
  vowelSpeak,
} from "@/lib/study";
import { feedbackCorrect, feedbackReveal, feedbackTap, feedbackWrong } from "@/lib/feedback";
import { speak } from "@/lib/tts";

type Pool = "consonant" | "vowel" | "both";

interface MemoryItem {
  id: string;
  front: string;
  back: string;
  speak: string;
  phonetic: string;
  pool: "consonant" | "vowel";
}

function buildAllItems(): MemoryItem[] {
  const cons: MemoryItem[] = CONSONANTS.filter((c) => !c.obsolete).map((c) => ({
    id: `c:${c.id}`,
    front: c.letter,
    back: `${displayRoman(c.romanInitial)} · ${c.name} (${c.meaning})`,
    speak: consonantSpeak(c),
    phonetic: consonantPhonetic(c),
    pool: "consonant",
  }));
  const vows: MemoryItem[] = VOWELS.map((v) => ({
    id: `v:${v.id}`,
    front: v.display,
    back: `${v.roman} · ${v.length === "long" ? "长" : "短"}${v.notes ? " · " + v.notes : ""}`,
    speak: vowelSpeak(v),
    phonetic: vowelPhonetic(v),
    pool: "vowel",
  }));
  return [...cons, ...vows];
}

export default function SrsPage() {
  const items = useMemo(buildAllItems, []);
  const itemById = useMemo(() => Object.fromEntries(items.map((i) => [i.id, i])), [items]);
  const [pool, setPool] = useState<Pool>("consonant");
  const [peeked, setPeeked] = useState(false);
  const store = useMasteryStore();

  // 候选：本池所有字母；优先级 = 已到期 → 没碰过 → 按 score 升序
  const queue = useMemo(() => {
    const inPool = items.filter((it) => pool === "both" || it.pool === pool);
    const due = dueIds().filter((id) => itemById[id] && (pool === "both" || itemById[id].pool === pool));
    const dueSet = new Set(due);
    const fresh = inPool.filter((it) => !store[it.id] || (store[it.id]?.attempts ?? 0) === 0);
    const others = inPool
      .filter((it) => !dueSet.has(it.id) && (store[it.id]?.attempts ?? 0) > 0)
      .sort((a, b) => deriveScore(store[a.id]) - deriveScore(store[b.id]));
    return [...due.map((id) => itemById[id]).filter(Boolean), ...fresh, ...others];
  }, [items, pool, store, itemById]);

  const item = queue[0];

  function grade(out: Outcome) {
    if (!item) return;
    // 偷听过 → "correct" 降级为 "hard"
    const effective: Outcome = peeked && out === "correct" ? "hard" : out;
    recordOutcome(item.id, effective);
    if (effective === "correct") feedbackCorrect();
    else if (effective === "hard") feedbackTap();
    else feedbackWrong();
    setPeeked(false);
  }

  const totalInPool = items.filter((it) => pool === "both" || it.pool === pool).length;
  const dueCount = useMemo(
    () => dueIds().filter((id) => itemById[id] && (pool === "both" || itemById[id].pool === pool)).length,
    [itemById, pool, store] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const learnedCount = items.filter(
    (it) => (pool === "both" || it.pool === pool) && deriveScore(store[it.id]) >= 60
  ).length;

  const score = item ? deriveScore(getRecord(item.id)) : 0;
  const record = item ? getRecord(item.id) : null;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["consonant", "vowel", "both"] as Pool[]).map((p) => (
          <button
            key={p}
            onClick={() => setPool(p)}
            className={pool === p ? "btn-primary px-4" : "btn-ghost px-4"}
          >
            {p === "consonant" ? "辅音" : p === "vowel" ? "元音" : "全部"}
          </button>
        ))}
      </div>

      <div className="card-soft grid grid-cols-3 gap-2 p-3 text-center text-xs">
        <div>
          <div className="opacity-70">到期</div>
          <div className="text-base font-extrabold" style={{ color: "var(--duo-orange)" }}>
            {dueCount}
          </div>
        </div>
        <div>
          <div className="opacity-70">已掌握</div>
          <div className="text-base font-extrabold" style={{ color: "var(--duo-green)" }}>
            {learnedCount} / {totalInPool}
          </div>
        </div>
        <div>
          <div className="opacity-70">本字熟练度</div>
          <div className="text-base font-extrabold" style={{ color: "var(--duo-blue)" }}>
            {score}
          </div>
        </div>
      </div>

      {!item ? (
        <div className="card-soft animate-pop p-8 text-center">
          <div className="text-6xl">🎉</div>
          <div className="mt-3 text-lg font-extrabold" style={{ color: "var(--duo-green)" }}>
            全部学完啦
          </div>
          <div className="mt-1 text-xs opacity-70">稍后再来，或切换其他卡组</div>
        </div>
      ) : (
        <>
          <div className="card-soft animate-pop flex flex-col items-center p-8">
            <div className="chip chip-low">记忆 · 不偷看答案</div>
            <div className="thai-big mt-4 text-8xl leading-none">{item.front}</div>
            {!peeked ? (
              <button
                className="btn-ghost mt-5 px-5 text-xs"
                onClick={() => {
                  setPeeked(true);
                  feedbackReveal();
                  speak(item.speak);
                }}
              >
                🔊 偷听一下（&ldquo;认识&rdquo; 会被降为 &ldquo;模糊&rdquo;）
              </button>
            ) : (
              <div className="mt-5 space-y-1 text-center">
                <div className="font-mono text-sm" style={{ color: "var(--duo-blue)" }}>
                  🔊 应念: {item.phonetic}
                </div>
                <div>
                  <PronounceButton text={item.speak} label="🔊 再听" />
                </div>
              </div>
            )}
            {record && record.attempts > 0 && (
              <div className="mt-4 flex gap-3 text-[11px] opacity-70">
                <span>答过 {record.attempts}</span>
                <span>对 {record.correct}</span>
                {record.reps > 0 && <span>连对 {record.reps}</span>}
                {record.lapses > 0 && <span>翻车 {record.lapses}</span>}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => grade("wrong")} className="btn-red">
              不认识
            </button>
            <button onClick={() => grade("hard")} className="btn-orange">
              模糊
            </button>
            <button
              onClick={() => grade("correct")}
              className="btn-primary"
              disabled={peeked}
            >
              {peeked ? "认识 (已封顶)" : "认识 ✓"}
            </button>
          </div>
          {peeked && (
            <div
              className="mt-3 rounded-2xl px-4 py-2 text-center text-sm font-bold animate-pop"
              style={{ background: "rgba(28,176,246,0.1)", color: "var(--duo-blue)" }}
            >
              {item.back}
            </div>
          )}
        </>
      )}
    </div>
  );
}
