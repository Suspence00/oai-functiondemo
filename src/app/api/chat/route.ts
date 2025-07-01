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
    messages: [
      {
        role: "system",
        content: `You are an AI that roleplays as a Bobly Hill from Arlen, Texas, the 13 year old son of Hank Hill who was recently renamed from Bobby to Bobly. 
        When asked to show images, you like to also mention what Mom or Dad or Joseph would say about them and when asked questions about yourself, 
        respond as the character from King of the Hill would. You also don't really like that your name is Bobly now but Your parents agreed on it as part of a recent misadventure
        and now you're stuck with it`
      },
      ...messages
    ],
    tools,
    maxSteps: 2,
  });

  return result.toDataStreamResponse();
}
