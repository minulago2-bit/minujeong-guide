# 미누정 게스트 가이드

미누정 한옥 객실용 게스트 가이드입니다. 휴대폰, PC, 그리고 객실의 LG 스탠바이미(webOS 터치스크린 TV)에서 같은 주소로 열립니다.

- 공개 주소: https://minulago2-bit.github.io/minujeong-guide/
- 지원 언어: 한국어 · English · 日本語 · 中文(간체). 번역이 비어 있으면 영어로 표시됩니다.

## 파일 구조

```
index.html              화면과 동작 (디자인·코드)
data/                   콘텐츠 — 호스트가 고치는 곳
  settings.json         와이파이, 연락처, 체크아웃 시간, 후기 링크, 대기화면 시간 등
  ui.json               버튼·안내 문구 (언어별)
  menu.json             홈 메뉴 5개
  items.json            각 메뉴 안의 항목
  idle.json             TV 대기화면 슬라이드
  welcome.json          환영 화면 문구
  images.json           사진 주소
  music.json            배경음악 목록·크레딧
audio/                  배경음악 파일 (mp3)
icons/                  홈 화면 아이콘
manifest.webmanifest    홈 화면 추가(PWA) 정보
sw.js                   오프라인 캐시
webos/                  (선택) webOS 앱 패키지 파일
```

## 콘텐츠 수정 방법

코드를 몰라도 `data/` 폴더의 JSON 파일만 고치면 됩니다. GitHub 웹사이트에서 파일을 열고 연필 아이콘(Edit)으로 고친 뒤 **Commit changes**를 누르면 1~2분 뒤 사이트에 반영됩니다.

### 자주 고치는 값 — `data/settings.json`

| key | 내용 | 예 |
|---|---|---|
| `wifi_name`, `wifi_pw` | 와이파이 이름/비밀번호. 채우면 TV에 접속용 QR, 휴대폰에 복사 버튼이 생깁니다 | `MinuJeong_5G` |
| `host_phone` | 호스트 전화 | `010-0000-0000` |
| `host_kakao` | 카카오톡 ID (본문 표시용) | `@minujeong` |
| `host_kakao_url` | 카카오톡 채널/오픈채팅 링크 (버튼) | `https://pf.kakao.com/_xxxx` |
| `host_whatsapp` | WhatsApp 번호, 국가번호 포함 숫자만 | `821012345678` |
| `checkout_time` | 체크아웃 시간 | `11:00` |
| `review_url` | 후기 링크 (체크아웃 화면) | `https://...` |
| `site_url` | 가이드 공개 주소 (TV의 "휴대폰에서 보기" QR) | |
| `idle_seconds` | TV에서 조작이 없을 때 대기화면까지 시간(초) | `120` |

`value`만 고치고 `key`는 그대로 두세요.

### 항목 고치기 — `data/items.json`

각 항목은 아래 모양입니다. 언어마다 `_ko`, `_en`, `_ja`, `_zh`가 붙습니다. (`//` 뒤는 설명이니 실제 파일에는 쓰지 마세요. 아래 음원 예시도 같습니다.)

```json
{
  "id": "guide_02",          // 바꾸지 않는 고유 이름
  "menu": "guide",           // guide / eat / course / culture / care
  "order": "2",              // 작은 숫자가 위
  "show": "Y",               // N 이면 숨김
  "type": "일반",            // 일반 / 그룹(소제목) / 긴급번호
  "title_ko": "온돌 난방",
  "body_ko": "바닥 난방은 …",  // 줄바꿈은 \n
  "url": ""                   // 링크 (TV에서는 QR, 휴대폰에서는 버튼)
}
```

- 본문에 `{{wifi_name}}`처럼 쓰면 `settings.json`의 값이 들어갑니다.
- `[호스트 입력]`은 아직 채우지 않은 자리입니다. 화면에 강조되어 보이니 실제 내용으로 바꿔 주세요.
- `type: "그룹"`은 이용 안내의 소제목(머무는 동안, 한옥 생활 …)입니다. 제목만 씁니다.
- `type: "긴급번호"`는 병원·긴급 화면 왼쪽(휴대폰은 상단)에 고정됩니다.
- 추가 칸 (선택)
  - `"action": "wifi" | "contact" | "checkout"`: 와이파이 QR/복사, 연락 버튼, 체크아웃 화면 버튼
  - `"checklist": "Y"`: 체크아웃 화면 체크리스트에 포함
  - `"langs": "en,ja,zh"`: 병원의 외국어 진료 가능 언어 표시

### JSON을 잘못 고쳤을 때

쉼표 하나가 빠지는 등 파일이 깨져도 사이트는 멈추지 않습니다. 그 파일만 마지막으로 정상이던 사본을 쓰고, 그것도 없으면 긴급번호와 택시 주소만이라도 보여 줍니다. 고친 뒤 화면이 그대로라면 [jsonlint.com](https://jsonlint.com)에 내용을 붙여 넣어 오류 위치를 확인하세요.

### 홈 메뉴 — `data/menu.json`

휴대폰에서는 목록, TV·PC·태블릿에서는 카드로 보입니다. 카드 아이콘은 `icon` 값으로 고릅니다: `book`, `bowl`, `pin`, `house`, `plus`, `door`, `train`, `info` (비우면 아이콘 없음).

### 환영 화면 — `data/welcome.json`

게스트 이름이 있을 때(`?guest=` 또는 로고 5번 탭 → 투숙객 설정) 처음 한 번 보이며, 오른쪽 위에서 언어를 바꿀 수 있습니다. 언어마다 `eyebrow`(작은 머리말), `greeting`(`{n}` 자리에 이름), `sub`(안내, 줄바꿈 `
`), `button`, `hint`(TV에서만 보이는 조작 안내)를 고칩니다.

### 사진

`data/images.json`의 `url`에 `https://` 주소나 저장소 안의 경로(`photos/idle_1.jpg`)를 넣습니다. 대기화면 사진(`idle_1`~`idle_4`)을 넣으면 TV 대기화면이 사진 슬라이드쇼가 됩니다.

### Google 시트로 관리하고 싶을 때 (기존 방식)

주소에 `?sheet=시트ID`를 붙이면 `data/` 대신 Google 시트(탭: 설정 / UI문구 / 메뉴 / 항목 / 대기화면 / 환영인사 / 이미지)를 읽습니다. 시트의 열 이름은 JSON의 칸 이름과 같습니다.

## 배경음악 교체 방법

1. 로열티프리 음원(mp3)을 `audio/` 폴더에 올립니다. 파일 이름은 영문·숫자·`-`만 쓰세요. 예: `audio/morning-gayageum.mp3`
2. `data/music.json`의 `tracks`를 고칩니다.

```json
{
  "settings": {
    "order": "sequential",      // sequential(순서대로) / shuffle(섞기)
    "volume": 0.4,              // 0 ~ 1
    "tv_autoplay": "Y",         // TV에서 첫 터치 후 자동 재생
    "mobile_default": "off",    // 휴대폰·PC 기본값
    "react_lines": "Y"          // 하단 세로 선이 소리에 맞춰 살짝 움직임
  },
  "tracks": [
    { "file": "audio/morning-gayageum.mp3", "show": "Y",
      "title": "곡 제목", "artist": "작곡가", "license": "CC BY 4.0", "source": "https://출처" }
  ]
}
```

3. `title`·`artist`·`license`는 이용 안내 화면 맨 아래 크레딧에 표시됩니다. 라이선스가 출처 표기를 요구하면 꼭 채우세요.
4. 개발용 `placeholder-1.mp3`, `placeholder-2.mp3`는 지워도 됩니다(목록에서도 빼세요).
5. `sw.js` 맨 위의 `VERSION`을 `mj-v2`처럼 올리면 기존 기기도 새 파일을 받습니다.

- 브라우저 정책상 TV에서도 첫 터치나 리모컨 입력이 있어야 재생이 시작됩니다.
- 상단 `♪`로 켜고 끄며, 선택은 그 기기에 기억됩니다.

## TV(LG 스탠바이미)에서 여는 방법

### 기본: 웹브라우저

1. 스탠바이미 홈에서 **웹 브라우저**를 엽니다.
2. `https://minulago2-bit.github.io/minujeong-guide/` 를 열고 북마크하거나 홈 화면에 고정합니다.
3. webOS 브라우저는 자동으로 TV 모드가 됩니다. 인식이 안 되면 주소 끝에 `?tv=1`을 붙이세요.

### 주소 옵션

| 옵션 | 뜻 |
|---|---|
| `?tv=1` / `?tv=0` | TV 모드 강제 켜기 / 끄기 |
| `?lang=en` | 처음 언어 (ko / en / ja / zh) |
| `?guest=Alex` | 처음 열 때 환영 화면("Alex님, 반갑습니다!")을 보여 주고, 홈 인사말에도 이름 표시 |

옵션은 `&`로 이을 수 있습니다: `…/minujeong-guide/?tv=1&lang=ja&guest=Sato`

### TV 모드에서 달라지는 점

- 같은 화면 구성을 글자 30px, 터치 영역 72px 이상으로 키워 보여 줍니다.
- 지도·연락처·후기 링크는 QR로 띄워 휴대폰으로 열게 합니다. 와이파이는 접속용 QR을 크게 보여 줍니다.
- 홈 오른쪽 아래에 "휴대폰에서 보기" QR이 표시됩니다.
- 조작이 없으면 대기화면이 나오고, 터치나 리모컨 입력 시 돌아옵니다.
- 리모컨
  - 방향키: 항목 사이 이동
  - 확인: 선택
  - 뒤로(←): 열린 창 닫기 → 홈으로

### 선택: webOS 앱(IPK)으로 설치

브라우저 대신 앱 목록에 아이콘으로 두고 싶을 때 씁니다. `webos/` 폴더는 GitHub Pages의 가이드를 TV 모드로 여는 작은 앱입니다.

1. PC에 webOS CLI를 설치합니다: `npm install -g @webos-tools/cli`
2. TV에서 LG Content Store의 **Developer Mode** 앱을 설치하고 개발자 모드를 켭니다(LG 개발자 계정 필요).
3. PC에 TV를 등록합니다: `ares-setup-device` (TV IP와 Developer Mode 앱의 Passphrase 입력)
4. 패키징과 설치:

```bash
ares-package webos
```

```bash
ares-install --device tv com.minujeong.guide_1.0.0_all.ipk
```

```bash
ares-launch --device tv com.minujeong.guide
```

- 개발자 모드는 일정 기간마다 Developer Mode 앱에서 연장해야 합니다. 그래서 평소에는 웹브라우저 방식을 권합니다.
- 가이드 주소가 바뀌면 `webos/index.html`의 주소 한 줄을 고칩니다.

## GitHub Pages 배포

1. 저장소 **Settings → Pages**로 갑니다.
2. Source를 **Deploy from a branch**, Branch를 `main` / `(root)`로 두고 저장합니다.
3. `main`에 올라간 내용이 1~2분 뒤 공개 주소에 반영됩니다.

작업 브랜치(예: `feature/tv-standbyme`)는 확인을 마친 뒤 Pull Request로 `main`에 합칩니다.

## 오프라인과 홈 화면 추가

- 한 번 연 기기는 인터넷이 끊겨도 메뉴, 이용 안내, 긴급번호를 볼 수 있습니다.
- 휴대폰에서 "홈 화면에 추가"하면 앱처럼 열립니다.

## 호환성 메모

- 대상: webOS TV 브라우저(Chromium 79/87 계열), 최신 iOS·Android·PC 브라우저.
- `color-mix()`, `inset`, `aspect-ratio`를 지원하지 않는 브라우저에는 미리 계산한 값으로 대체 규칙이 적용됩니다. 최신 브라우저의 모습은 바뀌지 않습니다.
- 기기 구분은 화면 크기와 입력 방식(`pointer`, `hover`)으로 하고, webOS 사용자 에이전트를 보조로 씁니다.
