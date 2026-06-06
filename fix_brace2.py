html_path = r"C:\Users\USER\Documents\agnes_project\彩虹種子\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# The exact pattern has unicode-escaped Chinese in it
# Let me find and replace by searching for the exact context
old = "toggleSettingsPanel()}}\n\ndocument.getElementById"
# Wait, the repr shows }\n\n}\n\n which is two separate } chars with \n\n between them

# Let me be more precise - find the area and fix it
idx = content.find("toggleSettingsPanel()}")
if idx > 0:
    # Check what comes after
    chunk = content[idx:idx+80]
    print(f"Chunk: {repr(chunk)}")
    
    # Replace }\n\n}\n\n with }\n\n
    content = content.replace("toggleSettingsPanel()}\n\n}\n\ndocument.getElementById", 
                               "toggleSettingsPanel()}\n\ndocument.getElementById")
    print("Replacement done")

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
    print(f"Brace depth: {depth}")
    if depth == 0:
        print("SUCCESS!")
