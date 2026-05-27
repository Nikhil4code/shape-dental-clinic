create extension if not exists pgcrypto;

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  phone text not null check (char_length(phone) between 10 and 20),
  email text not null check (char_length(email) <= 120),
  treatment text not null check (
    treatment = any (
      array[
        'General Dentistry',
        'Root Canal Treatment',
        'Teeth Whitening',
        'Dental Fillings',
        'Crowns & Bridges',
        'Dentures',
        'Laser Dentistry',
        'Bleeding Gum Treatment',
        'Oral Surgery'
      ]
    )
  ),
  preferred_date date not null,
  message text check (message is null or char_length(message) <= 600),
  source text not null default 'website',
  status text not null default 'new' check (
    status in ('new', 'contacted', 'confirmed', 'cancelled', 'completed')
  ),
  email_status text not null default 'pending' check (
    email_status in ('pending', 'sent', 'failed')
  ),
  email_error text,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.appointments enable row level security;

revoke all on public.appointments from anon, authenticated;
grant insert, select, update on public.appointments to service_role;

create index if not exists appointments_created_at_idx
  on public.appointments (created_at desc);

create index if not exists appointments_preferred_date_idx
  on public.appointments (preferred_date);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists appointments_set_updated_at on public.appointments;

create trigger appointments_set_updated_at
before update on public.appointments
for each row
execute function public.set_updated_at();

comment on table public.appointments is
  'Website appointment requests for Shape Dental Aesthetics Clinics. No public RLS policies are added; writes must go through the Next.js server route using the Supabase service role key.';
