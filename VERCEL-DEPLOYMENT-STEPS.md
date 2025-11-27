# Vercel Deployment - Step by Step

## ✅ What We Fixed

1. Removed `vercel.json` - Vercel will auto-detect Next.js
2. Updated `lib/wagmi.ts` - Uses environment variable for WalletConnect
3. All code is pushed to GitHub

## 🚀 Deploy Now (5 Minutes)

### Step 1: Get WalletConnect Project ID (2 min)

1. Go to https://cloud.walletconnect.com
2. Sign up/Login (free)
3. Click "Create New Project"
4. Name: "PolyThreads"
5. **Copy the Project ID** (looks like: `a1b2c3d4e5f6...`)

### Step 2: Configure Vercel (3 min)

#### Option A: New Deployment

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repo: `anshuraj5679/polythreads`
4. **IMPORTANT**: Check "Root Directory" is set to `./` (not a subdirectory)
5. Add Environment Variables (click "Environment Variables"):

```
NEXT_PUBLIC_SUPABASE_URL=https://snfvofciggrvjtvfqdcq.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZnZvZmNpZ2dydmp0dmZxZGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNzEyMzYsImV4cCI6MjA3OTY0NzIzNn0.zrejxZEUgXHyfgogkRnG0Ju47ia-g2c_P1n6L1D-K8w

NEXT_PUBLIC_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYmZhZTljYi03M2Q1LTQ4NmItOTU5MC0xNWNhY2Y2OTcwNWQiLCJlbWFpbCI6ImFuc2h1cmFqNTY3OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzQ0NjM5MWQ4MGIxZjQwZTFkZDQiLCJzY29wZWRLZXlTZWNyZXQiOiJjNGMwYTVkOGRjMWQ2MjcwYWFiOTYzNzlkZTNhNWM4ZDYwOGVhOTg2ZWI1ODJmMTc1MWE1NGYyYmNlMDk5OThlIiwiZXhwIjoxNzk1NjgxNzgzfQ._mOC8fvBrQVHx9QiVygfPoiQFnbt-xyu0G7zQWw95W8

NEXT_PUBLIC_POLYGON_RPC_URL=https://rpc-amoy.polygon.technology

NEXT_PUBLIC_CHAIN_ID=80002

NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<PASTE_YOUR_PROJECT_ID_HERE>

NEXT_PUBLIC_POLYTHREADS_CONTRACT=0x68Ccc5d2418B925FAF04aa9A95329fd39070A39F

NEXT_PUBLIC_POLYTOKEN_CONTRACT=0x8e4082df12715E77dC47e973f0C4F3AcD3C67C8D

NEXT_PUBLIC_REWARDS_CONTRACT=0x17FAa70B94f9Ad05564f77ad523161BaEb43F7d4
```

6. Click "Deploy"

#### Option B: Existing Project (Redeploy)

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "General"
4. **Check "Root Directory"** - Must be `./` (empty or root)
5. Go to "Settings" → "Environment Variables"
6. Add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` with your Project ID
7. Go to "Deployments" tab
8. Click "..." on latest deployment → "Redeploy"

### Step 3: Verify Deployment

Once deployed, test:
- ✅ Site loads
- ✅ Can view posts
- ✅ Wallet connect button works
- ✅ Can create posts (with wallet)

## 🐛 Troubleshooting

### Error: "Couldn't find any pages or app directory"

**Solution**: In Vercel dashboard:
1. Settings → General → Root Directory
2. Set to `./` or leave empty
3. Save and redeploy

### Error: "Invalid projectId" or WalletConnect fails

**Solution**: 
1. Check `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set in Vercel
2. Value should be your actual Project ID from WalletConnect
3. Redeploy after adding

### Build warnings about deprecated packages

These are just warnings, not errors. The build will succeed. They're from dependencies and don't affect functionality.

## 📝 Notes

- The npm warnings about deprecated packages are normal and won't break your app
- WalletConnect Project ID is required for wallet connections to work
- All other environment variables are already configured
- Build takes 2-3 minutes on Vercel

---

**Your app will be live at**: `https://your-project-name.vercel.app`
