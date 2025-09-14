"use client";
import { motion } from 'framer-motion';

function Stats() {

    const stats = [
        {
            number: '₹500+ Cr',
            label: 'Capital Deployed',
            description: "We've helped over 4,000 amazing global companies."
        },
        {
            number: '25+',
            label: ' High-Growth Companies',
            description: "We've helped over 4,000 amazing global companies."
        },
        {
            number: '15+',
            label: 'Years Combined Expertise',
            description: "We've helped over 4,000 amazing global companies."
        },
    ];

    return (
        <section className="bg-[#0D0C34] py-20 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">Backing India&apos;s Game-Changers</h2>
                    <p className="text-gray-300 mt-3">From fintech to renewable energy, we’ve deployed capital where it matters most.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.06 }}
                            className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-[#0AFFFF]">{stat.number}</div>
                            <div className="text-white font-semibold mt-2">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Stats