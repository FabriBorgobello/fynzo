import { z } from "zod/v4";

const envSchema = z.object({
  ENVIRONMENT: z.enum(["development", "staging", "production"]),
});
export const env = envSchema.parse({
  ENVIRONMENT: process.env.ENVIRONMENT,
});
