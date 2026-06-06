import sys
sys.stdout.reconfigure(encoding='utf-8')
text = open(r'C:\Users\USER\Documents\agnes_project\book_grassland.html', 'r', encoding='utf-8').read()
idx = text.find('const scenesData')
script = text[idx:]
arr_end = script.find('];')
after_array = script[arr_end+2:]
print(after_array[3000:6000])
