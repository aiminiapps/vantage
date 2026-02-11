'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaSearch, FaSort } from 'react-icons/fa';
import { VANTAGE_THEME } from './utils/theme';

export default function HoldingsTab({ holdings }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('balance'); // balance, name, chain

    const filteredHoldings = holdings.filter(token =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedHoldings = [...filteredHoldings].sort((a, b) => {
        if (sortBy === 'balance') return b.value - a.value;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return a.chain.localeCompare(b.chain);
    });

    return (
        <div>
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <FaSearch
                        className="absolute left-4 top-1/2 transform -translate-y-1/2"
                        style={{ color: VANTAGE_THEME.textDark }}
                    />
                    <input
                        type="text"
                        placeholder="Search tokens..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all"
                        style={{
                            background: VANTAGE_THEME.cardBg,
                            border: `1px solid ${VANTAGE_THEME.border}`,
                            color: VANTAGE_THEME.textLight
                        }}
                    />
                </div>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 rounded-xl outline-none transition-all"
                    style={{
                        background: VANTAGE_THEME.cardBg,
                        border: `1px solid ${VANTAGE_THEME.border}`,
                        color: VANTAGE_THEME.textLight
                    }}
                >
                    <option value="balance">Sort by Balance</option>
                    <option value="name">Sort by Name</option>
                    <option value="chain">Sort by Chain</option>
                </select>
            </div>

            {/* Holdings Table */}
            <div
                className="rounded-2xl overflow-hidden"
                style={{
                    background: VANTAGE_THEME.cardBg,
                    border: `1px solid ${VANTAGE_THEME.border}`
                }}
            >
                <table className="w-full">
                    <thead style={{ background: `${VANTAGE_THEME.primary}10` }}>
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-semibold" style={{ color: VANTAGE_THEME.text }}>#</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold" style={{ color: VANTAGE_THEME.text }}>Token</th>
                            <th className="text-right px-6 py-4 text-sm font-semibold" style={{ color: VANTAGE_THEME.text }}>Balance</th>
                            <th className="text-center px-6 py-4 text-sm font-semibold" style={{ color: VANTAGE_THEME.text }}>Chain</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedHoldings.map((token, idx) => (
                            <motion.tr
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{
                                    backgroundColor: `${VANTAGE_THEME.primary}05`,
                                    scale: 1.01
                                }}
                                className="cursor-pointer group transition-all"
                                style={{ borderBottom: `1px solid ${VANTAGE_THEME.border}20` }}
                            >
                                <td className="px-6 py-4" style={{ color: VANTAGE_THEME.textDark }}>
                                    {idx + 1}
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-semibold" style={{ color: VANTAGE_THEME.textLight }}>
                                            {token.symbol}
                                        </div>
                                        <div className="text-sm" style={{ color: VANTAGE_THEME.textDark }}>
                                            {token.name}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="font-bold" style={{ color: VANTAGE_THEME.primary }}>
                                        {(token.value || token.balance || 0).toLocaleString()}
                                    </div>
                                    {token.change !== 0 && (
                                        <div
                                            className="text-sm"
                                            style={{
                                                color: token.change >= 0 ? VANTAGE_THEME.success : VANTAGE_THEME.error
                                            }}
                                        >
                                            {token.change >= 0 ? '+' : ''}{token.change}%
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-semibold"
                                        style={{
                                            background: `${VANTAGE_THEME.secondary}20`,
                                            color: VANTAGE_THEME.secondary
                                        }}
                                    >
                                        {token.chain}
                                    </span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {sortedHoldings.length === 0 && (
                    <div className="text-center py-12" style={{ color: VANTAGE_THEME.textDark }}>
                        No tokens found
                    </div>
                )}
            </div>
        </div>
    );
}
