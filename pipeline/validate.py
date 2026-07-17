import json,sys
from collections import Counter
files=sys.argv[1:]
grand=0; errs=[]; allids=set()
for f in files:
    try: Q=json.load(open(f))
    except Exception as e: errs.append(f"{f}: JSON kaputt {e}"); continue
    if not isinstance(Q,list) or not Q: errs.append(f"{f}: kein/leeres Array"); Q=[]
    ids=set()
    for q in Q:
        i=q.get("id","?")
        def E(m):
            errs.append(f"{f} {m}")
        if not q.get("id"): E("ohne id")
        if q.get("id") in ids or q.get("id") in allids: E(f"doppelte id {i}")
        ids.add(q.get("id"))
        if q.get("type") not in ("single","multi","numeric"): E(f"{i}: type={q.get('type')}")
        if q.get("difficulty") not in (1,2,3): E(f"{i}: difficulty")
        if not q.get("topic"): E(f"{i}: topic fehlt")
        if "📄 Quelle:" not in q.get("explanation",""): E(f"{i}: Quelle-Marker fehlt")
        if not q.get("source"): E(f"{i}: source fehlt")
        if q.get("type")=="numeric":
            if not isinstance(q.get("answer"),(int,float)): E(f"{i}: numeric answer")
            if "options" in q or "correct" in q: E(f"{i}: numeric mit options/correct")
        else:
            o=q.get("options"); c=q.get("correct")
            if not isinstance(o,list) or len(o)<2: E(f"{i}: <2 options")
            if not isinstance(c,list) or not c: E(f"{i}: correct leer")
            else:
                for x in c:
                    if not isinstance(x,int) or x<0 or (isinstance(o,list) and x>=len(o)): E(f"{i}: correct-Index {x}")
                if q.get("type")=="single" and len(c)!=1: E(f"{i}: single!=1")
    allids|=ids
    print(f"{f.split('/')[-1]}: {len(Q)} Fragen | Typen {dict(Counter(x.get('type') for x in Q))}")
    grand+=len(Q)
print(f"---- GESAMT: {grand} Fragen, {len(allids)} eindeutige IDs, {len(errs)} Fehler")
for e in errs[:20]: print("  ", e)
sys.exit(1 if errs else 0)
