html_path = r"C:\Users\USER\Documents\agnes_project\彩虹種子\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove the extra } between resetSettings and the event listeners
# Pattern: toggleSettingsPanel())}\n\n}\n\ndocument.getElementById("startBtn")
old = "toggleSettingsPanel())}\n\n}\n\ndocument.getElementById(\"startBtn\")"
new = "toggleSettingsPanel())}\n\ndocument.getElementById(\"startBtn\")"

if old in content:
    content = content.replace(old, new)
    print("Fixed: removed extra } after resetSettings")
else:
    print("Pattern not found exactly, trying to find it...")
    idx = content.find('toggleSettingsPanel()')
    if idx > 0:
        print("Context:", repr(content[idx:idx+100]))

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

# Verify
import re
m = re.search(r"<script[^>]*>(.*)</script>", content, re.DOTALL)
if m:
    js = m.group(1)
    depth = 0
    i = 0
    while i < len(js):
        ch = js[i]
        if ch in ('"', "'", "`"):
            quote = ch; i += 1
            while i < len(js) and js[i] != quote:
                if js[i] == "\\": i += 1
                i += 1
            i += 1; continue
        if ch == "{": depth += 1
        elif ch == "}": depth -= 1
        i += 1
    print(f"Brace depth after fix: {depth}")
    if depth == 0:
        print("SUCCESS! All braces balanced!")
    else:
        print(f"Still off by {depth}")
