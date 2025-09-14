"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { ChevronRight, TrendingUp, BarChart2, PieChart } from "lucide-react";

type FundItem = { name: string; logo: string; returns: string };
type TypeItem = { title: string; description: string };

// Reuse icon theme from section
const icons = {
  Equity: <TrendingUp className="w-5 h-5 text-[#09ffec]" />,
  Debt: <BarChart2 className="w-5 h-5 text-[#09ffec]" />,
  Hybrid: <PieChart className="w-5 h-5 text-[#09ffec]" />,
  Index: <BarChart2 className="w-5 h-5 text-[#09ffec]" />,
  ELSS: <PieChart className="w-5 h-5 text-[#09ffec]" />,
  Gold: <TrendingUp className="w-5 h-5 text-[#09ffec]" />,
};

interface Dataset {
  label: keyof typeof icons;
  funds: FundItem[];
  types: TypeItem[];
}

// Minimal inline datasets to avoid cross-import complexity; aligned with existing section data
const datasets: Dataset[] = [
  {
    label: "Equity",
    funds: [
      { name: "Quant Small Cap Fund", logo: "/mutualFund/quant.png", returns: "+25.62%" },
      { name: "Nippon India Small Cap Fund", logo: "/mutualFund/nippon.png", returns: "+24.22%" },
      { name: "Quant Infrastructure Fund", logo: "/mutualFund/quant.png", returns: "+24.06%" },
      { name: "Quant ELSS Tax Saver Fund", logo: "/mutualFund/quant.png", returns: "+23.08%" },
      { name: "Motilal Oswal Midcap Fund", logo: "/mutualFund/motilal.svg", returns: "+22.86%" },
    ],
    types: [
      { title: "Large-Cap Funds", description: "Invest 80%+ in top 100 companies by market cap." },
      { title: "Mid-Cap Funds", description: "Invest 65%+ in companies ranked 101-250 by market cap." },
      { title: "Small-Cap Funds", description: "Invest 65%+ in companies ranked 251+ by market cap." },
      { title: "Multi-Cap Funds", description: "25% each in large, mid, and small caps." },
    ],
  },
  {
    label: "Debt",
    funds: [
      { name: "Aditya Birla Medium Term", logo: "/mutualFund/adityabirla.png", returns: "+10.36%" },
      { name: "Aditya Birla Credit Risk", logo: "/mutualFund/adityabirla.png", returns: "+9.47%" },
      { name: "DSP Gilt Fund", logo: "/mutualFund/dsp.png", returns: "+8.76%" },
      { name: "ICICI All Seasons Bond", logo: "/mutualFund/icici.jpg", returns: "+8.66%" },
      { name: "SBI Magnum Gilt", logo: "/mutualFund/sbi.jpg", returns: "+8.66%" },
    ],
    types: [
      { title: "Money Market", description: "Lend up to 1 year to generate steady returns." },
      { title: "Corporate Bond", description: "80%+ in highest-rated corporate debt." },
      { title: "Overnight", description: "Lend for one business day; minimal risk." },
      { title: "Liquid", description: "Lend up to 91 days; high liquidity." },
    ],
  },
  {
    label: "Hybrid",
    funds: [
      { name: "Quant Multi Asset", logo: "/mutualFund/quant.png", returns: "+21.23%" },
      { name: "ICICI Equity & Debt", logo: "/mutualFund/icici.jpg", returns: "+18.81%" },
      { name: "Quant Absolute Fund", logo: "/mutualFund/quant.png", returns: "+18.51%" },
      { name: "HDFC Balanced Advantage", logo: "/mutualFund/hdfc.png", returns: "+17.65%" },
      { name: "Kotak Multi Asset Allocator", logo: "/mutualFund/kotak.png", returns: "+17.32%" },
    ],
    types: [
      { title: "Aggressive Hybrid", description: "65–80% equities; rest debt." },
      { title: "Multi Asset Allocation", description: "Mix of equity, debt, gold." },
      { title: "Dynamic Asset Allocation", description: "0–100% equity or debt based on model." },
      { title: "Arbitrage Funds", description: "Exploit price differences across markets." },
    ],
  },
  {
    label: "Index",
    funds: [
      { name: "ICICI Nifty Next 50", logo: "/mutualFund/icici.jpg", returns: "+15.17%" },
      { name: "Sundaram N100 Equal Weight", logo: "/mutualFund/sundaram.png", returns: "+14.69%" },
      { name: "UTI Nifty 50", logo: "/mutualFund/uti.png", returns: "+14.34%" },
      { name: "HDFC Nifty 50", logo: "/mutualFund/hdfc.png", returns: "+14.28%" },
      { name: "Tata Nifty 50", logo: "/mutualFund/tata.png", returns: "+14.25%" },
    ],
    types: [
      { title: "Broad Market", description: "Track major indices like Nifty 50 or Sensex." },
      { title: "Sectoral/Thematic", description: "Mirror sector/theme indices (banking, tech)." },
      { title: "International", description: "Track overseas indices like S&P 500." },
      { title: "Bond Index", description: "Track fixed-income indices (gilt/corporate)." },
    ],
  },
  {
    label: "ELSS",
    funds: [
      { name: "Kotak ELSS Tax Saver", logo: "/mutualFund/kotak.png", returns: "+17.36%" },
      { name: "Canara Robeco ELSS", logo: "/mutualFund/canara.png", returns: "+17.36%" },
      { name: "Franklin India ELSS", logo: "/mutualFund/frankling.png", returns: "+17.02%" },
      { name: "Invesco India ELSS", logo: "/mutualFund/invesco.png", returns: "+16.50%" },
      { name: "Tata ELSS", logo: "/mutualFund/tata.png", returns: "+16.44%" },
    ],
    types: [
      { title: "Large-Cap ELSS", description: "Focus on large-cap stability with tax benefits." },
      { title: "Mid/Small-Cap ELSS", description: "Higher growth potential with volatility." },
      { title: "Multi-Cap ELSS", description: "Diversify across caps to balance risk/return." },
      { title: "Thematic ELSS", description: "Concentrate on themes like tech or infra." },
    ],
  },
  {
    label: "Gold",
    funds: [
      { name: "Nippon India Gold Savings", logo: "/mutualFund/nippon.png", returns: "+15.82%" },
      { name: "Zerodha Gold ETF FoF", logo: "/mutualFund/zerodha.png", returns: "NA" },
      { name: "UTI Gold ETF FoF", logo: "/mutualFund/uti.png", returns: "NA" },
      { name: "Tata Gold ETF FoF", logo: "/mutualFund/tata.png", returns: "NA" },
      { name: "SBI Silver ETF FoF", logo: "/mutualFund/sbi.jpg", returns: "NA" },
    ],
    types: [
      { title: "Gold ETF", description: "Invest directly in gold via exchange-traded funds." },
      { title: "Gold FoF", description: "Invest in gold ETFs via mutual funds." },
      { title: "Gold Savings", description: "Blend ETFs with short-term debt for liquidity." },
      { title: "Sovereign Gold Bonds", description: "Government bonds with fixed interest + gold price." },
    ],
  },
];

export default function TypesOfMutualFundsTabs() {
  const [active, setActive] = useState<Dataset["label"]>("Equity");

  const data = useMemo(() => datasets.find((d) => d.label === active)!, [active]);

  return (
    <section className="bg-[#0D0C34] py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="font-heading text-white text-2xl md:text-4xl font-bold">Types of Mutual Funds</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {datasets.map((d) => (
            <button
              key={d.label}
              onClick={() => setActive(d.label)}
              className={
                "px-3 py-2 rounded-full text-sm transition-colors flex items-center gap-2 " +
                (active === d.label
                  ? "bg-white/15 text-white border border-white/20"
                  : "text-white/70 hover:text-white hover:bg-white/10")
              }
            >
              {icons[d.label]}
              <span>{d.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Type cards */}
          <Card className="bg-[#131740] border border-gray-700 rounded-2xl">
            <CardContent className="p-5 md:p-6">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                {icons[data.label]} <span>Categories within {data.label}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.types.map((t, i) => (
                  <div key={i} className="bg-[#171a3b] rounded-xl p-4 border border-gray-700">
                    <div className="text-white font-medium">{t.title}</div>
                    <div className="text-gray-300 text-sm mt-1">{t.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right: Top funds list */}
          <Card className="bg-white rounded-2xl border-none shadow-[0px_0px_30px_rgba(0,0,0,0.08)]">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-[#0d0c34]">
                  <div className="w-8 h-8 rounded-lg bg-[#0d0c34] grid place-items-center">
                    {icons[data.label]}
                  </div>
                  <div className="font-semibold">Top {data.label} Funds</div>
                </div>
                <div className="text-xs md:text-sm text-[#0d0c34] bg-[#f5f7ff] px-3 py-1.5 rounded-full">5Y Returns (Annualized)</div>
              </div>

              <div className="divide-y divide-gray-100">
                {data.funds.map((f, i) => (
                  <div key={i} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-9 h-9 rounded-full border border-gray-200 bg-cover bg-center"
                        style={{ backgroundImage: `url(${f.logo})` }}
                        aria-hidden
                      />
                      <div className="truncate text-[#0d0c34] text-sm font-medium">{f.name}</div>
                    </div>
                    <div className="text-[#0d0c34] font-semibold text-sm flex items-center gap-1">
                      {f.returns}
                      <ChevronRight className="w-4 h-4 text-[#09ffec]" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
