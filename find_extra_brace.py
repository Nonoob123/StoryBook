import re

html_path = r"C:\Users\USER\Documents\agnes_project\彩虹種子\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

m = re.search(r"<script[^>]*>(.*)</script>", content, re.DOTALL)
if not m:
    exit()
js = m.group(1)

depth = 0
i = 0
while i < len(js):
    ch = js[i]
    if ch in ('"', "'", "`"):
        quote = ch
        i += 1
        while i < len(js) and js[i] != quote:
            if js[i] == "\\": i += 1
            i += 1
        i += 1
        continue
    if ch == "{":
        depth += 1
    elif ch == "}":
        depth -= 1
        if depth == -1:
            print(f"EXTRA }} at position {i}")
            # Find the function/line context
            line_start = js.rfind("\n", 0, i)
            if line_start == -1: line_start = 0
            else: line_start += 1
            line_end = js.find("\n", i)
            if line_end == -1: line_end = len(js)
            print(f"Line: {repr(js[line_start:line_end])}")
            print(f"Context: {repr(js[max(0,i-100):i+100])}")
            break
        if depth < -1:
            print(f"Depth {depth} at {i}")
    i += 1
