# React 19

#### 1. React 19 주요 변화

- React 19에서는 코드 작성량을 줄이는데 중점을 두어, 새로운 컴파일러를 통해 기존 코드에서 수동으로 처리했던 useCallback, useMemo, memo와 같은 API를 더 이상 사용할 필요가 없습니다.

-  `use`훅은 비동기적으로 다양한 자원을 로드할 수 있게 하여, useEffect, useContext를 대체할 수 있습니다.
    - 비동기 데이터 페칭 가능
    - context를 비동기적으로 불러오는 부분 대체 가능

- 자식 컴포넌트에 ref prop을 사용할 때 fowardRef를 사용하지 않고 바로 ref 속성으로 사용이 가능합니다. 
