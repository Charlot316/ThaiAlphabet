type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";

type VocabularyExpansionTheme =
  | "机场"
  | "公交火车"
  | "出租网约车"
  | "地址配送"
  | "退换售后"
  | "收据发票"
  | "银行支付"
  | "议价价格"
  | "酒店服务"
  | "服务请求";

type VocabularyExpansionExample = {
  thai: string;
  roman: string;
  chinese: string;
};

type VocabularyExpansionRelatedTerm = {
  candidateId?: string;
  thai: string;
  roman?: string;
  chinese?: string;
  notesZh?: string;
};

type VocabularyExpansionComparison = {
  kind: "near-synonym" | "antonym" | "confusable" | "register-pair" | "usage-pair";
  target: VocabularyExpansionRelatedTerm;
  distinctionZh: string;
};

type VocabularyExpansionCollocation = {
  thai: string;
  roman?: string;
  chinese: string;
  notesZh?: string;
};

type VocabularyExpansionSense = {
  id: string;
  chinese: string;
  examples: VocabularyExpansionExample[];
  usageNotesZh?: string[];
};

export type VocabularyExpansionCandidate = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  level: "a2";
  priority: number;
  senses: VocabularyExpansionSense[];
  synonyms: VocabularyExpansionRelatedTerm[];
  antonyms: VocabularyExpansionRelatedTerm[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  usageNotesZh: string[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: "candidate-draft";
};

const LEXICON_REFS = ["phupha-wordfreq", "pythainlp-corpus", "kaikki-wiktionary-thai"];
const TRAVEL_REFS = ["loecsen-thai", "thaipod101-core100", ...LEXICON_REFS];
const COMMERCE_REFS = ["thai-frequency", "thaipod101-core100", ...LEXICON_REFS];

export const VOCABULARY_EXPANSION_A2_TRAVEL_COMMERCE_02 = [
  {
    id: "thiaao-bin",
    thai: "เที่ยวบิน",
    roman: "thiaao-bin",
    chinese: "航班",
    partOfSpeech: "名词",
    theme: "机场",
    level: "a2",
    priority: 1,
    senses: [
      {
        id: "scheduled-flight",
        chinese: "按固定时间起飞和到达的一趟飞机服务",
        examples: [
          {
            thai: "เที่ยวบินไปเชียงใหม่วันนี้ออกตรงเวลา แต่ผู้โดยสารควรมาถึงสนามบินก่อนสองชั่วโมง",
            roman: "thiaao-bin bpai chiang-mai wan-nii aawk dtrong wee-laa, dtaae phuu-dooi-saan khuuan maa thueng sa-naam-bin gaawn saawng chua-moong",
            chinese: "今天去清迈的航班准时出发，但乘客应该提前两小时到机场。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ไฟลต์", roman: "fai", chinese: "航班", notesZh: "外来口语，机场和旅行对话中常见。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "saai-gaan-bin", thai: "สายการบิน", roman: "saai-gaan-bin", chinese: "航空公司" },
        distinctionZh: "เที่ยวบิน 是某一趟航班；สายการบิน 是运营航班的公司。",
      },
    ],
    collocations: [{ thai: "หมายเลขเที่ยวบิน", roman: "maai-leek thiaao-bin", chinese: "航班号" }],
    usageNotesZh: ["เที่ยว 可作量词表示一趟，เที่ยวบิน 合成后指飞机航班。"],
    tags: ["airport", "flight", "schedule"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "saai-gaan-bin",
    thai: "สายการบิน",
    roman: "saai-gaan-bin",
    chinese: "航空公司",
    partOfSpeech: "名词",
    theme: "机场",
    level: "a2",
    priority: 2,
    senses: [
      {
        id: "airline-company",
        chinese: "运营飞机航线和航班的公司",
        examples: [
          {
            thai: "สายการบินนี้อนุญาตให้โหลดกระเป๋าฟรีหนึ่งใบสำหรับผู้โดยสารต่างชาติ",
            roman: "saai-gaan-bin nii a-nu-yaat hai loot gra-bpao frii nueng bai sam-rap phuu-dooi-saan dtaang-chaat",
            chinese: "这家航空公司允许外国乘客免费托运一件行李。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "บริษัทการบิน", roman: "baaw-ri-sat gaan-bin", chinese: "航空公司", notesZh: "较正式，日常多说 สายการบิน。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "thiaao-bin", thai: "เที่ยวบิน", roman: "thiaao-bin", chinese: "航班" },
        distinctionZh: "สายการบิน 是公司；เที่ยวบิน 是公司运营的一趟飞机。",
      },
    ],
    collocations: [{ thai: "เคาน์เตอร์สายการบิน", roman: "khao-dtoe saai-gaan-bin", chinese: "航空公司柜台" }],
    usageNotesZh: ["สายการบิน 后面常接公司名，也可用来询问你坐哪家航空公司。"],
    tags: ["airport", "airline"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bpra-dtuu-kheun-khreuuang",
    thai: "ประตูขึ้นเครื่อง",
    roman: "bpra-dtuu-kheun-khreuuang",
    chinese: "登机口",
    partOfSpeech: "名词",
    theme: "机场",
    level: "a2",
    priority: 3,
    senses: [
      {
        id: "boarding-gate",
        chinese: "乘客等待并登机的机场登机口",
        examples: [
          {
            thai: "หลังผ่านด่านตรวจคนเข้าเมืองแล้ว ให้ดูหมายเลขประตูขึ้นเครื่องบนบัตรขึ้นเครื่อง",
            roman: "lang phaan daan dtruat khon khao mueang laaeo, hai duu maai-leek bpra-dtuu-kheun-khreuuang bon bat-kheun-khreuuang",
            chinese: "通过入境检查后，请查看登机牌上的登机口号码。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เกต", roman: "geet", chinese: "登机口", notesZh: "机场口语常用外来词。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "thaang-aawk", thai: "ทางออก", roman: "thaang-aawk", chinese: "出口" },
        distinctionZh: "ประตูขึ้นเครื่อง 专指登机口；ทางออก 是一般出口。",
      },
    ],
    collocations: [{ thai: "ประตูขึ้นเครื่องเปลี่ยน", roman: "bpra-dtuu-kheun-khreuuang bplian", chinese: "登机口变更" }],
    usageNotesZh: ["สนามบิน 里常把 ประตูขึ้นเครื่อง 简称为 gate/เกต。"],
    tags: ["airport", "boarding", "gate"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bat-kheun-khreuuang",
    thai: "บัตรขึ้นเครื่อง",
    roman: "bat-kheun-khreuuang",
    chinese: "登机牌",
    partOfSpeech: "名词",
    theme: "机场",
    level: "a2",
    priority: 4,
    senses: [
      {
        id: "boarding-pass",
        chinese: "办理登机后获得、用于登机的票证",
        examples: [
          {
            thai: "กรุณาเตรียมบัตรขึ้นเครื่องและหนังสือเดินทางก่อนเข้าคิวตรวจความปลอดภัย",
            roman: "ga-ru-naa dtriiam bat-kheun-khreuuang lae nang-sue-doen-thaang gaawn khao khiu dtruat khwaam-bplaawt-phai",
            chinese: "进入安检队伍前，请准备好登机牌和护照。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "บอร์ดดิ้งพาส", roman: "baawt-ding-phaat", chinese: "登机牌", notesZh: "外来词，机场工作人员也常用。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ตั๋วเครื่องบิน", roman: "dtua khreuuang-bin", chinese: "机票" },
        distinctionZh: "ตั๋วเครื่องบิน 是购买凭证；บัตรขึ้นเครื่อง 是办理登机后用于登机的凭证。",
      },
    ],
    collocations: [{ thai: "แสดงบัตรขึ้นเครื่อง", roman: "sa-daaeng bat-kheun-khreuuang", chinese: "出示登机牌" }],
    usageNotesZh: ["บัตรขึ้นเครื่อง 常和 หนังสือเดินทาง 一起出示。"],
    tags: ["airport", "boarding-pass", "document"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khao-dtoe-chek-in",
    thai: "เคาน์เตอร์เช็กอิน",
    roman: "khao-dtoe-chek-in",
    chinese: "值机柜台",
    partOfSpeech: "名词",
    theme: "机场",
    level: "a2",
    priority: 5,
    senses: [
      {
        id: "check-in-counter",
        chinese: "机场办理值机、托运行李和领取登机牌的柜台",
        examples: [
          {
            thai: "เคาน์เตอร์เช็กอินของสายการบินนี้เปิดก่อนเวลาออกเดินทางสามชั่วโมง",
            roman: "khao-dtoe-chek-in khaawng saai-gaan-bin nii bpoet gaawn wee-laa aawk doen-thaang saam chua-moong",
            chinese: "这家航空公司的值机柜台在出发前三小时开放。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เคาน์เตอร์สายการบิน", roman: "khao-dtoe saai-gaan-bin", chinese: "航空公司柜台" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "bpra-dtuu-kheun-khreuuang", thai: "ประตูขึ้นเครื่อง", roman: "bpra-dtuu-kheun-khreuuang", chinese: "登机口" },
        distinctionZh: "先到เคาน์เตอร์เช็กอิน 办手续，再去ประตูขึ้นเครื่อง 登机。",
      },
    ],
    collocations: [{ thai: "ไปที่เคาน์เตอร์เช็กอิน", roman: "bpai thii khao-dtoe-chek-in", chinese: "去值机柜台" }],
    usageNotesZh: ["เช็กอิน 是外来词，和 เคาน์เตอร์ 组合后非常常见。"],
    tags: ["airport", "check-in", "counter"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "loot-gra-bpao",
    thai: "โหลดกระเป๋า",
    roman: "loot-gra-bpao",
    chinese: "托运行李",
    partOfSpeech: "动词",
    theme: "机场",
    level: "a2",
    priority: 6,
    senses: [
      {
        id: "check-baggage",
        chinese: "把行李交给航空公司托运，不随身带上飞机",
        examples: [
          {
            thai: "ถ้ากระเป๋าหนักเกินเจ็ดกิโล คุณต้องโหลดกระเป๋าที่เคาน์เตอร์เช็กอิน",
            roman: "thaa gra-bpao nak goen jet gi-loo, khun dtawng loot-gra-bpao thii khao-dtoe-chek-in",
            chinese: "如果包超过七公斤，你必须在值机柜台托运行李。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ฝากกระเป๋าใต้เครื่อง", roman: "faak gra-bpao dtai khreuuang", chinese: "托运到飞机货舱", notesZh: "更口语地解释托运位置。" }],
    antonyms: [{ candidateId: "gra-bpao-thue-kheun-khreuuang", thai: "กระเป๋าถือขึ้นเครื่อง", roman: "gra-bpao-thue-kheun-khreuuang", chinese: "随身登机行李" }],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "gra-bpao-thue-kheun-khreuuang", thai: "กระเป๋าถือขึ้นเครื่อง", roman: "gra-bpao-thue-kheun-khreuuang", chinese: "随身登机行李" },
        distinctionZh: "โหลดกระเป๋า 是托运；กระเป๋าถือขึ้นเครื่อง 是带进客舱的行李。",
      },
    ],
    collocations: [{ thai: "น้ำหนักโหลดกระเป๋า", roman: "nam-nak loot-gra-bpao", chinese: "托运行李重量" }],
    usageNotesZh: ["โหลด 是外来动词，机场柜台高频使用。"],
    tags: ["airport", "baggage", "check-in"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "gra-bpao-thue-kheun-khreuuang",
    thai: "กระเป๋าถือขึ้นเครื่อง",
    roman: "gra-bpao-thue-kheun-khreuuang",
    chinese: "随身登机行李",
    partOfSpeech: "名词",
    theme: "机场",
    level: "a2",
    priority: 7,
    senses: [
      {
        id: "carry-on-bag",
        chinese: "乘客可以带上飞机客舱的行李",
        examples: [
          {
            thai: "กระเป๋าถือขึ้นเครื่องต้องมีขนาดไม่เกินที่สายการบินกำหนด",
            roman: "gra-bpao-thue-kheun-khreuuang dtawng mii kha-naat mai goen thii saai-gaan-bin gam-not",
            chinese: "随身登机行李的尺寸不能超过航空公司规定。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "กระเป๋าแครี่ออน", roman: "gra-bpao khae-rii-on", chinese: "随身行李", notesZh: "外来口语，来自 carry-on。" }],
    antonyms: [{ candidateId: "loot-gra-bpao", thai: "โหลดกระเป๋า", roman: "loot-gra-bpao", chinese: "托运行李" }],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "loot-gra-bpao", thai: "โหลดกระเป๋า", roman: "loot-gra-bpao", chinese: "托运行李" },
        distinctionZh: "กระเป๋าถือขึ้นเครื่อง 是名词；โหลดกระเป๋า 是办理托运的动作。",
      },
    ],
    collocations: [{ thai: "น้ำหนักกระเป๋าถือขึ้นเครื่อง", roman: "nam-nak gra-bpao-thue-kheun-khreuuang", chinese: "随身登机行李重量" }],
    usageNotesZh: ["ถือขึ้นเครื่อง 字面是“拿上飞机”。"],
    tags: ["airport", "baggage", "carry-on"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "sun-la-gaa-gaawn",
    thai: "ศุลกากร",
    roman: "sun-la-gaa-gaawn",
    chinese: "海关",
    partOfSpeech: "名词",
    theme: "机场",
    level: "a2",
    priority: 8,
    senses: [
      {
        id: "customs",
        chinese: "检查入境物品、税费和申报的部门或关口",
        examples: [
          {
            thai: "ถ้ามีของต้องสำแดง คุณควรเดินเข้าช่องศุลกากรสีแดง",
            roman: "thaa mii khaawng dtawng sam-daaeng, khun khuuan doen khao chaawng sun-la-gaa-gaawn sii daaeng",
            chinese: "如果有需要申报的物品，你应该走红色海关通道。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ด่านศุลกากร", roman: "daan sun-la-gaa-gaawn", chinese: "海关关口" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "dtruat-khon-khao-mueang", thai: "ตรวจคนเข้าเมือง", roman: "dtruat-khon-khao-mueang", chinese: "移民检查" },
        distinctionZh: "ตรวจคนเข้าเมือง 检查人和身份；ศุลกากร 检查物品和申报。",
      },
    ],
    collocations: [{ thai: "ผ่านศุลกากร", roman: "phaan sun-la-gaa-gaawn", chinese: "过海关" }],
    usageNotesZh: ["机场到达流程里，先过移民检查，再取行李和过海关。"],
    tags: ["airport", "customs", "arrival"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtruat-khon-khao-mueang",
    thai: "ตรวจคนเข้าเมือง",
    roman: "dtruat-khon-khao-mueang",
    chinese: "移民检查；入境检查",
    partOfSpeech: "名词",
    theme: "机场",
    level: "a2",
    priority: 9,
    senses: [
      {
        id: "immigration-control",
        chinese: "检查护照、签证和入境资格的程序或部门",
        examples: [
          {
            thai: "แถวตรวจคนเข้าเมืองวันนี้ยาวมาก เราจึงต้องรอเกือบหนึ่งชั่วโมง",
            roman: "thaaeo dtruat-khon-khao-mueang wan-nii yaao maak, rao jeung dtawng raaw gueap nueng chua-moong",
            chinese: "今天入境检查的队伍很长，所以我们几乎等了一个小时。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ตม.", roman: "dtaaw-maaw", chinese: "移民局；入境检查", notesZh: "缩写，口语和标识中很常见。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "sun-la-gaa-gaawn", thai: "ศุลกากร", roman: "sun-la-gaa-gaawn", chinese: "海关" },
        distinctionZh: "ตรวจคนเข้าเมือง 关注人和证件；ศุลกากร 关注行李和货物。",
      },
    ],
    collocations: [{ thai: "ด่านตรวจคนเข้าเมือง", roman: "daan dtruat-khon-khao-mueang", chinese: "入境检查口" }],
    usageNotesZh: ["ตม. 是 ตรวจคนเข้าเมือง 的常用缩写。"],
    tags: ["airport", "immigration", "document"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "aa-khaan-phuu-dooi-saan",
    thai: "อาคารผู้โดยสาร",
    roman: "aa-khaan-phuu-dooi-saan",
    chinese: "航站楼；客运楼",
    partOfSpeech: "名词",
    theme: "机场",
    level: "a2",
    priority: 10,
    senses: [
      {
        id: "passenger-terminal",
        chinese: "机场、车站或港口中供乘客办理手续和候车候机的建筑",
        examples: [
          {
            thai: "เที่ยวบินระหว่างประเทศออกจากอาคารผู้โดยสารสอง ไม่ใช่อาคารในประเทศ",
            roman: "thiaao-bin ra-waang bpra-theet aawk jaak aa-khaan-phuu-dooi-saan saawng, mai chai aa-khaan nai bpra-theet",
            chinese: "国际航班从二号航站楼出发，不是国内航站楼。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เทอร์มินัล", roman: "thoe-mi-nan", chinese: "航站楼；终端楼", notesZh: "外来词，机场标识中常见。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "aa-khaan", thai: "อาคาร", roman: "aa-khaan", chinese: "建筑物" },
        distinctionZh: "อาคาร 是建筑物泛称；อาคารผู้โดยสาร 是供乘客使用的航站楼/客运楼。",
      },
    ],
    collocations: [{ thai: "อาคารผู้โดยสารขาออก", roman: "aa-khaan-phuu-dooi-saan khaa-aawk", chinese: "出发航站楼" }],
    usageNotesZh: ["ขาออก 是出发，ขาเข้า 是到达。"],
    tags: ["airport", "terminal", "building"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thiaao-bin-laa-chaa",
    thai: "เที่ยวบินล่าช้า",
    roman: "thiaao-bin-laa-chaa",
    chinese: "航班延误",
    partOfSpeech: "短语",
    theme: "机场",
    level: "a2",
    priority: 11,
    senses: [
      {
        id: "delayed-flight",
        chinese: "航班比原定时间晚起飞或晚到达",
        examples: [
          {
            thai: "เพราะฝนตกหนัก เที่ยวบินล่าช้าสองชั่วโมงและผู้โดยสารต้องรอที่เกต",
            roman: "phraw fon dtok nak, thiaao-bin-laa-chaa saawng chua-moong lae phuu-dooi-saan dtawng raaw thii geet",
            chinese: "因为下大雨，航班延误两小时，乘客必须在登机口等待。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ไฟลต์ดีเลย์", roman: "fai di-lee", chinese: "航班延误", notesZh: "外来口语，很常听到。" }],
    antonyms: [{ thai: "ตรงเวลา", roman: "dtrong wee-laa", chinese: "准时" }],
    comparisons: [
      {
        kind: "antonym",
        target: { thai: "ตรงเวลา", roman: "dtrong wee-laa", chinese: "准时" },
        distinctionZh: "ล่าช้า 表示延误；ตรงเวลา 表示按时。",
      },
    ],
    collocations: [{ thai: "แจ้งเที่ยวบินล่าช้า", roman: "jaaeng thiaao-bin-laa-chaa", chinese: "通知航班延误" }],
    usageNotesZh: ["ล่าช้า 比 ช้า 更正式，常见于交通通知。"],
    tags: ["airport", "delay", "flight"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtaaw-khreuuang",
    thai: "ต่อเครื่อง",
    roman: "dtaaw-khreuuang",
    chinese: "转机",
    partOfSpeech: "动词",
    theme: "机场",
    level: "a2",
    priority: 12,
    senses: [
      {
        id: "connect-flight",
        chinese: "从一趟飞机换乘另一趟飞机继续旅行",
        examples: [
          {
            thai: "เราต้องต่อเครื่องที่กรุงเทพสามชั่วโมงก่อนบินไปภูเก็ต",
            roman: "rao dtawng dtaaw-khreuuang thii grung-theep saam chua-moong gaawn bin bpai phuu-get",
            chinese: "我们要在曼谷转机三小时，然后飞去普吉。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เปลี่ยนเครื่อง", roman: "bplian khreuuang", chinese: "换飞机；转机" }],
    antonyms: [{ thai: "บินตรง", roman: "bin dtrong", chinese: "直飞" }],
    comparisons: [
      {
        kind: "antonym",
        target: { thai: "บินตรง", roman: "bin dtrong", chinese: "直飞" },
        distinctionZh: "ต่อเครื่อง 需要换乘；บินตรง 不需要转机。",
      },
    ],
    collocations: [{ thai: "เวลาต่อเครื่อง", roman: "wee-laa dtaaw-khreuuang", chinese: "转机时间" }],
    usageNotesZh: ["ต่อ 在这里有“接上下一段行程”的意思。"],
    tags: ["airport", "connection", "flight"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "chaan-chaa-laa",
    thai: "ชานชาลา",
    roman: "chaan-chaa-laa",
    chinese: "站台；月台",
    partOfSpeech: "名词",
    theme: "公交火车",
    level: "a2",
    priority: 13,
    senses: [
      {
        id: "platform",
        chinese: "乘客等候和上下火车、地铁的站台",
        examples: [
          {
            thai: "รถไฟไปอยุธยาออกจากชานชาลาห้า กรุณาไปก่อนเวลาอย่างน้อยสิบนาที",
            roman: "rot-fai bpai a-yut-tha-yaa aawk jaak chaan-chaa-laa haa, ga-ru-naa bpai gaawn wee-laa yaang naawy sip naa-thii",
            chinese: "去大城的火车从五号站台出发，请至少提前十分钟过去。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "แพลตฟอร์ม", roman: "phlaaet-faawm", chinese: "站台", notesZh: "外来词，部分标识中可见。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ป้ายรถเมล์", roman: "bpaai-rot-mee", chinese: "公交站" },
        distinctionZh: "ชานชาลา 多用于火车、地铁站台；ป้ายรถเมล์ 是公交站点。",
      },
    ],
    collocations: [{ thai: "ชานชาลาหมายเลขสอง", roman: "chaan-chaa-laa maai-leek saawng", chinese: "二号站台" }],
    usageNotesZh: ["在火车站问站台时，可问 อยู่ชานชาลาไหน。"],
    tags: ["train", "platform", "station"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtaa-raang-wee-laa",
    thai: "ตารางเวลา",
    roman: "dtaa-raang-wee-laa",
    chinese: "时刻表；时间表",
    partOfSpeech: "名词",
    theme: "公交火车",
    level: "a2",
    priority: 14,
    senses: [
      {
        id: "timetable",
        chinese: "列出交通、服务或活动时间安排的表",
        examples: [
          {
            thai: "ก่อนซื้อตั๋วรถไฟ ควรดูตารางเวลาเพื่อเลือกเที่ยวที่ถึงก่อนค่ำ",
            roman: "gaawn sue dtua rot-fai, khuuan duu dtaa-raang-wee-laa phuea lueak thiaao thii thueng gaawn kham",
            chinese: "买火车票前，应该看时刻表，以选择天黑前到达的班次。",
          },
        ],
      },
    ],
    synonyms: [{ candidateId: "gam-not-gaan", thai: "กำหนดการ", roman: "gam-not-gaan", chinese: "日程；行程安排" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "gam-not-gaan", thai: "กำหนดการ", roman: "gam-not-gaan", chinese: "日程" },
        distinctionZh: "ตารางเวลา 偏交通或服务时间表；กำหนดการ 偏活动或行程安排。",
      },
    ],
    collocations: [{ thai: "ตารางเวลารถไฟ", roman: "dtaa-raang-wee-laa rot-fai", chinese: "火车时刻表" }],
    usageNotesZh: ["ตาราง 是表格，เวลา 是时间。"],
    tags: ["timetable", "train", "schedule"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khaa-dooi-saan",
    thai: "ค่าโดยสาร",
    roman: "khaa-dooi-saan",
    chinese: "车费；票价",
    partOfSpeech: "名词",
    theme: "公交火车",
    level: "a2",
    priority: 15,
    senses: [
      {
        id: "fare",
        chinese: "乘坐公共交通、出租车或交通工具需要支付的费用",
        examples: [
          {
            thai: "ค่าโดยสารรถไฟฟ้าจากสถานีนี้ไปสนามบินประมาณห้าสิบบาท",
            roman: "khaa-dooi-saan rot-fai-faa jaak sa-thaa-nii nii bpai sa-naam-bin bpra-maan haa-sip baat",
            chinese: "从这个站到机场的轻轨票价大约五十泰铢。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ค่ารถ", roman: "khaa rot", chinese: "车费", notesZh: "口语较常用，范围较宽。" }],
    antonyms: [{ thai: "ฟรี", roman: "frii", chinese: "免费" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ค่าส่ง", roman: "khaa-song", chinese: "运费" },
        distinctionZh: "ค่าโดยสาร 是人的交通票价；ค่าส่ง 是物品配送费。",
      },
    ],
    collocations: [{ thai: "จ่ายค่าโดยสาร", roman: "jaai khaa-dooi-saan", chinese: "支付车费" }],
    usageNotesZh: ["โดยสาร 表示乘坐，ผู้โดยสาร 是乘客。"],
    tags: ["fare", "transport", "price"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "sen-thaang",
    thai: "เส้นทาง",
    roman: "sen-thaang",
    chinese: "路线",
    partOfSpeech: "名词",
    theme: "公交火车",
    level: "a2",
    priority: 16,
    senses: [
      {
        id: "route",
        chinese: "从一个地点到另一个地点经过的路线",
        examples: [
          {
            thai: "แอปแผนที่แนะนำเส้นทางที่เร็วที่สุดจากโรงแรมไปสถานีขนส่ง",
            roman: "aaep phaaen-thii nae-nam sen-thaang thii reo thii-sut jaak roong-raem bpai sa-thaa-nii-khon-song",
            chinese: "地图应用推荐了从酒店到客运站最快的路线。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ทาง", roman: "thaang", chinese: "路；方向" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ทาง", roman: "thaang", chinese: "路；方向" },
        distinctionZh: "เส้นทาง 更像完整路线；ทาง 可以是路、方向或方法。",
      },
    ],
    collocations: [{ thai: "เปลี่ยนเส้นทาง", roman: "bplian sen-thaang", chinese: "改变路线" }],
    usageNotesZh: ["เส้นทาง 常用于导航、交通线路和配送路线。"],
    tags: ["route", "navigation", "transport"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "rot-fai-faa",
    thai: "รถไฟฟ้า",
    roman: "rot-fai-faa",
    chinese: "电车；城市轨道交通",
    partOfSpeech: "名词",
    theme: "公交火车",
    level: "a2",
    priority: 17,
    senses: [
      {
        id: "electric-urban-train",
        chinese: "曼谷等城市中常见的电动轨道交通",
        examples: [
          {
            thai: "ถ้ารถติดมาก การนั่งรถไฟฟ้าไปห้างจะเร็วกว่านั่งแท็กซี่",
            roman: "thaa rot dtit maak, gaan nang rot-fai-faa bpai haang ja reo gwaa nang thaek-sii",
            chinese: "如果堵车严重，坐城市轨道交通去商场会比坐出租车快。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "บีทีเอส", roman: "bii-thii-et", chinese: "BTS轻轨", notesZh: "曼谷常见系统名。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "rot-fai-dtai-din", thai: "รถไฟใต้ดิน", roman: "rot-fai-dtai-din", chinese: "地铁" },
        distinctionZh: "รถไฟฟ้า 可泛指城市轨道，常指高架BTS；รถไฟใต้ดิน 明确是地下铁。",
      },
    ],
    collocations: [{ thai: "สถานีรถไฟฟ้า", roman: "sa-thaa-nii rot-fai-faa", chinese: "轻轨/轨道交通站" }],
    usageNotesZh: ["在曼谷口语中 รถไฟฟ้า 经常指 BTS 或城市轨道系统。"],
    tags: ["metro", "urban-rail", "transport"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "rot-fai-dtai-din",
    thai: "รถไฟใต้ดิน",
    roman: "rot-fai-dtai-din",
    chinese: "地铁",
    partOfSpeech: "名词",
    theme: "公交火车",
    level: "a2",
    priority: 18,
    senses: [
      {
        id: "subway",
        chinese: "主要在地下运行的城市轨道交通",
        examples: [
          {
            thai: "จากตลาดกลางคืนกลับโรงแรม นั่งรถไฟใต้ดินแล้วต่อรถเมล์อีกสองป้าย",
            roman: "jaak dta-laat glaang-khuen glap roong-raem, nang rot-fai-dtai-din laaeo dtaaw rot-mee iik saawng bpaai",
            chinese: "从夜市回酒店，坐地铁后再转公交两站。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เอ็มอาร์ที", roman: "em-aa-thii", chinese: "MRT地铁", notesZh: "曼谷地铁系统常用名。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "rot-fai-faa", thai: "รถไฟฟ้า", roman: "rot-fai-faa", chinese: "城市轨道交通" },
        distinctionZh: "รถไฟใต้ดิน 强调地下；รถไฟฟ้า 是更宽的城市电动轨道交通说法。",
      },
    ],
    collocations: [{ thai: "ขึ้นรถไฟใต้ดิน", roman: "kheun rot-fai-dtai-din", chinese: "坐地铁" }],
    usageNotesZh: ["ใต้ดิน 字面是“地下”。"],
    tags: ["subway", "metro", "transport"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "sa-thaa-nii-khon-song",
    thai: "สถานีขนส่ง",
    roman: "sa-thaa-nii-khon-song",
    chinese: "客运站；汽车站",
    partOfSpeech: "名词",
    theme: "公交火车",
    level: "a2",
    priority: 19,
    senses: [
      {
        id: "bus-terminal",
        chinese: "长途汽车、客运车出发和到达的车站",
        examples: [
          {
            thai: "รถตู้ไปหัวหินออกจากสถานีขนส่งทุกชั่วโมงในช่วงเช้า",
            roman: "rot-dtuu bpai hua-hin aawk jaak sa-thaa-nii-khon-song thuk chua-moong nai chuaang chaao",
            chinese: "去华欣的面包车早上每小时从客运站出发。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "บขส.", roman: "baaw-khaaw-saaw", chinese: "客运站；运输公司站点", notesZh: "常见缩写，尤其指长途汽车相关设施。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "สถานีรถไฟ", roman: "sa-thaa-nii rot-fai", chinese: "火车站" },
        distinctionZh: "สถานีขนส่ง 主要是汽车客运；สถานีรถไฟ 是火车站。",
      },
    ],
    collocations: [{ thai: "ไปสถานีขนส่ง", roman: "bpai sa-thaa-nii-khon-song", chinese: "去客运站" }],
    usageNotesZh: ["ขนส่ง 表示运输，สถานีขนส่ง 常指长途汽车站。"],
    tags: ["bus-terminal", "transport", "intercity"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "rot-dtuu",
    thai: "รถตู้",
    roman: "rot-dtuu",
    chinese: "面包车；小巴",
    partOfSpeech: "名词",
    theme: "公交火车",
    level: "a2",
    priority: 20,
    senses: [
      {
        id: "passenger-van",
        chinese: "常用于城际或短途客运的面包车/小巴",
        examples: [
          {
            thai: "ถ้าอยากไปตลาดน้ำเร็ว ๆ นั่งรถตู้จากสถานีขนส่งจะสะดวกกว่า",
            roman: "thaa yaak bpai dta-laat naam reo reo, nang rot-dtuu jaak sa-thaa-nii-khon-song ja sa-duuak gwaa",
            chinese: "如果想快点去水上市场，从客运站坐面包车会更方便。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "รถโดยสารตู้", roman: "rot-dooi-saan dtuu", chinese: "客运面包车", notesZh: "较正式或说明性说法。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "รถเมล์", roman: "rot-mee", chinese: "公交车" },
        distinctionZh: "รถตู้ 座位较少，常跑固定城际路线；รถเมล์ 是城市公交或公共汽车。",
      },
    ],
    collocations: [{ thai: "คิวรถตู้", roman: "khiu rot-dtuu", chinese: "面包车候车点/队列" }],
    usageNotesZh: ["ตู้ 本意有“柜/箱”，รถตู้ 指厢式客车。"],
    tags: ["van", "transport", "intercity"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "rot-saawng-thaaeo",
    thai: "รถสองแถว",
    roman: "rot-saawng-thaaeo",
    chinese: "双条车",
    partOfSpeech: "名词",
    theme: "公交火车",
    level: "a2",
    priority: 21,
    senses: [
      {
        id: "songthaew",
        chinese: "泰国常见的后厢两排座公共交通车",
        examples: [
          {
            thai: "ในเชียงใหม่ รถสองแถวสีแดงรับผู้โดยสารหลายคนและคิดราคาตามระยะทาง",
            roman: "nai chiang-mai, rot-saawng-thaaeo sii daaeng rap phuu-dooi-saan laai khon lae khit raa-khaa dtaam ra-ya thaang",
            chinese: "在清迈，红色双条车接载多名乘客，并按距离收费。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "สองแถว", roman: "saawng-thaaeo", chinese: "双条车", notesZh: "口语常省略 รถ。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "รถแท็กซี่มิเตอร์", roman: "rot-thaek-sii-mii-dtoe", chinese: "计价出租车" },
        distinctionZh: "รถสองแถว 常拼车、路线较固定；出租车通常单独乘坐、按表或议价。",
      },
    ],
    collocations: [{ thai: "ขึ้นรถสองแถว", roman: "kheun rot-saawng-thaaeo", chinese: "坐双条车" }],
    usageNotesZh: ["สองแถว 字面是“两排”，指车厢里的两排座位。"],
    tags: ["songthaew", "local-transport"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "maaw-dtoe-sai-rap-jaang",
    thai: "มอเตอร์ไซค์รับจ้าง",
    roman: "maaw-dtoe-sai-rap-jaang",
    chinese: "摩托车出租载客；摩的",
    partOfSpeech: "名词",
    theme: "出租网约车",
    level: "a2",
    priority: 22,
    senses: [
      {
        id: "motorcycle-taxi",
        chinese: "由司机骑摩托车载客收费的交通服务",
        examples: [
          {
            thai: "ถ้าซอยแคบและรถติดมาก มอเตอร์ไซค์รับจ้างอาจถึงสถานีเร็วกว่าแท็กซี่",
            roman: "thaa saawy khaaep lae rot dtit maak, maaw-dtoe-sai-rap-jaang aat thueng sa-thaa-nii reo gwaa thaek-sii",
            chinese: "如果巷子窄而且堵车严重，摩的可能比出租车更快到车站。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "วินมอเตอร์ไซค์", roman: "win maaw-dtoe-sai", chinese: "摩的站/摩的服务", notesZh: "วิน 常指摩的司机聚集的站点。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "ruea-duuan", thai: "เรือด่วน", roman: "ruea-duuan", chinese: "快船" },
        distinctionZh: "มอเตอร์ไซค์รับจ้าง 用于陆路短距离；เรือด่วน 用于水路。",
      },
    ],
    collocations: [{ thai: "ค่าวินมอเตอร์ไซค์", roman: "khaa win maaw-dtoe-sai", chinese: "摩的费用" }],
    usageNotesZh: ["รับจ้าง 表示受雇提供服务，常用于交通载客。"],
    tags: ["motorcycle-taxi", "ride", "traffic"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thaa-ruea",
    thai: "ท่าเรือ",
    roman: "thaa-ruea",
    chinese: "码头；渡口",
    partOfSpeech: "名词",
    theme: "公交火车",
    level: "a2",
    priority: 23,
    senses: [
      {
        id: "pier",
        chinese: "乘船、上下船或装卸货物的地方",
        examples: [
          {
            thai: "จากโรงแรมเดินไปท่าเรือประมาณสิบนาที แล้วนั่งเรือด่วนเข้าตัวเมือง",
            roman: "jaak roong-raem doen bpai thaa-ruea bpra-maan sip naa-thii, laaeo nang ruea-duuan khao dtua-mueang",
            chinese: "从酒店走到码头大约十分钟，然后坐快船进市区。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ท่าน้ำ", roman: "thaa-naam", chinese: "河边码头；渡口" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "sa-thaa-nii-khon-song", thai: "สถานีขนส่ง", roman: "sa-thaa-nii-khon-song", chinese: "客运站" },
        distinctionZh: "ท่าเรือ 用于水路；สถานีขนส่ง 用于陆路客运。",
      },
    ],
    collocations: [{ thai: "ลงเรือที่ท่าเรือ", roman: "long ruea thii thaa-ruea", chinese: "在码头上船/下船" }],
    usageNotesZh: ["ท่า 在交通场景中常指站点或港口。"],
    tags: ["pier", "boat", "transport"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "ruea-duuan",
    thai: "เรือด่วน",
    roman: "ruea-duuan",
    chinese: "快船",
    partOfSpeech: "名词",
    theme: "公交火车",
    level: "a2",
    priority: 24,
    senses: [
      {
        id: "express-boat",
        chinese: "沿河或水路快速运送乘客的船",
        examples: [
          {
            thai: "ช่วงเย็นเรือด่วนคนเยอะมาก แต่ยังเร็วกว่ารถบนถนน",
            roman: "chuaang yen ruea-duuan khon yoe maak, dtaae yang reo gwaa rot bon tha-non",
            chinese: "傍晚快船人很多，但仍然比路上的车快。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เรือโดยสารด่วน", roman: "ruea-dooi-saan-duuan", chinese: "客运快船" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "รถเมล์", roman: "rot-mee", chinese: "公交车" },
        distinctionZh: "เรือด่วน 是水上交通；รถเมล์ 是道路公交。",
      },
    ],
    collocations: [{ thai: "ตั๋วเรือด่วน", roman: "dtua ruea-duuan", chinese: "快船票" }],
    usageNotesZh: ["ด่วน 表示快速、急速，也可出现在 ส่งด่วน 等词中。"],
    tags: ["boat", "express", "transport"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "riiak-rot",
    thai: "เรียกรถ",
    roman: "riiak-rot",
    chinese: "叫车",
    partOfSpeech: "动词",
    theme: "出租网约车",
    level: "a2",
    priority: 25,
    senses: [
      {
        id: "call-vehicle",
        chinese: "叫出租车、网约车或其他车辆来接人",
        examples: [
          {
            thai: "ถ้าฝนตกหนัก พนักงานโรงแรมช่วยเรียกรถให้ไปสนามบินได้",
            roman: "thaa fon dtok nak, pha-nak-ngaan roong-raem chuai riiak-rot hai bpai sa-naam-bin dai",
            chinese: "如果下大雨，酒店员工可以帮忙叫车去机场。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เรียกแท็กซี่", roman: "riiak thaek-sii", chinese: "叫出租车" }],
    antonyms: [{ thai: "เดินไปเอง", roman: "doen bpai eeng", chinese: "自己走过去" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "aaep-riiak-rot", thai: "แอปเรียกรถ", roman: "aaep-riiak-rot", chinese: "叫车应用" },
        distinctionZh: "เรียกรถ 是动作；แอปเรียกรถ 是用来叫车的应用。",
      },
    ],
    collocations: [{ thai: "ช่วยเรียกรถให้หน่อย", roman: "chuai riiak-rot hai naawy", chinese: "请帮我叫车" }],
    usageNotesZh: ["เรียก 可表示“叫、召唤”，เรียกรถ 是服务场景高频短语。"],
    tags: ["taxi", "ride-hailing", "request"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "aaep-riiak-rot",
    thai: "แอปเรียกรถ",
    roman: "aaep-riiak-rot",
    chinese: "叫车应用；网约车应用",
    partOfSpeech: "名词",
    theme: "出租网约车",
    level: "a2",
    priority: 26,
    senses: [
      {
        id: "ride-hailing-app",
        chinese: "用于预约出租车、网约车或摩托车的手机应用",
        examples: [
          {
            thai: "แอปเรียกรถแสดงค่าโดยสารก่อนยืนยัน ทำให้เปรียบเทียบราคาได้ง่าย",
            roman: "aaep-riiak-rot sa-daaeng khaa-dooi-saan gaawn yuen-yan, tham-hai bpriap-thiiap raa-khaa dai ngaai",
            chinese: "叫车应用在确认前显示车费，让比较价格变得容易。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "แอปแท็กซี่", roman: "aaep thaek-sii", chinese: "出租车应用" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "riiak-rot", thai: "เรียกรถ", roman: "riiak-rot", chinese: "叫车" },
        distinctionZh: "แอปเรียกรถ 是工具；เรียกรถ 是动作。",
      },
    ],
    collocations: [{ thai: "เปิดแอปเรียกรถ", roman: "bpoet aaep-riiak-rot", chinese: "打开叫车应用" }],
    usageNotesZh: ["แอป 是 app 的外来词，日常手机场景非常常见。"],
    tags: ["app", "ride-hailing", "taxi"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khon-khap",
    thai: "คนขับ",
    roman: "khon-khap",
    chinese: "司机",
    partOfSpeech: "名词",
    theme: "出租网约车",
    level: "a2",
    priority: 27,
    senses: [
      {
        id: "driver",
        chinese: "驾驶汽车、出租车、公交等车辆的人",
        examples: [
          {
            thai: "คนขับโทรมาถามจุดรับ เพราะหน้าโรงแรมมีรถจอดหลายคัน",
            roman: "khon-khap thoo maa thaam jut-rap, phraw naa roong-raem mii rot jaawt laai khan",
            chinese: "司机打电话来问上车点，因为酒店前面停着很多车。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "คนขับรถ", roman: "khon-khap-rot", chinese: "司机；开车的人" }],
    antonyms: [{ thai: "ผู้โดยสาร", roman: "phuu-dooi-saan", chinese: "乘客" }],
    comparisons: [
      {
        kind: "antonym",
        target: { thai: "ผู้โดยสาร", roman: "phuu-dooi-saan", chinese: "乘客" },
        distinctionZh: "คนขับ 是驾驶的人；ผู้โดยสาร 是乘坐的人。",
      },
    ],
    collocations: [{ thai: "คนขับแท็กซี่", roman: "khon-khap thaek-sii", chinese: "出租车司机" }],
    usageNotesZh: ["คนขับ 后面可接交通工具名，如 คนขับรถเมล์。"],
    tags: ["driver", "taxi", "transport"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "mii-dtoe",
    thai: "มิเตอร์",
    roman: "mii-dtoe",
    chinese: "计价器；表",
    partOfSpeech: "名词",
    theme: "出租网约车",
    level: "a2",
    priority: 28,
    senses: [
      {
        id: "taxi-meter",
        chinese: "出租车按距离和时间计算费用的计价器",
        examples: [
          {
            thai: "ก่อนขึ้นแท็กซี่ ควรถามคนขับว่าเปิดมิเตอร์ได้ไหม",
            roman: "gaawn kheun thaek-sii, khuuan thaam khon-khap waa bpoet mii-dtoe dai mai",
            chinese: "上出租车前，应该问司机能不能打表。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "มิเตอร์แท็กซี่", roman: "mii-dtoe thaek-sii", chinese: "出租车计价器" }],
    antonyms: [{ thai: "ราคาเหมา", roman: "raa-khaa mao", chinese: "包价；议定价" }],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "mao", thai: "เหมา", roman: "mao", chinese: "包车；包价" },
        distinctionZh: "เปิดมิเตอร์ 是按表计费；เหมา 是先谈一个总价。",
      },
    ],
    collocations: [{ thai: "เปิดมิเตอร์", roman: "bpoet mii-dtoe", chinese: "打表" }],
    usageNotesZh: ["ถามว่า เปิดมิเตอร์ไหม 是游客坐出租车常用句。"],
    tags: ["taxi", "meter", "fare"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khaa-thaek-sii",
    thai: "ค่าแท็กซี่",
    roman: "khaa-thaek-sii",
    chinese: "出租车费",
    partOfSpeech: "名词",
    theme: "出租网约车",
    level: "a2",
    priority: 29,
    senses: [
      {
        id: "taxi-fare",
        chinese: "乘坐出租车需要支付的费用",
        examples: [
          {
            thai: "ค่าแท็กซี่จากสนามบินถึงโรงแรมรวมค่าทางด่วนแล้วประมาณสี่ร้อยบาท",
            roman: "khaa-thaek-sii jaak sa-naam-bin thueng roong-raem ruam khaa-thaang-duuan laaeo bpra-maan sii raawy baat",
            chinese: "从机场到酒店的出租车费含高速费大约四百泰铢。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ค่ารถแท็กซี่", roman: "khaa rot-thaek-sii", chinese: "出租车费用" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "khaa-dooi-saan", thai: "ค่าโดยสาร", roman: "khaa-dooi-saan", chinese: "车费；票价" },
        distinctionZh: "ค่าแท็กซี่ 专指出租车费；ค่าโดยสาร 可指各种公共交通票价。",
      },
    ],
    collocations: [{ thai: "ค่าแท็กซี่แพง", roman: "khaa-thaek-sii phaaeng", chinese: "出租车费贵" }],
    usageNotesZh: ["ค่า + 交通工具 常表示该交通方式的费用。"],
    tags: ["taxi", "fare", "payment"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jut-rap",
    thai: "จุดรับ",
    roman: "jut-rap",
    chinese: "上车点；取件点",
    partOfSpeech: "名词",
    theme: "出租网约车",
    level: "a2",
    priority: 30,
    senses: [
      {
        id: "pickup-point",
        chinese: "车辆接人或配送取件的指定地点",
        examples: [
          {
            thai: "กรุณายืนรอที่จุดรับหน้าอาคารผู้โดยสารชั้นสอง",
            roman: "ga-ru-naa yuen raaw thii jut-rap naa aa-khaan-phuu-dooi-saan chan saawng",
            chinese: "请在航站楼二楼前面的上车点等候。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "จุดนัดรับ", roman: "jut nat-rap", chinese: "约定接送点" }],
    antonyms: [{ candidateId: "jut-song", thai: "จุดส่ง", roman: "jut-song", chinese: "下车点；送达点" }],
    comparisons: [
      {
        kind: "antonym",
        target: { candidateId: "jut-song", thai: "จุดส่ง", roman: "jut-song", chinese: "下车点；送达点" },
        distinctionZh: "จุดรับ 是接人/取件地点；จุดส่ง 是送达或下车地点。",
      },
    ],
    collocations: [{ thai: "เลือกจุดรับ", roman: "lueak jut-rap", chinese: "选择上车点" }],
    usageNotesZh: ["网约车和配送场景都可用 จุดรับ。"],
    tags: ["pickup", "ride-hailing", "delivery"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jut-song",
    thai: "จุดส่ง",
    roman: "jut-song",
    chinese: "下车点；送达点",
    partOfSpeech: "名词",
    theme: "出租网约车",
    level: "a2",
    priority: 31,
    senses: [
      {
        id: "dropoff-point",
        chinese: "乘客下车或物品送达的指定地点",
        examples: [
          {
            thai: "ถ้าจุดส่งอยู่ในซอยแคบ คนขับอาจขอให้ลงที่ปากซอย",
            roman: "thaa jut-song yuu nai saawy khaaep, khon-khap aat khaaw hai long thii bpaak saawy",
            chinese: "如果下车点在窄巷里，司机可能会请你在巷口下车。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "จุดปลายทาง", roman: "jut bplaai-thaang", chinese: "目的地点" }],
    antonyms: [{ candidateId: "jut-rap", thai: "จุดรับ", roman: "jut-rap", chinese: "上车点；取件点" }],
    comparisons: [
      {
        kind: "antonym",
        target: { candidateId: "jut-rap", thai: "จุดรับ", roman: "jut-rap", chinese: "上车点" },
        distinctionZh: "จุดรับ 是开始接人的地点；จุดส่ง 是结束送达的地点。",
      },
    ],
    collocations: [{ thai: "เปลี่ยนจุดส่ง", roman: "bplian jut-song", chinese: "更改下车点/送达点" }],
    usageNotesZh: ["ส่ง 在这里表示“送达”。"],
    tags: ["dropoff", "ride-hailing", "delivery"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bpak-mut",
    thai: "ปักหมุด",
    roman: "bpak-mut",
    chinese: "定位；标记地点",
    partOfSpeech: "动词",
    theme: "出租网约车",
    level: "a2",
    priority: 32,
    senses: [
      {
        id: "pin-location",
        chinese: "在地图或应用中用标记固定一个位置",
        examples: [
          {
            thai: "ก่อนเรียกรถ กรุณาปักหมุดให้ตรงกับทางเข้าโรงแรม",
            roman: "gaawn riiak-rot, ga-ru-naa bpak-mut hai dtrong gap thaang-khao roong-raem",
            chinese: "叫车前，请把定位标在酒店入口的位置。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ตั้งหมุด", roman: "dtang mut", chinese: "设置定位点" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "chaae-loo-khee-chan", thai: "แชร์โลเคชัน", roman: "chaae-loo-khee-chan", chinese: "分享位置" },
        distinctionZh: "ปักหมุด 是在地图上标点；แชร์โลเคชัน 是把位置发给别人。",
      },
    ],
    collocations: [{ thai: "ปักหมุดผิด", roman: "bpak-mut phit", chinese: "定位标错" }],
    usageNotesZh: ["หมุด 是“钉/图钉”，ปักหมุด 在手机地图里很常用。"],
    tags: ["location", "map", "ride-hailing"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "chaae-loo-khee-chan",
    thai: "แชร์โลเคชัน",
    roman: "chaae-loo-khee-chan",
    chinese: "分享位置",
    partOfSpeech: "动词",
    theme: "出租网约车",
    level: "a2",
    priority: 33,
    senses: [
      {
        id: "share-location",
        chinese: "通过手机应用把当前位置或目的地发给别人",
        examples: [
          {
            thai: "ถ้าคนขับหาโรงแรมไม่เจอ คุณสามารถแชร์โลเคชันให้เขาทางแชต",
            roman: "thaa khon-khap haa roong-raem mai jooe, khun saa-maat chaae-loo-khee-chan hai khao thaang chaaet",
            chinese: "如果司机找不到酒店，你可以通过聊天把位置分享给他。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ส่งตำแหน่ง", roman: "song dtam-naeng", chinese: "发送位置" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "bpak-mut", thai: "ปักหมุด", roman: "bpak-mut", chinese: "定位；标记地点" },
        distinctionZh: "แชร์โลเคชัน 强调发给别人；ปักหมุด 强调在地图上标记。",
      },
    ],
    collocations: [{ thai: "แชร์โลเคชันปัจจุบัน", roman: "chaae-loo-khee-chan bpat-ju-ban", chinese: "分享当前位置" }],
    usageNotesZh: ["แชร์ 和 โลเคชัน 都是常见外来词，手机场景里自然。"],
    tags: ["location", "app", "ride-hailing"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "tha-biian-rot",
    thai: "ทะเบียนรถ",
    roman: "tha-biian-rot",
    chinese: "车牌；车辆登记号",
    partOfSpeech: "名词",
    theme: "出租网约车",
    level: "a2",
    priority: 34,
    senses: [
      {
        id: "license-plate",
        chinese: "车辆上的登记号码，用于确认车辆身份",
        examples: [
          {
            thai: "ก่อนขึ้นรถจากแอปเรียกรถ ควรตรวจทะเบียนรถและชื่อคนขับให้ตรงกัน",
            roman: "gaawn kheun rot jaak aaep-riiak-rot, khuuan dtruat tha-biian-rot lae chue khon-khap hai dtrong gan",
            chinese: "上网约车前，应该核对车牌和司机姓名是否一致。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ป้ายทะเบียน", roman: "bpaai tha-biian", chinese: "车牌" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "หมายเลขรถ", roman: "maai-leek rot", chinese: "车辆编号" },
        distinctionZh: "ทะเบียนรถ 是正式车牌登记号；หมายเลขรถ 可泛指车辆编号。",
      },
    ],
    collocations: [{ thai: "เลขทะเบียนรถ", roman: "leek tha-biian-rot", chinese: "车牌号码" }],
    usageNotesZh: ["ทะเบียน 表示登记、注册，在车辆和文件语境常见。"],
    tags: ["license-plate", "taxi", "safety"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thii-yuu",
    thai: "ที่อยู่",
    roman: "thii-yuu",
    chinese: "地址",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 35,
    senses: [
      {
        id: "address",
        chinese: "用于寄送、登记、联系或定位的住址/地址",
        examples: [
          {
            thai: "กรุณากรอกที่อยู่ให้ครบ รวมบ้านเลขที่ ซอย และรหัสไปรษณีย์",
            roman: "ga-ru-naa graawk thii-yuu hai khrop, ruam baan-leek-thii, saawy, lae ra-hat-bprai-sa-nii",
            chinese: "请填写完整地址，包括门牌号、巷名和邮政编码。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "สถานที่อยู่", roman: "sa-thaan-thii-yuu", chinese: "住址；所在地", notesZh: "较说明性，日常用 ที่อยู่。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ทำเล", roman: "tham-lee", chinese: "地段" },
        distinctionZh: "ที่อยู่ 是具体地址；ทำเล 是位置条件或地段好坏。",
      },
    ],
    collocations: [{ thai: "ที่อยู่จัดส่ง", roman: "thii-yuu jat-song", chinese: "配送地址" }],
    usageNotesZh: ["填写配送或酒店表格时，ที่อยู่ 是核心词。"],
    tags: ["address", "delivery", "form"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "baan-leek-thii",
    thai: "บ้านเลขที่",
    roman: "baan-leek-thii",
    chinese: "门牌号；房屋号码",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 36,
    senses: [
      {
        id: "house-number",
        chinese: "地址中表示房屋或建筑编号的部分",
        examples: [
          {
            thai: "ถ้าไม่มีบ้านเลขที่ชัดเจน คนส่งของอาจหาที่อยู่ไม่เจอ",
            roman: "thaa mai mii baan-leek-thii chat-jen, khon-song-khaawng aat haa thii-yuu mai jooe",
            chinese: "如果门牌号不清楚，送货员可能找不到地址。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เลขที่บ้าน", roman: "leek-thii baan", chinese: "门牌号" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "ra-hat-bprai-sa-nii", thai: "รหัสไปรษณีย์", roman: "ra-hat-bprai-sa-nii", chinese: "邮政编码" },
        distinctionZh: "บ้านเลขที่ 是具体门牌号；รหัสไปรษณีย์ 是邮编。",
      },
    ],
    collocations: [{ thai: "กรอกบ้านเลขที่", roman: "graawk baan-leek-thii", chinese: "填写门牌号" }],
    usageNotesZh: ["บ้านเลขที่ 字面是“房子的号码”。"],
    tags: ["address", "house-number", "delivery"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "ra-hat-bprai-sa-nii",
    thai: "รหัสไปรษณีย์",
    roman: "ra-hat-bprai-sa-nii",
    chinese: "邮政编码",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 37,
    senses: [
      {
        id: "postal-code",
        chinese: "邮件、配送地址中用于区分地区的数字编码",
        examples: [
          {
            thai: "ระบบแจ้งว่ารหัสไปรษณีย์ไม่ถูกต้อง จึงไม่สามารถคำนวณค่าส่งได้",
            roman: "ra-bop jaaeng waa ra-hat-bprai-sa-nii mai thuuk-dtaawng, jeung mai saa-maat kham-nuan khaa-song dai",
            chinese: "系统提示邮政编码不正确，因此无法计算运费。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "รหัสปณ.", roman: "ra-hat bpaaw-naaw", chinese: "邮编", notesZh: "缩写形式，正式表格中有时出现。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "baan-leek-thii", thai: "บ้านเลขที่", roman: "baan-leek-thii", chinese: "门牌号" },
        distinctionZh: "邮编定位区域；门牌号定位具体房屋或建筑。",
      },
    ],
    collocations: [{ thai: "ใส่รหัสไปรษณีย์", roman: "sai ra-hat-bprai-sa-nii", chinese: "输入邮政编码" }],
    usageNotesZh: ["รหัส 是代码，ไปรษณีย์ 是邮政。"],
    tags: ["postal-code", "delivery", "address"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "saawy",
    thai: "ซอย",
    roman: "saawy",
    chinese: "巷；小路",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 38,
    senses: [
      {
        id: "side-street",
        chinese: "从主路分出去的小巷或支路，泰国地址中常见",
        examples: [
          {
            thai: "ร้านนวดอยู่ในซอยเล็กข้างโรงแรม เดินเข้าไปประมาณห้าสิบเมตร",
            roman: "raan nuuat yuu nai saawy lek khaang roong-raem, doen khao bpai bpra-maan haa-sip meet",
            chinese: "按摩店在酒店旁边的小巷里，走进去大约五十米。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ตรอก", roman: "dtraawk", chinese: "小巷", notesZh: "有时比 ซอย 更窄或更旧式。" }],
    antonyms: [{ thai: "ถนนใหญ่", roman: "tha-non yai", chinese: "大路；主路" }],
    comparisons: [
      {
        kind: "usage-pair",
        target: { thai: "ถนน", roman: "tha-non", chinese: "街道；道路" },
        distinctionZh: "ถนน 是道路/街道；ซอย 通常是从主路进去的小巷。",
      },
    ],
    collocations: [{ thai: "ปากซอย", roman: "bpaak saawy", chinese: "巷口" }],
    usageNotesZh: ["曼谷地址常见 ถนน + ซอย + บ้านเลขที่ 的结构。"],
    tags: ["address", "street", "directions"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "muu-baan",
    thai: "หมู่บ้าน",
    roman: "muu-baan",
    chinese: "村；住宅小区",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 39,
    senses: [
      {
        id: "village-or-housing-estate",
        chinese: "自然村、社区，或泰国地址中常见的住宅小区名",
        examples: [
          {
            thai: "ที่อยู่จัดส่งอยู่ในหมู่บ้านใหม่หลังตลาด คนส่งของต้องแลกบัตรที่ป้อมยาม",
            roman: "thii-yuu jat-song yuu nai muu-baan mai lang dta-laat, khon-song-khaawng dtawng laaek bat thii bpaawm-yaam",
            chinese: "配送地址在市场后面的新住宅小区，送货员需要在保安亭换证。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ชุมชน", roman: "chum-chon", chinese: "社区" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "คอนโด", roman: "khawn-doo", chinese: "公寓楼" },
        distinctionZh: "หมู่บ้าน 可指村或住宅小区；คอนโด 是公寓楼/公寓项目。",
      },
    ],
    collocations: [{ thai: "ชื่อหมู่บ้าน", roman: "chue muu-baan", chinese: "小区/村名" }],
    usageNotesZh: ["หมู่บ้าน 在现代城市地址里常指 gated community 或住宅小区。"],
    tags: ["address", "village", "housing"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtam-bon",
    thai: "ตำบล",
    roman: "dtam-bon",
    chinese: "乡；分区",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 40,
    senses: [
      {
        id: "subdistrict",
        chinese: "泰国地址行政层级中的乡/分区，通常在อำเภอ之下",
        examples: [
          {
            thai: "ในแบบฟอร์มจัดส่ง ต้องเลือกตำบล อำเภอ และจังหวัดให้ตรงกับที่อยู่จริง",
            roman: "nai baaep-faawm jat-song, dtawng lueak dtam-bon, am-phoe, lae jang-wat hai dtrong gap thii-yuu jing",
            chinese: "在配送表格中，必须选择与真实地址一致的乡、县和府。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "แขวง", roman: "khwaaeng", chinese: "区；分区", notesZh: "曼谷地址中常用 แขวง，对应其他府的 ตำบล。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "am-phoe", thai: "อำเภอ", roman: "am-phoe", chinese: "县；区" },
        distinctionZh: "ตำบล 通常小于 อำเภอ，是地址中的下一级行政单位。",
      },
    ],
    collocations: [{ thai: "ตำบลอะไร", roman: "dtam-bon a-rai", chinese: "哪个乡/分区" }],
    usageNotesZh: ["填写泰国地址时，ตำบล、อำเภอ、จังหวัด 经常一起出现。"],
    tags: ["address", "subdistrict", "form"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "am-phoe",
    thai: "อำเภอ",
    roman: "am-phoe",
    chinese: "县；区",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 41,
    senses: [
      {
        id: "district",
        chinese: "泰国地址行政层级中的县/区，通常在จังหวัด之下",
        examples: [
          {
            thai: "ถ้าระบุอำเภอผิด พัสดุอาจถูกส่งไปสาขาขนส่งคนละพื้นที่",
            roman: "thaa ra-bu am-phoe phit, phat-sa-du aat thuuk song bpai saa-khaa khon-song khon-la phuean-thii",
            chinese: "如果县/区填写错误，包裹可能会被送到另一个地区的运输网点。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เขต", roman: "kheet", chinese: "区", notesZh: "曼谷地址中常用 เขต，对应其他府的 อำเภอ。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "dtam-bon", thai: "ตำบล", roman: "dtam-bon", chinese: "乡；分区" },
        distinctionZh: "อำเภอ 大于 ตำบล；曼谷常用 เขต/แขวง 这一组名称。",
      },
    ],
    collocations: [{ thai: "อำเภอเมือง", roman: "am-phoe mueang", chinese: "府治县/市区县" }],
    usageNotesZh: ["อำเภอ 的发音中前面的 อะ 较短，书写时不要漏掉 อำ。"],
    tags: ["address", "district", "form"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jang-wat",
    thai: "จังหวัด",
    roman: "jang-wat",
    chinese: "府；省",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 42,
    senses: [
      {
        id: "province",
        chinese: "泰国主要行政区划单位，地址中常写在อำเภอ之后",
        examples: [
          {
            thai: "ร้านค้าส่งฟรีเฉพาะลูกค้าที่อยู่ในจังหวัดกรุงเทพฯ และปริมณฑล",
            roman: "raan-khaa song frii cha-phaw luuk-khaa thii yuu nai jang-wat grung-theep lae bpa-ri-mon-thon",
            chinese: "商店只对位于曼谷府及周边地区的顾客免运费。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เมือง", roman: "mueang", chinese: "城市；地方", notesZh: "不是严格同义，口语中有时泛指某地。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "am-phoe", thai: "อำเภอ", roman: "am-phoe", chinese: "县；区" },
        distinctionZh: "จังหวัด 是更大的府/省级单位；อำเภอ 是其下一级。",
      },
    ],
    collocations: [{ thai: "จังหวัดเชียงใหม่", roman: "jang-wat chiang-mai", chinese: "清迈府" }],
    usageNotesZh: ["กรุงเทพฯ 在行政上也常写作 กรุงเทพมหานคร，不一定加 จังหวัด。"],
    tags: ["address", "province", "form"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "aa-khaan",
    thai: "อาคาร",
    roman: "aa-khaan",
    chinese: "建筑物；楼",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 43,
    senses: [
      {
        id: "building",
        chinese: "地址、机场、酒店或商场中的建筑物",
        examples: [
          {
            thai: "สำนักงานขายอยู่ในอาคารสีขาวข้างธนาคาร ไม่ใช่ในห้าง",
            roman: "sam-nak-ngaan khaai yuu nai aa-khaan sii khaao khaang tha-naa-khaan, mai chai nai haang",
            chinese: "销售办公室在银行旁边的白色建筑里，不在商场里。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ตึก", roman: "dteuk", chinese: "楼；大楼", notesZh: "口语常用，尤其指楼房。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ตึก", roman: "dteuk", chinese: "楼" },
        distinctionZh: "อาคาร 较中性或正式；ตึก 更口语。",
      },
    ],
    collocations: [{ thai: "อาคารจอดรถ", roman: "aa-khaan jaawt rot", chinese: "停车楼" }],
    usageNotesZh: ["อาคารผู้โดยสาร 是“乘客楼/航站楼”。"],
    tags: ["building", "address", "place"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "chan-floor",
    thai: "ชั้น",
    roman: "chan",
    chinese: "楼层；层",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 44,
    senses: [
      {
        id: "floor-level",
        chinese: "建筑物中的楼层，也可指层级",
        examples: [
          {
            thai: "ร้านซ่อมโทรศัพท์อยู่ชั้นสามของห้าง ใกล้บันไดเลื่อน",
            roman: "raan saawm thoo-ra-sap yuu chan saam khaawng haang, glai ban-dai-luean",
            chinese: "手机维修店在商场三楼，靠近扶梯。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ชั้นที่", roman: "chan thii", chinese: "第……层" }],
    antonyms: [],
    comparisons: [
      {
        kind: "confusable",
        target: { thai: "ฉัน", roman: "chan", chinese: "我" },
        distinctionZh: "ชั้น 是楼层；ฉัน 是“我”，罗马音相同但拼写不同。",
      },
    ],
    collocations: [{ thai: "ชั้นล่าง", roman: "chan laang", chinese: "楼下；底层" }],
    usageNotesZh: ["泰国商场楼层命名可能和中国习惯不同，看标识更稳。"],
    tags: ["floor", "building", "directions"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thaang-khao",
    thai: "ทางเข้า",
    roman: "thaang-khao",
    chinese: "入口",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 45,
    senses: [
      {
        id: "entrance",
        chinese: "进入建筑、商店、车站或小区的地方",
        examples: [
          {
            thai: "จุดรับของแอปเรียกรถอยู่ที่ทางเข้าหลักของอาคาร",
            roman: "jut-rap khaawng aaep-riiak-rot yuu thii thaang-khao lak khaawng aa-khaan",
            chinese: "叫车应用的上车点在建筑主入口。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ประตูเข้า", roman: "bpra-dtuu khao", chinese: "进门；入口门" }],
    antonyms: [{ candidateId: "thaang-aawk", thai: "ทางออก", roman: "thaang-aawk", chinese: "出口" }],
    comparisons: [
      {
        kind: "antonym",
        target: { candidateId: "thaang-aawk", thai: "ทางออก", roman: "thaang-aawk", chinese: "出口" },
        distinctionZh: "ทางเข้า 是进入的地方；ทางออก 是离开的地方。",
      },
    ],
    collocations: [{ thai: "ทางเข้าหลัก", roman: "thaang-khao lak", chinese: "主入口" }],
    usageNotesZh: ["ทาง + เข้า/ออก 是非常实用的方向词组合。"],
    tags: ["entrance", "address", "directions"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thaang-aawk",
    thai: "ทางออก",
    roman: "thaang-aawk",
    chinese: "出口",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 46,
    senses: [
      {
        id: "exit",
        chinese: "离开建筑、车站、商场或区域的通道",
        examples: [
          {
            thai: "เมื่อลงรถไฟใต้ดินแล้ว ให้ใช้ทางออกสามเพื่อไปถึงตลาดเร็วที่สุด",
            roman: "muea long rot-fai-dtai-din laaeo, hai chai thaang-aawk saam phuea bpai thueng dta-laat reo thii-sut",
            chinese: "下地铁后，请走三号出口，这样最快到市场。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ประตูออก", roman: "bpra-dtuu aawk", chinese: "出口门" }],
    antonyms: [{ candidateId: "thaang-khao", thai: "ทางเข้า", roman: "thaang-khao", chinese: "入口" }],
    comparisons: [
      {
        kind: "antonym",
        target: { candidateId: "thaang-khao", thai: "ทางเข้า", roman: "thaang-khao", chinese: "入口" },
        distinctionZh: "ทางออก 用于离开；ทางเข้า 用于进入。",
      },
    ],
    collocations: [{ thai: "หมายเลขทางออก", roman: "maai-leek thaang-aawk", chinese: "出口编号" }],
    usageNotesZh: ["问地铁出口时可说 ใช้ทางออกไหน。"],
    tags: ["exit", "station", "directions"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "pha-naaek-dtaawn-rap",
    thai: "แผนกต้อนรับ",
    roman: "pha-naaek-dtaawn-rap",
    chinese: "前台；接待处",
    partOfSpeech: "名词",
    theme: "酒店服务",
    level: "a2",
    priority: 47,
    senses: [
      {
        id: "reception-desk",
        chinese: "酒店、公司或机构中接待客人和办理手续的部门",
        examples: [
          {
            thai: "ถ้าต้องการฝากกระเป๋าก่อนเช็กอิน กรุณาติดต่อแผนกต้อนรับ",
            roman: "thaa dtawng-gaan faak-gra-bpao gaawn chek-in, ga-ru-naa dtit-dtaaw pha-naaek-dtaawn-rap",
            chinese: "如果想在入住前寄存行李，请联系前台。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "รีเซปชัน", roman: "rii-sep-chan", chinese: "前台", notesZh: "外来口语，酒店中常见。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "เคาน์เตอร์", roman: "khao-dtoe", chinese: "柜台" },
        distinctionZh: "แผนกต้อนรับ 是接待部门；เคาน์เตอร์ 是具体柜台。",
      },
    ],
    collocations: [{ thai: "โทรหาแผนกต้อนรับ", roman: "thoo haa pha-naaek-dtaawn-rap", chinese: "打电话给前台" }],
    usageNotesZh: ["ต้อนรับ 有“接待、欢迎”的意思。"],
    tags: ["hotel", "reception", "service"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "faak-gra-bpao",
    thai: "ฝากกระเป๋า",
    roman: "faak-gra-bpao",
    chinese: "寄存行李",
    partOfSpeech: "动词",
    theme: "酒店服务",
    level: "a2",
    priority: 48,
    senses: [
      {
        id: "leave-bag-temporarily",
        chinese: "把行李暂时交给酒店、车站或服务台保管",
        examples: [
          {
            thai: "หลังเช็กเอาต์แล้ว เรายังฝากกระเป๋าที่โรงแรมได้ถึงหกโมงเย็น",
            roman: "lang chek-ao laaeo, rao yang faak-gra-bpao thii roong-raem dai thueng hok moong yen",
            chinese: "退房后，我们仍可以把行李寄存在酒店到傍晚六点。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ฝากสัมภาระ", roman: "faak sam-phaa-ra", chinese: "寄存行李", notesZh: "更正式，สัมภาระ 指行李总称。" }],
    antonyms: [{ thai: "รับกระเป๋าคืน", roman: "rap gra-bpao khuen", chinese: "取回行李" }],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "loot-gra-bpao", thai: "โหลดกระเป๋า", roman: "loot-gra-bpao", chinese: "托运行李" },
        distinctionZh: "ฝากกระเป๋า 是临时寄存；โหลดกระเป๋า 是机场托运。",
      },
    ],
    collocations: [{ thai: "บริการฝากกระเป๋า", roman: "baaw-ri-gaan faak-gra-bpao", chinese: "行李寄存服务" }],
    usageNotesZh: ["ฝาก 有“托付、寄放”的意思。"],
    tags: ["hotel", "luggage", "service"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jaaeng-thii-yuu",
    thai: "แจ้งที่อยู่",
    roman: "jaaeng-thii-yuu",
    chinese: "告知地址；提供地址",
    partOfSpeech: "动词",
    theme: "地址配送",
    level: "a2",
    priority: 49,
    senses: [
      {
        id: "provide-address",
        chinese: "把配送、联系或接送地址告诉对方",
        examples: [
          {
            thai: "หลังสั่งสินค้าแล้ว ลูกค้าต้องแจ้งที่อยู่จัดส่งให้ครบภายในวันนี้",
            roman: "lang sang sin-khaa laaeo, luuk-khaa dtawng jaaeng thii-yuu jat-song hai khrop phaai-nai wan-nii",
            chinese: "下单后，顾客必须在今天内完整提供配送地址。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "บอกที่อยู่", roman: "baawk thii-yuu", chinese: "告诉地址" }],
    antonyms: [],
    comparisons: [
      {
        kind: "register-pair",
        target: { thai: "บอกที่อยู่", roman: "baawk thii-yuu", chinese: "告诉地址" },
        distinctionZh: "แจ้งที่อยู่ 更适合服务、表格和正式沟通；บอกที่อยู่ 更口语。",
      },
    ],
    collocations: [{ thai: "แจ้งที่อยู่ผิด", roman: "jaaeng thii-yuu phit", chinese: "地址告知错误" }],
    usageNotesZh: ["แจ้ง 常用于“通知、告知”，语气比 บอก 正式。"],
    tags: ["address", "delivery", "service"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jat-song",
    thai: "จัดส่ง",
    roman: "jat-song",
    chinese: "配送；发货",
    partOfSpeech: "动词",
    theme: "地址配送",
    level: "a2",
    priority: 50,
    senses: [
      {
        id: "ship-deliver",
        chinese: "商家安排把商品送到顾客指定地址",
        examples: [
          {
            thai: "ร้านค้าจะจัดส่งสินค้าภายในสองวันหลังจากได้รับหลักฐานการโอน",
            roman: "raan-khaa ja jat-song sin-khaa phaai-nai saawng wan lang-jaak dai rap lak-thaan-gaan-oon",
            chinese: "商家会在收到转账凭证后的两天内发货。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ส่งของ", roman: "song khaawng", chinese: "送货；寄东西" }],
    antonyms: [{ thai: "รับของเอง", roman: "rap khaawng eeng", chinese: "自取" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ส่ง", roman: "song", chinese: "送；发送" },
        distinctionZh: "จัดส่ง 更像商家安排配送/发货；ส่ง 是更基础、更广的“送/发”。",
      },
    ],
    collocations: [{ thai: "จัดส่งฟรี", roman: "jat-song frii", chinese: "免费配送" }],
    usageNotesZh: ["网购和物流场景中 จัดส่ง 比 ส่ง 更正式。"],
    tags: ["delivery", "shipping", "commerce"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "song-duuan",
    thai: "ส่งด่วน",
    roman: "song-duuan",
    chinese: "加急配送；快递",
    partOfSpeech: "动词",
    theme: "地址配送",
    level: "a2",
    priority: 51,
    senses: [
      {
        id: "express-delivery",
        chinese: "用更快方式配送或寄送物品",
        examples: [
          {
            thai: "ถ้าต้องใช้เอกสารพรุ่งนี้เช้า คุณควรเลือกบริการส่งด่วน",
            roman: "thaa dtawng chai eek-ga-saan phrung-nii chaao, khun khuuan lueak baaw-ri-gaan song-duuan",
            chinese: "如果明早需要使用文件，你应该选择加急配送服务。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ส่งแบบด่วน", roman: "song baaep duuan", chinese: "以加急方式寄送" }],
    antonyms: [{ thai: "ส่งธรรมดา", roman: "song tham-ma-daa", chinese: "普通配送" }],
    comparisons: [
      {
        kind: "antonym",
        target: { thai: "ส่งธรรมดา", roman: "song tham-ma-daa", chinese: "普通配送" },
        distinctionZh: "ส่งด่วน 更快但可能更贵；ส่งธรรมดา 速度普通。",
      },
    ],
    collocations: [{ thai: "ค่าส่งด่วน", roman: "khaa song-duuan", chinese: "加急配送费" }],
    usageNotesZh: ["ด่วน 表示紧急、快速，也用于交通和文件场景。"],
    tags: ["express", "delivery", "shipping"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phat-sa-du",
    thai: "พัสดุ",
    roman: "phat-sa-du",
    chinese: "包裹；包件",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 52,
    senses: [
      {
        id: "parcel",
        chinese: "通过物流、快递或邮政寄送的包裹",
        examples: [
          {
            thai: "พัสดุจากเชียงใหม่มาถึงกรุงเทพแล้ว แต่ยังไม่ถูกนำส่งให้ผู้รับ",
            roman: "phat-sa-du jaak chiang-mai maa thueng grung-theep laaeo, dtaae yang mai thuuk nam-song hai phuu-rap",
            chinese: "来自清迈的包裹已经到达曼谷，但还没有派送给收件人。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "กล่องสินค้า", roman: "glaawng sin-khaa", chinese: "商品包裹/箱子" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "จดหมาย", roman: "jot-maai", chinese: "信件" },
        distinctionZh: "พัสดุ 多指包裹；จดหมาย 是信件。",
      },
    ],
    collocations: [{ thai: "รับพัสดุ", roman: "rap phat-sa-du", chinese: "收包裹" }],
    usageNotesZh: ["物流短信里常见 พัสดุ、เลขพัสดุ、ติดตามพัสดุ。"],
    tags: ["parcel", "delivery", "logistics"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "leek-phat-sa-du",
    thai: "เลขพัสดุ",
    roman: "leek-phat-sa-du",
    chinese: "包裹单号；物流单号",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 53,
    senses: [
      {
        id: "tracking-number",
        chinese: "用于查询包裹配送状态的编号",
        examples: [
          {
            thai: "หลังร้านจัดส่งแล้ว ระบบจะส่งเลขพัสดุให้ลูกค้าทางข้อความ",
            roman: "lang raan jat-song laaeo, ra-bop ja song leek-phat-sa-du hai luuk-khaa thaang khaaw-khwaam",
            chinese: "商家发货后，系统会通过短信把物流单号发给顾客。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "หมายเลขพัสดุ", roman: "maai-leek phat-sa-du", chinese: "包裹编号" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "leek-phuu-siia-phaa-sii", thai: "เลขผู้เสียภาษี", roman: "leek-phuu-siia-phaa-sii", chinese: "纳税人识别号" },
        distinctionZh: "เลขพัสดุ 用于查物流；เลขผู้เสียภาษี 用于开票和税务。",
      },
    ],
    collocations: [{ thai: "เช็กเลขพัสดุ", roman: "chek leek-phat-sa-du", chinese: "查询包裹单号" }],
    usageNotesZh: ["เลข 是号码，物流页面常用 เลขพัสดุ。"],
    tags: ["tracking", "parcel", "delivery"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtit-dtaam-phat-sa-du",
    thai: "ติดตามพัสดุ",
    roman: "dtit-dtaam-phat-sa-du",
    chinese: "跟踪包裹；查询物流",
    partOfSpeech: "动词",
    theme: "地址配送",
    level: "a2",
    priority: 54,
    senses: [
      {
        id: "track-parcel",
        chinese: "用包裹单号查询包裹当前状态和位置",
        examples: [
          {
            thai: "ลูกค้าสามารถติดตามพัสดุได้ในแอปหลังจากร้านส่งเลขพัสดุแล้ว",
            roman: "luuk-khaa saa-maat dtit-dtaam-phat-sa-du dai nai aaep lang-jaak raan song leek-phat-sa-du laaeo",
            chinese: "商家发送包裹单号后，顾客可以在应用中查询物流。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เช็กสถานะพัสดุ", roman: "chek sa-thaa-na phat-sa-du", chinese: "查询包裹状态" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "leek-phat-sa-du", thai: "เลขพัสดุ", roman: "leek-phat-sa-du", chinese: "包裹单号" },
        distinctionZh: "เลขพัสดุ 是号码；ติดตามพัสดุ 是用号码查询物流的动作。",
      },
    ],
    collocations: [{ thai: "ระบบติดตามพัสดุ", roman: "ra-bop dtit-dtaam-phat-sa-du", chinese: "包裹跟踪系统" }],
    usageNotesZh: ["ติดตาม 也可用于关注进度、追踪消息。"],
    tags: ["tracking", "delivery", "parcel"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phuu-song",
    thai: "ผู้ส่ง",
    roman: "phuu-song",
    chinese: "寄件人；发送人",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 55,
    senses: [
      {
        id: "sender",
        chinese: "寄出包裹、文件或信息的人",
        examples: [
          {
            thai: "บนกล่องพัสดุต้องมีชื่อผู้ส่งและเบอร์ติดต่อให้ชัดเจน",
            roman: "bon glaawng phat-sa-du dtawng mii chue phuu-song lae boe-dtit-dtaaw hai chat-jen",
            chinese: "包裹箱上必须清楚写明寄件人姓名和联系电话。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "คนส่ง", roman: "khon-song", chinese: "发送/送出的人", notesZh: "口语较宽，可指配送员。" }],
    antonyms: [{ candidateId: "phuu-rap", thai: "ผู้รับ", roman: "phuu-rap", chinese: "收件人" }],
    comparisons: [
      {
        kind: "antonym",
        target: { candidateId: "phuu-rap", thai: "ผู้รับ", roman: "phuu-rap", chinese: "收件人" },
        distinctionZh: "ผู้ส่ง 是寄出的人；ผู้รับ 是收到的人。",
      },
    ],
    collocations: [{ thai: "ที่อยู่ผู้ส่ง", roman: "thii-yuu phuu-song", chinese: "寄件人地址" }],
    usageNotesZh: ["ผู้ + 动词 可构成人的名词，如 ผู้ส่ง、ผู้รับ。"],
    tags: ["sender", "parcel", "delivery"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phuu-rap",
    thai: "ผู้รับ",
    roman: "phuu-rap",
    chinese: "收件人；接收人",
    partOfSpeech: "名词",
    theme: "地址配送",
    level: "a2",
    priority: 56,
    senses: [
      {
        id: "recipient",
        chinese: "接收包裹、文件、转账或信息的人",
        examples: [
          {
            thai: "ถ้าผู้รับไม่อยู่บ้าน พนักงานขนส่งจะโทรนัดส่งใหม่",
            roman: "thaa phuu-rap mai yuu baan, pha-nak-ngaan khon-song ja thoo nat song mai",
            chinese: "如果收件人不在家，物流员工会打电话重新预约配送。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "คนรับ", roman: "khon-rap", chinese: "收的人", notesZh: "更口语。" }],
    antonyms: [{ candidateId: "phuu-song", thai: "ผู้ส่ง", roman: "phuu-song", chinese: "寄件人" }],
    comparisons: [
      {
        kind: "antonym",
        target: { candidateId: "phuu-song", thai: "ผู้ส่ง", roman: "phuu-song", chinese: "寄件人" },
        distinctionZh: "ผู้รับ 是接收方；ผู้ส่ง 是寄出方。",
      },
    ],
    collocations: [{ thai: "ชื่อผู้รับ", roman: "chue phuu-rap", chinese: "收件人姓名" }],
    usageNotesZh: ["支付和物流场景都可以看到 ผู้รับ。"],
    tags: ["recipient", "parcel", "delivery"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "sen-rap",
    thai: "เซ็นรับ",
    roman: "sen-rap",
    chinese: "签收",
    partOfSpeech: "动词",
    theme: "地址配送",
    level: "a2",
    priority: 57,
    senses: [
      {
        id: "sign-to-receive",
        chinese: "收到包裹、文件或货物时签名确认",
        examples: [
          {
            thai: "พัสดุชิ้นนี้ต้องให้ผู้รับเซ็นรับ เพราะเป็นเอกสารสำคัญ",
            roman: "phat-sa-du chin nii dtawng hai phuu-rap sen-rap, phraw bpen eek-ga-saan sam-khan",
            chinese: "这个包裹需要收件人签收，因为是重要文件。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ลงชื่อรับ", roman: "long chue rap", chinese: "签名接收" }],
    antonyms: [{ thai: "ปฏิเสธรับ", roman: "bpa-dti-seet rap", chinese: "拒收" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "รับพัสดุ", roman: "rap phat-sa-du", chinese: "收包裹" },
        distinctionZh: "รับพัสดุ 是收包裹；เซ็นรับ 强调签字确认。",
      },
    ],
    collocations: [{ thai: "หลักฐานเซ็นรับ", roman: "lak-thaan sen-rap", chinese: "签收凭证" }],
    usageNotesZh: ["เซ็น 是 sign 的外来词，服务场景非常常见。"],
    tags: ["signature", "parcel", "delivery"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "song-khuen",
    thai: "ส่งคืน",
    roman: "song-khuen",
    chinese: "寄回；退回",
    partOfSpeech: "动词",
    theme: "退换售后",
    level: "a2",
    priority: 58,
    senses: [
      {
        id: "send-back",
        chinese: "把商品、文件或包裹寄回原处或退回给卖家",
        examples: [
          {
            thai: "ถ้าขนาดไม่พอดี ลูกค้าสามารถส่งคืนสินค้าได้ภายในเจ็ดวัน",
            roman: "thaa kha-naat mai phaaw-dii, luuk-khaa saa-maat song-khuen sin-khaa dai phaai-nai jet wan",
            chinese: "如果尺寸不合适，顾客可以在七天内把商品寄回。",
          },
        ],
      },
    ],
    synonyms: [{ candidateId: "khuen-sin-khaa", thai: "คืนสินค้า", roman: "khuen-sin-khaa", chinese: "退货" }],
    antonyms: [{ candidateId: "jat-song", thai: "จัดส่ง", roman: "jat-song", chinese: "配送；发货" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "khuen-sin-khaa", thai: "คืนสินค้า", roman: "khuen-sin-khaa", chinese: "退货" },
        distinctionZh: "ส่งคืน 强调寄回/送回动作；คืนสินค้า 强调整个退货行为。",
      },
    ],
    collocations: [{ thai: "ส่งคืนทางไปรษณีย์", roman: "song-khuen thaang bprai-sa-nii", chinese: "通过邮政寄回" }],
    usageNotesZh: ["คืน 表示归还，和 ส่ง 合用时强调送回。"],
    tags: ["return", "after-sales", "delivery"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khuen-sin-khaa",
    thai: "คืนสินค้า",
    roman: "khuen-sin-khaa",
    chinese: "退货",
    partOfSpeech: "动词",
    theme: "退换售后",
    level: "a2",
    priority: 59,
    senses: [
      {
        id: "return-goods",
        chinese: "因不合适、损坏或不满意而把商品退给卖家",
        examples: [
          {
            thai: "ร้านนี้รับคืนสินค้าเฉพาะกรณีที่ยังมีป้ายราคาและใบเสร็จ",
            roman: "raan nii rap khuen-sin-khaa cha-phaw ga-ra-nii thii yang mii bpaai raa-khaa lae bai-set",
            chinese: "这家店只在仍有价格牌和收据的情况下接受退货。",
          },
        ],
      },
    ],
    synonyms: [{ candidateId: "song-khuen", thai: "ส่งคืน", roman: "song-khuen", chinese: "寄回；退回" }],
    antonyms: [{ thai: "ซื้อขาด", roman: "sue khaat", chinese: "买断；不可退" }],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "bplian-sin-khaa", thai: "เปลี่ยนสินค้า", roman: "bplian-sin-khaa", chinese: "换货" },
        distinctionZh: "คืนสินค้า 是退掉商品；เปลี่ยนสินค้า 是换成另一件或同款新品。",
      },
    ],
    collocations: [{ thai: "นโยบายคืนสินค้า", roman: "na-yoo-baai khuen-sin-khaa", chinese: "退货政策" }],
    usageNotesZh: ["สินค้า 是商业场景里的“商品”。"],
    tags: ["return", "after-sales", "shopping"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bplian-sin-khaa",
    thai: "เปลี่ยนสินค้า",
    roman: "bplian-sin-khaa",
    chinese: "换货",
    partOfSpeech: "动词",
    theme: "退换售后",
    level: "a2",
    priority: 60,
    senses: [
      {
        id: "exchange-product",
        chinese: "把已买商品换成另一件、另一尺寸或同款新品",
        examples: [
          {
            thai: "ถ้ารองเท้าคู่นี้คับเกินไป คุณสามารถเปลี่ยนสินค้าเป็นไซซ์ใหญ่กว่าได้",
            roman: "thaa raawng-thaao khuu nii khap goen bpai, khun saa-maat bplian-sin-khaa bpen sai yai gwaa dai",
            chinese: "如果这双鞋太紧，你可以把商品换成更大的尺码。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "แลกสินค้า", roman: "laaek sin-khaa", chinese: "交换商品" }],
    antonyms: [{ candidateId: "khuen-sin-khaa", thai: "คืนสินค้า", roman: "khuen-sin-khaa", chinese: "退货" }],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "khuen-sin-khaa", thai: "คืนสินค้า", roman: "khuen-sin-khaa", chinese: "退货" },
        distinctionZh: "เปลี่ยนสินค้า 后通常还会拿到新商品；คืนสินค้า 则是退掉。",
      },
    ],
    collocations: [{ thai: "เงื่อนไขการเปลี่ยนสินค้า", roman: "ngeuan-khai gaan bplian-sin-khaa", chinese: "换货条件" }],
    usageNotesZh: ["售后对话中可问 เปลี่ยนสินค้าได้ไหม。"],
    tags: ["exchange", "after-sales", "shopping"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bai-gam-gap-phaa-sii",
    thai: "ใบกำกับภาษี",
    roman: "bai-gam-gap-phaa-sii",
    chinese: "税务发票",
    partOfSpeech: "名词",
    theme: "收据发票",
    level: "a2",
    priority: 61,
    senses: [
      {
        id: "tax-invoice",
        chinese: "含税务信息、用于报销或税务用途的发票",
        examples: [
          {
            thai: "ถ้าต้องการใบกำกับภาษี กรุณาแจ้งชื่อบริษัทและเลขผู้เสียภาษี",
            roman: "thaa dtawng-gaan bai-gam-gap-phaa-sii, ga-ru-naa jaaeng chue baaw-ri-sat lae leek-phuu-siia-phaa-sii",
            chinese: "如果需要税务发票，请告知公司名称和纳税人识别号。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ใบกำกับภาษีเต็มรูป", roman: "bai-gam-gap-phaa-sii dtem ruup", chinese: "完整税务发票" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { thai: "ใบเสร็จ", roman: "bai-set", chinese: "收据" },
        distinctionZh: "ใบเสร็จ 证明付款；ใบกำกับภาษี 包含税务资料，常用于公司报销。",
      },
    ],
    collocations: [{ thai: "ขอใบกำกับภาษี", roman: "khaaw bai-gam-gap-phaa-sii", chinese: "索取税务发票" }],
    usageNotesZh: ["กำกับภาษี 与税务相关，不等同于普通小票。"],
    tags: ["invoice", "tax", "receipt"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bai-jaaeng-nii",
    thai: "ใบแจ้งหนี้",
    roman: "bai-jaaeng-nii",
    chinese: "账单；付款通知单",
    partOfSpeech: "名词",
    theme: "收据发票",
    level: "a2",
    priority: 62,
    senses: [
      {
        id: "invoice-billing-notice",
        chinese: "通知应付金额、付款期限和项目明细的单据",
        examples: [
          {
            thai: "บริษัทส่งใบแจ้งหนี้ทางอีเมล และขอให้ชำระเงินภายในสิ้นเดือน",
            roman: "baaw-ri-sat song bai-jaaeng-nii thaang ii-meo, lae khaaw hai cham-ra ngoen phaai-nai sin duean",
            chinese: "公司通过邮件发送账单，并要求在月底前付款。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "บิลเรียกเก็บเงิน", roman: "bin riiak gep ngoen", chinese: "收费账单" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "bai-gam-gap-phaa-sii", thai: "ใบกำกับภาษี", roman: "bai-gam-gap-phaa-sii", chinese: "税务发票" },
        distinctionZh: "ใบแจ้งหนี้ 通知要付款；ใบกำกับภาษี 用于税务和报销记录。",
      },
    ],
    collocations: [{ thai: "ออกใบแจ้งหนี้", roman: "aawk bai-jaaeng-nii", chinese: "开具账单" }],
    usageNotesZh: ["หนี้ 是债务/欠款，ใบแจ้งหนี้ 是通知应付款的文件。"],
    tags: ["invoice", "billing", "payment"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "leek-phuu-siia-phaa-sii",
    thai: "เลขผู้เสียภาษี",
    roman: "leek-phuu-siia-phaa-sii",
    chinese: "纳税人识别号",
    partOfSpeech: "名词",
    theme: "收据发票",
    level: "a2",
    priority: 63,
    senses: [
      {
        id: "taxpayer-id",
        chinese: "开具税务发票时用于识别个人或公司的税务号码",
        examples: [
          {
            thai: "พนักงานขอเลขผู้เสียภาษีและที่อยู่บริษัทก่อนออกใบกำกับภาษี",
            roman: "pha-nak-ngaan khaaw leek-phuu-siia-phaa-sii lae thii-yuu baaw-ri-sat gaawn aawk bai-gam-gap-phaa-sii",
            chinese: "员工在开具税务发票前索要纳税人识别号和公司地址。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เลขประจำตัวผู้เสียภาษี", roman: "leek bpra-jam-dtua phuu-siia-phaa-sii", chinese: "纳税人登记号码" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "leek-phat-sa-du", thai: "เลขพัสดุ", roman: "leek-phat-sa-du", chinese: "包裹单号" },
        distinctionZh: "เลขผู้เสียภาษี 用于开票；เลขพัสดุ 用于物流查询。",
      },
    ],
    collocations: [{ thai: "กรอกเลขผู้เสียภาษี", roman: "graawk leek-phuu-siia-phaa-sii", chinese: "填写纳税人识别号" }],
    usageNotesZh: ["ผู้เสียภาษี 字面是“缴税的人/主体”。"],
    tags: ["tax", "invoice", "business"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "yaawt-ruam",
    thai: "ยอดรวม",
    roman: "yaawt-ruam",
    chinese: "总计；合计金额",
    partOfSpeech: "名词",
    theme: "银行支付",
    level: "a2",
    priority: 64,
    senses: [
      {
        id: "total-amount",
        chinese: "所有商品、费用、税费相加后的总金额",
        examples: [
          {
            thai: "ยอดรวมในใบเสร็จรวมภาษีและค่าบริการแล้ว ไม่ต้องจ่ายเพิ่ม",
            roman: "yaawt-ruam nai bai-set ruam phaa-sii lae khaa-baaw-ri-gaan laaeo, mai dtawng jaai phoem",
            chinese: "收据上的总计已经包含税和服务费，不需要额外付款。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "จำนวนเงินรวม", roman: "jam-nuan ngoen ruam", chinese: "合计金额" }],
    antonyms: [{ candidateId: "raa-khaa-dtem", thai: "ราคาเต็ม", roman: "raa-khaa-dtem", chinese: "原价；全价" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "yaawt-ngoen", thai: "ยอดเงิน", roman: "yaawt-ngoen", chinese: "金额；余额" },
        distinctionZh: "ยอดรวม 强调合计；ยอดเงิน 可指某一金额或账户余额。",
      },
    ],
    collocations: [{ thai: "ยอดรวมทั้งหมด", roman: "yaawt-ruam thang-mot", chinese: "全部总计" }],
    usageNotesZh: ["ยอด 在账单和银行场景里常表示金额数值。"],
    tags: ["total", "bill", "payment"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "yaawt-ngoen",
    thai: "ยอดเงิน",
    roman: "yaawt-ngoen",
    chinese: "金额；余额",
    partOfSpeech: "名词",
    theme: "银行支付",
    level: "a2",
    priority: 65,
    senses: [
      {
        id: "amount-balance",
        chinese: "交易金额，或账户中显示的余额",
        examples: [
          {
            thai: "ก่อนกดยืนยันโอนเงิน กรุณาตรวจยอดเงินและชื่อผู้รับให้ถูกต้อง",
            roman: "gaawn got yuen-yan oon-ngoen, ga-ru-naa dtruat yaawt-ngoen lae chue phuu-rap hai thuuk-dtaawng",
            chinese: "确认转账前，请检查金额和收款人姓名是否正确。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "จำนวนเงิน", roman: "jam-nuan ngoen", chinese: "金额" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "yaawt-ruam", thai: "ยอดรวม", roman: "yaawt-ruam", chinese: "总计" },
        distinctionZh: "ยอดเงิน 是金额/余额；ยอดรวม 是加总后的金额。",
      },
    ],
    collocations: [{ thai: "ยอดเงินคงเหลือ", roman: "yaawt-ngoen khong-luea", chinese: "剩余余额" }],
    usageNotesZh: ["银行应用中常见 ยอดเงิน、ยอดเงินคงเหลือ。"],
    tags: ["amount", "banking", "payment"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "oon-ngoen",
    thai: "โอนเงิน",
    roman: "oon-ngoen",
    chinese: "转账",
    partOfSpeech: "动词",
    theme: "银行支付",
    level: "a2",
    priority: 66,
    senses: [
      {
        id: "transfer-money",
        chinese: "通过银行、应用或账户把钱转给别人",
        examples: [
          {
            thai: "หลังโอนเงินแล้ว กรุณาส่งหลักฐานการโอนให้ร้านค้าทางแชต",
            roman: "lang oon-ngoen laaeo, ga-ru-naa song lak-thaan-gaan-oon hai raan-khaa thaang chaaet",
            chinese: "转账后，请通过聊天把转账凭证发给商家。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "โอน", roman: "oon", chinese: "转；转账" }],
    antonyms: [{ candidateId: "thaawn-ngoen-withdraw", thai: "ถอนเงิน", roman: "thaawn-ngoen", chinese: "取款" }],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "sa-gaan-jaai", thai: "สแกนจ่าย", roman: "sa-gaan-jaai", chinese: "扫码付款" },
        distinctionZh: "โอนเงิน 强调转账；สแกนจ่าย 是通过扫码完成付款。",
      },
    ],
    collocations: [{ thai: "โอนเงินเข้าบัญชี", roman: "oon-ngoen khao ban-chii", chinese: "转入账户" }],
    usageNotesZh: ["โอนเงิน 后面常接 ให้ + 人 或 เข้า + บัญชี。"],
    tags: ["transfer", "banking", "payment"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "ban-chii",
    thai: "บัญชี",
    roman: "ban-chii",
    chinese: "账户；账目",
    partOfSpeech: "名词",
    theme: "银行支付",
    level: "a2",
    priority: 67,
    senses: [
      {
        id: "account",
        chinese: "银行、应用或平台中记录资金和交易的账户",
        examples: [
          {
            thai: "กรุณาตรวจชื่อบัญชีก่อนโอนเงิน เพื่อป้องกันการโอนผิด",
            roman: "ga-ru-naa dtruat chue ban-chii gaawn oon-ngoen, phuea bpaawng-gan gaan oon phit",
            chinese: "转账前请检查账户名，以防转错。",
          },
        ],
      },
    ],
    synonyms: [{ candidateId: "ban-chii-tha-naa-khaan", thai: "บัญชีธนาคาร", roman: "ban-chii-tha-naa-khaan", chinese: "银行账户" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "ban-chii-tha-naa-khaan", thai: "บัญชีธนาคาร", roman: "ban-chii-tha-naa-khaan", chinese: "银行账户" },
        distinctionZh: "บัญชี 可泛指账户；บัญชีธนาคาร 明确是银行账户。",
      },
    ],
    collocations: [{ thai: "เลขบัญชี", roman: "leek ban-chii", chinese: "账号" }],
    usageNotesZh: ["บัญชี 在会计、银行、应用登录场景都可出现。"],
    tags: ["account", "banking", "payment"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "ban-chii-tha-naa-khaan",
    thai: "บัญชีธนาคาร",
    roman: "ban-chii-tha-naa-khaan",
    chinese: "银行账户",
    partOfSpeech: "名词",
    theme: "银行支付",
    level: "a2",
    priority: 68,
    senses: [
      {
        id: "bank-account",
        chinese: "在银行开设、用于存取款和转账的账户",
        examples: [
          {
            thai: "ร้านค้าให้เลขบัญชีธนาคารสำหรับโอนมัดจำก่อนจัดส่งสินค้า",
            roman: "raan-khaa hai leek ban-chii-tha-naa-khaan sam-rap oon mat-jam gaawn jat-song sin-khaa",
            chinese: "商家提供银行账号，用于发货前转订金。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "บัญชีเงินฝาก", roman: "ban-chii ngoen-faak", chinese: "存款账户" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "ban-chii", thai: "บัญชี", roman: "ban-chii", chinese: "账户" },
        distinctionZh: "บัญชีธนาคาร 更具体；บัญชี 可以是平台账号、账目或银行账户。",
      },
    ],
    collocations: [{ thai: "ชื่อบัญชีธนาคาร", roman: "chue ban-chii-tha-naa-khaan", chinese: "银行账户名" }],
    usageNotesZh: ["ธนาคาร 是银行，บัญชีธนาคาร 是支付场景基础词。"],
    tags: ["bank-account", "transfer", "payment"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "tha-naa-khaan",
    thai: "ธนาคาร",
    roman: "tha-naa-khaan",
    chinese: "银行",
    partOfSpeech: "名词",
    theme: "银行支付",
    level: "a2",
    priority: 69,
    senses: [
      {
        id: "bank",
        chinese: "办理存款、取款、转账和金融服务的机构",
        examples: [
          {
            thai: "ธนาคารใกล้โรงแรมเปิดถึงบ่ายสามโมงครึ่งในวันธรรมดา",
            roman: "tha-naa-khaan glai roong-raem bpoet thueng baai saam moong khrueng nai wan tham-ma-daa",
            chinese: "酒店附近的银行在工作日营业到下午三点半。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "แบงก์", roman: "baaeng", chinese: "银行", notesZh: "外来口语，也可指纸币，需看语境。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "confusable",
        target: { thai: "แบงก์", roman: "baaeng", chinese: "银行；纸币" },
        distinctionZh: "ธนาคาร 是标准词；แบงก์ 口语中既可指银行，也可指纸币。",
      },
    ],
    collocations: [{ thai: "สาขาธนาคาร", roman: "saa-khaa tha-naa-khaan", chinese: "银行分行" }],
    usageNotesZh: ["ธนาคาร 后面常接银行名称。"],
    tags: ["bank", "payment", "finance"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtuu-ee-thii-em",
    thai: "ตู้เอทีเอ็ม",
    roman: "dtuu-ee-thii-em",
    chinese: "自动取款机",
    partOfSpeech: "名词",
    theme: "银行支付",
    level: "a2",
    priority: 70,
    senses: [
      {
        id: "atm",
        chinese: "用于取款、查余额或办理部分银行服务的机器",
        examples: [
          {
            thai: "ในสนามบินมีตู้เอทีเอ็มหลายธนาคารอยู่ใกล้ประตูทางออก",
            roman: "nai sa-naam-bin mii dtuu-ee-thii-em laai tha-naa-khaan yuu glai bpra-dtuu thaang-aawk",
            chinese: "机场里有多家银行的自动取款机，位于出口附近。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เอทีเอ็ม", roman: "ee-thii-em", chinese: "ATM" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "tha-naa-khaan", thai: "ธนาคาร", roman: "tha-naa-khaan", chinese: "银行" },
        distinctionZh: "ตู้เอทีเอ็ม 是机器；ธนาคาร 是机构或银行网点。",
      },
    ],
    collocations: [{ thai: "กดเงินที่ตู้เอทีเอ็ม", roman: "got ngoen thii dtuu-ee-thii-em", chinese: "在ATM取钱" }],
    usageNotesZh: ["ตู้ 是柜/机，ตู้เอทีเอ็ม 指 ATM 机器。"],
    tags: ["atm", "bank", "cash"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thaawn-ngoen-withdraw",
    thai: "ถอนเงิน",
    roman: "thaawn-ngoen",
    chinese: "取款；提款",
    partOfSpeech: "动词",
    theme: "银行支付",
    level: "a2",
    priority: 71,
    senses: [
      {
        id: "withdraw-money",
        chinese: "从银行账户或ATM中取出现金",
        examples: [
          {
            thai: "ถ้าต้องใช้เงินสดที่ตลาด คุณสามารถถอนเงินจากตู้เอทีเอ็มหน้าโรงแรม",
            roman: "thaa dtawng chai ngoen-sot thii dta-laat, khun saa-maat thaawn-ngoen jaak dtuu-ee-thii-em naa roong-raem",
            chinese: "如果在市场需要现金，你可以从酒店前面的ATM取款。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "กดเงิน", roman: "got ngoen", chinese: "取钱", notesZh: "口语常用于ATM取钱。" }],
    antonyms: [{ candidateId: "faak-ngoen", thai: "ฝากเงิน", roman: "faak-ngoen", chinese: "存钱" }],
    comparisons: [
      {
        kind: "confusable",
        target: { thai: "ทอนเงิน", roman: "thaawn-ngoen", chinese: "找钱" },
        distinctionZh: "ถอนเงิน 是从账户取钱；ทอนเงิน 是商家找零。两个词泰文首字母不同。",
      },
    ],
    collocations: [{ thai: "ถอนเงินสด", roman: "thaawn ngoen-sot", chinese: "提取现金" }],
    usageNotesZh: ["ถอน 和 ทอน 罗马音相近，但含义完全不同。"],
    tags: ["withdraw", "atm", "cash"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "faak-ngoen",
    thai: "ฝากเงิน",
    roman: "faak-ngoen",
    chinese: "存钱；存款",
    partOfSpeech: "动词",
    theme: "银行支付",
    level: "a2",
    priority: 72,
    senses: [
      {
        id: "deposit-money",
        chinese: "把现金或资金存入银行账户",
        examples: [
          {
            thai: "พนักงานธนาคารช่วยอธิบายวิธีฝากเงินเข้าบัญชีใหม่ให้คุณแม่",
            roman: "pha-nak-ngaan tha-naa-khaan chuai a-thi-baai wi-thii faak-ngoen khao ban-chii mai hai khun-maae",
            chinese: "银行员工帮妈妈解释了把钱存入新账户的方法。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "นำเงินเข้าบัญชี", roman: "nam ngoen khao ban-chii", chinese: "把钱存入账户" }],
    antonyms: [{ candidateId: "thaawn-ngoen-withdraw", thai: "ถอนเงิน", roman: "thaawn-ngoen", chinese: "取款" }],
    comparisons: [
      {
        kind: "antonym",
        target: { candidateId: "thaawn-ngoen-withdraw", thai: "ถอนเงิน", roman: "thaawn-ngoen", chinese: "取款" },
        distinctionZh: "ฝากเงิน 是把钱放进账户；ถอนเงิน 是从账户取出现金。",
      },
    ],
    collocations: [{ thai: "ฝากเงินสด", roman: "faak ngoen-sot", chinese: "存现金" }],
    usageNotesZh: ["ฝาก 在银行中是存款，在酒店中也可表示寄存。"],
    tags: ["deposit", "bank", "payment"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "sa-gaan-jaai",
    thai: "สแกนจ่าย",
    roman: "sa-gaan-jaai",
    chinese: "扫码付款",
    partOfSpeech: "动词",
    theme: "银行支付",
    level: "a2",
    priority: 73,
    senses: [
      {
        id: "scan-to-pay",
        chinese: "用手机扫描二维码完成付款",
        examples: [
          {
            thai: "ร้านกาแฟเล็ก ๆ นี้ไม่รับบัตรเครดิต แต่สแกนจ่ายผ่านคิวอาร์โค้ดได้",
            roman: "raan gaa-faae lek lek nii mai rap bat-khree-dit, dtaae sa-gaan-jaai phaan khiu-aa-khoot dai",
            chinese: "这家小咖啡店不收信用卡，但可以通过二维码扫码付款。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "จ่ายผ่านคิวอาร์โค้ด", roman: "jaai phaan khiu-aa-khoot", chinese: "通过二维码付款" }],
    antonyms: [{ thai: "จ่ายเงินสด", roman: "jaai ngoen-sot", chinese: "付现金" }],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "oon-ngoen", thai: "โอนเงิน", roman: "oon-ngoen", chinese: "转账" },
        distinctionZh: "สแกนจ่าย 是扫码付款流程；โอนเงิน 是转账，可能不需要扫码。",
      },
    ],
    collocations: [{ thai: "สแกนจ่ายได้ไหม", roman: "sa-gaan-jaai dai mai", chinese: "可以扫码付款吗" }],
    usageNotesZh: ["สแกน 是外来词，จ่าย 是付款。"],
    tags: ["qr-payment", "mobile-payment", "shopping"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khiu-aa-khoot",
    thai: "คิวอาร์โค้ด",
    roman: "khiu-aa-khoot",
    chinese: "二维码",
    partOfSpeech: "名词",
    theme: "银行支付",
    level: "a2",
    priority: 74,
    senses: [
      {
        id: "qr-code",
        chinese: "用于付款、打开网页或读取信息的方形码",
        examples: [
          {
            thai: "คิวอาร์โค้ดของร้านติดอยู่ข้างแคชเชียร์ ลูกค้าสามารถสแกนจ่ายได้เลย",
            roman: "khiu-aa-khoot khaawng raan dtit yuu khaang khaae-cheer, luuk-khaa saa-maat sa-gaan-jaai dai loei",
            chinese: "店里的二维码贴在收银员旁边，顾客可以直接扫码付款。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "QR", roman: "khiu-aa", chinese: "二维码缩写", notesZh: "标识中常直接写英文QR。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "sa-gaan-jaai", thai: "สแกนจ่าย", roman: "sa-gaan-jaai", chinese: "扫码付款" },
        distinctionZh: "คิวอาร์โค้ด 是码；สแกนจ่าย 是用码付款的动作。",
      },
    ],
    collocations: [{ thai: "แสดงคิวอาร์โค้ด", roman: "sa-daaeng khiu-aa-khoot", chinese: "显示二维码" }],
    usageNotesZh: ["โค้ด 是 code 的外来词。"],
    tags: ["qr-code", "payment", "mobile"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phraawm-phee",
    thai: "พร้อมเพย์",
    roman: "phraawm-phee",
    chinese: "PromptPay；泰国即时转账系统",
    partOfSpeech: "名词",
    theme: "银行支付",
    level: "a2",
    priority: 75,
    senses: [
      {
        id: "promptpay",
        chinese: "泰国常用的即时转账/收款系统，可用手机号或身份证号关联账户",
        examples: [
          {
            thai: "แม่ค้าขอให้โอนผ่านพร้อมเพย์ เพราะเงินเข้าบัญชีทันทีและไม่มีค่าธรรมเนียม",
            roman: "maae-khaa khaaw hai oon phaan phraawm-phee, phraw ngoen khao ban-chii than-thii lae mai mii khaa-tham-niiam",
            chinese: "女商贩请我通过PromptPay转账，因为钱会立刻到账且没有手续费。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ระบบพร้อมเพย์", roman: "ra-bop phraawm-phee", chinese: "PromptPay系统" }],
    antonyms: [{ thai: "เงินสด", roman: "ngoen-sot", chinese: "现金" }],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "oon-ngoen", thai: "โอนเงิน", roman: "oon-ngoen", chinese: "转账" },
        distinctionZh: "พร้อมเพย์ 是泰国转账系统；โอนเงิน 是转账动作。",
      },
    ],
    collocations: [{ thai: "โอนพร้อมเพย์", roman: "oon phraawm-phee", chinese: "通过PromptPay转账" }],
    usageNotesZh: ["พร้อมเพย์ 是泰国日常移动支付高频词。"],
    tags: ["promptpay", "mobile-payment", "banking"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "aaep-tha-naa-khaan",
    thai: "แอปธนาคาร",
    roman: "aaep-tha-naa-khaan",
    chinese: "银行应用",
    partOfSpeech: "名词",
    theme: "银行支付",
    level: "a2",
    priority: 76,
    senses: [
      {
        id: "banking-app",
        chinese: "手机上用于查余额、转账、扫码付款的银行应用",
        examples: [
          {
            thai: "ถ้าแอปธนาคารล่ม คุณอาจต้องจ่ายเงินสดหรือใช้บัตรเครดิตแทน",
            roman: "thaa aaep-tha-naa-khaan lom, khun aat dtawng jaai ngoen-sot rue chai bat-khree-dit thaaen",
            chinese: "如果银行应用故障，你可能需要改用现金或信用卡付款。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "โมบายแบงก์กิ้ง", roman: "moo-baai baaeng-ging", chinese: "手机银行", notesZh: "外来口语。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "tha-naa-khaan", thai: "ธนาคาร", roman: "tha-naa-khaan", chinese: "银行" },
        distinctionZh: "แอปธนาคาร 是手机应用；ธนาคาร 是机构或网点。",
      },
    ],
    collocations: [{ thai: "เปิดแอปธนาคาร", roman: "bpoet aaep-tha-naa-khaan", chinese: "打开银行应用" }],
    usageNotesZh: ["แอป + 名词 是现代泰语常见构词方式。"],
    tags: ["banking-app", "mobile-payment", "bank"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khaa-tham-niiam",
    thai: "ค่าธรรมเนียม",
    roman: "khaa-tham-niiam",
    chinese: "手续费；费用",
    partOfSpeech: "名词",
    theme: "银行支付",
    level: "a2",
    priority: 77,
    senses: [
      {
        id: "fee",
        chinese: "银行、平台、服务或手续额外收取的费用",
        examples: [
          {
            thai: "การถอนเงินต่างธนาคารอาจมีค่าธรรมเนียมสิบห้าบาทต่อครั้ง",
            roman: "gaan thaawn-ngoen dtaang tha-naa-khaan aat mii khaa-tham-niiam sip-haa baat dtaaw khrang",
            chinese: "跨行取款可能每次有十五泰铢手续费。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ค่าใช้บริการ", roman: "khaa-chai-baaw-ri-gaan", chinese: "服务使用费" }],
    antonyms: [{ thai: "ฟรีค่าธรรมเนียม", roman: "frii khaa-tham-niiam", chinese: "免手续费" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ค่าบริการ", roman: "khaa-baaw-ri-gaan", chinese: "服务费" },
        distinctionZh: "ค่าธรรมเนียม 偏手续费/规费；ค่าบริการ 偏服务费。",
      },
    ],
    collocations: [{ thai: "ไม่มีค่าธรรมเนียม", roman: "mai mii khaa-tham-niiam", chinese: "没有手续费" }],
    usageNotesZh: ["ธรรมเนียม 本身有惯例、规费的意思。"],
    tags: ["fee", "banking", "payment"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phaawn-cham-ra",
    thai: "ผ่อนชำระ",
    roman: "phaawn-cham-ra",
    chinese: "分期付款",
    partOfSpeech: "动词",
    theme: "银行支付",
    level: "a2",
    priority: 78,
    senses: [
      {
        id: "pay-installments",
        chinese: "把总金额分成几期付款",
        examples: [
          {
            thai: "มือถือรุ่นนี้สามารถผ่อนชำระสิบเดือนได้ถ้าใช้บัตรเครดิตที่ร่วมรายการ",
            roman: "mue-thue run nii saa-maat phaawn-cham-ra sip duean dai thaa chai bat-khree-dit thii ruam raai-gaan",
            chinese: "这款手机如果使用参与活动的信用卡，可以分十个月付款。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ผ่อน", roman: "phaawn", chinese: "分期还款；分期付款" }],
    antonyms: [{ thai: "จ่ายเต็มจำนวน", roman: "jaai dtem jam-nuan", chinese: "全额支付" }],
    comparisons: [
      {
        kind: "antonym",
        target: { thai: "จ่ายเต็มจำนวน", roman: "jaai dtem jam-nuan", chinese: "全额支付" },
        distinctionZh: "ผ่อนชำระ 是分期；จ่ายเต็มจำนวน 是一次付清。",
      },
    ],
    collocations: [{ thai: "ผ่อนชำระรายเดือน", roman: "phaawn-cham-ra raai duean", chinese: "按月分期付款" }],
    usageNotesZh: ["ชำระ 是较正式的“支付/缴纳”。"],
    tags: ["installment", "credit-card", "payment"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "ngoen-daao",
    thai: "เงินดาวน์",
    roman: "ngoen-daao",
    chinese: "首付款；订金",
    partOfSpeech: "名词",
    theme: "银行支付",
    level: "a2",
    priority: 79,
    senses: [
      {
        id: "down-payment",
        chinese: "分期购买或预订时先支付的一部分款项",
        examples: [
          {
            thai: "ร้านรถมอเตอร์ไซค์ขอเงินดาวน์ห้าพันบาทก่อนทำสัญญาผ่อนชำระ",
            roman: "raan rot maaw-dtoe-sai khaaw ngoen-daao haa phan baat gaawn tham san-yaa phaawn-cham-ra",
            chinese: "摩托车店在办理分期合同前要求五千泰铢首付款。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เงินมัดจำ", roman: "ngoen mat-jam", chinese: "押金；订金" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "มัดจำ", roman: "mat-jam", chinese: "押金；订金" },
        distinctionZh: "เงินดาวน์ 多用于分期购买首付款；มัดจำ 常用于预订或保证金。",
      },
    ],
    collocations: [{ thai: "จ่ายเงินดาวน์", roman: "jaai ngoen-daao", chinese: "支付首付款" }],
    usageNotesZh: ["ดาวน์ 来自 down payment 的外来用法。"],
    tags: ["down-payment", "installment", "commerce"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtaaw-raa-khaa",
    thai: "ต่อราคา",
    roman: "dtaaw-raa-khaa",
    chinese: "讲价；砍价",
    partOfSpeech: "动词",
    theme: "议价价格",
    level: "a2",
    priority: 80,
    senses: [
      {
        id: "bargain-price",
        chinese: "和卖家商量，希望把价格降下来",
        examples: [
          {
            thai: "ที่ตลาดกลางคืนสามารถต่อราคาได้บ้าง แต่ควรพูดอย่างสุภาพ",
            roman: "thii dta-laat glaang-khuen saa-maat dtaaw-raa-khaa dai baang, dtaae khuuan phuut yaang su-phaap",
            chinese: "在夜市可以稍微讲价，但应该礼貌地说。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ขอลดราคา", roman: "khaaw lot-raa-khaa", chinese: "请求降价" }],
    antonyms: [{ candidateId: "raa-khaa-dtem", thai: "ราคาเต็ม", roman: "raa-khaa-dtem", chinese: "原价；全价" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ลดราคา", roman: "lot-raa-khaa", chinese: "降价；打折" },
        distinctionZh: "ต่อราคา 是顾客讲价；ลดราคา 是价格被降低或商家打折。",
      },
    ],
    collocations: [{ thai: "ต่อราคาได้ไหม", roman: "dtaaw-raa-khaa dai mai", chinese: "可以讲价吗" }],
    usageNotesZh: ["ต่อราคา 在市场可用，在固定价商店不一定合适。"],
    tags: ["bargain", "market", "price"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "raa-khaa-sut-thi",
    thai: "ราคาสุทธิ",
    roman: "raa-khaa-sut-thi",
    chinese: "净价；最终价",
    partOfSpeech: "名词",
    theme: "议价价格",
    level: "a2",
    priority: 81,
    senses: [
      {
        id: "net-price",
        chinese: "已扣除折扣或包含必要费用后的最终价格",
        examples: [
          {
            thai: "ราคาสุทธิของห้องพักรวมภาษีแล้ว แต่ยังไม่รวมค่าบริการรถรับส่ง",
            roman: "raa-khaa-sut-thi khaawng haawng-phak ruam phaa-sii laaeo, dtaae yang mai ruam khaa-baaw-ri-gaan rot rap-song",
            chinese: "客房净价已含税，但还不包括接送车服务费。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ราคาสุดท้าย", roman: "raa-khaa sut-thaai", chinese: "最终价格" }],
    antonyms: [{ candidateId: "raa-khaa-dtem", thai: "ราคาเต็ม", roman: "raa-khaa-dtem", chinese: "原价；全价" }],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "raa-khaa-dtem", thai: "ราคาเต็ม", roman: "raa-khaa-dtem", chinese: "原价；全价" },
        distinctionZh: "ราคาเต็ม 是未折扣前的价格；ราคาสุทธิ 是最终实际价格。",
      },
    ],
    collocations: [{ thai: "ราคาสุทธิหลังส่วนลด", roman: "raa-khaa-sut-thi lang suan-lot", chinese: "折扣后的净价" }],
    usageNotesZh: ["สุทธิ 有“净、纯”的意思，商务价格中常见。"],
    tags: ["net-price", "price", "commerce"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "raa-khaa-dtem",
    thai: "ราคาเต็ม",
    roman: "raa-khaa-dtem",
    chinese: "原价；全价",
    partOfSpeech: "名词",
    theme: "议价价格",
    level: "a2",
    priority: 82,
    senses: [
      {
        id: "full-price",
        chinese: "没有折扣、没有优惠时的完整价格",
        examples: [
          {
            thai: "ถ้าไม่มีคูปอง ลูกค้าต้องจ่ายราคาเต็มสำหรับตั๋วเรือด่วน",
            roman: "thaa mai mii khuu-bpaawng, luuk-khaa dtawng jaai raa-khaa-dtem sam-rap dtua ruea-duuan",
            chinese: "如果没有优惠券，顾客必须按原价支付快船票。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ราคาเดิม", roman: "raa-khaa doem", chinese: "原来的价格" }],
    antonyms: [{ candidateId: "raa-khaa-phi-seet", thai: "ราคาพิเศษ", roman: "raa-khaa-phi-seet", chinese: "特价" }],
    comparisons: [
      {
        kind: "antonym",
        target: { candidateId: "raa-khaa-phi-seet", thai: "ราคาพิเศษ", roman: "raa-khaa-phi-seet", chinese: "特价" },
        distinctionZh: "ราคาเต็ม 是全价；ราคาพิเศษ 是优惠后的特殊价。",
      },
    ],
    collocations: [{ thai: "จ่ายราคาเต็ม", roman: "jaai raa-khaa-dtem", chinese: "支付原价" }],
    usageNotesZh: ["เต็ม 表示满、完整。"],
    tags: ["full-price", "shopping", "discount"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "raa-khaa-phi-seet",
    thai: "ราคาพิเศษ",
    roman: "raa-khaa-phi-seet",
    chinese: "特价；优惠价",
    partOfSpeech: "名词",
    theme: "议价价格",
    level: "a2",
    priority: 83,
    senses: [
      {
        id: "special-price",
        chinese: "在活动、会员、特定条件下提供的特别价格",
        examples: [
          {
            thai: "โรงแรมมีราคาพิเศษสำหรับลูกค้าที่จองล่วงหน้าอย่างน้อยหนึ่งเดือน",
            roman: "roong-raem mii raa-khaa-phi-seet sam-rap luuk-khaa thii jaawng luang-naa yaang naawy nueng duean",
            chinese: "酒店为至少提前一个月预订的顾客提供特价。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ราคาโปรโมชั่น", roman: "raa-khaa bproo-moo-chan", chinese: "促销价" }],
    antonyms: [{ candidateId: "raa-khaa-dtem", thai: "ราคาเต็ม", roman: "raa-khaa-dtem", chinese: "原价；全价" }],
    comparisons: [
      {
        kind: "antonym",
        target: { candidateId: "raa-khaa-dtem", thai: "ราคาเต็ม", roman: "raa-khaa-dtem", chinese: "原价；全价" },
        distinctionZh: "ราคาพิเศษ 通常比ราคาเต็ม便宜，且有条件或期限。",
      },
    ],
    collocations: [{ thai: "ได้ราคาพิเศษ", roman: "dai raa-khaa-phi-seet", chinese: "得到特价" }],
    usageNotesZh: ["พิเศษ 是特别、特殊，常用于服务和价格宣传。"],
    tags: ["special-price", "promotion", "hotel"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khuu-bpaawng",
    thai: "คูปอง",
    roman: "khuu-bpaawng",
    chinese: "优惠券",
    partOfSpeech: "名词",
    theme: "议价价格",
    level: "a2",
    priority: 84,
    senses: [
      {
        id: "coupon",
        chinese: "可用于减价、兑换或享受优惠的券或代码",
        examples: [
          {
            thai: "ถ้าใช้คูปองนี้ก่อนเที่ยงคืน จะลดค่าอาหารได้ห้าสิบบาท",
            roman: "thaa chai khuu-bpaawng nii gaawn thiiang-khuen, ja lot khaa-aa-haan dai haa-sip baat",
            chinese: "如果在午夜前使用这张优惠券，可以减五十泰铢餐费。",
          },
        ],
      },
    ],
    synonyms: [{ candidateId: "ra-hat-suan-lot", thai: "รหัสส่วนลด", roman: "ra-hat-suan-lot", chinese: "折扣码" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "ra-hat-suan-lot", thai: "รหัสส่วนลด", roman: "ra-hat-suan-lot", chinese: "折扣码" },
        distinctionZh: "คูปอง 可以是券或电子券；รหัสส่วนลด 是输入的折扣代码。",
      },
    ],
    collocations: [{ thai: "ใช้คูปอง", roman: "chai khuu-bpaawng", chinese: "使用优惠券" }],
    usageNotesZh: ["คูปอง 是外来词，电商和餐饮应用里常见。"],
    tags: ["coupon", "discount", "shopping"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "ra-hat-suan-lot",
    thai: "รหัสส่วนลด",
    roman: "ra-hat-suan-lot",
    chinese: "折扣码",
    partOfSpeech: "名词",
    theme: "议价价格",
    level: "a2",
    priority: 85,
    senses: [
      {
        id: "discount-code",
        chinese: "结账时输入以获得折扣的代码",
        examples: [
          {
            thai: "กรอกรหัสส่วนลดในช่องนี้ก่อนกดยืนยันคำสั่งซื้อ",
            roman: "graawk ra-hat-suan-lot nai chaawng nii gaawn got yuen-yan kham-sang-sue",
            chinese: "确认订单前，请在这个栏位输入折扣码。",
          },
        ],
      },
    ],
    synonyms: [{ candidateId: "khuu-bpaawng", thai: "คูปอง", roman: "khuu-bpaawng", chinese: "优惠券" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "khuu-bpaawng", thai: "คูปอง", roman: "khuu-bpaawng", chinese: "优惠券" },
        distinctionZh: "รหัสส่วนลด 是文字/数字代码；คูปอง 可是券、码或电子优惠。",
      },
    ],
    collocations: [{ thai: "ใส่รหัสส่วนลด", roman: "sai ra-hat-suan-lot", chinese: "输入折扣码" }],
    usageNotesZh: ["รหัส 是代码，ส่วนลด 是折扣。"],
    tags: ["discount-code", "online-shopping", "coupon"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khaawng-thaaem",
    thai: "ของแถม",
    roman: "khaawng-thaaem",
    chinese: "赠品",
    partOfSpeech: "名词",
    theme: "议价价格",
    level: "a2",
    priority: 86,
    senses: [
      {
        id: "free-gift",
        chinese: "购买商品时额外赠送的物品",
        examples: [
          {
            thai: "ถ้าซื้อกาแฟสามถุง ร้านจะให้แก้วเล็กเป็นของแถมหนึ่งใบ",
            roman: "thaa sue gaa-faae saam thung, raan ja hai gaaeow lek bpen khaawng-thaaem nueng bai",
            chinese: "如果买三袋咖啡，店里会赠送一个小杯子作为赠品。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ของฟรี", roman: "khaawng frii", chinese: "免费赠品" }],
    antonyms: [{ thai: "ของที่ต้องซื้อ", roman: "khaawng thii dtawng sue", chinese: "需要购买的物品" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "thaaem", thai: "แถม", roman: "thaaem", chinese: "附赠；多给" },
        distinctionZh: "ของแถม 是赠品名词；แถม 是附赠的动作。",
      },
    ],
    collocations: [{ thai: "ได้ของแถม", roman: "dai khaawng-thaaem", chinese: "得到赠品" }],
    usageNotesZh: ["ของแถม 常用于促销活动。"],
    tags: ["freebie", "promotion", "shopping"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thaaem",
    thai: "แถม",
    roman: "thaaem",
    chinese: "附赠；多给",
    partOfSpeech: "动词",
    theme: "议价价格",
    level: "a2",
    priority: 87,
    senses: [
      {
        id: "give-extra",
        chinese: "在原购买内容之外额外赠送或多给",
        examples: [
          {
            thai: "แม่ค้าบอกว่าถ้าซื้อผลไม้สองกิโล จะแถมมะม่วงให้อีกหนึ่งลูก",
            roman: "maae-khaa baawk waa thaa sue phon-la-maai saawng gi-loo, ja thaaem ma-muang hai iik nueng luuk",
            chinese: "女商贩说如果买两公斤水果，会再送一个芒果。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ให้เพิ่ม", roman: "hai phoem", chinese: "多给；额外给" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "khaawng-thaaem", thai: "ของแถม", roman: "khaawng-thaaem", chinese: "赠品" },
        distinctionZh: "แถม 是动作；ของแถม 是被赠送的东西。",
      },
    ],
    collocations: [{ thai: "ซื้อหนึ่งแถมหนึ่ง", roman: "sue nueng thaaem nueng", chinese: "买一送一" }],
    usageNotesZh: ["แถม 在市场和促销语中很常见。"],
    tags: ["freebie", "promotion", "bargain"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "mao",
    thai: "เหมา",
    roman: "mao",
    chinese: "包；包价；整批买下",
    partOfSpeech: "动词",
    theme: "议价价格",
    level: "a2",
    priority: 88,
    senses: [
      {
        id: "charter-or-lump-sum",
        chinese: "以一个总价包车、包船、包服务，或整批购买",
        examples: [
          {
            thai: "ถ้าไปกันห้าคน เหมารถตู้ทั้งคันอาจถูกกว่าซื้อตั๋วแยก",
            roman: "thaa bpai gan haa khon, mao rot-dtuu thang khan aat thuuk gwaa sue dtua yaaek",
            chinese: "如果五个人一起去，包整辆面包车可能比分开买票便宜。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เหมาจ่าย", roman: "mao-jaai", chinese: "包价支付" }],
    antonyms: [{ thai: "จ่ายตามมิเตอร์", roman: "jaai dtaam mii-dtoe", chinese: "按表付款" }],
    comparisons: [
      {
        kind: "usage-pair",
        target: { candidateId: "mii-dtoe", thai: "มิเตอร์", roman: "mii-dtoe", chinese: "计价器" },
        distinctionZh: "เหมา 是先谈总价；มิเตอร์ 是按计价器收费。",
      },
    ],
    collocations: [{ thai: "เหมารถ", roman: "mao rot", chinese: "包车" }],
    usageNotesZh: ["เหมา 在交通、旅游和批量购买中都很实用。"],
    tags: ["charter", "bargain", "transport"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jaai-luang-naa",
    thai: "จ่ายล่วงหน้า",
    roman: "jaai-luang-naa",
    chinese: "预付；提前付款",
    partOfSpeech: "动词",
    theme: "银行支付",
    level: "a2",
    priority: 89,
    senses: [
      {
        id: "pay-in-advance",
        chinese: "在使用服务、入住或收到商品之前先付款",
        examples: [
          {
            thai: "บางโรงแรมต้องจ่ายล่วงหน้าหนึ่งคืนเพื่อยืนยันการจอง",
            roman: "baang roong-raem dtawng jaai-luang-naa nueng kheun phuea yuen-yan gaan jaawng",
            chinese: "有些酒店需要预付一晚费用来确认预订。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ชำระล่วงหน้า", roman: "cham-ra luang-naa", chinese: "提前付款", notesZh: "更正式。" }],
    antonyms: [{ thai: "จ่ายภายหลัง", roman: "jaai phaai-lang", chinese: "之后付款" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "มัดจำ", roman: "mat-jam", chinese: "押金；订金" },
        distinctionZh: "จ่ายล่วงหน้า 可能是全额或部分预付；มัดจำ 通常是订金/保证金。",
      },
    ],
    collocations: [{ thai: "ต้องจ่ายล่วงหน้า", roman: "dtawng jaai-luang-naa", chinese: "必须预付" }],
    usageNotesZh: ["ล่วงหน้า 表示提前，常用于预订、付款和通知。"],
    tags: ["prepay", "booking", "payment"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "lak-thaan-gaan-oon",
    thai: "หลักฐานการโอน",
    roman: "lak-thaan-gaan-oon",
    chinese: "转账凭证",
    partOfSpeech: "名词",
    theme: "银行支付",
    level: "a2",
    priority: 90,
    senses: [
      {
        id: "transfer-proof",
        chinese: "证明已经转账的截图、单据或通知",
        examples: [
          {
            thai: "หลังโอนมัดจำแล้ว กรุณาส่งหลักฐานการโอนพร้อมชื่อผู้จอง",
            roman: "lang oon mat-jam laaeo, ga-ru-naa song lak-thaan-gaan-oon phraawm chue phuu-jaawng",
            chinese: "转订金后，请发送转账凭证以及预订人姓名。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "สลิปโอนเงิน", roman: "sa-lip oon-ngoen", chinese: "转账小票/截图", notesZh: "สลิป 是 slip 的外来词。" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ใบเสร็จ", roman: "bai-set", chinese: "收据" },
        distinctionZh: "หลักฐานการโอน 是转账证明；ใบเสร็จ 是商家收款后给的收据。",
      },
    ],
    collocations: [{ thai: "แนบหลักฐานการโอน", roman: "naaep lak-thaan-gaan-oon", chinese: "附上转账凭证" }],
    usageNotesZh: ["หลักฐาน 是证据/凭证，商务聊天中很常见。"],
    tags: ["payment-proof", "transfer", "booking"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtit-dtaaw",
    thai: "ติดต่อ",
    roman: "dtit-dtaaw",
    chinese: "联系",
    partOfSpeech: "动词",
    theme: "服务请求",
    level: "a2",
    priority: 91,
    senses: [
      {
        id: "contact",
        chinese: "通过电话、聊天、邮件或柜台与对方联系",
        examples: [
          {
            thai: "ถ้าพัสดุยังไม่ถึงภายในวันนี้ กรุณาติดต่อฝ่ายบริการลูกค้า",
            roman: "thaa phat-sa-du yang mai thueng phaai-nai wan-nii, ga-ru-naa dtit-dtaaw faai baaw-ri-gaan luuk-khaa",
            chinese: "如果包裹今天内还没到，请联系客服部门。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ติดต่อสอบถาม", roman: "dtit-dtaaw saawp-thaam", chinese: "联系咨询" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "jaaeng-bpan-haa", thai: "แจ้งปัญหา", roman: "jaaeng-bpan-haa", chinese: "反馈问题" },
        distinctionZh: "ติดต่อ 是联系；แจ้งปัญหา 是联系时说明问题。",
      },
    ],
    collocations: [{ thai: "เบอร์ติดต่อ", roman: "boe-dtit-dtaaw", chinese: "联系电话" }],
    usageNotesZh: ["ติดต่อ ใช้กับคน、部门、公司都可以。"],
    tags: ["contact", "service", "support"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "boe-dtit-dtaaw",
    thai: "เบอร์ติดต่อ",
    roman: "boe-dtit-dtaaw",
    chinese: "联系电话",
    partOfSpeech: "名词",
    theme: "服务请求",
    level: "a2",
    priority: 92,
    senses: [
      {
        id: "contact-number",
        chinese: "用于联系顾客、商家、司机或酒店的电话号码",
        examples: [
          {
            thai: "กรุณาใส่เบอร์ติดต่อที่ใช้งานได้ เผื่อพนักงานส่งของโทรหา",
            roman: "ga-ru-naa sai boe-dtit-dtaaw thii chai-ngaan dai, phuea pha-nak-ngaan song-khaawng thoo haa",
            chinese: "请填写可用的联系电话，以便送货员打电话联系。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "เบอร์โทรศัพท์", roman: "boe thoo-ra-sap", chinese: "电话号码" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "อีเมล", roman: "ii-meo", chinese: "电子邮件" },
        distinctionZh: "เบอร์ติดต่อ 是电话联系方式；อีเมล 是邮件联系方式。",
      },
    ],
    collocations: [{ thai: "แจ้งเบอร์ติดต่อ", roman: "jaaeng boe-dtit-dtaaw", chinese: "告知联系电话" }],
    usageNotesZh: ["เบอร์ 是 number 的口语外来词。"],
    tags: ["phone", "contact", "delivery"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jaaeng-bpan-haa",
    thai: "แจ้งปัญหา",
    roman: "jaaeng-bpan-haa",
    chinese: "反馈问题；报告问题",
    partOfSpeech: "动词",
    theme: "服务请求",
    level: "a2",
    priority: 93,
    senses: [
      {
        id: "report-problem",
        chinese: "把遇到的问题告知客服、员工或平台",
        examples: [
          {
            thai: "ถ้าแอร์ในห้องเสีย สามารถแจ้งปัญหาผ่านแอปของโรงแรมได้",
            roman: "thaa aae nai haawng siia, saa-maat jaaeng-bpan-haa phaan aaep khaawng roong-raem dai",
            chinese: "如果房间里的空调坏了，可以通过酒店应用反馈问题。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "รายงานปัญหา", roman: "raai-ngaan bpan-haa", chinese: "报告问题" }],
    antonyms: [{ thai: "ยืนยันว่าไม่มีปัญหา", roman: "yuen-yan waa mai mii bpan-haa", chinese: "确认没有问题" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "raawng-riian", thai: "ร้องเรียน", roman: "raawng-riian", chinese: "投诉" },
        distinctionZh: "แจ้งปัญหา 可以较中性地说明问题；ร้องเรียน 语气更强，是正式投诉。",
      },
    ],
    collocations: [{ thai: "ช่องทางแจ้งปัญหา", roman: "chaawng-thaang jaaeng-bpan-haa", chinese: "问题反馈渠道" }],
    usageNotesZh: ["แจ้ง 比 บอก 更适合正式服务语境。"],
    tags: ["report-problem", "service", "support"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "raawng-riian",
    thai: "ร้องเรียน",
    roman: "raawng-riian",
    chinese: "投诉",
    partOfSpeech: "动词",
    theme: "服务请求",
    level: "a2",
    priority: 94,
    senses: [
      {
        id: "complain",
        chinese: "因服务、商品或问题不满意而正式反映",
        examples: [
          {
            thai: "ลูกค้าร้องเรียนว่าได้รับสินค้าผิดสีและไม่มีพนักงานติดต่อกลับ",
            roman: "luuk-khaa raawng-riian waa dai rap sin-khaa phit sii lae mai mii pha-nak-ngaan dtit-dtaaw glap",
            chinese: "顾客投诉说收到了颜色错误的商品，而且没有员工回电。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "คอมเพลน", roman: "khawm-phleen", chinese: "投诉", notesZh: "外来口语。" }],
    antonyms: [{ thai: "ชม", roman: "chom", chinese: "称赞" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "jaaeng-bpan-haa", thai: "แจ้งปัญหา", roman: "jaaeng-bpan-haa", chinese: "反馈问题" },
        distinctionZh: "ร้องเรียน 比 แจ้งปัญหา 更正式、更带不满情绪。",
      },
    ],
    collocations: [{ thai: "ช่องทางร้องเรียน", roman: "chaawng-thaang raawng-riian", chinese: "投诉渠道" }],
    usageNotesZh: ["บริการลูกค้า 场景中，ร้องเรียน 是较正式的投诉动词。"],
    tags: ["complaint", "customer-service", "after-sales"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "saawm-repair",
    thai: "ซ่อม",
    roman: "saawm",
    chinese: "修理；维修",
    partOfSpeech: "动词",
    theme: "退换售后",
    level: "a2",
    priority: 95,
    senses: [
      {
        id: "repair",
        chinese: "把损坏的商品、设备或设施修好",
        examples: [
          {
            thai: "ร้านบอกว่าจะซ่อมโทรศัพท์ให้เสร็จภายในสามวันและโทรแจ้งลูกค้า",
            roman: "raan baawk waa ja saawm thoo-ra-sap hai set phaai-nai saam wan lae thoo jaaeng luuk-khaa",
            chinese: "店里说会在三天内修好手机，并打电话通知顾客。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ซ่อมแซม", roman: "saawm-saaem", chinese: "修缮；维修", notesZh: "较正式或范围更广。" }],
    antonyms: [{ thai: "ทำเสีย", roman: "tham siia", chinese: "弄坏" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "แก้ไข", roman: "gaae-khai", chinese: "修正；解决" },
        distinctionZh: "ซ่อม 多用于实物维修；แก้ไข 可用于问题、文件或错误。",
      },
    ],
    collocations: [{ thai: "ค่าซ่อม", roman: "khaa saawm", chinese: "维修费" }],
    usageNotesZh: ["ซ่อม ใช้กับ โทรศัพท์、รถ、แอร์ 等设备很自然。"],
    tags: ["repair", "after-sales", "service"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "kham-khaaw",
    thai: "คำขอ",
    roman: "kham-khaaw",
    chinese: "请求；申请",
    partOfSpeech: "名词",
    theme: "服务请求",
    level: "a2",
    priority: 96,
    senses: [
      {
        id: "request-application",
        chinese: "向机构、客服或系统提交的请求或申请",
        examples: [
          {
            thai: "ระบบได้รับคำขอคืนเงินแล้ว และจะแจ้งผลภายในสามวันทำการ",
            roman: "ra-bop dai rap kham-khaaw khuen-ngoen laaeo, lae ja jaaeng phon phaai-nai saam wan tham-gaan",
            chinese: "系统已收到退款申请，并会在三个工作日内通知结果。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "คำร้อง", roman: "kham-raawng", chinese: "申请；请求书", notesZh: "更正式，常用于行政或系统流程。" }],
    antonyms: [{ thai: "คำปฏิเสธ", roman: "kham bpa-dti-seet", chinese: "拒绝；拒绝回复" }],
    comparisons: [
      {
        kind: "register-pair",
        target: { thai: "คำร้อง", roman: "kham-raawng", chinese: "申请；请求书" },
        distinctionZh: "คำขอ 较通用；คำร้อง 更正式，常见于表格、政府或平台流程。",
      },
    ],
    collocations: [{ thai: "ส่งคำขอ", roman: "song kham-khaaw", chinese: "提交请求/申请" }],
    usageNotesZh: ["คำ + 动词/名词 可形成“某类话语/文件”的名词。"],
    tags: ["request", "service", "refund"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "raai-la-iiat",
    thai: "รายละเอียด",
    roman: "raai-la-iiat",
    chinese: "详情；细节",
    partOfSpeech: "名词",
    theme: "服务请求",
    level: "a2",
    priority: 97,
    senses: [
      {
        id: "details",
        chinese: "关于商品、订单、路线、服务或问题的具体信息",
        examples: [
          {
            thai: "ก่อนชำระเงินออนไลน์ ควรอ่านรายละเอียดสินค้าและเงื่อนไขการคืนสินค้าให้ครบ",
            roman: "gaawn cham-ra ngoen awn-lai, khuuan aan raai-la-iiat sin-khaa lae ngeuan-khai gaan khuen-sin-khaa hai khrop",
            chinese: "在线付款前，应该完整阅读商品详情和退货条件。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ข้อมูลเพิ่มเติม", roman: "khaaw-muun phoem-dtoem", chinese: "补充信息；更多信息" }],
    antonyms: [{ thai: "สรุป", roman: "sa-rup", chinese: "摘要；总结" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "ngeuan-khai", thai: "เงื่อนไข", roman: "ngeuan-khai", chinese: "条件；条款" },
        distinctionZh: "รายละเอียด 是详情；เงื่อนไข 是必须满足的条件或规则。",
      },
    ],
    collocations: [{ thai: "ดูรายละเอียด", roman: "duu raai-la-iiat", chinese: "查看详情" }],
    usageNotesZh: ["ละเอียด 有细致的意思，รายละเอียด 是服务和电商页面高频词。"],
    tags: ["details", "product", "service"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "ngeuan-khai",
    thai: "เงื่อนไข",
    roman: "ngeuan-khai",
    chinese: "条件；条款",
    partOfSpeech: "名词",
    theme: "服务请求",
    level: "a2",
    priority: 98,
    senses: [
      {
        id: "terms-conditions",
        chinese: "服务、优惠、退换或付款需要遵守的条件",
        examples: [
          {
            thai: "ส่วนลดนี้มีเงื่อนไขว่าต้องจองผ่านแอปและจ่ายล่วงหน้า",
            roman: "suan-lot nii mii ngeuan-khai waa dtawng jaawng phaan aaep lae jaai-luang-naa",
            chinese: "这个折扣有条件：必须通过应用预订并提前付款。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "ข้อกำหนด", roman: "khaaw-gam-not", chinese: "规定；条款" }],
    antonyms: [{ thai: "ไม่มีเงื่อนไข", roman: "mai mii ngeuan-khai", chinese: "无条件" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "raai-la-iiat", thai: "รายละเอียด", roman: "raai-la-iiat", chinese: "详情" },
        distinctionZh: "เงื่อนไข 是限制或条件；รายละเอียด 是一般详细信息。",
      },
    ],
    collocations: [{ thai: "อ่านเงื่อนไข", roman: "aan ngeuan-khai", chinese: "阅读条款" }],
    usageNotesZh: ["优惠、保险、退款页面中 เงื่อนไข 很常见。"],
    tags: ["terms", "conditions", "service"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "gam-not-gaan",
    thai: "กำหนดการ",
    roman: "gam-not-gaan",
    chinese: "日程；行程安排",
    partOfSpeech: "名词",
    theme: "服务请求",
    level: "a2",
    priority: 99,
    senses: [
      {
        id: "schedule-itinerary",
        chinese: "活动、旅行或服务的时间安排和流程",
        examples: [
          {
            thai: "ไกด์ส่งกำหนดการทัวร์ให้ลูกค้าก่อนเดินทางหนึ่งวัน",
            roman: "gai song gam-not-gaan thua hai luuk-khaa gaawn doen-thaang nueng wan",
            chinese: "导游在出发前一天把旅游行程发给顾客。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "แผนการเดินทาง", roman: "phaaen gaan doen-thaang", chinese: "旅行计划；行程表" }],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { candidateId: "dtaa-raang-wee-laa", thai: "ตารางเวลา", roman: "dtaa-raang-wee-laa", chinese: "时刻表" },
        distinctionZh: "กำหนดการ 偏活动/旅行安排；ตารางเวลา 偏班次或服务时间表。",
      },
    ],
    collocations: [{ thai: "กำหนดการเดินทาง", roman: "gam-not-gaan doen-thaang", chinese: "出行日程" }],
    usageNotesZh: ["กำหนด 有规定、确定的意思。"],
    tags: ["itinerary", "schedule", "travel"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bai-rap-bpra-gan",
    thai: "ใบรับประกัน",
    roman: "bai-rap-bpra-gan",
    chinese: "保修卡；保证书",
    partOfSpeech: "名词",
    theme: "退换售后",
    level: "a2",
    priority: 100,
    senses: [
      {
        id: "warranty-card",
        chinese: "证明商品享有保修或保证服务的文件",
        examples: [
          {
            thai: "กรุณาเก็บใบรับประกันและใบเสร็จไว้ หากเครื่องใช้ไฟฟ้ามีปัญหา",
            roman: "ga-ru-naa gep bai-rap-bpra-gan lae bai-set wai, haak khreuuang-chai-fai-faa mii bpan-haa",
            chinese: "如果电器有问题，请保留保修卡和收据。",
          },
        ],
      },
    ],
    synonyms: [{ thai: "บัตรรับประกัน", roman: "bat-rap-bpra-gan", chinese: "保修卡" }],
    antonyms: [{ thai: "หมดประกัน", roman: "mot bpra-gan", chinese: "过保；保修到期" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ประกัน", roman: "bpra-gan", chinese: "保险；保证" },
        distinctionZh: "ประกัน 是保障/保修概念；ใบรับประกัน 是证明保修的文件。",
      },
    ],
    collocations: [{ thai: "ระยะเวลารับประกัน", roman: "ra-ya wee-laa rap-bpra-gan", chinese: "保修期限" }],
    usageNotesZh: ["ใบรับประกัน 售后维修时常和 ใบเสร็จ 一起出示。"],
    tags: ["warranty", "after-sales", "repair"],
    sourceRefs: COMMERCE_REFS,
    reviewStatus: "candidate-draft",
  },
] satisfies VocabularyExpansionCandidate[];
