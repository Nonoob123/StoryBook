import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\USER\Documents\agnes_project\book_rainbow.html', 'rb') as f:
    raw = f.read()
idx = raw.find(b'scenesData')
pre_scenes = raw[:idx]
non_ascii_pre = sorted(set(b for b in pre_scenes if b > 127))
print('Pre-scenes unique non-ASCII bytes:', [hex(b) for b in non_ascii_pre])
print('Count:', len(non_ascii_pre))
# Only c3 and c2?
print('All are c3/c2 only:', all(b in (0xc2, 0xc3) for b in non_ascii_pre))
