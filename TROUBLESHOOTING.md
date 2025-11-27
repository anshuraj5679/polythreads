# 🔧 Troubleshooting Guide

Common issues and their solutions for PolyThreads Web.

## 🚨 Installation Issues

### "npm install" takes forever or fails

**Solution 1**: Clear npm cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Solution 2**: Use different registry
```bash
npm install --registry=https://registry.npmjs.org/
```

**Solution 3**: Increase timeout
```bash
npm install --timeout=60000
```

### "Cannot find module" errors

**Solution**: Ensure all dependencies are installed
```bash
npm install
cd contracts && npm install && cd ..
```

## 🔌 Connection Issues

### Wallet won't connect

**Cause**: Missing or incorrect WalletConnect Project ID

**Solution**:
1. Get Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Open `lib/wagmi.ts`
3. Replace `YOUR_WALLETCONNECT_PROJECT_ID` with your actual ID
4. Restart dev server

**Alternative**: Clear browser cache and cookies

### "Wrong network" error

**Cause**: Wallet not on Polygon Amoy

**Solution**:
1. Open MetaMask
2. Click network dropdown
3. Select "Polygon Amoy" or add it manually:
   - Network Name: Polygon Amoy
   - RPC URL: https://rpc-amoy.polygon.technology
   - Chain ID: 80002
   - Currency Symbol: MATIC
   - Block Explorer: https://amoy.polygonscan.com

### Cannot connect to Supabase

**Cause**: Incorrect environment variables

**Solution**:
1. Check `.env` file exists
2. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
3. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
4. Restart dev server after changing `.env`

**Check**: URL should look like `https://xxxxx.supabase.co`

## 📝 Post Creation Issues

### "Failed to upload to IPFS"

**Cause 1**: Invalid Pinata JWT token

**Solution**:
1. Go to [pinata.cloud](https://pinata.cloud) → API Keys
2. Create new key with these permissions:
   - pinFileToIPFS
   - pinJSONToIPFS
3. Copy JWT token to `.env` as `NEXT_PUBLIC_PINATA_JWT`
4. Restart dev server

**Cause 2**: File too large

**Solution**: Compress image before uploading (max 10MB recommended)

### "Transaction failed" when creating post

**Cause 1**: Insufficient gas (MATIC)

**Solution**: Get more test MATIC from faucet:
- [faucet.polygon.technology](https://faucet.polygon.technology/)
- [Alchemy Faucet](https://www.alchemy.com/faucets/polygon-amoy)

**Cause 2**: Contract not deployed or wrong address

**Solution**:
1. Verify contract addresses in `.env`
2. Check contracts exist on [Polygon Amoy Explorer](https://amoy.polygonscan.com/)
3. Redeploy if necessary: `npm run deploy`

**Cause 3**: Gas price too low

**Solution**: Increase gas limit in MetaMask when prompted

### Post created but not showing in feed

**Cause**: Database not updated

**Solution**:
1. Check Supabase logs for errors
2. Verify RLS policies are enabled
3. Check user exists in `users` table
4. Refresh page

## 🗄️ Database Issues

### "Row Level Security policy violation"

**Cause**: RLS policies not properly configured

**Solution**:
1. Go to Supabase SQL Editor
2. Re-run `supabase-schema.sql`
3. Verify policies are enabled:
```sql
SELECT * FROM pg_policies WHERE tablename IN ('users', 'posts', 'likes', 'follows');
```

### "Foreign key constraint violation"

**Cause**: User doesn't exist in database

**Solution**: The app should auto-create users, but you can manually insert:
```sql
INSERT INTO users (wallet) VALUES ('your_wallet_address_lowercase');
```

### Cannot query posts

**Cause**: Schema not created

**Solution**:
1. Go to Supabase → SQL Editor
2. Copy entire contents of `supabase-schema.sql`
3. Paste and run
4. Check for errors in output

## 💰 Token & Reward Issues

### Not receiving PTT tokens

**Cause 1**: Rewards contract not linked

**Solution**:
1. Check deployment logs
2. Verify Rewards contract address in `.env`
3. Redeploy if necessary

**Cause 2**: Transaction failed silently

**Solution**: Check transaction on [Polygon Amoy Explorer](https://amoy.polygonscan.com/)

### Token balance shows 0

**Cause**: Reading from wrong contract

**Solution**:
1. Verify `NEXT_PUBLIC_POLYTOKEN_CONTRACT` in `.env`
2. Check contract on explorer
3. Ensure wallet address is correct

## 🖼️ Image Issues

### Images not loading

**Cause 1**: IPFS gateway slow or down

**Solution**: Try different gateway in `lib/ipfs.ts`:
```typescript
export function getIPFSUrl(hash: string): string {
  // Try these alternatives:
  return `https://gateway.pinata.cloud/ipfs/${hash}`;
  // return `https://ipfs.io/ipfs/${hash}`;
  // return `https://cloudflare-ipfs.com/ipfs/${hash}`;
}
```

**Cause 2**: Invalid IPFS hash

**Solution**: Check upload was successful, hash should start with "Qm" or "bafy"

### Image upload fails

**Cause**: File format not supported

**Solution**: Use common formats (JPG, PNG, GIF, WebP)

## 🔨 Build & Deployment Issues

### "npm run build" fails

**Cause**: TypeScript errors

**Solution**:
```bash
npm run lint
# Fix any errors shown
npm run build
```

### Vercel deployment fails

**Cause 1**: Missing environment variables

**Solution**: Add all variables from `.env` to Vercel dashboard (except `PRIVATE_KEY`)

**Cause 2**: Build timeout

**Solution**: In Vercel settings, increase build timeout

**Cause 3**: Node version mismatch

**Solution**: Add to `package.json`:
```json
"engines": {
  "node": ">=18.0.0"
}
```

## 🔐 Smart Contract Issues

### "npm run compile" fails

**Cause**: Solidity version mismatch

**Solution**:
1. Check `hardhat.config.js` has correct version
2. Ensure OpenZeppelin version is compatible
3. Clear cache: `rm -rf contracts/cache contracts/artifacts`
4. Recompile: `npm run compile`

### "npm run deploy" fails

**Cause 1**: No MATIC in wallet

**Solution**: Get test MATIC from faucet

**Cause 2**: Invalid private key

**Solution**:
1. Export private key from MetaMask
2. Add to `.env` as `PRIVATE_KEY=0x...`
3. **Never commit this file!**

**Cause 3**: RPC endpoint down

**Solution**: Try alternative RPC in `hardhat.config.js`:
```javascript
url: "https://polygon-amoy.g.alchemy.com/v2/YOUR_KEY"
```

### Contract interaction fails

**Cause**: ABI mismatch

**Solution**:
1. Recompile contracts: `npm run compile`
2. Update ABIs in `lib/contracts.ts` if you modified contracts
3. Redeploy: `npm run deploy`

## 🌐 Browser Issues

### Site not loading

**Solution 1**: Clear browser cache
- Chrome: Ctrl+Shift+Delete
- Firefox: Ctrl+Shift+Delete
- Safari: Cmd+Option+E

**Solution 2**: Try incognito/private mode

**Solution 3**: Try different browser

### MetaMask not detected

**Solution**:
1. Install MetaMask extension
2. Refresh page
3. Check extension is enabled
4. Try different browser

### Transactions stuck "pending"

**Solution**:
1. Check Polygon Amoy network status
2. Increase gas price
3. Cancel and retry transaction
4. Check wallet has MATIC

## 📱 UI/UX Issues

### Dark mode not working

**Solution**: Check `tailwind.config.ts` has `darkMode: ["class"]`

### Styles not applying

**Solution**:
```bash
rm -rf .next
npm run dev
```

### Icons not showing

**Cause**: lucide-react not installed

**Solution**:
```bash
npm install lucide-react
```

## 🔍 Debugging Tips

### Enable verbose logging

Add to `.env`:
```env
NEXT_PUBLIC_DEBUG=true
```

### Check browser console

Press F12 and look for:
- Red errors
- Network failures
- Failed requests

### Check Supabase logs

1. Go to Supabase dashboard
2. Click "Logs" in sidebar
3. Filter by error level

### Check blockchain transactions

1. Copy transaction hash
2. Go to [amoy.polygonscan.com](https://amoy.polygonscan.com)
3. Paste hash and check status

### Test API endpoints

```bash
# Test Supabase connection
curl https://your-project.supabase.co/rest/v1/posts \
  -H "apikey: your-anon-key"

# Test IPFS upload
curl -X POST https://api.pinata.cloud/data/testAuthentication \
  -H "Authorization: Bearer your-jwt"
```

## 🆘 Still Having Issues?

### Checklist
- [ ] All dependencies installed
- [ ] All environment variables set
- [ ] Contracts deployed successfully
- [ ] Test MATIC in wallet
- [ ] Correct network selected
- [ ] Browser console checked
- [ ] Supabase logs checked

### Get Help
1. Check [README.md](README.md) for documentation
2. Review [SETUP.md](SETUP.md) for setup steps
3. Check [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)
4. Search for error message online
5. Check Polygon Amoy network status

### Common Error Messages

**"Cannot read property of undefined"**
- Check data is loaded before rendering
- Add loading states
- Use optional chaining (`?.`)

**"Network request failed"**
- Check internet connection
- Verify API endpoints
- Check CORS settings

**"Insufficient funds"**
- Get more test MATIC
- Check you're on correct network

**"Nonce too high"**
- Reset MetaMask account
- Settings → Advanced → Reset Account

**"Gas estimation failed"**
- Contract function will fail
- Check contract state
- Verify function parameters

## 🔄 Reset Everything

If all else fails, start fresh:

```bash
# 1. Clean install
rm -rf node_modules .next contracts/node_modules contracts/cache contracts/artifacts
npm install
cd contracts && npm install && cd ..

# 2. Recompile contracts
npm run compile

# 3. Redeploy contracts (costs gas)
npm run deploy

# 4. Update .env with new addresses

# 5. Restart dev server
npm run dev
```

---

**Pro Tip**: Most issues are caused by:
1. Missing environment variables
2. Not restarting dev server after changes
3. Wrong network in MetaMask
4. Insufficient test MATIC

Always check these first! 🎯
