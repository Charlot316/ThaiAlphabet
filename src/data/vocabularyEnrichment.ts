import { VocabularyEnrichment } from "./types";
import { VOCABULARY_ENRICHMENT_CORE } from "./vocabularyEnrichmentCore";

export const VOCABULARY_ENRICHMENT: VocabularyEnrichment[] = [
  ...VOCABULARY_ENRICHMENT_CORE,
];

export const VOCABULARY_ENRICHMENT_BY_VOCABULARY_ID: Record<string, VocabularyEnrichment> =
  Object.fromEntries(VOCABULARY_ENRICHMENT.map((entry) => [entry.vocabularyId, entry]));
