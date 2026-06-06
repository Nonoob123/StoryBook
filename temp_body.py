import sys
sys.stdout.reconfigure(encoding='utf-8')
text = open(r'C:\Users\USER\Documents\agnes_project\book_grassland.html', 'r', encoding='utf-8').read()
# Get the HTML body structure
idx_start = text.find('<body')
print(text[idx_start:idx_start+5000])
