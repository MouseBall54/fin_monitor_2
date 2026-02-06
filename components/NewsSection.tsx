
import React, { useEffect, useState } from 'react';
import { fetchLatestMacroNews } from '../services/geminiService';
import { NewsItem } from '../types';

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchLatestMacroNews();
        setNews(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse bg-slate-900 border border-slate-800 h-24 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <i className="fas fa-rss text-orange-400"></i>
          Live Intelligence
        </h2>
        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">Real-time Grounding</span>
      </div>
      
      {news.map((item, idx) => (
        <a 
          key={idx} 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block group bg-slate-900/60 border border-slate-800 p-4 rounded-xl hover:border-emerald-500/30 transition-all"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-emerald-500/70 tracking-tighter">{item.source}</span>
            <i className="fas fa-external-link-alt text-[10px] text-slate-600 group-hover:text-emerald-400 transition-colors"></i>
          </div>
          <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>
        </a>
      ))}

      {news.length === 0 && (
        <div className="text-center py-10 text-slate-500 text-sm italic">
          No breaking news found for the current selection.
        </div>
      )}
    </div>
  );
};

export default NewsSection;
