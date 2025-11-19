export interface SipInput {
  monthlyInvestment: number;
  annualRatePercent: number;
  years: number;
}

export interface SipResult {
  futureValue: number;
  investedAmount: number;
  gain: number;
  impliedCagr: number;
}

export function calculateSip({ monthlyInvestment, annualRatePercent, years }: SipInput): SipResult {
  const n = years * 12;
  const r = annualRatePercent / 100 / 12;

  if (n <= 0 || monthlyInvestment <= 0) {
    return {
      futureValue: 0,
      investedAmount: 0,
      gain: 0,
      impliedCagr: 0,
    };
  }

  if (r === 0) {
    const investedAmount = monthlyInvestment * n;
    return {
      futureValue: investedAmount,
      investedAmount,
      gain: 0,
      impliedCagr: 0,
    };
  }

  const futureValue = monthlyInvestment * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const investedAmount = monthlyInvestment * n;
  const gain = futureValue - investedAmount;
  const impliedCagr =
    years > 0 && investedAmount > 0 ? Math.pow(futureValue / investedAmount, 1 / years) - 1 : 0;

  return {
    futureValue,
    investedAmount,
    gain,
    impliedCagr,
  };
}
