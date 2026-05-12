"use client";
import { useEffect, useMemo, useState } from "react";
import { CONSONANTS, FINAL_GROUPS } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import { Consonant, Vowel } from "@/data/types";
import { TONE_MARKS, TONE_NAMES } from "@/data/tones";
import PronounceButton from "@/components/PronounceButton";
import TraceSvg from "@/components/TraceSvg";
import { MASTERY_TARGET, clearMastery, resetMastery, useMastery } from "@/lib/mastery";
import { consonantPhonetic, consonantSpeak, displayRoman, vowelPhonetic, vowelSpeak } from "@/lib/study";
import { speak } from "@/lib/tts";

type Tab = "consonant" | "vowel" | "tone";

export default function OverviewPage() {
  const [tab, setTab] = useState<Tab>("consonant");
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["consonant", "vowel", "tone"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={tab === t ? "btn-primary px-4" : "btn-ghost px-4"}
          >
            {t === "consonant" ? "辅音 (44)" : t === "vowel" ? "元音" : "声调"}
          </button>
        ))}
      </div>
      {tab === "consonant" && <Consonants />}
      {tab === "vowel" && <Vowels />}
      {tab === "tone" && <Tones />}
    </div>
  );
}

function classTag(cls: string) {
  if (cls === "mid") return <span className="chip chip-mid h-9 min-w-9 justify-center px-2">中</span>;
  if (cls === "high") return <span className="chip chip-high h-9 min-w-9 justify-center px-2">高</span>;
  return <span className="chip chip-low h-9 min-w-9 justify-center px-2">低</span>;
}

function vowelLengthTag(length: Vowel["length"]) {
  return length === "long"
    ? <span className="chip chip-blue h-9 min-w-9 justify-center px-2">长</span>
    : <span className="chip chip-yellow h-9 min-w-9 justify-center px-2">短</span>;
}

function Consonants() {
  const [filter, setFilter] = useState<"all" | "mid" | "high" | "low" | "sound">("all");
  const [selected, setSelected] = useState<Consonant | null>(null);
  const mastery = useMastery();
  const list = useMemo(
    () => CONSONANTS.filter((c) => filter === "all" || filter === "sound" || c.class === filter),
    [filter]
  );
  const soundGroups = useMemo(() => {
    const map = new Map<string, Consonant[]>();
    for (const c of CONSONANTS) {
      const key = displayRoman(c.romanInitial);
      map.set(key, [...(map.get(key) ?? []), c]);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, []);

  function clearAll() {
    if (confirm("清空所有辅音的熟练度？")) {
      resetMastery();
    }
  }

  useEffect(() => {
    if (selected) speak(consonantSpeak(selected));
  }, [selected]);

  return (
    <>
      <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {(["all", "mid", "high", "low", "sound"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? "btn-primary px-3" : "btn-ghost px-3"}
          >
            {f === "all" ? "全部" : f === "mid" ? "中辅音" : f === "high" ? "高辅音" : f === "low" ? "低辅音" : "按读音"}
          </button>
        ))}
        <button
          onClick={clearAll}
          className="btn-ghost px-3 text-red-600 hover:text-red-700"
          title="清空所有辅音的熟练度"
        >
          🗑️ 清空
        </button>
      </div>
      {filter === "sound" ? (
        <div className="space-y-3">
          {soundGroups.map(([sound, consonants]) => (
            <section key={sound} className="space-y-2">
              <h3 className="font-mono text-sm font-extrabold opacity-75">{sound}</h3>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {consonants.map((c) => (
                  <ConsonantCard key={c.id} consonant={c} masteryValue={mastery[`c:${c.id}`] || 0} onSelect={setSelected} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {list.map((c) => (
          <ConsonantCard key={c.id} consonant={c} masteryValue={mastery[`c:${c.id}`] || 0} onSelect={setSelected} />
        ))}
      </ul>
      )}

      <section className="card-soft mt-4 p-4 text-xs leading-relaxed opacity-80">
        <h3 className="mb-1 text-sm font-extrabold opacity-100">📣 关于发音</h3>
        <p>
          按钮 🔊 会用泰国小学课本读法 <b>「字母音 + อ + 词」</b> 来读，例如：
        </p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4 font-mono">
          <li>ก ไก่ → 应念 <b>kor kai</b></li>
          <li>ษ ฤๅษี → 应念 <b>sor ruesi</b>（前面 sor 是字母名，让你听清辅音音）</li>
          <li>ฒ ผู้เฒ่า → 应念 <b>thor phu-thao</b>（前面 thor 是字母名）</li>
        </ul>
        <p className="mt-2">
          每个卡片下面有 <span style={{ color: "var(--duo-blue)" }}>🔊 应念: ...</span>
          标注 — 如果听到的跟标注差很远，多半是浏览器的泰语 TTS 引擎不准（特别是含
          ฤๅ、มณโฑ 这些梵语借字时）。
        </p>
      </section>

      <section className="card-soft mt-4 p-4 text-xs leading-relaxed opacity-80">
        <h3 className="mb-1 text-sm font-extrabold opacity-100">关于「奇怪的对应词」</h3>
        <p>
          每个辅音都有泰国小学课本约定的「记忆词」，部分是古词或梵语借词，但都是
          标准教学用法：
        </p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4">
          <li>ฌ เฌอ（树，古文）</li>
          <li>ฑ มณโฑ（Mantho，《罗摩衍那》中的人名）</li>
          <li>ฒ ผู้เฒ่า（老人，文雅词）</li>
          <li>ภ สำเภา（古代帆船）</li>
          <li>ษ ฤๅษี（隐士 / 苦行僧，梵语借词）</li>
        </ul>
        <p className="mt-1">
          不必背词义，只需关注每个词的开头辅音 — 那就是要学的字母音。
        </p>
      </section>

      <section className="card-soft p-4 mt-4">
        <h3 className="font-semibold mb-2">尾辅音读音规则</h3>
        <ul className="text-sm space-y-1">
          {Object.entries(FINAL_GROUPS).map(([k, v]) => (
            <li key={k}>
              <span className="font-mono mr-2">{k}</span>
              <span className="opacity-80">{v.description}</span>
            </li>
          ))}
        </ul>
      </section>
      </div>

      {selected && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between p-5 border-b border-black/10 dark:border-white/10">
              <div className="flex-1">
                <div className="thai-big text-5xl leading-none mb-2">{selected.letter}</div>
                <div className="flex flex-wrap items-center gap-2">
                  {classTag(selected.class)}
                  <PronounceButton text={consonantSpeak(selected)} />
                </div>
                <div className="thai-big mt-2 text-lg opacity-80">{selected.name}</div>
                <div className="mt-1 text-sm opacity-60">{selected.meaning}</div>
                <div className="mt-2 text-xs leading-relaxed">
                  初: <b>{displayRoman(selected.romanInitial)}</b> · 尾: <b>{selected.finalSound === "none" ? "无" : selected.finalSound}</b>
                  <br />
                  <span style={{ color: "var(--duo-blue)" }}>🔊 应念: {consonantPhonetic(selected)}</span>
                  {selected.obsolete && <span className="ml-2 opacity-60">已废</span>}
                </div>
                <FontSamples letter={selected.letter} />
              </div>
              <button onClick={() => setSelected(null)} className="text-2xl opacity-60 hover:opacity-100">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <TraceSvg key={selected.id} letter={selected.letter} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ConsonantCard({
  consonant: c,
  masteryValue: value,
  onSelect,
}: {
  consonant: Consonant;
  masteryValue: number;
  onSelect: (c: Consonant) => void;
}) {
  const pct = Math.round((value / MASTERY_TARGET) * 100);
  return (
    <li className="card flex min-h-[190px] cursor-pointer flex-col p-3 transition-transform hover:scale-[1.02]" onClick={() => onSelect(c)}>
      <div className="mb-2">
        <div className="mb-1 flex items-center justify-between text-[11px] opacity-60">
          <span>熟练度</span>
          <div className="flex items-center gap-1">
            <span>{value}/{MASTERY_TARGET}</span>
            {value > 0 && (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  clearMastery(`c:${c.id}`);
                }}
                className="text-[11px] leading-none opacity-50 hover:opacity-100"
                title="清空此字母的熟练度"
                aria-label="清空熟练度"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <div className="progress-track" style={{ height: "6px" }}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="grid grid-cols-[minmax(2.5rem,1fr)_auto] items-center gap-2">
        <div className="thai-big min-w-0 text-3xl leading-none">{c.letter}</div>
        <div className="flex h-9 shrink-0 items-center gap-1">
          {classTag(c.class)}
          <PronounceButton text={consonantSpeak(c)} className="h-9 min-w-14 px-3 py-0" />
        </div>
      </div>
      <div className="mt-2 grid gap-1 text-xs leading-tight">
        <div className="grid grid-cols-[2.1rem_1fr] items-baseline gap-1">
          <span className="opacity-50">名称</span>
          <span className="thai-big min-w-0 truncate">{c.name}</span>
        </div>
        <div className="grid grid-cols-[2.1rem_1fr] items-baseline gap-1">
          <span className="opacity-50">中文</span>
          <span className="min-w-0 truncate opacity-70">{c.meaning}</span>
        </div>
        <div className="grid grid-cols-[2.1rem_1fr] items-baseline gap-1">
          <span className="opacity-50">读音</span>
          <span className="min-w-0">
            初: <b>{displayRoman(c.romanInitial)}</b> · 尾: <b>{c.finalSound === "none" ? "无" : c.finalSound}</b>
          </span>
          {c.obsolete && <span className="ml-1 opacity-60">已废</span>}
        </div>
        <div className="grid grid-cols-[2.1rem_1fr] items-baseline gap-1 font-mono text-[11px]" style={{ color: "var(--duo-blue)" }}>
          <span className="opacity-60">应念</span>
          <span className="min-w-0 truncate">{consonantPhonetic(c)}</span>
        </div>
      </div>
    </li>
  );
}

function FontSamples({ letter }: { letter: string }) {
  const fonts = [
    { label: "Droid", className: "thai-font-droid" },
    { label: "副", className: "thai-font-looped" },
    { label: "Noto", className: "thai-font-noto" },
    { label: "Prompt", className: "thai-font-prompt" },
    { label: "Kanit", className: "thai-font-kanit" },
    { label: "Sarabun", className: "thai-font-sarabun" },
  ];

  return (
    <div className="mt-3 grid grid-cols-3 gap-1 sm:grid-cols-6">
      {fonts.map((font) => (
        <div key={font.label} className="rounded-lg border border-black/5 bg-black/[0.02] p-1 text-center dark:border-white/10 dark:bg-white/[0.03]">
          <div className={`${font.className} text-2xl leading-none`}>{letter}</div>
          <div className="mt-0.5 truncate text-[10px] opacity-50">{font.label}</div>
        </div>
      ))}
    </div>
  );
}

function Vowels() {
  const [filter, setFilter] = useState<"all" | "long" | "short" | "sound">("all");
  const [selected, setSelected] = useState<Vowel | null>(null);
  const mastery = useMastery();
  const orderedVowels = useMemo(() => {
    const order = [
      "a-short", "a-long",
      "i-short", "i-long",
      "ue-short", "ue-long",
      "u-short", "u-long",
      "e-short", "e-long",
      "ae-short", "ae-long",
      "o-short", "o-long",
      "oe-short", "or-long",
      "er-short", "er-long",
      "ia-short", "ia-long",
      "uea-short", "uea-long",
      "ua-short", "ua-long",
      "am", "ao",
      "ai-maimuan", "ai-maimalai",
      "rue", "rue-long",
      "lue", "lue-long",
    ];
    const orderMap = new Map(order.map((id, index) => [id, index]));
    return [...VOWELS]
      .sort((a, b) => (orderMap.get(a.id) ?? 999) - (orderMap.get(b.id) ?? 999))
      .filter((v) => filter === "all" || filter === "sound" || v.length === filter);
  }, [filter]);
  const soundGroups = useMemo(() => {
    const map = new Map<string, Vowel[]>();
    for (const v of orderedVowels) {
      map.set(v.roman, [...(map.get(v.roman) ?? []), v]);
    }
    return [...map.entries()];
  }, [orderedVowels]);

  function clearAll() {
    if (confirm("清空所有元音的熟练度？")) {
      resetMastery();
    }
  }

  useEffect(() => {
    if (selected) speak(vowelSpeak(selected));
  }, [selected]);

  return (
    <>
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["all", "long", "short", "sound"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? "btn-primary px-3" : "btn-ghost px-3"}
          >
            {f === "all" ? "全部" : f === "long" ? "长元音" : f === "short" ? "短元音" : "按读音"}
          </button>
        ))}
        <button
          onClick={clearAll}
          className="btn-ghost px-3 text-red-600 hover:text-red-700 text-sm"
          title="清空所有元音的熟练度"
        >
          🗑️ 清空所有
        </button>
      </div>

      {filter === "sound" ? (
        <div className="space-y-3">
          {soundGroups.map(([sound, vowels]) => (
            <section key={sound} className="space-y-2">
              <h3 className="font-mono text-sm font-extrabold opacity-75">{sound}</h3>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {vowels.map((v) => (
                  <VowelCard key={v.id} vowel={v} masteryValue={mastery[`v:${v.id}`] || 0} onSelect={setSelected} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {orderedVowels.map((v) => (
            <VowelCard key={v.id} vowel={v} masteryValue={mastery[`v:${v.id}`] || 0} onSelect={setSelected} />
          ))}
        </ul>
      )}
    </div>

    {selected && (
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between p-5 border-b border-black/10 dark:border-white/10">
            <div className="flex-1">
              <div className="thai-big text-5xl leading-none mb-2">{selected.display}</div>
              <div className="flex flex-wrap items-center gap-2">
                {vowelLengthTag(selected.length)}
                <PronounceButton text={vowelSpeak(selected)} />
              </div>
              <div className="mt-2 text-sm opacity-70">罗马音: <b>{selected.roman}</b></div>
              <div className="text-sm opacity-60">
                {selected.category === "diphthong" ? "复合元音" : selected.category === "special" ? "特殊元音" : "单元音"}
                {selected.notes ? ` · ${selected.notes}` : ""}
              </div>
              <div className="mt-1 font-mono text-xs" style={{ color: "var(--duo-blue)" }}>
                🔊 应念: {vowelPhonetic(selected)}
              </div>
              <FontSamples letter={selected.display} />
            </div>
            <button onClick={() => setSelected(null)} className="text-2xl opacity-60 hover:opacity-100">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <TraceSvg key={selected.id} letter={selected.display} strokeKey={`v:${selected.id}`} />
          </div>
        </div>
      </div>
    )}
    </>
  );
}

function VowelCard({
  vowel: v,
  masteryValue: value,
  onSelect,
}: {
  vowel: Vowel;
  masteryValue: number;
  onSelect: (v: Vowel) => void;
}) {
  const pct = Math.round((value / MASTERY_TARGET) * 100);
  return (
    <li className="card flex min-h-[190px] cursor-pointer flex-col p-3 transition-transform hover:scale-[1.02]" onClick={() => onSelect(v)}>
      <div className="mb-2">
        <div className="mb-1 flex items-center justify-between text-[11px] opacity-60">
          <span>熟练度</span>
          <div className="flex items-center gap-1">
            <span>{value}/{MASTERY_TARGET}</span>
            {value > 0 && (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  clearMastery(`v:${v.id}`);
                }}
                className="text-[11px] leading-none opacity-50 hover:opacity-100"
                title="清空此元音的熟练度"
                aria-label="清空熟练度"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <div className="progress-track" style={{ height: "6px" }}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="grid grid-cols-[minmax(2.5rem,1fr)_auto] items-center gap-2">
        <div className="thai-big min-w-0 truncate text-2xl leading-none">{v.display}</div>
        <div className="flex h-9 shrink-0 items-center gap-1">
          {vowelLengthTag(v.length)}
          <PronounceButton text={vowelSpeak(v)} className="h-9 min-w-14 px-3 py-0" />
        </div>
      </div>
      <div className="mt-2 grid gap-1 text-xs leading-tight">
        <div className="grid grid-cols-[2.6rem_1fr] items-baseline gap-1">
          <span className="opacity-50">罗马音</span>
          <span className="min-w-0 truncate"><b>{v.roman}</b></span>
        </div>
        <div className="grid grid-cols-[2.6rem_1fr] items-baseline gap-1">
          <span className="opacity-50">类型</span>
          <span className="min-w-0 truncate opacity-70">
            {v.category === "diphthong" ? "复合元音" : v.category === "special" ? "特殊元音" : "单元音"}
            {v.notes ? ` · ${v.notes}` : ""}
          </span>
        </div>
        <div className="grid grid-cols-[2.6rem_1fr] items-baseline gap-1 font-mono text-[11px]" style={{ color: "var(--duo-blue)" }}>
          <span className="opacity-60">应念</span>
          <span className="min-w-0 truncate">{vowelPhonetic(v)}</span>
        </div>
      </div>
    </li>
  );
}

function Tones() {
  return (
    <div className="space-y-4">
      <section className="card-soft p-4">
        <h3 className="font-semibold mb-2">声调符号</h3>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TONE_MARKS.map((m) => (
            <li key={m.id} className="card p-3">
              <div className="thai-big text-3xl leading-none">{m.symbol}</div>
              <div className="mt-1 text-xs">
                <div className="thai-big">{m.name}</div>
                <div className="opacity-70">{m.nameRoman}</div>
                {m.symbol !== "—" && <FontSamples letter={m.symbol} />}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card-soft p-4">
        <h3 className="font-semibold mb-2">5 声</h3>
        <ul className="text-sm space-y-1">
          {Object.entries(TONE_NAMES).map(([k, v]) => (
            <li key={k}>
              <b className="capitalize mr-2">{k}</b>
              <span className="thai-big">{v.th}</span>
              <span className="opacity-70 ml-2">{v.cn}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card-soft p-4 text-sm">
        <h3 className="font-semibold mb-2">声调推导规则</h3>
        <p className="opacity-80 mb-2">
          声调由 <b>初辅音类别</b>、<b>元音长短</b>、<b>尾辅音</b>、<b>声调符号</b> 共同决定。
        </p>
        <table className="w-full text-xs">
          <thead className="opacity-70">
            <tr><th className="text-left py-1">类别</th><th>无符号 + 活</th><th>无符号 + 死</th><th>เอก ่</th><th>โท ้</th><th>ตรี ๊</th><th>จัตวา ๋</th></tr>
          </thead>
          <tbody>
            <tr><td>中</td><td>平</td><td>低</td><td>低</td><td>降</td><td>高</td><td>升</td></tr>
            <tr><td>高</td><td>升</td><td>低</td><td>低</td><td>降</td><td>—</td><td>—</td></tr>
            <tr><td>低</td><td>平</td><td>短:高 / 长:降</td><td>降</td><td>高</td><td>—</td><td>—</td></tr>
          </tbody>
        </table>
        <p className="opacity-70 mt-2 text-xs">活音节 (เป็น) = 长元音/sonorant 尾；死音节 (ตาย) = 短元音不带尾或 stop 尾辅音。</p>
      </section>
    </div>
  );
}
