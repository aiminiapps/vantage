/**
 * Alchemy API Helper Functions
 * Provides blockchain data for VANTAGE platform
 */

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

// Chain configurations for Alchemy
const ALCHEMY_CHAINS = {
    // Ethereum Mainnet
    eth: {
        id: 1,
        name: 'Ethereum',
        network: 'eth-mainnet',
        rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        explorer: 'https://etherscan.io'
    },
    // BNB Smart Chain
    bsc: {
        id: 56,
        name: 'BSC',
        network: 'bnb-mainnet',
        rpcUrl: `https://bnb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        explorer: 'https://bscscan.com'
    },
    // Polygon
    polygon: {
        id: 137,
        name: 'Polygon',
        network: 'polygon-mainnet',
        rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        explorer: 'https://polygonscan.com'
    },
    // Arbitrum
    arbitrum: {
        id: 42161,
        name: 'Arbitrum',
        network: 'arb-mainnet',
        rpcUrl: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        explorer: 'https://arbiscan.io'
    },
    // Optimism
    optimism: {
        id: 10,
        name: 'Optimism',
        network: 'opt-mainnet',
        rpcUrl: `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        explorer: 'https://optimistic.etherscan.io'
    },
    // Base
    base: {
        id: 8453,
        name: 'Base',
        network: 'base-mainnet',
        rpcUrl: `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        explorer: 'https://basescan.org'
    }
};

/**
 * Fetch with retry logic
 */
async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 500 * (i + 1)));
        }
    }
}

/**
 * Get token balances for a wallet on a specific chain
 */
export async function getTokenBalances(walletAddress, chainKey = 'bsc') {
    const chain = ALCHEMY_CHAINS[chainKey];
    if (!chain) throw new Error(`Unsupported chain: ${chainKey}`);

    try {
        const response = await fetchWithRetry(chain.rpcUrl, {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'alchemy_getTokenBalances',
                params: [walletAddress]
            })
        });

        const balances = response.result.tokenBalances || [];

        // Filter out zero balances
        const nonZeroBalances = balances.filter(token =>
            token.tokenBalance && token.tokenBalance !== '0x0'
        );

        // Get metadata for each token
        const tokensWithMetadata = await Promise.all(
            nonZeroBalances.map(async (token) => {
                try {
                    const metadata = await getTokenMetadata(token.contractAddress, chainKey);
                    return {
                        contractAddress: token.contractAddress,
                        balance: token.tokenBalance,
                        decimals: metadata.decimals,
                        symbol: metadata.symbol,
                        name: metadata.name,
                        logo: metadata.logo
                    };
                } catch (error) {
                    console.error(`Error fetching metadata for ${token.contractAddress}:`, error);
                    return null;
                }
            })
        );

        return tokensWithMetadata.filter(token => token !== null);
    } catch (error) {
        console.error(`Error fetching balances for ${chainKey}:`, error);
        throw error;
    }
}

/**
 * Get token metadata
 */
export async function getTokenMetadata(contractAddress, chainKey = 'bsc') {
    const chain = ALCHEMY_CHAINS[chainKey];
    if (!chain) throw new Error(`Unsupported chain: ${chainKey}`);

    try {
        const response = await fetchWithRetry(chain.rpcUrl, {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'alchemy_getTokenMetadata',
                params: [contractAddress]
            })
        });

        return response.result || {};
    } catch (error) {
        console.error(`Error fetching metadata for ${contractAddress}:`, error);
        return {
            decimals: 18,
            symbol: 'UNKNOWN',
            name: 'Unknown Token'
        };
    }
}

/**
 * Get transaction history for a wallet
 */
export async function getTransactionHistory(walletAddress, chainKey = 'bsc', options = {}) {
    const chain = ALCHEMY_CHAINS[chainKey];
    if (!chain) throw new Error(`Unsupported chain: ${chainKey}`);

    const {
        fromBlock = '0x0',
        toBlock = 'latest',
        maxCount = '0x64' // 100 transactions
    } = options;

    try {
        const response = await fetchWithRetry(chain.rpcUrl, {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'alchemy_getAssetTransfers',
                params: [{
                    fromBlock,
                    toBlock,
                    fromAddress: walletAddress,
                    category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
                    maxCount,
                    withMetadata: true,
                    excludeZeroValue: true
                }]
            })
        });

        const outgoingTxs = response.result?.transfers || [];

        // Get incoming transactions
        const incomingResponse = await fetchWithRetry(chain.rpcUrl, {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 2,
                method: 'alchemy_getAssetTransfers',
                params: [{
                    fromBlock,
                    toBlock,
                    toAddress: walletAddress,
                    category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
                    maxCount,
                    withMetadata: true,
                    excludeZeroValue: true
                }]
            })
        });

        const incomingTxs = incomingResponse.result?.transfers || [];

        // Combine and sort by timestamp
        const allTxs = [...outgoingTxs, ...incomingTxs]
            .sort((a, b) => {
                const timeA = new Date(a.metadata?.blockTimestamp || 0).getTime();
                const timeB = new Date(b.metadata?.blockTimestamp || 0).getTime();
                return timeB - timeA;
            });

        return allTxs;
    } catch (error) {
        console.error(`Error fetching transactions for ${chainKey}:`, error);
        throw error;
    }
}

/**
 * Get native token balance (ETH, BNB, MATIC, etc.)
 */
export async function getNativeBalance(walletAddress, chainKey = 'bsc') {
    const chain = ALCHEMY_CHAINS[chainKey];
    if (!chain) throw new Error(`Unsupported chain: ${chainKey}`);

    try {
        const response = await fetchWithRetry(chain.rpcUrl, {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_getBalance',
                params: [walletAddress, 'latest']
            })
        });

        return response.result || '0x0';
    } catch (error) {
        console.error(`Error fetching native balance for ${chainKey}:`, error);
        return '0x0';
    }
}

/**
 * Get block number
 */
export async function getBlockNumber(chainKey = 'bsc') {
    const chain = ALCHEMY_CHAINS[chainKey];
    if (!chain) throw new Error(`Unsupported chain: ${chainKey}`);

    try {
        const response = await fetchWithRetry(chain.rpcUrl, {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_blockNumber',
                params: []
            })
        });

        return response.result || '0x0';
    } catch (error) {
        console.error(`Error fetching block number for ${chainKey}:`, error);
        return '0x0';
    }
}

/**
 * Scan wallet across multiple chains
 */
export async function scanMultiChain(walletAddress, chains = ['bsc', 'eth', 'polygon']) {
    const results = await Promise.allSettled(
        chains.map(async (chainKey) => {
            try {
                const [tokens, nativeBalance, transactions] = await Promise.all([
                    getTokenBalances(walletAddress, chainKey),
                    getNativeBalance(walletAddress, chainKey),
                    getTransactionHistory(walletAddress, chainKey, { maxCount: '0x32' }) // 50 txs
                ]);

                return {
                    chain: chainKey,
                    chainId: ALCHEMY_CHAINS[chainKey].id,
                    chainName: ALCHEMY_CHAINS[chainKey].name,
                    nativeBalance,
                    tokens,
                    transactions,
                    success: true
                };
            } catch (error) {
                return {
                    chain: chainKey,
                    chainId: ALCHEMY_CHAINS[chainKey].id,
                    chainName: ALCHEMY_CHAINS[chainKey].name,
                    error: error.message,
                    success: false
                };
            }
        })
    );

    return results.map((result, index) => {
        if (result.status === 'fulfilled') {
            return result.value;
        } else {
            return {
                chain: chains[index],
                error: result.reason?.message || 'Unknown error',
                success: false
            };
        }
    });
}

export { ALCHEMY_CHAINS };
