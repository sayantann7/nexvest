export interface NpsInput {
  monthlyContribution: number;
  annualRatePercent: number;
  years: number;
}

export interface NpsResult {
  corpus: number;
  investedAmount: number;
  lumpsum: number;
  annuitized: number;
}

export interface NpsChartPoint {
  name: string;
  invested: number;
  value: number;
}

export function calculateNps({
  monthlyContribution,
  annualRatePercent,
  years,
}: NpsInput): NpsResult {
  const n = years * 12;
  const r = annualRatePercent / 100 / 12;

  if (n <= 0 || monthlyContribution <= 0) {
    return { corpus: 0, investedAmount: 0, lumpsum: 0, annuitized: 0 };
  }

  if (r === 0) {
    const investedAmount = monthlyContribution * n;
    return {
      corpus: investedAmount,
      investedAmount,
      lumpsum: investedAmount * 0.6,
      annuitized: investedAmount * 0.4,
    };
  }

  const corpus = monthlyContribution * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const investedAmount = monthlyContribution * n;
  const lumpsum = corpus * 0.6;
  const annuitized = corpus * 0.4;

  return { corpus, investedAmount, lumpsum, annuitized };
}

export function buildNpsChart({ years }: Pick<NpsInput, "years">): NpsChartPoint[] {
  const r = 0.1 / 12; // illustrative 10% blended rate
  const months = years * 12;
  const data: NpsChartPoint[] = [];
  let invested = 0;
  let value = 0;

  for (let i = 1; i <= months; i++) {
    value = (value + 1000) * (1 + r);
    invested += 1000;
    if (i % 12 === 0) {
      data.push({ name: `Y${i / 12}`, invested, value });
    }
  }

  return data;
}
