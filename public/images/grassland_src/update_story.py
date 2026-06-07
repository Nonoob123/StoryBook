# -*- coding: utf-8 -*-
import json
import os

BASE = os.path.dirname(os.path.abspath(__file__))
index_path = os.path.join(BASE, 'index.html')
scenes_path = os.path.join(BASE, 'scenes.json')

with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

with open(scenes_path, 'r', encoding='utf-8') as f:
    scenes = json.load(f)

# Build story text map
stories = {
    1: '<p class=\"narration\">��һƬ寬阔美丽的大草原上住着一只尖羊波波和一只尖驼朵朵�?</p>\n<p class=\"narration\">波波是一可爱的尖羊，朵朵是一可爱的尖驼，他们是彼此最好的朋友�?</p>',
    2: '<p class=\"narration\">一天�?</p>\n<p class=\"narration\">波波看见老雄在天空俊翔双翼张得大大的�?</p>',
    3: '<p class=\"narration\">波波看见老雄在天空俊翔双翼张得大大的，轻松自在地乘着风滑过蓝天�?</p>',
}

# Simplified approach - just write scenes data and keep HTML structure
story_pages = []
for s in scenes:
    num = s['num']
    img = s['filename']
    story_pages.append({
        'image': img,
        'text': '<p class=\"narration\">[Scene ' + str(num) + ']</p>'
    })

# Replace scenesData
sd_start = html.find('const scenesData = [')
if sd_start < 0:
    print('ERROR: Could not find scenesData')
    exit(1)

new_scenes_json = json.dumps(story_pages, ensure_ascii=False)
html = html[:sd_start] + 'const scenesData = ' + new_scenes_json + '];' + html[sd_start + len('const scenesData = [];'):]

# Replace localStorage keys
html = html.replace('rainbowSeedPage', 'grasslandHeroPage')
html = html.replace('rainbowSeedLastPage', 'grasslandHeroLastPage')

# Save
output_path = os.path.join(BASE, 'index.html')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated scenes data placeholder (' + str(len(story_pages)) + ' pages)')
print('Replaced localStorage keys')
