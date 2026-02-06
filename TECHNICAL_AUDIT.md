
# Technical Audit & System Evolution Report
**Project Name:** MacroInsight Terminal (Evolution of `fin_monitor`)
**Author:** AI Senior Frontend Engineer
**Status:** Completed

---

## 1. 개요 (Executive Summary)
본 문서는 GitHub `MouseBall54/fin_monitor` 레파지토리의 구조적, 기능적, 디자인적 한계를 분석하고, 이를 고도화한 `MacroInsight Terminal` 프로젝트와의 차별점을 기술합니다. 특히 경제 지표 데이터의 정밀한 처리를 위한 단위 표준화와 UI/UX 개선 사항을 상세히 다룹니다.

---

## 2. 기존 레파지토리(`fin_monitor`) 분석 및 부족분
기존 앱의 소스 코드를 면밀히 분석한 결과, 다음과 같은 기술적 부채와 한계가 식별되었습니다.

### A. 데이터 처리의 한계
- **단위(Unit) 일관성 결여**: 지표마다 % (금리), pts (지수), $ (원자재) 등 서로 다른 물리량을 가지고 있으나, UI상에서 이를 구분하는 로직이 약하며 소수점 처리 기준이 명확하지 않음.
- **맥락(Context) 부재**: 단순히 숫자(Price)만 노출될 뿐, 해당 수치가 경제적으로 어떤 의미를 갖는지(Leading vs Lagging)에 대한 해석 레이어가 없음.

### B. UI/UX 디자인의 한계
- **데이터 밀도 부족**: 대시보드 공간 활용이 비효율적이며, 전문가용 단말기(Bloomberg/Reuters) 특유의 신뢰감 있는 다크 테마와 타이포그래피가 부족함.
- **차트 상호작용성**: 정적 이미지 또는 단순한 선형 차트에 그쳐, 시간축 이동이나 지표 간 비교 분석이 불가능함.

### C. 아키텍처적 격차
- **지능형 분석 부재**: 거시경제 지표는 상호 유기적으로 연결되어 있으나(예: 금리 인상 시 나스닥 하락), 이를 실시간으로 추론하여 리포팅하는 로직이 전무함.

---

## 3. UI ID 기반 정밀 비교 분석

| 기능/요소 | 기존 `fin_monitor` (Before) | `MacroInsight Terminal` (After) | 개선 포인트 |
| :--- | :--- | :--- | :--- |
| **Main Layout** | 단순 그리드 또는 리스트 | `grid-cols-12` 기반의 다중 레이어 | 고밀도 정보 배치 |
| **Fed Rate ID** | `id: "interest"` (단순 명명) | `id: "fed_rate"` | 통화정책의 상징성 부여 |
| **CPI ID** | `id: "inflation"` | `id: "cpi"` | 경제 지표의 정확한 명칭 사용 |
| **Market Index** | `id: "stocks"` | `id: "sp500"` | 특정 자산군(Asset Class) 구체화 |
| **Data Flow** | API -> State -> View | API -> Gemini Analysis -> UI | 인공지능 추론 레이어 추가 |

---

## 4. 데이터 단위(Unit) 표준화 가이드라인
정확한 경제 분석을 위해 본 프로젝트에서 정의한 표준 단위 체계입니다.

| 지표 ID | 지표명 | 표준 단위 | 소수점 정밀도 | 참조 소스 |
| :--- | :--- | :--- | :--- | :--- |
| `fed_rate` | 기준금리 | **%** | 2 decimal (Fixed) | FRED (Federal Reserve) |
| `cpi` | 소비자물가지수 | **% (YoY)** | 1 decimal | Bureau of Labor Statistics |
| `sp500` | S&P 500 지수 | **pts** | 2 decimal | NYSE / CBOE |
| `gold` | 국제 금 시세 | **$/oz** | 2 decimal | COMEX |
| `wti` | 서부텍사스유 | **$/bbl** | 2 decimal | NYMEX |

---

## 5. MacroInsight Terminal의 핵심 개선 사항 (Detailed Updates)

### ① AI 기반 실시간 거시 분석 엔진
- **Gemini 3 Pro Integration**: 뉴스 데이터와 지표 수치를 결합하여 "현재 시장이 연착륙(Soft Landing) 중인가?"에 대한 전문적인 답변을 생성합니다.
- **Grounding Tool**: `googleSearch` 도구를 사용하여 단순 과거 데이터가 아닌, 5분 전 뉴스를 반영한 리스크 등급(`riskLevel`)을 산출합니다.

### ② 고도화된 시각화 (Recharts Optimization)
- `AreaChart`와 `LinearGradient`를 사용하여 수치 변화의 심리적 압박감을 시각화했습니다.
- **Sparklines**: 각 지표 카드 내부에 소형 차트를 배치하여 전체적인 추세를 한눈에 파악할 수 있게 설계되었습니다.

### ③ 단위 기반 UI 렌더링
- `MacroCard.tsx` 컴포넌트 내에서 `indicator.unit`에 따라 폰트 크기와 정렬을 다르게 처리하여 수치의 가독성을 극대화했습니다.

---

## 6. 결론 및 향후 과제
기존 `fin_monitor`가 단순한 '데이터 뷰어'였다면, `MacroInsight Terminal`은 **'AI 데이터 분석 플랫폼'**으로 진화했습니다. 향후 개선 사항으로는 WebSocket을 통한 실시간 틱 데이터 반영 및 지표 간 상관관계(Correlation) 자동 계산 엔진 도입이 필요합니다.

---
*본 문서는 프로젝트 루트의 `TECHNICAL_AUDIT.md`로 관리되며, 시스템 유지보수의 표준 가이드로 활용됩니다.*
