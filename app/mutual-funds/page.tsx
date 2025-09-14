"use client";
import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HeroSection } from "@/sections/HeroSection";
import { MutualFundsOverviewSection } from "@/sections/MutualFundsOverviewSection/MutualFundsOverviewSection";
import InvestmentTypesInfo from "@/components/InvestmentTypesInfo";
import InvestmentSimulator from "@/components/InvestmentSimulator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypesOfMutualFundsSection } from "@/sections/TypesOfMutualFundsSection";

function MutualFunds() {

  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(7000);

  return (

    <div className="bg-[#0D0C34] flex flex-row justify-center w-full text-white">
      <div className="w-full relative">
  {/* Navigation Header */}
  <Navbar />
        {/* Main Content Sections */}
        <div className="flex flex-col w-full">
          <AnimatedSection>
            <HeroSection />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <MutualFundsOverviewSection />
          </AnimatedSection>

          <div className="bg-[#0D0C34] py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-center text-white text-3xl md:text-5xl font-heading font-bold mb-12">
                Grow Your Wealth With Mutual Funds
              </h2>
              <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Investment Types Info Component */}
                <AnimatedSection delay={0.3} className="w-full lg:w-1/2">
                  <div className="bg-[#131740] rounded-2xl shadow-xl h-full p-6 border border-white/10">
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

              {/* Calculators CTA */}
              <div className="mt-8">
                <div className="bg-[#131740] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-heading font-semibold">Explore our Calculators</h3>
                    <p className="text-white/70 text-sm md:text-base mt-1">Plan SIP, lumpsum returns, and more with interactive tools tailored for mutual funds.</p>
                  </div>
                  <Link href="/calculators" className="shrink-0">
                    <Button size="lg" className="bg-teal-400/20 hover:bg-teal-400/30 text-teal-300 border border-teal-300/30">
                      Open Calculators
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Removed framer-motion AnimatedSection wrapper for TypesOfMutualFundsSection */}
          <TypesOfMutualFundsSection />
        </div>
      </div>
    </div>

  );
}

export default MutualFunds;