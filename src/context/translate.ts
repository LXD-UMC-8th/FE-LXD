import { Language, type TLanguage } from "./LanguageProvider";

export const translate: Record<
  TLanguage,
  {
    CancelLikeInCorrection: string;
    FailToDeleteMemo: string;
    SeeMore: string;
    PlzEnterInContent: string;
    NotSavedCorrection: string;
    FailToLoadCorrections: string;
    Profile: string;
    ConfirmDeleteFeedLikes: string;
    ConfirmDelete: string;
    Sunday: string;
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    RequestFriend: string;
    explore: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    Likes: string;
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
    UnTitled: string;
    signupErrorAlert: string;
    modaltabtitle_total: string;
    modaltabtitle_likes: string;
    titleStyle_FREE: string;
    titleStyle_QUESTION: string;
    visibility_PUBLIC: string;
    visibility_FRIEND: string;
    visibility_PRIVATE: string;
    OnlyCanAddInSavedCorrection: string;
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
    LeaveFirstComment: string;
    settingTitle: string;
    LoadingComment: string;
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
    findFriendsHeadline: string;
    findFriendsDesc1: string;
    findFriendsDesc2: string;
    unfriendConfirmTitle: string;
    unfriendConfirmAction: string;
    unfriendDoneToast: string;
    Loading: string;
    friendSearchPlaceholder: string;
    recentSearchTitle: string;
    clearAllRecent: string;
    userNotFound: string;
    fetchUserFailed: string;
    tabFind: string;
    tabFriends: string;
    tabRequests: string;
    unfriendConfirmTitle2: string;
    unfriendConfirmAction2: string;
    unfriendDoneToast2: string;
    friendsTotalLabel: string;
    receivedRequestsTitle: string;
    sentRequestsTitle: string;
    requestsCountLabel: string;
    acceptButton: string;
    deleteButton: string;
    cancelButton: string;
    pendingLabel: string;
    friendRequestFailed: string;
    profileImageAlt: string;
    sendFriendRequestButton: string;
    viewDiaryButton: string;
    refuseButton: string;
    loadingLabel: string;
    CommentSubmit: string;
    Comment: string;
    CorrectionsInDiary: string;
    CorrectButton: string;
    CommentPlaceholder: string;
    ReplyPlaceholder: string;
    User: string;
    EditProfile: string;
    SignOut: string;
    WantToLogOut: string;
    LogOutStatementFront: string;
    LogOutStatementBack: string;
    CompleteLogOut: string;
    Close: string;
    ProvideCorrect: string;
    CorrectSentence: string;
    CorrectExp: string;
    CorrectEnroll: string;
    CompleteCorrect: string;
    DeleteCommentAlert: string;
    DeleteReplyAlert: string;
    AddMemo: string;
    NothingCreatedCorrection: string;
    EditMemo: string;
    SaveMemo: string;
    DeleteMemo: string;
    CancelLikeInCorrectionConfirm: string;
    NotFoundComment1: string;
    NotFoundComment2: string;
    NotFoundComment3: string;
    BackToFeed: string;
    diaryOwner: string;
    Unlike: string;
  }
> = {
  [Language.ENGLISH]: {
    EditMemo: "Edit Memo",
    SaveMemo: "Save Memo",
    PlzEnterInContent: "Please enter the memo content.",
    NotSavedCorrection: "No correction has been saved.",
    NothingCreatedCorrection: "No correction has been created.",
    ConfirmDeleteFeedLikes:
      "If you cancel 'Like', your diary will be deleted from 'Feed-Like'. Are you sure you want to cancel?",
    Sunday: "SUN",
    Saturday: "SAT",
    Monday: "MON",
    AddMemo: "Add Memo.",
    Tuesday: "TUE",
    Wednesday: "WED",
    Thursday: "THU",
    Friday: "FRI",
    RequestFriend: "Friend Request",
    Likes: "Likes",
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
    CancelLikeInCorrection:
      "If you cancel 'like', the correction will be removed from the 'like' list. Are you sure you want to cancel?",
    langPlaceholder: "Select Language",
    signupButton: "Sign Up",
    loginSuccessAlert: "Login Complete.",
    LeaveFirstComment: "Leave your first comment.",
    loginErrorAlert: "Login Error. Please try it again.",
    emailLinkSuccessAlert:
      "An authentication link has been sent to the email you provided. Please click the link to complete the authentication.",
    emailLinkErrorAlert:
      "Failed to send verification email. Please try it again.",
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
    enrollButtonText: "POST",
    refreshButtonText: "Refresh",
    questionGeneratorButtonText: "Generate Question",
    titleInputPlaceholder: "Put in title",
    createNewDiary: "New Diary",
    alertImage: "Alert",
    LoadingComment: "Loading Comments...",
    receivedCorrections: "Received",
    givenCorrections: "Given",
    writingHeader: "New Post",
    notificationHeader: "Notifications",
    allReadInNotification: "Mark all as read",
    notificationButtonText1: "Accept",
    notificationButtonText2: "Delete",
    Diaries: "Entries",
    SeeMore: "See More",
    Diary: "Entry",
    CountDiary: "",
    Friends: "Friends",
    Friend: "Friend",
    CountFriend: "",
    ContentNotification: "No new notifications.",
    LoadingNotification: "Loading notifications...",
    EditDiary: "Edit",
    DeleteDiary: "Delete",
    FailToDeleteMemo: "Fail to delete memo.",
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
    SidebarCorrections: "MyCorrections",
    SidebarFriends: "Friends",
    SidebarSettings: "Settings",
    findFriendsHeadline: "Find friends around the world",
    findFriendsDesc1: "Search by ID to find friends.",
    findFriendsDesc2: "Make friends and explore their diaries.",
    unfriendConfirmTitle: "Unfriend {name}? You won't be friends anymore.",
    unfriendConfirmAction: "Unfriend",
    unfriendDoneToast: "Removed from friends.",
    friendSearchPlaceholder: "Search ID",
    recentSearchTitle: "Recent searches",
    clearAllRecent: "Clear all",
    userNotFound: "User not found.",
    fetchUserFailed: "Failed to load user information.",
    tabFind: "Finding-friends",
    tabFriends: "Friends",
    tabRequests: "Requests",
    unfriendConfirmTitle2: "Unfriend {name}? You won't be friends anymore.",
    unfriendConfirmAction2: "Unfriend",
    unfriendDoneToast2: "Removed from friends.",
    friendsTotalLabel: "{count} friends in total",
    receivedRequestsTitle: "Received requests",
    sentRequestsTitle: "Sent requests",
    requestsCountLabel: "{count}", // 배지: 12
    Profile: "profile",
    acceptButton: "Accept",
    deleteButton: "Delete",
    cancelButton: "Cancel",
    CancelLikeInCorrectionConfirm:
      "If you cancel 'Like', the correction will be removed from 'Like'.",
    UnTitled: "Untitled",
    pendingLabel: "Pending",
    friendRequestFailed: "Failed to send friend request.",
    profileImageAlt: "{name}'s profile image",
    sendFriendRequestButton: "Send request",
    viewDiaryButton: "View diary",
    refuseButton: "Decline",
    loadingLabel: "Loading…",
    CommentSubmit: "Post",
    Comment: "Comments",
    CorrectionsInDiary: "Provided Corrections",
    CorrectButton: "Correct",
    CommentPlaceholder: "Write a comment",
    ReplyPlaceholder: "Write a Reply",
    User: "",
    FailToLoadCorrections: "Failed to load corrections list.",
    EditProfile: "Edit Profile",
    SignOut: "Log Out",
    WantToLogOut: "Are you sure you want to log out?",
    LogOutStatementFront: "Do you want to log out of the account",
    LogOutStatementBack: "on LXD?",
    CompleteLogOut: "Logout is complete.",
    Close: "Close",
    ProvideCorrect: "Provide Corrections",
    CorrectSentence: "Please add an corrections",
    CorrectExp: "Please add an explanation",
    CorrectEnroll: "Post",
    CompleteCorrect: "Complete",
    explore: "Explore",
    DeleteCommentAlert: "Are you sure you want to delete the comments?",
    DeleteReplyAlert: "Are you sure you want to delete the reply?",
    ConfirmDelete: "Are you sure you want to delete?",
    Loading: "Loading...",
    OnlyCanAddInSavedCorrection:
      "You can only add notes in the 'Saved Correction'.",
    DeleteMemo: "Delete Memo",
    NotFoundComment1: "Sorry, the page could not be found.",
    NotFoundComment2: "You entered a non-existent address,",
    NotFoundComment3: "or the address of the page you requested was changed, deleted, and could not be found",
    BackToFeed: "Return to feed",
    diaryOwner: "'s Diary",
    Unlike: "Unlike",
  },
  [Language.KOREAN]: {
    PlzEnterInContent: "메모 내용을 입력해 주세요.",
    OnlyCanAddInSavedCorrection: "‘저장한 교정’에서만 메모를 추가할 수 있어요.",
    NotSavedCorrection: "저장된 교정 목록이 없습니다.",
    NothingCreatedCorrection: "작성한 교정이 없습니다.",
    FailToLoadCorrections: "교정 목록을 불러오지 못했습니다.",
    Loading: "로딩중입니다...",
    ConfirmDeleteFeedLikes:
      "좋아요' 취소 시 해당 일기가 '피드-좋아요'에서 삭제됩니다. 정말 취소하시겠습니까?",
    ConfirmDelete: "정말 삭제하시겠습니까?",
    RequestFriend: "친구 요청",
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
    SeeMore: "더보기",
    CancelLikeInCorrection:
      "‘좋아요’ 취소 시 해당 교정이 ‘좋아요’ 목록에서 삭제됩니다. 정말 취소하시겠습니까?",
    CancelLikeInCorrectionConfirm:
      "'좋아요' 취소 시 해당 교정이 '좋아요'에서 제거됩니다.",
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
    FailToDeleteMemo: "메모 삭제에 실패했습니다.",
    nickname: "닉네임",
    AddMemo: "메모 추가",
    nicknamePlaceholder: "닉네임을 입력해주세요",
    nicknameConditionToast: "최대 20자",
    primaryLang: "모국어 / 주사용 언어",
    EditMemo: "메모 수정",
    SaveMemo: "메모 저장",
    learningLang: "학습 언어",
    langPlaceholder: "언어 선택",
    signupButton: "가입완료",
    loginSuccessAlert: "로그인 되었습니다.",
    loginErrorAlert: "로그인 중 오류가 발생하였습니다. 다시 시도해주세요.",
    emailLinkSuccessAlert:
      "작성하신 이메일로 인증 링크를 전송하였습니다. 링크를 클릭하여 인증을 완료해주세요.",
    emailLinkErrorAlert: "인증 메일 발송 중 오류 발생. 다시 시도해주세요.",
    emailVerifySuccessAlert: "인증되었습니다.",
    emailVerifyErrorAlert:
      "인증 처리 중 오류가 발생하였습니다. 다시 시도해주세요.",
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
    commentPermission_PRIVATE: "비허용",
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
    UnTitled: "제목 없음",
    FriendFeedX: "친구의 일기가 없습니다.",
    settingTitle: "서비스 설정",
    SaveChange: "변경 내용 저장",
    setLanguage: "언어 설정",
    nativeLanguage: "모국어",
    studyLanguage: "학습 언어",
    systemLanguage: "시스템 언어",
    SidebarFeed: "피드",
    LeaveFirstComment: "첫 댓글을 남겨보세요.",
    SidebarDiary: "나의 다이어리",
    SidebarCorrections: "나의 교정",
    SidebarFriends: "친구",
    SidebarSettings: "설정",
    findFriendsHeadline: "전 세계에서 친구를 찾아보세요",
    findFriendsDesc1: "검색창에 아이디를 입력해서 친구를 찾아보세요.",
    findFriendsDesc2: "다른 사람과 친구를 맺고, 다이어리를 구경해보세요.",
    unfriendConfirmTitle: "{name}님과 친구를 취소하시겠습니까?",
    unfriendConfirmAction: "친구 취소하기",
    unfriendDoneToast: "친구 취소가 완료되었습니다.",
    friendSearchPlaceholder: "친구 목록에서 아이디를 검색하세요",
    recentSearchTitle: "최근 검색항목",
    clearAllRecent: "모두 지우기",
    userNotFound: "해당 사용자를 찾을 수 없습니다.",
    fetchUserFailed: "사용자 정보를 불러오는 데 실패했습니다.",
    tabFind: "친구찾기",
    tabFriends: "친구",
    tabRequests: "요청",
    unfriendConfirmTitle2: "{name}님과 친구를 취소하시겠습니까?",
    unfriendConfirmAction2: "친구 취소하기",
    unfriendDoneToast2: "친구",
    friendsTotalLabel: "총 {count}명",
    receivedRequestsTitle: "내가 받은 요청",
    sentRequestsTitle: "내가 보낸 요청",
    requestsCountLabel: "{count}개",
    acceptButton: "수락",
    deleteButton: "삭제",
    DeleteMemo: "메모 삭제",
    cancelButton: "취소",
    pendingLabel: "요청중",
    friendRequestFailed: "친구 요청에 실패했습니다.",
    profileImageAlt: "{name}의 프로필 이미지",
    sendFriendRequestButton: "친구 요청하기",
    viewDiaryButton: "다이어리 보러가기",
    refuseButton: "거절",
    loadingLabel: "로딩중…",
    CommentSubmit: "등록",
    Comment: "댓글",
    CorrectionsInDiary: "작성된 교정",
    CorrectButton: "교정하기",
    CommentPlaceholder: "댓글을 입력해주세요",
    ReplyPlaceholder: "답글을 입력해주세요",
    User: "님",
    EditProfile: "프로필 수정",
    Profile: "프로필",
    SignOut: "로그아웃",
    WantToLogOut: "정말 로그아웃 하시겠습니까?",
    LogOutStatementFront: "LXD에서 ",
    LogOutStatementBack: "계정을 로그아웃하시겠습니까?",
    CompleteLogOut: "로그아웃이 완료되었습니다.",
    Close: "닫기",
    ProvideCorrect: "교정 제공하기",
    CorrectSentence: "교정된 문장을 입력하세요.",
    CorrectExp: "교정 이유를 작성해주세요.",
    CorrectEnroll: "등록하기",
    CompleteCorrect: "교정완료",
    explore: "탐색",
    Likes: "좋아요",
    DeleteCommentAlert: "댓글을 삭제하시겠습니까?",
    LoadingComment: "댓글 불러오는 중..",
    DeleteReplyAlert: "답글을 삭제하시겠습니까?",
    Saturday: "토",
    Sunday: "일",
    Monday: "월",
    Tuesday: "화",
    Wednesday: "수",
    Thursday: "목",
    Friday: "금",
    NotFoundComment1: "죄송합니다. 페이지를 찾을 수 없습니다.",
    NotFoundComment2: "존재하지 않는 주소를 입력하셨거나,",
    NotFoundComment3: "요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.",
    BackToFeed: "피드로 돌아가기",
    diaryOwner: "님의 다이어리",
    Unlike: "취소하기",
  },
};
