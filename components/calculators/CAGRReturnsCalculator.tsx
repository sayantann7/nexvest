"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Monthly/annualized return from NAV list: simplify as CAGR between first and last.
export default function CAGRReturnsCalculator() {
  const [startNAV, setStartNAV] = useState(100);
  const [endNAV, setEndNAV] = useState(180);
  const [years, setYears] = useState(3);

  const result = useMemo(()=>{
    const cagr = years>0 && startNAV>0 ? Math.pow(endNAV/startNAV, 1/years) - 1 : 0;
    const abs = (endNAV - startNAV)/startNAV;
    return { cagr, abs };
  }, [startNAV, endNAV, years]);

  const chartData = useMemo(()=>{
    const c = result.cagr;
    const data: { name: string; nav: number }[] = [];
    for (let y=0; y<=years; y++) data.push({ name: `Y${y}`, nav: startNAV*Math.pow(1+c, y) });
    return data;
  }, [startNAV, years, result.cagr]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-300">Start NAV</label>
            <Input type="number" value={startNAV} onChange={(e)=>setStartNAV(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">End NAV</label>
            <Input type="number" value={endNAV} onChange={(e)=>setEndNAV(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
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
            <div className="flex items-center justify-between"><span className="text-slate-300">Absolute Return</span><span>{(result.abs*100).toFixed(2)}%</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">CAGR</span><span className="font-semibold">{(result.cagr*100).toFixed(2)}%</span></div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">NAV growth at CAGR</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="nav" stroke="#8b5cf6" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
