export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type PracticalSurvivalReviewTheme =
  | "问路"
  | "付款"
  | "求助"
  | "解释问题"
  | "确认信息"
  | "简单拒绝"
  | "请求"
  | "听不懂"
  | "紧急情况"
  | "办事收尾";

export interface VocabularyExpansionExample {
  thai: string;
  roman: string;
  chinese: string;
}

export interface VocabularyExpansionSense {
  chinese: string;
  usageNotesZh: string;
  examples: VocabularyExpansionExample[];
}

export interface VocabularyExpansionCandidate {
  id: string;
  headword: string;
  romanization: string;
  level: VocabularyExpansionLevel;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  tags: string[];
  senses: VocabularyExpansionSense[];
  synonyms?: string[];
  antonyms?: string[];
  comparisons?: string[];
  collocations?: string[];
  sources: string[];
}

type Row = [
  id: string,
  thai: string,
  roman: string,
  chinese: string,
  partOfSpeech: VocabularyExpansionPartOfSpeech,
  theme: PracticalSurvivalReviewTheme,
];

const PRACTICAL_SURVIVAL_REVIEW_REFS = [
  "worker-a-a2-practical-survival-review",
  "basic-thai-survival-review",
];

const rows: Row[] = [
  ["bpai-thaang-nai", "ไปทางไหน", "bpai thaang nai", "往哪边走", "句型", "问路"],
  ["yuu-thii-nai", "อยู่ที่ไหน", "yuu thii nai", "在哪里", "句型", "问路"],
  ["bpai-yang-rai", "ไปอย่างไร", "bpai yaang rai", "怎么去", "句型", "问路"],
  ["glai-mai", "ใกล้ไหม", "glai mai", "近吗", "句型", "问路"],
  ["glai-mai-far", "ไกลไหม", "glai mai", "远吗", "句型", "问路"],
  ["dtrong-bpai", "ตรงไป", "dtrong bpai", "直走", "动词", "问路"],
  ["liao-saai", "เลี้ยวซ้าย", "liao saai", "左转", "动词", "问路"],
  ["liao-khwaa", "เลี้ยวขวา", "liao khwaa", "右转", "动词", "问路"],
  ["khaam-tha-non", "ข้ามถนน", "khaam tha-non", "过马路", "动词", "问路"],
  ["long-thii-nii", "ลงที่นี่", "long thii nii", "在这里下", "句型", "问路"],
  ["jaai-ngoen", "จ่ายเงิน", "jaai ngoen", "付款", "动词", "付款"],
  ["khit-ngoen", "คิดเงิน", "khit ngoen", "结账", "动词", "付款"],
  ["thao-rai", "เท่าไร", "thao rai", "多少钱", "句型", "付款"],
  ["ruam-thang-mot-thao-rai", "รวมทั้งหมดเท่าไร", "ruam thang mot thao rai", "一共多少钱", "句型", "付款"],
  ["jaai-sot", "จ่ายสด", "jaai sot", "付现金", "动词", "付款"],
  ["scan-jaai", "สแกนจ่าย", "sa-gaaen jaai", "扫码付款", "动词", "付款"],
  ["on-ngoen", "โอนเงิน", "oon ngoen", "转账", "动词", "付款"],
  ["ngoen-thawn", "เงินทอน", "ngoen thaawn", "找零", "名词", "付款"],
  ["khaaw-bai-set", "ขอใบเสร็จ", "khaaw bai-set", "请给收据", "句型", "付款"],
  ["jaai-laew", "จ่ายแล้ว", "jaai laew", "已经付了", "句型", "付款"],
  ["chuai-duai", "ช่วยด้วย", "chuai duai", "请帮忙；救命", "短语", "求助"],
  ["chuai-noi", "ช่วยหน่อย", "chuai noi", "帮一下", "短语", "求助"],
  ["khaaw-khwaam-chuai-luea", "ขอความช่วยเหลือ", "khaaw khwaam chuai luea", "请求帮助", "动词", "求助"],
  ["mi-khrai-chuai-dai-mai", "มีใครช่วยได้ไหม", "mii khrai chuai dai mai", "有人可以帮忙吗", "句型", "求助"],
  ["chuai-thoo-hai-noi", "ช่วยโทรให้หน่อย", "chuai thoo hai noi", "请帮我打电话", "句型", "求助"],
  ["chuai-bplae-hai-noi", "ช่วยแปลให้หน่อย", "chuai bplae hai noi", "请帮我翻译", "句型", "求助"],
  ["chuai-duu-hai-noi", "ช่วยดูให้หน่อย", "chuai duu hai noi", "请帮我看一下", "句型", "求助"],
  ["dtawng-gaan-khwaam-chuai-luea", "ต้องการความช่วยเหลือ", "dtawng gaan khwaam chuai luea", "需要帮助", "句型", "求助"],
  ["dtit-dtaaw-jao-naa-thii", "ติดต่อเจ้าหน้าที่", "dtit dtaaw jao naa thii", "联系工作人员", "动词", "求助"],
  ["khrai-duu-laae", "ใครดูแล", "khrai duu laae", "谁负责", "句型", "求助"],
  ["mi-pan-haa", "มีปัญหา", "mii bpan-haa", "有问题", "句型", "解释问题"],
  ["khaaw-jaeng-pan-haa", "ขอแจ้งปัญหา", "khaaw jaaeng bpan-haa", "想反馈问题", "句型", "解释问题"],
  ["chai-mai-dai", "ใช้ไม่ได้", "chai mai dai", "不能使用", "句型", "解释问题"],
  ["phang", "พัง", "phang", "坏了", "动词", "解释问题"],
  ["sang-phit", "สั่งผิด", "sang phit", "点错/下错单", "动词", "解释问题"],
  ["dai-mai-khrop", "ได้ไม่ครบ", "dai mai khrop", "没有拿全", "句型", "解释问题"],
  ["mai-dtrong", "ไม่ตรง", "mai dtrong", "不一致；不符合", "形容词", "解释问题"],
  ["mai-chai-thii-sang", "ไม่ใช่ที่สั่ง", "mai chai thii sang", "不是我点的", "句型", "解释问题"],
  ["luem-ao-maa", "ลืมเอามา", "luem ao maa", "忘了带来", "动词", "解释问题"],
  ["khaaw-a-thi-baai", "ขออธิบาย", "khaaw a-thi-baai", "请让我解释", "句型", "解释问题"],
  ["yuen-yan", "ยืนยัน", "yuen yan", "确认", "动词", "确认信息"],
  ["khaaw-yuen-yan", "ขอยืนยัน", "khaaw yuen yan", "请确认", "句型", "确认信息"],
  ["thuuk-dtawng-mai", "ถูกต้องไหม", "thuuk dtawng mai", "正确吗", "句型", "确认信息"],
  ["chai-mai", "ใช่ไหม", "chai mai", "是吗；对吗", "句型", "确认信息"],
  ["chue-thuuk-mai", "ชื่อถูกไหม", "chue thuuk mai", "名字对吗", "句型", "确认信息"],
  ["boe-thoo-thuuk-mai", "เบอร์โทรถูกไหม", "boe thoo thuuk mai", "电话号码对吗", "句型", "确认信息"],
  ["welaa-thuuk-mai", "เวลาถูกไหม", "we-laa thuuk mai", "时间对吗", "句型", "确认信息"],
  ["thi-yuu-thuuk-mai", "ที่อยู่ถูกไหม", "thii yuu thuuk mai", "地址对吗", "句型", "确认信息"],
  ["dai-rap-laew-mai", "ได้รับแล้วไหม", "dai rap laew mai", "收到了吗", "句型", "确认信息"],
  ["khaaw-chek-iik-khrang", "ขอเช็กอีกครั้ง", "khaaw chek iik khrang", "请再核对一次", "句型", "确认信息"],
  ["mai-ao", "ไม่เอา", "mai ao", "不要", "短语", "简单拒绝"],
  ["mai-dtawng", "ไม่ต้อง", "mai dtawng", "不用；不必", "短语", "简单拒绝"],
  ["mai-bpen-rai", "ไม่เป็นไร", "mai bpen rai", "没关系；不用了", "短语", "简单拒绝"],
  ["yang-mai-ao", "ยังไม่เอา", "yang mai ao", "暂时不要", "句型", "简单拒绝"],
  ["mai-saduak", "ไม่สะดวก", "mai sa-duak", "不方便", "形容词", "简单拒绝"],
  ["khaaw-khit-gaawn", "ขอคิดก่อน", "khaaw khit gaawn", "让我先想想", "句型", "简单拒绝"],
  ["wai-khraw-naa", "ไว้คราวหน้า", "wai khraao naa", "留到下次", "短语", "简单拒绝"],
  ["khawp-khun-dtae-mai-ao", "ขอบคุณแต่ไม่เอา", "khaawp khun dtae mai ao", "谢谢，但不要", "句型", "简单拒绝"],
  ["mai-chai-an-nii", "ไม่ใช่อันนี้", "mai chai an nii", "不是这个", "句型", "简单拒绝"],
  ["mai-dai-jing-jing", "ไม่ได้จริง ๆ", "mai dai jing jing", "真的不行", "句型", "简单拒绝"],
  ["khaaw", "ขอ", "khaaw", "请求；要", "动词", "请求"],
  ["khaaw-noi", "ขอหน่อย", "khaaw noi", "请给一点；请帮一下", "短语", "请求"],
  ["khaaw-duu", "ขอดู", "khaaw duu", "请看一下", "动词", "请求"],
  ["khaaw-laawng", "ขอลอง", "khaaw laawng", "请试一下", "动词", "请求"],
  ["khaaw-chai", "ขอใช้", "khaaw chai", "请用一下", "动词", "请求"],
  ["khaaw-yuem", "ขอยืม", "khaaw yuem", "请借用", "动词", "请求"],
  ["khaaw-welaa", "ขอเวลา", "khaaw we-laa", "请给时间", "句型", "请求"],
  ["khaaw-raai-la-iat", "ขอรายละเอียด", "khaaw raai la-iat", "请给细节", "句型", "请求"],
  ["ga-ru-naa", "กรุณา", "ga-ru-naa", "请；请您", "动词", "请求"],
  ["rop-guan-noi", "รบกวนหน่อย", "rop guan noi", "麻烦一下", "短语", "请求"],
  ["mai-khao-jai", "ไม่เข้าใจ", "mai khao jai", "不明白", "句型", "听不懂"],
  ["fang-mai-than", "ฟังไม่ทัน", "fang mai than", "听不及；跟不上", "句型", "听不懂"],
  ["phuut-chaa-noi", "พูดช้าหน่อย", "phuut chaa noi", "请说慢一点", "句型", "听不懂"],
  ["phuut-mai-dai-mai", "พูดใหม่ได้ไหม", "phuut mai dai mai", "可以重新说吗", "句型", "听不懂"],
  ["bplae-waa-arai", "แปลว่าอะไร", "bplae waa a-rai", "是什么意思", "句型", "听不懂"],
  ["kham-nii-bplae-waa-arai", "คำนี้แปลว่าอะไร", "kham nii bplae waa a-rai", "这个词是什么意思", "句型", "听不懂"],
  ["khaaw-tua-yaang", "ขอตัวอย่าง", "khaaw dtua yaang", "请给例子", "句型", "听不懂"],
  ["khian-hai-duu", "เขียนให้ดู", "khian hai duu", "写给我看", "句型", "听不懂"],
  ["mai-thuuk", "ไม่ถูก", "mai thuuk", "不对；不会", "形容词", "听不懂"],
  ["chuai-a-thi-baai", "ช่วยอธิบาย", "chuai a-thi-baai", "请帮忙解释", "动词", "听不懂"],
  ["chuk-choen", "ฉุกเฉิน", "chuk-choen", "紧急", "形容词", "紧急情况"],
  ["het-duan", "เหตุด่วน", "heet duan", "紧急事件", "名词", "紧急情况"],
  ["riiak-dtamruat", "เรียกตำรวจ", "riiak dtam-ruat", "叫警察", "动词", "紧急情况"],
  ["riiak-rot-pha-yaa-baan", "เรียกรถพยาบาล", "riiak rot pha-yaa-baan", "叫救护车", "动词", "紧急情况"],
  ["bpai-roong-pha-yaa-baan", "ไปโรงพยาบาล", "bpai roong pha-yaa-baan", "去医院", "动词", "紧急情况"],
  ["khong-haai", "ของหาย", "khaawng haai", "东西丢了", "句型", "紧急情况"],
  ["long-thaang", "หลงทาง", "long thaang", "迷路", "动词", "紧急情况"],
  ["mai-bplaawt-phai", "ไม่ปลอดภัย", "mai bplaawt-phai", "不安全", "形容词", "紧急情况"],
  ["mi-khon-jep", "มีคนเจ็บ", "mii khon jep", "有人受伤", "句型", "紧急情况"],
  ["dtawng-gaan-khwaam-chuai-luea-duan", "ต้องการความช่วยเหลือด่วน", "dtawng gaan khwaam chuai luea duan", "需要紧急帮助", "句型", "紧急情况"],
  ["riiap-roi-laew", "เรียบร้อยแล้ว", "riiap raawy laew", "已经办妥", "句型", "办事收尾"],
  ["set-laew", "เสร็จแล้ว", "set laew", "完成了", "句型", "办事收尾"],
  ["khawp-khun", "ขอบคุณ", "khaawp khun", "谢谢", "短语", "办事收尾"],
  ["khawp-khun-thii-chuai", "ขอบคุณที่ช่วย", "khaawp khun thii chuai", "谢谢帮忙", "句型", "办事收尾"],
  ["mai-mi-arai-laew", "ไม่มีอะไรแล้ว", "mai mii a-rai laew", "已经没事了", "句型", "办事收尾"],
  ["diao-glap-maa", "เดี๋ยวกลับมา", "diao glap maa", "一会儿回来", "句型", "办事收尾"],
  ["ja-dtit-dtaaw-glap", "จะติดต่อกลับ", "ja dtit dtaaw glap", "会再联系", "句型", "办事收尾"],
  ["choen-mai-khrang-naa", "เชิญใหม่ครั้งหน้า", "choen mai khrang naa", "欢迎下次再来", "句型", "办事收尾"],
  ["laa-gaawn", "ลาก่อน", "laa gaawn", "再见", "短语", "办事收尾"],
  ["wan-nii-phaaw-laew", "วันนี้พอแล้ว", "wan nii phaaw laew", "今天够了/到这里", "句型", "办事收尾"],
];

const relatedByTheme: Record<
  PracticalSurvivalReviewTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  问路: {
    synonym: "ไปทางไหน / bpai thaang nai / 往哪边走",
    antonym: "หลงทาง / long thaang / 迷路",
    comparison: "อยู่ที่ไหน 问地点在哪里，ไปอย่างไร 问怎么去。",
    collocation: "ไปสถานีรถไฟทางไหน / bpai sa-thaa-nii rot-fai thaang nai / 去火车站往哪边走",
  },
  付款: {
    synonym: "จ่ายเงิน / jaai ngoen / 付款",
    antonym: "ยังไม่จ่าย / yang mai jaai / 还没付",
    comparison: "คิดเงิน 是结账算钱，จ่ายเงิน 是付款动作。",
    collocation: "รวมทั้งหมดเท่าไร / ruam thang mot thao rai / 一共多少钱",
  },
  求助: {
    synonym: "ช่วยหน่อย / chuai noi / 帮一下",
    antonym: "ไม่ต้องช่วย / mai dtawng chuai / 不用帮",
    comparison: "ช่วยด้วย 比 ช่วยหน่อย 更急，紧急时可用。",
    collocation: "ช่วยโทรหาเจ้าหน้าที่ให้หน่อย / chuai thoo haa jao naa thii hai noi / 请帮我打电话给工作人员",
  },
  解释问题: {
    synonym: "มีปัญหา / mii bpan-haa / 有问题",
    antonym: "ไม่มีปัญหา / mai mii bpan-haa / 没问题",
    comparison: "ขอแจ้งปัญหา 比直接说เสีย 更礼貌。",
    collocation: "อันนี้ใช้ไม่ได้ ขอแจ้งปัญหา / an nii chai mai dai khaaw jaaeng bpan-haa / 这个不能用，想反馈问题",
  },
  确认信息: {
    synonym: "ขอยืนยัน / khaaw yuen yan / 请确认",
    antonym: "ยังไม่ยืนยัน / yang mai yuen yan / 尚未确认",
    comparison: "เช็ก 是检查，ยืนยัน 是确认无误。",
    collocation: "ขอเช็กที่อยู่อีกครั้ง / khaaw chek thii yuu iik khrang / 请再核对一次地址",
  },
  简单拒绝: {
    synonym: "ไม่เอา / mai ao / 不要",
    antonym: "เอา / ao / 要",
    comparison: "ไม่เป็นไร 可礼貌拒绝帮助或物品，ไม่เอา 更直接。",
    collocation: "ขอบคุณแต่ยังไม่เอา / khaawp khun dtae yang mai ao / 谢谢，但暂时不要",
  },
  请求: {
    synonym: "ขอหน่อย / khaaw noi / 请给一点、请帮一下",
    antonym: "ไม่ขอ / mai khaaw / 不请求",
    comparison: "ขอ + 动词 是生存场景万能请求结构，รบกวนหน่อย 更客气。",
    collocation: "รบกวนขอดูหน่อย / rop guan khaaw duu noi / 麻烦让我看一下",
  },
  听不懂: {
    synonym: "ไม่เข้าใจ / mai khao jai / 不明白",
    antonym: "เข้าใจแล้ว / khao jai laew / 明白了",
    comparison: "ฟังไม่ทัน 是听得太快跟不上，ไม่เข้าใจ 是没理解。",
    collocation: "พูดช้าหน่อยได้ไหม / phuut chaa noi dai mai / 可以说慢一点吗",
  },
  紧急情况: {
    synonym: "ฉุกเฉิน / chuk-choen / 紧急",
    antonym: "ปลอดภัย / bplaawt-phai / 安全",
    comparison: "เหตุด่วน 是紧急事件，ฉุกเฉิน 是紧急状态。",
    collocation: "มีคนเจ็บ ต้องเรียกรถพยาบาล / mii khon jep dtawng riiak rot pha-yaa-baan / 有人受伤，需要叫救护车",
  },
  办事收尾: {
    synonym: "เรียบร้อยแล้ว / riiap raawy laew / 已经办妥",
    antonym: "ยังไม่เสร็จ / yang mai set / 还没完成",
    comparison: "เสร็จแล้ว 是完成，เรียบร้อยแล้ว 语气更像事情妥当了。",
    collocation: "ขอบคุณที่ช่วย วันนี้เรียบร้อยแล้ว / khaawp khun thii chuai wan nii riiap raawy laew / 谢谢帮忙，今天办妥了",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาอยู่ข้างนอกและต้องแก้ปัญหา ฉันใช้คำว่า “${row[1]}” เพื่อถาม ขอความช่วยเหลือ หรือยืนยันข้อมูล`,
  roman: `we-laa yuu khaang naawk lae dtawng gaae bpan-haa chan chai kham waa "${row[2]}" phuea thaam khaaw khwaam chuai luea rue yuen-yan khaaw muun`,
  chinese: `在外面需要处理问题时，我会用“${row[1]}”来提问、求助或确认信息。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "生存词汇复盘", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 生存词汇复盘表达。适合问路、付款、求助、解释问题、确认信息、简单拒绝和请求；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: PRACTICAL_SURVIVAL_REVIEW_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_PRACTICAL_SURVIVAL_REVIEW_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
