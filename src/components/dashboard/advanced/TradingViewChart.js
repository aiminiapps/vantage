'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaChartLine, FaExpand, FaCompress, FaCog } from 'react-icons/fa';
import { VANTAGE_THEME } from '../utils/theme';

/**
 * TradingView Advanced Chart Widget
 * Embeds TradingView widget with candlesticks, indicators, and drawing tools
 */
export default function TradingViewChart({ symbol = 'BINANCE:BNBUSDT', theme = 'dark' }) {
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [interval, setInterval] = useState('D'); // D = Daily
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || !containerRef.current) return;

        // Load TradingView widget script
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            if (window.TradingView) {
                new window.TradingView.widget({
                    container_id: 'tradingview_chart',
                    width: '100%',
                    height: isFullscreen ? window.innerHeight - 100 : 500,
                    symbol: symbol,
                    interval: interval,
                    timezone: 'Etc/UTC',
                    theme: 'dark',
                    style: '1', // Candlestick
                    locale: 'en',
                    toolbar_bg: VANTAGE_THEME.cardBg,
                    enable_publishing: false,
                    allow_symbol_change: true,
                    save_image: true,
                    studies: [
                        'MASimple@tv-basicstudies', // Moving Average
                        'RSI@tv-basicstudies' // RSI
                    ],
                    hidevolume: false,
                    hide_side_toolbar: false,
                    details: true,
                    hotshotlists: true,
                    calendar: true,
                    show_popup_button: true,
                    popup_width: '1000',
                    popup_height: '650',
                    support_host: 'https://www.tradingview.com'
                });
            }
        };
        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, [symbol, interval, isFullscreen]);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const intervals = [
        { label: '1m', value: '1' },
        { label: '5m', value: '5' },
        { label: '15m', value: '15' },
        { label: '1h', value: '60' },
        { label: '4h', value: '240' },
        { label: '1D', value: 'D' },
        { label: '1W', value: 'W' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-6 ${isFullscreen ? 'fixed inset-0 z-50 m-4' : ''}`}
            style={{
                background: VANTAGE_THEME.cardBg,
                border: `1px solid ${VANTAGE_THEME.border}`,
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                            background: `linear-gradient(135deg, #10b981, #22c55e)`
                        }}
                    >
                        <FaChartLine style={{ color: '#fff', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Advanced Price Chart
                        </h3>
                        <p className="text-sm font-mono" style={{ color: VANTAGE_THEME.text }}>
                            {symbol}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Interval selector */}
                    <div className="flex gap-1">
                        {intervals.map(int => (
                            <motion.button
                                key={int.value}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setInterval(int.value)}
                                className="px-2 py-1 rounded text-xs font-medium transition-all"
                                style={{
                                    background: interval === int.value
                                        ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                                        : `${VANTAGE_THEME.border}40`,
                                    color: interval === int.value ? '#fff' : VANTAGE_THEME.text
                                }}
                            >
                                {int.label}
                            </motion.button>
                        ))}
                    </div>

                    {/* Settings */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 rounded-lg transition-all"
                        style={{
                            background: showSettings ? `${VANTAGE_THEME.primary}20` : `${VANTAGE_THEME.border}40`,
                            color: showSettings ? VANTAGE_THEME.primary : VANTAGE_THEME.text
                        }}
                    >
                        <FaCog />
                    </motion.button>

                    {/* Fullscreen toggle */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleFullscreen}
                        className="p-2 rounded-lg transition-all"
                        style={{
                            background: `${VANTAGE_THEME.border}40`,
                            color: VANTAGE_THEME.textLight
                        }}
                    >
                        {isFullscreen ? <FaCompress /> : <FaExpand />}
                    </motion.button>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-4 rounded-xl"
                    style={{
                        background: `${VANTAGE_THEME.background}80`,
                        border: `1px solid ${VANTAGE_THEME.border}`
                    }}
                >
                    <p className="text-sm mb-2" style={{ color: VANTAGE_THEME.text }}>
                        💡 <strong>Chart Features:</strong> Candlestick patterns, Moving Averages (MA), RSI indicator,
                        drawing tools, and technical analysis. Click the chart to interact!
                    </p>
                </motion.div>
            )}

            {/* TradingView Chart Container */}
            <div
                id="tradingview_chart"
                ref={containerRef}
                className="rounded-xl overflow-hidden"
                style={{
                    background: VANTAGE_THEME.background,
                    border: `1px solid ${VANTAGE_THEME.border}`
                }}
            />

            {/* Footer info */}
            <div className="mt-4 flex items-center justify-between text-xs" style={{ color: VANTAGE_THEME.text }}>
                <p>Powered by TradingView</p>
                <p>Real-time data • Advanced indicators</p>
            </div>
        </motion.div>
    );
}
