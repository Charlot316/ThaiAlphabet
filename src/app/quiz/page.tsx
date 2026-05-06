"use client";
import { useMemo, useState } from "react";
import { CONSONANTS, consonantsByInitialSound } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import { Consonant, Vowel } from "@/data/types";
import PronounceButton from "@/components/PronounceButton";

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
  const [streak, setStreak] = useState({ ok: 0, total: 0 });

  const q = useMemo(() => {
    void round;
    const target = items[Math.floor(Math.random() * items.length)];
    const choices = uniqueChoices(
      target,
      items,
      4,
      (x) => (("romanInitial" in x) ? `${x.romanInitial}|${x.id}` : `${x.roman}|${x.id}`)
    );
    return { target, choices };
  }, [items, round]);

  const correctRoman = "romanInitial" in q.target ? q.target.romanInitial : q.target.roman;
  const correctId = q.target.id;

  function pick(id: string) {
    if (picked) return;
    setPicked(id);
    setStreak((s) => ({ ok: s.ok + (id === correctId ? 1 : 0), total: s.total + 1 }));
  }
  function next() {
    setPicked(null);
    setRound((r) => r + 1);
  }

  return (
    <div className="space-y-4">
      <div className="card p-6 flex flex-col items-center">
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
          const isCorrect = id === correctId;
          const isPicked = picked === id;
          const state = !picked
            ? "btn-ghost"
            : isCorrect
            ? "btn-primary bg-emerald-600 dark:bg-emerald-500 text-white"
            : isPicked
            ? "btn-ghost ring-2 ring-rose-500"
            : "btn-ghost opacity-60";
          return (
            <li key={id}>
              <button onClick={() => pick(id)} className={`${state} w-full font-mono text-base`}>
                {text}
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
        <div className="card p-3 text-sm">
          正确答案: <b>{correctRoman}</b>
          {"name" in q.target && (
            <span className="ml-2 opacity-70 thai-big">{(q.target as Consonant).name}</span>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- 模式 B: 给读音，选字母（同音多选）---------------- */
function ModeB({ pool }: { pool: Pool }) {
  if (pool === "consonant") return <ModeBConsonant />;
  return <ModeBVowel />;
}

function ModeBConsonant() {
  const groups = useMemo(() => consonantsByInitialSound(), []);
  const sounds = useMemo(() => Object.keys(groups), [groups]);
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [streak, setStreak] = useState({ ok: 0, total: 0 });

  const q = useMemo(() => {
    void round;
    const sound = sounds[Math.floor(Math.random() * sounds.length)];
    const correctIds = new Set(groups[sound]);
    const distractors = CONSONANTS.filter((c) => !c.obsolete && !correctIds.has(c.id));
    const want = Math.max(4, correctIds.size + 2);
    const correctConsonants = CONSONANTS.filter((c) => correctIds.has(c.id));
    const others = shuffle(distractors).slice(0, Math.max(0, want - correctConsonants.length));
    return { sound, correctIds, choices: shuffle([...correctConsonants, ...others]) };
  }, [sounds, groups, round]);

  function toggle(id: string) {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function submit() {
    if (selected.size === 0) return;
    setSubmitted(true);
    const ok =
      selected.size === q.correctIds.size &&
      [...selected].every((id) => q.correctIds.has(id));
    setStreak((s) => ({ ok: s.ok + (ok ? 1 : 0), total: s.total + 1 }));
  }
  function next() {
    setSubmitted(false);
    setSelected(new Set());
    setRound((r) => r + 1);
  }

  return (
    <div className="space-y-4">
      <div className="card p-5 flex items-center justify-between">
        <div>
          <div className="text-xs opacity-60">哪些辅音读 (初音):</div>
          <div className="text-3xl font-mono mt-1">{q.sound}</div>
          <div className="text-xs opacity-60 mt-1">同音可多选</div>
        </div>
        <div className="text-sm opacity-70">{streak.ok} / {streak.total}</div>
      </div>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {q.choices.map((c) => {
          const isSel = selected.has(c.id);
          const isCorrect = q.correctIds.has(c.id);
          let cls = "btn-ghost";
          if (submitted) {
            if (isCorrect) cls = "btn-primary bg-emerald-600 dark:bg-emerald-500 text-white";
            else if (isSel) cls = "btn-ghost ring-2 ring-rose-500";
          } else if (isSel) cls = "btn-primary";
          return (
            <li key={c.id}>
              <button onClick={() => toggle(c.id)} className={`${cls} w-full thai-big text-2xl py-3`}>
                {c.letter}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between">
        {!submitted ? (
          <button onClick={submit} className="btn-primary text-sm py-2 px-4">提交</button>
        ) : (
          <button onClick={next} className="btn-primary text-sm py-2 px-4">下一题</button>
        )}
        <span className="text-xs opacity-60 self-center">已选 {selected.size} 个</span>
      </div>
      {submitted && (
        <div className="card p-3 text-sm">
          正确答案: {[...q.correctIds].map((id) => CONSONANTS.find((c) => c.id === id)?.letter).join(" ")}
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
    setStreak((s) => ({ ok: s.ok + (q.correctIds.has(id) ? 1 : 0), total: s.total + 1 }));
  }
  function next() { setPicked(null); setRound((r) => r + 1); }

  return (
    <div className="space-y-4">
      <div className="card p-6 flex flex-col items-center">
        <div className="text-xs opacity-60 mb-2">哪个元音读:</div>
        <div className="text-4xl font-mono">{q.target.roman}</div>
      </div>
      <ul className="grid grid-cols-2 gap-2">
        {q.choices.map((c) => {
          const isPicked = picked === c.id;
          const isCorrect = q.correctIds.has(c.id);
          const state = !picked
            ? "btn-ghost"
            : isCorrect
            ? "btn-primary bg-emerald-600 dark:bg-emerald-500 text-white"
            : isPicked
            ? "btn-ghost ring-2 ring-rose-500"
            : "btn-ghost opacity-60";
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
