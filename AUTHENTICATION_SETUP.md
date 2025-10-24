# Authentication Setup Guide

This application now includes user authentication and authorization. Each user can only see and manage their own purchases.

## What's Implemented

✅ **User Authentication**
- Email/password sign up
- Email/password sign in
- Secure logout
- Session management

✅ **Authorization**
- Row Level Security (RLS) policies
- Users can only access their own data
- Automatic user_id filtering on all operations

✅ **Protected Routes**
- Automatic redirect to login if not authenticated
- Middleware-based route protection
- API route authentication checks

## Database Migration Required

Before authentication will work, you **MUST** run the authentication migration in your Supabase database.

### Step 1: Run the Migration SQL

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click "New query"
4. Copy and paste the contents of `supabase/migration_add_auth.sql`
5. Click "Run" or press `Ctrl+Enter`

The migration will:
- Add `user_id` column to the purchases table
- Create indexes for better performance
- Update RLS policies to be user-specific
- Drop the old permissive policy

### Step 2: Enable Email Auth in Supabase (If Not Already Enabled)

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Ensure **Email** is enabled
3. Configure email settings:
   - **Enable email confirmations**: Optional (recommended for production)
   - **Secure email change**: Recommended
   - **Secure password change**: Recommended

### Step 3: (Optional) Customize Email Templates

1. Go to **Authentication** → **Email Templates**
2. Customize the following templates:
   - Confirmation email
   - Password reset
   - Email change confirmation

## Using the Application

### Sign Up

1. Visit your deployed app
2. Click "Sign up" on the login page
3. Enter your email and password (min 6 characters)
4. Confirm password
5. Click "Sign up"
6. You'll be automatically logged in and redirected to the home page

### Sign In

1. Visit your deployed app
2. Enter your email and password
3. Click "Sign in"
4. You'll be redirected to the home page

### Logout

1. Click the "Logout" button in the top right corner
2. You'll be redirected to the login page

## Security Features

### Row Level Security (RLS)

All data access is protected by PostgreSQL Row Level Security policies:

```sql
-- Users can only view their own purchases
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
```

### API Route Protection

All API routes check for authentication:
- `/api/purchases` - GET and POST require auth
- `/api/purchases/[id]` - GET, PUT, DELETE require auth

### Middleware Protection

Next.js middleware automatically:
- Redirects unauthenticated users to `/login`
- Redirects authenticated users away from `/login` and `/signup`
- Refreshes expired sessions
- Manages auth cookies securely

## Development vs Production

### Development

For local development:
1. Ensure `.env.local` has your Supabase credentials
2. Run the migration in your Supabase project
3. Start the dev server: `npm run dev`

### Production (Vercel)

For production deployment:
1. Ensure environment variables are set in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Run the migration in your production Supabase project
3. Deploy or redeploy your application
4. Users can now sign up and use the app

## Multi-User Scenarios

### Adding Multiple Users

1. Share the app URL with your users
2. Each user signs up with their own email/password
3. Each user only sees their own purchases
4. Data is completely isolated between users

### User Management

Admins can manage users in Supabase:
1. Go to **Authentication** → **Users**
2. View all registered users
3. Delete users if needed
4. Reset passwords manually

## Troubleshooting

### "Unauthorized" errors
- Ensure you're logged in
- Check that the migration was run successfully
- Verify environment variables are correct

### Can't sign up
- Check Supabase dashboard for error logs
- Ensure email provider is enabled
- Check password meets minimum requirements (6 chars)

### Can't see purchases
- Ensure you're logged in as the correct user
- Check that purchases have the correct `user_id`
- Verify RLS policies are active

### Session expired
- Simply log in again
- Sessions are automatically refreshed by middleware

## Technical Architecture

### Client Components
- `/app/login/page.tsx` - Login form
- `/app/signup/page.tsx` - Signup form
- `/app/page.tsx` - Main app (protected)

### Server Components
- `/lib/supabase-server.ts` - Server-side Supabase client
- `/lib/supabase-browser.ts` - Client-side Supabase client
- `/middleware.ts` - Auth middleware

### API Routes
- All routes in `/app/api/purchases/` use server-side auth

### Database
- RLS policies enforce user isolation
- `user_id` column links purchases to users

## Best Practices

1. **Never share credentials** - Each user should have their own account
2. **Use strong passwords** - Minimum 6 characters, recommend 12+
3. **Regular backups** - Supabase handles this automatically
4. **Monitor usage** - Check Supabase dashboard for activity
5. **Email confirmations** - Enable in production for security

## Next Steps

After setting up authentication, you might want to:
- Add password reset functionality
- Implement email confirmation
- Add user profiles
- Enable social auth (Google, GitHub, etc.)
- Add role-based access control (admin users)

All of these features are available in Supabase Auth and can be easily integrated.
