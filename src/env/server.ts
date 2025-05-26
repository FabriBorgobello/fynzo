import { z } from "zod/v4";

const envSchema = z.object({
  ENVIRONMENT: z.enum(["development", "staging", "production"]),
  DATABASE_URL: z.url(),
});
export const env = envSchema.parse({
  ENVIRONMENT: process.env.ENVIRONMENT,
  DATABASE_URL: process.env.DATABASE_URL,
});
