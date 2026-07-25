import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Reveal from './Reveal';
import {
  BookOpen, 
  Target, 
  Compass, 
  Award, 
  ShieldAlert, 
  Check, 
  Play, 
  Download, 
  Lock,
  Flame,
  Layers,
  Activity,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface ModuleType {
  id: string;
  code: string;
  title: string;
  desc: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  syllabus: string[];
  duration: string;
  isHot?: boolean;
}

export default function Academy() {
  const [activeModuleId, setActiveModuleId] = useState<string>('module-a');
  const [enrollStatus, setEnrollStatus] = useState<Record<string, boolean>>({});
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  const modules: ModuleType[] = [
    {
      id: 'module-a',
      code: 'Module A',
      title: 'Price Action & Market Structure',
      desc: 'Master the raw mechanics of candlesticks, locate latent institutional order block coordinates, map key liquidity pools, and execute trades cleanly without lagging lagging indicator arrays.',
      difficulty: 'Beginner',
      duration: '6 Hours',
      syllabus: [
        'Candlestick Anatomy: Understanding buying/selling thinned spreads',
        'Locating Supply & Demand Blocks (Institutional Accumulation zones)',
        'Mapping Liquidity Pools and Traps (Sweep zones)',
        'Pure Price Action: Drawing structural lines without any indicator lag'
      ],
      isHot: false
    },
    {
      id: 'module-b',
      code: 'Module B',
      title: 'Trend Identification Speed Bands',
      desc: 'Understand immediate velocity shocks. Learn how institutional automated networks deploy 50 EMA & 200 EMA crossovers, locate macro structural inflection regimes, and filter sideways consolidated market noises.',
      difficulty: 'Beginner',
      duration: '4 Hours',
      syllabus: [
        'Defining Velocity: Fast vs Slow moving averages',
        'The Golden Cross: Systemic macro-rebound confirmation catalyst',
        'The Death Cross: Safe exit triggers and liquidity hedge activations',
        'Horizontal consolidation filters: Sidestep the thinned sideways trap'
      ],
      isHot: false
    },
    {
      id: 'module-c',
      code: 'Module C',
      title: 'Momentum Exhaustion Indicators',
      desc: 'Locate cracks in market cycles before price confirms. Master advanced Relative Strength Index (RSI) distribution signatures and identify MACD zero-line momentum transitions under high volume.',
      difficulty: 'Intermediate',
      duration: '5 Hours',
      syllabus: [
        'RSI Overbought vs Oversold distributions (&gt;70 / &lt;30 structures)',
        'Bearish & Bullish Divergence setups: Spotting institutional exhaustions',
        'MACD Zero-Axis transitions: Spotting systemic volume handovers',
        'Signal crossovers: When to wait and when to execute entry plans'
      ],
      isHot: false
    },
    {
      id: 'module-d',
      code: 'Module D',
      title: 'Classic Chart Formations & Sweeps',
      desc: 'Track where retail stop-losses are clustered. Learn how algorithms sweep classic formations like Head & Shoulders and Cup & Handle setups before initiating structural reversals.',
      difficulty: 'Intermediate',
      duration: '6 Hours',
      syllabus: [
        'Head & Shoulders: Shoulder stops triggers and necklines breakdowns',
        'Cup & Handle: Rounding bottom accumulation and breakout rules',
        'Double Bottoms and Double Tops: Locating double sweep targets',
        'Confirmation Filters: High volume close thresholds'
      ],
      isHot: true
    },
    {
      id: 'module-e',
      code: 'Module E',
      title: 'Institutional Volume Profile Analysis',
      desc: 'Identify the presence of large commercial buyers. Master the volume-price relationship, isolate fake retail breakout traps, and detect subtle accumulation block allocations.',
      difficulty: 'Advanced',
      duration: '8 Hours',
      syllabus: [
        'Volume-Price Confirmation: Validating the authenticity of an expansion',
        'Identifying climax expansions: Spotting systemic exhaustion bars',
        'The 20-Day moving volume average: Sincerity breakout ratios (&gt;150%)',
        'Institutional Block order clues: Identifying silent accumulations'
      ],
      isHot: false
    },
    {
      id: 'module-f',
      code: 'Module F',
      title: 'Intraday & Swing Systems',
      desc: 'Construct a bulletproof mathematical rulebook. Manage rapid scalps, formulate structural risk sizer models, and adhere to strict risk-to-reward ratios to maintain long-term mathematical solvency.',
      difficulty: 'Advanced',
      duration: '7 Hours',
      syllabus: [
        'Scalping setups: Executing high speed 5-min order blocks',
        'Calculated Position Sizing: Controlling systemic capital risks',
        'The 1% Rule: Preventing catastrophic single trade drawdowns',
        'Advanced R:R structures: Target exits vs emergency stops'
      ],
      isHot: true
    },
    {
      id: 'module-g',
      code: 'Module G',
      title: 'Macroeconomics for Independent Traders',
      desc: 'Read the structural drivers behind index charts. Decipher central bank interest rate decisions, analyze sector rotations, and master how CPI, PPI, and bond yield curves influence indices.',
      difficulty: 'Advanced',
      duration: '9 Hours',
      syllabus: [
        'Interest rate cycle regimes: Federal Reserve and RBI actions',
        'Sector Rotations: Moving capital between Defensive and Expansion cycles',
        'Sensing Systemic Inflations: CPI and PPI rate breakdowns',
        'The Bond Yield Curve: Spotting recessions and index reversals'
      ],
      isHot: false
    },
    {
      id: 'module-h',
      code: 'Module H',
      title: 'Advanced Risk Management & Sizing',
      desc: 'Formulate dynamic risk limits, compute Kelly Criterion fraction metrics, adjust position multipliers across volatile periods, and deploy hard stop loss rules to protect principal balances.',
      difficulty: 'Advanced',
      duration: '5 Hours',
      syllabus: [
        'Defining Capital Allocation Fractions (Kelly Criterion)',
        'Volatility adjusting position sizes using ATR',
        'Multi-asset risk correlation tracking',
        'Trailing stops and partial profit booking rules'
      ],
      isHot: false
    },
    {
      id: 'module-i',
      code: 'Module I',
      title: 'Order Flow & Live Tape Reading',
      desc: 'Decode live execution tape imbalances, identify high-volume block sweeps, evaluate resting bid-ask liquidity, and spot institutional absorption patterns directly in depth of market books.',
      difficulty: 'Advanced',
      duration: '6 Hours',
      syllabus: [
        'Depth of Market (DOM) and resting liquidity maps',
        'Spotting block orders and thinned depth sweep cycles',
        'Imbalance signals in volume footprint charts',
        'Tape-reading velocity changes at key reversal zones'
      ],
      isHot: false
    },
    {
      id: 'module-j',
      code: 'Module J',
      title: 'Trading Psychology & Discipline',
      desc: 'Mitigate cognitive bias traps, avoid FOMO or revenge trading spirals, construct systematic checklist rules, and establish daily drawdowns limits to preserve long-term trading longevity.',
      difficulty: 'Beginner',
      duration: '3 Hours',
      syllabus: [
        'Anatomy of FOMO: Managing early and late chase traps',
        'Revenge trading recovery loops and mandatory cooling periods',
        'Establishing a robust pre-market checklist framework',
        'Reviewing trade logs to identify repetitive psychological errors'
      ],
      isHot: false
    }
  ];

  const handleEnroll = (moduleId: string) => {
    setEnrollStatus(prev => ({
      ...prev,
      [moduleId]: true
    }));
  };

  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];

  const triggerDownload = (mod: ModuleType) => {
    setDownloadMessage(`Downloading syllabus layout for "${mod.code} - ${mod.title}"...`);
    setTimeout(() => {
      setDownloadMessage(null);
    }, 4500);
  };

  return (
    <div className="space-y-12">
      {/* Academy Header */}
      <Reveal className="border border-white/5 bg-[#080812]/95 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-violet-600/[0.08] rounded-full blur-[100px] pointer-events-none" />
        <div className="space-y-2.5 max-w-2xl">
          <span className="text-[10px] font-mono tracking-widest text-violet-300 bg-violet-500/10 border border-violet-500/15 px-2.5 py-0.5 rounded-full uppercase font-bold">
            EDUCATIONAL BLUEPRINT
          </span>
          <h1 className="text-xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            V R Vitals Price Action Academy
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed font-light">
            Skip magical indicator hype. Our syllabus provides ten modular building blocks that map raw market mechanics, volume profiling, and macroeconomic cycles for independent retail traders. Available through both offline (in-person) and online (live digital) training formats.
          </p>
        </div>
        <div className="bg-[#111122]/90 border border-white/5 p-4 rounded-xl flex items-center gap-3 shrink-0">
          <div className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-ping" />
          <span className="text-xs font-mono text-slate-300 font-semibold">ALL 10 ROADMAPS LIVE</span>
        </div>
      </Reveal>

      {/* Download Alert Toast Container */}
      <AnimatePresence>
        {downloadMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-violet-950/80 border border-violet-500/20 text-slate-200 p-4 rounded-xl text-xs flex items-center justify-between shadow-xl"
          >
            <span className="font-mono flex items-center gap-2">
              <Download className="h-4 w-4 text-violet-400 animate-bounce" /> {downloadMessage}
            </span>
            <span className="text-[10px] bg-violet-500/20 px-2 py-0.5 rounded text-violet-300">Vector PDF layout generated</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid containing Sidebar navigation & Module Content Box */}
      <Reveal delay={0.1} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Sidebar module picker */}
        <motion.div 
          whileHover={{ boxShadow: '0 0 25px rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.2)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="lg:col-span-4 bg-[#080812]/95 border border-white/5 p-3 sm:p-4 rounded-2xl space-y-3 transition-colors duration-300"
        >
          <div className="px-2 py-1 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold border-b border-white/5 pb-3">
            <span>MODULE CURRICULUM</span>
            <span>Difficulty</span>
          </div>

          <div className="space-y-1.5 lg:max-h-[480px] lg:overflow-y-auto pr-1">
            {modules.map((m) => {
              const isActive = activeModuleId === m.id;
              return (
                <motion.button
                  key={m.id}
                  onClick={() => setActiveModuleId(m.id)}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 3, 
                    boxShadow: '0 0 15px rgba(139, 92, 246, 0.25)', 
                    borderColor: '#8B5CF6',
                    backgroundColor: 'rgba(139, 92, 246, 0.05)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center justify-between group cursor-pointer border ${
                    isActive
                      ? 'bg-violet-500/5 text-violet-300 font-bold border-violet-500/20 shadow-sm'
                      : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono bg-[#111122] px-1.5 py-0.2 rounded border border-white/5 text-slate-400">
                        {m.code}
                      </span>
                      {m.isHot && (
                        <span className="text-[8px] font-mono text-rose-400 font-bold bg-rose-500/10 border border-rose-500/15 px-1 py-0.1 rounded animate-pulse">
                          HOT
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-sans tracking-tight line-clamp-1 group-hover:text-white transition-colors">
                      {m.title}
                    </div>
                  </div>

                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                    m.difficulty === 'Beginner' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                      : m.difficulty === 'Intermediate'
                      ? 'bg-sky-500/10 text-sky-400 border border-sky-500/15'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/15'
                  }`}>
                    {m.difficulty}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Selected Module Detail Panel */}
        <motion.div 
          whileHover={{ scale: 1.005, boxShadow: '0 0 35px rgba(139, 92, 246, 0.15)', borderColor: '#8B5CF6' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="lg:col-span-8 bg-[#080812]/95 border border-white/5 p-6 sm:p-8 rounded-3xl min-h-[500px] flex flex-col justify-between relative overflow-hidden shadow-xl transition-colors duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Header inside details */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-violet-300 bg-violet-500/10 border border-violet-500/15 px-2 py-0.5 rounded font-bold uppercase">
                      {activeModule.code} Blueprint
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Duration: {activeModule.duration}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                    {activeModule.title}
                  </h2>
                </div>

                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase ${
                  activeModule.difficulty === 'Beginner' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                    : activeModule.difficulty === 'Intermediate'
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/25'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'
                }`}>
                  {activeModule.difficulty} Level
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed font-sans">
                {activeModule.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                {/* Left: Interactive/Lock Video Preview Player */}
                <div className="md:col-span-6 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                    MODULE VIDEO SAMPLE PREVIEW
                  </span>

                  {/* Mock Video Container */}
                  <div className="aspect-video bg-black/40 border border-white/5 rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-4 text-center group shadow-inner">
                    {/* Fake waveform or background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0" />
                    <div className="absolute top-3 left-3 text-[8px] font-mono bg-[#111122] border border-white/5 text-slate-400 px-1.5 py-0.5 rounded z-10 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" /> LOCKED CHAPTER SAMPLE
                    </div>

                    <div className="relative z-10 space-y-3">
                      <div className="w-10 h-10 bg-violet-500/10 border border-violet-500/25 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 rounded-full flex items-center justify-center text-violet-400 transition-all duration-300 transform group-hover:scale-110 shadow-md">
                        <Lock className="h-4.5 w-4.5 animate-bounce" />
                      </div>
                      <p className="text-[10px] font-mono text-slate-400 font-bold px-3">
                        Video Sample: &ldquo;Deciphering the Order Book&rdquo;
                      </p>
                      <button 
                        onClick={() => handleEnroll(activeModule.id)}
                        className="text-[9px] font-mono bg-[#111122] hover:bg-[#16162a] border border-white/5 hover:border-white/10 text-slate-200 font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                      >
                        Enroll to play
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Detailed Syllabus List */}
                <div className="md:col-span-6 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                    INCLUDED SYLLABUS ROADMAP
                  </span>

                  <div className="bg-[#111122]/20 border border-white/5 rounded-xl p-4.5 space-y-3 shadow-inner">
                    <ul className="space-y-2.5">
                      {activeModule.syllabus.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-slate-300 leading-normal font-sans font-light">
                          <Check className="h-3.5 w-3.5 text-violet-400 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Download Syllabus PDF Simulation */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(139, 92, 246, 0.25)', borderColor: '#8B5CF6' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => triggerDownload(activeModule)}
                  className="flex items-center gap-2 text-[11px] font-mono text-slate-400 hover:text-white transition-all bg-[#111122]/90 hover:bg-[#16162e] border border-white/5 px-4 py-2.5 rounded-xl cursor-pointer shadow-sm"
                >
                  <Download className="h-3.5 w-3.5 text-violet-400" />
                  <span>Download Syllabus.PDF</span>
                </motion.button>

                {/* Action CTA Enrollment */}
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(139, 92, 246, 0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleEnroll(activeModule.id)}
                  className={`flex items-center gap-2 font-sans font-bold px-6 py-2.5 rounded-xl transition-all duration-300 text-xs cursor-pointer ${
                    enrollStatus[activeModule.id]
                      ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20 font-medium'
                      : 'bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] text-white shadow-md shadow-violet-500/10 hover:opacity-95'
                  }`}
                >
                  {enrollStatus[activeModule.id] ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Enrolled in Sandbox &middot; Awaiting Cohort Start</span>
                    </>
                  ) : (
                    <>
                      <span>Enroll in {activeModule.code}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </Reveal>

      {/* Trust Callout */}
      <Reveal delay={0.15} className="bg-rose-950/5 border border-rose-900/20 p-4 rounded-2xl flex items-start gap-3 text-[11px] text-rose-400 font-sans leading-relaxed">
        <ShieldAlert className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
        <span>
          <strong>SEBI DISCLOSURE:</strong> V R Vitals Private Limited provides educational courses and training materials exclusively. We do not solicit investments, guarantee performance parameters, or issue financial stock alerts. Past performance does not denote future profitability targets.
        </span>
      </Reveal>
    </div>
  );
}
