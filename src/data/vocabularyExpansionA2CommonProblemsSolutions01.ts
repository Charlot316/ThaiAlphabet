export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
export type VocabularyExpansionLevel = "a2";
export type VocabularyExpansionTheme = "日常问题" | "丢失" | "忘记" | "坏掉" | "迟到" | "误会" | "不懂" | "解决" | "帮忙" | "重新尝试";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";
export type VocabularyExpansionRelated = { thai: string; roman: string; chinese: string; notesZh?: string };
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionComparison = { kind: VocabularyExpansionComparisonKind; target: VocabularyExpansionRelated; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[] };
export type VocabularyExpansionCandidate = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: VocabularyExpansionLevel; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[]; sourceRefs: string[]; reviewStatus: VocabularyExpansionReviewStatus };

type Row = readonly [string, string, string, string, VocabularyExpansionPartOfSpeech, VocabularyExpansionTheme, string, string, string, string, string, string];

const PROBLEM_REFS = ["worker-a-a2-common-problems-solutions", "basic-thai-problem-solving"];

const rows: Row[] = [
  ["bpan-haa", "ปัญหา", "bpan-haa", "问题；困难", "名词", "日常问题", "ถ้ามีปัญหา ให้บอกครูทันที", "thaa mii bpan-haa hai baawk khruu than-thii", "如果有问题，马上告诉老师。", "วิธีแก้", "wi-thii gaae", "解决办法"],
  ["rueang-yung", "เรื่องยุ่ง", "rueang yung", "麻烦事；复杂事", "名词", "日常问题", "วันนี้มีเรื่องยุ่งหลายอย่าง แต่เราค่อย ๆ แก้ได้", "wan-nii mii rueang yung laai yaang dtaae rao khaawy khaawy gaae dai", "今天有很多麻烦事，但我们可以慢慢解决。", "เรื่องง่าย", "rueang ngaai", "简单事"],
  ["khwaam-lam-baak", "ความลำบาก", "khwaam lam-baak", "困难；不方便", "名词", "日常问题", "ฝนตกทำให้การเดินทางมีความลำบาก", "fon dtok tham hai gaan doen-thaang mii khwaam lam-baak", "下雨让出行有困难。", "ความสะดวก", "khwaam sa-duak", "方便"],
  ["mai-sa-duak", "ไม่สะดวก", "mai sa-duak", "不方便", "形容词", "日常问题", "วันนี้ฉันไม่สะดวกไปตลาดกับคุณ", "wan-nii chan mai sa-duak bpai dta-laat gap khun", "今天我不方便和你去市场。", "สะดวก", "sa-duak", "方便"],
  ["khat-khaawng", "ขัดข้อง", "khat khaawng", "出故障；不顺畅", "形容词", "坏掉", "รถไฟฟ้าขัดข้อง เราจึงต้องนั่งรถเมล์", "rot-fai-faa khat-khaawng rao jeung dtawng nang rot-mee", "轻轨故障，所以我们得坐公交。", "ใช้ได้", "chai dai", "能用"],
  ["siia", "เสีย", "siia", "坏了；损坏", "形容词", "坏掉", "โทรศัพท์ของฉันเสียและเปิดไม่ติด", "thoo-ra-sap khaawng chan siia lae bpoet mai dtit", "我的手机坏了，开不了机。", "ดี", "dii", "好的"],
  ["phang", "พัง", "phang", "坏掉；垮掉", "动词", "坏掉", "เก้าอี้ตัวนี้พังแล้ว อย่านั่ง", "gao-ii dtua nii phang laaeo yaa nang", "这把椅子坏了，不要坐。", "ซ่อมได้", "saawm dai", "能修"],
  ["bpoet-mai-dtit", "เปิดไม่ติด", "bpoet mai dtit", "开不了机；打不开", "短语", "坏掉", "คอมพิวเตอร์เปิดไม่ติดหลังฝนตกหนัก", "khaawm-phiu-dtoe bpoet mai dtit lang fon dtok nak", "大雨后电脑开不了机。", "เปิดได้", "bpoet dai", "能打开"],
  ["chai-mai-dai", "ใช้ไม่ได้", "chai mai dai", "不能用；用不了", "短语", "坏掉", "บัตรใบนี้ใช้ไม่ได้ที่สถานีรถไฟฟ้า", "bat bai nii chai mai dai thii sa-thaa-nii rot-fai-faa", "这张卡在轻轨站用不了。", "ใช้ได้", "chai dai", "能用"],
  ["mai-tham-ngaan", "ไม่ทำงาน", "mai tham ngaan", "不工作；不运转", "短语", "坏掉", "เครื่องซักผ้าไม่ทำงานตั้งแต่เมื่อคืน", "khreuuang sak phaa mai tham-ngaan dtang-dtaae muea-khuen", "洗衣机从昨晚开始不运转。", "ทำงานปกติ", "tham-ngaan bpa-ga-dti", "正常运转"],
  ["fai-dap", "ไฟดับ", "fai dap", "停电", "动词", "日常问题", "เมื่อคืนไฟดับ เราจึงใช้เทียน", "muea-khuen fai dap rao jeung chai thiian", "昨晚停电，所以我们用了蜡烛。", "ไฟมา", "fai maa", "来电"],
  ["naam-mai-lai", "น้ำไม่ไหล", "naam mai lai", "停水；水不流", "短语", "日常问题", "เช้านี้น้ำไม่ไหล แม่จึงซักผ้าไม่ได้", "chaao nii naam mai lai maae jeung sak phaa mai dai", "今天早上停水，妈妈没法洗衣服。", "น้ำไหล", "naam lai", "有水流"],
  ["rot-dtit", "รถติด", "rot dtit", "堵车", "形容词", "迟到", "รถติดมากทำให้ฉันไปเรียนสาย", "rot dtit maak tham hai chan bpai riian saai", "堵车严重让我上课迟到。", "ถนนโล่ง", "tha-non loong", "道路畅通"],
  ["maa-saai", "มาสาย", "maa saai", "来晚；迟到", "动词", "迟到", "ขอโทษที่มาสาย วันนี้ฝนตกหนัก", "khaaw-thoot thii maa saai wan-nii fon dtok nak", "抱歉迟到了，今天雨下得很大。", "มาตรงเวลา", "maa dtrong wee-laa", "准时来"],
  ["bpai-saai", "ไปสาย", "bpai saai", "去晚；迟到", "动词", "迟到", "ถ้าไม่รีบ เราจะไปสายแน่นอน", "thaa mai riip rao ja bpai saai naae-naawn", "如果不快点，我们肯定会迟到。", "ไปทัน", "bpai than", "赶得上"],
  ["mai-than", "ไม่ทัน", "mai than", "来不及；赶不上", "短语", "迟到", "ฉันวิ่งแล้วแต่ยังขึ้นรถไม่ทัน", "chan wing laaeo dtaae yang kheun rot mai than", "我跑了，但还是没赶上车。", "ทัน", "than", "来得及"],
  ["phlaat", "พลาด", "phlaat", "错过；失误", "动词", "迟到", "เขาพลาดรถไฟเที่ยวแรกเพราะตื่นสาย", "khao phlaat rot-fai thiao raaek phraw dteun saai", "他因为起晚错过了第一班火车。", "ทัน", "than", "赶上"],
  ["dteun-saai", "ตื่นสาย", "dteun saai", "起晚", "动词", "迟到", "วันนี้ฉันตื่นสายจึงไม่ได้กินข้าวเช้า", "wan-nii chan dteun saai jeung mai dai gin khaao chaao", "今天我起晚了，所以没吃早饭。", "ตื่นเช้า", "dteun chaao", "早起"],
  ["leum", "ลืม", "leum", "忘记", "动词", "忘记", "ฉันลืมเอาสมุดมาโรงเรียน", "chan leum ao sa-mut maa roong-riian", "我忘了把本子带来学校。", "จำได้", "jam dai", "记得"],
  ["jam-mai-dai", "จำไม่ได้", "jam mai dai", "记不住；想不起来", "短语", "忘记", "ฉันจำไม่ได้ว่าเก็บกุญแจไว้ที่ไหน", "chan jam mai dai waa gep goon-jaae wai thii nai", "我想不起来把钥匙放在哪里了。", "จำได้", "jam dai", "记得"],
  ["mai-nae-jai", "ไม่แน่ใจ", "mai naae jai", "不确定", "短语", "忘记", "ฉันไม่แน่ใจว่ารถออกกี่โมง", "chan mai naae jai waa rot aawk gii moong", "我不确定车几点出发。", "แน่ใจ", "naae jai", "确定"],
  ["leum-ao-maa", "ลืมเอามา", "leum ao maa", "忘了带来", "短语", "忘记", "เขาลืมเอาร่มมา จึงต้องรอฝนหยุด", "khao leum ao rom maa jeung dtawng raaw fon yut", "他忘了带伞，所以得等雨停。", "เอามาแล้ว", "ao maa laaeo", "已经带来了"],
  ["leum-tham", "ลืมทำ", "leum tham", "忘了做", "短语", "忘记", "น้องลืมทำการบ้านและต้องขอโทษครู", "naawng leum tham gaan-baan lae dtawng khaaw-thoot khruu", "弟弟忘了做作业，必须向老师道歉。", "ทำแล้ว", "tham laaeo", "做完了"],
  ["haai", "หาย", "haai", "丢了；不见了；好了", "动词", "丢失", "กระเป๋าสตางค์ของฉันหายในตลาด", "gra-bpao sa-dtaang khaawng chan haai nai dta-laat", "我的钱包在市场丢了。", "เจอแล้ว", "joe laaeo", "找到了"],
  ["tham-haai", "ทำหาย", "tham haai", "弄丢", "动词", "丢失", "ฉันทำบัตรนักเรียนหายเมื่อวาน", "chan tham bat nak-riian haai muea-waan", "我昨天把学生证弄丢了。", "เก็บไว้", "gep wai", "收好"],
  ["khaawng-haai", "ของหาย", "khaawng haai", "东西丢失", "短语", "丢失", "ถ้าของหาย ให้ถามเจ้าหน้าที่ทันที", "thaa khaawng haai hai thaam jao-naa-thii than-thii", "如果东西丢了，马上问工作人员。", "ของอยู่ครบ", "khaawng yuu khrop", "东西齐全"],
  ["haa-mai-joe", "หาไม่เจอ", "haa mai joe", "找不到", "短语", "丢失", "ฉันหากุญแจไม่เจอในกระเป๋า", "chan haa goon-jaae mai joe nai gra-bpao", "我在包里找不到钥匙。", "หาเจอ", "haa joe", "找得到"],
  ["long-thaang", "หลงทาง", "long thaang", "迷路", "动词", "丢失", "เราเดินผิดซอยแล้วหลงทาง", "rao doen phit saawy laaeo long thaang", "我们走错巷子后迷路了。", "รู้ทาง", "ruu thaang", "认识路"],
  ["phit-thaang", "ผิดทาง", "phit thaang", "走错方向；方向不对", "短语", "丢失", "ถ้าขึ้นรถผิดทาง ต้องลงป้ายหน้า", "thaa kheun rot phit thaang dtawng long bpaai naa", "如果坐错方向，要在下一站下车。", "ถูกทาง", "thuuk thaang", "方向对"],
  ["khao-jai-phit", "เข้าใจผิด", "khao jai phit", "误会；理解错", "动词", "误会", "ฉันเข้าใจผิดว่าเรานัดกันตอนบ่าย", "chan khao-jai phit waa rao nat gan dtaawn baai", "我误以为我们约在下午。", "เข้าใจถูก", "khao jai thuuk", "理解正确"],
  ["khuam-khao-jai-phit", "ความเข้าใจผิด", "khwaam khao-jai phit", "误会；误解", "名词", "误会", "ความเข้าใจผิดเล็กน้อยทำให้ทุกคนรอนาน", "khwaam khao-jai phit lek naawy tham hai thuk khon raaw naan", "一个小误会让大家等了很久。", "ความเข้าใจ", "khwaam khao-jai", "理解"],
  ["fang-phit", "ฟังผิด", "fang phit", "听错", "动词", "误会", "ฉันฟังผิด คิดว่าครูบอกวันศุกร์", "chan fang phit khit waa khruu baawk wan suk", "我听错了，以为老师说星期五。", "ฟังถูก", "fang thuuk", "听对"],
  ["aan-phit", "อ่านผิด", "aan phit", "读错", "动词", "误会", "เขาอ่านป้ายผิดจึงไปผิดชั้น", "khao aan bpaai phit jeung bpai phit chan", "他看错牌子，所以去了错的楼层。", "อ่านถูก", "aan thuuk", "读对"],
  ["khiian-phit", "เขียนผิด", "khiian phit", "写错", "动词", "误会", "ฉันเขียนชื่อถนนผิดในที่อยู่", "chan khiian chue tha-non phit nai thii yuu", "我在地址里把街道名字写错了。", "เขียนถูก", "khiian thuuk", "写对"],
  ["phuut-phit", "พูดผิด", "phuut phit", "说错", "动词", "误会", "ถ้าพูดผิดก็ลองพูดใหม่ได้", "thaa phuut phit gaaw laawng phuut mai dai", "如果说错了，也可以试着重新说。", "พูดถูก", "phuut thuuk", "说对"],
  ["mai-khao-jai", "ไม่เข้าใจ", "mai khao jai", "不明白；不理解", "短语", "不懂", "ผมไม่เข้าใจประโยคนี้ ช่วยอธิบายได้ไหม", "phom mai khao-jai bpra-yook nii chuai a-thi-baai dai mai", "我不明白这个句子，可以帮忙解释吗？", "เข้าใจ", "khao jai", "明白"],
  ["mai-ruu-rueang", "ไม่รู้เรื่อง", "mai ruu rueang", "听不懂；搞不懂", "短语", "不懂", "เสียงดังมากจนฉันฟังไม่รู้เรื่อง", "siiang dang maak jon chan fang mai ruu rueang", "声音太大，我听不懂。", "เข้าใจดี", "khao jai dii", "很明白"],
  ["mai-than", "ไม่ทัน", "mai than", "跟不上；来不及", "短语", "不懂", "ครูพูดเร็วมาก ฉันฟังไม่ทัน", "khruu phuut reo maak chan fang mai than", "老师说得很快，我听不上。", "ทัน", "than", "跟得上"],
  ["mai-chad", "ไม่ชัด", "mai chat", "不清楚", "形容词", "不懂", "เสียงในโทรศัพท์ไม่ชัด กรุณาพูดอีกครั้ง", "siiang nai thoo-ra-sap mai chat ga-ru-naa phuut iik khrang", "电话里的声音不清楚，请再说一次。", "ชัดเจน", "chat jen", "清楚"],
  ["ngong", "งง", "ngong", "困惑；懵", "形容词", "不懂", "ฉันงงกับทางไปสถานีรถไฟ", "chan ngong gap thaang bpai sa-thaa-nii rot-fai", "我对去火车站的路有点懵。", "เข้าใจ", "khao jai", "明白"],
  ["sop-son", "สับสน", "sap son", "混乱；弄混", "形容词", "不懂", "เขาสับสนระหว่างซ้ายกับขวา", "khao sap-son ra-waang saai gap khwaa", "他把左和右弄混了。", "ชัดเจน", "chat jen", "清楚"],
  ["yaak", "ยาก", "yaak", "难", "形容词", "日常问题", "คำนี้ยากสำหรับคนเริ่มเรียนไทย", "kham nii yaak sam-rap khon roem riian thai", "这个词对刚开始学泰语的人来说难。", "ง่าย", "ngaai", "容易"],
  ["ngai", "ง่าย", "ngaai", "容易；简单", "形容词", "解决", "ถ้าแบ่งเป็นสองขั้นตอน งานนี้จะง่ายขึ้น", "thaa baeng bpen saawng khan-dtaawn ngaan nii ja ngaai kheun", "如果分成两步，这件事会变容易。", "ยาก", "yaak", "难"],
  ["kae", "แก้", "gaae", "改；解决；修正", "动词", "解决", "ครูช่วยแก้ประโยคที่ฉันเขียนผิด", "khruu chuai gaae bpra-yook thii chan khiian phit", "老师帮我改写错的句子。", "ปล่อยไว้", "bplaawy wai", "放着不管"],
  ["kae-bpan-haa", "แก้ปัญหา", "gaae bpan-haa", "解决问题", "动词", "解决", "เราควรคุยกันดี ๆ เพื่อแก้ปัญหา", "rao khuan khui gan dii dii phuea gaae bpan-haa", "我们应该好好谈一谈来解决问题。", "สร้างปัญหา", "saang bpan-haa", "制造问题"],
  ["wi-thii-kae", "วิธีแก้", "wi-thii gaae", "解决方法；修正办法", "名词", "解决", "คุณมีวิธีแก้เรื่องนี้ไหม", "khun mii wi-thii gaae rueang nii mai", "你有解决这件事的办法吗？", "ปัญหา", "bpan-haa", "问题"],
  ["thaang-kae", "ทางแก้", "thaang gaae", "解决途径；办法", "名词", "解决", "เราหาทางแก้ได้ถ้าช่วยกันคิด", "rao haa thaang gaae dai thaa chuai gan khit", "如果一起想，我们能找到解决办法。", "ทางตัน", "thaang dtan", "死路；没办法"],
  ["tham-hai-dii-kheun", "ทำให้ดีขึ้น", "tham hai dii kheun", "让……变好；改善", "动词", "解决", "การฝึกทุกวันทำให้การพูดดีขึ้น", "gaan feuk thuk wan tham hai gaan phuut dii kheun", "每天练习让口语变好。", "แย่ลง", "yaae long", "变糟"],
  ["prap", "ปรับ", "bprap", "调整", "动词", "解决", "ถ้าเสื้อหลวม ร้านช่วยปรับให้พอดีได้", "thaa seua luam raan chuai bprap hai phaaw-dii dai", "如果衣服松，店里可以帮忙调整到合身。", "ปล่อยไว้", "bplaawy wai", "不调整"],
  ["saawm", "ซ่อม", "saawm", "修理", "动词", "解决", "พ่อซ่อมเก้าอี้ที่พังในครัว", "phaaw saawm gao-ii thii phang nai khrua", "爸爸修厨房里坏了的椅子。", "ทิ้ง", "thing", "扔掉"],
  ["tham-mai", "ทำใหม่", "tham mai", "重新做", "动词", "重新尝试", "ถ้าเขียนผิดมาก ก็ทำใหม่ได้", "thaa khiian phit maak gaaw tham mai dai", "如果写错很多，也可以重新做。", "ทำต่อ", "tham dtaaw", "继续做"],
  ["laawng-mai", "ลองใหม่", "laawng mai", "重新试；再试一次", "动词", "重新尝试", "ถ้าครั้งแรกไม่สำเร็จ ให้ลองใหม่", "thaa khrang raaek mai sam-ret hai laawng mai", "如果第一次没成功，就再试一次。", "หยุดลอง", "yut laawng", "停止尝试"],
  ["phuut-mai", "พูดใหม่", "phuut mai", "重新说；再说一遍", "动词", "重新尝试", "ขอโทษครับ ช่วยพูดใหม่ช้า ๆ ได้ไหม", "khaaw-thoot khrap chuai phuut mai chaa chaa dai mai", "不好意思，可以慢慢重新说一遍吗？", "เงียบ", "ngiiap", "沉默"],
  ["khiian-mai", "เขียนใหม่", "khiian mai", "重写", "动词", "重新尝试", "ครูให้ฉันเขียนใหม่เพราะตัวหนังสือไม่ชัด", "khruu hai chan khiian mai phraw dtua nang-sue mai chat", "老师让我重写，因为字不清楚。", "เขียนต่อ", "khiian dtaaw", "继续写"],
  ["aan-mai", "อ่านใหม่", "aan mai", "重读；再读", "动词", "重新尝试", "ถ้าอ่านไม่เข้าใจ ให้อ่านใหม่อีกครั้ง", "thaa aan mai khao-jai hai aan mai iik khrang", "如果读不懂，就再读一遍。", "ข้าม", "khaam", "跳过"],
  ["roem-mai", "เริ่มใหม่", "roem mai", "重新开始", "动词", "重新尝试", "เกมนี้ยากมาก เราต้องเริ่มใหม่", "geem nii yaak maak rao dtawng roem mai", "这个游戏很难，我们得重新开始。", "ทำต่อ", "tham dtaaw", "继续做"],
  ["iik-khrang", "อีกครั้ง", "iik khrang", "再一次", "副词", "重新尝试", "กรุณาฟังประโยคนี้อีกครั้ง", "ga-ru-naa fang bpra-yook nii iik khrang", "请再听一次这个句子。", "ครั้งเดียว", "khrang diao", "一次"],
  ["iik-thii", "อีกที", "iik thii", "再一遍；再一次", "副词", "重新尝试", "ช่วยอธิบายอีกทีได้ไหมคะ", "chuai a-thi-baai iik thii dai mai kha", "可以再解释一遍吗？", "พอแล้ว", "phaaw laaeo", "够了"],
  ["chuai", "ช่วย", "chuai", "帮；帮助", "动词", "帮忙", "ช่วยเปิดประตูให้หน่อยได้ไหม", "chuai bpoet bpra-dtuu hai naawy dai mai", "可以帮忙开一下门吗？", "ทำเอง", "tham eeng", "自己做"],
  ["khaaw-khwaam-chuai-luea", "ขอความช่วยเหลือ", "khaaw khwaam chuai-leuua", "请求帮助", "动词", "帮忙", "ถ้าหลงทาง ให้ขอความช่วยเหลือจากเจ้าหน้าที่", "thaa long thaang hai khaaw khwaam chuai-leuua jaak jao-naa-thii", "如果迷路了，向工作人员求助。", "ช่วยตัวเอง", "chuai dtua eeng", "自己处理"],
  ["chuai-luea", "ช่วยเหลือ", "chuai leuua", "帮助；援助", "动词", "帮忙", "เพื่อนช่วยเหลือฉันเมื่อฉันไม่เข้าใจ", "phuean chuai-leuua chan muea chan mai khao-jai", "我不明白时，朋友帮助我。", "ไม่ช่วย", "mai chuai", "不帮"],
  ["chuai-duu", "ช่วยดู", "chuai duu", "帮忙看一下", "动词", "帮忙", "ช่วยดูหน่อยว่าฉันเขียนถูกไหม", "chuai duu naawy waa chan khiian thuuk mai", "帮忙看一下我写得对不对。", "ไม่ดู", "mai duu", "不看"],
  ["chuai-ha", "ช่วยหา", "chuai haa", "帮忙找", "动词", "帮忙", "ช่วยหากุญแจให้หน่อยได้ไหม", "chuai haa goon-jaae hai naawy dai mai", "可以帮我找一下钥匙吗？", "หาเอง", "haa eeng", "自己找"],
  ["chuai-thue", "ช่วยถือ", "chuai theu", "帮忙拿着", "动词", "帮忙", "ช่วยถือกระเป๋าใบนี้ให้แม่หน่อย", "chuai theu gra-bpao bai nii hai maae naawy", "帮妈妈拿一下这个包。", "ถือเอง", "theu eeng", "自己拿"],
  ["chuai-baawk", "ช่วยบอก", "chuai baawk", "帮忙告诉", "动词", "帮忙", "ช่วยบอกทางไปห้องน้ำได้ไหมครับ", "chuai baawk thaang bpai haawng-naam dai mai khrap", "可以帮忙告诉我去洗手间的路吗？", "ไม่บอก", "mai baawk", "不告诉"],
  ["chuai-a-thi-baai", "ช่วยอธิบาย", "chuai a-thi-baai", "帮忙解释", "动词", "帮忙", "ครูช่วยอธิบายคำนี้ด้วยตัวอย่างง่าย ๆ", "khruu chuai a-thi-baai kham nii duai dtua-yaang ngaai ngaai", "老师用简单例子帮忙解释这个词。", "ไม่อธิบาย", "mai a-thi-baai", "不解释"],
  ["khaaw-thoot", "ขอโทษ", "khaaw thoot", "道歉；对不起", "动词", "误会", "เขาขอโทษที่เข้าใจผิดเรื่องเวลา", "khao khaaw-thoot thii khao-jai phit rueang wee-laa", "他为误会时间而道歉。", "ขอบคุณ", "khaawp khun", "感谢"],
  ["khaaw-thoot-thii", "ขอโทษที่", "khaaw thoot thii", "为……道歉", "短语", "误会", "ขอโทษที่มาช้า ฉันหาแท็กซี่ไม่ได้", "khaaw-thoot thii maa chaa chan haa thaek-sii mai dai", "抱歉来晚了，我找不到出租车。", "ขอบคุณที่", "khaawp khun thii", "感谢……"],
  ["a-phai", "อภัย", "a-phai", "原谅", "动词", "误会", "ถ้าฉันพูดผิด กรุณาอภัยให้ด้วย", "thaa chan phuut phit ga-ru-naa a-phai hai duai", "如果我说错了，请原谅。", "โกรธ", "groot", "生气"],
  ["mai-bpen-rai", "ไม่เป็นไร", "mai bpen rai", "没关系；没事", "短语", "误会", "ไม่เป็นไร เราลองทำใหม่ได้", "mai bpen rai rao laawng tham mai dai", "没关系，我们可以重新做。", "เป็นปัญหา", "bpen bpan-haa", "成问题"],
  ["jai-yen", "ใจเย็น", "jai yen", "冷静；别急", "形容词", "解决", "ใจเย็น ๆ แล้วค่อยหาทางแก้", "jai yen yen laaeo khaawy haa thaang gaae", "冷静一点，然后再找解决办法。", "ใจร้อน", "jai raawn", "急躁"],
  ["khaawy-khaawy", "ค่อย ๆ", "khaawy khaawy", "慢慢地；一步步", "副词", "解决", "ถ้าโจทย์ยาก ให้ค่อย ๆ อ่าน", "thaa joot yaak hai khaawy khaawy aan", "如果题目难，就慢慢读。", "รีบ", "riip", "赶快"],
  ["riip", "รีบ", "riip", "赶快；赶紧", "动词", "迟到", "รีบไปเถอะ เดี๋ยวจะไม่ทันรถ", "riip bpai thoe diaao ja mai than rot", "快去吧，不然会赶不上车。", "ค่อย ๆ", "khaawy khaawy", "慢慢地"],
  ["dtruat-duu", "ตรวจดู", "dtruat duu", "检查一下", "动词", "解决", "ก่อนออกจากบ้านควรตรวจดูกระเป๋า", "gaawn aawk jaak baan khuan dtruat duu gra-bpao", "出门前应该检查一下包。", "มองผ่าน", "maawng phaan", "略过"],
  ["duu-iik-thii", "ดูอีกที", "duu iik thii", "再看一下", "动词", "解决", "ถ้าไม่แน่ใจ ให้ดูอีกทีในใบเสร็จ", "thaa mai naae-jai hai duu iik thii nai bai-set", "如果不确定，就在收据上再看一下。", "ไม่ดู", "mai duu", "不看"],
  ["thaam-iik-khrang", "ถามอีกครั้ง", "thaam iik khrang", "再问一次", "动词", "解决", "ถ้าฟังไม่ชัด ให้ถามอีกครั้งได้", "thaa fang mai chat hai thaam iik khrang dai", "如果听不清，可以再问一次。", "เดาเอง", "dao eeng", "自己猜"],
  ["jot-wai", "จดไว้", "jot wai", "记下来", "动词", "忘记", "จดเวลาเรียนไว้ จะได้ไม่ลืม", "jot wee-laa riian wai ja dai mai leum", "把上课时间记下来，就不会忘。", "จำอย่างเดียว", "jam yaang diao", "只靠记忆"],
  ["teuan", "เตือน", "dteuan", "提醒", "动词", "忘记", "แม่เตือนให้ฉันเอาร่มไปด้วย", "maae dteuan hai chan ao rom bpai duai", "妈妈提醒我把伞也带上。", "ลืมบอก", "leum baawk", "忘了说"],
  ["tang-dteuan", "ตั้งเตือน", "dtang dteuan", "设置提醒", "动词", "忘记", "ฉันตั้งเตือนในมือถือก่อนนัดเพื่อน", "chan dtang dteuan nai mue-theu gaawn nat phuean", "约朋友前我在手机里设置提醒。", "ไม่จดไว้", "mai jot wai", "不记下来"],
  ["sam-ret", "สำเร็จ", "sam-ret", "成功；完成", "形容词", "解决", "ครั้งนี้เราทำงานสำเร็จเพราะช่วยกัน", "khrang nii rao tham ngaan sam-ret phraw chuai gan", "这次我们因为互相帮忙完成了事情。", "ไม่สำเร็จ", "mai sam-ret", "不成功"],
  ["mai-sam-ret", "ไม่สำเร็จ", "mai sam-ret", "不成功；没完成", "短语", "重新尝试", "ถ้าครั้งแรกไม่สำเร็จ เราจะลองใหม่", "thaa khrang raaek mai sam-ret rao ja laawng mai", "如果第一次不成功，我们会再试。", "สำเร็จ", "sam-ret", "成功"],
  ["dii-kheun", "ดีขึ้น", "dii kheun", "好转；变好", "形容词", "解决", "หลังพักหนึ่งวัน อาการของเขาดีขึ้น", "lang phak neung wan aa-gaan khaawng khao dii kheun", "休息一天后，他的症状好转了。", "แย่ลง", "yaae long", "变糟"],
  ["yaae-long", "แย่ลง", "yaae long", "变糟；更差", "形容词", "日常问题", "ถ้าไม่ซ่อมตอนนี้ ปัญหาอาจแย่ลง", "thaa mai saawm dtaawn-nii bpan-haa aat yaae long", "如果现在不修，问题可能变糟。", "ดีขึ้น", "dii kheun", "好转"],
  ["bplaawy-wai", "ปล่อยไว้", "bplaawy wai", "放着不管；留着", "动词", "日常问题", "อย่าปล่อยไว้ ถ้ามีปัญหาควรบอกผู้ใหญ่", "yaa bplaawy wai thaa mii bpan-haa khuan baawk phuu-yai", "不要放着不管，如果有问题应该告诉大人。", "แก้ทันที", "gaae than-thii", "马上解决"],
  ["tham-eeng", "ทำเอง", "tham eeng", "自己做", "动词", "帮忙", "งานนี้ง่าย ฉันทำเองได้", "ngaan nii ngaai chan tham eeng dai", "这件事简单，我可以自己做。", "ให้ช่วย", "hai chuai", "让帮忙"],
  ["hai-chuai", "ให้ช่วย", "hai chuai", "让帮忙；请帮", "动词", "帮忙", "ถ้ายกไม่ไหว ให้เพื่อนช่วยได้", "thaa yok mai wai hai phuean chuai dai", "如果搬不动，可以请朋友帮忙。", "ทำเอง", "tham eeng", "自己做"],
  ["mai-wai", "ไม่ไหว", "mai wai", "撑不住；做不了", "短语", "日常问题", "กระเป๋าหนักมาก ฉันถือไม่ไหว", "gra-bpao nak maak chan theu mai wai", "包很重，我拿不动。", "ไหว", "wai", "撑得住；能行"],
  ["wai", "ไหว", "wai", "能承受；能行", "形容词", "解决", "ถ้าพักสิบนาที ฉันเดินต่อไหว", "thaa phak sip naa-thii chan doen dtaaw wai", "如果休息十分钟，我能继续走。", "ไม่ไหว", "mai wai", "不行"],
  ["khat", "ขาด", "khaat", "缺少；不足", "形容词", "日常问题", "วันนี้เราขาดคนช่วยยกของสองคน", "wan-nii rao khaat khon chuai yok khaawng saawng khon", "今天我们缺两个帮忙搬东西的人。", "พอ", "phaaw", "够"],
  ["mai-phaaw", "ไม่พอ", "mai phaaw", "不够", "短语", "日常问题", "น้ำสองขวดไม่พอสำหรับทุกคน", "naam saawng khuat mai phaaw sam-rap thuk khon", "两瓶水不够所有人喝。", "พอ", "phaaw", "够"],
  ["phaaw", "พอ", "phaaw", "够；足够", "形容词", "解决", "ถ้าเก้าอี้พอ ทุกคนก็นั่งได้", "thaa gao-ii phaaw thuk khon gaaw nang dai", "如果椅子够，每个人都能坐。", "ไม่พอ", "mai phaaw", "不够"],
  ["khaaw-oo-gaat", "ขอโอกาส", "khaaw oo-gaat", "请求机会", "动词", "重新尝试", "ขอโอกาสลองพูดใหม่อีกครั้งได้ไหม", "khaaw oo-gaat laawng phuut mai iik khrang dai mai", "可以给我机会再重新说一次吗？", "ไม่ให้ลอง", "mai hai laawng", "不给试"],
  ["phayaayaam", "พยายาม", "pha-yaa-yaam", "努力；尝试", "动词", "重新尝试", "ฉันพยายามอ่านคำยากนี้หลายครั้ง", "chan pha-yaa-yaam aan kham yaak nii laai khrang", "我努力读这个难词好几次。", "ยอมแพ้", "yaawm phaae", "放弃"],
  ["yaawm-phae", "ยอมแพ้", "yaawm phaae", "认输；放弃", "动词", "重新尝试", "อย่าเพิ่งยอมแพ้ ลองใหม่อีกครั้ง", "yaa phoeng yaawm phaae laawng mai iik khrang", "先别放弃，再试一次。", "พยายาม", "pha-yaa-yaam", "努力"],
  ["khaaw-kham-nae-nam", "ขอคำแนะนำ", "khaaw kham nae-nam", "请求建议", "动词", "帮忙", "ถ้าเลือกไม่ได้ ฉันจะขอคำแนะนำจากครู", "thaa leuak mai dai chan ja khaaw kham nae-nam jaak khruu", "如果选不了，我会向老师请求建议。", "ตัดสินใจเอง", "dtat-sin-jai eeng", "自己决定"],
];

const buildCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const related: VocabularyExpansionRelated = { thai: row[9], roman: row[10], chinese: row[11] };
  const comparison: VocabularyExpansionComparison = { kind: "usage", target: related, distinctionZh: `${row[1]} 用于“${row[5]}”场景；和 ${related.thai} 对照记，可以把问题、原因、求助和解决动作分清。` };
  const example = { thai: row[6], roman: row[7], chinese: row[8] };
  const collocations = [{ thai: row[1], roman: row[2], chinese: row[3] }, related];
  return {
    id: row[0],
    thai: row[1],
    roman: row[2],
    chinese: row[3],
    partOfSpeech: row[4],
    theme: row[5],
    level: "a2",
    priority: index + 1,
    senses: [{ id: `${row[0]}-main`, chinese: row[3], examples: [example], synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5]] }],
    synonyms: [],
    antonyms: [],
    comparisons: [comparison],
    collocations,
    tags: [row[5], "A2基础"],
    sourceRefs: PROBLEM_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_COMMON_PROBLEMS_SOLUTIONS_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
