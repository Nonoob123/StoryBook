import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\USER\Documents\agnes_project\book_rainbow.html', 'rb') as f:
    raw = f.read()

scenes_start = raw.find(b'scenesData')
scenes_section = raw[scenes_start:scenes_start+500]

# Print byte pattern in detail
print("Byte analysis of first scene entry:")
# After 'scenesData = [{"image": "scene01_forest_friends.png", "text": "<p class=\\x22dialog-rabbit\\x22>'
# What follows?
idx = scenes_section.find(b'dialog-rabbit')
after = scenes_section[idx+15:idx+60]
print(f'After dialog-rabbit: {bytes(after).hex()}')
print(f'As text (latin-1): {bytes(after).decode("latin-1")}')

# Try: the double encoding is consistent. c3 a6 c2 b5 c2 a3 = 彩色的... 
# c3 xx -> original = xx+0x20, c2 xx -> original = xx+0x80
# Let me verify: 0xc3 0xa6 -> 0xe6 (彩), 0xc2 0xb5 -> 0x95 (色), 0xc2 0xa3 -> 0x83
# But 0x83 is not a valid UTF-8 byte for Chinese... wait: 彩色 = e8 89 ad
# Hmm, e8 -> c3 a8 (double encoded as c3 a8), not c3 a6
# So the mapping is off.

# Let me check: what does c3 a6 decode to as double-encoding?
# c3 a6 means original byte was 0xa6... but that does not seem right for Chinese
# Actually maybe the original encoding is NOT UTF-8 but CP950 (Big5 for Traditional Chinese)

# In CP950: 彩 is 0xb7 0x6b (two bytes)
# When saved as UTF-8 from CP950... no.

# Let me try: maybe the original text is UTF-8 and was read as CP950/Big5, then re-encoded as UTF-8
# 彩 in CP950 is b7 6b
# If b7 6b is treated as UTF-8: b7 = 0xb7, 6b = 'k'
# When that's re-encoded as UTF-8: b7 doesn't start a valid UTF-8 sequence

# Let me just try decoding the whole file as cp950
try:
    text = raw.decode('cp950')
    print('CP950 decode SUCCESS!')
    # Find title
    import re
    m = re.search(r'<title>(.*?)</title>', text)
    if m:
        print('Title (CP950):', m.group(1))
except Exception as e:
    print(f'CP950 failed: {e}')

# Try GB18030 (Chinese)
try:
    text = raw.decode('gb18030')
    m = re.search(r'<title>(.*?)</title>', text)
    if m: print('Title (GB18030):', m.group(1)[:40])
except Exception as e:
    print(f'GB18030 failed: {e}')

# Try cp1252
try:
    text = raw.decode('cp1252')
    m = re.search(r'<title>(.*?)</title>', text)
    if m: print('Title (CP1252):', m.group(1)[:60])
except Exception as e:
    print(f'CP1252 failed: {e}')
