export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type BasicHouseholdRequestsTheme =
  | "帮忙做家务"
  | "借用东西"
  | "修东西"
  | "安静一点"
  | "开关空调"
  | "家庭安排"
  | "厨房用餐"
  | "整理清洁"
  | "共用空间"
  | "礼貌协商";

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
  theme: BasicHouseholdRequestsTheme,
];

const BASIC_HOUSEHOLD_REQUESTS_REFS = [
  "worker-a-a2-basic-household-requests",
  "basic-thai-household-requests",
];

const rows: Row[] = [
  ["chuai-tham-ngaan-baan", "ช่วยทำงานบ้าน", "chuai tham ngaan baan", "帮忙做家务", "动词", "帮忙做家务"],
  ["chuai-laang-jaan", "ช่วยล้างจาน", "chuai laang jaan", "帮忙洗碗", "动词", "帮忙做家务"],
  ["chuai-gwaat-baan", "ช่วยกวาดบ้าน", "chuai gwaat baan", "帮忙扫家里", "动词", "帮忙做家务"],
  ["chuai-thuu-phuen", "ช่วยถูพื้น", "chuai thuu phuen", "帮忙拖地", "动词", "帮忙做家务"],
  ["chuai-thing-kha-ya", "ช่วยทิ้งขยะ", "chuai thing kha-ya", "帮忙倒垃圾", "动词", "帮忙做家务"],
  ["chuai-sak-phaa", "ช่วยซักผ้า", "chuai sak phaa", "帮忙洗衣服", "动词", "帮忙做家务"],
  ["chuai-dtaak-phaa", "ช่วยตากผ้า", "chuai dtaak phaa", "帮忙晾衣服", "动词", "帮忙做家务"],
  ["chuai-gep-phaa", "ช่วยเก็บผ้า", "chuai gep phaa", "帮忙收衣服", "动词", "帮忙做家务"],
  ["chuai-phap-phaa", "ช่วยพับผ้า", "chuai phap phaa", "帮忙叠衣服", "动词", "帮忙做家务"],
  ["baeng-ngaan-baan", "แบ่งงานบ้าน", "baeng ngaan baan", "分担家务", "动词", "帮忙做家务"],
  ["khaaw-yuem", "ขอยืม", "khaaw yuem", "请求借用", "动词", "借用东西"],
  ["yuem-dai-mai", "ยืมได้ไหม", "yuem dai mai", "可以借吗", "句型", "借用东西"],
  ["khaaw-yuem-bpaak-gaa", "ขอยืมปากกา", "khaaw yuem bpaak-gaa", "借用笔", "句型", "借用东西"],
  ["khaaw-yuem-sai-chaat", "ขอยืมสายชาร์จ", "khaaw yuem saai chaat", "借充电线", "句型", "借用东西"],
  ["khaaw-yuem-rom", "ขอยืมร่ม", "khaaw yuem rom", "借伞", "句型", "借用东西"],
  ["chai-khueng-gan", "ใช้ร่วมกัน", "chai ruam gan", "共同使用", "动词", "借用东西"],
  ["khuen-khaawng", "คืนของ", "khuen khaawng", "归还东西", "动词", "借用东西"],
  ["diao-khuen-hai", "เดี๋ยวคืนให้", "diao khuen hai", "等一下还给你", "句型", "借用东西"],
  ["yuem-bpaep-diao", "ยืมแป๊บเดียว", "yuem bpaep diao", "借一小会儿", "句型", "借用东西"],
  ["chai-set-laew-ja-khuen", "ใช้เสร็จแล้วจะคืน", "chai set laew ja khuen", "用完就还", "句型", "借用东西"],
  ["saawm", "ซ่อม", "saawm", "修理", "动词", "修东西"],
  ["saawm-hai-noi", "ซ่อมให้หน่อย", "saawm hai noi", "帮忙修一下", "句型", "修东西"],
  ["cham-rut", "ชำรุด", "cham-rut", "损坏；故障", "形容词", "修东西"],
  ["phang", "พัง", "phang", "坏掉", "动词", "修东西"],
  ["chai-mai-dai", "ใช้ไม่ได้", "chai mai dai", "不能用", "句型", "修东西"],
  ["bpoet-mai-dai", "เปิดไม่ได้", "bpoet mai dai", "打不开", "句型", "修东西"],
  ["bpit-mai-dai", "ปิดไม่ได้", "bpit mai dai", "关不上", "句型", "修东西"],
  ["naam-rua", "น้ำรั่ว", "naam rua", "漏水", "句型", "修东西"],
  ["fai-mai-dtit", "ไฟไม่ติด", "fai mai dtit", "灯不亮", "句型", "修东西"],
  ["jaeng-saawm", "แจ้งซ่อม", "jaaeng saawm", "报修", "动词", "修东西"],
  ["bao-siang-noi", "เบาเสียงหน่อย", "bao siiang noi", "声音小一点", "句型", "安静一点"],
  ["phuut-bao-bao", "พูดเบา ๆ", "phuut bao bao", "小声说", "短语", "安静一点"],
  ["yaa-siang-dang", "อย่าเสียงดัง", "yaa siiang dang", "不要吵", "句型", "安静一点"],
  ["yaa-song-siang-dang", "อย่าส่งเสียงดัง", "yaa song siiang dang", "不要大声喧哗", "句型", "安静一点"],
  ["khaaw-ngiap-noi", "ขอเงียบหน่อย", "khaaw ngiiap noi", "请安静一点", "句型", "安静一点"],
  ["dek-naawn-yuu", "เด็กนอนอยู่", "dek naawn yuu", "孩子正在睡觉", "句型", "安静一点"],
  ["khon-gamlang-phak", "คนกำลังพัก", "khon gam-lang phak", "有人正在休息", "句型", "安静一点"],
  ["bpit-bpra-dtuu-bao-bao", "ปิดประตูเบา ๆ", "bpit bpra-dtuu bao bao", "轻轻关门", "句型", "安静一点"],
  ["lot-siang-thii-wii", "ลดเสียงทีวี", "lot siiang thii-wii", "调低电视声音", "动词", "安静一点"],
  ["mai-rab-guuan", "ไม่รบกวน", "mai rop guan", "不打扰", "短语", "安静一点"],
  ["bpoet-air", "เปิดแอร์", "bpoet ae", "开空调", "动词", "开关空调"],
  ["bpit-air", "ปิดแอร์", "bpit ae", "关空调", "动词", "开关空调"],
  ["prap-air", "ปรับแอร์", "bprap ae", "调空调", "动词", "开关空调"],
  ["air-yen-goen-bpai", "แอร์เย็นเกินไป", "ae yen goen bpai", "空调太冷", "句型", "开关空调"],
  ["air-mai-yen", "แอร์ไม่เย็น", "ae mai yen", "空调不冷", "句型", "开关空调"],
  ["prap-hai-yen-khuen", "ปรับให้เย็นขึ้น", "bprap hai yen khuen", "调凉一点", "句型", "开关空调"],
  ["prap-hai-un-khuen", "ปรับให้อุ่นขึ้น", "bprap hai un khuen", "调暖一点", "句型", "开关空调"],
  ["bpoet-phat-lom", "เปิดพัดลม", "bpoet phat-lom", "开风扇", "动词", "开关空调"],
  ["bpit-phat-lom", "ปิดพัดลม", "bpit phat-lom", "关风扇", "动词", "开关空调"],
  ["bpra-yat-fai", "ประหยัดไฟ", "bpra-yat fai", "节约用电", "动词", "开关空调"],
  ["jad-welaa", "จัดเวลา", "jat we-laa", "安排时间", "动词", "家庭安排"],
  ["waang-phaaen-gaan-baan", "วางแผนงานบ้าน", "waang phaaen ngaan baan", "安排家务计划", "动词", "家庭安排"],
  ["wan-nii-khrai-tham", "วันนี้ใครทำ", "wan nii khrai tham", "今天谁做", "句型", "家庭安排"],
  ["phan-gan-tham", "ผลัดกันทำ", "phlat gan tham", "轮流做", "动词", "家庭安排"],
  ["khun-tham-wan-nii", "คุณทำวันนี้", "khun tham wan nii", "你今天做", "句型", "家庭安排"],
  ["chan-tham-phrung-nii", "ฉันทำพรุ่งนี้", "chan tham phrung nii", "我明天做", "句型", "家庭安排"],
  ["tham-duai-gan", "ทำด้วยกัน", "tham duai gan", "一起做", "动词", "家庭安排"],
  ["tham-gon-gin-khaao", "ทำก่อนกินข้าว", "tham gaawn gin khaao", "吃饭前做", "句型", "家庭安排"],
  ["tham-lang-gaan", "ทำหลังงาน", "tham lang ngaan", "工作后做", "句型", "家庭安排"],
  ["plian-welaa-dai-mai", "เปลี่ยนเวลาได้ไหม", "bpliian we-laa dai mai", "可以改时间吗", "句型", "家庭安排"],
  ["tham-aa-haan", "ทำอาหาร", "tham aa-haan", "做饭", "动词", "厨房用餐"],
  ["chuai-han-phak", "ช่วยหั่นผัก", "chuai han phak", "帮忙切菜", "动词", "厨房用餐"],
  ["dtang-dtoh", "ตั้งโต๊ะ", "dtang dtoh", "摆桌子", "动词", "厨房用餐"],
  ["gep-dtoh", "เก็บโต๊ะ", "gep dtoh", "收桌子", "动词", "厨房用餐"],
  ["gin-khaao-duai-gan", "กินข้าวด้วยกัน", "gin khaao duai gan", "一起吃饭", "动词", "厨房用餐"],
  ["ao-jaan", "เอาจาน", "ao jaan", "拿盘子", "动词", "厨房用餐"],
  ["ao-nam-hai", "เอาน้ำให้", "ao naam hai", "拿水给……", "动词", "厨房用餐"],
  ["laang-phak", "ล้างผัก", "laang phak", "洗菜", "动词", "厨房用餐"],
  ["gin-hai-mot", "กินให้หมด", "gin hai mot", "吃完", "句型", "厨房用餐"],
  ["gep-aa-haan-wai", "เก็บอาหารไว้", "gep aa-haan wai", "把食物收起来", "动词", "厨房用餐"],
  ["gep-hong", "เก็บห้อง", "gep haawng", "整理房间", "动词", "整理清洁"],
  ["jad-hong", "จัดห้อง", "jat haawng", "整理布置房间", "动词", "整理清洁"],
  ["tham-khwaam-sa-aat", "ทำความสะอาด", "tham khwaam sa-aat", "打扫清洁", "动词", "整理清洁"],
  ["chet-dtoh", "เช็ดโต๊ะ", "chet dtoh", "擦桌子", "动词", "整理清洁"],
  ["chet-phuen", "เช็ดพื้น", "chet phuen", "擦地", "动词", "整理清洁"],
  ["gwaat-yak-yai", "กวาดหยากไย่", "gwaat yaak-yai", "扫蜘蛛网/灰尘网", "动词", "整理清洁"],
  ["gep-khaawng-hai-riap-roi", "เก็บของให้เรียบร้อย", "gep khaawng hai riiap raawy", "把东西收整齐", "句型", "整理清洁"],
  ["yaa-waang-ruek-rak", "อย่าวางรกรก", "yaa waang rok rok", "不要乱放", "句型", "整理清洁"],
  ["hong-rok", "ห้องรก", "haawng rok", "房间乱", "句型", "整理清洁"],
  ["sa-aat-khuen", "สะอาดขึ้น", "sa-aat khuen", "变干净了", "短语", "整理清洁"],
  ["hong-nang-len", "ห้องนั่งเล่น", "haawng nang len", "客厅", "名词", "共用空间"],
  ["hong-khrua", "ห้องครัว", "haawng khrua", "厨房", "名词", "共用空间"],
  ["hong-naam", "ห้องน้ำ", "haawng naam", "卫生间", "名词", "共用空间"],
  ["phuen-thii-ruam", "พื้นที่รวม", "phuen thii ruam", "共用区域", "名词", "共用空间"],
  ["chai-ruam-gan", "ใช้ร่วมกัน", "chai ruam gan", "共同使用", "动词", "共用空间"],
  ["yaa-yuet", "อย่ายึด", "yaa yeut", "不要独占", "句型", "共用空间"],
  ["plian-gan-chai", "เปลี่ยนกันใช้", "bpliian gan chai", "轮流使用", "动词", "共用空间"],
  ["bpit-bpra-dtuu", "ปิดประตู", "bpit bpra-dtuu", "关门", "动词", "共用空间"],
  ["bpoet-naa-taang", "เปิดหน้าต่าง", "bpoet naa-dtaang", "开窗", "动词", "共用空间"],
  ["rak-saa-khwaam-sa-aat", "รักษาความสะอาด", "rak-saa khwaam sa-aat", "保持清洁", "动词", "共用空间"],
  ["saduak-mai", "สะดวกไหม", "sa-duak mai", "方便吗", "句型", "礼貌协商"],
  ["chuai-noi-dai-mai", "ช่วยหน่อยได้ไหม", "chuai noi dai mai", "可以帮一下吗", "句型", "礼貌协商"],
  ["thaa-mai-lam-baak", "ถ้าไม่ลำบาก", "thaa mai lam-baak", "如果不麻烦的话", "句型", "礼貌协商"],
  ["thaa-saduak", "ถ้าสะดวก", "thaa sa-duak", "如果方便的话", "句型", "礼貌协商"],
  ["mai-bpen-rai", "ไม่เป็นไร", "mai bpen rai", "没关系", "短语", "礼貌协商"],
  ["dai-loei", "ได้เลย", "dai loei", "可以，没问题", "短语", "礼貌协商"],
  ["diao-chan-tham", "เดี๋ยวฉันทำ", "diao chan tham", "等一下我来做", "句型", "礼貌协商"],
  ["khaaw-plian", "ขอเปลี่ยน", "khaaw bpliian", "请求更换/改动", "句型", "礼貌协商"],
  ["khaaw-thoot-thii-rop-guan", "ขอโทษที่รบกวน", "khaaw thoot thii rop guan", "抱歉打扰", "句型", "礼貌协商"],
  ["khawp-khun-thii-chuai", "ขอบคุณที่ช่วย", "khaawp khun thii chuai", "谢谢帮忙", "句型", "礼貌协商"],
];

const relatedByTheme: Record<
  BasicHouseholdRequestsTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  帮忙做家务: {
    synonym: "ช่วยทำงานบ้าน / chuai tham ngaan baan / 帮忙做家务",
    antonym: "ไม่ช่วย / mai chuai / 不帮",
    comparison: "ช่วย + 动词 是家里请求最常用结构，加 หน่อย 语气更柔和。",
    collocation: "ช่วยล้างจานหน่อย / chuai laang jaan noi / 请帮忙洗碗",
  },
  借用东西: {
    synonym: "ขอยืม / khaaw yuem / 请求借用",
    antonym: "คืนของ / khuen khaawng / 归还东西",
    comparison: "ยืม 是借入，คืน 是归还；借用时最好说明会还。",
    collocation: "ขอยืมแป๊บเดียว เดี๋ยวคืนให้ / khaaw yuem bpaep diao diao khuen hai / 借一小会儿，等下还给你",
  },
  修东西: {
    synonym: "ซ่อม / saawm / 修理",
    antonym: "ใช้ได้ / chai dai / 能用",
    comparison: "พัง 是坏了，ชำรุด 更像正式说损坏。",
    collocation: "แจ้งซ่อมเพราะใช้ไม่ได้ / jaaeng saawm phraw chai mai dai / 因为不能用而报修",
  },
  安静一点: {
    synonym: "เบาเสียงหน่อย / bao siiang noi / 声音小一点",
    antonym: "เสียงดัง / siiang dang / 声音大、吵",
    comparison: "เบาเสียง 是把声音调小，เงียบ 是安静下来。",
    collocation: "เด็กนอนอยู่ พูดเบา ๆ / dek naawn yuu phuut bao bao / 孩子在睡觉，小声说",
  },
  开关空调: {
    synonym: "ปรับแอร์ / bprap ae / 调空调",
    antonym: "ปิดแอร์ / bpit ae / 关空调",
    comparison: "เปิด/ปิด 是开关，ปรับ 是调高低或温度。",
    collocation: "แอร์เย็นเกินไป ปรับให้อุ่นขึ้นได้ไหม / ae yen goen bpai bprap hai un khuen dai mai / 空调太冷，可以调暖一点吗",
  },
  家庭安排: {
    synonym: "แบ่งงานบ้าน / baeng ngaan baan / 分担家务",
    antonym: "ทำคนเดียว / tham khon diao / 一个人做",
    comparison: "ผลัดกันทำ 表示轮流做，比单纯แบ่งงาน更强调轮换。",
    collocation: "วันนี้ใครทิ้งขยะ / wan nii khrai thing kha-ya / 今天谁倒垃圾",
  },
  厨房用餐: {
    synonym: "ทำอาหาร / tham aa-haan / 做饭",
    antonym: "กินข้าวนอกบ้าน / gin khaao naawk baan / 在外面吃",
    comparison: "ตั้งโต๊ะ 是摆桌，เก็บโต๊ะ 是饭后收桌。",
    collocation: "ช่วยตั้งโต๊ะก่อนกินข้าว / chuai dtang dtoh gaawn gin khaao / 吃饭前帮忙摆桌",
  },
  整理清洁: {
    synonym: "ทำความสะอาด / tham khwaam sa-aat / 打扫清洁",
    antonym: "วางรกรก / waang rok rok / 乱放",
    comparison: "เก็บห้อง 强调整理收拾，ทำความสะอาด 强调清洁打扫。",
    collocation: "เก็บของให้เรียบร้อย / gep khaawng hai riiap raawy / 把东西收整齐",
  },
  共用空间: {
    synonym: "พื้นที่รวม / phuen thii ruam / 共用区域",
    antonym: "ห้องส่วนตัว / haawng suan dtua / 私人房间",
    comparison: "ใช้ร่วมกัน 是共同使用，เปลี่ยนกันใช้ 是轮流使用。",
    collocation: "รักษาความสะอาดในพื้นที่รวม / rak-saa khwaam sa-aat nai phuen thii ruam / 在共用区域保持清洁",
  },
  礼貌协商: {
    synonym: "ถ้าสะดวก / thaa sa-duak / 如果方便",
    antonym: "สั่งตรง ๆ / sang dtrong dtrong / 直接命令",
    comparison: "家里也可以用礼貌表达，ถ้าสะดวก 比直接要求更柔和。",
    collocation: "ถ้าสะดวกช่วยทำหน่อยได้ไหม / thaa sa-duak chuai tham noi dai mai / 如果方便，可以帮忙做一下吗",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาอยู่บ้านกับครอบครัวหรือเพื่อนร่วมห้อง ฉันใช้คำว่า “${row[1]}” เพื่อขอความช่วยเหลืออย่างสุภาพ`,
  roman: `we-laa yuu baan gap khraawp khrua rue phuean ruam haawng chan chai kham waa "${row[2]}" phuea khaaw khwaam chuai luea yaang su-phaap`,
  chinese: `和家人或室友在家时，我会用“${row[1]}”来礼貌地请求帮助或协商。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "家里请求协商", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 家里请求与协商表达。适合请人做家务、借用东西、修东西、调整声音和安排家庭小事；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: BASIC_HOUSEHOLD_REQUESTS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_HOUSEHOLD_REQUESTS_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
