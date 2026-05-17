export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "点餐" | "换房" | "退票" | "投诉" | "付款" | "确认细节";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Scene = { thai: string; roman: string; chinese: string; id: string };

const FOOD_TRAVEL_SERVICE_REVIEW_REFS = ["thai-frequency", "thai-a2-food-travel-service-review-candidate"];

const scenes: readonly Scene[] = [
  { thai: "ร้านอาหารในโรงแรม", roman: "raan aa-haan nai roong-raaem", chinese: "酒店里的餐厅", id: "raan-aa-haan-nai-roong-raaem" },
  { thai: "ร้านอาหารใกล้สถานี", roman: "raan aa-haan glai sa-thaa-nii", chinese: "车站附近的餐厅", id: "raan-aa-haan-glai-sa-thaa-nii" },
  { thai: "คาเฟ่หน้าที่พัก", roman: "khaa-fee naa thii-phak", chinese: "住处前的咖啡馆", id: "khaa-fee-naa-thii-phak" },
  { thai: "เคาน์เตอร์โรงแรม", roman: "khao-dtooe roong-raaem", chinese: "酒店前台", id: "khao-dtooe-roong-raaem" },
  { thai: "ห้องพักชั้นสาม", roman: "haawng phak chan saam", chinese: "三楼房间", id: "haawng-phak-chan-saam" },
  { thai: "ตั๋วรถบัสรอบเช้า", roman: "dtuaa rot-bas raawp chaao", chinese: "早班巴士票", id: "dtuaa-rot-bas-raawp-chaao" },
  { thai: "ตั๋วเรือเที่ยวเดียว", roman: "dtuaa reuua thiaao diaao", chinese: "单程船票", id: "dtuaa-reuua-thiaao-diaao" },
  { thai: "ตั๋วเข้าพิพิธภัณฑ์", roman: "dtuaa khao phi-phit-tha-phan", chinese: "博物馆门票", id: "dtuaa-khao-phi-phit-tha-phan" },
  { thai: "บิลค่าอาหาร", roman: "bin khaa aa-haan", chinese: "餐费账单", id: "bin-khaa-aa-haan" },
  { thai: "ค่าห้องเมื่อคืน", roman: "khaa haawng meuua-kheuun", chinese: "昨晚房费", id: "khaa-haawng-meuua-kheuun" },
  { thai: "ค่ารถไปสนามบิน", roman: "khaa rot bpai sa-naam-bin", chinese: "去机场的车费", id: "khaa-rot-bpai-sa-naam-bin" },
  { thai: "เมนูอาหารเช้า", roman: "mee-nuu aa-haan chaao", chinese: "早餐菜单", id: "mee-nuu-aa-haan-chaao" },
  { thai: "อาหารที่สั่งไว้", roman: "aa-haan thii sang wai", chinese: "点好的菜", id: "aa-haan-thii-sang-wai" },
  { thai: "ห้องที่จองไว้", roman: "haawng thii jaawng wai", chinese: "预订好的房间", id: "haawng-thii-jaawng-wai" },
  { thai: "บริการรับส่ง", roman: "baaw-ri-gaan rap song", chinese: "接送服务", id: "baaw-ri-gaan-rap-song" },
  { thai: "รายละเอียดในใบจอง", roman: "raai-la-iiat nai bai jaawng", chinese: "预订单里的细节", id: "raai-la-iiat-nai-bai-jaawng" },
];

const directRows: readonly Definition[] = [
  { thai: "ขอทวนรายการอาหารอีกครั้ง", id: "khaaw-thuuan-raai-gaan-aa-haan-iik-khrang", roman: "khaaw thuuan raai-gaan aa-haan iik khrang", chinese: "请再确认一次点餐内容", partOfSpeech: "短语", theme: "点餐", exampleThai: "ก่อนคิดเงิน ขอทวนรายการอาหารอีกครั้งได้ไหม", exampleRoman: "gaawn khit ngoen, khaaw thuuan raai-gaan aa-haan iik khrang dai mai", exampleChinese: "结账前，可以请再确认一次点餐内容吗？", tag: "点餐复盘" },
  { thai: "ขอเปลี่ยนห้องที่เงียบกว่า", id: "khaaw-bpliian-haawng-thii-ngiiap-gwaa", roman: "khaaw bpliian haawng thii ngiiap gwaa", chinese: "想换一间更安静的房", partOfSpeech: "短语", theme: "换房", exampleThai: "ห้องนี้เสียงดัง ขอเปลี่ยนห้องที่เงียบกว่าได้ไหม", exampleRoman: "haawng nii siiang dang, khaaw bpliian haawng thii ngiiap gwaa dai mai", exampleChinese: "这个房间很吵，可以换一间更安静的吗？", tag: "换房" },
  { thai: "ขอคืนตั๋วรอบนี้", id: "khaaw-kheuun-dtuaa-raawp-nii", roman: "khaaw kheuun dtuaa raawp nii", chinese: "想退这一班的票", partOfSpeech: "短语", theme: "退票", exampleThai: "แผนเปลี่ยนแล้ว ขอคืนตั๋วรอบนี้ได้ไหม", exampleRoman: "phaaen bpliian laaeo, khaaw kheuun dtuaa raawp nii dai mai", exampleChinese: "计划变了，可以退这一班的票吗？", tag: "退票" },
  { thai: "ขอแจ้งปัญหาเล็กน้อย", id: "khaaw-jaaeng-bpan-haa-lek-naawy", roman: "khaaw jaaeng bpan-haa lek naawy", chinese: "想反映一个小问题", partOfSpeech: "短语", theme: "投诉", exampleThai: "ขอโทษค่ะ ขอแจ้งปัญหาเล็กน้อยเกี่ยวกับห้องพัก", exampleRoman: "khaaw-thoot kha, khaaw jaaeng bpan-haa lek naawy giaao gap haawng phak", exampleChinese: "不好意思，我想反映一个关于房间的小问题。", tag: "投诉" },
  { thai: "จ่ายแยกกับค่าห้องได้ไหม", id: "jaai-yaaek-gap-khaa-haawng-dai-mai", roman: "jaai yaaek gap khaa haawng dai mai", chinese: "可以和房费分开付吗", partOfSpeech: "短语", theme: "付款", exampleThai: "ค่าอาหารนี้จ่ายแยกกับค่าห้องได้ไหม", exampleRoman: "khaa aa-haan nii jaai yaaek gap khaa haawng dai mai", exampleChinese: "这笔餐费可以和房费分开付吗？", tag: "付款" },
  { thai: "ขอยืนยันรายละเอียดก่อนจ่าย", id: "khaaw-yeuun-yan-raai-la-iiat-gaawn-jaai", roman: "khaaw yeuun-yan raai-la-iiat gaawn jaai", chinese: "付款前想确认细节", partOfSpeech: "短语", theme: "确认细节", exampleThai: "ยอดเงินดูแปลก ขอยืนยันรายละเอียดก่อนจ่าย", exampleRoman: "yaawt ngoen duu bplaaek, khaaw yeuun-yan raai-la-iiat gaawn jaai", exampleChinese: "金额看起来有点奇怪，付款前想确认细节。", tag: "确认" },
  { thai: "บริการโดยรวมโอเค", id: "baaw-ri-gaan-dooi-ruam-oo-khee", roman: "baaw-ri-gaan dooi-ruam oo-khee", chinese: "整体服务还可以", partOfSpeech: "短语", theme: "投诉", exampleThai: "บริการโดยรวมโอเค แต่ห้องน้ำมีกลิ่นนิดหน่อย", exampleRoman: "baaw-ri-gaan dooi-ruam oo-khee, dtaae haawng naam mii glin nit naawy", exampleChinese: "整体服务还可以，但洗手间有点味道。", tag: "复盘评价" },
  { thai: "รอบนี้รายละเอียดตรงกัน", id: "raawp-nii-raai-la-iiat-dtrong-gan", roman: "raawp nii raai-la-iiat dtrong gan", chinese: "这次细节一致", partOfSpeech: "短语", theme: "确认细节", exampleThai: "เราตรวจแล้ว รอบนี้รายละเอียดตรงกัน", exampleRoman: "rao dtruaat laaeo, raawp nii raai-la-iiat dtrong gan", exampleChinese: "我们检查过了，这次细节一致。", tag: "确认" },
];

const orderRows = scenes.map((scene): Definition => ({
  thai: `ทวนออร์เดอร์ที่${scene.thai}`,
  id: `thuuan-aaw-dooe-thii-${scene.id}`,
  roman: `thuuan aaw-dooe thii ${scene.roman}`,
  chinese: `在${scene.chinese}确认点单`,
  partOfSpeech: "短语",
  theme: "点餐",
  exampleThai: `ก่อนจ่ายเงิน เราทวนออร์เดอร์ที่${scene.thai}`,
  exampleRoman: `gaawn jaai ngoen, rao thuuan aaw-dooe thii ${scene.roman}`,
  exampleChinese: `付款前，我们在${scene.chinese}确认点单。`,
  tag: "点餐",
}));

const roomRows = scenes.map((scene): Definition => ({
  thai: `ขอเปลี่ยนจาก${scene.thai}`,
  id: `khaaw-bpliian-jaak-${scene.id}`,
  roman: `khaaw bpliian jaak ${scene.roman}`,
  chinese: `想从${scene.chinese}更换`,
  partOfSpeech: "短语",
  theme: "换房",
  exampleThai: `ถ้าไม่สะดวก เราขอเปลี่ยนจาก${scene.thai}ได้ไหม`,
  exampleRoman: `thaa mai sa-duuak, rao khaaw bpliian jaak ${scene.roman} dai mai`,
  exampleChinese: `如果不方便，我们可以从${scene.chinese}更换吗？`,
  tag: "换房",
}));

const ticketRows = scenes.map((scene): Definition => ({
  thai: `สอบถามการคืนเงินของ${scene.thai}`,
  id: `saawp-thaam-gaan-kheuun-ngoen-khaawng-${scene.id}`,
  roman: `saawp-thaam gaan kheuun ngoen khaawng ${scene.roman}`,
  chinese: `询问${scene.chinese}的退款`,
  partOfSpeech: "短语",
  theme: "退票",
  exampleThai: `แผนเปลี่ยนแล้ว เราสอบถามการคืนเงินของ${scene.thai}`,
  exampleRoman: `phaaen bpliian laaeo, rao saawp-thaam gaan kheuun ngoen khaawng ${scene.roman}`,
  exampleChinese: `计划变了，我们询问${scene.chinese}的退款。`,
  tag: "退票退款",
}));

const complaintRows = scenes.map((scene): Definition => ({
  thai: `แจ้งปัญหาเรื่อง${scene.thai}`,
  id: `jaaeng-bpan-haa-reuuang-${scene.id}`,
  roman: `jaaeng bpan-haa reuuang ${scene.roman}`,
  chinese: `反映${scene.chinese}的问题`,
  partOfSpeech: "短语",
  theme: "投诉",
  exampleThai: `ถ้าไม่โอเค ควรแจ้งปัญหาเรื่อง${scene.thai}อย่างสุภาพ`,
  exampleRoman: `thaa mai oo-khee, khuuan jaaeng bpan-haa reuuang ${scene.roman} yaang su-phaap`,
  exampleChinese: `如果不满意，应该礼貌地反映${scene.chinese}的问题。`,
  tag: "投诉",
}));

const payRows = scenes.map((scene): Definition => ({
  thai: `จ่ายเงินสำหรับ${scene.thai}`,
  id: `jaai-ngoen-sam-rap-${scene.id}`,
  roman: `jaai ngoen sam-rap ${scene.roman}`,
  chinese: `为${scene.chinese}付款`,
  partOfSpeech: "短语",
  theme: "付款",
  exampleThai: `ก่อนออกเดินทาง เราจ่ายเงินสำหรับ${scene.thai}เรียบร้อยแล้ว`,
  exampleRoman: `gaawn aawk doeen-thaang, rao jaai ngoen sam-rap ${scene.roman} riiap-raawy laaeo`,
  exampleChinese: `出发前，我们已经为${scene.chinese}付好款了。`,
  tag: "付款",
}));

const confirmRows = scenes.map((scene): Definition => ({
  thai: `ยืนยันรายละเอียดของ${scene.thai}`,
  id: `yeuun-yan-raai-la-iiat-khaawng-${scene.id}`,
  roman: `yeuun-yan raai-la-iiat khaawng ${scene.roman}`,
  chinese: `确认${scene.chinese}的细节`,
  partOfSpeech: "短语",
  theme: "确认细节",
  exampleThai: `ก่อนตกลง เราควรยืนยันรายละเอียดของ${scene.thai}`,
  exampleRoman: `gaawn dtok-long, rao khuuan yeuun-yan raai-la-iiat khaawng ${scene.roman}`,
  exampleChinese: `同意前，我们应该确认${scene.chinese}的细节。`,
  tag: "确认",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...orderRows,
  ...roomRows,
  ...ticketRows,
  ...complaintRows,
  ...payRows,
  ...confirmRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "餐旅服务复盘", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 餐饮、旅行、服务交叉复盘常用“ทวนออร์เดอร์、ขอเปลี่ยน、สอบถามการคืนเงิน、แจ้งปัญหา、จ่ายเงิน、ยืนยันรายละเอียด”等表达。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于点餐、换房、退票、投诉、付款和确认细节等常见餐旅服务复盘。"],
    tags,
    sourceRefs: FOOD_TRAVEL_SERVICE_REVIEW_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_FOOD_TRAVEL_SERVICE_REVIEW_01 = rows.map(toCandidate);
