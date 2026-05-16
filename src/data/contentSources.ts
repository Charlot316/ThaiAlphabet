import { LearningSource } from "./types";

export const CONTENT_SOURCES: LearningSource[] = [
  {
    id: "into-asia-grammar",
    title: "Into Asia: The essential Thai Grammar concepts to understand",
    url: "https://www.into-asia.com/thai_language/grammar",
    notes: "Used for the high-level beginner grammar map: word order, omission, adjectives, classifiers, questions, particles.",
  },
  {
    id: "complete-thai-a1",
    title: "Complete Thai: A1 Grammar points",
    url: "https://completethai.com/thai-grammar-points/a1-grammar-points/",
    notes: "Used to validate A1 sequencing for core sentence patterns, verbs, negation, conjunctions, questions, time, and essentials.",
  },
  {
    id: "thai-reference-questions",
    title: "Thai Reference: Thai Question Words",
    url: "https://thaiwords.app/guides/thai-question-words",
    notes: "Used for beginner question-word coverage.",
  },
  {
    id: "thai-reference-polite-particles",
    title: "Thai Reference: Thai Polite Particles",
    url: "https://thaiwords.app/guides/thai-polite-particles-krub-ka",
    notes: "Used for polite particle distinctions and placement.",
  },
  {
    id: "thai-frequency",
    title: "Thai Word Frequency Table",
    url: "https://www.thaifrequency.com/",
    notes: "Used as a frequency-oriented sanity check for seed vocabulary choices.",
  },
  {
    id: "wiktionary-thai-frequency",
    title: "Wiktionary: Frequency lists / Thai",
    url: "https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Thai",
    notes: "Used to locate public frequency-list references and common Thai vocabulary resources.",
  },
  {
    id: "loecsen-thai",
    title: "Loecsen: Learn Thai",
    url: "https://www.loecsen.com/en/learn-thai",
    notes: "Used to cross-check survival phrase categories such as greetings, thanks, apologies, price, and toilets.",
  },
  {
    id: "fsi-thai-basic",
    title: "FSI Thai Basic Course",
    url: "https://www.fsi-language-courses.org/fsi-thai-basic-course/",
    notes: "Public-domain course used for broad coverage expectations: phonology, authentic dialogs, drills, and a 38-unit spoken Thai sequence.",
  },
  {
    id: "thelanguages-essential-grammar",
    title: "The Languages: Essential Thai Grammar",
    url: "https://thelanguages.com/learn/thai/foundations/th-a1-4/",
    notes: "Used to cross-check the beginner essentials: no conjugation, SVO, classifiers, question particles, and negation.",
  },
  {
    id: "cambridge-reference-grammar-toc",
    title: "Cambridge: A Reference Grammar of Thai front matter and table of contents",
    url: "https://assets.cambridge.org/97805216/50854/frontmatter/9780521650854_frontmatter.pdf",
    notes: "Used as the comprehensive coverage spine for grammar categories from phonology and word formation through discourse.",
  },
  {
    id: "cambridge-reference-grammar-books",
    title: "Google Books: A Reference Grammar of Thai",
    url: "https://books.google.co.th/books/about/A_Reference_Grammar_of_Thai.html?id=YE29njS4qSUC",
    notes: "Used to cross-check the book's stated coverage: demonstratives, personal reference terms, modality, aspect, particles, serial verbs, relative clauses, questions, passive, causative, and topic marking.",
  },
  {
    id: "poly-thai-intermediate",
    title: "Poly Thai Reader: Intermediate Grammar Points",
    url: "https://polythaireader.com/intermediate-grammar-points",
    notes: "Used to cross-check later sequencing for passive voice, classifier extensions, and completion markers.",
  },
  {
    id: "thaipod101-core100",
    title: "ThaiPod101: Thai Core 100 Word List",
    url: "https://www.thaipod101.com/thai-word-lists/?coreX=100",
    notes: "Used only for category and priority cross-checking, not copied wholesale.",
  },
];

export const CONTENT_SOURCE_BY_ID: Record<string, LearningSource> = Object.fromEntries(
  CONTENT_SOURCES.map((source) => [source.id, source])
);
