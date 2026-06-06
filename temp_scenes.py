import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\USER\Documents\agnes_project\彩虹種子\scenes.json', 'r', encoding='utf-8') as f:
    scenes = json.load(f)
print('Number of scenes:', len(scenes))
for i, s in enumerate(scenes[:3]):
    print(f'Scene {i}: image={s["image"]}')
    print(f'  text preview: {s["text"][:80]}')
print('...')
for s in scenes[-2:]:
    print(f'Scene: image={s["image"]}')
    print(f'  text preview: {s["text"][:80]}')
