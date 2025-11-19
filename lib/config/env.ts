import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_RESEARCH_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_ENV: z.enum(["development", "staging", "production"]).optional(),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_RESEARCH_API_URL:
    process.env.NEXT_PUBLIC_RESEARCH_API_URL ??
    "https://nexvest-backend.sayantannandi13.workers.dev/article",
  NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV ?? process.env.NODE_ENV ?? "development",
});
