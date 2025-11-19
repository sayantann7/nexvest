import type { UnlistedShare } from "./types";

export async function getUnlistedShares(): Promise<UnlistedShare[]> {
  const res = await fetch("/unlisted_shares.json");

  if (!res.ok) {
    throw new Error("Failed to load unlisted shares");
  }

  const data: UnlistedShare[] = await res.json();
  return data;
}
