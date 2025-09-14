export type FundItem = {
  name: string;
  logo: string;
  returns: string;
};

export type FundCategoryKey =
  | "equity"
  | "debt"
  | "hybrid"
  | "index"
  | "elss"
  | "gold";

export const CATEGORY_META: Record<FundCategoryKey, { title: string; description?: string }> = {
  equity: {
    title: "Equity Mutual Funds",
    description:
      "Equity funds primarily invest in stocks. They target long-term capital appreciation and are categorized by market cap and strategy.",
  },
  debt: {
    title: "Debt Mutual Funds",
    description:
      "Debt funds invest in fixed-income instruments like government and corporate bonds, targeting steady income with lower volatility.",
  },
  hybrid: {
    title: "Hybrid Mutual Funds",
    description:
      "Hybrid funds mix equity and debt in varying proportions to balance risk and return across market cycles.",
  },
  index: {
    title: "Index Mutual Funds",
    description:
      "Index funds passively track a market index like Nifty 50 or Sensex by replicating its constituents and weights.",
  },
  elss: {
    title: "ELSS Mutual Funds",
    description:
      "ELSS (Equity-Linked Savings Scheme) funds are tax-saving equity funds with a 3-year lock-in under Section 80C.",
  },
  gold: {
    title: "Gold Mutual Funds",
    description:
      "Gold funds invest in gold ETFs or related instruments, offering exposure to gold without handling physical bullion.",
  },
};

// Data sources are currently duplicated from the section file; keeping here to centralize usage.
export const equityFundData: FundItem[] = [
  { name: "Quant Small Cap Fund", logo: "/mutualFund/quant.png", returns: "+25.62%" },
  { name: "Nippon India Small Cap Fund", logo: "/mutualFund/nippon.png", returns: "+24.22%" },
  { name: "Quant Infrastructure Fund", logo: "/mutualFund/quant.png", returns: "+24.06%" },
  { name: "Quant ELSS Tax Saver Fund", logo: "/mutualFund/quant.png", returns: "+23.08%" },
  { name: "Motilal Oswal Midcap Fund", logo: "/mutualFund/motilal.svg", returns: "+22.86%" },
  { name: "Quant Mid Cap Fund", logo: "/mutualFund/quant.png", returns: "+22.82%" },
  { name: "Quant Flexi Cap Fund", logo: "/mutualFund/quant.png", returns: "+22.55%" },
  { name: "Edelweiss Mid Cap Fund", logo: "/mutualFund/edelweiss.png", returns: "(+22.47% p.a." },
  { name: "ICICI Prudential Infrastructure Fund", logo: "/mutualFund/icici.jpg", returns: "+22.38%" },
  { name: "Invesco India Infrastructure Fund", logo: "/mutualFund/invesco.png", returns: "+22.23%" },
];

export const debtFundData: FundItem[] = [
  { name: "Aditya Birla Sun Life Medium Term Fund", logo: "/mutualFund/adityabirla.png", returns: "+10.36%" },
  { name: "Aditya Birla Sun Life Credit Risk Fund", logo: "/mutualFund/adityabirla.png", returns: "+9.47%" },
  { name: "DSP Gilt Fund", logo: "/mutualFund/dsp.png", returns: "+8.76%" },
  { name: "Baroda BNP Paribas Credit Risk Fund", logo: "mutualFund/baroda.png", returns: "+8.68%" },
  { name: "ICICI Prudential All Seasons Bond Fund", logo: "/mutualFund/icici.jpg", returns: "+8.66%" },
  { name: "SBI Magnum Gilt Fund", logo: "/mutualFund/sbi.jpg", returns: "+8.66%" },
  { name: "Bandhan GSF Investment Fund", logo: "/mutualFund/bandhan.jpg", returns: "+8.62%" },
  { name: "Edelweiss Government Securities Fund", logo: "/mutualFund/edelweiss.png", returns: "+8.55%" },
  { name: "ICICI Prudential Gilt Fund", logo: "/mutualFund/icici.jpg", returns: "+8.53%" },
  { name: "Kotak Gilt Investment Fund", logo: "/mutualFund/kotak.png", returns: "+8.52%" },
];

export const hybridFundData: FundItem[] = [
  { name: "Quant Multi Asset Fund", logo: "/mutualFund/quant.png", returns: "+21.23%" },
  { name: "ICICI Prudential Equity & Debt Fund", logo: "/mutualFund/icici.jpg", returns: "+18.81%" },
  { name: "Quant Absolute Fund", logo: "/mutualFund/quant.png", returns: "+18.51%" },
  { name: "ICICI Prudential Multi Asset Fund", logo: "/mutualFund/icici.jpg", returns: "+18.38%" },
  { name: "HDFC Balanced Advantage Fund", logo: "/mutualFund/hdfc.png", returns: "+17.65%" },
  { name: "Kotak Multi Asset Allocator FoF - Dynamic", logo: "/mutualFund/kotak.png", returns: "+17.32%" },
  { name: "JM Aggressive Hybrid Fund", logo: "/mutualFund/jm.png", returns: "+17.02%" },
  { name: "Edelweiss Aggressive Hybrid Fund", logo: "/mutualFund/edelweiss.png", returns: "+16.61%" },
  { name: "Kotak Equity Hybrid Fund", logo: "/mutualFund/kotak.png", returns: "+15.80%" },
  { name: "DSP Aggressive Hybrid Fund", logo: "/mutualFund/dsp.png", returns: "+15.53%" },
];

export const elssFundData: FundItem[] = [
  { name: "Kotak ELSS Tax Saver Fund", logo: "/mutualFund/kotak.png", returns: "+17.36%" },
  { name: "Canara Robeco ELSS Tax Saver", logo: "/mutualFund/canara.png", returns: "+17.36%" },
  { name: "Franklin India ELSS Tax Saver Fund", logo: "/mutualFund/frankling.png", returns: "+17.02%" },
  { name: "Invesco India ELSS Tax Saver Fund", logo: "/mutualFund/invesco.png", returns: "+16.50%" },
  { name: "Tata ELSS Tax Saver Fund", logo: "/mutualFund/tata.png", returns: "+16.44%" },
  { name: "ICICI Prudential ELSS Tax Saver", logo: "/mutualFund/icici.jpg", returns: "+16.13%" },
  { name: "HSBC ELSS Tax Saver Fund", logo: "/mutualFund/hsbc.png", returns: "+15.87%" },
  { name: "Baroda BNP Paribas ELSS Tax Saver Fund", logo: "/mutualFund/baroda.png", returns: "+15.86%" },
  { name: "Union ELSS Tax Saver Fund", logo: "/mutualFund/union.png", returns: "+15.63%" },
  { name: "Edelweiss ELSS Tax Saver Fund", logo: "/mutualFund/edelweiss.png", returns: "+15.49%" },
];

export const indexFundData: FundItem[] = [
  { name: "ICICI Prudential Nifty Next 50 Index Fund", logo: "/mutualFund/icici.jpg", returns: "+15.17%" },
  { name: "Sundaram Nifty 100 Equal Weight Fund", logo: "/mutualFund/sundaram.png", returns: "+14.69%" },
  { name: "Bandhan Nifty 50 Index Fund", logo: "/mutualFund/bandhan.jpg", returns: "+14.42%" },
  { name: "UTI Nifty 50 Index Fund", logo: "/mutualFund/uti.png", returns: "+14.34%" },
  { name: "HDFC Nifty 50 Index Fund", logo: "/mutualFund/hdfc.png", returns: "+14.28%" },
  { name: "Tata Nifty 50 Index Fund", logo: "/mutualFund/tata.png", returns: "+14.25%" },
  { name: "Nippon India Index Nifty 50", logo: "/mutualFund/nippon.png", returns: "+14.24%" },
  { name: "ICICI Prudential Nifty 50 Index Fund", logo: "/mutualFund/icici.jpg", returns: "+14.23%" },
  { name: "SBI Nifty Index Fund", logo: "/mutualFund/sbi.jpg", returns: "+14.21%" },
  { name: "HDFC BSE Sensex Index Fund", logo: "/mutualFund/hdfc.png", returns: "+14.19%" },
];

export const goldFundData: FundItem[] = [
  { name: "Nippon India Gold Savings Fund", logo: "/mutualFund/nippon.png", returns: "+15.82%" },
  { name: "Zerodha Gold ETF FoF", logo: "/mutualFund/zerodha.png", returns: "NA" },
  { name: "Union Gold ETF FoF", logo: "/mutualFund/union.png", returns: "NA" },
  { name: "UTI Silver ETF FoF", logo: "/mutualFund/uti.png", returns: "NA" },
  { name: "UTI Gold ETF FoF", logo: "/mutualFund/uti.png", returns: "NA" },
  { name: "Tata Silver ETF FoF", logo: "/mutualFund/tata.png", returns: "NA" },
  { name: "Tata Gold ETF FoF", logo: "/mutualFund/tata.png", returns: "NA" },
  { name: "SBI Silver ETF FoF", logo: "/mutualFund/sbi.jpg", returns: "NA" },
  { name: "Nippon India Silver ETF FoF", logo: "/mutualFund/nippon.png", returns: "NA" },
  { name: "Motilal Oswal Gold and Silver ETFs FoF", logo: "/mutualFund/motilaloswal.png", returns: "NA" },
];

export const CATEGORY_TO_DATA: Record<FundCategoryKey, FundItem[]> = {
  equity: equityFundData,
  debt: debtFundData,
  hybrid: hybridFundData,
  index: indexFundData,
  elss: elssFundData,
  gold: goldFundData,
};

export type FundSubtype = { title: string; description: string };

export const equityFundTypes: FundSubtype[] = [
  { title: "Large-Cap Funds", description: "Invest at least 80% in top 100 companies by market capitalization." },
  { title: "Mid-Cap Funds", description: "Invest at least 65% in companies ranked 101st to 250th by market cap." },
  { title: "Small-Cap Funds", description: "Invest at least 65% in companies ranked 251 and beyond by market cap." },
  { title: "Multi-Cap Funds", description: "Allocate at least 25% each to large-, mid-, and small-cap segments." },
];

export const debtFundTypes: FundSubtype[] = [
  { title: "Money Market Funds", description: "Lend to companies/governments for up to 1 year." },
  { title: "Corporate Bond Funds", description: "Invest at least 80% in highest-rated corporate debt papers." },
  { title: "Overnight Funds", description: "Invest in securities with 1-day maturity for high liquidity." },
  { title: "Liquid Funds", description: "Invest in debt instruments with up to 91 days maturity." },
];

export const hybridFundTypes: FundSubtype[] = [
  { title: "Aggressive Hybrid", description: "Maintain 65–80% in equities; remainder in debt instruments." },
  { title: "Multi Asset Allocation", description: "Allocate across equities, debt, and gold based on a model." },
  { title: "Dynamic Asset Allocation", description: "Adjust equity-debt mix dynamically with market conditions." },
  { title: "Arbitrage Funds", description: "Use price differentials across markets to generate returns." },
];

export const indexFundTypes: FundSubtype[] = [
  { title: "Broad Market Index Funds", description: "Track major benchmarks like Nifty 50 or Sensex." },
  { title: "Sectoral/Thematic Index Funds", description: "Track sector/theme-specific indices such as banking or tech." },
  { title: "International Index Funds", description: "Track overseas indices like S&P 500 or MSCI World." },
  { title: "Bond Index Funds", description: "Track fixed-income indices like gilt or corporate bond indices." },
];

export const elssFundTypes: FundSubtype[] = [
  { title: "Large-Cap ELSS Funds", description: "Focus on large-cap equities for relatively stable growth." },
  { title: "Mid & Small-Cap ELSS Funds", description: "Target higher growth potential with increased volatility." },
  { title: "Multi-Cap ELSS Funds", description: "Diversify across market caps to balance risk and return." },
  { title: "Thematic ELSS Funds", description: "Concentrate on themes/sectors like tech, healthcare, infra." },
];

export const goldFundTypes: FundSubtype[] = [
  { title: "Gold ETFs", description: "Invest directly in physical gold via exchange-traded funds." },
  { title: "Gold Fund of Funds (FoF)", description: "Invest in gold ETFs through a mutual fund structure." },
  { title: "Gold Savings Funds", description: "Combine gold ETF exposure with short-term debt for liquidity." },
  { title: "Sovereign Gold Bond Funds", description: "Allocate to GoI SGBs; earn fixed interest plus gold returns." },
];

export const CATEGORY_TO_TYPES: Record<FundCategoryKey, FundSubtype[]> = {
  equity: equityFundTypes,
  debt: debtFundTypes,
  hybrid: hybridFundTypes,
  index: indexFundTypes,
  elss: elssFundTypes,
  gold: goldFundTypes,
};

export function categoryFromFundTypeLabel(label: string): FundCategoryKey | null {
  const key = label.toLowerCase();
  if (key.startsWith("equity")) return "equity";
  if (key.startsWith("debt")) return "debt";
  if (key.startsWith("hybrid")) return "hybrid";
  if (key.startsWith("index")) return "index";
  if (key.startsWith("elss")) return "elss";
  if (key.startsWith("gold")) return "gold";
  return null;
}

export function getCategoryMeta(category: FundCategoryKey) {
  return CATEGORY_META[category];
}
