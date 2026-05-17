export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "清洁" | "维修" | "坏了" | "漏水停电" | "家务工具" | "房屋问题" | "请人修理" | "整理收纳";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = {
  id: string;
  chinese: string;
  examples: VocabularyExpansionExample[];
  synonyms: VocabularyExpansionRelatedWord[];
  antonyms: VocabularyExpansionRelatedWord[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  usageNotesZh: string[];
  tags: string[];
};
export type VocabularyExpansionCandidate = {
  thai: string;
  id: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  level: "a2";
  priority: number;
  senses: VocabularyExpansionSense[];
  synonyms: VocabularyExpansionRelatedWord[];
  antonyms: VocabularyExpansionRelatedWord[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  usageNotesZh: string[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: "candidate-draft";
};

type Definition = {
  thai: string;
  id: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  exampleThai: string;
  exampleRoman: string;
  exampleChinese: string;
  tag: string;
};

type Place = { thai: string; roman: string; chinese: string; id: string };
type Thing = { thai: string; roman: string; chinese: string; id: string };

const HOME_MAINTENANCE_CLEANING_REFS = ["thai-frequency", "thai-a2-home-maintenance-cleaning-candidate"];

const cleaningPlaces: readonly Place[] = [
  { thai: "ห้องนอนเล็ก", roman: "haawng naawn lek", chinese: "小卧室", id: "haawng-naawn-lek" },
  { thai: "ห้องนั่งเล่น", roman: "haawng nang len", chinese: "客厅", id: "haawng-nang-len" },
  { thai: "ห้องครัวหลังบ้าน", roman: "haawng khrua lang baan", chinese: "屋后的厨房", id: "haawng-khrua-lang-baan" },
  { thai: "ห้องน้ำชั้นล่าง", roman: "haawng naam chan laang", chinese: "楼下卫生间", id: "haawng-naam-chan-laang" },
  { thai: "ระเบียงหน้า", roman: "ra-biiang naa", chinese: "前阳台", id: "ra-biiang-naa" },
  { thai: "บันไดบ้าน", roman: "ban-dai baan", chinese: "家里的楼梯", id: "ban-dai-baan" },
  { thai: "โต๊ะกินข้าว", roman: "dto gin khaao", chinese: "餐桌", id: "dto-gin-khaao" },
  { thai: "ตู้เย็นด้านนอก", roman: "dtuu-yen daan naawk", chinese: "冰箱外面", id: "dtuu-yen-daan-naawk" },
  { thai: "พื้นหน้าประตู", roman: "pheun naa bpra-dtuu", chinese: "门前地面", id: "pheun-naa-bpra-dtuu" },
  { thai: "หน้าต่างห้องนอน", roman: "naa-dtaang haawng naawn", chinese: "卧室窗户", id: "naa-dtaang-haawng-naawn" },
  { thai: "ชั้นวางรองเท้า", roman: "chan waang raawng-thaao", chinese: "鞋架", id: "chan-waang-raawng-thaao" },
  { thai: "อ่างล้างจาน", roman: "aang laang jaan", chinese: "洗碗池", id: "aang-laang-jaan" },
  { thai: "เตาแก๊ส", roman: "dtao gaaet", chinese: "燃气灶", id: "dtao-gaaet" },
  { thai: "พัดลมตั้งพื้น", roman: "phat-lom dtang pheun", chinese: "落地风扇", id: "phat-lom-dtang-pheun" },
  { thai: "โซฟาผ้า", roman: "soo-faa phaa", chinese: "布沙发", id: "soo-faa-phaa" },
  { thai: "พรมหน้าห้อง", roman: "phrom naa haawng", chinese: "房门口地毯", id: "phrom-naa-haawng" },
  { thai: "มุมทำงาน", roman: "mum tham-ngaan", chinese: "工作角", id: "mum-tham-ngaan" },
  { thai: "ตู้เสื้อผ้า", roman: "dtuu seua-phaa", chinese: "衣柜", id: "dtuu-seua-phaa" },
  { thai: "ชั้นหนังสือ", roman: "chan nang-sue", chinese: "书架", id: "chan-nang-sue" },
  { thai: "ถังขยะในครัว", roman: "thang kha-ya nai khrua", chinese: "厨房垃圾桶", id: "thang-kha-ya-nai-khrua" },
  { thai: "กระจกห้องน้ำ", roman: "gra-jok haawng naam", chinese: "浴室镜子", id: "gra-jok-haawng-naam" },
  { thai: "พื้นหลังฝนตก", roman: "pheun lang fon dtok", chinese: "雨后的地面", id: "pheun-lang-fon-dtok" },
  { thai: "ประตูหลังบ้าน", roman: "bpra-dtuu lang baan", chinese: "后门", id: "bpra-dtuu-lang-baan" },
  { thai: "ลานซักผ้า", roman: "laan sak phaa", chinese: "洗衣区", id: "laan-sak-phaa" },
];

const brokenThings: readonly Thing[] = [
  { thai: "หลอดไฟหน้าบ้าน", roman: "laawt fai naa baan", chinese: "家门口灯泡", id: "laawt-fai-naa-baan" },
  { thai: "สวิตช์ไฟห้องนอน", roman: "sa-wit fai haawng naawn", chinese: "卧室电灯开关", id: "sa-wit-fai-haawng-naawn" },
  { thai: "ปลั๊กไฟหลังโต๊ะ", roman: "bplak fai lang dto", chinese: "桌子后面的插座", id: "bplak-fai-lang-dto" },
  { thai: "ก๊อกน้ำในครัว", roman: "gaawk naam nai khrua", chinese: "厨房水龙头", id: "gaawk-naam-nai-khrua" },
  { thai: "ฝักบัวห้องน้ำ", roman: "fak-bua haawng naam", chinese: "浴室花洒", id: "fak-bua-haawng-naam" },
  { thai: "ท่อน้ำใต้ซิงก์", roman: "thaaw naam dtai sing", chinese: "水槽下水管", id: "thaaw-naam-dtai-sing" },
  { thai: "ประตูตู้เสื้อผ้า", roman: "bpra-dtuu dtuu seua-phaa", chinese: "衣柜门", id: "bpra-dtuu-dtuu-seua-phaa" },
  { thai: "ลิ้นชักโต๊ะ", roman: "lin-chak dto", chinese: "桌子抽屉", id: "lin-chak-dto" },
  { thai: "ขาเก้าอี้", roman: "khaa gao-ii", chinese: "椅子腿", id: "khaa-gao-ii" },
  { thai: "มุ้งลวดหน้าต่าง", roman: "mung-luat naa-dtaang", chinese: "窗纱", id: "mung-luat-naa-dtaang" },
  { thai: "รีโมตทีวี", roman: "rii-moot thii-wii", chinese: "电视遥控器", id: "rii-moot-thii-wii" },
  { thai: "เครื่องซักผ้า", roman: "khreuuang sak phaa", chinese: "洗衣机", id: "khreuuang-sak-phaa" },
  { thai: "ตู้เย็นเก่า", roman: "dtuu-yen gao", chinese: "旧冰箱", id: "dtuu-yen-gao" },
  { thai: "พัดลมห้องรับแขก", roman: "phat-lom haawng rap-khaaek", chinese: "客厅风扇", id: "phat-lom-haawng-rap-khaaek" },
  { thai: "แอร์ห้องนอน", roman: "aae haawng naawn", chinese: "卧室空调", id: "aae-haawng-naawn" },
  { thai: "เตาไฟฟ้า", roman: "dtao fai-faa", chinese: "电炉", id: "dtao-fai-faa" },
  { thai: "กุญแจประตู", roman: "gun-jaae bpra-dtuu", chinese: "门钥匙", id: "gun-jaae-bpra-dtuu" },
  { thai: "กลอนประตู", roman: "glaawn bpra-dtuu", chinese: "门闩", id: "glaawn-bpra-dtuu" },
  { thai: "หลังคาหลังบ้าน", roman: "lang-khaa lang baan", chinese: "屋后屋顶", id: "lang-khaa-lang-baan" },
  { thai: "ผนังใกล้หน้าต่าง", roman: "pha-nang glai naa-dtaang", chinese: "窗边墙面", id: "pha-nang-glai-naa-dtaang" },
  { thai: "กระเบื้องห้องน้ำ", roman: "gra-beuuang haawng naam", chinese: "浴室瓷砖", id: "gra-beuuang-haawng-naam" },
  { thai: "ท่อระบายน้ำ", roman: "thaaw ra-baai naam", chinese: "排水管", id: "thaaw-ra-baai-naam" },
  { thai: "สายชาร์จ", roman: "saai chaat", chinese: "充电线", id: "saai-chaat" },
  { thai: "ที่จับประตู", roman: "thii jap bpra-dtuu", chinese: "门把手", id: "thii-jap-bpra-dtuu" },
];

const requestRows: readonly Definition[] = [
  { thai: "เรียกช่างมาดู", id: "riiak-chaang-maa-duu", roman: "riiak chaang maa duu", chinese: "叫师傅来看", partOfSpeech: "短语", theme: "请人修理", exampleThai: "ถ้าซ่อมเองไม่ได้ เราควรเรียกช่างมาดู", exampleRoman: "thaa saawm eeng mai dai, rao khuuan riiak chaang maa duu", exampleChinese: "如果自己修不了，我们应该叫师傅来看。", tag: "请修" },
  { thai: "นัดช่างพรุ่งนี้เช้า", id: "nat-chaang-phrung-nii-chaao", roman: "nat chaang phrung-nii chaao", chinese: "约师傅明天早上来", partOfSpeech: "短语", theme: "请人修理", exampleThai: "เจ้าของบ้านนัดช่างพรุ่งนี้เช้าเพื่อซ่อมแอร์", exampleRoman: "jao-khaawng baan nat chaang phrung-nii chaao phuea saawm aae", exampleChinese: "房东约师傅明早来修空调。", tag: "请修" },
  { thai: "ขอเบอร์ช่างไฟ", id: "khaaw-booe-chaang-fai", roman: "khaaw booe chaang fai", chinese: "要电工电话", partOfSpeech: "短语", theme: "请人修理", exampleThai: "ไฟในครัวเสีย ฉันขอเบอร์ช่างไฟจากเพื่อน", exampleRoman: "fai nai khrua siia, chan khaaw booe chaang fai jaak phuean", exampleChinese: "厨房灯坏了，我向朋友要电工电话。", tag: "请修" },
  { thai: "ถามค่าซ่อมก่อน", id: "thaam-khaa-saawm-gaawn", roman: "thaam khaa saawm gaawn", chinese: "先问维修费", partOfSpeech: "短语", theme: "维修", exampleThai: "ก่อนให้ช่างทำ ฉันถามค่าซ่อมก่อน", exampleRoman: "gaawn hai chaang tham, chan thaam khaa saawm gaawn", exampleChinese: "让师傅修之前，我先问维修费。", tag: "费用" },
  { thai: "ซ่อมเสร็จหรือยัง", id: "saawm-set-reu-yang", roman: "saawm set reu yang", chinese: "修好了吗", partOfSpeech: "短语", theme: "维修", exampleThai: "เครื่องซักผ้าซ่อมเสร็จหรือยังคะ", exampleRoman: "khreuuang sak phaa saawm set reu yang kha", exampleChinese: "洗衣机修好了吗？", tag: "维修" },
  { thai: "ยังใช้ไม่ได้", id: "yang-chai-mai-dai", roman: "yang chai mai dai", chinese: "还不能用", partOfSpeech: "短语", theme: "坏了", exampleThai: "พัดลมซ่อมแล้ว แต่ยังใช้ไม่ได้", exampleRoman: "phat-lom saawm laaeo, dtaae yang chai mai dai", exampleChinese: "风扇修过了，但还不能用。", tag: "坏了" },
  { thai: "ลองเปิดอีกครั้ง", id: "laawng-bpoet-iik-khrang", roman: "laawng bpoet iik khrang", chinese: "再试着打开一次", partOfSpeech: "短语", theme: "维修", exampleThai: "ช่างบอกให้ลองเปิดอีกครั้งหลังซ่อมเสร็จ", exampleRoman: "chaang baawk hai laawng bpoet iik khrang lang saawm set", exampleChinese: "师傅说修好后再试着打开一次。", tag: "维修" },
  { thai: "ปิดน้ำก่อนซ่อม", id: "bpit-naam-gaawn-saawm", roman: "bpit naam gaawn saawm", chinese: "维修前先关水", partOfSpeech: "短语", theme: "漏水停电", exampleThai: "ถ้าก๊อกน้ำรั่ว ต้องปิดน้ำก่อนซ่อม", exampleRoman: "thaa gaawk naam rua, dtawng bpit naam gaawn saawm", exampleChinese: "如果水龙头漏水，维修前要先关水。", tag: "漏水" },
  { thai: "ปิดไฟก่อนเปลี่ยนหลอด", id: "bpit-fai-gaawn-bplian-laawt", roman: "bpit fai gaawn bplian laawt", chinese: "换灯泡前先关电", partOfSpeech: "短语", theme: "维修", exampleThai: "เพื่อความปลอดภัย ต้องปิดไฟก่อนเปลี่ยนหลอด", exampleRoman: "phuea khwaam bplaawt-phai, dtawng bpit fai gaawn bplian laawt", exampleChinese: "为了安全，换灯泡前要先关电。", tag: "维修" },
  { thai: "ไฟดับทั้งบ้าน", id: "fai-dap-thang-baan", roman: "fai dap thang baan", chinese: "全家停电", partOfSpeech: "短语", theme: "漏水停电", exampleThai: "เมื่อคืนฝนตกหนักและไฟดับทั้งบ้าน", exampleRoman: "muea-kheun fon dtok nak lae fai dap thang baan", exampleChinese: "昨晚雨下得大，全家停电。", tag: "停电" },
  { thai: "น้ำไม่ไหลตอนเช้า", id: "naam-mai-lai-dtaawn-chaao", roman: "naam mai lai dtaawn chaao", chinese: "早上停水", partOfSpeech: "短语", theme: "漏水停电", exampleThai: "วันนี้น้ำไม่ไหลตอนเช้า เราจึงอาบน้ำไม่ได้", exampleRoman: "wan-nii naam mai lai dtaawn chaao, rao jeung aap naam mai dai", exampleChinese: "今天早上停水，所以我们不能洗澡。", tag: "停水" },
  { thai: "น้ำซึมจากผนัง", id: "naam-seum-jaak-pha-nang", roman: "naam seum jaak pha-nang", chinese: "墙面渗水", partOfSpeech: "短语", theme: "漏水停电", exampleThai: "หลังฝนตก น้ำซึมจากผนังใกล้หน้าต่าง", exampleRoman: "lang fon dtok, naam seum jaak pha-nang glai naa-dtaang", exampleChinese: "下雨后，窗边墙面渗水。", tag: "漏水" },
  { thai: "พื้นลื่นหลังถู", id: "pheun-leun-lang-thuu", roman: "pheun leun lang thuu", chinese: "拖地后地滑", partOfSpeech: "短语", theme: "清洁", exampleThai: "พื้นลื่นหลังถู เดินช้า ๆ นะ", exampleRoman: "pheun leun lang thuu, doen chaa chaa na", exampleChinese: "拖地后地滑，慢慢走。", tag: "清洁" },
  { thai: "ถังขยะเต็มแล้ว", id: "thang-kha-ya-dtem-laaeo", roman: "thang kha-ya dtem laaeo", chinese: "垃圾桶满了", partOfSpeech: "短语", theme: "清洁", exampleThai: "ถังขยะเต็มแล้ว ช่วยเอาไปทิ้งหน่อย", exampleRoman: "thang kha-ya dtem laaeo, chuai ao bpai thing naawy", exampleChinese: "垃圾桶满了，请帮忙拿去倒掉。", tag: "垃圾" },
  { thai: "แยกขยะเปียก", id: "yaaek-kha-ya-bpiiak", roman: "yaaek kha-ya bpiiak", chinese: "分出湿垃圾", partOfSpeech: "短语", theme: "清洁", exampleThai: "ก่อนทิ้งขยะ แม่ให้แยกขยะเปียกออกมา", exampleRoman: "gaawn thing kha-ya, maae hai yaaek kha-ya bpiiak aawk maa", exampleChinese: "倒垃圾前，妈妈让把湿垃圾分出来。", tag: "垃圾" },
  { thai: "แยกขยะแห้ง", id: "yaaek-kha-ya-haaeng", roman: "yaaek kha-ya haaeng", chinese: "分出干垃圾", partOfSpeech: "短语", theme: "清洁", exampleThai: "เรามีกล่องไว้แยกขยะแห้งในครัว", exampleRoman: "rao mii glaawng wai yaaek kha-ya haaeng nai khrua", exampleChinese: "我们在厨房有个盒子用来分干垃圾。", tag: "垃圾" },
  { thai: "ใช้ถุงมือยาง", id: "chai-thung-mue-yaang", roman: "chai thung mue yaang", chinese: "使用橡胶手套", partOfSpeech: "短语", theme: "家务工具", exampleThai: "เวลาล้างห้องน้ำ ฉันใช้ถุงมือยาง", exampleRoman: "wee-laa laang haawng naam, chan chai thung mue yaang", exampleChinese: "洗浴室时，我使用橡胶手套。", tag: "工具" },
  { thai: "ใช้ผ้าแห้งเช็ด", id: "chai-phaa-haaeng-chet", roman: "chai phaa haaeng chet", chinese: "用干布擦", partOfSpeech: "短语", theme: "家务工具", exampleThai: "ถ้าโต๊ะเปียก ใช้ผ้าแห้งเช็ดได้", exampleRoman: "thaa dto bpiiak, chai phaa haaeng chet dai", exampleChinese: "如果桌子湿了，可以用干布擦。", tag: "工具" },
  { thai: "ซื้อไม้ถูพื้นใหม่", id: "seu-maai-thuu-pheun-mai", roman: "seu maai thuu pheun mai", chinese: "买新拖把", partOfSpeech: "短语", theme: "家务工具", exampleThai: "ไม้ถูพื้นเก่าหักแล้ว เราต้องซื้อไม้ถูพื้นใหม่", exampleRoman: "maai thuu pheun gao hak laaeo, rao dtawng seu maai thuu pheun mai", exampleChinese: "旧拖把断了，我们得买新拖把。", tag: "工具" },
  { thai: "เก็บอุปกรณ์เข้าที่", id: "gep-up-bpa-gaawn-khao-thii", roman: "gep up-bpa-gaawn khao thii", chinese: "把工具收回原位", partOfSpeech: "短语", theme: "整理收纳", exampleThai: "หลังทำความสะอาด ต้องเก็บอุปกรณ์เข้าที่", exampleRoman: "lang tham khwaam sa-aat, dtawng gep up-bpa-gaawn khao thii", exampleChinese: "打扫后，要把工具收回原位。", tag: "收纳" },
  { thai: "เช็ดน้ำที่พื้นทันที", id: "chet-naam-thii-pheun-than-thii", roman: "chet naam thii pheun than-thii", chinese: "马上擦掉地上的水", partOfSpeech: "短语", theme: "清洁", exampleThai: "ถ้าน้ำหก ต้องเช็ดน้ำที่พื้นทันที", exampleRoman: "thaa naam hok, dtawng chet naam thii pheun than-thii", exampleChinese: "如果水洒了，要马上擦掉地上的水。", tag: "清洁" },
  { thai: "เปิดหน้าต่างให้อากาศเข้า", id: "bpoet-naa-dtaang-hai-aa-gaat-khao", roman: "bpoet naa-dtaang hai aa-gaat khao", chinese: "打开窗户让空气进来", partOfSpeech: "短语", theme: "房屋问题", exampleThai: "ห้องมีกลิ่นอับ เราควรเปิดหน้าต่างให้อากาศเข้า", exampleRoman: "haawng mii glin ap, rao khuuan bpoet naa-dtaang hai aa-gaat khao", exampleChinese: "房间有霉味/闷味，我们应该打开窗户让空气进来。", tag: "通风" },
  { thai: "วางป้ายพื้นเปียก", id: "waang-bpaai-pheun-bpiiak", roman: "waang bpaai pheun bpiiak", chinese: "放置地面湿滑提示牌", partOfSpeech: "短语", theme: "清洁", exampleThai: "หลังถูพื้น พนักงานวางป้ายพื้นเปียกหน้าห้องน้ำ", exampleRoman: "lang thuu pheun, pha-nak-ngaan waang bpaai pheun bpiiak naa haawng naam", exampleChinese: "拖地后，工作人员在洗手间前放置地面湿滑提示牌。", tag: "清洁" },
  { thai: "เปิดไฟฉายตอนดับไฟ", id: "bpoet-fai-chaai-dtaawn-dap-fai", roman: "bpoet fai-chaai dtaawn dap fai", chinese: "停电时打开手电筒", partOfSpeech: "短语", theme: "漏水停电", exampleThai: "เมื่อคืนไฟดับ เราเปิดไฟฉายตอนดับไฟ", exampleRoman: "muea-kheun fai dap, rao bpoet fai-chaai dtaawn dap fai", exampleChinese: "昨晚停电时，我们打开手电筒。", tag: "停电" },
];

const storageThings: readonly Thing[] = [
  { thai: "เสื้อกันหนาว", roman: "seua gan naao", chinese: "外套", id: "seua-gan-naao" },
  { thai: "เสื้อทำงาน", roman: "seua tham-ngaan", chinese: "工作服", id: "seua-tham-ngaan" },
  { thai: "ผ้าเช็ดตัว", roman: "phaa chet dtua", chinese: "毛巾", id: "phaa-chet-dtua" },
  { thai: "ผ้าปูที่นอน", roman: "phaa bpuu thii-naawn", chinese: "床单", id: "phaa-bpuu-thii-naawn" },
  { thai: "หมอนเล็ก", roman: "maawn lek", chinese: "小枕头", id: "maawn-lek" },
  { thai: "ของเล่นเด็ก", roman: "khaawng-len dek", chinese: "儿童玩具", id: "khaawng-len-dek" },
  { thai: "หนังสือเรียน", roman: "nang-sue riian", chinese: "课本", id: "nang-sue-riian" },
  { thai: "เอกสารเก่า", roman: "eek-ga-saan gao", chinese: "旧文件", id: "eek-ga-saan-gao" },
  { thai: "สายไฟยาว", roman: "saai fai yaao", chinese: "长电线", id: "saai-fai-yaao" },
  { thai: "ถุงผ้าหลายใบ", roman: "thung phaa laai bai", chinese: "几个布袋", id: "thung-phaa-laai-bai" },
  { thai: "ขวดน้ำเปล่า", roman: "khuat naam bplao", chinese: "空水瓶", id: "khuat-naam-bplao" },
  { thai: "กล่องกระดาษ", roman: "glaawng gra-daat", chinese: "纸箱", id: "glaawng-gra-daat" },
  { thai: "รองเท้าเก่า", roman: "raawng-thaao gao", chinese: "旧鞋", id: "raawng-thaao-gao" },
  { thai: "ของใช้ในครัว", roman: "khaawng chai nai khrua", chinese: "厨房用品", id: "khaawng-chai-nai-khrua" },
  { thai: "ยาสามัญ", roman: "yaa saa-man", chinese: "常用药", id: "yaa-saa-man" },
  { thai: "หน้ากากสำรอง", roman: "naa-gaak sam-raawng", chinese: "备用口罩", id: "naa-gaak-sam-raawng" },
  { thai: "แบตเตอรี่เก่า", roman: "baet-dtuu-rii gao", chinese: "旧电池", id: "baet-dtuu-rii-gao" },
  { thai: "เครื่องมือเล็ก ๆ", roman: "khreuuang-mue lek lek", chinese: "小工具", id: "khreuuang-mue-lek-lek" },
  { thai: "น้ำยาทำความสะอาด", roman: "naam-yaa tham khwaam sa-aat", chinese: "清洁剂", id: "naam-yaa-tham-khwaam-sa-aat" },
  { thai: "ถุงขยะสำรอง", roman: "thung kha-ya sam-raawng", chinese: "备用垃圾袋", id: "thung-kha-ya-sam-raawng" },
  { thai: "จานที่ล้างแล้ว", roman: "jaan thii laang laaeo", chinese: "洗好的盘子", id: "jaan-thii-laang-laaeo" },
  { thai: "แก้วน้ำสะอาด", roman: "gaaeo naam sa-aat", chinese: "干净水杯", id: "gaaeo-naam-sa-aat" },
  { thai: "ผ้าซักแล้ว", roman: "phaa sak laaeo", chinese: "洗好的衣物", id: "phaa-sak-laaeo" },
  { thai: "ของที่ไม่ใช้แล้ว", roman: "khaawng thii mai chai laaeo", chinese: "不用的东西", id: "khaawng-thii-mai-chai-laaeo" },
];

const cleaningRows = cleaningPlaces.map((place): Definition => ({
  thai: `ทำความสะอาด${place.thai}`,
  id: `tham-khwaam-sa-aat-${place.id}`,
  roman: `tham khwaam sa-aat ${place.roman}`,
  chinese: `打扫/清洁${place.chinese}`,
  partOfSpeech: "短语",
  theme: "清洁",
  exampleThai: `เช้าวันเสาร์ เราช่วยกันทำความสะอาด${place.thai}`,
  exampleRoman: `chaao wan sao, rao chuai gan tham khwaam sa-aat ${place.roman}`,
  exampleChinese: `星期六早上，我们一起打扫/清洁${place.chinese}。`,
  tag: "清洁",
}));

const brokenRows = brokenThings.map((thing): Definition => ({
  thai: `${thing.thai}เสียอีกแล้ว`,
  id: `${thing.id}-siia-iik-laaeo`,
  roman: `${thing.roman} siia iik laaeo`,
  chinese: `${thing.chinese}又坏了`,
  partOfSpeech: "短语",
  theme: "坏了",
  exampleThai: `${thing.thai}เสียอีกแล้ว ต้องให้ช่างมาดู`,
  exampleRoman: `${thing.roman} siia iik laaeo, dtawng hai chaang maa duu`,
  exampleChinese: `${thing.chinese}又坏了，得请师傅来看。`,
  tag: "坏了",
}));

const storageRows = storageThings.map((thing): Definition => ({
  thai: `เก็บ${thing.thai}ใส่กล่อง`,
  id: `gep-${thing.id}-sai-glaawng`,
  roman: `gep ${thing.roman} sai glaawng`,
  chinese: `把${thing.chinese}收进盒子`,
  partOfSpeech: "短语",
  theme: "整理收纳",
  exampleThai: `หลังใช้เสร็จ ฉันเก็บ${thing.thai}ใส่กล่องให้เรียบร้อย`,
  exampleRoman: `lang chai set, chan gep ${thing.roman} sai glaawng hai riiap-raawy`,
  exampleChinese: `用完后，我把${thing.chinese}整齐地收进盒子。`,
  tag: "收纳",
}));

const rows: readonly Definition[] = [
  ...cleaningRows,
  ...brokenRows,
  ...requestRows,
  ...storageRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "居家清洁维修", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段可先记“做清洁、东西坏了、叫师傅、收进盒子”等固定结构，再替换房间或物品。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于清洁、整理、房屋问题、漏水停电、请人修理和基础维修沟通。"],
    tags,
    sourceRefs: HOME_MAINTENANCE_CLEANING_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_HOME_MAINTENANCE_CLEANING_01 = rows.map(toCandidate);
