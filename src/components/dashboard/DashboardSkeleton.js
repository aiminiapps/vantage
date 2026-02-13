'use client';

import { motion } from 'framer-motion';
import { VANTAGE_THEME } from './utils/theme';

/**
 * Advanced Skeleton Loader with Shine Effects
 * Premium loading animation for dashboard
 */
export default function DashboardSkeleton() {
    return (
        <div className="min-h-screen p-8" style={{ background: VANTAGE_THEME.background }}>
            {/* Header Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
            >
                <div className="flex items-center justify-between mb-6">
                    {/* Logo/Title skeleton */}
                    <div className="flex items-center gap-4">
                        <div
                            className="w-16 h-16 rounded-2xl skeleton-shine"
                            style={{ background: `${VANTAGE_THEME.border}40` }}
                        />
                        <div>
                            <div
                                className="h-8 w-48 rounded-lg mb-2 skeleton-shine"
                                style={{ background: `${VANTAGE_THEME.border}40` }}
                            />
                            <div
                                className="h-4 w-32 rounded skeleton-shine"
                                style={{ background: `${VANTAGE_THEME.border}40` }}
                            />
                        </div>
                    </div>

                    {/* Action buttons skeleton */}
                    <div className="flex gap-3">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="w-24 h-10 rounded-xl skeleton-shine"
                                style={{ background: `${VANTAGE_THEME.border}40` }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid Skeleton */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
                {[1, 2, 3, 4].map(i => (
                    <div
                        key={i}
                        className="p-6 rounded-2xl"
                        style={{
                            background: VANTAGE_THEME.cardBg,
                            border: `1px solid ${VANTAGE_THEME.border}`
                        }}
                    >
                        <div
                            className="h-12 w-12 rounded-xl mb-3 skeleton-shine"
                            style={{ background: `${VANTAGE_THEME.border}40` }}
                        />
                        <div
                            className="h-8 w-24 rounded mb-2 skeleton-shine"
                            style={{ background: `${VANTAGE_THEME.border}40` }}
                        />
                        <div
                            className="h-4 w-16 rounded skeleton-shine"
                            style={{ background: `${VANTAGE_THEME.border}40` }}
                        />
                    </div>
                ))}
            </motion.div>

            {/* Tabs Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2 mb-6"
            >
                {[1, 2, 3, 4, 5].map(i => (
                    <div
                        key={i}
                        className="h-10 w-32 rounded-xl skeleton-shine"
                        style={{ background: `${VANTAGE_THEME.border}40` }}
                    />
                ))}
            </motion.div>

            {/* Charts Grid Skeleton */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
            >
                {[1, 2].map(i => (
                    <div
                        key={i}
                        className="p-6 rounded-2xl"
                        style={{
                            background: VANTAGE_THEME.cardBg,
                            border: `1px solid ${VANTAGE_THEME.border}`
                        }}
                    >
                        {/* Chart header */}
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="h-6 w-48 rounded skeleton-shine"
                                style={{ background: `${VANTAGE_THEME.border}40` }}
                            />
                            <div
                                className="h-8 w-20 rounded-lg skeleton-shine"
                                style={{ background: `${VANTAGE_THEME.border}40` }}
                            />
                        </div>

                        {/* Chart body */}
                        <div
                            className="h-80 rounded-xl skeleton-shine"
                            style={{ background: `${VANTAGE_THEME.border}20` }}
                        />
                    </div>
                ))}
            </motion.div>

            {/* Large Chart Skeleton */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-2xl"
                style={{
                    background: VANTAGE_THEME.cardBg,
                    border: `1px solid ${VANTAGE_THEME.border}`
                }}
            >
                <div
                    className="h-6 w-64 rounded mb-4 skeleton-shine"
                    style={{ background: `${VANTAGE_THEME.border}40` }}
                />
                <div
                    className="h-96 rounded-xl skeleton-shine"
                    style={{ background: `${VANTAGE_THEME.border}20` }}
                />
            </motion.div>

            {/* Loading Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="fixed bottom-8 right-8 px-6 py-3 rounded-xl backdrop-blur-md"
                style={{
                    background: `${VANTAGE_THEME.cardBg}f0`,
                    border: `1px solid ${VANTAGE_THEME.border}`
                }}
            >
                <div className="flex items-center gap-3">
                    {/* Animated spinner */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 rounded-full border-2"
                        style={{
                            borderColor: `${VANTAGE_THEME.primary}40`,
                            borderTopColor: VANTAGE_THEME.primary
                        }}
                    />
                    <p className="font-medium" style={{ color: VANTAGE_THEME.textLight }}>
                        Loading dashboard...
                    </p>
                </div>
            </motion.div>

            {/* CSS for shine effect */}
            <style jsx>{`
                @keyframes shine {
                    0% {
                        background-position: -200% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }

                .skeleton-shine {
                    background: linear-gradient(
                        90deg,
                        ${VANTAGE_THEME.border}40 0%,
                        ${VANTAGE_THEME.border}80 50%,
                        ${VANTAGE_THEME.border}40 100%
                    );
                    background-size: 200% 100%;
                    animation: shine 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
