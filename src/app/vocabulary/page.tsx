"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BookMarked,
  Brain,
  ChevronLeft,
  ChevronRight,
  Languages,
  LibraryBig,
  LockKeyhole,
  Search,
} from "lucide-react";
import {
  VOCABULARY_CATALOG_ENTRIES,
  VOCABULARY_CATALOG_LEVELS,
  VOCABULARY_CATALOG_STATS,
  VOCABULARY_CATALOG_THEMES,
  type VocabularyCatalogEntry,
} from "@/data/vocabularyCatalog";
import { ALPHABET_FINAL_EXAM_POLICY, useAlphabetFinalExamResult } from "@/lib/moduleProgress";

const PAGE_SIZE = 24;

const SUMMARY_CARDS: Array<{ icon: typeof LibraryBig; title: string; subtitle: string }> = [
  { icon: LibraryBig, title: "基础词表", subtitle: `${VOCABULARY_CATALOG_STATS.core} 条已入库` },
  { icon: BookMarked, title: "扩词候选", subtitle: "按批次逐步审核" },
  { icon: Brain, title: "记忆课程", subtitle: "稍后复用 SRS" },
];

function includesText(entry: VocabularyCatalogEntry, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [
    entry.thai,
    entry.roman,
    entry.chinese,
    entry.theme,
    entry.level,
    entry.partOfSpeech,
    entry.batch,
    entry.tags.join(" "),
    entry.example?.thai ?? "",
    entry.example?.chinese ?? "",
  ]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

export default function VocabularyPage() {
  const examResult = useAlphabetFinalExamResult();
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("all");
  const [level, setLevel] = useState("all");
  const [source, setSource] = useState<"all" | "core" | "candidate">("all");
  const [page, setPage] = useState(1);
  const courseUnlocked = Boolean(examResult);

  useEffect(() => {
    setPage(1);
  }, [query, theme, level, source]);

  const filtered = useMemo(
    () =>
      VOCABULARY_CATALOG_ENTRIES.filter((entry) => {
        if (theme !== "all" && entry.theme !== theme) return false;
        if (level !== "all" && entry.level !== level) return false;
        if (source !== "all" && entry.source !== source) return false;
        return includesText(entry, query);
      }),
    [level, query, source, theme]
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="space-y-5">
      <section className="card-soft p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border"
              style={{
                background: "color-mix(in srgb, var(--duo-purple) 10%, var(--duo-card))",
                borderColor: "color-mix(in srgb, var(--duo-purple) 28%, var(--duo-line))",
                color: "var(--duo-purple-d)",
              }}
            >
              <Languages size={23} strokeWidth={2.1} />
            </div>
            <div className="min-w-0">
              <div className="text-2xl font-semibold">词汇</div>
              <p className="mt-2 max-w-2xl text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
                词汇总览可以提前浏览；正式词汇课程会等字母和语法主线之后再接入。
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip chip-blue">{VOCABULARY_CATALOG_STATS.total} 条可浏览</span>
                <span className="chip chip-low">{VOCABULARY_CATALOG_STATS.candidate} 扩词候选</span>
                <span className={courseUnlocked ? "chip chip-high" : "chip"} style={courseUnlocked ? undefined : { background: "var(--surface-subtle)", color: "var(--duo-muted)", borderColor: "var(--duo-line)" }}>
                  {courseUnlocked ? "后续课程可接入" : "课程未解锁"}
                </span>
              </div>
            </div>
          </div>

          {!courseUnlocked && (
            <Link href={ALPHABET_FINAL_EXAM_POLICY.route} className="btn-orange shrink-0">
              <LockKeyhole size={16} strokeWidth={2.2} />
              课程锁定
            </Link>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SUMMARY_CARDS.map(({ icon: Icon, title, subtitle }) => {
          return (
            <div key={title} className="rounded-lg border p-4" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)", boxShadow: "var(--shadow-small)" }}>
              <div className="flex items-center gap-3">
                <Icon size={19} strokeWidth={2.1} style={{ color: "var(--duo-blue-d)" }} />
                <div>
                  <div className="font-semibold">{title}</div>
                  <div className="text-sm" style={{ color: "var(--duo-muted)" }}>{subtitle}</div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="rounded-lg border p-3" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)" }}>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_160px_130px_130px]">
          <label className="flex items-center gap-2 rounded-lg border px-3 py-2" style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)" }}>
            <Search size={17} strokeWidth={2.1} style={{ color: "var(--duo-muted)" }} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索泰文、罗马音、中文..."
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
            />
          </label>

          <select value={theme} onChange={(event) => setTheme(event.target.value)} className="rounded-lg border px-3 py-2 text-sm font-semibold outline-none" style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-text)" }}>
            <option value="all">全部主题</option>
            {VOCABULARY_CATALOG_THEMES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <select value={level} onChange={(event) => setLevel(event.target.value)} className="rounded-lg border px-3 py-2 text-sm font-semibold outline-none" style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-text)" }}>
            <option value="all">全部级别</option>
            {VOCABULARY_CATALOG_LEVELS.map((item) => (
              <option key={item} value={item}>{item.toUpperCase()}</option>
            ))}
          </select>

          <select value={source} onChange={(event) => setSource(event.target.value as typeof source)} className="rounded-lg border px-3 py-2 text-sm font-semibold outline-none" style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-text)" }}>
            <option value="all">全部来源</option>
            <option value="core">基础</option>
            <option value="candidate">候选</option>
          </select>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm" style={{ color: "var(--duo-muted)" }}>
        <div>
          共 <span className="font-semibold" style={{ color: "var(--duo-text)" }}>{filtered.length}</span> 条，当前第 {safePage} / {pageCount} 页
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="btn-ghost h-10 px-3" disabled={safePage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
            <ChevronLeft size={16} strokeWidth={2.2} />
            上一页
          </button>
          <button type="button" className="btn-ghost h-10 px-3" disabled={safePage >= pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>
            下一页
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {pageItems.map((entry) => (
          <article key={`${entry.source}:${entry.id}`} className="rounded-lg border p-4" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)", boxShadow: "var(--shadow-small)" }}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="thai-big text-3xl leading-none">{entry.thai}</div>
                <div className="mt-2 font-mono text-sm font-semibold" style={{ color: "var(--duo-blue-d)" }}>{entry.roman}</div>
                <div className="mt-1 text-sm font-semibold">{entry.chinese}</div>
              </div>
              <span className={entry.source === "core" ? "chip chip-high" : "chip chip-low"}>
                {entry.source === "core" ? "基础" : "候选"}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="chip" style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-muted)" }}>{entry.level.toUpperCase()}</span>
              <span className="chip" style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-muted)" }}>{entry.theme}</span>
              <span className="chip" style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-muted)" }}>{entry.partOfSpeech}</span>
            </div>

            {entry.example && (
              <div className="mt-3 rounded-lg border p-3 text-sm leading-6" style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)" }}>
                <div className="thai-big text-lg">{entry.example.thai}</div>
                <div className="font-mono text-xs" style={{ color: "var(--duo-muted)" }}>{entry.example.roman}</div>
                <div className="mt-1">{entry.example.chinese}</div>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2 text-xs" style={{ color: "var(--duo-muted)" }}>
              <span>{entry.batch}</span>
              <span>·</span>
              <span>{entry.senseCount} 个义项</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
