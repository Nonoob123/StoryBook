data = open("index.html", "r", encoding="utf-8").read()
js = data[data.find("<script>") + 8:data.find("</script>")]

# Show first 500 and last 500 chars
safe_start = "".join(c if ord(c)<128 else "?" for c in js[:500])
safe_end = "".join(c if ord(c)<128 else "?" for c in js[-500:])
print("JS start:", safe_start[:500])
print("\nJS end:", safe_end[:500])
