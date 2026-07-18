#!/usr/bin/env python3
"""
pdf_verkleinern.py — eigenständiges OFFLINE-Werkzeug zum Verkleinern von PDFs.

Zweck: Große Quell-PDFs (Scans, PowerPoint-Exporte, teils 50–60 MB) lokal
verkleinern, damit sie
  - unter das GitHub-100-MB-Git-Limit passen und
  - unter die 25-MB-Grenze des GitHub-WEB-Uploads ("Upload files" im Browser).
Läuft komplett offline. Es passiert nichts automatisch — du startest es selbst.

Zwei Verfahren, es gewinnt die kleinste gültige Datei:
  1. Ghostscript (falls installiert) — beste Qualität, Textebene bleibt erhalten.
  2. PyMuPDF-Raster — rendert jede Seite neu bei Ziel-Auflösung (funktioniert IMMER,
     auch ohne Ghostscript; passt perfekt, weil die spätere Pipeline ohnehin bei
     150 dpi aus Bildern arbeitet).
Reicht die Auflösung nicht, um unter die Zielgröße zu kommen, wird sie schrittweise
gesenkt (150 → 130 → 110 → 90 → 72 dpi), bis die Datei klein genug ist.

BENUTZUNG
  python3 tools/pdf_verkleinern.py                 # alle PDFs im aktuellen Ordner
  python3 tools/pdf_verkleinern.py raw/            # alle PDFs im Ordner
  python3 tools/pdf_verkleinern.py datei.pdf --ziel-mb 24   # unter 24 MB drücken
  python3 tools/pdf_verkleinern.py datei.pdf --dpi 120
  python3 tools/pdf_verkleinern.py datei.pdf --inplace      # Original ersetzen (Backup .orig)

Ergebnis: verkleinerte Kopien im Unterordner `verkleinert/` (oder --inplace).

VORAUSSETZUNG (eines von beiden — beides offline nach einmaliger Installation):
  - PyMuPDF (empfohlen, schrumpft zuverlässig): py -m pip install pymupdf  (Win) · pip3 install pymupdf
  - oder Ghostscript (beste Qualität): Windows: winget install ArtifexSoftware.GhostScript
                                       macOS:   brew install ghostscript
                                       Linux:   sudo apt-get install ghostscript
Fehlt beides, sagt dir das Skript genau, was zu tun ist.
(Windows-Doppelklick: PDF_verkleinern.bat · macOS: PDF_verkleinern.command)
"""
import argparse, os, shutil, subprocess, sys

def mb(n): return f"{n/1024/1024:.1f} MB"

def gs_exe():
    """Ghostscript-Programm finden — heißt je nach OS anders.
    Windows: gswin64c / gswin32c · macOS/Linux: gs."""
    for name in ("gs", "gswin64c", "gswin32c"):
        if shutil.which(name):
            return name
    return None

def have_fitz():
    try:
        import fitz  # noqa: F401
        return True
    except ImportError:
        return False

def valid_pdf(path):
    if have_fitz():
        try:
            import fitz
            d = fitz.open(path); ok = d.page_count > 0; d.close(); return ok
        except Exception:
            return False
    try:
        with open(path, "rb") as f:
            return f.read(5) == b"%PDF-"
    except OSError:
        return False

def compress_gs(src, dst, dpi):
    gs = gs_exe()
    if not gs:
        return False
    try:
        r = subprocess.run(
            [gs, "-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.5",
             "-dPDFSETTINGS=/ebook", "-dNOPAUSE", "-dBATCH", "-dQUIET",
             "-dDetectDuplicateImages=true",
             f"-dColorImageResolution={dpi}", f"-dGrayImageResolution={dpi}",
             f"-dMonoImageResolution={max(dpi*2,300)}",
             "-dDownsampleColorImages=true", "-dDownsampleGrayImages=true",
             f"-sOutputFile={dst}", src],
            capture_output=True, timeout=900)
        return r.returncode == 0 and os.path.exists(dst) and os.path.getsize(dst) > 0
    except (OSError, subprocess.SubprocessError):
        return False

def compress_raster(src, dst, dpi, quality=75):
    """Jede Seite bei `dpi` neu als JPEG rendern und zu einem PDF zusammensetzen.
    Verkleinert zuverlässig auch reine Scans (rasterisiert; Textebene geht verloren —
    für die bildbasierte Fragen-Pipeline unerheblich)."""
    try:
        import fitz
    except ImportError:
        return False
    try:
        src_doc = fitz.open(src)
        out = fitz.open()
        for page in src_doc:
            pix = page.get_pixmap(dpi=dpi, colorspace=fitz.csRGB)
            try:
                img = pix.tobytes("jpeg", jpg_quality=quality)
            except TypeError:
                img = pix.tobytes("jpeg")
            rect = page.rect
            npage = out.new_page(width=rect.width, height=rect.height)
            npage.insert_image(rect, stream=img)
        out.save(dst, deflate=True, garbage=4)
        out.close(); src_doc.close()
        return os.path.exists(dst) and os.path.getsize(dst) > 0
    except Exception:
        return False

def process(src, threshold, base_dpi, target_bytes):
    before = os.path.getsize(src)
    if before <= threshold:
        return {"status": "skip", "before": before, "after": before, "method": "unter Schwelle", "path": None}
    engines = []
    if gs_exe():     engines.append(("gs", compress_gs))
    if have_fitz():  engines.append(("raster", compress_raster))
    if not engines:
        return {"status": "kept", "before": before, "after": before, "method": "kein Motor", "path": None}

    steps = [d for d in (base_dpi, 130, 110, 90, 72) if d <= base_dpi] or [base_dpi]
    best_size, best_path, best_method = before, None, "keine"
    for dpi in steps:
        for name, fn in engines:
            tmp = f"{src}.{name}{dpi}.tmp"
            if fn(src, tmp, dpi) and valid_pdf(tmp):
                s = os.path.getsize(tmp)
                if s < best_size:
                    if best_path and os.path.exists(best_path):
                        os.remove(best_path)
                    best_size, best_path, best_method = s, tmp, f"{name}@{dpi}dpi"
                elif os.path.exists(tmp):
                    os.remove(tmp)
            elif os.path.exists(tmp):
                os.remove(tmp)
        if target_bytes and best_size <= target_bytes:
            break  # Zielgröße erreicht — keine weitere Auflösungssenkung nötig
    if not best_path:
        return {"status": "kept", "before": before, "after": before, "method": "nicht kleiner", "path": None}
    return {"status": "shrunk", "before": before, "after": best_size, "method": best_method, "path": best_path}

def collect(paths):
    pdfs = []
    for p in paths:
        if os.path.isdir(p):
            for f in sorted(os.listdir(p)):
                if f.lower().endswith(".pdf"):
                    pdfs.append(os.path.join(p, f))
        elif p.lower().endswith(".pdf") and os.path.isfile(p):
            pdfs.append(p)
    return [p for p in dict.fromkeys(pdfs)
            if os.sep + "verkleinert" + os.sep not in p and not p.endswith(".orig")]

def main():
    ap = argparse.ArgumentParser(description="PDFs offline verkleinern (fürs Repo / GitHub-Upload).")
    ap.add_argument("paths", nargs="*", default=["."], help="PDF-Dateien oder Ordner (Standard: aktueller Ordner)")
    ap.add_argument("--mb", type=float, default=20.0, help="erst ab dieser Größe verkleinern (Standard 20)")
    ap.add_argument("--ziel-mb", dest="ziel_mb", type=float, default=0.0,
                    help="Zielgröße je Datei; Auflösung wird gesenkt, bis darunter (0 = aus)")
    ap.add_argument("--dpi", type=int, default=150, help="Start-Auflösung (Standard 150)")
    ap.add_argument("--inplace", action="store_true", help="Original ersetzen (legt <name>.orig als Backup an)")
    ap.add_argument("--outdir", default="verkleinert", help="Ausgabeordner (Standard: verkleinert/)")
    args = ap.parse_args()

    gs_ok, fitz_ok = gs_exe() is not None, have_fitz()
    if not gs_ok and not fitz_ok:
        print("✗ Weder PyMuPDF noch Ghostscript gefunden. Installiere EINES davon (offline danach):")
        print("    Windows: py -m pip install pymupdf   (oder:  winget install ArtifexSoftware.GhostScript)")
        print("    macOS:   pip3 install pymupdf        (oder:  brew install ghostscript)")
        print("    Linux:   pip3 install pymupdf        (oder:  sudo apt-get install ghostscript)")
        sys.exit(2)
    methoden = " + ".join(([("Ghostscript")] if gs_ok else []) + (["PyMuPDF-Raster"] if fitz_ok else []))
    ziel = f" · Ziel < {args.ziel_mb:g} MB" if args.ziel_mb else ""
    print(f"Methode: {methoden} · Schwelle {args.mb:g} MB · Start {args.dpi} dpi{ziel}\n")

    pdfs = collect(args.paths)
    if not pdfs:
        print("Keine PDFs gefunden."); sys.exit(1)
    threshold = args.mb * 1024 * 1024
    target = args.ziel_mb * 1024 * 1024 if args.ziel_mb else 0

    print(f"{'STATUS':9} {'VORHER':>10} {'NACHHER':>10}  DATEI")
    print("-" * 74)
    total_before = total_after = 0
    zu_gross = []
    for src in pdfs:
        r = process(src, threshold, args.dpi, target)
        total_before += r["before"]
        if r["path"]:
            if args.inplace:
                shutil.copyfile(src, src + ".orig")
                os.replace(r["path"], src); out = src
            else:
                outdir = os.path.join(os.path.dirname(src) or ".", args.outdir)
                os.makedirs(outdir, exist_ok=True)
                out = os.path.join(outdir, os.path.basename(src))
                os.replace(r["path"], out)
        else:
            out = src
        total_after += r["after"]
        note = "" if not r["path"] else f"  [{r['method']}]"
        if r["status"] in ("skip", "kept"):
            note = f"  ({r['method']})"
        print(f"{r['status']:9} {mb(r['before']):>10} {mb(r['after']):>10}  {out}{note}")
        if target and r["after"] > target:
            zu_gross.append((out, r["after"]))
    print("-" * 74)
    print(f"Summe: {mb(total_before)} → {mb(total_after)}")
    if zu_gross:
        print(f"\n⚠ Noch über der Zielgröße ({args.ziel_mb:g} MB):")
        for p, s in zu_gross:
            print(f"   {mb(s)}  {p}")
        print("   → niedrigere --dpi probieren, oder per GitHub Desktop / Git hochladen")
        print("     (Git erlaubt bis 100 MB/Datei; nur der Web-Upload ist auf 25 MB begrenzt).")

if __name__ == "__main__":
    main()
