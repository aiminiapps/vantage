'use client'
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { 
  BiBarChartAlt2, 
  BiPieChartAlt2, 
  BiWallet, 
  BiCog, 
  BiSearch, 
  BiBell,
  BiTrendingUp,
  BiTrendingDown,
  BiRadar 
} from 'react-icons/bi';
import { RiCpuLine } from "react-icons/ri";

// THEME CONSTANTS
const theme = {
  primary: '#2471a4',    // Steel Blue
  primaryGlow: 'rgba(36, 113, 164, 0.4)',
  bg: '#111315',         // Graphite
  surface: '#1C2126',    // Slate
  border: '#2A3138',     // Steel Border
  success: '#10B981',
  danger: '#EF4444'
};

export default function DashboardShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle 3D Tilt Effect
  const rotateX = useTransform(scrollYProgress, [0.1, 0.5], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-fit bg-[#0B0D14] py-20 overflow-hidden flex flex-col items-center" 
    >

      {/* --- Header Content --- */}
      <div className="relative z-10 text-center mb-12 max-w-3xl px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl text-blanced font-bold text-white mb-4 tracking-tight"
        >
          Institutional Grade <span className="text-[#2471a4] block">Command Center</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm text-blanced md:text-base max-w-xl mx-auto"
        >
          Execute trades, analyze on-chain volume, and track wallet movements in one unified interface.
        </motion.p>
      </div>

      {/* --- Dashboard Container --- */}
      <motion.div
        style={{ rotateX, scale, opacity, perspective: 1200 }}
        className="relative z-20 w-full max-w-6xl px-4"
      >
        {/* Glow Underneath */}
        <div className="absolute -inset-4 bg-[#2471a4]/20 blur-[60px] rounded-[30px] -z-10" />

        {/* --- Main Dashboard Window --- */}
        <div className="relative w-full rounded-xl bg-[#0e1012] border border-[#2A3138] shadow-2xl overflow-hidden flex flex-col">
          
          {/* Top Navigation Bar */}
          <div className="h-12 border-b border-[#2A3138] bg-[#161A1D] flex items-center justify-between px-4">
            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <div className="h-4 w-[1px] bg-[#2A3138] mx-2" />
              <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                <BiSearch />
                <span>search_assets...</span>
              </div>
            </div>
            
            {/* Right Status */}
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-2 py-1 bg-[#2471a4]/10 rounded border border-[#2471a4]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2471a4] animate-pulse" />
                  <span className="text-[10px] text-[#2471a4] font-bold">ETH MAINNET</span>
               </div>
               <BiBell className="text-gray-500" />
               <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#2471a4] to-cyan-400" />
            </div>
          </div>

          {/* Main Content Area (Grid) */}
          <div className="flex h-[500px] md:h-[600px]">
            
            {/* 1. Sidebar */}
            <div className="w-16 border-r border-[#2A3138] bg-[#111315] flex flex-col items-center py-6 gap-6">
              <SidebarIcon icon={BiBarChartAlt2} active />
              <SidebarIcon icon={BiPieChartAlt2} />
              <SidebarIcon icon={BiWallet} />
              <div className="flex-1" />
              <SidebarIcon icon={BiCog} />
            </div>

            {/* 2. Center Panel: Chart & Stats */}
            <div className="flex-1 flex flex-col bg-[#111315] relative">
              
              {/* Asset Header */}
              <div className="h-16 border-b border-[#2A3138] flex items-center justify-between px-6 bg-[#111315]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold text-lg">ETH/USD</h3>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">PERP</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-white font-mono">$3,421.50</span>
                    <span className="text-[#10B981] flex items-center"><BiTrendingUp /> +2.4%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                   {['1H', '4H', '1D', '1W'].map((t, i) => (
                     <button key={t} className={`text-xs px-3 py-1 rounded transition-colors ${i===1 ? 'bg-[#2A3138] text-white' : 'text-gray-500 hover:text-white'}`}>{t}</button>
                   ))}
                </div>
              </div>

              {/* Chart Visualization */}
              <div className="flex-1 relative p-6 overflow-hidden">
                <GridLines />
                <PriceChart />
                
                {/* Floating "AI Signal" Tag */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute top-10 right-10 bg-[#1C2126]/90 backdrop-blur border border-[#2471a4] px-4 py-3 rounded-lg shadow-xl z-10"
                >
                   <div className="flex items-center gap-2 mb-1">
                      <BiRadar className="text-[#2471a4] animate-pulse" />
                      <span className="text-[10px] text-[#2471a4] font-bold uppercase">AI Signal Detected</span>
                   </div>
                   <div className="text-white font-bold text-sm">Bullish Divergence</div>
                   <div className="text-gray-400 text-[10px]">Confidence: 87%</div>
                </motion.div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="h-12 border-t border-[#2A3138] bg-[#161A1D] flex items-center px-6 gap-8 text-xs text-gray-500">
                <div className="flex gap-2">
                  <span>24h Vol:</span>
                  <span className="text-white">$1.2B</span>
                </div>
                <div className="flex gap-2">
                  <span>Open Interest:</span>
                  <span className="text-white">$450M</span>
                </div>
                <div className="flex gap-2">
                  <span>Funding:</span>
                  <span className="text-[#10B981]">0.01%</span>
                </div>
              </div>

            </div>

            {/* 3. Right Panel: Order Book / Watchlist */}
            <div className="w-64 border-l border-[#2A3138] bg-[#161A1D] hidden md:flex flex-col">
              <div className="h-10 border-b border-[#2A3138] flex items-center px-4 text-xs font-bold text-gray-400">
                MARKET TRADES
              </div>
              
              <div className="flex-1 overflow-hidden p-2 space-y-1">
                 {/* Simulated Trades */}
                 {[...Array(12)].map((_, i) => (
                   <div key={i} className="flex justify-between text-[11px] py-1 px-2 rounded hover:bg-[#2A3138]/50">
                      <span className="text-gray-400">14:2{i}</span>
                      <span className={i % 3 === 0 ? "text-[#EF4444]" : "text-[#10B981]"}>
                        {i % 3 === 0 ? <BiTrendingDown className="inline" /> : <BiTrendingUp className="inline" />} 
                        {Math.floor(Math.random() * 1000)}
                      </span>
                      <span className="text-white font-mono">{(3421 + (Math.random() * 10 - 5)).toFixed(2)}</span>
                   </div>
                 ))}
              </div>

              <div className="p-4 border-t border-[#2A3138] bg-[#111315]">
                 <button className="w-full py-2 rounded bg-[#2471a4] hover:bg-[#1d5c87] text-white text-xs font-bold transition-colors">
                    CONNECT WALLET
                 </button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}

// --- Sub-components for Clean Code ---

function SidebarIcon({ icon: Icon, active }) {
  return (
    <div className={`
      w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer
      ${active 
        ? 'bg-[#2471a4] text-white shadow-[0_0_15px_rgba(36,113,164,0.5)]' 
        : 'text-gray-500 hover:text-white hover:bg-[#2A3138]'}
    `}>
      <Icon className="text-xl" />
    </div>
  );
}

function GridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Horizontal Lines */}
      {[1, 2, 3, 4].map(i => (
        <div key={`h-${i}`} className="absolute w-full h-px bg-[#2A3138]/50" style={{ top: `${i * 20}%` }} />
      ))}
      {/* Vertical Lines */}
      {[1, 2, 3, 4, 5].map(i => (
        <div key={`v-${i}`} className="absolute h-full w-px bg-[#2A3138]/50" style={{ left: `${i * 16.6}%` }} />
      ))}
    </div>
  );
}

function PriceChart() {
  return (
    <div className="relative w-full h-full z-0">
      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2471a4" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#2471a4" stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        {/* Area Fill */}
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M0 80 C 10 75, 20 85, 30 60 S 50 40, 60 50 S 80 20, 100 30 V 100 H 0 Z" 
          fill="url(#blueGradient)" 
        />
        
        {/* Main Line */}
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M0 80 C 10 75, 20 85, 30 60 S 50 40, 60 50 S 80 20, 100 30" 
          fill="none" 
          stroke="#2471a4" 
          strokeWidth="0.8"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}