
import React, { useState, useEffect } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { MacroIndicator, AnalysisState } from './types';
import MacroCard from './components/MacroCard';
import NewsSection from './components/NewsSection';
import AnalysisReport from './components/AnalysisReport';
import ComparePanel from './components/ComparePanel';
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
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">Data Porting Success: v3.1</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'fa-desktop' },
              { id: 'comparison', label: 'Compare Panel', icon: 'fa-exchange-alt' },
              { id: 'analysis', label: 'Audit Tech', icon: 'fa-file-medical-alt' }
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
                <i className={`fas ${tab.icon} text-xs ${activeTab === tab.id ? 'text-emerald-400' : 'text-slate-500'}`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] text-slate-500 font-mono">SYS: STABLE_V3</span>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              FED_DATA_LINK ACTIVE
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-6">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
            {/* Left Column: Macro Monitor */}
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

              {/* Chart Main */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>
                <div className="flex justify-between items-center mb-8 relative z-10">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3 tracking-tight">
                      <div className="w-1.5 h-8 bg-emerald-500 rounded-full"></div>
                      {selectedIndicator.name}
                    </h2>
                    <p className="text-sm text-slate-400 font-medium">{selectedIndicator.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-extrabold text-white mono leading-none tracking-tighter">
                      {selectedIndicator.value}
                      <span className="text-sm text-slate-500 ml-2 font-normal">{selectedIndicator.unit}</span>
                    </p>
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${selectedIndicator.change >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {selectedIndicator.change >= 0 ? '+' : ''}{selectedIndicator.change}%
                      </span>
                      <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Performance</span>
                    </div>
                  </div>
                </div>

                <div className="h-[420px] w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedIndicator.history}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.4} />
                      <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dx={-10} domain={['auto', 'auto']} />
                      <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }} />
                      <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" animationDuration={1500} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Insight Bar */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 group hover:border-emerald-500/30 transition-all duration-500 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <i className="fas fa-microchip"></i>
                    </div>
                    Market Inference Engine
                  </h3>
                  <button onClick={handleRunAnalysis} className="text-[10px] font-bold text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-2 tracking-widest uppercase">
                    <i className={`fas fa-sync-alt ${isAnalyzing ? 'animate-spin' : ''}`}></i>
                    Re-Process Signals
                  </button>
                </div>
                {analysis ? (
                  <div className="space-y-6">
                    <p className="text-slate-300 leading-relaxed font-medium bg-slate-950/40 p-5 rounded-2xl border border-slate-800/50">
                      {analysis.summary}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {analysis.keyTakeaways.map((t, i) => (
                        <div key={i} className="flex items-start gap-4 text-xs text-slate-400 bg-slate-800/30 px-5 py-4 rounded-2xl border border-slate-700/20 group-hover:bg-slate-800/50 transition-colors">
                          <i className="fas fa-check-circle text-emerald-500 mt-0.5"></i>
                          <span className="leading-relaxed font-semibold">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-32 flex flex-col items-center justify-center text-slate-600 gap-3 italic">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                    Decoding global macro signals...
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Intelligence & Risk */}
            <div className="lg:col-span-4 space-y-6">
              <NewsSection />
              
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-indigo-500/10 blur-2xl rounded-full"></div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.25em] mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
                  Risk Exposure Heatmap
                </h3>
                <div className="space-y-8">
                  {[
                    { label: 'Liquidity Depth', val: 92, color: 'bg-emerald-500', icon: 'fa-stream' },
                    { label: 'Inflation Pressure', val: 78, color: 'bg-rose-500', icon: 'fa-thermometer-half' },
                    { label: 'Market Volatility', val: 45, color: 'bg-amber-500', icon: 'fa-bolt' },
                  ].map((r, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-400 uppercase flex items-center gap-2">
                          <i className={`fas ${r.icon} w-3 text-center text-slate-600`}></i>
                          {r.label}
                        </span>
                        <span className="text-white mono bg-slate-800 px-2 py-0.5 rounded">{r.val}%</span>
                      </div>
                      <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                        <div className={`h-full ${r.color} shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-1000`} style={{ width: `${r.val}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-indigo-500/10 via-slate-900/20 to-transparent border border-indigo-500/20 rounded-3xl relative group overflow-hidden">
                <div className="absolute -bottom-10 -right-10 text-indigo-500/5 text-[120px] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4">Real-time Correlation</p>
                <p className="text-xs text-slate-300 leading-relaxed font-medium relative z-10">
                  <span className="text-white font-bold">CPI-Fed Correlation</span> 계수가 0.89를 유지 중입니다. 시장은 다음 FOMC에서의 금리 인하 확률을 <span className="text-emerald-400 font-bold">64.2%</span>로 선반영하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && <AnalysisReport />}
        {activeTab === 'comparison' && <ComparePanel indicators={MOCK_DATA} />}
      </main>

      <footer className="mt-12 border-t border-slate-900 p-10 bg-slate-950/80">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-6">
            <p className="text-[10px] font-mono tracking-widest uppercase">© 2025 MacroInsight Terminal. AI-PORT STABLE.</p>
            <div className="h-4 w-px bg-slate-800"></div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-emerald-500">Security Level: HIGH</p>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <span className="text-indigo-400">Node Status: Verified</span>
            <span className="text-slate-500">Architecture Mapping: Complete</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
