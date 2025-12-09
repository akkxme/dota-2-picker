@echo off
REM Setup and Run Script for Dota 2 Hero Picker (Windows)

echo.
echo ============================================
echo   Dota 2 Hero Picker - Setup Script
echo ============================================
echo.

REM Check Node.js installation
node --version >nul 2>&1
if errorlevel 1 (
    echo [X] Node.js is not installed!
    echo Please install from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js version: %NODE_VERSION%

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm version: %NPM_VERSION%
echo.

REM Check if .env.local exists
if not exist ".env.local" (
    echo [!] .env.local file not found!
    echo.
    echo Create .env.local with your OpenRouter API key:
    echo   1. Visit https://openrouter.ai
    echo   2. Sign up (free^)
    echo   3. Get your API key from the dashboard
    echo   4. Create .env.local file with:
    echo      NEXT_PUBLIC_OPENROUTER_KEY=your_api_key_here
    echo.
    echo Once created, run this script again.
    echo.
    pause
    exit /b 1
)

echo [OK] .env.local file found
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

if errorlevel 1 (
    echo [X] npm install failed!
    pause
    exit /b 1
)

echo [OK] Dependencies installed
echo.

REM Start development server
echo Starting development server...
echo.
echo [INFO] Open http://localhost:3000 in your browser
echo [INFO] Press Ctrl+C to stop the server
echo.

call npm run dev
pause
