import sys, re
sys.stdout.reconfigure(encoding='utf-8')

# Read grassland template
template = open(r'C:\Users\USER\Documents\agnes_project\book_grassland.html', 'r', encoding='utf-8').read()

# Read rainbow raw bytes
with open(r'C:\Users\USER\Documents\agnes_project\book_rainbow.html', 'rb') as f:
    raw = f.read()

# Fix encoding by handling both double-encoded UTF-8 and C1 control chars
# The file seems to have a mix: double-encoded chars (c3/c2 pairs) and some raw C1 bytes (80-9f)
# C1 bytes 0x80-0x9f are likely single-byte artifacts from a bad conversion
# Let's try to reconstruct the original text

# Approach: first handle c3/c2 double encoding, then handle remaining issues
fixed = bytearray()
i = 0
errors = []
while i < len(raw):
    b = raw[i]
    if b == 0xc3 and i+1 < len(raw):
        fixed.append((raw[i+1] - 0x20) & 0xff)
        i += 2
    elif b == 0xc2 and i+1 < len(raw):
        fixed.append((raw[i+1] - 0x80) & 0xff)
        i += 2
    elif 0x80 <= b <= 0x9f:
        # C1 control char - likely artifact, skip
        errors.append(i)
        i += 1
    else:
        fixed.append(b)
        i += 1

print(f'Errors (skipped C1 bytes): {len(errors)} at positions: {errors[:10]}')
text = fixed.decode('utf-8', errors='replace')

# Extract scenesData content
m = re.search(r'const scenesData = (\[.*?\]);', text, re.DOTALL)
if m:
    scenes_str = m.group(1)
    scenes = json.loads(scenes_str)
    print(f'Parsed {len(scenes)} scenes')
    print(f'Scene 0 text: {scenes[0]["text"][:100]}')
else:
    print('Could not find scenesData')
    
import json
