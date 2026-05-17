export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type CoreFinalReviewTheme =
  | "出门办事"
  | "餐饮购物"
  | "家和生活"
  | "学习工作"
  | "手机沟通"
  | "健康身体"
  | "时间计划"
  | "交通路线"
  | "情绪意见"
  | "请求帮助"
  | "说明问题"
  | "收尾复盘";

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
  theme: CoreFinalReviewTheme,
];

const CORE_FINAL_REVIEW_REFS = [
  "worker-a-a2-core-final-review",
  "basic-thai-final-review",
];

const rows: Row[] = [
  ["awk-bpai-thura-klai-baan", "ออกไปธุระใกล้บ้าน", "awk bpai thu-ra glai baan", "出去在家附近办事", "动词", "出门办事"],
  ["khaak-ran-ya-thaang-klap", "แวะร้านยาทางกลับ", "wae raan yaa thaang glap", "回程顺路去药店", "动词", "出门办事"],
  ["rap-phatsadu-naa-niti", "รับพัสดุหน้านิติ", "rap phat-sa-du naa ni-ti", "在物业处取包裹", "动词", "出门办事"],
  ["song-khaawng-thii-dtuu-fak", "ส่งของที่ตู้ฝาก", "song khaawng thii dtuu faak", "在寄存柜寄东西", "动词", "出门办事"],
  ["tham-thura-thii-khet", "ทำธุระที่เขต", "tham thu-ra thii kheet", "在区办事处办事", "动词", "出门办事"],
  ["khao-khiu-samrap-borikan", "เข้าคิวสำหรับบริการ", "khao khiu sam-rap baaw-ri-gaan", "为办理服务排队", "动词", "出门办事"],
  ["ao-bat-prachachon-bpai", "เอาบัตรประชาชนไป", "ao bat bpra-chaa-chon bpai", "把身份证带去", "动词", "出门办事"],
  ["glap-maa-hlang-tham-thura", "กลับมาหลังทำธุระ", "glap maa lang tham thu-ra", "办完事后回来", "动词", "出门办事"],
  ["sang-baep-mai-sai-nam-khaeng", "สั่งแบบไม่ใส่น้ำแข็ง", "sang baaep mai sai nam khaeng", "点不加冰的", "动词", "餐饮购物"],
  ["kho-chaam-lek-iik-bai", "ขอชามเล็กอีกใบ", "khaaw chaam lek iik bai", "再要一个小碗", "句型", "餐饮购物"],
  ["prap-rot-hai-wan-noy", "ปรับรสให้หวานน้อย", "bprap rot hai waan naawy", "调整成少甜口味", "动词", "餐饮购物"],
  ["haaw-klap-baan-neung-chut", "ห่อกลับบ้านหนึ่งชุด", "haaw glap baan nueng chut", "打包一份带回家", "动词", "餐饮购物"],
  ["khaawng-nii-mii-pra-kan-mai", "ของนี้มีประกันไหม", "khaawng nii mii bpra-gan mai", "这个东西有保修吗", "句型", "餐饮购物"],
  ["lot-dai-iik-nit-mai", "ลดได้อีกนิดไหม", "lot dai iik nit mai", "还能再便宜一点吗", "句型", "餐饮购物"],
  ["plian-size-pen-lek", "เปลี่ยนไซซ์เป็นเล็ก", "bpliian sai bpen lek", "把尺码换成小号", "动词", "餐饮购物"],
  ["gep-thung-phaa-wai-chai-sam", "เก็บถุงผ้าไว้ใช้ซ้ำ", "gep thung phaa wai chai sam", "留着布袋重复使用", "动词", "餐饮购物"],
  ["bpoet-phat-lom-hai-aakhaat-thaai", "เปิดพัดลมให้อากาศถ่าย", "bpoet phat-lom hai aa-gaat thaai", "开风扇让空气流通", "动词", "家和生活"],
  ["cheet-yak-kan-yung", "ฉีดยากันยุง", "chiit yaa gan yung", "喷防蚊药", "动词", "家和生活"],
  ["gep-saai-fai-hai-rian-roi", "เก็บสายไฟให้เรียบร้อย", "gep saai fai hai riiap raawy", "把电线收整齐", "动词", "家和生活"],
  ["waang-rong-thao-naa-baan", "วางรองเท้าหน้าบ้าน", "waang raawng thaao naa baan", "把鞋放在门口", "动词", "家和生活"],
  ["dtit-bpaai-chue-naa-hong", "ติดป้ายชื่อหน้าห้อง", "dtit bpaai chue naa hawng", "在房间门口贴姓名牌", "动词", "家和生活"],
  ["chao-phuen-hai-haeng", "เช็ดพื้นให้แห้ง", "chet phuen hai haaeng", "把地擦干", "动词", "家和生活"],
  ["yaai-khaawng-ok-jaak-thaang-doen", "ย้ายของออกจากทางเดิน", "yaai khaawng awk jaak thaang doen", "把东西从走道移开", "动词", "家和生活"],
  ["laang-glaawng-thii-chai-laew", "ล้างกล่องที่ใช้แล้ว", "laang glaawng thii chai laew", "清洗用过的盒子", "动词", "家和生活"],
  ["triiam-bot-rian-luang-na", "เตรียมบทเรียนล่วงหน้า", "dtriiam bot riian luang naa", "提前准备课文", "动词", "学习工作"],
  ["tham-note-samrap-phrueng-nii", "ทำโน้ตสำหรับพรุ่งนี้", "tham noot sam-rap phrung nii", "为明天做笔记", "动词", "学习工作"],
  ["song-ngaan-phaan-rabop", "ส่งงานผ่านระบบ", "song ngaan phaan ra-bop", "通过系统提交作业/工作", "动词", "学习工作"],
  ["kae-kham-phit-nai-ekgasaan", "แก้คำผิดในเอกสาร", "gaae kham phit nai ek-ga-saan", "修改文件里的错字", "动词", "学习工作"],
  ["tham-sam-jon-khao-jai", "ทำซ้ำจนเข้าใจ", "tham sam jon khao jai", "重复做到理解", "动词", "学习工作"],
  ["fuek-phuut-naa-hong", "ฝึกพูดหน้าห้อง", "fuek phuut naa hawng", "在教室前练习说", "动词", "学习工作"],
  ["banthuek-siang-wai-fang", "บันทึกเสียงไว้ฟัง", "ban-thuek siiang wai fang", "录音留着听", "动词", "学习工作"],
  ["dtruat-kham-dtaawp-duai-gan", "ตรวจคำตอบด้วยกัน", "dtruat kham dtaawp duai gan", "一起检查答案", "动词", "学习工作"],
  ["song-khwaam-sut-thaai", "ส่งข้อความสุดท้าย", "song khaaw khwaam sut-thaai", "发送最后一条消息", "动词", "手机沟通"],
  ["pin-chat-samkhan", "ปักแชตสำคัญ", "bpak chaet sam-khan", "置顶重要聊天", "动词", "手机沟通"],
  ["lop-khwaam-phit", "ลบข้อความผิด", "lop khaaw khwaam phit", "删除错误消息", "动词", "手机沟通"],
  ["bpit-siang-jaeng-dtuean", "ปิดเสียงแจ้งเตือน", "bpit siiang jaaeng dteuan", "关闭通知声音", "动词", "手机沟通"],
  ["poet-map-duu-thaang", "เปิดแผนที่ดูทาง", "bpoet phaaen thii duu thaang", "打开地图看路", "动词", "手机沟通"],
  ["song-ber-dtit-dtaaw-hai", "ส่งเบอร์ติดต่อให้", "song boe dtit dtaaw hai", "把联系电话发给……", "动词", "手机沟通"],
  ["kho-code-yuenyan", "ขอโค้ดยืนยัน", "khaaw khoot yuen-yan", "请求验证码", "句型", "手机沟通"],
  ["dtang-rup-profail-mai", "ตั้งรูปโปรไฟล์ใหม่", "dtang ruup bproo-fai mai", "设置新的头像", "动词", "手机沟通"],
  ["jep-khaw-laa-kha", "เจ็บคอล่ะค่ะ", "jep khaaw la kha", "喉咙疼了（女用礼貌）", "句型", "健康身体"],
  ["khrap-nam-muuk-bang-khrang", "คัดน้ำมูกบางครั้ง", "khat naam muuk baang khrang", "有时鼻塞/流鼻涕不通", "句型", "健康身体"],
  ["nawn-mai-phaw-sam-wan", "นอนไม่พอสามวัน", "naawn mai phaaw saam wan", "三天没睡够", "句型", "健康身体"],
  ["gin-yaa-lang-aahaan", "กินยาหลังอาหาร", "gin yaa lang aa-haan", "饭后吃药", "动词", "健康身体"],
  ["dtruad-khai-duai-theemo", "ตรวจไข้ด้วยเทอร์โม", "dtruat khai duai thoe-moo", "用体温计量发烧", "动词", "健康身体"],
  ["phak-sai-taa-ha-naathii-lang-aan", "พักสายตาห้านาทีหลังอ่าน", "phak saai dtaa haa naa-thii lang aan", "阅读后让眼睛休息五分钟", "动词", "健康身体"],
  ["duem-nam-un-bang", "ดื่มน้ำอุ่นบ้าง", "duem naam un baang", "喝点温水", "动词", "健康身体"],
  ["tham-ngaan-mai-wai-wan-nii", "ทำงานไม่ไหววันนี้", "tham ngaan mai wai wan nii", "今天撑不住工作", "句型", "健康身体"],
  ["triiam-tua-gawn-wan-nat", "เตรียมตัวก่อนวันนัด", "dtriiam dtua gaawn wan nat", "预约日前先准备", "动词", "时间计划"],
  ["thuan-tarang-khon-diao", "ทวนตารางคนเดียว", "thuan dtaa-raang khon diao", "自己复核日程表", "动词", "时间计划"],
  ["jam-wela-phit-bang-khrang", "จำเวลาผิดบางครั้ง", "jam we-laa phit baang khrang", "有时记错时间", "句型", "时间计划"],
  ["thuk-rueng-yuu-nai-planner", "ทุกเรื่องอยู่ในแพลนเนอร์", "thuk rueang yuu nai phlaaen-noe", "所有事都在计划本里", "句型", "时间计划"],
  ["luean-gamnot-song-ngaan", "เลื่อนกำหนดส่งงาน", "luean gam-not song ngaan", "推迟提交期限", "动词", "时间计划"],
  ["wang-tarang-hai-loong", "วางตารางให้โล่ง", "waang dtaa-raang hai loong", "把日程安排得宽松", "动词", "时间计划"],
  ["mii-welaa-waang-khrung-chuamong", "มีเวลาว่างครึ่งชั่วโมง", "mii we-laa waang khrueng chua-moong", "有半小时空闲", "句型", "时间计划"],
  ["dtriiam-khaawng-khuen-nii", "เตรียมของคืนนี้", "dtriiam khaawng khuen nii", "今晚准备东西", "动词", "时间计划"],
  ["long-thaang-ok-thii-saam", "ลงทางออกที่สาม", "long thaang awk thii saam", "从三号出口下/出", "动词", "交通路线"],
  ["doen-lat-phaan-talaat", "เดินลัดผ่านตลาด", "doen lat phaan dta-laat", "抄近路穿过市场", "动词", "交通路线"],
  ["rot-song-thaao-jawt-naa-soi", "รถสองแถวจอดหน้าซอย", "rot saawng thaaeo jaawt naa saawy", "双条车停在巷口", "句型", "交通路线"],
  ["riiak-win-naa-baan", "เรียกวินหน้าบ้าน", "riiak win naa baan", "在家门口叫摩的", "动词", "交通路线"],
  ["bpai-thaang-waan-rot-dtit-noi", "ไปทางวัดรถติดน้อย", "bpai thaang wat rot dtit naawy", "走寺庙那边比较不堵", "句型", "交通路线"],
  ["kham-thanon-thii-saphan-loi", "ข้ามถนนที่สะพานลอย", "khaam tha-non thii sa-phaan laawy", "在人行天桥过马路", "动词", "交通路线"],
  ["raw-rot-thii-rim-thaang", "รอรถที่ริมทาง", "raaw rot thii rim thaang", "在路边等车", "动词", "交通路线"],
  ["plian-sai-rot-faifaa", "เปลี่ยนสายรถไฟฟ้า", "bpliian saai rot fai faa", "换乘轨道交通线路", "动词", "交通路线"],
  ["hen-duai-baep-nan", "เห็นด้วยแบบนั้น", "hen duai baaep nan", "同意那种看法", "句型", "情绪意见"],
  ["mai-khoi-chop-baep-nii", "ไม่ค่อยชอบแบบนี้", "mai khaawy chaawp baaep nii", "不太喜欢这种", "句型", "情绪意见"],
  ["ruusuek-waa-mai-yaak", "รู้สึกว่าไม่ยาก", "ruu-suek waa mai yaak", "觉得不难", "句型", "情绪意见"],
  ["kho-lueak-thii-sabai-jai", "ขอเลือกที่สบายใจ", "khaaw lueak thii sa-baai jai", "想选让自己安心的", "句型", "情绪意见"],
  ["yang-lang-le-nit-noy", "ยังลังเลนิดหน่อย", "yang lang-lee nit naawy", "还有点犹豫", "句型", "情绪意见"],
  ["naasonjai-dtae-phaeng", "น่าสนใจแต่แพง", "naa son jai dtaae phaaeng", "有意思但贵", "句型", "情绪意见"],
  ["mai-dai-khat-khae-song-sai", "ไม่ได้ขัดแค่สงสัย", "mai dai khat khaae song sai", "不是反对，只是疑惑", "句型", "情绪意见"],
  ["thaa-pen-chan-ja-lueak-an-nii", "ถ้าเป็นฉันจะเลือกอันนี้", "thaa bpen chan ja lueak an nii", "如果是我会选这个", "句型", "情绪意见"],
  ["chuai-yok-khaawng-nii-noy", "ช่วยยกของนี้หน่อย", "chuai yok khaawng nii naawy", "请帮忙搬一下这个", "句型", "请求帮助"],
  ["chuai-duu-luk-kwaat-hai-noy", "ช่วยดูลูกกวาดให้หน่อย", "chuai duu luuk gwaat hai naawy", "请帮忙看一下糖果/小东西", "句型", "请求帮助"],
  ["kho-yuem-saai-charge-sak-khru", "ขอยืมสายชาร์จสักครู่", "khaaw yuem saai chaat sak khruu", "借用充电线一会儿", "句型", "请求帮助"],
  ["kho-chai-wifi-sak-khru", "ขอใช้ไวไฟสักครู่", "khaaw chai wai-fai sak khruu", "想临时用一下 Wi-Fi", "句型", "请求帮助"],
  ["chuai-bok-thaang-klap", "ช่วยบอกทางกลับ", "chuai baawk thaang glap", "请告诉回去的路", "句型", "请求帮助"],
  ["kho-hai-chuai-thuue-khaawng", "ขอให้ช่วยถือของ", "khaaw hai chuai thue khaawng", "请帮忙拿东西", "句型", "请求帮助"],
  ["chuai-fang-siang-nii", "ช่วยฟังเสียงนี้", "chuai fang siiang nii", "请帮忙听这个声音", "句型", "请求帮助"],
  ["kho-hai-chuai-phim-kham-nii", "ขอให้ช่วยพิมพ์คำนี้", "khaaw hai chuai phim kham nii", "请帮忙打这个词", "句型", "请求帮助"],
  ["khit-waa-pen-phit-phlaat", "คิดว่าเป็นผิดพลาด", "khit waa bpen phit phlaat", "觉得是错误/失误", "句型", "说明问题"],
  ["na-ja-khao-jai-khon-la-baep", "น่าจะเข้าใจคนละแบบ", "naa ja khao jai khon la baaep", "大概理解成不同方式了", "句型", "说明问题"],
  ["khomun-mai-trong-kan", "ข้อมูลไม่ตรงกัน", "khaaw muun mai dtrong gan", "信息对不上", "句型", "说明问题"],
  ["mii-suan-thii-khaat-hai", "มีส่วนที่ขาดหาย", "mii suan thii khaat haai", "有缺失的部分", "句型", "说明问题"],
  ["khae-jaeng-hai-sap", "แค่แจ้งให้ทราบ", "khaae jaaeng hai saap", "只是告知一下", "句型", "说明问题"],
  ["yang-mai-nae-jai-sabab-sutthai", "ยังไม่แน่ใจฉบับสุดท้าย", "yang mai naae jai cha-bap sut-thaai", "还不确定最终版本", "句型", "说明问题"],
  ["kho-gae-jut-nii-gawn", "ขอแก้จุดนี้ก่อน", "khaaw gaae jut nii gaawn", "请先改这一点", "句型", "说明问题"],
  ["mai-chai-khwaam-phit-khrai", "ไม่ใช่ความผิดใคร", "mai chai khwaam phit khrai", "不是任何人的错", "句型", "说明问题"],
  ["sa-rup-wan-nii-dai-sam-rueng", "สรุปวันนี้ได้สามเรื่อง", "sa-rup wan nii dai saam rueang", "总结今天完成三件事", "句型", "收尾复盘"],
  ["yang-luea-ngaan-lek-noy", "ยังเหลืองานเล็กน้อย", "yang luea ngaan lek naawy", "还剩少量工作", "句型", "收尾复盘"],
  ["phrueng-nii-dtam-dtaaw-jak-nii", "พรุ่งนี้ทำต่อจากนี้", "phrung nii tham dtaaw jaak nii", "明天从这里继续", "句型", "收尾复盘"],
  ["jot-bpan-ha-thii-phop", "จดปัญหาที่พบ", "jot bpan-haa thii phop", "记下发现的问题", "动词", "收尾复盘"],
  ["thaai-ruup-phon-lap-wai", "ถ่ายรูปผลลัพธ์ไว้", "thaai ruup phon lap wai", "拍下结果留存", "动词", "收尾复盘"],
  ["song-sa-rup-hai-thuk-khon", "ส่งสรุปให้ทุกคน", "song sa-rup hai thuk khon", "把总结发给所有人", "动词", "收尾复盘"],
  ["dtam-withi-nii-khrang-naa", "ตามวิธีนี้ครั้งหน้า", "dtaam wi-thii nii khrang naa", "下次按这个方法", "句型", "收尾复盘"],
  ["rian-ruu-jaak-khwaam-phit", "เรียนรู้จากความผิด", "riian ruu jaak khwaam phit", "从错误中学习", "动词", "收尾复盘"],
];

const relatedByTheme: Record<
  CoreFinalReviewTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  出门办事: {
    synonym: "ออกไปธุระใกล้บ้าน / awk bpai thu-ra glai baan / 去家附近办事",
    antonym: "อยู่บ้านทั้งวัน / yuu baan thang wan / 整天在家",
    comparison: "ธุระ 是要办的事，แวะ 表示顺路停一下。",
    collocation: "ออกไปธุระใกล้บ้านแล้วแวะร้านยา / awk bpai thu-ra glai baan laew wae raan yaa / 去家附近办事后顺路去药店",
  },
  餐饮购物: {
    synonym: "ห่อกลับบ้านหนึ่งชุด / haaw glap baan nueng chut / 打包一份",
    antonym: "กินที่ร้าน / gin thii raan / 在店里吃",
    comparison: "สั่ง 是点单，ขอ 是请求，เปลี่ยน 是更换。",
    collocation: "สั่งแบบไม่ใส่น้ำแข็งและหวานน้อย / sang baaep mai sai nam khaeng lae waan naawy / 点不加冰、少甜的",
  },
  家和生活: {
    synonym: "เช็ดพื้นให้แห้ง / chet phuen hai haaeng / 把地擦干",
    antonym: "ปล่อยให้รก / bplaawy hai rok / 任由凌乱",
    comparison: "ให้ + 形容词 常表示“使其变成……状态”。",
    collocation: "เก็บสายไฟให้เรียบร้อย อย่าวางขวางทาง / gep saai fai hai riiap raawy yaa waang khwaang thaang / 把电线收整齐，不要挡路",
  },
  学习工作: {
    synonym: "ส่งงานผ่านระบบ / song ngaan phaan ra-bop / 通过系统提交",
    antonym: "ยังไม่ส่งงาน / yang mai song ngaan / 还没提交",
    comparison: "เตรียมล่วงหน้า 是提前准备，ทำซ้ำ 是重复做。",
    collocation: "ทำซ้ำจนเข้าใจแล้วตรวจคำตอบด้วยกัน / tham sam jon khao jai laew dtruat kham dtaawp duai gan / 重复做到理解，然后一起检查答案",
  },
  手机沟通: {
    synonym: "ส่งเบอร์ติดต่อให้ / song boe dtit dtaaw hai / 发送联系电话",
    antonym: "ลบข้อมูลผิด / lop khaaw muun phit / 删除错的信息",
    comparison: "ส่ง 给别人发，ปัก 常用于置顶或标记。",
    collocation: "ปักแชตสำคัญไว้ จะได้หาเจอง่าย / bpak chaet sam-khan wai ja dai haa joe ngaai / 置顶重要聊天，方便找到",
  },
  健康身体: {
    synonym: "กินยาหลังอาหาร / gin yaa lang aa-haan / 饭后吃药",
    antonym: "ไม่กินยา / mai gin yaa / 不吃药",
    comparison: "ไม่ไหว 表示身体或心理撑不住，ไม่พอ 表示不够。",
    collocation: "นอนไม่พอสามวัน เลยทำงานไม่ไหววันนี้ / naawn mai phaaw saam wan loei tham ngaan mai wai wan nii / 三天没睡够，所以今天撑不住工作",
  },
  时间计划: {
    synonym: "เตรียมตัวก่อนวันนัด / dtriiam dtua gaawn wan nat / 预约日前准备",
    antonym: "ลืมวันนัด / luem wan nat / 忘记预约日",
    comparison: "กำหนด 是期限，ตาราง 是日程表，นัด 是约定。",
    collocation: "ทวนตารางคนเดียวก่อนวันนัด / thuan dtaa-raang khon diao gaawn wan nat / 预约日前自己复核日程",
  },
  交通路线: {
    synonym: "เปลี่ยนสายรถไฟฟ้า / bpliian saai rot fai faa / 换乘轨道线路",
    antonym: "ไปผิดทาง / bpai phit thaang / 走错路",
    comparison: "ทางออก 是出口，สาย 是线路，ลัด 表示抄近路。",
    collocation: "ลงทางออกที่สามแล้วเดินลัดผ่านตลาด / long thaang awk thii saam laew doen lat phaan dta-laat / 从三号出口出，然后抄近路穿过市场",
  },
  情绪意见: {
    synonym: "ยังลังเลนิดหน่อย / yang lang-lee nit naawy / 还有点犹豫",
    antonym: "ตัดสินใจแล้ว / dtat-sin-jai laew / 已决定",
    comparison: "เห็นด้วย 是同意，ลังเล 是犹豫，สงสัย 是疑惑。",
    collocation: "ไม่ได้ขัดแค่สงสัย ถ้าเป็นฉันจะเลือกอันนี้ / mai dai khat khaae song sai thaa bpen chan ja lueak an nii / 不是反对，只是疑惑；如果是我会选这个",
  },
  请求帮助: {
    synonym: "ช่วยยกของนี้หน่อย / chuai yok khaawng nii naawy / 请帮忙搬这个",
    antonym: "ทำเอง / tham eng / 自己做",
    comparison: "ช่วย...หน่อย 是常见请求，ขอ... 表示请求得到某物或许可。",
    collocation: "ขอยืมสายชาร์จสักครู่ได้ไหม / khaaw yuem saai chaat sak khruu dai mai / 可以借用充电线一会儿吗",
  },
  说明问题: {
    synonym: "ข้อมูลไม่ตรงกัน / khaaw muun mai dtrong gan / 信息对不上",
    antonym: "ข้อมูลตรงกัน / khaaw muun dtrong gan / 信息一致",
    comparison: "แค่แจ้งให้ทราบ 用于说明只是告知，不是责怪。",
    collocation: "ข้อมูลไม่ตรงกัน ขอแก้จุดนี้ก่อน / khaaw muun mai dtrong gan khaaw gaae jut nii gaawn / 信息对不上，请先改这一点",
  },
  收尾复盘: {
    synonym: "ส่งสรุปให้ทุกคน / song sa-rup hai thuk khon / 把总结发给所有人",
    antonym: "ยังไม่สรุป / yang mai sa-rup / 还没总结",
    comparison: "สรุป 是总结，ผลลัพธ์ 是结果，ครั้งหน้า 是下次。",
    collocation: "สรุปวันนี้ได้สามเรื่อง พรุ่งนี้ทำต่อจากนี้ / sa-rup wan nii dai saam rueang phrung nii tham dtaaw jaak nii / 总结今天完成三件事，明天从这里继续",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในการทบทวน A2 ฉันใช้ “${row[1]}” เพื่อพูดเรื่องประจำวันให้ชัดและแก้สถานการณ์เล็ก ๆ ได้`,
  roman: `nai gaan thop-thuan A2 chan chai "${row[2]}" phuea phuut rueang bpra-jam wan hai chat lae gaae sa-thaa-na-gaan lek lek dai`,
  chinese: `在 A2 复盘中，我用“${row[1]}”把日常事情说清楚，也能处理小状况。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "核心最终复盘", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 核心最终复盘补漏表达。用于出门办事、购物、家务、学习工作、手机沟通、健康、交通、意见和收尾复盘；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: CORE_FINAL_REVIEW_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_CORE_FINAL_REVIEW_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
