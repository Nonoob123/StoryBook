html_path = r"C:\Users\USER\Documents\agnes_project\彩虹種子\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# There is a stray </script> before the real <script> block.
# The HTML structure has: </div> </div> </script> </body> <script>
# We need to remove the stray </script>
# Find the pattern: </div>\n\n\n</script>\n\n\n\n\n\n\n\n\n</body>\n\n<script>

import re

# Remove the stray </script> between </div> and </body>
content = re.sub(r'</div>\s*</script>\s*</body>', '</div>\n\n</body>', content)

# Also check for extra } before toggleSettingsPanel
# Find the area where we removed functions
idx = content.find('function toggleSettingsPanel')
if idx > 0:
    before = content[max(0,idx-100):idx]
    # Remove trailing orphan }
    before = before.rstrip()
    if before.endswith('}') and 'function' not in before[-20:]:
        # Check if there are two closing braces
        last_chars = before[-5:]
        print(f"Last 5 chars before toggleSettingsPanel: {repr(last_chars)}")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

# Verify fix
import re
script_starts = list(re.finditer(r'<script', content))
script_ends = list(re.finditer(r'</script>', content))
print(f"Script blocks: {len(script_starts)} start, {len(script_ends)} end")
print("Done fixing stray </script>")
