html_path = r"C:\Users\USER\Documents\agnes_project\彩虹種子\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find the exact area around the extra }
# We know it is around the resetSettings function
idx = content.find("function resetSettings")
if idx > 0:
    print("resetSettings area:")
    print(repr(content[idx:idx+500]))
