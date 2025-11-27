# 🎯 Supabase Setup - Final Step!

## ✅ What's Done:
- Supabase URL configured
- Supabase API key configured

## 📋 What You Need to Do Now:

### Step 1: Setup Database Schema (2 minutes)

1. **Go to your Supabase project:**
   https://supabase.com/dashboard/project/snfvofciggrvjtvfqdcq

2. **Click on "SQL Editor"** in the left sidebar

3. **Click "New Query"**

4. **Copy the ENTIRE contents** of the file `supabase-schema.sql` from your project

5. **Paste it** into the SQL Editor

6. **Click "Run"** (or press Ctrl+Enter)

7. **Wait for success message** - You should see "Success. No rows returned"

### Step 2: Get Service Role Key (Optional but Recommended)

1. In Supabase dashboard, go to **Settings** → **API**

2. Scroll down to **Project API keys**

3. Copy the **service_role** key (the secret one)

4. Add it to your `.env` file:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### Step 3: Restart Your Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test It!

1. Open: http://localhost:3000

2. You should now see the **actual feed page** instead of the welcome page!

3. Try connecting your wallet and creating a post

---

## 🎉 After Setup:

Your site will have:
- ✅ Database connected
- ✅ User profiles working
- ✅ Posts can be created
- ✅ Likes and follows working

---

## 🆘 If You Get Errors:

### "relation does not exist"
- You didn't run the SQL schema
- Go back to Step 1 and run `supabase-schema.sql`

### "permission denied"
- RLS policies not created
- Make sure you ran the ENTIRE schema file

### Still seeing welcome page?
- Clear cache: `rm -rf .next`
- Restart: `npm run dev`

---

## 📍 Quick Links:

- **Your Supabase Dashboard**: https://supabase.com/dashboard/project/snfvofciggrvjtvfqdcq
- **SQL Editor**: https://supabase.com/dashboard/project/snfvofciggrvjtvfqdcq/sql
- **API Settings**: https://supabase.com/dashboard/project/snfvofciggrvjtvfqdcq/settings/api

---

**Next**: Run the SQL schema, then restart your server!
