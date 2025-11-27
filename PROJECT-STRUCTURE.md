# 📁 Project Structure

Complete overview of the PolyThreads Web project structure.

## 🗂️ Root Directory

```
polythreads-web/
├── app/                      # Next.js 14 App Router
├── components/               # React components
├── contracts/                # Smart contracts & Hardhat
├── lib/                      # Utility libraries
├── public/                   # Static assets
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies & scripts
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── supabase-schema.sql      # Database schema
├── README.md                # Main documentation
├── SETUP.md                 # Detailed setup guide
├── QUICKSTART.md            # Quick start guide
└── DEPLOYMENT-CHECKLIST.md  # Deployment checklist
```

## 📱 App Directory (`app/`)

Next.js 14 App Router structure with all pages and layouts.

```
app/
├── layout.tsx               # Root layout with providers
├── providers.tsx            # React Query, Wagmi, RainbowKit providers
├── globals.css              # Global styles & Tailwind
├── page.tsx                 # Home feed (/)
│
├── create/
│   └── page.tsx            # Create post page (/create)
│
├── post/
│   └── [id]/
│       └── page.tsx        # Thread view (/post/[id])
│
├── profile/
│   └── [wallet]/
│       └── page.tsx        # User profile (/profile/[wallet])
│
├── wallet/
│   └── page.tsx            # Wallet page (/wallet)
│
└── api/
    └── upload/
        └── route.ts        # IPFS upload API endpoint
```

### Page Descriptions

- **`page.tsx`** (Home): Main feed showing all posts, like functionality
- **`create/page.tsx`**: Form to create new posts with text and images
- **`post/[id]/page.tsx`**: Thread view with replies and blockchain verification
- **`profile/[wallet]/page.tsx`**: User profile with posts, stats, and follow button
- **`wallet/page.tsx`**: Wallet info, balances, contract addresses
- **`api/upload/route.ts`**: Server-side IPFS upload endpoint

## 🧩 Components (`components/`)

Reusable React components.

```
components/
├── Header.tsx              # Navigation header with wallet connect
└── PostCard.tsx            # Post display component with like/reply
```

### Component Details

- **Header**: Top navigation with logo, links, and RainbowKit connect button
- **PostCard**: Displays post content, user info, timestamp, likes, replies

## 📜 Smart Contracts (`contracts/`)

Solidity contracts and Hardhat configuration.

```
contracts/
├── contracts/
│   ├── PolyThreads.sol     # Main post storage contract
│   ├── PolyToken.sol       # ERC-20 reward token (PTT)
│   └── Rewards.sol         # Automatic reward distribution
│
├── scripts/
│   └── deploy.js           # Deployment script
│
├── hardhat.config.js       # Hardhat configuration
├── package.json            # Contract dependencies
└── artifacts/              # Compiled contracts (generated)
```

### Contract Descriptions

**PolyThreads.sol**
- Stores post metadata on-chain
- Functions: `createPost()`, `likePost()`, `getPost()`
- Emits events for post creation and likes
- Integrates with Rewards contract

**PolyToken.sol**
- ERC-20 token (PTT - PolyThreads Token)
- Minting controlled by authorized addresses
- Used for rewarding user actions

**Rewards.sol**
- Automatically distributes tokens
- 5 PTT per post created
- 1 PTT per like received
- Called by PolyThreads contract

## 🛠️ Libraries (`lib/`)

Utility functions and configurations.

```
lib/
├── contracts.ts            # Contract ABIs and addresses
├── ipfs.ts                 # IPFS upload functions (Pinata)
├── supabase.ts             # Supabase client and types
├── utils.ts                # Helper functions (formatting, etc.)
└── wagmi.ts                # Wagmi/RainbowKit configuration
```

### Library Details

- **contracts.ts**: Contract ABIs, addresses, constants
- **ipfs.ts**: Upload files/JSON to IPFS via Pinata
- **supabase.ts**: Database client, TypeScript types
- **utils.ts**: Address shortening, time formatting, CSS utilities
- **wagmi.ts**: Web3 wallet configuration

## 🗄️ Database Schema

Supabase PostgreSQL database structure.

### Tables

**users**
```sql
- id (UUID, primary key)
- wallet (TEXT, unique)
- username (TEXT, unique, nullable)
- avatar_url (TEXT, nullable)
- bio (TEXT, nullable)
- created_at (TIMESTAMP)
```

**posts**
```sql
- id (UUID, primary key)
- wallet (TEXT, foreign key → users.wallet)
- text (TEXT)
- ipfs_url (TEXT, nullable)
- blockchain_post_id (BIGINT, nullable)
- parent_post_id (UUID, foreign key → posts.id, nullable)
- created_at (TIMESTAMP)
```

**likes**
```sql
- id (UUID, primary key)
- post_id (UUID, foreign key → posts.id)
- wallet (TEXT, foreign key → users.wallet)
- created_at (TIMESTAMP)
- UNIQUE(post_id, wallet)
```

**follows**
```sql
- id (UUID, primary key)
- follower_wallet (TEXT, foreign key → users.wallet)
- following_wallet (TEXT, foreign key → users.wallet)
- created_at (TIMESTAMP)
- UNIQUE(follower_wallet, following_wallet)
```

## 🔧 Configuration Files

### `next.config.mjs`
- Image domains for IPFS gateways
- Webpack configuration for Web3 libraries

### `tailwind.config.ts`
- Custom color scheme
- Dark mode configuration
- Border radius variables

### `tsconfig.json`
- TypeScript compiler options
- Path aliases (`@/*`)
- Strict mode enabled

### `hardhat.config.js`
- Solidity version (0.8.20)
- Network configuration (Polygon Amoy)
- Optimizer settings

## 📦 Dependencies

### Main Dependencies
- **next**: React framework
- **react** & **react-dom**: UI library
- **typescript**: Type safety
- **@supabase/supabase-js**: Database client
- **@tanstack/react-query**: Data fetching
- **wagmi**: Web3 React hooks
- **@rainbow-me/rainbowkit**: Wallet connection UI
- **viem**: Ethereum library
- **axios**: HTTP client
- **tailwindcss**: Styling
- **lucide-react**: Icons
- **date-fns**: Date formatting

### Contract Dependencies
- **hardhat**: Development environment
- **@nomicfoundation/hardhat-toolbox**: Hardhat plugins
- **@openzeppelin/contracts**: Secure contract templates
- **dotenv**: Environment variables

## 🚀 NPM Scripts

```json
{
  "dev": "next dev",              // Start development server
  "build": "next build",          // Build for production
  "start": "next start",          // Start production server
  "lint": "next lint",            // Run ESLint
  "compile": "cd contracts && npx hardhat compile",  // Compile contracts
  "deploy": "cd contracts && npx hardhat run scripts/deploy.js --network amoy"  // Deploy contracts
}
```

## 🔐 Environment Variables

See `.env.example` for all required variables:

- **Supabase**: Database connection
- **Pinata**: IPFS storage
- **Polygon**: RPC URL and chain ID
- **Contracts**: Deployed contract addresses
- **Private Key**: For contract deployment (keep secure!)

## 📊 Data Flow

### Creating a Post
1. User writes text and uploads image in UI
2. Image uploaded to IPFS via Pinata
3. Metadata saved to Supabase
4. Transaction sent to PolyThreads contract
5. Contract calls Rewards contract
6. User receives 5 PTT tokens
7. Post appears in feed with blockchain badge

### Liking a Post
1. User clicks like button
2. Like saved to Supabase
3. Optional: Transaction sent to blockchain
4. Post owner receives 1 PTT token
5. Like count updates in UI

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Dark mode**: Enabled by default
- **Custom colors**: Primary purple theme
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions and hover effects

## 🔒 Security Features

- **RLS Policies**: Row-level security in Supabase
- **Environment Variables**: Sensitive data not in code
- **Wallet Signatures**: Blockchain transaction verification
- **Input Validation**: Client and server-side validation
- **CORS**: Properly configured in Supabase

## 📈 Future Enhancements

Potential additions to the project structure:

- `middleware.ts`: Authentication middleware
- `app/explore/`: Trending posts page
- `app/notifications/`: Notification system
- `components/ui/`: Shadcn UI components
- `lib/analytics.ts`: Analytics integration
- `tests/`: Unit and integration tests
- `docs/`: Additional documentation

---

This structure provides a solid foundation for a production-ready Web3 social platform. Feel free to extend and customize based on your needs!
