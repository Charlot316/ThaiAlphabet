"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BookMarked,
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Languages,
  LibraryBig,
  LockKeyhole,
  RotateCcw,
  Search,
  Target,
  Volume2,
} from "lucide-react";
import {
  VOCABULARY_CATALOG_ENTRIES,
  VOCABULARY_CATALOG_LEVELS,
  VOCABULARY_CATALOG_STATS,
  VOCABULARY_CATALOG_THEMES,
  type VocabularyCatalogEntry,
} from "@/data/vocabularyCatalog";
import { ALPHABET_FINAL_EXAM_POLICY, useAlphabetFinalExamResult } from "@/lib/moduleProgress";
import { speak, warmupVoices } from "@/lib/tts";
import { VOCABULARY_COURSE_STATS, VOCABULARY_COURSE_UNITS } from "@/lib/vocabularyCourse";
import {
  recordVocabularyOutcome,
  setVocabularyCursor,
  useVocabularyProgress,
  type VocabularyOutcome,
} from "@/lib/vocabularyProgress";

const PAGE_SIZE = 24;

const SUMMARY_CARDS: Array<{ icon: typeof LibraryBig; title: string; subtitle: string }> = [
  { icon: LibraryBig, title: "统一词库", subtitle: `${VOCABULARY_CATALOG_STATS.total} 条可用 · 去重 ${VOCABULARY_CATALOG_STATS.deduped}` },
  { icon: BookMarked, title: "质量分层", subtitle: `${VOCABULARY_CATALOG_STATS.enriched} 已丰富 · ${VOCABULARY_CATALOG_STATS.candidate} 候选` },
  { icon: Brain, title: "课程路线", subtitle: `${VOCABULARY_COURSE_STATS.units} 单元 · ${VOCABULARY_COURSE_STATS.plannedEntries} 词已排课` },
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
    entry.batches.join(" "),
    entry.tags.join(" "),
    entry.example?.thai ?? "",
    entry.example?.chinese ?? "",
  ]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

type VocabularyPracticeMode = "flashcard" | "memory" | "match" | "choice";
type FlashcardOrder = "formal" | "random";

const PRACTICE_ENTRIES = VOCABULARY_CATALOG_ENTRIES.filter((entry) => entry.thai && entry.chinese);
const EARLY_PRACTICE_ENTRIES = PRACTICE_ENTRIES.filter((entry) => ["pre-a1", "a1", "a1-plus", "a2"].includes(entry.level));

function shuffleArray<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function entryKey(entry: VocabularyCatalogEntry) {
  return `${entry.source}:${entry.id}`;
}

function entryMeaning(entry: VocabularyCatalogEntry) {
  return entry.chinese.replace(/\s+/g, " ").trim();
}

function chooseRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function nextFormalEntry(cursor: number, entries = EARLY_PRACTICE_ENTRIES) {
  return entries[cursor % entries.length] ?? entries[0] ?? PRACTICE_ENTRIES[0];
}

function nextMemoryEntry(records: ReturnType<typeof useVocabularyProgress>["records"]) {
  const now = Date.now();
  return [...EARLY_PRACTICE_ENTRIES]
    .sort((a, b) => {
      const ar = records[entryKey(a)];
      const br = records[entryKey(b)];
      const aDue = ar?.due && ar.due <= now ? 0 : 1;
      const bDue = br?.due && br.due <= now ? 0 : 1;
      if (aDue !== bDue) return aDue - bDue;
      return (ar?.score ?? 0) - (br?.score ?? 0);
    })[0] ?? EARLY_PRACTICE_ENTRIES[0] ?? PRACTICE_ENTRIES[0];
}

function choiceOptions(entry: VocabularyCatalogEntry, mode: "thai-to-meaning" | "meaning-to-thai") {
  const pool = EARLY_PRACTICE_ENTRIES.filter((item) => item.id !== entry.id);
  const seen = new Set<string>();
  const distractors: VocabularyCatalogEntry[] = [];
  for (const item of shuffleArray(pool)) {
    const key = mode === "thai-to-meaning" ? entryMeaning(item) : item.thai;
    if (seen.has(key)) continue;
    seen.add(key);
    distractors.push(item);
    if (distractors.length >= 3) break;
  }
  return shuffleArray([entry, ...distractors]);
}

export default function VocabularyPage() {
  const examResult = useAlphabetFinalExamResult();
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("all");
  const [level, setLevel] = useState("all");
  const [source, setSource] = useState<"all" | "core" | "enrichment" | "candidate">("all");
  const [page, setPage] = useState(1);
  const [selectedEntryKey, setSelectedEntryKey] = useState<string | null>(null);
  const vocabularyProgress = useVocabularyProgress();
  const courseUnlocked = Boolean(examResult);

  useEffect(() => {
    warmupVoices();
  }, []);

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

  function playEntry(entry: VocabularyCatalogEntry) {
    setSelectedEntryKey(entryKey(entry));
    speak(entry.thai, { rate: 0.86 });
  }

  function playExample(thai: string) {
    speak(thai, { rate: 0.86 });
  }

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
                <span className="chip chip-low">{VOCABULARY_CATALOG_STATS.rawTotal} 条原始候选</span>
                <span className="chip chip-high">{VOCABULARY_CATALOG_STATS.grammarLinked} 条已连语法</span>
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

      <VocabularyPracticePanel progress={vocabularyProgress} />

      <section className="card-soft p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-lg font-semibold">词汇课程路线</div>
            <p className="mt-1 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
              先把 A1/A2 基础词按主题排进课程，再和语法点交叉复习；候选词保留质量标签，后续逐批精修。
            </p>
          </div>
          <span className="chip chip-blue shrink-0">{VOCABULARY_COURSE_STATS.grammarLinked} 条语法连接</span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {VOCABULARY_COURSE_UNITS.map((unit, index) => (
            <article
              key={unit.id}
              className="rounded-lg border p-4"
              style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)", boxShadow: "var(--shadow-small)" }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="chip chip-blue">第 {index + 1} 单元</span>
                <span className="chip" style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-muted)" }}>
                  {unit.level.toUpperCase()}
                </span>
              </div>
              <h3 className="mt-3 font-semibold">{unit.titleZh}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
                {unit.summaryZh}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold" style={{ color: "var(--duo-muted)" }}>
                <span>{unit.entryIds.length} 词</span>
                <span>·</span>
                <span>{unit.grammarIds.length} 个语法点</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {unit.sample.slice(0, 6).map((entry) => (
                  <span
                    key={`${unit.id}:${entry.id}`}
                    className="rounded-md border px-2 py-1 text-sm font-semibold"
                    style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)" }}
                  >
                    {entry.thai}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
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
            <option value="enrichment">精修扩展</option>
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
        {pageItems.map((entry) => {
          const selected = selectedEntryKey === entryKey(entry);
          const example = entry.example;
          return (
            <article
              key={entryKey(entry)}
              onClick={() => playEntry(entry)}
              className="rounded-lg border p-4 text-left transition"
              style={{
                background: selected ? "color-mix(in srgb, var(--duo-blue) 8%, var(--duo-card))" : "var(--duo-card)",
                borderColor: selected ? "var(--duo-blue)" : "var(--duo-line)",
                boxShadow: selected ? "0 0 0 2px color-mix(in srgb, var(--duo-blue) 26%, transparent), var(--shadow-small)" : "var(--shadow-small)",
                cursor: "pointer",
              }}
            >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="thai-big min-w-0 text-3xl leading-none">{entry.thai}</div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      playEntry(entry);
                    }}
                    className="btn-blue h-9 w-9 shrink-0 p-0"
                    aria-label={`播放 ${entry.thai}`}
                    title="播放发音"
                  >
                    <Volume2 size={16} strokeWidth={2.2} />
                  </button>
                </div>
                <div className="mt-2 font-mono text-sm font-semibold" style={{ color: "var(--duo-blue-d)" }}>{entry.roman}</div>
                <div className="mt-1 text-sm font-semibold">{entry.chinese}</div>
              </div>
              <span className={entry.quality === "候选" ? "chip chip-low" : "chip chip-high"}>
                {entry.quality}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="chip" style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-muted)" }}>{entry.level.toUpperCase()}</span>
              <span className="chip" style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-muted)" }}>{entry.theme}</span>
              <span className="chip" style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-muted)" }}>{entry.partOfSpeech}</span>
              {entry.grammarIds.length > 0 && (
                <span className="chip chip-blue">{entry.grammarIds.length} 语法</span>
              )}
              {entry.duplicateCount > 1 && (
                <span className="chip chip-low">合并 {entry.duplicateCount}</span>
              )}
            </div>

            {example && (
              <div className="mt-3 rounded-lg border p-3 text-sm leading-6" style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)" }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="thai-big text-lg">{example.thai}</div>
                    <div className="font-mono text-xs" style={{ color: "var(--duo-muted)" }}>{example.roman}</div>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      playExample(example.thai);
                    }}
                    className="btn-blue h-9 shrink-0 px-3 py-0 text-xs"
                    aria-label={`播放例句 ${example.thai}`}
                    title="播放例句"
                  >
                    <Volume2 size={15} strokeWidth={2.2} />
                    例句
                  </button>
                </div>
                <div className="mt-1">{example.chinese}</div>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2 text-xs" style={{ color: "var(--duo-muted)" }}>
              <span>{entry.batches.slice(0, 2).join(" / ")}</span>
              {entry.batches.length > 2 && <span>+{entry.batches.length - 2}</span>}
              <span>·</span>
              <span>{entry.senseCount} 个义项</span>
            </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function VocabularyPracticePanel({
  progress,
}: {
  progress: ReturnType<typeof useVocabularyProgress>;
}) {
  const [mode, setMode] = useState<VocabularyPracticeMode>("flashcard");
  const [order, setOrder] = useState<FlashcardOrder>("formal");
  const [active, setActive] = useState<VocabularyCatalogEntry>(() => nextFormalEntry(progress.cursors.flashcardFormal ?? 0));
  const [revealed, setRevealed] = useState(false);
  const [choiceMode, setChoiceMode] = useState<"thai-to-meaning" | "meaning-to-thai">("thai-to-meaning");
  const [choiceEntry, setChoiceEntry] = useState<VocabularyCatalogEntry>(() => chooseRandom(EARLY_PRACTICE_ENTRIES));
  const [choicePicked, setChoicePicked] = useState<string | null>(null);
  const [matchItems, setMatchItems] = useState<VocabularyCatalogEntry[]>(() => shuffleArray(EARLY_PRACTICE_ENTRIES).slice(0, 5));
  const [matchRightItems, setMatchRightItems] = useState<VocabularyCatalogEntry[]>(() => shuffleArray(EARLY_PRACTICE_ENTRIES).slice(0, 5));
  const [matchedIds, setMatchedIds] = useState<Set<string>>(() => new Set());
  const [leftPick, setLeftPick] = useState<VocabularyCatalogEntry | null>(null);
  const [rightPick, setRightPick] = useState<VocabularyCatalogEntry | null>(null);

  const records = progress.records;
  const learnedCount = Object.keys(records).length;
  const avgScore = learnedCount
    ? Math.round(Object.values(records).reduce((sum, record) => sum + record.score, 0) / learnedCount)
    : 0;

  function play(entry = active) {
    speak(entry.thai, { rate: 0.86 });
  }

  function pickNextFlashcard(nextOrder = order) {
    if (nextOrder === "formal") {
      const cursor = (progress.cursors.flashcardFormal ?? 0) + 1;
      setVocabularyCursor("flashcardFormal", cursor);
      const next = nextFormalEntry(cursor);
      setActive(next);
      setRevealed(false);
      speak(next.thai, { rate: 0.86 });
      return;
    }
    const next = chooseRandom(EARLY_PRACTICE_ENTRIES);
    setActive(next);
    setRevealed(false);
    speak(next.thai, { rate: 0.86 });
  }

  function answerActive(outcome: VocabularyOutcome) {
    recordVocabularyOutcome(entryKey(active), outcome);
    pickNextFlashcard();
  }

  function switchOrder(next: FlashcardOrder) {
    setOrder(next);
    const nextEntry = next === "formal"
      ? nextFormalEntry(progress.cursors.flashcardFormal ?? 0)
      : chooseRandom(EARLY_PRACTICE_ENTRIES);
    setActive(nextEntry);
    setRevealed(false);
    speak(nextEntry.thai, { rate: 0.86 });
  }

  function nextMemory() {
    const next = nextMemoryEntry(records);
    setActive(next);
    setRevealed(false);
    speak(next.thai, { rate: 0.86 });
  }

  function nextChoice() {
    const nextMode = Math.random() > 0.5 ? "thai-to-meaning" : "meaning-to-thai";
    const next = chooseRandom(EARLY_PRACTICE_ENTRIES);
    setChoiceMode(nextMode);
    setChoiceEntry(next);
    setChoicePicked(null);
    speak(next.thai, { rate: 0.86 });
  }

  function resetMatch() {
    const next = shuffleArray(EARLY_PRACTICE_ENTRIES).slice(0, 5);
    setMatchItems(next);
    setMatchRightItems(shuffleArray(next));
    setMatchedIds(new Set());
    setLeftPick(null);
    setRightPick(null);
  }

  function resolveMatch(left: VocabularyCatalogEntry | null, right: VocabularyCatalogEntry | null) {
    if (!left || !right) return;
    const correct = left.id === right.id;
    recordVocabularyOutcome(entryKey(left), correct ? "correct" : "wrong");
    if (correct) {
      speak(left.thai, { rate: 0.86 });
      const nextMatched = new Set(matchedIds);
      nextMatched.add(left.id);
      if (nextMatched.size >= matchItems.length) {
        setTimeout(resetMatch, 450);
      } else {
        setMatchedIds(nextMatched);
      }
    }
    setLeftPick(null);
    setRightPick(null);
  }

  useEffect(() => {
    if (mode === "memory") nextMemory();
    if (mode === "choice") nextChoice();
    if (mode === "match") resetMatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if (mode !== "flashcard" || order !== "formal") return;
    setActive(nextFormalEntry(progress.cursors.flashcardFormal ?? 0));
  }, [mode, order, progress.cursors.flashcardFormal]);

  const choiceList = useMemo(() => choiceOptions(choiceEntry, choiceMode), [choiceEntry, choiceMode]);
  const modeButtons: Array<{ id: VocabularyPracticeMode; label: string; icon: typeof Eye; desc: string }> = [
    { id: "flashcard", label: "闪卡速看", icon: Eye, desc: "正式顺序 / 乱序" },
    { id: "memory", label: "记忆模式", icon: Brain, desc: "不认识 / 模糊 / 认识" },
    { id: "match", label: "无尽配对", icon: Target, desc: "泰文 ↔ 中文" },
    { id: "choice", label: "选择题", icon: Check, desc: "看词选义 / 看义选词" },
  ];

  return (
    <section className="card-soft p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-lg font-semibold">词汇练习</div>
          <p className="mt-1 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
            先用 A1/A2 词开始背。词汇进度只记录见过的词和游标，登录后会随同步系统上传。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="chip chip-blue">已见 {learnedCount}</span>
          <span className="chip chip-high">平均 {avgScore}/100</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {modeButtons.map(({ id, label, icon: Icon, desc }) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`rounded-lg border p-3 text-left transition ${mode === id ? "ring-2" : ""}`}
            style={{
              background: mode === id ? "color-mix(in srgb, var(--duo-blue) 10%, var(--duo-card))" : "var(--duo-card)",
              borderColor: mode === id ? "var(--duo-blue)" : "var(--duo-line)",
              boxShadow: "var(--shadow-small)",
            }}
          >
            <div className="flex items-center gap-2 font-semibold">
              <Icon size={17} strokeWidth={2.2} style={{ color: "var(--duo-blue-d)" }} />
              {label}
            </div>
            <div className="mt-1 text-xs" style={{ color: "var(--duo-muted)" }}>{desc}</div>
          </button>
        ))}
      </div>

      {mode === "flashcard" && (
        <div className="mt-4 rounded-lg border p-4" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)" }}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              {(["formal", "random"] as const).map((item) => (
                <button key={item} type="button" onClick={() => switchOrder(item)} className={order === item ? "btn-primary h-9 px-3" : "btn-ghost h-9 px-3"}>
                  {item === "formal" ? "正式顺序" : "乱序"}
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold" style={{ color: "var(--duo-muted)" }}>
              正式进度 {(progress.cursors.flashcardFormal ?? 0) % EARLY_PRACTICE_ENTRIES.length} / {EARLY_PRACTICE_ENTRIES.length}
            </span>
          </div>
          <VocabularyWordCard entry={active} revealed={revealed} onPlay={() => play(active)} />
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <button type="button" className="btn-ghost py-3" onClick={() => setRevealed((value) => !value)}>{revealed ? "隐藏答案" : "看答案"}</button>
            <button type="button" className="btn-red py-3" onClick={() => answerActive("wrong")}>不认识</button>
            <button type="button" className="btn-orange py-3" onClick={() => answerActive("hard")}>模糊</button>
            <button type="button" className="btn-primary py-3" onClick={() => answerActive("correct")}>认识</button>
          </div>
        </div>
      )}

      {mode === "memory" && (
        <div className="mt-4 rounded-lg border p-4" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)" }}>
          <VocabularyWordCard entry={active} revealed={revealed} onPlay={() => play(active)} />
          {!revealed ? (
            <button type="button" className="btn-primary mt-4 w-full py-3" onClick={() => setRevealed(true)}>显示答案</button>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button type="button" className="btn-red py-3" onClick={() => { recordVocabularyOutcome(entryKey(active), "wrong"); nextMemory(); }}>不认识</button>
              <button type="button" className="btn-orange py-3" onClick={() => { recordVocabularyOutcome(entryKey(active), "hard"); nextMemory(); }}>模糊</button>
              <button type="button" className="btn-primary py-3" onClick={() => { recordVocabularyOutcome(entryKey(active), "correct"); nextMemory(); }}>认识</button>
            </div>
          )}
        </div>
      )}

      {mode === "choice" && (
        <div className="mt-4 rounded-lg border p-4" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)" }}>
          <div className="chip chip-blue">{choiceMode === "thai-to-meaning" ? "这个词是什么意思？" : "哪个泰文表达这个意思？"}</div>
          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border p-4" style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)" }}>
            <div>
              <div className={choiceMode === "thai-to-meaning" ? "thai-big text-5xl leading-none" : "text-xl font-semibold"}>
                {choiceMode === "thai-to-meaning" ? choiceEntry.thai : entryMeaning(choiceEntry)}
              </div>
              {choiceMode === "thai-to-meaning" && <div className="mt-2 font-mono text-sm" style={{ color: "var(--duo-muted)" }}>{choiceEntry.roman}</div>}
            </div>
            <button type="button" className="btn-blue h-10 w-10 p-0" onClick={() => speak(choiceEntry.thai, { rate: 0.86 })}>
              <Volume2 size={17} strokeWidth={2.2} />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {choiceList.map((option) => {
              const correct = option.id === choiceEntry.id;
              const picked = choicePicked === option.id;
              const settled = choicePicked !== null;
              let cls = "btn-ghost min-h-[64px] justify-start px-4 py-3 text-left";
              if (settled && correct) cls = "btn-primary min-h-[64px] justify-start px-4 py-3 text-left";
              else if (settled && picked) cls = "btn-red min-h-[64px] justify-start px-4 py-3 text-left";
              return (
                <button
                  key={option.id}
                  type="button"
                  className={cls}
                  disabled={settled}
                  onClick={() => {
                    setChoicePicked(option.id);
                    recordVocabularyOutcome(entryKey(choiceEntry), correct ? "correct" : "wrong");
                    if (correct) speak(choiceEntry.thai, { rate: 0.86 });
                  }}
                >
                  {choiceMode === "thai-to-meaning" ? entryMeaning(option) : <span className="thai-big text-2xl">{option.thai}</span>}
                </button>
              );
            })}
          </div>
          {choicePicked && <button type="button" className="btn-primary mt-4 w-full py-3" onClick={nextChoice}>继续</button>}
        </div>
      )}

      {mode === "match" && (
        <div className="mt-4 rounded-lg border p-4" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)" }}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="chip chip-blue">一次 5 组，配完自动换一组</span>
            <button type="button" className="btn-ghost h-9 px-3" onClick={resetMatch}>
              <RotateCcw size={15} strokeWidth={2.2} />
              换一组
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              {matchItems.map((entry) => {
                const matched = matchedIds.has(entry.id);
                return (
                  <button
                    key={`left:${entry.id}`}
                    type="button"
                    disabled={matched}
                    className={`btn-ghost min-h-[58px] ${leftPick?.id === entry.id ? "ring-2" : ""} ${matched ? "opacity-30" : ""}`}
                    onClick={() => {
                      setLeftPick(entry);
                      resolveMatch(entry, rightPick);
                    }}
                  >
                    <span className="thai-big text-2xl">{entry.thai}</span>
                  </button>
                );
              })}
            </div>
            <div className="grid gap-2">
              {matchRightItems.map((entry) => {
                const matched = matchedIds.has(entry.id);
                return (
                  <button
                    key={`right:${entry.id}`}
                    type="button"
                    disabled={matched}
                    className={`btn-ghost min-h-[58px] justify-start px-3 text-left ${rightPick?.id === entry.id ? "ring-2" : ""} ${matched ? "opacity-30" : ""}`}
                    onClick={() => {
                      setRightPick(entry);
                      resolveMatch(leftPick, entry);
                    }}
                  >
                    {entryMeaning(entry)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function VocabularyWordCard({
  entry,
  revealed,
  onPlay,
}: {
  entry: VocabularyCatalogEntry;
  revealed: boolean;
  onPlay: () => void;
}) {
  const record = useVocabularyProgress().records[entryKey(entry)];
  useEffect(() => {
    speak(entry.thai, { rate: 0.86 });
  }, [entry.id, entry.thai]);

  return (
    <div className="mt-4 rounded-lg border p-5 text-center" style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)" }}>
      <div className="thai-big text-6xl leading-none">{entry.thai}</div>
      <button type="button" className="btn-blue mt-4 h-10 px-4" onClick={onPlay}>
        <Volume2 size={17} strokeWidth={2.2} />
        听
      </button>
      <div className="mt-4 font-mono text-sm font-semibold" style={{ color: "var(--duo-blue-d)" }}>{entry.roman}</div>
      <div className="mt-2 min-h-7 text-base font-semibold" style={{ color: revealed ? "var(--duo-text)" : "var(--duo-muted)" }}>
        {revealed ? entryMeaning(entry) : "答案已隐藏"}
      </div>
      {entry.example && revealed && (
        <div className="mx-auto mt-3 max-w-2xl rounded-lg border p-3 text-left text-sm leading-6" style={{ borderColor: "var(--duo-line)", background: "var(--duo-card)" }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="thai-big text-lg">{entry.example.thai}</div>
              <div className="font-mono text-xs" style={{ color: "var(--duo-muted)" }}>{entry.example.roman}</div>
            </div>
            <button type="button" className="btn-blue h-9 px-3 text-xs" onClick={() => speak(entry.example!.thai, { rate: 0.86 })}>
              <Volume2 size={14} strokeWidth={2.2} />
              例句
            </button>
          </div>
          <div className="mt-1">{entry.example.chinese}</div>
        </div>
      )}
      <div className="mt-3 text-xs" style={{ color: "var(--duo-muted)" }}>
        熟练度 {record?.score ?? 0}/100 · 已见 {record?.seen ?? 0} 次
      </div>
    </div>
  );
}
