html_path = r"C:\Users\USER\Documents\agnes_project\彩虹種子\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix the DOMContentLoaded restore to also add .active class
old = '''document.addEventListener("DOMContentLoaded",function(){
  renderP();
  var lp=parseInt(localStorage.getItem("rainbowSeedLastPage"))||0;
  if(lp>0&&lp<pages.length){currentPage=lp;updProg()}
});'''

new = '''document.addEventListener("DOMContentLoaded",function(){
  renderP();
  var lp=parseInt(localStorage.getItem("rainbowSeedLastPage"))||0;
  if(lp>0&&lp<pages.length){
    currentPage=lp;
    var rp=document.getElementById("page-"+lp);
    if(rp)rp.classList.add("active");
    updProg();
  }
});'''

if old in content:
    content = content.replace(old, new)
    print("Fixed: DOMContentLoaded restore now adds .active class")
else:
    print("WARNING: old pattern not found")
    # Try to find it
    idx = content.find('DOMContentLoaded')
    print("Context:", repr(content[idx:idx+300]))

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Done")
