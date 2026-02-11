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
  background: '#111315', // Graphite
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
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2471a4]/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Driven by Data. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2471a4] via-[#38bdf8] to-white">
              Governed by You.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            AFRD holders are decision-makers. Through the Alfredo DAO, the community shapes product upgrades, AI model improvements, and future partnerships.
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
          <div className="relative rounded-3xl border bg-[#1C2126] p-8 sm:p-12 overflow-hidden text-center shadow-2xl"
             style={{ borderColor: theme.border }}
          >
            {/* Background Glow inside card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#2471a4]/5 to-transparent pointer-events-none" />

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              
              {/* Documentation Button (Primary 3D) */}
              <a href="https://alfredoai.gitbook.io/alfredoai-docs/" target="_blank" rel="noopener noreferrer">
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
              <a href="https://x.com/AI_UR_Alfredo" target="_blank" rel="noopener noreferrer">
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

            {/* Status Badge */}
            <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111315] border border-[#2A3138]">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38bdf8]"></span>
              </div>
              <span className="text-xs font-medium text-gray-400">DAO Governance Launching Soon</span>
            </div>

          </div>
        </motion.div>
        </div>
    </section>
  );
}