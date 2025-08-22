import { Language, type TLanguage } from "./LanguageProvider";

export const translate: Record<
  TLanguage,
  {
    post: string;
    posting: string;
    GoBackToFeed: string;
    WrongAccess: string;
    changeProfile: string;
    DeleteConfirm: string;
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
    undefinedErrorOccur: string;
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
    saving: string;
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
    FirstComment: string;
    AddNote: string;
    DeleteLikeAlert: string;
    DeleteLikeAlert1: string;
    Cancle: string;
    SaveMemoFail: string;
    SaveMemoFail1: string;
    MemoEmpty: string;
    DeleteMemoFail: string;
    More: string;
    Untitled: string;
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

    newPassword: string;
    confirmNewPassword: string;
    newPasswordPlaceholder: string;
    pwChangeButton: string;
    editProfileHeader: string;
    deleteAccount: string;
    accountInfo: string;
    profileInfo: string;
    profileImg: string;
    selectFile: string;
    selectFilePlaceholder: string;
    imgSize: string;
    Unlike: string;
    profileEdit: string;
    notProfileResponse: string;
    errorduringedit: string;
    putInNick: string;
    ToLeave: string;
    LeaveNoti: string;
    CompleteLeave: string;
    sureLeave: string;
    donotrenderprofile: string;
    pending: string;

    ToSPPHeader: string;
    ToSPPSubHeader: string;
    TosHeader: string;
    TosTitle_1: string;
    TosBody_1: string;
    TosTitle_2: string;
    TosBody_2: string;
    TosTitle_3: string;
    TosBody_3: string;
    TosTitle_4: string;
    TosBody_4: string;
    TosTitle_5: string;
    TosBody_5: string;
    TosTitle_6: string;
    TosBody_6: string;
    TosTitle_7: string;
    TosBody_7: string;
    TosTitle_8: string;
    TosBody_8: string;
    TosTitle_9: string;
    TosBody_9: string;
    TosTitle_10: string;
    TosBody_10: string;
    TosTitle_11: string;
    TosBody_11: string;
    TosTitle_12: string;
    TosBody_12: string;
    TosTitle_13: string;
    TosBody_13: string;
    SupplementaryTitle: string;
    SupplementaryBody: string;

    PPHeader: string;
    PPTitle_1: string;
    PPBody_1: string;
    PPTitle_2: string;
    PPBody_2: string;
    PPTitle_3: string;
    PPBody_3: string;
    PPTitle_4: string;
    PPBody_4: string;
    PPTitle_5: string;
    PPBody_5: string;
    PPTitle_6: string;
    PPBody_6: string;
    PPTitle_7: string;
    PPBody_7: string;
    PPTitle_8: string;
    PPBody_8: string;
    PPTitle_9: string;
    PPBody_9: string;
    PPTitle_10: string;
    PPBody_10: string;
    PPTitle_11: string;
    PPBody_11: string;
    PPTitle_12: string;
    PPBody_12: string;
    PPTitle_13: string;
    PPBody_13: string;
    accept: string;
    NoComments: string;
  }
> = {
  [Language.ENGLISH]: {
    posting: "Posting...",
    GoBackToFeed: "Go back to feed",
    WrongAccess: "Invalid access.",
    DeleteConfirm: "Are you sure you want to delete this?",
    pending: "PENDING",
    donotrenderprofile: "Failed to load profile.",
    ToLeave: "To leave",
    CompleteLeave: "Complete Leave",
    sureLeave: "Are you sure you want to leave the account?",
    putInNick: "put in your nickname",
    changeProfile: "Your profile has been modified.",
    errorduringedit: "An error occurred while editing.",
    notProfileResponse: "No profile information found.",
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
    TosAgreed: "I agree to the Terms of Service and Privacy Policy.",
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
    undefinedErrorOccur: "undefined error",
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
    notificationButtonText2: "Refuse",
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
    SaveChange: "Save Changes",
    setLanguage: "Language Setting",
    nativeLanguage: "Native",
    studyLanguage: "Learning",
    systemLanguage: "System Language",
    SidebarFeed: "Feed",
    profileEdit: "Edit Profile",
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
    FirstComment: "Leave your first comment.",
    AddNote: "Add note",
    DeleteLikeAlert:
      "If you unlike this entry, it will be removed from your “Feed - Likes”. Are you sure you want to unlike it?",
    DeleteLikeAlert1:
      "If you cancel 'Like', the correction will be removed from 'Like'.",
    Cancle: "Unlike",
    SaveMemoFail: "Failed to save the memo.",
    SaveMemoFail1: "You can only add notes in the 'Saved Calibration'.",
    MemoEmpty: "Please enter the memo content.",
    DeleteMemoFail: "Failed to delete memo.",
    More: "More",
    Untitled: "Untitled",
    ConfirmDelete: "Are you sure you want to delete?",
    Loading: "Loading...",
    OnlyCanAddInSavedCorrection:
      "You can only add notes in the 'Saved Correction'.",
    DeleteMemo: "Delete Memo",
    NotFoundComment1: "Sorry, the page could not be found.",
    NotFoundComment2: "You entered a non-existent address,",
    NotFoundComment3:
      "or the address of the page you requested was changed, deleted, and could not be found",
    BackToFeed: "Return to feed",
    diaryOwner: "'s Diary",

    newPassword: "New Password",
    confirmNewPassword: "Confirm new password",
    newPasswordPlaceholder: "Enter your new password",
    pwChangeButton: "Change",
    editProfileHeader: "Edit Profile",
    deleteAccount: "Delete Account",
    accountInfo: "Account Information",
    profileInfo: "Profile Information",
    profileImg: "Profile Image",
    selectFile: "Browse",
    selectFilePlaceholder: "Select a file",
    imgSize: "Please upload an image file up to 500MG.",
    LeaveNoti:
      "Are you sure you want to leave the account? Upon leaving, the account will be deleted and the information will not be recovered.",
    Unlike: "Unlike",
    saving: "Saving...",

    ToSPPHeader: "Terms of Service and Privacy Policy Agreement",
    ToSPPSubHeader: `To use the LXD service, you must agree to the Terms of Use and the collection of 
      personal information once upon first use.`,
    TosHeader: "[Required] I have read and agree to the Terms of Service.",
    TosTitle_1: "1. Purpose",
    TosBody_1: `These Terms govern your access to and use of the LXD platform, including all features, services, and content available through the Service.`,
    TosTitle_2: "2. Definitions",
    TosBody_2: `- "Content" means all materials posted or submitted by a Member, including diary entries, comments, images, and other data.
    - "Friend Request" refers to a function that enables users to interact and connect within the Service.`,
    TosTitle_3: `3. Eligibility`,
    TosBody_3: `- The Service is intended for individuals aged 14 years or older.
- You may register using a valid email address or a third-party account (e.g., Google).
- You are responsible for providing accurate and truthful information during registration.`,
    TosTitle_4: `4. Modification of Terms`,
    TosBody_4: `We reserve the right to modify these Terms at any time. If we make material changes, we will notify you through the Service or by other appropriate means. Continued use of the Service after changes have been posted constitutes your acceptance of the revised Terms.`,
    TosTitle_5: `5. Use of the Service`,
    TosBody_5: `- The Service allows users to write diary entries, comment, like, and send friend requests.
- We may modify, suspend, or discontinue any aspect of the Service at any time, with reasonable prior notice where feasible.`,
    TosTitle_6: `6. User Content and Management`,
    TosBody_6: `- You retain ownership of your content.
- You may edit or delete your content, except in certain cases where removal may affect the integrity of the learning history or collaborative features. In such cases, you may contact us to request deletion.
- We reserve the right to remove content or restrict accounts without notice if we believe the content violates these Terms or applicable law.`,
    TosTitle_7: `7. User Responsibilities`,
    TosBody_7: `By using the Service, you agree to:
- Comply with all applicable laws and regulations.
- Not harm, harass, or disrupt other users or the operation of the Service.
- Not upload or distribute content that is unlawful, harmful, defamatory, obscene, or infringes on intellectual property rights.`,
    TosTitle_8: `8. Restricted Activities`,
    TosBody_8: `We may suspend or terminate your access if your actions include but are not limited to:
- Violating public order, morality, or laws
- Engaging in criminal or fraudulent activity
- Impersonating others or misusing credentials
- Sending spam or unauthorized advertising
- Hacking or spreading malware
- Infringing on others' intellectual property
- Any behavior deemed inappropriate by us`,
    TosTitle_9: `9. Intellectual Property`,
    TosBody_9: `- You retain copyright over your submitted content.
- By using the Service, you grant us a non-exclusive, royalty-free, worldwide license to use, reproduce, display, and distribute your content for service operation and promotional purposes.
- You are solely responsible for ensuring that your content does not violate any third-party rights.`,
    TosTitle_10: `10. Disclaimers`,
    TosBody_10: `- The Service is provided **“as is” and “as available”**, without warranties of any kind.
- We do not guarantee uninterrupted or error-free operation.
- We are not responsible for user interactions, the accuracy of content, or any damages arising from your use of the Service.
- You are responsible for maintaining the confidentiality of your account and password.
- If you violate these Terms and cause us damage, you agree to indemnify and hold us harmless.`,
    TosTitle_11: `11. Governing Law and Jurisdiction`,
    TosBody_11: `These Terms are governed by the laws of the Republic of Korea, unless local mandatory consumer protection laws in your country of residence provide otherwise.
In the event of a dispute, the competent court in the Republic of Korea shall have jurisdiction, unless otherwise required by applicable law.`,
    TosTitle_12: `12. Additional Terms`,
    TosBody_12: `- If any part of these Terms is found to be invalid or unenforceable, the remaining sections will remain in full force and effect.
- You must explicitly agree to these Terms to use the Service. If you do not agree, please do not use the Service.`,
    TosTitle_13: `Need Help?`,
    TosBody_13: `If you have questions about these Terms, please contact us at: [creativej4u@gmail.com]`,
    SupplementaryTitle: `Effective as of: August 2025`,
    SupplementaryBody: `Please read these Terms of Service ("Terms") carefully before using the LXD (Language Xchange Diary) platform ("Service"), operated by Team LXD ("we", "us", or "our"). By accessing or using the Service, you agree to be bound by these Terms.`,

    PPHeader: "[Required] I have read and agree to the Privacy Policy.",
    PPTitle_1: `1. Information We Collect`,
    PPBody_1: ` We collect the following information when you register or use our Service:
- Required Information: Email address, Username and password, Display name (nickname), Legal name, Nationality, Native language, Learning language(s)
- Optional Information: Profile photo
- How we collect:
1. Direct input from users during registration or use
2. We do not currently use automatic collection tools (e.g., cookies, logs); such features may be added later and will be reflected in this policy accordingly.`,
    PPTitle_2: `2. Purpose of Data Use`,
    PPBody_2: `We use personal information for the following purposes:
- To identify and authdenticate users
- To provide and manage the Service
- To link user activity (e.g., posts, comments)
- (Optional and upon consent) For future marketing or promotional purposes — users will be informed and asked for separate consent before such use is implemented`,
    PPTitle_3: `3. Data Retention and Deletion`,
    PPBody_3: `- Personal information is deleted without undue delay after a user deletes their account.
- We may retain information for a certain period if required by applicable laws.
- Specific retention periods will be detailed in this Policy as they are confirmed through operational policy.`,
    PPTitle_4: `4. Third-Party Sharing`,
    PPBody_4: `We do not share your personal information with third parties, except in the following cases:
- When you have given prior explicit consent
- When required by law or legal authorities
- When minimal necessary data must be provided to a service provider (e.g., for hosting or email delivery)
- When otherwise permitted by applicable laws`,
    PPTitle_5: `5. Delegation of Processing (Subprocessors)`,
    PPBody_5: `To ensure smooth operation of the Service, we outsource certain data processing tasks to trusted third-party providers under strict confidentiality agreements:
1. Email Delivery
    - Gmail SMTP, SendGrid
2. Service Hosting & Infrastructure
    - Amazon Web Services (EC2, RDS, S3, Route53), nginx
3. Temporary Data Storage
    - Redis
Note: We do not currently use log analytics tools. Should that change, we will update this Policy accordingly.`,
    PPTitle_6: `6. Use of Cookies`,
    PPBody_6: `- At present, cookies are not actively used for tracking personal data.
- Cookies may be used to maintain login sessions.
- A cookie policy will be introduced and disclosed if tracking cookies or analytics tools are implemented in the future.`,
    PPTitle_7: `7. Data Protection Measures`,
    PPBody_7: `We take reasonable technical and administrative measures to protect your data, including encryption of passwords and access control.
Your personal information is handled with the utmost care and in compliance with applicable security regulations.`,
    PPTitle_8: `8. Children's Privacy`,
    PPBody_8: `The Service is intended for users of all ages; however, in accordance with international standards such as COPPA and GDPR-K:
- Users under the age of 14 may be required to obtain verifiable parental or guardian consent before using the Service.`,
    PPTitle_9: `9. User Rights: Access, Modification, and Deletion`,
    PPBody_9: `You may access, modify, or delete your personal information at any time through your account settings.
Upon account deletion, your personal data will be removed promptly unless otherwise required by law.`,
    PPTitle_10: `10. Cross-Border Data Transfers`,
    PPBody_10: `As our Service is operated globally, your personal data may be processed in countries outside your country of residence. We will take reasonable steps to ensure that your data is treated securely and in accordance with this Privacy Policy and applicable laws.`,
    PPTitle_11: `11. Legal Basis (GDPR Note)`,
    PPBody_11: `If you are located in the European Economic Area (EEA), we process your personal data only when we have a legal basis to do so, including:
- Consent
- Contractual necessity
- Compliance with a legal obligation
- Legitimate interests (e.g., service improvement, abuse prevention)`,
    PPTitle_12: `12. Contact Information`,
    PPBody_12: `If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at: [creativej4u@gmail.com]`,
    PPTitle_13: `13. Changes to This Policy`,
    PPBody_13: `We may update this Privacy Policy from time to time. Significant changes will be notified through the Service. Continued use of the Service after changes have been posted constitutes your acceptance of the updated policy.`,
    accept: "Accept",
    NoComments: "No comments yet.",
    post: "Post",
  },

  [Language.KOREAN]: {
    post: "등록",
    posting: "등록중...",
    GoBackToFeed: "피드로 돌아가기",
    WrongAccess: "잘못된 접근입니다.",
    DeleteConfirm: "정말 삭제하시겠습니까?",
    pending: "요청중",
    saving: "저장 중..",
    changeProfile: "프로필이 수정되었습니다.",
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
    errorduringedit: "수정 중 에러가 발생했습니다.",
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
    profileEdit: "프로필 편집",

    id: "아이디",
    idPlaceholder: "아이디를 입력해주세요",
    idCheck: "중복확인",
    idConditionToast: "2자 이상, 영어 소문자, 숫자, 특수기호(-._)만 사용가능",
    idAvaliableToast: "사용가능한 아이디입니다.",
    idNotAvaliableToast: "이미 사용중인 아이디입니다.",
    FailToDeleteMemo: "메모 삭제에 실패했습니다.",
    nickname: "닉네임",
    AddMemo: "메모 추가",
    putInNick: "닉네임을 입력해주세요.",
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
    undefinedErrorOccur: "알 수 없는 에러",
    sureLeave: "정말 탈퇴 하시겠습니까?",
    modaltabtitle_likes: "좋아요",
    titleStyle_FREE: "자유글",
    titleStyle_QUESTION: "질문글",
    visibility_PUBLIC: "공개",
    donotrenderprofile: "프로필을 불러오지 못했습니다.",
    visibility_FRIEND: "친구공개",
    visibility_PRIVATE: "비공개",
    commentPermission_PUBLIC: "전체허용",
    commentPermission_FRIEND: "친구허용",
    LeaveNoti:
      "계정을 탈퇴하시겠습니까? 탈퇴 시, 계정은 삭제되며 정보는 복구되지 않습니다.",
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
    ToLeave: "탈퇴하기",
    CompleteLeave: "탈퇴가 완료되었습니다.",
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
    notProfileResponse: "프로필 응답이 없습니다.",
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
    FirstComment: "첫 댓글을 남겨보세요.",
    AddNote: "메모 추가하기",
    DeleteLikeAlert:
      "'좋아요' 취소 시 해당 교정이 '좋아요' 목록에서 삭제됩니다. 정말 취소하시겠습니까?",
    DeleteLikeAlert1: "'좋아요' 취소 시 해당 교정이 '좋아요'에서 제거됩니다.",
    Cancle: "취소하기",
    SaveMemoFail: "메모 저장에 실패했어요.",
    SaveMemoFail1: "‘저장한 교정’에서만 메모를 추가할 수 있어요.",
    MemoEmpty: "메모 내용을 입력해 주세요.",
    DeleteMemoFail: "메모 삭제에 실패했어요.",
    More: "더보기",
    Untitled: "제목 없음",
    Saturday: "토",
    Sunday: "일",
    Monday: "월",
    Tuesday: "화",
    Wednesday: "수",
    Thursday: "목",
    Friday: "금",
    NotFoundComment1: "죄송합니다. 페이지를 찾을 수 없습니다.",
    NotFoundComment2: "존재하지 않는 주소를 입력하셨거나,",
    NotFoundComment3:
      "요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.",
    BackToFeed: "피드로 돌아가기",
    diaryOwner: "님의 다이어리",

    newPassword: "새 비밀번호",
    confirmNewPassword: "새 비밀번호 확인",
    newPasswordPlaceholder: "새로운 비밀번호를 입력해주세요",
    pwChangeButton: "변경하기",
    editProfileHeader: "프로필 편집",
    deleteAccount: "회원탈퇴",
    accountInfo: "계정 정보",
    profileInfo: "프로필 정보",
    profileImg: "프로필 이미지",
    selectFile: "파일선택",
    selectFilePlaceholder: "파일을 선택해주세요",
    imgSize: "최대 500MB의 이미지 파일을 업로드 해주세요.",
    Unlike: "취소하기",

    ToSPPHeader: "이용약관 및 개인정보 수집 동의",
    ToSPPSubHeader:
      "LXD 서비스 이용을 위한 최초 1회의 약관 동의와 개인정보 수집에 대한 동의가 필요합니다.",
    TosHeader: "[필수] 이용약관에 동의합니다.",
    TosTitle_1: "제1조 (목적)",
    TosBody_1: `본 약관은 팀 LXD(이하 '운영팀')가 제공하는 웹사이트 “LXD (Language Xchange Diary)”(이하 '서비스')의 이용 조건 및 절차, 이용자와 운영팀 간의 권리, 의무 및 책임사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.`,
    TosTitle_2: "제2조 (용어의 정의)",
    TosBody_2: `1. "회원"이란 본 약관에 따라 서비스에 가입하여 이용하는 자를 말합니다.
    2. "게시물"이란 회원이 서비스에 작성한 글, 댓글, 이미지 등 모든 콘텐츠를 의미합니다.
    3. "친구신청"이란 회원 간의 상호 교류를 위해 요청하는 기능을 말합니다.`,
    TosTitle_3: `제3조 (약관의 효력 및 변경)`,
    TosBody_3: `1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다. 
    2. 운영팀은 필요 시 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지함으로써 효력을 가집니다.`,
    TosTitle_4: `제4조 (약관 외 준칙)`,
    TosBody_4: `본 약관에 명시되지 않은 사항이 전기통신기본법, 전기통신사업법,
                  정보통신촉진법, ‘전자상거래등에서의 소비자 보호에 관한 법률’,
                  ‘약관의 규제에관한법률’, ‘전자거래기본법’, ‘전자서명법’,
                  ‘정보통신망 이용촉진등에 관한 법률’, ‘소비자보호법’ 등 기타
                  관계 법령에 규정되어 있을 경우에는 그 규정을 따르도록 합니다.`,
    TosTitle_5: `제5조 (회원가입)`,
    TosBody_5: `1. 회원가입은 만 14세 이상의 개인만 가능합니다.
     2. 회원은 본인의 이메일 또는 구글 계정을 통해 가입할 수 있으며, 언제든 탈퇴할 수 있습니다. 
                  3. 회원은 정확한 정보를 제공해야 하며, 허위 정보 제공으로 인한 책임은 본인에게 있습니다.`,
    TosTitle_6: `제6조 (서비스의 제공)`,
    TosBody_6: `1. 서비스는 일기 작성, 댓글, 좋아요, 친구 신청 등의 기능을 제공합니다.
    2. 운영팀은 서비스의 일부 또는 전부를 변경, 중단할 수 있으며, 이 경우 사전에 공지합니다.`,
    TosTitle_7: `제7조 (게시물의 관리)`,
    TosBody_7: `1. 회원이 작성한 게시물은 원칙적으로 회원이 직접 수정 또는 삭제할 수 있습니다. 단, 서비스의 성격상 일부 콘텐츠는 서비스 기록의 일관성과 학습 목적을 위해 사용자가 직접 삭제할 수 없습니다. 해당 콘텐츠의 삭제를 원할 경우, 운영팀에 별도 요청을 통해 처리할 수 있습니다. 
                  2. 운영팀은 게시물이 제9조에 해당한다고 판단되는 경우에 사전 통보 없이 게시물을 삭제하거나 회원 이용을 제한할 수 있습니다.`,
    TosTitle_8: `제8조 (회원의 의무)`,
    TosBody_8: `1. 회원은 본 약관 및 관련 법령을 준수해야 합니다. 
    2. 회원은 서비스 이용 시 타인에게 피해를 주지 않아야 하며, 서비스의 정상적 운영을 방해해서는 안 됩니다.`,
    TosTitle_9: `제9조 (이용제한)`,
    TosBody_9: `본 사이트 이용 및 행위가 다음 각 항에 해당하는 경우 운영팀은 해당 회원의 이용을 제한할 수 있습니다.
                   - 공공질서 및 미풍양속, 기타 사회질서를 해하는 경우
                   - 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된다고 객관적으로 인정되는 경우 
                   - 타인의 명예를 손상시키거나 타인의 서비스 이용을 현저히 저해하는 경우 
                   - 타인의 의사에 반하는 내용이나 광고성 정보 등을 지속적으로 전송하는 경우
                    - 해킹 및 컴퓨터 바이러스 유포 등으로 서비스의 건전한 운영을 저해하는 경우 
                   - 다른 회원 또는 제3자의 지적재산권을 침해하거나 지적재산권자가 지적 재산권의 침해를 주장할 수 있다고 판단되는 경우
                    - 타인의 이메일, 아이디 및 비밀번호를 도용한 경우
                    - 기타 관계 법령에 위배되는 경우 및 운영팀이 회원으로서 부적당하다고 판단한 경우`,
    TosTitle_10: `제10조 (면책조항)`,
    TosBody_10: `1. 운영팀은 천재지변, 기술적 문제 등으로 인한 서비스 중단에 대해 책임을 지지 않습니다. 
                  2. 운영팀은 회원간 또는 회원과 제3자간의 상호작용이나 게시물에 대한 책임을 지지 않습니다. 
                  3. 운영팀은 회원이 게시판에 게재한 정보, 자료, 내용 등에 관하여 사실의 정확성, 신뢰도 등에 어떠한 책임도 부담하지 않으며 회원은 본인의 책임 아래 본 사이트를 이용해야 합니다.
                  4. 회원이 게시 또는 전송한 자료 등에 관하여 손해가 발생하거나 자료의 취사선택, 기타 무료로 제공되는 서비스 이용과 관련해 어떠한 불이익이 발생하더라도 이에 대한 모든 책임은 회원에게 있습니다.
                  5. 이메일과 비밀번호의 관리 및 이용자의 부주의로 인하여 발생되는 손해 또는 제3자에 의한 부정사용 등에 대한 책임은 회원에게 있습니다. 
                  6. 회원이 본 약관의 규정을 위반함으로써 운영팀에 손해가 발생하는 경우 이 약관을 위반한 회원은 운영팀에 발생한 모든 손해를 배상해야 하며 동 손해로부터 운영팀을 면책시켜야 합니다.`,
    TosTitle_11: `제11조 (지적재산권)`,
    TosBody_11: `1. 회원이 서비스에 작성한 게시물의 저작권은 작성자에게 있으며, 운영팀은 서비스 운영 및 홍보 목적으로 이를 사용할 수 있습니다.
                  2. 단, 이용자는 자신이 작성한 콘텐츠가 타인의 권리를 침해하지 않도록 주의해야 합니다.`,
    TosTitle_12: `제12조 (준거법 및 재판관할)`,
    TosBody_12: `본 약관은 대한민국 법을 따릅니다.`,
    TosTitle_13: `제13조 (연락처)`,
    TosBody_13: `서비스 관련 문의는 아래 이메일로 연락 주시기 바랍니다.
                  이메일: [creativej4u@gmail.com]`,
    SupplementaryTitle: `부칙`,
    SupplementaryBody: `본 약관은 2025년 8월부터 적용됩니다.`,

    PPHeader: "[필수] 개인정보처리방침에 동의합니다.",
    PPTitle_1: `제1조 (개인정보의 수집 항목 및 방법)`,
    PPBody_1: ` 1. 운영팀은 회원가입 시 아래의 개인정보를 수집합니다.
                  - 필수항목: 이메일 주소, 아이디, 비밀번호, 닉네임, 성명, 국적, 모국어, 학습 언어 
                  - 선택항목: 프로필 사진
                  2. 개인정보는 사용자가 직접 입력한 방식으로 수집됩니다.
                  3. 자동 수집 항목(예: 쿠키, 로그 등)은 현재 명확히 사용되고 있지 않으며, 추후 도입될 경우 본 방침에 추가됩니다.`,
    PPTitle_2: `제2조 (개인정보의 이용 목적)`,
    PPBody_2: `수집한 개인정보는 다음의 목적을 위해 사용됩니다:
                   - 회원 식별 및 인증 
                   - 서비스 제공 및 이용자 관리 
                   - 게시글/댓글 등 사용자 활동 연동 
                   - (선택 동의 시) 마케팅 및 광고 목적의 활용이 향후 추가될 수 있습니다.
                  해당 목적이 도입될 경우, 사전 고지 및 동의를 별도로 받을 예정입니다.`,
    PPTitle_3: `제3조 (개인정보의 보유 및 이용 기간)`,
    PPBody_3: `회원의 개인정보는 회원 탈퇴 후 일정 기간이 지난 후 지체 없이 삭제됩니다. 단, 관련 법령에 따라 보존이 필요한 경우에는 해당 기간 동안 보관될 수 있습니다. 구체적인 보유 기간은 추후 서비스 운영 정책에 따라 정해지며, 정책 확정 시 본 방침에 추가됩니다.`,
    PPTitle_4: `제4조 (개인정보의 제3자 제공)`,
    PPBody_4: `운영팀은 원칙적으로 이용자의 개인정보를 수집 및 이용 목적 범위 내에서만 처리하며, 이용자의 사전 동의 없이 제3자에게 제공하지 않습니다. 다만, 다음 각 호의 경우에는 예외로 합니다. 
                  1. 이용자가 사전에 제3자 제공에 동의한 경우
                  2. 다른 법률에 특별한 규정이 있는 경우
                  3. 수사기관이나 법원의 요청이 있는 경우로서, 관련 법령에 따라 제공이 허용되는 경우
                  4. 서비스 제공에 필요한 범위 내에서 최소한의 개인정보가 불가피하게 제공되는 경우 (예: 서비스 운영을 위한 위탁 업무 수행 시)`,
    PPTitle_5: `제5조 (개인정보의 처리 위탁)`,
    PPBody_5: `운영팀은 서비스의 원활한 제공을 위하여 다음과 같이 개인정보 처리 업무의 일부를 외부 업체에 위탁하고 있습니다. 
    위탁받은 업체는 운영팀의 지시에 따라 업무를 수행하며, 개인정보를 저장하거나 별도로 활용하지 않습니다.
                  1. 이메일 발송 업무 
                  - 위탁 대상: Gmail SMTP, SendGrid 
                  2. 서비스 호스팅 및 인프라 운영 
                   - 위탁 대상: Amazon Web Services (EC2, RDS, S3, Route53), nginx 
                  3. 일시적 데이터 저장 
                   - 위탁 대상: Redis 
                  ※ 현재 로그 수집 및 분석 시스템은 도입되지 않았으며, 추후 해당 기능이 도입되는 경우 변경 사항은 본 방침에 반영하여 고지합니다.`,
    PPTitle_6: `제6조 (쿠키의 사용)`,
    PPBody_6: `현재 쿠키를 통한 개인정보 추적 및 분석은 명확히 사용되지 않고 있으며, 로그인 유지 등에 쿠키가 사용될 수 있습니다. 추후 쿠키 사용 정책이 도입될 경우 본 방침에 반영하여 고지합니다.`,
    PPTitle_7: `제7조 (개인정보 보호를 위한 조치)`,
    PPBody_7: `운영팀은 개인정보 보호를 위해 적절한 보안 조치를 취하고
                  있으며, 비밀번호는 암호화되어 저장됩니다.`,
    PPTitle_8: `제8조 (미성년자의 개인정보 보호)`,
    PPBody_8: `LXD는 원칙적으로 전 연령 이용을 허용하나, 법적 요건에 따라 만
                  14세 미만 사용자의 경우 법정대리인의 동의를 요청할 수
                  있습니다.`,
    PPTitle_9: `제9조 (개인정보 열람 및 삭제)`,
    PPBody_9: `회원은 언제든지 자신의 개인정보를 열람, 수정, 삭제할 수
                  있으며, 탈퇴 요청 시 모든 정보는 즉시 삭제됩니다.`,
    PPTitle_10: `* 개인정보 관련 문의`,
    PPBody_10: `본 개인정보처리방침에 대한 문의사항이 있을 경우 아래 이메일로 연락 주시기 바랍니다.
                  이메일: [creativej4u@gmail.com]`,
    PPTitle_11: ``,
    PPBody_11: ``,
    PPTitle_12: ``,
    PPBody_12: ``,
    PPTitle_13: ``,
    PPBody_13: ``,
    accept: "확인",
    NoComments: "댓글이 없습니다.",
  },
};
