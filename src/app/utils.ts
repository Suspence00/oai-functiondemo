    
    import { Message } from "ai";
    
    export type ToolCallArg =  { [name:string]: unknown }
    export type ToolCallType = { args?: Array<ToolCallArg>, name: string, timeStamp: Date }
    
    export const getLatestToolUsage = (messages: Array<Message>): ToolCallType | undefined => {
      const latestMessage = messages.at(-1);
      if(latestMessage?.role === "assistant") {
        const part = latestMessage.parts?.find(part => part.type === 'tool-invocation');
        if(part) {
            return {
                args: part.toolInvocation.args,
                name: part.toolInvocation.toolName,
                timeStamp: new Date(),
            }
        }
      }
      return undefined;
    }