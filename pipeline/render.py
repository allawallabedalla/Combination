#!/usr/bin/env python3
"""
render.py — ein Roh-PDF in Folienbilder + Textextrakt rendern (Pipeline-Schritt 1).

    python3 pipeline/render.py <code> [<code> …]     # gezielt
    python3 pipeline/render.py --all                 # alle noch nicht gerenderten

Erzeugt (gitignored, flüchtig, regenerierbar):
    scratch/<code>/pages/pNNN.png   (150 dpi, zero-padded 3-stellig)
    scratch/<code>/fulltext.txt     (Textextrakt, nur Hilfe — maßgeblich ist das Bild)

Hinweis: PowerPoint-Export-PDFs zeigen oft ZWEI Folien pro Seite (oben+unten).
Maßgeblich zum Zitieren ist die Fußzeilen-Foliennummer, nicht der PDF-Seitenindex.
Nach dem Finalisieren eines Skripts wird scratch/<code> gelöscht (spart Platz).
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import manifest as M

DPI = int(os.environ.get("RENDER_DPI", "150"))

def render(code):
    fname = M.filename(code)
    if not fname:
        print(f"[{code}] nicht im Manifest (raw/manifest.tsv)"); return False
    pdf = os.path.join(M.REPO, "raw", fname)
    if not os.path.exists(pdf):
        print(f"[{code}] raw/{fname} fehlt — erst: python3 pipeline/import_raw.py {code}"); return False
    try:
        import fitz
    except ImportError:
        import subprocess
        subprocess.run([sys.executable, "-m", "pip", "install", "--quiet", "pymupdf"], check=True)
        import fitz
    d = os.path.join(M.REPO, "scratch", code)
    if os.path.exists(os.path.join(d, "pages")) and os.listdir(os.path.join(d, "pages")):
        print(f"[{code}] bereits gerendert → übersprungen"); return True
    os.makedirs(os.path.join(d, "pages"), exist_ok=True)
    doc = fitz.open(pdf); full = []
    for i, p in enumerate(doc, 1):
        full.append(f"\n===== PDF-SEITE {i} =====\n{p.get_text()}")
        p.get_pixmap(dpi=DPI).save(os.path.join(d, "pages", f"p{i:03d}.png"))
    open(os.path.join(d, "fulltext.txt"), "w", encoding="utf-8").write("".join(full))
    print(f"[{code}] {len(doc)} Seiten @ {DPI} dpi → scratch/{code}/")
    return True

def main():
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    codes = [c for c, _, _ in M.entries()] if args == ["--all"] else args
    for c in codes:
        render(c)

if __name__ == "__main__":
    main()
