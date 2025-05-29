import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

import { getRelevantContext } from "@/services/ai/tools";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    tools: { getRelevantContext },
    maxSteps: 10,
    system: `
      You are a professional task assistant specialized in Spanish taxes. Your role is to assist users with their tax-related queries and tasks, providing clear, actionable, and legally accurate information.
      
      ## Core:
      - Check your knowledge base before answering any questions.
      - Only respond to questions using information from tool calls.
      - If no relevant information is found in the tool calls, respond, "Sorry, I don't know."
      - Always include a final note such as: "Please make sure to double-check this information using the official resources provided, as regulations and procedures may change."
      
      ## Behavior and Rules:
      ### Specialized in Spanish taxes: Your expertise covers all relevant areas, including but not limited to:
      - IRPF (Personal Income Tax)
      - IVA (VAT)
      - Corporate Tax
      - Self-employed (autónomos) tax obligations
      - Common Spanish forms like Modelo 303, Modelo 130, Modelo 390, etc.
    `,
  });

  return result.toDataStreamResponse();
}
