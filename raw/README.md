# raw/ — Quell-PDFs (Eingang der Pipeline)

Hier liegen die **Roh-Skripte** für „Mathematik für Lehramt": PDFs, teils
handschriftlich gescannt, teils PowerPoint-Exporte. Dieses Repo ist **öffentlich
und ohne Geheimhaltung** — die PDFs liegen bewusst **im Git-Repo**, damit spätere
Multi-Agent-Workflows **autark** laufen (frischer Clone = alles da, kein externer
Speicher, keine Credentials).

## Warum komprimiert?
GitHub lehnt Dateien **> 100 MB** ab und warnt ab **50 MB**. Manche Quellen sind
50–60 MB. Die Pipeline rendert Folien ohnehin nur mit **150 dpi** — deshalb werden
große PDFs beim Import auf ~150 dpi heruntergerechnet. Für die Fragen-Generierung
ist das **verlustfrei**, spart aber massiv Platz und hält die Git-Historie schlank.

## So fügst du Skripte hinzu
1. Zeile(n) in [`manifest.tsv`](manifest.tsv) eintragen: `code<TAB>datei.pdf<TAB>quelle`.
   - `quelle` kann eine **URL**, ein **lokaler Pfad** oder **leer** sein
     (dann muss die Datei schon unter `raw/` liegen).
2. Import + Kompression laufen lassen:
   ```bash
   python3 pipeline/import_raw.py            # ganzes Manifest
   python3 pipeline/import_raw.py analysis1  # nur ein Code
   ```
   Ghostscript wird bevorzugt (bestes Downsampling); ohne `gs` greift ein
   PyMuPDF-Fallback. Das Skript zeigt Vorher/Nachher-Größen und warnt, falls eine
   Datei über dem GitHub-Limit bleibt.
3. Ergebnis committen: `git add raw/ && git commit`.

## Konventionen
- Dateinamen stabil halten (das Manifest referenziert sie; die Pipeline zitiert sie als Quelle).
- Unkomprimierte Originale, die du **nicht** committen willst, unter `raw/_orig/`
  ablegen — dieser Unterordner ist `.gitignore`t und dient nur als lokale Import-Quelle.
- `scratch/` (gerenderte Folienbilder) ist flüchtig und ebenfalls gitignored.
