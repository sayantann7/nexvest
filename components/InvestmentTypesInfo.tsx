"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownToLine, CalendarClock, TrendingUp, CircleDollarSign, Clock, BarChart3 } from 'lucide-react';

interface InvestmentTypesInfoProps {
  className?: string;
}

const InvestmentTypesInfo: React.FC<InvestmentTypesInfoProps> = ({ className }) => {
  return (
    <div className={`text-[#0D0C34] ${className}`}>
  <h3 className="text-xl font-heading font-semibold mb-6 text-gray-200">Investment Methods Explained</h3>
      
      <div className="flex flex-col gap-8">
        {/* SIP Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#09ffec]/20 flex items-center justify-center">
              <CalendarClock className="w-6 h-6 text-[#09ffec]" />
            </div>
            <h4 className="text-lg font-heading font-semibold text-gray-200">Systematic Investment Plan (SIP)</h4>
          </div>
          
          <p className="text-gray-300 mb-4">
            SIP allows you to invest a fixed amount at regular intervals (monthly, quarterly), helping build 
            wealth through the power of compounding and rupee cost averaging.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-4 rounded-xl border border-gray-400"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-gray-300" />
                <h5 className="font-medium text-gray-300">Consistency</h5>
              </div>
              <p className="text-sm text-gray-400">
                Regular investments build disciplined saving habits
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-4 rounded-xl border border-gray-400"
            >
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-gray-300" />
                <h5 className="font-medium text-gray-300">Averaging</h5>
              </div>
              <p className="text-sm text-gray-400">
                Buy more units when prices are low, fewer when high
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-b border-gray-200 w-full my-2"></div>
        
        {/* Lumpsum Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#09ffec]/20 flex items-center justify-center">
              <CircleDollarSign className="w-6 h-6 text-[#09ffec]" />
            </div>
            <h4 className="text-lg font-heading font-semibold text-gray-200">Lumpsum Investment</h4>
          </div>
          
          <p className="text-gray-300 mb-4">
            A one-time investment of a larger amount, ideal when you have a substantial sum ready 
            and want to maximize returns during market upswings.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="border border-gray-400 p-4 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-gray-300" />
                <h5 className="font-medium text-gray-300">Market Timing</h5>
              </div>
              <p className="text-sm text-gray-400">
                Better returns when invested during market lows
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="border border-gray-400 p-4 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownToLine className="w-5 h-5 text-gray-300" />
                <h5 className="font-medium text-gray-300">Lower Costs</h5>
              </div>
              <p className="text-sm text-gray-400">
                Single transaction means fewer transaction charges
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Comparison */}
        <div className="mt-6">
          <h4 className="text-lg font-heading font-semibold mb-3 text-gray-200">Which is right for you?</h4>
          
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Factor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">SIP</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lumpsum</th>
                </tr>
              </thead>
              <tbody className="border border-gray-400 divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-300">Risk Exposure</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Lower</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Higher</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-300">Initial Investment</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Small</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Large</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-300">Market Volatility Impact</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Minimized</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Significant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentTypesInfo;