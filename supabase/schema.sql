-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date_of_purchase DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on date_of_purchase for faster queries
CREATE INDEX IF NOT EXISTS idx_purchases_date ON purchases(date_of_purchase DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for demo purposes)
-- In production, you should restrict this based on user authentication
CREATE POLICY "Allow all operations on purchases" ON purchases
  FOR ALL
  USING (true)
  WITH CHECK (true);
