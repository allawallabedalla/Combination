# RESUME — Wiederaufnahme in jeder frischen Session

**Kein Kontext aus einem alten Chat nötig.** Der gesamte Stand liegt im Repo.

- **Repo:** `allawallabedalla/Combination`
- **Branch (hier wird gearbeitet):** `claude/repo-combination-raw-data-vbf3hw`
- **Öffentlich, ohne Geheimhaltung** (kein Zugangscode/Gate).
- Die Repos *Secret* und *ADT-Training* sind nur **Vorlagen** (nur lesen, nichts dorthin pushen).

## Aktueller Stand (Stand dieser Datei)
- **Phase 1 (Generierung): ✅ fertig** — 70/70 Skripte, **2110 quellenbelegte Fragen** in `gen/<code>.json`.
- **Phase 2 (Audit): ✅ fertig** — jede Frage gegen das Folienbild geprüft: **0 inhaltliche Fehler**,
  7 rein formale Korrekturen. Bilanz: `verify/PHASE2.md`, Protokolle: `verify/<code>.json`.
- **Phase 3 (Konsolidierung → App): ⏭️ NÄCHSTER OFFENER SCHRITT** (siehe unten).

## 0. Setup (immer zuerst)
```bash
cd /home/user/Combination            # bzw. frisch: git clone … && cd Combination
git fetch origin claude/repo-combination-raw-data-vbf3hw
git checkout claude/repo-combination-raw-data-vbf3hw
git pull --ff-only origin claude/repo-combination-raw-data-vbf3hw
pip install --quiet pymupdf pillow
```

## Wichtige Regeln / Stolperfallen (damit nichts kaputtgeht)
1. **Pro Schritt sofort committen + pushen.** So kostet ein Abbruch höchstens die eine laufende Einheit.
   Push mit Retry: `git push -u origin claude/repo-combination-raw-data-vbf3hw`.
2. **Session-Limit:** Subagenten können mit „You've hit your session limit" abbrechen. Das ist ein
   Kontolimit, KEIN Repo-Fehler. Warten bis Reset, dann Schritt neu starten. Alle Werkzeuge schreiben
   **atomar** (`.tmp` → `mv`), daher bleibt bei Abbruch die Zieldatei unversehrt. `*.json.tmp`-Reste
   gefahrlos löschen: `rm -f gen/*.json.tmp verify/*.json.tmp`.
3. **`scratch/` ist gitignored & regenerierbar** (Folienbilder). Nach einem Schritt löschen, um Platz zu sparen.
4. **Zwei bewusst leere Skripte:** `erk10` (leeres Arbeitsblatt) und `themen_uebersicht` (reine Themenliste)
   haben `gen/<code>.json = []` (0 Fragen). Das ist KEIN Fehler — der Validator meldet dafür „leeres Array".
   Bei Gesamt-Checks ausschließen:
   `python3 pipeline/validate.py $(ls gen/*.json | grep -v -E 'erk10|themen_uebersicht' | sort)` → 0 Fehler.
5. **Nicht neu generieren/auditieren, was fertig ist:** `gen/<code>.json` existiert = Phase-1-fertig;
   `verify/<code>.json` existiert = Phase-2-fertig. Codes/Dateien: `raw/manifest.tsv`.
6. **Handschrift/OCR:** Das Folien-**Bild** ist maßgeblich; `scratch/<code>/fulltext.txt` verstümmelt
   Formeln/Junktoren — nie blind darauf verlassen.

## Werkzeuge im Überblick
- `pipeline/manifest.py` — liest `raw/manifest.tsv` (code, datei, quelle).
- `pipeline/import_raw.py` — Roh-PDFs holen + auf ~150 dpi komprimieren.
- `pipeline/render.py <code>` — PDF → `scratch/<code>/pages/pNNN.png` + `fulltext.txt`.
- `pipeline/genprompt.md` — Regeln/Schema für Generierung.  `pipeline/auditfix.md` — Regeln fürs Audit.
- `pipeline/finalize.sh <code>` — Blöcke mergen → `gen/<code>.json`, commit+push, scratch löschen (Phase 1).
- `pipeline/audit_step.sh <code>` — auditiertes Skript committen, scratch löschen, **nächstes** rendern+melden (Phase 2).
- `pipeline/validate.py <dateien…>` — Schema-Validator.
- `tools/pdf_verkleinern.py` (+ `.bat`/`.command`) — eigenständiges Offline-PDF-Verkleinern.

## Fragen-Schema (ein Objekt je Frage in gen/<code>.json)
```
id, topic, difficulty(1|2|3), type("single"|"multi"|"numeric"), question,
  single/multi: options[], correct[] (0-basiert; single genau 1 richtig)
  numeric:      answer(Zahl), tolerance(Zahl), unit(String)   — KEINE options/correct
explanation (endet mit „📄 Quelle: <code>, Folie N (S.NN)"), source
```

---

# Phase 3 — Konsolidierung → App (der nächste Schritt)

Ziel: aus den 2110 Fragen die App-fertige `material/content.json` bauen und in `data/questions.js` übernehmen.
Wenig Vision nötig, größtenteils Kategorisierung + ein Merge-Schritt. Kann weitgehend in einem Rutsch laufen.

### 3.1 Topics erfassen
Aktuell tragen die Fragen **544 rohe `topic`-Keys** (Präfix je Skript, z. B. `ari23_vl11_restklassen`).
Alle Keys + Häufigkeiten auflisten:
```bash
python3 - <<'PY'
import json,glob,collections
c=collections.Counter()
for f in glob.glob("gen/*.json"):
    for q in json.load(open(f)): c[q["topic"]]+=1
print(len(c),"rohe Topics")
for k,n in c.most_common(): print(f"{n:4d}  {k}")
PY
```

### 3.2 Kuratierte Kategorien festlegen (~30–50)
Die rohen Keys thematisch zusammenführen (nicht 1 Kategorie pro Skript!). Sinnvolle Cluster, z. B.:
- **Arithmetik:** Natürliche Zahlen & Peano · Vollständige Induktion · Folgen/Fibonacci · Gauß-/Summenformeln ·
  Figurierte & Dreieckszahlen · Pascal-Dreieck & Binomialkoeffizienten · Teilbarkeit & Primzahlen ·
  Stellenwertsysteme & Rechnen in Basen · Teilbarkeitsregeln/Quersummen · Restklassen & Kongruenzen ·
  Euklidischer Algorithmus & ggT · IRI-/MIRIM-Zahlen.
- **Aussagenlogik & Beweise:** Aussagenlogik/Wahrheitstafeln · De Morgan/Verneinung · Beweismethoden/Widerspruchsbeweis · Fundamentalsatz der Arithmetik.
- **Geometrie:** Kongruenzabbildungen & Verkettung · Satzgruppe des Pythagoras · Flächeninhalte & Zerlegungsgleichheit ·
  Parkettierung & Innenwinkelsumme · Konstruktionen & Mittelpunkte.
- **Fachdidaktik:** Bildungsstandards & Kompetenzen · Begriffsbildung (van Hiele) · Didaktik der Geometrie ·
  Zahlenraum bis 100 · Räumliche Objekte/Kopfgeometrie · Erkundungs-Methodik (ICH-DU-WIR).
- **Prüfung:** Klausuren & Übungen.

Artefakte anlegen:
- `material/topic_mapping.json` — `{ "<roh_topic>": "<kuratierter_key>", … }` (100 % Abdeckung aller 544 Keys!).
- `material/topics_curated.json` — `{ "<kuratierter_key>": {"name","icon","color","quelle"}, … }`
  (`quelle` = kurzer Hinweis, welche Skripte dahinterstehen; wird in der App unter der Kategorie angezeigt).

### 3.3 Mergen + validieren → material/content.json
Alle `gen/*.json` einlesen, `q.topic` per `topic_mapping.json` auf den kuratierten Key umschreiben,
gegen `topics_curated.json` prüfen (jeder q.topic muss existieren), Schema wie in `pipeline/validate.py`.
Ergebnis: `material/content.json = { "TOPICS": <topics_curated>, "QUESTIONS": <alle Fragen> }`.
Leere Skripte (`erk10`, `themen_uebersicht`) liefern automatisch keine Fragen — ok.
Erst weiter, wenn 0 Fehler.

### 3.4 In die App übernehmen (öffentlich, KEIN Gate)
`material/content.json` in `data/questions.js` einsetzen: `SAMPLE_TOPICS` = `TOPICS`,
`SAMPLE_QUESTIONS` = `QUESTIONS` (die vorhandene Verdrahtung `window.TOPICS/QUESTIONS` unten beibehalten).
`config.js` steht bereits auf `contentGated: false`. Danach lokal testen:
```bash
python3 -m http.server 8000     # http://localhost:8000 — Kategorien + Quiz prüfen
```
Alles committen + pushen. Optional: Branding/Icons finalisieren, GitHub Pages aktivieren (Settings → Pages).

### Abnahme Phase 3
- [ ] `topic_mapping.json` deckt ALLE rohen Topics ab (0 unmapped)
- [ ] `topics_curated.json`: jede Kategorie mit name/icon/color/quelle
- [ ] `material/content.json` gebaut, Inline-Validierung = 0 Fehler, 2110 Fragen enthalten
- [ ] `data/questions.js` trägt den echten Katalog; App startet lokal, Kategorien lernbar
- [ ] committet + gepusht auf `claude/repo-combination-raw-data-vbf3hw`
