# 📖 LXD(Language Xchange Diary): 외국어 학습을 위한 언어교환일기

> **"외국어 작문 학습자를 위한 교류형 다이어리 웹 플랫폼"**  
> React + TypeScript + Vite 기반의 SNS형 다이어리 서비스


## 🌏 Service Overview

 **외국어 작문 학습자를 위한 교류형 다이어리 웹 플랫폼**

🌟 **SERVICE GOALS**
- 외국어로 일기를 작성하고 수정하며 작문 실력 향상
- 전 세계 유저와의 상호작용(교정, 댓글)을 통한 학습 동기 유지
- 다른 문화권의 일상생활 간접 경험


  
## ✨ Key Features

### 1. **사용자 간 커뮤니케이션**
- **반응 남기기**  
  댓글을 달고, ‘좋아요’를 눌러 타인의 일기에 반응
- **친구 맺기**  
  친구 신청을 통해 더 많은 일기를 열람하고, 더 자주 소통

### 2. **상호 학습 지원**
- **상호 교정**  
  모국어로 작성된 상대방의 일기에 교정을 제공해 서로의 학습을 지원
- **피드백**  
  교정에 댓글을 달아 추가 질문 및 답변 가능

### 3. **저장과 기록을 통한 학습 지속**
- **교정 저장**  
  ‘좋아요’한 교정은 자동 저장! ‘나의 교정’ 페이지에서 모아보기
- **메모 작성**  
  저장한 교정에 메모를 추가해 나만의 방식으로 이해



## 👥 Frontend Members

| Name     | Role               |
|----------|--------------------|
| 김민주   | Frontend Developer |
| 이채윤   | Frontend Developer |
| 정연욱   | Frontend Developer |
| 최석훈   | Frontend Developer |



## 🚀 Tech Stack

| Category | Stack |
|----------|-------|
| **Frontend Framework** | [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Routing** | [React Router DOM](https://reactrouter.com/) |
| **State Management & Data Fetching** | React Query, Custom Hooks |
| **HTTP Client** | Axios |
| **Lint & Format** | ESLint, Prettier |



## 📦 Installed Libraries

- react-router-dom
- lucide-react
- axios
- react-quill
- react-intersection-observer



## 📂 Project Structure

```plaintext
src
 ├── apis/                         # Axios instance 및 API 호출 함수
 ├── assets/                       # 정적 리소스 (이미지, 아이콘 등)
 ├── components/                   # UI 컴포넌트
 │   ├── Common/                   # 공통 컴포넌트 (모달, 버튼, 아바타 등)
 │   ├── ComponentDiary/           # 다이어리 공통 컴포넌트
 │   ├── Corrections/               # 교정 관련 UI 컴포넌트
 │   ├── Diary/                    # 다이어리 관련 UI
 │   │   ├── Tabs/                 # 다이어리 내부 탭 컴포넌트
 │   │   └── Writing/               # 일기 작성 관련 컴포넌트
 │   ├── Feed/                     # 피드 페이지 관련 컴포넌트
 │   │   └── Tabs/                 # 피드 내부 탭 컴포넌트
 │   ├── Friends/                  # 친구 목록/프로필 관련 UI
 │   │   ├── Skeleton/             # 로딩 스켈레톤 컴포넌트
 │   │   └── Tabs/                 # 친구 관련 탭 컴포넌트
 │   └── Login/                    # 로그인/회원가입 관련 UI
 ├── context/                      # Context API (언어 설정 등)
 ├── hooks/                        # Custom Hooks
 │   ├── mutations/                # 데이터 변경 관련 훅
 │   │   ├── CorrectionComment/    # 교정 댓글 API 훅
 │   │   ├── CorrectionLike/       # 교정 좋아요 API 훅
 │   │   ├── DiaryComment/         # 일기 댓글 API 훅
 │   │   └── ...                   # 일기 삭제, 교정 등록 등 기타 훅
 │   ├── queries/                  # 데이터 조회 관련 훅
 │   └── ...                       # 기타 공용 훅 (useAuth, useOutsideClick 등)
 ├── layouts/                      # 레이아웃 컴포넌트
 ├── pages/                        # 페이지 컴포넌트
 │   ├── Corrections/              # 교정 페이지
 │   ├── Diary/                    # 다이어리 페이지
 │   ├── Etc/                      # 기타 페이지 (NotFound 등)
 │   ├── Feed/                     # 피드 페이지
 │   ├── Friends/                  # 친구 페이지
 │   ├── Login/                    # 로그인/회원가입 페이지
 │   └── Navbar/                   # 네비게이션 관련 페이지
 ├── utils/                        # 유틸 함수, 타입 정의
 ├── index.css                     # 전역 스타일
 └── main.tsx                      # 앱 진입점

```


## 📜 Commit Types

| 커밋 유형          | 의미                                                         |
| ------------------ | ------------------------------------------------------------ |
| `Feat`             | 새로운 기능 추가                                             |
| `Fix`              | 버그 수정                                                    |
| `Docs`             | 문서 수정                                                    |
| `Style`            | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| `Refactor`         | 코드 리팩토링                                                |
| `Test`             | 테스트 코드, 리팩토링 테스트 코드 추가                       |
| `Chore`            | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore           |
| `Design`           | CSS 등 사용자 UI 디자인 변경                                 |
| `Comment`          | 필요한 주석 추가 및 변경                                     |
| `Rename`           | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우          |
| `Remove`           | 파일을 삭제하는 작업만 수행한 경우                           |
| `!BREAKING CHANGE` | 커다란 API 변경의 경우                                       |
| `!HOTFIX`          | 급하게 치명적인 버그를 고쳐야 하는 경우                      |
