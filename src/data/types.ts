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

export type ContentLevel = "pre-a1" | "a1" | "a1-plus" | "a2" | "b1" | "b2" | "c1" | "c2";

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
  | "phonology"
  | "orthography"
  | "typology"
  | "word-class"
  | "sentence-order"
  | "noun-phrase"
  | "pronoun"
  | "particle"
  | "question"
  | "negation"
  | "aspect"
  | "classifier"
  | "location"
  | "verb-phrase"
  | "modal"
  | "degree"
  | "adverbial"
  | "comparison"
  | "conjunction"
  | "clause"
  | "serial-verb"
  | "passive-causative"
  | "benefactive-purposive"
  | "potential"
  | "pragmatics"
  | "body-expression"
  | "word-formation"
  | "discourse"
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

export interface GrammarCoverageSection {
  id: string;
  titleZh: string;
  titleEn: string;
  level: ContentLevel;
  summaryZh: string;
  pointIds: string[];
  sourceRefs: string[];
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

export type VocabularyReviewStatus =
  | "draft"
  | "needs-enrichment"
  | "llm-draft"
  | "human-draft"
  | "needs-source-check"
  | "needs-review"
  | "reviewed"
  | "verified"
  | "approved"
  | "rejected";

export type VocabularyRegister =
  | "neutral"
  | "colloquial"
  | "slang"
  | "vulgar"
  | "child-directed"
  | "literary"
  | "royal"
  | ProfessionalRegister;

export type VocabularyComparisonKind =
  | "confusable"
  | "homophone"
  | "near-synonym"
  | "register-pair"
  | "grammar-pair";

export interface VocabularyRelatedWord {
  vocabularyId?: VocabularyEntry["id"];
  thai: string;
  roman?: string;
  chinese?: string;
  english?: string;
  notesZh?: string;
}

export interface VocabularyComparison {
  kind: VocabularyComparisonKind;
  target: VocabularyRelatedWord;
  distinctionZh: string;
  example?: VocabularyUsageExample;
}

export interface VocabularyCollocation {
  thai: string;
  roman?: string;
  chinese: string;
  english?: string;
  example?: VocabularyUsageExample;
  notesZh?: string;
}

export interface VocabularySense {
  id: string;
  chinese: string;
  english: string;
  level?: ContentLevel;
  register?: VocabularyRegister;
  examples: VocabularyUsageExample[];
  synonyms: VocabularyRelatedWord[];
  antonyms: VocabularyRelatedWord[];
  comparisons?: VocabularyComparison[];
  collocations?: VocabularyCollocation[];
  grammarIds?: string[];
  usageNotesZh?: string[];
  tags?: string[];
  notesZh?: string;
}

export interface VocabularyUsageExample extends ThaiExample {
  english?: string;
  register?: VocabularyRegister;
  grammarIds?: string[];
  notesZh?: string;
}

export interface VocabularyEnrichment {
  id: string;
  vocabularyId: VocabularyEntry["id"];
  thai: VocabularyEntry["thai"];
  roman: VocabularyEntry["roman"];
  chinese: VocabularyEntry["chinese"];
  english: VocabularyEntry["english"];
  senses: VocabularySense[];
  examples?: VocabularyUsageExample[];
  synonyms: VocabularyRelatedWord[];
  antonyms: VocabularyRelatedWord[];
  comparisons: VocabularyComparison[];
  registers: VocabularyRegister[];
  collocations: VocabularyCollocation[];
  learningNotesZh: string[];
  sourceRefs: LearningSource["id"][];
  reviewStatus: VocabularyReviewStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  updatedAt?: string;
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

export interface LexiconSource {
  id: string;
  title: string;
  url: string;
  license: string;
  licenseUrl?: string;
  kind: "frequency" | "dictionary" | "wordlist" | "corpus" | "semantic";
  recommendedUse: string;
  caution?: string;
}

export interface VocabularyMasteryBand {
  id: string;
  level: ContentLevel;
  labelZh: string;
  passiveRange: [number, number];
  activeTarget: number;
  summaryZh: string;
  domains: string[];
}

export interface C2DomainTarget {
  id: string;
  titleZh: string;
  summaryZh: string;
  grammarCoverageIds: string[];
  vocabularyDomains: string[];
  outputTasks: string[];
}

export type ProfessionalRegister =
  | "intimate"
  | "casual"
  | "polite"
  | "service"
  | "business-formal"
  | "legal-government"
  | "academic"
  | "media"
  | "ritual-religious";

export interface GrammarDrillTarget {
  id: string;
  titleZh: string;
  instructionZh: string;
  successCriteriaZh: string[];
}

export interface AdvancedGrammarCompetency {
  id: string;
  level: "c1" | "c2";
  titleZh: string;
  summaryZh: string;
  grammarCoverageIds: string[];
  grammarPointIds: string[];
  registerTargets: ProfessionalRegister[];
  inputGenres: string[];
  outputGenres: string[];
  drills: GrammarDrillTarget[];
  sourceRefs: string[];
}

export interface RegisterTransformationTarget {
  id: string;
  level: "c1" | "c2";
  situationZh: string;
  fromRegister: ProfessionalRegister;
  toRegister: ProfessionalRegister;
  grammarPointIds: string[];
  beforeThai: string;
  afterThai: string;
  chinese: string;
  riskZh: string;
  tags: string[];
}

export interface ProfessionalGenreTarget {
  id: string;
  level: "c1" | "c2";
  genreZh: string;
  summaryZh: string;
  grammarCoverageIds: string[];
  requiredMovesZh: string[];
  skeletonThai: string[];
  assessmentZh: string[];
  sourceRefs: string[];
}
