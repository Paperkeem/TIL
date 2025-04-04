# 상태관리 라이브러리 비교

#### 1. Redux Toolkit (RTK)

- Flux 패턴, 단일 전역 스토어 기반
- 보일러 플레이트 다소 존재(액션/슬라이스 필요)
- useSelector 등으로 리렌더링 최적화

#### 2. Zustand

- 훅 기반의 미니멀 스토어
- 보일러 플레이트 거의 없으며 러닝커브 없음
- 기본적으로 선택적 구독을 지원하여 리렌더링 최적화 `useStore(state => state.itemStore)`

#### 3. Jotai

- atom 원자 기반의 상태 관리 철학(React의 상태 확장)
- 보일러 플레이트 거의 없으며 러닝커브 낮은 편
- 의존하는 atom만 리렌더링
- 미들웨어 확장성 비교적 다소 낮음

#### 3. Flux 패턴이란?

> Flux 패턴이란 상태를 단방향으로 관리하는 구조로 애플리케이션의 예측 가능성과 유지보수성을 높이기 위해 사용됩니다.

##### 장점

- 단방향 흐름 → 데이터 흐름이 예측 가능
- 디버깅 용이 → 상태 변경 원인 명확
- 모듈화 → 액션, 스토어, 뷰 역할 분리
- 대규모 앱에 적합 → 상태관리가 명확하게 구조화

1. Action

- 사용자의 입력이나 시스템 이벤트 등 어떤 action이 발생함을 나타내는 객체
- `{ type: 'FRONT', payload: '프론트 공부' }`

2.  Dispatcher

- 액션을 스토어에 전달하는 중개자
- 모든 액션은 Dispatcher를 통해 전달

3. Store

- 실제 애플리케이션의 상태와 비즈니스 로직
- 액션을 받아 상태를 업데이트하고, 변경을 구독하는 뷰에 알림

4. View

- Store를 구독하고 변경되면 UI를 다시 렌더링
- 사용자 입력은 다시 Dispatcher에 전달되며 순환
