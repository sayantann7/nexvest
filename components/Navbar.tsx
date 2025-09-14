"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BarChart2, Menu, X } from 'lucide-react';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Removed unused isMobileView state & effect

    return (
    <nav className="sticky top-0 z-40 bg-[#0D0C34]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0D0C34]/100 border-b border-white/10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Image src="/logo.png" alt="NexVest logo" width={64} height={64} priority />
                    <span className="text-xl font-heading font-semibold"><Link href="/" className="hover:text-[#0AFFFF] transition-colors">NexVest</Link></span>
                </div>

                {/* Desktop Menu (centered) */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="hover:text-[#0AFFFF] transition-colors">Home</Link>
                    <Link href="/unlisted-shares" className="hover:text-[#0AFFFF] transition-colors">Private Equity</Link>
                    <Link href="/mutual-funds" className="hover:text-[#0AFFFF] transition-colors">Mutual Funds</Link>
                    <Link href="/research" className="hover:text-[#0AFFFF] transition-colors">Financial Research</Link>
                    <Link href="/calculators" className="hover:text-[#0AFFFF] transition-colors">Resources</Link>
                    <Link href="/contact" className="hover:text-[#0AFFFF] transition-colors">Contact</Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-white hover:text-[#0AFFFF] transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 bg-[#0D0C34] z-50 md:hidden"
                    >
                        <div className="flex flex-col h-full">
                            <div className="px-6 py-4 flex justify-between items-center border-b border-white/10">
                                <div className="flex items-center space-x-2">
                                    <BarChart2 className="w-6 h-6" />
                                    <span className="text-lg font-heading font-semibold">NexVest</span>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-white hover:text-[#0AFFFF] transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex flex-col h-full">
                                <div className="px-6 py-8 flex flex-col space-y-6 flex-grow">
                                    <Link href="/" className="text-lg hover:text-[#0AFFFF] transition-colors">Home</Link>
                                    <Link href="/mutual-funds" className="text-lg hover:text-[#0AFFFF] transition-colors">Mutual Funds</Link>
                                    <Link href="/unlisted-shares" className="text-lg hover:text-[#0AFFFF] transition-colors">Unlisted Shares</Link>
                                    <Link href="/research" className="text-lg hover:text-[#0AFFFF] transition-colors">Research</Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar