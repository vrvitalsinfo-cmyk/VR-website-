import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Heart, Award, ShieldAlert, Users, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

export default function AboutUs() {
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
            WHO WE ARE
          </span>
          <h1 className="text-xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            About V R Vitals Private Limited
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed font-light">
            We are a team of quantitative analysts and former desk traders dismantling retail financial myths through pure mathematical education.
          </p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.03, borderColor: '#8B5CF6' }}
          className="bg-[#111122]/90 border border-white/5 p-4 rounded-xl flex items-center gap-3 shrink-0 transition-colors"
        >
          <ShieldCheck className="h-4.5 w-4.5 text-violet-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300 font-semibold">Incorporated 2024</span>
        </motion.div>
      </motion.div>

      {/* Corporate Mission & Story Cards */}
      <Reveal delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139, 92, 246, 0.15)', borderColor: '#8B5CF6' }}
          className="bg-[#080812]/95 border border-white/5 p-6 sm:p-8 rounded-3xl space-y-4 relative overflow-hidden transition-colors duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="bg-violet-500/10 border border-violet-500/15 w-10 h-10 rounded-xl flex items-center justify-center text-violet-400">
            <Heart className="h-5 w-5" />
          </div>
          <h3 className="text-md font-bold text-white">Our Founding Story</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
            V R Vitals was established in early 2024 out of sheer frustration with the retail trading landscape. Social channels were flooded with speculative tip channels and "get rich quick" indicator presets, leading to massive capital drawdowns for retail traders. We set out to build an educational sandbox. By pairing live, multi-timeframe mathematical scanners with deep, indicator-free Price Action curriculum, we train retail traders to think like institutional desk operators.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139, 92, 246, 0.15)', borderColor: '#8B5CF6' }}
          className="bg-[#080812]/95 border border-white/5 p-6 sm:p-8 rounded-3xl space-y-4 relative overflow-hidden transition-colors duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="bg-violet-500/10 border border-violet-500/15 w-10 h-10 rounded-xl flex items-center justify-center text-violet-400">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="text-md font-bold text-white">Our Core Mission</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
            Our mission is absolute retail trader independence. We do not provide alert copy services or run commercial trading pools. Instead, we equip you with raw technical competence, strict mathematical position risk sizers, and cyclical macroeconomic awareness. We believe in transparency, factual analysis, and the strict rejection of un-backtested trading lore.
          </p>
        </motion.div>

      </Reveal>

      {/* Team Credentials & Advisory Section */}
      <Reveal delay={0.15} className="space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest px-1">
          OUR DESK CREDENTIALS & INSTRUCTORS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(139, 92, 246, 0.12)', borderColor: '#8B5CF6' }}
            className="bg-[#080812]/95 border border-white/5 p-5 sm:p-6 rounded-2xl space-y-3 transition-colors duration-300"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-bold text-slate-200 text-xs">Shiva Kumar</span>
              <span className="text-[10px] font-mono text-violet-400">Chief technical mentor</span>
            </div>
            <p className="text-xs text-slate-400 font-sans font-light leading-relaxed">
              Shiva is a seasoned desk veteran who managed commodity allocations for a private trade house for half a decade. He teaches advanced Volume Profile (VPVR), thinned order book spreads, and horizontal block retests.
            </p>
            <div className="text-[9px] font-mono text-slate-500 bg-black/40 p-2 rounded border border-white/5">
              Credentials: IIT Madras (Mech) &middot; NISM Series VIII Derivatives Certified
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(139, 92, 246, 0.12)', borderColor: '#8B5CF6' }}
            className="bg-[#080812]/95 border border-white/5 p-5 sm:p-6 rounded-2xl space-y-3 transition-colors duration-300"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-bold text-slate-200 text-xs">Dr. Ashith Sanjay</span>
              <span className="text-[10px] font-mono text-violet-400">Macroeconomic advisor</span>
            </div>
            <p className="text-xs text-slate-400 font-sans font-light leading-relaxed">
              Dr. Ashith advises our educational sandbox team on macroeconomic correlations. He spends his research tracking global bond yields, interest rate spreads, and monetary rotation matrices.
            </p>
            <div className="text-[9px] font-mono text-slate-500 bg-black/40 p-2 rounded border border-white/5">
              Credentials: PhD Mathematical Finance &middot; Registered Research Scholar
            </div>
          </motion.div>
        </div>
      </Reveal>

      {/* Explicit Compliance Statement Box */}
      <Reveal delay={0.2} className="bg-rose-950/5 border border-rose-900/20 p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-2.5 text-rose-500 font-mono font-bold uppercase tracking-wider text-xs">
          <ShieldAlert className="h-4.5 w-4.5" /> REQUISITE REGULATORY COMPLIANCE STATEMENT
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
          V R Vitals Private Limited operates exclusively as a financial educational organization. <strong>We are strictly NOT a SEBI (Securities and Exchange Board of India) registered investment advisor (RIA), research analyst, or portfolio manager.</strong> We do not issue personalized financial advisory parameters, execute trades on behalf of clients, or promise fixed monetary returns of any scale. All software features, scanners, indicators, and calculation results represent sandbox simulation tools designed to train structural chart reading skills. Trading commodities, equities, options, and currency derivatives involves catastrophic risk of complete capital loss.
        </p>
        <div className="text-[9px] font-mono text-slate-500 uppercase">
          Corporate ID: V R VITALS PVT LTD &middot; Sandbox Academic Division
        </div>
      </Reveal>
    </div>
  );
}
