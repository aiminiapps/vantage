'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FaFire, FaSnowflake, FaChartLine } from 'react-icons/fa';
import { VANTAGE_THEME } from '../utils/theme';

/**
 * Correlation Matrix - Shows price correlations between top tokens
 * Helps identify diversification opportunities
 */
export default function CorrelationMatrix({ tokens = [] }) {
  const [timeframe, setTimeframe] = useState('7d');
  const [hoveredCell, setHoveredCell] = useState(null);

  // Take top 10 tokens by value
  const topTokens = useMemo(() => {
    return tokens
      .filter(t => t.valueUSD > 10) // Minimum $10 value
      .sort((a, b) => b.valueUSD - a.valueUSD)
      .slice(0, 10);
  }, [tokens]);

  // Calculate correlation matrix (simplified - using price change as proxy)
  const correlationMatrix = useMemo(() => {
    const matrix = [];
    
    topTokens.forEach((token1, i) => {
      const row = [];
      topTokens.forEach((token2, j) => {
        if (i === j) {
          row.push(1.0); // Perfect correlation with itself
        } else {
          // Simplified correlation based on 24h price change similarity
          const change1 = token1.priceChange24h || 0;
          const change2 = token2.priceChange24h || 0;
          
          // Normalize and calculate simple correlation
          const correlation = Math.cos((change1 - change2) * Math.PI / 200);
          row.push(Math.max(-1, Math.min(1, correlation)));
        }
      });
      matrix.push(row);
    });
    
    return matrix;
  }, [topTokens, timeframe]);

  // Get color based on correlation value
  const getCorrelationColor = (value) => {
    if (value > 0.7) return VANTAGE_THEME.success;
    if (value > 0.3) return '#10b98160';
    if (value > -0.3) return VANTAGE_THEME.text;
    if (value > -0.7) return '#ef444460';
    return VANTAGE_THEME.error;
  };

  // Get background opacity based on correlation strength
  const getBackgroundOpacity = (value) => {
    const abs = Math.abs(value);
    return abs * 0.3 + 0.1; // 0.1 to 0.4
  };

  if (topTokens.length < 2) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl text-center"
        style={{
          background: VANTAGE_THEME.cardBg,
          border: `1px solid ${VANTAGE_THEME.border}`
        }}
      >
        <p style={{ color: VANTAGE_THEME.text }}>
          Need at least 2 tokens to calculate correlations
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl"
      style={{
        background: VANTAGE_THEME.cardBg,
        border: `1px solid ${VANTAGE_THEME.border}`
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
            }}
          >
            <FaChartLine style={{ color: '#fff', fontSize: '1.5rem' }} />
          </div>
          <div>
            <h3 className="text-xl font-bold" style={{ color: VANTAGE_THEME.textLight }}>
              Correlation Matrix
            </h3>
            <p className="text-sm" style={{ color: VANTAGE_THEME.text }}>
              Token price relationships
            </p>
          </div>
        </div>

        {/* Timeframe selector */}
        <div className="flex gap-2">
          {['7d', '30d'].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: timeframe === tf
                  ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                  : VANTAGE_THEME.background,
                color: timeframe === tf ? '#fff' : VANTAGE_THEME.text,
                border: `1px solid ${timeframe === tf ? VANTAGE_THEME.primary : VANTAGE_THEME.border}`
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mb-6 p-4 rounded-xl" style={{ background: VANTAGE_THEME.background }}>
        <div className="flex items-center gap-2">
          <FaSnowflake style={{ color: VANTAGE_THEME.error }} />
          <span className="text-sm" style={{ color: VANTAGE_THEME.text }}>
            Negative Correlation
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaFire style={{ color: VANTAGE_THEME.success }} />
          <span className="text-sm" style={{ color: VANTAGE_THEME.text }}>
            Positive Correlation
          </span>
        </div>
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Column headers */}
          <div className="flex">
            <div className="w-24" /> {/* Empty corner */}
            {topTokens.map((token, i) => (
              <div
                key={i}
                className="w-20 text-center py-2 font-semibold text-xs"
                style={{ color: VANTAGE_THEME.textLight }}
              >
                {token.symbol}
              </div>
            ))}
          </div>

          {/* Matrix rows */}
          {topTokens.map((rowToken, i) => (
            <div key={i} className="flex items-center">
              {/* Row header */}
              <div
                className="w-24 py-2 pr-3 text-right font-semibold text-xs"
                style={{ color: VANTAGE_THEME.textLight }}
              >
                {rowToken.symbol}
              </div>

              {/* Cells */}
              {correlationMatrix[i].map((correlation, j) => (
                <motion.div
                  key={j}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  onHoverStart={() => setHoveredCell({ i, j, correlation })}
                  onHoverEnd={() => setHoveredCell(null)}
                  className="w-20 h-20 flex items-center justify-center rounded-lg cursor-pointer relative"
                  style={{
                    background: `${getCorrelationColor(correlation)}${Math.floor(getBackgroundOpacity(correlation) * 255).toString(16).padStart(2, '0')}`,
                    border: `1px solid ${getCorrelationColor(correlation)}40`,
                    margin: '2px'
                  }}
                >
                  <span
                    className="font-bold text-sm"
                    style={{ color: getCorrelationColor(correlation) }}
                  >
                    {correlation.toFixed(2)}
                  </span>

                  {/* Tooltip */}
                  {hoveredCell?.i === i && hoveredCell?.j === j && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full mb-2 p-3 rounded-lg shadow-lg whitespace-nowrap z-20"
                      style={{
                        background: VANTAGE_THEME.background,
                        border: `1px solid ${VANTAGE_THEME.border}`
                      }}
                    >
                      <div className="text-xs mb-1" style={{ color: VANTAGE_THEME.textLight }}>
                        {topTokens[i].symbol} × {topTokens[j].symbol}
                      </div>
                      <div className="text-sm font-bold" style={{ color: getCorrelationColor(correlation) }}>
                        {correlation > 0.7 ? 'Strong Positive' :
                         correlation > 0.3 ? 'Weak Positive' :
                         correlation > -0.3 ? 'No Correlation' :
                         correlation > -0.7 ? 'Weak Negative' :
                         'Strong Negative'}
                      </div>
                      <div className="text-xs mt-1" style={{ color: VANTAGE_THEME.text }}>
                        Correlation: {(correlation * 100).toFixed(0)}%
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 rounded-xl" style={{ background: VANTAGE_THEME.background }}>
        <h4 className="font-semibold mb-2" style={{ color: VANTAGE_THEME.textLight }}>
          💡 Diversification Insights
        </h4>
        <ul className="text-sm space-y-1" style={{ color: VANTAGE_THEME.text }}>
          <li>• Perfect diversification: Find tokens with negative correlation (blue)</li>
          <li>• Reduce risk: Avoid high correlation (green) between major holdings</li>
          <li>• Correlation closer to 0 = better diversification</li>
        </ul>
      </div>
    </motion.div>
  );
}
