import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const PHUPHA_URL = "https://zenodo.org/records/18490474/files/wordfreq.csv?download=1";
const PYTHAINLP_WORDS_URL =
  "https://raw.githubusercontent.com/PyThaiNLP/pythainlp/dev/pythainlp/corpus/words_th.txt";

const OUT_TSV = resolve("data/lexicon/thai-lexicon-top-50000.tsv");
const OUT_MANIFEST = resolve("data/lexicon/manifest.json");
const TARGET_SIZE = 50000;
const REVIEW_SAFE_SHORT_WORDS = new Set([
  "ก็",
  "จะ",
  "ใน",
  "ไป",
  "มา",
  "มี",
  "ดี",
  "ดู",
  "คน",
  "ไม่",
  "ได้",
  "ให้",
  "ขอ",
  "รับ",
  "ของ",
  "ที่",
  "และ",
  "เป็น",
  "กับ",
  "จาก",
  "ถึง",
  "แต่",
  "หรือ",
]);

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (ch === "," && !quoted) {
      values.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  values.push(current);
  return values;
}

function hasThaiLetter(word) {
  return /[\u0E01-\u0E2E]/u.test(word);
}

function isMostlyThaiLexeme(word) {
  if (!word || word.length > 48) return false;
  if (!hasThaiLetter(word)) return false;
  if ([...word].length < 2) return false;
  if (/[\u0000-\u001F]/u.test(word)) return false;
  if (/[<>[\]{}|\\/@#$%^*_+=~`]/u.test(word)) return false;
  return true;
}

function rankToLevel(rank) {
  if (rank <= 500) return "pre-a1";
  if (rank <= 1500) return "a1";
  if (rank <= 3500) return "a2";
  if (rank <= 8000) return "b1";
  if (rank <= 15000) return "b2";
  if (rank <= 30000) return "c1";
  return "c2";
}

function flagsFor(word, inPyThaiNlp) {
  const flags = [];
  if (inPyThaiNlp) flags.push("pythainlp");
  if ([...word].length <= 2 && !REVIEW_SAFE_SHORT_WORDS.has(word)) flags.push("short-token-review");
  if (/[.ฯ]/u.test(word)) flags.push("abbrev-or-formula");
  if (/\d|[๐-๙]/u.test(word)) flags.push("contains-number");
  if (word.length >= 20) flags.push("long-compound");
  return flags.join("|") || "frequency-only";
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

async function main() {
  const [phuphaCsv, pyThaiNlpWords] = await Promise.all([
    fetchText(PHUPHA_URL),
    fetchText(PYTHAINLP_WORDS_URL),
  ]);

  const pyThaiNlpSet = new Set(
    pyThaiNlpWords
      .split(/\r?\n/u)
      .map((line) => line.trim())
      .filter(isMostlyThaiLexeme)
  );

  const frequencyMap = new Map();
  const lines = phuphaCsv.split(/\r?\n/u);
  for (const line of lines.slice(1)) {
    if (!line.trim()) continue;
    const [wordRaw, countRaw] = parseCsvLine(line);
    const word = wordRaw.trim();
    const count = Number.parseInt(countRaw, 10);
    if (!Number.isFinite(count) || count <= 0) continue;
    if (!isMostlyThaiLexeme(word)) continue;
    const previous = frequencyMap.get(word) ?? 0;
    frequencyMap.set(word, Math.max(previous, count));
  }

  const ranked = [...frequencyMap.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "th"))
    .slice(0, TARGET_SIZE);

  const header = ["rank", "word", "count", "level", "source", "flags"].join("\t");
  const rows = ranked.map(([word, count], index) => {
    const rank = index + 1;
    const source = "phupha-wordfreq";
    const flags = flagsFor(word, pyThaiNlpSet.has(word));
    return [rank, word, count, rankToLevel(rank), source, flags].join("\t");
  });

  await mkdir(dirname(OUT_TSV), { recursive: true });
  await writeFile(OUT_TSV, `${header}\n${rows.join("\n")}\n`, "utf8");

  const manifest = {
    generatedAt: new Date().toISOString(),
    targetSize: TARGET_SIZE,
    output: "thai-lexicon-top-50000.tsv",
    counts: {
      phuphaUniqueFiltered: frequencyMap.size,
      pyThaiNlpWords: pyThaiNlpSet.size,
      exported: ranked.length,
    },
    sources: [
      {
        id: "phupha-wordfreq",
        url: PHUPHA_URL,
        license: "CC0-1.0",
      },
      {
        id: "pythainlp-words-th",
        url: PYTHAINLP_WORDS_URL,
        license: "Apache-2.0",
        use: "membership flag only",
      },
    ],
    levelBands: {
      "pre-a1": "rank 1-500",
      a1: "rank 501-1500",
      a2: "rank 1501-3500",
      b1: "rank 3501-8000",
      b2: "rank 8001-15000",
      c1: "rank 15001-30000",
      c2: "rank 30001-50000",
    },
    notes: [
      "This is a passive recognition lexicon, not a finished learner deck.",
      "Chinese definitions, examples, register labels, and business-domain tags should be added in curated layers above this raw frequency file.",
      "Entries marked frequency-only need dictionary review before becoming active study cards.",
    ],
  };
  await writeFile(OUT_MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(`Wrote ${ranked.length} Thai lexicon rows to ${OUT_TSV}`);
  console.log(`Wrote manifest to ${OUT_MANIFEST}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
