'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { FaWallet, FaChartLine, FaLayerGroup, FaBrain, FaDownload, FaShare } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import OverviewTab from '@/components/dashboard/OverviewTab';
import ChainsTab from '@/components/dashboard/ChainsTab';
import HoldingsTab from '@/components/dashboard/HoldingsTab';
import AIInsightsTab from '@/components/dashboard/AIInsightsTab';
import AIChat from '@/components/dashboard/AIChat';

// Utils
import { saveWalletData, getWalletData, getCacheAge } from '@/components/dashboard/utils/localStorage';
import { transformAlchemyData } from '@/components/dashboard/utils/dataTransform';
import { VANTAGE_THEME } from '@/components/dashboard/utils/theme';
import { getBatchTokenPrices, CHAIN_TO_PLATFORM } from '@/components/dashboard/utils/coingecko';

function AIDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const wallet = searchParams.get('wallet');
  const network = searchParams.get('network') || 'BSC';

  useEffect(() => {
    if (!wallet) {
      router.push('/');
    }
  }, [wallet, router]);

  // State
  const [isLoading, setIsLoading] = useState(true);
  const [walletData, setWalletData] = useState(null);
  const [aiInsights, setAiInsights] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showChat, setShowChat] = useState(false);
  const [cacheAge, setCacheAge] = useState(null);

  // Load wallet data
  useEffect(() => {
    if (wallet) {
      loadWalletData();
    }
  }, [wallet]);

  const loadWalletData = async () => {
    setIsLoading(true);

    try {
      // Check cache first
      const cached = getWalletData(wallet);
      const age = getCacheAge(wallet);

      if (cached) {
        console.log('📦 Using cached data');
        setWalletData(cached);
        setCacheAge(age);
        setIsLoading(false);
        toast.success(`✓ Loaded from cache (${age}m ago)`);

        // Fetch AI insights in background
        loadAIInsights(cached);
        return;
      }

      // Fetch from API
      toast.loading('🔍 Scanning wallet...', { id: 'scan' });

      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chains: [network] })
      });

      if (!response.ok) throw new Error('Scan failed');

      const scanData = await response.json();

      // Transform data
      const transformed = transformAlchemyData(scanData);

      // Enhance with prices (optional)
      await enhanceWithPrices(transformed);

      // Save to localStorage
      saveWalletData(wallet, transformed);

      setWalletData(transformed);
      setCacheAge(0);
      toast.success('✓ Wallet data loaded!', { id: 'scan' });

      // Fetch AI insights
      loadAIInsights(transformed);

    } catch (error) {
      console.error('Error loading wallet:', error);
      toast.error('Failed to load wallet data', { id: 'scan' });
      setTimeout(() => router.push('/'), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAIInsights = async (data) => {
    try {
      const response = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analytics: data.analytics,
          wallet: wallet
        })
      });

      if (response.ok) {
        const insights = await response.json();
        setAiInsights(insights);
      }
    } catch (error) {
      console.error('AI insights error:', error);
    }
  };

  const enhanceWithPrices = async (data) => {
    try {
      const platform = CHAIN_TO_PLATFORM[network] || 'binance-smart-chain';
      const addresses = data.allTokens
        .filter(t => t.contractAddress && t.contractAddress !== '0x0000000000000000000000000000000000000000')
        .map(t => t.contractAddress)
        .slice(0, 10); // Limit to avoid rate limits

      if (addresses.length > 0) {
        const prices = await getBatchTokenPrices(addresses, platform);

        // Update tokens with prices
        data.allTokens.forEach(token => {
          const priceData = prices[token.contractAddress?.toLowerCase()];
          if (priceData) {
            token.priceUSD = priceData.usd;
            token.change24h = priceData.usd_24h_change;
            token.valueUSD = token.balance * (priceData.usd || 0);
          }
        });
      }
    } catch (error) {
      console.error('Price fetch error:', error);
    }
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success('✓ Dashboard link copied!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleDownload = async () => {
    try {
      toast.loading('Generating PDF...', { id: 'pdf' });

      const element = document.getElementById('dashboard-content');
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: VANTAGE_THEME.background
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`vantage-portfolio-${wallet.slice(0, 8)}.pdf`);

      toast.success('✓ PDF downloaded!', { id: 'pdf' });
    } catch (error) {
      toast.error('Failed to generate PDF', { id: 'pdf' });
    }
  };

  // Loading state
  if (isLoading || !walletData) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: VANTAGE_THEME.background }}
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 rounded-full mx-auto mb-4"
            style={{
              borderColor: `${VANTAGE_THEME.border}`,
              borderTopColor: VANTAGE_THEME.primary
            }}
          />
          <p style={{ color: VANTAGE_THEME.text }}>Loading premium dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartLine },
    { id: 'holdings', label: 'Holdings', icon: FaWallet },
    { id: 'chains', label: 'Chains', icon: FaLayerGroup },
    { id: 'insights', label: 'AI Insights', icon: FaBrain }
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: VANTAGE_THEME.background }}
    >
      <Toaster position="top-right" />

      {/* Header */}
      <DashboardHeader
        wallet={wallet}
        network={network}
        onToggleChat={() => setShowChat(!showChat)}
        cacheAge={cacheAge}
      />

      {/* Main Content */}
      <main id="dashboard-content" className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Stats Cards */}
        <DashboardStats analytics={walletData.analytics} />

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all"
            style={{
              background: VANTAGE_THEME.cardBg,
              border: `1px solid ${VANTAGE_THEME.border}`,
              color: VANTAGE_THEME.textLight
            }}
          >
            <FaShare />
            Share
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all"
            style={{
              background: VANTAGE_THEME.cardBg,
              border: `1px solid ${VANTAGE_THEME.border}`,
              color: VANTAGE_THEME.textLight
            }}
          >
            <FaDownload />
            Export PDF
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2"
              style={{
                background: activeTab === tab.id
                  ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                  : VANTAGE_THEME.cardBg,
                color: activeTab === tab.id ? '#fff' : VANTAGE_THEME.text,
                border: `1px solid ${activeTab === tab.id ? VANTAGE_THEME.primary : VANTAGE_THEME.border}`
              }}
            >
              <tab.icon />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <OverviewTab
                chainDistribution={walletData.chainDistribution}
                topHoldings={walletData.topHoldings}
                analytics={walletData.analytics}
              />
            )}
            {activeTab === 'holdings' && (
              <HoldingsTab holdings={walletData.topHoldings} />
            )}
            {activeTab === 'chains' && (
              <ChainsTab
                chains={walletData.chains}
                analytics={walletData.analytics}
              />
            )}
            {activeTab === 'insights' && (
              <AIInsightsTab
                insights={aiInsights}
                analytics={walletData.analytics}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* AI Chat */}
      <AnimatePresence>
        {showChat && (
          <AIChat
            walletData={walletData}
            onClose={() => setShowChat(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AIPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: VANTAGE_THEME.background }}>
        <div className="animate-spin rounded-full h-16 w-16 border-4" style={{ borderColor: `${VANTAGE_THEME.border}`, borderTopColor: VANTAGE_THEME.primary }} />
      </div>
    }>
      <AIDashboard />
    </Suspense>
  );
}
