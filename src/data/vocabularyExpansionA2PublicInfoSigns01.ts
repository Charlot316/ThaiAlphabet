export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语" | "句型";
export type VocabularyExpansionLevel = "a2";
export type VocabularyExpansionTheme = "公共标识" | "通知" | "开放关闭" | "入口出口" | "禁止允许" | "排队" | "收费免费" | "注意事项" | "简单公告";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";
export type VocabularyExpansionRelated = { thai: string; roman: string; chinese: string; notesZh?: string };
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionComparison = { kind: VocabularyExpansionComparisonKind; target: VocabularyExpansionRelated; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[] };
export type VocabularyExpansionCandidate = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: VocabularyExpansionLevel; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[]; sourceRefs: string[]; reviewStatus: VocabularyExpansionReviewStatus };
type Row = readonly [string, string, string, string, VocabularyExpansionPartOfSpeech, VocabularyExpansionTheme];
const SIGNS_REFS = ["worker-a-a2-public-info-signs", "basic-thai-public-signs"];

const rows: Row[] = [
  ["bpaai", "ป้าย", "bpaai", "标识；牌子", "名词", "公共标识"],
  ["bpaai-bok-thaang", "ป้ายบอกทาง", "bpaai baawk thaang", "指路牌", "名词", "公共标识"],
  ["bpaai-dteuan", "ป้ายเตือน", "bpaai dteuan", "警示牌", "名词", "公共标识"],
  ["bpaai-haam", "ป้ายห้าม", "bpaai haam", "禁止标识", "名词", "公共标识"],
  ["bpaai-a-nu-yaat", "ป้ายอนุญาต", "bpaai a-nu-yaat", "允许标识", "名词", "公共标识"],
  ["bpaai-thaang-aawk", "ป้ายทางออก", "bpaai thaang aawk", "出口标识", "名词", "公共标识"],
  ["bpaai-thaang-khao", "ป้ายทางเข้า", "bpaai thaang khao", "入口标识", "名词", "公共标识"],
  ["bpaai-haawng-naam", "ป้ายห้องน้ำ", "bpaai haawng naam", "洗手间标识", "名词", "公共标识"],
  ["bpaai-rot-mee", "ป้ายรถเมล์", "bpaai rot mee", "公交站牌", "名词", "公共标识"],
  ["bpaai-raa-khaa", "ป้ายราคา", "bpaai raa-khaa", "价格牌；价签", "名词", "公共标识"],
  ["bpaai-bpra-gaat", "ป้ายประกาศ", "bpaai bpra-gaat", "公告牌", "名词", "通知"],
  ["bpra-gaat", "ประกาศ", "bpra-gaat", "公告；宣布", "名词", "通知"],
  ["khaaw-jaeng", "ข้อแจ้ง", "khaaw jaaeng", "通知事项", "名词", "通知"],
  ["khaaw-khwaam-jaeng", "ข้อความแจ้ง", "khaaw-khwaam jaaeng", "通知文字", "名词", "通知"],
  ["jaeng-hai-saap", "แจ้งให้ทราบ", "jaaeng hai saap", "通知知悉", "动词", "通知"],
  ["gra-ru-naa-saap", "กรุณาทราบ", "ga-ru-naa saap", "敬请知悉", "短语", "通知"],
  ["bpra-gaat-sam-khan", "ประกาศสำคัญ", "bpra-gaat sam-khan", "重要公告", "名词", "通知"],
  ["khaaw-muun", "ข้อมูล", "khaaw muun", "信息；资料", "名词", "通知"],
  ["khaaw-muun-phoem-toem", "ข้อมูลเพิ่มเติม", "khaaw muun phoem dterm", "更多信息", "名词", "通知"],
  ["dtruat-duu-khaaw-muun", "ตรวจดูข้อมูล", "dtruat duu khaaw muun", "查看信息", "动词", "通知"],
  ["bpoet", "เปิด", "bpoet", "开；开放", "动词", "开放关闭"],
  ["bpit", "ปิด", "bpit", "关；关闭", "动词", "开放关闭"],
  ["bpoet-baaw-ri-gaan", "เปิดบริการ", "bpoet baaw-ri-gaan", "开放服务；营业", "动词", "开放关闭"],
  ["bpit-baaw-ri-gaan", "ปิดบริการ", "bpit baaw-ri-gaan", "停止服务；暂停营业", "动词", "开放关闭"],
  ["wela-bpoet", "เวลาเปิด", "wee-laa bpoet", "开放时间；营业时间", "名词", "开放关闭"],
  ["wela-bpit", "เวลาปิด", "wee-laa bpit", "关闭时间；关门时间", "名词", "开放关闭"],
  ["bpoet-thuk-wan", "เปิดทุกวัน", "bpoet thuk wan", "每天开放", "短语", "开放关闭"],
  ["bpit-thuk-wan-jan", "ปิดทุกวันจันทร์", "bpit thuk wan jan", "每周一关闭", "短语", "开放关闭"],
  ["bpit-chua-khraao", "ปิดชั่วคราว", "bpit chua khraao", "临时关闭", "短语", "开放关闭"],
  ["bpoet-bpa-ga-dti", "เปิดปกติ", "bpoet bpa-ga-dti", "正常开放", "短语", "开放关闭"],
  ["thaang-khao", "ทางเข้า", "thaang khao", "入口", "名词", "入口出口"],
  ["thaang-aawk", "ทางออก", "thaang aawk", "出口", "名词", "入口出口"],
  ["khao-thaang-nii", "เข้าทางนี้", "khao thaang nii", "从这边进入", "短语", "入口出口"],
  ["aawk-thaang-nan", "ออกทางนั้น", "aawk thaang nan", "从那边出去", "短语", "入口出口"],
  ["thaang-khao-yuu-daan-naa", "ทางเข้าอยู่ด้านหน้า", "thaang khao yuu daan naa", "入口在前面", "句型", "入口出口"],
  ["thaang-aawk-yuu-daan-lang", "ทางออกอยู่ด้านหลัง", "thaang aawk yuu daan lang", "出口在后面", "句型", "入口出口"],
  ["thaang-ni-phuuk", "ทางนี้ถูก", "thaang nii thuuk", "这边是对的路", "句型", "入口出口"],
  ["haam-khao", "ห้ามเข้า", "haam khao", "禁止进入", "短语", "禁止允许"],
  ["haam-aawk", "ห้ามออก", "haam aawk", "禁止出去", "短语", "禁止允许"],
  ["haam-jaawt-rot", "ห้ามจอดรถ", "haam jaawt rot", "禁止停车", "短语", "禁止允许"],
  ["haam-suu-bu-rii", "ห้ามสูบบุหรี่", "haam suup bu-rii", "禁止吸烟", "短语", "禁止允许"],
  ["haam-tham-kha-ya", "ห้ามทิ้งขยะ", "haam thing kha-ya", "禁止扔垃圾", "短语", "禁止允许"],
  ["haam-song-siang-dang", "ห้ามส่งเสียงดัง", "haam song siiang dang", "禁止大声喧哗", "短语", "禁止允许"],
  ["haam-thaai-ruup", "ห้ามถ่ายรูป", "haam thaai ruup", "禁止拍照", "短语", "禁止允许"],
  ["haam-sat-liiang", "ห้ามสัตว์เลี้ยง", "haam sat liiang", "禁止宠物", "短语", "禁止允许"],
  ["a-nu-yaat", "อนุญาต", "a-nu-yaat", "允许", "动词", "禁止允许"],
  ["a-nu-yaat-hai-khao", "อนุญาตให้เข้า", "a-nu-yaat hai khao", "允许进入", "短语", "禁止允许"],
  ["chai-dai", "ใช้ได้", "chai dai", "可以使用", "短语", "禁止允许"],
  ["chai-mai-dai", "ใช้ไม่ได้", "chai mai dai", "不能使用", "短语", "禁止允许"],
  ["dtaaw-thaaeo", "ต่อแถว", "dtaaw thaaeo", "排队", "动词", "排队"],
  ["khao-khiu", "เข้าคิว", "khao khiu", "进入队伍；排队", "动词", "排队"],
  ["rap-bat-khiu", "รับบัตรคิว", "rap bat khiu", "取排队号", "动词", "排队"],
  ["bat-khiu", "บัตรคิว", "bat khiu", "排队号", "名词", "排队"],
  ["raw-khiu", "รอคิว", "raaw khiu", "等号；等排队", "动词", "排队"],
  ["khiu-dtaaw-bpai", "คิวต่อไป", "khiu dtaaw bpai", "下一号；下一个队列", "名词", "排队"],
  ["khiu-khaawng-khun", "คิวของคุณ", "khiu khaawng khun", "您的号码/队列", "名词", "排队"],
  ["haam-laaet-khiu", "ห้ามแซงคิว", "haam saaeng khiu", "禁止插队", "短语", "排队"],
  ["dtaaw-thaaeo-thii-nii", "ต่อแถวที่นี่", "dtaaw thaaeo thii nii", "在这里排队", "句型", "排队"],
  ["raw-dtrong-nii", "รอตรงนี้", "raaw dtrong nii", "在这里等", "句型", "排队"],
  ["khaa-khao", "ค่าเข้า", "khaa khao", "入场费", "名词", "收费免费"],
  ["khaa-baaw-ri-gaan", "ค่าบริการ", "khaa baaw-ri-gaan", "服务费", "名词", "收费免费"],
  ["khaa-tham-niiam", "ค่าธรรมเนียม", "khaa tham-niiam", "手续费；费用", "名词", "收费免费"],
  ["jaai-ngoen", "จ่ายเงิน", "jaai ngoen", "付款", "动词", "收费免费"],
  ["jaai-thii-nii", "จ่ายที่นี่", "jaai thii nii", "在这里付款", "句型", "收费免费"],
  ["free", "ฟรี", "frii", "免费", "形容词", "收费免费"],
  ["mai-sia-khaa", "ไม่เสียค่า", "mai siia khaa", "不收费", "短语", "收费免费"],
  ["sia-khaa", "เสียค่า", "siia khaa", "收费；付费", "动词", "收费免费"],
  ["khaao-frii", "เข้าฟรี", "khao frii", "免费入场", "短语", "收费免费"],
  ["dek-frii", "เด็กฟรี", "dek frii", "儿童免费", "短语", "收费免费"],
  ["rawang", "ระวัง", "ra-wang", "小心；注意", "动词", "注意事项"],
  ["khuan-rawang", "ควรระวัง", "khuan ra-wang", "应小心", "短语", "注意事项"],
  ["rawang-luen", "ระวังลื่น", "ra-wang leun", "小心地滑", "短语", "注意事项"],
  ["rawang-rot", "ระวังรถ", "ra-wang rot", "小心车辆", "短语", "注意事项"],
  ["rawang-dek", "ระวังเด็ก", "ra-wang dek", "注意儿童", "短语", "注意事项"],
  ["proot-rawang", "โปรดระวัง", "bproot ra-wang", "请注意", "短语", "注意事项"],
  ["proot-rak-saa-khwaam-sa-aat", "โปรดรักษาความสะอาด", "bproot rak-saa khwaam sa-aat", "请保持清洁", "短语", "注意事项"],
  ["proot-bpit-bpra-dtuu", "โปรดปิดประตู", "bproot bpit bpra-dtuu", "请关门", "短语", "注意事项"],
  ["proot-chaai-thaang-maa-laai", "โปรดใช้ทางม้าลาย", "bproot chai thaang maa-laai", "请走人行横道", "短语", "注意事项"],
  ["aawt-dta-raai", "อันตราย", "an-dta-raai", "危险", "形容词", "注意事项"],
  ["bplaawt-phai", "ปลอดภัย", "bplaawt-phai", "安全", "形容词", "注意事项"],
  ["cham-rut", "ชำรุด", "cham-rut", "损坏；故障", "形容词", "简单公告"],
  ["gam-lang-saawm", "กำลังซ่อม", "gam-lang saawm", "正在维修", "短语", "简单公告"],
  ["ngot-chai", "งดใช้", "ngot chai", "暂停使用", "动词", "简单公告"],
  ["ngot-baaw-ri-gaan", "งดบริการ", "ngot baaw-ri-gaan", "暂停服务", "动词", "简单公告"],
  ["bplian-wela", "เปลี่ยนเวลา", "bpliian wee-laa", "更改时间", "动词", "简单公告"],
  ["leuan-wela", "เลื่อนเวลา", "leuan wee-laa", "推迟时间", "动词", "简单公告"],
  ["wan-yut", "วันหยุด", "wan yut", "休息日；假日", "名词", "简单公告"],
  ["bpit-wan-yut", "ปิดวันหยุด", "bpit wan yut", "假日关闭", "短语", "简单公告"],
  ["bpoet-phiset", "เปิดพิเศษ", "bpoet phi-seet", "特别开放", "短语", "简单公告"],
  ["jaeng-wela-mai", "แจ้งเวลาใหม่", "jaaeng wee-laa mai", "通知新时间", "动词", "简单公告"],
  ["jaeng-bplian-bpra-dtuu", "แจ้งเปลี่ยนประตู", "jaaeng bpliian bpra-dtuu", "通知更换入口/门口", "动词", "简单公告"],
  ["bpit-bpra-bprung", "ปิดปรับปรุง", "bpit bprap-bprung", "关闭整修", "短语", "简单公告"],
  ["chai-thaang-uen", "ใช้ทางอื่น", "chai thaang uen", "请走其他通道", "句型", "简单公告"],
  ["bpaai-chua-khraao", "ป้ายชั่วคราว", "bpaai chua-khraao", "临时标识", "名词", "公共标识"],
  ["khaw-aphai-nai-khwaam-mai-saduak", "ขออภัยในความไม่สะดวก", "khaaw a-phai nai khwaam mai sa-duak", "对不便表示歉意", "短语", "简单公告"],
  ["saamaarot-thaam-jao-naa-thii", "สามารถถามเจ้าหน้าที่", "saa-maat thaam jao-naa-thii", "可以询问工作人员", "句型", "简单公告"],
];

const relatedByTheme: Record<VocabularyExpansionTheme, VocabularyExpansionRelated> = {
  公共标识: { thai: "ป้าย", roman: "bpaai", chinese: "标识" },
  通知: { thai: "ประกาศ", roman: "bpra-gaat", chinese: "公告" },
  开放关闭: { thai: "เปิด", roman: "bpoet", chinese: "开放" },
  入口出口: { thai: "ทางเข้า", roman: "thaang khao", chinese: "入口" },
  禁止允许: { thai: "ห้าม", roman: "haam", chinese: "禁止" },
  排队: { thai: "คิว", roman: "khiu", chinese: "排队号" },
  收费免费: { thai: "ฟรี", roman: "frii", chinese: "免费" },
  注意事项: { thai: "ระวัง", roman: "ra-wang", chinese: "小心" },
  简单公告: { thai: "แจ้งให้ทราบ", roman: "jaaeng hai saap", chinese: "通知知悉" },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ที่สถานที่สาธารณะ เราเห็นป้ายว่า “${row[1]}” จึงควรอ่านให้เข้าใจก่อนใช้บริการ`,
  roman: `thii sa-thaan-thii saa-thaa-ra-na rao hen bpaai waa "${row[2]}" jeung khuan aan hai khao-jai gaawn chai baaw-ri-gaan`,
  chinese: `在公共场所，我们看到“${row[1]}”的标识，所以使用服务前应该读懂。`,
});

const buildCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];
  const comparison: VocabularyExpansionComparison = { kind: "usage", target: related, distinctionZh: `${row[1]} 属于“${row[5]}”标识语；和 ${related.thai} 对照记，可以分清通知、禁止允许、排队、收费和注意事项。` };
  const collocations = [{ thai: row[1], roman: row[2], chinese: row[3] }, related];
  return {
    id: row[0], thai: row[1], roman: row[2], chinese: row[3], partOfSpeech: row[4], theme: row[5], level: "a2", priority: index + 1,
    senses: [{ id: `${row[0]}-main`, chinese: row[3], examples: [exampleFor(row)], synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5]] }],
    synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5], "A2基础", "公共标识"], sourceRefs: SIGNS_REFS, reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_PUBLIC_INFO_SIGNS_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
