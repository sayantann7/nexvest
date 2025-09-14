"use client";
import { motion } from 'framer-motion';
import { ChevronRight, GraduationCap, BookOpen, FileText, Headphones } from 'lucide-react';

function Features() {

    const features = [
        {
            icon: GraduationCap,
            title: 'Private Equity',
            description: 'Fuel high-growth Indian businesses shaping tomorrow.'
        },
        {
            icon: BookOpen,
            title: 'Algorithmic Trading',
            description: 'AI-driven execution designed for the Indian market.'
        },
        {
            icon: FileText,
            title: 'Mutual Funds',
            description: 'Curated investment products for every Indian investor.'
        },
        {
            icon: Headphones,
            title: 'Advisory & CA Services',
            description: 'Integrated tax, compliance and strategy for the economy.'
        }
    ];

    return (
        <section className="bg-[#0D0C34] py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="text-[#0AFFFF]/80 text-sm tracking-widest font-medium">WHY CHOOSE US</span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 text-white">Capital for a New India</h2>
                    <p className="text-gray-300 mt-3 max-w-2xl mx-auto">Professional tools, research, and support to help you make confident decisions.</p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.07] transition-colors"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#0AFFFF]/15 flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-[#0AFFFF]" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{feature.description}</p>
                            <motion.a
                                href="#"
                                className="inline-flex items-center gap-2 text-[#0AFFFF] mt-4 text-sm"
                                whileHover={{ x: 4 }}
                            >
                                <span>Learn more</span>
                                <ChevronRight className="w-4 h-4" />
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features