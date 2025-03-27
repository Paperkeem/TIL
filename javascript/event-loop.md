# 자바스크립트의 이벤트 루프, 자바스크립트의 비동기 동작원리

#### 1. 여러 비동기 로직이 있을 때, 콘솔이 찍히는 순서를 설명하시오

> 자바스크립트의 이벤트루프는 싱글 스레드 기반으로 동작합니다. 비동기 코드(Promise, setTimeout 등)이 실행될때는 Web API 백그라운드로 보내지고, 이후 콜백 큐 혹은 마이크로태스트 큐에 들어가 이벤트 루프가 처리합니다.  
> 콜스택에서 일반적인 동기 코드는 즉시 실행되고, 비동기 코드는 이벤트 루프를 거쳐 실행됩니다.

1. setTimout / setInterval → 콜백 큐로 들어갑니다.
2. Promise, queueMicrotask, MutationObserver → 마이크로 태스트 큐에 들어갑니다.
3. requestAnimationFrame → 브라우저의 렌더링 단계에서 실행됩니다.

실행 순서는

1. 콜스택에서 동기 코드 실행
2. 이벤트 루프가 마이크로 태스트 큐를 실행
3. 이벤트 루프가 콜백 큐를 실행

#### 2. JavaScript에서 비동기 함수는 정확하게 3,000ms를 기다렸다가 실행이 되나요?

> 자바스크립트에서 setTimeout을 사용하여 실행시간을 3000ms로 설정하더라도 정확하게 3000ms 후에 실행된다는 보장이 없습니다. 이벤트 루프가 마이크로 태스트 큐를 먼저 실행하고, 콜백 큐에 있는 setTimeout 콜백 함수를 실행하기 때문에 오차가 있을 수 있습니다. 또한 콜스택이 비어있어야 콜백큐가 실행되기 때문에 동기 코드가 많다면 콜백 실행이 지연될 수 있습니다. 따라서 정확히 3000ms 후에 실행되는 것이 아니라 최소한 3000ms 이상 지연될 수 있습니다.

#### 3. 정확하게 3,000ms를 기다리는 방법은 무엇인가요?

> setInterval(1)과 Date.now()를 활용하면 정확한 3,000ms 실행을 보장할 수 있습니다.

```javascript
const startTime = Date.now();

const interval = setInterval(() => {
  const delay = Date.now() - startTime;
  if (delay >= 3000) {
    console.log("3000ms 지났습니다.");
    clearInterval(interval);
  }
}, 1);
```

#### 4. requestAnimationFrame 동작 원리

- requestAnimationFrame은 브라우저의 다음 리페인트 시점 이전에 지정한 콜백 함수를 실행하게 하는 API 입니다.
- 브라우저가 화면을 다시 그리기 직전에 콜백을 실행하고, 기본적으로 60fps 기준으로 약 16.6ms간격으로 실행됩니다. 주로 애니메이션 최적화, 스무스한 UI 렌더링을 위해 사용됩니다.
- requestAnimationFrame은 마이크로태스트 큐가 모두 실행되고 난 후 콜백 큐가 실행되기 전에 실행됩니다.

> requestAnimationFrame → 애니메이션, 스크롤, 차트, 슬라이더  
> setTimeout, setInterval → 일정 시간 후 실행, API polling
