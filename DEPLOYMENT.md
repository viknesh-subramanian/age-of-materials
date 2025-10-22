# Deployment Instructions

## Deploy to Vercel (Recommended - Free)

Vercel is the best option for deploying Next.js applications. It's free and integrates directly with Git.

### Option 1: Deploy via Vercel Website (Easiest - Git Integration)

1. **Push your code to GitHub** (already done ✓)

2. **Go to Vercel:**
   - Visit [https://vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account

3. **Import your repository:**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose your `age-of-materials` repository
   - Select the branch: `claude/purchase-tracker-crud-011CUNPFcdru5JA7EY2gEcv2`

4. **Configure & Deploy:**
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Wait ~2 minutes for deployment

5. **Your app will be live at:**
   - `https://age-of-materials.vercel.app` (or similar)
   - Vercel will provide the exact URL

### Option 2: Deploy via CLI

If you prefer command line deployment:

```bash
# Login to Vercel (will open browser)
vercel login

# Deploy the application
vercel --prod
```

Follow the prompts to link your project.

## Important Notes

### Data Persistence Issue

⚠️ **The current implementation stores data in a JSON file, which will NOT persist on Vercel** because:
- Vercel deployments are stateless
- File system writes are temporary
- Data will reset on each deployment

### Solutions for Production:

1. **Quick Fix - Use Browser Storage:**
   - Move data storage to localStorage (client-side only)
   - No backend needed, but data is per-browser

2. **Database Integration:**
   - Add a database like MongoDB (free tier on MongoDB Atlas)
   - Or use Vercel KV/Postgres
   - Or use Firebase Realtime Database

3. **GitHub as Backend:**
   - Use GitHub API to store data in a JSON file in the repo
   - Requires GitHub token setup

Would you like me to implement any of these solutions?

## Alternative Free Hosting Options

### Netlify
- Similar to Vercel
- Git integration: [https://netlify.com](https://netlify.com)
- Same data persistence limitations

### Cloudflare Pages
- Free tier with good performance
- Git integration: [https://pages.cloudflare.com](https://pages.cloudflare.com)
- Can use Cloudflare D1 (SQLite) for free data storage

## Current Status

Your code is ready to deploy! The frontend and all CRUD operations work perfectly in development. You just need to choose a data persistence solution for production.
