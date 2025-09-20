-- Create storage bucket for CSV files
INSERT INTO storage.buckets (id, name, public) VALUES ('csv-uploads', 'csv-uploads', false);

-- Create table to store CSV file metadata and processing status
CREATE TABLE public.csv_uploads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processing_status TEXT NOT NULL DEFAULT 'uploaded' CHECK (processing_status IN ('uploaded', 'processing', 'processed', 'error')),
  total_rows INTEGER,
  columns_info JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table to store the actual CSV data for ML models
CREATE TABLE public.ml_training_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  csv_upload_id UUID NOT NULL REFERENCES public.csv_uploads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  row_data JSONB NOT NULL,
  row_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.csv_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_training_data ENABLE ROW LEVEL SECURITY;

-- RLS policies for csv_uploads
CREATE POLICY "Users can view their own CSV uploads" 
ON public.csv_uploads 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own CSV uploads" 
ON public.csv_uploads 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own CSV uploads" 
ON public.csv_uploads 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own CSV uploads" 
ON public.csv_uploads 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for ml_training_data
CREATE POLICY "Users can view their own ML training data" 
ON public.ml_training_data 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ML training data" 
ON public.ml_training_data 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ML training data" 
ON public.ml_training_data 
FOR DELETE 
USING (auth.uid() = user_id);

-- Storage policies for CSV uploads
CREATE POLICY "Users can view their own CSV files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'csv-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own CSV files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'csv-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own CSV files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'csv-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own CSV files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'csv-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create indexes for better performance
CREATE INDEX idx_csv_uploads_user_id ON public.csv_uploads(user_id);
CREATE INDEX idx_csv_uploads_status ON public.csv_uploads(processing_status);
CREATE INDEX idx_ml_training_data_user_id ON public.ml_training_data(user_id);
CREATE INDEX idx_ml_training_data_csv_upload_id ON public.ml_training_data(csv_upload_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on csv_uploads
CREATE TRIGGER update_csv_uploads_updated_at
BEFORE UPDATE ON public.csv_uploads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();