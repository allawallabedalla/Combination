#!/usr/bin/env python3
"""Merge Phase-2-Audit-Blöcke verify/parts/<code>_a*.json -> verify/<code>.json.
Usage: python3 pipeline/auditmerge.py <code>
Gibt geprüfte Anzahl, Funde (wrong) und Gaps aus. Fehler werden NICHT automatisch
korrigiert – belegte Funde separat am Bild prüfen und in gen/<code>.json fixen."""
import json, glob, sys, os
REPO=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
code = sys.argv[1]
parts = sorted(glob.glob(f"{REPO}/verify/parts/{code}_a*.json"))
if not parts:
    print(f"[{code}] KEINE Teile gefunden!"); sys.exit(1)
wrong=[]; gaps=[]; notes=[]; checked=0
for p in parts:
    d=json.load(open(p))
    wrong+=d.get("wrong",[]); gaps+=d.get("coverageGaps",[]); notes+=d.get("notes",[])
    checked+=d.get("checked",0)
out={"code":code,"blocks":len(parts),"checked":checked,
     "wrong":wrong,"coverageGaps":gaps,"notes":notes}
json.dump(out,open(f"{REPO}/verify/{code}.json","w"),ensure_ascii=False,indent=1)
total=len(json.load(open(f"{REPO}/gen/{code}.json")))
sev=lambda s:sum(1 for w in wrong if w.get("severity")==s)
print(f"[{code}] Blöcke {len(parts)} | geprüft {checked}/{total} | "
      f"Funde: {sev('high')} high / {sev('medium')} medium / {sev('low')} low | "
      f"gaps {len(gaps)} | notes {len(notes)}")
for w in wrong:
    print(f"   ! {w.get('severity','?').upper():6s} {w.get('id')}: {w.get('problem')}")
    print(f"     fix: {w.get('fix')}  [field={w.get('field')}]")
