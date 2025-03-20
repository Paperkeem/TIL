# 자바스크립트에서 함수를 선언하는 방법

1. 함수 선언식
   > 가장 기본적인 함수 선언 방식이며, function 키워드를 사용합니다.

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

- 호이스팅 가능 → 선언 전에 호출해도 실행 됨
- this는 호출 방식에 따라 결정됨, window 또는 undefined

2. 함수 표현식
   > 변수에 익명 함수를 할당하는 방식입니다.

```javascript
const greet = function (name) {
  return `Hello, ${name}!`;
};
```

- 호이스팅 불가능 → 선언 전에 호출하면 에러 발생
- this는 호출 컨텍스트에 따라 결정됨
- 콜백 함수로 자주 사용

3. 화살표 함수
   > 함수 표현식의 간단한 버전으로, => 문법을 사용합니다.

```javascript
const greet = (name) => `Hello, ${name}!`;
```

- this가 상위 스코프를 그대로 유지
- return 문 필요 없는 경우 중괄호 {} 생략 가능
- 익명 함수로 사용 가능

4. IIFE 즉시 실행 함수
   > 선언과 동시에 실행되는 함수입니다.

```javascript
(function (name) {
  console.log(`Hello, ${name}!`);
})("Paper");
```

- 실행 즉시 한번만 실행됨
- 전역 범위를 오염시키지 않음(변수를 내부에서만 사용 가능)
- 클로저와 함께 사용되어 데이터 은닉 가능

5. 생성자 함수
   > new Funtion()으로 함수를 동적으로 생성합니다.

```javascript
const add = new Function("a", "b", "return a + b");
```

- 문자열을 실행하는 방식이므로 보안상 권장되지 X

6. Method
   > 객체 안에 선언된 함수입니다.

```javascript
const user = {
  name: "Paper",
  greet() {
    return `Hello, ${this.name}!`;
  },
};
```

- 객체의 속성으로 정의됨
- this가 해당 객체를 가르킴
