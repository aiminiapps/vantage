/**
 * VANTAGE Dashboard - Theme Configuration
 */

export const VANTAGE_THEME = {
    // Primary Colors
    primary: '#2471a4',
    secondary: '#38bdf8',

    // Background
    background: '#0B0D14',
    cardBg: '#1C2126',
    border: '#2A3138',

    // Text
    text: '#9CA3AF',
    textLight: '#E5E7EB',
    textDark: '#6B7280',

    // Status Colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Chart Colors
    chart: {
        primary: ['#2471a4', '#38bdf8', '#60a5fa', '#93c5fd', '#bfdbfe'],
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
    }
};

export const VANTAGE_GRADIENTS = {
    primary: 'linear-gradient(135deg, #2471a4 0%, #38bdf8 100%)',
    card: 'linear-gradient(135deg, #1C2126 0%, #0B0D14 100%)',
    overlay: 'linear-gradient(180deg, rgba(11,13,20,0) 0%, rgba(11,13,20,0.8) 100%)'
};

export const VANTAGE_INFO = {
    tokenName: 'VANTAGE',
    ticker: '$VANT',
    totalSupply: '1,000,000,000,000',
    supplyType: 'Fixed (No further minting)',
    docsUrl: 'https://vantage-ai.gitbook.io/vantage-ai-docs/'
};
