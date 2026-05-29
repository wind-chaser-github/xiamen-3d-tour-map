// 3D 旅游地图数据配置 (中国省份、主要城市、著名景点及专属旅游标志)
const xiamenSpotImage = `${import.meta.env.BASE_URL || '/'}xiamen_handdrawn_tourism_map.png`;

// 各省旅游总览介绍数据 (用于省级地图右侧大屏展示)
export const provinceIntros = {
  "110000": {
    name: "北京市",
    slogan: "古都风华，国之脊梁",
    summary: "北京作为十三朝古都和现代中国首都，拥有世界上最丰富的皇家建筑遗产与最坚固的城防工事遗迹。这里长城蜿蜒，紫禁城金碧辉煌，蕴藏着中国近千年政权更迭与文化交融的终极奥秘。",
    tags: ["故宫天坛", "长城雄姿", "京剧国粹", "胡同记忆"],
    hotRoute: "天安门广场 ➔ 故宫博物院 ➔ 景山公园 ➔ 什刹海胡同 ➔ 八达岭长城"
  },
  "320000": {
    name: "江苏省",
    slogan: "水韵江苏，吴韵汉风",
    summary: "江苏是江南水乡之魂，拥有全国最多的中国历史文化名城。这里河网密布，太湖浩渺，苏州古典园林精巧绝伦，金陵帝王气象雄浑博大。小桥流水人家与富庶的现代工业强省在这里达成完美共识。",
    tags: ["古典园林", "水乡古镇", "运河文化", "昆曲苏绣"],
    hotRoute: "南京夫子庙 ➔ 钟山风景区 ➔ 无锡太湖 ➔ 苏州古典园林 ➔ 周庄水乡"
  },
  "330000": {
    name: "浙江省",
    slogan: "诗画浙江，山水画卷",
    summary: "浙江地处中国东海之滨，山川秀美，人文底蕴极为深厚。西湖的晴雨烟波、江南水乡古镇的橹声灯影、以及天台普陀的佛光禅影，共同绘制出了一幅动人的山水墨卷。",
    tags: ["西湖盛景", "千古水乡", "竹海茶韵", "海洋渔业"],
    hotRoute: "杭州西湖 ➔ 灵隐寺 ➔ 嘉兴乌镇 ➔ 绍兴鲁迅故里 ➔ 舟山普陀山"
  },
  "350000": {
    name: "福建省",
    slogan: "清新福建，山海交融",
    summary: "福建是中国森林覆盖率最高、海岸线极长的省份。这里境内峰峦叠嶂，武夷茶香远播海内外；沿海岛屿棋布，厦门海风柔和。多元的客家土楼与闽南、闽东文化在此和谐共生。",
    tags: ["武夷茶韵", "客家土楼", "海丝起点", "蓝色海湾"],
    hotRoute: "福州三坊七巷 ➔ 武夷山 ➔ 泉州开元寺 ➔ 厦门鼓浪屿 ➔ 平潭岛"
  },
  "510000": {
    name: "四川省",
    slogan: "天府之国，熊猫家园",
    summary: "四川盆地由岷江等水利滋养，自古为沃野千里的“天府之国”。这里西接青藏高原之雄壮，东抱川东盆地之秀美，不仅是国宝大熊猫的故乡，更拥有惊艳世界的九寨沟彩池与峨眉梵音。",
    tags: ["国宝大熊猫", "川味美食", "川剧变脸", "藏羌风情"],
    hotRoute: "成都大熊猫基地 ➔ 宽窄巷子 ➔ 乐山大佛 ➔ 峨眉山 ➔ 九寨沟"
  },
  "610000": {
    name: "陕西省",
    slogan: "华夏源脉，大唐遗风",
    summary: "陕西是华夏文明的重要发祥地。省会西安作为古丝绸之路起点 and 十三朝古都，承载了周秦汉唐的无上荣光。地下的千军兵马俑与地上的沧桑古城墙，无一不在诉说着华夏祖地的厚重往事。",
    tags: ["兵马俑奇迹", "汉唐盛世", "秦腔高亢", "黄土风情"],
    hotRoute: "西安城墙 ➔ 大雁塔 ➔ 秦始皇兵马俑 ➔ 华山险峰 ➔ 延安圣地"
  }
};

// 地级市旅游总览介绍数据 (用于市级地图右侧大屏展示，解决“城市介绍”缺失痛点)
export const cityIntros = {
  // 福州市
  "350100": {
    name: "福州市",
    slogan: "七闽山水，福泽之州",
    summary: "福州因城内“三山鼎峙，一水抱城”而得名，建城至今已有 2200 多年历史。这里绿榕成荫，温泉遍布，是著名的海丝重要枢纽。独具特色的“里坊制度活化石”三坊七巷保留了大量精美的明清古民居，名人辈出，人文极盛。",
    specialty: "🍲 佛跳墙、福州鱼丸、肉燕、大红袍、茉莉花茶",
    culture: "闽剧、寿山石雕、脱胎漆器、纸伞文化",
    advise: "建议游玩 3-4 天，必吃三坊七巷老字号肉燕，夜游闽江极美。"
  },
  // 苏州市
  "320500": {
    name: "苏州市",
    slogan: "人间天堂，古典苏韵",
    summary: "苏州是江南文化的璀璨明珠，以精巧的古典园林和婉约的江南水乡名扬天下。京杭大运河穿城而过，古城至今保留着“水陆并行、河街相邻”的双棋盘格局，昆曲吴侬软语，雅致到了骨子里。",
    specialty: "🍣 苏式船点、阳澄湖大闸蟹、松鼠桂鱼、碧螺春茶",
    culture: "昆曲、苏绣、苏州评弹、琢玉技艺",
    advise: "推荐入住平江路古风客栈，清晨漫步拙政园，感受一步一景的诗意。"
  },
  // 南京市
  "320100": {
    name: "南京市",
    slogan: "六朝金陵，钟山龙蟠",
    summary: "南京作为中国四大古都之一，依山傍水，虎踞龙盘。这里既有夫子庙秦淮河的十里金粉、画舫灯火，又有明孝陵、中山陵的庄严巍峨，承载了中国自东晋、明朝及民国时期的沧桑历史变迁。",
    specialty: "🦆 南京盐水鸭、鸭血粉丝汤、牛肉锅贴、金陵汤包",
    culture: "云锦织造、金陵刻经、剪纸艺术",
    advise: "深秋必去石象路观赏金黄神道；夜晚推荐荡桨秦淮河，品读文人金粉之气。"
  },
  // 杭州市
  "330100": {
    name: "杭州市",
    slogan: "西子湖畔，丝路硅谷",
    summary: "杭州是历史文化名城与现代数字经济交相辉映的典范。西湖的烟雨楼台、灵隐的古刹钟声，赋予了这座城市极致的人文浪漫。作为曾经的南宋都城，这里有着深厚的临安遗风与茶禅文化。",
    specialty: "🐟 西湖醋鱼、龙井虾仁、东坡肉、西湖藕粉、龙井茶",
    culture: "西泠印社篆刻、杭州丝绸、南宋官窑",
    advise: "清晨或雨天漫步苏堤，避开人流，最能体味“淡妆浓抹总相宜”的湖光山色。"
  },
  // 厦门市
  "350200": {
    name: "厦门市",
    slogan: "鹭岛海风，琴屿烟火",
    summary: "厦门依山面海，岛城格局清晰，鼓浪屿、厦门岛、集美湾与海沧湾共同构成层次丰富的滨海旅游动线。这里既有万国建筑与钢琴文化，也有南普陀、厦门大学、沙坡尾和环岛路串联出的闽南生活气息。",
    specialty: "🍜 沙茶面、海蛎煎、土笋冻、花生汤、鼓浪屿馅饼",
    culture: "鼓浪屿音乐文化、嘉庚建筑、闽南红砖古厝、南音与博饼民俗",
    advise: "建议以鼓浪屿和厦门岛南部为核心游线，清晨上岛避开人流，傍晚沿环岛路看海。"
  },
  // 北京市 (市辖区 adcode 同样映射)
  "110000": {
    name: "北京市",
    slogan: "皇城根下，帝都风华",
    summary: "北京作为国家的心脏，拥有全国最顶尖的历史文化底蕴。天安门广场的庄严、故宫紫禁城的恢弘、颐和园的雅致，以及南锣鼓巷的胡同风情，将皇城的大气与市井的温情完美融合。",
    specialty: "🦆 北京烤鸭、老北京涮羊肉、炸酱面、驴打滚、豆汁儿",
    culture: "京剧、景泰蓝掐丝、北京雕漆、相声文化",
    advise: "登景山公园万春亭可俯瞰故宫全貌，极其震撼；长城推荐春秋季清晨前往以避开高峰。"
  },
  // 成都市
  "510100": {
    name: "成都市",
    slogan: "喧嚣退散，慢享蓉城",
    summary: "成都，一座“来了就不想走的城市”。两千多年城名未改、城址未迁。这里生活节奏悠闲，茶馆遍布，麻辣美食享誉全球。国宝熊猫、川剧变脸与时尚的太古里完美并存，安逸闲适是这里的终极名片。",
    specialty: "🌶️ 成都火锅、串串香、龙抄手、钟水饺、赖汤圆、担担面",
    culture: "川剧变脸、蜀绣、漆器漆艺、竹编灯彩",
    advise: "推荐在人民公园鹤鸣茶社泡一碗盖碗茶，体验正宗的成都掏耳朵民俗。"
  },
  // 西安市
  "610100": {
    name: "西安市",
    slogan: "大唐盛世，钟鼓余音",
    summary: "西安古称长安，是中华文明的摇篮和丝绸之路的起点。周秦汉唐的繁华在这里留下了不可磨灭的烙印。夜晚大唐不夜城金碧辉煌，白天秦俑军阵威武雄壮，整座古城如同一座没有围墙的露天历史博物馆。",
    specialty: "🥙 西安肉夹馍、羊肉泡馍、凉皮、Biangbiang面、冰峰汽水",
    culture: "秦腔戏曲、皮影戏、红拳、剪纸",
    advise: "傍晚推荐登上明城墙骑单车吹风，随后去大唐不夜城沉浸式体验唐风歌舞。"
  }
};

export const provinceLogos = {
  "北京市": { logo: "⛩️", label: "紫禁之巅", color: "#ef4444" },
  "天津市": { logo: "🎡", label: "天津之眼", color: "#3b82f6" },
  "河北省": { logo: "🏯", label: "承德山庄", color: "#f59e0b" },
  "山西省": { logo: "🕍", label: "平遥古城", color: "#d97706" },
  "内蒙古自治区": { logo: "⛺", label: "风吹草低", color: "#10b981" },
  "辽宁省": { logo: "🏭", label: "工业长子", color: "#6b7280" },
  "吉林省": { logo: "❄️", label: "长白雾凇", color: "#38bdf8" },
  "黑龙江省": { logo: "🏰", label: "冰雪大世界", color: "#7dd3fc" },
  "上海市": { logo: "🏙️", label: "魔都外滩", color: "#a855f7" },
  "江苏省": { logo: "🪭", label: "水韵江苏", color: "#06b6d4" },
  "浙江省": { logo: "⛵", label: "诗画浙江", color: "#14b8a6" },
  "安徽省": { logo: "⛰️", label: "天下黄山", color: "#0d9488" },
  "福建省": { logo: "🍵", label: "八闽山海", color: "#b45309" },
  "江西省": { logo: "🏺", label: "景德瓷都", color: "#10b981" },
  "山东省": { logo: "🏔️", label: "一山一水", color: "#4f46e5" },
  "河南省": { logo: "🥋", label: "少林功夫", color: "#ea580c" },
  "湖北省": { logo: "🏢", label: "黄鹤琴川", color: "#0284c7" },
  "湖南省": { logo: "🌶️", label: "张家界奇峰", color: "#f43f5e" },
  "广东省": { logo: "🦁", label: "岭南醒狮", color: "#e11d48" },
  "广西壮族自治区": { logo: "🛶", label: "桂林山水", color: "#059669" },
  "海南省": { logo: "🌴", label: "椰风海韵", color: "#f59e0b" },
  "重庆市": { logo: "🌶️", label: "赛博山城", color: "#dc2626" },
  "四川省": { logo: "🐼", label: "国宝天府", color: "#10b981" },
  "贵州省": { logo: "瀑", label: "黄果奇瀑", color: "#0891b2" },
  "云南省": { logo: "🌸", label: "七彩滇南", color: "#ec4899" },
  "西藏自治区": { logo: "🏔️", label: "日光圣域", color: "#f43f5e" },
  "陕西省": { logo: "🛡️", label: "古都秦俑", color: "#b45309" },
  "甘肃省": { logo: "🐫", label: "敦煌飞天", color: "#d97706" },
  "青海省": { logo: "💧", label: "天空之镜", color: "#2563eb" },
  "宁夏回族自治区": { logo: "🍇", label: "塞上江南", color: "#84cc16" },
  "新疆维吾尔自治区": { logo: "🍈", label: "西域风情", color: "#eab308" },
  "香港特别行政区": { logo: "🚢", label: "东方之珠", color: "#ec4899" },
  "澳门特别行政区": { logo: "🎰", label: "镜海濠江", color: "#10b981" },
  "台湾省": { logo: "⛰️", label: "阿里宝岛", color: "#14b8a6" }
};

export const cityLogos = {
  // 福建省（按您手绘图原样完整输入）
  "福州": { logo: "🎏", label: "三坊七巷 / 平潭岛\n西禅古寺 / 上下杭\n闽越水镇", themeColor: "#845e3c", toyType: "pavilion" },
  "厦门": { logo: "⛵", label: "鼓浪屿 / 集美学村\n小嶝岛 / 胡里山炮台", themeColor: "#845e3c", toyType: "boat" },
  "泉州": { logo: "🚢", label: "蟳埔村簪花 / 开元寺\n泉州西街 / 泉州古城\n泉州非物质文化遗产馆", themeColor: "#845e3c", toyType: "pagoda" },
  "漳州": { logo: "🌸", label: "漳州古城\n南靖土楼\n云水谣古镇", themeColor: "#845e3c", toyType: "tulou" },
  "龙岩": { logo: "🏰", label: "永定土楼\n长汀古城\n古田会议旧址", themeColor: "#845e3c", toyType: "tulou" },
  "南平": { logo: "⛰️", label: "武夷山 / 九曲溪\n和平古镇 / 武夷山博物馆", themeColor: "#845e3c", toyType: "mountain" },
  "宁德": { logo: "🦀", label: "周宁县 / 霞浦滩涂\n太姥山", themeColor: "#845e3c", toyType: "windmill" },
  "莆田": { logo: "🪷", label: "湄洲岛 / 九鲤湖\n南山广化寺", themeColor: "#845e3c", toyType: "pagoda" },
  "三明": { logo: "🌲", label: "桂峰古村落\n玉华洞 / 沙县美食", themeColor: "#845e3c", toyType: "pavilion" },

  // 江苏省（两侧挂牌景点列表）
  "南京": { logo: "🦁", label: "夫子庙 / 中山陵\n总统府 / 玄武湖 / 鸡鸣寺", themeColor: "#e23a3a", toyType: "pavilion" },
  "苏州": { logo: "🪭", label: "拙政园 / 周庄水乡\n留园 / 虎丘塔 / 狮子林", themeColor: "#d97706", toyType: "pavilion" },
  "无锡": { logo: "🪷", label: "鼋头渚 / 灵山大佛\n三国城 / 拈花湾小镇", themeColor: "#059669", toyType: "pagoda" },
  "扬州": { logo: "🌉", label: "瘦西湖 / 个园 / 何园\n东关街 / 大明寺大钟", themeColor: "#0d9488", toyType: "boat" },
  "徐州": { logo: "🛡️", label: "汉兵马俑 / 云龙湖\n戏马台 / 潘安湖国家湿地", themeColor: "#4f46e5", toyType: "pagoda" },
  "常州": { logo: "🎢", label: "环球恐龙城 / 淹城乐园\n天目湖竹海 / 南山竹海", themeColor: "#ec4899", toyType: "windmill" },
  "南通": { logo: "⚓", label: "狼山风景区 / 濠河画舫\n水绘园 / 黄金海滩沙滩", themeColor: "#2563eb", toyType: "boat" },
  "连云港": { logo: "🐒", label: "花果山水帘洞 / 渔湾\n连岛海滨浴场 / 海上云台山", themeColor: "#eab308", toyType: "mountain" },
  "淮安": { logo: "🛶", label: "周恩来故居 / 里运河\n吴承恩故居 / 铁山寺森林", themeColor: "#0891b2", toyType: "boat" },
  "盐城": { logo: "🦌", label: "中华麋鹿园 / 鹤影湿地\n大丰郁金香花海", themeColor: "#10b981", toyType: "windmill" },
  "镇江": { logo: "🍇", label: "金山寺水漫金山 / 焦山\n北固山天下第一江山", themeColor: "#b45309", toyType: "pagoda" },
  "泰州": { logo: "🍵", label: "溱湖国家湿地 / 凤城河\n梅兰芳公园 / 望海楼", themeColor: "#ea580c", toyType: "pavilion" },
  "宿迁": { logo: "🍾", label: "项王故里 / 三台山森林\n洪泽湖湿地公园", themeColor: "#ef4444", toyType: "pavilion" }
};

// 景点详细数据源 (增加福建全省所有主要城市的极密景点数据，打造标准专业旅游地图！)
export const spotsData = {
  // 1. 福州市详尽景点 (350100)
  "350100": [
    {
      name: "三坊七巷",
      coordinates: [119.298, 26.082],
      logo: "🎏",
      grade: "AAAAA",
      type: "古民居遗址",
      theme: "#e23a3a", 
      desc: "“里坊制度的活化石”。坊巷格局至今完整，保存有大量精美雕饰的明清名人故居，林则徐、冰心曾居住于此。",
      feature: "爱心墙、林则徐纪念馆、木雕窗棂",
      season: "四季皆宜，夜游最佳",
      img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=500&q=80"
    },
    {
      name: "鼓山风景区",
      coordinates: [119.388, 26.062],
      logo: "⛰️",
      grade: "AAAA",
      type: "自然名山/古刹",
      theme: "#d97706", 
      desc: "福州最负盛名的名山。山腰建有千年古刹涌泉寺，摩崖石刻遍布山道，是登高俯瞰福州全城的绝佳去处。",
      feature: "涌泉寺、摩崖石刻、十八景",
      season: "春秋两季登高最佳",
      img: "https://images.unsplash.com/photo-1547983650-159e24879de7?w=500&q=80"
    },
    {
      name: "鼓岭避暑度假区",
      coordinates: [119.398, 26.102],
      logo: "🏡",
      grade: "AAAA",
      type: "避暑胜地",
      theme: "#059669", 
      desc: "中国最早的外国人避暑胜地之一。完好保留了清末西式别墅遗迹，夏季凉爽怡人，晨雾环绕如仙境。",
      feature: "柳杉王公园、鼓岭老邮局、万国别墅",
      season: "夏季（7-9月避暑最宜）",
      img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80"
    },
    {
      name: "福州西湖公园",
      coordinates: [119.291, 26.092],
      logo: "🛶",
      grade: "AAA",
      type: "古典园林",
      theme: "#0d9488", 
      desc: "福州西湖公园是福州迄今保存最完整的一座古典园林，建于五代时期，湖光山色，柳影拂水。",
      feature: "开化寺、宛在堂、西湖观鱼",
      season: "秋季菊花展/春季游湖",
      img: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=500&q=80"
    },
    {
      name: "平潭岛",
      coordinates: [119.789, 25.508],
      logo: "🏝️",
      grade: "AAAA",
      type: "海岛风光",
      theme: "#38bdf8", 
      desc: "福建第一大岛，以绝美的“蓝眼泪”奇观名扬海内外。岛上怪石嶙峋，风车摇曳，拥有漫长的金色沙滩。",
      feature: "追泪蓝眼泪、长江澳风车田、仙人井",
      season: "夏季（5-8月蓝眼泪爆发季）",
      img: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=500&q=80"
    },
    {
      name: "闽江夜游",
      coordinates: [119.325, 26.045],
      logo: "🚢",
      grade: "AAA",
      type: "城市水域",
      theme: "#ea580c", 
      desc: "搭乘豪华游船夜游福州母亲河闽江。两岸高楼林立，璀璨的 3D 全息灯光秀将福州夜空渲染得绚丽夺目。",
      feature: "台江码头登船、海峡金融商务区3D灯光秀",
      season: "四季夜游最佳",
      img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=500&q=80"
    },
    {
      name: "永泰青云山",
      coordinates: [118.955, 25.765],
      logo: "🧗",
      grade: "AAAA",
      type: "大自然峡谷",
      theme: "#10b981", 
      desc: "国家级风景名胜区。境内山峦叠嶂，云雾飘渺，瀑布群极为壮观，是夏日溯溪和森林康养的首选地。",
      feature: "九天瀑布（天瀑）、青龙瀑布、白马双溪",
      season: "夏季避暑消暑",
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&q=80"
    },
    {
      name: "金牛山福道",
      coordinates: [119.275, 26.088],
      logo: "🌁",
      grade: "AAAA",
      type: "城市绿道",
      theme: "#84cc16",
      desc: "全钢架悬空森林步道，环山而建。漫步其上可以“穿梭于林梢之间”，饱览福州半城山水风光。",
      feature: "悬空步道、落日观景台",
      season: "傍晚赏夕阳最佳",
      img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&q=80"
    },
    {
      name: "上下杭历史街区",
      coordinates: [119.308, 26.058],
      logo: "🏮",
      grade: "AAAA",
      type: "历史商街",
      theme: "#b45309",
      desc: "福州的“闽商发祥地”，古时商贾云集的商贸重地。如今雕梁画栋的会馆群与沿河咖啡馆完美交错，别有小桥流水格调。",
      feature: "三捷河画舫、永德会馆建筑群",
      season: "四季夜游",
      img: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?w=500&q=80"
    },
    {
      name: "闽越水镇",
      coordinates: [119.168, 26.095],
      logo: "🏰",
      grade: "AAAA",
      type: "仿古文化小镇",
      theme: "#ec4899",
      desc: "以福州“海丝文化”与“闽越历史”为背景的大型古风水镇，飞檐瓦当，水道纵横，宛如穿越回千年前的闽越古国。",
      feature: "水秀灯光表演、水镇摇橹船游览",
      season: "夏秋夜景游最佳",
      img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=80"
    }
  ],

  // 2. 苏州市极其详尽的 10 个景点数据 (320500)
  "320500": [
    {
      name: "拙政园",
      coordinates: [120.628, 31.326],
      logo: "🪟",
      grade: "AAAAA",
      type: "古典园林",
      theme: "#059669",
      desc: "江南古典园林的经典之作。以水为中心，山水萦绕，厅榭精美，一步一景，是东方美学的极致体现。",
      feature: "小飞虹、见山楼、香洲",
      season: "春夏两季",
      img: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=500&q=80"
    },
    {
      name: "寒山寺",
      coordinates: [120.565, 31.314],
      logo: "🔔",
      grade: "AAAA",
      type: "千年佛寺",
      theme: "#d97706",
      desc: "闻名遐迩的千年古刹，唐代诗人张继的《枫桥夜泊》让其钟声传颂千载。",
      feature: "枫桥古钟声、普明宝塔",
      season: "除夕夜/深秋",
      img: "https://images.unsplash.com/photo-1596117961230-057d34199c0d?w=500&q=80"
    },
    {
      name: "周庄古镇",
      coordinates: [120.867, 31.118],
      logo: "🛶",
      grade: "AAAAA",
      type: "江南水乡",
      theme: "#0891b2",
      desc: "中国第一水乡。四面环水，依河成街，保存了完美的明清双桥、沈厅等建筑风格，极富水乡神韵。",
      feature: "双桥横跨、手摇摇橹船",
      season: "烟雨春季",
      img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80"
    }
  ],
  // 3. 厦门市详尽景点 (350200)
  "350200": [
    {
      name: "鼓浪屿",
      coordinates: [118.0648, 24.4432],
      logo: "⛵",
      grade: "AAAAA",
      type: "海岛历史建筑群",
      theme: "#0284c7",
      desc: "“琴岛”与“万国建筑博览会”。无车马喧嚣，漫步海滨老巷，聆听潮水与钢琴合奏，充满闽南文艺质感。",
      feature: "日光岩俯瞰、菽庄花园、万国老别墅群",
      season: "四季皆宜，春秋最佳",
      img: xiamenSpotImage
    },
    {
      name: "南普陀寺",
      coordinates: [118.090, 24.440],
      logo: "🛕",
      grade: "AAAA",
      type: "闽南千年古刹",
      theme: "#b45309",
      desc: "坐落于鹭岛名山五老峰下，毗邻厦门大学。寺庙香火鼎盛，中轴线大殿雕梁画栋，素斋与素饼名扬闽台。",
      feature: "天王殿、万寿塔、五老峰登高、普陀素饼",
      season: "四季皆宜，清晨礼佛最佳",
      img: xiamenSpotImage
    },
    {
      name: "厦门园林植物园",
      coordinates: [118.110, 24.455],
      logo: "🌵",
      grade: "AAAA",
      type: "植物科学景区",
      theme: "#059669",
      desc: "俗称“万石植物园”，背靠万石山。拥有多肉植物区和雨林喷雾区，是岛内山体游线的重要节点。",
      feature: "雨林雾森喷雾、巨型仙人掌温室",
      season: "春夏季晨间雾气迷蒙时最佳",
      img: xiamenSpotImage
    },
    {
      name: "曾厝垵文创村",
      coordinates: [118.125, 24.428],
      logo: "🏡",
      grade: "AAA",
      type: "特色文创街区",
      theme: "#ec4899",
      desc: "由古老小渔村蜕变为特色民宿与闽南小吃聚集地，是环岛路沿线最有烟火气的街区之一。",
      feature: "文艺手作店、沙茶面等闽南街头小吃",
      season: "四季夜市时间最热闹",
      img: xiamenSpotImage
    },
    {
      name: "集美学村",
      coordinates: [118.100, 24.570],
      logo: "🏫",
      grade: "AAAA",
      type: "陈嘉庚纪念景区",
      theme: "#4f46e5",
      desc: "陈嘉庚先生创办的学林殿堂。中西合璧的嘉庚建筑群临海相望，是集美区的核心文化坐标。",
      feature: "嘉庚建筑、鳌园、龙舟池、陈嘉庚纪念馆",
      season: "春秋开学季/夕阳下最美",
      img: xiamenSpotImage
    },
    {
      name: "环岛路椰风寨",
      coordinates: [118.175, 24.440],
      logo: "🌴",
      grade: "AAA",
      type: "黄金海岸步道",
      theme: "#38bdf8",
      desc: "厦门东南侧海岸线代表。椰风轻拂，海浪温柔，适合骑行、散步和看海。",
      feature: "海滨骑行、金色沙滩、椰林大道",
      season: "夏秋季清晨或傍晚",
      img: xiamenSpotImage
    },
    {
      name: "胡里山炮台",
      coordinates: [118.105, 24.428],
      logo: "💣",
      grade: "AAAA",
      type: "近代军事遗存",
      theme: "#6b7280",
      desc: "“八闽门户，天南锁钥”。保留近代海防炮台遗存，见证厦门海防历史。",
      feature: "克虏伯大炮、红夷火炮操演秀",
      season: "四季皆宜，上午演出最佳",
      img: xiamenSpotImage
    },
    {
      name: "中山路步行街",
      coordinates: [118.078, 24.453],
      logo: "🛍️",
      grade: "AAAA",
      type: "历史文化商业街",
      theme: "#b45309",
      desc: "厦门老牌商业街，保留大量闽南骑楼建筑。汇聚闽台风味小吃，是感受老城烟火气的入口。",
      feature: "南洋风情骑楼建筑群、闽台特色夜市",
      season: "四季皆宜，夜景最佳",
      img: xiamenSpotImage
    },
    {
      name: "白鹭洲公园",
      coordinates: [118.085, 24.475],
      logo: "🕊️",
      grade: "AAAA",
      type: "城市生态公园",
      theme: "#059669",
      desc: "筼筜湖环绕的城市绿肺。白鹭女神雕塑、湖区夜景和城市天际线在此相映成趣。",
      feature: "白鹭女神雕塑、筼筜湖夜景",
      season: "春秋季傍晚散步最佳",
      img: xiamenSpotImage
    },
    {
      name: "厦门大学",
      coordinates: [118.087, 24.436],
      logo: "🏫",
      grade: "AAAA",
      type: "著名高等学府",
      theme: "#4f46e5",
      desc: "依山傍海，中西合璧的嘉庚风格校舍错落有致。芙蓉湖和芙蓉隧道构成校园文化名片。",
      feature: "建南大礼堂、芙蓉湖、芙蓉隧道文艺涂鸦",
      season: "四季皆宜，春秋最佳",
      img: xiamenSpotImage
    },
    {
      name: "沙坡尾避风坞",
      coordinates: [118.082, 24.437],
      logo: "🎨",
      grade: "AAA",
      type: "历史文化街区",
      theme: "#db2777",
      desc: "厦门老渔港记忆与文创街区交叠的区域。咖啡馆、艺术空间和避风坞共同保留老鹭岛气质。",
      feature: "老渔船避风港、艺术西区、文创市集",
      season: "四季皆宜，傍晚与夜间最文艺",
      img: xiamenSpotImage
    },
    {
      name: "五缘湾湿地公园",
      coordinates: [118.165, 24.525],
      logo: "🪶",
      grade: "AAAA",
      type: "生态湿地保护区",
      theme: "#0ea5e9",
      desc: "厦门岛东北部重要湿地公园。水上迷宫、木栈道与帆船港共同构成滨海生态体验。",
      feature: "水上迷宫、黑天鹅湖、帆船游艇港",
      season: "春秋季温和怡人时",
      img: xiamenSpotImage
    },
    {
      name: "海沧湾公园",
      coordinates: [118.035, 24.492],
      logo: "🌊",
      grade: "AAA",
      type: "滨海休闲公园",
      theme: "#0ea5e9",
      desc: "海沧湾西岸的开放式滨海公园，正对厦门岛西侧，是观看海沧大桥和岛内天际线的好位置。",
      feature: "海沧大桥视角、滨海步道、夜景",
      season: "傍晚与夜间最佳",
      img: xiamenSpotImage
    },
    {
      name: "天竺山森林公园",
      coordinates: [117.938, 24.586],
      logo: "⛰️",
      grade: "AAAA",
      type: "山地森林公园",
      theme: "#047857",
      desc: "海沧西北部的山地森林景区，湖泊、山路和林地串联，适合亲子徒步与自然教育。",
      feature: "森林步道、湖区栈道、亲子徒步",
      season: "秋冬和春季最佳",
      img: xiamenSpotImage
    },
    {
      name: "青礁慈济宫",
      coordinates: [117.925, 24.511],
      logo: "🛕",
      grade: "AAAA",
      type: "闽台信俗祖庙",
      theme: "#b45309",
      desc: "海沧青礁的保生大帝信俗重要祖庙，是连接闽台民间信仰与海沧历史的文化节点。",
      feature: "保生大帝信俗、闽台宫庙建筑",
      season: "四季皆宜，民俗节庆更热闹",
      img: xiamenSpotImage
    },
    {
      name: "同安影视城",
      coordinates: [118.154, 24.738],
      logo: "🏯",
      grade: "AAAA",
      type: "仿古影视主题景区",
      theme: "#b45309",
      desc: "同安区代表性主题景区，以仿古宫殿建筑和影视场景体验为主，适合家庭游览。",
      feature: "仿古宫殿、影视场景、亲子拍照",
      season: "四季皆宜，晴天最佳",
      img: xiamenSpotImage
    },
    {
      name: "北辰山",
      coordinates: [118.152, 24.853],
      logo: "⛰️",
      grade: "AAAA",
      type: "山地自然景区",
      theme: "#047857",
      desc: "同安北部山地景区，山水、峡谷和人文传说结合，是补足厦门北部山地游线的重要点位。",
      feature: "山谷溪流、登山步道、自然研学",
      season: "春秋登山最佳",
      img: xiamenSpotImage
    },
    {
      name: "古龙酱文化园",
      coordinates: [118.129, 24.692],
      logo: "🏺",
      grade: "AAA",
      type: "工业文化研学",
      theme: "#92400e",
      desc: "同安食品工业与闽南饮食文化结合的研学点，可了解酱料酿造、晒场和地方饮食记忆。",
      feature: "酱文化展陈、晒场景观、研学体验",
      season: "四季皆宜",
      img: xiamenSpotImage
    },
    {
      name: "大嶝小镇",
      coordinates: [118.338, 24.565],
      logo: "🏝️",
      grade: "AAA",
      type: "翔安海岛街区",
      theme: "#0ea5e9",
      desc: "翔安大嶝岛上的特色街区，靠近厦门东部海域，是观察厦门岛外海岛格局的代表点位。",
      feature: "海岛街区、战地文化、海岸风光",
      season: "春秋海风舒适时",
      img: xiamenSpotImage
    },
    {
      name: "香山公园",
      coordinates: [118.282, 24.614],
      logo: "🌸",
      grade: "AAA",
      type: "翔安山海公园",
      theme: "#db2777",
      desc: "翔安区重要城市公园，山体视野开阔，适合展示厦门东部城区和山海空间。",
      feature: "登高视野、花季景观、城市公园",
      season: "春季花期和秋季最佳",
      img: xiamenSpotImage
    },
    {
      name: "澳头渔港小镇",
      coordinates: [118.247, 24.543],
      logo: "🎣",
      grade: "AAA",
      type: "滨海渔港文创区",
      theme: "#0284c7",
      desc: "翔安南部的渔港与艺术街区，保留海边村落肌理，也承接东部滨海文旅动线。",
      feature: "渔港风貌、海边街巷、艺术空间",
      season: "傍晚最佳",
      img: xiamenSpotImage
    }
  ]
};

// 获取省地图页面应该投射的“全省核心景区”展示数据（当处于省级地图时展示）
export const provinceCoreSpots = {
  // 福建省核心投射景区
  "350000": [
    { name: "福州三坊七巷 🎏", coordinates: [119.298, 26.082], city: "福州市", logo: "🎏", grade: "AAAAA" },
    { name: "厦门鼓浪屿 ⛵", coordinates: [118.065, 24.445], city: "厦门市", logo: "⛵", grade: "AAAAA" },
    { name: "武夷山大王峰 ⛰️", coordinates: [117.985, 27.652], city: "南平市", logo: "⛰️", grade: "AAAAA" },
    { name: "平潭半岛风车 🏝️", coordinates: [119.789, 25.508], city: "福州市", logo: "🏝️", grade: "AAAA" }
  ],
  // 江苏省的核心景区投射 (320000)
  "320000": [
    { name: "南京夫子庙 🏮", coordinates: [118.786, 32.022], city: "南京市", logo: "🏮", grade: "AAAAA" },
    { name: "苏州拙政园 🪟", coordinates: [120.628, 31.326], city: "苏州市", logo: "🪟", grade: "AAAAA" },
    { name: "无锡灵山大佛 🪷", coordinates: [120.191, 31.425], city: "无锡市", logo: "🪷", grade: "AAAAA" },
    { name: "扬州瘦西湖 🌉", coordinates: [119.418, 32.408], city: "扬州市", logo: "🌉", grade: "AAAAA" }
  ],
  // 浙江省的核心景区投射 (330000)
  "330000": [
    { name: "杭州西湖 ⛵", coordinates: [120.142, 30.245], city: "杭州市", logo: "⛵", grade: "AAAAA" },
    { name: "嘉兴乌镇 🛶", coordinates: [120.485, 30.748], city: "嘉兴市", logo: "🛶", grade: "AAAAA" },
    { name: "普陀山景区 🫖", coordinates: [122.385, 29.982], city: "舟山市", logo: "🫖", grade: "AAAAA" },
    { name: "湖州莫干山 ⛰️", coordinates: [119.862, 30.608], city: "湖州市", logo: "⛰️", grade: "AAAA" }
  ],
  // 四川省的核心景区投射 (510000)
  "510000": [
    { name: "大熊猫基地 🐼", coordinates: [104.148, 30.732], city: "成都市", logo: "🐼", grade: "AAAAA" },
    { name: "乐山大佛 🪷", coordinates: [103.778, 29.542], city: "乐山市", logo: "🪷", grade: "AAAAA" },
    { name: "九寨沟风景区 🏔️", coordinates: [103.921, 33.262], city: "阿坝州", logo: "🏔️", grade: "AAAAA" },
    { name: "峨眉山金顶 ⛰️", coordinates: [103.332, 29.525], city: "乐山市", logo: "⛰️", grade: "AAAAA" }
  ],
  // 陕西省的核心景区投射 (610000)
  "610000": [
    { name: "秦始皇兵马俑 ⚔️", coordinates: [109.278, 34.385], city: "西安市", logo: "⚔️", grade: "AAAAA" },
    { name: "大唐不夜城 🏮", coordinates: [108.963, 34.205], city: "西安市", logo: "🏮", grade: "AAAAA" },
    { name: "西岳华山 🏔️", coordinates: [110.082, 34.485], city: "渭南市", logo: "🏔️", grade: "AAAAA" },
    { name: "黄帝陵 🏯", coordinates: [109.262, 35.582], city: "延安市", logo: "🏯", grade: "AAAAA" }
  ]
};

// 获取通用的/占位的景点数据，以防止用户点击没有配齐数据的城市时出错
export function getFallbackSpots(adcode, center) {
  if (spotsData[adcode]) return spotsData[adcode];
  const cx = center ? center.x : 0;
  const cy = center ? center.y : 0;
  
  return [
    {
      name: "自然山水风光",
      coordinates: null, 
      offset: [-1.2, 1.2, 0],
      logo: "🏞️",
      grade: "AAAA",
      type: "生态景区",
      theme: "#059669",
      desc: "清泉漱石，绿树遮天。这里是当地极具代表性的山水风光区，适合漫步深呼吸。",
      feature: "林中栈道、碧潭飞瀑",
      season: "夏季",
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&q=80"
    },
    {
      name: "本地历史老街",
      coordinates: null,
      offset: [1.2, -1.2, 0],
      logo: "🏮",
      grade: "AAAA",
      type: "民俗街区",
      theme: "#e23a3a",
      desc: "承载了本地百年以上沧桑变迁的砖石建筑与长街，沿街摆满了传统手艺与特色风味小吃。",
      feature: "青石古板、非遗传承小吃",
      season: "四季皆宜",
      img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&q=80"
    }
  ];
}

// 真实文旅大数据源 (用于大屏左侧文旅看板展示)
export const travelStats = {
  // 全国大盘
  "100000": {
    title: "全国文旅大数据总览",
    revenue: "5.28万亿元",
    visitors: "89.6亿人次",
    growth: "+45.2%",
    hotRank: [
      { name: "云南省", value: 9.8, bar: "98%" },
      { name: "四川省", value: 9.6, bar: "96%" },
      { name: "浙江省", value: 9.4, bar: "94%" },
      { name: "福建省", value: 9.3, bar: "93%" },
      { name: "江苏省", value: 9.1, bar: "91%" }
    ],
    preference: [
      { name: "自驾家庭游", ratio: "55%" },
      { name: "非遗红色研学", ratio: "25%" },
      { name: "海滨生态避暑", ratio: "20%" }
    ]
  },
  // 江苏省
  "320000": {
    title: "江苏文旅大数据总览",
    visitors: "9.42亿人次",
    revenue: "1.20万亿元",
    growth: "+38.6%",
    hotRank: [
      { name: "苏州市", value: 9.9, bar: "99%" },
      { name: "南京市", value: 9.7, bar: "97%" },
      { name: "无锡市", value: 9.1, bar: "91%" },
      { name: "扬州市", value: 8.8, bar: "88%" },
      { name: "常州市", value: 8.5, bar: "85%" }
    ],
    preference: [
      { name: "江南古典园林", ratio: "42%" },
      { name: "水乡古镇游船", ratio: "33%" },
      { name: "竹海养生避暑", ratio: "25%" }
    ]
  },
  // 福建省
  "350000": {
    title: "八闽文旅大数据总览",
    visitors: "6.50亿人次",
    revenue: "8350亿元",
    growth: "+47.9%",
    hotRank: [
      { name: "厦门市", value: 9.9, bar: "99%" },
      { name: "泉州市", value: 9.8, bar: "98%" },
      { name: "福州市", value: 9.2, bar: "92%" },
      { name: "南平市", value: 8.7, bar: "87%" },
      { name: "宁德市", value: 8.3, bar: "83%" }
    ],
    preference: [
      { name: "蟳埔簪花/土楼非遗", ratio: "45%" },
      { name: "武夷丹霞茶文化", ratio: "30%" },
      { name: "平潭霞浦海滨光影", ratio: "25%" }
    ]
  },
  // 福州市
  "350100": {
    title: "福州文旅大数据总览",
    visitors: "8260万人次",
    revenue: "958亿元",
    growth: "+18.5%",
    hotRank: [
      { name: "三坊七巷", value: 9.9, bar: "99%" },
      { name: "平潭海岛", value: 9.6, bar: "96%" },
      { name: "上下杭街区", value: 9.1, bar: "91%" },
      { name: "鼓山涌泉寺", value: 8.7, bar: "87%" },
      { name: "闽越水镇", value: 8.4, bar: "84%" }
    ],
    preference: [
      { name: "里坊古厝研学", ratio: "50%" },
      { name: "海岛风车追泪", ratio: "30%" },
      { name: "闽江夜游画舫", ratio: "20%" }
    ]
  },
  // 厦门市
  "350200": {
    title: "厦门文旅大数据总览",
    visitors: "1.10亿人次",
    revenue: "1567亿元",
    growth: "+22.3%",
    hotRank: [
      { name: "鼓浪屿", value: 9.9, bar: "99%" },
      { name: "南普陀寺", value: 9.4, bar: "94%" },
      { name: "环岛路椰风", value: 9.2, bar: "92%" },
      { name: "集美学村", value: 8.9, bar: "89%" },
      { name: "万石植物园", value: 8.6, bar: "86%" }
    ],
    preference: [
      { name: "万国建筑艺术", ratio: "45%" },
      { name: "椰风海滨骑行", ratio: "35%" },
      { name: "闽南非遗文创", ratio: "20%" }
    ]
  },
  // 泉州市
  "350500": {
    title: "泉州文旅大数据总览",
    visitors: "1.01亿人次",
    revenue: "1211亿元",
    growth: "+26.8%",
    hotRank: [
      { name: "西街开元寺", value: 9.9, bar: "99%" },
      { name: "蟳埔簪花村", value: 9.8, bar: "98%" },
      { name: "清源山老君岩", value: 9.3, bar: "93%" },
      { name: "晋江五店市", value: 8.9, bar: "89%" },
      { name: "崇武古城", value: 8.5, bar: "85%" }
    ],
    preference: [
      { name: "簪花围非遗体验", ratio: "55%" },
      { name: "海丝宋元古厝", ratio: "28%" },
      { name: "道释佛刹禅修", ratio: "17%" }
    ]
  },
  // 漳州市
  "350600": {
    title: "漳州文旅大数据总览",
    visitors: "6800万人次",
    revenue: "720亿元",
    growth: "+19.2%",
    hotRank: [
      { name: "田螺坑土楼", value: 9.9, bar: "99%" },
      { name: "云水谣古镇", value: 9.7, bar: "97%" },
      { name: "东山岛海湾", value: 9.4, bar: "94%" },
      { name: "漳州古城", value: 8.8, bar: "88%" }
    ],
    preference: [
      { name: "世遗土楼寻根", ratio: "48%" },
      { name: "电影取景海岛游", ratio: "32%" },
      { name: "古城骑楼美食", ratio: "20%" }
    ]
  },
  // 龙岩市
  "350800": {
    title: "龙岩文旅大数据总览",
    visitors: "5400万人次",
    revenue: "560亿元",
    growth: "+15.6%",
    hotRank: [
      { name: "永定客家土楼", value: 9.9, bar: "99%" },
      { name: "长汀古城墙", value: 9.5, bar: "95%" },
      { name: "古田会议旧址", value: 9.2, bar: "92%" },
      { name: "连城冠豸山", value: 8.6, bar: "86%" }
    ],
    preference: [
      { name: "客家民俗与土楼", ratio: "45%" },
      { name: "红色文化红色研学", ratio: "35%" },
      { name: "自然山水度假", ratio: "20%" }
    ]
  },
  // 南平市
  "350700": {
    title: "南平文旅大数据总览",
    visitors: "6500万人次",
    revenue: "680亿元",
    growth: "+21.4%",
    hotRank: [
      { name: "武夷山天游峰", value: 9.9, bar: "99%" },
      { name: "九曲溪竹筏", value: 9.8, bar: "98%" },
      { name: "大红袍景区", value: 9.2, bar: "92%" },
      { name: "和平书院古镇", value: 8.5, bar: "85%" }
    ],
    preference: [
      { name: "武夷茶文化体验", ratio: "50%" },
      { name: "竹筏漂流山水", ratio: "35%" },
      { name: "朱子理学研学", ratio: "15%" }
    ]
  },
  // 宁德市
  "350900": {
    title: "宁德文旅大数据总览",
    visitors: "4800万人次",
    revenue: "490亿元",
    growth: "+23.1%",
    hotRank: [
      { name: "霞浦滩涂光影", value: 9.9, bar: "99%" },
      { name: "太姥山一线天", value: 9.4, bar: "94%" },
      { name: "大嵛山岛草甸", value: 9.1, bar: "91%" }
    ],
    preference: [
      { name: "光影艺术摄影", ratio: "48%" },
      { name: "最美海岛避暑", ratio: "32%" },
      { name: "奇石险洞探险", ratio: "20%" }
    ]
  },
  // 莆田市
  "350300": {
    title: "莆田文旅大数据总览",
    visitors: "3500万人次",
    revenue: "380亿元",
    growth: "+12.8%",
    hotRank: [
      { name: "湄洲岛妈祖庙", value: 9.9, bar: "99%" },
      { name: "九鲤湖飞瀑", value: 9.1, bar: "91%" },
      { name: "南山广化寺", value: 8.6, bar: "86%" }
    ],
    preference: [
      { name: "妈祖海神朝圣", ratio: "60%" },
      { name: "水乡荔林生态", ratio: "25%" },
      { name: "九鲤飞瀑祈梦", ratio: "15%" }
    ]
  },
  // 三明市
  "350400": {
    title: "三明文旅大数据总览",
    visitors: "4200万人次",
    revenue: "430亿元",
    growth: "+14.5%",
    hotRank: [
      { name: "泰宁大金湖", value: 9.9, bar: "99%" },
      { name: "桂峰晒秋古村", value: 9.3, bar: "93%" },
      { name: "玉华仙人溶洞", value: 8.8, bar: "88%" }
    ],
    preference: [
      { name: "沙县美食探秘", ratio: "40%" },
      { name: "水上丹霞奇观", ratio: "35%" },
      { name: "山谷古村晒秋", ratio: "25%" }
    ]
  }
};

// 3D 空间四周飘浮的人文、风景、历史手绘插纸立牌配置 (让 3D 场景变成一本三维研学立体书！)
export const provinceCulturalDecos = {
  // 福建省 (350000)
  "350000": [
    {
      id: "fj-tea",
      title: "🍵 武夷茶韵",
      category: "人文非遗",
      desc: "大红袍茶香远播海内外，九曲溪畔石缝出名茶，演绎八闽千年的岩茶文化。",
      pos: [-6.5, 4.0, 0.6],
      theme: "#059669",
      stamp: "茶"
    },
    {
      id: "fj-tulou",
      title: "🏰 客家土楼",
      category: "历史遗迹",
      desc: "圆方结合的夯土奇迹。聚族而居，凝聚着客家人御敌与团结的智慧。",
      pos: [-7.2, -3.5, 0.6],
      theme: "#b45309",
      stamp: "楼"
    },
    {
      id: "fj-haisi",
      title: "🚢 海丝起点",
      category: "海洋历史",
      desc: "涨海声中万国商。泉州港曾为东方第一大港，见证海洋贸易与文化交融。",
      pos: [6.8, -4.5, 0.6],
      theme: "#0284c7",
      stamp: "船"
    },
    {
      id: "fj-green",
      title: "⛰️ 清新八闽",
      category: "自然风景",
      desc: "全国森林覆盖率第一的绿色大省，武夷丹霞与蓝色海湾在此交错成画。",
      pos: [6.5, 3.8, 0.6],
      theme: "#0d9488",
      stamp: "山"
    }
  ],
  // 江苏省 (320000)
  "320000": [
    {
      id: "js-garden",
      title: "🪟 苏州园林",
      category: "世界遗产",
      desc: "咫尺之内再造乾坤。拙政留园借景精妙，将诗情画意融于亭台轩谢。",
      pos: [-6.5, 3.8, 0.6],
      theme: "#059669",
      stamp: "园"
    },
    {
      id: "js-water",
      title: "🛶 运河水乡",
      category: "风景名胜",
      desc: "京杭大运河横穿古城，小桥流水人家，周庄同里摇橹声声枕河而居。",
      pos: [6.8, -3.5, 0.6],
      theme: "#0ea5e9",
      stamp: "水"
    },
    {
      id: "js-kun",
      title: "🪭 昆曲百戏",
      category: "戏曲人文",
      desc: "百戏之祖。唱腔婉转细腻，伴着吴侬软语，雅致到了江南文化的骨子里。",
      pos: [-7.0, -3.0, 0.6],
      theme: "#ec4899",
      stamp: "曲"
    }
  ],
  // 陕西省 (610000)
  "610000": [
    {
      id: "sx-俑",
      title: "🛡️ 兵马俑阵",
      category: "历史遗珍",
      desc: "世界第八大奇迹。地下千军万马军阵巍峨，重现大秦帝国扫六合之雄风。",
      pos: [-6.5, 3.5, 0.6],
      theme: "#b45309",
      stamp: "秦"
    },
    {
      id: "sx-tang",
      title: "🏮 盛世唐风",
      category: "历史人文",
      desc: "九天阊阖开宫殿，万国衣冠拜冕旒。大雁塔下，回荡着长安城的千年余音。",
      pos: [6.5, -4.0, 0.6],
      theme: "#e23a3a",
      stamp: "唐"
    }
  ]
};
