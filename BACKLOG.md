# BACKLOG — Nächste Schritte (Wiederaufnahme)

**Branch:** `claude/phase-3-resume-j0cmbl` (= `main`, Live-Host über GitHub Pages).
Bei jedem Schritt: bauen → `python3 pipeline/build_content.py` → App-Test → committen + auf **Branch UND `main`** pushen (`git push origin HEAD:main`), da die Live-Seite von `main` hostet.

---

## AUFGABE: Prüfungssimulation → „Mündliche Prüfung" (Kassel L1 Mathematik, 1. Staatsexamen)

Der Nutzer will die bestehende (Multiple-Choice-)Prüfungssimulation zu einer **mündlichen Prüfung**
umbauen — **offline, textbasiert, KEIN KI-Backend** (ausdrücklich bestätigt). Außerdem soll der
**gesamte Fragenkatalog** noch einmal unter dem Blickwinkel „mündliche Prüfung + Prüfungsordnung"
geprüft werden.

### Maßgeblich: PO **2014** (nicht 2023!)
Quelltexte liegen im Repo unter `material/exam/`:
- `PO_2014_L1_HF.txt` ← **maßgeblich** (d0c21a22-105_L1_HF_PO_20141127.pdf)
- `MPO_2023_L1_Mathematik.txt`, `PO_2023_L1_Mathe.txt` (neuer, reichere Modulbeschreibung; nur ergänzend)

### Authentische Prüfungsparameter (aus den Ordnungen belegt)
- **Prüfungsform:** mündliche Modulprüfung; **von mehreren Prüfenden** abgenommen; über die
  wesentlichen Gegenstände/Ergebnisse wird ein **Protokoll** geführt; **Ergebnis wird im Anschluss
  mitgeteilt** (PO 2014 §… „mündliche Prüfung"). 
- **Dauer:** laut PO 2014 „im Modulhandbuch auszuweisen"; Standard-Spanne der Ordnungen = **10–30 Min**
  (MPO 2023 nennt durchgängig „mündliche Prüfung (10 bis 30 Minuten)"). → Default **10/20/30 Min** wählbar.
- **Bewertung:** **Notenpunkte 0–15**, Zuordnung zu Noten 1–6; **bestanden ab 5 Punkten** („ausreichend").
- **Modul MAL1-1 „Arithmetik und Geometrie GS, Grundlagen u. Didaktik"** ist das relevante Modul
  (geht mit zwei weiteren in die Gesamtnote der Ersten Staatsprüfung ein).

### Fachliche Schwerpunkte (MAL1-1 Lehrinhalte) — decken sich mit unseren 28 Kategorien
- **Arithmetik:** Stellenwertsysteme & Grundrechen-Algorithmen · Teilbarkeit/Teilermengen/Teilerrelationen ·
  Primzahlen · Kongruenzen · Aussagenlogik · Beweisformen.
- **Geometrie:** Kongruenz-/Ähnlichkeitsabbildungen · Kongruenz/Symmetrie/Ähnlichkeit ebener Figuren
  (abbildungsgeometrisch + messend) · Dreieckskonstruktionen & besondere Linien im Dreieck ·
  Flächeninhalte · Satzgruppe des Pythagoras · reguläre Polygone · Bandornamente & Parkette · Körper.

### Kompetenzen (= Bewertungsraster einer mündlichen Antwort), aus MAL1-1
explorieren & Strukturen/Zusammenhänge erkennen, Vermutungen aufstellen · Lösungswege entwickeln,
kontrollieren, dokumentieren · fach- und **adressatengerecht** präsentieren (Symbolsprache/Medien) ·
**Aussagen formulieren, auf Plausibilität prüfen und begründen** · **Beweisformen kennen und einfache
Beweise führen** · Wissen eigenständig erwerben.

---

## Plan (in Reihenfolge)

### Schritt A — Katalog unter dem Prüfungs-Blickwinkel bewerten
1. **Coverage-Check:** je MAL1-1-Schwerpunkt zählen, wie viele Fragen existieren (Mapping-Datei
   `material/topic_mapping.json` + Kategorien). Lücken markieren, v. a. bei **Beweisformen** und
   **didaktischem Transfer (Primarstufe)** — die sind für die mündliche Prüfung zentral, im MC-Katalog
   aber unterrepräsentiert.
2. **Eignung:** MC-Fragen sind nur begrenzt „mündlich". Für die mündliche Prüfung braucht es **offene**
   Fragen (erklären/begründen/beweisen/didaktisch einordnen). Die vorhandenen `explanation`-Felder sind
   die Musterantwort-Substanz.

### Schritt B — Offener Prüfungsfragen-Katalog `material/oral.json`
- Schema-Vorschlag je Eintrag:
  `{ id, schwerpunkt(→Kategorie-Key), stufe("definition"|"beispiel"|"beweis"|"didaktik"),
     frage, musterantwort, kriterien[<Kompetenz-Checkpunkte>], quelle }`
- **~4 offene Fragen je Schwerpunkt** (Definition → Beispiel/Verfahren → Begründung/Beweis →
  Transfer/Didaktik Primarstufe) ⇒ ~100–120 Einträge.
- **Erzeugung:** parallele Subagenten (wie bei der Frage-Bereinigung), gegroundet auf
  `gen/*.json`-Erklärungen + den MAL1-1-Kompetenzen. Musterantworten knapp, prüfungsnah.
- Reproduzierbar in `pipeline/build_content.py` mit einbinden (oral.json → in die App).

### Schritt C — Neuer App-Modus „Mündliche Prüfung" (js/app.js, offline)
- **Setup:** 1–2 Schwerpunkte + Dauer (10/20/30 Min).
- **Prüfungsgespräch:** offene Fragekaskade Definition→Beispiel→Beweis→Didaktik; „Musterantwort zeigen".
- **Je Frage:** Musterantwort + Kompetenz-Checkliste → **Selbsteinschätzung** (0–3 pro Kriterium).
- **Timer** 10–30 Min; **Protokoll**-Ansicht (Liste der gestellten Fragen + eigene Notizen).
- **Abschluss:** Aggregation zu **Notenpunkten 0–15** (bestanden ab 5) + Feedback je Kompetenz.
- Bestehende MC-Simulation als zweiten Modus **erhalten** (nicht ersetzen).

### Schritt D — Feinschliff
- „Mehrere Prüfende": optional 2 Prüfer-Personas (fachlich + fachdidaktisch) im Text andeuten.
- Doku (README/RESUME) + App-Version hochzählen. Committen + auf `main` pushen.

## Offene Entscheidungen (beim Weitermachen kurz mit Nutzer klären)
- Tiefe: reichen ~4 offene Fragen/Schwerpunkt?
- Sollen MC-Fragen zusätzlich in offene „Erkläre/Begründe"-Prompts umgewandelt werden (mehr Volumen)?
- Exakte **Dauer** aus dem **Modulhandbuch 2014** verifizieren (PO verweist dorthin).

## WICHTIG / BUG: Fremd-Inhalte (ADT-Trainer) dürfen NICHT erscheinen
Der Nutzer sah noch Fragen/Prüfungen aus dem alten **ADT-Trainer**.
- **Ursache:** `data/questions.js` bevorzugte einen localStorage-Cache `adt_content_v1` vor dem
  eingebetteten Katalog. Ein Alt-Cache derselben Origin (z. B. `localhost:8000` aus einer früheren
  ADT-App) überschrieb damit unseren Mathe-Katalog.
- **Fix (angewandt in `pipeline/build_content.py`):** kein localStorage-Override mehr; eingebetteter
  Katalog ist allein maßgeblich; Alt-Cache `adt_content_v1` wird beim Laden aktiv entfernt.
  → Danach `python3 pipeline/build_content.py` (regeneriert `data/questions.js`).
- **Noch verifizieren (nächste Session):**
  1. Nutzer soll einmal **hart neu laden** (Cmd/Ctrl+Shift+R) bzw. Website-Daten löschen — der Alt-Cache
     wird dann entfernt.
  2. Prüfen, ob `js/app.js` an irgendeiner Stelle noch `adt_content_v1` schreibt (Gating-Pfad
     `contentGated` ist aus, sollte also nicht feuern) — ggf. ganz entschärfen.
  3. Voller Rest-Scan auf medizinische Begriffe (tumor|onkolog|ICD|TNM|dokumentar …) in
     `index.html js/*.js data/questions.js material/content.json` — muss leer sein (interne
     Keys `adt_*` sind ok und bleiben).
  4. Prüfungssimulation zieht ihre Fragen aus `QUESTIONS` → mit korrektem Katalog automatisch sauber.

## Status vor dieser Pause (bereits erledigt)
- Phase 3 fertig (28 Kategorien, `material/content.json`, `data/questions.js`), App live über `main`/Pages.
- App umbenannt in **„Conne Super!"**; Supabase-Sync eingerichtet (`config.js` gesetzt, `sync-setup.sql`).
- Fragen selbsterklärend gemacht: 1343 umformuliert, 11 entfernt → **2099 Fragen**, 0 Schemafehler.
- Nächster Schritt = dieser Backlog (Mündliche-Prüfung-Modus).
