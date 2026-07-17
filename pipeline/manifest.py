"""Gemeinsames Parsing von raw/manifest.tsv (Single Source of Truth).
Spalten (Tab): code, dateiname.pdf, quelle. Kommentar-/Leerzeilen werden ignoriert."""
import os

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = os.path.join(REPO, "raw", "manifest.tsv")

def entries():
    """Liste von (code, filename, source)."""
    rows = []
    if not os.path.exists(MANIFEST):
        return rows
    for ln in open(MANIFEST, encoding="utf-8").read().splitlines():
        ln = ln.rstrip()
        if not ln or ln.lstrip().startswith("#"):
            continue
        p = ln.split("\t")
        code = p[0].strip()
        if not code:
            continue
        fname = p[1].strip() if len(p) > 1 and p[1].strip() else f"{code}.pdf"
        src = p[2].strip() if len(p) > 2 else ""
        rows.append((code, fname, src))
    return rows

def filename(code):
    for c, f, _ in entries():
        if c == code:
            return f
    return None
