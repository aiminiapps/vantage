'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaWallet, FaChartBar, FaList, FaLayerGroup } from 'react-icons/fa';
import WalletManager from './multiwallet/WalletManager';
import { VANTAGE_THEME } from './utils/theme';

/**
 * Multi-Wallet Tab
 * Comprehensive multi-wallet management and comparison tools
 */
export default function MultiWalletTab({ currentWallet, onWalletChange }) {
    const [view, setView] = useState('manager'); // 'manager', 'comparison', 'combined'

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-1" style={{ color: VANTAGE_THEME.textLight }}>
                            Multi-Wallet Management
                        </h2>
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Manage multiple wallets, compare portfolios, and track combined performance
                        </p>
                    </div>
                </div>

                {/* View Switcher */}
                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setView('manager')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all"
                        style={{
                            background: view === 'manager'
                                ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                                : `${VANTAGE_THEME.border}40`,
                            color: view === 'manager' ? '#fff' : VANTAGE_THEME.text,
                            border: `1px solid ${view === 'manager' ? VANTAGE_THEME.primary : VANTAGE_THEME.border}`
                        }}
                    >
                        <FaList />
                        <span className="hidden sm:inline">Manager</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setView('comparison')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all"
                        style={{
                            background: view === 'comparison'
                                ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                                : `${VANTAGE_THEME.border}40`,
                            color: view === 'comparison' ? '#fff' : VANTAGE_THEME.text,
                            border: `1px solid ${view === 'comparison' ? VANTAGE_THEME.primary : VANTAGE_THEME.border}`
                        }}
                    >
                        <FaChartBar />
                        <span className="hidden sm:inline">Compare</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setView('combined')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all"
                        style={{
                            background: view === 'combined'
                                ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                                : `${VANTAGE_THEME.border}40`,
                            color: view === 'combined' ? '#fff' : VANTAGE_THEME.text,
                            border: `1px solid ${view === 'combined' ? VANTAGE_THEME.primary : VANTAGE_THEME.border}`
                        }}
                    >
                        <FaLayerGroup />
                        <span className="hidden sm:inline">Combined</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Content */}
            {view === 'manager' && (
                <WalletManager
                    currentWallet={currentWallet}
                    onWalletChange={onWalletChange}
                />
            )}

            {view === 'comparison' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 text-center rounded-2xl"
                    style={{
                        background: VANTAGE_THEME.cardBg,
                        border: `1px solid ${VANTAGE_THEME.border}`
                    }}
                >
                    <div
                        className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                        style={{ background: `${VANTAGE_THEME.info}20` }}
                    >
                        <FaChartBar style={{ color: VANTAGE_THEME.info, fontSize: '2.5rem' }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: VANTAGE_THEME.textLight }}>
                        Wallet Comparison Coming Soon
                    </h3>
                    <p style={{ color: VANTAGE_THEME.text }}>
                        Compare multiple wallets side-by-side with performance metrics, allocation differences, and risk analysis
                    </p>
                </motion.div>
            )}

            {view === 'combined' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 text-center rounded-2xl"
                    style={{
                        background: VANTAGE_THEME.cardBg,
                        border: `1px solid ${VANTAGE_THEME.border}`
                    }}
                >
                    <div
                        className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                        style={{ background: `${VANTAGE_THEME.success}20` }}
                    >
                        <FaLayerGroup style={{ color: VANTAGE_THEME.success, fontSize: '2.5rem' }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: VANTAGE_THEME.textLight }}>
                        Combined Portfolio Coming Soon
                    </h3>
                    <p style={{ color: VANTAGE_THEME.text }}>
                        View aggregated portfolio across all your wallets with consolidated holdings and total value
                    </p>
                </motion.div>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `${VANTAGE_THEME.info}10`,
                        border: `1px solid ${VANTAGE_THEME.info}40`
                    }}
                >
                    <h4 className="font-bold mb-2" style={{ color: VANTAGE_THEME.info }}>
                        💼 Wallet Manager
                    </h4>
                    <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                        Add unlimited wallets with custom labels and colors. Mark favorites for quick access.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `${VANTAGE_THEME.warning}10`,
                        border: `1px solid ${VANTAGE_THEME.warning}40`
                    }}
                >
                    <h4 className="font-bold mb-2" style={{ color: VANTAGE_THEME.warning }}>
                        📊 Compare Wallets
                    </h4>
                    <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                        Side-by-side comparison of performance, risk scores, and allocation strategies.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `${VANTAGE_THEME.success}10`,
                        border: `1px solid ${VANTAGE_THEME.success}40`
                    }}
                >
                    <h4 className="font-bold mb-2" style={{ color: VANTAGE_THEME.success }}>
                        🎯 Combined View
                    </h4>
                    <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                        Aggregate all wallets into one unified portfolio for total net worth tracking.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
