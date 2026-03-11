-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pickup TEXT NOT NULL,
  destination TEXT NOT NULL,
  booking_date TEXT NOT NULL,
  booking_time TEXT NOT NULL,
  passengers INTEGER NOT NULL DEFAULT 1,
  luggage INTEGER NOT NULL DEFAULT 0,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public booking form)
CREATE POLICY "Anyone can create a booking" ON public.bookings
  FOR INSERT WITH CHECK (true);

-- No public read access
CREATE POLICY "No public read" ON public.bookings
  FOR SELECT USING (false);