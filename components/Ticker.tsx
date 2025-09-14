"use client";
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Stock {
  ticker: string;
  company: string;
  price: number;
  percent_change: number;
}

const StockTicker = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const hasLoggedErrorRef = useRef(false);

  // Animation settings - defined once to ensure consistency and smooth loop
  const marqueeTransition = useMemo(
    () => ({ repeat: Infinity, duration: 30, ease: 'linear' as const, repeatType: 'loop' as const }),
    []
  );

  // Initial placeholder stocks to show immediately
  const placeholderStocks: Stock[] = useMemo(() => ([
    { ticker: 'AAPL', company: 'Apple', price: 182.52, percent_change: 0.75 },
    { ticker: 'MSFT', company: 'Microsoft', price: 417.88, percent_change: 1.22 },
    { ticker: 'GOOGL', company: 'Alphabet', price: 165.31, percent_change: -0.48 },
    { ticker: 'AMZN', company: 'Amazon', price: 182.3, percent_change: 0.63 },
  ]), []);

  const fetchStockData = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        'https://nexvest-stocks-service.sayantannandi13.workers.dev/stocks',
        { cache: 'no-store', mode: 'cors', signal: controller.signal }
      );
      clearTimeout(timeout);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: unknown = await response.json();
      if (Array.isArray(data) && data.length) {
        setStocks(data as Stock[]);
      } else {
        throw new Error('Empty data');
      }
    } catch (error: unknown) {
      const isAbort = typeof error === 'object' && error !== null && 'name' in error && (error as { name?: string }).name === 'AbortError';
      if (!isAbort && !hasLoggedErrorRef.current) {
        console.warn(
          'Stock service unavailable, using fallback. Reason:',
          (typeof error === 'object' && error !== null && 'message' in error) ? (error as { message?: string }).message : String(error)
        );
        hasLoggedErrorRef.current = true;
      }
      // Fallback to local example JSON to keep ticker running
      try {
        const fallback = await fetch('/example_response.json', { cache: 'no-store' });
        if (fallback.ok) {
          const data: unknown = await fallback.json();
          if (Array.isArray(data) && data.length) setStocks(data as Stock[]);
          else setStocks(placeholderStocks);
        } else {
          setStocks(placeholderStocks);
        }
      } catch {
        setStocks(placeholderStocks);
      }
    } finally {
      setLoading(false);
    }
  }, [placeholderStocks]);

  useEffect(() => {
    fetchStockData();
    const intervalId = setInterval(fetchStockData, 60000);
    return () => clearInterval(intervalId);
  }, [fetchStockData]);

  const displayData = (loading ? placeholderStocks : (stocks.length ? stocks : placeholderStocks));

  const renderItems = (arr: Stock[]) =>
    arr.map((stock, index) => {
      const pct = Number(stock.percent_change || 0);
      const pctColor = pct > 0 ? 'text-emerald-400' : pct < 0 ? 'text-rose-400' : 'text-slate-200';
      return (
        <div key={`${stock.ticker}-${index}`} className="flex items-center mx-5 group cursor-pointer">
          <span className="font-semibold text-white transition-colors">
            {stock.company}
          </span>
          <span className="mx-2 text-[#0AFFFF] font-semibold">{stock.ticker.split(".")[0]}</span>
          <motion.span whileHover={{ scale: 1.05 }} className={`${pctColor} font-medium`}>
            ({pct > 0 ? '+' : ''}{pct.toFixed(2)}%)
          </motion.span>
          <span className="mx-5 text-white/20">|</span>
        </div>
      );
    });

  return (
    <div className="relative w-full overflow-hidden py-2">
      {/* Left and right fade gradients */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0D0C34] to-transparent"></div>
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0D0C34] to-transparent"></div>

      {/* Stock ticker animation - seamless double sequence */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={marqueeTransition}
        className="flex whitespace-nowrap items-center w-max"
      >
        <div className="flex items-center" aria-hidden="false">
          {renderItems(displayData)}
        </div>
        <div className="flex items-center" aria-hidden="true">
          {renderItems(displayData)}
        </div>
      </motion.div>

      {/* Center text overlay with gradient borders */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-20 flex items-center">
        <div className="relative flex items-center">
          <div className="absolute left-0 top-0 bottom-0 w-16 -ml-16 bg-gradient-to-r from-transparent to-[#0D0C34]"></div>
          <div className="bg-[#0D0C34] px-0 py-0 font-bold text-white text-2xl whitespace-nowrap">
            Invest in What&apos;s <span className="text-[#0AFFFF]">Next</span>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-16 -mr-16 bg-gradient-to-l from-transparent to-[#0D0C34]"></div>
        </div>
      </div>
    </div>
  );
};

export default StockTicker;
