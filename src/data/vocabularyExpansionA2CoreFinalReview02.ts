export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "生活高频" | "地点时间" | "购物家务" | "沟通确认" | "易混搭配" | "复盘补漏";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type CoreItem = { thai: string; id: string; roman: string; chinese: string; theme: VocabularyExpansionTheme; tag: string };
type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };

const CORE_FINAL_REVIEW_02_REFS = ["thai-frequency", "thai-a2-core-final-review-02-candidate"];

const coreItems: readonly CoreItem[] = [
  { thai: "ของใช้จำเป็น", id: "khaawng-chai-jam-bpen", roman: "khaawng chai jam-bpen", chinese: "必需用品", theme: "生活高频", tag: "用品" },
  { thai: "เรื่องเล็กๆ", id: "reuuang-lek-lek", roman: "reuuang lek lek", chinese: "小事", theme: "生活高频", tag: "事情" },
  { thai: "เวลาว่าง", id: "wee-laa-waang", roman: "wee-laa waang", chinese: "空闲时间", theme: "地点时间", tag: "时间" },
  { thai: "ที่เดิม", id: "thii-doeem", roman: "thii doeem", chinese: "原来的地方", theme: "地点时间", tag: "地点" },
  { thai: "ทางกลับบ้าน", id: "thaang-glap-baan", roman: "thaang glap baan", chinese: "回家的路", theme: "地点时间", tag: "路线" },
  { thai: "ของที่ต้องซื้อ", id: "khaawng-thii-dtawng-seuu", roman: "khaawng thii dtawng seuu", chinese: "需要买的东西", theme: "购物家务", tag: "购物" },
  { thai: "งานที่ยังค้าง", id: "ngaan-thii-yang-khaang", roman: "ngaan thii yang khaang", chinese: "还没完成的事/工作", theme: "复盘补漏", tag: "任务" },
  { thai: "ข้อความสั้นๆ", id: "khaaw-khwaam-san-san", roman: "khaaw-khwaam san san", chinese: "短消息", theme: "沟通确认", tag: "消息" },
  { thai: "รูปถ่ายล่าสุด", id: "ruup-thaai-laa-sut", roman: "ruup-thaai laa-sut", chinese: "最新照片", theme: "生活高频", tag: "照片" },
  { thai: "ของเหลือในตู้เย็น", id: "khaawng-leuuea-nai-dtuu-yen", roman: "khaawng leuuea nai dtuu-yen", chinese: "冰箱里的剩余食物", theme: "购物家务", tag: "食物" },
  { thai: "วันที่สะดวก", id: "wan-thii-sa-duuak", roman: "wan thii sa-duuak", chinese: "方便的日期", theme: "地点时间", tag: "约定" },
  { thai: "คำตอบง่ายๆ", id: "kham-dtaawp-ngaai-ngaai", roman: "kham-dtaawp ngaai ngaai", chinese: "简单回答", theme: "沟通确认", tag: "回答" },
  { thai: "ทางเลือกอื่น", id: "thaang-leuuak-euun", roman: "thaang leuuak euun", chinese: "其他选择", theme: "复盘补漏", tag: "选择" },
  { thai: "เสียงเบาเกินไป", id: "siiang-bao-goen-bpai", roman: "siiang bao goen bpai", chinese: "声音太小", theme: "沟通确认", tag: "听力" },
  { thai: "โต๊ะว่าง", id: "dto-waang", roman: "dto waang", chinese: "空桌", theme: "生活高频", tag: "餐饮" },
  { thai: "ขนาดพอดี", id: "kha-naat-phaaw-dii", roman: "kha-naat phaaw dii", chinese: "尺寸刚好", theme: "易混搭配", tag: "尺寸" },
];

const directRows: readonly Definition[] = [
  { thai: "ของใช้จำเป็นในบ้าน", id: "khaawng-chai-jam-bpen-nai-baan", roman: "khaawng chai jam-bpen nai baan", chinese: "家里的必需用品", partOfSpeech: "短语", theme: "生活高频", exampleThai: "ก่อนย้ายบ้าน ฉันเช็กของใช้จำเป็นในบ้าน", exampleRoman: "gaawn yaai baan, chan chek khaawng chai jam-bpen nai baan", exampleChinese: "搬家前，我检查家里的必需用品。", tag: "用品" },
  { thai: "เรื่องเล็กแต่สำคัญ", id: "reuuang-lek-dtaae-sam-khan", roman: "reuuang lek dtaae sam-khan", chinese: "小但重要的事", partOfSpeech: "短语", theme: "复盘补漏", exampleThai: "อย่าลืมเรื่องเล็กแต่สำคัญ เช่น กุญแจบ้าน", exampleRoman: "yaa leum reuuang lek dtaae sam-khan, chen gun-jaae baan", exampleChinese: "别忘了小但重要的事，比如家钥匙。", tag: "提醒" },
  { thai: "นัดกันที่เดิม", id: "nat-gan-thii-doeem", roman: "nat gan thii doeem", chinese: "约在老地方", partOfSpeech: "短语", theme: "地点时间", exampleThai: "เย็นนี้เรานัดกันที่เดิมได้ไหม", exampleRoman: "yen nii rao nat gan thii doeem dai mai", exampleChinese: "今晚我们约在老地方可以吗？", tag: "地点" },
  { thai: "ถามวันว่างก่อน", id: "thaam-wan-waang-gaawn", roman: "thaam wan waang gaawn", chinese: "先问哪天有空", partOfSpeech: "短语", theme: "地点时间", exampleThai: "ก่อนจองโต๊ะ ควรถามวันว่างก่อน", exampleRoman: "gaawn jaawng dto, khuuan thaam wan waang gaawn", exampleChinese: "订桌前，应该先问哪天有空。", tag: "约定" },
  { thai: "เขียนรายการของที่ต้องซื้อ", id: "khiian-raai-gaan-khaawng-thii-dtawng-seuu", roman: "khiian raai-gaan khaawng thii dtawng seuu", chinese: "写需要购买的清单", partOfSpeech: "短语", theme: "购物家务", exampleThai: "ก่อนไปตลาด แม่เขียนรายการของที่ต้องซื้อ", exampleRoman: "gaawn bpai dta-laat, maae khiian raai-gaan khaawng thii dtawng seuu", exampleChinese: "去市场前，妈妈写了需要购买的清单。", tag: "购物" },
  { thai: "เช็กงานที่ยังค้าง", id: "chek-ngaan-thii-yang-khaang", roman: "chek ngaan thii yang khaang", chinese: "检查还没完成的事", partOfSpeech: "短语", theme: "复盘补漏", exampleThai: "ก่อนนอน ฉันเช็กงานที่ยังค้างในวันนี้", exampleRoman: "gaawn naawn, chan chek ngaan thii yang khaang nai wan-nii", exampleChinese: "睡前，我检查今天还没完成的事。", tag: "复盘" },
  { thai: "ส่งข้อความสั้นๆ ให้เพื่อน", id: "song-khaaw-khwaam-san-san-hai-pheuuan", roman: "song khaaw-khwaam san san hai pheuuan", chinese: "给朋友发一条短消息", partOfSpeech: "短语", theme: "沟通确认", exampleThai: "ถ้าจะไปสาย ส่งข้อความสั้นๆ ให้เพื่อนก่อน", exampleRoman: "thaa ja bpai saai, song khaaw-khwaam san san hai pheuuan gaawn", exampleChinese: "如果会迟到，先给朋友发一条短消息。", tag: "消息" },
  { thai: "เลือกขนาดพอดีกับตัว", id: "leuuak-kha-naat-phaaw-dii-gap-dtua", roman: "leuuak kha-naat phaaw dii gap dtua", chinese: "选择合身的尺寸", partOfSpeech: "短语", theme: "易混搭配", exampleThai: "ซื้อเสื้อควรเลือกขนาดพอดีกับตัว", exampleRoman: "seuu seuua khuuan leuuak kha-naat phaaw dii gap dtua", exampleChinese: "买衣服应该选择合身的尺寸。", tag: "尺寸" },
];

const reviewRows = coreItems.map((item): Definition => ({
  thai: `ทวนคำว่า${item.thai}อีกครั้ง`,
  id: `thuuan-kham-waa-${item.id}-iik-khrang`,
  roman: `thuuan kham waa ${item.roman} iik khrang`,
  chinese: `再次复习“${item.chinese}”`,
  partOfSpeech: "短语",
  theme: item.theme,
  exampleThai: `ก่อนสอบเล็กๆ เราทวนคำว่า${item.thai}อีกครั้ง`,
  exampleRoman: `gaawn saawp lek lek, rao thuuan kham waa ${item.roman} iik khrang`,
  exampleChinese: `小测前，我们再次复习“${item.chinese}”。`,
  tag: item.tag,
}));

const useRows = coreItems.map((item): Definition => ({
  thai: `ใช้${item.thai}ในประโยคง่ายๆ`,
  id: `chai-${item.id}-nai-bpra-yook-ngaai-ngaai`,
  roman: `chai ${item.roman} nai bpra-yook ngaai ngaai`,
  chinese: `在简单句里使用“${item.chinese}”`,
  partOfSpeech: "短语",
  theme: item.theme,
  exampleThai: `ครูให้ใช้${item.thai}ในประโยคง่ายๆ`,
  exampleRoman: `khruu hai chai ${item.roman} nai bpra-yook ngaai ngaai`,
  exampleChinese: `老师让我们在简单句里使用“${item.chinese}”。`,
  tag: item.tag,
}));

const compareRows = coreItems.map((item): Definition => ({
  thai: `แยก${item.thai}จากคำใกล้เคียง`,
  id: `yaaek-${item.id}-jaak-kham-glai-khiiang`,
  roman: `yaaek ${item.roman} jaak kham glai khiiang`,
  chinese: `把“${item.chinese}”和相近词分开`,
  partOfSpeech: "短语",
  theme: "易混搭配",
  exampleThai: `ผู้เรียนควรแยก${item.thai}จากคำใกล้เคียงให้ได้`,
  exampleRoman: `phuu-riian khuuan yaaek ${item.roman} jaak kham glai khiiang hai dai`,
  exampleChinese: `学习者应该能把“${item.chinese}”和相近词分开。`,
  tag: item.tag,
}));

const dailyRows = coreItems.map((item): Definition => ({
  thai: `เจอ${item.thai}ในชีวิตประจำวัน`,
  id: `jooe-${item.id}-nai-chii-wit-bpra-jam-wan`,
  roman: `jooe ${item.roman} nai chii-wit bpra-jam-wan`,
  chinese: `在日常生活中遇到“${item.chinese}”`,
  partOfSpeech: "短语",
  theme: item.theme,
  exampleThai: `คำนี้ไม่ยาก เราเจอ${item.thai}ในชีวิตประจำวันบ่อย`,
  exampleRoman: `kham nii mai yaak, rao jooe ${item.roman} nai chii-wit bpra-jam-wan baawy`,
  exampleChinese: `这个词不难，我们在日常生活中常遇到“${item.chinese}”。`,
  tag: item.tag,
}));

const rememberRows = coreItems.map((item): Definition => ({
  thai: `จำ${item.thai}เป็นกลุ่มคำ`,
  id: `jam-${item.id}-bpen-glum-kham`,
  roman: `jam ${item.roman} bpen glum kham`,
  chinese: `把“${item.chinese}”作为词组记住`,
  partOfSpeech: "短语",
  theme: item.theme,
  exampleThai: `ถ้าอยากพูดคล่อง ควรจำ${item.thai}เป็นกลุ่มคำ`,
  exampleRoman: `thaa yaak phuut khlaawng, khuuan jam ${item.roman} bpen glum kham`,
  exampleChinese: `如果想说得流利，应该把“${item.chinese}”作为词组记住。`,
  tag: item.tag,
}));

const askRows = coreItems.map((item): Definition => ({
  thai: `ถามเรื่อง${item.thai}ให้ชัด`,
  id: `thaam-reuuang-${item.id}-hai-chat`,
  roman: `thaam reuuang ${item.roman} hai chat`,
  chinese: `把关于“${item.chinese}”的事问清楚`,
  partOfSpeech: "短语",
  theme: item.theme,
  exampleThai: `ถ้าไม่แน่ใจ ควรถามเรื่อง${item.thai}ให้ชัด`,
  exampleRoman: `thaa mai naae-jai, khuuan thaam reuuang ${item.roman} hai chat`,
  exampleChinese: `如果不确定，应该把关于“${item.chinese}”的事问清楚。`,
  tag: item.tag,
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...reviewRows,
  ...useRows,
  ...compareRows,
  ...dailyRows,
  ...rememberRows,
  ...askRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const comparisons: VocabularyExpansionComparison[] = [{ kind: "用法", target: { thai: "คำใกล้เคียง", roman: "kham glai khiiang", chinese: "相近词" }, distinctionZh: "本批次多为 A2 搭配复盘；学习时可把它们作为整体记忆，再和相近表达比较。" }];
  const tags = ["a2", "核心最终复盘第二轮", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons, collocations, usageNotesZh: ["A2 最终复盘优先补生活里容易漏掉的常见搭配，不重复单个高频词本身。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons,
    collocations,
    usageNotesZh: ["用于 A2 生活词和短语的最终复盘，覆盖用品、时间地点、购物家务、消息沟通和易混搭配。"],
    tags,
    sourceRefs: CORE_FINAL_REVIEW_02_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_CORE_FINAL_REVIEW_02 = rows.map(toCandidate);
