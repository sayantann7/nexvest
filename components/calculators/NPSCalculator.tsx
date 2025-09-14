"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

function currency(n: number) { return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }); }

// Simplified NPS: monthly contribution grows at equity/debt assumed blended CAGR; 40% annuitized
export default function NPSCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(25);

  const result = useMemo(()=>{
    const r = rate/100/12; const n = years*12;
    const corpus = monthly * (((Math.pow(1+r, n) - 1)/r) * (1+r));
    const annuitized = corpus * 0.4;
    const lumpsum = corpus * 0.6;
    return { corpus, annuitized, lumpsum, invested: monthly*n };
  }, [monthly, rate, years]);

  const chartData = useMemo(() => {
    const r = 10/100/12; // use a nominal 10% blended for chart illustration; main result uses props
    const months = years * 12;
    const data: { name: string; invested: number; value: number }[] = [];
    let invested = 0;
    let value = 0;
    for (let i=1;i<=months;i++){
      value = (value + 1000) * (1 + r); // scaled unit, shape illustrative
      invested += 1000;
      if (i % 12 === 0) data.push({ name: `Y${i/12}` , invested, value });
    }
    return data;
  }, [years]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm text-slate-300">Monthly contribution (₹)</label>
          <Input type="number" value={monthly} onChange={(e)=>setMonthly(Math.max(0, Number(e.target.value)))} className="bg-[#131740] border-white/10 text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-300">Expected CAGR %</label>
            <Input type="number" value={rate} onChange={(e)=>setRate(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">Years to retire</label>
            <Input type="number" value={years} onChange={(e)=>setYears(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Calculate</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">Invested</span><span>{currency(result.invested)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Estimated Corpus</span><span className="font-semibold">{currency(result.corpus)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">60% Lumpsum</span><span>{currency(result.lumpsum)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">40% Annuity</span><span>{currency(result.annuitized)}</span></div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">Corpus growth (illustrative)</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="npsA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#09ffec" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#09ffec" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="npsB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v)=> (v/100000).toFixed(1)+"L"} />
                  <Tooltip labelFormatter={(l)=> l} formatter={(v: number | string)=> currency(Number(v) / 1000 * (result.invested/(years*12)))} contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Legend />
                  <Area type="monotone" dataKey="invested" name="Invested (scaled)" stroke="#09ffec" fill="url(#npsA)" />
                  <Area type="monotone" dataKey="value" name="Value (scaled)" stroke="#8b5cf6" fill="url(#npsB)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
