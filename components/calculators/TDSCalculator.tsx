"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function currency(n: number) { return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }); }

// Simple TDS on salary estimate: monthly TDS = (annual estimated tax - YTD paid)/remaining months
export default function TDSCalculator() {
  const [annualTax, setAnnualTax] = useState(120000);
  const [paid, setPaid] = useState(40000);
  const [remainingMonths, setRemainingMonths] = useState(8);

  const result = useMemo(()=>{
    const balance = Math.max(0, annualTax - paid);
    const monthlyTDS = remainingMonths>0 ? balance/remainingMonths : balance;
    return { balance, monthlyTDS };
  }, [annualTax, paid, remainingMonths]);

  const chartData = useMemo(()=>{
    const bal = Math.max(0, annualTax - paid);
    const months = Math.max(1, remainingMonths);
    const per = bal / months;
    const pts: { name: string; tds: number }[] = [];
    for (let i=1;i<=months;i++) pts.push({ name: `M${i}`, tds: per });
    return pts;
  }, [annualTax, paid, remainingMonths]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-300">Estimated annual tax</label>
            <Input type="number" value={annualTax} onChange={(e)=>setAnnualTax(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">TDS paid YTD</label>
            <Input type="number" value={paid} onChange={(e)=>setPaid(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">Remaining months</label>
            <Input type="number" value={remainingMonths} onChange={(e)=>setRemainingMonths(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Calculate</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">Balance tax</span><span>{currency(result.balance)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Suggested monthly TDS</span><span className="font-semibold">{currency(result.monthlyTDS)}</span></div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">TDS per remaining month</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v)=> (v/1000).toFixed(0)+"k"} />
                  <Tooltip formatter={(v: number | string)=> currency(Number(v))} contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="tds" name="TDS" stroke="#09ffec" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
