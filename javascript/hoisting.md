# 자바스크립트 호이스팅

> 호이스팅은 자바스크립트가 코드를 실행하기 전에 변수와 함수 선언이 코드의 최상단으로 끌어올리는 것처럼 동작하는 특징입니다.

- 함수 선언식은 함수 자체가 호이스팅 되므로 함수 선언 이전에 호출이 가능합니다.
- var로 선언된 변수는 선언과 초기화가 끌어올려지므로 값 할당이 이루어지기 전까지 undefined로 평가됩니다.
- let과 const는 TDZ가 존재하며, 변수의 선언은 호이스팅 되지만 초기화되지 않습니다. 
    - Temporal Dead Zone(TDZ)은 변수가 선언되었지만 초기화 되기 전까지의 구간을 말합니다.
    - 초기화 전에 접근하면 ReferenceError가 발생합니다.

#### 1. 자바스크립트에서 호이스팅이 가능한 이유

> 자바스크립트 엔진이 코드를 실행하기 전 컴파일 단계에서 함수, 변수 선언한 코드를 파악하고 메모리에 할당하기 때문입니다. 이 때문에 실제 코드에서 선언된 위치보다 앞선 접근이 가능해집니다. 
