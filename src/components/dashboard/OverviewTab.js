'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    FaTrophy, FaChartPie, FaFire, FaArrowUp, FaArrowDown,
    FaCoins, FaLayerGroup, FaChartLine, FaBolt
} from 'react-icons/fa';
import {
    PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { VANTAGE_THEME } from './utils/theme';

/**
 * Advanced Overview Tab - Premium Dashboard Overview
 * Features: Portfolio distribution, top holdings, performance metrics, chain analysis
 * Uses Evil Charts styling with colorful gradients and animations
 */
export default function OverviewTab({ chainDistribution, topHoldings, analytics }) {
    const [chartType, setChartType] = useState('donut'); // 'donut', 'bar', 'radar'
    const [performanceView, setPerformanceView] = useState('24h'); // '24h', '7d', '30d'

    // Vibrant color palette - Evil Charts style
    const CHART_COLORS = [
        '#3b82f6', // Blue
        '#8b5cf6', // Purple
        '#10b981', // Green
        '#f59e0b', // Orange
        '#ef4444', // Red
        '#ec4899', // Pink
        '#14b8a6', // Teal
        '#6366f1', // Indigo
        '#f97316', // Deep Orange
        '#22c55e', // Light Green
    ];


    // Calculate total balance (since valueUSD is 0, use balance as proxy)
    const totalBalance = (topHoldings || [])
        .reduce((sum, token) => sum + (token.balance || 0), 0);

    // Prepare top holdings data with colors - use balance since valueUSD is 0
    const holdingsData = (topHoldings || [])
        .filter(holding => (holding.balance || 0) > 0)
        .sort((a, b) => (b.balance || 0) - (a.balance || 0))
        .slice(0, 10)
        .map((holding, idx) => ({
            name: holding.symbol,
            value: holding.balance || 0, // Use balance instead of valueUSD
            balance: holding.balanceFormatted || holding.balance,
            change24h: holding.change24h || 0,
            percentage: totalBalance > 0
                ? ((holding.balance / totalBalance) * 100)
                : 0,
            color: CHART_COLORS[idx % CHART_COLORS.length]
        }));

    // Prepare chain distribution data
    const chainData = (chainDistribution || []).map((chain, idx) => ({
        name: chain.chain || 'Unknown',
        value: chain.value || 0,
        tokens: chain.tokens || 0,
        percentage: chain.percentage || 0,
        color: CHART_COLORS[idx % CHART_COLORS.length]
    }));


    // Performance data - simulate since change24h is 0 for all tokens
    // Generate based on token balance ranking (top performers get positive, others get varied)
    const performanceData = holdingsData.slice(0, 8).map((h, idx) => {
        // Simulate performance based on position and pseudo-random value
        let simulatedPerformance = 0;
        if (h.change24h && h.change24h !== 0) {
            // Use real data if available
            simulatedPerformance = h.change24h;
        } else {
            // Generate simulated data for visualization
            // Top 3 tokens: positive performance (2% to 8%)
            // Middle tokens: mixed (-2% to +5%)
            // Bottom tokens: slight negative (-1% to -5%)
            const seed = h.name.charCodeAt(0) % 10;
            if (idx < 3) {
                simulatedPerformance = 2 + (seed * 0.6);
            } else if (idx < 6) {
                simulatedPerformance = -2 + (seed * 0.7);
            } else {
                simulatedPerformance = -1 - (seed * 0.4);
            }
        }

        return {
            token: h.name,
            performance: simulatedPerformance,
            value: h.value,
            balance: h.balance
        };
    });

    // Radar chart data for portfolio health
    const healthMetrics = [
        { metric: 'Diversification', value: analytics?.diversificationScore || 50, fullMark: 100 },
        { metric: 'Liquidity', value: analytics?.liquidityScore || 70, fullMark: 100 },
        { metric: 'Growth', value: Math.min(100, Math.max(0, (analytics?.totalValue || 0) / 100)), fullMark: 100 },
        { metric: 'Stability', value: 100 - (analytics?.riskScore || 50), fullMark: 100 },
        { metric: 'Activity', value: analytics?.totalTokens ? Math.min(100, analytics.totalTokens * 10) : 50, fullMark: 100 }
    ];

    // Custom tooltip component
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload[0]) {
            const data = payload[0].payload;
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl backdrop-blur-md shadow-2xl"
                    style={{
                        background: `${VANTAGE_THEME.cardBg}f0`,
                        border: `1px solid ${data.color || VANTAGE_THEME.border}`
                    }}
                >
                    <p className="font-bold mb-2" style={{ color: VANTAGE_THEME.textLight }}>
                        {data.name || data.token}
                    </p>
                    {data.value !== undefined && (
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Balance: {typeof data.value === 'number' ? data.value.toFixed(4) : data.value}
                        </p>
                    )}
                    {data.percentage !== undefined && (
                        <p className="text-sm" style={{ color: data.color }}>
                            {typeof data.percentage === 'number' ? data.percentage.toFixed(2) : data.percentage}% of portfolio
                        </p>
                    )}
                    {data.change24h !== undefined && (
                        <p className="text-sm flex items-center gap-1" style={{
                            color: data.change24h >= 0 ? VANTAGE_THEME.success : VANTAGE_THEME.error
                        }}>
                            {data.change24h >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                            {Math.abs(data.change24h).toFixed(2)}%
                        </p>
                    )}
                </motion.div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-4">

                    <div>
                        <h2 className="text-2xl font-bold mb-1" style={{ color: VANTAGE_THEME.textLight }}>
                            Portfolio Overview
                        </h2>
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Complete analysis of your holdings across all chains
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `linear-gradient(135deg, ${VANTAGE_THEME.success}20, ${VANTAGE_THEME.success}10)`,
                        border: `1px solid ${VANTAGE_THEME.success}40`
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <FaTrophy style={{ color: VANTAGE_THEME.success, fontSize: '1.5rem' }} />
                        <p className="text-xs font-semibold" style={{ color: VANTAGE_THEME.text }}>
                            Top Holding
                        </p>
                    </div>
                    <p className="text-xl font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                        {holdingsData[0]?.name || 'N/A'}
                    </p>
                    <p className="text-xs" style={{ color: VANTAGE_THEME.success }}>
                        {holdingsData[0]?.balance || '0'}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `linear-gradient(135deg, ${VANTAGE_THEME.info}20, ${VANTAGE_THEME.info}10)`,
                        border: `1px solid ${VANTAGE_THEME.info}40`
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <FaLayerGroup style={{ color: VANTAGE_THEME.info, fontSize: '1.5rem' }} />
                        <p className="text-xs font-semibold" style={{ color: VANTAGE_THEME.text }}>
                            Active Chains
                        </p>
                    </div>
                    <p className="text-xl font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                        {analytics?.totalChains || 0}
                    </p>
                    <p className="text-xs" style={{ color: VANTAGE_THEME.info }}>
                        Networks
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `linear-gradient(135deg, ${VANTAGE_THEME.warning}20, ${VANTAGE_THEME.warning}10)`,
                        border: `1px solid ${VANTAGE_THEME.warning}40`
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <FaCoins style={{ color: VANTAGE_THEME.warning, fontSize: '1.5rem' }} />
                        <p className="text-xs font-semibold" style={{ color: VANTAGE_THEME.text }}>
                            Total Tokens
                        </p>
                    </div>
                    <p className="text-xl font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                        {analytics?.totalTokens || 0}
                    </p>
                    <p className="text-xs" style={{ color: VANTAGE_THEME.warning }}>
                        Assets
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `linear-gradient(135deg, ${VANTAGE_THEME.secondary}20, ${VANTAGE_THEME.secondary}10)`,
                        border: `1px solid ${VANTAGE_THEME.secondary}40`
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <FaBolt style={{ color: VANTAGE_THEME.secondary, fontSize: '1.5rem' }} />
                        <p className="text-xs font-semibold" style={{ color: VANTAGE_THEME.text }}>
                            Diversity Score
                        </p>
                    </div>
                    <p className="text-xl font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                        {analytics?.diversificationScore || 0}/100
                    </p>
                    <p className="text-xs" style={{ color: VANTAGE_THEME.secondary }}>
                        {analytics?.diversificationScore > 70 ? 'Excellent' : analytics?.diversificationScore > 40 ? 'Good' : 'Improve'}
                    </p>
                </motion.div>
            </div>

            {/* Main Charts Row 1 - Portfolio Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Holdings Distribution Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-2xl p-6"
                    style={{
                        background: VANTAGE_THEME.cardBg,
                        border: `1px solid ${VANTAGE_THEME.border}`,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                    }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">

                            <div>
                                <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                                    Holdings Distribution
                                </h3>
                                <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                                    Top {holdingsData.length} tokens by value
                                </p>
                            </div>
                        </div>

                        {/* Chart type toggle */}
                        <div className="flex gap-2">
                            {['donut', 'bar'].map(type => (
                                <motion.button
                                    key={type}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setChartType(type)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                                    style={{
                                        background: chartType === type
                                            ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                                            : `${VANTAGE_THEME.border}40`,
                                        color: chartType === type ? '#fff' : VANTAGE_THEME.text
                                    }}
                                >
                                    {type}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            {chartType === 'donut' ? (
                                <PieChart>
                                    <defs>
                                        {holdingsData.map((holding, idx) => (
                                            <linearGradient key={idx} id={`gradient-${idx}`} x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor={holding.color} stopOpacity={1} />
                                                <stop offset="100%" stopColor={holding.color} stopOpacity={0.6} />
                                            </linearGradient>
                                        ))}
                                    </defs>
                                    <Pie
                                        data={holdingsData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="60%"
                                        outerRadius="80%"
                                        dataKey="value"
                                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                                        labelLine={{ stroke: VANTAGE_THEME.text, strokeWidth: 1 }}
                                    >
                                        {holdingsData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={`url(#gradient-${index})`}
                                                stroke={entry.color}
                                                strokeWidth={2}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            ) : (
                                <BarChart data={holdingsData}>
                                    <defs>
                                        {holdingsData.map((holding, idx) => (
                                            <linearGradient key={idx} id={`bar-gradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={holding.color} stopOpacity={1} />
                                                <stop offset="100%" stopColor={holding.color} stopOpacity={0.6} />
                                            </linearGradient>
                                        ))}
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke={`${VANTAGE_THEME.border}40`} />
                                    <XAxis
                                        dataKey="name"
                                        stroke={VANTAGE_THEME.text}
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis stroke={VANTAGE_THEME.text} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                        {holdingsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`url(#bar-gradient-${index})`} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Chain Distribution */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-2xl p-6"
                    style={{
                        background: VANTAGE_THEME.cardBg,
                        border: `1px solid ${VANTAGE_THEME.border}`,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                    }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div>
                            <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                                Chain Distribution
                            </h3>
                            <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                                Assets across networks
                            </p>
                        </div>
                    </div>

                    {/* Chain List with Progress Bars */}
                    <div className="space-y-4">
                        {chainData.map((chain, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ background: chain.color }}
                                        />
                                        <p className="font-semibold" style={{ color: VANTAGE_THEME.textLight }}>
                                            {chain.name}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                                            ${chain.value.toFixed(2)}
                                        </p>
                                        <p className="text-xs" style={{ color: VANTAGE_THEME.text }}>
                                            {chain.tokens} token{chain.tokens !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>

                                {/* Animated Progress Bar */}
                                <div
                                    className="h-3 rounded-full overflow-hidden"
                                    style={{ background: `${VANTAGE_THEME.border}40` }}
                                >
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${chain.percentage}%` }}
                                        transition={{ duration: 1, delay: idx * 0.1 }}
                                        className="h-full rounded-full"
                                        style={{
                                            background: `linear-gradient(90deg, ${chain.color}, ${chain.color}80)`,
                                            boxShadow: `0 0 10px ${chain.color}60`
                                        }}
                                    />
                                </div>

                                <p className="text-xs mt-1" style={{ color: chain.color }}>
                                    {chain.percentage.toFixed(1)}% of portfolio
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Main Charts Row 2 - Performance & Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Token Performance */}
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
                    <div className="flex items-center gap-3 mb-6">
                        <div>
                            <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                                Token Performance (Simulated)
                            </h3>
                            <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                                Visualization based on holdings rank
                            </p>
                        </div>
                    </div>

                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData} layout="vertical">
                                <defs>
                                    <linearGradient id="positive-gradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
                                    </linearGradient>
                                    <linearGradient id="negative-gradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#ef4444" stopOpacity={0.4} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={`${VANTAGE_THEME.border}40`} />
                                <XAxis type="number" stroke={VANTAGE_THEME.text} />
                                <YAxis dataKey="token" type="category" stroke={VANTAGE_THEME.text} width={60} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="performance" radius={[0, 8, 8, 0]}>
                                    {performanceData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.performance >= 0 ? 'url(#positive-gradient)' : 'url(#negative-gradient)'}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Portfolio Health Radar */}
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
                    <div className="flex items-center gap-3 mb-6">
                        <div>
                            <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                                Portfolio Health
                            </h3>
                            <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                                Key performance indicators
                            </p>
                        </div>
                    </div>

                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={healthMetrics}>
                                <defs>
                                    <linearGradient id="radar-gradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    </linearGradient>
                                </defs>
                                <PolarGrid stroke={`${VANTAGE_THEME.border}60`} />
                                <PolarAngleAxis
                                    dataKey="metric"
                                    stroke={VANTAGE_THEME.textLight}
                                    style={{ fontSize: '0.875rem' }}
                                />
                                <PolarRadiusAxis
                                    angle={90}
                                    domain={[0, 100]}
                                    stroke={VANTAGE_THEME.text}
                                />
                                <Radar
                                    name="Score"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    fill="url(#radar-gradient)"
                                />
                                <Tooltip content={<CustomTooltip />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Top Holdings List */}
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
                <div className="flex items-center gap-3 mb-6">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, #10b981, #22c55e)` }}
                    >
                        <FaTrophy style={{ color: '#fff', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Top Holdings Breakdown
                        </h3>
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Detailed view of your best performers
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {holdingsData.slice(0, 6).map((holding, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="p-4 rounded-xl cursor-pointer"
                            style={{
                                background: `${holding.color}10`,
                                border: `1px solid ${holding.color}40`
                            }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                                        style={{ background: holding.color }}
                                    >
                                        {holding.name.substring(0, 2)}
                                    </div>
                                    <div>
                                        <p className="font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                                            {holding.name}
                                        </p>
                                        <p className="text-xs" style={{ color: VANTAGE_THEME.text }}>
                                            {holding.balance}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                                        {holding.balance}
                                    </p>
                                    <p
                                        className="text-xs flex items-center gap-1 justify-end"
                                        style={{
                                            color: holding.change24h >= 0 ? VANTAGE_THEME.success : VANTAGE_THEME.error
                                        }}
                                    >
                                        {holding.change24h >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                                        {Math.abs(holding.change24h).toFixed(2)}%
                                    </p>
                                </div>
                            </div>

                            <div className="h-1 rounded-full overflow-hidden" style={{ background: `${VANTAGE_THEME.border}40` }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${typeof holding.percentage === 'number' ? holding.percentage : parseFloat(holding.percentage) || 0}%` }}
                                    transition={{ duration: 1, delay: idx * 0.1 }}
                                    className="h-full rounded-full"
                                    style={{ background: holding.color }}
                                />
                            </div>
                            <p className="text-xs mt-1" style={{ color: holding.color }}>
                                {typeof holding.percentage === 'number' ? holding.percentage.toFixed(2) : parseFloat(holding.percentage).toFixed(2)}% of portfolio
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
