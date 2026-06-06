import json

# Read CSS from the original CSS
css_file = open("css_only.txt", "r", encoding="utf-8").read() if True else ""

# Read the body HTML
with open("body_content.txt", "r", encoding="utf-8") as f:
    body = f.read()

# Actually, let me just build from the current broken HTML but fix the JS section
data = open("index.html", "r", encoding="utf-8").read()

# Find where the body content ends
body_end = data.find("</body>")
body_start = data.find("<body>") + 6
body_html = data[body_start:body_end]

# Read pages data
with open("pages_data.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

# Build the JS section properly
scenes_json = json.dumps(pages, ensure_ascii=False)

# The JS needs to have ALL the original functions
# Let me extract what we have and what's missing from the current JS
idx_script_start = data.find("<script>")
idx_script_end = data.find("</script>")
current_js = data[idx_script_start + 8: idx_script_end]

# Check what functions are present
funcs_present = []
funcs_missing = []
for func in ["goPage", "renderP", "prevP", "nextP", "openM", "closeM", "toggleDarkMode", "playSound"]:
    if "function " + func in current_js:
        funcs_present.append(func)
    else:
        funcs_missing.append(func)

print("Present:", funcs_present)
print("Missing:", funcs_missing)

# The original JS had these functions. We need to restore them.
# Let me check if there's a backup of the original JS
# We saved it as js_only.txt - but we deleted it. Let me check if we have it in git or elsewhere

# Actually, the current JS is truncated. The missing functions were in the OLD JS that got replaced.
# We need to reconstruct them. Let me check what the original JS looked like by examining the body HTML for onclick handlers

# Check onclick handlers in body
oncalls = []
for tag in ["prevP", "nextP", "openM", "closeM", "toggleDarkMode", "goPage", "playSound"]:
    if tag in body_html:
        count = body_html.count(tag)
        oncalls.append((tag, count))

print("\nBody references:")
for tag, count in oncalls:
    print("  %s: %d times" % (tag, count))
