#!/usr/bin/env python3
"""Собирает игру «Капик в космосе» из space/src в один HTML-файл.

python3 space/build.py            -> space/index.html (для GitHub Pages)
python3 space/build.py --artifact -> space/dist/kapik-artifact.html (без doctype, для артефакта)
"""
import glob, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
THREE = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
FONTS = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&family=Russo+One&display=swap'

css = open(os.path.join(SRC, 'style.css'), encoding='utf-8').read()
body = open(os.path.join(SRC, 'body.html'), encoding='utf-8').read()
js = '\n'.join(open(f, encoding='utf-8').read() for f in sorted(glob.glob(os.path.join(SRC, '*.js'))))
script = "<script>\n(function(){\n'use strict';\n" + js + "\n})();\n</script>"
head = f'<title>Капик в космосе</title>\n<link rel="stylesheet" href="{FONTS}">\n<style>\n{css}\n</style>'
inner = f'{body}\n<script src="{THREE}"></script>\n{script}'

def fontfaces():
    import base64
    R = {'cyrillic': 'U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116',
         'latin': 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'}
    out = []
    for fam, slug, weights in (('Nunito', 'nunito', (400, 700, 800, 900)), ('Russo One', 'russo-one', (400,))):
        for w in weights:
            for sub in ('cyrillic', 'latin'):
                b = base64.b64encode(open(os.path.join(HERE, 'vendor', 'fonts', f'{slug}-{sub}-{w}-normal.woff2'), 'rb').read()).decode()
                out.append(f"@font-face{{font-family:'{fam}';font-style:normal;font-weight:{w};font-display:swap;src:url(data:font/woff2;base64,{b}) format('woff2');unicode-range:{R[sub]}}}")
    return '\n'.join(out)

if '--yandex' in sys.argv:
    # Yandex Games: everything inside one index.html (no CDN), SDK from the platform's relative /sdk.js
    import zipfile
    three = open(os.path.join(HERE, 'vendor', 'three-r128.min.js'), encoding='utf-8').read()
    yhead = f'<title>Капик в космосе</title>\n<style>\n{fontfaces()}\n{css}\n</style>'
    yinner = f'{body}\n<script src="/sdk.js"></script>\n<script>\n{three}\n</script>\n{script}'
    doc = ('<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n'
           '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">\n'
           + yhead + '\n</head>\n<body>\n' + yinner + '\n</body>\n</html>\n')
    os.makedirs(os.path.join(HERE, 'dist'), exist_ok=True)
    out = os.path.join(HERE, 'dist', 'yandex', 'index.html')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(doc)
    zp = os.path.join(HERE, 'dist', 'kapik-yandex.zip')
    with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
        z.write(out, 'index.html')
    print(zp, os.path.getsize(zp), 'bytes')
elif '--artifact' in sys.argv:
    os.makedirs(os.path.join(HERE, 'dist'), exist_ok=True)
    out = os.path.join(HERE, 'dist', 'kapik-artifact.html')
    open(out, 'w', encoding='utf-8').write(head + '\n' + inner + '\n')
else:
    out = os.path.join(HERE, 'index.html')
    doc = ('<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n'
           '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">\n'
           '<meta name="theme-color" content="#0d0a1f">\n' + head + '\n</head>\n<body>\n' + inner + '\n</body>\n</html>\n')
    open(out, 'w', encoding='utf-8').write(doc)
print(out, os.path.getsize(out), 'bytes')
