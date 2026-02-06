
import React, { useState, useEffect } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { MacroIndicator, AnalysisState } from './types';
import MacroCard from './components/MacroCard';
import NewsSection from './components/NewsSection';
import AnalysisReport from './components/AnalysisReport';
import ComparisonDoc from './components/ComparisonDoc';
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
    description: '미국 연방공개시장위원회(FOMC)가 결정하는 타겟 금리 범위.',
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
    description: '소비자가 구입하는 상품 및 서비스의 가격 변동을 측정하는 지표.',
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
    description: '미국 상장 기업 500개의 성과를 추적하는 시장 지수.',
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
    description: '국제 현물 시장에서의 금 가격.',
    history: Array.from({ length: 10 }, (_, i) => ({ date: `2024-${12-i}`, value: 2320 - (i * 15) }))
  }
];

type TabType = 'dashboard' | 'analysis' | 'comparison';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
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
              <i className="fas fa-terminal"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">MacroInsight <span className="text-emerald-500">Terminal</span></h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">TECHNICAL_AUDIT.md Generated</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
              { id: 'comparison', label: 'Gap Analysis', icon: 'fa-file-alt' },
              { id: 'analysis', label: 'Tech Audit', icon: 'fa-microchip' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <i className={`fas ${tab.icon} text-xs`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] text-slate-500 font-mono">NODE: SEOUL_HQ_01</span>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE DATA STREAMING
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-6">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
            {/* Left: Indicator Grid & Charts */}
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

              {/* Chart Detail */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                      <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                      {selectedIndicator.name}
                    </h2>
                    <p className="text-sm text-slate-400">{selectedIndicator.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white mono leading-none">
                      {selectedIndicator.value}
                      <span className="text-sm text-slate-500 ml-1 font-normal">{selectedIndicator.unit}</span>
                    </p>
                    <p className={`text-xs font-bold mt-1 ${selectedIndicator.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {selectedIndicator.change >= 0 ? '+' : ''}{selectedIndicator.change}% (MTD)
                    </p>
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
                      <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dx={-10} domain={['auto', 'auto']} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Narrative */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 overflow-hidden group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <i className="fas fa-magic text-emerald-400 group-hover:rotate-12 transition-transform"></i>
                    Market Intelligence Summary
                  </h3>
                  <button onClick={handleRunAnalysis} className="text-xs text-slate-500 hover:text-emerald-400 transition-colors">
                    <i className={`fas fa-sync-alt mr-2 ${isAnalyzing ? 'animate-spin' : ''}`}></i>
                    Refresh Logic
                  </button>
                </div>
                {analysis ? (
                  <div className="space-y-4">
                    <p className="text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
                      {analysis.summary}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {analysis.keyTakeaways.map((t, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs text-slate-400 bg-slate-800/30 px-3 py-2 rounded-lg border border-slate-700/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-24 flex items-center justify-center text-slate-600 italic text-sm">
                    {isAnalyzing ? "Processing global macro signals..." : "Analysis engine standby."}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Intelligence Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <NewsSection />
              
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Risk Heatmap</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Liquidity Risk', val: 24, color: 'bg-emerald-500' },
                    { label: 'Inflation Pressure', val: 78, color: 'bg-rose-500' },
                    { label: 'Geopolitical Volatility', val: 56, color: 'bg-amber-500' },
                  ].map((r, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-400 uppercase">{r.label}</span>
                        <span className="text-white">{r.val}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${r.color}`} style={{ width: `${r.val}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-2xl">
                <p className="text-[10px] font-bold text-emerald-500 uppercase mb-2">System Update</p>
                <p className="text-xs text-slate-300 leading-snug">
                  현재 CPI와 Fed Rate의 상관계수가 <strong>0.89</strong>를 기록하며 통화정책 긴밀도가 상승하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && <AnalysisReport />}
        {activeTab === 'comparison' && <ComparisonDoc />}
      </main>

      <footer className="mt-12 border-t border-slate-800 p-8 bg-slate-950/50">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center opacity-40 hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-mono tracking-widest uppercase">© 2025 MacroInsight Terminal. All rights reserved.</p>
          <div className="flex gap-4 text-[10px] font-bold uppercase">
            <span className="text-emerald-500">Audit Status: PASS</span>
            <span className="text-slate-500">Compliance: T-0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
