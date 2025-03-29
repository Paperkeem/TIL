# 패키지 매니저 비교

#### 1. npm

- 개발사 : Node.js
- 속도 : 보통
- 설치 구조 : node_modules 깊게 중첩
- 캐시 방식 : 기본 캐시
- Disk 사용량 : 큰편
- 속성 관리 파일 : packge-lock.json
- 명령어 호환성 : 표준
- Plug'n'Play (PnP) : 없음

#### 2. yarn

- 개발사 : Meta
- 속도 : 빠름(v1), 매우 빠름(v3)
- 설치 구조 : node_modules 사용 or PnP
- 캐시 방식 : offline mirror 지원, 네트워크가 끊겨도 캐시에 저장된 패키지를 통해 설치가 가능한 오프라인 설치 기능
- Disk 사용량 : 중간
- 속성 관리 파일 : yarn.lock, .yarnrc.yml
- 명령어 호환성 : yarn 명령만 지원
- Plug'n'Play (PnP) : Yarn 2+에서 제공

#### 3. pnpm

> pnpm의 하드링크 캐시란 ~/.pnpm-store에 패키지를 한 번 저장하여  
> 하나의 실제 파일을 여러 위치의 하드링크와 연결해서 디스크 공간을 아끼는 방식

- 개발사 : 독립 오픈소스
- 속도 : 가장 빠름(하드 링크 기반)
- 설치 구조 : 하드링크 캐시로 node_modules 최소화
- 캐시 방식 : 글로벌 저장소 + 하드링크
- Disk 사용량 : 최소 사용(하드 링크)
- 속성 관리 파일 : pnpm-lock.yaml, .npmrc
- 명령어 호환성 : npm과 대부분 호환
- Plug'n'Play (PnP) : 없음

#### 4. Plug'n'Play (PnP)란?

> node_modules 폴더 없이, 의존성 모듈을 직접 참소하는 방식(Yarn 2+만 지원)

- 모든 패키지는 .yarn/cache 아래 .zip 형태로 저장됨
- 실행 시 모든 필요 모듈을 런타임에서 zip파일에서 직접 로딩
- 빠르고 보안성이 높아지지만 일부 webpack, eslint 등 호환 이슈 생길 수 있음

#### 5. yarn beey(v2+) Zero-Install 적용 시 버전관리 방식

> Zero Install이란, node_module 없이도 git clone만 하면 바로 실행 가능한 프로젝트 구조를 만드는 전략  
> .yarn/cache 안에 모든 의존성의 .zip 파일 저장

1. .yarnrc.yml에 버전 경로를 명시

```bash
yarnPath: .yarn/releases/yarn-3.2.4.cjs
```

- 팀원이 동일한 Yarn 버전을 사용하게 합니다.

2. 개발 환경이 바뀌었을 때

```bash
yarn add react@18
```

- yarn.lock → 의존성 버전 정보 반영
- .yarn/cache → 새로운 zip 파일 추가
- .pnp.cjs → 경로 매핑 정보 반영(PnP 사용 시)

> 변경 된 파일을 모두 커밋해야 동일한 환경 구성 가능
