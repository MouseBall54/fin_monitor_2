
import React from 'react';

const ComparisonDoc: React.FC = () => {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-10 animate-in fade-in duration-500">
      {/* Header Section */}
      <section>
        <h2 className="text-3xl font-extrabold text-white mb-4">
          <i className="fas fa-file-contract text-emerald-500 mr-3"></i>
          시스템 비교 및 데이터 표준화 분석서
        </h2>
        <p className="text-slate-400 leading-relaxed">
          본 문서는 GitHub <code className="text-blue-400">MouseBall54/fin_monitor</code>의 초기 구조를 분석하고, 
          거시경제 터미널로의 진화를 위해 수행된 변경사항 및 데이터 규격 조사 결과를 담고 있습니다.
        </p>
      </section>

      {/* 1. Unit Standardization Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-200 border-l-4 border-emerald-500 pl-4">1. 경제 지표 데이터 단위(Unit) 조사 결과</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-400">
            <thead className="text-xs uppercase bg-slate-800/50 text-slate-300">
              <tr>
                <th className="px-4 py-3">지표군</th>
                <th className="px-4 py-3">지표명 (Example)</th>
                <th className="px-4 py-3">표준 단위 (Standard)</th>
                <th className="px-4 py-3">데이터 소스 특성</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="px-4 py-3 font-medium text-slate-200">통화 정책</td>
                <td className="px-4 py-3">기준금리 (Fed Funds Rate)</td>
                <td className="px-4 py-3 text-emerald-400">Percentage (%)</td>
                <td className="px-4 py-3">소수점 2자리 정밀도 필수</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-200">물가 지수</td>
                <td className="px-4 py-3">소비자물가지수 (CPI)</td>
                <td className="px-4 py-3 text-emerald-400">YoY % Change</td>
                <td className="px-4 py-3">계절 조정(SA) 여부 표기 중요</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-200">시장 지수</td>
                <td className="px-4 py-3">S&P 500 / KOSPI</td>
                <td className="px-4 py-3 text-emerald-400">Points (pts)</td>
                <td className="px-4 py-3">종가(Close) 기준 실시간 틱 데이터</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-200">원자재</td>
                <td className="px-4 py-3">금(Gold) / 유가(WTI)</td>
                <td className="px-4 py-3 text-emerald-400">USD / oz or bbl</td>
                <td className="px-4 py-3">달러 인덱스(DXY)와 강한 역상관관계</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Gap Analysis Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-200 border-l-4 border-rose-500 pl-4">2. 기존 앱(fin_monitor) 대비 격차 및 부족분 분석</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-rose-400 font-bold mb-3 flex items-center gap-2">
              <i className="fas fa-times-circle"></i> 기존 앱 부족분
            </h4>
            <ul className="text-sm space-y-2 list-disc list-inside text-slate-400">
              <li>지표 간 상관관계 분석 로직 부재</li>
              <li>데이터 단위의 혼용 (Index point와 %의 시각적 미분류)</li>
              <li>정적 데이터 렌더링 (단순 수치 표시 위주)</li>
              <li>뉴스 이벤트와 지표 변화의 맥락적 연결 결여</li>
              <li>반응형 및 고해상도 차트 라이브러리 미흡</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 p-6 rounded-xl border border-emerald-900/30">
            <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
              <i className="fas fa-check-circle"></i> 현재 앱 개선사항
            </h4>
            <ul className="text-sm space-y-2 list-disc list-inside text-slate-300">
              <li>Gemini Search Grounding을 통한 실시간 뉴스 맥락 통합</li>
              <li>고급 시계열 차트(Recharts Area)를 통한 추세 시각화</li>
              <li>지표별 단위 표준화 및 정밀한 수치 렌더링</li>
              <li>AI 기반의 리스크 레벨 평가 엔진 탑재</li>
              <li>블룸버그 스타일의 고밀도 정보 레이아웃</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Tech Architecture Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-200 border-l-4 border-indigo-500 pl-4">3. 향후 아키텍처 확장 제언</h3>
        <p className="text-sm text-slate-400">
          현재 구조에서 가장 시급한 보완 사항은 <strong>WebSocket 기반의 실시간 호가 데이터 연동</strong>입니다. 
          Gemini 2.5/3 모델의 실시간 분석 능력을 극대화하기 위해 다음과 같은 파이프라인 구축을 권장합니다:
        </p>
        <div className="bg-indigo-900/10 p-5 rounded-lg border border-indigo-500/20">
          <div className="flex items-center gap-4 text-indigo-300 text-sm font-mono">
            <span>API Fetch</span>
            <i className="fas fa-long-arrow-alt-right"></i>
            <span>Gemini Reasoning</span>
            <i className="fas fa-long-arrow-alt-right"></i>
            <span>Semantic Cache</span>
            <i className="fas fa-long-arrow-alt-right"></i>
            <span>Real-time UI</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComparisonDoc;
