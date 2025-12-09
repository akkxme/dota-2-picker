# Dota 2 Hero Picker - Deployment Guide

## Deploying to Vercel (Recommended)

### Quick Deploy (5 minutes)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Add Environment Variable**:
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add `NEXT_PUBLIC_OPENROUTER_KEY` with your API key
   - Redeploy

### Using Vercel Dashboard

1. Push your code to GitHub
2. Visit https://vercel.com/new
3. Import your repository
4. Add `NEXT_PUBLIC_OPENROUTER_KEY` environment variable
5. Click Deploy

## Deploying to Other Platforms

### Netlify
```bash
npm run build
# Upload dist folder to Netlify
# Add NEXT_PUBLIC_OPENROUTER_KEY in build settings
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NEXT_PUBLIC_OPENROUTER_KEY=your_key_here
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual Server (Ubuntu/Linux)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone your-repo
cd dota-2-picker
npm install
echo "NEXT_PUBLIC_OPENROUTER_KEY=your_key_here" > .env.local
npm run build

# Run with PM2 (recommended)
npm install -g pm2
pm2 start "npm start" --name "dota-picker"
```

## Environment Variables

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_OPENROUTER_KEY` - Your OpenRouter API key

The `NEXT_PUBLIC_` prefix makes it available in the browser (safe for API calls).

## Performance Tips

1. **Caching** - Responses are cached in browser
2. **CDN** - Vercel automatically uses CDN
3. **Optimization** - Images are optimized via Next.js

## Monitoring

Check your API usage at: https://openrouter.ai/account

## Custom Domain

### Vercel
1. Go to Vercel dashboard
2. Project → Settings → Domains
3. Add your domain and follow DNS setup

### Other platforms follow their domain setup guides

## SSL/HTTPS

- Vercel: Automatic ✓
- Netlify: Automatic ✓
- Most platforms: Usually automatic

## Troubleshooting Deployment

### Build fails
```bash
# Clear cache locally
rm -rf .next
npm run build
```

### API key not working after deployment
- Double-check `NEXT_PUBLIC_OPENROUTER_KEY` in environment variables
- Ensure no extra spaces in the key
- Try redeploying after adding the key

### Rate limiting on live site
- Check OpenRouter quota
- Consider upgrading your plan
- Implement request caching on backend

## Cost Estimates

- **OpenRouter free tier**: Limited free API calls
- **Hosting**: Vercel free tier includes 100 GB bandwidth/month
- **Scale up**: When needed, upgrade OpenRouter or use paid hosting

## Next Steps

1. Deploy to your chosen platform
2. Share your URL with friends
3. Get feedback and improve!
