"use client";
import { useMemo, useState } from "react";
import { CONSONANTS, FINAL_GROUPS } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import { Vowel } from "@/data/types";
import { TONE_MARKS, TONE_NAMES } from "@/data/tones";
import PronounceButton from "@/components/PronounceButton";
import { MASTERY_TARGET, clearMastery, useMastery } from "@/lib/mastery";
import { consonantPhonetic, consonantSpeak, displayRoman, vowelPhonetic, vowelSpeak } from "@/lib/study";

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
  if (cls === "mid") return <span className="chip chip-mid">中</span>;
  if (cls === "high") return <span className="chip chip-high">高</span>;
  return <span className="chip chip-low">低</span>;
}

function Consonants() {
  const [filter, setFilter] = useState<"all" | "mid" | "high" | "low">("all");
  const mastery = useMastery();
  const list = useMemo(
    () => CONSONANTS.filter((c) => filter === "all" || c.class === filter),
    [filter]
  );
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {(["all", "mid", "high", "low"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? "btn-primary px-3" : "btn-ghost px-3"}
          >
            {f === "all" ? "全部" : f === "mid" ? "中辅音" : f === "high" ? "高辅音" : "低辅音"}
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {list.map((c) => (
          <li key={c.id} className="card p-3">
            {(() => {
              const value = mastery[`c:${c.id}`] || 0;
              const pct = Math.round((value / MASTERY_TARGET) * 100);
              return (
                <div className="mb-2">
                  <div className="mb-1 flex items-center justify-between text-[11px] opacity-60">
                    <span>熟练度</span>
                    <div className="flex items-center gap-1">
                      <span>{value}/{MASTERY_TARGET}</span>
                      {value > 0 && (
                        <button
                          onClick={() => clearMastery(`c:${c.id}`)}
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
              );
            })()}
            <div className="flex items-start justify-between">
              <div className="thai-big text-3xl leading-none">{c.letter}</div>
              <div className="flex items-center gap-1">
                {classTag(c.class)}
                <PronounceButton text={consonantSpeak(c)} />
              </div>
            </div>
            <div className="mt-2 text-xs">
              <div className="thai-big">{c.name}</div>
              <div className="opacity-70 mt-0.5">{c.meaning}</div>
              <div className="mt-1">
                初: <b>{displayRoman(c.romanInitial)}</b> · 尾: <b>{c.finalSound === "none" ? "无" : c.finalSound}</b>
                {c.obsolete && <span className="ml-1 opacity-60">已废</span>}
              </div>
              <div className="mt-1 font-mono text-[11px]" style={{ color: "var(--duo-blue)" }}>
                🔊 应念: {consonantPhonetic(c)}
              </div>
              <FontSamples letter={c.letter} />
            </div>
          </li>
        ))}
      </ul>

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
  const mastery = useMastery();
  const groups = [
    { key: "monophthong-long", title: "长元音 (单元音)", filter: (v: Vowel) => v.category === "monophthong" && v.length === "long" },
    { key: "monophthong-short", title: "短元音 (单元音)", filter: (v: Vowel) => v.category === "monophthong" && v.length === "short" },
    { key: "diphthong-long", title: "长复合元音", filter: (v: Vowel) => v.category === "diphthong" && v.length === "long" },
    { key: "diphthong-short", title: "短复合元音", filter: (v: Vowel) => v.category === "diphthong" && v.length === "short" },
    { key: "special", title: "特殊元音", filter: (v: Vowel) => v.category === "special" },
  ];
  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <section key={g.key} className="space-y-2">
          <h3 className="font-semibold text-sm opacity-80">{g.title}</h3>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {VOWELS.filter(g.filter).map((v) => (
              <li key={v.id} className="card p-3">
                {(() => {
                  const value = mastery[`v:${v.id}`] || 0;
                  const pct = Math.round((value / MASTERY_TARGET) * 100);
                  return (
                    <div className="mb-2">
                      <div className="mb-1 flex items-center justify-between text-[11px] opacity-60">
                        <span>熟练度</span>
                        <div className="flex items-center gap-1">
                          <span>{value}/{MASTERY_TARGET}</span>
                          {value > 0 && (
                            <button
                              onClick={() => clearMastery(`v:${v.id}`)}
                              className="text-[11px] leading-none opacity-50 hover:opacity-100"
                              title="清空此元音的熟练度"
                              aria-label="清空熟练度"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                        <div className="h-full bg-black dark:bg-white" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })()}
                <div className="flex items-center justify-between">
                  <div className="thai-big text-2xl">{v.display}</div>
                  <PronounceButton text={vowelSpeak(v)} />
                </div>
                <div className="mt-1 text-xs">
                  <div>罗马音: <b>{v.roman}</b></div>
                  <div className="opacity-70">{v.length === "long" ? "长" : "短"}{v.notes ? ` · ${v.notes}` : ""}</div>
                  <div className="mt-1 font-mono text-[11px]" style={{ color: "var(--duo-blue)" }}>
                    🔊 应念: {vowelPhonetic(v)}
                  </div>
                  <FontSamples letter={v.display} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
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
