# tools/ — Offline-Werkzeuge

## PDFs verkleinern (offline, ohne Cloud)
Große Quell-PDFs lokal auf ~150 dpi herunterrechnen, damit sie unter das
GitHub-100-MB-Limit passen. Nichts läuft automatisch — du startest es selbst.

### Windows (ohne Kommandozeile)
1. `pdf_verkleinern.py` **und** `PDF_verkleinern.bat` in den Ordner mit den PDFs
   (z. B. `raw\`) kopieren.
2. Doppelklick auf **`PDF_verkleinern.bat`**.
Ergebnis: Unterordner `verkleinert\`.

### macOS (ohne Terminal)
1. `pdf_verkleinern.py` **und** `PDF_verkleinern.command` in den PDF-Ordner kopieren.
2. Doppelklick auf **`PDF_verkleinern.command`** (beim ersten Mal Rechtsklick → „Öffnen").

### Kommandozeile (alle Systeme)
```bash
# Windows:
py tools\pdf_verkleinern.py raw\
# macOS/Linux:
python3 tools/pdf_verkleinern.py raw/
# Optionen:
python3 tools/pdf_verkleinern.py datei.pdf --inplace
python3 tools/pdf_verkleinern.py raw/ --mb 30 --dpi 120
```

### Voraussetzung (einmalig, danach offline)
Eines davon genügt — das Skript nennt dir sonst den genauen Befehl:

| System | Ghostscript (beste Qualität) | oder PyMuPDF |
|---|---|---|
| Windows | `winget install ArtifexSoftware.GhostScript` | `py -m pip install pymupdf` |
| macOS | `brew install ghostscript` | `pip3 install pymupdf` |
| Linux | `sudo apt-get install ghostscript` | `pip3 install pymupdf` |

Ein echtes Zero-Install gibt es fürs PDF-Downsampling nicht — irgendein PDF-Motor
muss lokal vorhanden sein. Danach läuft alles ohne Netz.

Hinweis: `pipeline/import_raw.py` macht dasselbe automatisch beim Import ins Repo –
dieses Werkzeug ist die eigenständige Offline-Variante für vorab am eigenen Rechner.
