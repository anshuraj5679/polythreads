# Vercel Deployment Fix

## Issues Fixed

1. ✅ WalletConnect Project ID now uses environment variable
2. ✅ Simplified vercel.json configuration
3. ✅ Added proper environment variable structure

## Required Steps Before Deployment

### 1. Get WalletConnect Project ID (FREE - 2 minutes)

1. Go to https://cloud.walletconnect.com
2. Sign up/Login (free account)
3. Click "Create New Project"
4. Name it "PolyThreads"
5. Copy the **Project ID**

### 2. Configure Vercel Environment Variables

In your Vercel dashboard, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://snfvofciggrvjtvfqdcq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZnZvZmNpZ2dydmp0dmZxZGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNzEyMzYsImV4cCI6MjA3OTY0NzIzNn0.zrejxZEUgXHyfgogkRnG0Ju47ia-g2c_P1n6L1D-K8w

NEXT_PUBLIC_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYmZhZTljYi03M2Q1LTQ4NmItOTU5MC0xNWNhY2Y2OTcwNWQiLCJlbWFpbCI6ImFuc2h1cmFqNTY3OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzQ0NjM5MWQ4MGIxZjQwZTFkZDQiLCJzY29wZWRLZXlTZWNyZXQiOiJjNGMwYTVkOGRjMWQ2MjcwYWFiOTYzNzlkZTNhNWM4ZDYwOGVhOTg2ZWI1ODJmMTc1MWE1NGYyYmNlMDk5OThlIiwiZXhwIjoxNzk1NjgxNzgzfQ._mOC8fvBrQVHx9QiVygfPoiQFnbt-xyu0G7zQWw95W8

NEXT_PUBLIC_POLYGON_RPC_URL=https://rpc-amoy.polygon.technology
NEXT_PUBLIC_CHAIN_ID=80002

NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<YOUR_PROJECT_ID_HERE>

NEXT_PUBLIC_POLYTHREADS_CONTRACT=0x68Ccc5d2418B925FAF04aa9A95329fd39070A39F
NEXT_PUBLIC_POLYTOKEN_CONTRACT=0x8e4082df12715E77dC47e973f0C4F3AcD3C67C8D
NEXT_PUBLIC_REWARDS_CONTRACT=0x17FAa70B94f9Ad05564f77ad523161BaEb43F7d4
```

### 3. Deploy to Vercel

**Option A: Via Vercel Dashboard**
1. Go to vercel.com
2. Import your GitHub repository
3. Add environment variables (from step 2)
4. Click "Deploy"

**Option B: Via CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 4. Verify Deployment

After deployment, check:
- ✅ Site loads without errors
- ✅ Wallet connection works
- ✅ Can view posts
- ✅ Can create posts (with wallet connected)

## Common Issues

### "routes-manifest.json not found"
- **Cause**: Build failed or incomplete
- **Fix**: Check build logs in Vercel dashboard, ensure all env vars are set

### "Invalid projectId"
- **Cause**: WalletConnect Project ID not set or incorrect
- **Fix**: Add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` to Vercel env vars

### Build fails with "Module not found"
- **Cause**: Dependencies not installed properly
- **Fix**: Clear build cache in Vercel settings and redeploy

## Quick Test Locally

Before deploying, test locally:

```bash
# Update your local .env with WalletConnect Project ID
# Then run:
npm run build
npm start
```

If it works locally, it will work on Vercel.

## Important: Vercel Project Settings

If you still get "Couldn't find any pages or app directory" error:

1. **Check Root Directory in Vercel Dashboard**:
   - Go to Project Settings → General
   - Ensure "Root Directory" is set to `./` (project root)
   - NOT set to any subdirectory

2. **Framework Preset**:
   - Should auto-detect as "Next.js"
   - If not, manually select "Next.js" in settings

3. **Build Settings**:
   - Build Command: `npm run build` (or leave empty for auto-detect)
   - Output Directory: `.next` (or leave empty for auto-detect)
   - Install Command: `npm install` (or leave empty for auto-detect)

4. **Redeploy**:
   - After changing settings, click "Redeploy" from Deployments tab

---

**Need Help?**
- WalletConnect: https://cloud.walletconnect.com
- Vercel Docs: https://vercel.com/docs
- Check build logs in Vercel dashboard for specific errors
