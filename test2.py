data = open("index.html", "r", encoding="utf-8").read()

# Safe print helper
def safe(s):
    return "".join(c if ord(c)<128 else "[%s]" % hex(ord(c)) for c in s)

# Check titlePage section
idx = data.find('id="titlePage"')
if idx >= 0:
    print("titlePage section:")
    print(safe(data[idx:idx+400]))
    print()

# Check startBtn
idx2 = data.find('id="startBtn"')
if idx2 >= 0:
    print("startBtn element:")
    print(safe(data[idx2:idx2+150]))
    print()

# Check JS event listener
idx3 = data.find("getElementById('startBtn')")
if idx3 < 0:
    idx3 = data.find('getElementById("startBtn")')
if idx3 >= 0:
    print("startBtn JS handler:")
    print(safe(data[idx3:idx3+100]))
    print()

# Check titlePage CSS
idx4 = data.find("title-page")
if idx4 >= 0:
    print("CSS title-page:")
    print(safe(data[idx4:idx4+300]))
