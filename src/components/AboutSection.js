'use client'
import React from 'react';
import { motion } from 'motion/react';
import { FaEthereum, FaBitcoin } from 'react-icons/fa';
import { SiSolana, SiTether } from 'react-icons/si';
import { HiCheck, HiCode, HiLightningBolt } from 'react-icons/hi';

// --- Theme Constants ---
const colors = {
  bg: '#111315',      // Graphite Black
  card: '#1C2126',    // Surface Slate
  cardHighlight: '#232930',
  border: '#2A3138',  // Soft Steel
  primary: '#5227FF', // Electric Blue
  success: '#10B981', // Muted Emerald
  text: '#FFFFFF',
  textMuted: '#9CA3AF'
};

export default function FeaturesGrid() {
  return (
    <section className="py-24 px-4 md:px-6 relative overflow-hidden" style={{ backgroundColor: colors.bg }}>
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="text-sm font-bold tracking-widest text-[#5227FF] uppercase mb-4">
            Integration
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Integrate Alfredo your way. <br />
            <span className="text-[#9CA3AF]">API, Widgets, or Dashboard.</span>
          </h3>
        </motion.div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* --- Card 1: Neural API (Wide) --- */}
        <motion.div 
          className="md:col-span-7 relative h-[400px] rounded-3xl border border-[#2A3138] bg-[#1C2126] overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#5227FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="p-8 md:p-10 relative z-10">
            <h4 className="text-2xl font-bold text-white mb-2">Clean & Simple APIs</h4>
            <p className="text-[#9CA3AF]">Well documented endpoints with full sandbox environment.</p>
          </div>

          {/* Animation: Neural Circuit */}
          <div className="absolute inset-x-0 bottom-0 h-64 flex items-center justify-center">
            {/* The Chip */}
            <div className="relative z-20 bg-[#161A1D] border border-[#2A3138] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
              <HiCode className="text-[#5227FF] text-xl" />
              <span className="text-white font-mono font-bold tracking-wide">ALFREDO_API</span>
            </div>

            {/* Circuit Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              {/* Left Traces */}
              <motion.path 
                d="M 0 50 Q 150 50 200 120" 
                fill="none" stroke="#2A3138" strokeWidth="2" 
              />
              <motion.circle r="3" fill="#5227FF">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 0 50 Q 150 50 200 120" />
              </motion.circle>

              <motion.path 
                d="M 0 200 Q 100 200 200 140" 
                fill="none" stroke="#2A3138" strokeWidth="2" 
              />
               <motion.circle r="3" fill="#5227FF">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 0 200 Q 100 200 200 140" />
              </motion.circle>

              {/* Right Traces */}
              <motion.path 
                d="M 1000 80 Q 800 80 600 120" 
                fill="none" stroke="#2A3138" strokeWidth="2" 
              />
               <motion.circle r="3" fill="#5227FF">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M 1000 80 Q 800 80 600 120" />
              </motion.circle>
            </svg>

            {/* Background Grid for Chip area */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A3138_1px,transparent_1px),linear-gradient(to_bottom,#2A3138_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          </div>
        </motion.div>


        {/* --- Card 2: Developer Dashboard (Tall) --- */}
        <motion.div 
          className="md:col-span-5 relative h-[400px] rounded-3xl border border-[#2A3138] bg-[#1C2126] overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="p-8 relative z-10 bg-[#1C2126]/90 backdrop-blur-sm">
            <h4 className="text-2xl font-bold text-white mb-2">Live Dashboard</h4>
            <p className="text-[#9CA3AF]">Real-time tracking of onchain events.</p>
          </div>

          {/* Animation: Scrolling List */}
          <div className="absolute inset-x-6 top-32 bottom-0 overflow-hidden mask-linear-fade">
             <div className="absolute inset-0 bg-gradient-to-b from-[#1C2126] via-transparent to-[#1C2126] z-20 pointer-events-none" />
             
             <motion.div 
               animate={{ y: [-200, 0] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="flex flex-col gap-3"
             >
                {/* Simulated Transactions duplicated for infinite loop */}
                {[...transactions, ...transactions].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#161A1D] border border-[#2A3138]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#2A3138] text-white">
                        {tx.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{tx.title}</div>
                        <div className="text-xs text-[#9CA3AF]">{tx.sub}</div>
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-md border ${tx.statusColor}`}>
                      {tx.status}
                    </div>
                  </div>
                ))}
             </motion.div>
          </div>
        </motion.div>


        {/* --- Card 3: Checkout Widget (Tall) --- */}
        <motion.div 
          className="md:col-span-5 relative h-[400px] rounded-3xl border border-[#2A3138] bg-[#1C2126] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-8 relative z-10">
            <h4 className="text-2xl font-bold text-white mb-2">Checkout Widget</h4>
            <p className="text-[#9CA3AF]">Embed crypto payments in minutes.</p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pt-16">
            {/* The Widget Mockup */}
            <div className="w-64 bg-[#161A1D] border border-[#2A3138] rounded-2xl p-4 shadow-2xl relative">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-[#9CA3AF]">Pay with</span>
                <span className="w-2 h-2 rounded-full bg-[#5227FF]" />
              </div>
              
              {/* Selected Option */}
              <div className="flex items-center justify-between p-3 bg-[#1C2126] border border-[#5227FF] rounded-xl mb-2 relative overflow-hidden">
                <div className="flex items-center gap-2 relative z-10">
                  <SiSolana className="text-[#14F195]" />
                  <span className="text-white font-medium">Solana</span>
                </div>
                <div className="relative z-10 w-4 h-4 rounded-full border border-[#5227FF] flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#5227FF] rounded-full" />
                </div>
                <motion.div 
                    layoutId="highlight"
                    className="absolute inset-0 bg-[#5227FF]/10" 
                />
              </div>

              {/* Other Options (Floating Animation) */}
              <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center justify-between p-3 bg-[#111315] border border-[#2A3138] rounded-xl opacity-60 scale-95"
              >
                 <div className="flex items-center gap-2">
                  <FaEthereum className="text-[#627EEA]" />
                  <span className="text-[#9CA3AF] font-medium">Ethereum</span>
                </div>
              </motion.div>

              {/* Floating Coins Effect */}
              <motion.div 
                animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-12 h-12 bg-[#1C2126] rounded-full border border-[#2A3138] flex items-center justify-center shadow-lg z-20"
              >
                <FaBitcoin className="text-[#F7931A] text-xl" />
              </motion.div>

               <motion.div 
                animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-10 h-10 bg-[#1C2126] rounded-full border border-[#2A3138] flex items-center justify-center shadow-lg z-20"
              >
                <SiTether className="text-[#26A17B] text-lg" />
              </motion.div>

            </div>
          </div>
        </motion.div>


        {/* --- Card 4: Plug & Play UIs (Wide) --- */}
        <motion.div 
          className="md:col-span-7 relative h-[400px] rounded-3xl border border-[#2A3138] bg-[#1C2126] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 h-full">
            
            {/* Text Side */}
            <div className="md:w-1/2 relative z-10">
              <h4 className="text-2xl font-bold text-white mb-2">Plug & Play UIs</h4>
              <p className="text-[#9CA3AF] mb-6">Pre-built flows to go from zero to live in a day.</p>
              
              <ul className="space-y-3">
                {['Onboarding / KYC', 'Account Details', 'Email Notifications'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-center gap-2 text-sm text-[#9CA3AF]"
                  >
                    <HiCheck className="text-[#5227FF]" /> {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Visual Side: UI Mockup */}
            <div className="flex-1 relative">
                <div className="absolute right-0 top-0 w-full md:w-[120%] h-full bg-[#161A1D] border border-[#2A3138] rounded-tl-2xl p-6 shadow-2xl">
                    {/* Fake Header */}
                    <div className="flex gap-4 mb-6 border-b border-[#2A3138] pb-4">
                        <div className="px-3 py-1 rounded-full bg-[#5227FF]/20 border border-[#5227FF]/50 text-[#5227FF] text-xs font-bold">USD</div>
                        <div className="px-3 py-1 rounded-full bg-[#2A3138] text-[#9CA3AF] text-xs">EUR</div>
                        <div className="px-3 py-1 rounded-full bg-[#2A3138] text-[#9CA3AF] text-xs">GBP</div>
                    </div>

                    {/* Fake Form */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <div className="h-2 w-12 bg-[#2A3138] rounded"/>
                            <div className="h-10 w-full bg-[#111315] rounded border border-[#2A3138] flex items-center px-3">
                                <span className="text-[#5227FF] text-xs">Alfredo User</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="h-2 w-8 bg-[#2A3138] rounded"/>
                            <div className="h-10 w-full bg-[#111315] rounded border border-[#2A3138] flex items-center px-3">
                                <motion.div 
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-0.5 h-4 bg-[#5227FF]"
                                />
                            </div>
                        </div>
                        
                        {/* Toggle Animation */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="h-2 w-24 bg-[#2A3138] rounded"/>
                            <motion.div 
                                animate={{ backgroundColor: ["#2A3138", "#5227FF", "#2A3138"] }}
                                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                className="w-10 h-6 rounded-full p-1 flex items-center"
                            >
                                <motion.div 
                                    animate={{ x: [0, 16, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                    className="w-4 h-4 bg-white rounded-full shadow-sm" 
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

// --- Data for Dashboard Card ---
const transactions = [
  { 
    icon: <SiTether className="text-[#26A17B]" />, 
    title: "USD Deposit (ACH)", 
    sub: "$500,000 from J. Kirk", 
    status: "Credited",
    statusColor: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
  },
  { 
    icon: <FaEthereum className="text-[#627EEA]" />, 
    title: "+5.2 ETH", 
    sub: "from 0x82...92a", 
    status: "Received",
    statusColor: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
  },
  { 
    icon: <HiLightningBolt className="text-[#F59E0B]" />, 
    title: "Execution Fee", 
    sub: "Smart Contract Interaction", 
    status: "Pending",
    statusColor: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
  },
  { 
    icon: <SiSolana className="text-[#14F195]" />, 
    title: "-1,000 USDC", 
    sub: "to x710...810z", 
    status: "Confirming",
    statusColor: "bg-[#9CA3AF]/10 text-[#9CA3AF] border-[#9CA3AF]/20"
  }
];