import { openai } from "@ai-sdk/openai";
import { embed, tool } from "ai";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { chunks } from "@/db/schema/chunks";

import { availableFormsSchema, FORMS } from "./forms";

export const tools = {
  // Get relevant context from the knowledge base (RAG)
  getRelevantContext: tool({
    description: `get information from your knowledge base to answer questions.`,
    parameters: z.object({ question: z.string().describe("the users question") }),
    execute: async ({ question }) => {
      // 1. Embed the question
      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: question.replaceAll("\\n", " "),
      });
      // 2. Find the most relevant chunks
      const similarity = sql<number>`1 - (${cosineDistance(chunks.embedding, embedding)})`;
      const relevantChunks = await db
        .select({ similarity, content: chunks.content })
        .from(chunks)
        .where(gt(similarity, 0.5))
        .orderBy((t) => desc(t.similarity))
        .limit(20);
      // 3. Return the chunks
      return { context: relevantChunks };
    },
  }),

  // Request the comunidad autónoma (autonomous community) to the user.
  getComunidadAutonoma: tool({
    description: `request the comunidad autónoma (autonomous community) to the user.`,
    parameters: z.object({
      question: z
        .string()
        .describe(
          "question to be displayed to the user. e.g. '¿En qué comunidad autónoma estás?' / 'In which autonomous community are you?'",
        ),
    }),
  }),

  // Get the links and descriptions to access the specific form's website.
  getFormsLinks: tool({
    description: `get the link to access one or multiple forms. Use this tool when the user asks for the link to access a specific form.`,
    parameters: z.object({
      forms: z
        .array(availableFormsSchema)
        .describe("the names of the forms to access as strings. e.g. '100', '130', '036'"),
    }),
    execute: async ({ forms }) => {
      return { forms: FORMS.filter((form) => forms.includes(form.code)) };
    },
  }),
};
