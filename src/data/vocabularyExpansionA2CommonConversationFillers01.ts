export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "嗯" | "这样啊" | "真的啊" | "对吧" | "然后呢" | "没错" | "不是啦" | "我觉得" | "可能吧";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Topic = { thai: string; roman: string; chinese: string; id: string };

const COMMON_CONVERSATION_FILLERS_REFS = ["thai-frequency", "thai-a2-common-conversation-fillers-candidate"];

const topics: readonly Topic[] = [
  { thai: "เรื่องนัดพรุ่งนี้", roman: "reuuang nat phrung-nii", chinese: "明天约会的事", id: "reuuang-nat-phrung-nii" },
  { thai: "เรื่องร้านอาหารใหม่", roman: "reuuang raan aa-haan mai", chinese: "新餐厅的事", id: "reuuang-raan-aa-haan-mai" },
  { thai: "เรื่องรถติดเมื่อเช้า", roman: "reuuang rot dtit meuua chaao", chinese: "今天早上堵车的事", id: "reuuang-rot-dtit-meuua-chaao" },
  { thai: "เรื่องของที่หาย", roman: "reuuang khaawng thii haai", chinese: "东西丢了的事", id: "reuuang-khaawng-thii-haai" },
  { thai: "เรื่องงานบ้านวันนี้", roman: "reuuang ngaan-baan wan-nii", chinese: "今天家务的事", id: "reuuang-ngaan-baan-wan-nii" },
  { thai: "เรื่องข้อความในกลุ่ม", roman: "reuuang khaaw-khwaam nai glum", chinese: "群消息的事", id: "reuuang-khaaw-khwaam-nai-glum" },
  { thai: "เรื่องตั๋วรถไฟ", roman: "reuuang dtuaa rot-fai", chinese: "火车票的事", id: "reuuang-dtuaa-rot-fai" },
  { thai: "เรื่องห้องพัก", roman: "reuuang haawng phak", chinese: "住宿房间的事", id: "reuuang-haawng-phak" },
  { thai: "เรื่องราคาเสื้อ", roman: "reuuang raa-khaa seua", chinese: "衣服价格的事", id: "reuuang-raa-khaa-seua" },
  { thai: "เรื่องอากาศวันนี้", roman: "reuuang aa-gaat wan-nii", chinese: "今天天气的事", id: "reuuang-aa-gaat-wan-nii" },
  { thai: "เรื่องแผนวันหยุด", roman: "reuuang phaaen wan-yut", chinese: "假日计划的事", id: "reuuang-phaaen-wan-yut" },
  { thai: "เรื่องอาหารเย็น", roman: "reuuang aa-haan yen", chinese: "晚饭的事", id: "reuuang-aa-haan-yen" },
  { thai: "เรื่องเพื่อนใหม่", roman: "reuuang pheuuan mai", chinese: "新朋友的事", id: "reuuang-pheuuan-mai" },
  { thai: "เรื่องเวลาเปิดร้าน", roman: "reuuang wee-laa bpoet raan", chinese: "店铺开门时间的事", id: "reuuang-wee-laa-bpoet-raan" },
];

const directRows: readonly Definition[] = [
  { thai: "อืม เข้าใจแล้ว", id: "eum-khao-jai-laaeo", roman: "eum khao-jai laaeo", chinese: "嗯，明白了", partOfSpeech: "短语", theme: "嗯", exampleThai: "อืม เข้าใจแล้ว เดี๋ยวฉันลองทำดู", exampleRoman: "eum khao-jai laaeo, diaao chan laawng tham duu", exampleChinese: "嗯，明白了，我等下试着做。", tag: "回应" },
  { thai: "อ๋อ แบบนี้เอง", id: "aaw-baaep-nii-eeng", roman: "aaw baaep nii eeng", chinese: "哦，原来是这样啊", partOfSpeech: "短语", theme: "这样啊", exampleThai: "อ๋อ แบบนี้เอง ฉันเพิ่งเข้าใจ", exampleRoman: "aaw baaep nii eeng, chan phoeng khao-jai", exampleChinese: "哦，原来是这样啊，我刚明白。", tag: "理解" },
  { thai: "จริงเหรอ น่าสนใจนะ", id: "jing-rooe-naa-son-jai-na", roman: "jing rooe naa son-jai na", chinese: "真的吗，挺有意思啊", partOfSpeech: "短语", theme: "真的啊", exampleThai: "จริงเหรอ น่าสนใจนะ เล่าให้ฟังอีกหน่อย", exampleRoman: "jing rooe naa son-jai na, lao hai fang iik naawy", exampleChinese: "真的吗，挺有意思啊，再讲给我听一点。", tag: "惊讶" },
  { thai: "ใช่ไหมล่ะ", id: "chai-mai-la", roman: "chai mai la", chinese: "对吧/是吧", partOfSpeech: "短语", theme: "对吧", exampleThai: "ร้านนี้อาหารอร่อย ใช่ไหมล่ะ", exampleRoman: "raan nii aa-haan a-raawy, chai mai la", exampleChinese: "这家店的菜好吃，对吧？", tag: "确认" },
  { thai: "แล้วต่อไปล่ะ", id: "laaeo-dtaaw-bpai-la", roman: "laaeo dtaaw bpai la", chinese: "然后呢/接下来呢", partOfSpeech: "短语", theme: "然后呢", exampleThai: "เธอเจอเขาแล้ว แล้วต่อไปล่ะ", exampleRoman: "thoe jooe khao laaeo, laaeo dtaaw bpai la", exampleChinese: "你见到他之后呢，然后呢？", tag: "追问" },
  { thai: "ใช่เลย ถูกแล้ว", id: "chai-looei-thuuk-laaeo", roman: "chai looei thuuk laaeo", chinese: "没错，就是这样", partOfSpeech: "短语", theme: "没错", exampleThai: "ใช่เลย ถูกแล้ว ฉันก็คิดแบบนั้น", exampleRoman: "chai looei thuuk laaeo, chan gaaw khit baaep nan", exampleChinese: "没错，就是这样，我也这么想。", tag: "同意" },
  { thai: "ไม่ใช่แบบนั้นนะ", id: "mai-chai-baaep-nan-na", roman: "mai chai baaep nan na", chinese: "不是那样啦", partOfSpeech: "短语", theme: "不是啦", exampleThai: "ไม่ใช่แบบนั้นนะ ฉันแค่พูดเล่น", exampleRoman: "mai chai baaep nan na, chan khaae phuut len", exampleChinese: "不是那样啦，我只是开玩笑。", tag: "解释" },
  { thai: "ฉันว่าน่าจะได้", id: "chan-waa-naa-ja-dai", roman: "chan waa naa ja dai", chinese: "我觉得应该可以", partOfSpeech: "短语", theme: "我觉得", exampleThai: "ถ้าเราไปเร็ว ฉันว่าน่าจะได้", exampleRoman: "thaa rao bpai reo, chan waa naa ja dai", exampleChinese: "如果我们早点去，我觉得应该可以。", tag: "看法" },
  { thai: "อาจจะใช่มั้ง", id: "aat-ja-chai-mang", roman: "aat ja chai mang", chinese: "可能是吧", partOfSpeech: "短语", theme: "可能吧", exampleThai: "ฉันไม่แน่ใจ แต่อาจจะใช่มั้ง", exampleRoman: "chan mai naae-jai, dtaae aat ja chai mang", exampleChinese: "我不确定，但可能是吧。", tag: "不确定" },
];

const hmmRows = topics.map((topic): Definition => ({
  thai: `อืม เรื่อง${topic.thai}ใช่ไหม`,
  id: `eum-${topic.id}-chai-mai`,
  roman: `eum reuuang ${topic.roman} chai mai`,
  chinese: `嗯，是${topic.chinese}对吗`,
  partOfSpeech: "短语",
  theme: "嗯",
  exampleThai: `อืม เรื่อง${topic.thai}ใช่ไหม ฉันจำได้แล้ว`,
  exampleRoman: `eum reuuang ${topic.roman} chai mai, chan jam dai laaeo`,
  exampleChinese: `嗯，是${topic.chinese}对吗？我想起来了。`,
  tag: "回应",
}));

const understandRows = topics.map((topic): Definition => ({
  thai: `อ๋อ เรื่อง${topic.thai}นี่เอง`,
  id: `aaw-${topic.id}-nii-eeng`,
  roman: `aaw reuuang ${topic.roman} nii eeng`,
  chinese: `哦，原来是${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "这样啊",
  exampleThai: `อ๋อ เรื่อง${topic.thai}นี่เอง ตอนแรกฉันไม่เข้าใจ`,
  exampleRoman: `aaw reuuang ${topic.roman} nii eeng, dtaawn raaek chan mai khao-jai`,
  exampleChinese: `哦，原来是${topic.chinese}，一开始我没明白。`,
  tag: "理解",
}));

const reallyRows = topics.map((topic): Definition => ({
  thai: `จริงเหรอ เรื่อง${topic.thai}`,
  id: `jing-rooe-${topic.id}`,
  roman: `jing rooe reuuang ${topic.roman}`,
  chinese: `真的吗，关于${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "真的啊",
  exampleThai: `จริงเหรอ เรื่อง${topic.thai} ฉันเพิ่งรู้`,
  exampleRoman: `jing rooe reuuang ${topic.roman}, chan phoeng ruu`,
  exampleChinese: `真的吗，关于${topic.chinese}？我刚知道。`,
  tag: "惊讶",
}));

const rightRows = topics.map((topic): Definition => ({
  thai: `${topic.thai}ใช่ไหม`,
  id: `${topic.id}-chai-mai`,
  roman: `${topic.roman} chai mai`,
  chinese: `是${topic.chinese}对吧`,
  partOfSpeech: "短语",
  theme: "对吧",
  exampleThai: `เรากำลังคุยเรื่อง${topic.thai}ใช่ไหม`,
  exampleRoman: `rao gam-lang khui reuuang ${topic.roman} chai mai`,
  exampleChinese: `我们正在聊${topic.chinese}对吧？`,
  tag: "确认",
}));

const nextRows = topics.map((topic): Definition => ({
  thai: `แล้วเรื่อง${topic.thai}ต่อยังไง`,
  id: `laaeo-reuuang-${topic.id}-dtaaw-yang-ngai`,
  roman: `laaeo reuuang ${topic.roman} dtaaw yang ngai`,
  chinese: `那${topic.chinese}后来怎么样`,
  partOfSpeech: "短语",
  theme: "然后呢",
  exampleThai: `ฉันฟังอยู่ แล้วเรื่อง${topic.thai}ต่อยังไง`,
  exampleRoman: `chan fang yuu, laaeo reuuang ${topic.roman} dtaaw yang ngai`,
  exampleChinese: `我在听，那${topic.chinese}后来怎么样？`,
  tag: "追问",
}));

const exactlyRows = topics.map((topic): Definition => ({
  thai: `ใช่เลย เรื่อง${topic.thai}`,
  id: `chai-looei-reuuang-${topic.id}`,
  roman: `chai looei reuuang ${topic.roman}`,
  chinese: `没错，就是${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "没错",
  exampleThai: `ใช่เลย เรื่อง${topic.thai} ฉันก็คิดแบบนี้`,
  exampleRoman: `chai looei reuuang ${topic.roman}, chan gaaw khit baaep nii`,
  exampleChinese: `没错，就是${topic.chinese}，我也这么想。`,
  tag: "同意",
}));

const notRows = topics.map((topic): Definition => ({
  thai: `ไม่ใช่เรื่อง${topic.thai}นะ`,
  id: `mai-chai-reuuang-${topic.id}-na`,
  roman: `mai chai reuuang ${topic.roman} na`,
  chinese: `不是${topic.chinese}啦`,
  partOfSpeech: "短语",
  theme: "不是啦",
  exampleThai: `ไม่ใช่เรื่อง${topic.thai}นะ เธอเข้าใจผิด`,
  exampleRoman: `mai chai reuuang ${topic.roman} na, thoe khao-jai phit`,
  exampleChinese: `不是${topic.chinese}啦，你误会了。`,
  tag: "解释",
}));

const thinkRows = topics.map((topic): Definition => ({
  thai: `ฉันว่าเรื่อง${topic.thai}โอเคนะ`,
  id: `chan-waa-reuuang-${topic.id}-oo-khee-na`,
  roman: `chan waa reuuang ${topic.roman} oo-khee na`,
  chinese: `我觉得${topic.chinese}还可以`,
  partOfSpeech: "短语",
  theme: "我觉得",
  exampleThai: `ถ้าถามฉัน ฉันว่าเรื่อง${topic.thai}โอเคนะ`,
  exampleRoman: `thaa thaam chan, chan waa reuuang ${topic.roman} oo-khee na`,
  exampleChinese: `如果问我，我觉得${topic.chinese}还可以。`,
  tag: "看法",
}));

const maybeRows = topics.map((topic): Definition => ({
  thai: `อาจจะเป็นเรื่อง${topic.thai}มั้ง`,
  id: `aat-ja-bpen-reuuang-${topic.id}-mang`,
  roman: `aat ja bpen reuuang ${topic.roman} mang`,
  chinese: `可能是${topic.chinese}吧`,
  partOfSpeech: "短语",
  theme: "可能吧",
  exampleThai: `ฉันไม่แน่ใจ อาจจะเป็นเรื่อง${topic.thai}มั้ง`,
  exampleRoman: `chan mai naae-jai, aat ja bpen reuuang ${topic.roman} mang`,
  exampleChinese: `我不确定，可能是${topic.chinese}吧。`,
  tag: "不确定",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...hmmRows,
  ...understandRows,
  ...reallyRows,
  ...rightRows,
  ...nextRows,
  ...exactlyRows,
  ...notRows,
  ...thinkRows,
  ...maybeRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "对话填充回应", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 对话填充词要放在自然回应里理解，如“อืม、อ๋อ、จริงเหรอ、ใช่ไหม、แล้ว...ต่อยังไง、ใช่เลย、ไม่ใช่...啦、ฉันว่า、อาจจะ...มั้ง”。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于日常对话中的回应、追问、确认、同意、解释、表达看法和不确定。"],
    tags,
    sourceRefs: COMMON_CONVERSATION_FILLERS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_COMMON_CONVERSATION_FILLERS_01 = rows.map(toCandidate);
