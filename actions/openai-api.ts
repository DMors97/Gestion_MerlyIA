import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

// Simulación de respuestas para cuando la API no está disponible
const simulatedResponses = {
  greeting: [
    "¡Hola! Soy MerlyIA, tu asistente virtual. ¿En qué puedo ayudarte hoy?",
    "¡Bienvenido! Soy MerlyIA, ¿cómo puedo asistirte?",
    "¡Hola! Me alegro de verte. ¿En qué puedo ayudarte?"
  ],
  default: [
    "Entiendo tu consulta. ¿Podrías proporcionarme más detalles para ayudarte mejor?",
    "Gracias por tu mensaje. ¿Podrías explicarme un poco más sobre lo que necesitas?",
    "Estoy aquí para ayudarte. ¿Me podrías dar más información sobre tu consulta?"
  ],
  farewell: [
    "¡Gracias por tu consulta! ¿Hay algo más en lo que pueda ayudarte?",
    "Espero haber sido de ayuda. ¿Necesitas algo más?",
    "¿Hay algo más en lo que pueda asistirte?"
  ]
};

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function callOpenAIAPI(messages: Message[]) {
  try {
    // Si no hay API key, usar el sistema de simulación
    if (!apiKey) {
      return simulateResponse(messages);
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      temperature: 0.7,
      max_tokens: 500,
    });

    return {
      role: 'assistant' as const,
      content: completion.choices[0]?.message?.content || "Lo siento, no pude generar una respuesta."
    };
  } catch (error) {
    console.error('Error in OpenAI API call:', error);
    return simulateResponse(messages);
  }
}

function simulateResponse(messages: Message[]) {
  // Obtener el último mensaje del usuario
  const lastMessage = messages[messages.length - 1];
  const content = lastMessage.content.toLowerCase();

  // Simular un pequeño retraso para hacer la interacción más natural
  return new Promise<Message>((resolve) => {
    setTimeout(() => {
      let response: string;

      // Seleccionar una respuesta basada en el contenido del mensaje
      if (content.includes('hola') || content.includes('buenos días') || content.includes('buenas')) {
        response = getRandomResponse(simulatedResponses.greeting);
      } else if (content.includes('adiós') || content.includes('gracias') || content.includes('chao')) {
        response = getRandomResponse(simulatedResponses.farewell);
      } else {
        response = getRandomResponse(simulatedResponses.default);
      }

      resolve({
        role: 'assistant',
        content: response
      });
    }, 1000);
  });
}

function getRandomResponse(responses: string[]): string {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

