import { NextResponse } from 'next/server';
import { scanMultiChain, getTokenBalances, getTransactionHistory, getNativeBalance, ALCHEMY_CHAINS } from '@/lib/alchemy';

// Supported chains for scanning
const SUPPORTED_CHAINS = ['bsc', 'eth', 'polygon', 'arbitrum', 'optimism', 'base'];

/**
 * Calculate advanced analytics from wallet data
 */
function calculateAnalytics(chainData) {
  const analytics = {
    totalChains: 0,
    totalTokens: 0,
    totalTransactions: 0,
    uniqueContracts: new Set(),
    chainDistribution: {},
    activityScore: 0,
    riskScore: 0,
    diversificationScore: 0,
    patterns: {
      mostActiveChain: null,
      maxActivity: 0,
      recentActivity: false,
      crossChainUser: false
    }
  };

  chainData.forEach(chain => {
    if (!chain.success) return;

    analytics.totalChains++;
    analytics.totalTokens += chain.tokens?.length || 0;
    analytics.totalTransactions += chain.transactions?.length || 0;

    // Track unique contracts
    chain.tokens?.forEach(token => {
      analytics.uniqueContracts.add(token.contractAddress);
    });

    // Chain distribution
    const txCount = chain.transactions?.length || 0;
    analytics.chainDistribution[chain.chainName] = txCount;

    // Most active chain
    if (txCount > analytics.patterns.maxActivity) {
      analytics.patterns.maxActivity = txCount;
      analytics.patterns.mostActiveChain = chain.chainName;
    }

    // Recent activity (transactions in last 30 days)
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const recentTxs = chain.transactions?.filter(tx => {
      const txTime = new Date(tx.metadata?.blockTimestamp || 0).getTime();
      return txTime > thirtyDaysAgo;
    }) || [];

    if (recentTxs.length > 0) {
      analytics.patterns.recentActivity = true;
    }
  });

  // Cross-chain user
  analytics.patterns.crossChainUser = analytics.totalChains > 1;

  // Activity score (0-100)
  analytics.activityScore = Math.min(100,
    (analytics.totalTransactions * 2) +
    (analytics.totalChains * 10) +
    (analytics.uniqueContracts.size * 5)
  );

  // Diversification score
  analytics.diversificationScore = Math.min(100,
    (analytics.totalChains * 15) +
    (analytics.uniqueContracts.size * 3)
  );

  // Risk score (lower is better) - simplified for now
  const avgTxPerChain = analytics.totalTransactions / Math.max(analytics.totalChains, 1);
  if (avgTxPerChain < 5) analytics.riskScore = 70; // Low activity = higher risk
  else if (avgTxPerChain < 20) analytics.riskScore = 40;
  else analytics.riskScore = 20; // High activity = lower risk

  analytics.uniqueContracts = analytics.uniqueContracts.size;

  return analytics;
}

/**
 * POST /api/scan
 * Scan a wallet address across multiple chains using Alchemy
 */
export async function POST(request) {
  try {
    const { wallet, chains } = await request.json();

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Validate wallet address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    // Check if Alchemy API key is configured
    if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
      return NextResponse.json(
        { error: 'Alchemy API key not configured. Please add NEXT_PUBLIC_ALCHEMY_API_KEY to your .env file.' },
        { status: 500 }
      );
    }

    // Use provided chains or default to all supported
    const chainsToScan = chains && Array.isArray(chains) ? chains : SUPPORTED_CHAINS;

    console.log(`🔍 Scanning ${wallet} across ${chainsToScan.length} chains...`);

    // Scan all chains
    const results = await scanMultiChain(wallet, chainsToScan);

    // Calculate analytics
    const analytics = calculateAnalytics(results);

    // Format response
    const response = {
      wallet,
      scannedAt: new Date().toISOString(),
      chains: results.map(chain => ({
        chain: chain.chainName || chain.chain,
        chainId: chain.chainId,
        success: chain.success,
        error: chain.error,
        tokens: chain.tokens || [],
        nativeBalance: chain.nativeBalance || '0x0',
        transactionCount: chain.transactions?.length || 0,
        transactions: chain.transactions || []
      })),
      analytics,
      summary: {
        totalChains: analytics.totalChains,
        totalTokens: analytics.totalTokens,
        totalTransactions: analytics.totalTransactions,
        activityScore: analytics.activityScore,
        diversificationScore: analytics.diversificationScore
      }
    };

    console.log(`✅ Scan complete: ${analytics.totalChains} chains, ${analytics.totalTokens} tokens, ${analytics.totalTransactions} transactions`);

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ Scan error:', error);
    return NextResponse.json(
      {
        error: 'Failed to scan wallet',
        details: error.message,
        hint: 'Make sure your Alchemy API key is correctly configured in .env'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/scan (Health check)
 */
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'VANTAGE Multi-Chain Scanner',
    provider: 'Alchemy',
    supportedChains: SUPPORTED_CHAINS,
    configured: !!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    timestamp: new Date().toISOString()
  });
}
