'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { ArrowRight, CheckCircle2, Shield, TrendingUp, Wallet, AlertTriangle } from 'lucide-react';

// Define Share interface
interface Share {
    title: string;
    logo_url: string | null;
    price: string; // retained in data but no longer displayed
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
            <Navbar />
            <main className="min-h-screen bg-[#0D0C34] text-white">
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-x-0 -top-20 h-[380px] -z-10 bg-[radial-gradient(ellipse_at_top,rgba(9,255,236,0.15),transparent_60%)]" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="container mx-auto py-16 md:py-20 px-4"
                    >
                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 mb-4">Pre-IPO • ESOP • Unlisted</div>
                                <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                    Private Equity
                                </h1>
                                <p className="text-lg text-slate-300 mb-6 max-w-xl">
                                    Private Equity That Powers India&apos;s Next Decade. NexVest backs bold Indian founders, disruptive ideas and
high-growth sectors, connecting visionary capital with transformative businesses. We don&apos;t just invest; we
partner to scale and create impact.
                                </p>
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <div className="px-3 py-2 rounded-xl border border-white/10 bg-[#131740] text-sm text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/>T+1–T+3 settlement</div>
                                    <div className="px-3 py-2 rounded-xl border border-white/10 bg-[#131740] text-sm text-slate-300 flex items-center gap-2"><Shield className="w-4 h-4 text-[#09ffec]"/>KYC verified</div>
                                    <div className="px-3 py-2 rounded-xl border border-white/10 bg-[#131740] text-sm text-slate-300 flex items-center gap-2"><Wallet className="w-4 h-4 text-sky-400"/>Secure escrow flow</div>
                                </div>
                                <a href="#browse" className="inline-flex items-center gap-2 bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90 font-semibold rounded-xl px-5 py-3 transition-colors">
                                    Browse Unlisted Shares <ArrowRight className="w-4 h-4"/>
                                </a>
                            </div>
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#131740] shadow-[0_10px_40px_-10px_rgba(9,255,236,0.15)]">
                                <Image src="/mutualFund/bull.jpg" alt="Unlisted market" fill className="object-cover opacity-90" />
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Process Section */}
                <section className="container mx-auto px-4 py-12 md:py-16">
                    <div className="text-center mb-10">
                        <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-2">Process to Buy Unlisted Shares</h2>
                        <p className="text-slate-300">Recommended for those interested in dealing with unlisted shares.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-[#131740] border border-white/10 rounded-2xl p-6 text-center">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto font-semibold mb-4">1</div>
                            <h3 className="font-heading font-semibold text-xl mb-2">Contact Us</h3>
                            <p className="text-slate-300">Connect with our RMs and get best quotes for unlisted shares.</p>
                        </div>
                        <div className="bg-[#131740] border border-white/10 rounded-2xl p-6 text-center">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto font-semibold mb-4">2</div>
                            <h3 className="font-heading font-semibold text-xl mb-2">Deal Processing</h3>
                            <p className="text-slate-300">Payment to escrow/verified party; our team initiates transfer.</p>
                        </div>
                        <div className="bg-[#131740] border border-white/10 rounded-2xl p-6 text-center">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto font-semibold mb-4">3</div>
                            <h3 className="font-heading font-semibold text-xl mb-2">Deal Completion</h3>
                            <p className="text-slate-300">Shares transferred to your Demat typically within 24–72 hours.</p>
                        </div>
                    </div>
                </section>

                {/* Education: clearer, easier consumption */}
                <section className="container mx-auto px-4 py-12 md:py-16">
                    {/* At a Glance */}
                    <div className="mb-8">
                        <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">Unlisted Shares at a Glance</h2>
                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="bg-[#131740] border border-white/10 rounded-2xl p-6">
                                <h3 className="font-heading text-xl font-semibold mb-3">What are Unlisted Shares?</h3>
                                <p className="text-slate-300">Equity of private companies not traded on exchanges. Accessed via private deals, ESOPs, or pre-IPO rounds. Pricing is negotiated; liquidity is limited.</p>
                            </div>
                            <div className="bg-[#131740] border border-white/10 rounded-2xl p-6">
                                <h3 className="font-heading text-xl font-semibold mb-3">Quick Facts</h3>
                                <ul className="space-y-2 text-slate-300">
                                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5"/> Settlement: typically T+1–T+3</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5"/> KYC: PAN, Aadhaar, Demat required</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5"/> Pricing: negotiated quotes (demand/supply)</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5"/> Liquidity: exits depend on counterparty interest</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Benefits vs Risks */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-[#131740] border border-white/10 rounded-2xl p-6">
                            <h3 className="font-heading text-xl font-semibold mb-3 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#09ffec]"/>Key Benefits</h3>
                            <ul className="space-y-2 text-slate-300">
                                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5"/> Early access to promising companies (pre-IPO)</li>
                                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5"/> Potential valuation upside post listing/events</li>
                                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5"/> Diversification beyond public markets</li>
                            </ul>
                        </div>
                        <div className="bg-[#131740] border border-white/10 rounded-2xl p-6">
                            <h3 className="font-heading text-xl font-semibold mb-3 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-rose-400"/>Risks & Considerations</h3>
                            <ul className="space-y-2 text-slate-300">
                                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5"/> Lower liquidity; exits may take time/discounts</li>
                                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5"/> Fewer disclosures; diligence is essential</li>
                                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5"/> Negotiated prices; spreads can be wide</li>
                            </ul>
                        </div>
                    </div>

                </section>

                {/* How it works details */}
                {/* <section className="container mx-auto px-4 py-12 md:py-16">
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="bg-[#131740] border border-white/10 rounded-2xl p-6">
                            <h3 className="font-heading text-xl font-semibold mb-3 flex items-center gap-2"><Wallet className="w-5 h-5 text-sky-400"/>Pricing & Liquidity</h3>
                            <p className="text-slate-300">Quotes are driven by recent deals, demand-supply, financial performance, and expected listing timelines. Lot sizes vary; partial fills may be possible.</p>
                        </div>
                        <div className="bg-[#131740] border border-white/10 rounded-2xl p-6">
                            <h3 className="font-heading text-xl font-semibold mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-amber-300"/>Settlement & Timelines</h3>
                            <p className="text-slate-300">Most transfers settle T+1 to T+3 depending on RTA/DP workflows. Corporate action lock-ins or ISIN constraints can impact timelines.</p>
                        </div>
                        <div className="bg-[#131740] border border-white/10 rounded-2xl p-6">
                            <h3 className="font-heading text-xl font-semibold mb-3 flex items-center gap-2"><FileText className="w-5 h-5 text-emerald-300"/>Eligibility & Documents</h3>
                            <ul className="space-y-2 text-slate-300 list-disc list-inside">
                                <li>PAN, Aadhaar, and current address proof</li>
                                <li>Active Demat (DP ID & Client ID)</li>
                                <li>Bank proof for payments and refunds</li>
                            </ul>
                        </div>
                    </div>
                </section> */}

                {/* Taxation */}
                {/* <section className="container mx-auto px-4 py-12 md:py-16">
                    <div className="bg-[#131740] border border-white/10 rounded-2xl p-6">
                        <h3 className="font-heading text-xl font-semibold mb-3">Taxation Overview (Indicative)</h3>
                        <p className="text-slate-300">For unlisted equity, holding period above 24 months is typically classified as Long-Term. LTCG and STCG rates and indexation rules may apply as per prevailing regulations. Please consult your tax advisor—this is not tax advice.</p>
                    </div>
                </section> */}

                {/* FAQ */}
                <section className="container mx-auto px-4 py-12 md:py-16">
                    <div className="grid lg:grid-cols-2 gap-6">
                        <div>
                            <h2 className="font-heading text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
                            <p className="text-slate-300 mb-6">Answers to the most common questions about buying and selling unlisted shares.</p>
                        </div>
                        <div className="space-y-3">
                            {[
                                {q:'How is the price of an unlisted share decided?', a:'Prices are discovered via negotiated quotes based on recent deals, demand/supply, company performance, and expected listing timelines.'},
                                {q:'What is the typical settlement time?', a:'T+1 to T+3 in most cases, depending on the transfer agent and DP. Certain operational constraints can extend timelines.'},
                                {q:'Are unlisted shares riskier than listed ones?', a:'They can be due to lower liquidity and fewer disclosures. Diversify appropriately and do adequate diligence.'},
                                {q:'What documents do I need?', a:'Standard KYC (PAN, Aadhaar, address), Demat details, and bank proof. Additional documents may be requested by counterparties.'},
                                {q:'Can I sell anytime?', a:'Liquidity depends on demand. Exit timelines may vary, and you may need to accept discounts versus indicated offers.'},
                                {q:'Do corporate actions affect my holdings?', a:'Yes. Corporate actions, lock-ins, and ISIN changes can affect transferability and timelines.'},
                            ].map((item, idx) => (
                                <details key={idx} className="group rounded-xl border border-white/10 bg-[#131740] open:bg-[#141a4a] transition-colors">
                                    <summary className="cursor-pointer list-none px-4 py-3 font-medium flex items-center justify-between">
                                        <span>{item.q}</span>
                                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▾</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-slate-300">{item.a}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Search and Shares Section */}
                <section id="browse" className="container mx-auto px-4 py-12 bg-[#0D0C34]">
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
                                className="w-full p-4 pl-12 rounded-xl border border-white/10 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/20 bg-[#131740] text-white placeholder-slate-400 transition-all duration-300"
                            />
                            <svg
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
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
                                        className="bg-[#131740] rounded-2xl border border-white/10 shadow-sm overflow-hidden transform transition-all hover:-translate-y-0.5 hover:shadow-lg duration-300"
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
                                                        <div className="w-[60px] h-[60px] bg-blue-100 rounded-lg flex items-center justify-center">
                                                            <span className="text-blue-700 text-xl font-bold">
                                                                {share.title.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <h3 className="font-heading font-semibold text-lg mb-2 text-white line-clamp-2">{share.title}</h3>
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
                                        className="px-8 py-4 bg-[#09ffec] hover:bg-[#09ffec]/90 text-[#0D0C34] font-semibold rounded-xl shadow-sm transition-all duration-300"
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