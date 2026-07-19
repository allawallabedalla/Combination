#!/usr/bin/env bash
# audit_step.sh <fertiger_code>
# Committet das auditierte Skript (gen+verify), räumt dessen scratch weg,
# bestimmt das nächste noch nicht auditierte Skript, rendert es und meldet es.
set -eu
done_code="$1"
REPO="$(cd "$(dirname "$0")/.." && pwd)"; cd "$REPO"
BR="claude/repo-combination-raw-data-vbf3hw"

# validieren (darf nicht kaputt sein) + committen
python3 pipeline/validate.py "gen/${done_code}.json" >/dev/null 2>&1 || echo "WARN: ${done_code} Validierung meldete etwas"
n=$(python3 -c "import json;print(len(json.load(open('gen/${done_code}.json'))))")
git add "gen/${done_code}.json" "verify/${done_code}.json" 2>/dev/null || true
git commit -q -m "audit: ${done_code} (${n} Fragen)" || echo "(nichts zu committen)"
k=0; until git push origin "$BR" 2>/dev/null; do k=$((k+1)); [ $k -ge 4 ] && break; sleep $((2**k)); done
rm -rf "scratch/${done_code}"

# nächstes bestimmen
next=$(python3 - <<'PY'
import sys,os,json; sys.path.insert(0,'pipeline'); import manifest as M
for c,_,_ in M.entries():
    g=f"gen/{c}.json"
    if not os.path.exists(g) or len(json.load(open(g)))==0: continue
    if os.path.exists(f"verify/{c}.json"): continue
    print(c); break
PY
)
audited=$(python3 - <<'PY'
import glob,os
print(len([f for f in glob.glob('verify/*.json')]))
PY
)
if [ -z "$next" ]; then
  echo "ALL_DONE audited=${audited}"
  exit 0
fi
python3 pipeline/render.py "$next" >/dev/null 2>&1
q=$(python3 -c "import json;print(len(json.load(open('gen/${next}.json'))))")
echo "NEXT=${next} Q=${q} AUDITED=${audited}"
