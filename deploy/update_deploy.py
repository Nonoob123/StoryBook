# -*- coding: utf-8 -*-
import os

BASE = os.path.dirname(os.path.abspath(__file__))
deploy_html = os.path.join(BASE, 'index.html')

with open(deploy_html, 'r', encoding='utf-8') as f:
    html = f.read()

# Add book selector CSS before </style>
selector_css = '''

.book-selector{display:flex;flex-wrap:wrap;gap:20px;justify-content:center;padding:40px 20px}
.book-card{background:white;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.1);padding:30px;width:280px;text-align:center;cursor:pointer;transition:all 0.3s ease;border:2px solid transparent}
.book-card:hover{transform:translateY(-5px);box-shadow:0 15px 40px rgba(0,0,0,0.2);border-color:#667eea}
.book-card h2{font-family:'Noto Serif TC',serif;color:#333;margin-bottom:10px;font-size:1.5em}
.book-card p{color:#666;font-size:0.95em;line-height:1.6}
.book-card .book-icon{font-size:3em;margin-bottom:15px}
body.dark-mode .book-card{background:#2d2d44}
body.dark-mode .book-card h2{color:#e0e0e0}
body.dark-mode .book-card p{color:#aaa}
'''
html = html.replace('</style>', selector_css + '</style>')

# Find and replace the title page
import re

# Find the titlePage div
match = re.search(r'(<div class="book-page active" id="titlePage">.*?</div>)', html, re.DOTALL)
if match:
    old_div = match.group(1)
    new_div = '''<div class="book-page active" id="titlePage">


    <h1>📂 <span class="rainbow-text">波波咱朵朵的故事�</span>📋</h1>


    <p style="font-size:1.1em;color:#666;margin:20px 0">选择你想阅�的故�</p>


    <div class="book-selector">


      <div class="book-card" onclick="window.location.href='彩虹种子/index.html'">


        <div class="book-icon">🍧</div>


        <h2>彩虹种子</h2>


        <p>波波咱朵�在森林里发现了一颗神奇的种子，他�一起照餝它，看着它长成美丽的彩虹树。�p>


      </div>


      <div class="book-card" onclick="window.location.href='草原小英�/index.html'">


        <div class="book-icon">😂</div>


        <h2>草原小英�</h2>


        <p>小羊波波梦想飞翼，在小验驼茶朵朵的伴随下，经过一百�试验，终于做出了滑翔翼。�p>


      </div>


    </div>


  </div>'''
    html = html.replace(old_div, new_div)

    # Update title
    html = html.replace('<title>草原小英�</title>', '<title>波波咱朵朵的故事�</title>')
    
    # Update favicon
    html = html.replace('😭%3C', '📂%3C')

    with open(deploy_html, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print('Updated deploy/index.html with book selector')
else:
    print('Could not find titlePage div')
