import { z } from "zod/v4";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  MINIO_ENDPOINT: z.string(),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
  MINIO_BUCKET: z.string(),
  REDIS_URL: z.url(),
});
export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
  MINIO_BUCKET: process.env.MINIO_BUCKET,
  REDIS_URL: process.env.REDIS_URL,
});
