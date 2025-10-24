-- Migration: Add user authentication and authorization
-- This migration adds user_id column and user-specific RLS policies

-- Step 1: Add user_id column to purchases table
ALTER TABLE purchases
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 2: Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);

-- Step 3: Drop the old permissive policy
DROP POLICY IF EXISTS "Allow all operations on purchases" ON purchases;

-- Step 4: Create user-specific RLS policies
-- Users can only see their own purchases
CREATE POLICY "Users can view own purchases" ON purchases
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own purchases
CREATE POLICY "Users can insert own purchases" ON purchases
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own purchases
CREATE POLICY "Users can update own purchases" ON purchases
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own purchases
CREATE POLICY "Users can delete own purchases" ON purchases
  FOR DELETE
  USING (auth.uid() = user_id);

-- Step 5: Make user_id NOT NULL for new rows (existing rows can be null for migration)
-- Note: After migration, you should update existing rows with a user_id if any exist
-- ALTER TABLE purchases ALTER COLUMN user_id SET NOT NULL;
