"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { StudyItem, buildStudyItems, displayRoman, shuffleStrong } from "@/lib/study";
import {
  feedbackCombo,
  feedbackMatch,
  feedbackMismatch,
  feedbackTap,
} from "@/lib/feedback";
import { speak, warmupVoices } from "@/lib/tts";
import { markActive } from "@/lib/stats";
import { recordOutcome } from "@/lib/mastery";

const SLOT_COUNT = 5; // 同时显示几对（左右各 SLOT_COUNT 张）
const REFILL_THRESHOLD = SLOT_COUNT + 2;
const MIN_MATCHABLE = 4; // 任何时候至少保证 N 对可配（不能让用户卡死等）
const BEST_KEY = "thai-alphabet:endless-match:best";

interface BoardState {
  leftSlots: (StudyItem | null)[];
  rightSlots: (StudyItem | null)[];
  leftQueue: StudyItem[];
  rightQueue: StudyItem[];
}

function loadBest(): number {
  if (typeof window === "undefined") return 0;
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(v: number) {
  try {
    window.localStorage.setItem(BEST_KEY, String(v));
  } catch {
    /* */
  }
}

function ensureBuffered(queue: StudyItem[], pool: StudyItem[]): StudyItem[] {
  if (queue.length >= REFILL_THRESHOLD) return queue;
  return [...queue, ...shuffleStrong(pool)];
}

// 配对按罗马音判定（同音不同字母可互配，例如 ข/ฃ/ค/ฅ/ฆ 都是 "kh"）
function matchesByRoman(a: StudyItem, b: StudyItem): boolean {
  return a.roman === b.roman;
}

// 当前 active 槽中"罗马音已在另一侧出现"的字母数 = 立刻可配对的对数
function matchableCount(thisSlots: (StudyItem | null)[], otherSlots: (StudyItem | null)[]): number {
  const otherRomans = new Set(otherSlots.filter(Boolean).map((s) => (s as StudyItem).roman));
  let count = 0;
  for (const s of thisSlots) {
    if (s && otherRomans.has(s.roman)) count++;
  }
  return count;
}

// 从 queue 里挑一个补到本侧空槽。
//   - 当前 matchable < MIN_MATCHABLE 时，强制挑一个 roman 已在 otherSlots 出现、
//     且 roman 不在 thisSlots 出现的项；
//   - 否则尽量避开本侧已有的 roman（避免两个 "kh" 同时在一边）。
// 返回挑出的项 + 处理后的 queue。
function pickReplenishment(
  queue: StudyItem[],
  thisSlots: (StudyItem | null)[],
  otherSlots: (StudyItem | null)[]
): { item: StudyItem | null; queue: StudyItem[] } {
  if (queue.length === 0) return { item: null, queue };
  const otherRomans = new Set(otherSlots.filter(Boolean).map((s) => (s as StudyItem).roman));
  const thisRomans = new Set(thisSlots.filter(Boolean).map((s) => (s as StudyItem).roman));
  const matchable = matchableCount(thisSlots, otherSlots);

  const idxMatchable = queue.findIndex((it) => otherRomans.has(it.roman) && !thisRomans.has(it.roman));
  const idxFresh = queue.findIndex((it) => !thisRomans.has(it.roman));

  let pickedIdx: number;
  if (matchable < MIN_MATCHABLE && idxMatchable >= 0) {
    pickedIdx = idxMatchable;
  } else if (idxFresh >= 0) {
    pickedIdx = idxFresh;
  } else {
    pickedIdx = 0;
  }

  const item = queue[pickedIdx];
  return { item, queue: [...queue.slice(0, pickedIdx), ...queue.slice(pickedIdx + 1)] };
}

export default function EndlessMatchPage() {
  const allItems = useMemo(() => buildStudyItems(), []);

  const [board, setBoard] = useState<BoardState>({
    leftSlots: [],
    rightSlots: [],
    leftQueue: [],
    rightQueue: [],
  });

  const [pickedLeft, setPickedLeft] = useState<string | null>(null);
  const [pickedRight, setPickedRight] = useState<string | null>(null);
  // ref 与 state 并行：左右两侧同时按下时，第二个 onClick 同步执行，
  // 此时 state 还没 flush，但 ref 已经写入 → 用 ref 判断"对方是否已选"
  const pickedLeftRef = useRef<string | null>(null);
  const pickedRightRef = useRef<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalMatched, setTotalMatched] = useState(0);
  const [totalMissed, setTotalMissed] = useState(0);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);
  const [flashSlot, setFlashSlot] = useState<{ left?: number; right?: number } | null>(null);
  // 已配对、正在淡出的槽（一秒后才被替换为新字母）
  const [fadingSlots, setFadingSlots] = useState<{ left: number; right: number } | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    warmupVoices();
    setBestStreak(loadBest());
  }, []);

  // 初始化：左右各取一份独立 shuffle 的队列。注意：要让初始 5 对至少有 MIN_MATCHABLE
  // 对能配对，否则刚进来就盯着等。
  useEffect(() => {
    if (initialized.current || allItems.length === 0) return;
    initialized.current = true;
    let lq = shuffleStrong(allItems);
    let rq = shuffleStrong(allItems);
    const leftSlots: (StudyItem | null)[] = [];
    const rightSlots: (StudyItem | null)[] = [];
    for (let i = 0; i < SLOT_COUNT; i++) {
      // 左槽：按队头来
      const lpick = pickReplenishment(lq, leftSlots, rightSlots);
      leftSlots.push(lpick.item);
      lq = lpick.queue;
      // 右槽：用智能挑选保证能配上
      const rpick = pickReplenishment(rq, rightSlots, leftSlots);
      rightSlots.push(rpick.item);
      rq = rpick.queue;
    }
    setBoard({ leftSlots, rightSlots, leftQueue: lq, rightQueue: rq });
  }, [allItems]);

  function tryMatch(leftIdx: number, rightIdx: number) {
    const leftItem = board.leftSlots[leftIdx];
    const rightItem = board.rightSlots[rightIdx];
    if (!leftItem || !rightItem) return;

    if (matchesByRoman(leftItem, rightItem)) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setTotalMatched((v) => v + 1);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
        saveBest(newStreak);
      }
      setFlash("ok");
      setFlashSlot({ left: leftIdx, right: rightIdx });
      if (newStreak >= 3) feedbackCombo(newStreak);
      else feedbackMatch();
      speak(leftItem.speak);
      markActive();
      recordOutcome(leftItem.id, "correct", { streak: newStreak });

      // 把这两个槽标为"配对完成、正在淡出"，1 秒后再真正替换为新字母
      setFadingSlots({ left: leftIdx, right: rightIdx });

      setTimeout(() => {
        setFlash(null);
        setFlashSlot(null);
      }, 250);

      setTimeout(() => {
        setBoard((b) => {
          const leftAfterClear = [...b.leftSlots];
          leftAfterClear[leftIdx] = null;
          const rightAfterClear = [...b.rightSlots];
          rightAfterClear[rightIdx] = null;

          const lPick = pickReplenishment(b.leftQueue, leftAfterClear, rightAfterClear);
          const newLeftSlots = [...leftAfterClear];
          newLeftSlots[leftIdx] = lPick.item;
          const newLeftQueue = ensureBuffered(lPick.queue, allItems);

          const rPick = pickReplenishment(b.rightQueue, rightAfterClear, newLeftSlots);
          const newRightSlots = [...rightAfterClear];
          newRightSlots[rightIdx] = rPick.item;
          const newRightQueue = ensureBuffered(rPick.queue, allItems);

          return {
            leftSlots: newLeftSlots,
            rightSlots: newRightSlots,
            leftQueue: newLeftQueue,
            rightQueue: newRightQueue,
          };
        });
        setFadingSlots(null);
      }, 1000);
    } else {
      setStreak(0);
      setTotalMissed((v) => v + 1);
      setFlash("bad");
      setFlashSlot({ left: leftIdx, right: rightIdx });
      feedbackMismatch();
      recordOutcome(leftItem.id, "hard");
      recordOutcome(rightItem.id, "hard");
      setTimeout(() => {
        setFlash(null);
        setFlashSlot(null);
      }, 350);
    }
  }

  function clearPicks() {
    pickedLeftRef.current = null;
    pickedRightRef.current = null;
    setPickedLeft(null);
    setPickedRight(null);
  }

  function onLeft(idx: number) {
    const item = board.leftSlots[idx];
    if (!item) return;
    feedbackTap();
    const rightPick = pickedRightRef.current;
    if (rightPick !== null) {
      const rightIdx = board.rightSlots.findIndex((s) => s?.id === rightPick);
      if (rightIdx >= 0) {
        clearPicks();
        tryMatch(idx, rightIdx);
        return;
      }
    }
    // 切换本侧选中
    const next = pickedLeftRef.current === item.id ? null : item.id;
    pickedLeftRef.current = next;
    setPickedLeft(next);
  }

  function onRight(idx: number) {
    const item = board.rightSlots[idx];
    if (!item) return;
    feedbackTap();
    const leftPick = pickedLeftRef.current;
    if (leftPick !== null) {
      const leftIdx = board.leftSlots.findIndex((s) => s?.id === leftPick);
      if (leftIdx >= 0) {
        clearPicks();
        tryMatch(leftIdx, idx);
        return;
      }
    }
    const next = pickedRightRef.current === item.id ? null : item.id;
    pickedRightRef.current = next;
    setPickedRight(next);
  }

  function slotClass(state: "idle" | "picked" | "ok" | "bad" | "empty"): string {
    if (state === "empty") return "opt opacity-0 pointer-events-none";
    if (state === "ok") return "opt opt-correct";
    if (state === "bad") return "opt opt-wrong";
    if (state === "picked") return "opt opt-selected";
    return "opt";
  }

  return (
    <div className={`space-y-4 ${flash === "bad" ? "animate-shake" : ""}`}>
      <div className="card-soft p-4">
        <div className="grid grid-cols-4 items-center gap-2 text-center text-xs">
          <div>
            <div className="opacity-70">已配对</div>
            <div className="text-lg font-extrabold" style={{ color: "var(--duo-green)" }}>
              {totalMatched}
            </div>
          </div>
          <div>
            <div className="opacity-70">连击</div>
            <div className="text-lg font-extrabold" style={{ color: "var(--duo-orange)" }}>
              {streak}
              {streak >= 3 ? " 🔥" : ""}
            </div>
          </div>
          <div>
            <div className="opacity-70">最高</div>
            <div className="text-lg font-extrabold" style={{ color: "var(--duo-yellow)" }}>
              {bestStreak}
            </div>
          </div>
          <div>
            <div className="opacity-70">失误</div>
            <div className="text-lg font-extrabold" style={{ color: "var(--duo-red)" }}>
              {totalMissed}
            </div>
          </div>
        </div>
      </div>

      <div className="card-soft p-3 text-center text-xs opacity-70">
        无尽配对 · 配对一对换一对 · 总会有 ≥ {MIN_MATCHABLE} 对能立即配上
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ul className="space-y-2">
          {board.leftSlots.map((it, idx) => {
            const isFading = fadingSlots?.left === idx;
            let state: "idle" | "picked" | "ok" | "bad" | "empty" = "idle";
            if (!it) state = "empty";
            else if (isFading) state = "ok";
            else if (flashSlot?.left === idx && flash === "ok") state = "ok";
            else if (flashSlot?.left === idx && flash === "bad") state = "bad";
            else if (pickedLeft === it.id) state = "picked";
            return (
              <li key={`L-${idx}-${it?.id ?? "empty"}`}>
                <button
                  onClick={() => onLeft(idx)}
                  disabled={!it || isFading}
                  className={`${slotClass(state)} flex min-h-[72px] w-full items-center justify-center`}
                  style={{
                    opacity: isFading ? 0 : 1,
                    transform: isFading ? "scale(0.88)" : "scale(1)",
                    transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
                  }}
                >
                  <span className="thai-big text-3xl leading-none">{it?.front ?? ""}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-2">
          {board.rightSlots.map((it, idx) => {
            const isFading = fadingSlots?.right === idx;
            let state: "idle" | "picked" | "ok" | "bad" | "empty" = "idle";
            if (!it) state = "empty";
            else if (isFading) state = "ok";
            else if (flashSlot?.right === idx && flash === "ok") state = "ok";
            else if (flashSlot?.right === idx && flash === "bad") state = "bad";
            else if (pickedRight === it.id) state = "picked";
            return (
              <li key={`R-${idx}-${it?.id ?? "empty"}`}>
                <button
                  onClick={() => onRight(idx)}
                  disabled={!it || isFading}
                  className={`${slotClass(state)} flex min-h-[72px] w-full items-center justify-center`}
                  style={{
                    opacity: isFading ? 0 : 1,
                    transform: isFading ? "scale(0.88)" : "scale(1)",
                    transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
                  }}
                >
                  <span className="font-mono text-lg leading-none">{it ? displayRoman(it.roman) : ""}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
