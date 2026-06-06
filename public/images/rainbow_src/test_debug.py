import re

data = open("index.html", "r", encoding="utf-8").read()

# Check the titlePage section
idx = data.find('id="titlePage"')
if idx >= 0:
    print("titlePage section:")
    print(data[idx:idx+300])
    print()

# Check the startBtn element
idx2 = data.find('id="startBtn"')
if idx2 >= 0:
    print("startBtn element:")
    print(data[idx2:idx2+100])
    print()

# Check if display:flex is set for titlePage
if 'display:flex' in data:
    print("Has display:flex")
else:
    print("NO display:flex found!")
    
# Check CSS for title-page
idx3 = data.find('.title-page')
if idx3 >= 0:
    print("\ntitle-page CSS:")
    css_section = data[idx3:idx3+200]
    safe = "".join(c if ord(c)<128 else "?" for c in css_section[:200])
    print(safe[:200])
