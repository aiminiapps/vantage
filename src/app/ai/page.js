'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { FaWallet, FaChartLine, FaLayerGroup, FaBrain, FaDownload, FaShare, FaBug, FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import OverviewTab from '@/components/dashboard/OverviewTab';
import ChainsTab from '@/components/dashboard/ChainsTab';
import HoldingsTab from '@/components/dashboard/HoldingsTab';
import AIInsightsTab from '@/components/dashboard/AIInsightsTab';
import AnalyticsTab from '@/components/dashboard/AnalyticsTab';
import AdvancedChartsTab from '@/components/dashboard/AdvancedChartsTab';
import MultiWalletTab from '@/components/dashboard/MultiWalletTab';
import AIChat from '@/components/dashboard/AIChat';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';

// Utils
import { saveWalletData, getWalletData, getCacheAge } from '@/components/dashboard/utils/localStorage';
import { transformAlchemyData } from '@/components/dashboard/utils/dataTransform';
import { VANTAGE_THEME } from '@/components/dashboard/utils/theme';
import { getBatchTokenPricesEnhanced, calculatePortfolioValue } from '@/components/dashboard/utils/coingecko';

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
  const [rawApiData, setRawApiData] = useState(null);
  const [aiInsights, setAiInsights] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showChat, setShowChat] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
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

      if (cached && age < 5) { // Use cache if less than 5 minutes old
        console.log('📦 Using cached data', cached);
        setWalletData(cached);
        setCacheAge(age);
        setIsLoading(false);
        toast.success(`✓ Loaded from cache (${age}m ago)`);
        loadAIInsights(cached);
        return;
      }

      // Fetch from API
      toast.loading('🔍 Scanning wallet...', { id: 'scan' });

      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chains: [network.toLowerCase()] })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Scan failed');
      }

      const scanData = await response.json();
      console.log('📥 Raw API Response:', scanData);
      setRawApiData(scanData);

      // Transform data
      const transformed = transformAlchemyData(scanData);
      console.log('✨ Transformed Data:', transformed);

      // Fetch prices and calculate USD values
      toast.loading('💰 Fetching live prices...', { id: 'prices' });

      try {
        const prices = await getBatchTokenPricesEnhanced(transformed.allTokens, transformed);
        const portfolioValue = calculatePortfolioValue(transformed.allTokens, prices);

        // Update analytics with real values
        transformed.analytics.totalValue = portfolioValue.totalValue;
        transformed.analytics.totalPnL = portfolioValue.totalChange24h;
        transformed.analytics.totalChangePercent = portfolioValue.totalChangePercent;

        console.log(`💰 Portfolio Value: $${portfolioValue.totalValue.toFixed(2)}`);
        toast.success(`✓ Portfolio: $${portfolioValue.totalValue.toFixed(2)}`, { id: 'prices' });
      } catch (priceError) {
        console.error('Price fetch error:', priceError);
        toast.error('Could not fetch prices', { id: 'prices' });
      }

      // Save to localStorage
      saveWalletData(wallet, transformed);

      setWalletData(transformed);
      setCacheAge(0);
      toast.success(`✓ Found ${transformed.allTokens.length} assets!`, { id: 'scan' });

      // Fetch AI insights
      loadAIInsights(transformed);

    } catch (error) {
      console.error('Error loading wallet:', error);
      toast.error(`Failed: ${error.message}`, { id: 'scan' });
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

  // Show skeleton loader while loading
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartLine },
    { id: 'analytics', label: 'Analytics', icon: FaChartLine },
    { id: 'advanced', label: 'Advanced Charts', icon: FaLayerGroup },
    { id: 'holdings', label: 'Holdings', icon: FaWallet },
    { id: 'chains', label: 'Chains', icon: FaLayerGroup },
    { id: 'multiwallet', label: 'Multi-Wallet', icon: FaWallet },
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
        {/* Stats Cards - PREMIUM */}
        <DashboardStats analytics={walletData.analytics} />

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDebug(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all"
            style={{
              background: `${VANTAGE_THEME.warning}20`,
              border: `1px solid ${VANTAGE_THEME.warning}`,
              color: VANTAGE_THEME.warning
            }}
          >
            <FaBug />
            Debug API
          </motion.button>
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
            {activeTab === 'analytics' && (
              <AnalyticsTab
                walletData={walletData}
                analytics={walletData.analytics}
              />
            )}
            {activeTab === 'advanced' && (
              <AdvancedChartsTab walletData={walletData} />
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
            {activeTab === 'multiwallet' && (
              <MultiWalletTab
                currentWallet={wallet}
                onWalletChange={(newWallet) => {
                  router.push(`/ai?wallet=${newWallet}&network=${network}`);
                }}
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

      {/* Debug Modal */}
      <AnimatePresence>
        {showDebug && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)' }}
            onClick={() => setShowDebug(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full max-h-[80vh] overflow-auto rounded-2xl p-6"
              style={{
                background: VANTAGE_THEME.cardBg,
                border: `1px solid ${VANTAGE_THEME.border}`
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                  🐛 Debug: API Response
                </h3>
                <button
                  onClick={() => setShowDebug(false)}
                  className="p-2 rounded-lg"
                  style={{ background: `${VANTAGE_THEME.error}20` }}
                >
                  <FaTimes style={{ color: VANTAGE_THEME.error }} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: VANTAGE_THEME.info }}>
                    Raw API Data:
                  </h4>
                  <pre
                    className="p-4 rounded-xl text-xs overflow-auto"
                    style={{
                      background: VANTAGE_THEME.background,
                      color: VANTAGE_THEME.text
                    }}
                  >
                    {JSON.stringify(rawApiData, null, 2)}
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{ color: VANTAGE_THEME.success }}>
                    Transformed Data:
                  </h4>
                  <pre
                    className="p-4 rounded-xl text-xs overflow-auto"
                    style={{
                      background: VANTAGE_THEME.background,
                      color: VANTAGE_THEME.text
                    }}
                  >
                    {JSON.stringify(walletData, null, 2)}
                  </pre>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
