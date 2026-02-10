import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CreativeAnimatedOrb = () => {
  return (
    <div className="absolute right-10 bottom-10 md:right-20 md:bottom-[-20px] w-48 h-48">
      {/* Multi-layered pulsing glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.4, 0.8, 0.4],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-[#5227FF]/30 via-[#7c3aed]/20 to-[#5227FF]/30 blur-3xl rounded-full" 
      />
      
      {/* Secondary glow layer */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1], 
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute inset-0 bg-[#818cf8]/20 blur-2xl rounded-full" 
      />

      {/* Orbiting rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-[-10px] border-2 border-[#5227FF]/20 rounded-full" />
      </motion.div>

      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-[-5px] border border-dashed border-[#818cf8]/30 rounded-full" />
      </motion.div>

      {/* Main hexagonal container with rotation */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full border-2 border-[#5227FF]/40 rounded-full border-dashed p-4"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(82, 39, 255, 0.3))'
        }}
      >
        {/* Inner core */}
        <motion.div 
          animate={{ 
            rotate: -360,
            boxShadow: [
              '0 0 20px rgba(82, 39, 255, 0.5)',
              '0 0 40px rgba(82, 39, 255, 0.8)',
              '0 0 20px rgba(82, 39, 255, 0.5)'
            ]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-full h-full border-2 border-[#5227FF]/60 rounded-full flex items-center justify-center bg-gradient-to-br from-[#0B0D14]/95 via-[#1a1625]/90 to-[#0B0D14]/95 backdrop-blur-xl overflow-hidden"
        >
          {/* Animated gradient overlay on image container */}
          <motion.div
            animate={{
              background: [
                'linear-gradient(0deg, rgba(82,39,255,0.1) 0%, transparent 50%, rgba(82,39,255,0.1) 100%)',
                'linear-gradient(180deg, rgba(82,39,255,0.1) 0%, transparent 50%, rgba(82,39,255,0.1) 100%)',
                'linear-gradient(360deg, rgba(82,39,255,0.1) 0%, transparent 50%, rgba(82,39,255,0.1) 100%)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
          
          {/* Image with subtle animation */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              filter: [
                'brightness(1) contrast(1)',
                'brightness(1.1) contrast(1.1)',
                'brightness(1) contrast(1)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image 
              src="/icon.png" 
              alt="AI Brain" 
              width={200} 
              height={200}
              className="relative z-10"
            />
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Energy waves emanating */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute inset-0 border-2 border-[#5227FF]/30 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 2, 2.5],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 4,
            delay: i * 1,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
      {/* Corner accents */}
      {[0, 90, 180, 270].map((rotation) => (
        <motion.div
          key={`accent-${rotation}`}
          className="absolute top-0 left-1/2 w-8 h-8"
          style={{
            transformOrigin: '50% 96px',
            transform: `rotate(${rotation}deg)`
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            delay: rotation / 360,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
        </motion.div>
      ))}
    </div>
  );
};

export default CreativeAnimatedOrb;