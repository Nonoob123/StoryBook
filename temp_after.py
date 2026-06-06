import sys
sys.stdout.reconfigure(encoding='utf-8')
text = open(r'C:\Users\USER\Documents\agnes_project\book_grassland.html', 'r', encoding='utf-8').read()
# Get the script content after scenesData
idx = text.find('const scenesData')
script = text[idx:]
# Find the part after scenesData array ends
arr_end = script.find('];')
after_array = script[arr_end+2:arr_end+4000]
print('After array:')
print(after_array[:3000])
