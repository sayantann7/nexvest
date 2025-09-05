"use client";
import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BackgroundSection } from "@/sections/BackgroundSection/BackgroundSection";
import { HeroSection } from "@/sections/HeroSection";
import { MutualFundsOverviewSection } from "@/sections/MutualFundsOverviewSection/MutualFundsOverviewSection";
import InvestmentTypesInfo from "@/components/InvestmentTypesInfo";
import InvestmentSimulator from "@/components/InvestmentSimulator";
import { TypesOfMutualFundsSection } from "@/sections/TypesOfMutualFundsSection";
import NavbarWithoutAnimation from "@/components/NavbarWithoutAnimation";

function MutualFunds() {

  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(7000);

  return (

    <div className="bg-[#fdfffc] flex flex-row justify-center w-full text-white">
      <div className="bg-app-primary w-full relative">
        {/* Navigation Header */}
        <NavbarWithoutAnimation />
        {/* Main Content Sections */}
        <div className="flex flex-col w-full">
          <AnimatedSection>
            <HeroSection />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <MutualFundsOverviewSection />
          </AnimatedSection>

          <div className="bg-gradient-to-b from-[#f5f7ff] to-[#0D0C34] py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-center text-[#0D0C34] text-3xl md:text-5xl font-bold mb-12">
                Grow Your Wealth With Mutual Funds
              </h2>
              <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Investment Types Info Component */}
                <AnimatedSection delay={0.3} className="w-full lg:w-1/2">
                  <div className="bg-white rounded-2xl shadow-xl h-full p-6 border border-gray-100">
                    <InvestmentTypesInfo />
                  </div>
                </AnimatedSection>
                
                {/* Investment Simulator Component */}
                <AnimatedSection delay={0.4} className="w-full lg:w-1/2">
                  <InvestmentSimulator 
                    monthlyInvestment={monthlyInvestment}
                    onInvestmentChange={setMonthlyInvestment}
                  />
                </AnimatedSection>
              </div>
            </div>
          </div>

          {/* Removed framer-motion AnimatedSection wrapper for TypesOfMutualFundsSection */}
          <TypesOfMutualFundsSection />

          <AnimatedSection delay={0.6}>
            <BackgroundSection />
          </AnimatedSection>
        </div>
      </div>
    </div>

  );
}

export default MutualFunds;