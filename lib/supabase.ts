import { createBrowserClient } from '@supabase/ssr'

/*
-- Run this in your Supabase SQL editor

create table community_blocks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  author_id uuid references auth.users(id) on delete cascade,
  author_username text not null,
  author_avatar text,
  title text not null,
  category text not null check (category in ('essentials','setup','project','community','profile','other')),
  content text not null,
  description text,
  votes int default 0,
  forks int default 0,
  is_flagged boolean default false
);

create table block_votes (
  user_id uuid references auth.users(id) on delete cascade,
  block_id uuid references community_blocks(id) on delete cascade,
  primary key (user_id, block_id)
);

create table block_comments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  block_id uuid references community_blocks(id) on delete cascade,
  author_id uuid references auth.users(id) on delete cascade,
  author_username text not null,
  author_avatar text,
  content text not null
);

create table profile_templates (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  author_id uuid references auth.users(id) on delete cascade,
  author_username text not null,
  author_avatar text,
  title text not null,
  style text not null check (style in ('developer','designer','student','minimal','creative','data-scientist')),
  preview_image text,
  content text not null,
  votes int default 0
);

create table template_votes (
  user_id uuid references auth.users(id) on delete cascade,
  template_id uuid references profile_templates(id) on delete cascade,
  primary key (user_id, template_id)
);

-- Enable Row Level Security
alter table community_blocks enable row level security;
alter table block_votes enable row level security;
alter table block_comments enable row level security;
alter table profile_templates enable row level security;
alter table template_votes enable row level security;

-- Policies: anyone can read, authenticated users can write their own
create policy "Public read" on community_blocks for select using (true);
create policy "Auth insert" on community_blocks for insert with check (auth.uid() = author_id);
create policy "Own delete" on community_blocks for delete using (auth.uid() = author_id);

create policy "Public read" on block_comments for select using (true);
create policy "Auth insert" on block_comments for insert with check (auth.uid() = author_id);
create policy "Own delete" on block_comments for delete using (auth.uid() = author_id);

create policy "Public read" on block_votes for select using (true);
create policy "Auth insert" on block_votes for insert with check (auth.uid() = user_id);
create policy "Own delete" on block_votes for delete using (auth.uid() = user_id);

create policy "Public read" on profile_templates for select using (true);
create policy "Auth insert" on profile_templates for insert with check (auth.uid() = author_id);

create policy "Public read" on template_votes for select using (true);
create policy "Auth insert" on template_votes for insert with check (auth.uid() = user_id);
create policy "Own delete" on template_votes for delete using (auth.uid() = user_id);
*/

// Use safe fallbacks so the client doesn't throw during build when real env vars aren't set yet
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const supabaseUrl = rawUrl.startsWith('http') ? rawUrl : 'https://placeholder.supabase.co'
const supabaseKey = rawKey.length > 10 ? rawKey : 'placeholder-anon-key'

export const supabase = createBrowserClient(supabaseUrl, supabaseKey)
