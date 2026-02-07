"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Configuration ---
const DIGIT_HEIGHT = 140; // Height of the visible area for a digit
const DIGIT_WIDTH = 90;
const SPRING_TRANSITION = {
    type: "spring",
    stiffness: 45,
    damping: 15,
    mass: 1.1,
};

// --- Sub-Component: 3D Digit Wheel ---
const DigitWheel = ({ targetDigit }) => {
    const numbers = Array.from({ length: 10 }, (_, i) => i);

    return (
        <div
            className="relative overflow-hidden bg-[#121A22] border-r border-white/5 last:border-0 first:rounded-l-xl last:rounded-r-xl"
            style={{ height: DIGIT_HEIGHT, width: DIGIT_WIDTH }}
        >
            {/* Moving Number Strip */}
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
                            style={{
                                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                            }}
                        >
                            {num}
                        </span>
                    </div>
                ))}
            </motion.div>

            {/* --- 3D LIGHTING & OVERLAYS --- */}

            {/* 1. Cylinder Curvature (Top/Bottom Shadows) */}
            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between">
                <div className="h-1/3 bg-gradient-to-b from-[#121A22] via-[#121A22]/90 to-transparent"></div>
                <div className="h-1/3 bg-gradient-to-t from-[#121A22] via-[#121A22]/90 to-transparent"></div>
            </div>

            {/* 2. Specular Highlight (The "Shine") */}
            <div className="pointer-events-none absolute top-[40%] left-0 right-0 h-16 bg-gradient-to-b from-white/5 to-transparent opacity-30 z-10 blur-sm"></div>

            {/* 3. Side Vignette */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/50 to-transparent z-20"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-black/50 to-transparent z-20"></div>
        </div>
    );
};

// --- Sub-Component: Counter Block (Groups digits) ---
const CounterBlock = ({ value, label, digits = 2 }) => {
    const paddedValue = String(value).padStart(digits, "0");
    const digitArray = paddedValue.split("");

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Housing for the digits */}
            <div className="relative p-2 rounded-[2rem] bg-[#0B1F2E] shadow-2xl border border-white/5">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-[#121A22] ring-2 ring-black/20 shadow-inner">
                    <div className="flex">
                        {digitArray.map((d, i) => (
                            <DigitWheel key={i} targetDigit={d} />
                        ))}
                    </div>

                    {/* Glass Overlay on top of the whole block */}
                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent opacity-50 z-40"></div>
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-50 ring-1 ring-white/5 rounded-[1.5rem]"></div>
                </div>
            </div>

            {/* Label */}
            <span className="text-[#2F8ED6] font-bold tracking-widest uppercase text-sm md:text-base">
                {label}
            </span>
        </div>
    );
};

// --- Main Page Component ---
const LaunchCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Target Date: 13-2-2026 (DD-MM-YYYY)
    // Parsing manually to ensure correct format irrespective of locale
    const targetDate = new Date(2026, 1, 13, 0, 0, 0).getTime(); // Month is 0-indexed (1 = Feb)

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
            } else {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0B1F2E] text-[#FFFFFF] relative overflow-hidden font-sans selection:bg-[#1E6FA8] selection:text-white">

            {/* --- Ambient Background Effects --- */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

            {/* Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1E6FA8] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2F8ED6] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

            {/* --- Content Logic --- */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-12 md:gap-16">

                {/* Header Section */}
                <div className="max-w-4xl space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-[#E6EEF5]/50">
                            VANTAGE
                        </h1>
                        <div className="h-1 w-24 mx-auto bg-[#1E6FA8] rounded-full mb-8"></div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-[#E6EEF5] leading-relaxed max-w-3xl mx-auto font-light"
                    >
                        <span className="font-semibold text-white">VANTAGE</span> is a next-generation crypto intelligence platform built to give traders, investors, and institutions a strategic advantage in fast-moving digital markets.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-base text-[#E6EEF5]/80 max-w-2xl mx-auto"
                    >
                        Designed with a clean, professional blue-and-white identity, VANTAGE focuses on clarity, precision, and execution. The platform transforms complex market data into actionable intelligence — helping users identify hidden opportunities, anticipate market movements, and act with confidence.
                    </motion.p>
                </div>

                {/* Countdown Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-6 md:gap-10"
                >
                    <CounterBlock value={timeLeft.days} label="Days" digits={2} />
                    <CounterBlock value={timeLeft.hours} label="Hours" digits={2} />
                    <CounterBlock value={timeLeft.minutes} label="Minutes" digits={2} />
                    <CounterBlock value={timeLeft.seconds} label="Seconds" digits={2} />
                </motion.div>

                {/* CTA / Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E6FA8]/10 border border-[#1E6FA8]/30 text-[#2F8ED6] text-sm font-medium">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F8ED6] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F8ED6]"></span>
                        </span>
                        System Launch Initiated
                    </div>
                </motion.div>

            </div>
        </main>
    );
};

export default LaunchCountdown;