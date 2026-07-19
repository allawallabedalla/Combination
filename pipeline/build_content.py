#!/usr/bin/env python3
# Phase 3 – Konsolidierung: rohe topic-Keys aus gen/*.json -> kuratierte Kategorien.
# Schreibt material/topic_mapping.json, material/topics_curated.json, material/content.json
# und validiert inline (Schema wie pipeline/validate.py + jeder q.topic existiert).
# Danach data/questions.js aus material/content.json erzeugen (siehe RESUME.md 3.4).
# Idempotent & quellenrein: liest nur gen/*.json, kein Netz.
import json, glob, collections, sys, os

os.chdir("/home/user/Combination")

# ---- rohe Topics einsammeln (mit Quell-Code je Topic) ----
cnt = collections.Counter()
topic_codes = collections.defaultdict(set)   # topic -> {quellcode,...}
ALLQ = []                                     # alle Fragen (für Merge)
for f in sorted(glob.glob("gen/*.json")):
    code = os.path.basename(f)[:-5]           # z. B. ari23_vl10
    for q in json.load(open(f)):
        cnt[q["topic"]] += 1
        topic_codes[q["topic"]].add(code)
        ALLQ.append(q)
raw = sorted(cnt)

# ---- kuratierte Kategorien (key -> meta) ----
# Gruppen/Farben: Arithmetik=blau, Logik=violett, Geometrie=grün, Fachdidaktik=orange, Prüfung=grau
CURATED = {
  # --- Arithmetik & Zahlentheorie ---
  "natuerliche_zahlen_peano": {"name":"Natürliche Zahlen & Peano-Axiome","icon":"🔢","color":"#2f6fed","gruppe":"Arithmetik"},
  "vollstaendige_induktion":  {"name":"Vollständige Induktion","icon":"🪜","color":"#2f6fed","gruppe":"Arithmetik"},
  "folgen_fibonacci":         {"name":"Folgen & Fibonacci","icon":"🐚","color":"#2f6fed","gruppe":"Arithmetik"},
  "summenformeln_gauss":      {"name":"Gauß- & Summenformeln","icon":"➕","color":"#2f6fed","gruppe":"Arithmetik"},
  "figurierte_zahlen":        {"name":"Figurierte & Dreieckszahlen","icon":"🔺","color":"#2f6fed","gruppe":"Arithmetik"},
  "pascal_binomial":          {"name":"Pascal-Dreieck & Binomialkoeffizienten","icon":"🔻","color":"#2f6fed","gruppe":"Arithmetik"},
  "teilbarkeit_primzahlen":   {"name":"Teilbarkeit & Primzahlen","icon":"🧱","color":"#2f6fed","gruppe":"Arithmetik"},
  "stellenwertsysteme":       {"name":"Stellenwertsysteme & Basen","icon":"🧮","color":"#2f6fed","gruppe":"Arithmetik"},
  "teilbarkeitsregeln":       {"name":"Teilbarkeitsregeln & Quersummen","icon":"📏","color":"#2f6fed","gruppe":"Arithmetik"},
  "restklassen_kongruenzen":  {"name":"Restklassen & Kongruenzen","icon":"🕛","color":"#2f6fed","gruppe":"Arithmetik"},
  "euklid_ggt":               {"name":"Euklidischer Algorithmus & ggT","icon":"🔗","color":"#2f6fed","gruppe":"Arithmetik"},
  "iri_mirim_zahlen":         {"name":"IRI-/MIRIM-Zahlen & Verknüpfungstafeln","icon":"♾️","color":"#2f6fed","gruppe":"Arithmetik"},
  # --- Aussagenlogik & Beweise ---
  "aussagenlogik":            {"name":"Aussagenlogik & Wahrheitstafeln","icon":"🔣","color":"#7c4dff","gruppe":"Logik & Beweise"},
  "de_morgan_verneinung":     {"name":"De Morgan & Verneinung","icon":"🚫","color":"#7c4dff","gruppe":"Logik & Beweise"},
  "beweismethoden":           {"name":"Beweismethoden & Widerspruchsbeweis","icon":"🧩","color":"#7c4dff","gruppe":"Logik & Beweise"},
  # --- Geometrie ---
  "kongruenzabbildungen":     {"name":"Kongruenzabbildungen & Verkettung","icon":"🔄","color":"#1ba672","gruppe":"Geometrie"},
  "pythagoras":               {"name":"Satzgruppe des Pythagoras","icon":"📐","color":"#1ba672","gruppe":"Geometrie"},
  "flaecheninhalte":          {"name":"Flächeninhalte & Zerlegungsgleichheit","icon":"⬛","color":"#1ba672","gruppe":"Geometrie"},
  "parkettierung_winkel":     {"name":"Parkettierung & Innenwinkelsumme","icon":"🪟","color":"#1ba672","gruppe":"Geometrie"},
  "konstruktionen":           {"name":"Konstruktionen & Mittelpunkte","icon":"✏️","color":"#1ba672","gruppe":"Geometrie"},
  # --- Fachdidaktik ---
  "didaktik_grundlagen":      {"name":"Didaktische Grundlagen & Lerntheorien","icon":"📚","color":"#f5871f","gruppe":"Fachdidaktik"},
  "bildungsstandards":        {"name":"Bildungsstandards & Kompetenzen","icon":"🎯","color":"#f5871f","gruppe":"Fachdidaktik"},
  "begriffsbildung_vanhiele": {"name":"Begriffsbildung (van Hiele)","icon":"🏗️","color":"#f5871f","gruppe":"Fachdidaktik"},
  "didaktik_geometrie":       {"name":"Didaktik der Geometrie & ebene Figuren","icon":"🔷","color":"#f5871f","gruppe":"Fachdidaktik"},
  "raeumliche_objekte":       {"name":"Räumliche Objekte & Kopfgeometrie","icon":"🧊","color":"#f5871f","gruppe":"Fachdidaktik"},
  "zahlenraum_100":           {"name":"Zahlenraum bis 100","icon":"💯","color":"#f5871f","gruppe":"Fachdidaktik"},
  "erkundungsmethodik":       {"name":"Erkundungs-Methodik (ICH-DU-WIR)","icon":"🧭","color":"#f5871f","gruppe":"Fachdidaktik"},
  # --- Prüfung ---
  "pruefung":                 {"name":"Klausuren & Übungen","icon":"📝","color":"#6b7280","gruppe":"Prüfung"},
}

# ---- geordnete Regeln: (substring-im-topic) -> curated key. Erste Übereinstimmung gewinnt. ----
# Regeln arbeiten auf dem VOLLEN Key (inkl. Skript-Präfix), damit Kontext nutzbar ist.
RULES = [
  # Prüfung zuerst (ganze Skripte)
  (["klausur_", "uebung_2023", "uebung_gesamt", "_portfolio"], "pruefung"),

  # Erkundungs-Methodik (ICH-DU-WIR) — Phasen/DEG/Methodik
  (["ich_phase","du_phase","_deg","erkundung_method","erkundungskonzept","erkundung_ii","_erkundung",
    "erkundung2_pascal"], "erkundungsmethodik"),

  # --- Logik & Beweise ---
  (["de_morgan","verneinung"], "de_morgan_verneinung"),
  (["widerspruchsbeweis","fundamentalsatz","eindeutigkeit_pfz","euklid_primzahlen","primfaktorzerlegung",
    "_beweisen","beispiel_vs_beweis","vermutungen_beweise","_vermutungen"], "beweismethoden"),
  (["aussagenlogik","aussagen","wahrheitstaf","junktoren","konjunktion","disjunktion","implikation",
    "aequivalenz","_mengen","aussagenverknuepfung","verknuepfte_aussagen","versprachlichung","_saetze",
    "_logik","_verknuepfungen"], "aussagenlogik"),

  # --- Geometrie ---
  (["pythagoras","kathetensatz","hoehensatz","satz_thales","thales","satzgruppe"], "pythagoras"),
  (["parkettierung","innenwinkel","regulaere_polygone","gleiche_parkettierung"], "parkettierung_winkel"),
  (["kongruenzabbildung","kongruente_dreiecke","kongruenzsaet","achsenspiegelung","geradenspiegelung",
    "geradenspiegelungen","drehung","verschiebung","schubspiegelung","verkettung","abbildung","bewegungen",
    "phaenomensaet","invarianz","dreifach_ersetzen","fall_","spielregeln","grundbegriffe","abbildungen",
    "verknuepfung_konvention","verknuepfung","verschiebung_spiegelung","abbildungsgeometrie"], "kongruenzabbildungen"),
  (["mittelsenkrechte","_mitten","schwerpunkt","umkreis","fermatpunkt","geometrische_orte","_konstruieren",
    "grundkonstruktionen","rueckblick_konstruktion","_konstruktion","euklid_konstruktion"], "konstruktionen"),
  (["flaechenmess","flaechenmass","zerlegungsgleich","ergaenzungsgleich","ergaenzungsgleichheit",
    "flaeche_","flaechen_","flaecheninhalt","flaechenverwandlung","aehnliche_figuren","_trapez","drache",
    "drachenviereck","vierecke","einheitsquadrat","mass_eigenschaften","_messen","verfeinertes_mass",
    "grenzwertprozess","flaechen_griechen","flaechen_verdoppeln","strategien_flaeche","_umfang","_kunstwerk",
    "pythagoreische_tripel","verhaeltnis_345"], "flaecheninhalte"),

  # --- Fachdidaktik (did_*) ---
  (["did_vl01_ueberblick"], "didaktik_grundlagen"),
  (["did_vl02_einf","bildungsstd","did_vl03_bildungsstd"], "bildungsstandards"),
  (["did_vl05_begriffe","van_hiele","begriffsart","klassifizierung_vierecke","haus_vierecke",
    "begriff_definition","abstrahieren"], "begriffsbildung_vanhiele"),
  (["did_vl03_geohintergr","did_vl04_ebenefiguren","did_vl04_inhalte"], "didaktik_geometrie"),
  (["did_vl07_raum1","did_vl08_raum2","kopfgeom","wuerfel","koerper"], "raeumliche_objekte"),
  (["did_vl08_zr100","zahlenraum"], "zahlenraum_100"),

  # --- Arithmetik / Zahlentheorie ---
  (["euklid","_ggt","euklidischer_algorithmus","amirima","gemeinsamer_teiler","teilen_mit_rest",
    "teilen_durch_2"], "euklid_ggt"),
  (["iri_zahlen","mirim_zahlen","anna_zahlen","nana_zahlen","aal_zahlen","_erzeuger","restklassenring",
    "verknuepfungstaf","verknuepfungstafel"], "iri_mirim_zahlen"),
  (["restklassen","kongruenz","modulo","_reste","rechnen_reste","negative_reste","mischregeln",
    "division_mit_rest","division_4er","resteschlange"], "restklassen_kongruenzen"),
  (["quersumme","endstellenregel","endstellenregeln","teilbarkeit_2","teilbarkeit_4","teilbarkeit_5",
    "teilbarkeit_7","teilbarkeit_11","teilbarkeit_13","teilbarkeit_17","teilbarkeit_2er","teilbarkeit_5er",
    "gerade_ungerade","gerade_zahlen","zielzahl22"], "teilbarkeitsregeln"),
  (["stellenwert","b_adisch","buendeln","dreiersystem","dualsystem","zweiersystem","vierersystem",
    "fuenfersystem","zehnersystem","teiler_zahlsystem"], "stellenwertsysteme"),
  (["teilbarkeit","primzahl","teilermenge","teilerm","summenregel","transitiv","_teiler","teilbarkeit_transitiv"],
     "teilbarkeit_primzahlen"),
  (["pascal","binomialkoeffizient","binomial"], "pascal_binomial"),
  (["dreieckszahl","figurierte_zahlen","quadratzahl","quadratling","quadratlinge","vierlinge","zahlenmagie",
    "quadratsumme","summe_dreieckszahlen","summe_quadrate","spaltenformeln","dreiecksanordnungen",
    "zweierpotenzen","weizenkornlegende"], "figurierte_zahlen"),
  (["gauss","summenformel","summenfolge","geometrische_summe","ungerade_summen","ungerade_summe","gauss_summe",
    "gauss_summen","summenfolgen","folgen_summen","formel_anwendung","summen","_summen"], "summenformeln_gauss"),
  (["fibonacci","goldener_schnitt","kettenbrueche","zahlenfolgen","folge_definition","zahlenfolgen",
    "folge_summenformel","_folgen"], "folgen_fibonacci"),
  (["induktion","vollstaendige_induktion","vollst_induktion"], "vollstaendige_induktion"),
  (["peano","natuerliche_zahlen","zahlbegriff","rechengesetze","rechenoperation","_addition","multiplikation",
    "potenz_def","potenz_definition","potenzen","rekursion","umkehraufgaben","plusaufgaben","abblitzation",
    "abblitzation","definieren","definition_struktur","_definitionen","formalisieren","satz_formulieren",
    "satzstruktur","umformung","verallgemeiner","verdopplung","verdoppelung","verdopplung","_axiome",
    "phaenomene","natuerliche"], "natuerliche_zahlen_peano"),

  # Rest-Fachdidaktik-Streuung aus ari-Skripten
  (["fachdidaktik","didaktik","_ziele"], "didaktik_grundlagen"),
]

# Exakte Overrides (haben Vorrang vor RULES) — für Keys, die generische Regeln falsch träfen.
OVERRIDES = {
  "ari20_vl12_satz": "kongruenzabbildungen",     # Verkettungssatz der Abbildungsgeometrie
  "ari21_vl06_beweis": "beweismethoden",
  "ari23_vl01_beweis": "beweismethoden",
  "ari23_vl04_beweis": "beweismethoden",
  "ari23_vl05_beweise": "beweismethoden",
  "ari23_vl01_darstellungen": "figurierte_zahlen",  # Zahl-/Punktmuster darstellen
  "erk01_flaechen": "flaecheninhalte",
  "erk04_flaeche": "flaecheninhalte",
  "erk05_groessen": "flaecheninhalte",           # Größen/Flächen auslegen
  "erk_hand_formel": "summenformeln_gauss",
  "erk_hand_muster": "summenformeln_gauss",
}

def classify(topic):
    if topic in OVERRIDES:
        return OVERRIDES[topic]
    t = topic.lower()
    for subs, key in RULES:
        for s in subs:
            if s in t:
                return key
    return None

mapping = {}
unmapped = []
for t in raw:
    k = classify(t)
    if k is None:
        unmapped.append(t)
    else:
        mapping[t] = k

# Verteilung
dist = collections.Counter()
for t,k in mapping.items():
    dist[k] += cnt[t]

print("Rohe Topics:", len(raw), "| gemappt:", len(mapping), "| unmapped:", len(unmapped))
if unmapped:
    print("\n=== UNMAPPED ===")
    for t in unmapped:
        print("  ", t, cnt[t])
print("\n=== Verteilung (Fragen je Kategorie) ===")
qtotal=0
for k,meta in CURATED.items():
    n=dist.get(k,0); qtotal+=n
    print(f"{n:4d}  {k:26s} {meta['gruppe']}")
print("Summe gemappte Fragen:", qtotal)

# unbenutzte kuratierte Keys
unused=[k for k in CURATED if dist.get(k,0)==0]
if unused: print("\nUNBENUTZTE KATEGORIEN:", unused)

# ---- Abbruch bei Problemen ----
assert not unmapped, "Es gibt ungemappte Topics!"
assert not unused,   "Es gibt unbenutzte Kategorien!"
assert qtotal == len(ALLQ), f"gemappte {qtotal} != geladene {len(ALLQ)} Fragen"

# ---- quelle je Kategorie aus den Quell-Codes ableiten (kompakt) ----
def kompakt_quellen(codes):
    codes = sorted(codes)
    if len(codes) <= 6:
        return ", ".join(codes)
    return ", ".join(codes[:6]) + f" u. a. ({len(codes)} Skripte)"

cat_codes = collections.defaultdict(set)
for t, k in mapping.items():
    cat_codes[k] |= topic_codes[t]

# ---- Icons (benannte SVGs aus js/app.js ICONS) je Kategorie ----
TOPIC_ICON = {
  "natuerliche_zahlen_peano":"hexagon","vollstaendige_induktion":"mountain","folgen_fibonacci":"chart",
  "summenformeln_gauss":"plus","figurierte_zahlen":"gem","pascal_binomial":"grid",
  "teilbarkeit_primzahlen":"columns","stellenwertsysteme":"ruler","teilbarkeitsregeln":"sliders",
  "restklassen_kongruenzen":"repeat","euklid_ggt":"link","iri_mirim_zahlen":"sync",
  "aussagenlogik":"shuffle","de_morgan_verneinung":"xcircle","beweismethoden":"shield",
  "kongruenzabbildungen":"share","pythagoras":"scope","flaecheninhalte":"copy",
  "parkettierung_winkel":"bolt","konstruktionen":"target","didaktik_grundlagen":"book",
  "bildungsstandards":"clipboardCheck","begriffsbildung_vanhiele":"brain","didaktik_geometrie":"star",
  "raeumliche_objekte":"rocket","zahlenraum_100":"medal","erkundungsmethodik":"flag","pruefung":"trophy",
}

# ---- topics_curated.json bauen ----
topics_curated = {}
for k, meta in CURATED.items():
    topics_curated[k] = {
        "name": meta["name"], "icon": meta["icon"], "color": meta["color"],
        "gruppe": meta["gruppe"], "svg": TOPIC_ICON[k],
        "quelle": kompakt_quellen(cat_codes[k]),
    }

# ---- content.json bauen: q.topic umschreiben ----
questions_out = []
for q in ALLQ:
    q2 = dict(q)
    q2["topic"] = mapping[q["topic"]]
    questions_out.append(q2)

# Inline-Validierung: jeder q.topic existiert in topics_curated, IDs eindeutig, Schema
errs = []
ids = set()
for q in questions_out:
    i = q.get("id","?")
    if not q.get("id"): errs.append(f"{i}: ohne id")
    if q.get("id") in ids: errs.append(f"{i}: doppelte id")
    ids.add(q.get("id"))
    if q["topic"] not in topics_curated: errs.append(f"{i}: topic {q['topic']} nicht in Kategorien")
    if q.get("type") not in ("single","multi","numeric"): errs.append(f"{i}: type")
    if q.get("difficulty") not in (1,2,3): errs.append(f"{i}: difficulty")
    if "📄 Quelle:" not in q.get("explanation",""): errs.append(f"{i}: Quelle-Marker")
    if not q.get("source"): errs.append(f"{i}: source")
    if q.get("type")=="numeric":
        if not isinstance(q.get("answer"),(int,float)): errs.append(f"{i}: numeric answer")
        if "options" in q or "correct" in q: errs.append(f"{i}: numeric mit options/correct")
    else:
        o=q.get("options"); c=q.get("correct")
        if not isinstance(o,list) or len(o)<2: errs.append(f"{i}: <2 options")
        if not isinstance(c,list) or not c: errs.append(f"{i}: correct leer")
        else:
            for x in c:
                if not isinstance(x,int) or x<0 or x>=len(o): errs.append(f"{i}: correct-Index {x}")
            if q.get("type")=="single" and len(c)!=1: errs.append(f"{i}: single!=1")

print("\n=== Inline-Validierung content.json ===")
print(f"Fragen: {len(questions_out)} | eindeutige IDs: {len(ids)} | Fehler: {len(errs)}")
for e in errs[:20]: print("  ", e)
assert not errs, "content.json Validierung fehlgeschlagen"

# ---- Dateien schreiben (atomar) ----
def dump(path, obj):
    tmp = path + ".tmp"
    json.dump(obj, open(tmp,"w",encoding="utf-8"), ensure_ascii=False, indent=2)
    os.replace(tmp, path)

os.makedirs("material", exist_ok=True)
dump("material/topic_mapping.json", mapping)
dump("material/topics_curated.json", topics_curated)
dump("material/content.json", {"TOPICS": topics_curated, "QUESTIONS": questions_out})
print("\nGeschrieben: material/topic_mapping.json, topics_curated.json, content.json")
print(f"Kategorien: {len(topics_curated)} | Fragen: {len(questions_out)}")

# ---- 3.4: data/questions.js aus content.json erzeugen (autogeneriert) ----
tj = json.dumps(topics_curated, ensure_ascii=False, indent=2)
qj = json.dumps(questions_out, ensure_ascii=False, indent=2)
header = ('/*\n'
 ' * Fragen-Datenbank – Mathematik für Lehramt (Lern-App)\n'
 ' * ---------------------------------------------------------------\n'
 ' * AUTOGENERIERT aus material/content.json (Phase 3, pipeline/build_content.py).\n'
 ' * Nicht von Hand editieren – stattdessen die Pipeline erneut laufen lassen:\n'
 ' *   python3 pipeline/build_content.py\n'
 ' *\n'
 ' * Öffentliche App, ohne Geheimhaltung: die Fragen dürfen direkt hier liegen.\n'
 f' * Umfang: {len(topics_curated)} Kategorien, {len(questions_out)} quellenbelegte Fragen.\n'
 ' *\n'
 ' * Struktur eines Eintrags:\n'
 ' *   id, topic, difficulty(1-3), type("single"|"multi"|"numeric"),\n'
 ' *   question, options[]+correct[] (single/multi) ODER answer/tolerance/unit (numeric),\n'
 ' *   explanation, source\n'
 ' */\n')
wiring = ('\n'
 '// Öffentliche App: der HIER eingebettete Katalog ist allein maßgeblich.\n'
 '// KEIN localStorage-Override mehr — ein alter zwischengespeicherter Fremd-Katalog\n'
 '// (z. B. aus einer früheren App auf derselben Origin, etwa dem ADT-Trainer) darf die\n'
 '// Inhalte NICHT überschreiben. Ein evtl. vorhandener Alt-Cache wird aktiv entfernt.\n'
 'if (typeof window !== "undefined") {\n'
 '  window.ADT_SAMPLE = { TOPICS: SAMPLE_TOPICS, QUESTIONS: SAMPLE_QUESTIONS };\n'
 '  try { window.localStorage && window.localStorage.removeItem("adt_content_v1"); } catch (e) {}\n'
 '  window.TOPICS = SAMPLE_TOPICS;\n'
 '  window.QUESTIONS = SAMPLE_QUESTIONS;\n'
 '}\n')
js_out = header + "\nconst SAMPLE_TOPICS = " + tj + ";\n\nconst SAMPLE_QUESTIONS = " + qj + ";\n" + wiring
tmp = "data/questions.js.tmp"
open(tmp, "w", encoding="utf-8").write(js_out)
os.replace(tmp, "data/questions.js")
print(f"Geschrieben: data/questions.js ({len(js_out)} Bytes)")

# ---- data/oral.js aus material/oral.json (+ Schwerpunkte) erzeugen (mündliche Prüfung) ----
if os.path.exists("material/oral.json") and os.path.exists("material/exam/oral_schwerpunkte.json"):
    oral = json.load(open("material/oral.json", encoding="utf-8"))
    schwerp = json.load(open("material/exam/oral_schwerpunkte.json", encoding="utf-8"))
    oj = json.dumps(oral, ensure_ascii=False, indent=2)
    sj = json.dumps(schwerp, ensure_ascii=False, indent=2)
    oral_js = ('/*\n'
      ' * Mündliche Prüfung – offener Prüfungsfragen-Katalog (AUTOGENERIERT, pipeline/build_content.py).\n'
      ' * Grundlage: Kassel L1 Mathematik, PO 2014, Modul MAL1-1. Offline, keine KI zur Laufzeit.\n'
      f' * {len(schwerp)} Schwerpunkte, {len(oral)} offene Fragen (Stufen: Definition/Verfahren/Beweis/Vertiefung/Didaktik).\n'
      ' */\n'
      'window.ORAL = { SCHWERPUNKTE: ' + sj + ', QUESTIONS: ' + oj + ' };\n')
    open("data/oral.js.tmp", "w", encoding="utf-8").write(oral_js)
    os.replace("data/oral.js.tmp", "data/oral.js")
    print(f"Geschrieben: data/oral.js ({len(oral)} Fragen)")
