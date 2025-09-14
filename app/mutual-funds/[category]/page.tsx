import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  CATEGORY_TO_DATA,
  CATEGORY_TO_TYPES,
  getCategoryMeta,
  type FundCategoryKey,
  type FundItem,
  type FundSubtype,
} from "@/lib/mutualFundsData";

export default async function MutualFundCategoryPage({ params }: { params: Promise<{ category: FundCategoryKey }> }) {
  const { category } = await params;
  if (!CATEGORY_TO_DATA[category]) return notFound();

  const meta = getCategoryMeta(category);
  const list: FundItem[] = CATEGORY_TO_DATA[category];
  const subtypes: FundSubtype[] = CATEGORY_TO_TYPES[category] || [];

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#0d0c34] to-[#151a4a]">
      <Navbar />

      {/* Hero */}
      <header className="bg-transparent">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3">{meta.title}</h1>
          {meta.description && (
            <p className="text-white/70 max-w-3xl">{meta.description}</p>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Subtypes overview */}
        {subtypes.length > 0 && (
          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold mb-4">Types in this category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subtypes.map((t, idx) => (
                <div key={idx} className="bg-[#131740] border border-white/10 rounded-xl p-4">
                  <div className="font-medium mb-1">{t.title}</div>
                  <div className="text-white/70 text-sm">{t.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Full list */}
        <section>
          <div className="bg-[#131740] border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1">
              <div className="hidden md:flex items-center justify-between px-5 py-3 border-b border-white/10 text-white/60 text-sm">
                <div className="w-[60%]">Fund name</div>
                <div className="w-[40%] text-right">5Y returns (annualized)</div>
              </div>
              {list.map((fund, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-4 border-b border-white/10 last:border-b-0">
                  <div className="flex items-center gap-3 w-[60%]">
                    <div className="w-10 h-10 rounded-full bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${fund.logo})` }} />
                    <div className="text-sm md:text-base font-medium">{fund.name}</div>
                  </div>
                  <div className="w-[40%] text-right text-teal-300 font-semibold">{fund.returns}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10">
          <div className="bg-[#131740] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-heading font-semibold">Learn more and plan with calculators</h3>
              <p className="text-white/70 text-sm md:text-base mt-1">Explore SIP, lumpsum, ELSS, and more to estimate your outcomes.</p>
            </div>
            <Link href="/calculators" className="shrink-0 text-teal-300 hover:text-teal-200 underline">Open Calculators</Link>
          </div>
        </section>

        <div className="mt-8">
          <Link href="/mutual-funds" className="text-teal-300 hover:text-teal-200 underline">Back to Mutual Funds</Link>
        </div>
      </main>
    </div>
  );
}
