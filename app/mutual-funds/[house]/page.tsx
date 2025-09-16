import { findFundHouseBySlug, slugify } from '@/lib/fundDataLoader';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { notFound } from 'next/navigation';
import SchemeFilter from './_client/SchemeFilter';

type HouseRouteParams = { house: string };

export default async function FundHousePage({ params }: { params: Promise<HouseRouteParams> }) {
  const { house } = await params;
  const fundHouse = await findFundHouseBySlug(house);
  if(!fundHouse) return notFound();

  const totalSchemes = fundHouse.schemes.length;
  const avgExpense = totalSchemes ? (fundHouse.schemes.reduce((s,sc)=>s+sc.expense_ratio.current,0)/totalSchemes) : 0;
  const avgNav = totalSchemes ? (fundHouse.schemes.reduce((s,sc)=>s+sc.nav_info.current_nav,0)/totalSchemes) : 0;

  const schemePayload = fundHouse.schemes.map(s => ({
    name: s.basic_info.fund_name,
    nav: s.nav_info.current_nav,
    oneY: s.returns.absolute?.['1y'],
    fiveY: s.returns.cagr?.['5y'],
    href: `/mutual-funds/${fundHouse.slug}/${slugify(s.basic_info.fund_name)}`
  }));

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#0d0c34] to-[#151a4a]">
      <Navbar />
      <header className="bg-transparent">
        <div className="container mx-auto px-4 py-10 md:py-14 space-y-5">
          <div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3">{fundHouse.name}</h1>
            <p className="text-white/70 max-w-3xl text-sm md:text-base">Explore all schemes below. Filter & sort to find a product and click through for detailed analytics.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs md:text-sm">
            <div className="bg-white/5 rounded-xl px-4 py-3 flex flex-col min-w-[140px] border border-white/10">
              <span className="text-white/50 tracking-wide uppercase text-[10px]">Schemes</span>
              <span className="font-semibold text-lg">{totalSchemes}</span>
            </div>
            <div className="bg-white/5 rounded-xl px-4 py-3 flex flex-col min-w-[140px] border border-white/10">
              <span className="text-white/50 tracking-wide uppercase text-[10px]">Avg NAV</span>
              <span className="font-semibold text-lg">{avgNav.toFixed(2)}</span>
            </div>
            <div className="bg-white/5 rounded-xl px-4 py-3 flex flex-col min-w-[140px] border border-white/10">
              <span className="text-white/50 tracking-wide uppercase text-[10px]">Avg Expense %</span>
              <span className="font-semibold text-lg">{avgExpense.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 pb-28">
        <SchemeFilter schemes={schemePayload} />
        <div className="mt-10">
          <Link href="/mutual-funds" className="text-teal-300 hover:text-teal-200 underline text-sm">Back to all fund houses</Link>
        </div>
      </main>
    </div>
  );
}
