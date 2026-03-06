# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Authentication Setup

This app uses Supabase Auth for scalable user authentication.

1. Install dependencies: `npm install`
2. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Run the app: `npm run dev`

## Message Storage (Supabase)

To share chats across users, create a `messages` table in Supabase and enable realtime:

```sql
create table if not exists public.channels (
  id uuid primary key default gen_random_uuid(),
  server_id text not null,
  name text not null,
  type text not null default 'text',
  created_at timestamptz not null default now()
);

create table if not exists public.server_roles (
  id uuid primary key default gen_random_uuid(),
  server_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'mod', 'member')),
  created_at timestamptz not null default now(),
  unique (server_id, user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  server_id text not null,
  channel_id uuid not null,
  author_id uuid not null,
  author_name text not null,
  content text not null,
  inserted_at timestamptz not null default now()
);

alter table public.channels enable row level security;
alter table public.server_roles enable row level security;
alter table public.messages enable row level security;

create policy "read channels" on public.channels
for select
to authenticated
using (true);

create policy "insert channels" on public.channels
for insert
to authenticated
with check (
  exists (
    select 1
    from public.server_roles
    where server_roles.server_id = channels.server_id
      and server_roles.user_id = auth.uid()
      and server_roles.role in ('owner', 'mod')
  )
);

create policy "update channels" on public.channels
for update
to authenticated
using (
  exists (
    select 1
    from public.server_roles
    where server_roles.server_id = channels.server_id
      and server_roles.user_id = auth.uid()
      and server_roles.role in ('owner', 'mod')
  )
);

create policy "delete channels" on public.channels
for delete
to authenticated
using (
  exists (
    select 1
    from public.server_roles
    where server_roles.server_id = channels.server_id
      and server_roles.user_id = auth.uid()
      and server_roles.role in ('owner', 'mod')
  )
);

create policy "read server roles" on public.server_roles
for select
to authenticated
using (true);

create policy "insert server roles" on public.server_roles
for insert
to authenticated
with check (
  auth.uid() = user_id
  or exists (
    select 1
    from public.server_roles as roles
    where roles.server_id = server_roles.server_id
      and roles.user_id = auth.uid()
      and roles.role in ('owner', 'mod')
  )
);

create policy "update server roles" on public.server_roles
for update
to authenticated
using (
  exists (
    select 1
    from public.server_roles as roles
    where roles.server_id = server_roles.server_id
      and roles.user_id = auth.uid()
      and roles.role in ('owner', 'mod')
  )
);

create policy "delete server roles" on public.server_roles
for delete
to authenticated
using (
  exists (
    select 1
    from public.server_roles as roles
    where roles.server_id = server_roles.server_id
      and roles.user_id = auth.uid()
      and roles.role in ('owner', 'mod')
  )
);

create policy "read messages" on public.messages
for select
to authenticated
using (true);

create policy "insert messages" on public.messages
for insert
to authenticated
with check (auth.uid() = author_id);

create policy "delete messages" on public.messages
for delete
to authenticated
using (
  exists (
    select 1
    from public.server_roles
    where server_roles.server_id = messages.server_id
      and server_roles.user_id = auth.uid()
      and server_roles.role in ('owner', 'mod')
  )
);
```

Then enable realtime for `public.messages` in Supabase (Database → Replication).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
