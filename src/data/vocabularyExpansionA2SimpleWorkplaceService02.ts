export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type SimpleWorkplaceServiceTheme =
  | "接待"
  | "排队"
  | "确认需求"
  | "处理小问题"
  | "交班"
  | "收银"
  | "清点"
  | "客服用语"
  | "预约等候"
  | "结束服务";

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
  theme: SimpleWorkplaceServiceTheme,
];

const SIMPLE_WORKPLACE_SERVICE_REFS = [
  "worker-a-a2-simple-workplace-service-02",
  "basic-thai-service-workplace",
];

const rows: Row[] = [
  ["dtawn-rap", "ต้อนรับ", "dtaawn rap", "接待；欢迎", "动词", "接待"],
  ["phu-rap-khaek", "ผู้รับแขก", "phuu rap khaek", "接待人员", "名词", "接待"],
  ["khaek", "แขก", "khaek", "客人；来访者", "名词", "接待"],
  ["luuk-khaa", "ลูกค้า", "luuk khaa", "顾客", "名词", "接待"],
  ["sawat-dii-khrap-kha", "สวัสดีครับ/ค่ะ", "sa-wat-dii khrap/kha", "您好", "短语", "接待"],
  ["yin-dii-dtawn-rap", "ยินดีต้อนรับ", "yin dii dtaawn rap", "欢迎光临", "短语", "接待"],
  ["maa-dtit-dtaaw-rueng-arai", "มาติดต่อเรื่องอะไร", "maa dtit dtaaw rueang a-rai", "来办理/联系什么事", "句型", "接待"],
  ["mi-nat-mai", "มีนัดไหม", "mii nat mai", "有预约吗", "句型", "接待"],
  ["choen-khang-nai", "เชิญข้างใน", "choen khaang nai", "请进里面", "句型", "接待"],
  ["choen-nang-raw", "เชิญนั่งรอ", "choen nang raaw", "请坐着等", "句型", "接待"],
  ["dtaaw-thaaeo", "ต่อแถว", "dtaaw thaaeo", "排队", "动词", "排队"],
  ["khao-khiu", "เข้าคิว", "khao khiu", "排队；进入队伍", "动词", "排队"],
  ["rap-bat-khiu", "รับบัตรคิว", "rap bat khiu", "取号", "动词", "排队"],
  ["bat-khiu", "บัตรคิว", "bat khiu", "排队号", "名词", "排队"],
  ["khiu-dtaaw-bpai", "คิวต่อไป", "khiu dtaaw bpai", "下一号", "名词", "排队"],
  ["riiak-khiu", "เรียกคิว", "riiak khiu", "叫号", "动词", "排队"],
  ["raw-khiu", "รอคิว", "raaw khiu", "等号；排队等候", "动词", "排队"],
  ["haam-saaeng-khiu", "ห้ามแซงคิว", "haam saaeng khiu", "禁止插队", "短语", "排队"],
  ["khiu-khaawng-khun", "คิวของคุณ", "khiu khaawng khun", "您的号码", "名词", "排队"],
  ["raw-sak-khruu", "รอสักครู่", "raaw sak khruu", "请稍等", "短语", "排队"],
  ["dtawng-gaan-arai", "ต้องการอะไร", "dtawng gaan a-rai", "需要什么", "句型", "确认需求"],
  ["dtawng-gaan-baaw-ri-gaan-arai", "ต้องการบริการอะไร", "dtawng gaan baaw-ri-gaan a-rai", "需要什么服务", "句型", "确认需求"],
  ["chai-baaw-ri-gaan-arai", "ใช้บริการอะไร", "chai baaw-ri-gaan a-rai", "办理什么服务", "句型", "确认需求"],
  ["khaaw-thaam-iik-khrang", "ขอถามอีกครั้ง", "khaaw thaam iik khrang", "请允许再问一次", "句型", "确认需求"],
  ["khaaw-yuen-yan", "ขอยืนยัน", "khaaw yuen yan", "请确认", "句型", "确认需求"],
  ["khaaw-chek-khaaw-muun", "ขอเช็กข้อมูล", "khaaw chek khaaw muun", "请核对资料", "句型", "确认需求"],
  ["khaaw-chue", "ขอชื่อ", "khaaw chue", "请提供姓名", "句型", "确认需求"],
  ["khaaw-boe-thoo", "ขอเบอร์โทร", "khaaw boe thoo", "请提供电话号码", "句型", "确认需求"],
  ["thuuk-dtawng-mai", "ถูกต้องไหม", "thuuk dtawng mai", "正确吗", "句型", "确认需求"],
  ["chai-rue-plao", "ใช่หรือเปล่า", "chai rue bplao", "是不是", "句型", "确认需求"],
  ["pan-haa-lek-noi", "ปัญหาเล็กน้อย", "bpan-haa lek noi", "小问题", "名词", "处理小问题"],
  ["mi-pan-haa", "มีปัญหา", "mii bpan-haa", "有问题", "句型", "处理小问题"],
  ["gae-pan-haa", "แก้ปัญหา", "gaae bpan-haa", "解决问题", "动词", "处理小问题"],
  ["chuai-gae-hai", "ช่วยแก้ให้", "chuai gaae hai", "帮忙处理", "动词", "处理小问题"],
  ["chek-iik-khrang", "เช็กอีกครั้ง", "chek iik khrang", "再检查一次", "短语", "处理小问题"],
  ["tham-mai", "ทำใหม่", "tham mai", "重新做", "动词", "处理小问题"],
  ["song-mai", "ส่งใหม่", "song mai", "重新发送/递送", "动词", "处理小问题"],
  ["bplian-hai", "เปลี่ยนให้", "bpliian hai", "帮忙更换", "动词", "处理小问题"],
  ["khaaw-a-phai", "ขออภัย", "khaaw a-phai", "抱歉", "短语", "处理小问题"],
  ["diao-ja-gae-hai", "เดี๋ยวจะแก้ให้", "diao ja gaae hai", "等一下会帮您处理", "句型", "处理小问题"],
  ["song-gaan", "ส่งงาน", "song ngaan", "交接工作；提交工作", "动词", "交班"],
  ["song-wen", "ส่งเวร", "song ween", "交班；交接值班", "动词", "交班"],
  ["rap-wen", "รับเวร", "rap ween", "接班", "动词", "交班"],
  ["bplian-ga", "เปลี่ยนกะ", "bpliian ga", "换班", "动词", "交班"],
  ["ga-chao", "กะเช้า", "ga chao", "早班", "名词", "交班"],
  ["ga-baai", "กะบ่าย", "ga baai", "下午班", "名词", "交班"],
  ["ga-duek", "กะดึก", "ga duek", "夜班", "名词", "交班"],
  ["jot-wai", "จดไว้", "jot wai", "记下来", "动词", "交班"],
  ["baawk-phuean-ruam-ngaan", "บอกเพื่อนร่วมงาน", "baawk phuean ruam ngaan", "告诉同事", "动词", "交班"],
  ["raai-ngaan-pan-haa", "รายงานปัญหา", "raai ngaan bpan-haa", "报告问题", "动词", "交班"],
  ["gep-ngoen", "เก็บเงิน", "gep ngoen", "收钱", "动词", "收银"],
  ["khit-ngoen", "คิดเงิน", "khit ngoen", "算钱；结账", "动词", "收银"],
  ["jaai-ngoen", "จ่ายเงิน", "jaai ngoen", "付款", "动词", "收银"],
  ["rap-ngoen", "รับเงิน", "rap ngoen", "收款", "动词", "收银"],
  ["ngoen-thawn", "เงินทอน", "ngoen thaawn", "找零", "名词", "收银"],
  ["thawn-ngoen", "ทอนเงิน", "thaawn ngoen", "找钱", "动词", "收银"],
  ["bai-set", "ใบเสร็จ", "bai-set", "收据", "名词", "收银"],
  ["awk-bai-set", "ออกใบเสร็จ", "awk bai-set", "开收据", "动词", "收银"],
  ["khrueng-khit-ngoen", "เครื่องคิดเงิน", "khreuuang khit ngoen", "收银机", "名词", "收银"],
  ["jaai-duai-bat", "จ่ายด้วยบัตร", "jaai duai bat", "用卡付款", "短语", "收银"],
  ["nap", "นับ", "nap", "数；清点", "动词", "清点"],
  ["nap-khaawng", "นับของ", "nap khaawng", "清点物品", "动词", "清点"],
  ["nap-ngoen", "นับเงิน", "nap ngoen", "点钱", "动词", "清点"],
  ["chek-stock", "เช็กสต็อก", "chek sa-dtok", "查库存", "动词", "清点"],
  ["stock-khaawng", "สต็อกของ", "sa-dtok khaawng", "货品库存", "名词", "清点"],
  ["khaawng-khrop", "ของครบ", "khaawng khrop", "东西齐全", "句型", "清点"],
  ["khaawng-khaat", "ของขาด", "khaawng khaat", "缺货；少东西", "句型", "清点"],
  ["khaawng-luea", "ของเหลือ", "khaawng luea", "剩余物品", "名词", "清点"],
  ["raai-gaan-khaawng", "รายการของ", "raai-gaan khaawng", "物品清单", "名词", "清点"],
  ["jot-jam-nuan", "จดจำนวน", "jot jam-nuan", "记录数量", "动词", "清点"],
  ["chuai-duu-hai-noi", "ช่วยดูให้หน่อย", "chuai duu hai noi", "请帮忙看一下", "句型", "客服用语"],
  ["khaaw-rab-guuan", "ขอรบกวน", "khaaw rop guan", "麻烦您", "短语", "客服用语"],
  ["mai-saduak", "ไม่สะดวก", "mai sa-duak", "不方便", "形容词", "客服用语"],
  ["dai-loei", "ได้เลย", "dai loei", "可以，没问题", "短语", "客服用语"],
  ["mai-bpen-rai", "ไม่เป็นไร", "mai bpen rai", "没关系", "短语", "客服用语"],
  ["khaaw-thoot-thii-hai-raw", "ขอโทษที่ให้รอ", "khaaw thoot thii hai raaw", "抱歉让您久等", "句型", "客服用语"],
  ["diao-damnoen-gaan-hai", "เดี๋ยวดำเนินการให้", "diao dam-noen gaan hai", "稍后为您办理", "句型", "客服用语"],
  ["khaaw-raai-la-iat", "ขอรายละเอียด", "khaaw raai la-iat", "请提供细节", "句型", "客服用语"],
  ["jaeng-hai-thraap", "แจ้งให้ทราบ", "jaaeng hai saap", "通知知悉", "动词", "客服用语"],
  ["dtit-dtaaw-glap", "ติดต่อกลับ", "dtit dtaaw glap", "回电/回联", "动词", "客服用语"],
  ["nat", "นัด", "nat", "预约；约定", "动词", "预约等候"],
  ["jaawng-khiu", "จองคิว", "jaawng khiu", "预约排号", "动词", "预约等候"],
  ["welaa-nat", "เวลานัด", "we-laa nat", "预约时间", "名词", "预约等候"],
  ["luean-nat", "เลื่อนนัด", "leuan nat", "改期；推迟预约", "动词", "预约等候"],
  ["yok-loek-nat", "ยกเลิกนัด", "yok loek nat", "取消预约", "动词", "预约等候"],
  ["ma-thueng-laew", "มาถึงแล้ว", "maa thueng laew", "已经到了", "句型", "预约等候"],
  ["raw-dtrong-nii", "รอตรงนี้", "raaw dtrong nii", "在这里等", "句型", "预约等候"],
  ["raw-bpra-maan", "รอประมาณ", "raaw bpra-maan", "大约等待", "短语", "预约等候"],
  ["iik-sip-naa-thii", "อีกสิบนาที", "iik sip naa-thii", "再十分钟", "短语", "预约等候"],
  ["thueng-khiu-laew", "ถึงคิวแล้ว", "thueng khiu laew", "轮到号了", "句型", "预约等候"],
  ["set-laew", "เสร็จแล้ว", "set laew", "已经完成", "句型", "结束服务"],
  ["riiap-raawy-laew", "เรียบร้อยแล้ว", "riiap raawy laew", "已经办好了", "句型", "结束服务"],
  ["mi-arai-iik-mai", "มีอะไรอีกไหม", "mii a-rai iik mai", "还有别的吗", "句型", "结束服务"],
  ["dtawng-gaan-arai-phoem-mai", "ต้องการอะไรเพิ่มไหม", "dtawng gaan a-rai phoem mai", "还需要补充什么吗", "句型", "结束服务"],
  ["khawp-khun-thii-mai", "ขอบคุณที่มา", "khaawp khun thii maa", "感谢您来", "句型", "结束服务"],
  ["khawp-khun-thii-chai-baaw-ri-gaan", "ขอบคุณที่ใช้บริการ", "khaawp khun thii chai baaw-ri-gaan", "感谢使用服务", "句型", "结束服务"],
  ["choen-mai-khrang-naa", "เชิญใหม่ครั้งหน้า", "choen mai khrang naa", "欢迎下次再来", "句型", "结束服务"],
  ["laa-gaawn-khrap-kha", "ลาก่อนครับ/ค่ะ", "laa gaawn khrap/kha", "再见", "短语", "结束服务"],
  ["wan-nii-set-thao-nii", "วันนี้เสร็จเท่านี้", "wan nii set thao nii", "今天到这里完成", "句型", "结束服务"],
  ["khaaw-hai-wan-dii", "ขอให้วันดี", "khaaw hai wan dii", "祝您今天愉快", "句型", "结束服务"],
];

const relatedByTheme: Record<
  SimpleWorkplaceServiceTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  接待: {
    synonym: "ต้อนรับ / dtaawn rap / 接待、欢迎",
    antonym: "ไม่รับแขก / mai rap khaek / 不接待客人",
    comparison: "ต้อนรับ 是接待动作，ยินดีต้อนรับ 是常见欢迎用语。",
    collocation: "ต้อนรับลูกค้าอย่างสุภาพ / dtaawn rap luuk khaa yaang su-phaap / 礼貌接待顾客",
  },
  排队: {
    synonym: "เข้าคิว / khao khiu / 排队",
    antonym: "แซงคิว / saaeng khiu / 插队",
    comparison: "บัตรคิว 是号码牌，เรียกคิว 是叫号。",
    collocation: "รับบัตรคิวแล้วรอสักครู่ / rap bat khiu laew raaw sak khruu / 取号后请稍等",
  },
  确认需求: {
    synonym: "ขอยืนยัน / khaaw yuen yan / 请确认",
    antonym: "ยังไม่แน่ใจ / yang mai nae jai / 还不确定",
    comparison: "ต้องการอะไร 直接问需求，ขอเช็กข้อมูล 更像核对资料。",
    collocation: "ขอยืนยันข้อมูลอีกครั้ง / khaaw yuen yan khaaw muun iik khrang / 请再次确认资料",
  },
  处理小问题: {
    synonym: "แก้ปัญหา / gaae bpan-haa / 解决问题",
    antonym: "ปล่อยไว้ / bplaawy wai / 放着不处理",
    comparison: "แก้问题是处理问题，ทำใหม่ 是重做，เปลี่ยนให้ 是更换。",
    collocation: "ขออภัย เดี๋ยวจะแก้ให้ / khaaw a-phai diao ja gaae hai / 抱歉，稍后会帮您处理",
  },
  交班: {
    synonym: "ส่งเวร / song ween / 交班",
    antonym: "รับเวร / rap ween / 接班",
    comparison: "ส่งเวร 是把值班事项交出，รับเวร 是接下班次。",
    collocation: "จดปัญหาไว้ก่อนส่งเวร / jot bpan-haa wai gaawn song ween / 交班前记下问题",
  },
  收银: {
    synonym: "คิดเงิน / khit ngoen / 结账",
    antonym: "ยังไม่จ่าย / yang mai jaai / 还没付款",
    comparison: "คิดเงิน 是算钱结账，รับเงิน 是收款，ทอนเงิน 是找零。",
    collocation: "คิดเงินและออกใบเสร็จ / khit ngoen lae awk bai-set / 结账并开收据",
  },
  清点: {
    synonym: "นับของ / nap khaawng / 清点物品",
    antonym: "ของขาด / khaawng khaat / 缺货、少东西",
    comparison: "นับ 是数数量，เช็กสต็อก 是查库存。",
    collocation: "นับของตามรายการ / nap khaawng dtaam raai-gaan / 按清单清点物品",
  },
  客服用语: {
    synonym: "ขอรบกวน / khaaw rop guan / 麻烦您",
    antonym: "พูดไม่สุภาพ / phuut mai su-phaap / 说话不礼貌",
    comparison: "服务场景多用 ขอรบกวน、ขออภัย、ช่วย...ให้หน่อย 来降低语气。",
    collocation: "ขอรายละเอียดเพื่อดำเนินการ / khaaw raai la-iat phuea dam-noen gaan / 请提供细节以便办理",
  },
  预约等候: {
    synonym: "เวลานัด / we-laa nat / 预约时间",
    antonym: "ไม่มีนัด / mai mii nat / 没有预约",
    comparison: "นัด 是预约或约定，จองคิว 更强调预约排号。",
    collocation: "มาถึงแล้วและรอคิว / maa thueng laew lae raaw khiu / 已经到达并等号",
  },
  结束服务: {
    synonym: "เรียบร้อยแล้ว / riiap raawy laew / 已办好",
    antonym: "ยังไม่เสร็จ / yang mai set / 还没完成",
    comparison: "เสร็จแล้ว 是完成，เรียบร้อยแล้ว 更像服务已妥善办好。",
    collocation: "ขอบคุณที่ใช้บริการ / khaawp khun thii chai baaw-ri-gaan / 感谢使用服务",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในงานบริการพื้นฐาน พนักงานใช้คำว่า “${row[1]}” เพื่อสื่อสารกับลูกค้าให้สุภาพและชัดเจน`,
  roman: `nai ngaan baaw-ri-gaan phuen-thaan pha-nak-ngaan chai kham waa "${row[2]}" phuea sue-saan gap luuk khaa hai su-phaap lae chat-jen`,
  chinese: `在基础服务工作中，员工会用“${row[1]}”和顾客礼貌、清楚地沟通。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "基础职场服务", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 服务业和基础职场表达。适合接待、排队、确认需求、处理小问题、交班、收银和清点；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: SIMPLE_WORKPLACE_SERVICE_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_SIMPLE_WORKPLACE_SERVICE_02: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
