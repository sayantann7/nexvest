import Link from 'next/link';
import { loadAllFundHouses } from '@/lib/fundDataLoader';

export default async function FundHousesSection() {
  const houses = await loadAllFundHouses();

  // Derive some aggregate metrics for display (example: average NAV across schemes, average expense ratio)
  const enriched = houses.map(h => {
    const totalSchemes = h.schemes.length;
    const avgExpense = totalSchemes ? (h.schemes.reduce((s, sc) => s + sc.expense_ratio.current, 0) / totalSchemes) : 0;
    const avgNav = totalSchemes ? (h.schemes.reduce((s, sc) => s + sc.nav_info.current_nav, 0) / totalSchemes) : 0;
    return { ...h, totalSchemes, avgExpense, avgNav };
  });

  return (
    <section className="bg-[#0D0C34] py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-white text-3xl md:text-5xl font-heading font-bold">Fund Houses</h2>
            <p className="text-white/60 mt-3 text-sm md:text-base max-w-2xl">Browse Asset Management Companies and drill into the individual schemes they manage. Metrics below are quick portfolio-level indicators (not investment advice).</p>
          </div>
          <div className="text-white/50 text-xs md:text-sm font-mono">{enriched.length} Houses • {enriched.reduce((a,b)=>a+b.totalSchemes,0)} Schemes</div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#111437]/60 backdrop-blur-sm shadow-xl">
          <div className="hidden md:grid grid-cols-12 px-5 py-3 text-[11px] uppercase tracking-wide text-white/50 border-b border-white/10">
            <div className="col-span-5">Fund House</div>
            <div className="col-span-2 text-right">Schemes</div>
            <div className="col-span-2 text-right">Avg NAV</div>
            <div className="col-span-2 text-right">Avg Expense %</div>
            <div className="col-span-1" />
          </div>
          {enriched.map(h => (
            <Link
              key={h.slug}
              href={`/mutual-funds/${h.slug}`}
              className="block focus:outline-none group"
            >
              <div className="grid grid-cols-12 px-5 py-5 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                <div className="col-span-12 md:col-span-5 flex flex-col gap-1">
                  <span className="font-medium text-base md:text-sm lg:text-base text-white group-hover:text-teal-200 transition-colors">{h.name}</span>
                  <span className="md:hidden text-white/50 text-xs">{h.totalSchemes} schemes • Avg NAV {h.avgNav.toFixed(2)}</span>
                </div>
                <div className="hidden md:block col-span-2 text-right font-semibold text-white/80">{h.totalSchemes}</div>
                <div className="hidden md:block col-span-2 text-right text-teal-300 font-mono text-sm">{h.avgNav.toFixed(2)}</div>
                <div className="hidden md:block col-span-2 text-right text-rose-300 font-mono text-sm">{h.avgExpense.toFixed(2)}</div>
                <div className="hidden md:flex col-span-1 items-center justify-end text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity text-xs">View →</div>
              </div>
            </Link>
          ))}
          {enriched.length === 0 && (
            <div className="px-5 py-8 text-center text-white/60 text-sm">No fund house data available.</div>
          )}
        </div>
      </div>
    </section>
  );
}
