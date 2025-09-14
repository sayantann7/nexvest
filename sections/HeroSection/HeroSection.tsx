import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const HeroSection = (): React.ReactElement => {
  return (
    <section 
      className="relative w-full min-h-[calc(100vh-64px)] flex items-center overflow-hidden"
      style={{ 
        backgroundImage: "url(/mutualFund/mf-bg.jpg)", 
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Optional semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <Card className="md:ml-[100px] w-[90%] md:w-[515px] bg-[#0d0c34] rounded-[22px] shadow-glow-effect border-none">
          <CardContent className="px-6 md:px-12 py-10 md:py-[81px] flex flex-col items-start gap-6">
            <h1 className="self-stretch font-heading font-semibold text-white text-2xl md:text-[40px] leading-normal">
              Invest in the freedom of Choice
            </h1>

            <p className="self-stretch font-normal text-white text-sm md:text-[15px] leading-5">
              Wealth is not just about money. It&#39;s about what all you can do
              with it. It is having your own story of progress. And living it
              every single day. So go ahead, imagine a future you want to shape.
            </p>

            <Button className="px-5 md:px-7 py-2.5 md:py-3 bg-[#09ffec] text-black rounded-[51.75px] hover:bg-[#09ffec]/90 flex items-center gap-[3px]">
              <span className="font-heading font-semibold text-sm md:text-[15px]">
                Get Started
              </span>
              <ArrowRightIcon className="w-[13px] md:w-[15px] h-[13px] md:h-[15px]" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};