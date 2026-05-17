export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "便利店" | "洗衣店" | "药店" | "维修店" | "营业时间" | "排队" | "评价服务" | "找最近地点";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Service = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };

const NEIGHBORHOOD_SERVICES_REVIEW_REFS = ["thai-frequency", "thai-a2-neighborhood-services-review-candidate"];

const services: readonly Service[] = [
  { thai: "ร้านสะดวกซื้อหน้าปากซอย", roman: "raan sa-duuak-seu naa bpaak saawy", chinese: "巷口便利店", id: "raan-sa-duuak-seu-naa-bpaak-saawy", theme: "便利店" },
  { thai: "ร้านสะดวกซื้อยี่สิบสี่ชั่วโมง", roman: "raan sa-duuak-seu yii-sip-sii chua-moong", chinese: "24 小时便利店", id: "raan-sa-duuak-seu-yii-sip-sii-chua-moong", theme: "便利店" },
  { thai: "ร้านซักผ้าหยอดเหรียญ", roman: "raan sak phaa yaawt riian", chinese: "投币洗衣店", id: "raan-sak-phaa-yaawt-riian", theme: "洗衣店" },
  { thai: "ร้านซักรีดใกล้บ้าน", roman: "raan sak-riit glai baan", chinese: "家附近的洗衣熨烫店", id: "raan-sak-riit-glai-baan", theme: "洗衣店" },
  { thai: "ร้านขายยาหัวมุม", roman: "raan khaai yaa hua mum", chinese: "街角药店", id: "raan-khaai-yaa-hua-mum", theme: "药店" },
  { thai: "ร้านขายยาที่เปิดดึก", roman: "raan khaai yaa thii bpoet deuk", chinese: "开到很晚的药店", id: "raan-khaai-yaa-thii-bpoet-deuk", theme: "药店" },
  { thai: "ร้านซ่อมมือถือ", roman: "raan saawm meuu-theuu", chinese: "手机维修店", id: "raan-saawm-meu-theuu", theme: "维修店" },
  { thai: "ร้านซ่อมรองเท้า", roman: "raan saawm raawng-thaao", chinese: "修鞋店", id: "raan-saawm-raawng-thaao", theme: "维修店" },
  { thai: "ร้านถ่ายเอกสาร", roman: "raan thaai eek-ga-saan", chinese: "复印店", id: "raan-thaai-eek-ga-saan", theme: "维修店" },
  { thai: "ร้านตัดผมใกล้ตลาด", roman: "raan dtat phom glai dta-laat", chinese: "市场附近理发店", id: "raan-dtat-phom-glai-dta-laat", theme: "评价服务" },
  { thai: "คลินิกเล็กแถวนี้", roman: "khli-nik lek thaaeo nii", chinese: "这附近的小诊所", id: "khli-nik-lek-thaaeo-nii", theme: "找最近地点" },
  { thai: "ธนาคารสาขาใกล้สุด", roman: "tha-naa-khaan saa-khaa glai sut", chinese: "最近的银行网点", id: "tha-naa-khaan-saa-khaa-glai-sut", theme: "找最近地点" },
  { thai: "ตู้เอทีเอ็มหน้าห้าง", roman: "dtuu ee-thii-em naa haang", chinese: "商场前的 ATM", id: "dtuu-ee-thii-em-naa-haang", theme: "找最近地点" },
  { thai: "ไปรษณีย์ในชุมชน", roman: "bprai-sa-nii nai chum-chon", chinese: "社区邮局", id: "bprai-sa-nii-nai-chum-chon", theme: "评价服务" },
  { thai: "ร้านล้างรถเล็กๆ", roman: "raan laang rot lek lek", chinese: "小洗车店", id: "raan-laang-rot-lek-lek", theme: "评价服务" },
  { thai: "ร้านซ่อมจักรยาน", roman: "raan saawm jak-gra-yaan", chinese: "自行车维修店", id: "raan-saawm-jak-gra-yaan", theme: "维修店" },
  { thai: "ร้านขายของใช้ในบ้าน", roman: "raan khaai khaawng-chai nai baan", chinese: "家居用品店", id: "raan-khaai-khaawng-chai-nai-baan", theme: "便利店" },
  { thai: "ร้านอาหารตามสั่งใกล้บ้าน", roman: "raan aa-haan dtaam-sang glai baan", chinese: "家附近现点现做小餐馆", id: "raan-aa-haan-dtaam-sang-glai-baan", theme: "评价服务" },
];

const directRows: readonly Definition[] = [
  { thai: "ร้านนี้เปิดถึงกี่โมง", id: "raan-nii-bpoet-theung-gii-moong", roman: "raan nii bpoet theung gii moong", chinese: "这家店开到几点", partOfSpeech: "短语", theme: "营业时间", exampleThai: "ขอโทษครับ ร้านนี้เปิดถึงกี่โมง", exampleRoman: "khaaw-thoot khrap, raan nii bpoet theung gii moong", exampleChinese: "不好意思，这家店开到几点？", tag: "营业时间" },
  { thai: "ต้องรอคิวนานไหม", id: "dtawng-raaw-khiu-naan-mai", roman: "dtawng raaw khiu naan mai", chinese: "需要排队等很久吗", partOfSpeech: "短语", theme: "排队", exampleThai: "วันนี้คนเยอะ ต้องรอคิวนานไหม", exampleRoman: "wan-nii khon yoe, dtawng raaw khiu naan mai", exampleChinese: "今天人多，需要排队等很久吗？", tag: "排队" },
  { thai: "บริการดีและพูดสุภาพ", id: "baaw-ri-gaan-dii-lae-phuut-su-phaap", roman: "baaw-ri-gaan dii lae phuut su-phaap", chinese: "服务好，说话也礼貌", partOfSpeech: "短语", theme: "评价服务", exampleThai: "ร้านนี้บริการดีและพูดสุภาพ ฉันชอบมาก", exampleRoman: "raan nii baaw-ri-gaan dii lae phuut su-phaap, chan chaawp maak", exampleChinese: "这家店服务好，说话也礼貌，我很喜欢。", tag: "评价" },
  { thai: "หาร้านที่ใกล้ที่สุด", id: "haa-raan-thii-glai-thii-sut", roman: "haa raan thii glai thii-sut", chinese: "找最近的店", partOfSpeech: "短语", theme: "找最近地点", exampleThai: "ฝนกำลังตก เราควรหาร้านที่ใกล้ที่สุด", exampleRoman: "fon gam-lang dtok, rao khuuan haa raan thii glai thii-sut", exampleChinese: "正在下雨，我们应该找最近的店。", tag: "找地点" },
  { thai: "ร้านนี้คนไม่เยอะ", id: "raan-nii-khon-mai-yoe", roman: "raan nii khon mai yoe", chinese: "这家店人不多", partOfSpeech: "短语", theme: "排队", exampleThai: "ไปร้านนี้เถอะ ร้านนี้คนไม่เยอะ", exampleRoman: "bpai raan nii thoe, raan nii khon mai yoe", exampleChinese: "去这家店吧，这家店人不多。", tag: "排队" },
  { thai: "เปิดทุกวันไหม", id: "bpoet-thuk-wan-mai", roman: "bpoet thuk wan mai", chinese: "每天都开吗", partOfSpeech: "短语", theme: "营业时间", exampleThai: "ร้านซักผ้านี้เปิดทุกวันไหม", exampleRoman: "raan sak phaa nii bpoet thuk wan mai", exampleChinese: "这家洗衣店每天都开吗？", tag: "营业时间" },
  { thai: "ราคาไม่แพงและทำเร็ว", id: "raa-khaa-mai-phaaeng-lae-tham-reo", roman: "raa-khaa mai phaaeng lae tham reo", chinese: "价格不贵而且做得快", partOfSpeech: "短语", theme: "评价服务", exampleThai: "ร้านซ่อมนี้ราคาไม่แพงและทำเร็ว", exampleRoman: "raan saawm nii raa-khaa mai phaaeng lae tham reo", exampleChinese: "这家维修店价格不贵而且做得快。", tag: "评价" },
  { thai: "ใกล้บ้านเดินไปได้", id: "glai-baan-doeen-bpai-dai", roman: "glai baan doeen bpai dai", chinese: "离家近，可以走过去", partOfSpeech: "短语", theme: "找最近地点", exampleThai: "ร้านขายยาใกล้บ้านเดินไปได้ ไม่ต้องเรียกรถ", exampleRoman: "raan khaai yaa glai baan doeen bpai dai, mai dtawng riiak rot", exampleChinese: "药店离家近，可以走过去，不用叫车。", tag: "附近" },
];

const nearestRows = services.map((service): Definition => ({
  thai: `หา${service.thai}ที่ใกล้ที่สุด`,
  id: `haa-${service.id}-thii-glai-thii-sut`,
  roman: `haa ${service.roman} thii glai thii-sut`,
  chinese: `找最近的${service.chinese}`,
  partOfSpeech: "短语",
  theme: "找最近地点",
  exampleThai: `ฉันต้องการหา${service.thai}ที่ใกล้ที่สุดตอนนี้`,
  exampleRoman: `chan dtawng-gaan haa ${service.roman} thii glai thii-sut dtaawn nii`,
  exampleChinese: `我现在想找最近的${service.chinese}。`,
  tag: "找最近",
}));

const hoursRows = services.map((service): Definition => ({
  thai: `${service.thai}เปิดกี่โมง`,
  id: `${service.id}-bpoet-gii-moong`,
  roman: `${service.roman} bpoet gii moong`,
  chinese: `${service.chinese}几点开门`,
  partOfSpeech: "短语",
  theme: "营业时间",
  exampleThai: `พรุ่งนี้${service.thai}เปิดกี่โมง คุณรู้ไหม`,
  exampleRoman: `phrung-nii ${service.roman} bpoet gii moong, khun ruu mai`,
  exampleChinese: `明天${service.chinese}几点开门，你知道吗？`,
  tag: "营业时间",
}));

const queueRows = services.map((service): Definition => ({
  thai: `${service.thai}ต้องต่อคิว`,
  id: `${service.id}-dtawng-dtaaw-khiu`,
  roman: `${service.roman} dtawng dtaaw khiu`,
  chinese: `${service.chinese}需要排队`,
  partOfSpeech: "短语",
  theme: "排队",
  exampleThai: `ช่วงเย็น${service.thai}ต้องต่อคิว เพราะคนเยอะ`,
  exampleRoman: `chuuang yen ${service.roman} dtawng dtaaw khiu phraw khon yoe`,
  exampleChinese: `傍晚${service.chinese}需要排队，因为人多。`,
  tag: "排队",
}));

const reviewRows = services.map((service): Definition => ({
  thai: `${service.thai}บริการดีไหม`,
  id: `${service.id}-baaw-ri-gaan-dii-mai`,
  roman: `${service.roman} baaw-ri-gaan dii mai`,
  chinese: `${service.chinese}服务好吗`,
  partOfSpeech: "短语",
  theme: "评价服务",
  exampleThai: `ฉันยังไม่เคยไป ${service.thai}บริการดีไหม`,
  exampleRoman: `chan yang mai khooei bpai, ${service.roman} baaw-ri-gaan dii mai`,
  exampleChinese: `我还没去过，${service.chinese}服务好吗？`,
  tag: "评价",
}));

const useRows = services.map((service): Definition => ({
  thai: `ไปใช้บริการที่${service.thai}`,
  id: `bpai-chai-baaw-ri-gaan-thii-${service.id}`,
  roman: `bpai chai baaw-ri-gaan thii ${service.roman}`,
  chinese: `去${service.chinese}使用服务`,
  partOfSpeech: "短语",
  theme: service.theme,
  exampleThai: `ถ้ามีเวลา ฉันจะไปใช้บริการที่${service.thai}`,
  exampleRoman: `thaa mii wee-laa, chan ja bpai chai baaw-ri-gaan thii ${service.roman}`,
  exampleChinese: `如果有时间，我会去${service.chinese}使用服务。`,
  tag: "服务",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...nearestRows,
  ...hoursRows,
  ...queueRows,
  ...reviewRows,
  ...useRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "附近服务评价", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 附近服务场景常用“หา...ที่ใกล้ที่สุด、เปิดกี่โมง、ต้องต่อคิว、บริการดีไหม、ไปใช้บริการที่...”等句框。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于便利店、洗衣店、药店、维修店、营业时间、排队、评价服务和找最近地点。"],
    tags,
    sourceRefs: NEIGHBORHOOD_SERVICES_REVIEW_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_NEIGHBORHOOD_SERVICES_REVIEW_01 = rows.map(toCandidate);
