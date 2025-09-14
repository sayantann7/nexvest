"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function currency(n: number) { return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }); }

// ELSS: lumpsum or SIP; here assume lumpsum with lock-in 3 yrs
export default function ELSSCalculator() {
  const [amount, setAmount] = useState(150000);
  const [rate, setRate] = useState(12);
  const years = 3;

  const result = useMemo(()=>{
    const fv = amount * Math.pow(1 + rate/100, years);
    return { fv, invested: amount, gain: fv-amount };
  }, [amount, rate]);

  const chartData = useMemo(()=>{
    const r = rate/100;
    const data: { name: string; value: number }[] = [];
    for (let y=1;y<=3;y++) data.push({ name: `Y${y}` , value: amount*Math.pow(1+r,y)});
    return data;
  }, [amount, rate]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-300">Amount (₹)</label>
            <Input type="number" value={amount} onChange={(e)=>setAmount(Math.max(0, Number(e.target.value)))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">Expected return %</label>
            <Input type="number" value={rate} onChange={(e)=>setRate(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Calculate</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">Invested</span><span>{currency(result.invested)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Value after 3 years</span><span className="font-semibold">{currency(result.fv)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Wealth gain</span><span className="text-emerald-400">{currency(result.gain)}</span></div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">Value over 3 years</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="value" stroke="#8b5cf6" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
