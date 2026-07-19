-- =====================================================================
-- Cloud-Sync – Basis-Setup (im Supabase SQL Editor ausführen)
-- ---------------------------------------------------------------------
-- Legt die Fortschritts-Tabelle an und die beiden Funktionen, die die App
-- (js/sync.js) per anon-Key aufruft: sync_pull / sync_push.
-- Idempotent: gefahrlos wiederholbar (create if not exists / or replace).
--
-- Diese Datei ist der EINZIGE Pflicht-Schritt für den Lernfortschritt-Sync.
-- Reihenfolge & Gesamtbild: siehe supabase/README.md.
-- =====================================================================

-- 1) Tabelle: ein Datensatz je geheimem Sync-Code (in der App erzeugt).
create table if not exists public.progress (
  code       text primary key,           -- geheimer Sync-Code (19 Zeichen, z. B. ADT-XXXXX-XXXXX-XXXXX)
  data       jsonb not null,             -- kompletter Lernfortschritt (perQuestion, xp, streak, badges, …)
  updated_at timestamptz not null default now()
);

-- Kein Direktzugriff über die REST-Tabelle: nur über die Funktionen unten.
-- RLS an + KEINE Policy => Tabelle ist per anon-/authenticated-Key nicht direkt les-/schreibbar.
alter table public.progress enable row level security;

-- 2) Lesen: Fortschritt zu einem Code holen (Code-Länge prüfen).
create or replace function public.sync_pull(p_code text)
returns jsonb language plpgsql security definer set search_path = public as $$
begin
  if p_code is null or length(p_code) < 16 or length(p_code) > 64 then
    raise exception 'invalid code';
  end if;
  return (select data from public.progress where code = p_code);
end;
$$;

-- 3) Schreiben: Fortschritt speichern/aktualisieren (Code-Länge + max. ~200 KB).
create or replace function public.sync_push(p_code text, p_data jsonb)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_code is null or length(p_code) < 16 or length(p_code) > 64 then
    raise exception 'invalid code';
  end if;
  if pg_column_size(p_data) > 200000 then
    raise exception 'payload too large';
  end if;
  insert into public.progress(code, data, updated_at)
  values (p_code, p_data, now())
  on conflict (code) do update set data = excluded.data, updated_at = now();
end;
$$;

-- 4) Ausführungsrechte für den öffentlichen anon-Key (die App nutzt nur diesen).
--    security definer sorgt dafür, dass die Funktionen trotz RLS auf progress zugreifen dürfen.
grant execute on function public.sync_pull(text)         to anon;
grant execute on function public.sync_push(text, jsonb)  to anon;

-- Hinweis: Die App erzeugt Sync-Codes mit 19 Zeichen (>= 16), die Längenprüfung
-- greift also nur gegen offensichtlichen Missbrauch, nicht bei echten Codes.
