export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "打电话" | "发消息" | "邀请" | "道歉" | "感谢" | "约见" | "寒暄" | "礼貌互动";
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

type Row = readonly [thai: string, id: string, roman: string, chinese: string, partOfSpeech: VocabularyExpansionPartOfSpeech, theme: VocabularyExpansionTheme, exampleThai: string, exampleRoman: string, exampleChinese: string, tag: string];

const COMMUNICATION_SOCIAL_REFS = ["thai-frequency", "thai-a2-communication-social-candidate"];

const rows = [
  ["โทรหาแม่", "thoo-haa-maae", "thoo haa maae", "给妈妈打电话", "短语", "打电话", "ฉันโทรหาแม่ทุกเย็นหลังเลิกงาน", "chan thoo haa maae thuk yen lang loek ngaan", "我每天下班后给妈妈打电话。", "phone"],
  ["โทรหาเพื่อน", "thoo-haa-phuean", "thoo haa phuean", "给朋友打电话", "短语", "打电话", "เขาโทรหาเพื่อนเพื่อถามทาง", "khao thoo haa phuean phuea thaam thaang", "他给朋友打电话问路。", "phone"],
  ["โทรกลับมา", "thoo-glap-maa", "thoo glap maa", "回电话过来", "短语", "打电话", "ถ้าว่างแล้ว ช่วยโทรกลับมาหน่อยนะ", "thaa waang laaeo, chuai thoo glap maa naawy na", "如果有空了，请回个电话。", "phone"],
  ["โทรกลับทีหลัง", "thoo-glap-thii-lang", "thoo glap thii lang", "稍后回电话", "短语", "打电话", "ตอนนี้ฉันไม่สะดวก ขอโทรกลับทีหลัง", "dtaawn-nii chan mai sa-duuak, khaaw thoo glap thii lang", "我现在不方便，请让我稍后回电话。", "phone"],
  ["รับสายช้า", "rap-saai-chaa", "rap saai chaa", "接电话慢", "短语", "打电话", "ขอโทษที่รับสายช้า เมื่อกี้ฉันอยู่ในครัว", "khaaw-thoot thii rap saai chaa, muea-gii chan yuu nai khrua", "抱歉接电话慢了，刚才我在厨房。", "phone"],
  ["ไม่รับสาย", "mai-rap-saai", "mai rap saai", "没接电话", "短语", "打电话", "เมื่อเช้าเขาไม่รับสาย เพราะยังนอนอยู่", "muea-chaao khao mai rap saai, phraw yang naawn yuu", "今天早上他没接电话，因为还在睡。", "phone"],
  ["วางสายก่อน", "waang-saai-gaawn", "waang saai gaawn", "先挂电话", "短语", "打电话", "แม่บอกว่าจะวางสายก่อนแล้วโทรมาใหม่", "maae baawk waa ja waang saai gaawn laaeo thoo maa mai", "妈妈说先挂电话，然后再打来。", "phone"],
  ["สายไม่ว่าง", "saai-mai-waang", "saai mai waang", "电话占线", "短语", "打电话", "ฉันโทรไปหลายครั้ง แต่สายไม่ว่าง", "chan thoo bpai laai khrang, dtaae saai mai waang", "我打了好几次，但电话占线。", "phone"],
  ["เสียงไม่ชัด", "siiang-mai-chat", "siiang mai chat", "声音不清楚", "短语", "打电话", "ในรถไฟเสียงไม่ชัด กรุณาพูดช้า ๆ", "nai rot-fai siiang mai chat, ga-ru-naa phuut chaa chaa", "在火车上声音不清楚，请慢慢说。", "phone"],
  ["พูดอีกครั้ง", "phuut-iik-khrang", "phuut iik khrang", "再说一遍", "短语", "礼貌互动", "ขอโทษค่ะ ช่วยพูดอีกครั้งได้ไหม", "khaaw-thoot kha, chuai phuut iik khrang dai mai", "不好意思，可以请你再说一遍吗？", "polite"],
  ["ฝากข้อความไว้", "faak-khaaw-khwaam-wai", "faak khaaw-khwaam wai", "留下留言", "短语", "打电话", "ถ้าเขาไม่อยู่ คุณฝากข้อความไว้ได้", "thaa khao mai yuu, khun faak khaaw-khwaam wai dai", "如果他不在，您可以留下留言。", "phone"],
  ["ส่งข้อความหาเพื่อน", "song-khaaw-khwaam-haa-phuean", "song khaaw-khwaam haa phuean", "给朋友发消息", "短语", "发消息", "ฉันส่งข้อความหาเพื่อนก่อนออกจากบ้าน", "chan song khaaw-khwaam haa phuean gaawn aawk jaak baan", "我出门前给朋友发消息。", "message"],
  ["อ่านข้อความแล้ว", "aan-khaaw-khwaam-laaeo", "aan khaaw-khwaam laaeo", "已经读了消息", "短语", "发消息", "เขาอ่านข้อความแล้ว แต่ยังไม่ได้ตอบ", "khao aan khaaw-khwaam laaeo, dtaae yang mai dai dtaawp", "他已经读了消息，但还没回复。", "message"],
  ["ตอบข้อความช้า", "dtaawp-khaaw-khwaam-chaa", "dtaawp khaaw-khwaam chaa", "回复消息慢", "短语", "发消息", "ช่วงนี้ฉันยุ่ง เลยตอบข้อความช้า", "chuuang nii chan yung, loei dtaawp khaaw-khwaam chaa", "最近我忙，所以回复消息慢。", "message"],
  ["ส่งรูปให้แม่", "song-ruup-hai-maae", "song ruup hai maae", "发照片给妈妈", "短语", "发消息", "น้องส่งรูปให้แม่ดูทางโทรศัพท์", "naawng song ruup hai maae duu thaang thoo-ra-sap", "弟弟/妹妹用手机发照片给妈妈看。", "message"],
  ["ส่งที่อยู่มา", "song-thii-yuu-maa", "song thii-yuu maa", "把地址发过来", "短语", "发消息", "ช่วยส่งที่อยู่มาให้ฉันหน่อย", "chuai song thii-yuu maa hai chan naawy", "请把地址发给我一下。", "message"],
  ["ส่งเบอร์โทรมา", "song-booe-thoo-maa", "song booe thoo maa", "把电话号码发来", "短语", "发消息", "ถ้าสะดวก ช่วยส่งเบอร์โทรมาในแชต", "thaa sa-duuak, chuai song booe thoo maa nai chaet", "如果方便，请在聊天里把电话号码发来。", "message"],
  ["พิมพ์ผิด", "phim-phit", "phim phit", "打错字", "短语", "发消息", "ขอโทษ ฉันพิมพ์ผิด คำนี้ต้องเขียนใหม่", "khaaw-thoot, chan phim phit, kham nii dtawng khiian mai", "抱歉，我打错字了，这个词要重写。", "message"],
  ["ลบข้อความ", "lop-khaaw-khwaam", "lop khaaw-khwaam", "删除消息", "短语", "发消息", "เธอลบข้อความเก่าในโทรศัพท์", "thoe lop khaaw-khwaam gao nai thoo-ra-sap", "她删除手机里的旧消息。", "message"],
  ["เปิดกลุ่มแชต", "bpoet-glum-chaet", "bpoet glum chaet", "打开群聊", "短语", "发消息", "ครูเปิดกลุ่มแชตเพื่อบอกการบ้าน", "khruu bpoet glum chaet phuea baawk gaan-baan", "老师打开群聊来通知作业。", "message"],
  ["โทรวิดีโอ", "thoo-wi-dii-oo", "thoo wi-dii-oo", "视频通话", "短语", "打电话", "คืนนี้เราจะโทรวิดีโอกับครอบครัว", "khuen-nii rao ja thoo wi-dii-oo gap khraawp-khrua", "今晚我们要和家人视频通话。", "phone"],
  ["ปิดเสียงโทรศัพท์ก่อนเรียน", "bpit-siiang-thoo-ra-sap-gaawn-riian", "bpit siiang thoo-ra-sap gaawn riian", "上课前把手机静音", "短语", "打电话", "ก่อนเข้าห้องเรียน ต้องปิดเสียงโทรศัพท์ก่อนเรียน", "gaawn khao haawng-riian, dtawng bpit siiang thoo-ra-sap gaawn riian", "进教室前，上课前要把手机静音。", "phone"],
  ["เปิดเสียงโทรศัพท์", "bpoet-siiang-thoo-ra-sap", "bpoet siiang thoo-ra-sap", "打开手机声音", "短语", "打电话", "หลังประชุมเสร็จ เขาเปิดเสียงโทรศัพท์", "lang bpra-chum set, khao bpoet siiang thoo-ra-sap", "会议结束后，他打开手机声音。", "phone"],
  ["นัดเจอกัน", "nat-jooe-gan", "nat jooe gan", "约见面", "短语", "约见", "พรุ่งนี้เรานัดเจอกันที่ร้านกาแฟ", "phrung-nii rao nat jooe gan thii raan gaa-faae", "明天我们约在咖啡店见面。", "appointment"],
  ["นัดกินข้าว", "nat-gin-khaao", "nat gin khaao", "约吃饭", "短语", "约见", "วันเสาร์นี้เพื่อนนัดกินข้าวตอนเย็น", "wan sao nii phuean nat gin khaao dtaawn yen", "这个星期六朋友约晚上吃饭。", "appointment"],
  ["นัดเวลาใหม่", "nat-wee-laa-mai", "nat wee-laa mai", "重新约时间", "短语", "约见", "ถ้าวันนี้ไม่สะดวก เรานัดเวลาใหม่ได้", "thaa wan-nii mai sa-duuak, rao nat wee-laa mai dai", "如果今天不方便，我们可以重新约时间。", "appointment"],
  ["มาตรงเวลา", "maa-dtrong-wee-laa", "maa dtrong wee-laa", "准时来", "短语", "约见", "ขอบคุณที่มาตรงเวลา", "khaawp-khun thii maa dtrong wee-laa", "谢谢你准时来。", "appointment"],
  ["มาช้านิดหน่อย", "maa-chaa-nit-naawy", "maa chaa nit naawy", "来晚一点", "短语", "约见", "รถติดมาก ฉันอาจมาช้านิดหน่อย", "rot dtit maak, chan aat maa chaa nit naawy", "堵车很厉害，我可能会晚到一点。", "appointment"],
  ["รอหน้าร้าน", "raaw-naa-raan", "raaw naa raan", "在店门口等", "短语", "约见", "ถ้ามาถึงก่อน ช่วยรอหน้าร้านนะ", "thaa maa theung gaawn, chuai raaw naa raan na", "如果先到，请在店门口等。", "appointment"],
  ["เจอกันพรุ่งนี้", "jooe-gan-phrung-nii", "jooe gan phrung-nii", "明天见", "短语", "约见", "วันนี้คุยกันพอแล้ว เจอกันพรุ่งนี้", "wan-nii khui gan phaaw laaeo, jooe gan phrung-nii", "今天聊得差不多了，明天见。", "appointment"],
  ["เจอกันที่สถานี", "jooe-gan-thii-sa-thaa-nii", "jooe gan thii sa-thaa-nii", "在车站见", "短语", "约见", "เราเจอกันที่สถานีตอนแปดโมงนะ", "rao jooe gan thii sa-thaa-nii dtaawn bpaaet moong na", "我们八点在车站见。", "appointment"],
  ["เปลี่ยนที่นัด", "bplian-thii-nat", "bplian thii nat", "更改见面地点", "短语", "约见", "ฝนตกหนัก เราขอเปลี่ยนที่นัดได้ไหม", "fon dtok nak, rao khaaw bplian thii nat dai mai", "雨下得很大，我们可以改见面地点吗？", "appointment"],
  ["ยกเลิกนัดคืนนี้", "yok-looek-nat-kheun-nii", "yok looek nat kheun-nii", "取消今晚的约定", "短语", "约见", "เขาป่วย จึงต้องยกเลิกนัดคืนนี้", "khao bpuai, jeung dtawng yok looek nat kheun-nii", "他病了，所以必须取消今晚的约定。", "appointment"],
  ["เลื่อนนัดไปก่อน", "leuuan-nat-bpai-gaawn", "leuuan nat bpai gaawn", "先把约定改期", "短语", "约见", "วันนี้งานเยอะ เราเลื่อนนัดไปก่อนได้ไหม", "wan-nii ngaan yoe, rao leuuan nat bpai gaawn dai mai", "今天事情多，我们可以先把约定改期吗？", "appointment"],
  ["ชวนไปกินข้าว", "chuan-bpai-gin-khaao", "chuan bpai gin khaao", "邀请去吃饭", "短语", "邀请", "พี่ชวนฉันไปกินข้าวหลังเลิกเรียน", "phii chuan chan bpai gin khaao lang loek riian", "哥哥/姐姐邀请我放学后去吃饭。", "invite"],
  ["ชวนไปดูหนัง", "chuan-bpai-duu-nang", "chuan bpai duu nang", "邀请去看电影", "短语", "邀请", "เพื่อนชวนไปดูหนังวันอาทิตย์", "phuean chuan bpai duu nang wan aa-thit", "朋友邀请星期天去看电影。", "invite"],
  ["ชวนมาเที่ยวบ้าน", "chuan-maa-thiao-baan", "chuan maa thiao baan", "邀请来家里玩", "短语", "邀请", "แม่ชวนเพื่อนบ้านมาเที่ยวบ้านตอนบ่าย", "maae chuan phuean-baan maa thiao baan dtaawn baai", "妈妈邀请邻居下午来家里玩。", "invite"],
  ["รับคำเชิญ", "rap-kham-choen", "rap kham choen", "接受邀请", "短语", "邀请", "ฉันรับคำเชิญของครูด้วยความยินดี", "chan rap kham choen khaawng khruu duai khwaam yin-dii", "我很乐意接受老师的邀请。", "invite"],
  ["ปฏิเสธอย่างสุภาพเมื่อไม่ว่าง", "bpa-dti-seet-yaang-su-phaap-muea-mai-waang", "bpa-dti-seet yaang su-phaap muea mai waang", "没空时礼貌地拒绝", "短语", "邀请", "ถ้าไปไม่ได้ ควรปฏิเสธอย่างสุภาพเมื่อไม่ว่าง", "thaa bpai mai dai, khuuan bpa-dti-seet yaang su-phaap muea mai waang", "如果不能去，没空时应该礼貌地拒绝。", "invite"],
  ["ไปด้วยกันไหม", "bpai-duai-gan-mai", "bpai duai gan mai", "一起去吗", "短语", "邀请", "เย็นนี้เราไปตลาดด้วยกันไหม", "yen nii rao bpai dta-laat duai gan mai", "今天傍晚我们一起去市场吗？", "invite"],
  ["ว่างไหมวันนี้", "waang-mai-wan-nii", "waang mai wan-nii", "今天有空吗", "短语", "约见", "ว่างไหมวันนี้ ฉันอยากคุยด้วย", "waang mai wan-nii, chan yaak khui duai", "今天有空吗？我想和你聊聊。", "appointment"],
  ["สะดวกไหม", "sa-duuak-mai", "sa-duuak mai", "方便吗", "短语", "礼貌互动", "พรุ่งนี้เช้าสะดวกไหม", "phrung-nii chaao sa-duuak mai", "明天早上方便吗？", "polite"],
  ["ไม่สะดวกวันนี้", "mai-sa-duuak-wan-nii", "mai sa-duuak wan-nii", "今天不方便", "短语", "礼貌互动", "ขอโทษ วันนี้ฉันไม่สะดวก", "khaaw-thoot, wan-nii chan mai sa-duuak", "抱歉，我今天不方便。", "polite"],
  ["ขอโทษที่มาช้า", "khaaw-thoot-thii-maa-chaa", "khaaw-thoot thii maa chaa", "抱歉来晚了", "短语", "道歉", "ขอโทษที่มาช้า รถติดมากจริง ๆ", "khaaw-thoot thii maa chaa, rot dtit maak jing jing", "抱歉来晚了，真的很堵车。", "sorry"],
  ["ขอโทษที่ลืม", "khaaw-thoot-thii-leum", "khaaw-thoot thii leum", "抱歉忘了", "短语", "道歉", "ขอโทษที่ลืมนัด คราวหน้าฉันจะจดไว้", "khaaw-thoot thii leum nat, khraao naa chan ja jot wai", "抱歉忘了约定，下次我会记下来。", "sorry"],
  ["ขอโทษจริง ๆ", "khaaw-thoot-jing-jing", "khaaw-thoot jing jing", "真的很抱歉", "短语", "道歉", "ฉันทำแก้วแตก ขอโทษจริง ๆ", "chan tham gaaeo dtaaek, khaaw-thoot jing jing", "我把杯子打碎了，真的很抱歉。", "sorry"],
  ["ไม่เป็นไรนะ", "mai-bpen-rai-na", "mai bpen rai na", "没关系啦", "短语", "礼貌互动", "ไม่เป็นไรนะ คราวหน้ามาให้ตรงเวลาก็พอ", "mai bpen rai na, khraao naa maa hai dtrong wee-laa gaw phaaw", "没关系啦，下次准时来就好。", "polite"],
  ["ไม่ต้องเกรงใจ", "mai-dtawng-greeng-jai", "mai dtawng greeng-jai", "不用客气；别不好意思", "短语", "礼貌互动", "ถ้าหิวก็กินได้เลย ไม่ต้องเกรงใจ", "thaa hiu gaw gin dai loei, mai dtawng greeng-jai", "如果饿了就吃，不用客气。", "polite"],
  ["ขอบคุณมากนะ", "khaawp-khun-maak-na", "khaawp-khun maak na", "非常谢谢你啊", "短语", "感谢", "ขอบคุณมากนะที่ช่วยถือของ", "khaawp-khun maak na thii chuai theu khaawng", "非常谢谢你帮忙拿东西。", "thanks"],
  ["ขอบคุณสำหรับอาหาร", "khaawp-khun-sam-rap-aa-haan", "khaawp-khun sam-rap aa-haan", "谢谢这顿饭", "短语", "感谢", "ขอบคุณสำหรับอาหาร มื้อนี้อร่อยมาก", "khaawp-khun sam-rap aa-haan, meu nii a-raawy maak", "谢谢这顿饭，这餐很好吃。", "thanks"],
  ["ขอบคุณที่ช่วย", "khaawp-khun-thii-chuai", "khaawp-khun thii chuai", "谢谢帮忙", "短语", "感谢", "ขอบคุณที่ช่วยฉันทำการบ้าน", "khaawp-khun thii chuai chan tham gaan-baan", "谢谢你帮我做作业。", "thanks"],
  ["ขอบคุณที่รอ", "khaawp-khun-thii-raaw", "khaawp-khun thii raaw", "谢谢等待", "短语", "感谢", "ขอบคุณที่รอ ฉันมาถึงแล้ว", "khaawp-khun thii raaw, chan maa theung laaeo", "谢谢你等我，我已经到了。", "thanks"],
  ["ด้วยความยินดี", "duai-khwaam-yin-dii", "duai khwaam yin-dii", "很乐意；不用谢", "短语", "感谢", "ถ้าต้องการความช่วยเหลือ ฉันช่วยด้วยความยินดี", "thaa dtawng-gaan khwaam chuai-leuua, chan chuai duai khwaam yin-dii", "如果需要帮助，我很乐意帮忙。", "thanks"],
  ["ยินดีช่วย", "yin-dii-chuai", "yin-dii chuai", "乐意帮忙", "短语", "感谢", "ถ้าคุณมีปัญหา ฉันยินดีช่วย", "thaa khun mii bpan-haa, chan yin-dii chuai", "如果你有问题，我乐意帮忙。", "thanks"],
  ["ยินดีที่ได้รู้จัก", "yin-dii-thii-dai-ruu-jak", "yin-dii thii dai ruu-jak", "很高兴认识你", "短语", "寒暄", "สวัสดีครับ ยินดีที่ได้รู้จัก", "sa-wat-dii khrap, yin-dii thii dai ruu-jak", "你好，很高兴认识你。", "greeting"],
  ["กล่าวสวัสดีตอนเช้า", "glaao-sa-wat-dii-dtaawn-chaao", "glaao sa-wat-dii dtaawn chaao", "说早上好", "短语", "寒暄", "ครูกล่าวสวัสดีตอนเช้ากับนักเรียน", "khruu glaao sa-wat-dii dtaawn chaao gap nak-riian", "老师向学生说早上好。", "greeting"],
  ["สวัสดีตอนเย็น", "sa-wat-dii-dtaawn-yen", "sa-wat-dii dtaawn yen", "晚上好；傍晚好", "短语", "寒暄", "สวัสดีตอนเย็น คุณกลับจากงานแล้วหรือยัง", "sa-wat-dii dtaawn yen, khun glap jaak ngaan laaeo reu yang", "晚上好，你下班回来了吗？", "greeting"],
  ["เป็นอย่างไรบ้าง", "bpen-yaang-rai-baang", "bpen yaang-rai baang", "怎么样；过得如何", "短语", "寒暄", "ไม่ได้เจอกันนาน เป็นอย่างไรบ้าง", "mai dai jooe gan naan, bpen yaang-rai baang", "好久不见，过得怎么样？", "greeting"],
  ["สบายดีไหม", "sa-baai-dii-mai", "sa-baai dii mai", "你好吗", "短语", "寒暄", "สวัสดีค่ะ คุณสบายดีไหม", "sa-wat-dii kha, khun sa-baai dii mai", "你好，你好吗？", "greeting"],
  ["สบายดี ขอบคุณ", "sa-baai-dii-khaawp-khun", "sa-baai dii, khaawp-khun", "我很好，谢谢", "短语", "寒暄", "ฉันสบายดี ขอบคุณ แล้วคุณล่ะ", "chan sa-baai dii, khaawp-khun, laaeo khun la", "我很好，谢谢。你呢？", "greeting"],
  ["ไม่ค่อยสบาย", "mai-khaawy-sa-baai", "mai khaawy sa-baai", "不太舒服", "形容词", "寒暄", "วันนี้ฉันไม่ค่อยสบาย ขอพักก่อนนะ", "wan-nii chan mai khaawy sa-baai, khaaw phak gaawn na", "今天我不太舒服，想先休息一下。", "greeting"],
  ["ช่วงนี้ยุ่งไหม", "chuuang-nii-yung-mai", "chuuang nii yung mai", "最近忙吗", "短语", "寒暄", "ช่วงนี้ยุ่งไหม เราไม่ค่อยได้คุยกัน", "chuuang nii yung mai, rao mai khaawy dai khui gan", "最近忙吗？我们不太常聊天。", "greeting"],
  ["ทำอะไรอยู่", "tham-a-rai-yuu", "tham a-rai yuu", "在做什么", "短语", "寒暄", "ตอนนี้ทำอะไรอยู่ ว่างคุยไหม", "dtaawn-nii tham a-rai yuu, waang khui mai", "现在在做什么？有空聊吗？", "greeting"],
  ["กินข้าวหรือยัง", "gin-khaao-reu-yang", "gin khaao reu yang", "吃饭了吗", "短语", "寒暄", "สวัสดี กินข้าวหรือยัง", "sa-wat-dii, gin khaao reu yang", "你好，吃饭了吗？", "greeting"],
  ["เดินทางปลอดภัยนะ", "doen-thaang-bplaawt-phai-na", "doen-thaang bplaawt-phai na", "一路平安", "短语", "礼貌互动", "กลับบ้านดี ๆ เดินทางปลอดภัยนะ", "glap baan dii dii, doen-thaang bplaawt-phai na", "好好回家，一路平安。", "polite"],
  ["ขอให้สนุก", "khaaw-hai-sa-nuk", "khaaw hai sa-nuk", "祝玩得开心", "短语", "礼貌互动", "ไปเที่ยวทะเลพรุ่งนี้ ขอให้สนุกนะ", "bpai thiao tha-lee phrung-nii, khaaw hai sa-nuk na", "明天去海边玩，祝你玩得开心。", "polite"],
  ["ขอให้หายไว ๆ", "khaaw-hai-haai-wai-wai", "khaaw hai haai wai wai", "祝早日康复", "短语", "礼貌互动", "ได้ยินว่าคุณป่วย ขอให้หายไว ๆ", "dai-yin waa khun bpuai, khaaw hai haai wai wai", "听说你病了，祝你早日康复。", "polite"],
  ["ขอรบกวนหน่อย", "khaaw-rop-guan-naawy", "khaaw rop-guan naawy", "打扰一下", "短语", "礼貌互动", "ขอรบกวนหน่อย ห้องน้ำอยู่ที่ไหน", "khaaw rop-guan naawy, haawng-naam yuu thii nai", "打扰一下，洗手间在哪里？", "polite"],
  ["ขอถามหน่อย", "khaaw-thaam-naawy", "khaaw thaam naawy", "请问一下", "短语", "礼貌互动", "ขอถามหน่อย รถไฟมาถึงกี่โมง", "khaaw thaam naawy, rot-fai maa theung gii moong", "请问一下，火车几点到？", "polite"],
  ["ขอพูดด้วยได้ไหม", "khaaw-phuut-duai-dai-mai", "khaaw phuut duai dai mai", "可以和你说话吗", "短语", "礼貌互动", "ฉันมีเรื่องสำคัญ ขอพูดด้วยได้ไหม", "chan mii rueang sam-khan, khaaw phuut duai dai mai", "我有重要的事，可以和你说话吗？", "polite"],
  ["ขอเวลาอีกนิด", "khaaw-wee-laa-iik-nit", "khaaw wee-laa iik nit", "请再给一点时间", "短语", "礼貌互动", "งานยังไม่เสร็จ ขอเวลาอีกนิดนะ", "ngaan yang mai set, khaaw wee-laa iik nit na", "事情还没完成，请再给一点时间。", "polite"],
  ["ช่วยบอกทางได้ไหม", "chuai-baawk-thaang-dai-mai", "chuai baawk thaang dai mai", "可以帮忙指路吗", "短语", "礼貌互动", "ขอโทษครับ ช่วยบอกทางได้ไหม", "khaaw-thoot khrap, chuai baawk thaang dai mai", "不好意思，可以帮忙指路吗？", "polite"],
  ["ช่วยเปิดประตูให้หน่อย", "chuai-bpoet-bpra-dtuu-hai-naawy", "chuai bpoet bpra-dtuu hai naawy", "请帮忙开门", "短语", "礼貌互动", "มือฉันไม่ว่าง ช่วยเปิดประตูให้หน่อย", "mue chan mai waang, chuai bpoet bpra-dtuu hai naawy", "我手上没空，请帮忙开门。", "polite"],
  ["ช่วยถือของให้หน่อย", "chuai-theu-khaawng-hai-naawy", "chuai theu khaawng hai naawy", "请帮忙拿东西", "短语", "礼貌互动", "ของหนักมาก ช่วยถือของให้หน่อยได้ไหม", "khaawng nak maak, chuai theu khaawng hai naawy dai mai", "东西很重，可以帮忙拿一下吗？", "polite"],
  ["ช่วยรอสักครู่", "chuai-raaw-sak-khruu", "chuai raaw sak khruu", "请稍等一会儿", "短语", "礼貌互动", "กรุณาช่วยรอสักครู่ คุณหมอกำลังมา", "ga-ru-naa chuai raaw sak khruu, khun maaw gam-lang maa", "请稍等一会儿，医生正在过来。", "polite"],
  ["กรุณาเข้าคิว", "ga-ru-naa-khao-khiu", "ga-ru-naa khao khiu", "请排队", "短语", "礼貌互动", "ที่ร้านนี้ทุกคนกรุณาเข้าคิว", "thii raan nii thuk khon ga-ru-naa khao khiu", "在这家店，每个人请排队。", "polite"],
  ["กรุณาพูดช้า ๆ อีกครั้ง", "ga-ru-naa-phuut-chaa-chaa-iik-khrang", "ga-ru-naa phuut chaa chaa iik khrang", "请再慢慢说一遍", "短语", "礼貌互动", "ฉันเพิ่งเรียนภาษาไทย กรุณาพูดช้า ๆ อีกครั้ง", "chan phoeng riian phaa-saa thai, ga-ru-naa phuut chaa chaa iik khrang", "我刚学泰语，请再慢慢说一遍。", "polite"],
  ["กรุณาเขียนให้ดู", "ga-ru-naa-khiian-hai-duu", "ga-ru-naa khiian hai duu", "请写给我看", "短语", "礼貌互动", "คำนี้ยาก กรุณาเขียนให้ดูได้ไหม", "kham nii yaak, ga-ru-naa khiian hai duu dai mai", "这个词难，可以请你写给我看吗？", "polite"],
  ["ฟังไม่ทัน", "fang-mai-than", "fang mai than", "没听跟上", "短语", "礼貌互动", "คุณพูดเร็วมาก ฉันฟังไม่ทัน", "khun phuut reo maak, chan fang mai than", "你说得很快，我没听跟上。", "polite"],
  ["ฟังเข้าใจแล้ว", "fang-khao-jai-laaeo", "fang khao-jai laaeo", "听懂了", "短语", "礼貌互动", "ครูอธิบายอีกครั้ง ฉันฟังเข้าใจแล้ว", "khruu a-thi-baai iik khrang, chan fang khao-jai laaeo", "老师又解释了一遍，我听懂了。", "polite"],
  ["พูดไม่ออก", "phuut-mai-aawk", "phuut mai aawk", "说不出来", "短语", "礼貌互动", "ฉันตื่นเต้นจนพูดไม่ออก", "chan dteun-dten jon phuut mai aawk", "我紧张到说不出来。", "polite"],
  ["พูดถูกไหม", "phuut-thuuk-mai", "phuut thuuk mai", "说得对吗", "短语", "礼貌互动", "ประโยคนี้ฉันพูดถูกไหม", "bpra-yook nii chan phuut thuuk mai", "这个句子我说得对吗？", "polite"],
  ["เข้าใจผิด", "khao-jai-phit", "khao-jai phit", "误会；理解错", "短语", "礼貌互动", "ขอโทษ ฉันเข้าใจผิดเรื่องเวลา", "khaaw-thoot, chan khao-jai phit rueang wee-laa", "抱歉，我把时间理解错了。", "polite"],
  ["อธิบายให้ฟัง", "a-thi-baai-hai-fang", "a-thi-baai hai fang", "解释给听", "短语", "礼貌互动", "ช่วยอธิบายให้ฟังอีกครั้งได้ไหม", "chuai a-thi-baai hai fang iik khrang dai mai", "可以请你再解释给我听一次吗？", "polite"],
  ["บอกล่วงหน้า", "baawk-luuang-naa", "baawk luuang-naa", "提前告知", "短语", "礼貌互动", "ถ้าจะมาช้า กรุณาบอกล่วงหน้า", "thaa ja maa chaa, ga-ru-naa baawk luuang-naa", "如果会晚到，请提前告知。", "polite"],
  ["แจ้งในกลุ่ม", "jaaeng-nai-glum", "jaaeng nai glum", "在群里通知", "短语", "发消息", "หัวหน้าห้องแจ้งในกลุ่มเรื่องเวลาเรียน", "hua-naa haawng jaaeng nai glum rueang wee-laa riian", "班长在群里通知上课时间。", "message"],
  ["ตอบตกลง", "dtaawp-dtok-long", "dtaawp dtok-long", "回复同意", "短语", "邀请", "ถ้าคุณไปได้ ช่วยตอบตกลงในแชต", "thaa khun bpai dai, chuai dtaawp dtok-long nai chaet", "如果你能去，请在聊天里回复同意。", "invite"],
  ["ตอบว่ายังไม่แน่ใจ", "dtaawp-waa-yang-mai-naae-jai", "dtaawp waa yang mai naae-jai", "回复说还不确定", "短语", "邀请", "เธอตอบว่ายังไม่แน่ใจ เพราะต้องถามแม่ก่อน", "thoe dtaawp waa yang mai naae-jai, phraw dtawng thaam maae gaawn", "她回复说还不确定，因为要先问妈妈。", "invite"],
  ["ส่งคำเชิญ", "song-kham-choen", "song kham choen", "发送邀请", "短语", "邀请", "ครูส่งคำเชิญไปในกลุ่มผู้ปกครอง", "khruu song kham choen bpai nai glum phuu-bpokkraawng", "老师把邀请发到家长群里。", "invite"],
  ["บอกข่าวดี", "baawk-khaao-dii", "baawk khaao dii", "告诉好消息", "短语", "寒暄", "ฉันโทรหาแม่เพื่อบอกข่าวดี", "chan thoo haa maae phuea baawk khaao dii", "我给妈妈打电话告诉好消息。", "social"],
  ["ถามสารทุกข์สุกดิบ", "thaam-saan-thuk-suk-dip", "thaam saan-thuk-suk-dip", "寒暄问候近况", "短语", "寒暄", "เมื่อเจอญาติ ผู้ใหญ่ชอบถามสารทุกข์สุกดิบ", "muea jooe yaat, phuu-yai chaawp thaam saan-thuk-suk-dip", "见到亲戚时，长辈喜欢寒暄问候近况。", "greeting"],
  ["คุยเล่นกัน", "khui-len-gan", "khui len gan", "一起闲聊", "短语", "寒暄", "หลังอาหารเย็น พวกเราคุยเล่นกันในบ้าน", "lang aa-haan yen, phuak-rao khui len gan nai baan", "晚饭后，我们在家里一起闲聊。", "social"],
  ["แนะนำตัวสั้น ๆ", "nae-nam-dtua-san-san", "nae-nam dtua san san", "简单自我介绍", "短语", "寒暄", "นักเรียนใหม่แนะนำตัวสั้น ๆ หน้าห้อง", "nak-riian mai nae-nam dtua san san naa haawng", "新同学在教室前简单自我介绍。", "greeting"],
  ["จำชื่อได้", "jam-cheu-dai", "jam cheu dai", "记得名字", "短语", "寒暄", "ฉันจำชื่อคุณได้ เพราะเราเคยเจอกัน", "chan jam cheu khun dai, phraw rao khooei jooe gan", "我记得你的名字，因为我们见过。", "social"],
  ["จำชื่อไม่ได้", "jam-cheu-mai-dai", "jam cheu mai dai", "不记得名字", "短语", "寒暄", "ขอโทษนะ ฉันจำชื่อคุณไม่ได้", "khaaw-thoot na, chan jam cheu khun mai dai", "不好意思，我不记得你的名字了。", "social"],
  ["เรียกชื่อเล่นของเพื่อน", "riiak-cheu-len-khaawng-phuean", "riiak cheu len khaawng phuean", "叫朋友的昵称", "短语", "寒暄", "ฉันเรียกชื่อเล่นของเพื่อนว่าแอน", "chan riiak cheu len khaawng phuean waa aaen", "我叫朋友的昵称安。", "social"],
  ["พูดสุภาพ", "phuut-su-phaap", "phuut su-phaap", "说话礼貌", "短语", "礼貌互动", "เวลาเจอผู้ใหญ่ ควรพูดสุภาพ", "wee-laa jooe phuu-yai, khuuan phuut su-phaap", "见到长辈时，应该说话礼貌。", "polite"],
  ["ตอบอย่างสุภาพ", "dtaawp-yaang-su-phaap", "dtaawp yaang su-phaap", "礼貌地回答", "短语", "礼貌互动", "แม้ไม่เห็นด้วย เราก็ควรตอบอย่างสุภาพ", "maae mai hen duai, rao gaw khuuan dtaawp yaang su-phaap", "即使不同意，我们也应该礼貌地回答。", "polite"],
  ["ขออนุญาตเข้าไป", "khaaw-a-nu-yaat-khao-bpai", "khaaw a-nu-yaat khao bpai", "请求允许进去", "短语", "礼貌互动", "ก่อนเข้าห้องครู นักเรียนขออนุญาตเข้าไป", "gaawn khao haawng khruu, nak-riian khaaw a-nu-yaat khao bpai", "进老师房间前，学生请求允许进去。", "polite"],
  ["ขออนุญาตถ่ายรูป", "khaaw-a-nu-yaat-thaai-ruup", "khaaw a-nu-yaat thaai ruup", "请求允许拍照", "短语", "礼貌互动", "ในร้านนี้ต้องขออนุญาตถ่ายรูปก่อน", "nai raan nii dtawng khaaw a-nu-yaat thaai ruup gaawn", "在这家店要先请求允许拍照。", "polite"],
  ["ขอเบอร์โทรได้ไหม", "khaaw-booe-thoo-dai-mai", "khaaw booe thoo dai mai", "可以要电话号码吗", "短语", "礼貌互动", "ถ้าต้องติดต่อกันอีก ขอเบอร์โทรได้ไหม", "thaa dtawng dtit-dtaaw gan iik, khaaw booe thoo dai mai", "如果还需要联系，可以要电话号码吗？", "polite"],
  ["แลกไลน์กันไหม", "laaek-lai-gan-mai", "laaek lai gan mai", "要互加 LINE 吗", "短语", "发消息", "เราต้องทำงานกลุ่ม แลกไลน์กันไหม", "rao dtawng tham-ngaan glum, laaek lai gan mai", "我们要做小组作业，要互加 LINE 吗？", "message"],
  ["ติดต่อได้ทางไหน", "dtit-dtaaw-dai-thaang-nai", "dtit-dtaaw dai thaang nai", "可以通过什么方式联系", "短语", "礼貌互动", "ถ้ามีคำถาม ติดต่อได้ทางไหน", "thaa mii kham-thaam, dtit-dtaaw dai thaang nai", "如果有问题，可以通过什么方式联系？", "polite"],
] as const satisfies readonly Row[];

const toCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const [thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = row;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "communication-social", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段先记完整社交句块，实际对话中可替换时间、地点、对象。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于打电话、发消息、约见、邀请、道歉、感谢和礼貌寒暄。"],
    tags,
    sourceRefs: COMMUNICATION_SOCIAL_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_COMMUNICATION_SOCIAL_01 = rows.map(toCandidate);
