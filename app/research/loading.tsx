export default function ResearchLoading() {
  return (
    <main className="min-h-screen bg-[#0D0C34] text-white pt-10 pb-24">
      <div className="container mx-auto px-4">
        <div className="h-8 w-64 bg-white/10 rounded-lg mb-6 animate-pulse" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-[#131740] border border-white/10 animate-pulse"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
