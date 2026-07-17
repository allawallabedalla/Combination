# Runbook (eigenständig) — Roh-PDFs in diesem Repo → App-fertiger Fragenkatalog

> **So benutzt du das:** Gib dieses Runbook einem Claude Code, das in diesem Repo
> arbeitet. Es holt die Roh-PDFs (raw/), rendert sie, erfasst **jedes Detail**,
> prüft mehrfach und legt am Ende `material/content.json` an, aus der die App
> (`data/questions.js`) gespeist wird. **Selbstständig:** keine externen Pfade,
> keine Credentials, kein Git LFS — alle Quelldaten liegen im Repo.

**Thema:** Mathematik für Lehramt. **Öffentlich, ohne Geheimhaltung** — die
Inhalte dürfen offen im Repo liegen (kein Zugangscode/Gate wie im Vorgänger).

Regeln: **Erfinde nichts** — jede Aussage muss auf einer Folie stehen. Bevorzugt
`multi` und `numeric`. Notation (≤/<, Quantoren, Indizes, Voraussetzungen von
Sätzen) exakt wie auf der Folie. Viele Skripte sind handschriftlich → Bild genau lesen.

---

## Schritt 0 — Werkzeuge & Quellen
```bash
pip install --quiet pymupdf pillow
# Optional, aber empfohlen für starke PDF-Kompression:
#   apt-get install -y ghostscript   (sonst greift der PyMuPDF-Fallback)
```
Trage die Skripte in **`raw/manifest.tsv`** ein (`code<TAB>datei.pdf<TAB>quelle`).

## Schritt 1 — Roh-PDFs holen & klein rechnen (autark machen)
```bash
python3 pipeline/import_raw.py           # lädt/kopiert + komprimiert (>20 MB → ~150 dpi)
git add raw/ && git commit -m "raw: Skripte importiert" && git push -u origin claude/repo-combination-raw-data-vbf3hw
```
So liegen alle Quellen **komprimiert im Repo** — jeder frische Clone ist vollständig.
GitHub-Grenzen: > 100 MB werden abgelehnt, ab 50 MB Warnung; der Importer downsampled
große Scans/PowerPoint-Exporte verlustfrei-für-den-Zweck (Pipeline rendert eh 150 dpi).

## Schritt 2 — Rendern
```bash
python3 pipeline/render.py --all         # oder: python3 pipeline/render.py <code>
```
Erzeugt `scratch/<code>/pages/pNNN.png` (150 dpi) + `fulltext.txt`.
**Merke:** PowerPoint-Export-PDFs zeigen oft **zwei Folien pro Seite**. Maßgeblich
ist die **Fußzeilen-Foliennummer**, die wird zitiert — nicht der PDF-Seitenindex.
`scratch/` ist gitignored; nach Finalisierung eines PDFs wird `scratch/<code>` gelöscht.

## Schritt 3 — Fragen generieren (PDFs NACHEINANDER, jedes Detail)
Für **jede Folie mit konkretem Inhalt** (Definition, Satz + Voraussetzungen,
Beweisschritt, Rechenbeispiel mit Ergebnis, Grenzwert, Gegenbeispiel, fachdidaktisches
Prinzip) **2–4 Fragen**, die ALLE Fakten abdecken. Reine Titel-/Diskussionsfolien
überspringen (im Protokoll mit Grund). Großes PDF in Folienblöcke (~20 Seiten) teilen,
je Block **einen Subagenten** (general-purpose, model opus) starten. Prompt-Kern:

> „Lies `/home/user/Combination/pipeline/genprompt.md` und befolge es. CODE=`<code>`,
> BLOCK=`bN`, Seitenbereich pXXX–pYYY, ID-Präfix `<code>-bN-`, topic-Präfix `<code>_`,
> Ausgabepfad `/home/user/Combination/gen/parts/<code>_bN.json`."

**Budget-schonend: Blöcke einzeln/nacheinander starten (nicht 6–8 parallel).**
Schema & Regeln stehen vollständig in `pipeline/genprompt.md`.

## Schritt 4 — Finalisieren (validieren, mergen, persistieren)
```bash
bash pipeline/finalize.sh <code>
```
Validiert die Blöcke, merged → `gen/<code>.json`, aktualisiert `STATUS.md`, committet
und **pusht sofort** (pro-Skript-Persistenz → übersteht API-Limit/Container-Neustart),
löscht `scratch/<code>`. Fertig = `gen/<code>.json` existiert → beim Wiederaufsetzen ÜBERSPRINGEN.

## Schritt 5 — Audit (3 unabhängige Prüf-Agenten je Skript)
Pro Skript 1–4 unabhängige Agenten je Seitenblock, Prompt `pipeline/auditprompt.md`
(Bild maßgeblich, Fokus Formeln/Grenzwerte/Voraussetzungen). Sie schreiben
`verify/parts/<code>_aN.json`. Merge:
```bash
python3 pipeline/auditmerge.py <code>    # -> verify/<code>.json
```
Jeden von ≥ 1 Agent belegten Fund am Folienbild prüfen und in `gen/<code>.json`
korrigieren (source + explanation). **Quelltreue vor „Richtigstellung":** enthält ein
Skript selbst einen Fehler, übernimm den Skriptwert und vermerke das in der `explanation`.

## Schritt 6 — Themen gliedern & content.json bauen
Roh-`topic`-Keys je Organsystem… hier: je **Themengebiet/Kapitel** zu kuratierten
Kategorien zusammenführen (`material/topic_mapping.json`, `material/topics_curated.json`).
Jede Kategorie bekommt `name`, `icon`, `color`, `quelle` (PDF-Titel · Datum). Dann
alle `gen/*.json` mergen + inline validieren → `material/content.json`
`{TOPICS, QUESTIONS}` (Validator-Logik wie in `pipeline/validate.py`).

## Schritt 7 — In die App übernehmen
Da öffentlich: `material/content.json` direkt in `data/questions.js` einsetzen
(SAMPLE_TOPICS/SAMPLE_QUESTIONS ersetzen) und committen. **Kein** Supabase-Gate nötig.
Cloud-Sync/Erinnerungen bleiben optional (siehe README).

## Abnahme-Checkliste
- [ ] Alle Skripte in `raw/manifest.tsv`, per `import_raw.py` importiert & unter 100 MB
- [ ] Jede Inhaltsfolie hat 2–4 Fragen; Titelfolien dokumentiert übersprungen
- [ ] Nur aus der Quelle, keine Halluzination; Notation/Grenzwerte/Voraussetzungen folientreu
- [ ] Bevorzugt `multi` + `numeric`, plausible falsche Distraktoren
- [ ] Jede Frage: `source` + sichtbares `📄 Quelle: …, Folie N (S.x)`
- [ ] Themen je Kapitel gegliedert, jedes mit `quelle`
- [ ] Audit-Agenten mit Bild-Pflicht bei Formeln/Zahlen; Funde abgearbeitet
- [ ] `pipeline/validate.py` = OK, `material/content.json` gebaut
- [ ] Inhalte in `data/questions.js`, App startet lokal (`python3 -m http.server 8000`)
