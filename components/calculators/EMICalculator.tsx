"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

function currency(n: number) {
  return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

// EMI: E = P * r * (1+r)^n / ((1+r)^n - 1), r monthly, n months
export default function EMICalculator() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(9); // annual %
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const pow = Math.pow(1 + r, n);
    const emi = r === 0 ? principal / n : (principal * r * pow) / (pow - 1);
    const total = emi * n;
    const interest = total - principal;
    return { emi, total, interest };
  }, [principal, rate, years]);

  const amortization = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const pow = Math.pow(1 + r, n);
    const emi = r === 0 ? principal / n : (principal * r * pow) / (pow - 1);
    let balance = principal;
    const data: { name: string; balance: number }[] = [];
    for (let m=1; m<=n; m++) {
      const interest = balance * r;
      const principalPaid = emi - interest;
      balance = Math.max(0, balance - principalPaid);
      if (m % 12 === 0 || m === n) data.push({ name: `Y${Math.ceil(m/12)}`, balance });
    }
    return { emi, data };
  }, [principal, rate, years]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm text-slate-300">Loan amount (₹)</label>
          <Input type="number" value={principal} onChange={(e)=>setPrincipal(Math.max(0, Number(e.target.value)))} className="bg-[#131740] border-white/10 text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-300">Interest rate (p.a.) %</label>
            <Input type="number" value={rate} onChange={(e)=>setRate(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">Tenure (years)</label>
            <Input type="number" value={years} onChange={(e)=>setYears(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Calculate</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">Monthly EMI</span><span className="font-semibold">{currency(result.emi)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Total Interest</span><span className="text-rose-300">{currency(result.interest)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Total Payment</span><span>{currency(result.total)}</span></div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">Outstanding principal over time</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={amortization.data} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v)=> (v/100000).toFixed(1)+"L"} />
                  <Tooltip formatter={(v: number | string)=> currency(Number(v))} contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Legend />
                  <Line type="monotone" dataKey="balance" name="Balance" stroke="#09ffec" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
