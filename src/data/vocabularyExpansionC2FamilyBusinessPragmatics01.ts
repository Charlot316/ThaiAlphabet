export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "家族企业" | "人情往来" | "长幼称谓" | "委婉管理" | "仪式祝辞" | "微妙关系";
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
  level: "c2";
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

const FAMILY_BUSINESS_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thai-family-business-pragmatics-candidate"];

const rows = [
  ["ธุรกิจครอบครัว", "thu-ra-git-khraawp-khrua", "thu-ra-git khraawp khrua", "家族企业", "名词", "家族企业", 1, "บริหารธุรกิจครอบครัวอย่างมืออาชีพ", "baaw-ri-haan thu-ra-git khraawp khrua yaang mue aa-chiip", "以专业方式管理家族企业", "บริษัทมหาชน", "baaw-ri-sat-ma-haa-chon", "上市公众公司", "易混", "家族企业不等于不专业，关键在家族关系与制度如何并存。", "family-business"],
  ["กิจการของบ้าน", "git-ja-gaan-khaawng-baan", "git-ja-gaan khaawng baan", "家里的生意；家业", "名词", "家族企业", 2, "สานต่อกิจการของบ้านโดยไม่ทิ้งระบบเดิมทั้งหมด", "saan dtaaw git-ja-gaan khaawng baan dooi mai thing ra-bop doem thang-mot", "承接家里的生意，同时不完全抛弃旧制度", "งานส่วนตัว", "ngaan-suan-dtua", "个人工作", "易混", "กิจการของบ้าน 带有家族延续感，不只是个人职业。", "family-business"],
  ["รุ่นพ่อแม่", "run-phaaw-maae", "run phaaw maae", "父母一代；上一代", "名词", "长幼称谓", 3, "รับฟังมุมมองของรุ่นพ่อแม่ก่อนเสนอระบบใหม่", "rap fang mum-maawng khaawng run phaaw maae gaawn sa-noe ra-bop mai", "提出新制度前先听取父母一代的看法", "รุ่นลูก", "run-luuk", "子女一代", "反义", "用于描述代际经营差异，不是单纯年龄称呼。", "generation"],
  ["รุ่นลูก", "run-luuk", "run luuk", "子女一代；接班一代", "名词", "长幼称谓", 4, "รุ่นลูกต้องพิสูจน์ฝีมือโดยไม่ทำให้ผู้ใหญ่เสียหน้า", "run luuk dtawng phi-suut fii-mue dooi mai tham-hai phuu-yai siia naa", "子女一代必须证明能力，同时不让长辈失面子", "รุ่นพ่อแม่", "run-phaaw-maae", "父母一代", "反义", "常用于接班、创新和代际沟通语境。", "generation"],
  ["ผู้ใหญ่ในบ้าน", "phuu-yai-nai-baan", "phuu yai nai baan", "家中长辈；家族中有分量的人", "名词", "长幼称谓", 5, "ขอความเห็นผู้ใหญ่ในบ้านก่อนประกาศการเปลี่ยนแปลง", "khaaw khwaam-hen phuu-yai nai baan gaawn bpra-gaat gaan bpliian-bplaaeng", "宣布变动前先征求家中长辈意见", "คนนอก", "khon-naawk", "外人", "反义", "ผู้ใหญ่ในบ้าน มี权威和情感分量，不等于公司职位。", "seniority"],
  ["ผู้อาวุโส", "phuu-aa-wu-soo", "phuu aa-wu-soo", "资深长者；年长有资历者", "名词", "长幼称谓", 6, "ให้เกียรติผู้อาวุโสแม้ต้องปรับวิธีทำงาน", "hai giiat phuu aa-wu-soo maae dtawng bprap wi-thii tham-ngaan", "即使必须调整工作方式，也尊重资深长者", "คนรุ่นใหม่", "khon-run-mai", "年轻一代", "反义", "比ผู้ใหญ่更正式，强调年龄和资历。", "seniority"],
  ["เถ้าแก่", "thao-gaae", "thao gaae", "老板；老东家；华人商号语境中的掌柜", "名词", "长幼称谓", 7, "ลูกน้องเก่าเรียกคุณพ่อว่าเถ้าแก่ด้วยความเคารพ", "luuk-naawng gao riiak khun-phaaw waa thao gaae duai khwaam khao-rop", "老员工带着尊敬称父亲为老板/老东家", "ผู้จัดการ", "phuu-jat-gaan", "经理", "易混", "เถ้าแก่ 带人情和传统商号色彩；ผู้จัดการ 是职务。", "address"],
  ["เถ้าแก่เนี้ย", "thao-gaae-nia", "thao gaae nia", "老板娘；女东家", "名词", "长幼称谓", 8, "ทุกคนเกรงใจเถ้าแก่เนี้ยเพราะท่านดูแลบัญชีมาตั้งแต่เริ่มกิจการ", "thuk khon greeng-jai thao gaae nia phraw than duu-laae ban-chii maa dtang-dtaae roem git-ja-gaan", "大家都顾及老板娘，因为她从创业起就负责账务", "ภรรยาเจ้าของ", "phan-ra-yaa-jao-khaawng", "老板的妻子", "易混", "เถ้าแก่เนี้ย 不只是婚姻身份，也可能代表经营权威。", "address"],
  ["ลูกหลาน", "luuk-laan", "luuk laan", "子孙后辈；晚辈们", "名词", "长幼称谓", 9, "ลูกหลานควรรู้ที่มาของกิจการก่อนเข้ามาบริหาร", "luuk laan khuan ruu thii-maa khaawng git-ja-gaan gaawn khao maa baaw-ri-haan", "晚辈们进入管理前应了解家业来历", "บรรพบุรุษ", "ban-pha-bu-rut", "祖辈；祖先", "反义", "ลูกหลาน 强调后代身份和继承关系。", "kinship"],
  ["ญาติผู้ใหญ่", "yaat-phuu-yai", "yaat phuu yai", "长辈亲戚", "名词", "长幼称谓", 10, "เชิญญาติผู้ใหญ่ร่วมพิธีเปิดสาขาใหม่เพื่อความเป็นสิริมงคล", "choen yaat phuu-yai ruam phi-thii bpoet saa-khaa mai phuea khwaam bpen si-ri-mong-khon", "邀请长辈亲戚参加新分店开业仪式以求吉祥", "ญาติรุ่นเดียวกัน", "yaat-run-diao-gan", "同辈亲戚", "反义", "在仪式和重大决策中，ญาติผู้ใหญ่ 的出席常有象征意义。", "kinship"],
  ["คนกันเอง", "khon-gan-eeng", "khon gan eeng", "自己人；熟人圈内人", "名词", "人情往来", 11, "แม้เป็นคนกันเอง ก็ต้องแยกบัญชีบริษัทให้ชัด", "maae bpen khon gan eeng, gaaw dtawng yaaek ban-chii baaw-ri-sat hai chat", "即使是自己人，也必须把公司账目分清楚", "คนนอก", "khon-naawk", "外人", "反义", "คนกันเอง 带信任感，但也容易模糊规则。", "insider"],
  ["คนนอก", "khon-naawk", "khon naawk", "外人；圈外人", "名词", "微妙关系", 12, "ผู้บริหารมืออาชีพที่เป็นคนนอกต้องเข้าใจวัฒนธรรมครอบครัว", "phuu baaw-ri-haan mue aa-chiip thii bpen khon naawk dtawng khao-jai wat-tha-na-tham khraawp-khrua", "作为外人的职业经理人必须理解家族文化", "คนกันเอง", "khon-gan-eeng", "自己人", "反义", "不是贬义，但在家族企业中意味着信任需要建立。", "outsider"],
  ["เกรงใจ", "greeng-jai", "greeng jai", "顾及；怕给人添麻烦或冒犯", "动词", "人情往来", 13, "พนักงานเกรงใจญาติผู้ใหญ่จนไม่กล้าท้วงเรื่องงาน", "pha-nak-ngaan greeng-jai yaat phuu-yai jon mai glaa thuang rueang ngaan", "员工顾及长辈亲戚，以至于不敢指出工作问题", "กล้าพูดตรง", "glaa-phuut-dtrong", "敢直说", "反义", "เกรงใจ 是泰语关系语用核心，可能保护关系也可能妨碍管理。", "pragmatics"],
  ["ไว้หน้า", "wai-naa", "wai naa", "给面子；顾全面子", "动词", "微妙关系", 14, "หัวหน้าควรไว้หน้าลูกพี่ลูกน้องแม้ต้องตักเตือนเรื่องผลงาน", "hua-naa khuan wai naa luuk-phii-luuk-naawng maae dtawng dtak-dteuan rueang phon-ngaan", "主管即使要提醒堂表亲的绩效，也应给面子", "หักหน้า", "hak-naa", "让人丢脸", "反义", "ไว้หน้า 是保全面子，常通过私下说、留台阶实现。", "face"],
  ["เสียหน้า", "siia-naa", "siia naa", "丢脸；失面子", "动词", "微妙关系", 15, "การตำหนิกลางโต๊ะอาหารอาจทำให้ผู้ใหญ่เสียหน้า", "gaan dtam-ni glaang dto aa-haan aat tham-hai phuu-yai siia naa", "在饭桌上批评可能让长辈失面子", "ได้หน้า", "dai-naa", "有面子；得脸", "反义", "C2 语用中要判断何时会造成เสียหน้า。", "face"],
  ["หักหน้า", "hak-naa", "hak naa", "当众让人难堪；拆台", "动词", "微妙关系", 16, "อย่าหักหน้าผู้ก่อตั้งต่อหน้าพนักงานเก่า", "yaa hak naa phuu gaaw-dtang dtaaw naa pha-nak-ngaan gao", "不要在老员工面前拆创始人的台", "ไว้หน้า", "wai-naa", "给面子", "反义", "比普通反对更伤关系，常带公开羞辱意味。", "face"],
  ["ให้ทางลง", "hai-thaang-long", "hai thaang long", "给台阶；给退路", "动词", "委婉管理", 17, "ให้ทางลงแก่ญาติที่ตัดสินใจผิดโดยไม่ทำให้เรื่องบานปลาย", "hai thaang long gaae yaat thii dtat-sin-jai phit dooi mai tham-hai rueang baan-bplaai", "给判断失误的亲戚台阶，避免事情扩大", "บีบจนมุม", "biip-jon-mum", "逼到无路可退", "反义", "用于处理亲属管理失误，保留关系和秩序。", "face"],
  ["น้ำใจ", "nam-jai", "nam jai", "情义；好意；愿意帮人的心", "名词", "人情往来", 18, "การช่วยงานญาติต้องมีน้ำใจแต่ไม่ควรละเลยต้นทุนจริง", "gaan chuai ngaan yaat dtawng mii nam jai dtaae mai khuan la-loei dton-thun jing", "帮亲戚做事要有人情味，但不应忽略真实成本", "ผลประโยชน์ล้วน ๆ", "phon-bpra-yoot-luan-luan", "纯利益", "反义", "น้ำใจ 是关系润滑剂，但也可能让规则变模糊。", "reciprocity"],
  ["บุญคุณ", "bun-khun", "bun khun", "恩情；受惠之情", "名词", "人情往来", 19, "ลูกหลานไม่ควรใช้บุญคุณเป็นเหตุผลเดียวในการบริหารคน", "luuk laan mai khuan chai bun khun bpen het-phon diao nai gaan baaw-ri-haan khon", "晚辈不应只用恩情作为管理人的唯一理由", "สัญญาจ้าง", "san-yaa-jaang", "雇佣合同", "易混", "บุญคุณ 属于人情伦理；สัญญาจ้าง 属于制度关系。", "reciprocity"],
  ["ตอบแทนน้ำใจ", "dtaawp-thaaen-nam-jai", "dtaawp thaaen nam jai", "回报好意；还人情", "动词", "人情往来", 20, "บริษัทตอบแทนน้ำใจคู่ค้าเก่าด้วยการเชิญร่วมงานครบรอบ", "baaw-ri-sat dtaawp thaaen nam jai khuu-khaa gao duai gaan choen ruam ngaan khrop raawp", "公司邀请老合作方参加周年活动，以回报其多年好意", "ลืมน้ำใจ", "leum-nam-jai", "忘记别人的好意", "反义", "多用于长期关系，不只是金钱回报。", "reciprocity"],
  ["รักษาน้ำใจ", "rak-saa-nam-jai", "rak-saa nam jai", "顾及情分；维护好意", "动词", "人情往来", 21, "ปฏิเสธคำขอญาติอย่างไรให้รักษาน้ำใจได้", "bpa-dti-seet kham khaaw yaat yaang rai hai rak-saa nam jai dai", "如何拒绝亲戚的请求又能顾及情分", "ตัดน้ำใจ", "dtat-nam-jai", "伤人情分", "反义", "比礼貌更强调长期人情债和关系温度。", "reciprocity"],
  ["ขอแรง", "khaaw-raaeng", "khaaw raaeng", "请人帮忙出力；托人帮忙", "动词", "人情往来", 22, "คุณแม่ขอแรงหลานมาช่วยงานเปิดร้านโดยไม่คิดค่าจ้าง", "khun-maae khaaw raaeng laan maa chuai ngaan bpoet raan dooi mai khit khaa-jaang", "妈妈请侄辈来帮忙开店，没有按工资计算", "จ้างงาน", "jaang-ngaan", "雇用", "易混", "ขอแรง 带人情请求；จ้างงาน 是劳动契约。", "reciprocity"],
  ["ฝากฝัง", "faak-fang", "faak fang", "托付；郑重拜托照看", "动词", "人情往来", 23, "ผู้ใหญ่ฝากฝังหลานให้เรียนรู้งานกับผู้จัดการเก่า", "phuu-yai faak fang laan hai riian-ruu ngaan gap phuu-jat-gaan gao", "长辈托付晚辈跟老经理学习业务", "มอบหมายตามระบบ", "maawp-maai-dtaam-ra-bop", "按制度分配", "易混", "ฝากฝัง 有情分和信任托付，ไม่ใช่普通任务分配。", "patronage"],
  ["เส้นสาย", "sen-saai", "sen saai", "关系门路；人脉通道", "名词", "微妙关系", 24, "การพึ่งเส้นสายมากเกินไปอาจทำให้พนักงานมืออาชีพหมดกำลังใจ", "gaan pheung sen saai maak goen bpai aat tham-hai pha-nak-ngaan mue aa-chiip mot gam-lang-jai", "过度依赖关系门路可能让职业员工失去动力", "ระบบคุณธรรม", "ra-bop-khun-na-tham", "任人唯贤制度", "反义", "เส้นสาย 在中文可近似“关系”，但在泰语里常带负面评价。", "network"],
  ["เด็กฝาก", "dek-faak", "dek faak", "关系户；托关系进来的人", "名词", "微妙关系", 25, "ถ้ารับเด็กฝากเข้ามา ต้องกำหนดหน้าที่และเกณฑ์ประเมินให้ชัด", "thaa rap dek faak khao maa, dtawng gam-not naa-thii lae geen bpra-moen hai chat", "如果接收关系户，必须明确职责和考核标准", "ผู้สมัครทั่วไป", "phuu-sa-mak-thua-bpai", "普通申请者", "反义", "该词语气敏感，正式场合要谨慎使用。", "network"],
  ["คนของเรา", "khon-khaawng-rao", "khon khaawng rao", "我们的人；自己阵营的人", "名词", "微妙关系", 26, "การแยกคนของเรากับคนนอกชัดเกินไปทำให้องค์กรแตกเป็นกลุ่ม", "gaan yaaek khon khaawng rao gap khon naawk chat goen bpai tham-hai ong-gaawn dtaaek bpen glum", "过度区分“我们的人”和外人，会让组织分裂成派别", "คนกลาง", "khon-glaang", "中立者", "反义", "在家族企业中常指亲信，但也可能造成派系感。", "faction"],
  ["พวกพ้อง", "phuak-phaawng", "phuak phaawng", "派系亲友；自己一派的人", "名词", "微妙关系", 27, "ผู้บริหารควรหลีกเลี่ยงภาพว่าช่วยแต่พวกพ้อง", "phuu baaw-ri-haan khuan liik-liiang phaap waa chuai dtaae phuak phaawng", "管理者应避免给人只帮自己派系的印象", "ส่วนรวม", "suan-ruam", "整体；公共利益", "反义", "พวกพ้อง 常有偏袒自己人的负面色彩。", "faction"],
  ["ลำดับอาวุโส", "lam-dap-aa-wu-soo", "lam-dap aa-wu-soo", "资历/辈分顺序", "名词", "长幼称谓", 28, "จัดที่นั่งตามลำดับอาวุโสในพิธีทำบุญบริษัท", "jat thii-nang dtaam lam-dap aa-wu-soo nai phi-thii tham-bun baaw-ri-sat", "在公司做功德仪式中按长幼资历安排座位", "ลำดับตำแหน่ง", "lam-dap-dtam-naeng", "职位顺序", "易混", "อาวุโส 看年龄资历辈分；ตำแหน่ง 看组织职位。", "seniority"],
  ["นอบน้อม", "naawp-naawm", "naawp naawm", "谦恭；恭敬有礼", "形容词", "长幼称谓", 29, "รุ่นลูกควรนอบน้อมเมื่อเสนอความเห็นต่างต่อผู้ก่อตั้ง", "run luuk khuan naawp naawm muea sa-noe khwaam-hen dtaang dtaaw phuu gaaw-dtang", "子女一代向创始人提出不同意见时应保持谦恭", "ก้าวร้าว", "gaao-raao", "咄咄逼人", "反义", "นอบน้อม 不等于没有主见，而是表达方式有分寸。", "manner"],
  ["บารมี", "baa-ra-mii", "baa ra mii", "威望；德望；影响力", "名词", "长幼称谓", 30, "บารมีของผู้ก่อตั้งช่วยให้คู่ค้าเก่ายังไว้วางใจบริษัท", "baa ra mii khaawng phuu gaaw-dtang chuai hai khuu-khaa gao yang wai-waang-jai baaw-ri-sat", "创始人的威望让老合作方仍信任公司", "อำนาจตามตำแหน่ง", "am-naat-dtaam-dtam-naeng", "职位权力", "易混", "บารมี 来自积累的威信，不一定来自正式职位。", "authority"],
  ["ผู้ก่อตั้ง", "phuu-gaaw-dtang", "phuu gaaw dtang", "创始人", "名词", "家族企业", 31, "ผู้ก่อตั้งยังมีบทบาทเชิงสัญลักษณ์แม้เกษียณแล้ว", "phuu gaaw-dtang yang mii bot-baat choeng san-ya-lak maae ga-sian laaeo", "创始人即使退休后仍有象征性角色", "ผู้สืบทอด", "phuu-seup-thaawt", "继承者", "反义", "创始人的象征权威常影响接班沟通。", "succession"],
  ["ผู้สืบทอด", "phuu-seup-thaawt", "phuu seup thaawt", "继承者；接班人", "名词", "家族企业", 32, "ผู้สืบทอดต้องสร้างความเชื่อมั่นทั้งกับครอบครัวและพนักงาน", "phuu seup thaawt dtawng saang khwaam cheuua-man thang gap khraawp-khrua lae pha-nak-ngaan", "继承者必须同时在家族和员工中建立信任", "ผู้ก่อตั้ง", "phuu-gaaw-dtang", "创始人", "反义", "接班不只是职位转移，也包括信任转移。", "succession"],
  ["การส่งต่อกิจการ", "gaan-song-dtaaw-git-ja-gaan", "gaan song dtaaw git-ja-gaan", "企业传承；交接家业", "名词", "家族企业", 33, "การส่งต่อกิจการควรวางแผนล่วงหน้า ไม่ใช่รอให้เกิดวิกฤต", "gaan song dtaaw git-ja-gaan khuan waang-phaaen luang-naa, mai chai raaw hai goet wi-grit", "企业传承应提前规划，而不是等危机发生", "การขายกิจการ", "gaan-khaai-git-ja-gaan", "出售企业", "易混", "ส่งต่อกิจการ 强调继承与延续；ขายกิจการ 是所有权出售。", "succession"],
  ["ทายาทธุรกิจ", "thaa-yaat-thu-ra-git", "thaa yaat thu-ra-git", "商业继承人；企业接班后代", "名词", "家族企业", 34, "ทายาทธุรกิจควรเรียนรู้จากหน้างานก่อนขึ้นบริหาร", "thaa-yaat thu-ra-git khuan riian-ruu jaak naa-ngaan gaawn kheun baaw-ri-haan", "企业继承人应先从一线学习，再进入管理层", "ผู้บริหารรับจ้าง", "phuu-baaw-ri-haan-rap-jaang", "职业经理人", "反义", "ทายาทธุรกิจ 带血缘或家族继承意味。", "succession"],
  ["ธรรมนูญครอบครัว", "tham-ma-nuun-khraawp-khrua", "tham-ma-nuun khraawp khrua", "家族宪章；家族治理规则", "名词", "家族企业", 35, "ธรรมนูญครอบครัวช่วยกำหนดบทบาทของญาติที่ทำงานในบริษัท", "tham-ma-nuun khraawp khrua chuai gam-not bot-baat khaawng yaat thii tham-ngaan nai baaw-ri-sat", "家族宪章有助于规定在公司工作的亲属角色", "ข้อตกลงปากเปล่า", "khaaw-dtok-long-bpaak-bplaao", "口头约定", "反义", "用于把人情惯例转化为可参照的规则。", "governance"],
  ["สภาครอบครัว", "sa-phaa-khraawp-khrua", "sa-phaa khraawp khrua", "家族会议/家族委员会", "名词", "家族企业", 36, "สภาครอบครัวประชุมเรื่องเงินปันผลก่อนแจ้งผู้ถือหุ้น", "sa-phaa khraawp khrua bpra-chum rueang ngoen bpan-phon gaawn jaaeng phuu-theu-hun", "家族委员会先讨论分红，再通知股东", "คณะกรรมการบริษัท", "kha-na-gam-ma-gaan-baaw-ri-sat", "公司董事会", "易混", "สภาครอบครัว 处理家族共识；董事会处理公司治理。", "governance"],
  ["กงสี", "gong-sii", "gong sii", "家族共有资产/共同账房；华人家庭语境中的公账", "名词", "家族企业", 37, "รายได้จากร้านเก่าถูกนำเข้ากงสีเพื่อใช้ดูแลญาติผู้ใหญ่", "raai-dai jaak raan gao thuuk nam khao gong sii phuea chai duu-laae yaat phuu-yai", "老店收入进入家族公账，用来照顾长辈亲戚", "บัญชีส่วนตัว", "ban-chii-suan-dtua", "个人账户", "反义", "กงสี 带华人家族企业色彩，涉及共有与分配。", "governance"],
  ["แบ่งกงสี", "baeng-gong-sii", "baeng gong sii", "分家产/分公账资产", "动词", "家族企业", 38, "การแบ่งกงสีต้องคุยให้ชัดเพื่อไม่ให้พี่น้องผิดใจกัน", "gaan baeng gong sii dtawng khui hai chat phuea mai hai phii-naawng phit-jai gan", "分家族公账资产必须谈清楚，以免兄弟姐妹心里有结", "รวมกงสี", "ruam-gong-sii", "合并家族公账", "反义", "是高度敏感话题，常牵涉财产、公平和情感。", "governance"],
  ["เงินปันผลในครอบครัว", "ngoen-bpan-phon-nai-khraawp-khrua", "ngoen bpan phon nai khraawp khrua", "家族内分红", "名词", "家族企业", 39, "เงินปันผลในครอบครัวควรมีหลักเกณฑ์ ไม่ใช่ตามความพอใจของผู้ใหญ่", "ngoen bpan phon nai khraawp khrua khuan mii lak-geen, mai chai dtaam khwaam phaaw-jai khaawng phuu-yai", "家族内分红应有标准，而不是按长辈个人喜好", "เงินเดือนพนักงาน", "ngoen-deuuan-pha-nak-ngaan", "员工工资", "易混", "分红基于所有权或约定；工资基于工作岗位。", "finance"],
  ["บทบาทซ้อน", "bot-baat-saawn", "bot baat saawn", "角色重叠；身份交叉", "名词", "微妙关系", 40, "บทบาทซ้อนระหว่างพี่ชายกับหัวหน้าทำให้การตักเตือนยากขึ้น", "bot-baat saawn ra-waang phii-chaai gap hua-naa tham-hai gaan dtak-dteuan yaak kheun", "哥哥与主管的角色重叠让提醒工作问题变得更难", "บทบาทแยกชัด", "bot-baat-yaaek-chat", "角色清晰分开", "反义", "家族企业常见问题：亲属身份和职位身份交叠。", "role"],
  ["แยกเรื่องงานกับเรื่องบ้าน", "yaaek-rueang-ngaan-gap-rueang-baan", "yaaek rueang ngaan gap rueang baan", "区分工作与家事", "短语", "委婉管理", 41, "เราต้องแยกเรื่องงานกับเรื่องบ้านเพื่อให้การประเมินยุติธรรม", "rao dtawng yaaek rueang ngaan gap rueang baan phuea hai gaan bpra-moen yut-ti-tham", "我们必须区分工作与家事，以使考核公平", "เอาเรื่องบ้านมาปนงาน", "ao-rueang-baan-maa-bpon-ngaan", "把家事混入工作", "反义", "说起来简单，实际执行需要制度和话术。", "role"],
  ["ขอบเขตบทบาท", "khaawp-kheet-bot-baat", "khaawp kheet bot baat", "角色边界；职责边界", "名词", "委婉管理", 42, "กำหนดขอบเขตบทบาทของญาติแต่ละคนให้เป็นลายลักษณ์อักษร", "gam-not khaawp kheet bot-baat khaawng yaat dtaae-la khon hai bpen laai-lak-ak-sawn", "以书面形式规定每位亲属的角色边界", "บทบาทคลุมเครือ", "bot-baat-khlum-khreuua", "角色模糊", "反义", "清晰边界可减少亲属之间的误会。", "management"],
  ["พูดอ้อม", "phuut-aawm", "phuut aawm", "绕着说；委婉表达", "动词", "委婉管理", 43, "บางครั้งต้องพูดอ้อมเพื่อให้ผู้ใหญ่รับฟังได้โดยไม่เสียหน้า", "baang khrang dtawng phuut aawm phuea hai phuu-yai rap fang dai dooi mai siia naa", "有时必须委婉表达，让长辈能听进去且不失面子", "พูดตรง", "phuut-dtrong", "直说", "反义", "C2 语用要判断何时该绕、何时必须直。", "communication"],
  ["พูดตรงแต่ไม่แรง", "phuut-dtrong-dtaae-mai-raaeng", "phuut dtrong dtaae mai raaeng", "直说但不刺耳", "短语", "委婉管理", 44, "ผู้จัดการควรพูดตรงแต่ไม่แรงเมื่อต้องแก้ปัญหาญาติทำงานช้า", "phuu-jat-gaan khuan phuut dtrong dtaae mai raaeng muea dtawng gaae bpan-haa yaat tham-ngaan chaa", "经理在处理亲属工作慢的问题时，应直说但不刺耳", "พูดแรงใส่", "phuut-raaeng-sai", "用强硬语气冲人说", "反义", "目标是清楚而不伤人。", "communication"],
  ["ตักเตือนเป็นการส่วนตัว", "dtak-dteuan-bpen-gaan-suan-dtua", "dtak dteuan bpen gaan suan dtua", "私下提醒；私下告诫", "短语", "委婉管理", 45, "ตักเตือนเป็นการส่วนตัวดีกว่าพูดกลางวงญาติ", "dtak dteuan bpen gaan suan dtua dii gwaa phuut glaang wong yaat", "私下提醒比在亲戚圈中公开说更好", "ตำหนิต่อหน้า", "dtam-ni-dtaaw-naa", "当面公开批评", "反义", "保护面子，也让对方更容易修正。", "management"],
  ["ขอคุยนอกรอบ", "khaaw-khui-naawk-raawp", "khaaw khui naawk raawp", "请求会外沟通；私下谈", "短语", "委婉管理", 46, "ถ้าประเด็นกระทบญาติหลายฝ่าย ควรขอคุยนอกรอบก่อน", "thaa bpra-den gra-thop yaat laai faai, khuan khaaw khui naawk raawp gaawn", "如果议题影响多方亲戚，应先请求会外沟通", "คุยกลางที่ประชุม", "khui-glaang-thii-bpra-chum", "在会议中公开谈", "反义", "适合处理不宜公开爆开的关系问题。", "management"],
  ["คุยให้จบในบ้าน", "khui-hai-jop-nai-baan", "khui hai jop nai baan", "在家族内部谈妥；内部解决", "短语", "微妙关系", 47, "ผู้ใหญ่ขอให้คุยให้จบในบ้านก่อนนำเรื่องเข้าบอร์ด", "phuu-yai khaaw hai khui hai jop nai baan gaawn nam rueang khao baawt", "长辈要求先在家族内部谈妥，再提交董事会", "เปิดเผยต่อคนนอก", "bpoet-pheeuy-dtaaw-khon-naawk", "向外人公开", "反义", "体现“家丑/家事先内部处理”的语用逻辑。", "private"],
  ["ไม่ให้เรื่องบานปลาย", "mai-hai-rueang-baan-bplaai", "mai hai rueang baan bplaai", "不让事情扩大；避免事态升级", "短语", "微妙关系", 48, "ควรรีบไกล่เกลี่ยไม่ให้เรื่องบานปลายเป็นความขัดแย้งรุ่นต่อรุ่น", "khuan riip glai-gliia mai hai rueang baan-bplaai bpen khwaam khat-yaaeng run dtaaw run", "应尽快调解，避免事情扩大成代际冲突", "ปล่อยให้ลุกลาม", "bplaawy-hai-luk-laam", "放任蔓延", "反义", "用于提醒及时降温。", "conflict"],
  ["ไกล่เกลี่ย", "glai-gliia", "glai gliia", "调解；斡旋", "动词", "微妙关系", 49, "ญาติผู้ใหญ่ช่วยไกล่เกลี่ยข้อขัดแย้งระหว่างพี่น้อง", "yaat phuu-yai chuai glai-gliia khaaw khat-yaaeng ra-waang phii-naawng", "长辈亲戚帮助调解兄弟姐妹之间的冲突", "ตัดสินเข้าข้าง", "dtat-sin-khao-khaang", "偏向一方裁断", "反义", "调解者应让各方保留面子，而不是简单判输赢。", "conflict"],
  ["ประนีประนอม", "bpra-nii-bpra-naawm", "bpra nii bpra naawm", "妥协；折中", "动词", "微妙关系", 50, "การประนีประนอมช่วยให้พี่น้องยังร่วมงานกันได้", "gaan bpra-nii-bpra-naawm chuai hai phii-naawng yang ruam ngaan gan dai", "妥协有助于兄弟姐妹仍能一起工作", "เอาชนะให้ได้", "ao-cha-na-hai-dai", "非要赢", "反义", "强调关系继续，而非单方获胜。", "conflict"],
  ["ลงเอยด้วยดี", "long-oei-duai-dii", "long oei duai dii", "圆满收场；有好结果", "短语", "微妙关系", 51, "ทุกฝ่ายยอมถอยคนละก้าวจนเรื่องลงเอยด้วยดี", "thuk faai yaawm thaawy khon la gaao jon rueang long oei duai dii", "各方各退一步，事情最终圆满收场", "จบไม่สวย", "jop-mai-suai", "收场难看", "反义", "常用于关系冲突后的善后描述。", "conflict"],
  ["ผิดใจกัน", "phit-jai-gan", "phit jai gan", "心里有结；关系闹僵", "短语", "微妙关系", 52, "เรื่องเงินปันผลทำให้พี่น้องผิดใจกันมาหลายปี", "rueang ngoen bpan-phon tham-hai phii-naawng phit jai gan maa laai bpii", "分红问题让兄弟姐妹多年来心里有结", "เข้าใจกันดี", "khao-jai-gan-dii", "彼此理解", "反义", "不是一般吵架，而是关系上产生芥蒂。", "conflict"],
  ["เก็บไว้ในใจ", "gep-wai-nai-jai", "gep wai nai jai", "憋在心里；藏着不说", "短语", "微妙关系", 53, "ถ้าญาติหลายคนเก็บไว้ในใจ ปัญหาเล็กอาจกลายเป็นเรื่องใหญ่", "thaa yaat laai khon gep wai nai jai, bpan-haa lek aat glaai bpen rueang yai", "如果许多亲戚都憋在心里，小问题可能变成大事", "พูดออกมาอย่างเหมาะสม", "phuut-aawk-maa-yaang-maw-som", "适当地说出来", "反义", "家族企业中沉默不等于没有问题。", "conflict"],
  ["เปิดอกคุย", "bpoet-ok-khui", "bpoet ok khui", "敞开心谈；坦诚沟通", "动词", "微妙关系", 54, "พี่น้องควรเปิดอกคุยก่อนตัดสินใจแบ่งกงสี", "phii-naawng khuan bpoet ok khui gaawn dtat-sin-jai baeng gong sii", "兄弟姐妹在决定分家产前应敞开心谈", "พูดครึ่ง ๆ กลาง ๆ", "phuut-khreung-khreung-glaang-glaang", "话说一半", "反义", "语气亲密，适合内部关系修复。", "conflict"],
  ["รับฟังผู้ใหญ่", "rap-fang-phuu-yai", "rap fang phuu yai", "听取长辈意见", "动词", "长幼称谓", 55, "รับฟังผู้ใหญ่ก่อน แต่ไม่จำเป็นต้องทำตามทุกเรื่อง", "rap fang phuu-yai gaawn dtaae mai jam-bpen dtawng tham dtaam thuk rueang", "先听取长辈意见，但不必每件事都照做", "เมินผู้ใหญ่", "moen-phuu-yai", "无视长辈", "反义", "关键在“听取”和“执行”之间保持分寸。", "seniority"],
  ["ขอคำชี้แนะ", "khaaw-kham-chii-nae", "khaaw kham chii nae", "请教指点；请求指导", "短语", "长幼称谓", 56, "รุ่นลูกขอคำชี้แนะจากคุณอาก่อนปรับโครงสร้างทีม", "run luuk khaaw kham chii nae jaak khun-aa gaawn bprap khroohng-saang thiim", "子女一代在调整团队结构前向叔伯/姑姨请教指点", "สั่งให้เห็นด้วย", "sang-hai-hen-duai", "命令对方同意", "反义", "比ขอคำแนะนำ更恭敬，适合对长辈。", "seniority"],
  ["กราบเรียน", "graap-riian", "graap riian", "敬告；恭敬地书面陈述", "动词", "长幼称谓", 57, "ในจดหมายถึงประธานอาวุโส ควรใช้คำว่า กราบเรียน ให้เหมาะสม", "nai jot-maai theung bpra-thaan aa-wu-soo, khuan chai kham waa graap riian hai maw-som", "写给资深董事长的信中，应恰当使用“敬告”", "เรียน", "riian", "致；告知", "易混", "กราบเรียน 敬意更高，不宜乱用给平级对象。", "register"],
  ["เรียนให้ทราบ", "riian-hai-saap", "riian hai saap", "谨告知；敬请知悉", "短语", "委婉管理", 58, "ฝ่ายเลขานุการเรียนให้ทราบว่ากำหนดประชุมถูกเลื่อน", "faai lee-khaa-nu-gaan riian hai saap waa gam-not bpra-chum thuuk leuuan", "秘书处谨告知会议时间已被推迟", "บอกเฉย ๆ", "baawk-choei-choei", "随口告知", "易混", "เรียนให้ทราบ 较正式，适合对长辈或高层。", "register"],
  ["ขออนุญาตเรียน", "khaaw-a-nu-yaat-riian", "khaaw a-nu-yaat riian", "请允许敬告/说明", "短语", "委婉管理", 59, "ขออนุญาตเรียนว่าตัวเลขชุดนี้ยังไม่ผ่านการตรวจสอบ", "khaaw a-nu-yaat riian waa dtua-leek chut nii yang mai phaan gaan dtruat-saawp", "请允许说明，这组数字尚未通过核查", "พูดแทรกทันที", "phuut-saaek-than-thii", "立刻插话", "反义", "正式场合用来缓冲不同意见或坏消息。", "register"],
  ["ถ้อยคำประนีประนอม", "thaawy-kham-bpra-nii-bpra-naawm", "thaawy kham bpra nii bpra naawm", "折中缓和的措辞", "名词", "委婉管理", 60, "เลือกถ้อยคำประนีประนอมเมื่อสื่อสารเรื่องลดบทบาทญาติ", "leuuak thaawy-kham bpra-nii-bpra-naawm muea seuu-saan rueang lot bot-baat yaat", "沟通削减亲属角色时选择折中缓和的措辞", "ถ้อยคำแข็งกร้าว", "thaawy-kham-khaeng-graao", "强硬措辞", "反义", "措辞本身可决定对方是否愿意听。", "communication"],
  ["ลดบทบาท", "lot-bot-baat", "lot bot baat", "减少角色；降低参与度", "动词", "委婉管理", 61, "การลดบทบาทญาติควรทำอย่างค่อยเป็นค่อยไป", "gaan lot bot-baat yaat khuan tham yaang khaawy bpen khaawy bpai", "减少亲属角色应循序渐进地进行", "เพิ่มอำนาจ", "phoem-am-naat", "增加权力", "反义", "比ปลดออก更柔和，适合敏感调整。", "management"],
  ["ถอยออกจากงานประจำ", "thaawy-aawk-jaak-ngaan-bpra-jam", "thaawy aawk jaak ngaan bpra jam", "退出日常经营", "短语", "委婉管理", 62, "คุณพ่อถอยออกจากงานประจำแต่ยังเป็นที่ปรึกษาให้บริษัท", "khun-phaaw thaawy aawk jaak ngaan bpra-jam dtaae yang bpen thii bpreuk-saa hai baaw-ri-sat", "父亲退出日常经营，但仍担任公司顾问", "คุมงานทุกวัน", "khum-ngaan-thuk-wan", "每天掌管事务", "反义", "比เกษียณ更柔和，保留长辈位置。", "succession"],
  ["ที่ปรึกษาอาวุโส", "thii-bpreuk-saa-aa-wu-soo", "thii bpreuk-saa aa-wu-soo", "资深顾问；长辈顾问", "名词", "家族企业", 63, "แต่งตั้งผู้ก่อตั้งเป็นที่ปรึกษาอาวุโสหลังส่งต่ออำนาจ", "dtaeng-dtang phuu gaaw-dtang bpen thii bpreuk-saa aa-wu-soo lang song dtaaw am-naat", "权力交接后任命创始人为资深顾问", "ผู้บริหารประจำ", "phuu-baaw-ri-haan-bpra-jam", "日常管理者", "反义", "可给长辈体面角色，同时让新团队执行。", "succession"],
  ["ส่งต่ออำนาจ", "song-dtaaw-am-naat", "song dtaaw am naat", "移交权力", "动词", "家族企业", 64, "การส่งต่ออำนาจต้องมีทั้งพิธีและระบบรองรับ", "gaan song dtaaw am-naat dtawng mii thang phi-thii lae ra-bop raawng-rap", "权力移交既需要仪式，也需要制度支撑", "รวบอำนาจไว้", "ruap-am-naat-wai", "把权力集中在手中", "反义", "在家族企业中，权力交接往往也有象征层面。", "succession"],
  ["ถือหุ้นแทน", "theu-hun-thaaen", "theu hun thaaen", "代持股份", "动词", "家族企业", 65, "การถือหุ้นแทนญาติควรมีเอกสารชัดเจนเพื่อป้องกันปัญหาอนาคต", "gaan theu hun thaaen yaat khuan mii eek-ga-saan chat-jen phuea bpaawng-gan bpan-haa a-naa-khot", "为亲属代持股份应有清晰文件，以防未来问题", "ถือหุ้นโดยตรง", "theu-hun-dooi-dtrong", "直接持股", "反义", "涉及法律风险，不能只靠口头信任。", "ownership"],
  ["กรรมสิทธิ์ร่วม", "gam-ma-sit-ruam", "gam-ma-sit ruam", "共同所有权", "名词", "家族企业", 66, "ที่ดินโรงงานเป็นกรรมสิทธิ์ร่วมของพี่น้องสามคน", "thii-din roong-ngaan bpen gam-ma-sit ruam khaawng phii-naawng saam khon", "工厂土地由三名兄弟姐妹共同拥有", "กรรมสิทธิ์เดี่ยว", "gam-ma-sit-diao", "单独所有权", "反义", "共同所有容易涉及决策权和收益分配问题。", "ownership"],
  ["ผลประโยชน์ทับซ้อน", "phon-bpra-yoot-thap-saawn", "phon bpra-yoot thap saawn", "利益冲突", "名词", "家族企业", 67, "การให้บริษัทญาติรับงานต้องตรวจผลประโยชน์ทับซ้อนให้ชัด", "gaan hai baaw-ri-sat yaat rap ngaan dtawng dtruat phon-bpra-yoot thap-saawn hai chat", "让亲戚公司承接项目时，必须清楚检查利益冲突", "ความเป็นกลาง", "khwaam-bpen-glaang", "中立性", "反义", "家族企业中常见，但必须制度化处理。", "governance"],
  ["ความเป็นธรรมต่อญาติ", "khwaam-bpen-tham-dtaaw-yaat", "khwaam bpen tham dtaaw yaat", "对亲属的公平", "名词", "家族企业", 68, "ความเป็นธรรมต่อญาติไม่ใช่การให้ทุกคนได้เท่ากันเสมอ", "khwaam bpen tham dtaaw yaat mai chai gaan hai thuk khon dai thao gan sa-moe", "对亲属公平并不总是给每个人完全一样", "การเอียงข้าง", "gaan-iiang-khaang", "偏向一方", "反义", "公平可能基于贡献、责任、所有权等不同标准。", "fairness"],
  ["แบ่งหน้าที่ตามความถนัด", "baeng-naa-thii-dtaam-khwaam-tha-nat", "baeng naa-thii dtaam khwaam tha-nat", "按专长分工", "短语", "家族企业", 69, "แบ่งหน้าที่ตามความถนัดช่วยลดการแย่งอำนาจระหว่างพี่น้อง", "baeng naa-thii dtaam khwaam tha-nat chuai lot gaan yaaeng am-naat ra-waang phii-naawng", "按专长分工有助于减少兄弟姐妹之间争权", "แบ่งตามอาวุโสอย่างเดียว", "baeng-dtaam-aa-wu-soo-yaang-diao", "只按资历分", "反义", "可把家族秩序转向能力秩序。", "management"],
  ["เกรงใจจนไม่กล้าตัดสินใจ", "greeng-jai-jon-mai-glaa-dtat-sin-jai", "greeng jai jon mai glaa dtat-sin-jai", "顾及到不敢决策", "短语", "微妙关系", 70, "ผู้จัดการเกรงใจจนไม่กล้าตัดสินใจเรื่องญาติที่ทำงานผิดพลาด", "phuu-jat-gaan greeng-jai jon mai glaa dtat-sin-jai rueang yaat thii tham-ngaan phit-phlaat", "经理顾及关系到不敢处理犯错的亲属", "ตัดสินใจบนหลักเกณฑ์", "dtat-sin-jai-bon-lak-geen", "按标准决策", "反义", "描述เกรงใจ的负面后果。", "pragmatics"],
  ["พูดให้ผู้ใหญ่สบายใจ", "phuut-hai-phuu-yai-sa-baai-jai", "phuut hai phuu-yai sa-baai-jai", "说得让长辈安心", "短语", "委婉管理", 71, "ก่อนเปลี่ยนระบบบัญชี ต้องพูดให้ผู้ใหญ่สบายใจว่าไม่ได้ลบคุณค่าของวิธีเดิม", "gaawn bpliian ra-bop ban-chii, dtawng phuut hai phuu-yai sa-baai-jai waa mai dai lop khun-khaa khaawng wi-thii doem", "更换会计系统前，必须说得让长辈安心：这不是否定旧方法的价值", "พูดให้ผู้ใหญ่กังวล", "phuut-hai-phuu-yai-gang-won", "说得让长辈担心", "反义", "关键是承认过去贡献，再说明新方法。", "communication"],
  ["ยกความดีให้ผู้ใหญ่", "yok-khwaam-dii-hai-phuu-yai", "yok khwaam dii hai phuu-yai", "把功劳归给长辈；给长辈荣耀", "短语", "人情往来", 72, "รุ่นลูกยกความดีให้ผู้ใหญ่ก่อนพูดถึงแผนขยายธุรกิจ", "run luuk yok khwaam dii hai phuu-yai gaawn phuut theung phaaen kha-yaai thu-ra-git", "子女一代先把功劳归给长辈，再谈扩张计划", "แย่งความดี", "yaaeng-khwaam-dii", "抢功", "反义", "既是礼貌，也是降低代际阻力的策略。", "face"],
  ["ไม่ลบหลู่ของเดิม", "mai-lop-luu-khaawng-doem", "mai lop luu khaawng doem", "不贬低旧做法；不冒犯传统", "短语", "委婉管理", 73, "การนำระบบใหม่ต้องอธิบายว่าไม่ลบหลู่ของเดิม", "gaan nam ra-bop mai dtawng a-thi-baai waa mai lop luu khaawng doem", "引入新系统时必须说明这不是贬低旧做法", "ดูถูกของเดิม", "duu-thuuk-khaawng-doem", "看不起旧做法", "反义", "适合处理创新与传统之间的敏感关系。", "tradition"],
  ["ถือฤกษ์", "theu-roek", "theu roek", "看重吉时；按吉日吉时办事", "动词", "仪式祝辞", 74, "ครอบครัวนี้ถือฤกษ์ก่อนเปิดโกดังใหม่", "khraawp-khrua nii theu roek gaawn bpoet goo-dang mai", "这个家族在新仓库开业前看重吉时", "ไม่ถือฤกษ์", "mai-theu-roek", "不讲究吉时", "反义", "在商务仪式中可能影响开业、签约、搬迁时间。", "ritual"],
  ["ฤกษ์งามยามดี", "roek-ngaam-yaam-dii", "roek ngaam yaam dii", "良辰吉时", "名词", "仪式祝辞", 75, "ขอให้การเปิดสาขาใหม่ในฤกษ์งามยามดีนี้ราบรื่น", "khaaw hai gaan bpoet saa-khaa mai nai roek ngaam yaam dii nii raap-reuun", "愿新分店在这良辰吉时开业一切顺利", "เวลาธรรมดา", "wee-laa-tham-ma-daa", "普通时间", "反义", "常见于祝辞和仪式主持语。", "ritual"],
  ["เป็นสิริมงคล", "bpen-si-ri-mong-khon", "bpen si-ri-mong-khon", "吉祥；带来好兆头", "形容词", "仪式祝辞", 76, "การเชิญพระมาสวดถือว่าเป็นสิริมงคลแก่กิจการ", "gaan choen phra maa suat theu waa bpen si-ri-mong-khon gaae git-ja-gaan", "邀请僧人诵经被认为能为事业带来吉祥", "อัปมงคล", "ap-bpa-mong-khon", "不吉利", "反义", "仪式语中常用，语气庄重。", "ritual"],
  ["ทำบุญบริษัท", "tham-bun-baaw-ri-sat", "tham bun baaw-ri-sat", "公司做功德仪式；为公司祈福", "动词", "仪式祝辞", 77, "ทุกปีครอบครัวจะทำบุญบริษัทเพื่อขอบคุณพนักงานและคู่ค้า", "thuk bpii khraawp-khrua ja tham bun baaw-ri-sat phuea khaawp-khun pha-nak-ngaan lae khuu-khaa", "每年家族都会为公司做功德仪式，以感谢员工和合作方", "ประชุมผู้ถือหุ้น", "bpra-chum-phuu-theu-hun", "股东会", "易混", "ทำบุญบริษัท 是宗教/文化仪式，不是治理会议。", "ritual"],
  ["กล่าวอวยพร", "glaao-uai-phaawn", "glaao uai phaawn", "致祝辞；说祝福话", "动词", "仪式祝辞", 78, "ญาติผู้ใหญ่กล่าวอวยพรให้กิจการเจริญรุ่งเรือง", "yaat phuu-yai glaao uai phaawn hai git-ja-gaan ja-roen rung-reuuang", "长辈亲戚致祝辞，祝事业兴旺", "กล่าวตำหนิ", "glaao-dtam-ni", "致责备之词", "反义", "仪式场合常由高辈分或有威望者说。", "ritual"],
  ["เจริญรุ่งเรือง", "ja-roen-rung-reuuang", "ja-roen rung-reuuang", "兴旺发达；繁荣昌盛", "形容词", "仪式祝辞", 79, "ขอให้ธุรกิจครอบครัวเจริญรุ่งเรืองและอยู่คู่ชุมชนไปนาน ๆ", "khaaw hai thu-ra-git khraawp-khrua ja-roen rung-reuuang lae yuu khuu chum-chon bpai naan naan", "愿家族企业兴旺发达，并长久伴随社区", "ซบเซา", "sop-sao", "萧条低迷", "反义", "祝辞中常用，语气正式而吉祥。", "blessing"],
  ["ค้าขายร่ำรวย", "khaa-khaai-ram-ruai", "khaa khaai ram ruai", "生意兴隆、财源丰厚", "短语", "仪式祝辞", 80, "ผู้ใหญ่อวยพรให้ลูกหลานค้าขายร่ำรวยแต่ไม่ลืมคุณธรรม", "phuu-yai uai-phaawn hai luuk-laan khaa khaai ram ruai dtaae mai leum khun-na-tham", "长辈祝晚辈生意兴隆，但不忘道德", "ค้าขายขาดทุน", "khaa-khaai-khaat-thun", "做生意亏损", "反义", "口语祝辞常见，适合开店、开业、周年。", "blessing"],
  ["ราบรื่น", "raap-reuun", "raap reuun", "顺利；平稳无阻", "形容词", "仪式祝辞", 81, "ขอให้การส่งต่อกิจการราบรื่นและทุกฝ่ายเข้าใจกัน", "khaaw hai gaan song dtaaw git-ja-gaan raap-reuun lae thuk faai khao-jai gan", "愿企业传承顺利，各方彼此理解", "ติดขัด", "dtit-khat", "卡住；不顺", "反义", "既可用于祝辞，也可用于管理流程。", "blessing"],
  ["มีแต่สิ่งดี ๆ", "mii-dtaae-sing-dii-dii", "mii dtaae sing dii dii", "满是好事；一切顺遂", "短语", "仪式祝辞", 82, "ขอให้ปีนี้มีแต่สิ่งดี ๆ เข้ามาในกิจการและครอบครัว", "khaaw hai bpii nii mii dtaae sing dii dii khao maa nai git-ja-gaan lae khraawp-khrua", "愿今年公司和家族都迎来好事", "มีอุปสรรคมาก", "mii-up-bpa-sak-maak", "有很多障碍", "反义", "温和口语祝福，适合不太正式的场合。", "blessing"],
  ["ขอขมา", "khaaw-kha-maa", "khaaw kha maa", "请求原谅；向长辈/尊者致歉", "动词", "仪式祝辞", 83, "ก่อนปีใหม่ ลูกหลานไปขอขมาผู้ใหญ่ที่เคยล่วงเกินโดยไม่ตั้งใจ", "gaawn bpii mai, luuk-laan bpai khaaw kha-maa phuu-yai thii khoei luang-goen dooi mai dtang-jai", "新年前，晚辈去向曾无意冒犯的长辈请求原谅", "ขอบคุณ", "khaawp-khun", "感谢", "易混", "ขอขมา 比ขอโทษ更具仪式性和敬意。", "ritual"],
  ["รดน้ำดำหัว", "rot-naam-dam-hua", "rot naam dam hua", "泼水敬老仪式；宋干节向长辈致敬", "动词", "仪式祝辞", 84, "บริษัทจัดรดน้ำดำหัวผู้ก่อตั้งเพื่อให้พนักงานรุ่นใหม่รู้จักธรรมเนียม", "baaw-ri-sat jat rot naam dam hua phuu gaaw-dtang phuea hai pha-nak-ngaan run mai ruu-jak tham-niiam", "公司安排向创始人行泼水敬老礼，让年轻员工了解传统", "ประชุมงานทั่วไป", "bpra-chum-ngaan-thua-bpai", "普通工作会议", "易混", "这是文化仪式，不是普通问候。", "ritual"],
  ["ธรรมเนียมบ้านเรา", "tham-niiam-baan-rao", "tham-niiam baan rao", "我们家的惯例；家族传统做法", "名词", "仪式祝辞", 85, "ก่อนเปลี่ยนขั้นตอน ควรเข้าใจธรรมเนียมบ้านเราว่ามาจากเหตุผลอะไร", "gaawn bpliian khan-dtaawn, khuan khao-jai tham-niiam baan rao waa maa jaak het-phon a-rai", "改变流程前，应理解我们家的惯例来自什么原因", "กฎบริษัทใหม่", "got-baaw-ri-sat-mai", "新的公司规则", "易混", "ธรรมเนียมบ้านเรา 是习惯传统，未必写成制度。", "tradition"],
  ["คำพูดรักษาหน้า", "kham-phuut-rak-saa-naa", "kham phuut rak-saa naa", "保全面子的说法", "名词", "微妙关系", 86, "คำพูดรักษาหน้าช่วยให้ผู้ใหญ่ยอมรับการเปลี่ยนแปลงได้ง่ายขึ้น", "kham phuut rak-saa naa chuai hai phuu-yai yaawm rap gaan bpliian-bplaaeng dai ngaai kheun", "保全面子的说法有助于长辈更容易接受改变", "คำพูดหักหน้า", "kham-phuut-hak-naa", "拆台的话", "反义", "C2 语用重点在措辞效果，而不是字面意思。", "pragmatics"],
  ["คำพูดกลาง ๆ", "kham-phuut-glaang-glaang", "kham phuut glaang glaang", "中性说法；不偏不刺的表达", "名词", "委婉管理", 87, "ใช้คำพูดกลาง ๆ เมื่อต้องแจ้งผลประเมินของญาติ", "chai kham phuut glaang glaang muea dtawng jaaeng phon bpra-moen khaawng yaat", "需要告知亲属考核结果时使用中性说法", "คำพูดเข้าข้าง", "kham-phuut-khao-khaang", "偏袒一方的话", "反义", "适合避免被听成偏袒或攻击。", "communication"],
  ["ฝากคำพูดผ่านคนกลาง", "faak-kham-phuut-phaan-khon-glaang", "faak kham phuut phaan khon glaang", "通过中间人传话", "短语", "微妙关系", 88, "บางเรื่องควรฝากคำพูดผ่านคนกลางที่ทั้งสองฝ่ายไว้ใจ", "baang rueang khuan faak kham phuut phaan khon glaang thii thang saawng faai wai-jai", "有些事应通过双方都信任的中间人传话", "พูดตรงต่อหน้า", "phuut-dtrong-dtaaw-naa", "当面直说", "反义", "适合关系紧张或长幼差距大时，但也可能造成信息失真。", "mediation"],
  ["คนกลางที่ไว้ใจได้", "khon-glaang-thii-wai-jai-dai", "khon glaang thii wai jai dai", "可信的中间人", "名词", "微妙关系", 89, "คนกลางที่ไว้ใจได้ช่วยให้พี่น้องคุยเรื่องหุ้นโดยไม่ทะเลาะกัน", "khon glaang thii wai jai dai chuai hai phii-naawng khui rueang hun dooi mai tha-law gan", "可信中间人帮助兄弟姐妹谈股份问题而不争吵", "คนข้างใดข้างหนึ่ง", "khon-khaang-dai-khaang-neung", "某一方的人", "反义", "中间人必须被双方接受，否则反而加剧不信任。", "mediation"],
  ["รักษาสมดุลในครอบครัว", "rak-saa-som-dun-nai-khraawp-khrua", "rak-saa som-dun nai khraawp khrua", "维持家族内部平衡", "短语", "微妙关系", 90, "การแต่งตั้งตำแหน่งใหม่ต้องรักษาสมดุลในครอบครัวและไม่ทำให้ฝ่ายใดรู้สึกถูกลดความสำคัญ", "gaan dtaeng-dtang dtam-naeng mai dtawng rak-saa som-dun nai khraawp-khrua lae mai tham-hai faai dai ruu-seuk thuuk lot khwaam sam-khan", "任命新职位时必须维持家族内部平衡，不让任何一方觉得被降低重要性", "เอนเอียงไปฝ่ายเดียว", "een-iiang-bpai-faai-diao", "偏向一方", "反义", "家族企业决策常同时考虑能力、辈分、股权和情绪平衡。", "balance"],
] as const satisfies readonly Row[];

const relatedFor = (row: Row): VocabularyExpansionRelatedWord => ({ thai: row[10], roman: row[11], chinese: row[12] });
const comparisonFor = (row: Row): VocabularyExpansionComparison => ({
  kind: row[13],
  target: relatedFor(row),
  distinctionZh: `${row[0]} 和 ${row[10]} 在家族企业、人情往来或长幼关系中容易形成微妙对照；学习时要看它维护的是制度、面子、人情还是辈分秩序。`,
});
const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในบริบทของธุรกิจครอบครัว ผู้บริหารเลือกใช้ถ้อยคำว่า “${row[7]}” เพื่อรักษาหน้าผู้ใหญ่ ดูแลน้ำใจของญาติ และยังทำให้การตัดสินใจทางธุรกิจเดินต่อได้`,
  roman: `nai baaw-ri-bot khaawng thu-ra-git khraawp-khrua, phuu baaw-ri-haan leuuak chai thaawy-kham waa "${row[8]}" phuea rak-saa naa phuu-yai, duu-laae nam-jai khaawng yaat, lae yang tham-hai gaan dtat-sin-jai thaang thu-ra-git doen dtaaw dai`,
  chinese: `在家族企业语境中，管理者选择使用“${row[9]}”这种表达，以保全长辈面子、照顾亲属情分，同时让商业决策还能继续推进。`,
});
const synonymsFor = (row: Row): VocabularyExpansionRelatedWord[] => row[13] === "近义" ? [relatedFor(row)] : [];
const antonymsFor = (row: Row): VocabularyExpansionRelatedWord[] => row[13] === "反义" ? [relatedFor(row)] : [];

const toCandidate = (row: Row): VocabularyExpansionCandidate => {
  const synonyms = synonymsFor(row);
  const antonyms = antonymsFor(row);
  const comparisons = [comparisonFor(row)];
  const collocations = [{ thai: row[7], roman: row[8], chinese: row[9] }];
  const tags = ["c2", "family-business-pragmatics", row[15], row[5]];
  return {
    thai: row[0],
    id: row[1],
    roman: row[2],
    chinese: row[3],
    partOfSpeech: row[4],
    theme: row[5],
    level: "c2",
    priority: row[6],
    senses: [{ id: "main", chinese: row[3], examples: [exampleFor(row)], synonyms, antonyms, comparisons, collocations, usageNotesZh: [row[14]], tags }],
    synonyms,
    antonyms,
    comparisons,
    collocations,
    usageNotesZh: [row[14]],
    tags,
    sourceRefs: FAMILY_BUSINESS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_C2_FAMILY_BUSINESS_PRAGMATICS_01 = rows.map(toCandidate);
