"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, LineChart, Line } from "recharts";

function currency(n: number) {
  return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

// Lumpsum FV: A*(1+r)^n ; where r annual rate, n years
export default function LumpsumCalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const r = rate / 100;
    const fv = amount * Math.pow(1 + r, years);
    const gain = fv - amount;
    return { fv, invested: amount, gain, cagr: r };
  }, [amount, rate, years]);

  const chartData = useMemo(() => {
    const r = rate/100;
    const data: { name: string; invested: number; value: number }[] = [];
    for (let y=1; y<=years; y++) {
      data.push({ name: `Y${y}`, invested: amount, value: amount*Math.pow(1+r, y) });
    }
    return data;
  }, [amount, rate, years]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm text-slate-300">Investment amount (₹)</label>
          <Input type="number" value={amount} onChange={(e)=>setAmount(Math.max(0, Number(e.target.value)))} className="bg-[#131740] border-white/10 text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-300">Expected return (p.a.) %</label>
            <Input type="number" value={rate} onChange={(e)=>setRate(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">Time period (years)</label>
            <Input type="number" value={years} onChange={(e)=>setYears(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Calculate</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">Invested</span><span>{currency(result.invested)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Est. value</span><span className="font-semibold">{currency(result.fv)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Wealth gain</span><span className="text-emerald-400">{currency(result.gain)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">CAGR (assumed)</span><span>{rate.toFixed(2)}%</span></div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">Value over time</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v)=> (v/100000).toFixed(1)+"L"} />
                  <Tooltip formatter={(v: number | string)=> currency(Number(v))} contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Legend />
                  <Line type="monotone" dataKey="invested" name="Invested" stroke="#09ffec" dot={false} />
                  <Line type="monotone" dataKey="value" name="Value" stroke="#8b5cf6" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
