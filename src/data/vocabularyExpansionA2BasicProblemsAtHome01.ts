export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type BasicProblemsAtHomeTheme =
  | "没水没电"
  | "门锁"
  | "厕所堵"
  | "虫子"
  | "噪音"
  | "空调坏"
  | "灯不亮"
  | "东西找不到"
  | "报修处理"
  | "临时办法";

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
  theme: BasicProblemsAtHomeTheme,
];

const BASIC_PROBLEMS_AT_HOME_REFS = [
  "worker-a-a2-basic-problems-at-home",
  "basic-thai-home-problems",
];

const rows: Row[] = [
  ["naam-mai-lai-thang-baan", "น้ำไม่ไหลทั้งบ้าน", "naam mai lai thang baan", "全家都没水", "句型", "没水没电"],
  ["naam-lai-baao-mak", "น้ำไหลเบามาก", "naam lai bao maak", "水流很小", "句型", "没水没电"],
  ["naam-yut-gathanhan", "น้ำหยุดกะทันหัน", "naam yut ga-than-han", "突然停水", "句型", "没水没电"],
  ["mi-naam-khun", "มีน้ำขุ่น", "mii naam khun", "水浑浊", "句型", "没水没电"],
  ["gawk-naam-rua", "ก๊อกน้ำรั่ว", "gaawk naam rua", "水龙头漏水", "句型", "没水没电"],
  ["fai-dap-thang-baan", "ไฟดับทั้งบ้าน", "fai dap thang baan", "全家停电", "句型", "没水没电"],
  ["fai-dap-bang-hong", "ไฟดับบางห้อง", "fai dap baang haawng", "有些房间停电", "句型", "没水没电"],
  ["bplak-fai-chai-mai-dai", "ปลั๊กไฟใช้ไม่ได้", "bplak fai chai mai dai", "插座不能用", "句型", "没水没电"],
  ["sai-fai-duu-an-ta-raai", "สายไฟดูอันตราย", "saai fai duu an-dta-raai", "电线看起来危险", "句型", "没水没电"],
  ["dtawng-bpra-yat-naam-fai", "ต้องประหยัดน้ำไฟ", "dtawng bpra-yat naam fai", "需要节约水电", "句型", "没水没电"],
  ["glawn-bpra-dtuu", "กลอนประตู", "glaawn bpra-dtuu", "门闩；门锁结构", "名词", "门锁"],
  ["guun-jae", "กุญแจ", "gun-jae", "钥匙；锁", "名词", "门锁"],
  ["guun-jae-haai", "กุญแจหาย", "gun-jae haai", "钥匙丢了", "句型", "门锁"],
  ["luem-guun-jae", "ลืมกุญแจ", "luem gun-jae", "忘带钥匙", "动词", "门锁"],
  ["bpoet-bpra-dtuu-mai-dai", "เปิดประตูไม่ได้", "bpoet bpra-dtuu mai dai", "打不开门", "句型", "门锁"],
  ["bpit-bpra-dtuu-mai-sanit", "ปิดประตูไม่สนิท", "bpit bpra-dtuu mai sa-nit", "门关不严", "句型", "门锁"],
  ["bpra-dtuu-dtit", "ประตูติด", "bpra-dtuu dtit", "门卡住", "句型", "门锁"],
  ["lok-mai-dai", "ล็อกไม่ได้", "lok mai dai", "锁不上", "句型", "门锁"],
  ["lok-yuu-khaang-nai", "ล็อกอยู่ข้างใน", "lok yuu khaang nai", "从里面锁着", "句型", "门锁"],
  ["dtawng-riiak-chaang-glawn", "ต้องเรียกช่างกลอน", "dtawng riiak chaang glaawn", "需要叫锁匠", "句型", "门锁"],
  ["suam-dtan", "ส้วมตัน", "suam dtan", "厕所堵了", "句型", "厕所堵"],
  ["chak-khrok-dtan", "ชักโครกตัน", "chak-khrook dtan", "马桶堵了", "句型", "厕所堵"],
  ["naam-mai-long", "น้ำไม่ลง", "naam mai long", "水下不去", "句型", "厕所堵"],
  ["hong-naam-mii-glin", "ห้องน้ำมีกลิ่น", "haawng naam mii glin", "厕所有味道", "句型", "厕所堵"],
  ["thaw-naam-dtan", "ท่อน้ำตัน", "thaaw naam dtan", "水管堵了", "句型", "厕所堵"],
  ["naam-lon", "น้ำล้น", "naam lon", "水溢出来", "动词", "厕所堵"],
  ["chaak-naam-mai-dai", "ชักน้ำไม่ได้", "chak naam mai dai", "冲不了水", "句型", "厕所堵"],
  ["dtawng-chai-thii-bpam", "ต้องใช้ที่ปั๊ม", "dtawng chai thii bpam", "需要用疏通器", "句型", "厕所堵"],
  ["khaaw-yaa-tham-dtan", "ขออย่าทำตัน", "khaaw yaa tham dtan", "请不要弄堵", "句型", "厕所堵"],
  ["jaeng-saawm-hong-naam", "แจ้งซ่อมห้องน้ำ", "jaaeng saawm haawng naam", "报修卫生间", "动词", "厕所堵"],
  ["ma-laeng", "แมลง", "ma-laaeng", "虫子", "名词", "虫子"],
  ["yung", "ยุง", "yung", "蚊子", "名词", "虫子"],
  ["mot", "มด", "mot", "蚂蚁", "名词", "虫子"],
  ["maeng-saap", "แมลงสาบ", "ma-laaeng saap", "蟑螂", "名词", "虫子"],
  ["jing-jok", "จิ้งจก", "jing-jok", "壁虎", "名词", "虫子"],
  ["ma-laeng-khao-baan", "แมลงเข้าบ้าน", "ma-laaeng khao baan", "虫子进家里", "句型", "虫子"],
  ["mot-khuen-aa-haan", "มดขึ้นอาหาร", "mot khuen aa-haan", "蚂蚁爬到食物上", "句型", "虫子"],
  ["yung-gat", "ยุงกัด", "yung gat", "蚊子咬", "动词", "虫子"],
  ["chaai-yaa-gan-yung", "ใช้ยากันยุง", "chai yaa gan yung", "使用驱蚊药", "动词", "虫子"],
  ["dtawng-gap-aa-haan", "ต้องเก็บอาหาร", "dtawng gep aa-haan", "需要把食物收起来", "句型", "虫子"],
  ["siang-khaang-baan-dang", "เสียงข้างบ้านดัง", "siiang khaang baan dang", "邻居家声音大", "句型", "噪音"],
  ["siang-doen-bon-phuen", "เสียงเดินบนพื้น", "siiang doen bon phuen", "地板上的脚步声", "名词", "噪音"],
  ["siang-thiiwii-dang", "เสียงทีวีดัง", "siiang thii-wii dang", "电视声很大", "句型", "噪音"],
  ["siang-phleng-dang", "เสียงเพลงดัง", "siiang phleeng dang", "音乐声很大", "句型", "噪音"],
  ["siang-saawm-baan", "เสียงซ่อมบ้าน", "siiang saawm baan", "装修/修房子的声音", "名词", "噪音"],
  ["nawn-mai-lap-phraw-siang", "นอนไม่หลับเพราะเสียง", "naawn mai lap phraw siiang", "因为噪音睡不着", "句型", "噪音"],
  ["khaaw-hai-bao-siang", "ขอให้เบาเสียง", "khaaw hai bao siiang", "请求小声一点", "句型", "噪音"],
  ["siang-dang-dtaawn-duek", "เสียงดังตอนดึก", "siiang dang dtaawn duek", "深夜声音大", "句型", "噪音"],
  ["jaeng-rueng-siang-dang", "แจ้งเรื่องเสียงดัง", "jaaeng rueang siiang dang", "反映噪音问题", "动词", "噪音"],
  ["dtawng-kaan-khwaam-ngiap", "ต้องการความเงียบ", "dtawng gaan khwaam ngiiap", "需要安静", "句型", "噪音"],
  ["air-sia", "แอร์เสีย", "ae siia", "空调坏了", "句型", "空调坏"],
  ["air-mai-yen-loei", "แอร์ไม่เย็นเลย", "ae mai yen loei", "空调一点也不冷", "句型", "空调坏"],
  ["air-mii-siang", "แอร์มีเสียง", "ae mii siiang", "空调有声音", "句型", "空调坏"],
  ["air-naam-yot", "แอร์น้ำหยด", "ae naam yot", "空调滴水", "句型", "空调坏"],
  ["remote-air-haai", "รีโมตแอร์หาย", "rii-moot ae haai", "空调遥控器不见了", "句型", "空调坏"],
  ["prap-air-mai-dai", "ปรับแอร์ไม่ได้", "bprap ae mai dai", "调不了空调", "句型", "空调坏"],
  ["air-bpit-eng", "แอร์ปิดเอง", "ae bpit eng", "空调自己关了", "句型", "空调坏"],
  ["dtawng-laang-air", "ต้องล้างแอร์", "dtawng laang ae", "需要清洗空调", "句型", "空调坏"],
  ["jaeng-saawm-air", "แจ้งซ่อมแอร์", "jaaeng saawm ae", "报修空调", "动词", "空调坏"],
  ["chaang-air", "ช่างแอร์", "chaang ae", "空调维修师傅", "名词", "空调坏"],
  ["fai-mai-dtit", "ไฟไม่ติด", "fai mai dtit", "灯不亮", "句型", "灯不亮"],
  ["laam-fai-sia", "หลอดไฟเสีย", "laawt fai siia", "灯泡坏了", "句型", "灯不亮"],
  ["laam-fai-khaat", "หลอดไฟขาด", "laawt fai khaat", "灯泡断了/烧了", "句型", "灯不亮"],
  ["bpit-bpoet-fai-mai-dai", "ปิดเปิดไฟไม่ได้", "bpit bpoet fai mai dai", "灯开关不了", "句型", "灯不亮"],
  ["sa-wit-fai-sia", "สวิตช์ไฟเสีย", "sa-wit fai siia", "电灯开关坏了", "句型", "灯不亮"],
  ["hong-muet", "ห้องมืด", "haawng muet", "房间很暗", "句型", "灯不亮"],
  ["dtawng-bplian-laam-fai", "ต้องเปลี่ยนหลอดไฟ", "dtawng bpliian laawt fai", "需要换灯泡", "句型", "灯不亮"],
  ["fai-graphrip", "ไฟกะพริบ", "fai ga-phrip", "灯闪烁", "句型", "灯不亮"],
  ["bplak-fai-sia", "ปลั๊กไฟเสีย", "bplak fai siia", "插座坏了", "句型", "灯不亮"],
  ["jaeng-saawm-fai", "แจ้งซ่อมไฟ", "jaaeng saawm fai", "报修电灯/电力", "动词", "灯不亮"],
  ["haa-mai-joe", "หาไม่เจอ", "haa mai joe", "找不到", "句型", "东西找不到"],
  ["khaawng-haai", "ของหาย", "khaawng haai", "东西丢了", "句型", "东西找不到"],
  ["wang-wai-thii-nai", "วางไว้ที่ไหน", "waang wai thii nai", "放在哪里了", "句型", "东西找不到"],
  ["jam-mai-dai-waa-wang-thii-nai", "จำไม่ได้ว่าวางที่ไหน", "jam mai dai waa waang thii nai", "不记得放在哪里", "句型", "东西找不到"],
  ["haa-guun-jae-mai-joe", "หากุญแจไม่เจอ", "haa gun-jae mai joe", "找不到钥匙", "句型", "东西找不到"],
  ["haa-mue-thue-mai-joe", "หามือถือไม่เจอ", "haa mue-thue mai joe", "找不到手机", "句型", "东西找不到"],
  ["duu-nai-gra-bpao-laew", "ดูในกระเป๋าแล้ว", "duu nai gra-bpao laew", "已经看过包里了", "句型", "东西找不到"],
  ["chuai-haa-noi", "ช่วยหาหน่อย", "chuai haa noi", "请帮忙找一下", "句型", "东西找不到"],
  ["jer-laew", "เจอแล้ว", "joe laew", "找到了", "句型", "东西找不到"],
  ["yang-mai-joe", "ยังไม่เจอ", "yang mai joe", "还没找到", "句型", "东西找不到"],
  ["jaeng-saawm", "แจ้งซ่อม", "jaaeng saawm", "报修", "动词", "报修处理"],
  ["riiak-chaang", "เรียกช่าง", "riiak chaang", "叫维修师傅", "动词", "报修处理"],
  ["chaang-saawm", "ช่างซ่อม", "chaang saawm", "维修师傅", "名词", "报修处理"],
  ["khaaw-boe-chaang", "ขอเบอร์ช่าง", "khaaw boe chaang", "要维修师傅电话", "句型", "报修处理"],
  ["naat-chaang", "นัดช่าง", "nat chaang", "约维修师傅", "动词", "报修处理"],
  ["chaang-ja-maa-muea-rai", "ช่างจะมาเมื่อไร", "chaang ja maa muea rai", "师傅什么时候来", "句型", "报修处理"],
  ["saawm-set-laew-mai", "ซ่อมเสร็จแล้วไหม", "saawm set laew mai", "修好了吗", "句型", "报修处理"],
  ["khaa-saawm-thao-rai", "ค่าซ่อมเท่าไร", "khaa saawm thao rai", "维修费多少", "句型", "报修处理"],
  ["thaai-ruup-sent-hai-duu", "ถ่ายรูปส่งให้ดู", "thaai ruup song hai duu", "拍照发给对方看", "动词", "报修处理"],
  ["khaaw-hai-gae-duan", "ขอให้แก้ด่วน", "khaaw hai gaae duan", "请求尽快处理", "句型", "报修处理"],
  ["chai-chua-khraao", "ใช้ชั่วคราว", "chai chua-khraao", "临时使用", "动词", "临时办法"],
  ["yuu-bpai-gaawn", "อยู่ไปก่อน", "yuu bpai gaawn", "先将就住着/用着", "短语", "临时办法"],
  ["raw-saawm", "รอซ่อม", "raaw saawm", "等维修", "动词", "临时办法"],
  ["chai-aan-uen-gaawn", "ใช้อันอื่นก่อน", "chai an uen gaawn", "先用别的", "句型", "临时办法"],
  ["yuen-khaawng-phuean", "ยืมของเพื่อน", "yuem khaawng phuean", "借朋友的东西", "动词", "临时办法"],
  ["bpai-yuu-thii-uen-gaawn", "ไปอยู่ที่อื่นก่อน", "bpai yuu thii uen gaawn", "先去别处待着", "句型", "临时办法"],
  ["bpoet-naa-taang-gaawn", "เปิดหน้าต่างก่อน", "bpoet naa-dtaang gaawn", "先开窗", "句型", "临时办法"],
  ["chai-phat-lom-thaen", "ใช้พัดลมแทน", "chai phat-lom thaaen", "改用风扇", "句型", "临时办法"],
  ["gep-khaawng-hai-bplaawt-phai", "เก็บของให้ปลอดภัย", "gep khaawng hai bplaawt-phai", "把东西收安全", "句型", "临时办法"],
  ["diao-khaawy-gae", "เดี๋ยวค่อยแก้", "diao khaawy gaae", "等一下再处理", "句型", "临时办法"],
];

const relatedByTheme: Record<
  BasicProblemsAtHomeTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  没水没电: {
    synonym: "น้ำไม่ไหล / naam mai lai / 停水",
    antonym: "น้ำไหลปกติ / naam lai bpok-ga-dti / 水正常流",
    comparison: "น้ำไม่ไหล 是停水，ไฟดับ 是停电，两个都常用于家里报修。",
    collocation: "ไฟดับทั้งบ้านและน้ำไม่ไหล / fai dap thang baan lae naam mai lai / 全家停电又没水",
  },
  门锁: {
    synonym: "กุญแจหาย / gun-jae haai / 钥匙丢了",
    antonym: "เปิดประตูได้ / bpoet bpra-dtuu dai / 能开门",
    comparison: "กุญแจ 可指钥匙也可指锁，ประตูติด 是门卡住。",
    collocation: "ลืมกุญแจเลยเปิดประตูไม่ได้ / luem gun-jae loei bpoet bpra-dtuu mai dai / 忘带钥匙所以打不开门",
  },
  厕所堵: {
    synonym: "ชักโครกตัน / chak-khrook dtan / 马桶堵了",
    antonym: "น้ำลงปกติ / naam long bpok-ga-dti / 下水正常",
    comparison: "ตัน 表示堵住，น้ำไม่ลง 表示水下不去。",
    collocation: "ห้องน้ำตัน ต้องแจ้งซ่อม / haawng naam dtan dtawng jaaeng saawm / 厕所堵了，需要报修",
  },
  虫子: {
    synonym: "แมลง / ma-laaeng / 虫子",
    antonym: "ไม่มีแมลง / mai mii ma-laaeng / 没有虫子",
    comparison: "ยุง 是蚊子，มด 是蚂蚁，แมลงสาบ 是蟑螂。",
    collocation: "เก็บอาหารเพราะมดขึ้น / gep aa-haan phraw mot khuen / 因为蚂蚁爬上食物，要把食物收起来",
  },
  噪音: {
    synonym: "เสียงดัง / siiang dang / 声音大、吵",
    antonym: "เงียบ / ngiiap / 安静",
    comparison: "เสียงข้างบ้านดัง 是邻居家吵，เสียงซ่อมบ้าน 是维修/装修声。",
    collocation: "นอนไม่หลับเพราะเสียงดัง / naawn mai lap phraw siiang dang / 因为噪音睡不着",
  },
  空调坏: {
    synonym: "แอร์เสีย / ae siia / 空调坏了",
    antonym: "แอร์ใช้ได้ / ae chai dai / 空调能用",
    comparison: "แอร์ไม่เย็น 是不制冷，แอร์น้ำหยด 是滴水。",
    collocation: "แจ้งซ่อมแอร์เพราะแอร์ไม่เย็น / jaaeng saawm ae phraw ae mai yen / 因为空调不冷而报修",
  },
  灯不亮: {
    synonym: "ไฟไม่ติด / fai mai dtit / 灯不亮",
    antonym: "ไฟติด / fai dtit / 灯亮",
    comparison: "หลอดไฟเสีย 是灯泡坏，สวิตช์ไฟเสีย 是开关坏。",
    collocation: "ต้องเปลี่ยนหลอดไฟในห้อง / dtawng bpliian laawt fai nai haawng / 需要换房间里的灯泡",
  },
  东西找不到: {
    synonym: "หาไม่เจอ / haa mai joe / 找不到",
    antonym: "เจอแล้ว / joe laew / 找到了",
    comparison: "ของหาย 是东西丢了，หาไม่เจอ 是暂时找不到。",
    collocation: "ช่วยหากุญแจหน่อย / chuai haa gun-jae noi / 请帮忙找钥匙",
  },
  报修处理: {
    synonym: "แจ้งซ่อม / jaaeng saawm / 报修",
    antonym: "ยังไม่แจ้ง / yang mai jaaeng / 还没报",
    comparison: "เรียกช่าง 是叫师傅，นัดช่าง 是约师傅时间。",
    collocation: "ถ่ายรูปส่งให้ช่างดู / thaai ruup song hai chaang duu / 拍照发给师傅看",
  },
  临时办法: {
    synonym: "ใช้ชั่วคราว / chai chua-khraao / 临时使用",
    antonym: "แก้ถาวร / gaae thaa-waawn / 永久解决",
    comparison: "ก่อน 表示先这样处理，แทน 表示用某物代替。",
    collocation: "ใช้พัดลมแทนระหว่างรอซ่อมแอร์ / chai phat-lom thaaen ra-waang raaw saawm ae / 等修空调时先用风扇代替",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เมื่อมีปัญหาเล็ก ๆ ที่บ้าน ฉันใช้คำว่า “${row[1]}” เพื่อบอกอาการและขอให้ช่วยแก้ได้ชัดเจน`,
  roman: `muea mii bpan-haa lek lek thii baan chan chai kham waa "${row[2]}" phuea baawk aa-gaan lae khaaw hai chuai gaae dai chat-jen`,
  chinese: `家里有小问题时，我会用“${row[1]}”把情况说清楚，并请求帮忙处理。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "家里小问题", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 家里小问题表达。适合说明没水没电、门锁、厕所堵、虫子、噪音、空调坏、灯不亮和东西找不到；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: BASIC_PROBLEMS_AT_HOME_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_PROBLEMS_AT_HOME_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
