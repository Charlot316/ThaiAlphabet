export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "照顾" | "邻里" | "公共通知" | "家庭安排" | "简单协商" | "社区事务";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type CommunityItem = { thai: string; id: string; roman: string; chinese: string; tag: string };
type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };

const BRIDGE_TO_B1_FAMILY_COMMUNITY_REFS = ["thai-frequency", "thai-a2-bridge-to-b1-family-community-candidate"];

const communityItems: readonly CommunityItem[] = [
  { thai: "ผู้สูงอายุที่บ้าน", id: "phuu-sung-aa-yu-thii-baan", roman: "phuu-sung-aa-yu thii baan", chinese: "家里的老人", tag: "照顾" },
  { thai: "เด็กเล็กในซอย", id: "dek-lek-nai-saawy", roman: "dek lek nai saawy", chinese: "巷子里的小孩", tag: "邻里" },
  { thai: "เพื่อนบ้านข้างห้อง", id: "pheuuan-baan-khaang-haawng", roman: "pheuuan-baan khaang haawng", chinese: "隔壁邻居", tag: "邻居" },
  { thai: "ประกาศหน้าตึก", id: "bpra-gaat-naa-dteuk", roman: "bpra-gaat naa dteuk", chinese: "楼前公告", tag: "通知" },
  { thai: "เวรทำความสะอาด", id: "ween-tham-khwaam-sa-aat", roman: "ween tham khwaam sa-aat", chinese: "值日清洁", tag: "清洁" },
  { thai: "ที่จอดรถส่วนกลาง", id: "thii-jaawt-rot-suuan-glaang", roman: "thii jaawt rot suuan glaang", chinese: "公共停车位", tag: "停车" },
  { thai: "เสียงดังตอนกลางคืน", id: "siiang-dang-dtaawn-glaang-kheuun", roman: "siiang dang dtaawn glaang kheuun", chinese: "夜里的噪音", tag: "噪音" },
  { thai: "ค่าน้ำค่าไฟ", id: "khaa-naam-khaa-fai", roman: "khaa naam khaa fai", chinese: "水电费", tag: "费用" },
  { thai: "วันประชุมชุมชน", id: "wan-bpra-chum-chum-chon", roman: "wan bpra-chum chum-chon", chinese: "社区开会的日子", tag: "会议" },
  { thai: "ของใช้ส่วนรวม", id: "khaawng-chai-suuan-ruam", roman: "khaawng chai suuan-ruam", chinese: "公共用品", tag: "公共" },
  { thai: "ทางเข้าหมู่บ้าน", id: "thaang-khao-muu-baan", roman: "thaang khao muu-baan", chinese: "小区/村子的入口", tag: "地点" },
  { thai: "ปัญหาขยะ", id: "bpan-haa-kha-ya", roman: "bpan-haa kha-ya", chinese: "垃圾问题", tag: "环境" },
  { thai: "คนเฝ้าตึก", id: "khon-fao-dteuk", roman: "khon fao dteuk", chinese: "看楼/值守的人", tag: "社区" },
  { thai: "ตารางใช้ห้องส่วนกลาง", id: "dtaa-raang-chai-haawng-suuan-glaang", roman: "dtaa-raang chai haawng suuan-glaang", chinese: "公共房间使用表", tag: "安排" },
  { thai: "ครอบครัวที่มาเยี่ยม", id: "khraawp-khruua-thii-maa-yiiam", roman: "khraawp-khruua thii maa yiiam", chinese: "来探望的家人", tag: "家庭" },
  { thai: "งานเลี้ยงเล็กๆ", id: "ngaan-liiang-lek-lek", roman: "ngaan liiang lek lek", chinese: "小聚会", tag: "活动" },
];

const directRows: readonly Definition[] = [
  { thai: "ช่วยดูแลผู้ใหญ่ที่บ้าน", id: "chuai-duu-laae-phuu-yai-thii-baan", roman: "chuai duu-laae phuu-yai thii baan", chinese: "帮忙照顾家里的长辈", partOfSpeech: "短语", theme: "照顾", exampleThai: "เสาร์นี้ฉันต้องช่วยดูแลผู้ใหญ่ที่บ้าน", exampleRoman: "sao nii chan dtawng chuai duu-laae phuu-yai thii baan", exampleChinese: "这个周六我得帮忙照顾家里的长辈。", tag: "照顾" },
  { thai: "ขอคุยกับเพื่อนบ้านดีๆ", id: "khaaw-khui-gap-pheuuan-baan-dii-dii", roman: "khaaw khui gap pheuuan-baan dii dii", chinese: "想好好和邻居谈谈", partOfSpeech: "短语", theme: "邻里", exampleThai: "เรื่องเสียงดัง ขอคุยกับเพื่อนบ้านดีๆ ก่อน", exampleRoman: "reuuang siiang dang, khaaw khui gap pheuuan-baan dii dii gaawn", exampleChinese: "关于噪音问题，想先好好和邻居谈谈。", tag: "邻居" },
  { thai: "อ่านประกาศให้ครบ", id: "aan-bpra-gaat-hai-khrop", roman: "aan bpra-gaat hai khrop", chinese: "把公告读完整", partOfSpeech: "短语", theme: "公共通知", exampleThai: "ก่อนใช้ห้องส่วนกลาง ควรอ่านประกาศให้ครบ", exampleRoman: "gaawn chai haawng suuan-glaang, khuuan aan bpra-gaat hai khrop", exampleChinese: "使用公共房间前，应该把公告读完整。", tag: "通知" },
  { thai: "แบ่งหน้าที่ในบ้าน", id: "baeng-naa-thii-nai-baan", roman: "baeng naa-thii nai baan", chinese: "分配家里的职责", partOfSpeech: "短语", theme: "家庭安排", exampleThai: "ถ้าทุกคนยุ่ง เราควรแบ่งหน้าที่ในบ้าน", exampleRoman: "thaa thuk khon yung, rao khuuan baeng naa-thii nai baan", exampleChinese: "如果大家都忙，我们应该分配家里的职责。", tag: "安排" },
  { thai: "ตกลงเวลากับคนในบ้าน", id: "dtok-long-wee-laa-gap-khon-nai-baan", roman: "dtok-long wee-laa gap khon nai baan", chinese: "和家里人约好时间", partOfSpeech: "短语", theme: "简单协商", exampleThai: "ก่อนออกไปข้างนอก เราตกลงเวลากับคนในบ้าน", exampleRoman: "gaawn aawk bpai khaang naawk, rao dtok-long wee-laa gap khon nai baan", exampleChinese: "出门前，我们和家里人约好时间。", tag: "协商" },
  { thai: "แจ้งเรื่องส่วนกลางในกลุ่ม", id: "jaaeng-reuuang-suuan-glaang-nai-glum", roman: "jaaeng reuuang suuan-glaang nai glum", chinese: "在群里通知公共事务", partOfSpeech: "短语", theme: "社区事务", exampleThai: "ถ้าน้ำไม่ไหล ควรแจ้งเรื่องส่วนกลางในกลุ่ม", exampleRoman: "thaa naam mai lai, khuuan jaaeng reuuang suuan-glaang nai glum", exampleChinese: "如果停水，应该在群里通知公共事务。", tag: "社区" },
  { thai: "ขอให้ลดเสียงตอนดึก", id: "khaaw-hai-lot-siiang-dtaawn-deuk", roman: "khaaw hai lot siiang dtaawn deuk", chinese: "请求晚上小声一点", partOfSpeech: "短语", theme: "简单协商", exampleThai: "ลูกนอนแล้ว ขอให้ลดเสียงตอนดึกได้ไหม", exampleRoman: "luuk naawn laaeo, khaaw hai lot siiang dtaawn deuk dai mai", exampleChinese: "孩子睡了，可以请晚上小声一点吗？", tag: "噪音" },
  { thai: "ช่วยกันรักษาความสะอาด", id: "chuai-gan-rak-saa-khwaam-sa-aat", roman: "chuai gan rak-saa khwaam sa-aat", chinese: "一起保持清洁", partOfSpeech: "短语", theme: "社区事务", exampleThai: "ทุกบ้านควรช่วยกันรักษาความสะอาด", exampleRoman: "thuk baan khuuan chuai gan rak-saa khwaam sa-aat", exampleChinese: "每家都应该一起保持清洁。", tag: "环境" },
];

const careRows = communityItems.map((item): Definition => ({
  thai: `ช่วยดูแลเรื่อง${item.thai}`,
  id: `chuai-duu-laae-reuuang-${item.id}`,
  roman: `chuai duu-laae reuuang ${item.roman}`,
  chinese: `帮忙照看关于${item.chinese}的事`,
  partOfSpeech: "短语",
  theme: "照顾",
  exampleThai: `ถ้าฉันไม่อยู่ ช่วยดูแลเรื่อง${item.thai}ให้หน่อย`,
  exampleRoman: `thaa chan mai yuu, chuai duu-laae reuuang ${item.roman} hai naawy`,
  exampleChinese: `如果我不在，请帮忙照看关于${item.chinese}的事。`,
  tag: item.tag,
}));

const neighborRows = communityItems.map((item): Definition => ({
  thai: `คุยกับเพื่อนบ้านเรื่อง${item.thai}`,
  id: `khui-gap-pheuuan-baan-reuuang-${item.id}`,
  roman: `khui gap pheuuan-baan reuuang ${item.roman}`,
  chinese: `和邻居谈关于${item.chinese}的事`,
  partOfSpeech: "短语",
  theme: "邻里",
  exampleThai: `เราอยากคุยกับเพื่อนบ้านเรื่อง${item.thai}อย่างสุภาพ`,
  exampleRoman: `rao yaak khui gap pheuuan-baan reuuang ${item.roman} yaang su-phaap`,
  exampleChinese: `我们想礼貌地和邻居谈关于${item.chinese}的事。`,
  tag: item.tag,
}));

const noticeRows = communityItems.map((item): Definition => ({
  thai: `ประกาศเรื่อง${item.thai}ให้ทราบ`,
  id: `bpra-gaat-reuuang-${item.id}-hai-saap`,
  roman: `bpra-gaat reuuang ${item.roman} hai saap`,
  chinese: `公告关于${item.chinese}的事`,
  partOfSpeech: "短语",
  theme: "公共通知",
  exampleThai: `นิติประกาศเรื่อง${item.thai}ให้ทราบในกลุ่ม`,
  exampleRoman: `ni-ti bpra-gaat reuuang ${item.roman} hai saap nai glum`,
  exampleChinese: `物业在群里公告关于${item.chinese}的事。`,
  tag: item.tag,
}));

const familyPlanRows = communityItems.map((item): Definition => ({
  thai: `จัดแผนบ้านเรื่อง${item.thai}`,
  id: `jat-phaaen-baan-reuuang-${item.id}`,
  roman: `jat phaaen baan reuuang ${item.roman}`,
  chinese: `安排家里关于${item.chinese}的计划`,
  partOfSpeech: "短语",
  theme: "家庭安排",
  exampleThai: `เย็นนี้เราต้องจัดแผนบ้านเรื่อง${item.thai}`,
  exampleRoman: `yen nii rao dtawng jat phaaen baan reuuang ${item.roman}`,
  exampleChinese: `今晚我们要安排家里关于${item.chinese}的计划。`,
  tag: item.tag,
}));

const discussRows = communityItems.map((item): Definition => ({
  thai: `ตกลงกันเรื่อง${item.thai}`,
  id: `dtok-long-gan-reuuang-${item.id}`,
  roman: `dtok-long gan reuuang ${item.roman}`,
  chinese: `协商关于${item.chinese}的事`,
  partOfSpeech: "短语",
  theme: "简单协商",
  exampleThai: `ถ้ามีหลายความเห็น เราควรตกลงกันเรื่อง${item.thai}`,
  exampleRoman: `thaa mii laai khwaam-hen, rao khuuan dtok-long gan reuuang ${item.roman}`,
  exampleChinese: `如果有不同意见，我们应该协商关于${item.chinese}的事。`,
  tag: item.tag,
}));

const communityRows = communityItems.map((item): Definition => ({
  thai: `ติดตามเรื่อง${item.thai}ในชุมชน`,
  id: `dtit-dtaam-reuuang-${item.id}-nai-chum-chon`,
  roman: `dtit-dtaam reuuang ${item.roman} nai chum-chon`,
  chinese: `关注社区里关于${item.chinese}的事`,
  partOfSpeech: "短语",
  theme: "社区事务",
  exampleThai: `คนในตึกควรติดตามเรื่อง${item.thai}ในชุมชน`,
  exampleRoman: `khon nai dteuk khuuan dtit-dtaam reuuang ${item.roman} nai chum-chon`,
  exampleChinese: `楼里的人应该关注社区里关于${item.chinese}的事。`,
  tag: item.tag,
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...careRows,
  ...neighborRows,
  ...noticeRows,
  ...familyPlanRows,
  ...discussRows,
  ...communityRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const comparisons: VocabularyExpansionComparison[] = [{ kind: "用法", target: { thai: "อย่างสุภาพ", roman: "yaang su-phaap", chinese: "礼貌地" }, distinctionZh: "邻里和社区场景常用礼貌语气；表达问题时先说明事实，再提出请求。" }];
  const tags = ["a2", "低阶家庭社区过渡", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons, collocations, usageNotesZh: ["A2 到 B1 过渡家庭社区表达侧重照顾、通知、协商和公共事务，句子要清楚、礼貌、可直接使用。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons,
    collocations,
    usageNotesZh: ["用于家庭安排、邻里沟通、公共通知、社区清洁和简单协商。"],
    tags,
    sourceRefs: BRIDGE_TO_B1_FAMILY_COMMUNITY_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_BRIDGE_TO_B1_FAMILY_COMMUNITY_01 = rows.map(toCandidate);
