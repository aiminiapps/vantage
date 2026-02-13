/**
 * VANTAGE Dashboard - Data Transformation Utilities
 */

/**
 * Convert hex balance to decimal number with proper precision
 */
function hexToDecimal(hexString, decimals = 18) {
    try {
        if (!hexString || hexString === '0x0' || hexString === '0x0000000000000000000000000000000000000000000000000000000000000000') {
            return 0;
        }

        // Remove 0x prefix and leading zeros
        const hex = hexString.replace(/^0x/, '');

        // Convert hex to decimal string
        let decimalStr = '0';
        for (let i = 0; i < hex.length; i++) {
            const digit = parseInt(hex[i], 16);
            decimalStr = multiplyBy16AndAdd(decimalStr, digit);
        }

        // Apply decimals
        if (decimals === 0) {
            return parseFloat(decimalStr);
        }

        // Insert decimal point
        if (decimalStr.length <= decimals) {
            decimalStr = '0'.repeat(decimals - decimalStr.length + 1) + decimalStr;
        }

        const decimalIndex = decimalStr.length - decimals;
        const result = decimalStr.slice(0, decimalIndex) + '.' + decimalStr.slice(decimalIndex);

        return parseFloat(result);
    } catch (error) {
        console.error('Hex conversion error:', error, hexString);
        return 0;
    }
}

/**
 * Helper function for hex to decimal conversion
 */
function multiplyBy16AndAdd(numStr, digit) {
    let carry = digit;
    let result = '';

    for (let i = numStr.length - 1; i >= 0; i--) {
        const product = parseInt(numStr[i]) * 16 + carry;
        result = (product % 10) + result;
        carry = Math.floor(product / 10);
    }

    while (carry > 0) {
        result = (carry % 10) + result;
        carry = Math.floor(carry / 10);
    }

    return result || '0';
}

/**
 * Format balance for display
 */
function formatBalance(balance) {
    if (balance === 0) return '0';
    if (balance < 0.000001) return balance.toExponential(2);
    if (balance < 1) return balance.toFixed(6);
    if (balance < 1000) return balance.toFixed(4);
    if (balance < 1000000) return balance.toFixed(2);
    return balance.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

/**
 * Transform Alchemy API response to display format
 */
export function transformAlchemyData(alchemyResponse) {
    const { chains, analytics, wallet } = alchemyResponse;

    console.log('🔄 Transforming data...', { chains, analytics });

    // Extract all tokens from chains with proper hex conversion
    const allTokens = chains?.flatMap(chain =>
        chain.tokens?.map(token => {
            const rawBalance = hexToDecimal(token.balance, token.decimals || 18);

            return {
                symbol: token.symbol || '???',
                name: token.name || 'Unknown Token',
                balance: rawBalance,
                balanceFormatted: formatBalance(rawBalance),
                value: rawBalance,
                contractAddress: token.contractAddress,
                decimals: token.decimals || 18,
                chain: chain.chain || chain.chainName || 'Unknown',
                logo: token.logo || null,
                change: 0,
                priceUSD: 0,
                valueUSD: 0
            };
        }) || []
    ) || [];

    // Filter out tokens with 0 balance
    const tokensWithBalance = allTokens.filter(t => t.balance > 0);

    console.log(`✅ Extracted ${allTokens.length} total tokens, ${tokensWithBalance.length} with balance > 0`);
    tokensWithBalance.slice(0, 5).forEach(t => {
        console.log(`  ${t.symbol}: ${t.balanceFormatted} (raw: ${t.balance})`);
    });

    // Get native balance (BNB, ETH, etc.)
    const nativeBalance = chains?.map(chain => {
        const balance = hexToDecimal(chain.nativeBalance || '0x0', 18);
        return {
            symbol: getNativeSymbol(chain.chain || chain.chainName),
            name: getNativeName(chain.chain || chain.chainName),
            balance: balance,
            balanceFormatted: formatBalance(balance),
            value: balance,
            contractAddress: 'NATIVE',
            decimals: 18,
            chain: chain.chain || chain.chainName || 'Unknown',
            logo: null,
            change: 0,
            priceUSD: 0,
            valueUSD: 0,
            isNative: true
        };
    }).filter(t => t.balance > 0) || [];

    // Combine native + tokens
    const allBalances = [...nativeBalance, ...tokensWithBalance];

    // Transform chain distribution
    const chainDistribution = chains?.map((chain, idx) => {
        const chainTokens = chain.tokens?.map(t => {
            const balance = hexToDecimal(t.balance, t.decimals || 18);
            return {
                ...t,
                balance,
                value: balance
            };
        }).filter(t => t.balance > 0) || [];

        const chainValue = chainTokens.reduce((sum, t) => sum + t.value, 0);

        return {
            chain: chain.chain || chain.chainName || `Chain ${idx + 1}`,
            name: chain.chain || chain.chainName || `Chain ${idx + 1}`,
            value: chainValue,
            tokens: chainTokens.length,
            percentage: 0, // Will recalculate below
            color: getChainColor(chain.chain || chain.chainName)
        };
    }) || [];

    // Recalculate percentages
    const totalValueAcrossChains = chainDistribution.reduce((sum, c) => sum + c.value, 0);
    chainDistribution.forEach(c => {
        c.percentage = totalValueAcrossChains > 0
            ? ((c.value / totalValueAcrossChains) * 100)
            : 0;
    });

    // Build top holdings
    const topHoldings = allBalances
        .sort((a, b) => b.balance - a.balance)
        .slice(0, 100)
        .map((token, idx) => ({
            ...token,
            rank: idx + 1
        }));

    console.log(`📊 Top holdings: ${topHoldings.length} tokens/assets`);

    // Build P&L data
    const pnlData = allBalances.slice(0, 20).map(token => ({
        symbol: token.symbol,
        name: token.name,
        balance: token.balance,
        totalPnL: 0,
        realized: 0,
        unrealized: 0
    }));

    const transformed = {
        wallet,
        chains: chains || [],
        analytics: {
            ...analytics,
            totalTokens: allBalances.length,
            totalValue: 0, // Will be updated with CoinGecko prices
            totalPnL: 0,
        },
        allTokens: allBalances,
        chainDistribution,
        topHoldings,
        pnlData
    };

    console.log('✨ Transformation complete:', {
        totalAssets: allBalances.length,
        chains: chainDistribution.length,
        topHoldings: topHoldings.length
    });

    return transformed;
}

/**
 * Get native token symbol for chain
 */
function getNativeSymbol(chainName) {
    const symbols = {
        'BSC': 'BNB',
        'ETH': 'ETH',
        'POLYGON': 'MATIC',
        'ARBITRUM': 'ETH',
        'OPTIMISM': 'ETH',
        'BASE': 'ETH'
    };
    return symbols[chainName?.toUpperCase()] || 'NATIVE';
}

/**
 * Get native token name for chain
 */
function getNativeName(chainName) {
    const names = {
        'BSC': 'Binance Coin',
        'ETH': 'Ethereum',
        'POLYGON': 'Polygon',
        'ARBITRUM': 'Ethereum',
        'OPTIMISM': 'Ethereum',
        'BASE': 'Ethereum'
    };
    return names[chainName?.toUpperCase()] || 'Native Token';
}

/**
 * Get color for chain
 */
function getChainColor(chainName) {
    const colors = {
        'BSC': '#F3BA2F',
        'ETH': '#627EEA',
        'POLYGON': '#8247E5',
        'ARBITRUM': '#28A0F0',
        'OPTIMISM': '#FF0420',
        'BASE': '#0052FF'
    };
    return colors[chainName?.toUpperCase()] || '#9CA3AF';
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num) {
    if (num === 0) return '0';
    if (num < 0.01) return num.toFixed(6);
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
        return Math.floor(ageMs / 60000);
    } catch (error) {
        return null;
    }
}
