-- Create profiles storage bucket (idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('profiles', 'profiles', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for users to manage their own files in the profiles bucket
CREATE POLICY "Users can view their own profile images"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'profiles' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload their own profile images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'profiles' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own profile images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'profiles' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own profile images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'profiles' AND auth.uid()::text = (storage.foldername(name))[1]
);