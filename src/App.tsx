/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Academy from './components/Academy';
import Mentorship from './components/Mentorship';
import Pricing from './components/Pricing';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Legal from './components/Legal';
import RiskCalculator from './components/RiskCalculator';
import Footer from './components/Footer';
import { MOCK_TRADE_SETUPS } from './mockData';
import { TradeSetup } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedSetup, setSelectedSetup] = useState<TradeSetup>(MOCK_TRADE_SETUPS[0]);

  // Load setup details directly into Position Sizing Risk Calculator
  const handleLoadSetupToCalculator = (setup: TradeSetup) => {
    setSelectedSetup(setup);
    setCurrentTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#9CA3AF] flex flex-col font-secondary antialiased relative selection:bg-violet-500/30 selection:text-violet-200">
      {/* Ambient background container to clip overflowing decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Ambient background glows for a luxurious, tech-forward aesthetic */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-violet-600/[0.04] rounded-full blur-[150px]" />
        
        {/* Gradient overlay (bottom-right): deep purple fading up, roughly #2E1A5C → transparent */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#2E1A5C]/15 rounded-full blur-[160px]" />
      </div>

      {/* Dynamic Header & Ticker tape */}
      <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {currentTab === 'home' && (
              <Home 
                setCurrentTab={setCurrentTab} 
                onUnlockClick={() => setCurrentTab('pricing')} 
              />
            )}

            {currentTab === 'academy' && <Academy />}

            {currentTab === 'mentorship' && <Mentorship setCurrentTab={setCurrentTab} />}

            {currentTab === 'pricing' && <Pricing />}

            {currentTab === 'about' && <AboutUs />}

            {currentTab === 'contact' && <Contact />}

            {currentTab === 'legal' && <Legal />}

            {currentTab === 'calculator' && (
              <RiskCalculator
                initialEntry={selectedSetup.entry}
                initialSL={selectedSetup.stopLoss}
                initialTP={selectedSetup.takeProfit}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Permanent Regulatory Compliance Footer */}
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}
