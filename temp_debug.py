import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\USER\Documents\agnes_project\book_rainbow.html', 'rb') as f:
    raw = f.read()

# Process step by step and watch for 0x85
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
        i += 1
    else:
        fixed.append(b)
        i += 1

# Find 0x85 in fixed
positions = [idx for idx, b in enumerate(fixed) if b == 0x85]
print(f'0x85 found at {len(positions)} positions')
if positions:
    pos = positions[0]
    print(f'Context at pos {pos}: {bytes(fixed[max(0,pos-10):pos+10]).hex()}')
    print(f'Context raw: {bytes(fixed[max(0,pos-10):pos+10])}')
    
    # Also check what raw bytes produced this
    # Need to map back... let me check original context at the right position
    # Actually 0x85 could come from a c2 0x85 pair... no, c2 85 -> 0x05 which is control char
    # Or it could be from raw byte 0x85 that was NOT in the c3/c2 range
    # Let me check: is there a raw byte 0x85 that survived?
    raw_85 = [i for i, b in enumerate(raw) if b == 0x85]
    print(f'Raw 0x85 at positions: {raw_85[:10]}')
    
    # Check around position 181 in fixed
    ctx = bytes(fixed[pos-5:pos+10])
    print(f'Hex: {ctx.hex()}')
    # 85 = 0b10000101 - this is NOT a valid UTF-8 start byte
    # It IS a valid single byte in GBK/Big5 for Chinese chars
    # Let me try GBK decoding around this area
    chunk = bytes(fixed[pos-20:pos+20])
    print(f'GBK attempt: {chunk.decode("gbk", errors="replace")}')
    print(f'CP950 attempt: {chunk.decode("cp950", errors="replace")}')
