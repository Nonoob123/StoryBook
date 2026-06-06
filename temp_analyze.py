import sys, re
sys.stdout.reconfigure(encoding='utf-8')
text = open(r'C:\Users\USER\Documents\agnes_project\book_grassland.html', 'r', encoding='utf-8').read()
print('Grassland size:', len(text))
m = re.search(r'<title>(.*?)</title>', text)
print('Title:', m.group(1))
buttons = re.findall(r'<button[^>]*>(.*?)</button>', text, re.DOTALL)
for i, content in enumerate(buttons):
    clean = re.sub(r'\s+', ' ', content.strip())[:80]
    print(f'  Button {i}: [{clean}]')
images = re.findall(r'src="(.*?\.png)"', text)
for img in images[:5]:
    print(f'  Image: {img}')
scenes = text.count('data-scene-index')
print('Scene markers:', scenes)
