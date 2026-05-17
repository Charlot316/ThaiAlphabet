type PartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
type Theme = "起床睡觉" | "洗漱穿衣" | "通勤上学" | "工作学习" | "休息运动" | "家务整理" | "一天安排" | "习惯计划";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2DailyRoutinesCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-daily-routine-context", "pythainlp-corpus", "kaikki-wiktionary-thai"];

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

function buildCandidate(row: Row, index: number): VocabularyExpansionA2DailyRoutinesCandidate {
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
        usageNotesZh: [`${row.thai} 常用于描述一天的顺序、习惯或计划，可和时间词一起用。`],
      },
    ],
    synonyms: [{ thai: row.relatedThai, roman: row.relatedRoman, chinese: row.relatedChinese }],
    antonyms: [],
    comparisons: [
      {
        kind: "易混",
        target: { thai: row.relatedThai, roman: row.relatedRoman, chinese: row.relatedChinese },
        distinctionZh: `${row.thai} 表示“${row.chinese}”；${row.relatedThai} 表示“${row.relatedChinese}”，注意动作发生的时间或目的不同。`,
      },
    ],
    collocations: [{ thai: row.collocationThai, roman: row.collocationRoman, chinese: row.collocationChinese }],
    usageNotesZh: ["适合用于“ทุกเช้า”“หลังจาก...”“ก่อน...”和“กำลังจะ...”等 A2 日常叙述句。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
dteun-chaao|ตื่นเช้า|dteun chaao|早起|动词|起床睡觉|ฉันตื่นเช้าทุกวันเพื่อเตรียมตัวไปทำงาน|chan dteun chaao thuk wan phuea dtriiam dtua bpai tham ngaan|我每天早起，为了准备去上班。|ตื่นเช้าหกโมง|dteun chaao hok moong|早上六点起床|ตื่นสาย|dteun saai|起晚|作息
dteun-saai|ตื่นสาย|dteun saai|起晚|动词|起床睡觉|วันนี้ฉันตื่นสาย จึงกินอาหารเช้าเร็วมาก|wan-nii chan dteun saai jeung gin aa-haan chaao reo maak|今天我起晚了，所以很快吃早饭。|ตื่นสายวันหยุด|dteun saai wan-yut|假日起晚|ตื่นเช้า|dteun chaao|早起|作息
bpit-naa-li-gaa|ปิดนาฬิกา|bpit naa-li-gaa|关闹钟|动词|起床睡觉|พอนาฬิกาดัง ฉันปิดนาฬิกาแล้วลุกจากเตียง|phaaw naa-li-gaa dang chan bpit naa-li-gaa laaeo luk jaak dtiiang|闹钟一响，我关掉闹钟然后起床。|ปิดนาฬิกาปลุก|bpit naa-li-gaa bpluk|关闹钟|ตั้งนาฬิกา|dtang naa-li-gaa|设闹钟|作息
dtang-naa-li-gaa|ตั้งนาฬิกา|dtang naa-li-gaa|设闹钟|动词|起床睡觉|ก่อนนอนฉันตั้งนาฬิกาไว้หกโมงครึ่ง|gaawn naawn chan dtang naa-li-gaa wai hok moong khrueng|睡前我把闹钟设在六点半。|ตั้งนาฬิกาปลุก|dtang naa-li-gaa bpluk|设置闹钟|ปิดนาฬิกา|bpit naa-li-gaa|关闹钟|作息
luk-jaak-dtiiang|ลุกจากเตียง|luk jaak dtiiang|从床上起来|动词|起床睡觉|หลังตื่นแล้ว ฉันลุกจากเตียงและเปิดผ้าม่าน|lang dteun laaeo chan luk jaak dtiiang lae bpoet phaa-maan|醒来后，我从床上起来并拉开窗帘。|ลุกจากเตียงทันที|luk jaak dtiiang than-thii|马上起床|นอนต่อ|naawn dtaaw|继续睡|作息
naawn-dtaaw|นอนต่อ|naawn dtaaw|继续睡|动词|起床睡觉|วันอาทิตย์ฉันชอบนอนต่ออีกหนึ่งชั่วโมง|wan-aa-thit chan chaawp naawn dtaaw iik neung chua-moong|星期天我喜欢再睡一个小时。|นอนต่อสักพัก|naawn dtaaw sak phak|再睡一会儿|ลุกจากเตียง|luk jaak dtiiang|起床|作息
gep-dtiiang|เก็บเตียง|gep dtiiang|整理床铺|动词|起床睡觉|ฉันเก็บเตียงทุกเช้าก่อนเข้าไปอาบน้ำ|chan gep dtiiang thuk chaao gaawn khao bpai aap naam|我每天早上洗澡前整理床铺。|เก็บเตียงให้เรียบร้อย|gep dtiiang hai riiap-raawy|把床整理好|ปล่อยเตียงรก|bplaawy dtiiang rok|让床乱着|整理
naawn-reo|นอนเร็ว|naawn reo|早睡|动词|起床睡觉|ถ้าพรุ่งนี้ต้องตื่นเช้า คืนนี้ควรนอนเร็ว|thaa phrung-nii dtawng dteun chaao khuen-nii khuuan naawn reo|如果明天要早起，今晚应该早睡。|นอนเร็วทุกคืน|naawn reo thuk khuen|每晚早睡|นอนดึก|naawn duek|晚睡|作息
naawn-duek|นอนดึก|naawn duek|晚睡|动词|起床睡觉|เมื่อคืนฉันนอนดึกเพราะทำการบ้านยังไม่เสร็จ|muea-khuen chan naawn duek phraw tham gaan-baan yang mai set|昨晚我晚睡，因为作业还没做完。|นอนดึกเกินไป|naawn duek goen bpai|睡得太晚|นอนเร็ว|naawn reo|早睡|作息
naawn-lap|นอนหลับ|naawn lap|睡着；入睡|动词|起床睡觉|หลังอ่านหนังสือสิบหน้า ฉันนอนหลับเร็วมาก|lang aan nang-sue sip naa chan naawn lap reo maak|读了十页书后，我很快睡着了。|นอนหลับสบาย|naawn lap sa-baai|睡得舒服|นอนไม่หลับ|naawn mai lap|睡不着|作息
naawn-mai-lap|นอนไม่หลับ|naawn mai lap|睡不着|动词|起床睡觉|ถ้าดื่มกาแฟตอนเย็น ฉันมักนอนไม่หลับ|thaa duem gaa-faae dtaawn yen chan mak naawn mai lap|如果傍晚喝咖啡，我常睡不着。|นอนไม่หลับทั้งคืน|naawn mai lap thang khuen|整晚睡不着|นอนหลับ|naawn lap|睡着|作息
lap-dtaa|หลับตา|lap dtaa|闭眼|动词|起床睡觉|ก่อนนอนลูกหลับตาและฟังนิทานจากแม่|gaawn naawn luuk lap dtaa lae fang ni-thaan jaak maae|睡前孩子闭着眼听妈妈讲故事。|หลับตาสักครู่|lap dtaa sak khruu|闭眼一会儿|ลืมตา|luem dtaa|睁眼|作息
luem-dtaa|ลืมตา|luem dtaa|睁眼|动词|起床睡觉|พอได้ยินเสียงนาฬิกา ฉันลืมตาช้า ๆ|phaaw dai-yin siiang naa-li-gaa chan luem dtaa chaa chaa|一听到闹钟声，我慢慢睁开眼。|ลืมตาตื่น|luem dtaa dteun|睁眼醒来|หลับตา|lap dtaa|闭眼|作息
bpaaeng-fan|แปรงฟัน|bpraaeng fan|刷牙|动词|洗漱穿衣|หลังตื่นนอน ฉันแปรงฟันก่อนดื่มน้ำ|lang dteun naawn chan bpraaeng fan gaawn duem naam|起床后，我先刷牙再喝水。|แปรงฟันตอนเช้า|bpraaeng fan dtaawn chaao|早上刷牙|บ้วนปาก|buan bpaak|漱口|洗漱
buan-bpaak|บ้วนปาก|buan bpaak|漱口|动词|洗漱穿衣|หลังแปรงฟัน เด็ก ๆ บ้วนปากด้วยน้ำสะอาด|lang bpraaeng fan dek dek buan bpaak duai naam sa-aat|刷牙后，孩子们用清水漱口。|บ้วนปากให้สะอาด|buan bpaak hai sa-aat|漱干净口|แปรงฟัน|bpraaeng fan|刷牙|洗漱
laang-naa|ล้างหน้า|laang naa|洗脸|动词|洗漱穿衣|ฉันล้างหน้าด้วยน้ำเย็นเพื่อให้สดชื่น|chan laang naa duai naam yen phuea hai sot-chuen|我用冷水洗脸，让自己清爽。|ล้างหน้าตอนเช้า|laang naa dtaawn chaao|早上洗脸|เช็ดหน้า|chet naa|擦脸|洗漱
chet-naa|เช็ดหน้า|chet naa|擦脸|动词|洗漱穿衣|หลังล้างหน้า ฉันใช้ผ้าขนหนูเล็กเช็ดหน้า|lang laang naa chan chai phaa khon-nuu lek chet naa|洗脸后，我用小毛巾擦脸。|เช็ดหน้าเบา ๆ|chet naa bao bao|轻轻擦脸|ล้างหน้า|laang naa|洗脸|洗漱
aap-naam-chaao|อาบน้ำเช้า|aap naam chaao|早上洗澡|动词|洗漱穿衣|อากาศร้อน ฉันจึงอาบน้ำเช้าก่อนไปทำงาน|aa-gaat raawn chan jeung aap naam chaao gaawn bpai tham ngaan|天气热，所以我上班前早上洗澡。|อาบน้ำเช้าทุกวัน|aap naam chaao thuk wan|每天早上洗澡|อาบน้ำเย็น|aap naam yen|晚上洗澡|洗漱
aap-naam-yen|อาบน้ำเย็น|aap naam yen|晚上洗澡|动词|洗漱穿衣|หลังกลับจากโรงเรียน ลูกชายอาบน้ำเย็นแล้วกินข้าว|lang glap jaak roong-riian luuk-chaai aap naam yen laaeo gin khaao|从学校回来后，儿子晚上洗澡然后吃饭。|อาบน้ำเย็นหลังเลิกงาน|aap naam yen lang loek ngaan|下班后晚上洗澡|อาบน้ำเช้า|aap naam chaao|早上洗澡|洗漱
sa-phon-phom|สระผม|sa phom|洗头|动词|洗漱穿衣|ฉันสระผมวันเว้นวันเพราะผมไม่มันมาก|chan sa phom wan wen wan phraw phom mai man maak|我隔一天洗一次头，因为头发不太油。|สระผมตอนเย็น|sa phom dtaawn yen|晚上洗头|หวีผม|wii phom|梳头|洗漱
wii-phom|หวีผม|wii phom|梳头|动词|洗漱穿衣|ก่อนไปโรงเรียน น้องหวีผมหน้ากระจก|gaawn bpai roong-riian naawng wii phom naa gra-jok|去学校前，妹妹在镜子前梳头。|หวีผมให้เรียบร้อย|wii phom hai riiap-raawy|把头发梳整齐|สระผม|sa phom|洗头|洗漱
goon-nuat|โกนหนวด|goon nuat|刮胡子|动词|洗漱穿衣|พ่อโกนหนวดตอนเช้าก่อนใส่เสื้อทำงาน|phaaw goon nuat dtaawn chaao gaawn sai suea tham ngaan|爸爸早上穿工作服前刮胡子。|โกนหนวดทุกเช้า|goon nuat thuk chaao|每天早上刮胡子|ล้างหน้า|laang naa|洗脸|洗漱
thaakhriim|ทาครีม|thaa khriim|擦乳霜|动词|洗漱穿衣|หลังล้างหน้า แม่ทาครีมบาง ๆ ก่อนออกจากบ้าน|lang laang naa maae thaa khriim baang baang gaawn aawk jaak baan|洗脸后，妈妈出门前薄薄地擦乳霜。|ทาครีมทาหน้า|thaa khriim thaa naa|擦面霜|ทาแป้ง|thaa bpaaeng|擦粉|洗漱
thaa-bpaaeng|ทาแป้ง|thaa bpaaeng|擦粉|动词|洗漱穿衣|เด็กเล็กทาแป้งหลังอาบน้ำแล้วใส่ชุดนอน|dek lek thaa bpaaeng lang aap naam laaeo sai chut naawn|小孩洗澡后擦粉，然后穿睡衣。|ทาแป้งหลังอาบน้ำ|thaa bpaaeng lang aap naam|洗澡后擦粉|ทาครีม|thaa khriim|擦乳霜|洗漱
sai-suea|ใส่เสื้อ|sai suea|穿上衣|动词|洗漱穿衣|ฉันใส่เสื้อสีขาวกับกางเกงสีดำไปทำงาน|chan sai suea sii khaao gap gaang-geeng sii dam bpai tham ngaan|我穿白色上衣和黑色裤子去上班。|ใส่เสื้อทำงาน|sai suea tham ngaan|穿工作上衣|ถอดเสื้อ|thaawt suea|脱上衣|穿衣
thaawt-suea|ถอดเสื้อ|thaawt suea|脱上衣|动词|洗漱穿衣|หลังออกกำลังกาย ฉันถอดเสื้อเปียกแล้วอาบน้ำ|lang aawk-gam-lang-gaai chan thaawt suea bpiiak laaeo aap naam|运动后，我脱下湿上衣然后洗澡。|ถอดเสื้อก่อนอาบน้ำ|thaawt suea gaawn aap naam|洗澡前脱衣服|ใส่เสื้อ|sai suea|穿上衣|穿衣
bplian-suea-phaa|เปลี่ยนเสื้อผ้า|bpliian suea-phaa|换衣服|动词|洗漱穿衣|กลับถึงบ้านแล้ว ฉันเปลี่ยนเสื้อผ้าเป็นชุดสบาย ๆ|glap thueng baan laaeo chan bpliian suea-phaa bpen chut sa-baai sa-baai|回到家后，我换成舒服的衣服。|เปลี่ยนเสื้อผ้าหลังเลิกงาน|bpliian suea-phaa lang loek ngaan|下班后换衣服|ใส่ชุดเดิม|sai chut doem|穿原来的衣服|穿衣
leuuak-chut|เลือกชุด|leuuak chut|选衣服；选套装|动词|洗漱穿衣|ตอนเช้าฉันเลือกชุดตามอากาศและงานของวันนั้น|dtaawn chaao chan leuuak chut dtaam aa-gaat lae ngaan khaawng wan nan|早上我根据天气和当天的事情选衣服。|เลือกชุดทำงาน|leuuak chut tham ngaan|选上班衣服|เปลี่ยนเสื้อผ้า|bpliian suea-phaa|换衣服|穿衣
dtid-gra-dum|ติดกระดุม|dtit gra-dum|扣纽扣|动词|洗漱穿衣|ลูกชายติดกระดุมเสื้อเองก่อนออกไปโรงเรียน|luuk-chaai dtit gra-dum suea eeng gaawn aawk bpai roong-riian|儿子去学校前自己扣上衣纽扣。|ติดกระดุมเสื้อ|dtit gra-dum suea|扣衣服纽扣|รูดซิป|ruut sip|拉拉链|穿衣
ruut-sip|รูดซิป|ruut sip|拉拉链|动词|洗漱穿衣|ก่อนขึ้นรถ ฉันรูดซิปกระเป๋าให้แน่น|gaawn kheun rot chan ruut sip gra-bpao hai naaen|上车前，我把包的拉链拉紧。|รูดซิปเสื้อ|ruut sip suea|拉衣服拉链|ติดกระดุม|dtit gra-dum|扣纽扣|穿衣
gin-aa-haan-chaao|กินอาหารเช้า|gin aa-haan chaao|吃早饭|动词|一天安排|ฉันกินอาหารเช้าง่าย ๆ เช่น ขนมปังกับนม|chan gin aa-haan chaao ngaai ngaai chen kha-nom-bpang gap nom|我吃简单的早饭，比如面包和牛奶。|กินอาหารเช้าก่อนออกบ้าน|gin aa-haan chaao gaawn aawk baan|出门前吃早饭|ข้ามอาหารเช้า|khaam aa-haan chaao|不吃早饭|饮食
khaam-aa-haan-chaao|ข้ามอาหารเช้า|khaam aa-haan chaao|不吃早饭；跳过早餐|动词|一天安排|ถ้าข้ามอาหารเช้า ฉันจะหิวง่ายตอนสาย|thaa khaam aa-haan chaao chan ja hiu ngaai dtaawn saai|如果不吃早饭，我上午会容易饿。|ข้ามอาหารเช้าบ่อย|khaam aa-haan chaao baawy|经常不吃早餐|กินอาหารเช้า|gin aa-haan chaao|吃早饭|饮食
duem-naam-chaao|ดื่มน้ำเช้า|duem naam chaao|早上喝水|动词|一天安排|หลังแปรงฟัน ฉันดื่มน้ำเช้าหนึ่งแก้ว|lang bpraaeng fan chan duem naam chaao neung gaaeo|刷牙后，我早上喝一杯水。|ดื่มน้ำเช้าทุกวัน|duem naam chaao thuk wan|每天早上喝水|ดื่มกาแฟ|duem gaa-faae|喝咖啡|饮食
duem-gaa-faae|ดื่มกาแฟ|duem gaa-faae|喝咖啡|动词|一天安排|พ่อดื่มกาแฟก่อนอ่านข่าวและไปทำงาน|phaaw duem gaa-faae gaawn aan khaao lae bpai tham ngaan|爸爸喝咖啡后看新闻并去上班。|ดื่มกาแฟร้อน|duem gaa-faae raawn|喝热咖啡|ดื่มน้ำ|duem naam|喝水|饮食
dtriiam-khaawng|เตรียมของ|dtriiam khaawng|准备东西|动词|一天安排|ก่อนออกจากบ้าน ฉันเตรียมของใส่กระเป๋าให้ครบ|gaawn aawk jaak baan chan dtriiam khaawng sai gra-bpao hai khrop|出门前，我把东西准备齐放进包里。|เตรียมของตอนเช้า|dtriiam khaawng dtaawn chaao|早上准备东西|ลืมของ|luem khaawng|忘带东西|安排
luem-khaawng|ลืมของ|luem khaawng|忘带东西|动词|一天安排|วันนี้ฉันลืมของสำคัญไว้บนโต๊ะทำงาน|wan-nii chan luem khaawng sam-khan wai bon dto tham ngaan|今天我把重要东西忘在办公桌上。|ลืมของที่บ้าน|luem khaawng thii baan|把东西忘在家|เตรียมของ|dtriiam khaawng|准备东西|安排
aawk-jaak-baan|ออกจากบ้าน|aawk jaak baan|出门；离开家|动词|通勤上学|ฉันออกจากบ้านตอนเจ็ดโมงเพื่อไปขึ้นรถเมล์|chan aawk jaak baan dtaawn jet moong phuea bpai kheun rot-mee|我七点出门去坐公交。|ออกจากบ้านแต่เช้า|aawk jaak baan dtaae chaao|一大早出门|กลับบ้าน|glap baan|回家|通勤
glap-baan|กลับบ้าน|glap baan|回家|动词|通勤上学|หลังเลิกงาน ฉันกลับบ้านด้วยรถไฟฟ้า|lang loek ngaan chan glap baan duai rot-fai-faa|下班后，我坐轻轨回家。|กลับบ้านตอนเย็น|glap baan dtaawn yen|傍晚回家|ออกจากบ้าน|aawk jaak baan|出门|通勤
bpai-tham-ngaan|ไปทำงาน|bpai tham ngaan|去上班|动词|通勤上学|พี่สาวไปทำงานด้วยรถเมล์ทุกเช้า|phii-saao bpai tham ngaan duai rot-mee thuk chaao|姐姐每天早上坐公交去上班。|ไปทำงานแต่เช้า|bpai tham ngaan dtaae chaao|一大早去上班|ไปโรงเรียน|bpai roong-riian|去学校|通勤
bpai-roong-riian|ไปโรงเรียน|bpai roong-riian|去学校|动词|通勤上学|เด็ก ๆ ไปโรงเรียนพร้อมกันตอนเจ็ดโมงครึ่ง|dek dek bpai roong-riian phraawm gan dtaawn jet moong khrueng|孩子们七点半一起去学校。|ไปโรงเรียนตรงเวลา|bpai roong-riian dtrong wee-laa|准时去学校|ไปทำงาน|bpai tham ngaan|去上班|通勤
kheun-rot|ขึ้นรถ|kheun rot|上车|动词|通勤上学|ฉันขึ้นรถเมล์หน้าบ้านและนั่งไปสิบห้านาที|chan kheun rot-mee naa baan lae nang bpai sip-haa naa-thii|我在家门口上公交，坐十五分钟。|ขึ้นรถเมล์|kheun rot-mee|上公交|ลงรถ|long rot|下车|通勤
long-rot|ลงรถ|long rot|下车|动词|通勤上学|เมื่อลงรถแล้ว ต้องเดินต่อไปที่โรงเรียน|muea long rot laaeo dtawng doen dtaaw bpai thii roong-riian|下车后，还要继续走到学校。|ลงรถหน้าตึก|long rot naa duek|在楼前下车|ขึ้นรถ|kheun rot|上车|通勤
doen-bpai|เดินไป|doen bpai|走去|动词|通勤上学|ถ้าอากาศดี ฉันเดินไปสถานีรถไฟฟ้า|thaa aa-gaat dii chan doen bpai sa-thaa-nii rot-fai-faa|如果天气好，我走去轻轨站。|เดินไปโรงเรียน|doen bpai roong-riian|走去学校|นั่งรถไป|nang rot bpai|坐车去|通勤
nang-rot-bpai|นั่งรถไป|nang rot bpai|坐车去|动词|通勤上学|ฝนตกหนัก เราจึงนั่งรถไปตลาดแทนเดิน|fon dtok nak rao jeung nang rot bpai dta-laat thaaen doen|雨下得很大，所以我们坐车去市场而不是走路。|นั่งรถไปทำงาน|nang rot bpai tham ngaan|坐车去上班|เดินไป|doen bpai|走去|通勤
thueng-thii-tham-ngaan|ถึงที่ทำงาน|thueng thii tham ngaan|到达工作地点|动词|通勤上学|ฉันถึงที่ทำงานก่อนแปดโมงสิบนาที|chan thueng thii tham ngaan gaawn bpaaet moong sip naa-thii|我八点前十分钟到达工作地点。|ถึงที่ทำงานตรงเวลา|thueng thii tham ngaan dtrong wee-laa|准时到公司|ถึงโรงเรียน|thueng roong-riian|到学校|通勤
thueng-roong-riian|ถึงโรงเรียน|thueng roong-riian|到学校|动词|通勤上学|ลูกชายถึงโรงเรียนแล้วจึงโทรบอกแม่|luuk-chaai thueng roong-riian laaeo jeung thoo baawk maae|儿子到学校后就打电话告诉妈妈。|ถึงโรงเรียนเจ็ดโมง|thueng roong-riian jet moong|七点到学校|ถึงที่ทำงาน|thueng thii tham ngaan|到工作地点|通勤
roem-ngaan|เริ่มงาน|roem ngaan|开始工作|动词|工作学习|พอถึงที่ทำงาน ฉันเปิดคอมพิวเตอร์และเริ่มงาน|phaaw thueng thii tham ngaan chan bpoet khawm-phiu-dtooe lae roem ngaan|一到工作地点，我打开电脑开始工作。|เริ่มงานเก้าโมง|roem ngaan gaao moong|九点开始工作|เลิกงาน|loek ngaan|下班|工作
loek-ngaan|เลิกงาน|loek ngaan|下班|动词|工作学习|วันนี้ฉันเลิกงานห้าโมงครึ่งแล้วไปซื้อของ|wan-nii chan loek ngaan haa moong khrueng laaeo bpai sue khaawng|今天我五点半下班，然后去买东西。|เลิกงานตรงเวลา|loek ngaan dtrong wee-laa|准时下班|เริ่มงาน|roem ngaan|开始工作|工作
tham-ngaan-baan|ทำงานบ้าน|tham ngaan baan|做家务|动词|家务整理|วันเสาร์เช้า ครอบครัวช่วยกันทำงานบ้าน|wan-sao chaao khraawp-khruua chuai gan tham ngaan baan|周六早上，家人一起做家务。|ทำงานบ้านด้วยกัน|tham ngaan baan duai gan|一起做家务|พักผ่อน|phak-phaawn|休息|家务
tham-ngaan-thii-baan|ทำงานที่บ้าน|tham ngaan thii baan|在家工作|动词|工作学习|วันฝนตกหนัก บริษัทให้พนักงานทำงานที่บ้าน|wan fon dtok nak baaw-ri-sat hai pha-nak-ngaan tham ngaan thii baan|大雨天，公司让员工在家工作。|ทำงานที่บ้านหนึ่งวัน|tham ngaan thii baan neung wan|在家工作一天|ไปทำงาน|bpai tham ngaan|去上班|工作
riian-thii-baan|เรียนที่บ้าน|riian thii baan|在家学习|动词|工作学习|ตอนเย็นฉันเรียนที่บ้านด้วยหนังสือและไฟล์เสียง|dtaawn yen chan riian thii baan duai nang-sue lae faai siiang|傍晚我在家用书和音频学习。|เรียนที่บ้านหลังอาหารเย็น|riian thii baan lang aa-haan yen|晚饭后在家学习|เรียนที่โรงเรียน|riian thii roong-riian|在学校学习|学习
phak-thiiang|พักเที่ยง|phak thiiang|午休|动词|休息运动|เราพักเที่ยงหนึ่งชั่วโมงและกินข้าวใกล้ออฟฟิศ|rao phak thiiang neung chua-moong lae gin khaao glai awf-fit|我们午休一小时，在办公室附近吃饭。|พักเที่ยงตอนเที่ยง|phak thiiang dtaawn thiiang|中午午休|ทำงานต่อ|tham ngaan dtaaw|继续工作|休息
gin-khaao-thiiang|กินข้าวเที่ยง|gin khaao thiiang|吃午饭|动词|一天安排|วันนี้ฉันกินข้าวเที่ยงกับเพื่อนที่ร้านเล็ก ๆ|wan-nii chan gin khaao thiiang gap phuean thii raan lek lek|今天我和朋友在小店吃午饭。|กินข้าวเที่ยงพร้อมกัน|gin khaao thiiang phraawm gan|一起吃午饭|กินข้าวเย็น|gin khaao yen|吃晚饭|饮食
gin-khaao-yen|กินข้าวเย็น|gin khaao yen|吃晚饭|动词|一天安排|ครอบครัวของเรากินข้าวเย็นพร้อมกันตอนหนึ่งทุ่ม|khraawp-khruua khaawng rao gin khaao yen phraawm gan dtaawn neung thum|我们家晚上七点一起吃晚饭。|กินข้าวเย็นที่บ้าน|gin khaao yen thii baan|在家吃晚饭|กินข้าวเที่ยง|gin khaao thiiang|吃午饭|饮食
phak-sai-dtaa|พักสายตา|phak saai-dtaa|让眼睛休息|动词|休息运动|หลังใช้คอมพิวเตอร์นาน ๆ ฉันพักสายตาห้านาที|lang chai khawm-phiu-dtooe naan naan chan phak saai-dtaa haa naa-thii|长时间用电脑后，我让眼睛休息五分钟。|พักสายตาจากจอ|phak saai-dtaa jaak jaaw|从屏幕前休息眼睛|ดูจอนาน|duu jaaw naan|长时间看屏幕|休息
duu-jaaw-naan|ดูจอนาน|duu jaaw naan|长时间看屏幕|动词|工作学习|ถ้าดูจอนานเกินไป ตาอาจล้าได้|thaa duu jaaw naan goen bpai dtaa aat laa dai|如果看屏幕太久，眼睛可能会累。|ดูจอนานทั้งวัน|duu jaaw naan thang wan|整天看屏幕|พักสายตา|phak saai-dtaa|休息眼睛|工作
phak-phaawn|พักผ่อน|phak-phaawn|休息；放松|动词|休息运动|หลังทำงานบ้านเสร็จ ฉันพักผ่อนด้วยการฟังเพลง|lang tham ngaan baan set chan phak-phaawn duai gaan fang phleeng|做完家务后，我听音乐放松。|พักผ่อนตอนเย็น|phak-phaawn dtaawn yen|傍晚休息|ทำงานบ้าน|tham ngaan baan|做家务|休息
duu-thii-wii|ดูทีวี|duu thii-wii|看电视|动词|休息运动|พ่อดูทีวีข่าวหลังอาหารเย็นทุกคืน|phaaw duu thii-wii khaao lang aa-haan yen thuk khuen|爸爸每天晚饭后看电视新闻。|ดูทีวีกับครอบครัว|duu thii-wii gap khraawp-khruua|和家人看电视|อ่านหนังสือ|aan nang-sue|看书|休息
fang-phleeng|ฟังเพลง|fang phleeng|听音乐|动词|休息运动|ฉันฟังเพลงเบา ๆ ระหว่างจัดห้องนอน|chan fang phleeng bao bao ra-waang jat haawng naawn|我整理卧室时听轻音乐。|ฟังเพลงก่อนนอน|fang phleeng gaawn naawn|睡前听音乐|ดูทีวี|duu thii-wii|看电视|休息
len-thoo-ra-sap|เล่นโทรศัพท์|len thoo-ra-sap|玩手机|动词|休息运动|ก่อนนอนอย่าเล่นโทรศัพท์นาน เพราะอาจนอนไม่หลับ|gaawn naawn yaa len thoo-ra-sap naan phraw aat naawn mai lap|睡前不要长时间玩手机，因为可能睡不着。|เล่นโทรศัพท์ตอนพัก|len thoo-ra-sap dtaawn phak|休息时玩手机|อ่านหนังสือ|aan nang-sue|看书|休息
aan-nang-sue-gaawn-naawn|อ่านหนังสือก่อนนอน|aan nang-sue gaawn naawn|睡前看书|短语|起床睡觉|แม่อ่านหนังสือก่อนนอนสิบหน้าเพื่อให้ใจสงบ|maae aan nang-sue gaawn naawn sip naa phuea hai jai sa-ngop|妈妈睡前读十页书，让心平静。|อ่านหนังสือก่อนนอนทุกคืน|aan nang-sue gaawn naawn thuk khuen|每晚睡前看书|เล่นโทรศัพท์ก่อนนอน|len thoo-ra-sap gaawn naawn|睡前玩手机|作息
aawk-gam-lang-gaai|ออกกำลังกาย|aawk-gam-lang-gaai|运动；锻炼|动词|休息运动|ฉันออกกำลังกายหลังเลิกงานสัปดาห์ละสามครั้ง|chan aawk-gam-lang-gaai lang loek ngaan sap-daa la saam khrang|我每周三次下班后运动。|ออกกำลังกายตอนเย็น|aawk-gam-lang-gaai dtaawn yen|傍晚运动|นั่งพัก|nang phak|坐着休息|运动
wing-baao-baao|วิ่งเบา ๆ|wing bao bao|慢跑；轻松跑|动词|休息运动|ตอนเช้าพี่ชายวิ่งเบา ๆ รอบสวนสามรอบ|dtaawn chaao phii-chaai wing bao bao raawp suan saam raawp|早上哥哥绕着花园慢跑三圈。|วิ่งเบา ๆ ตอนเช้า|wing bao bao dtaawn chaao|早上慢跑|เดินเล่น|doen len|散步|运动
doen-len|เดินเล่น|doen len|散步|动词|休息运动|หลังอาหารเย็น เราเดินเล่นในหมู่บ้านครึ่งชั่วโมง|lang aa-haan yen rao doen len nai muu-baan khrueng chua-moong|晚饭后，我们在小区散步半小时。|เดินเล่นหลังข้าวเย็น|doen len lang khaao yen|晚饭后散步|วิ่งเบา ๆ|wing bao bao|慢跑|运动
yued-sen|ยืดเส้น|yuet sen|拉伸|动词|休息运动|ก่อนวิ่ง ฉันยืดเส้นห้านาทีเพื่อไม่ให้เจ็บขา|gaawn wing chan yuet sen haa naa-thii phuea mai hai jep khaa|跑步前，我拉伸五分钟，以免腿疼。|ยืดเส้นก่อนออกกำลังกาย|yuet sen gaawn aawk-gam-lang-gaai|运动前拉伸|นั่งพัก|nang phak|坐着休息|运动
nang-phak|นั่งพัก|nang phak|坐着休息|动词|休息运动|หลังทำความสะอาดบ้าน ฉันนั่งพักบนโซฟา|lang tham khwaam sa-aat baan chan nang phak bon soo-faa|打扫完家后，我坐在沙发上休息。|นั่งพักสักครู่|nang phak sak khruu|坐着休息一会儿|ออกกำลังกาย|aawk-gam-lang-gaai|运动|休息
gwaat-baan|กวาดบ้าน|gwaat baan|扫房子|动词|家务整理|ตอนเช้าแม่กวาดบ้านก่อนเปิดประตูรับลม|dtaawn chaao maae gwaat baan gaawn bpoet bpra-dtuu rap lom|早上妈妈开门通风前先扫房子。|กวาดบ้านทุกเช้า|gwaat baan thuk chaao|每天早上扫房子|ถูบ้าน|thuu baan|拖房子|家务
thuu-baan|ถูบ้าน|thuu baan|拖房子；拖地|动词|家务整理|หลังจากกวาดบ้านแล้ว พ่อถูบ้านด้วยน้ำยาถูพื้น|lang jaak gwaat baan laaeo phaaw thuu baan duai nam-yaa thuu phuen|扫完房子后，爸爸用地板清洁剂拖地。|ถูบ้านให้สะอาด|thuu baan hai sa-aat|把房子拖干净|กวาดบ้าน|gwaat baan|扫房子|家务
laang-jaan|ล้างจาน|laang jaan|洗碗|动词|家务整理|หลังอาหารเย็น ลูกสาวช่วยแม่ล้างจานในครัว|lang aa-haan yen luuk-saao chuai maae laang jaan nai khruua|晚饭后，女儿在厨房帮妈妈洗碗。|ล้างจานหลังกินข้าว|laang jaan lang gin khaao|饭后洗碗|เช็ดโต๊ะ|chet dto|擦桌子|家务
chet-dto|เช็ดโต๊ะ|chet dto|擦桌子|动词|家务整理|ก่อนกินข้าว ฉันเช็ดโต๊ะอาหารให้สะอาด|gaawn gin khaao chan chet dto aa-haan hai sa-aat|吃饭前，我把餐桌擦干净。|เช็ดโต๊ะหลังอาหาร|chet dto lang aa-haan|饭后擦桌子|ล้างจาน|laang jaan|洗碗|家务
sak-phaa|ซักผ้า|sak phaa|洗衣服|动词|家务整理|วันอาทิตย์ฉันซักผ้าและตากผ้าหน้าบ้าน|wan-aa-thit chan sak phaa lae dtaak phaa naa baan|星期天我洗衣服，并在屋前晾衣服。|ซักผ้าตอนเช้า|sak phaa dtaawn chaao|早上洗衣服|ตากผ้า|dtaak phaa|晾衣服|家务
dtaak-phaa|ตากผ้า|dtaak phaa|晾衣服|动词|家务整理|หลังซักผ้า แม่ตากผ้าบนราวตากผ้า|lang sak phaa maae dtaak phaa bon raao dtaak phaa|洗完衣服后，妈妈把衣服晾在晾衣杆上。|ตากผ้าแดด|dtaak phaa daaet|晒衣服|พับผ้า|phap phaa|叠衣服|家务
phap-phaa|พับผ้า|phap phaa|叠衣服|动词|家务整理|ผ้าแห้งแล้ว ฉันพับผ้าใส่ตู้เสื้อผ้า|phaa haaeng laaeo chan phap phaa sai dtuu suea-phaa|衣服干了，我把衣服叠好放进衣柜。|พับผ้าให้เรียบร้อย|phap phaa hai riiap-raawy|把衣服叠整齐|ตากผ้า|dtaak phaa|晾衣服|家务
riit-phaa|รีดผ้า|riit phaa|熨衣服|动词|家务整理|พ่อรีดผ้าเชิ้ตสีขาวสำหรับประชุมพรุ่งนี้|phaaw riit phaa-choet sii khaao sam-rap bpra-chum phrung-nii|爸爸熨明天开会要穿的白衬衫。|รีดผ้าทำงาน|riit phaa tham ngaan|熨上班衣服|พับผ้า|phap phaa|叠衣服|家务
thing-kha-ya|ทิ้งขยะ|thing kha-ya|扔垃圾|动词|家务整理|ก่อนออกจากบ้าน ฉันเอาถุงขยะไปทิ้งขยะ|gaawn aawk jaak baan chan ao thung kha-ya bpai thing kha-ya|出门前，我把垃圾袋拿去扔垃圾。|ทิ้งขยะตอนเช้า|thing kha-ya dtaawn chaao|早上扔垃圾|เก็บขยะ|gep kha-ya|收垃圾|家务
gep-kha-ya|เก็บขยะ|gep kha-ya|收垃圾；捡垃圾|动词|家务整理|เด็ก ๆ ช่วยกันเก็บขยะหลังงานเลี้ยงเล็ก ๆ|dek dek chuai gan gep kha-ya lang ngaan-liiang lek lek|小聚会后，孩子们一起收垃圾。|เก็บขยะในห้อง|gep kha-ya nai haawng|收房间垃圾|ทิ้งขยะ|thing kha-ya|扔垃圾|家务
jat-haawng|จัดห้อง|jat haawng|整理房间|动词|家务整理|ฉันจัดห้องนอนทุกวันเสาร์ให้ดูสะอาดขึ้น|chan jat haawng naawn thuk wan-sao hai duu sa-aat kheun|我每周六整理卧室，让它看起来更干净。|จัดห้องให้เรียบร้อย|jat haawng hai riiap-raawy|把房间整理好|ปล่อยห้องรก|bplaawy haawng rok|让房间乱着|整理
haawng-rok|ห้องรก|haawng rok|房间乱|形容词|家务整理|ถ้าไม่เก็บของเข้าที่ ห้องรกเร็วมาก|thaa mai gep khaawng khao thii haawng rok reo maak|如果不把东西收回原处，房间很快就乱。|ห้องรกมาก|haawng rok maak|房间很乱|ห้องเรียบร้อย|haawng riiap-raawy|房间整齐|整理
haawng-riiap-raawy|ห้องเรียบร้อย|haawng riiap-raawy|房间整齐|形容词|家务整理|หลังจัดห้องแล้ว ห้องเรียบร้อยและน่าอยู่มาก|lang jat haawng laaeo haawng riiap-raawy lae naa-yuu maak|整理房间后，房间很整齐也很宜居。|ทำห้องให้เรียบร้อย|tham haawng hai riiap-raawy|把房间弄整齐|ห้องรก|haawng rok|房间乱|整理
tham-aa-haan|ทำอาหาร|tham aa-haan|做饭|动词|家务整理|ตอนเย็นแม่ทำอาหารง่าย ๆ ให้ทุกคนกิน|dtaawn yen maae tham aa-haan ngaai ngaai hai thuk khon gin|傍晚妈妈做简单的饭给大家吃。|ทำอาหารเย็น|tham aa-haan yen|做晚饭|ซื้ออาหาร|sue aa-haan|买饭|家务
sue-aa-haan|ซื้ออาหาร|sue aa-haan|买饭；买食物|动词|一天安排|วันนี้ไม่มีเวลา พวกเราจึงซื้ออาหารกลับบ้าน|wan-nii mai mii wee-laa phuak rao jeung sue aa-haan glap baan|今天没时间，所以我们买饭带回家。|ซื้ออาหารเย็น|sue aa-haan yen|买晚饭|ทำอาหาร|tham aa-haan|做饭|饮食
dtom-naam|ต้มน้ำ|dtom naam|烧水|动词|家务整理|ตอนเช้าฉันต้มน้ำเพื่อชงกาแฟให้พ่อ|dtaawn chaao chan dtom naam phuea chong gaa-faae hai phaaw|早上我烧水给爸爸冲咖啡。|ต้มน้ำร้อน|dtom naam raawn|烧热水|ชงกาแฟ|chong gaa-faae|冲咖啡|家务
chong-gaa-faae|ชงกาแฟ|chong gaa-faae|冲咖啡|动词|一天安排|แม่ชงกาแฟหนึ่งแก้วก่อนอ่านข่าวเช้า|maae chong gaa-faae neung gaaeo gaawn aan khaao chaao|妈妈看早间新闻前冲一杯咖啡。|ชงกาแฟร้อน|chong gaa-faae raawn|冲热咖啡|ต้มน้ำ|dtom naam|烧水|饮食
dtang-dto-aa-haan|ตั้งโต๊ะอาหาร|dtang dto aa-haan|摆餐桌|动词|家务整理|ก่อนกินข้าวเย็น ลูกช่วยตั้งโต๊ะอาหาร|gaawn gin khaao yen luuk chuai dtang dto aa-haan|吃晚饭前，孩子帮忙摆餐桌。|ตั้งโต๊ะอาหารให้พร้อม|dtang dto aa-haan hai phraawm|把餐桌摆好|เก็บโต๊ะอาหาร|gep dto aa-haan|收餐桌|家务
gep-dto-aa-haan|เก็บโต๊ะอาหาร|gep dto aa-haan|收餐桌|动词|家务整理|หลังกินข้าว ทุกคนช่วยกันเก็บโต๊ะอาหาร|lang gin khaao thuk khon chuai gan gep dto aa-haan|吃饭后，大家一起收餐桌。|เก็บโต๊ะอาหารหลังมื้อเย็น|gep dto aa-haan lang mue yen|晚饭后收餐桌|ตั้งโต๊ะอาหาร|dtang dto aa-haan|摆餐桌|家务
bpai-sue-khaawng|ไปซื้อของ|bpai sue khaawng|去买东西|动词|一天安排|หลังเลิกงาน ฉันไปซื้อของใช้ในบ้านที่ตลาด|lang loek ngaan chan bpai sue khaawng chai nai baan thii dta-laat|下班后，我去市场买家用品。|ไปซื้อของตอนเย็น|bpai sue khaawng dtaawn yen|傍晚去买东西|อยู่บ้าน|yuu baan|待在家|安排
yuu-baan|อยู่บ้าน|yuu baan|待在家|动词|一天安排|วันหยุดนี้ฉันอยากอยู่บ้านและพักผ่อนทั้งวัน|wan-yut nii chan yaak yuu baan lae phak-phaawn thang wan|这个假日我想待在家休息一整天。|อยู่บ้านวันหยุด|yuu baan wan-yut|假日待在家|ออกไปข้างนอก|aawk bpai khaang naawk|出去外面|安排
aawk-bpai-khaang-naawk|ออกไปข้างนอก|aawk bpai khaang naawk|出去外面|动词|一天安排|ตอนบ่ายเราจะออกไปข้างนอกเพื่อเดินเล่น|dtaawn baai rao ja aawk bpai khaang naawk phuea doen len|下午我们要出去外面散步。|ออกไปข้างนอกตอนเย็น|aawk bpai khaang naawk dtaawn yen|傍晚出去|อยู่บ้าน|yuu baan|待在家|安排
waang-phaaen-wan|วางแผนวัน|waang phaaen wan|安排一天；规划当天|动词|一天安排|ทุกเช้าฉันวางแผนวันก่อนเริ่มงาน|thuk chaao chan waang phaaen wan gaawn roem ngaan|每天早上我开始工作前安排一天。|วางแผนวันพรุ่งนี้|waang phaaen wan phrung-nii|安排明天|ปล่อยตามสบาย|bplaawy dtaam sa-baai|随意安排|计划
dtaa-raang-wan|ตารางวัน|dtaa-raang wan|一天日程表|名词|一天安排|ตารางวันของฉันมีเรียน ทำงาน และออกกำลังกาย|dtaa-raang wan khaawng chan mii riian tham ngaan lae aawk-gam-lang-gaai|我的一天日程表有学习、工作和运动。|ดูตารางวัน|duu dtaa-raang wan|看当天日程|รายการงาน|raai-gaan ngaan|任务清单|计划
raai-gaan-ngaan|รายการงาน|raai-gaan ngaan|任务清单|名词|一天安排|ฉันเขียนรายการงานสามอย่างไว้ในสมุด|chan khiian raai-gaan ngaan saam yaang wai nai sa-mut|我在本子上写了三项任务清单。|ทำรายการงาน|tham raai-gaan ngaan|做任务清单|ตารางวัน|dtaa-raang wan|一天日程表|计划
tham-dtaam-phaaen|ทำตามแผน|tham dtaam phaaen|按计划做|动词|习惯计划|วันนี้ฉันทำตามแผนได้เกือบทั้งหมด|wan-nii chan tham dtaam phaaen dai geuuap thang-mot|今天我几乎全部按计划做到了。|ทำตามแผนทุกวัน|tham dtaam phaaen thuk wan|每天按计划做|เปลี่ยนแผน|bpliian phaaen|改变计划|计划
bplian-phaaen|เปลี่ยนแผน|bpliian phaaen|改变计划|动词|习惯计划|ฝนตกหนัก เราจึงเปลี่ยนแผนจากเดินเล่นเป็นอยู่บ้าน|fon dtok nak rao jeung bpliian phaaen jaak doen len bpen yuu baan|雨下得很大，所以我们把计划从散步改为待在家。|เปลี่ยนแผนตอนบ่าย|bpliian phaaen dtaawn baai|下午改计划|ทำตามแผน|tham dtaam phaaen|按计划做|计划
mee-phaaen|มีแผน|mii phaaen|有计划|短语|习惯计划|เสาร์นี้ฉันมีแผนไปซื้อของกับแม่|sao nii chan mii phaaen bpai sue khaawng gap maae|这个周六我有计划和妈妈去买东西。|มีแผนตอนเย็น|mii phaaen dtaawn yen|傍晚有计划|ไม่มีแผน|mai mii phaaen|没有计划|计划
mai-mii-phaaen|ไม่มีแผน|mai mii phaaen|没有计划|短语|习惯计划|วันหยุดนี้ฉันไม่มีแผน จึงอยากนอนต่อ|wan-yut nii chan mai mii phaaen jeung yaak naawn dtaaw|这个假日我没有计划，所以想继续睡。|ไม่มีแผนพิเศษ|mai mii phaaen phi-seet|没有特别计划|มีแผน|mii phaaen|有计划|计划
bpen-bpra-jam|เป็นประจำ|bpen bpra-jam|经常；定期|副词|习惯计划|ฉันออกกำลังกายเป็นประจำหลังเลิกงาน|chan aawk-gam-lang-gaai bpen bpra-jam lang loek ngaan|我下班后经常运动。|ทำเป็นประจำ|tham bpen bpra-jam|定期做|นาน ๆ ครั้ง|naan naan khrang|偶尔|习惯
naan-naan-khrang|นาน ๆ ครั้ง|naan naan khrang|偶尔；很久一次|副词|习惯计划|ฉันกินขนมหวานนาน ๆ ครั้ง ไม่ได้กินทุกวัน|chan gin kha-nom waan naan naan khrang mai dai gin thuk wan|我偶尔吃甜点，不是每天吃。|ไปเที่ยวนาน ๆ ครั้ง|bpai thiao naan naan khrang|偶尔去玩|เป็นประจำ|bpen bpra-jam|经常|习惯
thuk-chaao|ทุกเช้า|thuk chaao|每天早上|副词|习惯计划|ทุกเช้าฉันดื่มน้ำหนึ่งแก้วแล้วล้างหน้า|thuk chaao chan duem naam neung gaaeo laaeo laang naa|每天早上我喝一杯水然后洗脸。|ทำทุกเช้า|tham thuk chaao|每天早上做|ทุกคืน|thuk khuen|每天晚上|时间
thuk-khuen|ทุกคืน|thuk khuen|每天晚上|副词|习惯计划|ทุกคืนแม่อ่านหนังสือก่อนนอนประมาณสิบห้านาที|thuk khuen maae aan nang-sue gaawn naawn bpra-maan sip-haa naa-thii|每天晚上妈妈睡前看书大约十五分钟。|ทำทุกคืน|tham thuk khuen|每天晚上做|ทุกเช้า|thuk chaao|每天早上|时间
thuk-wan-yut|ทุกวันหยุด|thuk wan-yut|每个假日|副词|习惯计划|ทุกวันหยุดครอบครัวเราทำความสะอาดบ้านด้วยกัน|thuk wan-yut khraawp-khruua rao tham khwaam sa-aat baan duai gan|每个假日我们家一起打扫房子。|พักทุกวันหยุด|phak thuk wan-yut|每个假日休息|วันทำงาน|wan tham ngaan|工作日|时间
wan-tham-ngaan|วันทำงาน|wan tham ngaan|工作日|名词|一天安排|วันทำงานฉันออกจากบ้านเร็วกว่าเสาร์อาทิตย์|wan tham ngaan chan aawk jaak baan reo gwaa sao-aa-thit|工作日我比周末更早出门。|ตื่นเช้าวันทำงาน|dteun chaao wan tham ngaan|工作日早起|วันหยุด|wan-yut|假日|时间
wan-yut|วันหยุด|wan-yut|假日；休息日|名词|一天安排|วันหยุดนี้ฉันอยากทำงานบ้านและพักผ่อน|wan-yut nii chan yaak tham ngaan baan lae phak-phaawn|这个假日我想做家务和休息。|พักวันหยุด|phak wan-yut|假日休息|วันทำงาน|wan tham ngaan|工作日|时间
dtaawn-chaao-truu|ตอนเช้าตรู่|dtaawn chaao dtruu|清晨|名词|一天安排|ตอนเช้าตรู่ถนนยังไม่ค่อยมีรถ|dtaawn chaao dtruu tha-non yang mai khaawy mii rot|清晨路上还不太有车。|ออกกำลังกายตอนเช้าตรู่|aawk-gam-lang-gaai dtaawn chaao dtruu|清晨运动|ตอนสาย|dtaawn saai|上午晚些时候|时间
dtaawn-saai|ตอนสาย|dtaawn saai|上午晚些时候|名词|一天安排|ตอนสายฉันดื่มกาแฟอีกแก้วและเริ่มงานต่อ|dtaawn saai chan duem gaa-faae iik gaaeo lae roem ngaan dtaaw|上午晚些时候，我再喝一杯咖啡并继续工作。|กินของว่างตอนสาย|gin khaawng-waang dtaawn saai|上午晚些时候吃点心|ตอนเช้าตรู่|dtaawn chaao dtruu|清晨|时间
dtaawn-baai|ตอนบ่าย|dtaawn baai|下午|名词|一天安排|ตอนบ่ายฉันมักประชุมสั้น ๆ กับทีมงาน|dtaawn baai chan mak bpra-chum san san gap thiim-ngaan|下午我常和团队开简短会议。|ทำงานตอนบ่าย|tham ngaan dtaawn baai|下午工作|ตอนเย็น|dtaawn yen|傍晚|时间
dtaawn-yen|ตอนเย็น|dtaawn yen|傍晚；晚上早些时候|名词|一天安排|ตอนเย็นเด็ก ๆ กลับบ้านและทำการบ้าน|dtaawn yen dek dek glap baan lae tham gaan-baan|傍晚孩子们回家并做作业。|ออกกำลังกายตอนเย็น|aawk-gam-lang-gaai dtaawn yen|傍晚运动|ตอนบ่าย|dtaawn baai|下午|时间
gaawn-aawk-baan|ก่อนออกบ้าน|gaawn aawk baan|出门前|短语|一天安排|ก่อนออกบ้าน ฉันตรวจไฟและปิดประตูให้ดี|gaawn aawk baan chan dtruat fai lae bpit bpra-dtuu hai dii|出门前，我检查灯并把门关好。|ตรวจของก่อนออกบ้าน|dtruat khaawng gaawn aawk baan|出门前检查东西|หลังกลับบ้าน|lang glap baan|回家后|安排
lang-glap-baan|หลังกลับบ้าน|lang glap baan|回家后|短语|一天安排|หลังกลับบ้าน ฉันเปลี่ยนเสื้อผ้าและล้างมือก่อนกินข้าว|lang glap baan chan bpliian suea-phaa lae laang mue gaawn gin khaao|回家后，我换衣服并洗手再吃饭。|พักหลังกลับบ้าน|phak lang glap baan|回家后休息|ก่อนออกบ้าน|gaawn aawk baan|出门前|安排
dtruat-fai|ตรวจไฟ|dtruat fai|检查灯；检查电源|动词|家务整理|ก่อนนอนพ่อเดินตรวจไฟในห้องนั่งเล่น|gaawn naawn phaaw doen dtruat fai nai haawng nang len|睡前爸爸走去检查客厅的灯。|ตรวจไฟก่อนออกบ้าน|dtruat fai gaawn aawk baan|出门前检查灯|เปิดไฟ|bpoet fai|开灯|家务
bpit-bpra-dtuu|ปิดประตู|bpit bpra-dtuu|关门|动词|一天安排|ก่อนออกจากบ้าน อย่าลืมปิดประตูและล็อกกุญแจ|gaawn aawk jaak baan yaa luem bpit bpra-dtuu lae lok gun-jaae|出门前，别忘了关门并锁钥匙。|ปิดประตูบ้าน|bpit bpra-dtuu baan|关家门|เปิดประตู|bpoet bpra-dtuu|开门|安排
lok-gun-jaae|ล็อกกุญแจ|lok gun-jaae|锁门；上锁|动词|一天安排|แม่ล็อกกุญแจหน้าบ้านก่อนพาเด็กไปโรงเรียน|maae lok gun-jaae naa baan gaawn phaa dek bpai roong-riian|妈妈带孩子去学校前锁好家门。|ล็อกกุญแจให้เรียบร้อย|lok gun-jaae hai riiap-raawy|把门锁好|เปิดกุญแจ|bpoet gun-jaae|开锁|安排
laang-mue|ล้างมือ|laang mue|洗手|动词|洗漱穿衣|หลังกลับจากข้างนอก ทุกคนควรล้างมือก่อนกินข้าว|lang glap jaak khaang naawk thuk khon khuuan laang mue gaawn gin khaao|从外面回来后，大家应该饭前洗手。|ล้างมือให้สะอาด|laang mue hai sa-aat|把手洗干净|เช็ดมือ|chet mue|擦手|洗漱
chet-mue|เช็ดมือ|chet mue|擦手|动词|洗漱穿衣|หลังล้างมือแล้ว ฉันเช็ดมือด้วยผ้าสะอาด|lang laang mue laaeo chan chet mue duai phaa sa-aat|洗手后，我用干净的布擦手。|เช็ดมือให้แห้ง|chet mue hai haaeng|把手擦干|ล้างมือ|laang mue|洗手|洗漱
hai-aa-haan-sat-liang|ให้อาหารสัตว์เลี้ยง|hai aa-haan sat-liiang|喂宠物|动词|家务整理|ตอนเช้าน้องให้อาหารสัตว์เลี้ยงก่อนออกไปโรงเรียน|dtaawn chaao naawng hai aa-haan sat-liiang gaawn aawk bpai roong-riian|早上弟弟去学校前喂宠物。|ให้อาหารสัตว์เลี้ยงทุกวัน|hai aa-haan sat-liiang thuk wan|每天喂宠物|รดน้ำต้นไม้|rot naam dton-maai|浇花|家务
rot-naam-dton-maai|รดน้ำต้นไม้|rot naam dton-maai|浇花；浇植物|动词|家务整理|แม่รดน้ำต้นไม้หน้าบ้านตอนเช้าตรู่|maae rot naam dton-maai naa baan dtaawn chaao dtruu|妈妈清晨给屋前植物浇水。|รดน้ำต้นไม้ตอนเย็น|rot naam dton-maai dtaawn yen|傍晚浇花|ให้อาหารสัตว์เลี้ยง|hai aa-haan sat-liiang|喂宠物|家务
tham-khwaam-sa-aat-baan|ทำความสะอาดบ้าน|tham khwaam sa-aat baan|打扫房子|动词|家务整理|ทุกวันหยุดเราทำความสะอาดบ้านประมาณสองชั่วโมง|thuk wan-yut rao tham khwaam sa-aat baan bpra-maan saawng chua-moong|每个假日我们大约打扫房子两小时。|ทำความสะอาดบ้านทั้งหลัง|tham khwaam sa-aat baan thang lang|打扫整座房子|จัดห้อง|jat haawng|整理房间|家务
rian-ruu-wan-la-nit|เรียนรู้วันละนิด|riian ruu wan la nit|每天学一点|短语|习惯计划|ฉันเรียนรู้วันละนิด แต่ทำต่อเนื่องทุกสัปดาห์|chan riian ruu wan la nit dtaae tham dtaaw-neuuang thuk sap-daa|我每天学一点，但每周持续做。|เรียนรู้วันละนิดทุกวัน|riian ruu wan la nit thuk wan|每天学一点|เรียนครั้งเดียวมาก ๆ|riian khrang diao maak maak|一次学很多|习惯
tham-dtaaw-neuuang|ทำต่อเนื่อง|tham dtaaw-neuuang|持续做|动词|习惯计划|ถ้าทำต่อเนื่องสามเดือน สุขภาพจะดีขึ้น|thaa tham dtaaw-neuuang saam duean suk-kha-phaap ja dii kheun|如果连续做三个月，健康会变好。|ทำต่อเนื่องทุกเช้า|tham dtaaw-neuuang thuk chaao|每天早上持续做|หยุดกลางทาง|yut glaang thaang|中途停止|习惯
yut-glaang-thaang|หยุดกลางทาง|yut glaang thaang|中途停止|动词|习惯计划|เขาเริ่มออกกำลังกายแล้วไม่อยากหยุดกลางทาง|khao roem aawk-gam-lang-gaai laaeo mai yaak yut glaang thaang|他开始运动后不想中途停止。|อย่าหยุดกลางทาง|yaa yut glaang thaang|不要中途停止|ทำต่อเนื่อง|tham dtaaw-neuuang|持续做|习惯
dtang-jai-ja|ตั้งใจจะ|dtang-jai ja|打算要；有意要|短语|习惯计划|เดือนนี้ฉันตั้งใจจะนอนเร็วและตื่นเช้า|duean nii chan dtang-jai ja naawn reo lae dteun chaao|这个月我打算早睡早起。|ตั้งใจจะออกกำลังกาย|dtang-jai ja aawk-gam-lang-gaai|打算运动|ยังไม่คิดจะ|yang mai khit ja|还没想要|计划
gam-lang-ja|กำลังจะ|gam-lang ja|正要；即将|短语|一天安排|ฉันกำลังจะออกจากบ้าน คุณต้องการอะไรไหม|chan gam-lang ja aawk jaak baan khun dtawng-gaan a-rai mai|我正要出门，你需要什么吗？|กำลังจะไปทำงาน|gam-lang ja bpai tham ngaan|正要去上班|เพิ่งกลับมา|phoeng glap maa|刚回来|计划
phoeng-glap-maa|เพิ่งกลับมา|phoeng glap maa|刚回来|短语|一天安排|ฉันเพิ่งกลับมาจากตลาด จึงยังไม่อยากออกไปอีก|chan phoeng glap maa jaak dta-laat jeung yang mai yaak aawk bpai iik|我刚从市场回来，所以还不想再出去。|เพิ่งกลับมาถึงบ้าน|phoeng glap maa thueng baan|刚回到家|กำลังจะออกไป|gam-lang ja aawk bpai|正要出去|安排
yang-mai-tham|ยังไม่ทำ|yang mai tham|还没做|短语|一天安排|งานบ้านบางอย่างฉันยังไม่ทำ เพราะต้องไปเรียนก่อน|ngaan baan baang yaang chan yang mai tham phraw dtawng bpai riian gaawn|有些家务我还没做，因为要先去上课。|ยังไม่ทำวันนี้|yang mai tham wan-nii|今天还没做|ทำแล้ว|tham laaeo|做了|安排
tham-laaeo|ทำแล้ว|tham laaeo|做了；已经做|短语|一天安排|ฉันล้างจานทำแล้ว ตอนนี้กำลังพับผ้า|chan laang jaan tham laaeo dtaawn-nii gam-lang phap phaa|我已经洗碗了，现在正在叠衣服。|บอกว่าทำแล้ว|baawk waa tham laaeo|说已经做了|ยังไม่ทำ|yang mai tham|还没做|安排
tham-hai-set|ทำให้เสร็จ|tham hai set|把它做完|动词|习惯计划|ก่อนดูทีวี ฉันต้องทำการบ้านให้เสร็จก่อน|gaawn duu thii-wii chan dtawng tham gaan-baan hai set gaawn|看电视前，我必须先把作业做完。|ทำงานให้เสร็จ|tham ngaan hai set|把工作做完|ทำค้างไว้|tham khaang wai|做一半放着|计划
tham-khaang-wai|ทำค้างไว้|tham khaang wai|做一半放着|动词|习惯计划|อย่าทำค้างไว้หลายวัน เพราะจะลืมรายละเอียด|yaa tham khaang wai laai wan phraw ja luem raai-la-iiat|不要做一半放好几天，因为会忘记细节。|ทำงานค้างไว้|tham ngaan khaang wai|工作做一半放着|ทำให้เสร็จ|tham hai set|做完|计划
rian-ruu-nisai|เรียนรู้นิสัย|riian ruu ni-sai|了解习惯|动词|习惯计划|ฉันเรียนรู้นิสัยของตัวเองแล้วรู้ว่าตอนเช้าเรียนได้ดี|chan riian ruu ni-sai khaawng dtua-eeng laaeo ruu waa dtaawn chaao riian dai dii|我了解自己的习惯后，知道早上学习效果好。|เรียนรู้นิสัยตัวเอง|riian ruu ni-sai dtua-eeng|了解自己的习惯|เปลี่ยนนิสัย|bpliian ni-sai|改变习惯|习惯
bplian-ni-sai|เปลี่ยนนิสัย|bpliian ni-sai|改变习惯|动词|习惯计划|ปีนี้ฉันอยากเปลี่ยนนิสัยนอนดึกให้ดีขึ้น|bpii nii chan yaak bpliian ni-sai naawn duek hai dii kheun|今年我想改变晚睡的习惯，让它变好。|เปลี่ยนนิสัยทีละนิด|bpliian ni-sai thii la nit|一点点改变习惯|ทำเหมือนเดิม|tham muean doem|照旧做|习惯
tham-muean-doem|ทำเหมือนเดิม|tham muean doem|照旧做|动词|习惯计划|ถ้าทำเหมือนเดิมทุกวัน ผลลัพธ์ก็อาจเหมือนเดิม|thaa tham muean doem thuk wan phon-lap gaw aat muean doem|如果每天照旧做，结果也可能和以前一样。|ทำเหมือนเดิมตอนเช้า|tham muean doem dtaawn chaao|早上照旧做|เปลี่ยนนิสัย|bpliian ni-sai|改变习惯|习惯
tham-thii-la-yaang|ทำทีละอย่าง|tham thii la yaang|一次做一件事|短语|一天安排|เมื่องานเยอะ ฉันทำทีละอย่างตามรายการงาน|muea ngaan yoe chan tham thii la yaang dtaam raai-gaan ngaan|事情多时，我按任务清单一次做一件。|ทำทีละอย่างช้า ๆ|tham thii la yaang chaa chaa|慢慢一次做一件|ทำหลายอย่างพร้อมกัน|tham laai yaang phraawm gan|同时做很多事|计划
tham-laai-yaang-phraawm-gan|ทำหลายอย่างพร้อมกัน|tham laai yaang phraawm gan|同时做很多事|短语|一天安排|ฉันไม่ชอบทำหลายอย่างพร้อมกัน เพราะมักลืมของ|chan mai chaawp tham laai yaang phraawm gan phraw mak luem khaawng|我不喜欢同时做很多事，因为常忘东西。|ทำหลายอย่างพร้อมกันตอนเช้า|tham laai yaang phraawm gan dtaawn chaao|早上同时做很多事|ทำทีละอย่าง|tham thii la yaang|一次做一件|计划
hai-wee-laa-dtua-eeng|ให้เวลาตัวเอง|hai wee-laa dtua-eeng|给自己时间|短语|休息运动|วันหยุดฉันให้เวลาตัวเองพักและไม่เปิดงาน|wan-yut chan hai wee-laa dtua-eeng phak lae mai bpoet ngaan|假日我给自己时间休息，不打开工作。|ให้เวลาตัวเองมากขึ้น|hai wee-laa dtua-eeng maak kheun|给自己更多时间|เร่งตัวเอง|reng dtua-eeng|催自己|休息
reng-dtua-eeng|เร่งตัวเอง|reng dtua-eeng|催自己；逼自己快点|动词|一天安排|ตอนเช้าฉันไม่อยากเร่งตัวเองมากเกินไป|dtaawn chaao chan mai yaak reng dtua-eeng maak goen bpai|早上我不想太催自己。|เร่งตัวเองให้เสร็จ|reng dtua-eeng hai set|催自己做完|ให้เวลาตัวเอง|hai wee-laa dtua-eeng|给自己时间|计划
phraawm-laaeo|พร้อมแล้ว|phraawm laaeo|准备好了|短语|一天安排|เมื่อเตรียมของครบแล้ว ฉันบอกแม่ว่าพร้อมแล้ว|muea dtriiam khaawng khrop laaeo chan baawk maae waa phraawm laaeo|东西准备齐后，我告诉妈妈准备好了。|บอกว่าพร้อมแล้ว|baawk waa phraawm laaeo|说准备好了|ยังไม่พร้อม|yang mai phraawm|还没准备好|安排
yang-mai-phraawm|ยังไม่พร้อม|yang mai phraawm|还没准备好|短语|一天安排|ฉันยังไม่พร้อมออกจากบ้าน เพราะยังหากุญแจไม่เจอ|chan yang mai phraawm aawk jaak baan phraw yang haa gun-jaae mai joe|我还没准备好出门，因为还找不到钥匙。|บอกว่ายังไม่พร้อม|baawk waa yang mai phraawm|说还没准备好|พร้อมแล้ว|phraawm laaeo|准备好了|安排
than-wee-laa|ทันเวลา|than wee-laa|来得及；按时赶上|副词|通勤上学|ถ้าออกจากบ้านตอนนี้ เราจะถึงโรงเรียนทันเวลา|thaa aawk jaak baan dtaawn-nii rao ja thueng roong-riian than wee-laa|如果现在出门，我们会按时到学校。|ไปถึงทันเวลา|bpai thueng than wee-laa|按时到达|ไม่ทันเวลา|mai than wee-laa|来不及|通勤
mai-than-wee-laa|ไม่ทันเวลา|mai than wee-laa|来不及；没赶上时间|副词|通勤上学|รถติดมาก ฉันกลัวว่าจะไปทำงานไม่ทันเวลา|rot dtit maak chan glua waa ja bpai tham ngaan mai than wee-laa|堵车很严重，我怕上班来不及。|ถึงไม่ทันเวลา|thueng mai than wee-laa|没按时到|ทันเวลา|than wee-laa|来得及|通勤
rot-dtit|รถติด|rot dtit|堵车|形容词|通勤上学|เช้านี้รถติดมาก ทำให้หลายคนมาสาย|chaao nii rot dtit maak tham hai laai khon maa saai|今天早上很堵车，导致很多人迟到。|รถติดตอนเช้า|rot dtit dtaawn chaao|早上堵车|ถนนโล่ง|tha-non loong|路上通畅|通勤
tha-non-loong|ถนนโล่ง|tha-non loong|路上通畅|形容词|通勤上学|วันหยุดถนนโล่ง ฉันจึงไปตลาดเร็วมาก|wan-yut tha-non loong chan jeung bpai dta-laat reo maak|假日路上通畅，所以我很快到市场。|ถนนโล่งตอนเช้า|tha-non loong dtaawn chaao|早上路畅|รถติด|rot dtit|堵车|通勤
fon-dtok|ฝนตก|fon dtok|下雨|动词|一天安排|ถ้าฝนตกตอนเย็น ฉันจะออกกำลังกายในบ้าน|thaa fon dtok dtaawn yen chan ja aawk-gam-lang-gaai nai baan|如果傍晚下雨，我会在家运动。|ฝนตกหนัก|fon dtok nak|雨下得大|แดดออก|daaet aawk|出太阳|天气
daaet-aawk|แดดออก|daaet aawk|出太阳|动词|一天安排|วันนี้แดดออกดี แม่จึงตากผ้าหลายตัว|wan-nii daaet aawk dii maae jeung dtaak phaa laai dtua|今天太阳很好，妈妈所以晾了很多衣服。|แดดออกตอนเช้า|daaet aawk dtaawn chaao|早上出太阳|ฝนตก|fon dtok|下雨|天气
aa-gaat-dii|อากาศดี|aa-gaat dii|天气好|形容词|休息运动|ถ้าอากาศดี เราจะเดินเล่นหลังอาหารเย็น|thaa aa-gaat dii rao ja doen len lang aa-haan yen|如果天气好，我们晚饭后会散步。|อากาศดีตอนเย็น|aa-gaat dii dtaawn yen|傍晚天气好|อากาศแย่|aa-gaat yaae|天气差|天气
aa-gaat-yaae|อากาศแย่|aa-gaat yaae|天气差|形容词|一天安排|อากาศแย่วันนี้ทำให้เราเปลี่ยนแผนอยู่บ้าน|aa-gaat yaae wan-nii tham hai rao bpliian phaaen yuu baan|今天天气差，让我们改计划待在家。|อากาศแย่มาก|aa-gaat yaae maak|天气很差|อากาศดี|aa-gaat dii|天气好|天气
`;

export const VOCABULARY_EXPANSION_A2_DAILY_ROUTINES_01: VocabularyExpansionA2DailyRoutinesCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
