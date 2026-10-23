import { useEffect, useRef } from 'react';

export default function LiveMarket() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = container.current;
    if (!host) return;
    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.textContent = JSON.stringify({
      colorTheme: 'dark', dateRange: '1D', locale: 'en',
      isTransparent: true, showFloatingTooltip: true,
      width: '100%', height: 550, showSymbolLogo: true, showChart: true,
      tabs: [{ title: 'US Stocks', symbols: [
        { s: 'NASDAQ:AAPL', d: 'Apple' },
        { s: 'NASDAQ:MSFT', d: 'Microsoft' },
        { s: 'NASDAQ:NVDA', d: 'NVIDIA' },
        { s: 'NASDAQ:AMZN', d: 'Amazon' },
        { s: 'NASDAQ:GOOGL', d: 'Alphabet' },
        { s: 'NASDAQ:TSLA', d: 'Tesla' }
      ] }]
    });
    host.replaceChildren(widget, script);
    return () => host.replaceChildren();
  }, []);

  return (
    <div>
      <div ref={container} className="tradingview-widget-container min-h-[550px]" />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
        <span>Quotes update automatically. Exchange delays may apply; closed markets show the last available price.</span>
        <a href="https://www.tradingview.com/markets/stocks-usa/" target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-white">US stock market by TradingView ↗</a>
      </div>
    </div>
  );
}
