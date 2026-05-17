import {
  VOCABULARY_CATALOG_ENTRIES,
  VOCABULARY_CATALOG_STATS,
  type VocabularyCatalogEntry,
} from "@/data/vocabularyCatalog";

export type VocabularyCoursePhase = "survival" | "a1-core" | "a2-core" | "a2-bridge";

export interface VocabularyCourseUnit {
  id: string;
  titleZh: string;
  phase: VocabularyCoursePhase;
  level: "pre-a1" | "a1" | "a2";
  summaryZh: string;
  grammarIds: string[];
  keywords: string[];
  entryIds: string[];
  sample: VocabularyCatalogEntry[];
}

const UNIT_SPECS: Array<Omit<VocabularyCourseUnit, "entryIds" | "sample"> & { limit: number }> = [
  {
    id: "vocab-survival-politeness",
    titleZh: "生存礼貌句",
    phase: "survival",
    level: "pre-a1",
    summaryZh: "先学你好、谢谢、道歉、请求帮助、听不懂和再说一遍。",
    grammarIds: ["polite-particles", "yes-no-questions"],
    keywords: ["greeting", "politeness", "礼貌", "打招呼", "道歉", "感谢", "生存短句"],
    limit: 90,
  },
  {
    id: "vocab-a1-people-family",
    titleZh: "人、家庭和身份",
    phase: "a1-core",
    level: "a1",
    summaryZh: "把我、你、家人、朋友、同学、年龄和基础身份说清楚。",
    grammarIds: ["topic-and-omission", "basic-pronouns"],
    keywords: ["people", "identity", "family", "人", "家庭", "亲属", "身份", "称呼"],
    limit: 120,
  },
  {
    id: "vocab-a1-time-numbers",
    titleZh: "数字、时间和数量",
    phase: "a1-core",
    level: "a1",
    summaryZh: "支撑价格、年龄、日期、几点、几次和简单频率。",
    grammarIds: ["classifier-basics", "time-words-as-tense"],
    keywords: ["time", "number", "数字", "时间", "日期", "星期", "次数", "数量"],
    limit: 140,
  },
  {
    id: "vocab-a1-food-home",
    titleZh: "吃喝、家和日常物品",
    phase: "a1-core",
    level: "a1",
    summaryZh: "覆盖三餐、食物、饮料、家里物品、房间和基础动作。",
    grammarIds: ["noun-modifier-order", "serial-verb-basics"],
    keywords: ["food", "home", "objects", "食物", "饮料", "家", "房间", "物品", "动作"],
    limit: 180,
  },
  {
    id: "vocab-a1-questions-places",
    titleZh: "疑问词、地点和方向",
    phase: "a1-core",
    level: "a1",
    summaryZh: "会问谁、什么、哪里、怎么走，以及附近地点和方向。",
    grammarIds: ["question-word-position", "location-yuu", "position-words"],
    keywords: ["question", "place", "疑问", "哪里", "地点", "方向", "问路"],
    limit: 150,
  },
  {
    id: "vocab-a2-shopping-service",
    titleZh: "购物、服务和办事",
    phase: "a2-core",
    level: "a2",
    summaryZh: "购物、退换货、服务预约、表格、邮局银行和日常办事。",
    grammarIds: ["modal-dai-samart", "polite-particles"],
    keywords: ["shopping", "service", "errands", "购物", "服务", "办事", "退换", "银行", "邮局", "预约"],
    limit: 220,
  },
  {
    id: "vocab-a2-health-body",
    titleZh: "健康、身体和感觉",
    phase: "a2-core",
    level: "a2",
    summaryZh: "描述不舒服、症状、看医生、买药、情绪和身体护理。",
    grammarIds: ["adjective-as-predicate", "modal-need-should"],
    keywords: ["health", "body", "feelings", "健康", "身体", "症状", "药", "诊所", "情绪", "护理"],
    limit: 220,
  },
  {
    id: "vocab-a2-transport-travel",
    titleZh: "交通、旅行和住宿",
    phase: "a2-core",
    level: "a2",
    summaryZh: "打车、公交地铁、机场车站、酒店入住和旅行问题。",
    grammarIds: ["adverbial-clauses-temporal", "location-yuu"],
    keywords: ["travel", "transport", "hotel", "交通", "旅行", "酒店", "车票", "机场", "路线"],
    limit: 220,
  },
  {
    id: "vocab-a2-work-study",
    titleZh: "学习、工作和沟通",
    phase: "a2-core",
    level: "a2",
    summaryZh: "课堂、作业、办公室、基础任务、沟通确认和服务现场表达。",
    grammarIds: ["complement-waa", "give-help-request"],
    keywords: ["school", "study", "work", "学习", "课堂", "作业", "工作", "任务", "沟通", "服务"],
    limit: 260,
  },
  {
    id: "vocab-a2-grammar-tools",
    titleZh: "功能词、句框和语法搭配",
    phase: "a2-core",
    level: "a2",
    summaryZh: "把因为、所以、但是、如果、可以、必须、还没、已经等词汇和语法课接起来。",
    grammarIds: ["conjunction-contrast-reason", "adverbial-clauses-conditional", "basic-negation-mai", "modal-dai-samart"],
    keywords: ["grammar", "function", "particle", "connector", "功能词", "句框", "连接", "否定", "情态", "语法"],
    limit: 260,
  },
  {
    id: "vocab-a2-social-daily",
    titleZh: "社交、家庭和日常关系",
    phase: "a2-core",
    level: "a2",
    summaryZh: "闲聊、邀请、家庭安排、邻里、礼貌拒绝、误会和关系维护。",
    grammarIds: ["softening-particles-na-si-la", "pragmatic-action-particles"],
    keywords: ["social", "family", "community", "relationship", "社交", "家庭", "邻里", "邀请", "拒绝", "误会"],
    limit: 240,
  },
  {
    id: "vocab-a2-b1-bridge",
    titleZh: "A2 到 B1 过渡",
    phase: "a2-bridge",
    level: "a2",
    summaryZh: "保留低阶可用性，但开始引入更完整的解释、建议、协商和轻度工作表达。",
    grammarIds: ["discourse-sentence-topic", "complement-waa", "adverbial-clauses-logical"],
    keywords: ["bridge", "B1", "过渡", "解释", "建议", "协商", "复盘", "review"],
    limit: 260,
  },
];

function searchable(entry: VocabularyCatalogEntry) {
  return [
    entry.thai,
    entry.roman,
    entry.chinese,
    entry.theme,
    entry.level,
    entry.partOfSpeech,
    entry.batches.join(" "),
    entry.tags.join(" "),
    entry.grammarIds.join(" "),
  ].join(" ").toLowerCase();
}

function unitEntries(keywords: string[], level: VocabularyCourseUnit["level"], limit: number) {
  const selected = VOCABULARY_CATALOG_ENTRIES.filter((entry) => {
    if (level === "pre-a1" && entry.level !== "pre-a1" && entry.level !== "a1") return false;
    if (level === "a1" && entry.level !== "pre-a1" && entry.level !== "a1") return false;
    if (level === "a2" && entry.level !== "a1" && entry.level !== "a2" && !entry.level.includes("a2")) return false;
    const text = searchable(entry);
    return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
  });
  return selected.slice(0, limit);
}

export const VOCABULARY_COURSE_UNITS: VocabularyCourseUnit[] = UNIT_SPECS.map((unit) => {
  const entries = unitEntries(unit.keywords, unit.level, unit.limit);
  return {
    ...unit,
    entryIds: entries.map((entry) => entry.id),
    sample: entries.slice(0, 8),
  };
});

export const VOCABULARY_COURSE_STATS = {
  units: VOCABULARY_COURSE_UNITS.length,
  plannedEntries: Array.from(new Set(VOCABULARY_COURSE_UNITS.flatMap((unit) => unit.entryIds))).length,
  catalogEntries: VOCABULARY_CATALOG_STATS.total,
  rawCandidates: VOCABULARY_CATALOG_STATS.rawTotal,
  grammarLinked: VOCABULARY_CATALOG_STATS.grammarLinked,
};
