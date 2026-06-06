var fs = require('fs');
var path = require('path');

var deployPath = 'C:\\\\Users\\\\USER\\\\Documents\\\\agnes_project\\\\deploy\\\\index.html';
var html = fs.readFileSync(deployPath, 'utf8');

var bookSelectorCSS = '\\n.book-selector{display:flex;flex-wrap:wrap;gap:20px;justify-content:center;padding:40px 20px}\\n.book-card{background:white;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.1);padding:30px;width:280px;text-align:center;cursor:pointer;transition:all 0.3s ease;border:2px solid transparent}\\n.book-card:hover{transform:translateY(-5px);box-shadow:0 15px 40px rgba(0,0,0,0.2);border-color:#667eea}\\n.book-card h2{font-family:\\'Noto Serif TC\\',serif;color:#333;margin-bottom:10px;font-size:1.5em}\\n.book-card p{color:#666;font-size:0.95em;line-height:1.6}\\n.book-card .book-icon{font-size:3em;margin-bottom:15px}\\nbody.dark-mode .book-card{background:#2d2d44}\\nbody.dark-mode .book-card h2{color:#e0e0e0}\\nbody.dark-mode .book-card p{color:#aaa}\\n';

html = html.replace('</style>', bookSelectorCSS + '</style>');

var oldTitlePage = '<div class="book-page active" id="titlePage">\\n\\n\\n    <h1>😚 <span class="rainbow-text">草原小英�</span>😣</h1>\\n\\n\\n    <p style="font-size:1.2em;color:#666;margin:20px 0">波波和朵朵的冒险故事</p>\\n\\n\\n    <button class="start-btn" id="startBtn">开始�阅�😟</button>\\n\\n\\n  </div>';

var newTitlePage = '<div class="book-page active" id="titlePage">\\n\\n\\n    <h1>📂 <span class="rainbow-text">波波咱朵朵的故事�</span>📋</h1>\\n\\n\\n    <p style="font-size:1.1em;color:#666;margin:20px 0">选择你想阅�的故�</p>\\n\\n\\n    <div class="book-selector">\\n\\n\\n      <div class="book-card" onclick="window.location.href=\\'彩虹种子/index.html\\'">\\n\\n\\n        <div class="book-icon">🍧</div>\\n\\n\\n        <h2>彩虹种子</h2>\\n\\n\\n        <p>波波咱朵�在森林里发现了一颗神奇的种子，他�一起照餝它，看着它长成美丽的彩虹树。�p>\\n\\n\\n      </div>\\n\\n\\n      <div class="book-card" onclick="window.location.href=\\'草原小英�/index.html\\'">\\n\\n\\n        <div class="book-icon">😂</div>\\n\\n\\n        <h2>草原小英�</h2>\\n\\n\\n        <p>小羊波波梦想飞翼，在小验驼茶朵朵的伴随下，经过一百�试验，终于做出了滑翔翼。�p>\\n\\n\\n      </div>\\n\\n\\n    </div>\\n\\n\\n  </div>';

html = html.replace(oldTitlePage, newTitlePage);

fs.writeFileSync(deployPath, html, 'utf8');
console.log('Updated deploy/index.html with book selection page');
