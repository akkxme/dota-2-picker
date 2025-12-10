// Home page - Main application
import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSelector from '../components/HeroSelector';
import HeroCard from '../components/HeroCard';
import ChatBot from '../components/ChatBot';
import { getHeroRecommendations } from '../utils/openrouter';

export default function Home() {
  const [selectedEnemyHeroes, setSelectedEnemyHeroes] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  // Handle hero selection
  const handleSelectHero = (hero) => {
    setSelectedEnemyHeroes((prev) => [...prev, hero]);
  };

  // Handle hero removal
  const handleRemoveHero = (hero) => {
    setSelectedEnemyHeroes((prev) => prev.filter((h) => h !== hero));
    setRecommendations(null);
  };

  // Get recommendations from AI
  const handleGetRecommendations = async () => {
    if (selectedEnemyHeroes.length === 0) {
      setError('Please select at least one enemy hero');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getHeroRecommendations(selectedEnemyHeroes);
      setRecommendations(response);
      
      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Error getting recommendations:', err);
      setError(
        err.message.includes('API')
          ? `API Error: ${err.message}. Make sure your OpenRouter API key is set.`
          : `Error: ${err.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <Head>
        <title>Dota 2 Hero Picker | AI-Powered Counterpick Assistant</title>
        <meta name="description" content="Get AI-powered Dota 2 hero counterpick recommendations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23d4af37'>⚔</text></svg>" />
      </Head>

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-dota-red/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-dota-gold/5 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-8 pb-6 px-4 border-b border-dota-gold/20"
        >
          <div className="max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-3"
            >
              <span className="text-white">Dota </span>
              <span className="text-dota-gold">2</span>
              <span className="text-white"> Hero Picker</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-300 max-w-2xl"
            >
              Get AI-powered counterpick recommendations. Select enemy heroes and let our AI coach
              suggest your best picks with tactical explanations.
            </motion.p>
          </div>
        </motion.header>

        {/* Main Container */}
        <main className="flex-1 px-4 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto space-y-12"
          >
            {/* Hero Selection Section */}
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="p-8 rounded-lg border-2 border-dota-gold/30 bg-dota-gray/50 backdrop-blur-sm">
                <HeroSelector
                  selectedHeroes={selectedEnemyHeroes}
                  onSelect={handleSelectHero}
                  onRemove={handleRemoveHero}
                />
              </div>

              {/* Get Recommendations Button */}
              <motion.button
                onClick={handleGetRecommendations}
                disabled={selectedEnemyHeroes.length === 0 || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  w-full py-4 rounded-lg font-bold text-lg transition-all duration-300
                  ${isLoading || selectedEnemyHeroes.length === 0
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-dota-red to-dota-accent text-dota-gold hover:shadow-lg hover:shadow-dota-gold/50'}
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block"
                    >
                      ⚙
                    </motion.span>
                    Analyzing...
                  </div>
                ) : (
                  `Get Best Picks (${selectedEnemyHeroes.length} selected)`
                )}
              </motion.button>
            </motion.section>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-lg bg-red-900/30 border border-red-500/50 text-red-200"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recommendations Section */}
            <AnimatePresence mode="wait">
              {recommendations && (
                <motion.section
                  ref={resultsRef}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  key="recommendations"
                  className="space-y-6"
                >
                  {/* Results Header */}
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-dota-gold">AI Recommendations</h2>
                    <p className="text-gray-400">
                      vs. {selectedEnemyHeroes.join(', ')}
                    </p>
                  </div>

                  {/* AI Response */}
                  <div className="p-6 rounded-lg border-2 border-dota-gold/30 bg-dota-red/10 backdrop-blur-sm space-y-4">
                    <div className="prose prose-invert max-w-none text-gray-200">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {recommendations}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 rounded-lg bg-dota-gold/5 border border-dota-gold/20 text-sm text-gray-400">
                    <p>💡 Use the chat bubble on the bottom-right to ask follow-up questions about these recommendations.</p>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Info Cards - When no recommendations */}
            {!recommendations && (
              <motion.section variants={itemVariants} className="grid md:grid-cols-3 gap-6 mt-8 pointer-events-none">
                <div className="p-6 rounded-lg border border-dota-gold/30 bg-dota-gray/50 backdrop-blur-sm pointer-events-auto">
                  <h3 className="text-dota-gold font-bold mb-2 flex items-center gap-2">
                    <span>🎯</span> How It Works
                  </h3>
                  <p className="text-sm text-gray-400">
                    Select enemy heroes, and our AI will analyze matchups to recommend your best counterpicks.
                  </p>
                </div>
                <div className="p-6 rounded-lg border border-dota-gold/30 bg-dota-gray/50 backdrop-blur-sm pointer-events-auto">
                  <h3 className="text-dota-gold font-bold mb-2 flex items-center gap-2">
                    <span>💬</span> Ask Anything
                  </h3>
                  <p className="text-sm text-gray-400">
                    Use the chat bubble to ask follow-up questions about heroes, items, and strategies.
                  </p>
                </div>
                <div className="p-6 rounded-lg border border-dota-gold/30 bg-dota-gray/50 backdrop-blur-sm pointer-events-auto">
                  <h3 className="text-dota-gold font-bold mb-2 flex items-center gap-2">
                    <span>⚡</span> Instant Analysis
                  </h3>
                  <p className="text-sm text-gray-400">
                    Powered by cutting-edge AI to give you tactical insights in seconds.
                  </p>
                </div>
              </motion.section>
            )}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="mt-12 px-4 py-8 border-t border-dota-gold/20 text-center text-gray-500 text-sm">
          <p>Dota 2 Hero Picker | AI-Powered by OpenRouter & gpt-oss-20b</p>
          <p className="mt-2">Get better pickups. Win more games. 🎮</p>
        </footer>
      </div>

      {/* ChatBot */}
      <ChatBot />
    </>
  );
}
