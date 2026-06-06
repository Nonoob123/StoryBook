import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\USER\Documents\agnes_project\book_rainbow.html', 'rb') as f:
    raw = f.read()

# After c3/c2 decoding, try to fix remaining bad bytes
fixed = bytearray()
i = 0
while i < len(raw):
    b = raw[i]
    if b == 0xc3 and i+1 < len(raw):
        fixed.append((raw[i+1] - 0x20) & 0xff)
        i += 2
    elif b == 0xc2 and i+1 < len(raw):
        fixed.append((raw[i+1] - 0x80) & 0xff)
        i += 2
    elif 0x80 <= b <= 0x9f:
        # Skip C1 bytes
        i += 1
    else:
        fixed.append(b)
        i += 1

# Now fix remaining 0x80-0x9f bytes that survived
final = bytearray()
for b in fixed:
    if 0x80 <= b <= 0x9f:
        # These are C1 control chars - skip them
        continue
    final.append(b)

try:
    text = final.decode('utf-8')
    print('Success! Text length:', len(text))
    import re
    m = re.search(r'<title>(.*?)</title>', text)
    if m: print('Title:', m.group(1))
    m = re.search(r'const scenesData = (\[.*?\]);\s*\n', text, re.DOTALL)
    if m:
        import json
        scenes = json.loads(m.group(1))
        print(f'Scenes: {len(scenes)}')
        print(f'Scene 0: {scenes[0]["text"][:100]}')
except Exception as e:
    print(f'Error: {e}')
