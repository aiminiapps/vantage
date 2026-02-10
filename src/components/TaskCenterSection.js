'use client'
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { BiCoinStack } from "react-icons/bi";

// THEME CONSTANTS
const theme = {
  primary: '#2471a4',    // Deep Ocean Blue
  primaryDark: '#1a5278', // Darker Blue for button depth
  accent: '#38bdf8',     // Light Blue for highlights
  background: '#0B0D14', // Graphite
  cardBg: '#1C2126',     // Slate
  border: '#2A3138'      // Steel
};

export default function TaskCenterSection() {
  return (
    <section 
      className="relative py-20 overflow-hidden" 
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border"
          style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.border,
            boxShadow: `0 30px 60px -20px rgba(0, 0, 0, 0.5)`
          }}
        >
          <div className="relative px-8 sm:px-12 py-16 sm:py-20 text-center">
            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              Ready to Earn <br />
              <span className="text-[#2471a4] inline-block relative">
                Real Rewards?
                {/* Underline decorative */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#2471a4] opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-balance text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Complete simple social tasks, connect with the community, and earn <span className="text-white font-medium">VANT tokens</span> directly to your wallet.
            </motion.p>

            {/* 3D CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mb-12"
            >
              <Link href="/tasks">
                <div className="relative group">
                  {/* Button Depth Layer */}
                  <div className="absolute inset-0 bg-[#1a5278] rounded-xl translate-y-2 rounded-b-xl" />
                  
                  {/* Main Button Surface */}
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 8 }} // Push down effect
                    className={`
                      relative px-10 py-5
                      bg-[#2471a4] hover:bg-[#206694]
                      rounded-xl text-white font-bold text-lg tracking-wide
                      border-t border-[#60a5fa]/30 border-b-0
                      shadow-[0_10px_20px_rgba(36,113,164,0.3)]
                      active:shadow-none active:border-t-0
                      transition-all duration-100 ease-in-out
                      flex items-center gap-3
                    `}
                  >
                    START EARNING
                    <FaArrowRight className="text-[#bae6fd]" />
                  </motion.button>
                </div>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="border-t border-[#2A3138] pt-8 flex flex-wrap justify-center gap-6 sm:gap-12"
            >
              {[
                "Instant Payouts",
                "100% Secure",
                "No Minimum"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2.5 text-gray-500 text-sm font-medium">
                  <FaCheckCircle className="text-[#2471a4]" />
                  {text}
                </div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}