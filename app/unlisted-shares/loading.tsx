export default function UnlistedSharesLoading() {
  return (
    <main className="min-h-screen bg-[#0D0C34] text-white pt-10 pb-24">
      <div className="container mx-auto px-4">
        <div className="h-10 w-80 bg-white/10 rounded-lg mb-8 animate-pulse" />
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-[#131740] border border-white/10 animate-pulse"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
