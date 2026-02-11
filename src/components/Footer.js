'use client'
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt, FaEnvelope, FaFileAlt, FaGlobe } from 'react-icons/fa';
import { RiTwitterXLine } from "react-icons/ri";

// THEME CONSTANTS
const theme = {
  primary: '#2471a4',    // Deep Ocean Blue
  secondary: '#38bdf8',  // Sky Blue
  background: '#0B0D14', // Graphite
  cardBg: '#1C2126',     // Slate
  border: '#2A3138',     // Steel
  text: '#9CA3AF'        // Gray
};

export default function Footer() {
  const footerLinks = {
    product: [
      { label: 'Portfolio Analysis', href: '/' },
      { label: 'Task Center', href: '/tasks' }
    ],
    resources: [
      { label: 'Whitepaper', href: 'https://vantage-ai.gitbook.io/vantage-ai-docs/', icon: FaFileAlt },
      { label: 'BSC Scan', href: 'https://bscscan.com/token/0x6699ac45E9a93E3CA6850A07800e6508Bb25103e', icon: FaExternalLinkAlt }
    ],
    community: [
      { label: 'Follow on X', href: 'https://x.com/AI_VANT', icon: RiTwitterXLine }
    ]
  };

  return (
    <footer 
      className="relative overflow-hidden border-t"
      style={{ 
        backgroundColor: theme.background,
        borderColor: theme.border
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="py-16 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Logo */}
                <Link href="/" className="inline-block mb-6 group">
                   {/* Replace with your actual logo path */}
                  <Image 
                    src="/logo.png" 
                    alt='VANTAGE Logo' 
                    width={160} 
                    height={80}
                    className="opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </Link>

                {/* Description */}
                <p className="text-[#9CA3AF] mb-6 leading-relaxed max-w-sm text-sm">
                  The intelligent bridge between raw blockchain data and actionable insights. Powered by advanced AI algorithms on the Binance Smart Chain.
                </p>
              </motion.div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:pl-12">
              
              {/* Product */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-b border-[#2A3138] pb-2 inline-block">Product</h3>
                <ul className="space-y-4">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href}
                        className="text-[#9CA3AF] hover:text-[#2471a4] transition-colors duration-200 text-sm inline-flex items-center gap-2 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-b border-[#2A3138] pb-2 inline-block">Resources</h3>
                <ul className="space-y-4">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        target={link.icon === FaExternalLinkAlt ? "_blank" : undefined}
                        rel={link.icon === FaExternalLinkAlt ? "noopener noreferrer" : undefined}
                        className="text-[#9CA3AF] hover:text-[#2471a4] transition-colors duration-200 text-sm inline-flex items-center gap-2 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.label}
                        </span>
                        {link.icon === FaExternalLinkAlt && <FaExternalLinkAlt className="text-[10px] opacity-50" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Community */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-b border-[#2A3138] pb-2 inline-block">Connect</h3>
                <ul className="space-y-4">
                  {footerLinks.community.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9CA3AF] hover:text-[#2471a4] transition-colors duration-200 text-sm inline-flex items-center gap-2 group"
                      >
                        <link.icon className="text-sm" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t py-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: theme.border }}
        >
          {/* Copyright */}
          <div className="text-gray-500 text-sm flex items-center gap-2">
             © {new Date().getFullYear()} Vantage AI. All rights reserved.
          </div>

          {/* Social / Tech Stack or simple message */}
          <div className="flex items-center gap-6">
             <div className="h-3 w-px bg-[#2A3138]" />
             <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>Made by</span>
                <span className="text-white font-semibold">Vantage Team</span>
             </div>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}