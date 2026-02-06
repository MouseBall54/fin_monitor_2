# Technical Audit & System Evolution Report
**Project Name:** MacroInsight Terminal (v3.1)
**Architecture Level:** AI-Native Macro Monitoring
**Base Branch:** `feature/fin-monitor2-ui-port` evolution

---

## 1. 개요 (Executive Summary)
본 문서는 `fin_monitor` 프로젝트의 초기 레거시 코드를 `MacroInsight Terminal`로 포팅하며 진행된 핵심 UI ID 매핑 및 아키텍처 개선 사항을 정의합니다. 단순 데이터 시각화 도구에서 **'추론형 매크로 단말기'**로의 진화를 목표로 합니다.

---

## 2. UI ID 및 데이터 규격 진화 (Identifier Mapping)

가장 큰 변화는 데이터의 모호성을 제거하기 위해 내부 식별자(ID)를 글로벌 금융 표준에 맞춰 재정의한 것입니다.

| 기존 ID (Legacy) | 개선 ID (MacroInsight) | 데이터 규격 (Unit/Precision) | 변경 사유 |
| :--- | :--- | :--- | :--- |
| `interest` | `fed_rate` | **%** (2 decimal) | 미 연준 금리로의 구체적 명시 |
| `inflation` | `cpi` | **% (YoY)** (1 decimal) | 소비자 물가 지수 표준 규격 적용 |
| `stocks` | `sp500` | **pts** (2 decimal) | 포괄적 명칭에서 특정 지표로 구체화 |
| `commodity` | `gold` | **$/oz** (2 decimal) | 거래 단위 표준화 ($ per ounce) |

---

## 3. 기능적 고도화 (Feature Porting)

`fin-monitor2-ui-port` 브랜치의 핵심 로직을 반영하여 다음과 같은 고도화 작업을 수행했습니다.

### A. 정적 폴링 -> 실시간 추론 (Static to Agentic)
- **Before**: 정해진 간격으로 API를 호출하여 값을 업데이트.
- **After**: Gemini 3 Pro Agent가 지표 변화를 감지하면 관련 뉴스(`googleSearch`)를 검색하여 맥락적 요약(`AnalysisState`)을 즉시 생성.

### B. 단순 리스트 -> 계층적 그리드 (Grid-12 Hierarchy)
- **Before**: 모든 카드가 동일한 비중으로 나열됨.
- **After**: `grid-cols-12` 레이아웃을 사용하여 핵심 차트(8 col)와 인텔리전스 사이드바(4 col)로 정보 계층을 분리.

---

## 4. UI/UX 디자인 시스템 (Terminal Aesthetic)

- **Typography**: 수치 데이터에 `JetBrains Mono`를 강제하여 가독성 확보.
- **Color Logic**:
  - `Emerald-500`: 시장 긍정 / 금리 인하(부양) / 지수 상승
  - `Rose-500`: 시장 부정 / 인플레 압력 / 리스크 증가
  - `Slate-900/40`: 반투명 유리 질감(Glassmorphism) 구현

---

## 5. 결론 (Conclusion)
`MacroInsight Terminal`은 단순한 UI 포팅을 넘어, 데이터의 **'표준 단위 강제'**와 **'AI 추론 레이어'**를 결합한 차세대 금융 대시보드입니다. 본 문서는 시스템의 무결성을 보장하기 위한 최종 Audit 리포트로 활용됩니다.
