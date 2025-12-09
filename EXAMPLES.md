// Example component usage and patterns

import React from 'react';
import HeroSelector from '@/src/components/HeroSelector';
import ChatBot from '@/src/components/ChatBot';
import HeroCard from '@/src/components/HeroCard';
import { getHeroRecommendations, askAI } from '@/src/utils/openrouter';

// ============================================
// HERO SELECTOR EXAMPLE
// ============================================

function HeroSelectorExample() {
  const [selected, setSelected] = React.useState([]);

  return (
    <HeroSelector
      selectedHeroes={selected}
      onSelect={(hero) => setSelected([...selected, hero])}
      onRemove={(hero) => setSelected(selected.filter(h => h !== hero))}
    />
  );
}

// ============================================
// HERO CARD EXAMPLE
// ============================================

function HeroCardExample() {
  return (
    <HeroCard
      hero="Anti-Mage"
      explanation="Strong against long-range heroes, excels in late game with farming potential."
      counters={['Earthshaker', 'Pudge', 'Beastmaster']}
      synergies={['Crystal Maiden', 'Shadow Shaman', 'Dazzle']}
      isRecommendation={true}
    />
  );
}

// ============================================
// AI INTEGRATION EXAMPLES
// ============================================

// Get hero recommendations
async function getRecommendationsExample() {
  try {
    const recommendations = await getHeroRecommendations(['Axe', 'Pudge', 'Shadow Fiend']);
    console.log(recommendations);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Ask a general Dota 2 question
async function askGeneralQuestion() {
  const messages = [
    {
      role: 'system',
      content: 'You are a Dota 2 expert. Answer questions concisely.'
    },
    {
      role: 'user',
      content: 'What is the best starting item for a support hero?'
    }
  ];

  try {
    const response = await askAI(messages);
    const answer = response.choices[0]?.message?.content;
    console.log(answer);
  } catch (error) {
    console.error('API Error:', error);
  }
}

// ============================================
// MULTI-TURN CONVERSATION EXAMPLE
// ============================================

async function multiTurnConversation() {
  const messages = [
    {
      role: 'system',
      content: 'You are a Dota 2 coach. Be helpful and concise.'
    },
    {
      role: 'user',
      content: 'Enemy picked Axe, what counters him?'
    }
  ];

  // First response
  const response1 = await askAI(messages);
  const answer1 = response1.choices[0]?.message?.content;

  // Continue conversation
  messages.push({ role: 'assistant', content: answer1 });
  messages.push({ role: 'user', content: 'What about item counters?' });

  const response2 = await askAI(messages);
  const answer2 = response2.choices[0]?.message?.content;

  console.log('Response 1:', answer1);
  console.log('Response 2:', answer2);
}

// ============================================
// ERROR HANDLING EXAMPLE
// ============================================

async function robustRecommendations() {
  try {
    const recommendations = await getHeroRecommendations(['Axe', 'Pudge']);
    return { success: true, data: recommendations };
  } catch (error) {
    if (error.message.includes('API')) {
      return { success: false, error: 'API Error - Check your API key' };
    }
    if (error.message.includes('timeout')) {
      return { success: false, error: 'Request timed out - Try again' };
    }
    return { success: false, error: error.message };
  }
}

export {
  HeroSelectorExample,
  HeroCardExample,
  getRecommendationsExample,
  askGeneralQuestion,
  multiTurnConversation,
  robustRecommendations,
};
