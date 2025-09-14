"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function currency(n: number) { return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }); }

// Gratuity (Payment of Gratuity Act): gratuity = (15/26) * last drawn basic * years of service (capped)
export default function GratuityCalculator() {
  const [lastBasic, setLastBasic] = useState(50000); // monthly
  const [years, setYears] = useState(7);

  const result = useMemo(()=>{
    const gratuity = (15/26) * lastBasic * years;
    return { gratuity };
  }, [lastBasic, years]);

  const chartData = useMemo(()=>{
    const pts: { name: string; value: number }[] = [];
    for (let y=1;y<=Math.max(1, years);y++) pts.push({ name: `Y${y}`, value: (15/26)*lastBasic*y });
    return pts;
  }, [lastBasic, years]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-300">Last drawn basic (monthly) ₹</label>
            <Input type="number" value={lastBasic} onChange={(e)=>setLastBasic(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">Years of service</label>
            <Input type="number" value={years} onChange={(e)=>setYears(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Calculate</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">Gratuity Payable</span><span className="font-semibold">{currency(result.gratuity)}</span></div>
            <div className="text-xs text-slate-400">Formula: (15/26) × last drawn basic × completed years of service</div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">Gratuity vs years</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v)=> (v/100000).toFixed(0)+"L"} />
                  <Tooltip formatter={(v: number | string)=> currency(Number(v))} contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="value" name="Gratuity" stroke="#09ffec" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
