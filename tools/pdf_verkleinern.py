#!/usr/bin/env python3
"""
pdf_verkleinern.py — eigenständiges OFFLINE-Werkzeug zum Verkleinern von PDFs.

Zweck: Große Quell-PDFs (Scans, PowerPoint-Exporte, teils 50–60 MB) lokal auf
~150 dpi herunterrechnen, damit sie unter dem GitHub-100-MB-Limit bleiben und
ins Repo passen. Läuft komplett offline — keine Server, keine Cloud.

Es passiert NICHTS automatisch: du startest es selbst, wenn du willst.

BENUTZUNG
  python3 tools/pdf_verkleinern.py                 # alle PDFs im aktuellen Ordner
  python3 tools/pdf_verkleinern.py datei.pdf       # eine Datei
  python3 tools/pdf_verkleinern.py ordner/         # alle PDFs im Ordner
  python3 tools/pdf_verkleinern.py *.pdf --mb 30   # erst ab 30 MB verkleinern
  python3 tools/pdf_verkleinern.py datei.pdf --dpi 120
  python3 tools/pdf_verkleinern.py datei.pdf --inplace   # Original ersetzen (Backup .orig)

Ergebnis: verkleinerte Kopien im Unterordner `verkleinert/` (oder --inplace).
Nur wenn das Ergebnis wirklich kleiner & lesbar ist, wird es verwendet.

VORAUSSETZUNG (eines von beiden — beides offline nach einmaliger Installation):
  - Ghostscript (beste Qualität):   Windows: winget install ArtifexSoftware.GhostScript
                                    macOS:   brew install ghostscript
                                    Linux:   sudo apt-get install ghostscript
  - oder PyMuPDF (Python):          py -m pip install pymupdf   (Win)  ·  pip3 install pymupdf
Fehlt beides, sagt dir das Skript genau, was zu tun ist.
(Windows-Doppelklick: PDF_verkleinern.bat · macOS: PDF_verkleinern.command)
"""
import argparse, os, shutil, subprocess, sys

def mb(n): return f"{n/1024/1024:.1f} MB"
def have(cmd): return shutil.which(cmd) is not None

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

def compress_fitz(src, dst, dpi):
    try:
        import fitz
    except ImportError:
        return False
    try:
        d = fitz.open(src)
        d.save(dst, garbage=4, deflate=True, deflate_images=True,
               deflate_fonts=True, clean=True)
        d.close()
        return os.path.exists(dst) and os.path.getsize(dst) > 0
    except Exception:
        return False

def collect(paths):
    pdfs = []
    for p in paths:
        if os.path.isdir(p):
            for f in sorted(os.listdir(p)):
                if f.lower().endswith(".pdf"):
                    pdfs.append(os.path.join(p, f))
        elif p.lower().endswith(".pdf") and os.path.isfile(p):
            pdfs.append(p)
    # Duplikate/Backups/eigene Ausgaben ausklammern
    return [p for p in dict.fromkeys(pdfs)
            if os.sep + "verkleinert" + os.sep not in p and not p.endswith(".orig")]

def main():
    ap = argparse.ArgumentParser(description="PDFs offline auf ~150 dpi verkleinern.")
    ap.add_argument("paths", nargs="*", default=["."], help="PDF-Dateien oder Ordner (Standard: aktueller Ordner)")
    ap.add_argument("--mb", type=float, default=20.0, help="erst ab dieser Größe verkleinern (Standard 20)")
    ap.add_argument("--dpi", type=int, default=150, help="Ziel-Auflösung (Standard 150)")
    ap.add_argument("--inplace", action="store_true", help="Original ersetzen (legt <name>.orig als Backup an)")
    ap.add_argument("--outdir", default="verkleinert", help="Ausgabeordner (Standard: verkleinert/)")
    args = ap.parse_args()

    gs_ok, fitz_ok = gs_exe() is not None, have_fitz()
    if not gs_ok and not fitz_ok:
        print("✗ Weder Ghostscript noch PyMuPDF gefunden. Installiere EINES davon (offline danach):")
        print("    Windows: winget install ArtifexSoftware.GhostScript   (oder:  py -m pip install pymupdf)")
        print("    macOS:   brew install ghostscript                     (oder:  pip3 install pymupdf)")
        print("    Linux:   sudo apt-get install ghostscript             (oder:  pip3 install pymupdf)")
        sys.exit(2)
    print(f"Methode: {'Ghostscript' if gs_ok else 'PyMuPDF (Fallback)'} · Schwelle {args.mb} MB · Ziel {args.dpi} dpi\n")

    pdfs = collect(args.paths)
    if not pdfs:
        print("Keine PDFs gefunden."); sys.exit(1)
    threshold = args.mb * 1024 * 1024

    print(f"{'STATUS':9} {'VORHER':>10} {'NACHHER':>10}  DATEI")
    print("-" * 70)
    total_before = total_after = 0
    for src in pdfs:
        before = os.path.getsize(src); total_before += before
        if before <= threshold:
            print(f"{'skip':9} {mb(before):>10} {mb(before):>10}  {src}  (unter Schwelle)")
            total_after += before; continue
        best_path, best_size, method = None, before, "keine"
        for name, fn, ok in (("gs", compress_gs, gs_ok), ("fitz", compress_fitz, fitz_ok)):
            if not ok: continue
            tmp = src + f".{name}.tmp"
            if fn(src, tmp, args.dpi) and valid_pdf(tmp) and os.path.getsize(tmp) < best_size:
                if best_path and os.path.exists(best_path): os.remove(best_path)
                best_path, best_size, method = tmp, os.path.getsize(tmp), name
            elif os.path.exists(tmp):
                os.remove(tmp)
        if not best_path:
            print(f"{'kept':9} {mb(before):>10} {mb(before):>10}  {src}  (nicht kleiner)")
            total_after += before; continue
        if args.inplace:
            shutil.copyfile(src, src + ".orig")
            os.replace(best_path, src)
            out = src
        else:
            outdir = os.path.join(os.path.dirname(src) or ".", args.outdir)
            os.makedirs(outdir, exist_ok=True)
            out = os.path.join(outdir, os.path.basename(src))
            os.replace(best_path, out)
        total_after += best_size
        print(f"{'shrunk':9} {mb(before):>10} {mb(best_size):>10}  {out}  [{method}]")
    print("-" * 70)
    print(f"Summe: {mb(total_before)} → {mb(total_after)}")
    over = [p for p in pdfs if os.path.getsize(p) > 95*1024*1024]
    if over:
        print("\n⚠ Noch über 95 MB (GitHub lehnt >100 MB ab):")
        for p in over: print(f"   {mb(os.path.getsize(p))}  {p}")
        print("   → Ghostscript nutzen oder --dpi niedriger setzen.")

if __name__ == "__main__":
    main()
