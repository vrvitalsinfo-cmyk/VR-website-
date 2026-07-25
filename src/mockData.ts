import { Candle, TradeSetup, ScannerAlert, MacroIndicator, SectorRotationData } from './types';

// Helper to generate realistic candles with trends
export function generateMockCandles(
  basePrice: number,
  count: number,
  trendType: 'ascending_triangle' | 'head_and_shoulders' | 'cup_and_handle' | 'double_bottom' | 'volatile'
): Candle[] {
  const candles: Candle[] = [];
  let price = basePrice;
  const now = new Date();

  // Pre-generate prices based on patterns
  const prices: number[] = [];
  
  if (trendType === 'ascending_triangle') {
    // Top flat resistance around basePrice * 1.15, bottom rising support
    const resistance = basePrice * 1.12;
    for (let i = 0; i < count; i++) {
      const progress = i / count;
      if (progress < 0.2) {
        // Init run up
        price = basePrice + progress * 5 * (resistance - basePrice);
      } else if (progress < 0.4) {
        // Pullback
        price = resistance - (progress - 0.2) * 3 * (resistance - basePrice * 0.95);
      } else if (progress < 0.6) {
        // High 2
        price = basePrice * 1.02 + (progress - 0.4) * 4 * (resistance - basePrice * 1.02);
      } else if (progress < 0.8) {
        // Pullback higher low
        price = resistance - (progress - 0.6) * 2 * (resistance - basePrice * 1.06);
      } else {
        // Breakout
        price = resistance + (progress - 0.8) * 8 * (resistance - basePrice * 1.06);
      }
      prices.push(price);
    }
  } else if (trendType === 'head_and_shoulders') {
    // Left shoulder, Head, Right shoulder, Neckline breakout
    const neckLine = basePrice;
    for (let i = 0; i < count; i++) {
      const progress = i / count;
      if (progress < 0.25) {
        // Left shoulder peak
        price = neckLine + Math.sin((progress / 0.25) * Math.PI) * (basePrice * 0.1);
      } else if (progress < 0.6) {
        // Head peak (higher)
        price = neckLine + Math.sin(((progress - 0.25) / 0.35) * Math.PI) * (basePrice * 0.18);
      } else if (progress < 0.85) {
        // Right shoulder peak
        price = neckLine + Math.sin(((progress - 0.6) / 0.25) * Math.PI) * (basePrice * 0.08);
      } else {
        // Neckline breakdown
        price = neckLine - (progress - 0.85) * 6 * (basePrice * 0.1);
      }
      prices.push(price);
    }
  } else if (trendType === 'cup_and_handle') {
    // Round bottom cup, small shallow dip (handle), then strong breakout
    for (let i = 0; i < count; i++) {
      const progress = i / count;
      if (progress < 0.6) {
        // Cup shape: u-turn
        const u = (progress - 0.3) / 0.3; // ranges from -1 to 1
        price = basePrice + (u * u) * (basePrice * 0.1) - (basePrice * 0.05);
      } else if (progress < 0.85) {
        // Handle: small dip and flags down
        const h = (progress - 0.6) / 0.25;
        price = basePrice * 1.05 - h * (basePrice * 0.04);
      } else {
        // Breakout
        const b = (progress - 0.85) / 0.15;
        price = basePrice * 1.01 + b * (basePrice * 0.15);
      }
      prices.push(price);
    }
  } else if (trendType === 'double_bottom') {
    // Dip 1, bounce, Dip 2 (equal low), big breakout
    for (let i = 0; i < count; i++) {
      const progress = i / count;
      if (progress < 0.25) {
        // First bottom
        price = basePrice - Math.sin((progress / 0.25) * (Math.PI / 2)) * (basePrice * 0.15);
      } else if (progress < 0.5) {
        // Center peak
        price = basePrice * 0.85 + Math.sin(((progress - 0.25) / 0.25) * (Math.PI / 2)) * (basePrice * 0.12);
      } else if (progress < 0.75) {
        // Second bottom
        price = basePrice * 0.97 - Math.sin(((progress - 0.5) / 0.25) * (Math.PI / 2)) * (basePrice * 0.13);
      } else {
        // Breakout above neck line (basePrice * 0.97)
        price = basePrice * 0.84 + ((progress - 0.75) / 0.25) * (basePrice * 0.3);
      }
      prices.push(price);
    }
  } else {
    // Volatile trend
    for (let i = 0; i < count; i++) {
      const progress = i / count;
      price = price + (Math.sin(progress * Math.PI * 6) * (basePrice * 0.03)) + (Math.random() - 0.5) * (basePrice * 0.02);
      prices.push(price);
    }
  }

  // Generate Candlestick elements around these price points
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - (count - i));
    const timeStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const c = prices[i];
    const prevC = i > 0 ? prices[i - 1] : basePrice;
    
    // Spread between open and close
    const o = prevC;
    const isUp = c >= o;
    
    // Add random noise for high and low
    const spread = Math.abs(c - o);
    const maxNoise = basePrice * 0.015;
    const h = Math.max(o, c) + Math.random() * maxNoise;
    const l = Math.min(o, c) - Math.random() * maxNoise;
    
    // Volume: dynamic base volume, higher on breakouts or patterns
    let volBase = 100000 + Math.random() * 50000;
    if (i > count * 0.8) {
      // Breakout volume spike
      volBase *= 2.5;
    }

    candles.push({
      time: timeStr,
      open: parseFloat(o.toFixed(2)),
      high: parseFloat(h.toFixed(2)),
      low: parseFloat(l.toFixed(2)),
      close: parseFloat(c.toFixed(2)),
      volume: Math.round(volBase)
    });
  }

  // Calculate EMA 50 & 200
  // Note: with count ~50, EMA50/200 will be simple approximations (SMA/EMA)
  let sum50 = 0;
  let sum200 = 0;
  for (let i = 0; i < count; i++) {
    sum50 += candles[i].close;
    sum200 += candles[Math.max(0, i - 10)].close; // Offset simulation for visual crossing

    // Simulated EMA overlay
    const k50 = 2 / (15 + 1); // Shorter window visual EMA
    const k200 = 2 / (35 + 1); // Longer window visual EMA
    
    if (i === 0) {
      candles[i].ema50 = candles[i].close;
      candles[i].ema200 = candles[i].close * 0.98;
    } else {
      candles[i].ema50 = parseFloat((candles[i].close * k50 + (candles[i - 1].ema50 || candles[i].close) * (1 - k50)).toFixed(2));
      candles[i].ema200 = parseFloat((candles[i].close * k200 + (candles[i - 1].ema200 || candles[i].close) * (1 - k200)).toFixed(2));
    }

    // RSI Simulation (ranges 20 to 85, correlates with trend)
    let baseRsi = 50;
    if (trendType === 'head_and_shoulders') {
      if (i < 20) baseRsi = 65;
      else if (i < 40) baseRsi = 72;
      else if (i < 60) baseRsi = 55;
      else baseRsi = 28; // bearish breakdown
    } else if (trendType === 'ascending_triangle') {
      baseRsi = 45 + (i / count) * 35; // rising momentum
    } else if (trendType === 'cup_and_handle') {
      if (i < 30) baseRsi = 40;
      else if (i < 45) baseRsi = 52;
      else baseRsi = 78; // explosive breakout
    } else if (trendType === 'double_bottom') {
      if (i < 15) baseRsi = 25; // first dip
      else if (i < 35) baseRsi = 45;
      else if (i < 55) baseRsi = 30; // second dip divergence
      else baseRsi = 75; // bullish surge
    } else {
      baseRsi = 50 + Math.sin(i * 0.5) * 15;
    }
    candles[i].rsi = parseFloat(Math.max(10, Math.min(95, baseRsi + (Math.random() - 0.5) * 5)).toFixed(1));

    // MACD Simulation
    const macdVal = Math.sin(i * 0.3) * 4 + (i / count) * 3 - 2;
    const signalVal = Math.sin((i - 2) * 0.3) * 4 + ((i - 2) / count) * 3 - 2;
    candles[i].macd = {
      macdLine: parseFloat(macdVal.toFixed(2)),
      signalLine: parseFloat(signalVal.toFixed(2)),
      histogram: parseFloat((macdVal - signalVal).toFixed(2))
    };
  }

  return candles;
}

// Concrete setups
export const MOCK_TRADE_SETUPS: TradeSetup[] = [
  {
    id: 'setup-nifty',
    symbol: 'NIFTY 50',
    direction: 'long',
    timeframe: '1D Chart',
    entry: 24250.00,
    stopLoss: 24050.00,
    takeProfit: 24750.00,
    riskReward: 2.5,
    rationale: 'Ascending Triangle Breakout confirmed with high volume. EMA 50 acting as immediate dynamic support. RSI bullish divergence observed from the double bottom bounce at 24000.',
    support: [24000, 24150, 24250],
    resistance: [24400, 24650, 24800],
    videoMockTitle: 'NIFTY 50 Daily Action Plan & Breakout Validation',
    chartData: generateMockCandles(23800, 45, 'ascending_triangle')
  },
  {
    id: 'setup-btc',
    symbol: 'BTCUSD',
    direction: 'long',
    timeframe: '4H Chart',
    entry: 92400.00,
    stopLoss: 90800.00,
    takeProfit: 97200.00,
    riskReward: 3.0,
    rationale: 'Completed a Cup & Handle consolidation pattern above $90k. Strong volume bars validate the initial handle breakout. MACD crossover above the zero-line indicates surging bullish momentum.',
    support: [89500, 90800, 92000],
    resistance: [93500, 95000, 98000],
    videoMockTitle: 'Bitcoin Institutional Accumulation & Cup-Handle Breakdown',
    chartData: generateMockCandles(88000, 45, 'cup_and_handle')
  },
  {
    id: 'setup-reliance',
    symbol: 'RELIANCE',
    direction: 'long',
    timeframe: '1H Chart',
    entry: 1245.00,
    stopLoss: 1225.00,
    takeProfit: 1295.00,
    riskReward: 2.5,
    rationale: 'Beautiful double bottom pattern formed at the key daily demand and liquidity zone of 1220. Price action suggests sellers are exhausted, confirmed by volume climax and subsequent RSI recovery.',
    support: [1215, 1225, 1240],
    resistance: [1255, 1280, 1310],
    videoMockTitle: 'Reliance Heavyweight Rebound: Sizing the Demand Zone Play',
    chartData: generateMockCandles(1230, 45, 'double_bottom')
  },
  {
    id: 'setup-eurusd',
    symbol: 'EURUSD',
    direction: 'short',
    timeframe: '1D Chart',
    entry: 1.0820,
    stopLoss: 1.0880,
    takeProfit: 1.0640,
    riskReward: 3.0,
    rationale: 'Head and Shoulders neckline broken cleanly on the daily interval. Retesting the broken shoulder support turned resistance under declining volumes. Bearish momentum accelerating on MACD.',
    support: [1.0580, 1.0640, 1.0720],
    resistance: [1.0820, 1.0880, 1.0950],
    videoMockTitle: 'Macro FX Setup: Euro Breakdown and Central Bank Decisions',
    chartData: generateMockCandles(1.0950, 45, 'head_and_shoulders')
  }
];

// Live Scanners Alerts simulation data
export const INITIAL_SCANNER_ALERTS: ScannerAlert[] = [
  {
    id: 'scan-1',
    symbol: 'NIFTY 50',
    pattern: 'Ascending Triangle Breakout',
    type: 'breakout',
    timeframe: '15m',
    price: 24285.50,
    change: 1.25,
    volume24h: '₹14,500 Cr',
    timestamp: '09:45 AM',
    strength: 'High'
  },
  {
    id: 'scan-2',
    symbol: 'BTCUSD',
    pattern: 'Cup & Handle Breakout',
    type: 'breakout',
    timeframe: '1h',
    price: 92840.00,
    change: 4.82,
    volume24h: '$41.2B',
    timestamp: '09:42 AM',
    strength: 'High'
  },
  {
    id: 'scan-3',
    symbol: 'TATA MOTORS',
    pattern: 'EMA 50/200 Golden Cross',
    type: 'indicator',
    timeframe: '1D',
    price: 948.20,
    change: 2.15,
    volume24h: '₹3,240 Cr',
    timestamp: '09:40 AM',
    strength: 'High'
  },
  {
    id: 'scan-4',
    symbol: 'EURUSD',
    pattern: 'Head & Shoulders Breakdown',
    type: 'breakdown',
    timeframe: '4h',
    price: 1.0812,
    change: -0.65,
    volume24h: '$84B',
    timestamp: '09:37 AM',
    strength: 'High'
  },
  {
    id: 'scan-5',
    symbol: 'HDFC BANK',
    pattern: 'Volume Profile Anomaly (+280%)',
    type: 'volume',
    timeframe: '5m',
    price: 1618.00,
    change: 1.88,
    volume24h: '₹4,120 Cr',
    timestamp: '09:35 AM',
    strength: 'Medium'
  },
  {
    id: 'scan-6',
    symbol: 'SOLUSD',
    pattern: 'RSI Oversold Bounce (RSI < 25)',
    type: 'indicator',
    timeframe: '15m',
    price: 182.40,
    change: -3.40,
    volume24h: '$3.8B',
    timestamp: '09:30 AM',
    strength: 'Medium'
  }
];

// Macro Economic Indicators
export const MACRO_INDICATORS: MacroIndicator[] = [
  {
    title: 'Interest Rates (US Federal Reserve)',
    currentValue: '5.25% - 5.50%',
    previousValue: '5.50%',
    trend: 'down',
    impact: 'High',
    description: 'Central bank adjusted rates down by 25bps to address stabilizing inflation and support labor markets.',
    context: 'Lower interest rates decrease borrowing costs, generally driving a transition from cash into equities. When interest rates drop, treasury yields follow, making risk-on assets (stocks/crypto) more lucrative.'
  },
  {
    title: 'US 10-Year Bond Yield',
    currentValue: '4.15%',
    previousValue: '4.38%',
    trend: 'down',
    impact: 'High',
    description: 'The long-term yield curve is flattening, reflecting anticipated economic cooling and lower inflation.',
    context: 'An inverted yield curve (short-term yields higher than long-term yields) historically acts as a leading indicator of macroeconomic recessions. Traders track this to allocate capital to defensive vs cyclical sectors.'
  },
  {
    title: 'Consumer Price Index (CPI) Inflation',
    currentValue: '2.9% y/y',
    previousValue: '3.1%',
    trend: 'down',
    impact: 'High',
    description: 'Headline CPI dipped below 3% for the first time in 3 years, suggesting cooling structural inflation.',
    context: 'The main gauge of consumer retail price inflation. Falling CPI gives the Central Bank policy headroom to cut interest rates, fueling breakout setups in growth and momentum sectors.'
  },
  {
    title: 'Producer Price Index (PPI) Inflation',
    currentValue: '1.8% y/y',
    previousValue: '2.1%',
    trend: 'down',
    impact: 'Medium',
    description: 'Wholesale inflation matches policy targets, indicating raw input costs are stabilizing for manufacturers.',
    context: 'PPI measures inflation from the perspective of product producers. It serves as a leading indicator of CPI since input cost increases are usually passed directly to end consumers.'
  }
];

// Sector Rotation Data
export const SECTOR_ROTATION_DATA: SectorRotationData[] = [
  {
    sector: 'Technology & Growth',
    phase: 'Expansion',
    performance3m: 14.8,
    status: 'Outperforming',
    drivers: 'Falling interest rates boost present value of future earnings; heavy capital allocation to AI and automation.'
  },
  {
    sector: 'Financials (Banks/Insurance)',
    phase: 'Peak',
    performance3m: 4.2,
    status: 'Neutral',
    drivers: 'Net Interest Margins (NIM) compress as rates decrease, but overall loan book volumes rise during solid economic expansion.'
  },
  {
    sector: 'Consumer Discretionary',
    phase: 'Expansion',
    performance3m: 9.5,
    status: 'Outperforming',
    drivers: 'Lower inflation boosts household disposable income, driving sales in automotive, high-end retail, and travel.'
  },
  {
    sector: 'Energy & Commodities',
    phase: 'Contraction',
    performance3m: -6.2,
    status: 'Underperforming',
    drivers: 'Slowing global industrial demand and manufacturing indicators cooling oil prices; supply chains normalization.'
  },
  {
    sector: 'Utilities & Defensive Dividends',
    phase: 'Trough',
    performance3m: 8.1,
    status: 'Outperforming',
    drivers: 'Bond yield decline drives income investors to seek yields in utilities, real estate, and consumer staples.'
  }
];
