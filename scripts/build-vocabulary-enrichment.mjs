import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const DEFAULT_INPUT = "data/lexicon/thai-lexicon-top-50000.tsv";
const DEFAULT_LIMIT = 200;

function parseArgs(argv) {
  const options = {
    input: DEFAULT_INPUT,
    out: null,
    startRank: 1,
    limit: DEFAULT_LIMIT,
    level: null,
    format: "jsonl",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      i += 1;
      if (i >= argv.length) throw new Error(`Missing value for ${arg}`);
      return argv[i];
    };

    if (arg === "--input") options.input = next();
    else if (arg === "--out") options.out = next();
    else if (arg === "--start-rank") options.startRank = parsePositiveInt(next(), arg);
    else if (arg === "--limit") options.limit = parsePositiveInt(next(), arg);
    else if (arg === "--level") options.level = next();
    else if (arg === "--format") options.format = next();
    else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!["jsonl", "json"].includes(options.format)) {
    throw new Error("--format must be jsonl or json");
  }

  return options;
}

function parsePositiveInt(value, label) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${label} must be a positive integer`);
  }
  return parsed;
}

function parseTsv(text) {
  const [headerLine, ...lines] = text.trimEnd().split(/\r?\n/u);
  const headers = headerLine.split("\t");
  const required = ["rank", "word", "count", "level", "source", "flags"];
  for (const field of required) {
    if (!headers.includes(field)) throw new Error(`Input TSV is missing ${field}`);
  }

  return lines
    .filter(Boolean)
    .map((line) => {
      const values = line.split("\t");
      return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
    })
    .map((row) => ({
      rank: Number.parseInt(row.rank, 10),
      word: row.word,
      count: Number.parseInt(row.count, 10),
      level: row.level,
      source: row.source,
      flags: row.flags ? row.flags.split("|") : [],
    }))
    .filter((row) => Number.isFinite(row.rank) && row.word);
}

function selectSegment(rows, options) {
  return rows
    .filter((row) => row.rank >= options.startRank)
    .filter((row) => !options.level || row.level === options.level)
    .slice(0, options.limit);
}

function buildConfusableCandidates(row, rows) {
  const chars = [...row.word];
  if (chars.length < 2) return [];

  const prefix = chars.slice(0, Math.min(2, chars.length - 1)).join("");
  const suffix = chars.slice(-Math.min(2, chars.length - 1)).join("");
  const candidates = [];

  for (const other of rows) {
    if (other.word === row.word) continue;
    const sharesPrefix = other.word.startsWith(prefix);
    const sharesSuffix = other.word.endsWith(suffix);
    const closeLength = Math.abs([...other.word].length - chars.length) <= 1;
    if ((sharesPrefix || sharesSuffix) && closeLength) {
      candidates.push({
        word: other.word,
        rank: other.rank,
        reason: sharesPrefix ? "shared-prefix" : "shared-suffix",
        status: "candidate-needs-review",
      });
    }
    if (candidates.length >= 5) break;
  }

  return candidates;
}

function buildCard(row, rows, inputLabel) {
  const reviewWarnings = [];
  if (row.flags.includes("short-token-review")) reviewWarnings.push("short token: verify segmentation");
  if (row.flags.includes("frequency-only")) reviewWarnings.push("not found in PyThaiNLP word list");
  if (row.flags.includes("abbrev-or-formula")) reviewWarnings.push("possible abbreviation or formula");
  if (row.flags.includes("contains-number")) reviewWarnings.push("contains number");

  return {
    id: `thai-vocab-${String(row.rank).padStart(5, "0")}`,
    thai: row.word,
    rank: row.rank,
    level: row.level,
    frequency: {
      count: row.count,
      rank: row.rank,
    },
    source: {
      lexiconFile: inputLabel,
      sourceIds: [row.source],
      flags: row.flags,
    },
    review: {
      status: "needs-enrichment",
      assignee: null,
      updatedAt: null,
      warnings: reviewWarnings,
    },
    enrichment: {
      partOfSpeech: null,
      register: null,
      domains: [],
      senses: [
        {
          id: "sense-1",
          chinese: null,
          english: null,
          status: "needs-sense-review",
          register: null,
          examples: [
            {
              thai: null,
              roman: null,
              zhHans: null,
              grammarIds: [],
              source: null,
              status: "needs-example",
              qualityRules: [
                "must match this exact sense",
                "should be a complete natural sentence",
                "should contain useful grammar beyond a bare phrase when possible",
              ],
            },
          ],
          relations: {
            synonyms: [],
            nearSynonyms: [],
            antonyms: [],
            confusables: buildConfusableCandidates(row, rows),
          },
          collocations: [],
          notes: [],
        },
      ],
      topLevelRelations: {
        synonyms: [],
        antonyms: [],
        confusables: [],
      },
      notes: [],
    },
  };
}

function formatCards(cards, format) {
  if (format === "json") return `${JSON.stringify(cards, null, 2)}\n`;
  return `${cards.map((card) => JSON.stringify(card)).join("\n")}\n`;
}

function printHelp() {
  console.log(`Usage:
  node scripts/build-vocabulary-enrichment.mjs [options]

Options:
  --input <path>        TSV lexicon input. Default: ${DEFAULT_INPUT}
  --out <path>          Write output file. Omit to print to stdout.
  --start-rank <n>      First rank to include. Default: 1
  --limit <n>           Number of cards to export. Default: ${DEFAULT_LIMIT}
  --level <level>       Optional level filter: pre-a1, a1, a2, b1, b2, c1, c2
  --format <jsonl|json> Output format. Default: jsonl
`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const inputPath = resolve(options.input);
  const rows = parseTsv(await readFile(inputPath, "utf8"));
  const segment = selectSegment(rows, options);
  const cards = segment.map((row) => buildCard(row, rows, options.input));
  const output = formatCards(cards, options.format);

  if (options.out) {
    const outPath = resolve(options.out);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, output, "utf8");
    console.error(`Wrote ${cards.length} ${options.format} vocabulary enrichment cards to ${outPath}`);
  } else {
    process.stdout.write(output);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
