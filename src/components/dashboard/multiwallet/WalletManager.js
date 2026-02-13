'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaWallet, FaPlus, FaTrash, FaEdit, FaStar, FaCheck } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { VANTAGE_THEME } from '../utils/theme';

/**
 * Multi-Wallet Manager
 * Add, edit, delete, and switch between multiple wallets
 */
export default function WalletManager({ currentWallet, onWalletChange }) {
    const [wallets, setWallets] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingWallet, setEditingWallet] = useState(null);
    const [newWallet, setNewWallet] = useState({ address: '', label: '', color: '#3b82f6' });

    // Wallet colors
    const WALLET_COLORS = [
        '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b',
        '#ef4444', '#ec4899', '#14b8a6', '#6366f1'
    ];

    // Load wallets from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('vantage_wallets');
        if (saved) {
            setWallets(JSON.parse(saved));
        }
    }, []);

    // Save wallets to localStorage
    const saveWallets = (updatedWallets) => {
        localStorage.setItem('vantage_wallets', JSON.stringify(updatedWallets));
        setWallets(updatedWallets);
    };

    // Add new wallet
    const handleAddWallet = () => {
        if (!newWallet.address) {
            toast.error('Please enter a wallet address');
            return;
        }

        if (!isValidAddress(newWallet.address)) {
            toast.error('Invalid wallet address');
            return;
        }

        const wallet = {
            id: Date.now(),
            address: newWallet.address.trim(),
            label: newWallet.label || `Wallet ${wallets.length + 1}`,
            color: newWallet.color,
            addedAt: new Date().toISOString(),
            favorite: false
        };

        const updated = [...wallets, wallet];
        saveWallets(updated);
        setNewWallet({ address: '', label: '', color: '#3b82f6' });
        setShowAddModal(false);
        toast.success(`✓ Wallet "${wallet.label}" added!`);
    };

    // Delete wallet
    const handleDeleteWallet = (id) => {
        const updated = wallets.filter(w => w.id !== id);
        saveWallets(updated);
        toast.success('✓ Wallet removed');
    };

    // Toggle favorite
    const toggleFavorite = (id) => {
        const updated = wallets.map(w =>
            w.id === id ? { ...w, favorite: !w.favorite } : w
        );
        saveWallets(updated);
    };

    // Validate address (basic validation)
    const isValidAddress = (addr) => {
        return addr && addr.length === 42 && addr.startsWith('0x');
    };

    // Format address
    const formatAddress = (addr) => {
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6"
            style={{
                background: VANTAGE_THEME.cardBg,
                border: `1px solid ${VANTAGE_THEME.border}`,
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                            background: `linear-gradient(135deg, #ec4899, #f43f5e)`
                        }}
                    >
                        <FaWallet style={{ color: '#fff', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            Multi-Wallet Manager
                        </h3>
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            {wallets.length} wallet{wallets.length !== 1 ? 's' : ''} connected
                        </p>
                    </div>
                </div>

                {/* Add Wallet Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all"
                    style={{
                        background: `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`,
                        color: '#fff'
                    }}
                >
                    <FaPlus />
                    Add Wallet
                </motion.button>
            </div>

            {/* Wallet List */}
            <div className="space-y-3">
                {wallets.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                            style={{ background: `${VANTAGE_THEME.border}40` }}
                        >
                            <FaWallet style={{ color: VANTAGE_THEME.text, fontSize: '2rem' }} />
                        </div>
                        <p className="text-lg font-semibold mb-2" style={{ color: VANTAGE_THEME.textLight }}>
                            No wallets added yet
                        </p>
                        <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
                            Click "Add Wallet" to get started
                        </p>
                    </div>
                ) : (
                    wallets.map((wallet, idx) => (
                        <motion.div
                            key={wallet.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-4 rounded-xl cursor-pointer transition-all"
                            style={{
                                background: currentWallet === wallet.address
                                    ? `${wallet.color}20`
                                    : `${VANTAGE_THEME.background}80`,
                                border: `2px solid ${currentWallet === wallet.address ? wallet.color : VANTAGE_THEME.border}`
                            }}
                            onClick={() => onWalletChange && onWalletChange(wallet.address)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    {/* Color indicator */}
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ background: wallet.color }}
                                    >
                                        <FaWallet style={{ color: '#fff' }} />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold" style={{ color: VANTAGE_THEME.textLight }}>
                                                {wallet.label}
                                            </p>
                                            {wallet.favorite && (
                                                <FaStar style={{ color: '#f59e0b', fontSize: '0.875rem' }} />
                                            )}
                                            {currentWallet === wallet.address && (
                                                <span
                                                    className="px-2 py-0.5 rounded text-xs font-semibold"
                                                    style={{ background: `${wallet.color}40`, color: wallet.color }}
                                                >
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm font-mono" style={{ color: VANTAGE_THEME.text }}>
                                            {formatAddress(wallet.address)}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(wallet.id);
                                        }}
                                        className="p-2 rounded-lg transition-all"
                                        style={{
                                            background: wallet.favorite ? `${VANTAGE_THEME.warning}20` : `${VANTAGE_THEME.border}40`
                                        }}
                                    >
                                        <FaStar style={{ color: wallet.favorite ? VANTAGE_THEME.warning : VANTAGE_THEME.text }} />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteWallet(wallet.id);
                                        }}
                                        className="p-2 rounded-lg transition-all"
                                        style={{ background: `${VANTAGE_THEME.error}20` }}
                                    >
                                        <FaTrash style={{ color: VANTAGE_THEME.error }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Add Wallet Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.9)' }}
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-md w-full p-6 rounded-2xl"
                            style={{
                                background: VANTAGE_THEME.cardBg,
                                border: `1px solid ${VANTAGE_THEME.border}`
                            }}
                        >
                            <h3 className="text-xl font-bold mb-4" style={{ color: VANTAGE_THEME.textLight }}>
                                Add New Wallet
                            </h3>

                            {/* Wallet Address */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" style={{ color: VANTAGE_THEME.text }}>
                                    Wallet Address *
                                </label>
                                <input
                                    type="text"
                                    value={newWallet.address}
                                    onChange={(e) => setNewWallet({ ...newWallet, address: e.target.value })}
                                    placeholder="0x..."
                                    className="w-full px-4 py-3 rounded-xl font-mono transition-all"
                                    style={{
                                        background: VANTAGE_THEME.background,
                                        border: `1px solid ${VANTAGE_THEME.border}`,
                                        color: VANTAGE_THEME.textLight
                                    }}
                                />
                            </div>

                            {/* Label */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" style={{ color: VANTAGE_THEME.text }}>
                                    Label (optional)
                                </label>
                                <input
                                    type="text"
                                    value={newWallet.label}
                                    onChange={(e) => setNewWallet({ ...newWallet, label: e.target.value })}
                                    placeholder="My Main Wallet"
                                    className="w-full px-4 py-3 rounded-xl transition-all"
                                    style={{
                                        background: VANTAGE_THEME.background,
                                        border: `1px solid ${VANTAGE_THEME.border}`,
                                        color: VANTAGE_THEME.textLight
                                    }}
                                />
                            </div>

                            {/* Color */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2" style={{ color: VANTAGE_THEME.text }}>
                                    Color
                                </label>
                                <div className="flex gap-2">
                                    {WALLET_COLORS.map(color => (
                                        <motion.button
                                            key={color}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setNewWallet({ ...newWallet, color })}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                                            style={{
                                                background: color,
                                                border: `2px solid ${newWallet.color === color ? '#fff' : 'transparent'}`
                                            }}
                                        >
                                            {newWallet.color === color && (
                                                <FaCheck style={{ color: '#fff' }} />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-3 rounded-xl font-medium transition-all"
                                    style={{
                                        background: VANTAGE_THEME.cardBg,
                                        border: `1px solid ${VANTAGE_THEME.border}`,
                                        color: VANTAGE_THEME.text
                                    }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddWallet}
                                    className="flex-1 px-4 py-3 rounded-xl font-medium transition-all"
                                    style={{
                                        background: `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`,
                                        color: '#fff'
                                    }}
                                >
                                    Add Wallet
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
