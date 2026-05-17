type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "肉蛋奶" | "蔬菜水果" | "主食调料" | "素食限制" | "过敏忌口" | "少油少盐" | "健康饮食" | "食物保存";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2FoodIngredientsDietCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-food-ingredients-diet-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2FoodIngredientsDietCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于点餐、买菜、说明过敏忌口、健康饮食或保存食物。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，饮食场景中要分清食材、口味、限制和保存方式。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["说明忌口时可用 ไม่กิน、แพ้、ขอไม่ใส่、ขอน้อยหน่อย，语气清楚又礼貌。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
neua-muu|เนื้อหมู|neua muu|猪肉|名词|肉蛋奶|ฉันซื้อเนื้อหมูครึ่งกิโลไปทำข้าวผัด|chan seu neua muu khreung gi-loo bpai tham khaao phat|我买半公斤猪肉去做炒饭。|肉类
neua-gai|เนื้อไก่|neua gai|鸡肉|名词|肉蛋奶|เนื้อไก่ส่วนอกเหมาะกับคนที่อยากกินคลีน|neua gai suan ok maw gap khon thii yaak gin khliin|鸡胸肉适合想吃清淡健康餐的人。|肉类
neua-wua|เนื้อวัว|neua wua|牛肉|名词|肉蛋奶|ร้านนี้มีเนื้อวัวนุ่มและน้ำซุปไม่เค็มมาก|raan nii mii neua wua num lae naam sup mai khem maak|这家店有嫩牛肉，汤也不太咸。|肉类
neua-bplaa|เนื้อปลา|neua bplaa|鱼肉|名词|肉蛋奶|เด็กกินเนื้อปลาได้ง่ายเพราะไม่มีก้างเยอะ|dek gin neua bplaa dai ngaai phraw mai mii gaang yoe|孩子容易吃鱼肉，因为鱼刺不多。|肉类
gung-sot|กุ้งสด|gung sot|鲜虾|名词|肉蛋奶|แม่ซื้อกุ้งสดมาทำต้มยำสำหรับมื้อเย็น|mae seu gung sot maa tham dtom-yam sam-rap meu yen|妈妈买鲜虾来做晚餐的冬阴功汤。|海鲜
bplaa-meuk|ปลาหมึก|bplaa-meuk|鱿鱼|名词|肉蛋奶|ปลาหมึกย่างจานนี้เผ็ดน้อยและไม่เหนียว|bplaa-meuk yaang jaan nii phet naawy lae mai niao|这盘烤鱿鱼少辣，而且不韧。|海鲜
khai-gai|ไข่ไก่|khai gai|鸡蛋|名词|肉蛋奶|ในตู้เย็นมีไข่ไก่หกฟองสำหรับอาหารเช้า|nai dtuu-yen mii khai gai hok faawng sam-rap aa-haan chaao|冰箱里有六个鸡蛋，用来做早餐。|蛋类
khai-dao|ไข่ดาว|khai daao|煎蛋|名词|肉蛋奶|ฉันชอบกินข้าวกับไข่ดาวและผักต้ม|chan chaawp gin khaao gap khai daao lae phak dtom|我喜欢吃米饭配煎蛋和煮蔬菜。|蛋类
khai-dtom|ไข่ต้ม|khai dtom|水煮蛋|名词|肉蛋奶|ไข่ต้มหนึ่งฟองทำให้อิ่มนานตอนเช้า|khai dtom neung faawng tham hai im naan dtaawn chaao|一个水煮蛋能让早上饱得久。|蛋类
nom-sot|นมสด|nom sot|鲜奶|名词|肉蛋奶|เด็กดื่มนมสดหนึ่งแก้วก่อนออกไปโรงเรียน|dek duem nom sot neung gaeo gaawn aawk bpai roong-riian|孩子上学前喝一杯鲜奶。|奶类
nom-phrom-man|นมพร่องมัน|nom phraawng man|低脂奶|名词|肉蛋奶|พ่อเปลี่ยนมาดื่มนมพร่องมันเพราะอยากลดไขมัน|phaaw bplian maa duem nom phraawng man phraw yaak lot khai-man|爸爸改喝低脂奶，因为想减少脂肪。|奶类
yo-geut|โยเกิร์ต|yoo-geut|酸奶|名词|肉蛋奶|โยเกิร์ตรสธรรมชาติกินกับผลไม้ได้ดี|yoo-geut rot tham-ma-chaat gin gap phon-la-maai dai dii|原味酸奶和水果一起吃很好。|奶类
cheet|ชีส|chiit|奶酪|名词|肉蛋奶|พิซซ่าจานนี้ใส่ชีสเยอะจึงมันมาก|phit-saa jaan nii sai chiit yoe jeung man maak|这盘披萨放了很多奶酪，所以很油腻。|奶类
thua-lueang|ถั่วเหลือง|thua leuang|黄豆|名词|肉蛋奶|น้ำเต้าหู้ทำจากถั่วเหลืองและดื่มร้อนได้|naam dtao-huu tham jaak thua leuang lae duem raawn dai|豆浆由黄豆做成，可以热饮。|豆类
dtao-huu|เต้าหู้|dtao-huu|豆腐|名词|肉蛋奶|คนกินเจมักใช้เต้าหู้แทนเนื้อสัตว์|khon gin jee mak chai dtao-huu thaen neua-sat|吃斋的人常用豆腐代替肉类。|豆类
phak-boong|ผักบุ้ง|phak bung|空心菜|名词|蔬菜水果|ผักบุ้งไฟแดงควรขอน้ำมันน้อยถ้าไม่อยากมัน|phak bung fai-daeng khuan khaaw nam-man naawy thaa mai yaak man|如果不想油腻，炒空心菜应该要求少油。|蔬菜
phak-gaad-khaao|ผักกาดขาว|phak-gaat khaao|白菜|名词|蔬菜水果|ผักกาดขาวใส่ในแกงจืดแล้วหวานอ่อน ๆ|phak-gaat khaao sai nai gaaeng jeut laeo waan aawn aawn|白菜放进清汤里会有淡淡甜味。|蔬菜
kha-naa|คะน้า|kha-naa|芥蓝|名词|蔬菜水果|ข้าวหมูกรอบจานนี้มีคะน้าเยอะกว่าข้าว|khaao muu-graawp jaan nii mii kha-naa yoe gwaa khaao|这盘脆皮猪肉饭里的芥蓝比饭还多。|蔬菜
taeng-gwaa|แตงกวา|dtaeng-gwaa|黄瓜|名词|蔬菜水果|แตงกวาเย็น ๆ ช่วยลดความเผ็ดของน้ำพริก|dtaeng-gwaa yen yen chuai lot khwaam phet khaawng naam-phrik|冰凉黄瓜能减轻辣酱的辣味。|蔬菜
ma-kheua-thet|มะเขือเทศ|ma-kheua-theet|番茄|名词|蔬菜水果|สลัดนี้ใส่มะเขือเทศสีแดงและไข่ต้ม|sa-lat nii sai ma-kheua-theet sii daeng lae khai dtom|这份沙拉放了红番茄和水煮蛋。|蔬菜
hua-hawm|หัวหอม|hua haawm|洋葱|名词|蔬菜水果|ฉันขอไม่ใส่หัวหอมเพราะไม่ชอบกลิ่น|chan khaaw mai sai hua haawm phraw mai chaawp glin|我请求不放洋葱，因为不喜欢味道。|蔬菜
gra-thiiam|กระเทียม|gra-thiiam|大蒜|名词|主食调料|ร้านใส่กระเทียมเจียวบนข้าวมันไก่เล็กน้อย|raan sai gra-thiiam jiao bon khaao-man-gai lek naawy|店里在鸡油饭上放了一点炸蒜。|调料
phrik-sot|พริกสด|phrik sot|鲜辣椒|名词|主食调料|ถ้ากินเผ็ดไม่ได้ ขอไม่ใส่พริกสดได้|thaa gin phet mai dai khaaw mai sai phrik sot dai|如果不能吃辣，可以要求不放鲜辣椒。|调料
phak-sot|ผักสด|phak sot|新鲜蔬菜|名词|蔬菜水果|จานนี้มีผักสดหลายชนิดและน้ำสลัดน้อย|jaan nii mii phak sot laai cha-nit lae naam sa-lat naawy|这盘有多种新鲜蔬菜，沙拉酱也少。|蔬菜
phak-dtom|ผักต้ม|phak dtom|煮蔬菜|名词|健康饮食|มื้อเย็นวันนี้ฉันกินปลาและผักต้ม|meu yen wan-nii chan gin bplaa lae phak dtom|今天晚餐我吃鱼和煮蔬菜。|健康
phak-yang|ผักย่าง|phak yaang|烤蔬菜|名词|健康饮食|ผักย่างใช้น้ำมันน้อยกว่าผักทอด|phak yaang chai nam-man naawy gwaa phak thaawt|烤蔬菜比炸蔬菜用油少。|健康
phon-la-maai-sot|ผลไม้สด|phon-la-maai sot|新鲜水果|名词|蔬菜水果|หลังอาหารกลางวันฉันกินผลไม้สดแทนขนมหวาน|lang aa-haan glaang-wan chan gin phon-la-maai sot thaen kha-nom waan|午饭后我吃新鲜水果代替甜点。|水果
gluai|กล้วย|gluai|香蕉|名词|蔬菜水果|กล้วยหนึ่งลูกเหมาะกับอาหารว่างตอนบ่าย|gluai neung luuk maw gap aa-haan waang dtaawn baai|一根香蕉适合做下午点心。|水果
som|ส้ม|som|橙子|名词|蔬菜水果|ส้มถุงนี้หวานอมเปรี้ยวและเก็บในตู้เย็นได้|som thung nii waan om bpriao lae gep nai dtuu-yen dai|这袋橙子酸甜，可以放冰箱保存。|水果
ma-la-gaaw|มะละกอ|ma-la-gaaw|木瓜|名词|蔬菜水果|มะละกอสุกกินง่ายและไม่หวานเกินไป|ma-la-gaaw suk gin ngaai lae mai waan goen bpai|熟木瓜容易吃，而且不太甜。|水果
saap-bpa-rot|สับปะรด|sap-bpa-rot|菠萝|名词|蔬菜水果|สับปะรดชิ้นนี้ฉ่ำแต่เปรี้ยวนิดหน่อย|sap-bpa-rot chin nii cham dtae bpriao nit naawy|这块菠萝多汁，但有点酸。|水果
ma-muang-suk|มะม่วงสุก|ma-muang suk|熟芒果|名词|蔬菜水果|มะม่วงสุกกับข้าวเหนียวเป็นของหวานที่ดังมาก|ma-muang suk gap khaao-niao bpen khaawng-waan thii dang maak|熟芒果配糯米是很有名的甜点。|水果
taeng-moo|แตงโม|dtaeng-moo|西瓜|名词|蔬菜水果|อากาศร้อนแบบนี้ แตงโมเย็น ๆ อร่อยมาก|aa-gaat raawn baep nii dtaeng-moo yen yen a-raawy maak|这种热天，冰西瓜很好吃。|水果
khaao-suai|ข้าวสวย|khaao suai|白米饭|名词|主食调料|ฉันขอข้าวสวยน้อยลงเพราะไม่หิวมาก|chan khaaw khaao suai naawy long phraw mai hiu maak|我要求白米饭少一点，因为不是很饿。|主食
khaao-niao|ข้าวเหนียว|khaao niao|糯米饭|名词|主食调料|ส้มตำกับข้าวเหนียวเป็นอาหารกลางวันที่ง่าย|som-dtam gap khaao-niao bpen aa-haan glaang-wan thii ngaai|青木瓜沙拉配糯米饭是简单的午餐。|主食
sen-lek|เส้นเล็ก|sen lek|细米粉|名词|主食调料|ก๋วยเตี๋ยวชามนี้ใช้เส้นเล็กและน้ำซุปใส|guai-dtiao chaam nii chai sen lek lae naam sup sai|这碗粉用细米粉和清汤。|主食
sen-yai|เส้นใหญ่|sen yai|宽河粉|名词|主食调料|ผัดซีอิ๊วเส้นใหญ่นุ่มแต่ค่อนข้างมัน|phat sii-iu sen yai num dtae khaawn-khaang man|炒酱油宽河粉很软，但比较油。|主食
khanom-pang|ขนมปัง|kha-nom bpang|面包|名词|主食调料|มื้อเช้าฉันกินขนมปังโฮลวีตกับไข่ต้ม|meu chaao chan gin kha-nom bpang hoon-wiit gap khai dtom|早餐我吃全麦面包配水煮蛋。|主食
khao-oat|ข้าวโอ๊ต|khaao oot|燕麦|名词|健康饮食|ข้าวโอ๊ตใส่นมและกล้วยเป็นมื้อเช้าที่อิ่มนาน|khaao oot sai nom lae gluai bpen meu chaao thii im naan|燕麦加牛奶和香蕉是饱腹久的早餐。|健康
nam-bplaa|น้ำปลา|naam bplaa|鱼露|名词|主食调料|ถ้าไม่อยากเค็มมาก ขอใส่น้ำปลาน้อยได้|thaa mai yaak khem maak khaaw sai naam bplaa naawy dai|如果不想太咸，可以要求少放鱼露。|调料
sii-iu|ซีอิ๊ว|sii-iu|酱油|名词|主食调料|ผัดผักใส่ซีอิ๊วนิดเดียวก็พอ|phat phak sai sii-iu nit diao gaaw phaaw|炒菜放一点酱油就够了。|调料
nam-dtaan|น้ำตาล|naam-dtaan|糖|名词|主食调料|แม่ขอลดน้ำตาลในกาแฟครึ่งหนึ่ง|mae khaaw lot naam-dtaan nai gaa-fae khreung neung|妈妈要求咖啡里的糖减半。|调料
gleua|เกลือ|gleua|盐|名词|主食调料|ซุปนี้ใส่เกลือมากไปจึงเค็มจัด|sup nii sai gleua maak bpai jeung khem jat|这个汤盐放太多，所以很咸。|调料
nam-man|น้ำมัน|nam-man|油|名词|少油少盐|อาหารทอดใช้น้ำมันเยอะ ฉันจึงกินน้อยลง|aa-haan thaawt chai nam-man yoe chan jeung gin naawy long|油炸食物用油多，所以我少吃了。|少油
mai-gin-muu|ไม่กินหมู|mai gin muu|不吃猪肉|短语|素食限制|เพื่อนฉันไม่กินหมู เราจึงสั่งไก่แทน|pheuan chan mai gin muu rao jeung sang gai thaen|我朋友不吃猪肉，所以我们改点鸡肉。|忌口
mai-gin-neua|ไม่กินเนื้อ|mai gin neua|不吃牛肉|短语|素食限制|ถ้าคุณไม่กินเนื้อ เมนูปลาก็น่าสนใจ|thaa khun mai gin neua mee-nuu bplaa gaaw naa-son-jai|如果你不吃牛肉，鱼类菜单也不错。|忌口
mai-gin-sat|ไม่กินสัตว์|mai gin sat|不吃动物肉|短语|素食限制|เขาไม่กินสัตว์แต่กินไข่และนมได้|khao mai gin sat dtae gin khai lae nom dai|他不吃动物肉，但可以吃蛋和奶。|忌口
gin-mang-sa-wi-rat|กินมังสวิรัติ|gin mang-sa-wi-rat|吃素食|动词|素食限制|พี่สาวกินมังสวิรัติและชอบอาหารเต้าหู้|phii-saao gin mang-sa-wi-rat lae chaawp aa-haan dtao-huu|姐姐吃素食，喜欢豆腐菜。|素食
aa-haan-mang-sa-wi-rat|อาหารมังสวิรัติ|aa-haan mang-sa-wi-rat|素食餐|名词|素食限制|ร้านนี้มีอาหารมังสวิรัติให้เลือกหลายอย่าง|raan nii mii aa-haan mang-sa-wi-rat hai leuak laai yaang|这家店有很多素食餐可选。|素食
gin-jee|กินเจ|gin jee|吃斋|动词|素食限制|ช่วงเทศกาลกินเจ หลายร้านไม่ใส่กระเทียม|chuang thet-sa-gaan gin jee laai raan mai sai gra-thiiam|吃斋节期间，很多店不放大蒜。|素食
aa-haan-jee|อาหารเจ|aa-haan jee|斋食|名词|素食限制|อาหารเจจานนี้ไม่มีเนื้อ นม และไข่|aa-haan jee jaan nii mai mii neua nom lae khai|这盘斋食没有肉、奶和蛋。|素食
mai-sai-khai|ไม่ใส่ไข่|mai sai khai|不放蛋|短语|素食限制|ข้าวผัดจานนี้ขอไม่ใส่ไข่ได้ไหมคะ|khaao phat jaan nii khaaw mai sai khai dai mai kha|这盘炒饭可以不放蛋吗？|忌口
mai-sai-nom|ไม่ใส่นม|mai sai nom|不放奶|短语|素食限制|กาแฟแก้วนี้ขอไม่ใส่นม แต่ใส่น้ำตาลนิดเดียว|gaa-fae gaeo nii khaaw mai sai nom dtae sai naam-dtaan nit diao|这杯咖啡请不放奶，只放一点糖。|忌口
phaae-aa-haan|แพ้อาหาร|phaae aa-haan|食物过敏|动词|过敏忌口|ถ้าแพ้อาหาร ต้องบอกพนักงานก่อนสั่ง|thaa phaae aa-haan dtawng baawk pha-nak-ngaan gaawn sang|如果食物过敏，点餐前必须告诉工作人员。|过敏
phaae-thua|แพ้ถั่ว|phaae thua|坚果过敏|动词|过敏忌口|ฉันแพ้ถั่ว จึงต้องถามว่าซอสมีถั่วไหม|chan phaae thua jeung dtawng thaam waa saawt mii thua mai|我坚果过敏，所以要问酱里有没有坚果。|过敏
phaae-gung|แพ้กุ้ง|phaae gung|虾过敏|动词|过敏忌口|น้องแพ้กุ้งและกินต้มยำทะเลไม่ได้|naawng phaae gung lae gin dtom-yam tha-lee mai dai|弟弟虾过敏，不能吃海鲜冬阴功。|过敏
phaae-nom|แพ้นม|phaae nom|奶过敏|动词|过敏忌口|เด็กคนนี้แพ้นมวัว จึงดื่มนมถั่วเหลืองแทน|dek khon nii phaae nom wua jeung duem nom thua leuang thaen|这个孩子牛奶过敏，所以改喝豆奶。|过敏
phaae-khai|แพ้ไข่|phaae khai|鸡蛋过敏|动词|过敏忌口|ถ้าแพ้ไข่ ต้องอ่านส่วนผสมของขนมก่อนกิน|thaa phaae khai dtawng aan suan-pha-som khaawng kha-nom gaawn gin|如果鸡蛋过敏，吃点心前要看配料。|过敏
suan-pha-som|ส่วนผสม|suan-pha-som|配料|名词|过敏忌口|กรุณาบอกส่วนผสมหลักของน้ำซุปให้หน่อย|ga-ru-naa baawk suan-pha-som lak khaawng naam sup hai naawy|请告诉我汤的主要配料。|配料
mii-thua-mai|มีถั่วไหม|mii thua mai|有坚果吗|短语|过敏忌口|ขนมนี้มีถั่วไหม เพราะลูกฉันแพ้ถั่ว|kha-nom nii mii thua mai phraw luuk chan phaae thua|这个点心有坚果吗？因为我孩子坚果过敏。|询问
mii-nom-mai|มีนมไหม|mii nom mai|有奶吗|短语|过敏忌口|ซอสนี้มีนมไหม ฉันกินนมไม่ได้|saawt nii mii nom mai chan gin nom mai dai|这个酱有奶吗？我不能吃奶制品。|询问
khaaw-mai-sai|ขอไม่ใส่|khaaw mai sai|请求不放|短语|过敏忌口|ขอไม่ใส่ผักชีได้ไหม ฉันไม่ชอบกลิ่น|khaaw mai sai phak-chii dai mai chan mai chaawp glin|可以不放香菜吗？我不喜欢味道。|点餐
khaaw-yak-sawt|ขอแยกซอส|khaaw yaek saawt|请求酱汁分开放|短语|过敏忌口|สลัดจานนี้ขอแยกซอสเพื่อใส่น้อยหน่อย|sa-lat jaan nii khaaw yaek saawt phuea sai naawy naawy|这份沙拉请酱汁分开放，好少放一点。|点餐
khaaw-nam-man-naawy|ขอน้ำมันน้อย|khaaw nam-man naawy|请少油|短语|少油少盐|ผัดผักจานนี้ขอน้ำมันน้อยและไม่ใส่หมู|phat phak jaan nii khaaw nam-man naawy lae mai sai muu|这盘炒菜请少油，并且不放猪肉。|少油
khaaw-khem-naawy|ขอเค็มน้อย|khaaw khem naawy|请少咸|短语|少油少盐|แม่ขอเค็มน้อยเพราะหมอบอกให้ลดเกลือ|mae khaaw khem naawy phraw maaw baawk hai lot gleua|妈妈要求少咸，因为医生让她少盐。|少盐
khaaw-waan-naawy|ขอหวานน้อย|khaaw waan naawy|请少甜|短语|少油少盐|ชาเย็นแก้วนี้ขอหวานน้อยและไม่ใส่วิปครีม|chaa yen gaeo nii khaaw waan naawy lae mai sai wip-khriim|这杯泰式奶茶请少甜，不加奶油。|少糖
mai-wan|ไม่หวาน|mai waan|不甜|形容词|少油少盐|น้ำผลไม้แก้วนี้ไม่หวานและดื่มง่าย|naam phon-la-maai gaeo nii mai waan lae duem ngaai|这杯果汁不甜，容易喝。|口味
mai-khem|ไม่เค็ม|mai khem|不咸|形容词|少油少盐|ซุปนี้ไม่เค็ม เหมาะกับเด็กและผู้สูงอายุ|sup nii mai khem maw gap dek lae phuu-suung-aa-yu|这个汤不咸，适合孩子和老人。|口味
mai-man|ไม่มัน|mai man|不油腻|形容词|少油少盐|ก๋วยเตี๋ยวน้ำใสไม่มันและกินแล้วสบายท้อง|guai-dtiao naam sai mai man lae gin laeo sa-baai thaawng|清汤粉不油腻，吃了胃舒服。|口味
man-goen-bpai|มันเกินไป|man goen bpai|太油腻|短语|少油少盐|อาหารทอดจานนี้มันเกินไป ฉันกินไม่หมด|aa-haan thaawt jaan nii man goen bpai chan gin mai mot|这盘炸食太油腻了，我吃不完。|口味
khem-goen-bpai|เค็มเกินไป|khem goen bpai|太咸|短语|少油少盐|แกงถ้วยนี้เค็มเกินไป ต้องเติมน้ำเพิ่ม|gaaeng thuai nii khem goen bpai dtawng dterm naam phoem|这碗咖喱太咸了，需要加水。|口味
waan-goen-bpai|หวานเกินไป|waan goen bpai|太甜|短语|少油少盐|ขนมนี้หวานเกินไปสำหรับฉัน|kha-nom nii waan goen bpai sam-rap chan|这个甜点对我来说太甜了。|口味
gin-hai-khrop|กินให้ครบ|gin hai khrop|吃得均衡|动词|健康饮食|เด็กควรกินให้ครบทั้งข้าว เนื้อ และผัก|dek khuan gin hai khrop thang khaao neua lae phak|孩子应该米饭、肉和蔬菜都吃得均衡。|健康
aa-haan-suk-kha-phaap|อาหารสุขภาพ|aa-haan suk-kha-phaap|健康食品|名词|健康饮食|ร้านนี้ขายอาหารสุขภาพที่ใช้น้ำมันน้อย|raan nii khaai aa-haan suk-kha-phaap thii chai nam-man naawy|这家店卖少油的健康食品。|健康
aa-haan-khliin|อาหารคลีน|aa-haan khliin|清淡健康餐|名词|健康饮食|อาหารคลีนกล่องนี้มีไก่ย่างและผักต้ม|aa-haan khliin glaawng nii mii gai yaang lae phak dtom|这盒清淡健康餐有烤鸡和煮蔬菜。|健康
lot-naam-dtaan|ลดน้ำตาล|lot naam-dtaan|减少糖|动词|健康饮食|ฉันพยายามลดน้ำตาลในเครื่องดื่มทุกวัน|chan pha-yaa-yaam lot naam-dtaan nai khreuuang-deum thuk wan|我每天努力减少饮料里的糖。|健康
lot-gleua|ลดเกลือ|lot gleua|减少盐|动词|健康饮食|คุณยายลดเกลือหลังจากความดันสูง|khun yaai lot gleua lang-jaak khwaam-dan suung|奶奶血压高后减少盐。|健康
lot-khaawng-thaawt|ลดของทอด|lot khaawng thaawt|减少油炸食物|动词|健康饮食|หมอแนะนำให้ลดของทอดและเดินมากขึ้น|maaw nae-nam hai lot khaawng thaawt lae doen maak kheun|医生建议减少油炸食物，并多走路。|健康
gin-phak-maak-kheun|กินผักมากขึ้น|gin phak maak kheun|多吃蔬菜|动词|健康饮食|ปีนี้ฉันตั้งใจจะกินผักมากขึ้นทุกมื้อ|bpii nii chan dtang-jai ja gin phak maak kheun thuk meu|今年我打算每餐多吃蔬菜。|健康
duem-naam-bplao|ดื่มน้ำเปล่า|duem naam bplaao|喝白水|动词|健康饮食|ถ้าไม่อยากดื่มหวาน ให้ดื่มน้ำเปล่าแทน|thaa mai yaak duem waan hai duem naam bplaao thaen|如果不想喝甜的，就改喝白水。|健康
aa-haan-waang|อาหารว่าง|aa-haan waang|点心；加餐|名词|健康饮食|อาหารว่างตอนบ่ายควรเป็นผลไม้หรือโยเกิร์ต|aa-haan waang dtaawn baai khuan bpen phon-la-maai reu yoo-geut|下午加餐应该是水果或酸奶。|健康
gin-phaw-dee|กินพอดี|gin phaaw-dii|吃得适量|动词|健康饮食|ถึงอาหารอร่อยมาก ก็ควรกินพอดีไม่มากเกินไป|theung aa-haan a-raawy maak gaaw khuan gin phaaw-dii mai maak goen bpai|即使食物很好吃，也应该适量，不要太多。|健康
aa-haan-luea|อาหารเหลือ|aa-haan leua|剩菜|名词|食物保存|อาหารเหลือควรเก็บในกล่องและใส่ตู้เย็น|aa-haan leua khuan gep nai glaawng lae sai dtuu-yen|剩菜应该放进盒子并放冰箱。|保存
gep-nai-dtuu-yen|เก็บในตู้เย็น|gep nai dtuu-yen|放冰箱保存|动词|食物保存|นมสดต้องเก็บในตู้เย็นหลังเปิดขวด|nom sot dtawng gep nai dtuu-yen lang bpoet khuat|鲜奶开瓶后必须放冰箱保存。|保存
sai-glaawng|ใส่กล่อง|sai glaawng|装进盒子|动词|食物保存|ข้าวที่เหลือควรใส่กล่องก่อนแช่เย็น|khaao thii leua khuan sai glaawng gaawn chae yen|剩饭冷藏前应该装进盒子。|保存
glaawng-aa-haan|กล่องอาหาร|glaawng aa-haan|食物盒|名词|食物保存|กล่องอาหารใบนี้เข้าไมโครเวฟได้|glaawng aa-haan bai nii khao mai-khroo-weep dai|这个食物盒可以进微波炉。|保存
chaeng-khaeng|แช่แข็ง|chae khaeng|冷冻|动词|食物保存|เนื้อไก่ที่ยังไม่ใช้ควรแช่แข็งไว้ก่อน|neua gai thii yang mai chai khuan chae khaeng wai gaawn|还不用的鸡肉应该先冷冻保存。|保存
chae-yen|แช่เย็น|chae yen|冷藏|动词|食物保存|ผลไม้หั่นแล้วควรแช่เย็นและกินภายในวันนี้|phon-la-maai han laeo khuan chae yen lae gin phaai-nai wan-nii|切好的水果应该冷藏，并在今天内吃完。|保存
un-aa-haan|อุ่นอาหาร|un aa-haan|加热食物|动词|食物保存|ก่อนกินอาหารเหลือ ต้องอุ่นอาหารให้ร้อนพอ|gaawn gin aa-haan leua dtawng un aa-haan hai raawn phaaw|吃剩菜前，要把食物加热到足够热。|加热
mai-khuan-gin|ไม่ควรกิน|mai khuan gin|不应该吃|短语|食物保存|ถ้าอาหารมีกลิ่นแปลก ไม่ควรกินต่อ|thaa aa-haan mii glin bplaek mai khuan gin dtaaw|如果食物有怪味，不应该继续吃。|安全
aa-haan-sia|อาหารเสีย|aa-haan siia|食物坏了|短语|食物保存|อาหารเสียเพราะวางไว้ข้างนอกทั้งคืน|aa-haan siia phraw waang wai khaang-naawk thang kheun|食物坏了，因为在外面放了一整晚。|安全
glin-bplaek|กลิ่นแปลก|glin bplaek|怪味|名词|食物保存|ซุปมีกลิ่นแปลก ฉันเลยไม่กล้ากิน|sup mii glin bplaek chan loei mai glaa gin|汤有怪味，所以我不敢吃。|安全
wan-mot-aa-yu|วันหมดอายุ|wan mot aa-yu|保质期日期|名词|食物保存|ก่อนซื้อนม ต้องดูวันหมดอายุบนขวด|gaawn seu nom dtawng duu wan mot aa-yu bon khuat|买牛奶前要看瓶子上的保质期日期。|安全
mot-aa-yu-laeo|หมดอายุแล้ว|mot aa-yu laeo|已经过期|短语|食物保存|โยเกิร์ตหมดอายุแล้ว อย่าให้เด็กกิน|yoo-geut mot aa-yu laeo yaa hai dek gin|酸奶已经过期了，不要给孩子吃。|安全
khaawng-sot|ของสด|khaawng sot|生鲜|名词|食物保存|ของสดควรซื้อวันเดียวกับวันที่จะทำอาหาร|khaawng sot khuan seu wan diao gap wan thii ja tham aa-haan|生鲜应该在做饭当天购买。|生鲜
khaawng-haeng|ของแห้ง|khaawng haaeng|干货|名词|食物保存|ของแห้งเก็บได้นานถ้าวางในที่แห้ง|khaawng haaeng gep dai naan thaa waang nai thii haaeng|干货如果放在干燥处可以保存很久。|干货
khaawng-mak|ของหมัก|khaawng mak|腌制发酵食品|名词|食物保存|ของหมักบางอย่างเค็มมาก ควรกินน้อย|khaawng mak baang yaang khem maak khuan gin naawy|有些腌制发酵食品很咸，应该少吃。|保存
phak-dawng|ผักดอง|phak daawng|腌菜|名词|食物保存|ผักดองกินกับข้าวต้มอร่อยแต่ค่อนข้างเค็ม|phak daawng gin gap khaao dtom a-raawy dtae khaawn-khaang khem|腌菜配粥好吃，但比较咸。|保存
sa-aat|สะอาด|sa-aat|干净|形容词|健康饮食|อาหารริมทางควรดูว่าร้านสะอาดก่อนสั่ง|aa-haan rim-thaang khuan duu waa raan sa-aat gaawn sang|点路边摊前应该看看店是否干净。|卫生
mai-sa-aat|ไม่สะอาด|mai sa-aat|不干净|形容词|健康饮食|ถ้าภาชนะไม่สะอาด อาจทำให้ปวดท้องได้|thaa phaa-cha-na mai sa-aat aat tham hai bpuat thaawng dai|如果餐具不干净，可能会导致肚子痛。|卫生
laang-phak|ล้างผัก|laang phak|洗蔬菜|动词|健康饮食|ก่อนทำสลัด ต้องล้างผักด้วยน้ำสะอาด|gaawn tham sa-lat dtawng laang phak duai naam sa-aat|做沙拉前，必须用干净水洗蔬菜。|卫生
laang-phon-la-maai|ล้างผลไม้|laang phon-la-maai|洗水果|动词|健康饮食|แม่ล้างผลไม้แล้วใส่จานให้เด็กกิน|mae laang phon-la-maai laeo sai jaan hai dek gin|妈妈洗好水果后放盘子给孩子吃。|卫生
han-phak|หั่นผัก|han phak|切蔬菜|动词|蔬菜水果|ฉันหั่นผักเป็นชิ้นเล็กเพื่อใส่ในซุป|chan han phak bpen chin lek phuea sai nai sup|我把蔬菜切成小块放进汤里。|备菜
han-phon-la-maai|หั่นผลไม้|han phon-la-maai|切水果|动词|蔬菜水果|ผลไม้หั่นแล้วควรกินเร็ว ไม่ควรวางนาน|phon-la-maai han laeo khuan gin reo mai khuan waang naan|切好的水果应该快点吃，不应该放太久。|备菜
bplaa-mii-gaang|ปลามีก้าง|bplaa mii gaang|鱼有刺|短语|肉蛋奶|ปลาจานนี้มีก้างเยอะ ต้องกินอย่างระวัง|bplaa jaan nii mii gaang yoe dtawng gin yaang ra-wang|这盘鱼刺很多，要小心吃。|鱼类
mai-mii-gaang|ไม่มีก้าง|mai mii gaang|没有鱼刺|短语|肉蛋奶|เด็กชอบกินปลาที่ไม่มีก้างและรสไม่เผ็ด|dek chaawp gin bplaa thii mai mii gaang lae rot mai phet|孩子喜欢吃没有鱼刺且不辣的鱼。|鱼类
neua-yaang|เนื้อย่าง|neua yaang|烤肉|名词|肉蛋奶|เนื้อย่างจานนี้นุ่มแต่ซอสค่อนข้างหวาน|neua yaang jaan nii num dtae saawt khaawn-khaang waan|这盘烤肉很嫩，但酱比较甜。|肉类
gai-yaang|ไก่ย่าง|gai yaang|烤鸡|名词|肉蛋奶|ไก่ย่างกับส้มตำเป็นมื้อกลางวันที่อิ่มมาก|gai yaang gap som-dtam bpen meu glaang-wan thii im maak|烤鸡配青木瓜沙拉是很饱的午餐。|肉类
gai-dtom|ไก่ต้ม|gai dtom|水煮鸡|名词|健康饮食|ไก่ต้มไม่มันเท่าไก่ทอดและย่อยง่าย|gai dtom mai man thao gai thaawt lae yaawy ngaai|水煮鸡不像炸鸡那么油，也容易消化。|健康
aa-haan-thaawt|อาหารทอด|aa-haan thaawt|油炸食物|名词|少油少盐|อาหารทอดอร่อยแต่ไม่ควรกินทุกวัน|aa-haan thaawt a-raawy dtae mai khuan gin thuk wan|油炸食物好吃，但不应该每天吃。|少油
aa-haan-dtom|อาหารต้ม|aa-haan dtom|水煮食物|名词|健康饮食|ช่วงป่วยฉันชอบกินอาหารต้มที่รสอ่อน|chuang bpuai chan chaawp gin aa-haan dtom thii rot aawn|生病期间我喜欢吃味道清淡的水煮食物。|健康
rot-aawn|รสอ่อน|rot aawn|味道淡|形容词|少油少盐|คนแก่บางคนชอบอาหารรสอ่อนและไม่เผ็ด|khon gae baang khon chaawp aa-haan rot aawn lae mai phet|有些老人喜欢味道淡且不辣的食物。|口味
rot-jat|รสจัด|rot jat|味道重|形容词|少油少盐|อาหารใต้หลายอย่างรสจัดและเผ็ดมาก|aa-haan dtai laai yaang rot jat lae phet maak|很多南部菜味道重，而且很辣。|口味
`;

export const VOCABULARY_EXPANSION_A2_FOOD_INGREDIENTS_DIET_01: VocabularyExpansionA2FoodIngredientsDietCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
