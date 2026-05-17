export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "拜访" | "送礼" | "脱鞋" | "称呼" | "排队" | "打扰" | "不好意思" | "客气回应";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Scene = { thai: string; roman: string; chinese: string; id: string };

const BASIC_SOCIAL_ETIQUETTE_REFS = ["thai-frequency", "thai-a2-basic-social-etiquette-candidate"];

const scenes: readonly Scene[] = [
  { thai: "บ้านเพื่อน", roman: "baan pheuuan", chinese: "朋友家", id: "baan-pheuuan" },
  { thai: "บ้านผู้ใหญ่", roman: "baan phuu-yai", chinese: "长辈家", id: "baan-phuu-yai" },
  { thai: "ร้านอาหาร", roman: "raan aa-haan", chinese: "餐厅", id: "raan-aa-haan" },
  { thai: "หน้าลิฟต์", roman: "naa lip", chinese: "电梯前", id: "naa-lip" },
  { thai: "หน้าเคาน์เตอร์", roman: "naa khao-dtooe", chinese: "柜台前", id: "naa-khao-dtooe" },
  { thai: "ในห้องเรียน", roman: "nai haawng-riian", chinese: "教室里", id: "nai-haawng-riian" },
  { thai: "ในที่ทำงาน", roman: "nai thii tham-ngaan", chinese: "工作场所", id: "nai-thii-tham-ngaan" },
  { thai: "ในร้านค้า", roman: "nai raan khaa", chinese: "店里", id: "nai-raan-khaa" },
  { thai: "หน้าบ้าน", roman: "naa baan", chinese: "家门口", id: "naa-baan" },
  { thai: "ในรถไฟฟ้า", roman: "nai rot-fai-faa", chinese: "轻轨里", id: "nai-rot-fai-faa" },
  { thai: "ในวัด", roman: "nai wat", chinese: "寺庙里", id: "nai-wat" },
  { thai: "ที่งานเลี้ยง", roman: "thii ngaan liiang", chinese: "聚会上", id: "thii-ngaan-liiang" },
  { thai: "ในกลุ่มแชต", roman: "nai glum chaaet", chinese: "聊天群里", id: "nai-glum-chaaet" },
  { thai: "ที่โต๊ะอาหาร", roman: "thii dto aa-haan", chinese: "餐桌旁", id: "thii-dto-aa-haan" },
  { thai: "หน้าห้องน้ำ", roman: "naa haawng naam", chinese: "洗手间门口", id: "naa-haawng-naam" },
  { thai: "ที่ป้ายรถเมล์", roman: "thii bpaai rot-mee", chinese: "公交站牌处", id: "thii-bpaai-rot-mee" },
];

const gifts: readonly Scene[] = [
  { thai: "ผลไม้เล็กน้อย", roman: "phon-la-maai lek naawy", chinese: "一点水果", id: "phon-la-maai-lek-naawy" },
  { thai: "ขนมฝากเจ้าบ้าน", roman: "kha-nom faak jao-baan", chinese: "给主人的点心", id: "kha-nom-faak-jao-baan" },
  { thai: "ดอกไม้ช่อเล็ก", roman: "daawk-maai chaaw lek", chinese: "一小束花", id: "daawk-maai-chaaw-lek" },
  { thai: "ชาไทยกล่องหนึ่ง", roman: "chaa thai glaawng neung", chinese: "一盒泰茶", id: "chaa-thai-glaawng-neung" },
  { thai: "ของฝากจากบ้าน", roman: "khaawng-faak jaak baan", chinese: "家乡带来的伴手礼", id: "khaawng-faak-jaak-baan" },
  { thai: "การ์ดขอบคุณ", roman: "gaat khaawp-khun", chinese: "感谢卡", id: "gaat-khaawp-khun" },
  { thai: "น้ำผลไม้ขวดเล็ก", roman: "naam phon-la-maai khuat lek", chinese: "小瓶果汁", id: "naam-phon-la-maai-khuat-lek" },
  { thai: "ของใช้เล็กๆ", roman: "khaawng-chai lek lek", chinese: "小日用品", id: "khaawng-chai-lek-lek" },
];

const directRows: readonly Definition[] = [
  { thai: "ขอรบกวนหน่อยนะคะ", id: "khaaw-rop-guan-naawy-na-kha", roman: "khaaw rop-guan naawy na kha", chinese: "不好意思，打扰一下", partOfSpeech: "短语", theme: "打扰", exampleThai: "ขอรบกวนหน่อยนะคะ ห้องน้ำอยู่ทางไหน", exampleRoman: "khaaw rop-guan naawy na kha, haawng naam yuu thaang nai", exampleChinese: "不好意思，打扰一下，洗手间在哪里？", tag: "打扰" },
  { thai: "ขอโทษที่มาช้างานเลี้ยง", id: "khaaw-thoot-thii-maa-chaa-ngaan-liiang", roman: "khaaw-thoot thii maa chaa ngaan liiang", chinese: "不好意思聚会来晚了", partOfSpeech: "短语", theme: "不好意思", exampleThai: "รถติดมาก ขอโทษที่มาช้างานเลี้ยง", exampleRoman: "rot dtit maak, khaaw-thoot thii maa chaa ngaan liiang", exampleChinese: "堵车很严重，不好意思聚会来晚了。", tag: "道歉" },
  { thai: "ไม่ต้องเกรงใจนะ", id: "mai-dtawng-greeng-jai-na", roman: "mai dtawng greeng-jai na", chinese: "不用客气/不用不好意思", partOfSpeech: "短语", theme: "客气回应", exampleThai: "กินได้เลย ไม่ต้องเกรงใจนะ", exampleRoman: "gin dai looei, mai dtawng greeng-jai na", exampleChinese: "可以直接吃，不用客气。", tag: "客气" },
  { thai: "เรียกฉันว่าหลินก็ได้", id: "riiak-chan-waa-lin-gaaw-dai", roman: "riiak chan waa lin gaaw dai", chinese: "叫我 Lin 就可以", partOfSpeech: "短语", theme: "称呼", exampleThai: "ไม่ต้องเรียกยาว เรียกฉันว่าหลินก็ได้", exampleRoman: "mai dtawng riiak yaao, riiak chan waa lin gaaw dai", exampleChinese: "不用叫那么长，叫我 Lin 就可以。", tag: "称呼" },
  { thai: "ถอดรองเท้าก่อนเข้าบ้านเพื่อน", id: "thaawt-raawng-thaao-gaawn-khao-baan-pheuuan", roman: "thaawt raawng-thaao gaawn khao baan pheuuan", chinese: "进朋友家前脱鞋", partOfSpeech: "短语", theme: "脱鞋", exampleThai: "เวลาไปบ้านเพื่อน ควรถอดรองเท้าก่อนเข้าบ้านเพื่อน", exampleRoman: "wee-laa bpai baan pheuuan, khuuan thaawt raawng-thaao gaawn khao baan pheuuan", exampleChinese: "去朋友家时，应该进朋友家前脱鞋。", tag: "脱鞋" },
  { thai: "ต่อคิวให้เรียบร้อย", id: "dtaaw-khiu-hai-riiap-raawy", roman: "dtaaw khiu hai riiap-raawy", chinese: "好好排队", partOfSpeech: "短语", theme: "排队", exampleThai: "คนเยอะมาก เราควรต่อคิวให้เรียบร้อย", exampleRoman: "khon yoe maak, rao khuuan dtaaw khiu hai riiap-raawy", exampleChinese: "人很多，我们应该好好排队。", tag: "排队" },
  { thai: "ขอบคุณที่เชิญมา", id: "khaawp-khun-thii-chooen-maa", roman: "khaawp khun thii choeen maa", chinese: "谢谢邀请我来", partOfSpeech: "短语", theme: "拜访", exampleThai: "วันนี้สนุกมาก ขอบคุณที่เชิญมา", exampleRoman: "wan-nii sa-nuk maak, khaawp khun thii choeen maa", exampleChinese: "今天很开心，谢谢邀请我来。", tag: "拜访" },
  { thai: "ยินดีช่วยเต็มที่", id: "yin-dii-chuai-dtem-thii", roman: "yin-dii chuai dtem thii", chinese: "很乐意尽力帮忙", partOfSpeech: "短语", theme: "客气回应", exampleThai: "ถ้าต้องการให้ช่วย ก็บอกได้เลย ยินดีช่วยเต็มที่", exampleRoman: "thaa dtawng-gaan hai chuai, gaaw baawk dai looei, yin-dii chuai dtem thii", exampleChinese: "如果需要帮忙，可以直接说，很乐意尽力帮忙。", tag: "回应" },
];

const visitRows = scenes.map((scene): Definition => ({
  thai: `ไปเยี่ยมที่${scene.thai}`,
  id: `bpai-yiiam-thii-${scene.id}`,
  roman: `bpai yiiam thii ${scene.roman}`,
  chinese: `去${scene.chinese}拜访/探访`,
  partOfSpeech: "短语",
  theme: "拜访",
  exampleThai: `ก่อนจะไปเยี่ยมที่${scene.thai} ควรบอกเจ้าของก่อน`,
  exampleRoman: `gaawn ja bpai yiiam thii ${scene.roman}, khuuan baawk jao-khaawng gaawn`,
  exampleChinese: `去${scene.chinese}拜访前，应该先告诉主人。`,
  tag: "拜访",
}));

const shoesRows = scenes.map((scene): Definition => ({
  thai: `ถอดรองเท้าเมื่อเข้า${scene.thai}`,
  id: `thaawt-raawng-thaao-meuua-khao-${scene.id}`,
  roman: `thaawt raawng-thaao meuua khao ${scene.roman}`,
  chinese: `进入${scene.chinese}时脱鞋`,
  partOfSpeech: "短语",
  theme: "脱鞋",
  exampleThai: `ถ้าเจ้าของบ้านบอก ให้ถอดรองเท้าเมื่อเข้า${scene.thai}`,
  exampleRoman: `thaa jao-khaawng baan baawk, hai thaawt raawng-thaao meuua khao ${scene.roman}`,
  exampleChinese: `如果主人这样说，进入${scene.chinese}时要脱鞋。`,
  tag: "脱鞋",
}));

const queueRows = scenes.map((scene): Definition => ({
  thai: `ต่อคิวที่${scene.thai}`,
  id: `dtaaw-khiu-thii-${scene.id}`,
  roman: `dtaaw khiu thii ${scene.roman}`,
  chinese: `在${scene.chinese}排队`,
  partOfSpeech: "短语",
  theme: "排队",
  exampleThai: `ถ้ามีคนเยอะ เราต้องต่อคิวที่${scene.thai}`,
  exampleRoman: `thaa mii khon yoe, rao dtawng dtaaw khiu thii ${scene.roman}`,
  exampleChinese: `如果人多，我们要在${scene.chinese}排队。`,
  tag: "排队",
}));

const disturbRows = scenes.map((scene): Definition => ({
  thai: `ขอโทษที่รบกวนใน${scene.thai}`,
  id: `khaaw-thoot-thii-rop-guan-nai-${scene.id}`,
  roman: `khaaw-thoot thii rop-guan nai ${scene.roman}`,
  chinese: `不好意思在${scene.chinese}打扰了`,
  partOfSpeech: "短语",
  theme: "打扰",
  exampleThai: `ขอโทษที่รบกวนใน${scene.thai} ขอถามนิดหนึ่งได้ไหม`,
  exampleRoman: `khaaw-thoot thii rop-guan nai ${scene.roman}, khaaw thaam nit neung dai mai`,
  exampleChinese: `不好意思在${scene.chinese}打扰了，可以问一下吗？`,
  tag: "打扰",
}));

const callRows = scenes.map((scene): Definition => ({
  thai: `เรียกคนใน${scene.thai}อย่างสุภาพ`,
  id: `riiak-khon-nai-${scene.id}-yaang-su-phaap`,
  roman: `riiak khon nai ${scene.roman} yaang su-phaap`,
  chinese: `礼貌称呼${scene.chinese}里的人`,
  partOfSpeech: "短语",
  theme: "称呼",
  exampleThai: `ถ้าไม่สนิท ควรเรียกคนใน${scene.thai}อย่างสุภาพ`,
  exampleRoman: `thaa mai sa-nit, khuuan riiak khon nai ${scene.roman} yaang su-phaap`,
  exampleChinese: `如果不熟，应该礼貌称呼${scene.chinese}里的人。`,
  tag: "称呼",
}));

const giftRows = gifts.map((gift): Definition => ({
  thai: `นำ${gift.thai}ไปฝาก`,
  id: `nam-${gift.id}-bpai-faak`,
  roman: `nam ${gift.roman} bpai faak`,
  chinese: `带${gift.chinese}作为礼物/伴手礼`,
  partOfSpeech: "短语",
  theme: "送礼",
  exampleThai: `เวลาไปบ้านเพื่อน ฉันนำ${gift.thai}ไปฝาก`,
  exampleRoman: `wee-laa bpai baan pheuuan, chan nam ${gift.roman} bpai faak`,
  exampleChinese: `去朋友家时，我带${gift.chinese}作为礼物。`,
  tag: "送礼",
}));

const replyRows = gifts.map((gift): Definition => ({
  thai: `ขอบคุณสำหรับ${gift.thai}`,
  id: `khaawp-khun-sam-rap-${gift.id}`,
  roman: `khaawp khun sam-rap ${gift.roman}`,
  chinese: `谢谢${gift.chinese}`,
  partOfSpeech: "短语",
  theme: "客气回应",
  exampleThai: `ขอบคุณสำหรับ${gift.thai} เกรงใจมากเลย`,
  exampleRoman: `khaawp khun sam-rap ${gift.roman}, greeng-jai maak looei`,
  exampleChinese: `谢谢${gift.chinese}，太客气了。`,
  tag: "回应",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...visitRows,
  ...shoesRows,
  ...queueRows,
  ...disturbRows,
  ...callRows,
  ...giftRows,
  ...replyRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "基础社交礼节", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 社交礼节常用“ขอรบกวน、ขอโทษที่...、ไม่ต้องเกรงใจ、เรียก...ว่า、ถอดรองเท้า、ต่อคิว、ขอบคุณที่...”等礼貌表达。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于拜访、送礼、脱鞋、称呼、排队、打扰、不好意思、客气和礼貌回应。"],
    tags,
    sourceRefs: BASIC_SOCIAL_ETIQUETTE_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_SOCIAL_ETIQUETTE_01 = rows.map(toCandidate);
