// OpenRouter API integration for Dota 2 hero recommendations
// Using gpt-oss-20b model from OpenRouter

const API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'gpt-oss-20b';

export async function askAI(messages) {
  if (!API_KEY) {
    throw new Error('NEXT_PUBLIC_OPENROUTER_KEY is not set');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        'X-Title': 'Dota 2 Hero Picker',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('AI API Error:', error);
    throw error;
  }
}

// Helper to format hero recommendations
export async function getHeroRecommendations(enemyHeroes) {
  const systemPrompt = `You are a professional Dota 2 coach and hero-picking assistant. Your job is to recommend the best counterpicks and explain why they work well against the enemy team composition.

When given enemy heroes, provide:
1. Top 3-5 recommended hero picks
2. For each hero: brief explanation of why it's good (40-60 words)
3. Key advantages and synergies with existing team
4. 2-3 danger heroes to avoid picking
5. Overall strategy notes for the matchup

Format your response clearly with headers and bullet points. Be concise and tactical.`;

  const userMessage = `Enemy team composition: ${enemyHeroes.join(', ')}

Based on this enemy team, what are your top hero recommendations for us to pick? Consider counters, synergies, and overall team balance.`;

  const messages = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: userMessage,
    },
  ];

  const response = await askAI(messages);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.choices[0]?.message?.content || 'No recommendations available';
}

// Helper for general Dota 2 questions
export async function askDotaQuestion(question) {
  const systemPrompt = `You are a Dota 2 expert assistant knowledgeable about heroes, items, strategies, and game mechanics. Answer questions helpfully and concisely.`;

  const messages = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: question,
    },
  ];

  const response = await askAI(messages);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.choices[0]?.message?.content || 'Unable to process your question';
}
