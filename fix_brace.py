html_path = r"C:\Users\USER\Documents\agnes_project\彩虹種子\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove the extra } before toggleSettingsPanel
old = """osc.stop(audioCtx.currentTime+(type==='sparkle'?0.2:0.15))}

}

function toggleSettingsPanel"""

new = """osc.stop(audioCtx.currentTime+(type==='sparkle'?0.2:0.15))}

function toggleSettingsPanel"""

if old in content:
    content = content.replace(old, new)
    print("Fixed: Removed extra } before toggleSettingsPanel")
else:
    print("Pattern not found, trying alternate...")
    # Try without newline variations
    import re
    content = re.sub(r'\}\s*\}\s*function toggleSettingsPanel', '}\\nfunction toggleSettingsPanel', content)
    print("Applied regex fix")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

# Verify
import re
starts = len(re.findall(r'<script[^>]*>', content))
ends = len(re.findall(r'</script>', content))
print(f"Script blocks: {starts} start, {ends} end")
print("Done!")
