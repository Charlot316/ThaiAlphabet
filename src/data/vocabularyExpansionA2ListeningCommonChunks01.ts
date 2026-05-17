export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "地点指示" | "时间词块" | "询问确认" | "方式表达" | "请求重复" | "短句听辨";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Chunk = { thai: string; id: string; roman: string; chinese: string; theme: VocabularyExpansionTheme; tag: string };
type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };

const LISTENING_COMMON_CHUNKS_REFS = ["thai-frequency", "thai-a2-listening-common-chunks-candidate"];

const chunks: readonly Chunk[] = [
  { thai: "ร้านนี้", id: "raan-nii", roman: "raan nii", chinese: "这家店", theme: "地点指示", tag: "地点" },
  { thai: "ร้านนั้น", id: "raan-nan", roman: "raan nan", chinese: "那家店", theme: "地点指示", tag: "地点" },
  { thai: "ตรงนี้", id: "dtrong-nii", roman: "dtrong nii", chinese: "这里/这个位置", theme: "地点指示", tag: "位置" },
  { thai: "ตรงนั้น", id: "dtrong-nan", roman: "dtrong nan", chinese: "那里/那个位置", theme: "地点指示", tag: "位置" },
  { thai: "เมื่อกี้", id: "meuua-gii", roman: "meuua gii", chinese: "刚才", theme: "时间词块", tag: "时间" },
  { thai: "ตอนนี้", id: "dtaawn-nii", roman: "dtaawn nii", chinese: "现在", theme: "时间词块", tag: "时间" },
  { thai: "พรุ่งนี้", id: "phrung-nii", roman: "phrung nii", chinese: "明天", theme: "时间词块", tag: "时间" },
  { thai: "อีกที", id: "iik-thii", roman: "iik thii", chinese: "再一次", theme: "请求重复", tag: "重复" },
  { thai: "อีกหน่อย", id: "iik-naawy", roman: "iik naawy", chinese: "再一点/过一会儿", theme: "时间词块", tag: "程度" },
  { thai: "ยังไง", id: "yang-ngai", roman: "yang ngai", chinese: "怎么/怎样", theme: "方式表达", tag: "方式" },
  { thai: "แบบนี้", id: "baaep-nii", roman: "baaep nii", chinese: "这样", theme: "方式表达", tag: "方式" },
  { thai: "แบบนั้น", id: "baaep-nan", roman: "baaep nan", chinese: "那样", theme: "方式表达", tag: "方式" },
  { thai: "ได้ไหม", id: "dai-mai", roman: "dai mai", chinese: "可以吗", theme: "询问确认", tag: "请求" },
  { thai: "ใช่ไหม", id: "chai-mai", roman: "chai mai", chinese: "对吗/是不是", theme: "询问确认", tag: "确认" },
  { thai: "โอเคไหม", id: "oo-khee-mai", roman: "oo-khee mai", chinese: "可以吗/还好吗", theme: "询问确认", tag: "确认" },
  { thai: "ตรงเวลา", id: "dtrong-wee-laa", roman: "dtrong wee-laa", chinese: "准时", theme: "短句听辨", tag: "时间" },
];

const directRows: readonly Definition[] = [
  { thai: "ร้านนี้เปิดไหม", id: "raan-nii-bpoeet-mai", roman: "raan nii bpoeet mai", chinese: "这家店开门吗", partOfSpeech: "短语", theme: "地点指示", exampleThai: "ขอโทษครับ ร้านนี้เปิดไหมตอนเช้า", exampleRoman: "khaaw-thoot khrap, raan nii bpoeet mai dtaawn chaao", exampleChinese: "不好意思，这家店早上开门吗？", tag: "地点" },
  { thai: "ตรงนั้นมีที่นั่งไหม", id: "dtrong-nan-mii-thii-nang-mai", roman: "dtrong nan mii thii nang mai", chinese: "那里有座位吗", partOfSpeech: "短语", theme: "地点指示", exampleThai: "ตรงนั้นมีที่นั่งไหม เราอยากพักสักครู่", exampleRoman: "dtrong nan mii thii nang mai, rao yaak phak sak khruu", exampleChinese: "那里有座位吗？我们想休息一会儿。", tag: "位置" },
  { thai: "เมื่อกี้พูดว่าอะไร", id: "meuua-gii-phuut-waa-a-rai", roman: "meuua gii phuut waa a-rai", chinese: "刚才说了什么", partOfSpeech: "短语", theme: "请求重复", exampleThai: "ขอโทษค่ะ เมื่อกี้พูดว่าอะไรนะ", exampleRoman: "khaaw-thoot kha, meuua gii phuut waa a-rai na", exampleChinese: "不好意思，刚才说了什么呀？", tag: "听不清" },
  { thai: "พูดอีกทีได้ไหม", id: "phuut-iik-thii-dai-mai", roman: "phuut iik thii dai mai", chinese: "可以再说一遍吗", partOfSpeech: "短语", theme: "请求重复", exampleThai: "ฉันฟังไม่ทัน พูดอีกทีได้ไหม", exampleRoman: "chan fang mai than, phuut iik thii dai mai", exampleChinese: "我没听上，可以再说一遍吗？", tag: "重复" },
  { thai: "ต้องทำยังไง", id: "dtawng-tham-yang-ngai", roman: "dtawng tham yang ngai", chinese: "要怎么做", partOfSpeech: "短语", theme: "方式表达", exampleThai: "ถ้าจะสมัคร ต้องทำยังไงบ้าง", exampleRoman: "thaa ja sa-mak, dtawng tham yang ngai baang", exampleChinese: "如果要报名，需要怎么做？", tag: "方式" },
  { thai: "ทำแบบนี้ได้ไหม", id: "tham-baaep-nii-dai-mai", roman: "tham baaep nii dai mai", chinese: "这样做可以吗", partOfSpeech: "短语", theme: "方式表达", exampleThai: "ฉันไม่แน่ใจ ทำแบบนี้ได้ไหม", exampleRoman: "chan mai naae-jai, tham baaep nii dai mai", exampleChinese: "我不确定，这样做可以吗？", tag: "确认" },
  { thai: "ตอนนี้สะดวกไหม", id: "dtaawn-nii-sa-duuak-mai", roman: "dtaawn nii sa-duuak mai", chinese: "现在方便吗", partOfSpeech: "短语", theme: "询问确认", exampleThai: "ขอถามนิดหนึ่ง ตอนนี้สะดวกไหม", exampleRoman: "khaaw thaam nit neung, dtaawn nii sa-duuak mai", exampleChinese: "想问一下，现在方便吗？", tag: "确认" },
  { thai: "พรุ่งนี้เจอกันตรงเวลา", id: "phrung-nii-jooe-gan-dtrong-wee-laa", roman: "phrung nii jooe gan dtrong wee-laa", chinese: "明天准时见", partOfSpeech: "短语", theme: "短句听辨", exampleThai: "พรุ่งนี้เจอกันตรงเวลา อย่ามาสายนะ", exampleRoman: "phrung nii jooe gan dtrong wee-laa, yaa maa saai na", exampleChinese: "明天准时见，别迟到哦。", tag: "时间" },
];

const hearRows = chunks.map((chunk): Definition => ({
  thai: `ฟังคำว่า${chunk.thai}ให้ชัด`,
  id: `fang-kham-waa-${chunk.id}-hai-chat`,
  roman: `fang kham waa ${chunk.roman} hai chat`,
  chinese: `把“${chunk.chinese}”听清楚`,
  partOfSpeech: "短语",
  theme: chunk.theme,
  exampleThai: `เวลาเรียนฟัง ควรฟังคำว่า${chunk.thai}ให้ชัด`,
  exampleRoman: `wee-laa riian fang, khuuan fang kham waa ${chunk.roman} hai chat`,
  exampleChinese: `练听力时，应该把“${chunk.chinese}”听清楚。`,
  tag: chunk.tag,
}));

const sentenceRows = chunks.map((chunk): Definition => ({
  thai: `เจอ${chunk.thai}ในประโยคสั้นๆ`,
  id: `jooe-${chunk.id}-nai-bpra-yook-san-san`,
  roman: `jooe ${chunk.roman} nai bpra-yook san san`,
  chinese: `在短句里遇到“${chunk.chinese}”`,
  partOfSpeech: "短语",
  theme: chunk.theme,
  exampleThai: `ผู้เรียนมักเจอ${chunk.thai}ในประโยคสั้นๆ`,
  exampleRoman: `phuu-riian mak jooe ${chunk.roman} nai bpra-yook san san`,
  exampleChinese: `学习者常在短句里遇到“${chunk.chinese}”。`,
  tag: chunk.tag,
}));

const repeatRows = chunks.map((chunk): Definition => ({
  thai: `ขอให้พูด${chunk.thai}ช้าลง`,
  id: `khaaw-hai-phuut-${chunk.id}-chaa-long`,
  roman: `khaaw hai phuut ${chunk.roman} chaa long`,
  chinese: `请把“${chunk.chinese}”说慢一点`,
  partOfSpeech: "短语",
  theme: chunk.theme,
  exampleThai: `ถ้าฟังไม่ทัน ขอให้พูด${chunk.thai}ช้าลงได้`,
  exampleRoman: `thaa fang mai than, khaaw hai phuut ${chunk.roman} chaa long dai`,
  exampleChinese: `如果没听上，可以请对方把“${chunk.chinese}”说慢一点。`,
  tag: chunk.tag,
}));

const meaningRows = chunks.map((chunk): Definition => ({
  thai: `เข้าใจความหมายของ${chunk.thai}`,
  id: `khao-jai-khwaam-maai-khaawng-${chunk.id}`,
  roman: `khao-jai khwaam-maai khaawng ${chunk.roman}`,
  chinese: `理解“${chunk.chinese}”的意思`,
  partOfSpeech: "短语",
  theme: chunk.theme,
  exampleThai: `ถ้าจับเสียงได้ ก็เข้าใจความหมายของ${chunk.thai}ง่ายขึ้น`,
  exampleRoman: `thaa jap siiang dai, gaaw khao-jai khwaam-maai khaawng ${chunk.roman} ngaai kheun`,
  exampleChinese: `如果能抓住发音，就更容易理解“${chunk.chinese}”的意思。`,
  tag: chunk.tag,
}));

const dialogueRows = chunks.map((chunk): Definition => ({
  thai: `ได้ยิน${chunk.thai}ในบทสนทนา`,
  id: `dai-yin-${chunk.id}-nai-bot-son-tha-naa`,
  roman: `dai-yin ${chunk.roman} nai bot-son-tha-naa`,
  chinese: `在对话中听到“${chunk.chinese}”`,
  partOfSpeech: "短语",
  theme: chunk.theme,
  exampleThai: `ฉันได้ยิน${chunk.thai}ในบทสนทนาหลายครั้ง`,
  exampleRoman: `chan dai-yin ${chunk.roman} nai bot-son-tha-naa laai khrang`,
  exampleChinese: `我在对话中多次听到“${chunk.chinese}”。`,
  tag: chunk.tag,
}));

const distinguishRows = chunks.map((chunk): Definition => ({
  thai: `แยกเสียง${chunk.thai}จากคำอื่น`,
  id: `yaaek-siiang-${chunk.id}-jaak-kham-euun`,
  roman: `yaaek siiang ${chunk.roman} jaak kham euun`,
  chinese: `把“${chunk.chinese}”的声音和其他词分开`,
  partOfSpeech: "短语",
  theme: chunk.theme,
  exampleThai: `ฟังหลายรอบช่วยให้แยกเสียง${chunk.thai}จากคำอื่นได้`,
  exampleRoman: `fang laai raawp chuai hai yaaek siiang ${chunk.roman} jaak kham euun dai`,
  exampleChinese: `多听几遍有助于把“${chunk.chinese}”的声音和其他词分开。`,
  tag: chunk.tag,
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...hearRows,
  ...sentenceRows,
  ...repeatRows,
  ...meaningRows,
  ...dialogueRows,
  ...distinguishRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const comparisons: VocabularyExpansionComparison[] = [{ kind: "用法", target: { thai: "อีกที", roman: "iik thii", chinese: "再一次" }, distinctionZh: "听不清时可用“อีกที”请求重复；如果已经听懂，只是确认内容，可以用“ใช่ไหม”或“ได้ไหม”。" }];
  const tags = ["a2", "听力词块", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons, collocations, usageNotesZh: ["A2 听力中常见词块要作为一整块识别，例如地点“ตรงนี้/ตรงนั้น”、时间“เมื่อกี้/ตอนนี้”、请求“ได้ไหม/อีกที”。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons,
    collocations,
    usageNotesZh: ["用于听力训练、短句听辨、请求重复、确认地点时间和理解常见口语块。"],
    tags,
    sourceRefs: LISTENING_COMMON_CHUNKS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_LISTENING_COMMON_CHUNKS_01 = rows.map(toCandidate);
