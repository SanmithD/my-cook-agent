import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { dishTool } from "../tools/dishTool";

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-1.5-flash',
    apiKey: process.env.GEMINI_API,
    temperature: 0.7,
    maxRetries: 5,
    streaming: true
});

export const agent = createReactAgent({
    llm: model,
    tools: [dishTool]
});