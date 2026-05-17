const POLITE_REFS = ["thai-reference-polite-particles", "complete-thai-a1", "into-asia-grammar"];

export type VocabularyExpansionZhExample = {
  thai: string;
  roman: string;
  chinese: string;
};

export type VocabularyExpansionZhRelated = {
  thai: string;
  roman?: string;
  chinese: string;
  notesZh?: string;
};

export type VocabularyExpansionZhComparison = {
  kind: "近义" | "反义" | "易混" | "语域" | "用法";
  target: VocabularyExpansionZhRelated;
  distinctionZh: string;
};

export type VocabularyExpansionZhCollocation = {
  thai: string;
  roman: string;
  chinese: string;
  notesZh?: string;
};

export type VocabularyExpansionZhSense = {
  id: string;
  chinese: string;
  examples: VocabularyExpansionZhExample[];
  synonyms: VocabularyExpansionZhRelated[];
  antonyms: VocabularyExpansionZhRelated[];
  comparisons: VocabularyExpansionZhComparison[];
  collocations: VocabularyExpansionZhCollocation[];
  usageNotesZh: string[];
  tags: string[];
};

export type VocabularyExpansionCandidate = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: "助词" | "短语" | "疑问框架";
  theme: "语气" | "礼貌" | "疑问" | "回应";
  level: "a1" | "a2";
  priority: number;
  senses: VocabularyExpansionZhSense[];
  synonyms: VocabularyExpansionZhRelated[];
  antonyms: VocabularyExpansionZhRelated[];
  comparisons: VocabularyExpansionZhComparison[];
  collocations: VocabularyExpansionZhCollocation[];
  usageNotesZh: string[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: "candidate-draft";
};

type VocabularyExpansionRow = readonly [
  id: string,
  thai: string,
  roman: string,
  chinese: string,
  partOfSpeech: VocabularyExpansionCandidate["partOfSpeech"],
  theme: VocabularyExpansionCandidate["theme"],
  level: VocabularyExpansionCandidate["level"],
  priority: number,
  usageNotesZh: string,
];

const ROWS = [
  ["na-khrap", "นะครับ", "na khrap", "男性说话者的柔和礼貌句末组合", "助词", "礼貌", "a1", 3001, "用于提醒、建议或确认，比单独 ครับ 更带柔和协商感。"],
  ["na-kha", "นะคะ", "na kha", "女性说话者的柔和礼貌句末组合", "助词", "礼貌", "a1", 3002, "用于请求、提醒、说明；女性说话者常用，语气温和。"],
  ["na-ha", "นะฮะ", "na ha", "男性口语柔和礼貌句末组合", "助词", "礼貌", "a2", 3003, "比 นะครับ 更轻松，适合熟人或半正式口语。"],
  ["na-ja", "นะจ๊ะ", "na ja", "亲切疑问或提醒句末组合", "助词", "语气", "a2", 3004, "常见于亲近关系、长辈对晚辈；正式场合慎用。"],
  ["na-ja-low", "นะจ้ะ", "na ja", "亲切柔和陈述句末组合", "助词", "语气", "a2", 3005, "比 นะคะ 更亲近，常用于温柔说明或安抚。"],
  ["na-jaa", "นะจ้า", "na jaa", "拉长亲切语气的句末组合", "助词", "语气", "a2", 3006, "语气轻松亲切，常见于聊天或服务业非正式回复。"],
  ["na-naa", "นะน้า", "na naa", "撒娇式柔和请求句末组合", "助词", "语气", "a2", 3007, "带拉长音和撒娇感，只适合亲密或轻松语境。"],
  ["na-nia", "นะเนี่ย", "na nia", "带提示感的柔和句末组合", "助词", "语气", "a2", 3008, "用于提醒对方注意眼前情况，口语感强。"],
  ["na-si", "นะสิ", "na si", "表示赞同或确认的句末组合", "助词", "回应", "a2", 3009, "常用于回应对方，带“就是啊”的感觉。"],
  ["si-khrap", "สิครับ", "si khrap", "男性礼貌的推动或建议句末组合", "助词", "礼貌", "a2", 3010, "用于鼓励对方做某事；语气可能有推动感。"],
  ["si-kha", "สิคะ", "si kha", "女性礼貌的推动或建议句末组合", "助词", "礼貌", "a2", 3011, "用于温和催促、建议或提示；注意避免过强命令感。"],
  ["si-ha", "สิฮะ", "si ha", "男性口语推动句末组合", "助词", "语气", "a2", 3012, "比 สิครับ 更随意，常见于熟人对话。"],
  ["si-ja", "สิจ๊ะ", "si ja", "亲切推动或鼓励句末组合", "助词", "语气", "a2", 3013, "常用于亲近关系中鼓励对方回应或尝试。"],
  ["thoe-na", "เถอะนะ", "thoe na", "柔和劝请句末组合", "助词", "语气", "a2", 3014, "用于劝说、安抚或请求接受建议。"],
  ["thoe-khrap", "เถอะครับ", "thoe khrap", "男性礼貌劝请句末组合", "助词", "礼貌", "a2", 3015, "比直接命令柔和，适合劝对方做决定。"],
  ["thoe-kha", "เถอะค่ะ", "thoe kha", "女性礼貌劝请句末组合", "助词", "礼貌", "a2", 3016, "用于建议、劝慰或结束争论，语气较温和。"],
  ["thoe-ha", "เถอะฮะ", "thoe ha", "男性口语劝请句末组合", "助词", "语气", "a2", 3017, "口语轻松，正式场合可换成 เถอะครับ。"],
  ["naawy-na", "หน่อยนะ", "naawy na", "柔和请求句末组合", "助词", "语气", "a1", 3018, "把请求说得不生硬，常接在动词短语后。"],
  ["naawy-khrap", "หน่อยครับ", "naawy khrap", "男性礼貌请求句末组合", "助词", "礼貌", "a1", 3019, "用于请别人帮忙，常和 ช่วย 一起出现。"],
  ["naawy-kha", "หน่อยค่ะ", "naawy kha", "女性礼貌请求句末组合", "助词", "礼貌", "a1", 3020, "请求帮助或服务时很常用，语气礼貌自然。"],
  ["naawy-ha", "หน่อยฮะ", "naawy ha", "男性口语请求句末组合", "助词", "礼貌", "a2", 3021, "口语比 หน่อยครับ 轻，适合熟人或轻松服务场景。"],
  ["duai-na", "ด้วยนะ", "duai na", "柔和补充请求句末组合", "助词", "语气", "a1", 3022, "用于请对方顺便做某事，带“也请……”的感觉。"],
  ["duai-khrap", "ด้วยครับ", "duai khrap", "男性礼貌补充请求句末组合", "助词", "礼貌", "a1", 3023, "常用于服务、邮件、课堂请求，语气礼貌。"],
  ["duai-kha", "ด้วยค่ะ", "duai kha", "女性礼貌补充请求句末组合", "助词", "礼貌", "a1", 3024, "常用于请求别人一起做或顺便处理。"],
  ["duai-ha", "ด้วยฮะ", "duai ha", "男性口语补充请求句末组合", "助词", "礼貌", "a2", 3025, "比 ด้วยครับ 更口语，亲近场合自然。"],
  ["dai-mai-khrap", "ได้ไหมครับ", "dai mai khrap", "男性礼貌询问是否可以", "疑问框架", "疑问", "a1", 3026, "用于请求许可或请人帮忙，语气礼貌。"],
  ["dai-mai-kha", "ได้ไหมคะ", "dai mai kha", "女性礼貌询问是否可以", "疑问框架", "疑问", "a1", 3027, "用于礼貌请求、询问可能性或服务确认。"],
  ["dai-mai-ha", "ได้ไหมฮะ", "dai mai ha", "男性口语询问是否可以", "疑问框架", "疑问", "a2", 3028, "比 ได้ไหมครับ 更随意，适合轻松口语。"],
  ["dai-mai-colloquial", "ได้มั้ย", "dai mai", "口语询问是否可以", "疑问框架", "疑问", "a1", 3029, "มั้ย 是 ไหม 的口语写法，聊天中常见。"],
  ["dai-mai-khrap-colloquial", "ได้มั้ยครับ", "dai mai khrap", "男性礼貌口语询问是否可以", "疑问框架", "疑问", "a2", 3030, "结合口语写法 มั้ย 和礼貌词 ครับ。"],
  ["dai-mai-kha-colloquial", "ได้มั้ยคะ", "dai mai kha", "女性礼貌口语询问是否可以", "疑问框架", "疑问", "a2", 3031, "聊天或口语转写常见，正式写作可用 ได้ไหมคะ。"],
  ["dii-mai-khrap", "ดีไหมครับ", "dii mai khrap", "男性礼貌询问这样好不好", "疑问框架", "疑问", "a1", 3032, "用于提出建议后征求意见。"],
  ["dii-mai-kha", "ดีไหมคะ", "dii mai kha", "女性礼貌询问这样好不好", "疑问框架", "疑问", "a1", 3033, "常用于安排、选择、建议后的确认。"],
  ["dii-mai-colloquial", "ดีมั้ย", "dii mai", "口语询问好不好", "疑问框架", "疑问", "a1", 3034, "朋友间很常用，语气取决于上下文。"],
  ["dii-mai-khrap-colloquial", "ดีมั้ยครับ", "dii mai khrap", "男性礼貌口语询问好不好", "疑问框架", "疑问", "a2", 3035, "比 ดีไหมครับ 更口语，仍保持礼貌。"],
  ["dii-mai-kha-colloquial", "ดีมั้ยคะ", "dii mai kha", "女性礼貌口语询问好不好", "疑问框架", "疑问", "a2", 3036, "聊天中常见，正式文本可用 ดีไหมคะ。"],
  ["chai-mai-khrap", "ใช่ไหมครับ", "chai mai khrap", "男性礼貌确认是不是", "疑问框架", "疑问", "a1", 3037, "用于确认自己理解是否正确。"],
  ["chai-mai-kha", "ใช่ไหมคะ", "chai mai kha", "女性礼貌确认是不是", "疑问框架", "疑问", "a1", 3038, "适合课堂、服务和日常礼貌确认。"],
  ["chai-mai-colloquial", "ใช่มั้ย", "chai mai", "口语确认是不是", "疑问框架", "疑问", "a1", 3039, "朋友间或聊天中常用，书面可写 ใช่ไหม。"],
  ["chai-mai-khrap-colloquial", "ใช่มั้ยครับ", "chai mai khrap", "男性礼貌口语确认是不是", "疑问框架", "疑问", "a2", 3040, "带口语拼写但仍有礼貌收尾。"],
  ["chai-mai-kha-colloquial", "ใช่มั้ยคะ", "chai mai kha", "女性礼貌口语确认是不是", "疑问框架", "疑问", "a2", 3041, "用于轻松语境中确认信息。"],
  ["rue-bplaao-khrap", "หรือเปล่าครับ", "rue bplaao khrap", "男性礼貌询问是否如此", "疑问框架", "疑问", "a1", 3042, "比 ใช่ไหม 更开放，可问是否发生、是否有某情况。"],
  ["rue-bplaao-kha", "หรือเปล่าคะ", "rue bplaao kha", "女性礼貌询问是否如此", "疑问框架", "疑问", "a1", 3043, "常用于服务、课堂、确认信息。"],
  ["rue-bplaao-short", "รึเปล่า", "rue bplaao", "口语询问是不是、有没有", "疑问框架", "疑问", "a2", 3044, "หรือ มัก缩成 รึ，口语感强。"],
  ["rue-bplaao-short-khrap", "รึเปล่าครับ", "rue bplaao khrap", "男性礼貌口语询问是不是", "疑问框架", "疑问", "a2", 3045, "口语缩略加 ครับ，适合轻松礼貌对话。"],
  ["rue-bplaao-short-kha", "รึเปล่าคะ", "rue bplaao kha", "女性礼貌口语询问是不是", "疑问框架", "疑问", "a2", 3046, "口语缩略加 คะ，常见于聊天和口语转写。"],
  ["roe", "เหรอ", "roe", "表示惊讶或确认的口语疑问词", "助词", "疑问", "a1", 3047, "常用于听到新信息后确认，语调很重要。"],
  ["roe-khrap", "เหรอครับ", "roe khrap", "男性礼貌惊讶确认", "疑问框架", "疑问", "a1", 3048, "比单独 เหรอ 更礼貌，适合回应老师或陌生人。"],
  ["roe-kha", "เหรอคะ", "roe kha", "女性礼貌惊讶确认", "疑问框架", "疑问", "a1", 3049, "用于礼貌表示“是吗？真的吗？”。"],
  ["ro-colloquial", "หรอ", "ro", "เหรอ 的口语拼写", "助词", "疑问", "a2", 3050, "聊天中常见，正式写作建议用 เหรอ。"],
  ["ro-khrap", "หรอครับ", "ro khrap", "男性礼貌口语确认", "疑问框架", "疑问", "a2", 3051, "口语拼写，表达“是吗？”。"],
  ["ro-kha", "หรอคะ", "ro kha", "女性礼貌口语确认", "疑问框架", "疑问", "a2", 3052, "口语聊天中常见，注意正式文本写法。"],
  ["jing-roe", "จริงเหรอ", "jing roe", "真的吗；表示惊讶确认", "短语", "回应", "a1", 3053, "用于听到意外消息后确认，语气可惊讶也可怀疑。"],
  ["jing-ro", "จริงหรอ", "jing ro", "真的吗的口语拼写", "短语", "回应", "a2", 3054, "聊天中常见，正式写作可用 จริงเหรอ。"],
  ["jing-mai", "จริงไหม", "jing mai", "是不是真的；对不对", "疑问框架", "疑问", "a1", 3055, "用于确认事实或询问对方是否同意。"],
  ["jing-mai-colloquial", "จริงมั้ย", "jing mai", "是不是真的的口语拼写", "疑问框架", "疑问", "a2", 3056, "口语和聊天常用，正式可写 จริงไหม。"],
  ["nan-si", "นั่นสิ", "nan si", "就是啊；表示同意或想到一点", "短语", "回应", "a2", 3057, "回应别人时表示赞同、恍然或一起思考。"],
  ["nan-si-khrap", "นั่นสิครับ", "nan si khrap", "男性礼貌表示就是啊", "短语", "回应", "a2", 3058, "在同意对方时加 ครับ 更礼貌。"],
  ["nan-si-kha", "นั่นสิคะ", "nan si kha", "女性礼貌表示就是啊", "短语", "回应", "a2", 3059, "女性说话者常用于礼貌回应和赞同。"],
  ["nan-lae-khrap", "นั่นแหละครับ", "nan lae khrap", "男性礼貌强调就是那个", "短语", "回应", "a2", 3060, "用于确认对方说的正是自己指的内容。"],
  ["nan-lae-kha", "นั่นแหละค่ะ", "nan lae kha", "女性礼貌强调就是那个", "短语", "回应", "a2", 3061, "可用于确认、总结或轻微强调。"],
  ["nii-lae-khrap", "นี่แหละครับ", "nii lae khrap", "男性礼貌强调就是这个", "短语", "回应", "a2", 3062, "用于指眼前内容并确认“就是这个”。"],
  ["nii-lae-kha", "นี่แหละค่ะ", "nii lae kha", "女性礼貌强调就是这个", "短语", "回应", "a2", 3063, "用于展示、确认或解释眼前事物。"],
  ["thao-nan-lae-khrap", "เท่านั้นแหละครับ", "thao-nan lae khrap", "男性礼貌表示就只是这样", "短语", "回应", "a2", 3064, "用于结束说明，强调没有更多内容。"],
  ["thao-nan-lae-kha", "เท่านั้นแหละค่ะ", "thao-nan lae kha", "女性礼貌表示就只是这样", "短语", "回应", "a2", 3065, "常用来收束解释或降低事情严重性。"],
  ["khae-nan-lae-khrap", "แค่นั้นแหละครับ", "khae-nan lae khrap", "男性礼貌表示就这么多", "短语", "回应", "a2", 3066, "用于说明事情简单或范围有限。"],
  ["khae-nan-lae-kha", "แค่นั้นแหละค่ะ", "khae-nan lae kha", "女性礼貌表示就这么多", "短语", "回应", "a2", 3067, "用于轻松收尾，表示没有别的。"],
  ["gaw-laaeo-gan", "ก็แล้วกัน", "gaw laaeo gan", "那就这样吧；折中决定", "短语", "回应", "a2", 3068, "用于做出临时决定或接受折中方案。"],
  ["laaeo-gan-na", "แล้วกันนะ", "laaeo gan na", "就这样吧的柔和说法", "短语", "语气", "a2", 3069, "比 ก็แล้วกัน 更柔和，常用于安排。"],
  ["laaeo-gan-khrap", "แล้วกันครับ", "laaeo gan khrap", "男性礼貌表示那就这样", "短语", "礼貌", "a2", 3070, "用于礼貌确认决定或安排。"],
  ["laaeo-gan-kha", "แล้วกันค่ะ", "laaeo gan kha", "女性礼貌表示那就这样", "短语", "礼貌", "a2", 3071, "用于收束讨论、确认方案。"],
  ["la-gan", "ละกัน", "la gan", "那就这样吧的口语缩略", "短语", "语气", "a2", 3072, "แล้วกัน 的口语缩略，聊天中常见。"],
  ["la-gan-na", "ละกันนะ", "la gan na", "柔和口语表示那就这样吧", "短语", "语气", "a2", 3073, "口语缩略加 นะ，语气更软。"],
  ["la-gan-khrap", "ละกันครับ", "la gan khrap", "男性礼貌口语表示那就这样", "短语", "礼貌", "a2", 3074, "口语缩略但加 ครับ，适合轻松礼貌场景。"],
  ["la-gan-kha", "ละกันค่ะ", "la gan kha", "女性礼貌口语表示那就这样", "短语", "礼貌", "a2", 3075, "常用于聊天或轻松安排。"],
  ["gaw-dai-na", "ก็ได้นะ", "gaw dai na", "也可以呀；柔和接受", "短语", "回应", "a1", 3076, "用于接受对方提议，但语气可能有一点让步。"],
  ["gaw-dai-khrap", "ก็ได้ครับ", "gaw dai khrap", "男性礼貌表示也可以", "短语", "礼貌", "a1", 3077, "礼貌接受选择或安排。"],
  ["gaw-dai-kha", "ก็ได้ค่ะ", "gaw dai kha", "女性礼貌表示也可以", "短语", "礼貌", "a1", 3078, "用于接受、让步或同意替代方案。"],
  ["dai-loei-khrap", "ได้เลยครับ", "dai loei khrap", "男性礼貌表示当然可以", "短语", "回应", "a1", 3079, "服务和日常回应中很常见，语气积极。"],
  ["dai-loei-kha", "ได้เลยค่ะ", "dai loei kha", "女性礼貌表示当然可以", "短语", "回应", "a1", 3080, "用于爽快答应请求或确认服务。"],
  ["oo-khee-na", "โอเคนะ", "oo-khee na", "柔和确认可以吧", "短语", "回应", "a2", 3081, "用于确认对方是否接受安排，语气轻松。"],
  ["oo-khee-khrap", "โอเคครับ", "oo-khee khrap", "男性礼貌表示好的", "短语", "回应", "a1", 3082, "用于确认听懂、同意或接受安排。"],
  ["oo-khee-kha", "โอเคค่ะ", "oo-khee kha", "女性礼貌表示好的", "短语", "回应", "a1", 3083, "常用于课堂、服务和聊天确认。"],
  ["ao-na", "เอานะ", "ao na", "那就要这个吧的柔和说法", "短语", "回应", "a2", 3084, "用于轻松决定或劝对方接受。"],
  ["ao-khrap", "เอาครับ", "ao khrap", "男性礼貌表示要这个", "短语", "回应", "a1", 3085, "点餐、购物、选择时用于礼貌确认。"],
  ["ao-kha", "เอาค่ะ", "ao kha", "女性礼貌表示要这个", "短语", "回应", "a1", 3086, "点餐或购物时常用，比直接 เอา 礼貌。"],
  ["phaaw-laaeo-na", "พอแล้วนะ", "phaaw laaeo na", "够了哦；柔和停止", "短语", "语气", "a2", 3087, "用于提醒停止或表示数量已经足够。"],
  ["phaaw-laaeo-khrap", "พอแล้วครับ", "phaaw laaeo khrap", "男性礼貌表示够了", "短语", "礼貌", "a1", 3088, "用于购物、用餐、服务场景中礼貌表示足够。"],
  ["phaaw-laaeo-kha", "พอแล้วค่ะ", "phaaw laaeo kha", "女性礼貌表示够了", "短语", "礼貌", "a1", 3089, "用于拒绝继续添加或表示已经可以。"],
  ["thao-nii-na", "เท่านี้นะ", "thao-nii na", "就这些哦；柔和收尾", "短语", "语气", "a2", 3090, "用于结束说明、订单或安排。"],
  ["thao-nii-khrap", "เท่านี้ครับ", "thao-nii khrap", "男性礼貌表示就这些", "短语", "礼貌", "a1", 3091, "点餐、购物、汇报时常用来收尾。"],
  ["thao-nii-kha", "เท่านี้ค่ะ", "thao-nii kha", "女性礼貌表示就这些", "短语", "礼貌", "a1", 3092, "用于礼貌结束选择或说明。"],
  ["thao-nii-gaawn-na", "เท่านี้ก่อนนะ", "thao-nii gaawn na", "先到这里哦", "短语", "语气", "a2", 3093, "用于暂时结束，暗示之后可能继续。"],
  ["thao-nii-gaawn-khrap", "เท่านี้ก่อนครับ", "thao-nii gaawn khrap", "男性礼貌表示先到这里", "短语", "礼貌", "a2", 3094, "课堂、会议或服务中礼貌暂时收尾。"],
  ["thao-nii-gaawn-kha", "เท่านี้ก่อนค่ะ", "thao-nii gaawn kha", "女性礼貌表示先到这里", "短语", "礼貌", "a2", 3095, "用于暂时结束说明或订单。"],
  ["gaawn-na", "ก่อนนะ", "gaawn na", "先……哦；柔和暂别", "助词", "语气", "a1", 3096, "接在动词后表示先做某事，语气较柔和。"],
  ["gaawn-khrap", "ก่อนครับ", "gaawn khrap", "男性礼貌表示先……", "助词", "礼貌", "a1", 3097, "常用于告辞、暂时离开或先做某事。"],
  ["gaawn-kha", "ก่อนค่ะ", "gaawn kha", "女性礼貌表示先……", "助词", "礼貌", "a1", 3098, "与动词连用，礼貌表达“先……”。"],
  ["gaawn-dii-gwaa", "ก่อนดีกว่า", "gaawn dii gwaa", "还是先……比较好", "短语", "语气", "a2", 3099, "用于提出更合适的先后顺序或选择。"],
  ["dii-gwaa-na", "ดีกว่านะ", "dii gwaa na", "这样比较好哦", "短语", "语气", "a2", 3100, "用于柔和建议，避免直接命令。"],
] satisfies VocabularyExpansionRow[];

const makeExample = ([, thai, roman, , partOfSpeech]: VocabularyExpansionRow): VocabularyExpansionZhExample => {
  if (partOfSpeech === "短语") {
    return {
      thai: `เมื่อคุยกับคนไทยอย่างสุภาพ ผู้เรียนตอบว่า “${thai}” แล้วอธิบายเหตุผลต่ออีกนิด`,
      roman: `muea khui gap khon thai yaang su-phaap phuu-riian dtaawp waa "${roman}" laaeo a-thi-baai heet-phon dtaaw iik nit`,
      chinese: `和泰国人礼貌交谈时，学习者回答“${thai}”，然后再简短说明原因。`,
    };
  }

  return {
    thai: `เมื่อขอความช่วยเหลือ ผู้เรียนพูดว่า “ช่วยดูประโยคนี้ให้หน่อย${thai}” เพื่อให้ฟังนุ่มขึ้น`,
    roman: `muea khaaw khwaam-chuai-luea phuu-riian phuut waa "chuai duu bpra-yook nii hai naawy ${roman}" phuea hai fang num kheun`,
    chinese: `请求帮忙时，学习者说“请帮我看一下这个句子${thai}”，让语气听起来更柔和。`,
  };
};

const buildCandidate = (row: VocabularyExpansionRow): VocabularyExpansionCandidate => {
  const [id, thai, roman, chinese, partOfSpeech, theme, level, priority, usageNote] = row;
  const comparisons: VocabularyExpansionZhComparison[] = [
    {
      kind: "用法",
      target: { thai: "นะ", roman: "na", chinese: "基础柔和句末词" },
      distinctionZh: "本条是更具体的礼貌或口语组合；学习时要同时注意说话者身份、亲疏关系和正式程度。",
    },
  ];
  const collocations: VocabularyExpansionZhCollocation[] = [
    {
      thai,
      roman,
      chinese,
      notesZh: "作为一个整体语气块记忆，不要逐字硬译。",
    },
  ];

  return {
    id,
    thai,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level,
    priority,
    senses: [
      {
        id: "core",
        chinese,
        examples: [makeExample(row)],
        synonyms: [],
        antonyms: [],
        comparisons,
        collocations,
        usageNotesZh: [usageNote],
        tags: [theme, partOfSpeech, "句末语气"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons,
    collocations,
    usageNotesZh: [usageNote],
    tags: [theme, partOfSpeech, level, "candidate"],
    sourceRefs: POLITE_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_CONNECTORS_PARTICLES_03 = ROWS.map(buildCandidate) satisfies VocabularyExpansionCandidate[];
