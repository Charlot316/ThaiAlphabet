"use client";
import { useMemo, useState } from "react";
import { CONSONANTS, FINAL_GROUPS } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import { Vowel } from "@/data/types";
import { TONE_MARKS, TONE_NAMES } from "@/data/tones";
import PronounceButton from "@/components/PronounceButton";

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
            className={tab === t ? "btn-primary text-sm py-2 px-3" : "btn-ghost text-sm py-2 px-3"}
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
  if (cls === "mid") return <span className="tag-mid">中</span>;
  if (cls === "high") return <span className="tag-high">高</span>;
  return <span className="tag-low">低</span>;
}

function Consonants() {
  const [filter, setFilter] = useState<"all" | "mid" | "high" | "low">("all");
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
            className={filter === f ? "btn-primary text-xs py-1.5 px-3" : "btn-ghost text-xs py-1.5 px-3"}
          >
            {f === "all" ? "全部" : f === "mid" ? "中辅音" : f === "high" ? "高辅音" : "低辅音"}
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {list.map((c) => (
          <li key={c.id} className="card p-3">
            <div className="flex items-start justify-between">
              <div className="thai-big text-3xl leading-none">{c.letter}</div>
              <div className="flex items-center gap-1">
                {classTag(c.class)}
                <PronounceButton text={`${c.letter} ${c.name}`} />
              </div>
            </div>
            <div className="mt-2 text-xs">
              <div className="thai-big">{c.name}</div>
              <div className="opacity-70 mt-0.5">{c.meaning}</div>
              <div className="mt-1">
                初: <b>{c.romanInitial}</b> · 尾: <b>{c.finalSound}</b>
                {c.obsolete && <span className="ml-1 opacity-60">已废</span>}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <section className="card p-4 mt-4">
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

function Vowels() {
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
                <div className="flex items-center justify-between">
                  <div className="thai-big text-2xl">{v.display}</div>
                  <PronounceButton text={v.display.replace(/◌/g, "อ")} />
                </div>
                <div className="mt-1 text-xs">
                  <div>罗马音: <b>{v.roman}</b></div>
                  <div className="opacity-70">{v.length === "long" ? "长" : "短"}{v.notes ? ` · ${v.notes}` : ""}</div>
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
      <section className="card p-4">
        <h3 className="font-semibold mb-2">声调符号</h3>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TONE_MARKS.map((m) => (
            <li key={m.id} className="card p-3">
              <div className="thai-big text-3xl leading-none">{m.symbol}</div>
              <div className="mt-1 text-xs">
                <div className="thai-big">{m.name}</div>
                <div className="opacity-70">{m.nameRoman}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-4">
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

      <section className="card p-4 text-sm">
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
