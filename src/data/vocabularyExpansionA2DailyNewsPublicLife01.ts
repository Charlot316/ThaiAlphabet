export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type DailyNewsPublicLifeTheme =
  | "新闻"
  | "活动"
  | "交通"
  | "天气"
  | "政策通知"
  | "社区事件"
  | "公共服务"
  | "安全提醒"
  | "生活变化"
  | "信息来源";

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
  theme: DailyNewsPublicLifeTheme,
];

const DAILY_NEWS_PUBLIC_LIFE_REFS = [
  "worker-a-a2-daily-news-public-life",
  "basic-thai-public-life-news",
];

const rows: Row[] = [
  ["khaao", "ข่าว", "khaao", "新闻；消息", "名词", "新闻"],
  ["khaao-wan-nii", "ข่าววันนี้", "khaao wan nii", "今日新闻", "名词", "新闻"],
  ["khaao-thaawng-thin", "ข่าวท้องถิ่น", "khaao thaawng thin", "本地新闻", "名词", "新闻"],
  ["khaao-duan", "ข่าวด่วน", "khaao duan", "快讯；紧急新闻", "名词", "新闻"],
  ["khaao-sam-khan", "ข่าวสำคัญ", "khaao sam-khan", "重要新闻", "名词", "新闻"],
  ["aan-khaao", "อ่านข่าว", "aan khaao", "读新闻", "动词", "新闻"],
  ["duu-khaao", "ดูข่าว", "duu khaao", "看新闻", "动词", "新闻"],
  ["fang-khaao", "ฟังข่าว", "fang khaao", "听新闻", "动词", "新闻"],
  ["raai-ngaan", "รายงาน", "raai ngaan", "报道；报告", "动词", "新闻"],
  ["phuu-sue-khaao", "ผู้สื่อข่าว", "phuu sue khaao", "记者", "名词", "新闻"],
  ["sue", "สื่อ", "sue", "媒体；媒介", "名词", "新闻"],
  ["rueng-nii", "เรื่องนี้", "rueang nii", "这件事；这个话题", "名词", "新闻"],
  ["git-ja-gam", "กิจกรรม", "git-ja-gam", "活动", "名词", "活动"],
  ["ngaan", "งาน", "ngaan", "活动；工作；典礼", "名词", "活动"],
  ["ngaan-bpra-jam-bpii", "งานประจำปี", "ngaan bpra-jam bpii", "年度活动", "名词", "活动"],
  ["ngaan-wat", "งานวัด", "ngaan wat", "庙会", "名词", "活动"],
  ["ngaan-gii-laa", "งานกีฬา", "ngaan gii-laa", "体育活动", "名词", "活动"],
  ["ngaan-don-dtrii", "งานดนตรี", "ngaan don-dtrii", "音乐活动", "名词", "活动"],
  ["ngaan-aa-saa", "งานอาสา", "ngaan aa-saa", "志愿活动", "名词", "活动"],
  ["khao-ruam-git-ja-gam", "เข้าร่วมกิจกรรม", "khao ruam git-ja-gam", "参加活动", "动词", "活动"],
  ["jat-git-ja-gam", "จัดกิจกรรม", "jat git-ja-gam", "举办活动", "动词", "活动"],
  ["yok-loek-git-ja-gam", "ยกเลิกกิจกรรม", "yok loek git-ja-gam", "取消活动", "动词", "活动"],
  ["leuan-git-ja-gam", "เลื่อนกิจกรรม", "leuan git-ja-gam", "推迟活动", "动词", "活动"],
  ["jaraajon", "จราจร", "ja-raa-jaawn", "交通；交通状况", "名词", "交通"],
  ["rot-dtit", "รถติด", "rot dtit", "堵车", "形容词", "交通"],
  ["rot-tit-mak", "รถติดมาก", "rot dtit maak", "非常堵车", "句型", "交通"],
  ["ubad-ti-het", "อุบัติเหตุ", "u-bat-dti-heet", "事故", "名词", "交通"],
  ["ubad-ti-het-rot", "อุบัติเหตุรถ", "u-bat-dti-heet rot", "交通事故", "名词", "交通"],
  ["thaang-bpit", "ทางปิด", "thaang bpit", "道路关闭", "名词", "交通"],
  ["thaang-bpoet", "ทางเปิด", "thaang bpoet", "道路开放", "名词", "交通"],
  ["tham-thaang", "ทำทาง", "tham thaang", "修路", "动词", "交通"],
  ["saawm-thaang", "ซ่อมทาง", "saawm thaang", "维修道路", "动词", "交通"],
  ["liang-thaang", "เลี่ยงทาง", "liiang thaang", "绕路；避开路线", "动词", "交通"],
  ["chai-thaang-uen", "ใช้ทางอื่น", "chai thaang uen", "使用其他道路", "句型", "交通"],
  ["fon-dtok", "ฝนตก", "fon dtok", "下雨", "动词", "天气"],
  ["fon-dtok-nak", "ฝนตกหนัก", "fon dtok nak", "下大雨", "句型", "天气"],
  ["fon-yut-laew", "ฝนหยุดแล้ว", "fon yut laew", "雨停了", "句型", "天气"],
  ["aa-gaat-raawn", "อากาศร้อน", "aa-gaat raawn", "天气热", "句型", "天气"],
  ["aa-gaat-yen", "อากาศเย็น", "aa-gaat yen", "天气凉", "句型", "天气"],
  ["aa-gaat-dii", "อากาศดี", "aa-gaat dii", "天气好", "句型", "天气"],
  ["phaa-yu", "พายุ", "phaa-yu", "暴风雨；风暴", "名词", "天气"],
  ["lom-raeng", "ลมแรง", "lom raaeng", "风大", "句型", "天气"],
  ["naam-thuam", "น้ำท่วม", "naam thuam", "水灾；淹水", "动词", "天气"],
  ["fa-kha-nong", "ฟ้าคะนอง", "faa kha-naawng", "雷雨", "名词", "天气"],
  ["jaeng-dteuan-aa-gaat", "แจ้งเตือนอากาศ", "jaaeng dteuan aa-gaat", "天气提醒", "名词", "天气"],
  ["khuan-phok-rom", "ควรพกร่ม", "khuan phok rom", "应该带伞", "句型", "天气"],
  ["bpra-gaat", "ประกาศ", "bpra-gaat", "公告；宣布", "名词", "政策通知"],
  ["bpra-gaat-mai", "ประกาศใหม่", "bpra-gaat mai", "新公告", "名词", "政策通知"],
  ["khaaw-jaeng", "ข่าวแจ้ง", "khaao jaaeng", "通知消息", "名词", "政策通知"],
  ["kham-sang", "คำสั่ง", "kham sang", "命令；规定要求", "名词", "政策通知"],
  ["kot-mai", "กฎใหม่", "got mai", "新规则", "名词", "政策通知"],
  ["kot-khaawng-chumchon", "กฎของชุมชน", "got khaawng chum-chon", "社区规则", "名词", "政策通知"],
  ["nayobai", "นโยบาย", "na-yo-baai", "政策；方针", "名词", "政策通知"],
  ["nayobai-mai", "นโยบายใหม่", "na-yo-baai mai", "新政策", "名词", "政策通知"],
  ["plian-got", "เปลี่ยนกฎ", "bpliian got", "改变规则", "动词", "政策通知"],
  ["roem-chai", "เริ่มใช้", "roem chai", "开始使用；开始执行", "动词", "政策通知"],
  ["mi-phon-wan-nii", "มีผลวันนี้", "mii phon wan nii", "今天生效", "句型", "政策通知"],
  ["hai-thuk-khon-thraap", "ให้ทุกคนทราบ", "hai thuk khon saap", "让大家知悉", "句型", "政策通知"],
  ["chumchon", "ชุมชน", "chum-chon", "社区", "名词", "社区事件"],
  ["phuen-thii", "พื้นที่", "phuen thii", "区域；地区", "名词", "社区事件"],
  ["khon-nai-chumchon", "คนในชุมชน", "khon nai chum-chon", "社区里的人", "名词", "社区事件"],
  ["talat-nat", "ตลาดนัด", "dta-laat nat", "集市；临时市场", "名词", "社区事件"],
  ["bpra-chum-chumchon", "ประชุมชุมชน", "bpra-chum chum-chon", "社区会议", "名词", "社区事件"],
  ["ngaan-chumchon", "งานชุมชน", "ngaan chum-chon", "社区活动", "名词", "社区事件"],
  ["tham-khwaam-sa-aat-chumchon", "ทำความสะอาดชุมชน", "tham khwaam sa-aat chum-chon", "打扫社区", "动词", "社区事件"],
  ["saawm-fai", "ซ่อมไฟ", "saawm fai", "修电灯/电力", "动词", "社区事件"],
  ["dtap-fai", "ดับไฟ", "dap fai", "停电；灭火", "动词", "社区事件"],
  ["naam-mai-lai", "น้ำไม่ไหล", "naam mai lai", "停水；水不流", "句型", "社区事件"],
  ["siang-dang", "เสียงดัง", "siiang dang", "声音大；噪音", "形容词", "社区事件"],
  ["khong-haai", "ของหาย", "khaawng haai", "东西丢了", "句型", "社区事件"],
  ["baaw-ri-gaan-saa-thaa-ra-na", "บริการสาธารณะ", "baaw-ri-gaan saa-thaa-ra-na", "公共服务", "名词", "公共服务"],
  ["rong-pha-yaa-baan", "โรงพยาบาล", "roong pha-yaa-baan", "医院", "名词", "公共服务"],
  ["sathaanii-dtamruat", "สถานีตำรวจ", "sa-thaa-nii dtam-ruat", "警察局", "名词", "公共服务"],
  ["thi-waakan-amphoe", "ที่ว่าการอำเภอ", "thii waa gaan am-phoe", "区/县办事处", "名词", "公共服务"],
  ["sa-nak-ngaan-khet", "สำนักงานเขต", "sam-nak-ngaan kheet", "区办公室", "名词", "公共服务"],
  ["rot-pha-yaa-baan", "รถพยาบาล", "rot pha-yaa-baan", "救护车", "名词", "公共服务"],
  ["jao-naa-thii", "เจ้าหน้าที่", "jao naa thii", "工作人员；公务人员", "名词", "公共服务"],
  ["dtit-dtaaw-jao-naa-thii", "ติดต่อเจ้าหน้าที่", "dtit dtaaw jao naa thii", "联系工作人员", "动词", "公共服务"],
  ["khaaw-khwaam-chuai-luea", "ขอความช่วยเหลือ", "khaaw khwaam chuai luea", "请求帮助", "动词", "公共服务"],
  ["tham-bat", "ทำบัตร", "tham bat", "办卡；办证", "动词", "公共服务"],
  ["yuen-ek-ga-saan", "ยื่นเอกสาร", "yuen ek-ga-saan", "提交文件", "动词", "公共服务"],
  ["rap-baaw-ri-gaan", "รับบริการ", "rap baaw-ri-gaan", "接受服务；办理服务", "动词", "公共服务"],
  ["dteuan", "เตือน", "dteuan", "提醒；警告", "动词", "安全提醒"],
  ["kham-dteuan", "คำเตือน", "kham dteuan", "警告；提醒语", "名词", "安全提醒"],
  ["ra-wang", "ระวัง", "ra-wang", "小心；注意", "动词", "安全提醒"],
  ["a-dta-raai", "อันตราย", "an-dta-raai", "危险", "形容词", "安全提醒"],
  ["bplaawt-phai", "ปลอดภัย", "bplaawt-phai", "安全", "形容词", "安全提醒"],
  ["khuan-liang", "ควรเลี่ยง", "khuan liiang", "应该避开", "句型", "安全提醒"],
  ["haam-khao", "ห้ามเข้า", "haam khao", "禁止进入", "短语", "安全提醒"],
  ["haam-jawt-rot", "ห้ามจอดรถ", "haam jaawt rot", "禁止停车", "短语", "安全提醒"],
  ["bpit-phuen-thii", "ปิดพื้นที่", "bpit phuen thii", "封闭区域", "动词", "安全提醒"],
  ["ra-wang-naam-thuam", "ระวังน้ำท่วม", "ra-wang naam thuam", "注意积水/水灾", "短语", "安全提醒"],
  ["khaaw-khwaam-bplaawt-phai", "ข้อความปลอดภัย", "khaaw khwaam bplaawt-phai", "安全信息", "名词", "安全提醒"],
  ["chii-wit-bpra-jam-wan", "ชีวิตประจำวัน", "chii-wit bpra-jam wan", "日常生活", "名词", "生活变化"],
  ["khaa-khraawng-chiip", "ค่าครองชีพ", "khaa khraawng chiip", "生活成本", "名词", "生活变化"],
  ["raa-khaa-khuen", "ราคาขึ้น", "raa-khaa khuen", "价格上涨", "动词", "生活变化"],
  ["raa-khaa-long", "ราคาลง", "raa-khaa long", "价格下降", "动词", "生活变化"],
  ["khong-phaaeng-khuen", "ของแพงขึ้น", "khaawng phaaeng khuen", "东西变贵了", "句型", "生活变化"],
  ["khon-yai-khuen", "คนเยอะขึ้น", "khon yuh khuen", "人变多了", "句型", "生活变化"],
  ["khon-noi-long", "คนน้อยลง", "khon noi long", "人变少了", "句型", "生活变化"],
  ["welaa-bpoet-bplian", "เวลาเปิดเปลี่ยน", "we-laa bpoet bpliian", "开放时间改变", "句型", "生活变化"],
  ["baaw-ri-gaan-phoem", "บริการเพิ่ม", "baaw-ri-gaan phoem", "服务增加", "句型", "生活变化"],
  ["baaw-ri-gaan-lot-long", "บริการลดลง", "baaw-ri-gaan lot long", "服务减少", "句型", "生活变化"],
  ["khon-son-jai", "คนสนใจ", "khon son jai", "人们感兴趣", "句型", "生活变化"],
  ["website", "เว็บไซต์", "wep-sai", "网站", "名词", "信息来源"],
  ["na-web", "หน้าเว็บ", "naa wep", "网页", "名词", "信息来源"],
  ["thaang-laai", "ทางไลน์", "thaang lai", "通过 LINE", "短语", "信息来源"],
  ["thaang-facebook", "ทางเฟซบุ๊ก", "thaang fet-buk", "通过 Facebook", "短语", "信息来源"],
  ["thaang-thorathat", "ทางโทรทัศน์", "thaang thoo-ra-that", "通过电视", "短语", "信息来源"],
  ["thaang-witthayu", "ทางวิทยุ", "thaang wit-tha-yu", "通过广播", "短语", "信息来源"],
  ["bpaai-bpra-gaat", "ป้ายประกาศ", "bpaai bpra-gaat", "公告牌", "名词", "信息来源"],
  ["khaaw-jaak-chumchon", "ข่าวจากชุมชน", "khaao jaak chum-chon", "来自社区的消息", "名词", "信息来源"],
  ["khaaw-thii-chuea-dai", "ข่าวที่เชื่อได้", "khaao thii chuea dai", "可信的消息", "名词", "信息来源"],
  ["khaaw-mai-nae-jai", "ข่าวไม่แน่ใจ", "khaao mai nae jai", "不确定的消息", "名词", "信息来源"],
  ["chek-khaao", "เช็กข่าว", "chek khaao", "核实新闻", "动词", "信息来源"],
  ["share-khaao", "แชร์ข่าว", "chae khaao", "分享新闻", "动词", "信息来源"],
];

const relatedByTheme: Record<
  DailyNewsPublicLifeTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  新闻: {
    synonym: "ข่าว / khaao / 新闻、消息",
    antonym: "ข่าวเก่า / khaao gao / 旧消息",
    comparison: "ข่าว 可指新闻也可指消息；ข่าวด่วน 是突发或紧急新闻。",
    collocation: "อ่านข่าววันนี้ / aan khaao wan nii / 读今日新闻",
  },
  活动: {
    synonym: "กิจกรรม / git-ja-gam / 活动",
    antonym: "ยกเลิกกิจกรรม / yok loek git-ja-gam / 取消活动",
    comparison: "งาน 可指活动、工作或典礼，กิจกรรม 更明确是活动。",
    collocation: "เข้าร่วมกิจกรรมชุมชน / khao ruam git-ja-gam chum-chon / 参加社区活动",
  },
  交通: {
    synonym: "จราจร / ja-raa-jaawn / 交通",
    antonym: "ทางโล่ง / thaang loong / 路况通畅",
    comparison: "รถติด 指堵车，ทางปิด 指路被关闭，เลี่ยงทาง 指绕开。",
    collocation: "วันนี้รถติดมาก / wan nii rot dtit maak / 今天很堵车",
  },
  天气: {
    synonym: "อากาศ / aa-gaat / 天气",
    antonym: "อากาศดี / aa-gaat dii / 天气好",
    comparison: "ฝนตก 是下雨，ฝนตกหนัก 是下大雨，น้ำท่วม 是积水或水灾。",
    collocation: "ควรพกร่มเพราะฝนตก / khuan phok rom phraw fon dtok / 因为下雨应该带伞",
  },
  政策通知: {
    synonym: "ประกาศ / bpra-gaat / 公告",
    antonym: "ยังไม่ประกาศ / yang mai bpra-gaat / 尚未公告",
    comparison: "ประกาศ 是公告，กฎ 是规则，นโยบาย 是政策或方针。",
    collocation: "ประกาศใหม่มีผลวันนี้ / bpra-gaat mai mii phon wan nii / 新公告今天生效",
  },
  社区事件: {
    synonym: "ชุมชน / chum-chon / 社区",
    antonym: "นอกพื้นที่ / naawk phuen thii / 区域外",
    comparison: "ชุมชน 指社区人群或区域，พื้นที่ 更强调某个范围。",
    collocation: "ประชุมชุมชนเรื่องน้ำไม่ไหล / bpra-chum chum-chon rueang naam mai lai / 开社区会讨论停水",
  },
  公共服务: {
    synonym: "บริการสาธารณะ / baaw-ri-gaan saa-thaa-ra-na / 公共服务",
    antonym: "บริการส่วนตัว / baaw-ri-gaan suan dtua / 私人服务",
    comparison: "เจ้าหน้าที่ 是工作人员，สำนักงานเขต 是办事地点。",
    collocation: "ติดต่อเจ้าหน้าที่เพื่อยื่นเอกสาร / dtit dtaaw jao naa thii phuea yuen ek-ga-saan / 联系工作人员提交文件",
  },
  安全提醒: {
    synonym: "คำเตือน / kham dteuan / 警告、提醒",
    antonym: "ปลอดภัย / bplaawt-phai / 安全",
    comparison: "ระวัง 是提醒小心，ห้าม 是禁止做某事。",
    collocation: "ระวังน้ำท่วมและใช้ทางอื่น / ra-wang naam thuam lae chai thaang uen / 注意积水并走其他路",
  },
  生活变化: {
    synonym: "เปลี่ยน / bpliian / 改变",
    antonym: "เหมือนเดิม / muean doem / 和以前一样",
    comparison: "ขึ้น 表示上升或变多，ลง 表示下降或变少。",
    collocation: "ราคาขึ้นแต่บริการลดลง / raa-khaa khuen dtae baaw-ri-gaan lot long / 价格上涨但服务减少",
  },
  信息来源: {
    synonym: "แหล่งข่าว / laeng khaao / 消息来源",
    antonym: "ข่าวไม่แน่ใจ / khaao mai nae jai / 不确定的消息",
    comparison: "ทาง + 渠道 表示“通过……”，如 ทางไลน์、ทางโทรทัศน์。",
    collocation: "เช็กข่าวจากเว็บไซต์ / chek khaao jaak wep-sai / 从网站核实消息",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาอ่านข่าวง่าย ๆ ในชีวิตประจำวัน ฉันเห็นคำว่า “${row[1]}” และใช้มันเพื่อเข้าใจเรื่องในชุมชน`,
  roman: `we-laa aan khaao ngaai ngaai nai chii-wit bpra-jam wan chan hen kham waa "${row[2]}" lae chai man phuea khao-jai rueang nai chum-chon`,
  chinese: `读日常生活里的简单新闻时，我看到“${row[1]}”这个词，并用它理解社区里的事情。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "新闻公共生活", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 新闻和公共生活基础表达。适合理解社区公告、天气交通、活动和简单公共服务信息；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: DAILY_NEWS_PUBLIC_LIFE_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_NEWS_PUBLIC_LIFE_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
