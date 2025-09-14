import SIPCalculator from "./SIPCalculator";
import StepUpSIPCalculator from "./StepUpSIPCalculator";
import LumpsumCalculator from "./LumpsumCalculator";
import EMICalculator from "./EMICalculator";
import FDCalculator from "./FDCalculator";
import RDCalculator from "./RDCalculator";
import CAGRReturnsCalculator from "./CAGRReturnsCalculator";
import CAGRMonthlyReturnCalculator from "./CAGRMonthlyReturnCalculator";
import CompoundInterestCalculator from "./CompoundInterestCalculator";
import SimpleInterestCalculator from "./SimpleInterestCalculator";
import PPFCalculator from "./PPFCalculator";
import NPSCalculator from "./NPSCalculator";
import IncomeTaxCalculator from "./IncomeTaxCalculator";
import HRACalculator from "./HRACalculator";
import GratuityCalculator from "./GratuityCalculator";
import MFNavUnitsCalculator from "./MFNavUnitsCalculator";
import TDSCalculator from "./TDSCalculator";
import SalaryCalculator from "./SalaryCalculator";

export type FAQ = { q: string; a: string };

export type CalculatorEntry = {
  slug: string;
  title: string;
  short: string;
  component: React.FC;
  details: {
    purpose: string;
    formula?: string;
    inputs: string[];
    outputs: string[];
    notes?: string[];
  };
  faqs: FAQ[];
};

export const calculatorsRegistry: Record<string, CalculatorEntry> = {
  sip: {
    slug: "sip",
    title: "SIP Calculator",
    short: "Know returns from SIP or plan a future goal.",
    component: SIPCalculator,
    details: {
      purpose: "Estimate the future value of a Systematic Investment Plan (monthly investing).",
      formula: "FV = P * [((1 + r)^n − 1) / r] * (1 + r)",
      inputs: ["Monthly investment (P)", "Expected return p.a. (%)", "Time period (years)"],
      outputs: ["Estimated value (FV)", "Total invested", "Wealth gain", "Implied CAGR"],
      notes: [
        "r is monthly rate = annual% / 12",
        "n is number of months = years × 12",
      ],
    },
    faqs: [
      { q: "What is SIP?", a: "A SIP is a disciplined way to invest a fixed amount at regular intervals (typically monthly) into mutual funds." },
      { q: "Is the return guaranteed?", a: "No. Market-linked investments don’t guarantee returns; the calculator is for illustration only." },
    ],
  },
  stepupsip: {
    slug: "stepupsip",
    title: "Step Up SIP Calculator",
    short: "See how increasing SIP each year accelerates returns.",
    component: StepUpSIPCalculator,
    details: {
      purpose: "Estimate future value when the monthly SIP increases by a fixed percentage every year.",
      formula: "Simulated month-by-month with an annual step-up in monthly contribution.",
      inputs: ["Starting monthly SIP", "Expected return p.a. (%)", "Time period (years)", "Annual step-up (%)"],
      outputs: ["Estimated value", "Total invested", "Wealth gain", "Implied CAGR"],
    },
    faqs: [
      { q: "What is step-up?", a: "An annual increase in monthly SIP to keep pace with income growth and inflation." },
    ],
  },
  lumpsum: {
    slug: "lumpsum",
    title: "Lumpsum Calculator",
    short: "Know returns from lumpsum investment or plan a future goal.",
    component: LumpsumCalculator,
    details: {
      purpose: "Compute the future value of a one-time investment.",
      formula: "FV = A × (1 + r)^n",
      inputs: ["Investment amount (A)", "Expected return p.a. (%)", "Time period (years)"],
      outputs: ["Estimated value (FV)", "Wealth gain"],
    },
    faqs: [
      { q: "Is CAGR constant?", a: "The calculator assumes a constant annual rate for illustration; actual returns vary." },
    ],
  },
  mfnav: {
    slug: "mfnav",
    title: "Mutual Fund NAV/Units",
    short: "Compute missing Amount, NAV, or Units.",
    component: MFNavUnitsCalculator,
    details: {
      purpose: "Solve Amount = NAV × Units when any one value is missing.",
      inputs: ["Any two of Amount, NAV, Units"],
      outputs: ["Computed third value"],
    },
    faqs: [
      { q: "What is NAV?", a: "Net Asset Value — the per-unit value of a mutual fund." },
    ],
  },
  mfreturns: {
    slug: "mfreturns",
    title: "MF CAGR & Absolute Return",
    short: "Check absolute and annualized returns from NAVs.",
    component: CAGRReturnsCalculator,
    details: {
      purpose: "Compute absolute return and CAGR between two NAV points.",
      formula: "CAGR = (End / Start)^(1/n) − 1",
      inputs: ["Start NAV", "End NAV", "Years (n)"],
      outputs: ["Absolute return %", "CAGR %"],
    },
    faqs: [
      { q: "Which to use: absolute vs CAGR?", a: "Use absolute for short periods; use CAGR to annualize multi-year returns." },
    ],
  },
  cagrConv: {
    slug: "cagrConv",
    title: "Monthly → Annual Return",
    short: "Convert a monthly return to annualized.",
    component: CAGRMonthlyReturnCalculator,
    details: {
      purpose: "Annualize a periodic monthly return.",
      formula: "Annual = (1 + m)^12 − 1",
      inputs: ["Monthly return % (m)"],
      outputs: ["Annualized return %"],
    },
    faqs: [
      { q: "Is this same as CAGR?", a: "Yes, assuming monthly compounding, this yields the effective annual rate." },
    ],
  },
  emi: {
    slug: "emi",
    title: "EMI Calculator",
    short: "Calculate your monthly EMI amount.",
    component: EMICalculator,
    details: {
      purpose: "Compute monthly EMI, total interest, and total payment for a loan.",
      formula: "EMI = P r (1+r)^n / ((1+r)^n − 1)",
      inputs: ["Loan amount (P)", "Interest rate p.a. (%)", "Tenure (years)"],
      outputs: ["Monthly EMI", "Total interest", "Total payment"],
    },
    faqs: [
      { q: "Is r monthly?", a: "Yes, r = annual rate / 12." },
    ],
  },
  fd: {
    slug: "fd",
    title: "FD Calculator",
    short: "Calculate FD maturity and interest.",
    component: FDCalculator,
    details: {
      purpose: "Compute maturity value of Fixed Deposit.",
      formula: "A = P (1 + r/m)^(m n)",
      inputs: ["Deposit (P)", "Rate p.a. (%)", "Tenure (years)", "Compounding per year (m)"],
      outputs: ["Maturity amount (A)", "Total interest"],
    },
    faqs: [
      { q: "What compounding is typical?", a: "Banks often use quarterly compounding (m=4)." },
    ],
  },
  rd: {
    slug: "rd",
    title: "RD Calculator",
    short: "Calculate RD maturity and interest.",
    component: RDCalculator,
    details: {
      purpose: "Estimate maturity value for a Recurring Deposit.",
      formula: "FV ≈ P [((1 + r)^n − 1) / r] (monthly compounding)",
      inputs: ["Monthly deposit (P)", "Rate p.a. (%)", "Tenure (years)"],
      outputs: ["Maturity value", "Total interest", "Invested"],
    },
    faqs: [
      { q: "Is this exact?", a: "This uses monthly approximation; some banks use quarterly interest crediting." },
    ],
  },
  compound: {
    slug: "compound",
    title: "Compound Interest",
    short: "Calculate compound interest online.",
    component: CompoundInterestCalculator,
    details: {
      purpose: "General compound interest calculator.",
      formula: "A = P (1 + r/m)^(m n)",
      inputs: ["Principal (P)", "Rate p.a. (%)", "Years (n)", "Compounding per year (m)"],
      outputs: ["Maturity amount (A)", "Total interest"],
    },
    faqs: [],
  },
  simple: {
    slug: "simple",
    title: "Simple Interest",
    short: "Calculate your simple interest online.",
    component: SimpleInterestCalculator,
    details: {
      purpose: "Simple interest without compounding.",
      formula: "A = P (1 + r n)",
      inputs: ["Principal (P)", "Rate p.a. (%)", "Years (n)"] ,
      outputs: ["Amount (A)", "Total interest"],
    },
    faqs: [],
  },
  ppf: {
    slug: "ppf",
    title: "PPF Calculator",
    short: "Calculate the returns on your PPF investments online.",
    component: PPFCalculator,
    details: {
      purpose: "Estimate maturity of PPF with annual contributions.",
      formula: "FV = P [((1+r)^n − 1)/r] (1+r)",
      inputs: ["Yearly contribution (P)", "Interest rate (%)", "Years"],
      outputs: ["Maturity value", "Invested", "Total interest"],
      notes: ["PPF has a 15-year lock-in (extendable)."],
    },
    faqs: [
      { q: "Is PPF interest fixed?", a: "Rates are notified quarterly by the government and can change." },
    ],
  },
  nps: {
    slug: "nps",
    title: "NPS Calculator",
    short: "Know the investment amount to achieve your dream retirement.",
    component: NPSCalculator,
    details: {
      purpose: "Estimate NPS corpus from monthly contributions.",
      formula: "FV of monthly contributions with assumed CAGR; 60% lumpsum, 40% to annuity (illustrative).",
      inputs: ["Monthly contribution", "Expected CAGR %", "Years to retire"],
      outputs: ["Estimated corpus", "60% lumpsum", "40% annuity", "Invested"],
    },
    faqs: [
      { q: "Is annuity return assumed?", a: "This tool only splits corpus; annuity income depends on annuity plan rates." },
    ],
  },
  incomeTax: {
    slug: "incomeTax",
    title: "Income Tax (est.)",
    short: "Know your tax liabilities in minutes.",
    component: IncomeTaxCalculator,
    details: {
      purpose: "Quick estimate of income tax under the new tax regime (illustrative).",
      inputs: ["Annual taxable income"],
      outputs: ["Tax before cess", "Cess (4%)", "Total tax"],
      notes: ["This is a simplified estimator and may not account for all provisions/surcharges."],
    },
    faqs: [
      { q: "Is this for the old regime?", a: "No, this quick tool illustrates the new regime slabs only." },
    ],
  },
  hra: {
    slug: "hra",
    title: "HRA Calculator",
    short: "Calculate Income Tax HRA exemption online.",
    component: HRACalculator,
    details: {
      purpose: "Compute HRA exemption using the minimum-of-three rule.",
      inputs: ["Basic+DA (annual)", "HRA received (annual)", "Annual rent paid", "Metro city flag"],
      outputs: ["Exempt HRA", "Taxable HRA"],
    },
    faqs: [
      { q: "How is metro defined?", a: "Metro cities typically mean Delhi, Mumbai, Kolkata, and Chennai for the 50% rule." },
    ],
  },
  gratuity: {
    slug: "gratuity",
    title: "Gratuity Calculator",
    short: "Calculate your gratuity online.",
    component: GratuityCalculator,
    details: {
      purpose: "Estimate gratuity as per Payment of Gratuity Act formula.",
      formula: "Gratuity = (15/26) × last drawn basic × years of service",
      inputs: ["Last drawn basic (monthly)", "Completed years of service"],
      outputs: ["Gratuity payable"],
    },
    faqs: [
      { q: "Is there a cap?", a: "Statutory caps may apply; refer to current regulations for limits." },
    ],
  },
  tds: {
    slug: "tds",
    title: "TDS Calculator",
    short: "Calculate your TDS deductions online.",
    component: TDSCalculator,
    details: {
      purpose: "Back-calculate suggested monthly TDS from annual tax and YTD paid.",
      inputs: ["Estimated annual tax", "TDS paid YTD", "Remaining months"],
      outputs: ["Balance tax", "Suggested monthly TDS"],
    },
    faqs: [],
  },
  salary: {
    slug: "salary",
    title: "Salary Calculator",
    short: "Calculate your in-hand salary (est.).",
    component: SalaryCalculator,
    details: {
      purpose: "Very rough in-hand estimate using EPF, PT, and new regime tax approximation.",
      inputs: ["CTC (annual)", "Basic % of CTC"],
      outputs: ["EPF (employee)", "Professional tax", "Income tax (est.)", "In-hand (annual)"] ,
      notes: ["For precise taxes, use the Income Tax calculator with full deductions/allowances."],
    },
    faqs: [],
  },
};

export const calculatorsList = Object.values(calculatorsRegistry);