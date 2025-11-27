# 🟣 PolyThreads Web - Web3 Social Platform

A full-featured decentralized social platform built on **Polygon Amoy Testnet**, **Supabase**, and **IPFS**. Think Threads/Twitter, but Web3-native with blockchain verification and token rewards.

## 🚀 Features

- ✅ **Web3 Wallet Authentication** - Connect with MetaMask, WalletConnect, etc.
- ✅ **Create Posts** - Text + images stored on IPFS
- ✅ **Blockchain Verification** - Posts verified on Polygon Amoy
- ✅ **Token Rewards** - Earn PTT tokens for posting and receiving likes
- ✅ **Social Features** - Like, reply, follow/unfollow
- ✅ **User Profiles** - View posts, followers, token balance
- ✅ **Responsive Design** - Clean Threads-like UI with dark mode

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Wagmi + RainbowKit** (Web3 integration)
- **React Query** (Data fetching)

### Smart Contracts
- **Solidity ^0.8.20**
- **Hardhat** (Development & deployment)
- **OpenZeppelin** (ERC20 & access control)
- **Polygon Amoy Testnet**

### Backend & Storage
- **Supabase** (PostgreSQL database)
- **IPFS** (Pinata for media storage)

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd polythreads-web
```

### 2. Install Dependencies

```bash
# Install main dependencies
npm install

# Install contract dependencies
cd contracts
npm install
cd ..
```

### 3. Environment Setup

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Supabase (Get from https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# IPFS - Pinata (Get from https://pinata.cloud)
PINATA_JWT=your_pinata_jwt_token

# Polygon Amoy
NEXT_PUBLIC_POLYGON_RPC_URL=https://rpc-amoy.polygon.technology
NEXT_PUBLIC_CHAIN_ID=80002

# For deployment
PRIVATE_KEY=your_wallet_private_key
```

### 4. Setup Supabase Database

1. Create a new project on [Supabase](https://supabase.com)
2. Go to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL script

### 5. Deploy Smart Contracts

Make sure you have test MATIC in your wallet from the [Polygon Faucet](https://faucet.polygon.technology/).

```bash
# Compile contracts
npm run compile

# Deploy to Polygon Amoy
npm run deploy
```

After deployment, copy the contract addresses to your `.env`:

```env
NEXT_PUBLIC_POLYTHREADS_CONTRACT=0x...
NEXT_PUBLIC_POLYTOKEN_CONTRACT=0x...
NEXT_PUBLIC_REWARDS_CONTRACT=0x...
```

### 6. Update WalletConnect Project ID

Get a project ID from [WalletConnect Cloud](https://cloud.walletconnect.com) and update `lib/wagmi.ts`:

```typescript
export const config = getDefaultConfig({
  appName: "PolyThreads",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // <-- Add your ID here
  chains: [polygonAmoy],
  ssr: true,
});
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📱 Usage Guide

### 1. Connect Wallet
- Click "Connect Wallet" in the header
- Select your wallet (MetaMask, WalletConnect, etc.)
- Approve the connection

### 2. Create a Post
- Click the "Create" icon in the header
- Write your text (max 500 characters)
- Optionally add an image
- Click "Post"
- Approve the blockchain transaction
- Your post will be saved to Supabase and verified on-chain

### 3. Interact with Posts
- **Like**: Click the heart icon (earns 1 PTT for post owner)
- **Reply**: Click on a post to view thread and add replies
- **View Profile**: Click on username to see user profile

### 4. Earn Tokens
- **5 PTT** for creating a post
- **1 PTT** when your post receives a like

### 5. Check Your Wallet
- Go to "Wallet" page
- View your MATIC and PTT balances
- See contract addresses and stats

## 🏗️ Project Structure

```
polythreads-web/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home feed
│   ├── create/              # Create post page
│   ├── post/[id]/           # Thread view
│   ├── profile/[wallet]/    # User profile
│   ├── wallet/              # Wallet page
│   └── api/                 # API routes
├── components/              # React components
│   ├── Header.tsx
│   └── PostCard.tsx
├── contracts/               # Smart contracts
│   ├── contracts/
│   │   ├── PolyThreads.sol
│   │   ├── PolyToken.sol
│   │   └── Rewards.sol
│   └── scripts/
│       └── deploy.js
├── lib/                     # Utilities
│   ├── contracts.ts         # Contract ABIs
│   ├── ipfs.ts             # IPFS functions
│   ├── supabase.ts         # Supabase client
│   ├── utils.ts            # Helper functions
│   └── wagmi.ts            # Web3 config
└── supabase-schema.sql     # Database schema
```

## 🔐 Smart Contracts

### PolyThreads.sol
Main contract storing post metadata on-chain:
- `createPost(ipfsHash, parentId)` - Create a new post
- `likePost(postId)` - Like a post
- `getPost(postId)` - Get post details

### PolyToken.sol
ERC-20 reward token (PTT):
- Standard ERC-20 functionality
- Minting controlled by Rewards contract

### Rewards.sol
Automatic token distribution:
- 5 PTT per post created
- 1 PTT per like received

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Environment Variables on Vercel

Add all variables from `.env` except `PRIVATE_KEY` (only needed for contract deployment).

## 🧪 Testing

Get test MATIC from:
- [Polygon Faucet](https://faucet.polygon.technology/)
- [Alchemy Faucet](https://www.alchemy.com/faucets/polygon-amoy)

## 📝 Database Schema

### Tables
- **users** - User profiles
- **posts** - All posts and replies
- **likes** - Post likes
- **follows** - Follow relationships

See `supabase-schema.sql` for complete schema with RLS policies.

## 🔧 Troubleshooting

### "Failed to upload to IPFS"
- Check your `PINATA_JWT` is correct
- Ensure you have Pinata API access

### "Transaction failed"
- Ensure you have test MATIC for gas
- Check contract addresses are correct in `.env`

### "Supabase error"
- Verify your Supabase URL and keys
- Check RLS policies are enabled

### Wallet connection issues
- Update WalletConnect Project ID in `lib/wagmi.ts`
- Clear browser cache and reconnect

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or building your own Web3 social platform.

## 🔗 Links

- [Polygon Amoy Explorer](https://amoy.polygonscan.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Pinata Docs](https://docs.pinata.cloud/)
- [RainbowKit Docs](https://www.rainbowkit.com/)
- [Wagmi Docs](https://wagmi.sh/)

## 💡 Next Steps

- Add image compression before IPFS upload
- Implement post editing and deletion
- Add notifications system
- Create trending/explore page
- Add hashtag support
- Implement direct messaging
- Add NFT profile pictures
- Create mobile-responsive improvements

---

Built with ❤️ using Next.js, Polygon, and Web3 technologies.
