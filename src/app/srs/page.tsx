"use client";
import { useEffect, useMemo, useState } from "react";
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

interface ReviewState {
  item: MemoryItem;
  outcome: Outcome;
  pendingCorrect: boolean;
}

function isShortcutBlocked(event: KeyboardEvent): boolean {
  if (event.metaKey || event.ctrlKey || event.altKey) return true;
  const target = event.target;
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

function isSpaceKey(event: KeyboardEvent): boolean {
  return event.key === " " || event.code === "Space";
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
  const [review, setReview] = useState<ReviewState | null>(null);
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
  const activeItem = review?.item ?? item;

  function grade(out: Outcome) {
    if (!item || review) return;
    // 偷听过 → "correct" 降级为 "hard"
    const effective: Outcome = peeked && out === "correct" ? "hard" : out;
    speak(item.speak);
    if (effective === "correct") {
      feedbackCorrect();
      setReview({ item, outcome: effective, pendingCorrect: true });
    } else {
      recordOutcome(item.id, effective);
      if (effective === "hard") feedbackTap();
      else feedbackWrong();
      setReview({ item, outcome: effective, pendingCorrect: false });
    }
    setPeeked(false);
  }

  function continueReview() {
    if (!review) return;
    if (review.pendingCorrect) recordOutcome(review.item.id, "correct");
    setReview(null);
    setPeeked(false);
  }

  function markMistaken() {
    if (!review?.pendingCorrect) return;
    recordOutcome(review.item.id, "wrong");
    feedbackWrong();
    setReview(null);
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

  const score = activeItem ? deriveScore(getRecord(activeItem.id)) : 0;
  const record = activeItem ? getRecord(activeItem.id) : null;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isShortcutBlocked(event) || !activeItem) return;
      if (!review) {
        if (event.repeat) return;
        if (event.key === "1") {
          event.preventDefault();
          grade("wrong");
        } else if (event.key === "2") {
          event.preventDefault();
          grade("hard");
        } else if (event.key === "3" && !peeked) {
          event.preventDefault();
          grade("correct");
        }
        return;
      }

      if (isSpaceKey(event)) {
        event.preventDefault();
        continueReview();
        return;
      }
      if (event.key === "Enter" && review.pendingCorrect) {
        event.preventDefault();
        markMistaken();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 rounded-lg border p-1" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)" }}>
        {(["consonant", "vowel", "both"] as Pool[]).map((p) => (
          <button
            key={p}
            onClick={() => {
              setPool(p);
              setPeeked(false);
              setReview(null);
            }}
            className="btn-ghost px-4"
            style={
              pool === p
                ? {
                    background: "rgba(40, 215, 244, 0.1)",
                    borderColor: "rgba(40, 215, 244, 0.26)",
                    color: "var(--duo-green-d)",
                    boxShadow: "inset 0 -1px 0 var(--duo-green)",
                  }
                : { background: "transparent", borderColor: "transparent" }
            }
          >
            {p === "consonant" ? "辅音" : p === "vowel" ? "元音" : "全部"}
          </button>
        ))}
      </div>

      <div className="card-soft grid grid-cols-3 gap-2 p-4 text-center text-xs">
        <div>
          <div className="opacity-70">到期</div>
          <div className="mt-1 text-xl font-extrabold" style={{ color: "var(--duo-orange)" }}>
            {dueCount}
          </div>
        </div>
        <div>
          <div className="opacity-70">已掌握</div>
          <div className="mt-1 text-xl font-extrabold" style={{ color: "var(--duo-green)" }}>
            {learnedCount} / {totalInPool}
          </div>
        </div>
        <div>
          <div className="opacity-70">本字熟练度</div>
          <div className="mt-1 text-xl font-extrabold" style={{ color: "var(--duo-blue)" }}>
            {score}
          </div>
        </div>
      </div>

      {!activeItem ? (
        <div className="card-soft animate-pop p-8 text-center">
          <div className="text-6xl">🎉</div>
          <div className="mt-3 text-lg font-extrabold" style={{ color: "var(--duo-green)" }}>
            全部学完啦
          </div>
          <div className="mt-1 text-xs opacity-70">稍后再来，或切换其他卡组</div>
        </div>
      ) : (
        <>
          <div
            className="card-soft animate-pop flex min-h-[22rem] flex-col items-center justify-center p-8 text-center"
            style={{
              background:
                "radial-gradient(circle at 50% 18%, rgba(40, 215, 244, 0.11), transparent 16rem), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.008)), var(--duo-card)",
            }}
          >
            <div className="chip chip-low">记忆 · 不偷看答案</div>
            <div className="thai-big mt-5 text-8xl leading-none drop-shadow-[0_0_28px_rgba(40,215,244,0.12)]">{activeItem.front}</div>
            {!peeked && !review ? (
              <button
                className="btn-ghost mt-5 px-5 text-xs"
                onClick={() => {
                  setPeeked(true);
                  feedbackReveal();
                  speak(activeItem.speak);
                }}
              >
                🔊 偷听一下（&ldquo;认识&rdquo; 会被降为 &ldquo;模糊&rdquo;）
              </button>
            ) : (
              <div className="mt-5 space-y-1 text-center">
                <div className="text-2xl font-extrabold" style={{ color: "var(--duo-blue)" }}>
                  {activeItem.phonetic}
                </div>
                <div className="text-sm opacity-80">
                  {activeItem.back}
                </div>
                <div>
                  <PronounceButton text={activeItem.speak} label="🔊 再听" />
                </div>
              </div>
            )}
            {record && record.attempts > 0 && (
              <div className="mt-5 flex flex-wrap justify-center gap-3 text-[11px] opacity-70">
                <span>答过 {record.attempts}</span>
                <span>对 {record.correct}</span>
                {record.reps > 0 && <span>连对 {record.reps}</span>}
                {record.lapses > 0 && <span>翻车 {record.lapses}</span>}
              </div>
            )}
          </div>

          {!review ? (
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => grade("wrong")} className="btn-red py-3">
                不认识
              </button>
              <button onClick={() => grade("hard")} className="btn-orange py-3">
                模糊
              </button>
              <button
                onClick={() => grade("correct")}
                className="btn-primary py-3"
                disabled={peeked}
              >
                {peeked ? "认识 (已封顶)" : "认识 ✓"}
              </button>
            </div>
          ) : (
            <div className={`feedback ${review.outcome === "correct" ? "feedback-ok" : "feedback-bad"} animate-pop`}>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-base">
                    {review.outcome === "correct" ? "先看答案，确认一下" : "答案在上面，过一遍再继续"}
                  </div>
                  <div className="mt-1 text-xs opacity-70">
                    {review.outcome === "correct" ? "如果刚刚其实认错了，可以在这里补救。" : "这次已经按当前选择记录。"}
                  </div>
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  {review.pendingCorrect && (
                    <button onClick={markMistaken} className="btn-ghost px-4 text-xs">
                      认错了
                    </button>
                  )}
                  <button
                    onClick={continueReview}
                    className={review.outcome === "correct" ? "btn-primary px-5" : "btn-red px-5"}
                  >
                    继续
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
