import { describe, it, expect } from "vitest";
import { calculateSip } from "../sip";

describe("calculateSip", () => {
  it("returns zeros for non-positive inputs", () => {
    const res = calculateSip({ monthlyInvestment: 0, annualRatePercent: 12, years: 10 });
    expect(res.futureValue).toBe(0);
    expect(res.investedAmount).toBe(0);
  });

  it("calculates a positive future value for valid inputs", () => {
    const res = calculateSip({ monthlyInvestment: 1000, annualRatePercent: 12, years: 10 });
    expect(res.investedAmount).toBe(1000 * 12 * 10);
    expect(res.futureValue).toBeGreaterThan(res.investedAmount);
  });
});
