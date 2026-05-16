export type ConsonantClass = "mid" | "high" | "low";

export type FinalSound =
  | "k"
  | "t"
  | "p"
  | "n"
  | "m"
  | "ng"
  | "y"
  | "w"
  | "none";

export interface Consonant {
  id: string;
  letter: string;
  name: string;
  nameRoman: string;
  meaning: string;
  romanInitial: string;
  finalSound: FinalSound;
  class: ConsonantClass;
  obsolete?: boolean;
}

export type VowelCategory =
  | "monophthong"
  | "diphthong"
  | "special";

export interface Vowel {
  id: string;
  form: string;
  display: string;
  roman: string;
  length: "short" | "long";
  category: VowelCategory;
  inherentTone?: "mid" | "low" | "falling" | "high" | "rising";
  notes?: string;
}

export type ToneName = "mid" | "low" | "falling" | "high" | "rising";

export type ToneMark = "none" | "ek" | "tho" | "tri" | "chattawa";

export type ContentLevel = "pre-a1" | "a1" | "a1-plus" | "a2";

export interface LearningSource {
  id: string;
  title: string;
  url: string;
  notes?: string;
}

export interface ThaiExample {
  thai: string;
  roman: string;
  chinese: string;
  literalZh?: string;
}

export type GrammarCategory =
  | "typology"
  | "sentence-order"
  | "noun-phrase"
  | "pronoun"
  | "particle"
  | "question"
  | "negation"
  | "aspect"
  | "classifier"
  | "location"
  | "modal"
  | "degree"
  | "comparison"
  | "conjunction"
  | "clause"
  | "serial-verb"
  | "passive-causative"
  | "pragmatics"
  | "word-formation"
  | "register";

export interface GrammarPoint {
  id: string;
  titleZh: string;
  titleEn: string;
  category: GrammarCategory;
  level: ContentLevel;
  summaryZh: string;
  patterns: string[];
  examples: ThaiExample[];
  tags: string[];
  sourceRefs: string[];
}

export interface GrammarTrack {
  id: string;
  titleZh: string;
  level: ContentLevel;
  summaryZh: string;
  pointIds: string[];
  reviewPointIds?: string[];
}

export type VocabularyPartOfSpeech =
  | "phrase"
  | "particle"
  | "pronoun"
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "question"
  | "number"
  | "conjunction"
  | "classifier";

export type VocabularyTheme =
  | "core"
  | "greeting"
  | "politeness"
  | "identity"
  | "people"
  | "grammar-tool"
  | "question"
  | "time"
  | "number"
  | "food"
  | "place"
  | "travel"
  | "shopping"
  | "quality"
  | "classroom";

export interface VocabularyEntry {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  english: string;
  partOfSpeech: VocabularyPartOfSpeech;
  theme: VocabularyTheme;
  level: ContentLevel;
  priority: number;
  ttsText?: string;
  classifier?: string;
  variants?: string[];
  tags: string[];
  example?: ThaiExample;
  sourceRefs: string[];
}

export type SentenceSlotKind =
  | "person"
  | "noun"
  | "verb"
  | "adjective"
  | "place"
  | "food"
  | "number"
  | "classifier";

export interface SentencePatternSlot {
  key: string;
  kind: SentenceSlotKind;
  vocabularyIds: string[];
}

export interface SentencePattern {
  id: string;
  titleZh: string;
  level: ContentLevel;
  templateThai: string;
  templateRoman: string;
  templateChinese: string;
  grammarIds: string[];
  slots: SentencePatternSlot[];
  examples: ThaiExample[];
  tags: string[];
}
