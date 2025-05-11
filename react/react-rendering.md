# 리액트의 렌더링

> 리액트의 렌더링이란 컴포넌트의 상태나 속성이 변경될 때 UI를 다시 그리는 과정입니다.

#### 0. 바닐라 자바스크립트 vs 리액트 비교

1. 바닐라 자바스크립트

- DOM 업데이트 : 직접 DOM을 조작
- 렌더링 방식 : 변경이 발생될 때 마다 직접 수정
- 성능 최적화 : reflow & repaint 발생 가능

2. 리액트

- DOM 업데이트 : Virtual DOM을 사용
- 렌더링 방식 : reconciliation 과정 후 변경된 부분만 업데이트
- 성능 최적화 : reflow & repaint 최소화

#### 1. 리액트의 렌더링 단계

1. Render Phrase

- 리액트가 컴포넌트를 실행하고 새로운 Virtual DOM을 생성하는 과정
- 함수형 컴포넌트의 경우, 컴포넌트 함수가 호출되는 과정이 렌더링이라고 볼 수 있음
- useState, useMemo, useCallback 등을 평가
- return 값을 통해서 새로운 Virtual DOM을 생성

2. Reconciliation

- 기존 Virtual DOM과 새로운 Virtual DOM을 비교하는 단계 (diffing)
- 최소한의 변경만을 찾아서 DOM을 업데이트
- 이 과정은 React fiber라는 알고리즘을 통해 최적화 됨

3. Commit Phrase

- 변경 된 부분을 실제 DOM에 적용하는 단계
- 가상 DOM에서 계산된 결과를 실제 DOM에 적용하고, 변화된 UI를 브라우저에 렌더링
- DOM 업데이트 이후에 useEffect 같은 사이드 이펙트를 발생시키는 훅 실행

#### 2. useEffect의 Dependency 배열 비교 방식

> useEffect에서 Dependency 배열에 들어가는 값들은 얕은 비교를 통해 변경 여부를 판단하게 됩니다.

#### 3. useEffect는 리액트의 렌더링 과정 중 언제 실행될까?

> useEffect는 렌더링이 완료 된 이후(DOM 업데이트 후), Commit Phrase에서 실행됩니다.

#### 4. useEffect가 상태(state) 변경 후 한 번만 실행되는 이유

```javascript
useEffect(() => {
  console.log("✅ useEffect 실행");
}, [value]); // value가 변경될 때 실행
```

📌 위 코드에서 value가 변경될 때 컴포넌트가 다시 렌더링되지만, useEffect는 한 번만 실행됩니다.
→ useEffect가 두 번 실행되지 않는 이유는 무엇일까?

> useEffect는 렌더링 이후, deps 배열의 값이 이전과 변경되었을 때만 실행됩니다. 컴포넌트가 렌더링 되는 동안은 useEffect는 실행되지 않습니다.

#### 5. useState 상태 변경 시, 컴포넌트의 어떤 부분이 리렌더링될까?

```javascript
export default function Input() {
  const [value, setValue] = useState("");

  return (
    <>
      <div>{value}</div> {/* ✅ 상태값(value)을 참조 */}
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <div>일반 컴포넌트</div> {/* ✅ 재렌더링될까? */}
      <div>일반 텍스트</div> {/* ✅ 재렌더링될까? */}
    </>
  );
}
```

1. 상태 변경 시 리렌더링 되는 범위

- useState가 변경되면 컴포넌트 전체가 리렌더링 된다 → 모든 jsx가 다시 평가됨
- 하지만 DOM 업데이트는 실제 변경된 부분만 일어남(reconciliation)

```javascript
return (
  <>
    <div>{value}</div> {/* ✅ 변경됨 → Virtual DOM 비교 후 업데이트됨 */}
    <input value={value} onChange={(e) => setValue(e.target.value)} />
    <div>일반 컴포넌트</div> {/* ❌ 변하지 않음 → 업데이트 없음 */}
    <div>일반 텍스트</div> {/* ❌ 변하지 않음 → 업데이트 없음 */}
  </>
);
```

2. 실제 DOM 업데이트

- 컴포넌트가 전체 다시 실행
- 리액트는 새로운 Virtual DOM을 생성하고 기존 Virtual DOM과 비교(diffing)
- 변경된 부분만 실제 DOM에 업데이트(commit)

#### 6. useEffect 의 두번째 인자로 아무것도 보내지 않을시 무한 리렌더링에 빠지는 이유

> 리렌더링 → useEffect 실행 → 상태 변경 → 다시 리렌더링 → (...무한 반복)

1. useEffect는 렌더링 이후 실행됩니다.
2. 그 안에서 setState를 호출하면 컴포넌트가 다시 렌더링 됩니다.
3. 두번째 인자 없이 useEffect는 모든 렌더링마다 실행됩니다.
4. 무한 리렌더링이 일어납니다.

#### 7. 컴포넌트의 리렌더링, 마운트

1. 마운트

- 컴포넌트가 DOM에 처음 추가될 시 발생
- React 생명주기 중 useEffect(() => {}, [])가 실행되는 시점

2. 리렌더링

- 컴포넌트의 state나 props가 변경 됐을 때 발생

```javascript
const [count, setCount] = useState(0);
// 컴포넌트가 리렌더링 될 때마다 함수 재생성
const handleClick = () => setCount(count + 1);

return <button onClick={handleClick}>클릭: {count}</button>;
```

- React 함수형 컴포넌트는 함수 전체가 다시 실행되기 때문에, 컴포넌트가 리렌더링 될 때마다 모든 변수와 함수가 다시 선언됩니다.
- useEffect 내부에 있는 코드는 리렌더링마다 재생성되지만, 실행 여부는 두 번째 인자인 dependency array에 따라 달라집니다.

##### ✅ 왜 useEffect의 dependency가 []이면 마운트 시에만 실행될까?

```javascript
useEffect(() => {
  console.log("실행");
}, []);
```

- 첫번째 인자의 함수는 컴포넌트가 리렌더링될 때마다 다시 선언됩니다.
- React는 이 "새 함수"를 실행할지 말지를 두 번째 인자(dependency array)를 기준으로 결정합니다.

> React는 이전에 등록한 함수와 이번에 등록한 함수의 의존성(dependencies)을 비교해서 실행 여부를 판단합니다.

##### ✅ useEffect의 의존성 배열을 넘기지 않을 시?

> 의존성 배열을 넘기지 않을 경우에는 매 렌더링마다 호출

#### 8. useEffect의 dependency

```javascript
import { useCallback, useEffect, useRef } from "react";

export default function useIntersection(handler, options = {}) {
  const ref = useRef(null);

  const callback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) handler(entry, observer);
      });
    },
    [handler]
  );

  useEffect(() => {
    if (!ref.current) return;

    let observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [callback, options]); // 🔍 dependency 배열에 callback을 추가하지 않을 경우?

  return ref;
}
```

##### ❌ callback을 useEffect 디펜던시에 넣지 않은 경우 발생하는 문제

- useEffect 내부의 callback이 처음 마운트될 때의 handler만 기억합니다.
- 이후 handler가 업데이트되어도 callback 내부에서는 여전히 오래된 callback을 호출합니다.
- 최신 상태를 반영하지 못하는 클로저 문제(closure stale state issue) 가 발생할 수 있습니다.

#### 8. react의 Object.is

1. useState로 선언된 값들은 값을 변경해주면 레퍼런스(메모리 주소)가 변경됩니다.
2. useEffect의 dependency array에 들어가 있는 값들은 레퍼런스가 바뀌어야만 실행됩니다.

> 리액트에서 Object.is는 useState, 컴포넌트의 상태값이 변경되었을 때와 useEffect 내부의 dependency array에서 값이 변경되었는 지 검사할 때 주로 쓰입니다.  
> Object.is는 NaN과 NaN, +0과 -0을 비교할 수 있습니다.

#### 9. useEffect와 useLayoutEffect

1. useEffect
- 렌더링이 완료되는 시점에 비동기적으로 실행
- 데이터 페칭, 이벤트 리스너 추가 등 렌더링 후 화면에 영향주지 않는 작업에 주로 사용

2. useLayoutEffect
- 렌더링 후 DOM이 업데이트 되기 직전 동기적으로 실행
- 동기적으로 실행되기 때문에 렌더링에 영향을 줌
- 화면에 내용이 그려지기 전에 레이아웃 관련 작업이 완료
- DOM 조작과 같은 화면이 그려지기 전에 완료되어야 하는 작업에 useLayoutEffect를 사용
