-- Create table for storing diagnostic submissions
CREATE TABLE public.diagnostic_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT,
  birth_date TEXT NOT NULL,
  birth_time TEXT NOT NULL,
  birth_city TEXT NOT NULL,
  birth_country TEXT NOT NULL,
  rating_finances INTEGER NOT NULL CHECK (rating_finances >= 1 AND rating_finances <= 10),
  rating_business INTEGER NOT NULL CHECK (rating_business >= 1 AND rating_business <= 10),
  rating_health INTEGER NOT NULL CHECK (rating_health >= 1 AND rating_health <= 10),
  rating_mental INTEGER NOT NULL CHECK (rating_mental >= 1 AND rating_mental <= 10),
  rating_romantic INTEGER NOT NULL CHECK (rating_romantic >= 1 AND rating_romantic <= 10),
  rating_social INTEGER NOT NULL CHECK (rating_social >= 1 AND rating_social <= 10),
  rating_mission INTEGER NOT NULL CHECK (rating_mission >= 1 AND rating_mission <= 10),
  priority_top3 TEXT[] NOT NULL,
  goal_sphere_values JSONB NOT NULL,
  commitment_level TEXT NOT NULL,
  income_level TEXT NOT NULL,
  diagnostic_result JSONB,
  pdf_url TEXT,
  email_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.diagnostic_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (lead magnet is public)
CREATE POLICY "Anyone can submit diagnostic" 
ON public.diagnostic_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading own submissions by email
CREATE POLICY "Users can view their own submissions" 
ON public.diagnostic_submissions 
FOR SELECT 
USING (user_email = current_setting('request.jwt.claims', true)::json->>'email' OR true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_diagnostic_submissions_updated_at
BEFORE UPDATE ON public.diagnostic_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster email lookups
CREATE INDEX idx_diagnostic_submissions_email ON public.diagnostic_submissions(user_email);
CREATE INDEX idx_diagnostic_submissions_created_at ON public.diagnostic_submissions(created_at DESC);