create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  discord_user_id text unique not null,
  username text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists bots (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  price numeric(12,2) not null default 0,
  currency text not null default 'EGP',
  access_mode text not null default 'closed' check (access_mode in ('everyone','authorized','closed','maintenance')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists bot_access (
  id uuid primary key default gen_random_uuid(),
  bot_id uuid not null references bots(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  granted_by uuid references profiles(id),
  status text not null default 'active' check (status in ('active','revoked')),
  granted_at timestamptz not null default now(),
  unique(bot_id,user_id)
);

create table if not exists guilds (
  id uuid primary key default gen_random_uuid(),
  discord_guild_id text unique not null,
  name text not null,
  icon_url text,
  owner_discord_user_id text
);

create table if not exists guild_memberships (
  id uuid primary key default gen_random_uuid(),
  guild_id uuid not null references guilds(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  can_manage boolean not null default false,
  unique(guild_id,user_id)
);

create table if not exists bot_guilds (
  id uuid primary key default gen_random_uuid(),
  bot_id uuid not null references bots(id) on delete cascade,
  guild_id uuid not null references guilds(id) on delete cascade,
  status text not null default 'active' check (status in ('active','disabled')),
  installed_at timestamptz,
  unique(bot_id,guild_id)
);

create table if not exists bot_guild_settings (
  id uuid primary key default gen_random_uuid(),
  bot_id uuid not null references bots(id) on delete cascade,
  guild_id uuid not null references guilds(id) on delete cascade,
  settings jsonb not null default '{}'::jsonb,
  updated_by uuid references profiles(id),
  updated_at timestamptz not null default now(),
  unique(bot_id,guild_id)
);

create table if not exists purchase_requests (
  id uuid primary key default gen_random_uuid(),
  bot_id uuid not null references bots(id),
  user_id uuid not null references profiles(id),
  status text not null default 'pending' check (status in ('pending','approved','rejected','cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_bot_access_user on bot_access(user_id);
create index if not exists idx_settings_lookup on bot_guild_settings(bot_id,guild_id);

alter table profiles enable row level security;
alter table bots enable row level security;
alter table bot_access enable row level security;
alter table guilds enable row level security;
alter table guild_memberships enable row level security;
alter table bot_guilds enable row level security;
alter table bot_guild_settings enable row level security;
alter table purchase_requests enable row level security;

-- Add production RLS policies with the authenticated API layer before launch.
-- Never expose a Supabase service-role key in browser code.