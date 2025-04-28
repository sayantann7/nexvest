import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
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
    <section className="w-full py-24 bg-gradient-to-b from-[#fdfffc] to-[#f5f7ff] overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0d0c34] mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            What are <span className="text-[#0d0c34] relative inline-block">
              Mutual Funds
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#09ffec]/60"></span>
            </span>?
          </motion.h1>
          <motion.p
            className="max-w-3xl mx-auto text-lg text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A smarter way to grow your wealth through professionally managed, diversified investments
          </motion.p>
        </div>

        {/* Cards container - side-by-side layout */}
        <div className="flex flex-col md:flex-row gap-8 mb-32">
          {/* Left Card - Illustration with enhanced styling */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-white to-[#f5f7ff] rounded-[22px] shadow-xl border-none overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full">
              <CardContent className="p-10 md:p-12 flex items-center justify-center relative h-full">
                <div className="relative w-full max-w-[450px] z-10">
                  <motion.img
                    className="w-full h-auto drop-shadow-2xl"
                    alt="Illustration of person analyzing mutual fund investments"
                    src="/mutualFund/mutual-fund-overview.png"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Card - Explanation with enhanced styling */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-[#0d0c34] to-[#1a1956] rounded-[22px] shadow-2xl border-none h-full">
              <CardContent className="p-8 md:p-12 py-12 md:py-16 h-full">
                <div className="flex flex-col gap-6 h-full">
                  <h2 className="text-3xl md:text-[40px] font-bold text-white font-['Inter',Helvetica] mb-2">
                    Understanding Mutual Funds
                  </h2>

                  <div className="border-l-4 border-[#09ffec] pl-4">
                    <p className="text-[16px] font-normal text-gray-200 leading-relaxed font-['Inter',Helvetica]">
                      An investment vehicle where multiple investors pool their funds, which are then invested by professional fund managers across various asset classes including stocks, bonds, and other securities.
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-[15px] font-normal text-gray-300 leading-relaxed mb-4">
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
            className="text-2xl md:text-3xl font-bold text-[#0d0c34] mb-10 text-center"
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
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 bg-[#0d0c34]/5 w-16 h-16 rounded-full flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-semibold text-[#0d0c34] mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">Start your investment journey today</p>
          <Button className="bg-[#0d0c34] hover:bg-[#0d0c34]/90 text-white px-8 py-6 rounded-full text-lg">
            Explore Mutual Fund Options
          </Button>
        </motion.div>
      </div>
    </section>
  );
};