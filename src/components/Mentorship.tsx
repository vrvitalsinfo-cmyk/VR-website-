import React from 'react';
import { motion } from 'motion/react';
import Reveal from './Reveal';
import {
  Users, 
  Calendar, 
  CheckCircle, 
  ShieldAlert
} from 'lucide-react';

interface MentorshipProps {
  setCurrentTab?: (tab: string) => void;
}

export default function Mentorship({ setCurrentTab }: MentorshipProps) {
  const calendarEvents = [
    { day: 'Wednesday', time: '20:00 - 21:30', title: 'Isolating Order Book Imbalances', type: 'Technical' },
    { day: 'Thursday', time: '19:30 - 20:30', title: 'Macro Roundtable & CPI Adjustments', type: 'Macro' },
    { day: 'Saturday', time: '10:00 - 12:00', title: 'Live Sandbox Playback Session', type: 'Sandbox' },
    { day: 'Monday', time: '16:00 - 17:00', title: '1:1 Private Portfolio Calibrations', type: '1:1 Elite' }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <Reveal className="border border-white/5 bg-[#080812]/95 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-violet-600/[0.08] rounded-full blur-[100px] pointer-events-none" />
        <div className="space-y-2.5 max-w-2xl">
          <span className="text-[10px] font-mono tracking-widest text-violet-300 bg-violet-500/10 border border-violet-500/15 px-2.5 py-0.5 rounded-full uppercase font-bold">
            HUMAN CALIBRATION
          </span>
          <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
            Factual Mentorship & Guidance Tiers
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed font-light">
            We provide structured group training and private 1:1 calibration. We do not promise profits, make capital claims, or trade on your behalf.
          </p>
        </div>
        <div className="bg-[#111122]/90 border border-white/5 p-4 rounded-xl flex items-center gap-3 shrink-0">
          <Users className="h-4.5 w-4.5 text-violet-400" />
          <span className="text-xs font-mono text-slate-300 font-semibold">Active Cohorts: 4</span>
        </div>
      </Reveal>

      {/* Tiers Comparison Grid */}
      <Reveal delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tier 1: Group Cohort */}
        <motion.div 
          whileHover={{ scale: 1.02, boxShadow: '0 0 35px rgba(139, 92, 246, 0.2)', borderColor: '#8B5CF6' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-[#080812]/95 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="space-y-4">
            <span className="text-[9px] font-mono text-slate-400 bg-[#111122]/90 border border-white/5 px-2 py-0.5 rounded font-bold uppercase">
              STRUCTURED GROUP COHORT
            </span>
            <h3 className="text-lg font-bold text-white font-sans">Group Mentorship</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light font-sans">
              Join weekly interactive roundtables with professional desk managers. Best for independent traders who want systematic group discussion.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                '2x Weekly live interactive webinar masterclasses',
                'Access to Group Slack study rooms & setup discussions',
                'Proprietary indicators layout pack (TradingView & MT5)',
                '100+ Hours premium educational blueprint recordings archive'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[11px] text-slate-300 leading-normal font-sans font-light">
                  <CheckCircle className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-between items-center">
            <div>
              <span className="text-[10px] text-slate-500 font-mono block">TUITION FEES</span>
              <span className="text-lg font-bold text-white font-mono">Rs 5,999<span className="text-xs text-slate-500">/Month</span></span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)', borderColor: '#8B5CF6' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentTab?.('pricing')}
              className="text-xs font-mono bg-[#111122] text-violet-300 border border-violet-500/20 px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Join Cohort Plan
            </motion.button>
          </div>
        </motion.div>

        {/* Tier 2: 1:1 Private Elite */}
        <motion.div 
          whileHover={{ scale: 1.02, boxShadow: '0 0 45px rgba(139, 92, 246, 0.35)', borderColor: '#8B5CF6' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-[#080812]/95 border border-violet-500/[0.15] rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between relative overflow-hidden shadow-xl transition-all duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-violet-300 bg-violet-500/10 border border-violet-500/15 px-2 py-0.5 rounded font-bold uppercase animate-pulse">
                LIMITED ELITE PRIVATE SELECTION
              </span>
              <span className="text-[9px] font-mono text-slate-500">2 Slots Available</span>
            </div>
            <h3 className="text-lg font-bold text-white font-sans">1:1 Elite Portfolio Mentorship</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light font-sans">
              Bespoke, private strategic adjustments with our Chief Trader. Custom calibration of your proprietary risk sizers, supply profiles, and direct telegram chat lines.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                '1x Weekly direct 1:1 private review consultation',
                'Custom strategic position sizing risk audit setup',
                'Instant priority access to Chief Trader via private telegram',
                'Comprehensive audit of trade logs and structural errors'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[11px] text-slate-300 leading-normal font-sans font-light">
                  <CheckCircle className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-between items-center">
            <div>
              <span className="text-[10px] text-slate-500 font-mono block">TUITION FEES</span>
              <span className="text-lg font-bold text-white font-mono">Rs 14,999<span className="text-xs text-slate-500">/Month</span></span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(139, 92, 246, 0.45)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentTab?.('pricing')}
              className="text-xs font-sans font-bold bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] hover:from-[#bfa9ff] hover:to-[#8c4df5] text-white px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-violet-500/10"
            >
              Join Private Elite
            </motion.button>
          </div>
        </motion.div>
      </Reveal>

      {/* Cohort Calendar Block */}
      <Reveal delay={0.15} className="bg-[#080812]/95 border border-white/5 p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-widest flex items-center gap-2">
            <Calendar className="h-4.5 w-4.5 text-violet-400" />
            COHORT WEEKLY CALENDAR
          </span>
          <span className="text-[10px] font-mono text-slate-500 uppercase">ALL LIVE WEBINARS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {calendarEvents.map((evt, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.02, x: 2, borderColor: '#8B5CF6', boxShadow: '0 0 15px rgba(139, 92, 246, 0.15)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="bg-[#111122]/90 border border-white/5 p-4 rounded-xl flex justify-between items-center text-xs font-mono transition-colors duration-300"
            >
              <div className="space-y-1">
                <span className="font-bold text-slate-200 block">{evt.title}</span>
                <span className="text-[10px] text-slate-500 block">{evt.day} &middot; {evt.time}</span>
              </div>
              <span className={`text-[9px] px-2.5 py-1 rounded font-bold uppercase border shrink-0 ${
                evt.type === 'Technical' ? 'bg-violet-500/10 text-violet-300 border-violet-500/20' :
                evt.type === 'Macro' ? 'bg-sky-500/10 text-sky-300 border-sky-500/20' :
                evt.type === 'Sandbox' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
              }`}>
                {evt.type}
              </span>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* Regulatory Compliance Footer Banner */}
      <Reveal delay={0.15} className="p-4 bg-[#111122]/50 border border-white/5 rounded-2xl flex items-start gap-3 text-[11px] text-slate-400 font-sans leading-relaxed">
        <ShieldAlert className="h-4 w-4 shrink-0 text-violet-400 mt-0.5" />
        <span>
          <strong>EDUCATIONAL SANDBOX COMPLIANCE STATEMENT:</strong> V R Vitals Private Limited operates exclusively in an academic and training capacity. We do not solicit, custody, or manage client funds. We are strictly not SEBI-registered portfolio managers or investment advisors. Buying or selling assets based on patterns involves significant capital loss risk.
        </span>
      </Reveal>
    </div>
  );
}
