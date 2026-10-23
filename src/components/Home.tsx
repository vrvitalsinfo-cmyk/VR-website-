import LiveMarket from './LiveMarket';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  ShieldAlert,
  Download,
  Calendar,
  BookOpen,
  Cpu,
  Layers,
  Lock,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle,
  Globe,
  Flame,
  CandlestickChart,
  ShieldCheck,
  UserRoundCheck,
  Building2
} from 'lucide-react';
import { MOCK_TRADE_SETUPS } from '../mockData';
import Reveal from './Reveal';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
  onUnlockClick: () => void;
}

export default function Home({ setCurrentTab, onUnlockClick }: HomeProps) {
  // Testimonial state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      quote: "Before V R Vitals, I was blindly chasing Telegram tips and losing capital. Their Price Action course taught me how to read the thinned order book and identify systemic volume pools. Totally transformed my risk sizer methodology.",
      author: "Aditya Verma",
      role: "Independent Commodities Trader",
      metrics: "Recovered -15% Drawdown, now 3.2x average R:R ratio",
      stars: 5
    },
    {
      quote: "The Risk Sizer and Price Action blueprints are incredible. Spotted key block imbalances before the breakout on RELIANCE occurred. Combining their structural modules with position scaling is a cheat code.",
      author: "Priya Nair",
      role: "Swing Futures Trader",
      metrics: "+28% portfolio gain over 10 months with strict risk controls",
      stars: 5
    },
    {
      quote: "I signed up for the 1:1 Elite Mentorship tier. Meeting once a week with a professional who doesn't use lagging indicator noise opened my eyes. We mapped out 1-Week institutional demand zones together.",
      author: "Rajesh K. Mehta",
      role: "Executive & Part-time Options Scalper",
      metrics: "Reduced average loss by 45%, master of macro regime shifts",
      stars: 5
    }
  ];

  // Auto-slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION (Split layout replicated exactly from image) */}
      <section className="relative pt-0 pb-8 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 space-y-7 text-left">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-950/35 border border-violet-500/15 px-4 py-1.5 rounded-full text-xs font-semibold text-violet-300 tracking-wide select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span>VR VITALS TRADING ACADEMY & QUANTITATIVE SANDBOX</span>
          </div>

          {/* Huge display typography matching image */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
            Dismantling retail <br />
            <span className="text-violet-400 bg-gradient-to-r from-violet-400 via-indigo-200 to-white bg-clip-text text-transparent">financial myths.</span>
          </h1>

          {/* Subtitle description */}
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl">
            Master indicator-free Price Action, horizontal supply-demand blocks, and strict mathematical position sizing. Build robust trading cognitive parameters under the guidance of former institutional desk officers &mdash; through both offline (in-person) and online (live digital) training formats.
          </p>

          {/* checklist blocks with custom check circles */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 pt-2">
            <div className="bg-[#111122]/85 border border-white/5 rounded-2xl py-3 px-3 sm:py-3.5 sm:px-4.5 flex items-center gap-2.5 sm:gap-3.5 sm:min-w-[170px] hover:border-white/10 transition-colors">
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-2 flex items-center justify-center shrink-0">
                <CandlestickChart className="h-4 w-4 text-violet-400" />
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">Price Action</span>
            </div>

            <div className="bg-[#111122]/85 border border-white/5 rounded-2xl py-3 px-3 sm:py-3.5 sm:px-4.5 flex items-center gap-2.5 sm:gap-3.5 sm:min-w-[170px] hover:border-white/10 transition-colors">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">Risk Management</span>
            </div>

            <div className="bg-[#111122]/85 border border-white/5 rounded-2xl py-3 px-3 sm:py-3.5 sm:px-4.5 flex items-center gap-2.5 sm:gap-3.5 sm:min-w-[170px] hover:border-white/10 transition-colors">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2 flex items-center justify-center shrink-0">
                <UserRoundCheck className="h-4 w-4 text-amber-400" />
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">Bespoke Mentorship</span>
            </div>

            <div className="bg-[#111122]/85 border border-white/5 rounded-2xl py-3 px-3 sm:py-3.5 sm:px-4.5 flex items-center gap-2.5 sm:gap-3.5 sm:min-w-[170px] hover:border-white/10 transition-colors">
              <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-2 flex items-center justify-center shrink-0">
                <Building2 className="h-4 w-4 text-sky-400" />
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">Offline & Online Classes</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-3">
            {/* Get Started (Purple to Violet gradient) */}
            <motion.button
              onClick={() => setCurrentTab('pricing')}
              className="flex items-center justify-between gap-5 bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] hover:opacity-95 text-white font-bold pl-7 pr-3.5 py-3 rounded-2xl transition-colors duration-300 group active:scale-[0.98] cursor-pointer"
            >
              <span className="text-sm tracking-wide">Join the Academy</span>
              <div className="bg-white/15 rounded-xl p-2.5 flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </div>
            </motion.button>

            {/* Contact Support */}
            <motion.button
              onClick={() => setCurrentTab('contact')}
              className="flex items-center justify-center bg-[#111122]/45 border border-white/10 text-white font-semibold px-7 py-4.5 rounded-2xl hover:bg-white/5 transition-colors duration-300 active:scale-[0.98] cursor-pointer text-sm"
            >
              Contact Support
            </motion.button>
          </div>
        </div>

        {/* Right Column: Replicated Live Dashboard Mock Card */}
        <div className="lg:col-span-5 relative">
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139, 92, 246, 0.25)', borderColor: '#8B5CF6' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-full rounded-3xl border border-[#2A2A38] bg-[#141420]/80 backdrop-blur-md p-6 shadow-2xl relative overflow-hidden group transition-colors duration-300"
          >
            {/* Ambient light glow behind */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-violet-600/[0.12] rounded-full blur-[100px] pointer-events-none" />
            
            {/* Inner Header matching image */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <TrendingUp className="h-4 w-4 text-violet-400" />
                <span className="font-sans text-xs font-extrabold uppercase tracking-widest text-white">US Stock Market</span>
              </div>
              
              <span className="text-xs font-mono text-teal-300">MARKET WATCH</span>
            </div>

            <LiveMarket />
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <Reveal y={16} className="bg-[#030712]/45 border-y border-white/5 py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0A0A16]/50 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center relative z-10">
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-white tracking-tight">5+ Years</p>
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">Market Experience Active</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 sm:border-x border-white/5 pt-4 sm:pt-0">
            <p className="text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-[#A78BFA] to-violet-400 bg-clip-text text-transparent">12,000+</p>
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">Students Trained Globally</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 pt-4 sm:pt-0">
            <p className="text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-teal-300 to-[#A78BFA] bg-clip-text text-transparent">NSE, BSE</p>
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">Asset Regimes Covered</p>
          </div>
        </div>
      </Reveal>

      {/* 3. THREE-PILLAR SNAPSHOT */}
      <Reveal className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Three Pillars of Market Mastery</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-light">
            We do not believe in short-cuts. Our methodology marries technical design, live algorithmic feeds, and 1:1 human calibration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1 */}
          <motion.div 
            onClick={() => setCurrentTab('academy')}
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)', borderColor: '#8B5CF6' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#141420]/80 border border-[#2A2A38] backdrop-blur-md p-6 sm:p-8 rounded-2xl space-y-4 cursor-pointer group relative transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
            <div className="bg-violet-500/10 border border-violet-500/15 w-11 h-11 rounded-xl text-violet-400 flex items-center justify-center transition-all group-hover:scale-110">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-md font-bold text-white group-hover:text-violet-300 transition-colors">I. Technical Education</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Master candle order-flow, liquidity zones, supply-demand blocks, and mathematical moving average bands. No magic formulas—just clean market architecture.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-violet-400 font-mono font-semibold group-hover:underline pt-2">
              <span>View Roadmaps</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div 
            onClick={() => setCurrentTab('calculator')}
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)', borderColor: '#8B5CF6' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#141420]/80 border border-[#2A2A38] backdrop-blur-md p-6 sm:p-8 rounded-2xl space-y-4 cursor-pointer group relative transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
            <div className="bg-violet-500/10 border border-violet-500/15 w-11 h-11 rounded-xl text-violet-400 flex items-center justify-center transition-all group-hover:scale-110">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-md font-bold text-white group-hover:text-violet-300 transition-colors">II. Mathematical Risk Sizer</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Calibrate your positions with mathematical precision. Control systemic risk-to-reward ratios and prevent catastrophic drawdowns using standard institutional calculators.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-violet-400 font-mono font-semibold group-hover:underline pt-2">
              <span>Launch Risk Sizer</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div 
            onClick={() => setCurrentTab('mentorship')}
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)', borderColor: '#8B5CF6' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#141420]/80 border border-[#2A2A38] backdrop-blur-md p-6 sm:p-8 rounded-2xl space-y-4 cursor-pointer group relative transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
            <div className="bg-violet-500/10 border border-violet-500/15 w-11 h-11 rounded-xl text-violet-400 flex items-center justify-center transition-all group-hover:scale-110">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="text-md font-bold text-white group-hover:text-violet-300 transition-colors">III. Factual Mentorship</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Direct group analysis or bespoke 1:1 strategy reviews with seasoned industry veterans. Devoid of guaranteed-return sales tactics or dynamic hype.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-violet-400 font-mono font-semibold group-hover:underline pt-2">
              <span>Book Calendar</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </motion.div>
        </div>
      </Reveal>

      {/* 4. LIVE PREVIEW TEASER WIDGET (BLURRED / LOCKED FOR NON-MEMBERS) */}
      <Reveal className="relative">
        <motion.div
          whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(139, 92, 246, 0.15)', borderColor: '#8B5CF6' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-[#141420]/80 border border-[#2A2A38] backdrop-blur-md rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden transition-colors duration-300"
        >
        {/* Subtle decorative glow */}
        <div className="absolute top-[-20%] right-[-20%] w-[35%] h-[50%] bg-violet-600/[0.08] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-white/5 pb-6 relative z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-violet-300 bg-violet-500/10 border border-violet-500/15 px-2.5 py-0.5 rounded uppercase font-bold tracking-widest">
              Live Feed Sandbox
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Active Intelligence Preview</h2>
            <p className="text-xs text-slate-400 font-light font-sans max-w-xl">
              Preview our real-time system alerts. Institutional alerts and full R:R coordinates are locked behind our premium cohort memberships.
            </p>
          </div>
          <button
            onClick={onUnlockClick}
            className="flex items-center gap-2 bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] text-white font-bold px-6 py-3.5 rounded-2xl hover:opacity-95 transition-all text-xs active:scale-95 cursor-pointer shadow-md shadow-violet-500/20"
          >
            <Lock className="h-3.5 w-3.5" />
            Unlock Pro Feed Access
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Left: Blur Alert Feed */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
                Live Network Signals
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Updates every 45s</span>
            </div>

            <div className="bg-[#111122]/50 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5 shadow-inner">
              {/* Row 1 - Clean visible sample */}
              <div className="p-4 grid grid-cols-12 gap-2 items-center hover:bg-white/[0.02] transition-colors">
                <div className="col-span-3 text-white font-mono text-xs font-bold">RELIANCE</div>
                <div className="col-span-4 text-violet-300 font-mono text-xs font-medium">Cup & Handle Breakout</div>
                <div className="col-span-2 text-slate-300 font-mono text-xs">15-Min</div>
                <div className="col-span-3 text-right">
                  <span className="text-[9px] bg-violet-500/10 text-violet-400 border border-violet-500/15 px-2 py-0.5 rounded uppercase font-bold">High Strength</span>
                </div>
              </div>

              {/* Row 2 - Semi blurred */}
              <div className="p-4 grid grid-cols-12 gap-2 items-center relative group">
                <div className="col-span-12 absolute inset-0 bg-[#080812]/40 backdrop-blur-[3.5px] z-10 flex items-center justify-center transition-all group-hover:bg-[#080812]/50">
                  <span className="text-[10px] font-mono text-slate-300 bg-[#111122]/90 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold shadow-md">
                    <Lock className="h-3 w-3 text-violet-400" /> PRO SENSOR UNLOCK REQUIRED
                  </span>
                </div>
                <div className="col-span-3 text-slate-500 font-mono text-xs">INFY</div>
                <div className="col-span-4 text-slate-600 font-mono text-xs">Double Bottom Surge</div>
                <div className="col-span-2 text-slate-600 font-mono text-xs">1-Hour</div>
                <div className="col-span-3 text-right">
                  <span className="text-[9px] bg-white/5 text-slate-500 px-2 py-0.5 rounded uppercase font-bold">Medium</span>
                </div>
              </div>

              {/* Row 3 - Heavily blurred */}
              <div className="p-4 grid grid-cols-12 gap-2 items-center relative group">
                <div className="col-span-12 absolute inset-0 bg-[#080812]/60 backdrop-blur-[5.5px] z-10 flex items-center justify-center">
                  <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
                    <Lock className="h-3 w-3 text-slate-500" /> Blocked Content
                  </span>
                </div>
                <div className="col-span-3 text-slate-700 font-mono text-xs">TCS</div>
                <div className="col-span-4 text-slate-700 font-mono text-xs">EMA crossover 50/200</div>
                <div className="col-span-2 text-slate-700 font-mono text-xs">Daily</div>
                <div className="col-span-3 text-right">
                  <span className="text-[9px] bg-slate-800 text-slate-700 px-2 py-0.5 rounded">High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Locked Daily Market Setup */}
          <motion.div 
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)', borderColor: '#8B5CF6' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="lg:col-span-5 flex flex-col justify-between bg-[#141420]/80 border border-[#2A2A38] backdrop-blur-md p-6 rounded-2xl relative overflow-hidden group transition-colors duration-300"
          >
            {/* Lock Overlay on Card content */}
            <div className="absolute inset-0 bg-[#080812]/50 backdrop-blur-[4px] z-10 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="bg-violet-500/10 border border-violet-500/25 p-3.5 rounded-2xl text-violet-400 shadow-md">
                <Lock className="h-5 w-5 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Daily Premium Trade Plan</h4>
                <p className="text-[11px] text-slate-400 max-w-[240px] font-light leading-relaxed">
                  Every morning our chief mentors publish high R:R setups with detailed macro-reasoning.
                </p>
              </div>
              <button 
                onClick={onUnlockClick}
                className="text-[10px] font-mono font-bold bg-[#111122]/90 border border-white/10 hover:border-white/20 text-slate-200 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg active:scale-95"
              >
                Enroll to Unlock Today's Setup
              </button>
            </div>

            <div className="space-y-4 opacity-30 select-none">
              <div className="flex justify-between items-center text-xs font-mono border-b border-white/5 pb-2.5">
                <span className="text-white font-bold tracking-wider">TODAY'S SECTOR ALPHA</span>
                <span className="text-violet-400 font-bold">LONG PLAN</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Target Entry</span>
                  <span className="text-xs text-white font-mono font-bold">Rs 3,420.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Stop Loss</span>
                  <span className="text-xs text-rose-500 font-mono font-bold">Rs 3,380.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Take Profit</span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">Rs 3,550.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">R:R Ratio</span>
                  <span className="text-xs text-sky-400 font-mono font-bold">3.25x (Elite)</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 text-[10px] text-slate-500 leading-normal font-sans font-light">
                Price is sweeping liquidity on the 4H horizontal support block, matching our MACD bullish cross regime. Volume is flat, indicating distributions have dried up completely.
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      </Reveal>

      {/* 5. TESTIMONIALS CAROUSEL */}
      <Reveal className="relative">
        <motion.div
          whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(139, 92, 246, 0.2)', borderColor: '#8B5CF6' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-[#141420]/80 border border-[#2A2A38] backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden transition-colors duration-300"
        >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="flex justify-between items-center border-b border-white/5 pb-5">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500 animate-pulse" />
            <h3 className="text-sm font-bold text-white font-sans uppercase tracking-widest">
              WHAT OUR ALUMNI SAY
            </h3>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2.5 sm:p-1.5 rounded-lg bg-[#111122]/85 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer hover:border-white/15"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 sm:p-1.5 rounded-lg bg-[#111122]/85 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer hover:border-white/15"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[170px] sm:min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 text-center max-w-2xl"
            >
              {/* Star Rating */}
              <div className="flex justify-center gap-1">
                {[...Array(testimonials[currentTestimonial].stars)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-amber-500 fill-amber-500" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed font-light font-sans">
                "{testimonials[currentTestimonial].quote}"
              </p>

              <div>
                <p className="text-xs font-bold text-white font-mono">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  {testimonials[currentTestimonial].role} &middot; <span className="text-violet-400">{testimonials[currentTestimonial].metrics}</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        </motion.div>
      </Reveal>

    </div>
  );
}
