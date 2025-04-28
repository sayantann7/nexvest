"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function WelcomeAnimation() {

    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);
    
    return (
        <AnimatePresence>
            {showWelcome && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0C34] overflow-hidden"
                >
                    <div className="text-2xl md:text-4xl font-medium tracking-wider flex items-center text-[#0AFFFF]">
                        <div className="flex">
                            {"WELCOME TO".split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.03,
                                        ease: "easeOut",
                                    }}
                                    className="inline-block"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </div>
                        <span className="inline-block px-1">{" "}</span>
                        <div className="flex">
                            {"NEXVEST".split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: "WELCOME TO".length * 0.03 + 0.05 + index * 0.03,
                                        ease: "easeOut",
                                    }}
                                    className="inline-block text-nexvest-green"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default WelcomeAnimation