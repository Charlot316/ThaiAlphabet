export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
export type VocabularyExpansionLevel = "a2";
export type VocabularyExpansionTheme = "生日" | "结婚" | "搬家" | "探亲" | "家庭聚会" | "节日" | "礼物" | "人生阶段" | "照顾家人";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";
export type VocabularyExpansionRelated = { thai: string; roman: string; chinese: string; notesZh?: string };
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionComparison = { kind: VocabularyExpansionComparisonKind; target: VocabularyExpansionRelated; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[] };
export type VocabularyExpansionCandidate = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: VocabularyExpansionLevel; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[]; sourceRefs: string[]; reviewStatus: VocabularyExpansionReviewStatus };

type Row = readonly [string, string, string, string, VocabularyExpansionPartOfSpeech, VocabularyExpansionTheme, string, string, string];

const FAMILY_EVENTS_REFS = ["worker-a-a2-family-events-life", "basic-thai-family-events"];

const rows: Row[] = [
  ["wan-goet", "วันเกิด", "wan-goet", "生日", "名词", "生日", "วันเกิดปีนี้แม่ทำอาหารให้ทั้งครอบครัว", "wan-goet bpii nii maae tham aa-haan hai thang khraawp-khrua", "今年生日妈妈给全家做饭。"],
  ["ngaan-wan-goet", "งานวันเกิด", "ngaan wan-goet", "生日会", "名词", "生日", "เด็ก ๆ ไปงานวันเกิดเพื่อนที่บ้าน", "dek dek bpai ngaan wan-goet phuean thii baan", "孩子们去朋友家参加生日会。"],
  ["khek-wan-goet", "เค้กวันเกิด", "khek wan-goet", "生日蛋糕", "名词", "生日", "พ่อซื้อเค้กวันเกิดรสช็อกโกแลต", "phaaw sue khek wan-goet rot chaawk-goo-laaet", "爸爸买了巧克力味生日蛋糕。"],
  ["thian", "เทียน", "thiian", "蜡烛", "名词", "生日", "น้องเป่าเทียนบนเค้กอย่างมีความสุข", "naawng bpao thiian bon khek yaang mii khwaam-suk", "弟弟开心地吹蛋糕上的蜡烛。"],
  ["bpao-thian", "เป่าเทียน", "bpao thiian", "吹蜡烛", "动词", "生日", "ก่อนตัดเค้ก เด็ก ๆ ร้องเพลงแล้วเป่าเทียน", "gaawn dtat khek dek dek raawng phleeng laaeo bpao thiian", "切蛋糕前，孩子们唱歌然后吹蜡烛。"],
  ["raawng-phleeng-wan-goet", "ร้องเพลงวันเกิด", "raawng phleeng wan-goet", "唱生日歌", "动词", "生日", "ทุกคนร้องเพลงวันเกิดให้คุณยาย", "thuk khon raawng phleeng wan-goet hai khun-yaai", "大家给外婆唱生日歌。"],
  ["uai-phaawn-wan-goet", "อวยพรวันเกิด", "uai phaawn wan-goet", "祝生日快乐；生日祝福", "动词", "生日", "ฉันโทรไปอวยพรวันเกิดคุณตาตอนเช้า", "chan thoo bpai uai phaawn wan-goet khun-dtaa dtaawn chaao", "我早上打电话给外公祝生日快乐。"],
  ["suk-san-wan-goet", "สุขสันต์วันเกิด", "suk-san wan-goet", "生日快乐", "短语", "生日", "เพื่อนเขียนว่า สุขสันต์วันเกิด บนการ์ด", "phuean khiian waa suk-san wan-goet bon gaat", "朋友在卡片上写“生日快乐”。"],
  ["dtat-khek", "ตัดเค้ก", "dtat khek", "切蛋糕", "动词", "生日", "หลังเป่าเทียนแล้ว ทุกคนช่วยกันตัดเค้ก", "lang bpao thiian laaeo thuk khon chuai gan dtat khek", "吹蜡烛后，大家一起切蛋糕。"],
  ["bpii-nii-aa-yu", "ปีนี้อายุ", "bpii nii aa-yu", "今年……岁", "短语", "生日", "ปีนี้น้องอายุสิบสองปีแล้ว", "bpii nii naawng aa-yu sip-saawng bpii laaeo", "今年弟弟十二岁了。"],
  ["khong-khwan", "ของขวัญ", "khaawng khwan", "礼物", "名词", "礼物", "ของขวัญชิ้นนี้มาจากเพื่อนสนิท", "khaawng-khwan chin nii maa jaak phuean sa-nit", "这件礼物来自好朋友。"],
  ["hai-khong-khwan", "ให้ของขวัญ", "hai khaawng khwan", "送礼物", "动词", "礼物", "พี่ให้ของขวัญวันเกิดแก่น้องสาว", "phii hai khaawng-khwan wan-goet gaae naawng-saao", "姐姐送妹妹生日礼物。"],
  ["rap-khong-khwan", "รับของขวัญ", "rap khaawng khwan", "收礼物", "动词", "礼物", "เด็ก ๆ รับของขวัญจากคุณยายอย่างสุภาพ", "dek dek rap khaawng-khwan jaak khun-yaai yaang su-phaap", "孩子们礼貌地收下外婆的礼物。"],
  ["leuak-khong-khwan", "เลือกของขวัญ", "leuak khaawng khwan", "挑选礼物", "动词", "礼物", "ฉันเลือกของขวัญให้แม่อยู่นาน", "chan leuak khaawng-khwan hai maae yuu naan", "我给妈妈挑礼物挑了很久。"],
  ["haaw-khong-khwan", "ห่อของขวัญ", "haaw khaawng khwan", "包装礼物", "动词", "礼物", "พ่อช่วยห่อของขวัญด้วยกระดาษสีแดง", "phaaw chuai haaw khaawng-khwan duai gra-daat sii daaeng", "爸爸帮忙用红纸包装礼物。"],
  ["gra-daat-haaw", "กระดาษห่อของขวัญ", "gra-daat haaw khaawng khwan", "礼品包装纸", "名词", "礼物", "ร้านนี้ขายกระดาษห่อของขวัญหลายสี", "raan nii khaai gra-daat haaw khaawng-khwan laai sii", "这家店卖很多颜色的礼品包装纸。"],
  ["gaat-uai-phaawn", "การ์ดอวยพร", "gaat uai phaawn", "祝福卡；贺卡", "名词", "礼物", "เธอเขียนการ์ดอวยพรให้เพื่อน", "thoe khiian gaat uai phaawn hai phuean", "她给朋友写祝福卡。"],
  ["faa-khwaam-khit-theung", "ฝากความคิดถึง", "faak khwaam khit-theung", "代问好；转达想念", "短语", "探亲", "แม่ฝากความคิดถึงไปถึงคุณยายด้วย", "maae faak khwaam khit-theung bpai theung khun-yaai duai", "妈妈让我代向外婆问好。"],
  ["bpai-yiiam", "ไปเยี่ยม", "bpai yiiam", "去探望", "动词", "探亲", "วันอาทิตย์เราจะไปเยี่ยมคุณตาที่บ้าน", "wan aa-thit rao ja bpai yiiam khun-dtaa thii baan", "星期天我们要去家里看望外公。"],
  ["yiiam-yaat", "เยี่ยมญาติ", "yiiam yaat", "探亲；看望亲戚", "动词", "探亲", "ปีใหม่ครอบครัวเราเดินทางไปเยี่ยมญาติ", "bpii mai khraawp-khrua rao doen-thaang bpai yiiam yaat", "新年我们家出行去探亲。"],
  ["yaat", "ญาติ", "yaat", "亲戚", "名词", "探亲", "ญาติหลายคนมาหาเราที่บ้าน", "yaat laai khon maa haa rao thii baan", "很多亲戚来我们家看我们。"],
  ["yaat-phii-naawng", "ญาติพี่น้อง", "yaat phii naawng", "亲戚家人；亲族", "名词", "探亲", "งานนี้มีญาติพี่น้องมาจากหลายจังหวัด", "ngaan nii mii yaat phii naawng maa jaak laai jang-wat", "这个活动有来自多个府的亲戚家人。"],
  ["glap-baan", "กลับบ้าน", "glap baan", "回家", "动词", "探亲", "วันหยุดยาวลูก ๆ กลับบ้านไปหาพ่อแม่", "wan-yut yaao luuk luuk glap baan bpai haa phaaw maae", "长假孩子们回家看父母。"],
  ["maa-haa", "มาหา", "maa haa", "来看；来找", "动词", "探亲", "คุณน้ามาหาเราพร้อมขนมหลายอย่าง", "khun-naa maa haa rao phraawm kha-nom laai yaang", "姨妈带着很多点心来看我们。"],
  ["khit-theung", "คิดถึง", "khit theung", "想念", "动词", "探亲", "ฉันคิดถึงคุณยายเมื่อไม่ได้กลับบ้านนาน", "chan khit-theung khun-yaai muea mai dai glap baan naan", "很久没回家时，我想念外婆。"],
  ["ngaan-ruam-yaat", "งานรวมญาติ", "ngaan ruam yaat", "家族聚会；亲戚聚会", "名词", "家庭聚会", "งานรวมญาติปีนี้จัดที่บ้านคุณตา", "ngaan ruam yaat bpii nii jat thii baan khun-dtaa", "今年的家族聚会在外公家办。"],
  ["gin-khaao-phraawm-gan", "กินข้าวพร้อมกัน", "gin khaao phraawm gan", "一起吃饭", "动词", "家庭聚会", "ตอนเย็นทุกคนกินข้าวพร้อมกันที่บ้าน", "dtaawn yen thuk khon gin khaao phraawm gan thii baan", "傍晚大家在家一起吃饭。"],
  ["khraawp-khrua-yai", "ครอบครัวใหญ่", "khraawp-khrua yai", "大家庭", "名词", "家庭聚会", "ครอบครัวใหญ่ของเราเจอกันทุกปี", "khraawp-khrua yai khaawng rao joe gan thuk bpii", "我们大家庭每年见面。"],
  ["khraawp-khrua-lek", "ครอบครัวเล็ก", "khraawp-khrua lek", "小家庭", "名词", "家庭聚会", "ครอบครัวเล็กของเขามีสามคน", "khraawp-khrua lek khaawng khao mii saam khon", "他的小家庭有三个人。"],
  ["phii-naawng", "พี่น้อง", "phii naawng", "兄弟姐妹", "名词", "家庭聚会", "พี่น้องช่วยกันเตรียมอาหารก่อนงาน", "phii naawng chuai gan dtriiam aa-haan gaawn ngaan", "兄弟姐妹们在活动前一起准备饭菜。"],
  ["luuk-laan", "ลูกหลาน", "luuk laan", "子孙；晚辈", "名词", "家庭聚会", "ลูกหลานกลับมาไหว้ผู้ใหญ่ในวันปีใหม่", "luuk laan glap maa wai phuu-yai nai wan bpii mai", "晚辈们新年回来向长辈合十行礼。"],
  ["phuu-yai", "ผู้ใหญ่", "phuu yai", "大人；长辈", "名词", "家庭聚会", "เด็ก ๆ นั่งฟังผู้ใหญ่คุยกันอย่างสุภาพ", "dek dek nang fang phuu-yai khui gan yaang su-phaap", "孩子们礼貌地坐着听长辈聊天。"],
  ["phuu-naawy", "ผู้น้อย", "phuu naawy", "晚辈；年纪较小者", "名词", "家庭聚会", "ผู้น้อยควรไหว้ผู้ใหญ่ก่อน", "phuu naawy khuan wai phuu-yai gaawn", "晚辈应该先向长辈合十行礼。"],
  ["wai-phuu-yai", "ไหว้ผู้ใหญ่", "wai phuu yai", "向长辈合十行礼", "动词", "家庭聚会", "ก่อนรับของขวัญ เด็ก ๆ ไหว้ผู้ใหญ่", "gaawn rap khaawng-khwan dek dek wai phuu-yai", "收礼物前，孩子们向长辈行礼。"],
  ["hai-phaawn", "ให้พร", "hai phaawn", "祝福；赐福", "动词", "家庭聚会", "คุณยายให้พรหลานในวันปีใหม่", "khun-yaai hai phaawn laan nai wan bpii mai", "外婆在新年祝福孙辈。"],
  ["rap-phaawn", "รับพร", "rap phaawn", "接受祝福", "动词", "家庭聚会", "หลาน ๆ รับพรจากคุณตาด้วยความเคารพ", "laan laan rap phaawn jaak khun-dtaa duai khwaam khao-rop", "孙辈们恭敬地接受外公的祝福。"],
  ["ngaan-dtaeng-ngaan", "งานแต่งงาน", "ngaan dtaeng ngaan", "婚礼", "名词", "结婚", "งานแต่งงานของพี่สาวจัดที่โรงแรม", "ngaan dtaeng-ngaan khaawng phii-saao jat thii roong-raaem", "姐姐的婚礼在酒店举办。"],
  ["dtaeng-ngaan", "แต่งงาน", "dtaeng ngaan", "结婚", "动词", "结婚", "พี่ชายจะแต่งงานเดือนหน้า", "phii-chaai ja dtaeng-ngaan duean naa", "哥哥下个月要结婚。"],
  ["jao-baao", "เจ้าบ่าว", "jao baao", "新郎", "名词", "结婚", "เจ้าบ่าวยืนต้อนรับแขกหน้างาน", "jao-baao yuen dtaawn-rap khaaek naa ngaan", "新郎站在活动门口迎接客人。"],
  ["jao-saao", "เจ้าสาว", "jao saao", "新娘", "名词", "结婚", "เจ้าสาวใส่ชุดสีขาวสวยมาก", "jao-saao sai chut sii khaao suai maak", "新娘穿白色礼服，非常漂亮。"],
  ["khuu-rak", "คู่รัก", "khuu rak", "情侣；恋人", "名词", "结婚", "คู่รักคู่นี้รู้จักกันมาห้าปี", "khuu-rak khuu nii ruu-jak gan maa haa bpii", "这对情侣认识五年了。"],
  ["khuu-chiwit", "คู่ชีวิต", "khuu chii-wit", "人生伴侣；配偶", "名词", "结婚", "เขาบอกว่าคู่ชีวิตควรช่วยกันทุกเรื่อง", "khao baawk waa khuu chii-wit khuan chuai gan thuk rueang", "他说人生伴侣应该事事互相帮助。"],
  ["khaw-dtaeng-ngaan", "ขอแต่งงาน", "khaaw dtaeng ngaan", "求婚", "动词", "结婚", "เขาขอแต่งงานกับแฟนที่สวนสาธารณะ", "khao khaaw dtaeng-ngaan gap faaen thii suan saa-thaa-ra-na", "他在公园向恋人求婚。"],
  ["haewen", "แหวน", "waaen", "戒指", "名词", "结婚", "แหวนวงนี้เป็นของขวัญวันแต่งงาน", "waaen wong nii bpen khaawng-khwan wan dtaeng-ngaan", "这枚戒指是结婚礼物。"],
  ["thaai-ruup-khuu", "ถ่ายรูปคู่", "thaai ruup khuu", "拍双人照；合影", "动词", "结婚", "เจ้าบ่าวเจ้าสาวถ่ายรูปคู่กับครอบครัว", "jao-baao jao-saao thaai ruup khuu gap khraawp-khrua", "新郎新娘和家人合影。"],
  ["chut-jao-saao", "ชุดเจ้าสาว", "chut jao saao", "新娘礼服", "名词", "结婚", "ชุดเจ้าสาวของเธอเรียบง่ายและสวย", "chut jao-saao khaawng thoe riiap ngaai lae suai", "她的新娘礼服简单又漂亮。"],
  ["yaai-baan", "ย้ายบ้าน", "yaai baan", "搬家", "动词", "搬家", "ครอบครัวเราจะย้ายบ้านไปใกล้โรงเรียน", "khraawp-khrua rao ja yaai baan bpai glai roong-riian", "我们家要搬到学校附近。"],
  ["baan-mai", "บ้านใหม่", "baan mai", "新家；新房", "名词", "搬家", "บ้านใหม่ของเรามีห้องนอนสามห้อง", "baan mai khaawng rao mii haawng-naawn saam haawng", "我们的新家有三间卧室。"],
  ["baan-gao", "บ้านเก่า", "baan gao", "旧家；旧房子", "名词", "搬家", "ฉันยังคิดถึงบ้านเก่าที่อยู่ใกล้ตลาด", "chan yang khit-theung baan gao thii yuu glai dta-laat", "我还想念靠近市场的旧家。"],
  ["gep-khaawng", "เก็บของ", "gep khaawng", "收拾东西", "动词", "搬家", "ก่อนย้ายบ้าน เราต้องเก็บของใส่กล่อง", "gaawn yaai baan rao dtawng gep khaawng sai glaawng", "搬家前，我们要把东西收进箱子。"],
  ["khaawng-yai", "ของใหญ่", "khaawng yai", "大件物品", "名词", "搬家", "ของใหญ่ต้องใช้รถกระบะขนไปบ้านใหม่", "khaawng yai dtawng chai rot-gra-ba khon bpai baan mai", "大件物品要用皮卡运到新家。"],
  ["khaawng-lek", "ของเล็ก", "khaawng lek", "小件物品", "名词", "搬家", "ของเล็กควรใส่ถุงแยกไว้", "khaawng lek khuan sai thung yaaek wai", "小件物品应该分开放进袋子。"],
  ["glaawng-khaawng", "กล่องของ", "glaawng khaawng", "装东西的箱子", "名词", "搬家", "กล่องของใบนี้หนักมาก ต้องยกสองคน", "glaawng khaawng bai nii nak maak dtawng yok saawng khon", "这箱东西很重，要两个人抬。"],
  ["khon-khaawng", "ขนของ", "khon khaawng", "搬运东西", "动词", "搬家", "เพื่อนมาช่วยขนของวันเสาร์", "phuean maa chuai khon khaawng wan sao", "朋友星期六来帮忙搬东西。"],
  ["jat-baan", "จัดบ้าน", "jat baan", "整理家；布置家", "动词", "搬家", "หลังย้ายบ้าน แม่ใช้เวลาสองวันจัดบ้าน", "lang yaai baan maae chai wee-laa saawng wan jat baan", "搬家后，妈妈花两天整理家。"],
  ["baan-yuu-sa-baai", "บ้านอยู่สบาย", "baan yuu sa-baai", "住得舒服的家", "短语", "搬家", "บ้านใหม่นี้อยู่สบายและใกล้สวน", "baan mai nii yuu sa-baai lae glai suan", "这个新家住得舒服，也靠近公园。"],
  ["wan-yut", "วันหยุด", "wan yut", "假日；休息日", "名词", "节日", "วันหยุดนี้เราจะไปเยี่ยมญาติ", "wan-yut nii rao ja bpai yiiam yaat", "这个假日我们要去探亲。"],
  ["wan-yut-yaao", "วันหยุดยาว", "wan yut yaao", "长假", "名词", "节日", "วันหยุดยาวคนเดินทางกลับบ้านเยอะ", "wan-yut yaao khon doen-thaang glap baan yuh", "长假时很多人回家。"],
  ["bpii-mai", "ปีใหม่", "bpii mai", "新年", "名词", "节日", "ปีใหม่ลูกหลานกลับไปไหว้ผู้ใหญ่", "bpii mai luuk-laan glap bpai wai phuu-yai", "新年晚辈们回去拜见长辈。"],
  ["song-graan", "สงกรานต์", "song-graan", "宋干节；泰国新年", "名词", "节日", "สงกรานต์ครอบครัวเรากลับต่างจังหวัด", "song-graan khraawp-khrua rao glap dtaang jang-wat", "宋干节我们家回外府。"],
  ["loi-gra-thong", "ลอยกระทง", "loi gra-thong", "水灯节", "名词", "节日", "คืนลอยกระทงเราไปริมแม่น้ำกับครอบครัว", "khuen loi gra-thong rao bpai rim maae-naam gap khraawp-khrua", "水灯节晚上我们和家人去河边。"],
  ["wan-maae", "วันแม่", "wan maae", "母亲节", "名词", "节日", "วันแม่ฉันให้การ์ดอวยพรกับแม่", "wan maae chan hai gaat uai phaawn gap maae", "母亲节我给妈妈贺卡。"],
  ["wan-phaaw", "วันพ่อ", "wan phaaw", "父亲节", "名词", "节日", "วันพ่อเรากินข้าวพร้อมกันที่บ้าน", "wan phaaw rao gin khaao phraawm gan thii baan", "父亲节我们在家一起吃饭。"],
  ["dtam-bun", "ทำบุญ", "tham bun", "做功德；行善布施", "动词", "节日", "เช้าวันปีใหม่ครอบครัวไปทำบุญที่วัด", "chaao wan bpii mai khraawp-khrua bpai tham bun thii wat", "新年早上全家去寺庙做功德。"],
  ["bpai-wat", "ไปวัด", "bpai wat", "去寺庙", "动词", "节日", "คุณยายชวนเราไปวัดตอนเช้า", "khun-yaai chuan rao bpai wat dtaawn chaao", "外婆约我们早上去寺庙。"],
  ["liiang-phra", "เลี้ยงพระ", "liiang phra", "供僧；请僧用餐", "动词", "节日", "บ้านเราจะเลี้ยงพระในวันขึ้นบ้านใหม่", "baan rao ja liiang phra nai wan kheun baan mai", "我们家乔迁日要供僧。"],
  ["dek", "เด็ก", "dek", "孩子；儿童", "名词", "人生阶段", "เด็กเล็กต้องมีผู้ใหญ่ดูแล", "dek lek dtawng mii phuu-yai duu-laae", "小孩子需要大人照顾。"],
  ["dek-lek", "เด็กเล็ก", "dek lek", "小孩；幼儿", "名词", "人生阶段", "เด็กเล็กนอนกลางวันหลังอาหารเที่ยง", "dek lek naawn glaang-wan lang aa-haan thiiang", "幼儿午饭后睡午觉。"],
  ["wai-run", "วัยรุ่น", "wai run", "青少年", "名词", "人生阶段", "วัยรุ่นหลายคนชอบฟังเพลงและเล่นกีฬา", "wai run laai khon chaawp fang phleeng lae len gii-laa", "很多青少年喜欢听歌和运动。"],
  ["phuu-yai-life", "ผู้ใหญ่", "phuu yai", "成年人；大人", "名词", "人生阶段", "ผู้ใหญ่ในบ้านช่วยกันดูแลเด็ก", "phuu-yai nai baan chuai gan duu-laae dek", "家里的大人一起照顾孩子。"],
  ["khon-charaa", "คนชรา", "khon cha-raa", "老人；年长者", "名词", "人生阶段", "คนชราต้องการเวลาพักผ่อนมากขึ้น", "khon cha-raa dtawng-gaan wee-laa phak-phaawn maak kheun", "老人需要更多休息时间。"],
  ["phuu-suung-aa-yu", "ผู้สูงอายุ", "phuu suung aa-yu", "老年人；高龄者", "名词", "人生阶段", "ผู้สูงอายุควรไปตรวจสุขภาพทุกปี", "phuu suung aa-yu khuan bpai dtruat suk-kha-phaap thuk bpii", "老年人应该每年体检。"],
  ["goet", "เกิด", "goet", "出生；发生", "动词", "人生阶段", "ลูกของพี่สาวเกิดเมื่อเดือนที่แล้ว", "luuk khaawng phii-saao goet muea duean thii laaeo", "姐姐的孩子上个月出生。"],
  ["dtoo-kheun", "โตขึ้น", "dto kheun", "长大；成长", "动词", "人生阶段", "เมื่อโตขึ้น เขาอยากดูแลพ่อแม่", "muea dto kheun khao yaak duu-laae phaaw maae", "长大后，他想照顾父母。"],
  ["rian-jop", "เรียนจบ", "riian jop", "毕业；完成学业", "动词", "人生阶段", "หลังเรียนจบ เธอเริ่มทำงานใกล้บ้าน", "lang riian jop thoe roem tham-ngaan glai baan", "毕业后，她开始在家附近工作。"],
  ["roem-tham-ngaan", "เริ่มทำงาน", "roem tham-ngaan", "开始工作", "动词", "人生阶段", "พี่ชายเริ่มทำงานหลังเรียนจบ", "phii-chaai roem tham-ngaan lang riian jop", "哥哥毕业后开始工作。"],
  ["mii-luuk", "มีลูก", "mii luuk", "有孩子；生育孩子", "短语", "人生阶段", "ครอบครัวนี้มีลูกสองคน", "khraawp-khrua nii mii luuk saawng khon", "这个家庭有两个孩子。"],
  ["liiang-luuk", "เลี้ยงลูก", "liiang luuk", "养孩子；带孩子", "动词", "照顾家人", "พ่อแม่ช่วยกันเลี้ยงลูกอย่างใกล้ชิด", "phaaw maae chuai gan liiang luuk yaang glai chit", "父母一起细心养育孩子。"],
  ["duu-laae", "ดูแล", "duu laae", "照顾", "动词", "照顾家人", "ฉันช่วยแม่ดูแลคุณยายตอนเย็น", "chan chuai maae duu-laae khun-yaai dtaawn yen", "傍晚我帮妈妈照顾外婆。"],
  ["duu-laae-phaaw-maae", "ดูแลพ่อแม่", "duu laae phaaw maae", "照顾父母", "动词", "照顾家人", "เมื่อโตขึ้น เขาอยากดูแลพ่อแม่ให้ดี", "muea dto kheun khao yaak duu-laae phaaw maae hai dii", "长大后，他想好好照顾父母。"],
  ["duu-laae-khun-yaa", "ดูแลคุณย่า", "duu laae khun-yaa", "照顾奶奶/祖母", "动词", "照顾家人", "วันหยุดน้องอยู่บ้านดูแลคุณย่า", "wan-yut naawng yuu baan duu-laae khun-yaa", "假日弟弟在家照顾奶奶。"],
  ["phaak-phuuen", "พักฟื้น", "phak feun", "休养；恢复", "动词", "照顾家人", "หลังออกจากโรงพยาบาล คุณตาพักฟื้นที่บ้าน", "lang aawk jaak roong-pha-yaa-baan khun-dtaa phak feun thii baan", "出院后，外公在家休养。"],
  ["tham-aa-haan-hai", "ทำอาหารให้", "tham aa-haan hai", "做饭给……", "动词", "照顾家人", "แม่ทำอาหารให้คุณยายทุกเช้า", "maae tham aa-haan hai khun-yaai thuk chaao", "妈妈每天早上给外婆做饭。"],
  ["sue-yaa-hai", "ซื้อยาให้", "sue yaa hai", "给……买药", "动词", "照顾家人", "ฉันไปซื้อยาให้พ่อที่ร้านขายยา", "chan bpai sue yaa hai phaaw thii raan khaai yaa", "我去药店给爸爸买药。"],
  ["phaa-bpai-maaw", "พาไปหมอ", "phaa bpai maaw", "带去看医生", "动词", "照顾家人", "พรุ่งนี้เราจะพาคุณยายไปหมอ", "phrung-nii rao ja phaa khun-yaai bpai maaw", "明天我们要带外婆去看医生。"],
  ["phaa-bpai-roong-pha-yaa-baan", "พาไปโรงพยาบาล", "phaa bpai roong pha-yaa-baan", "带去医院", "动词", "照顾家人", "ถ้าไข้ไม่ลด ต้องพาน้องไปโรงพยาบาล", "thaa khai mai lot dtawng phaa naawng bpai roong-pha-yaa-baan", "如果烧不退，得带弟弟去医院。"],
  ["yuu-bpen-phuean", "อยู่เป็นเพื่อน", "yuu bpen phuean", "陪着；陪伴", "动词", "照顾家人", "ฉันอยู่เป็นเพื่อนคุณยายตอนแม่ไปตลาด", "chan yuu bpen phuean khun-yaai dtaawn maae bpai dta-laat", "妈妈去市场时，我陪着外婆。"],
  ["chuai-ngaan-baan", "ช่วยงานบ้าน", "chuai ngaan baan", "帮做家务", "动词", "照顾家人", "ลูก ๆ ช่วยงานบ้านหลังเลิกเรียน", "luuk luuk chuai ngaan baan lang loek riian", "孩子们放学后帮做家务。"],
  ["chuai-luea-khraaop-khrua", "ช่วยเหลือครอบครัว", "chuai leuua khraawp khrua", "帮助家人；支持家庭", "动词", "照顾家人", "ทุกคนควรช่วยเหลือครอบครัวเมื่อมีปัญหา", "thuk khon khuan chuai-leuua khraawp-khrua muea mii bpan-haa", "有问题时每个人都应该帮助家人。"],
  ["pen-huang", "เป็นห่วง", "bpen huang", "担心；牵挂", "动词", "照顾家人", "แม่เป็นห่วงลูกเมื่อกลับบ้านดึก", "maae bpen huang luuk muea glap baan deuk", "孩子晚回家时，妈妈很担心。"],
  ["phuu-duu-laae", "ผู้ดูแล", "phuu duu laae", "照顾者；看护人", "名词", "照顾家人", "ผู้ดูแลช่วยคุณตากินยาให้ตรงเวลา", "phuu duu-laae chuai khun-dtaa gin yaa hai dtrong wee-laa", "照顾者帮助外公按时吃药。"],
  ["khon-khai-nai-baan", "คนไข้ในบ้าน", "khon khai nai baan", "家中的病人", "名词", "照顾家人", "เราต้องพูดเบา ๆ เพราะมีคนไข้ในบ้าน", "rao dtawng phuut bao bao phraw mii khon khai nai baan", "我们要小声说话，因为家里有病人。"],
  ["yaa-prajam", "ยาประจำ", "yaa bpra-jam", "常用药；固定吃的药", "名词", "照顾家人", "คุณยายต้องกินยาประจำหลังอาหารเช้า", "khun-yaai dtawng gin yaa bpra-jam lang aa-haan chaao", "外婆必须早饭后吃常用药。"],
  ["dtruat-suk-kha-phaap", "ตรวจสุขภาพ", "dtruat suk-kha-phaap", "体检；检查健康", "动词", "照顾家人", "พ่อพาคุณตาไปตรวจสุขภาพทุกปี", "phaaw phaa khun-dtaa bpai dtruat suk-kha-phaap thuk bpii", "爸爸每年带外公去体检。"],
  ["mii-khwaam-suk", "มีความสุข", "mii khwaam-suk", "幸福；开心", "短语", "家庭聚会", "ทุกคนมีความสุขเมื่อได้อยู่พร้อมหน้า", "thuk khon mii khwaam-suk muea dai yuu phraawm-naa", "大家团聚时都很幸福。"],
  ["yuu-phraawm-naa", "อยู่พร้อมหน้า", "yuu phraawm naa", "全家到齐；团聚在一起", "短语", "家庭聚会", "ปีใหม่ครอบครัวเราอยู่พร้อมหน้า", "bpii mai khraawp-khrua rao yuu phraawm-naa", "新年我们全家团聚在一起。"],
  ["khui-gan", "คุยกัน", "khui gan", "聊天；互相交谈", "动词", "家庭聚会", "หลังอาหารญาติ ๆ นั่งคุยกันนาน", "lang aa-haan yaat yaat nang khui gan naan", "饭后亲戚们坐着聊了很久。"],
  ["tham-aa-haan-ruam-gan", "ทำอาหารร่วมกัน", "tham aa-haan ruam gan", "一起做饭", "动词", "家庭聚会", "วันหยุดพวกเราทำอาหารร่วมกันที่บ้าน", "wan-yut phuak rao tham aa-haan ruam gan thii baan", "假日我们在家一起做饭。"],
  ["dtriiam-ngaan", "เตรียมงาน", "dtriiam ngaan", "筹备活动；准备事情", "动词", "家庭聚会", "พี่น้องช่วยกันเตรียมงานวันเกิดให้แม่", "phii naawng chuai gan dtriiam ngaan wan-goet hai maae", "兄弟姐妹一起为妈妈准备生日会。"],
  ["jaak-laa", "จากลา", "jaak laa", "告别；离别", "动词", "人生阶段", "ก่อนกลับบ้านต่างจังหวัด เราจากลากันหน้าสถานี", "gaawn glap baan dtaang jang-wat rao jaak laa gan naa sa-thaa-nii", "回外府前，我们在车站前告别。"],
  ["jam-wan-sam-khan", "จำวันสำคัญ", "jam wan sam-khan", "记住重要日子", "动词", "节日", "เขาจำวันสำคัญของครอบครัวได้เสมอ", "khao jam wan sam-khan khaawng khraawp-khrua dai sa-moe", "他总能记住家里的重要日子。"],
  ["wan-sam-khan", "วันสำคัญ", "wan sam-khan", "重要日子；纪念日", "名词", "节日", "วันเกิดและวันปีใหม่เป็นวันสำคัญของบ้านเรา", "wan-goet lae wan bpii mai bpen wan sam-khan khaawng baan rao", "生日和新年是我们家的重要日子。"],
];

const relatedByTheme: Record<VocabularyExpansionTheme, VocabularyExpansionRelated> = {
  生日: { thai: "วันเกิด", roman: "wan-goet", chinese: "生日" },
  结婚: { thai: "งานแต่งงาน", roman: "ngaan dtaeng-ngaan", chinese: "婚礼" },
  搬家: { thai: "ย้ายบ้าน", roman: "yaai baan", chinese: "搬家" },
  探亲: { thai: "เยี่ยมญาติ", roman: "yiiam yaat", chinese: "探亲" },
  家庭聚会: { thai: "ครอบครัว", roman: "khraawp-khrua", chinese: "家庭" },
  节日: { thai: "วันหยุด", roman: "wan-yut", chinese: "假日" },
  礼物: { thai: "ของขวัญ", roman: "khaawng-khwan", chinese: "礼物" },
  人生阶段: { thai: "โตขึ้น", roman: "dto kheun", chinese: "长大" },
  照顾家人: { thai: "ดูแล", roman: "duu-laae", chinese: "照顾" },
};

const buildCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];
  const comparison = { kind: "usage" as const, target: related, distinctionZh: `${row[1]} 是“${row[5]}”场景里的基础表达；和 ${related.thai} 对照记，可以帮助区分生日、探亲、搬家、节日和照顾家人的常用说法。` };
  const example = { thai: row[6], roman: row[7], chinese: row[8] };
  const collocations = [{ thai: row[1], roman: row[2], chinese: row[3] }, { thai: related.thai, roman: related.roman, chinese: related.chinese }];
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
    sourceRefs: FAMILY_EVENTS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_FAMILY_EVENTS_LIFE_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
