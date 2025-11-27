# ⚡ Quick Start Guide - 5 Minutes to Launch

Get PolyThreads running in 5 minutes!

## 🎯 Prerequisites
- Node.js installed
- MetaMask wallet
- 5 minutes of your time

## 🚀 Quick Setup

### 1️⃣ Install (2 min)
```bash
npm install
cd contracts && npm install && cd ..
```

### 2️⃣ Get API Keys (2 min)

**Supabase** (Database):
1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy URL and keys from Settings → API
3. Run SQL from `supabase-schema.sql` in SQL Editor

**Pinata** (IPFS):
1. Go to [pinata.cloud](https://pinata.cloud) → API Keys
2. Create key with pinning permissions
3. Copy JWT token

**WalletConnect**:
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create project → Copy Project ID
3. Update `lib/wagmi.ts` line 6

### 3️⃣ Configure (30 sec)
```bash
copy .env.example .env
```

Edit `.env`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
NEXT_PUBLIC_PINATA_JWT=your_jwt
PRIVATE_KEY=your_wallet_private_key
```

### 4️⃣ Get Test MATIC (1 min)
1. Visit [faucet.polygon.technology](https://faucet.polygon.technology/)
2. Select Polygon Amoy
3. Enter wallet address → Get tokens

### 5️⃣ Deploy Contracts (1 min)
```bash
npm run compile
npm run deploy
```

Copy contract addresses to `.env`:
```env
NEXT_PUBLIC_POLYTHREADS_CONTRACT=0x...
NEXT_PUBLIC_POLYTOKEN_CONTRACT=0x...
NEXT_PUBLIC_REWARDS_CONTRACT=0x...
```

### 6️⃣ Launch! (30 sec)
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✅ Test It

1. Connect wallet
2. Create a post
3. Check wallet page - you should have 5 PTT tokens!

## 🎉 Done!

You now have a fully functional Web3 social platform!

---

**Need detailed help?** See [SETUP.md](SETUP.md) for complete instructions.

**Having issues?** Check the Troubleshooting section in [SETUP.md](SETUP.md).
