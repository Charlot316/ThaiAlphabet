import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "src/data");
const outFile = path.join(dataDir, "vocabularyCatalog.ts");

const expansionFiles = readdirSync(dataDir)
  .filter((file) => /^vocabularyExpansion.*\.ts$/.test(file))
  .sort((a, b) => a.localeCompare(b));

function exportNameFor(file) {
  const source = readFileSync(path.join(dataDir, file), "utf8");
  const match = source.match(/export const\s+([A-Z0-9_]+)/);
  if (!match) throw new Error(`Missing export const in ${file}`);
  return match[1];
}

function importPathFor(file) {
  return `./${file.replace(/\.ts$/, "")}`;
}

const imports = expansionFiles.map((file, index) => {
  const exportName = exportNameFor(file);
  return {
    file,
    alias: `EXPANSION_${index}`,
    exportName,
    importPath: importPathFor(file),
  };
});

const generated = `import { VOCABULARY } from "./vocabulary";
import { VOCABULARY_ENRICHMENT } from "./vocabularyEnrichment";
${imports.map((item) => `import { ${item.exportName} as ${item.alias} } from "${item.importPath}";`).join("\n")}

type RawExpansionExample = {
  thai?: string;
  roman?: string;
  chinese?: string;
};

type RawExpansionSense = {
  id?: string;
  chinese?: string;
  examples?: RawExpansionExample[];
  example?: RawExpansionExample;
  usageNotesZh?: string[];
  grammarIds?: string[];
  tags?: string[];
};

type RawExpansionCandidate = {
  id?: string;
  thai?: string;
  roman?: string;
  chinese?: string;
  english?: string;
  partOfSpeech?: string;
  theme?: string;
  level?: string;
  priority?: number;
  senses?: RawExpansionSense[];
  tags?: string[];
  sourceRefs?: string[];
  reviewStatus?: string;
};

export type VocabularyCatalogSource = "core" | "enrichment" | "candidate";

export type VocabularyQuality = "精修" | "已丰富" | "候选";

export interface VocabularyCatalogExample {
  thai: string;
  roman: string;
  chinese: string;
}

export interface VocabularyCatalogEntry {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  english?: string;
  partOfSpeech: string;
  theme: string;
  level: string;
  priority: number;
  source: VocabularyCatalogSource;
  quality: VocabularyQuality;
  batches: string[];
  tags: string[];
  senseCount: number;
  example?: VocabularyCatalogExample;
  examples: VocabularyCatalogExample[];
  notesZh: string[];
  grammarIds: string[];
  duplicateCount: number;
}

interface RawCatalogEntry extends Omit<VocabularyCatalogEntry, "batches" | "examples" | "notesZh" | "grammarIds" | "duplicateCount"> {
  batch: string;
  examples: VocabularyCatalogExample[];
  notesZh: string[];
  grammarIds: string[];
}

const EXPANSION_BATCHES: Array<{ batch: string; entries: unknown }> = [
${imports.map((item) => `  { batch: "${item.file.replace(/"/g, "\\\"").replace(/\.ts$/, "")}", entries: ${item.alias} },`).join("\n")}
];

const LEVEL_RANK: Record<string, number> = {
  "pre-a1": 0,
  a1: 1,
  "a1-plus": 2,
  a2: 3,
  b1: 4,
  b2: 5,
  c1: 6,
  c2: 7,
};

const SOURCE_RANK: Record<VocabularyCatalogSource, number> = {
  core: 0,
  enrichment: 1,
  candidate: 2,
};

const QUALITY_RANK: Record<VocabularyQuality, number> = {
  "已丰富": 0,
  "精修": 1,
  "候选": 2,
};

function cleanText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeExample(example?: RawExpansionExample): VocabularyCatalogExample | undefined {
  const thai = cleanText(example?.thai);
  if (!thai) return undefined;
  return {
    thai,
    roman: cleanText(example?.roman),
    chinese: cleanText(example?.chinese),
  };
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function inferGrammarIds(entry: Pick<RawCatalogEntry, "partOfSpeech" | "theme" | "tags" | "thai" | "chinese">) {
  const haystack = \`\${entry.partOfSpeech} \${entry.theme} \${entry.tags.join(" ")} \${entry.thai} \${entry.chinese}\`;
  const ids: string[] = [];
  if (/疑问|question|ไหม|อะไร|ไหน|ใคร|เมื่อไร|ทำไม|ยังไง/.test(haystack)) ids.push("yes-no-questions", "question-word-position");
  if (/否定|ไม่|ไม่ได้|不要|别|不能|没有|negation/.test(haystack)) ids.push("basic-negation-mai");
  if (/时间|日期|星期|ก่อน|หลัง|แล้ว|กำลัง|เคย|time|sequence/.test(haystack)) ids.push("time-words-as-tense", "completion-laaeo");
  if (/量词|数量|classifier|กี่|个|件|ครั้ง|บาท/.test(haystack)) ids.push("classifier-basics");
  if (/比较|กว่า|ที่สุด|更|最|一样|comparison/.test(haystack)) ids.push("comparison-gwaa", "superlative-thii-sut");
  if (/因为|所以|但是|如果|虽然|连接|เพราะ|แต่|ถ้า|conjunction|cause/.test(haystack)) ids.push("conjunction-contrast-reason", "adverbial-clauses-conditional");
  if (/礼貌|ขอบคุณ|ขอโทษ|ครับ|ค่ะ|นะ|polite|particle/.test(haystack)) ids.push("polite-particles", "softening-particles-na-si-la");
  if (/可以|必须|应该|想要|可能|ต้อง|ควร|อยาก|ได้|modal/.test(haystack)) ids.push("modal-dai-samart", "modal-need-should");
  if (/地点|位置|อยู่|ทาง|ที่นี่|ข้าง|place|location/.test(haystack)) ids.push("location-yuu", "position-words");
  return uniqueStrings(ids);
}

function normalizeExpansion(entries: unknown, batch: string): RawCatalogEntry[] {
  return (entries as RawExpansionCandidate[])
    .filter((entry) => cleanText(entry?.thai))
    .map((entry, index) => {
      const senses = Array.isArray(entry.senses) ? entry.senses : [];
      const examples = senses
        .flatMap((sense) => [normalizeExample(sense.example), ...(sense.examples ?? []).map(normalizeExample)])
        .filter((example): example is VocabularyCatalogExample => Boolean(example));
      const firstSense = senses[0];
      const tags = uniqueStrings([...(entry.tags ?? []), cleanText(entry.theme)]);
      const base: RawCatalogEntry = {
        id: cleanText(entry.id, \`\${batch}-\${index + 1}\`),
        thai: cleanText(entry.thai),
        roman: cleanText(entry.roman),
        chinese: cleanText(entry.chinese),
        english: cleanText(entry.english),
        partOfSpeech: cleanText(entry.partOfSpeech, "候选"),
        theme: cleanText(entry.theme, "未分类"),
        level: cleanText(entry.level, batch.includes("A1") ? "a1" : batch.includes("A2") ? "a2" : batch.includes("B1") ? "b1" : batch.includes("B2") ? "b2" : batch.includes("C1") ? "c1" : batch.includes("C2") ? "c2" : "a2"),
        priority: Number(entry.priority) || index + 1,
        source: "candidate",
        quality: "候选",
        batch,
        tags,
        senseCount: Math.max(1, senses.length),
        example: examples[0],
        examples: examples.slice(0, 3),
        notesZh: uniqueStrings(senses.flatMap((sense) => sense.usageNotesZh ?? [])),
        grammarIds: uniqueStrings(senses.flatMap((sense) => sense.grammarIds ?? [])),
      };
      base.grammarIds = uniqueStrings([...base.grammarIds, ...inferGrammarIds(base)]);
      if (!base.notesZh.length && firstSense?.chinese && firstSense.chinese !== base.chinese) base.notesZh = [firstSense.chinese];
      return base;
    });
}

function baseEntries(): RawCatalogEntry[] {
  const coreEntries: RawCatalogEntry[] = VOCABULARY.map((entry) => ({
    id: entry.id,
    thai: entry.thai,
    roman: entry.roman,
    chinese: entry.chinese,
    english: entry.english,
    partOfSpeech: entry.partOfSpeech,
    theme: entry.theme,
    level: entry.level,
    priority: entry.priority,
    source: "core",
    quality: "精修",
    batch: "基础词表",
    tags: entry.tags,
    senseCount: 1,
    example: entry.example,
    examples: entry.example ? [entry.example] : [],
    notesZh: [],
    grammarIds: inferGrammarIds(entry),
  }));

  const enrichmentEntries: RawCatalogEntry[] = VOCABULARY_ENRICHMENT.map((entry) => {
    const examples = [
      ...(entry.examples ?? []),
      ...entry.senses.flatMap((sense) => sense.examples ?? []),
    ].map((example) => ({
      thai: example.thai,
      roman: example.roman,
      chinese: example.chinese,
    }));
    const grammarIds = uniqueStrings(entry.senses.flatMap((sense) => sense.grammarIds ?? []));
    const base: RawCatalogEntry = {
      id: entry.vocabularyId,
      thai: entry.thai,
      roman: entry.roman,
      chinese: entry.chinese,
      english: entry.english,
      partOfSpeech: "enriched",
      theme: entry.registers[0] ?? "enrichment",
      level: entry.senses.find((sense) => sense.level)?.level ?? "a1",
      priority: 0,
      source: "enrichment",
      quality: "已丰富",
      batch: "精修释义",
      tags: uniqueStrings(entry.senses.flatMap((sense) => sense.tags ?? [])),
      senseCount: Math.max(1, entry.senses.length),
      example: examples[0],
      examples: examples.slice(0, 3),
      notesZh: entry.learningNotesZh,
      grammarIds,
    };
    base.grammarIds = uniqueStrings([...base.grammarIds, ...inferGrammarIds(base)]);
    return base;
  });

  return [
    ...coreEntries,
    ...enrichmentEntries,
    ...EXPANSION_BATCHES.flatMap((batch) => normalizeExpansion(batch.entries, batch.batch)),
  ];
}

function mergeEntries(entries: RawCatalogEntry[]): VocabularyCatalogEntry[] {
  const byThai = new Map<string, RawCatalogEntry[]>();
  for (const entry of entries) {
    const key = entry.thai.normalize("NFC");
    byThai.set(key, [...(byThai.get(key) ?? []), entry]);
  }

  return Array.from(byThai.values()).map((group) => {
    const sorted = group.sort((a, b) => {
      const source = SOURCE_RANK[a.source] - SOURCE_RANK[b.source];
      if (source !== 0) return source;
      const level = (LEVEL_RANK[a.level] ?? 99) - (LEVEL_RANK[b.level] ?? 99);
      if (level !== 0) return level;
      return a.priority - b.priority;
    });
    const primary = sorted[0];
    const chinese = uniqueStrings(sorted.flatMap((entry) => entry.chinese.split(/[；;]/).map((item) => item.trim()))).slice(0, 4).join("；");
    const examples = sorted.flatMap((entry) => entry.examples).filter((example, index, list) => list.findIndex((item) => item.thai === example.thai) === index).slice(0, 4);
    const notesZh = uniqueStrings(sorted.flatMap((entry) => entry.notesZh)).slice(0, 5);
    const grammarIds = uniqueStrings(sorted.flatMap((entry) => entry.grammarIds));
    const quality = sorted.map((entry) => entry.quality).sort((a, b) => QUALITY_RANK[a] - QUALITY_RANK[b])[0];
    return {
      ...primary,
      quality,
      chinese: chinese || primary.chinese,
      batches: uniqueStrings(sorted.map((entry) => entry.batch)),
      tags: uniqueStrings(sorted.flatMap((entry) => entry.tags)).slice(0, 12),
      senseCount: sorted.reduce((sum, entry) => sum + entry.senseCount, 0),
      example: examples[0] ?? primary.example,
      examples,
      notesZh,
      grammarIds,
      duplicateCount: sorted.length,
    };
  }).sort((a, b) => {
    const level = (LEVEL_RANK[a.level] ?? 99) - (LEVEL_RANK[b.level] ?? 99);
    if (level !== 0) return level;
    const source = SOURCE_RANK[a.source] - SOURCE_RANK[b.source];
    if (source !== 0) return source;
    return a.priority - b.priority;
  });
}

export const VOCABULARY_CATALOG_RAW_COUNT = baseEntries().length;

export const VOCABULARY_CATALOG_ENTRIES: VocabularyCatalogEntry[] = mergeEntries(baseEntries());

export const VOCABULARY_CATALOG_THEMES = Array.from(
  new Set(VOCABULARY_CATALOG_ENTRIES.map((entry) => entry.theme))
).sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));

export const VOCABULARY_CATALOG_LEVELS = Array.from(
  new Set(VOCABULARY_CATALOG_ENTRIES.map((entry) => entry.level))
).sort((a, b) => (LEVEL_RANK[a] ?? 99) - (LEVEL_RANK[b] ?? 99));

export const VOCABULARY_CATALOG_GRAMMAR_IDS = Array.from(
  new Set(VOCABULARY_CATALOG_ENTRIES.flatMap((entry) => entry.grammarIds))
).sort();

export const VOCABULARY_CATALOG_STATS = {
  rawTotal: VOCABULARY_CATALOG_RAW_COUNT,
  total: VOCABULARY_CATALOG_ENTRIES.length,
  deduped: VOCABULARY_CATALOG_RAW_COUNT - VOCABULARY_CATALOG_ENTRIES.length,
  core: VOCABULARY_CATALOG_ENTRIES.filter((entry) => entry.source === "core").length,
  enriched: VOCABULARY_CATALOG_ENTRIES.filter((entry) => entry.quality === "已丰富").length,
  candidate: VOCABULARY_CATALOG_ENTRIES.filter((entry) => entry.quality === "候选").length,
  a1a2: VOCABULARY_CATALOG_ENTRIES.filter((entry) => entry.level === "pre-a1" || entry.level === "a1" || entry.level === "a2" || entry.level === "a1-plus").length,
  grammarLinked: VOCABULARY_CATALOG_ENTRIES.filter((entry) => entry.grammarIds.length > 0).length,
};
`;

writeFileSync(outFile, generated);
console.log(`Generated ${path.relative(root, outFile)} with ${imports.length} expansion imports.`);
