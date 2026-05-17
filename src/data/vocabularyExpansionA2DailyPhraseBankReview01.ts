export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "请求帮助" | "确认理解" | "轻松回应" | "改天再说" | "提醒" | "简单说明" | "礼貌收尾" | "小句框";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Phrase = { thai: string; id: string; roman: string; chinese: string; theme: VocabularyExpansionTheme; tag: string };
type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };

const DAILY_PHRASE_BANK_REVIEW_REFS = ["thai-frequency", "thai-a2-daily-phrase-bank-review-candidate"];

const phrases: readonly Phrase[] = [
  { thai: "ช่วยดูให้หน่อย", id: "chuai-duu-hai-naawy", roman: "chuai duu hai naawy", chinese: "请帮忙看一下", theme: "请求帮助", tag: "求助" },
  { thai: "ขอถามอีกนิด", id: "khaaw-thaam-iik-nit", roman: "khaaw thaam iik nit", chinese: "想再问一点", theme: "请求帮助", tag: "追问" },
  { thai: "ขอคิดก่อน", id: "khaaw-khit-gaawn", roman: "khaaw khit gaawn", chinese: "请让我先想想", theme: "改天再说", tag: "缓冲" },
  { thai: "ไว้คุยกันต่อ", id: "wai-khui-gan-dtaaw", roman: "wai khui gan dtaaw", chinese: "稍后继续聊", theme: "改天再说", tag: "续聊" },
  { thai: "เข้าใจตรงกันแล้ว", id: "khao-jai-dtrong-gan-laaeo", roman: "khao-jai dtrong gan laaeo", chinese: "理解一致了", theme: "确认理解", tag: "确认" },
  { thai: "ขอทวนอีกครั้ง", id: "khaaw-thuuan-iik-khrang", roman: "khaaw thuuan iik khrang", chinese: "请让我再确认一遍", theme: "确认理解", tag: "复述" },
  { thai: "ไม่รีบก็ได้", id: "mai-riip-gaaw-dai", roman: "mai riip gaaw dai", chinese: "不急也可以", theme: "轻松回应", tag: "缓和" },
  { thai: "ทำเท่าที่ไหว", id: "tham-thao-thii-wai", roman: "tham thao thii wai", chinese: "做到能做的程度", theme: "轻松回应", tag: "安慰" },
  { thai: "อย่าลืมส่งข่าว", id: "yaa-leum-song-khaao", roman: "yaa leum song khaao", chinese: "别忘了告知消息", theme: "提醒", tag: "提醒" },
  { thai: "เตือนฉันพรุ่งนี้", id: "dteuuan-chan-phrung-nii", roman: "dteuuan chan phrung-nii", chinese: "明天提醒我", theme: "提醒", tag: "提醒" },
  { thai: "บอกเหตุผลสั้นๆ", id: "baawk-heet-phon-san-san", roman: "baawk heet-phon san san", chinese: "简短说明理由", theme: "简单说明", tag: "说明" },
  { thai: "อธิบายทีละข้อ", id: "a-thi-baai-thii-la-khaaw", roman: "a-thi-baai thii la khaaw", chinese: "逐条说明", theme: "简单说明", tag: "说明" },
  { thai: "ขอบคุณที่ช่วยดู", id: "khaawp-khun-thii-chuai-duu", roman: "khaawp-khun thii chuai duu", chinese: "谢谢帮忙查看", theme: "礼貌收尾", tag: "致谢" },
  { thai: "ไว้เจอกันใหม่นะ", id: "wai-jooe-gan-mai-na", roman: "wai jooe gan mai na", chinese: "下次再见哦", theme: "礼貌收尾", tag: "告别" },
  { thai: "ถ้าไม่สะดวกก็บอก", id: "thaa-mai-sa-duuak-gaaw-baawk", roman: "thaa mai sa-duuak gaaw baawk", chinese: "如果不方便就说", theme: "小句框", tag: "条件" },
  { thai: "ถ้าพร้อมแล้วค่อยเริ่ม", id: "thaa-phraawm-laaeo-khaawy-roem", roman: "thaa phraawm laaeo khaawy roem", chinese: "准备好了再开始", theme: "小句框", tag: "条件" },
];

const directRows: readonly Definition[] = [
  { thai: "ขอเวลาสักครู่", id: "khaaw-wee-laa-sak-khruu", roman: "khaaw wee-laa sak khruu", chinese: "请给我一点时间", partOfSpeech: "短语", theme: "请求帮助", exampleThai: "เรื่องนี้ขอเวลาสักครู่ เดี๋ยวฉันตอบให้", exampleRoman: "reuuang nii khaaw wee-laa sak khruu, diaao chan dtaawp hai", exampleChinese: "这件事请给我一点时间，我一会儿回复。", tag: "缓冲" },
  { thai: "พูดแบบง่ายๆ ได้ไหม", id: "phuut-baaep-ngaai-ngaai-dai-mai", roman: "phuut baaep ngaai ngaai dai mai", chinese: "可以说得简单一点吗", partOfSpeech: "短语", theme: "确认理解", exampleThai: "ฉันยังไม่ค่อยเข้าใจ พูดแบบง่ายๆ ได้ไหม", exampleRoman: "chan yang mai khaawy khao-jai, phuut baaep ngaai ngaai dai mai", exampleChinese: "我还不太明白，可以说得简单一点吗？", tag: "听懂" },
  { thai: "ช่วยสรุปสั้นๆ หน่อย", id: "chuai-sa-rup-san-san-naawy", roman: "chuai sa-rup san san naawy", chinese: "请简短总结一下", partOfSpeech: "短语", theme: "简单说明", exampleThai: "เวลามีน้อย ช่วยสรุปสั้นๆ หน่อยได้ไหม", exampleRoman: "wee-laa mii naawy, chuai sa-rup san san naawy dai mai", exampleChinese: "时间不多，可以请简短总结一下吗？", tag: "总结" },
  { thai: "ตามนี้ก่อนนะ", id: "dtaam-nii-gaawn-na", roman: "dtaam nii gaawn na", chinese: "先按这个来吧", partOfSpeech: "短语", theme: "轻松回应", exampleThai: "ถ้ายังไม่มีคำถาม เราตามนี้ก่อนนะ", exampleRoman: "thaa yang mai mii kham-thaam, rao dtaam nii gaawn na", exampleChinese: "如果还没有问题，我们先按这个来吧。", tag: "决定" },
  { thai: "ไม่ต้องคิดมาก", id: "mai-dtawng-khit-maak", roman: "mai dtawng khit maak", chinese: "不用想太多", partOfSpeech: "短语", theme: "轻松回应", exampleThai: "เรื่องเล็กน้อย ไม่ต้องคิดมากนะ", exampleRoman: "reuuang lek naawy, mai dtawng khit maak na", exampleChinese: "小事，不用想太多。", tag: "安慰" },
  { thai: "เดี๋ยวฉันจัดการเอง", id: "diaao-chan-jat-gaan-eeng", roman: "diaao chan jat-gaan eeng", chinese: "一会儿我自己处理", partOfSpeech: "短语", theme: "请求帮助", exampleThai: "ถ้าทุกคนไม่ว่าง เดี๋ยวฉันจัดการเอง", exampleRoman: "thaa thuk khon mai waang, diaao chan jat-gaan eeng", exampleChinese: "如果大家没空，一会儿我自己处理。", tag: "处理" },
  { thai: "ขอจบเรื่องนี้ก่อน", id: "khaaw-jop-reuuang-nii-gaawn", roman: "khaaw jop reuuang nii gaawn", chinese: "请先把这件事结束", partOfSpeech: "短语", theme: "礼貌收尾", exampleThai: "ก่อนคุยเรื่องใหม่ ขอจบเรื่องนี้ก่อนนะ", exampleRoman: "gaawn khui reuuang mai, khaaw jop reuuang nii gaawn na", exampleChinese: "聊新事情前，请先把这件事结束吧。", tag: "收尾" },
  { thai: "ถ้ามีอะไรค่อยบอก", id: "thaa-mii-a-rai-khaawy-baawk", roman: "thaa mii a-rai khaawy baawk", chinese: "有事再说", partOfSpeech: "短语", theme: "小句框", exampleThai: "ตอนนี้พักก่อน ถ้ามีอะไรค่อยบอก", exampleRoman: "dtaawn nii phak gaawn, thaa mii a-rai khaawy baawk", exampleChinese: "现在先休息，有事再说。", tag: "条件" },
];

const dailyUseRows = phrases.map((phrase): Definition => ({
  thai: `ใช้ประโยคว่า${phrase.thai}ในชีวิตประจำวัน`,
  id: `chai-bpra-yook-waa-${phrase.id}-nai-chii-wit-bpra-jam-wan`,
  roman: `chai bpra-yook waa ${phrase.roman} nai chii-wit bpra-jam-wan`,
  chinese: `在日常生活中使用“${phrase.chinese}”`,
  partOfSpeech: "短语",
  theme: phrase.theme,
  exampleThai: `ประโยคว่า${phrase.thai}ใช้ได้บ่อยในชีวิตประจำวัน`,
  exampleRoman: `bpra-yook waa ${phrase.roman} chai dai baawy nai chii-wit bpra-jam-wan`,
  exampleChinese: `“${phrase.chinese}”这个句子在日常生活中很常用。`,
  tag: phrase.tag,
}));

const chatRows = phrases.map((phrase): Definition => ({
  thai: `พิมพ์ว่า${phrase.thai}ในแชต`,
  id: `phim-waa-${phrase.id}-nai-chaaet`,
  roman: `phim waa ${phrase.roman} nai chaaet`,
  chinese: `在聊天里写“${phrase.chinese}”`,
  partOfSpeech: "短语",
  theme: phrase.theme,
  exampleThai: `ถ้าคุยทางมือถือ ฉันพิมพ์ว่า${phrase.thai}ในแชตได้`,
  exampleRoman: `thaa khui thaang meuu-theuu, chan phim waa ${phrase.roman} nai chaaet dai`,
  exampleChinese: `如果用手机聊天，我可以在聊天里写“${phrase.chinese}”。`,
  tag: phrase.tag,
}));

const politeRows = phrases.map((phrase): Definition => ({
  thai: `พูดว่า${phrase.thai}อย่างสุภาพ`,
  id: `phuut-waa-${phrase.id}-yaang-su-phaap`,
  roman: `phuut waa ${phrase.roman} yaang su-phaap`,
  chinese: `礼貌地说“${phrase.chinese}”`,
  partOfSpeech: "短语",
  theme: phrase.theme,
  exampleThai: `เวลาคุยกับคนไม่สนิท ควรพูดว่า${phrase.thai}อย่างสุภาพ`,
  exampleRoman: `wee-laa khui gap khon mai sa-nit, khuuan phuut waa ${phrase.roman} yaang su-phaap`,
  exampleChinese: `和不太熟的人说话时，应该礼貌地说“${phrase.chinese}”。`,
  tag: phrase.tag,
}));

const rememberRows = phrases.map((phrase): Definition => ({
  thai: `จำไว้ว่า${phrase.thai}`,
  id: `jam-wai-waa-${phrase.id}`,
  roman: `jam wai waa ${phrase.roman}`,
  chinese: `记住“${phrase.chinese}”这句话`,
  partOfSpeech: "短语",
  theme: phrase.theme,
  exampleThai: `ประโยคนี้ใช้บ่อย จำไว้ว่า${phrase.thai}`,
  exampleRoman: `bpra-yook nii chai baawy, jam wai waa ${phrase.roman}`,
  exampleChinese: `这个句子常用，记住“${phrase.chinese}”。`,
  tag: phrase.tag,
}));

const responseRows = phrases.map((phrase): Definition => ({
  thai: `ตอบกลับด้วยประโยคว่า${phrase.thai}`,
  id: `dtaawp-glap-duuai-bpra-yook-waa-${phrase.id}`,
  roman: `dtaawp glap duuai bpra-yook waa ${phrase.roman}`,
  chinese: `用“${phrase.chinese}”这句话回复`,
  partOfSpeech: "短语",
  theme: phrase.theme,
  exampleThai: `ถ้าไม่รู้จะตอบอย่างไร ลองตอบกลับด้วยประโยคว่า${phrase.thai}`,
  exampleRoman: `thaa mai ruu ja dtaawp yaang-rai, laawng dtaawp glap duuai bpra-yook waa ${phrase.roman}`,
  exampleChinese: `如果不知道怎么回复，可以试着用“${phrase.chinese}”这句话回复。`,
  tag: phrase.tag,
}));

const practiceRows = phrases.map((phrase): Definition => ({
  thai: `ฝึกพูดว่า${phrase.thai}ให้คล่อง`,
  id: `feuk-phuut-waa-${phrase.id}-hai-khlaawng`,
  roman: `feuk phuut waa ${phrase.roman} hai khlaawng`,
  chinese: `练熟“${phrase.chinese}”的说法`,
  partOfSpeech: "短语",
  theme: phrase.theme,
  exampleThai: `ถ้าอยากพูดเป็นธรรมชาติ ควรฝึกพูดว่า${phrase.thai}ให้คล่อง`,
  exampleRoman: `thaa yaak phuut bpen tham-ma-chaat, khuuan feuk phuut waa ${phrase.roman} hai khlaawng`,
  exampleChinese: `如果想说得自然，应该把“${phrase.chinese}”练熟。`,
  tag: phrase.tag,
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...dailyUseRows,
  ...chatRows,
  ...politeRows,
  ...rememberRows,
  ...responseRows,
  ...practiceRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "日常短语库复盘", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 日常短语库重点是能直接放进对话的小句框，如“ช่วยดูให้หน่อย、ขอคิดก่อน、ขอทวนอีกครั้ง、ไม่รีบก็ได้、ถ้า...ก็บอก”。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于日常聊天、请求帮助、确认理解、提醒、简单说明和礼貌收尾。"],
    tags,
    sourceRefs: DAILY_PHRASE_BANK_REVIEW_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_PHRASE_BANK_REVIEW_01 = rows.map(toCandidate);
