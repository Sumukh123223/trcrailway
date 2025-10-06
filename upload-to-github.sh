#!/bin/bash

echo "🚀 Uploading TRX Top-up Server to GitHub..."

# Navigate to railway-backend directory
cd railway-backend

echo "📁 Current directory: $(pwd)"
echo "📋 Files in directory:"
ls -la

# Initialize git repository
echo "🔧 Initializing git repository..."
git init

# Add remote origin
echo "🔗 Adding remote origin..."
git remote add origin https://github.com/Sumukh123223/trx-top-up-server-.git

# Add all files
echo "📦 Adding files to git..."
git add .

# Commit files
echo "💾 Committing files..."
git commit -m "Initial TRX top-up server for Railway deployment

Features:
- Automatic TRX funding when user balance < 1 TRX
- Secure private key storage in Railway environment
- Rate limiting and CORS protection
- Complete API endpoints for balance checking and auto-funding
- Ready for Railway deployment"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo "✅ Successfully uploaded to GitHub!"
echo "🌐 Repository: https://github.com/Sumukh123223/trx-top-up-server-"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://railway.app/"
echo "2. Create new project from GitHub repo"
echo "3. Select: Sumukh123223/trx-top-up-server-"
echo "4. Add environment variables in Railway dashboard"
echo "5. Deploy!"
