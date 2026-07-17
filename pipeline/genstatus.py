import json, glob, os, sys, subprocess, datetime
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import manifest as M
os.chdir(M.REPO)
man = [(c, f) for c, f, _ in M.entries()]
def nq(code):
    f=f"gen/{code}.json"; return len(json.load(open(f))) if os.path.exists(f) else None
def parts(code): return sorted(glob.glob(f"gen/parts/{code}_b*.json"))
head=subprocess.run(["git","rev-parse","--short","HEAD"],capture_output=True,text=True).stdout.strip() or "—"
ts=datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
rows=[]; done=0; total=0; inprog=[]; pending=[]
for code,pdf in man:
    final=nq(code)
    if final is not None: rows.append((code,"FERTIG",final,pdf)); done+=1; total+=final
    else:
        p=parts(code)
        if p:
            s=sum(len(json.load(open(x))) for x in p)
            rows.append((code,f"laufend ({len(p)} Blöcke, {s} Fragen, nicht gemergt)",s,pdf)); inprog.append(code); total+=s
        else: rows.append((code,"offen",0,pdf)); pending.append(code)
L=[]
L+=["# STATUS — Combination: Mathematik-Fragenkatalog (Pipeline, pro-Skript persistiert)\n"]
L+=[f"- **Stand:** {ts}", "- **Branch:** `claude/repo-combination-raw-data-vbf3hw`", f"- **HEAD:** `{head}`",
    f"- **Fertige Skripte:** {done} / {len(man)}", f"- **Fragen gesamt (fertig + laufend, roh):** {total}\n"]
if not man:
    L+=["> Noch keine Skripte im Manifest. Trage sie in `raw/manifest.tsv` ein und",
        "> importiere sie mit `python3 pipeline/import_raw.py`.\n"]
L+=["## Fortschritt\n","| Code | Status | Fragen | PDF |","|---|---|---:|---|"]
for code,st,q,pdf in rows: L.append(f"| `{code}` | {st} | {q if q else ''} | {pdf[:48]} |")
L+=["","## Wo liegt was\n",
 "- `raw/<datei>.pdf` — komprimierte Quell-PDFs (Eingang). Manifest: `raw/manifest.tsv`.",
 "- `gen/<code>.json` — **fertiges validiertes Skript**. Vorhandensein = erledigt → beim Wiederaufsetzen ÜBERSPRINGEN.",
 "- `gen/parts/<code>_bN.json` — Block-Zwischenstände (→ Merge zu `gen/<code>.json`).",
 "- `pipeline/` — Werkzeuge: `import_raw.py`, `render.py`, `genprompt.md`, `validate.py`, `finalize.py`, `finalize.sh`, `genstatus.py`, `auditprompt.md`, `auditmerge.py`, `manifest.py`.",
 "- `scratch/` — Renders, **gitignored & flüchtig**, nach Finalisierung gelöscht.",
 "- `material/`, `verify/` — Kategorien (Phase 3) / Audit (Phase 2).\n",
 "## Pipeline pro PDF\n",
 "1. `python3 pipeline/import_raw.py <code>` → holt & komprimiert `raw/<datei>.pdf`.",
 "2. `python3 pipeline/render.py <code>` → `scratch/<code>/pages/pNNN.png` @150 dpi (2 Folien/Seite möglich).",
 "3. Opus-Subagenten (Seitenblöcke) lesen `pipeline/genprompt.md`, sehen PNGs, schreiben `gen/parts/<code>_bN.json`.",
 "4. `bash pipeline/finalize.sh <code>` → validieren, mergen, `gen/<code>.json`, commit+push, `scratch/<code>` löschen, STATUS.md aktualisieren.\n",
 "## Resume (übersteht Limit/Container-Stopp)\n",
 "- Alles Fertige liegt auf origin; ein Stopp kostet höchstens den einen laufenden Block.",
 "- Skripte mit `gen/<code>.json` überspringen; für `laufend`-Skript fehlende Blöcke neu erzeugen → `finalize.sh`.\n"]
if inprog: L.append(f"**Laufend:** {', '.join('`'+c+'`' for c in inprog)}")
if pending: L.append(f"**Offen:** {', '.join('`'+c+'`' for c in pending)}\n")
open("STATUS.md","w").write("\n".join(L)+"\n")
print(f"STATUS aktualisiert: {done}/{len(man)} fertig, {total} Fragen")
