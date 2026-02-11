/**
 * CoinGecko API Integration (Free Tier - No API Key Required)
 */

// Chain name to CoinGecko platform ID mapping
export const CHAIN_TO_PLATFORM = {
    'BSC': 'binance-smart-chain',
    'ETH': 'ethereum',
    'POLYGON': 'polygon-pos',
    'ARBITRUM': 'arbitrum-one',
    'OPTIMISM': 'optimistic-ethereum',
    'BASE': 'base'
};

// Well-known token addresses (for better price matching)
const KNOWN_TOKENS = {
    // BSC
    '0x55d398326f99059ff775485246999027b3197955': { id: 'tether', symbol: 'usdt' },
    '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d': { id: 'usd-coin', symbol: 'usdc' },
    '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe': { id: 'ripple', symbol: 'xrp' },
    '0x570a5d26f7765ecb712c0924e4de545b89fd43df': { id: 'solana', symbol: 'sol' },
    '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c': { id: 'wbnb', symbol: 'wbnb' },

    // Ethereum
    '0xdac17f958d2ee523a2206206994597c13d831ec7': { id: 'tether', symbol: 'usdt' },
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': { id: 'usd-coin', symbol: 'usdc' },
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': { id: 'weth', symbol: 'weth' }
};

// Native token prices
const NATIVE_TOKEN_IDS = {
    'BNB': 'binancecoin',
    'ETH': 'ethereum',
    'MATIC': 'matic-network',
    'NATIVE': 'binancecoin' // default
};

/**
 * Fetch token prices from CoinGecko with enhanced matching
 */
export async function getBatchTokenPricesEnhanced(tokens, walletData) {
    try {
        const prices = {};

        // Separate native tokens and contract tokens
        const nativeTokens = tokens.filter(t => t.isNative || t.contractAddress === 'NATIVE');
        const contractTokens = tokens.filter(t => !t.isNative && t.contractAddress !== 'NATIVE');

        // Fetch native token prices
        if (nativeTokens.length > 0) {
            const nativeIds = [...new Set(nativeTokens.map(t => NATIVE_TOKEN_IDS[t.symbol] || NATIVE_TOKEN_IDS['NATIVE']))];
            const nativeResponse = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${nativeIds.join(',')}&vs_currencies=usd&include_24hr_change=true`
            );

            if (nativeResponse.ok) {
                const nativeData = await nativeResponse.json();
                nativeTokens.forEach(token => {
                    const tokenId = NATIVE_TOKEN_IDS[token.symbol] || NATIVE_TOKEN_IDS['NATIVE'];
                    if (nativeData[tokenId]) {
                        prices[token.symbol] = {
                            usd: nativeData[tokenId].usd,
                            usd_24h_change: nativeData[tokenId].usd_24h_change || 0
                        };
                    }
                });
            }
        }

        // Fetch contract token prices (batch by platform)
        const platforms = {};
        contractTokens.forEach(token => {
            const platform = CHAIN_TO_PLATFORM[token.chain?.toUpperCase()] || 'binance-smart-chain';
            if (!platforms[platform]) platforms[platform] = [];

            // Check if it's a known token
            const knownToken = KNOWN_TOKENS[token.contractAddress?.toLowerCase()];
            if (knownToken) {
                platforms[platform].push({ ...token, knownId: knownToken.id });
            } else {
                platforms[platform].push(token);
            }
        });

        // Fetch prices for each platform
        for (const [platform, platformTokens] of Object.entries(platforms)) {
            // First, try known tokens by ID
            const knownTokenIds = platformTokens
                .filter(t => t.knownId)
                .map(t => t.knownId)
                .join(',');

            if (knownTokenIds) {
                try {
                    const response = await fetch(
                        `https://api.coingecko.com/api/v3/simple/price?ids=${knownTokenIds}&vs_currencies=usd&include_24hr_change=true`
                    );

                    if (response.ok) {
                        const data = await response.json();
                        platformTokens.forEach(token => {
                            if (token.knownId && data[token.knownId]) {
                                prices[token.contractAddress?.toLowerCase()] = {
                                    usd: data[token.knownId].usd,
                                    usd_24h_change: data[token.knownId].usd_24h_change || 0
                                };
                            }
                        });
                    }
                } catch (error) {
                    console.warn('Known token price fetch failed:', error);
                }
            }

            // Then try by contract address (limited to 10 to avoid rate limits)
            const addressesToFetch = platformTokens
                .filter(t => !prices[t.contractAddress?.toLowerCase()])
                .slice(0, 10)
                .map(t => t.contractAddress)
                .join(',');

            if (addressesToFetch) {
                try {
                    const response = await fetch(
                        `https://api.coingecko.com/api/v3/simple/token_price/${platform}?contract_addresses=${addressesToFetch}&vs_currencies=usd&include_24hr_change=true`
                    );

                    if (response.ok) {
                        const data = await response.json();
                        Object.entries(data).forEach(([address, priceInfo]) => {
                            prices[address.toLowerCase()] = priceInfo;
                        });
                    }
                } catch (error) {
                    console.warn(`Platform ${platform} price fetch failed:`, error);
                }
            }
        }

        console.log(`💰 Fetched prices for ${Object.keys(prices).length} tokens`);
        return prices;

    } catch (error) {
        console.error('Price fetch error:', error);
        return {};
    }
}

/**
 * Calculate total portfolio value
 */
export function calculatePortfolioValue(tokens, prices) {
    let totalValue = 0;
    let totalChange24h = 0;

    tokens.forEach(token => {
        let priceData;

        if (token.isNative || token.contractAddress === 'NATIVE') {
            priceData = prices[token.symbol];
        } else {
            priceData = prices[token.contractAddress?.toLowerCase()];
        }

        if (priceData?.usd) {
            const valueUSD = token.balance * priceData.usd;
            totalValue += valueUSD;

            // Update token with price data
            token.priceUSD = priceData.usd;
            token.valueUSD = valueUSD;
            token.change24h = priceData.usd_24h_change || 0;

            // Calculate 24h change in USD
            if (priceData.usd_24h_change) {
                const yesterdayPrice = priceData.usd / (1 + priceData.usd_24h_change / 100);
                const yesterdayValue = token.balance * yesterdayPrice;
                totalChange24h += (valueUSD - yesterdayValue);
            }
        }
    });

    return {
        totalValue,
        totalChange24h,
        totalChangePercent: totalValue > 0 ? (totalChange24h / totalValue) * 100 : 0
    };
}

/**
 * Legacy function for backwards compatibility
 */
export async function getBatchTokenPrices(addresses, platform = 'binance-smart-chain') {
    try {
        if (!addresses || addresses.length === 0) return {};

        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/token_price/${platform}?contract_addresses=${addresses.slice(0, 10).join(',')}&vs_currencies=usd&include_24hr_change=true`
        );

        if (!response.ok) return {};

        return await response.json();
    } catch (error) {
        console.error('Price fetch error:', error);
        return {};
    }
}
