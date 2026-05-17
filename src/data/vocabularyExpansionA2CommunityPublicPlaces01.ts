export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语" | "句型";
export type VocabularyExpansionLevel = "a2";
export type VocabularyExpansionTheme = "社区" | "公共设施" | "公园" | "图书馆" | "警察局" | "寺庙" | "市场" | "办事点" | "公共规则" | "附近环境";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";
export type VocabularyExpansionRelated = { thai: string; roman: string; chinese: string; notesZh?: string };
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionComparison = { kind: VocabularyExpansionComparisonKind; target: VocabularyExpansionRelated; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[] };
export type VocabularyExpansionCandidate = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: VocabularyExpansionLevel; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[]; sourceRefs: string[]; reviewStatus: VocabularyExpansionReviewStatus };
type Row = readonly [string, string, string, string, VocabularyExpansionPartOfSpeech, VocabularyExpansionTheme];
const COMMUNITY_REFS = ["worker-a-a2-community-public-places", "basic-thai-public-places"];

const rows: Row[] = [
  ["chum-chon", "ชุมชน", "chum chon", "社区", "名词", "社区"],
  ["khon-nai-chum-chon", "คนในชุมชน", "khon nai chum chon", "社区里的人", "名词", "社区"],
  ["phuean-baan", "เพื่อนบ้าน", "phuean baan", "邻居", "名词", "社区"],
  ["khon-khaang-baan", "คนข้างบ้าน", "khon khaang baan", "隔壁的人", "名词", "社区"],
  ["muu-baan", "หมู่บ้าน", "muu baan", "村子；小区", "名词", "社区"],
  ["baan-jat-san", "บ้านจัดสรร", "baan jat san", "住宅小区", "名词", "社区"],
  ["nii-ti-buk-khon", "นิติบุคคล", "ni-ti buk-khon", "小区物业/管理处", "名词", "社区"],
  ["phuu-duu-laae-muu-baan", "ผู้ดูแลหมู่บ้าน", "phuu duu laae muu baan", "小区管理员", "名词", "社区"],
  ["yaaam", "ยาม", "yaam", "保安", "名词", "社区"],
  ["pom-yaaam", "ป้อมยาม", "bpaawm yaam", "保安亭", "名词", "社区"],
  ["thaang-khao-muu-baan", "ทางเข้าหมู่บ้าน", "thaang khao muu baan", "小区入口", "名词", "社区"],
  ["thaang-aawk-muu-baan", "ทางออกหมู่บ้าน", "thaang aawk muu baan", "小区出口", "名词", "社区"],
  ["suan-saa-thaa-ra-na", "สวนสาธารณะ", "suan saa-thaa-ra-na", "公园", "名词", "公园"],
  ["suan-dek-len", "สวนเด็กเล่น", "suan dek len", "儿童游乐区", "名词", "公园"],
  ["sanam-dek-len", "สนามเด็กเล่น", "sa-naam dek len", "游乐场", "名词", "公园"],
  ["sanam-yaa", "สนามหญ้า", "sa-naam yaa", "草坪", "名词", "公园"],
  ["thaang-doen-len", "ทางเดินเล่น", "thaang doen len", "散步道", "名词", "公园"],
  ["thaang-wing", "ทางวิ่ง", "thaang wing", "跑步道", "名词", "公园"],
  ["maai-nang", "ม้านั่ง", "maa nang", "长椅", "名词", "公园"],
  ["thii-aawk-gam-lang-gaai", "ที่ออกกำลังกาย", "thii aawk-gam-lang-gaai", "健身区", "名词", "公园"],
  ["thii-phak-phaawn", "ที่พักผ่อน", "thii phak phaawn", "休息处", "名词", "公园"],
  ["sa-bueng", "สระบึง", "sa bueang", "池塘；水池", "名词", "公园"],
  ["ton-maai-yai", "ต้นไม้ใหญ่", "dton maai yai", "大树", "名词", "附近环境"],
  ["rom-mai", "ร่มไม้", "rom mai", "树荫", "名词", "附近环境"],
  ["haawng-sa-mut", "ห้องสมุด", "haawng sa-mut", "图书馆", "名词", "图书馆"],
  ["bat-haawng-sa-mut", "บัตรห้องสมุด", "bat haawng sa-mut", "图书馆卡", "名词", "图书馆"],
  ["yeum-nang-sue", "ยืมหนังสือ", "yeum nang-sue", "借书", "动词", "图书馆"],
  ["khuen-nang-sue", "คืนหนังสือ", "kheun nang-sue", "还书", "动词", "图书馆"],
  ["chan-nang-sue", "ชั้นหนังสือ", "chan nang-sue", "书架", "名词", "图书馆"],
  ["mum-aan-nang-sue", "มุมอ่านหนังสือ", "mum aan nang-sue", "阅读角", "名词", "图书馆"],
  ["haam-song-siang", "ห้ามส่งเสียง", "haam song siiang", "禁止喧哗", "短语", "图书馆"],
  ["ao-nang-sue-maa-khuen", "เอาหนังสือมาคืน", "ao nang-sue maa kheun", "把书拿来还", "动词", "图书馆"],
  ["dtam-ruat", "ตำรวจ", "dtam-ruat", "警察", "名词", "警察局"],
  ["sathanii-dtam-ruat", "สถานีตำรวจ", "sa-thaa-nii dtam-ruat", "警察局", "名词", "警察局"],
  ["pom-dtam-ruat", "ป้อมตำรวจ", "bpaawm dtam-ruat", "警亭", "名词", "警察局"],
  ["jaaeng-khwaam", "แจ้งความ", "jaaeng khwaam", "报案", "动词", "警察局"],
  ["jao-naa-thii", "เจ้าหน้าที่", "jao naa thii", "工作人员；办事人员", "名词", "办事点"],
  ["khaaw-khwaam-chuai-luea", "ขอความช่วยเหลือ", "khaaw khwaam chuai leuua", "请求帮助", "动词", "办事点"],
  ["khaaw-muun", "ข้อมูล", "khaaw muun", "信息；资料", "名词", "办事点"],
  ["bai-khaaw", "ใบขอ", "bai khaaw", "申请单", "名词", "办事点"],
  ["graawk-baaep-faawm", "กรอกแบบฟอร์ม", "graawk baaep faawm", "填写表格", "动词", "办事点"],
  ["baep-faawm", "แบบฟอร์ม", "baaep faawm", "表格", "名词", "办事点"],
  ["yuen-eek-ga-saan", "ยื่นเอกสาร", "yeun eek-ga-saan", "递交文件", "动词", "办事点"],
  ["eek-ga-saan", "เอกสาร", "eek-ga-saan", "文件", "名词", "办事点"],
  ["sam-nao", "สำเนา", "sam-nao", "复印件", "名词", "办事点"],
  ["thaai-sam-nao", "ถ่ายสำเนา", "thaai sam-nao", "复印", "动词", "办事点"],
  ["thii-thai-eek-ga-saan", "ที่ถ่ายเอกสาร", "thii thaai eek-ga-saan", "复印处", "名词", "办事点"],
  ["wat", "วัด", "wat", "寺庙", "名词", "寺庙"],
  ["phra", "พระ", "phra", "僧人；佛像", "名词", "寺庙"],
  ["boht", "โบสถ์", "boot", "佛殿；礼拜殿", "名词", "寺庙"],
  ["chedii", "เจดีย์", "jee-dii", "佛塔", "名词", "寺庙"],
  ["tham-bun", "ทำบุญ", "tham bun", "做功德；行善布施", "动词", "寺庙"],
  ["wai-phra", "ไหว้พระ", "wai phra", "拜佛", "动词", "寺庙"],
  ["thawaai-aa-haan", "ถวายอาหาร", "tha-waai aa-haan", "供奉食物给僧人", "动词", "寺庙"],
  ["thod-raawng-thaao", "ถอดรองเท้า", "thaawt raawng-thaao", "脱鞋", "动词", "公共规则"],
  ["dtaeng-dtua-su-phaap", "แต่งตัวสุภาพ", "dtaeng dtua su-phaap", "穿着得体", "动词", "公共规则"],
  ["dta-laat", "ตลาด", "dta-laat", "市场", "名词", "市场"],
  ["dta-laat-sot", "ตลาดสด", "dta-laat sot", "生鲜市场", "名词", "市场"],
  ["dta-laat-nat", "ตลาดนัด", "dta-laat nat", "集市；临时市场", "名词", "市场"],
  ["raan-khaa", "ร้านค้า", "raan khaa", "商店；摊店", "名词", "市场"],
  ["phaa-khaai", "แผงขาย", "phaaeng khaai", "摊位", "名词", "市场"],
  ["khon-khaai", "คนขาย", "khon khaai", "卖家；摊主", "名词", "市场"],
  ["luuk-khaa", "ลูกค้า", "luuk khaa", "顾客", "名词", "市场"],
  ["dtaaw-raa-khaa", "ต่อราคา", "dtaaw raa-khaa", "讲价", "动词", "市场"],
  ["thung-phaa", "ถุงผ้า", "thung phaa", "布袋；环保袋", "名词", "市场"],
  ["thaang-doen", "ทางเดิน", "thaang doen", "走道；通道", "名词", "公共设施"],
  ["thaang-khao", "ทางเข้า", "thaang khao", "入口", "名词", "公共设施"],
  ["thaang-aawk", "ทางออก", "thaang aawk", "出口", "名词", "公共设施"],
  ["haawng-naam-saa-thaa-ra-na", "ห้องน้ำสาธารณะ", "haawng naam saa-thaa-ra-na", "公共厕所", "名词", "公共设施"],
  ["thii-jon-rot", "ที่จอดรถ", "thii jaawt rot", "停车处", "名词", "公共设施"],
  ["bpaai-rot-mee", "ป้ายรถเมล์", "bpaai rot mee", "公交站牌", "名词", "公共设施"],
  ["sa-thaa-nii", "สถานี", "sa-thaa-nii", "车站；站点", "名词", "公共设施"],
  ["saphan-laawy", "สะพานลอย", "sa-phaan laawy", "天桥", "名词", "公共设施"],
  ["thaang-maa-laai", "ทางม้าลาย", "thaang maa-laai", "人行横道", "名词", "公共设施"],
  ["fai-daaeng", "ไฟแดง", "fai daaeng", "红绿灯", "名词", "公共设施"],
  ["fai-thaang", "ไฟทาง", "fai thaang", "路灯", "名词", "公共设施"],
  ["thang-kha-ya", "ถังขยะ", "thang kha-ya", "垃圾桶", "名词", "公共设施"],
  ["bpaai-bok-thaang", "ป้ายบอกทาง", "bpaai baawk thaang", "指路牌", "名词", "公共设施"],
  ["bpaai-dteuan", "ป้ายเตือน", "bpaai dteuan", "警示牌", "名词", "公共规则"],
  ["got-ra-biiap", "กฎระเบียบ", "got ra-biiap", "规章；规则", "名词", "公共规则"],
  ["tham-dtaam-got", "ทำตามกฎ", "tham dtaam got", "遵守规则", "动词", "公共规则"],
  ["haam-suu-bu-rii", "ห้ามสูบบุหรี่", "haam suup bu-rii", "禁止吸烟", "短语", "公共规则"],
  ["haam-tham-kha-ya", "ห้ามทิ้งขยะ", "haam thing kha-ya", "禁止扔垃圾", "短语", "公共规则"],
  ["haam-song-siang-dang", "ห้ามส่งเสียงดัง", "haam song siiang dang", "禁止大声喧哗", "短语", "公共规则"],
  ["haam-sat-liiang", "ห้ามสัตว์เลี้ยง", "haam sat liiang", "禁止宠物", "短语", "公共规则"],
  ["bpit-bpaai", "ปิดป้าย", "bpit bpaai", "贴告示；挂牌", "动词", "公共规则"],
  ["khaaw-khwaam-ruam-mue", "ขอความร่วมมือ", "khaaw khwaam ruam mue", "请求配合", "短语", "公共规则"],
  ["rak-saa-khwaam-sa-aat", "รักษาความสะอาด", "rak-saa khwaam sa-aat", "保持清洁", "动词", "公共规则"],
  ["rak-saa-khwaam-ngiap", "รักษาความเงียบ", "rak-saa khwaam ngiiap", "保持安静", "动词", "公共规则"],
  ["boriwen", "บริเวณ", "baaw-ri-ween", "区域；附近范围", "名词", "附近环境"],
  ["la-waaek", "ละแวก", "la-waaek", "一带；附近区域", "名词", "附近环境"],
  ["khaang-khiang", "ข้างเคียง", "khaang khiiang", "邻近的；附近的", "形容词", "附近环境"],
  ["rim-tha-non", "ริมถนน", "rim tha-non", "路边", "名词", "附近环境"],
  ["khaang-thaang", "ข้างทาง", "khaang thaang", "路旁", "名词", "附近环境"],
  ["muu-baan-glai-khiang", "หมู่บ้านใกล้เคียง", "muu-baan glai khiiang", "附近小区/村子", "名词", "附近环境"],
  ["sii-yaaek", "สี่แยก", "sii yaaek", "十字路口", "名词", "附近环境"],
  ["saam-yaaek", "สามแยก", "saam yaaek", "三岔路口", "名词", "附近环境"],
];

const relatedByTheme: Record<VocabularyExpansionTheme, VocabularyExpansionRelated> = {
  社区: { thai: "ชุมชน", roman: "chum chon", chinese: "社区" },
  公共设施: { thai: "สถานที่สาธารณะ", roman: "sa-thaan-thii saa-thaa-ra-na", chinese: "公共场所" },
  公园: { thai: "สวนสาธารณะ", roman: "suan saa-thaa-ra-na", chinese: "公园" },
  图书馆: { thai: "ห้องสมุด", roman: "haawng sa-mut", chinese: "图书馆" },
  警察局: { thai: "สถานีตำรวจ", roman: "sa-thaa-nii dtam-ruat", chinese: "警察局" },
  寺庙: { thai: "วัด", roman: "wat", chinese: "寺庙" },
  市场: { thai: "ตลาด", roman: "dta-laat", chinese: "市场" },
  办事点: { thai: "เจ้าหน้าที่", roman: "jao-naa-thii", chinese: "工作人员" },
  公共规则: { thai: "กฎระเบียบ", roman: "got ra-biiap", chinese: "规则" },
  附近环境: { thai: "บริเวณ", roman: "baaw-ri-ween", chinese: "区域" },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในชุมชนของฉันมีคำว่า “${row[1]}” บนป้าย เพื่อให้คนรู้วิธีใช้สถานที่สาธารณะอย่างถูกต้อง`,
  roman: `nai chum-chon khaawng chan mii kham waa "${row[2]}" bon bpaai phuea hai khon ruu wi-thii chai sa-thaan-thii saa-thaa-ra-na yaang thuuk dtawng`,
  chinese: `在我的社区里，牌子上有“${row[1]}”这个表达，让人们知道怎样正确使用公共场所。`,
});

const buildCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];
  const comparison: VocabularyExpansionComparison = { kind: "usage", target: related, distinctionZh: `${row[1]} 属于“${row[5]}”场景；和 ${related.thai} 对照记，可以分清公共地点、办事点、规则和附近环境。` };
  const collocations = [{ thai: row[1], roman: row[2], chinese: row[3] }, related];
  return {
    id: row[0], thai: row[1], roman: row[2], chinese: row[3], partOfSpeech: row[4], theme: row[5], level: "a2", priority: index + 1,
    senses: [{ id: `${row[0]}-main`, chinese: row[3], examples: [exampleFor(row)], synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5]] }],
    synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5], "A2基础", "社区公共场所"], sourceRefs: COMMUNITY_REFS, reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_COMMUNITY_PUBLIC_PLACES_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
