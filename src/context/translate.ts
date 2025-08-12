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
    profileHeader: string;
    addPhoto: string;
    id: string;
    idPlaceholder: string;
    idCheck: string;
    idConditionToast: string;
    idAvaliableToast: string;
    idNotAvaliableToast: string;
    nickname: string;
    nicknamePlaceholder: string;
    nicknameConditionToast: string;
    primaryLang: string;
    learningLang: string;
    langPlaceholder: string;
    signupButton: string;
    loginSuccessAlert: string;
    loginErrorAlert: string;
    emailLinkSuccessAlert: string;
    emailLinkErrorAlert: string;
    emailVerifySuccessAlert: string;
    emailVerifyErrorAlert: string;
    signupSuccessAlert: string;
    signupErrorAlert: string;
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
    FriendFeedX: string;
    settingTitle: string;
    SaveChange: string;
    setLanguage: string;
    nativeLanguage: string;
    studyLanguage: string;
    systemLanguage: string;
    SidebarFeed: string;
    SidebarDiary: string;
    SidebarCorrections: string;
    SidebarFriends: string;
    SidebarSettings: string;
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
    pwConditionToast:
      "At least 8 characters, including uppercase, lowercase, and a number.",
    pwValidToast: "Passwords are valid",
    pwConfirmedToast: "Passwords match",
    pwNotConfirmedToast: "Passwords do not match",
    profileHeader: "Enter the information to create your profile",
    addPhoto: "Add Photo",
    id: "ID",
    idPlaceholder: "Enter your ID",
    idCheck: "Check",
    idConditionToast:
      "At least 2 characters, you can only use lowercase, numbers, and symbols(-._).",
    idAvaliableToast: "ID is avaliable.",
    idNotAvaliableToast: "ID is already in use.",
    nickname: "Nickname",
    nicknamePlaceholder: "Enter your nickname",
    nicknameConditionToast: "Maximum 20 characters",
    primaryLang: "Primary Language",
    learningLang: "Learning Language",
    langPlaceholder: "Select Language",
    signupButton: "Sign Up",
    loginSuccessAlert: "Login Complete.",
    loginErrorAlert: "Login Error. Please try it again.",
    emailLinkSuccessAlert:
      "An authentication link has been sent to the email you provided. Please click the link to complete the authentication.",
    emailLinkErrorAlert: "Failed to send verification email. Please try it again.",
    emailVerifySuccessAlert: "Verified.",
    emailVerifyErrorAlert: "Verification Error. Please try it again.",
    signupSuccessAlert: "Signup Complete! You can now log in to your account.",
    signupErrorAlert: "Signup Error. Please try it again.",
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
    FriendFeedX: "There is not friend's diary.",
    settingTitle: "Settings",
    SaveChange: "Save Change",
    setLanguage: "Language Setting",
    nativeLanguage: "Native Language",
    studyLanguage: "Study Language",
    systemLanguage: "System Language",
    SidebarFeed: "Feed",
    SidebarDiary: "My Diary",
    SidebarCorrections: "My Correction",
    SidebarFriends: "Friends",
    SidebarSettings: "Settings",
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
    profileHeader: "프로필 생성에 필요한 정보를 입력해주세요",
    addPhoto: "사진 추가",
    id: "아이디",
    idPlaceholder: "아이디를 입력해주세요",
    idCheck: "중복확인",
    idConditionToast: "2자 이상, 영어 소문자, 숫자, 특수기호(-._)만 사용가능",
    idAvaliableToast: "사용가능한 아이디입니다.",
    idNotAvaliableToast: "이미 사용중인 아이디입니다.",
    nickname: "닉네임",
    nicknamePlaceholder: "닉네임을 입력해주세요",
    nicknameConditionToast: "최대 20자",
    primaryLang: "모국어 / 주사용 언어",
    learningLang: "학습 언어",
    langPlaceholder: "언어 선택",
    signupButton: "가입완료",
    loginSuccessAlert: "로그인 되었습니다.",
    loginErrorAlert: "로그인 중 오류가 발생하였습니다. 다시 시도해주세요.",
    emailLinkSuccessAlert:
      "작성하신 이메일로 인증 링크를 전송하였습니다. 링크를 클릭하여 인증을 완료해주세요.",
    emailLinkErrorAlert: "인증 메일 발송 중 오류 발생. 다시 시도해주세요.",
    emailVerifySuccessAlert: "인증되었습니다.",
    emailVerifyErrorAlert: "인증 처리 중 오류가 발생하였습니다. 다시 시도해주세요.",
    signupSuccessAlert: "회원가입 완료! 이제 계정에 로그인 할 수 있습니다.",
    signupErrorAlert: "회원가입 중 오류가 발생했습니다, 다시 시도해주세요.",
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
    FriendFeedX: "친구의 일기가 없습니다.",
    settingTitle: "서비스 설정",
    SaveChange: "변경 내용 저장",
    setLanguage: "언어 설정",
    nativeLanguage: "모국어",
    studyLanguage: "학습 언어",
    systemLanguage: "시스템 언어",
    SidebarFeed: "피드",
    SidebarDiary: "나의 다이어리",
    SidebarCorrections: "나의 교정",
    SidebarFriends: "친구",
    SidebarSettings: "설정",
  },
};
