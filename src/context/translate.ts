import { Language, type TLanguage } from "./LanguageProvider";

export const translate: Record<
  TLanguage,
  {
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    login: string;
    googleLogin: string;
    signup: string;
    changePassword: string;
    signupHeader: string;
    beforeVerify: string;
    afterVerify: string;
    comfirmPassword: string;
    TosAgreed: string;
    nextButton: string;

    emailVerifiedToast: string;
    emailErrorToast: string;
    pwConditionToast: string;
    pwValidToast: string;
    pwConfirmedToast: string;
    pwNotConfirmedToast: string;

    modaltabtitle_total: string;
    modaltabtitle_likes: string;
    titleStyle_FREE: string;
    titleStyle_QUESTION: string;
    visibility_PUBLIC: string;
    visibility_FRIEND: string;
    visibility_PRIVATE: string;
    commentPermission_PUBLIC: string;
    commentPermission_FRIEND: string;
    commentPermission_PRIVATE: string;
    enrollButtonText: string;
    refreshButtonText: string;
    questionGeneratorButtonText: string;
    titleInputPlaceholder: string;
    createNewDiary: string;
    alertImage: string;
    receivedCorrections: string;
    givenCorrections: string;
    writingHeader: string;
    notificationHeader: string;
    allReadInNotification: string;
    notificationButtonText1: string;
    notificationButtonText2: string;
    Diaries: string;
    Diary: string;
    CountDiary?: string;
    Friends: string;
    Friend: string;
    CountFriend?: string;
    ContentNotification: string;
    LoadingNotification: string;
    EditDiary: string;
    DeleteDiary: string;
    CannotLoadList: string;
    titleRequired: string;
  }
> = {
  [Language.ENGLISH]: {
    email: "Email",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    login: "Login",
    googleLogin: "Start with Google",
    signup: "Sign-up",
    changePassword: "Forgot password?",
    signupHeader: "Enter your information to create an account",
    beforeVerify: "Verify",
    afterVerify: "Verified",
    comfirmPassword: "Confirm Password",
    TosAgreed: "I agree to the Terms of Service and Privacy Policy",
    nextButton: "Next",
    emailVerifiedToast: "Your email has verified",
    emailErrorToast: "Cannot send verification email to that address",
    pwConditionToast: "At least 8 characters, including uppercase, lowercase, and a number.",
    pwValidToast: "Passwords are valid",
    pwConfirmedToast: "Passwords match",
    pwNotConfirmedToast: "Passwords do not match",
    modaltabtitle_total: "Total",
    modaltabtitle_likes: "Likes",
    titleStyle_FREE: "FREE",
    titleStyle_QUESTION: "QUESTION",
    visibility_PUBLIC: "PUBLIC",
    visibility_FRIEND: "FRIEND",
    visibility_PRIVATE: "PRIVATE",
    commentPermission_PUBLIC: "PUBLIC",
    commentPermission_FRIEND: "FRIEND",
    commentPermission_PRIVATE: "PRIVATE",
    enrollButtonText: "ENROLL",
    refreshButtonText: "REFRESH",
    questionGeneratorButtonText: "Generate Question",
    titleInputPlaceholder: "Put in title",
    createNewDiary: "New Diary",
    alertImage: "Alert",
    receivedCorrections: "Received",
    givenCorrections: "Given",
    writingHeader: "New Post",
    notificationHeader: "Notifications",
    allReadInNotification: "Mark all as read",
    notificationButtonText1: "Accept",
    notificationButtonText2: "Delete",
    Diaries: "Entries",
    Diary: "Entry",
    CountDiary: "",
    Friends: "Friends",
    Friend: "Friend",
    CountFriend: "",
    ContentNotification: "No new notifications.",
    LoadingNotification: "Loading notifications...",
    EditDiary: "Edit",
    DeleteDiary: "Delete",
    CannotLoadList: "Unable to load list.",
    titleRequired: "Please enter a title.",
  },
  [Language.KOREAN]: {
    email: "이메일",
    emailPlaceholder: "이메일을 입력해주세요",
    password: "비밀번호",
    passwordPlaceholder: "비밀번호를 입력해주세요",
    login: "로그인",
    googleLogin: "Google 로 시작하기",
    signup: "회원가입",
    changePassword: "비밀번호 변경",
    signupHeader: "계정 생성을 위해 정보를 입력해주세요",
    beforeVerify: "인증하기",
    afterVerify: "인증완료",
    comfirmPassword: "비밀번호 확인",
    TosAgreed: "이용약관 및 개인정보 처리 방침에 동의합니다",
    nextButton: "다음으로",
    emailVerifiedToast: "인증되었습니다",
    emailErrorToast: "입력하신 이메일로 인증 메일을 보낼 수 없습니다",
    pwConditionToast: "8자 이상, 대소문자, 숫자 포함",
    pwValidToast: "유효한 비밀번호입니다",
    pwConfirmedToast: "비밀번호가 일치합니다",
    pwNotConfirmedToast: "비밀번호가 일치하지 않습니다",
    modaltabtitle_total: "모두",
    modaltabtitle_likes: "좋아요",
    titleStyle_FREE: "자유글",
    titleStyle_QUESTION: "질문글",
    visibility_PUBLIC: "공개",
    visibility_FRIEND: "친구공개",
    visibility_PRIVATE: "비공개",
    commentPermission_PUBLIC: "전체허용",
    commentPermission_FRIEND: "친구허용",
    commentPermission_PRIVATE: "비공개",
    enrollButtonText: "등록하기",
    refreshButtonText: "새로고침",
    questionGeneratorButtonText: "질문 생성하기",
    titleInputPlaceholder: "제목을 입력하세요.",
    createNewDiary: "새 글 쓰기",
    alertImage: "알림",
    receivedCorrections: "내가 받은 교정",
    givenCorrections: "내가 제공한 교정",
    writingHeader: "글쓰기",
    notificationHeader: "알림",
    allReadInNotification: "모두 읽음",
    notificationButtonText1: "수락",
    notificationButtonText2: "거절",
    Diaries: "다이어리",
    Diary: "다이어리",
    CountDiary: "개",
    Friends: "친구",
    Friend: "친구",
    CountFriend: "명",
    ContentNotification: "새로운 알림이 없습니다",
    LoadingNotification: "알림을 불러오는 중...",
    EditDiary: "수정하기",
    DeleteDiary: "삭제하기",
    CannotLoadList: "목록을 불러올 수 없습니다.",
    titleRequired: "제목을 작성하세요.",
  },
};
