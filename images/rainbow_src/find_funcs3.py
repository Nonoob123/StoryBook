import re

data = open("index.html", "r", encoding="utf-8").read()

# But the body ALSO references goPage, prevP, nextP, openM, closeM in innerHTML!
# Let me check the innerHTML that renderP creates
body_start = data.find("<body>") + 6
body_end = data.find("</body>")
body = data[body_start:body_end]

# Check for references inside innerHTML or script
script_start = data.find("<script>")
script_content = data[script_start:]

# Find prevP, nextP references
for func in ["goPage", "renderP", "prevP", "nextP", "openM", "closeM", "toggleDarkMode"]:
    count = script_content.count(func)
    if count > 0:
        print("Script references %s: %d times" % (func, count))
    else:
        print("Script references %s: 0 (MISSING!)" % func)

# Also check body
for func in ["goPage", "renderP", "prevP", "nextP", "openM", "closeM", "toggleDarkMode"]:
    count = body.count(func)
    if count > 0:
        print("Body references %s: %d times" % (func, count))
