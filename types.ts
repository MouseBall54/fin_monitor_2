
export interface MacroIndicator {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  history: { date: string; value: number }[];
  category: 'monetary' | 'real_economy' | 'commodities' | 'markets';
  description: string;
}

export interface NewsItem {
  title: string;
  url: string;
  source: string;
  snippet: string;
}

export interface AnalysisState {
  summary: string;
  riskLevel: 'low' | 'medium' | 'high';
  keyTakeaways: string[];
  lastUpdated: string;
}
