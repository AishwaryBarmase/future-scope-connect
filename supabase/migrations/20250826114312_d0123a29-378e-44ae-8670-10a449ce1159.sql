-- Create profiles storage bucket (idempotent)
insert into storage.buckets (id, name, public)
values ('profiles', 'profiles', false)
on conflict (id) do nothing;

-- Storage policies for users to manage their own files in the profiles bucket
create policy if not exists "Users can view their own profile images"
on storage.objects
for select
using (
  bucket_id = 'profiles' and auth.uid()::text = (storage.foldername(name))[1]
);

create policy if not exists "Users can upload their own profile images"
on storage.objects
for insert
with check (
  bucket_id = 'profiles' and auth.uid()::text = (storage.foldername(name))[1]
);

create policy if not exists "Users can update their own profile images"
on storage.objects
for update
using (
  bucket_id = 'profiles' and auth.uid()::text = (storage.foldername(name))[1]
);

create policy if not exists "Users can delete their own profile images"
on storage.objects
for delete
using (
  bucket_id = 'profiles' and auth.uid()::text = (storage.foldername(name))[1]
);

-- Ensure a trigger exists to populate public.profiles on signup using the existing function
-- (recreate idempotently)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();