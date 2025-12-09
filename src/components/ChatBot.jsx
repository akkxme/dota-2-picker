// ChatBot component - floating AI chat interface
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { askAI } from '../utils/openrouter';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hey! I\'m your Dota 2 hero pick assistant. Ask me anything about hero matchups, counters, or strategies!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle drag
  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartPos.current.x,
      y: e.clientY - dragStartPos.current.y,
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, position]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare messages for API
      const apiMessages = [
        {
          role: 'system',
          content: 'You are a professional Dota 2 coach and expert. Answer questions about heroes, strategies, matchups, and game mechanics concisely.',
        },
        ...messages
          .filter((msg) => msg.id !== 1) // Skip initial greeting
          .map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        { role: 'user', content: inputValue },
      ];

      const response = await askAI(apiMessages);

      if (response.error) {
        throw new Error(response.error.message);
      }

      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: response.choices[0]?.message?.content || 'Unable to get response',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: `Error: ${error.message}. Make sure your OpenRouter API key is set in environment variables.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const chatVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Chat Bubble / Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`
          fixed bottom-6 right-6 z-40
          w-14 h-14 rounded-full
          flex items-center justify-center
          font-bold text-lg
          transition-all duration-300
          shadow-lg shadow-black/50
          ${isOpen
            ? 'bg-dota-red border-2 border-dota-gold text-white'
            : 'bg-gradient-to-br from-dota-red to-dota-accent border-2 border-dota-gold text-dota-gold hover:shadow-dota-gold/50'}
        `}
        style={{ transform: isOpen ? 'scale(1)' : 'scale(1)' }}
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed bottom-24 right-6 z-50
              w-96 max-w-[calc(100vw-2rem)]
              h-96 rounded-lg
              bg-gradient-to-br from-dota-gray to-dota-darker
              border-2 border-dota-gold
              shadow-2xl shadow-black/70
              flex flex-col
              overflow-hidden
            "
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseMove={isDragging ? handleDragMove : undefined}
          >
            {/* Header - Draggable */}
            <div
              onMouseDown={handleDragStart}
              className="
                px-4 py-3 border-b border-dota-gold/30
                bg-gradient-to-r from-dota-red to-dota-accent
                cursor-grab active:cursor-grabbing
                flex items-center justify-between
              "
            >
              <h3 className="text-white font-bold text-sm">Dota 2 Coach</h3>
              <span className="text-xs text-dota-gold">Drag to move</span>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-dota-gold/30 scrollbar-track-transparent">
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-xs px-3 py-2 rounded-lg text-sm leading-relaxed
                        ${msg.role === 'user'
                          ? 'bg-dota-red text-white rounded-br-none'
                          : 'bg-dota-red/30 text-gray-200 rounded-bl-none border border-dota-gold/30'}
                      `}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="px-3 py-2 rounded-lg bg-dota-red/30 border border-dota-gold/30">
                    <div className="flex gap-1">
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 bg-dota-gold rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-dota-gold rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-dota-gold rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="border-t border-dota-gold/30 p-3 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about heroes..."
                disabled={isLoading}
                className="
                  flex-1 px-3 py-2 rounded bg-dota-darker
                  text-white text-sm placeholder-gray-500
                  border border-dota-gold/30 focus:border-dota-gold
                  outline-none transition-colors
                  disabled:opacity-50
                "
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="
                  px-3 py-2 rounded bg-dota-gold/20
                  text-dota-gold font-bold text-sm
                  hover:bg-dota-gold/40 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                Send
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
