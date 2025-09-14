"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

function currency(n: number) {
  return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

// Simple Interest: A = P*(1 + r*n)
export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(3);

  const result = useMemo(() => {
    const A = principal * (1 + rate/100 * years);
    const interest = A - principal;
    return { A, interest };
  }, [principal, rate, years]);

  const chartData = useMemo(() => {
    const r = rate/100;
    const data: { name: string; value: number }[] = [];
    for (let y=1; y<=years; y++) {
      const A = principal * (1 + r * y);
      data.push({ name: `Y${y}`, value: A });
    }
    return data;
  }, [principal, rate, years]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm text-slate-300">Principal (₹)</label>
          <Input type="number" value={principal} onChange={(e)=>setPrincipal(Math.max(0, Number(e.target.value)))} className="bg-[#131740] border-white/10 text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-300">Rate (p.a.) %</label>
            <Input type="number" value={rate} onChange={(e)=>setRate(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">Years</label>
            <Input type="number" value={years} onChange={(e)=>setYears(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Calculate</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">Maturity Amount</span><span className="font-semibold">{currency(result.A)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Total Interest</span><span>{currency(result.interest)}</span></div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">Amount over time</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v)=> (v/100000).toFixed(1)+"L"} />
                  <Tooltip formatter={(v: number | string)=> currency(Number(v))} contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Legend />
                  <Line type="monotone" dataKey="value" name="Value" stroke="#09ffec" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
