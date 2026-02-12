'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChartBar, FaTrophy, FaArrowUp, FaArrowDown, FaCoins } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { VANTAGE_THEME } from '../utils/theme';

/**
 * Profit/Loss Tracker - Phase 1: Analytics & Charts
 * Track realized and unrealized P&L with detailed breakdown
 */
export default function ProfitLossTracker({ tokens }) {
    const [view, setView] = useState('summary'); // 'summary' or 'detailed'

    // Calculate P&L metrics
    const calculatePnL = () => {
        let realizedPnL = 0;
        let unrealizedPnL = 0;
        const tokenPnL = [];

        tokens?.forEach(token => {
            // For now, simulate P&L based on 24h change
            // In production, calculate from cost basis and current value
            const currentValue = token.valueUSD || 0;
            const changePercent = token.change24h || 0;

            // Simulate unrealized P&L
            const pnl = currentValue * (changePercent / 100);
            unrealizedPnL += pnl;

            if (currentValue > 0) {
                tokenPnL.push({
                    symbol: token.symbol,
                    name: token.name,
                    value: currentValue,
                    pnl: pnl,
                    pnlPercent: changePercent,
                    realized: 0, // TODO: Track from transaction history
                    unrealized: pnl,
                    isProfit: pnl >= 0
                });
            }
        });

        // Sort by absolute P&L
        tokenPnL.sort((a, b) => Math.abs(b.pnl) - Math.abs(a.pnl));

        return {
            total: realizedPnL + unrealizedPnL,
            realized: realizedPnL,
            unrealized: unrealizedPnL,
            tokens: tokenPnL.slice(0, 10) // Top 10
        };
    };

    const pnlData = calculatePnL();
    const totalPnL = pnlData.total;
    const isProfit = totalPnL >= 0;

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload[0]) {
            const data = payload[0].payload;
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl shadow-2xl backdrop-blur-md"
                    style={{
                        background: `${VANTAGE_THEME.cardBg}f0`,
                        border: `1px solid ${VANTAGE_THEME.border}`
                    }}
                >
                    <p className="font-semibold mb-1" style={{ color: VANTAGE_THEME.textLight }}>
                        {data.symbol}
                    </p>
                    <p className="text-sm mb-2" style={{ color: VANTAGE_THEME.text }}>
                        {data.name}
                    </p>
                    <div className="flex items-center gap-2">
                        <span
                            className="text-lg font-bold"
                            style={{ color: data.isProfit ? VANTAGE_THEME.success : VANTAGE_THEME.error }}
                        >
                            {data.isProfit ? '+' : ''}${Math.abs(data.pnl).toFixed(2)}
                        </span>
                        <span
                            className="text-sm"
                            style={{ color: data.isProfit ? VANTAGE_THEME.success : VANTAGE_THEME.error }}
                        >
                            ({data.isProfit ? '+' : ''}{data.pnlPercent.toFixed(2)}%)
                        </span>
                    </div>
                </motion.div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6"
            style={{
                background: VANTAGE_THEME.cardBg,
                border: `1px solid ${VANTAGE_THEME.border}`,
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                            background: isProfit
                                ? `linear-gradient(135deg, ${VANTAGE_THEME.success}, #10b981)`
                                : `linear-gradient(135deg, ${VANTAGE_THEME.error}, #dc2626)`
                        }}
                    >
                        <FaTrophy style={{ color: '#fff', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Profit & Loss
                        </h3>
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            24h performance
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setView('summary')}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                            background: view === 'summary'
                                ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                                : `${VANTAGE_THEME.border}40`,
                            color: view === 'summary' ? '#fff' : VANTAGE_THEME.text
                        }}
                    >
                        Summary
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setView('detailed')}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                            background: view === 'detailed'
                                ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                                : `${VANTAGE_THEME.border}40`,
                            color: view === 'detailed' ? '#fff' : VANTAGE_THEME.text
                        }}
                    >
                        Detailed
                    </motion.button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Total P&L */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `${isProfit ? VANTAGE_THEME.success : VANTAGE_THEME.error}10`,
                        border: `1px solid ${isProfit ? VANTAGE_THEME.success : VANTAGE_THEME.error}40`
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        {isProfit ? (
                            <FaArrowUp style={{ color: VANTAGE_THEME.success }} />
                        ) : (
                            <FaArrowDown style={{ color: VANTAGE_THEME.error }} />
                        )}
                        <span className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Total P&L
                        </span>
                    </div>
                    <p
                        className="text-2xl font-bold"
                        style={{ color: isProfit ? VANTAGE_THEME.success : VANTAGE_THEME.error }}
                    >
                        {isProfit ? '+' : ''}${Math.abs(totalPnL).toFixed(2)}
                    </p>
                </motion.div>

                {/* Realized P&L */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `${VANTAGE_THEME.info}10`,
                        border: `1px solid ${VANTAGE_THEME.info}40`
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <FaCoins style={{ color: VANTAGE_THEME.info }} />
                        <span className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Realized
                        </span>
                    </div>
                    <p className="text-2xl font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                        ${pnlData.realized.toFixed(2)}
                    </p>
                </motion.div>

                {/* Unrealized P&L */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `${VANTAGE_THEME.warning}10`,
                        border: `1px solid ${VANTAGE_THEME.warning}40`
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <FaChartBar style={{ color: VANTAGE_THEME.warning }} />
                        <span className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Unrealized
                        </span>
                    </div>
                    <p
                        className="text-2xl font-bold"
                        style={{ color: pnlData.unrealized >= 0 ? VANTAGE_THEME.success : VANTAGE_THEME.error }}
                    >
                        {pnlData.unrealized >= 0 ? '+' : ''}${pnlData.unrealized.toFixed(2)}
                    </p>
                </motion.div>
            </div>

            {/* Chart or Table */}
            {view === 'summary' && pnlData.tokens.length > 0 && (
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={pnlData.tokens} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" stroke={VANTAGE_THEME.border} opacity={0.1} />
                            <XAxis
                                dataKey="symbol"
                                stroke={VANTAGE_THEME.text}
                                style={{ fontSize: '12px' }}
                                tickLine={false}
                            />
                            <YAxis
                                stroke={VANTAGE_THEME.text}
                                style={{ fontSize: '12px' }}
                                tickLine={false}
                                tickFormatter={(value) => `$${value.toFixed(0)}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="pnl" radius={[8, 8, 0, 0]}>
                                {pnlData.tokens.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.isProfit ? VANTAGE_THEME.success : VANTAGE_THEME.error}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {view === 'detailed' && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr style={{ borderBottom: `1px solid ${VANTAGE_THEME.border}` }}>
                                <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: VANTAGE_THEME.text }}>
                                    Token
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-semibold" style={{ color: VANTAGE_THEME.text }}>
                                    Value
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-semibold" style={{ color: VANTAGE_THEME.text }}>
                                    P&L
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-semibold" style={{ color: VANTAGE_THEME.text }}>
                                    %
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pnlData.tokens.map((token, idx) => (
                                <motion.tr
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    style={{ borderBottom: `1px solid ${VANTAGE_THEME.border}40` }}
                                    className="hover:bg-opacity-5 transition-all"
                                >
                                    <td className="py-3 px-4">
                                        <div>
                                            <p className="font-semibold" style={{ color: VANTAGE_THEME.textLight }}>
                                                {token.symbol}
                                            </p>
                                            <p className="text-xs" style={{ color: VANTAGE_THEME.text }}>
                                                {token.name}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="text-right py-3 px-4" style={{ color: VANTAGE_THEME.textLight }}>
                                        ${token.value.toFixed(2)}
                                    </td>
                                    <td
                                        className="text-right py-3 px-4 font-semibold"
                                        style={{ color: token.isProfit ? VANTAGE_THEME.success : VANTAGE_THEME.error }}
                                    >
                                        {token.isProfit ? '+' : ''}${Math.abs(token.pnl).toFixed(2)}
                                    </td>
                                    <td
                                        className="text-right py-3 px-4 font-semibold"
                                        style={{ color: token.isProfit ? VANTAGE_THEME.success : VANTAGE_THEME.error }}
                                    >
                                        {token.isProfit ? '+' : ''}{token.pnlPercent.toFixed(2)}%
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
}
