const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const sendMessageToChatbot = async (message) => {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`, // ← reemplaza esto
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct', // Modelo rápido y gratuito
        messages: [
          {
            role: 'system',
            content:
              'Eres un tutor educativo especializado en Python. Responde con explicaciones breves, claras y directas. No des rodeos innecesarios.',
          },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('Error de OpenRouter:', error);
      throw new Error('Fallo en la API de OpenRouter');
    }

    const data = await res.json();
    return { reply: data.choices[0].message.content.trim() };
  } catch (error) {
    console.error('Error al consultar OpenRouter:', error);
    return {
      reply: 'Lo siento, no pude obtener respuesta en este momento. Intenta nuevamente más tarde.',
    };
  }
};
