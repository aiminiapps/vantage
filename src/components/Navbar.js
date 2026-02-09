'use client'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiTwitterXLine } from "react-icons/ri";
import { RiBnbLine } from "react-icons/ri";

// New Theme Palette
const theme = {
  primary: '#5227FF',     // Electric Blue
  secondary: '#a855f7',   // Purple accent
  background: '#111315',  // Graphite Black
  surface: '#1C2126',     // Surface Slate
  border: '#2A3138',      // Soft Steel
  text: '#9CA3AF'         // Cool Gray
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const { scrollY } = useScroll();
  
  const navY = useTransform(scrollY, [0, 100], [0, 0]);

  // Handle scroll detection for style changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '#features' },
    { label: 'Tokenomics', href: '#tokenomics' }
  ];

  return (
    <motion.nav
      style={{ y: navY }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-6"
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        {/* Liquid Steel Container */}
        <div 
          className={`relative overflow-hidden rounded-2xl transition-all duration-500 group ${
            isScrolled ? 'shadow-2xl shadow-[#5227FF]/10' : 'shadow-xl'
          }`}
          style={{
            // Deep Slate with blur
            background: `linear-gradient(135deg, 
              rgba(28, 33, 38, 0.9) 0%, 
              rgba(28, 33, 38, 0.75) 100%)`,
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            border: `1px solid ${theme.border}`,
          }}
        >
          {/* Subtle Top Shine on the Border */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

          {/* Animated Glow Border moving around */}
          <motion.div
            animate={{
              background: [
                `linear-gradient(90deg, transparent, ${theme.primary}00, transparent)`,
                `linear-gradient(90deg, transparent, ${theme.primary}40, transparent)`, 
                `linear-gradient(90deg, transparent, ${theme.primary}00, transparent)`
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ padding: '1px' }} 
          />

          {/* Content */}
          <div className="relative px-4 py-3 md:px-6">
            <div className="flex items-center justify-between gap-4">
              
              {/* Logo - Left */}
              <Link href="/" className="flex items-center gap-3 group flex-shrink-0 relative z-10">
                <Image src='/logo.png' alt='logo' width={140} height={70} className="object-contain" />
              </Link>

              {/* Center Navigation Links - Desktop */}
              <div className="hidden lg:flex items-center gap-2 flex-1 justify-center relative z-10">
                {navLinks.map((link, index) => (
                  <Link key={index} href={link.href} className="relative">
                    <motion.div
                      onHoverStart={() => setHoveredLink(index)}
                      onHoverEnd={() => setHoveredLink(null)}
                      className="px-5 py-2 rounded-lg relative font-medium text-sm transition-colors duration-300 text-[#9CA3AF] hover:text-white"
                    >
                      {/* Hover Spotlight Background */}
                      {hoveredLink === index && (
                        <motion.div
                          layoutId="nav-hover"
                          className="absolute inset-0 bg-[#2A3138]/60 rounded-lg -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      {link.label}
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Right Side - Social & CTA */}
              <div className="flex items-center gap-3 flex-shrink-0 relative z-10">
                
                {/* Social Icons */}
                <div className="hidden md:flex items-center gap-2 border-r border-[#2A3138] pr-4 mr-1">
                  {[
                    { icon: RiBnbLine, href: "https://bscscan.com/token/0x6699ac45E9a93E3CA6850A07800e6508Bb25103e", color: "#0088cc" },
                    { icon: RiTwitterXLine, href: "https://x.com/AI_VANT", color: "#1DA1F2" }
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -1, backgroundColor: '#2A3138' }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg transition-colors duration-200 text-[#9CA3AF] hover:text-white relative overflow-hidden"
                    >
                      <social.icon className="text-xl" />
                    </motion.a>
                  ))}
                </div>

                {/* 3D "Earn AFRD" Button (Mini Version) */}
                <Link href="/tasks">
                  <div className="relative group overflow-hidden">
                    <div className="absolute inset-0 bg-[#3b1ec2] rounded-lg translate-y-1 rounded-b-lg" />
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 2 }}
                      className={`
                        relative px-5 py-2 overflow-hidden
                        bg-gradient-to-b from-[#633aff] to-[#5227FF] 
                        rounded-lg text-white font-bold text-sm
                        border-t border-[#8e72ff] border-b-2 border-[#3016a3]
                        active:border-b-0
                        shadow-[0_4px_10px_rgba(82,39,255,0.3)]
                        transition-all duration-100 ease-in-out
                        flex items-center gap-2
                      `}
                    >
                      {/* Shimmer */}
                      <motion.div
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      />
                      <span>Earn AFRD</span>
                    </motion.button>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Border Shine - Only visible on scroll or hover */}
          <motion.div
            animate={{
              opacity: isScrolled ? 1 : 0.3,
              scaleX: isScrolled ? 1 : 0.8
            }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5227FF]/50 to-transparent"
          />
          
        </div>
      </motion.div>
    </motion.nav>
  );
}