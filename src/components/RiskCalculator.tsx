import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, ShieldAlert, CheckCircle, Calculator, Info } from 'lucide-react';
import Reveal from './Reveal';

interface RiskCalculatorProps {
  initialEntry?: number;
  initialSL?: number;
  initialTP?: number;
}

export default function RiskCalculator({ initialEntry = 1000, initialSL = 980, initialTP = 1050 }: RiskCalculatorProps) {
  const [accountSize, setAccountSize] = useState<number>(100000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [entryPrice, setEntryPrice] = useState<number>(initialEntry);
  const [stopLoss, setStopLoss] = useState<number>(initialSL);
  const [takeProfit, setTakeProfit] = useState<number>(initialTP);

  useEffect(() => {
    setEntryPrice(initialEntry);
    setStopLoss(initialSL);
    setTakeProfit(initialTP);
  }, [initialEntry, initialSL, initialTP]);

  const {
    riskAmount,
    shareQuantity,
    maxLoss,
    maxProfit,
    riskRewardRatio,
    cashRequired,
    leverageNeeded
  } = React.useMemo(() => {
    const rAmt = (accountSize * riskPercent) / 100;
    const sRisk = Math.abs(entryPrice - stopLoss);
    const sReward = Math.abs(takeProfit - entryPrice);
    
    const qty = sRisk > 0 ? Math.floor(rAmt / sRisk) : 0;
    const actualLoss = qty * sRisk;
    const actualProfit = qty * sReward;
    const rr = sRisk > 0 ? parseFloat((sReward / sRisk).toFixed(2)) : 0;
    const cashReq = qty * entryPrice;
    
    return {
      riskAmount: rAmt,
      perShareRisk: sRisk,
      perShareReward: sReward,
      shareQuantity: qty,
      maxLoss: actualLoss,
      maxProfit: actualProfit,
      riskRewardRatio: rr,
      cashRequired: cashReq,
      leverageNeeded: accountSize > 0 ? parseFloat((cashReq / accountSize).toFixed(1)) : 0
    };
  }, [accountSize, riskPercent, entryPrice, stopLoss, takeProfit]);

  return (
    <div className="space-y-10">
      
      {/* Header - Sleek & Text-Light */}
      <Reveal className="border border-white/5 bg-[#080812]/95 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-48 h-48 bg-violet-600/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1.5 max-w-xl">
          <div className="text-[10px] font-mono tracking-widest text-violet-300 bg-violet-500/10 border border-violet-500/15 px-2.5 py-0.5 rounded-full uppercase font-bold w-fit">
            RISK DEPT
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <Calculator className="h-6 w-6 text-violet-400" />
            Position Sizing & Risk Simulator
          </h1>
          <p className="text-xs text-slate-400 font-sans leading-relaxed font-light">
            Determine exact contract metrics. Scale down shares as risk-zones widen, fixing your downside threshold.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Side: Inputs Panel (7 columns) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          whileHover={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.15)' }}
          className="order-2 lg:order-none lg:col-span-7 bg-[#080812]/95 border border-white/5 rounded-3xl p-6 space-y-6 transition-colors duration-300"
        >
          <h3 className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider">
            <Sliders className="h-4 w-4 text-violet-400 animate-pulse" />
            Simulator Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Account Capital */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-tight">Trading Capital (₹ or $)</label>
              <input
                type="number"
                value={accountSize}
                onChange={(e) => setAccountSize(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#111122] border border-white/5 rounded-xl p-3 text-xs font-mono text-slate-100 focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>

            {/* Risk Tolerance percentage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-400 uppercase tracking-tight">Risk Limit (% of Capital)</span>
                <span className="text-violet-400 font-bold">{riskPercent}%</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="5"
                step="0.25"
                value={riskPercent}
                onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#111122] rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
              <span className="text-[9px] text-slate-500 font-mono block">Max Loss Capital: {riskAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Entry Price */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-tight">Entry Value</label>
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Math.max(0.01, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#111122] border border-white/5 rounded-xl p-3 text-xs font-mono text-slate-100 focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>

            {/* Stop Loss Price */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-rose-400 font-bold uppercase tracking-tight">Stop Loss (SL)</label>
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(Math.max(0.01, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#111122] border border-white/5 rounded-xl p-3 text-xs font-mono text-slate-100 focus:outline-none focus:border-rose-500/50 transition-all"
              />
            </div>

            {/* Take Profit Price */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-violet-400 font-bold uppercase tracking-tight">Target (TP)</label>
              <input
                type="number"
                value={takeProfit}
                onChange={(e) => setTakeProfit(Math.max(0.01, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#111122] border border-white/5 rounded-xl p-3 text-xs font-mono text-slate-100 focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>
          </div>

          <div className="bg-[#111122]/90 border border-white/5 p-3 rounded-xl flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <Info className="h-4 w-4 text-violet-400 flex-shrink-0" />
            <span>Downside risk stays mathematically locked regardless of entry or chart pattern spreads.</span>
          </div>
        </motion.div>

        {/* Right Side: Outputs / Verdict (5 columns) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="order-1 lg:order-none lg:col-span-5 flex flex-col gap-4"
        >
          
          {/* Main Sizing Verdict */}
          <motion.div 
            whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(139, 92, 246, 0.12)', borderColor: '#8B5CF6' }}
            className="bg-[#080812]/95 border border-white/5 rounded-3xl p-6 space-y-4 transition-colors duration-300"
          >
            <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-widest font-bold">CALCULATED VERDICT:</span>
            
            <div className="space-y-1">
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-tight">RECOMMENDED SIZE:</div>
              <div className="text-3xl font-bold text-white tracking-tight">
                {shareQuantity.toLocaleString()} <span className="text-violet-400 text-sm font-mono font-bold uppercase">Units</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-xs font-mono">
              <div className="space-y-0.5">
                <span className="text-[8px] text-slate-500 font-bold">CAPITAL POOL:</span>
                <div className="text-sm font-bold text-slate-300">{cashRequired.toLocaleString()}</div>
              </div>
              <div className="space-y-0.5 text-right">
                <span className="text-[8px] text-slate-500 font-bold">LEVERAGE TARGET:</span>
                <div className="text-sm font-bold text-slate-300">{leverageNeeded}x</div>
              </div>
            </div>
          </motion.div>

          {/* Risk to Reward Profile */}
          <motion.div 
            whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(139, 92, 246, 0.12)', borderColor: '#8B5CF6' }}
            className="bg-[#080812]/95 border border-white/5 rounded-3xl p-6 space-y-5 transition-colors duration-300"
          >
            <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-widest font-bold">RISK-TO-REWARD PROFILE:</span>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-rose-500/[0.02] border border-rose-500/15 p-3 rounded-xl">
                <div className="text-[8px] text-rose-400 font-mono font-bold uppercase">MAX LOSS</div>
                <div className="text-sm font-bold text-rose-500 mt-1">{maxLoss.toLocaleString()}</div>
              </div>
              <div className="bg-violet-500/[0.02] border border-violet-500/15 p-3 rounded-xl">
                <div className="text-[8px] text-violet-400 font-mono font-bold uppercase">MAX UPSIDE</div>
                <div className="text-sm font-bold text-violet-400 mt-1">{maxProfit.toLocaleString()}</div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-500 uppercase tracking-tight font-bold">R:R ACCURACY:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                riskRewardRatio >= 2.0 
                  ? 'bg-violet-500/10 text-violet-300 border-violet-500/20' 
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}>
                {riskRewardRatio}x {riskRewardRatio >= 2.0 ? 'HEALTHY' : 'SUB-OPTIMAL'}
              </span>
            </div>

            {/* Concise visual warnings */}
            <AnimatePresence mode="wait">
              {riskRewardRatio < 2.0 ? (
                <motion.div 
                  key="warning"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex gap-2 bg-rose-500/[0.02] border border-rose-500/10 text-rose-400 p-3 rounded-lg text-[10px] font-mono leading-relaxed"
                >
                  <ShieldAlert className="h-4 w-4 flex-shrink-0" />
                  <span><strong>ALERT:</strong> R:R ratio under 2.0 fails strict risk management criteria. Plan wider targets.</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="approved"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex gap-2 bg-violet-500/[0.02] border border-violet-500/10 text-violet-400 p-3 rounded-lg text-[10px] font-mono leading-relaxed"
                >
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  <span><strong>APPROVED:</strong> Target upside is at least double the drawdown risk. Satisfies compliance.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </motion.div>

      </div>

    </div>
  );
}
