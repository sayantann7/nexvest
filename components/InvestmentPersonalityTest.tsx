"use client";
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, ChevronRight, Brain, BarChart3, AreaChart, LineChart } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: { text: string; value: number }[];
}

interface Result {
  title: string;
  description: string;
  investmentType: string;
  riskLevel: string;
  color: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "How would you feel if your investment lost 20% of its value in a month?",
    options: [
      { text: "Extremely uncomfortable - I would sell immediately", value: 1 },
      { text: "Concerned - I might consider selling", value: 2 },
      { text: "Neutral - I understand markets fluctuate", value: 3 },
      { text: "Confident - I see it as a buying opportunity", value: 4 }
    ]
  },
  {
    id: 2,
    question: "Which statement best describes your investment goals?",
    options: [
      { text: "Preserving capital is my primary concern", value: 1 },
      { text: "I want steady growth with minimal risk", value: 2 },
      { text: "I'm looking for a balance between growth and safety", value: 3 },
      { text: "I'm focused on maximum long-term growth", value: 4 }
    ]
  },
  {
    id: 3,
    question: "Which investment scenario appeals to you most?",
    options: [
      { text: "5% annual return with almost no risk of loss", value: 1 },
      { text: "8% annual return with small risk of loss", value: 2 },
      { text: "10% annual return with moderate risk of loss", value: 3 },
      { text: "12%+ annual return with significant risk of loss", value: 4 }
    ]
  },
  {
    id: 4,
    question: "If you had ₹1,00,000 to invest, which would you choose?",
    options: [
      { text: "Bank fixed deposits and government bonds", value: 1 },
      { text: "A mix of mutual funds with good track records", value: 2 },
      { text: "A diversified portfolio of stocks and bonds", value: 3 },
      { text: "Aggressive growth stocks and some alternatives", value: 4 }
    ]
  },
  {
    id: 5,
    question: "What is the compound interest on ₹10,000 invested at 10% for 2 years?",
    options: [
      { text: "₹1,000", value: 1 },
      { text: "₹2,000", value: 1 },
      { text: "₹2,100", value: 3 },
      { text: "₹3,000", value: 1 }
    ]
  }
];

const results: Result[] = [
  {
    title: "Conservative Investor",
    description: "You prioritize capital preservation over growth. You're uncomfortable with market volatility and prefer safer investments.",
    investmentType: "Fixed deposits, government bonds, debt mutual funds",
    riskLevel: "Low",
    color: "#1E3A8A"
  },
  {
    title: "Moderate Investor",
    description: "You seek a balance between growth and safety. You can tolerate some market fluctuations for better returns.",
    investmentType: "Balanced mutual funds, blue-chip stocks, corporate bonds",
    riskLevel: "Medium",
    color: "#2563EB"
  },
  {
    title: "Growth Investor",
    description: "You're focused on long-term growth and can handle significant market volatility for potentially higher returns.",
    investmentType: "Growth stocks, equity mutual funds, some international exposure",
    riskLevel: "Medium-High",
    color: "#0369A1"
  },
  {
    title: "Aggressive Investor",
    description: "You're seeking maximum returns and are comfortable with high volatility and risk. You have a long investment horizon.",
    investmentType: "Small-cap stocks, aggressive growth funds, alternative investments",
    riskLevel: "High",
    color: "#0891B2"
  }
];

const InvestmentPersonalityTest: React.FC = () => {
  const testSectionRef = useRef<HTMLDivElement>(null);
  const resultsSectionRef = useRef<HTMLDivElement>(null);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [progress, setProgress] = useState(0);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const startTest = () => {
    setIsTestStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setProgress(0);
    setResult(null);
  };

  const startTestAndScroll = () => {
    startTest();
    scrollToSection(testSectionRef);
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
    } else {
      const totalScore = newAnswers.reduce((sum, v) => sum + v, 0);
      const avgScore = totalScore / questions.length;
      let resultIndex = 0;
      if (avgScore > 1.5 && avgScore <= 2.5) resultIndex = 1;
      else if (avgScore > 2.5 && avgScore <= 3.5) resultIndex = 2;
      else if (avgScore > 3.5) resultIndex = 3;
      setResult(results[resultIndex]);
      setProgress(100);
      setIsTestStarted(false);
      setTimeout(() => {
        if (resultsSectionRef.current) resultsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const resetTest = () => {
    startTest();
    if (testSectionRef.current) testSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0D0C34] text-white">
      <section className="relative w-full min-h-[450px] md:h-[560px] flex items-center overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline>
          <source src="/bgVideo.mp4" type="video/mp4" />
          <Image src="/mutualFund/mf-bg.png" alt="Investment Background" className="w-full h-full object-cover" width={1920} height={1080} />
        </video>
        <div className="absolute inset-0 bg-[#0D0C34]/75 z-[1]"></div>
        <div className="absolute top-0 left-0 right-0 h-32 z-[2]" style={{ background: 'linear-gradient(to bottom, #0D0C34 0%, rgba(13,12,52,0) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 z-[2]" style={{ background: 'linear-gradient(to top, #0D0C34 0%, rgba(13,12,52,0) 100%)' }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div className="md:w-1/2 text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Discover Your <span className="text-[#09ffec]">Investment</span> Personality</h2>
              <p className="text-lg md:text-xl mb-8 max-w-lg font-medium text-slate-200">Understand your risk tolerance, financial knowledge, and investment mindset to receive personalized investment recommendations.</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#09ffec] hover:bg-[#09ffec]/90 text-[#0D0C34] font-bold py-4 px-8 rounded-full flex items-center" onClick={startTestAndScroll}>
                <span>Start Test</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>
            <motion.div className="md:w-1/2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <Card className="bg-[#131740] border border-white/10 rounded-2xl shadow-lg overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-white">Why Take Our Personality Test?</h3>
                  <ul className="space-y-4">
                    {["Understand your risk tolerance level","Assess your financial knowledge","Discover your investment mindset","Get personalized investment recommendations","Create a strategy aligned with your goals"].map((item, index) => (
                      <motion.li key={index} className="flex items-start text-slate-200" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (index * 0.1) }}>
                        <div className="mr-3 rounded-full bg-white/10 p-1"><Check className="w-4 h-4 text-[#09ffec]" /></div>
                        <span className="font-medium">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm font-medium text-slate-300">The test takes ~5 minutes. Your results help NexVest suggest investments that match your profile.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      <section ref={testSectionRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div className="mb-12 flex flex-col items-center text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6"><Brain className="w-8 h-8 text-[#09ffec]" /></div>
              <h3 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-white">Investment Personality Test</h3>
              <p className="font-medium max-w-2xl mb-8 text-slate-300">We analyze your risk tolerance, knowledge, and preferences to create a personalized profile.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: <BarChart3 className="w-6 h-6 text-[#09ffec]" />, title: "5 Questions", description: "Quick assessment" },
                { icon: <AreaChart className="w-6 h-6 text-[#09ffec]" />, title: "Scientific", description: "Evaluates multiple factors" },
                { icon: <LineChart className="w-6 h-6 text-[#09ffec]" />, title: "Personalized", description: "Tailored recommendations" }
              ].map((feature, index) => (
                <motion.div key={index} className="bg-[#131740] p-6 rounded-xl border border-white/10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-semibold mb-2 text-white">{feature.title}</h4>
                  <p className="text-slate-300 font-medium text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            {isTestStarted ? (
              <Card className="bg-[#131740] border border-white/10 rounded-xl shadow-md">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h5 className="text-xl font-semibold mb-4 text-white">Question {currentQuestionIndex + 1} of {questions.length}</h5>
                    <Progress value={progress} className="w-full h-2 bg-white/10" />
                  </div>
                  <motion.div key={currentQuestionIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                    <h6 className="text-2xl font-bold mb-6 text-white">{questions[currentQuestionIndex].question}</h6>
                    <div className="space-y-4">
                      {questions[currentQuestionIndex].options.map((option, idx) => (
                        <motion.button key={idx} className="w-full text-left p-4 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all flex justify-between items-center text-white font-medium" onClick={() => handleAnswer(option.value)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <span>{option.text}</span>
                          <ChevronRight className="w-5 h-5 text-[#09ffec]" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            ) : (
              <div className="hidden" />
            )}
          </div>
        </div>
      </section>
      {result ? (
        <section ref={resultsSectionRef} className="py-16 md:py-24 bg-[#0D0C34]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div className="mb-12 flex flex-col items-center text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
                <div className="bg-white/10 p-2 rounded-full mb-4"><AreaChart className="w-8 h-8 text-[#09ffec]" /></div>
                <h3 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-white">Your Investment Profile</h3>
                <p className="font-medium max-w-2xl text-slate-300">Here’s a detailed analysis of your personality and recommendations.</p>
              </motion.div>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="text-center mb-8">
                  <span className="inline-block bg-white/10 text-white font-bold px-4 py-1 rounded-full text-sm mb-4">Your Results</span>
                  <h4 className="text-3xl md:text-5xl font-bold mb-2 text-white">You are a <span style={{ color: result.color }}>{result.title}</span></h4>
                  <p className="font-medium text-slate-300">{result.description}</p>
                </div>
                <Card className="bg-[#131740] border border-white/10 rounded-xl mb-8 shadow-md">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h5 className="text-xl font-semibold text-white">Recommended Investment Types</h5>
                        <p className="font-medium text-slate-300">{result.investmentType}</p>
                      </div>
                      <div className="space-y-4">
                        <h5 className="text-xl font-semibold text-white">Your Risk Tolerance</h5>
                        <div className="flex items-center">
                          <div className="w-full bg-white/10 rounded-full h-4">
                            <div className="h-4 rounded-full" style={{ width: result.riskLevel === 'Low' ? '25%' : result.riskLevel === 'Medium' ? '50%' : result.riskLevel === 'Medium-High' ? '75%' : '100%', backgroundColor: result.color }} />
                          </div>
                          <span className="ml-3 font-semibold text-white">{result.riskLevel}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Button onClick={resetTest} className="bg-transparent border border-white/20 text-white hover:bg-white/10 font-medium">Retake Test</Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default InvestmentPersonalityTest;
