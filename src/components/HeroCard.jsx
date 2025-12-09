// Hero Card component - displays hero with counters and synergies
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroCard({ hero, explanation, counters, synergies, isRecommendation = false }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const imageVariants = {
    initial: { scale: 0.8 },
    animate: { scale: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`
        relative rounded-lg overflow-hidden cursor-pointer backdrop-blur-sm transition-all duration-300
        ${isRecommendation 
          ? 'bg-gradient-to-br from-dota-red to-dota-accent border-2 border-dota-gold shadow-lg shadow-dota-gold/50' 
          : 'bg-dota-gray border border-dota-gold/30 hover:border-dota-gold/70'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hero Image */}
      <motion.div
        variants={imageVariants}
        className="relative w-full h-48 bg-dota-darker overflow-hidden"
      >
        <div className="w-full h-full bg-gradient-to-b from-dota-gold/10 to-transparent flex items-center justify-center">
          <span className="text-dota-gold/60 text-2xl font-bold">{hero.slice(0, 2).toUpperCase()}</span>
        </div>
      </motion.div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 space-y-3"
      >
        {/* Hero Name */}
        <h3 className={`
          text-lg font-bold truncate
          ${isRecommendation ? 'text-dota-gold' : 'text-white'}
        `}>
          {hero}
        </h3>

        {/* Explanation */}
        {explanation && (
          <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
            {explanation}
          </p>
        )}

        {/* Counters */}
        {counters && counters.length > 0 && (
          <div className="pt-2 border-t border-dota-gold/20">
            <p className="text-xs font-semibold text-dota-gold uppercase mb-1">Counters</p>
            <div className="flex flex-wrap gap-1">
              {counters.map((counter, idx) => (
                <span key={idx} className="text-xs bg-dota-red/40 text-red-200 px-2 py-1 rounded">
                  {counter}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Synergies */}
        {synergies && synergies.length > 0 && (
          <div className="pt-2 border-t border-dota-gold/20">
            <p className="text-xs font-semibold text-dota-gold uppercase mb-1">Synergies</p>
            <div className="flex flex-wrap gap-1">
              {synergies.map((synergy, idx) => (
                <span key={idx} className="text-xs bg-green-900/40 text-green-200 px-2 py-1 rounded">
                  {synergy}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation Badge */}
        {isRecommendation && (
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-bold text-dota-gold uppercase tracking-wider">
              ✓ Recommended
            </span>
            <div className="w-2 h-2 bg-dota-gold rounded-full animate-pulse" />
          </div>
        )}
      </motion.div>

      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-t from-dota-gold/5 to-transparent pointer-events-none rounded-lg"
        />
      )}
    </motion.div>
  );
}
