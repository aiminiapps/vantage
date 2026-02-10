'use client'
import { motion } from 'motion/react';
import { FaExternalLinkAlt, FaFileAlt, FaCoins, FaLock, FaFire, FaShieldAlt } from 'react-icons/fa';
import { BiNetworkChart, BiPieChartAlt2 } from 'react-icons/bi';
import { RiOrganizationChart } from "react-icons/ri";

// THEME CONSTANTS
const theme = {
  primary: '#2471a4',    // Deep Ocean Blue
  secondary: '#38bdf8',  // Sky Blue
  background: '#0B0D14', // Graphite
  cardBg: '#1C2126',     // Slate
  border: '#2A3138'      // Steel
};

export default function TokenomicsSection() {
  const allocationData = [
    { 
      category: 'Ecosystem & Rewards', 
      allocation: '25%', 
      vesting: '36 months',
      color: '#2471a4', // Primary Blue
      description: 'Community rewards and ecosystem growth'
    },
    { 
      category: 'Development & Research', 
      allocation: '20%', 
      vesting: '48 months',
      color: '#06b6d4', // Cyan
      description: 'AI development and platform innovation'
    },
    { 
      category: 'Private / Partners', 
      allocation: '15%', 
      vesting: '24 months',
      color: '#8b5cf6', // Violet
      description: 'Strategic partnerships and early investors'
    },
    { 
      category: 'Public Sale', 
      allocation: '10%', 
      vesting: '12 months',
      color: '#10b981', // Emerald
      description: 'Public distribution and listing'
    },
    { 
      category: 'Team & Advisors', 
      allocation: '15%', 
      vesting: '36 months',
      color: '#94a3b8', // Slate
      description: 'Core team and advisory board'
    },
    { 
      category: 'Liquidity & Exchange', 
      allocation: '10%', 
      vesting: 'Unlocked',
      color: '#6366f1', // Indigo
      description: 'DEX and CEX liquidity pools'
    },
    { 
      category: 'Reserve', 
      allocation: '5%', 
      vesting: 'Locked',
      color: '#f43f5e', // Rose
      description: 'Emergency reserve and future use'
    }
  ];

  const quickFacts = [
    {
      icon: BiNetworkChart,
      label: 'Network',
      value: 'BSC (BEP-20)',
      subValue: 'Fast & Low Cost',
      color: '#F0B90B' // BNB Yellow
    },
    {
      icon: FaCoins,
      label: 'Total Supply',
      value: '1,000,000,000,000',
      subValue: 'Fixed Supply',
      color: '#2471a4'
    },
    {
      icon: FaShieldAlt,
      label: 'Security',
      value: 'Audited',
      subValue: '100% Score',
      color: '#10b981'
    },
    {
      icon: FaFire,
      label: 'Deflationary',
      value: 'Auto-Burn',
      subValue: '1% per tx',
      color: '#f43f5e'
    }
  ];

  return (
    <section 
      id='tokenomics'
      className="relative py-20 sm:py-32 overflow-hidden" 
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Section Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            The Fuel for <br />
            <span className="text-[#2471a4]">Intelligent Finance</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A carefully balanced economic model designed for long-term sustainability, rewarding holders while funding continuous AI innovation.
          </p>
        </motion.div>

        {/* --- Quick Facts Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickFacts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group p-6 rounded-2xl border bg-[#1C2126] transition-all duration-300"
              style={{ borderColor: theme.border }}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2471a4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#111315] border border-[#2A3138] flex items-center justify-center">
                    <fact.icon className="text-xl" style={{ color: fact.color }} />
                  </div>
                  <span className="text-xs font-mono text-gray-500 uppercase">{fact.label}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{fact.value}</div>
                <div className="text-sm font-medium" style={{ color: fact.color }}>{fact.subValue}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Allocation Ledger --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border overflow-hidden bg-[#1C2126] shadow-2xl relative"
          style={{ borderColor: theme.border }}
        >
          {/* Top Bar Decoration */}
          <div className="h-1 w-full bg-gradient-to-r from-[#2471a4] via-[#38bdf8] to-[#2471a4]" />

          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-8 py-4 bg-[#161A1D] border-b border-[#2A3138] text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-5">Category / Purpose</div>
            <div className="col-span-2 text-center">Allocation</div>
            <div className="col-span-2 text-center">Vesting</div>
            <div className="col-span-3 text-right">Distribution</div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-[#2A3138]">
            {allocationData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-6 sm:px-8 py-5 items-center group hover:bg-[#161A1D]/50 transition-colors"
              >
                
                {/* Category */}
                <div className="col-span-1 sm:col-span-5 flex items-center gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111315] border border-[#2A3138]">
                      <RiOrganizationChart className="text-[#2471a4]" />
                    </div>
                    {/* Color Dot */}
                    <div 
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#1C2126]"
                      style={{ backgroundColor: item.color }} 
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm sm:text-base">{item.category}</h4>
                    <p className="text-gray-500 text-xs">{item.description}</p>
                  </div>
                </div>

                {/* Allocation (Mobile Row) */}
                <div className="col-span-1 sm:col-span-2 flex sm:justify-center items-center gap-2 sm:gap-0">
                  <span className="text-gray-500 text-xs sm:hidden">Allocation:</span>
                  <span className="text-white font-mono font-bold">{item.allocation}</span>
                </div>

                {/* Vesting (Mobile Row) */}
                <div className="col-span-1 sm:col-span-2 flex sm:justify-center items-center gap-2 sm:gap-0">
                  <span className="text-gray-500 text-xs sm:hidden">Vesting:</span>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#111315] border border-[#2A3138]">
                    <FaLock className="text-[10px] text-gray-500" />
                    <span className="text-xs text-gray-400">{item.vesting}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="col-span-1 sm:col-span-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-[#111315] rounded-full overflow-hidden border border-[#2A3138]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.allocation }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                        className="h-full rounded-full relative"
                        style={{ backgroundColor: item.color }}
                      >
                         <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- Action Buttons (3D Style) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16"
        >
          {/* External Link Button */}
          <a href="https://bscscan.com/token/0x6699ac45E9a93E3CA6850A07800e6508Bb25103e" target="_blank" rel="noopener noreferrer">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#1a5278] rounded-xl translate-y-1.5 rounded-b-xl" />
              <button className="
                relative px-8 py-4 
                bg-[#2471a4] hover:bg-[#206694]
                rounded-xl text-white font-bold text-sm tracking-wide
                border-t border-[#60a5fa]/30 border-b-0
                shadow-[0_10px_20px_rgba(36,113,164,0.3)]
                active:shadow-none active:translate-y-1.5
                transition-all duration-100 ease-in-out
                flex items-center gap-2
              ">
                <FaExternalLinkAlt />
                <span>View on BscScan</span>
              </button>
            </div>
          </a>

          {/* Doc Button (Outline 3D) */}
          <a href="https://vantage-ai.gitbook.io/vantage-ai-docs/" target="_blank" rel="noopener noreferrer">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#2A3138] rounded-xl translate-y-1.5 rounded-b-xl" />
              <button className="
                relative px-8 py-4 
                bg-[#161A1D] hover:bg-[#1C2126]
                rounded-xl text-white font-bold text-sm tracking-wide
                border border-[#2A3138] border-b-0
                active:shadow-none active:translate-y-1.5
                transition-all duration-100 ease-in-out
                flex items-center gap-2
              ">
                <FaFileAlt className="text-gray-400" />
                <span>Documentation</span>
              </button>
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  );
}