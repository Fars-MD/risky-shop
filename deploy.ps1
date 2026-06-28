# RiskyShop Deployment Script (PowerShell)
# Usage: .\deploy.ps1 2>&1 | Tee-Object -FilePath "deploy_$(Get-Date -Format 'yyyy-MM-dd_HHmmss').log"

param(
    [switch]$SkipBuild = $false,
    [switch]$DryRun = $false
)

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$logFile = "deploy_$(Get-Date -Format 'yyyy-MM-dd_HHmmss').log"

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $logMsg = "[$timestamp] [$Level] $Message"
    Write-Host $logMsg
    Add-Content -Path $logFile -Value $logMsg
}

function Test-Command {
    param([string]$Command)
    if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) {
        Write-Log "Command not found: $Command" "ERROR"
        exit 1
    }
}

# Header
Write-Log "========================================" "START"
Write-Log "RiskyShop Deployment Started" "START"
Write-Log "========================================" "START"

try {
    # Step 1: Check prerequisites
    Write-Log "Checking prerequisites..." "INFO"
    Test-Command "node"
    Test-Command "npm"
    Test-Command "git"
    Write-Log "Prerequisites check passed" "SUCCESS"

    # Step 2: Check git status
    Write-Log "Checking git status..." "INFO"
    $gitStatus = git status --porcelain 2>&1
    if ($gitStatus) {
        Write-Log "Working directory not clean: $gitStatus" "ERROR"
        exit 1
    }
    Write-Log "Git status clean" "SUCCESS"

    # Step 3: Install dependencies
    Write-Log "Installing dependencies..." "INFO"
    if (-not $SkipBuild) {
        npm install 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Log "npm install failed" "ERROR"
            exit 1
        }
        Write-Log "Dependencies installed" "SUCCESS"
    }

    # Step 4: Generate Prisma client
    Write-Log "Generating Prisma client..." "INFO"
    npx prisma generate 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Log "Prisma generate failed" "ERROR"
        exit 1
    }
    Write-Log "Prisma client generated" "SUCCESS"

    # Step 5: Build Next.js
    Write-Log "Building Next.js application..." "INFO"
    if (-not $SkipBuild) {
        npm run build 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Log "Next.js build failed" "ERROR"
            exit 1
        }
        Write-Log "Next.js build completed" "SUCCESS"
    }

    # Step 6: Push to GitHub (if not dry-run)
    if (-not $DryRun) {
        Write-Log "Pushing to GitHub..." "INFO"
        git push origin master 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Log "git push failed" "ERROR"
            exit 1
        }
        Write-Log "Pushed to GitHub" "SUCCESS"
    } else {
        Write-Log "DRY RUN: Skipping git push" "INFO"
    }

    # Success
    Write-Log "" "INFO"
    Write-Log "========================================" "SUCCESS"
    Write-Log "✅ Deployment Completed Successfully!" "SUCCESS"
    Write-Log "========================================" "SUCCESS"
    Write-Log "Vercel auto-deploy triggered" "INFO"
    Write-Log "Check dashboard: https://vercel.com/fars-md/risky-shop" "INFO"
    Write-Log "" "INFO"

} catch {
    Write-Log "Deployment failed: $_" "ERROR"
    exit 1
}
