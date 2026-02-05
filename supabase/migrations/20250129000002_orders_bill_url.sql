-- Add bill_url to link orders to Billplz so the webhook can find the order and send confirmation email
alter table public.orders
  add column if not exists bill_url text;

create index if not exists orders_bill_url_idx on public.orders (bill_url) where bill_url is not null;

comment on column public.orders.bill_url is 'Billplz bill URL for webhook lookup';
