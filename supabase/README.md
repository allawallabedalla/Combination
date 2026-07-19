# Supabase-Backend – Einrichtung

Die App läuft **komplett ohne Supabase** (offline, lokal in `localStorage`).
Supabase ist nur nötig für **zwei optionale Zusatzfunktionen**:

1. **Cloud-Sync** des Lernfortschritts über mehrere Geräte (per geheimem Sync-Code).
2. **Lern-Erinnerungen** per Web-Push (tägliche Benachrichtigung).

Beide sind unabhängig – du kannst nur (1), nur (2) oder beides einrichten.
Alle Werte in `config.js` dürfen **öffentlich** sein (nur der anon-Key). Der
**private** VAPID-Schlüssel und das Cron-Geheimnis gehören **ausschließlich** in die
Edge-Function-Secrets, nie in `config.js` oder ins Repo.

---

## Voraussetzung: kostenloses Supabase-Projekt

1. Auf <https://supabase.com> ein Projekt anlegen (Free-Tier genügt).
2. **Project Settings → API** öffnen und notieren:
   - **Project URL** → `config.js` → `supabaseUrl`
   - **anon public key** → `config.js` → `supabaseAnonKey`
3. In `config.js` eintragen, committen/deployen. Fertig ist die Grundverbindung.

> Neuere Projekte zeigen ggf. Schlüssel im Format `sb_publishable_…`. Die App
> kommt damit klar (sie sendet sie nur als `apikey`-Header, nicht als Bearer-Token).

---

## 1) Cloud-Sync einrichten (Pflicht-Datei: `sync-setup.sql`)

**Dashboard → SQL Editor → New query →** Inhalt von [`sync-setup.sql`](./sync-setup.sql)
einfügen → **Run**. Das legt an:

- Tabelle `public.progress` (ein Datensatz je Sync-Code),
- Funktionen `sync_pull(code)` / `sync_push(code, data)` (von `js/sync.js` aufgerufen),
- die nötigen `grant execute … to anon`-Rechte,
- RLS auf `progress` **ohne** Policy → kein Direktzugriff, nur über die Funktionen.

Das ist **alles**, was der Sync braucht. In der App dann unter *Einstellungen →
Cloud-Sync* einen Code erzeugen und auf dem Zweitgerät denselben Code eingeben.

> `sync-hardening.sql` enthält dieselben (gehärteten) Sync-Funktionen und ist nach
> `sync-setup.sql` **nicht mehr nötig**. Es bleibt nur für die gehärtete `push_save`
> (Größenlimit) der Reminders relevant.

---

## 2) Lern-Erinnerungen einrichten (optional)

### a) Datenbank
**SQL Editor →** Inhalt von [`reminders-setup.sql`](./reminders-setup.sql) ausführen.
Legt die Tabelle `push_subscriptions` und die Funktionen `push_save` / `push_remove`
an (per anon-Key aufrufbar).

### b) VAPID-Schlüsselpaar erzeugen
```bash
npx web-push generate-vapid-keys
```
- **Public Key** → `config.js` → `vapidPublicKey` (darf öffentlich sein).
- **Private Key** → nur als Edge-Function-Secret (siehe unten), **niemals** ins Repo.

### c) Edge Function deployen
Code: [`functions/send-reminders/index.ts`](./functions/send-reminders/index.ts).
```bash
supabase functions deploy send-reminders --no-verify-jwt
```
(oder im Dashboard unter **Edge Functions** anlegen und den Code einfügen).

### d) Secrets setzen (Dashboard → Edge Functions → Manage secrets)
| Secret | Wert |
|---|---|
| `VAPID_PUBLIC`  | öffentlicher VAPID-Schlüssel (wie in `config.js`) |
| `VAPID_PRIVATE` | privater VAPID-Schlüssel (**geheim**) |
| `CRON_SECRET`   | frei gewähltes Geheimnis (gleich wie im Cron-Aufruf, siehe e) |
| `VAPID_SUBJECT` | optional, z. B. `mailto:du@example.com` |

`SUPABASE_URL` und `SUPABASE_SERVICE_ROLE_KEY` stellt Supabase automatisch bereit.

### e) Stündlichen Zeitplan aktivieren
**Dashboard → Database → Extensions:** `pg_cron` **und** `pg_net` aktivieren.
Dann im SQL Editor (URL + `CRON_SECRET` anpassen):
```sql
select cron.schedule('adt-reminders-hourly', '0 * * * *', $CRON$
  select net.http_post(
    url     := 'https://DEINPROJEKT.supabase.co/functions/v1/send-reminders',
    headers := jsonb_build_object('Content-Type','application/json','x-cron-secret','DEIN_CRON_SECRET'),
    body    := '{}'::jsonb
  );
$CRON$);
```
Entfernen: `select cron.unschedule('adt-reminders-hourly');`

Die Function prüft je Gerät die eingestellte Stunde/Zeitzone und `last_sent_date`
(kein Mehrfachversand pro Tag). Abgelaufene Abos (404/410) werden automatisch entfernt.

---

## Reihenfolge auf einen Blick

1. Supabase-Projekt anlegen → `supabaseUrl` + `supabaseAnonKey` in `config.js`.
2. `sync-setup.sql` ausführen → **Cloud-Sync läuft**.
3. *(optional Reminders)* `reminders-setup.sql` ausführen → VAPID-Keys erzeugen →
   `vapidPublicKey` in `config.js` → Edge Function deployen → Secrets setzen →
   `pg_cron`/`pg_net` aktivieren → Cron-Job einplanen.

## Sicherheitsmodell (kurz)
- Nur der **anon-Key** liegt öffentlich; er kann ausschließlich die vier
  freigegebenen Funktionen aufrufen (`sync_pull`, `sync_push`, `push_save`, `push_remove`).
- Direkter Tabellenzugriff ist per RLS gesperrt.
- Der Sync-Code ist das einzige „Passwort" für einen Fortschritts-Datensatz – wer ihn
  kennt, sieht den Fortschritt. Er wird kryptografisch zufällig in der App erzeugt und
  nur lokal gespeichert. Kein Personenbezug, keine Anmeldung.
