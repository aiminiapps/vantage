'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaLayerGroup, FaGamepad, FaRobot, FaFire, FaCoins } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { VANTAGE_THEME } from '../utils/theme';

/**
 * Sector Allocation Chart - Advanced Charts  
 * Colorful donut chart showing token distribution by sector
 */
export default function SectorAllocation({ tokens }) {
    const [viewMode, setViewMode] = useState('donut'); // 'donut' or' list'

    // Sector colors - vibrant and distinct
    const SECTOR_COLORS = {
        'DeFi': { color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)', icon: FaCoins },
        'Gaming': { color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #d946ef)', icon: FaGamepad },
        'AI': { color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #22c55e)', icon: FaRobot },
        'Meme': { color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)', icon: FaFire },
        'NFT': { color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)', icon: FaLayerGroup },
        'Exchange': { color: '#14b8a6', gradient: 'linear-gradient(135deg, #14b8a6, #06b6d4)', icon: FaCoins },
        'Infrastructure': { color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', icon: FaLayerGroup },
        'Other': { color: '#64748b', gradient: 'linear-gradient(135deg, #64748b, #94a3b8)', icon: FaLayerGroup }
    };

    // Categorize tokens by sector (simplified - in production, use API/database)
    const categorizeBySector = () => {
        if (!tokens || tokens.length === 0) return [];

        const sectorMap = {};

        tokens.forEach(token => {
            // Simple sector detection based on token symbol/name
            let sector = 'Other';
            const symbol = token.symbol.toUpperCase();
            const name = (token.name || '').toLowerCase();

            if (symbol.includes('SWAP') || symbol.includes('CAKE') || name.includes('swap')) {
                sector = 'DeFi';
            } else if (symbol.includes('GAME') || name.includes('game') || name.includes('play')) {
                sector = 'Gaming';
            } else if (symbol.includes('AI') || name.includes('artificial') || name.includes('gpt')) {
                sector = 'AI';
            } else if (symbol.includes('DOGE') || symbol.includes('SHIB') || symbol.includes('PEPE') || name.includes('meme')) {
                sector = 'Meme';
            } else if (symbol.includes('NFT') || name.includes('nft') || name.includes('ape')) {
                sector = 'NFT';
            } else if (symbol.includes('BNB') || symbol.includes('ETH') || name.includes('exchange')) {
                sector = 'Exchange';
            }

            if (!sectorMap[sector]) {
                sectorMap[sector] = {
                    sector,
                    value: 0,
                    tokens: [],
                    count: 0
                };
            }

            sectorMap[sector].value += token.valueUSD || 0;
            sectorMap[sector].tokens.push(token);
            sectorMap[sector].count += 1;
        });

        return Object.values(sectorMap).sort((a, b) => b.value - a.value);
    };

    const sectorData = categorizeBySector();
    const totalValue = sectorData.reduce((sum, s) => sum + s.value, 0);

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload[0]) {
            const data = payload[0].payload;
            const Icon = SECTOR_COLORS[data.sector]?.icon || FaLayerGroup;

            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl shadow-2xl backdrop-blur-md"
                    style={{
                        background: `${VANTAGE_THEME.cardBg}f0`,
                        border: `1px solid ${SECTOR_COLORS[data.sector]?.color || VANTAGE_THEME.border}`
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Icon style={{ color: SECTOR_COLORS[data.sector]?.color }} />
                        <p className="font-semibold" style={{ color: VANTAGE_THEME.textLight }}>
                            {data.sector}
                        </p>
                    </div>
                    <p className="text-sm mb-1" style={{ color: VANTAGE_THEME.text }}>
                        Value: ${data.value.toFixed(2)}
                    </p>
                    <p className="text-sm mb-1" style={{ color: VANTAGE_THEME.text }}>
                        Tokens: {data.count}
                    </p>
                    <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                        {data.percentage.toFixed(1)}% of portfolio
                    </p>
                </motion.div>
            );
        }
        return null;
    };

    // Prepare data with percentages
    const chartData = sectorData.map(s => ({
        ...s,
        percentage: totalValue > 0 ? (s.value / totalValue) * 100 : 0
    }));

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
                            background: `linear-gradient(135deg, #8b5cf6, #d946ef)`
                        }}
                    >
                        <FaLayerGroup style={{ color: '#fff', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Sector Allocation
                        </h3>
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Portfolio distribution by category
                        </p>
                    </div>
                </div>

                {/* View mode toggle */}
                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewMode('donut')}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                        style={{
                            background: viewMode === 'donut'
                                ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                                : `${VANTAGE_THEME.border}40`,
                            color: viewMode === 'donut' ? '#fff' : VANTAGE_THEME.text
                        }}
                    >
                        Chart
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewMode('list')}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                        style={{
                            background: viewMode === 'list'
                                ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                                : `${VANTAGE_THEME.border}40`,
                            color: viewMode === 'list' ? '#fff' : VANTAGE_THEME.text
                        }}
                    >
                        List
                    </motion.button>
                </div>
            </div>

            {viewMode === 'donut' ? (
                /* Donut Chart */
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <defs>
                                {Object.entries(SECTOR_COLORS).map(([sector, { color }]) => (
                                    <linearGradient key={sector} id={`gradient-${sector}`} x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor={color} stopOpacity={1} />
                                        <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                                    </linearGradient>
                                ))}
                            </defs>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="80%"
                                dataKey="value"
                                label={({ sector, percentage }) => `${sector}: ${percentage.toFixed(1)}%`}
                                labelLine={{ stroke: VANTAGE_THEME.text, strokeWidth: 1 }}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={`url(#gradient-${entry.sector})`}
                                        stroke={SECTOR_COLORS[entry.sector]?.color}
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                formatter={(value) => (
                                    <span style={{ color: VANTAGE_THEME.textLight }}>{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                /* List View */
                <div className="space-y-3">
                    {chartData.map((sector, idx) => {
                        const Icon = SECTOR_COLORS[sector.sector]?.icon || FaLayerGroup;

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-4 rounded-xl"
                                style={{
                                    background: `${SECTOR_COLORS[sector.sector]?.color}10`,
                                    border: `1px solid ${SECTOR_COLORS[sector.sector]?.color}40`
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                                            style={{ background: SECTOR_COLORS[sector.sector]?.gradient }}
                                        >
                                            <Icon style={{ color: '#fff' }} />
                                        </div>
                                        <div>
                                            <p className="font-semibold" style={{ color: VANTAGE_THEME.textLight }}>
                                                {sector.sector}
                                            </p>
                                            <p className="text-xs" style={{ color: VANTAGE_THEME.text }}>
                                                {sector.count} token{sector.count !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg" style={{ color: VANTAGE_THEME.textLight }}>
                                            ${sector.value.toFixed(2)}
                                        </p>
                                        <p className="text-sm" style={{ color: SECTOR_COLORS[sector.sector]?.color }}>
                                            {sector.percentage.toFixed(1)}%
                                        </p>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: `${VANTAGE_THEME.border}40` }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${sector.percentage}%` }}
                                        transition={{ duration: 1, delay: idx * 0.1 }}
                                        className="h-full rounded-full"
                                        style={{ background: SECTOR_COLORS[sector.sector]?.gradient }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
}
