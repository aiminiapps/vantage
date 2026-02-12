/**
 * DexScreener + Multiple Free APIs (NO API KEY REQUIRED)
 * Most reliable free price data for BSC tokens
 */

// Stablecoin addresses (always $1)
const STABLECOINS = {
  '0x55d398326f99059ff775485246999027b3197955': 1.0, // USDT
  '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d': 1.0, // USDC  
  '0xe9e7cea3dedca5984780bafc599bd69add087d56': 1.0, // BUSD
  '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3': 1.0  // DAI
};

/**
 * Fetch BNB price from multiple sources
 */
async function getBNBPrice() {
  try {
    // Try Binance public API first (most reliable)
    const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.price) || 600;
    }
  } catch (error) {
    console.warn('Binance API error, using fallback');
  }
  return 620; // Fallback price
}

/**
 * Fetch token price from DexScreener
 */
async function fetchSingleTokenPrice(address) {
  try {
    // Use search endpoint which is more reliable
    const response = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${address}`);
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (data.pairs && data.pairs.length > 0) {
      // Find BSC pair with highest liquidity
      const bscPairs = data.pairs.filter(p => p.chainId === 'bsc');
      if (bscPairs.length === 0) return null;
      
      // Sort by liquidity
      bscPairs.sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));
      
      const bestPair = bscPairs[0];
      return {
        usd: parseFloat(bestPair.priceUsd) || 0,
        usd_24h_change: parseFloat(bestPair.priceChange?.h24) || 0,
        logo: bestPair.info?.imageUrl || null
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching price for ${address}:`, error);
    return null;
  }
}

/**
 * Fetch token prices from DexScreener (FREE - NO API KEY)
 */
export async function fetchTokenPricesFromDexScreener(tokens) {
  try {
    const prices = {};
    
    // Get BNB price first
    const bnbPrice = await getBNBPrice();
    prices['BNB'] = { usd: bnbPrice, usd_24h_change: 0 };
    prices['NATIVE'] = { usd: bnbPrice, usd_24h_change: 0 };
    
    console.log(`💰 BNB Price: $${bnbPrice}`);
    
    // Separate native and contract tokens
    const contractTokens = tokens.filter(t => !t.isNative && t.contractAddress && t.contractAddress !== 'NATIVE');
    
    // Process stablecoins first
    contractTokens.forEach(token => {
      const addr = token.contractAddress.toLowerCase();
      if (STABLECOINS[addr]) {
        prices[addr] = {
          usd: STABLECOINS[addr],
          usd_24h_change: 0,
          logo: null
        };
      }
    });
    
    // Fetch from DexScreener for non-stablecoins (limit to top 20 by balance)
    const unknownTokens = contractTokens
      .filter(t => !prices[t.contractAddress?.toLowerCase()])
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 20); // Top 20 only to avoid rate limits
    
    console.log(`🔍 Fetching prices for ${unknownTokens.length} tokens...`);
    
    // Fetch sequentially with delays to avoid rate limits
    for (const token of unknownTokens) {
      const priceData = await fetchSingleTokenPrice(token.contractAddress);
      
      if (priceData) {
        prices[token.contractAddress.toLowerCase()] = priceData;
        console.log(`  ✓ ${token.symbol}: $${priceData.usd.toFixed(6)}`);
      } else {
        console.log(`  ✗ ${token.symbol}: No price data`);
      }
      
      // Rate limit: wait 200ms between requests
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log(`💰 Total prices fetched: ${Object.keys(prices).length}`);
    return prices;
    
  } catch (error) {
    console.error('DexScreener API error:', error);
    return { 'BNB': { usd: 620, usd_24h_change: 0 } };
  }
}

/**
 * Calculate total portfolio value
 */
export function calculatePortfolioValueV2(tokens, prices) {
  let totalValue = 0;
  let totalChange24h = 0;
  let tokensWithPrices = 0;
  
  console.log(`🧮 Calculating portfolio value for ${tokens.length} tokens...`);
  
  tokens.forEach(token => {
    let priceData;
    
    // Get price data
    if (token.isNative || token.contractAddress === 'NATIVE' || token.symbol === 'BNB') {
      priceData = prices['BNB'] || prices['NATIVE'];
    } else {
      priceData = prices[token.contractAddress?.toLowerCase()];
    }
    
    if (priceData && priceData.usd > 0) {
      const valueUSD = token.balance * priceData.usd;
      totalValue += valueUSD;
      tokensWithPrices++;
      
      // Update token with price data
      token.priceUSD = priceData.usd;
      token.valueUSD = valueUSD;
      token.change24h = priceData.usd_24h_change || 0;
      token.logo = priceData.logo || token.logo;
      
      // Calculate 24h change in USD
      if (priceData.usd_24h_change) {
        const changeMultiplier = priceData.usd_24h_change / 100;
        const yesterdayPrice = priceData.usd / (1 + changeMultiplier);
        const yesterdayValue = token.balance * yesterdayPrice;
        totalChange24h += (valueUSD - yesterdayValue);
      }
      
      console.log(`  ${token.symbol}: ${token.balance.toFixed(4)} × $${priceData.usd.toFixed(6)} = $${valueUSD.toFixed(2)}`);
    } else {
      // No price data
      token.priceUSD = 0;
      token.valueUSD = 0;
      token.change24h = 0;
    }
  });
  
  console.log(`📊 Portfolio: $${totalValue.toFixed(2)} (${tokensWithPrices}/${tokens.length} tokens priced)`);
  
  return {
    totalValue,
    totalChange24h,
    totalChangePercent: totalValue > 0 ? (totalChange24h / totalValue) * 100 : 0,
    tokensWithPrices,
    totalTokens: tokens.length
  };
}

/**
 * Main export functions (backwards compatible)
 */
export async function getBatchTokenPricesEnhanced(tokens, walletData) {
  return await fetchTokenPricesFromDexScreener(tokens);
}

export function calculatePortfolioValue(tokens, prices) {
  return calculatePortfolioValueV2(tokens, prices);
}

// Legacy
export const CHAIN_TO_PLATFORM = {
  'BSC': 'binance-smart-chain',
  'ETH': 'ethereum'
};

export async function getBatchTokenPrices() {
  return {};
}
