# Dota 2 Hero Picker - Quick Start Guide

## ⚡ 30-Second Setup

1. **Get API Key** (FREE):
   - Visit https://openrouter.ai
   - Sign up (click "Sign up" or "Continue as Guest")
   - Click on your profile → API Keys
   - Copy your key

2. **Create `.env.local` file** in project root:
   ```
   NEXT_PUBLIC_OPENROUTER_KEY=your_key_here
   ```
   Replace `your_key_here` with the key you copied

3. **Install & Run**:
   ```bash
   npm install
   npm run dev
   ```

4. **Open** http://localhost:3000

## 🎮 Using the App

1. Click dropdown and select 1-5 enemy heroes
2. Click "Get Best Picks"
3. Read AI recommendations
4. Click 💬 chat bubble for more questions

## ✅ Quick Checklist

- [ ] Created `.env.local` file with API key
- [ ] Ran `npm install`
- [ ] Ran `npm run dev`
- [ ] Opened http://localhost:3000
- [ ] Selected enemy heroes
- [ ] Got recommendations

## 🆘 Still Not Working?

Check these:
1. Is `.env.local` file in the root folder (same level as `package.json`)?
2. Does your API key start with `sk-` or `sk_`?
3. Check browser console (F12) for error messages
4. Try a different hero from the dropdown

## 📚 More Help

- Read `README.md` for detailed documentation
- Check OpenRouter docs: https://openrouter.ai/docs
- Browser console (F12) shows detailed error messages
