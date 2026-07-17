# material/ — Kategorien & finaler Katalog (Phase 3)

Ergebnisartefakte der Themen-Konsolidierung:

- `topic_mapping.json` — roher `topic`-Key → kuratierte Kategorie (100 % Abdeckung).
- `topics_curated.json` — kuratierter Key → `{ name, icon, color, quelle }`.
- `content.json` — finaler Katalog `{ TOPICS, QUESTIONS }`, validiert. Wird in die App
  (`data/questions.js`) übernommen.

Da dieses Projekt **öffentlich** ist, dürfen diese Dateien im Repo liegen (kein
Zugangscode/Gate wie im Vorgänger-Repo). Erzeugung: siehe `runbook.md`, Schritt 6.
