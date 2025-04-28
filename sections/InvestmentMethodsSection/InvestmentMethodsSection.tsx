import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";

export const InvestmentMethodsSection = (): React.ReactElement => {
  const investmentMethods = [
    {
      title: "SIP (Systematic Investment Plan)",
      description:
        "SIP allows you to invest a fixed sum at regular intervals. SIP is one of the most recommended ways to invest in mutual fund schemes as it is convenient. It also helps you average out the cost at which you buy the units of these funds.",
    },
    {
      title: "Lumpsum",
      description:
        "A lumpsum investment is when you invest a large amount at one go in a mutual fund scheme. This method is suitable when you have a substantial amount of money ready to invest.",
    },
  ];

  return (
    <section className="relative w-full min-h-[844px] bg-[#0d0c34] bg-[url(/mutualFund/ways-to-invest-in-mf.png)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0c34]/90 to-[#0d0c34]/90" />
      
      <div className="container relative mx-auto px-4 py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[64px] font-semibold text-white mb-20"
        >
          Ways to Invest in Mutual Funds
        </motion.h1>

        <div className="flex flex-col md:flex-row justify-end">
          <div className="flex flex-col gap-6 md:w-[556px]">
            {investmentMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-transparent rounded-[22px] shadow-glow-effect border-0">
                  <CardContent className="flex flex-col items-start gap-6 px-12 py-6">
                    <h2 className="font-inter font-semibold text-white text-[40px]">
                      {method.title}
                    </h2>
                    <p className="font-inter font-normal text-white text-[15px] leading-6">
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};