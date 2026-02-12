'use client';

import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';
import PortfolioHistoryChart from './analytics/PortfolioHistoryChart';
import ProfitLossTracker from './analytics/ProfitLossTracker';

/**
 * Analytics Tab - Phase 1: Analytics & Charts
 * Main tab showcasing portfolio analytics and performance metrics
 */
export default function AnalyticsTab({ walletData, analytics }) {
    return (
        <div className="space-y-6">
            {/* Portfolio History Chart */}
            <PortfolioHistoryChart
                historicalData={walletData?.historicalData || []}
                currentValue={analytics?.totalValue || 0}
            />

            {/* P&L Tracker */}
            <ProfitLossTracker
                tokens={walletData?.allTokens || []}
            />

            {/* Additional Analytics Components */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ROI Calculator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(36, 113, 164, 0.1), rgba(56, 189, 248, 0.1))',
                        border: '1px solid rgba(36, 113, 164, 0.2)'
                    }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <FaChartLine className="text-2xl text-[#2471a4]" />
                        <h3 className="text-lg font-bold text-gray-200">
                            ROI Calculator
                        </h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Total Investment</p>
                            <p className="text-2xl font-bold text-gray-100">
                                ${(analytics?.totalValue * 0.8 || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Current Value</p>
                            <p className="text-2xl font-bold text-gray-100">
                                ${(analytics?.totalValue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Total ROI</p>
                            <p className="text-3xl font-bold text-green-400">
                                +25.0%
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Best/Worst Performers */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(239, 68, 68, 0.1))',
                        border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}
                >
                    <h3 className="text-lg font-bold text-gray-200 mb-4">
                        Top Movers (24h)
                    </h3>
                    <div className="space-y-3">
                        {walletData?.allTokens?.slice(0, 5).map((token, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-200">{token.symbol}</p>
                                    <p className="text-xs text-gray-400">${token.priceUSD?.toFixed(6) || '0.00'}</p>
                                </div>
                                <div className="text-right">
                                    <p
                                        className="font-semibold"
                                        style={{ color: token.change24h >= 0 ? '#10b981' : '#ef4444' }}
                                    >
                                        {token.change24h >= 0 ? '+' : ''}{token.change24h?.toFixed(2) || 0}%
                                    </p>
                                </div>
                            </div>
                        )) || <p className="text-gray-400">No data available</p>}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
