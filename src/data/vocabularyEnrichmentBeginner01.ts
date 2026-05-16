import type { VocabularyEnrichment } from "./types";

const CORE_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thaipod101-core100"];
const SURVIVAL_REFS = ["loecsen-thai", "thaipod101-core100"];
const GRAMMAR_REFS = ["complete-thai-a1", "into-asia-grammar"];
const POLITE_REFS = ["thai-reference-polite-particles", "loecsen-thai", "thaipod101-core100"];

export const VOCABULARY_ENRICHMENT_BEGINNER_01 = [
  {
    id: "enrich-khop-khun",
    vocabularyId: "khop-khun",
    thai: "ขอบคุณ",
    roman: "khop-khun",
    chinese: "谢谢",
    english: "thank you",
    senses: [
      {
        id: "thanks",
        chinese: "谢谢；对帮助、礼物或服务表示感谢",
        english: "thank you; to express gratitude for help, a gift, or a service",
        register: "polite",
        examples: [
          {
            thai: "ขอบคุณมากนะคะที่ช่วยอธิบายวิธีซื้อตั๋วให้ฉันเข้าใจง่ายขึ้น",
            roman: "khop-khun maak na kha thii chuai a-thi-baai wi-thii sue dtua hai chan khao-jai ngaai kheun",
            chinese: "非常感谢你帮我解释买票的方法，让我更容易理解。",
            english: "Thank you very much for explaining how to buy a ticket so that I could understand it more easily.",
            grammarIds: ["relative-thii", "causative-tham-hai", "comparison-gwaa"],
          },
        ],
        synonyms: [
          { thai: "ขอบใจ", roman: "khawp-jai", chinese: "谢谢", notesZh: "较亲近或上对下，初学者在正式场合少用。" },
          { thai: "ขอบพระคุณ", roman: "khawp-phra-khun", chinese: "非常感谢；敬谢", notesZh: "更正式、更郑重。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ขอบใจ", roman: "khawp-jai", chinese: "谢谢" },
            distinctionZh: "ขอบคุณ 是通用安全的感谢；ขอบใจ 亲近感更强，不适合所有正式关系。",
          },
        ],
        collocations: [
          { thai: "ขอบคุณมาก", roman: "khop-khun maak", chinese: "非常感谢" },
          { thai: "ขอบคุณที่...", roman: "khop-khun thii...", chinese: "感谢……" },
        ],
        tags: ["politeness", "gratitude"],
      },
    ],
    synonyms: [
      { thai: "ขอบใจ", roman: "khawp-jai", chinese: "谢谢" },
      { thai: "ขอบพระคุณ", roman: "khawp-phra-khun", chinese: "敬谢；非常感谢" },
    ],
    antonyms: [],
    comparisons: [],
    registers: ["polite", "business-formal"],
    collocations: [
      { thai: "ขอบคุณครับ", roman: "khop-khun khrap", chinese: "谢谢（男性说话者）" },
      { thai: "ขอบคุณค่ะ", roman: "khop-khun kha", chinese: "谢谢（女性说话者）" },
    ],
    learningNotesZh: ["ขอบคุณ 后面常接 มาก 或 ที่...，用来把感谢的程度和原因说完整。"],
    sourceRefs: SURVIVAL_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-khrup",
    vocabularyId: "khrup",
    thai: "ครับ",
    roman: "khrap",
    chinese: "男性礼貌句末词",
    english: "male polite particle",
    senses: [
      {
        id: "male-politeness",
        chinese: "男性说话者放在句末，使陈述、回答或请求更礼貌",
        english: "a sentence-final particle used by male speakers to make statements, answers, or requests polite",
        register: "polite",
        examples: [
          {
            thai: "ผมขอถามอีกครั้งได้ไหมครับ เพราะยังไม่เข้าใจคำตอบสุดท้าย",
            roman: "phom khaaw thaam iik khrang dai mai khrap, phraw yang mai khao-jai kham-dtaawp sut-thaai",
            chinese: "我可以再问一次吗？因为我还不明白最后的答案。",
            english: "May I ask once more? I still do not understand the final answer.",
            grammarIds: ["yes-no-questions", "modal-dai-samart", "conjunction-contrast-reason"],
          },
        ],
        synonyms: [
          { thai: "ฮะ", roman: "ha", chinese: "男性口语礼貌词", notesZh: "更随意，正式场合不如 ครับ 稳妥。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ค่ะ", roman: "kha", chinese: "女性陈述礼貌句末词" },
            distinctionZh: "ครับ 常由男性说话者使用；ค่ะ/คะ 常由女性说话者使用，功能相近但说话者身份不同。",
          },
        ],
        collocations: [
          { thai: "ใช่ครับ", roman: "chai khrap", chinese: "是的（男）" },
          { thai: "ขอบคุณครับ", roman: "khop-khun khrap", chinese: "谢谢（男）" },
        ],
        grammarIds: ["polite-particles"],
        tags: ["particle", "male-speaker"],
      },
    ],
    synonyms: [{ thai: "ฮะ", roman: "ha", chinese: "男性口语礼貌词" }],
    antonyms: [],
    comparisons: [
      {
        kind: "register-pair",
        target: { thai: "ค่ะ", roman: "kha", chinese: "女性礼貌句末词" },
        distinctionZh: "ครับ 与 ค่ะ/คะ 都表达礼貌，主要区别是说话者常用身份和句型位置。",
      },
    ],
    registers: ["polite"],
    collocations: [
      { thai: "ครับผม", roman: "khrap phom", chinese: "好的；是的（男性较恭敬回答）" },
    ],
    learningNotesZh: ["ครับ 本身通常不翻译成具体词义，但会改变整句话的礼貌度。"],
    sourceRefs: POLITE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-kha",
    vocabularyId: "kha",
    thai: "ค่ะ",
    roman: "kha",
    chinese: "女性陈述/回答礼貌句末词",
    english: "female polite statement particle",
    senses: [
      {
        id: "female-statement-politeness",
        chinese: "女性说话者用于陈述或回答句末，表示礼貌、柔和",
        english: "a sentence-final particle used by female speakers in statements or answers to sound polite and soft",
        register: "polite",
        examples: [
          {
            thai: "ดิฉันจองห้องไว้แล้วค่ะ แต่ต้องการเปลี่ยนเวลาเช็กอินเป็นบ่ายสามโมง",
            roman: "di-chan jaawng haawng wai laaeo kha, dtaae dtawng-gaan bplian wee-laa chek-in bpen baai saam moong",
            chinese: "我已经订好房间了，但想把入住时间改成下午三点。",
            english: "I have already reserved a room, but I would like to change the check-in time to three in the afternoon.",
            grammarIds: ["completion-laaeo", "conjunction-contrast-reason", "predicate-bpen"],
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "คะ", roman: "kha", chinese: "女性疑问/呼唤礼貌词" },
            distinctionZh: "ค่ะ 常用于陈述和回答；คะ 常用于问题、呼唤或句中较高语调位置。",
          },
        ],
        collocations: [
          { thai: "ไม่ใช่ค่ะ", roman: "mai chai kha", chinese: "不是的（女）" },
          { thai: "ได้ค่ะ", roman: "dai kha", chinese: "可以的（女）" },
        ],
        grammarIds: ["polite-particles"],
        tags: ["particle", "female-speaker"],
      },
      {
        id: "female-question-form",
        chinese: "变体 คะ 用于女性说话者的问题或礼貌呼唤",
        english: "the variant คะ is used by female speakers in questions or polite calls for attention",
        register: "polite",
        examples: [
          {
            thai: "ขอโทษนะคะ สถานีรถไฟอยู่ไกลจากที่นี่ไหมคะ",
            roman: "khaaw-thoot na kha, sa-thaa-nii rot-fai yuu glai jaak thii-nii mai kha",
            chinese: "不好意思，火车站离这里远吗？",
            english: "Excuse me, is the train station far from here?",
            grammarIds: ["location-yuu", "yes-no-questions", "polite-particles"],
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "ค่ะ", roman: "kha", chinese: "女性陈述/回答礼貌词" },
            distinctionZh: "ถามว่า ... ไหมคะ 里的 คะ 配合疑问；ตอบว่า ใช่ค่ะ 里的 ค่ะ 配合回答。",
          },
        ],
        collocations: [
          { thai: "ไหมคะ", roman: "mai kha", chinese: "……吗（女）" },
          { thai: "นะคะ", roman: "na kha", chinese: "柔和礼貌语气（女）" },
        ],
        grammarIds: ["polite-particles", "yes-no-questions"],
        tags: ["particle", "question"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    registers: ["polite"],
    collocations: [
      { thai: "ค่ะ / คะ", roman: "kha / kha", chinese: "女性陈述/疑问礼貌词" },
      { thai: "นะคะ", roman: "na kha", chinese: "柔和请求或提醒" },
    ],
    learningNotesZh: ["同一个罗马音 kha 在泰文里有 ค่ะ 和 คะ 两个常见形式，初学时要按句型分开记。"],
    sourceRefs: POLITE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-chai",
    vocabularyId: "chai",
    thai: "ใช่",
    roman: "chai",
    chinese: "是；对",
    english: "yes; correct",
    senses: [
      {
        id: "yes-correct",
        chinese: "是的；对，用来确认事实、身份或判断",
        english: "yes; correct, used to confirm a fact, identity, or judgment",
        register: "neutral",
        examples: [
          {
            thai: "ใช่ครับ คนที่ยืนหน้าห้องคือครูภาษาไทยของเรา",
            roman: "chai khrap, khon thii yuen naa haawng khue khruu phaa-saa thai khaawng rao",
            chinese: "是的，站在教室前面的人就是我们的泰语老师。",
            english: "Yes, the person standing in front of the room is our Thai teacher.",
            grammarIds: ["relative-thii", "definition-khue", "polite-particles"],
          },
        ],
        synonyms: [
          { thai: "ถูก", roman: "thuuk", chinese: "正确" },
          { thai: "ถูกต้อง", roman: "thuuk-dtaawng", chinese: "正确无误", notesZh: "更正式或强调准确。" },
        ],
        antonyms: [{ thai: "ไม่ใช่", roman: "mai chai", chinese: "不是；不对" }],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "เป็น", roman: "bpen", chinese: "是；成为" },
            distinctionZh: "ใช่ 常作为确认答案；เป็น 是谓语动词，直接连接身份、职业或类别。",
          },
        ],
        collocations: [
          { thai: "ใช่ไหม", roman: "chai mai", chinese: "对吗；是不是" },
          { thai: "ใช่แล้ว", roman: "chai laaeo", chinese: "没错；就是这样" },
        ],
        tags: ["answer", "confirmation"],
      },
    ],
    synonyms: [
      { thai: "ถูก", roman: "thuuk", chinese: "正确" },
      { thai: "ถูกต้อง", roman: "thuuk-dtaawng", chinese: "正确无误" },
    ],
    antonyms: [{ thai: "ไม่ใช่", roman: "mai chai", chinese: "不是；不对" }],
    comparisons: [],
    registers: ["neutral", "polite"],
    collocations: [
      { thai: "ใช่ครับ", roman: "chai khrap", chinese: "是的（男）" },
      { thai: "ใช่ค่ะ", roman: "chai kha", chinese: "是的（女）" },
    ],
    learningNotesZh: ["回答是不是类问题时，ใช่/ไม่ใช่ 比简单照搬中文“是/不是”更自然。"],
    sourceRefs: SURVIVAL_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-mai-chai",
    vocabularyId: "mai-chai",
    thai: "ไม่ใช่",
    roman: "mai chai",
    chinese: "不是；不对",
    english: "not be; no",
    senses: [
      {
        id: "not-correct-or-not-identity",
        chinese: "不是；不对，用来否认身份、事实或判断",
        english: "not; incorrect, used to deny identity, a fact, or a judgment",
        register: "neutral",
        examples: [
          {
            thai: "ไม่ใช่ค่ะ ร้านนี้ไม่ได้ขายกาแฟ แต่ขายชาและน้ำผลไม้",
            roman: "mai chai kha, raan nii mai dai khaai gaa-faae, dtaae khaai chaa lae naam phon-la-maai",
            chinese: "不是的，这家店不卖咖啡，而是卖茶和果汁。",
            english: "No, this shop does not sell coffee; it sells tea and fruit juice.",
            grammarIds: ["negation-mai", "conjunction-contrast-reason", "polite-particles"],
          },
        ],
        synonyms: [
          { thai: "ไม่ถูก", roman: "mai thuuk", chinese: "不正确" },
          { thai: "ผิด", roman: "phit", chinese: "错" },
        ],
        antonyms: [{ thai: "ใช่", roman: "chai", chinese: "是；对" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ไม่ถูก", roman: "mai thuuk", chinese: "不正确" },
            distinctionZh: "ไม่ใช่ 多否定身份、类别或回答“是不是”；ไม่ถูก 更强调答案、做法或信息不正确。",
          },
        ],
        collocations: [
          { thai: "ไม่ใช่คนไทย", roman: "mai chai khon thai", chinese: "不是泰国人" },
          { thai: "ไม่ใช่อย่างนั้น", roman: "mai chai yaang nan", chinese: "不是那样" },
        ],
        grammarIds: ["negation-mai"],
        tags: ["answer", "negation"],
      },
    ],
    synonyms: [
      { thai: "ไม่ถูก", roman: "mai thuuk", chinese: "不正确" },
      { thai: "ผิด", roman: "phit", chinese: "错" },
    ],
    antonyms: [{ thai: "ใช่", roman: "chai", chinese: "是；对" }],
    comparisons: [],
    registers: ["neutral", "polite"],
    collocations: [
      { thai: "ไม่ใช่ครับ", roman: "mai chai khrap", chinese: "不是的（男）" },
      { thai: "ไม่ใช่ค่ะ", roman: "mai chai kha", chinese: "不是的（女）" },
    ],
    learningNotesZh: ["ไม่ใช่ 是否定“是/对”，不要用来否定所有动词；普通动词通常直接在前面加 ไม่。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-mai-dai",
    vocabularyId: "mai-dai",
    thai: "ไม่ได้",
    roman: "mai dai",
    chinese: "不可以；不能；没有做成",
    english: "cannot; did not",
    senses: [
      {
        id: "cannot-not-allowed",
        chinese: "不能；不可以，表示能力、许可或条件不允许",
        english: "cannot; may not, expressing lack of ability, permission, or possibility",
        register: "neutral",
        examples: [
          {
            thai: "วันนี้ผมไปเรียนไม่ได้ครับ เพราะต้องพาแม่ไปโรงพยาบาลตอนเช้า",
            roman: "wan-nii phom bpai riian mai dai khrap, phraw dtawng phaa maae bpai roong-pha-yaa-baan dtaawn chaao",
            chinese: "今天我不能去上课，因为早上必须带妈妈去医院。",
            english: "I cannot go to class today because I have to take my mother to the hospital in the morning.",
            grammarIds: ["modal-dai-samart", "conjunction-contrast-reason", "modal-need-should"],
          },
        ],
        synonyms: [
          { thai: "ไม่สามารถ", roman: "mai saa-maat", chinese: "不能够", notesZh: "更正式。" },
          { thai: "ทำไม่ไหว", roman: "tham mai wai", chinese: "做不动；撑不住" },
        ],
        antonyms: [{ thai: "ได้", roman: "dai", chinese: "能；可以" }],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ไม่สามารถ", roman: "mai saa-maat", chinese: "不能够" },
            distinctionZh: "ไม่ได้ 更日常；ไม่สามารถ 常见于正式通知、规则和书面说明。",
          },
        ],
        collocations: [
          { thai: "ไปไม่ได้", roman: "bpai mai dai", chinese: "不能去" },
          { thai: "ใช้ไม่ได้", roman: "chai mai dai", chinese: "不能用；不好用" },
        ],
        grammarIds: ["modal-dai-samart", "negation-mai"],
        tags: ["modal", "negation"],
      },
      {
        id: "did-not-do",
        chinese: "没有做；并非已经完成某动作",
        english: "did not do; indicates that an action was not performed or completed",
        register: "neutral",
        examples: [
          {
            thai: "เมื่อวานฉันไม่ได้กินข้าวเช้า จึงหิวมากก่อนถึงเวลาเรียน",
            roman: "muea-waan chan mai dai gin khaao chaao, jeung hiu maak gaawn thueng wee-laa riian",
            chinese: "昨天我没吃早饭，所以到上课时间前就很饿。",
            english: "Yesterday I did not eat breakfast, so I was very hungry before class time.",
            grammarIds: ["negation-mai", "conjunction-contrast-reason", "adverbial-clauses-temporal"],
          },
        ],
        synonyms: [{ thai: "ยังไม่ได้", roman: "yang mai dai", chinese: "还没有" }],
        antonyms: [{ thai: "แล้ว", roman: "laaeo", chinese: "已经；了" }],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "ไม่กิน", roman: "mai gin", chinese: "不吃" },
            distinctionZh: "ไม่ได้กิน 常指某次没有吃；ไม่กิน 可表示不吃某物或习惯上不吃。",
          },
        ],
        collocations: [
          { thai: "ไม่ได้ทำ", roman: "mai dai tham", chinese: "没有做" },
          { thai: "ไม่ได้พูด", roman: "mai dai phuut", chinese: "没有说" },
        ],
        grammarIds: ["negation-mai"],
        tags: ["past-negation"],
      },
    ],
    synonyms: [
      { thai: "ไม่สามารถ", roman: "mai saa-maat", chinese: "不能够" },
      { thai: "ยังไม่ได้", roman: "yang mai dai", chinese: "还没有" },
    ],
    antonyms: [{ thai: "ได้", roman: "dai", chinese: "能；可以；做成" }],
    comparisons: [],
    registers: ["neutral", "business-formal"],
    collocations: [
      { thai: "ไม่ได้ครับ", roman: "mai dai khrap", chinese: "不可以；不能（男）" },
      { thai: "ไม่ได้ค่ะ", roman: "mai dai kha", chinese: "不可以；不能（女）" },
    ],
    learningNotesZh: ["ไม่ได้ 可以是否定能力/许可，也可以表示“没有做某事”；看它放在动词前还是动词后。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-tok-long",
    vocabularyId: "tok-long",
    thai: "ตกลง",
    roman: "dtok-long",
    chinese: "好；同意；成交",
    english: "okay; agree",
    senses: [
      {
        id: "agree-okay",
        chinese: "好；同意别人的建议、安排或请求",
        english: "okay; to agree to someone else's suggestion, arrangement, or request",
        register: "neutral",
        examples: [
          {
            thai: "ตกลงครับ พรุ่งนี้เราพบกันที่สถานีรถไฟตอนแปดโมงครึ่ง",
            roman: "dtok-long khrap, phrung-nii rao phop gan thii sa-thaa-nii rot-fai dtaawn bpaaet moong khrueng",
            chinese: "好的，明天我们八点半在火车站见。",
            english: "Okay, tomorrow we will meet at the train station at half past eight.",
            grammarIds: ["future-ja", "location-yuu", "quantity-price-time-questions"],
          },
        ],
        synonyms: [
          { thai: "ได้", roman: "dai", chinese: "可以；行" },
          { thai: "โอเค", roman: "oo-khee", chinese: "OK", notesZh: "口语外来词。" },
        ],
        antonyms: [
          { thai: "ไม่ตกลง", roman: "mai dtok-long", chinese: "不同意" },
          { thai: "ปฏิเสธ", roman: "bpa-dti-seet", chinese: "拒绝", notesZh: "更正式。" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ได้", roman: "dai", chinese: "可以；行" },
            distinctionZh: "ตกลง 更像确认双方安排；ได้ 也可只是表示能力或许可。",
          },
        ],
        collocations: [
          { thai: "ตกลงไหม", roman: "dtok-long mai", chinese: "同意吗；可以吗" },
          { thai: "ตกลงกัน", roman: "dtok-long gan", chinese: "彼此达成一致" },
        ],
        tags: ["agreement", "survival"],
      },
      {
        id: "settle-conclude",
        chinese: "达成协议；敲定安排或条件",
        english: "to settle or conclude an agreement, plan, or terms",
        register: "neutral",
        examples: [
          {
            thai: "หลังจากคุยกันครึ่งชั่วโมง เราตกลงราคาห้องพักได้ที่คืนละหนึ่งพันบาท",
            roman: "lang jaak khui gan khrueng chua-moong, rao dtok-long raa-khaa haawng-phak dai thii kheun la neung phan baat",
            chinese: "谈了半小时以后，我们把房间价格谈定为每晚一千铢。",
            english: "After talking for half an hour, we settled the room price at one thousand baht per night.",
            grammarIds: ["adverbial-clauses-temporal", "reciprocal-gan-duai", "quantity-price-time-questions"],
          },
        ],
        synonyms: [
          { thai: "ตกลงกัน", roman: "dtok-long gan", chinese: "达成一致" },
          { thai: "เห็นด้วย", roman: "hen duai", chinese: "同意；赞同" },
        ],
        antonyms: [{ thai: "ขัดแย้ง", roman: "khat-yaeng", chinese: "有冲突；意见不合" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "เห็นด้วย", roman: "hen duai", chinese: "赞同" },
            distinctionZh: "เห็นด้วย 偏观点赞同；ตกลง 可用于价格、时间、计划等具体安排。",
          },
        ],
        collocations: [
          { thai: "ตกลงราคา", roman: "dtok-long raa-khaa", chinese: "谈定价格" },
          { thai: "ตกลงเวลา", roman: "dtok-long wee-laa", chinese: "敲定时间" },
        ],
        tags: ["agreement", "planning"],
      },
    ],
    synonyms: [
      { thai: "โอเค", roman: "oo-khee", chinese: "OK" },
      { thai: "เห็นด้วย", roman: "hen duai", chinese: "同意；赞同" },
    ],
    antonyms: [
      { thai: "ไม่ตกลง", roman: "mai dtok-long", chinese: "不同意" },
      { thai: "ปฏิเสธ", roman: "bpa-dti-seet", chinese: "拒绝" },
    ],
    comparisons: [],
    registers: ["neutral", "polite"],
    collocations: [
      { thai: "ตกลงครับ", roman: "dtok-long khrap", chinese: "好的（男）" },
      { thai: "ตกลงค่ะ", roman: "dtok-long kha", chinese: "好的（女）" },
    ],
    learningNotesZh: ["ตกลง 可作一句“好/成交”，也可带宾语表示“谈定价格、时间、条件”。"],
    sourceRefs: SURVIVAL_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-chan",
    vocabularyId: "chan",
    thai: "ฉัน",
    roman: "chan",
    chinese: "我",
    english: "I; me",
    senses: [
      {
        id: "first-person-neutral",
        chinese: "我；常用于学习材料、女性或中性口语自称",
        english: "I; me, often used in learning materials and by female or neutral informal speakers",
        register: "neutral",
        examples: [
          {
            thai: "ฉันเรียนภาษาไทยทุกวัน เพราะอยากพูดกับเพื่อนคนไทยได้มากขึ้น",
            roman: "chan riian phaa-saa thai thuk wan, phraw yaak phuut gap phuean khon thai dai maak kheun",
            chinese: "我每天学泰语，因为想能和泰国朋友说更多话。",
            english: "I study Thai every day because I want to be able to speak more with my Thai friends.",
            grammarIds: ["conjunction-contrast-reason", "modal-dai-samart", "comparison-gwaa"],
          },
        ],
        synonyms: [
          { thai: "ผม", roman: "phom", chinese: "我（男性常用）" },
          { thai: "ดิฉัน", roman: "di-chan", chinese: "我（女性正式）" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ดิฉัน", roman: "di-chan", chinese: "我（女性正式）" },
            distinctionZh: "ฉัน 更日常；ดิฉัน 更正式，女性在电话、会议或服务场景中更常用。",
          },
        ],
        collocations: [
          { thai: "ฉันชื่อ...", roman: "chan chue...", chinese: "我叫……" },
          { thai: "ของฉัน", roman: "khaawng chan", chinese: "我的" },
        ],
        tags: ["pronoun", "first-person"],
      },
    ],
    synonyms: [
      { thai: "ผม", roman: "phom", chinese: "我（男性）" },
      { thai: "ดิฉัน", roman: "di-chan", chinese: "我（女性正式）" },
    ],
    antonyms: [],
    comparisons: [],
    registers: ["neutral", "casual"],
    collocations: [
      { thai: "ฉันไม่เข้าใจ", roman: "chan mai khao-jai", chinese: "我不明白" },
      { thai: "ฉันชอบ...", roman: "chan chaawp...", chinese: "我喜欢……" },
    ],
    learningNotesZh: ["泰语自称会随性别、关系和场景变化；ฉัน 在教材里很常见，但正式服务场景可换成 ผม/ดิฉัน。"],
    sourceRefs: CORE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-phom",
    vocabularyId: "phom",
    thai: "ผม",
    roman: "phom",
    chinese: "我（男性常用）",
    english: "I; me (male)",
    senses: [
      {
        id: "male-first-person",
        chinese: "我；男性说话者常用自称，可用于礼貌日常和正式场景",
        english: "I; me, a common first-person pronoun for male speakers in polite daily and formal settings",
        register: "polite",
        examples: [
          {
            thai: "ผมชื่ออนันต์ครับ และผมทำงานที่บริษัทท่องเที่ยวใกล้สถานีรถไฟ",
            roman: "phom chue a-nan khrap, lae phom tham-ngaan thii baw-ri-sat thaawng-thiao glai sa-thaa-nii rot-fai",
            chinese: "我叫 Anan，我在火车站附近的一家旅游公司工作。",
            english: "My name is Anan, and I work at a travel company near the train station.",
            grammarIds: ["polite-particles", "location-yuu", "conjunction-lae"],
          },
        ],
        synonyms: [
          { thai: "ฉัน", roman: "chan", chinese: "我" },
          { thai: "เรา", roman: "rao", chinese: "我（口语）；我们" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ดิฉัน", roman: "di-chan", chinese: "我（女性正式）" },
            distinctionZh: "ผม 通常由男性说话者使用；ดิฉัน 通常由女性说话者在较正式语境使用。",
          },
        ],
        collocations: [
          { thai: "ผมชื่อ...", roman: "phom chue...", chinese: "我叫……（男）" },
          { thai: "ของผม", roman: "khaawng phom", chinese: "我的（男）" },
        ],
        tags: ["pronoun", "male-speaker"],
      },
    ],
    synonyms: [
      { thai: "ฉัน", roman: "chan", chinese: "我" },
      { thai: "เรา", roman: "rao", chinese: "我（口语）；我们" },
    ],
    antonyms: [],
    comparisons: [],
    registers: ["polite", "business-formal"],
    collocations: [
      { thai: "ผมครับ", roman: "phom khrap", chinese: "是我（男，礼貌回答）" },
      { thai: "ผมไม่ทราบ", roman: "phom mai saap", chinese: "我不知道（男，较礼貌）" },
    ],
    learningNotesZh: ["男性初学者在多数礼貌场景用 ผม + ครับ 很稳妥。"],
    sourceRefs: CORE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-khun",
    vocabularyId: "khun",
    thai: "คุณ",
    roman: "khun",
    chinese: "你；您",
    english: "you",
    senses: [
      {
        id: "second-person",
        chinese: "你；您，用来礼貌称呼对方",
        english: "you; a polite second-person pronoun",
        register: "polite",
        examples: [
          {
            thai: "คุณอยากดื่มน้ำหรือกาแฟก่อนเริ่มเรียนไหมครับ",
            roman: "khun yaak duuem naam rue gaa-faae gaawn roem riian mai khrap",
            chinese: "您想在开始上课前喝水还是咖啡吗？",
            english: "Would you like to drink water or coffee before starting class?",
            grammarIds: ["yes-no-questions", "choice-questions-rue", "polite-particles"],
          },
        ],
        synonyms: [
          { thai: "เธอ", roman: "thuuhr", chinese: "你", notesZh: "更亲近或同辈，正式度较低。" },
          { thai: "ท่าน", roman: "than", chinese: "您；阁下", notesZh: "更正式、更尊敬。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "เธอ", roman: "thuuhr", chinese: "你" },
            distinctionZh: "คุณ 比 เธอ 更中性礼貌；เธอ 适合朋友、同辈或亲近关系。",
          },
        ],
        collocations: [
          { thai: "คุณชื่ออะไร", roman: "khun chue a-rai", chinese: "你叫什么名字" },
          { thai: "ของคุณ", roman: "khaawng khun", chinese: "你的；您的" },
        ],
        tags: ["pronoun", "second-person"],
      },
      {
        id: "honorific-title",
        chinese: "先生/女士；放在人名前作礼貌称呼",
        english: "Mr./Ms.; a polite title placed before a person's name",
        register: "polite",
        examples: [
          {
            thai: "คุณมาลีจะมาถึงสำนักงานประมาณสิบโมง ถ้ามีเอกสารด่วนกรุณาวางไว้บนโต๊ะ",
            roman: "khun maa-lii ja maa thueng sam-nak-ngaan bpra-maan sip moong, thaa mii eek-ga-saan duan ga-ru-naa waang wai bon dto",
            chinese: "Mali 女士大约十点到办公室；如果有紧急文件，请放在桌上。",
            english: "Ms. Mali will arrive at the office around ten; if there are urgent documents, please leave them on the desk.",
            grammarIds: ["future-ja", "condition-time-clauses", "quantity-price-time-questions"],
          },
        ],
        synonyms: [
          { thai: "นาย", roman: "naai", chinese: "先生；男子称谓" },
          { thai: "นางสาว", roman: "naang-saao", chinese: "小姐；女士称谓" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ท่าน", roman: "than", chinese: "阁下；您" },
            distinctionZh: "คุณ + 名字是日常礼貌称呼；ท่าน 更正式，常见于公告、主持或尊称。",
          },
        ],
        collocations: [
          { thai: "คุณสมชาย", roman: "khun som-chaai", chinese: "Somchai 先生" },
          { thai: "คุณหมอ", roman: "khun maaw", chinese: "医生；医生先生/女士" },
        ],
        tags: ["title", "address"],
      },
    ],
    synonyms: [
      { thai: "เธอ", roman: "thuuhr", chinese: "你" },
      { thai: "ท่าน", roman: "than", chinese: "您；阁下" },
    ],
    antonyms: [],
    comparisons: [],
    registers: ["polite", "business-formal"],
    collocations: [
      { thai: "คุณครับ", roman: "khun khrap", chinese: "不好意思/先生（男说话者）" },
      { thai: "คุณคะ", roman: "khun kha", chinese: "不好意思/女士（女说话者）" },
    ],
    learningNotesZh: ["คุณ 既是“你/您”，也是姓名前的礼貌称呼，读句子时要看后面是否接人名或职业。"],
    sourceRefs: CORE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-khao",
    vocabularyId: "khao",
    thai: "เขา",
    roman: "khao",
    chinese: "他；她",
    english: "he; she",
    senses: [
      {
        id: "third-person",
        chinese: "他；她，用来指代第三人称，不标性别",
        english: "he; she, a gender-neutral third-person pronoun",
        register: "neutral",
        examples: [
          {
            thai: "เขาบอกว่าพรุ่งนี้จะมาเรียนสาย เพราะบ้านอยู่ไกลจากโรงเรียน",
            roman: "khao baawk waa phrung-nii ja maa riian saai, phraw baan yuu glai jaak roong-riian",
            chinese: "他说/她说明天会上课迟到，因为家离学校远。",
            english: "He or she said that they will come to class late tomorrow because their home is far from school.",
            grammarIds: ["complement-waa", "future-ja", "location-yuu"],
          },
        ],
        synonyms: [
          { thai: "เค้า", roman: "khao", chinese: "他/她（口语写法）", notesZh: "非正式拼写。" },
          { thai: "ท่าน", roman: "than", chinese: "他/她；您", notesZh: "尊称或正式指代。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ท่าน", roman: "than", chinese: "他/她；您" },
            distinctionZh: "เขา 是普通第三人称；ท่าน 更尊敬，常用于长辈、贵宾或正式文本。",
          },
        ],
        collocations: [
          { thai: "เขาชื่อ...", roman: "khao chue...", chinese: "他/她叫……" },
          { thai: "ของเขา", roman: "khaawng khao", chinese: "他的；她的" },
        ],
        tags: ["pronoun", "third-person"],
      },
    ],
    synonyms: [
      { thai: "เค้า", roman: "khao", chinese: "他/她（口语写法）" },
      { thai: "ท่าน", roman: "than", chinese: "他/她；您（尊称）" },
    ],
    antonyms: [],
    comparisons: [],
    registers: ["neutral", "casual"],
    collocations: [
      { thai: "เขาเป็น...", roman: "khao bpen...", chinese: "他/她是……" },
      { thai: "เขาไม่มา", roman: "khao mai maa", chinese: "他/她不来" },
    ],
    learningNotesZh: ["เขา 不区分“他/她”，中文翻译要从上下文判断性别，泰语本身通常不需要说明。"],
    sourceRefs: CORE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-rao",
    vocabularyId: "rao",
    thai: "เรา",
    roman: "rao",
    chinese: "我们；我（口语）",
    english: "we; informal I",
    senses: [
      {
        id: "we",
        chinese: "我们；说话者和其他人组成的一组人",
        english: "we; a group including the speaker",
        register: "neutral",
        examples: [
          {
            thai: "เย็นนี้เราจะไปกินข้าวกับครอบครัวที่ร้านใกล้บ้าน",
            roman: "yen nii rao ja bpai gin khaao gap khraawp-khrua thii raan glai baan",
            chinese: "今天傍晚我们要和家人在家附近的餐厅吃饭。",
            english: "This evening we will go eat with the family at a restaurant near home.",
            grammarIds: ["future-ja", "directional-verbs", "location-yuu"],
          },
        ],
        synonyms: [
          { thai: "พวกเรา", roman: "phuak rao", chinese: "我们大家", notesZh: "更明确表示复数群体。" },
        ],
        antonyms: [{ thai: "เขา", roman: "khao", chinese: "他/她；他们（口语中也可泛指对方群体）" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "พวกเรา", roman: "phuak rao", chinese: "我们大家" },
            distinctionZh: "เรา 可单复数依语境；พวกเรา 明确是“我们这一群”。",
          },
        ],
        collocations: [
          { thai: "บ้านเรา", roman: "baan rao", chinese: "我们家；我们国家" },
          { thai: "พวกเรา", roman: "phuak rao", chinese: "我们大家" },
        ],
        tags: ["pronoun", "first-person-plural"],
      },
      {
        id: "informal-i",
        chinese: "我；亲近口语中的自称，常给人柔和、随意的感觉",
        english: "I; an informal self-reference often used in close or casual speech",
        register: "casual",
        examples: [
          {
            thai: "เราไม่ค่อยเข้าใจบทนี้ เธอช่วยอธิบายอีกครั้งได้ไหม",
            roman: "rao mai khaawy khao-jai bot nii, thuuhr chuai a-thi-baai iik khrang dai mai",
            chinese: "我不太懂这一课，你能再帮我解释一次吗？",
            english: "I do not really understand this lesson; can you explain it to me once more?",
            grammarIds: ["degree-adverbs", "yes-no-questions", "modal-dai-samart"],
          },
        ],
        synonyms: [
          { thai: "ฉัน", roman: "chan", chinese: "我" },
          { thai: "ผม", roman: "phom", chinese: "我（男性）" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ฉัน", roman: "chan", chinese: "我" },
            distinctionZh: "เรา 作“我”时更口语、亲近；正式自我介绍不要优先用这个义项。",
          },
        ],
        collocations: [
          { thai: "เราเอง", roman: "rao eeng", chinese: "我自己；是我" },
        ],
        tags: ["pronoun", "casual"],
      },
    ],
    synonyms: [
      { thai: "พวกเรา", roman: "phuak rao", chinese: "我们大家" },
      { thai: "ฉัน", roman: "chan", chinese: "我" },
    ],
    antonyms: [],
    comparisons: [],
    registers: ["neutral", "casual"],
    collocations: [
      { thai: "เราจะ...", roman: "rao ja...", chinese: "我们/我要……" },
      { thai: "ของเรา", roman: "khaawng rao", chinese: "我们的；我的（口语）" },
    ],
    learningNotesZh: ["เรา 是初学者容易误判的词：可以是“我们”，在亲近口语中也可以是“我”。"],
    sourceRefs: CORE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-chue",
    vocabularyId: "chue",
    thai: "ชื่อ",
    roman: "chue",
    chinese: "名字；叫作",
    english: "name; be named",
    senses: [
      {
        id: "name-noun",
        chinese: "名字；人的姓名、物品或地方的名称",
        english: "name; the name of a person, thing, or place",
        register: "neutral",
        examples: [
          {
            thai: "กรุณาเขียนชื่อและเบอร์โทรศัพท์ของคุณให้ชัดเจนบนแบบฟอร์มนี้",
            roman: "ga-ru-naa khian chue lae buu thoo-ra-sap khaawng khun hai chat-jeen bon baaep-faawm nii",
            chinese: "请在这张表格上把您的姓名和电话号码写清楚。",
            english: "Please write your name and phone number clearly on this form.",
            grammarIds: ["conjunction-lae", "possessive-khaawng", "causative-tham-hai"],
          },
        ],
        synonyms: [
          { thai: "นาม", roman: "naam", chinese: "名；名称", notesZh: "较正式或书面。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "นาม", roman: "naam", chinese: "名；名称" },
            distinctionZh: "ชื่อ 是日常词；นาม 更书面，常见于正式名称或复合词。",
          },
        ],
        collocations: [
          { thai: "ชื่อจริง", roman: "chue jing", chinese: "本名；真名" },
          { thai: "ชื่อเล่น", roman: "chue len", chinese: "昵称；小名" },
        ],
        tags: ["identity", "noun"],
      },
      {
        id: "be-named",
        chinese: "叫作；名叫，用来介绍姓名或名称",
        english: "to be named; to be called, used to introduce a name",
        register: "neutral",
        examples: [
          {
            thai: "เด็กคนนี้ชื่อมานี และเธอเพิ่งเริ่มเรียนภาษาไทยเมื่อเดือนที่แล้ว",
            roman: "dek khon nii chue maa-nii, lae thuuhr phoeng roem riian phaa-saa thai muea duean thii laaeo",
            chinese: "这个孩子叫 Manee，她上个月刚开始学泰语。",
            english: "This child is named Manee, and she just started learning Thai last month.",
            grammarIds: ["classifier-noun-phrases", "conjunction-lae", "adverbial-clauses-temporal"],
          },
        ],
        synonyms: [
          { thai: "เรียกว่า", roman: "riiak waa", chinese: "称为；叫作" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "คือ", roman: "khue", chinese: "即是；就是" },
            distinctionZh: "ชื่อ 用于姓名/名称；คือ 用于定义、解释或强调“也就是”。",
          },
        ],
        collocations: [
          { thai: "ฉันชื่อ...", roman: "chan chue...", chinese: "我叫……" },
          { thai: "เขาชื่ออะไร", roman: "khao chue a-rai", chinese: "他/她叫什么名字" },
        ],
        tags: ["self-introduction", "predicate"],
      },
    ],
    synonyms: [
      { thai: "นาม", roman: "naam", chinese: "名；名称" },
      { thai: "เรียกว่า", roman: "riiak waa", chinese: "称为；叫作" },
    ],
    antonyms: [],
    comparisons: [],
    registers: ["neutral", "polite"],
    collocations: [
      { thai: "คุณชื่ออะไร", roman: "khun chue a-rai", chinese: "你叫什么名字" },
      { thai: "ชื่อภาษาไทย", roman: "chue phaa-saa thai", chinese: "泰文名；泰语名称" },
    ],
    learningNotesZh: ["ชื่อ 可当名词“名字”，也可直接作谓语“叫作”，自我介绍时不用 เป็น。"],
    sourceRefs: CORE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-khue",
    vocabularyId: "khue",
    thai: "คือ",
    roman: "khue",
    chinese: "是；即是",
    english: "be; namely",
    senses: [
      {
        id: "definition",
        chinese: "是；即是，用来给出定义、解释或身份说明",
        english: "is; namely, used to define, explain, or identify something",
        register: "neutral",
        examples: [
          {
            thai: "คำว่า น้ำใจ คือความช่วยเหลือที่ให้ผู้อื่นโดยไม่หวังผลตอบแทน",
            roman: "kham waa nam-jai khue khwaam chuai-luea thii hai phuu-uen dooi mai wang phon-dtaawp-thaaen",
            chinese: "“น้ำใจ”这个词指不求回报地给予他人的帮助。",
            english: "The word nam-jai means help given to others without expecting anything in return.",
            grammarIds: ["definition-khue", "relative-thii", "adverbs-manner"],
          },
        ],
        synonyms: [
          { thai: "หมายถึง", roman: "maai-thueng", chinese: "意思是；指的是" },
          { thai: "ได้แก่", roman: "dai-gaae", chinese: "包括；即", notesZh: "更书面，用于列举。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "เป็น", roman: "bpen", chinese: "是；成为" },
            distinctionZh: "คือ 偏定义和解释；เป็น 偏身份、类别、状态或职业。",
          },
        ],
        collocations: [
          { thai: "นี่คือ...", roman: "nii khue...", chinese: "这是……" },
          { thai: "สิ่งสำคัญคือ...", roman: "sing sam-khan khue...", chinese: "重要的是……" },
        ],
        grammarIds: ["definition-khue"],
        tags: ["definition", "core-verb"],
      },
      {
        id: "emphasis-identification",
        chinese: "就是；用于强调要说明的对象或结论",
        english: "it is; used to emphasize the item or conclusion being identified",
        register: "neutral",
        examples: [
          {
            thai: "ปัญหาหลักคือเรายังไม่มีข้อมูลพอ จึงตัดสินใจเรื่องราคาไม่ได้",
            roman: "bpan-haa lak khue rao yang mai mii khaaw-muun phaaw, jeung dtat-sin-jai rueang raa-khaa mai dai",
            chinese: "主要问题就是我们还没有足够的数据，所以不能决定价格。",
            english: "The main problem is that we still do not have enough data, so we cannot decide on the price.",
            grammarIds: ["definition-khue", "negation-mai-mii", "modal-dai-samart"],
          },
        ],
        synonyms: [
          { thai: "ก็คือ", roman: "gaaw khue", chinese: "也就是；就是" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ก็คือ", roman: "gaaw khue", chinese: "也就是" },
            distinctionZh: "ก็คือ 比 คือ 更有总结、解释前文的感觉。",
          },
        ],
        collocations: [
          { thai: "เหตุผลคือ...", roman: "het-phon khue...", chinese: "原因是……" },
          { thai: "คำตอบคือ...", roman: "kham-dtaawp khue...", chinese: "答案是……" },
        ],
        grammarIds: ["definition-khue"],
        tags: ["emphasis", "explanation"],
      },
    ],
    synonyms: [
      { thai: "หมายถึง", roman: "maai-thueng", chinese: "意思是" },
      { thai: "ก็คือ", roman: "gaaw khue", chinese: "也就是" },
    ],
    antonyms: [],
    comparisons: [],
    registers: ["neutral", "business-formal"],
    collocations: [
      { thai: "นี่คือ...", roman: "nii khue...", chinese: "这是……" },
      { thai: "คือว่า...", roman: "khue waa...", chinese: "就是说……；那个……" },
    ],
    learningNotesZh: ["คือ 很适合定义和解释，和 是/เป็น 的重叠不完全相同。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-mii",
    vocabularyId: "mii",
    thai: "มี",
    roman: "mii",
    chinese: "有；存在",
    english: "have; exist",
    senses: [
      {
        id: "have-possess",
        chinese: "有；拥有某物、关系、时间或机会",
        english: "to have; to possess something, a relationship, time, or an opportunity",
        register: "neutral",
        examples: [
          {
            thai: "วันนี้ฉันมีเวลาว่างหนึ่งชั่วโมงหลังเลิกงาน จึงอยากไปซื้อหนังสือภาษาไทย",
            roman: "wan-nii chan mii wee-laa waang neung chua-moong lang loek-ngaan, jeung yaak bpai sue nang-sue phaa-saa thai",
            chinese: "今天下班后我有一个小时空闲，所以想去买泰语书。",
            english: "Today I have one free hour after work, so I want to go buy a Thai book.",
            grammarIds: ["quantity-price-time-questions", "adverbial-clauses-temporal", "directional-verbs"],
          },
        ],
        synonyms: [
          { thai: "ครอบครอง", roman: "khraawp-khraawng", chinese: "拥有；占有", notesZh: "更正式或法律感。" },
        ],
        antonyms: [
          { thai: "ไม่มี", roman: "mai mii", chinese: "没有" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "เป็นเจ้าของ", roman: "bpen jao-khaawng", chinese: "是所有者" },
            distinctionZh: "มี 表示广义“有”；เป็นเจ้าของ 强调所有权。",
          },
        ],
        collocations: [
          { thai: "มีเวลา", roman: "mii wee-laa", chinese: "有时间" },
          { thai: "มีเพื่อน", roman: "mii phuean", chinese: "有朋友" },
        ],
        grammarIds: ["possession-mii"],
        tags: ["possession", "core-verb"],
      },
      {
        id: "exist-there-is",
        chinese: "有；存在某人、某物或某情况",
        english: "there is; there are, indicating existence of a person, thing, or situation",
        register: "neutral",
        examples: [
          {
            thai: "หน้าสถานีมีร้านอาหารเล็ก ๆ ที่เปิดตั้งแต่เช้าถึงดึก",
            roman: "naa sa-thaa-nii mii raan aa-haan lek lek thii bpoet dtang-dtaae chaao thueng duek",
            chinese: "车站前有一家从早到晚营业的小餐馆。",
            english: "In front of the station there is a small restaurant that is open from morning until late at night.",
            grammarIds: ["existential-mii", "relative-thii", "adverbial-clauses-temporal"],
          },
        ],
        synonyms: [
          { thai: "อยู่", roman: "yuu", chinese: "在；位于", notesZh: "强调位置或所在。" },
        ],
        antonyms: [{ thai: "ไม่มี", roman: "mai mii", chinese: "没有；不存在" }],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "อยู่", roman: "yuu", chinese: "在；位于" },
            distinctionZh: "มี 引入“有某物存在”；อยู่ 说明某物具体在哪里。",
          },
        ],
        collocations: [
          { thai: "มีคน", roman: "mii khon", chinese: "有人" },
          { thai: "มีปัญหา", roman: "mii bpan-haa", chinese: "有问题" },
        ],
        grammarIds: ["existential-mii"],
        tags: ["existence"],
      },
    ],
    synonyms: [
      { thai: "ครอบครอง", roman: "khraawp-khraawng", chinese: "拥有" },
      { thai: "อยู่", roman: "yuu", chinese: "在；位于" },
    ],
    antonyms: [{ thai: "ไม่มี", roman: "mai mii", chinese: "没有" }],
    comparisons: [],
    registers: ["neutral"],
    collocations: [
      { thai: "มีไหม", roman: "mii mai", chinese: "有吗" },
      { thai: "ไม่มี", roman: "mai mii", chinese: "没有" },
    ],
    learningNotesZh: ["มี 的两个初级核心义项是“拥有”和“存在”，否定形式 ไม่มี 很高频。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-gin",
    vocabularyId: "gin",
    thai: "กิน",
    roman: "gin",
    chinese: "吃",
    english: "eat",
    senses: [
      {
        id: "eat-food",
        chinese: "吃；摄入食物，日常口语最常用",
        english: "to eat; to consume food, the most common everyday verb",
        register: "neutral",
        examples: [
          {
            thai: "หลังเลิกเรียน เด็ก ๆ กินข้าวกับครอบครัวที่บ้านก่อนทำการบ้าน",
            roman: "lang loek-riian, dek dek gin khaao gap khraawp-khrua thii baan gaawn tham gaan-baan",
            chinese: "放学后，孩子们先在家和家人吃饭，然后做作业。",
            english: "After school, the children eat with their family at home before doing homework.",
            grammarIds: ["adverbial-clauses-temporal", "location-yuu", "serial-verb-constructions"],
          },
        ],
        synonyms: [
          { thai: "ทาน", roman: "thaan", chinese: "吃；用餐", notesZh: "更礼貌。" },
          { thai: "รับประทาน", roman: "rap-bpra-thaan", chinese: "用餐；食用", notesZh: "正式礼貌。" },
        ],
        antonyms: [
          { thai: "อดอาหาร", roman: "ot aa-haan", chinese: "禁食；不吃饭" },
        ],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ทาน", roman: "thaan", chinese: "吃；用餐" },
            distinctionZh: "กิน 是普通口语；ทาน 更礼貌，和不熟的人或服务场景更柔和。",
          },
        ],
        collocations: [
          { thai: "กินข้าว", roman: "gin khaao", chinese: "吃饭" },
          { thai: "กินอาหารเช้า", roman: "gin aa-haan chaao", chinese: "吃早饭" },
        ],
        tags: ["food", "daily-action"],
      },
      {
        id: "take-medicine",
        chinese: "服用；口服药物",
        english: "to take; to ingest medicine",
        register: "neutral",
        examples: [
          {
            thai: "ถ้าปวดหัวมาก ควรกินยาหลังอาหารและดื่มน้ำตามหนึ่งแก้ว",
            roman: "thaa bpuat hua maak, khuan gin yaa lang aa-haan lae duuem naam dtaam neung gaaeo",
            chinese: "如果头很痛，应该饭后吃药并跟着喝一杯水。",
            english: "If you have a bad headache, you should take medicine after food and drink one glass of water after it.",
            grammarIds: ["condition-time-clauses", "modal-need-should", "conjunction-lae"],
          },
        ],
        synonyms: [
          { thai: "รับประทานยา", roman: "rap-bpra-thaan yaa", chinese: "服药", notesZh: "更正式、更礼貌。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "รับประทานยา", roman: "rap-bpra-thaan yaa", chinese: "服药" },
            distinctionZh: "กินยา 是日常说法；รับประทานยา 更适合说明书、医护或正式建议。",
          },
        ],
        collocations: [
          { thai: "กินยา", roman: "gin yaa", chinese: "吃药；服药" },
          { thai: "กินหลังอาหาร", roman: "gin lang aa-haan", chinese: "饭后服用" },
        ],
        tags: ["health", "daily-action"],
      },
    ],
    synonyms: [
      { thai: "ทาน", roman: "thaan", chinese: "吃；用餐" },
      { thai: "รับประทาน", roman: "rap-bpra-thaan", chinese: "食用；用餐" },
    ],
    antonyms: [{ thai: "อดอาหาร", roman: "ot aa-haan", chinese: "禁食" }],
    comparisons: [],
    registers: ["neutral", "polite"],
    collocations: [
      { thai: "กินข้าว", roman: "gin khaao", chinese: "吃饭" },
      { thai: "กินยา", roman: "gin yaa", chinese: "吃药；服药" },
    ],
    learningNotesZh: ["กิน 不只用于食物，也常说 กินยา“吃药”；礼貌场景可换 ทาน。"],
    sourceRefs: CORE_REFS,
    reviewStatus: "human-draft",
  },
] satisfies VocabularyEnrichment[];
