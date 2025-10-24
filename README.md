# Purchase Tracker

A Next.js application to track your purchases and monitor how long you've owned them.

## Features

- **User Authentication**: Secure sign up and login with email/password
- **Multi-User Support**: Each user has their own private purchase list
- **Add Purchase**: Create new purchase records with item name, amount, and date of purchase
- **View Purchase**: Click on any purchase row to see detailed information
- **Edit Purchase**: Update existing purchase details
- **Delete Purchase**: Remove purchases from your list
- **Duration Tracking**: Automatically calculates and displays the age of each item in years, months, and days format
- **Data Isolation**: Users can only see and manage their own purchases

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL database + Authentication)
- Row Level Security (RLS) for data isolation
- Deployed on Vercel

## Live Demo

**[https://purchase-tracker-sand.vercel.app/](https://purchase-tracker-sand.vercel.app/)**

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A free Supabase account ([supabase.com](https://supabase.com))

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase database:
   - Follow the complete setup guide in **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**
   - Create a Supabase project
   - Run the SQL schema
   - Get your API credentials

3. Set up authentication:
   - Follow the authentication guide in **[AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md)**
   - Run the authentication migration SQL
   - Enable email authentication in Supabase

4. Create a `.env.local` file in the project root:
```bash
cp .env.local.example .env.local
```

5. Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

8. Sign up with your email and password to start using the app

## Usage

### First Time Setup

1. Visit the app URL
2. Click "Sign up" to create an account
3. Enter your email and password (minimum 6 characters)
4. You'll be automatically logged in after sign up

### Logging In

1. Visit the app URL
2. Enter your email and password
3. Click "Sign in"

### Adding a Purchase

1. Click the "Add Purchase" button
2. Fill in the form:
   - **Item Name**: Name of the purchased item
   - **Amount**: Purchase price
   - **Date of Purchase**: When you bought the item
3. Click "Create"

### Viewing a Purchase

- Click on any row in the table to view detailed information about that purchase

### Editing a Purchase

1. Click the "Edit" button on the purchase row
2. Modify the details in the form
3. Click "Update"

### Deleting a Purchase

1. Click the "Delete" button on the purchase row
2. Confirm the deletion

## Data Storage

All purchase data is stored in a **Supabase PostgreSQL database**, providing:
- ✅ Persistent storage (data survives deployments)
- ✅ Automatic backups
- ✅ Scalability
- ✅ Real-time capabilities

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for setup instructions.

## Project Structure

```
age-of-materials/
├── app/
│   ├── api/
│   │   └── purchases/          # API routes for CRUD operations
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main page with purchase list
│   └── globals.css             # Global styles
├── components/
│   ├── PurchaseForm.tsx        # Form for add/edit
│   └── PurchaseModal.tsx       # Modal for viewing details
├── lib/
│   ├── duration.ts             # Duration calculation utilities
│   └── supabase.ts             # Supabase client configuration
├── types/
│   └── purchase.ts             # TypeScript interfaces
├── supabase/
│   ├── schema.sql              # Database schema
│   └── migration_add_auth.sql  # Authentication migration
├── SUPABASE_SETUP.md           # Supabase setup guide
├── AUTHENTICATION_SETUP.md     # Authentication setup guide
└── .env.local.example          # Environment variables template
```

## Duration Calculation

The duration (age of item) is calculated as the difference between the current date and the purchase date, displayed in:
- Years
- Months
- Days

Example: "2 years, 3 months, 15 days"

## License

MIT
