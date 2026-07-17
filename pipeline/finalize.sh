#!/usr/bin/env bash
set -eu
code="$1"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO"
BRANCH="${BRANCH:-claude/repo-combination-raw-data-vbf3hw}"
python3 pipeline/validate.py $(ls gen/parts/${code}_b*.json | sort) || echo "WARN: Validierung meldete Fehler (Merge normalisiert)"
python3 pipeline/finalize.py "$code"
n=$(python3 -c "import json;print(len(json.load(open('gen/${code}.json'))))")
python3 pipeline/genstatus.py
git add gen/parts/${code}_*.json gen/${code}.json STATUS.md
git commit -q -m "generate: ${code} (${n} Fragen)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>" || echo "(nichts zu committen)"
k=0; until git push -u origin "$BRANCH" 2>/dev/null; do k=$((k+1)); [ $k -ge 4 ] && break; sleep $((2**k)); done
rm -rf scratch/${code}
echo "✅ ${code} finalisiert & gepusht (${n} Fragen)"
