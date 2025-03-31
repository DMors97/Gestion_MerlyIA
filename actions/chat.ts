'use server'

import { callOpenAIAPI } from './openai-api';

type Role = 'system' | 'user' | 'assistant';

interface Message {
  role: Role;
  content: string;
}

export async function chatCompletion(messages: Message[]): Promise<Message> {
  try {
    const response = await callOpenAIAPI(messages);
    return response;
  } catch (error) {
    console.error('Error in chat completion:', error);
    return {
      role: 'assistant',
      content: 'Lo siento, ha ocurrido un error. ¿Podrías intentarlo de nuevo?'
    };
  }
}

