export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语" | "句型";
export type VocabularyExpansionLevel = "a2";
export type VocabularyExpansionTheme = "意见" | "喜欢不喜欢" | "觉得认为" | "选择" | "比较" | "建议" | "同意不同意" | "简单评价";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";
export type VocabularyExpansionRelated = { thai: string; roman: string; chinese: string; notesZh?: string };
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionComparison = { kind: VocabularyExpansionComparisonKind; target: VocabularyExpansionRelated; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[] };
export type VocabularyExpansionCandidate = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: VocabularyExpansionLevel; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[]; sourceRefs: string[]; reviewStatus: VocabularyExpansionReviewStatus };

type Row = readonly [string, string, string, string, VocabularyExpansionPartOfSpeech, VocabularyExpansionTheme, string, string, string, string, string, string];

const OPINION_REFS = ["worker-a-a2-opinions-preferences", "basic-thai-opinion-frames"];

const rows: Row[] = [
  ["khwaam-khit", "ความคิดเห็น", "khwaam khit hen", "意见；看法", "名词", "意见", "ครูถามความคิดเห็นของนักเรียนทุกคน", "khruu thaam khwaam-khit-hen khaawng nak-riian thuk khon", "老师询问每个学生的意见。", "คำตอบ", "kham-dtaawp", "答案"],
  ["khwam-ruu-seuk", "ความรู้สึก", "khwaam ruu-seuk", "感受；感觉", "名词", "意见", "ฉันบอกความรู้สึกหลังดูหนังเรื่องนี้", "chan baawk khwaam ruu-seuk lang duu nang rueang nii", "看完这部电影后，我说了自己的感受。", "ความคิดเห็น", "khwaam khit hen", "意见"],
  ["nai-khwaam-khit-khaawng", "ในความคิดของ", "nai khwaam khit khaawng", "在……看来", "句型", "意见", "ในความคิดของฉัน ร้านนี้สะอาดและราคาไม่แพง", "nai khwaam khit khaawng chan raan nii sa-aat lae raa-khaa mai phaaeng", "在我看来，这家店干净而且不贵。", "ฉันคิดว่า", "chan khit waa", "我认为"],
  ["sam-rap-chan", "สำหรับฉัน", "sam-rap chan", "对我来说", "短语", "意见", "สำหรับฉัน ภาษาไทยสนุกแต่ต้องฝึกทุกวัน", "sam-rap chan phaa-saa thai sa-nuk dtaae dtawng feuk thuk wan", "对我来说，泰语有趣，但要每天练。", "สำหรับเขา", "sam-rap khao", "对他/她来说"],
  ["nai-mum-maawng", "ในมุมมองของ", "nai mum maawng khaawng", "从……角度看", "句型", "意见", "ในมุมมองของแม่ เด็กควรนอนให้พอ", "nai mum-maawng khaawng maae dek khuan naawn hai phaaw", "从妈妈的角度看，孩子应该睡够。", "ในความคิดของ", "nai khwaam khit khaawng", "在……看来"],
  ["khit-waa", "คิดว่า", "khit waa", "认为；觉得", "句型", "觉得认为", "ฉันคิดว่ารถไฟฟ้าสะดวกกว่าแท็กซี่", "chan khit waa rot-fai-faa sa-duak gwaa thaek-sii", "我认为轻轨比出租车方便。", "รู้ว่า", "ruu waa", "知道"],
  ["ruu-seuk-waa", "รู้สึกว่า", "ruu seuk waa", "感觉；觉得", "句型", "觉得认为", "ฉันรู้สึกว่าอากาศวันนี้ร้อนเกินไป", "chan ruu-seuk waa aa-gaat wan-nii raawn goen bpai", "我感觉今天天气太热了。", "คิดว่า", "khit waa", "认为"],
  ["hen-waa", "เห็นว่า", "hen waa", "认为；看出", "句型", "觉得认为", "ครูเห็นว่านักเรียนควรอ่านเพิ่ม", "khruu hen waa nak-riian khuan aan phoem", "老师认为学生应该多读一点。", "คิดว่า", "khit waa", "觉得"],
  ["duu-muean-waa", "ดูเหมือนว่า", "duu muean waa", "看起来好像", "句型", "觉得认为", "ดูเหมือนว่าร้านนี้จะปิดเร็ว", "duu muean waa raan nii ja bpit reo", "看起来这家店会早关门。", "แน่ใจว่า", "naae-jai waa", "确定"],
  ["na-ja", "น่าจะ", "naa ja", "应该会；大概", "副词", "觉得认为", "รถน่าจะมาถึงในอีกสิบนาที", "rot naa ja maa theung nai iik sip naa-thii", "车应该会在十分钟后到。", "แน่นอน", "naae-naawn", "确定"],
  ["naae-jai", "แน่ใจ", "naae jai", "确定；有把握", "形容词", "觉得认为", "ฉันแน่ใจว่ากระเป๋าใบนี้เป็นของแม่", "chan naae-jai waa gra-bpao bai nii bpen khaawng maae", "我确定这个包是妈妈的。", "ไม่แน่ใจ", "mai naae jai", "不确定"],
  ["mai-nae-jai", "ไม่แน่ใจ", "mai naae jai", "不确定", "短语", "觉得认为", "ผมไม่แน่ใจว่าต้องลงป้ายไหน", "phom mai naae-jai waa dtawng long bpaai nai", "我不确定要在哪个站下车。", "แน่ใจ", "naae jai", "确定"],
  ["chaawp", "ชอบ", "chaawp", "喜欢", "动词", "喜欢不喜欢", "ฉันชอบอาหารไทยที่ไม่เผ็ดมาก", "chan chaawp aa-haan thai thii mai phet maak", "我喜欢不太辣的泰国菜。", "ไม่ชอบ", "mai chaawp", "不喜欢"],
  ["mai-chaawp", "ไม่ชอบ", "mai chaawp", "不喜欢", "短语", "喜欢不喜欢", "เขาไม่ชอบเสียงดังในร้านอาหาร", "khao mai chaawp siiang dang nai raan aa-haan", "他不喜欢餐馆里很吵。", "ชอบ", "chaawp", "喜欢"],
  ["chaawp-maak", "ชอบมาก", "chaawp maak", "很喜欢", "短语", "喜欢不喜欢", "น้องชอบเกมกระดานนี้มาก", "naawng chaawp geem gra-daan nii maak", "弟弟很喜欢这个桌游。", "ไม่ค่อยชอบ", "mai khaawy chaawp", "不太喜欢"],
  ["mai-khaawy-chaawp", "ไม่ค่อยชอบ", "mai khaawy chaawp", "不太喜欢", "短语", "喜欢不喜欢", "ฉันไม่ค่อยชอบเสื้อสีเข้ม", "chan mai khaawy chaawp seua sii khem", "我不太喜欢深色衣服。", "ชอบมาก", "chaawp maak", "很喜欢"],
  ["bproot", "โปรด", "bproot", "最喜欢的；心爱的", "形容词", "喜欢不喜欢", "เพลงโปรดของฉันเปิดในร้านกาแฟ", "phleeng bproot khaawng chan bpoet nai raan gaa-faae", "我最喜欢的歌在咖啡店里播放。", "ทั่วไป", "thua bpai", "一般的"],
  ["thi-chaawp", "ที่ชอบ", "thii chaawp", "喜欢的……", "短语", "喜欢不喜欢", "ร้านที่ชอบอยู่ใกล้บ้านฉัน", "raan thii chaawp yuu glai baan chan", "我喜欢的店在我家附近。", "ที่ไม่ชอบ", "thii mai chaawp", "不喜欢的"],
  ["thi-mai-chaawp", "ที่ไม่ชอบ", "thii mai chaawp", "不喜欢的……", "短语", "喜欢不喜欢", "สิ่งที่ไม่ชอบคือการรอนาน", "sing thii mai chaawp khue gaan raaw naan", "我不喜欢的事情是等很久。", "ที่ชอบ", "thii chaawp", "喜欢的"],
  ["yaak", "อยาก", "yaak", "想；想要", "动词", "喜欢不喜欢", "วันนี้ฉันอยากกินก๋วยเตี๋ยวร้อน ๆ", "wan-nii chan yaak gin guai-dtiaao raawn raawn", "今天我想吃热汤面。", "ไม่อยาก", "mai yaak", "不想"],
  ["mai-yaak", "ไม่อยาก", "mai yaak", "不想", "短语", "喜欢不喜欢", "ฉันไม่อยากออกไปข้างนอกเพราะฝนตก", "chan mai yaak aawk bpai khaang naawk phraw fon dtok", "我不想出去，因为下雨。", "อยาก", "yaak", "想"],
  ["dtawng-gaan", "ต้องการ", "dtawng gaan", "需要；想要", "动词", "选择", "คุณต้องการถุงเพิ่มไหมคะ", "khun dtawng-gaan thung phoem mai kha", "您需要再加袋子吗？", "อยากได้", "yaak dai", "想要"],
  ["yaak-dai", "อยากได้", "yaak dai", "想要得到", "动词", "选择", "น้องอยากได้รองเท้าคู่ใหม่", "naawng yaak dai raawng-thaao khuu mai", "弟弟想要一双新鞋。", "ต้องการ", "dtawng gaan", "需要"],
  ["leuak", "เลือก", "leuak", "选择；挑选", "动词", "选择", "ฉันเลือกเสื้อสีฟ้าเพราะดูสบายตา", "chan leuak seua sii faa phraw duu sa-baai dtaa", "我选择蓝色上衣，因为看着舒服。", "ไม่เลือก", "mai leuak", "不选"],
  ["leuak-ao", "เลือกเอา", "leuak ao", "选定拿走；挑一个", "动词", "选择", "คุณเลือกเอาได้เลยว่าอยากนั่งตรงไหน", "khun leuak ao dai loei waa yaak nang dtrong nai", "你可以直接选想坐哪里。", "ให้คนอื่นเลือก", "hai khon euen leuak", "让别人选"],
  ["dtat-sin-jai", "ตัดสินใจ", "dtat sin jai", "决定", "动词", "选择", "เราตัดสินใจไปตลาดแทนห้าง", "rao dtat-sin-jai bpai dta-laat thaaen haang", "我们决定去市场而不是商场。", "ยังไม่แน่ใจ", "yang mai naae jai", "还不确定"],
  ["dtat-sin-jai-mai-dai", "ตัดสินใจไม่ได้", "dtat sin jai mai dai", "决定不了", "短语", "选择", "ฉันตัดสินใจไม่ได้ว่าจะซื้อสีไหน", "chan dtat-sin-jai mai dai waa ja sue sii nai", "我决定不了要买哪个颜色。", "ตัดสินใจแล้ว", "dtat-sin-jai laaeo", "已经决定"],
  ["ao-an-nii", "เอาอันนี้", "ao an nii", "要这个", "短语", "选择", "ถ้าราคาไม่แพง ฉันเอาอันนี้ค่ะ", "thaa raa-khaa mai phaaeng chan ao an nii kha", "如果价格不贵，我要这个。", "เอาอันนั้น", "ao an nan", "要那个"],
  ["mai-ao-an-nii", "ไม่เอาอันนี้", "mai ao an nii", "不要这个", "短语", "选择", "ไม่เอาอันนี้ค่ะ ขอดูแบบอื่นได้ไหม", "mai ao an nii kha khaaw duu baaep euen dai mai", "不要这个，可以看别的款式吗？", "เอาอันนี้", "ao an nii", "要这个"],
  ["baaep-nii", "แบบนี้", "baaep nii", "这样的；这种样子", "短语", "选择", "ฉันชอบรองเท้าแบบนี้เพราะเดินสบาย", "chan chaawp raawng-thaao baaep nii phraw doen sa-baai", "我喜欢这种鞋，因为走路舒服。", "แบบนั้น", "baaep nan", "那样的"],
  ["baaep-nan", "แบบนั้น", "baaep nan", "那样的；那种样子", "短语", "选择", "เสื้อแบบนั้นสวยแต่ไม่เหมาะกับฉัน", "seua baaep nan suai dtaae mai maw gap chan", "那种上衣漂亮，但不适合我。", "แบบนี้", "baaep nii", "这样的"],
  ["di-gwaa", "ดีกว่า", "dii gwaa", "更好；比较好", "形容词", "比较", "ไปเช้าดีกว่า เพราะตอนบ่ายรถติด", "bpai chaao dii gwaa phraw dtaawn baai rot dtit", "早上去比较好，因为下午堵车。", "แย่กว่า", "yaae gwaa", "更差"],
  ["yaae-gwaa", "แย่กว่า", "yaae gwaa", "更差", "形容词", "比较", "ทางนี้แย่กว่าทางลัดเพราะไกลมาก", "thaang nii yaae gwaa thaang lat phraw glai maak", "这条路比近路更差，因为很远。", "ดีกว่า", "dii gwaa", "更好"],
  ["maak-gwaa", "มากกว่า", "maak gwaa", "更多；更……", "形容词", "比较", "ร้านนี้มีคนมากกว่าร้านนั้น", "raan nii mii khon maak gwaa raan nan", "这家店的人比那家多。", "น้อยกว่า", "naawy gwaa", "更少"],
  ["naawy-gwaa", "น้อยกว่า", "naawy gwaa", "更少；少于", "形容词", "比较", "ราคาเสื้อตัวนี้น้อยกว่าที่คิด", "raa-khaa seua dtua nii naawy gwaa thii khit", "这件上衣的价格比想的少。", "มากกว่า", "maak gwaa", "更多"],
  ["reo-gwaa", "เร็วกว่า", "reo gwaa", "更快", "形容词", "比较", "ขึ้นรถไฟฟ้าเร็วกว่าเรียกแท็กซี่ตอนรถติด", "kheun rot-fai-faa reo gwaa riiak thaek-sii dtaawn rot dtit", "堵车时坐轻轨比叫出租车更快。", "ช้ากว่า", "chaa gwaa", "更慢"],
  ["chaa-gwaa", "ช้ากว่า", "chaa gwaa", "更慢；更晚", "形容词", "比较", "รถเมล์วันนี้ช้ากว่าปกติ", "rot-mee wan-nii chaa gwaa bpa-ga-dti", "今天公交比平常更慢。", "เร็วกว่า", "reo gwaa", "更快"],
  ["suai-gwaa", "สวยกว่า", "suai gwaa", "更漂亮", "形容词", "比较", "ฉันคิดว่าชุดสีฟ้าสวยกว่าสีดำ", "chan khit waa chut sii faa suai gwaa sii dam", "我觉得蓝色那套比黑色的更漂亮。", "ธรรมดากว่า", "tham-ma-daa gwaa", "更普通"],
  ["ngai-gwaa", "ง่ายกว่า", "ngaai gwaa", "更容易", "形容词", "比较", "อ่านประโยคสั้นง่ายกว่าประโยคยาว", "aan bpra-yook san ngaai gwaa bpra-yook yaao", "读短句比读长句更容易。", "ยากกว่า", "yaak gwaa", "更难"],
  ["yaak-gwaa", "ยากกว่า", "yaak gwaa", "更难", "形容词", "比较", "แบบฝึกหัดวันนี้ยากกว่าเมื่อวาน", "baaep-feuk-hat wan-nii yaak gwaa muea-waan", "今天的练习比昨天更难。", "ง่ายกว่า", "ngaai gwaa", "更容易"],
  ["muean-gan", "เหมือนกัน", "muean gan", "一样；相同", "形容词", "比较", "เสื้อสองตัวนี้สีเหมือนกัน", "seua saawng dtua nii sii muean gan", "这两件上衣颜色一样。", "ต่างกัน", "dtaang gan", "不同"],
  ["dtaang-gan", "ต่างกัน", "dtaang gan", "不同；不一样", "形容词", "比较", "ความคิดเห็นของเราต่างกันเล็กน้อย", "khwaam-khit-hen khaawng rao dtaang gan lek naawy", "我们的意见有点不同。", "เหมือนกัน", "muean gan", "一样"],
  ["mai-muean", "ไม่เหมือน", "mai muean", "不像；不一样", "形容词", "比较", "รสชาติร้านนี้ไม่เหมือนร้านที่บ้าน", "rot-chaat raan nii mai muean raan thii baan", "这家店的味道和家那边的店不一样。", "เหมือน", "muean", "像"],
  ["thao-gan", "เท่ากัน", "thao gan", "一样多；相等", "形容词", "比较", "เด็กสองคนมีขนมเท่ากัน", "dek saawng khon mii kha-nom thao gan", "两个孩子的点心一样多。", "ไม่เท่ากัน", "mai thao gan", "不相等"],
  ["mai-thao-gan", "ไม่เท่ากัน", "mai thao gan", "不一样多；不相等", "形容词", "比较", "ราคาของสองร้านนี้ไม่เท่ากัน", "raa-khaa khaawng saawng raan nii mai thao gan", "这两家店的价格不一样。", "เท่ากัน", "thao gan", "相等"],
  ["khwan", "ควร", "khuan", "应该", "动词", "建议", "เราควรออกจากบ้านก่อนรถติด", "rao khuan aawk jaak baan gaawn rot dtit", "我们应该在堵车前出门。", "ไม่ควร", "mai khuan", "不应该"],
  ["mai-khwan", "ไม่ควร", "mai khuan", "不应该", "短语", "建议", "เด็กไม่ควรเล่นเกมนานก่อนนอน", "dek mai khuan len geem naan gaawn naawn", "孩子睡前不应该玩游戏太久。", "ควร", "khuan", "应该"],
  ["na-ja", "น่าจะ", "naa ja", "应该会；大概", "副词", "建议", "ถ้าฝนตก เราน่าจะอยู่บ้าน", "thaa fon dtok rao naa ja yuu baan", "如果下雨，我们大概应该待在家。", "ต้อง", "dtawng", "必须"],
  ["laawng", "ลอง", "laawng", "试着；试一试", "动词", "建议", "ลองอ่านประโยคนี้อีกครั้งนะ", "laawng aan bpra-yook nii iik khrang na", "试着再读一次这个句子吧。", "หยุดลอง", "yut laawng", "停止尝试"],
  ["laawng-duu", "ลองดู", "laawng duu", "试试看", "动词", "建议", "ถ้าไม่แน่ใจ ลองดูอีกแบบหนึ่ง", "thaa mai naae-jai laawng duu iik baaep neung", "如果不确定，试试看另一种。", "ไม่ลอง", "mai laawng", "不试"],
  ["sa-noe", "เสนอ", "sa-noe", "提议；提出", "动词", "建议", "เพื่อนเสนอให้เราไปเช้ากว่าเดิม", "phuean sa-noe hai rao bpai chaao gwaa doem", "朋友提议我们比原来早一点去。", "ปฏิเสธ", "bpa-dti-seet", "拒绝"],
  ["kham-nae-nam", "คำแนะนำ", "kham nae-nam", "建议；指导", "名词", "建议", "ขอบคุณสำหรับคำแนะนำเรื่องการเดินทาง", "khaawp-khun sam-rap kham nae-nam rueang gaan doen-thaang", "谢谢关于出行的建议。", "ความคิดเห็น", "khwaam khit hen", "意见"],
  ["nae-nam", "แนะนำ", "nae nam", "推荐；建议；介绍", "动词", "建议", "ครูแนะนำหนังสือไทยง่าย ๆ ให้ฉัน", "khruu nae-nam nang-sue thai ngaai ngaai hai chan", "老师给我推荐简单的泰语书。", "เลือกเอง", "leuak eeng", "自己选"],
  ["tham-mai-la", "ทำไมล่ะ", "tham-mai la", "为什么呢；怎么会", "短语", "意见", "คุณไม่ชอบร้านนี้ ทำไมล่ะ", "khun mai chaawp raan nii tham-mai la", "你不喜欢这家店，为什么呢？", "เพราะอะไร", "phraw a-rai", "因为什么"],
  ["pen-yang-ngai", "เป็นยังไง", "bpen yang ngai", "怎么样", "句型", "简单评价", "หนังเรื่องนี้เป็นยังไง สนุกไหม", "nang rueang nii bpen yang ngai sa-nuk mai", "这部电影怎么样？好玩吗？", "ดีไหม", "dii mai", "好吗"],
  ["dii-mai", "ดีไหม", "dii mai", "好吗；好不好", "句型", "简单评价", "ร้านนี้ดีไหม คุณเคยไปหรือยัง", "raan nii dii mai khun khoei bpai rue yang", "这家店好吗？你去过了吗？", "เป็นยังไง", "bpen yang ngai", "怎么样"],
  ["mai-dii", "ไม่ดี", "mai dii", "不好", "形容词", "简单评价", "นอนน้อยไม่ดีต่อสุขภาพ", "naawn naawy mai dii dtaaw suk-kha-phaap", "睡得少对健康不好。", "ดี", "dii", "好"],
  ["dii", "ดี", "dii", "好；不错", "形容词", "简单评价", "วิธีนี้ดีและทำตามง่าย", "wi-thii nii dii lae tham dtaam ngaai", "这个方法不错，也容易照做。", "ไม่ดี", "mai dii", "不好"],
  ["ok", "โอเค", "oo-khee", "可以；还行；OK", "形容词", "简单评价", "ถ้าราคาโอเค ฉันจะซื้อ", "thaa raa-khaa oo-khee chan ja sue", "如果价格可以，我就买。", "ไม่โอเค", "mai oo-khee", "不可以；不满意"],
  ["mai-ok", "ไม่โอเค", "mai oo-khee", "不可以；不满意", "短语", "简单评价", "เวลานี้ไม่โอเคสำหรับฉัน", "wee-laa nii mai oo-khee sam-rap chan", "这个时间对我来说不太行。", "โอเค", "oo-khee", "可以"],
  ["tham-ma-daa", "ธรรมดา", "tham-ma-daa", "普通；一般", "形容词", "简单评价", "อาหารร้านนี้ธรรมดาแต่ราคาไม่แพง", "aa-haan raan nii tham-ma-daa dtaae raa-khaa mai phaaeng", "这家店的食物一般，但不贵。", "พิเศษ", "phi-seet", "特别"],
  ["phi-seet", "พิเศษ", "phi-seet", "特别；特殊", "形容词", "简单评价", "วันนี้แม่ทำอาหารพิเศษให้ครอบครัว", "wan-nii maae tham aa-haan phi-seet hai khraawp-khrua", "今天妈妈给家人做了特别的饭菜。", "ธรรมดา", "tham-ma-daa", "普通"],
  ["khum", "คุ้ม", "khum", "划算；值得", "形容词", "简单评价", "ตั๋วไปกลับคุ้มกว่าซื้อแยก", "dtua bpai glap khum gwaa sue yaaek", "往返票比分开买更划算。", "ไม่คุ้ม", "mai khum", "不划算"],
  ["mai-khum", "ไม่คุ้ม", "mai khum", "不划算；不值得", "短语", "简单评价", "ของชิ้นนี้แพงและใช้ยาก ไม่คุ้ม", "khaawng chin nii phaaeng lae chai yaak mai khum", "这个东西贵又难用，不划算。", "คุ้ม", "khum", "划算"],
  ["sa-duak", "สะดวก", "sa-duak", "方便", "形容词", "简单评价", "รถไฟฟ้าสะดวกสำหรับคนไม่มีรถ", "rot-fai-faa sa-duak sam-rap khon mai mii rot", "轻轨对没有车的人很方便。", "ไม่สะดวก", "mai sa-duak", "不方便"],
  ["mai-sa-duak", "ไม่สะดวก", "mai sa-duak", "不方便", "短语", "简单评价", "วันนี้ฉันไม่สะดวกออกไปข้างนอก", "wan-nii chan mai sa-duak aawk bpai khaang naawk", "今天我不方便出门。", "สะดวก", "sa-duak", "方便"],
  ["mao", "เหมาะ", "maw", "合适；适合", "形容词", "简单评价", "เสื้อตัวนี้เหมาะกับอากาศร้อน", "seua dtua nii maw gap aa-gaat raawn", "这件上衣适合热天。", "ไม่เหมาะ", "mai maw", "不合适"],
  ["mai-mao", "ไม่เหมาะ", "mai maw", "不合适", "短语", "简单评价", "รองเท้าแตะไม่เหมาะกับงานทางการ", "raawng-thaao dtae mai maw gap ngaan thaang-gaan", "拖鞋不适合正式活动。", "เหมาะ", "maw", "合适"],
  ["su-phaap", "สุภาพ", "su-phaap", "得体；礼貌", "形容词", "简单评价", "ชุดนี้สุภาพพอสำหรับไปวัด", "chut nii su-phaap phaaw sam-rap bpai wat", "这套衣服够得体，适合去寺庙。", "ไม่สุภาพ", "mai su-phaap", "不得体"],
  ["suan-dtua", "ส่วนตัว", "suan dtua", "个人的；私人的", "形容词", "意见", "นี่เป็นความคิดเห็นส่วนตัวของฉัน", "nii bpen khwaam-khit-hen suan dtua khaawng chan", "这是我的个人意见。", "ส่วนรวม", "suan ruam", "公共的；集体的"],
  ["hen-duai", "เห็นด้วย", "hen duai", "同意；赞同", "动词", "同意不同意", "ฉันเห็นด้วยกับคำแนะนำของครู", "chan hen duai gap kham nae-nam khaawng khruu", "我同意老师的建议。", "ไม่เห็นด้วย", "mai hen duai", "不同意"],
  ["mai-hen-duai", "ไม่เห็นด้วย", "mai hen duai", "不同意", "短语", "同意不同意", "เขาไม่เห็นด้วยกับการออกไปดึก", "khao mai hen duai gap gaan aawk bpai deuk", "他不同意很晚出去。", "เห็นด้วย", "hen duai", "同意"],
  ["dtok-long", "ตกลง", "dtok long", "同意；约定；成交", "动词", "同意不同意", "ถ้าทุกคนตกลง เราจะไปวันเสาร์", "thaa thuk khon dtok-long rao ja bpai wan sao", "如果大家同意，我们星期六去。", "ไม่ตกลง", "mai dtok-long", "不同意；没谈妥"],
  ["mai-dtok-long", "ไม่ตกลง", "mai dtok long", "不同意；没谈妥", "短语", "同意不同意", "เรายังไม่ตกลงเรื่องเวลาเดินทาง", "rao yang mai dtok-long rueang wee-laa doen-thaang", "我们还没谈妥出行时间。", "ตกลง", "dtok long", "同意；谈妥"],
  ["chai", "ใช่", "chai", "是；对", "短语", "同意不同意", "ใช่ ฉันก็คิดแบบนั้นเหมือนกัน", "chai chan gaaw khit baaep nan muean gan", "对，我也那样想。", "ไม่ใช่", "mai chai", "不是"],
  ["mai-chai", "ไม่ใช่", "mai chai", "不是；不对", "短语", "同意不同意", "ไม่ใช่ ฉันหมายถึงร้านอีกฝั่งถนน", "mai chai chan maai theung raan iik fang tha-non", "不是，我指的是马路另一边的店。", "ใช่", "chai", "是；对"],
  ["chai-laaeo", "ใช่แล้ว", "chai laaeo", "对了；就是", "短语", "同意不同意", "ใช่แล้ว ทางนี้ไปตลาดได้เร็วกว่า", "chai laaeo thaang nii bpai dta-laat dai reo gwaa", "对了，走这边去市场更快。", "ไม่ใช่", "mai chai", "不是"],
  ["mai-naa", "ไม่น่า", "mai naa", "不太应该；看起来不", "副词", "意见", "ไม่น่าจะทันรถไฟเที่ยวนี้แล้ว", "mai naa ja than rot-fai thiao nii laaeo", "应该赶不上这班火车了。", "น่าจะ", "naa ja", "应该会"],
  ["thuk-jai", "ถูกใจ", "thuuk jai", "合心意；喜欢", "形容词", "喜欢不喜欢", "ของขวัญชิ้นนี้ถูกใจแม่มาก", "khaawng-khwan chin nii thuuk jai maae maak", "这件礼物很合妈妈心意。", "ไม่ถูกใจ", "mai thuuk jai", "不合心意"],
  ["mai-thuk-jai", "ไม่ถูกใจ", "mai thuuk jai", "不合心意", "短语", "喜欢不喜欢", "สีนี้ไม่ถูกใจฉันเท่าไร", "sii nii mai thuuk jai chan thao rai", "这个颜色不太合我心意。", "ถูกใจ", "thuuk jai", "合心意"],
  ["bpen-bpai-dai", "เป็นไปได้", "bpen bpai dai", "可能；可行", "形容词", "意见", "แผนนี้เป็นไปได้ถ้าเรามีเวลาเพิ่ม", "phaaen nii bpen bpai dai thaa rao mii wee-laa phoem", "如果我们有更多时间，这个计划可行。", "เป็นไปไม่ได้", "bpen bpai mai dai", "不可能"],
  ["bpen-bpai-mai-dai", "เป็นไปไม่ได้", "bpen bpai mai dai", "不可能；不可行", "短语", "意见", "ไปถึงในห้านาทีเป็นไปไม่ได้ เพราะไกลมาก", "bpai theung nai haa naa-thii bpen bpai mai dai phraw glai maak", "五分钟内到不可能，因为很远。", "เป็นไปได้", "bpen bpai dai", "可能"],
  ["na-son-jai", "น่าสนใจ", "naa son-jai", "有意思；值得关注", "形容词", "简单评价", "กิจกรรมนี้น่าสนใจสำหรับคนชอบดนตรี", "git-ja-gam nii naa son-jai sam-rap khon chaawp don-dtrii", "这个活动对喜欢音乐的人来说有意思。", "ไม่น่าสนใจ", "mai naa son-jai", "没意思"],
  ["mai-na-son-jai", "ไม่น่าสนใจ", "mai naa son-jai", "没意思；不吸引人", "短语", "简单评价", "เกมนี้ไม่น่าสนใจสำหรับฉัน", "geem nii mai naa son-jai sam-rap chan", "这个游戏对我来说没意思。", "น่าสนใจ", "naa son-jai", "有意思"],
  ["na-rak", "น่ารัก", "naa rak", "可爱", "形容词", "简单评价", "แมวตัวนี้น่ารักและไม่ดุ", "maaeo dtua nii naa-rak lae mai du", "这只猫可爱，也不凶。", "น่ากลัว", "naa glua", "可怕"],
  ["na-glua", "น่ากลัว", "naa glua", "可怕；吓人", "形容词", "简单评价", "หนังเรื่องนี้น่ากลัวเกินไปสำหรับเด็ก", "nang rueang nii naa glua goen bpai sam-rap dek", "这部电影对孩子来说太吓人。", "น่ารัก", "naa rak", "可爱"],
  ["a-raawy", "อร่อย", "a-raawy", "好吃", "形容词", "简单评价", "ก๋วยเตี๋ยวร้านนี้อร่อยแต่เผ็ดนิดหน่อย", "guai-dtiaao raan nii a-raawy dtaae phet nit naawy", "这家店的面好吃，但有点辣。", "ไม่อร่อย", "mai a-raawy", "不好吃"],
  ["mai-a-raawy", "ไม่อร่อย", "mai a-raawy", "不好吃", "短语", "简单评价", "ขนมถุงนี้ไม่อร่อยเท่าที่คิด", "kha-nom thung nii mai a-raawy thao thii khit", "这袋点心没有想象中好吃。", "อร่อย", "a-raawy", "好吃"],
  ["sa-aat", "สะอาด", "sa-aat", "干净", "形容词", "简单评价", "ห้องพักนี้สะอาดและอยู่สบาย", "haawng phak nii sa-aat lae yuu sa-baai", "这个房间干净，住得舒服。", "สกปรก", "sok-ga-bprok", "脏"],
  ["sok-ga-bprok", "สกปรก", "sok-ga-bprok", "脏", "形容词", "简单评价", "รองเท้าสกปรกเพราะเดินกลางฝน", "raawng-thaao sok-ga-bprok phraw doen glaang fon", "鞋子因为雨中走路弄脏了。", "สะอาด", "sa-aat", "干净"],
  ["riiap-ngaai", "เรียบง่าย", "riiap ngaai", "简单；朴素", "形容词", "简单评价", "ฉันชอบเสื้อแบบเรียบง่ายมากกว่า", "chan chaawp seua baaep riiap ngaai maak gwaa", "我更喜欢简单款式的上衣。", "หรู", "ruu", "华丽"],
  ["ruu", "หรู", "ruu", "华丽；高级感", "形容词", "简单评价", "ร้านนี้ดูหรูแต่ราคาไม่แพงมาก", "raan nii duu ruu dtaae raa-khaa mai phaaeng maak", "这家店看起来高级，但价格不太贵。", "เรียบง่าย", "riiap ngaai", "简单朴素"],
  ["khum-khaa", "คุ้มค่า", "khum khaa", "值得；物有所值", "形容词", "简单评价", "ตั๋วนี้คุ้มค่าถ้าใช้เดินทางทั้งวัน", "dtua nii khum khaa thaa chai doen-thaang thang wan", "如果用来整天出行，这张票很值。", "แพงเกินไป", "phaaeng goen bpai", "太贵"],
  ["phaaeng-goen-bpai", "แพงเกินไป", "phaaeng goen bpai", "太贵", "短语", "简单评价", "กระเป๋าใบนี้สวยแต่แพงเกินไป", "gra-bpao bai nii suai dtaae phaaeng goen bpai", "这个包漂亮，但太贵了。", "คุ้มค่า", "khum khaa", "值得"],
  ["thuuk-gwaa", "ถูกกว่า", "thuuk gwaa", "更便宜", "形容词", "比较", "ซื้อออนไลน์ถูกกว่าซื้อที่ร้านนิดหน่อย", "sue online thuuk gwaa sue thii raan nit naawy", "网上买比店里买便宜一点。", "แพงกว่า", "phaaeng gwaa", "更贵"],
  ["phaaeng-gwaa", "แพงกว่า", "phaaeng gwaa", "更贵", "形容词", "比较", "ร้านใกล้สถานีแพงกว่าร้านในซอย", "raan glai sa-thaa-nii phaaeng gwaa raan nai saawy", "车站附近的店比巷子里的店贵。", "ถูกกว่า", "thuuk gwaa", "更便宜"],
  ["suan-tua-khit-waa", "ส่วนตัวคิดว่า", "suan dtua khit waa", "个人认为", "句型", "意见", "ส่วนตัวคิดว่าควรไปเช้ากว่านี้", "suan dtua khit waa khuan bpai chaao gwaa nii", "个人认为应该比这更早去。", "ทุกคนคิดว่า", "thuk khon khit waa", "大家认为"],
  ["chan-wa", "ฉันว่า", "chan waa", "我觉得；我看", "句型", "觉得认为", "ฉันว่าร้านนี้เหมาะกับครอบครัว", "chan waa raan nii maw gap khraawp-khrua", "我觉得这家店适合家庭。", "ฉันคิดว่า", "chan khit waa", "我认为"],
  ["pen-khwaam-khit-thii-dii", "เป็นความคิดที่ดี", "bpen khwaam khit thii dii", "是个好主意", "句型", "同意不同意", "ไปตลาดตอนเช้าเป็นความคิดที่ดี", "bpai dta-laat dtaawn chaao bpen khwaam-khit thii dii", "早上去市场是个好主意。", "ไม่ดี", "mai dii", "不好"],
  ["mai-khoei-khit-baep-nan", "ไม่เคยคิดแบบนั้น", "mai khoei khit baaep nan", "从没那样想过", "句型", "意见", "ฉันไม่เคยคิดแบบนั้น ขอบคุณที่บอก", "chan mai khoei khit baaep nan khaawp-khun thii baawk", "我从没那样想过，谢谢你告诉我。", "เห็นด้วย", "hen duai", "同意"],
];

const buildCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const related: VocabularyExpansionRelated = { thai: row[9], roman: row[10], chinese: row[11] };
  const comparison: VocabularyExpansionComparison = { kind: "usage", target: related, distinctionZh: `${row[1]} 用于表达“${row[5]}”；和 ${related.thai} 对照记，可以把意见、偏好、选择、比较和同意不同意分开。` };
  const example = { thai: row[6], roman: row[7], chinese: row[8] };
  const collocations = [{ thai: row[1], roman: row[2], chinese: row[3] }, related];
  return {
    id: row[0],
    thai: row[1],
    roman: row[2],
    chinese: row[3],
    partOfSpeech: row[4],
    theme: row[5],
    level: "a2",
    priority: index + 1,
    senses: [{ id: `${row[0]}-main`, chinese: row[3], examples: [example], synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5]] }],
    synonyms: [],
    antonyms: [],
    comparisons: [comparison],
    collocations,
    tags: [row[5], "A2基础"],
    sourceRefs: OPINION_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_OPINIONS_PREFERENCES_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
