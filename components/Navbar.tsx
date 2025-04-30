"use client";
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BarChart2, ChevronDown, Menu, X } from 'lucide-react';
import WelcomeAnimation from "../components/WelcomeAnimation";

function Navbar() {
    const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    const resourcesTimeoutRef = useRef<number | null>(null);

    // Function to handle Resources dropdown mouse events
    const handleResourcesMouseEnter = () => {
        if (resourcesTimeoutRef.current) {
            window.clearTimeout(resourcesTimeoutRef.current);
            resourcesTimeoutRef.current = null;
        }
        setShowResourcesDropdown(true);
    };

    const handleResourcesMouseLeave = () => {
        resourcesTimeoutRef.current = window.setTimeout(() => {
            setShowResourcesDropdown(false);
        }, 1000); // 1000ms = 1 second delay
    };

    //



    // Function to handle Resources dropdown mouse events
    const handleAlreadyEnteredResourcesMouseEnter = () => {
        if (resourcesTimeoutRef.current) {
            window.clearTimeout(resourcesTimeoutRef.current);
            resourcesTimeoutRef.current = null;
        }
        setShowResourcesDropdown(true);
    };

    const handleAlreadyEnteredResourcesMouseLeave = () => {
        resourcesTimeoutRef.current = window.setTimeout(() => {
            setShowResourcesDropdown(false);
        }, 100); // 1000ms = 1 second delay
    };

    useEffect(() => {
        setIsMobileView(window.innerWidth < 768);
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <nav className="px-6 py-4 flex items-center justify-between relative bg-[#0D0C34] z-50">
            {/* Welcome Animation */}
            < WelcomeAnimation />
            <div className="flex items-center space-x-2">
                <BarChart2 className="w-8 h-8" />
                <span className="text-2xl font-bold"><Link href="/" className="hover:text-[#0AFFFF] transition-colors">NexVest</Link></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="hover:text-[#0AFFFF] transition-colors">Home</Link>

                <Link href="/mutual-funds" className="hover:text-[#0AFFFF] transition-colors">Mutual Funds</Link>

                <Link href="/personality-test" className="hover:text-[#0AFFFF] transition-colors">Personality Test</Link>

                <Link href="/unlisted-shares" className="hover:text-[#0AFFFF] transition-colors">Unlisted Shares</Link>

                {/* Resources Dropdown */}
                <div className="relative">
                    <button
                        className="flex items-center space-x-1 hover:text-[#0AFFFF] transition-colors"
                        onMouseEnter={handleResourcesMouseEnter}
                        onMouseLeave={handleResourcesMouseLeave}
                    >
                        <span>Resources</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {showResourcesDropdown && (
                        <div
                            className="absolute top-full left-0 mt-2 w-48 bg-[#0D0C34] rounded-lg shadow-lg py-2 z-50"
                            onMouseEnter={handleAlreadyEnteredResourcesMouseEnter}
                            onMouseLeave={handleAlreadyEnteredResourcesMouseLeave}
                        >
                            <a href="#" className="block px-4 py-2 hover:bg-[#0D0C34] hover:text-[#0AFFFF]">Documentation</a>
                            <a href="#" className="block px-4 py-2 hover:bg-[#0D0C34] hover:text-[#0AFFFF]">API Reference</a>
                            <a href="#" className="block px-4 py-2 hover:bg-[#0D0C34] hover:text-[#0AFFFF]">Tutorials</a>
                        </div>
                    )}
                </div>

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

            {!isMobileView && (
                <button className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                    <Image
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                        width={32}
                        height={32}
                    />
                    <span className="hidden md:inline">My Account</span>
                </button>
            )}


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
                                    <Link href="/personality-test" className="text-lg hover:text-yellow-400 transition-colors">Personality Test</Link>
                                    <Link href="/unlisted-shares" className="hover:text-[#0AFFFF] transition-colors">Unlisted Shares</Link>
                                    <div className="space-y-4">
                                        <p className="text-lg font-semibold">Resources</p>
                                        <div className="pl-4 flex flex-col space-y-3">
                                            <a href="#" className="hover:text-yellow-400 transition-colors">Documentation</a>
                                            <a href="#" className="hover:text-yellow-400 transition-colors">API Reference</a>
                                            <a href="#" className="hover:text-yellow-400 transition-colors">Tutorials</a>
                                        </div>
                                    </div>
                                    <a href="#" className="text-lg hover:text-yellow-400 transition-colors">Pricing</a>
                                </div>
                                {/* Account Section */}
                                <div className="mt-auto border-t border-white/10 px-6 py-4">
                                    <button className="w-full flex items-center space-x-3 hover:text-yellow-400 transition-colors">
                                        <Image
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full"
                                            width={32}
                                            height={32}
                                        />
                                        <span className="text-lg">My Account</span>
                                    </button>
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