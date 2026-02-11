'use client';

import { motion } from 'framer-motion';
import { FaWallet, FaGlobe, FaChartPie, FaShieldAlt } from 'react-icons/fa';
import { VANTAGE_THEME } from './utils/theme';

export default function DashboardStats({ analytics }) {
    const stats = [
        {
            icon: FaWallet,
            label: 'Total Value',
            value: `$${(analytics.totalValue || 0).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`,
            change: analytics.totalPnL || 0,
            changePercent: (analytics.totalValue || 0) > 0
                ? (((analytics.totalPnL || 0) / analytics.totalValue) * 100).toFixed(2)
                : 0,
            isPrimary: true,
            gradient: `linear-gradient(135deg, ${VANTAGE_THEME.primary} 0%, ${VANTAGE_THEME.secondary} 100%)`
        },
        {
            icon: FaGlobe,
            label: 'Active Chains',
            value: analytics.totalChains || analytics.activeChains || 0,
            subtext: `${analytics.totalTokens || 0} tokens`,
            badge: (analytics.totalChains || 0) >= 4 ? 'Excellent' : (analytics.totalChains || 0) >= 2 ? 'Good' : 'Limited',
            badgeColor: (analytics.totalChains || 0) >= 4 ? VANTAGE_THEME.success : (analytics.totalChains || 0) >= 2 ? VANTAGE_THEME.info : VANTAGE_THEME.text,
            gradient: `linear-gradient(135deg, ${VANTAGE_THEME.cardBg} 0%, ${VANTAGE_THEME.background} 100%)`
        },
        {
            icon: FaChartPie,
            label: 'Diversification',
            value: `${analytics.diversificationScore || 0}/100`,
            progress: analytics.diversificationScore || 0,
            badge: (analytics.diversificationScore || 0) > 70 ? 'Strong' : (analytics.diversificationScore || 0) > 50 ? 'Moderate' : 'Weak',
            badgeColor: (analytics.diversificationScore || 0) > 70 ? VANTAGE_THEME.success : (analytics.diversificationScore || 0) > 50 ? VANTAGE_THEME.warning : VANTAGE_THEME.error,
            gradient: `linear-gradient(135deg, ${VANTAGE_THEME.cardBg} 0%, ${VANTAGE_THEME.background} 100%)`
        },
        {
            icon: FaShieldAlt,
            label: 'Risk Score',
            value: `${analytics.riskScore || 0}/100`,
            badge: (analytics.riskScore || 0) > 70 ? 'Low Risk' : (analytics.riskScore || 0) > 40 ? 'Moderate' : 'High Risk',
            badgeColor: (analytics.riskScore || 0) > 70 ? VANTAGE_THEME.success : (analytics.riskScore || 0) > 40 ? VANTAGE_THEME.warning : VANTAGE_THEME.error,
            progress: analytics.riskScore || 0,
            gradient: `linear-gradient(135deg, ${VANTAGE_THEME.cardBg} 0%, ${VANTAGE_THEME.background} 100%)`
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {stats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative overflow-hidden rounded-2xl p-6 transition-all"
                    style={{
                        background: stat.gradient,
                        border: `1px solid ${VANTAGE_THEME.border}`
                    }}
                >
                    {/* Icon */}
                    <div className="flex items-center justify-between mb-4">
                        <div
                            className="p-3 rounded-xl"
                            style={{
                                background: stat.isPrimary
                                    ? `${VANTAGE_THEME.primary}20`
                                    : `${VANTAGE_THEME.secondary}10`
                            }}
                        >
                            <stat.icon
                                className="text-2xl"
                                style={{ color: stat.isPrimary ? VANTAGE_THEME.primary : VANTAGE_THEME.secondary }}
                            />
                        </div>
                        {stat.badge && (
                            <span
                                className="text-xs font-semibold px-3 py-1 rounded-full"
                                style={{
                                    background: `${stat.badgeColor}20`,
                                    color: stat.badgeColor
                                }}
                            >
                                {stat.badge}
                            </span>
                        )}
                    </div>

                    {/* Label */}
                    <div className="text-sm font-medium mb-2" style={{ color: VANTAGE_THEME.text }}>
                        {stat.label}
                    </div>

                    {/* Value */}
                    <div className="text-3xl font-bold mb-2" style={{ color: VANTAGE_THEME.textLight }}>
                        {stat.value}
                    </div>

                    {/* Subtext or Change */}
                    {stat.subtext && (
                        <div className="text-sm" style={{ color: VANTAGE_THEME.textDark }}>
                            {stat.subtext}
                        </div>
                    )}
                    {stat.change !== undefined && (
                        <div
                            className="text-sm font-medium"
                            style={{
                                color: stat.change >= 0 ? VANTAGE_THEME.success : VANTAGE_THEME.error
                            }}
                        >
                            {stat.change >= 0 ? '+' : ''}${stat.change.toFixed(2)} ({stat.changePercent}%)
                        </div>
                    )}

                    {/* Progress Bar */}
                    {stat.progress !== undefined && (
                        <div
                            className="mt-3 h-2 rounded-full overflow-hidden"
                            style={{ background: `${VANTAGE_THEME.border}` }}
                        >
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${stat.progress}%` }}
                                transition={{ delay: idx * 0.1 + 0.3, duration: 0.8 }}
                                className="h-full rounded-full"
                                style={{
                                    background: stat.isPrimary
                                        ? `linear-gradient(90deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                                        : stat.badgeColor
                                }}
                            />
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
