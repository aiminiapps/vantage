'use client';

import { motion } from 'framer-motion';
import { FaChartLine, FaLayerGroup, FaExchangeAlt, FaRocket } from 'react-icons/fa';
import CorrelationMatrix from './advanced/CorrelationMatrix';
import SectorAllocation from './advanced/SectorAllocation';
import TradingViewChart from './advanced/TradingViewChart';
import { VANTAGE_THEME } from './utils/theme';

/**
 * Advanced Charts Tab
 * Comprehensive advanced analytics with correlation matrix, sector allocation, and TradingView
 */
export default function AdvancedChartsTab({ walletData }) {
    const { allTokens = [] } = walletData || {};

    // Get top token for TradingView
    const getTopToken = () => {
        if (!allTokens || allTokens.length === 0) return 'BINANCE:BNBUSDT';

        // Find highest value token
        const topToken = allTokens.reduce((prev, current) =>
            (current.valueUSD > prev.valueUSD) ? current : prev
        );

        // Map symbol to TradingView format
        const symbolMap = {
            'BNB': 'BINANCE:BNBUSDT',
            'ETH': 'BINANCE:ETHUSDT',
            'BTC': 'BINANCE:BTCUSDT',
            'CAKE': 'BINANCE:CAKEUSDT',
            'USDT': 'BINANCE:BTCUSDT',
            'USDC': 'BINANCE:BTCUSDT'
        };

        return symbolMap[topToken.symbol] || `BINANCE:${topToken.symbol}USDT`;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
            >
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                        background: `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                    }}
                >
                    <FaRocket style={{ color: '#fff', fontSize: '2rem' }} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-1" style={{ color: VANTAGE_THEME.textLight }}>
                        Advanced Charts
                    </h2>
                    <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                        Professional analytics with correlation analysis, sector breakdown, and live price charts
                    </p>
                </div>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `linear-gradient(135deg, ${VANTAGE_THEME.info}20, ${VANTAGE_THEME.info}10)`,
                        border: `1px solid ${VANTAGE_THEME.info}40`
                    }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <FaExchangeAlt style={{ color: VANTAGE_THEME.info, fontSize: '1.5rem' }} />
                        <h3 className="font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Correlation Matrix
                        </h3>
                    </div>
                    <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                        Discover how your tokens move together with colorful correlation heatmap
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `linear-gradient(135deg, ${VANTAGE_THEME.secondary}20, ${VANTAGE_THEME.secondary}10)`,
                        border: `1px solid ${VANTAGE_THEME.secondary}40`
                    }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <FaLayerGroup style={{ color: VANTAGE_THEME.secondary, fontSize: '1.5rem' }} />
                        <h3 className="font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Sector Allocation
                        </h3>
                    </div>
                    <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                        Visualize your portfolio distribution across DeFi, Gaming, AI, NFT, and more
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `linear-gradient(135deg, ${VANTAGE_THEME.success}20, ${VANTAGE_THEME.success}10)`,
                        border: `1px solid ${VANTAGE_THEME.success}40`
                    }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <FaChartLine style={{ color: VANTAGE_THEME.success, fontSize: '1.5rem' }} />
                        <h3 className="font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Live Price Charts
                        </h3>
                    </div>
                    <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                        Professional TradingView charts with indicators, candlesticks, and drawing tools
                    </p>
                </motion.div>
            </div>

            {/* Charts - 2 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Correlation Matrix */}
                <CorrelationMatrix tokens={allTokens} />

                {/* Sector Allocation */}
                <SectorAllocation tokens={allTokens} />
            </div>

            {/* TradingView Full Width */}
            <TradingViewChart symbol={getTopToken()} />

            {/* Tips Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-xl"
                style={{
                    background: `${VANTAGE_THEME.warning}10`,
                    border: `1px solid ${VANTAGE_THEME.warning}40`
                }}
            >
                <h4 className="font-bold mb-3 flex items-center gap-2" style={{ color: VANTAGE_THEME.warning }}>
                    <span>💡</span> Pro Tips for Advanced Analytics
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm" style={{ color: VANTAGE_THEME.text }}>
                    <div>
                        <strong style={{ color: VANTAGE_THEME.textLight }}>Correlation Matrix:</strong> Green cells show tokens that move together.
                        Red cells indicate negative correlation - perfect for diversification!
                    </div>
                    <div>
                        <strong style={{ color: VANTAGE_THEME.textLight }}>Sector Allocation:</strong> A well-diversified portfolio
                        should have positions across multiple sectors to reduce risk.
                    </div>
                    <div>
                        <strong style={{ color: VANTAGE_THEME.textLight }}>TradingView Charts:</strong> Use technical indicators like
                        MA (Moving Average) and RSI to identify entry/exit points.
                    </div>
                    <div>
                        <strong style={{ color: VANTAGE_THEME.textLight }}>Best Practice:</strong> Rebalance quarterly to maintain
                        your target sector allocation and correlation profile.
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
