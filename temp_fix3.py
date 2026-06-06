import sys, re, json
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\USER\Documents\agnes_project\book_rainbow.html', 'rb') as f:
    raw = f.read()

fixed = bytearray()
skipped = 0
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
        # C1 control bytes - skip these artifacts
        skipped += 1
        i += 1
    else:
        fixed.append(b)
        i += 1

text = fixed.decode('utf-8')
print(f'Skipped {skipped} C1 bytes')

m = re.search(r'<title>(.*?)</title>', text)
if m: print('Title:', m.group(1))

m = re.search(r'const scenesData = (\[.*?\]);\s*\n', text, re.DOTALL)
if m:
    scenes = json.loads(m.group(1))
    print(f'Scenes: {len(scenes)}')
    print(f'Scene 0: {scenes[0]["text"][:120]}')
