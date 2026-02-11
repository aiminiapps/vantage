/**
 * VANTAGE Dashboard - localStorage Utilities
 * Handles wallet data caching for better performance
 */

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const STORAGE_PREFIX = 'vantage_wallet_';

/**
 * Save wallet data to localStorage
 */
export function saveWalletData(address, data) {
    try {
        const cacheData = {
            address: address.toLowerCase(),
            data,
            timestamp: Date.now()
        };
        localStorage.setItem(
            `${STORAGE_PREFIX}${address.toLowerCase()}`,
            JSON.stringify(cacheData)
        );
        return true;
    } catch (error) {
        console.error('Failed to save wallet data:', error);
        return false;
    }
}

/**
 * Get wallet data from localStorage
 */
export function getWalletData(address) {
    try {
        const cached = localStorage.getItem(
            `${STORAGE_PREFIX}${address.toLowerCase()}`
        );

        if (!cached) return null;

        const cacheData = JSON.parse(cached);

        // Check if cache is still fresh
        if (isCacheFresh(cacheData.timestamp)) {
            return cacheData.data;
        }

        // Cache expired, remove it
        clearWalletData(address);
        return null;
    } catch (error) {
        console.error('Failed to get wallet data:', error);
        return null;
    }
}

/**
 * Check if cache is still fresh
 */
export function isCacheFresh(timestamp, maxAge = CACHE_DURATION) {
    return Date.now() - timestamp < maxAge;
}

/**
 * Clear wallet data from localStorage
 */
export function clearWalletData(address) {
    try {
        localStorage.removeItem(`${STORAGE_PREFIX}${address.toLowerCase()}`);
        return true;
    } catch (error) {
        console.error('Failed to clear wallet data:', error);
        return false;
    }
}

/**
 * Clear all wallet caches
 */
export function clearAllWalletData() {
    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(STORAGE_PREFIX)) {
                localStorage.removeItem(key);
            }
        });
        return true;
    } catch (error) {
        console.error('Failed to clear all wallet data:', error);
        return false;
    }
}

/**
 * Get cache age in minutes
 */
export function getCacheAge(address) {
    try {
        const cached = localStorage.getItem(
            `${STORAGE_PREFIX}${address.toLowerCase()}`
        );

        if (!cached) return null;

        const cacheData = JSON.parse(cached);
        const ageMs = Date.now() - cacheData.timestamp;
        return Math.floor(ageMs / 60000); // Convert to minutes
    } catch (error) {
        return null;
    }
}
