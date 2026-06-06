# -*- coding: utf-8 -*-
import codecs

html = u'''<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>�����Ͷ��Ĺ���</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&family=Noto+Sans+TC:wght@400;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Noto Sans TC',sans-serif;background:linear-gradient(135deg,#fce4ec 0%,#f3e5f5 50%,#e8eaf6 100%);min-height:100vh;overflow-x:hidden}
h1{font-family:'Noto Serif TC',serif;font-size:2.2em;color:#333;text-align:center;margin-top:60px;margin-bottom:10px}
.subtitle{text-align:center;color:#666;font-size:1.1em;margin-bottom:40px}
.rainbow-text{background:linear-gradient(90deg,#f44336,#ff9800,#ffeb3b,#4caf50,#2196f3,#3f51b5,#9c27b0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:700}
.book-selector{display:flex;flex-wrap:wrap;gap:30px;justify-content:center;padding:20px;max-width:1000px;margin:0 auto}
.book-card{background:white;border-radius:25px;box-shadow:0 15px 35px rgba(0,0,0,0.1);padding:40px 30px;width:320px;text-align:center;cursor:pointer;transition:all 0.3s ease;border:3px solid transparent}
.book-card:hover{transform:translateY(-8px);box-shadow:0 20px 50px rgba(0,0,0,0.15);border-color:#667eea}
.book-icon{font-size:4em;margin-bottom:20px}
.book-card h2{font-family:'Noto Serif TC',serif;color:#333;margin-bottom:15px;font-size:1.6em}
.book-card p{color:#666;font-size:1em;line-height:1.8}
.footer{text-align:center;padding:60px 20px 30px;color:#999;font-size:0.9em}
</style>
</head>
<body>
<h1>📂 <span class="rainbow-text">波波咱朵朵的故事�</span>📋</h1>
<p class="subtitle">选择你想阅�的故�</p>
<div class="book-selector">
<div class="book-card" onclick="window.location.href='book1.html'">
<div class="book-icon">🍧</div>
<h2>彩虹种子</h2>
<p>波波咱朵�在森林里发现了一颗神奇的种子，他�一起照餝它，看着它长成美丽的彩虹树。�p>
</div>
<div class="book-card" onclick="window.location.href='book2.html'">
<div class="book-icon">😂</div>
<h2>草原小英�</h2>
<p>小羊波波梦想飞翼，在小验驼茶朵朵的伴随下，经过一百�试验，终于做出了滑翔翼。�p>
</div>
</div>
<div class="footer">版权所� © 2026 波波咱朵�</div>
</body>
</html>'''

with codecs.open('C:/Users/USER/Documents/agnes_project/deploy/index.html', 'w', 'utf-8') as f:
    f.write(html)
print('Written deploy/index.html with UTF-8 encoding')
