import sys, re, json
sys.stdout.reconfigure(encoding='utf-8')

# Read the rainbow raw and try to extract scenes only
with open(r'C:\Users\USER\Documents\agnes_project\book_rainbow.html', 'rb') as f:
    raw = f.read()

# scenesData starts at byte 14924
scenes_start = raw.find(b'scenesData')
print('scenesData at:', scenes_start)

# Find the end of the scenes data array
# Look for the pattern after scenesData array ends: "var pages = scenesData;"
end_marker = b'var pages = scenesData'
scenes_end = raw.find(end_marker, scenes_start)
print('End marker at:', scenes_end)

# Extract the scenes section
scenes_section = raw[scenes_start:scenes_end]
print('Section length:', len(scenes_section))

# Fix double-encoding in this section only
fixed = bytearray()
i = 0
while i < len(scenes_section):
    b = scenes_section[i]
    if b == 0xc3 and i+1 < len(scenes_section):
        fixed.append((scenes_section[i+1] - 0x20) & 0xff)
        i += 2
    elif b == 0xc2 and i+1 < len(scenes_section):
        fixed.append((scenes_section[i+1] - 0x80) & 0xff)
        i += 2
    elif 0x80 <= b <= 0x9f:
        i += 1
    else:
        fixed.append(b)
        i += 1

text = fixed.decode('utf-8')
print('Fixed text length:', len(text))

# Now extract the array content
m = re.search(r'const scenesData = (\[.*?\]);', text, re.DOTALL)
if m:
    arr_text = m.group(1)
    print('Array text length:', len(arr_text))
    # Check for control chars
    for j, c in enumerate(arr_text):
        if ord(c) < 32 and c not in '\n\r\t ':
            print(f'Bad char at {j}: U+{ord(c):04X} ({repr(c)})')
            break
    scenes = json.loads(arr_text)
    print(f'Scenes: {len(scenes)}')
    print(f'Scene 0 text: {scenes[0]["text"][:120]}')
    print(f'Scene 18 text: {scenes[-1]["text"][:120]}')
