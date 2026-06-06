import sys; sys.stdout.reconfigure(encoding='utf-8')
f = open('C:/Users/USER/Documents/agnes_project/book_rainbow.html', 'rb')
data = f.read()
f.close()
text = data.decode('utf-8')
end = text.find('</title>')
title_content = text[385:end]
print('Title length:', len(title_content))
for c in title_content:
    print(hex(ord(c)), end=' ')
print()
print('Expected: 9 Chinese chars * 3 bytes each = 27 mojibake chars')
# Try encoding as UTF-8 with surrogatepass
try:
    raw = title_content.encode('utf-8', 'surrogatepass')
    print('Raw bytes:', raw.hex())
    print('As UTF-8:', raw.decode('utf-8'))
except Exception as e:
    print('Error:', e)
# The actual original bytes were UTF-8 Chinese
# They got saved again as UTF-8, doubling the encoding
# Solution: the UTF-8 bytes of the mojibake = original UTF-8 bytes
# encoded back and forth
# Try: take codepoints and see which ones have high values
high = [ord(c) for c in title_content if ord(c) > 127]
print('High codepoints:', high)

