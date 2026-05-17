type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "紧急求助" | "受伤症状" | "生病不适" | "迷路走失" | "丢失被偷" | "报警联系" | "危险警告" | "应急处理";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2BasicEmergenciesCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-basic-emergency-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2BasicEmergenciesCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 是 A2 基础应急表达，可用于求助、说明情况或提醒危险。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，紧急场景要按求助、伤病、丢失或危险提醒区分。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["真正紧急时优先说地点、发生了什么、需要谁帮助，例如 อยู่ที่...、มีคน...、ช่วยเรียก...。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
chuai-duai|ช่วยด้วย|chuai duai|救命；请帮忙|短语|紧急求助|ช่วยด้วยค่ะ มีคนล้มอยู่หน้าร้าน|chuai duai kha mii khon lom yuu naa raan|请帮忙，有人在店门前摔倒了。|求助
khaaw-khwaam-chuai-luea|ขอความช่วยเหลือ|khaaw khwaam chuai-luea|请求帮助|动词|紧急求助|ฉันขอความช่วยเหลือเพราะหาทางกลับโรงแรมไม่เจอ|chan khaaw khwaam chuai-luea phraw haa thaang glap roong-raaem mai joe|我请求帮助，因为找不到回酒店的路。|求助
chuai-riiak-khon|ช่วยเรียกคน|chuai riiak khon|请叫人来|短语|紧急求助|ช่วยเรียกคนมาช่วยหน่อย ประตูเปิดไม่ได้|chuai riiak khon maa chuai naawy bpra-dtuu bpoet mai dai|请叫人来帮忙，门打不开。|求助
riiak-rot-phayaaban|เรียกรถพยาบาล|riiak rot pha-yaa-baan|叫救护车|动词|紧急求助|เขาหายใจไม่สะดวก ช่วยเรียกรถพยาบาลทันที|khao haai-jai mai sa-duak chuai riiak rot pha-yaa-baan than-thii|他呼吸不顺，请马上叫救护车。|医疗
riiak-tamruat|เรียกตำรวจ|riiak dtam-ruat|叫警察|动词|报警联系|กระเป๋าฉันถูกขโมย ช่วยเรียกตำรวจให้หน่อย|gra-bpao chan thuuk kha-mooi chuai riiak dtam-ruat hai naawy|我的包被偷了，请帮我叫警察。|报警
thoo-haa-tamruat|โทรหาตำรวจ|thoo haa dtam-ruat|给警察打电话|动词|报警联系|ถ้าเห็นคนทะเลาะกันแรง ๆ ควรโทรหาตำรวจ|thaa hen khon tha-law gan raaeng raaeng khuuan thoo haa dtam-ruat|如果看到人们激烈争吵，应该给警察打电话。|报警
thoo-haa-khrobkhrua|โทรหาครอบครัว|thoo haa khraawp-khruua|给家人打电话|动词|报警联系|เมื่อหลงทาง ฉันโทรหาครอบครัวก่อนเพื่อบอกที่อยู่|muea long thaang chan thoo haa khraawp-khruua gaawn phuea baawk thii-yuu|迷路时，我先给家人打电话告诉位置。|联系
thoo-haa-phuean|โทรหาเพื่อน|thoo haa phuean|给朋友打电话|动词|报警联系|ฉันทำกุญแจหาย จึงโทรหาเพื่อนที่อยู่ใกล้ ๆ|chan tham gun-jaae haai jeung thoo haa phuean thii yuu glai glai|我弄丢钥匙了，所以给附近的朋友打电话。|联系
song-thii-yuu|ส่งที่อยู่|song thii-yuu|发送地址|动词|报警联系|กรุณาส่งที่อยู่ปัจจุบันให้ฉันทางข้อความ|ga-ru-naa song thii-yuu bpat-ju-ban hai chan thaang khaaw-khwaam|请通过消息把当前地址发给我。|联系
share-location|แชร์ตำแหน่ง|chae dtam-naeng|分享位置|动词|报警联系|ถ้าหลงทาง ให้แชร์ตำแหน่งกับเพื่อนทันที|thaa long thaang hai chae dtam-naeng gap phuean than-thii|如果迷路，请马上和朋友分享位置。|联系
dtam-naeng-bpat-ju-ban|ตำแหน่งปัจจุบัน|dtam-naeng bpat-ju-ban|当前位置|名词|报警联系|ฉันไม่รู้ชื่อถนน แต่ส่งตำแหน่งปัจจุบันให้ได้|chan mai ruu chue tha-non dtaae song dtam-naeng bpat-ju-ban hai dai|我不知道街名，但可以发当前位置。|联系
chan-long-thaang|ฉันหลงทาง|chan long thaang|我迷路了|短语|迷路走失|ฉันหลงทางและอ่านป้ายภาษาไทยไม่ออก|chan long thaang lae aan bpaai phaa-saa thai mai aawk|我迷路了，而且看不懂泰语标牌。|迷路
haa-thaang-mai-joe|หาทางไม่เจอ|haa thaang mai joe|找不到路|短语|迷路走失|ฉันหาทางไม่เจอหลังออกจากสถานีผิดทาง|chan haa thaang mai joe lang aawk jaak sa-thaa-nii phit thaang|我从车站错方向出来后找不到路。|迷路
mai-ruu-thii-yuu|ไม่รู้ที่อยู่|mai ruu thii-yuu|不知道地址|短语|迷路走失|ฉันไม่รู้ที่อยู่ของโรงแรม แต่มีรูปหน้าตึก|chan mai ruu thii-yuu khaawng roong-raaem dtaae mii ruup naa duek|我不知道酒店地址，但有楼外面的照片。|迷路
haai-jaak-glum|หายจากกลุ่ม|haai jaak glum|和队伍走散|动词|迷路走失|เด็กคนหนึ่งหายจากกลุ่มตอนเดินในตลาด|dek khon neung haai jaak glum dtaawn doen nai dta-laat|一个孩子在市场走路时和队伍走散了。|走失
dek-long|เด็กหลง|dek long|走失儿童|名词|迷路走失|มีเด็กหลงอยู่หน้าห้าง ช่วยประกาศตามหาผู้ปกครอง|mii dek long yuu naa haang chuai bpra-gaat dtaam haa phuu-bpok-khraawng|商场前有走失儿童，请广播寻找家长。|走失
tam-haa|ตามหา|dtaam haa|寻找|动词|迷路走失|เรากำลังตามหาเพื่อนที่หายไปในสถานี|rao gam-lang dtaam haa phuean thii haai bpai nai sa-thaa-nii|我们正在寻找在车站走失的朋友。|寻找
joe-laaeo|เจอแล้ว|joe laaeo|找到了|短语|迷路走失|ไม่ต้องห่วงนะ ฉันเจอทางออกแล้ว|mai dtawng huang na chan joe thaang aawk laaeo|不用担心，我找到出口了。|确认
yang-mai-joe|ยังไม่เจอ|yang mai joe|还没找到|短语|迷路走失|เรายังไม่เจอกระเป๋า ต้องถามเจ้าหน้าที่อีกครั้ง|rao yang mai joe gra-bpao dtawng thaam jao-naa-thii iik khrang|我们还没找到包，要再问工作人员。|寻找
tham-khaawng-haai|ทำของหาย|tham khaawng haai|弄丢东西|动词|丢失被偷|ฉันทำของหายในรถเมล์เมื่อเช้านี้|chan tham khaawng haai nai rot-mee muea chaao nii|今天早上我在公交上弄丢东西了。|丢失
gra-bpao-haai|กระเป๋าหาย|gra-bpao haai|包丢了|短语|丢失被偷|กระเป๋าหายตอนฉันเดินในตลาดคนเยอะ|gra-bpao haai dtaawn chan doen nai dta-laat khon yoe|我在人多的市场走路时包丢了。|丢失
thoo-ra-sap-haai|โทรศัพท์หาย|thoo-ra-sap haai|手机丢了|短语|丢失被偷|โทรศัพท์หาย ฉันจึงใช้เครื่องของเพื่อนโทรกลับบ้าน|thoo-ra-sap haai chan jeung chai khreuuang khaawng phuean thoo glap baan|手机丢了，所以我用朋友的手机给家里打电话。|丢失
gun-jaae-haai|กุญแจหาย|gun-jaae haai|钥匙丢了|短语|丢失被偷|กุญแจหายและฉันเข้าห้องไม่ได้|gun-jaae haai lae chan khao haawng mai dai|钥匙丢了，我进不了房间。|丢失
bat-haai|บัตรหาย|bat haai|卡/证件丢了|短语|丢失被偷|ถ้าบัตรธนาคารหาย ต้องรีบโทรอายัดบัตร|thaa bat tha-naa-khaan haai dtawng riip thoo aa-yat bat|如果银行卡丢了，要赶快打电话挂失。|丢失
thuuk-khamooi|ถูกขโมย|thuuk kha-mooi|被偷|动词|丢失被偷|เงินในกระเป๋าฉันถูกขโมยตอนขึ้นรถ|ngoen nai gra-bpao chan thuuk kha-mooi dtaawn kheun rot|我包里的钱在上车时被偷了。|被偷
khamooi|ขโมย|kha-mooi|小偷；偷|名词|丢失被偷|ถ้าเห็นขโมย อย่าเข้าไปใกล้และเรียกตำรวจ|thaa hen kha-mooi yaa khao bpai glai lae riiak dtam-ruat|如果看到小偷，不要靠近，要叫警察。|被偷
jaeng-khaawng-haai|แจ้งของหาย|jaaeng khaawng haai|报告失物|动词|丢失被偷|ฉันไปแจ้งของหายที่สถานีรถไฟฟ้า|chan bpai jaaeng khaawng haai thii sa-thaa-nii rot-fai-faa|我去轻轨站报告失物。|丢失
phuen-thii-khaawng-haai|พื้นที่ของหาย|phuen-thii khaawng haai|失物处|名词|丢失被偷|เจ้าหน้าที่บอกให้ไปถามที่พื้นที่ของหายชั้นล่าง|jao-naa-thii baawk hai bpai thaam thii phuen-thii khaawng haai chan laang|工作人员让我去楼下失物处询问。|丢失
lak-thaan|หลักฐาน|lak-thaan|证据；证明材料|名词|报警联系|ถ้ามีกล้องหรือรูปถ่าย ให้เก็บหลักฐานไว้|thaa mii glaawng rue ruup-thaai hai gep lak-thaan wai|如果有监控或照片，请保存证据。|报警
thaai-ruup-wai|ถ่ายรูปไว้|thaai ruup wai|拍照留存|动词|报警联系|ถ้ารถชนกัน ควรถ่ายรูปไว้ก่อนย้ายรถ|thaa rot chon gan khuuan thaai ruup wai gaawn yaai rot|如果车相撞，移动车前应该拍照留存。|证据
jaeng-khwaam|แจ้งความ|jaaeng-khwaam|报案|动词|报警联系|เมื่อหนังสือเดินทางหาย เขาต้องไปแจ้งความ|muea nang-sue doen-thaang haai khao dtawng bpai jaaeng-khwaam|护照丢失时，他必须去报案。|报警
bai-jaeng-khwaam|ใบแจ้งความ|bai jaaeng-khwaam|报案证明|名词|报警联系|สถานทูตขอใบแจ้งความหลังจากหนังสือเดินทางหาย|sa-thaan-thuut khaaw bai jaaeng-khwaam lang jaak nang-sue doen-thaang haai|护照丢失后，大使馆要求报案证明。|报警
sat-thaanii-tamruat|สถานีตำรวจ|sa-thaa-nii dtam-ruat|警察局|名词|报警联系|สถานีตำรวจอยู่ห่างจากตลาดประมาณหนึ่งกิโล|sa-thaa-nii dtam-ruat yuu haang jaak dta-laat bpra-maan neung gi-loo|警察局离市场大约一公里。|报警
tamruat-ma-laaeo|ตำรวจมาแล้ว|dtam-ruat maa laaeo|警察来了|短语|报警联系|ตำรวจมาแล้ว กรุณาเล่าเรื่องอย่างช้า ๆ|dtam-ruat maa laaeo ga-ru-naa lao rueang yaang chaa chaa|警察来了，请慢慢说明情况。|报警
looa-ruueang|เล่าเรื่อง|lao rueang|说明事情经过|动词|报警联系|ฉันเล่าเรื่องให้ตำรวจฟังตั้งแต่ต้น|chan lao rueang hai dtam-ruat fang dtang-dtaae dton|我从头向警察说明事情经过。|报警
phayaan|พยาน|pha-yaan|目击者；证人|名词|报警联系|มีพยานเห็นว่ากระเป๋าถูกขโมยบนรถเมล์|mii pha-yaan hen waa gra-bpao thuuk kha-mooi bon rot-mee|有目击者看到包在公交上被偷。|报警
akhad-het|อุบัติเหตุ|u-bat-dti-het|事故|名词|紧急求助|มีอุบัติเหตุหน้าสถานี รถติดมาก|mii u-bat-dti-het naa sa-thaa-nii rot dtit maak|车站前发生事故，堵车很严重。|事故
rot-chon|รถชน|rot chon|车撞车；车祸|动词|紧急求助|รถชนกันที่สี่แยก แต่ไม่มีใครบาดเจ็บหนัก|rot chon gan thii sii-yaaek dtaae mai mii khrai baat-jep nak|十字路口车撞了，但没人重伤。|事故
lom|ล้ม|lom|摔倒|动词|受伤症状|คุณยายล้มในห้องน้ำและลุกเองไม่ได้|khun yaai lom nai haawng-naam lae luk eeng mai dai|奶奶在洗手间摔倒，自己起不来。|受伤
luen-lom|ลื่นล้ม|leuun lom|滑倒|动词|受伤症状|พื้นเปียกมาก เด็กจึงลื่นล้มหน้าร้าน|phuen bpiiak maak dek jeung leuun lom naa raan|地板很湿，所以孩子在店前滑倒了。|受伤
baat-jep|บาดเจ็บ|baat-jep|受伤|动词|受伤症状|คนขี่มอเตอร์ไซค์บาดเจ็บที่แขนและขา|khon khii maaw-dtooe-sai baat-jep thii khaaen lae khaa|骑摩托的人手臂和腿受伤了。|受伤
baat-jep-nak|บาดเจ็บหนัก|baat-jep nak|重伤|短语|受伤症状|ถ้าบาดเจ็บหนัก อย่าขยับตัวคนป่วยเอง|thaa baat-jep nak yaa kha-yap dtua khon bpuai eeng|如果重伤，不要自己移动伤者。|受伤
jep-mue|เจ็บมือ|jep mue|手痛；手受伤|短语|受伤症状|ฉันเจ็บมือหลังโดนประตูหนีบ|chan jep mue lang doon bpra-dtuu niip|我被门夹到后手痛。|受伤
jep-khaa|เจ็บขา|jep khaa|腿痛；腿受伤|短语|受伤症状|เขาเจ็บขาและเดินต่อไม่ไหว|khao jep khaa lae doen dtaaw mai wai|他腿痛，不能继续走了。|受伤
jep-lang|เจ็บหลัง|jep lang|背痛；背部受伤|短语|受伤症状|หลังยกของหนัก ฉันเจ็บหลังมาก|lang yok khaawng nak chan jep lang maak|搬重物后，我背很痛。|受伤
hua-taek|หัวแตก|hua dtaaek|头破了|短语|受伤症状|เด็กหัวแตกเล็กน้อยหลังล้มจากจักรยาน|dek hua dtaaek lek naawy lang lom jaak jak-gra-yaan|孩子从自行车上摔下后头有点破。|受伤
leuat-ok|เลือดออก|leuuat aawk|流血|动词|受伤症状|แผลที่นิ้วเลือดออก ต้องกดไว้ก่อน|phlaae thii niu leuuat aawk dtawng got wai gaawn|手指伤口流血，要先按住。|受伤
phlaae-lek|แผลเล็ก|phlaae lek|小伤口|名词|受伤症状|แผลเล็กแบบนี้ล้างน้ำสะอาดแล้วติดพลาสเตอร์ได้|phlaae lek baep nii laang naam sa-aat laaeo dtit phlaat-dtooe dai|这种小伤口可以用清水清洗后贴创可贴。|受伤
phlaae-yai|แผลใหญ่|phlaae yai|大伤口|名词|受伤症状|ถ้าเป็นแผลใหญ่ ควรไปคลินิกทันที|thaa bpen phlaae yai khuuan bpai khli-nik than-thii|如果是大伤口，应该马上去诊所。|受伤
fok-cham|ฟกช้ำ|fok cham|淤青|形容词|受伤症状|เข่าของฉันฟกช้ำหลังชนโต๊ะ|khao khaawng chan fok cham lang chon dto|我的膝盖撞到桌子后淤青了。|受伤
bpwuat-buam|บวม|buam|肿|形容词|受伤症状|ข้อเท้าบวมมากหลังเดินพลาดบนบันได|khaaw-thaao buam maak lang doen phlaat bon ban-dai|在楼梯踩空后，脚踝肿得很厉害。|受伤
khaw-thaao-phlaeng|ข้อเท้าแพลง|khaaw-thaao phlaaeng|脚踝扭伤|短语|受伤症状|ฉันข้อเท้าแพลงตอนวิ่ง ต้องนั่งพักก่อน|chan khaaw-thaao phlaaeng dtaawn wing dtawng nang phak gaawn|我跑步时脚踝扭伤了，要先坐下休息。|受伤
don-miiit-baat|โดนมีดบาด|doon miit baat|被刀割伤|短语|受伤症状|เขาโดนมีดบาดตอนทำอาหารเย็น|khao doon miit baat dtaawn tham aa-haan yen|他做晚饭时被刀割伤。|受伤
doon-nam-raawn-luak|โดนน้ำร้อนลวก|doon naam raawn luak|被热水烫伤|短语|受伤症状|มือฉันโดนน้ำร้อนลวก ต้องเปิดน้ำเย็นล้าง|mue chan doon naam raawn luak dtawng bpoet naam yen laang|我的手被热水烫伤了，要开冷水冲洗。|受伤
haai-jai-mai-ok|หายใจไม่ออก|haai-jai mai aawk|喘不过气|短语|生病不适|เขาหายใจไม่ออกหลังวิ่งเร็วมาก|khao haai-jai mai aawk lang wing reo maak|他跑得很快后喘不过气。|症状
haai-jai-mai-saduak|หายใจไม่สะดวก|haai-jai mai sa-duak|呼吸不顺|短语|生病不适|ถ้าหายใจไม่สะดวก ควรขอความช่วยเหลือทันที|thaa haai-jai mai sa-duak khuuan khaaw khwaam chuai-luea than-thii|如果呼吸不顺，应该马上求助。|症状
naa-muet|หน้ามืด|naa muet|眼前发黑|形容词|生病不适|พอลุกเร็วเกินไป ฉันหน้ามืดและต้องนั่งลง|phaaw luk reo goen bpai chan naa muet lae dtawng nang long|起身太快时我眼前发黑，必须坐下。|症状
ja-pen-lom|จะเป็นลม|ja bpen lom|快晕倒|短语|生病不适|ฉันรู้สึกจะเป็นลม ขอที่นั่งหน่อยได้ไหม|chan ruu-seuk ja bpen lom khaaw thii-nang naawy dai mai|我感觉快晕倒了，可以给我个座位吗？|症状
pen-lom|เป็นลม|bpen lom|晕倒|动词|生病不适|มีคนเป็นลมในสถานี ช่วยเรียกเจ้าหน้าที่หน่อย|mii khon bpen lom nai sa-thaa-nii chuai riiak jao-naa-thii naawy|车站里有人晕倒了，请叫工作人员。|症状
dtua-raawn|ตัวร้อน|dtua raawn|身上发热|形容词|生病不适|เด็กตัวร้อนมาก แม่จึงรีบวัดไข้|dek dtua raawn maak maae jeung riip wat khai|孩子身上很烫，妈妈赶快量体温。|症状
mii-khai-suung|มีไข้สูง|mii khai suung|发高烧|短语|生病不适|ถ้ามีไข้สูงหลายชั่วโมง ควรไปพบแพทย์|thaa mii khai suung laai chua-moong khuuan bpai phop phaaet|如果高烧好几个小时，应该去看医生。|症状
bpuat-hua-maak|ปวดหัวมาก|bpuat hua maak|头很痛|短语|生病不适|ฉันปวดหัวมากและมองจอไม่ไหว|chan bpuat hua maak lae maawng jaaw mai wai|我头很痛，看不了屏幕。|症状
bpuat-thaawng-maak|ปวดท้องมาก|bpuat thaawng maak|肚子很痛|短语|生病不适|เขาปวดท้องมากหลังอาหารกลางวัน|khao bpuat thaawng maak lang aa-haan glaang-wan|他午饭后肚子很痛。|症状
aa-jiian|อาเจียน|aa-jiian|呕吐|动词|生病不适|เด็กอาเจียนสองครั้งและดื่มน้ำได้น้อย|dek aa-jiian saawng khrang lae duem naam dai naawy|孩子吐了两次，喝水很少。|症状
thaawng-siia|ท้องเสีย|thaawng siia|腹泻|短语|生病不适|ถ้าท้องเสียมาก ต้องดื่มน้ำเกลือแร่|thaa thaawng siia maak dtawng duem naam-gluea-raae|如果腹泻严重，要喝电解质水。|症状
phaae-yaa|แพ้ยา|phaae yaa|药物过敏|动词|生病不适|ฉันแพ้ยาบางชนิด ต้องบอกหมอก่อนรับยา|chan phaae yaa baang cha-nit dtawng baawk maaw gaawn rap yaa|我对某些药过敏，领药前必须告诉医生。|过敏
phaae-aa-haan|แพ้อาหาร|phaae aa-haan|食物过敏|动词|生病不适|เพื่อนฉันแพ้อาหารทะเลและเริ่มมีผื่น|phuean chan phaae aa-haan tha-lee lae roem mii pheun|我朋友海鲜过敏，并开始起皮疹。|过敏
mii-pheun|มีผื่น|mii pheun|有皮疹|短语|生病不适|หลังดื่มนม เด็กมีผื่นแดงที่หน้า|lang duem nom dek mii pheun daaeng thii naa|喝牛奶后，孩子脸上有红色皮疹。|过敏
bpai-hong-phayaban|ไปห้องพยาบาล|bpai haawng pha-yaa-baan|去医务室|动词|应急处理|ถ้าปวดท้องมาก ให้ไปห้องพยาบาลกับครู|thaa bpuat thaawng maak hai bpai haawng pha-yaa-baan gap khruu|如果肚子很痛，就和老师去医务室。|处理
phaa-bpai-khli-nik|พาไปคลินิก|phaa bpai khli-nik|带去诊所|动词|应急处理|แม่พาลูกไปคลินิกเพราะมีไข้สูง|maae phaa luuk bpai khli-nik phraw mii khai suung|妈妈带孩子去诊所，因为孩子高烧。|处理
phaa-bpai-roong-phayaaban|พาไปโรงพยาบาล|phaa bpai roong-pha-yaa-baan|带去医院|动词|应急处理|ถ้าบาดเจ็บหนัก ต้องพาไปโรงพยาบาลทันที|thaa baat-jep nak dtawng phaa bpai roong-pha-yaa-baan than-thii|如果重伤，必须马上带去医院。|处理
phak-gaawn|พักก่อน|phak gaawn|先休息|短语|应急处理|คุณหน้ามืด นั่งพักก่อนแล้วค่อยเดินต่อ|khun naa muet nang phak gaawn laaeo khaawy doen dtaaw|你眼前发黑，先坐下休息再继续走。|处理
nang-long|นั่งลง|nang long|坐下|动词|应急处理|ถ้ารู้สึกจะเป็นลม ให้นั่งลงทันที|thaa ruu-seuk ja bpen lom hai nang long than-thii|如果感觉快晕倒，请马上坐下。|处理
yaa-khayap|อย่าขยับ|yaa kha-yap|不要动|短语|应急处理|เขาเจ็บหลังมาก อย่าขยับตัวเขาเอง|khao jep lang maak yaa kha-yap dtua khao eeng|他背很痛，不要自己移动他。|处理
got-phlaae|กดแผล|got phlaae|按住伤口|动词|应急处理|ถ้าเลือดออก ให้ใช้ผ้าสะอาดกดแผลไว้|thaa leuuat aawk hai chai phaa sa-aat got phlaae wai|如果流血，请用干净布按住伤口。|处理
laang-phlaae|ล้างแผล|laang phlaae|清洗伤口|动词|应急处理|แผลเล็กควรล้างแผลด้วยน้ำสะอาดก่อนติดพลาสเตอร์|phlaae lek khuuan laang phlaae duai naam sa-aat gaawn dtit phlaat-dtooe|小伤口贴创可贴前应该用清水清洗。|处理
dtit-phlaat-dtoe|ติดพลาสเตอร์|dtit phlaat-dtooe|贴创可贴|动词|应急处理|หลังล้างแผลแล้ว ฉันติดพลาสเตอร์ที่นิ้ว|lang laang phlaae laaeo chan dtit phlaat-dtooe thii niu|清洗伤口后，我在手指上贴了创可贴。|处理
phaa-sa-aat|ผ้าสะอาด|phaa sa-aat|干净布|名词|应急处理|ใช้ผ้าสะอาดกดแผลจนเลือดหยุด|chai phaa sa-aat got phlaae jon leuuat yut|用干净布按住伤口直到血停。|处理
yaa-gin-yaa-eeng|อย่ากินยาเอง|yaa gin yaa eeng|不要自己乱吃药|短语|应急处理|ถ้าแพ้ยา อย่ากินยาเองและควรถามหมอ|thaa phaae yaa yaa gin yaa eeng lae khuuan thaam maaw|如果药物过敏，不要自己乱吃药，应该问医生。|处理
ra-wang|ระวัง|ra-wang|小心|动词|危险警告|ระวังพื้นเปียก เดี๋ยวจะลื่นล้ม|ra-wang phuen bpiiak diao ja leuun lom|小心地面湿，不然会滑倒。|警告
an-dta-raai|อันตราย|an-dta-raai|危险|形容词|危险警告|อย่าเข้าไปใกล้สายไฟขาด มันอันตรายมาก|yaa khao bpai glai saai fai khaat man an-dta-raai maak|不要靠近断电线，很危险。|警告
yaa-khao-glai|อย่าเข้าใกล้|yaa khao glai|不要靠近|短语|危险警告|อย่าเข้าใกล้ตึกเก่า เพราะมีของตกลงมา|yaa khao glai duek gao phraw mii khaawng dtok long maa|不要靠近旧楼，因为有东西掉下来。|警告
yaa-jap|อย่าจับ|yaa jap|不要碰|短语|危险警告|อย่าจับของร้อน เดี๋ยวมือจะพอง|yaa jap khaawng raawn diao mue ja phaawng|不要碰热东西，不然手会起泡。|警告
yaa-wing|อย่าวิ่ง|yaa wing|不要跑|短语|危险警告|อย่าวิ่งบนพื้นเปียกในสถานี|yaa wing bon phuen bpiiak nai sa-thaa-nii|不要在车站湿地面上跑。|警告
fai-mai|ไฟไหม้|fai mai|着火；火灾|短语|危险警告|ถ้าไฟไหม้ ให้รีบออกจากอาคารทางบันไดหนีไฟ|thaa fai mai hai riip aawk jaak aa-khaan thaang ban-dai nii fai|如果着火，请赶快通过消防楼梯离开建筑。|火灾
khwan-yoe|ควันเยอะ|khwan yoe|烟很多|短语|危险警告|ในห้องมีควันเยอะ ต้องรีบเปิดหน้าต่างและออกไป|nai haawng mii khwan yoe dtawng riip bpoet naa-dtaang lae aawk bpai|房间里烟很多，必须赶快开窗并出去。|火灾
thaang-nii-fai|ทางหนีไฟ|thaang nii fai|消防通道|名词|危险警告|ทางหนีไฟอยู่ด้านหลังลิฟต์ทางซ้าย|thaang nii fai yuu daan lang lif thaang saai|消防通道在电梯后面左侧。|安全
ban-dai-nii-fai|บันไดหนีไฟ|ban-dai nii fai|消防楼梯|名词|危险警告|เวลาฉุกเฉินห้ามใช้ลิฟต์ ให้ใช้บันไดหนีไฟ|wee-laa chuk-choen haam chai lif hai chai ban-dai nii fai|紧急时禁止使用电梯，请使用消防楼梯。|安全
haam-chai-lif|ห้ามใช้ลิฟต์|haam chai lif|禁止使用电梯|短语|危险警告|ตอนแผ่นดินไหว ห้ามใช้ลิฟต์เด็ดขาด|dtaawn phaen-din-wai haam chai lif det-khaat|地震时严禁使用电梯。|安全
phaen-din-wai|แผ่นดินไหว|phaen-din-wai|地震|名词|危险警告|ถ้าแผ่นดินไหว ให้หลบใต้โต๊ะและอยู่ห่างหน้าต่าง|thaa phaen-din-wai hai lop dtai dto lae yuu haang naa-dtaang|如果地震，请躲到桌下并远离窗户。|灾害
nam-thuam|น้ำท่วม|naam thuam|洪水；淹水|名词|危险警告|ฝนตกหนักจนถนนน้ำท่วม รถเล็กผ่านไม่ได้|fon dtok nak jon tha-non naam thuam rot lek phaan mai dai|雨下得很大导致道路淹水，小车过不了。|灾害
fon-dtok-nak|ฝนตกหนัก|fon dtok nak|大雨|短语|危险警告|ฝนตกหนักมาก ระวังน้ำท่วมและถนนลื่น|fon dtok nak maak ra-wang naam thuam lae tha-non leuun|雨下得很大，小心淹水和路滑。|天气
tha-non-luen|ถนนลื่น|tha-non leuun|路滑|短语|危险警告|ถนนลื่นหลังฝนตก อย่าขับรถเร็ว|tha-non leuun lang fon dtok yaa khap rot reo|雨后路滑，不要开快车。|警告
saai-fai-khaat|สายไฟขาด|saai fai khaat|电线断了|短语|危险警告|มีสายไฟขาดบนถนน อย่าเข้าใกล้|mii saai fai khaat bon tha-non yaa khao glai|路上有断电线，不要靠近。|警告
khaawng-dtok|ของตก|khaawng dtok|东西掉落|短语|危险警告|ระวังของตกจากชั้นวางของด้านบน|ra-wang khaawng dtok jaak chan waang khaawng daan bon|小心上方置物架有东西掉落。|警告
bpra-dtuu-dtit|ประตูติด|bpra-dtuu dtit|门卡住|短语|紧急求助|ประตูติดและเปิดไม่ได้ ช่วยเรียกผู้ดูแลหน่อย|bpra-dtuu dtit lae bpoet mai dai chuai riiak phuu duu-laae naawy|门卡住打不开，请叫管理员。|求助
dtit-yuu-nai-lif|ติดอยู่ในลิฟต์|dtit yuu nai lif|困在电梯里|短语|紧急求助|มีคนติดอยู่ในลิฟต์ ช่วยโทรหาผู้ดูแลอาคาร|mii khon dtit yuu nai lif chuai thoo haa phuu duu-laae aa-khaan|有人困在电梯里，请给楼管打电话。|求助
maawt-fai-chaai|ไฟฉาย|fai-chaai|手电筒|名词|应急处理|เวลาฟ้าดับควรมีไฟฉายในห้อง|wee-laa fai dap khuuan mii fai-chaai nai haawng|停电时房间里应该有手电筒。|用品
yaa-sam-rap-chuk-choen|ยาสำหรับฉุกเฉิน|yaa sam-rap chuk-choen|应急药|名词|应急处理|ฉันเก็บยาสำหรับฉุกเฉินไว้ในกระเป๋าเดินทาง|chan gep yaa sam-rap chuk-choen wai nai gra-bpao doen-thaang|我把应急药放在旅行包里。|用品
glaawng-yaa-chuk-choen|กล่องยาฉุกเฉิน|glaawng yaa chuk-choen|急救药箱|名词|应急处理|โรงเรียนมีกล่องยาฉุกเฉินอยู่ในห้องพยาบาล|roong-riian mii glaawng yaa chuk-choen yuu nai haawng pha-yaa-baan|学校医务室里有急救药箱。|用品
boe-chuk-choen|เบอร์ฉุกเฉิน|booe chuk-choen|紧急号码|名词|报警联系|กรุณาเก็บเบอร์ฉุกเฉินไว้ในโทรศัพท์|ga-ru-naa gep booe chuk-choen wai nai thoo-ra-sap|请把紧急号码保存在手机里。|联系
boe-khrobkhrua|เบอร์ครอบครัว|booe khraawp-khruua|家人电话|名词|报警联系|เด็กควรจำเบอร์ครอบครัวได้อย่างน้อยหนึ่งเบอร์|dek khuuan jam booe khraawp-khruua dai yaang naawy neung booe|孩子应该至少记住一个家人电话。|联系
boe-phuean|เบอร์เพื่อน|booe phuean|朋友电话|名词|报警联系|ถ้าโทรหาครอบครัวไม่ได้ ให้โทรเบอร์เพื่อนก่อน|thaa thoo haa khraawp-khruua mai dai hai thoo booe phuean gaawn|如果打不通家人电话，就先打朋友电话。|联系
thoo-mai-dai|โทรไม่ได้|thoo mai dai|不能打电话|短语|报警联系|โทรศัพท์แบตหมด ฉันโทรไม่ได้|thoo-ra-sap baaet mot chan thoo mai dai|手机没电了，我不能打电话。|联系
baaet-mot|แบตหมด|baaet mot|没电了|短语|报警联系|แบตโทรศัพท์หมดตอนฉันหลงทาง|baaet thoo-ra-sap mot dtaawn chan long thaang|我迷路时手机没电了。|联系
khaaw-yuem-thoo-ra-sap|ขอยืมโทรศัพท์|khaaw yuem thoo-ra-sap|借用手机|动词|紧急求助|ขอยืมโทรศัพท์โทรหาแม่ได้ไหมครับ|khaaw yuem thoo-ra-sap thoo haa maae dai mai khrap|可以借手机给我打电话给妈妈吗？|求助
phuut-thai-mai-keng|พูดไทยไม่เก่ง|phuut thai mai geng|泰语说得不好|短语|紧急求助|ฉันพูดไทยไม่เก่ง ช่วยพูดช้า ๆ ได้ไหม|chan phuut thai mai geng chuai phuut chaa chaa dai mai|我泰语说得不好，可以说慢一点吗？|沟通
phuut-chaa-chaa|พูดช้า ๆ|phuut chaa chaa|慢慢说|动词|紧急求助|กรุณาพูดช้า ๆ ฉันกำลังตกใจมาก|ga-ru-naa phuut chaa chaa chan gam-lang dtok-jai maak|请慢慢说，我现在很害怕。|沟通
mai-khao-jai|ไม่เข้าใจ|mai khao-jai|不明白|短语|紧急求助|ฉันไม่เข้าใจ ช่วยเขียนที่อยู่ให้หน่อยได้ไหม|chan mai khao-jai chuai khiian thii-yuu hai naawy dai mai|我不明白，可以帮我写下地址吗？|沟通
dtok-jai|ตกใจ|dtok-jai|受惊；害怕了一下|动词|紧急求助|เด็กตกใจหลังได้ยินเสียงดังมาก|dek dtok-jai lang dai-yin siiang dang maak|孩子听到很大的声音后受惊了。|情绪
glua|กลัว|glua|害怕|形容词|紧急求助|ฉันกลัวมาก เพราะเดินหลงในที่มืด|chan glua maak phraw doen long nai thii muet|我很害怕，因为在黑暗处迷路了。|情绪
plawt-phai|ปลอดภัย|bplaawt-phai|安全|形容词|应急处理|ตอนนี้ทุกคนปลอดภัยแล้ว ไม่ต้องกังวล|dtaawn-nii thuk khon bplaawt-phai laaeo mai dtawng gang-won|现在大家都安全了，不用担心。|安全
mai-plawt-phai|ไม่ปลอดภัย|mai bplaawt-phai|不安全|形容词|危险警告|ทางนี้มืดและไม่ปลอดภัย อย่าเดินคนเดียว|thaang nii muet lae mai bplaawt-phai yaa doen khon diao|这条路黑且不安全，不要一个人走。|安全
yuu-thii-plawt-phai|อยู่ที่ปลอดภัย|yuu thii bplaawt-phai|待在安全地方|短语|应急处理|ถ้าฝนตกหนักมาก ให้อยู่ที่ปลอดภัยก่อน|thaa fon dtok nak maak hai yuu thii bplaawt-phai gaawn|如果雨下得很大，请先待在安全地方。|安全
aawk-jaak-thii-nii|ออกจากที่นี่|aawk jaak thii nii|离开这里|动词|应急处理|ถ้ามีกลิ่นควัน เราต้องออกจากที่นี่ทันที|thaa mii glin khwan rao dtawng aawk jaak thii nii than-thii|如果有烟味，我们必须马上离开这里。|安全
riip-aawk|รีบออก|riip aawk|赶快出去|动词|应急处理|ไฟเริ่มไหม้ในครัว ทุกคนต้องรีบออก|fai roem mai nai khruua thuk khon dtawng riip aawk|厨房开始着火，所有人必须赶快出去。|安全
riip-bpai|รีบไป|riip bpai|赶快去|动词|紧急求助|ถ้าเจ็บหน้าอกมาก ต้องรีบไปโรงพยาบาล|thaa jep naa-ok maak dtawng riip bpai roong-pha-yaa-baan|如果胸口很痛，必须赶快去医院。|求助
riip-thoo|รีบโทร|riip thoo|赶快打电话|动词|报警联系|เห็นอุบัติเหตุแล้วควรรีบโทรแจ้งเจ้าหน้าที่|hen u-bat-dti-het laaeo khuuan riip thoo jaaeng jao-naa-thii|看到事故后应该赶快打电话通知工作人员。|联系
jaaeng-jao-naa-thii|แจ้งเจ้าหน้าที่|jaaeng jao-naa-thii|通知工作人员|动词|报警联系|ถ้าพบของต้องสงสัย ให้แจ้งเจ้าหน้าที่ทันที|thaa phop khaawng dtawng song-sai hai jaaeng jao-naa-thii than-thii|如果发现可疑物品，请马上通知工作人员。|联系
khaawng-dtong-song-sai|ของต้องสงสัย|khaawng dtawng song-sai|可疑物品|名词|危险警告|อย่าแตะของต้องสงสัยในสถานี|yaa dtae khaawng dtawng song-sai nai sa-thaa-nii|不要碰车站里的可疑物品。|警告
phuen-bpiiak|พื้นเปียก|phuen bpiiak|地面湿|短语|危险警告|พื้นเปียกหน้าห้องน้ำ ต้องเดินช้า ๆ|phuen bpiiak naa haawng-naam dtawng doen chaa chaa|洗手间前地面湿，要慢慢走。|警告
khaawng-khom|ของคม|khaawng khom|锋利物品|名词|危险警告|อย่าให้เด็กเล่นของคม เช่น มีดหรือกรรไกร|yaa hai dek len khaawng khom chen miit rue gan-grai|不要让孩子玩锋利物品，比如刀或剪刀。|警告
khwaam-ruen|ความร้อน|khwaam raawn|高温；热度|名词|危险警告|ระวังความร้อนจากหม้อและเตาไฟฟ้า|ra-wang khwaam raawn jaak maaw lae dtao fai-faa|小心锅和电炉的高温。|警告
glin-gas|กลิ่นแก๊ส|glin gaaet|煤气味|名词|危险警告|ถ้าได้กลิ่นแก๊ส อย่าเปิดไฟและรีบออกจากห้อง|thaa dai glin gaaet yaa bpoet fai lae riip aawk jaak haawng|如果闻到煤气味，不要开灯，赶快离开房间。|警告
yaa-bpoet-fai|อย่าเปิดไฟ|yaa bpoet fai|不要开灯|短语|危险警告|ถ้ามีกลิ่นแก๊ส อย่าเปิดไฟหรือใช้ไฟแช็ก|thaa mii glin gaaet yaa bpoet fai rue chai fai-chaek|如果有煤气味，不要开灯或使用打火机。|警告
plak-fai-sia|ปลั๊กไฟเสีย|bplak fai siia|插座坏了|短语|危险警告|ปลั๊กไฟเสียและมีเสียงแปลก ๆ อย่าใช้ต่อ|bplak fai siia lae mii siiang bplaaek bplaaek yaa chai dtaaw|插座坏了且有奇怪声音，不要继续用。|警告
fai-chot|ไฟช็อต|fai chot|触电；电击|短语|危险警告|ถ้ามีคนโดนไฟช็อต อย่าจับตัวเขาด้วยมือเปล่า|thaa mii khon doon fai chot yaa jap dtua khao duai mue bplaao|如果有人触电，不要用空手碰他。|警告
mue-bplaao|มือเปล่า|mue bplaao|空手|名词|危险警告|อย่าจับสายไฟด้วยมือเปล่าเมื่อพื้นเปียก|yaa jap saai fai duai mue bplaao muea phuen bpiiak|地面湿时不要空手碰电线。|警告
bpai-haawng-chuk-choen|ไปห้องฉุกเฉิน|bpai haawng chuk-choen|去急诊室|动词|应急处理|อาการหนักมาก ต้องไปห้องฉุกเฉินทันที|aa-gaan nak maak dtawng bpai haawng chuk-choen than-thii|症状很严重，必须马上去急诊室。|医疗
haawng-chuk-choen|ห้องฉุกเฉิน|haawng chuk-choen|急诊室|名词|应急处理|ห้องฉุกเฉินอยู่ชั้นหนึ่งของโรงพยาบาล|haawng chuk-choen yuu chan neung khaawng roong-pha-yaa-baan|急诊室在医院一楼。|医疗
aa-gaan-nak|อาการหนัก|aa-gaan nak|症状严重|短语|生病不适|ถ้าอาการหนักขึ้น ต้องโทรเรียกรถพยาบาล|thaa aa-gaan nak kheun dtawng thoo riiak rot pha-yaa-baan|如果症状加重，必须打电话叫救护车。|医疗
aa-gaan-dii-kheun|อาการดีขึ้น|aa-gaan dii kheun|症状好转|短语|生病不适|หลังพักสักครู่ อาการดีขึ้นและเขาเดินได้|lang phak sak khruu aa-gaan dii kheun lae khao doen dai|休息一会儿后，症状好转，他能走了。|医疗
yang-jaeb-yuu|ยังเจ็บอยู่|yang jep yuu|还在痛|短语|受伤症状|ฉันล้างแผลแล้วแต่ยังเจ็บอยู่|chan laang phlaae laaeo dtaae yang jep yuu|我清洗伤口了，但还在痛。|受伤
mai-jaeb-laaeo|ไม่เจ็บแล้ว|mai jep laaeo|不痛了|短语|受伤症状|หลังประคบน้ำแข็ง ข้อเท้าไม่เจ็บแล้ว|lang bpra-khop naam-khaeng khaaw-thaao mai jep laaeo|冰敷后，脚踝不痛了。|受伤
bpra-khop-naam-khaeng|ประคบน้ำแข็ง|bpra-khop naam-khaeng|冰敷|动词|应急处理|ถ้าข้อเท้าบวม ให้ประคบน้ำแข็งสิบห้านาที|thaa khaaw-thaao buam hai bpra-khop naam-khaeng sip-haa naa-thii|如果脚踝肿了，请冰敷十五分钟。|处理
`;

export const VOCABULARY_EXPANSION_A2_BASIC_EMERGENCIES_01: VocabularyExpansionA2BasicEmergenciesCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
