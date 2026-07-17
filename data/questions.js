/*
 * Fragen-Datenbank – Mathematik für Lehramt (Lern-App)
 * ---------------------------------------------------------------
 * Diese Datei enthält die in der App aktiven Fragen. Öffentliche App,
 * ohne Geheimhaltung: die Fragen dürfen direkt hier liegen.
 *
 * HERKUNFT: Der große Katalog entsteht über die Pipeline aus den Roh-PDFs
 * (siehe runbook.md). Ergebnis ist `material/content.json` ({TOPICS, QUESTIONS}).
 * Für die Auslieferung wird dessen Inhalt hier in SAMPLE_TOPICS/SAMPLE_QUESTIONS
 * eingesetzt (Build-Schritt: pipeline → content.json → data/questions.js).
 * Bis dahin dienen die folgenden wenigen Einträge nur als lauffähiges Beispiel.
 *
 * Struktur eines Eintrags:
 *   id, topic, difficulty(1-3), type("single"|"multi"|"numeric"),
 *   question, options[]+correct[] (single/multi) ODER answer/tolerance/unit (numeric),
 *   explanation, source
 */

const SAMPLE_TOPICS = {
  beispiel: { name: "Beispiel (Platzhalter)", icon: "🧮", color: "#5b8def" },
};

const SAMPLE_QUESTIONS = [
  {
    id: "beispiel-001",
    topic: "beispiel",
    difficulty: 1,
    type: "single",
    question: "Platzhalter: Wie viele Elemente hat die leere Menge ∅?",
    options: ["0", "1", "unendlich viele"],
    correct: [0],
    explanation: "Die leere Menge enthält kein Element, also |∅| = 0. 📄 Quelle: Beispiel, Folie 1 (S.1)",
    source: "Beispiel, Folie 1 (S.1, Platzhalter)",
  },
  {
    id: "beispiel-002",
    topic: "beispiel",
    difficulty: 1,
    type: "numeric",
    question: "Platzhalter: Wert der Ableitung f'(x) von f(x)=x² an der Stelle x=3.",
    answer: 6,
    tolerance: 0,
    unit: "",
    explanation: "f'(x)=2x, also f'(3)=6. 📄 Quelle: Beispiel, Folie 2 (S.2)",
    source: "Beispiel, Folie 2 (S.2, Platzhalter)",
  },
];

// Aktive Inhalte auflösen: freigeschaltete (lokal gecachte) Inhalte haben Vorrang,
// sonst die hier eingebetteten. (Der Cache-Mechanismus bleibt erhalten, wird bei
// öffentlicher Nutzung aber nicht benötigt.)
if (typeof window !== "undefined") {
  window.ADT_SAMPLE = { TOPICS: SAMPLE_TOPICS, QUESTIONS: SAMPLE_QUESTIONS };
  var __active = window.ADT_SAMPLE;
  try {
    var __ls = window.localStorage;
    var __raw = __ls && __ls.getItem("adt_content_v1");
    if (__raw) {
      var __g = JSON.parse(__raw);
      if (__g && __g.TOPICS && Array.isArray(__g.QUESTIONS) && __g.QUESTIONS.length) __active = __g;
    }
  } catch (e) {}
  window.TOPICS = __active.TOPICS;
  window.QUESTIONS = __active.QUESTIONS;
}
