"use client";
import { useEffect, useState, useMemo } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface Stock {
  ticker: string;
  company: string;
  price: number;
  percent_change: number;
}

const StockTicker = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimationControls();

  // Animation settings - defined once to ensure consistency
  const animationSettings = useMemo(() => ({
    x: '-100%',
    transition: {
      repeat: Infinity,
      duration: 60,
      ease: 'linear',
      repeatType: "loop" as const,
      repeatDelay: 0,
    }
  }), []);

  // Initial placeholder stocks to show immediately
  const placeholderStocks: Stock[] = [
    { ticker: "AAPL", company: "Apple", price: 182.52, percent_change: 0.75 },
    { ticker: "MSFT", company: "Microsoft", price: 417.88, percent_change: 1.22 },
    { ticker: "GOOGL", company: "Alphabet", price: 165.31, percent_change: -0.48 },
    { ticker: "AMZN", company: "Amazon", price: 182.30, percent_change: 0.63 },
  ];

  // Separate function just for data fetching
  const fetchStockData = async () => {
    try {
      const response = await fetch('https://nexvest-stocks-service.sayantannandi13.workers.dev/stocks', {
        // Prevent Next.js fetch caching to always get latest ticker data
        cache: 'no-store'
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Start animation immediately
    controls.start(animationSettings);

    // Fetch data initially
    fetchStockData();

    // Set up interval for periodic data updates
    const intervalId = setInterval(() => {
      fetchStockData();
    }, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [loading, animationSettings, controls]);

  // Use placeholder stocks while loading or real stocks when loaded
  const displayData = loading ? placeholderStocks : stocks;

  // Triple the stocks array for better continuous scrolling
  const displayStocks = [...displayData, ...displayData, ...displayData];

  return (
    <div className="relative bg-[#0D0C34] overflow-hidden h-12 mb-0">
      {/* Left and right edge fade effects */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0D0C34] to-transparent"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0D0C34] to-transparent"></div>

      {/* Stock ticker animation - runs behind everything */}
      <motion.div
        initial={{ x: '0%' }}
        animate={controls}
        className="flex whitespace-nowrap absolute items-center py-1 mt-2"
      >
        {displayStocks.map((stock, index) => (
          <div key={index} className="flex items-center mx-5 group cursor-pointer">
            <span className="font-semibold text-white transition-colors">
              {stock.company}
            </span>
            <span className="mx-2 text-[#0AFFFF] font-semibold">
              {stock.price.toFixed(2)}
            </span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              className={`${stock.percent_change > 0
                  ? 'text-white'
                  : stock.percent_change < 0
                    ? 'text-white'
                    : 'text-white'
                } font-medium`}
            >
              ({stock.percent_change > 0 ? '+' : ''}{stock.percent_change.toFixed(2)}%)
            </motion.span>

            {/* Separator */}
            {index < displayStocks.length - 1 && (
              <span className="mx-5 text-[#004400]">|</span>
            )}
          </div>
        ))}
      </motion.div>

      {/* Center text overlay with gradient borders */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 z-20 flex items-center">
        <div className="relative flex items-center">
          {/* Left fade gradient - creates illusion of stocks disappearing */}
          <div className="absolute left-0 top-0 bottom-0 w-16 -ml-16 bg-gradient-to-r from-transparent to-[#0D0C34]"></div>

          {/* Text with solid background */}
          <div className="bg-[#0D0C34] px-0 py-0 font-bold text-white text-2xl whitespace-nowrap">
            Invest in What&apos;s <span className='text-[#0AFFFF]'>Next</span>
          </div>

          {/* Right fade gradient - creates illusion of stocks reappearing */}
          <div className="absolute right-0 top-0 bottom-0 w-16 -mr-16 bg-gradient-to-l from-transparent to-[#0D0C34]"></div>
        </div>
      </div>
    </div>
  );
};

export default StockTicker;
