'use client';

import { motion } from 'framer-motion';
import { FaLightbulb, FaCheckCircle, FaExclamationTriangle, FaFire, FaChartLine } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { VANTAGE_THEME } from './utils/theme';

export default function AIInsightsTab({ insights, analytics }) {
    // Handle insights data structure
    let displayInsights = {
        summary: '',
        strengths: [],
        warnings: [],
        recommendations: []
    };

    if (insights) {
        // Handle API response structure
        if (typeof insights === 'string') {
            displayInsights.summary = insights;
        } else if (insights.insights && Array.isArray(insights.insights)) {
            // Extract insights from API response
            displayInsights.summary = insights.summary || `Portfolio analysis for **${analytics.totalTokens} tokens** across **${analytics.totalChains} chains**.`;
            displayInsights.strengths = insights.insights
                .filter(i => i.type === 'strength' || i.priority === 'high')
                .map(i => typeof i === 'string' ? i : (i.description || i.title || 'Insight available'));
            displayInsights.warnings = insights.insights
                .filter(i => i.type === 'warning' || i.type === 'caution')
                .map(i => typeof i === 'string' ? i : (i.description || i.title || 'Warning'));
            displayInsights.recommendations = insights.insights
                .filter(i => i.type === 'recommendation' || i.type === 'action')
                .map(i => typeof i === 'string' ? i : (i.description || i.title || 'Recommendation'));
        } else if (insights.summary || insights.strengths || insights.recommendations) {
            // Direct structure
            displayInsights = {
                summary: insights.summary || '',
                strengths: Array.isArray(insights.strengths) ? insights.strengths : [],
                warnings: Array.isArray(insights.warnings) ? insights.warnings : [],
                recommendations: Array.isArray(insights.recommendations) ? insights.recommendations : []
            };
        }
    }

    // Generate default insights if empty
    if (!displayInsights.summary) {
        displayInsights.summary = `Your portfolio shows **${analytics.totalTokens || 0} tokens** across **${analytics.totalChains || 0} chains**. Diversification score is **${analytics.diversificationScore || 0}/100**.`;
    }

    if (displayInsights.strengths.length === 0) {
        displayInsights.strengths = [
            `Multi-chain presence across ${analytics.totalChains || 0} networks`,
            `Holding ${analytics.totalTokens || 0} unique tokens`,
            `${analytics.patterns?.crossChainUser ? 'Active cross-chain user' : 'Single-chain focused'}`
        ];
    }

    if (displayInsights.recommendations.length === 0) {
        displayInsights.recommendations = [
            'Consider adding stablecoins for portfolio stability',
            'Monitor gas fees across different chains',
            'Review token allocation regularly',
            'Set price alerts for key holdings'
        ];
    }

    if (displayInsights.warnings.length === 0 && analytics) {
        const potentialWarnings = [
            (analytics.diversificationScore || 0) < 50 ? 'Low diversification - consider spreading across more tokens' : null,
            (analytics.riskScore || 0) < 40 ? 'High risk profile detected in portfolio' : null,
            (analytics.activityScore || 0) < 30 ? 'Low activity - portfolio appears dormant' : null
        ].filter(Boolean);

        if (potentialWarnings.length > 0) {
            displayInsights.warnings = potentialWarnings;
        }
    }

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
            {displayInsights.strengths && displayInsights.strengths.length > 0 && (
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
                        {displayInsights.strengths.map((strength, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 p-3 rounded-xl"
                                style={{ background: `${VANTAGE_THEME.success}10` }}
                            >
                                <div
                                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ background: `${VANTAGE_THEME.success}30` }}
                                >
                                    <span style={{ color: VANTAGE_THEME.success }}>✓</span>
                                </div>
                                <span style={{ color: VANTAGE_THEME.textLight }}>{String(strength)}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}

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
                                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ background: `${VANTAGE_THEME.warning}30` }}
                                >
                                    <span style={{ color: VANTAGE_THEME.warning }}>!</span>
                                </div>
                                <span style={{ color: VANTAGE_THEME.textLight }}>{String(warning)}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {/* Recommendations */}
            {displayInsights.recommendations && displayInsights.recommendations.length > 0 && (
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
                        {displayInsights.recommendations.map((rec, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 p-3 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer"
                                style={{ background: `${VANTAGE_THEME.info}10` }}
                            >
                                <div
                                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ background: `${VANTAGE_THEME.info}30` }}
                                >
                                    <FaFire style={{ color: VANTAGE_THEME.info, fontSize: '0.75rem' }} />
                                </div>
                                <span style={{ color: VANTAGE_THEME.textLight }}>{String(rec)}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
}
