"use client";
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BarChart2, Menu, X } from 'lucide-react';
import WelcomeAnimation from "../components/WelcomeAnimation";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    // Track viewport width for conditional mobile UI behavior (unchanged logic)
    useEffect(() => {
        const update = () => setIsMobileView(window.innerWidth < 768);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return (
        <nav className="px-6 py-4 flex items-center justify-between relative bg-[#0D0C34] z-50">
            {/* Welcome Animation */}
            < WelcomeAnimation />
            <div className="flex items-center space-x-2">
                <BarChart2 className="w-8 h-8" />
                <span className="text-2xl font-bold"><Link href="/" className="hover:text-[#0AFFFF] transition-colors">NexVest</Link></span>
            </div>

            {/* Desktop Menu (centered) */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
                <Link href="/" className="hover:text-[#0AFFFF] transition-colors">Home</Link>

                <Link href="/mutual-funds" className="hover:text-[#0AFFFF] transition-colors">Mutual Funds</Link>

                {/* Personality Test link removed as test moved to home */}

                <Link href="/unlisted-shares" className="hover:text-[#0AFFFF] transition-colors">Unlisted Shares</Link>

                <Link href="/research" className="hover:text-[#0AFFFF] transition-colors">Research</Link>

                {/* Resources removed */}

                {/* <a href="#" className="hover:text-[#0AFFFF] transition-colors">Pricing</a> */}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="text-white hover:text-yellow-400 transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* My Account removed */}


            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 bg-[#001200] z-50 md:hidden"
                    >
                        <div className="flex flex-col h-full">
                            <div className="px-6 py-4 flex justify-between items-center border-b border-white/10">
                                <div className="flex items-center space-x-2">
                                    <BarChart2 className="w-8 h-8" />
                                    <span className="text-xl font-bold">NexVest</span>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-white hover:text-yellow-400 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex flex-col h-full">
                                <div className="px-6 py-8 flex flex-col space-y-6 flex-grow">
                                    <Link href="/" className="text-lg hover:text-yellow-400 transition-colors">Home</Link>
                                    <Link href="/mutual-funds" className="text-lg hover:text-yellow-400 transition-colors">Mutual Funds</Link>
                                    {/* Personality Test link removed */}
                                    <Link href="/unlisted-shares" className="text-lg hover:text-yellow-400 transition-colors">Unlisted Shares</Link>
                                    <Link href="/research" className="text-lg hover:text-yellow-400 transition-colors">Research</Link>
                                    {/* Resources removed mobile */}
                                    <a href="#" className="text-lg hover:text-yellow-400 transition-colors">Pricing</a>
                                </div>
                                {/* Account section removed */}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar