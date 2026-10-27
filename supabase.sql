-- The Mixtape: a public playlist anyone can read and add to, but nobody can edit or delete.
create table if not exists public.mixtape (
  id bigint generated always as identity primary key,
  song text not null check (char_length(song) between 1 and 80),
  artist text not null check (char_length(artist) between 1 and 60),
  note text check (note is null or char_length(note) <= 140),
  name text check (name is null or char_length(name) <= 30),
  created_at timestamptz not null default now()
);

alter table public.mixtape enable row level security;

drop policy if exists "Anyone can read the mixtape" on public.mixtape;
create policy "Anyone can read the mixtape" on public.mixtape
  for select to anon, authenticated using (true);

drop policy if exists "Anyone can add a song" on public.mixtape;
create policy "Anyone can add a song" on public.mixtape
  for insert to anon, authenticated with check (true);

-- No update or delete policies, so those are blocked for everyone using the public key.

-- Simple spam guard: at most 30 new songs per 10 minutes across the whole site.
create or replace function public.mixtape_rate_limit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.mixtape where created_at > now() - interval '10 minutes') >= 30 then
    raise exception 'The Mixtape is busy, try again in a few minutes';
  end if;
  return new;
end $$;

drop trigger if exists mixtape_rate_limit on public.mixtape;
create trigger mixtape_rate_limit before insert on public.mixtape
  for each row execute function public.mixtape_rate_limit();
