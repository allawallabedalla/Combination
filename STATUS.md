# STATUS — Combination: Mathematik-Fragenkatalog (Pipeline, pro-Skript persistiert)

- **Stand:** 2026-07-17 18:41 UTC
- **Branch:** `claude/repo-combination-raw-data-vbf3hw`
- **HEAD:** `—`
- **Fertige Skripte:** 0 / 0
- **Fragen gesamt (fertig + laufend, roh):** 0

> Noch keine Skripte im Manifest. Trage sie in `raw/manifest.tsv` ein und
> importiere sie mit `python3 pipeline/import_raw.py`.

## Fortschritt

| Code | Status | Fragen | PDF |
|---|---|---:|---|

## Wo liegt was

- `raw/<datei>.pdf` — komprimierte Quell-PDFs (Eingang). Manifest: `raw/manifest.tsv`.
- `gen/<code>.json` — **fertiges validiertes Skript**. Vorhandensein = erledigt → beim Wiederaufsetzen ÜBERSPRINGEN.
- `gen/parts/<code>_bN.json` — Block-Zwischenstände (→ Merge zu `gen/<code>.json`).
- `pipeline/` — Werkzeuge: `import_raw.py`, `render.py`, `genprompt.md`, `validate.py`, `finalize.py`, `finalize.sh`, `genstatus.py`, `auditprompt.md`, `auditmerge.py`, `manifest.py`.
- `scratch/` — Renders, **gitignored & flüchtig**, nach Finalisierung gelöscht.
- `material/`, `verify/` — Kategorien (Phase 3) / Audit (Phase 2).

## Pipeline pro PDF

1. `python3 pipeline/import_raw.py <code>` → holt & komprimiert `raw/<datei>.pdf`.
2. `python3 pipeline/render.py <code>` → `scratch/<code>/pages/pNNN.png` @150 dpi (2 Folien/Seite möglich).
3. Opus-Subagenten (Seitenblöcke) lesen `pipeline/genprompt.md`, sehen PNGs, schreiben `gen/parts/<code>_bN.json`.
4. `bash pipeline/finalize.sh <code>` → validieren, mergen, `gen/<code>.json`, commit+push, `scratch/<code>` löschen, STATUS.md aktualisieren.

## Resume (übersteht Limit/Container-Stopp)

- Alles Fertige liegt auf origin; ein Stopp kostet höchstens den einen laufenden Block.
- Skripte mit `gen/<code>.json` überspringen; für `laufend`-Skript fehlende Blöcke neu erzeugen → `finalize.sh`.

