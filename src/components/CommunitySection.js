'use client'
import { motion } from 'motion/react';
import { useRef } from 'react';
import { FaUsers, FaBook, FaTwitter } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { BiWorld } from 'react-icons/bi';

// THEME CONSTANTS
const theme = {
  primary: '#2471a4',    // Deep Ocean Blue
  secondary: '#38bdf8',  // Sky Blue
  background: '#0B0D14', // Graphite
  cardBg: '#1C2126',     // Slate
  border: '#2A3138',     // Steel
  text: '#9CA3AF'        // Gray
};

export default function CommunitySection() {
  const containerRef = useRef(null);

  return (
    <section 
      ref={containerRef}
      className="relative py-20 sm:py-32 overflow-hidden" 
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Driven by Data, <br />
            <span className="text-[#2471a4]">
              Governed by You.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            VANT holders are decision-makers. Through the VANTAGE DAO, the community shapes product upgrades, AI model improvements, and future partnerships.
          </p>
        </motion.div>

        {/* --- Main Action Card --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              
              {/* Documentation Button (Primary 3D) */}
              <a href="https://vantage-ai.gitbook.io/vantage-ai-docs/" target="_blank" rel="noopener noreferrer">
                <div className="relative group w-full sm:w-auto">
                  <div className="absolute inset-0 bg-[#1a5278] rounded-xl translate-y-1.5 rounded-b-xl" />
                  <button className="
                    relative w-full sm:w-auto px-8 py-4 
                    bg-[#2471a4] hover:bg-[#206694]
                    rounded-xl text-white font-bold text-sm tracking-wide
                    border-t border-[#60a5fa]/30 border-b-0
                    shadow-[0_10px_20px_rgba(36,113,164,0.3)]
                    active:shadow-none active:translate-y-1.5
                    transition-all duration-100 ease-in-out
                    flex items-center justify-center gap-3
                  ">
                    <FaBook className="text-[#bae6fd]" />
                    <span>Read the Docs</span>
                  </button>
                </div>
              </a>

              {/* Twitter Button (Secondary Outline) */}
              <a href="https://x.com/AI_VANT" target="_blank" rel="noopener noreferrer">
                <div className="relative group w-full sm:w-auto">
                  <div className="absolute inset-0 bg-[#2A3138] rounded-xl translate-y-1.5 rounded-b-xl" />
                  <button className="
                    relative w-full sm:w-auto px-8 py-4 
                    bg-[#161A1D] hover:bg-[#1C2126]
                    rounded-xl text-white font-bold text-sm tracking-wide
                    border border-[#2A3138] border-b-0
                    active:shadow-none active:translate-y-1.5
                    transition-all duration-100 ease-in-out
                    flex items-center justify-center gap-3
                  ">
                    <FaTwitter className="text-gray-400 group-hover:text-white transition-colors" />
                    <span>Follow on X</span>
                  </button>
                </div>
              </a>
            </div>
        </motion.div>
        </div>
    </section>
  );
}