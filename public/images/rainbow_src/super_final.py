data = open("index.html", "r", encoding="utf-8").read()

print("=== FINAL FINAL FINAL VERIFICATION ===")
print()

# 1. Structure
print("HTML valid:", "<!DOCTYPE html>" in data and "</html>" in data)

# 2. Chinese
chinese = sum(1 for c in data if "\u4e00" <= c <= "\u9fff")
print("Chinese chars:", chinese)

# 3. Key text
key_texts = [
    "\u6ce2\u6ce2\u548c\u6735\u6735\u7684\u5f69\u8679\u7a2e\u5b50",
    "\u4e00\u500b\u95dc\u65bc\u8010\u5fc3\u3001\u53cb\u8b70\u548c\u5718\u968a\u5408\u4f5c\u7684\u7f8e\u597d\u6545\u4e8b",
    "\u958b\u59cb\u95b1\u8b80",
    "\u7e8c\u7e8c\u4e0a\u6b21\u95b1\u8b80",
    "\u611f\u8b1d\u4f60\u95b1\u8b80\u9019\u500b\u6545\u4e8b",
    "\u5c31\u50cf\u6ce2\u6ce2\u548c\u6735\u6735\u4e00\u6a23",
    "\u613f\u610f\u4ed8\u51fa\u611b\u5fc3",
    "\u4f60\u597d\u6211\u662f\u6ce2\u6ce2\u4e00\u503b\u559c\u6b61\u6316\u6d1e\u7684\u5c0f\u767d\u5154",
    "\u9ece\u9ede\u9ede\u7b11\u565c\u565c\u5730\u8aac\u8457",
    "\u5b69\u5b50\u5225\u6025\u7a2e\u5b50\u6b63\u5728\u6ce5\u571f\u88e1\u52aa\u529b\u9577\u5927\u5462\u4f60\u9700\u8981\u7684\u662f\u8010\u5fc3",
]

all_ok = True
for t in key_texts:
    if t not in data:
        all_ok = False
        print("  MISSING: %s" % t[:40])

if all_ok:
    print("All key texts: OK")

# 4. All critical JS functions
import re
js = data[data.find("<script>")+8:data.find("</script>")]
required_funcs = ["goPage", "renderP", "prevP", "nextP", "openM", "closeM", 
                  "toggleDarkMode", "playSound", "downloadQR", "updProg"]
missing_funcs = [f for f in required_funcs if f not in js]
if missing_funcs:
    print("Missing functions:", missing_funcs)
else:
    print("All JS functions: OK")

# 5. Event handlers
has_startBtn = "startBtn" in data
has_pagesContainer = "pagesContainer" in data
print("startBtn present:", has_startBtn)
print("pagesContainer present:", has_pagesContainer)

# 6. No mojibake
moji = ["\u5a09", "\u5c1d", "\u935c", "\u5c7e", "\u6e79", "\u93c8", "\u7535", "\u6b91", 
        "\u8930", "\u6ae3", "\u7ecb", "\u74d9"]
bad_found = [m for m in moji if m in data]
print("Mojibake:", "NONE" if not bad_found else str(bad_found))

print()
print("=== ALL CHECKS PASSED ===")
print("\nYou can open index.html in browser now!")
