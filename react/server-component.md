# RSC(React Server Component)의 특징

#### 1. RSC의 특징

##### 장점

- 리액트 서버 컴포넌트는, 오직 서버에서만 실행되는 컴포넌트 입니다.
- 서버에서 렌더링하여 클라이언트에게 전달하므로 하이드레이션이나 재렌더링이 발생하지 않습니다.
- 클라이언트 자바스크립트 번들에 포함되지 않기 때문에, 자바스크립트 번들 크기를 줄이고 초기 로딩 성능을 향상시키며, SEO 최적화에 유리합니다.

##### 단점

- RSC는 서버에서 렌더링 되기 때문에 사용자 인터랙션을 추가할 수 없습니다.
- localStorage 같은 웹 API를 사용할 수 없습니다.

#### 2. 클라이언트 컴포넌트를 'use client'로 선언했을 시 렌더링이 CSR로 이루어지는지?

> 페이지 전체는 서버에서 pre-render 되고(SSR or SSG), 그 안에 client component 자리는 hydration용 placeholder로 남겨집니다.

- App Router에서 클라이언트 컴포넌트는 기본적으로 SSR 입니다. 공식문서에서 클라이언트 컴포넌트를 설명할 때 HTML을 내려준 이후 하이드레이션 단계를 수행한다고 설명하고 있습니다.
[공식 문서](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

> "use client"는 Server와 Client Component 모듈 간의 경계를 선언하는 데 사용됩니다. "use client"를 정의하면 해당 파일에 import 되는 모듈, 자식 컴포넌트를 포함하여 클라이언트 번들의 일부로 간주됩니다.

#### 3. 서버컴포넌트의 번들 사이즈가 0B로 표시되는 이유는 무엇일까요?

> 서버컴포넌트는 클라이언트 번들에 포함되지 않기 때문에 번들 사이즈가 0B 입니다.  
> 서버에는 실행 비용이 있으나(fetch, DB 쿼리), 클라이언트 기준에서는 네트워크/다운로드 부담이 0입니다.

1. 서버 컴포넌트는 브라우저로 전송되지 않습니다.

- 서버 컴포넌트는 브라우저에서 실행되지 않고, 오직 서버에서 실행되어 HTML로 결과를 만들어냅니다.
- 그래서 클라이언트 번들(js)에 포함되지 않고, 클라이언트 입장에서 보면 해당 파일이 존재하지 않는 것처럼 보이기 때문에 사이즈가 0B입니다.

2. 번들 리포트 도구는 클라이언트용 JS 번들만 기준으로 분석합니다.

- 예시로 next build 후 next build-analyzer, webpack-bundle-analyzer, next/script의 strategy="beforeInteractive"등은 클라이언트로 보내질 JS 크기만 계산합니다.
- 서버에서 실행되는 컴포넌트는 분석 대상에 없습니다.

#### 4. 서버컴포넌트와 클라이언트 컴포넌트의 렌더링 방식 차이

1. 서버 컴포넌트

- 렌더링 위치 : 서버에서 렌더링
- 렌더링 시점 : 요청 시 서버에서 즉시 HTML 생성
- JS 번들 포함 여부 : 없음(HTML만 전송됨)
- 상호작용 가능 여부 : 없음
- 리렌더링 방식 : 서버에서 다시 렌더링
- 성능 특성 : 초기 로딩 빠름, JS 적음

2. 클라이언트 컴포넌트

- 렌더링 위치 : 브라우저에서 렌더링
- 렌더링 시점 : 브라우저 JS 로딩 이후 렌더링(CSR)
- JS 번들 포함 여부 : 포함됨(hydrate 필요)
- 상호작용 가능 여부 : 가능(useState, useEffect 등 사용 가능)
- 리렌더링 방식 : 클라이언트에서 상태 기반 리렌더링
- 성능 특성 : 상호 작용 많음, JS 번들 커짐 가능

#### 5. 하이드레이션 과정을 설명해주세요

> 하이드레이션이란 이벤트 리스너를 DOM에 연결하여 정적 HTML을 인터랙티브하게 만드는 과정입니다. 하이드레이션은 hydrateRoot React API를 사용해 백그라운드에서 수행됩니다.

1. 서버에서 HTML + JS 번들 전달
2. 브라우저가 HTML을 렌더링
3. JS 번들이 로드되고 React 실행
4. React가 이미 렌더링 된 DOM과 내부 VDOM을 비교
5. 일치 여부 확인 후 이벤트 바인딩, 상태 관리 등 동작 활성화


#### 6. 서버컴포넌트와 SSR의 차이

> SSR은 요청 기반의 렌더링 방식이고, 서버 컴포넌트는 React의 특정 기능으로 서버에서만 실행되는 컴포넌트를 의미합니다.       
> SSR은 서버에서 렌더링 된 HTML을 가져오지만 서버 컴포넌트는 HTML이 아닌 렌더링 할 트리 객체를 가져옵니다.

1. 서버컴포넌트
- 서버에서 생성된 이후 일종의 JSON 형태로 클라이언트로 전달
- SSR로 생성되는 경우와 달리 하이드레이션 단계 생략(하이드레이션은 서버에서 생성된 HTML 코드를 동적으로 바꾸는 단계)
- 서버에서만 렌더링 되고 클라이언트로 전송되지 않는 컴포넌트
- 자바스크립트 번들 크기를 줄이는 데 기여
- 애플리캐이션의 로딩 시간 단축 가능

2. SSR
- 클라이언트의 요청에 따라 서버에서 HTML을 생성하여 클라이언트에 전달하는 방식
- 초기 초딩 속도 빠르며, SEO 최적화 유리
- 클라이언트가 페이지를 요청할 때마다 서버에서 HTML을 생성, 서버 부하 증가 가능성
- 데이터 패칭 후에 서버에서 HTML을 생성하고 클라이언트에 전송