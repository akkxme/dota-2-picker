# Dota 2 Hero Picker - AI-Powered Counterpick Assistant

A modern, fully-responsive web application that helps Dota 2 players choose the best hero counterpicks using AI-powered recommendations.

## 🎯 Features

- **Dark Dota 2-Themed UI** - Black, red, and gold color scheme with smooth animations
- **AI Chatbot** - Floating draggable chat interface powered by OpenRouter's gpt-oss-20b model
- **Hero Selection** - Interactive dropdown with popular Dota 2 heroes
- **Smart Recommendations** - AI analyzes enemy heroes and suggests counters
- **Responsive Design** - Works on desktop and mobile devices
- **Smooth Animations** - Built with Framer Motion for polished UX
- **Real-time Interaction** - Get instant hero recommendations and tactical insights

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS with custom Dota 2 theme
- **Animations**: Framer Motion
- **AI API**: OpenRouter (gpt-oss-20b model)
- **State Management**: React Hooks

## 📋 Prerequisites

- Node.js 16+ and npm
- OpenRouter API key (free account at https://openrouter.ai)

## 🔧 Installation & Setup

### 1. Clone or navigate to the project directory
```bash
cd dota-2-picker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:
```bash
# Copy your OpenRouter API key from https://openrouter.ai/keys
NEXT_PUBLIC_OPENROUTER_KEY=your_api_key_here
```

**Important**: Get your free API key from [OpenRouter](https://openrouter.ai):
1. Visit https://openrouter.ai
2. Sign up for free (or log in)
3. Go to your API keys section
4. Create a new API key
5. Copy it to `.env.local`

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
dota-2-picker/
├── src/
│   ├── components/
│   │   ├── HeroSelector.jsx    # Enemy hero selection dropdown
│   │   ├── ChatBot.jsx         # Floating AI chat interface
│   │   └── HeroCard.jsx        # Hero recommendation card
│   ├── pages/
│   │   ├── index.jsx           # Main home page
│   │   ├── _app.jsx            # Next.js app wrapper
│   │   └── _document.jsx       # Next.js document
│   ├── styles/
│   │   └── globals.css         # Global styles and animations
│   └── utils/
│       ├── openrouter.js       # API integration helper
│       └── heroes.js           # Hero data and utilities
├── public/                      # Static assets
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── .env.local                  # Environment variables (create this)
```

## 🎮 How to Use

1. **Select Enemy Heroes**
   - Click the "Select a hero..." dropdown
   - Search for heroes by name
   - Click to add (up to 5 heroes)
   - Remove heroes by clicking the ✕ button

2. **Get Recommendations**
   - Click "Get Best Picks" button
   - Wait for AI analysis (~5-10 seconds)
   - Review recommendations and tactical insights

3. **Ask Follow-up Questions**
   - Click the 💬 chat bubble in bottom-right
   - Ask about specific heroes, matchups, or strategies
   - Drag the chat window to reposition it

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.js`:
```js
colors: {
  dota: {
    dark: '#0a0a0a',
    gold: '#d4af37',
    red: '#992d2d',
    // ... customize colors
  },
}
```

### Modify AI Behavior
Edit system prompts in `src/utils/openrouter.js`:
- Adjust `temperature` for more/less creative responses
- Change `max_tokens` for longer/shorter responses
- Modify the system prompt for different personalities

### Add More Heroes
Edit `src/utils/heroes.js`:
```js
export const POPULAR_HEROES = [
  'Hero Name 1',
  'Hero Name 2',
  // ... add more
];
```

## 📊 Model Information

- **Model**: gpt-oss-20b
- **Provider**: OpenRouter
- **Cost**: Free tier available
- **Response Speed**: ~5-10 seconds

## 🐛 Troubleshooting

### "API Error: No API key provided"
- Check your `.env.local` file exists
- Verify `NEXT_PUBLIC_OPENROUTER_KEY` is set correctly
- Make sure there are no spaces or quotes around the key

### Chat not responding
- Check browser console for error messages (F12)
- Verify your OpenRouter API key is valid
- Check your API quota at https://openrouter.ai

### Slow responses
- OpenRouter free tier may have rate limiting
- Try again after a few seconds
- Consider upgrading your OpenRouter account for faster speeds

### Styling issues
- Clear browser cache (Ctrl+Shift+Delete)
- Run `npm run build` to rebuild Tailwind CSS

## 🚀 Production Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Then add your environment variable in Vercel dashboard:
- Go to Settings → Environment Variables
- Add `NEXT_PUBLIC_OPENROUTER_KEY` with your API key

### Build for production
```bash
npm run build
npm start
```

## 📚 API Documentation

### askAI(messages)
Send a message array to the AI:
```js
const response = await askAI([
  { role: 'system', content: 'You are a Dota 2 expert' },
  { role: 'user', content: 'Question about heroes' }
]);
```

### getHeroRecommendations(enemyHeroes)
Get recommendations for selected enemy heroes:
```js
const recommendations = await getHeroRecommendations(['Axe', 'Pudge']);
```

## 🎓 Learning Resources

- [Dota 2 Wiki](https://dota2.fandom.com/)
- [OpenRouter Docs](https://openrouter.ai/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 📝 License

Open source project for learning and personal use.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 💡 Tips for Best Results

1. **Select a balanced team** - Mix different hero types (carry, support, mid, offlane)
2. **Ask follow-up questions** - The AI can provide more detailed insights
3. **Consider patch notes** - Hero strengths change with updates
4. **Learn from recommendations** - Understanding WHY a hero works helps you improve

## 🎯 Future Enhancements

- [ ] Integration with OpenDota API for live match analysis
- [ ] Save favorite hero combinations
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Win rate statistics per hero matchup
- [ ] Voice input for hero selection
- [ ] Item recommendation integration

---

**Built with ❤️ for Dota 2 players**

Questions? Check the troubleshooting section or reach out in the issues!
