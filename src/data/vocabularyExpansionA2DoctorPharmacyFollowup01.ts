type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "复诊随访" | "药量用法" | "禁忌提醒" | "副作用" | "体检测量" | "诊断说明" | "照顾病人" | "健康建议";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2DoctorPharmacyFollowupCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-health-pharmacy-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2DoctorPharmacyFollowupCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于看医生后续、药房取药、复诊或照顾病人的基础沟通。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，就医场景中要分清症状、用药、检查和照顾动作。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["说药量和复诊时要尽量加时间、次数和程度，例如 วันละสองครั้ง、หลังอาหาร、อีกหนึ่งสัปดาห์。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
nat-phop-maaw-iik|นัดพบหมออีก|nat phop maaw iik|再次预约看医生|动词|复诊随访|หมอนัดพบหมออีกวันศุกร์หน้าเพื่อตรวจอาการ|maaw nat phop maaw iik wan-suk naa phuea dtruat aa-gaan|医生约下周五再次看诊，以检查症状。|复诊
glap-maa-dtruat|กลับมาตรวจ|glap maa dtruat|回来检查|动词|复诊随访|ถ้าอาการยังไม่ดีขึ้น ให้กลับมาตรวจภายในสามวัน|thaa aa-gaan yang mai dii kheun hai glap maa dtruat phaai-nai saam wan|如果症状还没好转，请三天内回来检查。|复诊
bpai-dtaam-nat|ไปตามนัด|bpai dtaam nat|按预约去|动词|复诊随访|พรุ่งนี้ฉันต้องไปตามนัดที่คลินิกตอนเช้า|phrung-nii chan dtawng bpai dtaam nat thii khli-nik dtaawn chaao|明天早上我必须按预约去诊所。|复诊
phit-nat-maaw|ผิดนัดหมอ|phit nat maaw|错过医生预约|动词|复诊随访|อย่าผิดนัดหมอ ถ้าไปไม่ได้ควรโทรเลื่อนนัด|yaa phit nat maaw thaa bpai mai dai khuuan thoo leuuan nat|不要错过医生预约，如果去不了应该打电话改约。|复诊
leuuan-nat-maaw|เลื่อนนัดหมอ|leuuan nat maaw|改医生预约|动词|复诊随访|ฉันขอเลื่อนนัดหมอจากวันจันทร์เป็นวันพุธ|chan khaaw leuuan nat maaw jaak wan-jan bpen wan-phut|我想把医生预约从周一改到周三。|复诊
yok-loek-nat-maaw|ยกเลิกนัดหมอ|yok-loek nat maaw|取消医生预约|动词|复诊随访|ถ้าหายดีแล้ว คุณสามารถยกเลิกนัดหมอได้|thaa haai dii laaeo khun saa-maat yok-loek nat maaw dai|如果完全好了，你可以取消医生预约。|复诊
duu-aa-gaan|ดูอาการ|duu aa-gaan|观察症状|动词|复诊随访|หมอบอกให้ดูอาการที่บ้านอีกสองวัน|maaw baawk hai duu aa-gaan thii baan iik saawng wan|医生说在家再观察症状两天。|复诊
dtit-dtaam-aa-gaan|ติดตามอาการ|dtit-dtaam aa-gaan|跟进症状|动词|复诊随访|พยาบาลโทรมาติดตามอาการหลังฉันกินยาแล้ว|pha-yaa-baan thoo maa dtit-dtaam aa-gaan lang chan gin yaa laaeo|护士在我吃药后打电话跟进症状。|复诊
aa-gaan-dii-kheun|อาการดีขึ้น|aa-gaan dii kheun|症状好转|短语|复诊随访|หลังพักผ่อนสองวัน อาการดีขึ้นมาก|lang phak-phaawn saawng wan aa-gaan dii kheun maak|休息两天后，症状好多了。|复诊
aa-gaan-mai-dii-kheun|อาการไม่ดีขึ้น|aa-gaan mai dii kheun|症状没好转|短语|复诊随访|ถ้าอาการไม่ดีขึ้นหลังยาหมด ต้องกลับมาพบหมอ|thaa aa-gaan mai dii kheun lang yaa mot dtawng glap maa phop maaw|如果药吃完后症状没好转，必须回来见医生。|复诊
aa-gaan-khaeng-raeng|อาการแข็งแรงขึ้น|aa-gaan khaeng-raaeng kheun|身体变强些|短语|复诊随访|คุณตาอาการแข็งแรงขึ้นและเดินเองได้แล้ว|khun dtaa aa-gaan khaeng-raaeng kheun lae doen eeng dai laaeo|外公身体强些了，已经能自己走路了。|康复
aa-gaan-naa-huang|อาการน่าห่วง|aa-gaan naa huang|症状令人担心|短语|复诊随访|ถ้าเด็กหายใจเร็วมาก อาการน่าห่วงควรพบแพทย์|thaa dek haai-jai reo maak aa-gaan naa huang khuuan phop phaaet|如果孩子呼吸很快，症状令人担心，应该就医。|复诊
gin-yaa-dtaam-welaa|กินยาตามเวลา|gin yaa dtaam wee-laa|按时吃药|动词|药量用法|คนไข้ต้องกินยาตามเวลาแม้อาการจะดีขึ้น|khon-khai dtawng gin yaa dtaam wee-laa maae aa-gaan ja dii kheun|即使症状好转，病人也要按时吃药。|用药
gin-yaa-hai-khrop|กินยาให้ครบ|gin yaa hai khrop|把药吃完|动词|药量用法|หมอบอกให้กินยาให้ครบห้าวัน|maaw baawk hai gin yaa hai khrop haa wan|医生说要把五天的药吃完。|用药
yaa-khaat-yaa|อย่าขาดยา|yaa khaat yaa|不要漏药|短语|药量用法|ยาความดันต้องกินทุกวัน อย่าขาดยา|yaa khwaam-dan dtawng gin thuk wan yaa khaat yaa|血压药要每天吃，不要漏药。|用药
luem-gin-yaa|ลืมกินยา|luem gin yaa|忘吃药|动词|药量用法|ถ้าลืมกินยา อย่ากินเพิ่มเองสองเม็ด|thaa luem gin yaa yaa gin phoem eeng saawng met|如果忘吃药，不要自己多吃两片。|用药
gin-yaa-phoem|กินยาเพิ่ม|gin yaa phoem|加量吃药|动词|药量用法|อย่ากินยาเพิ่มถ้าหมอยังไม่ได้บอก|yaa gin yaa phoem thaa maaw yang mai dai baawk|如果医生还没说，不要加量吃药。|用药
lot-kha-naat-yaa|ลดขนาดยา|lot kha-naat yaa|减少药量|动词|药量用法|หมอลดขนาดยาเพราะฉันมีอาการง่วงมาก|maaw lot kha-naat yaa phraw chan mii aa-gaan nguang maak|医生减少药量，因为我很困。|用药
kha-naat-yaa|ขนาดยา|kha-naat yaa|药量；剂量|名词|药量用法|ขนาดยาสำหรับเด็กต้องดูตามน้ำหนัก|kha-naat yaa sam-rap dek dtawng duu dtaam naam-nak|儿童药量要根据体重看。|用药
wan-la-neung-khrang|วันละครั้ง|wan la neung khrang|每天一次|短语|药量用法|ยานี้กินวันละครั้งก่อนนอน|yaa nii gin wan la neung khrang gaawn naawn|这个药每天睡前吃一次。|用药
wan-la-saawng-khrang|วันละสองครั้ง|wan la saawng khrang|每天两次|短语|药量用法|ยาน้ำนี้กินวันละสองครั้งหลังอาหาร|yaa naam nii gin wan la saawng khrang lang aa-haan|这个药水饭后每天喝两次。|用药
khrang-la-neung-met|ครั้งละหนึ่งเม็ด|khrang la neung met|每次一片|短语|药量用法|ยาแก้ปวดกินครั้งละหนึ่งเม็ดเมื่อปวดมาก|yaa gaae bpuat gin khrang la neung met muea bpuat maak|止痛药在很痛时每次吃一片。|用药
khrang-la-khrueng-met|ครั้งละครึ่งเม็ด|khrang la khrueng met|每次半片|短语|药量用法|หมอให้เด็กกินยาครั้งละครึ่งเม็ด|maaw hai dek gin yaa khrang la khrueng met|医生让孩子每次吃半片药。|用药
gin-gaawn-aa-haan|กินก่อนอาหาร|gin gaawn aa-haan|饭前吃|动词|药量用法|ยานี้ต้องกินก่อนอาหารประมาณสามสิบนาที|yaa nii dtawng gin gaawn aa-haan bpra-maan saam-sip naa-thii|这个药要饭前大约三十分钟吃。|用药
gin-lang-aa-haan|กินหลังอาหาร|gin lang aa-haan|饭后吃|动词|药量用法|ยาปวดท้องนี้ควรกินหลังอาหารทันที|yaa bpuat thaawng nii khuuan gin lang aa-haan than-thii|这个胃痛药应该饭后马上吃。|用药
gin-gaawn-naawn|กินก่อนนอน|gin gaawn naawn|睡前吃|动词|药量用法|ยาแก้แพ้ทำให้ง่วง จึงควรกินก่อนนอน|yaa gaae phaae tham hai nguang jeung khuuan gin gaawn naawn|抗过敏药会让人困，所以应该睡前吃。|用药
gin-phraawm-naam|กินพร้อมน้ำ|gin phraawm naam|配水服用|动词|药量用法|ยาเม็ดนี้ต้องกินพร้อมน้ำหนึ่งแก้ว|yaa met nii dtawng gin phraawm naam neung gaaeo|这片药要配一杯水服用。|用药
yaa-bot|ยาบด|yaa bot|磨碎的药|名词|药量用法|เด็กกลืนยาเม็ดไม่ได้ แม่จึงขอยาบด|dek gleuun yaa met mai dai maae jeung khaaw yaa bot|孩子吞不了药片，妈妈所以要磨碎的药。|用药
yaa-nam|ยาน้ำ|yaa naam|药水|名词|药量用法|ยาน้ำขวดนี้ต้องเขย่าก่อนกินทุกครั้ง|yaa naam khuat nii dtawng kha-yao gaawn gin thuk khrang|这瓶药水每次喝前都要摇一摇。|用药
khayaao-yaa|เขย่ายา|kha-yao yaa|摇药|动词|药量用法|กรุณาเขย่ายาก่อนให้เด็กกิน|ga-ru-naa kha-yao yaa gaawn hai dek gin|给孩子喝药前请先摇药。|用药
yaa-thaa-bang-bang|ยาทาบาง ๆ|yaa thaa baang baang|薄薄涂药|短语|药量用法|หมอให้ทายาทาบาง ๆ ที่ผื่นวันละสองครั้ง|maaw hai thaa yaa thaa baang baang thii pheun wan la saawng khrang|医生让在皮疹处薄薄涂药，每天两次。|用药
ngot-aa-haan-phet|งดอาหารเผ็ด|ngot aa-haan phet|忌辣食|动词|禁忌提醒|ช่วงกินยาแก้ท้อง ควรงดอาหารเผ็ดก่อน|chuang gin yaa gaae thaawng khuuan ngot aa-haan phet gaawn|吃胃药期间应该先忌辣食。|禁忌
ngot-alcohol|งดแอลกอฮอล์|ngot aen-gaw-haw|忌酒；禁酒|动词|禁忌提醒|ยานี้ห้ามกินกับเหล้า ต้องงดแอลกอฮอล์|yaa nii haam gin gap lao dtawng ngot aen-gaw-haw|这个药禁止和酒一起吃，必须禁酒。|禁忌
ngot-gaa-faae|งดกาแฟ|ngot gaa-faae|暂停咖啡|动词|禁忌提醒|ถ้านอนไม่หลับ หมอแนะนำให้งดกาแฟตอนเย็น|thaa naawn mai lap maaw nae-nam hai ngot gaa-faae dtaawn yen|如果睡不着，医生建议傍晚暂停咖啡。|禁忌
ngot-aawk-gam-lang-nak|งดออกกำลังกายหนัก|ngot aawk-gam-lang-gaai nak|暂停剧烈运动|动词|禁忌提醒|หลังเจ็บข้อเท้า ควรงดออกกำลังกายหนักหนึ่งสัปดาห์|lang jep khaaw-thaao khuuan ngot aawk-gam-lang-gaai nak neung sap-daa|脚踝痛后，应该暂停剧烈运动一周。|禁忌
haam-khap-rot|ห้ามขับรถ|haam khap rot|禁止开车|短语|禁忌提醒|ยานี้ทำให้ง่วง หลังกินยาห้ามขับรถ|yaa nii tham hai nguang lang gin yaa haam khap rot|这个药会让人困，吃药后禁止开车。|禁忌
haam-gin-ruam-kan|ห้ามกินร่วมกัน|haam gin ruam gan|禁止一起服用|短语|禁忌提醒|ยาสองตัวนี้ห้ามกินร่วมกัน ต้องถามหมอก่อน|yaa saawng dtua nii haam gin ruam gan dtawng thaam maaw gaawn|这两种药禁止一起服用，要先问医生。|禁忌
tham-hai-nguang|ทำให้ง่วง|tham hai nguang|使人犯困|短语|副作用|ยาแก้แพ้บางชนิดทำให้ง่วงมาก|yaa gaae phaae baang cha-nit tham hai nguang maak|有些抗过敏药很让人犯困。|副作用
nguang-lang-gin-yaa|ง่วงหลังกินยา|nguang lang gin yaa|吃药后困|短语|副作用|ฉันง่วงหลังกินยา จึงนอนพักครึ่งชั่วโมง|chan nguang lang gin yaa jeung naawn phak khrueng chua-moong|我吃药后困，所以躺着休息半小时。|副作用
wiian-hua-lang-yaa|เวียนหัวหลังยา|wiian hua lang yaa|吃药后头晕|短语|副作用|ถ้าเวียนหัวหลังยา ควรนั่งพักและโทรถามคลินิก|thaa wiian hua lang yaa khuuan nang phak lae thoo thaam khli-nik|如果吃药后头晕，应该坐下休息并打电话问诊所。|副作用
khlueun-sai-lang-yaa|คลื่นไส้หลังยา|khleuun sai lang yaa|吃药后恶心|短语|副作用|ฉันคลื่นไส้หลังยา จึงกินอาหารอ่อน ๆ|chan khleuun sai lang yaa jeung gin aa-haan aawn aawn|我吃药后恶心，所以吃清淡软食。|副作用
phaak-haaeng|ปากแห้ง|bpaak haaeng|口干|形容词|副作用|ยานี้อาจทำให้ปากแห้ง ต้องดื่มน้ำมากขึ้น|yaa nii aat tham hai bpaak haaeng dtawng duem naam maak kheun|这个药可能让人口干，要多喝水。|副作用
phuen-kheun|ผื่นขึ้น|pheun kheun|起皮疹|动词|副作用|ถ้าผื่นขึ้นหลังยา ให้หยุดยาและพบแพทย์|thaa pheun kheun lang yaa hai yut yaa lae phop phaaet|如果吃药后起皮疹，请停药并就医。|副作用
aa-gaan-phaae|อาการแพ้|aa-gaan phaae|过敏反应|名词|副作用|อาการแพ้อาจมีผื่น คัน หรือหายใจไม่สะดวก|aa-gaan phaae aat mii pheun khan rue haai-jai mai sa-duak|过敏反应可能有皮疹、发痒或呼吸不顺。|副作用
phaae-yaa|แพ้ยา|phaae yaa|药物过敏|动词|副作用|ถ้าเคยแพ้ยา ต้องบอกเภสัชกรก่อนรับยา|thaa khoei phaae yaa dtawng baawk phe-sat-cha-gaawn gaawn rap yaa|如果曾经药物过敏，领药前要告诉药剂师。|副作用
yut-yaa|หยุดยา|yut yaa|停药|动词|副作用|หมอบอกให้หยุดยาตัวนี้ถ้ามีผื่นขึ้น|maaw baawk hai yut yaa dtua nii thaa mii pheun kheun|医生说如果起皮疹就停这个药。|副作用
yaa-yut-yaa-eeng|อย่าหยุดยาเอง|yaa yut yaa eeng|不要自行停药|短语|药量用法|อย่าหยุดยาเองถ้ายังไม่ได้ถามหมอ|yaa yut yaa eeng thaa yang mai dai thaam maaw|如果还没问医生，不要自行停药。|用药
dtruat-suk-kha-phaap|ตรวจสุขภาพ|dtruat suk-kha-phaap|体检|动词|体检测量|บริษัทให้พนักงานตรวจสุขภาพปีละครั้ง|baaw-ri-sat hai pha-nak-ngaan dtruat suk-kha-phaap bpii la khrang|公司让员工每年体检一次。|体检
dtruat-bpra-jam-pii|ตรวจประจำปี|dtruat bpra-jam bpii|年度检查|动词|体检测量|คุณพ่อไปตรวจประจำปีที่โรงพยาบาลใกล้บ้าน|khun phaaw bpai dtruat bpra-jam bpii thii roong-pha-yaa-baan glai baan|爸爸去家附近医院做年度检查。|体检
phon-dtruat|ผลตรวจ|phon dtruat|检查结果|名词|体检测量|หมอบอกว่าผลตรวจวันนี้ปกติดี|maaw baawk waa phon dtruat wan-nii bpa-ga-dti dii|医生说今天的检查结果正常。|体检
phon-dtruat-bpa-ga-dti|ผลตรวจปกติ|phon dtruat bpa-ga-dti|检查结果正常|短语|体检测量|ผลตรวจปกติ แต่หมอแนะนำให้นอนให้พอ|phon dtruat bpa-ga-dti dtaae maaw nae-nam hai naawn hai phaaw|检查结果正常，但医生建议睡够。|体检
phon-dtruat-mai-bpa-ga-dti|ผลตรวจไม่ปกติ|phon dtruat mai bpa-ga-dti|检查结果异常|短语|体检测量|ถ้าผลตรวจไม่ปกติ หมอจะนัดตรวจเพิ่ม|thaa phon dtruat mai bpa-ga-dti maaw ja nat dtruat phoem|如果检查结果异常，医生会约进一步检查。|体检
wat-khai|วัดไข้|wat khai|量体温|动词|体检测量|พยาบาลวัดไข้ก่อนให้เข้าห้องตรวจ|pha-yaa-baan wat khai gaawn hai khao haawng dtruat|护士让进诊室前量体温。|测量
wat-khwaam-dan|วัดความดัน|wat khwaam-dan|量血压|动词|体检测量|คุณยายวัดความดันทุกเช้าตามที่หมอบอก|khun yaai wat khwaam-dan thuk chaao dtaam thii maaw baawk|奶奶按医生说的每天早上量血压。|测量
chang-naam-nak|ชั่งน้ำหนัก|chang naam-nak|称体重|动词|体检测量|ก่อนพบหมอ เด็กต้องชั่งน้ำหนักก่อน|gaawn phop maaw dek dtawng chang naam-nak gaawn|见医生前，孩子要先称体重。|测量
wat-suan-suung|วัดส่วนสูง|wat suan-suung|量身高|动词|体检测量|โรงเรียนวัดส่วนสูงนักเรียนทุกเทอม|roong-riian wat suan-suung nak-riian thuk theerm|学校每学期给学生量身高。|测量
dtam-gwaa-geen|ต่ำกว่าเกณฑ์|dtam gwaa geen|低于标准|短语|体检测量|น้ำหนักเด็กต่ำกว่าเกณฑ์ หมอแนะนำให้กินอาหารครบ|naam-nak dek dtam gwaa geen maaw nae-nam hai gin aa-haan khrop|孩子体重低于标准，医生建议饮食均衡。|体检
suung-gwaa-geen|สูงกว่าเกณฑ์|suung gwaa geen|高于标准|短语|体检测量|ความดันสูงกว่าเกณฑ์เล็กน้อย ต้องลดเค็ม|khwaam-dan suung gwaa geen lek naawy dtawng lot khem|血压略高于标准，需要少吃咸。|体检
kham-winitchai|คำวินิจฉัย|kham wi-nit-chai|诊断说明|名词|诊断说明|หมอเขียนคำวินิจฉัยสั้น ๆ ในใบรับรองแพทย์|maaw khiian kham wi-nit-chai san san nai bai rap-raawng phaaet|医生在医生证明里写了简短诊断说明。|诊断
maaw-baawk-waa|หมอบอกว่า|maaw baawk waa|医生说|短语|诊断说明|หมอบอกว่าเป็นหวัดธรรมดาและควรพักผ่อน|maaw baawk waa bpen wat tham-ma-daa lae khuuan phak-phaawn|医生说是普通感冒，应该休息。|诊断
bpen-wat-thammadaa|เป็นหวัดธรรมดา|bpen wat tham-ma-daa|普通感冒|短语|诊断说明|ถ้าเป็นหวัดธรรมดา ดื่มน้ำอุ่นและพักให้พอ|thaa bpen wat tham-ma-daa duem naam un lae phak hai phaaw|如果是普通感冒，喝温水并休息够。|诊断
tid-chuea-lek-noi|ติดเชื้อเล็กน้อย|dtit chuea lek naawy|轻微感染|短语|诊断说明|หมอบอกว่าคออาจติดเชื้อเล็กน้อย|maaw baawk waa khaaw aat dtit chuea lek naawy|医生说喉咙可能有轻微感染。|诊断
aa-gaan-mai-rang-raeng|อาการไม่รุนแรง|aa-gaan mai run-raaeng|症状不严重|短语|诊断说明|อาการไม่รุนแรง แต่ต้องกินยาให้ครบ|aa-gaan mai run-raaeng dtaae dtawng gin yaa hai khrop|症状不严重，但要把药吃完。|诊断
aa-gaan-rang-raeng|อาการรุนแรง|aa-gaan run-raaeng|症状严重|短语|诊断说明|ถ้าอาการรุนแรงขึ้น ต้องไปโรงพยาบาลทันที|thaa aa-gaan run-raaeng kheun dtawng bpai roong-pha-yaa-baan than-thii|如果症状变严重，必须马上去医院。|诊断
bai-rap-rawng-phaaet|ใบรับรองแพทย์|bai rap-raawng phaaet|医生证明|名词|诊断说明|ฉันขอใบรับรองแพทย์เพื่อส่งให้ที่ทำงาน|chan khaaw bai rap-raawng phaaet phuea song hai thii tham ngaan|我申请医生证明交给工作单位。|证明
khaaw-bai-rap-rawng|ขอใบรับรอง|khaaw bai rap-raawng|申请证明|动词|诊断说明|หลังตรวจเสร็จ ฉันขอใบรับรองกับพยาบาล|lang dtruat set chan khaaw bai rap-raawng gap pha-yaa-baan|检查结束后，我向护士申请证明。|证明
du-lae-khon-bpuai|ดูแลคนป่วย|duu-laae khon bpuai|照顾病人|动词|照顾病人|คืนนี้ฉันต้องดูแลคนป่วยและวัดไข้ทุกสี่ชั่วโมง|khuen-nii chan dtawng duu-laae khon bpuai lae wat khai thuk sii chua-moong|今晚我要照顾病人，每四小时量体温。|照顾
hai-khon-bpuai-phak|ให้คนป่วยพัก|hai khon bpuai phak|让病人休息|动词|照顾病人|อย่าเปิดทีวีดัง ให้คนป่วยพักก่อน|yaa bpoet thii-wii dang hai khon bpuai phak gaawn|不要把电视开很大声，先让病人休息。|照顾
bpawn-yaa|ป้อนยา|bpaawn yaa|喂药|动词|照顾病人|แม่ป้อนยาให้น้องหลังอาหารเช้า|maae bpaawn yaa hai naawng lang aa-haan chaao|妈妈在早饭后给弟弟喂药。|照顾
bpawn-khaao|ป้อนข้าว|bpaawn khaao|喂饭|动词|照顾病人|คนป่วยไม่มีแรง แม่จึงป้อนข้าวต้มให้|khon bpuai mai mii raaeng maae jeung bpaawn khaao dtom hai|病人没力气，妈妈所以喂粥给他。|照顾
hai-naam-un|ให้น้ำอุ่น|hai naam un|给温水|动词|照顾病人|เวลาเจ็บคอ ควรให้น้ำอุ่นบ่อย ๆ|wee-laa jep khaaw khuuan hai naam un baawy baawy|喉咙痛时，应该经常给温水。|照顾
chet-dtua-lot-khai|เช็ดตัวลดไข้|chet dtua lot khai|擦身退烧|动词|照顾病人|แม่ใช้ผ้าชุบน้ำอุ่นเช็ดตัวลดไข้ให้ลูก|maae chai phaa chup naam un chet dtua lot khai hai luuk|妈妈用温水湿布给孩子擦身退烧。|照顾
phaa-chup-naam-un|ผ้าชุบน้ำอุ่น|phaa chup naam un|温水湿布|名词|照顾病人|ผ้าชุบน้ำอุ่นช่วยให้เด็กสบายตัวขึ้น|phaa chup naam un chuai hai dek sa-baai dtua kheun|温水湿布帮助孩子身体舒服些。|照顾
plian-phaa-bpuu|เปลี่ยนผ้าปู|bpliian phaa bpuu|换床单|动词|照顾病人|ถ้าคนป่วยเหงื่อออกมาก ต้องเปลี่ยนผ้าปูเตียง|thaa khon bpuai ngeuua aawk maak dtawng bpliian phaa bpuu dtiiang|如果病人大量出汗，要换床单。|照顾
song-aa-haan-aawn|ส่งอาหารอ่อน|song aa-haan aawn|送清淡软食|动词|照顾病人|เพื่อนบ้านส่งอาหารอ่อนมาให้คุณยายที่ป่วย|phuean baan song aa-haan aawn maa hai khun yaai thii bpuai|邻居给生病的奶奶送清淡软食。|照顾
yaak-gin-khaao|อยากกินข้าว|yaak gin khaao|想吃饭|短语|照顾病人|วันนี้คนป่วยเริ่มอยากกินข้าว แสดงว่าอาการดีขึ้น|wan-nii khon bpuai roem yaak gin khaao sa-daaeng waa aa-gaan dii kheun|今天病人开始想吃饭，说明症状好转了。|照顾
mai-yaak-gin|ไม่อยากกิน|mai yaak gin|不想吃|短语|照顾病人|ถ้าเด็กไม่อยากกิน อย่าบังคับมากเกินไป|thaa dek mai yaak gin yaa bang-khap maak goen bpai|如果孩子不想吃，不要太强迫。|照顾
phak-hai-phaaw|พักให้พอ|phak hai phaaw|休息够|动词|健康建议|หมอแนะนำให้พักให้พอและดื่มน้ำมากขึ้น|maaw nae-nam hai phak hai phaaw lae duem naam maak kheun|医生建议休息够，并多喝水。|建议
naawn-reo-kheun|นอนเร็วขึ้น|naawn reo kheun|更早睡|动词|健康建议|ถ้าอยากหายเร็ว ควรนอนเร็วขึ้นสักพัก|thaa yaak haai reo khuuan naawn reo kheun sak phak|如果想快点好，应该暂时更早睡。|建议
duem-naam-maak-kheun|ดื่มน้ำมากขึ้น|duem naam maak kheun|多喝水|动词|健康建议|ช่วงมีไข้ควรดื่มน้ำมากขึ้นและพักในห้องเย็น|chuang mii khai khuuan duem naam maak kheun lae phak nai haawng yen|发烧期间应该多喝水，并在凉爽房间休息。|建议
gin-aa-haan-khrop|กินอาหารครบ|gin aa-haan khrop|饮食均衡；吃全营养|动词|健康建议|เด็กควรกินอาหารครบเพื่อให้ร่างกายแข็งแรง|dek khuuan gin aa-haan khrop phuea hai raang-gaai khaeng-raaeng|孩子应该饮食均衡，让身体强壮。|建议
lot-khem|ลดเค็ม|lot khem|少吃咸|动词|健康建议|ถ้าความดันสูง หมอมักแนะนำให้ลดเค็ม|thaa khwaam-dan suung maaw mak nae-nam hai lot khem|如果血压高，医生常建议少吃咸。|建议
lot-waan|ลดหวาน|lot waan|少吃甜|动词|健康建议|ฉันพยายามลดหวานเพราะน้ำหนักขึ้นเร็ว|chan pha-yaa-yaam lot waan phraw naam-nak kheun reo|我努力少吃甜，因为体重涨得快。|建议
aawk-gam-lang-baao-baao|ออกกำลังเบา ๆ|aawk-gam-lang bao bao|轻度运动|动词|健康建议|หลังหายป่วย ค่อยเริ่มออกกำลังเบา ๆ|lang haai bpuai khaawy roem aawk-gam-lang bao bao|病好后，再慢慢开始轻度运动。|建议
doen-len-thuk-wan|เดินเล่นทุกวัน|doen len thuk wan|每天散步|动词|健康建议|หมอแนะนำให้คุณตาเดินเล่นทุกวันหลังอาหารเย็น|maaw nae-nam hai khun dtaa doen len thuk wan lang aa-haan yen|医生建议外公每天晚饭后散步。|建议
lot-naa-nak|ลดน้ำหนัก|lot naam-nak|减重|动词|健康建议|หมอไม่ได้ให้ลดน้ำหนักเร็วเกินไป|maaw mai dai hai lot naam-nak reo goen bpai|医生没有让过快减重。|建议
phoehm-naam-nak|เพิ่มน้ำหนัก|phoem naam-nak|增重|动词|健康建议|เด็กน้ำหนักน้อย หมอให้เพิ่มน้ำหนักอย่างช้า ๆ|dek naam-nak naawy maaw hai phoem naam-nak yaang chaa chaa|孩子体重少，医生让慢慢增重。|建议
jaai-khaa-yaa|จ่ายค่ายา|jaai khaa yaa|付药费|动词|复诊随访|หลังพบหมอแล้ว ฉันไปจ่ายค่ายาที่เคาน์เตอร์|lang phop maaw laaeo chan bpai jaai khaa yaa thii khao-dtooe|看完医生后，我去柜台付药费。|费用
rap-yaa-thii-chaawng|รับยาที่ช่อง|rap yaa thii chaawng|在窗口领药|动词|复诊随访|กรุณารับยาที่ช่องสามหลังจ่ายเงิน|ga-ru-naa rap yaa thii chaawng saam lang jaai ngoen|付款后请在三号窗口领药。|取药
thaam-phe-sat|ถามเภสัชกร|thaam phe-sat|问药剂师|动词|复诊随访|ถ้าไม่เข้าใจวิธีกินยา ให้ถามเภสัชกร|thaa mai khao-jai wi-thii gin yaa hai thaam phe-sat|如果不懂吃药方法，请问药剂师。|药房
phe-sat-cha-gawn|เภสัชกร|phe-sat-cha-gaawn|药剂师|名词|复诊随访|เภสัชกรอธิบายวิธีกินยาอย่างช้า ๆ|phe-sat-cha-gaawn a-thi-baai wi-thii gin yaa yaang chaa chaa|药剂师慢慢解释吃药方法。|药房
khaaw-kham-nae-nam-maaw|ขอคำแนะนำหมอ|khaaw kham-nae-nam maaw|向医生请教建议|动词|健康建议|ฉันขอคำแนะนำหมอก่อนเริ่มออกกำลังกายอีกครั้ง|chan khaaw kham-nae-nam maaw gaawn roem aawk-gam-lang-gaai iik khrang|我重新开始运动前，先向医生请教建议。|建议
jaeng-aa-gaan-glap|แจ้งอาการกลับ|jaeng aa-gaan glap|回报症状|动词|复诊随访|ถ้ามีไข้สูงอีก ให้แจ้งอาการกลับมาที่คลินิก|thaa mii khai suung iik hai jaeng aa-gaan glap maa thii khli-nik|如果又高烧，请向诊所回报症状。|复诊
jaawng-nat-dtruat|จองนัดตรวจ|jaawng nat dtruat|预约检查|动词|复诊随访|ฉันจองนัดตรวจเลือดตอนเช้าวันจันทร์|chan jaawng nat dtruat leuat dtaawn chaao wan-jan|我预约了星期一早上验血。|预约
plian-wee-laa-nat|เปลี่ยนเวลานัด|bplian wee-laa nat|更改预约时间|动词|复诊随访|ถ้าไปไม่ทัน กรุณาโทรเปลี่ยนเวลานัดล่วงหน้า|thaa bpai mai than ga-ru-naa thoo bplian wee-laa nat luang-naa|如果来不及去，请提前打电话更改预约时间。|预约
yaa-sam-rap-dek|ยาสำหรับเด็ก|yaa sam-rap dek|儿童用药|名词|药量用法|ยาสำหรับเด็กต้องดูน้ำหนักก่อนให้กิน|yaa sam-rap dek dtawng duu naam-nak gaawn hai gin|儿童用药要先看体重再给吃。|用药
yaa-sam-rap-phuu-yai|ยาสำหรับผู้ใหญ่|yaa sam-rap phuu-yai|成人用药|名词|药量用法|ยาสำหรับผู้ใหญ่ไม่ควรให้เด็กกินเอง|yaa sam-rap phuu-yai mai khuan hai dek gin eeng|成人用药不应该让孩子自行服用。|用药
phok-yaa-dtit-dtua|พกยาติดตัว|phok yaa dtit dtua|随身带药|动词|药量用法|คนที่เป็นภูมิแพ้ควรพกยาติดตัวเวลาเดินทาง|khon thii bpen phuum-phaae khuan phok yaa dtit dtua wee-laa doen-thaang|有过敏的人旅行时应该随身带药。|用药
gin-yaa-phit-wee-laa|กินยาผิดเวลา|gin yaa phit wee-laa|吃药时间弄错|动词|药量用法|ถ้ากินยาผิดเวลา ให้ถามเภสัชกรว่าต้องทำอย่างไร|thaa gin yaa phit wee-laa hai thaam phe-sat-cha-gaawn waa dtawng tham yaang-rai|如果吃药时间弄错，请问药剂师该怎么做。|用药
ao-bai-sang-yaa|เอาใบสั่งยา|ao bai sang yaa|拿处方单|动词|复诊随访|ก่อนไปร้านยา อย่าลืมเอาใบสั่งยาไปด้วย|gaawn bpai raan yaa yaa leum ao bai sang yaa bpai duai|去药店前，别忘了带处方单。|药房
`;

export const VOCABULARY_EXPANSION_A2_DOCTOR_PHARMACY_FOLLOWUP_01: VocabularyExpansionA2DoctorPharmacyFollowupCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
