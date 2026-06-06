import sys
sys.stdout.reconfigure(encoding='utf-8')
text = open(r'C:\Users\USER\Documents\agnes_project\book_grassland.html', 'r', encoding='utf-8').read()
# Get the CSS section
idx = text.find('<style')
end = text.find('</style>')
css = text[idx:end+8]
print(css[:5000])
