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

if '--artifact' in sys.argv:
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
