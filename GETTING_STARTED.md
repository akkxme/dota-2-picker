🚀 GETTING STARTED - DOTA 2 HERO PICKER

═══════════════════════════════════════════════════════════════════════════════
STEP 1: GET YOUR FREE API KEY (2 MINUTES)
═══════════════════════════════════════════════════════════════════════════════

1. Go to: https://openrouter.ai

2. Click "Sign Up" or "Continue as Guest"

3. If signing up:
   - Enter email
   - Verify email
   - Click "Get Started"

4. Find your API key:
   - Click your profile (top right)
   - Select "API Keys"
   - Copy your key (starts with sk-)

5. Save it somewhere safe! You'll need it in the next step.

═══════════════════════════════════════════════════════════════════════════════
STEP 2: CREATE ENVIRONMENT FILE (1 MINUTE)
═══════════════════════════════════════════════════════════════════════════════

1. Open your project folder: dota-2-picker

2. Create a new file named: .env.local
   (note: starts with a dot, no .txt extension)

3. Add this line to the file:
   NEXT_PUBLIC_OPENROUTER_KEY=your_api_key_here

4. Replace "your_api_key_here" with your actual API key from Step 1

5. Save the file

Example:
   NEXT_PUBLIC_OPENROUTER_KEY=sk-1a2b3c4d5e6f7g8h9i0j

═══════════════════════════════════════════════════════════════════════════════
STEP 3: INSTALL & RUN (2-3 MINUTES)
═══════════════════════════════════════════════════════════════════════════════

OPTION A: Using Command Line (Recommended)
────────────────────────────────────────────

1. Open PowerShell or Command Prompt in the project folder

2. Run these commands:
   npm install
   npm run dev

3. Wait for "ready - started server on 0.0.0.0:3000"

4. Open your browser: http://localhost:3000

OPTION B: Using Setup Script (Easiest for Windows)
───────────────────────────────────────────────────

1. Double-click: setup.bat
2. The script will:
   - Check Node.js
   - Check .env.local
   - Install dependencies
   - Start the app
3. Open: http://localhost:3000

═══════════════════════════════════════════════════════════════════════════════
STEP 4: TEST THE APP (2 MINUTES)
═══════════════════════════════════════════════════════════════════════════════

1. You should see the Dota 2 Hero Picker home page

2. Try these steps:
   ✓ Click "Select a hero..." dropdown
   ✓ Type "axe" to search
   ✓ Click "Axe" to select it
   ✓ Add 1-2 more heroes
   ✓ Click "Get Best Picks"
   ✓ Wait for AI analysis (5-10 seconds)
   ✓ See recommendations appear
   ✓ Click 💬 chat bubble
   ✓ Ask "Why is X good against Y?"

3. If everything works → Success! 🎉

═══════════════════════════════════════════════════════════════════════════════
❌ TROUBLESHOOTING
═══════════════════════════════════════════════════════════════════════════════

Problem: "Cannot find module 'next'"
Solution: Make sure to run: npm install

Problem: "NEXT_PUBLIC_OPENROUTER_KEY is not set"
Solution: 
  - Verify .env.local exists in project root
  - Check the file has NEXT_PUBLIC_OPENROUTER_KEY=sk-xxxxx
  - Restart npm with: npm run dev

Problem: "API Error: Invalid key"
Solution:
  - Go to https://openrouter.ai/account
  - Check you're logged in
  - Copy the correct API key
  - Update .env.local
  - Restart npm

Problem: App runs but API calls fail
Solution:
  - Check browser console (F12)
  - Look for error messages
  - Verify API key is correct
  - Check https://openrouter.ai/account for quota

Problem: Port 3000 already in use
Solution: 
  Run: npm run dev -- -p 3001
  (Uses port 3001 instead)

═══════════════════════════════════════════════════════════════════════════════
✅ CHECKLIST
═══════════════════════════════════════════════════════════════════════════════

Before calling it done, verify:

□ Got API key from OpenRouter
□ Created .env.local file
□ Added API key to .env.local
□ Ran npm install
□ Ran npm run dev
□ App opens at http://localhost:3000
□ Can select heroes from dropdown
□ "Get Best Picks" button works
□ AI returns recommendations
□ Chat bubble responds to messages
□ App looks like Dota 2 theme (dark, red, gold)

═══════════════════════════════════════════════════════════════════════════════
📖 NEED HELP?
═══════════════════════════════════════════════════════════════════════════════

1. Read QUICKSTART.md (30-second summary)
2. Read README.md (detailed documentation)
3. Check DEPLOYMENT.md (if deploying online)
4. Look at EXAMPLES.md (code examples)
5. Browser console (F12) shows error messages

═══════════════════════════════════════════════════════════════════════════════
🎯 NEXT STEPS
═══════════════════════════════════════════════════════════════════════════════

After confirming everything works:

1. Test with different hero combinations
2. Ask follow-up questions in chat
3. Deploy to Vercel (see DEPLOYMENT.md)
4. Share link with Dota 2 friends
5. Get feedback and improve

═══════════════════════════════════════════════════════════════════════════════
💡 PRO TIPS
═══════════════════════════════════════════════════════════════════════════════

• The AI knows all Dota 2 heroes and their matchups
• Ask it about items, strategies, lane matchups, etc.
• Select diverse heroes for better analysis
• The more heroes you select (up to 5), the better the analysis
• Each chat message is independent - ask follow-ups!
• Free API tier has rate limiting - wait between requests

═══════════════════════════════════════════════════════════════════════════════
🎮 READY? LET'S GO!
═══════════════════════════════════════════════════════════════════════════════

Follow the steps above and you'll be analyzing Dota 2 heroes with AI in minutes!

Questions? Check the documentation files or your browser console.

Good luck on the Rift! ⚔️🎮
