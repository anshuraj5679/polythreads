# 🚀 Vercel Deployment Guide - PolyThreads

## ✅ Vercel Configuration Fixed!

I've added `vercel.json` to fix the deployment error.

---

## 🎯 Deploy to Vercel (5 Minutes)

### Step 1: Go to Vercel

Visit: https://vercel.com

### Step 2: Import Project

1. Click **"Add New"** → **"Project"**
2. Click **"Import Git Repository"**
3. Select **"GitHub"**
4. Find **"anshuraj5679/polythreads"**
5. Click **"Import"**

### Step 3: Configure Project

**Framework Preset**: Next.js (auto-detected)
**Root Directory**: `./` (leave as is)
**Build Command**: `npm run build` (auto-detected)
**Output Directory**: `.next` (auto-detected)
**Install Command**: `npm install` (auto-detected)

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add these:

```env
NEXT_PUBLIC_SUPABASE_URL=https://snfvofciggrvjtvfqdcq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZnZvZmNpZ2dydmp0dmZxZGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNzEyMzYsImV4cCI6MjA3OTY0NzIzNn0.zrejxZEUgXHyfgogkRnG0Ju47ia-g2c_P1n6L1D-K8w
NEXT_PUBLIC_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYmZhZTljYi03M2Q1LTQ4NmItOTU5MC0xNWNhY2Y2OTcwNWQiLCJlbWFpbCI6ImFuc2h1cmFqNTY3OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzQ0NjM5MWQ4MGIxZjQwZTFkZDQiLCJzY29wZWRLZXlTZWNyZXQiOiJjNGMwYTVkOGRjMWQ2MjcwYWFiOTYzNzlkZTNhNWM4ZDYwOGVhOTg2ZWI1ODJmMTc1MWE1NGYyYmNlMDk5OThlIiwiZXhwIjoxNzk1NjgxNzgzfQ._mOC8fvBrQVHx9QiVygfPoiQFnbt-xyu0G7zQWw95W8
NEXT_PUBLIC_POLYGON_RPC_URL=https://rpc-amoy.polygon.technology
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_POLYTHREADS_CONTRACT=0x68Ccc5d2418B925FAF04aa9A95329fd39070A39F
NEXT_PUBLIC_POLYTOKEN_CONTRACT=0x8e4082df12715E77dC47e973f0C4F3AcD3C67C8D
NEXT_PUBLIC_REWARDS_CONTRACT=0x17FAa70B94f9Ad05564f77ad523161BaEb43F7d4
```

**Important**: Do NOT add `PRIVATE_KEY` to Vercel (only needed for local contract deployment)

### Step 5: Deploy

Click **"Deploy"** button

Wait 3-5 minutes for build to complete

---

## ✅ What Was Fixed

I created `vercel.json` with:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

This tells Vercel:
- ✅ Use Next.js framework
- ✅ Output goes to `.next` folder
- ✅ Use standard build commands

---

## 🎊 After Deployment

You'll get a URL like:
```
https://polythreads-xxxxx.vercel.app
```

Your site will be:
- ✅ Live on the internet
- ✅ Globally distributed (CDN)
- ✅ HTTPS enabled
- ✅ Automatic deployments on push

---

## 🔧 Vercel Dashboard Settings

### Framework Preset
**Select**: Next.js

### Build & Development Settings
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)
- **Development Command**: `npm run dev` (auto-detected)

### Root Directory
Leave as: `./`

---

## 📋 Environment Variables Checklist

Make sure you add ALL of these in Vercel:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `NEXT_PUBLIC_PINATA_JWT`
- [ ] `NEXT_PUBLIC_POLYGON_RPC_URL`
- [ ] `NEXT_PUBLIC_CHAIN_ID`
- [ ] `NEXT_PUBLIC_POLYTHREADS_CONTRACT`
- [ ] `NEXT_PUBLIC_POLYTOKEN_CONTRACT`
- [ ] `NEXT_PUBLIC_REWARDS_CONTRACT`

**Do NOT add**:
- ❌ `PRIVATE_KEY` (security risk)
- ❌ `SUPABASE_SERVICE_ROLE_KEY` (unless needed)

---

## 🆘 If Deployment Still Fails

### Error: "No Output Directory"
- ✅ Already fixed with vercel.json
- Pull latest from GitHub
- Redeploy

### Error: "Build Failed"
- Check environment variables are added
- Check build logs in Vercel
- Verify all env vars are correct

### Error: "Module Not Found"
- Vercel will run `npm install` automatically
- Check package.json is in repository

---

## 🎉 Success Indicators

### Build Succeeds When You See:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (8/8)
✓ Finalizing page optimization
```

### Deployment Succeeds When:
```
✓ Build completed
✓ Deployment ready
🎉 Your site is live!
```

---

## 🔗 After Deployment

Visit your live site:
```
https://polythreads-xxxxx.vercel.app
```

Test:
1. ✅ Connect wallet
2. ✅ Create post
3. ✅ Upload image
4. ✅ Earn tokens
5. ✅ All features working

---

## 📊 Deployment Info

**Repository**: https://github.com/anshuraj5679/polythreads
**Branch**: main
**Latest Commit**: b4d4b26
**Status**: ✅ Ready for deployment

---

**Your project is now configured for Vercel deployment!** 🚀

The `vercel.json` file has been pushed to GitHub. Try deploying again!
