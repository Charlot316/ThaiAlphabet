type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "孩子照顾" | "接送上学" | "作业学习" | "校服用品" | "老师通知" | "生病请假" | "家长沟通" | "学校生活";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2ChildcareSchoolLifeCandidate = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: PartOfSpeech;
  theme: Theme;
  level: "a2";
  priority: number;
  senses: Sense[];
  synonyms: Related[];
  antonyms: Related[];
  comparisons: Comparison[];
  collocations: Collocation[];
  usageNotesZh: string[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: "candidate-draft";
};

type Row = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: PartOfSpeech;
  theme: Theme;
  exampleThai: string;
  exampleRoman: string;
  exampleChinese: string;
  tag: string;
};

const SOURCE_REFS = ["thai-frequency", "thai-childcare-school-life-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2ChildcareSchoolLifeCandidate {
  const related = rows[(index + 1) % rows.length];
  return {
    id: row.id,
    thai: row.thai,
    roman: row.roman,
    chinese: row.chinese,
    partOfSpeech: row.partOfSpeech,
    theme: row.theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于孩子照顾、学校通知、接送或家长和老师之间的日常沟通。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，学校生活中要分清照顾动作、学习任务和通知内容。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["和老师或家长沟通时，可加 ครับ/ค่ะ、รบกวน、ช่วย เพื่อให้语气更礼貌自然。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
song-luuk-bpai-roong-riian|ส่งลูกไปโรงเรียน|song luuk bpai roong-riian|送孩子去学校|动词|接送上学|ทุกเช้าพ่อส่งลูกไปโรงเรียนก่อนเข้างาน|thuk chaao phaaw song luuk bpai roong-riian gaawn khao ngaan|每天早上爸爸上班前送孩子去学校。|接送
rap-luuk-lang-riian|รับลูกหลังเรียน|rap luuk lang riian|放学后接孩子|动词|接送上学|วันนี้แม่จะรับลูกหลังเรียนที่ประตูหน้า|wan-nii mae ja rap luuk lang riian thii bpra-dtuu naa|今天妈妈会在正门放学后接孩子。|接送
bpai-song-thii-naa-roong-riian|ไปส่งที่หน้าโรงเรียน|bpai song thii naa roong-riian|送到校门口|动词|接送上学|คุณตาไปส่งหลานที่หน้าโรงเรียนตอนเจ็ดโมงครึ่ง|khun dtaa bpai song laan thii naa roong-riian dtaawn jet moong khreung|外公七点半把孙子送到校门口。|接送
bpra-dtuu-roong-riian|ประตูโรงเรียน|bpra-dtuu roong-riian|学校大门|名词|接送上学|เด็ก ๆ รอผู้ปกครองที่ประตูโรงเรียนหลังเลิกเรียน|dek dek raaw phuu-bpok-khraawng thii bpra-dtuu roong-riian lang loek riian|孩子们放学后在学校大门等家长。|地点
lot-rap-song-nak-riian|รถรับส่งนักเรียน|rot rap-song nak-riian|校车|名词|接送上学|รถรับส่งนักเรียนมาถึงหมู่บ้านตรงเวลาทุกวัน|rot rap-song nak-riian maa theung muu-baan dtrong wee-laa thuk wan|校车每天准时到小区。|交通
khuu-rot|ครูรถ|khruu rot|校车随车老师|名词|接送上学|ครูรถโทรบอกแม่ว่าเด็กขึ้นรถเรียบร้อยแล้ว|khruu rot thoo baawk mae waa dek kheun rot riap-raawy laeo|校车随车老师打电话告诉妈妈孩子已上车。|交通
kheun-rot-roong-riian|ขึ้นรถโรงเรียน|kheun rot roong-riian|上校车|动词|接送上学|ลูกต้องขึ้นรถโรงเรียนก่อนเจ็ดโมงสิบห้า|luuk dtawng kheun rot roong-riian gaawn jet moong sip-haa|孩子必须七点十五前上校车。|交通
long-rot-roong-riian|ลงรถโรงเรียน|long rot roong-riian|下校车|动词|接送上学|เมื่อถึงบ้าน เด็กต้องลงรถโรงเรียนอย่างระวัง|meua theung baan dek dtawng long rot roong-riian yaang ra-wang|到家时，孩子要小心下校车。|交通
khaa-rot-roong-riian|ค่ารถโรงเรียน|khaa rot roong-riian|校车费|名词|接送上学|โรงเรียนให้จ่ายค่ารถโรงเรียนก่อนสิ้นเดือน|roong-riian hai jaai khaa rot roong-riian gaawn sin deuan|学校要求月底前支付校车费。|费用
ma-saai-roong-riian|มาสายโรงเรียน|maa saai roong-riian|上学迟到|短语|接送上学|ถ้าฝนตกหนัก เด็กอาจมาสายโรงเรียนเล็กน้อย|thaa fon dtok nak dek aat maa saai roong-riian lek naawy|如果下大雨，孩子可能会稍微上学迟到。|时间
maa-thung-reo|มาถึงเร็ว|maa theung reo|早到|动词|接送上学|วันนี้ลูกมาถึงเร็ว จึงมีเวลาอ่านหนังสือก่อนเรียน|wan-nii luuk maa theung reo jeung mii wee-laa aan nang-seu gaawn riian|今天孩子早到，所以有时间上课前看书。|时间
loek-riian|เลิกเรียน|loek riian|放学|动词|学校生活|โรงเรียนเลิกเรียนบ่ายสามโมงครึ่งทุกวันศุกร์|roong-riian loek riian baai saam moong khreung thuk wan-suk|学校每周五下午三点半放学。|时间
we-laa-loek-riian|เวลาเลิกเรียน|wee-laa loek riian|放学时间|名词|接送上学|กรุณาเช็กเวลาเลิกเรียนในไลน์กลุ่มผู้ปกครอง|ga-ru-naa chek wee-laa loek riian nai lai glum phuu-bpok-khraawng|请在家长群里查看放学时间。|时间
we-laa-khao-riian|เวลาเข้าเรียน|wee-laa khao riian|上课时间|名词|接送上学|เวลาเข้าเรียนคือแปดโมง เด็กควรมาก่อนสิบนาที|wee-laa khao riian kheu bpaet moong dek khuan maa gaawn sip naa-thii|上课时间是八点，孩子应该提前十分钟到。|时间
khao-haawng-riian|เข้าห้องเรียน|khao haawng riian|进教室|动词|学校生活|หลังเคารพธงชาติ เด็ก ๆ เข้าห้องเรียนอย่างเป็นแถว|lang khao-rop thong-chaat dek dek khao haawng riian yaang bpen thaeo|升旗后，孩子们排队进教室。|课堂
aawk-haawng-riian|ออกห้องเรียน|aawk haawng riian|离开教室|动词|学校生活|ครูให้เด็กออกห้องเรียนหลังเก็บของเสร็จ|khruu hai dek aawk haawng riian lang gep khaawng set|老师让孩子们收好东西后离开教室。|课堂
haawng-riian-khaawng-luuk|ห้องเรียนของลูก|haawng riian khaawng luuk|孩子的教室|名词|学校生活|ห้องเรียนของลูกอยู่ชั้นสองใกล้ห้องสมุด|haawng riian khaawng luuk yuu chan saawng glai haawng-sa-mut|孩子的教室在二楼，靠近图书馆。|地点
kruu-pra-jam-chan|ครูประจำชั้น|khruu bpra-jam chan|班主任|名词|老师通知|ครูประจำชั้นส่งประกาศเรื่องทัศนศึกษาให้ผู้ปกครอง|khruu bpra-jam chan song bpra-gaat reuuang that-sa-na-seuk-saa hai phuu-bpok-khraawng|班主任把校外参观通知发给家长。|老师
kruu-phaasaa-thai|ครูภาษาไทย|khruu phaa-saa thai|泰语老师|名词|学校生活|ครูภาษาไทยให้เด็กอ่านนิทานสั้น ๆ ที่บ้าน|khruu phaa-saa thai hai dek aan ni-thaan san san thii baan|泰语老师让孩子在家读短故事。|老师
kruu-phuu-chuai|ครูผู้ช่วย|khruu phuu chuai|助教老师|名词|学校生活|ครูผู้ช่วยช่วยดูเด็กเล็กตอนกินข้าวกลางวัน|khruu phuu chuai chuai duu dek lek dtaawn gin khaao glaang-wan|助教老师在午饭时帮忙看小孩。|老师
phuu-bpok-khraawng|ผู้ปกครอง|phuu-bpok-khraawng|家长|名词|家长沟通|ผู้ปกครองควรอ่านประกาศจากโรงเรียนทุกวัน|phuu-bpok-khraawng khuan aan bpra-gaat jaak roong-riian thuk wan|家长应该每天阅读学校通知。|家长
glum-phuu-bpok-khraawng|กลุ่มผู้ปกครอง|glum phuu-bpok-khraawng|家长群|名词|家长沟通|ครูส่งรูปกิจกรรมวันนี้ในกลุ่มผู้ปกครอง|khruu song ruup git-ja-gam wan-nii nai glum phuu-bpok-khraawng|老师把今天活动照片发到家长群里。|群聊
jaeng-kruu|แจ้งครู|jaeng khruu|通知老师|动词|家长沟通|ถ้าลูกไม่สบาย กรุณาแจ้งครูก่อนเริ่มเรียน|thaa luuk mai sa-baai ga-ru-naa jaeng khruu gaawn roem riian|如果孩子不舒服，请上课前通知老师。|沟通
thaam-kruu|ถามครู|thaam khruu|问老师|动词|家长沟通|ฉันถามครูว่าพรุ่งนี้ต้องใส่ชุดพละหรือไม่|chan thaam khruu waa phrung-nii dtawng sai chut pha-la reu mai|我问老师明天是否要穿体育服。|沟通
dtaawp-kruu|ตอบครู|dtaawp khruu|回复老师|动词|家长沟通|แม่ตอบครูว่าได้รับประกาศเรื่องงานโรงเรียนแล้ว|mae dtaawp khruu waa dai rap bpra-gaat reuuang ngaan roong-riian laeo|妈妈回复老师说已收到学校活动通知。|沟通
khaaw-phop-kruu|ขอพบครู|khaaw phop khruu|请求见老师|动词|家长沟通|พ่อขอพบครูหลังเลิกเรียนเพื่อคุยเรื่องการบ้าน|phaaw khaaw phop khruu lang loek riian phuea khui reuuang gaan-baan|爸爸请求放学后见老师，谈作业的事。|沟通
kui-gab-kruu|คุยกับครู|khui gap khruu|和老师沟通|动词|家长沟通|ถ้าเด็กไม่อยากไปโรงเรียน ควรคุยกับครูอย่างใจเย็น|thaa dek mai yaak bpai roong-riian khuan khui gap khruu yaang jai-yen|如果孩子不想上学，应该冷静地和老师沟通。|沟通
khaaw-kham-nae-nam-jaak-kruu|ขอคำแนะนำจากครู|khaaw kham-nae-nam jaak khruu|向老师请教建议|动词|家长沟通|แม่ขอคำแนะนำจากครูเรื่องการอ่านของลูก|mae khaaw kham-nae-nam jaak khruu reuuang gaan aan khaawng luuk|妈妈就孩子阅读的问题向老师请教建议。|沟通
pra-gaat-roong-riian|ประกาศโรงเรียน|bpra-gaat roong-riian|学校通知|名词|老师通知|ประกาศโรงเรียนบอกว่าพรุ่งนี้หยุดหนึ่งวัน|bpra-gaat roong-riian baawk waa phrung-nii yut neung wan|学校通知说明天放假一天。|通知
khaaw-khwaam-jaak-kruu|ข้อความจากครู|khaaw-khwaam jaak khruu|老师发来的消息|名词|老师通知|ฉันอ่านข้อความจากครูแล้วรีบเตรียมสมุดให้ลูก|chan aan khaaw-khwaam jaak khruu laeo riip dtriiam sa-mut hai luuk|我读了老师发来的消息后，赶紧给孩子准备本子。|通知
bai-jaeng-khaao|ใบแจ้งข่าว|bai jaeng khaao|通知单|名词|老师通知|ลูกนำใบแจ้งข่าวเรื่องประชุมผู้ปกครองกลับบ้าน|luuk nam bai jaeng khaao reuuang bpra-chum phuu-bpok-khraawng glap baan|孩子把家长会通知单带回家。|通知
long-cheu-rap-saap|ลงชื่อรับทราบ|long cheu rap-saap|签名知悉|动词|老师通知|ผู้ปกครองต้องลงชื่อรับทราบในใบประกาศ|phuu-bpok-khraawng dtawng long cheu rap-saap nai bai bpra-gaat|家长需要在通知单上签名知悉。|通知
song-bai-glap-roong-riian|ส่งใบกลับโรงเรียน|song bai glap roong-riian|把回执交回学校|动词|老师通知|กรุณาส่งใบกลับโรงเรียนภายในวันศุกร์นี้|ga-ru-naa song bai glap roong-riian phaai-nai wan-suk nii|请在本周五内把回执交回学校。|通知
bai-anuyat|ใบอนุญาต|bai a-nu-yaat|许可单|名词|老师通知|กิจกรรมนอกโรงเรียนต้องมีใบอนุญาตจากผู้ปกครอง|git-ja-gam naawk roong-riian dtawng mii bai a-nu-yaat jaak phuu-bpok-khraawng|校外活动需要家长许可单。|通知
bpra-chum-phuu-bpok-khraawng|ประชุมผู้ปกครอง|bpra-chum phuu-bpok-khraawng|家长会|名词|家长沟通|วันเสาร์นี้มีประชุมผู้ปกครองที่ห้องประชุมใหญ่|wan-sao nii mii bpra-chum phuu-bpok-khraawng thii haawng bpra-chum yai|这周六在大会议室有家长会。|会议
chut-nak-riian|ชุดนักเรียน|chut nak-riian|校服|名词|校服用品|ลูกต้องใส่ชุดนักเรียนสะอาดทุกวันจันทร์|luuk dtawng sai chut nak-riian sa-aat thuk wan-jan|孩子每周一要穿干净校服。|校服
chut-pha-la|ชุดพละ|chut pha-la|体育服|名词|校服用品|พรุ่งนี้มีวิชาพละ เด็กต้องใส่ชุดพละมาโรงเรียน|phrung-nii mii wi-chaa pha-la dek dtawng sai chut pha-la maa roong-riian|明天有体育课，孩子要穿体育服来学校。|校服
rong-thaao-nak-riian|รองเท้านักเรียน|raawng-thaao nak-riian|学生鞋|名词|校服用品|รองเท้านักเรียนของลูกคับแล้ว ต้องซื้อคู่ใหม่|raawng-thaao nak-riian khaawng luuk khap laeo dtawng seu khuu mai|孩子的学生鞋紧了，需要买一双新的。|校服
thung-thaao-nak-riian|ถุงเท้านักเรียน|thung-thaao nak-riian|学生袜|名词|校服用品|แม่เตรียมถุงเท้านักเรียนสีขาวไว้สองคู่|mae dtriiam thung-thaao nak-riian sii khaao wai saawng khuu|妈妈准备了两双白色学生袜。|校服
gra-bpao-nak-riian|กระเป๋านักเรียน|gra-bpao nak-riian|书包|名词|校服用品|กระเป๋านักเรียนหนักมากเพราะมีหนังสือหลายเล่ม|gra-bpao nak-riian nak maak phraw mii nang-seu laai lem|书包很重，因为里面有很多本书。|用品
bpai-chue|ป้ายชื่อ|bpaai cheu|姓名牌|名词|校服用品|โรงเรียนให้ติดป้ายชื่อบนเสื้อนักเรียน|roong-riian hai dtit bpaai cheu bon seua nak-riian|学校要求把姓名牌贴在校服上。|用品
rian-khaawng-luuk|เรียนของลูก|riian khaawng luuk|孩子的课程|名词|学校生活|วันนี้เรียนของลูกมีคณิตและภาษาไทย|wan-nii riian khaawng luuk mii kha-nit lae phaa-saa thai|今天孩子的课程有数学和泰语。|课程
dtaa-raang-riian|ตารางเรียน|dtaa-raang riian|课程表|名词|学校生活|แม่ดูตารางเรียนก่อนจัดกระเป๋าให้ลูก|mae duu dtaa-raang riian gaawn jat gra-bpao hai luuk|妈妈给孩子整理书包前先看课程表。|课程
wi-chaa-phaa-saa|วิชาภาษา|wi-chaa phaa-saa|语言课|名词|学校生活|ลูกชอบวิชาภาษาเพราะครูให้ร้องเพลงด้วย|luuk chaawp wi-chaa phaa-saa phraw khruu hai raawng phleeng duai|孩子喜欢语言课，因为老师还让唱歌。|课程
wi-chaa-kha-nit|วิชาคณิต|wi-chaa kha-nit|数学课|名词|学校生活|วิชาคณิตวันนี้มีการบ้านสองหน้า|wi-chaa kha-nit wan-nii mii gaan-baan saawng naa|今天数学课有两页作业。|课程
wi-chaa-sin-la-pa|วิชาศิลปะ|wi-chaa sin-la-bpa|美术课|名词|学校生活|พรุ่งนี้มีวิชาศิลปะ เด็กต้องเอาสีไม้ไปด้วย|phrung-nii mii wi-chaa sin-la-bpa dek dtawng ao sii-maai bpai duai|明天有美术课，孩子要带彩色铅笔。|课程
wi-chaa-pha-la|วิชาพละ|wi-chaa pha-la|体育课|名词|学校生活|วิชาพละวันนี้ครูให้เด็กวิ่งรอบสนาม|wi-chaa pha-la wan-nii khruu hai dek wing raawp sa-naam|今天体育课老师让孩子绕操场跑步。|课程
gaan-baan-wan-nii|การบ้านวันนี้|gaan-baan wan-nii|今天的作业|名词|作业学习|การบ้านวันนี้คืออ่านหนังสือหน้าแปดถึงสิบ|gaan-baan wan-nii kheu aan nang-seu naa bpaet theung sip|今天的作业是读第八到第十页。|作业
tham-gaan-baan|ทำการบ้าน|tham gaan-baan|做作业|动词|作业学习|ลูกทำการบ้านหลังอาบน้ำและกินข้าวเย็น|luuk tham gaan-baan lang aap naam lae gin khaao yen|孩子洗澡和吃晚饭后做作业。|作业
song-gaan-baan|ส่งการบ้าน|song gaan-baan|交作业|动词|作业学习|ครูให้ส่งการบ้านก่อนเข้าแถวตอนเช้า|khruu hai song gaan-baan gaawn khao thaeo dtaawn chaao|老师要求早上排队前交作业。|作业
leum-gaan-baan|ลืมการบ้าน|leum gaan-baan|忘记作业|动词|作业学习|ลูกลืมการบ้านไว้ที่บ้าน จึงบอกครูตอนเช้า|luuk leum gaan-baan wai thii baan jeung baawk khruu dtaawn chaao|孩子把作业忘在家里了，所以早上告诉老师。|作业
gae-gaan-baan|แก้การบ้าน|gae gaan-baan|订正作业|动词|作业学习|ครูให้เด็กแก้การบ้านที่ทำผิดสามข้อ|khruu hai dek gae gaan-baan thii tham phit saam khaaw|老师让孩子订正做错的三道作业。|作业
truat-gaan-baan|ตรวจการบ้าน|dtruat gaan-baan|检查作业|动词|作业学习|แม่ตรวจการบ้านให้ลูกก่อนเข้านอนทุกคืน|mae dtruat gaan-baan hai luuk gaawn khao naawn thuk kheun|妈妈每晚睡前给孩子检查作业。|作业
aan-nang-seu-hai-fang|อ่านหนังสือให้ฟัง|aan nang-seu hai fang|读书给别人听|动词|作业学习|ลูกอ่านหนังสือให้แม่ฟังวันละสิบนาที|luuk aan nang-seu hai mae fang wan la sip naa-thii|孩子每天读书给妈妈听十分钟。|阅读
fuek-aan|ฝึกอ่าน|feuk aan|练习阅读|动词|作业学习|ครูบอกให้เด็กฝึกอ่านคำง่าย ๆ ที่บ้าน|khruu baawk hai dek feuk aan kham ngaai ngaai thii baan|老师让孩子在家练习读简单词。|阅读
fuek-khian|ฝึกเขียน|feuk khiian|练习写字|动词|作业学习|วันนี้ลูกฝึกเขียนชื่อของตัวเองสามรอบ|wan-nii luuk feuk khiian cheu khaawng dtua-eeng saam raawp|今天孩子练习写自己的名字三遍。|写字
khat-laai-meu|คัดลายมือ|khat laai-meu|练字|动词|作业学习|การบ้านภาษาไทยคือคัดลายมือหนึ่งหน้า|gaan-baan phaa-saa thai kheu khat laai-meu neung naa|泰语作业是练一页字。|写字
tham-baep-fuek-hat|ทำแบบฝึกหัด|tham baep-feuk-hat|做练习题|动词|作业学习|เด็กทำแบบฝึกหัดคณิตหลังอ่านโจทย์ช้า ๆ|dek tham baep-feuk-hat kha-nit lang aan joot chaa chaa|孩子慢慢读题后做数学练习题。|练习
sam-mut-gaan-baan|สมุดการบ้าน|sa-mut gaan-baan|作业本|名词|校服用品|สมุดการบ้านอยู่ในกระเป๋าช่องหน้า|sa-mut gaan-baan yuu nai gra-bpao chaawng naa|作业本在书包前面的口袋里。|用品
nang-seu-riian|หนังสือเรียน|nang-seu riian|课本|名词|校服用品|คืนนี้ต้องเอาหนังสือเรียนภาษาไทยออกมาอ่าน|khuen-nii dtawng ao nang-seu riian phaa-saa thai aawk maa aan|今晚要把泰语课本拿出来读。|用品
din-saw-sii|ดินสอสี|din-saaw sii|彩色铅笔|名词|校服用品|ลูกเอาดินสอสีไปโรงเรียนสำหรับวิชาศิลปะ|luuk ao din-saaw sii bpai roong-riian sam-rap wi-chaa sin-la-bpa|孩子带彩色铅笔去学校上美术课。|用品
yaa-lop|ยางลบ|yaa-lop|橡皮|名词|校服用品|ยางลบหายอีกแล้ว แม่จึงเขียนชื่อลูกบนกล่อง|yaa-lop haai iik laeo mae jeung khiian cheu luuk bon glaawng|橡皮又丢了，所以妈妈在盒子上写孩子名字。|用品
din-saw|ดินสอ|din-saaw|铅笔|名词|校服用品|ครูให้เตรียมดินสอสองแท่งสำหรับสอบสั้น ๆ|khruu hai dtriiam din-saaw saawng thaeng sam-rap saawp san san|老师让准备两支铅笔用于小测验。|用品
bpaa-gaa|ปากกา|bpaa-gaa|笔|名词|校服用品|นักเรียนโตใช้ปากกาเขียนชื่อบนใบงาน|nak-riian dto chai bpaa-gaa khiian cheu bon bai-ngaan|大一点的学生用笔在练习纸上写名字。|用品
maai-ban-that|ไม้บรรทัด|maai-ban-that|尺子|名词|校服用品|อย่าลืมเอาไม้บรรทัดไปเรียนคณิตพรุ่งนี้|yaa leum ao maai-ban-that bpai riian kha-nit phrung-nii|别忘了明天带尺子去上数学课。|用品
gra-tik-naam|กระติกน้ำ|gra-dtik naam|水壶|名词|孩子照顾|แม่เติมน้ำในกระติกน้ำให้ลูกทุกเช้า|mae dterm naam nai gra-dtik naam hai luuk thuk chaao|妈妈每天早上给孩子的水壶装水。|照顾
glawng-khaao|กล่องข้าว|glaawng khaao|饭盒|名词|孩子照顾|วันนี้ในกล่องข้าวมีไข่เจียวและผลไม้|wan-nii nai glaawng khaao mii khai-jiao lae phon-la-maai|今天饭盒里有煎蛋和水果。|午餐
aa-haan-glaang-wan|อาหารกลางวัน|aa-haan glaang-wan|午餐|名词|学校生活|โรงเรียนมีอาหารกลางวันให้เด็กทุกคน|roong-riian mii aa-haan glaang-wan hai dek thuk khon|学校给所有孩子提供午餐。|午餐
ngoen-khaa-khanom|เงินค่าขนม|ngoen khaa kha-nom|零花钱|名词|学校生活|พ่อให้เงินค่าขนมลูกวันละยี่สิบบาท|phaaw hai ngoen khaa kha-nom luuk wan la yii-sip baat|爸爸每天给孩子二十泰铢零花钱。|费用
reuua-ngin-hai-kruu|เรื่องเงินให้ครู|reuuang ngoen hai khruu|交给老师的钱款事项|短语|学校生活|เรื่องเงินให้ครูต้องใส่ซองและเขียนชื่อเด็ก|reuuang ngoen hai khruu dtawng sai saawng lae khiian cheu dek|交给老师的钱要放进信封并写孩子名字。|费用
chuai-luuk-dtaeng-dtua|ช่วยลูกแต่งตัว|chuai luuk dtaeng dtua|帮孩子穿衣|动词|孩子照顾|เช้านี้ลูกง่วงมาก แม่จึงช่วยลูกแต่งตัว|chaao-nii luuk nguang maak mae jeung chuai luuk dtaeng dtua|今天早上孩子很困，所以妈妈帮孩子穿衣。|照顾
pluk-luuk|ปลุกลูก|bpluk luuk|叫醒孩子|动词|孩子照顾|พ่อปลุกลูกตอนหกโมงเพื่อเตรียมไปโรงเรียน|phaaw bpluk luuk dtaawn hok moong phuea dtriiam bpai roong-riian|爸爸六点叫醒孩子准备去学校。|早晨
du-lae-dek|ดูแลเด็ก|duu-laae dek|照顾孩子|动词|孩子照顾|คุณยายช่วยดูแลเด็กหลังเลิกเรียนจนแม่กลับบ้าน|khun yaai chuai duu-laae dek lang loek riian jon mae glap baan|外婆放学后帮忙照顾孩子，直到妈妈回家。|照顾
hai-dek-gin-khaao|ให้เด็กกินข้าว|hai dek gin khaao|让孩子吃饭|动词|孩子照顾|ก่อนทำการบ้าน ควรให้เด็กกินข้าวเย็นก่อน|gaawn tham gaan-baan khuan hai dek gin khaao yen gaawn|做作业前，应该先让孩子吃晚饭。|照顾
hai-dek-aap-naam|ให้เด็กอาบน้ำ|hai dek aap naam|让孩子洗澡|动词|孩子照顾|หลังกลับจากโรงเรียน แม่ให้เด็กอาบน้ำทันที|lang glap jaak roong-riian mae hai dek aap naam than-thii|从学校回来后，妈妈马上让孩子洗澡。|照顾
hai-dek-naawn|ให้เด็กนอน|hai dek naawn|让孩子睡觉|动词|孩子照顾|ถ้าพรุ่งนี้มีเรียน ควรให้เด็กนอนก่อนสามทุ่ม|thaa phrung-nii mii riian khuan hai dek naawn gaawn saam thum|如果明天有课，应该让孩子九点前睡觉。|照顾
naawn-glang-wan|นอนกลางวัน|naawn glaang-wan|午睡|动词|孩子照顾|เด็กเล็กนอนกลางวันที่โรงเรียนประมาณหนึ่งชั่วโมง|dek lek naawn glaang-wan thii roong-riian bpra-maan neung chua-moong|小孩子在学校午睡大约一小时。|照顾
pha-dek-bpai-haawng-naam|พาเด็กไปห้องน้ำ|phaa dek bpai haawng-naam|带孩子去洗手间|动词|孩子照顾|ครูผู้ช่วยพาเด็กไปห้องน้ำก่อนนอนกลางวัน|khruu phuu chuai phaa dek bpai haawng-naam gaawn naawn glaang-wan|助教老师午睡前带孩子去洗手间。|照顾
dek-rong-hai|เด็กร้องไห้|dek raawng-hai|孩子哭了|短语|孩子照顾|เด็กร้องไห้เพราะคิดถึงแม่ในวันแรกของโรงเรียน|dek raawng-hai phraw khit-theung mae nai wan raek khaawng roong-riian|开学第一天孩子哭了，因为想妈妈。|情绪
dek-nguang|เด็กง่วง|dek nguang|孩子困了|短语|孩子照顾|เด็กง่วงมากหลังเล่นกลางแจ้งทั้งเช้า|dek nguang maak lang len glaang-jaeng thang chaao|孩子整个上午在户外玩后很困。|情绪
dek-hio|เด็กหิว|dek hiu|孩子饿了|短语|孩子照顾|ถ้าเด็กหิวก่อนเวลาอาหาร ให้กินผลไม้เล็กน้อย|thaa dek hiu gaawn wee-laa aa-haan hai gin phon-la-maai lek naawy|如果孩子饭点前饿了，就吃一点水果。|情绪
dek-mai-sa-baai|เด็กไม่สบาย|dek mai sa-baai|孩子不舒服|短语|生病请假|วันนี้เด็กไม่สบาย แม่จึงให้พักที่บ้าน|wan-nii dek mai sa-baai mae jeung hai phak thii baan|今天孩子不舒服，所以妈妈让他在家休息。|生病
luuk-mii-khai|ลูกมีไข้|luuk mii khai|孩子发烧|短语|生病请假|ลูกมีไข้ตั้งแต่เมื่อคืน จึงไปโรงเรียนไม่ได้|luuk mii khai dtang-dtae meua-kheun jeung bpai roong-riian mai dai|孩子从昨晚开始发烧，所以不能去学校。|生病
luuk-jep-khaaw|ลูกเจ็บคอ|luuk jep khaaw|孩子喉咙痛|短语|生病请假|ลูกเจ็บคอและไอ ครูบอกให้พักผ่อนก่อน|luuk jep khaaw lae ai khruu baawk hai phak-phaawn gaawn|孩子喉咙痛还咳嗽，老师说先休息。|生病
luuk-bpuat-thaawng|ลูกปวดท้อง|luuk bpuat thaawng|孩子肚子痛|短语|生病请假|ถ้าลูกปวดท้องมาก ต้องพาไปคลินิกใกล้บ้าน|thaa luuk bpuat thaawng maak dtawng phaa bpai khli-nik glai baan|如果孩子肚子很痛，要带去附近诊所。|生病
khaaw-laa-riian|ขอลาเรียน|khaaw laa riian|请假不上课|动词|生病请假|แม่ส่งข้อความขอลาเรียนให้ลูกหนึ่งวัน|mae song khaaw-khwaam khaaw laa riian hai luuk neung wan|妈妈发消息给孩子请假一天不上课。|请假
bai-laa-riian|ใบลาเรียน|bai laa riian|学生请假条|名词|生病请假|ครูขอใบลาเรียนเมื่อเด็กกลับมาโรงเรียน|khruu khaaw bai laa riian meua dek glap maa roong-riian|孩子回校时，老师要求请假条。|请假
laa-bpuai|ลาป่วย|laa bpuai|病假|动词|生病请假|วันนี้ลูกลาป่วยเพราะมีไข้และไอมาก|wan-nii luuk laa bpuai phraw mii khai lae ai maak|今天孩子请病假，因为发烧且咳得厉害。|请假
glap-baan-gaawn|กลับบ้านก่อน|glap baan gaawn|提前回家|动词|生病请假|ถ้าเด็กปวดหัวมาก ครูจะโทรให้ผู้ปกครองมารับกลับบ้านก่อน|thaa dek bpuat hua maak khruu ja thoo hai phuu-bpok-khraawng maa rap glap baan gaawn|如果孩子头很痛，老师会打电话让家长来提前接回家。|生病
thoo-hai-phuu-bpok-khraawng|โทรให้ผู้ปกครอง|thoo hai phuu-bpok-khraawng|打电话给家长|动词|老师通知|ครูโทรให้ผู้ปกครองเมื่อเด็กไม่สบายในห้องเรียน|khruu thoo hai phuu-bpok-khraawng meua dek mai sa-baai nai haawng riian|孩子在教室里不舒服时，老师打电话给家长。|通知
rap-luuk-glap-baan|รับลูกกลับบ้าน|rap luuk glap baan|接孩子回家|动词|接送上学|แม่รีบไปรับลูกกลับบ้านหลังครูโทรมา|mae riip bpai rap luuk glap baan lang khruu thoo maa|老师打电话来后，妈妈赶紧去接孩子回家。|接送
phak-thii-haawng-phayaabaan|พักที่ห้องพยาบาล|phak thii haawng pha-yaa-baan|在校医室休息|动词|生病请假|เด็กมีไข้เล็กน้อย จึงพักที่ห้องพยาบาลก่อน|dek mii khai lek naawy jeung phak thii haawng pha-yaa-baan gaawn|孩子有点发烧，所以先在校医室休息。|生病
haawng-phayaabaan|ห้องพยาบาล|haawng pha-yaa-baan|校医室|名词|生病请假|ห้องพยาบาลอยู่ข้างห้องครูชั้นล่าง|haawng pha-yaa-baan yuu khaang haawng khruu chan laang|校医室在一楼老师办公室旁边。|地点
waa-dek-ruu-seuk-yang-rai|ว่าเด็กรู้สึกอย่างไร|waa dek ruu-seuk yaang-rai|孩子感觉怎么样|短语|家长沟通|ครูถามแม่ว่าเด็กรู้สึกอย่างไรหลังกลับบ้าน|khruu thaam mae waa dek ruu-seuk yaang-rai lang glap baan|老师问妈妈孩子回家后感觉怎么样。|沟通
khaaw-hai-kruu-chuai-duu|ขอให้ครูช่วยดู|khaaw hai khruu chuai duu|请老师帮忙留意|动词|家长沟通|แม่ขอให้ครูช่วยดูลูกเพราะวันนี้ลูกไอนิดหน่อย|mae khaaw hai khruu chuai duu luuk phraw wan-nii luuk ai nit naawy|妈妈请老师帮忙留意孩子，因为今天孩子有点咳嗽。|沟通
duu-lae-ton-len|ดูแลตอนเล่น|duu-laae dtaawn len|玩耍时照看|动词|孩子照顾|ครูดูแลตอนเล่นเพื่อไม่ให้เด็กวิ่งชนกัน|khruu duu-laae dtaawn len phuea mai hai dek wing chon gan|老师在玩耍时照看孩子，避免他们跑着撞到。|安全
sanam-dek-len|สนามเด็กเล่น|sa-naam dek len|儿童游乐场|名词|学校生活|หลังอาหารกลางวัน เด็กไปเล่นที่สนามเด็กเล่น|lang aa-haan glaang-wan dek bpai len thii sa-naam dek len|午饭后，孩子们去儿童游乐场玩。|地点
len-gab-phuean|เล่นกับเพื่อน|len gap pheuan|和朋友玩|动词|学校生活|ลูกชอบเล่นกับเพื่อนใหม่ในช่วงพักกลางวัน|luuk chaawp len gap pheuan mai nai chuang phak glaang-wan|孩子喜欢午休时和新朋友玩。|朋友
mi-phuean-mai|มีเพื่อนใหม่|mii pheuan mai|有新朋友|短语|学校生活|เปิดเทอมนี้ลูกมีเพื่อนใหม่สองคนในห้อง|bpoet theerm nii luuk mii pheuan mai saawng khon nai haawng|这学期孩子在班里有两个新朋友。|朋友
phuean-ruam-chan|เพื่อนร่วมชั้น|pheuan ruam chan|同班同学|名词|学校生活|เพื่อนร่วมชั้นช่วยเก็บสมุดให้ลูกตอนลูกไม่อยู่|pheuan ruam chan chuai gep sa-mut hai luuk dtaawn luuk mai yuu|孩子不在时，同班同学帮他收本子。|朋友
thale-gab-phuean|ทะเลาะกับเพื่อน|tha-le gap pheuan|和朋友吵架|动词|学校生活|ถ้าเด็กทะเลาะกับเพื่อน ครูจะให้คุยกันดี ๆ|thaa dek tha-le gap pheuan khruu ja hai khui gan dii dii|如果孩子和朋友吵架，老师会让他们好好谈。|朋友
khaaw-thoot-phuean|ขอโทษเพื่อน|khaaw-thoot pheuan|向朋友道歉|动词|学校生活|ลูกขอโทษเพื่อนหลังจากแย่งของเล่นกัน|luuk khaaw-thoot pheuan lang-jaak yaeng khaawng-len gan|抢玩具之后，孩子向朋友道歉。|朋友
baeng-khaawng-len|แบ่งของเล่น|baeng khaawng-len|分享玩具|动词|学校生活|ครูสอนให้เด็กแบ่งของเล่นและรอคิว|khruu saawn hai dek baeng khaawng-len lae raaw khiu|老师教孩子分享玩具并排队等。|行为
raaw-khiu|รอคิว|raaw khiu|排队等候|动词|学校生活|เด็กต้องรอคิวก่อนเล่นชิงช้าในสนาม|dek dtawng raaw khiu gaawn len ching-chaa nai sa-naam|孩子在操场玩秋千前要排队等。|行为
khao-thaeo|เข้าแถว|khao thaeo|排队|动词|学校生活|ตอนเช้าเด็กเข้าแถวหน้าเสาธงกับครู|dtaawn chaao dek khao thaeo naa sao-thong gap khruu|早上孩子们和老师在旗杆前排队。|行为
khao-rop-thong-chaat|เคารพธงชาติ|khao-rop thong-chaat|升旗敬礼|动词|学校生活|ทุกเช้าโรงเรียนให้เด็กเคารพธงชาติก่อนเข้าเรียน|thuk chaao roong-riian hai dek khao-rop thong-chaat gaawn khao riian|每天早上学校让孩子上课前升旗敬礼。|活动
git-ja-gam-roong-riian|กิจกรรมโรงเรียน|git-ja-gam roong-riian|学校活动|名词|学校生活|กิจกรรมโรงเรียนวันนี้คือปลูกต้นไม้หลังอาคาร|git-ja-gam roong-riian wan-nii kheu bpluuk dton-maai lang aa-khaan|今天的学校活动是在楼后种树。|活动
ngaan-roong-riian|งานโรงเรียน|ngaan roong-riian|学校活动日|名词|学校生活|วันเสาร์มีงานโรงเรียน ผู้ปกครองมาช่วยขายอาหาร|wan-sao mii ngaan roong-riian phuu-bpok-khraawng maa chuai khaai aa-haan|星期六有学校活动日，家长来帮忙卖食物。|活动
that-sa-na-seuk-saa|ทัศนศึกษา|that-sa-na-seuk-saa|校外参观|名词|学校生活|เดือนหน้าห้องของลูกจะไปทัศนศึกษาที่พิพิธภัณฑ์|deuan naa haawng khaawng luuk ja bpai that-sa-na-seuk-saa thii phi-phit-tha-phan|下个月孩子班级会去博物馆校外参观。|活动
phaa-dek-bpai-thiao|พาเด็กไปเที่ยว|phaa dek bpai thiao|带孩子外出游玩|动词|学校生活|ครูพาเด็กไปเที่ยวสวนสัตว์และให้จดชื่อสัตว์|khruu phaa dek bpai thiao suan-sat lae hai jot cheu sat|老师带孩子去动物园，并让记录动物名称。|活动
ao-khaawng-mai-dai|เอาของมาไม่ได้|ao khaawng maa mai dai|不能带东西来|短语|校服用品|โรงเรียนบอกว่าเด็กเอาของเล่นมาไม่ได้ในวันสอบ|roong-riian baawk waa dek ao khaawng-len maa mai dai nai wan saawp|学校说考试当天孩子不能带玩具来。|规则
haam-chai-mue-thue|ห้ามใช้มือถือ|haam chai meu-theu|禁止使用手机|短语|学校生活|ในห้องเรียนห้ามใช้มือถือ ยกเว้นครูอนุญาต|nai haawng riian haam chai meu-theu yok-wen khruu a-nu-yaat|教室里禁止使用手机，除非老师允许。|规则
ao-khaawng-glap-baan|เอาของกลับบ้าน|ao khaawng glap baan|把东西带回家|动词|校服用品|วันนี้ครูให้เด็กเอางานศิลปะกลับบ้าน|wan-nii khruu hai dek ao ngaan sin-la-bpa glap baan|今天老师让孩子把美术作品带回家。|用品
khaawng-haai|ของหาย|khaawng haai|东西丢了|短语|校服用品|ถ้าของหายที่โรงเรียน ให้แจ้งครูประจำชั้น|thaa khaawng haai thii roong-riian hai jaeng khruu bpra-jam chan|如果东西在学校丢了，请通知班主任。|用品
phaak-khaawng-wai|ฝากของไว้|faak khaawng wai|暂放东西|动词|校服用品|แม่ฝากของไว้ที่ห้องครูก่อนเข้าประชุม|mae faak khaawng wai thii haawng khruu gaawn khao bpra-chum|妈妈开会前把东西暂放在老师办公室。|用品
khian-cheu-bon-khaawng|เขียนชื่อบนของ|khiian cheu bon khaawng|在物品上写名字|动词|校服用品|ควรเขียนชื่อบนของใช้เด็กทุกชิ้น|khuan khiian cheu bon khaawng-chai dek thuk chin|应该在孩子每件用品上写名字。|用品
dtriiam-gra-bpao|เตรียมกระเป๋า|dtriiam gra-bpao|准备书包|动词|校服用品|ก่อนนอนแม่ช่วยลูกเตรียมกระเป๋าตามตารางเรียน|gaawn naawn mae chuai luuk dtriiam gra-bpao dtaam dtaa-raang riian|睡前妈妈按课程表帮孩子准备书包。|用品
jat-gra-bpao|จัดกระเป๋า|jat gra-bpao|整理书包|动词|校服用品|ลูกเริ่มจัดกระเป๋าเองได้หลังทำการบ้านเสร็จ|luuk roem jat gra-bpao eeng dai lang tham gaan-baan set|孩子做完作业后开始能自己整理书包。|用品
leum-ao-nang-seu|ลืมเอาหนังสือ|leum ao nang-seu|忘带书|动词|校服用品|ลูกลืมเอาหนังสือคณิตไปโรงเรียนเมื่อวาน|luuk leum ao nang-seu kha-nit bpai roong-riian meua-waan|孩子昨天忘带数学书去学校。|用品
dtriiam-chut-phrung-nii|เตรียมชุดพรุ่งนี้|dtriiam chut phrung-nii|准备明天的衣服|动词|校服用品|แม่เตรียมชุดพรุ่งนี้ไว้บนเก้าอี้ให้ลูก|mae dtriiam chut phrung-nii wai bon gao-ii hai luuk|妈妈把明天的衣服给孩子准备在椅子上。|校服
sakk-chut-nak-riian|ซักชุดนักเรียน|sak chut nak-riian|洗校服|动词|校服用品|วันอาทิตย์แม่ซักชุดนักเรียนและตากแดด|wan aa-thit mae sak chut nak-riian lae dtaak daet|星期天妈妈洗校服并晒太阳。|校服
reet-chut-nak-riian|รีดชุดนักเรียน|riit chut nak-riian|熨校服|动词|校服用品|พ่อรีดชุดนักเรียนให้ลูกก่อนวันเปิดเทอม|phaaw riit chut nak-riian hai luuk gaawn wan bpoet theerm|爸爸在开学日前给孩子熨校服。|校服
chut-bpeuan|ชุดเปื้อน|chut bpeuan|衣服弄脏|短语|校服用品|ชุดเปื้อนสีจากวิชาศิลปะ แต่ซักออกได้|chut bpeuan sii jaak wi-chaa sin-la-bpa dtae sak aawk dai|衣服在美术课被颜料弄脏了，但可以洗掉。|校服
khaawng-chai-dek|ของใช้เด็ก|khaawng-chai dek|儿童用品|名词|孩子照顾|โรงเรียนให้เตรียมของใช้เด็กสำหรับนอนกลางวัน|roong-riian hai dtriiam khaawng-chai dek sam-rap naawn glaang-wan|学校让准备孩子午睡用的儿童用品。|用品
pha-chet-naa|ผ้าเช็ดหน้า|phaa chet naa|手帕|名词|校服用品|แม่ใส่ผ้าเช็ดหน้าไว้ในกระเป๋าเสื้อลูก|mae sai phaa chet naa wai nai gra-bpao seua luuk|妈妈把手帕放在孩子的上衣口袋里。|用品
khuat-naam|ขวดน้ำ|khuat naam|水瓶|名词|校服用品|ขวดน้ำของลูกมีชื่อและห้องเรียนติดอยู่|khuat naam khaawng luuk mii cheu lae haawng riian dtit yuu|孩子的水瓶贴着名字和班级。|用品
pha-hom-dek|ผ้าห่มเด็ก|phaa hom dek|儿童毯子|名词|孩子照顾|เด็กอนุบาลต้องเอาผ้าห่มเด็กไปโรงเรียนทุกวันจันทร์|dek a-nu-baan dtawng ao phaa hom dek bpai roong-riian thuk wan-jan|幼儿园孩子每周一要带儿童毯子去学校。|午睡
mon-nawn|หมอนนอน|maawn naawn|睡觉枕头|名词|孩子照顾|ครูให้เอาหมอนนอนกลับบ้านไปซักทุกวันศุกร์|khruu hai ao maawn naawn glap baan bpai sak thuk wan-suk|老师让每周五把睡觉枕头带回家洗。|午睡
wan-bpoet-theerm|วันเปิดเทอม|wan bpoet theerm|开学日|名词|学校生活|วันเปิดเทอมเด็กหลายคนตื่นเต้นและมาถึงเร็ว|wan bpoet theerm dek laai khon dteun-dten lae maa theung reo|开学日很多孩子很兴奋，并且早早到校。|学期
wan-bpit-theerm|วันปิดเทอม|wan bpit theerm|放假日|名词|学校生活|วันปิดเทอมครูให้เด็กเอาของทั้งหมดกลับบ้าน|wan bpit theerm khruu hai dek ao khaawng thang-mot glap baan|放假日老师让孩子把全部东西带回家。|学期
dtawn-rap-nak-riian-mai|ต้อนรับนักเรียนใหม่|dtaawn-rap nak-riian mai|欢迎新生|动词|学校生活|โรงเรียนจัดกิจกรรมต้อนรับนักเรียนใหม่ตอนเช้า|roong-riian jat git-ja-gam dtaawn-rap nak-riian mai dtaawn chaao|学校早上举办欢迎新生活动。|活动
nak-riian-mai|นักเรียนใหม่|nak-riian mai|新生|名词|学校生活|นักเรียนใหม่ยังไม่รู้ว่าห้องน้ำอยู่ตรงไหน|nak-riian mai yang mai ruu waa haawng-naam yuu dtrong nai|新生还不知道洗手间在哪里。|学生
dek-a-nu-baan|เด็กอนุบาล|dek a-nu-baan|幼儿园孩子|名词|孩子照顾|เด็กอนุบาลต้องมีครูช่วยดูตอนกินข้าว|dek a-nu-baan dtawng mii khruu chuai duu dtaawn gin khaao|幼儿园孩子吃饭时需要老师帮忙照看。|学生
dek-bpra-thom|เด็กประถม|dek bpra-thom|小学生|名词|学校生活|เด็กประถมเริ่มทำการบ้านเองได้มากขึ้น|dek bpra-thom roem tham gaan-baan eeng dai maak kheun|小学生开始能更多地自己做作业。|学生
phaa-luuk-khao-haawng|พาลูกเข้าห้อง|phaa luuk khao haawng|带孩子进教室|动词|接送上学|วันแรกครูให้ผู้ปกครองพาลูกเข้าห้องได้|wan raek khruu hai phuu-bpok-khraawng phaa luuk khao haawng dai|第一天老师允许家长带孩子进教室。|接送
raaw-luuk-naa-haawng|รอลูกหน้าห้อง|raaw luuk naa haawng|在教室外等孩子|动词|接送上学|แม่รอลูกหน้าห้องจนกิจกรรมเช้าเสร็จ|mae raaw luuk naa haawng jon git-ja-gam chaao set|妈妈在教室外等孩子，直到早晨活动结束。|接送
hai-luuk-laa-kruu|ให้ลูกลาครู|hai luuk laa khruu|让孩子向老师告别|动词|接送上学|ก่อนกลับบ้าน แม่ให้ลูกลาครูอย่างสุภาพ|gaawn glap baan mae hai luuk laa khruu yaang su-phaap|回家前，妈妈让孩子礼貌地向老师告别。|礼貌
wai-kruu|ไหว้ครู|wai khruu|向老师行合十礼|动词|学校生活|เด็กไหว้ครูก่อนเข้าห้องเรียนทุกเช้า|dek wai khruu gaawn khao haawng riian thuk chaao|孩子每天早上进教室前向老师行合十礼。|礼貌
khaawp-khun-kruu|ขอบคุณครู|khaawp-khun khruu|感谢老师|动词|学校生活|ลูกขอบคุณครูหลังครูช่วยหาเสื้อที่หาย|luuk khaawp-khun khruu lang khruu chuai haa seua thii haai|老师帮忙找回丢失的衣服后，孩子感谢老师。|礼貌
phuut-suphaap|พูดสุภาพ|phuut su-phaap|说话礼貌|动词|学校生活|ครูสอนให้เด็กพูดสุภาพกับเพื่อนและผู้ใหญ่|khruu saawn hai dek phuut su-phaap gap pheuan lae phuu-yai|老师教孩子对朋友和大人说话礼貌。|礼貌
fang-kruu|ฟังครู|fang khruu|听老师说|动词|学校生活|เวลาเรียนเด็กควรฟังครูและไม่คุยเสียงดัง|wee-laa riian dek khuan fang khruu lae mai khui siiang dang|上课时孩子应该听老师说，不大声聊天。|课堂
yok-meu-thaam|ยกมือถาม|yok meu thaam|举手提问|动词|学校生活|ถ้าไม่เข้าใจ เด็กควรยกมือถามครู|thaa mai khao-jai dek khuan yok meu thaam khruu|如果不明白，孩子应该举手问老师。|课堂
dtaawp-kham-thaam-kruu|ตอบคำถามครู|dtaawp kham-thaam khruu|回答老师问题|动词|学校生活|ลูกกล้าตอบคำถามครูมากขึ้นกว่าเมื่อก่อน|luuk glaa dtaawp kham-thaam khruu maak kheun gwaa meua gaawn|孩子比以前更敢回答老师问题了。|课堂
tham-ngaan-glum|ทำงานกลุ่ม|tham ngaan glum|做小组作业|动词|学校生活|วันนี้เด็กทำงานกลุ่มและวาดรูปสวนสัตว์|wan-nii dek tham ngaan glum lae waat ruup suan-sat|今天孩子们做小组作业，画动物园。|课堂
chuai-phuean|ช่วยเพื่อน|chuai pheuan|帮助同学|动词|学校生活|ครูชมลูกที่ช่วยเพื่อนเก็บของหลังเลิกเรียน|khruu chom luuk thii chuai pheuan gep khaawng lang loek riian|老师表扬孩子放学后帮同学收拾东西。|朋友
jaai-khaa-riian|จ่ายค่าเรียน|jaai khaa riian|支付学费|动词|学校生活|ผู้ปกครองต้องจ่ายค่าเรียนก่อนวันที่สิบ|phuu-bpok-khraawng dtawng jaai khaa riian gaawn wan-thii sip|家长需要在十号前支付学费。|费用
khaa-rian-phiset|ค่าเรียนพิเศษ|khaa riian phi-set|补习费|名词|学校生活|ค่าเรียนพิเศษเดือนนี้จ่ายผ่านแอปได้|khaa riian phi-set deuan nii jaai phaan aep dai|这个月补习费可以通过应用支付。|费用
riian-phiset|เรียนพิเศษ|riian phi-set|上补习课|动词|作业学习|ลูกเรียนพิเศษภาษาอังกฤษทุกวันอังคาร|luuk riian phi-set phaa-saa ang-grit thuk wan-ang-khaan|孩子每周二上英语补习课。|学习
phak-lang-riian|พักหลังเรียน|phak lang riian|放学后休息|动词|孩子照顾|หลังกลับบ้าน ลูกพักหลังเรียนครึ่งชั่วโมงแล้วทำการบ้าน|lang glap baan luuk phak lang riian khreung chua-moong laeo tham gaan-baan|回家后，孩子放学后休息半小时再做作业。|照顾
len-gaawn-tham-gaan-baan|เล่นก่อนทำการบ้าน|len gaawn tham gaan-baan|做作业前先玩|动词|作业学习|แม่ให้ลูกเล่นก่อนทำการบ้านสิบห้านาที|mae hai luuk len gaawn tham gaan-baan sip-haa naa-thii|妈妈让孩子做作业前先玩十五分钟。|作业
gawng-waan-thii-roong-riian|ง่วงที่โรงเรียน|nguang thii roong-riian|在学校犯困|短语|孩子照顾|ถ้านอนดึก เด็กจะง่วงที่โรงเรียนตอนเช้า|thaa naawn deuk dek ja nguang thii roong-riian dtaawn chaao|如果晚睡，孩子早上会在学校犯困。|健康
gin-yaah-thii-roong-riian|กินยาที่โรงเรียน|gin yaa thii roong-riian|在学校吃药|动词|生病请假|ถ้าต้องกินยาที่โรงเรียน ผู้ปกครองควรแจ้งครู|thaa dtawng gin yaa thii roong-riian phuu-bpok-khraawng khuan jaeng khruu|如果需要在学校吃药，家长应该通知老师。|健康
song-yaa-hai-kruu|ส่งยาให้ครู|song yaa hai khruu|把药交给老师|动词|生病请假|แม่ส่งยาให้ครูพร้อมเขียนเวลาที่ต้องกิน|mae song yaa hai khruu phraawm khiian wee-laa thii dtawng gin|妈妈把药交给老师，并写上服药时间。|健康
thueng-baan-laeo|ถึงบ้านแล้ว|theung baan laeo|已经到家|短语|接送上学|ลูกส่งข้อความบอกแม่ว่าถึงบ้านแล้วหลังเลิกเรียน|luuk song khaaw-khwaam baawk mae waa theung baan laeo lang loek riian|孩子放学后发消息告诉妈妈已经到家。|安全
yang-mai-theung-baan|ยังไม่ถึงบ้าน|yang mai theung baan|还没到家|短语|接送上学|ถ้าลูกยังไม่ถึงบ้านหลังห้าโมง แม่จะโทรถามครูรถ|thaa luuk yang mai theung baan lang haa moong mae ja thoo thaam khruu rot|如果孩子五点后还没到家，妈妈会打电话问校车老师。|安全
duu-khwaam-bplot-phai|ดูความปลอดภัย|duu khwaam bplaawt-phai|注意安全|动词|孩子照顾|ครูดูความปลอดภัยของเด็กตอนข้ามถนน|khruu duu khwaam bplaawt-phai khaawng dek dtaawn khaam tha-non|老师在孩子过马路时注意他们的安全。|安全
jam-cheu-phuu-bpok-khraawng|จำชื่อผู้ปกครอง|jam cheu phuu-bpok-khraawng|记住家长姓名|动词|接送上学|ครูต้องจำชื่อผู้ปกครองที่มารับเด็กแต่ละคน|khruu dtawng jam cheu phuu-bpok-khraawng thii maa rap dek dtae-la khon|老师需要记住来接每个孩子的家长姓名。|安全
baep-faawm-rap-dek|แบบฟอร์มรับเด็ก|baep-faawm rap dek|接孩子表格|名词|接送上学|โรงเรียนให้กรอกแบบฟอร์มรับเด็กเมื่อมีคนอื่นมารับ|roong-riian hai graawk baep-faawm rap dek meua mii khon eun maa rap|当别人来接孩子时，学校要求填写接孩子表格。|安全
khon-rap-thaen|คนรับแทน|khon rap thaen|代接人|名词|接送上学|ถ้ามีคนรับแทน ต้องแจ้งชื่อกับครูล่วงหน้า|thaa mii khon rap thaen dtawng jaeng cheu gap khruu luang-naa|如果有代接人，必须提前把姓名告诉老师。|安全
anuyat-hai-rap|อนุญาตให้รับ|a-nu-yaat hai rap|允许接走|动词|接送上学|ครูอนุญาตให้รับเด็กเมื่อเห็นบัตรผู้ปกครอง|khruu a-nu-yaat hai rap dek meua hen bat phuu-bpok-khraawng|老师看到家长卡后允许接走孩子。|安全
bat-phuu-bpok-khraawng|บัตรผู้ปกครอง|bat phuu-bpok-khraawng|家长接送卡|名词|接送上学|อย่าลืมนำบัตรผู้ปกครองมาเวลารับลูก|yaa leum nam bat phuu-bpok-khraawng maa wee-laa rap luuk|接孩子时别忘了带家长接送卡。|安全
`;

export const VOCABULARY_EXPANSION_A2_CHILDCARE_SCHOOL_LIFE_01: VocabularyExpansionA2ChildcareSchoolLifeCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
