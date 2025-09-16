"use client";
import { useState, useMemo } from 'react';

interface Props {
  schemes: { name: string; nav: number; oneY?: number; fiveY?: number; href: string }[];
}

export default function SchemeFilter({ schemes }: Props) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'name'|'nav'|'1y'|'5y'>('name');
  const [dir, setDir] = useState<1|-1>(1);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    let data = !q ? schemes : schemes.filter(s => s.name.toLowerCase().includes(q));
    data = [...data].sort((a,b) => {
      if(sort === 'name') return a.name.localeCompare(b.name) * dir;
      if(sort === 'nav') return (a.nav - b.nav) * dir;
      if(sort === '1y') return ((a.oneY ?? -Infinity) - (b.oneY ?? -Infinity)) * dir;
      if(sort === '5y') return ((a.fiveY ?? -Infinity) - (b.fiveY ?? -Infinity)) * dir;
      return 0;
    });
    return data;
  }, [schemes, query, sort, dir]);

  function toggleSort(key: 'name'|'nav'|'1y'|'5y') {
    if(sort === key) setDir(d => d === 1 ? -1 : 1); else { setSort(key); setDir(1); }
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Filter schemes..."
          className="bg-[#1b204f] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/40"
        />
        <div className="flex gap-2 text-xs md:text-[11px] text-white/60">
          <button onClick={() => toggleSort('name')} className={`px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 ${sort==='name'?'text-teal-300':''}`}>Name {sort==='name' ? (dir===1?'↑':'↓'):''}</button>
          <button onClick={() => toggleSort('nav')} className={`px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 ${sort==='nav'?'text-teal-300':''}`}>NAV {sort==='nav' ? (dir===1?'↑':'↓'):''}</button>
          <button onClick={() => toggleSort('1y')} className={`px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 ${sort==='1y'?'text-teal-300':''}`}>1Y {sort==='1y' ? (dir===1?'↑':'↓'):''}</button>
          <button onClick={() => toggleSort('5y')} className={`px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 ${sort==='5y'?'text-teal-300':''}`}>5Y {sort==='5y' ? (dir===1?'↑':'↓'):''}</button>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden border border-white/10 bg-[#111437]/60 backdrop-blur-sm">
        <div className="hidden md:grid grid-cols-12 px-5 py-3 text-[11px] uppercase tracking-wide text-white/50 border-b border-white/10">
          <div className="col-span-6">Scheme Name</div>
          <div className="col-span-2 text-right">NAV</div>
          <div className="col-span-2 text-right">1Y Abs%</div>
          <div className="col-span-2 text-right">5Y CAGR%</div>
        </div>
        {filtered.map(s => (
          <a key={s.href} href={s.href} className="grid grid-cols-12 px-5 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
            <div className="col-span-12 md:col-span-6 font-medium text-sm md:text-[13px] lg:text-sm text-white">{s.name}</div>
            <div className="hidden md:block col-span-2 text-right text-white/80 font-mono text-xs">{s.nav.toFixed(2)}</div>
            <div className={`hidden md:block col-span-2 text-right font-mono text-xs ${ (s.oneY ?? 0) >= 0 ? 'text-teal-300':'text-rose-300'}`}>{s.oneY?.toFixed(2) ?? '—'}</div>
            <div className={`hidden md:block col-span-2 text-right font-mono text-xs ${ (s.fiveY ?? 0) >= 0 ? 'text-teal-300':'text-rose-300'}`}>{s.fiveY?.toFixed(2) ?? '—'}</div>
            <div className="md:hidden col-span-12 mt-1 flex gap-4 text-[11px] text-white/60 font-mono">
              <span>NAV {s.nav.toFixed(2)}</span>
              <span>1Y {s.oneY?.toFixed(2) ?? '—'}</span>
              <span>5Y {s.fiveY?.toFixed(2) ?? '—'}</span>
            </div>
          </a>
        ))}
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-white/50 text-sm">No matching schemes.</div>
        )}
      </div>
    </div>
  );
}
