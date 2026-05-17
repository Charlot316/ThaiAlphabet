type PartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
type Theme = "学校场所" | "课堂活动" | "学习用品" | "作业资料" | "考试成绩" | "语言学习" | "提问回答" | "学习计划";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2SchoolStudyCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-school-context", "pythainlp-corpus", "kaikki-wiktionary-thai"];

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
  collocationThai: string;
  collocationRoman: string;
  collocationChinese: string;
  relatedThai: string;
  relatedRoman: string;
  relatedChinese: string;
  tag: string;
};

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const parts = line.split("|").map((part) => part.trim());
      const [
        id,
        thai,
        roman,
        chinese,
        partOfSpeech,
        theme,
        exampleThai,
        exampleRoman,
        exampleChinese,
        collocationThai,
        collocationRoman,
        collocationChinese,
        relatedThai,
        relatedRoman,
        relatedChinese,
        tag,
      ] = parts;
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, collocationThai, collocationRoman, collocationChinese, relatedThai, relatedRoman, relatedChinese, tag };
    });
}

function buildCandidate(row: Row, index: number): VocabularyExpansionA2SchoolStudyCandidate {
  return {
    id: row.id,
    thai: row.thai,
    roman: row.roman,
    chinese: row.chinese,
    partOfSpeech: row.partOfSpeech,
    theme: row.theme,
    level: "a2",
    priority: index + 1,
    senses: [
      {
        id: "main",
        chinese: row.chinese,
        examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }],
        usageNotesZh: [`${row.thai} 常用于学校和学习场景，适合搭配时间、地点或学习动作来造句。`],
      },
    ],
    synonyms: [{ thai: row.relatedThai, roman: row.relatedRoman, chinese: row.relatedChinese }],
    antonyms: [],
    comparisons: [
      {
        kind: "易混",
        target: { thai: row.relatedThai, roman: row.relatedRoman, chinese: row.relatedChinese },
        distinctionZh: `${row.thai} 重点是“${row.chinese}”；${row.relatedThai} 重点是“${row.relatedChinese}”，学习时要按课堂动作或物品用途区分。`,
      },
    ],
    collocations: [{ thai: row.collocationThai, roman: row.collocationRoman, chinese: row.collocationChinese }],
    usageNotesZh: ["例句控制在 A2 难度，可用于描述课堂、作业、考试和提问回答。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
haawng-riian-yai|ห้องเรียนใหญ่|haawng riian yai|大教室|名词|学校场所|วันนี้พวกเราเรียนภาษาไทยในห้องเรียนใหญ่ชั้นสอง|wan-nii phuak rao riian phaa-saa thai nai haawng riian yai chan saawng|今天我们在二楼的大教室学泰语。|เข้าเรียนในห้องเรียนใหญ่|khao riian nai haawng riian yai|进入大教室上课|ห้องเรียนเล็ก|haawng riian lek|小教室|场所
haawng-riian-lek|ห้องเรียนเล็ก|haawng riian lek|小教室|名词|学校场所|ห้องเรียนเล็กนี้เงียบ เหมาะสำหรับฝึกพูดเป็นกลุ่ม|haawng riian lek nii ngiiap maw sam-rap fuek phuut bpen glum|这个小教室很安静，适合分组练口语。|ใช้ห้องเรียนเล็ก|chai haawng riian lek|使用小教室|ห้องเรียนใหญ่|haawng riian yai|大教室|场所
haawng-samut-roong-riian|ห้องสมุดโรงเรียน|haawng sa-mut roong-riian|学校图书馆|名词|学校场所|หลังเลิกเรียน ฉันไปอ่านหนังสือที่ห้องสมุดโรงเรียน|lang loek riian chan bpai aan nang-sue thii haawng sa-mut roong-riian|放学后，我去学校图书馆看书。|ยืมหนังสือจากห้องสมุด|yuem nang-sue jaak haawng sa-mut|从图书馆借书|ชั้นหนังสือ|chan nang-sue|书架|场所
chan-nang-sue|ชั้นหนังสือ|chan nang-sue|书架|名词|学校场所|ครูบอกให้นักเรียนวางพจนานุกรมบนชั้นหนังสือ|khruu baawk hai nak-riian waang phot-ja-naa-nu-grom bon chan nang-sue|老师让学生把词典放在书架上。|จัดชั้นหนังสือ|jat chan nang-sue|整理书架|ห้องสมุด|haawng sa-mut|图书馆|场所
sanam-roong-riian|สนามโรงเรียน|sa-naam roong-riian|学校操场|名词|学校场所|ตอนพักเที่ยง เด็กหลายคนเล่นบอลที่สนามโรงเรียน|dtaawn phak thiiang dek laai khon len baawn thii sa-naam roong-riian|午休时，很多孩子在学校操场踢球。|ไปสนามโรงเรียน|bpai sa-naam roong-riian|去学校操场|ห้องเรียน|haawng riian|教室|场所
bpra-dtuu-roong-riian|ประตูโรงเรียน|bpra-dtuu roong-riian|校门|名词|学校场所|แม่รอฉันอยู่หน้าประตูโรงเรียนตอนสี่โมง|maae raaw chan yuu naa bpra-dtuu roong-riian dtaawn sii moong|妈妈四点在校门口等我。|ยืนหน้าประตูโรงเรียน|yuen naa bpra-dtuu roong-riian|站在校门前|สนามโรงเรียน|sa-naam roong-riian|学校操场|场所
chan-riian|ชั้นเรียน|chan riian|班级；年级|名词|学校场所|ชั้นเรียนของเรามีนักเรียนยี่สิบห้าคน|chan riian khaawng rao mii nak-riian yii-sip-haa khon|我们班有二十五个学生。|อยู่ชั้นเรียนเดียวกัน|yuu chan riian diao gan|在同一个班|กลุ่มเรียน|glum riian|学习小组|班级
glum-riian|กลุ่มเรียน|glum riian|学习小组|名词|课堂活动|ครูแบ่งกลุ่มเรียนเล็ก ๆ เพื่อฝึกถามตอบ|khruu baeng glum riian lek lek phuea fuek thaam dtaawp|老师分成小学习小组来练习问答。|ทำงานเป็นกลุ่มเรียน|tham ngaan bpen glum riian|以学习小组做任务|ชั้นเรียน|chan riian|班级|班级
khruu-bpra-jam-chan|ครูประจำชั้น|khruu bpra-jam chan|班主任|名词|学校场所|ครูประจำชั้นโทรบอกผู้ปกครองเรื่องการสอบ|khruu bpra-jam chan thoo baawk phuu-bpok-khraawng rueang gaan saawp|班主任打电话告诉家长考试的事。|พบครูประจำชั้น|phop khruu bpra-jam chan|见班主任|ครูวิชา|khruu wi-chaa|任课老师|人物
khruu-wi-chaa|ครูวิชา|khruu wi-chaa|任课老师|名词|学校场所|ครูวิชาคณิตศาสตร์ให้แบบฝึกหัดเพิ่มสองหน้า|khruu wi-chaa kha-nit-saat hai baep-fuek-hat phoem saawng naa|数学任课老师多给了两页练习。|ถามครูวิชา|thaam khruu wi-chaa|问任课老师|ครูประจำชั้น|khruu bpra-jam chan|班主任|人物
nak-riian-mai|นักเรียนใหม่|nak-riian mai|新学生|名词|学校场所|นักเรียนใหม่แนะนำตัวหน้าชั้นเรียนอย่างสุภาพ|nak-riian mai nae-nam dtua naa chan riian yaang su-phaap|新学生在班级前礼貌地自我介绍。|ต้อนรับนักเรียนใหม่|dtaawn-rap nak-riian mai|欢迎新学生|เพื่อนร่วมชั้น|phuean ruam chan|同班同学|人物
phuean-ruam-chan|เพื่อนร่วมชั้น|phuean ruam chan|同班同学|名词|学校场所|เพื่อนร่วมชั้นช่วยอธิบายการบ้านให้ฉันหลังเรียน|phuean ruam chan chuai a-thi-baai gaan-baan hai chan lang riian|同班同学下课后帮我讲作业。|คุยกับเพื่อนร่วมชั้น|khui gap phuean ruam chan|和同班同学聊天|นักเรียนใหม่|nak-riian mai|新学生|人物
dto-riian|โต๊ะเรียน|dto riian|课桌；学习桌|名词|学习用品|บนโต๊ะเรียนมีสมุด ดินสอ และขวดน้ำ|bon dto riian mii sa-mut din-saaw lae khuat naam|课桌上有本子、铅笔和水瓶。|จัดโต๊ะเรียน|jat dto riian|整理课桌|เก้าอี้เรียน|gao-ii riian|学习椅|用品
gao-ii-riian|เก้าอี้เรียน|gao-ii riian|学习椅|名词|学习用品|เก้าอี้เรียนตัวนี้สูงพอดีกับโต๊ะเรียนของฉัน|gao-ii riian dtua nii suung phaaw-dii gap dto riian khaawng chan|这把学习椅的高度正好配我的课桌。|นั่งเก้าอี้เรียน|nang gao-ii riian|坐学习椅|โต๊ะเรียน|dto riian|课桌|用品
gra-daan-khaao|กระดานขาว|gra-daan khaao|白板|名词|学习用品|ครูเขียนประโยคใหม่บนกระดานขาวให้ทุกคนอ่าน|khruu khiian bpra-yook mai bon gra-daan khaao hai thuk khon aan|老师把新句子写在白板上给大家读。|เขียนบนกระดานขาว|khiian bon gra-daan khaao|在白板上写|กระดานดำ|gra-daan dam|黑板|用品
bpaak-gaa-khian-gra-daan|ปากกาเขียนกระดาน|bpaak-gaa khiian gra-daan|白板笔|名词|学习用品|ปากกาเขียนกระดานสีน้ำเงินอยู่ข้างยางลบ|bpaak-gaa khiian gra-daan sii nam-ngoen yuu khaang yaang-lop|蓝色白板笔在板擦旁边。|ใช้ปากกาเขียนกระดาน|chai bpaak-gaa khiian gra-daan|使用白板笔|ยางลบกระดาน|yaang-lop gra-daan|板擦|用品
yaang-lop-gra-daan|ยางลบกระดาน|yaang-lop gra-daan|板擦|名词|学习用品|หัวหน้าห้องใช้ยางลบกระดานลบคำเก่าก่อนเรียน|hua-naa haawng chai yaang-lop gra-daan lop kham gao gaawn riian|班长上课前用板擦擦掉旧词。|ลบกระดานด้วยยางลบ|lop gra-daan duai yaang-lop|用板擦擦黑板|ปากกาเขียนกระดาน|bpaak-gaa khiian gra-daan|白板笔|用品
sa-mut-jot|สมุดจด|sa-mut jot|笔记本|名词|学习用品|ฉันเขียนคำศัพท์ใหม่ลงในสมุดจดทุกวัน|chan khiian kham-sap mai long nai sa-mut jot thuk wan|我每天把新词写进笔记本。|เปิดสมุดจด|bpoet sa-mut jot|打开笔记本|หนังสือเรียน|nang-sue riian|课本|用品
nang-sue-riian|หนังสือเรียน|nang-sue riian|课本|名词|学习用品|อย่าลืมเอาหนังสือเรียนภาษาไทยมาในวันพรุ่งนี้|yaa luem ao nang-sue riian phaa-saa thai maa nai wan phrung-nii|明天别忘了带泰语课本来。|อ่านหนังสือเรียน|aan nang-sue riian|读课本|สมุดจด|sa-mut jot|笔记本|用品
bai-ngaan|ใบงาน|bai ngaan|课堂练习单；工作纸|名词|作业资料|ครูแจกใบงานหนึ่งแผ่นให้ทำเป็นคู่|khruu jaaek bai ngaan neung phaen hai tham bpen khuu|老师发了一张练习单，让两人一组做。|ทำใบงาน|tham bai ngaan|做练习单|แบบฝึกหัด|baep-fuek-hat|练习题|资料
baep-fuek-hat|แบบฝึกหัด|baep-fuek-hat|练习题；练习册|名词|作业资料|แบบฝึกหัดบทนี้ไม่ยาก แต่ต้องอ่านคำสั่งให้ดี|baep-fuek-hat bot nii mai yaak dtaae dtawng aan kham-sang hai dii|这一课的练习题不难，但要好好读题目要求。|ทำแบบฝึกหัด|tham baep-fuek-hat|做练习题|ใบงาน|bai ngaan|练习单|资料
gaan-baan|การบ้าน|gaan-baan|作业|名词|作业资料|คืนนี้ฉันมีการบ้านภาษาไทยสามข้อและการบ้านเลขหนึ่งหน้า|khuen-nii chan mii gaan-baan phaa-saa thai saam khaaw lae gaan-baan leek neung naa|今晚我有三道泰语作业和一页数学作业。|ทำการบ้าน|tham gaan-baan|做作业|งานกลุ่ม|ngaan glum|小组作业|作业
ngaan-glum|งานกลุ่ม|ngaan glum|小组作业|名词|作业资料|งานกลุ่มนี้ต้องส่งวันศุกร์และทุกคนต้องช่วยกัน|ngaan glum nii dtawng song wan-suk lae thuk khon dtawng chuai gan|这个小组作业周五要交，每个人都要一起帮忙。|ส่งงานกลุ่ม|song ngaan glum|交小组作业|การบ้าน|gaan-baan|作业|作业
tham-gaan-baan|ทำการบ้าน|tham gaan-baan|做作业|动词|作业资料|หลังกลับบ้าน ฉันพักครึ่งชั่วโมงแล้วทำการบ้าน|lang glap baan chan phak khrueng chua-moong laaeo tham gaan-baan|回家后，我休息半小时再做作业。|ทำการบ้านให้เสร็จ|tham gaan-baan hai set|把作业做完|ส่งการบ้าน|song gaan-baan|交作业|作业
song-gaan-baan|ส่งการบ้าน|song gaan-baan|交作业|动词|作业资料|นักเรียนต้องส่งการบ้านก่อนครูเริ่มบทเรียนใหม่|nak-riian dtawng song gaan-baan gaawn khruu roem bot-riian mai|学生必须在老师开始新课前交作业。|ส่งการบ้านตรงเวลา|song gaan-baan dtrong wee-laa|按时交作业|ทำการบ้าน|tham gaan-baan|做作业|作业
dtruat-gaan-baan|ตรวจการบ้าน|dtruat gaan-baan|检查作业；批作业|动词|作业资料|ครูตรวจการบ้านแล้วเขียนคำแนะนำสั้น ๆ ให้ทุกคน|khruu dtruat gaan-baan laaeo khiian kham-nae-nam san san hai thuk khon|老师检查作业后给每个人写了简短建议。|ตรวจการบ้านนักเรียน|dtruat gaan-baan nak-riian|检查学生作业|แก้การบ้าน|gaae gaan-baan|改作业|作业
gaae-gaan-baan|แก้การบ้าน|gaae gaan-baan|改作业；订正作业|动词|作业资料|ฉันแก้การบ้านผิดสองข้อก่อนเอาไปส่งครู|chan gaae gaan-baan phit saawng khaaw gaawn ao bpai song khruu|我把错的两道作业订正后再交给老师。|แก้คำตอบผิด|gaae kham-dtaawp phit|改错答案|ตรวจการบ้าน|dtruat gaan-baan|检查作业|作业
kham-sang|คำสั่ง|kham-sang|题目要求；指令|名词|作业资料|ก่อนทำข้อสอบ ต้องอ่านคำสั่งให้เข้าใจก่อน|gaawn tham khaaw-saawp dtawng aan kham-sang hai khao-jai gaawn|做试题前，必须先读懂题目要求。|อ่านคำสั่ง|aan kham-sang|读要求|คำถาม|kham-thaam|问题|资料
khaaw-muun|ข้อมูล|khaaw-muun|资料；信息|名词|作业资料|นักเรียนหาข้อมูลจากหนังสือและเว็บไซต์ของโรงเรียน|nak-riian haa khaaw-muun jaak nang-sue lae wep-sai khaawng roong-riian|学生从书和学校网站找资料。|หาข้อมูล|haa khaaw-muun|查找资料|ตัวอย่าง|dtua-yaang|例子|资料
dtua-yaang|ตัวอย่าง|dtua-yaang|例子；示例|名词|作业资料|ครูให้ตัวอย่างหนึ่งประโยคก่อนให้นักเรียนเขียนเอง|khruu hai dtua-yaang neung bpra-yook gaawn hai nak-riian khiian eeng|老师先给一个例句，再让学生自己写。|ดูตัวอย่าง|duu dtua-yaang|看示例|ข้อมูล|khaaw-muun|资料|资料
bot-riian|บทเรียน|bot-riian|课文；课程内容|名词|课堂活动|บทเรียนวันนี้เกี่ยวกับครอบครัวและของใช้ในบ้าน|bot-riian wan-nii giao gap khraawp-khruua lae khaawng chai nai baan|今天的课文是关于家庭和家用品的。|เริ่มบทเรียน|roem bot-riian|开始课文|แบบฝึกหัด|baep-fuek-hat|练习题|课堂
roem-riian|เริ่มเรียน|roem riian|开始上课|动词|课堂活动|เราเริ่มเรียนตอนแปดโมงครึ่งทุกวันจันทร์|rao roem riian dtaawn bpaaet moong khrueng thuk wan-jan|我们每周一八点半开始上课。|เริ่มเรียนตรงเวลา|roem riian dtrong wee-laa|准时开始上课|เลิกเรียน|loek riian|下课；放学|课堂
loek-riian|เลิกเรียน|loek riian|下课；放学|动词|课堂活动|วันนี้เลิกเรียนเร็ว เพราะครูมีประชุมตอนบ่าย|wan-nii loek riian reo phraw khruu mii bpra-chum dtaawn baai|今天下课早，因为老师下午有会。|เลิกเรียนแล้ว|loek riian laaeo|已经放学了|เริ่มเรียน|roem riian|开始上课|课堂
khao-rian|เข้าเรียน|khao riian|进班上课；参加课程|动词|课堂活动|นักเรียนทุกคนต้องเข้าเรียนก่อนเสียงกริ่งดัง|nak-riian thuk khon dtawng khao riian gaawn siiang gring dang|所有学生必须在铃响前进班上课。|เข้าเรียนออนไลน์|khao riian awn-lai|参加线上课|ขาดเรียน|khaat riian|缺课|课堂
khaat-riian|ขาดเรียน|khaat riian|缺课；没来上课|动词|课堂活动|เขาขาดเรียนเมื่อวานเพราะไม่สบายและไปหาหมอ|khao khaat riian muea-waan phraw mai sa-baai lae bpai haa maaw|他昨天因为不舒服去看医生而缺课。|ขาดเรียนหนึ่งวัน|khaat riian neung wan|缺课一天|เข้าเรียน|khao riian|上课|课堂
maa-sai|มาสาย|maa saai|迟到|动词|课堂活动|ถ้ามาสาย ต้องบอกเหตุผลกับครูก่อนนั่งเรียน|thaa maa saai dtawng baawk het-phon gap khruu gaawn nang riian|如果迟到，要先告诉老师原因再坐下上课。|มาสายห้านาที|maa saai haa naa-thii|迟到五分钟|มาตรงเวลา|maa dtrong wee-laa|准时来|课堂
maa-dtrong-wee-laa|มาตรงเวลา|maa dtrong wee-laa|准时来|动词|课堂活动|หัวหน้าห้องมาตรงเวลาและเปิดไฟในห้องเรียน|hua-naa haawng maa dtrong wee-laa lae bpoet fai nai haawng riian|班长准时来，并打开教室的灯。|มาตรงเวลาทุกวัน|maa dtrong wee-laa thuk wan|每天准时来|มาสาย|maa saai|迟到|课堂
fang-khruu|ฟังครู|fang khruu|听老师讲|动词|课堂活动|ตอนครูอธิบายคำใหม่ นักเรียนควรฟังครูให้ดี|dtaawn khruu a-thi-baai kham mai nak-riian khuuan fang khruu hai dii|老师讲新词时，学生应该认真听老师。|ฟังครูอธิบาย|fang khruu a-thi-baai|听老师解释|พูดคุยกัน|phuut khui gan|互相聊天|课堂
jot-taam|จดตาม|jot dtaam|跟着记；照着记|动词|课堂活动|ฉันจดตามครูบนกระดานขาวลงในสมุดจด|chan jot dtaam khruu bon gra-daan khaao long nai sa-mut jot|我把老师白板上的内容跟着记到笔记本里。|จดตามบทเรียน|jot dtaam bot-riian|跟着课文记|อ่านตาม|aan dtaam|跟读|课堂
aan-dtaam|อ่านตาม|aan dtaam|跟读|动词|语言学习|นักเรียนอ่านตามครูทีละประโยคเพื่อฝึกเสียง|nak-riian aan dtaam khruu thii la bpra-yook phuea fuek siiang|学生一句一句跟读老师来练发音。|อ่านตามเสียงครู|aan dtaam siiang khruu|跟着老师的声音读|จดตาม|jot dtaam|跟着记|语言
phuut-taam|พูดตาม|phuut dtaam|跟着说|动词|语言学习|ถ้าคำนี้ยาก ให้ฟังช้า ๆ แล้วพูดตามครู|thaa kham nii yaak hai fang chaa chaa laaeo phuut dtaam khruu|如果这个词难，就慢慢听然后跟着老师说。|พูดตามสามครั้ง|phuut dtaam saam khrang|跟着说三次|อ่านตาม|aan dtaam|跟读|语言
fuek-awok-siiang|ฝึกออกเสียง|fuek aawk-siiang|练发音|动词|语言学习|เราฝึกออกเสียงคำไทยใหม่ก่อนอ่านประโยคยาว|rao fuek aawk-siiang kham thai mai gaawn aan bpra-yook yaao|我们先练新泰语词的发音，再读长句。|ฝึกออกเสียงทุกวัน|fuek aawk-siiang thuk wan|每天练发音|จำคำศัพท์|jam kham-sap|记词汇|语言
jam-kham-sap|จำคำศัพท์|jam kham-sap|记词汇|动词|语言学习|ฉันจำคำศัพท์ด้วยการเขียนและอ่านออกเสียง|chan jam kham-sap duai gaan khiian lae aan aawk-siiang|我通过写和朗读来记词汇。|จำคำศัพท์ใหม่|jam kham-sap mai|记新词|ทบทวนบทเรียน|thop-thuan bot-riian|复习课文|语言
thop-thuan-bot-riian|ทบทวนบทเรียน|thop-thuan bot-riian|复习课文；复习课程|动词|学习计划|ก่อนสอบหนึ่งวัน ฉันทบทวนบทเรียนกับเพื่อน|gaawn saawp neung wan chan thop-thuan bot-riian gap phuean|考试前一天，我和朋友复习课文。|ทบทวนบทเรียนเก่า|thop-thuan bot-riian gao|复习旧课|เรียนบทใหม่|riian bot mai|学新课|复习
riian-bot-mai|เรียนบทใหม่|riian bot mai|学新课|动词|课堂活动|วันนี้เราเรียนบทใหม่เรื่องเวลาและตารางเรียน|wan-nii rao riian bot mai rueang wee-laa lae dtaa-raang riian|今天我们学关于时间和课程表的新课。|เริ่มเรียนบทใหม่|roem riian bot mai|开始学新课|ทบทวนบทเรียน|thop-thuan bot-riian|复习课文|课堂
dtaa-raang-riian|ตารางเรียน|dtaa-raang riian|课程表|名词|学习计划|ตารางเรียนของฉันมีภาษาไทยทุกวันอังคารและพฤหัส|dtaa-raang riian khaawng chan mii phaa-saa thai thuk wan-ang-khaan lae pha-rue-hat|我的课程表每周二和周四有泰语课。|ดูตารางเรียน|duu dtaa-raang riian|看课程表|ตารางสอบ|dtaa-raang saawp|考试表|计划
dtaa-raang-saawp|ตารางสอบ|dtaa-raang saawp|考试安排表|名词|考试成绩|ครูติดตารางสอบไว้หน้าห้องเรียนให้ทุกคนดู|khruu dtit dtaa-raang saawp wai naa haawng riian hai thuk khon duu|老师把考试安排贴在教室前面给大家看。|จดตารางสอบ|jot dtaa-raang saawp|记考试安排|ตารางเรียน|dtaa-raang riian|课程表|考试
saawp-yoi|สอบย่อย|saawp yaawy|小测验|名词|考试成绩|พรุ่งนี้มีสอบย่อยคำศัพท์สิบคำหลังเริ่มเรียน|phrung-nii mii saawp yaawy kham-sap sip kham lang roem riian|明天上课后有十个词的小测验。|เตรียมสอบย่อย|dtriiam saawp yaawy|准备小测验|สอบปลายภาค|saawp bplaai phaak|期末考试|考试
saawp-bplaai-phaak|สอบปลายภาค|saawp bplaai phaak|期末考试|名词|考试成绩|สอบปลายภาคปีนี้มีข้อเขียนและข้อพูด|saawp bplaai phaak bpii nii mii khaaw khiian lae khaaw phuut|今年期末考试有笔试和口试。|อ่านหนังสือสอบปลายภาค|aan nang-sue saawp bplaai phaak|为期末考试看书|สอบย่อย|saawp yaawy|小测验|考试
khaaw-saawp|ข้อสอบ|khaaw-saawp|试题；考题|名词|考试成绩|ข้อสอบหน้าแรกง่าย แต่หน้าหลังต้องคิดนาน|khaaw-saawp naa raaek ngaai dtaae naa lang dtawng khit naan|第一页考题容易，但后面的页需要想很久。|ทำข้อสอบ|tham khaaw-saawp|做试题|คำตอบ|kham-dtaawp|答案|考试
kham-dtaawp|คำตอบ|kham-dtaawp|答案|名词|提问回答|คำตอบของข้อนี้อยู่ในบทเรียนหน้าเก้า|kham-dtaawp khaawng khaaw nii yuu nai bot-riian naa gaao|这题的答案在第九页课文里。|เขียนคำตอบ|khiian kham-dtaawp|写答案|คำถาม|kham-thaam|问题|问答
kham-thaam|คำถาม|kham-thaam|问题；提问|名词|提问回答|ถ้ามีคำถาม ให้ยกมือแล้วถามครูอย่างสุภาพ|thaa mii kham-thaam hai yok mue laaeo thaam khruu yaang su-phaap|如果有问题，请举手并礼貌地问老师。|ตอบคำถาม|dtaawp kham-thaam|回答问题|คำตอบ|kham-dtaawp|答案|问答
yok-mue|ยกมือ|yok mue|举手|动词|提问回答|นักเรียนยกมือก่อนตอบคำถามในห้องเรียน|nak-riian yok mue gaawn dtaawp kham-thaam nai haawng riian|学生在教室回答问题前先举手。|ยกมือถาม|yok mue thaam|举手提问|ตอบเลย|dtaawp loei|直接回答|问答
thaam-khruu|ถามครู|thaam khruu|问老师|动词|提问回答|ฉันถามครูเรื่องคำที่อ่านไม่ออกหลังเลิกเรียน|chan thaam khruu rueang kham thii aan mai aawk lang loek riian|下课后我问老师不会读的词。|ถามครูอีกครั้ง|thaam khruu iik khrang|再问老师一次|ถามเพื่อน|thaam phuean|问朋友|问答
thaam-phuean|ถามเพื่อน|thaam phuean|问朋友；问同学|动词|提问回答|ถ้าไม่เข้าใจการบ้าน ฉันมักถามเพื่อนร่วมชั้น|thaa mai khao-jai gaan-baan chan mak thaam phuean ruam chan|如果不懂作业，我常问同班同学。|ถามเพื่อนข้าง ๆ|thaam phuean khaang khaang|问旁边的同学|ถามครู|thaam khruu|问老师|问答
dtaawp-kham-thaam|ตอบคำถาม|dtaawp kham-thaam|回答问题|动词|提问回答|น้องตอบคำถามครูได้ชัดเจน แม้จะพูดช้า|naawng dtaawp kham-thaam khruu dai chat-jen maae ja phuut chaa|弟弟虽然说得慢，但能清楚回答老师的问题。|ตอบคำถามสั้น ๆ|dtaawp kham-thaam san san|简短回答问题|ถามคำถาม|thaam kham-thaam|提出问题|问答
a-thi-baai-iik-khrang|อธิบายอีกครั้ง|a-thi-baai iik khrang|再解释一次|短语|提问回答|ครูช่วยอธิบายอีกครั้ง เพราะหลายคนยังไม่เข้าใจ|khruu chuai a-thi-baai iik khrang phraw laai khon yang mai khao-jai|老师又解释了一次，因为很多人还不明白。|ขอให้อธิบายอีกครั้ง|khaaw hai a-thi-baai iik khrang|请求再解释一次|พูดซ้ำ|phuut sam|重复说|问答
phuut-sam|พูดซ้ำ|phuut sam|重复说；再说一遍|动词|提问回答|คุณครูพูดซ้ำคำยากสามครั้งให้นักเรียนฟัง|khun khruu phuut sam kham yaak saam khrang hai nak-riian fang|老师把难词重复说三遍给学生听。|ขอพูดซ้ำ|khaaw phuut sam|请求再说一遍|อธิบายอีกครั้ง|a-thi-baai iik khrang|再解释一次|问答
khao-jai-laaeo|เข้าใจแล้ว|khao-jai laaeo|明白了|短语|提问回答|หลังดูตัวอย่าง ฉันพูดกับครูว่าเข้าใจแล้วค่ะ|lang duu dtua-yaang chan phuut gap khruu waa khao-jai laaeo kha|看完示例后，我对老师说已经明白了。|บอกว่าเข้าใจแล้ว|baawk waa khao-jai laaeo|说已经明白了|ยังไม่เข้าใจ|yang mai khao-jai|还不明白|问答
yang-mai-khao-jai|ยังไม่เข้าใจ|yang mai khao-jai|还不明白|短语|提问回答|ถ้ายังไม่เข้าใจ อย่าอายที่จะถามครูอีกครั้ง|thaa yang mai khao-jai yaa aai thii ja thaam khruu iik khrang|如果还不明白，不要害羞，再问老师一次。|บอกว่ายังไม่เข้าใจ|baawk waa yang mai khao-jai|说还不明白|เข้าใจแล้ว|khao-jai laaeo|明白了|问答
khian-bpra-yook|เขียนประโยค|khiian bpra-yook|写句子|动词|语言学习|ครูให้เราเขียนประโยคด้วยคำศัพท์ใหม่ห้าคำ|khruu hai rao khiian bpra-yook duai kham-sap mai haa kham|老师让我们用五个新词写句子。|ฝึกเขียนประโยค|fuek khiian bpra-yook|练习写句子|อ่านประโยค|aan bpra-yook|读句子|语言
aan-bpra-yook|อ่านประโยค|aan bpra-yook|读句子|动词|语言学习|นักเรียนอ่านประโยคยาวช้า ๆ แล้วแปลเป็นภาษาจีน|nak-riian aan bpra-yook yaao chaa chaa laaeo bplaae bpen phaa-saa jiin|学生慢慢读长句，然后翻译成中文。|อ่านประโยคใหม่|aan bpra-yook mai|读新句子|เขียนประโยค|khiian bpra-yook|写句子|语言
bplaae-kham|แปลคำ|bplaae kham|翻译词语|动词|语言学习|ตอนเรียนคำใหม่ เราแปลคำเป็นภาษาจีนก่อนแต่งประโยค|dtaawn riian kham mai rao bplaae kham bpen phaa-saa jiin gaawn dtaeng bpra-yook|学习新词时，我们先把词翻译成中文，再造句。|แปลคำศัพท์|bplaae kham-sap|翻译词汇|จำคำศัพท์|jam kham-sap|记词汇|语言
dtaeng-bpra-yook|แต่งประโยค|dtaeng bpra-yook|造句|动词|语言学习|การบ้านวันนี้คือแต่งประโยคสั้น ๆ ด้วยคำว่าเรียน|gaan-baan wan-nii khue dtaeng bpra-yook san san duai kham waa riian|今天的作业是用“学习”这个词造短句。|แต่งประโยคเอง|dtaeng bpra-yook eeng|自己造句|คัดประโยค|khat bpra-yook|抄写句子|语言
khat-bpra-yook|คัดประโยค|khat bpra-yook|抄写句子|动词|语言学习|เด็ก ๆ คัดประโยคจากหนังสือเรียนลงสมุดจด|dek dek khat bpra-yook jaak nang-sue riian long sa-mut jot|孩子们把课本里的句子抄到笔记本上。|คัดประโยคห้าบรรทัด|khat bpra-yook haa ban-that|抄五行句子|แต่งประโยค|dtaeng bpra-yook|造句|语言
ban-that|บรรทัด|ban-that|行；一行字|名词|作业资料|ครูให้เขียนคำศัพท์ใหม่บรรทัดละหนึ่งคำ|khruu hai khiian kham-sap mai ban-that la neung kham|老师让每行写一个新词。|เขียนหนึ่งบรรทัด|khiian neung ban-that|写一行|หน้า|naa|页|资料
naa-nang-sue|หน้าหนังสือ|naa nang-sue|书页；第几页|名词|作业资料|เปิดหน้าหนังสือสิบสองแล้วอ่านบทสนทนาแรก|bpoet naa nang-sue sip-saawng laaeo aan bot-son-tha-naa raaek|打开书第十二页，然后读第一段对话。|เปิดหน้าหนังสือ|bpoet naa nang-sue|打开书页|บรรทัด|ban-that|行|资料
bot-son-tha-naa|บทสนทนา|bot-son-tha-naa|对话课文|名词|语言学习|บทสนทนานี้ใช้ถามทางไปห้องสมุดโรงเรียน|bot-son-tha-naa nii chai thaam thaang bpai haawng sa-mut roong-riian|这段对话用来问去学校图书馆的路。|อ่านบทสนทนา|aan bot-son-tha-naa|读对话|บทอ่าน|bot aan|阅读课文|语言
bot-aan|บทอ่าน|bot aan|阅读课文|名词|语言学习|บทอ่านวันนี้สั้น แต่มีคำใหม่หลายคำ|bot aan wan-nii san dtaae mii kham mai laai kham|今天的阅读课文很短，但有很多新词。|อ่านบทอ่าน|aan bot aan|读阅读课文|บทสนทนา|bot-son-tha-naa|对话课文|语言
kham-mai|คำใหม่|kham mai|新词|名词|语言学习|ครูเขียนคำใหม่บนกระดานและให้นักเรียนอ่านตาม|khruu khiian kham mai bon gra-daan lae hai nak-riian aan dtaam|老师把新词写在板上，让学生跟读。|เรียนคำใหม่|riian kham mai|学习新词|คำเก่า|kham gao|旧词|语言
kham-gao|คำเก่า|kham gao|旧词；学过的词|名词|语言学习|ก่อนเรียนคำใหม่ เราทบทวนคำเก่าสิบคำ|gaawn riian kham mai rao thop-thuan kham gao sip kham|学习新词前，我们复习十个旧词。|ทบทวนคำเก่า|thop-thuan kham gao|复习旧词|คำใหม่|kham mai|新词|语言
gaan-awok-siiang|การออกเสียง|gaan aawk-siiang|发音|名词|语言学习|การออกเสียงคำนี้ยาก เพราะมีเสียงวรรณยุกต์ต่างกัน|gaan aawk-siiang kham nii yaak phraw mii siiang wan-na-yuk dtaang gan|这个词的发音难，因为有不同声调。|ฝึกการออกเสียง|fuek gaan aawk-siiang|练习发音|การสะกด|gaan sa-got|拼写|语言
gaan-sa-got|การสะกด|gaan sa-got|拼写|名词|语言学习|การสะกดชื่อไทยต้องดูสระและพยัญชนะให้ดี|gaan sa-got chue thai dtawng duu sa-ra lae pha-yan-cha-na hai dii|拼写泰语名字要仔细看元音和辅音。|ฝึกการสะกด|fuek gaan sa-got|练习拼写|การออกเสียง|gaan aawk-siiang|发音|语言
sa-ra|สระ|sa-ra|元音|名词|语言学习|วันนี้ครูสอนสระใหม่และให้เขียนตัวอย่างหลายคำ|wan-nii khruu saawn sa-ra mai lae hai khiian dtua-yaang laai kham|今天老师教新元音，并让写很多例词。|เรียนสระ|riian sa-ra|学习元音|พยัญชนะ|pha-yan-cha-na|辅音|语言
pha-yan-cha-na|พยัญชนะ|pha-yan-cha-na|辅音|名词|语言学习|พยัญชนะไทยมีหลายตัว นักเรียนจึงต้องค่อย ๆ จำ|pha-yan-cha-na thai mii laai dtua nak-riian jeung dtawng khaawy khaawy jam|泰语辅音有很多个，学生要慢慢记。|อ่านพยัญชนะ|aan pha-yan-cha-na|读辅音|สระ|sa-ra|元音|语言
wan-na-yuk|วรรณยุกต์|wan-na-yuk|声调符号；声调|名词|语言学习|คำนี้มีวรรณยุกต์ ครูจึงให้ฟังเสียงอีกครั้ง|kham nii mii wan-na-yuk khruu jeung hai fang siiang iik khrang|这个词有声调，老师所以让再听一次声音。|ฝึกวรรณยุกต์|fuek wan-na-yuk|练声调|การออกเสียง|gaan aawk-siiang|发音|语言
phaa-saa-maae|ภาษาแม่|phaa-saa maae|母语|名词|语言学习|ภาษาแม่ของฉันคือภาษาจีน แต่ฉันกำลังเรียนภาษาไทย|phaa-saa maae khaawng chan khue phaa-saa jiin dtaae chan gam-lang riian phaa-saa thai|我的母语是中文，但我正在学泰语。|ใช้ภาษาแม่|chai phaa-saa maae|使用母语|ภาษาที่เรียน|phaa-saa thii riian|正在学的语言|语言
phaa-saa-thii-riian|ภาษาที่เรียน|phaa-saa thii riian|正在学的语言|名词|语言学习|ภาษาไทยเป็นภาษาที่เรียนใหม่สำหรับนักเรียนจีนหลายคน|phaa-saa thai bpen phaa-saa thii riian mai sam-rap nak-riian jiin laai khon|泰语对很多中国学生来说是正在学的新语言。|ฝึกภาษาที่เรียน|fuek phaa-saa thii riian|练正在学的语言|ภาษาแม่|phaa-saa maae|母语|语言
saawn-phaa-saa|สอนภาษา|saawn phaa-saa|教语言|动词|语言学习|ครูคนนี้สอนภาษาไทยชัดและพูดไม่เร็วเกินไป|khruu khon nii saawn phaa-saa thai chat lae phuut mai reo goen bpai|这位老师教泰语很清楚，说得不过快。|สอนภาษาไทย|saawn phaa-saa thai|教泰语|เรียนภาษา|riian phaa-saa|学语言|语言
riian-phaa-saa|เรียนภาษา|riian phaa-saa|学语言|动词|语言学习|การเรียนภาษาต้องฟัง พูด อ่าน และเขียนบ่อย ๆ|gaan riian phaa-saa dtawng fang phuut aan lae khiian baawy baawy|学语言要经常听、说、读、写。|เรียนภาษาทุกวัน|riian phaa-saa thuk wan|每天学语言|สอนภาษา|saawn phaa-saa|教语言|语言
fuek-fang|ฝึกฟัง|fuek fang|练听力|动词|语言学习|ฉันฝึกฟังบทสนทนาสั้น ๆ ระหว่างนั่งรถไปโรงเรียน|chan fuek fang bot-son-tha-naa san san ra-waang nang rot bpai roong-riian|我坐车去学校时练听短对话。|ฝึกฟังทุกเช้า|fuek fang thuk chaao|每天早上练听力|ฝึกพูด|fuek phuut|练口语|语言
fuek-phuut|ฝึกพูด|fuek phuut|练口语|动词|语言学习|เราใช้เวลาสิบนาทีฝึกพูดกับเพื่อนก่อนสอบพูด|rao chai wee-laa sip naa-thii fuek phuut gap phuean gaawn saawp phuut|口试前，我们花十分钟和朋友练口语。|ฝึกพูดเป็นคู่|fuek phuut bpen khuu|两人一组练口语|ฝึกฟัง|fuek fang|练听力|语言
fuek-aan|ฝึกอ่าน|fuek aan|练阅读；练读|动词|语言学习|นักเรียนฝึกอ่านบทอ่านสั้น ๆ แล้วตอบคำถาม|nak-riian fuek aan bot aan san san laaeo dtaawp kham-thaam|学生练读短阅读课文，然后回答问题。|ฝึกอ่านออกเสียง|fuek aan aawk-siiang|练朗读|ฝึกเขียน|fuek khiian|练写作|语言
fuek-khian|ฝึกเขียน|fuek khiian|练写作；练书写|动词|语言学习|คืนนี้ฉันฝึกเขียนประโยคง่าย ๆ สิบประโยค|khuen-nii chan fuek khiian bpra-yook ngaai ngaai sip bpra-yook|今晚我练写十个简单句子。|ฝึกเขียนทุกวัน|fuek khiian thuk wan|每天练写作|ฝึกอ่าน|fuek aan|练阅读|语言
khian-chue|เขียนชื่อ|khiian chue|写名字|动词|作业资料|ก่อนส่งใบงาน อย่าลืมเขียนชื่อและชั้นเรียน|gaawn song bai ngaan yaa luem khiian chue lae chan riian|交练习单前，别忘了写名字和班级。|เขียนชื่อบนกระดาษ|khiian chue bon gra-daat|在纸上写名字|เซ็นชื่อ|sen chue|签名|资料
sen-chue|เซ็นชื่อ|sen chue|签名|动词|作业资料|ผู้ปกครองต้องเซ็นชื่อในสมุดการบ้านของลูก|phuu-bpok-khraawng dtawng sen chue nai sa-mut gaan-baan khaawng luuk|家长必须在孩子的作业本上签名。|เซ็นชื่อรับทราบ|sen chue rap-saap|签名确认|เขียนชื่อ|khiian chue|写名字|资料
khit-lek|คิดเลข|khit leek|算数|动词|课堂活动|ตอนเรียนคณิตศาสตร์ เราคิดเลขจากโจทย์ง่าย ๆ|dtaawn riian kha-nit-saat rao khit leek jaak joot ngaai ngaai|上数学课时，我们根据简单题目算数。|ฝึกคิดเลข|fuek khit leek|练算数|อ่านโจทย์|aan joot|读题|课堂
aan-joot|อ่านโจทย์|aan joot|读题|动词|考试成绩|ถ้าอ่านโจทย์ไม่ดี คำตอบอาจผิดได้ง่าย|thaa aan joot mai dii kham-dtaawp aat phit dai ngaai|如果不好好读题，答案可能很容易错。|อ่านโจทย์ช้า ๆ|aan joot chaa chaa|慢慢读题|คิดเลข|khit leek|算数|考试
khit-kham-dtaawp|คิดคำตอบ|khit kham-dtaawp|想答案|动词|提问回答|ครูให้เวลานักเรียนสองนาทีเพื่อคิดคำตอบ|khruu hai wee-laa nak-riian saawng naa-thii phuea khit kham-dtaawp|老师给学生两分钟想答案。|คิดคำตอบก่อนพูด|khit kham-dtaawp gaawn phuut|说之前想答案|เดาคำตอบ|dao kham-dtaawp|猜答案|问答
dao-kham-dtaawp|เดาคำตอบ|dao kham-dtaawp|猜答案|动词|提问回答|ถ้าไม่รู้จริง ๆ อย่าเดาคำตอบทุกข้อ|thaa mai ruu jing jing yaa dao kham-dtaawp thuk khaaw|如果真的不知道，不要每题都猜答案。|เดาคำตอบผิด|dao kham-dtaawp phit|猜错答案|คิดคำตอบ|khit kham-dtaawp|想答案|问答
khian-phit|เขียนผิด|khiian phit|写错|动词|作业资料|ฉันเขียนผิดหนึ่งคำ จึงใช้ยางลบแล้วเขียนใหม่|chan khiian phit neung kham jeung chai yaang-lop laaeo khiian mai|我写错一个词，所以用橡皮擦掉再重写。|เขียนผิดบ่อย|khiian phit baawy|经常写错|เขียนถูก|khiian thuuk|写对|作业
khian-thuuk|เขียนถูก|khiian thuuk|写对|动词|作业资料|คำนี้เขียนถูกแล้ว แต่การออกเสียงยังต้องฝึก|kham nii khiian thuuk laaeo dtaae gaan aawk-siiang yang dtawng fuek|这个词已经写对了，但发音还要练。|เขียนถูกทุกคำ|khiian thuuk thuk kham|每个词都写对|เขียนผิด|khiian phit|写错|作业
dtaawp-phit|ตอบผิด|dtaawp phit|答错|动词|考试成绩|ฉันตอบผิดสองข้อ เพราะอ่านคำสั่งเร็วเกินไป|chan dtaawp phit saawng khaaw phraw aan kham-sang reo goen bpai|我答错两题，因为读要求读得太快。|ตอบผิดข้อหนึ่ง|dtaawp phit khaaw neung|答错一题|ตอบถูก|dtaawp thuuk|答对|考试
dtaawp-thuuk|ตอบถูก|dtaawp thuuk|答对|动词|考试成绩|เพื่อนตอบถูกเกือบทุกข้อในการสอบย่อย|phuean dtaawp thuuk geuuap thuk khaaw nai gaan saawp yaawy|朋友在小测验中几乎每题都答对了。|ตอบถูกห้าข้อ|dtaawp thuuk haa khaaw|答对五题|ตอบผิด|dtaawp phit|答错|考试
khanaen-dii|คะแนนดี|kha-naaen dii|分数好；成绩好|形容词|考试成绩|ถ้าทบทวนบทเรียนทุกวัน คะแนนดีขึ้นแน่นอน|thaa thop-thuan bot-riian thuk wan kha-naaen dii kheun naae-naawn|如果每天复习课文，分数一定会更好。|ได้คะแนนดี|dai kha-naaen dii|取得好分数|คะแนนน้อย|kha-naaen naawy|分数少|成绩
kha-naaen-naawy|คะแนนน้อย|kha-naaen naawy|分数少|形容词|考试成绩|ครั้งนี้คะแนนน้อย แต่ครูบอกว่ายังแก้ไขได้|khrang nii kha-naaen naawy dtaae khruu baawk waa yang gaae-khai dai|这次分数少，但老师说还可以改进。|ได้คะแนนน้อย|dai kha-naaen naawy|得分少|คะแนนดี|kha-naaen dii|分数好|成绩
phon-saawp|ผลสอบ|phon saawp|考试结果|名词|考试成绩|ผลสอบจะออกวันจันทร์ ครูให้ดูในระบบโรงเรียน|phon saawp ja aawk wan-jan khruu hai duu nai ra-bop roong-riian|考试结果周一出来，老师让在学校系统里看。|ดูผลสอบ|duu phon saawp|看考试结果|คะแนน|kha-naaen|分数|成绩
radap-kha-naaen|ระดับคะแนน|ra-dap kha-naaen|成绩等级|名词|考试成绩|ระดับคะแนนของวิชานี้แบ่งเป็นสี่ระดับ|ra-dap kha-naaen khaawng wi-chaa nii baeng bpen sii ra-dap|这门课的成绩等级分为四个等级。|ดูระดับคะแนน|duu ra-dap kha-naaen|看成绩等级|ผลสอบ|phon saawp|考试结果|成绩
phaan-saawp|ผ่านสอบ|phaan saawp|考试通过|动词|考试成绩|เขาผ่านสอบพูดเพราะฝึกกับเพื่อนทุกเย็น|khao phaan saawp phuut phraw fuek gap phuean thuk yen|他通过口试，因为每天傍晚和朋友练习。|ผ่านสอบครั้งนี้|phaan saawp khrang nii|通过这次考试|สอบไม่ผ่าน|saawp mai phaan|考试没通过|考试
saawp-mai-phaan|สอบไม่ผ่าน|saawp mai phaan|考试没通过|动词|考试成绩|ถ้าสอบไม่ผ่าน ครูจะให้โอกาสสอบใหม่อีกครั้ง|thaa saawp mai phaan khruu ja hai oo-gaad saawp mai iik khrang|如果考试没通过，老师会给一次重考机会。|กลัวสอบไม่ผ่าน|glua saawp mai phaan|怕考试不过|ผ่านสอบ|phaan saawp|考试通过|考试
saawp-mai|สอบใหม่|saawp mai|重考；补考|动词|考试成绩|นักเรียนที่ป่วยวันสอบสามารถสอบใหม่วันศุกร์ได้|nak-riian thii bpuai wan saawp saa-maat saawp mai wan-suk dai|考试当天生病的学生可以周五补考。|ขอสอบใหม่|khaaw saawp mai|申请重考|ส่งงานใหม่|song ngaan mai|重新交作业|考试
song-ngaan-mai|ส่งงานใหม่|song ngaan mai|重新交作业|动词|作业资料|ครูให้ฉันส่งงานใหม่หลังแก้คำตอบผิดทั้งหมด|khruu hai chan song ngaan mai lang gaae kham-dtaawp phit thang-mot|老师让我把错答案全部改完后重新交作业。|ส่งงานใหม่พรุ่งนี้|song ngaan mai phrung-nii|明天重新交作业|สอบใหม่|saawp mai|重考|作业
khruu-chom|ครูชม|khruu chom|老师表扬|动词|考试成绩|ครูชมกลุ่มของเราว่าอ่านบทสนทนาได้ชัด|khruu chom glum khaawng rao waa aan bot-son-tha-naa dai chat|老师表扬我们小组对话读得清楚。|ได้รับคำชมจากครู|dai rap kham-chom jaak khruu|得到老师表扬|ครูเตือน|khruu dteuan|老师提醒|反馈
khruu-dteuan|ครูเตือน|khruu dteuan|老师提醒|动词|课堂活动|ครูเตือนว่าอย่าคุยเสียงดังตอนเพื่อนตอบคำถาม|khruu dteuan waa yaa khui siiang dang dtaawn phuean dtaawp kham-thaam|老师提醒说，朋友回答问题时不要大声聊天。|ครูเตือนเบา ๆ|khruu dteuan bao bao|老师轻声提醒|ครูชม|khruu chom|老师表扬|反馈
kham-nae-nam-khruu|คำแนะนำครู|kham-nae-nam khruu|老师建议|名词|考试成绩|ฉันอ่านคำแนะนำครูแล้วรู้ว่าควรฝึกเขียนเพิ่ม|chan aan kham-nae-nam khruu laaeo ruu waa khuuan fuek khiian phoem|我看了老师建议后知道应该多练写作。|ฟังคำแนะนำครู|fang kham-nae-nam khruu|听老师建议|คำตอบครู|kham-dtaawp khruu|老师答案|反馈
bot-fuek-phuut|บทฝึกพูด|bot fuek phuut|口语练习材料|名词|语言学习|บทฝึกพูดวันนี้มีคำถามเรื่องครอบครัวห้าข้อ|bot fuek phuut wan-nii mii kham-thaam rueang khraawp-khruua haa khaaw|今天的口语练习材料有五个关于家庭的问题。|ใช้บทฝึกพูด|chai bot fuek phuut|使用口语练习材料|บทอ่าน|bot aan|阅读课文|语言
faai-siiang|ไฟล์เสียง|faai siiang|音频文件|名词|语言学习|ครูส่งไฟล์เสียงให้นักเรียนฝึกฟังที่บ้าน|khruu song faai siiang hai nak-riian fuek fang thii baan|老师把音频文件发给学生在家练听力。|เปิดไฟล์เสียง|bpoet faai siiang|打开音频文件|วิดีโอเรียน|wi-dii-oo riian|学习视频|资料
wi-dii-oo-riian|วิดีโอเรียน|wi-dii-oo riian|学习视频|名词|作业资料|ถ้าขาดเรียน ให้ดูวิดีโอเรียนแล้วทำใบงาน|thaa khaat riian hai duu wi-dii-oo riian laaeo tham bai ngaan|如果缺课，就看学习视频后做练习单。|ดูวิดีโอเรียน|duu wi-dii-oo riian|看学习视频|ไฟล์เสียง|faai siiang|音频文件|资料
rian-awn-lai|เรียนออนไลน์|riian awn-lai|线上学习；网课|动词|课堂活动|วันฝนตกหนัก โรงเรียนให้ทุกชั้นเรียนออนไลน์ที่บ้าน|wan fon dtok nak roong-riian hai thuk chan riian awn-lai thii baan|大雨天，学校让所有班级在家上网课。|เข้าเรียนออนไลน์|khao riian awn-lai|参加线上课|เรียนในห้อง|riian nai haawng|在教室上课|课堂
riian-nai-haawng|เรียนในห้อง|riian nai haawng|在教室上课|动词|课堂活动|เด็กส่วนใหญ่ชอบเรียนในห้อง เพราะถามครูได้ทันที|dek suan-yai chaawp riian nai haawng phraw thaam khruu dai than-thii|大多数孩子喜欢在教室上课，因为可以马上问老师。|กลับมาเรียนในห้อง|glap maa riian nai haawng|回来教室上课|เรียนออนไลน์|riian awn-lai|线上学习|课堂
sa-mut-gaan-baan|สมุดการบ้าน|sa-mut gaan-baan|作业本|名词|作业资料|สมุดการบ้านของน้องมีลายเซ็นผู้ปกครองทุกหน้า|sa-mut gaan-baan khaawng naawng mii laai-sen phuu-bpok-khraawng thuk naa|弟弟的作业本每页都有家长签名。|เปิดสมุดการบ้าน|bpoet sa-mut gaan-baan|打开作业本|สมุดจด|sa-mut jot|笔记本|用品
laai-sen|ลายเซ็น|laai-sen|签名；署名|名词|作业资料|ครูขอลายเซ็นผู้ปกครองหลังอ่านผลสอบ|khruu khaaw laai-sen phuu-bpok-khraawng lang aan phon saawp|老师要求家长看完考试结果后签名。|เขียนลายเซ็น|khiian laai-sen|写签名|ชื่อ|chue|名字|资料
phuu-bpok-khraawng|ผู้ปกครอง|phuu-bpok-khraawng|家长；监护人|名词|学校场所|ผู้ปกครองเข้าประชุมกับครูประจำชั้นตอนเย็น|phuu-bpok-khraawng khao bpra-chum gap khruu bpra-jam chan dtaawn yen|家长晚上和班主任开会。|แจ้งผู้ปกครอง|jaaeng phuu-bpok-khraawng|通知家长|นักเรียน|nak-riian|学生|人物
pra-chum-phuu-bpok-khraawng|ประชุมผู้ปกครอง|bpra-chum phuu-bpok-khraawng|家长会|名词|学校场所|โรงเรียนมีประชุมผู้ปกครองหลังประกาศผลสอบ|roong-riian mii bpra-chum phuu-bpok-khraawng lang bpra-gaat phon saawp|学校在公布考试结果后开家长会。|ไปประชุมผู้ปกครอง|bpai bpra-chum phuu-bpok-khraawng|去参加家长会|ประชุมครู|bpra-chum khruu|教师会议|场所
bpra-gaat-phon|ประกาศผล|bpra-gaat phon|公布结果|动词|考试成绩|ครูจะประกาศผลสอบย่อยในห้องเรียนพรุ่งนี้|khruu ja bpra-gaat phon saawp yaawy nai haawng riian phrung-nii|老师明天会在教室公布小测验结果。|ประกาศผลสอบ|bpra-gaat phon saawp|公布考试结果|ดูผลสอบ|duu phon saawp|看考试结果|成绩
riian-duai-dtua-eeng|เรียนด้วยตัวเอง|riian duai dtua-eeng|自学|动词|学习计划|วันอาทิตย์ฉันเรียนด้วยตัวเองจากหนังสือและไฟล์เสียง|wan-aa-thit chan riian duai dtua-eeng jaak nang-sue lae faai siiang|周日我用书和音频文件自学。|ฝึกเรียนด้วยตัวเอง|fuek riian duai dtua-eeng|练习自学|เรียนกับครู|riian gap khruu|跟老师学|计划
riian-gap-khruu|เรียนกับครู|riian gap khruu|跟老师学|动词|学习计划|ฉันเรียนกับครูไทยสัปดาห์ละสองครั้ง|chan riian gap khruu thai sap-daa la saawng khrang|我每周跟泰国老师学两次。|เรียนกับครูออนไลน์|riian gap khruu awn-lai|线上跟老师学|เรียนด้วยตัวเอง|riian duai dtua-eeng|自学|计划
waang-phaaen-riian|วางแผนเรียน|waang phaaen riian|制定学习计划|动词|学习计划|ก่อนสอบปลายภาค ฉันวางแผนเรียนวันละหนึ่งชั่วโมง|gaawn saawp bplaai phaak chan waang phaaen riian wan la neung chua-moong|期末考试前，我制定每天学习一小时的计划。|วางแผนเรียนภาษาไทย|waang phaaen riian phaa-saa thai|制定泰语学习计划|เรียนไปเรื่อย ๆ|riian bpai reuuai reuuai|随意学|计划
bplian-wi-thii-riian|เปลี่ยนวิธีเรียน|bpliian wi-thii riian|改变学习方法|动词|学习计划|ถ้าจำคำศัพท์ไม่ได้ ฉันจะเปลี่ยนวิธีเรียนใหม่|thaa jam kham-sap mai dai chan ja bpliian wi-thii riian mai|如果记不住词汇，我会改变学习方法。|เปลี่ยนวิธีเรียนให้เหมาะ|bpliian wi-thii riian hai maw|把学习方法改得合适|ทำแบบเดิม|tham baep doem|照旧做|计划
wi-thii-riian|วิธีเรียน|wi-thii riian|学习方法|名词|学习计划|วิธีเรียนของแต่ละคนไม่เหมือนกัน ต้องลองหลายแบบ|wi-thii riian khaawng dtaae la khon mai muean gan dtawng laawng laai baep|每个人的学习方法不同，要尝试多种方式。|เลือกวิธีเรียน|leuuak wi-thii riian|选择学习方法|ตารางเรียน|dtaa-raang riian|课程表|计划
bpao-maai-riian|เป้าหมายเรียน|bpao-maai riian|学习目标|名词|学习计划|เป้าหมายเรียนเดือนนี้คืออ่านบทสนทนาได้คล่องขึ้น|bpao-maai riian duean nii khue aan bot-son-tha-naa dai khlaawng kheun|这个月的学习目标是把对话读得更流利。|ตั้งเป้าหมายเรียน|dtang bpao-maai riian|设定学习目标|แผนเรียน|phaaen riian|学习计划|计划
phaaen-riian|แผนเรียน|phaaen riian|学习计划|名词|学习计划|แผนเรียนของฉันมีฝึกฟังตอนเช้าและทบทวนตอนเย็น|phaaen riian khaawng chan mii fuek fang dtaawn chaao lae thop-thuan dtaawn yen|我的学习计划包括早上练听力、晚上复习。|ทำแผนเรียน|tham phaaen riian|做学习计划|เป้าหมายเรียน|bpao-maai riian|学习目标|计划
khlaawng-kheun|คล่องขึ้น|khlaawng kheun|更流利；更熟练|形容词|语言学习|หลังฝึกพูดทุกวัน ฉันอ่านบทสนทนาได้คล่องขึ้น|lang fuek phuut thuk wan chan aan bot-son-tha-naa dai khlaawng kheun|每天练口语后，我读对话更流利了。|พูดคล่องขึ้น|phuut khlaawng kheun|说得更流利|ติดขัด|dtit-khat|卡顿|语言
dtit-khat|ติดขัด|dtit-khat|卡顿；不顺|形容词|语言学习|ตอนพูดหน้าชั้น ฉันติดขัดนิดหน่อยเพราะตื่นเต้น|dtaawn phuut naa chan chan dtit-khat nit naawy phraw dteun-dten|在班上发言时，我因为紧张有点卡顿。|อ่านติดขัด|aan dtit-khat|读得卡顿|คล่องขึ้น|khlaawng kheun|更流利|语言
phuut-naa-chan|พูดหน้าชั้น|phuut naa chan|在班上发言|动词|课堂活动|พรุ่งนี้ฉันต้องพูดหน้าชั้นเรื่องครอบครัวของตัวเอง|phrung-nii chan dtawng phuut naa chan rueang khraawp-khruua khaawng dtua-eeng|明天我必须在班上讲自己的家庭。|ฝึกพูดหน้าชั้น|fuek phuut naa chan|练习班上发言|พูดเป็นคู่|phuut bpen khuu|两人对话|课堂
phuut-bpen-khuu|พูดเป็นคู่|phuut bpen khuu|两人一组说；两人对话|动词|课堂活动|ครูให้เราพูดเป็นคู่โดยใช้คำถามในหนังสือเรียน|khruu hai rao phuut bpen khuu dooi chai kham-thaam nai nang-sue riian|老师让我们两人一组，用课本里的问题对话。|ฝึกพูดเป็นคู่|fuek phuut bpen khuu|练两人对话|พูดหน้าชั้น|phuut naa chan|在班上发言|课堂
thian-kham-dtaawp|เทียบคำตอบ|thiiap kham-dtaawp|对答案|动词|作业资料|หลังทำแบบฝึกหัด เราเทียบคำตอบกับเพื่อนข้าง ๆ|lang tham baep-fuek-hat rao thiiap kham-dtaawp gap phuean khaang khaang|做完练习题后，我们和旁边同学对答案。|เทียบคำตอบกัน|thiiap kham-dtaawp gan|互相对答案|ลอกคำตอบ|laawk kham-dtaawp|抄答案|作业
laawk-kham-dtaawp|ลอกคำตอบ|laawk kham-dtaawp|抄答案|动词|作业资料|ครูบอกว่าอย่าลอกคำตอบ ต้องลองคิดเองก่อน|khruu baawk waa yaa laawk kham-dtaawp dtawng laawng khit eeng gaawn|老师说不要抄答案，必须先自己试着想。|ลอกคำตอบเพื่อน|laawk kham-dtaawp phuean|抄朋友答案|คิดเอง|khit eeng|自己想|作业
khit-eeng|คิดเอง|khit eeng|自己想|动词|提问回答|ข้อนี้ยาก แต่ครูอยากให้ทุกคนคิดเองก่อนถาม|khaaw nii yaak dtaae khruu yaak hai thuk khon khit eeng gaawn thaam|这一题难，但老师想让大家先自己想再问。|ลองคิดเอง|laawng khit eeng|试着自己想|ลอกคำตอบ|laawk kham-dtaawp|抄答案|问答
laawng-tham|ลองทำ|laawng tham|试着做|动词|作业资料|ถ้าไม่แน่ใจ ให้ลองทำข้อแรกแล้วถามครู|thaa mai naae-jai hai laawng tham khaaw raaek laaeo thaam khruu|如果不确定，就先试着做第一题再问老师。|ลองทำแบบฝึกหัด|laawng tham baep-fuek-hat|试做练习题|ข้ามข้อ|khaam khaaw|跳过题目|作业
khaam-khaaw|ข้ามข้อ|khaam khaaw|跳过题目|动词|考试成绩|ถ้าข้อนี้ยากมาก ให้ข้ามข้อแล้วกลับมาทำทีหลัง|thaa khaaw nii yaak maak hai khaam khaaw laaeo glap maa tham thii-lang|如果这一题很难，就先跳过，之后再回来做。|ข้ามข้อยาก|khaam khaaw yaak|跳过难题|ลองทำ|laawng tham|试着做|考试
gaae-khai|แก้ไข|gaae-khai|改正；修改|动词|作业资料|ครูให้เวลาเราสิบนาทีเพื่อแก้ไขประโยคที่ผิด|khruu hai wee-laa rao sip naa-thii phuea gaae-khai bpra-yook thii phit|老师给我们十分钟修改错误句子。|แก้ไขงาน|gaae-khai ngaan|修改作业|ส่งเลย|song loei|直接提交|作业
song-loei|ส่งเลย|song loei|直接交；马上提交|动词|作业资料|ถ้าตรวจครบแล้ว สามารถส่งเลยได้ที่โต๊ะครู|thaa dtruat khrop laaeo saa-maat song loei dai thii dto khruu|如果检查完了，可以直接交到老师桌上。|ส่งเลยหลังทำเสร็จ|song loei lang tham set|做完后马上交|แก้ไขก่อน|gaae-khai gaawn|先修改|作业
tham-set|ทำเสร็จ|tham set|做完|动词|作业资料|เมื่อทำเสร็จแล้ว อย่าลืมตรวจคำตอบอีกครั้ง|muea tham set laaeo yaa luem dtruat kham-dtaawp iik khrang|做完以后，别忘了再检查一次答案。|ทำเสร็จตรงเวลา|tham set dtrong wee-laa|按时做完|ยังทำไม่เสร็จ|yang tham mai set|还没做完|作业
yang-tham-mai-set|ยังทำไม่เสร็จ|yang tham mai set|还没做完|短语|作业资料|ฉันยังทำไม่เสร็จ เพราะแบบฝึกหัดหน้าสุดท้ายยาก|chan yang tham mai set phraw baep-fuek-hat naa sut-thaai yaak|我还没做完，因为最后一页练习题很难。|บอกว่ายังทำไม่เสร็จ|baawk waa yang tham mai set|说还没做完|ทำเสร็จ|tham set|做完|作业
ngaan-yak|งานยาก|ngaan yaak|难的作业；难任务|名词|作业资料|งานยากชิ้นนี้ต้องใช้เวลาและต้องถามครูหลายครั้ง|ngaan yaak chin nii dtawng chai wee-laa lae dtawng thaam khruu laai khrang|这项难作业需要时间，也要问老师好几次。|ทำงานยาก|tham ngaan yaak|做难任务|งานง่าย|ngaan ngaai|简单作业|作业
ngaan-ngaai|งานง่าย|ngaan ngaai|简单作业；简单任务|名词|作业资料|งานง่ายวันนี้คือคัดคำศัพท์ใหม่ลงสมุดจด|ngaan ngaai wan-nii khue khat kham-sap mai long sa-mut jot|今天的简单作业是把新词抄进笔记本。|เริ่มจากงานง่าย|roem jaak ngaan ngaai|从简单任务开始|งานยาก|ngaan yaak|难作业|作业
rian-than|เรียนทัน|riian than|跟得上学习进度|动词|学习计划|ถ้าขาดเรียนหนึ่งวัน ต้องดูวิดีโอเพื่อเรียนทันเพื่อน|thaa khaat riian neung wan dtawng duu wi-dii-oo phuea riian than phuean|如果缺课一天，要看视频以便跟上同学。|เรียนทันบทใหม่|riian than bot mai|跟上新课|เรียนไม่ทัน|riian mai than|跟不上|计划
rian-mai-than|เรียนไม่ทัน|riian mai than|跟不上学习进度|动词|学习计划|ช่วงแรกฉันเรียนไม่ทัน เพราะอ่านภาษาไทยช้า|chuang raaek chan riian mai than phraw aan phaa-saa thai chaa|一开始我跟不上，因为读泰语慢。|กลัวเรียนไม่ทัน|glua riian mai than|怕跟不上|เรียนทัน|riian than|跟得上|计划
khruu-hai-gaan-baan|ครูให้การบ้าน|khruu hai gaan-baan|老师布置作业|短语|作业资料|วันนี้ครูให้การบ้านน้อย เพราะพรุ่งนี้มีสอบย่อย|wan-nii khruu hai gaan-baan naawy phraw phrung-nii mii saawp yaawy|今天老师布置的作业少，因为明天有小测验。|ครูให้การบ้านเพิ่ม|khruu hai gaan-baan phoem|老师多布置作业|นักเรียนส่งการบ้าน|nak-riian song gaan-baan|学生交作业|作业
nak-riian-song-gaan-baan|นักเรียนส่งการบ้าน|nak-riian song gaan-baan|学生交作业|短语|作业资料|นักเรียนส่งการบ้านที่โต๊ะครูก่อนออกจากห้อง|nak-riian song gaan-baan thii dto khruu gaawn aawk jaak haawng|学生离开教室前把作业交到老师桌上。|นักเรียนส่งการบ้านครบ|nak-riian song gaan-baan khrop|学生作业交齐|ครูให้การบ้าน|khruu hai gaan-baan|老师布置作业|作业
ruu-kham-maai|รู้ความหมาย|ruu khwaam-maai|知道意思|动词|语言学习|ถ้ารู้ความหมายของคำแล้ว จะอ่านประโยคได้ง่ายขึ้น|thaa ruu khwaam-maai khaawng kham laaeo ja aan bpra-yook dai ngaai kheun|如果知道词义，读句子就会更容易。|รู้ความหมายคำใหม่|ruu khwaam-maai kham mai|知道新词意思|เดาความหมาย|dao khwaam-maai|猜意思|语言
dao-khwaam-maai|เดาความหมาย|dao khwaam-maai|猜意思|动词|语言学习|เมื่อเจอคำใหม่ในบทอ่าน ฉันลองเดาความหมายก่อนเปิดพจนานุกรม|muea joe kham mai nai bot aan chan laawng dao khwaam-maai gaawn bpoet phot-ja-naa-nu-grom|在阅读课文里遇到新词时，我先试着猜意思再查词典。|เดาความหมายจากประโยค|dao khwaam-maai jaak bpra-yook|从句子猜意思|รู้ความหมาย|ruu khwaam-maai|知道意思|语言
bpoet-phot-ja-naa-nu-grom|เปิดพจนานุกรม|bpoet phot-ja-naa-nu-grom|查词典；打开词典|动词|语言学习|ฉันเปิดพจนานุกรมเพื่อดูการสะกดและความหมาย|chan bpoet phot-ja-naa-nu-grom phuea duu gaan sa-got lae khwaam-maai|我查词典来看拼写和意思。|เปิดพจนานุกรมไทย|bpoet phot-ja-naa-nu-grom thai|查泰语词典|ถามครู|thaam khruu|问老师|语言
phot-ja-naa-nu-grom-lek|พจนานุกรมเล็ก|phot-ja-naa-nu-grom lek|小词典|名词|学习用品|พจนานุกรมเล็กเล่มนี้ช่วยฉันทำการบ้านภาษาไทย|phot-ja-naa-nu-grom lek lem nii chuai chan tham gaan-baan phaa-saa thai|这本小词典帮我做泰语作业。|ใช้พจนานุกรมเล็ก|chai phot-ja-naa-nu-grom lek|使用小词典|แอปแปลภาษา|aaep bplaae phaa-saa|翻译应用|用品
aaep-bplaae-phaa-saa|แอปแปลภาษา|aaep bplaae phaa-saa|翻译应用|名词|学习用品|แอปแปลภาษาช่วยได้ แต่ต้องตรวจคำตอบกับครูด้วย|aaep bplaae phaa-saa chuai dai dtaae dtawng dtruat kham-dtaawp gap khruu duai|翻译应用有帮助，但也要和老师核对答案。|ใช้แอปแปลภาษา|chai aaep bplaae phaa-saa|使用翻译应用|พจนานุกรมเล็ก|phot-ja-naa-nu-grom lek|小词典|用品
khruueang-khit-lek-riian|เครื่องคิดเลขเรียน|khreuuang khit leek riian|学习用计算器|名词|学习用品|เครื่องคิดเลขเรียนอยู่ในกระเป๋านักเรียนของฉัน|khreuuang khit leek riian yuu nai gra-bpao nak-riian khaawng chan|学习用计算器在我的书包里。|หยิบเครื่องคิดเลขเรียน|yip khreuuang khit leek riian|拿学习用计算器|ดินสอ|din-saaw|铅笔|用品
gra-bpao-nak-riian|กระเป๋านักเรียน|gra-bpao nak-riian|书包|名词|学习用品|กระเป๋านักเรียนใบนี้หนัก เพราะมีหนังสือเรียนหลายเล่ม|gra-bpao nak-riian bai nii nak phraw mii nang-sue riian laai lem|这个书包很重，因为有很多本课本。|จัดกระเป๋านักเรียน|jat gra-bpao nak-riian|整理书包|กล่องดินสอ|glaawng din-saaw|铅笔盒|用品
glaawng-din-saaw|กล่องดินสอ|glaawng din-saaw|铅笔盒|名词|学习用品|ในกล่องดินสอมีดินสอ ยางลบ และไม้บรรทัด|nai glaawng din-saaw mii din-saaw yaang-lop lae mai-ban-that|铅笔盒里有铅笔、橡皮和尺子。|เปิดกล่องดินสอ|bpoet glaawng din-saaw|打开铅笔盒|กระเป๋านักเรียน|gra-bpao nak-riian|书包|用品
mai-ban-that|ไม้บรรทัด|mai-ban-that|尺子|名词|学习用品|ครูให้ใช้ไม้บรรทัดขีดเส้นใต้คำสำคัญ|khruu hai chai mai-ban-that khiit sen dtai kham sam-khan|老师让用尺子给关键词画下划线。|ใช้ไม้บรรทัด|chai mai-ban-that|用尺子|ยางลบ|yaang-lop|橡皮|用品
khiit-sen-dtai|ขีดเส้นใต้|khiit sen dtai|画下划线|动词|作业资料|นักเรียนขีดเส้นใต้คำใหม่ในบทอ่านด้วยดินสอ|nak-riian khiit sen dtai kham mai nai bot aan duai din-saaw|学生用铅笔在阅读课文的新词下画线。|ขีดเส้นใต้คำสำคัญ|khiit sen dtai kham sam-khan|给关键词画下划线|วงคำ|wong kham|圈词|资料
wong-kham|วงคำ|wong kham|圈词|动词|作业资料|ครูให้วงคำที่มีสระเดียวกันในแบบฝึกหัด|khruu hai wong kham thii mii sa-ra diao gan nai baep-fuek-hat|老师让在练习题里圈出有相同元音的词。|วงคำตอบ|wong kham-dtaawp|圈答案|ขีดเส้นใต้|khiit sen dtai|画下划线|资料
kham-sam-khan|คำสำคัญ|kham sam-khan|关键词|名词|作业资料|ถ้าหาคำสำคัญเจอ จะตอบคำถามได้เร็วขึ้น|thaa haa kham sam-khan joe ja dtaawp kham-thaam dai reo kheun|如果找到关键词，就能更快回答问题。|หาคำสำคัญ|haa kham sam-khan|找关键词|คำใหม่|kham mai|新词|资料
khaaw-ngeun|ข้อหนึ่ง|khaaw neung|第一题|名词|考试成绩|ข้อหนึ่งง่ายมาก แต่ข้อสองต้องอ่านโจทย์สองรอบ|khaaw neung ngaai maak dtaae khaaw saawng dtawng aan joot saawng raawp|第一题很简单，但第二题要读两遍题。|ทำข้อหนึ่งก่อน|tham khaaw neung gaawn|先做第一题|ข้อสุดท้าย|khaaw sut-thaai|最后一题|考试
khaaw-sut-thaai|ข้อสุดท้าย|khaaw sut-thaai|最后一题|名词|考试成绩|ฉันทำข้อสุดท้ายไม่ทัน เพราะหมดเวลาก่อน|chan tham khaaw sut-thaai mai than phraw mot wee-laa gaawn|我没来得及做最后一题，因为先到时间了。|อ่านข้อสุดท้าย|aan khaaw sut-thaai|读最后一题|ข้อหนึ่ง|khaaw neung|第一题|考试
mot-wee-laa|หมดเวลา|mot wee-laa|时间到了|短语|考试成绩|เมื่อครูบอกว่าหมดเวลา ทุกคนต้องวางปากกา|muea khruu baawk waa mot wee-laa thuk khon dtawng waang bpaak-gaa|当老师说时间到了，大家必须放下笔。|บอกว่าหมดเวลา|baawk waa mot wee-laa|说时间到了|มีเวลาเหลือ|mii wee-laa luea|还有时间|考试
mii-wee-laa-luea|มีเวลาเหลือ|mii wee-laa luea|还有剩余时间|短语|考试成绩|ถ้ามีเวลาเหลือ ควรตรวจคำตอบทุกข้ออีกครั้ง|thaa mii wee-laa luea khuuan dtruat kham-dtaawp thuk khaaw iik khrang|如果还有时间，应该再检查所有答案。|มีเวลาเหลือห้านาที|mii wee-laa luea haa naa-thii|还有五分钟|หมดเวลา|mot wee-laa|时间到了|考试
dtawng-thong|ต้องท่อง|dtawng thaawng|需要背诵|短语|语言学习|บทสนทนาสั้นนี้ต้องท่องให้ได้ก่อนวันศุกร์|bot-son-tha-naa san nii dtawng thaawng hai dai gaawn wan-suk|这段短对话周五前要背下来。|ต้องท่องคำศัพท์|dtawng thaawng kham-sap|需要背词汇|อ่านผ่าน ๆ|aan phaan phaan|泛读一下|语言
aan-phaan-phaan|อ่านผ่าน ๆ|aan phaan phaan|大致读一下；泛读|动词|语言学习|ก่อนเรียนบทใหม่ ฉันอ่านผ่าน ๆ เพื่อรู้เรื่องคร่าว ๆ|gaawn riian bot mai chan aan phaan phaan phuea ruu rueang khraao khraao|学新课前，我大致读一下以了解大概内容。|อ่านผ่าน ๆ ก่อน|aan phaan phaan gaawn|先泛读一下|ท่องจำ|thaawng jam|背记|语言
thaawng-jam|ท่องจำ|thaawng jam|背记；背诵记忆|动词|语言学习|การท่องจำช่วยได้ แต่ต้องใช้คำในประโยคด้วย|gaan thaawng jam chuai dai dtaae dtawng chai kham nai bpra-yook duai|背记有帮助，但也要在句子中使用词。|ท่องจำคำศัพท์|thaawng jam kham-sap|背记词汇|เข้าใจความหมาย|khao-jai khwaam-maai|理解意思|语言
khao-jai-khwaam-maai|เข้าใจความหมาย|khao-jai khwaam-maai|理解意思|动词|语言学习|ครูอยากให้เราเข้าใจความหมาย ไม่ใช่ท่องจำอย่างเดียว|khruu yaak hai rao khao-jai khwaam-maai mai chai thaawng jam yaang diao|老师希望我们理解意思，而不只是背记。|เข้าใจความหมายคำ|khao-jai khwaam-maai kham|理解词义|ท่องจำ|thaawng jam|背记|语言
khui-rueang-riian|คุยเรื่องเรียน|khui rueang riian|聊学习|动词|学习计划|ตอนพักกลางวัน ฉันคุยเรื่องเรียนกับเพื่อนร่วมชั้น|dtaawn phak glaang-wan chan khui rueang riian gap phuean ruam chan|午休时，我和同班同学聊学习。|คุยเรื่องเรียนไทย|khui rueang riian thai|聊泰语学习|คุยเล่น|khui len|闲聊|计划
khui-len|คุยเล่น|khui len|闲聊|动词|课堂活动|อย่าคุยเล่นในห้องเรียนตอนครูกำลังอธิบาย|yaa khui len nai haawng riian dtaawn khruu gam-lang a-thi-baai|老师正在讲解时，不要在教室闲聊。|คุยเล่นกับเพื่อน|khui len gap phuean|和朋友闲聊|คุยเรื่องเรียน|khui rueang riian|聊学习|课堂
ngiap-rian|เงียบเรียน|ngiiap riian|安静学习|短语|课堂活动|ตอนทำข้อสอบ ทุกคนต้องเงียบเรียนและไม่ถามเพื่อน|dtaawn tham khaaw-saawp thuk khon dtawng ngiiap riian lae mai thaam phuean|考试时，大家要安静学习，不能问朋友。|นั่งเงียบเรียน|nang ngiiap riian|坐着安静学习|คุยเสียงดัง|khui siiang dang|大声聊天|课堂
khui-siiang-dang|คุยเสียงดัง|khui siiang dang|大声聊天|动词|课堂活动|ครูเตือนนักเรียนที่คุยเสียงดังหลังห้อง|khruu dteuan nak-riian thii khui siiang dang lang haawng|老师提醒教室后面大声聊天的学生。|อย่าคุยเสียงดัง|yaa khui siiang dang|不要大声聊天|เงียบเรียน|ngiiap riian|安静学习|课堂
dtang-jai-riian|ตั้งใจเรียน|dtang-jai riian|认真学习|动词|学习计划|ถ้าตั้งใจเรียนทุกวัน ภาษาไทยจะดีขึ้นทีละน้อย|thaa dtang-jai riian thuk wan phaa-saa thai ja dii kheun thii la naawy|如果每天认真学习，泰语会一点点变好。|ตั้งใจเรียนในห้อง|dtang-jai riian nai haawng|在教室认真学习|ไม่ตั้งใจ|mai dtang-jai|不认真|计划
mai-dtang-jai|ไม่ตั้งใจ|mai dtang-jai|不认真；没专心|形容词|学习计划|วันนี้ฉันไม่ตั้งใจเท่าไร จึงจดตามครูไม่ทัน|wan-nii chan mai dtang-jai thao-rai jeung jot dtaam khruu mai than|今天我不太专心，所以没跟上老师记笔记。|เรียนแบบไม่ตั้งใจ|riian baep mai dtang-jai|不认真地学|ตั้งใจเรียน|dtang-jai riian|认真学习|计划
phak-sip-naa-thii|พักสิบนาที|phak sip naa-thii|休息十分钟|短语|课堂活动|หลังเรียนสองชั่วโมง ครูให้พักสิบนาที|lang riian saawng chua-moong khruu hai phak sip naa-thii|学习两小时后，老师让休息十分钟。|พักสิบนาทีก่อนเรียนต่อ|phak sip naa-thii gaawn riian dtaaw|继续学习前休息十分钟|เรียนต่อ|riian dtaaw|继续学习|课堂
riian-dtaaw|เรียนต่อ|riian dtaaw|继续学习；继续上课|动词|学习计划|พักเสร็จแล้ว เราเรียนต่อด้วยบทอ่านหน้าใหม่|phak set laaeo rao riian dtaaw duai bot aan naa mai|休息完后，我们继续学习新一页阅读课文。|เรียนต่อหลังพัก|riian dtaaw lang phak|休息后继续学习|หยุดเรียน|yut riian|停止上课|计划
yut-riian|หยุดเรียน|yut riian|停课；不上课|动词|学校场所|พรุ่งนี้โรงเรียนหยุดเรียนหนึ่งวันเพราะมีงานกีฬา|phrung-nii roong-riian yut riian neung wan phraw mii ngaan gii-laa|明天学校因运动会停课一天。|หยุดเรียนชั่วคราว|yut riian chua-khraao|暂时停课|เรียนต่อ|riian dtaaw|继续学习|场所
ngaan-gii-laa-roong-riian|งานกีฬาโรงเรียน|ngaan gii-laa roong-riian|学校运动会|名词|学校场所|งานกีฬาโรงเรียนปีนี้จัดที่สนามใหญ่วันศุกร์|ngaan gii-laa roong-riian bpii nii jat thii sa-naam yai wan-suk|今年学校运动会周五在大操场举行。|ไปงานกีฬาโรงเรียน|bpai ngaan gii-laa roong-riian|去学校运动会|วันสอบ|wan saawp|考试日|活动
wan-saawp|วันสอบ|wan saawp|考试日|名词|考试成绩|วันสอบควรนอนเร็วและเตรียมดินสอให้พร้อม|wan saawp khuuan naawn reo lae dtriiam din-saaw hai phraawm|考试日应该早睡，并把铅笔准备好。|เตรียมตัววันสอบ|dtriiam dtua wan saawp|为考试日做准备|วันเรียน|wan riian|上课日|考试
wan-riian|วันเรียน|wan riian|上课日|名词|学习计划|วันเรียนฉันตื่นเช้าและตรวจตารางเรียนก่อนออกจากบ้าน|wan riian chan dteun chaao lae dtruat dtaa-raang riian gaawn aawk jaak baan|上课日我早起，出门前检查课程表。|เตรียมของวันเรียน|dtriiam khaawng wan riian|准备上课日用品|วันสอบ|wan saawp|考试日|计划
sap-daa-riian|สัปดาห์เรียน|sap-daa riian|学习周；上课的一周|名词|学习计划|สัปดาห์เรียนนี้มีการบ้านมากกว่าสัปดาห์ที่แล้ว|sap-daa riian nii mii gaan-baan maak gwaa sap-daa thii laaeo|这个学习周作业比上周多。|วางแผนสัปดาห์เรียน|waang phaaen sap-daa riian|安排学习周|วันเรียน|wan riian|上课日|计划
dtit-dtaam-ngaan|ติดตามงาน|dtit-dtaam ngaan|跟进作业；查看任务进度|动词|学习计划|หัวหน้ากลุ่มติดตามงานของเพื่อนก่อนวันส่ง|hua-naa glum dtit-dtaam ngaan khaawng phuean gaawn wan song|小组长在提交日前跟进朋友的作业进度。|ติดตามงานกลุ่ม|dtit-dtaam ngaan glum|跟进小组作业|ลืมงาน|luem ngaan|忘记作业|计划
luem-ngaan|ลืมงาน|luem ngaan|忘记作业；忘记任务|动词|作业资料|ฉันลืมงานไว้ที่บ้าน จึงต้องบอกครูตามจริง|chan luem ngaan wai thii baan jeung dtawng baawk khruu dtaam jing|我把作业忘在家里，所以必须如实告诉老师。|ลืมงานบ่อย|luem ngaan baawy|经常忘作业|ติดตามงาน|dtit-dtaam ngaan|跟进作业|作业
tham-khrop|ทำครบ|tham khrop|做齐；完成全部|动词|作业资料|คืนนี้ฉันทำครบทุกข้อและตรวจคำตอบแล้ว|khuen-nii chan tham khrop thuk khaaw lae dtruat kham-dtaawp laaeo|今晚我每一题都做齐了，也检查了答案。|ทำครบสิบข้อ|tham khrop sip khaaw|做完十题|ทำไม่ครบ|tham mai khrop|没做齐|作业
tham-mai-khrop|ทำไม่ครบ|tham mai khrop|没做齐；没完成全部|动词|作业资料|ถ้าทำไม่ครบ ครูจะให้กลับไปแก้ไขที่บ้าน|thaa tham mai khrop khruu ja hai glap bpai gaae-khai thii baan|如果没做齐，老师会让回家修改。|ทำไม่ครบสองข้อ|tham mai khrop saawng khaaw|少做两题|ทำครบ|tham khrop|做齐|作业
dtit-bpra-gaat|ติดประกาศ|dtit bpra-gaat|张贴通知|动词|学校场所|โรงเรียนติดประกาศเรื่องตารางสอบที่หน้าห้องสมุด|roong-riian dtit bpra-gaat rueang dtaa-raang saawp thii naa haawng sa-mut|学校在图书馆前张贴考试安排通知。|ติดประกาศใหม่|dtit bpra-gaat mai|张贴新通知|แจ้งในห้อง|jaaeng nai haawng|在教室通知|场所
jaaeng-nai-haawng|แจ้งในห้อง|jaaeng nai haawng|在教室通知|动词|课堂活动|ครูแจ้งในห้องว่าอาทิตย์หน้าจะมีสอบย่อย|khruu jaaeng nai haawng waa aa-thit naa ja mii saawp yaawy|老师在教室通知说下周会有小测验。|แจ้งในห้องเรียน|jaaeng nai haawng riian|在教室里通知|ติดประกาศ|dtit bpra-gaat|张贴通知|课堂
rub-bai-ngaan|รับใบงาน|rap bai ngaan|领取练习单|动词|作业资料|นักเรียนรับใบงานจากหัวหน้าห้องแล้วกลับไปนั่งที่|nak-riian rap bai ngaan jaak hua-naa haawng laaeo glap bpai nang thii|学生从班长那里领取练习单，然后回座位坐下。|รับใบงานหนึ่งแผ่น|rap bai ngaan neung phaen|领一张练习单|ส่งใบงาน|song bai ngaan|交练习单|作业
song-bai-ngaan|ส่งใบงาน|song bai ngaan|交练习单|动词|作业资料|หลังทำเสร็จ ทุกคนส่งใบงานไว้หน้าห้อง|lang tham set thuk khon song bai ngaan wai naa haawng|做完后，大家把练习单交到教室前面。|ส่งใบงานก่อนกลับ|song bai ngaan gaawn glap|回去前交练习单|รับใบงาน|rap bai ngaan|领取练习单|作业
ao-nang-sue-maa|เอาหนังสือมา|ao nang-sue maa|把书带来|短语|学习用品|พรุ่งนี้อย่าลืมเอาหนังสือมาด้วย เพราะต้องอ่านบทใหม่|phrung-nii yaa luem ao nang-sue maa duai phraw dtawng aan bot mai|明天别忘了把书带来，因为要读新课。|เอาหนังสือเรียนมา|ao nang-sue riian maa|把课本带来|ลืมหนังสือ|luem nang-sue|忘带书|用品
luem-nang-sue|ลืมหนังสือ|luem nang-sue|忘带书|动词|学习用品|วันนี้ฉันลืมหนังสือภาษาไทยไว้ที่บ้าน|wan-nii chan luem nang-sue phaa-saa thai wai thii baan|今天我把泰语书忘在家里了。|ลืมหนังสือเรียน|luem nang-sue riian|忘带课本|เอาหนังสือมา|ao nang-sue maa|把书带来|用品
dtong-riian-phon|ต้องเรียนเพิ่ม|dtawng riian phoem|需要加学；需要补学|短语|学习计划|ถ้าเรียนไม่ทัน ฉันต้องเรียนเพิ่มหลังเลิกเรียน|thaa riian mai than chan dtawng riian phoem lang loek riian|如果跟不上，我放学后需要补学。|ต้องเรียนเพิ่มวันเสาร์|dtawng riian phoem wan-sao|周六需要加学|พักก่อน|phak gaawn|先休息|计划
phak-gaawn|พักก่อน|phak gaawn|先休息|短语|学习计划|ถ้าเหนื่อยมาก ให้พักก่อนแล้วค่อยทบทวนบทเรียน|thaa neuuai maak hai phak gaawn laaeo khaawy thop-thuan bot-riian|如果很累，就先休息，再复习课文。|พักก่อนสิบนาที|phak gaawn sip naa-thii|先休息十分钟|เรียนต่อ|riian dtaaw|继续学习|计划
`;

export const VOCABULARY_EXPANSION_A2_SCHOOL_STUDY_01: VocabularyExpansionA2SchoolStudyCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
