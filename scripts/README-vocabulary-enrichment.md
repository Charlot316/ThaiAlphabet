# 词汇 Enrichment 本地流水线

本文档说明如何把 `data/lexicon/thai-lexicon-top-50000.tsv` 分批转换成可审核的学习词汇卡草稿。当前方案是确定性的本地脚手架：不调用真实外部 LLM API，不写入密钥，也不把任何自动生成内容标记为可直接面向学习者。

## 目标

原始 TSV 是按频率排序的被动识别词表。后续 enrichment 流水线应按 rank 或 level 分段导出小批量卡片，交给人工或未来单独配置的 LLM 步骤补全。

每张待审核卡应包含：

- 泰语词头、rank、词频、level。
- 按义项拆开的中文/英文释义槽位。
- 每个义项自己的泰语例句、罗马音、中文翻译和语法标签槽位。
- 每个义项自己的近义词、同义/近义词、反义词、易混词槽位。
- 原始来源、词频 flags、可追溯 source metadata。
- review status、警告、负责人和更新时间。

## 当前脚手架

使用 `scripts/build-vocabulary-enrichment.mjs` 导出 JSONL 或 JSON：

```bash
node scripts/build-vocabulary-enrichment.mjs --start-rank 1 --limit 200 --out tmp/vocab-batch-0001.jsonl
```

常用参数：

```bash
node scripts/build-vocabulary-enrichment.mjs --level a2 --limit 100 --format json
node scripts/build-vocabulary-enrichment.mjs --start-rank 2001 --limit 500
```

省略 `--out` 时会输出到 stdout，方便接管道或抽样检查。脚本只读取 TSV 并创建占位 enrichment 对象；它不会编造最终释义、翻译或例句。

## 卡片结构

脚手架输出的记录形如：

```json
{
  "id": "thai-vocab-00001",
  "thai": "กา",
  "rank": 1,
  "level": "pre-a1",
  "frequency": { "count": 193460292, "rank": 1 },
  "source": {
    "lexiconFile": "data/lexicon/thai-lexicon-top-50000.tsv",
    "sourceIds": ["phupha-wordfreq"],
    "flags": ["pythainlp", "short-token-review"]
  },
  "review": {
    "status": "needs-enrichment",
    "assignee": null,
    "updatedAt": null,
    "warnings": ["short token: verify segmentation"]
  },
  "enrichment": {
    "partOfSpeech": null,
    "register": null,
    "domains": [],
    "senses": [
      {
        "id": "sense-1",
        "chinese": null,
        "english": null,
        "status": "needs-sense-review",
        "register": null,
        "examples": [
          {
            "thai": null,
            "roman": null,
            "zhHans": null,
            "grammarIds": [],
            "source": null,
            "status": "needs-example",
            "qualityRules": [
              "must match this exact sense",
              "should be a complete natural sentence",
              "should contain useful grammar beyond a bare phrase when possible"
            ]
          }
        ],
        "relations": {
          "synonyms": [],
          "nearSynonyms": [],
          "antonyms": [],
          "confusables": []
        },
        "collocations": [],
        "notes": []
      }
    ],
    "topLevelRelations": { "synonyms": [], "antonyms": [], "confusables": [] },
    "notes": []
  }
}
```

`senses[].relations.confusables` 可能包含由共享前缀或后缀推导出的确定性候选。这些只是审核提示，不是已确认的词义关系。

## 建议批处理流程

1. 导出一个 rank 分段：

   ```bash
   node scripts/build-vocabulary-enrichment.mjs --start-rank 1 --limit 200 --out tmp/vocab-batch-0001.jsonl
   ```

2. 在脚手架之外补全 enrichment：

   - 人工审核者填写 `senses`、`senses[].examples`、`senses[].relations`、`register` 和 `domains`。
   - 未来可新增单独 LLM 步骤，读取 JSONL，写出候选义项、例句、中文翻译和关系词，并保持 `review.status` 为 `llm-draft`。
   - 多义词必须先拆义项；每个义项都要有自己的高质量例句、中文翻译、近义/同义/反义/易混对照。
   - 审核者确认分词、义项、例句自然度、中文翻译和关系词后，才把状态提升为 `approved`。

3. 只把 `approved` 卡片导入 app 数据。被拒绝或有歧义的卡片应保留在 review queue，并保留原始 source flags。

## Review statuses

推荐状态：

- `needs-enrichment`：刚导出的骨架，没有已审核词汇内容。
- `llm-draft`：存在模型候选内容，但未经人工审核。
- `human-draft`：人工编辑过，但尚未最终确认。
- `needs-source-check`：来源、分词或关系词需要核验。
- `approved`：可以导入学习者可见的 vocabulary 数据。
- `rejected`：不应成为主动学习卡。

## 未来 LLM 接入约束

如果后续增加 LLM enrichment 步骤，应保持为单独脚本或单独模式，输入 JSONL、输出 JSONL。它应该：

- 只从本地环境变量读取 API key。
- 不提交密钥、凭据或生成的 secret。
- 保留 source 字段和 review warnings。
- 把模型内容标记为 `llm-draft`，不能直接标记为 `approved`。
- 在 metadata 中记录模型名、prompt 版本和生成时间。
- 不允许把所有例句挂在词头顶层。例句必须挂在具体 sense 下，而且必须符合该 sense。
- 对一词多义条目，不能只给总近义词/反义词；每个 sense 都要尽量给对应的近义、同义、反义或说明为什么没有可靠反义词。

确定性脚手架负责稳定数据契约；LLM 或人工流程负责候选内容；最终是否进入 app 由人工审核状态决定。
