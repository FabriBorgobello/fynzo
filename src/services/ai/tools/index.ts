import { openai } from "@ai-sdk/openai";
import { embed, tool } from "ai";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { chunks } from "@/db/schema/chunks";

export const getRelevantContext = tool({
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
});
