import { z } from "zod/v4";

import "server-only";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  MINIO_ENDPOINT: z.string(),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
  MINIO_BUCKET: z.string(),
  NEXT_PUBLIC_ENVIRONMENT: z.enum(["development", "staging", "production"]),
  OPENAI_API_KEY: z.string().startsWith("sk-"),
  REDIS_URL: z.url(),
});
export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
  MINIO_BUCKET: process.env.MINIO_BUCKET,
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  REDIS_URL: process.env.REDIS_URL,
});
