
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { MacroIndicator, AnalysisState } from './types';
import MacroCard from './components/MacroCard';
import NewsSection from './components/NewsSection';
import AnalysisReport from './components/AnalysisReport';
import { fetchMacroAnalysis } from './services/geminiService';

const MOCK_DATA: MacroIndicator[] = [
  {
    id: 'fed_rate',
    name: 'Fed Funds Rate',
    value: 5.50,
    unit: '%',
    change: 0,
    trend: 'neutral',
    category: 'monetary',
    description: 'The target interest rate range set by the Federal Open Market Committee.',
    history: Array.from({ length: 10 }, (_, i) => ({ date: `2024-${12-i}`, value: 5.50 - (i * 0.05) }))
  },
  {
    id: 'cpi',
    name: 'US Inflation (CPI)',
    value: 3.1,
    unit: '%',
    change: -0.3,
    trend: 'down',
    category: 'real_economy',
    description: 'Measure of the average change over time in the prices paid by consumers.',
    history: Array.from({ length: 10 }, (_, i) => ({ date: `2024-${12-i}`, value: 3.1 + (i * 0.1) }))
  },
  {
    id: 'sp500',
    name: 'S&P 500 Index',
    value: 5120.42,
    unit: 'pts',
    change: 1.2,
    trend: 'up',
    category: 'markets',
    description: 'A stock market index tracking the stock performance of 500 of the largest companies.',
    history: Array.from({ length: 10 }, (_, i) => ({ date: `2024-${12-i}`, value: 5120 - (i * 20) }))
  },
  {
    id: 'gold',
    name: 'Gold Spot',
    value: 2320.50,
    unit: '$/oz',
    change: 0.8,
    trend: 'up',
    category: 'commodities',
    description: 'The current price of gold in the international spot market.',
    history: Array.from({ length: 10 }, (_, i) => ({ date: `2024-${12-i}`, value: 2320 - (i * 15) }))
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analysis'>('dashboard');
  const [selectedIndicator, setSelectedIndicator] = useState<MacroIndicator>(MOCK_DATA[0]);
  const [analysis, setAnalysis] = useState<AnalysisState | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    handleRunAnalysis();
  }, []);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await fetchMacroAnalysis(MOCK_DATA);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-600/20">
              <i className="fas fa-chart-line"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">MacroInsight <span className="text-emerald-500">Terminal</span></h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">Global Economic Monitor v3.0</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Monitor Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('analysis')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === 'analysis' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Technical Audit Report
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-slate-500 font-mono">SERVER STATUS</span>
              <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                STABLE CONNECTION
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-6 space-y-6">
        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Indicators Grid */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_DATA.map((indicator) => (
                  <MacroCard 
                    key={indicator.id} 
                    indicator={indicator} 
                    onClick={setSelectedIndicator}
                    active={selectedIndicator.id === indicator.id}
                  />
                ))}
              </div>

              {/* Main Chart Section */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedIndicator.name} Trend Analysis</h2>
                    <p className="text-sm text-slate-400">{selectedIndicator.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs bg-slate-800 border border-slate-700 rounded text-slate-300 hover:bg-slate-700">1D</button>
                    <button className="px-3 py-1 text-xs bg-slate-800 border border-slate-700 rounded text-slate-300 hover:bg-slate-700">1W</button>
                    <button className="px-3 py-1 text-xs bg-emerald-600 border border-emerald-500 rounded text-white font-bold">1M</button>
                  </div>
                </div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedIndicator.history}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#475569" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis 
                        stroke="#475569" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false}
                        dx={-10}
                        domain={['auto', 'auto']}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                        itemStyle={{ color: '#10b981' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Market Outlook */}
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <i className="fas fa-brain text-8xl text-emerald-500"></i>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm">
                      <i className="fas fa-magic"></i>
                    </div>
                    <h3 className="text-lg font-bold text-white">Gemini Market Sentiment Engine</h3>
                  </div>
                  {isAnalyzing && (
                    <div className="flex items-center gap-2 text-xs text-emerald-500 font-bold">
                      <i className="fas fa-spinner animate-spin"></i>
                      GENERATING INSIGHTS...
                    </div>
                  )}
                </div>
                
                {analysis ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="text-slate-300 leading-relaxed italic">
                      "{analysis.summary}"
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keyTakeaways.map((takeaway, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-emerald-400">
                          • {takeaway}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">System Risk Level:</span>
                        <span className={`text-xs font-bold uppercase ${
                          analysis.riskLevel === 'low' ? 'text-emerald-500' :
                          analysis.riskLevel === 'medium' ? 'text-amber-500' : 'text-rose-500'
                        }`}>
                          {analysis.riskLevel}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-600">Generated at {analysis.lastUpdated}</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-32 flex flex-col items-center justify-center gap-3 text-slate-500 italic">
                    <i className="fas fa-microchip text-2xl opacity-20"></i>
                    <p>Initialize market analysis engine</p>
                    <button 
                      onClick={handleRunAnalysis}
                      className="px-4 py-1.5 bg-emerald-600/20 border border-emerald-500/30 rounded text-emerald-400 text-xs font-bold hover:bg-emerald-600/30 transition-all"
                    >
                      RUN FULL AUDIT
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <NewsSection />
              
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-calendar text-blue-400"></i>
                  Economic Calendar
                </h3>
                <div className="space-y-4">
                  {[
                    { event: 'Initial Jobless Claims', time: 'Today 08:30', impact: 'High' },
                    { event: 'Retail Sales MoM', time: 'Tomorrow 08:30', impact: 'Medium' },
                    { event: 'Michigan Consumer Sentiment', time: 'Fri 10:00', impact: 'High' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                      <div>
                        <p className="text-sm font-semibold text-slate-200">{item.event}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{item.time}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.impact === 'High' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {item.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-4">Market Correlations</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">BTC vs S&P500</span>
                    <span className="text-emerald-400 font-bold">+0.82</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: '82%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-4">
                    <span className="text-slate-400">Gold vs DXY</span>
                    <span className="text-rose-400 font-bold">-0.65</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <AnalysisReport />
        )}
      </main>

      {/* Footer Info */}
      <footer className="border-t border-slate-800 p-8 mt-12 bg-slate-950">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 opacity-50">
            <i className="fas fa-shield-alt text-slate-400"></i>
            <span className="text-xs font-medium">End-to-end encrypted macro analysis channel</span>
          </div>
          <div className="flex gap-6 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-emerald-500 transition-colors">Documentation</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">API Reference</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Security Audit</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
