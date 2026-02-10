'use client'
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { BiMap, BiRadioCircleMarked, BiCheckCircle, BiLoaderAlt } from 'react-icons/bi';
import { RiRouteLine } from "react-icons/ri";

// THEME CONSTANTS
const theme = {
  primary: '#2471a4',    // Deep Ocean Blue
  secondary: '#38bdf8',  // Sky Blue
  background: '#0B0D14', // Graphite
  cardBg: '#1C2126',     // Slate
  border: '#2A3138',     // Steel
  text: '#9CA3AF'        // Gray
};

export default function RoadmapSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for the background text
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const phases = [
    {
      id: '01',
      title: 'Foundation & AI Core',
      timeframe: 'Q1–Q2 2026',
      status: 'active', // Special animation for current phase
      milestones: [
        'AI Engine V1 Prototype Development',
        'Smart Contract Audits & Deployment (BSC)',
        'Private Beta Access for Early Adopters',
        'Community Formation & Social Launch'
      ]
    },
    {
      id: '02',
      title: 'Public Launch & Expansion',
      timeframe: 'Q3–Q4 2026',
      status: 'upcoming',
      milestones: [
        'Public Beta Release (Open Access)',
        'AFRD Token Generation Event (TGE)',
        'Initial DEX Listings (PancakeSwap)',
        'Governance V1 (Snapshot Voting)'
      ]
    },
    {
      id: '03',
      title: 'Ecosystem Growth',
      timeframe: 'Q1–Q2 2027',
      status: 'upcoming',
      milestones: [
        'AI Prediction Model V2.0 (Neural Update)',
        'Staking Platform Launch (Yield Farming)',
        'Mobile App Beta (iOS & Android)',
        'Developer API SDK Release'
      ]
    },
    {
      id: '04',
      title: 'Decentralization',
      timeframe: 'Q3–Q4 2027',
      status: 'upcoming',
      milestones: [
        'Full DAO Governance Implementation',
        'AI Chat Advisor (Real-time Assistant)',
        'Automated Buyback & Burn Protocol',
        'Cross-Chain Bridge Integration'
      ]
    },
    {
      id: '05',
      title: 'The Singularity',
      timeframe: '2028+',
      status: 'upcoming',
      milestones: [
        'Autonomous Portfolio Management AI',
        'Institutional Analytics Suite',
        'Global Strategic Partnerships',
        'Multi-Chain AI Oracle Services'
      ]
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-20 sm:py-32 overflow-hidden" 
      style={{ backgroundColor: theme.background }}
    >
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Giant Watermark Text */}
        <motion.div 
          style={{ y: yBg }}
          className="absolute top-0 right-0 text-[20vw] font-bold leading-none text-white/5 select-none z-0"
        >
          2026
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-32"
        >          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Roadmap to <br />
            <span className="text-[#2471a4]">
              Intelligent Finance
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl text-lg">
            From prototype to full decentralized AI governance. Alfredo evolves with the market, becoming smarter every cycle.
          </p>
        </motion.div>

        {/* --- Vertical Tech Layout --- */}
        <div className="relative">
          
          {/* The "Data Rail" Line (Desktop: Left side, Mobile: Left side) */}
          <div className="absolute left-[11px] md:left-[26px] top-0 bottom-0 w-px bg-gradient-to-b from-[#2471a4] via-[#2A3138] to-transparent" />

          <div className="space-y-12 md:space-y-24">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12 md:pl-24 group"
              >
                {/* Node Connector Point */}
                <div className="absolute left-[11px] md:left-[27px] top-8 -translate-x-1/2 flex flex-col items-center">
                   {/* The Dot */}
                   <div className={`
                     w-4 h-4 rounded-full border-2 z-10 relative
                     ${phase.status === 'active' 
                       ? 'bg-[#2471a4] border-[#38bdf8] shadow-[0_0_15px_#2471a4]' 
                       : 'bg-[#111315] border-[#2A3138] group-hover:border-[#2471a4] transition-colors'}
                   `}>
                     {phase.status === 'active' && (
                       <span className="absolute inset-0 rounded-full bg-[#2471a4] animate-ping opacity-75" />
                     )}
                   </div>
                   {/* Horizontal Line connecting to card */}
                   <div className="hidden md:block absolute left-full top-1/2 h-px w-16 bg-[#2A3138] group-hover:bg-[#2471a4]/50 transition-colors" />
                </div>

                {/* Content Card */}
                <div className="md:grid md:grid-cols-12 gap-8 items-start">
                  
                  {/* Phase Info (Left Side on Desktop) */}
                  <div className="md:col-span-4 mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-5xl font-bold text-[#2A3138] select-none group-hover:text-[#2471a4]/20 transition-colors">
                         {phase.id}
                       </span>
                       {phase.status === 'active' && (
                         <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2471a4] text-white animate-pulse">
                           IN PROGRESS
                         </span>
                       )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#38bdf8] transition-colors">
                      {phase.title}
                    </h3>
                    <div className="text-[#2471a4] font-mono text-sm font-bold tracking-wide">
                      {phase.timeframe}
                    </div>
                  </div>

                  {/* Milestones Box (Right Side on Desktop) */}
                  <div className="md:col-span-8">
                    <div className={`
                      rounded-2xl border p-6 md:p-8 backdrop-blur-sm transition-all duration-300
                      ${phase.status === 'active' 
                        ? 'bg-[#1C2126] border-[#2471a4] shadow-[0_10px_40px_-10px_rgba(36,113,164,0.2)]' 
                        : 'bg-[#161A1D] border-[#2A3138] hover:border-[#2471a4]/30'}
                    `}>
                      <ul className="space-y-4">
                        {phase.milestones.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            {phase.status === 'active' ? (
                               i === 0 ? <BiLoaderAlt className="text-[#2471a4] mt-1 animate-spin shrink-0" /> : <BiRadioCircleMarked className="text-[#2471a4] mt-1 shrink-0" />
                            ) : (
                               <BiCheckCircle className="text-[#2A3138] mt-1 shrink-0 group-hover:text-[#2471a4]/50 transition-colors" />
                            )}
                            <span className={`text-sm md:text-base ${phase.status === 'active' ? 'text-gray-200' : 'text-gray-400'}`}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}