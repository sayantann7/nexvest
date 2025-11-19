export interface PpfInput {
  yearlyContribution: number;
  annualRatePercent: number;
  years: number;
}

export interface PpfResult {
  maturityValue: number;
  investedAmount: number;
  interestEarned: number;
}

export interface PpfYearPoint {
  name: string;
  invested: number;
  value: number;
}

export function calculatePpf({
  yearlyContribution,
  annualRatePercent,
  years,
}: PpfInput): PpfResult {
  const r = annualRatePercent / 100;

  if (years <= 0 || yearlyContribution <= 0) {
    return { maturityValue: 0, investedAmount: 0, interestEarned: 0 };
  }

  if (r === 0) {
    const investedAmount = yearlyContribution * years;
    return { maturityValue: investedAmount, investedAmount, interestEarned: 0 };
  }

  const maturityValue = yearlyContribution * (((Math.pow(1 + r, years) - 1) / r) * (1 + r));
  const investedAmount = yearlyContribution * years;
  const interestEarned = maturityValue - investedAmount;

  return { maturityValue, investedAmount, interestEarned };
}

export function buildPpfChart({
  yearlyContribution,
  annualRatePercent,
  years,
}: PpfInput): PpfYearPoint[] {
  const r = annualRatePercent / 100;
  const data: PpfYearPoint[] = [];
  let value = 0;
  let invested = 0;

  for (let y = 1; y <= years; y++) {
    value = (value + yearlyContribution) * (1 + r);
    invested += yearlyContribution;
    data.push({ name: `Y${y}`, invested, value });
  }

  return data;
}
