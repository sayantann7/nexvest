import Navbar from '@/components/Navbar';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { findSchemeBySlug, Returns } from '@/lib/fundDataLoader';
import ReturnsChart, { ReturnsPoint } from './_client/ReturnsChart';
import HoldingsCollapse from './_client/HoldingsCollapse';
import HoldingsPie from './_client/HoldingsPie';

// Accept params possibly as a Promise to satisfy Next.js PageProps (lazy params resolution in newer versions)
export interface RouteParams { house: string; scheme: string }

function formatNum(v: number | undefined | null, digits = 2) {
  if (v === null || v === undefined || isNaN(v)) return '—';
  return v.toFixed(digits);
}

// Conform to Next.js expectation: params may be a Promise<any>; accept generic PageProps shape
export default async function SchemeDetailPage({ params }: { params: Promise<RouteParams> }) {
  const { house, scheme } = await params;
  const result = await findSchemeBySlug(house, scheme);
  if (!result) return notFound();
  const { house: fundHouse, scheme: schemeRecord } = result;
  const b = schemeRecord.basic_info;
  const r: Returns = schemeRecord.returns;
  const periods: readonly string[] = ['1d','1w','1m','3m','6m','1y','3y','5y','10y'];
  const chartData: ReturnsPoint[] = periods.map(p => ({
    period: p.toUpperCase(),
    abs: r.absolute?.[p as keyof typeof r.absolute] ?? null,
    cagr: r.cagr?.[p as keyof typeof r.cagr] ?? null,
    category: r.category_returns?.[p as keyof typeof r.category_returns] ?? null,
    index: r.index_returns?.[p as keyof typeof r.index_returns] ?? null
  }));

  const sectionLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'returns', label: 'Returns' },
    { id: 'holdings', label: 'Holdings' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'exit-load', label: 'Exit Load' }
  ];

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#0d0c34] to-[#151a4a] scroll-smooth">
      <Navbar />
      <header className="bg-transparent">
        <div className="container mx-auto px-4 pt-6 pb-6 md:pt-10 md:pb-10">
          <h1 className="font-heading text-2xl md:text-4xl font-bold mb-3 leading-tight">{b.fund_name}</h1>
          <p className="text-white/70 text-sm md:text-base flex flex-wrap gap-1 md:gap-2">
            <span>{b.category}</span>
            <span className="opacity-40">•</span>
            <span>{b.risk_level}</span>
            <span className="opacity-40">•</span>
            <span>{b.scheme_type}</span>
            <span className="opacity-40">•</span>
            <span>Inception {b.inception_date}</span>
          </p>
        </div>
      </header>

      <nav aria-label="Scheme sections" className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#0d0c34]/70 bg-[#0d0c34]/90 border-b border-white/10">
        <div className="container mx-auto px-4 flex overflow-x-auto no-scrollbar gap-4 py-2 text-sm">
          {sectionLinks.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-teal-400/60"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="container mx-auto px-4 pb-28 space-y-20">
        <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-28">
          <h2 id="overview-heading" className="sr-only">Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#131a48] bg-gradient-to-br from-[#141d57] to-[#101437] border border-white/10 rounded-xl p-4 shadow-lg shadow-black/30">
                <div className="text-[10px] uppercase tracking-wide text-white/50">Current NAV</div>
                <div className="text-xl font-bold mt-1 tracking-tight text-teal-300">{formatNum(schemeRecord.nav_info.current_nav, 4)}</div>
                <div className="text-[11px] text-white/50">As on {schemeRecord.nav_info.nav_date}</div>
              </div>
              <div className="bg-[#131a48] bg-gradient-to-br from-[#141d57] to-[#101437] border border-white/10 rounded-xl p-4 shadow-lg shadow-black/30">
                <div className="text-[10px] uppercase tracking-wide text-white/50">Fund Size</div>
                <div className="text-xl font-bold mt-1 tracking-tight text-white">{b.fund_size.toLocaleString('en-IN')} Cr</div>
                <div className="text-[11px] text-white/50">Managed by {b.fund_manager}</div>
              </div>
              <div className="bg-[#131a48] bg-gradient-to-br from-[#141d57] to-[#101437] border border-white/10 rounded-xl p-4 shadow-lg shadow-black/30">
                <div className="text-[10px] uppercase tracking-wide text-white/50">Expense Ratio</div>
                <div className="text-xl font-bold mt-1 tracking-tight text-white">{schemeRecord.expense_ratio.current}%</div>
                <div className="text-[11px] text-white/50">Latest reported</div>
              </div>
              <div className="bg-[#131a48] bg-gradient-to-br from-[#141d57] to-[#101437] border border-white/10 rounded-xl p-4 shadow-lg shadow-black/30">
                <div className="text-[10px] uppercase tracking-wide text-white/50">Exit Load Rules</div>
                <div className="text-xl font-bold mt-1 tracking-tight text-white">{schemeRecord.exit_load.length}</div>
                <div className="text-[11px] text-white/50">Conditions apply</div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[#131a48] bg-gradient-to-br from-[#141d57] to-[#101437] border border-white/10 rounded-xl p-6 h-full flex flex-col justify-between shadow-lg shadow-black/30">
                <div>
                  <h3 className="text-sm font-semibold mb-3 tracking-wide text-white/80 uppercase">Scheme Snapshot</h3>
                  <p className="text-[13px] leading-relaxed text-white/70">
                    This {b.scheme_type?.toLowerCase()} scheme operates in the {b.category?.toLowerCase()} category with a risk profile of
                    <span className="text-teal-300 font-semibold"> {b.risk_level}</span>. Inception date {b.inception_date}. Use the navigation above to explore performance, risk, portfolio holdings, analysis & exit load structure.
                  </p>
                </div>
                <div className="mt-5 text-[10px] text-white/50">Data shown is for informational purposes only and may be delayed.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="returns" aria-labelledby="returns-heading" className="scroll-mt-28">
          <div className="flex items-center justify-between mb-6">
            <h2 id="returns-heading" className="font-heading text-2xl md:text-3xl font-bold tracking-tight">Returns</h2>
            <span className="text-[11px] text-white/50 font-medium">Green = Positive, Red = Negative</span>
          </div>
          <div className="bg-[#131a48] bg-gradient-to-br from-[#141d57] to-[#101437] border border-white/10 rounded-2xl p-4 md:p-6 shadow-lg shadow-black/30">
            <div className="flex flex-col xl:flex-row gap-8 items-stretch">
              <div className="flex-1 overflow-x-auto -mx-1 px-1">
                <table className="w-full text-[13px] md:text-sm border-separate border-spacing-0">
                  <thead>
                    <tr className="text-white/60 text-[11px] uppercase tracking-wide">
                      <th className="py-2 pr-3 text-left font-semibold bg-white/5 rounded-l-lg pl-3">Period</th>
                      <th className="py-2 px-3 text-right font-semibold bg-white/5">Absolute %</th>
                      <th className="py-2 px-3 text-right font-semibold bg-white/5">CAGR %</th>
                      <th className="py-2 px-3 text-right font-semibold bg-white/5">Category %</th>
                      <th className="py-2 pl-3 pr-4 text-right font-semibold bg-white/5 rounded-r-lg">Index %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {periods.map(p => {
                      const abs = r.absolute?.[p as keyof typeof r.absolute];
                      const cagr = r.cagr?.[p as keyof typeof r.cagr];
                      const cat = r.category_returns?.[p as keyof typeof r.category_returns];
                      const idx = r.index_returns?.[p as keyof typeof r.index_returns];
                      return (
                        <tr key={p} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                          <td className="py-2 pr-3 pl-3 font-medium text-white/90">{p.toUpperCase()}</td>
                          <td className={`py-2 px-3 text-right font-semibold ${(abs ?? 0) >= 0 ? 'text-teal-300':'text-rose-300'}`}>{formatNum(abs)}</td>
                          <td className={`py-2 px-3 text-right font-semibold ${(cagr ?? 0) >= 0 ? 'text-teal-300':'text-rose-300'}`}>{formatNum(cagr)}</td>
                          <td className="py-2 px-3 text-right font-semibold text-white/80">{formatNum(cat)}</td>
                          <td className="py-2 pl-3 pr-4 text-right font-semibold text-white/60">{formatNum(idx)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex-1 min-h-[300px]">
                <ReturnsChart data={chartData} />
              </div>
            </div>
          </div>
        </section>

        {/* <section id="risk" aria-labelledby="risk-heading" className="scroll-mt-28">
          <h2 id="risk-heading" className="font-heading text-2xl md:text-3xl font-bold mb-6 tracking-tight">Risk Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {(['alpha','beta','sharpe_ratio','sortino_ratio','standard_deviation','risk_rating'] as const).map(k => {
              const value = risk ? (risk as Record<typeof k, number | undefined>)[k] : undefined;
              return (
                <div key={k} className="bg-[#131a48] bg-gradient-to-br from-[#141d57] to-[#101437] border border-white/10 rounded-xl p-4 shadow-md shadow-black/30">
                  <div className="text-[10px] uppercase tracking-wide text-white/50 font-medium">{k.replace(/_/g,' ')}</div>
                  <div className="text-lg font-bold mt-1 tracking-tight">{formatNum(value)}</div>
                </div>
              );
            })}
          </div>
        </section> */}

        <section id="holdings" aria-labelledby="holdings-heading" className="scroll-mt-28">
          <h2 id="holdings-heading" className="font-heading text-2xl md:text-3xl font-bold mb-6 tracking-tight">Top Holdings</h2>
          <div className="bg-[#131a48] bg-gradient-to-br from-[#141d57] to-[#101437] border border-white/10 rounded-2xl shadow-lg shadow-black/30 p-3 md:p-4 mb-8">
            <HoldingsPie holdings={schemeRecord.holdings.slice(0,50)} />
          </div>
          <div className="bg-[#131a48] bg-gradient-to-br from-[#141d57] to-[#101437] border border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-black/30" id="holdings-list">
            <HoldingsCollapse holdings={schemeRecord.holdings.slice(0,50)} initialVisible={12} />
          </div>
        </section>

        <section id="analysis" aria-labelledby="analysis-heading" className="scroll-mt-28">
          <h2 id="analysis-heading" className="font-heading text-2xl md:text-3xl font-bold mb-6 tracking-tight">Analysis Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {schemeRecord.additional_info.analysis.map((a, i) => (
              <div key={i} className="bg-[#131a48] bg-gradient-to-br from-[#141d57] to-[#101437] border border-white/10 rounded-xl p-5 flex flex-col gap-2 shadow-md shadow-black/30">
                <div className="text-[11px] uppercase tracking-wide text-white/50 font-medium">{a.analysis_type}</div>
                <div className="font-medium leading-relaxed text-white/90 text-sm">{a.analysis_desc}</div>
              </div>
            ))}
            {schemeRecord.additional_info.analysis.length === 0 && (
              <div className="text-white/60 text-sm">No analysis entries.</div>
            )}
          </div>
        </section>

        <section id="exit-load" aria-labelledby="exit-load-heading" className="scroll-mt-28">
          <h2 id="exit-load-heading" className="font-heading text-2xl md:text-3xl font-bold mb-6 tracking-tight">Exit Load</h2>
          <ul className="space-y-2 text-sm">
            {schemeRecord.exit_load.map((e, i) => (
              <li key={i} className="bg-[#131a48] bg-gradient-to-br from-[#141d57] to-[#101437] border border-white/10 rounded-lg p-4 flex justify-between gap-6 shadow-md shadow-black/30">
                <span className="text-white/85 max-w-[75%] font-medium text-[13px] leading-relaxed">{e.description ?? 'No description'}</span>
                <span className="text-white/50 text-[11px] self-center whitespace-nowrap">{e.as_on_date.split('T')[0]}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link href={`/mutual-funds/${fundHouse.slug}`} className="text-teal-300 hover:text-teal-200 underline">Back to {fundHouse.name}</Link>
          <Link href="/mutual-funds" className="text-teal-300 hover:text-teal-200 underline">All Fund Houses</Link>
        </div>
      </main>
    </div>
  );
}
