# Javascript module

#### 1. 자바스크립트에서 모듈을 불러오는 여러 가지 방법이 있는데, 각각이 가진 특징을 비교하여 설명하시오

1. CJS(CommonJS)

- CJS는 NodeJS에서 지원하는 모듈 시스템입니다.
- 모듈을 동기적으로 불러오기 때문에 파일이 크거나 네트워크 지연이 발생하면 로딩 속도가 느려질 수 있습니다.
- require을 통해 동기적으로 불러오고, 내보낼 때는 module.exports를 사용합니다.

2. AMD(Asynchronous Module Definition)

- NodeJS가 아닌 브라우저 환경에 적합한 모듈 시스템의 필요성이 커지며 AMD가 등장했습니다.
- 비동기적으로 모듈을 로드하는 방식으로 브라우저 환경에서 사용하기 위해 개발되었습니다.
- 모듈을 불러올 때는 require, 내보낼 때는 define을 이용합니다.

3. UMD(Universal Module Definition)

- CJS와 AMD를 모두 지원하는 모듈 시스템입니다.
- Node.js와 브라우저 환경 모두에서 동작 가능하도록 설계되었습니다.

4. ESM(ECMAScript Modules)

- ESM은 ECMAScript에서 지정한 표준 모듈 시스템 입니다.
- import/export 문법을 사용하며 정적 분석이 가능합니다.
- 비동기적으로 실행되며, 트리셰이킹이 가능하여 사용되지 않는 코드가 번들에서 제거됩니다.
