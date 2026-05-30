create extension if not exists "pgcrypto";
create extension if not exists "citext";

create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email citext unique,
  wallet_address citext unique,
  auth_method text not null check (auth_method in ('wallet', 'email')),
  username text not null unique check (username ~ '^[a-zA-Z0-9_]{3,32}$'),
  display_name text,
  avatar_url text,
  university text,
  faculty text,
  course text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.users (id) on delete cascade,
  author_username text not null,
  title text not null check (char_length(title) between 3 and 140),
  description text not null check (char_length(description) between 1 and 4000),
  subject text not null check (subject in ('math', 'physics', 'chemistry', 'programming', 'biology', 'general')),
  visibility text not null default 'public' check (visibility in ('public')),
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  vote_score integer not null default 0,
  comment_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.post_files (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  storage_provider text not null default 'ipfs' check (storage_provider in ('ipfs')),
  ipfs_cid text not null check (char_length(ipfs_cid) between 20 and 120),
  gateway_url text,
  file_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  display_order integer not null default 0 check (display_order >= 0),
  created_at timestamptz not null default now()
);

create table public.votes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  vote_value smallint not null check (vote_value in (-1, 1)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (post_id, user_id)
);

create table public.saved_posts (
  user_id uuid not null references public.users (id) on delete cascade,
  post_id uuid not null references public.posts (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, post_id)
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  author_username text not null,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index users_wallet_address_idx on public.users (wallet_address);
create index users_username_idx on public.users (username);

create index posts_feed_idx on public.posts (status, visibility, created_at desc);
create index posts_author_idx on public.posts (author_id, created_at desc);
create index posts_subject_idx on public.posts (subject, created_at desc);

create index post_files_post_idx on public.post_files (post_id, display_order);
create index post_files_ipfs_cid_idx on public.post_files (ipfs_cid);

create index votes_post_idx on public.votes (post_id);
create index votes_user_idx on public.votes (user_id);

create index saved_posts_user_idx on public.saved_posts (user_id, created_at desc);
create index comments_post_idx on public.comments (post_id, created_at asc) where deleted_at is null;
create index comments_user_idx on public.comments (user_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_users_updated_at
before update on public.users
for each row execute function public.set_updated_at();

create trigger set_posts_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

create trigger set_votes_updated_at
before update on public.votes
for each row execute function public.set_updated_at();

create trigger set_comments_updated_at
before update on public.comments
for each row execute function public.set_updated_at();

create or replace function public.apply_vote_score_delta(target_post_id uuid, score_delta integer)
returns void
language sql
set search_path = public
as $$
  update public.posts
  set vote_score = vote_score + score_delta,
      updated_at = now()
  where id = target_post_id;
$$;

create or replace function public.sync_post_vote_score()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    perform public.apply_vote_score_delta(new.post_id, new.vote_value);
    return new;
  end if;

  if tg_op = 'UPDATE' then
    if new.vote_value <> old.vote_value then
      perform public.apply_vote_score_delta(new.post_id, new.vote_value - old.vote_value);
    end if;
    return new;
  end if;

  perform public.apply_vote_score_delta(old.post_id, -old.vote_value);
  return old;
end;
$$;

create trigger sync_post_vote_score
after insert or update or delete on public.votes
for each row execute function public.sync_post_vote_score();

create or replace function public.apply_comment_count_delta(target_post_id uuid, count_delta integer)
returns void
language sql
set search_path = public
as $$
  update public.posts
  set comment_count = greatest(comment_count + count_delta, 0),
      updated_at = now()
  where id = target_post_id;
$$;

create or replace function public.sync_post_comment_count()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    if new.deleted_at is null then
      perform public.apply_comment_count_delta(new.post_id, 1);
    end if;
    return new;
  end if;

  if tg_op = 'UPDATE' then
    if old.deleted_at is null and new.deleted_at is not null then
      perform public.apply_comment_count_delta(new.post_id, -1);
    elsif old.deleted_at is not null and new.deleted_at is null then
      perform public.apply_comment_count_delta(new.post_id, 1);
    end if;
    return new;
  end if;

  if old.deleted_at is null then
    perform public.apply_comment_count_delta(old.post_id, -1);
  end if;
  return old;
end;
$$;

create trigger sync_post_comment_count
after insert or update or delete on public.comments
for each row execute function public.sync_post_comment_count();

alter table public.users enable row level security;
alter table public.posts enable row level security;
alter table public.post_files enable row level security;
alter table public.votes enable row level security;
alter table public.saved_posts enable row level security;
alter table public.comments enable row level security;

create policy "Users can read own profile"
on public.users for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can create own profile"
on public.users for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "Users can update own profile"
on public.users for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Anyone can read published public posts"
on public.posts for select
to anon, authenticated
using (status = 'published' and visibility = 'public');

create policy "Users can create own posts"
on public.posts for insert
to authenticated
with check ((select auth.uid()) = author_id);

create policy "Authors can update own posts"
on public.posts for update
to authenticated
using ((select auth.uid()) = author_id)
with check ((select auth.uid()) = author_id);

create policy "Authors can delete own posts"
on public.posts for delete
to authenticated
using ((select auth.uid()) = author_id);

create policy "Anyone can read files for published posts"
on public.post_files for select
to anon, authenticated
using (
  exists (
    select 1
    from public.posts
    where posts.id = post_files.post_id
      and posts.status = 'published'
      and posts.visibility = 'public'
  )
);

create policy "Authors can add files to own posts"
on public.post_files for insert
to authenticated
with check (
  exists (
    select 1
    from public.posts
    where posts.id = post_files.post_id
      and posts.author_id = (select auth.uid())
  )
);

create policy "Authors can update files on own posts"
on public.post_files for update
to authenticated
using (
  exists (
    select 1
    from public.posts
    where posts.id = post_files.post_id
      and posts.author_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.posts
    where posts.id = post_files.post_id
      and posts.author_id = (select auth.uid())
  )
);

create policy "Authors can delete files on own posts"
on public.post_files for delete
to authenticated
using (
  exists (
    select 1
    from public.posts
    where posts.id = post_files.post_id
      and posts.author_id = (select auth.uid())
  )
);

create policy "Users can read own votes"
on public.votes for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create own votes"
on public.votes for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own votes"
on public.votes for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own votes"
on public.votes for delete
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can read own saved posts"
on public.saved_posts for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can save posts for self"
on public.saved_posts for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can remove own saved posts"
on public.saved_posts for delete
to authenticated
using ((select auth.uid()) = user_id);

create policy "Anyone can read comments on published posts"
on public.comments for select
to anon, authenticated
using (
  deleted_at is null
  and exists (
    select 1
    from public.posts
    where posts.id = comments.post_id
      and posts.status = 'published'
      and posts.visibility = 'public'
  )
);

create policy "Users can create own comments"
on public.comments for insert
to authenticated
with check (
  (select auth.uid()) = user_id
  and exists (
    select 1
    from public.posts
    where posts.id = comments.post_id
      and posts.status = 'published'
      and posts.visibility = 'public'
  )
);

create policy "Users can update own comments"
on public.comments for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own comments"
on public.comments for delete
to authenticated
using ((select auth.uid()) = user_id);
