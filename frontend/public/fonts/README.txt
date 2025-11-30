Umieść tu zsubsettowane pliki Inter (np. inter-latin-400.woff2 i inter-latin-600.woff2) wygenerowane np. fonttools pyftsubset.
Przykład komendy (Linux/Mac):
pyftsubset Inter[wght].ttf --output-file=inter-latin-400.woff2 --flavor=woff2 --unicodes="U+000-5FF" --layout-features='*' --no-hinting --with-zopfli --drop-tables="DSIG" --glyph-names --obfuscate
