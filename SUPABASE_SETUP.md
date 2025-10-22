# Supabase Database Setup Guide

This guide will help you set up a free Supabase database for your Purchase Tracker application.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign In"
3. Sign up with your GitHub account (recommended) or email

## Step 2: Create a New Project

1. Click "New Project"
2. Fill in the project details:
   - **Name**: `purchase-tracker` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Select "Free" (includes 500MB database, perfect for this app)
3. Click "Create new project"
4. Wait 2-3 minutes for the project to be provisioned

## Step 3: Create the Database Table

1. In your Supabase project dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy and paste the entire SQL schema from `supabase/schema.sql`:

```sql
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
CREATE POLICY "Allow all operations on purchases" ON purchases
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click "Run" or press `Ctrl+Enter`
5. You should see "Success. No rows returned" - this means the table was created!

## Step 4: Get Your API Credentials

1. In your Supabase project dashboard, click on the **Settings** icon (gear icon, bottom left)
2. Click on **API** in the settings menu
3. You'll see two important values:

   **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - Copy this value

   **anon public** key (a long JWT token)
   - Under "Project API keys", find the "anon" "public" key
   - Click the copy icon to copy it

## Step 5: Configure Local Environment (For Development)

1. In your project root, create a file named `.env.local`
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace the values with your actual credentials from Step 4
4. Save the file

**Important**: `.env.local` is already in `.gitignore` and won't be committed to Git.

## Step 6: Configure Vercel Environment Variables (For Production)

1. Go to your Vercel project dashboard: [https://vercel.com](https://vercel.com)
2. Select your `purchase-tracker` project
3. Go to **Settings** → **Environment Variables**
4. Add the following two environment variables:

   **Variable 1:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase project URL from Step 4
   - Environments: Check all (Production, Preview, Development)

   **Variable 2:**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Your Supabase anon key from Step 4
   - Environments: Check all (Production, Preview, Development)

5. Click "Save" for each variable

## Step 7: Redeploy Your Application

After adding the environment variables to Vercel:

1. Go to your Vercel project's **Deployments** tab
2. Click the "..." menu on the latest deployment
3. Click "Redeploy"
4. Wait for the deployment to complete (~2 minutes)

**Or** simply push a new commit to your GitHub repository and Vercel will automatically redeploy.

## Step 8: Test Your Application

1. Open your deployed application: `https://purchase-tracker-sand.vercel.app/`
2. Try adding a new purchase
3. Edit and delete purchases
4. Refresh the page - your data should persist!

## Verify Database in Supabase

You can view your data in Supabase:

1. Go to your Supabase project dashboard
2. Click on **Table Editor** (left sidebar)
3. Select the `purchases` table
4. You'll see all your purchases stored in the database

## Troubleshooting

### "Missing Supabase environment variables" error

- Make sure you've added the environment variables in Vercel
- Redeploy your application after adding variables
- Check that variable names match exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Data not saving

- Check the browser console for errors (F12 → Console)
- Verify the SQL schema was executed successfully in Supabase
- Make sure RLS (Row Level Security) policies are set up correctly
- Check that your API keys are correct

### "Failed to read purchases" error

- Verify your Supabase project URL and anon key are correct
- Check that the `purchases` table exists in Supabase (Table Editor)
- Ensure the RLS policy is allowing operations

## Database Security Notes

The current setup uses a permissive RLS policy (`USING (true)`) that allows anyone to create, read, update, and delete purchases. This is fine for a personal application, but for a production app with multiple users, you should:

1. Implement user authentication (Supabase Auth)
2. Add user-specific RLS policies
3. Add a `user_id` column to track ownership

## What's Next?

Your Purchase Tracker now has:
- ✅ Persistent data storage (survives deployments)
- ✅ Automatic backups (Supabase handles this)
- ✅ Scalable database (PostgreSQL)
- ✅ Real-time capabilities (if needed in future)

Enjoy tracking your purchases! 🎉
