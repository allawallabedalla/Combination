/*
 * Mündliche Prüfung – offener Prüfungsfragen-Katalog (AUTOGENERIERT, pipeline/build_content.py).
 * Grundlage: Kassel L1 Mathematik, PO 2014, Modul MAL1-1. Offline, keine KI zur Laufzeit.
 * 13 Schwerpunkte, 65 offene Fragen (Stufen: Definition/Verfahren/Beweis/Vertiefung/Didaktik).
 */
window.ORAL = { SCHWERPUNKTE: [
  {
    "key": "stellenwert",
    "name": "Stellenwertsysteme & Grundrechen-Algorithmen",
    "gruppe": "Arithmetik",
    "kategorien": [
      "stellenwertsysteme"
    ]
  },
  {
    "key": "teilbarkeit",
    "name": "Teilbarkeit, Teilermengen & Teilbarkeitsregeln",
    "gruppe": "Arithmetik",
    "kategorien": [
      "teilbarkeit_primzahlen",
      "teilbarkeitsregeln"
    ]
  },
  {
    "key": "primzahlen",
    "name": "Primzahlen & Fundamentalsatz der Arithmetik",
    "gruppe": "Arithmetik",
    "kategorien": [
      "teilbarkeit_primzahlen",
      "beweismethoden"
    ]
  },
  {
    "key": "kongruenzen",
    "name": "Kongruenzen, Restklassen & ggT/Euklid",
    "gruppe": "Arithmetik",
    "kategorien": [
      "restklassen_kongruenzen",
      "iri_mirim_zahlen",
      "euklid_ggt"
    ]
  },
  {
    "key": "logik_beweis",
    "name": "Aussagenlogik & Beweisformen",
    "gruppe": "Logik & Beweise",
    "kategorien": [
      "aussagenlogik",
      "de_morgan_verneinung",
      "beweismethoden",
      "vollstaendige_induktion"
    ]
  },
  {
    "key": "zahlfolgen",
    "name": "Zahlfolgen, figurierte Zahlen & Summenformeln",
    "gruppe": "Arithmetik",
    "kategorien": [
      "folgen_fibonacci",
      "summenformeln_gauss",
      "figurierte_zahlen",
      "pascal_binomial",
      "natuerliche_zahlen_peano"
    ]
  },
  {
    "key": "abbildungen",
    "name": "Kongruenz-/Ähnlichkeitsabbildungen & Symmetrie",
    "gruppe": "Geometrie",
    "kategorien": [
      "kongruenzabbildungen"
    ]
  },
  {
    "key": "flaechen",
    "name": "Ebene Figuren, Flächeninhalte & Zerlegungsgleichheit",
    "gruppe": "Geometrie",
    "kategorien": [
      "flaecheninhalte"
    ]
  },
  {
    "key": "pythagoras",
    "name": "Satzgruppe des Pythagoras",
    "gruppe": "Geometrie",
    "kategorien": [
      "pythagoras"
    ]
  },
  {
    "key": "konstruktion",
    "name": "Dreieckskonstruktionen & besondere Linien im Dreieck",
    "gruppe": "Geometrie",
    "kategorien": [
      "konstruktionen"
    ]
  },
  {
    "key": "polygone",
    "name": "Reguläre Polygone, Bandornamente & Parkette",
    "gruppe": "Geometrie",
    "kategorien": [
      "parkettierung_winkel"
    ]
  },
  {
    "key": "koerper",
    "name": "Körper & räumliche Objekte",
    "gruppe": "Geometrie",
    "kategorien": [
      "raeumliche_objekte"
    ]
  },
  {
    "key": "didaktik",
    "name": "Fachdidaktik: Begriffsbildung, Bildungsstandards, Zahlenraum",
    "gruppe": "Fachdidaktik",
    "kategorien": [
      "begriffsbildung_vanhiele",
      "bildungsstandards",
      "zahlenraum_100",
      "didaktik_geometrie",
      "didaktik_grundlagen",
      "erkundungsmethodik"
    ]
  }
], QUESTIONS: [
  {
    "id": "oral-stellenwert-1",
    "schwerpunkt": "stellenwert",
    "stufe": "definition",
    "frage": "Was versteht man unter einem b-adischen Stellenwertsystem? Definieren Sie, wie eine natürliche Zahl n zur Basis b dargestellt wird, und geben Sie an, welche Bedingung die Ziffern erfüllen müssen.",
    "musterantwort": "Ein b-adisches Stellenwertsystem (b eine natürliche Zahl, b > 1) stellt jede natürliche Zahl eindeutig durch Bündelung in b-er-Potenzen dar: n = a_m·b^m + a_{m-1}·b^{m-1} + … + a_1·b^1 + a_0·b^0. Der Wert einer Ziffer hängt von ihrer Stelle (ihrem Stellenwert b^k) ab. Für die Ziffern gilt 0 ≤ a_k < b, d. h. es gibt genau b verschiedene Ziffern (0, 1, …, b−1); das Zehnersystem ist der Sonderfall b = 10.",
    "kriterien": [
      "Nennt die Summendarstellung mit Potenzen der Basis b (Polynomform)",
      "Gibt die Ziffernbedingung 0 ≤ a_k < b korrekt an",
      "Unterscheidet Stellenwert (Position/Potenz) vom Ziffernwert und nennt das Zehnersystem als Beispiel"
    ],
    "quelle": "MAL1-1 – Stellenwertsysteme & Grundrechen-Algorithmen",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Stellenwertsysteme & Grundrechen-Algorithmen"
  },
  {
    "id": "oral-stellenwert-2",
    "schwerpunkt": "stellenwert",
    "stufe": "verfahren",
    "frage": "Wandeln Sie die Zahl 34 mithilfe der fortgesetzten Division durch die Basis ins Zweiersystem um und erläutern Sie das Verfahren Schritt für Schritt.",
    "musterantwort": "Man dividiert fortlaufend durch 2 und notiert die Reste: 34 = 17·2 + 0, 17 = 8·2 + 1, 8 = 4·2 + 0, 4 = 2·2 + 0, 2 = 1·2 + 0, 1 = 0·2 + 1. Die Reste werden von unten nach oben gelesen: 34 = (100010)_2. Zur Kontrolle: (100010)_2 = 2^5 + 2^1 = 32 + 2 = 34. Alternativ über die größte Zweierpotenz: 34 = 32 + 2 = 2^5 + 2^1.",
    "kriterien": [
      "Führt die fortgesetzte Division mit Resten korrekt durch",
      "Liest die Reste in richtiger Reihenfolge (von unten/letztem Rest nach oben)",
      "Nennt das korrekte Ergebnis (100010)_2 und macht eine Probe"
    ],
    "quelle": "MAL1-1 – Stellenwertsysteme & Grundrechen-Algorithmen",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Stellenwertsysteme & Grundrechen-Algorithmen"
  },
  {
    "id": "oral-stellenwert-3",
    "schwerpunkt": "stellenwert",
    "stufe": "beweis",
    "frage": "Begründen Sie, warum im b-adischen Stellenwertsystem jede Ziffer die Bedingung 0 ≤ a_k < b erfüllen muss und warum die Darstellung dann eindeutig ist.",
    "musterantwort": "Wäre eine Ziffer a_k ≥ b, so ließe sich b·b^k = b^{k+1} abspalten, d. h. man könnte ein weiteres Bündel der nächsthöheren Stufe bilden — die Darstellung wäre nicht in reduzierter Form. Die Bedingung 0 ≤ a_k < b sichert also, dass an jeder Stelle nur der 'nicht weiter bündelbare' Rest steht. Die Eindeutigkeit folgt aus dem Divisionsalgorithmus: Bei fortgesetzter Division durch b ist in n = q·b + a_0 der Rest a_0 mit 0 ≤ a_0 < b eindeutig bestimmt; iteriert man mit q, ergeben sich alle weiteren Ziffern eindeutig. Also besitzt jede natürliche Zahl genau eine b-adische Darstellung.",
    "kriterien": [
      "Verknüpft die Ziffernschranke mit dem Bündelungsgedanken (a_k ≥ b ⇒ Übertrag zur nächsten Potenz)",
      "Nutzt die Eindeutigkeit von Quotient und Rest der Division mit Rest als tragendes Argument",
      "Schließt auf Existenz und Eindeutigkeit der Darstellung (iterative/induktive Begründung)"
    ],
    "quelle": "MAL1-1 – Stellenwertsysteme & Grundrechen-Algorithmen",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Stellenwertsysteme & Grundrechen-Algorithmen"
  },
  {
    "id": "oral-stellenwert-4",
    "schwerpunkt": "stellenwert",
    "stufe": "vertiefung",
    "frage": "Wie hängen die beiden Umrechnungsverfahren – die Zerlegung nach der größten Basispotenz und die fortgesetzte Division durch die Basis – miteinander zusammen? Erläutern Sie außerdem, wie sich die Anzahl der Stellen einer Zahl mit wachsender Basis verändert.",
    "musterantwort": "Beide Verfahren liefern dieselben Ziffern, greifen die Zahl aber von entgegengesetzten Enden an: Die Zerlegung nach der groessten Potenz bestimmt zuerst die hoechste Ziffer a_m (wie viele b^m passen hinein), die fortgesetzte Division bestimmt zuerst die niedrigste Ziffer a_0 als Rest. Die Divisionsreste von unten gelesen entsprechen genau den Koeffizienten der Potenzdarstellung. Je groesser die Basis b, desto mehr Werte fasst jede Stelle (b Ziffern) und desto weniger Stellen braucht eine feste Zahl; kleine Basen wie 2 liefern kurze Ziffernvorraete, aber lange Darstellungen. Beispiel 34: im Zweiersystem sechsstellig (100010)_2, im Dreiersystem vierstellig (1021)_3, im Zehnersystem nur zweistellig (34) - mit wachsender Basis nimmt die Stellenzahl also ab.",
    "kriterien": [
      "Erkennt, dass beide Verfahren dieselbe Darstellung liefern, aber von 'oben' bzw. 'unten' arbeiten",
      "Verknüpft Divisionsreste mit den Koeffizienten der Potenzdarstellung",
      "Beschreibt den Zusammenhang zwischen Basisgröße, Ziffernvorrat und Stellenzahl korrekt"
    ],
    "quelle": "MAL1-1 – Stellenwertsysteme & Grundrechen-Algorithmen",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Stellenwertsysteme & Grundrechen-Algorithmen"
  },
  {
    "id": "oral-stellenwert-5",
    "schwerpunkt": "stellenwert",
    "stufe": "didaktik",
    "frage": "Wie führen Sie das dezimale Stellenwertprinzip in der Grundschule ein? Gehen Sie auf eine geeignete Veranschaulichung und auf typische Schülerfehler ein.",
    "musterantwort": "Zentral ist das handelnde Bündeln: Kinder zählen Objekte (z. B. Nüsse, Muggelsteine) und fassen jeweils zehn zu einem Zehnerbündel zusammen, zehn Zehner zu einem Hunderter usw. Material wie Zehnersystem-Blöcke (Einerwürfel, Zehnerstangen, Hunderterplatten) und die Stellenwerttafel machen den Unterschied von Stellenwert und Ziffernwert sichtbar (die 3 in 34 bedeutet 3 Zehner = 30). Vorwärts- und Rückwärtszählen über Zehnerübergänge festigt das Bündeln und Entbündeln. Typische Fehler: Ziffern werden nur als Anzahl gelesen ohne Stellenwert, Zahlen 'werden gehört und geschrieben' wie gesprochen (Zahlendreher, z. B. 'einundzwanzig' → 12), und die Null als Platzhalter (z. B. 305) wird missverstanden.",
    "kriterien": [
      "Nennt das Bündeln/Entbündeln in Zehnern als tragendes Prinzip mit konkretem Material (Stellenwerttafel, Mehrsystemblöcke)",
      "Unterscheidet adressatengerecht Stellenwert und Ziffernwert an einem Beispiel",
      "Benennt mindestens einen typischen Schülerfehler (Zahlendreher, Null als Platzhalter, fehlende Stellenwertdeutung)"
    ],
    "quelle": "MAL1-1 – Stellenwertsysteme & Grundrechen-Algorithmen",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Stellenwertsysteme & Grundrechen-Algorithmen"
  },
  {
    "id": "oral-teilbarkeit-1",
    "schwerpunkt": "teilbarkeit",
    "stufe": "definition",
    "frage": "Was versteht man unter der Teilbarkeit natürlicher Zahlen? Definieren Sie „a teilt b\" und erläutern Sie, was in diesem Zusammenhang ein Teiler ist.",
    "musterantwort": "Eine natürliche Zahl a teilt eine natürliche Zahl b (geschrieben a | b) genau dann, wenn es eine natürliche Zahl c gibt mit a · c = b. Gilt a | b, so heißt a ein Teiler von b (und b ein Vielfaches von a). Beispiel: 2 | 6, denn mit c = 3 gilt 2 · 3 = 6. Entscheidend ist die Existenz eines solchen c innerhalb der natürlichen Zahlen; die Teilbarkeit ist also über die Multiplikation und nicht über das Rest-Rechnen definiert.",
    "kriterien": [
      "Nennt die Existenzbedingung: es gibt ein c ∈ ℕ mit a · c = b",
      "Verwendet die korrekte Fachsprache/Notation (a | b, Teiler, Vielfaches)",
      "Belegt die Definition mit einem eigenen Zahlenbeispiel"
    ],
    "quelle": "MAL1-1 – Teilbarkeit, Teilermengen & Teilbarkeitsregeln",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Teilbarkeit, Teilermengen & Teilbarkeitsregeln"
  },
  {
    "id": "oral-teilbarkeit-2",
    "schwerpunkt": "teilbarkeit",
    "stufe": "verfahren",
    "frage": "Bestimmen Sie die vollständige Teilermenge der Zahl 12 und erläutern Sie an diesem Beispiel, wie man mithilfe der Primfaktorzerlegung systematisch alle Teiler findet.",
    "musterantwort": "Die Primfaktorzerlegung ist 12 = 2² · 3. Alle Teiler entstehen, indem man jeden Primfaktor mit einem Exponenten von 0 bis zum Maximum kombiniert: 2^0·3^0=1, 2^1=2, 2^2=4, 3, 2·3=6, 4·3=12. Damit ist die Teilermenge T(12) = {1, 2, 3, 4, 6, 12}. Man kann die Teiler auch paarweise suchen (1·12, 2·6, 3·4) und so sicherstellen, dass keiner fehlt. Systematisch liefert die Primfaktorzerlegung genau alle Teiler.",
    "kriterien": [
      "Gibt die Primfaktorzerlegung 12 = 2² · 3 korrekt an",
      "Nennt die vollständige Teilermenge {1, 2, 3, 4, 6, 12} ohne Auslassung",
      "Beschreibt ein systematisches Vorgehen (Kombination der Primfaktoren bzw. Teilerpaare)"
    ],
    "quelle": "MAL1-1 – Teilbarkeit, Teilermengen & Teilbarkeitsregeln",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Teilbarkeit, Teilermengen & Teilbarkeitsregeln"
  },
  {
    "id": "oral-teilbarkeit-3",
    "schwerpunkt": "teilbarkeit",
    "stufe": "beweis",
    "frage": "Beweisen Sie die Summenregel der Teilbarkeit: Wenn a | b und a | c gilt, dann gilt auch a | (b + c).",
    "musterantwort": "Voraussetzung mit der Definition umgesetzt: Aus a | b folgt es gibt p ∈ ℕ mit a · p = b, aus a | c folgt es gibt q ∈ ℕ mit a · q = c. Dann gilt b + c = a·p + a·q = a·(p + q). Da p + q wieder eine natürliche Zahl ist, existiert also ein Faktor, mit dem a multipliziert (b + c) ergibt. Nach Definition der Teilbarkeit folgt a | (b + c). Die tragende Idee ist das Ausklammern des gemeinsamen Teilers a mittels des Distributivgesetzes.",
    "kriterien": [
      "Setzt beide Voraussetzungen korrekt als a·p = b und a·q = c an",
      "Klammert a aus: b + c = a·(p + q) (Distributivgesetz)",
      "Schließt regelkonform mit der Definition auf a | (b + c) zurück"
    ],
    "quelle": "MAL1-1 – Teilbarkeit, Teilermengen & Teilbarkeitsregeln",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Teilbarkeit, Teilermengen & Teilbarkeitsregeln"
  },
  {
    "id": "oral-teilbarkeit-4",
    "schwerpunkt": "teilbarkeit",
    "stufe": "vertiefung",
    "frage": "Die Teilbarkeitsrelation ist transitiv, und es gibt neben der Summenregel auch eine „andere Summenregel\" (aus a | b und a | (b + c) folgt a | c). Wie hängen diese Aussagen zusammen, und wo liegen die Grenzen – gilt etwa die Umkehrung der Summenregel?",
    "musterantwort": "Transitivität (aus a | b und b | c folgt a | c) und die Summenregeln lassen sich alle direkt aus der Definition über Ausklammern beweisen; die „andere Summenregel\" ergibt sich, indem man c = (b + c) − b = a·q − a·p = a·(q − p) schreibt und so aus zwei Teilbarkeiten auf eine dritte schließt – sie ist also die „Differenz-Variante\" der Summenregel. Grenzen: Die Umkehrung der Summenregel gilt nicht. Aus a | (b + c) folgt nicht a | b und a | c; Gegenbeispiel: 3 | (2 + 4) = 6, aber 3 ∤ 2 und 3 ∤ 4. Auch bei der Differenz muss man im Bereich der natürlichen Zahlen q ≥ p sichern, damit q − p ∈ ℕ bleibt.",
    "kriterien": [
      "Erklärt, dass alle Regeln aus derselben Beweisidee (Definition + Ausklammern) folgen",
      "Leitet die andere Summenregel über die Differenz c = a·(q − p) her",
      "Widerlegt die Umkehrung mit einem Gegenbeispiel und benennt Grenzfälle (z. B. q ≥ p in ℕ)"
    ],
    "quelle": "MAL1-1 – Teilbarkeit, Teilermengen & Teilbarkeitsregeln",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Teilbarkeit, Teilermengen & Teilbarkeitsregeln"
  },
  {
    "id": "oral-teilbarkeit-5",
    "schwerpunkt": "teilbarkeit",
    "stufe": "didaktik",
    "frage": "Wie führen Sie die Idee der Teilbarkeit bzw. der Teilbarkeitsregeln in der Grundschule ein? Nennen Sie eine geeignete Veranschaulichung und einen typischen Schülerfehler.",
    "musterantwort": "In der Grundschule wird Teilbarkeit handlungsorientiert eingeführt: Eine Anzahl von Plättchen soll restlos in gleich große Gruppen bzw. als vollständiges Rechteck (Punktefeld) gelegt werden – geht das ohne Rest auf, ist die Zahl durch die Gruppengröße teilbar. Figurierte Zahlen / Rechteckdarstellungen veranschaulichen auch die Summenregel (Spalten zusammenfügen). Einfache Regeln (durch 2: gerade Endziffer; durch 5: Endziffer 0 oder 5; durch 10) werden am Zahlenmaterial entdeckt. Typischer Schülerfehler: Teilbarkeit und Division mit Rest werden verwechselt, oder es wird gemeint, eine Zahl sei „durch 3 teilbar, weil sie auf 3 endet\" – hier hilft der Rückgriff auf das restlose Aufteilen und Gegenbeispiele.",
    "kriterien": [
      "Nennt eine konkrete, handlungsorientierte Veranschaulichung (Aufteilen/Punktefeld/figurierte Zahlen)",
      "Bezieht die Einführung altersgemäß auf das restlose Aufteilen statt auf die formale Definition",
      "Benennt einen typischen Schülerfehler und einen Umgang damit"
    ],
    "quelle": "MAL1-1 – Teilbarkeit, Teilermengen & Teilbarkeitsregeln",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Teilbarkeit, Teilermengen & Teilbarkeitsregeln"
  },
  {
    "id": "oral-primzahlen-1",
    "schwerpunkt": "primzahlen",
    "stufe": "definition",
    "frage": "Was versteht man unter einer Primzahl? Definieren Sie den Begriff präzise und erklären Sie, warum die Zahl 1 keine Primzahl ist.",
    "musterantwort": "Eine natürliche Zahl p heißt Primzahl genau dann, wenn sie genau zwei unterschiedliche Teiler hat, nämlich 1 und sich selbst. Beispiele sind 2, 3, 5, 7, 11. Die 1 ist keine Primzahl, weil sie nur einen einzigen Teiler (die 1 selbst) besitzt und damit die Bedingung „genau zwei unterschiedliche Teiler“ nicht erfüllt. Diese Festlegung sichert zugleich die Eindeutigkeit der Primfaktorzerlegung.",
    "kriterien": [
      "Nennt die Bedingung „genau zwei unterschiedliche Teiler“ (1 und die Zahl selbst) korrekt",
      "Begründet den Ausschluss der 1 über die Teileranzahl (nur ein Teiler)",
      "Gibt korrekte Beispiele und verwendet saubere Fachsprache"
    ],
    "quelle": "MAL1-1 – Primzahlen & Fundamentalsatz der Arithmetik",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Primzahlen & Fundamentalsatz der Arithmetik"
  },
  {
    "id": "oral-primzahlen-2",
    "schwerpunkt": "primzahlen",
    "stufe": "verfahren",
    "frage": "Führen Sie die Primfaktorzerlegung der Zahl 12 vor, etwa mithilfe eines Faktorbaums, und schreiben Sie das Ergebnis in Potenzschreibweise. Erläutern Sie dabei Ihr Vorgehen.",
    "musterantwort": "Man zerlegt 12 schrittweise in Faktoren: 12 = 2·6, dann 6 = 2·3. Die letzten „Blätter“ des Baums sind Primzahlen, weiter zerlegen kann man nicht. Somit ist 12 = 2·2·3 = 2²·3. Unabhängig davon, ob man mit 2·6, 3·4 oder 4·3 beginnt, erhält man stets dieselben Primfaktoren mit denselben Vielfachheiten.",
    "kriterien": [
      "Zerlegt systematisch bis nur noch Primzahlen als Faktoren auftreten",
      "Ergebnis korrekt: 12 = 2²·3, inklusive Potenzschreibweise",
      "Weist darauf hin, dass verschiedene Startzerlegungen zum gleichen Ergebnis führen"
    ],
    "quelle": "MAL1-1 – Primzahlen & Fundamentalsatz der Arithmetik",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Primzahlen & Fundamentalsatz der Arithmetik"
  },
  {
    "id": "oral-primzahlen-3",
    "schwerpunkt": "primzahlen",
    "stufe": "beweis",
    "frage": "Beweisen Sie den Satz von Euklid, dass es unendlich viele Primzahlen gibt. Erläutern Sie insbesondere die Beweisidee des Widerspruchsbeweises.",
    "musterantwort": "Widerspruchsannahme: Es gebe nur endlich viele Primzahlen p₁, p₂, …, pₙ. Man bildet die Zahl a = p₁·p₂·…·pₙ + 1. Diese Zahl a ist größer als 1 und besitzt daher einen Primteiler p. Dieser p muss unter den p₁,…,pₙ vorkommen (nach Annahme sind das alle). Dann teilt p aber sowohl das Produkt p₁·…·pₙ als auch a, also nach der Summenregel auch die Differenz a − (p₁·…·pₙ) = 1. Kein Primteiler teilt jedoch 1 – Widerspruch. Also war die Annahme falsch und die Menge der Primzahlen ist unendlich.",
    "kriterien": [
      "Formuliert die Annahme endlich vieler Primzahlen und die Konstruktion a = Produkt aller + 1",
      "Trägt den Widerspruch korrekt: ein Primteiler von a müsste auch 1 teilen",
      "Zieht den logischen Schluss der Widerlegung sauber (Beweis durch Widerspruch)",
      "Verwendet korrekte Fachsprache (Primteiler, Teilbarkeit, Summen-/Differenzregel)"
    ],
    "quelle": "MAL1-1 – Primzahlen & Fundamentalsatz der Arithmetik",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Primzahlen & Fundamentalsatz der Arithmetik"
  },
  {
    "id": "oral-primzahlen-4",
    "schwerpunkt": "primzahlen",
    "stufe": "vertiefung",
    "frage": "Was besagt der Fundamentalsatz der Arithmetik, und inwiefern ist die Eindeutigkeit der Primfaktorzerlegung dabei entscheidend? Wie hängt diese Eindeutigkeit damit zusammen, dass man die 1 nicht als Primzahl zulässt?",
    "musterantwort": "Der Fundamentalsatz der Arithmetik besagt: Jede natürliche Zahl n > 1 lässt sich als Produkt von Primzahlen darstellen, und diese Darstellung ist – bis auf die Reihenfolge der Faktoren – eindeutig. Die Existenz sichert, dass jede Zahl überhaupt zerlegbar ist; die Eindeutigkeit garantiert, dass die Primfaktoren mit ihren Vielfachheiten eindeutig bestimmt sind (z. B. 12 = 2²·3 und keine andere Kombination). Würde man die 1 als Primzahl zulassen, könnte man beliebig Faktoren 1 ergänzen (12 = 2²·3 = 1·2²·3 = 1²·2²·3 …) und die Eindeutigkeit ginge verloren. Genau deshalb wird die 1 ausgeschlossen.",
    "kriterien": [
      "Nennt Existenz UND Eindeutigkeit (bis auf Reihenfolge) der Primfaktorzerlegung",
      "Erklärt, weshalb Eindeutigkeit den Ausschluss der 1 erfordert",
      "Verknüpft den Satz mit einem konkreten Beispiel",
      "Argumentiert fachsprachlich korrekt (Vielfachheit, eindeutig bis auf Reihenfolge)"
    ],
    "quelle": "MAL1-1 – Primzahlen & Fundamentalsatz der Arithmetik",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Primzahlen & Fundamentalsatz der Arithmetik"
  },
  {
    "id": "oral-primzahlen-5",
    "schwerpunkt": "primzahlen",
    "stufe": "didaktik",
    "frage": "Wie können Sie Grundschulkindern eine erste tragfähige Vorstellung von Primzahlen und dem Zerlegen von Zahlen vermitteln? Nennen Sie eine geeignete Veranschaulichung und einen typischen Schülerfehler.",
    "musterantwort": "Geeignet ist das enaktiv-ikonische Legen von Rechtecken (Plättchen): Zahlen wie 12 lassen sich als mehrere Rechtecke auslegen (2×6, 3×4), Primzahlen wie 7 dagegen nur als „Strich“ 1×7 – sie lassen sich nicht in ein echtes Rechteck aufteilen. Ergänzend zeigt das Zahlenbäumchen (Faktorbaum) das fortgesetzte Zerlegen, bis nur noch unteilbare Zahlen (die „letzten Blätter“) übrig bleiben. Ein typischer Schülerfehler ist, die 1 für eine Primzahl zu halten oder gerade/ungerade mit prim/nicht-prim zu verwechseln (z. B. 9 fälschlich für prim zu halten, weil ungerade). Solche Fehlvorstellungen greift man über das konkrete Auslegen und Nachzählen der Teiler auf.",
    "kriterien": [
      "Nennt eine adressatengerechte, anschauliche Veranschaulichung (Rechteck-/Plättchenlegen, Faktorbaum)",
      "Stellt den Bezug zum unteilbaren Charakter der Primzahl anschaulich her",
      "Benennt einen konkreten typischen Schülerfehler (z. B. 1 als Primzahl, prim = ungerade)",
      "Verknüpft die Veranschaulichung mit dem fachlichen Begriff (Teileranzahl)"
    ],
    "quelle": "MAL1-1 – Primzahlen & Fundamentalsatz der Arithmetik",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Primzahlen & Fundamentalsatz der Arithmetik"
  },
  {
    "id": "oral-kongruenzen-1",
    "schwerpunkt": "kongruenzen",
    "stufe": "definition",
    "frage": "Was versteht man unter einer Restklasse modulo m, und was bedeutet es, dass zwei Zahlen a und b kongruent modulo m sind? Erläutern Sie dies am Beispiel m = 3.",
    "musterantwort": "Zwei ganze Zahlen a und b heissen kongruent modulo m (geschrieben a ≡ b (mod m)), wenn sie beim Teilen durch m denselben Rest lassen, gleichbedeutend: wenn m die Differenz a − b teilt. Die Restklasse r-quer modulo m ist die Menge aller ganzen Zahlen mit demselben Rest r, also r-quer = {n ∈ Z | n = m·k + r, k ∈ Z}. Fuer m = 3 gibt es genau drei Restklassen: 0-quer = {…,−6,−3,0,3,6,…} (n = 3k), 1-quer = {…,−2,1,4,7,…} (n = 3k+1) und 2-quer = {…,−1,2,5,8,…} (n = 3k+2).",
    "kriterien": [
      "Definition der Kongruenz über gleichen Rest bzw. Teilbarkeit von a − b durch m (Fachsprache)",
      "Restklasse korrekt als Menge aller Zahlen mit festem Rest beschrieben",
      "Beispiel m = 3 mit den drei Restklassen 0̄, 1̄, 2̄ (Form 3k+r)"
    ],
    "quelle": "MAL1-1 – Kongruenzen, Restklassen & ggT/Euklid",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Kongruenzen, Restklassen & ggT/Euklid"
  },
  {
    "id": "oral-kongruenzen-2",
    "schwerpunkt": "kongruenzen",
    "stufe": "verfahren",
    "frage": "Bestimmen Sie den größten gemeinsamen Teiler von 372 und 84 mit dem euklidischen Algorithmus. Erläutern Sie dabei, welcher Satz die einzelnen Schritte trägt.",
    "musterantwort": "Man nutzt fortgesetzte Division mit Rest (Satz von der eindeutigen Division mit Rest, n = q·m + r, 0 ≤ r < m): 372 = 4·84 + 36; 84 = 2·36 + 12; 36 = 3·12 + 0. Der letzte von Null verschiedene Rest ist 12, also ggT(372, 84) = 12. Tragend ist, dass ggT(n, m) = ggT(m, r) gilt, weil jeder gemeinsame Teiler von n und m auch r = n − q·m teilt und umgekehrt; der Algorithmus bricht ab, weil die Reste streng fallen.",
    "kriterien": [
      "Divisionskette korrekt durchgeführt bis Rest 0 (Ergebnis 12)",
      "Letzter nichtverschwindender Rest als ggT identifiziert",
      "Begründung über Division mit Rest und Invarianz ggT(n,m) = ggT(m,r)"
    ],
    "quelle": "MAL1-1 – Kongruenzen, Restklassen & ggT/Euklid",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Kongruenzen, Restklassen & ggT/Euklid"
  },
  {
    "id": "oral-kongruenzen-3",
    "schwerpunkt": "kongruenzen",
    "stufe": "beweis",
    "frage": "Beweisen Sie, dass in den Restklassen modulo 3 gilt: 2̄ + 2̄ = 1̄. Warum ist dieses Ergebnis unabhängig von der Wahl der Repräsentanten?",
    "musterantwort": "Seien a ∈ 2̄ und b ∈ 2̄, also a = 3k₁ + 2 und b = 3k₂ + 2 mit k₁, k₂ ∈ ℕ₀. Dann ist a + b = 3k₁ + 3k₂ + 4 = 3(k₁ + k₂ + 1) + 1, also von der Form 3k + 1 und damit in 1̄. Die Rechnung hängt nicht von den konkreten k₁, k₂ ab, sondern nur von den Resten 2 und 2; deshalb liefert jede Wahl von Repräsentanten dasselbe Ergebnis 1̄ – die Addition der Restklassen ist wohldefiniert.",
    "kriterien": [
      "Allgemeine Repräsentanten a = 3k₁+2, b = 3k₂+2 angesetzt",
      "Umformung zu 3(k₁+k₂+1)+1 und Zuordnung zu 1̄",
      "Wohldefiniertheit / Repräsentantenunabhängigkeit begründet"
    ],
    "quelle": "MAL1-1 – Kongruenzen, Restklassen & ggT/Euklid",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Kongruenzen, Restklassen & ggT/Euklid"
  },
  {
    "id": "oral-kongruenzen-4",
    "schwerpunkt": "kongruenzen",
    "stufe": "vertiefung",
    "frage": "Wie hängt der Satz von der eindeutigen Division mit Rest mit dem Begriff der Restklasse und mit der Idee negativer Reste zusammen? Gehen Sie auch auf den Grenzfall r = 0 ein.",
    "musterantwort": "Der Satz von der eindeutigen Division mit Rest (zu n, m gibt es genau ein Paar q, r mit n = q·m + r, 0 ≤ r < m) garantiert, dass jede Zahl in genau eine der m Restklassen fällt – die Eindeutigkeit des Restes macht die Einteilung in Restklassen überhaupt widerspruchsfrei. Der Grenzfall r = 0 ist gerade die Teilbarkeit (n = q·m), also die Restklasse 0̄. Lässt man die Bedingung 0 ≤ r < m fallen und erlaubt negative Reste, so kann man dieselbe Zahl anders darstellen, z. B. 11 = 3·3 + 2 (positiver Rest) oder 11 = 4·3 − 1 (negativer Rest, „Schulden beim Teilen“); die Eindeutigkeit geht dann verloren, weshalb die Einschränkung 0 ≤ r < m nötig ist.",
    "kriterien": [
      "Eindeutigkeit des Restes als Grundlage der Restklasseneinteilung erklärt",
      "Grenzfall r = 0 als Teilbarkeit / Restklasse 0̄ erkannt",
      "Negative Reste am Beispiel (11 = 4·3 − 1) und Verlust der Eindeutigkeit ohne 0 ≤ r < m"
    ],
    "quelle": "MAL1-1 – Kongruenzen, Restklassen & ggT/Euklid",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Kongruenzen, Restklassen & ggT/Euklid"
  },
  {
    "id": "oral-kongruenzen-5",
    "schwerpunkt": "kongruenzen",
    "stufe": "didaktik",
    "frage": "Wie führen Sie die Division mit Rest in der Grundschule ein, und welche typischen Schülerfehler bzw. Fehlvorstellungen sollten Sie dabei im Blick haben? Nennen Sie eine geeignete Veranschaulichung.",
    "musterantwort": "Man knüpft an das Verteilen/Aufteilen konkreter Materialien an, z. B. 7 Plättchen gleichmäßig auf 2 Kinder verteilen: jedes bekommt 3, eines bleibt übrig – so entsteht „7 : 2 = 3 Rest 1“ bzw. 7 = 3·2 + 1. Handlungen und Bilder (Plättchen legen, Gruppen bilden) machen den Rest als „das, was übrig bleibt“ anschaulich. Typische Fehlvorstellungen: der Rest darf so nicht größer oder gleich dem Divisor sein (sonst könnte man noch eine Gruppe bilden); Rest 0 wird als „kein Rest“ statt als vollständige Teilbarkeit gedeutet; und Kinder verwechseln, was Quotient und was Rest ist. Wichtig ist, den Rest stets kleiner als den Teiler zu halten und die Probe n = q·m + r rückzuübersetzen.",
    "kriterien": [
      "Enaktiv-ikonischer Zugang über Verteilen/Aufteilen mit Material (Beispiel 7 : 2)",
      "Rest anschaulich als „Übriggebliebenes“, Bedingung Rest < Divisor thematisiert",
      "Mindestens eine typische Fehlvorstellung benannt (z. B. Rest ≥ Divisor, Rest 0)"
    ],
    "quelle": "MAL1-1 – Kongruenzen, Restklassen & ggT/Euklid",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Kongruenzen, Restklassen & ggT/Euklid"
  },
  {
    "id": "oral-logik_beweis-1",
    "schwerpunkt": "logik_beweis",
    "stufe": "definition",
    "frage": "Was versteht man in der Aussagenlogik unter einer Aussage? Grenzen Sie den Begriff ab und erläutern Sie den Grundsatz „Tertium non datur“.",
    "musterantwort": "Eine Aussage ist ein sprachliches Gebilde, dem nach Festlegung eindeutig genau einer der beiden Wahrheitswerte wahr (w) oder falsch (f) zugeordnet werden kann. „Tertium non datur“ heißt „ein Drittes ist nicht gegeben“: eine Aussage ist entweder wahr oder falsch, ein weiterer Wert existiert nicht. Fragen, Aufforderungen, Ausrufe oder Definitionen (z. B. „Es regnet nicht.“ ist eine Aussage, „Regnet es?“ nicht) sind keine Aussagen.",
    "kriterien": [
      "Wahrheitswert w/f als definierendes Merkmal genannt",
      "Tertium non datur korrekt übersetzt und erklärt",
      "Abgrenzung durch Nicht-Beispiel (Frage/Aufforderung)"
    ],
    "quelle": "MAL1-1 – Aussagenlogik & Beweisformen",
    "gruppe": "Logik & Beweise",
    "schwerpunkt_name": "Aussagenlogik & Beweisformen"
  },
  {
    "id": "oral-logik_beweis-2",
    "schwerpunkt": "logik_beweis",
    "stufe": "verfahren",
    "frage": "Erstellen Sie die Wahrheitstafel der Verknüpfung A ⇒ B und bilden Sie deren Verneinung. Was ist das Gegenteil von „Wenn die Sonne scheint, dann gehe ich joggen“?",
    "musterantwort": "A ⇒ B ist definiert als ¬A ∨ B und in den vier Zeilen (ww, wf, fw, ff) genau in der Zeile wf (A wahr, B falsch) falsch, sonst wahr. Die Verneinung ¬(A ⇒ B) ist folglich A ∧ ¬B und nur in der Zeile wf wahr. Sprachlich: Das Gegenteil ist „Die Sonne scheint, und ich gehe (trotzdem) nicht joggen.“",
    "kriterien": [
      "vollständige Wahrheitstafel mit allen vier Belegungen",
      "A ⇒ B nur bei A∧¬B falsch erkannt",
      "Verneinung ¬(A⇒B)=A∧¬B korrekt gebildet und versprachlicht"
    ],
    "quelle": "MAL1-1 – Aussagenlogik & Beweisformen",
    "gruppe": "Logik & Beweise",
    "schwerpunkt_name": "Aussagenlogik & Beweisformen"
  },
  {
    "id": "oral-logik_beweis-3",
    "schwerpunkt": "logik_beweis",
    "stufe": "beweis",
    "frage": "Beweisen Sie durch Widerspruch, dass es keine größte natürliche Zahl gibt. Erläutern Sie dabei die Struktur eines Widerspruchsbeweises im Vergleich zum direkten Beweis.",
    "musterantwort": "Widerspruchsbeweis: Man nimmt an, die zu zeigende Aussage sei falsch, und leitet daraus einen Widerspruch her. Annahme: Es gibt eine größte natürliche Zahl n. Dann ist aber n+1 ebenfalls eine natürliche Zahl und n+1 > n, im Widerspruch zur Maximalität von n. Also ist die Annahme falsch und es gibt keine größte natürliche Zahl. Beim direkten Beweis schließt man dagegen ohne Gegenannahme von den Voraussetzungen über gültige Implikationen (A ⇒ B) direkt auf die Behauptung.",
    "kriterien": [
      "Gegenannahme (Negation der Behauptung) explizit formuliert",
      "korrekte Herleitung des Widerspruchs über n+1",
      "Struktur Widerspruchsbeweis vs. direkter Beweis unterschieden"
    ],
    "quelle": "MAL1-1 – Aussagenlogik & Beweisformen",
    "gruppe": "Logik & Beweise",
    "schwerpunkt_name": "Aussagenlogik & Beweisformen"
  },
  {
    "id": "oral-logik_beweis-4",
    "schwerpunkt": "logik_beweis",
    "stufe": "vertiefung",
    "frage": "Erläutern Sie das Prinzip der vollständigen Induktion und wie es mit dem Aufbau der natürlichen Zahlen zusammenhängt. Beweisen Sie exemplarisch, dass 1+2+…+n = n(n+1)/2 gilt.",
    "musterantwort": "Die vollständige Induktion nutzt den induktiven Aufbau von ℕ (jede Zahl durch fortgesetztes +1 erreichbar): Aus Induktionsanfang (Aussage gilt für n=1) und Induktionsschritt (gilt sie für n, so auch für n+1) folgt die Gültigkeit für alle n. Anfang: n=1 liefert 1 = 1·2/2 = 1. Schritt: Gelte 1+…+n = n(n+1)/2 (IV). Dann 1+…+n+(n+1) = n(n+1)/2 + (n+1) = (n+1)(n+2)/2, also die Formel für n+1. Damit gilt sie für alle n∈ℕ.",
    "kriterien": [
      "Induktionsanfang und Induktionsschritt klar getrennt",
      "Induktionsvoraussetzung im Schritt korrekt verwendet",
      "Zusammenhang zum Nachfolgeraufbau von ℕ benannt"
    ],
    "quelle": "MAL1-1 – Aussagenlogik & Beweisformen",
    "gruppe": "Logik & Beweise",
    "schwerpunkt_name": "Aussagenlogik & Beweisformen"
  },
  {
    "id": "oral-logik_beweis-5",
    "schwerpunkt": "logik_beweis",
    "stufe": "didaktik",
    "frage": "Wie können Sie erstes logisches Schließen und das Begründen in der Grundschule anbahnen? Nennen Sie eine geeignete Veranschaulichung und einen typischen Schülerfehler beim Verneinen von Aussagen.",
    "musterantwort": "Logisches Schließen wird in der Grundschule handlungsorientiert angebahnt, z. B. über „alle/einige/kein“-Aussagen bei sortierten Materialien, wahr/falsch-Spiele, Wenn-dann-Sätze im Alltag sowie das Begründen eigener Rechenwege („Warum stimmt das immer?“). Veranschaulichung: Mengen-/Logikblöcke oder Diagramme (Reifen/Venn) für „und“, „oder“, „nicht“. Typischer Schülerfehler: das kontradiktorische und konträre Gegenteil werden verwechselt – Kinder verneinen „alle sind da“ fälschlich mit „keiner ist da“ statt korrekt mit „nicht alle sind da“ (mindestens einer fehlt).",
    "kriterien": [
      "altersgemäße, handlungsorientierte Anbahnung genannt",
      "konkrete Veranschaulichung (Logikblöcke/Mengendiagramm)",
      "Fehler kontradiktorisch/konträr korrekt beschrieben und aufgelöst"
    ],
    "quelle": "MAL1-1 – Aussagenlogik & Beweisformen",
    "gruppe": "Logik & Beweise",
    "schwerpunkt_name": "Aussagenlogik & Beweisformen"
  },
  {
    "id": "oral-zahlfolgen-1",
    "schwerpunkt": "zahlfolgen",
    "stufe": "definition",
    "frage": "Was versteht man in der Mathematik unter einer Zahlfolge? Definieren Sie den Begriff präzise und erläutern Sie am Beispiel der Fibonacci-Folge, was eine rekursive von einer expliziten Bildungsvorschrift unterscheidet.",
    "musterantwort": "Eine (unendliche) Zahlfolge ist eine Funktion, die jeder natürlichen Zahl n (dem Index) genau ein Folgenglied aₙ aus einer Zielmenge X (bei uns den natürlichen bzw. reellen Zahlen) zuordnet; entscheidend ist die Eindeutigkeit (genau ein Wert je Index). Bei einer endlichen Folge ist der Definitionsbereich eine endliche Teilmenge von ℕ. Eine rekursive Vorschrift beschreibt ein Glied durch seine Vorgänger plus Startwerte (Fibonacci: f₁=1, f₂=1, fₙ=fₙ₋₁+fₙ₋₂ für n>2), eine explizite Vorschrift liefert aₙ direkt aus n (z. B. aₙ=n²).",
    "kriterien": [
      "Folge als Funktion ℕ→X mit Eindeutigkeit der Zuordnung benannt (Fachsprache)",
      "Unterscheidung Index/Folgenglied bzw. endlich/unendlich",
      "rekursiv vs. explizit korrekt am Beispiel erklärt"
    ],
    "quelle": "MAL1-1 – Zahlfolgen, figurierte Zahlen & Summenformeln",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Zahlfolgen, figurierte Zahlen & Summenformeln"
  },
  {
    "id": "oral-zahlfolgen-2",
    "schwerpunkt": "zahlfolgen",
    "stufe": "verfahren",
    "frage": "Führen Sie an einem selbst gewählten Beispiel vor, wie man aus einer modifizierten Fibonacci-Folge mit den Startzahlen 4 und 7 die ersten Glieder und deren Summe bestimmt, und erläutern Sie, wie sich das n-te Glied mit Hilfe der gewöhnlichen Fibonacci-Zahlen darstellen lässt.",
    "musterantwort": "Mit f̃₁=4, f̃₂=7 und f̃ₙ=f̃ₙ₋₂+f̃ₙ₋₁ ergibt sich 4, 7, 11, 18, 29, 47, 76, …; die Summe der ersten sechs Glieder ist 4+7+11+18+29+47=116. Schreibt man die Glieder als Vielfache der Startzahlen, erkennt man f̃ₙ=fₙ₋₂·s₁+fₙ₋₁·s₂ mit s₁=4, s₂=7, also z. B. f̃₆=f₄·4+f₅·7=3·4+5·7=12+35=47. Die Koeffizienten sind gerade die gewöhnlichen Fibonacci-Zahlen.",
    "kriterien": [
      "korrekte Fortsetzung der Folge und richtige Summe (116)",
      "Darstellung f̃ₙ=fₙ₋₂·s₁+fₙ₋₁·s₂ genannt und angewandt",
      "nachvollziehbare Rechnung an einem konkreten Glied (Beispiel)"
    ],
    "quelle": "MAL1-1 – Zahlfolgen, figurierte Zahlen & Summenformeln",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Zahlfolgen, figurierte Zahlen & Summenformeln"
  },
  {
    "id": "oral-zahlfolgen-3",
    "schwerpunkt": "zahlfolgen",
    "stufe": "beweis",
    "frage": "Beweisen Sie die Gaußsche Summenformel 1+2+3+…+n = n·(n+1)/2 mit vollständiger Induktion. Beschreiben Sie Induktionsanfang und Induktionsschritt vollständig.",
    "musterantwort": "Behauptung A(n): Σ_{k=1}^{n} k = n(n+1)/2. Induktionsanfang n=1: linke Seite 1, rechte Seite 1·2/2=1, also gilt A(1). Induktionsschritt n→n+1: Es gelte A(n) (Induktionsvoraussetzung). Dann ist Σ_{k=1}^{n+1} k = (Σ_{k=1}^{n} k) + (n+1) = n(n+1)/2 + (n+1) = (n+1)·(n/2+1) = (n+1)(n+2)/2, was genau A(n+1) ist. Nach dem Induktionsprinzip gilt A(n) für alle n∈ℕ. (Alternativ: Beweisidee von Gauß durch paarweise Summierung erster und letzter Term, n/2 Paare zu je n+1.)",
    "kriterien": [
      "Induktionsanfang korrekt geprüft (n=1)",
      "Induktionsvoraussetzung explizit benutzt und Schritt algebraisch korrekt zu (n+1)(n+2)/2 umgeformt",
      "Schlussfolgerung auf alle n∈ℕ (Induktionsprinzip) formuliert"
    ],
    "quelle": "MAL1-1 – Zahlfolgen, figurierte Zahlen & Summenformeln",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Zahlfolgen, figurierte Zahlen & Summenformeln"
  },
  {
    "id": "oral-zahlfolgen-4",
    "schwerpunkt": "zahlfolgen",
    "stufe": "vertiefung",
    "frage": "Wie hängen figurierte Zahlen (etwa Dreieckszahlen und Quadratzahlen) mit Summenformeln zusammen? Erläutern Sie den Zusammenhang zwischen den Dreieckszahlen und der Gaußschen Summe und zeigen Sie, wie sich daraus die Summe der ersten n ungeraden Zahlen ergibt.",
    "musterantwort": "Die n-te Dreieckszahl Dₙ zählt die zu einem Dreieck gelegten Punkte und ist genau Dₙ=1+2+…+n=n(n+1)/2 – die figurierte Deutung der Gaußschen Summe. Legt man zwei aufeinanderfolgende Dreieckszahlen zusammen, entsteht ein Quadrat: Dₙ₋₁+Dₙ=n². Daraus folgt geometrisch (L-förmige Winkelhaken/Gnomone), dass die Summe der ersten n ungeraden Zahlen 1+3+5+…+(2n−1)=n² ist; jede ungerade Zahl ergänzt das (n−1)²-Quadrat zum n²-Quadrat. So verbinden figurierte Zahlen anschauliche Geometrie mit algebraischen Summenformeln und liefern zugleich Beweisideen.",
    "kriterien": [
      "Dreieckszahl Dₙ=n(n+1)/2 als figurierte Gauß-Summe erkannt",
      "Zusammenhang Dₙ₋₁+Dₙ=n² bzw. Summe ungerader Zahlen =n² begründet",
      "Verknüpfung geometrische Anschauung ↔ algebraische Formel dargestellt"
    ],
    "quelle": "MAL1-1 – Zahlfolgen, figurierte Zahlen & Summenformeln",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Zahlfolgen, figurierte Zahlen & Summenformeln"
  },
  {
    "id": "oral-zahlfolgen-5",
    "schwerpunkt": "zahlfolgen",
    "stufe": "didaktik",
    "frage": "Wie würden Sie Zahlfolgen und Summenmuster (z. B. die Gaußsche Summe oder Fibonacci) in der Grundschule einführen? Nennen Sie eine geeignete Veranschaulichung und einen typischen Schülerfehler, den Sie berücksichtigen müssen.",
    "musterantwort": "In der Grundschule beginnt man handlungs- und musterorientiert: Kinder legen Folgen mit Plättchen, Steckwürfeln oder Punktebildern (Dreiecks-/Quadratmuster) und setzen sie fort, statt formal mit Funktionen zu arbeiten. Die Gaußsche Summe lässt sich als Zusammenlegen zweier gleicher Zahlentreppen zu einem Rechteck n·(n+1) veranschaulichen (halbieren ergibt die Summe); Fibonacci als Additionsmuster benachbarter Glieder. Typische Fehler: Kinder erkennen nur die Differenz der ersten Glieder und übertragen sie linear (vermuten also eine arithmetische statt der tatsächlichen Regel), oder sie addieren beim Fortsetzen falsche Nachbarn. Wichtig sind daher entdeckendes Fortsetzen, das Versprachlichen der Regel und das Prüfen der Vermutung an weiteren Gliedern.",
    "kriterien": [
      "adressatengerechte, handlungsorientierte Einführung (Material/Punktmuster) statt Formalismus",
      "konkrete Veranschaulichung genannt (z. B. Zahlentreppe zum Rechteck)",
      "plausibler typischer Schülerfehler und didaktische Konsequenz benannt"
    ],
    "quelle": "MAL1-1 – Zahlfolgen, figurierte Zahlen & Summenformeln",
    "gruppe": "Arithmetik",
    "schwerpunkt_name": "Zahlfolgen, figurierte Zahlen & Summenformeln"
  },
  {
    "id": "oral-abbildungen-1",
    "schwerpunkt": "abbildungen",
    "stufe": "definition",
    "frage": "Was versteht man unter einer Kongruenzabbildung der Ebene? Definieren Sie den Begriff und nennen Sie die charakterisierenden Invarianten.",
    "musterantwort": "Eine Abbildung f der Ebene E auf E ordnet jedem Punkt der Ebene genau einen Bildpunkt zu. Eine Kongruenzabbildung (Bewegung) ist eine solche Abbildung, die längentreu, winkeltreu und geradentreu ist; anschaulich bildet sie Figuren deckungsgleich aufeinander ab. Zu den Kongruenzabbildungen gehören Achsenspiegelung, Drehung (mit Sonderfall Punktspiegelung bei 180°) und Verschiebung. Da die Länge erhalten bleibt, folgen auch Flächeninhalts- und Winkeltreue.",
    "kriterien": [
      "Abbildungsbegriff korrekt: jedem Punkt genau ein Bildpunkt (Eindeutigkeit), E auf E",
      "Nennt die tragenden Invarianten längen-, winkel-, geradentreu (Fachsprache)",
      "Ordnet konkrete Beispiele (Spiegelung, Drehung, Verschiebung) als Kongruenzabbildungen ein"
    ],
    "quelle": "MAL1-1 – Kongruenz-/Ähnlichkeitsabbildungen & Symmetrie",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Kongruenz-/Ähnlichkeitsabbildungen & Symmetrie"
  },
  {
    "id": "oral-abbildungen-2",
    "schwerpunkt": "abbildungen",
    "stufe": "verfahren",
    "frage": "Erläutern Sie an einem Beispiel die Grundaufgabe und die Umkehraufgabe der Drehung. Wie ermitteln Sie zu zwei kongruenten Figuren Drehzentrum und Drehwinkel?",
    "musterantwort": "Grundaufgabe: Gegeben sind Drehzentrum Z und Drehwinkel α; man dreht z.B. ein Dreieck ABC um α um Z, wobei jeder Punkt seinen Abstand zu Z behält (aus PZ=3,36 folgt P'Z=3,36). Umkehraufgabe: Gegeben sind zwei kongruente Figuren, gesucht sind Z und α. Man verbindet je einen Punkt mit seinem Bildpunkt (P mit P', Q mit Q') und errichtet die Mittelsenkrechten dieser Strecken; ihr Schnittpunkt ist Z, weil Z von Punkt und Bildpunkt gleich weit entfernt ist. Der Drehwinkel ist dann α = ∠PZP'.",
    "kriterien": [
      "Unterscheidet Grundaufgabe (Z, α gegeben) und Umkehraufgabe (Figuren gegeben) klar",
      "Konstruktion über Mittelsenkrechten der Verbindungsstrecken zum Schnittpunkt Z",
      "Nutzt Abstandstreue zu Z und bestimmt α als Winkel ∠PZP'"
    ],
    "quelle": "MAL1-1 – Kongruenz-/Ähnlichkeitsabbildungen & Symmetrie",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Kongruenz-/Ähnlichkeitsabbildungen & Symmetrie"
  },
  {
    "id": "oral-abbildungen-3",
    "schwerpunkt": "abbildungen",
    "stufe": "beweis",
    "frage": "Begründen Sie den Satz über die Verkettung zweier Geradenspiegelungen Sₕ ∘ S_g: Warum ergibt sich bei sich in S schneidenden Geraden mit Schnittwinkel α eine Drehung um S mit dem Winkel 2α (und nicht α)?",
    "musterantwort": "Man führt zuerst S_g und dann Sₕ aus (Konvention von innen nach außen). Der Schnittpunkt S liegt auf beiden Achsen und ist damit Fixpunkt beider Spiegelungen, also Fixpunkt der Verkettung – daher kommt nur eine Drehung um S in Frage. Betrachtet man einen Strahl von S unter dem Winkel φ zu g: die Spiegelung an g bringt ihn nach −φ (Winkel φ auf der anderen Seite von g), die anschließende Spiegelung an h (die zu g den Winkel α einschließt) fügt insgesamt den doppelten Achsenwinkel hinzu. Jede Einzelspiegelung trägt den Winkel zur jeweiligen Achse doppelt bei, sodass sich die Drehung um 2α ergibt (tragende Beweisidee: gemeinsamer Fixpunkt S ⇒ Drehung, addierte Achsenwinkel ⇒ 2α). Die Fälle g=h → Identität und g∥h → Verschiebung (um 2·Achsenabstand) fügen sich analog ein.",
    "kriterien": [
      "Erkennt S als gemeinsamen Fixpunkt beider Achsen ⇒ Ergebnis muss Drehung um S sein",
      "Trägt die Winkelverdopplung 2α schlüssig (jede Spiegelung spiegelt an ihrer Achse, Achsenwinkel addieren sich)",
      "Ordnet die Sonderfälle g=h (id) und g∥h (Verschiebung um doppelten Abstand) ein"
    ],
    "quelle": "MAL1-1 – Kongruenz-/Ähnlichkeitsabbildungen & Symmetrie",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Kongruenz-/Ähnlichkeitsabbildungen & Symmetrie"
  },
  {
    "id": "oral-abbildungen-4",
    "schwerpunkt": "abbildungen",
    "stufe": "vertiefung",
    "frage": "Wie hängen die Kongruenzabbildungen mit den Kongruenzsätzen für Dreiecke zusammen, und warum liefern SSS, SWS und WSW kongruente Dreiecke, WWW jedoch nicht?",
    "musterantwort": "Zwei Dreiecke heißen kongruent, wenn es eine Kongruenzabbildung gibt, die eines deckungsgleich auf das andere abbildet – gleichbedeutend damit, dass alle entsprechenden Seiten und Winkel übereinstimmen. Die Kongruenzsätze SSS, SWS, WSW (und SWW, da der dritte Winkel folgt) geben jeweils gerade so viele Stücke vor, dass das Dreieck bis auf Kongruenzabbildungen eindeutig festgelegt ist – die fehlenden Größen sind zwingend bestimmt. WWW legt nur die Form, nicht die Größe fest: es liefert ähnliche, i.A. nicht kongruente Dreiecke. Der Sonderfall SSW ist nur kongruent, wenn der Winkel der größeren Seite gegenüberliegt (sonst zwei Lösungen). Der Übergang zur Ähnlichkeit zeigt: Ähnlichkeitsabbildungen (mit zentrischer Streckung) erhalten Winkel und Streckenverhältnisse, aber nicht die Länge.",
    "kriterien": [
      "Verknüpft Kongruenz von Dreiecken mit Existenz einer Kongruenzabbildung",
      "Begründet Eindeutigkeit der festgelegten Dreiecke bei SSS/SWS/WSW, WWW nur Form (Ähnlichkeit)",
      "Grenzfall SSW korrekt und Abgrenzung Kongruenz/Ähnlichkeit"
    ],
    "quelle": "MAL1-1 – Kongruenz-/Ähnlichkeitsabbildungen & Symmetrie",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Kongruenz-/Ähnlichkeitsabbildungen & Symmetrie"
  },
  {
    "id": "oral-abbildungen-5",
    "schwerpunkt": "abbildungen",
    "stufe": "didaktik",
    "frage": "Wie führen Sie die Achsenspiegelung und den Symmetriebegriff in der Grundschule ein? Nennen Sie geeignete Veranschaulichungen und typische Schülerfehler.",
    "musterantwort": "Der Einstieg erfolgt handlungsorientiert und enaktiv: Falten von Papier (Klecksbilder, Faltschnitte), Spiegel (Tintenkleckse, Spiegelbuch), Legen mit Plättchen und Muster auf Gitter-/Punktpapier. Die Faltkante bzw. die Spiegellinie wird als Symmetrieachse erfahrbar; Kinder prüfen Achsensymmetrie durch Aufeinanderfalten (Deckungsgleichheit). Typische Fehler: Bildpunkte werden nicht im gleichen, senkrechten Abstand zur Achse eingezeichnet (Figur verrutscht oder verzerrt), die Achse wird nur waagerecht/senkrecht, nicht schräg akzeptiert, oder Achsensymmetrie und Punkt-/Drehsymmetrie werden verwechselt. Ein Spiegel oder das Nachfalten dient zugleich der Selbstkontrolle. Zentral ist der Aufbau des Grundgedankens der Längen- und Abstandstreue, der später zur formalen Achsenspiegelung führt.",
    "kriterien": [
      "Nennt konkrete enaktive/ikonische Veranschaulichungen (Falten, Spiegel, Gitterpapier)",
      "Benennt typische Schülerfehler (Abstand/Senkrechte zur Achse, schräge Achsen, Verwechslung der Symmetriearten)",
      "Adressatengerecht mit Selbstkontrolle und Bezug zur zugrunde liegenden Abstands-/Längentreue"
    ],
    "quelle": "MAL1-1 – Kongruenz-/Ähnlichkeitsabbildungen & Symmetrie",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Kongruenz-/Ähnlichkeitsabbildungen & Symmetrie"
  },
  {
    "id": "oral-flaechen-1",
    "schwerpunkt": "flaechen",
    "stufe": "definition",
    "frage": "Was versteht man unter dem Flächeninhalt einer ebenen Figur? Nennen Sie die charakterisierenden Eigenschaften eines Flächenmaßes A und erläutern Sie kurz die Rolle des Einheitsquadrats.",
    "musterantwort": "Der Flächeninhalt ordnet jeder Figur eine nichtnegative Maßzahl zu. Ein Flächenmaß A erfüllt: A(∅)=0 und A(F)≥0 (Nichtnegativität); Additivität, d.h. wenn F und G keine inneren Punkte gemeinsam haben (ihre Ränder dürfen sich berühren; formal F°∩G°=∅), dann A(F∪G)=A(F)+A(G); Kongruenzinvarianz (kongruente Figuren haben denselben Flächeninhalt); und die Normierung A(E)=1 für das Einheitsquadrat E. Das Einheitsquadrat legt als vereinbarte Maßeinheit e² fest, gegen die alle anderen Flächen gemessen werden.",
    "kriterien": [
      "Nennt Nichtnegativität, Additivität (mit Voraussetzung disjunkter innerer Punkte) und Normierung A(E)=1",
      "Verwendet korrekte Fachsprache (Maß, Maßzahl, Additivität)",
      "Erklärt das Einheitsquadrat als Normierungs-/Maßeinheit e²"
    ],
    "quelle": "MAL1-1 – Ebene Figuren, Flächeninhalte & Zerlegungsgleichheit",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Ebene Figuren, Flächeninhalte & Zerlegungsgleichheit"
  },
  {
    "id": "oral-flaechen-2",
    "schwerpunkt": "flaechen",
    "stufe": "verfahren",
    "frage": "Erklären Sie an einem Beispiel, wie man den Flächeninhalt eines Rechtecks durch Auslegen mit Einheitsquadraten bestimmt, und leiten Sie so die Formel A = a·b her. Wo stößt dieses Verfahren an seine Grenzen?",
    "musterantwort": "Man legt das Rechteck lückenlos und überlappungsfrei mit Einheitsquadraten der Seitenlänge e aus. Ein Rechteck mit den Seiten a = n·e und b = m·e enthält n Quadrate pro Reihe und m Reihen, also n·m Einheitsquadrate; wegen A(E)=e² folgt A(R) = (n·m)·e² = a·b. Beispiel: Bei a = 5e und b = 2e passen 5·2 = 10 Einheitsquadrate hinein, also A(R) = 10e². Das Auslegen gelingt exakt nur, wenn die Seitenlängen ganzzahlige Vielfache von e (bzw. eines feineren Einheitsquadrats) sind. Bei inkommensurablen bzw. irrationalen Seitenlängen (etwa π m) oder krummlinig begrenzten Figuren versagt das reine Auslegen; man benötigt eine Verfeinerung und letztlich einen Grenzwertprozess.",
    "kriterien": [
      "Führt das Auslegen konkret durch und begründet A = n·m·e² = a·b",
      "Rechnet ein konkretes Zahlenbeispiel korrekt",
      "Benennt die Grenze (inkommensurable/irrationale Seiten, krummlinige Figuren → Verfeinerung/Grenzwert)"
    ],
    "quelle": "MAL1-1 – Ebene Figuren, Flächeninhalte & Zerlegungsgleichheit",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Ebene Figuren, Flächeninhalte & Zerlegungsgleichheit"
  },
  {
    "id": "oral-flaechen-3",
    "schwerpunkt": "flaechen",
    "stufe": "beweis",
    "frage": "Begründen Sie über Zerlegungsgleichheit, dass ein Parallelogramm mit Grundseite g und Höhe h denselben Flächeninhalt hat wie ein Rechteck mit den Seiten g und h, und leiten Sie daraus A = g·h her. Auf welchen Satz stützen Sie sich?",
    "musterantwort": "Man schneidet vom Parallelogramm an einer Seite das über die Höhe h überstehende rechtwinklige Dreieck ab und verschiebt es (Kongruenzabbildung) an die gegenüberliegende Seite. Das entstehende Rechteck hat die Grundseite g und die Höhe h. Parallelogramm und Rechteck lassen sich somit in paarweise kongruente Teilfiguren zerlegen, sind also zerlegungsgleich. Tragender Satz: Zerlegungsgleiche Figuren haben denselben Flächeninhalt (er beruht auf Additivität und Kongruenzinvarianz des Maßes). Da das Rechteck den Flächeninhalt g·h besitzt, folgt A(Parallelogramm) = g·h.",
    "kriterien": [
      "Beschreibt die konkrete Zerlegung/Verschiebung (abschneiden, kongruent verschieben) zum Rechteck",
      "Nennt und nutzt den Satz: zerlegungsgleich ⇒ flächeninhaltsgleich",
      "Schließt korrekt auf A = g·h und verweist auf Kongruenzinvarianz/Additivität als Grundlage"
    ],
    "quelle": "MAL1-1 – Ebene Figuren, Flächeninhalte & Zerlegungsgleichheit",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Ebene Figuren, Flächeninhalte & Zerlegungsgleichheit"
  },
  {
    "id": "oral-flaechen-4",
    "schwerpunkt": "flaechen",
    "stufe": "vertiefung",
    "frage": "Wie hängen Zerlegungsgleichheit und Ergänzungsgleichheit zusammen, und wie verhalten sie sich zum Flächeninhalt? Ist Flächeninhaltsgleichheit umgekehrt schon hinreichend für Zerlegungsgleichheit?",
    "musterantwort": "Zwei Figuren sind zerlegungsgleich, wenn sie sich in paarweise kongruente Teilfiguren zerlegen lassen; sie sind ergänzungsgleich, wenn sie sich mit paarweise kongruenten Figuren zu zwei kongruenten Figuren ergänzen lassen. In beiden Fällen folgt für alle ebenen Figuren gleicher Flächeninhalt (beide Sätze gelten in der Ebene). Die Begriffe sind eng verwandt: Zerlegungsgleichheit impliziert Ergänzungsgleichheit. Für Polygone in der Ebene gilt sogar die Umkehrung (Satz von Bolyai-Gerwien): flächengleiche Polygone sind stets zerlegungsgleich. Im Raum ist das nicht mehr richtig (Hilberts drittes Problem, Dehn): flächen- bzw. volumengleiche Polyeder müssen nicht zerlegungsgleich sein.",
    "kriterien": [
      "Definiert beide Begriffe korrekt und grenzt Zerlegen vs. Ergänzen ab",
      "Stellt den Zusammenhang zum Flächeninhalt her (beide ⇒ flächengleich)",
      "Diskutiert die Umkehrung: für Polygone ja (Bolyai-Gerwien), im Raum nein"
    ],
    "quelle": "MAL1-1 – Ebene Figuren, Flächeninhalte & Zerlegungsgleichheit",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Ebene Figuren, Flächeninhalte & Zerlegungsgleichheit"
  },
  {
    "id": "oral-flaechen-5",
    "schwerpunkt": "flaechen",
    "stufe": "didaktik",
    "frage": "Wie führen Sie den Flächeninhalt in der Grundschule ein? Gehen Sie auf geeignete Veranschaulichungen sowie auf den typischen Schülerfehler ein, Umfang und Flächeninhalt zu verwechseln.",
    "musterantwort": "Der Aufbau folgt dem Größenkonzept: zuerst direkter Vergleich zweier Flächen (Aufeinanderlegen, Kongruenz: 'welche ist größer?'), dann indirektes Messen durch Auslegen mit gleichen Einheiten (z.B. Plättchen, später Einheitsquadraten/Karopapier), schließlich Einigung auf standardisierte Maße (cm², m²). Handelnd-enaktive Zerlegungen (ausschneiden, umlegen) machen Zerlegungsgleichheit erfahrbar. Typischer Fehler ist die Kopplung von Rand und Fläche: Kinder schließen von gleichem Umfang auf gleichen Flächeninhalt (oder umgekehrt). Dem begegnet man, indem man Figuren mit gleichem Umfang, aber verschiedenem Flächeninhalt (und umgekehrt) auslegen und vergleichen lässt, sodass beide Größen bewusst getrennt werden.",
    "kriterien": [
      "Skizziert den Stufengang direkter Vergleich → indirektes Messen/Auslegen → standardisierte Einheit",
      "Nennt konkrete, adressatengerechte Veranschaulichung (Plättchen/Karopapier, enaktives Zerlegen)",
      "Benennt die Umfang-Flächen-Verwechslung und eine gezielte Gegenmaßnahme (Gegenbeispiele mit gleichem Umfang, anderer Fläche)"
    ],
    "quelle": "MAL1-1 – Ebene Figuren, Flächeninhalte & Zerlegungsgleichheit",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Ebene Figuren, Flächeninhalte & Zerlegungsgleichheit"
  },
  {
    "id": "oral-pythagoras-1",
    "schwerpunkt": "pythagoras",
    "stufe": "definition",
    "frage": "Formulieren Sie den Satz des Pythagoras präzise als Wenn-dann-Aussage und benennen Sie die vorkommenden Größen a, b und c.",
    "musterantwort": "Für jedes Dreieck ABC gilt: Wenn ABC bei C rechtwinklig ist, dann gilt a² + b² = c². Dabei sind a und b die Katheten (die dem rechten Winkel anliegenden Seiten) und c die Hypotenuse (die dem rechten Winkel gegenüberliegende, längste Seite). Flächengeometrisch gedeutet: Die Summe der Flächeninhalte der Quadrate über den beiden Katheten ist gleich dem Flächeninhalt des Quadrats über der Hypotenuse. Die Rechtwinkligkeit ist zwingende Voraussetzung; ohne sie gilt die Aussage nicht.",
    "kriterien": [
      "Korrekte Wenn-dann-Struktur mit Rechtwinkligkeit als Voraussetzung und a²+b²=c² als Behauptung",
      "Fachbegriffe Kathete/Hypotenuse richtig zugeordnet (c gegenüber dem rechten Winkel)",
      "Flächendeutung der Quadrate genannt"
    ],
    "quelle": "MAL1-1 – Satzgruppe des Pythagoras",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Satzgruppe des Pythagoras"
  },
  {
    "id": "oral-pythagoras-2",
    "schwerpunkt": "pythagoras",
    "stufe": "verfahren",
    "frage": "In einem rechtwinkligen Dreieck ist eine Kathete 3 cm und die Hypotenuse 8 cm lang. Bestimmen Sie die Länge der zweiten Kathete und erläutern Sie Ihr Vorgehen.",
    "musterantwort": "Man stellt den Satz des Pythagoras nach der gesuchten Kathete um. Mit a = 3 cm (Kathete) und c = 8 cm (Hypotenuse) gilt a² + b² = c², also b² = c² − a² = 8² − 3² = 64 − 9 = 55. Damit ist b = √55 ≈ 7,42 cm. Wichtig ist, zuerst zu prüfen, welche Seite die Hypotenuse ist (die längste, dem rechten Winkel gegenüber), damit man subtrahiert statt addiert.",
    "kriterien": [
      "Richtige Umstellung b² = c² − a² (Subtraktion, nicht Addition)",
      "Korrekte Rechnung mit Ergebnis √55 ≈ 7,42 cm",
      "Begründet, dass 8 cm als Hypotenuse identifiziert wird"
    ],
    "quelle": "MAL1-1 – Satzgruppe des Pythagoras",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Satzgruppe des Pythagoras"
  },
  {
    "id": "oral-pythagoras-3",
    "schwerpunkt": "pythagoras",
    "stufe": "beweis",
    "frage": "Beweisen Sie den Satz des Pythagoras mit einem Ergänzungsbeweis (Quadrat der Seitenlänge a+b, in das vier kongruente rechtwinklige Dreiecke eingelegt sind). Erklären Sie insbesondere, warum die innere Figur ein Quadrat mit Seitenlänge c ist.",
    "musterantwort": "In ein großes Quadrat der Seitenlänge (a+b) legt man vier zum Ausgangsdreieck kongruente rechtwinklige Dreiecke (Katheten a, b, Hypotenuse c; kongruent nach SSS bzw. SWS). Ihre Hypotenusen bilden die Ränder der inneren Figur. Deren Seiten haben Länge c; die Innenwinkel sind rechte Winkel, weil an jeder Ecke die beiden spitzen Dreieckswinkel α und β mit α+β = 90° zusammen mit dem gesuchten Winkel eine gestreckte Situation ergeben, sodass der Innenwinkel 180° − (α+β) = 90° beträgt. Die innere Figur ist also ein Quadrat mit Fläche c². Flächenbilanz: (a+b)² = 4·(½ab) + c², d. h. a² + 2ab + b² = 2ab + c². Kürzen von 2ab liefert a² + b² = c².",
    "kriterien": [
      "Kongruenz der vier Dreiecke begründet (SSS/SWS)",
      "Nachweis, dass die innere Figur ein Quadrat ist (α+β=90° ⇒ rechter Innenwinkel), Seite c",
      "Vollständige Flächenbilanz (a+b)² = 4·½ab + c² mit korrektem Kürzen zu a²+b²=c²"
    ],
    "quelle": "MAL1-1 – Satzgruppe des Pythagoras",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Satzgruppe des Pythagoras"
  },
  {
    "id": "oral-pythagoras-4",
    "schwerpunkt": "pythagoras",
    "stufe": "vertiefung",
    "frage": "Wie hängen Kathetensatz, Höhensatz und Satz des Pythagoras zusammen? Skizzieren Sie, wie sich der Höhensatz aus dem Kathetensatz herleiten lässt, und ordnen Sie auch die Umkehrung des Satzes von Pythagoras ein.",
    "musterantwort": "Alle drei bilden die Satzgruppe des Pythagoras am rechtwinkligen Dreieck mit der Höhe h_c, die die Hypotenuse in die Abschnitte p und q teilt (c = p + q). Der Kathetensatz besagt a² = p·c und b² = q·c; der Höhensatz h_c² = p·q. Herleitung des Höhensatzes: Nach dem Kathetensatz gilt a² = p·c und im Teildreieck a² = h_c² + p², also h_c² = a² − p² = p·c − p² = p·(c − p) = p·q (wegen c − p = q). Addiert man die beiden Kathetensatz-Gleichungen, erhält man a² + b² = p·c + q·c = (p+q)·c = c², also den Satz des Pythagoras. Die Umkehrung dreht Voraussetzung und Folgerung um: Wenn a² + b² = c² gilt, dann ist das Dreieck rechtwinklig; sie ist mit dem Satz selbst noch nicht bewiesen und braucht ein eigenes Argument, z. B. über Kongruenz: Man konstruiert ein rechtwinkliges Dreieck mit den Katheten a und b; dessen Hypotenuse hat nach Pythagoras die Länge √(a²+b²) = c, sodass das Ausgangsdreieck nach SSS zu diesem kongruent und damit ebenfalls bei C rechtwinklig ist. Zusammen mit dem Satz liefert die Umkehrung die Genau-dann-wenn-Aussage.",
    "kriterien": [
      "Kathetensatz (a²=p·c) und Höhensatz (h_c²=p·q) korrekt genannt und in der Herleitung verknüpft",
      "Pythagoras als Summe der Kathetensätze erkannt (p·c+q·c=c²)",
      "Umkehrung als Vertauschung von Voraussetzung/Folgerung eingeordnet (nicht mit dem Satz selbst identisch)"
    ],
    "quelle": "MAL1-1 – Satzgruppe des Pythagoras",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Satzgruppe des Pythagoras"
  },
  {
    "id": "oral-pythagoras-5",
    "schwerpunkt": "pythagoras",
    "stufe": "didaktik",
    "frage": "Der Satz des Pythagoras ist kein Grundschulinhalt. Wie können Sie dennoch tragfähige Grundvorstellungen (etwa rechte Winkel, Flächengleichheit, das 3-4-5-Dreieck) in der Primarstufe anbahnen, und welche typischen Schülerfehler sollten Sie im Blick haben?",
    "musterantwort": "In der Grundschule bereitet man die Satzgruppe handlungsorientiert vor, ohne die Formel zu behandeln: rechte Winkel mit dem Geodreieck erkennen und herstellen, das Bauarbeiter-Dreieck mit Seitenverhältnis 3:4:5 (Knotenschnur) legen und so einen rechten Winkel erzeugen, sowie Flächen durch Auslegen und Zerlegen mit Einheitsquadraten vergleichen (Grundvorstellung Flächengleichheit). Enaktiv-ikonisch-symbolisch: erst legen/falten, dann zeichnen, später verallgemeinern. Typische Fehler und Fehlvorstellungen, die man antizipieren sollte: Verwechslung von Umfang und Flächeninhalt beim Vergleichen; die längste Seite (Hypotenuse) nicht als solche erkennen; die Voraussetzung Rechtwinkligkeit ignorieren; a² als 'a mal 2' statt 'a mal a' deuten. Diese Grundlagen tragen später den formalen Satz.",
    "kriterien": [
      "Adressatengerechte, handlungsorientierte Anbahnung (rechte Winkel, 3-4-5-Dreieck, Flächenauslegen) statt Formel",
      "Bezug zu tragfähigen Grundvorstellungen (Flächengleichheit, enaktiv-ikonisch-symbolisch)",
      "Nennt konkrete typische Schülerfehler (z. B. Umfang/Fläche, a² fehlgedeutet, Hypotenuse verkannt)"
    ],
    "quelle": "MAL1-1 – Satzgruppe des Pythagoras",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Satzgruppe des Pythagoras"
  },
  {
    "id": "oral-konstruktion-1",
    "schwerpunkt": "konstruktion",
    "stufe": "definition",
    "frage": "Was versteht man unter der Mittelsenkrechten einer Strecke AB? Definieren Sie den Begriff und beschreiben Sie ihn zusätzlich als geometrischen Ort.",
    "musterantwort": "Eine Gerade m_AB heißt genau dann Mittelsenkrechte zur Strecke AB, wenn sie durch den Mittelpunkt von AB verläuft und senkrecht auf AB steht (beide Bedingungen zusammen). Gleichwertig ist die Ortsbeschreibung: Die Mittelsenkrechte ist der geometrische Ort aller Punkte P der Ebene, die von A und B den gleichen Abstand haben (|PA| = |PB|).",
    "kriterien": [
      "Nennt beide definierenden Bedingungen: durch den Mittelpunkt von AB UND senkrecht zu AB",
      "Gibt die Ortsbeschreibung 'gleiche Entfernung zu A und B' korrekt an",
      "Verwendet saubere Fachsprache (geometrischer Ort, Abstand)"
    ],
    "quelle": "MAL1-1 – Dreieckskonstruktionen & besondere Linien im Dreieck",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Dreieckskonstruktionen & besondere Linien im Dreieck"
  },
  {
    "id": "oral-konstruktion-2",
    "schwerpunkt": "konstruktion",
    "stufe": "verfahren",
    "frage": "Führen Sie vor, wie man die Mittelsenkrechte einer Strecke AB nur mit Zirkel und Lineal konstruiert. Beschreiben Sie die Schritte und erläutern Sie, warum genau diese Konstruktion zur Mittelsenkrechten führt.",
    "musterantwort": "Man sticht mit dem Zirkel in A ein und schlägt einen Kreis mit einem Radius r, der größer als die halbe Strecke AB ist; mit demselben Radius r schlägt man einen Kreis um B. Die beiden Kreise schneiden sich in zwei Punkten P und Q; die Gerade PQ (mit dem Lineal gezogen) ist die gesuchte Mittelsenkrechte. Begründung: P und Q haben als Schnittpunkte gleicher Kreisradien beide den Abstand r zu A und zu B, liegen also auf dem Ort gleicher Entfernung — der Mittelsenkrechten.",
    "kriterien": [
      "Gleicher Zirkelradius (> ½·AB) um A und um B, Verbindung der beiden Schnittpunkte mit dem Lineal",
      "Trennt Zirkel- (Kreise) und Lineal-Tätigkeit (Gerade) sauber",
      "Begründet über gleiche Abstände / Schnittpunkte gleicher Radien"
    ],
    "quelle": "MAL1-1 – Dreieckskonstruktionen & besondere Linien im Dreieck",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Dreieckskonstruktionen & besondere Linien im Dreieck"
  },
  {
    "id": "oral-konstruktion-3",
    "schwerpunkt": "konstruktion",
    "stufe": "beweis",
    "frage": "Beweisen Sie, dass sich die drei Mittelsenkrechten eines beliebigen Dreiecks ABC in einem Punkt schneiden, und begründen Sie, warum dieser Punkt der Mittelpunkt des Umkreises ist.",
    "musterantwort": "Sei M_U der Schnittpunkt der Mittelsenkrechten m_AB und m_BC. Weil M_U auf m_AB liegt, gilt |M_U A| = |M_U B|; weil M_U auch auf m_BC liegt, gilt |M_U B| = |M_U C|. Durch Transitivität folgt |M_U A| = |M_U B| = |M_U C|. Wegen |M_U A| = |M_U C| erfüllt M_U die Ortseigenschaft der dritten Mittelsenkrechten m_CA und liegt daher auch auf ihr — alle drei schneiden sich also in M_U. Da M_U von A, B und C denselben Abstand hat, ist der Kreis um M_U mit diesem Radius der Kreis durch A, B, C, also der Umkreis, und M_U sein Mittelpunkt.",
    "kriterien": [
      "Nutzt die Ortseigenschaft (Punkt auf Mittelsenkrechter ⇒ gleiche Abstände) als tragendes Argument",
      "Schließt per Transitivität |M_U A| = |M_U B| = |M_U C| und folgert Liegen auf der dritten Mittelsenkrechten",
      "Begründet die Umkreiseigenschaft aus der Gleichheit der drei Abstände"
    ],
    "quelle": "MAL1-1 – Dreieckskonstruktionen & besondere Linien im Dreieck",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Dreieckskonstruktionen & besondere Linien im Dreieck"
  },
  {
    "id": "oral-konstruktion-4",
    "schwerpunkt": "konstruktion",
    "stufe": "vertiefung",
    "frage": "Es gibt im Dreieck mehrere ausgezeichnete 'Mitten' (z. B. Umkreismittelpunkt, Inkreismittelpunkt, Schwerpunkt). Wie hängen diese Punkte mit unterschiedlichen 'Gleichheits'-Bedingungen zusammen, und was ändert sich für die Lage des Umkreismittelpunkts bei spitz-, recht- und stumpfwinkligen Dreiecken?",
    "musterantwort": "Jede Mitte gehört zu einer eigenen Ortsbedingung: Der Umkreismittelpunkt M_U (Schnittpunkt der Mittelsenkrechten) hat gleiche Entfernung zu den Ecken A, B, C; der Inkreismittelpunkt M_I (Schnittpunkt der Winkelhalbierenden) hat gleichen Abstand zu den Seiten; der Schwerpunkt M_S (Schnittpunkt der Seitenhalbierenden) tariert die Fläche aus. Für M_U gilt: Im spitzwinkligen Dreieck liegt er innerhalb, im stumpfwinkligen außerhalb, und im rechtwinkligen Dreieck genau auf dem Mittelpunkt der Hypotenuse (Satz des Thales). Der Inkreismittelpunkt liegt dagegen immer innen.",
    "kriterien": [
      "Ordnet mindestens Umkreis- (gleiche Entfernung zu Ecken) und Inkreismittelpunkt (gleicher Abstand zu Seiten) der jeweils richtigen Bedingung und Schnittlinie zu",
      "Beschreibt die Lageänderung von M_U (innen/auf Hypotenuse/außen) korrekt, idealerweise mit Thales-Bezug",
      "Grenzt die Mitten klar voneinander ab, ohne sie zu verwechseln"
    ],
    "quelle": "MAL1-1 – Dreieckskonstruktionen & besondere Linien im Dreieck",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Dreieckskonstruktionen & besondere Linien im Dreieck"
  },
  {
    "id": "oral-konstruktion-5",
    "schwerpunkt": "konstruktion",
    "stufe": "didaktik",
    "frage": "Wie können Sie den Umkreismittelpunkt bzw. die Idee 'gleiche Entfernung zu mehreren Orten' in der Grundschule anschaulich einführen? Nennen Sie eine geeignete Sachsituation, eine handelnde Veranschaulichung und einen typischen Schülerfehler.",
    "musterantwort": "Man knüpft an eine Sachsituation an, etwa: Ein Rettungshubschrauber soll so stationiert werden, dass er zu drei Skigebieten (Orten) gleich weit hat. Handelnd erschließen die Kinder zunächst 'gleiche Entfernung zu zwei Orten' über Faltung (Papier so falten, dass zwei Punkte aufeinanderliegen) oder über Kreise gleichen Radius, bevor der dritte Ort ergänzt wird. Ein typischer Schülerfehler ist die Verwechslung von 'gleicher Abstand zu den Ecken' (Umkreis) mit 'gleichem Abstand zu den Seiten' (Inkreis) sowie die Vorstellung, der gesuchte Punkt liege stets im Inneren des Dreiecks.",
    "kriterien": [
      "Konkrete, tragfähige Sachsituation zu 'gleiche Entfernung' (z. B. Standort/Treffpunkt)",
      "Handlungsorientierte Veranschaulichung (Falten, Kreise gleichen Radius) statt bloßer Formel",
      "Benennt einen realistischen Schülerfehler (z. B. Ecken- vs. Seitenabstand, Punkt immer 'innen')"
    ],
    "quelle": "MAL1-1 – Dreieckskonstruktionen & besondere Linien im Dreieck",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Dreieckskonstruktionen & besondere Linien im Dreieck"
  },
  {
    "id": "oral-polygone-1",
    "schwerpunkt": "polygone",
    "stufe": "definition",
    "frage": "Was versteht man unter einem regulären Polygon (regelmäßigen n-Eck), und wann spricht man von einer Parkettierung der Ebene? Definieren Sie beide Begriffe.",
    "musterantwort": "Ein reguläres Polygon (regelmäßiges n-Eck) ist ein Vieleck, dessen Seiten alle gleich lang sind und dessen Innenwinkel alle gleich groß sind. Eine Parkettierung (ein Parkett) der Ebene ist eine überlappungsfreie (ohne Überlappung) und lückenlose Überdeckung der gesamten, unendlich gedachten Ebene mit Vielecken bzw. Figuren, sodass sich das Muster prinzipiell nach allen Seiten endlos fortsetzen lässt. Verwendet man dabei nur ein einziges, immer wieder kongruent kopiertes Vieleck, spricht man von einer monohedralen Parkettierung; es dürfen aber auch verschiedene Figuren kombiniert werden.",
    "kriterien": [
      "Reguläres Polygon über gleiche Seitenlängen UND gleiche Innenwinkel korrekt gefasst",
      "Parkettierung: überlappungsfrei und lückenlos genannt",
      "Idee der unendlich fortsetzbaren Ebene / Fachsprache angemessen"
    ],
    "quelle": "MAL1-1 – Reguläre Polygone, Bandornamente & Parkette",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Reguläre Polygone, Bandornamente & Parkette"
  },
  {
    "id": "oral-polygone-2",
    "schwerpunkt": "polygone",
    "stufe": "verfahren",
    "frage": "Bestimmen Sie den Innenwinkel eines regulären Sechsecks und zeigen Sie an diesem Beispiel, wie man mithilfe der Winkel an einer Ecke entscheidet, ob sich die Ebene damit parkettieren lässt.",
    "musterantwort": "Die Innenwinkelsumme des n-Ecks beträgt (n−2)·180°, für n=6 also (6−2)·180° = 720°. Da alle sechs Innenwinkel gleich groß sind, misst jeder 720°:6 = 120°. An einer Ecke des Parketts müssen sich die zusammenstoßenden Winkel zu genau 360° (Vollwinkel) ergänzen. Wegen 3·120° = 360° treffen sich genau drei reguläre Sechsecke lückenlos in einem Punkt, also parkettieren reguläre Sechsecke die Ebene.",
    "kriterien": [
      "Innenwinkel korrekt zu 120° berechnet (über Innenwinkelsumme oder 360°-Bezug)",
      "Kriterium 'Winkel um eine Ecke ergeben 360°' angewandt",
      "3·120°=360° als Begründung des Parkettierens genannt"
    ],
    "quelle": "MAL1-1 – Reguläre Polygone, Bandornamente & Parkette",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Reguläre Polygone, Bandornamente & Parkette"
  },
  {
    "id": "oral-polygone-3",
    "schwerpunkt": "polygone",
    "stufe": "beweis",
    "frage": "Beweisen bzw. begründen Sie, dass sich die Ebene unter den regulären Polygonen nur mit dem gleichseitigen Dreieck, dem Quadrat und dem regulären Sechseck allein parkettieren lässt.",
    "musterantwort": "Der Innenwinkel eines regelmäßigen n-Ecks ist (n−2)·180°/n. Damit sich in einer Ecke mehrere gleiche Polygone lückenlos zum Vollwinkel schließen, muss dieser Innenwinkel ein Teiler von 360° sein, d.h. 360° geteilt durch den Innenwinkel muss eine natürliche Zahl ≥ 3 ergeben. Prüft man die Innenwinkel: Dreieck 60° (360°:60°=6), Quadrat 90° (360°:90°=4), Sechseck 120° (360°:120°=3) — alle gehen ganzzahlig auf. Das reguläre Fünfeck hat 108° (360°:108° = 3,33… nicht ganzzahlig), und ab n=7 liegt der Innenwinkel echt zwischen 120° und 180°, sodass 360° nur zwischen 2 und 3 Polygone fasst — nie ganzzahlig. Also parkettieren allein 3-, 4- und 6-Ecke.",
    "kriterien": [
      "Bedingung 'Innenwinkel ist Teiler von 360°' als tragendes Argument",
      "Innenwinkelformel (n−2)·180°/n bzw. konkrete Werte 60°/90°/120° benutzt",
      "Ausschluss des Fünfecks (108°) und größerer n-Ecke schlüssig begründet"
    ],
    "quelle": "MAL1-1 – Reguläre Polygone, Bandornamente & Parkette",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Reguläre Polygone, Bandornamente & Parkette"
  },
  {
    "id": "oral-polygone-4",
    "schwerpunkt": "polygone",
    "stufe": "vertiefung",
    "frage": "Reguläre Fünfecke parkettieren die Ebene nicht, allgemeine (unregelmäßige) Fünfecke aber sehr wohl. Erläutern Sie diesen Zusammenhang und gehen Sie darauf ein, warum sich hingegen mit JEDEM beliebigen Dreieck die Ebene parkettieren lässt.",
    "musterantwort": "Die Bedingung 'Innenwinkel ist Teiler von 360°' gilt nur für reguläre Polygone, bei denen alle Ecken gleich sind. Beim regulären Fünfeck scheitert das an 108°, das kein Teiler von 360° ist. Ein allgemeines Fünfeck ist nicht an gleiche Winkel gebunden; passende Fünfeckstypen lassen sich so kombinieren, dass sich an jeder Ecke die verschiedenen Winkel zu 360° ergänzen. Beim Dreieck gilt sogar universell: Die Innenwinkelsumme ist stets 180°. Legt man zwei kongruente Exemplare punktsymmetrisch (um 180° gedreht) zusammen, entsteht ein Parallelogramm, und Parallelogramme parkettieren die Ebene durch Verschieben immer — deshalb geht es mit allen Dreiecken. Analog parkettiert auch jedes beliebige Viereck (Winkelsumme 360°).",
    "kriterien": [
      "Unterschied reguläres vs. allgemeines Polygon (feste vs. mischbare Winkel) klar",
      "108° als Grund für Scheitern des regulären Fünfecks",
      "Dreieck: Winkelsumme 180° / Zusammensetzen zum Parallelogramm als Begründung",
      "Erkennt Verallgemeinerung auf beliebige Vierecke"
    ],
    "quelle": "MAL1-1 – Reguläre Polygone, Bandornamente & Parkette",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Reguläre Polygone, Bandornamente & Parkette"
  },
  {
    "id": "oral-polygone-5",
    "schwerpunkt": "polygone",
    "stufe": "didaktik",
    "frage": "Wie führen Sie das Thema Parkettieren in der Grundschule ein? Beschreiben Sie eine geeignete Veranschaulichung und nennen Sie typische Schülerfehler.",
    "musterantwort": "Einstieg handlungsorientiert und enaktiv: Kinder legen mit kongruenten Plättchen (Quadrate, Dreiecke, Sechsecke, Muster-/Legeplättchen) Flächen aus und untersuchen, welche Formen 'ohne Lücken und ohne Überlappung' aneinanderpassen. Anknüpfung an die Lebenswelt (Fliesen, Pflaster, Waben). Die Winkelbedingung wird nicht formal berechnet, sondern durch Drehen und Legen erfahren ('Passt es rund um einen Punkt herum auf?'). Kreativ erweitern lässt sich das mit der Knabbertechnik (aus einem Quadrat etwas abschneiden und kongruent wieder anfügen). Typische Fehler: Lücken/Überlappungen werden übersehen, Figuren werden nicht als kongruent erkannt, das Muster wird nur lokal statt fortsetzbar gedacht, und Kinder verwechseln 'passt an einer Seite' mit 'füllt rund um die Ecke'.",
    "kriterien": [
      "Enaktiver, handlungsorientierter Zugang mit Legematerial",
      "Kernkriterium 'lückenlos und überlappungsfrei' altersgerecht statt formal",
      "Lebensweltbezug / geeignete Veranschaulichung (Fliesen, Waben, Knabbertechnik)",
      "Mindestens ein typischer Schülerfehler benannt"
    ],
    "quelle": "MAL1-1 – Reguläre Polygone, Bandornamente & Parkette",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Reguläre Polygone, Bandornamente & Parkette"
  },
  {
    "id": "oral-koerper-1",
    "schwerpunkt": "koerper",
    "stufe": "definition",
    "frage": "Was versteht man in der Geometrie unter einem Körper? Erläutern Sie den Begriff und grenzen Sie insbesondere die Klasse der Polyeder von krummflächig begrenzten Körpern ab. Nennen Sie je Beispiele.",
    "musterantwort": "Ein (geometrischer) Körper ist ein beschränktes, dreidimensionales Objekt des Raumes, das von Flächen begrenzt wird und ein Volumen einschließt. Ein Polyeder (Vielflächner) ist ein Körper, der ausschließlich von ebenen Vielecken (den Seitenflächen) begrenzt wird; diese treffen sich in geradlinigen Kanten und den Ecken. Beispiele sind Würfel, Quader und Pyramide. Krummflächig begrenzte Körper besitzen mindestens eine gekrümmte Fläche und sind keine Polyeder, z. B. Zylinder, Kegel und Kugel.",
    "kriterien": [
      "Nennt Dreidimensionalitaet, Begrenzung durch Flaechen und eingeschlossenes Volumen als Merkmale eines Koerpers",
      "Definiert Polyeder korrekt ueber ebene Vielecke als Begrenzung (erst hier Ecken/Kanten/Flaechen)",
      "Ordnet Beispiele richtig zu (Wuerfel/Quader/Pyramide = Polyeder; Zylinder/Kegel/Kugel = krummflaechig)",
      "Verwendet praezise Fachsprache (Seitenflaechen, Kanten, Ecken)"
    ],
    "quelle": "MAL1-1 – Körper & räumliche Objekte",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Körper & räumliche Objekte"
  },
  {
    "id": "oral-koerper-2",
    "schwerpunkt": "koerper",
    "stufe": "verfahren",
    "frage": "Erklären Sie am Beispiel des Würfels, wie man von einem Körper zu seinem Netz gelangt. Zeigen Sie an einer konkreten Netzform, dass Netze durch Abwickeln bzw. Aufschneiden an den Kanten entstehen, und geben Sie an, wie viele verschiedene Würfelnetze es gibt.",
    "musterantwort": "Ein Netz erhaelt man, indem man die sechs quadratischen Flaechen des Wuerfels an einigen Kanten aufschneidet und den Koerper in die Ebene abwickelt, sodass alle Flaechen zusammenhaengend und ueberlappungsfrei ausgebreitet liegen; umgekehrt laesst sich das Netz wieder zum Wuerfel zusammenfalten. Mathematisch sind Wuerfelnetze Hexominos (sechs kantenverbundene Quadrate). Beruecksichtigt man Drehungen und Spiegelungen als gleich, gibt es genau 11 verschiedene Wuerfelnetze. Eine haeufige Grundstruktur ist die Kreuzform: vier Quadrate in einer Spalte, dazu je ein Quadrat links und rechts an demselben (z. B. dem zweiten) Quadrat der Spalte. Ein reiner 1x6-Streifen ist dagegen kein gueltiges Wuerfelnetz.",
    "kriterien": [
      "Beschreibt Abwickeln/Aufschneiden an Kanten als erzeugendes Verfahren",
      "Zeichnet oder beschreibt korrekt mindestens ein gültiges Würfelnetz",
      "Nennt die Zahl 11 verschiedener Netze (bzw. begründet Reduktion durch Drehung/Spiegelung)",
      "Prüft Faltbarkeit/Überlappungsfreiheit als Gültigkeitskriterium"
    ],
    "quelle": "MAL1-1 – Körper & räumliche Objekte",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Körper & räumliche Objekte"
  },
  {
    "id": "oral-koerper-3",
    "schwerpunkt": "koerper",
    "stufe": "beweis",
    "frage": "Der Eulersche Polyedersatz besagt für konvexe Polyeder E − K + F = 2 (Ecken, Kanten, Flächen). Verifizieren Sie die Formel an Würfel und Tetraeder und begründen Sie anschaulich, warum die Größe E − K + F beim schrittweisen Aufbau des Netzes invariant bleibt.",
    "musterantwort": "Würfel: E = 8, K = 12, F = 6, also 8 − 12 + 6 = 2. Tetraeder: E = 4, K = 6, F = 4, also 4 − 6 + 4 = 2. Beweisidee (Abwicklung in einen ebenen Graphen): Man projiziert das Polyeder auf einen planaren Graphen, wobei eine Fläche zum 'Außengebiet' wird; für diesen Graphen zeigt man E − K + F = 2 induktiv. Startet man mit einem einzelnen Knoten (E=1, K=0, F=1: 1−0+1=2) und baut den Graphen schrittweise auf, so ändert jede Operation die Größe nicht: Fügt man eine Kante mit neuer Ecke hinzu, steigen E und K je um 1 (Differenz bleibt); schließt eine neue Kante zwei vorhandene Ecken zu einem Kreis, so steigen K und F je um 1 (Differenz bleibt). Da der Ausdruck bei jedem Schritt konstant 2 ist, gilt die Formel für das ganze Polyeder.",
    "kriterien": [
      "Rechnet E−K+F=2 für Würfel und Tetraeder korrekt nach",
      "Nennt die tragende Beweisidee (planarer Graph / schrittweiser Aufbau, Induktion)",
      "Zeigt bei beiden Aufbauschritten, dass E−K+F invariant bleibt",
      "Setzt Fachbegriffe Ecke/Kante/Fläche korrekt ein"
    ],
    "quelle": "MAL1-1 – Körper & räumliche Objekte",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Körper & räumliche Objekte"
  },
  {
    "id": "oral-koerper-4",
    "schwerpunkt": "koerper",
    "stufe": "vertiefung",
    "frage": "Wie hängen die 11 Würfelnetze mit den 35 Hexominos zusammen, und warum sind nicht alle Hexominos Würfelnetze? Erläutern Sie außerdem, in welchem Verhältnis die verschiedenen Modellarten (Voll-, Kanten- und Flächenmodell) zu den drei Größen des Eulerschen Polyedersatzes stehen.",
    "musterantwort": "Alle Würfelnetze sind Hexominos (sechs kantenverbundene Quadrate), aber nur 11 der 35 Hexominos lassen sich zu einem Würfel falten; die übrigen führen beim Falten zu Überlappungen oder freien Kanten. Die Netzeigenschaft ist also eine echte Teilbedingung. Bezug zu den Modellarten: Das Flächenmodell (und das Netz) betont die Flächen F, das Kantenmodell (z. B. aus Stäben/Knoten) macht Kanten K und Ecken E sichtbar, das Vollmodell zeigt den Körper als Ganzes mit Volumen. Am Kantenmodell lassen sich E, K und F besonders gut auszählen und der Zusammenhang E−K+F=2 überprüfen.",
    "kriterien": [
      "Erklärt Teilmengenbeziehung: 11 Netze ⊂ 35 Hexominos, mit Begründung (Faltbarkeit)",
      "Nennt ein konkretes Ausschlusskriterium (Überlappung/nicht schließbar)",
      "Ordnet Voll-, Kanten- und Flächenmodell sinnvoll den Aspekten Volumen/E,K/F zu",
      "Stellt einen tragfähigen Zusammenhang zwischen Darstellungsform und Polyedersatz her"
    ],
    "quelle": "MAL1-1 – Körper & räumliche Objekte",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Körper & räumliche Objekte"
  },
  {
    "id": "oral-koerper-5",
    "schwerpunkt": "koerper",
    "stufe": "didaktik",
    "frage": "Wie führen Sie geometrische Körper und Würfelnetze in der Grundschule ein? Gehen Sie auf geeignete Handlungserfahrungen und Kopfgeometrie ein, nennen Sie einen typischen Schülerfehler beim Umgang mit Netzen und wie Sie ihm begegnen.",
    "musterantwort": "Einstieg über Handlungserfahrungen: Körper aus der Umwelt suchen, ertasten (taktile Erfahrungen), Bauen mit homogenem und heterogenem Material sowie Herstellen von Voll-, Kanten- und Flächenmodellen. Würfelnetze führe ich über einen offenen Forscherauftrag ein ('Finde möglichst viele Sechslinge, die sich zu einem Würfel falten lassen'), zunächst handelnd durch Auf- und Abwickeln realer Würfel, später kopfgeometrisch, indem Kinder ohne Falten vorhersagen, ob ein Netz faltbar ist bzw. welche Flächen gegenüberliegen. Kopfgeometrie schult so die mentale Rotation und Veranschaulichung. Typischer Fehler: Kinder halten jedes Sechsling-Muster für ein Würfelnetz oder ordnen gegenüberliegende Flächen falsch zu. Begegnung: konkretes Nachfalten (enaktive Rückbindung), Markieren gegenüberliegender Flächen, und schrittweiser Übergang vom Handeln zur Vorstellung.",
    "kriterien": [
      "Nennt konkrete Handlungserfahrungen (Bauen, Ertasten, Modelle, Umwelt)",
      "Bindet Kopfgeometrie / mentale Vorstellung sinnvoll ein (Faltvorhersage)",
      "Benennt einen realistischen Schülerfehler bei Netzen",
      "Zeigt adressatengerechte Förderung (enaktiv→ikonisch→mental, offene Aufgabe)"
    ],
    "quelle": "MAL1-1 – Körper & räumliche Objekte",
    "gruppe": "Geometrie",
    "schwerpunkt_name": "Körper & räumliche Objekte"
  },
  {
    "id": "oral-didaktik-1",
    "schwerpunkt": "didaktik",
    "stufe": "definition",
    "frage": "Was versteht man nach Franke (2000) unter einem \"Begriff\", und wie unterscheidet er sich von einem Eigennamen? Erläutern Sie zudem, was das van-Hiele-Modell mit seinen fünf Niveaustufen des geometrischen Denkens beschreibt.",
    "musterantwort": "Ein Begriff liegt nach Franke (2000) vor, wenn nicht nur ein einzelner Gegenstand bezeichnet wird, sondern eine Kategorie/Klasse assoziiert wird, in die der konkrete Gegenstand einzuordnen ist: Mit einem Begriff werden Objekte oder Erscheinungen hinsichtlich bestimmter Eigenschaften zusammengefasst (z. B. \"Dreieck\", \"Katze\"). Ein Eigenname (z. B. \"Ravensburg\", \"Tante Lisa\") benennt dagegen ein Einzelnes und ist kein Begriff. Das van-Hiele-Modell (Dina van Hiele-Geldof, Pierre van Hiele) beschreibt geometrisches Verstehen in fünf aufeinander aufbauenden Niveaustufen (0 anschauungsgebunden, 1 Analysieren, 2 erstes Schließen/Abstrahieren, 3 Deduktion, 4 strenge abstrakte Geometrie); anders als bei Piaget ist die Entwicklung durch Methoden und Materialangebote des Unterrichts beeinflussbar.",
    "kriterien": [
      "Nennt das Kernkriterium Klasse/Kategorie statt Einzelgegenstand (Franke) und grenzt Begriff vom Eigennamen ab",
      "Verwendet korrekte Fachsprache (\"hinsichtlich bestimmter Eigenschaften zusammenfassen\")",
      "Benennt van-Hiele: fünf Niveaustufen und deren aufsteigende Ordnung",
      "Erwähnt die didaktische Pointe: Beeinflussbarkeit durch Unterricht (Gegensatz zu Piaget)"
    ],
    "quelle": "MAL1-1 – Fachdidaktik: Begriffsbildung, Bildungsstandards, Zahlenraum",
    "gruppe": "Fachdidaktik",
    "schwerpunkt_name": "Fachdidaktik: Begriffsbildung, Bildungsstandards, Zahlenraum"
  },
  {
    "id": "oral-didaktik-2",
    "schwerpunkt": "didaktik",
    "stufe": "verfahren",
    "frage": "Erläutern Sie an einem konkreten Beispiel die drei Wege der Begriffsbildung (Spezifizieren, Abstrahieren, konstruktiver/operativer Begriffserwerb). Führen Sie insbesondere vor, wie der Begriff \"rechter Winkel\" durch Abstrahieren und durch konstruktiven Begriffserwerb erarbeitet werden kann.",
    "musterantwort": "Spezifizieren geht vom Oberbegriff aus (z. B. aus \"Viereck\" das speziellere \"Quadrat\" gewinnen). Abstrahieren gewinnt den Begriff aus dem Vergleich von Beispielen und Gegenbeispielen: Man stellt \"rechte Winkel\" den \"keinen rechten Winkeln\" gegenüber, die Kinder lösen das gemeinsame Merkmal heraus. Konstruktiver (operativer) Begriffserwerb erarbeitet den Begriff durch eigenes Handeln: einen rechten Winkel durch zweifaches Falten eines Blattes herstellen oder senkrechte Linien mit dem Geodreieck zeichnen. So wird der Begriff aus der Handlung heraus aufgebaut, bevor er benannt wird.",
    "kriterien": [
      "Unterscheidet die drei Wege korrekt und ordnet je ein passendes Beispiel zu",
      "Zeigt Abstrahieren über Beispiel/Gegenbeispiel (rechte vs. keine rechten Winkel)",
      "Zeigt konstruktiven Erwerb über konkrete Handlung (Falten, Geodreieck)",
      "Betont die Fachbegriffsbildung aus der Handlung heraus"
    ],
    "quelle": "MAL1-1 – Fachdidaktik: Begriffsbildung, Bildungsstandards, Zahlenraum",
    "gruppe": "Fachdidaktik",
    "schwerpunkt_name": "Fachdidaktik: Begriffsbildung, Bildungsstandards, Zahlenraum"
  },
  {
    "id": "oral-didaktik-3",
    "schwerpunkt": "didaktik",
    "stufe": "beweis",
    "frage": "Begründen Sie fachdidaktisch, warum Grundschulkinder auf van-Hiele-Niveaustufe 0 die Aussage \"Jedes Quadrat ist ein Rechteck\" typischerweise noch nicht einsehen können. Argumentieren Sie aus den Merkmalen der Niveaustufen heraus.",
    "musterantwort": "Auf Niveaustufe 0 (anschauungsgebundenes Denken) werden Figuren als Ganzheiten/Prototypen wahrgenommen; einzelne Eigenschaften werden noch nicht systematisch betrachtet, und Beziehungen zwischen Figuren sind nicht einsehbar. Eine Klasseninklusion wie \"Quadrat ist Spezialfall des Rechtecks\" setzt aber voraus, dass Figuren über ihre Eigenschaften definiert und diese Eigenschaftsmengen zueinander in Beziehung gesetzt werden (etwa: Rechteck = Viereck mit vier rechten Winkeln; Quadrat erfüllt dies zusätzlich mit gleich langen Seiten). Kinder auf Stufe 0 können z. B. beim Unterscheiden von Quadraten und Rechtecken noch nicht erkennen, dass benachbarte Seiten senkrecht stehen. Da Klasseninklusionen erst ab Niveaustufe 2 zugänglich sind, folgt: Solange die Eigenschaftsanalyse (Stufe 1) und das Beziehungsdenken (Stufe 2) fehlen, ist die Inklusionsaussage kognitiv nicht erreichbar - Quadrat und Rechteck erscheinen als getrennte, sich ausschließende Figurtypen.",
    "kriterien": [
      "Argumentiert aus den Merkmalen von Stufe 0 (Ganzheiten, keine Eigenschaftsbetrachtung)",
      "Verknüpft Klasseninklusion mit der erst ab Niveaustufe 2 möglichen Beziehungsbetrachtung",
      "Führt ein tragendes Beispiel an (benachbarte Seiten senkrecht wird nicht erkannt)",
      "Zieht einen schlüssigen Schluss statt bloßer Aufzählung"
    ],
    "quelle": "MAL1-1 – Fachdidaktik: Begriffsbildung, Bildungsstandards, Zahlenraum",
    "gruppe": "Fachdidaktik",
    "schwerpunkt_name": "Fachdidaktik: Begriffsbildung, Bildungsstandards, Zahlenraum"
  },
  {
    "id": "oral-didaktik-4",
    "schwerpunkt": "didaktik",
    "stufe": "vertiefung",
    "frage": "Wie hängen die vier Stufen des Begriffsverständnisses (intuitiv, inhaltlich, integriert, formal) mit den Niveaustufen des van-Hiele-Modells zusammen, und warum wird das formale Begriffsverständnis in der Grundschule in der Regel nicht erreicht?",
    "musterantwort": "Beide Modelle beschreiben Begriffsbildung als langfristigen, gestuften Prozess. Das intuitive Verständnis (Repräsentanten kennen, Beispiele/Gegenbeispiele finden) entspricht dem anschauungsgebundenen Arbeiten der unteren van-Hiele-Stufen. Das inhaltliche Verständnis (Eigenschaften erfassen und zur Begründung der Zugehörigkeit heranziehen) setzt das Analysieren von Eigenschaften voraus (van-Hiele-Stufe 1). Das integrierte Verständnis (Beziehungen zwischen Eigenschaften, Klasseninklusionen) knüpft an das erste Schließen/Beziehungsdenken (Stufe 2/3) an. Das formale Verständnis fasst den Begriff als formales Objekt in einem Axiomensystem auf; es beruht nicht mehr auf Wahrnehmung und entspricht der strengen abstrakten Geometrie (Stufe 4). Da Grundschulkinder überwiegend auf den Stufen 0-1 arbeiten und formal-axiomatisches Denken erst weit später zugänglich ist, bleibt das formale Begriffsverständnis der Sekundarstufe/Hochschule vorbehalten.",
    "kriterien": [
      "Ordnet die vier Verständnisstufen den van-Hiele-Niveaus nachvollziehbar zu",
      "Charakterisiert das formale Verständnis korrekt (Axiomensystem, nicht wahrnehmungsgebunden)",
      "Begründet die Nicht-Erreichbarkeit in der Grundschule aus dem Entwicklungsstand",
      "Nutzt konsistente Fachsprache und stellt echten Zusammenhang statt bloßer Parallelaufzählung her"
    ],
    "quelle": "MAL1-1 – Fachdidaktik: Begriffsbildung, Bildungsstandards, Zahlenraum",
    "gruppe": "Fachdidaktik",
    "schwerpunkt_name": "Fachdidaktik: Begriffsbildung, Bildungsstandards, Zahlenraum"
  },
  {
    "id": "oral-didaktik-5",
    "schwerpunkt": "didaktik",
    "stufe": "didaktik",
    "frage": "Wie würden Sie die geometrischen Grundformen (Dreieck, Viereck, Kreis) in einer ersten Klasse einführen? Gehen Sie auf geeignete Handlungserfahrungen, den Weg von der Umgangs- zur Fachsprache und auf einen typischen Schülerfehler ein.",
    "musterantwort": "Die Einführung erfolgt handlungsorientiert und anschauungsgebunden (van-Hiele-Stufe 0): Die Kinder legen, stempeln, falten, schneiden, spannen (Geobrett) und zeichnen Dreiecke, Vierecke und Kreise, ordnen und sortieren Figuren, entdecken typische Merkmale und suchen Repräsentanten in ihrer Umgebung. Sprachlich geht man von der Umgangssprache zur Fachsprache: kindgemäße Umschreibungen (\"spitze Ecke\", \"rund\") werden zunächst akzeptiert und schrittweise zu Fachbegriffen weiterentwickelt, die aus den Handlungen heraus eingeführt werden. Ein typischer Schülerfehler ist das prototypische Denken: Kinder erkennen nur die \"Standardlage\" (z. B. das auf einer Seite stehende, gleichseitig wirkende Dreieck) als Dreieck an und lehnen gedrehte, sehr spitze oder \"schiefe\" Exemplare ab. Dem begegnet man durch Variieren der Beispiele (Lage, Größe, Form) und durch systematische Beispiel-Gegenbeispiel-Angebote.",
    "kriterien": [
      "Nennt konkrete Handlungserfahrungen (legen, falten, spannen, zeichnen, sortieren)",
      "Beschreibt den Weg von der Umgangs- zur Fachsprache (Umschreibungen akzeptieren, Begriffe aus Handlung)",
      "Benennt einen realistischen Schülerfehler (Prototyp-/Standardlagen-Denken) mit Gegenmaßnahme",
      "Ordnet das Vorgehen adressatengerecht der Niveaustufe 0 zu"
    ],
    "quelle": "MAL1-1 – Fachdidaktik: Begriffsbildung, Bildungsstandards, Zahlenraum",
    "gruppe": "Fachdidaktik",
    "schwerpunkt_name": "Fachdidaktik: Begriffsbildung, Bildungsstandards, Zahlenraum"
  }
] };
