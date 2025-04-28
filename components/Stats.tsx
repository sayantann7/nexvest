"use client";
import { motion } from 'framer-motion';

function Stats() {

    const stats = [
        {
            number: '4,000+',
            label: 'Global customers',
            description: "We've helped over 4,000 amazing global companies."
        },
        {
            number: '2,500+',
            label: 'Global customers',
            description: "We've helped over 4,000 amazing global companies."
        },
        {
            number: '10,000+',
            label: 'Global customers',
            description: "We've helped over 4,000 amazing global companies."
        },
        {
            number: '3,000+',
            label: 'Global customers',
            description: "We've helped over 4,000 amazing global companies."
        }
    ];

    return (
        <div className="bg-[#0D0C34] pt-20 pb-20 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="relative max-w-6xl mx-auto">
                    {/* Top Stats */}
                    <div className="grid grid-cols-2 gap-0 mb-0">
                        {stats.slice(0, 2).map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.5 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-4xl md:text-5xl font-bold text-[#0AFFFF] mb-0"
                                >
                                    {stat.number}
                                </motion.div>
                                <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                                <p className="text-sm text-gray-400">{stat.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Map in center */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative mb-0 w-full flex justify-center items-center"
                    >
                        <img
                            src="/map.png"
                            alt="India Map"
                            className="w-1/2 h-1/2 object-contain mx-auto my-0 p-0 min-w-[300px] min-h-[300px] max-w-[500px] max-h-[500px]"
                        />
                    </motion.div>

                    {/* Bottom Stats */}
                    <div className="grid grid-cols-2 gap-8">
                        {stats.slice(2, 4).map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: (index + 2) * 0.1 }}
                                className="text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.5 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
                                    className="text-4xl md:text-5xl font-bold text-[#0AFFFF] mb-2"
                                >
                                    {stat.number}
                                </motion.div>
                                <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                                <p className="text-sm text-gray-400">{stat.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats