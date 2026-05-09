"use client";

import { useEffect, useMemo, useState } from "react";
import { StudyItem, buildStudyItems, displayRoman, shuffleStrong } from "@/lib/study";
import {
  feedbackCombo,
  feedbackComplete,
  feedbackMatch,
  feedbackMismatch,
  feedbackTap,
} from "@/lib/feedback";
import { speak, warmupVoices } from "@/lib/tts";
import { markActive } from "@/lib/stats";
import { recordOutcome } from "@/lib/mastery";

const BATCH_SIZE = 6;
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

export default function EndlessMatchPage() {
  const allItems = useMemo(() => buildStudyItems(), []);
  const [pool, setPool] = useState<StudyItem[]>([]);
  const [batch, setBatch] = useState<StudyItem[]>([]);
  const [leftOrder, setLeftOrder] = useState<StudyItem[]>([]);
  const [rightOrder, setRightOrder] = useState<StudyItem[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [pickedLeft, setPickedLeft] = useState<string | null>(null);
  const [pickedRight, setPickedRight] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalMatched, setTotalMatched] = useState(0);
  const [totalMissed, setTotalMissed] = useState(0);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);

  useEffect(() => {
    warmupVoices();
    setBestStreak(loadBest());
  }, []);

  // 准备 pool（用过的字母走完才重新洗）
  useEffect(() => {
    if (pool.length === 0) setPool(shuffleStrong(allItems));
  }, [pool.length, allItems]);

  // 出新一组
  useEffect(() => {
    if (batch.length > 0) return;
    if (pool.length === 0) return;
    const take = pool.slice(0, BATCH_SIZE);
    const rest = pool.slice(BATCH_SIZE);
    if (take.length < BATCH_SIZE) {
      // 不够一组就重新洗一池补满
      const refill = shuffleStrong(allItems).filter((it) => !take.some((t) => t.id === it.id));
      while (take.length < BATCH_SIZE && refill.length > 0) take.push(refill.shift()!);
    }
    setBatch(take);
    setLeftOrder(shuffleStrong(take));
    setRightOrder(shuffleStrong(take));
    setMatched(new Set());
    setPickedLeft(null);
    setPickedRight(null);
    setPool(rest);
  }, [batch.length, pool, allItems]);

  function tryMatch(leftId: string, rightId: string) {
    if (leftId === rightId) {
      setMatched((s) => {
        const next = new Set(s);
        next.add(leftId);
        return next;
      });
      const newStreak = streak + 1;
      setStreak(newStreak);
      setTotalMatched((v) => v + 1);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
        saveBest(newStreak);
      }
      setFlash("ok");
      if (newStreak >= 3) feedbackCombo(newStreak);
      else feedbackMatch();
      const item = batch.find((b) => b.id === leftId);
      if (item) speak(item.speak);
      markActive();
      // 计入熟练度（带连击信息更新 streakBest）
      recordOutcome(leftId, "correct", { streak: newStreak });
      setTimeout(() => setFlash(null), 250);
    } else {
      setStreak(0);
      setTotalMissed((v) => v + 1);
      setFlash("bad");
      feedbackMismatch();
      // 错配两个都按 hard 算（降熟练度但不太狠）
      recordOutcome(leftId, "hard");
      recordOutcome(rightId, "hard");
      setTimeout(() => setFlash(null), 350);
    }
    setPickedLeft(null);
    setPickedRight(null);
  }

  function onLeft(id: string) {
    if (matched.has(id)) return;
    feedbackTap();
    if (pickedRight) tryMatch(id, pickedRight);
    else setPickedLeft((p) => (p === id ? null : id));
  }
  function onRight(id: string) {
    if (matched.has(id)) return;
    feedbackTap();
    if (pickedLeft) tryMatch(pickedLeft, id);
    else setPickedRight((p) => (p === id ? null : id));
  }

  // 完成一组 → 自动出下一组
  useEffect(() => {
    if (batch.length === 0) return;
    if (matched.size === batch.length && batch.length > 0) {
      feedbackComplete();
      const t = setTimeout(() => setBatch([]), 600);
      return () => clearTimeout(t);
    }
  }, [matched, batch.length]);

  return (
    <div className={`space-y-4 ${flash === "bad" ? "animate-shake" : ""}`}>
      <div className="card-soft p-4">
        <div className="flex items-center justify-between gap-3 text-xs">
          <div>
            <div className="opacity-70">本轮已配对</div>
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
        无尽配对 · 把字母和读音连起来 · 配对成功播音 · 错了连击清零
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ul className="space-y-2">
          {leftOrder.map((it) => {
            const ok = matched.has(it.id);
            const isPicked = pickedLeft === it.id;
            const cls = ok ? "opt opt-correct" : isPicked ? "opt opt-selected" : "opt";
            return (
              <li key={`L-${it.id}`}>
                <button onClick={() => onLeft(it.id)} disabled={ok} className={`${cls} thai-big text-3xl min-h-[64px]`}>
                  {it.front}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-2">
          {rightOrder.map((it) => {
            const ok = matched.has(it.id);
            const isPicked = pickedRight === it.id;
            const cls = ok ? "opt opt-correct" : isPicked ? "opt opt-selected" : "opt";
            return (
              <li key={`R-${it.id}`}>
                <button onClick={() => onRight(it.id)} disabled={ok} className={`${cls} font-mono text-base min-h-[64px]`}>
                  {displayRoman(it.roman)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
