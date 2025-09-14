"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Solve any one: amount, nav, units => amount = nav*units
export default function MFNavUnitsCalculator() {
  const [amount, setAmount] = useState<number | ''>('');
  const [nav, setNav] = useState<number | ''>('');
  const [units, setUnits] = useState<number | ''>('');

  const fill = () => {
    const a = Number(amount); const n = Number(nav); const u = Number(units);
    if (!a && n>0 && u>0) setAmount(n*u);
    else if (!n && a>0 && u>0) setNav(a/u);
    else if (!u && a>0 && n>0) setUnits(a/n);
  };

  const canCompute = useMemo(()=>{
    const numEmpty = [amount, nav, units].filter(v=>v==='' || Number(v)===0).length;
    return numEmpty===1;
  }, [amount, nav, units]);

  const chartData = useMemo(()=>{
    const a = Number(amount)||0, n = Number(nav)||0, u = Number(units)||0;
    if (a>0 && n>0 && u>0) {
      return [
        { name: "Amount", value: a },
        { name: "NAV", value: n },
        { name: "Units", value: u },
      ];
    }
    return [] as { name: string; value: number }[];
  }, [amount, nav, units]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-300">Amount (₹)</label>
            <Input type="number" value={amount} onChange={(e)=>setAmount(e.target.value===''?'':Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">NAV</label>
            <Input type="number" value={nav} onChange={(e)=>setNav(e.target.value===''?'':Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">Units</label>
            <Input type="number" value={units} onChange={(e)=>setUnits(e.target.value===''?'':Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
        </div>
        <Button onClick={fill} disabled={!canCompute} className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90 disabled:opacity-50">Solve Missing</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="text-slate-300 text-sm">Provide any two fields; click Solve to compute the third using Amount = NAV × Units.</div>
          </CardContent>
        </Card>
        {chartData.length>0 && (
          <Card className="bg-[#131740] border-white/10 text-white">
            <CardContent className="p-4">
              <div className="text-sm text-slate-300 mb-3">Values</div>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                    <Bar dataKey="value" name="Value" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
