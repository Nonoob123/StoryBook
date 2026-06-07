data = open("index.html", "r", encoding="utf-8").read()

# Check actual text content directly with Unicode literals (not escapes)
# Title
print("Title check - has 波:", chr(0x6ce2) in data)
print("  has 和:", chr(0x548c) in data)
print("  has 朵:", chr(0x6735) in data)
print("  has 彩虹:", chr(0x5f69) + chr(0x8679) in data)

# Story text
print("\nStory 1 - has 你好:", chr(0x4f60) + chr(0x597d) in data)
print("  has 小白兔:", chr(0x5c0f) + chr(0x767d) + chr(0x5154) in data)

# Button text  
print("\nButton - has 開始:", chr(0x958b) + chr(0x59cb) in data)
print("  has 閱讀:", chr(0x95b1) + chr(0x8b80) in data)

# JS functions
js = data[data.find("<script>") + 8:data.find("</script>")]
print("\nJS Check:")
print("  goPage function:", "function goPage" in js)
print("  renderP function:", "function renderP" in js)
print("  prevP function:", "function prevP" in js)
print("  nextP function:", "function nextP" in js)
print("  openM function:", "function openM" in js)
print("  closeM function:", "function closeM" in js)
print("  toggleDarkMode:", "function toggleDarkMode" in js)
print("  playSound:", "function playSound" in js)
print("  downloadQR:", "function downloadQR" in js)
print("  scenesData defined:", "const scenesData" in js)
print("  pages assigned:", "var pages = scenesData" in js)

# Check body content
body = data[data.find("<body>") + 6:data.find("</body>")]
print("\nBody Check:")
print("  titlePage:", "titlePage" in body)
print("  pagesContainer:", "pagesContainer" in body)
print("  endingPage:", "endingPage" in body)
print("  startBtn:", "startBtn" in body)

print("\nFile size:", len(data))
print("Total lines:", data.count("\n"))
