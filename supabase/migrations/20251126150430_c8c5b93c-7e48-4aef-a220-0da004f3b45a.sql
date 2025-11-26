-- Create storage bucket for order documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('order-documents', 'order-documents', false);

-- Create documents table
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  master_order_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create policies for documents
CREATE POLICY "Users can view documents"
ON public.documents
FOR SELECT
USING (true);

CREATE POLICY "Users can upload documents"
ON public.documents
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can delete their own documents"
ON public.documents
FOR DELETE
USING (uploaded_by = auth.uid());

-- Storage policies for order documents
CREATE POLICY "Users can view order documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'order-documents');

CREATE POLICY "Users can upload order documents"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'order-documents');

CREATE POLICY "Users can delete their own order documents"
ON storage.objects
FOR DELETE
USING (bucket_id = 'order-documents' AND auth.uid()::text = (storage.foldername(name))[1]);