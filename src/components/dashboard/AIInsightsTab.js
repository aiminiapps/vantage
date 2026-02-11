'use client';

import { motion } from 'framer-motion';
import { FaLightbulb, FaCheckCircle, FaExclamationTriangle, FaFire, FaChartLine } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { VANTAGE_THEME } from './utils/theme';

export default function AIInsightsTab({ insights, analytics }) {
    // Generate insights if not provided
    const defaultInsights = {
        summary: `Your portfolio shows **${analytics.totalTokens} tokens** across **${analytics.totalChains} chains**. Diversification score is **${analytics.diversificationScore}/100**.`,
        strengths: [
            `Multi-chain diversification across ${analytics.totalChains} networks`,
            `Total of ${analytics.totalTokens} unique tokens`,
            `${analytics.patterns?.crossChainUser ? 'Active cross-chain user' : 'Single-chain focus'}`
        ],
        warnings: [
            analytics.diversificationScore < 50 ? 'Low diversification - consider spreading across more tokens' : null,
            analytics.riskScore < 40 ? 'High risk profile detected' : null,
            analytics.activityScore < 30 ? 'Low activity - portfolio appears dormant' : null
        ].filter(Boolean),
        recommendations: [
            'Consider adding stablecoins for stability',
            'Monitor gas fees across different chains',
            'Review token allocation for better balance',
            'Track portfolio performance regularly'
        ]
    };

    const displayInsights = insights || defaultInsights;

    return (
        <div className="space-y-6">
            {/* Summary Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl"
                style={{
                    background: `linear-gradient(135deg, ${VANTAGE_THEME.primary}10 0%, ${VANTAGE_THEME.secondary}10 100%)`,
                    border: `1px solid ${VANTAGE_THEME.primary}40`
                }}
            >
                <div className="flex items-center gap-2 mb-4">
                    <FaChartLine style={{ color: VANTAGE_THEME.primary }} />
                    <h3 className="font-bold text-lg" style={{ color: VANTAGE_THEME.textLight }}>
                        Portfolio Summary
                    </h3>
                </div>
                <div
                    className="prose prose-invert max-w-none"
                    style={{ color: VANTAGE_THEME.text }}
                >
                    <ReactMarkdown>{displayInsights.summary}</ReactMarkdown>
                </div>
            </motion.div>

            {/* Strengths */}
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
                <div className="flex items-center gap-2 mb-4">
                    <FaCheckCircle style={{ color: VANTAGE_THEME.success }} />
                    <h3 className="font-bold text-lg" style={{ color: VANTAGE_THEME.textLight }}>
                        Strengths
                    </h3>
                </div>
                <ul className="space-y-3">
                    {displayInsights.strengths?.map((strength, idx) => (
                        <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-xl"
                            style={{ background: `${VANTAGE_THEME.success}10` }}
                        >
                            <div
                                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ background: `${VANTAGE_THEME.success}30` }}
                            >
                                <span style={{ color: VANTAGE_THEME.success }}>✓</span>
                            </div>
                            <span style={{ color: VANTAGE_THEME.textLight }}>{strength}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            {/* Warnings */}
            {displayInsights.warnings && displayInsights.warnings.length > 0 && (
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
                    <div className="flex items-center gap-2 mb-4">
                        <FaExclamationTriangle style={{ color: VANTAGE_THEME.warning }} />
                        <h3 className="font-bold text-lg" style={{ color: VANTAGE_THEME.textLight }}>
                            Warnings
                        </h3>
                    </div>
                    <ul className="space-y-3">
                        {displayInsights.warnings.map((warning, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 p-3 rounded-xl"
                                style={{ background: `${VANTAGE_THEME.warning}10` }}
                            >
                                <div
                                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{ background: `${VANTAGE_THEME.warning}30` }}
                                >
                                    <span style={{ color: VANTAGE_THEME.warning }}>!</span>
                                </div>
                                <span style={{ color: VANTAGE_THEME.textLight }}>{warning}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {/* Recommendations */}
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
                <div className="flex items-center gap-2 mb-4">
                    <FaLightbulb style={{ color: VANTAGE_THEME.info }} />
                    <h3 className="font-bold text-lg" style={{ color: VANTAGE_THEME.textLight }}>
                        Recommendations
                    </h3>
                </div>
                <ul className="space-y-3">
                    {displayInsights.recommendations?.map((rec, idx) => (
                        <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer"
                            style={{ background: `${VANTAGE_THEME.info}10` }}
                        >
                            <div
                                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ background: `${VANTAGE_THEME.info}30` }}
                            >
                                <FaFire style={{ color: VANTAGE_THEME.info, fontSize: '0.75rem' }} />
                            </div>
                            <span style={{ color: VANTAGE_THEME.textLight }}>{rec}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
}
