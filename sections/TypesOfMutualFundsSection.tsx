import Link from "next/link";
import { categoryFromFundTypeLabel } from "@/lib/mutualFundsData";
import { Card, CardContent } from "@/components/ui/card";
// Removed framer-motion animations for a static experience
import { ChevronRight, TrendingUp, BarChart2, PieChart } from "lucide-react";

const equityFundData = [
  {
    name: "Quant Small Cap Fund",
    logo: "/mutualFund/quant.png",
    returns: "+25.62%",
  },
  {
    name: "Nippon India Small Cap Fund",
    logo: "/mutualFund/nippon.png",
    returns: "+24.22%",
  },
  {
    name: "Quant Infrastructure Fund",
    logo: "/mutualFund/quant.png",
    returns: "+24.06%",
  },
  { name: "Quant ELSS Tax Saver Fund", logo: "/mutualFund/quant.png", returns: "+23.08%" },
  {
    name: "Motilal Oswal Midcap Fund",
    logo: "/mutualFund/motilal.svg",
    returns: "+22.86%",
  },
  { name: "Quant Mid Cap Fund", logo: "/mutualFund/quant.png", returns: "+22.82%" },
  { name: "Quant Flexi Cap Fund", logo: "/mutualFund/quant.png", returns: "+22.55%" },
  { name: "Edelweiss Mid Cap Fund", logo: "/mutualFund/edelweiss.png", returns: "(+22.47% p.a." },
  {
    name: "ICICI Prudential Infrastructure Fund",
    logo: "/mutualFund/icici.jpg",
    returns: "+22.38%",
  },
  {
    name: "Invesco India Infrastructure Fund",
    logo: "/mutualFund/invesco.png",
    returns: "+22.23%",
  },
];

const debtFundData = [
  {
    name: "Aditya Birla Sun Life Medium Term Fund",
    logo: "/mutualFund/adityabirla.png",
    returns: "+10.36%",
  },
  {
    name: "Aditya Birla Sun Life Credit Risk Fund",
    logo: "/mutualFund/adityabirla.png",
    returns: "+9.47%",
  },
  {
    name: "DSP Gilt Fund",
    logo: "/mutualFund/dsp.png",
    returns: "+8.76%",
  },
  { name: "Baroda BNP Paribas Credit Risk Fund", logo: "mutualFund/baroda.png", returns: "+8.68%" },
  {
    name: "ICICI Prudential All Seasons Bond Fund",
    logo: "/mutualFund/icici.jpg",
    returns: "+8.66%",
  },
  {
    name: "SBI Magnum Gilt Fund",
    logo: "/mutualFund/sbi.jpg",
    returns: "+8.66%",
  },
  {
    name: "Bandhan GSF Investment Fund",
    logo: "/mutualFund/bandhan.jpg",
    returns: "+8.62%",
  },
  {
    name: "Edelweiss Government Securities Fund",
    logo: "/mutualFund/edelweiss.png",
    returns: "+8.55%",
  },
  {
    name: "ICICI Prudential Gilt Fund",
    logo: "/mutualFund/icici.jpg",
    returns: "+8.53%",
  },
  {
    name: "Kotak Gilt Investment Fund",
    logo: "/mutualFund/kotak.png",
    returns: "+8.52%",
  },
];

const hybridFundData = [
  {
    name: "Quant Multi Asset Fund",
    logo: "/mutualFund/quant.png",
    returns: "+21.23%",
  },
  {
    name: "ICICI Prudential Equity & Debt Fund",
    logo: "/mutualFund/icici.jpg",
    returns: "+18.81%",
  },
  {
    name: "Quant Absolute Fund",
    logo: "/mutualFund/quant.png",
    returns: "+18.51%",
  },
  {
    name: "ICICI Prudential Multi Asset Fund",
    logo: "/mutualFund/icici.jpg",
    returns: "+18.38%",
  },
  {
    name: "HDFC Balanced Advantage Fund",
    logo: "/mutualFund/hdfc.png",
    returns: "+17.65%",
  },
  {
    name: "Kotak Multi Asset Allocator FoF - Dynamic",
    logo: "/mutualFund/kotak.png",
    returns: "+17.32%",
  },
  {
    name: "JM Aggressive Hybrid Fund",
    logo: "/mutualFund/jm.png",
    returns: "+17.02%",
  },
  {
    name: "Edelweiss Aggressive Hybrid Fund",
    logo: "/mutualFund/edelweiss.png",
    returns: "+16.61%",
  },
  {
    name: "Kotak Equity Hybrid Fund",
    logo: "/mutualFund/kotak.png",
    returns: "+15.80%",
  },
  {
    name: "DSP Aggressive Hybrid Fund",
    logo: "/mutualFund/dsp.png",
    returns: "+15.53%",
  },
];

const elssFundData = [
  {
    name: "Kotak ELSS Tax Saver Fund",
    logo: "/mutualFund/kotak.png",
    returns: "+17.36%",
  },
  {
    name: "Canara Robeco ELSS Tax Saver",
    logo: "/mutualFund/canara.png",
    returns: "+17.36%",
  },
  {
    name: "Franklin India ELSS Tax Saver Fund",
    logo: "/mutualFund/frankling.png",
    returns: "+17.02%",
  },
  {
    name: "Invesco India ELSS Tax Saver Fund",
    logo: "/mutualFund/invesco.png",
    returns: "+16.50%",
  },
  {
    name: "Tata ELSS Tax Saver Fund",
    logo: "/mutualFund/tata.png",
    returns: "+16.44%",
  },
  {
    name: "ICICI Prudential ELSS Tax Saver",
    logo: "/mutualFund/icici.jpg",
    returns: "+16.13%",
  },
  {
    name: "HSBC ELSS Tax Saver Fund",
    logo: "/mutualFund/hsbc.png",
    returns: "+15.87%",
  },
  {
    name: "Baroda BNP Paribas ELSS Tax Saver Fund",
    logo: "/mutualFund/baroda.png",
    returns: "+15.86%",
  },
  {
    name: "Union ELSS Tax Saver Fund",
    logo: "/mutualFund/union.png",
    returns: "+15.63%",
  },
  {
    name: "Edelweiss ELSS Tax Saver Fund",
    logo: "/mutualFund/edelweiss.png",
    returns: "+15.49%",
  },
];

const indexFundData = [
  {
    name: "ICICI Prudential Nifty Next 50 Index Fund",
    logo: "/mutualFund/icici.jpg",
    returns: "+15.17%",
  },
  {
    name: "Sundaram Nifty 100 Equal Weight Fund",
    logo: "/mutualFund/sundaram.png",
    returns: "+14.69%",
  },
  {
    name: "Bandhan Nifty 50 Index Fund",
    logo: "/mutualFund/bandhan.jpg",
    returns: "+14.42%",
  },
  {
    name: "UTI Nifty 50 Index Fund",
    logo: "/mutualFund/uti.png",
    returns: "+14.34%",
  },
  {
    name: "HDFC Nifty 50 Index Fund",
    logo: "/mutualFund/hdfc.png",
    returns: "+14.28%",
  },
  {
    name: "Tata Nifty 50 Index Fund",
    logo: "/mutualFund/tata.png",
    returns: "+14.25%",
  },
  {
    name: "Nippon India Index Nifty 50",
    logo: "/mutualFund/nippon.png",
    returns: "+14.24%",
  },
  {
    name: "ICICI Prudential Nifty 50 Index Fund",
    logo: "/mutualFund/icici.jpg",
    returns: "+14.23%",
  },
  {
    name: "SBI Nifty Index Fund",
    logo: "/mutualFund/sbi.jpg",
    returns: "+14.21%",
  },
  {
    name: "HDFC BSE Sensex Index Fund",
    logo: "/mutualFund/hdfc.png",
    returns: "+14.19%",
  },
];

const goldFundData = [
  {
    name: "Nippon India Gold Savings Fund",
    logo: "/mutualFund/nippon.png",
    returns: "+15.82%",
  },
  {
    name: "Zerodha Gold ETF FoF",
    logo: "/mutualFund/zerodha.png",
    returns: "NA",
  },
  {
    name: "Union Gold ETF FoF",
    logo: "/mutualFund/union.png",
    returns: "NA",
  },
  {
    name: "UTI Silver ETF FoF",
    logo: "/mutualFund/uti.png",
    returns: "NA",
  },
  {
    name: "UTI Gold ETF FoF",
    logo: "/mutualFund/uti.png",
    returns: "NA",
  },
  {
    name: "Tata Silver ETF FoF",
    logo: "/mutualFund/tata.png",
    returns: "NA",
  },
  {
    name: "Tata Gold ETF FoF",
    logo: "/mutualFund/tata.png",
    returns: "NA",
  },
  {
    name: "SBI Silver ETF FoF",
    logo: "/mutualFund/sbi.jpg",
    returns: "NA",
  },
  {
    name: "Nippon India Silver ETF FoF",
    logo: "/mutualFund/nippon.png",
    returns: "NA",
  },
  {
    name: "Motilal Oswal Gold and Silver ETFs FoF",
    logo: "/mutualFund/motilaloswal.png",
    returns: "NA",
  },
];

const equityFundTypes = [
  {
    title: "Large-Cap Funds",
    description:
      "These funds invest at least 80% of their assets in the top 100 companies by market capitalization.",
  },
  {
    title: "Mid-Cap Funds",
    description:
      "These funds invest at least 65% of their assets in the next 150 (101st to 250th) companies ranked by market capitalization.",
  },
  {
    title: "Small-Cap Funds",
    description:
      "Such funds invest at least 65% of their assets in companies ranked 251 and above by market capitalization.",
  },
  {
    title: "Multi-Cap Funds",
    description:
      "These funds invest at least 25% of their assets in each of the large, mid, and small-cap stocks.",
  },
];

const debtFundTypes = [
  {
    title: "Money Market Funds",
    description:
      "These funds generate returns by lending to companies or governments for up to 1 year.",
  },
  {
    title: "Corporate Bond Funds",
    description:
      "These funds earn returns by lending mostly (at least 80%) to companies with the highest-rated debt papers.",
  },
  {
    title: "Overnight Funds",
    description:
      "These funds earn their returns by lending to companies or governments for one business day.",
  },
  {
    title: "Liquid Funds",
    description:
      "These funds generate their returns by lending to companies or governments for up to 91 days.",
  },
];

const hybridFundTypes = [
  {
    title: "Aggressive Hybrid",
    description:
      "These funds have to invest at least 65% of their assets in equities while it can't exceed 80%. The rest goes into debt.",
  },
  {
    title: "Multi Asset Allocation",
    description:
      "Also known as Balanced Advantage Funds, these funds can go up to 0-100% in equities or debt based on predefined asset allocation models they follow.",
  },
  {
    title: "Dynamic Asset Allocation Funds",
    description:
      "Also known as Balanced Advantage Funds, these funds can go up to 0-100% in equities or debt based on predefined asset allocation models they follow.",
  },
  {
    title: "Arbitrage Funds",
    description:
      "These funds generate returns by using opportunities of price differences of securities in different markets.",
  },
];

const elssFundTypes = [
  {
    title: "Large-Cap ELSS Funds",
    description:
      "These funds invest predominantly in well-established large-cap companies for relatively stable long-term growth.",
  },
  {
    title: "Mid & Small-Cap ELSS Funds",
    description:
      "These funds focus on mid- and small-cap companies offering higher growth potential but with greater volatility.",
  },
  {
    title: "Multi-Cap ELSS Funds",
    description:
      "These funds diversify across large-, mid-, and small-cap stocks to balance risk and return across different market cycles.",
  },
  {
    title: "Thematic ELSS Funds",
    description:
      "These funds concentrate investments in specific themes or sectors—like technology, healthcare, or infrastructure—to capitalize on sectoral growth trends.",
  },
];

const goldFundTypes = [
  {
    title: "Gold Exchange Traded Funds (ETFs)",
    description:
      "These funds invest directly in physical gold bullion and trade on the stock exchange, offering real-time price tracking of gold.",
  },
  {
    title: "Gold Fund of Funds (FoF)",
    description:
      "These funds invest primarily in gold ETFs, providing exposure to gold via a mutual-fund structure with end-of-day NAV pricing.",
  },
  {
    title: "Gold Savings Funds",
    description:
      "These funds combine investments in gold ETFs with short-term debt instruments (like money market securities) to enhance liquidity and reduce volatility.",
  },
  {
    title: "Sovereign Gold Bond Funds",
    description:
      "These funds allocate to Government of India Sovereign Gold Bonds, earning fixed interest plus gold-price appreciation without physical storage.",
  },
];

const indexFundTypes = [
  {
    title: "Broad Market Index Funds",
    description:
      "These funds track major equity benchmarks like the Nifty 50 or Sensex by investing in the same proportion of stocks as the index.",
  },
  {
    title: "Sectoral/Thematic Index Funds",
    description:
      "These funds mirror sector- or theme-specific indices (e.g., banking, technology, infrastructure) to capture targeted market trends.",
  },
  {
    title: "International Index Funds",
    description:
      "These funds invest in overseas equity indices such as the S&P 500 or MSCI World, providing global diversification.",
  },
  {
    title: "Bond Index Funds",
    description:
      "These funds track fixed-income indices (e.g., gilt or corporate bond indices) to deliver returns aligned with interest-rate movements.",
  },
];

export const TypesOfMutualFundsSection = (): React.ReactElement => {
  // Removed animation variants previously used with framer-motion

  // Icons for fund types
  const fundTypeIcons = {
    Equity: <TrendingUp className="w-8 h-8 text-[#09ffec]" />,
    Debt: <BarChart2 className="w-8 h-8 text-[#09ffec]" />,
    Hybrid: <PieChart className="w-8 h-8 text-[#09ffec]" />,
    Index: <BarChart2 className="w-8 h-8 text-[#09ffec]" />,
    ELSS: <PieChart className="w-8 h-8 text-[#09ffec]" />,
    Gold: <TrendingUp className="w-8 h-8 text-[#09ffec]" />,
  };

  const FundCard = ({ data, fundType }: { data: typeof equityFundData; fundType: string }) => {
    // Always show a short preview here; full list moves to dedicated pages
    const displayedData = data.slice(0, 5);

    return (
      <div className="w-full md:w-[532px]">
        <Card className="flex flex-col items-center gap-5 p-4 bg-white rounded-2xl overflow-hidden shadow-[0px_0px_30px_rgba(0,0,0,0.1)] transform transition-all duration-300 hover:shadow-[0px_0px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1 border border-gray-200 text-gray-200 bg-[#0d0c34]">
          <CardContent className="flex flex-col w-full items-start p-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative w-full border-b border-gray-100 pb-4 mb-2">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-[#0d0c34] to-[#1a1956] p-2 rounded-lg">
                  {fundTypeIcons[fundType as keyof typeof fundTypeIcons]}
                </div>
                <div className="font-medium text-gray-200 text-lg">Top {fundType} Mutual Funds</div>
              </div>
              <div className="border border-gray-200 px-4 py-2 rounded-full text-gray-300 font-medium text-sm">
                5Y Returns (Annualized)
              </div>
            </div>

            <div className="flex flex-col items-start w-full text-gray-200">
              {displayedData.map((fund, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row w-full border-b border-[#f5f7ff] transition-colors"
                >
                  <div className="w-full md:w-[286px] py-4 px-3">
                    <div className="flex items-center">
                      <div
                        className="w-11 h-11 rounded-full border border-solid border-[#eaeaea] bg-cover bg-center shadow-sm"
                        style={{ backgroundImage: `url(${fund.logo})` }}
                      />
                      <div className="ml-3.5 font-medium text-gray-300 text-[15px] leading-5">
                        {fund.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-stretch w-full md:w-auto">
                    <div className="py-4 px-5 border-l border-[#f5f7ff] flex items-center justify-center">
                      <div className="font-bold text-gray-300 text-base md:text-lg text-center">
                        {fund.returns}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          {data.length > 5 && (
            <Link
              href={`/mutual-funds/${categoryFromFundTypeLabel(fundType)}`}
              className="flex items-center justify-center mt-0 group hover:scale-[1.02] transition-transform text-gray-200"
            >
              <span className="font-medium text-gray-200 text-sm text-center mr-2">
                {`See all ${fundType} Mutual Funds`}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-200 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
        </Card>
      </div>
    );
  };

  const FundTypeSection = ({
    title,
    description,
    types,
  }: {
    title: string;
    description: React.ReactNode;
    types: typeof equityFundTypes;
    sectionIndex: number;
  }) => {
    const fundType = title.split(" ")[0];

    // Using consistent styling for all sections (using the styles from sectionIndex 0)
    const headingColor = "text-white";
    const descriptionColor = "text-gray-300";
    const typesHeadingColor = "text-white";
    const borderColor = "border-gray-700";

    // Card colors - using the same styling for all cards
    const cardBg = "bg-[#131740]";
    const cardText = "text-white";
    const cardDesc = "text-gray-300";
    const cardBorder = "border-gray-700";

    return (
      <div className="flex flex-col w-full md:w-[625px] items-start gap-10">
        <div className="flex flex-col items-start gap-6 w-full">
          <div className="flex items-center gap-3.5 w-full">
            <div className="w-[5px] h-[42px] bg-gradient-to-b from-[#09ffec] to-[#0d0c34] rounded-full" />
            <h2
              className={`font-heading font-bold ${headingColor} text-2xl md:text-[40px] leading-normal`}
            >
              {title}
            </h2>
          </div>
          <div className={`pl-8 border-l-2 ${borderColor}`}>
            <p className={`font-normal ${descriptionColor} text-lg md:text-xl leading-relaxed`}>
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-8 w-full">
          <div className="flex items-center gap-3">
            {fundTypeIcons[fundType as keyof typeof fundTypeIcons]}
            <h3
              className={`font-heading font-semibold ${typesHeadingColor} text-xl md:text-2xl leading-normal`}
            >
              Types of {fundType} Funds
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {types.map((type, index) => (
              <div
                key={index}
                className={`${cardBg} rounded-xl shadow-sm p-5 border ${cardBorder} transition-shadow duration-300`}
              >
                <h4
                  className={`font-semibold ${cardText} text-lg md:text-xl leading-normal border-b ${cardBorder} pb-2 mb-3`}
                >
                  {type.title}
                </h4>
                <p className={`font-normal ${cardDesc} text-sm md:text-[15px] leading-relaxed`}>
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-[#0D0C34] py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="relative mb-16">
          <h1 className="text-center font-heading font-bold text-white text-3xl md:text:[54px] leading-normal mb-4">
            Types of{" "}
            <span className="relative inline-block">
              Mutual Funds
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#09ffec]/40"></span>
            </span>
          </h1>
          <p className="text-center font-medium text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            Mutual funds in India are classified into different categories based on the asset class
            they invest in.
          </p>

          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#09ffec]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-10 w-40 h-40 bg-[#09ffec]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="flex flex-col gap-28 md:gap-40">
          {/* First section - Equity */}
          <div className="relative">
            <div className="flex flex-col lg:flex-row items-start gap-12 md:gap-[86px]">
              <FundTypeSection
                title="Equity Mutual Funds"
                description="Equity funds invest a majority of their assets in stocks. These funds are classified into different categories based on the market cap of the stocks they invest in."
                types={equityFundTypes}
                sectionIndex={0}
              />
              <FundCard data={equityFundData} fundType="Equity" />
            </div>
          </div>

          {/* Second section - Debt */}
          <div className="relative">
            <div className="flex flex-col lg:flex-row-reverse items-start gap-12 md:gap-[95px]">
              <FundTypeSection
                title="Debt Mutual Funds"
                description={
                  <>
                    <span className="text-[#09ffec] font-medium">Debt funds</span> generate returns
                    by lending money to corporates and the government by buying their debt papers.
                    These funds are classified into different categories based on their lending
                    period and credit quality of the papers.
                  </>
                }
                types={debtFundTypes}
                sectionIndex={0}
              />
              <FundCard data={debtFundData} fundType="Debt" />
            </div>
            {/* Decorative line */}
            <div className="absolute bottom-[-14rem] lg:bottom-[-5rem] left-1/2 transform -translate-x-1/2 w-[1px] h-[8rem] bg-gradient-to-b from-[#09ffec]/50 to-transparent"></div>
          </div>

          {/* Third section - Hybrid */}
          <div className="relative">
            <div className="flex flex-col lg:flex-row items-start gap-12 md:gap-[95px]">
              <FundTypeSection
                title="Hybrid Mutual Funds"
                description={
                  <>
                    Hybrid funds invest in a mix of asset classes, including equity, debt, or gold.
                    There are multiple categories of{" "}
                    <a
                      href="https://www.etmoney.com/mutual-funds/hybrid"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-[#09ffec] font-medium underline hover:text-[#09ffec]/80 transition-colors"
                    >
                      hybrid funds
                    </a>{" "}
                    based on how much they allocate across different asset classes.
                  </>
                }
                types={hybridFundTypes}
                sectionIndex={0}
              />
              <FundCard data={hybridFundData} fundType="Hybrid" />
            </div>
          </div>

          {/* Fourth section - Index */}
          <div className="relative">
            <div className="flex flex-col lg:flex-row-reverse items-start gap-12 md:gap-[95px]">
              <FundTypeSection
                title="Index Mutual Funds"
                description={
                  <>
                    <span className="text-[#09ffec] font-medium">Index mutual funds</span> are
                    passively managed portfolios designed to replicate the performance of a specific
                    market benchmark—such as the Nifty 50, Sensex, S&P 500, or a bond index—by
                    holding the same securities in the same proportions.
                  </>
                }
                types={indexFundTypes}
                sectionIndex={0}
              />
              <FundCard data={indexFundData} fundType="Index" />
            </div>
            {/* Decorative line */}
            <div className="absolute bottom-[-14rem] lg:bottom-[-5rem] left-1/2 transform -translate-x-1/2 w-[1px] h-[8rem] bg-gradient-to-b from-[#09ffec]/50 to-transparent"></div>
          </div>

          {/* Fifth section - ELSS */}
          <div className="relative">
            <div className="flex flex-col lg:flex-row items-start gap-12 md:gap-[95px]">
              <FundTypeSection
                title="ELSS Mutual Funds"
                description={
                  <>
                    Equity-Linked Savings Schemes (ELSS) are diversified equity mutual funds that
                    come with a mandatory three-year lock-in period. They offer the potential for
                    higher long-term capital appreciation compared to pure debt or hybrid funds.
                  </>
                }
                types={elssFundTypes}
                sectionIndex={0}
              />
              <FundCard data={elssFundData} fundType="ELSS" />
            </div>
          </div>

          {/* Sixth section - Gold */}
          <div className="relative">
            <div className="flex flex-col lg:flex-row-reverse items-start gap-12 md:gap-[95px]">
              <FundTypeSection
                title="Gold Mutual Funds"
                description={
                  <>
                    <span className="text-[#09ffec] font-medium">Gold mutual funds</span> invest
                    primarily in instruments that track the price of gold—such as gold ETFs,
                    sovereign gold bonds, or gold-related securities—without the need to physically
                    buy, store, or insure bullion.
                  </>
                }
                types={goldFundTypes}
                sectionIndex={0}
              />
              <FundCard data={goldFundData} fundType="Gold" />
            </div>
            {/* Decorative line */}
            <div className="absolute bottom-[-14rem] lg:bottom-[-5rem] left-1/2 transform -translate-x-1/2 w-[1px] h-[8rem] bg-gradient-to-b from-[#09ffec]/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
