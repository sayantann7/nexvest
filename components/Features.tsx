"use client";
import { motion } from 'framer-motion';
import { ChevronRight, GraduationCap, BookOpen, FileText, Headphones } from 'lucide-react';

function Features() {

    const features = [
        {
            icon: GraduationCap,
            title: 'Expert Training',
            description: 'Get comprehensive training from industry experts to master trading strategies and market analysis.'
        },
        {
            icon: BookOpen,
            title: 'Market Research',
            description: 'Access in-depth market research and analysis to make informed trading decisions.'
        },
        {
            icon: FileText,
            title: 'Documentation',
            description: 'Detailed documentation and guides to help you understand every aspect of trading.'
        },
        {
            icon: Headphones,
            title: '24/7 Support',
            description: 'Round-the-clock customer support to assist you with any questions or concerns.'
        }
    ];

    return (
        <div className="bg-[#0D0C34] py-20">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold mb-16 text-center text-white"
                >
                    WHY CHOOSE US
                </motion.h2>

                <div className="grid md:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-[#0D0C34] p-6 rounded-lg border border-[#0AFFFF] hover:border-[#0AFFFF] transition-colors"
                        >
                            <feature.icon className="w-12 h-12 text-[#0AFFFF] mb-4" />
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                            <motion.a
                                href="#"
                                className="inline-flex items-center space-x-2 text-[#0AFFFF] mt-4"
                                whileHover={{ x: 5 }}
                            >
                                <span>View Details</span>
                                <ChevronRight className="w-4 h-4" />
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features