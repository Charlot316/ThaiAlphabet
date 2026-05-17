type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "日常物品" | "家具房间" | "衣物用品" | "电子用品" | "清洁用品" | "颜色材质";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA1ObjectsHomeCandidate = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: PartOfSpeech;
  theme: Theme;
  level: "a1";
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

const SOURCE_REFS = ["thai-frequency", "thaipod101-core100", "pythainlp-corpus", "kaikki-wiktionary-thai"];

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

function buildCandidate(row: Row, index: number): VocabularyExpansionA1ObjectsHomeCandidate {
  return {
    id: row.id,
    thai: row.thai,
    roman: row.roman,
    chinese: row.chinese,
    partOfSpeech: row.partOfSpeech,
    theme: row.theme,
    level: "a1",
    priority: index + 1,
    senses: [
      {
        id: "main",
        chinese: row.chinese,
        examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }],
        usageNotesZh: [`${row.thai} 是 A1 日常家居词，常和位置、数量或颜色一起说。`],
      },
    ],
    synonyms: [{ thai: row.relatedThai, roman: row.relatedRoman, chinese: row.relatedChinese }],
    antonyms: [],
    comparisons: [
      {
        kind: "易混",
        target: { thai: row.relatedThai, roman: row.relatedRoman, chinese: row.relatedChinese },
        distinctionZh: `${row.thai} 指“${row.chinese}”；${row.relatedThai} 指“${row.relatedChinese}”，在家居场景中要按物品或用途区分。`,
      },
    ],
    collocations: [{ thai: row.collocationThai, roman: row.collocationRoman, chinese: row.collocationChinese }],
    usageNotesZh: [`适合用于“มี...”“อยู่ที่...”“หยิบ...”等简单句型。`],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
jaan-khaao|จานข้าว|jaan khaao|饭盘；餐盘|名词|日常物品|จานข้าวอยู่บนโต๊ะใกล้แก้วน้ำ|jaan khaao yuu bon dto glai gaaeo naam|饭盘在水杯旁边的桌子上。|ล้างจานข้าว|laang jaan khaao|洗饭盘|ชาม|chaam|碗|餐具
chaam-gaaeng|ชามแกง|chaam gaaeng|汤碗；菜碗|名词|日常物品|แม่วางชามแกงร้อน ๆ ไว้กลางโต๊ะอาหาร|maae waang chaam gaaeng raawn raawn wai glaang dto aa-haan|妈妈把热汤碗放在餐桌中间。|ถือชามแกง|thue chaam gaaeng|拿着汤碗|จานข้าว|jaan khaao|饭盘|餐具
thuuai-gaa-faae|ถ้วยกาแฟ|thuai gaa-faae|咖啡杯|名词|日常物品|ถ้วยกาแฟสีขาวใบนี้เป็นของพ่อ|thuai gaa-faae sii khaao bai nii bpen khaawng phaaw|这个白色咖啡杯是爸爸的。|ถ้วยกาแฟเล็ก|thuai gaa-faae lek|小咖啡杯|แก้วน้ำ|gaaeo naam|水杯|餐具
gaaeo-naam-yen|แก้วน้ำเย็น|gaaeo naam yen|冷水杯|名词|日常物品|เด็ก ๆ ดื่มน้ำจากแก้วน้ำเย็นหลังเล่นนอกบ้าน|dek dek duem naam jaak gaaeo naam yen lang len naawk baan|孩子们在屋外玩后，用冷水杯喝水。|เติมแก้วน้ำเย็น|dterm gaaeo naam yen|给冷水杯加水|ถ้วยกาแฟ|thuai gaa-faae|咖啡杯|餐具
chawn-gaeng|ช้อนแกง|chaawn gaaeng|汤匙；大勺|名词|日常物品|บนโต๊ะมีช้อนแกงสองคันกับจานข้าวสามใบ|bon dto mii chaawn gaaeng saawng khan gap jaan khaao saam bai|桌上有两把汤匙和三个饭盘。|ใช้ช้อนแกง|chai chaawn gaaeng|用汤匙|ช้อนชา|chaawn chaa|茶匙|餐具
chaawn-chaa|ช้อนชา|chaawn chaa|茶匙；小勺|名词|日常物品|ฉันใช้ช้อนชาคนกาแฟตอนเช้า|chan chai chaawn chaa khon gaa-faae dtaawn chaao|我早上用茶匙搅咖啡。|ช้อนชาเล็ก|chaawn chaa lek|小茶匙|ช้อนแกง|chaawn gaaeng|汤匙|餐具
saawm-kin-khaao|ส้อมกินข้าว|saawm gin khaao|吃饭叉子|名词|日常物品|เขาวางส้อมกินข้าวไว้ข้างจานอย่างเรียบร้อย|khao waang saawm gin khaao wai khaang jaan yaang riiap-raawy|他把吃饭叉子整齐地放在盘子旁边。|หยิบส้อมกินข้าว|yip saawm gin khaao|拿吃饭叉子|มีดกินข้าว|miit gin khaao|餐刀|餐具
miit-gin-khaao|มีดกินข้าว|miit gin khaao|餐刀|名词|日常物品|มีดกินข้าวนี้ไม่คมมาก เด็กจึงใช้ได้|miit gin khaao nii mai khom maak dek jeung chai dai|这把餐刀不是很锋利，所以孩子可以用。|วางมีดกินข้าว|waang miit gin khaao|放餐刀|มีดครัว|miit khruua|菜刀|餐具
miit-khruua|มีดครัว|miit khruua|菜刀；厨房刀|名词|日常物品|มีดครัวอยู่ในลิ้นชักสูง เด็กหยิบไม่ได้|miit khruua yuu nai lin-chak suung dek yip mai dai|菜刀在高处抽屉里，孩子拿不到。|เก็บมีดครัว|gep miit khruua|收好菜刀|มีดกินข้าว|miit gin khaao|餐刀|厨房
khaeng-han|เขียงหั่น|khiiang han|砧板|名词|日常物品|ยายล้างเขียงหั่นหลังหั่นผักเสร็จ|yaai laang khiiang han lang han phak set|奶奶切完菜后洗砧板。|วางเขียงหั่น|waang khiiang han|放砧板|มีดครัว|miit khruua|菜刀|厨房
mo-hung-khaao|หม้อหุงข้าว|maw hung khaao|电饭锅|名词|电子用品|หม้อหุงข้าวอยู่มุมครัวและมีข้าวร้อนอยู่ข้างใน|maw hung khaao yuu mum khruua lae mii khaao raawn yuu khaang nai|电饭锅在厨房角落，里面有热饭。|เปิดหม้อหุงข้าว|bpoet maw hung khaao|打开电饭锅|เตาไฟฟ้า|dtao fai-faa|电炉|电器
dtao-fai-faa|เตาไฟฟ้า|dtao fai-faa|电炉；电灶|名词|电子用品|ห้องนี้ไม่มีแก๊ส แต่มีเตาไฟฟ้าเล็ก ๆ|haawng nii mai mii gaaet dtaae mii dtao fai-faa lek lek|这个房间没有燃气，但有一个小电炉。|ใช้เตาไฟฟ้า|chai dtao fai-faa|使用电炉|หม้อหุงข้าว|maw hung khaao|电饭锅|电器
dtuu-yen-lek|ตู้เย็นเล็ก|dtuu yen lek|小冰箱|名词|电子用品|ตู้เย็นเล็กในห้องเก็บนมและผลไม้ไว้ได้|dtuu yen lek nai haawng gep nom lae phon-la-maai wai dai|房间里的小冰箱可以存放牛奶和水果。|เปิดตู้เย็นเล็ก|bpoet dtuu yen lek|打开小冰箱|ตู้กับข้าว|dtuu gap khaao|食品柜|电器
dtuu-gap-khaao|ตู้กับข้าว|dtuu gap khaao|食品柜；碗柜|名词|家具房间|ในตู้กับข้าวมีจาน ชาม และแก้วหลายใบ|nai dtuu gap khaao mii jaan chaam lae gaaeo laai bai|食品柜里有很多盘子、碗和杯子。|ปิดตู้กับข้าว|bpit dtuu gap khaao|关上食品柜|ตู้เย็นเล็ก|dtuu yen lek|小冰箱|家具
dto-aa-haan|โต๊ะอาหาร|dto aa-haan|餐桌|名词|家具房间|ครอบครัวนั่งรอบโต๊ะอาหารตอนเย็น|khraawp-khruua nang raawp dto aa-haan dtaawn yen|家人晚上围坐在餐桌旁。|เช็ดโต๊ะอาหาร|chet dto aa-haan|擦餐桌|โต๊ะเขียนหนังสือ|dto khiian nang-sue|书桌|家具
dto-khiian-nang-sue|โต๊ะเขียนหนังสือ|dto khiian nang-sue|书桌|名词|家具房间|บนโต๊ะเขียนหนังสือมีสมุด ปากกา และโคมไฟ|bon dto khiian nang-sue mii sa-mut bpaak-gaa lae khoom-fai|书桌上有本子、笔和台灯。|จัดโต๊ะเขียนหนังสือ|jat dto khiian nang-sue|整理书桌|โต๊ะอาหาร|dto aa-haan|餐桌|家具
gaao-ii-nang-len|เก้าอี้นั่งเล่น|gao-ii nang len|休闲椅|名词|家具房间|พ่อนั่งอ่านข่าวบนเก้าอี้นั่งเล่นข้างหน้าต่าง|phaaw nang aan khaao bon gao-ii nang len khaang naa-dtaang|爸爸坐在窗边的休闲椅上看新闻。|นั่งเก้าอี้นั่งเล่น|nang gao-ii nang len|坐休闲椅|โซฟาเล็ก|soo-faa lek|小沙发|家具
soo-faa-lek|โซฟาเล็ก|soo-faa lek|小沙发|名词|家具房间|โซฟาเล็กสีเทาอยู่ในห้องนั่งเล่น|soo-faa lek sii thao yuu nai haawng nang len|灰色小沙发在客厅里。|นอนบนโซฟาเล็ก|naawn bon soo-faa lek|躺在小沙发上|เก้าอี้นั่งเล่น|gao-ii nang len|休闲椅|家具
dtuu-suea-phaa|ตู้เสื้อผ้า|dtuu suea-phaa|衣柜|名词|家具房间|ตู้เสื้อผ้าของฉันอยู่ข้างเตียงและมีประตูกระจก|dtuu suea-phaa khaawng chan yuu khaang dtiiang lae mii bpra-dtuu gra-jok|我的衣柜在床边，有玻璃门。|เปิดตู้เสื้อผ้า|bpoet dtuu suea-phaa|打开衣柜|ชั้นวางของ|chan waang khaawng|置物架|家具
chan-waang-khaawng|ชั้นวางของ|chan waang khaawng|置物架|名词|家具房间|ชั้นวางของข้างประตูมีรองเท้าและกระเป๋า|chan waang khaawng khaang bpra-dtuu mii raawng-thaao lae gra-bpao|门旁的置物架上有鞋子和包。|จัดชั้นวางของ|jat chan waang khaawng|整理置物架|ตู้เสื้อผ้า|dtuu suea-phaa|衣柜|家具
lin-chak-lek|ลิ้นชักเล็ก|lin-chak lek|小抽屉|名词|家具房间|ฉันเก็บกุญแจไว้ในลิ้นชักเล็กใต้โต๊ะ|chan gep gun-jaae wai nai lin-chak lek dtai dto|我把钥匙放在桌子下面的小抽屉里。|เปิดลิ้นชักเล็ก|bpoet lin-chak lek|打开小抽屉|กล่องเก็บของ|glaawng gep khaawng|收纳盒|家具
glaawng-gep-khaawng|กล่องเก็บของ|glaawng gep khaawng|收纳盒|名词|日常物品|ในกล่องเก็บของมีสายชาร์จและของเล็ก ๆ หลายอย่าง|nai glaawng gep khaawng mii saai chaat lae khaawng lek lek laai yaang|收纳盒里有充电线和很多小东西。|ใส่กล่องเก็บของ|sai glaawng gep khaawng|放进收纳盒|ลิ้นชักเล็ก|lin-chak lek|小抽屉|收纳
dtiiang-nawn-yai|เตียงนอนใหญ่|dtiiang naawn yai|大床|名词|家具房间|เตียงนอนใหญ่ในห้องแม่มีผ้าห่มสีฟ้า|dtiiang naawn yai nai haawng maae mii phaa-hom sii faa|妈妈房间里的大床有蓝色被子。|จัดเตียงนอนใหญ่|jat dtiiang naawn yai|整理大床|ฟูกนอน|fuuk naawn|床垫|家具
fuuk-nawn|ฟูกนอน|fuuk naawn|床垫|名词|家具房间|ฟูกนอนนุ่มมาก เด็ก ๆ ชอบนอนเล่นบนฟูกนี้|fuuk naawn num maak dek dek chaawp naawn len bon fuuk nii|床垫很软，孩子们喜欢在这个床垫上躺着玩。|เปลี่ยนฟูกนอน|bpliian fuuk naawn|换床垫|เตียงนอนใหญ่|dtiiang naawn yai|大床|家具
mawn-nawn|หมอนนอน|maawn naawn|睡觉枕头|名词|日常物品|หมอนนอนใบนี้สูงไป ฉันจึงนอนไม่ค่อยสบาย|maawn naawn bai nii suung bpai chan jeung naawn mai khaawy sa-baai|这个枕头太高，所以我睡得不太舒服。|ซักปลอกหมอนนอน|sak bplaawk maawn naawn|洗枕套|ผ้าห่มบาง|phaa-hom baang|薄被|床上用品
phaa-hom-baang|ผ้าห่มบาง|phaa-hom baang|薄被|名词|日常物品|คืนนี้ไม่หนาวมาก ฉันใช้ผ้าห่มบางก็พอ|khuen-nii mai naao maak chan chai phaa-hom baang gaw phaaw|今晚不太冷，我用薄被就够了。|พับผ้าห่มบาง|phap phaa-hom baang|叠薄被|หมอนนอน|maawn naawn|睡觉枕头|床上用品
phaa-bpuu-dtiiang|ผ้าปูเตียง|phaa bpuu dtiiang|床单|名词|日常物品|แม่เปลี่ยนผ้าปูเตียงสีขาวทุกวันเสาร์|maae bpliian phaa bpuu dtiiang sii khaao thuk wan-sao|妈妈每周六换白色床单。|ซักผ้าปูเตียง|sak phaa bpuu dtiiang|洗床单|ปลอกหมอน|bplaawk maawn|枕套|床上用品
bplaawk-maawn|ปลอกหมอน|bplaawk maawn|枕套|名词|日常物品|ปลอกหมอนลายดอกไม้เข้ากับผ้าปูเตียง|bplaawk maawn laai daawk-maai khao gap phaa bpuu dtiiang|花纹枕套和床单很配。|เปลี่ยนปลอกหมอน|bpliian bplaawk maawn|换枕套|ผ้าปูเตียง|phaa bpuu dtiiang|床单|床上用品
haawng-nang-len|ห้องนั่งเล่น|haawng nang len|客厅|名词|家具房间|ตอนเย็นทุกคนดูทีวีในห้องนั่งเล่นด้วยกัน|dtaawn yen thuk khon duu thii-wii nai haawng nang len duai gan|傍晚大家一起在客厅看电视。|ทำความสะอาดห้องนั่งเล่น|tham khwaam sa-aat haawng nang len|打扫客厅|ห้องนอน|haawng naawn|卧室|房间
haawng-nawn-lek|ห้องนอนเล็ก|haawng naawn lek|小卧室|名词|家具房间|ห้องนอนเล็กของลูกมีเตียง โต๊ะ และตู้เสื้อผ้า|haawng naawn lek khaawng luuk mii dtiiang dto lae dtuu suea-phaa|孩子的小卧室有床、桌子和衣柜。|จัดห้องนอนเล็ก|jat haawng naawn lek|整理小卧室|ห้องนั่งเล่น|haawng nang len|客厅|房间
haawng-khruua-lek|ห้องครัวเล็ก|haawng khruua lek|小厨房|名词|家具房间|ห้องครัวเล็กนี้มีตู้เย็นและเตาไฟฟ้า|haawng khruua lek nii mii dtuu-yen lae dtao fai-faa|这个小厨房有冰箱和电炉。|ล้างพื้นห้องครัวเล็ก|laang phuen haawng khruua lek|洗小厨房地板|ห้องกินข้าว|haawng gin khaao|饭厅|房间
haawng-gin-khaao|ห้องกินข้าว|haawng gin khaao|饭厅；吃饭的房间|名词|家具房间|บ้านยายมีห้องกินข้าวเล็ก ๆ ข้างห้องครัว|baan yaai mii haawng gin khaao lek lek khaang haawng khruua|奶奶家厨房旁边有一个小饭厅。|โต๊ะในห้องกินข้าว|dto nai haawng gin khaao|饭厅里的桌子|ห้องครัวเล็ก|haawng khruua lek|小厨房|房间
haawng-ap-naam|ห้องอาบน้ำ|haawng aap naam|浴室|名词|家具房间|ในห้องอาบน้ำมีผ้าเช็ดตัวและสบู่|nai haawng aap naam mii phaa-chet-dtua lae sa-buu|浴室里有毛巾和肥皂。|ล้างห้องอาบน้ำ|laang haawng aap naam|清洗浴室|ห้องน้ำ|haawng naam|洗手间|房间
naa-dtaang-yai|หน้าต่างใหญ่|naa-dtaang yai|大窗户|名词|家具房间|หน้าต่างใหญ่ทำให้ห้องนั่งเล่นสว่างมาก|naa-dtaang yai tham hai haawng nang len sa-waang maak|大窗户让客厅很亮。|เปิดหน้าต่างใหญ่|bpoet naa-dtaang yai|打开大窗户|ประตูกระจก|bpra-dtuu gra-jok|玻璃门|房间
bpra-dtuu-gra-jok|ประตูกระจก|bpra-dtuu gra-jok|玻璃门|名词|家具房间|ประตูกระจกหน้าบ้านสะอาดและมองเห็นสวนได้|bpra-dtuu gra-jok naa baan sa-aat lae maawng-hen suan dai|屋前的玻璃门很干净，可以看见花园。|ปิดประตูกระจก|bpit bpra-dtuu gra-jok|关玻璃门|หน้าต่างใหญ่|naa-dtaang yai|大窗户|房间
phuen-maai|พื้นไม้|phuen maai|木地板|名词|颜色材质|พื้นไม้ในห้องนอนเย็นสบายเมื่อเดินเท้าเปล่า|phuen maai nai haawng naawn yen sa-baai muea doen thaao-bplaao|卧室的木地板赤脚走起来凉爽舒服。|เช็ดพื้นไม้|chet phuen maai|擦木地板|พื้นกระเบื้อง|phuen gra-beuuang|瓷砖地板|材质
phuen-gra-beuuang|พื้นกระเบื้อง|phuen gra-beuuang|瓷砖地板|名词|颜色材质|พื้นกระเบื้องในห้องครัวล้างง่ายกว่าเสื่อ|phuen gra-beuuang nai haawng khruua laang ngaai gwaa suea|厨房瓷砖地板比垫子更容易清洗。|ถูพื้นกระเบื้อง|thuu phuen gra-beuuang|拖瓷砖地板|พื้นไม้|phuen maai|木地板|材质
phaa-maan|ผ้าม่าน|phaa-maan|窗帘|名词|日常物品|ตอนเช้าแม่เปิดผ้าม่านให้แสงเข้าห้อง|dtaawn chaao maae bpoet phaa-maan hai saaeng khao haawng|早上妈妈拉开窗帘，让光进房间。|ปิดผ้าม่าน|bpit phaa-maan|拉上窗帘|ผ้าปูโต๊ะ|phaa bpuu dto|桌布|布料
phaa-bpuu-dto|ผ้าปูโต๊ะ|phaa bpuu dto|桌布|名词|日常物品|ผ้าปูโต๊ะลายสีเขียวทำให้โต๊ะอาหารดูสะอาด|phaa bpuu dto laai sii khiaao tham hai dto aa-haan duu sa-aat|绿色花纹桌布让餐桌看起来很干净。|เปลี่ยนผ้าปูโต๊ะ|bpliian phaa bpuu dto|换桌布|ผ้าม่าน|phaa-maan|窗帘|布料
khom-fai-dto|โคมไฟโต๊ะ|khoom-fai dto|台灯|名词|电子用品|โคมไฟโต๊ะช่วยให้ฉันอ่านหนังสือตอนกลางคืนได้|khoom-fai dto chuai hai chan aan nang-sue dtaawn glaang-khuen dai|台灯帮助我晚上看书。|เปิดโคมไฟโต๊ะ|bpoet khoom-fai dto|打开台灯|ไฟเพดาน|fai phee-daan|顶灯|电器
fai-phee-daan|ไฟเพดาน|fai phee-daan|顶灯|名词|电子用品|ไฟเพดานในห้องครัวสว่างกว่าห้องนอน|fai phee-daan nai haawng khruua sa-waang gwaa haawng naawn|厨房的顶灯比卧室的亮。|ปิดไฟเพดาน|bpit fai phee-daan|关顶灯|โคมไฟโต๊ะ|khoom-fai dto|台灯|电器
bplak-fai|ปลั๊กไฟ|bplak fai|电源插座；插头|名词|电子用品|ปลั๊กไฟอยู่หลังโซฟา เด็กจึงมองไม่เห็น|bplak fai yuu lang soo-faa dek jeung maawng mai hen|电源插座在沙发后面，所以孩子看不见。|เสียบปลั๊กไฟ|siap bplak fai|插电源|สายไฟ|saai fai|电线|电器
saai-fai|สายไฟ|saai fai|电线|名词|电子用品|อย่าวางสายไฟกลางพื้น เพราะคนอาจสะดุดได้|yaa waang saai fai glaang phuen phraw khon aat sa-dut dai|不要把电线放在地中间，因为人可能会绊倒。|เก็บสายไฟ|gep saai fai|收好电线|ปลั๊กไฟ|bplak fai|电源插座|电器
saai-chaat|สายชาร์จ|saai chaat|充电线|名词|电子用品|สายชาร์จของฉันอยู่ในกระเป๋าสีดำ|saai chaat khaawng chan yuu nai gra-bpao sii dam|我的充电线在黑色包里。|หาสายชาร์จ|haa saai chaat|找充电线|ที่ชาร์จ|thii chaat|充电器|电器
thii-chaat|ที่ชาร์จ|thii chaat|充电器|名词|电子用品|ที่ชาร์จอันนี้ใช้กับโทรศัพท์ของพี่ได้|thii chaat an nii chai gap thoo-ra-sap khaawng phii dai|这个充电器可以和哥哥的手机一起用。|เสียบที่ชาร์จ|siap thii chaat|插上充电器|สายชาร์จ|saai chaat|充电线|电器
rii-moot-thii-wii|รีโมตทีวี|rii-moot thii-wii|电视遥控器|名词|电子用品|รีโมตทีวีอยู่ใต้หมอนบนโซฟาเล็ก|rii-moot thii-wii yuu dtai maawn bon soo-faa lek|电视遥控器在小沙发上的枕头下面。|กดรีโมตทีวี|got rii-moot thii-wii|按电视遥控器|ทีวี|thii-wii|电视|电器
phat-lom-dto|พัดลมตั้งโต๊ะ|phat-lom dtang dto|桌上风扇|名词|电子用品|พัดลมตั้งโต๊ะตัวเล็กอยู่ข้างคอมพิวเตอร์|phat-lom dtang dto dtua lek yuu khaang khaawm-phiu-dtoe|小桌上风扇在电脑旁边。|เปิดพัดลมตั้งโต๊ะ|bpoet phat-lom dtang dto|打开桌上风扇|พัดลมตั้งพื้น|phat-lom dtang phuen|落地风扇|电器
phat-lom-dtang-phuen|พัดลมตั้งพื้น|phat-lom dtang phuen|落地风扇|名词|电子用品|พัดลมตั้งพื้นในห้องนั่งเล่นสูงกว่าพัดลมตั้งโต๊ะ|phat-lom dtang phuen nai haawng nang len suung gwaa phat-lom dtang dto|客厅里的落地风扇比桌上风扇高。|ย้ายพัดลมตั้งพื้น|yaai phat-lom dtang phuen|移动落地风扇|พัดลมตั้งโต๊ะ|phat-lom dtang dto|桌上风扇|电器
khreuuang-sak-phaa|เครื่องซักผ้า|khreuuang sak phaa|洗衣机|名词|电子用品|เครื่องซักผ้าอยู่หลังบ้านใกล้ถังน้ำ|khreuuang sak phaa yuu lang baan glai thang naam|洗衣机在屋后靠近水桶的地方。|ใช้เครื่องซักผ้า|chai khreuuang sak phaa|使用洗衣机|ตะกร้าผ้า|dta-graa phaa|洗衣篮|电器
dta-graa-phaa|ตะกร้าผ้า|dta-graa phaa|洗衣篮|名词|日常物品|ใส่เสื้อผ้าสกปรกไว้ในตะกร้าผ้าก่อนซัก|sai suea-phaa so-gbpra-gok wai nai dta-graa phaa gaawn sak|洗衣前把脏衣服放进洗衣篮。|ยกตะกร้าผ้า|yok dta-graa phaa|提洗衣篮|เครื่องซักผ้า|khreuuang sak phaa|洗衣机|清洁
mai-khwaaen-suea|ไม้แขวนเสื้อ|mai khwaaen suea|衣架|名词|衣物用品|เสื้อเชิ้ตสีฟ้าแขวนอยู่บนไม้แขวนเสื้อ|suea-choet sii faa khwaaen yuu bon mai-khwaaen-suea|蓝色衬衫挂在衣架上。|แขวนไม้แขวนเสื้อ|khwaaen mai-khwaaen-suea|挂衣架|ราวตากผ้า|raao dtaak phaa|晾衣杆|衣物
raao-dtaak-phaa|ราวตากผ้า|raao dtaak phaa|晾衣杆|名词|衣物用品|ราวตากผ้าอยู่หน้าบ้านและมีเสื้อหลายตัว|raao dtaak phaa yuu naa baan lae mii suea laai dtua|晾衣杆在屋前，上面有好几件衣服。|ใช้ราวตากผ้า|chai raao dtaak phaa|使用晾衣杆|ไม้แขวนเสื้อ|mai-khwaaen-suea|衣架|衣物
suea-choet|เสื้อเชิ้ต|suea-choet|衬衫|名词|衣物用品|พ่อใส่เสื้อเชิ้ตสีขาวไปทำงานทุกวันจันทร์|phaaw sai suea-choet sii khaao bpai tham-ngaan thuk wan-jan|爸爸每周一穿白衬衫去上班。|รีดเสื้อเชิ้ต|riit suea-choet|熨衬衫|เสื้อยืด|suea-yuet|T 恤|衣服
suea-yuet|เสื้อยืด|suea-yuet|T 恤|名词|衣物用品|วันหยุดฉันชอบใส่เสื้อยืดกับกางเกงขาสั้น|wan-yut chan chaawp sai suea-yuet gap gaang-geeng khaa-san|休息日我喜欢穿 T 恤和短裤。|ซักเสื้อยืด|sak suea-yuet|洗 T 恤|เสื้อเชิ้ต|suea-choet|衬衫|衣服
suea-khan-naao|เสื้อกันหนาว|suea gan naao|外套；防寒衣|名词|衣物用品|เช้านี้อากาศเย็น ฉันจึงหยิบเสื้อกันหนาวไปด้วย|chaao nii aa-gaat yen chan jeung yip suea gan naao bpai duai|今天早上天气凉，所以我带了外套。|ใส่เสื้อกันหนาว|sai suea gan naao|穿外套|เสื้อกันฝน|suea gan fon|雨衣|衣服
suea-gan-fon|เสื้อกันฝน|suea gan fon|雨衣|名词|衣物用品|ถ้าฝนตกหนัก เด็ก ๆ ต้องใส่เสื้อกันฝนไปโรงเรียน|thaa fon dtok nak dek dek dtawng sai suea gan fon bpai roong-riian|如果下大雨，孩子们必须穿雨衣去学校。|พกเสื้อกันฝน|phok suea gan fon|带雨衣|ร่มพับ|rom phap|折叠伞|衣物
gaang-geeng-khaa-san|กางเกงขาสั้น|gaang-geeng khaa-san|短裤|名词|衣物用品|น้องใส่กางเกงขาสั้นสีแดงเล่นในบ้าน|naawng sai gaang-geeng khaa-san sii daaeng len nai baan|弟弟穿红色短裤在家里玩。|ซักกางเกงขาสั้น|sak gaang-geeng khaa-san|洗短裤|กางเกงขายาว|gaang-geeng khaa-yaao|长裤|衣服
gaang-geeng-khaa-yaao|กางเกงขายาว|gaang-geeng khaa-yaao|长裤|名词|衣物用品|วันนี้ต้องไปวัด ฉันจึงใส่กางเกงขายาวสุภาพ|wan-nii dtawng bpai wat chan jeung sai gaang-geeng khaa-yaao su-phaap|今天要去寺庙，所以我穿礼貌的长裤。|พับกางเกงขายาว|phap gaang-geeng khaa-yaao|叠长裤|กางเกงขาสั้น|gaang-geeng khaa-san|短裤|衣服
gra-bproong-yaao|กระโปรงยาว|gra-bproong yaao|长裙|名词|衣物用品|แม่ซื้อกระโปรงยาวสีดำให้พี่สาว|maae sue gra-bproong yaao sii dam hai phii-saao|妈妈给姐姐买了一条黑色长裙。|ใส่กระโปรงยาว|sai gra-bproong yaao|穿长裙|ชุดนอน|chut naawn|睡衣|衣服
chut-nawn|ชุดนอน|chut naawn|睡衣|名词|衣物用品|ก่อนนอนเด็ก ๆ เปลี่ยนเป็นชุดนอนลายการ์ตูน|gaawn naawn dek dek bpliian bpen chut naawn laai gaa-tuun|睡前孩子们换上卡通图案睡衣。|เปลี่ยนชุดนอน|bpliian chut naawn|换睡衣|กระโปรงยาว|gra-bproong yaao|长裙|衣服
thung-thaao-bang|ถุงเท้าบาง|thung-thaao baang|薄袜子|名词|衣物用品|ถุงเท้าบางคู่นี้เหมาะกับรองเท้าสีขาว|thung-thaao baang khuu nii maw gap raawng-thaao sii khaao|这双薄袜子适合白色鞋子。|ใส่ถุงเท้าบาง|sai thung-thaao baang|穿薄袜子|รองเท้าแตะ|raawng-thaao dtae|拖鞋|衣物
raawng-thaao-dtae|รองเท้าแตะ|raawng-thaao dtae|拖鞋|名词|衣物用品|หน้าห้องน้ำมีรองเท้าแตะสองคู่|naa haawng-naam mii raawng-thaao dtae saawng khuu|洗手间门口有两双拖鞋。|ถอดรองเท้าแตะ|thaawt raawng-thaao dtae|脱拖鞋|รองเท้าผ้าใบ|raawng-thaao phaa-bai|运动鞋|衣物
raawng-thaao-phaa-bai|รองเท้าผ้าใบ|raawng-thaao phaa-bai|运动鞋；布鞋|名词|衣物用品|ฉันใส่รองเท้าผ้าใบไปเดินเล่นที่สวน|chan sai raawng-thaao phaa-bai bpai doen len thii suan|我穿运动鞋去公园散步。|ทำความสะอาดรองเท้าผ้าใบ|tham khwaam sa-aat raawng-thaao phaa-bai|清洁运动鞋|รองเท้าแตะ|raawng-thaao dtae|拖鞋|衣物
gra-bpao-suea-phaa|กระเป๋าเสื้อผ้า|gra-bpao suea-phaa|衣物包；旅行衣包|名词|衣物用品|แม่ใส่เสื้อผ้าสะอาดลงในกระเป๋าเสื้อผ้า|maae sai suea-phaa sa-aat long nai gra-bpao suea-phaa|妈妈把干净衣服放进衣物包里。|ถือกระเป๋าเสื้อผ้า|thue gra-bpao suea-phaa|提衣物包|กระเป๋าเครื่องสำอาง|gra-bpao khreuuang sam-aang|化妆包|用品
gra-bpao-khruueang-sam-aang|กระเป๋าเครื่องสำอาง|gra-bpao khreuuang sam-aang|化妆包|名词|个人用品|ในกระเป๋าเครื่องสำอางมีหวี กระจก และลิปมัน|nai gra-bpao khreuuang sam-aang mii wii gra-jok lae lip-man|化妆包里有梳子、镜子和润唇膏。|เปิดกระเป๋าเครื่องสำอาง|bpoet gra-bpao khreuuang sam-aang|打开化妆包|กระเป๋าเสื้อผ้า|gra-bpao suea-phaa|衣物包|用品
wii-phom|หวีผม|wii phom|梳子|名词|个人用品|น้องใช้หวีผมสีชมพูหลังอาบน้ำ|naawng chai wii phom sii chom-phuu lang aap naam|妹妹洗澡后用粉色梳子梳头。|ใช้หวีผม|chai wii phom|用梳子|กระจกเล็ก|gra-jok lek|小镜子|用品
gra-jok-lek|กระจกเล็ก|gra-jok lek|小镜子|名词|个人用品|กระจกเล็กอยู่ในกระเป๋าเครื่องสำอางของแม่|gra-jok lek yuu nai gra-bpao khreuuang sam-aang khaawng maae|小镜子在妈妈的化妆包里。|ส่องกระจกเล็ก|saawng gra-jok lek|照小镜子|หวีผม|wii phom|梳子|用品
praeng-sii-fan|แปรงสีฟัน|bpraaeng sii fan|牙刷|名词|个人用品|แปรงสีฟันของฉันเป็นสีเขียวและอยู่ข้างแก้วน้ำ|bpraaeng sii fan khaawng chan bpen sii khiaao lae yuu khaang gaaeo naam|我的牙刷是绿色的，在水杯旁边。|ล้างแปรงสีฟัน|laang bpraaeng sii fan|洗牙刷|ยาสีฟัน|yaa sii fan|牙膏|洗漱
yaa-sii-fan|ยาสีฟัน|yaa sii fan|牙膏|名词|个人用品|ยาสีฟันหลอดใหม่อยู่บนชั้นในห้องน้ำ|yaa sii fan laawt mai yuu bon chan nai haawng-naam|新的牙膏在洗手间架子上。|บีบยาสีฟัน|biip yaa sii fan|挤牙膏|แปรงสีฟัน|bpraaeng sii fan|牙刷|洗漱
sa-buu-laang-mue|สบู่ล้างมือ|sa-buu laang mue|洗手皂|名词|清洁用品|หน้าห้องน้ำมีสบู่ล้างมือกลิ่นมะนาว|naa haawng-naam mii sa-buu laang mue glin ma-naao|洗手间门口有柠檬味洗手皂。|ใช้สบู่ล้างมือ|chai sa-buu laang mue|用洗手皂|น้ำยาล้างมือ|nam-yaa laang mue|洗手液|清洁
nam-yaa-laang-mue|น้ำยาล้างมือ|nam-yaa laang mue|洗手液|名词|清洁用品|เด็ก ๆ ใช้น้ำยาล้างมือก่อนกินข้าวกลางวัน|dek dek chai nam-yaa laang mue gaawn gin khaao glaang-wan|孩子们午饭前用洗手液。|กดน้ำยาล้างมือ|got nam-yaa laang mue|按洗手液|สบู่ล้างมือ|sa-buu laang mue|洗手皂|清洁
phaa-chet-dtua|ผ้าเช็ดตัว|phaa chet dtua|浴巾；毛巾|名词|个人用品|ผ้าเช็ดตัวสีฟ้าแขวนอยู่หลังประตูห้องน้ำ|phaa chet dtua sii faa khwaaen yuu lang bpra-dtuu haawng-naam|蓝色毛巾挂在浴室门后。|ซักผ้าเช็ดตัว|sak phaa chet dtua|洗毛巾|ผ้าเช็ดหน้า|phaa chet naa|手帕|用品
phaa-chet-naa|ผ้าเช็ดหน้า|phaa chet naa|手帕；擦脸巾|名词|个人用品|ยายพกผ้าเช็ดหน้าสีขาวไว้ในกระเป๋าเสมอ|yaai phok phaa chet naa sii khaao wai nai gra-bpao sa-moe|奶奶总是在包里带一条白手帕。|พับผ้าเช็ดหน้า|phap phaa chet naa|叠手帕|ผ้าเช็ดตัว|phaa chet dtua|浴巾|用品
lip-man|ลิปมัน|lip-man|润唇膏|名词|个人用品|อากาศแห้ง ฉันจึงทาลิปมันก่อนออกจากบ้าน|aa-gaat haaeng chan jeung thaa lip-man gaawn aawk jaak baan|天气干，我出门前涂润唇膏。|ทาลิปมัน|thaa lip-man|涂润唇膏|ครีมทามือ|khriim thaa mue|护手霜|用品
khriim-thaa-mue|ครีมทามือ|khriim thaa mue|护手霜|名词|个人用品|แม่ใช้ครีมทามือหลังล้างจานทุกครั้ง|maae chai khriim thaa mue lang laang jaan thuk khrang|妈妈每次洗碗后都用护手霜。|ทาครีมทามือ|thaa khriim thaa mue|涂护手霜|ลิปมัน|lip-man|润唇膏|用品
rom-phap|ร่มพับ|rom phap|折叠伞|名词|日常物品|ร่มพับสีดำอยู่ในกระเป๋านักเรียนของลูก|rom phap sii dam yuu nai gra-bpao nak-riian khaawng luuk|黑色折叠伞在孩子的书包里。|กางร่มพับ|gaang rom phap|打开折叠伞|เสื้อกันฝน|suea gan fon|雨衣|日用品
gun-jaae-baan|กุญแจบ้าน|gun-jaae baan|家门钥匙|名词|日常物品|ฉันลืมกุญแจบ้านไว้บนโต๊ะเขียนหนังสือ|chan luem gun-jaae baan wai bon dto khiian nang-sue|我把家门钥匙忘在书桌上了。|หากุญแจบ้าน|haa gun-jaae baan|找家门钥匙|พวงกุญแจ|phuuang gun-jaae|钥匙串|日用品
phuuang-gun-jaae|พวงกุญแจ|phuuang gun-jaae|钥匙串|名词|日常物品|พวงกุญแจรูปช้างทำให้หากุญแจบ้านง่ายขึ้น|phuuang gun-jaae ruup chaang tham hai haa gun-jaae baan ngaai kheun|大象形状的钥匙串让找家门钥匙更容易。|ใส่พวงกุญแจ|sai phuuang gun-jaae|挂上钥匙串|กุญแจบ้าน|gun-jaae baan|家门钥匙|日用品
naalikaa-bpluk|นาฬิกาปลุก|naa-li-gaa bpluk|闹钟|名词|电子用品|นาฬิกาปลุกดังตอนหกโมงเช้าทุกวัน|naa-li-gaa bpluk dang dtaawn hok moong chaao thuk wan|闹钟每天早上六点响。|ตั้งนาฬิกาปลุก|dtang naa-li-gaa bpluk|设置闹钟|นาฬิกาข้อมือ|naa-li-gaa khaaw-mue|手表|电器
naa-li-gaa-khaaw-mue|นาฬิกาข้อมือ|naa-li-gaa khaaw-mue|手表|名词|日常物品|นาฬิกาข้อมือของพี่ชายเป็นสีเงิน|naa-li-gaa khaaw-mue khaawng phii-chaai bpen sii ngoen|哥哥的手表是银色的。|ใส่นาฬิกาข้อมือ|sai naa-li-gaa khaaw-mue|戴手表|นาฬิกาปลุก|naa-li-gaa bpluk|闹钟|日用品
khaawng-len-dek|ของเล่นเด็ก|khaawng len dek|儿童玩具|名词|日常物品|ของเล่นเด็กอยู่ในกล่องสีเหลืองใต้ชั้นวางของ|khaawng len dek yuu nai glaawng sii lueang dtai chan waang khaawng|儿童玩具在置物架下面的黄色盒子里。|เก็บของเล่นเด็ก|gep khaawng len dek|收儿童玩具|ตุ๊กตาผ้า|dtuk-ga-dtaa phaa|布娃娃|日用品
dtuk-ga-dtaa-phaa|ตุ๊กตาผ้า|dtuk-ga-dtaa phaa|布娃娃|名词|日常物品|ลูกสาวกอดตุ๊กตาผ้านุ่ม ๆ ก่อนนอน|luuk-saao gaawt dtuk-ga-dtaa phaa num num gaawn naawn|女儿睡前抱着软软的布娃娃。|ซักตุ๊กตาผ้า|sak dtuk-ga-dtaa phaa|洗布娃娃|ของเล่นเด็ก|khaawng len dek|儿童玩具|日用品
sam-lii|สำลี|sam-lii|棉花；化妆棉|名词|个人用品|ในห้องน้ำมีสำลีและครีมทามือบนชั้นเล็ก|nai haawng-naam mii sam-lii lae khriim thaa mue bon chan lek|洗手间小架子上有化妆棉和护手霜。|ใช้สำลี|chai sam-lii|用化妆棉|กระดาษทิชชู|gra-daat thit-chuu|纸巾|用品
gra-daat-thit-chuu|กระดาษทิชชู|gra-daat thit-chuu|纸巾|名词|日常物品|บนโต๊ะอาหารมีกระดาษทิชชูหนึ่งกล่อง|bon dto aa-haan mii gra-daat thit-chuu neung glaawng|餐桌上有一盒纸巾。|หยิบกระดาษทิชชู|yip gra-daat thit-chuu|拿纸巾|สำลี|sam-lii|化妆棉|日用品
thang-khaya-lek|ถังขยะเล็ก|thang kha-ya lek|小垃圾桶|名词|清洁用品|ถังขยะเล็กใต้โต๊ะเต็มแล้ว ต้องเอาไปทิ้ง|thang kha-ya lek dtai dto dtem laaeo dtawng ao bpai thing|桌下的小垃圾桶满了，必须拿去倒。|เทถังขยะเล็ก|thee thang kha-ya lek|倒小垃圾桶|ถุงขยะ|thung kha-ya|垃圾袋|清洁
thung-khaya|ถุงขยะ|thung kha-ya|垃圾袋|名词|清洁用品|แม่ใส่ถุงขยะสีดำในถังขยะเล็ก|maae sai thung kha-ya sii dam nai thang kha-ya lek|妈妈把黑色垃圾袋放进小垃圾桶里。|เปลี่ยนถุงขยะ|bpliian thung kha-ya|换垃圾袋|ถังขยะเล็ก|thang kha-ya lek|小垃圾桶|清洁
mai-gwaat-yaao|ไม้กวาดยาว|mai gwaat yaao|长扫帚|名词|清洁用品|ไม้กวาดยาวอยู่หลังประตูห้องครัว|mai gwaat yaao yuu lang bpra-dtuu haawng khruua|长扫帚在厨房门后。|ใช้ไม้กวาดยาว|chai mai gwaat yaao|用长扫帚|ที่โกยผง|thii gooy phong|簸箕|清洁
thii-gooy-phong|ที่โกยผง|thii gooy phong|簸箕|名词|清洁用品|หลังกวาดพื้นแล้ว ฉันใช้ที่โกยผงเก็บฝุ่น|lang gwaat phuen laaeo chan chai thii gooy phong gep fun|扫地后，我用簸箕收灰尘。|ถือที่โกยผง|thue thii gooy phong|拿簸箕|ไม้กวาดยาว|mai gwaat yaao|长扫帚|清洁
mai-thuu-phuen|ไม้ถูพื้น|mai thuu phuen|拖把|名词|清洁用品|ไม้ถูพื้นเปียกอยู่ข้างถังน้ำ|mai thuu phuen bpiiak yuu khaang thang naam|湿拖把在水桶旁边。|ซักไม้ถูพื้น|sak mai thuu phuen|洗拖把|ถังน้ำ|thang naam|水桶|清洁
thang-naam|ถังน้ำ|thang naam|水桶|名词|清洁用品|พ่อเติมน้ำใส่ถังน้ำเพื่อถูพื้นกระเบื้อง|phaaw dterm naam sai thang naam phuea thuu phuen gra-beuuang|爸爸往水桶里加水来拖瓷砖地板。|ยกถังน้ำ|yok thang naam|提水桶|ไม้ถูพื้น|mai thuu phuen|拖把|清洁
phaa-khii-riew|ผ้าขี้ริ้ว|phaa khii-rio|抹布|名词|清洁用品|ผ้าขี้ริ้วผืนนี้ใช้เช็ดโต๊ะอาหารได้|phaa khii-rio phuen nii chai chet dto aa-haan dai|这块抹布可以用来擦餐桌。|ซักผ้าขี้ริ้ว|sak phaa khii-rio|洗抹布|ฟองน้ำล้างจาน|faawng-naam laang jaan|洗碗海绵|清洁
faawng-naam-laang-jaan|ฟองน้ำล้างจาน|faawng-naam laang jaan|洗碗海绵|名词|清洁用品|ฟองน้ำล้างจานสีเหลืองอยู่ข้างอ่างล้างจาน|faawng-naam laang jaan sii lueang yuu khaang aang laang jaan|黄色洗碗海绵在洗碗池旁边。|เปลี่ยนฟองน้ำล้างจาน|bpliian faawng-naam laang jaan|换洗碗海绵|ผ้าขี้ริ้ว|phaa khii-rio|抹布|清洁
nam-yaa-laang-jaan|น้ำยาล้างจาน|nam-yaa laang jaan|洗洁精|名词|清洁用品|น้ำยาล้างจานขวดใหม่มีกลิ่นมะนาว|nam-yaa laang jaan khuat mai mii glin ma-naao|新瓶洗洁精有柠檬味。|ใช้น้ำยาล้างจาน|chai nam-yaa laang jaan|用洗洁精|ฟองน้ำล้างจาน|faawng-naam laang jaan|洗碗海绵|清洁
nam-yaa-thuu-phuen|น้ำยาถูพื้น|nam-yaa thuu phuen|地板清洁剂|名词|清洁用品|ใส่น้ำยาถูพื้นนิดหน่อยในถังน้ำก็พอ|sai nam-yaa thuu phuen nit naawy nai thang naam gaw phaaw|在水桶里放一点地板清洁剂就够了。|ซื้อน้ำยาถูพื้น|sue nam-yaa thuu phuen|买地板清洁剂|น้ำยาล้างจาน|nam-yaa laang jaan|洗洁精|清洁
khruueang-duut-fun|เครื่องดูดฝุ่น|khreuuang duut fun|吸尘器|名词|电子用品|เครื่องดูดฝุ่นเสียงดัง แต่ทำให้พรมสะอาดเร็ว|khreuuang duut fun siiang dang dtaae tham hai phrom sa-aat reo|吸尘器声音大，但让地毯很快干净。|เปิดเครื่องดูดฝุ่น|bpoet khreuuang duut fun|打开吸尘器|ไม้กวาดยาว|mai gwaat yaao|长扫帚|电器
phrom-nang-len|พรมนั่งเล่น|phrom nang len|客厅地毯|名词|家具房间|พรมนั่งเล่นสีเทาอยู่หน้าโซฟาเล็ก|phrom nang len sii thao yuu naa soo-faa lek|灰色客厅地毯在小沙发前面。|ดูดฝุ่นพรมนั่งเล่น|duut fun phrom nang len|吸客厅地毯灰尘|พื้นไม้|phuen maai|木地板|家具
sii-khaao|สีขาว|sii khaao|白色|形容词|颜色材质|ผ้าปูเตียงสีขาวดูสะอาดและสว่าง|phaa bpuu dtiiang sii khaao duu sa-aat lae sa-waang|白色床单看起来干净又明亮。|แก้วสีขาว|gaaeo sii khaao|白色杯子|สีดำ|sii dam|黑色|颜色
sii-dam|สีดำ|sii dam|黑色|形容词|颜色材质|กระเป๋าสีดำของฉันอยู่บนเก้าอี้นั่งเล่น|gra-bpao sii dam khaawng chan yuu bon gao-ii nang len|我的黑色包在休闲椅上。|รองเท้าสีดำ|raawng-thaao sii dam|黑色鞋子|สีขาว|sii khaao|白色|颜色
sii-daeng|สีแดง|sii daaeng|红色|形容词|颜色材质|แก้วสีแดงใบนี้เป็นของน้องชาย|gaaeo sii daaeng bai nii bpen khaawng naawng-chaai|这个红色杯子是弟弟的。|เสื้อสีแดง|suea sii daaeng|红色衣服|สีชมพู|sii chom-phuu|粉色|颜色
sii-chom-phuu|สีชมพู|sii chom-phuu|粉色|形容词|颜色材质|หวีผมสีชมพูอยู่หน้ากระจกเล็ก|wii phom sii chom-phuu yuu naa gra-jok lek|粉色梳子在小镜子前面。|กระเป๋าสีชมพู|gra-bpao sii chom-phuu|粉色包|สีแดง|sii daaeng|红色|颜色
sii-faa|สีฟ้า|sii faa|浅蓝色；天蓝色|形容词|颜色材质|ผ้าห่มสีฟ้าอยู่บนเตียงนอนใหญ่|phaa-hom sii faa yuu bon dtiiang naawn yai|蓝色被子在大床上。|เสื้อสีฟ้า|suea sii faa|蓝色衣服|สีน้ำเงิน|sii nam-ngoen|深蓝色|颜色
sii-nam-ngoen|สีน้ำเงิน|sii nam-ngoen|深蓝色|形容词|颜色材质|กระเป๋านักเรียนสีน้ำเงินวางอยู่ข้างประตู|gra-bpao nak-riian sii nam-ngoen waang yuu khaang bpra-dtuu|深蓝色书包放在门旁边。|ปากกาสีน้ำเงิน|bpaak-gaa sii nam-ngoen|蓝色笔|สีฟ้า|sii faa|浅蓝色|颜色
sii-khiaao|สีเขียว|sii khiaao|绿色|形容词|颜色材质|ผ้าปูโต๊ะสีเขียวอยู่บนโต๊ะอาหาร|phaa bpuu dto sii khiaao yuu bon dto aa-haan|绿色桌布在餐桌上。|ขวดสีเขียว|khuat sii khiaao|绿色瓶子|สีเหลือง|sii lueang|黄色|颜色
sii-lueang|สีเหลือง|sii lueang|黄色|形容词|颜色材质|กล่องสีเหลืองมีของเล่นเด็กอยู่ข้างใน|glaawng sii lueang mii khaawng len dek yuu khaang nai|黄色盒子里面有儿童玩具。|ถุงสีเหลือง|thung sii lueang|黄色袋子|สีเขียว|sii khiaao|绿色|颜色
sii-som|สีส้ม|sii som|橙色|形容词|颜色材质|แก้วสีส้มอยู่ข้างจานข้าวของแม่|gaaeo sii som yuu khaang jaan khaao khaawng maae|橙色杯子在妈妈的饭盘旁边。|เสื้อสีส้ม|suea sii som|橙色衣服|สีน้ำตาล|sii nam-dtaan|棕色|颜色
sii-nam-dtaan|สีน้ำตาล|sii nam-dtaan|棕色|形容词|颜色材质|พื้นไม้สีน้ำตาลทำให้ห้องดูอบอุ่น|phuen maai sii nam-dtaan tham hai haawng duu op-un|棕色木地板让房间看起来温暖。|โต๊ะสีน้ำตาล|dto sii nam-dtaan|棕色桌子|สีส้ม|sii som|橙色|颜色
sii-thao|สีเทา|sii thao|灰色|形容词|颜色材质|โซฟาเล็กสีเทาเข้ากับพรมในห้องนั่งเล่น|soo-faa lek sii thao khao gap phrom nai haawng nang len|灰色小沙发和客厅地毯很配。|ผ้าสีเทา|phaa sii thao|灰色布|สีเงิน|sii ngoen|银色|颜色
sii-ngoen|สีเงิน|sii ngoen|银色|形容词|颜色材质|นาฬิกาข้อมือสีเงินของพ่อวางอยู่บนโต๊ะ|naa-li-gaa khaaw-mue sii ngoen khaawng phaaw waang yuu bon dto|爸爸的银色手表放在桌上。|ช้อนสีเงิน|chaawn sii ngoen|银色勺子|สีเทา|sii thao|灰色|颜色
sii-thawng|สีทอง|sii thaawng|金色|形容词|颜色材质|พวงกุญแจสีทองเล็ก ๆ อยู่กับกุญแจบ้าน|phuuang gun-jaae sii thaawng lek lek yuu gap gun-jaae baan|小金色钥匙串和家门钥匙在一起。|กรอบสีทอง|graawp sii thaawng|金色边框|สีเงิน|sii ngoen|银色|颜色
laai-daawk-maai|ลายดอกไม้|laai daawk-maai|花纹；花朵图案|名词|颜色材质|ปลอกหมอนลายดอกไม้ของยายดูน่ารักมาก|bplaawk maawn laai daawk-maai khaawng yaai duu naa-rak maak|奶奶的花纹枕套看起来很可爱。|ผ้าลายดอกไม้|phaa laai daawk-maai|花纹布|ลายทาง|laai thaang|条纹|图案
laai-thaang|ลายทาง|laai thaang|条纹|名词|颜色材质|เสื้อยืดลายทางตัวนี้เป็นของพี่ชาย|suea-yuet laai thaang dtua nii bpen khaawng phii-chaai|这件条纹 T 恤是哥哥的。|ผ้าลายทาง|phaa laai thaang|条纹布|ลายดอกไม้|laai daawk-maai|花纹|图案
phaa-num|ผ้านุ่ม|phaa num|软布；柔软的布|名词|颜色材质|แม่ใช้ผ้านุ่มเช็ดกระจกเล็กอย่างเบา ๆ|maae chai phaa num chet gra-jok lek yaang bao bao|妈妈用软布轻轻擦小镜子。|ใช้ผ้านุ่ม|chai phaa num|用软布|ผ้าแข็ง|phaa khaeng|硬布|材质
phaa-khaeng|ผ้าแข็ง|phaa khaeng|硬布|名词|颜色材质|ผ้าแข็งผืนนี้ไม่เหมาะกับการเช็ดหน้า|phaa khaeng phuen nii mai maw gap gaan chet naa|这块硬布不适合擦脸。|จับผ้าแข็ง|jap phaa khaeng|摸硬布|ผ้านุ่ม|phaa num|软布|材质
khaawng-mai|ของใหม่|khaawng mai|新东西|名词|日常物品|บนชั้นวางของมีของใหม่ที่แม่เพิ่งซื้อมา|bon chan waang khaawng mii khaawng mai thii maae phoeng sue maa|置物架上有妈妈刚买的新东西。|เปิดของใหม่|bpoet khaawng mai|打开新东西|ของเก่า|khaawng gao|旧东西|日用品
khaawng-gao|ของเก่า|khaawng gao|旧东西|名词|日常物品|พ่อเก็บของเก่าไว้ในกล่องใต้เตียง|phaaw gep khaawng gao wai nai glaawng dtai dtiiang|爸爸把旧东西放在床下的盒子里。|ทิ้งของเก่า|thing khaawng gao|扔旧东西|ของใหม่|khaawng mai|新东西|日用品
khaawng-lek-lek|ของเล็ก ๆ|khaawng lek lek|小东西|名词|日常物品|ของเล็ก ๆ หลายอย่างอยู่ในลิ้นชักเล็ก|khaawng lek lek laai yaang yuu nai lin-chak lek|很多小东西在小抽屉里。|เก็บของเล็ก ๆ|gep khaawng lek lek|收小东西|ของชิ้นใหญ่|khaawng chin yai|大件物品|日用品
khaawng-chin-yai|ของชิ้นใหญ่|khaawng chin yai|大件物品|名词|日常物品|ของชิ้นใหญ่เช่นโซฟาต้องยกสองคน|khaawng chin yai chen soo-faa dtawng yok saawng khon|像沙发这样的大件物品需要两个人抬。|ย้ายของชิ้นใหญ่|yaai khaawng chin yai|搬大件物品|ของเล็ก ๆ|khaawng lek lek|小东西|日用品
khruueang-chai-fai-faa|เครื่องใช้ไฟฟ้า|khreuuang chai fai-faa|电器|名词|电子用品|ในบ้านมีเครื่องใช้ไฟฟ้าหลายอย่าง เช่น พัดลมและตู้เย็น|nai baan mii khreuuang chai fai-faa laai yaang chen phat-lom lae dtuu-yen|家里有很多电器，例如风扇和冰箱。|ปิดเครื่องใช้ไฟฟ้า|bpit khreuuang chai fai-faa|关闭电器|ของใช้ในบ้าน|khaawng chai nai baan|家用品|电器
khaawng-chai-nai-baan|ของใช้ในบ้าน|khaawng chai nai baan|家用品|名词|日常物品|ร้านนี้ขายของใช้ในบ้านราคาถูกและมีหลายสี|raan nii khaai khaawng chai nai baan raa-khaa thuuk lae mii laai sii|这家店卖便宜的家用品，而且有很多颜色。|ซื้อของใช้ในบ้าน|sue khaawng chai nai baan|买家用品|เครื่องใช้ไฟฟ้า|khreuuang chai fai-faa|电器|日用品
khruueang-sam-aang|เครื่องสำอาง|khreuuang sam-aang|化妆品|名词|个人用品|เครื่องสำอางของแม่อยู่ในกระเป๋าใบเล็ก|khreuuang sam-aang khaawng maae yuu nai gra-bpao bai lek|妈妈的化妆品在小包里。|เก็บเครื่องสำอาง|gep khreuuang sam-aang|收化妆品|ครีมทามือ|khriim thaa mue|护手霜|用品
khuat-naam|ขวดน้ำ|khuat naam|水瓶|名词|日常物品|ขวดน้ำใสอยู่ในตู้เย็นเล็ก|khuat naam sai yuu nai dtuu-yen lek|透明水瓶在小冰箱里。|เติมขวดน้ำ|dterm khuat naam|给水瓶加水|แก้วน้ำเย็น|gaaeo naam yen|冷水杯|日用品
khuat-sai|ขวดใส|khuat sai|透明瓶子|名词|颜色材质|ขวดใสทำให้เห็นน้ำข้างในง่าย|khuat sai tham hai hen naam khaang nai ngaai|透明瓶子让人容易看到里面的水。|ใช้ขวดใส|chai khuat sai|用透明瓶子|ขวดสีเขียว|khuat sii khiaao|绿色瓶子|材质
mai|ไม้|maai|木头；木质|名词|颜色材质|โต๊ะไม้ตัวนี้หนักแต่แข็งแรงมาก|dto maai dtua nii nak dtaae khaeng-raaeng maak|这张木桌很重但很结实。|ของทำจากไม้|khaawng tham jaak maai|木制物品|พลาสติก|phlaat-sa-dtik|塑料|材质
phlaat-sa-dtik|พลาสติก|phlaat-sa-dtik|塑料|名词|颜色材质|กล่องพลาสติกใบนี้เบาและล้างง่าย|glaawng phlaat-sa-dtik bai nii bao lae laang ngaai|这个塑料盒很轻，也容易清洗。|กล่องพลาสติก|glaawng phlaat-sa-dtik|塑料盒|ไม้|maai|木头|材质
lek|เหล็ก|lek|铁；金属|名词|颜色材质|ชั้นเหล็กในครัวแข็งแรงและวางของได้เยอะ|chan lek nai khruua khaeng-raaeng lae waang khaawng dai yoe|厨房里的铁架很结实，可以放很多东西。|ชั้นเหล็ก|chan lek|铁架|พลาสติก|phlaat-sa-dtik|塑料|材质
gra-jok|กระจก|gra-jok|玻璃；镜子|名词|颜色材质|ประตูกระจกสะอาดมากจนมองเห็นสวนชัด|bpra-dtuu gra-jok sa-aat maak jon maawng-hen suan chat|玻璃门很干净，可以清楚看到花园。|เช็ดกระจก|chet gra-jok|擦玻璃|ไม้|maai|木头|材质
phaa|ผ้า|phaa|布；布料|名词|颜色材质|ผ้าผืนนี้นุ่มและเหมาะสำหรับเช็ดหน้า|phaa phuen nii num lae maw sam-rap chet naa|这块布很软，适合擦脸。|ซักผ้า|sak phaa|洗布/洗衣|พลาสติก|phlaat-sa-dtik|塑料|材质
bai-lek|ใบเล็ก|bai lek|小号的；小件的|短语|日常物品|แม่ซื้อถ้วยกาแฟใบเล็กให้ฉันหนึ่งใบ|maae sue thuai gaa-faae bai lek hai chan neung bai|妈妈给我买了一个小咖啡杯。|จานใบเล็ก|jaan bai lek|小盘子|ใบใหญ่|bai yai|大号的|数量
bai-yai|ใบใหญ่|bai yai|大号的；大件的|短语|日常物品|จานใบใหญ่เหมาะสำหรับใส่ผลไม้หลายอย่าง|jaan bai yai maw sam-rap sai phon-la-maai laai yaang|大盘子适合放多种水果。|แก้วใบใหญ่|gaaeo bai yai|大杯子|ใบเล็ก|bai lek|小号的|数量
an-nii-khaawng-khrai|อันนี้ของใคร|an nii khaawng khrai|这个是谁的|短语|日常物品|อันนี้ของใคร มีสายชาร์จอยู่ในกล่องเก็บของ|an nii khaawng khrai mii saai chaat yuu nai glaawng gep khaawng|这个是谁的？收纳盒里有一根充电线。|ถามว่าอันนี้ของใคร|thaam waa an nii khaawng khrai|问这个是谁的|ของฉัน|khaawng chan|我的东西|实用句
khaawng-chan|ของฉัน|khaawng chan|我的东西|短语|日常物品|รองเท้าผ้าใบคู่นี้เป็นของฉัน ไม่ใช่ของพี่|raawng-thaao phaa-bai khuu nii bpen khaawng chan mai chai khaawng phii|这双运动鞋是我的，不是哥哥的。|บอกว่าเป็นของฉัน|baawk waa bpen khaawng chan|说是我的东西|ของใคร|khaawng khrai|谁的东西|实用句
waang-wai-thii-nai|วางไว้ที่ไหน|waang wai thii nai|放在哪里|短语|日常物品|คุณวางกุญแจบ้านไว้ที่ไหน ฉันหาไม่เจอ|khun waang gun-jaae baan wai thii nai chan haa mai joe|你把家门钥匙放在哪里？我找不到。|ถามว่าวางไว้ที่ไหน|thaam waa waang wai thii nai|问放在哪里|อยู่ที่นี่|yuu thii nii|在这里|实用句
yuu-thii-nii|อยู่ที่นี่|yuu thii nii|在这里|短语|日常物品|สายชาร์จอยู่ที่นี่ บนโต๊ะเขียนหนังสือ|saai chaat yuu thii nii bon dto khiian nang-sue|充电线在这里，在书桌上。|บอกว่าอยู่ที่นี่|baawk waa yuu thii nii|说在这里|วางไว้ที่ไหน|waang wai thii nai|放在哪里|实用句
yip-hai-noi|หยิบให้หน่อย|yip hai naawy|请帮我拿一下|短语|日常物品|ช่วยหยิบผ้าเช็ดตัวให้หน่อย ฉันอยู่ในห้องอาบน้ำ|chuai yip phaa chet dtua hai naawy chan yuu nai haawng aap naam|请帮我拿一下毛巾，我在浴室里。|หยิบแก้วให้หน่อย|yip gaaeo hai naawy|请拿杯子给我|เอามาให้หน่อย|ao maa hai naawy|请拿过来|实用句
ao-maa-hai-noi|เอามาให้หน่อย|ao maa hai naawy|请拿过来|短语|日常物品|เอาร่มพับมาให้หน่อย ฝนกำลังจะตก|ao rom phap maa hai naawy fon gam-lang ja dtok|请把折叠伞拿过来，快下雨了。|เอาของมาให้หน่อย|ao khaawng maa hai naawy|请把东西拿来|หยิบให้หน่อย|yip hai naawy|请帮我拿一下|实用句
gep-khao-thii|เก็บเข้าที่|gep khao thii|收回原处|动词|日常物品|เล่นของเล่นเสร็จแล้วต้องเก็บเข้าที่ทุกครั้ง|len khaawng len set laaeo dtawng gep khao thii thuk khrang|玩完玩具后每次都要收回原处。|เก็บของเข้าที่|gep khaawng khao thii|把东西收回原处|วางทิ้งไว้|waang thing wai|随手放着|整理
waang-thing-wai|วางทิ้งไว้|waang thing wai|随手放着；放着不收|动词|日常物品|อย่าวางสายไฟทิ้งไว้กลางห้องนั่งเล่น|yaa waang saai fai thing wai glaang haawng nang len|不要把电线随手放在客厅中间。|วางของทิ้งไว้|waang khaawng thing wai|把东西随手放着|เก็บเข้าที่|gep khao thii|收回原处|整理
chet-hai-sa-aat|เช็ดให้สะอาด|chet hai sa-aat|擦干净|动词|清洁用品|หลังดื่มน้ำแล้ว เช็ดโต๊ะให้สะอาดด้วยผ้าขี้ริ้ว|lang duem naam laaeo chet dto hai sa-aat duai phaa khii-rio|喝完水后，用抹布把桌子擦干净。|เช็ดกระจกให้สะอาด|chet gra-jok hai sa-aat|把玻璃擦干净|ล้างให้สะอาด|laang hai sa-aat|洗干净|清洁
laang-hai-sa-aat|ล้างให้สะอาด|laang hai sa-aat|洗干净|动词|清洁用品|ล้างแก้วน้ำเย็นให้สะอาดก่อนวางในตู้กับข้าว|laang gaaeo naam yen hai sa-aat gaawn waang nai dtuu gap khaao|把冷水杯洗干净后再放进食品柜。|ล้างจานให้สะอาด|laang jaan hai sa-aat|把盘子洗干净|เช็ดให้สะอาด|chet hai sa-aat|擦干净|清洁
sak-hai-haeng|ซักให้แห้ง|sak hai haaeng|洗后晾干|动词|清洁用品|ซักผ้าเช็ดตัวแล้วตากให้แห้งบนราวตากผ้า|sak phaa chet dtua laaeo dtaak hai haaeng bon raao dtaak phaa|洗完毛巾后，把它晾在晾衣杆上晾干。|ซักผ้าให้แห้ง|sak phaa hai haaeng|洗后晾干衣物|ตากแดด|dtaak daaet|晒太阳|清洁
dtaak-daaet|ตากแดด|dtaak daaet|晒太阳；晾晒|动词|清洁用品|แม่เอารองเท้าผ้าใบไปตากแดดหน้าบ้าน|maae ao raawng-thaao phaa-bai bpai dtaak daaet naa baan|妈妈把运动鞋拿到屋前晒太阳。|ตากผ้าแดด|dtaak phaa daaet|晒衣服|ซักให้แห้ง|sak hai haaeng|洗后晾干|清洁
hom-dii|หอมดี|haawm dii|很香；味道好|形容词|清洁用品|ผ้าห่มที่ซักใหม่หอมดี เด็ก ๆ ชอบมาก|phaa-hom thii sak mai haawm dii dek dek chaawp maak|新洗的被子很香，孩子们很喜欢。|กลิ่นหอมดี|glin haawm dii|味道很香|เหม็น|men|臭|气味
men|เหม็น|men|臭；难闻|形容词|清洁用品|ถุงขยะเก่าเหม็นมาก ต้องรีบเอาไปทิ้ง|thung kha-ya gao men maak dtawng riip ao bpai thing|旧垃圾袋很臭，必须赶快拿去扔。|กลิ่นเหม็น|glin men|臭味|หอมดี|haawm dii|很香|气味
num|นุ่ม|num|软|形容词|颜色材质|ตุ๊กตาผ้านุ่มมาก ลูกสาวจึงกอดทุกคืน|dtuk-ga-dtaa phaa num maak luuk-saao jeung gaawt thuk kheun|布娃娃很软，所以女儿每天晚上抱着它。|ผ้านุ่ม|phaa num|软布|แข็ง|khaeng|硬|材质
khaeng|แข็ง|khaeng|硬；结实|形容词|颜色材质|ชั้นเหล็กแข็งและวางของหนักได้|chan lek khaeng lae waang khaawng nak dai|铁架很结实，可以放重物。|ของแข็ง|khaawng khaeng|硬东西|นุ่ม|num|软|材质
bao|เบา|bao|轻|形容词|颜色材质|กล่องพลาสติกเบา เด็กจึงถือเองได้|glaawng phlaat-sa-dtik bao dek jeung thue eeng dai|塑料盒很轻，所以孩子可以自己拿。|กระเป๋าเบา|gra-bpao bao|轻包|หนัก|nak|重|材质
nak|หนัก|nak|重|形容词|颜色材质|โต๊ะไม้ตัวนี้หนัก ต้องยกสองคน|dto maai dtua nii nak dtawng yok saawng khon|这张木桌很重，需要两个人抬。|ของหนัก|khaawng nak|重物|เบา|bao|轻|材质
sai|ใส|sai|透明；清澈|形容词|颜色材质|ขวดใสทำให้เห็นน้ำข้างในชัด|khuat sai tham hai hen naam khaang nai chat|透明瓶让人清楚看到里面的水。|แก้วใส|gaaeo sai|透明杯|ทึบ|thuep|不透明|材质
thuep|ทึบ|thuep|不透明；厚实不透光|形容词|颜色材质|ผ้าม่านทึบช่วยให้ห้องนอนมืดตอนกลางวัน|phaa-maan thuep chuai hai haawng naawn muet dtaawn glaang-wan|不透光窗帘让卧室白天也暗。|ผ้าทึบ|phaa thuep|不透光布|ใส|sai|透明|材质
sa-aat|สะอาด|sa-aat|干净|形容词|清洁用品|ห้องอาบน้ำสะอาดหลังพ่อถูพื้นกระเบื้อง|haawng aap naam sa-aat lang phaaw thuu phuen gra-beuuang|爸爸拖完瓷砖地板后，浴室很干净。|บ้านสะอาด|baan sa-aat|家里干净|สกปรก|so-gbpra-gok|脏|清洁
so-gbpra-gok|สกปรก|so-gbpra-gok|脏|形容词|清洁用品|เสื้อยืดสกปรกต้องใส่ในตะกร้าผ้า|suea-yuet so-gbpra-gok dtawng sai nai dta-graa phaa|脏 T 恤必须放进洗衣篮。|จานสกปรก|jaan so-gbpra-gok|脏盘子|สะอาด|sa-aat|干净|清洁
piiak|เปียก|bpiiak|湿|形容词|颜色材质|ผ้าเช็ดตัวเปียกต้องตากแดดให้แห้ง|phaa chet dtua bpiiak dtawng dtaak daaet hai haaeng|湿毛巾必须晒干。|พื้นเปียก|phuen bpiiak|地板湿|แห้ง|haaeng|干|材质
haaeng|แห้ง|haaeng|干|形容词|颜色材质|รองเท้าผ้าใบแห้งแล้ว จึงเก็บเข้าที่ได้|raawng-thaao phaa-bai haaeng laaeo jeung gep khao thii dai|运动鞋已经干了，所以可以收回原处。|ผ้าแห้ง|phaa haaeng|干布|เปียก|bpiiak|湿|材质
sa-waang|สว่าง|sa-waang|明亮|形容词|家具房间|ห้องนั่งเล่นสว่างเพราะมีหน้าต่างใหญ่|haawng nang len sa-waang phraw mii naa-dtaang yai|客厅很明亮，因为有大窗户。|ห้องสว่าง|haawng sa-waang|房间明亮|มืด|muet|暗|光线
muet|มืด|muet|暗；黑|形容词|家具房间|ปิดไฟเพดานแล้วห้องนอนมืดมาก|bpit fai phee-daan laaeo haawng naawn muet maak|关掉顶灯后，卧室很暗。|ห้องมืด|haawng muet|房间暗|สว่าง|sa-waang|明亮|光线
muet-naawy|มืดหน่อย|muet naawy|有点暗|短语|家具房间|ห้องครัวมืดหน่อย ช่วยเปิดไฟเพดานได้ไหม|haawng khruua muet naawy chuai bpoet fai phee-daan dai mai|厨房有点暗，可以帮忙开顶灯吗？|บอกว่ามืดหน่อย|baawk waa muet naawy|说有点暗|สว่างพอ|sa-waang phaaw|够亮|光线
sa-waang-phaaw|สว่างพอ|sa-waang phaaw|够亮|短语|家具房间|โคมไฟโต๊ะสว่างพอสำหรับอ่านหนังสือ|khoom-fai dto sa-waang phaaw sam-rap aan nang-sue|台灯够亮，可以用来看书。|ไฟสว่างพอ|fai sa-waang phaaw|灯够亮|มืดหน่อย|muet naawy|有点暗|光线
dtuu-nai-khruua|ตู้ในครัว|dtuu nai khruua|厨房柜子|名词|家具房间|ตู้ในครัวมีถ้วยกาแฟและช้อนชา|dtuu nai khruua mii thuai gaa-faae lae chaawn chaa|厨房柜子里有咖啡杯和茶匙。|เปิดตู้ในครัว|bpoet dtuu nai khruua|打开厨房柜子|ตู้กับข้าว|dtuu gap khaao|食品柜|家具
phaa-chet-to|ผ้าเช็ดโต๊ะ|phaa chet dto|擦桌布|名词|清洁用品|หลังอาหารเย็น ฉันใช้ผ้าเช็ดโต๊ะเช็ดโต๊ะอาหาร|lang aa-haan yen chan chai phaa chet dto chet dto aa-haan|晚饭后，我用擦桌布擦餐桌。|ซักผ้าเช็ดโต๊ะ|sak phaa chet dto|洗擦桌布|ผ้าขี้ริ้ว|phaa khii-rio|抹布|清洁
phaa-gaan-bpuuen|ผ้ากันเปื้อน|phaa gan bpuean|围裙|名词|衣物用品|แม่ใส่ผ้ากันเปื้อนก่อนทำอาหารในครัว|maae sai phaa gan bpuean gaawn tham aa-haan nai khruua|妈妈在厨房做饭前穿上围裙。|ใส่ผ้ากันเปื้อน|sai phaa gan bpuean|穿围裙|เสื้อกันเปื้อน|suea gan bpuean|防脏衣|衣物
phaa-khon-nuu|ผ้าขนหนู|phaa khon-nuu|毛巾|名词|个人用品|ผ้าขนหนูผืนเล็กใช้เช็ดมือได้ดี|phaa khon-nuu phuen lek chai chet mue dai dii|小毛巾很好用来擦手。|แขวนผ้าขนหนู|khwaaen phaa khon-nuu|挂毛巾|ผ้าเช็ดตัว|phaa chet dtua|浴巾|用品
chaai-dai|ใช้ได้|chai dai|可以用；能用|短语|日常物品|ที่ชาร์จอันนี้ยังใช้ได้ แต่สายชาร์จเก่าเสียแล้ว|thii chaat an nii yang chai dai dtaae saai chaat gao sia laaeo|这个充电器还能用，但旧充电线坏了。|บอกว่ายังใช้ได้|baawk waa yang chai dai|说还能用|ใช้ไม่ได้|chai mai dai|不能用|实用句
chai-mai-dai|ใช้ไม่ได้|chai mai dai|不能用|短语|日常物品|รีโมตทีวีใช้ไม่ได้ เพราะไม่มีถ่าน|rii-moot thii-wii chai mai dai phraw mai mii thaan|电视遥控器不能用，因为没有电池。|ของใช้ไม่ได้|khaawng chai mai dai|东西不能用|ใช้ได้|chai dai|可以用|实用句
sia-laaeo|เสียแล้ว|sia laaeo|坏了|短语|电子用品|พัดลมตั้งโต๊ะเสียแล้ว พ่อจะดูให้ตอนเย็น|phat-lom dtang dto sia laaeo phaaw ja duu hai dtaawn yen|桌上风扇坏了，爸爸傍晚会看一下。|บอกว่าเสียแล้ว|baawk waa sia laaeo|说坏了|ใช้ได้|chai dai|能用|电器
mai-mii-thaan|ไม่มีถ่าน|mai mii thaan|没有电池|短语|电子用品|นาฬิกาปลุกไม่มีถ่าน จึงไม่ดังตอนเช้า|naa-li-gaa bpluk mai mii thaan jeung mai dang dtaawn chaao|闹钟没有电池，所以早上没响。|รีโมตไม่มีถ่าน|rii-moot mai mii thaan|遥控器没有电池|มีถ่าน|mii thaan|有电池|电器
thaan-gawn-lek|ถ่านก้อนเล็ก|thaan gaawn lek|小电池|名词|电子用品|ถ่านก้อนเล็กอยู่ในกล่องเก็บของข้างรีโมตทีวี|thaan gaawn lek yuu nai glaawng gep khaawng khaang rii-moot thii-wii|小电池在电视遥控器旁边的收纳盒里。|ใส่ถ่านก้อนเล็ก|sai thaan gaawn lek|装小电池|ปลั๊กไฟ|bplak fai|电源插座|电器
khruueang-prap-aa-gaat|เครื่องปรับอากาศ|khreuuang bprap aa-gaat|空调|名词|电子用品|เครื่องปรับอากาศในห้องนอนเย็นมากตอนกลางคืน|khreuuang bprap aa-gaat nai haawng naawn yen maak dtaawn glaang-khuen|卧室里的空调晚上很凉。|เปิดเครื่องปรับอากาศ|bpoet khreuuang bprap aa-gaat|打开空调|พัดลมตั้งพื้น|phat-lom dtang phuen|落地风扇|电器
khruueang-faawk-aa-gaat|เครื่องฟอกอากาศ|khreuuang faawk aa-gaat|空气净化器|名词|电子用品|เครื่องฟอกอากาศอยู่ใกล้หน้าต่างในห้องนั่งเล่น|khreuuang faawk aa-gaat yuu glai naa-dtaang nai haawng nang len|空气净化器在客厅窗户附近。|เปิดเครื่องฟอกอากาศ|bpoet khreuuang faawk aa-gaat|打开空气净化器|เครื่องปรับอากาศ|khreuuang bprap aa-gaat|空调|电器
saai-yaa-ng|สายยาง|saai yaang|水管；软管|名词|清洁用品|พ่อใช้สายยางล้างพื้นหน้าบ้านตอนเช้า|phaaw chai saai yaang laang phuen naa baan dtaawn chaao|爸爸早上用水管冲洗屋前地面。|ม้วนสายยาง|muan saai yaang|卷水管|ถังน้ำ|thang naam|水桶|清洁
khon-sut-thaai|คนสุดท้าย|khon sut-thaai|最后一个人|短语|日常物品|คนสุดท้ายต้องปิดไฟเพดานและประตูกระจก|khon sut-thaai dtawng bpit fai phee-daan lae bpra-dtuu gra-jok|最后一个人必须关顶灯和玻璃门。|บอกคนสุดท้าย|baawk khon sut-thaai|告诉最后一个人|คนแรก|khon raaek|第一个人|实用句
thing-long-thang-khaya|ทิ้งลงถังขยะ|thing long thang kha-ya|扔进垃圾桶|动词|清洁用品|กระดาษทิชชูสกปรกต้องทิ้งลงถังขยะเล็ก|gra-daat thit-chuu so-gbpra-gok dtawng thing long thang kha-ya lek|脏纸巾必须扔进小垃圾桶。|ทิ้งขยะลงถัง|thing kha-ya long thang|把垃圾扔进桶|วางทิ้งไว้|waang thing wai|随手放着|清洁
phap-phaa|พับผ้า|phap phaa|叠布；叠衣物|动词|衣物用品|หลังเสื้อผ้าแห้งแล้ว ฉันพับผ้าใส่ตู้เสื้อผ้า|lang suea-phaa haaeng laaeo chan phap phaa sai dtuu suea-phaa|衣服干后，我把衣物叠好放进衣柜。|พับผ้าห่ม|phap phaa-hom|叠被子|แขวนเสื้อ|khwaaen suea|挂衣服|衣物
khwaaen-suea|แขวนเสื้อ|khwaaen suea|挂衣服|动词|衣物用品|พี่แขวนเสื้อเชิ้ตบนไม้แขวนเสื้ออย่างเรียบร้อย|phii khwaaen suea-choet bon mai-khwaaen-suea yaang riiap-raawy|哥哥把衬衫整齐地挂在衣架上。|แขวนเสื้อในตู้|khwaaen suea nai dtuu|把衣服挂进柜子|พับผ้า|phap phaa|叠衣物|衣物
riit-suea|รีดเสื้อ|riit suea|熨衣服|动词|衣物用品|แม่รีดเสื้อเชิ้ตสีขาวก่อนพ่อไปทำงาน|maae riit suea-choet sii khaao gaawn phaaw bpai tham-ngaan|爸爸上班前，妈妈熨白衬衫。|รีดเสื้อให้เรียบ|riit suea hai riiap|把衣服熨平|ซักเสื้อ|sak suea|洗衣服|衣物
sak-suea|ซักเสื้อ|sak suea|洗衣服|动词|清洁用品|วันอาทิตย์ฉันซักเสื้อยืดและถุงเท้าบาง|wan-aa-thit chan sak suea-yuet lae thung-thaao baang|星期天我洗 T 恤和薄袜子。|ซักเสื้อผ้า|sak suea-phaa|洗衣物|รีดเสื้อ|riit suea|熨衣服|清洁
naam-oon|น้ำอุ่น|naam un|温水|名词|日常物品|ฉันใช้น้ำอุ่นล้างแก้วกาแฟตอนเช้า|chan chai naam un laang gaaeo gaa-faae dtaawn chaao|我早上用温水洗咖啡杯。|ใช้น้ำอุ่น|chai naam un|用温水|น้ำเย็น|naam yen|冷水|日用品
naam-yen|น้ำเย็น|naam yen|冷水|名词|日常物品|ในตู้เย็นเล็กมีน้ำเย็นสองขวด|nai dtuu-yen lek mii naam yen saawng khuat|小冰箱里有两瓶冷水。|ดื่มน้ำเย็น|duem naam yen|喝冷水|น้ำอุ่น|naam un|温水|日用品
khwaat-lek|ขวดเล็ก|khuat lek|小瓶子|名词|日常物品|ขวดเล็กใส่น้ำยาล้างมือได้พอดี|khuat lek sai nam-yaa laang mue dai phaaw-dii|小瓶子正好可以装洗手液。|เติมขวดเล็ก|dterm khuat lek|给小瓶子加满|ขวดใหญ่|khuat yai|大瓶子|日用品
khuat-yai|ขวดใหญ่|khuat yai|大瓶子|名词|日常物品|น้ำยาถูพื้นอยู่ในขวดใหญ่ใต้ชั้นวางของ|nam-yaa thuu phuen yuu nai khuat yai dtai chan waang khaawng|地板清洁剂在置物架下的大瓶子里。|ถือขวดใหญ่|thue khuat yai|拿大瓶子|ขวดเล็ก|khuat lek|小瓶子|日用品
glaawng-gra-daat|กล่องกระดาษ|glaawng gra-daat|纸盒|名词|颜色材质|ของเล่นเด็กอยู่ในกล่องกระดาษสีน้ำตาล|khaawng len dek yuu nai glaawng gra-daat sii nam-dtaan|儿童玩具在棕色纸盒里。|พับกล่องกระดาษ|phap glaawng gra-daat|折纸盒|กล่องพลาสติก|glaawng phlaat-sa-dtik|塑料盒|材质
thung-phaa|ถุงผ้า|thung phaa|布袋|名词|颜色材质|แม่ใช้ถุงผ้าใส่ของใช้ในบ้านจากตลาด|maae chai thung phaa sai khaawng chai nai baan jaak dta-laat|妈妈用布袋装从市场买的家用品。|ถือถุงผ้า|thue thung phaa|提布袋|ถุงพลาสติก|thung phlaat-sa-dtik|塑料袋|材质
thung-phlaat-sa-dtik|ถุงพลาสติก|thung phlaat-sa-dtik|塑料袋|名词|颜色材质|ถุงพลาสติกใบเล็กอยู่ข้างถังขยะ|thung phlaat-sa-dtik bai lek yuu khaang thang kha-ya|小塑料袋在垃圾桶旁边。|ใช้ถุงพลาสติก|chai thung phlaat-sa-dtik|用塑料袋|ถุงผ้า|thung phaa|布袋|材质
phaa-rai-fun|ผ้าปัดฝุ่น|phaa bpat fun|除尘布|名词|清洁用品|ฉันใช้ผ้าปัดฝุ่นเช็ดชั้นวางของทุกเช้า|chan chai phaa bpat fun chet chan waang khaawng thuk chaao|我每天早上用除尘布擦置物架。|ใช้ผ้าปัดฝุ่น|chai phaa bpat fun|用除尘布|เครื่องดูดฝุ่น|khreuuang duut fun|吸尘器|清洁
khong-khang-nai|ของข้างใน|khaawng khaang nai|里面的东西|名词|日常物品|อย่าเขย่ากล่องแรง เพราะของข้างในอาจแตก|yaa kha-yao glaawng raaeng phraw khaawng khaang nai aat dtaaek|不要用力摇盒子，因为里面的东西可能会碎。|ดูของข้างใน|duu khaawng khaang nai|看里面的东西|ของข้างนอก|khaawng khaang naawk|外面的东西|日用品
khong-khaang-naawk|ของข้างนอก|khaawng khaang naawk|外面的东西|名词|日常物品|ของข้างนอกกล่องเปียก แต่ของข้างในยังแห้ง|khaawng khaang naawk glaawng bpiiak dtaae khaawng khaang nai yang haaeng|盒子外面的东西湿了，但里面的东西还是干的。|เช็ดของข้างนอก|chet khaawng khaang naawk|擦外面的东西|ของข้างใน|khaawng khaang nai|里面的东西|日用品
yaa-gat-yung|ยากันยุง|yaa gan yung|驱蚊用品|名词|个人用品|หน้าฝนบ้านเรามียากันยุงใกล้ประตูหลัง|naa fon baan rao mii yaa gan yung glai bpra-dtuu lang|雨季我们家后门附近有驱蚊用品。|ใช้ยากันยุง|chai yaa gan yung|用驱蚊用品|สเปรย์ห้อง|sa-bpree haawng|房间喷雾|用品
sa-bpree-haawng|สเปรย์ห้อง|sa-bpree haawng|房间喷雾|名词|清洁用品|แม่ฉีดสเปรย์ห้องนิดหน่อยหลังทำความสะอาด|maae chiit sa-bpree haawng nit naawy lang tham khwaam sa-aat|妈妈打扫后喷了一点房间喷雾。|ฉีดสเปรย์ห้อง|chiit sa-bpree haawng|喷房间喷雾|ยากันยุง|yaa gan yung|驱蚊用品|清洁
phaa-klum|ผ้าคลุม|phaa khlum|盖布；罩布|名词|日常物品|ยายใช้ผ้าคลุมสีขาวคลุมโต๊ะเล็ก|yaai chai phaa khlum sii khaao khlum dto lek|奶奶用白色盖布盖住小桌子。|ใช้ผ้าคลุม|chai phaa khlum|用盖布|ผ้าปูโต๊ะ|phaa bpuu dto|桌布|布料
gra-daat-chet-khruua|กระดาษเช็ดครัว|gra-daat chet khruua|厨房纸|名词|清洁用品|กระดาษเช็ดครัวช่วยซับน้ำบนโต๊ะอาหารได้เร็ว|gra-daat chet khruua chuai sap naam bon dto aa-haan dai reo|厨房纸能很快吸掉餐桌上的水。|ใช้กระดาษเช็ดครัว|chai gra-daat chet khruua|用厨房纸|กระดาษทิชชู|gra-daat thit-chuu|纸巾|清洁
khruueang-bpen-khon|เครื่องปั่น|khreuuang bpan|搅拌机|名词|电子用品|เครื่องปั่นอยู่ในตู้ในครัวและใช้ทำน้ำผลไม้|khreuuang bpan yuu nai dtuu nai khruua lae chai tham naam phon-la-maai|搅拌机在厨房柜子里，用来做果汁。|ล้างเครื่องปั่น|laang khreuuang bpan|洗搅拌机|หม้อหุงข้าว|maw hung khaao|电饭锅|电器
aang-laang-jaan|อ่างล้างจาน|aang laang jaan|洗碗池|名词|家具房间|อ่างล้างจานอยู่ข้างหน้าต่างในห้องครัว|aang laang jaan yuu khaang naa-dtaang nai haawng khruua|洗碗池在厨房窗户旁边。|ล้างอ่างล้างจาน|laang aang laang jaan|清洗洗碗池|อ่างล้างหน้า|aang laang naa|洗脸池|房间
aang-laang-naa|อ่างล้างหน้า|aang laang naa|洗脸池|名词|家具房间|แปรงสีฟันและยาสีฟันวางอยู่ใกล้อ่างล้างหน้า|bpraaeng sii fan lae yaa sii fan waang yuu glai aang laang naa|牙刷和牙膏放在洗脸池附近。|เช็ดอ่างล้างหน้า|chet aang laang naa|擦洗脸池|อ่างล้างจาน|aang laang jaan|洗碗池|房间
raan-khaawng-nai-baan|ร้านของในบ้าน|raan khaawng nai baan|家居用品店|名词|日常物品|ร้านของในบ้านใกล้ตลาดขายผ้าม่านและกล่องเก็บของ|raan khaawng nai baan glai dta-laat khaai phaa-maan lae glaawng gep khaawng|市场附近的家居用品店卖窗帘和收纳盒。|ไปร้านของในบ้าน|bpai raan khaawng nai baan|去家居用品店|ของใช้ในบ้าน|khaawng chai nai baan|家用品|购物
dtit-phaa-maan|ติดผ้าม่าน|dtit phaa-maan|装窗帘|动词|家具房间|พ่อช่วยติดผ้าม่านใหม่ในห้องนอนเล็ก|phaaw chuai dtit phaa-maan mai nai haawng naawn lek|爸爸帮忙在小卧室装新窗帘。|ติดผ้าม่านสีฟ้า|dtit phaa-maan sii faa|装蓝色窗帘|เปิดผ้าม่าน|bpoet phaa-maan|拉开窗帘|房间
phaa-sii|ผ้าสี|phaa sii|彩色布|名词|颜色材质|กล่องเก็บของมีผ้าสีหลายผืนสำหรับงานบ้าน|glaawng gep khaawng mii phaa sii laai phuen sam-rap ngaan baan|收纳盒里有几块做家务用的彩色布。|ใช้ผ้าสี|chai phaa sii|用彩色布|ผ้าขาว|phaa khaao|白布|材质
phaa-khaao|ผ้าขาว|phaa khaao|白布|名词|颜色材质|ผ้าขาวผืนนี้ใช้คลุมโต๊ะตอนมีแขก|phaa khaao phuen nii chai khlum dto dtaawn mii khaaek|这块白布在有客人时用来盖桌子。|ซักผ้าขาว|sak phaa khaao|洗白布|ผ้าสี|phaa sii|彩色布|材质
thii-nawn-phuen|ที่นอนพื้น|thii naawn phuen|地铺；铺在地上的睡垫|名词|家具房间|เพื่อนมานอนบ้านเรา ฉันจึงเตรียมที่นอนพื้นให้|phuean maa naawn baan rao chan jeung dtriiam thii naawn phuen hai|朋友来我家睡，所以我准备了地铺。|ปูที่นอนพื้น|bpuu thii naawn phuen|铺地铺|ฟูกนอน|fuuk naawn|床垫|家具
phaa-bpuu-phuen|ผ้าปูพื้น|phaa bpuu phuen|地垫；铺地布|名词|家具房间|ผ้าปูพื้นหน้าประตูช่วยให้เท้าไม่เปียก|phaa bpuu phuen naa bpra-dtuu chuai hai thaao mai bpiiak|门口地垫帮助脚不湿。|ซักผ้าปูพื้น|sak phaa bpuu phuen|洗地垫|พรม|phrom|地毯|家具
thii-khaeng-phaa|ที่แขวนผ้า|thii khwaaen phaa|挂毛巾架；挂布处|名词|家具房间|ที่แขวนผ้าในห้องอาบน้ำอยู่สูงไปสำหรับเด็ก|thii khwaaen phaa nai haawng aap naam yuu suung bpai sam-rap dek|浴室里的挂毛巾架对孩子来说太高了。|ใช้ที่แขวนผ้า|chai thii khwaaen phaa|使用挂布架|ราวตากผ้า|raao dtaak phaa|晾衣杆|家具
khruueang-rap-wai-fai|เครื่องรับไวไฟ|khreuuang rap wai-fai|无线网络接收器|名词|电子用品|เครื่องรับไวไฟอยู่ข้างทีวีในห้องนั่งเล่น|khreuuang rap wai-fai yuu khaang thii-wii nai haawng nang len|无线网络接收器在客厅电视旁边。|เปิดเครื่องรับไวไฟ|bpoet khreuuang rap wai-fai|打开无线网络接收器|ปลั๊กไฟ|bplak fai|电源插座|电器
lam-phong-lek|ลำโพงเล็ก|lam-phoong lek|小音箱|名词|电子用品|ลำโพงเล็กสีดำวางอยู่บนโต๊ะเขียนหนังสือ|lam-phoong lek sii dam waang yuu bon dto khiian nang-sue|黑色小音箱放在书桌上。|เปิดลำโพงเล็ก|bpoet lam-phoong lek|打开小音箱|หูฟัง|huu-fang|耳机|电器
huu-fang|หูฟัง|huu-fang|耳机|名词|电子用品|หูฟังของฉันอยู่ในกล่องเก็บของสีเหลือง|huu-fang khaawng chan yuu nai glaawng gep khaawng sii lueang|我的耳机在黄色收纳盒里。|ใส่หูฟัง|sai huu-fang|戴耳机|ลำโพงเล็ก|lam-phoong lek|小音箱|电器
khruueang-khit-lek|เครื่องคิดเลข|khreuuang khit leek|计算器|名词|电子用品|แม่ใช้เครื่องคิดเลขคิดราคาของใช้ในบ้าน|maae chai khreuuang khit leek khit raa-khaa khaawng chai nai baan|妈妈用计算器算家用品价格。|กดเครื่องคิดเลข|got khreuuang khit leek|按计算器|โทรศัพท์มือถือ|thoo-ra-sap mue-thue|手机|电器
thoo-ra-sap-mue-thue|โทรศัพท์มือถือ|thoo-ra-sap mue-thue|手机|名词|电子用品|โทรศัพท์มือถือของพี่ชาร์จอยู่ข้างเตียง|thoo-ra-sap mue-thue khaawng phii chaat yuu khaang dtiiang|哥哥的手机正在床边充电。|ชาร์จโทรศัพท์มือถือ|chaat thoo-ra-sap mue-thue|给手机充电|ที่ชาร์จ|thii chaat|充电器|电器
chaat-baeet|ชาร์จแบต|chaat baaet|充电|动词|电子用品|ก่อนออกจากบ้าน ฉันต้องชาร์จแบตโทรศัพท์มือถือ|gaawn aawk jaak baan chan dtawng chaat baaet thoo-ra-sap mue-thue|出门前，我必须给手机充电。|ชาร์จแบตให้เต็ม|chaat baaet hai dtem|把电充满|เสียบปลั๊ก|siap bplak|插电|电器
siap-bplak|เสียบปลั๊ก|siap bplak|插电；插插头|动词|电子用品|อย่าลืมเสียบปลั๊กหม้อหุงข้าวก่อนกดปุ่ม|yaa luem siap bplak maw hung khaao gaawn got bpum|按按钮前，别忘了给电饭锅插电。|เสียบปลั๊กไฟ|siap bplak fai|插电源|ถอดปลั๊ก|thaawt bplak|拔插头|电器
thaawt-bplak|ถอดปลั๊ก|thaawt bplak|拔插头|动词|电子用品|หลังใช้เตาไฟฟ้าเสร็จแล้ว ควรถอดปลั๊กทุกครั้ง|lang chai dtao fai-faa set laaeo khuuan thaawt bplak thuk khrang|用完电炉后，每次都应该拔插头。|ถอดปลั๊กไฟ|thaawt bplak fai|拔电源|เสียบปลั๊ก|siap bplak|插电|电器
phaa-uan|ผ้าอุ่น|phaa un|暖布；温热毛巾|名词|个人用品|แม่ใช้ผ้าอุ่นเช็ดมือให้น้องตอนเช้า|maae chai phaa un chet mue hai naawng dtaawn chaao|妈妈早上用温热毛巾给弟弟擦手。|ใช้ผ้าอุ่น|chai phaa un|用温热毛巾|ผ้าเย็น|phaa yen|冷毛巾|用品
phaa-yen|ผ้าเย็น|phaa yen|冷毛巾|名词|个人用品|หลังออกกำลังกาย พ่อใช้ผ้าเย็นเช็ดหน้า|lang aawk-gam-lang-gaai phaaw chai phaa yen chet naa|运动后，爸爸用冷毛巾擦脸。|แจกผ้าเย็น|jaaek phaa yen|发冷毛巾|ผ้าอุ่น|phaa un|温热毛巾|用品
faak-khaawng|ฝากของ|faak khaawng|寄放东西|动词|日常物品|ฉันฝากของเล็ก ๆ ไว้กับพี่ก่อนออกไปซื้อของ|chan faak khaawng lek lek wai gap phii gaawn aawk bpai sue khaawng|我出去买东西前，把小东西寄放在哥哥那里。|ฝากของไว้|faak khaawng wai|寄放东西|เอากลับบ้าน|ao glap baan|带回家|日用品
ao-glap-baan|เอากลับบ้าน|ao glap baan|带回家|动词|日常物品|ของใหม่ในถุงผ้าต้องเอากลับบ้านวันนี้|khaawng mai nai thung phaa dtawng ao glap baan wan-nii|布袋里的新东西今天必须带回家。|เอาของกลับบ้าน|ao khaawng glap baan|把东西带回家|ฝากของ|faak khaawng|寄放东西|日用品
mai-chai-khaawng-chan|ไม่ใช่ของฉัน|mai chai khaawng chan|不是我的|短语|日常物品|รองเท้าแตะคู่นี้ไม่ใช่ของฉัน น่าจะเป็นของแม่|raawng-thaao dtae khuu nii mai chai khaawng chan naa ja bpen khaawng maae|这双拖鞋不是我的，应该是妈妈的。|บอกว่าไม่ใช่ของฉัน|baawk waa mai chai khaawng chan|说不是我的|ของฉัน|khaawng chan|我的东西|实用句
chai-duai-gan|ใช้ด้วยกัน|chai duai gan|一起用；共用|动词|日常物品|เราสามารถใช้เครื่องดูดฝุ่นด้วยกันในห้องนั่งเล่น|rao saa-maat chai khreuuang duut fun duai gan nai haawng nang len|我们可以在客厅一起用吸尘器。|ใช้ของด้วยกัน|chai khaawng duai gan|共用东西|ใช้คนเดียว|chai khon diao|一个人用|实用句
chai-khon-diao|ใช้คนเดียว|chai khon diao|一个人用|动词|日常物品|แก้วน้ำใบนี้ฉันใช้คนเดียว เพราะเป็นแก้วส่วนตัว|gaaeo naam bai nii chan chai khon diao phraw bpen gaaeo suan-dtua|这个水杯我一个人用，因为是个人杯子。|ใช้ของคนเดียว|chai khaawng khon diao|一个人用东西|ใช้ด้วยกัน|chai duai gan|一起用|实用句
suun-dtua|ส่วนตัว|suan-dtua|个人的；私人的|形容词|个人用品|ของใช้ส่วนตัวควรเก็บในกระเป๋าของตัวเอง|khaawng chai suan-dtua khuuan gep nai gra-bpao khaawng dtua-eeng|个人用品应该放在自己的包里。|ของใช้ส่วนตัว|khaawng chai suan-dtua|个人用品|ของใช้ร่วมกัน|khaawng chai ruam gan|共用品|用品
ruam-gan|ร่วมกัน|ruam gan|共同的；一起的|形容词|日常物品|น้ำยาถูพื้นเป็นของใช้ร่วมกันของทุกคนในบ้าน|nam-yaa thuu phuen bpen khaawng chai ruam gan khaawng thuk khon nai baan|地板清洁剂是家里所有人共同使用的用品。|ใช้ร่วมกัน|chai ruam gan|共同使用|ส่วนตัว|suan-dtua|个人的|用品
`;

export const VOCABULARY_EXPANSION_A1_OBJECTS_HOME_01: VocabularyExpansionA1ObjectsHomeCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
