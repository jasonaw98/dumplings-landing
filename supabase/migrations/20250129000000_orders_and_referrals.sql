-- Orders: sales records with payment status and optional referral code
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  full_name text not null,
  email text not null,
  phone text,
  address text not null,
  city text not null,
  zip text not null,
  items jsonb not null default '[]',
  total_price numeric(10, 2) not null,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'verified', 'failed')),
  referral_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Referral codes: valid codes you can give to customers (e.g. FRIEND10, INSTA5)
create table if not exists public.referral_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text,
  full_name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

-- Index for listing orders by date and payment status
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_payment_status_idx on public.orders (payment_status);
create index if not exists orders_referral_code_idx on public.orders (referral_code) where referral_code is not null;

-- Optional: trigger to keep updated_at in sync
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- RLS: allow service role full access; optionally restrict anon/authenticated
alter table public.orders enable row level security;
alter table public.referral_codes enable row level security;

-- Service role bypasses RLS. For extra safety you can add policies, e.g.:
-- create policy "Service role can do all" on public.orders for all using (true);
-- (Usually service role already bypasses RLS.)

comment on table public.orders is 'Sales orders with payment status and optional referral code';
comment on table public.referral_codes is 'Valid referral codes for tracking';
