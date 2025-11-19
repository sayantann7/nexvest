"use client";
import Link from "next/link";

interface ResearchErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ResearchError({ error, reset }: ResearchErrorProps) {
  return (
    <main className="min-h-screen bg-[#0D0C34] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#131740] border border-white/10 rounded-2xl p-6 space-y-3 text-center">
        <h1 className="text-xl font-semibold">Unable to load research right now</h1>
        <p className="text-sm text-white/70">
          {error.message || "Something went wrong while fetching articles."}
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-[#09ffec] text-[#0D0C34] text-sm font-medium hover:bg-[#09ffec]/90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-white/20 text-sm text-white/80 hover:bg-white/5"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
