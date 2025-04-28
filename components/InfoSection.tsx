"use client";
import { motion } from 'framer-motion';

function InfoSection() {
    return (
        <div className="bg-[#0D0C34] py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-gray-400">Launch faster</span>
                    <h2 className="text-5xl font-bold mt-4 mb-6">Build something great</h2>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        We&apos;ve done all the heavy lifting so you don&apos;t have to — get all the
                        data you need to launch and grow your business faster.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default InfoSection