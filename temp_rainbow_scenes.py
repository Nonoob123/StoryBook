import sys, re
sys.stdout.reconfigure(encoding='utf-8')
# Read rainbow as raw bytes
with open(r'C:\Users\USER\Documents\agnes_project\book_rainbow.html', 'rb') as f:
    raw = f.read()
# Find scenesData
idx = raw.find(b'scenesData')
print('scenesData at pos:', idx)
# Get 1000 bytes from there
chunk = raw[idx:idx+2000]
print('Raw hex:', chunk[:200].hex())
# Decode as latin-1 to see the raw bytes
text = chunk.decode('latin-1')
print('First 500 chars:', text[:500])
