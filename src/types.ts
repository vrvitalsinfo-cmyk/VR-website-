export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema50?: number;
  ema200?: number;
  rsi?: number;
  macd?: {
    macdLine: number;
    signalLine: number;
    histogram: number;
  };
}

export interface TradeSetup {
  id: string;
  symbol: string;
  direction: 'long' | 'short';
  timeframe: string;
  entry: number;
  stopLoss: number;
  takeProfit: number;
  riskReward: number;
  rationale: string;
  support: number[];
  resistance: number[];
  videoMockTitle: string;
  chartData: Candle[];
}

export interface ScannerAlert {
  id: string;
  symbol: string;
  pattern: string;
  type: 'breakout' | 'breakdown' | 'volume' | 'indicator';
  timeframe: string;
  price: number;
  change: number;
  volume24h: string;
  timestamp: string;
  strength: 'High' | 'Medium' | 'Low';
}

export interface MacroIndicator {
  title: string;
  currentValue: string;
  previousValue: string;
  trend: 'up' | 'down' | 'flat';
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  context: string;
}

export interface SectorRotationData {
  sector: string;
  phase: 'Expansion' | 'Peak' | 'Contraction' | 'Trough';
  performance3m: number;
  status: 'Outperforming' | 'Underperforming' | 'Neutral';
  drivers: string;
}
