'use client';

import { motion } from 'framer-motion';
import { FaLayerGroup, FaCoins, FaExchangeAlt, FaChartLine } from 'react-icons/fa';
import { VANTAGE_THEME } from './utils/theme';

export default function ChainsTab({ chains, analytics }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chains.map((chain, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-6 rounded-2xl cursor-pointer"
                    style={{
                        background: `linear-gradient(135deg, ${VANTAGE_THEME.cardBg} 0%, ${VANTAGE_THEME.background} 100%)`,
                        border: `1px solid ${VANTAGE_THEME.border}`
                    }}
                >
                    {/* Chain Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                style={{ background: `${VANTAGE_THEME.primary}20` }}
                            >
                                <FaLayerGroup style={{ color: VANTAGE_THEME.primary }} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg" style={{ color: VANTAGE_THEME.textLight }}>
                                    {chain.chainName || chain.chain}
                                </h3>
                                <span
                                    className="text-xs px-2 py-1 rounded-full"
                                    style={{
                                        background: chain.success ? `${VANTAGE_THEME.success}20` : `${VANTAGE_THEME.error}20`,
                                        color: chain.success ? VANTAGE_THEME.success : VANTAGE_THEME.error
                                    }}
                                >
                                    {chain.success ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Chain Stats */}
                    <div className="space-y-3">
                        {/* Tokens */}
                        <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: `${VANTAGE_THEME.border}40` }}>
                            <div className="flex items-center gap-2">
                                <FaCoins style={{ color: VANTAGE_THEME.secondary }} />
                                <span style={{ color: VANTAGE_THEME.text }}>Tokens</span>
                            </div>
                            <span className="font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                                {chain.tokens?.length || 0}
                            </span>
                        </div>

                        {/* Transactions */}
                        <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: `${VANTAGE_THEME.border}40` }}>
                            <div className="flex items-center gap-2">
                                <FaExchangeAlt style={{ color: VANTAGE_THEME.warning }} />
                                <span style={{ color: VANTAGE_THEME.text }}>Transactions</span>
                            </div>
                            <span className="font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                                {chain.transactions?.length || 0}
                            </span>
                        </div>

                        {/* Activity */}
                        <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: `${VANTAGE_THEME.border}40` }}>
                            <div className="flex items-center gap-2">
                                <FaChartLine style={{ color: VANTAGE_THEME.info }} />
                                <span style={{ color: VANTAGE_THEME.text }}>Activity</span>
                            </div>
                            <span className="font-bold" style={{ color: analytics.patterns?.mostActiveChain === chain.chainName ? VANTAGE_THEME.success : VANTAGE_THEME.textDark }}>
                                {analytics.patterns?.mostActiveChain === chain.chainName ? 'High' : 'Low'}
                            </span>
                        </div>
                    </div>

                    {/* Top Token */}
                    {chain.tokens && chain.tokens.length > 0 && (
                        <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${VANTAGE_THEME.border}` }}>
                            <p className="text-xs mb-2" style={{ color: VANTAGE_THEME.textDark }}>
                                Top Token
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold" style={{ color: VANTAGE_THEME.textLight }}>
                                    {chain.tokens[0].symbol}
                                </span>
                                <span style={{ color: VANTAGE_THEME.primary }}>
                                    {parseFloat(chain.tokens[0].balance || 0).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    )}
                </motion.div>
            ))}

            {/* Summary Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: chains.length * 0.1 }}
                className="p-6 rounded-2xl md:col-span-2 lg:col-span-3"
                style={{
                    background: `linear-gradient(135deg, ${VANTAGE_THEME.primary}20 0%, ${VANTAGE_THEME.secondary}10 100%)`,
                    border: `1px solid ${VANTAGE_THEME.primary}40`
                }}
            >
                <h3 className="font-bold mb-4" style={{ color: VANTAGE_THEME.textLight }}>
                    Multi-Chain Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <p className="text-3xl font-bold" style={{ color: VANTAGE_THEME.primary }}>
                            {analytics.totalChains}
                        </p>
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Active Chains
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold" style={{ color: VANTAGE_THEME.secondary }}>
                            {analytics.totalTokens}
                        </p>
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Total Tokens
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold" style={{ color: VANTAGE_THEME.warning }}>
                            {analytics.totalTransactions}
                        </p>
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Transactions
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold" style={{ color: VANTAGE_THEME.success }}>
                            {analytics.patterns?.crossChainUser ? 'Yes' : 'No'}
                        </p>
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Cross-Chain User
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
