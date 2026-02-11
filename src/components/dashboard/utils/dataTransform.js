/**
 * VANTAGE Dashboard - Data Transformation Utilities
 */

/**
 * Transform Alchemy API response to display format
 */
export function transformAlchemyData(alchemyResponse) {
    const { chains, analytics, wallet } = alchemyResponse;

    // Extract all tokens from chains
    const allTokens = chains?.flatMap(chain =>
        chain.tokens?.map(token => ({
            symbol: token.symbol || 'UNKNOWN',
            name: token.name || 'Unknown Token',
            balance: parseFloat(token.balance) || 0,
            value: parseFloat(token.balance) || 0,
            contractAddress: token.contractAddress,
            decimals: token.decimals,
            chain: chain.chainName || chain.chain,
            logo: token.logo || null,
            change: 0 // Will be updated with CoinGecko data
        })) || []
    ) || [];

    // Transform chain distribution from object to array
    const chainDistribution = Object.entries(analytics.chainDistribution || {}).map(
        ([chainName, txCount], idx) => ({
            name: chainName,
            value: txCount,
            percentage: analytics.totalTransactions > 0
                ? ((txCount / analytics.totalTransactions) * 100).toFixed(1)
                : 0,
            tokenCount: chains.find(c => c.chainName === chainName)?.tokens?.length || 0
        })
    );

    // Build top holdings
    const topHoldings = allTokens
        .sort((a, b) => b.balance - a.balance)
        .slice(0, 20)
        .map((token, idx) => ({
            ...token,
            rank: idx + 1,
            change: 0, // Placeholder for future price integration
            valueUSD: 0 // Placeholder for future price integration
        }));

    // Build P&L data (placeholder)
    const pnlData = allTokens.slice(0, 15).map(token => ({
        symbol: token.symbol,
        name: token.name,
        totalPnL: 0,
        realized: 0,
        unrealized: 0,
        profit: 0,
        loss: 0
    }));

    return {
        wallet,
        chains,
        analytics: {
            ...analytics,
            totalValue: 0, // Placeholder
            totalPnL: 0, // Placeholder
        },
        allTokens,
        chainDistribution,
        topHoldings,
        pnlData
    };
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format wallet address (0x...1234)
 */
export function formatAddress(address, chars = 4) {
    if (!address) return '';
    return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

/**
 * Get risk level label
 */
export function getRiskLevel(score) {
    if (score >= 70) return 'Low Risk';
    if (score >= 40) return 'Moderate';
    return 'High Risk';
}

/**
 * Get risk level color
 */
export function getRiskColor(score) {
    if (score >= 70) return 'green';
    if (score >= 40) return 'yellow';
    return 'red';
}

/**
 * Get cache age in minutes
 */
export function getCacheAge(address) {
    if (typeof window === 'undefined') return null;

    try {
        const cached = localStorage.getItem(
            `vantage_wallet_${address.toLowerCase()}`
        );

        if (!cached) return null;

        const cacheData = JSON.parse(cached);
        const ageMs = Date.now() - cacheData.timestamp;
        return Math.floor(ageMs / 60000); // Convert to minutes
    } catch (error) {
        return null;
    }
}
