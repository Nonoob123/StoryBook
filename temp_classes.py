import sys
sys.stdout.reconfigure(encoding='utf-8')
text = open(r'C:\Users\USER\Documents\agnes_project\book_grassland.html', 'r', encoding='utf-8').read()
# Find all class attributes with 'scene' in them
import re
classes = re.findall(r'class="([^"]*scene[^"]*)"', text)
print('Scene classes:', classes)
classes2 = re.findall(r'class="([^"]*)"', text)
unique = set(classes2)
print('All unique classes:')
for c in sorted(unique):
    print('  ' + c)
