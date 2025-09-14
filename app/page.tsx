import Navbar from "@/components/Navbar";
import StockTicker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InfoSection from "@/components/InfoSection";
import Stats from "@/components/Stats";
import InvestmentPersonalityTest from "@/components/InvestmentPersonalityTest";
import WelcomeAnimation from "@/components/WelcomeAnimation";

function Home() {

  return (
    <div className="min-h-screen bg-[#0D0C34] text-white">
      {/* Full-screen Welcome overlay */}
      <WelcomeAnimation />

      {/* Navbar */}
      <Navbar />

      {/* Stock Ticker Animation */}
      <StockTicker />

  {/* Hero Section */}
      <Hero />

  {/* Why Choose Us Section */}
      <Features />

  {/* Build Something Great Section */}
      <InfoSection />

      {/* Global Stats Section */}
  <Stats />

  {/* Investment Personality Test Moved from personality-test page */}
  <InvestmentPersonalityTest />

    </div>
  );
}

export default Home;