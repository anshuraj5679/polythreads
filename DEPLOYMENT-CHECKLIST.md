# ✅ Deployment Checklist

Use this checklist to ensure everything is properly configured before deploying.

## 📋 Pre-Deployment Checklist

### Environment Setup
- [ ] Node.js v18+ installed
- [ ] npm or yarn installed
- [ ] Git installed (optional)
- [ ] MetaMask or Web3 wallet installed

### API Keys & Services
- [ ] Supabase account created
- [ ] Supabase project created
- [ ] Supabase SQL schema executed
- [ ] Supabase URL and keys copied
- [ ] Pinata account created
- [ ] Pinata API key created with pinning permissions
- [ ] Pinata JWT token copied
- [ ] WalletConnect project created
- [ ] WalletConnect Project ID copied and added to `lib/wagmi.ts`

### Environment Variables
- [ ] `.env` file created from `.env.example`
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set
- [ ] `NEXT_PUBLIC_PINATA_JWT` set
- [ ] `PRIVATE_KEY` set (for deployment only)

### Blockchain Setup
- [ ] Test MATIC received in wallet
- [ ] Wallet connected to Polygon Amoy network
- [ ] Private key added to `.env` (⚠️ keep secure!)

### Dependencies
- [ ] Main dependencies installed (`npm install`)
- [ ] Contract dependencies installed (`cd contracts && npm install`)

### Smart Contracts
- [ ] Contracts compiled successfully (`npm run compile`)
- [ ] Contracts deployed to Polygon Amoy (`npm run deploy`)
- [ ] Contract addresses copied to `.env`:
  - [ ] `NEXT_PUBLIC_POLYTHREADS_CONTRACT`
  - [ ] `NEXT_PUBLIC_POLYTOKEN_CONTRACT`
  - [ ] `NEXT_PUBLIC_REWARDS_CONTRACT`

### Testing
- [ ] Development server starts (`npm run dev`)
- [ ] Website loads at http://localhost:3000
- [ ] Wallet connects successfully
- [ ] Can create a post
- [ ] Post appears in feed
- [ ] PTT tokens received after posting
- [ ] Can like posts
- [ ] Can view profiles
- [ ] Can follow/unfollow users
- [ ] Images upload to IPFS
- [ ] Blockchain verification badge shows

## 🚀 Production Deployment (Vercel)

### Pre-Production
- [ ] All tests passing
- [ ] No console errors
- [ ] All features working locally
- [ ] `.env` file NOT committed to Git
- [ ] `.gitignore` includes `.env`

### Vercel Setup
- [ ] Code pushed to GitHub/GitLab
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables added (all except `PRIVATE_KEY`):
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `NEXT_PUBLIC_PINATA_JWT`
  - [ ] `NEXT_PUBLIC_POLYGON_RPC_URL`
  - [ ] `NEXT_PUBLIC_CHAIN_ID`
  - [ ] `NEXT_PUBLIC_POLYTHREADS_CONTRACT`
  - [ ] `NEXT_PUBLIC_POLYTOKEN_CONTRACT`
  - [ ] `NEXT_PUBLIC_REWARDS_CONTRACT`

### Post-Deployment
- [ ] Production site loads
- [ ] Wallet connects on production
- [ ] Can create posts on production
- [ ] IPFS uploads work
- [ ] Blockchain transactions work
- [ ] All pages accessible
- [ ] No console errors

## 🔒 Security Checklist

- [ ] Private key never committed to Git
- [ ] `.env` in `.gitignore`
- [ ] Supabase RLS policies enabled
- [ ] Service role key only used server-side
- [ ] No sensitive data in client-side code
- [ ] CORS properly configured in Supabase
- [ ] API keys have minimal required permissions

## 📊 Performance Checklist

- [ ] Images optimized before upload
- [ ] IPFS gateway responsive
- [ ] Database queries optimized
- [ ] No unnecessary re-renders
- [ ] Proper loading states
- [ ] Error handling implemented

## 🐛 Troubleshooting

If something doesn't work:

1. **Check browser console** for errors
2. **Check Vercel logs** for server errors
3. **Check Supabase logs** for database errors
4. **Verify environment variables** are set correctly
5. **Check contract addresses** on Polygon Amoy Explorer
6. **Test locally first** before debugging production

## ✅ Final Verification

Run through this user flow:

1. Visit site
2. Connect wallet
3. Create a post with text and image
4. Wait for transaction confirmation
5. See post in feed with blockchain badge
6. Check wallet page - should show 5 PTT tokens
7. Like another post
8. Reply to a post
9. Visit a profile
10. Follow a user

If all steps work, you're ready to launch! 🎉

## 📝 Post-Launch

- [ ] Share with friends for testing
- [ ] Monitor for errors
- [ ] Collect user feedback
- [ ] Plan feature updates
- [ ] Consider adding analytics
- [ ] Document any custom changes

---

**Remember**: This is a testnet application. For mainnet deployment, you'll need:
- Mainnet contract deployment
- Real MATIC for gas
- Production-grade error handling
- Rate limiting
- Monitoring and alerts
- Backup strategies
