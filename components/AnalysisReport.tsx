
import React from 'react';

const AnalysisReport: React.FC = () => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Technical Audit: <span className="text-emerald-400">Project Fin-Monitor</span></h2>
        <p className="text-slate-400">Analysis of architectural gaps, UI/UX limitations, and data standardization requirements.</p>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-emerald-300 border-b border-slate-800 pb-2">1. Data Unit Standardization Analysis</h3>
        <p className="text-slate-300 leading-relaxed">
          Through cross-referencing global economic datasets (FRED, World Bank, Bloomberg), the following standard units must be strictly enforced to ensure visual consistency:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h4 className="font-medium text-white mb-2">Monetary Policy</h4>
            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
              <li>Interest Rates: Percentage (%) with 2 decimal precision</li>
              <li>Money Supply (M2): Billions of Local Currency (e.g., USD)</li>
              <li>Central Bank Balance: Trillions of Local Currency</li>
            </ul>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h4 className="font-medium text-white mb-2">Real Economy & Inflation</h4>
            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
              <li>GDP Growth: Year-over-Year (YoY) Percentage</li>
              <li>CPI / Core CPI: YoY Percentage change</li>
              <li>Unemployment: Percentage of total labor force</li>
            </ul>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h4 className="font-medium text-white mb-2">Commodities & Trade</h4>
            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
              <li>Crude Oil: USD per Barrel ($/bbl)</li>
              <li>Gold / Precious Metals: USD per Troy Ounce ($/oz)</li>
              <li>Trade Balance: Millions of USD</li>
            </ul>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h4 className="font-medium text-white mb-2">Market Indices</h4>
            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
              <li>S&P500 / NASDAQ: Absolute Index Points</li>
              <li>VIX: Percentage (Standardized Volatility)</li>
              <li>Yield Curves: Basis Points (bps) difference</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-rose-400 border-b border-slate-800 pb-2">2. Identified Architectural Gaps</h3>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
              <i className="fas fa-microchip"></i>
            </div>
            <div>
              <h4 className="font-medium text-white">Lack of Real-time Streaming Integration</h4>
              <p className="text-sm text-slate-400">The current structure relies on polling-based REST APIs. High-frequency macro monitoring requires WebSockets or Gemini Live API integration for real-time narrative updates.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <i className="fas fa-brain"></i>
            </div>
            <div>
              <h4 className="font-medium text-white">Missing Correlation Analysis Engine</h4>
              <p className="text-sm text-slate-400">Indicators are listed in silos. There is no automated logic to calculate the beta between interest rates and specific sector indices (e.g., Tech vs. Yields).</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <i className="fas fa-layer-group"></i>
            </div>
            <div>
              <h4 className="font-medium text-white">Insufficient Data Hierarchies</h4>
              <p className="text-sm text-slate-400">No distinction between "Leading", "Lagging", and "Coincident" indicators. Users cannot prioritize signals based on economic cycle positioning.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-blue-400 border-b border-slate-800 pb-2">3. Proposed UI/UX Improvements</h3>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1"><i className="fas fa-check-circle"></i></span>
            <span><strong>Contextual Grounding:</strong> Every chart should have a "Explain with AI" button that uses RAG (Retrieval Augmented Generation) to explain current trends.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1"><i className="fas fa-check-circle"></i></span>
            <span><strong>Multi-source Verification:</strong> UI should display data confidence levels by comparing multiple API providers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1"><i className="fas fa-check-circle"></i></span>
            <span><strong>Semantic Search:</strong> Instead of filters, provide a natural language bar: "Show me how the yen is performing against the 10-year yield".</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AnalysisReport;
