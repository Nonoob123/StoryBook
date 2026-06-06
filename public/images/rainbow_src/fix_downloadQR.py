data = open("index.html", "r", encoding="utf-8").read()

# Add downloadQR function before the closing </script>
downloadqr_func = """function downloadQR(){var canvas=document.getElementById('shareCanvas');var link=document.createElement('a');link.download='\\u5f69\\u8679\\u7a2e\\u5b50\\u6545\\u4e8b_QR.png';link.href=canvas.toDataURL();link.click()}"""

# Find </script> and insert before it
html_end = data.rfind("</script>")
data = data[:html_end] + "\n" + downloadqr_func + data[html_end:]

# Also add touch start/end for swipe
touch_code = """var touchStartX=0;document.addEventListener('touchstart',function(e){touchStartX=e.changedTouches[0].screenX},false);document.addEventListener('touchend',function(e){var diff=e.changedTouches[0].screenX-touchStartX;if(diff<-50)nextP();if(diff>50)prevP()},false);"""

# Check if touch code already exists
if "touchstart" not in data:
    data = data.replace("document.addEventListener('DOMContentLoaded'", touch_code + "\n\ndocument.addEventListener('DOMContentLoaded'")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(data)

print("Added downloadQR function")

# Verify
data2 = open("index.html", "r", encoding="utf-8").read()
print("Has downloadQR:", "downloadQR" in data2)
print("Has touchstart:", "touchstart" in data2)
print("Has touchend:", "touchend" in data2)

# Count all functions
import re
funcs = re.findall(r'function\s+(\w+)', data2)
print("\nAll functions:", sorted(set(funcs)))

# Count Chinese
chinese = sum(1 for c in data2 if "\u4e00" <= c <= "\u9fff")
print("Chinese chars:", chinese)
