import sys
sys.stdout.reconfigure(encoding='utf-8')
text = open(r'C:\Users\USER\Documents\agnes_project\book_grassland.html', 'r', encoding='utf-8').read()
# Find key sections
print('SCRIPT content (first 3000 chars):')
idx = text.find('<script')
print(text[idx:idx+3000])
