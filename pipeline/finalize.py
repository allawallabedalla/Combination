import json,sys,glob,re,os
REPO=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
code=sys.argv[1]
parts=sorted(glob.glob(f"{REPO}/gen/parts/{code}_b*.json"))
if not parts: print("keine parts fuer",code); sys.exit(2)
Q=[]; ids=set(); dup=0
for f in parts:
    for q in json.load(open(f)):
        d=q.get("difficulty")
        q["difficulty"]=1 if (not isinstance(d,int) or d<1) else (3 if d>3 else d)
        if q.get("type")=="numeric":
            q.pop("options",None); q.pop("correct",None)
            if not isinstance(q.get("tolerance"),(int,float)): q["tolerance"]=0
        if not q.get("source"):
            m=re.search(r"📄 Quelle:\s*(.+)$", q.get("explanation",""))
            if m: q["source"]=m.group(1).strip()
        if q.get("id") in ids: dup+=1
        ids.add(q.get("id")); Q.append(q)
out=f"{REPO}/gen/{code}.json"
json.dump(Q,open(out,"w"),ensure_ascii=False,indent=1)
print(f"{code}: {len(Q)} Fragen aus {len(parts)} Bloecken -> gen/{code}.json (dup-ids: {dup})")
