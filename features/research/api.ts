import { env } from "@/lib/config/env";
import type { Article } from "./types";

export async function fetchArticles(): Promise<Article[]> {
  const url =
    env.NEXT_PUBLIC_RESEARCH_API_URL ??
    "https://nexvest-backend.sayantannandi13.workers.dev/article";

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load articles");
  }

  const data: Article[] = await res.json();
  data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return data;
}
