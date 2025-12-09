module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dota: {
          dark: '#0a0a0a',
          darker: '#050505',
          red: '#992d2d',
          gold: '#d4af37',
          accent: '#8b0000',
          gray: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(217, 175, 55, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(217, 175, 55, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};
