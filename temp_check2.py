import sys, re
sys.stdout.reconfigure(encoding='utf-8')

# Step 1: Read the grassland HTML as template
template = open(r'C:\Users\USER\Documents\agnes_project\book_grassland.html', 'r', encoding='utf-8').read()

# Step 2: Read the rainbow HTML and extract its scenesData as raw bytes, then fix encoding
with open(r'C:\Users\USER\Documents\agnes_project\book_rainbow.html', 'rb') as f:
    raw = f.read()

# Fix double-encoding for the entire file
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

# The above approach has issues with non-double-encoded parts
# Let's try a different approach: the file was saved as UTF-8 but was already double-encoded
# Actually let me check if there are parts that are NOT double-encoded
text_fallback = raw.decode('utf-8', errors='replace')
# Check specific known positions
idx = raw.find(b'scenesData')
if idx > 0:
    pre_scenes = raw[:idx]
    # Check if pre-scenes have double encoding pattern
    non_ascii_pre = [b for b in pre_scenes if b > 127]
    print('Pre-scenes non-ASCII bytes:', set(non_ascii_pre)[:20])
    if non_ascii_pre:
        print('Pre-scenes has', len(non_ascii_pre), 'non-ASCII bytes')
    else:
        print('Pre-scenes is pure ASCII!')

