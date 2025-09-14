"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

function currency(n: number) {
  return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

// Step-up SIP: iterate month by month with annual step-up
export default function StepUpSIPCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12); // annual %
  const [years, setYears] = useState(10);
  const [stepUpPct, setStepUpPct] = useState(10); // annual % increase

  const result = useMemo(() => {
    const r = rate / 100 / 12;
    const months = years * 12;
    let fv = 0;
    let invested = 0;
    let m = monthly;
    for (let i = 1; i <= months; i++) {
      fv = (fv + m) * (1 + r);
      invested += m;
      if (i % 12 === 0) m *= 1 + stepUpPct / 100;
    }
    const gain = fv - invested;
    const cagr = Math.pow(fv / Math.max(invested, 1), 1 / years) - 1;
    return { fv, invested, gain, cagr };
  }, [monthly, rate, years, stepUpPct]);

  const chartData = useMemo(() => {
    const r = rate / 100 / 12;
    const months = years * 12;
    const data: { name: string; invested: number; value: number }[] = [];
    let invested = 0;
    let value = 0;
    let mth = monthly;
    for (let i = 1; i <= months; i++) {
      value = (value + mth) * (1 + r);
      invested += mth;
      if (i % 12 === 0) {
        const yr = i / 12;
        data.push({ name: `Y${yr}`, invested, value });
        mth *= 1 + stepUpPct / 100;
      }
    }
    return data;
  }, [monthly, rate, years, stepUpPct]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm text-slate-300">Starting monthly (₹)</label>
          <Input type="number" value={monthly} onChange={(e)=>setMonthly(Math.max(0, Number(e.target.value)))} className="bg-[#131740] border-white/10 text-white" />
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
        <div>
          <label className="block mb-1 text-sm text-slate-300">Annual step-up %</label>
          <Input type="number" value={stepUpPct} onChange={(e)=>setStepUpPct(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Calculate</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">Invested</span><span>{currency(result.invested)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Est. value</span><span className="font-semibold">{currency(result.fv)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Wealth gain</span><span className="text-emerald-400">{currency(result.gain)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Implied CAGR</span><span>{(result.cagr*100).toFixed(2)}%</span></div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">Growth over time</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="susipA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#09ffec" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#09ffec" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="susipB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v)=> (v/100000).toFixed(1)+"L"} />
                  <Tooltip formatter={(v: number | string)=> currency(Number(v))} contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Legend />
                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#09ffec" fill="url(#susipA)" />
                  <Area type="monotone" dataKey="value" name="Value" stroke="#8b5cf6" fill="url(#susipB)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
