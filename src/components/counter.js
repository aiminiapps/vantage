"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Configuration ---
const DIGIT_HEIGHT = 140; 
const DIGIT_WIDTH = 90;
const SPRING_TRANSITION = {
    type: "spring",
    stiffness: 45,
    damping: 15,
    mass: 1.1,
};

// --- Sub-Component: 3D Digit Wheel (Unchanged per instructions) ---
const DigitWheel = ({ targetDigit }) => {
    const numbers = Array.from({ length: 10 }, (_, i) => i);

    return (
        <div
            className="relative overflow-hidden bg-[#0B1217] border-r border-white/5 last:border-0 first:rounded-l-xl last:rounded-r-xl"
            style={{ height: DIGIT_HEIGHT, width: DIGIT_WIDTH }}
        >
            <motion.div
                initial={false}
                animate={{ y: -1 * parseInt(targetDigit) * DIGIT_HEIGHT }}
                transition={SPRING_TRANSITION}
                className="absolute left-0 top-0 w-full flex flex-col items-center"
            >
                {numbers.map((num) => (
                    <div
                        key={num}
                        style={{ height: DIGIT_HEIGHT }}
                        className="flex w-full items-center justify-center"
                    >
                        <span
                            className="text-8xl font-bold font-mono text-[#FFFFFF] tracking-tighter select-none"
                            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                        >
                            {num}
                        </span>
                    </div>
                ))}
            </motion.div>
            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between">
                <div className="h-1/3 bg-gradient-to-b from-[#0B1217] via-[#0B1217]/90 to-transparent"></div>
                <div className="h-1/3 bg-gradient-to-t from-[#0B1217] via-[#0B1217]/90 to-transparent"></div>
            </div>
            <div className="pointer-events-none absolute top-[40%] left-0 right-0 h-16 bg-gradient-to-b from-white/5 to-transparent opacity-30 z-10 blur-sm"></div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/50 to-transparent z-20"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-black/50 to-transparent z-20"></div>
        </div>
    );
};

// --- Sub-Component: Counter Block (Unchanged per instructions) ---
const CounterBlock = ({ value, label, digits = 2 }) => {
    const paddedValue = String(value).padStart(digits, "0");
    const digitArray = paddedValue.split("");

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative p-2 rounded-[2rem] bg-[#1A232C] shadow-2xl border border-white/5">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0B1217] ring-2 ring-black/20 shadow-inner">
                    <div className="flex">
                        {digitArray.map((d, i) => (
                            <DigitWheel key={i} targetDigit={d} />
                        ))}
                    </div>
                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent opacity-50 z-40"></div>
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-50 ring-1 ring-white/5 rounded-[1.5rem]"></div>
                </div>
            </div>
            <span className="text-[#2F8ED6] font-bold tracking-widest uppercase text-sm md:text-base">
                {label}
            </span>
        </div>
    );
};

// --- Main Page Component ---
const LaunchCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const targetDate = new Date(2026, 1, 13, 0, 0, 0).getTime();

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;
            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };
        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0B1116] text-[#FFFFFF] relative overflow-hidden font-sans selection:bg-[#1E6FA8] selection:text-white">
            
            {/* --- Premium Background Layer --- */}
            <div className="absolute inset-0 z-0">
                {/* 1. Subtle Radial Spotlight */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#16222C_0%,_#0B1116_100%)]" />

                {/* 2. SVG Noise Effect */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none mix-blend-overlay">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>

                {/* 3. Creative SVG Lines (Architectural Grid) */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1E6FA8" stopOpacity="0" />
                            <stop offset="50%" stopColor="#1E6FA8" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#1E6FA8" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Horizontal Decorative Lines */}
                    <path d="M0 100 Q 50% 120 100% 100" stroke="url(#lineGradient)" fill="none" strokeWidth="0.5" />
                    <path d="M0 800 Q 50% 780 100% 800" stroke="url(#lineGradient)" fill="none" strokeWidth="0.5" />
                    {/* Large Background Curves */}
                    <circle cx="50%" cy="50%" r="40%" stroke="white" strokeWidth="0.1" fill="none" opacity="0.1" />
                    <circle cx="50%" cy="50%" r="45%" stroke="white" strokeWidth="0.05" fill="none" opacity="0.05" />
                </svg>

                {/* 4. Ambient Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2F8ED6] rounded-full blur-[120px] opacity-[0.07] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFFFFF] rounded-full blur-[120px] opacity-[0.03] pointer-events-none"></div>
            </div>

            {/* --- Content Logic --- */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-12 md:gap-20">

                {/* Header Section */}
                <div className="max-w-4xl space-y-10 flex flex-col items-center">
                    {/* Improved Logo Reveal */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group"
                    >
                        <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <img 
                            src="/logo.png" 
                            alt="VANTAGE Logo" 
                            className="h-24 md:h-32 w-auto relative z-10 drop-shadow-[0_0_30px_rgba(47,142,214,0.3)]" 
                        />
                    </motion.div>

                    {/* Improved Description Reveal */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-xl md:text-2xl text-[#E6EEF5]/80 font-light max-w-2xl mx-auto leading-relaxed tracking-wide"
                        >
                            Next-generation crypto intelligence. <br />
                            <span className="text-[#2F8ED6] font-medium inline-block mt-2 relative">
                                Strategic advantage
                                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2F8ED6] to-transparent opacity-50"></span>
                            </span> in fast-moving digital markets.
                        </motion.p>
                    </motion.div>
                </div>

                {/* Countdown Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap justify-center gap-6 md:gap-10"
                >
                    <CounterBlock value={timeLeft.days} label="Days" digits={2} />
                    <CounterBlock value={timeLeft.hours} label="Hours" digits={2} />
                    <CounterBlock value={timeLeft.minutes} label="Minutes" digits={2} />
                    <CounterBlock value={timeLeft.seconds} label="Seconds" digits={2} />
                </motion.div>
            </div>

            {/* Subtle Bottom Border Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </main>
    );
};

export default LaunchCountdown;