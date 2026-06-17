# 난 너 가능해 — 신청폼 설정 가이드

## 파일 구조
```
nanni-form/
├── index.html            ← 신청 폼 메인 페이지
├── api/
│   ├── submit.js         ← Vercel 서버리스: 신청 저장
│   └── count.js          ← Vercel 서버리스: 신청자 수 조회
├── google-apps-script.js ← 구글 스크립트에 붙여넣을 코드
├── vercel.json           ← Vercel 설정
└── README.md
```

---

## Step 1. 구글 스프레드시트 + Apps Script 설정

1. **구글 스프레드시트 새로 만들기**
   - 시트 이름을 `신청자목록` 으로 변경

2. **Apps Script 열기**
   - 상단 메뉴 → 확장 프로그램 → Apps Script

3. **코드 붙여넣기**
   - `google-apps-script.js` 내용 전체 복사 → Apps Script 에디터에 붙여넣기
   - 저장 (Ctrl+S)

4. **웹 앱으로 배포**
   - 우측 상단 "배포" → "새 배포"
   - 유형: **웹 앱**
   - 다음 사용자로 실행: **나**
   - 액세스 권한: **모든 사용자** ← 반드시 이걸로!
   - "배포" 클릭
   - 뜨는 **웹 앱 URL 복사** (https://script.google.com/macros/s/.../exec)

---

## Step 2. GitHub에 올리기

```bash
git init
git add .
git commit -m "초기 신청폼"
git remote add origin https://github.com/YOUR_USERNAME/nanni-form.git
git push -u origin main
```

---

## Step 3. Vercel 배포

1. vercel.com → Import Project → GitHub 저장소 선택
2. **Environment Variables** 추가:
   - Key: `GOOGLE_SCRIPT_URL`
   - Value: Step 1에서 복사한 웹 앱 URL
3. Deploy!

---

## Step 4. index.html 수정

배포 완료 후 Vercel 도메인 확인 (예: `https://nanni-form.vercel.app`)

`index.html` 상단의:
```javascript
const API_BASE = '';
```
를 아래처럼 수정:
```javascript
const API_BASE = 'https://nanni-form.vercel.app';
```

다시 push하면 자동 재배포돼요!

---

## 신청자 확인 방법
구글 스프레드시트 열면 실시간으로 신청자 목록이 쌓여요 💜
