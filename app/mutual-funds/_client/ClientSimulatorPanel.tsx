"use client";
import { useState } from 'react';
import InvestmentSimulator from '@/components/InvestmentSimulator';

export default function ClientSimulatorPanel(){
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(7000);
  return (
    <InvestmentSimulator
      monthlyInvestment={monthlyInvestment}
      onInvestmentChange={setMonthlyInvestment}
    />
  );
}
