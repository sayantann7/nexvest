"use client";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

function currency(n: number) { return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }); }

// HRA exemption: min of (i) Actual HRA received, (ii) 50%/40% of basic+DA (metro/non), (iii) rent paid - 10% of basic+DA
export default function HRACalculator() {
  const [basic, setBasic] = useState(600000);
  const [hra, setHra] = useState(300000);
  const [rent, setRent] = useState(240000);
  const [isMetro, setIsMetro] = useState(true);

  const result = useMemo(()=>{
    const factor = isMetro ? 0.5 : 0.4;
    const limit2 = factor * basic;
    const limit3 = Math.max(0, rent - 0.1 * basic);
    const exempt = Math.max(0, Math.min(hra, limit2, limit3));
    const taxable = Math.max(0, hra - exempt);
    return { exempt, taxable, limit2, limit3 };
  }, [basic, hra, rent, isMetro]);

  const chartData = useMemo(()=>[
    { name: "Exempt", value: result.exempt },
    { name: "Taxable", value: result.taxable },
  ], [result]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-300">Basic+DA (annual) ₹</label>
            <Input type="number" value={basic} onChange={(e)=>setBasic(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">HRA received (annual) ₹</label>
            <Input type="number" value={hra} onChange={(e)=>setHra(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-300">Annual rent paid ₹</label>
            <Input type="number" value={rent} onChange={(e)=>setRent(Number(e.target.value))} className="bg-[#131740] border-white/10 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-300">Metro city?</label>
            <select value={isMetro?"yes":"no"} onChange={(e)=>setIsMetro(e.target.value==="yes")} className="h-9 w-full rounded-md border border-white/10 bg-[#131740] text-white px-3">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <Button className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Calculate</Button>
      </div>
      <div className="space-y-4">
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between"><span className="text-slate-300">Exempt HRA</span><span className="font-semibold">{currency(result.exempt)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Taxable HRA</span><span>{currency(result.taxable)}</span></div>
            <div className="text-xs text-slate-400 mt-2">Min of: HRA received, {isMetro?"50%":"40%"} of basic, and (rent - 10% basic)</div>
          </CardContent>
        </Card>
        <Card className="bg-[#131740] border-white/10 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-3">Exempt vs Taxable</div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v)=> (v/100000).toFixed(0)+"L"} />
                  <Tooltip formatter={(v: number | string)=> currency(Number(v))} contentStyle={{ background: "#111536", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Legend />
                  <Bar dataKey="value" name="Amount" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
