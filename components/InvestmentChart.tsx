

import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from '../components/ui/slider';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface InvestmentChartProps {
  monthlyInvestment: number;
  onInvestmentChange: (value: number) => void;
}

const InvestmentChart: React.FC<InvestmentChartProps> = ({ 
  monthlyInvestment, 
  onInvestmentChange 
}) => {
  // Calculate investment values
  const years = 25;
  const regularInterestRate = 0.1; // 10% annual return
  const directInterestRate = 0.11; // 11% annual return (1% higher)
  
  // Calculate final values
  const annualInvestment = monthlyInvestment * 12;
  const regularFundValue = calculateCompoundInterest(annualInvestment, regularInterestRate, years);
  const directFundValue = calculateCompoundInterest(annualInvestment, directInterestRate, years);
  const regularValueCr = regularFundValue / 10000000;
  const directValueCr = directFundValue / 10000000;
  
  // Calculate extra earnings (in lakhs)
  const extraEarnings = Math.round((directValueCr - regularValueCr) * 10000000 / 100000);

  // Generate graph data
  const graphData = [];
  for (let i = 0; i <= years; i += 5) {
    if (i === 0) continue; // Skip year 0
    
    const regularValue = calculateCompoundInterest(annualInvestment, regularInterestRate, i) / 10000000;
    const directValue = calculateCompoundInterest(annualInvestment, directInterestRate, i) / 10000000;
    
    graphData.push({
      year: i,
      regular: parseFloat(regularValue.toFixed(2)),
      direct: parseFloat(directValue.toFixed(2)),
    });
  }

  // Generate yearly data for area chart
  const yearlyData = [];
  for (let i = 0; i <= years; i++) {
    const regularValue = calculateCompoundInterest(annualInvestment, regularInterestRate, i) / 10000000;
    const directValue = calculateCompoundInterest(annualInvestment, directInterestRate, i) / 10000000;
    
    yearlyData.push({
      year: i,
      regular: parseFloat(regularValue.toFixed(2)),
      direct: parseFloat(directValue.toFixed(2)),
    });
  }
  
  return (
    <div className="relative w-full text-black">
      <div className="mb-6 bg-white/80 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Monthly SIP</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">₹</span>
          <Slider
            value={[monthlyInvestment]}
            min={1000}
            max={50000}
            step={1000}
            onValueChange={(value) => onInvestmentChange(value[0])}
            className="w-64"
          />
          <span className="text-lg font-semibold">{monthlyInvestment.toLocaleString()}</span>
        </div>
      </div>
      
      <motion.div className="w-full h-64 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        viewport={{ once: false } }
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={yearlyData}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorRegular" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#36A2EB" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#36A2EB" stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00a651" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00a651" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Cr ₹', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => [`₹${value} Cr`, '']} />
            <Area type="monotone" dataKey="regular" stroke="#36A2EB" fillOpacity={1} fill="url(#colorRegular)" />
            <Area type="monotone" dataKey="direct" stroke="#00a651" fillOpacity={1} fill="url(#colorDirect)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
      
      <div className="flex justify-between mb-4">
        <motion.div 
          className="bg-white shadow-md p-3 rounded-lg border-l-4 border-green-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm mr-2 bg-green-500"></div>
            <span className="text-sm">Direct fund</span>
          </div>
          <div className="font-bold">₹{directValueCr.toFixed(2)} Cr</div>
        </motion.div>
        
        <motion.div 
          className="bg-white shadow-md p-3 rounded-lg border-l-4 border-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm mr-2 bg-blue-400"></div>
            <span className="text-sm">Regular fund</span>
          </div>
          <div className="font-bold">₹{regularValueCr.toFixed(2)} Cr</div>
        </motion.div>
      </div>
      
      <motion.div 
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="text-xl text-indigo-600 font-bold">
          ₹{extraEarnings} lakhs
          <span className="text-base text-gray-600 font-normal ml-2">
            extra earnings in {years} yrs with Direct funds
          </span>
        </div>
        <div className="mt-2">
          <span className="text-gray-500 text-sm cursor-pointer hover:text-nexvest-green transition-colors">
            See how this works
          </span>
        </div>
      </motion.div>
    </div>
  );
};

// Utility function to calculate compound interest
function calculateCompoundInterest(principal: number, rate: number, time: number): number {
  return principal * (Math.pow((1 + rate), time) - 1) / rate;
}

export default InvestmentChart;