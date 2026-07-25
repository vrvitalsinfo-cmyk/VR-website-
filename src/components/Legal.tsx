import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Scale, ShieldAlert, AlertOctagon, HelpCircle, Shield } from 'lucide-react';
import Reveal from './Reveal';

export default function Legal() {
  return (
    <div className="space-y-12">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="border border-white/5 bg-[#080812]/95 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden"
      >
        <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-violet-600/[0.08] rounded-full blur-[100px] pointer-events-none" />
        <div className="space-y-2.5 max-w-2xl">
          <span className="text-[10px] font-mono tracking-widest text-violet-300 bg-violet-500/10 border border-violet-500/15 px-2.5 py-0.5 rounded-full uppercase font-bold">
            COMPLIANCE DIVISION
          </span>
          <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
            Legal Disclosures & Sandbox Charters
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed font-light">
            We prioritize safety, structural accountability, and absolute transparency. Read our complete operational operational parameters.
          </p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.03, borderColor: '#8B5CF6' }}
          className="bg-[#111122]/90 border border-white/5 p-4 rounded-xl flex items-center gap-3 shrink-0 transition-colors"
        >
          <Scale className="h-4.5 w-4.5 text-violet-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300 font-semibold">Active Charter v1.4</span>
        </motion.div>
      </motion.div>

      {/* Regulatory Disclaimer Charter */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="bg-[#141420]/30 border border-[#2A2A38] p-5 sm:p-6 rounded-2xl space-y-2 text-[11px] sm:text-xs text-[#6B7280] font-secondary font-light leading-relaxed"
      >
        <div className="flex items-center gap-1.5 text-[#9CA3AF] font-semibold font-mono text-[9px] uppercase tracking-wider">
          <Shield className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
          <span>REGULATORY DISCLOSURE & EDUCATION CHARTER</span>
        </div>
        <p>
          V R Vitals Private Limited operates strictly as a financial training school and educational network. We are <strong className="text-[#9CA3AF] font-medium">not a SEBI-registered portfolio manager, investment advisor, or research analyst</strong>. All indicators, scan routines, daily trade plan sheets, and simulation setups are intended purely for instructional learning and risk mockups. Past paper performance does not outline future real market outcomes. Trading financial assets carries high risk.
        </p>
        <div className="text-[9px] text-[#6B7280]/80 mt-1 font-mono">
          Corporate Identity Number (CIN): U51909KA2021PTC142830 &middot; Registered on July 16, 2021.
        </div>
      </motion.div>

      {/* Main Grid: Three distinct panels */}
      <Reveal delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Panel 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.25)' }}
          className="bg-[#080812]/95 border border-white/5 p-6 rounded-2xl space-y-3 relative overflow-hidden transition-colors duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="w-8 h-8 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-center text-rose-400">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">I. Risk Disclosure</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
            <strong>Past performance does not guarantee or denote future results.</strong> Trading options, futures, and indices carries extreme risk of capital destruction. Scanners and indicator triggers represent simulation systems built on historical datasets. Individual results vary dramatically based on emotional focus and slippage limits.
          </p>
        </motion.div>

        {/* Panel 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(139, 92, 246, 0.12)', borderColor: '#8B5CF6' }}
          className="bg-[#080812]/95 border border-white/5 p-6 rounded-2xl space-y-3 relative overflow-hidden transition-colors duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
          <div className="w-8 h-8 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center text-violet-400">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">II. Educational Sandbox</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
            V R Vitals Private Limited is an educational sandbox platform. Scanners, pattern detections, entry triggers, stop-losses, target coordinates, and position sizing calculators are simulation algorithms designed to test raw chart structures. They are NOT personalized investment tips or solicitation proposals.
          </p>
        </motion.div>

        {/* Panel 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(56, 189, 248, 0.1)', borderColor: 'rgba(56, 189, 248, 0.25)' }}
          className="bg-[#080812]/95 border border-white/5 p-6 rounded-2xl space-y-3 relative overflow-hidden transition-colors duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="w-8 h-8 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center text-sky-400">
            <Scale className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">III. SEBI Compliance</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
            <strong>We are strictly NOT SEBI-registered portfolio managers, RIA analysts, or stock brokers.</strong> We do not offer capital pool placements, trade on client behalf, or guarantee monthly premium returns of any sort. All content is meant for cognitive sandbox simulation, structural reading, and personal trading discipline calibration.
          </p>
        </motion.div>
      </Reveal>

      {/* Main Terms list of chapters */}
      <Reveal delay={0.15} className="bg-[#080812]/95 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/5 pb-3">
          COMPLETE TERMS OF SERVICE & REGULATORY BLUEPRINT
        </h3>

        <div className="space-y-4 text-xs font-sans text-slate-400 font-light leading-relaxed">
          <div className="space-y-1.5">
            <strong className="text-slate-200 text-xs block font-mono font-bold">1. INTELLECTUAL SANITY LICENSE</strong>
            <p>
              Users receive a single, revocable license to operate V R Vitals trading sandbox tools, indicators, and charts for academic study. Copy-trading, secondary scraping, or signal distribution is strictly prohibited. Violation leads to immediate slot termination.
            </p>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-white/5">
            <strong className="text-slate-200 text-xs block font-mono font-bold">2. ACCURACY OF SIGNAL SIMULATORS</strong>
            <p>
              While our mathematical scanners parse live feeds from global exchanges, minor latencies (1-3 seconds) are expected. Scanners can produce false triggers during sideways ranges and thin consolidation blocks. Users must always cross-reference with larger macro timeframes on their custom terminals.
            </p>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-white/5">
            <strong className="text-slate-200 text-xs block font-mono font-bold">3. HASSLE-FREE REFUND & CANCEL CHARTER</strong>
            <p>
              All premium subscription packages (Starter, Pro, Elite) are eligible for a full 7-day money-back refund guarantee if requested in writing. Cancellations can be completed instantly inside the profile layout or by contacting grievance@vrvitals.com directly.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
