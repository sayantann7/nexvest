import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

interface InvestmentSimulatorProps {
  monthlyInvestment: number;
  onInvestmentChange: (value: number) => void;
}

const InvestmentSimulator: React.FC<InvestmentSimulatorProps> = ({
  monthlyInvestment,
  onInvestmentChange
}) => {
  const [activeTab, setActiveTab] = useState<'sip' | 'lumpsum'>('sip');
  const [inputValue, setInputValue] = useState<string>(monthlyInvestment.toLocaleString('en-IN'));
  
  // Quick add amounts for SIP
  const quickAddAmounts = [500, 1000, 5000, 10000];
  
  // Calculate the returns based on current input
  const calculateReturns = (amount: number, years: number = 20, rate: number = 12): number => {
    if (activeTab === 'sip') {
      // Monthly SIP compound calculation
      const monthlyRate = rate / 12 / 100;
      const months = years * 12;
      return amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      // Lumpsum compound calculation
      return amount * Math.pow(1 + rate / 100, years);
    }
  };
  
  // Format currency with Indian separators
  const formatIndianCurrency = (value: number): string => {
    return value.toLocaleString('en-IN');
  };
  
  // Generate chart data
  const generateChartData = () => {
    const data = [];
    const currentAmount = parseFloat(inputValue.replace(/,/g, '')) || monthlyInvestment;
    
    for (let year = 0; year <= 20; year += 1) {
      data.push({
        year,
        value: calculateReturns(currentAmount, year) / 100000 // Convert to lakhs
      });
    }
    return data;
  };
  
  const chartData = generateChartData();
  const totalReturns = calculateReturns(
    parseFloat(inputValue.replace(/,/g, '')) || monthlyInvestment
  );
  
  // Handle amount change with validation
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove commas and non-digits
    const rawValue = e.target.value.replace(/,/g, '').replace(/[^\d]/g, '');
    if (rawValue === '') {
      setInputValue('');
      return;
    }
    
    const numValue = parseInt(rawValue, 10);
    // Format with commas
    setInputValue(formatIndianCurrency(numValue));
    onInvestmentChange(numValue);
  };
  
  // Handle quick add button clicks
  const handleQuickAdd = (amount: number) => {
    const currentValue = parseFloat(inputValue.replace(/,/g, '')) || 0;
    const newValue = currentValue + amount;
    setInputValue(formatIndianCurrency(newValue));
    onInvestmentChange(newValue);
  };
  
  return (
    <Card className="h-full bg-[#0A0E2F] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.15)]">
      <CardContent className="p-0 h-full flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('sip')}
            className={`flex-1 py-4 lg:py-5 text-center font-medium transition-colors ${
              activeTab === 'sip'
                ? 'bg-[#0A0E2F] text-white border-b-2 border-[#09ffec]'
                : 'bg-[#070A24] text-gray-400 hover:text-white'
            }`}
          >
            Monthly SIP
          </button>
          <button
            onClick={() => setActiveTab('lumpsum')}
            className={`flex-1 py-4 lg:py-5 text-center font-medium transition-colors ${
              activeTab === 'lumpsum'
                ? 'bg-[#0A0E2F] text-white border-b-2 border-[#09ffec]'
                : 'bg-[#070A24] text-gray-400 hover:text-white'
            }`}
          >
            Lumpsum
          </button>
        </div>
        
        {/* Content with improved spacing for desktop */}
        <div className="p-6 lg:p-8 flex flex-col h-full justify-between">
          <div className="mb-6 lg:mb-10 text-center">
            <h3 className="text-gray-300 text-sm lg:text-base mb-2 lg:mb-4">
              {activeTab === 'sip' ? 'Monthly investment amount' : 'One-time investment amount'}
            </h3>
            
            <div className="relative max-w-xs mx-auto">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl">₹</span>
              <Input
                value={inputValue}
                onChange={handleAmountChange}
                className="pl-8 h-12 lg:h-14 text-xl lg:text-2xl text-white bg-[#131740] border-gray-700 text-center font-bold"
              />
            </div>
            
            {/* Quick add buttons */}
            <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mt-3 lg:mt-5">
              {quickAddAmounts.map(amount => (
                <Button
                  key={amount}
                  onClick={() => handleQuickAdd(amount)}
                  variant="outline"
                  className="bg-[#131740] text-gray-300 border-gray-700 hover:bg-[#1c2254] hover:text-white lg:text-base lg:py-2"
                >
                  +₹{formatIndianCurrency(amount)}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Chart - increased height on desktop */}
          <div className="h-52 lg:h-72 mb-6 lg:mb-10 flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#09ffec" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#09ffec" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="year" 
                  stroke="#555" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#555" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888', fontSize: 12 }}
                  tickFormatter={(value) => `${value}L`}
                />
                <Tooltip 
                  formatter={(value: number) => [`₹${formatIndianCurrency(value)} lakhs`, 'Value']}
                  labelFormatter={(year) => `Year ${year}`}
                  contentStyle={{ backgroundColor: '#0A0E2F', borderColor: '#333' }}
                  itemStyle={{ color: '#09ffec' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#09ffec" 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Results summary - added more spacing on desktop */}
          <div className="text-center mb-6 lg:mb-10">
            <div className="text-gray-300 text-sm lg:text-base">Estimated returns after 20 years</div>
            <div className="text-[#09ffec] text-3xl lg:text-4xl font-bold mt-1 lg:mt-3">
              ₹{formatIndianCurrency(Math.round(totalReturns))}
            </div>
          </div>
          
          {/* CTA Button - increased vertical padding on desktop */}
          <Button 
            className="mt-auto py-6 lg:py-7 bg-[#131740] hover:bg-[#1c2254] text-white border-none rounded-xl shadow-lg lg:text-lg"
          >
            Check out top performing funds
          </Button>
          
          <div className="text-center text-xs lg:text-sm text-gray-400 mt-4 lg:mt-6">
            Note: This calculation assumes {activeTab === 'sip' ? 'monthly installments' : 'one-time investment'} with 
            12% p.a. returns compounded {activeTab === 'sip' ? 'monthly' : 'annually'}.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentSimulator;