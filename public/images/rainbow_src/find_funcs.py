import json

# Read current assets
data = open("index.html", "r", encoding="utf-8").read()

style_start = data.find("<style>") + 7
style_end = data.find("</style>")
css = data[style_start:style_end]

body_start = data.find("<body>") + 6
body_end = data.find("</body>")
body = data[body_start:body_end]

# The body has onclick handlers that call these functions:
# prevP(), nextP(), openM(), closeM(), toggleDarkMode(), goPage(0), playSound(), etc.

# Current JS has: playSound, toggleSettingsPanel, resetSettings, generateQR, closeShareDialog, openShareDialog
# Missing: goPage, renderP, prevP, nextP, openM, closeM, toggleDarkMode, resetAll

# Let me find ALL function definitions in current JS
import re
functions = re.findall(r'function\s+(\w+)', current_js)
# Need to read current_js first
lines = data.split("\n")
script_start = None
script_end = None
for i, line in enumerate(lines):
    if "<script>" in line and script_start is None:
        script_start = i
    if "</script>" in line and script_start is not None:
        script_end = i
        break

if script_start and script_end:
    js_lines = lines[script_start+1:script_end]
    js_text = "\n".join(js_lines)
    functions = re.findall(r'function\s+(\w+)', js_text)
    print("Functions in current JS:", functions)
else:
    print("Script tags not found")

# Also find all function calls in the body
body_functions = set()
for line in body.split("\n"):
    matches = re.findall(r'(\w+)\s*\(', line)
    for m in matches:
        if m not in ["onclick", "class", "id", "for"]:
            body_functions.add(m)

print("\nFunctions called in body:", sorted(body_functions))
