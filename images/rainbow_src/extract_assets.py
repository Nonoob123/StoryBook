import json

# Read current HTML
data = open("index.html", "r", encoding="utf-8").read()

# Extract CSS
style_start = data.find("<style>") + 7
style_end = data.find("</style>")
css = data[style_start:style_end]

# Extract body
body_start = data.find("<body>") + 6
body_end = data.find("</body>")
body = data[body_start:body_end]

# Extract current JS
js_start = data.find("<script>") + 8
js_end = data.find("</script>")
current_js = data[js_start:js_end]

print("CSS length:", len(css))
print("Body length:", len(body))
print("Current JS length:", len(current_js))

# Check what functions are in current JS
for func in ["goPage", "renderP", "prevP", "nextP", "openM", "closeM", "toggleDarkMode", "playSound", "resetSettings", "resetAll"]:
    present = "function " + func in current_js
    print("  function %s: %s" % (func, "YES" if present else "NO"))

# Check references in body
for func in ["prevP", "nextP", "openM", "closeM", "toggleDarkMode", "goPage"]:
    count = body.count(func)
    if count > 0:
        print("  Body references %s: %d times" % (func, count))
