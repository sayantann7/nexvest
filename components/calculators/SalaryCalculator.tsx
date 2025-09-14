"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function currency(n: number) { return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }); }

// Simplified in-hand salary estimate: gross - (EPF 12% basic) - (professional tax approx 2400) - (income tax new regime rough)
export default function SalaryCalculator() {
  const [ctc, setCtc] = useState(1200000);
  const [basicPct, setBasicPct] = useState(40);

  const result = useMemo(()=>{
    const basic = ctc * basicPct/100;
    const epf = basic * 0.12;
    const pt = 2400;
    // Rough new regime tax for quick estimate
  const taxable = ctc - 50000; // standard deduction
    const slabs = [0,3,6,9,12,15]; // in lakhs with 5% steps
    const rates = [0,0.05,0.10,0.15,0.20,0.30];
    let tax = 0; let prev = 0;
    const incomeL = taxable/100000; // lakhs
    for (let i=1;i<slabs.length;i++) {
      const upper = slabs[i];
      const slabIncome = Math.max(0, Math.min(incomeL, upper) - prev);
      tax += slabIncome*100000 * rates[i];
      prev = upper;
    }
    tax = Math.max(0, tax);
    const inHand = ctc - epf - pt - tax;
    return { basic, epf, pt, tax, inHand };
  }, [ctc, basicPct]);

  const chartData = useMemo(()=>[
    { name: "EPF", value: result.epf },
    { name: "Prof. Tax", value: result.pt },
    { name: "Income Tax", value: result.tax },
    { name: "In-hand", value: result.inHand },
  ], [result]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm text-slate-300">Annual CTC (₹)</label>
          <Input type="number" value={ctc} onChange={(e)=>setCtc(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
        </div>
        <div>
          <label className="block mb-1 text-sm text-slate-300">Basic % of CTC</label>
          <Input type="number" value={basicPct} onChange={(e)=>setBasicPct(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Estimate</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">EPF (employee)</span><span>{currency(result.epf)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Professional Tax</span><span>{currency(result.pt)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Income Tax (est.)</span><span className="text-rose-300">{currency(result.tax)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Est. In-hand (annual)</span><span className="font-semibold">{currency(result.inHand)}</span></div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">Breakdown</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v)=> (v/100000).toFixed(0)+"L"} />
                  <Tooltip formatter={(v: number | string)=> currency(Number(v))} contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Bar dataKey="value" name="Amount" fill="#09ffec" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
