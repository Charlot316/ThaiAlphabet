export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "拍照" | "视频" | "朋友圈社媒" | "点赞评论" | "发帖" | "隐私" | "分享链接" | "线上聊天";
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

type MediaItem = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };
type CommentItem = { thai: string; roman: string; chinese: string; id: string };

const SOCIAL_MEDIA_PHOTOS_REFS = ["thai-frequency", "thai-a2-social-media-photos-candidate"];

const mediaItems: readonly MediaItem[] = [
  { thai: "รูปอาหารเช้า", roman: "ruup aa-haan chaao", chinese: "早餐照片", id: "ruup-aa-haan-chaao", theme: "拍照" },
  { thai: "รูปกาแฟแก้วแรก", roman: "ruup gaa-faae gaaeo raaek", chinese: "第一杯咖啡照片", id: "ruup-gaa-faae-gaaeo-raaek", theme: "拍照" },
  { thai: "รูปวิวทะเล", roman: "ruup wiu tha-lee", chinese: "海景照片", id: "ruup-wiu-tha-lee", theme: "拍照" },
  { thai: "รูปพระอาทิตย์ตก", roman: "ruup phra-aa-thit dtok", chinese: "日落照片", id: "ruup-phra-aa-thit-dtok", theme: "拍照" },
  { thai: "รูปกับเพื่อน", roman: "ruup gap phuean", chinese: "和朋友的合照", id: "ruup-gap-phuean", theme: "拍照" },
  { thai: "รูปครอบครัว", roman: "ruup khraawp-khrua", chinese: "家庭照片", id: "ruup-khraawp-khrua", theme: "拍照" },
  { thai: "รูปสัตว์เลี้ยง", roman: "ruup sat liiang", chinese: "宠物照片", id: "ruup-sat-liiang", theme: "拍照" },
  { thai: "รูปดอกไม้ในสวน", roman: "ruup daawk-maai nai suan", chinese: "花园花朵照片", id: "ruup-daawk-maai-nai-suan", theme: "拍照" },
  { thai: "รูปห้องใหม่", roman: "ruup haawng mai", chinese: "新房间照片", id: "ruup-haawng-mai", theme: "拍照" },
  { thai: "รูปชุดวันนี้", roman: "ruup chut wan-nii", chinese: "今日穿搭照片", id: "ruup-chut-wan-nii", theme: "拍照" },
  { thai: "รูปของที่ซื้อมา", roman: "ruup khaawng thii seu maa", chinese: "买来的东西照片", id: "ruup-khaawng-thii-seu-maa", theme: "拍照" },
  { thai: "รูปตั๋วเดินทาง", roman: "ruup dtua doen-thaang", chinese: "旅行票照片", id: "ruup-dtua-doen-thaang", theme: "拍照" },
  { thai: "วิดีโอสั้นที่ตลาด", roman: "wi-dii-oo san thii dta-laat", chinese: "市场短视频", id: "wi-dii-oo-san-thii-dta-laat", theme: "视频" },
  { thai: "วิดีโอทำอาหาร", roman: "wi-dii-oo tham aa-haan", chinese: "做饭视频", id: "wi-dii-oo-tham-aa-haan", theme: "视频" },
  { thai: "วิดีโอเดินเล่น", roman: "wi-dii-oo doen len", chinese: "散步视频", id: "wi-dii-oo-doen-len", theme: "视频" },
  { thai: "วิดีโอแมวเล่น", roman: "wi-dii-oo maaeo len", chinese: "猫玩耍视频", id: "wi-dii-oo-maaeo-len", theme: "视频" },
  { thai: "วิดีโอฝนตก", roman: "wi-dii-oo fon dtok", chinese: "下雨视频", id: "wi-dii-oo-fon-dtok", theme: "视频" },
  { thai: "วิดีโอร้องเพลง", roman: "wi-dii-oo raawng phleeng", chinese: "唱歌视频", id: "wi-dii-oo-raawng-phleeng", theme: "视频" },
  { thai: "วิดีโอสอนคำไทย", roman: "wi-dii-oo saawn kham thai", chinese: "教泰语词的视频", id: "wi-dii-oo-saawn-kham-thai", theme: "视频" },
  { thai: "วิดีโอเปิดกล่อง", roman: "wi-dii-oo bpoet glaawng", chinese: "开箱视频", id: "wi-dii-oo-bpoet-glaawng", theme: "视频" },
  { thai: "ลิงก์ร้านอาหาร", roman: "ling raan aa-haan", chinese: "餐厅链接", id: "ling-raan-aa-haan", theme: "分享链接" },
  { thai: "ลิงก์แผนที่", roman: "ling phaaen-thii", chinese: "地图链接", id: "ling-phaaen-thii", theme: "分享链接" },
  { thai: "ลิงก์ข่าวสั้น", roman: "ling khaao san", chinese: "短新闻链接", id: "ling-khaao-san", theme: "分享链接" },
  { thai: "ลิงก์ห้องพัก", roman: "ling haawng-phak", chinese: "房间链接", id: "ling-haawng-phak", theme: "分享链接" },
];

const comments: readonly CommentItem[] = [
  { thai: "รูปนี้สวยมาก", roman: "ruup nii suai maak", chinese: "这张照片很好看", id: "ruup-nii-suai-maak" },
  { thai: "อาหารน่ากินจัง", roman: "aa-haan naa gin jang", chinese: "食物看起来真好吃", id: "aa-haan-naa-gin-jang" },
  { thai: "วิวดีมาก", roman: "wiu dii maak", chinese: "景色很好", id: "wiu-dii-maak" },
  { thai: "คิดถึงนะ", roman: "khit-theung na", chinese: "想你哦", id: "khit-theung-na" },
  { thai: "เดินทางปลอดภัย", roman: "doen-thaang bplaawt-phai", chinese: "一路平安", id: "doen-thaang-bplaawt-phai" },
  { thai: "ขอให้สนุกนะ", roman: "khaaw hai sa-nuk na", chinese: "祝玩得开心", id: "khaaw-hai-sa-nuk-na" },
  { thai: "ร้านนี้อยู่ที่ไหน", roman: "raan nii yuu thii nai", chinese: "这家店在哪里", id: "raan-nii-yuu-thii-nai" },
  { thai: "ถ่ายที่ไหน", roman: "thaai thii nai", chinese: "在哪里拍的", id: "thaai-thii-nai" },
  { thai: "น่ารักมาก", roman: "naa-rak maak", chinese: "非常可爱", id: "naa-rak-maak" },
  { thai: "ขอบคุณที่แชร์", roman: "khaawp-khun thii chaae", chinese: "谢谢分享", id: "khaawp-khun-thii-chaae" },
  { thai: "เดี๋ยวไปตาม", roman: "diao bpai dtaam", chinese: "等下我去关注", id: "diao-bpai-dtaam" },
  { thai: "ขอพิกัดหน่อย", roman: "khaaw phi-gat naawy", chinese: "求地点定位", id: "khaaw-phi-gat-naawy" },
  { thai: "รูปชัดมาก", roman: "ruup chat maak", chinese: "照片很清楚", id: "ruup-chat-maak" },
  { thai: "วิดีโอนี้ตลกดี", roman: "wi-dii-oo nii dta-lok dii", chinese: "这个视频挺好笑", id: "wi-dii-oo-nii-dta-lok-dii" },
  { thai: "แสงสวยมาก", roman: "saaeng suai maak", chinese: "光线很漂亮", id: "saaeng-suai-maak" },
  { thai: "อยากไปด้วย", roman: "yaak bpai duai", chinese: "也想一起去", id: "yaak-bpai-duai" },
  { thai: "ส่งรูปมาอีกนะ", roman: "song ruup maa iik na", chinese: "再发照片来哦", id: "song-ruup-maa-iik-na" },
  { thai: "ขอชื่อเพลงหน่อย", roman: "khaaw cheu phleeng naawy", chinese: "求歌名", id: "khaaw-cheu-phleeng-naawy" },
  { thai: "โพสต์นี้มีประโยชน์", roman: "phoot nii mii bpra-yoot", chinese: "这个帖子有用", id: "phoot-nii-mii-bpra-yoot" },
  { thai: "อ่านแล้วเข้าใจง่าย", roman: "aan laaeo khao-jai ngaai", chinese: "读了以后容易懂", id: "aan-laaeo-khao-jai-ngaai" },
  { thai: "อย่าลืมแท็กฉัน", roman: "yaa leum thaek chan", chinese: "别忘了标记我", id: "yaa-leum-thaek-chan" },
  { thai: "รูปนี้เก็บไว้เลย", roman: "ruup nii gep wai loei", chinese: "这张照片留着吧", id: "ruup-nii-gep-wai-loei" },
  { thai: "หัวเราะเลย", roman: "hua-raw loei", chinese: "直接笑出来", id: "hua-raw-loei" },
  { thai: "รอดูตอนต่อไป", roman: "raaw duu dtaawn dtaaw bpai", chinese: "等着看下一集/下一条", id: "raaw-duu-dtaawn-dtaaw-bpai" },
];

const directRows: readonly Definition[] = [
  { thai: "ตั้งโพสต์เป็นส่วนตัว", id: "dtang-phoot-bpen-suan-dtua", roman: "dtang phoot bpen suan dtua", chinese: "把帖子设为私密", partOfSpeech: "短语", theme: "隐私", exampleThai: "รูปครอบครัวบางรูป ฉันตั้งโพสต์เป็นส่วนตัว", exampleRoman: "ruup khraawp-khrua baang ruup, chan dtang phoot bpen suan dtua", exampleChinese: "有些家庭照片，我把帖子设为私密。", tag: "隐私" },
  { thai: "ซ่อนรูปจากคนอื่น", id: "saawn-ruup-jaak-khon-euen", roman: "saawn ruup jaak khon euen", chinese: "对别人隐藏照片", partOfSpeech: "短语", theme: "隐私", exampleThai: "ถ้าไม่อยากให้ทุกคนเห็น ให้ซ่อนรูปจากคนอื่น", exampleRoman: "thaa mai yaak hai thuk khon hen, hai saawn ruup jaak khon euen", exampleChinese: "如果不想让所有人看到，就对别人隐藏照片。", tag: "隐私" },
  { thai: "ไม่โพสต์ข้อมูลส่วนตัว", id: "mai-phoot-khaaw-muun-suan-dtua", roman: "mai phoot khaaw-muun suan-dtua", chinese: "不发布个人信息", partOfSpeech: "短语", theme: "隐私", exampleThai: "ครูเตือนว่าไม่โพสต์ข้อมูลส่วนตัวในที่สาธารณะ", exampleRoman: "khruu dteuuan waa mai phoot khaaw-muun suan-dtua nai thii saa-thaa-ra-na", exampleChinese: "老师提醒不要在公开地方发布个人信息。", tag: "隐私" },
  { thai: "ลบโพสต์เก่า", id: "lop-phoot-gao", roman: "lop phoot gao", chinese: "删除旧帖子", partOfSpeech: "短语", theme: "发帖", exampleThai: "ฉันลบโพสต์เก่าที่ไม่อยากเก็บไว้", exampleRoman: "chan lop phoot gao thii mai yaak gep wai", exampleChinese: "我删除了不想保留的旧帖子。", tag: "发帖" },
  { thai: "แก้คำผิดในโพสต์", id: "gaae-kham-phit-nai-phoot", roman: "gaae kham phit nai phoot", chinese: "修改帖子里的错字", partOfSpeech: "短语", theme: "发帖", exampleThai: "หลังลงโพสต์ ฉันแก้คำผิดในโพสต์ทันที", exampleRoman: "lang long phoot, chan gaae kham phit nai phoot than-thii", exampleChinese: "发帖后，我马上修改帖子里的错字。", tag: "发帖" },
  { thai: "แท็กเพื่อนในรูป", id: "thaek-phuean-nai-ruup", roman: "thaek phuean nai ruup", chinese: "在照片里标记朋友", partOfSpeech: "短语", theme: "朋友圈社媒", exampleThai: "ก่อนลงรูป ฉันแท็กเพื่อนในรูปทุกคน", exampleRoman: "gaawn long ruup, chan thaek phuean nai ruup thuk khon", exampleChinese: "发照片前，我在照片里标记所有朋友。", tag: "社媒" },
  { thai: "เพิ่มคำบรรยายใต้รูป", id: "phoem-kham-ban-yaai-dtai-ruup", roman: "phoem kham ban-yaai dtai ruup", chinese: "给照片加说明文字", partOfSpeech: "短语", theme: "发帖", exampleThai: "เธอเพิ่มคำบรรยายใต้รูปสั้น ๆ", exampleRoman: "thoe phoem kham ban-yaai dtai ruup san san", exampleChinese: "她给照片加了短短的说明文字。", tag: "发帖" },
  { thai: "เลือกภาพหน้าปกวิดีโอ", id: "leuuak-phaap-naa-bpok-wi-dii-oo", roman: "leuuak phaap naa-bpok wi-dii-oo", chinese: "选择视频封面图", partOfSpeech: "短语", theme: "视频", exampleThai: "ก่อนลงวิดีโอ เขาเลือกภาพหน้าปกวิดีโอ", exampleRoman: "gaawn long wi-dii-oo, khao leuuak phaap naa-bpok wi-dii-oo", exampleChinese: "发布视频前，他选择视频封面图。", tag: "视频" },
  { thai: "ส่งข้อความเสียงสั้น ๆ", id: "song-khaaw-khwaam-siiang-san-san", roman: "song khaaw-khwaam siiang san san", chinese: "发送一条短语音", partOfSpeech: "短语", theme: "线上聊天", exampleThai: "ถ้าพิมพ์ไม่ทัน ฉันส่งข้อความเสียงสั้น ๆ", exampleRoman: "thaa phim mai than, chan song khaaw-khwaam siiang san san", exampleChinese: "如果打字来不及，我发送一条短语音。", tag: "聊天" },
  { thai: "ตอบแชตด้วยสติกเกอร์", id: "dtaawp-chaet-duai-sa-dti-gooe", roman: "dtaawp chaet duai sa-dti-gooe", chinese: "用贴纸回复聊天", partOfSpeech: "短语", theme: "线上聊天", exampleThai: "เพื่อนส่งข่าวดีมา ฉันตอบแชตด้วยสติกเกอร์", exampleRoman: "phuean song khaao dii maa, chan dtaawp chaet duai sa-dti-gooe", exampleChinese: "朋友发来好消息，我用贴纸回复聊天。", tag: "聊天" },
  { thai: "ส่งรูปในกลุ่มครอบครัว", id: "song-ruup-nai-glum-khraawp-khrua", roman: "song ruup nai glum khraawp-khrua", chinese: "在家庭群里发照片", partOfSpeech: "短语", theme: "线上聊天", exampleThai: "แม่ส่งรูปในกลุ่มครอบครัวหลังไปเที่ยว", exampleRoman: "maae song ruup nai glum khraawp-khrua lang bpai thiao", exampleChinese: "妈妈旅行后在家庭群里发照片。", tag: "聊天" },
  { thai: "ปิดเสียงกลุ่มชั่วคราว", id: "bpit-siiang-glum-chua-khraao", roman: "bpit siiang glum chua-khraao", chinese: "暂时关闭群消息声音", partOfSpeech: "短语", theme: "线上聊天", exampleThai: "ตอนทำงาน ฉันปิดเสียงกลุ่มชั่วคราว", exampleRoman: "dtaawn tham-ngaan, chan bpit siiang glum chua-khraao", exampleChinese: "工作时，我暂时关闭群消息声音。", tag: "聊天" },
  { thai: "ส่งลิงก์ให้เพื่อนดู", id: "song-ling-hai-phuean-duu", roman: "song ling hai phuean duu", chinese: "把链接发给朋友看", partOfSpeech: "短语", theme: "分享链接", exampleThai: "ฉันส่งลิงก์ให้เพื่อนดูในแชต", exampleRoman: "chan song ling hai phuean duu nai chaet", exampleChinese: "我在聊天里把链接发给朋友看。", tag: "链接" },
  { thai: "คัดลอกลิงก์โพสต์", id: "khat-laawk-ling-phoot", roman: "khat-laawk ling phoot", chinese: "复制帖子链接", partOfSpeech: "短语", theme: "分享链接", exampleThai: "ถ้าจะแชร์ต่อ ให้คัดลอกลิงก์โพสต์ก่อน", exampleRoman: "thaa ja chaae dtaaw, hai khat-laawk ling phoot gaawn", exampleChinese: "如果要继续分享，先复制帖子链接。", tag: "链接" },
  { thai: "เปิดลิงก์ในแชต", id: "bpoet-ling-nai-chaet", roman: "bpoet ling nai chaet", chinese: "打开聊天里的链接", partOfSpeech: "短语", theme: "分享链接", exampleThai: "ครูส่งงานมา ฉันเปิดลิงก์ในแชต", exampleRoman: "khruu song ngaan maa, chan bpoet ling nai chaet", exampleChinese: "老师发来作业，我打开聊天里的链接。", tag: "链接" },
  { thai: "กดไลก์ให้เพื่อน", id: "got-lai-hai-phuean", roman: "got lai hai phuean", chinese: "给朋友点赞", partOfSpeech: "短语", theme: "点赞评论", exampleThai: "เพื่อนลงรูปใหม่ ฉันกดไลก์ให้เพื่อน", exampleRoman: "phuean long ruup mai, chan got lai hai phuean", exampleChinese: "朋友发了新照片，我给朋友点赞。", tag: "点赞" },
  { thai: "ยกเลิกไลก์โดยไม่ตั้งใจ", id: "yok-looek-lai-dooi-mai-dtang-jai", roman: "yok looek lai dooi mai dtang-jai", chinese: "不小心取消点赞", partOfSpeech: "短语", theme: "点赞评论", exampleThai: "ฉันยกเลิกไลก์โดยไม่ตั้งใจ แล้วกดใหม่", exampleRoman: "chan yok looek lai dooi mai dtang-jai, laaeo got mai", exampleChinese: "我不小心取消点赞，然后又重新点了。", tag: "点赞" },
  { thai: "ตอบคอมเมนต์ทีหลัง", id: "dtaawp-khaawm-men-thii-lang", roman: "dtaawp khaawm-men thii lang", chinese: "稍后回复评论", partOfSpeech: "短语", theme: "点赞评论", exampleThai: "ตอนนี้ไม่ว่าง ฉันจะตอบคอมเมนต์ทีหลัง", exampleRoman: "dtaawn-nii mai waang, chan ja dtaawp khaawm-men thii lang", exampleChinese: "现在没空，我会稍后回复评论。", tag: "评论" },
  { thai: "ลบคอมเมนต์ไม่สุภาพ", id: "lop-khaawm-men-mai-su-phaap", roman: "lop khaawm-men mai su-phaap", chinese: "删除不礼貌的评论", partOfSpeech: "短语", theme: "点赞评论", exampleThai: "เจ้าของโพสต์ลบคอมเมนต์ไม่สุภาพออก", exampleRoman: "jao-khaawng phoot lop khaawm-men mai su-phaap aawk", exampleChinese: "发帖人删除了不礼貌的评论。", tag: "评论" },
  { thai: "ขออนุญาตลงรูปเพื่อน", id: "khaaw-a-nu-yaat-long-ruup-phuean", roman: "khaaw a-nu-yaat long ruup phuean", chinese: "请求允许发布朋友照片", partOfSpeech: "短语", theme: "隐私", exampleThai: "ก่อนลงรูปกลุ่ม ฉันขออนุญาตลงรูปเพื่อน", exampleRoman: "gaawn long ruup glum, chan khaaw a-nu-yaat long ruup phuean", exampleChinese: "发合照前，我请求允许发布朋友照片。", tag: "隐私" },
  { thai: "ไม่แชร์รูปคนอื่น", id: "mai-chaae-ruup-khon-euen", roman: "mai chaae ruup khon euen", chinese: "不分享别人的照片", partOfSpeech: "短语", theme: "隐私", exampleThai: "ถ้าเจ้าของรูปไม่อนุญาต เราไม่แชร์รูปคนอื่น", exampleRoman: "thaa jao-khaawng ruup mai a-nu-yaat, rao mai chaae ruup khon euen", exampleChinese: "如果照片主人不允许，我们不分享别人的照片。", tag: "隐私" },
  { thai: "บันทึกรูปไว้ในเครื่อง", id: "ban-theuk-ruup-wai-nai-khreuuang", roman: "ban-theuk ruup wai nai khreuuang", chinese: "把照片保存到设备里", partOfSpeech: "短语", theme: "拍照", exampleThai: "รูปนี้สำคัญ ฉันบันทึกรูปไว้ในเครื่อง", exampleRoman: "ruup nii sam-khan, chan ban-theuk ruup wai nai khreuuang", exampleChinese: "这张照片很重要，我把照片保存到设备里。", tag: "拍照" },
  { thai: "เลือกเฉพาะรูปที่ชัด", id: "leuuak-cha-phaw-ruup-thii-chat", roman: "leuuak cha-phaw ruup thii chat", chinese: "只选择清楚的照片", partOfSpeech: "短语", theme: "拍照", exampleThai: "ก่อนโพสต์ ฉันเลือกเฉพาะรูปที่ชัด", exampleRoman: "gaawn phoot, chan leuuak cha-phaw ruup thii chat", exampleChinese: "发帖前，我只选择清楚的照片。", tag: "拍照" },
  { thai: "อัปโหลดวิดีโอช้ามาก", id: "ap-loot-wi-dii-oo-chaa-maak", roman: "ap-loot wi-dii-oo chaa maak", chinese: "上传视频很慢", partOfSpeech: "短语", theme: "视频", exampleThai: "วันนี้เน็ตไม่ดี อัปโหลดวิดีโอช้ามาก", exampleRoman: "wan-nii net mai dii, ap-loot wi-dii-oo chaa maak", exampleChinese: "今天网络不好，上传视频很慢。", tag: "视频" },
  { thai: "ตัดวิดีโอให้สั้นลง", id: "dtat-wi-dii-oo-hai-san-long", roman: "dtat wi-dii-oo hai san long", chinese: "把视频剪短", partOfSpeech: "短语", theme: "视频", exampleThai: "ก่อนส่งให้เพื่อน ฉันตัดวิดีโอให้สั้นลง", exampleRoman: "gaawn song hai phuean, chan dtat wi-dii-oo hai san long", exampleChinese: "发给朋友前，我把视频剪短。", tag: "视频" },
  { thai: "ถามก่อนแชร์ต่อ", id: "thaam-gaawn-chaae-dtaaw", roman: "thaam gaawn chaae dtaaw", chinese: "转发前先询问", partOfSpeech: "短语", theme: "隐私", exampleThai: "ถ้าเป็นรูปส่วนตัว ควรถามก่อนแชร์ต่อ", exampleRoman: "thaa bpen ruup suan-dtua, khuuan thaam gaawn chaae dtaaw", exampleChinese: "如果是私人照片，转发前应该先询问。", tag: "隐私" },
  { thai: "นัดคุยวิดีโอกับเพื่อน", id: "nat-khui-wi-dii-oo-gap-phuean", roman: "nat khui wi-dii-oo gap phuean", chinese: "约朋友视频聊天", partOfSpeech: "短语", theme: "线上聊天", exampleThai: "คืนนี้ฉันนัดคุยวิดีโอกับเพื่อนหลังอาหารเย็น", exampleRoman: "khuen-nii chan nat khui wi-dii-oo gap phuean lang aa-haan yen", exampleChinese: "今晚我约朋友晚饭后视频聊天。", tag: "聊天" },
];

const postRows = mediaItems.map((item): Definition => ({
  thai: `โพสต์${item.thai}ในโซเชียล`,
  id: `phoot-${item.id}-nai-soo-chiian`,
  roman: `phoot ${item.roman} nai soo-chiian`,
  chinese: `在社媒发布${item.chinese}`,
  partOfSpeech: "短语",
  theme: item.theme === "分享链接" ? "分享链接" : "发帖",
  exampleThai: `หลังกลับบ้าน ฉันโพสต์${item.thai}ในโซเชียล`,
  exampleRoman: `lang glap baan, chan phoot ${item.roman} nai soo-chiian`,
  exampleChinese: `回家后，我在社媒发布${item.chinese}。`,
  tag: "发帖",
}));

const sendRows = mediaItems.slice(0, 20).map((item): Definition => ({
  thai: `ส่ง${item.thai}ให้เพื่อนสนิท`,
  id: `song-${item.id}-hai-phuean-sa-nit`,
  roman: `song ${item.roman} hai phuean sa-nit`,
  chinese: `把${item.chinese}发给好友`,
  partOfSpeech: "短语",
  theme: item.theme,
  exampleThai: `ฉันส่ง${item.thai}ให้เพื่อนสนิทดูในแชต`,
  exampleRoman: `chan song ${item.roman} hai phuean sa-nit duu nai chaet`,
  exampleChinese: `我在聊天里把${item.chinese}发给好友看。`,
  tag: "发送",
}));

const commentRows = comments.map((comment): Definition => ({
  thai: `คอมเมนต์ว่า${comment.thai}`,
  id: `khaawm-men-waa-${comment.id}`,
  roman: `khaawm-men waa ${comment.roman}`,
  chinese: `评论说“${comment.chinese}”`,
  partOfSpeech: "短语",
  theme: "点赞评论",
  exampleThai: `เพื่อนคอมเมนต์ว่า${comment.thai}ใต้โพสต์ของฉัน`,
  exampleRoman: `phuean khaawm-men waa ${comment.roman} dtai phoot khaawng chan`,
  exampleChinese: `朋友在我的帖子下面评论说“${comment.chinese}”。`,
  tag: "评论",
}));

const rows: readonly Definition[] = [
  ...postRows,
  ...sendRows,
  ...commentRows,
  ...directRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "社媒照片聊天", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段可先掌握发布、发送、评论、点赞、隐私和分享链接这些日常线上互动句块。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于拍照、视频、朋友圈/社媒、点赞评论、发帖、隐私、分享链接和线上聊天基础场景。"],
    tags,
    sourceRefs: SOCIAL_MEDIA_PHOTOS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SOCIAL_MEDIA_PHOTOS_01 = rows.map(toCandidate);
