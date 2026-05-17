type PartOfSpeech = "副词" | "助词" | "连词" | "短语";
type Theme = "程度数量" | "时间状态" | "频率习惯" | "范围限制" | "顺序重复" | "一起方式" | "礼貌句尾" | "回应语气";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA1BasicAdverbsParticlesCandidate = {
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

const SOURCE_REFS = ["complete-thai-a1", "thai-frequency", "wiktionary-thai-frequency", "pythainlp-corpus"];

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

function buildCandidate(row: Row, index: number): VocabularyExpansionA1BasicAdverbsParticlesCandidate {
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
        usageNotesZh: [`${row.thai} 是基础口语小词，常放在动词、形容词或整句旁边改变语气。`],
      },
    ],
    synonyms: [{ thai: row.relatedThai, roman: row.relatedRoman, chinese: row.relatedChinese }],
    antonyms: [],
    comparisons: [
      {
        kind: "易混",
        target: { thai: row.relatedThai, roman: row.relatedRoman, chinese: row.relatedChinese },
        distinctionZh: `${row.thai} 表示“${row.chinese}”；${row.relatedThai} 表示“${row.relatedChinese}”，要看它修饰的是动作、状态还是整句话。`,
      },
    ],
    collocations: [{ thai: row.collocationThai, roman: row.collocationRoman, chinese: row.collocationChinese }],
    usageNotesZh: ["这些词多用于 A1/A2 日常句，可先按固定搭配记，再放入自己的生活句中。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
maak|มาก|maak|很；非常|副词|程度数量|วันนี้อากาศร้อนมาก ฉันอยากดื่มน้ำเย็น|wan-nii aa-gaat raawn maak chan yaak duem naam yen|今天天气很热，我想喝冷水。|ดีมาก|dii maak|很好|นิดหน่อย|nit naawy|一点点|程度
maak-maak|มาก ๆ|maak maak|非常；很很|副词|程度数量|ขอบคุณมาก ๆ ที่ช่วยฉันถือของกลับบ้าน|khaawp-khun maak maak thii chuai chan thue khaawng glap baan|非常感谢你帮我把东西拿回家。|ชอบมาก ๆ|chaawp maak maak|非常喜欢|มาก|maak|很|程度
nit-naawy|นิดหน่อย|nit naawy|一点点；有点儿|副词|程度数量|ฉันพูดภาษาไทยได้นิดหน่อย แต่ยังต้องฝึกอีก|chan phuut phaa-saa thai dai nit naawy dtaae yang dtawng fuek iik|我会说一点点泰语，但还要再练。|รอนิดหน่อย|raaw nit naawy|等一下儿|มาก|maak|很|程度
nooi|หน่อย|naawy|一点；请稍微|助词|礼貌句尾|ช่วยเปิดหน้าต่างให้หน่อย ห้องนี้ร้อนมาก|chuai bpoet naa-dtaang hai naawy haawng nii raawn maak|请帮忙开一下窗，这个房间很热。|ช่วยหน่อย|chuai naawy|帮一下|นิดหน่อย|nit naawy|一点点|礼貌
khaang|ค่อนข้าง|khaawn khaang|相当；比较|副词|程度数量|ร้านนี้ค่อนข้างไกลจากบ้าน แต่ของถูกดี|raan nii khaawn khaang glai jaak baan dtaae khaawng thuuk dii|这家店离家比较远，但东西很便宜。|ค่อนข้างยาก|khaawn khaang yaak|比较难|มาก|maak|很|程度
mai-khoi|ไม่ค่อย|mai khaawy|不太；不怎么|副词|程度数量|ช่วงนี้ฉันไม่ค่อยว่าง เพราะมีงานบ้านเยอะ|chuang nii chan mai khaawy waang phraw mii ngaan baan yoe|这段时间我不太有空，因为家务很多。|ไม่ค่อยเข้าใจ|mai khaawy khao-jai|不太明白|ค่อนข้าง|khaawn khaang|比较|程度
loei|เลย|loei|一点也；就；完全|助词|程度数量|วันนี้ฉันไม่หิวเลย เพราะเพิ่งกินข้าวมา|wan-nii chan mai hiu loei phraw phoeng gin khaao maa|今天我一点也不饿，因为刚吃过饭。|ไม่รู้เลย|mai ruu loei|完全不知道|นิดหน่อย|nit naawy|一点点|程度
goen-bpai|เกินไป|goen bpai|太；过于|副词|程度数量|กาแฟแก้วนี้หวานเกินไป ฉันดื่มไม่หมด|gaa-faae gaaeo nii waan goen bpai chan duem mai mot|这杯咖啡太甜了，我喝不完。|แพงเกินไป|phaaeng goen bpai|太贵|พอดี|phaaw-dii|正好|程度
phaaw-dii|พอดี|phaaw-dii|正好；刚好|副词|程度数量|เสื้อตัวนี้ไม่เล็กไม่ใหญ่ พอดีกับฉัน|suea dtua nii mai lek mai yai phaaw-dii gap chan|这件衣服不小不大，正好适合我。|มาพอดี|maa phaaw-dii|来得正好|เกินไป|goen bpai|太过|程度
geuuap|เกือบ|geuuap|差点；几乎|副词|程度数量|ฉันเกือบลืมกุญแจบ้าน แต่แม่เตือนก่อนออกไป|chan geuuap luem gun-jaae baan dtaae maae dteuan gaawn aawk bpai|我差点忘了家门钥匙，但妈妈出门前提醒了。|เกือบสาย|geuuap saai|差点迟到|แล้ว|laaeo|已经|程度
yang|ยัง|yang|还；仍然|副词|时间状态|ตอนนี้ฝนยังตกอยู่ เราออกไปไม่ได้|dtaawn-nii fon yang dtok yuu rao aawk bpai mai dai|现在雨还在下，我们不能出去。|ยังอยู่|yang yuu|还在|แล้ว|laaeo|已经|状态
laaeo|แล้ว|laaeo|已经；了|助词|时间状态|ฉันทำการบ้านเสร็จแล้ว จึงไปอาบน้ำ|chan tham gaan-baan set laaeo jeung bpai aap naam|我已经做完作业了，所以去洗澡。|กินแล้ว|gin laaeo|吃过了|ยังไม่|yang mai|还没|状态
yang-mai|ยังไม่|yang mai|还没|短语|时间状态|ฉันยังไม่พร้อมออกจากบ้าน เพราะยังหากระเป๋าไม่เจอ|chan yang mai phraawm aawk jaak baan phraw yang haa gra-bpao mai joe|我还没准备好出门，因为还没找到包。|ยังไม่เสร็จ|yang mai set|还没完成|แล้ว|laaeo|已经|状态
phoeng|เพิ่ง|phoeng|刚刚；才|副词|时间状态|เขาเพิ่งกลับมาถึงบ้าน จึงยังไม่อยากคุยงาน|khao phoeng glap maa thueng baan jeung yang mai yaak khui ngaan|他刚回到家，所以还不想谈工作。|เพิ่งตื่น|phoeng dteun|刚醒|นานแล้ว|naan laaeo|很久了|时间
naan-laaeo|นานแล้ว|naan laaeo|很久了；已经很久|短语|时间状态|ฉันไม่ได้เจอเพื่อนคนนี้นานแล้ว|chan mai dai joe phuean khon nii naan laaeo|我已经很久没见这个朋友了。|มาอยู่นานแล้ว|maa yuu naan laaeo|来了很久了|เพิ่ง|phoeng|刚刚|时间
gam-lang|กำลัง|gam-lang|正在|副词|时间状态|แม่กำลังทำอาหารเย็นในครัวเล็ก|maae gam-lang tham aa-haan yen nai khruua lek|妈妈正在小厨房做晚饭。|กำลังอ่านหนังสือ|gam-lang aan nang-sue|正在看书|จะ|ja|将要|状态
ja|จะ|ja|将要；会|助词|时间状态|พรุ่งนี้ฉันจะไปโรงเรียนแต่เช้า|phrung-nii chan ja bpai roong-riian dtaae chaao|明天我会一大早去学校。|จะกลับบ้าน|ja glap baan|要回家|กำลัง|gam-lang|正在|状态
khuean-nii|คืนนี้|khuen-nii|今晚|短语|时间状态|คืนนี้ฉันจะนอนเร็ว เพราะพรุ่งนี้ต้องตื่นเช้า|khuen-nii chan ja naawn reo phraw phrung-nii dtawng dteun chaao|今晚我要早睡，因为明天要早起。|คืนนี้ก่อนนอน|khuen-nii gaawn naawn|今晚睡前|วันนี้|wan-nii|今天|时间
dtaawn-nii|ตอนนี้|dtaawn-nii|现在|短语|时间状态|ตอนนี้ฉันว่างนิดหน่อย คุณคุยได้ไหม|dtaawn-nii chan waang nit naawy khun khui dai mai|现在我有点空，你能聊吗？|ตอนนี้ยังไม่|dtaawn-nii yang mai|现在还没|เมื่อกี้|muea-gii|刚才|时间
muea-gii|เมื่อกี้|muea-gii|刚才|短语|时间状态|เมื่อกี้แม่โทรมา แต่ฉันไม่ได้ยินเสียงโทรศัพท์|muea-gii maae thoo maa dtaae chan mai dai-yin siiang thoo-ra-sap|刚才妈妈打电话来，但我没听到手机声。|เมื่อกี้นี้|muea-gii nii|就在刚才|ตอนนี้|dtaawn-nii|现在|时间
diao-nii|เดี๋ยวนี้|diao-nii|现在；如今|副词|时间状态|เดี๋ยวนี้ฉันใช้รถไฟฟ้าไปทำงานบ่อยขึ้น|diao-nii chan chai rot-fai-faa bpai tham ngaan baawy kheun|现在我更常坐轻轨去上班。|เดี๋ยวนี้บ่อยขึ้น|diao-nii baawy kheun|现在更常|เมื่อก่อน|muea-gaawn|以前|时间
muea-gaawn|เมื่อก่อน|muea-gaawn|以前；从前|副词|时间状态|เมื่อก่อนฉันไม่ค่อยกินกาแฟ แต่ตอนนี้ดื่มทุกเช้า|muea-gaawn chan mai khaawy gin gaa-faae dtaae dtaawn-nii duem thuk chaao|以前我不太喝咖啡，但现在每天早上喝。|เมื่อก่อนอยู่ใกล้|muea-gaawn yuu glai|以前住得近|เดี๋ยวนี้|diao-nii|现在|时间
baawy|บ่อย|baawy|常；频繁|副词|频率习惯|ช่วงนี้ฝนตกบ่อย ฉันจึงพกร่มทุกวัน|chuang nii fon dtok baawy chan jeung phok rom thuk wan|最近常下雨，所以我每天带伞。|ไปบ่อย|bpai baawy|常去|นาน ๆ ครั้ง|naan naan khrang|偶尔|频率
baawy-baawy|บ่อย ๆ|baawy baawy|常常；经常|副词|频率习惯|ถ้าอยากพูดไทยเก่ง ต้องฝึกพูดบ่อย ๆ|thaa yaak phuut thai geng dtawng fuek phuut baawy baawy|如果想泰语说得好，就要常常练说。|ทำบ่อย ๆ|tham baawy baawy|经常做|บางครั้ง|baang khrang|有时|频率
sa-moe|เสมอ|sa-moe|总是；一向|副词|频率习惯|พ่อกลับบ้านตรงเวลาเสมอหลังเลิกงาน|phaaw glap baan dtrong wee-laa sa-moe lang loek ngaan|爸爸下班后总是准时回家。|ช่วยเสมอ|chuai sa-moe|总是帮忙|บางครั้ง|baang khrang|有时|频率
thuk-wan|ทุกวัน|thuk wan|每天|副词|频率习惯|ฉันล้างจานทุกวันหลังอาหารเย็น|chan laang jaan thuk wan lang aa-haan yen|我每天晚饭后洗碗。|เรียนทุกวัน|riian thuk wan|每天学习|บางวัน|baang wan|有些天|频率
thuk-khrang|ทุกครั้ง|thuk khrang|每次|副词|频率习惯|ก่อนออกจากบ้าน ฉันตรวจกุญแจทุกครั้ง|gaawn aawk jaak baan chan dtruat gun-jaae thuk khrang|出门前，我每次都检查钥匙。|ทำทุกครั้ง|tham thuk khrang|每次都做|บางครั้ง|baang khrang|有时|频率
baang-khrang|บางครั้ง|baang khrang|有时候|副词|频率习惯|บางครั้งฉันเดินไปตลาด ถ้าอากาศไม่ร้อน|baang khrang chan doen bpai dta-laat thaa aa-gaat mai raawn|有时候如果天气不热，我走去市场。|บางครั้งก็|baang khrang gaw|有时候也|เสมอ|sa-moe|总是|频率
baang-thii|บางที|baang thii|有时；也许|副词|频率习惯|บางทีรถเมล์มาช้า เราจึงต้องออกจากบ้านเร็วขึ้น|baang thii rot-mee maa chaa rao jeung dtawng aawk jaak baan reo kheun|有时公交来得慢，所以我们要更早出门。|บางทีอาจจะ|baang thii aat ja|有时可能|แน่นอน|naae-naawn|当然|频率
naan-naan-khrang|นาน ๆ ครั้ง|naan naan khrang|偶尔；很久一次|副词|频率习惯|ฉันกินของหวานนาน ๆ ครั้ง ไม่ได้กินทุกวัน|chan gin khaawng waan naan naan khrang mai dai gin thuk wan|我偶尔吃甜食，不是每天吃。|ไปเที่ยวนาน ๆ ครั้ง|bpai thiao naan naan khrang|偶尔去玩|บ่อย ๆ|baawy baawy|常常|频率
mai-khoei|ไม่เคย|mai khoei|从来没有|副词|频率习惯|ฉันไม่เคยไปเชียงใหม่ แต่ปีนี้อยากไป|chan mai khoei bpai chiang-mai dtaae bpii nii yaak bpai|我从没去过清迈，但今年想去。|ไม่เคยกิน|mai khoei gin|从没吃过|เคย|khoei|曾经|经历
khoei|เคย|khoei|曾经；有过|副词|频率习惯|คุณเคยเรียนภาษาไทยมาก่อนไหม|khun khoei riian phaa-saa thai maa gaawn mai|你以前学过泰语吗？|เคยไป|khoei bpai|曾经去过|ไม่เคย|mai khoei|从来没有|经历
khae|แค่|khae|只；仅仅|副词|范围限制|วันนี้ฉันมีเงินแค่หนึ่งร้อยบาท|wan-nii chan mii ngoen khae neung raawy baat|今天我只有一百泰铢。|แค่นี้|khae nii|只有这个|ทั้งหมด|thang-mot|全部|限制
phiang|เพียง|phiiang|仅；只|副词|范围限制|ห้องนี้มีเก้าอี้เพียงสามตัว จึงไม่พอสำหรับทุกคน|haawng nii mii gao-ii phiiang saam dtua jeung mai phaaw sam-rap thuk khon|这个房间只有三把椅子，所以不够所有人坐。|เพียงเล็กน้อย|phiiang lek naawy|仅一点点|หลาย|laai|多个|限制
thao-nan|เท่านั้น|thao-nan|而已；仅此|助词|范围限制|ฉันอยากซื้อขนมปังสองชิ้นเท่านั้น|chan yaak sue kha-nom-bpang saawng chin thao-nan|我只想买两片面包而已。|วันนี้เท่านั้น|wan-nii thao-nan|仅限今天|ด้วย|duai|也；一起|限制
chaphaw|เฉพาะ|cha-phaw|只限；专门|副词|范围限制|โต๊ะนี้สำหรับครูเฉพาะตอนประชุม|dto nii sam-rap khruu cha-phaw dtaawn bpra-chum|这张桌子只限老师开会时使用。|เฉพาะวันนี้|cha-phaw wan-nii|只限今天|ทั่วไป|thua-bpai|一般|限制
thang-mot|ทั้งหมด|thang-mot|全部；所有|副词|范围限制|ฉันล้างจานทั้งหมดแล้ว เหลือแค่เช็ดโต๊ะ|chan laang jaan thang-mot laaeo luea khae chet dto|我已经把所有盘子都洗了，只剩擦桌子。|กินหมดทั้งหมด|gin mot thang-mot|全部吃完|แค่|khae|只|范围
duai|ด้วย|duai|也；一起；用|助词|一起方式|ฉันไปตลาดด้วย คุณอยากซื้ออะไรไหม|chan bpai dta-laat duai khun yaak sue a-rai mai|我也去市场，你想买什么吗？|ไปด้วย|bpai duai|一起去；也去|คนเดียว|khon diao|一个人|一起
gaw|ก็|gaw|也；就；语气承接|助词|回应语气|ถ้าคุณไป ฉันก็ไปด้วย|thaa khun bpai chan gaw bpai duai|如果你去，我也去。|ฉันก็เหมือนกัน|chan gaw muean gan|我也一样|แต่|dtaae|但是|语气
gaw-dai|ก็ได้|gaw dai|也可以；可以吧|短语|回应语气|ถ้าร้านนี้ปิด เราไปร้านข้าง ๆ ก็ได้|thaa raan nii bpit rao bpai raan khaang khaang gaw dai|如果这家店关门，我们去旁边那家也可以。|แบบนี้ก็ได้|baep nii gaw dai|这样也可以|ไม่ได้|mai dai|不可以|回应
gaw-yang|ก็ยัง|gaw yang|却还；也仍然|短语|时间状态|ฝนตกหนัก แต่เขาก็ยังไปทำงานตรงเวลา|fon dtok nak dtaae khao gaw yang bpai tham ngaan dtrong wee-laa|雨下得很大，但他还是准时去上班。|ก็ยังดี|gaw yang dii|还算好|ไม่แล้ว|mai laaeo|不再|状态
iik|อีก|iik|再；又；另外|副词|顺序重复|ฉันอยากอ่านบทนี้อีกครั้งก่อนนอน|chan yaak aan bot nii iik khrang gaawn naawn|我想睡前再读这一课一次。|อีกหนึ่งแก้ว|iik neung gaaeo|再一杯|พอแล้ว|phaaw laaeo|够了|重复
iik-khrang|อีกครั้ง|iik khrang|再一次|短语|顺序重复|ช่วยพูดอีกครั้งได้ไหม ฉันฟังไม่ทัน|chuai phuut iik khrang dai mai chan fang mai than|可以请你再说一次吗？我没听上。|ลองอีกครั้ง|laawng iik khrang|再试一次|ครั้งเดียว|khrang diao|一次|重复
iik-noi|อีกหน่อย|iik naawy|再一点；再一会儿|短语|顺序重复|รออีกหน่อย รถเมล์น่าจะมาใกล้แล้ว|raaw iik naawy rot-mee naa ja maa glai laaeo|再等一会儿，公交应该快来了。|กินอีกหน่อย|gin iik naawy|再吃一点|พอแล้ว|phaaw laaeo|够了|重复
gon|ก่อน|gaawn|先；以前|副词|顺序重复|ก่อนกินข้าว เราควรล้างมือให้สะอาด|gaawn gin khaao rao khuuan laang mue hai sa-aat|吃饭前，我们应该把手洗干净。|ทำก่อน|tham gaawn|先做|ทีหลัง|thii-lang|以后；之后|顺序
thii-lang|ทีหลัง|thii-lang|以后；之后|副词|顺序重复|วันนี้ฉันยุ่งมาก เราค่อยคุยเรื่องนี้ทีหลัง|wan-nii chan yung maak rao khaawy khui rueang nii thii-lang|今天我很忙，我们以后再聊这件事。|โทรทีหลัง|thoo thii-lang|之后打电话|ก่อน|gaawn|先|顺序
khaawy|ค่อย|khaawy|再；慢慢地|副词|顺序重复|กินข้าวก่อน แล้วค่อยทำการบ้าน|gin khaao gaawn laaeo khaawy tham gaan-baan|先吃饭，然后再做作业。|ค่อยไป|khaawy bpai|再去；慢慢去|ทันที|than-thii|马上|顺序
than-thii|ทันที|than-thii|马上；立刻|副词|顺序重复|เมื่อถึงบ้าน ฉันล้างมือทันที|muea thueng baan chan laang mue than-thii|一到家，我马上洗手。|ออกไปทันที|aawk bpai than-thii|马上出去|ค่อย|khaawy|再；慢慢|顺序
laaeo-gaw|แล้วก็|laaeo gaw|然后；还有|连词|顺序重复|ฉันอาบน้ำ แล้วก็กินข้าวเช้า|chan aap naam laaeo gaw gin khaao chaao|我洗澡，然后吃早饭。|ซื้อข้าวแล้วก็น้ำ|sue khaao laaeo gaw naam|买饭还有水|แล้ว|laaeo|已经|连接
roem-jaak|เริ่มจาก|roem jaak|从……开始|短语|顺序重复|วันนี้เราเริ่มจากคำง่าย ๆ แล้วค่อยอ่านประโยค|wan-nii rao roem jaak kham ngaai ngaai laaeo khaawy aan bpra-yook|今天我们从简单词开始，然后再读句子。|เริ่มจากข้อหนึ่ง|roem jaak khaaw neung|从第一题开始|จบที่|jop thii|结束在|顺序
jop-thii|จบที่|jop thii|结束在；以……结束|短语|顺序重复|การบ้านวันนี้จบที่หน้าแปด ไม่ต้องทำหน้าต่อไป|gaan-baan wan-nii jop thii naa bpaaet mai dtawng tham naa dtaaw bpai|今天作业做到第八页结束，不用做下一页。|จบที่ข้อนี้|jop thii khaaw nii|到这一题结束|เริ่มจาก|roem jaak|从……开始|顺序
phraawm-gan|พร้อมกัน|phraawm gan|同时；一起|副词|一起方式|เด็ก ๆ อ่านประโยคนี้พร้อมกันสามครั้ง|dek dek aan bpra-yook nii phraawm gan saam khrang|孩子们一起把这个句子读三遍。|กินพร้อมกัน|gin phraawm gan|一起吃|ทีละคน|thii la khon|一个一个人|一起
duai-gan|ด้วยกัน|duai gan|一起；共同|副词|一起方式|หลังอาหารเย็น เราล้างจานด้วยกันในครัว|lang aa-haan yen rao laang jaan duai gan nai khruua|晚饭后，我们一起在厨房洗碗。|ไปด้วยกัน|bpai duai gan|一起去|คนเดียว|khon diao|一个人|一起
khon-diao|คนเดียว|khon diao|一个人；独自|副词|一起方式|วันนี้ฉันกินข้าวเที่ยงคนเดียว เพราะเพื่อนไม่ว่าง|wan-nii chan gin khaao thiiang khon diao phraw phuean mai waang|今天我一个人吃午饭，因为朋友没空。|อยู่คนเดียว|yuu khon diao|一个人住；独处|ด้วยกัน|duai gan|一起|方式
eeng|เอง|eeng|自己；亲自|助词|一起方式|เด็กคนนี้ใส่รองเท้าเองได้แล้ว|dek khon nii sai raawng-thaao eeng dai laaeo|这个孩子已经能自己穿鞋了。|ทำเอง|tham eeng|自己做|ให้ช่วย|hai chuai|让人帮忙|方式
thii-la|ทีละ|thii la|每次一个；逐一|副词|一起方式|ครูให้เราตอบคำถามทีละคน|khruu hai rao dtaawp kham-thaam thii la khon|老师让我们一个一个人回答问题。|อ่านทีละประโยค|aan thii la bpra-yook|一句一句读|พร้อมกัน|phraawm gan|一起|方式
ruam-gan|ร่วมกัน|ruam gan|共同；一起|副词|一起方式|ทุกคนร่วมกันทำความสะอาดห้องเรียนก่อนกลับบ้าน|thuk khon ruam gan tham khwaam sa-aat haawng riian gaawn glap baan|大家回家前一起打扫教室。|ใช้ร่วมกัน|chai ruam gan|共同使用|ส่วนตัว|suan-dtua|个人的|方式
muean-gan|เหมือนกัน|muean gan|一样；也一样|副词|回应语气|ฉันชอบกาแฟเย็น เพื่อนฉันก็ชอบเหมือนกัน|chan chaawp gaa-faae yen phuean chan gaw chaawp muean gan|我喜欢冰咖啡，我朋友也一样喜欢。|คิดเหมือนกัน|khit muean gan|想法一样|ต่างกัน|dtaang gan|不同|比较
dtaang-gan|ต่างกัน|dtaang gan|不同；不一样|副词|回应语气|สองคำนี้ออกเสียงต่างกันนิดหน่อย|saawng kham nii aawk-siiang dtaang gan nit naawy|这两个词发音有一点不同。|สีต่างกัน|sii dtaang gan|颜色不同|เหมือนกัน|muean gan|一样|比较
kha|ค่ะ|kha|女说话人礼貌句尾|助词|礼貌句尾|ขอบคุณค่ะ ฉันเข้าใจแล้ว|khaawp-khun kha chan khao-jai laaeo|谢谢，我明白了。|สวัสดีค่ะ|sa-wat-dii kha|你好；再见|ครับ|khrap|男说话人礼貌句尾|礼貌
khrap|ครับ|khrap|男说话人礼貌句尾|助词|礼貌句尾|ได้ครับ ผมจะส่งการบ้านพรุ่งนี้|dai khrap phom ja song gaan-baan phrung-nii|好的，我明天会交作业。|ขอบคุณครับ|khaawp-khun khrap|谢谢|ค่ะ|kha|女说话人礼貌句尾|礼貌
kha-question|คะ|kha|女说话人疑问礼貌句尾|助词|礼貌句尾|ห้องน้ำอยู่ที่ไหนคะ ฉันหาไม่เจอ|haawng-naam yuu thii nai kha chan haa mai joe|请问洗手间在哪里？我找不到。|ได้ไหมคะ|dai mai kha|可以吗|ค่ะ|kha|陈述礼貌句尾|礼貌
na|นะ|na|柔和提醒；让语气亲近|助词|礼貌句尾|อย่าลืมเอาร่มไปนะ วันนี้ฝนอาจตก|yaa luem ao rom bpai na wan-nii fon aat dtok|别忘了带伞哦，今天可能下雨。|เจอกันนะ|joe gan na|再见哦|สิ|si|催促语气|语气
na-khrap|นะครับ|na khrap|男说话人柔和礼貌句尾|助词|礼貌句尾|รอสักครู่นะครับ ผมกำลังหาข้อมูลให้|raaw sak khruu na khrap phom gam-lang haa khaaw-muun hai|请稍等一下，我正在帮您找资料。|ขอบคุณนะครับ|khaawp-khun na khrap|谢谢哦|นะคะ|na kha|女说话人柔和礼貌句尾|礼貌
na-kha|นะคะ|na kha|女说话人柔和礼貌句尾|助词|礼貌句尾|กรุณาเขียนชื่อก่อนส่งงานนะคะ|ga-ru-naa khiian chue gaawn song ngaan na kha|请交作业前写名字哦。|รอก่อนนะคะ|raaw gaawn na kha|请先等等哦|นะครับ|na khrap|男说话人柔和礼貌句尾|礼貌
ja-soft|จ้ะ|ja|亲近柔和句尾|助词|礼貌句尾|ได้จ้ะ เดี๋ยวแม่เอาน้ำให้|dai ja diao maae ao naam hai|好呀，妈妈一会儿拿水给你。|ขอบใจจ้ะ|khaawp-jai ja|谢谢呀|ค่ะ|kha|正式礼貌句尾|礼貌
ja-question|จ๊ะ|ja|亲近疑问句尾|助词|礼貌句尾|ลูกอยากกินอะไรจ๊ะ วันนี้แม่จะทำอาหาร|luuk yaak gin a-rai ja wan-nii maae ja tham aa-haan|孩子，你想吃什么呀？今天妈妈做饭。|ไปไหมจ๊ะ|bpai mai ja|去吗呀|จ้ะ|ja|亲近陈述句尾|礼貌
si|สิ|si|吧；呀；带提醒或催促|助词|回应语气|ถ้าหิวก็กินก่อนสิ ไม่ต้องรอฉัน|thaa hiu gaw gin gaawn si mai dtawng raaw chan|如果饿了就先吃吧，不用等我。|ลองดูสิ|laawng duu si|试试看吧|นะ|na|柔和提醒|语气
thoe|เถอะ|thoe|吧；表示建议或劝说|助词|回应语气|ดึกแล้ว เรากลับบ้านกันเถอะ|duek laaeo rao glap baan gan thoe|已经晚了，我们回家吧。|ไปกันเถอะ|bpai gan thoe|一起去吧|สิ|si|催促语气|语气
la|ล่ะ|la|呢；转问或追问|助词|回应语气|ฉันกินแล้ว คุณล่ะ กินข้าวหรือยัง|chan gin laaeo khun la gin khaao rue yang|我吃过了，你呢？吃饭了吗？|แล้วคุณล่ะ|laaeo khun la|那你呢|ไหม|mai|吗|问答
mai-question|ไหม|mai|吗；是否|助词|回应语气|คุณอยากไปตลาดกับฉันไหม|khun yaak bpai dta-laat gap chan mai|你想和我去市场吗？|ได้ไหม|dai mai|可以吗|หรือ|rue|或者；吗|问答
rue|หรือ|rue|或者；还是；吗|助词|回应语气|วันนี้จะกินข้าวที่บ้านหรือไปกินข้างนอก|wan-nii ja gin khaao thii baan rue bpai gin khaang naawk|今天是在家吃饭，还是出去吃？|ใช่หรือ|chai rue|是吗|ไหม|mai|吗|问答
chai-mai|ใช่ไหม|chai mai|对吗；是不是|短语|回应语气|คุณเป็นนักเรียนใหม่ใช่ไหม|khun bpen nak-riian mai chai mai|你是新学生，对吗？|แบบนี้ใช่ไหม|baep nii chai mai|这样对吗|หรือเปล่า|rue bplaao|是不是|问答
rue-bplaao|หรือเปล่า|rue bplaao|是不是；有没有|短语|回应语气|วันนี้คุณว่างหรือเปล่า ฉันอยากถามการบ้าน|wan-nii khun waang rue bplaao chan yaak thaam gaan-baan|你今天有没有空？我想问作业。|มีหรือเปล่า|mii rue bplaao|有没有|ใช่ไหม|chai mai|对吗|问答
dai-mai|ได้ไหม|dai mai|可以吗|短语|礼貌句尾|ฉันขอนั่งตรงนี้ได้ไหม|chan khaaw nang dtrong nii dai mai|我可以坐这里吗？|ช่วยได้ไหม|chuai dai mai|能帮忙吗|ไม่ได้|mai dai|不可以|礼貌
khaaw|ขอ|khaaw|请求；请给|助词|礼貌句尾|ขอน้ำหนึ่งแก้วได้ไหมคะ|khaaw naam neung gaaeo dai mai kha|请给我一杯水可以吗？|ขอหน่อย|khaaw naawy|请给一点|ให้|hai|给|礼貌
chuai|ช่วย|chuai|请帮忙；帮|助词|礼貌句尾|ช่วยพูดช้า ๆ หน่อยได้ไหมครับ|chuai phuut chaa chaa naawy dai mai khrap|请说慢一点可以吗？|ช่วยเปิดประตู|chuai bpoet bpra-dtuu|请帮忙开门|ขอ|khaaw|请求|礼貌
ga-ru-naa|กรุณา|ga-ru-naa|请；麻烦您|助词|礼貌句尾|กรุณาปิดประตูก่อนออกจากห้อง|ga-ru-naa bpit bpra-dtuu gaawn aawk jaak haawng|请离开房间前关门。|กรุณารอสักครู่|ga-ru-naa raaw sak khruu|请稍等|ช่วย|chuai|请帮忙|礼貌
khaawp-khun-na|ขอบคุณนะ|khaawp-khun na|谢谢哦|短语|回应语气|ขอบคุณนะที่ช่วยฉันทำความสะอาดห้อง|khaawp-khun na thii chuai chan tham khwaam sa-aat haawng|谢谢你帮我打扫房间哦。|ขอบคุณนะคะ|khaawp-khun na kha|谢谢哦|ขอโทษนะ|khaaw-thoot na|对不起哦|回应
khaaw-thoot-na|ขอโทษนะ|khaaw-thoot na|对不起哦；不好意思|短语|回应语气|ขอโทษนะ ฉันมาสายเพราะรถติดมาก|khaaw-thoot na chan maa saai phraw rot dtit maak|不好意思，我因为堵车很严重迟到了。|ขอโทษนะครับ|khaaw-thoot na khrap|不好意思|ขอบคุณนะ|khaawp-khun na|谢谢哦|回应
mai-bpen-rai|ไม่เป็นไร|mai bpen rai|没关系；不用谢|短语|回应语气|ไม่เป็นไร ครั้งหน้าอย่าลืมอีกนะ|mai bpen rai khrang naa yaa luem iik na|没关系，下次别再忘了哦。|ตอบว่าไม่เป็นไร|dtaawp waa mai bpen rai|回答没关系|ขอโทษ|khaaw-thoot|对不起|回应
dai|ได้|dai|可以；能|助词|回应语气|วันนี้ฉันไปช่วยคุณได้หลังเลิกงาน|wan-nii chan bpai chuai khun dai lang loek ngaan|今天下班后我可以去帮你。|ทำได้|tham dai|能做|ไม่ได้|mai dai|不可以|能力
mai-dai|ไม่ได้|mai dai|不可以；不能|助词|回应语气|ตอนนี้ออกไปไม่ได้ เพราะฝนตกหนัก|dtaawn-nii aawk bpai mai dai phraw fon dtok nak|现在不能出去，因为雨下得很大。|กินไม่ได้|gin mai dai|不能吃|ได้|dai|可以|能力
aat-ja|อาจจะ|aat ja|可能会；也许|副词|回应语气|คืนนี้ฝนอาจจะตก อย่าลืมเอาร่มไป|khuen-nii fon aat ja dtok yaa luem ao rom bpai|今晚可能会下雨，别忘了带伞。|อาจจะสาย|aat ja saai|可能迟到|แน่นอน|naae-naawn|一定|可能
naa-ja|น่าจะ|naa ja|应该会；大概|副词|回应语气|รถเมล์น่าจะมาถึงในอีกสิบนาที|rot-mee naa ja maa thueng nai iik sip naa-thii|公交应该会在十分钟后到。|น่าจะพอ|naa ja phaaw|应该够|อาจจะ|aat ja|可能|可能
khong-ja|คงจะ|khong ja|大概会；恐怕会|副词|回应语气|วันนี้เขาคงจะเหนื่อย เพราะทำงานทั้งวัน|wan-nii khao khong ja neuuai phraw tham ngaan thang wan|他今天大概会累，因为工作了一整天。|คงจะไม่มา|khong ja mai maa|大概不会来|น่าจะ|naa ja|应该会|可能
naae-naawn|แน่นอน|naae-naawn|当然；一定|副词|回应语气|ถ้าคุณต้องการความช่วยเหลือ ฉันช่วยแน่นอน|thaa khun dtawng-gaan khwaam chuai-luea chan chuai naae-naawn|如果你需要帮助，我一定帮。|ได้แน่นอน|dai naae-naawn|当然可以|อาจจะ|aat ja|可能|回应
jing-jing|จริง ๆ|jing jing|真的；实际上|副词|程度数量|ร้านนี้ไม่ไกลจริง ๆ เดินไปแค่ห้านาที|raan nii mai glai jing jing doen bpai khae haa naa-thii|这家店真的不远，走路只要五分钟。|ชอบจริง ๆ|chaawp jing jing|真的喜欢|เล่น ๆ|len len|开玩笑地|程度
len-len|เล่น ๆ|len len|随便；开玩笑地|副词|回应语气|ฉันพูดเล่น ๆ นะ อย่าคิดมาก|chan phuut len len na yaa khit maak|我开玩笑说的哦，别想太多。|ถามเล่น ๆ|thaam len len|随便问问|จริง ๆ|jing jing|真的|语气
ao|เอา|ao|要；拿；选择|助词|回应语气|ฉันเอาแก้วเล็กก็ได้ ไม่ต้องเอาใบใหญ่|chan ao gaaeo lek gaw dai mai dtawng ao bai yai|我要小杯也可以，不用拿大杯。|เอาอันนี้|ao an nii|要这个|ไม่เอา|mai ao|不要|回应
mai-ao|ไม่เอา|mai ao|不要|短语|回应语气|ฉันไม่เอาถุงพลาสติก เพราะมีถุงผ้าแล้ว|chan mai ao thung phlaat-sa-dtik phraw mii thung phaa laaeo|我不要塑料袋，因为已经有布袋了。|ไม่เอาแล้ว|mai ao laaeo|不要了|เอา|ao|要|回应
dee-gwaa|ดีกว่า|dii gwaa|比较好；还是……吧|副词|回应语气|ฝนตกหนัก เรากลับบ้านดีกว่า|fon dtok nak rao glap baan dii gwaa|雨下得很大，我们还是回家比较好。|ไปพรุ่งนี้ดีกว่า|bpai phrung-nii dii gwaa|明天去比较好|ก็ได้|gaw dai|也可以|建议
yaang-diao|อย่างเดียว|yaang diao|只；仅一种|副词|范围限制|มื้อนี้ฉันกินข้าวกับไข่อย่างเดียว|mue nii chan gin khaao gap khai yaang diao|这一餐我只吃饭和鸡蛋。|ดูอย่างเดียว|duu yaang diao|只看|หลายอย่าง|laai yaang|很多种|限制
laai-yaang|หลายอย่าง|laai yaang|很多样；多种|副词|范围限制|วันนี้ฉันต้องทำหลายอย่างก่อนออกจากบ้าน|wan-nii chan dtawng tham laai yaang gaawn aawk jaak baan|今天出门前我要做很多事。|ซื้อหลายอย่าง|sue laai yaang|买很多样|อย่างเดียว|yaang diao|只一种|范围
thee-ra|ทีละนิด|thii la nit|一点一点地|副词|顺序重复|ถ้าเรียนทีละนิดทุกวัน จะจำคำได้ดีขึ้น|thaa riian thii la nit thuk wan ja jam kham dai dii kheun|如果每天一点一点学，会更记得住词。|ทำทีละนิด|tham thii la nit|一点点做|ทีเดียว|thii diao|一次性|顺序
thii-diao|ทีเดียว|thii diao|一次性；一回|副词|顺序重复|อย่ากินยาเยอะทีเดียว ต้องอ่านวิธีก่อน|yaa gin yaa yoe thii diao dtawng aan wi-thii gaawn|不要一次吃很多药，要先看用法。|จ่ายทีเดียว|jaai thii diao|一次性付款|ทีละนิด|thii la nit|一点一点|顺序
bpai-gaawn|ไปก่อน|bpai gaawn|先走；先去|短语|顺序重复|ฉันไปก่อนนะ แล้วเจอกันตอนเย็น|chan bpai gaawn na laaeo joe gan dtaawn yen|我先走哦，傍晚见。|กลับไปก่อน|glap bpai gaawn|先回去|รอก่อน|raaw gaawn|先等|告别
raaw-gaawn|รอก่อน|raaw gaawn|先等；等一下|短语|顺序重复|รอก่อนนะ ฉันยังใส่รองเท้าไม่เสร็จ|raaw gaawn na chan yang sai raawng-thaao mai set|等一下哦，我还没穿好鞋。|รอก่อนสักครู่|raaw gaawn sak khruu|先等一会儿|ไปก่อน|bpai gaawn|先走|顺序
sak-khruu|สักครู่|sak khruu|一会儿；片刻|副词|时间状态|กรุณารอสักครู่ หมอกำลังคุยกับคนไข้|ga-ru-naa raaw sak khruu maaw gam-lang khui gap khon-khai|请稍等，医生正在和病人说话。|พักสักครู่|phak sak khruu|休息一会儿|ทันที|than-thii|马上|时间
diao|เดี๋ยว|diao|一会儿；等下|副词|时间状态|เดี๋ยวฉันโทรกลับหลังประชุมเสร็จ|diao chan thoo glap lang bpra-chum set|我开完会后一会儿回电话。|เดี๋ยวมา|diao maa|一会儿来|ตอนนี้|dtaawn-nii|现在|时间
diao-gaawn|เดี๋ยวก่อน|diao gaawn|等一下；先别急|短语|时间状态|เดี๋ยวก่อน ฉันยังไม่ได้ปิดไฟในห้อง|diao gaawn chan yang mai dai bpit fai nai haawng|等一下，我还没关房间里的灯。|เดี๋ยวก่อนนะ|diao gaawn na|等一下哦|ไปเลย|bpai loei|直接去|时间
bpai-loei|ไปเลย|bpai loei|直接去；去吧|短语|顺序重复|ถ้าคุณพร้อมแล้ว เราไปเลยก็ได้|thaa khun phraawm laaeo rao bpai loei gaw dai|如果你准备好了，我们直接去也可以。|กินเลย|gin loei|直接吃吧|รอก่อน|raaw gaawn|先等|顺序
yang-yuu|ยังอยู่|yang yuu|还在|短语|时间状态|แม่ยังอยู่ที่ตลาดและจะกลับบ้านตอนเย็น|maae yang yuu thii dta-laat lae ja glap baan dtaawn yen|妈妈还在市场，傍晚会回家。|ยังอยู่บ้าน|yang yuu baan|还在家|ไปแล้ว|bpai laaeo|已经走了|状态
yang-mii|ยังมี|yang mii|还有|短语|时间状态|ในตู้เย็นยังมีนมกับผลไม้|nai dtuu-yen yang mii nom gap phon-la-maai|冰箱里还有牛奶和水果。|ยังมีเวลา|yang mii wee-laa|还有时间|หมดแล้ว|mot laaeo|没有了|状态
mot-laaeo|หมดแล้ว|mot laaeo|没有了；用完了|短语|时间状态|น้ำดื่มหมดแล้ว เราต้องไปซื้อเพิ่ม|naam duem mot laaeo rao dtawng bpai sue phoem|饮用水没有了，我们要去再买。|เงินหมดแล้ว|ngoen mot laaeo|钱用完了|ยังมี|yang mii|还有|状态
phoehm|เพิ่ม|phoem|再加；增加|副词|顺序重复|ถ้ายังหิว คุณสั่งข้าวเพิ่มได้|thaa yang hiu khun sang khaao phoem dai|如果还饿，你可以再加点饭。|เติมน้ำเพิ่ม|dterm naam phoem|再加水|ลดลง|lot long|减少|数量
lot-long|ลดลง|lot long|减少；降下来|副词|程度数量|หลังพักผ่อน อาการปวดหัวลดลงนิดหน่อย|lang phak-phaawn aa-gaan bpuat hua lot long nit naawy|休息后，头痛症状减轻了一点。|ราคาลดลง|raa-khaa lot long|价格下降|เพิ่ม|phoem|增加|数量
kheun|ขึ้น|kheun|更……起来；上升|副词|程度数量|หลังฝึกทุกวัน ฉันพูดไทยได้ดีขึ้น|lang fuek thuk wan chan phuut thai dai dii kheun|每天练习后，我泰语说得更好了。|เร็วขึ้น|reo kheun|更快|ลง|long|下降；变少|变化
long|ลง|long|下来；变少|副词|程度数量|ตอนเย็นอากาศเย็นลง เราไปเดินเล่นได้|dtaawn yen aa-gaat yen long rao bpai doen len dai|傍晚天气凉下来了，我们可以去散步。|เบาลง|bao long|变轻；减轻|ขึ้น|kheun|更起来|变化
kwaa-doem|กว่าเดิม|gwaa doem|比以前更……|副词|程度数量|ห้องนี้สะอาดกว่าเดิมหลังเราจัดของเข้าที่|haawng nii sa-aat gwaa doem lang rao jat khaawng khao thii|我们把东西收好后，这个房间比以前更干净。|ดีขึ้นกว่าเดิม|dii kheun gwaa doem|比以前更好|เหมือนเดิม|muean doem|和以前一样|比较
muean-doem|เหมือนเดิม|muean doem|和以前一样；照旧|副词|回应语气|วันนี้ฉันสั่งกาแฟเย็นเหมือนเดิม|wan-nii chan sang gaa-faae yen muean doem|今天我照旧点冰咖啡。|ทำเหมือนเดิม|tham muean doem|照旧做|กว่าเดิม|gwaa doem|比以前更|比较
thii-sut|ที่สุด|thii sut|最|副词|程度数量|ในบ้านนี้ น้องชายตื่นเช้าที่สุด|nai baan nii naawng-chaai dteun chaao thii sut|这个家里弟弟起得最早。|ดีที่สุด|dii thii sut|最好|มาก|maak|很|程度
yang-ngai|ยังไง|yang ngai|怎么；怎样|副词|回应语气|คำนี้อ่านยังไง ช่วยบอกอีกครั้งได้ไหม|kham nii aan yang ngai chuai baawk iik khrang dai mai|这个词怎么读？可以再告诉我一次吗？|ทำยังไง|tham yang ngai|怎么做|แบบนี้|baep nii|这样|问答
baep-nii|แบบนี้|baep nii|这样|副词|回应语气|ถ้าเขียนแบบนี้ ครูจะเข้าใจไหม|thaa khiian baep nii khruu ja khao-jai mai|如果这样写，老师会明白吗？|ทำแบบนี้|tham baep nii|这样做|แบบนั้น|baep nan|那样|方式
baep-nan|แบบนั้น|baep nan|那样|副词|回应语气|อย่าวางแก้วแบบนั้น น้ำอาจหกได้|yaa waang gaaeo baep nan naam aat hok dai|不要那样放杯子，水可能会洒。|พูดแบบนั้น|phuut baep nan|那样说|แบบนี้|baep nii|这样|方式
ao-la|เอาละ|ao la|好了；那么|短语|回应语气|เอาละ เราเริ่มเรียนบทใหม่กันเถอะ|ao la rao roem riian bot mai gan thoe|好了，我们开始学新课吧。|เอาละพอแล้ว|ao la phaaw laaeo|好了够了|เดี๋ยวก่อน|diao gaawn|等一下|语气
ueam|อืม|uem|嗯；表示听到或思考|助词|回应语气|อืม ฉันคิดว่าร้านนี้ไม่แพงมาก|uem chan khit waa raan nii mai phaaeng maak|嗯，我觉得这家店不太贵。|อืม เข้าใจแล้ว|uem khao-jai laaeo|嗯，明白了|อ๋อ|aaw|哦，原来如此|回应
aaw|อ๋อ|aaw|哦；原来如此|助词|回应语气|อ๋อ ห้องเรียนอยู่ชั้นสองใช่ไหม|aaw haawng riian yuu chan saawng chai mai|哦，教室在二楼，对吗？|อ๋อ ใช่แล้ว|aaw chai laaeo|哦，对了|อืม|uem|嗯|回应
eo|เอ่อ|oe|呃；犹豫停顿|助词|回应语气|เอ่อ ฉันยังไม่แน่ใจ ขอคิดอีกหน่อย|oe chan yang mai naae-jai khaaw khit iik naawy|呃，我还不确定，请让我再想一下。|เอ่อ คือว่า|oe khue waa|呃，就是说|อืม|uem|嗯|回应
khue-waa|คือว่า|khue waa|就是说；用于开口解释|短语|回应语气|คือว่า วันนี้ฉันอาจจะมาช้าหน่อย|khue waa wan-nii chan aat ja maa chaa naawy|就是说，今天我可能会来晚一点。|คือว่าอย่างนี้|khue waa yaang nii|是这样的|เอ่อ|oe|呃|回应
yang-ngan|อย่างนั้น|yaang nan|那样；既然那样|副词|回应语气|ถ้าอย่างนั้น เราไปซื้อของพรุ่งนี้ดีกว่า|thaa yaang nan rao bpai sue khaawng phrung-nii dii gwaa|既然那样，我们明天去买东西比较好。|ทำอย่างนั้น|tham yaang nan|那样做|อย่างนี้|yaang nii|这样|回应
yaang-nii|อย่างนี้|yaang nii|这样|副词|回应语气|ถ้าทำอย่างนี้ งานจะเสร็จเร็วขึ้น|thaa tham yaang nii ngaan ja set reo kheun|如果这样做，工作会更快完成。|พูดอย่างนี้|phuut yaang nii|这样说|อย่างนั้น|yaang nan|那样|回应
yang-gaw|ยังไงก็|yang ngai gaw|无论如何也；反正|短语|回应语气|ยังไงก็ต้องกินข้าวก่อนกินยา|yang ngai gaw dtawng gin khaao gaawn gin yaa|无论如何也要先吃饭再吃药。|ยังไงก็ได้|yang ngai gaw dai|怎么都可以|เฉพาะ|cha-phaw|只限|语气
khon-la|คนละ|khon la|每人各……|副词|范围限制|ครูให้กระดาษนักเรียนคนละหนึ่งแผ่น|khruu hai gra-daat nak-riian khon la neung phaen|老师给学生每人一张纸。|คนละแก้ว|khon la gaaeo|每人一杯|ด้วยกัน|duai gan|一起|数量
an-la|อันละ|an la|每个……|副词|范围限制|ขนมนี้ราคาอันละสิบบาท|kha-nom nii raa-khaa an la sip baat|这个点心每个十泰铢。|อันละเท่าไร|an la thao-rai|每个多少钱|ทั้งหมด|thang-mot|全部|数量
wan-la|วันละ|wan la|每天……；一天……|副词|频率习惯|หมอบอกให้กินยาวันละสองครั้งหลังอาหาร|maaw baawk hai gin yaa wan la saawng khrang lang aa-haan|医生说每天饭后吃两次药。|เรียนวันละหนึ่งชั่วโมง|riian wan la neung chua-moong|每天学一小时|ครั้งละ|khrang la|每次|频率
khrang-la|ครั้งละ|khrang la|每次……|副词|频率习惯|ยานี้กินครั้งละหนึ่งเม็ด วันละสองครั้ง|yaa nii gin khrang la neung met wan la saawng khrang|这个药每次吃一片，每天两次。|จ่ายครั้งละน้อย|jaai khrang la naawy|每次少付一点|วันละ|wan la|每天|频率
`;

export const VOCABULARY_EXPANSION_A1_BASIC_ADVERBS_PARTICLES_01: VocabularyExpansionA1BasicAdverbsParticlesCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
