export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type RequestsOffersHelpTheme =
  | "请求"
  | "帮忙"
  | "让别人做事"
  | "主动帮助"
  | "接受帮助"
  | "拒绝帮助"
  | "方便吗"
  | "礼貌表达"
  | "具体帮忙"
  | "协商回应";

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
  theme: RequestsOffersHelpTheme,
];

const REQUESTS_OFFERS_HELP_REFS = [
  "worker-a-a2-requests-offers-help",
  "basic-thai-help-requests",
];

const rows: Row[] = [
  ["khaaw", "ขอ", "khaaw", "请求；要；请给", "动词", "请求"],
  ["khaaw-noi", "ขอหน่อย", "khaaw noi", "请给一点；请帮一下", "短语", "请求"],
  ["khaaw-dai-mai", "ขอได้ไหม", "khaaw dai mai", "可以要/可以请……吗", "句型", "请求"],
  ["khaaw-duu-dai-mai", "ขอดูได้ไหม", "khaaw duu dai mai", "可以看一下吗", "句型", "请求"],
  ["khaaw-chai-dai-mai", "ขอใช้ได้ไหม", "khaaw chai dai mai", "可以用一下吗", "句型", "请求"],
  ["khaaw-yuem-dai-mai", "ขอยืมได้ไหม", "khaaw yuem dai mai", "可以借一下吗", "句型", "请求"],
  ["khaaw-khwaam-chuai-luea", "ขอความช่วยเหลือ", "khaaw khwaam chuai luea", "请求帮助", "短语", "请求"],
  ["khaaw-rab-guuan", "ขอรบกวน", "khaaw rop guan", "麻烦您；打扰一下", "短语", "请求"],
  ["rab-guuan-noi", "รบกวนหน่อย", "rop guan noi", "麻烦一下", "短语", "请求"],
  ["khaaw-fang-noi", "ขอฟังหน่อย", "khaaw fang noi", "请让我听一下", "句型", "请求"],
  ["chuai", "ช่วย", "chuai", "帮助；请帮忙", "动词", "帮忙"],
  ["chuai-noi", "ช่วยหน่อย", "chuai noi", "帮一下", "短语", "帮忙"],
  ["chuai-dai-mai", "ช่วยได้ไหม", "chuai dai mai", "可以帮忙吗", "句型", "帮忙"],
  ["chuai-chan-noi", "ช่วยฉันหน่อย", "chuai chan noi", "请帮我一下", "句型", "帮忙"],
  ["chuai-duai", "ช่วยด้วย", "chuai duai", "救命；请帮帮忙", "短语", "帮忙"],
  ["chuai-kan", "ช่วยกัน", "chuai gan", "一起帮忙；互相帮", "动词", "帮忙"],
  ["khwaam-chuai-luea", "ความช่วยเหลือ", "khwaam chuai luea", "帮助；协助", "名词", "帮忙"],
  ["dtawng-gaan-khwaam-chuai-luea", "ต้องการความช่วยเหลือ", "dtawng gaan khwaam chuai luea", "需要帮助", "短语", "帮忙"],
  ["chuai-duu-hai-noi", "ช่วยดูให้หน่อย", "chuai duu hai noi", "请帮我看一下", "句型", "帮忙"],
  ["chuai-bawk-hai-noi", "ช่วยบอกให้หน่อย", "chuai baawk hai noi", "请帮我告诉一下", "句型", "帮忙"],
  ["chuai-bpoet", "ช่วยเปิด", "chuai bpoet", "请帮忙打开", "短语", "让别人做事"],
  ["chuai-bpit", "ช่วยปิด", "chuai bpit", "请帮忙关闭", "短语", "让别人做事"],
  ["chuai-yip", "ช่วยหยิบ", "chuai yip", "请帮忙拿一下", "短语", "让别人做事"],
  ["chuai-thue", "ช่วยถือ", "chuai thue", "请帮忙拿着/提着", "短语", "让别人做事"],
  ["chuai-song", "ช่วยส่ง", "chuai song", "请帮忙发送/递送", "短语", "让别人做事"],
  ["chuai-khian", "ช่วยเขียน", "chuai khian", "请帮忙写", "短语", "让别人做事"],
  ["chuai-aan", "ช่วยอ่าน", "chuai aan", "请帮忙读", "短语", "让别人做事"],
  ["chuai-phuut-chaa-chaa", "ช่วยพูดช้า ๆ", "chuai phuut chaa chaa", "请说慢一点", "句型", "让别人做事"],
  ["chuai-tho", "ช่วยโทร", "chuai thoo", "请帮忙打电话", "短语", "让别人做事"],
  ["chuai-tham-hai", "ช่วยทำให้", "chuai tham hai", "请帮忙做给……", "句型", "让别人做事"],
  ["hai-chuai-mai", "ให้ช่วยไหม", "hai chuai mai", "要我帮忙吗", "句型", "主动帮助"],
  ["mii-arai-hai-chuai-mai", "มีอะไรให้ช่วยไหม", "mii a-rai hai chuai mai", "有什么需要帮忙的吗", "句型", "主动帮助"],
  ["diao-chuai", "เดี๋ยวช่วย", "diao chuai", "等一下我来帮", "句型", "主动帮助"],
  ["chan-chuai-dai", "ฉันช่วยได้", "chan chuai dai", "我能帮忙", "句型", "主动帮助"],
  ["hai-chan-chuai", "ให้ฉันช่วย", "hai chan chuai", "让我帮忙", "句型", "主动帮助"],
  ["ja-chuai-thue", "จะช่วยถือ", "ja chuai thue", "我来帮忙提", "句型", "主动帮助"],
  ["ja-chuai-duu", "จะช่วยดู", "ja chuai duu", "我来帮忙看", "句型", "主动帮助"],
  ["maa-chuai-kan", "มาช่วยกัน", "maa chuai gan", "来一起帮忙吧", "句型", "主动帮助"],
  ["mai-bpen-rai-chan-chuai-eng", "ไม่เป็นไร ฉันช่วยเอง", "mai bpen rai chan chuai eng", "没关系，我来帮", "句型", "主动帮助"],
  ["thaa-dtawng-gaan-bawk-dai", "ถ้าต้องการบอกได้", "thaa dtawng gaan baawk dai", "如果需要可以告诉我", "句型", "主动帮助"],
  ["dai-loei", "ได้เลย", "dai loei", "可以，没问题", "短语", "接受帮助"],
  ["khawp-khun-maak", "ขอบคุณมาก", "khaawp khun maak", "非常感谢", "短语", "接受帮助"],
  ["rab-guuan-duai", "รบกวนด้วย", "rop guan duai", "那就麻烦你了", "短语", "接受帮助"],
  ["thaa-mai-lam-baak", "ถ้าไม่ลำบาก", "thaa mai lam-baak", "如果不麻烦的话", "句型", "接受帮助"],
  ["dii-loei", "ดีเลย", "dii loei", "太好了", "短语", "接受帮助"],
  ["chuai-dai-maak", "ช่วยได้มาก", "chuai dai maak", "帮了很大忙", "句型", "接受帮助"],
  ["khawp-jai-na", "ขอบใจนะ", "khaawp jai na", "谢谢你啊", "短语", "接受帮助"],
  ["faak-duai-na", "ฝากด้วยนะ", "faak duai na", "那就拜托你了", "短语", "接受帮助"],
  ["yin-dii-rap-khwaam-chuai-luea", "ยินดีรับความช่วยเหลือ", "yin dii rap khwaam chuai luea", "愿意接受帮助", "句型", "接受帮助"],
  ["khaawp-khun-luang-naa", "ขอบคุณล่วงหน้า", "khaawp khun luang naa", "提前谢谢", "短语", "接受帮助"],
  ["mai-bpen-rai", "ไม่เป็นไร", "mai bpen rai", "没关系；不用了", "短语", "拒绝帮助"],
  ["mai-dtawng", "ไม่ต้อง", "mai dtawng", "不用；不必", "短语", "拒绝帮助"],
  ["mai-dtawng-chuai", "ไม่ต้องช่วย", "mai dtawng chuai", "不用帮忙", "句型", "拒绝帮助"],
  ["khawp-khun-dtae-mai-bpen-rai", "ขอบคุณแต่ไม่เป็นไร", "khaawp khun dtae mai bpen rai", "谢谢，但不用了", "句型", "拒绝帮助"],
  ["chan-tham-eng-dai", "ฉันทำเองได้", "chan tham eng dai", "我可以自己做", "句型", "拒绝帮助"],
  ["diao-tham-eng", "เดี๋ยวทำเอง", "diao tham eng", "等一下我自己做", "句型", "拒绝帮助"],
  ["mai-rab-guuan-dii-gwaa", "ไม่รบกวนดีกว่า", "mai rop guan dii gwaa", "还是不麻烦你比较好", "句型", "拒绝帮助"],
  ["khrang-naa-laew-gan", "ครั้งหน้าแล้วกัน", "khrang naa laew gan", "下次吧", "短语", "拒绝帮助"],
  ["mai-saduak-go-mai-bpen-rai", "ไม่สะดวกก็ไม่เป็นไร", "mai sa-duak gaw mai bpen rai", "不方便也没关系", "句型", "拒绝帮助"],
  ["khawp-khun-thii-sanoe", "ขอบคุณที่เสนอ", "khaawp khun thii sa-noe", "谢谢你主动提出", "句型", "拒绝帮助"],
  ["saduak-mai", "สะดวกไหม", "sa-duak mai", "方便吗", "句型", "方便吗"],
  ["khun-saduak-mai", "คุณสะดวกไหม", "khun sa-duak mai", "你方便吗", "句型", "方便吗"],
  ["dtaawn-nii-saduak-mai", "ตอนนี้สะดวกไหม", "dtaawn nii sa-duak mai", "现在方便吗", "句型", "方便吗"],
  ["thaa-waang", "ถ้าว่าง", "thaa waang", "如果有空", "句型", "方便吗"],
  ["thaa-mii-welaa", "ถ้ามีเวลา", "thaa mii we-laa", "如果有时间", "句型", "方便吗"],
  ["khaaw-welaa-bpaep-nueng", "ขอเวลาแป๊บหนึ่ง", "khaaw we-laa bpaep nueng", "请给我一点时间", "句型", "方便吗"],
  ["rab-guuan-sak-khruu", "รบกวนสักครู่", "rop guan sak khruu", "麻烦稍等/打扰片刻", "短语", "方便吗"],
  ["mai-saap-waa-saduak-mai", "ไม่ทราบว่าสะดวกไหม", "mai saap waa sa-duak mai", "不知道是否方便", "句型", "方便吗"],
  ["faak-duu-hai-noi", "ฝากดูให้หน่อย", "faak duu hai noi", "麻烦帮我看一下", "句型", "方便吗"],
  ["thaa-mai-saduak-bawk-dai", "ถ้าไม่สะดวกบอกได้", "thaa mai sa-duak baawk dai", "如果不方便可以说", "句型", "方便吗"],
  ["na", "นะ", "na", "句尾柔和语气；拜托时更亲切", "副词", "礼貌表达"],
  ["noi-polite", "หน่อย", "noi", "一点；用于请求时让语气更轻", "副词", "礼貌表达"],
  ["duai-polite", "ด้วย", "duai", "请……；也一起", "副词", "礼貌表达"],
  ["dai-mai", "ได้ไหม", "dai mai", "可以吗", "句型", "礼貌表达"],
  ["dai-rue-plao", "ได้หรือเปล่า", "dai rue bplao", "可不可以", "句型", "礼貌表达"],
  ["ga-ru-naa", "กรุณา", "ga-ru-naa", "请；请您", "动词", "礼貌表达"],
  ["bproot", "โปรด", "bproot", "请；用于告示或正式请求", "动词", "礼貌表达"],
  ["khaaw-a-nu-yaat", "ขออนุญาต", "khaaw a-nu-yaat", "请求允许；请允许", "短语", "礼貌表达"],
  ["khaaw-thoot-thii-rop-guan", "ขอโทษที่รบกวน", "khaaw thoot thii rop guan", "抱歉打扰了", "句型", "礼貌表达"],
  ["khrapp-kha", "ครับ/ค่ะ", "khrap/kha", "礼貌语气词", "副词", "礼貌表达"],
  ["yok-khaawng", "ยกของ", "yok khaawng", "搬东西；抬东西", "动词", "具体帮忙"],
  ["bpoet-bpra-dtuu", "เปิดประตู", "bpoet bpra-dtuu", "开门", "动词", "具体帮忙"],
  ["bpit-fai", "ปิดไฟ", "bpit fai", "关灯", "动词", "具体帮忙"],
  ["thue-thung", "ถือถุง", "thue thung", "提袋子", "动词", "具体帮忙"],
  ["haa-thaang", "หาทาง", "haa thaang", "找路；想办法", "动词", "具体帮忙"],
  ["bplae-hai", "แปลให้", "bplae hai", "翻译给……", "动词", "具体帮忙"],
  ["jaawng-hai", "จองให้", "jaawng hai", "帮忙预订", "动词", "具体帮忙"],
  ["sue-hai", "ซื้อให้", "sue hai", "帮忙买给……", "动词", "具体帮忙"],
  ["rap-khaawng-hai", "รับของให้", "rap khaawng hai", "帮忙收东西", "动词", "具体帮忙"],
  ["song-khaaw-khwaam-hai", "ส่งข้อความให้", "song khaaw khwaam hai", "帮忙发消息", "动词", "具体帮忙"],
  ["phaa-bpai", "พาไป", "phaa bpai", "带去", "动词", "具体帮忙"],
  ["tho-haa-hai", "โทรหาให้", "thoo haa hai", "帮忙打电话给……", "动词", "具体帮忙"],
  ["dai-khrap-kha", "ได้ครับ/ค่ะ", "dai khrap/kha", "可以的；礼貌答应", "句型", "协商回应"],
  ["mai-dai", "ไม่ได้", "mai dai", "不可以；做不了", "句型", "协商回应"],
  ["dtaawn-nii-mai-dai", "ตอนนี้ไม่ได้", "dtaawn nii mai dai", "现在不行", "句型", "协商回应"],
  ["khaaw-khit-gaawn", "ขอคิดก่อน", "khaaw khit gaawn", "让我先想一想", "句型", "协商回应"],
  ["raaw-sak-khruu", "รอสักครู่", "raaw sak khruu", "请等一下", "句型", "协商回应"],
  ["iik-diao", "อีกเดี๋ยว", "iik diao", "再等一会儿", "短语", "协商回应"],
  ["dtaawn-yen-dai-mai", "ตอนเย็นได้ไหม", "dtaawn yen dai mai", "傍晚可以吗", "句型", "协商回应"],
  ["phrung-nii-dai-mai", "พรุ่งนี้ได้ไหม", "phrung nii dai mai", "明天可以吗", "句型", "协商回应"],
  ["tham-hai-dai-mai", "ทำให้ได้ไหม", "tham hai dai mai", "可以帮我做吗", "句型", "协商回应"],
  ["chuai-iik-khrang", "ช่วยอีกครั้ง", "chuai iik khrang", "再帮一次", "短语", "协商回应"],
  ["khaaw-iik-nit", "ขออีกนิด", "khaaw iik nit", "再要一点；再给一点", "短语", "协商回应"],
];

const relatedByTheme: Record<
  RequestsOffersHelpTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  请求: {
    synonym: "ขอหน่อย / khaaw noi / 请给一点、请帮一下",
    antonym: "ไม่ขอ / mai khaaw / 不请求",
    comparison: "ขอ 是请求核心词，加 หน่อย 语气更轻，加 ได้ไหม 更像问“可以吗”。",
    collocation: "ขอใช้ได้ไหม / khaaw chai dai mai / 可以用一下吗",
  },
  帮忙: {
    synonym: "ช่วย / chuai / 帮助",
    antonym: "ไม่ช่วย / mai chuai / 不帮",
    comparison: "ช่วย 可作动词“帮”，也常放句首构成礼貌请求。",
    collocation: "ช่วยฉันหน่อย / chuai chan noi / 请帮我一下",
  },
  让别人做事: {
    synonym: "ช่วยทำให้ / chuai tham hai / 请帮忙做给……",
    antonym: "ทำเอง / tham eng / 自己做",
    comparison: "ช่วย + 动词 是 A2 最常用的“请帮我做……”结构。",
    collocation: "ช่วยเปิดประตูหน่อย / chuai bpoet bpra-dtuu noi / 请帮忙开门",
  },
  主动帮助: {
    synonym: "ให้ช่วยไหม / hai chuai mai / 要我帮忙吗",
    antonym: "ไม่ช่วย / mai chuai / 不帮",
    comparison: "主动提供帮助时，用 ให้ช่วยไหม 比直接ถามว่า ต้องการไหม 更自然。",
    collocation: "มีอะไรให้ช่วยไหม / mii a-rai hai chuai mai / 有什么需要帮忙的吗",
  },
  接受帮助: {
    synonym: "รบกวนด้วย / rop guan duai / 那就麻烦你了",
    antonym: "ไม่เป็นไร / mai bpen rai / 不用了、没关系",
    comparison: "接受帮助时，รบกวนด้วย 比 ได้เลย 更客气。",
    collocation: "ขอบคุณมาก ช่วยได้มาก / khaawp khun maak chuai dai maak / 非常感谢，帮了大忙",
  },
  拒绝帮助: {
    synonym: "ไม่เป็นไร / mai bpen rai / 不用了、没关系",
    antonym: "รบกวนด้วย / rop guan duai / 那就麻烦你了",
    comparison: "拒绝别人帮忙时，先说 ขอบคุณ 再说 ไม่เป็นไร 更礼貌。",
    collocation: "ขอบคุณแต่ไม่เป็นไร / khaawp khun dtae mai bpen rai / 谢谢，但不用了",
  },
  方便吗: {
    synonym: "สะดวกไหม / sa-duak mai / 方便吗",
    antonym: "ไม่สะดวก / mai sa-duak / 不方便",
    comparison: "สะดวกไหม 可直接问方便与否；ถ้าว่าง 更强调“如果有空”。",
    collocation: "ตอนนี้สะดวกไหม / dtaawn nii sa-duak mai / 现在方便吗",
  },
  礼貌表达: {
    synonym: "กรุณา / ga-ru-naa / 请",
    antonym: "สั่งตรง ๆ / sang dtrong dtrong / 直接命令",
    comparison: "หน่อย、นะ、ด้วย 可以让请求更柔和；กรุณา、โปรด 更常见于正式或告示。",
    collocation: "ช่วยดูให้หน่อยนะ / chuai duu hai noi na / 请帮忙看一下好吗",
  },
  具体帮忙: {
    synonym: "ช่วยถือ / chuai thue / 帮忙提着",
    antonym: "ทำเอง / tham eng / 自己做",
    comparison: "具体动作后加 ให้ 表示“帮某人做”，如 ซื้อให้、แปลให้。",
    collocation: "ช่วยแปลให้หน่อย / chuai bplae hai noi / 请帮忙翻译一下",
  },
  协商回应: {
    synonym: "ได้ครับ/ค่ะ / dai khrap/kha / 可以的",
    antonym: "ไม่ได้ / mai dai / 不可以、做不了",
    comparison: "ตอบรับ可用 ได้เลย；不能马上做时可说 ตอนนี้ไม่ได้ แล้วเสนอเวลาอื่น。",
    collocation: "พรุ่งนี้ได้ไหม / phrung nii dai mai / 明天可以吗",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เมื่อฉันต้องการความช่วยเหลือ ฉันพูดว่า “${row[1]}” ด้วยน้ำเสียงสุภาพและอธิบายงานให้ชัดเจน`,
  roman: `muea chan dtawng gaan khwaam chuai luea chan phuut waa "${row[2]}" duai naam-siiang su-phaap lae a-thi-baai ngaan hai chat-jen`,
  chinese: `当我需要帮助时，我会礼貌地说“${row[1]}”，并把要帮的事情说明清楚。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "请求帮助", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 请求、帮忙和回应场景常用。适合日常开口请人帮忙或主动帮别人；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: REQUESTS_OFFERS_HELP_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_REQUESTS_OFFERS_HELP_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
