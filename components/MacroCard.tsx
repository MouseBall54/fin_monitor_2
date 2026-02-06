
import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { MacroIndicator } from '../types';

interface Props {
  indicator: MacroIndicator;
  onClick: (indicator: MacroIndicator) => void;
  active: boolean;
}

const MacroCard: React.FC<Props> = ({ indicator, onClick, active }) => {
  const isPositive = indicator.change >= 0;

  return (
    <div 
      onClick={() => onClick(indicator)}
      className={`
        relative overflow-hidden cursor-pointer transition-all duration-300 border rounded-xl p-5
        ${active 
          ? 'bg-slate-800/80 border-emerald-500/50 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/20' 
          : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/40 hover:border-slate-700'}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{indicator.category.replace('_', ' ')}</p>
          <h3 className="text-lg font-bold text-slate-100">{indicator.name}</h3>
        </div>
        <div className={`
          flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold
          ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}
        `}>
          <i className={`fas fa-caret-${isPositive ? 'up' : 'down'}`}></i>
          {Math.abs(indicator.change)}%
        </div>
      </div>

      <div className="flex items-end gap-3">
        <span className="text-2xl font-bold text-white mono">
          {indicator.value.toLocaleString()}
          <span className="text-xs text-slate-500 ml-1 font-normal">{indicator.unit}</span>
        </span>
        
        <div className="flex-grow h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={indicator.history}>
              <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={isPositive ? '#10b981' : '#f43f5e'} 
                strokeWidth={2} 
                dot={false}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MacroCard;
