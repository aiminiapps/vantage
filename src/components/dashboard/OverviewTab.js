'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { FaChartPie, FaChartBar, FaClock, FaFire } from 'react-icons/fa';
import { VANTAGE_THEME } from './utils/theme';

export default function OverviewTab({ chainDistribution, topHoldings, analytics }) {
    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    className="px-4 py-2 rounded-lg shadow-lg"
                    style={{
                        background: VANTAGE_THEME.cardBg,
                        border: `1px solid ${VANTAGE_THEME.border}`
                    }}
                >
                    <p style={{ color: VANTAGE_THEME.textLight }} className="font-semibold">
                        {payload[0].name}
                    </p>
                    <p style={{ color: VANTAGE_THEME.primary }}>
                        Value: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Radar data for portfolio health
    const radarData = [
        { metric: 'Diversification', value: analytics.diversificationScore || 0, fullMark: 100 },
        { metric: 'Activity', value: analytics.activityScore || 0, fullMark: 100 },
        { metric: 'Risk', value: 100 - (analytics.riskScore || 0), fullMark: 100 }
    ];

    return (
        <div className="space-y-6">
            {/* Chart Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chain Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl"
                    style={{
                        background: VANTAGE_THEME.cardBg,
                        border: `1px solid ${VANTAGE_THEME.border}`
                    }}
                >
                    <div className="flex items-center gap-2 mb-6">
                        <FaChartPie style={{ color: VANTAGE_THEME.primary }} />
                        <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Chain Distribution
                        </h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chainDistribution}
                                cx="50%"
                                cy="50%"
                                label dataKey="value"
                                nameKey="name"
                                fill={VANTAGE_THEME.primary}
                            >
                                {chainDistribution.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={VANTAGE_THEME.chart.primary[index % VANTAGE_THEME.chart.primary.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Top Holdings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl"
                    style={{
                        background: VANTAGE_THEME.cardBg,
                        border: `1px solid ${VANTAGE_THEME.border}`
                    }}
                >
                    <div className="flex items-center gap-2 mb-6">
                        <FaChartBar style={{ color: VANTAGE_THEME.secondary }} />
                        <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Top Holdings
                        </h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topHoldings.slice(0, 5)}>
                            <XAxis dataKey="symbol" stroke={VANTAGE_THEME.text} />
                            <YAxis stroke={VANTAGE_THEME.text} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" fill={VANTAGE_THEME.secondary} radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Portfolio Health */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-2xl"
                    style={{
                        background: VANTAGE_THEME.cardBg,
                        border: `1px solid ${VANTAGE_THEME.border}`
                    }}
                >
                    <div className="flex items-center gap-2 mb-6">
                        <FaFire style={{ color: VANTAGE_THEME.warning }} />
                        <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Portfolio Health
                        </h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke={VANTAGE_THEME.border} />
                            <PolarAngleAxis dataKey="metric" stroke={VANTAGE_THEME.text} />
                            <PolarRadiusAxis stroke={VANTAGE_THEME.text} />
                            <Radar
                                name="Score"
                                dataKey="value"
                                stroke={VANTAGE_THEME.primary}
                                fill={VANTAGE_THEME.primary}
                                fillOpacity={0.6}
                            />
                            <Tooltip content={<CustomTooltip />} />
                        </RadarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-2xl"
                    style={{
                        background: VANTAGE_THEME.cardBg,
                        border: `1px solid ${VANTAGE_THEME.border}`
                    }}
                >
                    <div className="flex items-center gap-2 mb-6">
                        <FaClock style={{ color: VANTAGE_THEME.info }} />
                        <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Recent Activity
                        </h3>
                    </div>
                    <div className="space-y-3">
                        {analytics.patterns?.recentActivity ? (
                            <div className="text-center py-8">
                                <p style={{ color: VANTAGE_THEME.success }}>✓ Active in last 30 days</p>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p style={{ color: VANTAGE_THEME.textDark }}>No recent activity</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
