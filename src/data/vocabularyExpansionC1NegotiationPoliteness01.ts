export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "谈判" | "委婉拒绝" | "给台阶" | "催促" | "保留意见" | "反提议" | "关系维护";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = {
  id: string;
  chinese: string;
  examples: VocabularyExpansionExample[];
  synonyms: VocabularyExpansionRelatedWord[];
  antonyms: VocabularyExpansionRelatedWord[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  usageNotesZh: string[];
  tags: string[];
};
export type VocabularyExpansionCandidate = {
  thai: string;
  id: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  level: "c1";
  priority: number;
  senses: VocabularyExpansionSense[];
  synonyms: VocabularyExpansionRelatedWord[];
  antonyms: VocabularyExpansionRelatedWord[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  usageNotesZh: string[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: "candidate-draft";
};

type RelationKind = "近义" | "反义" | "易混" | "用法";
type Row = readonly [string, string, string, string, VocabularyExpansionPartOfSpeech, VocabularyExpansionTheme, number, string, string, string, string, string, string, RelationKind, string, string];

const NEGOTIATION_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thai-negotiation-politeness-candidate"];

const rows = [
  ["ข้อเสนอเบื้องต้น", "khaaw-sa-noe-beuang-dton", "khaaw sa-noe beuang dton", "初步提议；尚可调整的方案", "名词", "谈判", 1, "ข้อเสนอเบื้องต้นที่ยังปรับได้", "khaaw sa-noe beuang dton thii yang bprap dai", "仍可调整的初步提议", "ข้อเสนอสุดท้าย", "khaaw-sa-noe-sut-thaai", "最终提议", "反义", "用于避免把方案说死，给后续谈判留下空间。", "proposal"],
  ["เงื่อนไขร่วม", "ngeuan-khai-ruam", "ngeuan khai ruam", "共同条件；双方都需接受的条件", "名词", "谈判", 2, "กำหนดเงื่อนไขร่วมให้ชัด", "gam-not ngeuan khai ruam hai chat", "明确共同条件", "เงื่อนไขฝ่ายเดียว", "ngeuan-khai-faai-diao", "单方条件", "反义", "强调条件不是单方面强加，而是双方协商出来的。", "condition"],
  ["จุดยืน", "jut-yeun", "jut yeun", "立场；原则位置", "名词", "谈判", 3, "ชี้แจงจุดยืนของเราอย่างสุภาพ", "chii-jaaeng jut yeun khaawng rao yaang su-phaap", "礼貌说明我方立场", "จุดยืดหยุ่น", "jut-yeut-yun", "可弹性调整点", "易混", "จุดยืน 较硬，表示原则；จุดยืดหยุ่น 表示可谈空间。", "stance"],
  ["จุดยืดหยุ่น", "jut-yeut-yun", "jut yeut yun", "弹性空间；可让步处", "名词", "谈判", 4, "หา จุดยืดหยุ่น ก่อนตอบกลับคู่เจรจา", "haa jut yeut yun gaawn dtaawp glap khuu jee-ra-jaa", "回复谈判对象前先找可弹性调整点", "จุดยืน", "jut-yeun", "立场", "易混", "用于内部讨论哪些地方可让步，哪些地方不可动。", "stance"],
  ["ทางออกกลาง", "thaang-aawk-glaang", "thaang aawk glaang", "折中方案；中间出路", "名词", "反提议", 5, "เสนอทางออกกลางที่ทั้งสองฝ่ายรับได้", "sa-noe thaang aawk glaang thii thang saawng faai rap dai", "提出双方都能接受的折中方案", "ทางเลือกฝ่ายเดียว", "thaang-leuuak-faai-diao", "单方选择", "反义", "强调不是单方胜利，而是让双方都能继续合作。", "compromise"],
  ["ข้อแลกเปลี่ยน", "khaaw-laaek-bpliian", "khaaw laaek bpliian", "交换条件；让步换取的条件", "名词", "谈判", 6, "วางข้อแลกเปลี่ยนให้สมดุล", "waang khaaw laaek bpliian hai som-dun", "设置平衡的交换条件", "ข้อเรียกร้อง", "khaaw-riiak-raawng", "要求；诉求", "易混", "ข้อแลกเปลี่ยน 含有互换意味；ข้อเรียกร้อง 可能只是单方要求。", "tradeoff"],
  ["ข้อกังวล", "khaaw-gang-won", "khaaw gang-won", "顾虑；担忧点", "名词", "保留意见", 7, "รับฟังข้อกังวลของอีกฝ่ายก่อนตอบ", "rap fang khaaw gang-won khaawng iik faai gaawn dtaawp", "先听取对方顾虑再回应", "ข้อกล่าวหา", "khaaw-glaao-haa", "指控", "易混", "ข้อกังวล 是担心，不是指控；语气更温和。", "concern"],
  ["ประเด็นค้าง", "bpra-den-khaang", "bpra-den khaang", "悬而未决的问题", "名词", "谈判", 8, "สรุปประเด็นค้างไว้คุยรอบหน้า", "sa-ruup bpra-den khaang wai khui raawp naa", "总结待下轮讨论的悬而未决问题", "ข้อสรุป", "khaaw-sa-ruup", "结论", "反义", "用于会议收尾，说明哪些点还未达成结论。", "pending"],
  ["ภาพรวมการเจรจา", "phaap-ruam-gaan-jee-ra-jaa", "phaap ruam gaan jee-ra-jaa", "谈判整体情况；谈判全貌", "名词", "谈判", 9, "มองภาพรวมการเจรจาก่อนตัดสินใจ", "maawng phaap ruam gaan jee-ra-jaa gaawn dtat-sin-jai", "决策前先看谈判全貌", "รายละเอียดปลีกย่อย", "raai-la-iiat-bpliik-yaawy", "细枝末节", "反义", "ภาพรวม 强调整体判断，不陷入单个细节。", "overview"],
  ["ท่าที", "thaa-thii", "thaa thii", "态度；姿态；对外口径", "名词", "谈判", 10, "รักษาท่าทีที่เปิดกว้างแต่ไม่เสียหลัก", "rak-saa thaa thii thii bpoet gwaang dtaae mai siia lak", "保持开放但不失原则的姿态", "คำตอบชัดเจน", "kham-dtaawp-chat-jen", "明确回答", "易混", "ท่าที 是整体姿态，不一定等于最终答案。", "posture"],
  ["รักษาบรรยากาศ", "rak-saa-ban-yaa-gaat", "rak-saa ban-yaa-gaat", "维护沟通氛围", "动词", "关系维护", 11, "รักษาบรรยากาศแม้ต้องพูดเรื่องยาก", "rak-saa ban-yaa-gaat maae dtawng phuut rueang yaak", "即使要谈困难话题也维护氛围", "กดดันตรง ๆ", "got-dan-dtrong-dtrong", "直接施压", "反义", "用于高敏感谈判，避免关系因措辞变差。", "rapport"],
  ["เปิดพื้นที่", "bpoet-pheun-thii", "bpoet pheun-thii", "留出讨论空间；打开余地", "动词", "关系维护", 12, "เปิดพื้นที่ให้อีกฝ่ายอธิบายเหตุผล", "bpoet pheun-thii hai iik faai a-thi-baai het-phon", "给对方留出解释理由的空间", "ปิดประเด็น", "bpit-bpra-den", "关闭议题", "反义", "不是立刻同意，而是让对话能继续。", "rapport"],
  ["รับฟังข้อเสนอ", "rap-fang-khaaw-sa-noe", "rap fang khaaw sa-noe", "听取提议；先接住方案", "动词", "关系维护", 13, "รับฟังข้อเสนอก่อนชี้ข้อจำกัด", "rap fang khaaw sa-noe gaawn chii khaaw jam-gat", "先听取提议，再指出限制", "ปฏิเสธทันที", "bpa-dti-seet-than-thii", "立即拒绝", "反义", "用于缓和语气，表示尊重对方表达。", "listening"],
  ["ขอพิจารณา", "khaaw-phi-jaa-ra-naa", "khaaw phi-jaa-ra-naa", "请容许考虑；需要评估", "短语", "保留意见", 14, "ขอพิจารณารายละเอียดก่อนให้คำตอบ", "khaaw phi-jaa-ra-naa raai-la-iiat gaawn hai kham-dtaawp", "请先容我们评估细节再答复", "ตอบตกลงทันที", "dtaawp-dtok-long-than-thii", "立即答应", "反义", "比直接说不更委婉，也比拖延更正式。", "reserve"],
  ["ยังไม่สะดวก", "yang-mai-sa-duak", "yang mai sa-duak", "目前不方便；暂时难以配合", "短语", "委婉拒绝", 15, "ช่วงนี้เรายังไม่สะดวกปรับเงื่อนไข", "chuang nii rao yang mai sa-duak bprap ngeuan khai", "这段时间我们暂时不方便调整条件", "สะดวกทันที", "sa-duak-than-thii", "立刻方便", "反义", "常用于软化拒绝，避免直接说ทำไม่ได้。", "refusal"],
  ["เกรงว่าจะ", "greeng-waa-ja", "greeng waa ja", "恐怕会；担心会", "短语", "委婉拒绝", 16, "เกรงว่าจะไม่ทันตามกำหนดเดิม", "greeng waa ja mai than dtaam gam-not doem", "恐怕赶不上原定时间", "มั่นใจว่า", "man-jai-waa", "确信会", "反义", "比直接พูดว่าไม่ได้更含蓄，常引出坏消息。", "softener"],
  ["อาจต้องขอผ่าน", "aat-dtawng-khaaw-phaan", "aat dtawng khaaw phaan", "可能只能婉拒；这次先不参与", "短语", "委婉拒绝", 17, "ข้อเสนอนี้เราอาจต้องขอผ่านก่อน", "khaaw sa-noe nii rao aat dtawng khaaw phaan gaawn", "这个提议我们这次可能只能先婉拒", "ยินดีเข้าร่วม", "yin-dii-khao-ruam", "愿意参加", "反义", "ขอผ่าน 口语中较柔和，但正式场合要配理由。", "refusal"],
  ["ไม่ปิดโอกาส", "mai-bpit-oo-gaat", "mai bpit oo-gaat", "不排除机会；保留可能性", "短语", "关系维护", 18, "เราไม่ปิดโอกาสที่จะกลับมาคุยกันใหม่", "rao mai bpit oo-gaat thii ja glap maa khui gan mai", "我们不排除以后重新沟通的机会", "ปิดโอกาส", "bpit-oo-gaat", "关闭机会", "反义", "拒绝当下条件时保留未来关系，非常适合给台阶。", "rapport"],
  ["ขอสงวนท่าที", "khaaw-sa-nguan-thaa-thii", "khaaw sa-nguan thaa thii", "暂不表态；保留态度", "短语", "保留意见", 19, "ฝ่ายเราขอสงวนท่าทีจนกว่าจะเห็นเอกสารฉบับเต็ม", "faai rao khaaw sa-nguan thaa thii jon gwaa ja hen eek-ga-saan cha-bap dtem", "我方在看到完整文件前暂不表态", "แสดงจุดยืนทันที", "sa-daaeng-jut-yeun-than-thii", "立即表明立场", "反义", "比เงียบเฉย更正式，表示有意识地保留。", "reserve"],
  ["ขอสงวนสิทธิ์", "khaaw-sa-nguan-sit", "khaaw sa-nguan sit", "保留权利；保留追究/调整权", "短语", "保留意见", 20, "บริษัทขอสงวนสิทธิ์ในการปรับเงื่อนไขตามสถานการณ์", "baaw-ri-sat khaaw sa-nguan sit nai gaan bprap ngeuan khai dtaam sa-thaa-na-gaan", "公司保留根据情况调整条件的权利", "สละสิทธิ์", "sa-la-sit", "放弃权利", "反义", "法律和商务文本常用，语气比ขอสงวนท่าที更正式。", "legal"],
  ["ขอหารือภายใน", "khaaw-haa-reuu-phaai-nai", "khaaw haa-reuu phaai nai", "需要内部讨论", "短语", "保留意见", 21, "ขอหารือภายในก่อนตอบรับเงื่อนไขใหม่", "khaaw haa-reuu phaai nai gaawn dtaawp rap ngeuan khai mai", "接受新条件前需要先内部讨论", "ตัดสินใจเดี๋ยวนี้", "dtat-sin-jai-diao-nii", "现在决定", "反义", "常用于避免被迫当场表态。", "internal"],
  ["ขอเวลาตรวจสอบ", "khaaw-wee-laa-dtruat-saawp", "khaaw wee-laa dtruat saawp", "需要时间核查", "短语", "保留意见", 22, "ขอเวลาตรวจสอบตัวเลขก่อนยืนยัน", "khaaw wee-laa dtruat saawp dtua-leek gaawn yeun-yan", "确认前需要时间核查数字", "ยืนยันโดยไม่ตรวจ", "yeun-yan-dooi-mai-dtruat", "未经核查就确认", "反义", "适合对数据、金额、责任范围保留意见。", "verify"],
  ["ตามที่เข้าใจ", "dtaam-thii-khao-jai", "dtaam thii khao jai", "按目前理解；据我方理解", "短语", "谈判", 23, "ตามที่เข้าใจ เงื่อนไขนี้ยังไม่รวมค่าขนส่ง", "dtaam thii khao jai, ngeuan khai nii yang mai ruaam khaa khon-song", "按目前理解，此条件尚未包含运输费", "ข้อเท็จจริงยืนยันแล้ว", "khaaw-thet-jing-yeun-yan-laaeo", "已确认事实", "易混", "可降低断言强度，表示欢迎对方修正。", "framing"],
  ["หากเป็นไปได้", "haak-bpen-bpai-dai", "haak bpen bpai dai", "如果可行的话", "短语", "反提议", 24, "หากเป็นไปได้ เราอยากขยับกำหนดส่งออกไปหนึ่งสัปดาห์", "haak bpen bpai dai, rao yaak kha-yap gam-not song aawk bpai neung sap-daa", "如果可行，我们希望把交期往后移一周", "ต้องเป็นแบบนี้", "dtawng-bpen-baaep-nii", "必须这样", "反义", "把要求包装成可协商请求，语气更柔。", "softener"],
  ["ในหลักการ", "nai-lak-gaan", "nai lak gaan", "原则上；从原则看", "短语", "谈判", 25, "ในหลักการ เราเห็นด้วยกับทิศทางนี้", "nai lak gaan, rao hen duai gap thit-thaang nii", "原则上我们同意这个方向", "ในรายละเอียด", "nai-raai-la-iiat", "在细节上", "反义", "可先肯定大方向，再保留细节谈判空间。", "principle"],
  ["ในทางปฏิบัติ", "nai-thaang-bpa-dti-bat", "nai thaang bpa-dti-bat", "在执行层面；实际操作上", "短语", "保留意见", 26, "ในทางปฏิบัติ เงื่อนไขนี้อาจทำให้ต้นทุนสูงขึ้นมาก", "nai thaang bpa-dti-bat, ngeuan khai nii aat tham-hai dton-thun suung kheun maak", "在实际操作上，这个条件可能让成本大幅上升", "ในหลักการ", "nai-lak-gaan", "原则上", "反义", "常用于“原则同意，但执行有难度”的结构。", "implementation"],
  ["ข้อจำกัด", "khaaw-jam-gat", "khaaw jam-gat", "限制；约束条件", "名词", "保留意见", 27, "อธิบายข้อจำกัดโดยไม่โยนความผิดให้อีกฝ่าย", "a-thi-baai khaaw jam-gat dooi mai yoon khwaam phit hai iik faai", "说明限制时不要把责任推给对方", "ศักยภาพเต็มที่", "sak-ga-ya-phaap-dtem-thii", "全部能力", "反义", "ข้อจำกัด 用于解释为什么不能完全接受某要求。", "constraint"],
  ["ความคาดหวัง", "khwaam-khaat-wang", "khwaam khaat wang", "期望；预期", "名词", "谈判", 28, "ปรับความคาดหวังให้ตรงกันตั้งแต่ต้น", "bprap khwaam khaat wang hai dtrong gan dtang-dtaae dton", "从一开始就校准双方预期", "ข้อเท็จจริง", "khaaw-thet-jing", "事实", "易混", "ความคาดหวัง 是心理预期，不一定等于合同义务。", "expectation"],
  ["ผลประโยชน์ร่วม", "phon-bpra-yoot-ruam", "phon bpra-yoot ruam", "共同利益", "名词", "关系维护", 29, "ย้ำผลประโยชน์ร่วมก่อนเข้าสู่ประเด็นขัดแย้ง", "yam phon bpra-yoot ruam gaawn khao suu bpra-den khat-yaaeng", "进入争议议题前先强调共同利益", "ผลประโยชน์ฝ่ายเดียว", "phon-bpra-yoot-faai-diao", "单方利益", "反义", "有助于把谈判从对抗拉回合作框架。", "rapport"],
  ["ความไว้เนื้อเชื่อใจ", "khwaam-wai-neuua-cheuua-jai", "khwaam wai neuua cheuua jai", "信任；互信", "名词", "关系维护", 30, "รักษาความไว้เนื้อเชื่อใจแม้ต่อรองราคาอย่างหนัก", "rak-saa khwaam wai neuua cheuua jai maae dtaaw-raawng raa-khaa yaang nak", "即使强力议价也维护互信", "ความระแวง", "khwaam-ra-waaeng", "猜疑", "反义", "谈判不是只看价格，也要保留长期互信。", "trust"],
  ["สัญญาณบวก", "san-yaan-buak", "san-yaan buak", "积极信号", "名词", "关系维护", 31, "คำตอบของเขาเป็นสัญญาณบวกแต่ยังไม่ใช่คำตกลง", "kham-dtaawp khaawng khao bpen san-yaan buak dtaae yang mai chai kham dtok-long", "他的回答是积极信号，但还不是正式同意", "สัญญาณลบ", "san-yaan-lop", "负面信号", "反义", "用于判断谈判气氛，不可误当成正式承诺。", "signal"],
  ["ทางเลือกสำรอง", "thaang-leuuak-sam-raawng", "thaang leuuak sam raawng", "备用选择；替代方案", "名词", "反提议", 32, "เตรียมทางเลือกสำรองเผื่อข้อเสนอหลักไม่ผ่าน", "dtriiam thaang leuuak sam raawng pheua khaaw sa-noe lak mai phaan", "准备备用方案，以防主方案未通过", "ทางเลือกหลัก", "thaang-leuuak-lak", "主要选择", "反义", "谈判中可降低被单一方案卡住的风险。", "fallback"],
  ["ข้อเสนอปรับปรุง", "khaaw-sa-noe-bprap-bprung", "khaaw sa-noe bprap bprung", "修订提议；改进方案", "名词", "反提议", 33, "ส่งข้อเสนอปรับปรุงหลังรับฟังข้อกังวล", "song khaaw sa-noe bprap bprung lang rap fang khaaw gang-won", "听取顾虑后发送修订提议", "ข้อเสนอเดิม", "khaaw-sa-noe-doem", "原提议", "反义", "用于回应对方反馈，表示有调整诚意。", "counter"],
  ["ข้อเสนอแลกเปลี่ยน", "khaaw-sa-noe-laaek-bpliian", "khaaw sa-noe laaek bpliian", "交换式提议；附带让步的提议", "名词", "反提议", 34, "ยื่นข้อเสนอแลกเปลี่ยนแทนการลดราคาอย่างเดียว", "yeun khaaw sa-noe laaek bpliian thaaen gaan lot raa-khaa yaang diao", "提出交换式提议，而不是单纯降价", "ส่วนลดฝ่ายเดียว", "suan-lot-faai-diao", "单方折扣", "反义", "强调“我让一步，你也给条件”，适合高级谈判。", "counter"],
  ["ยื่นข้อเสนอ", "yeun-khaaw-sa-noe", "yeun khaaw sa-noe", "提交提议；正式提出条件", "动词", "谈判", 35, "ยื่นข้อเสนอเป็นลายลักษณ์อักษรเพื่อป้องกันความเข้าใจผิด", "yeun khaaw sa-noe bpen laai-lak-ak-sawn phuea bpaawng-gan khwaam khao-jai phit", "以书面提交提议以防误解", "ถอนข้อเสนอ", "thaawn-khaaw-sa-noe", "撤回提议", "反义", "ยื่น 有正式递交意味，比พูดเล่น更正式。", "proposal"],
  ["รับข้อเสนอ", "rap-khaaw-sa-noe", "rap khaaw sa-noe", "接受提议", "动词", "谈判", 36, "เราจะรับข้อเสนอหากปรับเงื่อนไขการชำระเงินได้", "rao ja rap khaaw sa-noe haak bprap ngeuan khai gaan cham-ra ngoen dai", "如果能调整付款条件，我们会接受提议", "ปฏิเสธข้อเสนอ", "bpa-dti-seet-khaaw-sa-noe", "拒绝提议", "反义", "可接条件句，表示接受有前提。", "accept"],
  ["ปฏิเสธอย่างสุภาพ", "bpa-dti-seet-yaang-su-phaap", "bpa-dti-seet yaang su-phaap", "礼貌拒绝", "动词", "委婉拒绝", 37, "ปฏิเสธอย่างสุภาพพร้อมเสนอทางเลือกอื่น", "bpa-dti-seet yaang su-phaap phraawm sa-noe thaang leuuak euen", "礼貌拒绝并同时提出其他选择", "ปฏิเสธตรง ๆ", "bpa-dti-seet-dtrong-dtrong", "直接拒绝", "易混", "礼貌拒绝不是含糊不清，而是保留尊重和关系。", "refusal"],
  ["ให้เกียรติ", "hai-giiat", "hai giiat", "给予尊重；尊重对方身份", "动词", "关系维护", 38, "ให้เกียรติผู้ร่วมประชุมแม้ไม่เห็นด้วย", "hai giiat phuu ruam bpra-chum maae mai hen duai", "即使不同意也尊重参会者", "หักหน้า", "hak-naa", "让人丢脸", "反义", "C1 场景中常用来处理不同意见。", "respect"],
  ["รักษาหน้า", "rak-saa-naa", "rak-saa naa", "保全面子；让对方不难堪", "动词", "给台阶", 39, "รักษาหน้าอีกฝ่ายเมื่อจำเป็นต้องแก้ข้อมูลต่อหน้าทีม", "rak-saa naa iik faai muea jam-bpen dtawng gaae khaaw-muun dtaaw naa thiim", "必须当团队面修正信息时，也要保全面子", "หักหน้า", "hak-naa", "当众让人难堪", "反义", "比普通礼貌更强调泰语语境中的面子处理。", "face"],
  ["ให้ทางลง", "hai-thaang-long", "hai thaang long", "给台阶；给对方退路", "动词", "给台阶", 40, "ให้ทางลงเพื่อให้อีกฝ่ายเปลี่ยนจุดยืนได้โดยไม่เสียหน้า", "hai thaang long phuea hai iik faai bplian jut yeun dai dooi mai siia naa", "给对方台阶，让其能不丢脸地改变立场", "บีบจนมุม", "biip-jon-mum", "逼到角落", "反义", "是关系维护中的高级策略。", "face"],
  ["ไม่อยากให้เสียความรู้สึก", "mai-yaak-hai-siia-khwaam-ruu-seuk", "mai yaak hai siia khwaam ruu-seuk", "不想伤感情", "短语", "给台阶", 41, "เราไม่อยากให้เสียความรู้สึก แต่จำเป็นต้องชี้แจงตัวเลข", "rao mai yaak hai siia khwaam ruu-seuk dtaae jam-bpen dtawng chii-jaaeng dtua-leek", "我们不想伤感情，但必须说明数字", "พูดไม่ไว้หน้า", "phuut-mai-wai-naa", "说话不给面子", "反义", "适合在纠正对方前先软化语气。", "face"],
  ["ขอตรงไปตรงมา", "khaaw-dtrong-bpai-dtrong-maa", "khaaw dtrong bpai dtrong maa", "请允许我直说", "短语", "保留意见", 42, "ขอตรงไปตรงมา เงื่อนไขนี้เสี่ยงเกินกว่าที่เรารับได้", "khaaw dtrong bpai dtrong maa, ngeuan khai nii siiang goen gwaa thii rao rap dai", "请允许我直说，这个条件超出我们能承担的风险", "พูดอ้อม ๆ", "phuut-aawm-aawm", "绕着说", "反义", "直接表达前加缓冲，减少冒犯感。", "candor"],
  ["ด้วยความเคารพ", "duai-khwaam-khao-rop", "duai khwaam khao rop", "恕我直言；带着尊重地说", "短语", "保留意见", 43, "ด้วยความเคารพ เราเห็นว่าข้อมูลชุดนี้ยังไม่พอ", "duai khwaam khao rop, rao hen waa khaaw-muun chut nii yang mai phaaw", "恕我直言，我们认为这组数据还不够", "ไม่ให้เกียรติ", "mai-hai-giiat", "不尊重", "反义", "常用于提出不同意见，语气正式。", "candor"],
  ["ขอเรียนตามตรง", "khaaw-riian-dtaam-dtrong", "khaaw riian dtaam dtrong", "请允许如实说明；坦率地汇报", "短语", "保留意见", 44, "ขอเรียนตามตรงว่าเรายังไม่พร้อมรับเงื่อนไขนี้", "khaaw riian dtaam dtrong waa rao yang mai phraawm rap ngeuan khai nii", "请允许如实说明，我们还没准备好接受此条件", "ขอเรียนโดยอ้อม", "khaaw-riian-dooi-aawm", "委婉绕说", "反义", "比ขอตรงไปตรงมา更正式，适合会议或邮件。", "formal"],
  ["ขออนุญาตชี้แจง", "khaaw-a-nu-yaat-chii-jaaeng", "khaaw a-nu-yaat chii-jaaeng", "请允许说明", "短语", "关系维护", 45, "ขออนุญาตชี้แจงเหตุผลก่อนสรุปว่าเราไม่เห็นด้วย", "khaaw a-nu-yaat chii-jaaeng het-phon gaawn sa-ruup waa rao mai hen duai", "在总结我们不同意前，请允许先说明理由", "ขัดจังหวะทันที", "khat-jang-wa-than-thii", "立刻打断", "反义", "用来礼貌插入解释，降低打断感。", "formal"],
  ["ไม่ได้ติดใจ", "mai-dai-dtit-jai", "mai dai dtit jai", "并不介意；没有记在心上", "短语", "关系维护", 46, "เราไม่ได้ติดใจเรื่องที่ผ่านมา แต่อยากปรับขั้นตอนใหม่", "rao mai dai dtit jai rueang thii phaan maa dtaae yaak bprap khan-dtaawn mai", "我们并不介意过去的事，只是想调整流程", "ติดใจ", "dtit-jai", "介意；放不下", "反义", "用于化解旧事，避免对方以为你在追究。", "rapport"],
  ["เข้าใจข้อจำกัด", "khao-jai-khaaw-jam-gat", "khao jai khaaw jam-gat", "理解限制；体谅难处", "短语", "关系维护", 47, "เราเข้าใจข้อจำกัดของคุณ แต่ยังต้องรักษากำหนดส่ง", "rao khao jai khaaw jam-gat khaawng khun dtaae yang dtawng rak-saa gam-not song", "我们理解贵方限制，但仍需要维持交期", "ไม่รับฟัง", "mai-rap-fang", "不听取", "反义", "先表达理解，再提出底线，是很常见的商务缓冲。", "empathy"],
  ["เร่งรัดอย่างสุภาพ", "reng-rat-yaang-su-phaap", "reng rat yaang su-phaap", "礼貌催促", "动词", "催促", 48, "เร่งรัดอย่างสุภาพเพื่อไม่ให้คู่ค้ารู้สึกถูกกดดันเกินไป", "reng rat yaang su-phaap phuea mai hai khuu-khaa ruu-seuk thuuk got-dan goen bpai", "礼貌催促，以免合作方觉得被过度施压", "กดดันอย่างแข็ง", "got-dan-yaang-khaeng", "强硬施压", "反义", "适合关系仍需维护但事项必须推进时。", "urgency"],
  ["ขอความคืบหน้า", "khaaw-khwaam-kheup-naa", "khaaw khwaam kheup naa", "询问进展；请提供进度", "短语", "催促", 49, "รบกวนขอความคืบหน้าเรื่องเอกสารภายในวันนี้", "rop-guan khaaw khwaam kheup naa rueang eek-ga-saan phaai-nai wan-nii", "麻烦今天内提供文件进展", "ปล่อยเงียบ", "bplaawy-ngiiap", "放着不问", "反义", "比催促更中性，可用于邮件开头。", "followup"],
  ["ติดตามเรื่อง", "dtit-dtaam-rueang", "dtit dtaam rueang", "跟进事项", "动词", "催促", 50, "เราติดตามเรื่องนี้มาอย่างต่อเนื่องเพราะกระทบกำหนดส่ง", "rao dtit dtaam rueang nii maa yaang dtaaw-neuuang phraw gra-thop gam-not song", "我们一直持续跟进此事，因为它影响交期", "ปล่อยเรื่อง", "bplaawy-rueang", "搁置事项", "反义", "ติดตาม 不一定强硬，重点是持续追进度。", "followup"],
  ["รบกวนช่วยเร่ง", "rop-guan-chuai-reng", "rop guan chuai reng", "麻烦协助加快", "短语", "催促", 51, "รบกวนช่วยเร่งการอนุมัติหากเอกสารครบแล้ว", "rop guan chuai reng gaan a-nu-mat haak eek-ga-saan khrop laaeo", "如果文件已齐，麻烦协助加快审批", "รอไปก่อน", "raaw-bpai-gaawn", "先等着", "反义", "รบกวน ช่วย让催促显得较礼貌，但仍明确要求推进。", "followup"],
  ["หากไม่เป็นการรบกวน", "haak-mai-bpen-gaan-rop-guan", "haak mai bpen gaan rop guan", "如果不麻烦的话", "短语", "关系维护", 52, "หากไม่เป็นการรบกวน ขอเอกสารฉบับแก้ไขภายในพรุ่งนี้", "haak mai bpen gaan rop guan, khaaw eek-ga-saan cha-bap gaae-khai phaai-nai phrung-nii", "如果不麻烦的话，请明天内提供修订版文件", "สั่งโดยตรง", "sang-dooi-dtrong", "直接命令", "反义", "常用于请求对方帮忙，但不要掩盖真正期限。", "softener"],
  ["ตามกำหนดเดิม", "dtaam-gam-not-doem", "dtaam gam-not doem", "按原定时间；按原计划期限", "短语", "催促", 53, "เรายังต้องการส่งมอบตามกำหนดเดิมหากไม่มีเหตุจำเป็น", "rao yang dtawng-gaan song-maawp dtaam gam-not doem haak mai mii het jam-bpen", "若无必要原因，我们仍希望按原定时间交付", "เลื่อนกำหนด", "leuuan-gam-not", "推迟期限", "反义", "用于重申原计划，语气比最后通牒温和。", "timeline"],
  ["ขยับกรอบเวลา", "kha-yap-graawp-wee-laa", "kha-yap graawp wee-laa", "调整时间框架", "动词", "反提议", 54, "อาจต้องขยับกรอบเวลาเพื่อรักษาคุณภาพงาน", "aat dtawng kha-yap graawp wee-laa phuea rak-saa khun-na-phaap ngaan", "可能需要调整时间框架以保证工作质量", "ยึดเวลาเดิม", "yeut-wee-laa-doem", "坚持原时间", "反义", "比เลื่อน更中性，强调整体时间安排调整。", "timeline"],
  ["ขยายเวลา", "kha-yaai-wee-laa", "kha-yaai wee-laa", "延长期限", "动词", "反提议", 55, "ขอขยายเวลาอีกสามวันเพื่อส่งข้อมูลให้ครบ", "khaaw kha-yaai wee-laa iik saam wan phuea song khaaw-muun hai khrop", "请求延长三天，以便完整提交资料", "ย่นระยะเวลา", "yon-ra-ya-wee-laa", "缩短时间", "反义", "适合正式申请延期，最好说明原因和新期限。", "timeline"],
  ["ย่นระยะเวลา", "yon-ra-ya-wee-laa", "yon ra-ya wee-laa", "压缩时间；缩短周期", "动词", "催促", 56, "หากเพิ่มทีมสนับสนุน เราอาจย่นระยะเวลาได้บางส่วน", "haak phoem thiim sa-nap-sa-nun, rao aat yon ra-ya wee-laa dai baang suan", "如果增加支持团队，我们或许能部分压缩时间", "ขยายเวลา", "kha-yaai-wee-laa", "延长期限", "反义", "用于讨论加速方案，不等于无条件赶工。", "timeline"],
  ["ข้อตกลงร่วม", "khaaw-dtok-long-ruam", "khaaw dtok-long ruam", "共同协议；双方共识", "名词", "谈判", 57, "บันทึกข้อตกลงร่วมเพื่อป้องกันการตีความต่างกัน", "ban-theuk khaaw dtok-long ruam phuea bpaawng-gan gaan dtii-khwaam dtaang gan", "记录共同协议，以避免解释不一致", "ความเห็นต่าง", "khwaam-hen-dtaang", "意见分歧", "反义", "比口头共识更稳，常进入会议纪要或合同。", "agreement"],
  ["บันทึกความเข้าใจ", "ban-theuk-khwaam-khao-jai", "ban-theuk khwaam khao jai", "谅解备忘录；共识记录", "名词", "谈判", 58, "ทั้งสองฝ่ายลงนามบันทึกความเข้าใจก่อนเจรจาสัญญาหลัก", "thang saawng faai long naam ban-theuk khwaam khao jai gaawn jee-ra-jaa san-yaa lak", "双方在谈主合同前签署谅解备忘录", "สัญญาผูกพัน", "san-yaa-phuuk-phan", "有约束力的合同", "易混", "บางกรณี บันทึกความเข้าใจ ไม่等于合同义务，ต้อง看具体措辞。", "agreement"],
  ["ประเด็นละเอียดอ่อน", "bpra-den-la-iiat-aawn", "bpra-den la-iiat aawn", "敏感议题；微妙问题", "名词", "关系维护", 59, "ประเด็นละเอียดอ่อนควรคุยเป็นการส่วนตัวมากกว่ากลางที่ประชุม", "bpra-den la-iiat aawn khuan khui bpen gaan suan dtua maak gwaa glaang thii bpra-chum", "敏感议题宜私下谈，而不是在会议中公开谈", "ประเด็นทั่วไป", "bpra-den-thua-bpai", "一般议题", "反义", "提醒说话场合和对象，比普通问题更需谨慎。", "sensitive"],
  ["เส้นตาย", "sen-dtaai", "sen dtaai", "最后期限；死线", "名词", "催促", 60, "หากต้องใช้คำว่าเส้นตาย ควรอธิบายเหตุผลให้ชัด", "haak dtawng chai kham waa sen dtaai, khuan a-thi-baai het-phon hai chat", "如果必须使用“最后期限”一词，应把理由说明清楚", "กรอบเวลายืดหยุ่น", "graawp-wee-laa-yeut-yun", "弹性时间框架", "反义", "เส้นตาย 语气较硬，需慎用。", "deadline"],
  ["กรอบราคา", "graawp-raa-khaa", "graawp raa-khaa", "价格范围；报价框架", "名词", "谈判", 61, "กำหนดกรอบราคาก่อนเปิดโต๊ะเจรจา", "gam-not graawp raa-khaa gaawn bpoet dto jee-ra-jaa", "开启谈判前先设定价格范围", "ราคาเดียวตายตัว", "raa-khaa-diao-dtaai-dtua", "固定单一价格", "反义", "表示价格有上下限，而不是任意浮动。", "price"],
  ["เพดานงบประมาณ", "phee-daan-ngop-bpra-maan", "phee-daan ngop bpra-maan", "预算上限", "名词", "谈判", 62, "เพดานงบประมาณของเราสูงกว่านี้ไม่ได้แล้ว", "phee-daan ngop bpra-maan khaawng rao suung gwaa nii mai dai laaeo", "我们的预算上限不能再高于这个数了", "งบประมาณเปิดกว้าง", "ngop-bpra-maan-bpoet-gwaang", "开放预算", "反义", "ใช้说明硬性限制，但最好配合理由。", "price"],
  ["เงื่อนไขชำระเงิน", "ngeuan-khai-cham-ra-ngoen", "ngeuan khai cham-ra ngoen", "付款条件", "名词", "反提议", 63, "ปรับเงื่อนไขชำระเงินแทนการลดราคาสินค้า", "bprap ngeuan khai cham-ra ngoen thaaen gaan lot raa-khaa sin-khaa", "调整付款条件来替代降价", "ราคาสินค้า", "raa-khaa-sin-khaa", "商品价格", "易混", "谈判不只谈价格，也可谈账期、分期、预付款。", "payment"],
  ["รับความเสี่ยงร่วมกัน", "rap-khwaam-siiang-ruam-gan", "rap khwaam siiang ruam gan", "共同承担风险", "短语", "反提议", 64, "หากกำหนดส่งเร่งมาก ทั้งสองฝ่ายควรรับความเสี่ยงร่วมกัน", "haak gam-not song reng maak, thang saawng faai khuan rap khwaam siiang ruam gan", "如果交期非常紧，双方应共同承担风险", "โยนความเสี่ยง", "yoon-khwaam-siiang", "转嫁风险", "反义", "用于避免风险全部落在一方。", "risk"],
  ["แบ่งภาระ", "baeng-phaa-ra", "baeng phaa-ra", "分担负担；分担责任", "动词", "反提议", 65, "เราเสนอให้แบ่งภาระค่าขนส่งคนละครึ่ง", "rao sa-noe hai baeng phaa-ra khaa khon-song khon la khreung", "我们建议双方各承担一半运输费", "ผลักภาระ", "phlak-phaa-ra", "推卸负担", "反义", "常用于成本、时间、人力压力分摊。", "risk"],
  ["ชดเชยบางส่วน", "chot-choei-baang-suan", "chot choei baang suan", "部分补偿", "动词", "给台阶", 66, "บริษัทพร้อมชดเชยบางส่วนเพื่อรักษาความสัมพันธ์", "baaw-ri-sat phraawm chot choei baang suan phuea rak-saa khwaam-sam-phan", "公司愿意部分补偿以维护关系", "ชดเชยเต็มจำนวน", "chot-choei-dtem-jam-nuan", "全额补偿", "易混", "บางส่วน 表示让步有限，需说明范围。", "compensation"],
  ["ทบทวนเงื่อนไข", "thop-thuan-ngeuan-khai", "thop thuan ngeuan khai", "复审条件；重新审视条款", "动词", "反提议", 67, "ขอทบทวนเงื่อนไขอีกครั้งก่อนเข้าสู่ขั้นตอนลงนาม", "khaaw thop thuan ngeuan khai iik khrang gaawn khao suu khan-dtaawn long naam", "进入签署阶段前，请再复审一次条件", "ยืนยันเงื่อนไขเดิม", "yeun-yan-ngeuan-khai-doem", "确认原条件", "反义", "表示尚可调整，不等于完全推翻。", "review"],
  ["ปรับข้อเสนอ", "bprap-khaaw-sa-noe", "bprap khaaw sa-noe", "调整提议；修改方案", "动词", "反提议", 68, "เราพร้อมปรับข้อเสนอหากได้รับข้อมูลต้นทุนเพิ่มเติม", "rao phraawm bprap khaaw sa-noe haak dai rap khaaw-muun dton-thun phoem-dtoem", "如果收到更多成本信息，我们愿意调整提议", "ยึดข้อเสนอเดิม", "yeut-khaaw-sa-noe-doem", "坚持原提议", "反义", "比ถอย更中性，强调基于信息修订。", "counter"],
  ["เสนอทางเลือก", "sa-noe-thaang-leuuak", "sa-noe thaang leuuak", "提出选择方案", "动词", "反提议", 69, "แทนที่จะปฏิเสธทันที เราควรเสนอทางเลือกที่ทำได้จริง", "thaaen thii ja bpa-dti-seet than-thii, rao khuan sa-noe thaang leuuak thii tham dai jing", "与其立刻拒绝，我们应提出实际可行的替代方案", "ปิดทางเลือก", "bpit-thaang-leuuak", "关闭选项", "反义", "高级谈判中，拒绝最好同时附上可行的替代选择。", "counter"],
  ["ขอแย้งเล็กน้อย", "khaaw-yaaeng-lek-naawy", "khaaw yaaeng lek naawy", "容我稍微不同意；提出一点异议", "短语", "保留意见", 70, "ขอแย้งเล็กน้อยเรื่องการคำนวณต้นทุน", "khaaw yaaeng lek naawy rueang gaan kham-nuan dton-thun", "关于成本计算，容我稍微提出一点异议", "เห็นด้วยทั้งหมด", "hen-duai-thang-mot", "完全同意", "反义", "เล็กน้อย 可软化不同意见，但内容仍需清楚。", "disagree"],
  ["มองต่าง", "maawng-dtaang", "maawng dtaang", "看法不同；从不同角度看", "动词", "保留意见", 71, "เราอาจมองต่างในเรื่องความเสี่ยง แต่เป้าหมายยังเหมือนกัน", "rao aat maawng dtaang nai rueang khwaam siiang dtaae bpao-maai yang meuuan gan", "我们可能在风险上看法不同，但目标仍一致", "มองตรงกัน", "maawng-dtrong-gan", "看法一致", "反义", "比ไม่เห็นด้วย更柔和，强调角度差异。", "disagree"],
  ["เห็นต่างอย่างสร้างสรรค์", "hen-dtaang-yaang-saang-san", "hen dtaang yaang saang san", "建设性不同意", "短语", "保留意见", 72, "การเห็นต่างอย่างสร้างสรรค์ช่วยให้ข้อเสนอรอบสุดท้ายดีขึ้น", "gaan hen dtaang yaang saang san chuai hai khaaw sa-noe raawp sut-thaai dii kheun", "建设性不同意能让最终方案更好", "ขัดแย้งทำลายบรรยากาศ", "khat-yaaeng-tham-laai-ban-yaa-gaat", "破坏气氛的冲突", "反义", "强调不同意见服务于改进，而不是攻击对方。", "disagree"],
  ["ยังมีข้อสงสัย", "yang-mii-khaaw-song-sai", "yang mii khaaw song sai", "仍有疑问", "短语", "保留意见", 73, "เรายังมีข้อสงสัยเกี่ยวกับขอบเขตความรับผิดชอบ", "rao yang mii khaaw song sai giao gap khaawp-kheet khwaam rap-phit-chaawp", "我们对责任范围仍有疑问", "เข้าใจชัดเจนแล้ว", "khao-jai-chat-jen-laaeo", "已经理解清楚", "反义", "适合暂不承诺前提出澄清请求。", "clarify"],
  ["ข้อมูลไม่ครบ", "khaaw-muun-mai-khrop", "khaaw-muun mai khrop", "资料不完整；信息不足", "短语", "保留意见", 74, "ตอนนี้ข้อมูลไม่ครบ จึงยังประเมินข้อเสนอไม่ได้", "dtaawn nii khaaw-muun mai khrop, jeung yang bpra-moen khaaw sa-noe mai dai", "目前资料不完整，因此还无法评估提议", "ข้อมูลครบถ้วน", "khaaw-muun-khrop-thuan", "资料齐全", "反义", "不是拒绝，而是说明决策前提不足。", "clarify"],
  ["ประเมินผลกระทบ", "bpra-moen-phon-gra-thop", "bpra-moen phon gra-thop", "评估影响", "动词", "保留意见", 75, "เราต้องประเมินผลกระทบต่อทีมบริการก่อนรับเงื่อนไขใหม่", "rao dtawng bpra-moen phon gra-thop dtaaw thiim baaw-ri-gaan gaawn rap ngeuan khai mai", "接受新条件前，我们必须评估对服务团队的影响", "ตัดสินใจทันที", "dtat-sin-jai-than-thii", "立即决定", "反义", "用于说明为何不能马上答应。", "impact"],
  ["ลดแรงปะทะ", "lot-raaeng-bpa-tha", "lot raaeng bpa-tha", "降低冲突强度；减少正面碰撞", "动词", "关系维护", 76, "ใช้ถ้อยคำกลาง ๆ เพื่อลดแรงปะทะในที่ประชุม", "chai thaawy-kham glaang glaang phuea lot raaeng bpa-tha nai thii bpra-chum", "使用中性措辞来降低会议中的冲突强度", "เพิ่มแรงปะทะ", "phoem-raaeng-bpa-tha", "增加冲突", "反义", "适合敏感议题，不等于回避问题。", "rapport"],
  ["สื่อสารเชิงบวก", "seuu-saan-choeng-buak", "seuu saan choeng buak", "正向沟通", "动词", "关系维护", 77, "สื่อสารเชิงบวกแม้ต้องแจ้งข่าวที่อีกฝ่ายไม่อยากได้ยิน", "seuu saan choeng buak maae dtawng jaaeng khaao thii iik faai mai yaak dai-yin", "即使要告知对方不想听的消息，也保持正向沟通", "สื่อสารเชิงลบ", "seuu-saan-choeng-lop", "负向沟通", "反义", "重点是保留合作语气，不是只说好话。", "rapport"],
  ["ความสัมพันธ์ระยะยาว", "khwaam-sam-phan-ra-ya-yaao", "khwaam sam-phan ra-ya yaao", "长期关系", "名词", "关系维护", 78, "อย่าแลกความสัมพันธ์ระยะยาวกับชัยชนะระยะสั้น", "yaa laaek khwaam sam-phan ra-ya yaao gap chai-cha-na ra-ya san", "不要用长期关系换短期胜利", "ผลได้ระยะสั้น", "phon-dai-ra-ya-san", "短期收益", "反义", "商务谈判中常用来提醒不要只看眼前。", "relationship"],
  ["ไม่ให้เสียหน้า", "mai-hai-siia-naa", "mai hai siia naa", "不让对方丢脸", "短语", "给台阶", 79, "ควรแจ้งเป็นการส่วนตัวเพื่อไม่ให้เสียหน้า", "khuan jaaeng bpen gaan suan dtua phuea mai hai siia naa", "应私下告知，以免对方丢脸", "ทำให้อับอาย", "tham-hai-ap-aai", "使尴尬难堪", "反义", "比รักษาหน้า更明确地说明避免失面子。", "face"],
  ["รักษาน้ำใจ", "rak-saa-nam-jai", "rak-saa nam jai", "顾及情分；维护好意", "动词", "关系维护", 80, "ปฏิเสธได้แต่ควรรักษาน้ำใจของผู้แนะนำงาน", "bpa-dti-seet dai dtaae khuan rak-saa nam jai khaawng phuu nae-nam ngaan", "可以拒绝，但应顾及介绍人的情分", "ตัดเยื่อใย", "dtat-yeuua-yai", "断绝情面", "反义", "น้ำใจ 含有人情和善意，比礼貌更带关系色彩。", "relationship"],
  ["หลีกเลี่ยงการเผชิญหน้า", "liik-liiang-gaan-pha-choen-naa", "liik-liiang gaan pha-choen naa", "避免正面冲突", "动词", "关系维护", 81, "หลีกเลี่ยงการเผชิญหน้าโดยย้ายประเด็นไปคุยวงเล็ก", "liik-liiang gaan pha-choen naa dooi yaai bpra-den bpai khui wong lek", "通过把议题转到小范围讨论来避免正面冲突", "เผชิญหน้าโดยตรง", "pha-choen-naa-dooi-dtrong", "直接对峙", "反义", "不是逃避，而是选择更合适的沟通场域。", "rapport"],
  ["เปิดช่องเจรจา", "bpoet-chaawng-jee-ra-jaa", "bpoet chaawng jee-ra-jaa", "保留谈判渠道；留谈判口", "动词", "关系维护", 82, "แม้ยังตกลงไม่ได้ เราควรเปิดช่องเจรจาไว้", "maae yang dtok-long mai dai, rao khuan bpoet chaawng jee-ra-jaa wai", "即使尚未达成一致，我们也应保留谈判渠道", "ปิดช่องเจรจา", "bpit-chaawng-jee-ra-jaa", "关闭谈判渠道", "反义", "适合在拒绝或暂停合作时维护未来可能。", "rapport"],
  ["ปิดดีล", "bpit-diil", "bpit diil", "成交；达成交易", "动词", "谈判", 83, "อย่ารีบปิดดีลจนมองข้ามเงื่อนไขสำคัญ", "yaa riip bpit diil jon maawng khaam ngeuan khai sam-khan", "不要急着成交而忽略重要条件", "เปิดการเจรจา", "bpoet-gaan-jee-ra-jaa", "开启谈判", "反义", "外来词口语化，正式文件可用บรรลุข้อตกลง。", "deal"],
  ["เงื่อนไขสุดท้าย", "ngeuan-khai-sut-thaai", "ngeuan khai sut-thaai", "最终条件", "名词", "谈判", 84, "ก่อนรับเงื่อนไขสุดท้าย ควรตรวจผลกระทบทางกฎหมาย", "gaawn rap ngeuan khai sut-thaai khuan dtruat phon gra-thop thaang got-maai", "接受最终条件前，应检查法律影响", "เงื่อนไขเบื้องต้น", "ngeuan-khai-beuang-dton", "初步条件", "反义", "สุดท้าย 表示谈判空间很小，慎用。", "final"],
  ["ข้อเสนอสุดท้าย", "khaaw-sa-noe-sut-thaai", "khaaw sa-noe sut-thaai", "最终报价；最后提议", "名词", "谈判", 85, "เขาย้ำว่านี่เป็นข้อเสนอสุดท้ายและไม่สามารถลดได้อีก", "khao yam waa nii bpen khaaw sa-noe sut-thaai lae mai saa-maat lot dai iik", "他强调这是最终报价，不能再降", "ข้อเสนอเบื้องต้น", "khaaw-sa-noe-beuang-dton", "初步提议", "反义", "语气强，可能关闭谈判空间。", "final"],
  ["รับไว้พิจารณา", "rap-wai-phi-jaa-ra-naa", "rap wai phi-jaa-ra-naa", "收下并考虑；暂时接收评估", "短语", "保留意见", 86, "เราจะรับไว้พิจารณาและแจ้งคำตอบภายในสัปดาห์นี้", "rao ja rap wai phi-jaa-ra-naa lae jaaeng kham-dtaawp phaai-nai sap-daa nii", "我们会收下并考虑，并在本周内答复", "ปฏิเสธทันที", "bpa-dti-seet-than-thii", "立即拒绝", "反义", "既不承诺也不拒绝，适合需要内部评估时。", "reserve"],
  ["ไม่สามารถรับเงื่อนไขนี้ได้", "mai-saa-maat-rap-ngeuan-khai-nii-dai", "mai saa-maat rap ngeuan khai nii dai", "无法接受此条件", "短语", "委婉拒绝", 87, "ด้วยเหตุผลด้านความเสี่ยง เราไม่สามารถรับเงื่อนไขนี้ได้", "duai het-phon daan khwaam siiang, rao mai saa-maat rap ngeuan khai nii dai", "基于风险原因，我们无法接受此条件", "ยอมรับเงื่อนไขนี้", "yaawm-rap-ngeuan-khai-nii", "接受此条件", "反义", "直接但仍专业，最好说明原因并给替代方案。", "refusal"],
  ["ขอปรับถ้อยคำ", "khaaw-bprap-thaawy-kham", "khaaw bprap thaawy kham", "请求调整措辞", "短语", "关系维护", 88, "ขอปรับถ้อยคำในสัญญาให้ลดความเข้าใจผิด", "khaaw bprap thaawy-kham nai san-yaa hai lot khwaam khao-jai phit", "请求调整合同措辞以减少误解", "คงถ้อยคำเดิม", "khong-thaawy-kham-doem", "保留原措辞", "反义", "用于不改实质条件、只改表达方式。", "wording"],
  ["พูดให้นุ่มลง", "phuut-hai-num-long", "phuut hai num long", "把话说得更柔和", "短语", "关系维护", 89, "ประโยคนี้ควรพูดให้นุ่มลงเพื่อไม่ให้ดูเหมือนตำหนิ", "bpra-yook nii khuan phuut hai num long phuea mai hai duu meuuan dtam-ni", "这句话应说得更柔和，以免看起来像责备", "พูดให้แข็งขึ้น", "phuut-hai-khaeng-kheun", "说得更强硬", "反义", "调整语气，不一定改变立场。", "wording"],
  ["เว้นช่องว่างให้เจรจา", "wen-chaawng-waang-hai-jee-ra-jaa", "wen chaawng waang hai jee-ra-jaa", "留出谈判余地", "短语", "关系维护", 90, "ข้อความตอบกลับควรเว้นช่องว่างให้เจรจา ไม่ใช่ปิดประตูทันที", "khaaw-khwaam dtaawp glap khuan wen chaawng waang hai jee-ra-jaa, mai chai bpit bpra-dtuu than-thii", "回复文字应留出谈判余地，而不是立刻关门", "ปิดประตูเจรจา", "bpit-bpra-dtuu-jee-ra-jaa", "关闭谈判大门", "反义", "适合拒绝当前条件但保留合作可能。", "rapport"],
] as const satisfies readonly Row[];

const relatedFor = (row: Row): VocabularyExpansionRelatedWord => ({ thai: row[10], roman: row[11], chinese: row[12] });
const comparisonFor = (row: Row): VocabularyExpansionComparison => ({
  kind: row[13],
  target: relatedFor(row),
  distinctionZh: `${row[0]} 和 ${row[10]} 在谈判、拒绝或关系维护中容易形成对照；学习时要看语气强弱、是否保留余地，以及会不会让对方失面子。`,
});
const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในการเจรจาที่มีความละเอียดอ่อน ทีมงานเลือกใช้สำนวนว่า “${row[7]}” เพื่อให้คู่สนทนารู้สึกว่าเรายังเปิดพื้นที่ให้คุยต่อ แม้ข้อเสนอบางส่วนยังรับไม่ได้`,
  roman: `nai gaan jee-ra-jaa thii mii khwaam la-iiat aawn, thiim-ngaan leuuak chai sam-nuan waa "${row[8]}" phuea hai khuu son-tha-naa ruu-seuk waa rao yang bpoet pheun-thii hai khui dtaaw, maae khaaw sa-noe baang suan yang rap mai dai`,
  chinese: `在微妙的谈判中，团队选择使用“${row[9]}”这种表达，让对话方感觉我们仍留有继续沟通的空间，即使部分提议还不能接受。`,
});
const synonymsFor = (row: Row): VocabularyExpansionRelatedWord[] => row[13] === "近义" ? [relatedFor(row)] : [];
const antonymsFor = (row: Row): VocabularyExpansionRelatedWord[] => row[13] === "反义" ? [relatedFor(row)] : [];

const toCandidate = (row: Row): VocabularyExpansionCandidate => {
  const synonyms = synonymsFor(row);
  const antonyms = antonymsFor(row);
  const comparisons = [comparisonFor(row)];
  const collocations = [{ thai: row[7], roman: row[8], chinese: row[9] }];
  const tags = ["c1", "negotiation-politeness", row[15], row[5]];
  return {
    thai: row[0],
    id: row[1],
    roman: row[2],
    chinese: row[3],
    partOfSpeech: row[4],
    theme: row[5],
    level: "c1",
    priority: row[6],
    senses: [{ id: "main", chinese: row[3], examples: [exampleFor(row)], synonyms, antonyms, comparisons, collocations, usageNotesZh: [row[14]], tags }],
    synonyms,
    antonyms,
    comparisons,
    collocations,
    usageNotesZh: [row[14]],
    tags,
    sourceRefs: NEGOTIATION_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_C1_NEGOTIATION_POLITENESS_01 = rows.map(toCandidate);
