export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "不方便" | "下次吧" | "可能不行" | "先考虑" | "没关系" | "谢谢邀请" | "轻度推脱";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Plan = { thai: string; roman: string; chinese: string; id: string };

const EVERYDAY_POLITE_REFUSALS_REFS = ["thai-frequency", "thai-a2-everyday-polite-refusals-candidate"];

const plans: readonly Plan[] = [
  { thai: "ไปกินข้าวเย็น", roman: "bpai gin khaao yen", chinese: "去吃晚饭", id: "bpai-gin-khaao-yen" },
  { thai: "ไปดูหนังคืนนี้", roman: "bpai duu nang kheuun nii", chinese: "今晚去看电影", id: "bpai-duu-nang-kheuun-nii" },
  { thai: "ไปเดินตลาด", roman: "bpai doeen dta-laat", chinese: "去逛市场", id: "bpai-doeen-dta-laat" },
  { thai: "ไปเที่ยววันเสาร์", roman: "bpai thiaao wan sao", chinese: "周六去玩", id: "bpai-thiaao-wan-sao" },
  { thai: "ไปดื่มกาแฟ", roman: "bpai deum gaa-faae", chinese: "去喝咖啡", id: "bpai-deum-gaa-faae" },
  { thai: "ไปช่วยย้ายของ", roman: "bpai chuai yaai khaawng", chinese: "去帮忙搬东西", id: "bpai-chuai-yaai-khaawng" },
  { thai: "ไปงานวันเกิด", roman: "bpai ngaan wan-goet", chinese: "去生日聚会", id: "bpai-ngaan-wan-goet" },
  { thai: "ไปซื้อของด้วยกัน", roman: "bpai seu khaawng duai gan", chinese: "一起去买东西", id: "bpai-seu-khaawng-duai-gan" },
  { thai: "มาคุยที่บ้าน", roman: "maa khui thii baan", chinese: "来家里聊", id: "maa-khui-thii-baan" },
  { thai: "โทรคุยคืนนี้", roman: "thoo khui kheuun nii", chinese: "今晚打电话聊", id: "thoo-khui-kheuun-nii" },
  { thai: "นัดเจอกันตอนเช้า", roman: "nat jooe gan dtaawn chaao", chinese: "早上约见", id: "nat-jooe-gan-dtaawn-chaao" },
  { thai: "ไปออกกำลังกาย", roman: "bpai aawk gam-lang-gaai", chinese: "去运动", id: "bpai-aawk-gam-lang-gaai" },
  { thai: "ไปเรียนด้วยกัน", roman: "bpai riian duai gan", chinese: "一起去上课", id: "bpai-riian-duai-gan" },
  { thai: "ไปทำธุระข้างนอก", roman: "bpai tham thu-ra khaang naawk", chinese: "去外面办事", id: "bpai-tham-thu-ra-khaang-naawk" },
  { thai: "ไปกินขนม", roman: "bpai gin kha-nom", chinese: "去吃点心", id: "bpai-gin-kha-nom" },
  { thai: "ไปเดินเล่นตอนเย็น", roman: "bpai doeen len dtaawn yen", chinese: "傍晚去散步", id: "bpai-doeen-len-dtaawn-yen" },
];

const directRows: readonly Definition[] = [
  { thai: "วันนี้ไม่ค่อยสะดวก", id: "wan-nii-mai-khaawy-sa-duuak", roman: "wan-nii mai khaawy sa-duuak", chinese: "今天不太方便", partOfSpeech: "短语", theme: "不方便", exampleThai: "ขอโทษนะ วันนี้ไม่ค่อยสะดวก ไว้วันหลังได้ไหม", exampleRoman: "khaaw-thoot na, wan-nii mai khaawy sa-duuak, wai wan lang dai mai", exampleChinese: "不好意思，今天不太方便，改天可以吗？", tag: "婉拒" },
  { thai: "ขอเป็นครั้งหน้าได้ไหม", id: "khaaw-bpen-khrang-naa-dai-mai", roman: "khaaw bpen khrang naa dai mai", chinese: "可以改成下次吗", partOfSpeech: "短语", theme: "下次吧", exampleThai: "วันนี้ฉันเหนื่อยมาก ขอเป็นครั้งหน้าได้ไหม", exampleRoman: "wan-nii chan neuueai maak, khaaw bpen khrang naa dai mai", exampleChinese: "今天我很累，可以改成下次吗？", tag: "下次" },
  { thai: "อาจจะไม่ไหว", id: "aat-ja-mai-wai", roman: "aat ja mai wai", chinese: "可能不太行/撑不住", partOfSpeech: "短语", theme: "可能不行", exampleThai: "ถ้าเลิกงานดึก ฉันอาจจะไม่ไหว", exampleRoman: "thaa loek ngaan deuk, chan aat ja mai wai", exampleChinese: "如果下班很晚，我可能不太行。", tag: "可能不行" },
  { thai: "ขอคิดดูก่อนนะ", id: "khaaw-khit-duu-gaawn-na", roman: "khaaw khit duu gaawn na", chinese: "请让我先考虑一下", partOfSpeech: "短语", theme: "先考虑", exampleThai: "เรื่องนี้สำคัญ ขอคิดดูก่อนนะ", exampleRoman: "reuuang nii sam-khan, khaaw khit duu gaawn na", exampleChinese: "这件事很重要，请让我先考虑一下。", tag: "考虑" },
  { thai: "ไม่เป็นไรจริงๆ", id: "mai-bpen-rai-jing-jing", roman: "mai bpen rai jing jing", chinese: "真的没关系", partOfSpeech: "短语", theme: "没关系", exampleThai: "ถ้าคุณมาไม่ได้ ไม่เป็นไรจริงๆ", exampleRoman: "thaa khun maa mai dai, mai bpen rai jing jing", exampleChinese: "如果你来不了，真的没关系。", tag: "没关系" },
  { thai: "ขอบคุณที่ชวนนะ", id: "khaawp-khun-thii-chuan-na", roman: "khaawp khun thii chuan na", chinese: "谢谢你邀请我", partOfSpeech: "短语", theme: "谢谢邀请", exampleThai: "ขอบคุณที่ชวนนะ แต่วันนี้ฉันไม่ว่าง", exampleRoman: "khaawp khun thii chuan na, dtaae wan-nii chan mai waang", exampleChinese: "谢谢你邀请我，但今天我没空。", tag: "感谢邀请" },
  { thai: "ช่วงนี้ยุ่งนิดหน่อย", id: "chuuang-nii-yung-nit-naawy", roman: "chuuang nii yung nit naawy", chinese: "最近有点忙", partOfSpeech: "短语", theme: "轻度推脱", exampleThai: "ช่วงนี้ยุ่งนิดหน่อย ไว้คุยกันวันหลังนะ", exampleRoman: "chuuang nii yung nit naawy, wai khui gan wan lang na", exampleChinese: "最近有点忙，改天再聊吧。", tag: "推脱" },
  { thai: "เกรงใจแต่ไปไม่ได้", id: "greeng-jai-dtaae-bpai-mai-dai", roman: "greeng-jai dtaae bpai mai dai", chinese: "不好意思但去不了", partOfSpeech: "短语", theme: "可能不行", exampleThai: "ฉันเกรงใจแต่ไปไม่ได้จริงๆ", exampleRoman: "chan greeng-jai dtaae bpai mai dai jing jing", exampleChinese: "我很不好意思，但真的去不了。", tag: "婉拒" },
];

const inconvenientRows = plans.map((plan): Definition => ({
  thai: `ไม่สะดวก${plan.thai}วันนี้`,
  id: `mai-sa-duuak-${plan.id}-wan-nii`,
  roman: `mai sa-duuak ${plan.roman} wan-nii`,
  chinese: `今天不方便${plan.chinese}`,
  partOfSpeech: "短语",
  theme: "不方便",
  exampleThai: `ขอโทษนะ ฉันไม่สะดวก${plan.thai}วันนี้`,
  exampleRoman: `khaaw-thoot na, chan mai sa-duuak ${plan.roman} wan-nii`,
  exampleChinese: `不好意思，我今天不方便${plan.chinese}。`,
  tag: "不方便",
}));

const nextTimeRows = plans.map((plan): Definition => ({
  thai: `ไว้ครั้งหน้าค่อย${plan.thai}`,
  id: `wai-khrang-naa-khaawy-${plan.id}`,
  roman: `wai khrang naa khaawy ${plan.roman}`,
  chinese: `下次再${plan.chinese}`,
  partOfSpeech: "短语",
  theme: "下次吧",
  exampleThai: `วันนี้ฉันไม่พร้อม ไว้ครั้งหน้าค่อย${plan.thai}`,
  exampleRoman: `wan-nii chan mai phraawm, wai khrang naa khaawy ${plan.roman}`,
  exampleChinese: `今天我没准备好，下次再${plan.chinese}。`,
  tag: "下次",
}));

const maybeNoRows = plans.map((plan): Definition => ({
  thai: `อาจจะ${plan.thai}ไม่ได้`,
  id: `aat-ja-${plan.id}-mai-dai`,
  roman: `aat ja ${plan.roman} mai dai`,
  chinese: `可能没法${plan.chinese}`,
  partOfSpeech: "短语",
  theme: "可能不行",
  exampleThai: `ถ้าฝนตก ฉันอาจจะ${plan.thai}ไม่ได้`,
  exampleRoman: `thaa fon dtok, chan aat ja ${plan.roman} mai dai`,
  exampleChinese: `如果下雨，我可能没法${plan.chinese}。`,
  tag: "可能不行",
}));

const thinkRows = plans.map((plan): Definition => ({
  thai: `ขอคิดก่อนว่าจะ${plan.thai}ไหม`,
  id: `khaaw-khit-gaawn-waa-ja-${plan.id}-mai`,
  roman: `khaaw khit gaawn waa ja ${plan.roman} mai`,
  chinese: `先考虑要不要${plan.chinese}`,
  partOfSpeech: "短语",
  theme: "先考虑",
  exampleThai: `ขอคิดก่อนว่าจะ${plan.thai}ไหม แล้วจะบอกอีกที`,
  exampleRoman: `khaaw khit gaawn waa ja ${plan.roman} mai, laaeo ja baawk iik thii`,
  exampleChinese: `我先考虑要不要${plan.chinese}，然后再告诉你。`,
  tag: "考虑",
}));

const thanksRows = plans.map((plan): Definition => ({
  thai: `ขอบคุณที่ชวน${plan.thai}`,
  id: `khaawp-khun-thii-chuan-${plan.id}`,
  roman: `khaawp khun thii chuan ${plan.roman}`,
  chinese: `谢谢你邀请我${plan.chinese}`,
  partOfSpeech: "短语",
  theme: "谢谢邀请",
  exampleThai: `ขอบคุณที่ชวน${plan.thai} แต่วันนี้ฉันคงไปไม่ได้`,
  exampleRoman: `khaawp khun thii chuan ${plan.roman}, dtaae wan-nii chan khong bpai mai dai`,
  exampleChinese: `谢谢你邀请我${plan.chinese}，但今天我大概去不了。`,
  tag: "感谢邀请",
}));

const excuseRows = plans.map((plan): Definition => ({
  thai: `ขอผ่านเรื่อง${plan.thai}ก่อน`,
  id: `khaaw-phaan-reuuang-${plan.id}-gaawn`,
  roman: `khaaw phaan reuuang ${plan.roman} gaawn`,
  chinese: `这次先不${plan.chinese}`,
  partOfSpeech: "短语",
  theme: "轻度推脱",
  exampleThai: `ช่วงนี้ฉันเหนื่อย ขอผ่านเรื่อง${plan.thai}ก่อนนะ`,
  exampleRoman: `chuuang nii chan neuueai, khaaw phaan reuuang ${plan.roman} gaawn na`,
  exampleChinese: `最近我有点累，这次先不${plan.chinese}了。`,
  tag: "推脱",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...inconvenientRows,
  ...nextTimeRows,
  ...maybeNoRows,
  ...thinkRows,
  ...thanksRows,
  ...excuseRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "礼貌拒绝", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 礼貌拒绝常用“ขอโทษนะ、ไม่สะดวก、ไว้ครั้งหน้า、อาจจะ...ไม่ได้、ขอคิดก่อน、ขอบคุณที่ชวน”等婉转表达。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于不方便、下次吧、可能不行、先考虑、没关系、谢谢邀请和轻度推脱。"],
    tags,
    sourceRefs: EVERYDAY_POLITE_REFUSALS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_EVERYDAY_POLITE_REFUSALS_01 = rows.map(toCandidate);
