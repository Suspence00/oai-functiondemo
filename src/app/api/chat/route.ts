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

// export async function POST(req: Request) {
//   // Extract the `messages` from the body of the request
//   const body = await req.json();
//   const messages = body.messages;

  
  
//   const toolMap = Object.fromEntries(
//     rawFunctions.map((fn) => [
//       fn.name,
//       tool({
//         description: fn.description!,
//         parameters: fn.parameters,
//         execute: async (args: any) => {
//           return await runFunction(fn.name, args);
//         }
//       })
//     ])
//   )
//   // check if the conversation requires a function call to be made
//   const initialResponse = await openai.chat.completions.create({
//     model,
//     messages: body.messages,
//     stream: true,
//     functions,
//     function_call: "auto",
//   });
 
//   console.log(initialResponse)
//   const stream = OpenAIStream(initialResponse, {
//     experimental_onFunctionCall: async (
//       { name, arguments: args },
//       createFunctionCallMessages,
//     ) => {
//       console.log(name)
//       console.log(args)
//       const result = await runFunction(name, args);
//       const newMessages = createFunctionCallMessages(result);
//       return openai.chat.completions.create({
//         model,
//         stream: true,
//         messages: [...messages, ...newMessages],
//       });
//     },
//   });

//   const result = streamText({
//     model,
//     messages,
//     tools,
//     maxSteps: 2,
//   });
 
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }