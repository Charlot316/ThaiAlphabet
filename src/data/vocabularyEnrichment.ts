import { VocabularyEnrichment } from "./types";
import { VOCABULARY_ENRICHMENT_BEGINNER_01 } from "./vocabularyEnrichmentBeginner01";
import { VOCABULARY_ENRICHMENT_BEGINNER_02 } from "./vocabularyEnrichmentBeginner02";
import { VOCABULARY_ENRICHMENT_BEGINNER_03 } from "./vocabularyEnrichmentBeginner03";
import { VOCABULARY_ENRICHMENT_BEGINNER_04 } from "./vocabularyEnrichmentBeginner04";
import { VOCABULARY_ENRICHMENT_BEGINNER_05 } from "./vocabularyEnrichmentBeginner05";
import { VOCABULARY_ENRICHMENT_BEGINNER_06 } from "./vocabularyEnrichmentBeginner06";
import { VOCABULARY_ENRICHMENT_CORE } from "./vocabularyEnrichmentCore";

export const VOCABULARY_ENRICHMENT: VocabularyEnrichment[] = [
  ...VOCABULARY_ENRICHMENT_CORE,
  ...VOCABULARY_ENRICHMENT_BEGINNER_01,
  ...VOCABULARY_ENRICHMENT_BEGINNER_02,
  ...VOCABULARY_ENRICHMENT_BEGINNER_03,
  ...VOCABULARY_ENRICHMENT_BEGINNER_04,
  ...VOCABULARY_ENRICHMENT_BEGINNER_05,
  ...VOCABULARY_ENRICHMENT_BEGINNER_06,
];

export const VOCABULARY_ENRICHMENT_BY_VOCABULARY_ID: Record<string, VocabularyEnrichment> =
  Object.fromEntries(VOCABULARY_ENRICHMENT.map((entry) => [entry.vocabularyId, entry]));
