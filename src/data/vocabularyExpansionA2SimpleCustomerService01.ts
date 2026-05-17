export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "询问需求" | "确认问题" | "稍等" | "处理好了" | "换货退款" | "谢谢反馈";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Item = { thai: string; roman: string; chinese: string; id: string };

const SIMPLE_CUSTOMER_SERVICE_REFS = ["thai-frequency", "thai-a2-simple-customer-service-candidate"];

const needs: readonly Item[] = [
  { thai: "เปลี่ยนสินค้า", roman: "bpliian sin-khaa", chinese: "换商品", id: "bpliian-sin-khaa" },
  { thai: "คืนเงิน", roman: "kheuun ngoen", chinese: "退款", id: "kheuun-ngoen" },
  { thai: "ถามราคา", roman: "thaam raa-khaa", chinese: "询问价格", id: "thaam-raa-khaa" },
  { thai: "ตรวจสถานะของ", roman: "dtruaat sa-thaa-na khaawng", chinese: "查询商品状态", id: "dtruaat-sa-thaa-na-khaawng" },
  { thai: "แก้ที่อยู่", roman: "gaae thii-yuu", chinese: "修改地址", id: "gaae-thii-yuu" },
  { thai: "ขอใบเสร็จใหม่", roman: "khaaw bai-set mai", chinese: "要新收据", id: "khaaw-bai-set-mai" },
  { thai: "ยกเลิกคำสั่งซื้อ", roman: "yok-loek kham-sang-seu", chinese: "取消订单", id: "yok-loek-kham-sang-seu" },
  { thai: "แจ้งของเสีย", roman: "jaaeng khaawng siia", chinese: "报告东西坏了", id: "jaaeng-khaawng-siia" },
  { thai: "ถามเวลาส่งของ", roman: "thaam wee-laa song khaawng", chinese: "询问送货时间", id: "thaam-wee-laa-song-khaawng" },
  { thai: "ขอถุงเพิ่ม", roman: "khaaw thung phoem", chinese: "多要袋子", id: "khaaw-thung-phoem" },
  { thai: "เปลี่ยนสีสินค้า", roman: "bpliian sii sin-khaa", chinese: "更换商品颜色", id: "bpliian-sii-sin-khaa" },
  { thai: "เปลี่ยนไซซ์", roman: "bpliian sai", chinese: "换尺码", id: "bpliian-sai" },
  { thai: "ถามวิธีใช้", roman: "thaam wi-thii chai", chinese: "询问使用方法", id: "thaam-wi-thii-chai" },
  { thai: "ขอคุยกับพนักงาน", roman: "khaaw khui gap pha-nak-ngaan", chinese: "想和工作人员谈", id: "khaaw-khui-gap-pha-nak-ngaan" },
  { thai: "ตรวจยอดเงิน", roman: "dtruaat yaawt ngoen", chinese: "核对金额", id: "dtruaat-yaawt-ngoen" },
  { thai: "แจ้งปัญหาการจ่ายเงิน", roman: "jaaeng bpan-haa gaan jaai ngoen", chinese: "说明付款问题", id: "jaaeng-bpan-haa-gaan-jaai-ngoen" },
];

const problems: readonly Item[] = [
  { thai: "สินค้าเสีย", roman: "sin-khaa siia", chinese: "商品坏了", id: "sin-khaa-siia" },
  { thai: "ไซซ์ไม่พอดี", roman: "sai mai phaaw-dii", chinese: "尺码不合适", id: "sai-mai-phaaw-dii" },
  { thai: "สีไม่ตรง", roman: "sii mai dtrong", chinese: "颜色不对", id: "sii-mai-dtrong" },
  { thai: "ได้รับของช้า", roman: "dai rap khaawng chaa", chinese: "收到货晚", id: "dai-rap-khaawng-chaa" },
  { thai: "คิดเงินผิด", roman: "khit ngoen phit", chinese: "算错钱", id: "khit-ngoen-phit" },
  { thai: "ไม่มีใบเสร็จ", roman: "mai mii bai-set", chinese: "没有收据", id: "mai-mii-bai-set" },
  { thai: "ใช้แอปไม่ได้", roman: "chai aaep mai dai", chinese: "应用不能用", id: "chai-aaep-mai-dai" },
  { thai: "พนักงานตอบช้า", roman: "pha-nak-ngaan dtaawp chaa", chinese: "工作人员回复慢", id: "pha-nak-ngaan-dtaawp-chaa" },
  { thai: "ของมาไม่ครบ", roman: "khaawng maa mai khrop", chinese: "东西没到齐", id: "khaawng-maa-mai-khrop" },
  { thai: "รหัสส่วนลดใช้ไม่ได้", roman: "ra-hat suan-lot chai mai dai", chinese: "优惠码不能用", id: "ra-hat-suan-lot-chai-mai-dai" },
  { thai: "ที่อยู่ผิด", roman: "thii-yuu phit", chinese: "地址错了", id: "thii-yuu-phit" },
  { thai: "เบอร์โทรผิด", roman: "booe thoo phit", chinese: "电话号码错了", id: "booe-thoo-phit" },
];

const directRows: readonly Definition[] = [
  { thai: "ต้องการให้ช่วยเรื่องอะไร", id: "dtawng-gaan-hai-chuai-reuuang-a-rai", roman: "dtawng-gaan hai chuai reuuang a-rai", chinese: "需要我帮您什么", partOfSpeech: "短语", theme: "询问需求", exampleThai: "สวัสดีค่ะ ต้องการให้ช่วยเรื่องอะไรคะ", exampleRoman: "sa-wat-dii kha, dtawng-gaan hai chuai reuuang a-rai kha", exampleChinese: "您好，需要我帮您什么？", tag: "询问需求" },
  { thai: "ขอเช็กข้อมูลก่อนนะคะ", id: "khaaw-chek-khaaw-muun-gaawn-na-kha", roman: "khaaw chek khaaw-muun gaawn na kha", chinese: "请让我先查一下信息", partOfSpeech: "短语", theme: "稍等", exampleThai: "ขอเช็กข้อมูลก่อนนะคะ รอสักครู่ค่ะ", exampleRoman: "khaaw chek khaaw-muun gaawn na kha, raaw sak khruu kha", exampleChinese: "请让我先查一下信息，请稍等。", tag: "稍等" },
  { thai: "ปัญหานี้เกิดเมื่อไร", id: "bpan-haa-nii-goet-meuua-rai", roman: "bpan-haa nii goet meuua-rai", chinese: "这个问题是什么时候发生的", partOfSpeech: "短语", theme: "确认问题", exampleThai: "ขอถามเพิ่ม ปัญหานี้เกิดเมื่อไรคะ", exampleRoman: "khaaw thaam phoem, bpan-haa nii goet meuua-rai kha", exampleChinese: "我想再问一下，这个问题是什么时候发生的？", tag: "确认" },
  { thai: "จัดการให้เรียบร้อยแล้ว", id: "jat-gaan-hai-riiap-raawy-laaeo", roman: "jat-gaan hai riiap-raawy laaeo", chinese: "已经为您处理好了", partOfSpeech: "短语", theme: "处理好了", exampleThai: "ตอนนี้จัดการให้เรียบร้อยแล้วค่ะ", exampleRoman: "dtaawn nii jat-gaan hai riiap-raawy laaeo kha", exampleChinese: "现在已经为您处理好了。", tag: "处理完成" },
  { thai: "สามารถเปลี่ยนหรือคืนได้", id: "saa-maat-bpliian-reuu-kheuun-dai", roman: "saa-maat bpliian reuu kheuun dai", chinese: "可以换或退", partOfSpeech: "短语", theme: "换货退款", exampleThai: "ถ้ามีใบเสร็จ สามารถเปลี่ยนหรือคืนได้ค่ะ", exampleRoman: "thaa mii bai-set, saa-maat bpliian reuu kheuun dai kha", exampleChinese: "如果有收据，可以换或退。", tag: "换退" },
  { thai: "ขอบคุณสำหรับความคิดเห็น", id: "khaawp-khun-sam-rap-khwaam-khit-hen", roman: "khaawp khun sam-rap khwaam khit hen", chinese: "谢谢您的意见", partOfSpeech: "短语", theme: "谢谢反馈", exampleThai: "ขอบคุณสำหรับความคิดเห็น เราจะนำไปปรับปรุงค่ะ", exampleRoman: "khaawp khun sam-rap khwaam khit hen, rao ja nam bpai bprap-bprung kha", exampleChinese: "谢谢您的意见，我们会拿去改进。", tag: "反馈" },
  { thai: "รอสักครู่ได้ไหมคะ", id: "raaw-sak-khruu-dai-mai-kha", roman: "raaw sak khruu dai mai kha", chinese: "可以稍等一下吗", partOfSpeech: "短语", theme: "稍等", exampleThai: "ระบบช้านิดหน่อย รอสักครู่ได้ไหมคะ", exampleRoman: "ra-bop chaa nit naawy, raaw sak khruu dai mai kha", exampleChinese: "系统有点慢，可以稍等一下吗？", tag: "稍等" },
  { thai: "ขออภัยในความไม่สะดวก", id: "khaaw-a-phai-nai-khwaam-mai-sa-duuak", roman: "khaaw a-phai nai khwaam mai sa-duuak", chinese: "对不便表示抱歉", partOfSpeech: "短语", theme: "确认问题", exampleThai: "ขออภัยในความไม่สะดวก เราจะรีบช่วยดูให้ค่ะ", exampleRoman: "khaaw a-phai nai khwaam mai sa-duuak, rao ja riip chuai duu hai kha", exampleChinese: "对不便表示抱歉，我们会尽快帮您查看。", tag: "道歉" },
  { thai: "ขอชื่อและเบอร์โทรหน่อยค่ะ", id: "khaaw-cheuu-lae-booe-thoo-naawy-kha", roman: "khaaw cheuu lae booe thoo naawy kha", chinese: "请提供姓名和电话", partOfSpeech: "短语", theme: "确认问题", exampleThai: "เพื่อเช็กข้อมูล ขอชื่อและเบอร์โทรหน่อยค่ะ", exampleRoman: "pheuua chek khaaw-muun, khaaw cheuu lae booe thoo naawy kha", exampleChinese: "为了查询信息，请提供姓名和电话。", tag: "确认信息" },
  { thai: "ขอเลขคำสั่งซื้อด้วยค่ะ", id: "khaaw-leek-kham-sang-seu-duai-kha", roman: "khaaw leek kham-sang-seu duai kha", chinese: "也请提供订单号", partOfSpeech: "短语", theme: "确认问题", exampleThai: "ถ้าจะตรวจสถานะ ขอเลขคำสั่งซื้อด้วยค่ะ", exampleRoman: "thaa ja dtruaat sa-thaa-na, khaaw leek kham-sang-seu duai kha", exampleChinese: "如果要查询状态，也请提供订单号。", tag: "确认信息" },
  { thai: "ดำเนินการให้แล้วค่ะ", id: "dam-noeen-gaan-hai-laaeo-kha", roman: "dam-noeen gaan hai laaeo kha", chinese: "已经为您办理了", partOfSpeech: "短语", theme: "处理好了", exampleThai: "เรื่องเปลี่ยนที่อยู่ ดำเนินการให้แล้วค่ะ", exampleRoman: "reuuang bpliian thii-yuu, dam-noeen gaan hai laaeo kha", exampleChinese: "更改地址这件事，已经为您办理了。", tag: "处理完成" },
  { thai: "ยินดีรับฟังเพิ่มเติมค่ะ", id: "yin-dii-rap-fang-phoem-dtoem-kha", roman: "yin-dii rap fang phoem-dtoem kha", chinese: "愿意继续听取更多反馈", partOfSpeech: "短语", theme: "谢谢反馈", exampleThai: "ถ้ายังมีข้อเสนอแนะ ยินดีรับฟังเพิ่มเติมค่ะ", exampleRoman: "thaa yang mii khaaw sa-nooe-nae, yin-dii rap fang phoem-dtoem kha", exampleChinese: "如果还有建议，我们愿意继续听取更多反馈。", tag: "反馈" },
];

const askRows = needs.map((need): Definition => ({
  thai: `ต้องการ${need.thai}ใช่ไหม`,
  id: `dtawng-gaan-${need.id}-chai-mai`,
  roman: `dtawng-gaan ${need.roman} chai mai`,
  chinese: `您是需要${need.chinese}对吗`,
  partOfSpeech: "短语",
  theme: "询问需求",
  exampleThai: `ขอทวนอีกครั้ง คุณต้องการ${need.thai}ใช่ไหมคะ`,
  exampleRoman: `khaaw thuuan iik khrang, khun dtawng-gaan ${need.roman} chai mai kha`,
  exampleChinese: `我再确认一次，您是需要${need.chinese}对吗？`,
  tag: "询问需求",
}));

const waitRows = needs.map((need): Definition => ({
  thai: `รอสักครู่เพื่อ${need.thai}`,
  id: `raaw-sak-khruu-pheuua-${need.id}`,
  roman: `raaw sak khruu pheuua ${need.roman}`,
  chinese: `请稍等以便处理${need.chinese}`,
  partOfSpeech: "短语",
  theme: "稍等",
  exampleThai: `กรุณารอสักครู่เพื่อ${need.thai}นะคะ`,
  exampleRoman: `ga-ru-naa raaw sak khruu pheuua ${need.roman} na kha`,
  exampleChinese: `请稍等，以便处理${need.chinese}。`,
  tag: "稍等",
}));

const doneRows = needs.map((need): Definition => ({
  thai: `${need.thai}เรียบร้อยแล้ว`,
  id: `${need.id}-riiap-raawy-laaeo`,
  roman: `${need.roman} riiap-raawy laaeo`,
  chinese: `${need.chinese}已经处理好了`,
  partOfSpeech: "短语",
  theme: "处理好了",
  exampleThai: `${need.thai}เรียบร้อยแล้ว มีอะไรให้ช่วยอีกไหมคะ`,
  exampleRoman: `${need.roman} riiap-raawy laaeo, mii a-rai hai chuai iik mai kha`,
  exampleChinese: `${need.chinese}已经处理好了，还有什么需要帮忙的吗？`,
  tag: "处理完成",
}));

const problemRows = problems.map((problem): Definition => ({
  thai: `ขอยืนยันว่า${problem.thai}`,
  id: `khaaw-yeuun-yan-waa-${problem.id}`,
  roman: `khaaw yeuun-yan waa ${problem.roman}`,
  chinese: `请确认是${problem.chinese}`,
  partOfSpeech: "短语",
  theme: "确认问题",
  exampleThai: `ขอยืนยันว่า${problem.thai} ถูกต้องไหมคะ`,
  exampleRoman: `khaaw yeuun-yan waa ${problem.roman} thuuk-dtawng mai kha`,
  exampleChinese: `请确认是${problem.chinese}，对吗？`,
  tag: "确认问题",
}));

const exchangeRows = problems.map((problem): Definition => ({
  thai: `ถ้า${problem.thai}สามารถเปลี่ยนได้`,
  id: `thaa-${problem.id}-saa-maat-bpliian-dai`,
  roman: `thaa ${problem.roman} saa-maat bpliian dai`,
  chinese: `如果${problem.chinese}，可以更换`,
  partOfSpeech: "短语",
  theme: "换货退款",
  exampleThai: `ถ้า${problem.thai}สามารถเปลี่ยนได้ภายในเจ็ดวัน`,
  exampleRoman: `thaa ${problem.roman} saa-maat bpliian dai phaai-nai jet wan`,
  exampleChinese: `如果${problem.chinese}，可以在七天内更换。`,
  tag: "换货",
}));

const feedbackRows = problems.map((problem): Definition => ({
  thai: `ขอบคุณที่แจ้งเรื่อง${problem.thai}`,
  id: `khaawp-khun-thii-jaaeng-reuuang-${problem.id}`,
  roman: `khaawp khun thii jaaeng reuuang ${problem.roman}`,
  chinese: `谢谢您反馈${problem.chinese}的事`,
  partOfSpeech: "短语",
  theme: "谢谢反馈",
  exampleThai: `ขอบคุณที่แจ้งเรื่อง${problem.thai} เราจะตรวจสอบให้ค่ะ`,
  exampleRoman: `khaawp khun thii jaaeng reuuang ${problem.roman}, rao ja dtruaat-saawp hai kha`,
  exampleChinese: `谢谢您反馈${problem.chinese}的事，我们会帮您检查。`,
  tag: "反馈",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...askRows,
  ...waitRows,
  ...doneRows,
  ...problemRows,
  ...exchangeRows,
  ...feedbackRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "客服基础", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 客服基础常用“ต้องการ...ใช่ไหม、รอสักครู่、เรียบร้อยแล้ว、ขอยืนยันว่า、สามารถเปลี่ยนได้、ขอบคุณที่แจ้ง...”这些温和句框。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于询问需求、确认问题、请稍等、处理好了、换货退款和谢谢反馈等基础客服场景。"],
    tags,
    sourceRefs: SIMPLE_CUSTOMER_SERVICE_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SIMPLE_CUSTOMER_SERVICE_01 = rows.map(toCandidate);
