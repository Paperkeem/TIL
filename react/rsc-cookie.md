# RSC-Cookie

> 서버 컴포넌트는 서버에서 렌더링되고, 클라이언트로 전달되는 결과는 HTML 또는 RSC payload 입니다.

#### 1-1. 왜 서버 컴포넌트에서 fetch(/api/set-cookie) 하면 브라우저에 쿠키가 반영되지 않나요?

- 해당 fetch는 브라우저가 요청하는 것이 아니라, 서버가 서버에 요청하는 것이기 때문입니다.
- 서버 컴포넌트는 서버에서 실행됩니다.

> 쿠키는 "브라우저가 받는 응답"에 Set-Cookie가 있어야 저장됩니다.  
> 서버 → 서버 통신에는 브라우저가 개입하지 않기 때문에, 쿠키는 브라우저에 반영되지 않습니다.

#### 1-2. 서버 컴포넌트에서 서버 액션을 실행한 경우에는 어떻게 동작하나요?

> ✔️ 서버 액션으로 쿠키를 설정하더라도, 그 액션이 브라우저가 직접 요청한 경우에만 쿠키가 브라우저에 반영됩니다.
> ❌ 서버 컴포넌트에서 렌더링 중 실행하는 서버 액션 또한 쿠키를 브라우저에 전달하지 않습니다.

```javascript
// 서버 컴포넌트에서 호출
await fetch("https://myapp.com/api/set-cookie", { method: "POST" });
```

- 해당 요청은 브라우저가 아닌 Next.js 서버 내부에서 실행됩니다.
- 응답의 `Set-Cookie 헤더`는 서버로 돌아오고, 브라우저로 전달되지 않습니다.

> HTTP에서 쿠키는 서버 → 브라우저 응답 시 `Set-Cookie 헤더`로 전달되어야 브라우저에 전달됩니다.  
> 서버에서 서버로 요청하는 경우에는 브라우저는 전혀 관여하지 않습니다.

#### 2. 그럼 Middleware에서 설정한 쿠키는 브라우저에 반영되나요?

- Middleware는 브라우저가 요청을 보낼 때 중간에서 응답을 조작하기 때문에 쿠키가 브라우저에 반영됩니다.

🔹 Middleware 동작 흐름:

1. 브라우저가 /dashboard로 이동
2. Next.js의 middleware.ts가 이 요청을 가로챔
3. NextResponse.next()로 응답을 계속 넘기되, 여기에 Set-Cookie를 추가함
4. 브라우저는 최종 응답에 포함된 Set-Cookie를 수신하고 저장함

```javascript
// middleware.ts
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.cookies.set("test-cookie", "cookie-name", { path: "/" });
  return res;
}
```

#### 3. RSC에서 usePathname같은 훅에 접근 불가능한 이유

- usePathname() 같은 훅은 클라이언트 측 브라우저 정보 (window, location.pathname)에 의존하기 때문에, 서버 컴포넌트에서는 사용할 수 없습니다.
- 서버 컴포넌트는 브라우저가 렌더링되기 전에, Node.js 환경에서 실행되기 때문에 브라우저 객체가 존재하지 않습니다.
