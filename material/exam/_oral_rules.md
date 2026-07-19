# Aufgabe: Offene Prüfungsfragen für eine MÜNDLICHE Prüfung (Kassel L1 Mathematik, PO 2014, Modul MAL1-1) autoren

Du bekommst EINEN Schwerpunkt (Name + Gruppe) und eine Grounding-Datei
`material/exam/_ground_<key>.json` = Liste `{ "q": <MC-Frage>, "e": <Erklärung> }` aus dem
vorhandenen Katalog. Nutze sie als fachliche Basis — erfinde nichts Fachfremdes.

Schreibe **genau 5 offene Prüfungsfragen** zu diesem Schwerpunkt, je eine der Stufen (in dieser Reihenfolge):
1. `definition`  — Grundbegriff/Definition erklären lassen ("Was versteht man unter …? Definieren Sie …").
2. `verfahren`   — ein Verfahren/Beispiel durchführen/erläutern lassen ("Führen Sie … durch", "Erklären Sie an einem Beispiel …").
3. `beweis`      — begründen/beweisen lassen ("Begründen/Beweisen Sie …", "Warum gilt …?"). PFLICHT: echte Beweis-/Begründungsfrage.
4. `vertiefung`  — vertiefende Nachfrage/Zusammenhang ("Wie hängt … mit … zusammen?", Grenzfälle, Verallgemeinerung).
5. `didaktik`    — Transfer in die Primarstufe ("Wie führen Sie … in der Grundschule ein?", typische Schülerfehler, geeignete Veranschaulichung).

## Regeln
- **Offen, mündlich beantwortbar** — KEINE Multiple-Choice-Optionen, keine Verweise auf Folien/Aufgabenblätter.
- Jede Frage ist **eigenständig** verständlich; fachlich korrekt; Niveau 1. Staatsexamen Grundschule.
- `musterantwort`: knappe, prüfungsnahe Musterlösung (2–5 Sätze; bei Beweis die tragende Beweisidee).
- `kriterien`: 2–4 kurze Bewertungs-Checkpunkte (woran der Prüfer eine gute Antwort erkennt), orientiert an den
  MAL1-1-Kompetenzen (Fachsprache, Begründung/Beweis, Beispiel, adressatengerechte/didaktische Einordnung).
- Deutsch, mathematische Notation beibehalten.

## Ausgabe
Schreibe GENAU eine JSON-Datei (Array mit 5 Objekten) an den genannten Ausgabepfad:
```json
[{"id":"oral-<key>-1","schwerpunkt":"<key>","stufe":"definition","frage":"…","musterantwort":"…","kriterien":["…","…"],"quelle":"MAL1-1 – <SchwerpunktName>"}, … 5 Objekte …]
```
Danach nur eine Zeile: `FERTIG: 5 Fragen (<key>)`.
