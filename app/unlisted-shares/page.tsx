'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import NavbarWithoutAnimation from '@/components/NavbarWithoutAnimation';

// Define Share interface
interface Share {
    title: string;
    logo_url: string | null;
    price: string;
    percentage_change: string;
}

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
    }
};

export default function UnlistedShares() {
    const [shares, setShares] = useState<Share[]>([]);
    const [filteredShares, setFilteredShares] = useState<Share[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayCount, setDisplayCount] = useState(15); // 5 rows of 3 shares
    const [loading, setLoading] = useState(true);
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

    useEffect(() => {
        async function fetchShares() {
            try {
                const response = await fetch('/unlisted_shares.json');
                const data = await response.json();
                setShares(data);
                setFilteredShares(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching shares data:', error);
                setLoading(false);
            }
        }
        fetchShares();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredShares(shares);
        } else {
            const filtered = shares.filter((share) =>
                share.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredShares(filtered);
        }
    }, [searchQuery, shares]);

    const handleLoadMore = () => {
        setDisplayCount((prevCount) => prevCount + 15); // Load 5 more rows
    };

    const handleImageError = (index: number) => {
        setImageErrors(prev => ({ ...prev, [index]: true }));
    };

    return (
        <>
            <NavbarWithoutAnimation />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                {/* Hero Section */}
                <section className="bg-white dark:from-blue-900 dark:to-indigo-900 text-blue-900">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="container mx-auto py-20 px-4 text-center"
                    >
                        <h1 className="text-5xl font-bold mb-6">Unlisted Shares</h1>
                        <p className="text-xl max-w-3xl mx-auto opacity-90">
                            Discover high-potential unlisted shares before they go public. Get exclusive access to detailed insights on pricing, performance, and growth opportunities.
                        </p>
                    </motion.div>
                </section>

                {/* Search and Shares Section */}
                <section className="container mx-auto px-4 py-12 bg-white">
                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-12 max-w-2xl mx-auto"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search shares by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-4 pl-12 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 dark:bg-[#1E3A8A] dark:border-gray-700 dark:text-white dark:placeholder-white transition-all duration-300 text-white placeholder-white"
                            />
                            <svg
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
                                width="20"
                                height="20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-t-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <>
                            {/* Shares Grid */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                            >
                                {filteredShares.slice(0, displayCount).map((share, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="bg-white dark:bg-[#1E3A8A] rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl duration-300"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    {share.logo_url && !imageErrors[index] ? (
                                                        <div className="relative w-[60px] h-[60px]">
                                                            <Image
                                                                src={share.logo_url}
                                                                alt={share.title}
                                                                fill
                                                                sizes="60px"
                                                                style={{ objectFit: 'cover' }}
                                                                className="rounded-lg"
                                                                onError={() => handleImageError(index)}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-[60px] h-[60px] bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                                            <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">
                                                                {share.title.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white line-clamp-2">{share.title}</h3>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="font-bold text-xl text-gray-900 dark:text-white">₹{share.price}</span>
                                                        <span
                                                            className={`px-2 py-1 rounded-lg text-sm font-medium ${share.percentage_change.startsWith('-')
                                                                    ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200'
                                                                    : share.percentage_change === '0%'
                                                                        ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                                                        : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200'
                                                                }`}
                                                        >
                                                            {share.percentage_change}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Load More Button */}
                            {filteredShares.length > displayCount && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex justify-center mt-12"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleLoadMore}
                                        className="px-8 py-4 bg-[#1E3A8A] hover:bg-[#1E3A8A] text-white font-semibold rounded-xl shadow-md transition-all duration-300"
                                    >
                                        View More
                                    </motion.button>
                                </motion.div>
                            )}

                            {/* No results message */}
                            {filteredShares.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16"
                                >
                                    <p className="text-xl text-gray-600 dark:text-gray-400">
                                        No shares found matching your search. Try a different term.
                                    </p>
                                </motion.div>
                            )}
                        </>
                    )}
                </section>
            </main>
        </>
    );
}