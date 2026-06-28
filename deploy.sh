#!/bin/bash

# RiskyShop Deployment Script with Error Handling
# Usage: ./deploy.sh 2>&1 | tee deploy.log

set -e

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="deploy_${TIMESTAMP// /-}.log"

echo "[${TIMESTAMP}] ========================================" 2>&1
echo "[${TIMESTAMP}] RiskyShop Deployment Started" 2>&1
echo "[${TIMESTAMP}] ========================================" 2>&1

# Function untuk error handling
error_exit() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ❌ ERROR: $1" 2>&1
    exit 1
}

success_msg() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ $1" 2>&1
}

info_msg() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ℹ️  $1" 2>&1
}

# Step 1: Check prerequisites
info_msg "Checking prerequisites..." 2>&1
command -v node >/dev/null 2>&1 || error_exit "Node.js not found"
command -v npm >/dev/null 2>&1 || error_exit "npm not found"
command -v git >/dev/null 2>&1 || error_exit "git not found"
success_msg "Prerequisites check passed" 2>&1

# Step 2: Check git status
info_msg "Checking git status..." 2>&1
if [ -n "$(git status --porcelain)" ]; then
    error_exit "Working directory not clean. Commit or stash changes first."
fi
success_msg "Git status clean" 2>&1

# Step 3: Install dependencies
info_msg "Installing dependencies..." 2>&1
npm install 2>&1 || error_exit "npm install failed"
success_msg "Dependencies installed" 2>&1

# Step 4: Generate Prisma client
info_msg "Generating Prisma client..." 2>&1
npx prisma generate 2>&1 || error_exit "Prisma generate failed"
success_msg "Prisma client generated" 2>&1

# Step 5: Build Next.js
info_msg "Building Next.js application..." 2>&1
npm run build 2>&1 || error_exit "Next.js build failed"
success_msg "Next.js build completed" 2>&1

# Step 6: Push to GitHub
info_msg "Pushing to GitHub..." 2>&1
git push origin master 2>&1 || error_exit "git push failed"
success_msg "Pushed to GitHub" 2>&1

# Step 7: Done
echo "" 2>&1
echo "[$(date '+%Y-%m-%d %H:%M:%S')] ========================================" 2>&1
echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Deployment Completed Successfully!" 2>&1
echo "[$(date '+%Y-%m-%d %H:%M:%S')] ========================================" 2>&1
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Vercel auto-deploy triggered" 2>&1
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Check dashboard: https://vercel.com/fars-md/risky-shop" 2>&1
echo "" 2>&1
