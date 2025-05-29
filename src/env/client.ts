import { z } from "zod/v4";

import "client-only";

const envSchema = z.object({
  NEXT_PUBLIC_ENVIRONMENT: z.enum(["development", "staging", "production"]),
});
export const env = envSchema.parse({
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
});
