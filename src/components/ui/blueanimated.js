import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConnectButtonSimulation = () => {
  const [stage, setStage] = useState(0);
  
  useEffect(() => {
    const stages = [
      { duration: 2000, next: 1 }, // Initial state
      { duration: 1000, next: 2 }, // Connecting
      { duration: 2500, next: 3 }, // Connected
      { duration: 800, next: 0 },  // Disconnecting
    ];
    
    const timer = setTimeout(() => {
      setStage(stages[stage].next);
    }, stages[stage].duration);
    
    return () => clearTimeout(timer);
  }, [stage]);

  const stageConfig = {
    0: { text: 'Connect Wallet', icon: null },
    1: { text: 'Connecting...', icon: 'loading' },
    2: { text: 'Connected', icon: 'check' },
    3: { text: 'Disconnecting...', icon: 'loading' },
  };

  const config = stageConfig[stage];

  return (
    <div className="relative">
      {/* Pulse rings for connecting state */}
      <AnimatePresence>
        {stage === 1 && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-xl bg-blue-500/30 blur-md"
            />
            <motion.div
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 1.3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
              className="absolute inset-0 rounded-xl bg-blue-400/20 blur-md"
            />
          </>
        )}
      </AnimatePresence>

      {/* Success particle burst */}
      <AnimatePresence>
        {stage === 2 && (
          <div className="absolute inset-0 overflow-visible pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  opacity: 1 
                }}
                animate={{ 
                  x: Math.cos((i * 30) * Math.PI / 180) * 60,
                  y: Math.sin((i * 30) * Math.PI / 180) * 60,
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 1.2,
                  ease: "easeOut",
                  delay: i * 0.03
                }}
                className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        animate={{
          scale: stage === 2 ? [1, 1.05, 1] : 1,
        }}
        transition={{
          scale: {
            duration: 0.3,
            times: [0, 0.5, 1]
          }
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 overflow-hidden"
      >
        {/* Animated shimmer overlay */}
        <motion.div
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Glow effect for connected state */}
        <AnimatePresence>
          {stage === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-blue-400/20 blur-xl"
            />
          )}
        </AnimatePresence>

        <div className="relative flex items-center justify-center gap-2">
          {/* Icon animations */}
          <AnimatePresence mode="wait">
            {config.icon === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  opacity: { duration: 0.2 },
                  rotate: { duration: 1, repeat: Infinity, ease: "linear" }
                }}
                className="w-5 h-5"
              >
                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </motion.div>
            )}

            {config.icon === 'check' && (
              <motion.svg
                key="check"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Button text */}
          <motion.span
            key={config.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {config.text}
          </motion.span>
        </div>
      </motion.button>
    </div>
  );
};

const ConnecttoPlay = () => {
  return (
    <div className="flex-1 flex items-center justify-center md:justify-start">
      {/* Simulated App Window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
        className="w-full max-w-md bg-[#0B0D14] border border-[#2A3138] rounded-xl p-6 shadow-2xl relative overflow-hidden"
      >
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        />

        {/* Header dots */}
        <div className="flex gap-2 mb-8 relative z-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              className="w-3 h-3 rounded-full bg-blue-500/50"
            />
          ))}
        </div>

        {/* Connect Button Animation Loop */}
        <div className="flex flex-col items-center justify-center py-4 relative z-10">
          <ConnectButtonSimulation />
        </div>

        {/* Background Grid inside card */}
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '24px 24px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none"
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 30, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
              className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full blur-sm"
              style={{
                left: `${20 + i * 15}%`,
                bottom: '0'
              }}
            />
          ))}
        </div>

        {/* Border glow effect */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-xl border border-blue-500/20 pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

export default ConnecttoPlay;