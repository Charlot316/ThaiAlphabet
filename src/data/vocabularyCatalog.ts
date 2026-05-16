import { VOCABULARY } from "./vocabulary";
import { VOCABULARY_EXPANSION_A1_DAILY_01 } from "./vocabularyExpansionA1Daily01";
import { VOCABULARY_EXPANSION_A1_DAILY_02 } from "./vocabularyExpansionA1Daily02";
import { VOCABULARY_EXPANSION_A1_DAILY_03 } from "./vocabularyExpansionA1Daily03";
import { VOCABULARY_EXPANSION_A2_CONNECTORS_PARTICLES_01 } from "./vocabularyExpansionA2ConnectorsParticles01";
import { VOCABULARY_EXPANSION_A2_CONNECTORS_PARTICLES_02 } from "./vocabularyExpansionA2ConnectorsParticles02";
import { VOCABULARY_EXPANSION_A2_TRAVEL_COMMERCE_01 } from "./vocabularyExpansionA2TravelCommerce01";
import { VOCABULARY_EXPANSION_A2_TRAVEL_COMMERCE_02 } from "./vocabularyExpansionA2TravelCommerce02";

type RawExpansionExample = {
  thai: string;
  roman: string;
  chinese: string;
};

type RawExpansionSense = {
  chinese: string;
  examples?: RawExpansionExample[];
  example?: RawExpansionExample;
  usageNotesZh?: string[];
};

type RawExpansionCandidate = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: string;
  theme: string;
  level: string;
  priority: number;
  senses?: RawExpansionSense[];
  tags?: string[];
};

export interface VocabularyCatalogEntry {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: string;
  theme: string;
  level: string;
  priority: number;
  source: "core" | "candidate";
  batch: string;
  tags: string[];
  senseCount: number;
  example?: RawExpansionExample;
  notesZh?: string[];
}

function normalizeExpansion(
  entries: unknown,
  batch: string
): VocabularyCatalogEntry[] {
  return (entries as RawExpansionCandidate[]).map((entry) => {
    const firstSense = entry.senses?.[0];
    return {
      id: entry.id,
      thai: entry.thai,
      roman: entry.roman,
      chinese: entry.chinese,
      partOfSpeech: String(entry.partOfSpeech),
      theme: String(entry.theme),
      level: String(entry.level),
      priority: Number(entry.priority) || 0,
      source: "candidate",
      batch,
      tags: entry.tags ?? [],
      senseCount: entry.senses?.length ?? 1,
      example: firstSense?.examples?.[0] ?? firstSense?.example,
      notesZh: firstSense?.usageNotesZh,
    };
  });
}

export const VOCABULARY_CATALOG_ENTRIES: VocabularyCatalogEntry[] = [
  ...VOCABULARY.map((entry) => ({
    id: entry.id,
    thai: entry.thai,
    roman: entry.roman,
    chinese: entry.chinese,
    partOfSpeech: entry.partOfSpeech,
    theme: entry.theme,
    level: entry.level,
    priority: entry.priority,
    source: "core" as const,
    batch: "基础词表",
    tags: entry.tags,
    senseCount: 1,
    example: entry.example,
  })),
  ...normalizeExpansion(VOCABULARY_EXPANSION_A1_DAILY_01, "A1 日常 01"),
  ...normalizeExpansion(VOCABULARY_EXPANSION_A1_DAILY_02, "A1 日常 02"),
  ...normalizeExpansion(VOCABULARY_EXPANSION_A1_DAILY_03, "A1 日常 03"),
  ...normalizeExpansion(VOCABULARY_EXPANSION_A2_TRAVEL_COMMERCE_01, "A2 旅行商业 01"),
  ...normalizeExpansion(VOCABULARY_EXPANSION_A2_TRAVEL_COMMERCE_02, "A2 旅行商业 02"),
  ...normalizeExpansion(VOCABULARY_EXPANSION_A2_CONNECTORS_PARTICLES_01, "A2 功能词 01"),
  ...normalizeExpansion(VOCABULARY_EXPANSION_A2_CONNECTORS_PARTICLES_02, "A2 功能词 02"),
].sort((a, b) => {
  const level = a.level.localeCompare(b.level);
  if (level !== 0) return level;
  return a.priority - b.priority;
});

export const VOCABULARY_CATALOG_THEMES = Array.from(
  new Set(VOCABULARY_CATALOG_ENTRIES.map((entry) => entry.theme))
).sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));

export const VOCABULARY_CATALOG_LEVELS = Array.from(
  new Set(VOCABULARY_CATALOG_ENTRIES.map((entry) => entry.level))
).sort();

export const VOCABULARY_CATALOG_STATS = {
  total: VOCABULARY_CATALOG_ENTRIES.length,
  core: VOCABULARY_CATALOG_ENTRIES.filter((entry) => entry.source === "core").length,
  candidate: VOCABULARY_CATALOG_ENTRIES.filter((entry) => entry.source === "candidate").length,
};
