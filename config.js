/*
 * Konfiguration – Mathematik für Lehramt (Lern-App)
 * ------------------------------------------------------------------
 * Öffentliche App, ohne Geheimhaltung. Cloud-Sync (Supabase) ist optional:
 * trage die zwei Werte deines kostenlosen Supabase-Projekts ein, damit der
 * Lernfortschritt geräteübergreifend synchronisiert. Anleitung: README.md.
 * Beide Werte dürfen öffentlich sein. Leer lassen = App läuft normal, nur lokal.
 */
window.ADT_CONFIG = {
  supabaseUrl: "",
  supabaseAnonKey: "",

  // Öffentlicher VAPID-Schlüssel für Web-Push-Erinnerungen (optional; darf öffentlich sein).
  // Der PRIVATE Schlüssel gehört NUR in die Supabase Edge Function – nie hierher!
  vapidPublicKey: "",

  // Zugangsschutz für die Lerninhalte.
  //  false = Inhalte liegen offen in data/questions.js (dieser öffentliche Fall).
  //  true  = Inhalte kämen serverseitig geprüft aus Supabase. Für dieses Projekt NICHT nötig.
  contentGated: false,
};
