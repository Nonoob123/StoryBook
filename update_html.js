
const fs = require('fs');
const html = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>波波和朵朵的彩虹種子</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&family=Noto+Sans+TC:wght@400;700&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Noto Sans TC', sans-serif;
  background: linear-gradient(135deg, #fce4ec 0%, #f3e5f5 50%, #e8eaf6 100%);
  min-height: 100vh;
  overflow-x: hidden;
}
.book-container { max-width: 900px; margin: 0 auto; padding: 20px; }

/* Control panel - music + volume */
.control-panel {
  position: fixed; top: 20px; right: 20px; z-index: 1000;
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,0.92); border: 2px solid #e0d4f5;
  border-radius: 30px; padding: 8px 16px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}
.control-btn {
  background: none; border: none; font-size: 1.4em;
  cursor: pointer; padding: 4px 8px; border-radius: 50%;
  transition: all 0.3s ease;
}
.control-btn:hover { background: rgba(102,126,234,0.15); transform: scale(1.1); }
.control-btn.playing { animation: pulse 2s infinite; }
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(102,126,234,0.4); }
  50% { box-shadow: 0 0 0 8px rgba(102,126,234,0); }
}
.volume-slider {
  width: 70px; height: 4px; -webkit-appearance: none; appearance: none;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px; outline: none; cursor: pointer;
}
.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 14px; height: 14px;
  background: #764ba2; border-radius: 50%; cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}
.volume-slider::-moz-range-thumb {
  width: 14px; height: 14px; background: #764ba2;
  border-radius: 50%; cursor: pointer; border: none;
}

/* Page jump */
.page-jump {
  position: fixed; bottom: 20px; right: 20px; z-index: 1000;
  display: flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.92); border: 2px solid #e0d4f5;
  border-radius: 25px; padding: 8px 16px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}
.page-jump label { font-size: 0.85em; color: #666; white-space: nowrap; }
.page-jump input {
  width: 45px; text-align: center; border: 1px solid #ddd;
  border-radius: 12px; padding: 4px 2px; font-size: 0.9em;
  font-family: 'Noto Sans TC', sans-serif;
}
.page-jump button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white; border: none; border-radius: 15px;
  padding: 4px 14px; font-size: 0.85em; cursor: pointer;
  font-family: 'Noto Sans TC', sans-serif;
  transition: all 0.3s ease;
}
.page-jump button:hover { transform: translateY(-1px); }

/* Voice reading button */
.voice-btn {
  position: fixed; bottom: 20px; right: 180px; z-index: 1000;
  background: rgba(255,255,255,0.92); border: 2px solid #e0d4f5;
  border-radius: 25px; padding: 8px 18px;
  font-size: 0.9em; cursor: pointer;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  display: flex; align-items: center; gap: 6px;
  font-family: 'Noto Sans TC', sans-serif;
  transition: all 0.3s ease;
}
.voice-btn:hover { transform: scale(1.05); }
.voice-btn.reading { background: linear-gradient(135deg, #667eea, #764ba2); color: white; border-color: #764ba2; }

.title-page {
  text-align: center; padding: 60px 20px; min-height: 100vh;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  background: linear-gradient(180deg, #fff9c4 0%, #ffecb3 50%, #ffe0b2 100%);
  border-radius: 20px; margin-bottom: 20px;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); opacity: 1; } }
@keyframes fadeInText { from { opacity: 0; } to { opacity: 1; } }
.title-page h1 {
  font-family: 'Noto Serif TC', serif; font-size: 3em; color: #e65100;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; animation: bounceIn 1s ease-in;
}
.title-page .subtitle { font-size: 1.2em; color: #6d4c41; margin-bottom: 40px; }
.title-page .rainbow-text {
  background: linear-gradient(90deg, #f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #3f51b5, #9c27b0);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.start-btn {
  background: linear-gradient(135deg, #ff6f00, #ff8f00); color: white; border: none;
  padding: 15px 50px; font-size: 1.3em; border-radius: 50px; cursor: pointer;
  box-shadow: 0 4px 15px rgba(255,111,0,0.3); transition: all 0.3s ease; font-family: 'Noto Sans TC', sans-serif;
}
.start-btn:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(255,111,0,0.4); }
.continue-btn {
  background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none;
  padding: 10px 30px; font-size: 1em; border-radius: 25px; cursor: pointer;
  margin-top: 15px; transition: all 0.3s ease; font-family: 'Noto Sans TC', sans-serif;
}
.continue-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(102,126,234,0.4); }
.continue-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.book-page {
  display: none; background: white; border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1); overflow: hidden; margin-bottom: 20px; animation: fadeIn 0.5s ease-in;
}
.book-page.active { display: block; }
.page-image-container { width: 100%; position: relative; overflow: hidden; cursor: pointer; }
.page-image-container img { width: 100%; height: auto; display: block; transition: transform 0.3s ease; }
.page-image-container:hover img { transform: scale(1.02); }
.page-content { padding: 30px; }
.page-number {
  position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.9);
  padding: 5px 15px; border-radius: 20px; font-size: 0.9em; color: #666; z-index: 10;
}
.story-text {
  font-family: 'Noto Serif TC', serif; font-size: 1.3em; line-height: 2; color: #333; margin-bottom: 30px;
}
.story-text p { margin-bottom: 15px; opacity: 0; animation: fadeInText 0.5s ease forwards; }
.story-text p:nth-child(1) { animation-delay: 0.1s; }
.story-text p:nth-child(2) { animation-delay: 0.2s; }
.story-text p:nth-child(3) { animation-delay: 0.3s; }
.story-text p:nth-child(4) { animation-delay: 0.4s; }
.story-text p:nth-child(5) { animation-delay: 0.5s; }
.story-text p:nth-child(6) { animation-delay: 0.6s; }
.dialog-rabbit {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb); border-left: 4px solid #2196f3;
  padding: 15px 20px; margin: 15px 0; border-radius: 0 10px 10px 0; font-weight: 700; color: #1565c0;
}
.dialog-squirrel {
  background: linear-gradient(135deg, #fff3e0, #ffe0b2); border-left: 4px solid #ff9800;
  padding: 15px 20px; margin: 15px 0; border-radius: 0 10px 10px 0; font-weight: 700; color: #e65100;
}
.narration { font-style: italic; color: #666; padding-left: 10px; }
.page-navigation {
  display: flex; align-items: center; gap: 15px; padding: 20px 30px;
  background: #fafafa; border-top: 1px solid #f0f0f0;
}
.nav-btn {
  background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none;
  padding: 10px 25px; font-size: 1em; border-radius: 20px; cursor: pointer;
  font-family: 'Noto Sans TC', sans-serif; transition: all 0.3s ease;
}
.nav-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(102,126,234,0.4); }
.nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.progress-bar {
  flex: 1; height: 6px; background: #e0e0e0; border-radius: 3px; overflow: hidden;
}
.progress-fill {
  height: 100%; background: linear-gradient(90deg, #667eea, #764ba2);
  width: 0%; transition: width 0.3s ease;
}
.ending-page {
  display: none; text-align: center; padding: 80px 20px; min-height: 80vh;
  background: linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 50%, #fff9c4 100%);
  border-radius: 20px; margin-bottom: 20px;
}
.ending-page h2 { font-family: 'Noto Serif TC', serif; font-size: 2.5em; color: #2e7d32; margin-bottom: 20px; }
.ending-page p { font-size: 1.2em; color: #555; margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.8; }
.ending-page .rainbow-text {
  background: linear-gradient(90deg, #f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #3f51b5, #9c27b0);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 700;
}
.modal {
  display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.9); z-index: 2000; justify-content: center; align-items: center;
}
.modal.active { display: flex; }
.modal img { max-width: 90%; max-height: 90%; border-radius: 10px; }
.story-text p.reading-highlight {
  background: rgba(102,126,234,0.12);
  border-radius: 8px;
  padding: 5px 10px;
  transition: background 0.3s ease;
}
</style>
</head>
<body>

<div class="control-panel">
  <button class="control-btn" id="musicToggle" title="播放/暫停背景音樂">🎵</button>
  <span style="font-size:0.9em;">🔈</span>
  <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="30">
  <span id="volumeLabel" style="font-size:0.8em;color:#888;min-width:30px;">30%</span>
</div>

<div class="page-jump">
  <label>跳至第</label>
  <input type="number" id="pageInput" min="1" max="19" value="1">
  <label>頁</label>
  <button onclick="jumpToPage()">跳轉</button>
</div>

<button class="voice-btn" id="voiceBtn" title="朗讀當頁內容">🔊 朗讀</button>

<div class="book-container">
  <div class="title-page" id="titlePage">
    <h1>🌈 <span class="rainbow-text">波波和朵朵的彩虹種子</span> 🌈</h1>
    <p class="subtitle">一個關於耐心、友誼和团队合作的美好故事</p>
    <button class="start-btn" id="startBtn">開始閱讀 ✨</button>
    <button class="continue-btn" id="continueBtn" disabled>繼續上次閱讀</button>
  </div>

  <div id="pagesContainer"></div>

  <div class="ending-page" id="endingPage">
    <h2>🌈 完 🌈</h2>
    <p>謝謝你閱讀這個故事！<br>就像波波和朵朵一樣，<br>只要我們有耐心、願意付出愛心，<br>就能創造出屬於自己的<span class="rainbow-text">彩虹</span>。</p>
    <p>— 完 —</p>
    <button class="start-btn" id="replayBtn">再讀一次 📖</button>
  </div>
</div>

<div class="modal" id="imageModal">
  <img id="modalImage" src="" alt="放大圖片">
</div>

<script>
var pages = [
  {
    image: 'scene01_forest_friends.png',
    text: '<p class="dialog-rabbit">你好我是波波一隻喜歡挖洞的小白兔。</p><p class="dialog-squirrel">嗨我是朵朵一隻喜歡收集堅果的小松鼠。</p><p class="narration">在一片美麗的森林裡，波波和朵朵成為了最好的朋友。他們每天一起玩耍，一起探索森林裡的每一個角落。</p>'
  },
  {
    image: 'scene02_discovering_seed.png',
    text: '<p class="narration">有一天，波波在森林裡發現了一顆發光的種子！</p><p class="dialog-rabbit">看這顆種子會發光耶它一定是什麼神奇的東西！</p><p class="dialog-squirrel">哇真的好好看我們把它帶回去吧！</p>'
  },
  {
    image: 'scene03_rainbow_seed_legend.png',
    text: '<p class="dialog-rabbit">我听爺爺說過彩虹種子是一種神奇的種子！</p><p class="dialog-squirrel">真的嗎它會長成什麼样子呢？</p><p class="narration">兔子的爺爺曾經告訴他，彩虹種子非常稀有，只有最善良、最有耐心的動物才能找到它。傳說中，彩虹種子會長成一棵結出彩虹色果實的大樹！</p>'
  },
  {
    image: 'scene04_planting_seed.png',
    text: '<p class="narration">波波和朵朵決定一起種下這顆神奇的種子。</p><p class="dialog-rabbit">我們要把最好的地方留給它！</p><p class="dialog-squirrel">對這裡陽光充足土壤也很鬆軟！</p><p class="narration">他們小心翼翼地挖了一個小洞，把彩虹種子放了進去，然後輕輕地蓋上泥土。</p>'
  },
  {
    image: 'scene05_early_check.png',
    text: '<p class="narration">第二天一早，波波就迫不及待地跑去看種子。</p><p class="dialog-rabbit">怎麼還沒有長出來呢？</p><p class="narration">可是土壤裡面什麼都沒有。波波急得像熱鍋上的螞蟻。</p>'
  },
  {
    image: 'scene06_impatient_wait.png',
    text: '<p class="dialog-rabbit">為什麼種子還是不長出來啊我都等了整整一晚！</p><p class="dialog-squirrel">別急別急植物生長需要時間的！</p><p class="narration">朵朵盡力安慰著焦急的波波，可是波波還是很不耐煩。</p>'
  },
  {
    image: 'scene07_grandpa_turtle.png',
    text: '<p class="narration">就在這個時候，一隻戴著老花眼鏡的老龜慢悠悠地走來了。</p><p class="dialog-turtle" style="background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:4px solid #4caf50;padding:15px 20px;margin:15px 0;border-radius:0 10px 10px 0;font-weight:700;color:#2e7d32;">你好小兔子你看起來很著急的樣子。</p><p class="dialog-rabbit">龜爺爺種子種下去之後為什麼還沒有長出來呢？</p>'
  },
  {
    image: 'scene08_patience_lesson.png',
    text: '<p class="dialog-turtle" style="background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:4px solid #4caf50;padding:15px 20px;margin:15px 0;border-radius:0 10px 10px 0;font-weight:700;color:#2e7d32;">孩子萬物生長都需要時間。太陽需要時間升起雨滴需要時間落下種子也需要時間發芽。</p><p class="dialog-turtle" style="background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:4px solid #4caf50;padding:15px 20px;margin:15px 0;border-radius:0 10px 10px 0;font-weight:700;color:#2e7d32;">只要你每天用心照顧它它一定會給你看見奇迹的。</p><p class="narration">波波和朵朵點點頭，他們明白了耐心的重要性。</p>'
  },
  {
    image: 'scene09_caring_daily.png',
    text: '<p class="narration">從那天起，波波和朵朵每天都仔細照顧這片土地。</p><p class="dialog-rabbit">來我來澆水！</p><p class="dialog-squirrel">那我来鬆土！</p><p class="narration">他們輪流工作，從不喊累。太陽出來時他們為種子遮陰，風大的時候他們用樹葉保護它。</p>'
  },
  {
    image: 'scene10_big_wind.png',
    text: '<p class="narration">有一天晚上，森林裡突然颳起了大風。</p><p class="dialog-rabbit">不好我們的種子會被吹走的！</p><p class="dialog-squirrel">快我們要去保護它！</p><p class="narration">波波和朵朵冒著大雨跑去保護種子的土地。他們緊緊抱在一起，希望能為種子擋住風雨。</p>'
  },
  {
    image: 'scene11_leaves_protection.png',
    text: '<p class="dialog-squirrel">我有辦法！</p><p class="narration">朵朵趕緊收集了許多大樹葉，輕輕地蓋在種子的土地上。</p><p class="dialog-rabbit">這樣就不怕風了！</p><p class="narration">在波波和朵朵的共同努力下，種子安然度過了一個暴風雨之夜。</p>'
  },
  {
    image: 'scene12_carrying_water.png',
    text: '<p class="narration">幾天過後，天氣變得非常乾旱。</p><p class="dialog-rabbit">土地都快裂開了我去找水！</p><p class="narration">波波每天跑很遠的路去取水，雖然很累，但他從不放棄。</p><p class="dialog-squirrel">波波你也太辛苦了吧！</p><p class="dialog-rabbit">為了我們的種子這都不算什麼！</p>'
  },
  {
    image: 'scene13_sprout_emerges.png',
    text: '<p class="narration">終於有一天清晨，一個小小的嫩芽從土地裡冒了出來！</p><p class="dialog-rabbit">哇長出來了長出來了！</p><p class="dialog-squirrel">太棒了我們終於等到了！</p><p class="narration">波波和朵朵開心得又跳又叫，眼淚都流了出來。他們的努力終於有了回報！</p>'
  },
  {
    image: 'scene14_tree_growing.png',
    text: '<p class="narration">在波波和朵朵的精心照顧下，小樹苗一天天長大。</p><p class="narration">春天過去了，夏天來到了。樹苗長成了小樹，小樹又長成了大樹。</p><p class="dialog-rabbit">你看它比我們還要高了！</p><p class="dialog-squirrel">它會長得更大更强的！</p>'
  },
  {
    image: 'scene15_rainbow_fruits.png',
    text: '<p class="narration">終於有一天，彩虹樹開花了！而且開出了彩虹色的果實！</p><p class="dialog-rabbit">紅色的橙色的黃色的綠色的藍色的紫色的……</p><p class="dialog-squirrel">好美啊這一定是世界上最漂亮的樹！</p><p class="narration">每一顆果實都發著柔和的光芒，整個森林都被彩虹色的光輝籠罩著。</p>'
  },
  {
    image: 'scene16_visitors_arrive.png',
    text: '<p class="narration">這個消息很快傳遍了整個森林！</p><p class="narration">小猴子、小鹿、小刺猬，所有的小動物都跑來看這棵神奇的彩虹樹。</p><p class="dialog-monkey" style="background:linear-gradient(135deg,#fce4ec,#f8bbd0);border-left:4px solid #e91e63;padding:15px 20px;margin:15px 0;border-radius:0 10px 10px 0;font-weight:700;color:#ad1457;">哇這也太不可思議了吧！</p><p class="dialog-deer" style="background:linear-gradient(135deg,#e0f2f1,#b2dfdb);border-left:4px solid #009688;padding:15px 20px;margin:15px 0;border-radius:0 10px 10px 0;font-weight:700;color:#00695c;">我從來沒有看過這麼美麗的樹！</p><p class="narration">所有動物都為彩虹樹的美麗而感到驚嘆。</p>'
  },
  {
    image: 'scene17_arguing_credit.png',
    text: '<p class="dialog-rabbit">這棵樹是因為我才長大的我每天都澆水！</p><p class="dialog-squirrel">明明是因為我才長大的我每天都鬆土保護它！</p><p class="narration">波波和朵朵為了誰的功勞更大而吵了起來。他們誰也不讓誰，誰都觉得是自己的付出讓彩虹樹長得這麼好。</p>'
  },
  {
    image: 'scene18_turtle_wisdom.png',
    text: '<p class="dialog-turtle" style="background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:4px solid #4caf50;padding:15px 20px;margin:15px 0;border-radius:0 10px 10px 0;font-weight:700;color:#2e7d32;">孩子們這棵樹之所以能夠長得這麼好是因為你們兩個共同努力的結果。</p><p class="dialog-turtle" style="background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:4px solid #4caf50;padding:15px 20px;margin:15px 0;border-radius:0 10px 10px 0;font-weight:700;color:#2e7d32;">澆水和鬆土同樣重要沒有誰比誰更重要teamwork才是最重要的！</p><p class="narration">波波和朵朵聽了龜爺爺的話，不好意思地低下了頭。他們終於明白，只有互相合作才能創造奇迹。</p>'
  },
  {
    image: 'scene19_together_rainbow.png',
    text: '<p class="dialog-rabbit">對不起朵朵我們都是一樣的辛苦。</p><p class="dialog-squirrel">沒關係波波我們是最棒的夥伴！</p><p class="narration">從那天起，波波和朵朵更加珍惜彼此的友誼。他們知道，只要手牽手，就沒有做不到的事情。</p><p class="dialog-rabbit">我們一起種下了彩虹種子！</p><p class="dialog-squirrel">每個人都有自己的優點只要互相幫助就能創造最美的彩虹！</p>'
  }
];

var currentPage = -1;
var saveTimeout = null;
var audioCtx = null;
var backgroundMusicNodes = [];
var isMusicPlaying = false;
var currentVolume = 0.3;
var synth = window.speechSynthesis;
var isReading = false;
var currentUtterance = null;

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function createGentleMelody() {
  if (!audioCtx) initAudioContext();
  stopBackgroundMusic();

  var masterGain = audioCtx.createGain();
  masterGain.gain.value = currentVolume;
  masterGain.connect(audioCtx.destination);

  var melodyNotes = [
    261.63, 329.63, 392.00, 440.00, 523.25, 440.00,
    392.00, 329.63, 293.66, 329.63, 392.00, 440.00,
    523.25, 392.00, 329.63, 293.66, 261.63, 329.63,
    392.00, 440.00, 523.25, 659.26, 523.25, 440.00
  ];

  var noteDuration = 0.6;
  var totalNotes = melodyNotes.length;
  var loopLength = totalNotes * noteDuration;

  // Soft pad
  var padOsc1 = audioCtx.createOscillator();
  var padOsc2 = audioCtx.createOscillator();
  var padGain = audioCtx.createGain();
  var padFilter = audioCtx.createBiquadFilter();

  padOsc1.type = 'sine';
  padOsc1.frequency.value = 130.81;
  padOsc2.type = 'sine';
  padOsc2.frequency.value = 164.81;

  padFilter.type = 'lowpass';
  padFilter.frequency.value = 400;
  padGain.gain.value = 0.08;

  padOsc1.connect(padFilter);
  padOsc2.connect(padFilter);
  padFilter.connect(padGain);
  padGain.connect(masterGain);

  padOsc1.start();
  padOsc2.start();
  backgroundMusicNodes.push(padOsc1, padOsc2);

  function playLoop() {
    if (!isMusicPlaying) return;
    var now = audioCtx.currentTime;
    for (var i = 0; i < totalNotes; i++) {
      var osc = audioCtx.createOscillator();
      var noteGain = audioCtx.createGain();
      var filter = audioCtx.createBiquadFilter();
      osc.type = 'triangle';
      osc.frequency.value = melodyNotes[i];
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      var noteStart = now + i * noteDuration;
      var noteEnd = noteStart + noteDuration * 0.9;
      noteGain.gain.setValueAtTime(0, noteStart);
      noteGain.gain.linearRampToValueAtTime(0.12, noteStart + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.06, noteEnd - 0.1);
      noteGain.gain.linearRampToValueAtTime(0.001, noteEnd);
      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);
      osc.start(noteStart);
      osc.stop(noteEnd + 0.01);
      backgroundMusicNodes.push(osc);
    }
    setTimeout(playLoop, loopLength * 1000 - 100);
  }
  playLoop();
}

function startBackgroundMusic() {
  isMusicPlaying = true;
  createGentleMelody();
  document.getElementById('musicToggle').classList.add('playing');
  document.getElementById('musicToggle').textContent = '🔊';
}

function stopBackgroundMusic() {
  isMusicPlaying = false;
  backgroundMusicNodes.forEach(function(node) {
    try { node.stop(); } catch(e) { try { node.disconnect(); } catch(e2){} }
  });
  backgroundMusicNodes = [];
  document.getElementById('musicToggle').classList.remove('playing');
  document.getElementById('musicToggle').textContent = '🎵';
}

function setVolume(val) {
  currentVolume = val / 100;
  document.getElementById('volumeLabel').textContent = val + '%';
  if (isMusicPlaying && audioCtx) {
    stopBackgroundMusic();
    startBackgroundMusic();
  }
}

function getReadableText(pageIndex) {
  var page = pages[pageIndex];
  if (!page) return '';
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = page.text;
  return tempDiv.textContent || tempDiv.innerText || '';
}

function startVoiceReading(pageIndex) {
  if (isReading) {
    stopVoiceReading();
    return;
  }
  if (!synth || !synth.supported) {
    alert('您的瀏覽器不支援語音朗讀功能。');
    return;
  }
  var text = getReadableText(pageIndex);
  if (!text) return;
  isReading = true;
  document.getElementById('voiceBtn').classList.add('reading');
  document.getElementById('voiceBtn').textContent = '⏸ 暫停';
  highlightReadingPage(pageIndex);
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = 'zh-TW';
  currentUtterance.rate = 0.85;
  currentUtterance.pitch = 1.1;
  currentUtterance.volume = currentVolume;
  var voices = synth.getVoices();
  for (var i = 0; i < voices.length; i++) {
    if (voices[i].lang === 'zh-TW' || voices[i].lang === 'zh-Hant' || voices[i].lang === 'zh') {
      currentUtterance.voice = voices[i];
      break;
    }
  }
  currentUtterance.onend = function() {
    isReading = false;
    document.getElementById('voiceBtn').classList.remove('reading');
    document.getElementById('voiceBtn').textContent = '🔊 朗讀';
    clearReadingHighlight();
  };
  currentUtterance.onerror = function() {
    isReading = false;
    document.getElementById('voiceBtn').classList.remove('reading');
    document.getElementById('voiceBtn').textContent = '🔊 朗讀';
    clearReadingHighlight();
  };
  synth.speak(currentUtterance);
}

function stopVoiceReading() {
  if (synth) synth.cancel();
  isReading = false;
  document.getElementById('voiceBtn').classList.remove('reading');
  document.getElementById('voiceBtn').textContent = '🔊 朗讀';
  clearReadingHighlight();
}

function highlightReadingPage(pageIndex) {
  clearReadingHighlight();
  var pageEl = document.getElementById('page-' + pageIndex);
  if (pageEl) {
    var paragraphs = pageEl.querySelectorAll('.story-text p');
    for (var i = 0; i < paragraphs.length; i++) {
      paragraphs[i].classList.add('reading-highlight');
    }
  }
}

function clearReadingHighlight() {
  var highlights = document.querySelectorAll('.reading-highlight');
  for (var i = 0; i < highlights.length; i++) {
    highlights[i].classList.remove('reading-highlight');
  }
}

function renderPages() {
  var container = document.getElementById('pagesContainer');
  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    var pageDiv = document.createElement('div');
    pageDiv.className = 'book-page';
    pageDiv.id = 'page-' + i;
    pageDiv.innerHTML =
      '<div class="page-image-container" onclick="openModal(this)">' +
        '<span class="page-number">第 ' + (i + 1) + ' 頁</span>' +
        '<img src="' + page.image + '" alt="插圖 ' + (i + 1) + '" loading="lazy">' +
      '</div>' +
      '<div class="page-content">' +
        '<div class="story-text">' + page.text + '</div>' +
      '</div>' +
      '<div class="page-navigation">' +
        '<button class="nav-btn" onclick="prevPage()" ' + (i === 0 ? 'disabled' : '') + '>上一頁</button>' +
        '<div class="progress-bar"><div class="progress-fill" id="progress-' + i + '"></div></div>' +
        '<button class="nav-btn" onclick="nextPage()" ' + (i === pages.length - 1 ? 'disabled' : '') + '>下一頁</button>' +
      '</div>';
    container.appendChild(pageDiv);
  }
}

function updateProgress() {
  for (var i = 0; i < pages.length; i++) {
    var progressFill = document.getElementById('progress-' + i);
    if (progressFill) {
      var percent = ((currentPage + 1) / pages.length) * 100;
      progressFill.style.width = percent + '%';
    }
  }
  saveProgress();
  document.getElementById('pageInput').value = currentPage + 1;
}

function saveProgress() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(function() {
    try {
      localStorage.setItem('rainbowSeedPage', currentPage);
    } catch(e) {}
  }, 500);
}

function goToPage(pageIndex) {
  if (pageIndex >= 0) {
    document.getElementById('titlePage').style.display = 'none';
  }
  if (isReading) stopVoiceReading();
  var allPages = document.querySelectorAll('.book-page');
  for (var i = 0; i < allPages.length; i++) {
    allPages[i].classList.remove('active');
  }
  if (pageIndex >= 0 && pageIndex < pages.length) {
    document.getElementById('page-' + pageIndex).classList.add('active');
    currentPage = pageIndex;
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function nextPage() {
  if (currentPage < pages.length - 1) {
    goToPage(currentPage + 1);
  } else {
    if (isReading) stopVoiceReading();
    var allPages = document.querySelectorAll('.book-page');
    for (var i = 0; i < allPages.length; i++) {
      allPages[i].classList.remove('active');
    }
    document.getElementById('endingPage').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function prevPage() {
  if (currentPage > 0) {
    goToPage(currentPage - 1);
  }
}

function jumpToPage() {
  var input = document.getElementById('pageInput');
  var pageNum = parseInt(input.value);
  if (isNaN(pageNum) || pageNum < 1 || pageNum > pages.length) {
    input.value = currentPage + 1;
    return;
  }
  goToPage(pageNum - 1);
}

function openModal(container) {
  var img = container.querySelector('img');
  var modal = document.getElementById('imageModal');
  var modalImg = document.getElementById('modalImage');
  modalImg.src = img.src;
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('imageModal').classList.remove('active');
}

document.getElementById('musicToggle').addEventListener('click', function() {
  initAudioContext();
  if (isMusicPlaying) {
    stopBackgroundMusic();
  } else {
    startBackgroundMusic();
  }
});

document.getElementById('volumeSlider').addEventListener('input', function() {
  setVolume(parseInt(this.value));
});

document.getElementById('voiceBtn').addEventListener('click', function() {
  if (isReading) {
    stopVoiceReading();
  } else {
    startVoiceReading(currentPage);
  }
});

document.getElementById('startBtn').addEventListener('click', function() {
  goToPage(0);
});

document.getElementById('replayBtn').addEventListener('click', function() {
  document.getElementById('endingPage').style.display = 'none';
  document.getElementById('titlePage').style.display = 'flex';
  if (isReading) stopVoiceReading();
});

document.getElementById('continueBtn').addEventListener('click', function() {
  var savedPage = parseInt(localStorage.getItem('rainbowSeedPage')) || 0;
  goToPage(savedPage);
});

document.getElementById('imageModal').addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    nextPage();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prevPage();
  } else if (e.key === 'Escape') {
    closeModal();
  }
});

renderPages();

(function() {
  var savedPage = localStorage.getItem('rainbowSeedPage');
  if (savedPage !== null) {
    var saved = parseInt(savedPage);
    var btn = document.getElementById('continueBtn');
    btn.disabled = false;
    btn.textContent = '繼續上次閱讀（第' + (saved + 1) + '頁）';
  }
  document.getElementById('pageInput').max = pages.length;
})();

if (synth) {
  synth.onvoiceschanged = function() { synth.getVoices(); };
}
</script>
</body>
</html>`;

fs.writeFileSync('C:/Users/USER/Documents/agnes_project/彩虹種子/index.html', html, 'utf8');
console.log('Written ' + html.length + ' chars');
