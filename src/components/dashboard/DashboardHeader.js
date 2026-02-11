'use client';

import { motion } from 'framer-motion';
import { FaHome, FaDownload, FaShare, FaRobot, FaCopy } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { VANTAGE_THEME, VANTAGE_INFO } from './utils/theme';
import { formatAddress, getCacheAge } from './utils/dataTransform';

export default function DashboardHeader({ wallet, network, onToggleChat, cacheAge }) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);

    const copyAddress = () => {
        navigator.clipboard.writeText(wallet);
        setCopied(true);
        toast.success('Address copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-40 backdrop-blur-xl border-b mb-8"
            style={{
                background: `${VANTAGE_THEME.cardBg}95`,
                borderColor: VANTAGE_THEME.border
            }}
        >
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Left: Wallet Info */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/')}
                            className="p-3 rounded-xl transition-all"
                            style={{
                                background: `${VANTAGE_THEME.primary}20`,
                                border: `1px solid ${VANTAGE_THEME.primary}40`
                            }}
                        >
                            <FaHome style={{ color: VANTAGE_THEME.primary }} />
                        </motion.button>

                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1
                                    className="text-xl font-bold"
                                    style={{ color: VANTAGE_THEME.textLight }}
                                >
                                    {VANTAGE_INFO.tokenName} Dashboard
                                </h1>
                                <span
                                    className="text-xs font-semibold px-3 py-1 rounded-full"
                                    style={{
                                        background: `${VANTAGE_THEME.primary}30`,
                                        color: VANTAGE_THEME.primary
                                    }}
                                >
                                    {network || 'BSC'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={copyAddress}
                                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                                    style={{ color: VANTAGE_THEME.text }}
                                >
                                    <span className="font-mono">{formatAddress(wallet, 6)}</span>
                                    {copied ? (
                                        <span style={{ color: VANTAGE_THEME.success }}>✓</span>
                                    ) : (
                                        <FaCopy className="text-xs" />
                                    )}
                                </button>
                                {cacheAge !== null && (
                                    <span className="text-xs" style={{ color: VANTAGE_THEME.textDark }}>
                                        • Updated {cacheAge}m ago
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                        <motion.a
                            href={VANTAGE_INFO.docsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                            style={{
                                background: `${VANTAGE_THEME.cardBg}`,
                                color: VANTAGE_THEME.text,
                                border: `1px solid ${VANTAGE_THEME.border}`
                            }}
                        >
                            📚 Docs
                        </motion.a>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toast.success('Coming soon!')}
                            className="p-3 rounded-xl transition-all"
                            style={{
                                background: `${VANTAGE_THEME.cardBg}`,
                                border: `1px solid ${VANTAGE_THEME.border}`
                            }}
                        >
                            <FaShare style={{ color: VANTAGE_THEME.text }} />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toast.success('Coming soon!')}
                            className="p-3 rounded-xl transition-all"
                            style={{
                                background: `${VANTAGE_THEME.cardBg}`,
                                border: `1px solid ${VANTAGE_THEME.border}`
                            }}
                        >
                            <FaDownload style={{ color: VANTAGE_THEME.text }} />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onToggleChat}
                            className="px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2"
                            style={{
                                background: `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`,
                                color: '#fff'
                            }}
                        >
                            <FaRobot />
                            <span className="hidden sm:inline">AI Chat</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
