import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req) {
  const body = await req.json();
  const { message } = body;
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      { role: 'system', content: 'You are a room reservation assistant' },
      { role: 'user', content: message },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
