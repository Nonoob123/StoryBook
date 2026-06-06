import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\USER\Documents\agnes_project\彩虹種子\scenes.json', 'r', encoding='utf-8') as f:
    scenes = json.load(f)
print('Number of scenes:', len(scenes))
print('First scene keys:', list(scenes[0].keys()))
for i, s in enumerate(scenes[:3]):
    print(f'Scene {i}:')
    for k,v in s.items():
        print(f'  {k}: {str(v)[:80]}')
