"use client";
import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "framer-motion";
import { BarChart3, PiggyBank, TrendingUp, Users } from "lucide-react";

export const MutualFundsOverviewSection = (): React.ReactElement => {
  const benefits = [
    {
      icon: <Users className="w-10 h-10 text-[#09ffec]" />,
      title: "Pooled Investment",
      description: "Multiple investors combine their funds for greater investment power"
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-[#09ffec]" />,
      title: "Professional Management",
      description: "Funds managed by expert portfolio managers"
    },
    {
      icon: <PiggyBank className="w-10 h-10 text-[#09ffec]" />,
      title: "Diversification",
      description: "Spread risk across multiple securities and asset classes"
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[#09ffec]" />,
      title: "Potential Returns",
      description: "Opportunity for long-term capital growth and income"
    }
  ];

  return (
    <section className="w-full py-24 bg-[#0D0C34] overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            What are <span className="text-white relative inline-block">
              Mutual Funds
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#09ffec]/60"></span>
            </span>?
          </motion.h1>
          <motion.p
            className="max-w-3xl mx-auto text-lg text-white/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A smarter way to grow your wealth through professionally managed, diversified investments
          </motion.p>
        </div>

        {/* Single centered card - Understanding Mutual Funds */}
        <div className="mb-32">
          <motion.div
            className="w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-[#0d0c34] to-[#1a1956] rounded-[22px] shadow-2xl border-none">
              <CardContent className="p-8 md:p-12 py-12 md:py-16">
                <div className="flex flex-col gap-6 text-center">
                  <h2 className="font-heading text-3xl md:text-[40px] font-bold text-white mb-2">
                    Understanding Mutual Funds
                  </h2>

                  <div className="mx-auto max-w-3xl">
                    <div className="border-l-4 border-[#09ffec] pl-4 text-left">
                      <p className="text-[16px] font-normal text-gray-200 leading-relaxed">
                        An investment vehicle where multiple investors pool their funds, which are then invested by professional fund managers across various asset classes including stocks, bonds, and other securities.
                      </p>
                    </div>
                  </div>

                  <div className="mx-auto max-w-3xl">
                    <p className="text-[15px] font-normal text-gray-300 leading-relaxed">
                      The fund manager makes investment decisions based on the fund&apos;s objectives, aiming to generate returns for all investors, who share in the profits or losses proportionally to their investment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Benefits section - replacing decorative dots with meaningful content */}
        <div className="mt-16">
          <motion.h3
            className="font-heading text-2xl md:text-3xl font-bold text-white mb-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Key Benefits of Mutual Funds
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-[#0d0c34] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-400"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 bg-[#0d0c34]/5 w-16 h-16 rounded-full flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-300 mb-2">{benefit.title}</h4>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MutualFundsOverviewSection;