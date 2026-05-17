type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "日常健康" | "诊所预约" | "症状复述" | "检查测量" | "药品用法" | "复诊请假" | "照顾别人" | "康复建议";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2HealthDailyClinicCandidate = {
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

const SOURCE_REFS = ["thai-health-pharmacy-candidate", "thai-frequency", "pythainlp-corpus", "kaikki-wiktionary-thai"];

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

function buildCandidate(row: Row, index: number): VocabularyExpansionA2HealthDailyClinicCandidate {
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
        usageNotesZh: [`${row.thai} 适合在日常健康、诊所沟通或照顾别人时使用。`],
      },
    ],
    synonyms: [{ thai: row.relatedThai, roman: row.relatedRoman, chinese: row.relatedChinese }],
    antonyms: [],
    comparisons: [
      {
        kind: "易混",
        target: { thai: row.relatedThai, roman: row.relatedRoman, chinese: row.relatedChinese },
        distinctionZh: `${row.thai} 表示“${row.chinese}”；${row.relatedThai} 表示“${row.relatedChinese}”，看清是症状、流程、用药还是照顾动作。`,
      },
    ],
    collocations: [{ thai: row.collocationThai, roman: row.collocationRoman, chinese: row.collocationChinese }],
    usageNotesZh: ["医疗场景中语气要清楚礼貌，症状可加时间、次数、程度，如ตั้งแต่เมื่อวาน、วันละสองครั้ง、นิดหน่อย。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
du-lae-suk-kha-phaap|ดูแลสุขภาพ|duu-laae suk-kha-phaap|照顾健康|动词|日常健康|ช่วงนี้ฉันพยายามดูแลสุขภาพด้วยการนอนเร็วและดื่มน้ำมากขึ้น|chuang nii chan pha-yaa-yaam duu-laae suk-kha-phaap duai gaan naawn reo lae duem naam maak kheun|最近我努力通过早睡和多喝水来照顾健康。|ดูแลสุขภาพทุกวัน|duu-laae suk-kha-phaap thuk wan|每天照顾健康|ละเลยสุขภาพ|la-loei suk-kha-phaap|忽视健康|健康
la-loei-suk-kha-phaap|ละเลยสุขภาพ|la-loei suk-kha-phaap|忽视健康|动词|日常健康|ถ้าละเลยสุขภาพนาน ๆ ร่างกายอาจอ่อนแอได้|thaa la-loei suk-kha-phaap naan naan raang-gaai aat aawn-ae dai|如果长期忽视健康，身体可能会变弱。|อย่าละเลยสุขภาพ|yaa la-loei suk-kha-phaap|不要忽视健康|ดูแลสุขภาพ|duu-laae suk-kha-phaap|照顾健康|健康
raang-gaai-aawn-ae|ร่างกายอ่อนแอ|raang-gaai aawn-ae|身体虚弱|短语|日常健康|หลังป่วยหลายวัน ร่างกายอ่อนแอและต้องพักเพิ่ม|lang bpuai laai wan raang-gaai aawn-ae lae dtawng phak phoem|生病好几天后，身体虚弱，需要多休息。|รู้สึกร่างกายอ่อนแอ|ruu-seuk raang-gaai aawn-ae|觉得身体虚弱|แข็งแรงขึ้น|khaeng-raaeng kheun|变强壮|健康
khaeng-raaeng-kheun|แข็งแรงขึ้น|khaeng-raaeng kheun|更强壮；恢复体力|形容词|康复建议|หลังพักผ่อนและกินอาหารดี ๆ เขาแข็งแรงขึ้นมาก|lang phak-phaawn lae gin aa-haan dii dii khao khaeng-raaeng kheun maak|休息并好好吃饭后，他强壮了很多。|ค่อย ๆ แข็งแรงขึ้น|khaawy khaawy khaeng-raaeng kheun|慢慢变强壮|ร่างกายอ่อนแอ|raang-gaai aawn-ae|身体虚弱|康复
phak-hai-phaaw|พักให้พอ|phak hai phaaw|休息够|动词|康复建议|หมอบอกให้พักให้พอและอย่าทำงานหนักสองวัน|maaw baawk hai phak hai phaaw lae yaa tham ngaan nak saawng wan|医生说要休息够，两天内不要做重活。|นอนพักให้พอ|naawn phak hai phaaw|躺着休息够|พักน้อย|phak naawy|休息少|建议
phak-naawy|พักน้อย|phak naawy|休息少|动词|日常健康|ช่วงสอบฉันพักน้อย จึงปวดหัวง่าย|chuang saawp chan phak naawy jeung bpuat hua ngaai|考试期间我休息少，所以容易头痛。|พักน้อยเกินไป|phak naawy goen bpai|休息太少|พักให้พอ|phak hai phaaw|休息够|健康
duem-naam-un|ดื่มน้ำอุ่น|duem naam un|喝温水|动词|康复建议|เวลาเจ็บคอ ฉันดื่มน้ำอุ่นและพูดให้น้อยลง|wee-laa jep khaaw chan duem naam un lae phuut hai naawy long|喉咙痛时，我喝温水并少说话。|ดื่มน้ำอุ่นบ่อย ๆ|duem naam un baawy baawy|常喝温水|ดื่มน้ำเย็น|duem naam yen|喝冷水|建议
gin-aa-haan-aawn|กินอาหารอ่อน|gin aa-haan aawn|吃清淡软食|动词|康复建议|หลังท้องเสีย หมอแนะนำให้กินอาหารอ่อนก่อน|lang thaawng-siia maaw nae-nam hai gin aa-haan aawn gaawn|腹泻后，医生建议先吃清淡软食。|กินอาหารอ่อนสองวัน|gin aa-haan aawn saawng wan|吃两天清淡软食|กินอาหารเผ็ด|gin aa-haan phet|吃辣食|建议
gin-aa-haan-phet|กินอาหารเผ็ด|gin aa-haan phet|吃辣食|动词|日常健康|ถ้าเจ็บท้อง ควรงดกินอาหารเผ็ดสักพัก|thaa jep thaawng khuuan ngot gin aa-haan phet sak phak|如果肚子痛，应该暂停吃辣食一阵子。|งดกินอาหารเผ็ด|ngot gin aa-haan phet|暂停吃辣食|กินอาหารอ่อน|gin aa-haan aawn|吃清淡软食|饮食
ngot|งด|ngot|暂停；忌口|动词|康复建议|หมอให้งดกาแฟหนึ่งสัปดาห์เพราะนอนไม่หลับ|maaw hai ngot gaa-faae neung sap-daa phraw naawn mai lap|医生让暂停喝咖啡一周，因为睡不着。|งดออกกำลังกายหนัก|ngot aawk-gam-lang-gaai nak|暂停剧烈运动|ทำต่อ|tham dtaaw|继续做|建议
bpai-khli-nik|ไปคลินิก|bpai khli-nik|去诊所|动词|诊所预约|ถ้าอาการไม่ดีขึ้น พรุ่งนี้ฉันจะไปคลินิกใกล้บ้าน|thaa aa-gaan mai dii kheun phrung-nii chan ja bpai khli-nik glai baan|如果症状没好转，明天我会去家附近的诊所。|ไปคลินิกตอนเช้า|bpai khli-nik dtaawn chaao|早上去诊所|ไปโรงพยาบาล|bpai roong-pha-yaa-baan|去医院|诊所
khli-nik-glai-baan|คลินิกใกล้บ้าน|khli-nik glai baan|家附近的诊所|名词|诊所预约|คลินิกใกล้บ้านเปิดถึงสองทุ่มทุกวัน|khli-nik glai baan bpoet thueng saawng thum thuk wan|家附近的诊所每天开到晚上八点。|นัดคลินิกใกล้บ้าน|nat khli-nik glai baan|预约家附近诊所|โรงพยาบาลใหญ่|roong-pha-yaa-baan yai|大医院|诊所
nat-maaw|นัดหมอ|nat maaw|预约医生|动词|诊所预约|แม่ช่วยนัดหมอให้พ่อเพราะพ่อปวดหลังหลายวัน|maae chuai nat maaw hai phaaw phraw phaaw bpuat lang laai wan|妈妈帮爸爸预约医生，因为爸爸背痛好几天了。|นัดหมอพรุ่งนี้|nat maaw phrung-nii|预约明天医生|เลื่อนนัด|leuuan nat|改约|预约
leuuan-nat|เลื่อนนัด|leuuan nat|改约；改预约时间|动词|诊所预约|ฉันต้องเลื่อนนัดหมอ เพราะพรุ่งนี้มีสอบเช้า|chan dtawng leuuan nat maaw phraw phrung-nii mii saawp chaao|我必须改医生预约，因为明天早上有考试。|เลื่อนนัดไปวันศุกร์|leuuan nat bpai wan-suk|改约到周五|นัดหมอ|nat maaw|预约医生|预约
yok-loek-nat|ยกเลิกนัด|yok-loek nat|取消预约|动词|诊所预约|ถ้าหายดีแล้ว คุณอาจโทรไปยกเลิกนัดได้|thaa haai dii laaeo khun aat thoo bpai yok-loek nat dai|如果已经好了，你可以打电话去取消预约。|ยกเลิกนัดล่วงหน้า|yok-loek nat luang-naa|提前取消预约|เลื่อนนัด|leuuan nat|改约|预约
mee-nat|มีนัด|mii nat|有预约|短语|诊所预约|บ่ายนี้ฉันมีนัดตรวจสุขภาพที่คลินิก|baai nii chan mii nat dtruat suk-kha-phaap thii khli-nik|今天下午我在诊所有健康检查预约。|มีนัดกับหมอ|mii nat gap maaw|和医生有预约|ไม่มีนัด|mai mii nat|没有预约|预约
mai-mii-nat|ไม่มีนัด|mai mii nat|没有预约|短语|诊所预约|ถ้าไม่มีนัด อาจต้องรอคิวนานหน่อย|thaa mai mii nat aat dtawng raaw khiu naan naawy|如果没有预约，可能要排队等久一点。|มาแบบไม่มีนัด|maa baep mai mii nat|无预约前来|มีนัด|mii nat|有预约|预约
raaw-khiu|รอคิว|raaw khiu|排队等候|动词|诊所预约|คนไข้หลายคนรอคิวหน้าห้องตรวจอย่างเงียบ ๆ|khon-khai laai khon raaw khiu naa haawng dtruat yaang ngiiap ngiiap|很多病人在诊室前安静排队等候。|รอคิวพบหมอ|raaw khiu phop maaw|排队等看医生|เข้าห้องตรวจ|khao haawng dtruat|进诊室|流程
lap-bat-khiu|รับบัตรคิว|rap bat khiu|取排队号|动词|诊所预约|มาถึงคลินิกแล้วต้องรับบัตรคิวก่อนนั่งรอ|maa thueng khli-nik laaeo dtawng rap bat khiu gaawn nang raaw|到诊所后要先取排队号再坐着等。|รับบัตรคิวที่หน้าเคาน์เตอร์|rap bat khiu thii naa khao-dtooe|在柜台前取号|ลงทะเบียน|long tha-biian|登记|流程
long-tha-biian|ลงทะเบียน|long tha-biian|登记；挂号|动词|诊所预约|พยาบาลให้ฉันลงทะเบียนด้วยบัตรประชาชน|pha-yaa-baan hai chan long tha-biian duai bat bpra-chaa-chon|护士让我用身份证登记。|ลงทะเบียนคนไข้|long tha-biian khon-khai|病人登记|รับบัตรคิว|rap bat khiu|取号|流程
khao-haawng-dtruat|เข้าห้องตรวจ|khao haawng dtruat|进诊室|动词|诊所预约|เมื่อถึงคิว พยาบาลเรียกฉันเข้าห้องตรวจ|muea thueng khiu pha-yaa-baan riiak chan khao haawng dtruat|轮到号时，护士叫我进诊室。|เข้าห้องตรวจพบหมอ|khao haawng dtruat phop maaw|进诊室看医生|รอคิว|raaw khiu|排队等候|流程
haawng-dtruat|ห้องตรวจ|haawng dtruat|诊室|名词|诊所预约|ห้องตรวจอยู่ด้านซ้ายของเคาน์เตอร์ยา|haawng dtruat yuu daan saai khaawng khao-dtooe yaa|诊室在药品柜台左边。|หน้าห้องตรวจ|naa haawng dtruat|诊室前|ห้องรอ|haawng raaw|候诊室|场所
haawng-raaw|ห้องรอ|haawng raaw|候诊室|名词|诊所预约|ในห้องรอมีเก้าอี้หลายตัวและน้ำดื่ม|nai haawng raaw mii gao-ii laai dtua lae naam duem|候诊室里有很多椅子和饮用水。|นั่งในห้องรอ|nang nai haawng raaw|坐在候诊室|ห้องตรวจ|haawng dtruat|诊室|场所
khon-khai-mai|คนไข้ใหม่|khon-khai mai|新病人；初诊病人|名词|诊所预约|คนไข้ใหม่ต้องกรอกข้อมูลส่วนตัวก่อนพบหมอ|khon-khai mai dtawng graawk khaaw-muun suan-dtua gaawn phop maaw|新病人看医生前要填写个人信息。|แบบฟอร์มคนไข้ใหม่|baep-faawm khon-khai mai|新病人表格|คนไข้เก่า|khon-khai gao|老病人|流程
khon-khai-gao|คนไข้เก่า|khon-khai gao|老病人；复诊病人|名词|诊所预约|คนไข้เก่าใช้เบอร์โทรศัพท์ค้นประวัติได้|khon-khai gao chai booe thoo-ra-sap khon bpra-wat dai|老病人可以用电话号码查病历。|ค้นประวัติคนไข้เก่า|khon bpra-wat khon-khai gao|查老病人病历|คนไข้ใหม่|khon-khai mai|新病人|流程
graawk-baep-faawm|กรอกแบบฟอร์ม|graawk baep-faawm|填写表格|动词|诊所预约|ฉันกรอกแบบฟอร์มอาการและเบอร์โทรศัพท์ให้ครบ|chan graawk baep-faawm aa-gaan lae booe thoo-ra-sap hai khrop|我把症状和电话号码表格填写完整。|กรอกแบบฟอร์มก่อนตรวจ|graawk baep-faawm gaawn dtruat|检查前填表|เซ็นชื่อ|sen chue|签名|流程
sen-chue-rak-saa|เซ็นชื่อรักษา|sen chue rak-saa|治疗登记签名|动词|诊所预约|พ่อเซ็นชื่อรักษาที่เคาน์เตอร์ก่อนเข้าห้องตรวจ|phaaw sen chue rak-saa thii khao-dtooe gaawn khao haawng dtruat|爸爸进诊室前在柜台签名登记治疗。|เซ็นชื่อก่อนพบหมอ|sen chue gaawn phop maaw|看医生前签名|กรอกแบบฟอร์ม|graawk baep-faawm|填写表格|流程
loem-bpuai|เริ่มป่วย|roem bpuai|开始生病|动词|症状复述|ฉันเริ่มป่วยตั้งแต่เมื่อคืนและวันนี้มีไข้ต่ำ ๆ|chan roem bpuai dtang-dtaae muea-khuen lae wan-nii mii khai dtam dtam|我从昨晚开始生病，今天有低烧。|เริ่มป่วยเมื่อวาน|roem bpuai muea-waan|昨天开始生病|หายป่วย|haai bpuai|病好了|复述
aa-gaan-roem|อาการเริ่ม|aa-gaan roem|症状开始|短语|症状复述|อาการเริ่มหลังอาหารเที่ยงและปวดท้องมากขึ้น|aa-gaan roem lang aa-haan thiiang lae bpuat thaawng maak kheun|症状午饭后开始，肚子越来越痛。|อาการเริ่มเมื่อไร|aa-gaan roem muea-rai|症状什么时候开始|อาการหาย|aa-gaan haai|症状消失|复述
bpen-maa-gii-wan|เป็นมากี่วัน|bpen maa gii wan|持续几天了|短语|症状复述|หมอถามว่าเป็นมากี่วันและมีไข้หรือไม่|maaw thaam waa bpen maa gii wan lae mii khai rue mai|医生问持续几天了，以及有没有发烧。|ถามว่าเป็นมากี่วัน|thaam waa bpen maa gii wan|问持续几天|เพิ่งเริ่ม|phoeng roem|刚开始|复述
dtang-dtaae-muea-rai|ตั้งแต่เมื่อไร|dtang-dtaae muea-rai|从什么时候开始|短语|症状复述|คุณไอตั้งแต่เมื่อไร และไอมากตอนกลางคืนไหม|khun ai dtang-dtaae muea-rai lae ai maak dtaawn glaang-khuen mai|你从什么时候开始咳嗽？夜里咳得厉害吗？|ถามตั้งแต่เมื่อไร|thaam dtang-dtaae muea-rai|问从什么时候开始|เป็นมากี่วัน|bpen maa gii wan|持续几天|复述
aa-gaan-maak-kheun|อาการมากขึ้น|aa-gaan maak kheun|症状加重|短语|症状复述|ถ้าอาการมากขึ้นหลังกลับบ้าน ให้โทรมาที่คลินิก|thaa aa-gaan maak kheun lang glap baan hai thoo maa thii khli-nik|如果回家后症状加重，请打电话到诊所。|อาการปวดมากขึ้น|aa-gaan bpuat maak kheun|疼痛加重|อาการดีขึ้น|aa-gaan dii kheun|症状好转|复述
aa-gaan-dii-kheun|อาการดีขึ้น|aa-gaan dii kheun|症状好转|短语|症状复述|กินยาสองวันแล้วอาการดีขึ้น แต่ยังไอนิดหน่อย|gin yaa saawng wan laaeo aa-gaan dii kheun dtaae yang ai nit naawy|吃药两天后症状好转了，但还咳一点。|อาการค่อย ๆ ดีขึ้น|aa-gaan khaawy khaawy dii kheun|症状慢慢好转|อาการมากขึ้น|aa-gaan maak kheun|症状加重|复述
aa-gaan-mai-dii-kheun|อาการไม่ดีขึ้น|aa-gaan mai dii kheun|症状没有好转|短语|复诊请假|ถ้าอาการไม่ดีขึ้นในสามวัน ต้องกลับมาพบหมอ|thaa aa-gaan mai dii kheun nai saam wan dtawng glap maa phop maaw|如果三天内症状没有好转，必须回来见医生。|อาการยังไม่ดีขึ้น|aa-gaan yang mai dii kheun|症状还没好转|อาการดีขึ้น|aa-gaan dii kheun|症状好转|复诊
bpuat-bpen-phak-phak|ปวดเป็นพัก ๆ|bpuat bpen phak phak|一阵一阵地痛|短语|症状复述|ท้องของฉันปวดเป็นพัก ๆ ตั้งแต่บ่าย|thaawng khaawng chan bpuat bpen phak phak dtang-dtaae baai|我的肚子从下午开始一阵一阵地痛。|ปวดเป็นพัก ๆ ทั้งวัน|bpuat bpen phak phak thang wan|一整天阵痛|ปวดตลอด|bpuat dta-laawt|一直痛|疼痛
bpuat-dta-laawt|ปวดตลอด|bpuat dta-laawt|一直痛|短语|症状复述|เขาปวดหลังตลอดจนทำงานหน้าคอมไม่ไหว|khao bpuat lang dta-laawt jon tham ngaan naa khawm mai wai|他背一直痛，以至于不能在电脑前工作。|ปวดตลอดคืน|bpuat dta-laawt khuen|整晚一直痛|ปวดเป็นพัก ๆ|bpuat bpen phak phak|阵痛|疼痛
jep-we-laa-gleuun|เจ็บเวลากลืน|jep wee-laa gleuun|吞咽时痛|短语|症状复述|ฉันเจ็บเวลากลืน จึงกินอาหารอ่อนได้เท่านั้น|chan jep wee-laa gleuun jeung gin aa-haan aawn dai thao-nan|我吞咽时痛，所以只能吃软食。|คอเจ็บเวลากลืน|khaaw jep wee-laa gleuun|喉咙吞咽时痛|คอแห้ง|khaaw haaeng|喉咙干|症状
mai-mi-raeng|ไม่มีแรง|mai mii raaeng|没力气|短语|症状复述|หลังมีไข้เมื่อคืน วันนี้ฉันไม่มีแรงเดินไกล|lang mii khai muea-khuen wan-nii chan mai mii raaeng doen glai|昨晚发烧后，今天我没力气走远。|ไม่มีแรงทำงาน|mai mii raaeng tham ngaan|没力气工作|มีแรงขึ้น|mii raaeng kheun|更有力气|症状
mii-raaeng-kheun|มีแรงขึ้น|mii raaeng kheun|更有力气|短语|康复建议|หลังนอนพักครึ่งวัน ฉันมีแรงขึ้นและกินข้าวได้|lang naawn phak khrueng wan chan mii raaeng kheun lae gin khaao dai|躺着休息半天后，我更有力气，也能吃饭了。|ค่อย ๆ มีแรงขึ้น|khaawy khaawy mii raaeng kheun|慢慢有力气|ไม่มีแรง|mai mii raaeng|没力气|康复
wat-khai|วัดไข้|wat khai|量体温|动词|检查测量|พยาบาลวัดไข้ก่อนให้ฉันเข้าห้องตรวจ|pha-yaa-baan wat khai gaawn hai chan khao haawng dtruat|护士在让我进诊室前量体温。|วัดไข้ตอนเช้า|wat khai dtaawn chaao|早上量体温|วัดความดัน|wat khwaam-dan|量血压|检查
khai-dtam|ไข้ต่ำ|khai dtam|低烧|名词|检查测量|ลูกมีไข้ต่ำและไอนิดหน่อยตั้งแต่เมื่อคืน|luuk mii khai dtam lae ai nit naawy dtang-dtaae muea-khuen|孩子从昨晚开始低烧并有点咳嗽。|มีไข้ต่ำ ๆ|mii khai dtam dtam|有点低烧|ไข้สูง|khai suung|高烧|发烧
khai-suung|ไข้สูง|khai suung|高烧|名词|检查测量|ถ้ามีไข้สูงและหนาวสั่น ควรรีบไปพบแพทย์|thaa mii khai suung lae naao-san khuuan riip bpai phop phaaet|如果高烧并发冷打颤，应该赶快去看医生。|ไข้สูงมาก|khai suung maak|高烧很厉害|ไข้ต่ำ|khai dtam|低烧|发烧
wat-khwaam-dan|วัดความดัน|wat khwaam-dan|量血压|动词|检查测量|คุณตาวัดความดันทุกเช้าตามคำแนะนำของหมอ|khun dtaa wat khwaam-dan thuk chaao dtaam kham-nae-nam khaawng maaw|外公按照医生建议每天早上量血压。|วัดความดันที่คลินิก|wat khwaam-dan thii khli-nik|在诊所量血压|วัดไข้|wat khai|量体温|检查
khwaam-dan-suung|ความดันสูง|khwaam-dan suung|血压高|名词|检查测量|พ่อมีความดันสูง จึงต้องลดเค็มและพักให้พอ|phaaw mii khwaam-dan suung jeung dtawng lot khem lae phak hai phaaw|爸爸血压高，所以要少吃咸并休息够。|ตรวจความดันสูง|dtruat khwaam-dan suung|检查高血压|ความดันปกติ|khwaam-dan bpa-ga-dti|血压正常|检查
khwaam-dan-bpa-ga-dti|ความดันปกติ|khwaam-dan bpa-ga-dti|血压正常|名词|检查测量|วันนี้ความดันปกติ หมอบอกว่าไม่ต้องกังวลมาก|wan-nii khwaam-dan bpa-ga-dti maaw baawk waa mai dtawng gang-won maak|今天血压正常，医生说不用太担心。|ผลความดันปกติ|phon khwaam-dan bpa-ga-dti|血压结果正常|ความดันสูง|khwaam-dan suung|血压高|检查
chang-naam-nak|ชั่งน้ำหนัก|chang naam-nak|称体重|动词|检查测量|ก่อนตรวจสุขภาพ พยาบาลให้ชั่งน้ำหนักและวัดส่วนสูง|gaawn dtruat suk-kha-phaap pha-yaa-baan hai chang naam-nak lae wat suan-suung|健康检查前，护士让称体重和量身高。|ชั่งน้ำหนักตอนเช้า|chang naam-nak dtaawn chaao|早上称体重|วัดส่วนสูง|wat suan-suung|量身高|检查
wat-suan-suung|วัดส่วนสูง|wat suan-suung|量身高|动词|检查测量|เด็กต้องวัดส่วนสูงทุกครั้งที่มาตรวจสุขภาพ|dek dtawng wat suan-suung thuk khrang thii maa dtruat suk-kha-phaap|孩子每次来健康检查都要量身高。|วัดส่วนสูงเด็ก|wat suan-suung dek|量孩子身高|ชั่งน้ำหนัก|chang naam-nak|称体重|检查
dtruat-suk-kha-phaap|ตรวจสุขภาพ|dtruat suk-kha-phaap|健康检查；体检|动词|检查测量|บริษัทให้พนักงานตรวจสุขภาพปีละครั้ง|baaw-ri-sat hai pha-nak-ngaan dtruat suk-kha-phaap bpii la khrang|公司让员工每年体检一次。|ตรวจสุขภาพประจำปี|dtruat suk-kha-phaap bpra-jam bpii|年度体检|ตรวจอาการ|dtruat aa-gaan|检查症状|检查
dtruat-aa-gaan|ตรวจอาการ|dtruat aa-gaan|检查症状|动词|检查测量|หมอตรวจอาการแล้วบอกว่าเป็นหวัดธรรมดา|maaw dtruat aa-gaan laaeo baawk waa bpen wat tham-ma-daa|医生检查症状后说是普通感冒。|ตรวจอาการเบื้องต้น|dtruat aa-gaan beuuang-dton|初步检查症状|ตรวจสุขภาพ|dtruat suk-kha-phaap|健康检查|检查
fang-hua-jai|ฟังหัวใจ|fang hua-jai|听心脏|动词|检查测量|หมอฟังหัวใจและถามว่าฉันเจ็บหน้าอกไหม|maaw fang hua-jai lae thaam waa chan jep naa-ok mai|医生听心脏并问我胸口痛不痛。|ใช้หูฟังฟังหัวใจ|chai huu-fang fang hua-jai|用听诊器听心脏|วัดความดัน|wat khwaam-dan|量血压|检查
duu-khaaw|ดูคอ|duu khaaw|看喉咙|动词|检查测量|หมอขอดูคอเพราะฉันเจ็บคอและไอมาสองวัน|maaw khaaw duu khaaw phraw chan jep khaaw lae ai maa saawng wan|医生要看喉咙，因为我喉咙痛并咳嗽两天了。|อ้าปากดูคอ|aa bpaak duu khaaw|张嘴看喉咙|ดูหู|duu huu|看耳朵|检查
aa-bpaak|อ้าปาก|aa bpaak|张嘴|动词|检查测量|หมอบอกให้อ้าปากกว้าง ๆ เพื่อดูคอ|maaw baawk hai aa bpaak gwaang gwaang phuea duu khaaw|医生让张大嘴来看喉咙。|อ้าปากกว้าง|aa bpaak gwaang|张大嘴|ปิดปาก|bpit bpaak|闭嘴|检查
ya-met|ยาเม็ด|yaa met|药片|名词|药品用法|ยานี้เป็นยาเม็ด กินหลังอาหารวันละสองครั้ง|yaa nii bpen yaa met gin lang aa-haan wan la saawng khrang|这个药是药片，饭后每天吃两次。|กินยาเม็ด|gin yaa met|吃药片|ยาน้ำ|yaa naam|药水|药品
yaa-naam|ยาน้ำ|yaa naam|药水；液体药|名词|药品用法|เด็กเล็กกินยาน้ำง่ายกว่ายาเม็ด|dek lek gin yaa naam ngaai gwaa yaa met|小孩吃药水比药片容易。|เขย่ายาน้ำก่อนกิน|kha-yao yaa naam gaawn gin|喝药水前摇匀|ยาเม็ด|yaa met|药片|药品
yaa-thaa|ยาทา|yaa thaa|外用药膏；涂的药|名词|药品用法|หมอให้ยาทาสำหรับผื่นที่แขนวันละสองครั้ง|maaw hai yaa thaa sam-rap pheun thii khaaen wan la saawng khrang|医生给了手臂皮疹用的外用药膏，每天两次。|ทายาทาบาง ๆ|thaa yaa thaa baang baang|薄薄涂药膏|ยากิน|yaa gin|口服药|药品
yaa-gin|ยากิน|yaa gin|口服药|名词|药品用法|ยากินนี้ต้องกินหลังอาหารและดื่มน้ำตามมาก ๆ|yaa gin nii dtawng gin lang aa-haan lae duem naam dtaam maak maak|这个口服药必须饭后吃，并多喝水送服。|รับยากิน|rap yaa gin|领取口服药|ยาทา|yaa thaa|外用药|药品
gin-yaa-gaawn-aa-haan|กินยาก่อนอาหาร|gin yaa gaawn aa-haan|饭前吃药|动词|药品用法|ยาตัวนี้ต้องกินยาก่อนอาหารประมาณสามสิบนาที|yaa dtua nii dtawng gin yaa gaawn aa-haan bpra-maan saam-sip naa-thii|这个药要饭前大约三十分钟吃。|กินยาก่อนอาหารเช้า|gin yaa gaawn aa-haan chaao|早饭前吃药|กินยาหลังอาหาร|gin yaa lang aa-haan|饭后吃药|用药
gin-yaa-lang-aa-haan|กินยาหลังอาหาร|gin yaa lang aa-haan|饭后吃药|动词|药品用法|หมอบอกให้กินยาหลังอาหารเช้าและเย็น|maaw baawk hai gin yaa lang aa-haan chaao lae yen|医生说早饭后和晚饭后吃药。|กินยาหลังอาหารทันที|gin yaa lang aa-haan than-thii|饭后马上吃药|กินยาก่อนอาหาร|gin yaa gaawn aa-haan|饭前吃药|用药
gin-yaa-gaawn-naawn|กินยาก่อนนอน|gin yaa gaawn naawn|睡前吃药|动词|药品用法|ยานี้ทำให้ง่วง จึงควรกินยาก่อนนอน|yaa nii tham hai nguang jeung khuuan gin yaa gaawn naawn|这个药会让人困，所以应该睡前吃。|กินยาก่อนนอนทุกคืน|gin yaa gaawn naawn thuk khuen|每晚睡前吃药|กินยาตอนเช้า|gin yaa dtaawn chaao|早上吃药|用药
wan-la-saawng-khrang|วันละสองครั้ง|wan la saawng khrang|每天两次|短语|药品用法|ยาน้ำขวดนี้กินวันละสองครั้งหลังอาหาร|yaa naam khuat nii gin wan la saawng khrang lang aa-haan|这瓶药水饭后每天喝两次。|ใช้ยาวันละสองครั้ง|chai yaa wan la saawng khrang|每天用药两次|วันละครั้ง|wan la khrang|每天一次|用药
khrang-la-neung-met|ครั้งละหนึ่งเม็ด|khrang la neung met|每次一片|短语|药品用法|ยาแก้ปวดนี้กินครั้งละหนึ่งเม็ดเมื่อปวดมาก|yaa gaae bpuat nii gin khrang la neung met muea bpuat maak|这个止痛药疼得厉害时每次吃一片。|กินครั้งละหนึ่งเม็ด|gin khrang la neung met|每次吃一片|ครั้งละสองเม็ด|khrang la saawng met|每次两片|用药
ya-laai|ยาละลาย|yaa laai|溶解药；冲服药|名词|药品用法|ยาละลายต้องผสมน้ำอุ่นก่อนดื่ม|yaa laai dtawng pha-som naam un gaawn duem|冲服药要先和温水混合再喝。|ผสมยาละลาย|pha-som yaa laai|冲溶解药|ยาเม็ด|yaa met|药片|药品
pha-som-yaa|ผสมยา|pha-som yaa|调药；混合药|动词|药品用法|พยาบาลสอนแม่ผสมยาน้ำให้ลูกอย่างถูกวิธี|pha-yaa-baan saawn maae pha-som yaa naam hai luuk yaang thuuk wi-thii|护士教妈妈正确给孩子调药水。|ผสมยากับน้ำ|pha-som yaa gap naam|把药和水混合|กินยาเม็ด|gin yaa met|吃药片|用药
tham-dtaam-wi-thii|ทำตามวิธี|tham dtaam wi-thii|按方法做；遵照用法|动词|药品用法|ถ้าทำตามวิธีบนฉลากยา อาการจะดีขึ้นเร็วขึ้น|thaa tham dtaam wi-thii bon cha-laak yaa aa-gaan ja dii kheun reo kheun|如果按照药品标签上的用法做，症状会更快好转。|ทำตามวิธีใช้ยา|tham dtaam wi-thii chai yaa|按用药方法做|กินยาเอง|gin yaa eeng|自己随便吃药|用药
cha-laak-yaa|ฉลากยา|cha-laak yaa|药品标签|名词|药品用法|ก่อนกินยา ควรอ่านฉลากยาและดูจำนวนเม็ด|gaawn gin yaa khuuan aan cha-laak yaa lae duu jam-nuan met|吃药前应该看药品标签和片数。|อ่านฉลากยา|aan cha-laak yaa|读药品标签|ใบสั่งยา|bai sang yaa|处方单|药品
bai-sang-yaa|ใบสั่งยา|bai sang yaa|处方单|名词|药品用法|หมอเขียนใบสั่งยาให้ฉันไปรับยาที่เคาน์เตอร์|maaw khiian bai sang yaa hai chan bpai rap yaa thii khao-dtooe|医生写处方单让我去柜台领药。|ถือใบสั่งยา|thue bai sang yaa|拿着处方单|ฉลากยา|cha-laak yaa|药品标签|药品
rap-yaa|รับยา|rap yaa|领药|动词|药品用法|หลังจ่ายเงินแล้ว ฉันไปรับยาที่ช่องยา|lang jaai ngoen laaeo chan bpai rap yaa thii chaawng yaa|付款后，我去取药窗口领药。|รับยาตามใบสั่ง|rap yaa dtaam bai sang|按处方领药|จ่ายเงินค่ายา|jaai ngoen khaa yaa|付药费|流程
chaawng-yaa|ช่องยา|chaawng yaa|取药窗口|名词|药品用法|ช่องยาอยู่ข้างเคาน์เตอร์ชำระเงิน|chaawng yaa yuu khaang khao-dtooe cham-ra ngoen|取药窗口在付款柜台旁边。|รอที่ช่องยา|raaw thii chaawng yaa|在取药窗口等|ห้องตรวจ|haawng dtruat|诊室|场所
khaa-yaa|ค่ายา|khaa yaa|药费|名词|药品用法|ค่ายาครั้งนี้ไม่แพง เพราะมีแค่ยาแก้ไอ|khaa yaa khrang nii mai phaaeng phraw mii khae yaa gaae ai|这次药费不贵，因为只有止咳药。|จ่ายค่ายา|jaai khaa yaa|付药费|ค่าตรวจ|khaa dtruat|检查费|费用
khaa-dtruat|ค่าตรวจ|khaa dtruat|诊费；检查费|名词|诊所预约|ก่อนพบหมอ พนักงานบอกค่าตรวจให้ทราบ|gaawn phop maaw pha-nak-ngaan baawk khaa dtruat hai saap|看医生前，工作人员告知诊费。|จ่ายค่าตรวจ|jaai khaa dtruat|付诊费|ค่ายา|khaa yaa|药费|费用
glap-maa-phop-maaw|กลับมาพบหมอ|glap maa phop maaw|回来复诊；再来见医生|动词|复诊请假|ถ้าไอยังไม่หาย ให้กลับมาพบหมอวันจันทร์|thaa ai yang mai haai hai glap maa phop maaw wan-jan|如果咳嗽还没好，请周一回来复诊。|กลับมาพบหมออีกครั้ง|glap maa phop maaw iik khrang|再回来见医生|หายแล้วไม่ต้องมา|haai laaeo mai dtawng maa|好了不用来|复诊
nat-dtruat-iik|นัดตรวจอีก|nat dtruat iik|约再检查|动词|复诊请假|หมอนัดตรวจอีกในหนึ่งสัปดาห์เพื่อดูอาการ|maaw nat dtruat iik nai neung sap-daa phuea duu aa-gaan|医生约一周后再检查，以观察症状。|นัดตรวจอีกครั้ง|nat dtruat iik khrang|约再检查一次|ยกเลิกนัด|yok-loek nat|取消预约|复诊
bai-rap-rawng-phaaet|ใบรับรองแพทย์|bai rap-raawng phaaet|医生证明；病假证明|名词|复诊请假|ฉันขอใบรับรองแพทย์เพื่อส่งให้บริษัท|chan khaaw bai rap-raawng phaaet phuea song hai baaw-ri-sat|我申请医生证明，以便交给公司。|ขอใบรับรองแพทย์|khaaw bai rap-raawng phaaet|申请病假证明|ใบสั่งยา|bai sang yaa|处方单|请假
khaaw-laa-bpuai|ขอลาป่วย|khaaw laa bpuai|请病假|动词|复诊请假|วันนี้ฉันมีไข้สูง จึงต้องขอลาป่วยหนึ่งวัน|wan-nii chan mii khai suung jeung dtawng khaaw laa bpuai neung wan|今天我高烧，所以要请一天病假。|ขอลาป่วยกับหัวหน้า|khaaw laa bpuai gap hua-naa|向主管请病假|ไปทำงาน|bpai tham ngaan|去上班|请假
laa-bpuai-neung-wan|ลาป่วยหนึ่งวัน|laa bpuai neung wan|请一天病假|短语|复诊请假|หมอแนะนำให้ลาป่วยหนึ่งวันและพักอยู่บ้าน|maaw nae-nam hai laa bpuai neung wan lae phak yuu baan|医生建议请一天病假并在家休息。|เขียนลาป่วยหนึ่งวัน|khiian laa bpuai neung wan|写请一天病假|ลาพักร้อน|laa phak raawn|请年假|请假
jaeng-hua-naa|แจ้งหัวหน้า|jaaeng hua-naa|通知主管|动词|复诊请假|ฉันแจ้งหัวหน้าว่าต้องไปคลินิกตอนบ่าย|chan jaaeng hua-naa waa dtawng bpai khli-nik dtaawn baai|我通知主管下午必须去诊所。|แจ้งหัวหน้าเรื่องป่วย|jaaeng hua-naa rueang bpuai|把生病的事通知主管|แจ้งครู|jaaeng khruu|通知老师|请假
jaeng-khruu|แจ้งครู|jaaeng khruu|通知老师|动词|复诊请假|แม่แจ้งครูว่าลูกป่วยและวันนี้ไปโรงเรียนไม่ได้|maae jaaeng khruu waa luuk bpuai lae wan-nii bpai roong-riian mai dai|妈妈通知老师孩子生病，今天不能去学校。|แจ้งครูประจำชั้น|jaaeng khruu bpra-jam chan|通知班主任|แจ้งหัวหน้า|jaaeng hua-naa|通知主管|请假
phak-yuu-baan|พักอยู่บ้าน|phak yuu baan|在家休息|动词|复诊请假|เด็กมีน้ำมูกไหลมาก จึงควรพักอยู่บ้านหนึ่งวัน|dek mii naam-muuk lai maak jeung khuuan phak yuu baan neung wan|孩子流很多鼻涕，所以应该在家休息一天。|พักอยู่บ้านจนหาย|phak yuu baan jon haai|在家休息到好|ไปเรียน|bpai riian|去上课|康复
du-lae-khon-bpuai|ดูแลคนป่วย|duu-laae khon bpuai|照顾病人|动词|照顾别人|คืนนี้แม่ดูแลคนป่วยและวัดไข้ให้ทุกสี่ชั่วโมง|khuen-nii maae duu-laae khon bpuai lae wat khai hai thuk sii chua-moong|今晚妈妈照顾病人，并每四小时量体温。|ดูแลคนป่วยที่บ้าน|duu-laae khon bpuai thii baan|在家照顾病人|ดูแลตัวเอง|duu-laae dtua-eeng|照顾自己|照顾
du-lae-dtua-eeng|ดูแลตัวเอง|duu-laae dtua-eeng|照顾自己|动词|日常健康|ตอนอยู่คนเดียวต้องดูแลตัวเองและกินยาให้ตรงเวลา|dtaawn yuu khon diao dtawng duu-laae dtua-eeng lae gin yaa hai dtrong wee-laa|一个人住时要照顾自己，并按时吃药。|ดูแลตัวเองให้ดี|duu-laae dtua-eeng hai dii|好好照顾自己|ดูแลคนป่วย|duu-laae khon bpuai|照顾病人|健康
bpawn-yaa|ป้อนยา|bpaawn yaa|喂药|动词|照顾别人|แม่ป้อนยาให้น้องหลังอาหารเช้าตามฉลากยา|maae bpaawn yaa hai naawng lang aa-haan chaao dtaam cha-laak yaa|妈妈按照药品标签在早饭后给弟弟喂药。|ป้อนยาน้ำ|bpaawn yaa naam|喂药水|ให้กินยา|hai gin yaa|让吃药|照顾
hai-gin-yaa|ให้กินยา|hai gin yaa|让吃药；给药吃|动词|照顾别人|พยาบาลให้คนไข้กินยาหลังอาหารทันที|pha-yaa-baan hai khon-khai gin yaa lang aa-haan than-thii|护士让病人饭后马上吃药。|ให้กินยาตรงเวลา|hai gin yaa dtrong wee-laa|按时给药吃|ป้อนยา|bpaawn yaa|喂药|照顾
ched-dtua|เช็ดตัว|chet dtua|擦身；擦身体|动词|照顾别人|เมื่อลูกตัวร้อน แม่ใช้ผ้าชุบน้ำอุ่นเช็ดตัว|muea luuk dtua raawn maae chai phaa chup naam un chet dtua|孩子身上发热时，妈妈用温水湿布擦身。|เช็ดตัวลดไข้|chet dtua lot khai|擦身退烧|อาบน้ำ|aap naam|洗澡|照顾
phaa-chup-naam-un|ผ้าชุบน้ำอุ่น|phaa chup naam un|温水湿布|名词|照顾别人|ผ้าชุบน้ำอุ่นช่วยให้เด็กที่มีไข้รู้สึกสบายขึ้น|phaa chup naam un chuai hai dek thii mii khai ruu-seuk sa-baai kheun|温水湿布让发烧的孩子感觉舒服些。|ใช้ผ้าชุบน้ำอุ่น|chai phaa chup naam un|使用温水湿布|ผ้าเย็น|phaa yen|冷毛巾|照顾
hai-naam|ให้น้ำ|hai naam|给水；喂水|动词|照顾别人|เวลาคนป่วยมีไข้ ต้องให้น้ำบ่อย ๆ|wee-laa khon bpuai mii khai dtawng hai naam baawy baawy|病人发烧时，要经常给水喝。|ให้น้ำอุ่น|hai naam un|给温水|ให้อาหาร|hai aa-haan|给食物|照顾
hai-aa-haan|ให้อาหาร|hai aa-haan|给食物；喂饭|动词|照顾别人|หลังอาการดีขึ้น แม่ให้อาหารอ่อนกับลูก|lang aa-gaan dii kheun maae hai aa-haan aawn gap luuk|症状好转后，妈妈给孩子软食。|ให้อาหารคนป่วย|hai aa-haan khon bpuai|给病人食物|ให้น้ำ|hai naam|给水|照顾
phaa-bpai-haawng-naam|พาไปห้องน้ำ|phaa bpai haawng-naam|带去洗手间|动词|照顾别人|คุณยายไม่มีแรง หลานจึงพาไปห้องน้ำช้า ๆ|khun yaai mai mii raaeng laan jeung phaa bpai haawng-naam chaa chaa|奶奶没力气，孙辈就慢慢带她去洗手间。|พาคนป่วยไปห้องน้ำ|phaa khon bpuai bpai haawng-naam|带病人去洗手间|พาไปนอน|phaa bpai naawn|带去睡觉|照顾
phaa-bpai-phop-maaw|พาไปพบหมอ|phaa bpai phop maaw|带去看医生|动词|照顾别人|พ่อพาลูกไปพบหมอเพราะไอทั้งคืน|phaaw phaa luuk bpai phop maaw phraw ai thang khuen|爸爸带孩子去看医生，因为孩子整晚咳嗽。|พาแม่ไปพบหมอ|phaa maae bpai phop maaw|带妈妈去看医生|พาไปคลินิก|phaa bpai khli-nik|带去诊所|照顾
khaaw-kham-nae-nam|ขอคำแนะนำ|khaaw kham-nae-nam|请求建议；咨询|动词|诊所预约|ฉันขอคำแนะนำจากเภสัชกรเรื่องเวลากินยา|chan khaaw kham-nae-nam jaak phe-sat-cha-gaawn rueang wee-laa gin yaa|我向药剂师咨询吃药时间。|ขอคำแนะนำจากหมอ|khaaw kham-nae-nam jaak maaw|向医生咨询建议|ถามราคา|thaam raa-khaa|问价格|沟通
tham-aa-gaan|ถามอาการ|thaam aa-gaan|询问症状|动词|症状复述|หมอถามอาการอย่างละเอียดก่อนตรวจร่างกาย|maaw thaam aa-gaan yaang la-iiat gaawn dtruat raang-gaai|医生在检查身体前详细询问症状。|ถามอาการคนไข้|thaam aa-gaan khon-khai|询问病人症状|บอกอาการ|baawk aa-gaan|说明症状|沟通
baawk-aa-gaan|บอกอาการ|baawk aa-gaan|说明症状|动词|症状复述|เวลาพบหมอ ควรบอกอาการให้ชัดเจน|wee-laa phop maaw khuuan baawk aa-gaan hai chat-jen|看医生时，应该把症状说清楚。|บอกอาการกับหมอ|baawk aa-gaan gap maaw|向医生说明症状|ถามอาการ|thaam aa-gaan|询问症状|沟通
jam-aa-gaan|จำอาการ|jam aa-gaan|记住症状|动词|症状复述|ก่อนพาลูกไปคลินิก แม่พยายามจำอาการและเวลาเริ่มป่วย|gaawn phaa luuk bpai khli-nik maae pha-yaa-yaam jam aa-gaan lae wee-laa roem bpuai|带孩子去诊所前，妈妈努力记住症状和开始生病的时间。|จำอาการให้ครบ|jam aa-gaan hai khrop|把症状记全|ลืมอาการ|luem aa-gaan|忘记症状|复述
khian-aa-gaan|เขียนอาการ|khiian aa-gaan|写下症状|动词|症状复述|ฉันเขียนอาการไว้ในโทรศัพท์ก่อนเข้าห้องตรวจ|chan khiian aa-gaan wai nai thoo-ra-sap gaawn khao haawng dtruat|进诊室前，我把症状写在手机里。|เขียนอาการสั้น ๆ|khiian aa-gaan san san|简短写下症状|บอกอาการ|baawk aa-gaan|说明症状|复述
phuut-mai-thuuk|พูดไม่ถูก|phuut mai thuuk|说不清；不知道怎么说|短语|症状复述|ฉันปวดท้องแปลก ๆ แต่พูดไม่ถูกว่าเจ็บแบบไหน|chan bpuat thaawng bplaaek bplaaek dtaae phuut mai thuuk waa jep baep nai|我肚子有点奇怪地痛，但说不清是哪种痛。|พูดอาการไม่ถูก|phuut aa-gaan mai thuuk|说不清症状|บอกชัดเจน|baawk chat-jen|说清楚|沟通
baawk-chat-jen|บอกชัดเจน|baawk chat-jen|说清楚|动词|症状复述|ถ้าบอกชัดเจน หมอจะช่วยดูอาการได้ง่ายขึ้น|thaa baawk chat-jen maaw ja chuai duu aa-gaan dai ngaai kheun|如果说清楚，医生会更容易帮助看症状。|บอกเวลาให้ชัดเจน|baawk wee-laa hai chat-jen|把时间说清楚|พูดไม่ถูก|phuut mai thuuk|说不清|沟通
phaae-yaa|แพ้ยา|phaae yaa|药物过敏|动词|药品用法|ถ้าเคยแพ้ยา ต้องบอกหมอก่อนรับยาใหม่|thaa khoei phaae yaa dtawng baawk maaw gaawn rap yaa mai|如果曾经药物过敏，领新药前必须告诉医生。|เคยแพ้ยา|khoei phaae yaa|曾经药物过敏|แพ้อาหาร|phaae aa-haan|食物过敏|过敏
phaae-aa-haan|แพ้อาหาร|phaae aa-haan|食物过敏|动词|日常健康|น้องแพ้อาหารทะเล จึงต้องอ่านเมนูก่อนสั่ง|naawng phaae aa-haan tha-lee jeung dtawng aan mee-nuu gaawn sang|弟弟海鲜过敏，所以点餐前要看菜单。|แพ้อาหารทะเล|phaae aa-haan tha-lee|海鲜过敏|แพ้ยา|phaae yaa|药物过敏|过敏
mii-pheun|มีผื่น|mii pheun|有皮疹|短语|症状复述|หลังใช้สบู่ใหม่ ฉันมีผื่นแดงที่แขน|lang chai sa-buu mai chan mii pheun daaeng thii khaaen|用了新肥皂后，我手臂上有红色皮疹。|มีผื่นคัน|mii pheun khan|有发痒皮疹|คันผิว|khan phiu|皮肤痒|皮肤
khan-phiu|คันผิว|khan phiu|皮肤痒|短语|症状复述|ถ้าคันผิวมาก อย่าเกาจนเป็นแผล|thaa khan phiu maak yaa gao jon bpen phlaae|如果皮肤很痒，不要抓到破皮。|คันผิวตอนกลางคืน|khan phiu dtaawn glaang-khuen|夜里皮肤痒|มีผื่น|mii pheun|有皮疹|皮肤
pen-phlaae|เป็นแผล|bpen phlaae|有伤口；受伤破皮|短语|症状复述|เขาล้มตอนวิ่งและเป็นแผลที่เข่าเล็กน้อย|khao lom dtaawn wing lae bpen phlaae thii khao lek naawy|他跑步时摔倒，膝盖有小伤口。|เป็นแผลเล็ก|bpen phlaae lek|有小伤口|ฟกช้ำ|fok cham|淤青|伤口
laang-phlaae|ล้างแผล|laang phlaae|清洗伤口|动词|照顾别人|พยาบาลล้างแผลให้เด็กก่อนปิดผ้าก๊อซ|pha-yaa-baan laang phlaae hai dek gaawn bpit phaa-gawt|护士给孩子清洗伤口后再盖纱布。|ล้างแผลด้วยน้ำสะอาด|laang phlaae duai naam sa-aat|用清水洗伤口|ปิดแผล|bpit phlaae|包扎伤口|伤口
bpit-phlaae|ปิดแผล|bpit phlaae|包扎伤口；盖住伤口|动词|照顾别人|หลังล้างแผลแล้ว แม่ปิดแผลด้วยผ้าก๊อซสะอาด|lang laang phlaae laaeo maae bpit phlaae duai phaa-gawt sa-aat|清洗伤口后，妈妈用干净纱布包扎伤口。|ปิดแผลให้เรียบร้อย|bpit phlaae hai riiap-raawy|把伤口包扎好|เปิดแผล|bpoet phlaae|打开伤口敷料|伤口
phaa-gawt|ผ้าก๊อซ|phaa-gawt|纱布|名词|照顾别人|ผ้าก๊อซอยู่ในกล่องยาที่บ้าน|phaa-gawt yuu nai glaawng yaa thii baan|纱布在家里的药箱里。|ใช้ผ้าก๊อซสะอาด|chai phaa-gawt sa-aat|使用干净纱布|พลาสเตอร์|phlaat-dtooe|创可贴|用品
phlaat-dtooe|พลาสเตอร์|phlaat-dtooe|创可贴|名词|照顾别人|แผลเล็กแบบนี้ใช้พลาสเตอร์ก็พอ|phlaae lek baep nii chai phlaat-dtooe gaw phaaw|这种小伤口用创可贴就够了。|ติดพลาสเตอร์|dtit phlaat-dtooe|贴创可贴|ผ้าก๊อซ|phaa-gawt|纱布|用品
glaawng-yaa|กล่องยา|glaawng yaa|药箱|名词|日常健康|ในกล่องยามียาแก้ปวด พลาสเตอร์ และผ้าก๊อซ|nai glaawng yaa mii yaa gaae bpuat phlaat-dtooe lae phaa-gawt|药箱里有止痛药、创可贴和纱布。|จัดกล่องยา|jat glaawng yaa|整理药箱|ตู้ยา|dtuu yaa|药柜|用品
dtuu-yaa|ตู้ยา|dtuu yaa|药柜|名词|日常健康|ตู้ยาอยู่สูง เด็กจึงหยิบยาเองไม่ได้|dtuu yaa yuu suung dek jeung yip yaa eeng mai dai|药柜在高处，所以孩子不能自己拿药。|ล็อกตู้ยา|lok dtuu yaa|锁药柜|กล่องยา|glaawng yaa|药箱|用品
gep-yaa-hai-dii|เก็บยาให้ดี|gep yaa hai dii|妥善收药|动词|药品用法|ควรเก็บยาให้ดีและไม่วางไว้ใกล้เด็ก|khuuan gep yaa hai dii lae mai waang wai glai dek|应该妥善收药，不要放在孩子附近。|เก็บยาในตู้|gep yaa nai dtuu|把药收进柜子|วางยาทิ้งไว้|waang yaa thing wai|随手放药|用药
yaa-mot-aa-yu|ยาหมดอายุ|yaa mot aa-yu|药过期|短语|药品用法|อย่ากินยาหมดอายุ แม้ว่ายังเหลือหลายเม็ด|yaa gin yaa mot aa-yu maae waa yang luea laai met|不要吃过期药，即使还剩很多片。|ตรวจยาหมดอายุ|dtruat yaa mot aa-yu|检查药是否过期|ยาใหม่|yaa mai|新药|用药
tham-hai-nguang|ทำให้ง่วง|tham hai nguang|使人犯困|短语|药品用法|ยาแก้แพ้บางชนิดทำให้ง่วง จึงไม่ควรขับรถ|yaa gaae phaae baang cha-nit tham hai nguang jeung mai khuuan khap rot|有些抗过敏药会使人犯困，所以不应该开车。|ยาทำให้ง่วง|yaa tham hai nguang|药让人犯困|ทำให้ตื่น|tham hai dteun|使人清醒|用药
nguang|ง่วง|nguang|困；想睡|形容词|日常健康|หลังกินยาแล้วฉันง่วงมากและอยากนอนพัก|lang gin yaa laaeo chan nguang maak lae yaak naawn phak|吃药后我很困，想躺下休息。|ง่วงหลังยา|nguang lang yaa|吃药后困|ตื่นตัว|dteun-dtua|清醒|状态
mai-sabaai-dtua|ไม่สบายตัว|mai sa-baai dtua|身体不舒服|短语|症状复述|วันนี้ฉันไม่สบายตัว แต่ยังไม่มีไข้|wan-nii chan mai sa-baai dtua dtaae yang mai mii khai|今天我身体不舒服，但还没有发烧。|รู้สึกไม่สบายตัว|ruu-seuk mai sa-baai dtua|觉得身体不舒服|สบายตัว|sa-baai dtua|身体舒服|症状
sa-baai-dtua|สบายตัว|sa-baai dtua|身体舒服|形容词|康复建议|หลังอาบน้ำอุ่น คนไข้รู้สึกสบายตัวขึ้น|lang aap naam un khon-khai ruu-seuk sa-baai dtua kheun|洗了温水澡后，病人感觉身体舒服些。|สบายตัวขึ้น|sa-baai dtua kheun|身体更舒服|ไม่สบายตัว|mai sa-baai dtua|身体不舒服|康复
haai-jai-mai-saduak|หายใจไม่สะดวก|haai-jai mai sa-duak|呼吸不顺|短语|症状复述|ถ้าหายใจไม่สะดวก ต้องรีบขอความช่วยเหลือ|thaa haai-jai mai sa-duak dtawng riip khaaw khwaam chuai-luea|如果呼吸不顺，必须赶快求助。|รู้สึกหายใจไม่สะดวก|ruu-seuk haai-jai mai sa-duak|觉得呼吸不顺|หายใจสะดวก|haai-jai sa-duak|呼吸顺畅|症状
jep-naa-ok|เจ็บหน้าอก|jep naa-ok|胸口痛|短语|症状复述|เขาเจ็บหน้าอกตอนเดินเร็ว จึงหยุดพักทันที|khao jep naa-ok dtaawn doen reo jeung yut phak than-thii|他快走时胸口痛，所以马上停下来休息。|เจ็บหน้าอกมาก|jep naa-ok maak|胸口很痛|ปวดท้อง|bpuat thaawng|肚子痛|症状
naa-muet|หน้ามืด|naa muet|眼前发黑；快晕|形容词|症状复述|พอลุกเร็วเกินไป ฉันหน้ามืดและต้องนั่งพัก|phaaw luk reo goen bpai chan naa muet lae dtawng nang phak|起得太快时，我眼前发黑，必须坐下休息。|หน้ามืดตอนยืน|naa muet dtaawn yuen|站着时眼前发黑|เวียนหัว|wiian hua|头晕|症状
lom|ล้ม|lom|摔倒|动词|日常健康|คุณตาล้มในห้องน้ำ แต่โชคดีที่ไม่เป็นแผลใหญ่|khun dtaa lom nai haawng-naam dtaae chook dii thii mai bpen phlaae yai|外公在洗手间摔倒了，但幸好没有大伤口。|ล้มตอนเดิน|lom dtaawn doen|走路时摔倒|ลื่น|leuun|滑倒|伤病
leuun|ลื่น|leuun|滑；滑倒|动词|日常健康|พื้นเปียกมาก ระวังลื่นตอนเดินเข้าห้องน้ำ|phuen bpiiak maak ra-wang leuun dtaawn doen khao haawng-naam|地板很湿，走进洗手间时小心滑倒。|ลื่นล้ม|leuun lom|滑倒|เดินดี ๆ|doen dii dii|好好走|安全
ra-wang|ระวัง|ra-wang|小心；注意|动词|日常健康|ระวังน้ำร้อนนะ เดี๋ยวมือจะเจ็บ|ra-wang naam raawn na diao mue ja jep|小心热水哦，不然手会痛。|ระวังลื่น|ra-wang leuun|小心滑倒|ไม่ระวัง|mai ra-wang|不小心|安全
sai-naa-gaak|ใส่หน้ากาก|sai naa-gaak|戴口罩|动词|日常健康|ถ้าไอหรือจาม ควรใส่หน้ากากเวลาอยู่กับคนอื่น|thaa ai rue jaam khuuan sai naa-gaak wee-laa yuu gap khon euen|如果咳嗽或打喷嚏，和别人一起时应该戴口罩。|ใส่หน้ากากในคลินิก|sai naa-gaak nai khli-nik|在诊所戴口罩|ถอดหน้ากาก|thaawt naa-gaak|摘口罩|健康
laang-mue-baawy|ล้างมือบ่อย|laang mue baawy|常洗手|动词|日常健康|ช่วงไม่สบาย เราควรล้างมือบ่อยและใช้แก้วส่วนตัว|chuang mai sa-baai rao khuuan laang mue baawy lae chai gaaeo suan-dtua|身体不舒服期间，我们应该常洗手并使用个人杯子。|ล้างมือบ่อย ๆ|laang mue baawy baawy|经常洗手|ไม่ล้างมือ|mai laang mue|不洗手|健康
chai-gaaeo-suan-dtua|ใช้แก้วส่วนตัว|chai gaaeo suan-dtua|使用个人杯子|动词|日常健康|เมื่อน้ำมูกไหล ควรใช้แก้วส่วนตัวที่บ้าน|muea naam-muuk lai khuuan chai gaaeo suan-dtua thii baan|流鼻涕时，应该在家使用个人杯子。|แยกแก้วส่วนตัว|yaaek gaaeo suan-dtua|分开个人杯子|ใช้ร่วมกัน|chai ruam gan|共用|健康
yaaek-khaawng-chai|แยกของใช้|yaaek khaawng chai|分开用品|动词|照顾别人|เวลาคนในบ้านป่วย ควรแยกของใช้ส่วนตัว|wee-laa khon nai baan bpuai khuuan yaaek khaawng chai suan-dtua|家里有人生病时，应该分开个人用品。|แยกของใช้คนป่วย|yaaek khaawng chai khon bpuai|分开病人用品|ใช้ร่วมกัน|chai ruam gan|共用|照顾
bpai-dtruat-dtam-nat|ไปตรวจตามนัด|bpai dtruat dtaam nat|按预约去检查|动词|复诊请假|พรุ่งนี้แม่ต้องไปตรวจตามนัดตอนเก้าโมง|phrung-nii maae dtawng bpai dtruat dtaam nat dtaawn gaao moong|明天妈妈必须九点按预约去检查。|ไปตรวจตามนัดหมอ|bpai dtruat dtaam nat maaw|按医生预约去检查|ผิดนัด|phit nat|爽约|复诊
phit-nat|ผิดนัด|phit nat|爽约；没按约到|动词|复诊请假|อย่าผิดนัดหมอ ถ้าไปไม่ได้ควรโทรเลื่อนนัด|yaa phit nat maaw thaa bpai mai dai khuuan thoo leuuan nat|不要爽医生的约，如果去不了应该打电话改约。|ผิดนัดตรวจ|phit nat dtruat|没按约检查|ไปตามนัด|bpai dtaam nat|按约去|复诊
haai-bpuai|หายป่วย|haai bpuai|病好了|动词|康复建议|หลังหายป่วยแล้ว เขาค่อยกลับไปออกกำลังกายเบา ๆ|lang haai bpuai laaeo khao khaawy glap bpai aawk-gam-lang-gaai bao bao|病好后，他才慢慢恢复轻度运动。|หายป่วยแล้ว|haai bpuai laaeo|已经病好了|เริ่มป่วย|roem bpuai|开始生病|康复
haai-dii|หายดี|haai dii|完全好了|形容词|康复建议|แม้อาการดีขึ้นแล้ว แต่ยังไม่หายดี ควรพักต่อ|maae aa-gaan dii kheun laaeo dtaae yang mai haai dii khuuan phak dtaaw|虽然症状好转了，但还没完全好，应该继续休息。|หายดีแล้ว|haai dii laaeo|已经完全好了|ยังไม่หาย|yang mai haai|还没好|康复
yang-mai-haai|ยังไม่หาย|yang mai haai|还没好|短语|复诊请假|ฉันกินยาครบแล้วแต่อาการไอยังไม่หาย|chan gin yaa khrop laaeo dtaae aa-gaan ai yang mai haai|我已经把药吃完了，但咳嗽还没好。|ยังไม่หายดี|yang mai haai dii|还没完全好|หายดี|haai dii|完全好了|康复
gin-yaa-khrop|กินยาครบ|gin yaa khrop|药吃完；按量吃完|动词|药品用法|ต้องกินยาครบตามที่หมอสั่ง แม้อาการจะดีขึ้น|dtawng gin yaa khrop dtaam thii maaw sang maae aa-gaan ja dii kheun|即使症状好转，也要按医生说的把药吃完。|กินยาครบห้าวัน|gin yaa khrop haa wan|吃完整五天药|หยุดยาเอง|yut yaa eeng|自行停药|用药
yut-yaa-eeng|หยุดยาเอง|yut yaa eeng|自行停药|动词|药品用法|อย่าหยุดยาเอง ถ้ายังไม่แน่ใจควรถามหมอ|yaa yut yaa eeng thaa yang mai naae-jai khuuan thaam maaw|不要自行停药，如果还不确定应该问医生。|หยุดยาเองเร็วไป|yut yaa eeng reo bpai|自行停药太早|กินยาครบ|gin yaa khrop|吃完药|用药
dtrong-wee-laa|ตรงเวลา|dtrong wee-laa|按时|形容词|药品用法|คนไข้ควรกินยาให้ตรงเวลาเพื่อให้อาการดีขึ้น|khon-khai khuuan gin yaa hai dtrong wee-laa phuea hai aa-gaan dii kheun|病人应该按时吃药，让症状好转。|กินยาตรงเวลา|gin yaa dtrong wee-laa|按时吃药|ลืมกินยา|luem gin yaa|忘吃药|用药
luem-gin-yaa|ลืมกินยา|luem gin yaa|忘吃药|动词|药品用法|ถ้าลืมกินยา อย่ากินเพิ่มสองเท่าเอง|thaa luem gin yaa yaa gin phoem saawng thao eeng|如果忘吃药，不要自己加倍吃。|ลืมกินยาตอนเช้า|luem gin yaa dtaawn chaao|早上忘吃药|กินยาตรงเวลา|gin yaa dtrong wee-laa|按时吃药|用药
gin-phoem|กินเพิ่ม|gin phoem|多吃；加量吃|动词|药品用法|อย่ากินเพิ่มเองถ้าหมอไม่ได้บอก|yaa gin phoem eeng thaa maaw mai dai baawk|如果医生没说，不要自己加量吃。|กินยาเพิ่มเอง|gin yaa phoem eeng|自己加量吃药|กินตามขนาด|gin dtaam kha-naat|按剂量吃|用药
gin-dtaam-kha-naat|กินตามขนาด|gin dtaam kha-naat|按剂量吃|动词|药品用法|ยาสำหรับเด็กต้องกินตามขนาดที่ฉลากเขียนไว้|yaa sam-rap dek dtawng gin dtaam kha-naat thii cha-laak khiian wai|儿童用药必须按照标签写的剂量吃。|กินตามขนาดยา|gin dtaam kha-naat yaa|按药品剂量吃|กินเพิ่ม|gin phoem|加量吃|用药
tham-hai-phak|ทำให้พัก|tham hai phak|让休息|动词|照顾别人|แม่ทำให้ลูกพักโดยปิดทีวีและลดเสียงในห้อง|maae tham hai luuk phak dooi bpit thii-wii lae lot siiang nai haawng|妈妈通过关电视、降低房间声音让孩子休息。|ทำให้คนป่วยพัก|tham hai khon bpuai phak|让病人休息|ปลุกให้ตื่น|bpluk hai dteun|叫醒|照顾
lot-siiang|ลดเสียง|lot siiang|降低声音|动词|照顾别人|เมื่อมีคนป่วยนอนอยู่ ควรลดเสียงคุยในบ้าน|muea mii khon bpuai naawn yuu khuuan lot siiang khui nai baan|有人病着睡觉时，应该降低家里说话声。|ลดเสียงทีวี|lot siiang thii-wii|调低电视声音|เปิดเสียงดัง|bpoet siiang dang|开很大声|照顾
phaa-phaaet|พบแพทย์|phop phaaet|看医生；就医|动词|诊所预约|ถ้ามีไข้สูงหลายวัน ควรพบแพทย์ไม่ควรรอนาน|thaa mii khai suung laai wan khuuan phop phaaet mai khuuan raaw naan|如果高烧好几天，应该就医，不应该等太久。|ไปพบแพทย์|bpai phop phaaet|去看医生|พักเอง|phak eeng|自己休息|就医
tham-bat-bpra-gan|ทำบัตรประกัน|tham bat bpra-gan|办理保险卡；出示保险卡|动词|诊所预约|พนักงานถามว่าฉันมีบัตรประกันหรือไม่ก่อนคิดเงิน|pha-nak-ngaan thaam waa chan mii bat bpra-gan rue mai gaawn khit ngoen|工作人员收费前问我有没有保险卡。|ใช้บัตรประกัน|chai bat bpra-gan|使用保险卡|จ่ายเงินสด|jaai ngoen sot|付现金|费用
bat-bpra-gan|บัตรประกัน|bat bpra-gan|保险卡|名词|诊所预约|อย่าลืมเอาบัตรประกันไปคลินิกด้วย|yaa luem ao bat bpra-gan bpai khli-nik duai|别忘了把保险卡也带去诊所。|ยื่นบัตรประกัน|yeun bat bpra-gan|递交保险卡|บัตรประชาชน|bat bpra-chaa-chon|身份证|费用
bpra-wat-gaan-phaae|ประวัติการแพ้|bpra-wat gaan phaae|过敏史|名词|诊所预约|คนไข้ต้องบอกประวัติการแพ้ยาให้หมอฟัง|khon-khai dtawng baawk bpra-wat gaan phaae yaa hai maaw fang|病人必须把药物过敏史告诉医生。|มีประวัติการแพ้|mii bpra-wat gaan phaae|有过敏史|ไม่มีประวัติ|mai mii bpra-wat|没有病史|过敏
bpra-wat-bpuai|ประวัติป่วย|bpra-wat bpuai|病史|名词|诊所预约|หมอดูประวัติป่วยเก่าก่อนให้ยาใหม่|maaw duu bpra-wat bpuai gao gaawn hai yaa mai|医生给新药前查看旧病史。|ดูประวัติป่วย|duu bpra-wat bpuai|查看病史|อาการวันนี้|aa-gaan wan-nii|今天症状|病史
aa-gaan-wan-nii|อาการวันนี้|aa-gaan wan-nii|今天的症状|名词|症状复述|อาการวันนี้คือไอนิดหน่อยและเจ็บคอเวลา กลืน|aa-gaan wan-nii khue ai nit naawy lae jep khaaw wee-laa gleuun|今天的症状是有点咳嗽，并且吞咽时喉咙痛。|บอกอาการวันนี้|baawk aa-gaan wan-nii|说明今天症状|ประวัติป่วย|bpra-wat bpuai|病史|复述
`;

export const VOCABULARY_EXPANSION_A2_HEALTH_DAILY_CLINIC_01: VocabularyExpansionA2HealthDailyClinicCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
