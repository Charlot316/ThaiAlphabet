export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "才" | "就" | "也许" | "应该" | "必须" | "可以" | "不能" | "为了" | "关于" | "对来说" | "越来越";
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

type Definition = {
  thai: string;
  id: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  exampleThai: string;
  exampleRoman: string;
  exampleChinese: string;
  tag: string;
};

type Action = { thai: string; roman: string; chinese: string; id: string };
type Topic = { thai: string; roman: string; chinese: string; id: string };

const FUNCTION_WORDS_FRAMES_REFS = ["thai-frequency", "thai-a2-function-words-frames-02-candidate"];

const actions: readonly Action[] = [
  { thai: "กลับถึงบ้าน", roman: "glap theung baan", chinese: "到家", id: "glap-theung-baan" },
  { thai: "กินข้าวเช้า", roman: "gin khaao chaao", chinese: "吃早饭", id: "gin-khaao-chaao" },
  { thai: "เริ่มทำงาน", roman: "roem tham-ngaan", chinese: "开始工作", id: "roem-tham-ngaan" },
  { thai: "เปิดร้าน", roman: "bpoet raan", chinese: "开店", id: "bpoet-raan" },
  { thai: "ขึ้นรถเมล์", roman: "kheun rot-mee", chinese: "上公交车", id: "kheun-rot-mee" },
  { thai: "ส่งข้อความ", roman: "song khaaw-khwaam", chinese: "发消息", id: "song-khaaw-khwaam" },
  { thai: "ล้างจาน", roman: "laang jaan", chinese: "洗碗", id: "laang-jaan" },
  { thai: "อ่านหนังสือ", roman: "aan nang-sue", chinese: "看书", id: "aan-nang-sue" },
  { thai: "จ่ายเงิน", roman: "jaai ngoen", chinese: "付款", id: "jaai-ngoen" },
  { thai: "โทรหาแม่", roman: "thoo haa maae", chinese: "给妈妈打电话", id: "thoo-haa-maae" },
  { thai: "เก็บห้อง", roman: "gep haawng", chinese: "收拾房间", id: "gep-haawng" },
  { thai: "ออกจากบ้าน", roman: "aawk jaak baan", chinese: "出门", id: "aawk-jaak-baan" },
];

const topics: readonly Topic[] = [
  { thai: "การบ้านวันนี้", roman: "gaan-baan wan-nii", chinese: "今天的作业", id: "gaan-baan-wan-nii" },
  { thai: "เวลาเรียน", roman: "wee-laa riian", chinese: "上课时间", id: "wee-laa-riian" },
  { thai: "ราคาของ", roman: "raa-khaa khaawng", chinese: "东西价格", id: "raa-khaa-khaawng" },
  { thai: "ทางไปตลาด", roman: "thaang bpai dta-laat", chinese: "去市场的路", id: "thaang-bpai-dta-laat" },
  { thai: "อาหารเย็น", roman: "aa-haan yen", chinese: "晚饭", id: "aa-haan-yen" },
  { thai: "ห้องพัก", roman: "haawng-phak", chinese: "房间", id: "haawng-phak" },
  { thai: "อากาศวันนี้", roman: "aa-gaat wan-nii", chinese: "今天的天气", id: "aa-gaat-wan-nii" },
  { thai: "ตารางงาน", roman: "dtaa-raang ngaan", chinese: "工作表", id: "dtaa-raang-ngaan" },
  { thai: "สุขภาพของแม่", roman: "suk-kha-phaap khaawng maae", chinese: "妈妈的健康", id: "suk-kha-phaap-khaawng-maae" },
  { thai: "เงินทอน", roman: "ngoen thaawn", chinese: "找零", id: "ngoen-thaawn" },
  { thai: "รูปที่ถ่าย", roman: "ruup thii thaai", chinese: "拍的照片", id: "ruup-thii-thaai" },
  { thai: "ของในตู้เย็น", roman: "khaawng nai dtuu-yen", chinese: "冰箱里的东西", id: "khaawng-nai-dtuu-yen" },
];

const directRows: readonly Definition[] = [
  { thai: "เพิ่งตื่นเมื่อกี้", id: "phoeng-dteun-muea-gii", roman: "phoeng dteun muea-gii", chinese: "刚刚才醒", partOfSpeech: "短语", theme: "才", exampleThai: "ฉันเพิ่งตื่นเมื่อกี้ ยังไม่ได้ล้างหน้า", exampleRoman: "chan phoeng dteun muea-gii, yang mai dai laang naa", exampleChinese: "我刚刚才醒，还没洗脸。", tag: "才" },
  { thai: "เพิ่งรู้วันนี้", id: "phoeng-ruu-wan-nii", roman: "phoeng ruu wan-nii", chinese: "今天才知道", partOfSpeech: "短语", theme: "才", exampleThai: "ฉันเพิ่งรู้วันนี้ว่าร้านหยุดวันจันทร์", exampleRoman: "chan phoeng ruu wan-nii waa raan yut wan jan", exampleChinese: "我今天才知道这家店星期一休息。", tag: "才" },
  { thai: "เพิ่งมาถึงเมื่อห้านาทีที่แล้ว", id: "phoeng-maa-theung-muea-haa-naa-thii-thii-laaeo", roman: "phoeng maa theung muea haa naa-thii thii laaeo", chinese: "五分钟前才到", partOfSpeech: "短语", theme: "才", exampleThai: "เขาเพิ่งมาถึงเมื่อห้านาทีที่แล้ว", exampleRoman: "khao phoeng maa theung muea haa naa-thii thii laaeo", exampleChinese: "他五分钟前才到。", tag: "才" },
  { thai: "ถึงบ้านก็อาบน้ำเลย", id: "theung-baan-gaw-aap-naam-loei", roman: "theung baan gaw aap naam loei", chinese: "一到家就洗澡", partOfSpeech: "短语", theme: "就", exampleThai: "วันนี้อากาศร้อน ฉันถึงบ้านก็อาบน้ำเลย", exampleRoman: "wan-nii aa-gaat raawn, chan theung baan gaw aap naam loei", exampleChinese: "今天天气热，我一到家就洗澡。", tag: "就" },
  { thai: "เห็นเพื่อนก็ยิ้มเลย", id: "hen-phuean-gaw-yim-loei", roman: "hen phuean gaw yim loei", chinese: "一看到朋友就笑了", partOfSpeech: "短语", theme: "就", exampleThai: "เด็กเห็นเพื่อนก็ยิ้มเลย", exampleRoman: "dek hen phuean gaw yim loei", exampleChinese: "孩子一看到朋友就笑了。", tag: "就" },
  { thai: "ได้ยินเสียงฝนก็ปิดหน้าต่าง", id: "dai-yin-siiang-fon-gaw-bpit-naa-dtaang", roman: "dai-yin siiang fon gaw bpit naa-dtaang", chinese: "一听到雨声就关窗", partOfSpeech: "短语", theme: "就", exampleThai: "แม่ได้ยินเสียงฝนก็ปิดหน้าต่าง", exampleRoman: "maae dai-yin siiang fon gaw bpit naa-dtaang", exampleChinese: "妈妈一听到雨声就关窗。", tag: "就" },
  { thai: "อาจจะฝนตกตอนเย็น", id: "aat-ja-fon-dtok-dtaawn-yen", roman: "aat ja fon dtok dtaawn yen", chinese: "傍晚也许会下雨", partOfSpeech: "短语", theme: "也许", exampleThai: "ฟ้ามืดมาก อาจจะฝนตกตอนเย็น", exampleRoman: "faa meut maak, aat ja fon dtok dtaawn yen", exampleChinese: "天很暗，傍晚也许会下雨。", tag: "也许" },
  { thai: "บางทีเขาอาจจะลืม", id: "baang-thii-khao-aat-ja-leum", roman: "baang-thii khao aat ja leum", chinese: "他也许忘了", partOfSpeech: "短语", theme: "也许", exampleThai: "เขายังไม่ตอบ บางทีเขาอาจจะลืม", exampleRoman: "khao yang mai dtaawp, baang-thii khao aat ja leum", exampleChinese: "他还没回复，也许是忘了。", tag: "也许" },
  { thai: "น่าจะถึงก่อนเที่ยง", id: "naa-ja-theung-gaawn-thiiang", roman: "naa ja theung gaawn thiiang", chinese: "应该会中午前到", partOfSpeech: "短语", theme: "也许", exampleThai: "ถ้ารถไม่ติด เราน่าจะถึงก่อนเที่ยง", exampleRoman: "thaa rot mai dtit, rao naa ja theung gaawn thiiang", exampleChinese: "如果不堵车，我们应该会中午前到。", tag: "推测" },
  { thai: "ควรพักให้พอ", id: "khuuan-phak-hai-phaaw", roman: "khuuan phak hai phaaw", chinese: "应该休息够", partOfSpeech: "短语", theme: "应该", exampleThai: "ถ้าไม่สบาย คุณควรพักให้พอ", exampleRoman: "thaa mai sa-baai, khun khuuan phak hai phaaw", exampleChinese: "如果不舒服，你应该休息够。", tag: "应该" },
  { thai: "ควรถามก่อนใช้", id: "khuuan-thaam-gaawn-chai", roman: "khuuan thaam gaawn chai", chinese: "使用前应该先问", partOfSpeech: "短语", theme: "应该", exampleThai: "ของของคนอื่นควรถามก่อนใช้", exampleRoman: "khaawng khaawng khon euen khuuan thaam gaawn chai", exampleChinese: "别人的东西使用前应该先问。", tag: "应该" },
  { thai: "ควรไปถึงก่อนเวลา", id: "khuuan-bpai-theung-gaawn-wee-laa", roman: "khuuan bpai theung gaawn wee-laa", chinese: "应该提前到", partOfSpeech: "短语", theme: "应该", exampleThai: "ถ้ามีนัดสำคัญ ควรไปถึงก่อนเวลา", exampleRoman: "thaa mii nat sam-khan, khuuan bpai theung gaawn wee-laa", exampleChinese: "如果有重要约定，应该提前到。", tag: "应该" },
  { thai: "ต้องพกบัตรประชาชน", id: "dtawng-phok-bat-bpra-chaa-chon", roman: "dtawng phok bat bpra-chaa-chon", chinese: "必须带身份证", partOfSpeech: "短语", theme: "必须", exampleThai: "ไปธนาคารต้องพกบัตรประชาชน", exampleRoman: "bpai tha-naa-khaan dtawng phok bat bpra-chaa-chon", exampleChinese: "去银行必须带身份证。", tag: "必须" },
  { thai: "ต้องปิดไฟก่อนออก", id: "dtawng-bpit-fai-gaawn-aawk", roman: "dtawng bpit fai gaawn aawk", chinese: "出去前必须关灯", partOfSpeech: "短语", theme: "必须", exampleThai: "ก่อนออกจากห้อง ต้องปิดไฟก่อนออก", exampleRoman: "gaawn aawk jaak haawng, dtawng bpit fai gaawn aawk", exampleChinese: "离开房间前，必须关灯。", tag: "必须" },
  { thai: "ต้องส่งงานวันนี้", id: "dtawng-song-ngaan-wan-nii", roman: "dtawng song ngaan wan-nii", chinese: "今天必须交工作/作业", partOfSpeech: "短语", theme: "必须", exampleThai: "ครูบอกว่าต้องส่งงานวันนี้", exampleRoman: "khruu baawk waa dtawng song ngaan wan-nii", exampleChinese: "老师说今天必须交作业。", tag: "必须" },
  { thai: "สามารถจ่ายผ่านมือถือได้", id: "saa-maat-jaai-phaan-mue-theu-dai", roman: "saa-maat jaai phaan mue-theu dai", chinese: "可以通过手机付款", partOfSpeech: "短语", theme: "可以", exampleThai: "ร้านนี้สามารถจ่ายผ่านมือถือได้", exampleRoman: "raan nii saa-maat jaai phaan mue-theu dai", exampleChinese: "这家店可以通过手机付款。", tag: "可以" },
  { thai: "สามารถนั่งรอตรงนี้ได้", id: "saa-maat-nang-raaw-dtrong-nii-dai", roman: "saa-maat nang raaw dtrong nii dai", chinese: "可以在这里坐着等", partOfSpeech: "短语", theme: "可以", exampleThai: "ถ้าคิวยาว คุณสามารถนั่งรอตรงนี้ได้", exampleRoman: "thaa khiu yaao, khun saa-maat nang raaw dtrong nii dai", exampleChinese: "如果队很长，你可以在这里坐着等。", tag: "可以" },
  { thai: "สามารถเปลี่ยนเวลาได้ไหม", id: "saa-maat-bplian-wee-laa-dai-mai", roman: "saa-maat bplian wee-laa dai mai", chinese: "可以改时间吗", partOfSpeech: "短语", theme: "可以", exampleThai: "พรุ่งนี้ฉันไม่ว่าง สามารถเปลี่ยนเวลาได้ไหม", exampleRoman: "phrung-nii chan mai waang, saa-maat bplian wee-laa dai mai", exampleChinese: "明天我没空，可以改时间吗？", tag: "可以" },
  { thai: "เข้าไปไม่ได้", id: "khao-bpai-mai-dai", roman: "khao bpai mai dai", chinese: "不能进去", partOfSpeech: "短语", theme: "不能", exampleThai: "ประตูปิดแล้ว เราเข้าไปไม่ได้", exampleRoman: "bpra-dtuu bpit laaeo, rao khao bpai mai dai", exampleChinese: "门关了，我们不能进去。", tag: "不能" },
  { thai: "กินเผ็ดไม่ได้", id: "gin-phet-mai-dai", roman: "gin phet mai dai", chinese: "不能吃辣", partOfSpeech: "短语", theme: "不能", exampleThai: "เด็กคนนี้กินเผ็ดไม่ได้", exampleRoman: "dek khon nii gin phet mai dai", exampleChinese: "这个孩子不能吃辣。", tag: "不能" },
  { thai: "ใช้บัตรนี้ไม่ได้", id: "chai-bat-nii-mai-dai", roman: "chai bat nii mai dai", chinese: "这张卡不能用", partOfSpeech: "短语", theme: "不能", exampleThai: "เครื่องบอกว่าใช้บัตรนี้ไม่ได้", exampleRoman: "khreuuang baawk waa chai bat nii mai dai", exampleChinese: "机器显示这张卡不能用。", tag: "不能" },
  { thai: "เพื่อประหยัดเงิน", id: "phuea-bpra-yat-ngoen", roman: "phuea bpra-yat ngoen", chinese: "为了省钱", partOfSpeech: "短语", theme: "为了", exampleThai: "ฉันทำอาหารที่บ้านเพื่อประหยัดเงิน", exampleRoman: "chan tham aa-haan thii baan phuea bpra-yat ngoen", exampleChinese: "我在家做饭是为了省钱。", tag: "为了" },
  { thai: "เพื่อสุขภาพที่ดี", id: "phuea-suk-kha-phaap-thii-dii", roman: "phuea suk-kha-phaap thii dii", chinese: "为了好健康", partOfSpeech: "短语", theme: "为了", exampleThai: "แม่เดินทุกเช้าเพื่อสุขภาพที่ดี", exampleRoman: "maae doen thuk chaao phuea suk-kha-phaap thii dii", exampleChinese: "妈妈每天早上走路是为了健康。", tag: "为了" },
  { thai: "เพื่อไปให้ทันเวลา", id: "phuea-bpai-hai-than-wee-laa", roman: "phuea bpai hai than wee-laa", chinese: "为了准时到", partOfSpeech: "短语", theme: "为了", exampleThai: "เราต้องออกเร็วเพื่อไปให้ทันเวลา", exampleRoman: "rao dtawng aawk reo phuea bpai hai than wee-laa", exampleChinese: "我们必须早点出门，为了准时到。", tag: "为了" },
  { thai: "เกี่ยวกับครอบครัวของฉัน", id: "giao-gap-khraawp-khrua-khaawng-chan", roman: "giao gap khraawp-khrua khaawng chan", chinese: "关于我的家庭", partOfSpeech: "短语", theme: "关于", exampleThai: "บทเรียนวันนี้เกี่ยวกับครอบครัวของฉัน", exampleRoman: "bot-riian wan-nii giao gap khraawp-khrua khaawng chan", exampleChinese: "今天的课文关于我的家庭。", tag: "关于" },
  { thai: "เกี่ยวกับอาหารไทยง่าย ๆ", id: "giao-gap-aa-haan-thai-ngaai-ngaai", roman: "giao gap aa-haan thai ngaai ngaai", chinese: "关于简单泰国菜", partOfSpeech: "短语", theme: "关于", exampleThai: "วิดีโอนี้เกี่ยวกับอาหารไทยง่าย ๆ", exampleRoman: "wi-dii-oo nii giao gap aa-haan thai ngaai ngaai", exampleChinese: "这个视频关于简单泰国菜。", tag: "关于" },
  { thai: "เกี่ยวกับทางไปโรงแรม", id: "giao-gap-thaang-bpai-roong-raaem", roman: "giao gap thaang bpai roong-raaem", chinese: "关于去酒店的路", partOfSpeech: "短语", theme: "关于", exampleThai: "ฉันมีคำถามเกี่ยวกับทางไปโรงแรม", exampleRoman: "chan mii kham-thaam giao gap thaang bpai roong-raaem", exampleChinese: "我有关于去酒店路线的问题。", tag: "关于" },
  { thai: "สำหรับฉันแล้วไม่ยาก", id: "sam-rap-chan-laaeo-mai-yaak", roman: "sam-rap chan laaeo mai yaak", chinese: "对我来说不难", partOfSpeech: "短语", theme: "对来说", exampleThai: "คำนี้สำหรับฉันแล้วไม่ยาก", exampleRoman: "kham nii sam-rap chan laaeo mai yaak", exampleChinese: "这个词对我来说不难。", tag: "对来说" },
  { thai: "สำหรับเด็กแล้วเผ็ดไป", id: "sam-rap-dek-laaeo-phet-bpai", roman: "sam-rap dek laaeo phet bpai", chinese: "对孩子来说太辣", partOfSpeech: "短语", theme: "对来说", exampleThai: "อาหารจานนี้สำหรับเด็กแล้วเผ็ดไป", exampleRoman: "aa-haan jaan nii sam-rap dek laaeo phet bpai", exampleChinese: "这道菜对孩子来说太辣。", tag: "对来说" },
  { thai: "สำหรับแม่แล้วแพงไป", id: "sam-rap-maae-laaeo-phaaeng-bpai", roman: "sam-rap maae laaeo phaaeng bpai", chinese: "对妈妈来说太贵", partOfSpeech: "短语", theme: "对来说", exampleThai: "กระเป๋าใบนี้สำหรับแม่แล้วแพงไป", exampleRoman: "gra-bpao bai nii sam-rap maae laaeo phaaeng bpai", exampleChinese: "这个包对妈妈来说太贵。", tag: "对来说" },
  { thai: "ยิ่งเรียนยิ่งเข้าใจ", id: "ying-riian-ying-khao-jai", roman: "ying riian ying khao-jai", chinese: "越学越懂", partOfSpeech: "短语", theme: "越来越", exampleThai: "ภาษาไทยยิ่งเรียนยิ่งเข้าใจ", exampleRoman: "phaa-saa thai ying riian ying khao-jai", exampleChinese: "泰语越学越懂。", tag: "越来越" },
  { thai: "ยิ่งเดินยิ่งเหนื่อย", id: "ying-doen-ying-neuuai", roman: "ying doen ying neuuai", chinese: "越走越累", partOfSpeech: "短语", theme: "越来越", exampleThai: "วันนี้อากาศร้อน ยิ่งเดินยิ่งเหนื่อย", exampleRoman: "wan-nii aa-gaat raawn, ying doen ying neuuai", exampleChinese: "今天天气热，越走越累。", tag: "越来越" },
  { thai: "ยิ่งคุยยิ่งสนุก", id: "ying-khui-ying-sa-nuk", roman: "ying khui ying sa-nuk", chinese: "越聊越有趣", partOfSpeech: "短语", theme: "越来越", exampleThai: "เพื่อนใหม่คนนี้ยิ่งคุยยิ่งสนุก", exampleRoman: "phuean mai khon nii ying khui ying sa-nuk", exampleChinese: "这位新朋友越聊越有趣。", tag: "越来越" },
];

const justRows = actions.map((action): Definition => ({
  thai: `เพิ่ง${action.thai}เมื่อกี้`,
  id: `phoeng-${action.id}-muea-gii`,
  roman: `phoeng ${action.roman} muea-gii`,
  chinese: `刚刚才${action.chinese}`,
  partOfSpeech: "短语",
  theme: "才",
  exampleThai: `ฉันเพิ่ง${action.thai}เมื่อกี้ ยังไม่ว่างคุย`,
  exampleRoman: `chan phoeng ${action.roman} muea-gii, yang mai waang khui`,
  exampleChinese: `我刚刚才${action.chinese}，还没空聊天。`,
  tag: "才",
}));

const immediateRows = actions.map((action): Definition => ({
  thai: `${action.thai}แล้วก็พักเลย`,
  id: `${action.id}-laaeo-gaw-phak-loei`,
  roman: `${action.roman} laaeo gaw phak loei`,
  chinese: `${action.chinese}后就休息`,
  partOfSpeech: "短语",
  theme: "就",
  exampleThai: `วันนี้ฉัน${action.thai}แล้วก็พักเลย`,
  exampleRoman: `wan-nii chan ${action.roman} laaeo gaw phak loei`,
  exampleChinese: `今天我${action.chinese}后就休息。`,
  tag: "就",
}));

const maybeRows = topics.map((topic): Definition => ({
  thai: `อาจจะมีปัญหาเรื่อง${topic.thai}`,
  id: `aat-ja-mii-bpan-haa-rueang-${topic.id}`,
  roman: `aat ja mii bpan-haa rueang ${topic.roman}`,
  chinese: `也许有关于${topic.chinese}的问题`,
  partOfSpeech: "短语",
  theme: "也许",
  exampleThai: `ถ้ายังไม่เสร็จ อาจจะมีปัญหาเรื่อง${topic.thai}`,
  exampleRoman: `thaa yang mai set, aat ja mii bpan-haa rueang ${topic.roman}`,
  exampleChinese: `如果还没完成，也许有关于${topic.chinese}的问题。`,
  tag: "也许",
}));

const shouldRows = topics.map((topic): Definition => ({
  thai: `ควรถามเรื่อง${topic.thai}ก่อน`,
  id: `khuuan-thaam-rueang-${topic.id}-gaawn`,
  roman: `khuuan thaam rueang ${topic.roman} gaawn`,
  chinese: `应该先问${topic.chinese}的事`,
  partOfSpeech: "短语",
  theme: "应该",
  exampleThai: `ถ้าไม่แน่ใจ ควรถามเรื่อง${topic.thai}ก่อน`,
  exampleRoman: `thaa mai naae-jai, khuuan thaam rueang ${topic.roman} gaawn`,
  exampleChinese: `如果不确定，应该先问${topic.chinese}的事。`,
  tag: "应该",
}));

const mustRows = actions.slice(0, 10).map((action): Definition => ({
  thai: `ต้อง${action.thai}ก่อน`,
  id: `dtawng-${action.id}-gaawn`,
  roman: `dtawng ${action.roman} gaawn`,
  chinese: `必须先${action.chinese}`,
  partOfSpeech: "短语",
  theme: "必须",
  exampleThai: `ก่อนออกไปข้างนอก ฉันต้อง${action.thai}ก่อน`,
  exampleRoman: `gaawn aawk bpai khaang naawk, chan dtawng ${action.roman} gaawn`,
  exampleChinese: `出门前，我必须先${action.chinese}。`,
  tag: "必须",
}));

const cannotRows = actions.slice(0, 10).map((action): Definition => ({
  thai: `ยัง${action.thai}ไม่ได้`,
  id: `yang-${action.id}-mai-dai`,
  roman: `yang ${action.roman} mai dai`,
  chinese: `还不能${action.chinese}`,
  partOfSpeech: "短语",
  theme: "不能",
  exampleThai: `ตอนนี้ฉันยัง${action.thai}ไม่ได้ เพราะยังไม่พร้อม`,
  exampleRoman: `dtaawn-nii chan yang ${action.roman} mai dai, phraw yang mai phraawm`,
  exampleChinese: `现在我还不能${action.chinese}，因为还没准备好。`,
  tag: "不能",
}));

const aboutRows = topics.map((topic): Definition => ({
  thai: `คุยเกี่ยวกับ${topic.thai}`,
  id: `khui-giao-gap-${topic.id}`,
  roman: `khui giao gap ${topic.roman}`,
  chinese: `聊关于${topic.chinese}的事`,
  partOfSpeech: "短语",
  theme: "关于",
  exampleThai: `ตอนเย็นเราคุยเกี่ยวกับ${topic.thai}กันนิดหน่อย`,
  exampleRoman: `dtaawn yen rao khui giao gap ${topic.roman} gan nit naawy`,
  exampleChinese: `傍晚我们稍微聊了关于${topic.chinese}的事。`,
  tag: "关于",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...justRows,
  ...immediateRows,
  ...maybeRows,
  ...shouldRows,
  ...mustRows,
  ...cannotRows,
  ...aboutRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "功能词句框", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段把功能词放进完整句框里记，比单背虚词更容易开口。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于补充 A2 功能词和句框：才、就、也许、应该、必须、可以、不能、为了、关于、对……来说、越来越。"],
    tags,
    sourceRefs: FUNCTION_WORDS_FRAMES_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_FUNCTION_WORDS_FRAMES_02 = rows.map(toCandidate);
