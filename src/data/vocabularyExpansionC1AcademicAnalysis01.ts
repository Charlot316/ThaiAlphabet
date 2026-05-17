export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "抽象论述" | "原因结果" | "趋势变化" | "证据论证" | "评估判断" | "假设限制" | "学术写作";
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

const ACADEMIC_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thai-academic-analysis-candidate"];

const rows = [
  ["กรอบแนวคิด", "graawp-naaeo-khit", "graawp naaeo khit", "概念框架；理论框架", "名词", "抽象论述", 1, "วางกรอบแนวคิดให้ชัด", "waang graawp naaeo khit hai chat", "明确建立概念框架", "สมมติฐาน", "som-mut-thaan", "假设", "易混", "กรอบแนวคิด 用来组织分析；สมมติฐาน 是待验证的判断。", "framework"],
  ["ประเด็นหลัก", "bpra-den-lak", "bpra-den lak", "核心议题；主问题", "名词", "抽象论述", 2, "ระบุประเด็นหลักของบทความ", "ra-bu bpra-den lak khaawng bot-khwaam", "指出文章核心议题", "ประเด็นรอง", "bpra-den-raawng", "次要议题", "反义", "用于区分论述主轴和补充细节。", "argument"],
  ["ประเด็นรอง", "bpra-den-raawng", "bpra-den raawng", "次要议题；附属问题", "名词", "抽象论述", 3, "แยกประเด็นรองออกจากข้อถกเถียงหลัก", "yaaek bpra-den raawng aawk jaak khaaw thok-thiiang lak", "把次要议题从主要争论中分开", "ประเด็นหลัก", "bpra-den-lak", "核心议题", "反义", "可防止文章跑题或论证失焦。", "argument"],
  ["ข้อถกเถียง", "khaaw-thok-thiiang", "khaaw thok thiiang", "争论点；可辩论命题", "名词", "抽象论述", 4, "กำหนดข้อถกเถียงก่อนนำเสนอหลักฐาน", "gam-not khaaw thok-thiiang gaawn nam-sa-noe lak-thaan", "提出证据前先界定争论点", "ข้อเท็จจริงพื้นฐาน", "khaaw-thet-jing-pheun-thaan", "基础事实", "易混", "ข้อถกเถียง 可被不同解释挑战；事实则较少争议。", "argument"],
  ["ข้อสันนิษฐาน", "khaaw-san-nit-thaan", "khaaw san-nit-thaan", "推定；初步推测", "名词", "假设限制", 5, "ตั้งข้อสันนิษฐานจากข้อมูลเบื้องต้น", "dtang khaaw san-nit-thaan jaak khaaw-muun beuang-dton", "根据初步资料提出推定", "ข้อพิสูจน์", "khaaw-phi-suut", "证明", "反义", "ข้อสันนิษฐาน 尚未充分证明，不能当结论。", "hypothesis"],
  ["สมมติฐาน", "som-mut-thaan", "som-mut-thaan", "假设；研究假设", "名词", "假设限制", 6, "ทดสอบสมมติฐานด้วยข้อมูลหลายแหล่ง", "thot-saawp som-mut-thaan duai khaaw-muun laai laaeng", "用多来源数据检验假设", "ข้อสรุป", "khaaw-sa-ruup", "结论", "易混", "สมมติฐาน 是研究前提出的可检验判断；ข้อสรุป 是分析后得到。", "hypothesis"],
  ["ตัวแปร", "dtua-bpraae", "dtua bpraae", "变量", "名词", "假设限制", 7, "ควบคุมตัวแปรที่อาจรบกวนผลการศึกษา", "khuap-khum dtua bpraae thii aat rop-guan phon gaan seuk-saa", "控制可能干扰研究结果的变量", "ค่าคงที่", "khaa-khong-thii", "常量", "反义", "ตัวแปร 会变化；ค่าคงที่ 理论上保持不变。", "method"],
  ["ปัจจัย", "bpat-jai", "bpat jai", "因素；影响条件", "名词", "原因结果", 8, "วิเคราะห์ปัจจัยที่ทำให้ต้นทุนสูงขึ้น", "wi-khro bpat-jai thii tham-hai dton-thun suung kheun", "分析导致成本上升的因素", "ผลลัพธ์", "phon-lap", "结果", "易混", "ปัจจัย 偏原因或条件；ผลลัพธ์ 是产生的结果。", "cause"],
  ["กลไก", "gon-gai", "gon gai", "机制；作用过程", "名词", "原因结果", 9, "อธิบายกลไกที่เชื่อมโยงนโยบายกับพฤติกรรมผู้บริโภค", "a-thi-baai gon gai thii cheuam-yoong na-yoo-baai gap phreu-dti-gam phuu baaw-ri-phook", "解释政策与消费者行为之间的连接机制", "ผลกระทบ", "phon-gra-thop", "影响", "易混", "กลไก 说明如何发生；ผลกระทบ 说明发生后造成什么。", "mechanism"],
  ["ความสัมพันธ์เชิงเหตุผล", "khwaam-sam-phan-choeng-het-phon", "khwaam sam-phan choeng het phon", "因果关系", "名词", "原因结果", 10, "พิสูจน์ความสัมพันธ์เชิงเหตุผล ไม่ใช่แค่ความสัมพันธ์ร่วม", "phi-suut khwaam sam-phan choeng het phon, mai chai khaae khwaam sam-phan ruam", "证明因果关系，而不只是相关关系", "ความสัมพันธ์ร่วม", "khwaam-sam-phan-ruam", "相关关系", "易混", "相关不必然代表因果，这是分析写作常见区分。", "causality"],
  ["ความสัมพันธ์ร่วม", "khwaam-sam-phan-ruam", "khwaam sam-phan ruam", "相关关系；共变关系", "名词", "证据论证", 11, "ข้อมูลแสดงความสัมพันธ์ร่วมแต่ยังไม่พอพิสูจน์สาเหตุ", "khaaw-muun sa-daaeng khwaam sam-phan ruam dtaae yang mai phaaw phi-suut saa-het", "数据显示相关关系，但仍不足以证明原因", "ความสัมพันธ์เชิงเหตุผล", "khwaam-sam-phan-choeng-het-phon", "因果关系", "易混", "研究写作中要避免把相关写成因果。", "evidence"],
  ["ผลกระทบ", "phon-gra-thop", "phon gra-thop", "影响；后果", "名词", "原因结果", 12, "ประเมินผลกระทบระยะยาวของมาตรการนี้", "bpra-moen phon gra-thop ra-ya yaao khaawng maat-dtra-gaan nii", "评估此措施的长期影响", "สาเหตุ", "saa-het", "原因", "反义", "สาเหตุ อยู่ก่อน；ผลกระทบ เกิดตามมา。", "impact"],
  ["ผลสืบเนื่อง", "phon-seup-neuuang", "phon seup neuuang", "后续结果；连带后果", "名词", "原因结果", 13, "ชี้ผลสืบเนื่องที่อาจเกิดหลังการเปลี่ยนนโยบาย", "chii phon seup neuuang thii aat goet lang gaan bpliian na-yoo-baai", "指出政策改变后可能出现的连带后果", "ผลทันที", "phon-than-thii", "即时结果", "反义", "ผลสืบเนื่อง 强调后续链条，不一定立即出现。", "impact"],
  ["แรงขับเคลื่อน", "raaeng-khap-khleuuan", "raaeng khap khleuuan", "驱动力；推动因素", "名词", "原因结果", 14, "ระบุแรงขับเคลื่อนของการเติบโตในตลาดภูมิภาค", "ra-bu raaeng khap khleuuan khaawng gaan dteup-dtoo nai dta-laat phuu-mi-phaak", "指出区域市场增长的驱动力", "อุปสรรค", "up-bpa-sak", "障碍", "反义", "แรงขับเคลื่อน 推动变化；อุปสรรค 阻碍变化。", "cause"],
  ["แนวโน้ม", "naaeo-noom", "naaeo noom", "趋势；倾向", "名词", "趋势变化", 15, "สังเกตแนวโน้มจากข้อมูลต่อเนื่องหลายปี", "sang-geet naaeo noom jaak khaaw-muun dtaaw-neuuang laai bpii", "从多年连续数据中观察趋势", "เหตุการณ์เฉพาะหน้า", "het-gaan-cha-phaw-naa", "短期个别事件", "反义", "แนวโน้ม ต้อง看持续变化，不能只看单点数据。", "trend"],
  ["ทิศทาง", "thit-thaang", "thit thaang", "方向；发展方向", "名词", "趋势变化", 16, "อธิบายทิศทางของนโยบายหลังเกิดวิกฤต", "a-thi-baai thit-thaang khaawng na-yoo-baai lang goet wi-grit", "说明危机后政策的发展方向", "ตำแหน่งปัจจุบัน", "dtam-naeng-bpat-ju-ban", "当前位置", "易混", "ทิศทาง 强调往哪里走，不等于当前状态。", "trend"],
  ["รูปแบบ", "ruup-baaep", "ruup baaep", "模式；形态", "名词", "趋势变化", 17, "พบรูปแบบการใช้บริการที่เปลี่ยนไปหลังโรคระบาด", "phop ruup baaep gaan chai baaw-ri-gaan thii bpliian bpai lang rook ra-baat", "发现疫情后服务使用模式发生改变", "ข้อยกเว้น", "khaaw-yok-wen", "例外", "反义", "รูปแบบ 是重复出现的结构；ข้อยกเว้น 是偏离模式的情况。", "pattern"],
  ["ความผันผวน", "khwaam-phan-phuan", "khwaam phan phuan", "波动性；不稳定变化", "名词", "趋势变化", 18, "ความผันผวนของราคาอาจทำให้การคาดการณ์คลาดเคลื่อน", "khwaam phan phuan khaawng raa-khaa aat tham-hai gaan khaat-gaan khlaat-khleuuan", "价格波动可能使预测出现偏差", "เสถียรภาพ", "sa-thian-ra-phaap", "稳定性", "反义", "ใช้กับราคา ตลาด ความต้องการ หรือข้อมูลที่上下变化。", "trend"],
  ["เสถียรภาพ", "sa-thian-ra-phaap", "sa-thian ra phaap", "稳定性；稳定状态", "名词", "趋势变化", 19, "มาตรการนี้ช่วยเพิ่มเสถียรภาพของระบบการเงิน", "maat-dtra-gaan nii chuai phoem sa-thian-ra-phaap khaawng ra-bop gaan-ngoen", "此措施有助于提高金融系统稳定性", "ความผันผวน", "khwaam-phan-phuan", "波动性", "反义", "正式论述中常用于制度、市场、系统。", "trend"],
  ["เพิ่มขึ้นอย่างต่อเนื่อง", "phoem-kheun-yaang-dtaaw-neuuang", "phoem kheun yaang dtaaw neuuang", "持续增加", "短语", "趋势变化", 20, "จำนวนผู้ใช้เพิ่มขึ้นอย่างต่อเนื่องตลอดสามไตรมาส", "jam-nuan phuu chai phoem kheun yaang dtaaw-neuuang dta-laawt saam dtrai-maat", "用户数量在三个季度中持续增加", "ลดลงอย่างต่อเนื่อง", "lot-long-yaang-dtaaw-neuuang", "持续下降", "反义", "ต่อเนื่อง 表示不是一次性增加，而是连续变化。", "trend"],
  ["ลดลงอย่างมีนัยสำคัญ", "lot-long-yaang-mii-nai-sam-khan", "lot long yaang mii nai sam-khan", "显著下降", "短语", "趋势变化", 21, "ค่าใช้จ่ายลดลงอย่างมีนัยสำคัญหลังปรับกระบวนการ", "khaa-chai-jaai lot long yaang mii nai sam-khan lang bprap gra-buuan-gaan", "流程调整后费用显著下降", "เพิ่มขึ้นอย่างมีนัยสำคัญ", "phoem-kheun-yaang-mii-nai-sam-khan", "显著增加", "反义", "มีนัยสำคัญ 在严谨语境中常暗示统计或实质重要性。", "trend"],
  ["ค่อยเป็นค่อยไป", "khaawy-bpen-khaawy-bpai", "khaawy bpen khaawy bpai", "逐步地；渐进地", "形容词", "趋势变化", 22, "การเปลี่ยนแปลงเกิดขึ้นแบบค่อยเป็นค่อยไป ไม่ใช่ฉับพลัน", "gaan bpliian-bplaaeng goet kheun baaep khaawy bpen khaawy bpai, mai chai chap-phlan", "变化是逐步发生的，不是突然发生的", "ฉับพลัน", "chap-phlan", "突然的", "反义", "用于描述渐进趋势，避免夸大变化速度。", "trend"],
  ["ฉับพลัน", "chap-phlan", "chap phlan", "突然的；急剧的", "形容词", "趋势变化", 23, "การลดลงฉับพลันของยอดขายต้องอธิบายด้วยปัจจัยเฉพาะ", "gaan lot long chap-phlan khaawng yaawt khaai dtawng a-thi-baai duai bpat-jai cha-phaw", "销售额突然下降必须用特定因素解释", "ค่อยเป็นค่อยไป", "khaawy-bpen-khaawy-bpai", "逐步的", "反义", "强调变化速度快，常需额外解释原因。", "trend"],
  ["หลักฐานเชิงประจักษ์", "lak-thaan-choeng-bpra-jak", "lak thaan choeng bpra jak", "经验证据；实证证据", "名词", "证据论证", 24, "สนับสนุนข้อสรุปด้วยหลักฐานเชิงประจักษ์", "sa-nap-sa-nun khaaw sa-ruup duai lak-thaan choeng bpra-jak", "用实证证据支持结论", "ความเห็นส่วนตัว", "khwaam-hen-suan-dtua", "个人意见", "反义", "强调基于观察、数据或事实，不是主观感受。", "evidence"],
  ["ข้อมูลเชิงปริมาณ", "khaaw-muun-choeng-bpa-ri-maan", "khaaw muun choeng bpa-ri-maan", "定量数据", "名词", "证据论证", 25, "ใช้ข้อมูลเชิงปริมาณเพื่อเปรียบเทียบผลก่อนและหลัง", "chai khaaw-muun choeng bpa-ri-maan phuea bpriiap-thiiap phon gaawn lae lang", "使用定量数据比较前后结果", "ข้อมูลเชิงคุณภาพ", "khaaw-muun-choeng-khun-na-phaap", "定性数据", "反义", "เชิงปริมาณ 可计数测量；เชิงคุณภาพ 偏描述意义和经验。", "data"],
  ["ข้อมูลเชิงคุณภาพ", "khaaw-muun-choeng-khun-na-phaap", "khaaw muun choeng khun-na-phaap", "定性数据", "名词", "证据论证", 26, "ข้อมูลเชิงคุณภาพช่วยอธิบายเหตุผลที่ตัวเลขไม่สามารถบอกได้", "khaaw-muun choeng khun-na-phaap chuai a-thi-baai het-phon thii dtua-leek mai saa-maat baawk dai", "定性数据有助于解释数字无法说明的原因", "ข้อมูลเชิงปริมาณ", "khaaw-muun-choeng-bpa-ri-maan", "定量数据", "反义", "适合访谈、观察、文本分析等资料。", "data"],
  ["กลุ่มตัวอย่าง", "glum-dtua-yaang", "glum dtua yaang", "样本群体", "名词", "证据论证", 27, "กลุ่มตัวอย่างควรสะท้อนลักษณะของประชากรเป้าหมาย", "glum dtua-yaang khuan sa-thaawn lak-sa-na khaawng bpra-chaa-gaawn bpao-maai", "样本群体应反映目标总体特征", "ประชากรทั้งหมด", "bpra-chaa-gaawn-thang-mot", "总体全部", "易混", "กลุ่มตัวอย่าง 是被研究的一部分，不等于全部ประชากร。", "method"],
  ["แหล่งข้อมูล", "laaeng-khaaw-muun", "laaeng khaaw muun", "资料来源；数据来源", "名词", "证据论证", 28, "ควรระบุแหล่งข้อมูลให้ผู้อ่านตรวจสอบได้", "khuan ra-bu laaeng khaaw-muun hai phuu-aan dtruat-saawp dai", "应注明资料来源，让读者可以核查", "ข้อสรุป", "khaaw-sa-ruup", "结论", "易混", "แหล่งข้อมูล 是证据来源；ข้อสรุป 是由证据推导出的判断。", "source"],
  ["ความน่าเชื่อถือ", "khwaam-naa-cheuua-theu", "khwaam naa cheuua theu", "可信度；可靠性", "名词", "评估判断", 29, "ประเมินความน่าเชื่อถือของแหล่งข้อมูลก่อนนำมาอ้าง", "bpra-moen khwaam naa cheuua theu khaawng laaeng khaaw-muun gaawn nam maa aang", "引用前评估资料来源的可信度", "ความคลาดเคลื่อน", "khwaam-khlaat-khleuuan", "误差；偏差", "易混", "可信度高不代表完全没有误差。", "evaluation"],
  ["ความถูกต้อง", "khwaam-thuuk-dtawng", "khwaam thuuk dtawng", "正确性；准确性", "名词", "评估判断", 30, "ตรวจความถูกต้องของตัวเลขก่อนเผยแพร่รายงาน", "dtruat khwaam thuuk dtawng khaawng dtua-leek gaawn pheeuy-phaae raai-ngaan", "发布报告前检查数字准确性", "ความครบถ้วน", "khwaam-khrop-thuan", "完整性", "易混", "正确但不完整仍可能导致误判。", "evaluation"],
  ["ความครบถ้วน", "khwaam-khrop-thuan", "khwaam khrop thuan", "完整性；充分覆盖程度", "名词", "评估判断", 31, "ความครบถ้วนของข้อมูลมีผลต่อคุณภาพการวิเคราะห์", "khwaam khrop thuan khaawng khaaw-muun mii phon dtaaw khun-na-phaap gaan wi-khro", "数据完整性会影响分析质量", "ความถูกต้อง", "khwaam-thuuk-dtawng", "正确性", "易混", "完整性看是否遗漏，正确性看是否无误。", "evaluation"],
  ["ความสอดคล้อง", "khwaam-saawt-khlaawng", "khwaam saawt khlaawng", "一致性；相符程度", "名词", "评估判断", 32, "พิจารณาความสอดคล้องระหว่างผลวิจัยกับทฤษฎีเดิม", "phi-jaa-ra-naa khwaam saawt khlaawng ra-waang phon wi-jai gap thrit-sa-dii doem", "考察研究结果与既有理论之间的一致性", "ความขัดแย้ง", "khwaam-khat-yaaeng", "矛盾；冲突", "反义", "สอดคล้อง 表示相互支持或不冲突。", "evaluation"],
  ["ความขัดแย้ง", "khwaam-khat-yaaeng", "khwaam khat yaaeng", "矛盾；冲突", "名词", "评估判断", 33, "บทความนี้ชี้ความขัดแย้งระหว่างนโยบายกับผลที่เกิดขึ้นจริง", "bot-khwaam nii chii khwaam khat-yaaeng ra-waang na-yoo-baai gap phon thii goet kheun jing", "本文指出政策与实际结果之间的矛盾", "ความสอดคล้อง", "khwaam-saawt-khlaawng", "一致性", "反义", "用于分析理论、数据或政策之间不一致之处。", "evaluation"],
  ["ความคลาดเคลื่อน", "khwaam-khlaat-khleuuan", "khwaam khlaat khleuuan", "偏差；误差", "名词", "评估判断", 34, "อธิบายความคลาดเคลื่อนที่อาจเกิดจากวิธีเก็บข้อมูล", "a-thi-baai khwaam khlaat khleuuan thii aat goet jaak wi-thii gep khaaw-muun", "说明可能由数据收集方法造成的偏差", "ความแม่นยำ", "khwaam-maaen-yam", "精确性", "反义", "正式写作中比ผิด更客观。", "evaluation"],
  ["อคติ", "a-kha-dti", "a-kha-dti", "偏见；偏差倾向", "名词", "评估判断", 35, "ผู้วิจัยต้องระวังอคติในการเลือกกลุ่มตัวอย่าง", "phuu wi-jai dtawng ra-wang a-kha-dti nai gaan leuuak glum dtua-yaang", "研究者必须注意选择样本时的偏见", "ความเป็นกลาง", "khwaam-bpen-glaang", "中立性", "反义", "อคติ 可来自研究者、样本或测量工具。", "bias"],
  ["ความเป็นกลาง", "khwaam-bpen-glaang", "khwaam bpen glaang", "中立性；客观中立", "名词", "评估判断", 36, "ภาษาทางวิชาการควรรักษาความเป็นกลางเท่าที่ทำได้", "phaa-saa thaang wi-chaa-gaan khuan rak-saa khwaam bpen glaang thao thii tham dai", "学术语言应尽可能保持中立性", "อคติ", "a-kha-dti", "偏见", "反义", "不是没有立场，而是论证不被个人情绪主导。", "style"],
  ["นัยสำคัญ", "nai-sam-khan", "nai sam khan", "重要意义；显著性", "名词", "评估判断", 37, "ผลต่างเล็กน้อยอาจไม่มีนัยสำคัญในทางสถิติ", "phon dtaang lek naawy aat mai mii nai sam khan nai thaang sa-thi-dti", "微小差异在统计上可能没有显著性", "ความบังเอิญ", "khwaam-bang-oen", "偶然性", "易混", "นัยสำคัญ 可指统计显著，也可指实质意义，需看语境。", "evaluation"],
  ["ข้อจำกัดของการศึกษา", "khaaw-jam-gat-khaawng-gaan-seuk-saa", "khaaw jam-gat khaawng gaan seuk-saa", "研究限制", "名词", "假设限制", 38, "ระบุข้อจำกัดของการศึกษาเพื่อให้ผู้อ่านตีความผลอย่างระมัดระวัง", "ra-bu khaaw jam-gat khaawng gaan seuk-saa phuea hai phuu-aan dtii-khwaam phon yaang ra-mat-ra-wang", "注明研究限制，让读者谨慎解释结果", "จุดแข็งของการศึกษา", "jut-khaeng-khaawng-gaan-seuk-saa", "研究优势", "反义", "高质量论文会主动说明限制，不是自我削弱。", "limitation"],
  ["ขอบเขตการวิเคราะห์", "khaawp-kheet-gaan-wi-khro", "khaawp kheet gaan wi-khro", "分析范围", "名词", "假设限制", 39, "กำหนดขอบเขตการวิเคราะห์ก่อนเลือกข้อมูล", "gam-not khaawp kheet gaan wi-khro gaawn leuuak khaaw-muun", "选择数据前先确定分析范围", "ประเด็นนอกขอบเขต", "bpra-den-naawk-khaawp-kheet", "范围外议题", "反义", "ช่วยให้文章聚焦，避免论述过宽。", "scope"],
  ["ภายใต้เงื่อนไข", "phaai-dtai-ngeuan-khai", "phaai dtai ngeuan khai", "在……条件下；受限于", "短语", "假设限制", 40, "ภายใต้เงื่อนไขนี้ ผลลัพธ์อาจต่างจากกรณีทั่วไป", "phaai dtai ngeuan khai nii, phon-lap aat dtaang jaak ga-ra-nii thua-bpai", "在此条件下，结果可能不同于一般情况", "โดยไม่มีเงื่อนไข", "dooi-mai-mii-ngeuan-khai", "无条件地", "反义", "用于限定结论适用范围。", "qualification"],
  ["หากสมมติว่า", "haak-som-mut-waa", "haak som-mut waa", "如果假设……", "短语", "假设限制", 41, "หากสมมติว่าต้นทุนคงที่ กำไรจะเพิ่มขึ้นตามยอดขาย", "haak som-mut waa dton-thun khong-thii, gam-rai ja phoem kheun dtaam yaawt khaai", "如果假设成本不变，利润会随销售额增加", "จากข้อเท็จจริงว่า", "jaak-khaaw-thet-jing-waa", "基于事实……", "反义", "明确标记是假设，避免读者误以为已证实。", "hypothesis"],
  ["เท่าที่ข้อมูลมี", "thao-thii-khaaw-muun-mii", "thao thii khaaw-muun mii", "就现有数据而言", "短语", "假设限制", 42, "เท่าที่ข้อมูลมี ยังไม่พบหลักฐานว่ามาตรการนี้ล้มเหลว", "thao thii khaaw-muun mii, yang mai phop lak-thaan waa maat-dtra-gaan nii lom-leeo", "就现有数据而言，尚未发现此措施失败的证据", "ยืนยันได้ทั้งหมด", "yeun-yan-dai-thang-mot", "可完全确认", "反义", "用于降低结论绝对性，体现学术谨慎。", "qualification"],
  ["อาจกล่าวได้ว่า", "aat-glaao-dai-waa", "aat glaao dai waa", "可以说；或许可以认为", "短语", "学术写作", 43, "จากข้อมูลนี้ อาจกล่าวได้ว่าพฤติกรรมผู้บริโภคเปลี่ยนไป", "jaak khaaw-muun nii, aat glaao dai waa phreu-dti-gam phuu baaw-ri-phook bpliian bpai", "根据这些数据，可以说消费者行为发生了变化", "ยืนยันอย่างเด็ดขาดว่า", "yeun-yan-yaang-det-khaat-waa", "断言……", "反义", "ช่วยให้结论更谨慎，不显得过度断言。", "hedging"],
  ["มีแนวโน้มว่า", "mii-naaeo-noom-waa", "mii naaeo noom waa", "有趋势表明；倾向于", "短语", "趋势变化", 44, "ข้อมูลล่าสุดมีแนวโน้มว่าความต้องการจะฟื้นตัว", "khaaw-muun laa-sut mii naaeo noom waa khwaam dtawng-gaan ja feuun dtua", "最新数据有趋势表明需求将恢复", "แน่นอนว่า", "naae-naawn-waa", "确定地说", "反义", "用于预测时保留不确定性。", "trend"],
  ["สะท้อนให้เห็นว่า", "sa-thaawn-hai-hen-waa", "sa-thaawn hai hen waa", "反映出；显示出", "短语", "证据论证", 45, "ตัวเลขนี้สะท้อนให้เห็นว่าความเหลื่อมล้ำยังคงอยู่", "dtua-leek nii sa-thaawn hai hen waa khwaam leuuam-lam yang khong yuu", "这个数字反映出不平等仍然存在", "ปกปิดว่า", "bpok-bpit-waa", "掩盖……", "反义", "常用于从证据导出解释。", "evidence"],
  ["ชี้ให้เห็นว่า", "chii-hai-hen-waa", "chii hai hen waa", "指出；表明", "短语", "证据论证", 46, "ผลการสำรวจชี้ให้เห็นว่าผู้ตอบแบบสอบถามมีความกังวลเพิ่มขึ้น", "phon gaan sam-ruat chii hai hen waa phuu dtaawp baaep-saawp-thaam mii khwaam gang-won phoem kheun", "调查结果表明受访者的担忧增加了", "กล่าวลอย ๆ ว่า", "glaao-loi-loi-waa", "空泛地说……", "反义", "通常后接由数据支持的判断。", "evidence"],
  ["ประกอบกับ", "bpra-gaawp-gap", "bpra gaawp gap", "加之；再加上", "短语", "原因结果", 47, "ต้นทุนเพิ่มขึ้น ประกอบกับความต้องการลดลง ทำให้กำไรหดตัว", "dton-thun phoem kheun, bpra-gaawp gap khwaam dtawng-gaan lot long, tham-hai gam-rai hot dtua", "成本上升，加之需求下降，导致利润收缩", "แยกจาก", "yaaek-jaak", "与……分开", "反义", "用于连接多个共同作用的原因。", "connector"],
  ["ส่งผลให้", "song-phon-hai", "song phon hai", "导致；使得", "短语", "原因结果", 48, "การลงทุนลดลงส่งผลให้การจ้างงานชะลอตัว", "gaan long-thun lot long song phon hai gaan jaang-ngaan cha-law dtua", "投资下降导致就业放缓", "เกิดจาก", "goet-jaak", "源于", "易混", "ส่งผลให้ 指向结果；เกิดจาก 指向原因。", "causality"],
  ["นำไปสู่", "nam-bpai-suu", "nam bpai suu", "导向；导致；通往", "短语", "原因结果", 49, "ความไม่ไว้วางใจนำไปสู่ต้นทุนการกำกับดูแลที่สูงขึ้น", "khwaam mai wai-waang-jai nam bpai suu dton-thun gaan gam-gap duu-laae thii suung kheun", "不信任导致治理成本上升", "เกิดจาก", "goet-jaak", "源于", "易混", "นำไปสู่ 强调前一现象发展到后一结果。", "causality"],
  ["เกิดจาก", "goet-jaak", "goet jaak", "源于；由……造成", "短语", "原因结果", 50, "ความล่าช้าเกิดจากการประสานงานที่ไม่ชัดเจน", "khwaam laa-chaa goet jaak gaan bpra-saan-ngaan thii mai chat-jen", "延误源于协调不清楚", "ส่งผลให้", "song-phon-hai", "导致", "易混", "เกิดจาก 回溯原因；ส่งผลให้ 推向结果。", "causality"],
  ["มีส่วนทำให้", "mii-suan-tham-hai", "mii suan tham hai", "在一定程度上导致；有助于造成", "短语", "原因结果", 51, "ปัจจัยด้านรายได้มีส่วนทำให้การเข้าถึงบริการต่างกัน", "bpat-jai daan raai-dai mii suan tham hai gaan khao theung baaw-ri-gaan dtaang gan", "收入因素在一定程度上导致服务可及性差异", "เป็นสาเหตุเดียว", "bpen-saa-het-diao", "是唯一原因", "反义", "比直接说เป็นสาเหตุ更谨慎，适合多因素分析。", "causality"],
  ["ในทางกลับกัน", "nai-thaang-glap-gan", "nai thaang glap gan", "相反；另一方面", "短语", "学术写作", 52, "ในทางกลับกัน กลุ่มรายได้น้อยได้รับผลกระทบมากกว่า", "nai thaang glap gan, glum raai-dai naawy dai rap phon gra-thop maak gwaa", "相反，低收入群体受到更大影响", "ในทำนองเดียวกัน", "nai-tham-naawng-diao-gan", "同样地", "反义", "用于引出对比观点或相反趋势。", "connector"],
  ["ในทำนองเดียวกัน", "nai-tham-naawng-diao-gan", "nai tham-naawng diao gan", "同样地；类似地", "短语", "学术写作", 53, "ในทำนองเดียวกัน ผลจากพื้นที่ชนบทก็สะท้อนปัญหาเดียวกัน", "nai tham-naawng diao gan, phon jaak pheun-thii chon-na-bot gaaw sa-thaawn bpan-haa diao gan", "同样地，农村地区的结果也反映同一问题", "ในทางกลับกัน", "nai-thaang-glap-gan", "相反", "反义", "用于承接相似证据，增强论证连贯。", "connector"],
  ["อย่างไรก็ตาม", "yaang-rai-gaaw-dtaam", "yaang rai gaaw dtaam", "然而；不过", "短语", "学术写作", 54, "อย่างไรก็ตาม ข้อมูลชุดนี้ยังมีข้อจำกัดด้านขนาดตัวอย่าง", "yaang rai gaaw dtaam, khaaw-muun chut nii yang mii khaaw jam-gat daan kha-naat dtua-yaang", "然而，这组数据在样本规模方面仍有限制", "ดังนั้น", "dang-nan", "因此", "易混", "อย่างไรก็ตาม 转折；ดังนั้น 引出结果或结论。", "connector"],
  ["ดังนั้น", "dang-nan", "dang nan", "因此；所以", "短语", "原因结果", 55, "ดังนั้น การตีความผลลัพธ์ต้องคำนึงถึงบริบทท้องถิ่น", "dang nan, gaan dtii-khwaam phon-lap dtawng kham-neung theung baaw-ri-bot thaawng-thin", "因此，解释结果时必须考虑地方语境", "อย่างไรก็ตาม", "yaang-rai-gaaw-dtaam", "然而", "易混", "ดังนั้น 用于推出结论，不适合引出反对信息。", "connector"],
  ["ในแง่นี้", "nai-ngaae-nii", "nai ngaae nii", "从这个角度看", "短语", "抽象论述", 56, "ในแง่นี้ นโยบายดังกล่าวไม่ได้ล้มเหลวทั้งหมด", "nai ngaae nii, na-yoo-baai dang glaao mai dai lom-leeo thang-mot", "从这个角度看，该政策并非完全失败", "โดยรวม", "dooi-ruam", "总体而言", "易混", "ในแง่นี้ 限定角度；โดยรวม 看整体。", "framing"],
  ["โดยรวม", "dooi-ruam", "dooi ruam", "总体而言；整体上", "短语", "学术写作", 57, "โดยรวม ผลการศึกษาสนับสนุนข้อเสนอเชิงนโยบายนี้", "dooi ruam, phon gaan seuk-saa sa-nap-sa-nun khaaw sa-noe choeng na-yoo-baai nii", "总体而言，研究结果支持这项政策建议", "ในรายละเอียด", "nai-raai-la-iiat", "在细节上", "反义", "用于总结整体判断，不代表每个细节都一致。", "summary"],
  ["ในรายละเอียด", "nai-raai-la-iiat", "nai raai-la-iiat", "在细节上", "短语", "学术写作", 58, "ในรายละเอียด แต่ละพื้นที่มีรูปแบบปัญหาไม่เหมือนกัน", "nai raai-la-iiat, dtaae la pheun-thii mii ruup-baaep bpan-haa mai meuuan gan", "在细节上，各地区的问题模式并不相同", "โดยรวม", "dooi-ruam", "总体而言", "反义", "常用于从总论转向细部差异。", "detail"],
  ["กล่าวโดยสรุป", "glaao-dooi-sa-ruup", "glaao dooi sa-ruup", "概括而言；总结来说", "短语", "学术写作", 59, "กล่าวโดยสรุป ปัญหานี้เกิดจากทั้งโครงสร้างและพฤติกรรม", "glaao dooi sa-ruup, bpan-haa nii goet jaak thang khroohng-saang lae phreu-dti-gam", "总结来说，此问题同时源于结构和行为", "กล่าวโดยละเอียด", "glaao-dooi-la-iiat", "详细来说", "反义", "用于段落或文章收束。", "summary"],
  ["กล่าวอีกนัยหนึ่ง", "glaao-iik-nai-neung", "glaao iik nai neung", "换言之", "短语", "学术写作", 60, "กล่าวอีกนัยหนึ่ง มาตรการนี้ช่วยลดความเสี่ยงแต่ไม่แก้รากปัญหา", "glaao iik nai neung, maat-dtra-gaan nii chuai lot khwaam siiang dtaae mai gaae raak bpan-haa", "换言之，此措施降低风险，但不解决根源问题", "กล่าวซ้ำโดยไม่เปลี่ยนความหมาย", "glaao-sam-dooi-mai-bpliian-khwaam-maai", "无意义重复", "易混", "用于换一种更清楚的说法，不是机械重复。", "paraphrase"],
  ["ตีความ", "dtii-khwaam", "dtii khwaam", "解释；诠释", "动词", "抽象论述", 61, "การตีความข้อมูลต้องอิงบริบท ไม่ใช่ดูตัวเลขล้วน ๆ", "gaan dtii-khwaam khaaw-muun dtawng ing baaw-ri-bot, mai chai duu dtua-leek luan luan", "解释数据必须依托语境，而不是只看数字本身", "คัดลอก", "khat-laawk", "复制", "反义", "ตีความ มี分析判断；不是照搬资料。", "interpret"],
  ["นิยาม", "ni-yaam", "ni-yaam", "定义；界定", "动词", "抽象论述", 62, "ผู้เขียนต้องนิยามคำสำคัญก่อนเข้าสู่การวิเคราะห์", "phuu-khian dtawng ni-yaam kham sam-khan gaawn khao suu gaan wi-khro", "作者必须先定义关键词，再进入分析", "ใช้คำโดยไม่กำหนด", "chai-kham-dooi-mai-gam-not", "未界定就使用术语", "反义", "C1 写作中นิยามช่วยลดความกำกวม。", "definition"],
  ["จำแนก", "jam-naaek", "jam naaek", "分类；区分", "动词", "抽象论述", 63, "งานวิจัยนี้จำแนกผู้ตอบตามช่วงอายุและรายได้", "ngaan wi-jai nii jam-naaek phuu dtaawp dtaam chuang aa-yu lae raai-dai", "本研究按年龄段和收入对受访者分类", "รวมปนกัน", "ruam-bpon-gan", "混在一起", "反义", "用于建立分类标准，让分析更清楚。", "classify"],
  ["เปรียบเทียบ", "bpriiap-thiiap", "bpriiap thiiap", "比较；对照", "动词", "评估判断", 64, "เปรียบเทียบผลลัพธ์ระหว่างกลุ่มทดลองและกลุ่มควบคุม", "bpriiap-thiiap phon-lap ra-waang glum thot-laawng lae glum khuuap-khum", "比较实验组和控制组之间的结果", "พิจารณาแยกเดี่ยว", "phi-jaa-ra-naa-yaaek-diao", "单独考察", "反义", "比较需要可比对象和标准。", "compare"],
  ["ประเมิน", "bpra-moen", "bpra moen", "评估；评价", "动词", "评估判断", 65, "ประเมินประสิทธิผลของโครงการจากทั้งต้นทุนและผลลัพธ์", "bpra-moen bpra-sit-thi-phon khaawng khroong-gaan jaak thang dton-thun lae phon-lap", "从成本和结果两方面评估项目成效", "บรรยายเฉย ๆ", "ban-yaai-choei-choei", "只是描述", "反义", "ประเมิน ต้องมี标准或依据，不只是讲述现象。", "evaluate"],
  ["ชั่งน้ำหนัก", "chang-nam-nak", "chang nam nak", "权衡；衡量利弊", "动词", "评估判断", 66, "ผู้กำหนดนโยบายต้องชั่งน้ำหนักระหว่างประสิทธิภาพกับความเป็นธรรม", "phuu gam-not na-yoo-baai dtawng chang nam-nak ra-waang bpra-sit-thi-phaap gap khwaam bpen tham", "政策制定者必须在效率与公平之间权衡", "เลือกด้านเดียว", "leuuak-daan-diao", "只选一边", "反义", "用于多价值冲突的分析，不是简单选择。", "evaluate"],
  ["บ่งชี้", "bong-chii", "bong chii", "表明；指示", "动词", "证据论证", 67, "ตัวชี้วัดหลาย项บ่งชี้ว่าคุณภาพบริการดีขึ้น", "dtua chii wat laai yaang bong chii waa khun-na-phaap baaw-ri-gaan dii kheun", "多项指标表明服务质量改善", "ปฏิเสธ", "bpa-dti-seet", "否认", "反义", "บ่งชี้ 比พิสูจน์弱，表示证据指向某判断。", "evidence"],
  ["ยืนยัน", "yeun-yan", "yeun yan", "确认；证实", "动词", "证据论证", 68, "ข้อมูลเพิ่มเติมยืนยันข้อสังเกตจากการสัมภาษณ์", "khaaw-muun phoem-dtoem yeun-yan khaaw sang-geet jaak gaan sam-phaat", "补充数据证实了访谈中的观察", "หักล้าง", "hak-laang", "反驳；推翻", "反义", "ยืนยัน 的证据强度高于บ่งชี้。", "evidence"],
  ["หักล้าง", "hak-laang", "hak laang", "反驳；推翻", "动词", "证据论证", 69, "ผลทดลองใหม่หักล้างข้อสันนิษฐานเดิมบางส่วน", "phon thot-laawng mai hak-laang khaaw san-nit-thaan doem baang suan", "新的实验结果部分推翻了原有推定", "ยืนยัน", "yeun-yan", "证实", "反义", "用于证据与原判断相冲突时。", "evidence"],
  ["รองรับ", "raawng-rap", "raawng rap", "支持；支撑", "动词", "证据论证", 70, "หลักฐานชุดนี้รองรับข้อเสนอเชิงนโยบายได้พอสมควร", "lak-thaan chut nii raawng rap khaaw sa-noe choeng na-yoo-baai dai phaaw-som-khuan", "这组证据在相当程度上支持政策建议", "ขัดแย้งกับ", "khat-yaaeng-gap", "与……矛盾", "反义", "รองรับ 比พิสูจน์更谨慎，适合不完全确定时。", "evidence"],
  ["สอดรับกับ", "saawt-rap-gap", "saawt rap gap", "与……相呼应；符合", "短语", "证据论证", 71, "ผลวิจัยสอดรับกับแนวโน้มที่พบในประเทศอื่น", "phon wi-jai saawt rap gap naaeo-noom thii phop nai bpra-theet euen", "研究结果与其他国家发现的趋势相呼应", "ขัดแย้งกับ", "khat-yaaeng-gap", "与……矛盾", "反义", "强调结果之间相互支持，但不一定完全相同。", "evidence"],
  ["ตั้งอยู่บนฐานของ", "dtang-yuu-bon-thaan-khaawng", "dtang yuu bon thaan khaawng", "建立在……基础上", "短语", "学术写作", 72, "ข้อเสนอของผู้เขียนตั้งอยู่บนฐานของข้อมูลภาคสนาม", "khaaw sa-noe khaawng phuu-khian dtang yuu bon thaan khaawng khaaw-muun phaak sa-naam", "作者的提议建立在田野资料基础上", "กล่าวโดยไม่มีฐานข้อมูล", "glaao-dooi-mai-mii-thaan-khaaw-muun", "无资料基础地声称", "反义", "用于说明论点依据，语气正式。", "style"],
  ["ขึ้นอยู่กับ", "kheun-yuu-gap", "kheun yuu gap", "取决于；依赖于", "短语", "假设限制", 73, "ผลของนโยบายขึ้นอยู่กับวิธีนำไปปฏิบัติในพื้นที่", "phon khaawng na-yoo-baai kheun yuu gap wi-thii nam bpai bpa-dti-bat nai pheun-thii", "政策效果取决于在地方的执行方式", "ไม่เกี่ยวกับ", "mai-giao-gap", "与……无关", "反义", "用于说明条件依赖关系。", "condition"],
  ["มีเงื่อนไขว่า", "mii-ngeuan-khai-waa", "mii ngeuan khai waa", "条件是；前提是", "短语", "假设限制", 74, "ข้อสรุปนี้มีเงื่อนไขว่าข้อมูลที่ใช้ต้องถูกต้อง", "khaaw sa-ruup nii mii ngeuan khai waa khaaw-muun thii chai dtawng thuuk dtawng", "此结论的前提是所用数据必须准确", "ไม่มีเงื่อนไข", "mai-mii-ngeuan-khai", "没有条件", "反义", "用于明确结论成立的条件。", "condition"],
  ["มิได้หมายความว่า", "mi-dai-maai-khwaam-waa", "mi dai maai khwaam waa", "并不意味着", "短语", "学术写作", 75, "การเพิ่มขึ้นของยอดขายมิได้หมายความว่ากำไรจะเพิ่มตามเสมอ", "gaan phoem kheun khaawng yaawt khaai mi dai maai khwaam waa gam-rai ja phoem dtaam sa-moe", "销售额增加并不意味着利润一定随之增加", "หมายความว่า", "maai-khwaam-waa", "意味着", "反义", "用于防止过度推论。", "hedging"],
  ["ไม่อาจสรุปได้ว่า", "mai-aat-sa-ruup-dai-waa", "mai aat sa-ruup dai waa", "不能得出……结论", "短语", "假设限制", 76, "จากข้อมูลชุดเดียว ไม่อาจสรุปได้ว่าปัจจัยนี้เป็นสาเหตุหลัก", "jaak khaaw-muun chut diao, mai aat sa-ruup dai waa bpat-jai nii bpen saa-het lak", "仅凭一组数据，不能得出此因素是主要原因的结论", "สรุปได้ว่า", "sa-ruup-dai-waa", "可以得出结论", "反义", "学术谨慎表达，尤其适合证据不足时。", "hedging"],
  ["มีข้อสังเกตว่า", "mii-khaaw-sang-geet-waa", "mii khaaw sang-geet waa", "值得观察的是；有一点观察", "短语", "学术写作", 77, "มีข้อสังเกตว่ากลุ่มตัวอย่างในเมืองตอบต่างจากชนบท", "mii khaaw sang-geet waa glum dtua-yaang nai mueang dtaawp dtaang jaak chon-na-bot", "值得观察的是，城市样本的回答不同于农村", "ไม่มีประเด็นน่าสังเกต", "mai-mii-bpra-den-naa-sang-geet", "没有值得注意之处", "反义", "用于提出辅助但重要的发现。", "style"],
  ["เป็นที่น่าสังเกตว่า", "bpen-thii-naa-sang-geet-waa", "bpen thii naa sang-geet waa", "值得注意的是", "短语", "学术写作", 78, "เป็นที่น่าสังเกตว่าผลลัพธ์ไม่สอดคล้องกับทฤษฎีเดิม", "bpen thii naa sang-geet waa phon-lap mai saawt-khlaawng gap thrit-sa-dii doem", "值得注意的是，结果与既有理论不一致", "เป็นเรื่องปกติว่า", "bpen-rueang-bpa-ga-dti-waa", "通常的是", "反义", "比มีข้อสังเกตว่า更突出读者注意。", "style"],
  ["กล่าวได้ในระดับหนึ่งว่า", "glaao-dai-nai-ra-dap-neung-waa", "glaao dai nai ra-dap neung waa", "在一定程度上可以说", "短语", "学术写作", 79, "กล่าวได้ในระดับหนึ่งว่านโยบายช่วยลดความเหลื่อมล้ำ", "glaao dai nai ra-dap neung waa na-yoo-baai chuai lot khwaam leuuam-lam", "在一定程度上可以说，政策有助于减少不平等", "กล่าวได้อย่างเด็ดขาดว่า", "glaao-dai-yaang-det-khaat-waa", "可以断然说", "反义", "用于保留程度，避免绝对化。", "hedging"],
  ["ในระดับโครงสร้าง", "nai-ra-dap-khroohng-saang", "nai ra-dap khroohng-saang", "在结构层面", "短语", "抽象论述", 80, "ในระดับโครงสร้าง ปัญหานี้เกี่ยวข้องกับการกระจายทรัพยากร", "nai ra-dap khroohng-saang, bpan-haa nii giao-khaawng gap gaan gra-jaai sap-pha-yaa-gaawn", "在结构层面，此问题与资源分配有关", "ในระดับบุคคล", "nai-ra-dap-buk-khon", "在个人层面", "反义", "用于区分宏观制度因素和个体行为因素。", "level"],
  ["ในระดับบุคคล", "nai-ra-dap-buk-khon", "nai ra-dap buk-khon", "在个人层面", "短语", "抽象论述", 81, "ในระดับบุคคล แรงจูงใจมีผลต่อการตัดสินใจอย่างมาก", "nai ra-dap buk-khon, raaeng juung-jai mii phon dtaaw gaan dtat-sin-jai yaang maak", "在个人层面，动机会显著影响决策", "ในระดับโครงสร้าง", "nai-ra-dap-khroohng-saang", "在结构层面", "反义", "常用于多层次分析。", "level"],
  ["บริบท", "baaw-ri-bot", "baaw ri bot", "语境；背景环境", "名词", "抽象论述", 82, "ผลการศึกษาควรถูกอ่านภายใต้บริบททางสังคมของพื้นที่", "phon gaan seuk-saa khuan thuuk aan phaai dtai baaw-ri-bot thaang sang-khom khaawng pheun-thii", "研究结果应放在该地区的社会语境下解读", "ข้อมูลโดด ๆ", "khaaw-muun-doot-doot", "孤立数据", "反义", "บริบท ช่วย解释为什么同一数据在不同环境下意义不同。", "context"],
  ["มิติ", "mi-dti", "mi dti", "维度；层面", "名词", "抽象论述", 83, "วิเคราะห์ปัญหานี้ในหลายมิติ ทั้งเศรษฐกิจ สังคม และวัฒนธรรม", "wi-khro bpan-haa nii nai laai mi-dti, thang seet-tha-git, sang-khom, lae wat-tha-na-tham", "从经济、社会、文化等多个维度分析此问题", "มุมเดียว", "mum-diao", "单一角度", "反义", "มิติ 用于拓展分析角度。", "dimension"],
  ["ระดับมหภาค", "ra-dap-ma-ha-phaak", "ra-dap ma-ha-phaak", "宏观层面", "名词", "抽象论述", 84, "ระดับมหภาคชี้ให้เห็นแรงกดดันจากเศรษฐกิจโลก", "ra-dap ma-ha-phaak chii hai hen raaeng got-dan jaak seet-tha-git look", "宏观层面显示出来自全球经济的压力", "ระดับจุลภาค", "ra-dap-ju-la-phaak", "微观层面", "反义", "มหภาค 看整体系统；จุลภาค 看个体或小单位。", "level"],
  ["ระดับจุลภาค", "ra-dap-ju-la-phaak", "ra-dap ju-la-phaak", "微观层面", "名词", "抽象论述", 85, "ระดับจุลภาคช่วยอธิบายพฤติกรรมของครัวเรือนแต่ละกลุ่ม", "ra-dap ju-la-phaak chuai a-thi-baai phreu-dti-gam khaawng khrua-reuuan dtaae-la glum", "微观层面有助于解释各类家庭的行为", "ระดับมหภาค", "ra-dap-ma-ha-phaak", "宏观层面", "反义", "用于个体、家庭、企业等小单位分析。", "level"],
  ["ข้อค้นพบ", "khaaw-khon-phop", "khaaw khon phop", "研究发现；发现结果", "名词", "证据论证", 86, "ข้อค้นพบหลักของงานนี้ต่างจากงานวิจัยก่อนหน้า", "khaaw khon phop lak khaawng ngaan nii dtaang jaak ngaan wi-jai gaawn naa", "本研究的主要发现不同于既有研究", "สมมติฐาน", "som-mut-thaan", "假设", "易混", "ข้อค้นพบ 是研究后发现；สมมติฐาน 是研究前待检验。", "finding"],
  ["ข้อเสนอเชิงนโยบาย", "khaaw-sa-noe-choeng-na-yoo-baai", "khaaw sa-noe choeng na-yoo-baai", "政策建议", "名词", "学术写作", 87, "ข้อเสนอเชิงนโยบายควรตั้งอยู่บนหลักฐานที่ตรวจสอบได้", "khaaw sa-noe choeng na-yoo-baai khuan dtang yuu bon lak-thaan thii dtruat-saawp dai", "政策建议应建立在可核查证据之上", "คำวิจารณ์", "kham-wi-jaan", "批评意见", "易混", "ข้อเสนอ 是提出下一步；คำวิจารณ์ 可能只是评价问题。", "policy"],
  ["ข้อเสนอแนะ", "khaaw-sa-noe-nae", "khaaw sa-noe nae", "建议；改进意见", "名词", "学术写作", 88, "ผู้วิจัยให้ข้อเสนอแนะสำหรับการศึกษาในอนาคต", "phuu wi-jai hai khaaw sa-noe nae sam-rap gaan seuk-saa nai a-naa-khot", "研究者为未来研究提出建议", "ข้อสรุป", "khaaw-sa-ruup", "结论", "易混", "ข้อสรุป 总结发现；ข้อเสนอแนะ 提出行动或未来研究方向。", "recommendation"],
  ["บทสรุป", "bot-sa-ruup", "bot sa-ruup", "总结；结语", "名词", "学术写作", 89, "บทสรุปควรเชื่อมกลับไปยังคำถามวิจัยตั้งต้น", "bot sa-ruup khuan cheuam glap bpai yang kham-thaam wi-jai dtang-dton", "总结应回扣最初的研究问题", "บทนำ", "bot-nam", "引言", "反义", "บทนำ เปิดเรื่อง；บทสรุป ปิดเรื่อง并整合观点。", "structure"],
  ["ข้อสรุปเบื้องต้น", "khaaw-sa-ruup-beuang-dton", "khaaw sa-ruup beuang dton", "初步结论", "名词", "学术写作", 90, "ข้อสรุปเบื้องต้นนี้ยังต้องตรวจสอบด้วยข้อมูลเพิ่มเติม", "khaaw sa-ruup beuang dton nii yang dtawng dtruat-saawp duai khaaw-muun phoem-dtoem", "这个初步结论仍需用更多数据检验", "ข้อสรุปสุดท้าย", "khaaw-sa-ruup-sut-thaai", "最终结论", "反义", "ใช้เมื่อต้องการ保留后续修正空间。", "conclusion"],
] as const satisfies readonly Row[];

const relatedFor = (row: Row): VocabularyExpansionRelatedWord => ({ thai: row[10], roman: row[11], chinese: row[12] });
const comparisonFor = (row: Row): VocabularyExpansionComparison => ({
  kind: row[13],
  target: relatedFor(row),
  distinctionZh: `${row[0]} 和 ${row[10]} 在学术论述或分析写作中容易形成对照；学习时要看它强调的是原因、证据、限制、趋势还是结论强度。`,
});
const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในบทวิเคราะห์เชิงวิชาการ ผู้เขียนใช้วลีว่า “${row[7]}” เพื่อเชื่อมข้อมูลหลายชุดเข้ากับข้อสรุปอย่างเป็นระบบ และหลีกเลี่ยงการกล่าวเกินหลักฐาน`,
  roman: `nai bot wi-khro choeng wi-chaa-gaan, phuu-khian chai wa-lii waa "${row[8]}" phuea cheuam khaaw-muun laai chut khao gap khaaw sa-ruup yaang bpen ra-bop, lae liik-liiang gaan glaao goen lak-thaan`,
  chinese: `在学术分析文章中，作者使用“${row[9]}”这一表达，把多组资料系统地连接到结论，同时避免超出证据范围的表述。`,
});
const synonymsFor = (row: Row): VocabularyExpansionRelatedWord[] => row[13] === "近义" ? [relatedFor(row)] : [];
const antonymsFor = (row: Row): VocabularyExpansionRelatedWord[] => row[13] === "反义" ? [relatedFor(row)] : [];

const toCandidate = (row: Row): VocabularyExpansionCandidate => {
  const synonyms = synonymsFor(row);
  const antonyms = antonymsFor(row);
  const comparisons = [comparisonFor(row)];
  const collocations = [{ thai: row[7], roman: row[8], chinese: row[9] }];
  const tags = ["c1", "academic-analysis", row[15], row[5]];
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
    sourceRefs: ACADEMIC_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_C1_ACADEMIC_ANALYSIS_01 = rows.map(toCandidate);
