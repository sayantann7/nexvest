"use client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { useMemo } from 'react';

export interface ReturnsPoint {
  period: string; // e.g. 1D, 1W
  abs: number | null;
  cagr: number | null;
  category: number | null;
  index: number | null;
}

interface Props {
  data: ReturnsPoint[];
}

function format(v: number | null) {
  if (v === null || isNaN(v)) return '—';
  return v.toFixed(2) + '%';
}

export default function ReturnsChart({ data }: Props) {
  const hasAny = useMemo(() => data.some(d => d.abs !== null || d.cagr !== null || d.category !== null || d.index !== null), [data]);
  if (!hasAny) {
    return (
      <div className="h-full w-full flex items-center justify-center text-white/50 text-sm border border-white/10 rounded-xl bg-[#131740]">
        No chart data available
      </div>
    );
  }
  return (
    <div className="h-[340px] w-full bg-[#131740] border border-white/10 rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid stroke="#1f254f" strokeDasharray="3 3" />
            <XAxis dataKey="period" stroke="#8891b3" fontSize={11} />
            <YAxis stroke="#8891b3" fontSize={11} tickFormatter={(v)=>v+"%"} />
            <Tooltip
              contentStyle={{ background: '#1b214f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              labelStyle={{ color: 'rgba(255,255,255,0.9)' }}
              formatter={(value: unknown, name: string) => {
                const num = typeof value === 'number' ? value : parseFloat(String(value));
                return [format(isNaN(num) ? null : num), name];
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            {data.some(d=>d.abs!==null) && <Line type="monotone" dataKey="abs" name="Absolute %" stroke="#14b8a6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />}
            {data.some(d=>d.cagr!==null) && <Line type="monotone" dataKey="cagr" name="CAGR %" stroke="#ec4899" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />}
            {data.some(d=>d.category!==null) && <Line type="monotone" dataKey="category" name="Category %" stroke="#6366f1" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />}
            {data.some(d=>d.index!==null) && <Line type="monotone" dataKey="index" name="Index %" stroke="#f59e0b" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
