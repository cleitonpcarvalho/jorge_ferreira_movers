create table if not exists admin_users (
  id serial primary key,
  email text unique not null,
  password text not null,
  name text,
  created_at timestamptz default now()
);

create table if not exists site_settings (
  id serial primary key,
  key text unique not null,
  value text,
  label text,
  type text default 'text',
  group_name text
);

create table if not exists pages (
  id serial primary key,
  slug text unique not null,
  title text,
  description text,
  order_num integer default 99,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table pages add column if not exists order_num integer default 99;

create table if not exists sections (
  id serial primary key,
  page_id integer references pages(id) on delete cascade,
  slug text,
  title text,
  content jsonb default '{}',
  order_num integer,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists media (
  id serial primary key,
  filename text,
  original_name text,
  mime_type text,
  size_bytes integer,
  url text,
  alt_text text,
  category text,
  tags text[],
  created_at timestamptz default now()
);
