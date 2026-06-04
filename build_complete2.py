import json
import re

# Read current HTML to get CSS and body
data = open("index.html", "r", encoding="utf-8").read()
style_start = data.find("<style>") + 7
style_end = data.find("</style>")
css = data[style_start:style_end]
body_start = data.find("<body>") + 6
body_end = data.find("</body>")
body = data[body_start:body_end]

# Read pages data
with open("pages_data.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

scenes_json = json.dumps(pages, ensure_ascii=False)

# Build the complete JS with ALL functions
# Based on the original HTML structure and what we know was there

# First, let's find the exact body structure to understand onclick handlers
# Check the body for toggleDarkMode
if "toggleDarkMode" in body:
    print("Body has toggleDarkMode reference")

# Build complete JS
js_parts = []

# 1. Scenes data and pages assignment
js_parts.append("const scenesData = %s" % scenes_json)
js_parts.append("var pages = scenesData;")

# 2. State variables
js_parts.append("var currentPage=-1,saveTimeout=null;")

# 3. Music/audio state (from existing functions)
js_parts.append("var audioCtx=null,musicOscillators=[],musicLoopId=null,isMusicPlaying=false,currentVolume=0.3,synth=window.speechSynthesis;")

# 4. goPage function
js_parts.append("""function goPage(pi){playSound('page');if(pi>=0)document.getElementById('titlePage').style.display='none';var ap=document.querySelectorAll('.book-page');for(var i=0;i<ap.length;i++){ap[i].classList.remove('active');ap[i].classList.remove('flip-left');ap[i].classList.remove('flip-right')}if(pi>=0&&pi<pages.length){var page=document.getElementById('page-'+pi);page.classList.add('active');page.classList.add(pi>currentPage?'flip-right':'flip-left');currentPage=pi;updProg();window.scrollTo({top:0,behavior:'smooth'})}}""")

# 5. prevP and nextP
js_parts.append("""function prevP(){if(currentPage>0)goPage(currentPage-1)}function nextP(){if(currentPage<pages.length-1)goPage(currentPage+1);else{var ap=document.querySelectorAll('.book-page');for(var i=0;i<ap.length;i++)ap[i].classList.remove('active');document.getElementById('endingPage').style.display='block';window.scrollTo({top:0,behavior:'smooth'})}}""")

# 6. openM and closeM for image modal
js_parts.append("""function openM(el){var img=el.querySelector('img');document.getElementById('modalImage').src=img.src;document.getElementById('imageModal').classList.add('active')}function closeM(){document.getElementById('imageModal').classList.remove('active')}""")

# 7. updProg for progress bar
js_parts.append("""function updProg(){var p=document.querySelector('.progress-fill');if(p&&currentPage>=0)p.style.width=((currentPage+1)/pages.length*100)+'%';var nb=document.getElementById('pageNum');if(nb)nb.textContent=(currentPage+1)+'/'+pages.length;var cb=document.getElementById('continueBtn');if(cb){var sp=parseInt(localStorage.getItem('rainbowSeedPage'))||0;if(sp>0){cb.disabled=false;cb.textContent='\\u7e8c\\u7e8c\\u4e0a\\u6b21\\u95b1\\u8b80 '+sp+'\\u6b21'}}else{var sb=document.getElementById('startBtn');if(sb)sb.addEventListener('click',function(){goPage(0)})}}}""")

# 8. renderP function
js_parts.append("""function renderP(){var c=document.getElementById('pagesContainer');for(var i=0;i<pages.length;i++){var p=pages[i],d=document.createElement('div');d.className='book-page';d.id='page-'+i;d.innerHTML='<div class="page-image-container" onclick="openM(this);playSound(\'sparkle\')"><span class="page-number">??+(i+1)+'??/span><img src="'+p.image+'" alt="???'+(i+1)+'" loading="lazy"></div><div class="page-content"><div class="story-text">'+p.text+'</div></div><div class="page-navigation"><button class="nav-btn" onclick="prevP()"'+(i===0?' disabled':'')+'>?????/button><div class="progress-bar"><div class="progress-fill"></div></div><span class="page-number" id="pageNum">?'+(i+1)+'??/span><button class="nav-btn" onclick="nextP()"'+(i===pages.length-1?' disabled':'')+'>?????>/button></div>';c.appendChild(d)}}""")

# 9. Existing functions from the truncated JS
# Extract from current JS
script_start = data.find("<script>") + 8
script_end = data.find("</script>")
truncated_js = data[script_start:script_end]

# Find all function definitions in truncated JS
funcs = re.findall(r'function\s+(\w+)\((.*?)\)\{', truncated_js)
print("Functions in truncated JS:", [f[0] for f in funcs])

# We need to extract each function body and include them
# Let me find the function definitions more carefully
for func_name in ["initAC", "createGentleMelody", "playLoop", "startBM", "stopBM", "setVol", "playSound"]:
    pattern = r'function\s+%s\([^)]*\)[^{]*(\{.*?\n?\s*\})' % func_name
    match = re.search(pattern, truncated_js, re.DOTALL)
    if match:
        js_parts.append("function %s%s" % (func_name, match.group(1)))
    else:
        # Try simpler pattern
        start = truncated_js.find("function %s" % func_name)
        if start >= 0:
            # Find matching brace
            brace_count = 0
            i = start
            found_open = False
            while i < len(truncated_js):
                if truncated_js[i] == '{':
                    brace_count += 1
                    found_open = True
                elif truncated_js[i] == '}':
                    brace_count -= 1
                if found_open and brace_count == 0:
                    func_def = truncated_js[start:i+1]
                    js_parts.append(func_def)
                    break
                i += 1

# Also add the remaining functions
for func_name in ["generateQR", "closeShareDialog", "toggleSettingsPanel", "resetSettings", "openShareDialog"]:
    start = truncated_js.find("function %s" % func_name)
    if start >= 0:
        brace_count = 0
        i = start
        found_open = False
        while i < len(truncated_js):
            if truncated_js[i] == '{':
                brace_count += 1
                found_open = True
            elif truncated_js[i] == '}':
                brace_count -= 1
            if found_open and brace_count == 0:
                func_def = truncated_js[start:i+1]
                js_parts.append(func_def)
                break
            i += 1

# 10. Add event listeners and initialization
js_parts.append("""document.addEventListener('DOMContentLoaded',function(){renderP();goPage(0)});""")

# 11. Keyboard navigation
js_parts.append("""document.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key===' ')nextP();if(e.key==='ArrowLeft')prevP()});""")

# 12. Touch/swipe support
js_parts.append("""var touchStartX=0;document.addEventListener('touchstart',function(e){touchStartX=e.changedTouches[0].screenX});document.addEventListener('touchend',function(e){var diff=e.changedTouches[0].screenX-touchStartX;if(diff<-50)nextP();if(diff>50)prevP()});""")

# Join all JS
js = "\n\n".join(js_parts)

print("\nJS total length:", len(js))
print("Functions included:", len(re.findall(r'function\s+\w+', js)))

# Now build the complete HTML
icon_svg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🌈%3C/text%3E%3C/svg%3E"

html = "<!DOCTYPE html>\r\n<html lang=\"zh-Hant\">\r\n<head>\r\n<meta charset=\"UTF-8\">\r\n"
html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n'
html += '<title>\u6ce2\u6ce2\u548c\u6735\u6735\u7684\u5f69\u8679\u7a2e\u5b50</title>\r\n'
html += '<link rel="icon" href="%s">\r\n' % icon_svg
html += "<style>\r\n" + css + "\r\n</style>\r\n</head>\r\n<body>\r\n"
html += body + "\r\n</body>\r\n"
html += "<script>\r\n" + js + "\r\n</script>\r\n</body>\r\n</html>"

# Save
with open("index_complete.html", "w", encoding="utf-8") as f:
    f.write(html)

print("\nWritten index_complete.html")

# Verify key functions
for func in ["goPage", "renderP", "prevP", "nextP", "openM", "closeM"]:
    print("  function %s: %s" % (func, "OK" if func in js else "MISSING"))
