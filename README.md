# Conne Super! – Lern-App + Fragen-Pipeline (Combination)

Eine Lern-App (PWA, offline-fähig, iOS-tauglich) für **Mathematik im
Lehramtsstudium** — plus die **Pipeline**, die den Fragenkatalog aus Roh-PDFs
erzeugt. Gleiche App-Idee wie *ADT-Training*, gleiche Erzeugungs-Methode wie
*Secret*, hier aber **öffentlich und ohne Geheimhaltung** in **einem** Repo,
damit Multi-Agent-Workflows **autark** laufen.

## Zwei Teile in einem Repo
1. **App** (Repo-Root): `index.html`, `css/`, `js/`, `data/questions.js`, `config.js`,
   `manifest.webmanifest`, `sw.js`, `icons/`, `supabase/` — statische PWA, hostbar über
   GitHub Pages. Inhalte liegen offen in `data/questions.js` (kein Zugangscode).
2. **Pipeline** (`raw/`, `pipeline/`, `gen/`, `material/`, `verify/`): erzeugt aus den
   Quell-PDFs den validierten, quellenbelegten Fragenkatalog. Ablauf: **`runbook.md`**.

## Rohdaten: wo & wie (der Kernpunkt)
Die Quell-PDFs (teils handschriftlich, teils PowerPoint-Export, teils ~60 MB) liegen
**komprimiert direkt im Repo** unter `raw/` — kein externer Speicher, kein Git LFS,
keine Credentials. Grund: ein frischer Clone muss vollständig sein, damit autonome
Agents ohne Netzabhängigkeit arbeiten.

- GitHub-Grenzen: Dateien **> 100 MB** werden abgelehnt, ab **50 MB** gibt es eine Warnung.
- Der Importer **`pipeline/import_raw.py`** holt jede Quelle (URL/lokaler Pfad) und
  rechnet große PDFs auf **~150 dpi** herunter (Ghostscript, sonst PyMuPDF-Fallback).
  Für die Fragen-Generierung ist das verlustfrei (die Pipeline rendert ohnehin 150 dpi).
- Steuerdatei: **`raw/manifest.tsv`** (`code<TAB>datei.pdf<TAB>quelle`). Details: `raw/README.md`.

```bash
# 1) raw/manifest.tsv befüllen, dann:
python3 pipeline/import_raw.py            # holen + komprimieren
python3 pipeline/render.py --all          # Folienbilder @150 dpi
#   → Fragen generieren (Subagenten, siehe runbook.md) →
bash pipeline/finalize.sh <code>          # validieren, mergen, commit+push
```

## Struktur
```
(Root)                     PWA-App (index.html, css/, js/, data/, config.js, sw.js, icons/, supabase/)
raw/                       Quell-PDFs (komprimiert) + manifest.tsv        ← Eingang
pipeline/                  import_raw.py, render.py, genprompt.md, validate.py,
                           finalize.py/.sh, genstatus.py, auditprompt.md, auditmerge.py, manifest.py
gen/<code>.json            fertige validierte Fragensätze je Skript        ← Deliverable
gen/parts/<code>_bN.json   Block-Zwischenstände (Merge-Quelle)
material/                  Kategorien-Artefakte + content.json (Phase 3)
verify/                    Audit-Ergebnisse (Phase 2)
scratch/                   gerenderte Folienbilder — GITIGNORED & flüchtig
runbook.md                 eigenständiger Gesamtprozess (für autonome Sessions)
STATUS.md / RESUME.md      Fortschritt & Wiederaufnahme
```

## App lokal testen
```bash
python3 -m http.server 8000     # dann http://localhost:8000
```

## Hosting (GitHub Pages)
Settings → *Pages* → *Deploy from a branch* → Branch + Ordner `/(root)` → *Save*.
HTTPS ist nötig, damit Service Worker/Offline funktioniert.

## Cloud-Sync & Erinnerungen (optional)
Wie in ADT-Training über ein kostenloses Supabase-Projekt (Werte in `config.js`).
Ohne Konfiguration läuft die App voll offline und lokal. Anleitung/SQL: `supabase/`.

## Lernmodi der App
- **Gemischtes / Nach Thema / Fällige Wiederholungen** – Multiple-Choice mit Spaced Repetition (Leitner).
- **Prüfungssimulation** – 30 MC-Fragen, Timer, bestanden ab 50 %.
- **Mündliche Prüfung** – Prüfungsgespräch nach **Kassel L1 (PO 2014, Modul MAL1-1)**: offene Fragen in der
  Kaskade Definition → Verfahren → **Beweis** → Vertiefung → **Didaktik**, zwei Prüfer-Personas
  (Fachwissenschaft/Fachdidaktik), 10/20/30 Min, Selbstbewertung → **Notenpunkte 0–15** (bestanden ab 5).
  Offline, ohne Backend. Fragen: `material/oral.json` → `data/oral.js`. Ordnungen: `material/exam/`.

## Status
- **Phase 1 (Generierung): ✅ fertig** — 70/70 Skripte, **2110 quellenbelegte Fragen** (`gen/<code>.json`).
- **Phase 2 (Audit): ✅ fertig** — jede Frage gegen das Folienbild geprüft, **0 inhaltliche Fehler**
  (7 rein formale Korrekturen). Bilanz: `verify/PHASE2.md`.
- **Phase 3 (Konsolidierung → App): ✅ fertig** — 544 rohe Topics → **28 kuratierte Kategorien**,
  gemergt zu `material/content.json` (2110 Fragen, 0 Fehler) und in `data/questions.js` übernommen.
  App lokal getestet (Kategorien + Quiz laufen). Reproduzierbar über `pipeline/build_content.py`.

**Wie eine neue Session hier fehlerfrei weitermacht: siehe `RESUME.md`** (Branch, Setup, Stolperfallen,
Phase-3-Anleitung). Branch: `claude/repo-combination-raw-data-vbf3hw`. Fortschritt je Skript: `STATUS.md`.
