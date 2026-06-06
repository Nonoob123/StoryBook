import re

html_path = r"C:\Users\USER\Documents\agnes_project\彩虹種子\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract JS between first <script and last </script>
m = re.search(r"<script[^>]*>(.*)</script>", content, re.DOTALL)
if not m:
    print("No script found!")
    exit()
js = m.group(1)

# Count braces, skipping strings properly
depth = 0
i = 0
while i < len(js):
    ch = js[i]
    # Skip strings
    if ch in ('"', "'", "`"):
        quote = ch
        i += 1
        while i < len(js) and js[i] != quote:
            if js[i] == "\\":
                i += 1  # skip escaped char
            i += 1
        i += 1  # skip closing quote
        continue
    if ch == "{":
        depth += 1
    elif ch == "}":
        depth -= 1
        if depth < -3:
            print(f"Depth dropped to {depth} at pos {i}")
            print("Context:", repr(js[max(0,i-40):i+40]))
    i += 1

print(f"Final brace depth: {depth}")
if depth == 0:
    print("All braces balanced!")
elif depth > 0:
    print(f"Need {depth} more closing braces")
else:
    print(f"Have {abs(depth)} extra closing braces")
