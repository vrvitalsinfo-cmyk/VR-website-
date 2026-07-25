import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Reveal from './Reveal';
import {
  ShieldCheck,
  ShieldAlert,
  HeartHandshake,
  Building2,
  Laptop,
  Radar,
  CalendarClock,
  PlayCircle,
  BookOpenCheck,
  FlaskConical,
  Headset,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Pricing() {
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const plan = {
    name: 'Full Access',
    price: 3999,
    period: 'Month',
    desc: 'Complete access to the V R Vitals curriculum, live sandbox tools, and both offline and online training formats.',
    cta: 'Join the Academy'
  };

  const featureGroups = [
    {
      title: 'Training Format',
      items: [
        { icon: Building2, label: 'Offline (in-person) classroom sessions' },
        { icon: Laptop, label: 'Online (live digital) classroom sessions' }
      ]
    },
    {
      title: 'Sandbox & Tools',
      items: [
        { icon: Radar, label: 'Real-time technical scanners, all timeframes' },
        { icon: CalendarClock, label: 'Daily setup reports with level coordinates' },
        { icon: FlaskConical, label: 'Strategy backtesting sandbox simulator' }
      ]
    },
    {
      title: 'Curriculum & Support',
      items: [
        { icon: BookOpenCheck, label: 'All syllabus modules included' },
        { icon: PlayCircle, label: 'Video walkthrough briefings archive' },
        { icon: Headset, label: 'Priority support desk' }
      ]
    }
  ];

  const triggerCheckoutSim = (planName: string, price: number) => {
    setActiveToast(`SIMULATION: Redirecting to secure checkout for the ${planName} Plan (Rs ${price}/mo)...`);
    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <Reveal className="border border-white/5 bg-[#080812]/95 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-violet-600/[0.08] rounded-full blur-[100px] pointer-events-none" />
        <div className="space-y-2.5 max-w-2xl">
          <span className="text-[10px] font-mono tracking-widest text-violet-300 bg-violet-500/10 border border-violet-500/15 px-2.5 py-0.5 rounded-full uppercase font-bold">
            MEMBERSHIP
          </span>
          <h1 className="text-xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            One Simple, Transparent Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed font-light">
            No long-term commitments, no confusing tiers. Full access to offline (in-person) and online (live digital) training, delivered under one flat price.
          </p>
        </div>
      </Reveal>

      {/* Checkout Toast Container */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-violet-950/80 border border-violet-500/20 text-slate-200 p-4 rounded-xl text-xs flex items-center justify-between shadow-xl"
          >
            <span className="font-mono flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-violet-400 animate-pulse" /> {activeToast}
            </span>
            <span className="text-[10px] bg-violet-500/20 px-2 py-0.5 rounded text-violet-300">Sandbox Test Mode</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pricing Split Layout */}
      <Reveal delay={0.1} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Left: Price Panel */}
        <motion.div
          whileHover={{ boxShadow: '0 0 45px rgba(139, 92, 246, 0.25)', borderColor: '#8B5CF6' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="lg:col-span-5 bg-gradient-to-b from-[#141420] to-[#0C0C14] border border-violet-500/40 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_0_35px_rgba(139,92,246,0.12)] transition-all duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-violet-400 via-violet-500 to-indigo-500" />
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-violet-600/[0.1] rounded-full blur-[100px] pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full uppercase font-bold">
              <Sparkles className="h-3 w-3" />
              {plan.name} Plan
            </span>

            <div>
              <div className="flex items-baseline gap-2 font-mono text-white">
                <span className="text-2xl sm:text-3xl font-bold text-slate-400">Rs</span>
                <span className="text-6xl sm:text-7xl font-extrabold tracking-tight">{plan.price}</span>
                <span className="text-sm text-slate-500">/{plan.period}</span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-1">Flat rate. No hidden tiers.</p>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed font-sans font-light max-w-sm">
              {plan.desc}
            </p>
          </div>

          <div className="space-y-4 pt-8 relative z-10">
            <motion.button
              onClick={() => triggerCheckoutSim(plan.name, plan.price)}
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(139, 92, 246, 0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-between gap-4 pl-6 pr-2.5 py-2.5 rounded-2xl font-sans font-bold text-sm cursor-pointer transition-colors duration-300 bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] text-white shadow-md shadow-violet-500/20"
            >
              <span>{plan.cta}</span>
              <div className="bg-white/15 rounded-xl p-2.5 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </div>
            </motion.button>
            <p className="text-[10px] text-slate-500 font-mono text-center">7-day risk-free refund window &middot; Cancel anytime</p>
          </div>
        </motion.div>

        {/* Right: Feature Showcase */}
        <div className="lg:col-span-7 bg-[#080812]/95 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest border-b border-white/5 pb-4">
            Everything Included
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {featureGroups.map((group, gi) => (
              <div key={gi} className={`space-y-3 ${gi === 0 ? 'sm:col-span-2' : ''}`}>
                <span className="text-[10px] font-mono text-violet-400 uppercase tracking-wider font-bold">
                  {group.title}
                </span>
                <ul className={`gap-3 ${gi === 0 ? 'grid grid-cols-1 sm:grid-cols-2' : 'space-y-3'}`}>
                  {group.items.map((item, ii) => {
                    const Icon = item.icon;
                    return (
                      <li key={ii} className="flex items-start gap-3 text-xs text-slate-300 font-sans font-light">
                        <div className="bg-violet-500/10 border border-violet-500/15 rounded-lg p-1.5 flex items-center justify-center text-violet-400 shrink-0">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="pt-0.5">{item.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Refund / Cancellation policy link */}
      <Reveal delay={0.15} className="bg-[#080812]/95 border border-white/5 p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-3 border-b border-white/5 pb-3">
          <div className="bg-violet-500/10 border border-violet-500/20 p-2 rounded-xl text-violet-400">
            <HeartHandshake className="h-4.5 w-4.5" />
          </div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Risk-Free 7-Day Refund & Cancellation Charter
          </h4>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
          We want you to build structure confidence. If you determine our technical syllabus or automated scanners do not fit your style, simply write to our grievance deck within <strong>7 days of registration</strong>. We will trigger an immediate, full refund back to your payment mode. No questions asked. Cancellations can be triggered directly via your profile settings page at any time.
        </p>
        <button
          onClick={() => {
            setActiveToast("SYSTEM NOTIFICATION: Cancellation policy verified. Terminate active recurring billing streams with a single click inside profile settings.");
            setTimeout(() => {
              setActiveToast(null);
            }, 4500);
          }}
          className="text-[10px] font-mono text-slate-500 hover:text-white underline cursor-pointer"
        >
          Read Policy Terms of Service Page &rarr;
        </button>
      </Reveal>

      <Reveal delay={0.2} className="p-4 bg-rose-950/5 border border-rose-900/20 rounded-2xl flex items-start gap-3 text-[11px] text-rose-400 font-sans leading-relaxed">
        <ShieldAlert className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
        <span>
          <strong>DISCLAIMER STATEMENT:</strong> Subscribing unlocks access to simulation tools, alerts logs, and both offline and online training modules. V R Vitals Private Limited operates strictly as an academic network. Under SEBI rules, we are not licensed advisors. All technical formations are illustrative models. Past performance does not guarantee future market wins.
        </span>
      </Reveal>
    </div>
  );
}
