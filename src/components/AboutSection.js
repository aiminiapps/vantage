'use client'
import React from 'react';
import { motion } from 'motion/react';
import { FaEthereum, FaBitcoin, FaWallet } from 'react-icons/fa';
import { SiSolana, SiTether } from 'react-icons/si';
import { HiLightningBolt, HiSparkles } from 'react-icons/hi';
import { BiBot, BiCheckCircle } from 'react-icons/bi';
import Image from 'next/image';
import ConnecttoPlay from './ui/blueanimated';
import CreativeAnimatedOrb from './ui/Creativeanimatedorb';

// --- Theme Constants ---
const colors = {
  bg: '#0B0D14',      // Deep Blue/Black
  card: '#151921',    // Slightly lighter blue-grey
  border: '#2A3138',  // Soft Steel
  primary: '#5227FF', // Electric Blue
  success: '#10B981', // Emerald
  warning: '#F59E0B', // Amber
  text: '#FFFFFF',
  textMuted: '#94A3B8'
};

export default function FeaturesGrid() {
  return (
    <section className="py-24 px-4 md:px-6 relative overflow-hidden">
      
      {/* Background: Deep Blue Gradient Mesh */}
      <div className="absolute inset-0 bg-[#0B0D14] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d2333] via-[#0B0D14] to-[#0B0D14]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#5227FF]/10 blur-[120px] rounded-full opacity-40 pointer-events-none" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Everything you need.
          </h3>
        </motion.div>
      </div>

      {/* Grid Layout */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* --- Card 1: AI Powered Intelligence (Wide) --- */}
        <motion.div 
          className="md:col-span-7 relative h-[400px] rounded-3xl border border-[#2A3138] bg-[#151921]/80 backdrop-blur-sm overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="p-8 md:p-10 relative z-10">
            <h4 className="text-2xl font-bold text-white mb-2">AI Powered Intelligence</h4>
            <p className="text-[#94A3B8] max-w-md">Our neural engine continuously scans the blockchain, learning from market patterns to give you predictive insights.</p>
          </div>

          {/* Animation: AI Brain / Data Flow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             {/* Central Core */}
           <CreativeAnimatedOrb />
          </div>
        </motion.div>


        {/* --- Card 2: Live Activity (Tall) --- */}
        <motion.div 
          className="md:col-span-5 relative h-[400px] rounded-3xl border border-[#2A3138] bg-[#151921]/80 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="p-8 relative z-10 bg-gradient-to-b from-[#151921] to-transparent">
            <h4 className="text-2xl font-bold text-white mb-2">Live Monitor</h4>
            <p className="text-[#94A3B8]">Real-time onchain event tracking.</p>
          </div>

          {/* Animation: Infinite Marquee */}
          <div className="absolute inset-x-6 top-32 bottom-0 overflow-hidden mask-linear-fade">
             <motion.div 
               animate={{ y: [-240, 0] }} // Adjusted for smooth loop
               transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
               className="flex flex-col gap-3"
             >
                {[...transactions, ...transactions].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#0B0D14] border border-[#2A3138]/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#2A3138]/50 text-white">
                        {tx.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{tx.title}</div>
                        <div className="text-xs text-[#94A3B8]">{tx.sub}</div>
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-md border ${tx.statusColor}`}>
                      {tx.status}
                    </div>
                  </div>
                ))}
             </motion.div>
             {/* Gradient Overlay for bottom fade */}
             <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#151921] to-transparent" />
          </div>
        </motion.div>


        {/* --- Card 3: Checkout/Token Widget (Tall) --- */}
        <motion.div 
          className="md:col-span-5 relative h-[400px] rounded-3xl border border-[#2A3138] bg-[#151921]/80 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-8 relative z-10">
            <h4 className="text-2xl font-bold text-white mb-2">Multi-Chain</h4>
            <p className="text-[#94A3B8]">Analyze assets across any network.</p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pt-20">
            {/* Widget Container */}
            <div className="w-64 bg-[#0B0D14] border border-[#2A3138] rounded-2xl p-4 shadow-2xl relative transform rotate-[-2deg]">
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#151921] border border-[#2A3138] flex items-center justify-center z-20"><FaBitcoin className="text-[#F59E0B]" /></div>
                    <div className="w-8 h-8 rounded-full bg-[#151921] border border-[#2A3138] flex items-center justify-center z-10"><FaEthereum className="text-[#5227FF]" /></div>
                    <div className="w-8 h-8 rounded-full bg-[#151921] border border-[#2A3138] flex items-center justify-center z-0"><SiSolana className="text-[#10B981]" /></div>
                </div>
                <div className="px-2 py-1 rounded bg-[#5227FF]/10 text-[#5227FF] text-xs font-bold">Active</div>
              </div>

              {/* Selection Box Animation */}
              <div className="space-y-2">
                  <motion.div 
                    animate={{ scale: [1, 1.02, 1], borderColor: ['#2A3138', '#5227FF', '#2A3138'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="p-3 bg-[#151921] border border-[#2A3138] rounded-xl flex justify-between items-center"
                  >
                      <span className="text-sm text-white">Ethereum Mainnet</span>
                      <div className="w-2 h-2 rounded-full bg-[#5227FF] shadow-[0_0_8px_#5227FF]" />
                  </motion.div>
                  <div className="p-3 bg-[#151921] border border-[#2A3138] rounded-xl opacity-50 flex justify-between items-center">
                      <span className="text-sm text-white">Solana</span>
                  </div>
              </div>

              {/* Floating Element */}
               <motion.div 
                animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 w-14 h-14 bg-[#151921] rounded-2xl border border-[#2A3138] flex items-center justify-center shadow-xl z-20"
              >
                <div className="text-center">
                    <div className="text-[10px] text-[#94A3B8]">APY</div>
                    <div className="text-xs font-bold text-[#10B981]">+12%</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>


        {/* --- Card 4: Connect To Play (Wide) --- */}
        <motion.div 
          className="md:col-span-7 relative h-[400px] rounded-3xl border border-[#2A3138] bg-[#151921]/80 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-8 md:p-10 flex flex-col h-full z-10 relative">
            <h4 className="text-2xl font-bold text-white mb-2">Connect to Play</h4>
            <p className="text-[#94A3B8] max-w-sm mb-8">
              No registration forms. Just connect your MetaMask and start exploring immediately.
            </p>
            
            {/* Interaction Area */}
            <div className="flex-1 flex items-center justify-center md:justify-start">
              <ConnecttoPlay/>
            </div>
          </div>
          
          {/* Decorative Fox Tail / Abstract Shape behind */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
             <FaWallet className="text-[200px] text-white transform -rotate-12 translate-x-10 translate-y-10" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// --- Helper Components & Data ---

function ConnectButtonSimulation() {
    return (
        <motion.div
            initial="idle"
            animate="cycle"
            variants={{
                idle: {},
                cycle: { transition: { staggerChildren: 0.2 } }
            }}
            className="relative"
        >
            {/* Container for the loop animation */}
            <motion.div
                animate={{ 
                   scale: [1, 0.95, 1],
                   background: [
                       "linear-gradient(90deg, #E2761B, #F6851B)", // Orange (MetaMask)
                       "linear-gradient(90deg, #2A3138, #2A3138)", // Loading dark
                       "linear-gradient(90deg, #10B981, #059669)", // Green Success
                       "linear-gradient(90deg, #E2761B, #F6851B)"  // Back to Orange
                   ]
                }}
                transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.6, 0.9] }}
                className="w-48 h-12 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden"
            >
                {/* Text / Icon Content Swapping */}
                <div className="absolute inset-0 flex items-center justify-center">
                    
                    {/* Stage 1: Connect */}
                    <motion.div
                        animate={{ opacity: [1, 0, 0, 1] }}
                        transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
                        className="flex items-center gap-2 font-bold text-white"
                    >
                        <FaWallet /> Connect Wallet
                    </motion.div>

                    {/* Stage 2: Loading */}
                    <motion.div
                        animate={{ opacity: [0, 1, 0, 0] }}
                        transition={{ duration: 6, repeat: Infinity, times: [0.1, 0.2, 0.5, 0.6] }}
                        className="absolute"
                    >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </motion.div>

                    {/* Stage 3: Success */}
                    <motion.div
                        animate={{ opacity: [0, 0, 1, 0], y: [10, 10, 0, -10] }}
                        transition={{ duration: 6, repeat: Infinity, times: [0.5, 0.55, 0.6, 0.9] }}
                        className="flex items-center gap-2 font-bold text-white absolute"
                    >
                        <BiCheckCircle className="text-xl" /> Connected
                    </motion.div>

                </div>
            </motion.div>

            {/* Cursor Hand Animation */}
            <motion.div
                animate={{ 
                    x: [20, 0, 0, 100], 
                    y: [20, 0, 0, 100],
                    opacity: [0, 1, 1, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.2, 0.3] }}
                className="absolute top-8 left-24 w-8 h-8 pointer-events-none z-50"
            >
               {/* Simple CSS shape for cursor */}
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 3.5L19 16.5L13.5 17.5L18.5 24.5L15.5 26.5L10.5 19.5L4.5 23.5L5.5 3.5Z" fill="white" stroke="black" strokeWidth="2"/>
                </svg>
            </motion.div>

        </motion.div>
    );
}

const transactions = [
  { 
    icon: <SiTether className="text-[#26A17B]" />, 
    title: "USDT Transfer", 
    sub: "$5,000 to Binance", 
    status: "Sent",
    statusColor: "bg-[#2A3138] text-[#94A3B8] border-[#2A3138]"
  },
  { 
    icon: <FaEthereum className="text-[#5227FF]" />, 
    title: "Uniswap Swap", 
    sub: "0.5 ETH → PEPE", 
    status: "Success",
    statusColor: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
  },
  { 
    icon: <HiLightningBolt className="text-[#F59E0B]" />, 
    title: "Contract Interaction", 
    sub: "Mint NFT #8832", 
    status: "Pending",
    statusColor: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
  },
  { 
    icon: <SiSolana className="text-[#10B981]" />, 
    title: "Solana Stake", 
    sub: "+250 SOL", 
    status: "Staked",
    statusColor: "bg-[#5227FF]/10 text-[#5227FF] border-[#5227FF]/20"
  }
];