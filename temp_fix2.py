import sys, re, json
sys.stdout.reconfigure(encoding='utf-8')

# Read rainbow raw bytes
with open(r'C:\Users\USER\Documents\agnes_project\book_rainbow.html', 'rb') as f:
    raw = f.read()

# Fix encoding
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
    else:
        fixed.append(b)
        i += 1

text = fixed.decode('utf-8')

# Verify title
m = re.search(r'<title>(.*?)</title>', text)
if m:
    print('Title:', m.group(1))

# Extract scenesData
m = re.search(r'const scenesData = (\[.*?\]);\s*\n', text, re.DOTALL)
if m:
    scenes_str = m.group(1)
    scenes = json.loads(scenes_str)
    print(f'Parsed {len(scenes)} scenes')
    print(f'Scene 0 text: {scenes[0]["text"][:120]}')
    print(f'Scene 18 text: {scenes[-1]["text"][:120]}')
