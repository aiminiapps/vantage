'use client'
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { HiSparkles } from 'react-icons/hi';
import { FaWallet, FaChartLine, FaBrain, FaArrowRight } from 'react-icons/fa';
import { BiLayer } from "react-icons/bi";

// THEME CONSTANTS
const theme = {
  primary: '#2471a4',    // Deep Ocean Blue
  secondary: '#38bdf8',  // Sky Blue
  background: '#0B0D14', // Graphite
  cardBg: '#1C2126',     // Slate
  border: '#2A3138',     // Steel
  text: '#9CA3AF'        // Gray
};

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const features = [
    {
      icon: FaWallet,
      title: 'Universal Wallet Analysis',
      description: 'Connect any address to instantly decode your complete portfolio DNA across EVM & Solana networks.',
      illustration: '/illustrations/wallet.png', 
      color: '#38bdf8' // Sky Blue
    },
    {
      icon: FaChartLine,
      title: 'Market Intelligence',
      description: 'Live predictive modeling and sentiment analysis that helps you spot the next trend before the crowd.',
      illustration: '/illustrations/chart.png',
      color: '#2471a4' // Ocean Blue
    },
    {
      icon: FaBrain,
      title: 'AI Neural Assistant',
      description: 'Your 24/7 quant analyst. Ask complex questions about tokenomics, risk, and strategy in plain English.',
      illustration: '/illustrations/ai.png',
      color: '#818cf8' // Indigo
    }
  ];

  return (
    <section 
      id='features'
      ref={containerRef}
      className="relative py-24 sm:py-32 overflow-hidden" 
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Intelligence at <br />
            <span className="text-[#2471a4]">
              Institutional Scale
            </span>
          </h2>

          <p className="text-base sm:text-lg text-balance text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We combine on-chain forensics with large language models to give you an unfair advantage in the market.
          </p>
        </motion.div>

        {/* --- Feature Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group relative h-full"
            >
              {/* Card Container */}
              <div 
                className="relative h-full rounded-3xl border bg-[#1C2126] overflow-hidden transition-all duration-300 group-hover:border-[#2471a4]/50 group-hover:shadow-[0_0_30px_-10px_rgba(36,113,164,0.3)]"
                style={{ borderColor: theme.border }}
              >
                
                {/* Image Window (Top Half) */}
                <div className="relative h-56 w-full overflow-hidden bg-[#111315] border-b border-[#2A3138] group-hover:border-[#2471a4]/30 transition-colors">
                  {/* Grid Overlay inside image area */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
                  
                  {/* Illustration Placeholder / Image */}
                  <div className="absolute inset-4 rounded-xl border border-[#2A3138] bg-[#161A1D] overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                    <img 
                      src={feature.illustration} 
                      alt={feature.title}
                      className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        // Fallback if image fails - shows a tech icon instead
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `<div class="text-4xl text-[#2471a4] opacity-50"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`;
                      }}
                    />
                    
                    {/* Inner Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Content (Bottom Half) */}
                <div className="p-6 relative">
                  {/* Icon Badge */}
                  <div className="absolute -top-6 left-6 w-12 h-12 rounded-xl bg-[#2471a4] border-2 border-[#1C2126] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-white text-lg" />
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#38bdf8] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    {/* Learn More Link */}
                    <div className="flex items-center gap-2 text-xs font-bold text-[#2471a4] uppercase tracking-wider group-hover:gap-3 transition-all">
                      <span>Explore Feature</span>
                      <FaArrowRight />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Bottom Trust Bar --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-10 border-t border-[#2A3138] flex flex-wrap justify-center gap-8 md:gap-16 opacity-70"
        >
          {['Secure Enclave', 'Real-Time Data', 'EVM Compatible', 'Zero-Log Privacy'].map((item, i) => (
             <div key={i} className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-[#2471a4]" />
               <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">{item}</span>
             </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}