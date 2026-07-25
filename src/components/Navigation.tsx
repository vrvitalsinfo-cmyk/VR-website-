import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Globe,
  Menu,
  X,
  ShoppingCart
} from 'lucide-react';
import logo from '../../assets/logo-transparent.png';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navigation({ currentTab, setCurrentTab }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Grouped items aligned with VR Vitals' key educational and analysis sections
  const navItems = [
    { id: 'home', label: 'Home', hasDropdown: false },
    { id: 'academy', label: 'Academy', hasDropdown: false },
    { id: 'mentorship', label: 'Mentorship', hasDropdown: false },
    { id: 'pricing', label: 'Pricing Plans', hasDropdown: false },
    { id: 'about', label: 'About Us', hasDropdown: false },
    { id: 'calculator', label: 'Risk Sizer', hasDropdown: false },
  ];

  // Tickers simulation for real-time sandbox status
  const tickers = [
    { name: 'NIFTY 50', price: '24,285.50', change: '+1.25%', isUp: true },
    { name: 'SENSEX', price: '79,420.10', change: '+0.95%', isUp: true },
    { name: 'RELIANCE', price: '1,248.50', change: '+1.88%', isUp: true },
    { name: 'TATA MOTORS', price: '948.20', change: '+2.15%', isUp: true },
    { name: 'HDFC BANK', price: '1,618.00', change: '+1.88%', isUp: true },
    { name: 'GOLD', price: '2,410.50', change: '+0.32%', isUp: true },
  ];

  return (
    <header className="w-full bg-[#0A0A0F] border-b border-violet-500/15 sticky top-0 z-50 transition-all duration-300 shadow-lg shadow-black/40">
      
      {/* Upper Thinnest Tape */}
      <div className="bg-[#04040A] text-[10px] font-mono border-b border-white/5 py-1 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] gap-10 px-4">
          {[...tickers, ...tickers, ...tickers].map((ticker, idx) => (
            <div key={idx} className="inline-flex items-center gap-1.5 text-[#6B7280] font-light">
              <span className="font-semibold text-[#9CA3AF] tracking-tight uppercase font-secondary">{ticker.name}</span>
              <span className="text-[#F5F5F7] font-medium font-mono">{ticker.price}</span>
              <span className={`font-bold font-mono ${ticker.isUp ? 'text-[#2DD4BF]' : 'text-[#EF4444]'}`}>
                {ticker.change}
              </span>
              <span className="text-slate-800">/</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          
          {/* VR Vitals Logo Group */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setCurrentTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center cursor-pointer group transition-all duration-300"
          >
            <img
              src={logo}
              alt="VR Vitals Trading Academy"
              className="h-20 w-auto select-none group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all duration-300"
            />
          </motion.div>

          {/* Desktop Navigation Link Cluster */}
          <nav className="hidden lg:flex items-center gap-4 font-sans">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`group relative flex items-center gap-1 text-[12px] font-bold tracking-wider uppercase font-mono transition-all duration-300 ease-in-out px-3 py-2 cursor-pointer select-none outline-none ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Subtle chevron for items with dropdown behavior */}
                  {item.hasDropdown && (
                    <ChevronDown className="h-3.5 w-3.5 text-slate-500 group-hover:text-violet-400 transition-transform duration-250 group-hover:rotate-180 relative z-10" />
                  )}

                  {/* Elegant subtle underline transition effect using #8B5CF6 */}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-[#8B5CF6] transition-transform duration-300 rounded-full origin-left ${
                    isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                  }`} />
                </button>
              );
            })}
          </nav>

          {/* Right Action Trigger or Mobile Toggle */}
          <div className="flex items-center gap-4">
            
            {/* Unified Academic Action Button with custom micro-animations */}
            <motion.button
              whileHover={{ 
                scale: 1.03, 
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
                borderColor: '#8B5CF6'
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentTab('pricing')}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] text-white hover:opacity-95 cursor-pointer transition-all shadow-md shadow-violet-500/15"
            >
              <span>Join Academy</span>
            </motion.button>

            {/* Mobile hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-900/60 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden bg-[#0C0C14] border-t border-[#2A2A38] absolute top-full left-0 w-full shadow-2xl z-40"
          >
            <div className="px-4 py-6 space-y-4 font-sans">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                      isActive 
                        ? 'bg-[#141420] text-[#F5F5F7] border-l-2 border-[#8B5CF6] pl-3.5' 
                        : 'text-[#6B7280] hover:text-[#F5F5F7] hover:bg-[#141420]/50'
                    }`}
                  >
                    <span className="font-sans">{item.label}</span>
                    {item.hasDropdown && <ChevronDown className="h-4 w-4 text-[#6B7280]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>

    </header>
  );
}
