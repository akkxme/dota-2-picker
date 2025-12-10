// Hero Selector component - for selecting enemy heroes
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { POPULAR_HEROES } from '../utils/heroes';

export default function HeroSelector({ selectedHeroes, onSelect, onRemove }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter heroes based on search term and already selected
  const filteredHeroes = POPULAR_HEROES.filter(
    (hero) =>
      hero.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedHeroes.includes(hero)
  );

  const handleSelectHero = (hero) => {
    if (selectedHeroes.length < 5) {
      onSelect(hero);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-dota-gold mb-2">Enemy Team</h2>
        <p className="text-gray-400 text-sm">Select up to 5 enemy heroes</p>
      </div>

      {/* Selected Heroes Display */}
      <motion.div className="flex flex-wrap gap-3 mb-6">
        <AnimatePresence mode="popLayout">
          {selectedHeroes.map((hero, idx) => (
            <motion.div
              key={hero}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative group"
            >
              <div className="
                relative px-4 py-2 rounded-lg border-2 border-dota-gold
                bg-gradient-to-r from-dota-red to-dota-accent
                text-dota-gold font-semibold text-sm
                flex items-center gap-2
                hover:shadow-lg hover:shadow-dota-gold/50
                transition-all duration-200
              ">
                <span>{hero}</span>
                <button
                  onClick={() => onRemove(hero)}
                  className="ml-1 hover:text-red-300 transition-colors"
                  aria-label={`Remove ${hero}`}
                >
                  ✕
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Dropdown Selector */}
      <div ref={dropdownRef} className="relative z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="
            w-full px-4 py-3 rounded-lg border-2 border-dota-gold/50
            bg-dota-gray text-left text-white font-medium
            hover:border-dota-gold hover:bg-dota-gray/80
            transition-all duration-200
            flex items-center justify-between
            group
          "
        >
          <span className="group-hover:text-dota-gold transition-colors">
            {selectedHeroes.length >= 5 ? 'Team Complete' : 'Select a hero...'}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-dota-gold"
          >
            ▼
          </motion.span>
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                absolute top-full left-0 right-0 mt-2 z-[9999]
                bg-dota-gray border-2 border-dota-gold/50
                rounded-lg overflow-hidden shadow-2xl shadow-black/50
              "
            >
              {/* Search Input */}
              <div className="p-3 border-b border-dota-gold/20">
                <input
                  type="text"
                  placeholder="Search heroes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="
                    w-full px-3 py-2 rounded bg-dota-darker
                    text-white placeholder-gray-500
                    border border-dota-gold/30 focus:border-dota-gold
                    outline-none transition-colors
                  "
                  autoFocus
                />
              </div>

              {/* Hero List */}
              <div className="max-h-64 overflow-y-auto">
                {filteredHeroes.length > 0 ? (
                  <motion.div className="space-y-1 p-2">
                    {filteredHeroes.map((hero, idx) => (
                      <motion.button
                        key={hero}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: idx * 0.02 }}
                        onClick={() => handleSelectHero(hero)}
                        className="
                          w-full text-left px-4 py-2 rounded
                          text-white hover:bg-dota-red/50
                          transition-colors duration-150
                          font-medium text-sm
                          hover:text-dota-gold
                        "
                      >
                        {hero}
                      </motion.button>
                    ))}
                  </motion.div>
                ) : (
                  <div className="p-4 text-center text-gray-400 text-sm">
                    No heroes found
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <p className="mt-3 text-xs text-gray-500">
        {selectedHeroes.length}/5 heroes selected
      </p>
    </div>
  );
}
