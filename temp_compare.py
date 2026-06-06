import sys
sys.stdout.reconfigure(encoding='utf-8')
for fname in ['book_grassland.html', 'book_rainbow.html']:
    fpath = 'C:\\Users\\USER\\Documents\\agnes_project\\' + fname
    try:
        text = open(fpath, 'r', encoding='utf-8').read()
    except:
        text = open(fpath, 'r', encoding='latin-1', errors='replace').read()
    markers = {}
    keywords = ['class="scene"', 'book-nav', 'nav-button', 'data-scene-index', 'id="scene', 'id="nav', 'onclick="prev', 'onclick="next', 'onclick="goHome', '开始', '繼續', '再阅', 'scenesData', '<script']
    for kw in keywords:
        count = text.count(kw)
        if count > 0:
            markers[kw] = count
    print(fname + ': ' + str(markers))
