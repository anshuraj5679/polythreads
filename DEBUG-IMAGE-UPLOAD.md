# 🔍 Debug Image Upload

## 🎯 I Added Detailed Logging

Now when you try to upload, you'll see exactly what's happening!

---

## 🚀 RESTART SERVER:

```bash
# Stop with Ctrl+C
npm run dev
```

---

## 📸 Try Upload and Watch Terminal:

### You Should See:

```
📸 Upload API called
📁 File received: image.jpg
🔑 Pinata JWT: Found ✅
🚀 Uploading to Pinata... image.jpg image/jpeg (245.67 KB)
✅ Upload successful! QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### If You See Error:

```
❌ Upload error:
Error message: [exact error]
Error response: [details]
Error status: [status code]
```

---

## 🔍 Common Errors & Solutions:

### "Pinata JWT: Not found ❌"
**Problem**: Environment variable not loaded
**Solution**: 
1. Check .env file has NEXT_PUBLIC_PINATA_JWT
2. Restart server completely
3. Try again

### "401 Unauthorized"
**Problem**: Invalid Pinata JWT
**Solution**:
1. Get new JWT from pinata.cloud
2. Update .env file
3. Restart server

### "413 Payload Too Large"
**Problem**: File too big
**Solution**:
1. Compress image
2. Use smaller file
3. Max size is 100MB

### "Network Error"
**Problem**: Can't reach Pinata
**Solution**:
1. Check internet connection
2. Check firewall
3. Try different network

---

## 📋 What to Share With Me:

If it still doesn't work, share:

1. **Terminal output** (copy the emoji messages)
2. **Browser console** (Press F12, copy errors)
3. **File size** (how big is the image?)
4. **File type** (JPG, PNG, etc?)

---

## ✅ Expected Flow:

```
1. You select image
   ↓
2. Click "Post"
   ↓
3. Terminal shows: "📸 Upload API called"
   ↓
4. Terminal shows: "📁 File received: image.jpg"
   ↓
5. Terminal shows: "🔑 Pinata JWT: Found ✅"
   ↓
6. Terminal shows: "🚀 Uploading to Pinata..."
   ↓
7. Terminal shows: "✅ Upload successful!"
   ↓
8. Post appears with image!
```

---

## 🆘 Quick Checks:

### Check 1: Is server running?
```
✓ Ready in X seconds
○ Local: http://localhost:3000
```

### Check 2: Is .env correct?
```bash
type .env | Select-String "PINATA"
```
Should show long JWT token

### Check 3: Is file selected?
Look for file preview before posting

### Check 4: Is wallet connected?
Must connect wallet to post

---

## 🎯 DO THIS NOW:

1. **Restart server**: `npm run dev`
2. **Go to create page**: http://localhost:3000/create
3. **Select small image**: Try a small JPG first
4. **Click Post**
5. **Watch terminal**: See the emoji messages
6. **Share output**: Tell me what you see!

---

**The detailed logging will show exactly where it's failing!** 🔍
