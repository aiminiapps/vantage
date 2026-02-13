'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { FaEthereum, FaChevronDown } from 'react-icons/fa';
import { SiSolana, SiBinance, SiPolygon } from 'react-icons/si';
import { TbHexagonLetterA, TbHexagonLetterB } from 'react-icons/tb';
import { HiSparkles } from 'react-icons/hi';
import { IoWalletOutline } from "react-icons/io5";
import PrismaticBurst from './ui/PrismaticBurst';

export default function Hero() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState({
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: FaEthereum,
    color: '#627EEA'
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const networks = [
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: FaEthereum, color: '#627EEA' },
    { id: 'bsc', name: 'BNB Smart Chain', symbol: 'BSC', icon: SiBinance, color: '#F3BA2F' },
    { id: 'solana', name: 'Solana', symbol: 'SOL', icon: SiSolana, color: '#14F195' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC', icon: SiPolygon, color: '#8247E5' },
    { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB', icon: TbHexagonLetterA, color: '#28A0F0' },
    { id: 'base', name: 'Base', symbol: 'BASE', icon: TbHexagonLetterB, color: '#0052FF' }
  ];

  const handleAnalyze = () => {
    if (!walletAddress.trim()) {
      alert('Please enter a wallet address');
      return;
    }
    setIsLoading(true);
    router.push(`/ai?wallet=${encodeURIComponent(walletAddress)}&network=${selectedNetwork.id}`);
  };

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    setIsDropdownOpen(false);
  };

  return (
    // THEME: Primary Background #111315
    <div className="relative min-h-screen bg-[#111315] overflow-hidden selection:bg-[#2471a4] selection:text-white">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-60 pointer-events-none">
         <PrismaticBurst
    animationType="rotate3d"
    intensity={2}
    speed={0.5}
    distort={0}
    paused={false}
    offset={{ x: 0, y: 0 }}
    hoverDampness={0.25}
    rayCount={0}
    mixBlendMode="lighten"
    colors={['#ff007a', '#4d3dff', '#ffffff']}
    color0=""
    color1=""
    color2=""
/>
        {/* Subtle Grid overlay for 'Technical/Graphite' feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A3138_1px,transparent_1px),linear-gradient(to_bottom,#2A3138_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 md:px-6 pt-10">
        
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 sm:mt-0 mt-28"
        >
          <div className="hidden items-center gap-2 px-3 py-1 rounded-full bg-[#2471a4]/10 border border-[#2471a4]/20 mb-6 backdrop-blur-sm">
             <div className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2471a4]"></span>
             </div>
             <span className="text-xs text-[#2471a4] font-bold tracking-wide uppercase">Live Market Intelligence</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            See the Market From
            <br />
            <span className="text-[#2471a4]">A Higher Perspective</span>
          </h1>

          <p className="text-base md:text-xl text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
           VANTAGE analyzes on-chain activity and market signals to deliver strategic intelligence, actionable insights, and real alpha powered by advanced AI.
          </p>
        </motion.div>

        {/* Main Card Section */}  
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-3xl"
        >
          {/* THEME: CardsElevated SurfaceSlate Deep #1C2126 */}
          {/* THEME: BorderSoft Steel #2A3138 */}
          <div className="relative bg-[#1C2126] rounded-3xl border border-[#2A3138] p-4 md:p-5 shadow-[0_0_50px_-12px_rgba(36,113,164,0.15)]">
            
            <div className="flex flex-col md:flex-row gap-4">
              
              {/* Wallet Input */}
              <div className="flex-1 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#2471a4] transition-colors">
                    <IoWalletOutline className="text-xl" />
                </div>
                {/* THEME: Secondary SurfaceCarbon #161A1D */}
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                  placeholder="Paste wallet address..."
                  className="w-full pl-12 pr-6 py-4 bg-[#161A1D] border border-[#2A3138] rounded-xl text-white placeholder-[#586069] focus:border-[#2471a4] focus:outline-none focus:ring-1 focus:ring-[#2471a4] transition-all text-base"
                />
              </div>

              {/* Network Dropdown */}
              <div className="relative md:w-48 z-20">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-4 bg-[#161A1D] border border-[#2A3138] rounded-xl flex items-center justify-between gap-3 hover:border-[#586069] focus:border-[#2471a4] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#111315] border border-[#2A3138]">
                        <selectedNetwork.icon style={{ color: selectedNetwork.color }} className="text-sm" />
                    </div>
                    <span className="text-white font-medium text-sm">{selectedNetwork.symbol}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-[#586069] text-xs" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      className="absolute top-full mt-2 w-full bg-[#1C2126] border border-[#2A3138] rounded-xl overflow-hidden shadow-xl z-50"
                    >
                      {networks.map((network) => (
                        <motion.button
                          key={network.id}
                          whileHover={{ backgroundColor: '#2A3138' }}
                          onClick={() => handleNetworkSelect(network)}
                          className="w-full px-4 py-3 flex items-center gap-3 text-left border-b border-[#2A3138] last:border-b-0 transition-colors"
                        >
                          <network.icon style={{ color: network.color }} className="text-lg" />
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">{network.name}</div>
                          </div>
                          {selectedNetwork.id === network.id && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2471a4]" />
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* =============================================
                3D BUTTON IMPLEMENTATION 
                =============================================
              */}
              <div className="relative group">
                {/* Button Shadow/Depth Layer (The part that stays behind) */}
                <div className="absolute inset-0 bg-[#1a5278] rounded-xl translate-y-1.5 rounded-b-xl" />
                
                {/* The Main Button Face */}
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 4 }}
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className={`
                    relative w-full md:w-auto px-8 py-4 
                    bg-[#2471a4] hover:bg-[#206694] 
                    rounded-xl text-white font-bold text-base 
                    border-t border-[#60a5fa]/30 border-b-4 border-[#1a5278]
                    shadow-[0_10px_20px_rgba(36,113,164,0.3),0_4px_0_#1a5278]
                    active:shadow-none active:border-b-0
                    transition-all duration-100 ease-in-out
                    flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                  `}
                >
                  {/* Subtle shine effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Moving Shine Animation */}
                  <motion.div 
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '200%', opacity: 0.5 }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1 }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  />

                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span className="relative z-10">Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <HiSparkles className="text-xl relative z-10 text-[#bae6fd]" />
                      <span className="relative z-10 text-shadow-sm">Generate</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Feature Tags - Updated for new color palette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            {[
              { text: 'AI Analysis' },
              { text: 'Multi-Chain' },
              { text: 'Real-Time' },
              { text: 'Risk Score' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, backgroundColor: '#2A3138' }}
                className="px-4 py-2 rounded-full bg-[#1C2126] border border-[#2A3138] text-[#9CA3AF] text-sm font-medium hover:text-white hover:border-[#2471a4]/50 transition-all cursor-default"
              >
                {feature.text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}