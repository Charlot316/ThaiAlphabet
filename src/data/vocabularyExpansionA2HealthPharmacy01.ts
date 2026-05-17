export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "身体不适" | "症状" | "药店用药" | "基础就医" | "就医预约" | "过敏" | "休息请假";
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
  level: "a2";
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
type Row = readonly [
  thai: string,
  id: string,
  roman: string,
  chinese: string,
  partOfSpeech: VocabularyExpansionPartOfSpeech,
  theme: VocabularyExpansionTheme,
  priority: number,
  exampleThai: string,
  exampleRoman: string,
  exampleChinese: string,
  collocationThai: string,
  collocationRoman: string,
  collocationChinese: string,
  relatedThai: string,
  relatedRoman: string,
  relatedChinese: string,
  relationKind: RelationKind,
  usageNoteZh: string,
  tag: string,
];

const HEALTH_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thai-health-pharmacy-candidate"];

const rows = [
  ["ปวดหัว", "bpuat-hua", "bpuat hua", "头痛", "短语", "身体不适", 1, "วันนี้ฉันปวดหัวตั้งแต่เช้า จึงขอนั่งพักในห้องเงียบ ๆ ก่อนทำงานต่อ", "wan-nii chan bpuat hua dtang-dtaae chaao, jeung khaaw nang phak nai haawng ngiiap ngiiap gaawn tham-ngaan dtaaw", "我今天从早上开始头痛，所以想先在安静的房间休息一下再继续工作。", "ปวดหัวมาก", "bpuat hua maak", "头很痛", "เวียนหัว", "wiian hua", "头晕", "易混", "ปวดหัว 强调疼痛；เวียนหัว 强调眩晕、站不稳。", "symptom"],
  ["เวียนหัว", "wiian-hua", "wiian hua", "头晕；眩晕", "短语", "身体不适", 2, "หลังลุกขึ้นเร็วเกินไป เขาเวียนหัวจนต้องจับโต๊ะไว้สักพัก", "lang luk kheun reo goen bpai, khao wiian hua jon dtawng jap dto wai sak phak", "他起身太快后头晕，只好扶着桌子一会儿。", "เวียนหัวนิดหน่อย", "wiian hua nit naawy", "有点头晕", "ปวดหัว", "bpuat hua", "头痛", "易混", "เวียนหัว 不一定痛，常和คลื่นไส้、หน้ามืด一起出现。", "symptom"],
  ["คลื่นไส้", "khleuun-sai", "khleuun sai", "恶心；想吐", "形容词", "症状", 3, "พอกินยาเม็ดนี้แล้ว ฉันรู้สึกคลื่นไส้และไม่อยากกินอาหาร", "phaaw gin yaa met nii laaeo, chan ruu-seuk khleuun sai lae mai yaak gin aa-haan", "我吃了这片药以后觉得恶心，也不想吃东西。", "รู้สึกคลื่นไส้", "ruu-seuk khleuun sai", "觉得恶心", "อาเจียน", "aa-jiian", "呕吐", "易混", "คลื่นไส้ 是想吐的感觉；อาเจียน 是已经吐出来。", "symptom"],
  ["อาเจียน", "aa-jiian", "aa-jiian", "呕吐；吐", "动词", "症状", 4, "เด็กอาเจียนสองครั้งหลังอาหารเย็น แม่จึงพาไปพบแพทย์", "dek aa-jiian saawng khrang lang aa-haan yen, maae jeung phaa bpai phop phaaet", "孩子晚饭后吐了两次，所以妈妈带他去看医生。", "อาเจียนหลายครั้ง", "aa-jiian laai khrang", "吐了很多次", "คลื่นไส้", "khleuun sai", "恶心", "易混", "说症状时可说 อาเจียนกี่ครั้ง เพื่อ说明严重程度。", "symptom"],
  ["ท้องเสีย", "thaawng-siia", "thaawng siia", "腹泻；拉肚子", "短语", "症状", 5, "เขาท้องเสียตั้งแต่เมื่อคืน จึงดื่มน้ำเกลือแร่และกินอาหารอ่อน ๆ", "khao thaawng siia dtang-dtaae muea-kheun, jeung deum naam-gluea-raae lae gin aa-haan aawn aawn", "他从昨晚开始腹泻，所以喝电解质水并吃清淡食物。", "ท้องเสียหนัก", "thaawng siia nak", "腹泻严重", "ท้องผูก", "thaawng-phuuk", "便秘", "反义", "ท้องเสีย 是排便过稀过频；ท้องผูก 是排便困难。", "symptom"],
  ["ท้องผูก", "thaawng-phuuk", "thaawng phuuk", "便秘", "短语", "症状", 6, "ถ้าท้องผูกบ่อย ๆ ควรกินผัก ดื่มน้ำ และขยับร่างกายมากขึ้น", "thaa thaawng phuuk baawy baawy, khuan gin phak, deum naam, lae kha-yap raang-gaai maak kheun", "如果经常便秘，应该多吃蔬菜、喝水并增加身体活动。", "ท้องผูกหลายวัน", "thaawng phuuk laai wan", "便秘好几天", "ท้องเสีย", "thaawng-siia", "腹泻", "反义", "ท้องผูก 常搭配หลายวัน、บ่อย ๆ 描述持续时间和频率。", "symptom"],
  ["ไอ", "ai", "ai", "咳嗽", "动词", "症状", 7, "เขาไอตลอดคืนจนเพื่อนร่วมห้องนอนไม่ค่อยหลับ", "khao ai dta-laawt kheun jon pheuan-ruam-haawng naawn mai khaawy lap", "他整晚咳嗽，连室友都睡得不太好。", "ไอแห้ง", "ai haaeng", "干咳", "จาม", "jaam", "打喷嚏", "易混", "ไอ 是咳嗽；จาม 是打喷嚏，症状描述时不要混。", "symptom"],
  ["เจ็บคอ", "jep-khaaw", "jep khaaw", "喉咙痛", "短语", "症状", 8, "ฉันเจ็บคอหลังพูดมากทั้งวัน จึงดื่มน้ำอุ่นและพักเสียง", "chan jep khaaw lang phuut maak thang wan, jeung deum naam un lae phak siiang", "我说了一整天话后喉咙痛，所以喝温水并让嗓子休息。", "เจ็บคอเวลา กลืน", "jep khaaw wee-laa gleuun", "吞咽时喉咙痛", "คอแห้ง", "khaaw haaeng", "喉咙干", "易混", "เจ็บคอ 有疼痛；คอแห้ง 主要是干燥感。", "symptom"],
  ["น้ำมูกไหล", "naam-muuk-lai", "naam muuk lai", "流鼻涕", "短语", "症状", 9, "ลูกน้ำมูกไหลทั้งวัน แม่จึงให้ใส่หน้ากากและพักอยู่บ้าน", "luuk naam muuk lai thang wan, maae jeung hai sai naa-gaak lae phak yuu baan", "孩子一整天流鼻涕，所以妈妈让他戴口罩并在家休息。", "น้ำมูกไหลมาก", "naam muuk lai maak", "流很多鼻涕", "คัดจมูก", "khat-ja-muuk", "鼻塞", "易混", "น้ำมูกไหล 是鼻涕流出来；คัดจมูก 是鼻子堵住。", "symptom"],
  ["คัดจมูก", "khat-ja-muuk", "khat ja-muuk", "鼻塞", "短语", "症状", 10, "ตอนกลางคืนฉันคัดจมูกมาก จึงนอนหลับไม่ค่อยสบาย", "dtaawn glaang-kheun chan khat ja-muuk maak, jeung naawn lap mai khaawy sa-baai", "晚上我鼻塞得厉害，所以睡得不太舒服。", "คัดจมูกข้างเดียว", "khat ja-muuk khaang diao", "一边鼻塞", "น้ำมูกไหล", "naam-muuk-lai", "流鼻涕", "易混", "คัดจมูก 可搭配ข้างเดียว、สองข้าง说明堵哪边。", "symptom"],
  ["มีไข้", "mii-khai", "mii khai", "发烧", "短语", "症状", 11, "ถ้ามีไข้เกินสองวัน ควรไปพบแพทย์แทนการซื้อยากินเอง", "thaa mii khai goen saawng wan, khuan bpai phop phaaet thaaen gaan sue yaa gin eeng", "如果发烧超过两天，应该去看医生，而不是自己买药吃。", "มีไข้สูง", "mii khai suung", "发高烧", "ตัวร้อน", "dtua-raawn", "身体发热", "近义", "มีไข้ 较明确表示发烧；ตัวร้อน 是摸起来热，可能需要วัดไข้确认。", "symptom"],
  ["ตัวร้อน", "dtua-raawn", "dtua raawn", "身体发热；身上烫", "形容词", "症状", 12, "แม่จับหน้าผากลูกแล้วรู้สึกว่าตัวร้อน จึงรีบวัดไข้", "maae jap naa-phaak luuk laaeo ruu-seuk waa dtua raawn, jeung riip wat khai", "妈妈摸了孩子的额头觉得身上烫，所以赶快量体温。", "ตัวร้อนมาก", "dtua raawn maak", "身体很烫", "มีไข้", "mii-khai", "发烧", "近义", "ตัวร้อน 是感觉描述；是否มีไข้通常要用温度计确认。", "symptom"],
  ["หนาวสั่น", "naao-san", "naao san", "发冷打颤；寒战", "短语", "症状", 13, "ตอนมีไข้สูง เขาหนาวสั่นทั้งที่ห่มผ้าหลายผืนแล้ว", "dtaawn mii khai suung, khao naao san thang-thii hom phaa laai pheun laaeo", "发高烧时，他即使盖了好几条被子仍然冷得发抖。", "หนาวสั่นตอนกลางคืน", "naao san dtaawn glaang-kheun", "夜里发冷打颤", "ตัวร้อน", "dtua-raawn", "身体发热", "易混", "发烧时可能同时ตัวร้อน和หนาวสั่น，一个是热，一个是发冷打颤。", "symptom"],
  ["ปวดท้อง", "bpuat-thaawng", "bpuat thaawng", "肚子痛；腹痛", "短语", "身体不适", 14, "หลังดื่มนมเย็นเร็วเกินไป เขาปวดท้องและต้องเข้าห้องน้ำ", "lang deum nom yen reo goen bpai, khao bpuat thaawng lae dtawng khao haawng-naam", "他太快喝完冰牛奶后肚子痛，还得去厕所。", "ปวดท้องบิด", "bpuat thaawng bit", "肚子绞痛", "ท้องเสีย", "thaawng-siia", "腹泻", "易混", "ปวดท้อง 是痛；ท้องเสีย 是拉肚子，两者可同时发生。", "symptom"],
  ["ปวดหลัง", "bpuat-lang", "bpuat lang", "背痛；腰背痛", "短语", "身体不适", 15, "นั่งทำงานนานเกินไปทำให้ฉันปวดหลัง จึงลุกมายืดเส้นทุกชั่วโมง", "nang tham-ngaan naan goen bpai tham-hai chan bpuat lang, jeung luk maa yeut sen thuk chua-moong", "坐着工作太久让我背痛，所以我每小时起来伸展一下。", "ปวดหลังส่วนล่าง", "bpuat lang suan laang", "下背痛", "ปวดกล้ามเนื้อ", "bpuat-glaam-neuua", "肌肉痛", "易混", "ปวดหลัง 指背部位置；ปวดกล้ามเนื้อ 指肌肉疼，位置可在全身。", "symptom"],
  ["ปวดฟัน", "bpuat-fan", "bpuat fan", "牙痛", "短语", "身体不适", 16, "ถ้าปวดฟันมากตอนกลางคืน ควรนัดหมอฟันให้เร็วที่สุด", "thaa bpuat fan maak dtaawn glaang-kheun, khuan nat maaw-fan hai reo thii-sut", "如果夜里牙痛得厉害，应该尽快预约牙医。", "ปวดฟันกราม", "bpuat fan graam", "臼齿痛", "เจ็บคอ", "jep-khaaw", "喉咙痛", "易混", "ปวดฟัน 是牙齿痛；เจ็บคอ 是喉咙痛，部位不同。", "symptom"],
  ["ปวดกล้ามเนื้อ", "bpuat-glaam-neuua", "bpuat glaam-neuua", "肌肉酸痛", "短语", "身体不适", 17, "หลังออกกำลังกายหนักเมื่อวาน วันนี้ฉันปวดกล้ามเนื้อทั้งขา", "lang aawk-gam-lang-gaai nak muea-waan, wan-nii chan bpuat glaam-neuua thang khaa", "昨天运动量太大后，我今天两条腿都肌肉酸痛。", "ปวดกล้ามเนื้อหลังออกกำลังกาย", "bpuat glaam-neuua lang aawk-gam-lang-gaai", "运动后肌肉酸痛", "ปวดข้อ", "bpuat-khaaw", "关节痛", "易混", "กล้ามเนื้อ 是肌肉；ข้อ 是关节，疼痛位置不同。", "symptom"],
  ["ปวดข้อ", "bpuat-khaaw", "bpuat khaaw", "关节痛", "短语", "身体不适", 18, "คุณตาปวดข้อเข่าเวลาเดินขึ้นบันได จึงเดินช้ากว่าปกติ", "khun-dtaa bpuat khaaw khao wee-laa doen kheun ban-dai, jeung doen chaa gwaa bpa-ga-dti", "爷爷上楼梯时膝关节痛，所以走得比平时慢。", "ปวดข้อเข่า", "bpuat khaaw khao", "膝关节痛", "ปวดกล้ามเนื้อ", "bpuat-glaam-neuua", "肌肉痛", "易混", "ข้อ 是关节，常说ข้อเข่า、ข้อเท้า、ข้อมือ。", "symptom"],
  ["ผื่นขึ้น", "pheun-kheun", "pheun kheun", "起疹子", "短语", "过敏", 19, "หลังลองครีมใหม่ เธอมีผื่นขึ้นที่แขนและหยุดใช้ทันที", "lang laawng khriim mai, thoe mii pheun kheun thii khaaen lae yut chai than-thii", "试了新的乳霜后，她手臂上起了疹子并立刻停止使用。", "ผื่นขึ้นตามตัว", "pheun kheun dtaam dtua", "身上起疹子", "คัน", "khan", "痒", "易混", "ผื่นขึ้น 是看得见的皮疹；คัน 是痒的感觉，可能同时出现。", "allergy"],
  ["คัน", "khan", "khan", "痒", "形容词", "过敏", 20, "อย่าเกาบริเวณที่คันมากเกินไป เพราะผิวอาจเป็นแผล", "yaa gao baaw-ri-ween thii khan maak goen bpai, phraw phiu aat bpen phlaae", "不要过度抓很痒的地方，因为皮肤可能会破。", "คันตา", "khan dtaa", "眼睛痒", "เจ็บ", "jep", "疼", "易混", "คัน 是痒；เจ็บ 是疼，询问症状时要分清。", "allergy"],
  ["บวม", "buam", "buam", "肿；肿胀", "形容词", "症状", 21, "ข้อเท้าบวมหลังหกล้ม แพทย์แนะนำให้ประคบเย็นก่อน", "khaaw-thaao buam lang hok-lom, phaaet nae-nam hai bpra-khop yen gaawn", "摔倒后脚踝肿了，医生建议先冷敷。", "หน้าบวม", "naa buam", "脸肿", "ยุบ", "yup", "消肿；塌下去", "反义", "บวม 表示肿起来；ยุบ 可表示肿胀退下去。", "symptom"],
  ["แผล", "phlaae", "phlaae", "伤口", "名词", "症状", 22, "แผลที่เข่าต้องล้างให้สะอาดก่อนติดพลาสเตอร์ยา", "phlaae thii khao dtawng laang hai sa-aat gaawn dtit phlaat-dtoe-yaa", "膝盖上的伤口要先清洗干净再贴创可贴。", "ล้างแผล", "laang phlaae", "清洗伤口", "ผื่น", "pheun", "皮疹", "易混", "แผล 是皮肤破损的伤口；ผื่น 是皮肤上起的疹子。", "wound"],
  ["แผลถลอก", "phlaae-tha-laawk", "phlaae tha-laawk", "擦伤", "名词", "症状", 23, "เด็กมีแผลถลอกที่ศอกหลังล้มจากจักรยาน", "dek mii phlaae tha-laawk thii saawk lang lom jaak jak-gra-yaan", "孩子从自行车上摔下来后，手肘有擦伤。", "แผลถลอกเล็กน้อย", "phlaae tha-laawk lek naawy", "轻微擦伤", "แผลลึก", "phlaae leuk", "深伤口", "反义", "แผลถลอก 多是表皮擦破；แผลลึก 更严重，需要及时处理。", "wound"],
  ["หกล้ม", "hok-lom", "hok lom", "摔倒", "动词", "症状", 24, "พื้นห้องน้ำเปียกมาก เด็กจึงหกล้มและร้องไห้เสียงดัง", "pheun haawng-naam bpiiak maak, dek jeung hok lom lae raawng-hai siiang dang", "卫生间地板很湿，孩子因此摔倒并大声哭了。", "หกล้มในห้องน้ำ", "hok lom nai haawng-naam", "在卫生间摔倒", "ลื่น", "leuun", "滑", "用法", "หกล้ม 是结果；ลื่น 是滑倒前或滑倒的动作原因。", "wound"],
  ["ฟกช้ำ", "fok-cham", "fok cham", "淤青；瘀伤", "形容词", "症状", 25, "แขนของเขาฟกช้ำหลังชนขอบโต๊ะ แต่ไม่มีแผลเปิด", "khaaen khaawng khao fok cham lang chon khaawp dto, dtaae mai mii phlaae bpoet", "他的手臂撞到桌边后淤青了，但没有开放性伤口。", "รอยฟกช้ำ", "raawy fok cham", "淤青痕迹", "เลือดออก", "leuuat-aawk", "出血", "易混", "ฟกช้ำ 是皮下淤青；เลือดออก 是血流出来。", "wound"],
  ["เลือดออก", "leuuat-aawk", "leuuat aawk", "出血；流血", "短语", "症状", 26, "ถ้าแผลเลือดออกไม่หยุด ควรกดแผลไว้และรีบไปโรงพยาบาล", "thaa phlaae leuuat aawk mai yut, khuan got phlaae wai lae riip bpai roong-pha-yaa-baan", "如果伤口出血不停，应该按住伤口并赶快去医院。", "เลือดออกมาก", "leuuat aawk maak", "出血很多", "ฟกช้ำ", "fok-cham", "淤青", "易混", "เลือดออก 是血出来了，描述急救时比เจ็บ更具体。", "wound"],
  ["วัดไข้", "wat-khai", "wat khai", "量体温", "动词", "基础就医", 27, "พยาบาลวัดไข้ก่อนให้เด็กเข้าพบแพทย์ในห้องตรวจ", "pha-yaa-baan wat khai gaawn hai dek khao phop phaaet nai haawng dtruat", "护士先给孩子量体温，再让他进诊室看医生。", "วัดไข้ด้วยปรอท", "wat khai duai bpa-raawt", "用体温计量体温", "ตรวจความดัน", "dtruat-khwaam-dan", "量血压", "易混", "วัดไข้ 看体温；ตรวจความดัน 看血压。", "clinic"],
  ["ตรวจความดัน", "dtruat-khwaam-dan", "dtruat khwaam dan", "量血压；检查血压", "动词", "基础就医", 28, "ก่อนรับยา คุณหมอให้ตรวจความดันเพราะเขาเวียนหัวบ่อย", "gaawn rap yaa, khun-maaw hai dtruat khwaam dan phraw khao wiian hua baawy", "领药前，医生让他量血压，因为他经常头晕。", "ตรวจความดันโลหิต", "dtruat khwaam dan loo-hit", "测量血压", "วัดไข้", "wat-khai", "量体温", "易混", "ความดัน 在就医中常省略自 ความดันโลหิต，指血压。", "clinic"],
  ["พบแพทย์", "phop-phaaet", "phop phaaet", "看医生；就诊", "动词", "基础就医", 29, "ถ้าอาการไม่ดีขึ้นหลังพักสองวัน ควรนัดพบแพทย์อีกครั้ง", "thaa aa-gaan mai dii kheun lang phak saawng wan, khuan nat phop phaaet iik khrang", "如果休息两天后症状没有好转，应该再预约看医生。", "นัดพบแพทย์", "nat phop phaaet", "预约看医生", "ซื้อยาเอง", "sue yaa eeng", "自己买药", "用法", "พบแพทย์ 较正式；口语也常说 ไปหาหมอ。", "clinic"],
  ["นัดหมอ", "nat-maaw", "nat maaw", "预约医生", "动词", "就医预约", 30, "ฉันนัดหมอไว้วันศุกร์ เพราะวันธรรมดาคนไข้น้อยกว่า", "chan nat maaw wai wan suk, phraw wan tham-ma-daa khon-khai naawy gwaa", "我预约了星期五的医生，因为工作日病人比较少。", "นัดหมอล่วงหน้า", "nat maaw luang-naa", "提前预约医生", "เดินเข้าไป", "doen khao bpai", "直接进去；walk-in", "易混", "นัดหมอ 是提前约；没有预约直接去可说 walk-in 或 เดินเข้าไปถาม。", "appointment"],
  ["เลื่อนนัด", "leuuan-nat", "leuuan nat", "改期；推迟预约", "动词", "就医预约", 31, "เพราะยังติดประชุม เธอโทรไปเลื่อนนัดคลินิกจากบ่ายนี้เป็นพรุ่งนี้", "phraw yang dtit bpra-chum, thoe tho bpai leuuan nat khli-nik jaak baai nii bpen phrung-nii", "因为还在开会，她打电话把诊所预约从今天下午改到明天。", "เลื่อนนัดหมอ", "leuuan nat maaw", "改医生预约", "ยกเลิกนัด", "yok-loek-nat", "取消预约", "易混", "เลื่อนนัด 是改到别的时间；ยกเลิกนัด 是不去了。", "appointment"],
  ["ยกเลิกนัด", "yok-loek-nat", "yok loek nat", "取消预约", "动词", "就医预约", 32, "ถ้าหายดีแล้วควรโทรยกเลิกนัด เพื่อให้คนไข้อื่นได้คิว", "thaa haai dii laaeo khuan tho yok loek nat, phuea hai khon-khai euen dai khiu", "如果已经好了，应该打电话取消预约，好让其他病人拿到号。", "ยกเลิกนัดล่วงหน้า", "yok loek nat luang-naa", "提前取消预约", "เลื่อนนัด", "leuuan-nat", "改期", "易混", "取消和改期不同；取消后通常没有新的时间。", "appointment"],
  ["ใบนัด", "bai-nat", "bai nat", "预约单；复诊单", "名词", "就医预约", 33, "พยาบาลให้ใบนัดครั้งหน้าและอธิบายว่าต้องมาก่อนเวลา", "pha-yaa-baan hai bai nat khrang naa lae a-thi-baai waa dtawng maa gaawn wee-laa", "护士给了下次预约单，并说明需要提前到。", "เก็บใบนัดไว้", "gep bai nat wai", "把预约单收好", "ใบสั่งยา", "bai-sang-yaa", "处方单", "易混", "ใบนัด 说明下次时间；ใบสั่งยา 说明药品。", "appointment"],
  ["บัตรคิว", "bat-khiu", "bat khiu", "排队号；号码牌", "名词", "就医预约", 34, "เมื่อถึงคลินิก ให้กดบัตรคิวก่อนนั่งรอหน้าห้องตรวจ", "muea theung khli-nik, hai got bat khiu gaawn nang raaw naa haawng dtruat", "到诊所后，先取排队号，再坐在诊室前等待。", "กดบัตรคิว", "got bat khiu", "取号", "ใบนัด", "bai-nat", "预约单", "易混", "บัตรคิว 是现场排队号码；ใบนัด 是预约信息。", "appointment"],
  ["คลินิก", "khli-nik", "khli-nik", "诊所；门诊小机构", "名词", "基础就医", 35, "คลินิกใกล้บ้านเปิดถึงสองทุ่ม จึงสะดวกสำหรับคนทำงาน", "khli-nik glai baan bpoet theung saawng thum, jeung sa-duak sam-rap khon tham-ngaan", "家附近的诊所开到晚上八点，所以对上班族很方便。", "ไปคลินิก", "bpai khli-nik", "去诊所", "โรงพยาบาล", "roong-pha-yaa-baan", "医院", "易混", "คลินิก 通常规模较小；โรงพยาบาล 设备和科室更完整。", "clinic"],
  ["โรงพยาบาล", "roong-pha-yaa-baan", "roong pha-yaa-baan", "医院", "名词", "基础就医", 36, "ถ้าเจ็บหน้าอกและหายใจไม่สะดวก ต้องรีบไปโรงพยาบาลทันที", "thaa jep naa-ok lae haai-jai mai sa-duak, dtawng riip bpai roong-pha-yaa-baan than-thii", "如果胸痛且呼吸不顺，必须立刻去医院。", "เข้าโรงพยาบาล", "khao roong-pha-yaa-baan", "住院；进医院", "คลินิก", "khli-nik", "诊所", "易混", "严重或紧急情况更适合ไปโรงพยาบาล，不只是ซื้อยา。", "clinic"],
  ["ร้านขายยา", "raan-khaai-yaa", "raan khaai yaa", "药店", "名词", "药店用药", 37, "ร้านขายยาหน้าปากซอยมีเภสัชกรช่วยแนะนำวิธีใช้ยา", "raan khaai yaa naa bpaak saawy mii phe-sat-cha-gaawn chuai nae-nam wi-thii chai yaa", "巷口的药店有药剂师帮忙说明用药方法。", "ซื้อยาที่ร้านขายยา", "sue yaa thii raan khaai yaa", "在药店买药", "คลินิก", "khli-nik", "诊所", "易混", "ร้านขายยา 卖药并提供用药建议；คลินิก 可看医生。", "pharmacy"],
  ["เภสัชกร", "phe-sat-cha-gaawn", "phe-sat-cha-gaawn", "药剂师", "名词", "药店用药", 38, "เภสัชกรถามว่าแพ้ยาอะไรไหมก่อนจัดยาให้ฉัน", "phe-sat-cha-gaawn thaam waa phaae yaa a-rai mai gaawn jat yaa hai chan", "药剂师给我配药前问我有没有药物过敏。", "ถามเภสัชกร", "thaam phe-sat-cha-gaawn", "询问药剂师", "แพทย์", "phaaet", "医生", "易混", "เภสัชกร 专门负责药品和用药指导；แพทย์ 负责诊断和治疗。", "pharmacy"],
  ["ใบสั่งยา", "bai-sang-yaa", "bai sang yaa", "处方；处方单", "名词", "药店用药", 39, "ยาบางชนิดต้องมีใบสั่งยา จึงซื้อเองจากร้านขายยาไม่ได้", "yaa baang cha-nit dtawng mii bai sang yaa, jeung sue eeng jaak raan khaai yaa mai dai", "有些药需要处方，所以不能自己从药店购买。", "ใช้ใบสั่งยา", "chai bai sang yaa", "使用处方单", "ใบนัด", "bai-nat", "预约单", "易混", "ใบสั่งยา 与药有关；ใบนัด 与下次就诊时间有关。", "pharmacy"],
  ["ยาแก้ปวด", "yaa-gaae-bpuat", "yaa gaae bpuat", "止痛药", "名词", "药店用药", 40, "ก่อนกินยาแก้ปวด ควรถามเภสัชกรว่ากินหลังอาหารหรือไม่", "gaawn gin yaa gaae bpuat, khuan thaam phe-sat-cha-gaawn waa gin lang aa-haan rue mai", "吃止痛药前，应该问药剂师是否要饭后服用。", "กินยาแก้ปวด", "gin yaa gaae bpuat", "吃止痛药", "ยาลดไข้", "yaa-lot-khai", "退烧药", "易混", "ยาแก้ปวด 重点止痛；ยาลดไข้ 重点退烧，有些药可能兼具两种作用。", "medicine"],
  ["ยาลดไข้", "yaa-lot-khai", "yaa lot khai", "退烧药", "名词", "药店用药", 41, "เด็กมีไข้สูง แม่จึงให้ยาลดไข้ตามขนาดที่แพทย์บอก", "dek mii khai suung, maae jeung hai yaa lot khai dtaam kha-naat thii phaaet baawk", "孩子发高烧，妈妈按照医生说的剂量给了退烧药。", "ให้ยาลดไข้", "hai yaa lot khai", "给退烧药", "ยาแก้ปวด", "yaa-gaae-bpuat", "止痛药", "易混", "退烧药不能随意加量，A2 阶段要会看ขนาดยา。", "medicine"],
  ["ยาแก้แพ้", "yaa-gaae-phae", "yaa gaae phaae", "抗过敏药", "名词", "药店用药", 42, "ยาแก้แพ้บางชนิดทำให้ง่วง จึงไม่ควรขับรถหลังกินยา", "yaa gaae phaae baang cha-nit tham-hai nguang, jeung mai khuan khap rot lang gin yaa", "有些抗过敏药会让人犯困，所以吃药后不应该开车。", "กินยาแก้แพ้", "gin yaa gaae phaae", "吃抗过敏药", "ยาแก้ไอ", "yaa-gaae-ai", "止咳药", "易混", "ยาแก้แพ้ 针对过敏症状；ยาแก้ไอ 针对咳嗽。", "medicine"],
  ["ยาแก้ไอ", "yaa-gaae-ai", "yaa gaae ai", "止咳药；咳嗽药", "名词", "药店用药", 43, "ถ้าไอตอนกลางคืนมาก เภสัชกรอาจแนะนำยาแก้ไอก่อนนอน", "thaa ai dtaawn glaang-kheun maak, phe-sat-cha-gaawn aat nae-nam yaa gaae ai gaawn naawn", "如果夜里咳得厉害，药剂师可能建议睡前服用止咳药。", "ยาแก้ไอน้ำ", "yaa gaae ai naam", "止咳糖浆", "ยาอม", "yaa-om", "含片", "易混", "ยาแก้ไอ 是药；ยาอม 是含在嘴里的片剂，可缓解喉咙不适。", "medicine"],
  ["ยาอม", "yaa-om", "yaa om", "含片；喉糖", "名词", "药店用药", 44, "เวลารู้สึกเจ็บคอเล็กน้อย ฉันชอบอมยาอมและดื่มน้ำอุ่น", "wee-laa ruu-seuk jep khaaw lek naawy, chan chaawp om yaa om lae deum naam un", "感觉喉咙有点痛时，我喜欢含含片并喝温水。", "อมยาอม", "om yaa om", "含含片", "ยาแก้ไอ", "yaa-gaae-ai", "止咳药", "易混", "ยาอม 的动作是อม，不是กลืนทันที。", "medicine"],
  ["ยาพ่น", "yaa-phon", "yaa phon", "喷雾药；喷剂", "名词", "药店用药", 45, "คุณหมอให้ยาพ่นจมูกและบอกว่าไม่ควรใช้เกินจำนวนครั้งที่กำหนด", "khun-maaw hai yaa phon ja-muuk lae baawk waa mai khuan chai goen jam-nuan khrang thii gam-not", "医生给了鼻喷剂，并说不应超过规定次数使用。", "ยาพ่นจมูก", "yaa phon ja-muuk", "鼻喷剂", "ยาหยอดตา", "yaa-yaawt-dtaa", "眼药水", "易混", "ยาพ่น 是喷；ยาหยอด 是滴，用法动作不同。", "medicine"],
  ["ยาหยอดตา", "yaa-yaawt-dtaa", "yaa yaawt dtaa", "眼药水", "名词", "药店用药", 46, "ก่อนใช้ยาหยอดตา ควรล้างมือให้สะอาดทุกครั้ง", "gaawn chai yaa yaawt dtaa, khuan laang mue hai sa-aat thuk khrang", "使用眼药水前，每次都应该把手洗干净。", "หยอดยาตา", "yaawt yaa dtaa", "滴眼药", "ยาพ่น", "yaa-phon", "喷剂", "易混", "ยาหยอดตา 用กับตา，动作常说หยอด。", "medicine"],
  ["ยาทา", "yaa-thaa", "yaa thaa", "外用药；涂抹药", "名词", "药店用药", 47, "แผลถลอกเล็กน้อยอาจใช้ยาทาบาง ๆ หลังล้างแผลแล้ว", "phlaae tha-laawk lek naawy aat chai yaa thaa baang baang lang laang phlaae laaeo", "轻微擦伤清洗后可以薄薄地涂一点外用药。", "ทายา", "thaa yaa", "涂药", "ยากิน", "yaa-gin", "口服药", "反义", "ยาทา 涂在皮肤上；ยากิน 是吞服或口服。", "medicine"],
  ["ครีมทา", "khriim-thaa", "khriim thaa", "外用乳膏；涂抹霜", "名词", "药店用药", 48, "เภสัชกรบอกให้ทาครีมทาบาง ๆ วันละสองครั้งตรงที่คัน", "phe-sat-cha-gaawn baawk hai thaa khriim thaa baang baang wan la saawng khrang dtrong thii khan", "药剂师说在痒的地方薄涂乳膏，每天两次。", "ทาครีมทา", "thaa khriim thaa", "涂乳膏", "ยาทา", "yaa-thaa", "外用药", "近义", "ครีมทา 是外用药的一种质地；ยาทา 范围更广。", "medicine"],
  ["พลาสเตอร์ยา", "phlaat-dtoe-yaa", "phlaat-dtoe yaa", "创可贴", "名词", "药店用药", 49, "หลังล้างแผลให้แห้งแล้ว เขาติดพลาสเตอร์ยาเพื่อกันฝุ่น", "lang laang phlaae hai haaeng laaeo, khao dtit phlaat-dtoe yaa phuea gan fun", "把伤口洗净擦干后，他贴上创可贴来防灰尘。", "ติดพลาสเตอร์ยา", "dtit phlaat-dtoe yaa", "贴创可贴", "ผ้าก๊อซ", "phaa-gaawt", "纱布", "易混", "小伤口常ใช้พลาสเตอร์ยา；较大伤口可能ใช้ผ้าก๊อซ。", "first-aid"],
  ["ผ้าก๊อซ", "phaa-gaawt", "phaa gaawt", "纱布", "名词", "药店用药", 50, "พยาบาลใช้ผ้าก๊อซปิดแผลหลังทำความสะอาดเรียบร้อยแล้ว", "pha-yaa-baan chai phaa gaawt bpit phlaae lang tham-khwaam-sa-aat riiap-raawy laaeo", "护士清洁完伤口后用纱布盖住伤口。", "ปิดแผลด้วยผ้าก๊อซ", "bpit phlaae duai phaa gaawt", "用纱布覆盖伤口", "พลาสเตอร์ยา", "phlaat-dtoe-yaa", "创可贴", "易混", "ผ้าก๊อซ 常需要胶带或绷带固定；พลาสเตอร์ยา 通常自带粘性。", "first-aid"],
  ["สำลี", "sam-lii", "sam-lii", "棉花；棉球", "名词", "药店用药", 51, "อย่าใช้สำลีที่สกปรกเช็ดแผล เพราะอาจทำให้ติดเชื้อ", "yaa chai sam-lii thii sok-ga-bprok chet phlaae, phraw aat tham-hai dtit-cheuua", "不要用脏棉花擦伤口，因为可能导致感染。", "ใช้สำลีเช็ดแผล", "chai sam-lii chet phlaae", "用棉花擦伤口", "ผ้าก๊อซ", "phaa-gaawt", "纱布", "易混", "สำลี 用来擦或吸液体；ผ้าก๊อซ 用来覆盖伤口更常见。", "first-aid"],
  ["เจลล้างมือ", "jeel-laang-mue", "jeel laang mue", "免洗洗手液；洗手凝胶", "名词", "药店用药", 52, "ก่อนกินยา เธอใช้เจลล้างมือเพราะหาที่ล้างมือไม่เจอ", "gaawn gin yaa, thoe chai jeel laang mue phraw haa thii laang mue mai joe", "吃药前，她用免洗洗手液，因为找不到洗手的地方。", "พกเจลล้างมือ", "phok jeel laang mue", "携带免洗洗手液", "สบู่", "sa-buu", "肥皂", "近义", "เจลล้างมือ 可临时清洁；有水时用สบู่ล้างมือ更完整。", "hygiene"],
  ["ยาฆ่าเชื้อ", "yaa-khaa-cheuua", "yaa khaa cheuua", "消毒药；杀菌药液", "名词", "药店用药", 53, "ก่อนปิดแผล พยาบาลใช้ยาฆ่าเชื้อเช็ดรอบแผลอย่างเบามือ", "gaawn bpit phlaae, pha-yaa-baan chai yaa khaa cheuua chet raawp phlaae yaang bao mue", "包扎伤口前，护士用消毒药轻轻擦伤口周围。", "ใส่ยาฆ่าเชื้อ", "sai yaa khaa cheuua", "上消毒药", "น้ำเกลือ", "naam-gluea", "生理盐水", "易混", "ยาฆ่าเชื้อ 强调杀菌；น้ำเกลือ 常用来冲洗。", "first-aid"],
  ["น้ำเกลือ", "naam-gluea", "naam gluea", "生理盐水；盐水", "名词", "药店用药", 54, "เภสัชกรแนะนำให้ใช้น้ำเกลือล้างแผลก่อนทายา", "phe-sat-cha-gaawn nae-nam hai chai naam gluea laang phlaae gaawn thaa yaa", "药剂师建议先用生理盐水冲洗伤口再涂药。", "ล้างแผลด้วยน้ำเกลือ", "laang phlaae duai naam gluea", "用生理盐水清洗伤口", "ยาฆ่าเชื้อ", "yaa-khaa-cheuua", "消毒药", "易混", "น้ำเกลือ อ่อนโยนกว่ายาฆ่าเชื้อบางชนิด，适合冲洗但不等于所有消毒药。", "first-aid"],
  ["วิธีใช้", "wi-thii-chai", "wi-thii chai", "使用方法；用法", "名词", "药店用药", 55, "ก่อนออกจากร้านขายยา ฉันถามวิธีใช้ให้แน่ใจอีกครั้ง", "gaawn aawk jaak raan khaai yaa, chan thaam wi-thii chai hai naae-jai iik khrang", "离开药店前，我又确认了一次用法。", "อ่านวิธีใช้", "aan wi-thii chai", "阅读用法", "ขนาดยา", "kha-naat-yaa", "剂量", "易混", "วิธีใช้ 说怎么用；ขนาดยา 说用多少。", "instruction"],
  ["ขนาดยา", "kha-naat-yaa", "kha-naat yaa", "药量；剂量", "名词", "药店用药", 56, "เด็กและผู้ใหญ่ใช้ขนาดยาไม่เท่ากัน จึงต้องอ่านฉลากก่อน", "dek lae phuu-yai chai kha-naat yaa mai thao gan, jeung dtawng aan cha-laak gaawn", "儿童和成人的剂量不同，所以必须先读标签。", "ขนาดยาสำหรับเด็ก", "kha-naat yaa sam-rap dek", "儿童剂量", "วิธีใช้", "wi-thii-chai", "使用方法", "易混", "不要只看药名，还要看ขนาดยา和ความถี่。", "instruction"],
  ["ก่อนอาหาร", "gaawn-aa-haan", "gaawn aa-haan", "饭前", "短语", "药店用药", 57, "ยานี้ต้องกินก่อนอาหารครึ่งชั่วโมง ไม่ใช่หลังกินข้าวแล้ว", "yaa nii dtawng gin gaawn aa-haan khreung chua-moong, mai chai lang gin khaao laaeo", "这种药要饭前半小时吃，不是吃完饭后。", "กินก่อนอาหาร", "gin gaawn aa-haan", "饭前服用", "หลังอาหาร", "lang-aa-haan", "饭后", "反义", "ก่อนอาหาร 与หลังอาหาร方向相反，读药袋时要特别看清。", "instruction"],
  ["หลังอาหาร", "lang-aa-haan", "lang aa-haan", "饭后", "短语", "药店用药", 58, "เภสัชกรบอกว่ายาแก้ปวดควรกินหลังอาหารเพื่อลดการระคายท้อง", "phe-sat-cha-gaawn baawk waa yaa gaae bpuat khuan gin lang aa-haan phuea lot gaan ra-khaai thaawng", "药剂师说止痛药应该饭后吃，以减少对胃的刺激。", "กินหลังอาหารทันที", "gin lang aa-haan than-thii", "饭后立刻服用", "ก่อนอาหาร", "gaawn-aa-haan", "饭前", "反义", "หลังอาหาร 通常指吃完饭以后，和ก่อนอาหาร不要混。", "instruction"],
  ["วันละสองครั้ง", "wan-la-saawng-khrang", "wan la saawng khrang", "每天两次", "短语", "药店用药", 59, "ครีมนี้ทาวันละสองครั้ง เช้าและก่อนนอน จนกว่าผื่นจะลดลง", "khriim nii thaa wan la saawng khrang, chaao lae gaawn naawn, jon gwaa pheun ja lot long", "这种乳膏每天涂两次，早上和睡前，直到疹子减轻。", "ใช้วันละสองครั้ง", "chai wan la saawng khrang", "每天使用两次", "ทุกหกชั่วโมง", "thuk-hok-chua-moong", "每六小时", "易混", "วันละสองครั้ง 看一天次数；ทุกหกชั่วโมง 看间隔时间。", "instruction"],
  ["ทุกหกชั่วโมง", "thuk-hok-chua-moong", "thuk hok chua-moong", "每六小时", "短语", "药店用药", 60, "ถ้าหมอบอกให้กินยาทุกหกชั่วโมง ต้องเว้นเวลาให้ใกล้เคียงกัน", "thaa maaw baawk hai gin yaa thuk hok chua-moong, dtawng wen wee-laa hai glai-khiiang gan", "如果医生说每六小时服药一次，就要尽量保持间隔接近。", "กินทุกหกชั่วโมง", "gin thuk hok chua-moong", "每六小时服用", "วันละสองครั้ง", "wan-la-saawng-khrang", "每天两次", "易混", "ทุกหกชั่วโมง 比วันละ几ครั้ง更强调固定间隔。", "instruction"],
  ["เขย่าขวดก่อนใช้", "kha-yao-khuat-gaawn-chai", "kha-yao khuat gaawn chai", "使用前摇匀", "短语", "药店用药", 61, "ยาน้ำขวดนี้ต้องเขย่าขวดก่อนใช้ ไม่อย่างนั้นตัวยาอาจไม่เท่ากัน", "yaa naam khuat nii dtawng kha-yao khuat gaawn chai, mai yaang nan dtua yaa aat mai thao gan", "这瓶药水使用前必须摇匀，否则药物成分可能不均匀。", "เขย่าขวดก่อนใช้ทุกครั้ง", "kha-yao khuat gaawn chai thuk khrang", "每次使用前摇匀", "ห้ามเขย่า", "haam kha-yao", "禁止摇晃", "反义", "บางยา需要เขย่า บางยาไม่ควรเขย่า，要看ฉลาก。", "instruction"],
  ["ห้ามใช้", "haam-chai", "haam chai", "禁止使用；不得使用", "短语", "药店用药", 62, "ถ้าแพ้ส่วนผสมนี้ ห้ามใช้ยาชนิดนี้และควรแจ้งแพทย์", "thaa phaae suan-pha-som nii, haam chai yaa cha-nit nii lae khuan jaaeng phaaet", "如果对这个成分过敏，禁止使用这种药，并应告知医生。", "ห้ามใช้เกินขนาด", "haam chai goen kha-naat", "禁止超量使用", "ควรใช้", "khuan chai", "应该使用", "反义", "ห้ามใช้ 是明确禁止，比ไม่ควรใช้语气更强。", "instruction"],
  ["ผลข้างเคียง", "phon-khaang-khiiang", "phon khaang khiiang", "副作用", "名词", "药店用药", 63, "ถ้ามีผลข้างเคียงรุนแรงหลังใช้ยา ควรหยุดยาและปรึกษาแพทย์", "thaa mii phon khaang khiiang run-raaeng lang chai yaa, khuan yut yaa lae bpreuk-saa phaaet", "如果用药后有严重副作用，应该停药并咨询医生。", "ผลข้างเคียงของยา", "phon khaang khiiang khaawng yaa", "药物副作用", "อาการแพ้ยา", "aa-gaan phaae yaa", "药物过敏症状", "易混", "ผลข้างเคียง 不一定是过敏；แพ้ยา 是免疫或过敏反应。", "instruction"],
  ["ง่วงนอน", "nguang-naawn", "nguang naawn", "困；想睡", "形容词", "药店用药", 64, "ยาแก้แพ้นี้ทำให้ง่วงนอน จึงควรกินก่อนนอนตามคำแนะนำ", "yaa gaae phaae nii tham-hai nguang naawn, jeung khuan gin gaawn naawn dtaam kham-nae-nam", "这种抗过敏药会让人犯困，所以应按建议睡前服用。", "รู้สึกง่วงนอน", "ruu-seuk nguang naawn", "觉得困", "นอนไม่หลับ", "naawn-mai-lap", "睡不着", "反义", "ง่วงนอน 是想睡；นอนไม่หลับ 是想睡却睡不着。", "side-effect"],
  ["พักผ่อน", "phak-phaawn", "phak phaawn", "休息；休养", "动词", "休息请假", 65, "หมอบอกให้พักผ่อนมาก ๆ และหลีกเลี่ยงการทำงานหนักสองวัน", "maaw baawk hai phak phaawn maak maak lae liik-liiang gaan tham-ngaan nak saawng wan", "医生说要多休息，并避免两天内做重活。", "พักผ่อนให้เพียงพอ", "phak phaawn hai phiiang-phaaw", "充分休息", "ทำงานหนัก", "tham-ngaan nak", "辛苦工作；重体力劳动", "反义", "พักผ่อน 可用于身体恢复，也可用于普通休息。", "rest"],
  ["ลาป่วย", "laa-bpuai", "laa bpuai", "请病假", "动词", "休息请假", 66, "เพราะยังมีไข้ ฉันจึงส่งข้อความถึงหัวหน้าเพื่อขอลาป่วยหนึ่งวัน", "phraw yang mii khai, chan jeung song khaaw-khwaam theung hua-naa phuea khaaw laa bpuai neung wan", "因为还在发烧，我发消息给主管请一天病假。", "ขอลาป่วย", "khaaw laa bpuai", "请病假", "ลาพักร้อน", "laa-phak-raawn", "请年假", "易混", "ลาป่วย 因生病请假；ลาพักร้อน 是年假或休假。", "sick-leave"],
  ["ใบรับรองแพทย์", "bai-rap-raawng-phaaet", "bai rap-raawng phaaet", "医生证明；病假证明", "名词", "休息请假", 67, "บริษัทขอใบรับรองแพทย์ถ้าพนักงานลาป่วยเกินสองวัน", "baaw-ri-sat khaaw bai rap-raawng phaaet thaa pha-nak-ngaan laa bpuai goen saawng wan", "公司要求员工请病假超过两天时提供医生证明。", "ขอใบรับรองแพทย์", "khaaw bai rap-raawng phaaet", "开医生证明", "ใบนัด", "bai-nat", "预约单", "易混", "ใบรับรองแพทย์ 证明病情或休息建议；ใบนัด 只是预约时间。", "sick-leave"],
  ["อาการดีขึ้น", "aa-gaan-dii-kheun", "aa-gaan dii kheun", "症状好转", "短语", "休息请假", 68, "หลังพักและกินยาตามเวลา อาการดีขึ้นจนเธอกลับไปทำงานได้", "lang phak lae gin yaa dtaam wee-laa, aa-gaan dii kheun jon thoe glap bpai tham-ngaan dai", "休息并按时吃药后，症状好转到她可以回去工作。", "เริ่มอาการดีขึ้น", "roem aa-gaan dii kheun", "开始好转", "อาการแย่ลง", "aa-gaan-yaae-long", "症状变差", "反义", "อาการดีขึ้น 与อาการแย่ลง相对，常用于复诊或请假说明。", "recovery"],
  ["อาการแย่ลง", "aa-gaan-yaae-long", "aa-gaan yaae long", "症状恶化；变差", "短语", "休息请假", 69, "ถ้าอาการแย่ลงหลังกลับบ้าน ให้โทรหาโรงพยาบาลทันที", "thaa aa-gaan yaae long lang glap baan, hai tho haa roong-pha-yaa-baan than-thii", "如果回家后症状变差，请立即打电话给医院。", "อาการแย่ลงเรื่อย ๆ", "aa-gaan yaae long reuai reuai", "症状越来越差", "อาการดีขึ้น", "aa-gaan-dii-kheun", "症状好转", "反义", "แย่ลง 表示趋势变坏，常和ถ้า、ควร、รีบ搭配。", "recovery"],
  ["หายดี", "haai-dii", "haai dii", "完全好了；康复", "形容词", "休息请假", 70, "แม้ไม่มีไข้แล้ว แต่เขายังไม่หายดีจึงไม่ควรออกกำลังกายหนัก", "maae mai mii khai laaeo, dtaae khao yang mai haai dii jeung mai khuan aawk-gam-lang-gaai nak", "虽然已经不发烧了，但他还没有完全好，所以不应该剧烈运动。", "หายดีแล้ว", "haai dii laaeo", "已经康复了", "ไม่สบาย", "mai-sa-baai", "不舒服；生病", "反义", "หายดี 比ดีขึ้น更强，表示基本恢复。", "recovery"],
  ["กินยา", "gin-yaa", "gin yaa", "吃药；服药", "动词", "药店用药", 71, "อย่าลืมกินยาหลังอาหารเย็นตามที่เภสัชกรเขียนไว้บนซองยา", "yaa leum gin yaa lang aa-haan yen dtaam thii phe-sat-cha-gaawn khian wai bon saawng yaa", "别忘了按药剂师写在药袋上的说明，晚饭后吃药。", "กินยาตรงเวลา", "gin yaa dtrong wee-laa", "按时吃药", "ทายา", "thaa-yaa", "涂药", "易混", "กินยา 是口服；ทายา 是外用涂抹。", "medicine"],
  ["ทายา", "thaa-yaa", "thaa yaa", "涂药", "动词", "药店用药", 72, "หลังอาบน้ำให้เช็ดผิวให้แห้งก่อนทายาบริเวณที่คัน", "lang aap-naam hai chet phiu hai haaeng gaawn thaa yaa baaw-ri-ween thii khan", "洗澡后先把皮肤擦干，再在发痒的部位涂药。", "ทายาบาง ๆ", "thaa yaa baang baang", "薄薄地涂药", "กินยา", "gin-yaa", "吃药", "易混", "ทายา 常用于皮肤、伤口；不要和กินยา混用。", "medicine"],
  ["ฉีดยา", "chiiit-yaa", "chiiit yaa", "打针；注射药物", "动词", "基础就医", 73, "เด็กกลัวฉีดยา แต่พยาบาลคุยด้วยเบา ๆ จนเขาสงบลง", "dek glua chiiit yaa, dtaae pha-yaa-baan khui duai bao bao jon khao sa-ngop long", "孩子害怕打针，但护士轻声和他说话，直到他平静下来。", "ฉีดยาที่แขน", "chiiit yaa thii khaaen", "在手臂打针", "กินยา", "gin-yaa", "吃药", "易混", "ฉีดยา 是注射；กินยา 是口服，给医生说明时要说清。", "clinic"],
  ["ล้างแผล", "laang-phlaae", "laang phlaae", "清洗伤口", "动词", "基础就医", 74, "หลังหกล้ม พ่อพาลูกไปล้างแผลที่คลินิกใกล้บ้าน", "lang hok lom, phaaw phaa luuk bpai laang phlaae thii khli-nik glai baan", "摔倒后，爸爸带孩子去家附近的诊所清洗伤口。", "ล้างแผลทุกวัน", "laang phlaae thuk wan", "每天清洗伤口", "ปิดแผล", "bpit-phlaae", "包扎；覆盖伤口", "用法", "通常先ล้างแผล，再ปิดแผล或ทายา。", "first-aid"],
  ["ประคบเย็น", "bpra-khop-yen", "bpra-khop yen", "冷敷", "动词", "基础就医", 75, "หลังข้อเท้าบวม แพทย์แนะนำให้ประคบเย็นครั้งละสิบห้านาที", "lang khaaw-thaao buam, phaaet nae-nam hai bpra-khop yen khrang la sip-haa naa-thii", "脚踝肿了以后，医生建议每次冷敷十五分钟。", "ประคบเย็นบริเวณที่บวม", "bpra-khop yen baaw-ri-ween thii buam", "冷敷肿胀处", "ประคบร้อน", "bpra-khop-raawn", "热敷", "反义", "急性肿痛常听到ประคบเย็น；肌肉僵硬有时会用ประคบร้อน。", "first-aid"],
  ["ดื่มน้ำอุ่น", "deum-naam-un", "deum naam un", "喝温水", "短语", "休息请假", 76, "เมื่อเจ็บคอเล็กน้อย เธอดื่มน้ำอุ่นบ่อย ๆ และพักเสียง", "muea jep khaaw lek naawy, thoe deum naam un baawy baawy lae phak siiang", "喉咙有点痛时，她经常喝温水并让嗓子休息。", "ดื่มน้ำอุ่นบ่อย ๆ", "deum naam un baawy baawy", "经常喝温水", "ดื่มน้ำเย็น", "deum naam yen", "喝冰水；喝冷水", "反义", "ดื่มน้ำอุ่น 是护理建议，ไม่ใช่ยา。", "rest"],
  ["นอนพัก", "naawn-phak", "naawn phak", "躺下休息；卧床休息", "动词", "休息请假", 77, "ถ้ายังเวียนหัวอยู่ ให้นอนพักก่อนแล้วค่อยลุกเดิน", "thaa yang wiian hua yuu, hai naawn phak gaawn laaeo khaawy luk doen", "如果还头晕，就先躺下休息，再慢慢起身走动。", "นอนพักที่บ้าน", "naawn phak thii baan", "在家卧床休息", "ทำงานต่อ", "tham-ngaan dtaaw", "继续工作", "反义", "นอนพัก 强调躺着恢复，比พักเฉย ๆ 更具体。", "rest"],
  ["อ่อนเพลีย", "aawn-phliia", "aawn phliia", "乏力；疲惫虚弱", "形容词", "身体不适", 78, "หลังเป็นไข้หลายวัน เขายังอ่อนเพลียและเดินเร็วไม่ได้", "lang bpen khai laai wan, khao yang aawn phliia lae doen reo mai dai", "发烧好几天后，他仍然乏力，不能走得太快。", "รู้สึกอ่อนเพลีย", "ruu-seuk aawn phliia", "感觉乏力", "แข็งแรง", "khaeng-raaeng", "强壮；健康", "反义", "อ่อนเพลีย 比เหนื่อย更偏身体虚弱或病后无力。", "symptom"],
  ["หายใจไม่สะดวก", "haai-jai-mai-sa-duak", "haai jai mai sa-duak", "呼吸不顺；呼吸困难", "短语", "症状", 79, "ถ้าหายใจไม่สะดวกพร้อมเจ็บหน้าอก ต้องรีบขอความช่วยเหลือ", "thaa haai jai mai sa-duak phraawm jep naa-ok, dtawng riip khaaw khwaam chuai-leuua", "如果呼吸不顺并伴有胸痛，必须赶快求助。", "หายใจไม่สะดวกมาก", "haai jai mai sa-duak maak", "呼吸很不顺", "คัดจมูก", "khat-ja-muuk", "鼻塞", "易混", "หายใจไม่สะดวก 比คัดจมูก严重范围更广，需要谨慎处理。", "symptom"],
  ["แน่นหน้าอก", "naaen-naa-ok", "naaen naa-ok", "胸口闷；胸部压迫感", "形容词", "症状", 80, "เขารู้สึกแน่นหน้าอกหลังเดินเร็ว จึงหยุดพักและโทรหาโรงพยาบาล", "khao ruu-seuk naaen naa-ok lang doen reo, jeung yut phak lae tho haa roong-pha-yaa-baan", "他快走后感觉胸口闷，所以停下来休息并打电话给医院。", "รู้สึกแน่นหน้าอก", "ruu-seuk naaen naa-ok", "感觉胸闷", "เจ็บหน้าอก", "jep-naa-ok", "胸痛", "易混", "แน่นหน้าอก 是闷压感；เจ็บหน้าอก 是疼痛感，严重时都应就医。", "symptom"],
  ["เจ็บหน้าอก", "jep-naa-ok", "jep naa-ok", "胸痛", "短语", "症状", 81, "อาการเจ็บหน้าอกไม่ควรรอดูนาน โดยเฉพาะถ้ามีเหงื่อออกมาก", "aa-gaan jep naa-ok mai khuan raaw duu naan, dooi-cha-phaw thaa mii ngeuua aawk maak", "胸痛症状不应该等太久观察，尤其是如果大量出汗。", "เจ็บหน้าอกข้างซ้าย", "jep naa-ok khaang saai", "左胸痛", "แน่นหน้าอก", "naaen-naa-ok", "胸闷", "易混", "เจ็บหน้าอก 是重要警讯，学习中也要会说位置和持续时间。", "symptom"],
  ["ปวดประจำเดือน", "bpuat-bpra-jam-deuuan", "bpuat bpra-jam-deuuan", "痛经", "短语", "身体不适", 82, "เวลาปวดประจำเดือนมาก เธอจะใช้ถุงน้ำอุ่นวางที่ท้องและนอนพัก", "wee-laa bpuat bpra-jam-deuuan maak, thoe ja chai thung naam un waang thii thaawng lae naawn phak", "痛经严重时，她会把热水袋放在肚子上并躺下休息。", "ปวดประจำเดือนทุกเดือน", "bpuat bpra-jam-deuuan thuk deuuan", "每个月痛经", "ปวดท้อง", "bpuat-thaawng", "肚子痛", "易混", "ปวดประจำเดือน 是经期相关疼痛；ปวดท้อง 范围更广。", "symptom"],
  ["นอนไม่หลับ", "naawn-mai-lap", "naawn mai lap", "失眠；睡不着", "短语", "身体不适", 83, "ช่วงนี้เขานอนไม่หลับเพราะเครียดเรื่องงาน จึงพยายามลดกาแฟตอนเย็น", "chuang nii khao naawn mai lap phraw khriiat rueang ngaan, jeung pha-yaa-yaam lot gaa-faae dtaawn yen", "他最近因为工作压力睡不着，所以努力减少晚上喝咖啡。", "นอนไม่หลับทั้งคืน", "naawn mai lap thang kheun", "整晚睡不着", "ง่วงนอน", "nguang-naawn", "困；想睡", "反义", "นอนไม่หลับ 是睡不着；ง่วงนอน 是困，可能但不一定能睡着。", "symptom"],
  ["เครียด", "khriiat", "khriiat", "压力大；紧张焦虑", "形容词", "身体不适", 84, "ถ้าเครียดมากจนกินไม่ได้และนอนไม่หลับ ควรปรึกษาผู้เชี่ยวชาญ", "thaa khriiat maak jon gin mai dai lae naawn mai lap, khuan bpreuk-saa phuu-chiao-chaan", "如果压力大到吃不下、睡不着，应该咨询专业人士。", "เครียดเรื่องงาน", "khriiat rueang ngaan", "因工作压力大", "สบายใจ", "sa-baai-jai", "安心；心情轻松", "反义", "เครียด 可描述心理压力，也可能影响身体症状。", "symptom"],
  ["ไม่สบาย", "mai-sa-baai", "mai sa-baai", "不舒服；生病", "形容词", "身体不适", 85, "วันนี้ฉันไม่สบายแต่ยังไม่มีไข้ จึงขอทำงานที่บ้านหนึ่งวัน", "wan-nii chan mai sa-baai dtaae yang mai mii khai, jeung khaaw tham-ngaan thii baan neung wan", "我今天不舒服但还没发烧，所以申请在家工作一天。", "รู้สึกไม่สบาย", "ruu-seuk mai sa-baai", "感觉不舒服", "หายดี", "haai-dii", "完全好了", "反义", "ไม่สบาย 是很常用的泛称；具体症状还要补充ปวด、ไอ、มีไข้等。", "symptom"],
  ["ยาประจำตัว", "yaa-bpra-jam-dtua", "yaa bpra-jam dtua", "长期服用的常用药；个人固定用药", "名词", "药店用药", 86, "เวลาไปโรงพยาบาล คุณยายจะนำยาประจำตัวไปให้หมอดูทุกครั้ง", "wee-laa bpai roong-pha-yaa-baan, khun-yaai ja nam yaa bpra-jam dtua bpai hai maaw duu thuk khrang", "去医院时，奶奶每次都会把长期服用的药带去给医生看。", "พกยาประจำตัว", "phok yaa bpra-jam dtua", "随身带常用药", "ยาใหม่", "yaa mai", "新药", "易混", "ยาประจำตัว 是长期或固定用药，告知医生可避免用药冲突。", "medicine"],
  ["โรคประจำตัว", "rook-bpra-jam-dtua", "rook bpra-jam dtua", "慢性病；既往固定疾病", "名词", "基础就医", 87, "ก่อนรักษา หมอถามว่าเขามีโรคประจำตัวหรือแพ้ยาอะไรไหม", "gaawn rak-saa, maaw thaam waa khao mii rook bpra-jam dtua rue phaae yaa a-rai mai", "治疗前，医生问他有没有慢性病或药物过敏。", "แจ้งโรคประจำตัว", "jaaeng rook bpra-jam dtua", "告知慢性病", "อาการป่วย", "aa-gaan bpuai", "病情；症状", "易混", "โรคประจำตัว 是长期疾病背景；อาการป่วย 是当前症状表现。", "clinic"],
  ["ประกันสุขภาพ", "bpra-gan-suk-kha-phaap", "bpra-gan suk-kha-phaap", "健康保险；医疗保险", "名词", "基础就医", 88, "ก่อนนอนโรงพยาบาล เจ้าหน้าที่ขอดูบัตรประกันสุขภาพของผู้ป่วย", "gaawn naawn roong-pha-yaa-baan, jao-naa-thii khaaw duu bat bpra-gan suk-kha-phaap khaawng phuu-bpuai", "住院前，工作人员要求查看病人的医保/健康保险卡。", "ใช้ประกันสุขภาพ", "chai bpra-gan suk-kha-phaap", "使用健康保险", "จ่ายเงินสด", "jaai ngoen sot", "付现金", "易混", "有保险也要确认โรงพยาบาล、วงเงิน、เงื่อนไข是否适用。", "clinic"],
  ["แพ้ยา", "phae-yaa", "phae yaa", "药物过敏", "短语", "过敏", 89, "ถ้าเคยแพ้ยา ต้องบอกแพทย์และเภสัชกรก่อนรับยาทุกครั้ง", "thaa khoei phaae yaa, dtawng baawk phaaet lae phe-sat-cha-gaawn gaawn rap yaa thuk khrang", "如果曾经药物过敏，每次领药前都必须告诉医生和药剂师。", "ประวัติแพ้ยา", "bpra-wat phaae yaa", "药物过敏史", "แพ้อาหาร", "phae-aa-haan", "食物过敏", "易混", "แพ้ยา 与แพ้อาหาร对象不同，就医时都应主动说明。", "allergy"],
] as const satisfies readonly Row[];

const relatedFor = (row: Row): VocabularyExpansionRelatedWord => ({ thai: row[13], roman: row[14], chinese: row[15] });
const comparisonFor = (row: Row): VocabularyExpansionComparison => ({
  kind: row[16],
  target: relatedFor(row),
  distinctionZh: `${row[0]} 和 ${row[13]} 在身体不适、药店或就医场景中容易一起出现；学习时要看症状对象、动作和严重程度是否相同。`,
});
const synonymsFor = (row: Row): VocabularyExpansionRelatedWord[] => row[16] === "近义" ? [relatedFor(row)] : [];
const antonymsFor = (row: Row): VocabularyExpansionRelatedWord[] => row[16] === "反义" ? [relatedFor(row)] : [];

const toCandidate = (row: Row): VocabularyExpansionCandidate => {
  const [thai, id, roman, chinese, partOfSpeech, theme, priority, exampleThai, exampleRoman, exampleChinese, collocationThai, collocationRoman, collocationChinese, , , , , usageNoteZh, tag] = row;
  const synonyms = synonymsFor(row);
  const antonyms = antonymsFor(row);
  const comparisons = [comparisonFor(row)];
  const collocations = [{ thai: collocationThai, roman: collocationRoman, chinese: collocationChinese }];
  const tags = ["a2", "health", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms, antonyms, comparisons, collocations, usageNotesZh: [usageNoteZh], tags }],
    synonyms,
    antonyms,
    comparisons,
    collocations,
    usageNotesZh: [usageNoteZh],
    tags,
    sourceRefs: HEALTH_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_HEALTH_PHARMACY_01 = rows.map(toCandidate);
