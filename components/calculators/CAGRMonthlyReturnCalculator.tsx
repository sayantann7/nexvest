"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Convert monthly return to annualized and vice-versa
export default function CAGRMonthlyReturnCalculator() {
  const [monthly, setMonthly] = useState(1.0); // %

  const result = useMemo(()=>{
    const m = monthly/100;
    const annual = Math.pow(1+m, 12) - 1;
    return { annual };
  }, [monthly]);

  const chartData = useMemo(()=>[
    { name: "Monthly %", value: monthly },
    { name: "Annualized %", value: result.annual*100 },
  ], [monthly, result.annual]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm text-slate-300">Monthly return %</label>
          <Input type="number" value={monthly} onChange={(e)=>setMonthly(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Convert</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">Annualized Return</span><span className="font-semibold">{(result.annual*100).toFixed(2)}%</span></div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">Monthly vs Annualized</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v)=> v+"%"} />
                  <Tooltip formatter={(v: number | string)=> `${Number(v).toFixed(2)}%`} contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Bar dataKey="value" name="Rate" fill="#09ffec" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
