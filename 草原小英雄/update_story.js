const fs = require('fs');
const indexHtml = fs.readFileSync('C:/Users/USER/Documents/agnes_project/草原小英雄/index.html', 'utf8');

const storyPages = [
  { num: 1, image: 'scene01_grassland_friends.png', text: '<p class=\"narration\">在一片遼闊美麗的大草原上住著一隻小羊波波和一隻小駱駝朵朵。</p><p class=\"narration\">波波是一隻可愛的小羊，朵朵是一隻溫柔的小駱駝，他們是彼此最好的朋友。</p>' },
  { num: 2, image: 'scene02_eagle_flying.png', text: '<p class=\"narration\">一天。</p><p class=\"narration\">波波看見老鷹在天空翱翔，翅膀張得大大的，輕鬆自在地乘著風滑過藍天。</p>' },
  { num: 3, image: 'scene03_wish_to_fly.png', text: '<p class=\"narration\">羨慕地說：</p><p class=\"dialog-sheep\">「要是我也會飛就好了。」</p><p class=\"narration\">波波望著天空，心裡充滿了羨慕與夢想。</p>' },
  { num: 4, image: 'scene04_first_failure.png', text: '<p class=\"narration\">於是，他開始發明飛行器。</p><p class=\"narration\">第一天，他用樹枝和樹葉做了一架小飛機。結果剛飛起來就掉下來了。</p><p class=\"narration\">第一天，失敗了。</p>' },
  { num: 5, image: 'scene05_second_failure.png', text: '<p class=\"narration\">第二天，他又用竹子和布做了一個新的飛行器。</p><p class=\"narration\">結果飛到一半又壞掉了。</p><p class=\"narration\">第二天，還是失敗了。</p>' },
  { num: 6, image: 'scene06_third_failure.png', text: '<p class=\"narration\">第三天，波波沒有放棄，繼續嘗試。</p><p class=\"narration\">可是，第三天還是失敗了。</p><p class=\"narration\">波波看著一堆壞掉的零件，有點沮喪。</p>' },
  { num: 7, image: 'scene07_leaves_wings.png', text: '<p class=\"narration\">有一次，他用大樹的樹葉做翅膀，綁在自己的手臂上。</p><p class=\"narration\">結果剛跳起來就摔進草堆裡，滿身都是草屑。</p><p class=\"narration\">大家都笑了。</p>' },
  { num: 8, image: 'scene08_balloons_mud.png', text: '<p class=\"narration\">有一次，他綁了十幾顆五顏六色的氣球。</p><p class=\"narration\">結果被大風吹得飛起來，卻被吹進泥巴坑裡。</p><p class=\"narration\">波波全身都是泥巴，大家笑得更厲害了。</p>' },
  { num: 9, image: 'scene09_others_laugh.png', text: '<p class=\"narration\">大家都笑了。</p><p class=\"narration\">甚至有人說：</p><p class=\"narration\">「別試了，你不可能成功的。」</p><p class=\"narration\">波波有點難過，耳朵都垂了下來。</p>' },
  { num: 10, image: 'scene10_continue_research.png', text: '<p class=\"narration\">但波波並沒有真正難過太久。</p><p class=\"narration\">他回到自己的小工作間，繼續研究飛行器。</p><p class=\"narration\">朵朵則一直陪著他。</p>' },
  { num: 11, image: 'scene11_camel_helps.png', text: '<p class=\"narration\">朵朵幫波波畫圖，把他想到的設計都畫下來。</p><p class=\"dialog-camel\">我來幫你畫圖，這樣就不會忘記好點子了。</p><p class=\"narration\">朵朵認真地幫忙畫著每一個設計圖。</p>' },
  { num: 12, image: 'scene12_record_failures.png', text: '<p class=\"narration\">朵朵幫忙測試每一個小零件。</p><p class=\"narration\">朵朵還幫忙記錄每一次失敗的原因。</p><p class=\"dialog-camel\">這次是重心不對，下次調整一下應該就可以。</p><p class=\"narration\">每一次失敗，朵朵都幫波波找出問題所在。</p>' },
  { num: 13, image: 'scene13_hundredth_experiment.png', text: '<p class=\"narration\">終於，在第一百次實驗時。</p><p class=\"narration\">波波做出了一架精緻的小滑翔翼。</p><p class=\"narration\">這一次，他用輕便的木材做骨架，用柔軟的布做機翼。</p>' },
  { num: 14, image: 'scene14_glider_flight.png', text: '<p class=\"narration\">雖然只飛了短短幾秒鐘。</p><p class=\"narration\">卻真的離開了地面！在空中飛了一小段距離。</p><p class=\"dialog-sheep\">成功了！我真的飛起來了！</p>' },
  { num: 15, image: 'scene15_success_celebration.png', text: '<p class=\"narration\">波波激動得跳了起來。</p><p class=\"narration\">「成功了！」</p><p class=\"narration\">大家都跑來鼓掌，草原上充滿了歡呼和歡笑聲。</p>' },
  { num: 16, image: 'scene16_worth_it_question.png', text: '<p class=\"narration\">有人問：</p><p class=\"narration\">「第一百次才成功，值得嗎？」</p><p class=\"narration\">波波想了想，臉上浮現出溫暖的笑容。</p>' },
  { num: 17, image: 'scene17_wisdom_answer.png', text: '<p class=\"dialog-sheep\">笑著回答：</p><p class=\"dialog-sheep\">其實我不是第一百次才成功。</p><p class=\"dialog-sheep\">前面九十九次，我都學會了一件新事情。</p><p class=\"narration\">波波的眼裡閃耀著自信的光芒。</p>' },
  { num: 18, image: 'scene18_sunset_friends.png', text: '<p class=\"dialog-camel\">朵朵豎起大拇指：</p><p class=\"dialog-camel\">所以你早就在進步了。</p><p class=\"narration\">夕陽下，兩位好朋友看著滑翔翼，笑得特別開心。</p><p class=\"narration\">草原被染成了一片金黃，溫暖而美好。</p>' }
];

const scenesDataMatch = indexHtml.match(/const scenesData = \[.*?\];/s);
if (!scenesDataMatch) { console.error('No scenesData found'); process.exit(1); }
let newHtml = indexHtml.replace(scenesDataMatch[0], 'const scenesData = ' + JSON.stringify(storyPages) + ');');

newHtml = newHtml.replace(/<title>.*?<\/title>/, '<title>草原小英雄</title>');
newHtml = newHtml.replace(/<h1>.*?<\/h1>/, '<h1>🐑 <span class=\"rainbow-text\">草原小英雄</span> 🐪</h1>');
newHtml = newHtml.replace(/rainbowSeedPage/g, 'grasslandHeroPage');
newHtml = newHtml.replace(/rainbowSeedLastPage/g, 'grasslandHeroLastPage');
newHtml = newHtml.replace(/rainbowSeed/g, 'grasslandHero');

const endingMatch = newHtml.match(/<div class=\"ending-page\" id=\"endingPage\">[\s\S]*?<\/div>/);
if (endingMatch) {
  const newEnding = '<div class=\"ending-page\" id=\"endingPage\">\n\n\n    <h2>🌟 <span class=\"rainbow-text\">故事的寓意</span>🌟</h2>\n\n\n    <p>失敗不是白費力氣，而是成功路上的學習和累積。</p>\n\n\n    <p>每一次跌倒，都讓你離成功更近一步。</p>\n\n\n    <button class=\"start-btn\" id=\"replayBtn\">再閱一次 🙌</button>\n\n\n  </div>';
  newHtml = newHtml.replace(endingMatch[0], newEnding);
}

fs.writeFileSync('C:/Users/USER/Documents/agnes_project/草原小英雄/index.html', newHtml, 'utf8');
console.log('Done! Total pages: ' + storyPages.length);
