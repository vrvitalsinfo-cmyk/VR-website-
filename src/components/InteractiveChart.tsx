import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Candle, TradeSetup } from '../types';
import { MOCK_TRADE_SETUPS } from '../mockData';
import { 
  TrendingUp, 
  Play, 
  MousePointer, 
  Edit3, 
  Trash2,
  RefreshCw,
  Info
} from 'lucide-react';

interface InteractiveChartProps {
  selectedSetup: TradeSetup;
  setSelectedSetup: (setup: TradeSetup) => void;
}

export default function InteractiveChart({ selectedSetup, setSelectedSetup }: InteractiveChartProps) {
  const [showEMA50, setShowEMA50] = useState(true);
  const [showEMA200, setShowEMA200] = useState(true);
  const [activePane, setActivePane] = useState<'rsi' | 'macd' | 'none'>('rsi');
  
  // Hover state for Crosshair HUD
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredY, setHoveredY] = useState<number | null>(null);

  // Drawing tools state
  const [drawingTool, setDrawingTool] = useState<'none' | 'resistance' | 'support' | 'demand'>('none');
  const [customLines, setCustomLines] = useState<{ id: string; type: 'support' | 'resistance' | 'demand'; price: number }[]>([]);

  // Backtesting Sandbox State
  const [backtestStrategy, setBacktestStrategy] = useState<'ema_cross' | 'rsi_bounce' | 'macd_cross'>('ema_cross');
  const [backtestResults, setBacktestResults] = useState<{
    ran: boolean;
    tradesCount: number;
    winRate: number;
    netProfit: number;
    profitFactor: number;
    log: string[];
  } | null>(null);
  const [isBacktesting, setIsBacktesting] = useState(false);

  const candles = selectedSetup.chartData;

  // Find min and max values to scale the chart dynamically
  const { minPrice, maxPrice } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    candles.forEach(c => {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
      if (showEMA50 && c.ema50 && c.ema50 < min) min = c.ema50;
      if (showEMA50 && c.ema50 && c.ema50 > max) max = c.ema50;
      if (showEMA200 && c.ema200 && c.ema200 < min) min = c.ema200;
      if (showEMA200 && c.ema200 && c.ema200 > max) max = c.ema200;
    });
    const range = max - min;
    return {
      minPrice: Math.max(0, min - range * 0.05),
      maxPrice: max + range * 0.05
    };
  }, [candles, showEMA50, showEMA200]);

  // Calculate price under the hover cursor dynamically
  const hoveredPrice = useMemo(() => {
    if (hoveredY === null) return null;
    const chartHeight = 260;
    const padding = 20;
    const usableHeight = chartHeight - padding * 2;
    const relativeY = hoveredY - padding;
    if (relativeY >= 0 && relativeY <= usableHeight) {
      const pricePercent = 1 - (relativeY / usableHeight);
      return minPrice + pricePercent * (maxPrice - minPrice);
    }
    return null;
  }, [hoveredY, minPrice, maxPrice]);

  // Handle Chart Click to place dynamic horizontal drawing lines
  const handleChartClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (drawingTool === 'none') return;
    
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    
    const chartHeight = 260;
    const padding = 20;
    const usableHeight = chartHeight - padding * 2;
    const relativeY = clickY - padding;
    
    if (relativeY >= 0 && relativeY <= usableHeight) {
      const pricePercent = 1 - (relativeY / usableHeight);
      const clickedPrice = minPrice + pricePercent * (maxPrice - minPrice);
      
      setCustomLines(prev => [
        ...prev,
        {
          id: `line-${Date.now()}`,
          type: drawingTool as 'support' | 'resistance' | 'demand',
          price: parseFloat(clickedPrice.toFixed(2))
        }
      ]);
      setDrawingTool('none');
    }
  };

  const removeLine = (id: string) => {
    setCustomLines(prev => prev.filter(l => l.id !== id));
  };

  const clearAllLines = () => {
    setCustomLines([]);
  };

  // Run Backtesting Simulation
  const runBacktest = () => {
    setIsBacktesting(true);
    setBacktestResults(null);

    setTimeout(() => {
      let tradesCount = 0;
      let wins = 0;
      let netProfit = 0;
      const log: string[] = [];

      if (backtestStrategy === 'ema_cross') {
        log.push('Executing: 50 EMA vs 200 EMA crossovers');
        candles.forEach((c, idx) => {
          if (idx < 5) return;
          const prev = candles[idx - 1];
          if (prev.ema50 && prev.ema200 && c.ema50 && c.ema200) {
            if (prev.ema50 < prev.ema200 && c.ema50 >= c.ema200) {
              tradesCount++;
              const isWin = Math.random() > 0.35;
              if (isWin) wins++;
              const profit = isWin ? Math.floor(Math.random() * 400) + 200 : -(Math.floor(Math.random() * 200) + 100);
              netProfit += profit;
              log.push(`[${c.time}] LONG Cross: ${profit >= 0 ? 'WIN (+$' + profit + ')' : 'LOSS (-$' + Math.abs(profit) + ')'}`);
            }
          }
        });
        if (tradesCount === 0) {
          tradesCount = 3;
          wins = 2;
          netProfit = 450;
          log.push('[Setup Index] Crossover default results loaded.');
          log.push('[Day 12] Golden Cross BUY. WIN (+$350)');
          log.push('[Day 24] Death Cross SHORT. LOSS (-$150)');
          log.push('[Day 38] Golden Cross BUY. WIN (+$250)');
        }
      } else if (backtestStrategy === 'rsi_bounce') {
        log.push('Executing: RSI Oversold bounces (<32)');
        candles.forEach((c, idx) => {
          if (c.rsi && c.rsi < 32) {
            tradesCount++;
            const isWin = Math.random() > 0.4;
            if (isWin) wins++;
            const profit = isWin ? Math.floor(Math.random() * 300) + 150 : -(Math.floor(Math.random() * 150) + 80);
            netProfit += profit;
            log.push(`[${c.time}] RSI Oversold (${c.rsi}): BUY. ${profit >= 0 ? 'WIN (+$' + profit + ')' : 'LOSS (-$' + Math.abs(profit) + ')'}`);
          }
        });
        if (tradesCount === 0) {
          tradesCount = 4;
          wins = 2;
          netProfit = 280;
          log.push('[Day 5] RSI Oversold (28.4) BUY. WIN (+$240)');
          log.push('[Day 18] RSI Overbought (74.2) SELL. LOSS (-$110)');
          log.push('[Day 29] RSI Oversold (29.1) BUY. WIN (+$280)');
          log.push('[Day 42] RSI Overbought (71.5) SELL. LOSS (-$130)');
        }
      } else {
        log.push('Executing: MACD Zero-Line crossings');
        candles.forEach((c, idx) => {
          if (idx < 2) return;
          const prev = candles[idx - 1];
          if (prev.macd && c.macd) {
            if (prev.macd.histogram < 0 && c.macd.histogram >= 0) {
              tradesCount++;
              const isWin = Math.random() > 0.38;
              if (isWin) wins++;
              const profit = isWin ? Math.floor(Math.random() * 350) + 180 : -(Math.floor(Math.random() * 180) + 90);
              netProfit += profit;
              log.push(`[${c.time}] MACD Crossover BUY. ${profit >= 0 ? 'WIN (+$' + profit + ')' : 'LOSS (-$' + Math.abs(profit) + ')'}`);
            }
          }
        });
        if (tradesCount === 0) {
          tradesCount = 3;
          wins = 2;
          netProfit = 390;
          log.push('[Day 9] Bullish crossover BUY. WIN (+$310)');
          log.push('[Day 22] Bearish crossover SELL. LOSS (-$140)');
          log.push('[Day 35] Bullish crossover BUY. WIN (+$220)');
        }
      }

      const winRate = tradesCount > 0 ? parseFloat(((wins / tradesCount) * 100).toFixed(1)) : 0;
      const profitFactor = tradesCount > 0 ? parseFloat((1.5 + Math.random() * 0.8).toFixed(2)) : 0;

      setBacktestResults({
        ran: true,
        tradesCount,
        winRate,
        netProfit,
        profitFactor,
        log: log.slice(-5)
      });
      setIsBacktesting(false);
    }, 1000);
  };

  const getY = (price: number, height: number, padding: number) => {
    const usableHeight = height - padding * 2;
    const ratio = (price - minPrice) / (maxPrice - minPrice);
    return padding + usableHeight * (1 - ratio);
  };

  const mainHeight = 260;
  const paddingY = 20;
  const chartWidth = 560;

  const ema50Points = useMemo(() => {
    return candles
      .map((c, idx) => {
        if (!c.ema50) return null;
        const x = (idx / (candles.length - 1)) * chartWidth;
        const y = getY(c.ema50, mainHeight, paddingY);
        return `${x},${y}`;
      })
      .filter(Boolean)
      .join(' ');
  }, [candles, minPrice, maxPrice]);

  const ema200Points = useMemo(() => {
    return candles
      .map((c, idx) => {
        if (!c.ema200) return null;
        const x = (idx / (candles.length - 1)) * chartWidth;
        const y = getY(c.ema200, mainHeight, paddingY);
        return `${x},${y}`;
      })
      .filter(Boolean)
      .join(' ');
  }, [candles, minPrice, maxPrice]);

  return (
    <div className="space-y-6">
      
      {/* Charting Header Panel - Bloomberg-style HUD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/40 border border-slate-900 p-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">ASSET WORKSPACE:</label>
          <div className="flex flex-wrap gap-1 bg-slate-900/30 p-0.5 border border-slate-900 rounded-lg">
            {MOCK_TRADE_SETUPS.map((setup) => (
              <button
                key={setup.id}
                onClick={() => {
                  setSelectedSetup(setup);
                  setCustomLines([]);
                  setBacktestResults(null);
                }}
                className={`text-[10px] font-mono px-3 py-1.5 rounded-md transition-all duration-300 ${
                  selectedSetup.id === setup.id
                    ? 'bg-emerald-500/10 text-emerald-400 font-bold'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {setup.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Current Quote HUD */}
        <div className="flex items-center gap-5 text-[10px] font-mono text-slate-500">
          <div>
            <span>ENTRY: </span>
            <strong className="text-slate-300 font-bold">{selectedSetup.entry}</strong>
          </div>
          <div>
            <span>TARGET: </span>
            <strong className="text-emerald-400 font-bold">{selectedSetup.takeProfit}</strong>
          </div>
          <div>
            <span>R:R RATIO: </span>
            <strong className="text-emerald-400 font-bold">{selectedSetup.riskReward}x</strong>
          </div>
        </div>
      </div>

      {/* Main Chart Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart + Indicators (8 Columns) */}
        <div className="lg:col-span-8 bg-slate-950/40 border border-slate-900 rounded-xl p-4 flex flex-col relative overflow-hidden">
          
          {/* HUD Line Hover info */}
          <div className="flex items-center justify-between border-b border-slate-900/60 pb-3 mb-3 text-[10px] font-mono">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="text-slate-500">
                DATE: <span className="text-slate-300 font-bold">{hoveredCandle?.time || candles[candles.length - 1].time}</span>
              </span>
              <span className="text-slate-500">
                O: <span className="text-slate-300">{hoveredCandle?.open || candles[candles.length - 1].open}</span>
              </span>
              <span className="text-slate-500">
                H: <span className="text-emerald-400">{hoveredCandle?.high || candles[candles.length - 1].high}</span>
              </span>
              <span className="text-slate-500">
                L: <span className="text-rose-400">{hoveredCandle?.low || candles[candles.length - 1].low}</span>
              </span>
              <span className="text-slate-500">
                C: <span className={`${(hoveredCandle || candles[candles.length - 1]).close >= (hoveredCandle || candles[candles.length - 1]).open ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {hoveredCandle?.close || candles[candles.length - 1].close}
                </span>
              </span>
            </div>
            
            {/* Quick Toggle Overlays */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-500 hover:text-slate-300 transition">
                <input 
                  type="checkbox" 
                  checked={showEMA50} 
                  onChange={() => setShowEMA50(!showEMA50)}
                  className="rounded bg-slate-900 border-slate-800 text-emerald-500 focus:ring-0 w-3 h-3 cursor-pointer" 
                />
                <span className="text-amber-500/80 text-[9px] font-mono font-bold uppercase">EMA50</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-500 hover:text-slate-300 transition">
                <input 
                  type="checkbox" 
                  checked={showEMA200} 
                  onChange={() => setShowEMA200(!showEMA200)}
                  className="rounded bg-slate-900 border-slate-800 text-emerald-500 focus:ring-0 w-3 h-3 cursor-pointer" 
                />
                <span className="text-blue-500/80 text-[9px] font-mono font-bold uppercase">EMA200</span>
              </label>
            </div>
          </div>

          {/* Interactive SVG Stage */}
          <div className="relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${mainHeight}`}
              className="w-full h-auto cursor-crosshair overflow-visible bg-slate-950/25 select-none"
              onClick={handleChartClick}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const hoverX = e.clientX - rect.left;
                const hoverY = e.clientY - rect.top;
                const candleIdx = Math.max(0, Math.min(candles.length - 1, Math.floor((hoverX / rect.width) * candles.length)));
                setHoveredCandle(candles[candleIdx]);
                setHoveredIndex(candleIdx);
                setHoveredY(hoverY);
              }}
              onMouseLeave={() => {
                setHoveredCandle(null);
                setHoveredIndex(null);
                setHoveredY(null);
              }}
            >
              {/* Horizontal Price Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((p, index) => {
                const price = minPrice + p * (maxPrice - minPrice);
                const y = getY(price, mainHeight, paddingY);
                return (
                  <g key={index} className="opacity-[0.04]">
                    <line x1="0" y1={y} x2={chartWidth} y2={y} stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3,3" />
                    <text x={chartWidth - 5} y={y - 4} fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="end">
                      {price.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* Draw Candlesticks */}
              {candles.map((c, idx) => {
                const x = (idx / (candles.length - 1)) * chartWidth;
                const bodyWidth = Math.max(2, (chartWidth / candles.length) * 0.55);
                const yOpen = getY(c.open, mainHeight, paddingY);
                const yClose = getY(c.close, mainHeight, paddingY);
                const yHigh = getY(c.high, mainHeight, paddingY);
                const yLow = getY(c.low, mainHeight, paddingY);
                const isGreen = c.close >= c.open;

                const top = Math.min(yOpen, yClose);
                const bottom = Math.max(yOpen, yClose);
                const height = Math.max(1, bottom - top);

                return (
                  <g key={idx} className={idx === hoveredIndex ? 'opacity-100' : 'opacity-[0.75]'}>
                    <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={isGreen ? '#10b981' : '#f43f5e'} strokeWidth="1" />
                    <rect
                      x={x - bodyWidth / 2}
                      y={top}
                      width={bodyWidth}
                      height={height}
                      fill={isGreen ? '#10b981' : '#f43f5e'}
                      rx="0.5"
                    />
                  </g>
                );
              })}

              {/* EMA overlays */}
              {showEMA50 && ema50Points && (
                <polyline
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.2"
                  points={ema50Points}
                  opacity="0.85"
                />
              )}
              {showEMA200 && ema200Points && (
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.2"
                  points={ema200Points}
                  opacity="0.85"
                />
              )}

              {/* Support & Resistance Drawings */}
              {customLines.map((line) => {
                const y = getY(line.price, mainHeight, paddingY);
                return (
                  <g key={line.id}>
                    <line 
                      x1="0" 
                      y1={y} 
                      x2={chartWidth} 
                      y2={y} 
                      stroke={line.type === 'resistance' ? '#ef4444' : line.type === 'support' ? '#10b981' : '#3b82f6'} 
                      strokeWidth="1.2" 
                      strokeDasharray={line.type === 'demand' ? '3,3' : 'none'}
                    />
                    <rect 
                      x="4" 
                      y={y - 12} 
                      width="80" 
                      height="10" 
                      fill="#020617" 
                      rx="1" 
                      stroke="#1e293b" 
                      strokeWidth="0.5" 
                      opacity="0.85"
                    />
                    <text x="8" y={y - 4} fill="#64748b" fontSize="6.5" fontFamily="monospace" fontWeight="bold">
                      {line.type.toUpperCase()}: {line.price}
                    </text>
                  </g>
                );
              })}

              {/* Vertical Crosshair Line */}
              {hoveredIndex !== null && (
                <line
                  x1={(hoveredIndex / (candles.length - 1)) * chartWidth}
                  y1="0"
                  x2={(hoveredIndex / (candles.length - 1)) * chartWidth}
                  y2={mainHeight}
                  stroke="#475569"
                  strokeWidth="0.6"
                  strokeDasharray="3,3"
                  className="pointer-events-none"
                />
              )}

              {/* Horizontal Crosshair Line */}
              {hoveredY !== null && hoveredPrice !== null && (
                <g className="pointer-events-none">
                  <line
                    x1="0"
                    y1={hoveredY}
                    x2={chartWidth}
                    y2={hoveredY}
                    stroke="#475569"
                    strokeWidth="0.6"
                    strokeDasharray="3,3"
                  />
                  <rect
                    x={chartWidth - 55}
                    y={hoveredY - 7}
                    width="55"
                    height="14"
                    fill="#1e293b"
                    rx="2"
                    stroke="#334155"
                    strokeWidth="0.5"
                    opacity="0.9"
                  />
                  <text
                    x={chartWidth - 27.5}
                    y={hoveredY + 3}
                    fill="#e2e8f0"
                    fontSize="7.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {hoveredPrice.toFixed(1)}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Volume underlay stats */}
          <div className="mt-2 bg-slate-900/10 p-2 rounded-lg border border-slate-900/60 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-blue-500" />
              Drawings placement active on chart canvas click.
            </span>
            <span className="font-bold text-slate-400">
              VOL: {hoveredCandle?.volume.toLocaleString() || candles[candles.length - 1].volume.toLocaleString()}
            </span>
          </div>

          {/* Secondary Panes Toggle */}
          <div className="mt-4 border-t border-slate-900/60 pt-4">
            <div className="flex gap-1.5 mb-3">
              {(['rsi', 'macd', 'none'] as const).map((pane) => (
                <button
                  key={pane}
                  onClick={() => setActivePane(pane)}
                  className={`text-[9px] font-mono px-3 py-1 rounded-md border transition uppercase font-bold ${
                    activePane === pane
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-slate-900/40 text-slate-500 border-slate-900 hover:text-slate-300'
                  }`}
                >
                  {pane === 'none' ? 'Hide Panels' : `${pane} panel`}
                </button>
              ))}
            </div>

            {/* Custom SVG Render for Secondary Indicator */}
            <AnimatePresence mode="wait">
              {activePane === 'rsi' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-950/80 border border-slate-900/60 rounded-lg p-2"
                >
                  <div className="flex justify-between items-center text-[9px] font-mono text-amber-500 mb-1">
                    <span>RELATIVE STRENGTH INDEX (14)</span>
                    <span className="font-bold">
                      RSI: {hoveredCandle?.rsi || candles[candles.length - 1].rsi}
                    </span>
                  </div>
                  <svg viewBox="0 0 560 60" className="w-full h-12 overflow-visible bg-slate-950">
                    <line x1="0" y1="12" x2="560" y2="12" stroke="#f43f5e" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
                    <line x1="0" y1="48" x2="560" y2="48" stroke="#10b981" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
                    <polyline
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1"
                      points={candles.map((c, idx) => {
                        const r = c.rsi || 50;
                        const y = 60 - (r / 100) * 60;
                        const x = (idx / (candles.length - 1)) * 560;
                        return `${x},${y}`;
                      }).join(' ')}
                    />
                  </svg>
                </motion.div>
              )}

              {activePane === 'macd' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-950/80 border border-slate-900/60 rounded-lg p-2"
                >
                  <div className="flex justify-between items-center text-[9px] font-mono text-indigo-400 mb-1">
                    <span>MACD CONVERGENCE</span>
                    <span className="font-bold">
                      HIST: {(hoveredCandle?.macd?.histogram || candles[candles.length - 1].macd?.histogram)}
                    </span>
                  </div>
                  <svg viewBox="0 0 560 60" className="w-full h-12 overflow-visible bg-slate-950">
                    <line x1="0" y1="30" x2="560" y2="30" stroke="#475569" strokeWidth="0.5" opacity="0.2" />
                    {candles.map((c, idx) => {
                      if (!c.macd) return null;
                      const x = (idx / (candles.length - 1)) * 560;
                      const hist = c.macd.histogram;
                      const barHeight = Math.abs(hist) * 4;
                      const isUp = hist >= 0;
                      return (
                        <line
                          key={idx}
                          x1={x}
                          y1="30"
                          x2={x}
                          y2={isUp ? 30 - barHeight : 30 + barHeight}
                          stroke={isUp ? '#10b981' : '#f43f5e'}
                          strokeWidth="2.5"
                          opacity="0.45"
                        />
                      );
                    })}
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Right Sidebar - Drawing Panel & Backtesting (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Drawing Tools Section */}
          <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider">
              <Edit3 className="h-4 w-4 text-emerald-400" />
              Chart Annotations
            </h3>
            <p className="text-[11px] text-slate-500 font-light font-sans leading-relaxed">
              Activate tools then drop lines inside the canvas bounds.
            </p>

            <div className="grid grid-cols-3 gap-1.5">
              {(['resistance', 'support', 'demand'] as const).map((tool) => (
                <button
                  key={tool}
                  onClick={() => setDrawingTool(tool)}
                  className={`text-[9px] font-mono font-bold py-2 rounded-lg border transition capitalize cursor-pointer ${
                    drawingTool === tool
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-slate-900/40 text-slate-500 border-slate-900 hover:text-slate-300'
                  }`}
                >
                  + {tool.substring(0, 4)}
                </button>
              ))}
            </div>

            {customLines.length > 0 && (
              <div className="border-t border-slate-900/60 pt-3 space-y-1.5">
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
                  <span>ACTIVE TARGETS:</span>
                  <button onClick={clearAllLines} className="text-rose-500 hover:underline cursor-pointer">Clear All</button>
                </div>
                <div className="space-y-1 max-h-24 overflow-y-auto">
                  {customLines.map((line) => (
                    <div key={line.id} className="flex justify-between items-center bg-slate-900/20 p-1.5 rounded text-[9px] font-mono border border-slate-900/60">
                      <span className={`capitalize font-bold ${
                        line.type === 'resistance' ? 'text-rose-400' : line.type === 'support' ? 'text-emerald-400' : 'text-blue-400'
                      }`}>
                        {line.type}: {line.price}
                      </span>
                      <button onClick={() => removeLine(line.id)} className="text-slate-500 hover:text-rose-400 p-0.5 cursor-pointer">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Historical Backtesting Sandbox */}
          <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider">
              <RefreshCw className="h-4 w-4 text-emerald-400" />
              Backtesting Engine
            </h3>
            <p className="text-[11px] text-slate-500 font-light font-sans leading-relaxed">
              Backtest mock indicator alignments on raw candles.
            </p>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-mono text-slate-500 uppercase font-bold">Indicator Target:</label>
              <select
                value={backtestStrategy}
                onChange={(e) => setBacktestStrategy(e.target.value as any)}
                className="w-full bg-slate-900/40 border border-slate-900 rounded-lg p-2 text-[11px] font-mono text-slate-300 focus:outline-none focus:border-emerald-500/40 cursor-pointer"
              >
                <option value="ema_cross">EMA 50 & 200 Golden Cross</option>
                <option value="rsi_bounce">RSI Oversold Bounce (&lt;32)</option>
                <option value="macd_cross">MACD Signal Line Cross</option>
              </select>
            </div>

            <button
              onClick={runBacktest}
              disabled={isBacktesting}
              className="w-full py-2.5 bg-slate-900 border border-slate-800 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/25 disabled:bg-slate-900 text-slate-300 font-mono text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition duration-300 cursor-pointer"
            >
              {isBacktesting ? (
                <>
                  <div className="animate-spin border-2 border-t-transparent border-slate-400 w-3 h-3 rounded-full" />
                  Simulating...
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" />
                  Simulate Strategy
                </>
              )}
            </button>

            <AnimatePresence>
              {backtestResults && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-900/60 pt-3 space-y-3"
                >
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-slate-900/20 border border-slate-900/60 p-2 rounded-lg">
                      <div className="text-[8px] text-slate-500 font-mono font-bold uppercase">WIN RATE</div>
                      <div className="text-xs font-extrabold text-emerald-400 mt-0.5">{backtestResults.winRate}%</div>
                    </div>
                    <div className="bg-slate-900/20 border border-slate-900/60 p-2 rounded-lg">
                      <div className="text-[8px] text-slate-500 font-mono font-bold uppercase">NET REWARD</div>
                      <div className="text-xs font-extrabold text-slate-200 mt-0.5">
                        {backtestResults.netProfit >= 0 ? '+' : ''}${backtestResults.netProfit}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 font-bold uppercase">EXECUTION LOG:</span>
                    <div className="bg-slate-950/80 border border-slate-900 rounded p-2 text-[9px] font-mono text-slate-500 max-h-24 overflow-y-auto space-y-1">
                      {backtestResults.log.map((logLine, idx) => (
                        <div key={idx} className="border-b border-slate-900/40 pb-1 last:border-0">{logLine}</div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
}
