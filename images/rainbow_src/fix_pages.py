data = open("index.html", "r", encoding="utf-8").read()

# The issue: "var pages=[ ];" on line 543 is empty
# We need to change it to "var pages = scenesData;"

# Also there are duplicates: line 547 has ];]; and line 548 has another var currentPage
# Let me fix all of this

# First fix: var pages=[] -> var pages=scenesData
data = data.replace("var pages=[\n\n\n\n];", "var pages = scenesData;")

# Second fix: remove the duplicate "];];var currentPage" on line 547
# That line should be removed entirely
lines = data.split("\n")
new_lines = []
skip_until = -1
for i, line in enumerate(lines):
    if skip_until > 0 and i < skip_until:
        continue
    # Skip the old duplicate lines
    if i >= 544 and i <= 548:
        # Keep only line 543 (the full original JS with music etc)
        # Line 547 (];];var...) should be removed
        if i == 547:
            continue
        # Line 548 (duplicate var currentPage) should be removed
        if i == 548:
            continue
        new_lines.append(line)
        continue
    new_lines.append(line)

data = "\n".join(new_lines)

# Also check for any remaining duplicate "var currentPage"
# The one on line 543 is the full one, keep it
# Remove any duplicate after it
lines2 = data.split("\n")
new_lines2 = []
seencurrentPage = False
for line in lines2:
    if line.strip().startswith("var currentPage"):
        if seencurrentPage:
            # Skip duplicate
            continue
        seencurrentPage = True
    new_lines2.append(line)

data = "\n".join(new_lines2)

# Write back
with open("index.html", "w", encoding="utf-8") as f:
    f.write(data)

print("Fixed!")

# Verify
data2 = open("index.html", "r", encoding="utf-8").read()
print("Has 'var pages = scenesData':", "var pages = scenesData" in data2)
# Count var currentPage occurrences
import re
count = len(re.findall(r'\bvar currentPage\b', data2))
print("var currentPage occurrences:", count)

# Show the JS section
lines3 = data2.split("\n")
for i, line in enumerate(lines3):
    if "script" in line.lower() or "pages" in line.lower() or "currentPage" in line:
        if line.strip():
            safe = "".join(c if ord(c)<128 else "?" for c in line[:120])
            print("Line %d: %s" % (i, safe[:120]))
