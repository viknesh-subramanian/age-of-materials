# Fixing Email Confirmation Redirect to Localhost

If email confirmations are redirecting to localhost instead of your production URL, follow these steps:

## Solution 1: Configure Site URL in Supabase (Recommended)

### Step 1: Update Site URL

1. Go to your Supabase project dashboard: [https://app.supabase.com](https://app.supabase.com)
2. Navigate to **Authentication** → **URL Configuration** (left sidebar)
3. Update the following settings:

   **Site URL:**
   ```
   https://purchase-tracker-sand.vercel.app
   ```

   **Redirect URLs (Add these):**
   ```
   https://purchase-tracker-sand.vercel.app/**
   http://localhost:3000/**
   ```

4. Click **Save**

### Step 2: Update Email Templates

1. Go to **Authentication** → **Email Templates**
2. For each template (Confirm signup, Magic Link, etc.), ensure the URL uses `{{ .SiteURL }}` variable
3. Example for "Confirm your signup" template:

```html
<h2>Confirm your signup</h2>

<p>Follow this link to confirm your user:</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup">Confirm your mail</a></p>
```

4. The `{{ .SiteURL }}` will automatically use your configured Site URL

## Solution 2: Disable Email Confirmation (Easier for Small Teams)

If you're working with a small team and don't need email confirmation:

### Step 1: Disable Email Confirmation

1. Go to **Authentication** → **Providers** → **Email**
2. Find "Email confirmation" setting
3. **Toggle OFF** "Enable email confirmations"
4. Click **Save**

### Step 2: Users can now sign up without confirmation

- Users will be immediately logged in after signup
- No email confirmation required
- Perfect for internal team tools

## Solution 3: Add Auth Callback Route (For Production)

Create a callback handler to process email confirmations properly:

### Create the callback route:

Create this file: `app/auth/confirm/route.ts`

```typescript
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash,
    });

    if (!error) {
      // Redirect to home page after successful confirmation
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Redirect to login with error
  return NextResponse.redirect(new URL('/login?error=confirmation_failed', request.url));
}
```

This will properly handle email confirmation links in production.

## Quick Fix Recommendation

**For your use case (small team)**, I recommend:

### Option A: Disable Email Confirmation (Fastest)
1. Go to Supabase → Authentication → Providers → Email
2. Turn OFF "Enable email confirmations"
3. Users can sign up and immediately use the app

### Option B: Configure Site URL (More Secure)
1. Update Site URL to `https://purchase-tracker-sand.vercel.app`
2. Add redirect URLs
3. Keep email confirmation enabled

## Testing

After making changes:

1. **Test Signup:**
   - Go to your production URL
   - Try signing up with a new email
   - Check if you can log in immediately (if confirmation disabled)
   - Or check if confirmation email has correct URL (if enabled)

2. **Test Login:**
   - Ensure existing users can still log in
   - Verify they see their own data

## Current Setup

Your app currently has:
- ✅ Site URL: Needs to be set to production URL
- ✅ Email confirmation: Probably enabled (causing the redirect issue)
- ✅ Auth working: Just needs URL configuration

## Need Help?

If you encounter issues:
1. Check Supabase logs: Authentication → Logs
2. Check browser console for errors
3. Verify environment variables are set in Vercel
4. Ensure the database migration was run

## Recommended Setting for Your App

Since this is a purchase tracker for a few users, I recommend:

**Disable email confirmation** for the easiest setup:
- No email confirmation delays
- Users can start immediately
- Still secure with password requirements
- Can enable later if needed

Would you like me to add the auth callback route to handle confirmations properly, or would you prefer to disable email confirmation for easier onboarding?
