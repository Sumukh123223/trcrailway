# 🚀 Railway Backend Deployment Guide

## 🎯 Complete Setup for Secure TRON Scanner Backend

### Step 1: Prepare Your Server Wallet

1. **Create a new TRON wallet** (don't use your main wallet):
   - Go to TronLink or any TRON wallet
   - Create new wallet
   - **Save private key and address securely**

2. **Fund your server wallet**:
   - Send **1000+ TRX** to your server wallet
   - This will be used to auto-send 17 TRX to users

### Step 2: Deploy to Railway

1. **Push code to GitHub**:
   ```bash
   cd railway-backend
   git init
   git add .
   git commit -m "Initial TRON scanner backend"
   git push origin main
   ```

2. **Create Railway project**:
   - Go to https://railway.app/
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Set environment variables** in Railway dashboard:
   ```
   TRON_PRIVATE_KEY=your_private_key_here
   TRON_ADDRESS=your_tron_address_here
   AUTO_SEND_AMOUNT=17
   MINIMUM_BALANCE=1
   NODE_ENV=production
   ```

### Step 3: Update Frontend

1. **Add backend integration** to your frontend:
   ```html
   <script src="frontend-integration.js"></script>
   ```

2. **Update backend URL** in `frontend-integration.js`:
   ```javascript
   const backend = new TronBackendIntegration('https://your-railway-backend.railway.app');
   ```

3. **Add to your index.html**:
   ```html
   <script src="frontend-integration.js"></script>
   <script>
       // When user connects wallet
       function connectWallet() {
           const userAddress = getUserAddress(); // Your existing function
           onWalletConnect(userAddress);
       }
   </script>
   ```

## 🔧 How It Works

### User Flow:
1. **User visits your TRON scanner**
2. **User connects wallet**
3. **Backend checks balance** automatically
4. **If balance < 1 TRX**, backend sends 17 TRX
5. **User can now use scanner** with sufficient balance

### Backend Features:
- ✅ **Secure private key storage** in Railway environment
- ✅ **Automatic TRX sending** when user needs funding
- ✅ **Rate limiting** to prevent abuse
- ✅ **Balance monitoring** and validation
- ✅ **Transaction status tracking**

## 📡 API Endpoints

Your Railway backend will provide:

### Health Check
```
GET https://your-backend.railway.app/health
```

### Check Balance
```
POST https://your-backend.railway.app/check-balance
Body: { "userAddress": "TUserAddress..." }
```

### Auto Send TRX
```
POST https://your-backend.railway.app/send-trx
Body: { "userAddress": "TUserAddress..." }
```

### Transaction Status
```
POST https://your-backend.railway.app/transaction-status
Body: { "transactionId": "tx_hash..." }
```

## 🔒 Security Features

- ✅ **Private keys stored securely** in Railway environment
- ✅ **Rate limiting** (100 requests per 15 minutes)
- ✅ **CORS protection** (only your domains allowed)
- ✅ **Input validation** for all requests
- ✅ **Error handling** without exposing sensitive data

## 💰 Cost Management

### Server Wallet Management:
- **Initial funding**: 1000+ TRX recommended
- **Auto-send amount**: 17 TRX per user
- **Minimum balance**: 1 TRX (users keep this)
- **Monitor balance**: Set up alerts when < 100 TRX

### Railway Costs:
- **Free tier**: $5 credit monthly
- **Hobby plan**: $5/month for unlimited deployments
- **Usage-based**: Pay for actual compute time

## 🧪 Testing

### Test Your Backend:
1. **Health check**: Visit `https://your-backend.railway.app/health`
2. **Test with your address**: Use the API endpoints
3. **Check logs**: Monitor Railway dashboard for errors

### Test Frontend Integration:
1. **Connect wallet** with low balance
2. **Verify auto-funding** works
3. **Check notifications** appear correctly

## 📊 Monitoring

### Railway Dashboard:
- Monitor server logs
- Check environment variables
- View deployment status
- Monitor resource usage

### TRON Network:
- Check transaction confirmations
- Monitor server wallet balance
- Set up balance alerts

## 🔄 Updates

To update your backend:
```bash
# Make changes to code
git add .
git commit -m "Update backend"
git push origin main
# Railway will auto-deploy
```

## ⚠️ Important Security Notes

1. **Never commit private keys** to Git
2. **Use dedicated wallet** for server operations
3. **Monitor server logs** regularly
4. **Set up balance alerts** to refill server wallet
5. **Test thoroughly** before going live

## 🆘 Troubleshooting

### Common Issues:

#### "Insufficient server funds"
- Add more TRX to your server wallet
- Check server balance in `/server-info` endpoint

#### "CORS errors"
- Update `ALLOWED_ORIGINS` in Railway environment
- Add your frontend domain to CORS settings

#### "Rate limiting"
- Increase `RATE_LIMIT_MAX` if needed
- Implement proper request queuing

#### "Transaction failures"
- Check TRON network status
- Verify private key is correct
- Ensure server wallet has sufficient balance

Your TRON scanner now has a secure, automatic TRX funding system! 🚀

## 📞 Support

If you need help:
1. Check Railway logs first
2. Verify environment variables
3. Test API endpoints manually
4. Check TRON network status
