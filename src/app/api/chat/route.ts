import { streamText } from 'ai';
import { tools } from './tools';
import { openai as openAiModel } from '@ai-sdk/openai'

const model='gpt-3.5-turbo'

// API route handler (e.g., Next.js or Express-style POST route)
export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages;

  const result = await streamText({
    model: openAiModel(model),
    messages,
    tools,
    maxSteps: 2,
  });

  return result.toDataStreamResponse();
}
