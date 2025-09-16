"use client";
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Holding {
  company_name: string;
  nature_name: string;
  sector_name?: string | null;
  corpus_percentage?: number | null;
}

interface Props {
  holdings: Holding[];
  initialVisible?: number; // how many rows to show when collapsed
}

function formatNum(v: number | undefined | null, digits = 2) {
  if (v === null || v === undefined || isNaN(v)) return '—';
  return Number(v).toFixed(digits);
}

export default function HoldingsCollapse({ holdings, initialVisible = 10 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [natureFilter, setNatureFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return holdings.filter(h => {
      if (q && !h.company_name.toLowerCase().includes(q)) return false;
      if (natureFilter && h.nature_name !== natureFilter) return false;
      if (sectorFilter && (h.sector_name || '') !== sectorFilter) return false;
      return true;
    });
  }, [holdings, query, natureFilter, sectorFilter]);

  // Auto-expand when filtered list shorter than initial or when any filter active
  useEffect(() => {
    const anyFilter = query || natureFilter || sectorFilter;
    if (anyFilter) setExpanded(true);
  }, [query, natureFilter, sectorFilter]);

  const visible = expanded ? filtered : filtered.slice(0, initialVisible);
  const hiddenCount = filtered.length - visible.length;

  const maxCorpus = useMemo(() => Math.max(...filtered.map(h => h.corpus_percentage || 0), 0), [filtered]);

  const natures = useMemo(() => Array.from(new Set(holdings.map(h => h.nature_name))).sort(), [holdings]);
  const sectors = useMemo(() => Array.from(new Set(holdings.map(h => h.sector_name).filter(Boolean) as string[])).sort(), [holdings]);

  return (
    <div className="relative">
      <div className="p-4 space-y-3 border-b border-white/10 bg-white/5">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex-1">
            <label className="block text-[11px] uppercase tracking-wide text-white/50 font-medium mb-1">Search Company</label>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Type to filter..."
              className="w-full bg-[#101437] border border-white/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/50"
            />
          </div>
          <div className="md:w-48">
            <label className="block text-[11px] uppercase tracking-wide text-white/50 font-medium mb-1">Nature</label>
            <select
              value={natureFilter}
              onChange={e => setNatureFilter(e.target.value)}
              className="w-full bg-[#101437] border border-white/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/50"
            >
              <option value="">All</option>
              {natures.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="md:w-56">
            <label className="block text-[11px] uppercase tracking-wide text-white/50 font-medium mb-1">Sector</label>
            <select
              value={sectorFilter}
              onChange={e => setSectorFilter(e.target.value)}
              className="w-full bg-[#101437] border border-white/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/50"
            >
              <option value="">All</option>
              {sectors.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        {(query || natureFilter || sectorFilter) && (
          <div className="flex flex-wrap gap-2 text-[11px] text-white/60">
            <span className="bg-teal-400/10 text-teal-200 px-2 py-1 rounded-md">{filtered.length} match{filtered.length!==1?'es':''}</span>
            <button
              onClick={() => { setQuery(''); setNatureFilter(''); setSectorFilter(''); setExpanded(false); }}
              className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >Clear Filters</button>
          </div>
        )}
      </div>
      <div className="hidden md:flex px-5 py-3 border-b border-white/10 text-white/60 text-sm sticky top-0 bg-[#131a48] z-10">
        <div className="w-[45%]">Company</div>
        <div className="w-[20%]">Nature</div>
        <div className="w-[20%]">Sector</div>
        <div className="w-[15%] text-right">% of Corpus</div>
      </div>
      <AnimatePresence initial={false}>
        {visible.map((h, i) => (
          <motion.div
            key={h.company_name + i}
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex flex-col md:flex-row px-5 py-3 border-b border-white/10 last:border-b-0 text-sm hover:bg-white/5 relative"
          >
            <div className="w-full md:w-[45%] font-medium flex items-center gap-2">
              <span>{h.company_name}</span>
              {h.corpus_percentage !== undefined && h.corpus_percentage !== null && (
                <span className="hidden md:inline-block h-2 rounded-full bg-teal-400/20 overflow-hidden flex-1 max-w-[120px]">
                  <span
                    className="block h-full bg-teal-400/70"
                    style={{ width: `${(h.corpus_percentage / (maxCorpus || 1)) * 100}%` }}
                  />
                </span>
              )}
            </div>
            <div className="w-full md:w-[20%] text-white/80">{h.nature_name}</div>
            <div className="w-full md:w-[20%] text-white/60">{h.sector_name ?? '—'}</div>
            <div className="w-full md:w-[15%] md:text-right text-teal-300 font-mono">{formatNum(h.corpus_percentage, 2)}</div>
          </motion.div>
        ))}
      </AnimatePresence>
      {!expanded && hiddenCount > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#131a48] to-transparent" />
      )}
      {filtered.length > initialVisible && (
        <div className="p-4 flex justify-center">
          <button
            onClick={() => setExpanded(e => !e)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium text-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400/50"
            aria-expanded={expanded}
            aria-controls="holdings-list"
          >
            {expanded ? 'Show Less' : `Show ${hiddenCount} More`}
            <svg
              className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
