# Thai Lexicon Data

This folder holds generated Thai vocabulary data that is intentionally not imported into the Next.js bundle yet.

## Current target

- Passive recognition lexicon: 50,000 ranked Thai entries.
- C1 threshold: ranks 15,001-30,000.
- C2 threshold: ranks 30,001-50,000.
- Active C2 target: roughly 20,000 curated words and phrases with Chinese definitions, examples, domain tags, register, and usage notes.

## Sources

- `phupha-wordfreq`: CC0 Thai word-frequency dataset from Common Crawl July 2025.
- `pythainlp-words-th`: Apache-2.0 PyThaiNLP word list, used as a dictionary-membership flag.

Other candidate sources are tracked in `src/data/proficiency.ts`, but sources with attribution or share-alike requirements should stay separate until license handling is explicit.

## Regenerate

```bash
npm run lexicon:build
```

The generated TSV is a raw passive lexicon, not a finished study deck. Before a word becomes an active card, it still needs sense selection, Chinese explanation, examples, register, and domain tags.
