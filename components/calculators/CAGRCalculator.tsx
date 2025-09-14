"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function currency(n: number) {
  return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

// CAGR: ((Ending/Beginning)^(1/n) - 1)
export default function CAGRCalculator() {
  const [begin, setBegin] = useState(100000);
  const [end, setEnd] = useState(250000);
  const [years, setYears] = useState(3);

  const result = useMemo(() => {
    const cagr = years > 0 && begin > 0 ? Math.pow(end / begin, 1 / years) - 1 : 0;
    const gain = end - begin;
    return { cagr, gain };
  }, [begin, end, years]);

  const chartData = useMemo(()=>{
    const c = result.cagr;
    const data: { name: string; value: number }[] = [];
    for (let y=0;y<=years;y++) data.push({ name: `Y${y}`, value: begin*Math.pow(1+c, y) });
    return data;
  }, [begin, years, result.cagr]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-300">Beginning value (₹)</label>
            <Input type="number" value={begin} onChange={(e)=>setBegin(Math.max(0, Number(e.target.value)))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">Ending value (₹)</label>
            <Input type="number" value={end} onChange={(e)=>setEnd(Math.max(0, Number(e.target.value)))} className="bg-[#131740] border-white/10 text-white" />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm text-slate-300">Time period (years)</label>
          <Input type="number" value={years} onChange={(e)=>setYears(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Calculate</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">Total Gain</span><span>{currency(result.gain)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">CAGR</span><span className="font-semibold">{(result.cagr*100).toFixed(2)}%</span></div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">Value path at CAGR</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="value" stroke="#09ffec" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
