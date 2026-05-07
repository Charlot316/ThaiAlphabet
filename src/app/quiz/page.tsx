"use client";
import { useMemo, useState } from "react";
import { CONSONANTS } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import { Consonant, Vowel } from "@/data/types";
import PronounceButton from "@/components/PronounceButton";
import { addMastery } from "@/lib/mastery";
import { displayRoman } from "@/lib/study";

type Mode = "A" | "B";
type Pool = "consonant" | "vowel";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function uniqueChoices<T>(correct: T, allOptions: T[], n: number, key: (x: T) => string): T[] {
  const seen = new Set<string>([key(correct)]);
  const result: T[] = [correct];
  const pool = shuffle(allOptions.filter((o) => !seen.has(key(o))));
  for (const o of pool) {
    if (result.length >= n) break;
    if (!seen.has(key(o))) {
      seen.add(key(o));
      result.push(o);
    }
  }
  return shuffle(result);
}

function studyId(item: Consonant | Vowel): string {
  return "letter" in item ? `c:${item.id}` : `v:${item.id}`;
}

export default function QuizPage() {
  const [mode, setMode] = useState<Mode>("A");
  const [pool, setPool] = useState<Pool>("consonant");
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode("A")} className={mode === "A" ? "btn-primary text-sm py-2 px-3" : "btn-ghost text-sm py-2 px-3"}>模式 A 字→音</button>
        <button onClick={() => setMode("B")} className={mode === "B" ? "btn-primary text-sm py-2 px-3" : "btn-ghost text-sm py-2 px-3"}>模式 B 音→字</button>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setPool("consonant")} className={pool === "consonant" ? "btn-primary text-xs py-1.5 px-3" : "btn-ghost text-xs py-1.5 px-3"}>辅音</button>
        <button onClick={() => setPool("vowel")} className={pool === "vowel" ? "btn-primary text-xs py-1.5 px-3" : "btn-ghost text-xs py-1.5 px-3"}>元音</button>
      </div>
      {mode === "A" ? <ModeA pool={pool} /> : <ModeB pool={pool} />}
    </div>
  );
}

/* ---------------- 模式 A: 给字母，选 4 个读音里的正确答案 ---------------- */
function ModeA({ pool }: { pool: Pool }) {
  const items = useMemo(
    () => (pool === "consonant" ? CONSONANTS.filter((c) => !c.obsolete) : VOWELS),
    [pool]
  );
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState({ ok: 0, total: 0 });

  const q = useMemo(() => {
    void round;
    const target = items[Math.floor(Math.random() * items.length)];
    // key 仅按罗马音，确保 4 个选项读音都不同（不会有两个同音的选项）
    const choices = uniqueChoices(
      target,
      items,
      4,
      (x) => (("romanInitial" in x) ? x.romanInitial : x.roman)
    );
    return { target, choices };
  }, [items, round]);

  const correctRoman = "romanInitial" in q.target ? q.target.romanInitial : q.target.roman;

  function pick(id: string) {
    if (picked) return;
    const chosen = q.choices.find((c) => c.id === id);
    const chosenRoman = "romanInitial" in chosen! ? chosen!.romanInitial : (chosen as Vowel).roman;
    const correct = chosenRoman === correctRoman;
    setPicked(id);
    setIsCorrect(correct);
    if (correct) addMastery(studyId(q.target), 1);
    setStreak((s) => ({ ok: s.ok + (correct ? 1 : 0), total: s.total + 1 }));
  }
  function next() {
    setPicked(null);
    setIsCorrect(false);
    setRound((r) => r + 1);
  }

  return (
    <div className="space-y-4">
      <div className="card-soft p-7 flex flex-col items-center">
        <div className="text-xs opacity-60 mb-2">这是哪个读音？</div>
        <div className="thai-big text-7xl leading-none">
          {"letter" in q.target ? q.target.letter : (q.target as Vowel).display}
        </div>
        <div className="mt-3">
          <PronounceButton
            text={"letter" in q.target ? `${q.target.letter} ${(q.target as Consonant).name}` : (q.target as Vowel).display.replace(/◌/g, "อ")}
            label="🔊 听一下"
          />
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-2">
        {q.choices.map((c) => {
          const id = c.id;
          const text = "romanInitial" in c ? c.romanInitial : (c as Vowel).roman;
          const label = displayRoman(text);
          const isPicked = picked === id;
          const isCorrectRoman = text === correctRoman;
          const state = !picked
            ? "opt"
            : isCorrectRoman
            ? "opt opt-correct"
            : isPicked
            ? "opt opt-wrong"
            : "opt opt-disabled";
          return (
            <li key={id}>
              <button onClick={() => pick(id)} className={`${state} w-full font-mono text-base`}>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between text-sm">
        <span className="opacity-70">{streak.ok} / {streak.total}</span>
        <button onClick={next} className="btn-primary text-sm py-2 px-4">下一题</button>
      </div>
      {picked && (
        <div className={`feedback ${isCorrect ? "feedback-ok" : "feedback-bad"} animate-pop`}>
          {isCorrect ? "✅ 正确！" : "❌ 答案"}：<b>{displayRoman(correctRoman)}</b>
          {"name" in q.target && (
            <span className="thai-big ml-2 opacity-80">{(q.target as Consonant).name}</span>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- 模式 B: 给读音，选字母（单选）---------------- */
function ModeB({ pool }: { pool: Pool }) {
  if (pool === "consonant") return <ModeBConsonant />;
  return <ModeBVowel />;
}

function ModeBConsonant() {
  const items = useMemo(() => CONSONANTS.filter((c) => !c.obsolete), []);
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [streak, setStreak] = useState({ ok: 0, total: 0 });

  const q = useMemo(() => {
    void round;
    const target = items[Math.floor(Math.random() * items.length)];
    const choices = uniqueChoices(target, items, 4, (item) => item.id);
    return { target, choices };
  }, [items, round]);

  function pick(id: string) {
    if (picked) return;
    const ok = id === q.target.id;
    setPicked(id);
    if (ok) addMastery(`c:${q.target.id}`, 1);
    setStreak((s) => ({ ok: s.ok + (ok ? 1 : 0), total: s.total + 1 }));
  }

  function next() {
    setPicked(null);
    setRound((r) => r + 1);
  }

  return (
    <div className="space-y-4">
      <div className="card-soft p-5 flex items-center justify-between">
        <div>
          <div className="text-xs opacity-60">哪个辅音读:</div>
          <div className="text-3xl font-mono mt-1">{displayRoman(q.target.romanInitial)}</div>
          <div className="text-xs opacity-60 mt-1">单选一个字母</div>
        </div>
        <div className="text-sm opacity-70">{streak.ok} / {streak.total}</div>
      </div>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {q.choices.map((c) => {
          const isPicked = picked === c.id;
          const isCorrect = c.id === q.target.id;
          const cls = !picked
            ? "opt"
            : isCorrect
            ? "opt opt-correct"
            : isPicked
            ? "opt opt-wrong"
            : "opt opt-disabled";
          return (
            <li key={c.id}>
              <button onClick={() => pick(c.id)} className={`${cls} w-full thai-big text-2xl py-3`}>
                {c.letter}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-end">
        <button onClick={next} className="btn-primary text-sm py-2 px-4">下一题</button>
      </div>
      {picked && (
        <div className="feedback feedback-ok animate-pop">
          答案：<span className="thai-big text-2xl">{q.target.letter}</span>
          <span className="ml-2 opacity-80">{q.target.name} · {q.target.meaning}</span>
        </div>
      )}
    </div>
  );
}

function ModeBVowel() {
  const items = VOWELS;
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [streak, setStreak] = useState({ ok: 0, total: 0 });

  const q = useMemo(() => {
    void round;
    const target = items[Math.floor(Math.random() * items.length)];
    const sameRoman = items.filter((v) => v.roman === target.roman);
    // 元音通常 roman 唯一；这里仍用单选 4 选 1
    const choices = uniqueChoices(target, items, 4, (v) => v.id);
    return { target, choices, correctIds: new Set(sameRoman.map((v) => v.id)) };
  }, [items, round]);

  function pick(id: string) {
    if (picked) return;
    setPicked(id);
    const ok = q.correctIds.has(id);
    if (ok) addMastery(`v:${q.target.id}`, 1);
    setStreak((s) => ({ ok: s.ok + (ok ? 1 : 0), total: s.total + 1 }));
  }
  function next() { setPicked(null); setRound((r) => r + 1); }

  return (
    <div className="space-y-4">
      <div className="card-soft p-7 flex flex-col items-center">
        <div className="text-xs opacity-60 mb-2">哪个元音读:</div>
        <div className="text-4xl font-mono">{q.target.roman}</div>
      </div>
      <ul className="grid grid-cols-2 gap-2">
        {q.choices.map((c) => {
          const isPicked = picked === c.id;
          const isCorrect = q.correctIds.has(c.id);
          const state = !picked
            ? "opt"
            : isCorrect
            ? "opt opt-correct"
            : isPicked
            ? "opt opt-wrong"
            : "opt opt-disabled";
          return (
            <li key={c.id}>
              <button onClick={() => pick(c.id)} className={`${state} w-full thai-big text-2xl`}>
                {c.display}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between text-sm">
        <span className="opacity-70">{streak.ok} / {streak.total}</span>
        <button onClick={next} className="btn-primary text-sm py-2 px-4">下一题</button>
      </div>
    </div>
  );
}
