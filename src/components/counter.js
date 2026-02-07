"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiRefreshCw, FiArrowRight } from "react-icons/fi";
import '../components/fonts.css'

// --- Configuration ---
const MAX_DIGITS = 7;
const DIGIT_HEIGHT = 140; // Taller for curvature
const DIGIT_WIDTH = 90;

// --- Sub-Component: 3D Digit Wheel ---
const DigitWheel = ({ targetDigit }) => {
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  
  // Physics: Heavier mass for mechanical feel
  const springTransition = {
    type: "spring",
    stiffness: 45,
    damping: 15,
    mass: 1.1,
  };

  return (
    <div 
      className="relative overflow-hidden first:rounded-l-xl last:rounded-r-xl bg-[#151515] last:border-0 before:absolute before:top-0 before:right-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent"
      style={{ height: DIGIT_HEIGHT, width: DIGIT_WIDTH }}
    >
      {/* Moving Number Strip */}
      <motion.div
        initial={false}
        animate={{ y: -1 * parseInt(targetDigit) * DIGIT_HEIGHT }}
        transition={springTransition}
        className="absolute left-0 top-0 w-full flex flex-col items-center cursor-grab active:cursor-grabbing"
      >
        {numbers.map((num) => (
          <div
            key={num}
            style={{ height: DIGIT_HEIGHT }}
            className="flex w-full items-center justify-center"
          >
            {/* Number with Text Shadow for Emboss Effect */}
            <span 
                className="text-8xl font-bold lexend text-[#e5e5e5] tracking-tighter select-none"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
            >
              {num}
            </span>
          </div>
        ))}
      </motion.div>

      {/* --- 3D LIGHTING ENGINE --- */}
      
      {/* 1. Cylinder Curvature Shadows (The "Roundness") */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between">
        <div className="h-1/3 bg-gradient-to-b from-black via-black/90 to-transparent"></div>
        <div className="h-1/3 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
      </div>

      {/* 2. Specular Highlight (The "Shine") */}
      {/* This creates the illusion of a light source hitting the center of the cylinder */}
      <div className="pointer-events-none absolute top-[40%] left-0 right-0 h-16 bg-gradient-to-b from-white/5 to-transparent opacity-30 z-10 blur-sm"></div>

      {/* 3. Side Vignette (Depth separation between wheels) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/50 to-transparent z-20"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-black/50 to-transparent z-20"></div>

    </div>
  );
};

// --- Main Component: Housing ---
const ThreeDCounter = ({ value }) => {
  const cleanValue = String(value).replace(/\D/g, "");
  const paddedValue = cleanValue.padStart(MAX_DIGITS, "0").slice(-MAX_DIGITS);
  const digits = paddedValue.split("");

  return (
    // Outer Shell (Adaptive Light/Dark)
    <div className="relative p-3 rounded-[3rem]
      bg-neutral-100 dark:bg-[#1a1a1a] 
      shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2),inset_0_-4px_6px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.8)] 
      dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5),inset_0_-2px_4px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)]
      transition-colors duration-500"
    >
      
      {/* Inner Black Bezel (The Screen) */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-black ring-4 ring-black/10 dark:ring-black/50 shadow-[inset_0_10px_20px_rgba(0,0,0,1)]">
        
        {/* Wheels Container */}
        <div className="flex items-center justify-center px-6 py-4 bg-[#080808]">
            {digits.map((digit, index) => (
              <DigitWheel key={index} targetDigit={digit} />
            ))}
        </div>

        {/* --- GLASS COVER EFFECTS --- */}

        {/* 1. Top Glass Reflection (Sharp) */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 rounded-t-[2.5rem] bg-gradient-to-b from-white/10 to-transparent opacity-60 z-40"></div>
        
        {/* 2. Inner Rim Shadow (Depth) */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_40px_rgba(0,0,0,1)] z-50 ring-1 ring-white/5"></div>
        
        {/* 3. Dust/Scratch Texture (Subtle realism) */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-40"></div>
      </div>
    </div>
  );
};


// --- Page Implementation ---
const CounterDemoPage = () => {
  const [displayValue, setDisplayValue] = useState("0021599");
  const [inputValue, setInputValue] = useState("0021599");

  const handleUpdate = (e) => {
    e?.preventDefault();
    setDisplayValue(inputValue);
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, MAX_DIGITS);
    setInputValue(val);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 font-sans overflow-hidden
      bg-[#f4f4f5] text-neutral-900 
      dark:bg-[#050505] dark:text-neutral-100
      transition-colors duration-500"
    >
      
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 pointer-events-none mix-blend-multiply dark:mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Ambient Glows */}
      <div className="absolute opacity-50 top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute opacity-50 bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-16 w-full max-w-4xl">
        
        {/* THE COUNTER */}
        <div className="scale-50 sm:scale-75 md:scale-90 lg:scale-100 transition-transform duration-700 ease-out">
            <ThreeDCounter value={displayValue} />
        </div>

        {/* CONTROLS */}
        <div className="w-full max-w-sm flex flex-col gap-4">
            
            {/* Input Bar */}
            <form 
              onSubmit={handleUpdate}
              className="group relative flex items-center p-1.5 rounded-2xl transition-all duration-300
                bg-white border border-neutral-200 shadow-sm hover:shadow-md
                dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20"
            >
                <div className="pl-4 pr-2 text-xs font-mono uppercase tracking-widest text-neutral-400 select-none">
                    Value
                </div>
                
                <input
                    type="text"
                    inputMode="numeric"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent border-none outline-none font-mono text-lg h-10 tracking-widest text-center
                      text-neutral-800 placeholder-neutral-300
                      dark:text-white dark:placeholder-neutral-600"
                    placeholder="0000000"
                />

                <button 
                    type="submit"
                    className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95
                      bg-neutral-100 text-neutral-600 hover:bg-neutral-200
                      dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                >
                    <FiArrowRight />
                </button>
            </form>

            {/* Random Button */}
            <div className="flex justify-center">
                 <button 
                    onClick={() => {
                        const randomVal = Math.floor(Math.random() * 9999999).toString();
                        setInputValue(randomVal);
                        setDisplayValue(randomVal);
                    }}
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all active:scale-95
                      text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/50
                      dark:text-neutral-500 dark:hover:text-white dark:hover:bg-white/5"
                >
                    <FiRefreshCw className="text-neutral-400 group-hover:rotate-180 transition-transform" />
                    <span>Randomize</span>
                </button>
            </div>
        </div>

      </div>
      
    </main>
  );
};

export default CounterDemoPage;