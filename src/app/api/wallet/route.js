import { NextResponse } from 'next/server';
import { getTokenBalances, getTransactionHistory, getNativeBalance, getTokenMetadata, ALCHEMY_CHAINS } from '@/lib/alchemy';

/**
 * Map network names to chain keys
 */
const CHAIN_MAP = {
  ethereum: 'eth',
  eth: 'eth',
  bsc: 'bsc',
  polygon: 'polygon',
  matic: 'polygon',
  arbitrum: 'arbitrum',
  arb: 'arbitrum',
  optimism: 'optimism',
  opt: 'optimism',
  base: 'base'
};

/**
 * Calculate risk score based on wallet data
 */
function calculateRiskScore(data) {
  let riskScore = 100;
  const factors = [];

  const { tokens, transactions, statistics } = data;

  // Portfolio diversity
  if (tokens.length < 3) {
    riskScore -= 20;
    factors.push('Low portfolio diversification');
  } else if (tokens.length > 10) {
    riskScore += 10;
    factors.push('Good portfolio diversification');
  }

  // Transaction activity
  const txCount = transactions.length;
  if (txCount < 10) {
    riskScore -= 15;
    factors.push('Low transaction activity');
  } else if (txCount > 50) {
    riskScore += 10;
    factors.push('Active wallet');
  }

  // Success rate
  if (statistics.successRate < 80) {
    riskScore -= 25;
    factors.push('High failure rate on transactions');
  } else if (statistics.successRate > 95) {
    riskScore += 5;
    factors.push('Excellent transaction success rate');
  }

  // Recent activity (transactions in last 30 days)
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
  const recentTxs = transactions.filter(tx => {
    const txTime = new Date(tx.metadata?.blockTimestamp || 0).getTime();
    return txTime > thirtyDaysAgo;
  });

  if (recentTxs.length === 0) {
    riskScore -= 15;
    factors.push('No recent activity (30 days)');
  } else {
    riskScore += 5;
    factors.push('Recently active');
  }

  // Ensure score is between 0-100
  riskScore = Math.max(0, Math.min(100, riskScore));

  return {
    score: Math.round(riskScore),
    level: riskScore >= 70 ? 'Low' : riskScore >= 40 ? 'Medium' : 'High',
    factors
  };
}

/**
 * Calculate statistics from transaction data
 */
function calculateStatistics(transactions) {
  const stats = {
    totalTransactions: transactions.length,
    successfulTxs: 0,
    failedTxs: 0,
    successRate: 0,
    totalGasUsed: 0,
    avgGasPrice: 0,
    uniqueContracts: new Set(),
    firstTx: null,
    lastTx: null
  };

  if (transactions.length === 0) return stats;

  transactions.forEach(tx => {
    // Count as successful if no error in metadata
    if (!tx.metadata?.error) {
      stats.successfulTxs++;
    } else {
      stats.failedTxs++;
    }

    // Track unique contracts
    if (tx.rawContract?.address) {
      stats.uniqueContracts.add(tx.rawContract.address);
    }
  });

  stats.successRate = (stats.successfulTxs / stats.totalTransactions) * 100;
  stats.uniqueContracts = stats.uniqueContracts.size;

  // Get first and last transaction timestamps
  if (transactions.length > 0) {
    const sorted = [...transactions].sort((a, b) => {
      const timeA = new Date(a.metadata?.blockTimestamp || 0).getTime();
      const timeB = new Date(b.metadata?.blockTimestamp || 0).getTime();
      return timeA - timeB;
    });

    stats.firstTx = sorted[0].metadata?.blockTimestamp || null;
    stats.lastTx = sorted[sorted.length - 1].metadata?.blockTimestamp || null;
  }

  return stats;
}

/**
 * Format token data with USD values
 */
function formatTokens(tokens, nativeBalance, chainKey) {
  const chain = ALCHEMY_CHAINS[chainKey];
  const nativeSymbol = chainKey === 'bsc' ? 'BNB' :
    chainKey === 'polygon' ? 'MATIC' :
      chainKey === 'eth' ? 'ETH' : 'ETH';

  const formatted = [];

  // Add native token if balance > 0
  if (nativeBalance && nativeBalance !== '0x0') {
    const balanceInEth = parseInt(nativeBalance, 16) / 1e18;
    if (balanceInEth > 0) {
      formatted.push({
        symbol: nativeSymbol,
        name: chain?.name || 'Native Token',
        balance: balanceInEth.toFixed(6),
        rawBalance: nativeBalance,
        decimals: 18,
        isNative: true,
        contractAddress: null
      });
    }
  }

  // Add ERC-20 tokens
  tokens.forEach(token => {
    try {
      const decimals = token.decimals || 18;
      const rawBalance = BigInt(token.balance || '0x0');
      const balance = Number(rawBalance) / Math.pow(10, decimals);

      if (balance > 0) {
        formatted.push({
          symbol: token.symbol || 'UNKNOWN',
          name: token.name || 'Unknown Token',
          balance: balance.toFixed(6),
          rawBalance: token.balance,
          decimals,
          isNative: false,
          contractAddress: token.contractAddress,
          logo: token.logo
        });
      }
    } catch (error) {
      console.error('Error formatting token:', error);
    }
  });

  return formatted;
}

/**
 * POST /api/wallet
 * Get wallet data for a specific network using Alchemy
 */
export async function POST(request) {
  try {
    const { wallet, network = 'bsc' } = await request.json();

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Validate wallet address
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    // Check Alchemy API key
    if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
      return NextResponse.json(
        { error: 'Alchemy API key not configured. Please add NEXT_PUBLIC_ALCHEMY_API_KEY to your .env file.' },
        { status: 500 }
      );
    }

    // Map network to chain key
    const chainKey = CHAIN_MAP[network.toLowerCase()] || 'bsc';
    const chain = ALCHEMY_CHAINS[chainKey];

    if (!chain) {
      return NextResponse.json(
        { error: `Unsupported network: ${network}` },
        { status: 400 }
      );
    }

    console.log(`🔍 Fetching wallet data for ${wallet} on ${chain.name}...`);

    // Fetch data from Alchemy
    const [tokens, nativeBalance, transactions] = await Promise.all([
      getTokenBalances(wallet, chainKey),
      getNativeBalance(wallet, chainKey),
      getTransactionHistory(wallet, chainKey, { maxCount: '0x64' }) // 100 txs
    ]);

    // Format and process data
    const formattedTokens = formatTokens(tokens, nativeBalance, chainKey);
    const statistics = calculateStatistics(transactions);

    // Prepare response data
    const responseData = {
      tokens: formattedTokens,
      transactions: transactions.slice(0, 50), // Return latest 50
      statistics
    };

    // Calculate risk score
    const riskAnalysis = calculateRiskScore(responseData);

    // Build final response
    const response = {
      wallet,
      network: chain.name,
      chainId: chain.id,
      provider: 'Alchemy',
      fetchedAt: new Date().toISOString(),
      portfolio: {
        tokenCount: formattedTokens.length,
        tokens: formattedTokens
      },
      activity: {
        totalTransactions: statistics.totalTransactions,
        successRate: Math.round(statistics.successRate),
        uniqueContracts: statistics.uniqueContracts,
        firstTransaction: statistics.firstTx,
        lastTransaction: statistics.lastTx,
        recentTransactions: transactions.slice(0, 10)
      },
      risk: riskAnalysis,
      insights: {
        walletAge: statistics.firstTx ?
          Math.floor((Date.now() - new Date(statistics.firstTx).getTime()) / (1000 * 60 * 60 * 24)) :
          0,
        isActive: statistics.lastTx ?
          (Date.now() - new Date(statistics.lastTx).getTime() < 30 * 24 * 60 * 60 * 1000) :
          false,
        experienceLevel: statistics.totalTransactions > 100 ? 'Expert' :
          statistics.totalTransactions > 50 ? 'Advanced' :
            statistics.totalTransactions > 10 ? 'Intermediate' : 'Beginner'
      }
    };

    console.log(`✅ Wallet data fetched: ${formattedTokens.length} tokens, ${statistics.totalTransactions} transactions`);

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ Wallet fetch error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch wallet data',
        details: error.message,
        hint: 'Ensure your Alchemy API key is correctly configured and supports the requested network'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/wallet (Health check)
 */
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'VANTAGE Wallet Data API',
    provider: 'Alchemy',
    supportedNetworks: Object.keys(CHAIN_MAP),
    configured: !!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    timestamp: new Date().toISOString()
  });
}
