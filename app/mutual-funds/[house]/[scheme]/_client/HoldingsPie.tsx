"use client";
import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

interface Holding {
  company_name: string;
  corpus_percentage?: number | null;
  sector_name?: string | null;
}

interface Props {
  holdings: Holding[];
  topN?: number;
}

interface PieDatum {
  name: string;
  value: number;
  raw: Holding[];
}

const COLORS = [
  '#14b8a6', '#6366f1', '#f59e0b', '#ec4899', '#06b6d4', '#84cc16', '#8b5cf6', '#ef4444', '#0ea5e9', '#f97316'
];

export default function HoldingsPie({ holdings, topN = 8 }: Props) {
  const data: PieDatum[] = useMemo(() => {
    const usable = holdings.filter(h => (h.corpus_percentage ?? 0) > 0);
    const sorted = [...usable].sort((a,b)=>(b.corpus_percentage||0)-(a.corpus_percentage||0));
    const top = sorted.slice(0, topN);
    const others = sorted.slice(topN);
    const topMapped: PieDatum[] = top.map(h => ({ name: h.company_name, value: h.corpus_percentage || 0, raw: [h] }));
    const othersValue = others.reduce((sum,h)=> sum + (h.corpus_percentage || 0), 0);
    if (othersValue > 0) {
      topMapped.push({ name: 'Others', value: Number(othersValue.toFixed(2)), raw: others });
    }
    return topMapped;
  }, [holdings, topN]);

  if (!data.length) {
    return (
      <div className="h-full w-full flex items-center justify-center text-white/50 text-xs border border-white/10 rounded-xl bg-[#131740]">
        No holdings data
      </div>
    );
  }

  const total = data.reduce((s,d)=>s+d.value,0) || 1;

  return (
    <div className="h-[360px] w-full bg-[#131740] border border-white/10 rounded-xl p-4 flex flex-col">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-white/60 mb-2">Portfolio Allocation (Top {Math.min(topN, data.length - (data.some(d=>d.name==='Others')?1:0))}{data.some(d=>d.name==='Others')?'+':''})</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={2}
            stroke="#0d0c34"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: unknown, name: string | number) => {
              const num = typeof value === 'number' ? value : parseFloat(String(value));
              const safe = isNaN(num) ? '—' : num + ' %';
              return [safe, String(name)];
            }}
            contentStyle={{ background:'#1b214f', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', fontSize:'12px' }}
            labelStyle={{ color:'rgba(255,255,255,0.9)' }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ fontSize: '11px' }}
            formatter={(val: string) => {
              const item = data.find(d=>d.name===val);
              if (!item) return val;
              const pct = ((item.value/total)*100).toFixed(1);
              return `${val} (${pct}%)`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
