import re

data = open("index.html", "r", encoding="utf-8").read()

# Find script section
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
    js_text = "\n".join(lines[script_start+1:script_end])
    functions = re.findall(r'function\s+(\w+)', js_text)
    print("Functions:", functions)
    
    # What functions are called in body (onclick)
    body_start = data.find("<body>") + 6
    body_end = data.find("</body>")
    body = data[body_start:body_end]
    body_calls = set(re.findall(r'onclick="(\w+)', body))
    print("Body onclick calls:", body_calls)
    
    # Which are missing?
    missing = body_calls - set(functions)
    print("Missing functions:", missing)
