import OpenAI from 'openai';
import { NextResponse } from 'next/server';

console.log(process.env.LLAMA_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.LLAMA_API_KEY,
  baseURL: 'https://api.llama-api.com',
});

export async function POST(req) {
  try {
    const { message } = req.body;
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'Assistant is a large language model trained by OpenAI.' },
        { role: 'user', content: message },
      ],
      model: 'llama-13b-chat',
    });

    return NextResponse.json({ message: completion.choices[0].message.content }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Failed to get response from LLama' }, { status: 500 });
  }
}
