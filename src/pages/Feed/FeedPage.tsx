import ModalWithTabs from "../../components/Common/ModalWithTabs";
import CalendarModal from "../../components/Common/CalendarModal";
import { translate } from "../../context/translate";
import { useLanguage } from "../../context/LanguageProvider";
import { useMemo } from "react";
// import { axiosInstance } from "../../apis/axios";
// import { useNavigate } from "react-router-dom";

const FeedPage = () => {
  // const [_authCode, setAuthCode] = useState<string | null>(null);
  // const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translate[language];

  const tabvalue = useMemo(
    () => [
      { value: "friendINfeed", title: t.Friends },
      { value: "searchINfeed", title: t.explore },
      { value: "likeINfeed", title: t.Likes },
    ],
    [t]
  );

  // useEffect(() => {
  //   const sp = new URLSearchParams(window.location.search);
  //   const code = sp.get("code");

  //   if (!code) return;
  //   setAuthCode(code);
  //   console.log("[Google OAuth] code:", code);

  //   const cleanUrl = window.location.pathname;
  //   window.history.replaceState({}, "", cleanUrl);

  //   (async () => {
  //     try {
  //       const { data } = await axiosInstance.post("/auth/google/login", {
  //         code,
  //       });

  //       if (data.isSuccess) {
  //         const { accessToken, refreshToken, isNewMember } = data.result;

  //         localStorage.setItem("accessToken", accessToken);
  //         localStorage.setItem("refreshToken", refreshToken);

  //         console.log(" 구글 로그인 성공:", { isNewMember });
  //         if (isNewMember) {
  //           // 신규회원: ProfilePage로 이동
  //           const googleEmail = data.result.member.email;
  //           const randomPassword = Math.random().toString(36).slice(2, 12); // 임의의 10자리 문자열

  //           const userInfo = {
  //             email: googleEmail,
  //             password: randomPassword,
  //             checkPassword: randomPassword,
  //             isPrivacy: true,
  //             id: "",
  //             nickname: "",
  //             profileImg: null,
  //             nativeLanguage: "",
  //             studyLanguage: "",
  //             loginType: "GOOGLE",
  //           };

  //           localStorage.setItem("googleSignupUserInfo", JSON.stringify(userInfo));
  //           navigate("/home/signup/profile", { replace: true });
  //         } else {
  //           // 기존회원: useAuth() 재실행 -> isLoggedIn === true
  //           window.location.reload();
  //         }
  //       } else {
  //         alert("구글 로그인 실패: " + data.message);
  //       }
  //     } catch (e) {
  //       console.error("구글 로그인 중 오류", e);
  //     }
  //   })();
  // }, []);

  return (
    <div className="bg-gray-100 flex flex-cols gap-10 justify-between mx-10">
      <div className="">
        <ModalWithTabs key={language} tabvalue={tabvalue} />
      </div>
      <div className="z-10 mx-10 pr-10">
        <CalendarModal />
      </div>
    </div>
  );
};
export default FeedPage;
