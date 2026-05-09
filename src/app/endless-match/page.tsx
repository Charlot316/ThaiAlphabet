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
const REFILL_THRESHOLD = SLOT_COUNT + 2; // 队列剩多少时再洗一池补进来
const BEST_KEY = "thai-alphabet:endless-match:best";

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

// 把 queue 排到只剩 SLOT_COUNT 之内的去重池里。
// 注意左右两边各自有一份独立 shuffled 队列，所以一个字母在左和右
// 出现的时机会错开 — 可能新进左的 X 暂时在右边还没对应项，得再等几对。
function ensureBuffered(queue: StudyItem[], pool: StudyItem[]): StudyItem[] {
  if (queue.length >= REFILL_THRESHOLD) return queue;
  // 把整池再洗一次塞到末尾，避免立刻重复同个字母
  const next = shuffleStrong(pool);
  return [...queue, ...next];
}

export default function EndlessMatchPage() {
  const allItems = useMemo(() => buildStudyItems(), []);

  const [leftSlots, setLeftSlots] = useState<(StudyItem | null)[]>([]);
  const [rightSlots, setRightSlots] = useState<(StudyItem | null)[]>([]);
  const [leftQueue, setLeftQueue] = useState<StudyItem[]>([]);
  const [rightQueue, setRightQueue] = useState<StudyItem[]>([]);

  const [pickedLeft, setPickedLeft] = useState<string | null>(null);
  const [pickedRight, setPickedRight] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalMatched, setTotalMatched] = useState(0);
  const [totalMissed, setTotalMissed] = useState(0);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);
  const [flashSlot, setFlashSlot] = useState<{ left?: number; right?: number } | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    warmupVoices();
    setBestStreak(loadBest());
  }, []);

  // 初始化两个独立 shuffled 队列 + 各取 SLOT_COUNT 项填到槽里
  useEffect(() => {
    if (initialized.current || allItems.length === 0) return;
    initialized.current = true;
    const lq = shuffleStrong(allItems);
    const rq = shuffleStrong(allItems);
    setLeftSlots(lq.slice(0, SLOT_COUNT));
    setRightSlots(rq.slice(0, SLOT_COUNT));
    setLeftQueue(lq.slice(SLOT_COUNT));
    setRightQueue(rq.slice(SLOT_COUNT));
  }, [allItems]);

  function tryMatch(leftIdx: number, rightIdx: number) {
    const leftItem = leftSlots[leftIdx];
    const rightItem = rightSlots[rightIdx];
    if (!leftItem || !rightItem) return;

    if (leftItem.id === rightItem.id) {
      // 配对成功
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

      // 把这对槽空出来，再各从队列补一个新字母进去（左右独立 → 时机错开）
      setLeftSlots((slots) => {
        const next = [...slots];
        next[leftIdx] = leftQueue[0] ?? null;
        return next;
      });
      setRightSlots((slots) => {
        const next = [...slots];
        next[rightIdx] = rightQueue[0] ?? null;
        return next;
      });
      setLeftQueue((q) => ensureBuffered(q.slice(1), allItems));
      setRightQueue((q) => ensureBuffered(q.slice(1), allItems));

      setTimeout(() => {
        setFlash(null);
        setFlashSlot(null);
      }, 250);
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
    setPickedLeft(null);
    setPickedRight(null);
  }

  function onLeft(idx: number) {
    const item = leftSlots[idx];
    if (!item) return;
    feedbackTap();
    if (pickedRight !== null) {
      const rightIdx = rightSlots.findIndex((s) => s?.id === pickedRight);
      if (rightIdx >= 0) tryMatch(idx, rightIdx);
    } else {
      setPickedLeft((p) => (p === item.id ? null : item.id));
    }
  }
  function onRight(idx: number) {
    const item = rightSlots[idx];
    if (!item) return;
    feedbackTap();
    if (pickedLeft !== null) {
      const leftIdx = leftSlots.findIndex((s) => s?.id === pickedLeft);
      if (leftIdx >= 0) tryMatch(leftIdx, idx);
    } else {
      setPickedRight((p) => (p === item.id ? null : item.id));
    }
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
        无尽配对 · 配对一对换一对 · 左右独立洗牌，新出来的可能要等几对才会有对应
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ul className="space-y-2">
          {leftSlots.map((it, idx) => {
            let state: "idle" | "picked" | "ok" | "bad" | "empty" = "idle";
            if (!it) state = "empty";
            else if (flashSlot?.left === idx && flash === "ok") state = "ok";
            else if (flashSlot?.left === idx && flash === "bad") state = "bad";
            else if (pickedLeft === it.id) state = "picked";
            return (
              <li key={`L-${idx}`}>
                <button
                  onClick={() => onLeft(idx)}
                  disabled={!it}
                  className={`${slotClass(state)} flex min-h-[72px] w-full items-center justify-center`}
                >
                  <span className="thai-big text-3xl leading-none">{it?.front ?? ""}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-2">
          {rightSlots.map((it, idx) => {
            let state: "idle" | "picked" | "ok" | "bad" | "empty" = "idle";
            if (!it) state = "empty";
            else if (flashSlot?.right === idx && flash === "ok") state = "ok";
            else if (flashSlot?.right === idx && flash === "bad") state = "bad";
            else if (pickedRight === it.id) state = "picked";
            return (
              <li key={`R-${idx}`}>
                <button
                  onClick={() => onRight(idx)}
                  disabled={!it}
                  className={`${slotClass(state)} flex min-h-[72px] w-full items-center justify-center`}
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
