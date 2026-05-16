import type { VocabularyEnrichment } from "./types";

const CORE_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thaipod101-core100"];
const GRAMMAR_REFS = ["complete-thai-a1", "into-asia-grammar"];
const POLITE_REFS = ["thai-reference-polite-particles", "loecsen-thai", "thaipod101-core100"];

export const VOCABULARY_ENRICHMENT_CORE = [
  {
    id: "enrich-sawat-dii",
    vocabularyId: "sawat-dii",
    thai: "สวัสดี",
    roman: "sawat-dii",
    chinese: "你好；再见",
    english: "hello; goodbye",
    senses: [
      {
        id: "greeting",
        chinese: "你好；用于打开一次礼貌互动",
        english: "hello; a polite greeting that opens an interaction",
        register: "polite",
        examples: [
          {
            thai: "สวัสดีค่ะ ดิฉันโทรมาเพื่อสอบถามว่าพรุ่งนี้บริษัทเปิดกี่โมง",
            roman: "sawat-dii kha, di-chan thoo maa phuea saawp-thaam waa phrung-nii baw-ri-sat bpoet gii moong",
            chinese: "您好，我打电话来想询问明天公司几点开门。",
            english: "Hello, I am calling to ask what time the company opens tomorrow.",
            grammarIds: ["purpose-phuea", "complement-waa", "quantity-price-time-questions"],
          },
        ],
        synonyms: [
          { thai: "หวัดดี", roman: "wat-dii", chinese: "嗨；你好", notesZh: "更口语，适合熟人。" },
        ],
        antonyms: [
          { thai: "ลาก่อน", roman: "laa-gaawn", chinese: "再见；告别", notesZh: "更像正式告别，不是开场问候。" },
        ],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "หวัดดี", roman: "wat-dii", chinese: "嗨" },
            distinctionZh: "สวัสดี 更完整、更礼貌；หวัดดี 是口语缩略，商务或初次见面时不如前者安全。",
          },
        ],
        collocations: [
          { thai: "สวัสดีครับ", roman: "sawat-dii khrap", chinese: "你好（男性说话者）" },
          { thai: "สวัสดีค่ะ", roman: "sawat-dii kha", chinese: "你好（女性说话者）" },
        ],
        tags: ["greeting", "politeness"],
      },
      {
        id: "farewell",
        chinese: "再见；结束互动时的礼貌告别",
        english: "goodbye; a polite closing greeting",
        register: "polite",
        examples: [
          {
            thai: "ถ้าไม่มีคำถามเพิ่มเติมแล้ว สวัสดีครับ แล้วพบกันในการประชุมครั้งหน้า",
            roman: "thaa mai mii kham-thaam phoem-dtoem laaeo, sawat-dii khrap, laaeo phop gan nai gaan-bpra-chum khrang naa",
            chinese: "如果没有其他问题了，再见，我们下次会议见。",
            english: "If there are no further questions, goodbye, and see you at the next meeting.",
            grammarIds: ["condition-time-clauses", "negation-mai-mii", "reciprocal-gan-duai"],
          },
        ],
        synonyms: [
          { thai: "แล้วพบกัน", roman: "laaeo phop gan", chinese: "回头见；再会" },
          { thai: "แล้วเจอกัน", roman: "laaeo juuhr gan", chinese: "再见；待会儿见", notesZh: "更口语。" },
        ],
        antonyms: [
          { thai: "ยินดีต้อนรับ", roman: "yin-dii dtaawn-rap", chinese: "欢迎" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ลาก่อน", roman: "laa-gaawn", chinese: "告别" },
            distinctionZh: "ลาก่อน 的告别感更强，像较长时间不见；สวัสดี 作为结尾更中性。",
          },
        ],
        tags: ["farewell", "politeness"],
      },
    ],
    synonyms: [
      { thai: "หวัดดี", roman: "wat-dii", chinese: "嗨；你好" },
      { thai: "แล้วพบกัน", roman: "laaeo phop gan", chinese: "再会" },
    ],
    antonyms: [
      { thai: "ยินดีต้อนรับ", roman: "yin-dii dtaawn-rap", chinese: "欢迎" },
    ],
    comparisons: [],
    registers: ["polite"],
    collocations: [
      { thai: "สวัสดีตอนเช้า", roman: "sawat-dii dtaawn chaao", chinese: "早上好" },
    ],
    learningNotesZh: ["这个词可以开场也可以收尾；正式场景加 ครับ/ค่ะ 最自然。"],
    sourceRefs: POLITE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-kho-thot",
    vocabularyId: "kho-thot",
    thai: "ขอโทษ",
    roman: "khaaw-thoot",
    chinese: "对不起；不好意思",
    english: "sorry; excuse me",
    senses: [
      {
        id: "apology",
        chinese: "对不起；为已经发生的行为道歉",
        english: "sorry; to apologize for something that happened",
        register: "polite",
        examples: [
          {
            thai: "ขอโทษที่ส่งเอกสารช้าค่ะ เพราะต้องรอข้อมูลจากฝ่ายบัญชีก่อน",
            roman: "khaaw-thoot thii song eek-ga-saan chaa kha, phraw dtawng raaw khaaw-muun jaak faai ban-chii gaawn",
            chinese: "抱歉文件发晚了，因为必须先等会计部门的数据。",
            english: "Sorry for sending the documents late, because I had to wait for the accounting department's data first.",
            grammarIds: ["relative-thii", "conjunction-contrast-reason", "modal-need-should"],
          },
        ],
        synonyms: [
          { thai: "ขออภัย", roman: "khaaw a-phai", chinese: "致歉；抱歉", notesZh: "更正式，公告和商务邮件常见。" },
          { thai: "โทษที", roman: "thoot thii", chinese: "抱歉", notesZh: "更口语。" },
        ],
        antonyms: [
          { thai: "ไม่เป็นไร", roman: "mai bpen rai", chinese: "没关系" },
        ],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ขออภัย", roman: "khaaw a-phai", chinese: "致歉" },
            distinctionZh: "ขอโทษ 是日常礼貌道歉；ขออภัย 更正式，适合公告、邮件、客户沟通。",
          },
        ],
        collocations: [
          { thai: "ขอโทษที่...", roman: "khaaw-thoot thii...", chinese: "为……道歉" },
          { thai: "ต้องขอโทษด้วย", roman: "dtawng khaaw-thoot duai", chinese: "必须表示歉意；实在抱歉" },
        ],
        tags: ["apology", "politeness"],
      },
      {
        id: "attention",
        chinese: "不好意思；打扰一下，用来开启请求或询问",
        english: "excuse me; to get attention before a request or question",
        register: "polite",
        examples: [
          {
            thai: "ขอโทษนะครับ ถ้าผมจะไปสถานีรถไฟ ต้องเดินไปทางไหน",
            roman: "khaaw-thoot na khrap, thaa phom ja bpai sa-thaa-nii rot-fai, dtawng doen bpai thaang nai",
            chinese: "不好意思，如果我要去火车站，应该往哪个方向走？",
            english: "Excuse me, if I want to go to the train station, which way should I walk?",
            grammarIds: ["condition-time-clauses", "future-ja", "modal-need-should", "wh-questions"],
          },
        ],
        synonyms: [
          { thai: "รบกวน", roman: "rop-guan", chinese: "麻烦；打扰", notesZh: "更像“麻烦您……”。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "รบกวน", roman: "rop-guan", chinese: "麻烦" },
            distinctionZh: "ขอโทษนะครับ/ค่ะ 是先引起注意；รบกวน 更强调请求对方帮忙带来的打扰。",
          },
        ],
        tags: ["request", "politeness"],
      },
    ],
    synonyms: [
      { thai: "ขออภัย", roman: "khaaw a-phai", chinese: "致歉" },
      { thai: "รบกวน", roman: "rop-guan", chinese: "麻烦；打扰" },
    ],
    antonyms: [
      { thai: "ไม่เป็นไร", roman: "mai bpen rai", chinese: "没关系" },
    ],
    comparisons: [],
    registers: ["polite", "business-formal"],
    collocations: [
      { thai: "ขอโทษนะครับ", roman: "khaaw-thoot na khrap", chinese: "不好意思（男性说话者）" },
    ],
    learningNotesZh: ["这个词有两个常见义项：真道歉，或者只是礼貌地开启问题。例句要分开学。"],
    sourceRefs: POLITE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-dai",
    vocabularyId: "dai",
    thai: "ได้",
    roman: "dai",
    chinese: "可以；能；得到",
    english: "can; get",
    senses: [
      {
        id: "ability-permission",
        chinese: "能；可以；表示能力、许可或条件允许",
        english: "can; may; to be able or allowed to do something",
        register: "neutral",
        examples: [
          {
            thai: "ถ้าคุณฝึกอ่านป้ายทุกวัน คุณจะจำรูปคำได้เร็วขึ้นโดยไม่ต้องแปลทีละคำ",
            roman: "thaa khun fuek aan bpaai thuk wan, khun ja jam ruup-kham dai reo kheun dooi mai dtawng bplaae thii-la kham",
            chinese: "如果你每天练习读标牌，你会更快记住词形，而不必逐词翻译。",
            english: "If you practice reading signs every day, you will be able to remember word shapes faster without translating word by word.",
            grammarIds: ["condition-time-clauses", "future-ja", "modal-need-should", "adverbs-manner"],
          },
        ],
        synonyms: [
          { thai: "สามารถ", roman: "saa-maat", chinese: "能够", notesZh: "更正式，常见于书面或正式说明。" },
          { thai: "เป็น", roman: "bpen", chinese: "会某技能", notesZh: "只用于“会做某项技能”。" },
        ],
        antonyms: [
          { thai: "ไม่ได้", roman: "mai dai", chinese: "不能；不可以" },
          { thai: "ไม่ไหว", roman: "mai wai", chinese: "撑不住；做不动" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "เป็น", roman: "bpen", chinese: "会；懂得做" },
            distinctionZh: "พูดได้ 强调能说/可以说；พูดเป็น 强调掌握这项技能，常用于技能类动词。",
          },
        ],
        grammarIds: ["modal-dai-samart", "potential-dai"],
        tags: ["modal", "ability"],
      },
      {
        id: "receive-obtain",
        chinese: "得到；收到；获得某物或资格",
        english: "to get; receive; obtain something",
        register: "neutral",
        examples: [
          {
            thai: "หลังจากส่งเอกสารครบแล้ว บริษัทได้ใบอนุญาตภายในสองสัปดาห์",
            roman: "lang jaak song eek-ga-saan khrop laaeo, baw-ri-sat dai bai a-nu-yaat phaai-nai saawng sap-daa",
            chinese: "提交完整文件之后，公司在两周内拿到了许可证。",
            english: "After submitting all documents, the company obtained the permit within two weeks.",
            grammarIds: ["completion-laaeo", "adverbial-clauses-temporal"],
          },
        ],
        synonyms: [
          { thai: "ได้รับ", roman: "dai rap", chinese: "收到；获得", notesZh: "更正式，常用于通知、文件、福利。" },
        ],
        antonyms: [
          { thai: "เสีย", roman: "sia", chinese: "失去；损失" },
        ],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ได้รับ", roman: "dai rap", chinese: "获得；收到" },
            distinctionZh: "ได้ 很普通；ได้รับ 更正式，也更适合“获得批准/收到文件/得到服务”。",
          },
        ],
        tags: ["obtain", "business"],
      },
      {
        id: "achievement-experience",
        chinese: "得以；有机会做成某事，常带完成或经历感",
        english: "to get to do; to have the chance or successful completion of an action",
        register: "neutral",
        examples: [
          {
            thai: "เมื่อวานฉันได้คุยกับผู้จัดการโดยตรง จึงเข้าใจเหตุผลของการเปลี่ยนแผนมากขึ้น",
            roman: "muea-waan chan dai khui gap phuu-jat-gaan dooi dtrong, jeung khao-jai het-phon khaawng gaan bplian phaaen maak kheun",
            chinese: "昨天我得以直接和经理谈了，所以更理解改计划的原因。",
            english: "Yesterday I got to speak directly with the manager, so I understood the reason for the plan change better.",
            grammarIds: ["adverbs-manner", "conjunction-contrast-reason", "nominalization-gaan-khwaam"],
          },
        ],
        synonyms: [
          { thai: "มีโอกาส", roman: "mii oo-gaat", chinese: "有机会" },
        ],
        antonyms: [
          { thai: "ไม่ได้", roman: "mai dai", chinese: "没能；没有做成" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "เคย", roman: "khoei", chinese: "曾经" },
            distinctionZh: "ได้คุย 强调这次终于/得以谈到；เคยคุย 只说明过去有过这种经验。",
          },
        ],
        grammarIds: ["experience-khoei", "completion-laaeo"],
        tags: ["achievement", "experience"],
      },
    ],
    synonyms: [
      { thai: "สามารถ", roman: "saa-maat", chinese: "能够" },
      { thai: "ได้รับ", roman: "dai rap", chinese: "获得；收到" },
      { thai: "มีโอกาส", roman: "mii oo-gaat", chinese: "有机会" },
    ],
    antonyms: [
      { thai: "ไม่ได้", roman: "mai dai", chinese: "不能；没做成" },
      { thai: "เสีย", roman: "sia", chinese: "失去" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "mai-dai", thai: "ไม่ได้", roman: "mai dai", chinese: "不能；没有做成" },
        distinctionZh: "ไม่ได้ 的位置也会改变意思：ไปไม่ได้ 是不能去；ไม่ได้ไป 是没有去。",
      },
    ],
    registers: ["neutral", "business-formal"],
    collocations: [
      { thai: "ทำได้", roman: "tham dai", chinese: "做得到" },
      { thai: "ได้ไหม", roman: "dai mai", chinese: "可以吗？" },
      { thai: "ได้รับ", roman: "dai rap", chinese: "收到；获得" },
    ],
    learningNotesZh: ["ได้ 是高风险多义词，必须按位置和义项分开学：动词后多为能力/结果，名词前多为得到，动词前常有经历或完成感。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-bpen",
    vocabularyId: "bpen",
    thai: "เป็น",
    roman: "bpen",
    chinese: "是；成为；会某项技能",
    english: "to be; become; know how to do a skill",
    senses: [
      {
        id: "identity-category",
        chinese: "是；属于某身份、职业、类别或状态",
        english: "to be; to belong to an identity, role, category, or condition",
        register: "neutral",
        examples: [
          {
            thai: "ถึงแม้เขาจะเป็นนักเรียนใหม่ แต่เขาก็กล้าถามเมื่อไม่เข้าใจบทเรียน",
            roman: "thueng-maae khao ja bpen nak-riian mai, dtaae khao gaw glaa thaam muea mai khao-jai bot-riian",
            chinese: "虽然他是新学生，但不懂课文时他也敢提问。",
            english: "Although he is a new student, he dares to ask when he does not understand the lesson.",
            grammarIds: ["adverbial-clauses-logical", "challengeability-ko-non-temporal", "negation-mai"],
          },
        ],
        synonyms: [
          { thai: "คือ", roman: "khue", chinese: "即是；就是", notesZh: "更像定义或强调等同。" },
        ],
        antonyms: [
          { thai: "ไม่ใช่", roman: "mai chai", chinese: "不是" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { vocabularyId: "khue", thai: "คือ", roman: "khue", chinese: "是；即是" },
            distinctionZh: "เป็น 常用于身份、职业、类别、状态；คือ 更适合定义、解释、强调 A 就是 B。",
          },
        ],
        grammarIds: ["core-be-bpen-khue"],
        tags: ["copula", "identity"],
      },
      {
        id: "skill",
        chinese: "会；懂得做某项技能",
        english: "to know how to perform a skill",
        register: "neutral",
        examples: [
          {
            thai: "ถ้าอ่านพยัญชนะและสระเป็นแล้ว การสะกดคำใหม่จะไม่น่ากลัวเหมือนตอนเริ่มเรียน",
            roman: "thaa aan pha-yan-cha-na lae sa-ra bpen laaeo, gaan sa-got kham mai ja mai naa-glua muean dtaawn roem riian",
            chinese: "如果已经会读辅音和元音，拼新词就不会像刚开始学时那么可怕。",
            english: "If you already know how to read consonants and vowels, spelling new words will not feel as scary as when you first started learning.",
            grammarIds: ["condition-time-clauses", "completion-laaeo", "future-ja", "nominalization-gaan-khwaam"],
          },
        ],
        synonyms: [
          { thai: "ทำได้", roman: "tham dai", chinese: "做得到" },
          { thai: "สามารถ", roman: "saa-maat", chinese: "能够" },
        ],
        antonyms: [
          { thai: "ไม่เป็น", roman: "mai bpen", chinese: "不会；不懂怎么做" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { vocabularyId: "dai", thai: "ได้", roman: "dai", chinese: "能；可以" },
            distinctionZh: "อ่านเป็น 强调掌握读的技能；อ่านได้ 可以只是这次能读出来，语气更宽。",
          },
        ],
        grammarIds: ["potential-pen"],
        tags: ["skill"],
      },
      {
        id: "become-happen-condition",
        chinese: "变成；成为；出现某种情况",
        english: "to become; to turn into a condition or situation",
        register: "neutral",
        examples: [
          {
            thai: "ถ้าปล่อยให้ปัญหาเล็ก ๆ สะสมไปเรื่อย ๆ เรื่องนี้อาจเป็นปัญหาใหญ่ของทีมในภายหลัง",
            roman: "thaa bplaawy hai bpan-haa lek lek sa-som bpai rueai rueai, rueang nii aat bpen bpan-haa yai khaawng thiim nai phaai-lang",
            chinese: "如果让小问题不断累积，这件事以后可能会变成团队的大问题。",
            english: "If small problems are allowed to keep accumulating, this issue may become a major problem for the team later.",
            grammarIds: ["condition-time-clauses", "causative-hai", "modal-probability"],
          },
        ],
        synonyms: [
          { thai: "กลายเป็น", roman: "glaai bpen", chinese: "变成" },
        ],
        antonyms: [
          { thai: "คงเดิม", roman: "khong doem", chinese: "保持原样" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "กลายเป็น", roman: "glaai bpen", chinese: "变成" },
            distinctionZh: "กลายเป็น 明确强调变化过程；เป็น 可以只说明结果状态。",
          },
        ],
        tags: ["change", "state"],
      },
    ],
    synonyms: [
      { thai: "คือ", roman: "khue", chinese: "即是" },
      { thai: "กลายเป็น", roman: "glaai bpen", chinese: "变成" },
    ],
    antonyms: [
      { thai: "ไม่ใช่", roman: "mai chai", chinese: "不是" },
      { thai: "ไม่เป็น", roman: "mai bpen", chinese: "不会" },
    ],
    comparisons: [],
    registers: ["neutral"],
    collocations: [
      { thai: "เป็นอะไร", roman: "bpen arai", chinese: "怎么了；是什么" },
      { thai: "ทำเป็น", roman: "tham bpen", chinese: "会做" },
    ],
    learningNotesZh: ["เป็น 的“是”和“会”不是同一个义项；技能义项通常跟动作搭配，身份义项通常接名词/类别。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-yuu",
    vocabularyId: "yuu",
    thai: "อยู่",
    roman: "yuu",
    chinese: "在；住；正处于",
    english: "to be located; live; be in progress",
    senses: [
      {
        id: "location",
        chinese: "在；位于某处",
        english: "to be located at/in a place",
        register: "neutral",
        examples: [
          {
            thai: "ร้านที่เรานัดกันอยู่ตรงข้ามธนาคาร ถ้าคุณมาถึงแล้วให้โทรหาฉันได้เลย",
            roman: "raan thii rao nat gan yuu dtrong-khaam tha-naa-khaan, thaa khun maa thueng laaeo hai thoo haa chan dai loei",
            chinese: "我们约好的那家店在银行对面，如果你到了就可以直接给我打电话。",
            english: "The shop where we arranged to meet is across from the bank; if you arrive, you can call me right away.",
            grammarIds: ["relative-thii", "condition-time-clauses", "causative-hai"],
          },
        ],
        synonyms: [
          { thai: "ตั้งอยู่", roman: "dtang yuu", chinese: "坐落于；位于", notesZh: "较正式，多用于地点介绍。" },
        ],
        antonyms: [
          { thai: "ไม่อยู่", roman: "mai yuu", chinese: "不在" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "มี", roman: "mii", chinese: "有；存在" },
            distinctionZh: "อยู่ 说明某物/某人在某地；มี 更强调某地存在某物或拥有某物。",
          },
        ],
        grammarIds: ["core-location-yuu", "location-prepositions"],
        tags: ["location"],
      },
      {
        id: "progressive",
        chinese: "正在；表示动作或状态持续中",
        english: "currently; marking an action or state as ongoing",
        register: "neutral",
        examples: [
          {
            thai: "ตอนที่ลูกค้าโทรมา ทีมงานกำลังตรวจเอกสารอยู่ จึงยังตอบรายละเอียดทั้งหมดไม่ได้",
            roman: "dtaawn thii luuk-khaa thoo maa, thiim-ngaan gamlang dtruat eek-ga-saan yuu, jeung yang dtaawp raai-la-iiat thang-mot mai dai",
            chinese: "客户打电话来的时候，团队正在检查文件，所以还不能回答全部细节。",
            english: "When the client called, the team was checking the documents, so they could not yet answer all the details.",
            grammarIds: ["progressive-gamlang-yuu", "adverbial-clauses-temporal", "negation-mai-dai"],
          },
        ],
        synonyms: [
          { thai: "กำลัง", roman: "gamlang", chinese: "正在" },
        ],
        antonyms: [
          { thai: "เสร็จแล้ว", roman: "set laaeo", chinese: "已经完成" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "กำลัง", roman: "gamlang", chinese: "正在" },
            distinctionZh: "กำลัง 常放在动词前；อยู่ 常放在动词后。两者可合用：กำลังตรวจอยู่。",
          },
        ],
        grammarIds: ["progressive-gamlang-yuu"],
        tags: ["aspect", "progressive"],
      },
    ],
    synonyms: [
      { thai: "ตั้งอยู่", roman: "dtang yuu", chinese: "位于" },
      { thai: "กำลัง", roman: "gamlang", chinese: "正在" },
    ],
    antonyms: [
      { thai: "ไม่อยู่", roman: "mai yuu", chinese: "不在" },
      { thai: "เสร็จแล้ว", roman: "set laaeo", chinese: "已经完成" },
    ],
    comparisons: [],
    registers: ["neutral"],
    collocations: [
      { thai: "อยู่ที่ไหน", roman: "yuu thii nai", chinese: "在哪里" },
      { thai: "กำลัง...อยู่", roman: "gamlang...yuu", chinese: "正在……" },
    ],
    learningNotesZh: ["อยู่ 既能表示地点，也能表示动作正在进行；看它前后是不是地点短语或动作动词。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-bpai",
    vocabularyId: "bpai",
    thai: "ไป",
    roman: "bpai",
    chinese: "去",
    english: "to go",
    senses: [
      {
        id: "movement-away",
        chinese: "去；从说话者或当前参照点离开去某处",
        english: "to go; move away from the speaker or reference point",
        register: "neutral",
        examples: [
          {
            thai: "พรุ่งนี้เช้าฉันจะไปตลาดก่อนเข้าบริษัท เพราะต้องซื้อของให้แผนกต้อนรับ",
            roman: "phrung-nii chaao chan ja bpai dta-laat gaawn khao baw-ri-sat, phraw dtawng sue khaawng hai pha-naek dtaawn-rap",
            chinese: "明天早上我会先去市场再进公司，因为要给接待部门买东西。",
            english: "Tomorrow morning I will go to the market before entering the company because I need to buy things for reception.",
            grammarIds: ["future-ja", "adverbial-clauses-temporal", "conjunction-contrast-reason", "benefactive-hai"],
          },
        ],
        synonyms: [
          { thai: "เดินทางไป", roman: "doen-thaang bpai", chinese: "前往", notesZh: "更正式或强调行程。" },
        ],
        antonyms: [
          { vocabularyId: "maa", thai: "มา", roman: "maa", chinese: "来" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { vocabularyId: "maa", thai: "มา", roman: "maa", chinese: "来" },
            distinctionZh: "ไป 是离开参照点，มา 是朝参照点靠近；参照点可以是说话者、听话者或叙述中心。",
          },
        ],
        grammarIds: ["motion-direction-verbs"],
        tags: ["motion"],
      },
      {
        id: "excess-degree",
        chinese: "过于；太……了，放在形容词后表示超过合适程度",
        english: "too; excessively, placed after an adjective or verb-like adjective",
        register: "neutral",
        examples: [
          {
            thai: "ราคานี้แพงไปสำหรับนักเรียน ถ้าลดลงอีกหน่อยน่าจะขายได้ง่ายกว่า",
            roman: "raa-khaa nii phaaeng bpai sam-rap nak-riian, thaa lot long iik naawy naa ja khaai dai ngaai gwaa",
            chinese: "这个价格对学生来说太贵了，如果再降一点应该会更容易卖。",
            english: "This price is too expensive for students; if it drops a little more, it should sell more easily.",
            grammarIds: ["degree-basic", "condition-time-clauses", "comparison-gwaa", "modal-probability"],
          },
        ],
        synonyms: [
          { thai: "เกินไป", roman: "goen bpai", chinese: "过度；太过" },
        ],
        antonyms: [
          { thai: "พอดี", roman: "phaaw-dii", chinese: "刚好" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "มาก", roman: "maak", chinese: "很；多" },
            distinctionZh: "แพงมาก 只是很贵；แพงไป 表示贵到不合适或超出预期。",
          },
        ],
        grammarIds: ["degree-basic", "degree-negatives"],
        tags: ["degree"],
      },
    ],
    synonyms: [
      { thai: "เดินทางไป", roman: "doen-thaang bpai", chinese: "前往" },
      { thai: "เกินไป", roman: "goen bpai", chinese: "过度" },
    ],
    antonyms: [
      { vocabularyId: "maa", thai: "มา", roman: "maa", chinese: "来" },
      { thai: "พอดี", roman: "phaaw-dii", chinese: "刚好" },
    ],
    comparisons: [],
    registers: ["neutral"],
    collocations: [
      { thai: "ไปที่...", roman: "bpai thii...", chinese: "去……" },
      { thai: "แพงไป", roman: "phaaeng bpai", chinese: "太贵了" },
    ],
    learningNotesZh: ["ไป 不只表示方向，还常在形容词后表示“过于”。这两个义项需要分开练。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-maa",
    vocabularyId: "maa",
    thai: "มา",
    roman: "maa",
    chinese: "来",
    english: "to come",
    senses: [
      {
        id: "movement-toward",
        chinese: "来；朝说话者、听话者或叙述参照点移动",
        english: "to come; move toward the speaker, listener, or narrative reference point",
        register: "neutral",
        examples: [
          {
            thai: "ถ้าคุณมาถึงออฟฟิศแล้ว กรุณารอที่ชั้นล่างก่อน เพราะห้องประชุมยังไม่พร้อม",
            roman: "thaa khun maa thueng awf-fit laaeo, ga-ru-naa raaw thii chan laang gaawn, phraw haawng bpra-chum yang mai phraawm",
            chinese: "如果你到办公室了，请先在一楼等，因为会议室还没准备好。",
            english: "If you arrive at the office, please wait downstairs first because the meeting room is not ready yet.",
            grammarIds: ["condition-time-clauses", "completion-laaeo", "negation-yang-mai-mai-khoei"],
          },
        ],
        synonyms: [
          { thai: "มาถึง", roman: "maa thueng", chinese: "到达" },
        ],
        antonyms: [
          { vocabularyId: "bpai", thai: "ไป", roman: "bpai", chinese: "去" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { vocabularyId: "bpai", thai: "ไป", roman: "bpai", chinese: "去" },
            distinctionZh: "มา/ไป 的选择取决于叙述参照点，不只是中文的“来/去”一一对应。",
          },
        ],
        grammarIds: ["motion-direction-verbs"],
        tags: ["motion"],
      },
      {
        id: "elapsed-experience",
        chinese: "以来；表示动作持续到现在或过去积累出的经历",
        english: "for/since; marking elapsed experience leading up to now",
        register: "neutral",
        examples: [
          {
            thai: "ฉันเรียนภาษาไทยมาเกือบหนึ่งปีแล้ว แต่ยังต้องฝึกฟังข่าวจริงให้มากขึ้น",
            roman: "chan riian phaa-saa thai maa gueap nueng bpii laaeo, dtaae yang dtawng fuek fang khaao jing hai maak kheun",
            chinese: "我学泰语快一年了，但还需要更多练习听真实新闻。",
            english: "I have been studying Thai for almost a year, but I still need to practice listening to real news more.",
            grammarIds: ["elapsed-maa-laaeo", "completion-laaeo", "modal-need-should", "causative-hai"],
          },
        ],
        synonyms: [
          { thai: "เป็นเวลา", roman: "bpen wee-laa", chinese: "历时；长达", notesZh: "更正式，常接时间长度。" },
        ],
        antonyms: [
          { thai: "เพิ่ง", roman: "pheung", chinese: "刚刚" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "แล้ว", roman: "laaeo", chinese: "已经" },
            distinctionZh: "เรียนมา...แล้ว 强调从过去持续到现在；เรียนแล้ว 只说明已经学过/学完。",
          },
        ],
        grammarIds: ["elapsed-maa-laaeo", "recent-just-pheung"],
        tags: ["aspect", "elapsed-time"],
      },
    ],
    synonyms: [
      { thai: "มาถึง", roman: "maa thueng", chinese: "到达" },
      { thai: "เป็นเวลา", roman: "bpen wee-laa", chinese: "历时" },
    ],
    antonyms: [
      { vocabularyId: "bpai", thai: "ไป", roman: "bpai", chinese: "去" },
      { thai: "เพิ่ง", roman: "pheung", chinese: "刚刚" },
    ],
    comparisons: [],
    registers: ["neutral"],
    collocations: [
      { thai: "มาถึง", roman: "maa thueng", chinese: "到达" },
      { thai: "...มา...แล้ว", roman: "...maa...laaeo", chinese: "已经……了（持续到现在）" },
    ],
    learningNotesZh: ["มา 有方向义，也有时体义。看到动词后接时间再加 แล้ว，通常不是“来”，而是“已经……多久了”。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-tham",
    vocabularyId: "tham",
    thai: "ทำ",
    roman: "tham",
    chinese: "做；制作",
    english: "to do; make",
    senses: [
      {
        id: "do-work-action",
        chinese: "做；进行某项工作、任务或动作",
        english: "to do; carry out an action, task, or work",
        register: "neutral",
        examples: [
          {
            thai: "ก่อนส่งรายงานให้ลูกค้า ทีมงานต้องทำรายการตรวจสอบอีกครั้งเพื่อไม่ให้พลาดรายละเอียดสำคัญ",
            roman: "gaawn song raai-ngaan hai luuk-khaa, thiim-ngaan dtawng tham raai-gaan dtruat-saawp iik khrang phuea mai hai phlaat raai-la-iiat sam-khan",
            chinese: "把报告发给客户之前，团队必须再做一次检查清单，以免漏掉重要细节。",
            english: "Before sending the report to the client, the team must do the checklist again so that important details are not missed.",
            grammarIds: ["adverbial-clauses-temporal", "modal-need-should", "purpose-phuea", "causative-hai"],
          },
        ],
        synonyms: [
          { thai: "ปฏิบัติ", roman: "bpa-dti-bat", chinese: "执行；实践", notesZh: "更正式。" },
          { thai: "ดำเนินการ", roman: "dam-noen gaan", chinese: "办理；执行", notesZh: "商务/行政常见。" },
        ],
        antonyms: [
          { thai: "หยุด", roman: "yut", chinese: "停止" },
          { thai: "ละเลย", roman: "la-loei", chinese: "忽略；疏忽" },
        ],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ดำเนินการ", roman: "dam-noen gaan", chinese: "办理；执行" },
            distinctionZh: "ทำ 是普通“做”；ดำเนินการ 更正式，常用于流程、申请、行政办理。",
          },
        ],
        tags: ["action", "work"],
      },
      {
        id: "make-create",
        chinese: "制作；做出某物",
        english: "to make; create or prepare something",
        register: "neutral",
        examples: [
          {
            thai: "แม่ทำอาหารเย็นไว้ให้เราแล้ว ถึงจะกลับบ้านช้าก็ยังมีของกิน",
            roman: "maae tham aa-haan yen wai hai rao laaeo, thueng ja glap baan chaa gaw yang mii khaawng gin",
            chinese: "妈妈已经给我们做好晚饭了，即使晚回家也还有吃的。",
            english: "Mom has prepared dinner for us, so even if we come home late, there will still be food.",
            grammarIds: ["potential-wai", "benefactive-hai", "completion-laaeo", "adverbial-clauses-logical"],
          },
        ],
        synonyms: [
          { thai: "สร้าง", roman: "saang", chinese: "创造；建造" },
          { thai: "ผลิต", roman: "pha-lit", chinese: "生产" },
        ],
        antonyms: [
          { thai: "ทำลาย", roman: "tham-laai", chinese: "破坏" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "สร้าง", roman: "saang", chinese: "创造；建造" },
            distinctionZh: "ทำอาหาร/ทำงาน 用 ทำ；สร้าง 更偏创造、建立、建造，不能随便替换。",
          },
        ],
        tags: ["make", "create"],
      },
      {
        id: "causative",
        chinese: "使……；造成某结果，常见结构是 ทำให้",
        english: "to cause; make something happen, often in ทำให้",
        register: "neutral",
        examples: [
          {
            thai: "การอธิบายด้วยตัวอย่างจริงทำให้ผู้เรียนเข้าใจโครงสร้างประโยคได้ชัดเจนกว่าเดิม",
            roman: "gaan a-thi-baai duai dtua-yaang jing tham hai phuu-riian khao-jai khroong-saang bpra-yook dai chat-jeen gwaa doem",
            chinese: "用真实例子解释，会让学习者比以前更清楚地理解句子结构。",
            english: "Explaining with real examples makes learners understand sentence structure more clearly than before.",
            grammarIds: ["nominalization-gaan-khwaam", "causative-tham-hai", "comparison-gwaa"],
          },
        ],
        synonyms: [
          { thai: "ทำให้", roman: "tham hai", chinese: "使得；导致" },
          { thai: "ก่อให้เกิด", roman: "gaaw hai goet", chinese: "引起；造成", notesZh: "更正式。" },
        ],
        antonyms: [
          { thai: "ป้องกัน", roman: "bpaawng gan", chinese: "防止" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "ให้", roman: "hai", chinese: "让；给" },
            distinctionZh: "ทำให้ 强调造成结果；ให้ 可以表示让某人做、给某人、或为某人做，范围更广。",
          },
        ],
        grammarIds: ["causative-tham-hai"],
        tags: ["causative"],
      },
    ],
    synonyms: [
      { thai: "ปฏิบัติ", roman: "bpa-dti-bat", chinese: "执行" },
      { thai: "สร้าง", roman: "saang", chinese: "创造" },
      { thai: "ทำให้", roman: "tham hai", chinese: "使得" },
    ],
    antonyms: [
      { thai: "หยุด", roman: "yut", chinese: "停止" },
      { thai: "ทำลาย", roman: "tham-laai", chinese: "破坏" },
    ],
    comparisons: [],
    registers: ["neutral", "business-formal"],
    collocations: [
      { thai: "ทำงาน", roman: "tham-ngaan", chinese: "工作" },
      { thai: "ทำอาหาร", roman: "tham aa-haan", chinese: "做饭" },
      { thai: "ทำให้", roman: "tham hai", chinese: "使得；导致" },
    ],
    learningNotesZh: ["ทำ 是核心动词，义项会跟宾语变化：ทำงาน 是做工作，ทำอาหาร 是制作食物，ทำให้ 是使役结构。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
] satisfies VocabularyEnrichment[];
