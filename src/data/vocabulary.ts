export interface VocabularyCard {
  word: string;
  emoji: string;
  pinyin: string;
  zhuyin: string;
  explanation: string;
}

export const vocabularyDatabase: Record<string, VocabularyCard> = {
  // ====== Rainbow Book Vocabularies ======
  "彩虹種子": {
    word: "彩虹種子",
    emoji: "🌱🌈",
    pinyin: "cǎi hóng zhǒng zǐ",
    zhuyin: "ㄘㄞˇ ㄏㄨㄥˊ ㄓㄨㄥˇ ㄗˇ",
    explanation: "一顆會散發七彩光芒的神奇種子，需要滿滿的耐心和溫柔照顧才能長大。"
  },
  "堅果": {
    word: "堅果",
    emoji: "🌰",
    pinyin: "jiān guǒ",
    zhuyin: "ㄐㄧㄢ ㄍㄨㄛˇ",
    explanation: "有著堅硬外殼的果實，是小松鼠最心愛、存起來過冬的美味點心。"
  },
  "大樹葉": {
    word: "大樹葉",
    emoji: "🍃",
    pinyin: "dà shù yè",
    zhuyin: "ㄉㄚˋ ㄕㄨˋ ㄧㄝˋ",
    explanation: "像綠色大巨人的小手掌一樣，能在大雨和大風中，為小生命撐起小傘。"
  },
  "龜爺爺": {
    word: "龜爺爺",
    emoji: "🐢",
    pinyin: "guī yé yé",
    zhuyin: "ㄍㄨㄟ ㄧㄝˊ ㄧㄝˊ",
    explanation: "森林裡年紀最大、最有學問的老烏龜，說話慢條斯理，懂得很多生命的智慧。"
  },
  "共同努力": {
    word: "共同努力",
    emoji: "🤝",
    pinyin: "gòng tóng nǔ lì",
    zhuyin: "ㄍㄨㄥˋ ㄊㄨㄥˊ ㄋㄨˇ ㄌㄧˋ",
    explanation: "大家互相幫忙，把每個人的力量聚在一起，就能完成單靠自己做不到的神奇大事！"
  },
  "彩虹果實": {
    word: "彩虹果實",
    emoji: "🍎🌈",
    pinyin: "cǎi hóng guǒ shí",
    zhuyin: "ㄘㄞˇ ㄏㄨㄥˊ ㄍㄨㄛˇ ㄕˊ",
    explanation: "彩虹樹上結出的七彩甜美果實，像天上的彩虹一樣閃閃發亮。"
  },
  "小綠芽": {
    word: "小綠芽",
    emoji: "🌱",
    pinyin: "xiǎo lǜ yá",
    zhuyin: "ㄒㄧㄠˇ ㄌㄩˋ ㄧㄚˊ",
    explanation: "剛從黑色泥土裡探出頭來的小芽，小小的、綠綠的，代表著充滿生命的新希望。"
  },
  "發光": {
    word: "發光",
    emoji: "✨",
    pinyin: "fā guāng",
    zhuyin: "ㄈㄚ ㄍㄨㄤ",
    explanation: "像螢火蟲或小星星一樣，自己會散發出明亮美麗的光芒，在黑暗中特別耀眼。"
  },
  "鬆土": {
    word: "鬆土",
    emoji: "🪴",
    pinyin: "sōng tǔ",
    zhuyin: "ㄙㄨㄥ ㄊㄨˇ",
    explanation: "用小工具把硬硬的泥土翻鬆，讓植物的根可以舒服地呼吸和伸展。"
  },
  "節奏": {
    word: "節奏",
    emoji: "🎵",
    pinyin: "jié zòu",
    zhuyin: "ㄐㄧㄝˊ ㄗㄡˋ",
    explanation: "就像音樂有快有慢一樣，每顆種子也有自己長大的速度和步調。"
  },
  "屏障": {
    word: "屏障",
    emoji: "🛡️",
    pinyin: "píng zhàng",
    zhuyin: "ㄆㄧㄥˊ ㄓㄤˋ",
    explanation: "像一面大大的盾牌擋在前面，保護身後的小寶貝不被風雨傷害。"
  },
  "濕潤": {
    word: "濕潤",
    emoji: "💦",
    pinyin: "shī rùn",
    zhuyin: "ㄕ ㄖㄨㄣˋ",
    explanation: "含有水分、摸起來潤潤的感覺，下過雨後的泥土就是濕潤的。"
  },
  "嫩綠": {
    word: "嫩綠",
    emoji: "🌿",
    pinyin: "nèn lǜ",
    zhuyin: "ㄋㄣˋ ㄌㄩˋ",
    explanation: "剛剛長出來的、柔柔嫩嫩的淺綠色，看起來充滿了新生的活力。"
  },
  "歡呼": {
    word: "歡呼",
    emoji: "🎉",
    pinyin: "huān hū",
    zhuyin: "ㄏㄨㄢ ㄏㄨ",
    explanation: "因為太高興了而大聲喊叫和拍手，就像中了大獎一樣開心！"
  },
  "樹苗": {
    word: "樹苗",
    emoji: "🌳",
    pinyin: "shù miáo",
    zhuyin: "ㄕㄨˋ ㄇㄧㄠˊ",
    explanation: "還是小寶寶的樹，雖然個子小小的，但將來會長成參天大樹喔！"
  },
  "讚嘆": {
    word: "讚嘆",
    emoji: "😮",
    pinyin: "zàn tàn",
    zhuyin: "ㄗㄢˋ ㄊㄢˋ",
    explanation: "看到很厲害或很漂亮的东西時，忍不住發出「哇～好美啊！」的驚嘆聲。"
  },
  "守護": {
    word: "守護",
    emoji: "🫶",
    pinyin: "shǒu hù",
    zhuyin: "ㄕㄡˇ ㄏㄨˋ",
    explanation: "像爸爸媽媽保護你一樣，用心看顧和保衛珍貴的東西不受傷害。"
  },
  "老花眼鏡": {
    word: "老花眼鏡",
    emoji: "👓",
    pinyin: "lǎo huā yǎn jìng",
    zhuyin: "ㄌㄠˇ ㄏㄨㄚ ㄧㄢˇ ㄐㄧㄥˋ",
    explanation: "爺爺奶奶戴的眼鏡，幫助年紀大的人看清楚近處的字和東西。"
  },

  // ====== Grassland Book Vocabularies ======
  "小羊": {
    word: "小羊",
    emoji: "🐑",
    pinyin: "xiǎo yáng",
    zhuyin: "ㄒㄧㄠˇ ㄧㄤˊ",
    explanation: "身上穿著白白、蓬蓬像棉花糖一樣羊毛衣服，叫聲溫柔的草原小可愛。"
  },
  "小駱駝": {
    word: "小駱駝",
    emoji: "🐫",
    pinyin: "xiǎo luò tuó",
    zhuyin: "ㄒㄧㄠˇ ㄌㄨㄛˋ ㄊㄨˊ",
    explanation: "背上有高高的駝峰，可以儲存能量，性格沉穩、非常能耐渴與忍耐的可愛溫和動物。"
  },
  "老鷹": {
    word: "老鷹",
    emoji: "🦅",
    pinyin: "lǎo yīng",
    zhuyin: "ㄌㄠˇ ㄧㄥ",
    explanation: "天空中巨大的飛鳥，有著強壯無比的翅膀和銳利的眼神，可以乘風翺翔。"
  },
  "滑翔翼": {
    word: "滑翔翼",
    emoji: "🪂",
    pinyin: "huá xiáng yì",
    zhuyin: "ㄏㄨㄚˊ ㄒㄧㄤˊ ㄧˋ",
    explanation: "利用木材和柔軟布料編織出來的無動力大翅膀，可以幫助小动物像鳥兒一樣飛上天。"
  },
  "夢想": {
    word: "夢想",
    emoji: "💭",
    pinyin: "mèng xiǎng",
    zhuyin: "ㄇㄥˋ ㄒㄧǎng",
    explanation: "藏在心底最深處、最想要去實現的美麗願望，哪怕聽起來很不可思議！"
  },
  "氣球": {
    word: "氣球",
    emoji: "🎈",
    pinyin: "qì qiú",
    zhuyin: "ㄑㄧˋ ㄑㄧㄡˊ",
    explanation: "充滿氣體、輕飄飄的彩色氣囊，一放手就會一邊跳舞一邊飛進白雲中。"
  },
  "泥巴坑": {
    word: "泥巴坑",
    emoji: "🕳️",
    pinyin: "ní bā kēng",
    zhuyin: "ㄋㄧˊ ㄅㄚ ㄎㄥ",
    explanation: "雨水和泥土混在一起形成的軟軟水坑，踩上去會發出咕嚕聲，雖然會弄髒但很有趣！"
  },
  "堅持": {
    word: "堅持",
    emoji: "✊",
    pinyin: "jiān chí",
    zhuyin: "ㄐㄧㄢ ㄔˊ",
    explanation: "跌倒了也拍拍灰塵，站起來繼續嘗試！哪怕失敗了一百次也絕不輕易放棄。"
  },
  "進行測試": {
    word: "進行測試",
    emoji: "⚙️",
    pinyin: "jìn xíng cè shì",
    zhuyin: "ㄐㄧㄣˋ ㄒㄧㄥˊ ㄘㄜˋ ㄕˋ",
    explanation: "像小小科學家一樣，動手試一試零件好不好用、重力穩不穩定。"
  },
  "遼闊": {
    word: "遼闊",
    emoji: "🏞️",
    pinyin: "liáo kuò",
    zhuyin: "ㄌㄧㄠˊ ㄎㄨㄛˋ",
    explanation: "非常大、非常寬廣的樣子，一眼望過去看不到邊際，像大海或大草原那樣壯觀。"
  },
  "翱翔": {
    word: "翱翔",
    emoji: "🦅",
    pinyin: "áo xiáng",
    zhuyin: "ㄠˊ ㄒㄧㄤˊ",
    explanation: "展開大翅膀在天空中自由自在地飛翔滑行，不用費力拍打翅膀，好優雅！"
  },
  "羨慕": {
    word: "羨慕",
    emoji: "🥺",
    pinyin: "xiàn mù",
    zhuyin: "ㄒㄧㄢˋ ㄇㄨˋ",
    explanation: "看到別人有很棒的東西或能力時，心裡好想也能擁有，但又不是嫉妒的感覺。"
  },
  "飛行器": {
    word: "飛行器",
    emoji: "🛩️",
    pinyin: "fēi xíng qì",
    zhuyin: "ㄈㄟ ㄒㄧㄥˊ ㄑㄧˋ",
    explanation: "可以在空中飛行的機器或裝置，從紙飛機到真正的飛機都算喔！"
  },
  "沮喪": {
    word: "沮喪",
    emoji: "😞",
    pinyin: "jǔ sàng",
    zhuyin: "ㄐㄩˇ ㄙㄤˋ",
    explanation: "遇到挫折後心裡覺得難過失望、提不起精神的感覺，像洩了氣的皮球一樣。"
  },
  "五顏六色": {
    word: "五顏六色",
    emoji: "🌈",
    pinyin: "wǔ yán liù sè",
    zhuyin: "ㄨˇ ㄧㄢˊ ㄌㄧㄡˋ ㄙㄜˋ",
    explanation: "形容顏色非常多、非常繽紛漂亮，就像彩虹或一盒彩色鉛筆那樣豐富多彩！"
  },
  "設計圖": {
    word: "設計圖",
    emoji: "📐",
    pinyin: "shè jì tú",
    zhuyin: "ㄕㄜˋ ㄐㄧˋ ㄊㄨˊ",
    explanation: "把腦中的好點子畫在紙上，標註尺寸和形狀，就像建築師蓋房子前的藍圖。"
  },
  "重心": {
    word: "重心",
    emoji: "⚖️",
    pinyin: "zhòng xīn",
    zhuyin: "ㄓㄨㄥˋ ㄒㄧㄣ",
    explanation: "物體最重、最核心的平衡點，如果重心不對，東西就容易歪倒或不穩。"
  },
  "精緻": {
    word: "精緻",
    emoji: "💎",
    pinyin: "jīng zhì",
    zhuyin: "ㄐㄧㄥ ㄓˋ",
    explanation: "做得非常仔細、非常漂亮，每一個小細節都很用心，讓人看了就覺得好厲害！"
  },
  "自信": {
    word: "自信",
    emoji: "💪",
    pinyin: "zì xìn",
    zhuyin: "ㄗˋ ㄒㄧㄣˋ",
    explanation: "相信自己可以做到的勇氣和力量，眼睛閃閃發亮、抬頭挺胸的感覺！"
  },
  "夕陽": {
    word: "夕陽",
    emoji: "🌅",
    pinyin: "xī yáng",
    zhuyin: "ㄒㄧ ㄧㄤˊ",
    explanation: "傍晚快要下山的太陽，把天空染成橘紅色和金色，是一天中最溫柔的風景。"
  },
  "鼓掌": {
    word: "鼓掌",
    emoji: "👏",
    pinyin: "gǔ zhǎng",
    zhuyin: "ㄍㄨˇ ㄓㄤˇ",
    explanation: "兩隻手用力拍在一起發出響亮的聲音，用來稱讚別人「你好棒！」"
  },
  "零件": {
    word: "零件",
    emoji: "🔩",
    pinyin: "líng jiàn",
    zhuyin: "ㄌㄧㄥˊ ㄐㄧㄢˋ",
    explanation: "組裝機器時用到的一個個小部件，就像積木一樣，拼在一起就能變成厲害的作品！"
  }
};