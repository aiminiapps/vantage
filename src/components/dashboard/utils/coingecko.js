/**
 * CoinGecko API Integration
 * Free API - No key required
 */

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Rate limiting cache
const priceCache = new Map();
const CACHE_DURATION = 60000; // 1 minute

/**
 * Get token price by contract address
 */
export async function getTokenPrice(contractAddress, platform = 'binance-smart-chain') {
    const cacheKey = `${platform}_${contractAddress}`;
    const cached = priceCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    try {
        const response = await fetch(
            `${COINGECKO_API}/simple/token_price/${platform}?contract_addresses=${contractAddress}&vs_currencies=usd&include_24hr_change=true`
        );

        if (!response.ok) return null;

        const data = await response.json();
        const tokenData = data[contractAddress.toLowerCase()];

        if (tokenData) {
            priceCache.set(cacheKey, {
                data: tokenData,
                timestamp: Date.now()
            });
        }

        return tokenData;
    } catch (error) {
        console.error('CoinGecko price fetch error:', error);
        return null;
    }
}

/**
 * Get token info including logo
 */
export async function getTokenInfo(contractAddress, platform = 'binance-smart-chain') {
    try {
        const response = await fetch(
            `${COINGECKO_API}/coins/${platform}/contract/${contractAddress}`
        );

        if (!response.ok) return null;

        const data = await response.json();

        return {
            name: data.name,
            symbol: data.symbol,
            logo: data.image?.large || data.image?.small,
            price: data.market_data?.current_price?.usd,
            change24h: data.market_data?.price_change_percentage_24h,
            marketCap: data.market_data?.market_cap?.usd,
            volume24h: data.market_data?.total_volume?.usd
        };
    } catch (error) {
        console.error('CoinGecko info fetch error:', error);
        return null;
    }
}

/**
 * Get multiple token prices in batch
 */
export async function getBatchTokenPrices(contractAddresses, platform = 'binance-smart-chain') {
    if (!contractAddresses || contractAddresses.length === 0) return {};

    try {
        const addresses = contractAddresses.join(',');
        const response = await fetch(
            `${COINGECKO_API}/simple/token_price/${platform}?contract_addresses=${addresses}&vs_currencies=usd&include_24hr_change=true`
        );

        if (!response.ok) return {};

        return await response.json();
    } catch (error) {
        console.error('CoinGecko batch fetch error:', error);
        return {};
    }
}

/**
 * Get native token price (BNB, ETH, etc.)
 */
export async function getNativeTokenPrice(coinId = 'binancecoin') {
    try {
        const response = await fetch(
            `${COINGECKO_API}/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`
        );

        if (!response.ok) return null;

        const data = await response.json();
        return data[coinId];
    } catch (error) {
        console.error('CoinGecko native price error:', error);
        return null;
    }
}

/**
 * Map chain name to CoinGecko platform ID
 */
export const CHAIN_TO_PLATFORM = {
    'BSC': 'binance-smart-chain',
    'Ethereum': 'ethereum',
    'Polygon': 'polygon-pos',
    'Arbitrum': 'arbitrum-one',
    'Optimism': 'optimistic-ethereum',
    'Base': 'base'
};

/**
 * Map chain to native coin ID
 */
export const CHAIN_TO_COIN = {
    'BSC': 'binancecoin',
    'Ethereum': 'ethereum',
    'Polygon': 'matic-network',
    'Arbitrum': 'ethereum',
    'Optimism': 'ethereum',
    'Base': 'ethereum'
};
