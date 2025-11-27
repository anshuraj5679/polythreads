# 🖼️ Pinata Setup (Optional - For Image Uploads)

## Current Status:
- ⚠️ Pinata not configured
- ✅ Site works without images
- ✅ Text posts work fine
- ⚠️ Image uploads disabled

## Why You're Seeing Errors:

The 401 error from Pinata means:
- Pinata JWT token is not configured
- Or the token is invalid

## 🎯 To Enable Image Uploads:

### Step 1: Get Pinata API Key (2 minutes)

1. **Go to**: https://pinata.cloud

2. **Sign up** for free account

3. **Go to**: API Keys section

4. **Click**: "New Key"

5. **Enable permissions**:
   - ✅ pinFileToIPFS
   - ✅ pinJSONToIPFS

6. **Create key** and copy the JWT token

### Step 2: Add to .env

Open `.env` file and replace:

```env
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_token_here
```

With your actual JWT:

```env
NEXT_PUBLIC_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Restart Server

```bash
npm run dev
```

## ✅ What Works Without Pinata:

- ✅ Text posts
- ✅ Likes
- ✅ Replies
- ✅ Profiles
- ✅ Token rewards
- ✅ Blockchain verification
- ❌ Image uploads (disabled)

## 🎉 After Pinata Setup:

- ✅ Everything above
- ✅ Image uploads
- ✅ IPFS storage
- ✅ Decentralized media

---

## 🆘 For Now (Without Images):

Your site works perfectly for text posts! You can:
1. Connect wallet
2. Create text posts
3. Earn PTT tokens
4. Like posts
5. View profiles

**Images are optional - add Pinata later when you want image support!**
