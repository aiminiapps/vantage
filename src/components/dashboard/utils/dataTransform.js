/**
 * VANTAGE Dashboard - Data Transformation Utilities
 */

/**
 * Convert hex balance to decimal number
 */
function hexToDecimal(hexString, decimals = 18) {
    try {
        if (!hexString || hexString === '0x0' || hexString === '0x0000000000000000000000000000000000000000000000000000000000000000') {
            return 0;
        }

        // Remove 0x prefix if present
        const hex = hexString.startsWith('0x') ? hexString.slice(2) : hexString;

        // Convert hex to BigInt
        const bigIntValue = BigInt('0x' + hex);

        // Convert to decimal with proper decimal places
        const divisor = BigInt(10 ** decimals);
        const integerPart = bigIntValue / divisor;
        const remainder = bigIntValue % divisor;

        // Combine integer and decimal parts
        const decimalValue = Number(integerPart) + Number(remainder) / Number(divisor);

        return decimalValue;
    } catch (error) {
        console.error('Hex conversion error:', error, hexString);
        return 0;
    }
}

/**
 * Transform Alchemy API response to display format
 */
export function transformAlchemyData(alchemyResponse) {
    const { chains, analytics, wallet } = alchemyResponse;

    console.log('🔄 Transforming data...', { chains, analytics });

    // Extract all tokens from chains
    const allTokens = chains?.flatMap(chain =>
        chain.tokens?.map(token => {
            const balance = hexToDecimal(token.balance, token.decimals || 18);

            return {
                symbol: token.symbol || '???',
                name: token.name || 'Unknown Token',
                balance: balance,
                value: balance, // Same as balance for now
                contractAddress: token.contractAddress,
                decimals: token.decimals,
                chain: chain.chain || chain.chainName || 'Unknown',
                logo: token.logo || null,
                change: 0
            };
        }) || []
    ) || [];

    // Filter out tokens with 0 balance
    const tokensWithBalance = allTokens.filter(t => t.balance > 0);

    console.log(`✅ Extracted ${allTokens.length} tokens, ${tokensWithBalance.length} with balance > 0`);

    // Transform chain distribution from object to array
    const chainDistribution = Object.entries(analytics?.chainDistribution || {}).map(
        ([chainName, txCount], idx) => ({
            name: chainName,
            value: txCount || 0,
            percentage: (analytics?.totalTransactions || 0) > 0
                ? ((txCount / analytics.totalTransactions) * 100).toFixed(1)
                : 0,
            tokenCount: chains?.find(c => (c.chain || c.chainName) === chainName)?.tokens?.length || 0
        })
    );

    // Build top holdings (only tokens with balance > 0)
    const topHoldings = tokensWithBalance
        .sort((a, b) => b.balance - a.balance)
        .slice(0, 50) // Show up to 50 tokens
        .map((token, idx) => ({
            ...token,
            rank: idx + 1,
            change: 0,
            valueUSD: 0
        }));

    console.log(`📊 Top holdings: ${topHoldings.length} tokens with balance`);

    // Calculate total value (we'll need prices for accurate USD value)
    const totalTokenBalance = topHoldings.reduce((sum, t) => sum + t.balance, 0);

    // Build P&L data
    const pnlData = tokensWithBalance.slice(0, 15).map(token => ({
        symbol: token.symbol,
        name: token.name,
        totalPnL: 0,
        realized: 0,
        unrealized: 0,
        profit: 0,
        loss: 0
    }));

    const transformed = {
        wallet,
        chains: chains || [],
        analytics: {
            ...analytics,
            totalTokens: tokensWithBalance.length, // Update to only count tokens with balance
            totalValue: 0, // Will be updated with prices
            totalPnL: 0,
        },
        allTokens: tokensWithBalance, // Only return tokens with balance
        chainDistribution,
        topHoldings,
        pnlData
    };

    console.log('✨ Transformation complete:', transformed);

    return transformed;
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
