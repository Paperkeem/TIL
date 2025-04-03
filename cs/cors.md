# CORS (Cross-Origin Resource Sharing)

#### 1. CORS의 정의

> CORS는 웹 브라우저에서 다른 오리진으로부터의 리소스 요청을 제어하는 보안 정책입니다. 기본적으로 웹 브라우저는 보안상의 이유로 다른 오리진의 리소스에 대한 요청을 제한합니다.

#### 2. HTTP 요청 메소드

> CORS를 확인하기 위해 브라우저는 사전 요청을 보낼 수 있습니다. 이 사전 요청은 OPTION 메소드를 사용하여 서버에 보내지며, 서버가 특성 HTTP 메소드에 대한 요청을 허용하는 지 
확인합니다.

#### 3. CORS의 "Simple Request"

> 특정 조건을 만족하는 HTTP 요청을 의미합니다. 이런 요청은 사전 요청을 필요하지 않으며 브라우저가 직접 서버에 요청을 보낼 수 있습니다. 

1. HTTP 메소드: 요청이 다음의 HTTP 메소드 중 하나여야 합니다:

- GET
- POST
- HEAD

2. 헤더: 요청에 포함될 수 있는 헤더는 다음과 같은 제한이 있습니다:

- Accept
- Accept-Language
- Content-Language
- Content-Type (단, application/x-www-form-urlencoded, multipart/form-data, text/plain 중 하나여야 함)
- DNT
- If-Modified-Since
- Range
- User-Agent
- X-Requested-With

3. Content-Type: Content-Type 헤더가 포함될 경우, 위에서 언급한 세 가지 타입 중 하나여야 합니다.

> 이러한 조건을 만족하는 요청은 "Simple Request"로 간주되며 브라우저는 사전 요청을 보내지 않고 직접 요청을 서버에 보냅니다.