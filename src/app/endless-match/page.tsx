"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
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
import {
  ALPHABET_FINAL_EXAM_POLICY,
  isAlphabetFinalPassingScore,
  saveAlphabetFinalExamResult,
} from "@/lib/moduleProgress";

const SLOT_COUNT = 5; // 同时显示几对（左右各 SLOT_COUNT 张）
const REFILL_THRESHOLD = SLOT_COUNT + 2;
const MIN_MATCHABLE = 4; // 任何时候至少保证 N 对可配（不能让用户卡死等）
// 开局必须 SLOT_COUNT 对全配；连续非全配最多允许 MAX_NOT_FULL 次，
// 之后下一次补充必须强制回到全配，避免某个槽长期"晾"在那
const MAX_NOT_FULL = 2;
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

// 多重集合差：a 中"多于" b 的元素列表（保留重复）。
// 例：multisetDiff([k, kh, kh], [kh]) = [k, kh]
function multisetDiff(a: string[], b: string[]): string[] {
  const counts = new Map<string, number>();
  for (const x of b) counts.set(x, (counts.get(x) ?? 0) + 1);
  const out: string[] = [];
  for (const x of a) {
    const c = counts.get(x) ?? 0;
    if (c > 0) counts.set(x, c - 1);
    else out.push(x);
  }
  return out;
}

// 强制让"补这两个槽以后整个 5/5 全配"。返回 null 时调用方应回退到普通补充。
//
// 同侧允许 roman 重复（用户喜欢"右边两个 kh、左边两个对应字母任意配"），
// 所以这里用多重集合（不是 set）来算 lonely。两侧各 4 个 item，
// |lonelyL| == |lonelyR|（设为 k）：k=0 时多重集合相同（5/5 全配只需补一对同 roman 字母）；
// k>=1 时 left 补的 roman ∈ lonelyR、right 补的 roman ∈ lonelyL，一次各消除 1 个 lonely。
function pickFullyMatchablePair(
  leftQueue: StudyItem[],
  rightQueue: StudyItem[],
  leftAfterClear: (StudyItem | null)[],
  rightAfterClear: (StudyItem | null)[]
): {
  leftItem: StudyItem;
  rightItem: StudyItem;
  leftQueue: StudyItem[];
  rightQueue: StudyItem[];
} | null {
  const LRArr = leftAfterClear.filter(Boolean).map((s) => (s as StudyItem).roman);
  const RRArr = rightAfterClear.filter(Boolean).map((s) => (s as StudyItem).roman);
  const lonelyL = multisetDiff(LRArr, RRArr);
  const lonelyR = multisetDiff(RRArr, LRArr);

  if (lonelyL.length === 0 && lonelyR.length === 0) {
    // 4/4 多重集合相同。左右各补一个相同 roman 的字母即可让 5/5 仍然全配。
    if (leftQueue.length === 0) return null;
    const leftItem = leftQueue[0];
    const targetRoman = leftItem.roman;
    const rIdx = rightQueue.findIndex((it) => it.roman === targetRoman);
    if (rIdx < 0) return null;
    return {
      leftItem,
      rightItem: rightQueue[rIdx],
      leftQueue: leftQueue.slice(1),
      rightQueue: [...rightQueue.slice(0, rIdx), ...rightQueue.slice(rIdx + 1)],
    };
  }

  // k>=1：消除 1 个 lonely 各自侧
  const targetForLeft = lonelyR[0];
  const targetForRight = lonelyL[0];
  const lIdx = leftQueue.findIndex((it) => it.roman === targetForLeft);
  const rIdx = rightQueue.findIndex((it) => it.roman === targetForRight);
  if (lIdx < 0 || rIdx < 0) return null;
  return {
    leftItem: leftQueue[lIdx],
    rightItem: rightQueue[rIdx],
    leftQueue: [...leftQueue.slice(0, lIdx), ...leftQueue.slice(lIdx + 1)],
    rightQueue: [...rightQueue.slice(0, rIdx), ...rightQueue.slice(rIdx + 1)],
  };
}

// 当前 active 槽里能成对配对的对数（多重集合交集大小）。
// 例：left=[k, kh, kh, ng, b] vs right=[kh, kh, ng, b, c] → 4 对（kh kh ng b 各一对）。
function matchableCount(thisSlots: (StudyItem | null)[], otherSlots: (StudyItem | null)[]): number {
  const otherCounts = new Map<string, number>();
  for (const s of otherSlots) {
    if (s) otherCounts.set(s.roman, (otherCounts.get(s.roman) ?? 0) + 1);
  }
  let count = 0;
  for (const s of thisSlots) {
    if (!s) continue;
    const c = otherCounts.get(s.roman) ?? 0;
    if (c > 0) {
      count++;
      otherCounts.set(s.roman, c - 1);
    }
  }
  return count;
}

// 从 queue 里挑一个补到本侧空槽。
//   - matchable < MIN_MATCHABLE 时，强制挑一个 roman 已在另一侧出现的项（避免补完
//     依然没人能配），同 roman 是允许的；
//   - 否则按队头来，但跳过 id 已在本侧的（不让同一字母占两个槽）。
//   - 同 roman 不同字母是允许的（用户的"右边两个 kh、左边两个对应字母"诉求）。
function pickReplenishment(
  queue: StudyItem[],
  thisSlots: (StudyItem | null)[],
  otherSlots: (StudyItem | null)[]
): { item: StudyItem | null; queue: StudyItem[] } {
  if (queue.length === 0) return { item: null, queue };
  const otherRomans = new Set(otherSlots.filter(Boolean).map((s) => (s as StudyItem).roman));
  const thisIds = new Set(thisSlots.filter(Boolean).map((s) => (s as StudyItem).id));
  const matchable = matchableCount(thisSlots, otherSlots);

  if (matchable < MIN_MATCHABLE) {
    const idx = queue.findIndex((it) => otherRomans.has(it.roman) && !thisIds.has(it.id));
    if (idx >= 0) {
      return { item: queue[idx], queue: [...queue.slice(0, idx), ...queue.slice(idx + 1)] };
    }
  }

  const idx = queue.findIndex((it) => !thisIds.has(it.id));
  if (idx >= 0) {
    return { item: queue[idx], queue: [...queue.slice(0, idx), ...queue.slice(idx + 1)] };
  }
  return { item: queue[0], queue: queue.slice(1) };
}

export default function EndlessMatchPage() {
  const [isAlphabetFinalExam, setIsAlphabetFinalExam] = useState(false);
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
  const [sessionBestStreak, setSessionBestStreak] = useState(0);
  const [totalMatched, setTotalMatched] = useState(0);
  const [totalMissed, setTotalMissed] = useState(0);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);
  const [flashSlot, setFlashSlot] = useState<{ left?: number; right?: number } | null>(null);
  // 已配对、正在淡出的槽（一秒后才被替换为新字母）
  const [fadingSlots, setFadingSlots] = useState<{ left: number; right: number } | null>(null);
  const initialized = useRef(false);
  const examSavedRef = useRef(false);
  // 已经连续多少次补充后没有恢复 5/5 全配（≥ MAX_NOT_FULL 时下次必须强制全配）
  const notFullStreakRef = useRef(0);

  useEffect(() => {
    warmupVoices();
    setBestStreak(loadBest());
    setIsAlphabetFinalExam(new URLSearchParams(window.location.search).get("exam") === "alphabet-final");
  }, []);

  const passedAlphabetFinal = isAlphabetFinalExam
    ? isAlphabetFinalPassingScore({
        totalMatched,
        totalMissed,
        bestStreak: sessionBestStreak,
      })
    : false;

  useEffect(() => {
    if (!passedAlphabetFinal || examSavedRef.current) return;
    examSavedRef.current = true;
    saveAlphabetFinalExamResult({
      totalMatched,
      totalMissed,
      bestStreak: sessionBestStreak,
    });
  }, [passedAlphabetFinal, totalMatched, totalMissed, sessionBestStreak]);

  // 初始化：5 对必须全部可配。做法：选 SLOT_COUNT 个不同 id 的字母作为起始
  // items（romans 不要求 distinct — 用户允许同侧出现两个同 roman），
  // 左右两侧用 same items 但不同 shuffle 顺序，所以 5/5 全配。
  useEffect(() => {
    if (initialized.current || allItems.length === 0) return;
    initialized.current = true;
    const pool = shuffleStrong(allItems);
    const initialItems = pool.slice(0, SLOT_COUNT);
    const initialIds = new Set(initialItems.map((it) => it.id));
    const restPool = allItems.filter((it) => !initialIds.has(it.id));
    setBoard({
      leftSlots: shuffleStrong(initialItems),
      rightSlots: shuffleStrong(initialItems),
      leftQueue: ensureBuffered(shuffleStrong(restPool), allItems),
      rightQueue: ensureBuffered(shuffleStrong(restPool), allItems),
    });
    notFullStreakRef.current = 0;
  }, [allItems]);

  function tryMatch(leftIdx: number, rightIdx: number) {
    const leftItem = board.leftSlots[leftIdx];
    const rightItem = board.rightSlots[rightIdx];
    if (!leftItem || !rightItem) return;

    if (matchesByRoman(leftItem, rightItem)) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setSessionBestStreak((v) => Math.max(v, newStreak));
      setTotalMatched((v) => v + 1);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
        saveBest(newStreak);
      }
      setFlash("ok");
      setFlashSlot({ left: leftIdx, right: rightIdx });
      speak(leftItem.speak);
      if (newStreak >= 3) feedbackCombo(newStreak);
      else feedbackMatch();
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

          // 已连续 MAX_NOT_FULL 次没回到 5/5 → 这次必须强制让 board 回到全配
          const mustForceFull = notFullStreakRef.current >= MAX_NOT_FULL;
          const newLeftSlots = [...leftAfterClear];
          const newRightSlots = [...rightAfterClear];
          let newLeftQueue = b.leftQueue;
          let newRightQueue = b.rightQueue;

          let placed = false;
          if (mustForceFull) {
            const fully = pickFullyMatchablePair(
              b.leftQueue,
              b.rightQueue,
              leftAfterClear,
              rightAfterClear
            );
            if (fully) {
              newLeftSlots[leftIdx] = fully.leftItem;
              newRightSlots[rightIdx] = fully.rightItem;
              newLeftQueue = ensureBuffered(fully.leftQueue, allItems);
              newRightQueue = ensureBuffered(fully.rightQueue, allItems);
              placed = true;
            }
          }
          if (!placed) {
            const lPick = pickReplenishment(b.leftQueue, leftAfterClear, rightAfterClear);
            newLeftSlots[leftIdx] = lPick.item;
            newLeftQueue = ensureBuffered(lPick.queue, allItems);

            const rPick = pickReplenishment(b.rightQueue, rightAfterClear, newLeftSlots);
            newRightSlots[rightIdx] = rPick.item;
            newRightQueue = ensureBuffered(rPick.queue, allItems);
          }

          // 补完后若仍非全配 → notFullStreak++; 否则归零
          const fullyMatchable = matchableCount(newLeftSlots, newRightSlots) === SLOT_COUNT;
          notFullStreakRef.current = fullyMatchable ? 0 : notFullStreakRef.current + 1;

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

  function handlePointerPress(event: ReactPointerEvent<HTMLButtonElement>, press: () => void) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    press();
  }

  function handleKeyboardPress(event: ReactKeyboardEvent<HTMLButtonElement>, press: () => void) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    press();
  }

  function slotClass(state: "idle" | "picked" | "ok" | "bad" | "empty"): string {
    if (state === "empty") return "opt opacity-0 pointer-events-none";
    if (state === "ok") return "opt opt-correct";
    if (state === "bad") return "opt opt-wrong";
    if (state === "picked") return "opt opt-selected";
    return "opt";
  }

  return (
    <div className={`space-y-5 ${flash === "bad" ? "animate-shake" : ""}`}>
      <div>
        <h1 className="text-lg font-semibold">{isAlphabetFinalExam ? "字母期末" : "无尽配对"}</h1>
        <p className="mt-1 text-xs" style={{ color: "var(--duo-muted)" }}>
          {isAlphabetFinalExam
            ? `${ALPHABET_FINAL_EXAM_POLICY.matchedTarget} 配对 · ≤${ALPHABET_FINAL_EXAM_POLICY.maxMisses} 失误 · ${ALPHABET_FINAL_EXAM_POLICY.streakTarget} 连击`
            : "字母和读音配成一对，正确后会朗读字母。"}
        </p>
      </div>

      <div className="card-soft p-4">
        <div className="grid grid-cols-4 items-center gap-0 text-center text-xs">
          <div className="border-r px-2" style={{ borderColor: "var(--duo-line)" }}>
            <div className="opacity-70">已配对</div>
            <div className="mt-1 text-2xl font-extrabold" style={{ color: "var(--duo-text)" }}>
              {totalMatched}
            </div>
          </div>
          <div className="border-r px-2" style={{ borderColor: "var(--duo-line)" }}>
            <div className="opacity-70">连击</div>
            <div className="mt-1 text-2xl font-extrabold" style={{ color: "var(--duo-orange)" }}>
              {streak}
            </div>
          </div>
          <div className="border-r px-2" style={{ borderColor: "var(--duo-line)" }}>
            <div className="opacity-70">最高</div>
            <div className="mt-1 text-2xl font-extrabold" style={{ color: "var(--duo-text)" }}>
              {bestStreak}
            </div>
          </div>
          <div className="px-2">
            <div className="opacity-70">失误</div>
            <div className="mt-1 text-2xl font-extrabold" style={{ color: "var(--duo-red)" }}>
              {totalMissed}
            </div>
          </div>
        </div>
      </div>

      {isAlphabetFinalExam && (
        <div
          className="rounded-lg border p-4 text-sm"
          style={{
            background: passedAlphabetFinal
              ? "color-mix(in srgb, var(--duo-green) 11%, var(--duo-card))"
              : "var(--surface-subtle)",
            borderColor: passedAlphabetFinal
              ? "color-mix(in srgb, var(--duo-green) 36%, var(--duo-line))"
              : "var(--duo-line)",
            color: passedAlphabetFinal ? "var(--duo-green-d)" : "var(--duo-muted)",
          }}
        >
          {passedAlphabetFinal
            ? "已通过字母期末，语法模块会解锁。"
            : `本轮最高连击 ${sessionBestStreak}，继续配对到达通过标准。`}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <ul className="space-y-2">
          <li className="pb-1 text-center text-xs font-semibold" style={{ color: "var(--duo-muted)" }}>字母</li>
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
                  onPointerDown={(event) => handlePointerPress(event, () => onLeft(idx))}
                  onKeyDown={(event) => handleKeyboardPress(event, () => onLeft(idx))}
                  disabled={!it || isFading}
                  className={`${slotClass(state)} flex min-h-[78px] w-full items-center justify-center`}
                  style={{
                    opacity: isFading ? 0 : 1,
                    transform: isFading ? "scale(0.88)" : "scale(1)",
                    transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
                    touchAction: "none",
                    userSelect: "none",
                  }}
                >
                  <span className="thai-big text-4xl leading-none">{it?.front ?? ""}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-2">
          <li className="pb-1 text-center text-xs font-semibold" style={{ color: "var(--duo-muted)" }}>读音</li>
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
                  onPointerDown={(event) => handlePointerPress(event, () => onRight(idx))}
                  onKeyDown={(event) => handleKeyboardPress(event, () => onRight(idx))}
                  disabled={!it || isFading}
                  className={`${slotClass(state)} flex min-h-[78px] w-full items-center justify-center`}
                  style={{
                    opacity: isFading ? 0 : 1,
                    transform: isFading ? "scale(0.88)" : "scale(1)",
                    transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
                    touchAction: "none",
                    userSelect: "none",
                  }}
                >
                  <span className="font-mono text-2xl leading-none">{it ? displayRoman(it.roman) : ""}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
