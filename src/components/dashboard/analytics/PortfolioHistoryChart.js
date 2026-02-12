'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChartLine, FaCalendarAlt, FaDownload, FaExpand } from 'react-icons/fa';
import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { VANTAGE_THEME } from '../utils/theme';

/**
 * Portfolio History Chart - Phase 1: Analytics & Charts
 * Shows portfolio value over time with smooth animations
 */
export default function PortfolioHistoryChart({ historicalData, currentValue }) {
    const [timeframe, setTimeframe] = useState('7d');
    const [chartType, setChartType] = useState('area'); // 'line' or 'area'

    // Time period options
    const timeframes = [
        { id: '24h', label: '24H', days: 1 },
        { id: '7d', label: '7D', days: 7 },
        { id: '30d', label: '30D', days: 30 },
        { id: '90d', label: '90D', days: 90 },
        { id: '1y', label: '1Y', days: 365 },
        { id: 'all', label: 'ALL', days: null }
    ];

    // Generate mock historical data (replace with real data from API/localStorage)
    const generateHistoricalData = (days) => {
        const data = [];
        const now = new Date();
        const baseValue = currentValue || 10000;

        for (let i = days; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);

            // Simulate price movements
            const variance = (Math.random() - 0.5) * 0.05; // ±5% daily variance
            const value = baseValue * (1 + variance * (days - i) / days);

            data.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                fullDate: date.toISOString(),
                value: value,
                formattedValue: `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            });
        }

        return data;
    };

    const selectedTimeframe = timeframes.find(tf => tf.id === timeframe);
    const chartData = generateHistoricalData(selectedTimeframe?.days || 30);

    // Calculate stats
    const firstValue = chartData[0]?.value || 0;
    const lastValue = chartData[chartData.length - 1]?.value || 0;
    const change = lastValue - firstValue;
    const changePercent = firstValue > 0 ? (change / firstValue) * 100 : 0;
    const isPositive = change >= 0;

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload[0]) {
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
                    <p className="text-xs mb-2" style={{ color: VANTAGE_THEME.text }}>
                        {payload[0].payload.date}
                    </p>
                    <p className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                        {payload[0].payload.formattedValue}
                    </p>
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
                            background: `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                        }}
                    >
                        <FaChartLine style={{ color: '#fff', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Portfolio History
                        </h3>
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Value over time
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setChartType(chartType === 'line' ? 'area' : 'line')}
                        className="p-2 rounded-lg transition-all"
                        style={{
                            background: VANTAGE_THEME.cardBg,
                            border: `1px solid ${VANTAGE_THEME.border}`,
                            color: VANTAGE_THEME.textLight
                        }}
                    >
                        <FaExpand />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-6">
                <div className="flex items-baseline gap-3">
                    <h2 className="text-4xl font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                        ${lastValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span
                            className="text-lg font-semibold"
                            style={{ color: isPositive ? VANTAGE_THEME.success : VANTAGE_THEME.error }}
                        >
                            {isPositive ? '+' : ''}{change.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span
                            className="px-2 py-1 rounded-lg text-sm font-semibold"
                            style={{
                                background: `${isPositive ? VANTAGE_THEME.success : VANTAGE_THEME.error}20`,
                                color: isPositive ? VANTAGE_THEME.success : VANTAGE_THEME.error
                            }}
                        >
                            {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                        </span>
                    </div>
                </div>
                <p className="text-sm mt-1" style={{ color: VANTAGE_THEME.text }}>
                    Past {selectedTimeframe?.label}
                </p>
            </div>

            {/* Timeframe Selection */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {timeframes.map(tf => (
                    <motion.button
                        key={tf.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setTimeframe(tf.id)}
                        className="px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap"
                        style={{
                            background: timeframe === tf.id
                                ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                                : `${VANTAGE_THEME.border}40`,
                            color: timeframe === tf.id ? '#fff' : VANTAGE_THEME.text,
                            border: `1px solid ${timeframe === tf.id ? VANTAGE_THEME.primary : VANTAGE_THEME.border}`
                        }}
                    >
                        {tf.label}
                    </motion.button>
                ))}
            </div>

            {/* Chart */}
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'area' ? (
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={VANTAGE_THEME.primary} stopOpacity={0.3} />
                                    <stop offset="100%" stopColor={VANTAGE_THEME.primary} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={VANTAGE_THEME.border} opacity={0.1} />
                            <XAxis
                                dataKey="date"
                                stroke={VANTAGE_THEME.text}
                                style={{ fontSize: '12px' }}
                                tickLine={false}
                            />
                            <YAxis
                                stroke={VANTAGE_THEME.text}
                                style={{ fontSize: '12px' }}
                                tickLine={false}
                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={VANTAGE_THEME.primary}
                                strokeWidth={3}
                                fill="url(#portfolioGradient)"
                                animationDuration={1000}
                            />
                        </AreaChart>
                    ) : (
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={VANTAGE_THEME.border} opacity={0.1} />
                            <XAxis
                                dataKey="date"
                                stroke={VANTAGE_THEME.text}
                                style={{ fontSize: '12px' }}
                                tickLine={false}
                            />
                            <YAxis
                                stroke={VANTAGE_THEME.text}
                                style={{ fontSize: '12px' }}
                                tickLine={false}
                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={VANTAGE_THEME.primary}
                                strokeWidth={3}
                                dot={false}
                                animationDuration={1000}
                            />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
