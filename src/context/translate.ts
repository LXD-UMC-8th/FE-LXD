import { Language, type TLanguage } from "./LanguageProvider";

export const translate: Record<
  TLanguage,
  {
    emailPlaceholder: string;
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
    findFriendsHeadline: string;
    findFriendsDesc1: string;
    findFriendsDesc2: string;
    unfriendConfirmTitle: string;
    unfriendConfirmAction: string;
    unfriendDoneToast: string;
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
<<<<<<< HEAD
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
  }    
=======
    User: string;
    EditProfile: string;
    SignOut: string;
    WantToLogOut: string;
    LogOutStatementFront: string;
    LogOutStatementBack: string;
    CompleteLogOut: string;
    Close: string;
  }
>>>>>>> 62a84006a44623170123561b3b5109d298a964e7
  
> = {
  [Language.ENGLISH]: {
    emailPlaceholder: "Please enter your email",
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
<<<<<<< HEAD
    receivedRequestsTitle: "Received requests",
    sentRequestsTitle: "Sent requests",
    requestsCountLabel: "{count}",         // 배지: 12
    acceptButton: "Accept",
    deleteButton: "Delete",
    cancelButton: "Cancel",
    pendingLabel: "Pending",
    friendRequestFailed: "Failed to send friend request.",
    profileImageAlt: "{name}'s profile image",
    sendFriendRequestButton: "Send request",
    viewDiaryButton: "View diary",
    refuseButton: "Decline",
    loadingLabel: "Loading…",
=======
    User: "",
    EditProfile: "Edit Profile",
    SignOut: "Log Out",
    WantToLogOut: "Are you sure you want to log out?",
    LogOutStatementFront: "Do you want to log out of the account",
    LogOutStatementBack: "on LXD?",
    CompleteLogOut: "Logout is complete.",
    Close: "Close",
>>>>>>> 62a84006a44623170123561b3b5109d298a964e7
  },
  [Language.KOREAN]: {
    emailPlaceholder: "이메일을 입력해주세요",
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
<<<<<<< HEAD
    receivedRequestsTitle: "내가 받은 요청",
    sentRequestsTitle: "내가 보낸 요청",
    requestsCountLabel: "{count}개", 
    acceptButton: "수락",
    deleteButton: "삭제",
    cancelButton: "취소",
    pendingLabel: "요청중",
    friendRequestFailed: "친구 요청에 실패했습니다.",
    profileImageAlt: "{name}의 프로필 이미지",
    sendFriendRequestButton: "친구 요청하기",
    viewDiaryButton: "다이어리 보러가기",
    refuseButton: "거절",
    loadingLabel: "로딩중…",
=======
    User: "님",
    EditProfile: "프로필 수정",
    SignOut: "로그아웃",
    WantToLogOut: "정말 로그아웃 하시겠습니까?",
    LogOutStatementFront: "LXD에서 ",
    LogOutStatementBack: "계정을 로그아웃하시겠습니까?",
    CompleteLogOut: "로그아웃이 완료되었습니다.",
    Close: "닫기",
>>>>>>> 62a84006a44623170123561b3b5109d298a964e7
  },
};
