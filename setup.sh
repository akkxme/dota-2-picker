#!/bin/bash
# Setup and Run Script for Dota 2 Hero Picker

echo "🎮 Dota 2 Hero Picker - Setup Script"
echo "===================================="
echo ""

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local file not found!"
    echo ""
    echo "📝 Create .env.local with your OpenRouter API key:"
    echo "   1. Visit https://openrouter.ai"
    echo "   2. Sign up (free)"
    echo "   3. Get your API key from the dashboard"
    echo "   4. Create .env.local file with:"
    echo "      NEXT_PUBLIC_OPENROUTER_KEY=your_api_key_here"
    echo ""
    echo "Once created, run this script again."
    exit 1
fi

echo "✅ .env.local file found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed!"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Build (optional)
# echo "🔨 Building project..."
# npm run build

# Start development server
echo "🚀 Starting development server..."
echo "🌐 Open http://localhost:3000 in your browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
