#!/usr/bin/env python3
"""
import_raw.py — Roh-PDFs in dieses Repo holen und für Git klein rechnen.

Warum: Manche Quell-PDFs (Scans, PowerPoint-Exporte) sind 50–60 MB. GitHub lehnt
Dateien > 100 MB ab und warnt ab 50 MB. Die Pipeline rendert ohnehin nur mit
150 dpi — deshalb werden große PDFs beim Import verlustfrei-für-den-Zweck auf
~150 dpi heruntergerechnet. So bleibt alles direkt im Repo (kein Git LFS, keine
externen Credentials), und Multi-Agent-Workflows laufen autark.

Ablauf pro Zeile in raw/manifest.tsv (Tab-getrennt):
    <code>\t<zieldateiname.pdf>\t<quelle>
  quelle =
    - http(s)://…            -> herunterladen
    - /pfad/… oder ./pfad/…  -> lokal kopieren
    - (leer)                 -> Datei muss bereits unter raw/<zieldatei> liegen

Kompression:
    1. Ghostscript (`gs`) falls vorhanden  -> bestes Ergebnis (echtes Downsampling).
    2. Sonst PyMuPDF strukturelle Recompression (garbage/deflate/clean) als Fallback.
  Es gewinnt immer die kleinere gültige Datei; das Original wird nur ersetzt,
  wenn das Ergebnis kleiner und lesbar ist.

Idempotent: bereits vorhandene raw/<datei> unter dem Schwellwert werden übersprungen.

Aufruf:
    python3 pipeline/import_raw.py                # ganzes Manifest
    python3 pipeline/import_raw.py <code> [<code> …]   # nur diese Codes
    THRESHOLD_MB=20 python3 pipeline/import_raw.py     # Kompressions-Schwelle ändern
    TARGET_DPI=150 python3 pipeline/import_raw.py      # Ziel-DPI für Ghostscript
"""
import os, sys, shutil, subprocess, urllib.request, urllib.error

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(REPO, "raw")
MANIFEST = os.path.join(RAW, "manifest.tsv")

THRESHOLD = float(os.environ.get("THRESHOLD_MB", "20")) * 1024 * 1024   # ab hier komprimieren
WARN_LIMIT = 95 * 1024 * 1024                                           # GitHub-Hardlimit 100 MB
TARGET_DPI = int(os.environ.get("TARGET_DPI", "150"))

def mb(n): return f"{n/1024/1024:.1f} MB"
def have(cmd): return shutil.which(cmd) is not None

def read_manifest():
    rows = []
    if not os.path.exists(MANIFEST):
        sys.exit(f"Kein Manifest: {MANIFEST}\nLege raw/manifest.tsv an (Spalten: code<TAB>datei.pdf<TAB>quelle).")
    for ln in open(MANIFEST, encoding="utf-8").read().splitlines():
        ln = ln.rstrip()
        if not ln or ln.lstrip().startswith("#"):
            continue
        parts = ln.split("\t")
        code = parts[0].strip()
        fname = parts[1].strip() if len(parts) > 1 and parts[1].strip() else f"{code}.pdf"
        src = parts[2].strip() if len(parts) > 2 else ""
        rows.append((code, fname, src))
    return rows

def fetch(src, dest):
    """Quelle nach dest holen. Gibt True zurück, wenn dest danach existiert."""
    if os.path.exists(dest):
        return True
    if not src:
        return False
    if src.startswith(("http://", "https://")):
        print(f"    ↓ download {src}")
        try:
            req = urllib.request.Request(src, headers={"User-Agent": "combination-import/1.0"})
            with urllib.request.urlopen(req, timeout=120) as r, open(dest + ".part", "wb") as f:
                shutil.copyfileobj(r, f)
            os.replace(dest + ".part", dest)
            return True
        except (urllib.error.URLError, OSError) as e:
            print(f"    ✗ Download fehlgeschlagen: {e}")
            if os.path.exists(dest + ".part"):
                os.remove(dest + ".part")
            return False
    # lokaler Pfad
    p = src if os.path.isabs(src) else os.path.join(REPO, src)
    if os.path.exists(p):
        print(f"    ⧉ copy {p}")
        shutil.copyfile(p, dest)
        return True
    print(f"    ✗ Quelle nicht gefunden: {src}")
    return False

def valid_pdf(path):
    try:
        import fitz
        d = fitz.open(path); ok = d.page_count > 0; d.close(); return ok
    except Exception:
        # ohne PyMuPDF: grobe Signaturprüfung
        try:
            with open(path, "rb") as f:
                return f.read(5) == b"%PDF-"
        except OSError:
            return False

def compress_gs(src, dst):
    """Ghostscript-Downsampling auf TARGET_DPI. True bei Erfolg."""
    try:
        r = subprocess.run(
            ["gs", "-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.5",
             "-dPDFSETTINGS=/ebook", "-dNOPAUSE", "-dBATCH", "-dQUIET",
             "-dDetectDuplicateImages=true",
             f"-dColorImageResolution={TARGET_DPI}",
             f"-dGrayImageResolution={TARGET_DPI}",
             f"-dMonoImageResolution={max(TARGET_DPI*2,300)}",
             "-dDownsampleColorImages=true", "-dDownsampleGrayImages=true",
             f"-sOutputFile={dst}", src],
            capture_output=True, timeout=600)
        return r.returncode == 0 and os.path.exists(dst) and os.path.getsize(dst) > 0
    except (OSError, subprocess.SubprocessError):
        return False

def compress_fitz(src, dst):
    """Fallback ohne Ghostscript: strukturelle Recompression via PyMuPDF."""
    try:
        import fitz
    except ImportError:
        subprocess.run([sys.executable, "-m", "pip", "install", "--quiet", "pymupdf"], check=False)
        try:
            import fitz
        except ImportError:
            return False
    try:
        d = fitz.open(src)
        d.save(dst, garbage=4, deflate=True, deflate_images=True, deflate_fonts=True, clean=True)
        d.close()
        return os.path.exists(dst) and os.path.getsize(dst) > 0
    except Exception:
        return False

def process(code, fname):
    dest = os.path.join(RAW, fname)
    size = os.path.getsize(dest)
    if size <= THRESHOLD:
        return ("ok", size, size, "unter Schwelle")
    # Kandidaten erzeugen, kleinsten gültigen wählen
    best_path, best_size, method = None, size, "keine"
    for name, fn in (("gs", compress_gs), ("fitz", compress_fitz)):
        if name == "gs" and not have("gs"):
            continue
        tmp = dest + f".{name}.tmp"
        if fn(dest, tmp) and valid_pdf(tmp):
            s = os.path.getsize(tmp)
            if s < best_size:
                if best_path and os.path.exists(best_path):
                    os.remove(best_path)
                best_path, best_size, method = tmp, s, name
            else:
                os.remove(tmp)
        elif os.path.exists(tmp):
            os.remove(tmp)
    if best_path:
        os.replace(best_path, dest)
        return ("shrunk", size, best_size, method)
    return ("kept", size, size, "nicht kleiner zu bekommen")

def main():
    only = set(sys.argv[1:])
    rows = read_manifest()
    if only:
        rows = [r for r in rows if r[0] in only]
    if not rows:
        sys.exit("Nichts zu tun (Manifest leer oder Code nicht gefunden).")
    if not have("gs"):
        print("ℹ Ghostscript (gs) nicht gefunden → Fallback PyMuPDF (schwächere Kompression).")
        print("  Für beste Ergebnisse: apt-get install ghostscript  bzw.  pip nutzt PyMuPDF-Fallback.\n")
    print(f"{'CODE':14} {'STATUS':8} {'VORHER':>10} {'NACHHER':>10}  METHODE / DATEI")
    print("-" * 78)
    warn = []
    for code, fname, src in rows:
        dest = os.path.join(RAW, fname)
        if not fetch(src, dest):
            print(f"{code:14} {'FEHLT':8} {'—':>10} {'—':>10}  Quelle liefern: {src or '(raw/'+fname+')'}")
            warn.append((code, "Quelle fehlt"))
            continue
        status, before, after, method = process(code, fname)
        flag = ""
        if after > WARN_LIMIT:
            flag = "  ⚠ >95 MB — Git wird das ablehnen! gs installieren oder manuell verkleinern."
            warn.append((code, "über GitHub-Limit"))
        print(f"{code:14} {status:8} {mb(before):>10} {mb(after):>10}  {method}  {fname}{flag}")
    print("-" * 78)
    total = sum(os.path.getsize(os.path.join(RAW, f)) for _, f, _ in rows if os.path.exists(os.path.join(RAW, f)))
    print(f"Summe raw/: {mb(total)}")
    if warn:
        print("\nOffen:")
        for c, w in warn:
            print(f"  - {c}: {w}")
        sys.exit(1)
    print("✅ Import fertig. Als Nächstes: git add raw/ && commit, dann Pipeline (siehe runbook.md).")

if __name__ == "__main__":
    main()
