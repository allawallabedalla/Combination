# tools/ — Offline-Werkzeuge

## PDFs verkleinern (offline, ohne Cloud)
Große Quell-PDFs lokal auf ~150 dpi herunterrechnen, damit sie unter das
GitHub-100-MB-Limit passen. Nichts läuft automatisch — du startest es selbst.

**Am Mac (ohne Terminal):** `pdf_verkleinern.py` **und** `PDF_verkleinern.command`
in den Ordner mit den PDFs (z. B. `raw/`) kopieren, dann Doppelklick auf
`PDF_verkleinern.command`. Ergebnis: Unterordner `verkleinert/`.

**Per Terminal:**
```bash
python3 tools/pdf_verkleinern.py raw/            # ganzen Ordner
python3 tools/pdf_verkleinern.py datei.pdf --inplace
python3 tools/pdf_verkleinern.py raw/ --mb 30 --dpi 120
```

**Voraussetzung** (eines, danach offline): Ghostscript (`brew install ghostscript`
bzw. `apt-get install ghostscript`) **oder** PyMuPDF (`pip3 install pymupdf`).
Fehlt beides, nennt das Skript den genauen Befehl.

Hinweis: `pipeline/import_raw.py` macht dasselbe automatisch beim Import ins Repo –
dieses Werkzeug ist die eigenständige Offline-Variante für vorab am eigenen Rechner.
