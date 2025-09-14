"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CalculatorModal } from "../../components/calculators/CalculatorModal";
import Link from "next/link";

import SIPCalculator from "../../components/calculators/SIPCalculator";
import StepUpSIPCalculator from "../../components/calculators/StepUpSIPCalculator";
import LumpsumCalculator from "../../components/calculators/LumpsumCalculator";
import EMICalculator from "../../components/calculators/EMICalculator";
import FDCalculator from "../../components/calculators/FDCalculator";
import RDCalculator from "../../components/calculators/RDCalculator";
import CAGRReturnsCalculator from "../../components/calculators/CAGRReturnsCalculator";
import CAGRMonthlyReturnCalculator from "../../components/calculators/CAGRMonthlyReturnCalculator";
import CompoundInterestCalculator from "../../components/calculators/CompoundInterestCalculator";
import SimpleInterestCalculator from "../../components/calculators/SimpleInterestCalculator";
import PPFCalculator from "../../components/calculators/PPFCalculator";
import NPSCalculator from "../../components/calculators/NPSCalculator";
import IncomeTaxCalculator from "../../components/calculators/IncomeTaxCalculator";
import HRACalculator from "../../components/calculators/HRACalculator";
import GratuityCalculator from "../../components/calculators/GratuityCalculator";
import MFNavUnitsCalculator from "../../components/calculators/MFNavUnitsCalculator";

const calculators = [
  { key: "sip", title: "SIP Calculator", component: SIPCalculator, description: "Estimate maturity and wealth from monthly SIP contributions." },
  { key: "stepupsip", title: "Step Up SIP Calculator", component: StepUpSIPCalculator, description: "Project SIP value with annual step-up in contribution amount." },
  { key: "lumpsum", title: "Lumpsum Calculator", component: LumpsumCalculator, description: "Calculate future value of a one-time investment." },
  { key: "mfnav", title: "Mutual Fund NAV/Units", component: MFNavUnitsCalculator, description: "Convert between amount, NAV, and units for mutual funds." },
  { key: "mfreturns", title: "MF CAGR & Absolute Return", component: CAGRReturnsCalculator, description: "Compute absolute return and CAGR between initial and final values." },
  { key: "cagrConv", title: "Monthly→Annual Return", component: CAGRMonthlyReturnCalculator, description: "Convert a monthly return rate to its annualized equivalent." },
  { key: "emi", title: "EMI Calculator", component: EMICalculator, description: "Find monthly EMI, interest cost, and amortization breakdown." },
  { key: "fd", title: "FD Calculator", component: FDCalculator, description: "Estimate FD maturity with compounding and tenure options." },
  { key: "rd", title: "RD Calculator", component: RDCalculator, description: "Project RD maturity from monthly deposits and interest rate." },
  { key: "compound", title: "Compound Interest", component: CompoundInterestCalculator, description: "Calculate future value using compound interest over time." },
  { key: "simple", title: "Simple Interest", component: SimpleInterestCalculator, description: "Calculate interest and total using simple interest." },
  { key: "ppf", title: "PPF Calculator", component: PPFCalculator, description: "Estimate PPF maturity and yearly interest for the 15-year scheme." },
  { key: "nps", title: "NPS Calculator", component: NPSCalculator, description: "Project NPS retirement corpus and potential monthly pension." },
  { key: "hra", title: "HRA Calculator", component: HRACalculator, description: "Compute HRA exemption based on salary, rent paid, and city." },
  { key: "gratuity", title: "Gratuity Calculator", component: GratuityCalculator, description: "Estimate gratuity from last drawn salary and years of service." },
  { key: "incomeTax", title: "Income Tax (est.)", component: IncomeTaxCalculator, description: "Estimate annual income tax liability under current slabs." },
] as const;

export default function CalculatorsPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const Active = calculators.find(c => c.key === openKey)?.component;
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return calculators;
    return calculators.filter(c => c.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-[#0D0C34] text-white">
  <Navbar />
      <main className="relative pt-10 pb-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-[360px] bg-[radial-gradient(ellipse_at_top,rgba(9,255,236,0.15),transparent_60%)]" />
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 mb-3">Tools & Calculators</div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">Plan, Compare, and Calculate</h1>
            <p className="text-slate-300 max-w-3xl mx-auto">SIPs, deposits, loans, taxes, and more. Find the calculator you need and get instant, accurate results.</p>
            <div className="mt-6 max-w-xl mx-auto">
              <div className="flex items-stretch">
                <input
                  value={query}
                  onChange={(e)=>setQuery(e.target.value)}
                  placeholder="Search calculators (e.g. SIP, EMI, HRA)"
                  className="w-full rounded-l-xl border border-white/10 bg-[#131740] text-white placeholder-slate-400 px-4 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                  aria-label="Search calculators"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-r-xl rounded-l-none border-l-0 border-white/10 text-white hover:bg-white/10 h-12 px-5"
                >
                  Search
                </Button>
              </div>
            </div>
          </motion.div>

          <section className="mb-8">
            <h2 className="font-heading text-2xl font-semibold mb-4">Mutual Fund Tools and Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {filtered.slice(0,6).map(c => (
                <div key={c.key} className="text-left group h-full">
                  <Card className="h-full border border-white/10 bg-gradient-to-b from-[#15194a] to-[#10143d] hover:from-[#182056] hover:to-[#11164a] transition-colors rounded-2xl p-5 shadow-[0_10px_40px_-10px_rgba(9,255,236,0.15)]">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="font-heading text-lg mb-1">{c.title}</div>
                        <div className="text-xs text-slate-400">{c.description}</div>
                      </div>
                      <div className="mt-auto pt-6">
                        <div className="flex gap-2">
                          <Link href={`/calculators/${c.key}`}>
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" type="button">View Calculator</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-semibold mb-4">Other Tools and Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {filtered.slice(6).map(c => (
                <div key={c.key} className="text-left group h-full">
                  <Card className="h-full border border-white/10 bg-gradient-to-b from-[#15194a] to-[#10143d] hover:from-[#182056] hover:to-[#11164a] transition-colors rounded-2xl p-5 shadow-[0_10px_40px_-10px_rgba(9,255,236,0.15)]">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="font-heading text-lg mb-1">{c.title}</div>
                        <div className="text-xs text-slate-400">{c.description}</div>
                      </div>
                      <div className="mt-auto pt-6">
                        <div className="flex gap-2">
                          <Link href={`/calculators/${c.key}`}>
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" type="button">View Calculator</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <CalculatorModal open={!!Active} onClose={()=>setOpenKey(null)} title={calculators.find(c=>c.key===openKey)?.title ?? "Calculator"}>
        {Active && <Active />}
      </CalculatorModal>
    </div>
  );
}
