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
