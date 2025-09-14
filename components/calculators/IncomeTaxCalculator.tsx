"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

function currency(n: number) { return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }); }

// New regime (FY25-26 proposal-like slabs) quick estimator with standard deduction 50k
export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1200000);

  const result = useMemo(()=>{
    const sd = 50000;
  const taxable = Math.max(0, income - sd);
    const slabs = [0,3,6,9,12,15]; // in lakhs
    const rates = [0,0.05,0.10,0.15,0.20,0.30];
    let tax = 0; let prev = 0; const incomeL = taxable/100000;
    for (let i=1;i<slabs.length;i++) {
      const upper = slabs[i];
      const slabIncome = Math.max(0, Math.min(incomeL, upper) - prev);
      tax += slabIncome*100000 * rates[i];
      prev = upper;
    }
    tax = Math.max(0, tax);
    const cess = tax * 0.04;
    const total = tax + cess;
    return { taxable, tax, cess, total };
  }, [income]);

  const chartData = useMemo(()=>{
    const slabs = [0,3,6,9,12,15];
    const rates = [0,0.05,0.10,0.15,0.20,0.30];
    const computeTax = (inc: number) => {
  const sd = 50000; const taxable = Math.max(0, inc - sd);
      let tax = 0; let prev = 0; const incomeL = taxable/100000;
      for (let i=1;i<slabs.length;i++) {
        const upper = slabs[i];
        const slabIncome = Math.max(0, Math.min(incomeL, upper) - prev);
        tax += slabIncome*100000 * rates[i];
        prev = upper;
      }
      return Math.max(0,tax*1.04); // with cess
    };
    const points: { name: string; tax: number }[] = [];
    const max = Math.max(1000000, income*1.5);
    const step = Math.max(100000, Math.floor(max/10/100000)*100000);
    for (let x=0; x<=max; x+=step) {
      points.push({ name: (x/100000).toFixed(0)+"L", tax: computeTax(x) });
    }
    return points;
  }, [income]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm text-slate-300">Annual taxable income (₹)</label>
          <Input type="number" value={income} onChange={(e)=>setIncome(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Estimate Tax</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">Tax (before cess)</span><span>{currency(result.tax)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Cess (4%)</span><span>{currency(result.cess)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Total Tax</span><span className="font-semibold">{currency(result.total)}</span></div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">Tax vs income (with cess)</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v)=> (v/100000).toFixed(0)+"L"} />
                  <Tooltip formatter={(v: number | string)=> currency(Number(v))} contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Legend />
                  <Line type="monotone" dataKey="tax" name="Tax" stroke="#8b5cf6" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
