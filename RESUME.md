# RESUME — Wiederaufnahme in jeder frischen Session

**Kein Kontext aus einem alten Chat nötig.** Der gesamte Stand liegt im Repo.

## 0. Setup
```bash
git fetch origin claude/repo-combination-raw-data-vbf3hw
git checkout claude/repo-combination-raw-data-vbf3hw
pip install --quiet pymupdf pillow
cat STATUS.md            # Skript-Status
```
Fertig = `gen/<code>.json` existiert → ÜBERSPRINGEN. Codes/PDFs/Quellen: `raw/manifest.tsv`.
Rendern erzeugt `scratch/` (gitignored, regenerierbar); nach Abschluss gelöscht.

## 1. Rohdaten sicherstellen
Fehlt eine `raw/<datei>.pdf`? → `python3 pipeline/import_raw.py <code>` (holt + komprimiert),
dann `git add raw/ && git commit && git push -u origin claude/repo-combination-raw-data-vbf3hw`.

## 2. Generierung (pro offenem `<code>` aus manifest.tsv ohne `gen/<code>.json`)
```bash
python3 pipeline/render.py <code>        # scratch/<code>/pages/pNNN.png @150 dpi
```
Je ~20 Seiten ein Subagent (general-purpose, model opus). Prompt-Kern:
> „Lies `/home/user/Combination/pipeline/genprompt.md` und befolge es. CODE=`<code>`,
> BLOCK=`bN`, Seitenbereich pXXX–pYYY, ID-Präfix `<code>-bN-`, topic-Präfix `<code>_`,
> Ausgabepfad `/home/user/Combination/gen/parts/<code>_bN.json`."
**Blöcke EINZELN starten (Budget).** Danach:
```bash
bash pipeline/finalize.sh <code>         # validieren, mergen, commit+push, scratch löschen
```

## 3. Audit (Phase 2)
Pro Skript unabhängige Prüf-Agenten je Block, Prompt `pipeline/auditprompt.md`
(PDF vorher rendern), Ausgabe `verify/parts/<code>_aN.json`. Merge:
`python3 pipeline/auditmerge.py <code>` → `verify/<code>.json`. Belegte Funde am Bild
in `gen/<code>.json` korrigieren.

## 4. Konsolidierung (Phase 3)
`gen/*.json` → Kategorien kuratieren (`material/topics_curated.json`, mit icon/color/quelle)
→ mergen + validieren → `material/content.json`. Dann Inhalt in `data/questions.js`
einsetzen (öffentlich, kein Gate) und committen.

## Robustheit
Alles Fertige liegt sofort auf origin (pro-Skript commit+push in `finalize.sh`). Ein
API-Limit- oder Container-Stopp kostet höchstens den einen laufenden Block. `scratch/`
ist regenerierbar und bleibt außerhalb des Repos.
