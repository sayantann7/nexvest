"use client";
import { motion } from 'framer-motion';

function InfoSection() {
    return (
        <section className="bg-[#0D0C34] py-16">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 text-white">Trusted. Powerful. Honest.</h2>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">We blend trust, technology and transparency to help your investments
                        thrive. Trusted Capital — SEBI-compliant and transparent reporting. Powerful Tools — Algorithmic trading +
                        analytics for Indian markets. Honest Advisory — Integrated financial & CA services under one roof.</p>
                </motion.div>
            </div>
        </section>
    )
}

export default InfoSection