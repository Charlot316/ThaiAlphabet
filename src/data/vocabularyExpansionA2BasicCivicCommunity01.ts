export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type BasicCivicCommunityTheme =
  | "社区公共生活"
  | "公民基础"
  | "规则"
  | "垃圾分类"
  | "公共安全"
  | "邻里通知"
  | "社区活动"
  | "志愿帮忙"
  | "公共设施"
  | "环境维护";

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
  theme: BasicCivicCommunityTheme,
];

const BASIC_CIVIC_COMMUNITY_REFS = [
  "worker-a-a2-basic-civic-community",
  "basic-thai-civic-community",
];

const rows: Row[] = [
  ["chumchon", "ชุมชน", "chum-chon", "社区", "名词", "社区公共生活"],
  ["khon-nai-chumchon", "คนในชุมชน", "khon nai chum-chon", "社区里的人", "名词", "社区公共生活"],
  ["phuen-baan", "เพื่อนบ้าน", "phuean baan", "邻居", "名词", "社区公共生活"],
  ["phuen-thii-suan-ruam", "พื้นที่ส่วนรวม", "phuen thii suan ruam", "公共区域", "名词", "社区公共生活"],
  ["thii-yuu-aasai", "ที่อยู่อาศัย", "thii yuu aa-sai", "居住地；住宅区", "名词", "社区公共生活"],
  ["khet-chumchon", "เขตชุมชน", "kheet chum-chon", "社区范围", "名词", "社区公共生活"],
  ["khwaam-sangop", "ความสงบ", "khwaam sa-ngop", "安静；安宁", "名词", "社区公共生活"],
  ["chiiwit-ruam-gan", "ชีวิตร่วมกัน", "chii-wit ruam gan", "共同生活", "名词", "社区公共生活"],
  ["yuu-ruam-gan", "อยู่ร่วมกัน", "yuu ruam gan", "共同居住；共处", "动词", "社区公共生活"],
  ["duulaae-chumchon", "ดูแลชุมชน", "duu laae chum-chon", "照顾社区", "动词", "社区公共生活"],
  ["prachaachon", "ประชาชน", "bpra-chaa-chon", "民众；居民", "名词", "公民基础"],
  ["sit", "สิทธิ", "sit-thi", "权利", "名词", "公民基础"],
  ["naa-thii", "หน้าที่", "naa thii", "职责；义务", "名词", "公民基础"],
  ["khwaam-rap-phit-chaawp", "ความรับผิดชอบ", "khwaam rap phit chaawp", "责任", "名词", "公民基础"],
  ["rap-phit-chaawp", "รับผิดชอบ", "rap phit chaawp", "负责", "动词", "公民基础"],
  ["tham-dtaam-got", "ทำตามกฎ", "tham dtaam got", "遵守规则", "动词", "公民基础"],
  ["hai-khwaam-ruam-mue", "ให้ความร่วมมือ", "hai khwaam ruam mue", "配合；合作", "动词", "公民基础"],
  ["khawp-khet", "ขอบเขต", "khaawp kheet", "范围；边界", "名词", "公民基础"],
  ["khwaam-bplaawt-phai", "ความปลอดภัย", "khwaam bplaawt-phai", "安全", "名词", "公民基础"],
  ["suan-ruam", "ส่วนรวม", "suan ruam", "公共的；大家的", "名词", "公民基础"],
  ["got", "กฎ", "got", "规则", "名词", "规则"],
  ["kot-rabiap", "กฎระเบียบ", "got ra-biiap", "规章制度", "名词", "规则"],
  ["kham-nae-nam", "คำแนะนำ", "kham nae nam", "建议；指引", "名词", "规则"],
  ["kham-dteuan", "คำเตือน", "kham dteuan", "警告；提醒", "名词", "规则"],
  ["haam", "ห้าม", "haam", "禁止", "动词", "规则"],
  ["a-nu-yaat", "อนุญาต", "a-nu-yaat", "允许", "动词", "规则"],
  ["dtaam-bpra-gaat", "ตามประกาศ", "dtaam bpra-gaat", "按照公告", "短语", "规则"],
  ["dtaam-got", "ตามกฎ", "dtaam got", "按规则", "短语", "规则"],
  ["phit-got", "ผิดกฎ", "phit got", "违反规则", "短语", "规则"],
  ["rak-saa-got", "รักษากฎ", "rak-saa got", "维护规则；遵守规则", "动词", "规则"],
  ["yaek-kha-ya", "แยกขยะ", "yaaek kha-ya", "垃圾分类", "动词", "垃圾分类"],
  ["kha-ya", "ขยะ", "kha-ya", "垃圾", "名词", "垃圾分类"],
  ["thang-kha-ya", "ถังขยะ", "thang kha-ya", "垃圾桶", "名词", "垃圾分类"],
  ["kha-ya-piiak", "ขยะเปียก", "kha-ya bpiiak", "湿垃圾", "名词", "垃圾分类"],
  ["kha-ya-haeng", "ขยะแห้ง", "kha-ya haaeng", "干垃圾", "名词", "垃圾分类"],
  ["kha-ya-rii-sai-khoen", "ขยะรีไซเคิล", "kha-ya rii-sai-khoen", "可回收垃圾", "名词", "垃圾分类"],
  ["kha-ya-an-ta-raai", "ขยะอันตราย", "kha-ya an-dta-raai", "有害垃圾", "名词", "垃圾分类"],
  ["thung-kha-ya", "ถุงขยะ", "thung kha-ya", "垃圾袋", "名词", "垃圾分类"],
  ["thing-kha-ya-hai-thuuk-thii", "ทิ้งขยะให้ถูกที่", "thing kha-ya hai thuuk thii", "把垃圾丢在正确地方", "句型", "垃圾分类"],
  ["yaa-thing-kha-ya", "อย่าทิ้งขยะ", "yaa thing kha-ya", "不要乱丢垃圾", "句型", "垃圾分类"],
  ["bplaawt-phai", "ปลอดภัย", "bplaawt-phai", "安全", "形容词", "公共安全"],
  ["an-ta-raai", "อันตราย", "an-dta-raai", "危险", "形容词", "公共安全"],
  ["ra-wang", "ระวัง", "ra-wang", "小心；注意", "动词", "公共安全"],
  ["jaeng-het", "แจ้งเหตุ", "jaaeng heet", "报告事件/事故", "动词", "公共安全"],
  ["het-duan", "เหตุด่วน", "heet duan", "紧急事件", "名词", "公共安全"],
  ["rot-pha-yaa-baan", "รถพยาบาล", "rot pha-yaa-baan", "救护车", "名词", "公共安全"],
  ["dtamruat", "ตำรวจ", "dtam-ruat", "警察", "名词", "公共安全"],
  ["faai-mai", "ไฟไหม้", "fai mai", "着火；火灾", "动词", "公共安全"],
  ["naam-thuam", "น้ำท่วม", "naam thuam", "淹水；水灾", "动词", "公共安全"],
  ["thaang-awk-chuk-choen", "ทางออกฉุกเฉิน", "thaang awk chuk-choen", "紧急出口", "名词", "公共安全"],
  ["bpra-gaat", "ประกาศ", "bpra-gaat", "公告", "名词", "邻里通知"],
  ["jaeng-hai-thraap", "แจ้งให้ทราบ", "jaaeng hai saap", "通知知悉", "动词", "邻里通知"],
  ["bpaai-bpra-gaat", "ป้ายประกาศ", "bpaai bpra-gaat", "公告牌", "名词", "邻里通知"],
  ["khaaw-jaeng", "ข่าวแจ้ง", "khaao jaaeng", "通知消息", "名词", "邻里通知"],
  ["jaeng-luang-naa", "แจ้งล่วงหน้า", "jaaeng luang naa", "提前通知", "动词", "邻里通知"],
  ["jaeng-welaa", "แจ้งเวลา", "jaaeng we-laa", "通知时间", "动词", "邻里通知"],
  ["jaeng-bpit-naam", "แจ้งปิดน้ำ", "jaaeng bpit naam", "通知停水", "动词", "邻里通知"],
  ["jaeng-dtap-fai", "แจ้งดับไฟ", "jaaeng dap fai", "通知停电", "动词", "邻里通知"],
  ["song-khaaw-khwaam", "ส่งข้อความ", "song khaaw khwaam", "发送消息", "动词", "邻里通知"],
  ["glum-line-chumchon", "กลุ่มไลน์ชุมชน", "glum lai chum-chon", "社区 LINE 群", "名词", "邻里通知"],
  ["git-ja-gam-chumchon", "กิจกรรมชุมชน", "git-ja-gam chum-chon", "社区活动", "名词", "社区活动"],
  ["bpra-chum-chumchon", "ประชุมชุมชน", "bpra-chum chum-chon", "社区会议", "名词", "社区活动"],
  ["tham-khwaam-sa-aat-chumchon", "ทำความสะอาดชุมชน", "tham khwaam sa-aat chum-chon", "清洁社区", "动词", "社区活动"],
  ["pluuk-dton-mai", "ปลูกต้นไม้", "bpluuk dton mai", "种树", "动词", "社区活动"],
  ["jat-ngaan", "จัดงาน", "jat ngaan", "举办活动", "动词", "社区活动"],
  ["khao-ruam", "เข้าร่วม", "khao ruam", "参加", "动词", "社区活动"],
  ["long-tha-biian-khao-ruam", "ลงทะเบียนเข้าร่วม", "long tha-biian khao ruam", "报名参加", "动词", "社区活动"],
  ["wan-git-ja-gam", "วันกิจกรรม", "wan git-ja-gam", "活动日", "名词", "社区活动"],
  ["phuen-thii-jat-ngaan", "พื้นที่จัดงาน", "phuen thii jat ngaan", "活动场地", "名词", "社区活动"],
  ["chuai-gan", "ช่วยกัน", "chuai gan", "一起帮忙", "动词", "社区活动"],
  ["aa-saa", "อาสา", "aa-saa", "自愿；志愿", "动词", "志愿帮忙"],
  ["aa-saa-samak", "อาสาสมัคร", "aa-saa sa-mak", "志愿者", "名词", "志愿帮忙"],
  ["ngaan-aa-saa", "งานอาสา", "ngaan aa-saa", "志愿活动", "名词", "志愿帮忙"],
  ["chuai-luea", "ช่วยเหลือ", "chuai luea", "帮助", "动词", "志愿帮忙"],
  ["khaaw-khwaam-chuai-luea", "ขอความช่วยเหลือ", "khaaw khwaam chuai luea", "请求帮助", "动词", "志愿帮忙"],
  ["hai-khwaam-chuai-luea", "ให้ความช่วยเหลือ", "hai khwaam chuai luea", "提供帮助", "动词", "志愿帮忙"],
  ["baeng-naa-thii", "แบ่งหน้าที่", "baeng naa thii", "分工；分配职责", "动词", "志愿帮忙"],
  ["tham-ngaan-ruam-gan", "ทำงานร่วมกัน", "tham ngaan ruam gan", "一起工作", "动词", "志愿帮忙"],
  ["rap-chue-aa-saa", "รับชื่ออาสา", "rap chue aa-saa", "登记志愿者名字", "动词", "志愿帮忙"],
  ["khawp-khun-thii-chuai", "ขอบคุณที่ช่วย", "khaawp khun thii chuai", "感谢帮忙", "句型", "志愿帮忙"],
  ["suan-saa-thaa-ra-na", "สวนสาธารณะ", "suan saa-thaa-ra-na", "公园", "名词", "公共设施"],
  ["hong-samut", "ห้องสมุด", "haawng sa-mut", "图书馆", "名词", "公共设施"],
  ["sa-thaa-nii-dtamruat", "สถานีตำรวจ", "sa-thaa-nii dtam-ruat", "警察局", "名词", "公共设施"],
  ["sa-thaa-nii-anamai", "สถานีอนามัย", "sa-thaa-nii a-naa-mai", "卫生站", "名词", "公共设施"],
  ["sa-nam-dek-len", "สนามเด็กเล่น", "sa-naam dek len", "儿童游乐场", "名词", "公共设施"],
  ["thii-jawt-rot", "ที่จอดรถ", "thii jaawt rot", "停车场", "名词", "公共设施"],
  ["thaang-thao", "ทางเท้า", "thaang thaao", "人行道", "名词", "公共设施"],
  ["thaang-maa-laai", "ทางม้าลาย", "thaang maa-laai", "人行横道", "名词", "公共设施"],
  ["saamaarot-chai-dai", "สามารถใช้ได้", "saa-maat chai dai", "可以使用", "句型", "公共设施"],
  ["cham-rut", "ชำรุด", "cham-rut", "损坏；故障", "形容词", "公共设施"],
  ["rak-saa-khwaam-sa-aat", "รักษาความสะอาด", "rak-saa khwaam sa-aat", "保持清洁", "动词", "环境维护"],
  ["duulaae-sing-waet-laawm", "ดูแลสิ่งแวดล้อม", "duu laae sing waet laawm", "爱护环境", "动词", "环境维护"],
  ["bpra-yat-naam", "ประหยัดน้ำ", "bpra-yat naam", "节约用水", "动词", "环境维护"],
  ["bpra-yat-fai", "ประหยัดไฟ", "bpra-yat fai", "节约用电", "动词", "环境维护"],
  ["bpit-fai", "ปิดไฟ", "bpit fai", "关灯", "动词", "环境维护"],
  ["bpit-gawk-naam", "ปิดก๊อกน้ำ", "bpit gaawk naam", "关水龙头", "动词", "环境维护"],
  ["lot-kha-ya", "ลดขยะ", "lot kha-ya", "减少垃圾", "动词", "环境维护"],
  ["chai-sam", "ใช้ซ้ำ", "chai sam", "重复使用", "动词", "环境维护"],
  ["rii-sai-khoen", "รีไซเคิล", "rii-sai-khoen", "回收再利用", "动词", "环境维护"],
  ["phuen-thii-sa-aat", "พื้นที่สะอาด", "phuen thii sa-aat", "干净区域", "名词", "环境维护"],
];

const relatedByTheme: Record<
  BasicCivicCommunityTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  社区公共生活: {
    synonym: "ชุมชน / chum-chon / 社区",
    antonym: "ส่วนตัว / suan dtua / 私人的",
    comparison: "ชุมชน 强调共同生活的区域和人，พื้นที่ส่วนรวม 强调公共空间。",
    collocation: "อยู่ร่วมกันในชุมชน / yuu ruam gan nai chum-chon / 在社区共同生活",
  },
  公民基础: {
    synonym: "หน้าที่ / naa thii / 职责、义务",
    antonym: "ไม่รับผิดชอบ / mai rap phit chaawp / 不负责",
    comparison: "สิทธิ 是权利，หน้าที่ 是义务，责任场景常一起出现。",
    collocation: "ทำตามกฎและรับผิดชอบ / tham dtaam got lae rap phit chaawp / 遵守规则并负责",
  },
  规则: {
    synonym: "กฎ / got / 规则",
    antonym: "ผิดกฎ / phit got / 违反规则",
    comparison: "ห้าม 表示禁止，อนุญาต 表示允许，是公共标识常见反义词。",
    collocation: "ทำตามกฎของชุมชน / tham dtaam got khaawng chum-chon / 遵守社区规则",
  },
  垃圾分类: {
    synonym: "แยกขยะ / yaaek kha-ya / 垃圾分类",
    antonym: "ทิ้งขยะผิดที่ / thing kha-ya phit thii / 垃圾丢错地方",
    comparison: "ขยะเปียก 是湿垃圾，ขยะรีไซเคิล 是可回收垃圾。",
    collocation: "แยกขยะก่อนทิ้ง / yaaek kha-ya gaawn thing / 扔垃圾前先分类",
  },
  公共安全: {
    synonym: "ความปลอดภัย / khwaam bplaawt-phai / 安全",
    antonym: "อันตราย / an-dta-raai / 危险",
    comparison: "แจ้งเหตุ 是报告事件，เหตุด่วน 是紧急事件。",
    collocation: "แจ้งเหตุเมื่อเห็นอันตราย / jaaeng heet muea hen an-dta-raai / 看到危险时报告",
  },
  邻里通知: {
    synonym: "ประกาศ / bpra-gaat / 公告",
    antonym: "ไม่แจ้ง / mai jaaeng / 不通知",
    comparison: "แจ้งให้ทราบ 是通知大家知悉，แจ้งล่วงหน้า 是提前通知。",
    collocation: "ส่งข้อความในกลุ่มไลน์ชุมชน / song khaaw khwaam nai glum lai chum-chon / 在社区 LINE 群发消息",
  },
  社区活动: {
    synonym: "กิจกรรมชุมชน / git-ja-gam chum-chon / 社区活动",
    antonym: "ยกเลิกกิจกรรม / yok loek git-ja-gam / 取消活动",
    comparison: "ประชุมชุมชน 是社区会议，กิจกรรมชุมชน 是更广泛的活动。",
    collocation: "เข้าร่วมกิจกรรมทำความสะอาดชุมชน / khao ruam git-ja-gam tham khwaam sa-aat chum-chon / 参加社区清洁活动",
  },
  志愿帮忙: {
    synonym: "อาสาสมัคร / aa-saa sa-mak / 志愿者",
    antonym: "ไม่ช่วย / mai chuai / 不帮忙",
    comparison: "อาสา 是自愿做，อาสาสมัคร 是志愿者这个人。",
    collocation: "อาสาช่วยงานชุมชน / aa-saa chuai ngaan chum-chon / 自愿帮社区活动",
  },
  公共设施: {
    synonym: "สวนสาธารณะ / suan saa-thaa-ra-na / 公园",
    antonym: "พื้นที่ส่วนตัว / phuen thii suan dtua / 私人区域",
    comparison: "公共设施常和使用规则、损坏แจ้งซ่อม等表达一起出现。",
    collocation: "ใช้พื้นที่ส่วนรวมอย่างระวัง / chai phuen thii suan ruam yaang ra-wang / 小心使用公共区域",
  },
  环境维护: {
    synonym: "รักษาความสะอาด / rak-saa khwaam sa-aat / 保持清洁",
    antonym: "ทิ้งขยะ / thing kha-ya / 丢垃圾",
    comparison: "ประหยัดน้ำ 是节约水，ประหยัดไฟ 是节约电。",
    collocation: "ช่วยกันรักษาความสะอาด / chuai gan rak-saa khwaam sa-aat / 一起保持清洁",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในชุมชนของฉัน เราใช้คำว่า “${row[1]}” เพื่อพูดเรื่องกฎ ความปลอดภัย และการช่วยกันดูแลส่วนรวม`,
  roman: `nai chum-chon khaawng chan rao chai kham waa "${row[2]}" phuea phuut rueang got khwaam bplaawt-phai lae gaan chuai gan duu laae suan ruam`,
  chinese: `在我的社区里，我们用“${row[1]}”来谈规则、安全，以及大家一起维护公共空间。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "社区公共生活", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 社区和公民基础表达。适合理解规则、垃圾分类、公共安全、邻里通知、社区活动和志愿帮忙；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: BASIC_CIVIC_COMMUNITY_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_CIVIC_COMMUNITY_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
