export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "情绪" | "感觉" | "身体护理" | "疲惫压力" | "舒服状态" | "个人状态" | "心理感受";
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

type Row = readonly [thai: string, id: string, roman: string, chinese: string, partOfSpeech: VocabularyExpansionPartOfSpeech, theme: VocabularyExpansionTheme, exampleThai: string, exampleRoman: string, exampleChinese: string, tag: string];

const FEELINGS_BODY_CARE_REFS = ["thai-frequency", "thai-a2-feelings-body-care-candidate"];

const rows = [
  ["รู้สึกดีขึ้น", "ruu-seuk-dii-kheun", "ruu-seuk dii kheun", "感觉好一点了", "短语", "感觉", "หลังพักหนึ่งคืน ฉันรู้สึกดีขึ้นมาก", "lang phak neung kheun, chan ruu-seuk dii kheun maak", "休息一晚后，我感觉好多了。", "feeling"],
  ["รู้สึกไม่ค่อยดี", "ruu-seuk-mai-khaawy-dii", "ruu-seuk mai khaawy dii", "感觉不太好", "短语", "感觉", "วันนี้เขารู้สึกไม่ค่อยดี จึงกลับบ้านเร็ว", "wan-nii khao ruu-seuk mai khaawy dii, jeung glap baan reo", "今天他感觉不太好，所以早点回家。", "feeling"],
  ["รู้สึกแย่ลง", "ruu-seuk-yaae-long", "ruu-seuk yaae long", "感觉变差了", "短语", "感觉", "ถ้าเธอรู้สึกแย่ลง ควรไปหาหมอ", "thaa thoe ruu-seuk yaae long, khuuan bpai haa maaw", "如果你感觉变差了，应该去看医生。", "feeling"],
  ["อารมณ์ดี", "aa-rom-dii", "aa-rom dii", "心情好", "形容词", "情绪", "เช้านี้แม่อารมณ์ดีและยิ้มตลอด", "chaao nii maae aa-rom dii lae yim dta-laawt", "今天早上妈妈心情好，一直微笑。", "mood"],
  ["อารมณ์ไม่ดี", "aa-rom-mai-dii", "aa-rom mai dii", "心情不好", "形容词", "情绪", "เขาอารมณ์ไม่ดี เพราะนอนน้อย", "khao aa-rom mai dii, phraw naawn naawy", "他心情不好，因为睡得少。", "mood"],
  ["ดีใจมาก", "dii-jai-maak", "dii-jai maak", "非常高兴", "形容词", "情绪", "ฉันดีใจมากที่สอบผ่าน", "chan dii-jai maak thii saawp phaan", "我考试通过，非常高兴。", "happy"],
  ["ดีใจที่ได้เจอ", "dii-jai-thii-dai-jooe", "dii-jai thii dai jooe", "很高兴见到", "短语", "情绪", "พวกเราดีใจที่ได้เจอคุณอีกครั้ง", "phuak-rao dii-jai thii dai jooe khun iik khrang", "我们很高兴又见到你。", "happy"],
  ["เสียใจนิดหน่อย", "siia-jai-nit-naawy", "siia-jai nit naawy", "有点难过", "形容词", "情绪", "น้องเสียใจนิดหน่อยที่ของเล่นหาย", "naawng siia-jai nit naawy thii khaawng-len haai", "弟弟/妹妹因为玩具丢了有点难过。", "sad"],
  ["รู้สึกเหงาตอนกลางคืน", "ruu-seuk-ngao-dtaawn-glaang-kheun", "ruu-seuk ngao dtaawn glaang-kheun", "晚上感到孤单", "短语", "心理感受", "เวลาอยู่คนเดียว ฉันรู้สึกเหงาตอนกลางคืนบ้าง", "wee-laa yuu khon diao, chan ruu-seuk ngao dtaawn glaang-kheun baang", "一个人的时候，我晚上有时感到孤单。", "mind"],
  ["กลัวนิดหน่อย", "glua-nit-naawy", "glua nit naawy", "有点害怕", "形容词", "情绪", "เด็กกลัวนิดหน่อยเมื่อได้ยินเสียงดัง", "dek glua nit naawy muea dai-yin siiang dang", "孩子听到很大的声音时有点害怕。", "fear"],
  ["กังวลเรื่องสอบพรุ่งนี้", "gang-won-rueang-saawp-phrung-nii", "gang-won rueang saawp phrung-nii", "担心明天的考试", "短语", "心理感受", "เธอกังวลเรื่องสอบพรุ่งนี้ แต่เธออ่านหนังสือมากแล้ว", "thoe gang-won rueang saawp phrung-nii, dtaae thoe aan nang-sue maak laaeo", "她担心明天的考试，但已经读了很多书。", "worry"],
  ["กังวลเรื่องงาน", "gang-won-rueang-ngaan", "gang-won rueang ngaan", "担心工作", "短语", "心理感受", "พ่อกังวลเรื่องงานนิดหน่อยในสัปดาห์นี้", "phaaw gang-won rueang ngaan nit naawy nai sap-daa nii", "爸爸这周有点担心工作。", "worry"],
  ["เครียดจากงาน", "khriiat-jaak-ngaan", "khriiat jaak ngaan", "因工作有压力", "短语", "疲惫压力", "เขาเครียดจากงาน จึงอยากพักผ่อน", "khao khriiat jaak ngaan, jeung yaak phak-phaawn", "他因为工作有压力，所以想休息。", "stress"],
  ["เครียดเรื่องเงิน", "khriiat-rueang-ngoen", "khriiat rueang ngoen", "为钱的事压力大", "短语", "疲惫压力", "ช่วงนี้ครอบครัวเครียดเรื่องเงินบ้าง", "chuuang nii khraawp-khrua khriiat rueang ngoen baang", "最近家里有些为钱的事感到压力。", "stress"],
  ["ใจเย็นลง", "jai-yen-long", "jai yen long", "冷静下来", "短语", "心理感受", "หายใจช้า ๆ แล้วใจเย็นลงก่อน", "haai-jai chaa chaa laaeo jai yen long gaawn", "慢慢呼吸，先冷静下来。", "calm"],
  ["ใจร้อนเกินไป", "jai-raawn-goen-bpai", "jai raawn goen bpai", "太着急；太急躁", "形容词", "心理感受", "อย่าใจร้อนเกินไป เรามีเวลา", "yaa jai raawn goen bpai, rao mii wee-laa", "别太着急，我们有时间。", "mind"],
  ["สบายใจขึ้น", "sa-baai-jai-kheun", "sa-baai jai kheun", "心里轻松些", "短语", "心理感受", "หลังคุยกับเพื่อน ฉันสบายใจขึ้น", "lang khui gap phuean, chan sa-baai jai kheun", "和朋友聊过后，我心里轻松些。", "relief"],
  ["ไม่สบายใจ", "mai-sa-baai-jai", "mai sa-baai jai", "心里不舒服；不安心", "形容词", "心理感受", "เธอไม่สบายใจที่ลืมนัดเพื่อน", "thoe mai sa-baai jai thii leum nat phuean", "她忘了朋友的约定，心里不舒服。", "mind"],
  ["รู้สึกโล่งใจ", "ruu-seuk-loong-jai", "ruu-seuk loong jai", "觉得放心；松了一口气", "短语", "心理感受", "เมื่อแม่โทรกลับมา ฉันรู้สึกโล่งใจ", "muea maae thoo glap maa, chan ruu-seuk loong jai", "妈妈回电话时，我松了一口气。", "relief"],
  ["คิดมากไป", "khit-maak-bpai", "khit maak bpai", "想太多", "短语", "心理感受", "บางทีฉันคิดมากไปและนอนไม่หลับ", "baang-thii chan khit maak bpai lae naawn mai lap", "有时候我想太多，睡不着。", "mind"],
  ["เบื่ออยู่บ้าน", "beua-yuu-baan", "beua yuu baan", "待在家觉得无聊", "短语", "情绪", "เด็ก ๆ เบื่ออยู่บ้านทั้งวัน", "dek dek beua yuu baan thang wan", "孩子们在家待一整天觉得无聊。", "mood"],
  ["ตื่นเต้นมาก", "dteun-dten-maak", "dteun-dten maak", "很兴奋；很紧张期待", "形容词", "情绪", "ฉันตื่นเต้นมากก่อนเดินทางครั้งแรก", "chan dteun-dten maak gaawn doen-thaang khrang raaek", "第一次出行前我很兴奋。", "emotion"],
  ["ภูมิใจในตัวเองมาก", "phuum-jai-nai-dtua-eeng-maak", "phuum-jai nai dtua-eeng maak", "很为自己骄傲", "短语", "心理感受", "เธอภูมิใจในตัวเองมากที่ทำได้", "thoe phuum-jai nai dtua-eeng maak thii tham dai", "她为自己做到了而非常骄傲。", "mind"],
  ["ยังไม่มั่นใจ", "yang-mai-man-jai", "yang mai man-jai", "还没有信心；还不确定", "形容词", "心理感受", "ผมยังไม่มั่นใจว่าจะพูดถูกไหม", "phom yang mai man-jai waa ja phuut thuuk mai", "我还不确定自己会不会说对。", "confidence"],
  ["มั่นใจขึ้น", "man-jai-kheun", "man-jai kheun", "更有信心", "短语", "心理感受", "หลังฝึกหลายครั้ง ฉันมั่นใจขึ้น", "lang feuk laai khrang, chan man-jai kheun", "练习多次后，我更有信心了。", "confidence"],
  ["เหนื่อยทั้งวัน", "neuuai-thang-wan", "neuuai thang wan", "一整天都累", "短语", "疲惫压力", "วันนี้ฉันทำงานบ้านและเหนื่อยทั้งวัน", "wan-nii chan tham-ngaan baan lae neuuai thang wan", "今天我做家务，一整天都累。", "tired"],
  ["เหนื่อยจากการเดิน", "neuuai-jaak-gaan-doen", "neuuai jaak gaan doen", "走路走累了", "短语", "疲惫压力", "เราเหนื่อยจากการเดินในตลาดนาน", "rao neuuai jaak gaan doen nai dta-laat naan", "我们在市场走了很久，走累了。", "tired"],
  ["เพลียตอนบ่าย", "phliia-dtaawn-baai", "phliia dtaawn baai", "下午乏力", "形容词", "疲惫压力", "ฉันเพลียตอนบ่าย ถ้ากินข้าวกลางวันน้อย", "chan phliia dtaawn baai, thaa gin khaao glaang-wan naawy", "如果午饭吃得少，我下午会乏力。", "tired"],
  ["ง่วงมาก", "nguuang-maak", "nguuang maak", "很困", "形容词", "疲惫压力", "เมื่อคืนฉันนอนดึก วันนี้ง่วงมาก", "muea-kheun chan naawn deuk, wan-nii nguuang maak", "昨晚我睡得晚，今天很困。", "sleepy"],
  ["นอนพักก่อน", "naawn-phak-gaawn", "naawn phak gaawn", "先躺下休息", "短语", "疲惫压力", "ถ้าเหนื่อยมาก ให้นอนพักก่อน", "thaa neuuai maak, hai naawn phak gaawn", "如果很累，就先躺下休息。", "rest"],
  ["พักให้พอ", "phak-hai-phaaw", "phak hai phaaw", "休息够", "短语", "疲惫压力", "คนป่วยควรพักให้พอทุกวัน", "khon bpuai khuuan phak hai phaaw thuk wan", "病人每天应该休息够。", "rest"],
  ["พักสายตาสักครู่", "phak-saai-dtaa-sak-khruu", "phak saai-dtaa sak khruu", "让眼睛休息一会儿", "短语", "身体护理", "อ่านหนังสือนานแล้ว ควรพักสายตาสักครู่", "aan nang-sue naan laaeo, khuuan phak saai-dtaa sak khruu", "看书很久了，应该让眼睛休息一会儿。", "care"],
  ["หลับไม่สนิท", "lap-mai-sa-nit", "lap mai sa-nit", "睡得不踏实", "短语", "疲惫压力", "เมื่อคืนเขาหลับไม่สนิท เพราะอากาศร้อน", "muea-kheun khao lap mai sa-nit, phraw aa-gaat raawn", "昨晚他因为天气热睡得不踏实。", "sleep"],
  ["ตื่นสายไป", "dteun-saai-bpai", "dteun saai bpai", "起得太晚", "短语", "个人状态", "วันนี้ฉันตื่นสายไป เลยไม่ได้กินข้าวเช้า", "wan-nii chan dteun saai bpai, loei mai dai gin khaao chaao", "今天我起得太晚，所以没吃早饭。", "state"],
  ["ตื่นเช้ากว่าเดิม", "dteun-chaao-gwaa-doem", "dteun chaao gwaa doem", "比以前起得早", "短语", "个人状态", "เดือนนี้เขาตื่นเช้ากว่าเดิมเพื่อออกกำลังกาย", "duean nii khao dteun chaao gwaa doem phuea aawk-gam-lang-gaai", "这个月他为了运动比以前起得早。", "state"],
  ["หิวจนมือสั่น", "hiu-jon-mue-san", "hiu jon mue san", "饿到手发抖", "短语", "感觉", "ฉันหิวจนมือสั่น เพราะยังไม่ได้กินอะไร", "chan hiu jon mue san, phraw yang mai dai gin a-rai", "我还没吃东西，饿到手发抖。", "feeling"],
  ["อิ่มเกินไป", "im-goen-bpai", "im goen bpai", "吃得太饱", "形容词", "感觉", "มื้อเย็นวันนี้อร่อย แต่ฉันอิ่มเกินไป", "meu yen wan-nii a-raawy, dtaae chan im goen bpai", "今天晚饭好吃，但我吃得太饱了。", "feeling"],
  ["กระหายน้ำ", "gra-haai-naam", "gra-haai naam", "口渴", "形容词", "感觉", "หลังวิ่ง ฉันกระหายน้ำมาก", "lang wing, chan gra-haai naam maak", "跑步后我很口渴。", "feeling"],
  ["หนาวจนสั่น", "naao-jon-san", "naao jon san", "冷得发抖", "短语", "感觉", "ตอนเช้าเขาหนาวจนสั่น เพราะลืมเสื้อกันหนาว", "dtaawn chaao khao naao jon san, phraw leum seua gan naao", "早上他忘了外套，冷得发抖。", "feeling"],
  ["ร้อนจนเหงื่อออก", "raawn-jon-ngeuua-aawk", "raawn jon ngeuua aawk", "热到出汗", "短语", "感觉", "ห้องนี้ร้อนจนเหงื่อออก", "haawng nii raawn jon ngeuua aawk", "这个房间热到出汗。", "feeling"],
  ["เวียนหัวนิดหน่อย", "wiian-hua-nit-naawy", "wiian hua nit naawy", "有点头晕", "短语", "个人状态", "ฉันเวียนหัวนิดหน่อย ขอ坐พักก่อน", "chan wiian hua nit naawy, khaaw nang phak gaawn", "我有点头晕，请让我先坐着休息。", "body"],
  ["ปวดหัวข้างเดียว", "bpuat-hua-khaang-diao", "bpuat hua khaang diao", "一侧头痛", "短语", "个人状态", "เขาปวดหัวข้างเดียวตั้งแต่เช้า", "khao bpuat hua khaang diao dtang-dtaae chaao", "他从早上开始一侧头痛。", "body"],
  ["ปวดคอนิดหน่อย", "bpuat-khaaw-nit-naawy", "bpuat khaaw nit naawy", "脖子有点痛", "短语", "个人状态", "ฉันนั่งทำงานนานจนปวดคอนิดหน่อย", "chan nang tham-ngaan naan jon bpuat khaaw nit naawy", "我坐着工作很久，脖子有点痛。", "body"],
  ["ปวดหลังจากนั่งนาน", "bpuat-lang-jaak-nang-naan", "bpuat lang jaak nang naan", "久坐后背痛", "短语", "个人状态", "พ่อปวดหลังจากนั่งนานในรถ", "phaaw bpuat lang jaak nang naan nai rot", "爸爸在车里坐久了后背痛。", "body"],
  ["ปวดท้องหลังอาหาร", "bpuat-thaawng-lang-aa-haan", "bpuat thaawng lang aa-haan", "饭后肚子痛", "短语", "个人状态", "ถ้าปวดท้องหลังอาหาร ควรดื่มน้ำอุ่น", "thaa bpuat thaawng lang aa-haan, khuuan deum naam un", "如果饭后肚子痛，应该喝温水。", "body"],
  ["เจ็บคอเวลาไอ", "jep-khaaw-wee-laa-ai", "jep khaaw wee-laa ai", "咳嗽时喉咙痛", "短语", "个人状态", "เขาเจ็บคอเวลาไอ จึงพูดน้อยลง", "khao jep khaaw wee-laa ai, jeung phuut naawy long", "他咳嗽时喉咙痛，所以说话少了。", "body"],
  ["คัดจมูกตอนเช้า", "khat-ja-muuk-dtaawn-chaao", "khat ja-muuk dtaawn chaao", "早上鼻塞", "短语", "个人状态", "ช่วงหน้าฝนฉันคัดจมูกตอนเช้าบ่อย", "chuuang naa-fon chan khat ja-muuk dtaawn chaao baawy", "雨季时我早上经常鼻塞。", "body"],
  ["มีน้ำมูกตอนเช้า", "mii-naam-muuk-dtaawn-chaao", "mii naam-muuk dtaawn chaao", "早上流鼻涕", "短语", "个人状态", "น้องมีน้ำมูกตอนเช้า แม่ให้เช็ดจมูก", "naawng mii naam-muuk dtaawn chaao, maae hai chet ja-muuk", "弟弟/妹妹早上流鼻涕，妈妈让他/她擦鼻子。", "body"],
  ["เสียงแหบ", "siiang-haaep", "siiang haaep", "声音沙哑", "形容词", "个人状态", "วันนี้ครูเสียงแหบ เพราะพูดมากเมื่อวาน", "wan-nii khruu siiang haaep, phraw phuut maak muea-waan", "今天老师声音沙哑，因为昨天说了很多话。", "body"],
  ["ตัวร้อนตอนกลางคืน", "dtua-raawn-dtaawn-glaang-kheun", "dtua raawn dtaawn glaang-kheun", "晚上身体发热", "短语", "个人状态", "ถ้าเด็กตัวร้อนตอนกลางคืน ต้องวัดไข้ก่อน", "thaa dek dtua raawn dtaawn glaang-kheun, dtawng wat khai gaawn", "如果孩子晚上身体发热，要先量体温。", "body"],
  ["ตัวเย็น", "dtua-yen", "dtua yen", "身体发凉", "形容词", "个人状态", "มือของเขาตัวเย็นหลังยืนในลมนาน", "mue khaawng khao dtua yen lang yeun nai lom naan", "他在风里站久后身体发凉。", "body"],
  ["ไม่สบายตัว", "mai-sa-baai-dtua", "mai sa-baai dtua", "身体不舒服", "形容词", "舒服状态", "ฉันไม่สบายตัว จึงอยากอาบน้ำอุ่น", "chan mai sa-baai dtua, jeung yaak aap naam un", "我身体不舒服，所以想洗个温水澡。", "comfort"],
  ["สบายตัวขึ้น", "sa-baai-dtua-kheun", "sa-baai dtua kheun", "身体舒服些", "短语", "舒服状态", "หลังอาบน้ำ เขาสบายตัวขึ้น", "lang aap naam, khao sa-baai dtua kheun", "洗澡后，他身体舒服些。", "comfort"],
  ["ปวดเมื่อยตัว", "bpuat-meuuai-dtua", "bpuat meuuai dtua", "浑身酸痛", "短语", "个人状态", "หลังเดินทางไกล ฉันปวดเมื่อยตัว", "lang doen-thaang glai, chan bpuat meuuai dtua", "长途旅行后，我浑身酸痛。", "body"],
  ["หายป่วยแล้ว", "haai-bpuai-laaeo", "haai bpuai laaeo", "病好了", "短语", "个人状态", "พี่หายป่วยแล้วและไปเรียนได้", "phii haai bpuai laaeo lae bpai riian dai", "哥哥/姐姐病好了，可以去上课了。", "health"],
  ["ยังไม่หายดี", "yang-mai-haai-dii", "yang mai haai dii", "还没完全好", "短语", "个人状态", "ฉันยังไม่หายดี เลยไม่อยากออกไปข้างนอก", "chan yang mai haai dii, loei mai yaak aawk bpai khaang naawk", "我还没完全好，所以不想出去。", "health"],
  ["กินยาแล้ว", "gin-yaa-laaeo", "gin yaa laaeo", "已经吃药了", "短语", "个人状态", "เขากินยาแล้วและนอนพักในห้อง", "khao gin yaa laaeo lae naawn phak nai haawng", "他已经吃药了，在房间里休息。", "health"],
  ["ลืมกินยา", "leum-gin-yaa", "leum gin yaa", "忘记吃药", "短语", "个人状态", "ยายลืมกินยาเมื่อเช้า", "yaai leum gin yaa muea-chaao", "外婆/奶奶今天早上忘记吃药了。", "health"],
  ["ไปหาหมอพรุ่งนี้", "bpai-haa-maaw-phrung-nii", "bpai haa maaw phrung-nii", "明天去看医生", "短语", "个人状态", "ถ้าไข้ไม่ลด พรุ่งนี้ฉันจะไปหาหมอ", "thaa khai mai lot, phrung-nii chan ja bpai haa maaw", "如果烧不退，我明天会去看医生。", "health"],
  ["วัดไข้ก่อนนอน", "wat-khai-gaawn-naawn", "wat khai gaawn naawn", "睡前量体温", "短语", "个人状态", "แม่วัดไข้ให้ลูกก่อนนอน", "maae wat khai hai luuk gaawn naawn", "妈妈睡前给孩子量体温。", "health"],
  ["ล้างมือให้สะอาด", "laang-mue-hai-sa-aat", "laang mue hai sa-aat", "把手洗干净", "短语", "身体护理", "ก่อนกินข้าว ต้องล้างมือให้สะอาด", "gaawn gin khaao, dtawng laang mue hai sa-aat", "吃饭前要把手洗干净。", "care"],
  ["ล้างหน้าตอนเช้าทุกวัน", "laang-naa-dtaawn-chaao-thuk-wan", "laang naa dtaawn chaao thuk wan", "每天早上洗脸", "短语", "身体护理", "ฉันล้างหน้าตอนเช้าทุกวันด้วยน้ำเย็น", "chan laang naa dtaawn chaao thuk wan duai naam yen", "我每天早上用冷水洗脸。", "care"],
  ["แปรงฟันก่อนนอนทุกคืน", "bpraaeng-fan-gaawn-naawn-thuk-kheun", "bpraaeng fan gaawn naawn thuk kheun", "每天晚上睡前刷牙", "短语", "身体护理", "เด็ก ๆ แปรงฟันก่อนนอนทุกคืน", "dek dek bpraaeng fan gaawn naawn thuk kheun", "孩子们每天晚上睡前刷牙。", "care"],
  ["อาบน้ำอุ่น", "aap-naam-un", "aap naam un", "洗温水澡", "短语", "身体护理", "เมื่ออากาศเย็น ฉันชอบอาบน้ำอุ่น", "muea aa-gaat yen, chan chaawp aap naam un", "天气凉时，我喜欢洗温水澡。", "care"],
  ["สระผมตอนเย็น", "sa-phom-dtaawn-yen", "sa phom dtaawn yen", "晚上洗头", "短语", "身体护理", "วันนี้อากาศร้อน ฉันจะสระผมตอนเย็น", "wan-nii aa-gaat raawn, chan ja sa phom dtaawn yen", "今天天气热，我晚上要洗头。", "care"],
  ["เช็ดตัวให้แห้ง", "chet-dtua-hai-haaeng", "chet dtua hai haaeng", "把身体擦干", "短语", "身体护理", "หลังอาบน้ำต้องเช็ดตัวให้แห้ง", "lang aap naam dtawng chet dtua hai haaeng", "洗澡后要把身体擦干。", "care"],
  ["หวีผมให้เรียบร้อย", "wii-phom-hai-riiap-raawy", "wii phom hai riiap-raawy", "把头发梳整齐", "短语", "身体护理", "ก่อนไปโรงเรียน น้องหวีผมให้เรียบร้อย", "gaawn bpai roong-riian, naawng wii phom hai riiap-raawy", "去学校前，弟弟/妹妹把头发梳整齐。", "care"],
  ["ตัดเล็บสั้น", "dtat-lep-san", "dtat lep san", "把指甲剪短", "短语", "身体护理", "แม่บอกให้ฉันตัดเล็บสั้น", "maae baawk hai chan dtat lep san", "妈妈让我把指甲剪短。", "care"],
  ["ทาครีมที่มือ", "thaa-khriim-thii-mue", "thaa khriim thii mue", "在手上涂霜", "短语", "身体护理", "อากาศแห้ง ฉันทาครีมที่มือก่อนนอน", "aa-gaat haaeng, chan thaa khriim thii mue gaawn naawn", "天气干，我睡前在手上涂霜。", "care"],
  ["ทายาที่แขน", "thaa-yaa-thii-khaaen", "thaa yaa thii khaaen", "在手臂上涂药", "短语", "身体护理", "เขาทายาที่แขนเพราะยุงกัด", "khao thaa yaa thii khaaen phraw yung gat", "他因为被蚊子咬了，在手臂上涂药。", "care"],
  ["ใช้ผ้าเช็ดหน้า", "chai-phaa-chet-naa", "chai phaa chet naa", "用手帕/纸巾擦脸", "短语", "身体护理", "เด็กใช้ผ้าเช็ดหน้าเช็ดเหงื่อ", "dek chai phaa chet naa chet ngeuua", "孩子用手帕/纸巾擦汗。", "care"],
  ["ใส่หน้ากาก", "sai-naa-gaak", "sai naa-gaak", "戴口罩", "短语", "身体护理", "เมื่อเป็นหวัด เขาใส่หน้ากากในรถไฟ", "muea bpen wat, khao sai naa-gaak nai rot-fai", "感冒时，他在火车上戴口罩。", "care"],
  ["ถอดหน้ากาก", "thaawt-naa-gaak", "thaawt naa-gaak", "摘口罩", "短语", "身体护理", "กลับถึงบ้านแล้ว เขาถอดหน้ากากและล้างมือ", "glap theung baan laaeo, khao thaawt naa-gaak lae laang mue", "到家后，他摘下口罩并洗手。", "care"],
  ["เปลี่ยนเสื้อผ้า", "bplian-seua-phaa", "bplian seua-phaa", "换衣服", "短语", "身体护理", "หลังออกกำลังกาย ฉันเปลี่ยนเสื้อผ้าทันที", "lang aawk-gam-lang-gaai, chan bplian seua-phaa than-thii", "运动后，我马上换衣服。", "care"],
  ["ซักผ้าขนหนู", "sak-phaa-khon-nuu", "sak phaa khon-nuu", "洗毛巾", "短语", "身体护理", "เราซักผ้าขนหนูทุกสองวัน", "rao sak phaa khon-nuu thuk saawng wan", "我们每两天洗一次毛巾。", "care"],
  ["ดูแลตัวเอง", "duu-laae-dtua-eeng", "duu-laae dtua-eeng", "照顾自己", "短语", "身体护理", "ช่วงสอบต้องดูแลตัวเองและพักให้พอ", "chuuang saawp dtawng duu-laae dtua-eeng lae phak hai phaaw", "考试期间要照顾自己并休息够。", "care"],
  ["กินอาหารอ่อน", "gin-aa-haan-aawn", "gin aa-haan aawn", "吃清淡软食", "短语", "身体护理", "เวลาปวดท้อง ควรกินอาหารอ่อน", "wee-laa bpuat thaawng, khuuan gin aa-haan aawn", "肚子痛时，应该吃清淡软食。", "care"],
  ["ดื่มน้ำอุ่นบ่อย ๆ", "deum-naam-un-baawy-baawy", "deum naam un baawy baawy", "常喝温水", "短语", "身体护理", "ถ้าเจ็บคอ ให้ดื่มน้ำอุ่นบ่อย ๆ", "thaa jep khaaw, hai deum naam un baawy baawy", "如果喉咙痛，要常喝温水。", "care"],
  ["กินข้าวไม่ลง", "gin-khaao-mai-long", "gin khaao mai long", "吃不下饭", "短语", "个人状态", "เมื่อเครียดมาก ฉันกินข้าวไม่ลง", "muea khriiat maak, chan gin khaao mai long", "压力很大时，我吃不下饭。", "state"],
  ["อยากนอนเฉย ๆ", "yaak-naawn-chooei-chooei", "yaak naawn chooei chooei", "只想躺着", "短语", "疲惫压力", "วันนี้ฉันเหนื่อยมากและอยากนอนเฉย ๆ", "wan-nii chan neuuai maak lae yaak naawn chooei chooei", "今天我很累，只想躺着。", "tired"],
  ["ไม่มีแรง", "mai-mii-raaeng", "mai mii raaeng", "没有力气", "形容词", "疲惫压力", "หลังเป็นไข้ เขาไม่มีแรงเดินไกล", "lang bpen khai, khao mai mii raaeng doen glai", "发烧后，他没有力气走远路。", "tired"],
  ["แรงดีขึ้น", "raaeng-dii-kheun", "raaeng dii kheun", "力气恢复一些", "短语", "个人状态", "หลังพักสองวัน แรงดีขึ้นแล้ว", "lang phak saawng wan, raaeng dii kheun laaeo", "休息两天后，力气恢复一些了。", "state"],
  ["หน้าแดง", "naa-daaeng", "naa daaeng", "脸红", "形容词", "个人状态", "เขาหน้าแดงเมื่อพูดต่อหน้าหลายคน", "khao naa daaeng muea phuut dtaaw naa laai khon", "他在很多人面前说话时脸红了。", "body"],
  ["หน้าซีด", "naa-siit", "naa siit", "脸色苍白", "形容词", "个人状态", "เธอหน้าซีดเพราะยังไม่ได้กินข้าว", "thoe naa siit phraw yang mai dai gin khaao", "她还没吃饭，所以脸色苍白。", "body"],
  ["ตาแห้ง", "dtaa-haaeng", "dtaa haaeng", "眼睛干", "形容词", "个人状态", "ฉันใช้คอมพิวเตอร์นานจนตาแห้ง", "chan chai khaawm-phiu-dtooe naan jon dtaa haaeng", "我用电脑太久，眼睛干。", "body"],
  ["ตาแดงจากนอนดึก", "dtaa-daaeng-jaak-naawn-deuk", "dtaa daaeng jaak naawn deuk", "因熬夜眼睛红", "短语", "个人状态", "เขาตาแดงจากนอนดึกหลายคืน", "khao dtaa daaeng jaak naawn deuk laai kheun", "他连续几晚睡得晚，眼睛红。", "body"],
  ["หูอื้อ", "huu-euu", "huu euu", "耳朵闷；耳鸣感", "形容词", "个人状态", "หลังขึ้นเครื่องบิน ฉันหูอื้อนิดหน่อย", "lang kheun khreuuang-bin, chan huu euu nit naawy", "坐飞机后，我耳朵有点闷。", "body"],
  ["มือชา", "mue-chaa", "mue chaa", "手麻", "形容词", "个人状态", "ฉันนั่งทับมือนานจนมือชา", "chan nang thap mue naan jon mue chaa", "我压着手坐太久，手麻了。", "body"],
  ["เท้าเจ็บ", "thaao-jep", "thaao jep", "脚痛", "形容词", "个人状态", "เดินทั้งวันแล้วเท้าเจ็บมาก", "doen thang wan laaeo thaao jep maak", "走了一整天，脚很痛。", "body"],
  ["ผิวแห้ง", "phiu-haaeng", "phiu haaeng", "皮肤干", "形容词", "个人状态", "หน้าหนาวผิวแห้งง่าย", "naa-naao phiu haaeng ngaai", "凉季皮肤容易干。", "body"],
  ["ผิวแพ้ง่าย", "phiu-phaae-ngaai", "phiu phaae ngaai", "皮肤容易敏感", "形容词", "个人状态", "คนผิวแพ้ง่ายควรลองครีมก่อน", "khon phiu phaae ngaai khuuan laawng khriim gaawn", "皮肤容易敏感的人应先试用面霜。", "body"],
  ["ยิ้มออก", "yim-aawk", "yim aawk", "笑得出来；心情缓过来", "短语", "情绪", "หลังได้ข่าวดี เธอก็ยิ้มออก", "lang dai khaao dii, thoe gaw yim aawk", "听到好消息后，她终于笑得出来了。", "mood"],
  ["ร้องไห้นิดหน่อย", "raawng-hai-nit-naawy", "raawng-hai nit naawy", "哭了一点", "短语", "情绪", "เด็กเล็กร้องไห้นิดหน่อยเมื่อแม่ออกไป", "dek lek raawng-hai nit naawy muea maae aawk bpai", "妈妈出去时，小孩哭了一点。", "sad"],
  ["หัวเราะเบา ๆ", "hua-raw-bao-bao", "hua-raw bao bao", "轻轻笑", "短语", "情绪", "พวกเขาหัวเราะเบา ๆ ในห้องเรียน", "phuak-khao hua-raw bao bao nai haawng-riian", "他们在教室里轻轻笑。", "happy"],
  ["หายใจลึก ๆ", "haai-jai-leuk-leuk", "haai-jai leuk leuk", "深呼吸", "短语", "身体护理", "เมื่อรู้สึกเครียด ให้หายใจลึก ๆ", "muea ruu-seuk khriiat, hai haai-jai leuk leuk", "感到压力时，做深呼吸。", "care"],
  ["ออกกำลังกายเบา ๆ", "aawk-gam-lang-gaai-bao-bao", "aawk-gam-lang-gaai bao bao", "轻度运动", "短语", "身体护理", "ตอนเย็นแม่ออกกำลังกายเบา ๆ ที่สวน", "dtaawn yen maae aawk-gam-lang-gaai bao bao thii suan", "傍晚妈妈在公园做轻度运动。", "care"],
  ["เดินช้า ๆ ให้สบาย", "doen-chaa-chaa-hai-sa-baai", "doen chaa chaa hai sa-baai", "慢慢走让身体舒服", "短语", "舒服状态", "ถ้าเหนื่อย เราเดินช้า ๆ ให้สบายก็ได้", "thaa neuuai, rao doen chaa chaa hai sa-baai gaw dai", "如果累了，我们可以慢慢走，舒服一点。", "comfort"],
  ["นั่งพักตรงนี้", "nang-phak-dtrong-nii", "nang phak dtrong nii", "在这里坐下休息", "短语", "疲惫压力", "คุณดูเหนื่อย มานั่งพักตรงนี้ก่อน", "khun duu neuuai, maa nang phak dtrong nii gaawn", "你看起来累了，先来这里坐下休息。", "rest"],
  ["นอนหลับสบาย", "naawn-lap-sa-baai", "naawn lap sa-baai", "睡得舒服", "短语", "舒服状态", "เมื่อคืนอากาศเย็น ฉันนอนหลับสบาย", "muea-kheun aa-gaat yen, chan naawn lap sa-baai", "昨晚天气凉，我睡得很舒服。", "comfort"],
  ["รู้สึกสดชื่น", "ruu-seuk-sot-cheun", "ruu-seuk sot-cheun", "感到清爽", "短语", "舒服状态", "หลังอาบน้ำตอนเช้า ฉันรู้สึกสดชื่น", "lang aap naam dtaawn chaao, chan ruu-seuk sot-cheun", "早上洗澡后，我感到清爽。", "comfort"],
  ["รู้สึกหนักหัว", "ruu-seuk-nak-hua", "ruu-seuk nak hua", "觉得头沉", "短语", "个人状态", "วันนี้ฉันรู้สึกหนักหัวและอยากพัก", "wan-nii chan ruu-seuk nak hua lae yaak phak", "今天我觉得头沉，想休息。", "body"],
  ["รู้สึกตัวเบา", "ruu-seuk-dtua-bao", "ruu-seuk dtua bao", "觉得身体轻松", "短语", "舒服状态", "หลังออกกำลังกายเบา ๆ ฉันรู้สึกตัวเบา", "lang aawk-gam-lang-gaai bao bao, chan ruu-seuk dtua bao", "轻度运动后，我觉得身体轻松。", "comfort"],
] as const satisfies readonly Row[];

const toCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const [thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = row;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "feelings-body-care", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段优先掌握“รู้สึก/ปวด/พัก/ดูแล”这类能直接描述个人状态的常用搭配。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于描述情绪、身体感受、疲惫压力、日常护理和简单健康状态。"],
    tags,
    sourceRefs: FEELINGS_BODY_CARE_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_FEELINGS_BODY_CARE_01 = rows.map(toCandidate);
