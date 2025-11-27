# 🚀 PolyThreads Web - Complete Setup Guide

Follow these steps to get your PolyThreads Web3 social platform up and running.

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MetaMask** or another Web3 wallet
- **Git** (optional, for cloning)

## 🔧 Step-by-Step Setup

### Step 1: Install Dependencies

```bash
# Install main project dependencies
npm install

# Install contract dependencies
cd contracts
npm install
cd ..
```

**Note**: Installation may take 2-5 minutes. Ignore deprecation warnings.

### Step 2: Get Your API Keys

#### 2.1 Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Fill in project details and wait for setup to complete
4. Go to **Settings** → **API**
5. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

6. Go to **SQL Editor** and run the `supabase-schema.sql` file:
   - Click "New Query"
   - Copy entire contents of `supabase-schema.sql`
   - Paste and click "Run"

#### 2.2 Pinata (IPFS) Setup

1. Go to [pinata.cloud](https://pinata.cloud) and create a free account
2. Go to **API Keys** → **New Key**
3. Enable "pinFileToIPFS" and "pinJSONToIPFS" permissions
4. Create key and copy the JWT token → `PINATA_JWT`

#### 2.3 WalletConnect Project ID

1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a free account
3. Create a new project
4. Copy the Project ID
5. Open `lib/wagmi.ts` and replace `YOUR_WALLETCONNECT_PROJECT_ID` with your ID

### Step 3: Configure Environment Variables

1. Copy the example environment file:
```bash
copy .env.example .env
```

2. Open `.env` and fill in your values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# IPFS (Pinata)
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Polygon Amoy (keep as is)
NEXT_PUBLIC_POLYGON_RPC_URL=https://rpc-amoy.polygon.technology
NEXT_PUBLIC_CHAIN_ID=80002

# Leave these empty for now (will fill after deployment)
NEXT_PUBLIC_POLYTHREADS_CONTRACT=
NEXT_PUBLIC_POLYTOKEN_CONTRACT=
NEXT_PUBLIC_REWARDS_CONTRACT=

# Your wallet private key (for contract deployment only)
PRIVATE_KEY=your_private_key_here
```

### Step 4: Get Test MATIC

You need test MATIC to deploy contracts and pay for gas fees.

1. Go to [faucet.polygon.technology](https://faucet.polygon.technology/)
2. Select **Polygon Amoy**
3. Enter your wallet address
4. Complete CAPTCHA and request tokens
5. Wait 1-2 minutes for tokens to arrive

**Alternative faucets:**
- [Alchemy Polygon Faucet](https://www.alchemy.com/faucets/polygon-amoy)
- [QuickNode Faucet](https://faucet.quicknode.com/polygon/amoy)

### Step 5: Deploy Smart Contracts

1. Make sure you have test MATIC in your wallet
2. Add your wallet's private key to `.env`:
   - Open MetaMask → Click 3 dots → Account Details → Export Private Key
   - **⚠️ NEVER share this key or commit it to Git!**

3. Compile contracts:
```bash
npm run compile
```

4. Deploy to Polygon Amoy:
```bash
npm run deploy
```

5. Copy the contract addresses from the output and add them to `.env`:
```env
NEXT_PUBLIC_POLYTHREADS_CONTRACT=0x...
NEXT_PUBLIC_POLYTOKEN_CONTRACT=0x...
NEXT_PUBLIC_REWARDS_CONTRACT=0x...
```

### Step 6: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✅ Testing Your Setup

### 1. Connect Wallet
- Click "Connect Wallet" in the header
- Select MetaMask
- Switch to Polygon Amoy network when prompted
- Approve the connection

### 2. Create Your First Post
- Click the "Create" icon (pen/square)
- Write some text
- Optionally add an image
- Click "Post"
- Approve the transaction in MetaMask
- Wait for confirmation

### 3. Check Your Rewards
- Go to "Wallet" page
- You should see 5 PTT tokens (reward for creating a post)
- Check your MATIC balance

## 🐛 Troubleshooting

### "Cannot connect to Supabase"
- Double-check your Supabase URL and keys in `.env`
- Make sure you ran the SQL schema in Supabase
- Restart the dev server after changing `.env`

### "Failed to upload to IPFS"
- Verify your Pinata JWT token is correct
- Check you have API permissions enabled
- Try creating a new API key

### "Transaction failed" or "Insufficient funds"
- Make sure you have test MATIC
- Check you're on Polygon Amoy network (Chain ID: 80002)
- Try getting more test MATIC from faucet

### "Contract not deployed"
- Verify contract addresses in `.env` are correct
- Make sure deployment was successful
- Check contracts on [Polygon Amoy Explorer](https://amoy.polygonscan.com/)

### Wallet won't connect
- Update WalletConnect Project ID in `lib/wagmi.ts`
- Clear browser cache
- Try a different browser
- Make sure MetaMask is installed and unlocked

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## 🚀 Deploy to Production

### Deploy to Vercel

1. Push your code to GitHub (make sure `.env` is in `.gitignore`)
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add all environment variables (except `PRIVATE_KEY`)
4. Deploy!

### Environment Variables for Vercel

Add these in Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
PINATA_JWT
NEXT_PUBLIC_POLYGON_RPC_URL
NEXT_PUBLIC_CHAIN_ID
NEXT_PUBLIC_POLYTHREADS_CONTRACT
NEXT_PUBLIC_POLYTOKEN_CONTRACT
NEXT_PUBLIC_REWARDS_CONTRACT
```

## 📚 Next Steps

Once everything is working:

1. **Customize the UI** - Edit components in `components/` folder
2. **Add features** - Check README.md for feature ideas
3. **Test thoroughly** - Create posts, like, reply, follow users
4. **Share with friends** - Get feedback on your Web3 social platform
5. **Deploy to production** - Share your live site!

## 🆘 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review contract code in `contracts/contracts/`
- Check Supabase logs for database errors
- View transaction details on [Polygon Amoy Explorer](https://amoy.polygonscan.com/)

## 🎉 Success!

If you can create a post, see it on the feed, and earn PTT tokens, congratulations! Your PolyThreads platform is working perfectly.

---

**Important Security Notes:**
- Never commit `.env` file to Git
- Never share your private key
- Use environment variables for all sensitive data
- Enable RLS policies in Supabase (already done in schema)
