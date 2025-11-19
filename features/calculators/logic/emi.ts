export interface EmiInput {
  principal: number;
  annualRatePercent: number;
  years: number;
}

export interface EmiResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

export interface EmiAmortizationPoint {
  name: string;
  balance: number;
}

export interface EmiAmortization {
  emi: number;
  schedule: EmiAmortizationPoint[];
}

export function calculateEmi({ principal, annualRatePercent, years }: EmiInput): EmiResult {
  const n = years * 12;
  const r = annualRatePercent / 100 / 12;

  if (n <= 0 || principal <= 0) {
    return { emi: 0, totalPayment: 0, totalInterest: 0 };
  }

  if (r === 0) {
    const emi = principal / n;
    const totalPayment = emi * n;
    return { emi, totalPayment, totalInterest: totalPayment - principal };
  }

  const pow = Math.pow(1 + r, n);
  const emi = (principal * r * pow) / (pow - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  return { emi, totalPayment, totalInterest };
}

export function buildEmiAmortization({
  principal,
  annualRatePercent,
  years,
}: EmiInput): EmiAmortization {
  const n = years * 12;
  const r = annualRatePercent / 100 / 12;

  const { emi } = calculateEmi({ principal, annualRatePercent, years });

  let balance = principal;
  const schedule: EmiAmortizationPoint[] = [];

  for (let m = 1; m <= n; m++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);
    if (m % 12 === 0 || m === n) {
      schedule.push({ name: `Y${Math.ceil(m / 12)}`, balance });
    }
  }

  return { emi, schedule };
}
