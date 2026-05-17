type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "宠物动物" | "喂养饮水" | "兽医看诊" | "遛狗外出" | "清洁卫生" | "宠物用品" | "动物行为" | "基础照顾";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2PetsAnimalsDailyCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-pets-animals-daily-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2PetsAnimalsDailyCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于宠物照顾、看兽医、喂养、清洁和描述动物行为。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，描述动物时要分清用品、动作、健康和行为。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["说宠物照顾时常搭配 ให้อาหาร、พาไปหาหมอ、ทำความสะอาด、ระวังกัด 等基础表达。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
liiang-sat|เลี้ยงสัตว์|liiang sat|养动物|动词|宠物动物|บ้านนี้เลี้ยงสัตว์สองตัวคือหมาและแมว|baan nii liiang sat saawng dtua kheu maa lae maeo|这家养了两只动物，是狗和猫。|宠物
sat-liiang|สัตว์เลี้ยง|sat liiang|宠物|名词|宠物动物|สัตว์เลี้ยงต้องการอาหาร น้ำ และความรักทุกวัน|sat liiang dtawng-gaan aa-haan naam lae khwaam-rak thuk wan|宠物每天需要食物、水和爱护。|宠物
maa-thii-baan|หมาที่บ้าน|maa thii baan|家里的狗|名词|宠物动物|หมาที่บ้านชอบนอนหน้าประตูตอนบ่าย|maa thii baan chaawp naawn naa bpra-dtuu dtaawn baai|家里的狗下午喜欢睡在门口。|狗
maeo-thii-baan|แมวที่บ้าน|maeo thii baan|家里的猫|名词|宠物动物|แมวที่บ้านไม่ชอบเสียงดังและชอบที่เงียบ|maeo thii baan mai chaawp siiang dang lae chaawp thii ngiiap|家里的猫不喜欢大声，喜欢安静的地方。|猫
luuk-maa|ลูกหมา|luuk maa|小狗|名词|宠物动物|ลูกหมาตัวนี้ยังเล็กและต้องกินอาหารนิ่ม|luuk maa dtua nii yang lek lae dtawng gin aa-haan nim|这只小狗还小，需要吃软食。|狗
luuk-maeo|ลูกแมว|luuk maeo|小猫|名词|宠物动物|ลูกแมวนอนในกล่องผ้านุ่มเกือบทั้งวัน|luuk maeo naawn nai glaawng phaa num geuap thang wan|小猫几乎一整天睡在软布盒里。|猫
pla-thong|ปลาทอง|bplaa thaawng|金鱼|名词|宠物动物|เด็กให้อาหารปลาทองวันละนิดเท่านั้น|dek hai aa-haan bplaa thaawng wan la nit thao-nan|孩子每天只给金鱼喂一点点。|鱼
nok-liiang|นกเลี้ยง|nok liiang|宠物鸟|名词|宠物动物|นกเลี้ยงร้องเสียงใสเมื่อเห็นเจ้าของกลับบ้าน|nok liiang raawng siiang sai meua hen jao-khaawng glap baan|宠物鸟看到主人回家时清脆地叫。|鸟
gra-dtaai-liiang|กระต่ายเลี้ยง|gra-dtaai liiang|宠物兔|名词|宠物动物|กระต่ายเลี้ยงชอบกินผักสดและนอนในกรง|gra-dtaai liiang chaawp gin phak sot lae naawn nai grong|宠物兔喜欢吃新鲜蔬菜，并睡在笼子里。|兔
jao-khaawng-sat|เจ้าของสัตว์|jao-khaawng sat|宠物主人|名词|基础照顾|เจ้าของสัตว์ควรพาแมวไปฉีดวัคซีนตามนัด|jao-khaawng sat khuan phaa maeo bpai chiit wak-siin dtaam nat|宠物主人应该按预约带猫去打疫苗。|主人
hai-aa-haan-maa|ให้อาหารหมา|hai aa-haan maa|喂狗|动词|喂养饮水|พ่อให้อาหารหมาตอนเช้าก่อนออกไปทำงาน|phaaw hai aa-haan maa dtaawn chaao gaawn aawk bpai tham-ngaan|爸爸早上上班前喂狗。|喂食
hai-aa-haan-maeo|ให้อาหารแมว|hai aa-haan maeo|喂猫|动词|喂养饮水|แม่ให้อาหารแมวหลังกลับจากตลาดทุกเย็น|mae hai aa-haan maeo lang glap jaak dta-laat thuk yen|妈妈每天傍晚从市场回来后喂猫。|喂食
aa-haan-maa|อาหารหมา|aa-haan maa|狗粮|名词|喂养饮水|อาหารหมาถุงนี้พอใช้ได้ประมาณสองสัปดาห์|aa-haan maa thung nii phaaw chai dai bpra-maan saawng sap-daa|这袋狗粮大约够用两周。|食物
aa-haan-maeo|อาหารแมว|aa-haan maeo|猫粮|名词|喂养饮水|อาหารแมวแบบเม็ดเก็บง่ายและไม่มีกลิ่นแรง|aa-haan maeo baep met gep ngaai lae mai mii glin raaeng|颗粒猫粮容易保存，而且味道不重。|食物
aa-haan-met|อาหารเม็ด|aa-haan met|颗粒饲料|名词|喂养饮水|หมาตัวเล็กกินอาหารเม็ดเม็ดเล็กได้ง่ายกว่า|maa dtua lek gin aa-haan met met lek dai ngaai gwaa|小狗吃小颗粒饲料更容易。|食物
aa-haan-bpiak|อาหารเปียก|aa-haan bpiak|湿粮|名词|喂养饮水|แมวแก่ชอบอาหารเปียกเพราะเคี้ยวง่าย|maeo gae chaawp aa-haan bpiak phraw khiao ngaai|老猫喜欢湿粮，因为容易咀嚼。|食物
khong-gin-sat|ของกินสัตว์|khaawng gin sat|动物吃的东西|名词|喂养饮水|อย่าให้ของกินสัตว์ที่มีรสเค็มเกินไป|yaa hai khaawng gin sat thii mii rot khem goen bpai|不要给动物吃太咸的东西。|食物
thueai-aa-haan|ถ้วยอาหาร|thuai aa-haan|食盆|名词|宠物用品|ถ้วยอาหารของแมวต้องล้างทุกวันหลังมื้อเย็น|thuai aa-haan khaawng maeo dtawng laang thuk wan lang meu yen|猫的食盆每天晚饭后要洗。|用品
thueai-naam|ถ้วยน้ำ|thuai naam|水碗|名词|宠物用品|ควรเติมน้ำสะอาดในถ้วยน้ำให้หมาตลอดวัน|khuan dterm naam sa-aat nai thuai naam hai maa dta-laawt wan|应该全天给狗的水碗补干净水。|饮水
dterm-naam|เติมน้ำ|dterm naam|添水|动词|喂养饮水|ก่อนออกจากบ้าน ฉันเติมน้ำให้แมวสองถ้วย|gaawn aawk jaak baan chan dterm naam hai maeo saawng thuai|出门前，我给猫添了两碗水。|饮水
naam-sa-aat|น้ำสะอาด|naam sa-aat|干净水|名词|喂养饮水|สัตว์เลี้ยงควรมีน้ำสะอาดกินตลอดเวลา|sat liiang khuan mii naam sa-aat gin dta-laawt wee-laa|宠物应该随时有干净水喝。|饮水
hai-khanom-sat|ให้ขนมสัตว์|hai kha-nom sat|给宠物零食|动词|喂养饮水|อย่าให้ขนมสัตว์มากเกินไปเพราะอาจอ้วน|yaa hai kha-nom sat maak goen bpai phraw aat uan|不要给宠物太多零食，因为可能会变胖。|零食
khanom-maa|ขนมหมา|kha-nom maa|狗零食|名词|喂养饮水|ขนมหมาชิ้นเล็กใช้ฝึกให้หมานั่งได้|kha-nom maa chin lek chai feuk hai maa nang dai|小块狗零食可以用来训练狗坐下。|零食
khanom-maeo|ขนมแมว|kha-nom maeo|猫零食|名词|喂养饮水|แมวได้ยินเสียงถุงขนมแมวก็วิ่งมาเร็ว|maeo dai-yin siiang thung kha-nom maeo gaaw wing maa reo|猫一听到猫零食袋的声音就很快跑来。|零食
gin-maak-goen|กินมากเกิน|gin maak goen|吃太多|短语|喂养饮水|หมากินมากเกินเมื่อคืน วันนี้จึงไม่ค่อยอยากวิ่ง|maa gin maak goen meua-kheun wan-nii jeung mai khaawy yaak wing|狗昨晚吃太多了，今天不太想跑。|饮食
mai-yom-gin|ไม่ยอมกิน|mai yaawm gin|不肯吃|短语|喂养饮水|ถ้าแมวไม่ยอมกินสองวัน ควรพาไปหาหมอ|thaa maeo mai yaawm gin saawng wan khuan phaa bpai haa maaw|如果猫两天不肯吃，应该带去看医生。|饮食
phaa-bpai-haa-sat-ta-waet|พาไปหาสัตวแพทย์|phaa bpai haa sat-dta-waet|带去看兽医|动词|兽医看诊|เราพาหมาไปหาสัตวแพทย์เพราะมันไอหลายวัน|rao phaa maa bpai haa sat-dta-waet phraw man ai laai wan|我们带狗去看兽医，因为它咳了好几天。|兽医
sat-ta-waet|สัตวแพทย์|sat-dta-waet|兽医|名词|兽医看诊|สัตวแพทย์ตรวจหูแมวและให้ยาหยอด|sat-dta-waet dtruat huu maeo lae hai yaa yaawt|兽医检查猫的耳朵，并给了滴药。|兽医
khli-nik-sat|คลินิกสัตว์|khli-nik sat|动物诊所|名词|兽医看诊|คลินิกสัตว์ใกล้บ้านเปิดถึงสองทุ่ม|khli-nik sat glai baan bpoet theung saawng thum|家附近的动物诊所开到晚上八点。|兽医
roong-phayaabaan-sat|โรงพยาบาลสัตว์|roong-pha-yaa-baan sat|动物医院|名词|兽医看诊|ถ้าอาการหนัก ควรพาไปโรงพยาบาลสัตว์ทันที|thaa aa-gaan nak khuan phaa bpai roong-pha-yaa-baan sat than-thii|如果症状严重，应该马上带去动物医院。|兽医
nat-maaw-sat|นัดหมอสัตว์|nat maaw sat|预约兽医|动词|兽医看诊|ฉันนัดหมอสัตว์ให้แมววันเสาร์ตอนเช้า|chan nat maaw sat hai maeo wan-sao dtaawn chaao|我给猫预约了星期六早上的兽医。|预约
chit-wak-siin-sat|ฉีดวัคซีนสัตว์|chiit wak-siin sat|给动物打疫苗|动词|兽医看诊|ลูกหมาต้องฉีดวัคซีนสัตว์ตามที่หมอนัด|luuk maa dtawng chiit wak-siin sat dtaam thii maaw nat|小狗要按医生预约打疫苗。|疫苗
bai-wak-siin|ใบวัคซีน|bai wak-siin|疫苗记录|名词|兽医看诊|อย่าลืมเอาใบวัคซีนไปคลินิกทุกครั้ง|yaa leum ao bai wak-siin bpai khli-nik thuk khrang|每次去诊所别忘了带疫苗记录。|疫苗
yaa-thaai-pha-yaat|ยาถ่ายพยาธิ|yaa thaai pha-yaat|驱虫药|名词|兽医看诊|หมอให้ยาถ่ายพยาธิสำหรับแมวทุกสามเดือน|maaw hai yaa thaai pha-yaat sam-rap maeo thuk saam deuan|医生给猫每三个月用一次的驱虫药。|用药
yaa-yaawt-huu|ยาหยอดหู|yaa yaawt huu|耳滴药|名词|兽医看诊|แมวต้องใช้ยาหยอดหูวันละสองครั้งหลังอาหาร|maeo dtawng chai yaa yaawt huu wan la saawng khrang lang aa-haan|猫要在饭后每天用两次耳滴药。|用药
yaa-thaa-phlae|ยาทาแผล|yaa thaa phlae|伤口药膏|名词|兽医看诊|หมอให้ยาทาแผลเพราะหมาขาหน้าถลอก|maaw hai yaa thaa phlae phraw maa khaa naa tha-laawk|医生给了伤口药膏，因为狗前腿擦伤了。|用药
sat-bpuai|สัตว์ป่วย|sat bpuai|动物生病|短语|兽医看诊|เมื่อสัตว์ป่วย เจ้าของควรดูอาการใกล้ชิด|meua sat bpuai jao-khaawng khuan duu aa-gaan glai-chit|动物生病时，主人应该密切观察症状。|健康
maa-mii-khai|หมามีไข้|maa mii khai|狗发烧|短语|兽医看诊|หมามีไข้และไม่กินข้าวตั้งแต่เช้า|maa mii khai lae mai gin khaao dtang-dtae chaao|狗从早上开始发烧且不吃饭。|健康
maeo-aa-jiian|แมวอาเจียน|maeo aa-jiian|猫呕吐|短语|兽医看诊|ถ้าแมวอาเจียนหลายครั้ง ต้องโทรถามสัตวแพทย์|thaa maeo aa-jiian laai khrang dtawng thoo thaam sat-dta-waet|如果猫呕吐多次，要打电话问兽医。|健康
maa-thaawng-siia|หมาท้องเสีย|maa thaawng siia|狗拉肚子|短语|兽医看诊|หมาท้องเสียหลังจากกินอาหารใหม่เมื่อวาน|maa thaawng siia lang-jaak gin aa-haan mai meua-waan|狗昨天吃了新食物后拉肚子。|健康
sat-mai-sabaaai|สัตว์ไม่สบาย|sat mai sa-baai|动物不舒服|短语|兽医看诊|ถ้าสัตว์ไม่สบาย อย่าให้ยาคนเอง|thaa sat mai sa-baai yaa hai yaa khon eeng|如果动物不舒服，不要自行给人用药。|健康
du-aa-gaan-sat|ดูอาการสัตว์|duu aa-gaan sat|观察动物症状|动词|兽医看诊|หมอบอกให้ดูอาการสัตว์อีกหนึ่งคืน|maaw baawk hai duu aa-gaan sat iik neung kheun|医生说再观察动物一晚。|健康
ao-sat-khao-gra-bpao|เอาสัตว์เข้ากระเป๋า|ao sat khao gra-bpao|把动物放进宠物包|动词|兽医看诊|ก่อนไปคลินิก ต้องเอาแมวเข้ากระเป๋าให้เรียบร้อย|gaawn bpai khli-nik dtawng ao maeo khao gra-bpao hai riap-raawy|去诊所前，要把猫妥善放进宠物包。|出行
gra-bpao-sat|กระเป๋าสัตว์|gra-bpao sat|宠物包|名词|宠物用品|กระเป๋าสัตว์ใบนี้มีช่องระบายอากาศหลายช่อง|gra-bpao sat bai nii mii chaawng ra-baai aa-gaat laai chaawng|这个宠物包有很多通风口。|用品
grong-sat|กรงสัตว์|grong sat|动物笼子|名词|宠物用品|กรงสัตว์ควรใหญ่พอให้กระต่ายขยับตัวได้|grong sat khuan yai phaaw hai gra-dtaai kha-yap dtua dai|动物笼子应该大到足够兔子活动。|用品
khum-phaa-grong-sat|คลุมผ้ากรงสัตว์|khum phaa grong sat|用布盖宠物笼|动词|基础照顾|ตอนกลางคืนฉันคลุมผ้ากรงสัตว์ให้บังลม|dtaawn glaang-kheun chan khum phaa grong sat hai bang lom|晚上我用布盖宠物笼来挡风。|照顾
thii-naawn-sat|ที่นอนสัตว์|thii naawn sat|宠物窝|名词|宠物用品|ที่นอนสัตว์ต้องซักเมื่อมีกลิ่นหรือขนเยอะ|thii naawn sat dtawng sak meua mii glin reu khon yoe|宠物窝有味道或毛很多时要洗。|用品
pha-puu-sat|ผ้าปูสัตว์|phaa bpuu sat|宠物垫布|名词|宠物用品|แมวชอบนอนบนผ้าปูสัตว์สีเทา|maeo chaawp naawn bon phaa bpuu sat sii thao|猫喜欢睡在灰色宠物垫布上。|用品
khaawng-len-sat|ของเล่นสัตว์|khaawng-len sat|宠物玩具|名词|宠物用品|ของเล่นสัตว์ช่วยให้หมาไม่เบื่อเวลาอยู่บ้าน|khaawng-len sat chuai hai maa mai beua wee-laa yuu baan|宠物玩具能帮助狗在家时不无聊。|用品
luuk-baawn-maa|ลูกบอลหมา|luuk baawn maa|狗球玩具|名词|宠物用品|หมาวิ่งไปเก็บลูกบอลหมาแล้วเอากลับมาให้ฉัน|maa wing bpai gep luuk baawn maa laeo ao glap maa hai chan|狗跑去捡狗球玩具，然后拿回来给我。|玩具
mai-len-maeo|ไม้เล่นแมว|maai len maeo|逗猫棒|名词|宠物用品|ลูกแมวชอบกระโดดตามไม้เล่นแมวมาก|luuk maeo chaawp gra-doot dtaam maai len maeo maak|小猫很喜欢跟着逗猫棒跳。|玩具
saai-juung-maa|สายจูงหมา|saai juung maa|狗牵引绳|名词|遛狗外出|เวลาออกนอกบ้านต้องใส่สายจูงหมาเสมอ|wee-laa aawk naawk baan dtawng sai saai juung maa sa-moe|出门时必须总是给狗戴牵引绳。|遛狗
plaawk-khaaw|ปลอกคอ|bplaawk khaaw|项圈|名词|宠物用品|ปลอกคอของหมามีชื่อและเบอร์โทรเจ้าของ|bplaawk khaaw khaawng maa mii cheu lae ber thoo jao-khaawng|狗项圈上有主人的名字和电话。|用品
phaa-maa-bpai-doen-len|พาหมาไปเดินเล่น|phaa maa bpai doen len|带狗去散步|动词|遛狗外出|ทุกเย็นพี่ชายพาหมาไปเดินเล่นที่สวน|thuk yen phii-chaai phaa maa bpai doen len thii suan|每天傍晚哥哥带狗去公园散步。|遛狗
doen-len-gab-maa|เดินเล่นกับหมา|doen len gap maa|和狗散步|动词|遛狗外出|ฉันเดินเล่นกับหมารอบหมู่บ้านประมาณครึ่งชั่วโมง|chan doen len gap maa raawp muu-baan bpra-maan khreung chua-moong|我和狗绕小区散步大约半小时。|遛狗
saun-sat-liiang|สวนสัตว์เลี้ยง|suan sat liiang|宠物活动区|名词|遛狗外出|คอนโดมีสวนสัตว์เลี้ยงเล็ก ๆ หลังตึก|khaawn-doo mii suan sat liiang lek lek lang dteuk|公寓楼后面有一个小宠物活动区。|遛狗
gep-ii-maa|เก็บอึหมา|gep eu maa|捡狗便便|动词|清洁卫生|เจ้าของต้องเก็บอึหมาเมื่อพาหมาเดินในสวน|jao-khaawng dtawng gep eu maa meua phaa maa doen nai suan|主人带狗在公园走时必须捡狗便便。|清洁
thung-ii-sat|ถุงอึสัตว์|thung eu sat|宠物便便袋|名词|宠物用品|ฉันพกถุงอึสัตว์ทุกครั้งที่พาหมาออกไป|chan phok thung eu sat thuk khrang thii phaa maa aawk bpai|我每次带狗出去都会带宠物便便袋。|清洁
maa-ngawng|หมาเห่า|maa hao|狗叫|短语|动物行为|หมาเห่าเสียงดังเมื่อมีคนกดกริ่งหน้าบ้าน|maa hao siiang dang meua mii khon got gring naa baan|有人按门铃时，狗大声叫。|行为
maeo-raawng|แมวร้อง|maeo raawng|猫叫|短语|动物行为|แมวร้องตอนหิวและเดินมาที่ถ้วยอาหาร|maeo raawng dtaawn hiu lae doen maa thii thuai aa-haan|猫饿的时候叫，并走到食盆旁。|行为
maa-gat|หมากัด|maa gat|狗咬|短语|动物行为|อย่าเข้าใกล้หมาแปลกหน้า เพราะมันอาจกัด|yaa khao glai maa bplaek naa phraw man aat gat|不要靠近陌生狗，因为它可能会咬。|安全
maeo-khuan|แมวข่วน|maeo khuan|猫抓|短语|动物行为|แมวข่วนแขนฉันเพราะมันตกใจเสียงดัง|maeo khuan khaen chan phraw man dtok-jai siiang dang|猫因为被大声吓到，抓了我的胳膊。|安全
maa-due|หมาดื้อ|maa deu|狗调皮不听话|短语|动物行为|หมาดื้อไม่ยอมกลับบ้านหลังเดินเล่น|maa deu mai yaawm glap baan lang doen len|狗散步后调皮不肯回家。|行为
maeo-kliat-naam|แมวเกลียดน้ำ|maeo gliiat naam|猫讨厌水|短语|动物行为|แมวเกลียดน้ำมาก จึงอาบน้ำยาก|maeo gliiat naam maak jeung aap naam yaak|猫很讨厌水，所以洗澡很难。|行为
maa-glua-faa|หมากลัวฟ้า|maa glua faa|狗怕雷|短语|动物行为|หมากลัวฟ้าร้องและชอบหลบใต้โต๊ะ|maa glua faa-raawng lae chaawp lop dtai dto|狗怕打雷，喜欢躲在桌子下面。|行为
sat-dtok-jai|สัตว์ตกใจ|sat dtok-jai|动物受惊|短语|动物行为|สัตว์ตกใจง่ายเมื่อมีเสียงประทัดใกล้บ้าน|sat dtok-jai ngaai meua mii siiang bpra-that glai baan|家附近有鞭炮声时，动物容易受惊。|行为
sat-ngoang|สัตว์ง่วง|sat nguang|动物困了|短语|动物行为|หลังเล่นนาน สัตว์ง่วงและนอนบนที่นอนของมัน|lang len naan sat nguang lae naawn bon thii naawn khaawng man|玩久后，动物困了，睡在自己的窝上。|行为
sat-hai-jai-raeng|สัตว์หายใจแรง|sat haai-jai raaeng|动物呼吸急促|短语|兽医看诊|ถ้าสัตว์หายใจแรงผิดปกติ ต้องรีบไปหาหมอ|thaa sat haai-jai raaeng phit bpok-ga-dti dtawng riip bpai haa maaw|如果动物异常呼吸急促，要赶紧去看医生。|健康
sat-nawn-yu-neng|สัตว์นอนอยู่นิ่ง|sat naawn yuu ning|动物躺着不动|短语|兽医看诊|แมวนอนอยู่นิ่งทั้งวันและไม่เล่นเหมือนเดิม|maeo naawn yuu ning thang wan lae mai len meuan doem|猫一整天躺着不动，也不像以前那样玩。|健康
duu-lae-khon-sat|ดูแลขนสัตว์|duu-laae khon sat|护理动物毛发|动词|清洁卫生|เจ้าของควรดูแลขนสัตว์ไม่ให้พันกัน|jao-khaawng khuan duu-laae khon sat mai hai phan gan|主人应该护理动物毛发，不让毛打结。|清洁
khon-ruang|ขนร่วง|khon ruang|掉毛|短语|清洁卫生|ช่วงหน้าร้อนแมวขนร่วงมากกว่าปกติ|chuang naa raawn maeo khon ruang maak gwaa bpok-ga-dti|热季猫比平常掉毛更多。|毛发
bprang-khon|แปรงขน|bpraeng khon|梳毛|动词|清洁卫生|ฉันแปรงขนให้หมาทุกเย็นหลังเดินเล่น|chan bpraeng khon hai maa thuk yen lang doen len|我每天傍晚遛狗后给狗梳毛。|毛发
wi-khon-sat|หวีขนสัตว์|wii khon sat|宠物梳子|名词|宠物用品|หวีขนสัตว์อันนี้ใช้กับแมวขนยาวได้ดี|wii khon sat an nii chai gap maeo khon yaao dai dii|这把宠物梳子适合长毛猫。|用品
aap-naam-maa|อาบน้ำหมา|aap naam maa|给狗洗澡|动词|清洁卫生|วันเสาร์นี้ฉันจะอาบน้ำหมาและตัดเล็บให้มัน|wan-sao nii chan ja aap naam maa lae dtat lep hai man|这周六我要给狗洗澡并剪指甲。|清洁
saepuu-sat|แชมพูสัตว์|chaem-phuu sat|宠物洗毛液|名词|宠物用品|อย่าใช้แชมพูคน ควรใช้แชมพูสัตว์เท่านั้น|yaa chai chaem-phuu khon khuan chai chaem-phuu sat thao-nan|不要用人的洗发水，应该只用宠物洗毛液。|用品
dtat-lep-sat|ตัดเล็บสัตว์|dtat lep sat|给动物剪指甲|动词|清洁卫生|ถ้าไม่กล้าตัดเล็บสัตว์เอง ให้ร้านช่วยได้|thaa mai glaa dtat lep sat eeng hai raan chuai dai|如果不敢自己给动物剪指甲，可以让店里帮忙。|清洁
lep-yaao|เล็บยาว|lep yaao|指甲长|短语|清洁卫生|เล็บยาวเกินไปอาจข่วนพื้นและข่วนคน|lep yaao goen bpai aat khuan pheun lae khuan khon|指甲太长可能抓地板和抓人。|清洁
tham-khwaam-sa-aat-grong|ทำความสะอาดกรง|tham khwaam-sa-aat grong|清洁笼子|动词|清洁卫生|เราทำความสะอาดกรงกระต่ายทุกเช้าวันอาทิตย์|rao tham khwaam-sa-aat grong gra-dtaai thuk chaao wan aa-thit|我们每周日早上清洁兔笼。|清洁
laang-thueai|ล้างถ้วย|laang thuai|洗碗盆|动词|清洁卫生|หลังสัตว์กินเสร็จ ควรล้างถ้วยด้วยน้ำสะอาด|lang sat gin set khuan laang thuai duai naam sa-aat|动物吃完后，应该用干净水洗碗盆。|清洁
glin-sat|กลิ่นสัตว์|glin sat|动物气味|名词|清洁卫生|ถ้าไม่ล้างที่นอน จะมีกลิ่นสัตว์ในห้อง|thaa mai laang thii naawn ja mii glin sat nai haawng|如果不洗宠物窝，房间里会有动物气味。|清洁
sai-saa-aad|ทรายสะอาด|saai sa-aat|干净猫砂|名词|清洁卫生|แมวชอบทรายสะอาดและไม่มีกลิ่นแรง|maeo chaawp saai sa-aat lae mai mii glin raaeng|猫喜欢干净且味道不重的猫砂。|猫砂
gra-ba-sai-maeo|กระบะทรายแมว|gra-ba saai maeo|猫砂盆|名词|宠物用品|กระบะทรายแมวควรวางในที่เงียบและแห้ง|gra-ba saai maeo khuan waang nai thii ngiiap lae haaeng|猫砂盆应该放在安静干燥的地方。|用品
dtak-sai-maeo|ตักทรายแมว|dtak saai maeo|铲猫砂|动词|清洁卫生|ฉันตักทรายแมววันละสองครั้งเพื่อลดกลิ่น|chan dtak saai maeo wan la saawng khrang phuea lot glin|我每天铲两次猫砂来减少气味。|猫砂
bplian-sai-maeo|เปลี่ยนทรายแมว|bplian saai maeo|换猫砂|动词|清洁卫生|ควรเปลี่ยนทรายแมวเมื่อทรายเริ่มมีกลิ่น|khuan bplian saai maeo meua saai roem mii glin|猫砂开始有味道时应该更换。|猫砂
khum-grong|คลุมกรง|khum grong|盖住笼子|动词|基础照顾|กลางคืนเจ้าของใช้ผ้าบาง ๆ คลุมกรงนก|glaang-kheun jao-khaawng chai phaa baang baang khum grong nok|晚上主人用薄布盖住鸟笼。|照顾
waang-grong-nai-rom|วางกรงในร่ม|waang grong nai rom|把笼子放在阴处|动词|基础照顾|หน้าร้อนควรวางกรงในร่มและมีลมผ่าน|naa raawn khuan waang grong nai rom lae mii lom phaan|热季应该把笼子放在阴处并通风。|照顾
phaa-sat-aawk-daet|พาสัตว์ออกแดด|phaa sat aawk daet|带动物晒太阳|动词|基础照顾|ตอนเช้าเราพากระต่ายออกแดดอ่อน ๆ สิบนาที|dtaawn chaao rao phaa gra-dtaai aawk daet aawn aawn sip naa-thii|早上我们带兔子晒十分钟柔和的太阳。|照顾
haam-hai-gin|ห้ามให้กิน|haam hai gin|禁止喂食|短语|喂养饮水|ช็อกโกแลตห้ามให้หมากินเพราะอันตราย|chok-go-laet haam hai maa gin phraw an-dta-raai|巧克力禁止喂给狗，因为危险。|安全
sat-an-dta-raai|สัตว์อันตราย|sat an-dta-raai|危险动物|名词|宠物动物|อย่าเข้าใกล้สัตว์อันตรายหรือสัตว์ที่ไม่รู้จัก|yaa khao glai sat an-dta-raai reu sat thii mai ruu-jak|不要靠近危险动物或不认识的动物。|安全
sat-laek-naa|สัตว์แปลกหน้า|sat bplaek naa|陌生动物|名词|宠物动物|เด็กไม่ควรจับสัตว์แปลกหน้าโดยไม่ถามผู้ใหญ่|dek mai khuan jap sat bplaek naa dooi mai thaam phuu-yai|孩子不应该没问大人就摸陌生动物。|安全
jap-sat|จับสัตว์|jap sat|摸动物|动词|宠物动物|ก่อนจับสัตว์ ต้องถามเจ้าของก่อนทุกครั้ง|gaawn jap sat dtawng thaam jao-khaawng gaawn thuk khrang|摸动物前，每次都要先问主人。|安全
yu-glai-sat|อยู่ใกล้สัตว์|yuu glai sat|靠近动物|动词|宠物动物|เด็กเล็กควรมีผู้ใหญ่ดูเมื่ออยู่ใกล้สัตว์|dek lek khuan mii phuu-yai duu meua yuu glai sat|小孩靠近动物时应该有大人看着。|安全
yao-sat|หยอกสัตว์|yaawk sat|逗动物|动词|动物行为|อย่าหยอกสัตว์แรงเกินไป เพราะมันอาจตกใจ|yaa yaawk sat raaeng goen bpai phraw man aat dtok-jai|不要太用力逗动物，因为它可能受惊。|行为
sat-chin-khon|สัตว์ชินคน|sat chin khon|动物亲人|短语|动物行为|แมวตัวนี้ชินคนและชอบนั่งใกล้แขก|maeo dtua nii chin khon lae chaawp nang glai khaek|这只猫很亲人，喜欢坐在客人旁边。|行为
sat-klua-khon|สัตว์กลัวคน|sat glua khon|动物怕人|短语|动物行为|ลูกแมวที่เพิ่งรับมายังกลัวคนและชอบหลบ|luuk maeo thii phoeng rap maa yang glua khon lae chaawp lop|刚领来的小猫还怕人，喜欢躲。|行为
maa-chuai-fang|หมาเชื่อฟัง|maa cheua-fang|狗听话|短语|动物行为|หมาเชื่อฟังเมื่อเจ้าของเรียกให้กลับมา|maa cheua-fang meua jao-khaawng riiak hai glap maa|主人叫狗回来时，狗很听话。|训练
feuk-maa|ฝึกหมา|feuk maa|训练狗|动词|动物行为|พี่ชายฝึกหมาให้นั่งก่อนกินอาหาร|phii-chaai feuk maa hai nang gaawn gin aa-haan|哥哥训练狗在吃饭前坐下。|训练
riiak-cheu-sat|เรียกชื่อสัตว์|riiak cheu sat|叫动物名字|动词|动物行为|เมื่อเรียกชื่อสัตว์บ่อย ๆ มันจะเริ่มจำได้|meua riiak cheu sat baawy baawy man ja roem jam dai|经常叫动物名字，它会开始记住。|训练
sat-ruu-cheu|สัตว์รู้ชื่อ|sat ruu cheu|动物认得名字|短语|动物行为|แมวรู้ชื่อของตัวเองและหันมามองเมื่อเราเรียก|maeo ruu cheu khaawng dtua-eeng lae han maa maawng meua rao riiak|猫认得自己的名字，我们叫时会转头看。|训练
sat-lon-haai|สัตว์หล่นหาย|sat lon haai|宠物走丢|短语|基础照顾|ถ้าสัตว์หล่นหาย ให้ติดป้ายและแจ้งเพื่อนบ้าน|thaa sat lon haai hai dtit bpaai lae jaeng pheuan-baan|如果宠物走丢，要贴寻物启事并通知邻居。|安全
sat-haai|สัตว์หาย|sat haai|宠物丢了|短语|基础照顾|แมวหายตั้งแต่เช้า เจ้าของจึงเดินหาทั่วซอย|maeo haai dtang-dtae chaao jao-khaawng jeung doen haa thua saawy|猫从早上起就不见了，主人于是走遍巷子寻找。|安全
bpai-rap-sat|ไปรับสัตว์|bpai rap sat|去接宠物|动词|基础照顾|เย็นนี้ฉันไปรับหมาที่ร้านอาบน้ำสัตว์|yen nii chan bpai rap maa thii raan aap naam sat|今晚我要去宠物洗澡店接狗。|照顾
faak-sat|ฝากสัตว์|faak sat|寄养宠物|动词|基础照顾|เวลาไปต่างจังหวัด เราฝากสัตว์ไว้กับเพื่อนบ้าน|wee-laa bpai dtaang-jang-wat rao faak sat wai gap pheuan-baan|去外府时，我们把宠物寄养在邻居家。|照顾
raan-faak-sat|ร้านฝากสัตว์|raan faak sat|宠物寄养店|名词|基础照顾|ร้านฝากสัตว์นี้ส่งรูปหมาให้เจ้าของทุกวัน|raan faak sat nii song ruup maa hai jao-khaawng thuk wan|这家宠物寄养店每天给主人发狗的照片。|照顾
raan-aap-naam-sat|ร้านอาบน้ำสัตว์|raan aap naam sat|宠物洗澡店|名词|清洁卫生|ร้านอาบน้ำสัตว์อยู่ใกล้คลินิกสัตว์|raan aap naam sat yuu glai khli-nik sat|宠物洗澡店在动物诊所附近。|清洁
khon-duu-lae-sat|คนดูแลสัตว์|khon duu-laae sat|照看宠物的人|名词|基础照顾|คนดูแลสัตว์ต้องรู้เวลาป้อนยาและให้อาหาร|khon duu-laae sat dtawng ruu wee-laa bpaawn yaa lae hai aa-haan|照看宠物的人要知道喂药和喂食时间。|照顾
bpawn-yaa-sat|ป้อนยาสัตว์|bpaawn yaa sat|给动物喂药|动词|兽医看诊|แมวไม่ยอมกินยา ฉันจึงต้องป้อนยาสัตว์ช้า ๆ|maeo mai yaawm gin yaa chan jeung dtawng bpaawn yaa sat chaa chaa|猫不肯吃药，所以我得慢慢给动物喂药。|用药
hai-yaa-dtaam-we-laa|ให้ยาตามเวลา|hai yaa dtaam wee-laa|按时给药|动词|兽医看诊|หมอบอกให้ให้ยาตามเวลาหลังอาหารเช้าและเย็น|maaw baawk hai hai yaa dtaam wee-laa lang aa-haan chaao lae yen|医生说早晚饭后按时给药。|用药
sat-hai-dii-kheun|สัตว์หายดีขึ้น|sat haai dii kheun|动物好转|短语|兽医看诊|หลังได้ยาแล้ว สัตว์หายดีขึ้นและเริ่มกินข้าว|lang dai yaa laeo sat haai dii kheun lae roem gin khaao|吃药后，动物好转并开始吃饭。|健康
phaa-glap-baan|พากลับบ้าน|phaa glap baan|带回家|动词|基础照顾|หลังหมอตรวจเสร็จ เราพาแมวกลับบ้านทันที|lang maaw dtruat set rao phaa maeo glap baan than-thii|医生检查结束后，我们马上把猫带回家。|照顾
sat-phak-phaawn|สัตว์พักผ่อน|sat phak-phaawn|动物休息|短语|基础照顾|หลังฉีดวัคซีน ควรให้สัตว์พักผ่อนหนึ่งวัน|lang chiit wak-siin khuan hai sat phak-phaawn neung wan|打疫苗后，应该让动物休息一天。|健康
mai-hai-wing-maak|ไม่ให้วิ่งมาก|mai hai wing maak|不要让多跑|短语|基础照顾|หมอบอกไม่ให้วิ่งมากหลังผ่าตัดเล็ก|maaw baawk mai hai wing maak lang phaa-dtat lek|医生说小手术后不要让它多跑。|照顾
du-lae-yaaeng-sat|ดูแลแผลสัตว์|duu-laae phlae sat|照顾动物伤口|动词|兽医看诊|เจ้าของต้องดูแลแผลสัตว์ให้สะอาดทุกวัน|jao-khaawng dtawng duu-laae phlae sat hai sa-aat thuk wan|主人必须每天保持动物伤口干净。|健康
phlae-sat|แผลสัตว์|phlae sat|动物伤口|名词|兽医看诊|แผลสัตว์เล็ก ๆ ควรล้างและทายาตามที่หมอบอก|phlae sat lek lek khuan laang lae thaa yaa dtaam thii maaw baawk|小的动物伤口应该按医生说的清洗并涂药。|健康
sat-len-nam|สัตว์เล่นน้ำ|sat len naam|动物玩水|短语|动物行为|หมาบางตัวชอบเล่นน้ำในอ่างตอนอากาศร้อน|maa baang dtua chaawp len naam nai aang dtaawn aa-gaat raawn|有些狗天气热时喜欢在盆里玩水。|行为
sat-chawp-lop|สัตว์ชอบหลบ|sat chaawp lop|动物喜欢躲|短语|动物行为|แมวใหม่ชอบหลบใต้เตียงเมื่อมีแขกมา|maeo mai chaawp lop dtai dtiiang meua mii khaek maa|新来的猫有客人来时喜欢躲在床下。|行为
sat-chawp-len|สัตว์ชอบเล่น|sat chaawp len|动物喜欢玩|短语|动物行为|ลูกหมาชอบเล่นกับลูกบอลหลังตื่นนอน|luuk maa chaawp len gap luuk baawn lang dteun naawn|小狗睡醒后喜欢玩球。|行为
sat-non-maak|สัตว์นอนมาก|sat naawn maak|动物睡得多|短语|动物行为|แมวแก่นอนมากกว่าแมวเด็กและไม่ค่อยวิ่ง|maeo gae naawn maak gwaa maeo dek lae mai khaawy wing|老猫比小猫睡得多，也不太跑。|行为
sat-kin-naam-noi|สัตว์กินน้ำน้อย|sat gin naam naawy|动物喝水少|短语|喂养饮水|ถ้าสัตว์กินน้ำน้อย ควรเปลี่ยนน้ำให้สดขึ้น|thaa sat gin naam naawy khuan bplian naam hai sot kheun|如果动物喝水少，应该把水换得更新鲜。|饮水
dtid-bpaai-cheu-sat|ติดป้ายชื่อสัตว์|dtit bpaai cheu sat|给宠物挂名牌|动词|宠物用品|เราติดป้ายชื่อสัตว์ไว้ที่ปลอกคอของหมา|rao dtit bpaai cheu sat wai thii bplaawk khaaw khaawng maa|我们把宠物名牌挂在狗的项圈上。|用品
ber-jao-khaawng|เบอร์เจ้าของ|ber jao-khaawng|主人电话|名词|宠物用品|บนปลอกคอมีเบอร์เจ้าของเผื่อหมาหาย|bon bplaawk khaaw mii ber jao-khaawng pheua maa haai|项圈上有主人电话，以防狗丢了。|安全
`;

export const VOCABULARY_EXPANSION_A2_PETS_ANIMALS_DAILY_01: VocabularyExpansionA2PetsAnimalsDailyCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
