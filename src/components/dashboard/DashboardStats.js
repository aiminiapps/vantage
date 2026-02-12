'use client';

import { motion } from 'framer-motion';
import { FaWallet, FaLayerGroup, FaChartPie, FaShieldAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { VANTAGE_THEME } from './utils/theme';

export default function DashboardStats({ analytics }) {
    // Calculate real metrics
    const totalValue = analytics?.totalValue || 0;
    const totalChange = analytics?.totalPnL || 0;
    const changePercent = analytics?.totalChangePercent || 0;
    const activeChains = analytics?.totalChains || 0;
    const totalTokens = analytics?.totalTokens || 0;
    const diversificationScore = analytics?.diversificationScore || 0;
    const riskScore = analytics?.riskScore || 0;

    // Determine badge levels
    const getDiversificationBadge = (score) => {
        if (score >= 80) return { label: 'Excellent', color: VANTAGE_THEME.success };
        if (score >= 60) return { label: 'Strong', color: VANTAGE_THEME.info };
        if (score >= 40) return { label: 'Moderate', color: VANTAGE_THEME.warning };
        return { label: 'Limited', color: VANTAGE_THEME.error };
    };

    const getRiskBadge = (score) => {
        if (score >= 70) return { label: 'Low Risk', color: VANTAGE_THEME.success };
        if (score >= 40) return { label: 'Moderate', color: VANTAGE_THEME.warning };
        return { label: 'High Risk', color: VANTAGE_THEME.error };
    };

    const divBadge = getDiversificationBadge(diversificationScore);
    const riskBadge = getRiskBadge(riskScore);

    const stats = [
        {
            icon: FaWallet,
            label: 'Total Value',
            value: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            change: totalChange,
            changePercent: changePercent,
            showChange: true,
            gradient: `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`,
            iconColor: '#fff'
        },
        {
            icon: FaLayerGroup,
            label: 'Active Chains',
            value: activeChains,
            subtext: `${totalTokens} tokens`,
            badge: activeChains >= 3 ? 'Multi-Chain' : 'Single-Chain',
            badgeColor: activeChains >= 3 ? VANTAGE_THEME.success : VANTAGE_THEME.info,
            gradient: `linear-gradient(135deg, #6366f1, #8b5cf6)`,
            iconColor: '#fff'
        },
        {
            icon: FaChartPie,
            label: 'Diversification',
            value: `${diversificationScore}/100`,
            progress: diversificationScore,
            badge: divBadge.label,
            badgeColor: divBadge.color,
            gradient: `linear-gradient(135deg, #10b981, #14b8a6)`,
            iconColor: '#fff'
        },
        {
            icon: FaShieldAlt,
            label: 'Risk Score',
            value: `${riskScore}/100`,
            progress: riskScore,
            badge: riskBadge.label,
            badgeColor: riskBadge.color,
            gradient: `linear-gradient(135deg, #f59e0b, #ef4444)`,
            iconColor: '#fff'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative overflow-hidden rounded-2xl p-6"
                    style={{
                        background: VANTAGE_THEME.cardBg,
                        border: `1px solid ${VANTAGE_THEME.border}`,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                    }}
                >
                    {/* Gradient Background */}
                    <div
                        className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-3xl"
                        style={{ background: stat.gradient }}
                    />

                    {/* Icon */}
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                        style={{ background: stat.gradient }}
                    >
                        <stat.icon style={{ color: stat.iconColor, fontSize: '1.5rem' }} />
                    </div>

                    {/* Label */}
                    <p className="text-sm font-medium mb-2" style={{ color: VANTAGE_THEME.text }}>
                        {stat.label}
                    </p>

                    {/* Value */}
                    <div className="flex items-baseline gap-2 mb-3">
                        <h3 className="text-3xl font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            {stat.value}
                        </h3>

                        {/* Change Indicator */}
                        {stat.showChange && (
                            <div className="flex items-center gap-1">
                                {stat.changePercent >= 0 ? (
                                    <FaArrowUp style={{ color: VANTAGE_THEME.success, fontSize: '0.875rem' }} />
                                ) : (
                                    <FaArrowDown style={{ color: VANTAGE_THEME.error, fontSize: '0.875rem' }} />
                                )}
                                <span
                                    className="text-sm font-semibold"
                                    style={{ color: stat.changePercent >= 0 ? VANTAGE_THEME.success : VANTAGE_THEME.error }}
                                >
                                    {Math.abs(stat.changePercent).toFixed(2)}%
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Subtext or Change Value */}
                    {stat.showChange && (
                        <p className="text-sm mb-2" style={{ color: VANTAGE_THEME.text }}>
                            {stat.change >= 0 ? '+' : ''}${stat.change.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    )}

                    {stat.subtext && (
                        <p className="text-sm mb-2" style={{ color: VANTAGE_THEME.text }}>
                            {stat.subtext}
                        </p>
                    )}

                    {/* Badge */}
                    {stat.badge && (
                        <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                                background: `${stat.badgeColor}20`,
                                color: stat.badgeColor,
                                border: `1px solid ${stat.badgeColor}40`
                            }}
                        >
                            {stat.badge}
                        </span>
                    )}

                    {/* Progress Bar */}
                    {stat.progress !== undefined && (
                        <div className="mt-3">
                            <div
                                className="h-2 rounded-full overflow-hidden"
                                style={{ background: `${VANTAGE_THEME.border}` }}
                            >
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stat.progress}%` }}
                                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                                    className="h-full rounded-full"
                                    style={{ background: stat.gradient }}
                                />
                            </div>
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
